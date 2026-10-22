import importlib.util,json
from pathlib import Path
from lxml import html
s=importlib.util.spec_from_file_location('books','scripts/update-book-calendar.py');m=importlib.util.module_from_spec(s);s.loader.exec_module(m)
# A misleading publisher table label must not turn a light novel into a manga.
table=html.fromstring('<table id="releasedates"><tr><td>2026-10-27</td><td><a href="https://sevenseasentertainment.com/books/test/">Test (Light Novel) Vol. 2</a></td><td>Manga</td><td>123</td></tr><tr><td>2026-10-27</td><td><a href="/audio">Test</a></td><td>Audiobook</td><td></td></tr></table>')
e=m.parse_seven(table);assert len(e)==1 and e[0]['kind']=='novel'
# An explicitly empty Italian novel calendar is valid, a blocked response is not.
empty=html.fromstring('<html><h2>Ottobre 2026</h2><h4>Trovati 0 elementi</h4><div id="main-row-loop"></div></html>');assert m.parse_ac(empty,'animeclick-novel')==[]
try:m.parse_ac(html.fromstring('<h1>Access denied</h1>'),'animeclick-manga')
except ValueError:pass
else:raise AssertionError('Blocked source should not count as a successful empty calendar')
# JNC partial prepublications must never appear as completed book releases.
events={'events':[{'details':'Prepub Publishing','name':'Wrong part'},{'details':'Ebook Publishing','name':'A Book Volume 2','serie':{'type':1,'title':'A Book'},'legacyLink':'/series/a-book#volume-2','launch':{'seconds':'1792472400'}}]}
flight='7:'+json.dumps(['$',{'events':events}]);page=html.fromstring('<html><script>self.__next_f.push('+json.dumps([1,flight])+')</script></html>');e=m.parse_jnc(page);assert len(e)==1 and e[0]['title']=='A Book Volume 2' and e[0]['kind']=='novel'
# Yen Press extras released as individual episodes are not complete volumes.
yen=html.fromstring('<html><select id="year"><option selected value="2026">2026</option></select><a href="/titles/one"><div class="released-box"><span class="white-label">Manga</span><h3>A Manga Vol. 2</h3><p class="label-date">27<span class="month">Oct</span></p></div></a><a href="/titles/extra"><div class="released-box"><span class="white-label">Manga</span><h3>A Manga Extra Episode 1</h3><p class="label-date">27<span class="month">Oct</span></p></div></a></html>')
assert len(m.parse_yen(yen))==1
d=json.loads(Path('data/book-calendar.json').read_text());assert len(d['sources'])==5
assert any(x['language']=='IT' for x in d['releases']);assert any(x['publisher']=='J-Novel Club' and x['kind']=='novel' for x in d['releases'])
keys=[]
for x in d['releases']:
 from datetime import date
 date.fromisoformat(x['date']);assert x['language'] in ['IT','EN'];assert x['kind'] in ['novel','manga'];assert x['url'].startswith('https://')
 assert not any(domain in x['url'] for domain in ['docs.google.com','sheets.google.com','drive.google.com'])
 keys.append((x['date'],x['sourceId'],x.get('isbn') or x['url']))
assert len(keys)==len(set(keys))
print(f"OK: {len(d['releases'])} documented releases; source failures, explicit empty lists, novel classification, JNC whole ebooks, valid dates and unique editions")
