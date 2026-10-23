import sys,json
from pathlib import Path
sys.path.insert(0,'scripts')
from isbn_catalog import isbn13,clean_title,identity
assert isbn13('978-1-63858-590-9')=='9781638585909'
assert isbn13('9781638585900')==''
assert isbn13('0-306-40615-2')=='9780306406157'
assert clean_title('20th Century Boys Ultimate Deluxe Edition N.  1')==clean_title('20th Century Boys Ultimate Deluxe Edition 1')
assert clean_title('Blue Lock Variant 34')!=clean_title('Blue Lock 34')
assert clean_title('Aria The Masterpiece 1')!=clean_title('Aria 1')
for filename in ['manga-isbn','book-isbn']:
 p=Path('data/'+filename+'.json')
 if not p.exists():continue
 rows=json.loads(p.read_text())['records']
 for r in rows:
  if r.get('isbn'):
   assert isbn13(r['isbn'])==r['isbn'],r
   assert r.get('isbnSource','').startswith('https://'),r
print('PASS: ISBN checksum/conversion, edition/variant separation and source provenance.')
