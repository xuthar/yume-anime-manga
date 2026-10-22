"""Append-only observations of public calendars, including changed announcements."""
import hashlib,json
from pathlib import Path

def capture(path,payload,field):
    path=Path(path)
    archive=json.loads(path.read_text()) if path.exists() else {'schemaVersion':1,'observations':[]}
    records={r['id']:r for r in archive['observations']}
    observed=payload.get('updatedAt')
    for item in payload.get(field,[]):
        encoded=json.dumps(item,ensure_ascii=False,sort_keys=True,separators=(',',':'))
        key=hashlib.sha256(encoded.encode()).hexdigest()
        if key not in records:records[key]={'id':key,'firstObservedAt':observed,'lastObservedAt':observed,'entry':item}
        elif observed:
            records[key]['firstObservedAt']=min(filter(None,[observed,records[key].get('firstObservedAt')]))
            records[key]['lastObservedAt']=max(filter(None,[observed,records[key].get('lastObservedAt')]))
    archive['observations']=sorted(records.values(),key=lambda r:(r['entry'].get('date',''),r['id']))
    archive['note']='Annunci osservati nelle fonti; non certificano uscite o trasmissioni effettive. Le rettifiche restano documentate.'
    temp=path.with_suffix('.tmp');temp.write_text(json.dumps(archive,ensure_ascii=False,indent=2)+'\n');temp.replace(path)
    return archive

def book_identity(e):
    return (e['date'],e['sourceId'],e.get('isbn') or e['url'])

def episode_identity(e):
    return (e['date'],e['sourceUrl'],e['platform'])

def unique_rows(rows,key):
    return list({key(e):e for e in rows}.values())
