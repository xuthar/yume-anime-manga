"""Merge the reviewed Collezione Manga import without changing existing entries.

Input is an exported bounded Google Sheets values response. Identity decisions
and independently checked bibliography live in data/manga-collection-import.json.
"""
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent

def main():
    source = json.loads(Path(sys.argv[1]).read_text())['values']
    plan = json.loads((ROOT/'data/manga-collection-import.json').read_text())
    path = ROOT/'library.json'
    library = json.loads(path.read_text())
    existing = {x['id']: x for x in library['items']}
    additions = []
    for spec in plan['additions']:
        row = source[spec['sourceRow']-1]
        assert row[0] == spec['sourceTitle'], (row[0], spec['sourceTitle'])
        if spec['id'] in existing:
            assert existing[spec['id']].get('collectionSourceTitle') == row[0], 'Unrelated existing ID: '+spec['id']
            continue
        entry = dict(spec['metadata'], id=spec['id'], type='manga',
                     status='Da verificare', rating=None, favorite=False,
                     progress=None, owned=int(row[6]), numbers='', volumes=[])
        entry['collectionSource'] = plan['sourceUrl']+'#gid=1273881170&range=A'+str(spec['sourceRow'])+':J'+str(spec['sourceRow'])
        entry['collectionSourceTitle'] = row[0]
        entry['collectionSourceModifiedAt'] = '2025-07-25'
        entry['collectionNote'] = 'Conteggio storico da Collezione Manga (25/07/2025). Numeri dei singoli volumi, stato di lettura e prezzi non indicati. Non sostituisce i dati più recenti delle opere già presenti.'
        entry['metadataCheckedAt'] = '2026-10-18'
        entry['pricing'] = {'currency':'EUR','lastVolumePrice':None,'knownTotal':0,'pricedVolumes':0,'inventoryVolumes':0,'complete':False,'volumePrices':[]}
        assert entry.get('genres') is not None
        additions.append(entry)
    library['items'].extend(additions)
    library['mangaCollectionUpdatedAt'] = '2026-10-18'
    path.write_text(json.dumps(library,ensure_ascii=False,separators=(',',':'))+'\n')
    print(f'Added {len(additions)} entries; all existing entries preserved.')

if __name__ == '__main__':
    main()
