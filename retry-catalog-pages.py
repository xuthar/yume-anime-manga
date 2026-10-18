import concurrent.futures,json,pathlib,urllib.request,time
ROOT=pathlib.Path(__file__).resolve().parent
x=json.loads((ROOT/'catalog-metadata.json').read_text());refs={str(z['malId']):z for r in x['items'].values() for z in r['relations']}
def fetch(mid):
 p=ROOT/'data/catalog-cache'/(mid+'.html')
 if p.exists():return mid,'cached'
 if mid not in refs:return mid,'no canonical URL'
 try:
  with urllib.request.urlopen(urllib.request.Request(refs[mid]['url'],headers={'User-Agent':'Mozilla/5.0'}),timeout=30) as r:d=r.read()
  p.write_bytes(d);return mid,'recovered'
 except Exception as e:return mid,str(e)
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
 for z in pool.map(fetch,x['errors']):print(z,flush=True)
