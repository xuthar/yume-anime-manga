import json,re,time,urllib.parse,urllib.request,pathlib,concurrent.futures
ROOT=pathlib.Path(__file__).resolve().parent
items=[x for x in json.loads((ROOT/'library.json').read_text())['items'] if x['type']=='anime' and not x['id'][6:].isdigit()]
OUT=ROOT/'data/catalog-identities.json';out=json.loads(OUT.read_text()) if OUT.exists() else {}
norm=lambda s:re.sub(r'[^a-z0-9]','',s.lower().replace('△',''))
def search(x):
 # Use distinctive full titles; retain every candidate for explicit identity review.
 q=re.sub(r'\bSeason \d+\b|\b\d+(?:st|nd|rd|th) Season\b','',x['title']).strip()
 u='https://myanimelist.net/search/prefix.json?type=anime&keyword='+urllib.parse.quote(q)+'&v=1'
 try:
  d=json.loads(urllib.request.urlopen(urllib.request.Request(u,headers={'User-Agent':'Mozilla/5.0'}),timeout=30).read())
  candidates=[{'malId':int(z['id']),'title':z['name'],'url':z['url']} for cat in d.get('categories',[]) for z in cat.get('items',[]) if '/anime/' in z.get('url','')]
  exact=[z for z in candidates if norm(z['title'])==norm(x['title'])]
  return x['id'],{'malId':exact[0]['malId'] if len(exact)==1 else None,'candidates':candidates,'query':q,'sourceUrl':u}
 except Exception as e:return x['id'],{'error':str(e),'sourceUrl':u}
with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool:
 fs=[]
 for x in items:
  if x['id'] not in out:fs.append(pool.submit(search,x));time.sleep(.75)
 for f in concurrent.futures.as_completed(fs):
  k,v=f.result();out[k]=v;OUT.write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n');print(k,v.get('malId'),len(v.get('candidates',[])),v.get('error',''),flush=True)
