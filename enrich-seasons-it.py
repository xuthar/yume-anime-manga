import concurrent.futures,json,pathlib,re,time,urllib.request
from lxml import html
ROOT=pathlib.Path(__file__).resolve().parent
CACHE=pathlib.Path('/tmp/yume-season-italian-base');CACHE.mkdir(exist_ok=True)
x=json.loads((ROOT/'seasons.json').read_text())
items=[z for z in x['items'].values() if z['streamingSource'].startswith('https://www.justwatch.com/it/')]
def get(z):
 path=CACHE/(str(z['malId'])+'.json')
 if path.exists():return
 try:
  u=re.split(r'/stagione-|/episodio-',z['streamingSource'])[0];doc=html.fromstring(urllib.request.urlopen(urllib.request.Request(u,headers={'User-Agent':'Mozilla/5.0'}),timeout=25).read().decode())
  h=doc.xpath('//h1');title=' '.join((h[0].text or h[0].text_content()).split()) if h else ''
  title=re.sub(r'\s*\(\d{4}\)\s*$','',title).strip()
  syn=doc.xpath('//p[contains(@class,"text-wrap-pre-line")]');syn=' '.join(syn[0].text_content().split()) if syn else ''
  path.write_text(json.dumps({'id':z['id'],'italian':title,'synopsis':syn[:1000] if not z['adult'] else '', 'sourceUrl':u},ensure_ascii=False))
 except Exception as e:path.write_text(json.dumps({'id':z['id'],'error':str(e)}))
with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool:
 fs=[]
 for z in items:fs.append(pool.submit(get,z));time.sleep(.3)
 for i,f in enumerate(concurrent.futures.as_completed(fs),1):
  f.result()
  if i%40==0 or i==len(fs):print('Italian metadata',i,'/',len(fs),flush=True)
print('DONE',flush=True)
# Persist only short excerpts and factual catalog metadata, not complete source pages.
out=ROOT/'data/season-italian-metadata.json'
records=json.loads(out.read_text()).get('items',{}) if out.exists() else {}
for directory in [pathlib.Path('/tmp/yume-season-italian'),CACHE]:
 for f in directory.glob('*.json'):
  z=json.loads(f.read_text())
  if not z.get('italian'):continue
  title=z['italian'].split(' - ')[0].strip()
  entry={'id':z['id'],'italian':title,'sourceUrl':z['sourceUrl'],'synopsis':''}
  if directory==CACHE and z.get('synopsis'):
   words=z['synopsis'].split();entry['synopsis']=' '.join(words[:18])+('…' if len(words)>18 else '')
  records[z['id']]=entry
out.parent.mkdir(exist_ok=True);out.write_text(json.dumps({'items':records},ensure_ascii=False,indent=2)+'\n')
