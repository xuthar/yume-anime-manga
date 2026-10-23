"""ISBN verification for precise editions. Missing/ambiguous matches never become guesses."""
import re,json,html as html_std,unicodedata,urllib.request,urllib.parse,time,concurrent.futures
from pathlib import Path
from datetime import datetime,timezone
from lxml import html
ROOT=Path(__file__).resolve().parents[1]
CACHE=ROOT/'data/manga-isbn.json'
def norm(s):
 s=html_std.unescape(str(s or ''));s=''.join(c for c in unicodedata.normalize('NFKD',s.lower()) if not unicodedata.combining(c));return ' '.join(re.sub(r'[^a-z0-9]+',' ',s).split())
def clean_title(s):
 s=norm(s);s=re.sub(r'\b(?:vol(?:ume)?|n|numero)\s+(?=\d)','',s);s=re.sub(r'\b(?:volume unico|unico)\b','',s);return ' '.join(s.split())
def isbn13(raw):
 s=re.sub(r'[^0-9X]','',str(raw).upper())
 if re.fullmatch(r'\d{9}[\dX]',s) and sum((10-i)*(10 if c=='X' else int(c)) for i,c in enumerate(s))%11==0:
  t='978'+s[:9];return t+str((-sum(int(c)*(1 if i%2==0 else 3) for i,c in enumerate(t)))%10)
 if len(s)==13 and s.startswith(('978','979')) and sum(int(c)*(1 if i%2==0 else 3) for i,c in enumerate(s))%10==0:return s
 return ''
def fetch(url):
 req=urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0 (Yume bibliographic edition verification)'})
 with urllib.request.urlopen(req,timeout=25) as r:return r.read()
def identity(edition,number,publisher):return '|'.join([norm(edition),norm(number),norm(publisher)])
def product_isbn(url):
 d=html.fromstring(fetch(url));title=' '.join(d.xpath('//h1//text()'));text=' '.join(d.text_content().split());hits=set()
 # Only explicitly labelled bibliographic fields; ignore recommendations, scripts and random EANs.
 for raw in re.findall(r'(?i)(?:barcode|ISBN(?:-1[03])?|EAN(?:-?13)?)\s*:?\s*((?:97[89](?:[ -]*\d){10})|(?:\d(?:[ -]*\d){8}[ -]*[\dX]))',text):
  if v:=isbn13(raw):hits.add(v)
 return title,hits
ALIASES={'panini comics':{'panini comics','panini','planet manga'},'jpop':{'jpop','j pop','edizioni bd'},'seven seas entertainment':{'seven seas entertainment','seven seas'}}
def publisher_match(expected,p):
 labels=[norm(x['name']).replace(' ','').removesuffix('editore') for x in p.get('brands',[])];allowed=[x.replace(' ','') for x in ALIASES.get(norm(expected),{norm(expected)})];return any(label==a or label=='edizioni'+a or label==a+'edizioni' or (a=='goen' and label=='rwgoen') for label in labels for a in allowed)
def search_edition(pair):
 edition,publisher=pair;url='https://mangamaniafirenze.it/wp-json/wc/store/v1/products?per_page=100&search='+urllib.parse.quote(edition)
 out=[]
 for page in range(1,7):
  rows=json.loads(fetch(url+'&page='+str(page)))
  if not isinstance(rows,list):raise ValueError('Invalid retailer response')
  out.extend({'title':html_std.unescape(p['name']),'url':p['permalink'],'publisherMatch':publisher_match(publisher,p)} for p in rows)
  if len(rows)<100:break
 return out

def enrich(records,workers=8):
 old=json.loads(CACHE.read_text()) if CACHE.exists() else {'records':[]};verified={r['key']:r for r in old['records'] if (r.get('isbn') and isbn13(r['isbn'])) or (r.get('isbnCheckedAt','')[:10]==datetime.now(timezone.utc).date().isoformat() and r.get('isbnStatus'))};now=datetime.now(timezone.utc).isoformat();groups={}
 for r in records:
  r['key']=identity(r['edition'],r['number'],r['publisher'])
  if r['key'] in verified:r.update({k:v for k,v in verified[r['key']].items() if k in ['isbn','isbnSource','isbnCheckedAt','isbnStatus']});continue
  groups.setdefault((r['edition'],r['publisher']),[]).append(r)
 print('ISBN: checking',len(records),'records;',len(groups),'edition groups',flush=True)
 def group_task(pair):
  targets=groups[pair]
  try:products=search_edition(pair)
  except Exception as e:
   for r in targets:r.update(isbnStatus='Fonte non raggiungibile',isbnCheckedAt=now)
   return
  for r in targets:
   wanted=clean_title(r['edition']+('' if norm(r['number']) in ['unico','one shot'] else ' '+str(r['number'])))
   candidates=[p for p in products if p['publisherMatch'] and clean_title(p['title'])==wanted]
   if len(candidates)!=1:r.update(isbnStatus='Edizione ambigua' if len(candidates)>1 else 'ISBN non verificabile',isbnCheckedAt=now);continue
   p=candidates[0]
   try:
    title,hits=product_isbn(p['url'])
    if clean_title(title)!=wanted or len(hits)!=1:raise ValueError('Ambiguous ISBN')
    r.update(isbn=next(iter(hits)),isbnSource=p['url'],isbnCheckedAt=now,isbnStatus='Verificato: edizione del catalogo')
   except Exception:r.update(isbnStatus='ISBN non verificabile',isbnCheckedAt=now)
 with concurrent.futures.ThreadPoolExecutor(max_workers=workers) as pool:
  futures={pool.submit(group_task,p):p for p in groups}
  for i,f in enumerate(concurrent.futures.as_completed(futures),1):
   f.result()
   if i%15==0:print('ISBN editions checked',i,'/',len(groups),flush=True);save(records,now)
 save(records,now);return records

def save(records,now):
 payload={'updatedAt':now,'note':'ISBN del volume nell’edizione commerciale a catalogo. La ristampa della copia fisica non è certificata. Corrispondenze ambigue escluse; nessun acquisto o possesso dedotto.','records':[{k:('Catalogo verificato; ristampa da accertare' if k=='isbnStatus' and 'mangamaniafirenze.it' in r.get('isbnSource','') and r.get('isbn') else v) for k,v in r.items() if k!='sheetRow'} for r in records]};temp=CACHE.with_suffix('.tmp');temp.write_text(json.dumps(payload,ensure_ascii=False,indent=2)+'\n');temp.replace(CACHE)

def inventory_records(rows,library):
 items={x['id']:x for x in library['items'] if x['type']=='manga'};result=[]
 for rownum,row in enumerate(rows[1:],2):
  row=row+['']*(15-len(row));wid='manga-ac-'+str(row[10]) if str(row[10]).isdigit() else str(row[10]);item=items.get(wid)
  if not item:continue
  result.append({'workId':wid,'edition':str(row[1]),'number':str(row[2]),'publisher':str(row[5]),'language':'EN' if 'seven seas' in norm(row[5]) else 'IT','sourceEditionId':str(row[11] or ''),'sheetRow':rownum})
 # Include every library volume, even works lacking a detailed Sheets inventory. Never synthesize unknown volume numbers.
 known={(r['workId'],identity(r['edition'],r['number'],r['publisher'])) for r in result}
 for wid,item in items.items():
  for v in item.get('volumes',[]):
   k=(wid,identity(v['edition'],v['number'],v.get('publisher') or item.get('publisher')))
   if k not in known:result.append({'workId':wid,'edition':v['edition'],'number':str(v['number']),'publisher':v.get('publisher') or item.get('publisher',''),'language':'EN' if 'seven seas' in norm(v.get('publisher')) else 'IT'});known.add(k)
 return result

if __name__=='__main__':
 import argparse
 p=argparse.ArgumentParser();p.add_argument('--inventory');a=p.parse_args();lib=json.loads((ROOT/'library.json').read_text());prior=json.loads(CACHE.read_text())['records'] if CACHE.exists() else []
 records=inventory_records(json.loads(Path(a.inventory).read_text()),lib) if a.inventory else prior
 if not a.inventory:
  known={(r['workId'],identity(r['edition'],r['number'],r['publisher'])) for r in records}
  records.extend(r for r in inventory_records([[]],lib) if (r['workId'],identity(r['edition'],r['number'],r['publisher'])) not in known)
 enrich(records)
