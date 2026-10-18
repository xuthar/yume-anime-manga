"""Resumable, identity-checked MAL relation traversal. Never writes personal fields."""
import concurrent.futures,datetime,json,pathlib,re,threading,time,urllib.request,urllib.parse
from lxml import html
from importlib import import_module
credits=import_module('import-anime-details')
ROOT=pathlib.Path(__file__).resolve().parent
CACHE=ROOT/'data/catalog-cache';CACHE.mkdir(exist_ok=True)
OUT=ROOT/'catalog-metadata.json'
NOW=lambda:datetime.datetime.now(datetime.timezone.utc).isoformat()
LOCK=threading.Lock();NEXT=0;URLS={}
FOLLOW={'Prequel','Sequel','Side story','Side Story','Parent story','Parent Story','Spin-off','Spin-Off','Alternative version','Alternative Version','Alternative setting','Alternative Setting','Summary','Compilation','Full story','Full Story'}
def txt(n):return ' '.join(n.text_content().split()) if n is not None else ''
def first(a):return a[0] if a else None
def field(doc,label):
 n=first(doc.xpath('//span[contains(@class,"dark_text") and normalize-space(text())="'+label+':"]'))
 value=txt(n.getparent()).removeprefix(label+':').strip() if n is not None else ''
 return '' if value.lower().startswith('none found') or value.lower() in ['unknown','not available','n/a'] else value
def get(url):
 global NEXT
 for attempt in range(3):
  with LOCK:
   wait=max(0,NEXT-time.monotonic());NEXT=max(NEXT,time.monotonic())+.7
  time.sleep(wait)
  try:return urllib.request.urlopen(urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0','Accept-Language':'it-IT,it;q=0.9,en;q=0.8'}),timeout=32).read()
  except Exception:
   if attempt==2:raise
   time.sleep(3*(attempt+1))
def parse(page,mid):
 doc=html.fromstring(page.decode('utf-8') if isinstance(page,bytes) else page);canonical=doc.xpath('//meta[@property="og:url"]/@content')
 if not canonical or not re.match(r'https://myanimelist.net/anime/'+str(mid)+r'(?:/|$)',canonical[0]):raise ValueError('Identity mismatch')
 title=txt(first(doc.xpath('//h1//strong')))
 if not title:title=txt(first(doc.xpath('//h1')))
 relations=[]
 for entry in doc.xpath('//div[@class="related-entries"]//div[contains(concat(" ",@class," ")," entry ")]'):
  a=first(entry.xpath('.//div[@class="title"]/a'));kind=txt(first(entry.xpath('.//div[@class="relation"]'))).split('(')[0].strip()
  if a is not None and re.search(r'/anime/(\d+)',a.get('href','')):relations.append({'malId':int(re.search(r'/anime/(\d+)',a.get('href'))[1]),'relation':kind,'title':txt(a),'url':a.get('href')})
 for row in doc.xpath('//div[@class="related-entries"]//tr | //table[contains(@class,"anime_detail_related_anime")]//tr'):
  kind=txt(first(row.xpath('./td'))).rstrip(':')
  for a in row.xpath('.//a[contains(@href,"/anime/")]'):
   m=re.search(r'/anime/(\d+)',a.get('href',''))
   if m:relations.append({'malId':int(m[1]),'relation':kind,'title':txt(a),'url':urllib.parse.urljoin(canonical[0],a.get('href'))})
 synopsis=txt(first(doc.xpath('//*[@itemprop="description"]')));synopsis=re.split(r'\[(?:Written|Source)',synopsis)[0].strip()
 if re.search(r'no synopsis (?:information|has been)',synopsis,re.I):synopsis=''
 synopsis=' '.join(synopsis.split()[:18])+('…' if len(synopsis.split())>18 else '')
 img=first(doc.xpath('//img[@itemprop="image"]'));image=(img.get('data-src') or img.get('src') or '') if img is not None else ''
 streaming=[];streamSource=''
 for raw in doc.xpath('//*[@data-raw]/@data-raw'):
  try:d=json.loads(raw)
  except Exception:continue
  if not isinstance(d,dict):continue
  streamSource=d.get('credit_urls',{}).get('justwatch',streamSource)
  for offer in d.get('data',[]):
   if not isinstance(offer,dict) or not isinstance(offer.get('platform'),dict):continue
   u=offer.get('url','');q=urllib.parse.parse_qs(urllib.parse.urlsplit(u).query);country=q.get('uct_country',[''])[0].lower();target=q.get('r',[u])[0]
   if offer.get('available') and country=='it' and target.startswith('https://'):streaming.append({'name':offer['platform']['name'],'url':target,'country':'IT','access':offer.get('monetization_label','')})
 officials=[]
 for a in doc.xpath('//a[normalize-space(.)="Official Site"]'):
  if a.get('href','').startswith('https://'):officials.append(a.get('href'))
 date=first(doc.xpath('//span[@itemprop="startDate"]'));end=first(doc.xpath('//span[@itemprop="endDate"]'))
 result={'malId':mid,'title':title,'japanese':field(doc,'Japanese'),'english':field(doc,'English'),'synonyms':field(doc,'Synonyms'),'format':field(doc,'Type'),'episodes':int(field(doc,'Episodes')) if field(doc,'Episodes').isdigit() else None,'releaseStatus':field(doc,'Status'),'aired':field(doc,'Aired'),'startDate':date.get('content','') if date is not None else '','endDate':end.get('content','') if end is not None else '','studio':field(doc,'Studios'),'source':field(doc,'Source'),'duration':field(doc,'Duration'),'image':image,'synopsis':synopsis,'synopsisLanguage':'en','relations':relations,'streaming':streaming,'streamingSource':streamSource,'officialSources':officials,'sourceUrl':canonical[0],'checkedAt':NOW(),'credits':credits.parse_page(page,mid)}
 result['year']=int(re.search(r'\b(?:19|20)\d{2}\b',result['aired'])[0]) if re.search(r'\b(?:19|20)\d{2}\b',result['aired']) else None
 for side in ['startDate','endDate']:
  part=result['aired'].split(' to ')[0 if side=='startDate' else -1]
  try:result[side]=datetime.datetime.strptime(part,'%b %d, %Y').date().isoformat()
  except ValueError:pass
 result['genres']=[txt(a) for a in doc.xpath('//span[@itemprop="genre"]')]
 if not result['startDate']:
  for script in doc.xpath('//script[@type="application/ld+json"]/text()'):
   try:
    ld=json.loads(script);result['startDate']=ld.get('startDate','');result['endDate']=ld.get('endDate','')
   except (ValueError,AttributeError):pass
 return result

def fetch(mid):
 p=CACHE/(str(mid)+'.html')
 try:
  page=p.read_bytes() if p.exists() else get(URLS.get(mid,'https://myanimelist.net/anime/'+str(mid)))
  record=parse(page,mid)
  if not p.exists():p.write_bytes(page)
  return mid,record,None
 except Exception as e:return mid,None,str(e)
def main():
 lib=json.loads((ROOT/'library.json').read_text());records=json.loads(OUT.read_text()) if OUT.exists() else {'schemaVersion':1,'items':{},'errors':{}}
 seed={int(m[1]) for x in lib['items'] if x['type']=='anime' for m in [re.search(r'/anime/(\d+)',x.get('url',''))] if m}
 resolved=ROOT/'data/catalog-identities.json'
 if resolved.exists():seed.update(v['malId'] for v in json.loads(resolved.read_text()).values() if v.get('malId'))
 seed|={int(x['id'][6:]) for x in lib['items'] if x['type']=='anime' and x['id'][6:].isdigit()}
 URLS.update({int(m[1]):x['url'] for x in lib['items'] if x['type']=='anime' for m in [re.search(r'/anime/(\d+)',x.get('url',''))] if m})
 # Other metadata sources may resolve previously added placeholder IDs.
 seasonal=json.loads((ROOT/'seasons.json').read_text())['items']
 names=lambda t:re.sub(r'[^a-z0-9]','',t.lower())
 known={names(x['title']):x['malId'] for x in seasonal.values()}
 for x in lib['items']:
  if x['type']=='anime' and names(x['title']) in known:seed.add(known[names(x['title'])])
 def save():
  records['updatedAt']=NOW();records['seedIds']=sorted(seed);OUT.write_text(json.dumps(records,ensure_ascii=False,separators=(',',':'))+'\n')
 for cache in CACHE.glob('*.html'):
  try:records['items'][cache.stem]=parse(cache.read_bytes(),int(cache.stem));records['errors'].pop(cache.stem,None)
  except Exception:pass
 save()
 processed=set(map(int,records['items']));failed=set();pending=set(seed)-processed;roundn=0
 while True:
  for r in records['items'].values():
   URLS.update({e['malId']:e['url'] for e in r['relations']})
   pending.update(e['malId'] for e in r['relations'] if e['relation'] in FOLLOW and e['malId'] not in processed|failed)
  pending-=processed|failed
  if not pending:break
  batch=sorted(pending);pending.clear();roundn+=1;print('ROUND',roundn,'queued',len(batch),'saved',len(processed),flush=True)
  with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool:
   for i,(mid,r,error) in enumerate(pool.map(fetch,batch),1):
    if r:records['items'][str(mid)]=r;processed.add(mid);records['errors'].pop(str(mid),None)
    else:records['errors'][str(mid)]=error;failed.add(mid)
    if i%20==0 or i==len(batch):save();print('PROGRESS',len(processed),'round',str(i)+'/'+str(len(batch)),'errors',len(failed),flush=True)
 save();print('DONE',len(processed),'records',len(failed),'errors',flush=True)
if __name__=='__main__':main()
