/* Yume 3.0: cross-catalog search, loaded only on submit. */
(function(){
'use strict';
const form=document.getElementById('y3-unified-search');if(!form)return;
const field=form.querySelector('input'),output=document.getElementById('y3-search-results'),status=document.getElementById('y3-search-status');
const norm=s=>String(s||'').normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
const make=(tag,text)=>{const e=document.createElement(tag);if(text!==undefined)e.textContent=String(text);return e};
let dataPromise;
function load(){if(!dataPromise)dataPromise=fetch('library.json?v=20261030-search').then(r=>{if(!r.ok)throw Error('Archivio temporaneamente non disponibile');return r.json()}).catch(e=>{dataPromise=null;throw e});return dataPromise}
function resultGroup(title,entries){
 const box=make('section'),h=make('h3',title);box.className='y3-search-group';box.append(h);
 if(!entries.length){box.append(make('p','Nessuna corrispondenza'));return box}
 const ul=make('ul');
 entries.forEach(entry=>{const li=make('li'),a=make('a',entry.label);a.href=entry.href;li.append(a);ul.append(li)});
 box.append(ul);return box
}
form.addEventListener('submit',async event=>{
 event.preventDefault();const query=field.value.trim();
 if(query.length<3){status.textContent='Inserisci almeno tre caratteri.';return}
 status.textContent='Ricerca in corso tra anime, manga e luoghi…';output.replaceChildren();
 try{
  const library=await load(),items=Array.isArray(library.items)?library.items:[],needle=norm(query);
  const results=items.filter(x=>norm([x.title,x.english,x.original,x.italian,x.franchiseTitle,x.publisher].join(' ')).includes(needle));
  const anime=results.filter(x=>x.type==='anime').slice(0,10).map(x=>({label:x.title,href:'universe.html#franchise='+encodeURIComponent(x.franchiseId||x.id)}));
  const manga=results.filter(x=>x.type==='manga').slice(0,10).map(x=>({label:x.title,href:'collector.html?q='+encodeURIComponent(x.title)}));
  const places=(window.YumeAnimePlaces||[]).filter(p=>norm([p.place,p.pref,p.region,p.work].join(' ')).includes(needle)).slice(0,10).map(p=>({label:p.place+' · '+p.work,href:'anime-pilgrimage.html?q='+encodeURIComponent(p.place)}));
  output.append(resultGroup('✦ Universe · anime',anime),resultGroup('▤ Collector · manga',manga),resultGroup('🗾 Pilgrimage · luoghi',places));
  status.textContent='Risultati: '+anime.length+' anime, '+manga.length+' manga, '+places.length+' luoghi. Sono mostrate al massimo dieci corrispondenze per categoria.';
 }catch(e){status.textContent='Ricerca non disponibile: '+e.message}
});
})();