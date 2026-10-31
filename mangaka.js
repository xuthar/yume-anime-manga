/* Yume Mangaka Atlas · source-aware multilingual bibliography with no invented licenses. */
(function(){
'use strict';
const D=window.YumeMangakaData;if(!D||!Array.isArray(D.authors))return;
const $=id=>document.getElementById(id);
const authors=D.authors;
const asText=v=>String(v??'');
const norm=v=>asText(v).toLocaleLowerCase('it').normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/\s+/g,' ').trim();
const make=(tag,cls,txt)=>{const el=document.createElement(tag);if(cls)el.className=cls;if(txt!==undefined)el.textContent=asText(txt);return el};
const add=(p,...children)=>{children.filter(Boolean).forEach(x=>p.append(x));return p};
const link=(label,url)=>{const el=make('a','',label);el.href=url;if(/^https?:\/\//.test(url)){el.target='_blank';el.rel='noopener noreferrer'}return el};
const originalTitle=w=>w.jp||w.en||'Titolo originale non disponibile';
const keyWork=w=>norm([w.jp,w.en,w.it].join(' '));
const flag=(txt,cls)=>make('span','mka-flag '+cls,txt);
const q=$('mka-query'),era=$('mka-era'),genre=$('mka-genre'),status=$('mka-status'),list=$('mka-author-list'),detail=$('mka-detail');
let selected='',workFilter='all',collection=null,collectionPromise=null;
const workCount=authors.reduce((sum,a)=>sum+a.works.length,0),confirmed=authors.reduce((sum,a)=>sum+a.works.filter(w=>w.status==='verified').length,0);
$('mka-author-count').textContent=authors.length;
$('mka-work-count').textContent=workCount;
$('mka-verified-count').textContent=confirmed;
const unique=(field)=>[...new Set(authors.map(x=>x[field]))].filter(Boolean).sort((a,b)=>a.localeCompare(b,'it'));
for(const [sel,field] of [[era,'era'],[genre,'genre']])unique(field).forEach(name=>{const op=make('option','',name);op.value=name;sel.append(op)});
const params=new URLSearchParams(location.search);
const initial=params.get('autore');
if(initial&&authors.some(x=>x.id===initial))selected=initial;
else selected=authors[0]?.id||'';
function matches(a){
 const search=norm(q.value);
 if(era.value&&a.era!==era.value)return false;
 if(genre.value&&a.genre!==genre.value)return false;
 if(status.value==='verified'&&!a.works.some(x=>x.status==='verified'))return false;
 if(status.value==='review'&&!a.works.some(x=>x.status!=='verified'))return false;
 if(!search)return true;
 return norm([a.name,a.jp,a.genre,a.bio,a.career,...a.works.flatMap(w=>[w.jp,w.en,w.it,w.publisher])].join(' ')).includes(search);
}
function authorIndex(){
 const shown=authors.filter(matches);
 list.replaceChildren();$('mka-index-count').textContent=shown.length+' di '+authors.length;
 if(!shown.length){list.append(make('p','mka-empty','Nessun autore corrisponde ai filtri.'));detail.replaceChildren(make('div','mka-empty','Prova un’altra parola oppure azzera i filtri.'));return}
 if(!shown.some(x=>x.id===selected))selected=shown[0].id;
 shown.forEach(a=>{
  const b=make('button','mka-author');b.type='button';b.setAttribute('aria-pressed',String(a.id===selected));b.setAttribute('aria-label','Apri la scheda di '+a.name);
  const badge=make('span','mka-initial',a.jp?.slice(0,1)||a.name.slice(0,1));
  const info=make('span','mka-author-content');add(info,make('strong','',a.name),make('small','',a.era+' · '+a.genre),make('em','',a.works.length+' opere in archivio'));
  b.append(badge,info);
  b.addEventListener('click',()=>{selected=a.id;workFilter='all';history.replaceState({},'',location.pathname+'?autore='+encodeURIComponent(a.id)+'#mka-directory');authorIndex();if(window.matchMedia('(max-width:770px)').matches)detail.scrollIntoView({behavior:'smooth',block:'start'})});
  list.append(b)
 });
 showAuthor(authors.find(x=>x.id===selected));
}
const titlePair=(label,value)=>add(make('div',''),make('small','',label),make('strong','',value||'Titolo italiano non verificato'));
function showAuthor(a){
 if(!a)return;
 detail.replaceChildren();
 const head=make('div','mka-profile-head'),sym=make('div','mka-profile-symbol',(a.jp||a.name).slice(0,1)),who=make('div','');
 add(who,make('span','mka-overline','AUTORE · YUME MANGAKA ATLAS'),make('h2','',a.name),make('div','mka-jp',a.jp));
 const tags=make('div','mka-tags');tags.append(make('span','',a.era),make('span','',a.genre),make('span','',a.works.length+' opere selezionate'));who.append(tags);head.append(sym,who);detail.append(head);
 const profile=make('section','mka-profile-copy');
 add(profile,make('h3','','Biografia'),make('p','',a.bio),make('h3','','Percorso artistico'),make('p','',a.career));
 const actions=make('div','mka-profile-actions');
 if(a.ref&&D.sources[a.ref])actions.append(link('Fonte biografica/editoriale ↗',D.sources[a.ref]));
 const share=make('button','','Copia link a questa scheda');share.type='button';share.addEventListener('click',()=>{
 const url=new URL(location.href);url.searchParams.set('autore',a.id);url.hash='mka-directory';
 if(navigator.clipboard?.writeText)navigator.clipboard.writeText(url.href).then(()=>share.textContent='Link copiato').catch(()=>share.textContent='Link: '+url.href);
 else share.textContent=url.href
 });actions.append(share);profile.append(actions);detail.append(profile);
 const section=make('section','mka-work-section'),heading=make('h3','','Bibliografia selezionata');
 const subtitle=make('p','mka-work-intro','I titoli in tre lingue facilitano il confronto. Le versioni italiane non confermate sono riferimenti orientativi, non attestazioni di pubblicazione.');
 const filters=make('div','mka-work-controls');
 [['all','Tutte le opere'],['verified','Con edizione italiana confermata'],['review','Da verificare']].forEach(([id,label])=>{
 const btn=make('button','',label);btn.type='button';btn.setAttribute('aria-pressed',String(workFilter===id));btn.addEventListener('click',()=>{workFilter=id;showAuthor(a)});filters.append(btn)});
 const worksBox=make('div','mka-works');
 add(section,heading,subtitle,filters,worksBox);detail.append(section);
 const shown=a.works.filter(w=>workFilter==='all'||w.status===workFilter);
 if(!shown.length)worksBox.append(make('p','mka-empty','Non ci sono opere in questa categoria per l’autore selezionato.'));
 shown.forEach(w=>{
  const box=make('article','mka-work'),top=make('div','mka-work-top');
  top.append(make('h4','',w.en||w.it||w.jp),make('time','',w.year||'Anno n.d.'));box.append(top);
  box.append(make('p','mka-work-jp',originalTitle(w)));
  const labels=make('div','mka-titles');labels.append(titlePair('Titolo inglese',w.en),titlePair('Titolo italiano / riferimento',w.it));
  box.append(labels);
  const foot=make('div','mka-edition');
  if(w.status==='verified'){
   foot.append(flag('Italia · pubblicazione confermata','mka-positive'));
   if(w.publisher)foot.append(make('span','',w.publisher));
  }else foot.append(flag('Italia · verifica non conclusa','mka-pending'));
  box.append(foot);
  if(w.notes)box.append(make('p','mka-work-notes',w.notes));
  if(w.source){const src=make('div','mka-sources');src.append(link('Controlla l’edizione / fonte ↗',w.source));box.append(src)}
  const match=collection?.get(a.id)?.get(keyWork(w));
  if(match)showCollection(box,match);
  worksBox.append(box)
 });
 const compare=make('button','','Confronta i titoli con il mio catalogo Yume');compare.type='button';
 compare.addEventListener('click',async()=>{
  compare.disabled=true;compare.textContent='Cerco le corrispondenze…';
  try{
   await catalogMatches(a);
   compare.textContent='Corrispondenze rilevate nel catalogo Yume';
   showAuthor(a);
  }catch(e){compare.textContent='Catalogo non disponibile, riprova';compare.disabled=false;console.warn(e)}
 });
 const comparisonText=make('p','mka-work-intro','Il confronto con la libreria personale usa solo corrispondenze rigorose fra titoli: non registra acquisti e non modifica i volumi.');
 section.append(compare,comparisonText);
}
function showCollection(box,x){
 const region=make('div','mka-work-more');
 if(x.image&&!x.adult){const img=make('img');img.src=x.image;img.alt='Copertina catalogata di '+x.title;img.loading='lazy';img.onerror=()=>img.remove();region.append(img)}
 const text=make('div','');text.append(flag('Nel catalogo Yume','mka-archive'));
 text.append(make('p','',x.title+' · '+(x.publisher||'Editore non indicato')+' · '+(x.owned??'?')+' volumi segnati come posseduti.'));
 const anchor=link('Esplora la collezione ↗','collector.html');text.append(anchor);region.append(text);box.append(region);
}
async function catalogMatches(a){
 if(!collectionPromise)collectionPromise=fetch('library.json').then(r=>{if(!r.ok)throw Error('Nessun accesso');return r.json()}).then(j=>(j.items||[]).filter(x=>x.type==='manga'&&!x.adult));
 const items=await collectionPromise;
 if(!collection)collection=new Map();
 const mapping=new Map();
 const exact=new Map();
 for(const x of items)for(const s of [x.title,x.original,x.english,x.italian]){
   const k=norm(s);if(k&&k.length>3&&!exact.has(k))exact.set(k,x);
 }
 for(const w of a.works){const match=[w.it,w.en,w.jp].map(norm).filter(x=>x&&x.length>3).map(x=>exact.get(x)).find(Boolean);if(match)mapping.set(keyWork(w),match)}
 collection.set(a.id,mapping);
 return mapping;
}
function refresh(){authorIndex()}
[q,era,genre,status].forEach(x=>x.addEventListener(x.tagName==='INPUT'?'input':'change',refresh));
$('mka-reset').addEventListener('click',()=>{q.value='';era.value='';genre.value='';status.value='';selected=authors[0]?.id;workFilter='all';history.replaceState({},'',location.pathname+'#mka-directory');refresh()});
window.addEventListener('popstate',()=>{const p=new URLSearchParams(location.search).get('autore');if(p&&authors.some(x=>x.id===p)){selected=p;refresh()}});
refresh();
})();