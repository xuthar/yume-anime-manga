"""Refresh simulations: old years survive, future cancellations don't stay live, revisions survive."""
import importlib.util,json,tempfile
from pathlib import Path
from datetime import datetime
class Clock(datetime):
 @classmethod
 def now(cls,tz=None):return cls(2026,10,22,12,tzinfo=tz)
def module(name,path):
 spec=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m);return m
def dump(path,data):path.write_text(json.dumps(data))
b=module('books_history_test','scripts/update-book-calendar.py')
with tempfile.TemporaryDirectory()as tmp:
 root=Path(tmp);(root/'data').mkdir();b.ROOT=root;b.datetime=Clock
 old=[]
 for key in b.SOURCES:
  for day in ['2020-01-02','2026-11-02']:old.append({'sourceId':key,'date':day,'title':key+day,'url':'https://example.com/'+key+'/'+day,'language':'EN','kind':'novel','publisher':key})
 dump(root/'data/book-calendar.json',{'updatedAt':'2026-10-01T12:00:00+02:00','sources':[],'releases':old})
 def fetch(key):
  if key=='seven-seas':raise ValueError('fixture outage')
  return [{'sourceId':key,'date':'2026-11-03','title':'Updated','url':'https://example.com/'+key+'/new','language':'EN','kind':'novel','publisher':key}]
 b.fetch=fetch;b.main();d=json.loads((root/'data/book-calendar.json').read_text());assert sum(x['date']=='2020-01-02'for x in d['releases'])==5;assert sum(x['date']=='2026-11-02'for x in d['releases'])==1
 h=json.loads((root/'data/book-calendar-history.json').read_text());assert len(h['observations'])==14;b.main();assert len(json.loads((root/'data/book-calendar-history.json').read_text())['observations'])==14
m=module('episodes_history_test','scripts/update-episode-calendar.py')
with tempfile.TemporaryDirectory()as tmp:
 root=Path(tmp);(root/'data').mkdir();m.ROOT=root;m.datetime=Clock
 def event(day,title):return {'date':day,'time':'12:00','start':day+'T12:00:00+02:00','title':title,'episode':'1','platform':'Test','sourceUrl':'https://www.animeclick.it/episodio/'+title,'itemId':None}
 dump(root/'library.json',{'items':[]});dump(root/'data/episode-calendar.json',{'updatedAt':'2026-10-01T12:00:00+02:00','events':[event('2020-01-02','past'),event('2026-11-02','cancelled')]})
 class Response:
  def __enter__(self):return self
  def __exit__(self,*args):pass
  def read(self):return b'fixture'
 m.urllib.request.urlopen=lambda *a,**kw:Response();m.parse=lambda *a:[event('2026-10-23','fresh')];m.main();d=json.loads((root/'data/episode-calendar.json').read_text());assert [x['title']for x in d['events']]==['past','fresh'];assert d['coverageStart']=='2020-01-02';assert len(json.loads((root/'data/episode-calendar-history.json').read_text())['observations'])==3
print('PASS: multi-year history retained, cancelled future listings removed from live calendar but archived, source outages preserved, repeated observations deduplicated.')
