"""Refresh dated Italian streaming listings. Never extrapolate recurring episodes."""
import json, re, sys, unicodedata, urllib.request
from datetime import datetime, date
from pathlib import Path
sys.path.insert(0,str(Path(__file__).resolve().parent))
from calendar_history import capture,episode_identity
from zoneinfo import ZoneInfo
from lxml import html
ROOT = Path(__file__).resolve().parents[1]
SOURCE = 'https://www.animeclick.it/calendario-anime'
MONTHS = 'gennaio febbraio marzo aprile maggio giugno luglio agosto settembre ottobre novembre dicembre'.split()
def norm(s):
    s = unicodedata.normalize('NFKD', s or '').casefold()
    s = re.sub(r'\b(season|stagione)\b', '', s)
    return ''.join(c for c in s if c.isalnum())
def parse(text, today):
    doc = html.fromstring(text)
    heading = ' '.join(doc.xpath('//h1//text() | //h2//text() | //h3//text()')).lower()
    m = re.search(r'('+'|'.join(MONTHS)+r')\s+(\d{4})', heading)
    if not m: raise ValueError('Calendar month not found')
    month, year = MONTHS.index(m[1])+1, int(m[2])
    events=[]; current=None
    for block in doc.xpath('//*[@id="main-row-loop"]/*'):
        if 'date-separator' in block.get('class',''):
            day = block.xpath('.//*[contains(@class,"date")]/text()')
            current = date(year, month, int(day[0].strip())).isoformat()
            continue
        for card in block.xpath('.//*[contains(concat(" ",normalize-space(@class)," ")," panel-evento-calendario ")]'):
            if not current: continue
            title = ' '.join(card.xpath('.//h5//text()')).strip()
            airing = ' '.join(card.xpath('.//h4//text()')).strip()
            episode = ' '.join(card.xpath('.//h3//text()')).strip()
            match = re.search(r'(\d{2}:\d{2})\s+su\s+(.+)', airing)
            links=card.xpath('.//a/@href')
            if not title or not match or not links or not links[0].startswith('/episodio/'): continue
            # Only entries explicitly carrying the Italian region flag.
            if not card.xpath('.//img[contains(@src,"/IT.png")]'): continue
            start=datetime.fromisoformat(current+'T'+match[1]).replace(tzinfo=ZoneInfo('Europe/Rome'))
            events.append({'date':current,'time':match[1],'start':start.isoformat(),'title':title,
                'episode':re.match(r'[\dx]+',episode)[0] if re.match(r'[\dx]+',episode) else '',
                'platform':re.sub(r'\s+',' ',match[2]).strip(),'sourceUrl':'https://www.animeclick.it'+links[0]})
    if not events or max(e['date'] for e in events)<today.isoformat(): raise ValueError('No valid Italian episode listings: refusing to replace the last good calendar')
    return events

def read_current_calendar(today):
    # A changed source layout must never overwrite the last valid dated listings.
    errors=[]
    for url in (SOURCE, 'https://www.animeclick.live/calendario-anime'):
        try:
            req=urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36',
                                                    'Accept-Language':'it-IT,it;q=0.9,en;q=0.7',
                                                    'Accept':'text/html,application/xhtml+xml;q=0.9,*/*;q=0.8'})
            with urllib.request.urlopen(req,timeout=45) as response:page=response.read().decode('utf-8')
            events=parse(page,today)
            print(f'Calendar verified: {url}; {len(events)} listings')
            return events,url
        except Exception as exc:
            errors.append(f'{url}: {type(exc).__name__}: {exc}')
    raise ValueError('No verified fresh anime calendar; keeping the published data. '+' | '.join(errors))

def main():
    now=datetime.now(ZoneInfo('Europe/Rome'))
    events,verified_source=read_current_calendar(now.date())
    items=json.loads((ROOT/'library.json').read_text())['items']; lookup={}
    for x in items:
        if x['type']!='anime' or x.get('releaseStatus')!='Currently Airing':continue
        for key in ('title','english','italian','original'):
            k=norm(x.get(key,''))
            if k:lookup.setdefault(k,set()).add(x['id'])
    for e in events:
        ids=lookup.get(norm(e['title']),set())
        e['itemId']=next(iter(ids)) if len(ids)==1 else None
    # Keep every past dated listing; replace future listings with the fresh source.
    path=ROOT/'data/episode-calendar.json'; old=json.loads(path.read_text()) if path.exists() else {}
    first=now.date().isoformat()
    prior=[e for e in old.get('events',[]) if e['date']<first]
    unique={episode_identity(e):e for e in prior+events}
    payload={'updatedAt':now.isoformat(),'timezone':'Europe/Rome','source':verified_source,
        'coverageStart':min(e['date'] for e in unique.values()),'coverageEnd':max(e['date'] for e in events),
        'events':sorted(unique.values(),key=lambda e:(e['start'],e['title'],e['platform']))}
    capture(ROOT/'data/episode-calendar-history.json',old,'events')
    capture(ROOT/'data/episode-calendar-history.json',payload,'events')
    temp=path.with_suffix('.tmp');temp.write_text(json.dumps(payload,ensure_ascii=False,indent=2)+'\n');temp.replace(path)
    print(f"Calendar refreshed: {len(events)} listings, {sum(bool(e['itemId']) for e in events)} catalog matches")
if __name__=='__main__':main()
