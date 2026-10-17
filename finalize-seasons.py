"""Join verified seasonal metadata, Italian catalog names and editorial synopses."""
import datetime,json,pathlib,re
from lxml import html
ROOT=pathlib.Path(__file__).resolve().parent
p=ROOT/'seasons.json';x=json.loads(p.read_text());own=json.loads((ROOT/'data/season-summaries-it.json').read_text())
base=json.loads((ROOT/'data/season-italian-metadata.json').read_text())['items']
old={}
personal={z['id']:z for z in json.loads((ROOT/'library.json').read_text())['items'] if z['type']=='anime'}
ordinals={'first':'Prima','second':'Seconda','third':'Terza','fourth':'Quarta','fifth':'Quinta','sixth':'Sesta','seventh':'Settima','eighth':'Ottava','ninth':'Nona','tenth':'Decima','eleventh':'Undicesima','twelfth':'Dodicesima','thirteenth':'Tredicesima','final':'Ultima','new':'Nuova'}
def season_note(s,title):
 m=re.match(r'^(?:The )?([\w-]+) season (?:of|for) (.+?)[.]?$',s,re.I)
 if m:
  word=m[1].lower();return ordinals.get(word,word.capitalize())+' stagione di '+m[2].rstrip('.')+'.'
 m=re.match(r'^(?:Part (one|two|three) of|(?:Second|Third) part of) (.+?)[.]?$',s,re.I)
 if m:return ('Seconda parte di ' if m[1]=='two' else 'Nuova parte di ')+m[2].rstrip('.')+'.'
 for prefix,label in [('Sequel to ','Seguito di '),('Continuation of ','Proseguimento di '),('Recap of ','Riepilogo di ')]:
  if s.startswith(prefix):return label+s[len(prefix):].rstrip('.')+'.'
 if len(s)<160 and re.search(r'\b(season|part|special|OVA|episodes|recap|compilation|anime project|new series|short|film)\b',s,re.I):
  return 'Un nuovo capitolo o progetto dedicato a '+title+'.'
 return ''
for key,z in x['items'].items():
 orig=z.get('synopsisOriginal','');z['synopsisSource']=z['url'];z['synopsisNote']='Sintesi editoriale dalla fonte MAL.'
 it=base.get(key,{}) if base.get(key,{}).get('italian') else old.get(key,{})
 if it.get('italian'):
  z['italian']=it['italian'].split(' - ')[0].strip();z['titleItSource']=it['sourceUrl']
 if personal.get(key,{}).get('adult'):z['adult']=True;z['image']=''
 f=pathlib.Path('/tmp/yume-season-pages')/(str(z['malId'])+'.html')
 if f.exists() and not z.get('japanese'):
  doc=html.fromstring(f.read_text())
  for language in ['Chinese:','Korean:']:
   ns=doc.xpath('//span[contains(@class,"dark_text") and normalize-space(text())="'+language+'"]')
   if ns:z['japanese']=' '.join(ns[0].getparent().text_content().split()).removeprefix(language).strip();z['originalLanguage']='Cinese' if language=='Chinese:' else 'Coreano';break
 if z['adult']:
  z['synopsisIt']='Sinossi non mostrata per questa opera riservata a un pubblico adulto.';z['synopsisNote']='';z['image']=''
 elif str(z['malId']) in own:z['synopsisIt']=own[str(z['malId'])]
 elif orig.startswith('(No synopsis') or not orig:z['synopsisIt']='';z['synopsisNote']='La fonte non ha ancora pubblicato una sinossi.'
 elif (s:=base.get(key,{}).get('synopsis')):
  words=s.split();short=' '.join(words[:18]);z['synopsisIt']=short+('…' if len(words)>18 else '');z['synopsisSource']=base[key]['sourceUrl'];z['synopsisNote']='Breve estratto della premessa generale della serie nel catalogo italiano.'
 else:
  z['synopsisIt']=season_note(orig,z['title']);z['synopsisNote']='La fonte riporta soltanto una nota sul progetto o sulla stagione.' if z['synopsisIt'] else 'Trama italiana in attesa di verifica.'
 z.pop('synopsisOriginal',None);z.pop('otherStreaming',None)
for season in x['seasons']:
 month={'summer-2026':7,'autumn-2026':10,'winter-2026':1}[season['key']]
 cutoff=datetime.date(2026,month,1)-datetime.timedelta(days=7)
 for entry in season['entries']:
  z=x['items'][entry['id']]
  if z['format']=='ONA' and z['releaseDate']:
   try:
    if datetime.date.fromisoformat(z['releaseDate'])<cutoff:entry['continuing']=True
   except ValueError:pass
x['updatedAt']=datetime.datetime.now(datetime.timezone.utc).isoformat();p.write_text(json.dumps(x,ensure_ascii=False,indent=2)+'\n')
print('Titles',len(x['items']),'IT titles',sum(bool(z['italian']) for z in x['items'].values()),'synopsis',sum(bool(z['synopsisIt']) for z in x['items'].values()),'IT streaming',sum(bool(z['streaming']) for z in x['items'].values()))
missing=[z for z in x['items'].values() if not z['synopsisIt'] and 'non ha ancora' not in z['synopsisNote']];print('Untranslated',[(z['malId'],z['title']) for z in missing])
