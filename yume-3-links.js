/* Yume 3.0 — source-aware links and diagrams, read only. */
(function(){
'use strict';
const mk=(tag,cls,value)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(value!==undefined)e.textContent=String(value);return e};
const norm=s=>String(s||'').normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^\p{L}\p{N}]+/gu,' ').trim();
const keys=x=>[x.title,x.english,x.original,x.italian,x.franchiseTitle].filter(Boolean).map(norm).filter(k=>k.length>=5);
const href=(txt,url)=>{const e=mk('a','y3-extra-link',txt);e.href=url;return e};
const box=(summary)=>{const d=mk('details','y3-extra-box');d.append(mk('summary','',summary));return d};
function universe(panel,group,items){
 const graph=box('✦ Apri la costellazione del franchise · '+group.items.length+' opere');
 graph.open=group.items.length<=10;
 graph.append(mk('p','y3-muted','Le connessioni indicano appartenenza allo stesso franchise. Non stabiliscono un ordine narrativo o una relazione sequel.'));
 const hub=mk('div','y3-extra-hub',group.title),nodes=mk('div','y3-extra-nodes');
 group.items.slice(0,45).forEach(x=>{
  const a=href(x.title,'libreria.html?anime='+encodeURIComponent(x.id));
  a.classList.add('y3-extra-node');
  a.append(mk('small','',x.startDate||x.releaseYear||x.year||'Data non verificata'));
  nodes.append(a);
 });
 graph.append(hub,nodes);
 if(group.items.length>45)graph.append(mk('p','y3-muted','Mappa parziale: le altre opere restano nella cronologia completa.'));
 const cross=box('📚 Connessioni con manga e luoghi del Giappone');
 const seriesKeys=new Set([norm(group.title),...group.items.flatMap(keys)]);
 const paper=items.filter(x=>x.type==='manga'&&norm(x.title).length>=5&&seriesKeys.has(norm(x.title))).slice(0,15);
 const places=(window.YumeAnimePlaces||[]).filter(p=>seriesKeys.has(norm(String(p.work||'').split(' · ')[0]))).slice(0,15);
 cross.append(mk('p','y3-muted','Abbinamenti basati sull’identità del titolo. La relazione editoriale o l’ispirazione geografica non viene dedotta automaticamente.'));
 if(paper.length){cross.append(mk('h4','','Titoli cartacei da confrontare'));const wrap=mk('div','y3-extra-links');paper.forEach(x=>wrap.append(href(x.title,'collector.html?q='+encodeURIComponent(x.title))));cross.append(wrap)}
 if(places.length){cross.append(mk('h4','','Luoghi associati'));const wrap=mk('div','y3-extra-links');places.forEach(p=>wrap.append(href(p.place+' · '+p.pref,'anime-pilgrimage.html?q='+encodeURIComponent(p.place))));cross.append(wrap)}
 if(!paper.length&&!places.length)cross.append(mk('p','y3-muted','Nessuna corrispondenza diretta verificabile nel catalogo attuale.'));
 cross.open=Boolean(paper.length||places.length);
 panel.append(graph,cross)
}
function collector(panel,book,items){
 const candidate=norm(book.title);
 const matches=items.filter(x=>x.type==='anime'&&candidate.length>=5&&keys(x).includes(candidate)).slice(0,18);
 const d=box('✦ Cerca l’opera anche nell’archivio anime');
 d.open=Boolean(matches.length);
 d.append(mk('p','y3-muted','Le somiglianze dei titoli non dimostrano un adattamento, né equivalenza tra edizioni.'));
 if(matches.length){const links=mk('div','y3-extra-links');matches.forEach(x=>links.append(href(x.title,'libreria.html?anime='+encodeURIComponent(x.id))));d.append(links)}
 else d.append(mk('p','y3-muted','Nessun titolo identico trovato tra gli anime. Potrebbero esserci titoli alternativi.'));
 panel.append(d)
}
window.Yume3Links={universe,collector};
})();