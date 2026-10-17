"""Import seasonal MAL catalog and region-tagged Italian streaming offers."""
import concurrent.futures,datetime,json,pathlib,re,time,urllib.parse,urllib.request
from lxml import html
ROOT=pathlib.Path(__file__).resolve().parent
OUT=ROOT/'seasons.json'
CACHE=pathlib.Path('/tmp/yume-season-pages'); CACHE.mkdir(exist_ok=True)
NOW=datetime.datetime.now(datetime.timezone.utc).isoformat()
def txt(n): return ' '.join(n.text_content().split()) if n is not None else ''
def one(v):return v[0] if v else None
def get(url):
 url=urllib.parse.quote(url,safe=':/?&=%')
 for attempt in range(3):
  try:return urllib.request.urlopen(urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0'}),timeout=35).read().decode('utf-8')
  except Exception:
   if attempt==2:raise
   time.sleep(2+attempt*3)
def parse_season(key,label,slug,period):
 url=f'https://myanimelist.net/anime/season/2026/{slug}'
 p=CACHE/(key+'.html')
 if not p.exists():p.write_text(get(url))
 doc=html.fromstring(p.read_text());entries=[];items={}
 for c in doc.xpath('//div[contains(concat(" ",normalize-space(@class)," ")," seasonal-anime ")]'):
  a=one(c.xpath('.//a[contains(@class,"link-title")]'))
  if a is None:continue
  mal_id=int(re.search(r'/anime/(\d+)',a.get('href'))[1]);ident='anime-'+str(mal_id)
  group=txt(one(c.getparent().xpath('./div[@class="anime-header"]')))
  entries.append({'id':ident,'continuing':'Continuing' in group})
  props={}
  for row in c.xpath('.//div[@class="property"]'):
   cap=txt(one(row.xpath('./span[@class="caption"]')));props[cap]=', '.join(txt(z) for z in row.xpath('./span[@class="item"]'))
  image=one(c.xpath('./div[@class="image"]//img'));genres=[t.strip() for t in c.xpath('.//div[contains(@class,"genres-inner")]//a/text()')]
  adult='r18' in c.get('class','').split() or any(z in genres for z in ['Hentai','Erotica'])
  synopsis=txt(one(c.xpath('.//p[contains(@class,"preline")]')))
  synopsis=re.split(r'\[(?:Written|Source)',synopsis)[0].strip()
  services=[];other=[];streaming_source=''
  broadcast=one(c.xpath('.//*[@data-raw]'))
  if broadcast is not None:
   raw=json.loads(broadcast.get('data-raw'));streaming_source=raw.get('credit_urls',{}).get('justwatch','')
   for offer in raw.get('data',[]):
    u=offer.get('url','');q=urllib.parse.parse_qs(urllib.parse.urlsplit(u).query);country=q.get('uct_country',[''])[0].lower();target=q.get('r',[u])[0]
    if not target.startswith('https://'):continue
    entry={'name':offer['platform']['name'],'url':target,'country':country.upper() or None,'access':offer.get('monetization_label','')}
    if offer.get('available') and country=='it':services.append(entry)
    elif offer.get('available'):other.append(entry)
  info=txt(one(c.xpath('.//div[@class="info"]')))
  date=txt(one(c.xpath('.//span[contains(@class,"js-start_date")]')))
  items[ident]={'id':ident,'malId':mal_id,'title':txt(a),'japanese':'','english':'','italian':'','url':a.get('href'),'format':group.replace('TV (New)','TV').replace('TV (Continuing)','TV').replace('Movie','Film'),'genres':genres,'studio':props.get('Studios',props.get('Studio','')),'source':props.get('Source',''),'episodes':int(re.search(r'(\d+) eps',info)[1]) if re.search(r'(\d+) eps',info) else None,'duration':re.search(r'(\d+) min',info)[1]+' min' if re.search(r'(\d+) min',info) else '', 'releaseDate':f'{date[:4]}-{date[4:6]}-{date[6:8]}' if len(date)==8 and date.isdigit() else '', 'score':txt(one(c.xpath('.//span[contains(@class,"js-score")]'))),'image':image.get('src') or image.get('data-src') if image is not None and not adult else '', 'adult':adult,'synopsisOriginal':synopsis[:1400] if not adult else '', 'synopsisIt':'','streaming':services,'otherStreaming':other,'streamingSource':streaming_source,'checkedAt':NOW}
 return {'key':key,'label':label,'year':2026,'period':period,'sourceUrl':url,'entries':entries},items

def detail(item):
 p=CACHE/(str(item['malId'])+'.html')
 try:
  if not p.exists():p.write_text(get(item['url']))
  doc=html.fromstring(p.read_text())
  u=doc.xpath('//meta[@property="og:url"]/@content')
  if not u or not re.match(r'https://myanimelist.net/anime/'+str(item['malId'])+r'(?:/|$)',u[0]):raise ValueError('Identity mismatch')
  for label,key in [('Japanese:','japanese'),('English:','english')]:
   span=one(doc.xpath('//span[contains(@class,"dark_text") and normalize-space(text())="'+label+'"]'))
   if span is not None:item[key]=txt(span.getparent()).removeprefix(label).strip()
  item['detailsChecked']=True
 except Exception as e:item['detailsError']=str(e)
 return item

def main():
 result={'updatedAt':NOW,'region':'IT','seasons':[],'items':{}}
 for args in [('summer-2026','Summer','summer','Luglio – Settembre 2026'),('autumn-2026','Autumn','fall','Ottobre – Dicembre 2026'),('winter-2026','Winter','winter','Gennaio – Marzo 2026')]:
  season,items=parse_season(*args);result['seasons'].append(season)
  for key,item in items.items():
   if key not in result['items']:result['items'][key]=item
  print(args[1],len(season['entries']),flush=True)
 # Seed Italian catalog titles and reusable local covers without changing personal records.
 library=json.loads((ROOT/'library.json').read_text());personal={x['id']:x for x in library['items'] if x['type']=='anime'}
 for key,item in result['items'].items():
  if key in personal:
   x=personal[key];item['italian']=x.get('italian','');item['japanese']=x.get('original','');item['english']=x.get('english','')
   if x.get('image') and not item['adult']:item['image']=x['image']
 def save():OUT.write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
 save();print('Unique titles',len(result['items']),flush=True)
 # Pace public metadata reads; cache makes re-running imports inexpensive.
 with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
  futures=[]
  for item in result['items'].values():
   futures.append(pool.submit(detail,item))
   if not (CACHE/(str(item['malId'])+'.html')).exists():time.sleep(.65)
  for i,f in enumerate(concurrent.futures.as_completed(futures),1):
   item=f.result();result['items'][item['id']]=item
   if i%40==0 or i==len(futures):save();print('Metadata',i,'/',len(futures),flush=True)
 save();print('DONE',flush=True)
if __name__=='__main__':main()
