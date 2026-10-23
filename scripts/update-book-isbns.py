"""Weekly verified ISBN supplement. Calendar identity and historical observations stay unchanged."""
import json,re,concurrent.futures
from pathlib import Path
from datetime import datetime,timezone
from isbn_catalog import isbn13,identity,clean_title,norm,search_edition,product_isbn
ROOT=Path(__file__).resolve().parents[1];PATH=ROOT/'data/book-isbn.json'
def run():
 old=json.loads(PATH.read_text()) if PATH.exists() else {'records':[]};prior={r['url']:r for r in old['records'] if isbn13(r.get('isbn'))};books={}
 for o in json.loads((ROOT/'data/book-calendar-history.json').read_text())['observations']:books[o['entry']['url']]=o['entry']
 for b in json.loads((ROOT/'data/book-calendar.json').read_text())['releases']:books[b['url']]=b
 now=datetime.now(timezone.utc).isoformat();records=[];pending={}
 for u,b in books.items():
  row={'url':u,'title':b['title'],'publisher':b['publisher'],'language':b['language'],'isbnCheckedAt':now}
  if u in prior:row.update(prior[u]);records.append(row);continue
  direct=isbn13(b.get('isbn'))
  if not direct and b.get('sourceId')=='yen-press':
   m=re.search(r'^https://yenpress\.com/titles/(97[89]\d{10})(?:-|$)',u);direct=isbn13(m[1]) if m else ''
  if direct:row.update(isbn=direct,isbnSource=u,isbnStatus='Verificato: editore');records.append(row);continue
  if b['language']=='IT':
   title=b['title'];m=re.search(r'\s+(\d+(?:\.\d+)?(?:-\d+)?)\s*$',title);edition=title[:m.start()].strip() if m else title;number=m[1] if m else 'Unico';pending.setdefault((edition,b['publisher']),[]).append((row,number))
  else:row['isbnStatus']='ISBN non esposto dalla fonte';records.append(row)
 def work(pair):
  targets=pending[pair];edition,publisher=pair
  try:products=search_edition(pair)
  except Exception:
   for row,_ in targets:row['isbnStatus']='Fonte non raggiungibile'
   return
  for row,number in targets:
   expected=clean_title(edition+('' if number=='Unico' else ' '+number));matches=[p for p in products if p['publisherMatch'] and clean_title(p['title'])==expected]
   if len(matches)!=1:row['isbnStatus']='Edizione ambigua' if matches else 'ISBN non verificabile';continue
   try:
    title,hits=product_isbn(matches[0]['url'])
    if clean_title(title)!=expected or len(hits)!=1:raise ValueError()
    row.update(isbn=next(iter(hits)),isbnSource=matches[0]['url'],isbnStatus='Verificato: edizione del catalogo')
   except Exception:row['isbnStatus']='ISBN non verificabile'
 with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool:
  for i,_ in enumerate(pool.map(work,pending),1):
   if i%15==0:print('Book ISBN editions checked',i,'/',len(pending),flush=True)
 for group in pending.values():records.extend(row for row,_ in group)
 # Preserve supplements for delisted publications: shopping lists and past weeks remain usable.
 known={r['url'] for r in records};records.extend(r for r in old['records'] if r['url'] not in known)
 payload={'updatedAt':now,'records':records};temp=PATH.with_suffix('.tmp');temp.write_text(json.dumps(payload,ensure_ascii=False,indent=2)+'\n');temp.replace(PATH)
 print('Book ISBN:',sum(bool(r.get('isbn')) for r in records),'verified /',len(records),flush=True)
if __name__=='__main__':run()
