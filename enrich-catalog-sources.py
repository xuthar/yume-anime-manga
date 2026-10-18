"""Check official links and Italian regional catalog pages without guessing licenses."""
import concurrent.futures,datetime,json,pathlib,re,time,urllib.request,urllib.parse
from lxml import html
ROOT=pathlib.Path(__file__).resolve().parent;OUT=ROOT/'data/catalog-source-checks.json'
checks=json.loads(OUT.read_text()) if OUT.exists() else {}
meta=json.loads((ROOT/'catalog-metadata.json').read_text())['items']
def fetch(url):
 try:
  req=urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0','Accept-Language':'it-IT,it;q=0.9'})
  with urllib.request.urlopen(req,timeout=22) as r:
   body=r.read(1800000);charset=r.headers.get_content_charset() or 'utf-8';final=r.url
  doc=html.fromstring(body.decode(charset,errors='replace'))
  title=' '.join(doc.xpath('//title/text()')).strip()[:250]
  result={'url':url,'finalUrl':final,'checkedAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),'status':'reachable','pageTitle':title}
  if 'justwatch.com/it/' in final:
   h=doc.xpath('//h1');name=' '.join((h[0].text or h[0].text_content()).split()) if h else ''
   result['italianSeriesTitle']=re.sub(r'\s*\(\d{4}\)\s*$','',name).strip()
   ps=doc.xpath('//p[contains(@class,"text-wrap-pre-line")]');result['synopsisIt']=' '.join((' '.join(ps[0].text_content().split()) if ps else '').split()[:90])
   result['scope']='series-catalog-not-season-license'
  else:
   result['youtubeLinks']=list(dict.fromkeys(urllib.parse.urljoin(final,u) for u in doc.xpath('//a/@href') if re.match(r'https?://(?:www\.)?(?:youtube\.com/watch|youtu\.be/)',u)))[:30]
  return url,result
 except Exception as e:return url,{'url':url,'checkedAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),'status':'unavailable','error':str(e)}
urls=set()
for x in meta.values():
 urls.update(x.get('officialSources',[]))
 u=x.get('streamingSource','')
 if u.startswith('https://www.justwatch.com/it/'):urls.add(re.split(r'/stagione-|/episodio-',u)[0])
pending=sorted(urls-set(checks));print('Check sources',len(pending),'cached',len(checks),flush=True)
with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool:
 fs=[]
 for u in pending:fs.append(pool.submit(fetch,u));time.sleep(.15)
 for i,f in enumerate(concurrent.futures.as_completed(fs),1):
  u,r=f.result();checks[u]=r
  if i%20==0 or i==len(fs):OUT.write_text(json.dumps(checks,ensure_ascii=False,indent=2)+'\n');print(i,'/',len(fs),'checked',flush=True)
print('DONE',flush=True)
