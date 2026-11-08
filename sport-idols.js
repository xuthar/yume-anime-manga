/* Yume Sport Idols — sourced athlete cards, Wikidata-matched public biographies.
 Never infer identity from a photo, a search result, or an unverified social account. */
(()=>{'use strict';
const data=window.YumeSportIdols;if(!data)return;
const $=id=>document.getElementById(id),grid=$('sport-grid'),query=$('sport-search'),select=$('sport-select'),edition=$('sport-edition'),
 status=$('sport-status'),more=$('sport-more'),enrichButton=$('sport-enrich'),photoOnly=$('sport-photo-only'),
 profile=$('sport-profile'),modalBody=$('sport-profile-body'),close=$('sport-profile-close'),pills=$('sport-pills');
if(!grid||!select)return;
const people=data.people,disciplines=data.disciplines,types=Object.fromEntries(disciplines.map(x=>[x.id,x]));
// Exact linked Wikidata IDs confirmed for these athletes; recheck identity attributes before use.
const seededQids={'髙木 美帆':'Q444421','池江 璃花子':'Q20973721','角田 夏実':'Q27917959','早田 ひな':'Q27917566'};
let current='all',limit=32,enrichBusy=false;
const make=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text!=null)n.textContent=String(text);return n};
const external=(caption,url)=>{const a=make('a',null,caption);a.href=url;a.target='_blank';a.rel='noopener noreferrer';return a};
const norm=t=>String(t||'').normalize('NFKC').toLowerCase().replace(/\s+/g,'').normalize('NFKD').replace(/[\u0300-\u036f]/g,'');
const claim=(e,p)=>(e?.claims?.[p]||[]).filter(x=>x.rank!=='deprecated').map(x=>x.mainsnak?.datavalue?.value).find(v=>v!=null);
const hasEntity=(e,p,id)=>(e?.claims?.[p]||[]).some(x=>x.mainsnak?.datavalue?.value?.id===id);
const linkValue=x=>typeof x==='string'&&x.length<160?x.trim():null;
function dateInfo(v){
 if(!v?.time)return null;const m=v.time.match(/^\+?(\d{4})-(\d{2})-(\d{2})/);if(!m)return null;
 const y=Number(m[1]),mon=Number(m[2]),day=Number(m[3]);if(y<1850||y>new Date().getFullYear())return null;
 if(v.precision<11||mon<1||mon>12||day<1||day>31)return {text:String(y),age:null};
 const check=new Date(Date.UTC(y,mon-1,day));if(check.getUTCMonth()+1!==mon||check.getUTCDate()!==day)return null;
 const now=new Date(),age=now.getFullYear()-y-((now.getMonth()+1<mon||(now.getMonth()+1===mon&&now.getDate()<day))?1:0);
 return {text:String(day).padStart(2,'0')+'/'+String(mon).padStart(2,'0')+'/'+y,age:age<0||age>125?null:age}
}
function verifiedEntity(e,p){
 if(e?.type!=='item'||!hasEntity(e,'P21','Q6581072')||!hasEntity(e,'P27','Q17'))return false;
 const matches=[e.labels?.ja?.value,...(e.aliases?.ja||[]).map(x=>x.value)].filter(Boolean);
 return matches.some(x=>norm(x)===norm(p.name))
}
async function request(url){const r=await fetch(url,{headers:{Accept:'application/json'}});if(!r.ok)throw Error('HTTP '+r.status);return r.json()}
async function resolve(p){
 if(p.enrichment!=='idle')return;
 p.enrichment='loading';
 try{
  let ids;
  if(seededQids[p.name])ids=[seededQids[p.name]];
  else{
   const srch='https://www.wikidata.org/w/api.php?action=wbsearchentities&format=json&origin=*&language=ja&uselang=ja&limit=12&search='+encodeURIComponent(p.name);
   const items=(await request(srch)).search||[];
   ids=[...new Set(items.map(x=>x.id).filter(x=>/^Q\d+$/.test(x)))].slice(0,12);
  }
  if(!ids.length){p.enrichment='none';return}
  const url='https://www.wikidata.org/w/api.php?action=wbgetentities&format=json&origin=*&props=labels%7Caliases%7Cclaims%7Csitelinks&languages=ja%7Cen%7Cit&sitefilter=jawiki%7Cenwiki%7Citwiki&ids='+encodeURIComponent(ids.join('|'));
  const entities=(await request(url)).entities||{};
  const ent=ids.map(id=>entities[id]).find(e=>verifiedEntity(e,p));
  if(!ent){p.enrichment='none';return}
  p.entityId=ent.id;
  const born=dateInfo(claim(ent,'P569'));if(born){p.birth=born.text;p.age=born.age}
  const en=ent.labels?.en?.value;
  if(en&&!p.latin&&en!==p.name)p.latin=en;
  const f=linkValue(claim(ent,'P18'));
  if(f&&/\.(jpg|jpeg|png|webp)$/i.test(f)){
   p.photo='https://commons.wikimedia.org/wiki/Special:FilePath/'+encodeURIComponent(f.replace(/^File:/i,''))+'?width=470';
   p.photoFile=f
  }
  const x=linkValue(claim(ent,'P2002')),ig=linkValue(claim(ent,'P2003')),yt=linkValue(claim(ent,'P2397')),website=linkValue(claim(ent,'P856'));
  const links=[];
  if(x&&/^[A-Za-z0-9_]{1,15}$/.test(x.replace(/^@/,'')))links.push(['X','https://x.com/'+x.replace(/^@/,'')]);
  if(ig&&/^[A-Za-z0-9_.]{1,35}$/.test(ig.replace(/^@/,'')))links.push(['Instagram','https://www.instagram.com/'+ig.replace(/^@/,'')+'/']);
  if(yt&&/^UC[A-Za-z0-9_-]{22}$/.test(yt))links.push(['YouTube','https://www.youtube.com/channel/'+yt]);
  if(website&&/^https:\/\//.test(website))links.push(['Sito ufficiale',website]);
  p.verifiedLinks=links;
  p.enrichment='verified'
 }catch{p.enrichment='error'}
}
function athleteSports(p){return p.disciplines.map(id=>types[id]?.label).filter(Boolean).join(' · ')}
function sourceButton(p){return p.sources[0]}
function currentMatches(ignorePhoto=false){
 const q=norm(query.value),ed=edition.value;
 return people.filter(p=>(current==='all'||p.disciplines.includes(current))&&
  (ed==='all'||p.sources.some(s=>s.edition.includes(ed)))&&
  (!q||norm(p.name+' '+p.latin+' '+athleteSports(p)).includes(q))&&(!photoOnly.checked||ignorePhoto||p.photoValid===true))
 .sort((a,b)=>(a.latin||a.name).localeCompare(b.latin||b.name,'it'))
}
function makePhoto(p,block,preview){
 if(!p.photo||p.imageFailed)return;
 const image=document.createElement('img');image.alt='Fotografia attribuita a '+(p.latin||p.name);
 image.loading=preview?'eager':'lazy';image.decoding='async';
 image.onload=()=>{const first=p.photoValid!==true;p.photoValid=true;image.dataset.loaded='true';if(first&&photoOnly.checked&&!preview)render()};
 image.onerror=()=>{p.photoValid=false;p.imageFailed=true;image.remove();if(photoOnly.checked)render()};
 image.src=p.photo;block.append(image)
}
function card(p){
 const article=make('article','sport-card'),top=make('div','sport-card-top');
 const first=types[p.disciplines[0]],art=make('span','sport-art',first?.emoji||'翔');top.append(art);
 const tag=make('span','sport-edition',p.sources[0]?.edition||'Roster');top.append(tag);makePhoto(p,top,false);article.append(top);
 const content=make('div','sport-card-content');content.append(make('span','sport-card-type',(first?.emoji||'')+' '+athleteSports(p)));
 content.append(make('h3',null,p.name),make('p','sport-roman',p.latin||'日本 · Atleta giapponese'));
 const birth=make('p','sport-birth');birth.append(make('strong',null,'Nascita: '),document.createTextNode(p.birth||'Da verificare'));content.append(birth);
 const age=make('p','sport-age');age.append(make('strong',null,'Età: '),document.createTextNode(p.age!=null?p.age+' anni':'N/D'));content.append(age);
 const actions=make('div','sport-card-actions');const button=make('button',null,'Scheda ↗');button.type='button';button.addEventListener('click',()=>detail(p));
 actions.append(button,external('Fonte ufficiale ↗',sourceButton(p).url));
 if(p.verifiedLinks.length){for(const [name,url] of p.verifiedLinks.slice(0,2))actions.append(external(name+' ↗',url))}
 content.append(actions);article.append(content);return article
}
function detail(p){
 modalBody.replaceChildren();modalBody.append(make('span','sport-kicker','SPORT IDOL · '+athleteSports(p)),
 make('h2',null,p.name));if(p.latin)modalBody.append(make('p','sport-verified',p.latin));
 if(p.photo&&p.photoValid){
 const photo=document.createElement('img');photo.src=p.photo;photo.alt='Fotografia di '+(p.latin||p.name);photo.className='sport-modal-photo';photo.onerror=()=>photo.remove();modalBody.append(photo)}
 modalBody.append(make('p',null,'Disciplina: '+athleteSports(p)),
 make('p',null,'Data di nascita: '+(p.birth||'Non documentata')),
 make('p',null,'Età: '+(p.age!=null?p.age+' anni':'Non documentata')));
 const sources=make('div','sport-profile-links');
 for(const s of p.sources)sources.append(external('Roster ufficiale · '+s.edition+' ↗',s.url));
 if(p.entityId)sources.append(external('Wikidata ↗','https://www.wikidata.org/wiki/'+p.entityId));
 if(p.photoFile)sources.append(external('Foto e licenza Commons ↗','https://commons.wikimedia.org/wiki/File:'+encodeURIComponent(p.photoFile)));
 for(const [name,url] of p.verifiedLinks)sources.append(external(name+' ↗',url));
 if(p.enrichment==='idle'||p.enrichment==='error'||p.enrichment==='none'){
 const enrichLink=make('button',null,'Verifica biografia e foto con Wikidata');
 enrichLink.type='button';enrichLink.addEventListener('click',async()=>{enrichLink.disabled=true;enrichLink.textContent='Verifica in corso…';p.enrichment='idle';await resolve(p);detail(p);render()});sources.append(enrichLink)
 }
 modalBody.append(sources,make('p',null,'La fonte del roster indica l’edizione, non l’eventuale squadra attuale. Foto e social sono mostrati solo dopo una verifica dell’identità in Wikidata.'));
 if(!profile.open)profile.showModal()
}
function render(){
 const list=currentMatches(),shown=list.slice(0,limit),frag=document.createDocumentFragment();
 for(const p of shown)frag.append(card(p));
 if(!shown.length)frag.append(make('p','sport-empty',photoOnly.checked?'Nessuna fotografia verificata tra i risultati attualmente caricati. Disattiva il filtro oppure verifica nuovi profili.':'Nessuna atleta corrisponde ai filtri scelti.'));
 grid.replaceChildren(frag);
 status.textContent=list.length+' atlete trovate · '+shown.length+' visibili · '+disciplines.length+' discipline. '+people.filter(p=>p.entityId).length+' schede Wikidata collegate.';
 more.hidden=list.length<=limit;more.textContent='Mostra altre '+Math.min(32,list.length-limit)+' atlete ↓';
 for(const btn of document.querySelectorAll('[data-sport]'))btn.setAttribute('aria-pressed',String(btn.dataset.sport===current))
}
function filterSports(x){current=x;select.value=x;limit=32;render()}
$('sport-total').textContent=String(people.length);$('sport-disciplines').textContent=String(disciplines.length);$('sport-sources').textContent=String(data.sources);
for(const d of disciplines){const opt=document.createElement('option');opt.value=d.id;opt.textContent=d.emoji+' '+d.label+' ('+d.count+')';select.append(opt)}
const popular=['all','football','volleyball','judo','swimming','athletics','basketball','tennis','skateboarding','snowboard','figure','icehockey'];
for(const key of popular){
 const d=types[key],btn=make('button',null,key==='all'?'✿ Tutti gli sport':(d.emoji+' '+d.label));btn.type='button';btn.dataset.sport=key;
 btn.setAttribute('aria-pressed',String(key==='all'));btn.addEventListener('click',()=>filterSports(key));pills.append(btn)
}
query.addEventListener('input',()=>{limit=32;render()});
select.addEventListener('change',()=>filterSports(select.value));
edition.addEventListener('change',()=>{limit=32;render()});photoOnly.addEventListener('change',()=>{limit=32;render()});
more.addEventListener('click',()=>{limit+=32;render()});
close.addEventListener('click',()=>profile.close());
profile.addEventListener('click',e=>{if(e.target===profile)profile.close()});
async function enrichMore(){
 if(enrichBusy)return;
 // Enrichment must keep working even when “solo foto” is active but no photo has loaded yet.
 const selection=currentMatches(true).filter(p=>p.enrichment==='idle').sort((a,b)=>Number(!!seededQids[b.name])-Number(!!seededQids[a.name])).slice(0,8);
 if(!selection.length){status.textContent='I profili della selezione visibile sono stati già controllati o non trovati. Scegli un altro sport.';return}
 enrichBusy=true;enrichButton.disabled=true;enrichButton.textContent='Verifica '+selection.length+' atlete in corso…';
 try{for(let i=0;i<selection.length;i+=3){await Promise.allSettled(selection.slice(i,i+3).map(resolve))}render()}
 finally{enrichBusy=false;enrichButton.disabled=false;enrichButton.textContent='Cerca fotografie, biografie e social verificati'}
}
enrichButton.addEventListener('click',enrichMore);
render();
// Small conservative initial batch: no hotlink scraping of official portraits.
Promise.resolve().then(enrichMore);
})();