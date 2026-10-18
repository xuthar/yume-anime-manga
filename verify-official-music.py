"""Conservatively verify song videos linked by a MAL-listed official anime site."""
import concurrent.futures,datetime,json,pathlib,re,time,urllib.parse,urllib.request
from lxml import html
ROOT=pathlib.Path(__file__).resolve().parent;OUT=ROOT/'data/official-music-checks.json';records=json.loads(OUT.read_text()) if OUT.exists() else {}
metadata=json.loads((ROOT/'catalog-metadata.json').read_text())['items']
def normalize(s):return re.sub(r'[^\w]','',s.casefold())
def scan(url):
 pages=[url];visited=[];videos=[];errors=[]
 while pages and len(visited)<4:
  u=pages.pop(0)
  if u in visited:continue
  visited.append(u)
  try:
   with urllib.request.urlopen(urllib.request.Request(u,headers={'User-Agent':'Mozilla/5.0'}),timeout=18) as r:doc=html.fromstring(r.read().decode(r.headers.get_content_charset() or 'utf-8',errors='replace'));base=r.url
   for a in doc.xpath('//a[@href] | //iframe[@src]'):
    target=urllib.parse.urljoin(base,a.get('href') or a.get('src'));parsed=urllib.parse.urlsplit(target)
    if parsed.hostname in ['youtube.com','www.youtube.com','youtu.be','www.youtube-nocookie.com']:
     video=re.search(r'(?:youtu\.be/|/embed/|[?&]v=)([\w-]{11})',target)
     if not video:continue
     parent=a
     for _ in range(3):
      if parent.getparent() is not None and len(parent.getparent().text_content())<1800:parent=parent.getparent()
     videos.append({'url':'https://www.youtube.com/watch?v='+video[1],'context':' '.join(parent.text_content().split())[:1800],'sourceUrl':base})
    elif parsed.hostname==urllib.parse.urlsplit(url).hostname and re.search(r'(?:music|theme|song|主題歌|音楽)',target+' '+a.text_content(),re.I) and target not in pages+visited and len(pages)<3:pages.append(target)
  except Exception as e:errors.append({'url':u,'error':str(e)})
 return url,{'checkedAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),'pages':visited,'videos':videos,'errors':errors}
urls=sorted({u for r in metadata.values() for u in r.get('officialSources',[]) if u.startswith('https://')}-set(records))
print('Official music sites',len(urls),flush=True)
with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool:
 fs=[]
 for url in urls:fs.append(pool.submit(scan,url));time.sleep(.2)
 for i,f in enumerate(concurrent.futures.as_completed(fs),1):
  u,r=f.result();records[u]=r
  if i%20==0 or i==len(fs):OUT.write_text(json.dumps(records,ensure_ascii=False,indent=2)+'\n');print(i,'/',len(fs),flush=True)
print('DONE',flush=True)
