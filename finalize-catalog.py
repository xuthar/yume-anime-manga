"""Build the complete catalog from verified identities while preserving original personal records."""
import collections,datetime,json,pathlib,re,subprocess
from importlib import import_module
ROOT=pathlib.Path(__file__).resolve().parent
loader=import_module('complete-catalog')
BASE='79a0e1f'
baseline=json.loads(subprocess.check_output(['git','show',BASE+':library.json'],cwd=ROOT))
original=json.loads((ROOT/'library.json').read_text())
meta=json.loads((ROOT/'catalog-metadata.json').read_text())
# Reparse every cached page with the final UTF-8 parser; imports never mutate personal data.
for path in loader.CACHE.glob('*.html'):
 try:meta['items'][path.stem]=loader.parse(path.read_bytes(),int(path.stem));meta['errors'].pop(path.stem,None)
 except Exception as e:meta['errors'][path.stem]=str(e)
existing_credits=json.loads((ROOT/'anime-details.json').read_text())['items']
for mid,r in meta['items'].items():
 r.setdefault('credits',existing_credits.get('anime-'+mid,{'malId':int(mid),'sourceUrl':r['sourceUrl'],'parserVersion':2,'checkedAt':r['checkedAt'],'cast':[],'openings':[],'endings':[]}))
ident=json.loads((ROOT/'data/catalog-identities.json').read_text())
checks=json.loads((ROOT/'data/catalog-source-checks.json').read_text()) if (ROOT/'data/catalog-source-checks.json').exists() else {}
seasonal=json.loads((ROOT/'seasons.json').read_text())['items']
ac=json.loads((ROOT/'data/catalog-animeclick-checks.json').read_text())['items']

# Preserve relation-proven identities even when a source page cannot be read.
references={}
for r in meta['items'].values():
 r['metadataAvailable']=True
 for e in r['relations']:references[e['malId']]=e
for x in original['items']:
 if x['type']!='anime':continue
 m=re.search(r'/anime/(\d+)',x.get('url',''))
 mid=int(x['id'][6:]) if x['id'][6:].isdigit() else int(m[1]) if m else ident.get(x['id'],{}).get('malId')
 if mid:references.setdefault(mid,{'title':x['title'],'url':'https://myanimelist.net/anime/'+str(mid)})
for mid,error in list(meta['errors'].items()):
 if mid in meta['items'] or int(mid) not in references:continue
 e=references[int(mid)];meta['items'][mid]={'malId':int(mid),'title':e['title'],'japanese':'','english':'','format':'Anime','episodes':None,'releaseStatus':'','aired':'','startDate':'','endDate':'','year':None,'studio':'','source':'','duration':'','image':'','synopsis':'','synopsisLanguage':'en','relations':[],'streaming':[],'streamingSource':'','officialSources':[],'sourceUrl':e['url'],'checkedAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),'genres':[],'metadataAvailable':False,'verificationError':error,'credits':{'malId':int(mid),'sourceUrl':e['url'],'parserVersion':2,'checkedAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),'cast':[],'openings':[],'endings':[]}}
items=meta['items'];parent={int(k):int(k) for k in items}
def root(x):
 while parent[x]!=x:parent[x]=parent[parent[x]];x=parent[x]
 return x
def union(a,b):
 if a in parent and b in parent:parent[max(root(a),root(b))]=min(root(a),root(b))
strong={'Prequel','Sequel','Alternative Version','Alternative version','Alternative Setting','Alternative setting','Summary','Compilation','Full Story','Full story'}
for mid,r in items.items():
 for e in r['relations']:
  if e['relation'] in strong:union(int(mid),e['malId'])
crossovers=set()
for mid,r in items.items():
 parents={root(e['malId']) for e in r['relations'] if e['relation'] in ['Parent Story','Parent story'] and e['malId'] in parent}
 if len(parents)>1:crossovers.add(int(mid))
for mid,r in items.items():
 for e in r['relations']:
  if e['relation'] in loader.FOLLOW and int(mid) not in crossovers and e['malId'] not in crossovers:union(int(mid),e['malId'])
components=collections.defaultdict(list)
for k in parent:components[root(k)].append(k)
known={};unresolved=[]
for x in original['items']:
 if x['type']!='anime':continue
 m=re.search(r'/anime/(\d+)',x.get('url',''))
 mid=int(x['id'][6:]) if x['id'][6:].isdigit() else int(m[1]) if m else ident.get(x['id'],{}).get('malId')
 if mid and str(mid) in items:known[x['id']]=mid
 else:unresolved.append(x['id'])
by_mid=collections.defaultdict(list)
for key,mid in known.items():by_mid[mid].append(key)
original_by_id={x['id']:x for x in original['items']}
# Never delete or rewrite IDs used by local favorites or personal progress.
result=json.loads(json.dumps(original));newids=[]
for mid,r in sorted(items.items(),key=lambda kv:int(kv[0])):
 if int(mid) in by_mid:continue
 key='anime-'+mid
 if key in original_by_id:raise ValueError('ID conflict '+key)
 x={'id':key,'type':'anime','title':r['title'],'original':r['japanese'],'english':r['english'],'italian':'','format':r['format'],'status':'Da vedere','rating':None,'favorite':False,'progress':0,'total':r['episodes'],'url':r['sourceUrl'],'genres':r['genres'],'adult':'Hentai' in r['genres'] or 'Erotica' in r['genres'],'mediaFormat':r['format'],'image':''}
 result['items'].append(x);known[key]=int(mid);by_mid[int(mid)].append(key);newids.append(key)
def category(r):
 fmt=r['format']
 if r['malId'] in crossovers:return 'Crossover'
 if fmt=='Movie':return 'Film'
 if fmt in ['OVA','Special','TV Special','Music']:return {'TV Special':'Special','Music':'Video musicali'}.get(fmt,fmt)
 if any(e['relation'] in ['Parent Story','Parent story','Full Story','Full story'] for e in r['relations']):return 'Spin-off e storie laterali'
 return 'Stagioni e serie'
def order(mid):
 r=items[str(mid)];return (category(r)!='Stagioni e serie',r.get('startDate') or str(r.get('year') or 9999),mid)
groups={}
for key,members in components.items():
 members.sort(key=order);rep=items[str(members[0])];groups['mal-franchise-'+str(key)]={'title':rep['title'],'malIds':members,'representativeId':by_mid[members[0]][0]}
for x in result['items']:
 if x['type']!='anime' or x['id'] not in known:continue
 mid=known[x['id']];r=items[str(mid)];season=seasonal.get('anime-'+str(mid),{});regional=checks.get(re.split(r'/stagione-|/episodio-',r.get('streamingSource',''))[0],{})
 offers=list(r['streaming'])
 if season.get('streamingOfficialSource'):
  for offer in season.get('streaming',[]):
   if offer.get('country')=='IT' and not any(z['name']==offer['name'] and z['url']==offer['url'] for z in offers):offers.append(offer)
 x.update({'malId':mid,'metadataKey':'anime-'+str(mid),'franchiseId':'mal-franchise-'+str(root(mid)),'franchiseTitle':groups['mal-franchise-'+str(root(mid))]['title'],'seasonCategory':category(r),'metadataCheckedAt':r['checkedAt'],'metadataAvailable':r.get('metadataAvailable',True),'releaseStatus':r['releaseStatus'],'releaseYear':r.get('year'),'aired':r['aired'],'startDate':r['startDate'],'endDate':r['endDate'],'studio':r['studio'],'mediaFormat':r['format'],'original':r['japanese'],'english':r['english'],'url':r['sourceUrl'],'source':r['source'],'officialSources':r['officialSources'],'streamingOffers':offers,'streaming':', '.join(dict.fromkeys(z['name'] for z in offers)),'streamingSource':r.get('streamingSource',''),'format':{'TV':'Serie','ONA':'Serie web','Movie':'Film','TV Special':'Special TV'}.get(r['format'],r['format']),'synopsis':season.get('synopsisIt') or ac.get(x['id'],{}).get('synopsisExcerptIt') or (' '.join(regional.get('synopsisIt','').split()[:18])+'…' if regional.get('synopsisIt') else '') or r['synopsis'],'synopsisLanguage':'it' if season.get('synopsisIt') or ac.get(x['id'],{}).get('synopsisExcerptIt') or regional.get('synopsisIt') else 'en','synopsisSource':season.get('synopsisSource') or (ac.get(x['id'],{}).get('sourceUrl') if ac.get(x['id'],{}).get('synopsisExcerptIt') else '') or regional.get('url') or r['sourceUrl'],'synopsisIsExcerpt':not bool(season.get('synopsisIt')),'italianSeriesTitle':regional.get('italianSeriesTitle',''),'italianTitleSource':regional.get('url',''),'italianTitleVerified':bool(season.get('italian') and season.get('titleItSource')),'totalVerified':r['episodes'],'sourceChecks':{'mal':'verified' if r.get('metadataAvailable') else 'page-unavailable','animeClick':ac.get(x['id'],{}).get('status','related-franchise-not-separately-verified'),'official':'reachable' if any(checks.get(u,{}).get('status')=='reachable' for u in r['officialSources']) else 'not-verified'}})
 if ac.get(x['id'],{}).get('sourceUrl'):x['animeclick']=ac[x['id']]['sourceUrl'];x['animeClickCheck']=ac[x['id']]
 if season.get('italian') and season.get('titleItSource'):x['italian']=season['italian'];x['italianTitleSource']=season['titleItSource']
 # Source images override borrowed placeholder covers. Adult covers remain suppressed.
 x['image']='' if x.get('adult') else r['image']
 if x['id'] in newids:x['total']=r['episodes']
# Contextual AnimeClick links never masquerade as a season-specific verification.
group_ac={}
for x in result['items']:
 if x.get('animeClickCheck',{}).get('status')=='metadata-retrieved':group_ac.setdefault(x['franchiseId'],x['animeClickCheck']['sourceUrl'])
for x in result['items']:
 if x['type']=='anime' and not x.get('animeclick') and x.get('franchiseId') in group_ac:
  x['animeclick']=group_ac[x['franchiseId']];x['animeClickContextOnly']=True
credits=json.loads((ROOT/'anime-details.json').read_text())
music_path=ROOT/'data/official-music-checks.json';music=json.loads(music_path.read_text()) if music_path.exists() else {}
normal=lambda t:re.sub(r'[^\w]','',t.casefold())
official_songs=0
for mid,r in items.items():
 c=r['credits']
 for kind in ['openings','endings']:
  for song in c[kind]:
   title=normal(song['title']);artist=normal(song['artist'])
   if len(title)<5 or len(artist)<4:continue
   found=next((v for u in r['officialSources'] for v in music.get(u,{}).get('videos',[]) if title in normal(v['context']) and artist in normal(v['context'])),None)
   if found:song.update({'officialYoutubeUrl':found['url'],'officialVideoSource':found['sourceUrl']});official_songs+=1
 credits['items']['anime-'+mid]=c
credits['updatedAt']=datetime.datetime.now(datetime.timezone.utc).isoformat()
(ROOT/'anime-details.json').write_text(json.dumps(credits,ensure_ascii=False,separators=(',',':'))+'\n')
# Freeze personal fields verbatim for every pre-existing record.
personal=['id','status','rating','favorite','progress','total','owned','numbers','volumes']
for x in result['items']:
 if x['id'] in original_by_id:
  for k in personal:
   assert x.get(k)==original_by_id[x['id']].get(k),(x['id'],k)
assert len({x['id'] for x in result['items']})==len(result['items'])
result['catalogUpdatedAt']=datetime.datetime.now(datetime.timezone.utc).isoformat();result['franchises']=groups
(ROOT/'library.json').write_text(json.dumps(result,ensure_ascii=False,separators=(',',':'))+'\n')
# Public metadata retains facts/provenance, with credits stored separately.
for r in items.values():r.pop('credits',None)
meta['updatedAt']=result['catalogUpdatedAt'];(ROOT/'catalog-metadata.json').write_text(json.dumps(meta,ensure_ascii=False,separators=(',',':'))+'\n')
report={'checkedAt':result['catalogUpdatedAt'],'baselineCommit':BASE,'originalAnime':sum(x['type']=='anime' for x in baseline['items']),'verifiedMalEntries':sum(r.get('metadataAvailable',True) for r in items.values()),'unreadableSourceEntries':sum(not r.get('metadataAvailable',True) for r in items.values()),'franchises':len(groups),'newEntries':sum(x['type']=='anime' and x['id'] not in {b['id'] for b in baseline['items']} for x in result['items']),'newIds':[x['id'] for x in result['items'] if x['type']=='anime' and x['id'] not in {b['id'] for b in baseline['items']}],'unresolvedOriginalIds':unresolved,'duplicateIdentityGroups':{str(k):v for k,v in by_mid.items() if len(v)>1},'errors':meta['errors'],'missing':{k:sum(not r.get(k) for r in items.values()) for k in ['japanese','english','episodes','studio','synopsis','streaming','officialSources']},'emptyCast':sum(not credits['items']['anime-'+mid]['cast'] for mid in items),'emptyThemes':sum(not(credits['items']['anime-'+mid]['openings'] or credits['items']['anime-'+mid]['endings']) for mid in items),'officialMusicVideos':official_songs,'youtubeDirect':sum(bool(song['youtubeUrl']) for mid in items for kind in ['openings','endings'] for song in credits['items']['anime-'+mid][kind]),'animeClickSearches':len(ac),'animeClickChecks':dict(collections.Counter(z['status'] for z in ac.values())),'officialSourceChecks':len(checks),'officialSourceReachable':sum(z.get('status')=='reachable' for z in checks.values()),'personalFieldsPreserved':True,'limitations':['AnimeClick direct HTTP reads blocked; 794 title/alias searches and selected page reads performed; ambiguous matches remain unverified.','YouTube URLs supplied by MAL are direct links; official channel ownership is not presumed.','A missing streaming offer does not imply unavailability.','Unannounced sequels are not inferred.']}
(ROOT/'data/catalog-audit.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n');print(json.dumps({k:v for k,v in report.items() if k not in ['newIds','duplicateIdentityGroups']},ensure_ascii=False,indent=2))
