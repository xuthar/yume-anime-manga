// Preserve links shared before the homepage became a navigation hub.
(()=>{function route(){const q=new URLSearchParams(location.search),h=location.hash;if(q.has('anime')||['#anime','#manga','#catalogo','#tonight','#preferiti'].includes(h)){location.replace('libreria.html'+location.search+h)}else if(h==='#episode-calendar'){location.replace('calendario-anime.html')}}route();window.addEventListener('hashchange',route)})();

// A small, non-interactive sakura layer; preferences stay on this device.
(()=>{
 const host=document.querySelector('.home-page'),heading=document.querySelector('.home-explore .section-heading');
 if(!host||!heading)return;
 const key='yume-sakura-enabled',motion=matchMedia('(prefers-reduced-motion: reduce)');
 let enabled=true;try{enabled=localStorage.getItem(key)!=='off'}catch{}
 const layer=document.createElement('div');layer.className='sakura-layer';layer.setAttribute('aria-hidden','true');
 for(let i=0;i<18;i++){
  const fall=document.createElement('span');fall.className='sakura-fall';
  fall.style.cssText=`--left:${(i*37+9)%100}%;--fall:${16+i%7*2}s;--delay:${-i*2.7}s;--drift:${(i%2?-1:1)*(35+i%5*20)}px;--size:${8+i%5*2}px;--sway:${3+i%4}s;--tilt:${i*29}deg`;
  const petal=document.createElement('i');petal.className='sakura-petal';fall.append(petal);layer.append(fall);
 }
 const button=document.createElement('button');button.type='button';button.className='sakura-toggle';heading.append(button);host.append(layer);
 function render(){
  const reduced=motion.matches;layer.hidden=!enabled||reduced;
  button.hidden=reduced;button.setAttribute('aria-pressed',String(enabled));
  button.textContent=enabled?'Petali · attivi':'Petali · disattivati';
  button.setAttribute('aria-label',enabled?'Nascondi i petali di ciliegio':'Mostra i petali di ciliegio');
 }
 button.addEventListener('click',()=>{enabled=!enabled;try{localStorage.setItem(key,enabled?'on':'off')}catch{}render()});
 function pause(){layer.dataset.paused=String(document.hidden)}
 document.addEventListener('visibilitychange',pause);motion.addEventListener('change',render);pause();render();
})();

// Public catalogue totals use the same collection merges as the library.
(()=>{
 'use strict';
 const anime=document.getElementById('home-anime-count'),manga=document.getElementById('home-manga-count');
 if(!anime||!manga)return;
 const owner=window.YumeOwner;
 let base=[],animeRecords=owner?.animeCached()||[],purchases=owner?.cached()||[],pending=null;
 function render(){
  let items=window.YumeCollection?YumeCollection.merge(base,purchases):base;
  if(owner)items=owner.mergeAnime(items,animeRecords);
  const ids={anime:new Set(),manga:new Set()};
  for(const x of items)if(ids[x.type])ids[x.type].add(x.id||x.malId||x.title);
  anime.textContent=ids.anime.size.toLocaleString('it-IT');
  manga.textContent=ids.manga.size.toLocaleString('it-IT');
 }
 function refresh(){
  if(!owner||pending)return pending;
  pending=Promise.allSettled([
   owner.loadAnime().then(records=>{animeRecords=records;render()}),
   owner.loadPublic().then(records=>{purchases=records;render()})
  ]).finally(()=>{pending=null});return pending;
 }
 fetch('library.json',{cache:'no-cache'}).then(r=>{if(!r.ok)throw Error('Catalogue unavailable');return r.json()}).then(d=>{
  if(!Array.isArray(d.items))throw Error('Invalid catalogue');base=d.items;render();refresh();
  for(const event of ['yume-owner-updated','yume-owner-anime-updated','pageshow'])window.addEventListener(event,refresh);
  window.addEventListener('storage',e=>{if(['yume-owner-public-purchases','yume-owner-public-anime'].includes(e.key)){purchases=owner?.cached()||[];animeRecords=owner?.animeCached()||[];render()}});
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)refresh()});
 }).catch(()=>{anime.textContent='—';manga.textContent='—';anime.parentElement.title=manga.parentElement.title='Conteggio temporaneamente non disponibile';});
})();
