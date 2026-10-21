(() => {
 'use strict';
 const $=s=>document.querySelector(s), esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const dayKey=()=>new Intl.DateTimeFormat('sv-SE',{timeZone:'Europe/Rome',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
 const add=(key,n)=>{const d=new Date(key+'T12:00Z');d.setUTCDate(d.getUTCDate()+n);return d.toISOString().slice(0,10)};
 const monday=key=>add(key,-((new Date(key+'T12:00Z').getUTCDay()+6)%7));
 const nice=key=>new Date(key+'T12:00Z').toLocaleDateString('it-IT',{day:'numeric',month:'long',year:'numeric'});
 function select(releases,{week,language,kind,publisher,search}){const end=add(week,6),q=(search||'').trim().toLocaleLowerCase('it');return releases.filter(x=>x.date>=week&&x.date<=end&&(language==='all'||x.language===language)&&(kind==='all'||x.kind===kind)&&(publisher==='all'||x.publisher===publisher)&&(!q||(x.title+' '+x.series).toLocaleLowerCase('it').includes(q)))}
 function safe(s){try{const u=new URL(s);return u.protocol==='https:'&&['www.animeclick.it','sevenseasentertainment.com','yenpress.com','j-novel.club'].includes(u.hostname)?u.href:''}catch{return ''}}
 let data,week=monday(dayKey()),followCurrent=true;
 function draw(){
  if(!data)return;
  const releases=select(data.releases,{week,language:$('#book-language').value,kind:$('#book-kind').value,publisher:$('#book-publisher').value,search:$('#book-search').value});
  $('#book-week').textContent=nice(week)+' – '+nice(add(week,6));
  $('#book-count').textContent=releases.length+' uscite · '+releases.filter(x=>x.language==='IT').length+' in italiano · '+releases.filter(x=>x.language==='EN').length+' in inglese';
  const sources=data.sources.map(s=>`<li><a href="${esc(safe(s.url))}" target="_blank" rel="noopener noreferrer">${esc(s.name)} ↗</a> · ${s.checkedAt?'controllo '+esc(new Date(s.checkedAt).toLocaleString('it-IT',{timeZone:'Europe/Rome',dateStyle:'short',timeStyle:'short'})):'non disponibile'}${s.status!=='ok'?' · controllo non riuscito, dati precedenti':''}${s.checkedAt&&Date.now()-Date.parse(s.checkedAt)>8*86400000?' · aggiornamento in ritardo':''}</li>`).join('');
  $('#book-sources').innerHTML=sources;
  $('#book-results').innerHTML=Array.from({length:7},(_,i)=>{
   const date=add(week,i),rows=releases.filter(x=>x.date===date);if(!rows.length)return '';
   return `<section class="book-day"><h2><time datetime="${date}">${esc(new Date(date+'T12:00Z').toLocaleDateString('it-IT',{weekday:'long',day:'numeric',month:'long'}))}</time>${date===dayKey()?'<span>Oggi</span>':''}</h2><div class="book-cards">${rows.map(x=>`<article class="book-release"><div class="book-tags"><span>${x.language==='IT'?'Italiano':'English'}</span><span>${x.kind==='novel'?'Light novel / novel':'Manga / fumetto'}</span></div><h3>${esc(x.title)}</h3><p>${esc(x.publisher)}</p><small>${esc(x.edition)}</small>${x.isbn?`<small>ISBN ${esc(x.isbn)}</small>`:''}<a href="${esc(safe(x.url))}" target="_blank" rel="noopener noreferrer">Scheda e data della fonte ↗</a><button type="button" class="book-add" data-book-key="${esc(YumeLists.bookKey(x))}" aria-pressed="${!!YumeLists.books()[YumeLists.bookKey(x)]}" aria-label="${YumeLists.books()[YumeLists.bookKey(x)]?'Rimuovi dagli acquisti: ':'Voglio comprare: '}${esc(x.title)}">${YumeLists.books()[YumeLists.bookKey(x)]?'✓ Nella lista acquisti':'＋ Voglio comprarlo'}</button></article>`).join('')}</div></section>`;
  }).join('')||'<div class="book-empty"><h2>Nessuna uscita documentata per questa selezione.</h2><p>Prova un’altra lingua, formato o settimana. L’assenza di risultati non significa che non siano previste uscite: la copertura dipende dai calendari delle fonti.</p></div>';
  $('#book-results').querySelectorAll('[data-book-key]').forEach(b=>b.onclick=()=>{const key=b.dataset.bookKey,x=releases.find(x=>YumeLists.bookKey(x)===key),exists=!!YumeLists.books()[key],ok=exists?YumeLists.removeBook(key):YumeLists.addBook(x);$('#book-list-status').textContent=(exists?'Rimosso dagli acquisti: ':'Aggiunto alla lista acquisti: ')+x.title+(ok?'':' · Salvataggio non disponibile: scelta valida solo per questa visita.');draw()});
  const today=monday(dayKey()),dates=data.releases.map(x=>x.date).sort();
  $('#book-prev').disabled=week<=monday(dates[0]&&dates[0]<today?dates[0]:today);
  $('#book-next').disabled=week>=monday(dates.at(-1)&&dates.at(-1)>today?dates.at(-1):today);
 }
 async function load(){
  try{const r=await fetch('data/book-calendar.json',{cache:'no-store'});if(!r.ok)throw Error();const next=await r.json();if(!Array.isArray(next.releases)||!Array.isArray(next.sources))throw Error();data=next;
   const value=$('#book-publisher').value;$('#book-publisher').innerHTML='<option value="all">Tutti gli editori</option>';
   [...new Set(data.releases.map(x=>x.publisher))].sort().forEach(p=>{const o=document.createElement('option');o.value=p;o.textContent=p;$('#book-publisher').append(o)});$('#book-publisher').value=[...$('#book-publisher').options].some(x=>x.value===value)?value:'all';
   if(followCurrent)week=monday(dayKey());draw();
  }catch{if(data){draw();$('#book-count').textContent+=' · connessione non disponibile, dati già caricati'}else $('#book-count').textContent='Calendario non disponibile. Riprova più tardi.'}
 }
 function init(){
  ['book-language','book-kind','book-publisher'].forEach(id=>$('#'+id).addEventListener('change',draw));$('#book-search').addEventListener('input',draw);
  $('#book-prev').addEventListener('click',()=>{followCurrent=false;week=add(week,-7);draw()});$('#book-next').addEventListener('click',()=>{followCurrent=false;week=add(week,7);draw()});$('#book-today').addEventListener('click',()=>{followCurrent=true;week=monday(dayKey());draw()});
  window.addEventListener('storage',draw);
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)load()});setInterval(()=>{if(!document.hidden)load()},15*60000);load();
 }
 window.YumeBooks={select,monday,add,safe};if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
