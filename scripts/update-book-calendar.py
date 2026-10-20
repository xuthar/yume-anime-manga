"""Dated IT/EN book releases. Refresh sources independently; retain last good data on failures."""
import concurrent.futures,json,re,urllib.request
from datetime import date,datetime,timedelta
from pathlib import Path
from urllib.parse import urljoin
from zoneinfo import ZoneInfo
from lxml import html
ROOT=Path(__file__).resolve().parents[1]
MONTHS='gennaio febbraio marzo aprile maggio giugno luglio agosto settembre ottobre novembre dicembre'.split()
EN_MONTHS='jan feb mar apr may jun jul aug sep oct nov dec'.split()
SOURCES={
 'animeclick-manga':('AnimeClick · manga IT','https://www.animeclick.it/calendario-manga','IT'),
 'animeclick-novel':('AnimeClick · novel IT','https://www.animeclick.it/calendario-novel','IT'),
 'seven-seas':('Seven Seas · EN','https://sevenseasentertainment.com/release-dates/','EN'),
 'yen-press':('Yen Press · EN','https://yenpress.com/calendar','EN'),
 'j-novel-club':('J-Novel Club · ebook EN','https://j-novel.club/calendar','EN')}
def text(node,xpath='.'):
 return ' '.join(' '.join(n.text_content() if hasattr(n,'text_content') else str(n) for n in node.xpath(xpath)).split())
def parse_ac(doc,key):
 heading=text(doc,'//h2').lower();m=re.search(r'('+'|'.join(MONTHS)+r')\s+(\d{4})',heading)
 if not m:raise ValueError('Month not found')
 year,month=int(m[2]),MONTHS.index(m[1])+1
 if not doc.xpath('//*[@id="main-row-loop"]'):raise ValueError('Calendar structure not found')
 result=[];day=None
 for block in doc.xpath('//*[@id="main-row-loop"]/*'):
  if 'date-separator' in block.get('class',''):
   day=date(year,month,int(text(block,'.//*[contains(@class,"date")]'))).isoformat();continue
  for card in block.xpath('.//*[contains(@class,"panel-evento-calendario")]'):
   links=card.xpath('.//a/@href')
   if not day or not links or not links[0].startswith('/edizione/') or not card.xpath('.//img[contains(@src,"/IT.png")]'):continue
   result.append({'date':day,'title':text(card,'.//h3'),'series':text(card,'.//h5'),'publisher':text(card,'.//h4'),'language':'IT','kind':'novel' if key.endswith('novel') else 'manga','edition':'Edizione italiana','url':urljoin('https://www.animeclick.it',links[0])})
 # An explicitly empty calendar is valid; an unexplained empty response is not.
 if not result and not re.search(r'Trovati\s+0\s+elementi',text(doc)):raise ValueError('Unrecognized empty calendar')
 return result

def parse_seven(doc):
 result=[]
 for row in doc.xpath('//table[@id="releasedates"]//tr[td]'):
  cells=row.xpath('./td')
  if len(cells)<4:continue
  day,title,kind,isbn=[text(c) for c in cells[:4]];links=cells[1].xpath('.//a/@href')
  if kind not in ['Manga','Manhwa','Manhua','Light Novel','Novel'] or not links:continue
  date.fromisoformat(day)
  # The title takes precedence over inconsistent table labels (some novels are labelled Manga).
  novel='novel' in title.casefold() or kind in ['Light Novel','Novel']
  result.append({'date':day,'title':title,'series':title,'publisher':'Seven Seas','language':'EN','kind':'novel' if novel else 'manga','edition':'Cartaceo · mercato anglofono','isbn':isbn,'url':links[0]})
 if not result:raise ValueError('No recognized release rows')
 return result

def parse_yen(doc):
 years=doc.xpath('//select[@id="year"]/option[@selected]/@value')
 if len(years)!=1:raise ValueError('Selected year missing')
 result=[]
 for box in doc.xpath('//*[contains(concat(" ",normalize-space(@class)," ")," released-box ")]'):
  kind=text(box,'.//*[contains(@class,"white-label")]');title=text(box,'.//h3')
  if kind not in ['Manga','Novels'] or re.search(r'\b(?:chapter|episode)\b',title,re.I):continue
  day=text(box,'.//p[contains(@class,"label-date")]/text()');month=text(box,'.//span[contains(@class,"month")]').lower()[:3]
  links=box.xpath('ancestor::a[1]/@href')
  if not links or month not in EN_MONTHS:continue
  iso=date(int(years[0]),EN_MONTHS.index(month)+1,int(day)).isoformat()
  result.append({'date':iso,'title':title,'series':title,'publisher':'Yen Press / distribuzione Yen Press','language':'EN','kind':'novel' if kind=='Novels' else 'manga','edition':'Edizione EN · formato nella scheda editore','url':urljoin('https://yenpress.com',links[0])})
 if not result:raise ValueError('No recognized dated books')
 return result

def parse_jnc(doc):
 # Read server-rendered Next.js JSON as data; never execute external scripts.
 def walk(value):
  if isinstance(value,dict):
   if isinstance(value.get('events'),list):yield from value['events']
   else:
    for child in value.values():yield from walk(child)
  elif isinstance(value,list):
   for child in value:yield from walk(child)
 result=[];found=False
 for script in doc.xpath('//script[not(@src)]'):
  raw=script.text or ''
  if not raw.startswith('self.__next_f.push('):continue
  try:
   flight=json.loads(raw[raw.find('(')+1:raw.rfind(')')])
   if len(flight)<2 or not isinstance(flight[1],str) or ':[' not in flight[1]:continue
   obj=json.JSONDecoder().raw_decode(flight[1].split(':',1)[1])[0]
  except (ValueError,TypeError):continue
  for event in walk(obj):
   found=True
   if event.get('details')!='Ebook Publishing':continue
   series=event.get('serie') or {};kind=series.get('type');link=event.get('legacyLink','')
   if kind not in [1,2] or not link.startswith('/series/'):continue
   day=datetime.fromtimestamp(int(event['launch']['seconds']),ZoneInfo('Europe/Rome')).date().isoformat()
   result.append({'date':day,'title':event['name'],'series':series.get('title',event['name']),
      'publisher':'J-Novel Club','language':'EN','kind':'novel' if kind==1 else 'manga',
      'edition':'Ebook completo · non prepubblicazione','url':urljoin('https://j-novel.club',link)})
 if not found:raise ValueError('JNC calendar events not found')
 return result

def fetch(key):
 label,url,lang=SOURCES[key]
 req=urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0 (Yume weekly book releases)'})
 with urllib.request.urlopen(req,timeout=45) as r:doc=html.fromstring(r.read())
 events=parse_ac(doc,key) if key.startswith('animeclick') else parse_seven(doc) if key=='seven-seas' else parse_yen(doc) if key=='yen-press' else parse_jnc(doc)
 return events

def main():
 now=datetime.now(ZoneInfo('Europe/Rome'));today=now.date();cutoff=(today-timedelta(days=21)).isoformat()
 path=ROOT/'data/book-calendar.json';old=json.loads(path.read_text()) if path.exists() else {'sources':[],'releases':[]}
 old_sources={s['id']:s for s in old.get('sources',[])};sources=[];releases=[];success=0
 with concurrent.futures.ThreadPoolExecutor(max_workers=5) as pool:
  pending={k:pool.submit(fetch,k) for k in SOURCES}
  for key,(label,url,lang) in SOURCES.items():
   prior=[x for x in old['releases'] if x['sourceId']==key and x['date']>=cutoff]
   try:
    events=pending[key].result();success+=1
    # All current/future listings for this source are replaced, including cancellations.
    events=[x for x in prior if x['date']<today.isoformat()]+events
    for e in events:e['sourceId']=key
    sources.append({'id':key,'name':label,'url':url,'language':lang,'checkedAt':now.isoformat(),'status':'ok'})
   except Exception as exc:
    print(key,'FAILED:',exc);events=prior
    sources.append({'id':key,'name':label,'url':url,'language':lang,'checkedAt':old_sources.get(key,{}).get('checkedAt'),'status':'error'})
   releases.extend(x for x in events if x['date']>=cutoff)
 if not success:raise RuntimeError('All sources failed; keep the last published calendar')
 # ISBN is edition-specific. Without ISBN, only identical source URLs identify a release.
 unique={(e['sourceId'],e['isbn'] if e.get('isbn') else e['url']):e for e in releases}
 payload={'updatedAt':now.isoformat(),'timezone':'Europe/Rome','sources':sources,'releases':sorted(unique.values(),key=lambda e:(e['date'],e['language'],e['title']))}
 temp=path.with_suffix('.tmp');temp.write_text(json.dumps(payload,ensure_ascii=False,indent=2)+'\n');temp.replace(path)
 print(f"Book calendar: {len(unique)} releases; {success}/{len(SOURCES)} sources refreshed")
if __name__=='__main__':main()
