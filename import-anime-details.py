"""Resumeable import of cast and theme credits from each exact MAL anime page.

Run with Python + lxml. Existing successful records are retained. No account
credentials are used; only public cast/music credits are extracted.
"""
import concurrent.futures
import datetime
import json
import pathlib
import re
import threading
import time
import urllib.error
import urllib.parse
import urllib.request
from lxml import html

ROOT = pathlib.Path(__file__).resolve().parent
DATA_DIR = ROOT / 'dist' if (ROOT / 'dist/library.json').exists() else ROOT
OUTPUT = DATA_DIR / 'anime-details.json'
LOCK = threading.Lock()
NEXT_REQUEST = 0.0


def text(node):
    return ' '.join(node.text_content().split()) if node is not None else ''


def first(nodes):
    return nodes[0] if nodes else None


def parse_page(page, mal_id):
    doc = html.fromstring(page.decode('utf-8') if isinstance(page, bytes) else page)
    canonical = doc.xpath('//meta[@property="og:url"]/@content')
    if not canonical or not re.match(r'https://myanimelist\.net/anime/' + str(mal_id) + r'(?:/|$)', canonical[0]):
        raise ValueError('Anime identity could not be verified')
    cast = []
    for heading in doc.xpath('//div[contains(@class,"detail-characters-list")]//h3'):
        row = heading.getparent().getparent()
        role = text(first(heading.getparent().xpath('./div/small')))
        character = first(heading.xpath('./a'))
        if character is None:
            continue
        voices = []
        for cell in row.xpath('./td//td[a[contains(@href,"/people/")] and small]'):
            language = text(first(cell.xpath('./small')))
            person = first(cell.xpath('./a[contains(@href,"/people/")]'))
            if language and person is not None:
                voices.append({'name': text(person), 'language': language, 'url': person.get('href')})
        if voices:
            cast.append({'character': text(character), 'characterUrl': character.get('href'),
                         'role': role, 'voices': voices})
    themes = {'openings': [], 'endings': []}
    for kind, key in [('opnening', 'openings'), ('ending', 'endings')]:
        containers = doc.xpath('//div[contains(@class,"theme-songs") and contains(@class,"'+kind+'") ]')
        for box in containers:
            for row in box.xpath('./table/tr | ./table/tbody/tr'):
                cell = first(row.xpath('./td[.//span[contains(@class,"theme-song-artist")]]'))
                if cell is None:
                    continue
                artist = text(first(row.xpath('.//span[contains(@class,"theme-song-artist")]')))
                artist = re.sub(r'^by\s+', '', artist)
                title = first(cell.xpath('.//span[contains(@class,"theme-song-title")]'))
                if title is not None:
                    name = text(title).strip('"')
                else:
                    # MAL omits theme-song-title spans for songs without music-store links.
                    name = ' '.join(cell.xpath('./text()')).strip().strip('"')
                    name = re.sub(r'^\d+:\s*', '', name).strip('"')
                if not name:
                    continue
                youtube = first(row.xpath('.//input[starts-with(@id,"youtube_url_")]'))
                youtube = youtube.get('value', '') if youtube is not None else ''
                if not re.match(r'https://(?:www\.|music\.)?youtube\.com/|https://youtu\.be/', youtube):
                    youtube = ''
                themes[key].append({'title': name, 'artist': artist,
                    'index': text(first(row.xpath('.//span[contains(@class,"theme-song-index")]'))).rstrip(':'),
                    'episodes': text(first(row.xpath('.//span[contains(@class,"theme-song-episode")]'))),
                    'youtubeUrl': youtube,
                    'youtubeSearch': 'https://www.youtube.com/results?search_query=' + urllib.parse.quote(name + ' ' + artist + ' official')})
    return {'malId': mal_id, 'sourceUrl': canonical[0],
            'parserVersion': 2, 'checkedAt': datetime.datetime.now(datetime.timezone.utc).isoformat(),
            'cast': cast, **themes,
            'castPagePresent': bool(doc.xpath('//*[@id="characters"]')),
            'themesPagePresent': bool(doc.xpath('//div[contains(@class,"theme-songs")]'))}


def fetch(item):
    global NEXT_REQUEST
    mal_id = int(item['id'].split('-')[1])
    for attempt in range(3):
        with LOCK:
            wait = max(0, NEXT_REQUEST - time.monotonic())
            NEXT_REQUEST = max(time.monotonic(), NEXT_REQUEST) + 0.9
        time.sleep(wait)
        try:
            req = urllib.request.Request(item['url'], headers={'User-Agent': 'Mozilla/5.0 (compatible; YumeCatalog/1.0)', 'Accept-Encoding': 'identity'})
            with urllib.request.urlopen(req, timeout=35) as response:
                return item['id'], parse_page(response.read(), mal_id), None
        except (urllib.error.URLError, ValueError, TimeoutError) as exc:
            if attempt == 2:
                return item['id'], None, str(exc)
            # Slow down after rate limiting or upstream errors, without losing progress.
            time.sleep(3 * (attempt + 1))


def main():
    library = json.loads((DATA_DIR / 'library.json').read_text())
    result = json.loads(OUTPUT.read_text()) if OUTPUT.exists() else {'schemaVersion': 1, 'source': 'MyAnimeList', 'items': {}}
    result['items'] = {key: value for key, value in result['items'].items() if value.get('parserVersion') == 2}
    items = [x for x in library['items'] if x['type'] == 'anime' and (x['id'] not in result['items'] or not result['items'][x['id']]['cast'])]
    items.sort(key=lambda x: (x['status'] != 'In corso', -(x.get('rating') or 0)))
    errors = {}
    print(f"Importing {len(items)} anime; {len(result['items'])} already saved", flush=True)
    with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:
        futures = [pool.submit(fetch, item) for item in items]
        for i, future in enumerate(concurrent.futures.as_completed(futures), 1):
            key, record, error = future.result()
            if record is not None:
                result['items'][key] = record
            else:
                errors[key] = error
            result['updatedAt'] = datetime.datetime.now(datetime.timezone.utc).isoformat()
            OUTPUT.write_text(json.dumps(result, ensure_ascii=False, indent=2) + '\n')
            if i % 20 == 0 or error or i == len(items):
                print(f"{i}/{len(items)} processed; {len(result['items'])} saved; {len(errors)} failed" + (f' [{key}: {error}]' if error else ''), flush=True)
    (ROOT / 'anime-import-errors.json').write_text(json.dumps(errors, indent=2))
    print('DONE', flush=True)


if __name__ == '__main__':
    main()
