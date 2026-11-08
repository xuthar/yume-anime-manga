/* Yume Creator portrait editorial supplements — Wikimedia Commons 2026-11-08.
 * New women creators have source-attributed portraits in yume-photo-index.json.
 * This is a non-adult professional creator directory. Do not infer age, location or followers.
 */
(()=>{'use strict';
const base=window.YumeIdolsDiscovery;
if(!base)return;
const list=[
 ['Yuka Furukawa','YouTube · moda','古川優香 Yuka Furukawa 20191218162953 IMG 4589.jpg'],
 ['Fuwa-chan','Creator · comicità e televisione','Fuwa-chan (cropped).jpg'],
 ['Emi Ohmatsu','YouTube · creator e comicità','Ohmatsu Emi 2017-06-25.jpg'],
 ['Tenchimu','YouTube · lifestyle','Tenchimu 2019.jpg'],
 ['RinRin Doll','YouTube · moda giapponese','RinRin Doll on her English Channel.jpg'],
];
const normalize=x=>String(x||'').normalize('NFKC').normalize('NFKD').toLowerCase().replace(/[\u0300-\u036f\s・･_-]/g,'').trim();
const existing=new Set(base.people.map(p=>'creators:'+normalize(p.name)));
const added=[];
const people=base.people.slice();
for(const [name,activity,file] of list){
 const key='creators:'+normalize(name);
 if(existing.has(key))continue;
 const source='https://commons.wikimedia.org/wiki/File:'+encodeURIComponent(file.replace(/ /g,'_'));
 const p={category:'creators',name,alternate:'',group:activity,source,
  sourceLabel:'Wikimedia Commons · ritratto identificato dell’artista',
  sourceKind:'immagine documentata da Wikimedia Commons',officialProfile:null,
  platform:null};
 people.push(p);added.push(p);existing.add(key)
}
const sources={...base.sources,creatorCommons:{label:'Wikimedia Commons · Creator fotografati',url:'https://commons.wikimedia.org/wiki/Category:YouTubers_from_Japan',kind:'fotografie con autore e licenza sulla scheda'}};
window.YumeIdolsDiscovery=Object.freeze({...base,people,sources,stats:{...base.stats,entries:people.length,sources:Object.keys(sources).length}});
window.YumeCreatorsPhotoExpansion=Object.freeze({updated:'2026-11-08',added:added.length,knownPhotoNames:list.map(x=>x[0]),directory:'https://commons.wikimedia.org/wiki/Category:YouTubers_from_Japan'});
})();
