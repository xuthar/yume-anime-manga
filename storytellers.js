/* Yume Storytellers: responsive and accessible author filmography/bibliography navigator. */
(()=>{
'use strict';
const D=window.YumeStorytellers;if(!D)return;
const novel=document.body.dataset.storytellers==='novels';
const records=novel?D.novelists:D.directors;
const byId=id=>document.getElementById(id);
const $=byId;
const el=(tag,cl,txt)=>{const e=document.createElement(tag);if(cl)e.className=cl;if(txt!==undefined)e.textContent=String(txt);return e;};
const add=(parent,...nodes)=>{nodes.filter(Boolean).forEach(x=>parent.append(x));return parent};
const normalize=x=>String(x??'').toLocaleLowerCase('it').normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[’']/g,'').trim();
const anchor=(txt,uri)=>{const a=el('a','yst-source',txt);a.href=uri;if(uri.startsWith('http')){a.target='_blank';a.rel='noopener noreferrer'}return a;};
const personID=new URLSearchParams(location.search).get('autore');
let selected=records.some(x=>x.id===personID)?personID:records[0]?.id;
const search=$('yst-search'),filter=$('yst-filter'),out=$('yst-people-list'),detail=$('yst-detail');
const itfilter=$('yst-it'),format=$('yst-format');
const options=[...new Set(records.map(x=>novel?x.focus:x.role))].sort((a,b)=>a.localeCompare(b,'it'));
options.forEach(txt=>{const op=el('option','',txt);op.value=txt;filter.append(op)});
const allWorks=records.flatMap(x=>x.works);
$('yst-person-count').textContent=records.length;
$('yst-work-count').textContent=allWorks.length;
$('yst-role-count').textContent=novel?allWorks.filter(x=>x.itSource).length:new Set(allWorks.map(x=>x.role)).size;
const getWorkTitle=w=>w.en||w.it||w.jp||'Titolo non specificato';
function matches(person){
 if(filter.value&&(novel?person.focus:person.role)!==filter.value)return false;
 if(novel&&itfilter?.value==='confirmed'&&!person.works.some(w=>w.itSource))return false;
 if(novel&&itfilter?.value==='review'&&!person.works.some(w=>!w.itSource))return false;
 if(!novel&&format?.value&&!person.works.some(w=>w.kind===format.value))return false;
 const needle=normalize(search.value);if(!needle)return true;
 return normalize([person.name,person.jp,person.role,person.focus,person.bio,person.history,...person.works.flatMap(w=>[w.jp,w.en,w.it,w.illustrator,w.adaptation,w.studio,w.role])].join(' ')).includes(needle)
}
function selectPerson(id,adjustHistory=false,scroll=false){
 if(!records.some(x=>x.id===id))return;selected=id;
 if(adjustHistory)history.replaceState({},'',location.pathname+'?autore='+encodeURIComponent(id)+'#yst-directory');
 render();
 if(scroll&&window.matchMedia('(max-width:750px)').matches)detail.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});
}
function itemToIndex(a){
 const b=el('button','yst-person');b.type='button';b.setAttribute('aria-pressed',String(a.id===selected));b.setAttribute('aria-label','Apri la scheda di '+a.name);
 const sym=el('span','yst-avatar',(a.jp||a.name).slice(0,1));const body=el('span','yst-person-info');
 add(body,el('strong','',a.name),el('small','',novel?a.focus:a.role),el('em','',a.works.length+(novel?' opere':' lavori')+' selezionati'));b.append(sym,body);
 b.addEventListener('click',()=>selectPerson(a.id,true,true));return b;
}
function titles(w){
 const row=el('div','yst-language-grid');
 const en=el('div');add(en,el('small','','Titolo inglese'),el('strong','',w.en||'Da verificare'));
 const it=el('div');add(it,el('small','','Titolo italiano / riferimento'),el('strong','',w.it||'Titolo non verificato'));
 row.append(en,it);return row;
}
function workCard(w){
 const card=el('article','yst-work-card'),header=el('div','yst-work-header');
 add(header,el('h4','',getWorkTitle(w)),el('time','',w.year||'Anno da verificare'));card.append(header);
 card.append(el('p','yst-work-jp',w.jp||'Titolo originale da verificare'),titles(w));
 const credits=el('div','yst-credits');
 if(novel){
  credits.append(el('span','',w.illustrator?'Illustrazioni: '+w.illustrator:'Illustratore non indicato'));
  if(w.adaptation)credits.append(el('span','', 'Adattamento: '+w.adaptation));
  card.append(credits);
  card.append(el('span','yst-chip '+(w.itSource?'confirmed':'unknown'),w.itSource?'Edizione italiana documentata':'Italia: verifica da completare'));
  if(w.itPublisher)card.append(el('span','yst-chip role',w.itPublisher));
 } else {
  credits.append(el('span','','Ruolo: '+(w.role||'Da verificare')),el('span','','Produzione: '+(w.studio||'Studio non indicato')));
  card.append(credits);
  card.append(el('span','yst-chip role',w.kind||'Opera animata'));
 }
 if(w.source)card.append(anchor(w.source.startsWith('https://www.ghibli.jp')||w.source.startsWith('https://studiochizu.com')?'Catalogo dello studio / crediti ↗':'Fonte o catalogo per approfondire ↗',w.source));
 if(novel&&w.itSource)card.append(anchor('Scheda dell’editore italiano ↗',w.itSource));
 return card;
}
function profile(a){
 detail.replaceChildren();
 const header=el('header','yst-profile'),mark=el('div','yst-profile-mark',(a.jp||a.name).slice(0,1)),name=el('div');
 add(name,el('div','yst-eyebrow',novel?'SCRITTORE DI LIGHT NOVEL':'PROTAGONISTA DELL’ANIMAZIONE'),el('h2','',a.name),el('span','yst-name-jp',a.jp));
 name.append(el('span','yst-pill',novel?a.focus:a.role),el('span','yst-pill',a.works.length+' opere selezionate'));
 header.append(mark,name);detail.append(header);
 const biography=el('section','yst-biography');add(biography,el('h3','','Biografia e stile'),el('p','',a.bio),el('h3','','Il percorso creativo'),el('p','',a.history));
 detail.append(biography);
 const works=el('section','yst-works');add(works,el('h3','yst-works-heading',novel?'I romanzi e i mondi narrativi':'Film e serie: ruoli e crediti'),el('p','yst-work-count','Una selezione editoriale di '+a.works.length+' opere. Non è una bibliografia completa.'));
 const list=el('div','yst-work-grid');
 let selectedWorks=a.works;
 if(!novel&&format?.value)selectedWorks=a.works.filter(w=>w.kind===format.value);
 selectedWorks.forEach(w=>list.append(workCard(w)));
 if(!selectedWorks.length)list.append(el('p','yst-empty','Nessuna opera di questa tipologia per la persona selezionata.'));
 works.append(list);
 const related=el('div','yst-related');
 if(novel){
  related.append(anchor('↗ Esplora il catalogo manga', 'collector.html'),anchor('↗ Atlante Mangaka','mangaka.html'),anchor('↗ Registi & Creatori anime','anime-directors.html'));
 }else{
  related.append(anchor('↗ Atlante degli scrittori LN','light-novel-authors.html'),anchor('↗ Atlante Mangaka','mangaka.html'),anchor('↗ Yume Cinema','yume-explore.html?area=cinema'));
 }
 works.append(related);detail.append(works);
}
function render(){
 const found=records.filter(matches);out.replaceChildren();
 $('yst-count').textContent=found.length+' / '+records.length;
 if(!found.length){out.append(el('p','yst-empty','Nessun autore corrisponde ai filtri.'));detail.replaceChildren(el('p','yst-empty','Azzera o modifica la ricerca.'));return}
 if(!found.some(x=>x.id===selected))selected=found[0].id;
 found.forEach(a=>out.append(itemToIndex(a)));
 profile(found.find(x=>x.id===selected));
}
search.addEventListener('input',render);filter.addEventListener('change',render);
if(itfilter)itfilter.addEventListener('change',render);
if(format)format.addEventListener('change',render);
$('yst-reset').addEventListener('click',()=>{search.value='';filter.value='';if(itfilter)itfilter.value='';if(format)format.value='';selected=records[0]?.id;history.replaceState({},'',location.pathname+'#yst-directory');render()});
window.addEventListener('popstate',()=>{const id=new URLSearchParams(location.search).get('autore');if(id&&records.some(x=>x.id===id)){selected=id;render()}});
render();
})();