/* Idols · Wikidata-powered, source-linked Japanese performer directory.
   Real records only; no inferred dates, photos, ages, measurements or credits.
   48 entities per request, loaded only after visitor action; adult opt-in. */
(()=>{'use strict';
const $=id=>document.getElementById(id);
const conf={
 music:{name:'Music idols',jobs:['Q226008'],text:'Idol e performer musicali giapponesi: cantanti, gruppi, palchi e generazioni.',bio:'Artista della scena idol giapponese.',adult:false},
 gravure:{name:'Gravure models',jobs:['Q1328668','Q28692662'],text:'Modelli e modelle gravure: attività editoriali e professionali documentate.',bio:'Professionista del gravure giapponese.',adult:false},
 jav:{name:'JAV models',jobs:['Q1079215'],text:'Interpreti JAV: archivio biografico 18+, con foto di profilo non esplicite e link alle fonti.',bio:'Performer del settore video per adulti in Giappone.',adult:true},
 adult:{name:'Adult performers',jobs:['Q488111'],text:'Performer del settore adult: archivio 18+ con informazioni pubbliche, senza contenuti espliciti.',bio:'Performer professionista del settore adult.',adult:true}
};
const state=Object.fromEntries(Object.keys(conf).map(k=>[k,{people:[],ids:new Set(),offset:0,exhausted:false,busy:false,loaded:false,error:false}]));
const search=$('idol-search'),sort=$('idol-sort'),grid=$('idols-grid'),status=$('idol-status'),more=$('idol-more'),retry=$('idol-retry'),detail=$('idol-profile'),body=$('idol-profile-body'),age=$('idol-age-dialog');
let active='music',ageAllowed=false,pendingAdult=null,requestSerial=0;
try{ageAllowed=sessionStorage.getItem('yume-idols-adult-18')==='yes'}catch{}
const el=(tag,text,cls)=>{const node=document.createElement(tag);if(text!==undefined&&text!==null)node.textContent=String(text);if(cls)node.className=cls;return node};
function link(text,url){const a=el('a',text);a.href=url;a.target='_blank';a.rel='noopener noreferrer';return a}
function safeUrl(input){try{const u=new URL(input);return u.protocol==='https:'?u.toString():null}catch{return null}}
function claim(e,prop){const list=e?.claims?.[prop];return list?.find(c=>c.rank!=='deprecated'&&c.mainsnak?.datavalue)?.mainsnak?.datavalue?.value||null}
function label(e){return e?.labels?.it?.value||e?.labels?.en?.value||e?.labels?.ja?.value||e?.id}
function desc(e){return e?.descriptions?.it?.value||e?.descriptions?.en?.value||e?.descriptions?.ja?.value||''}
function qid(v){return v&&typeof v==='object'&&/^Q\d+$/.test(v.id||'')?v.id:null}
function date(v){if(!v||!v.time)return null;const m=v.time.match(/^\+?(\d{4})-(\d{2})-(\d{2})/);if(!m)return null;const p=v.precision||0;return p>=11?m[3]+'/'+m[2]+'/'+m[1]:p>=10?m[2]+'/'+m[1]:m[1]}
function year(v){const m=v?.time?.match(/^\+?(\d{4})/);return m?Number(m[1]):0}
function height(v){const n=Number(v?.amount);if(!Number.isFinite(n)||n<=0)return null;const cm=n<3?n*100:n;return cm>80&&cm<240?Math.round(cm)+' cm':null}
function imageUrl(v){if(typeof v!=='string'||!v.trim())return null;return 'https://commons.wikimedia.org/wiki/Special:FilePath/'+encodeURIComponent(v.trim().replace(/^File:/i,''))+'?width=480'}
function social(handle,site){if(typeof handle!=='string'||!handle||handle.length>120)return null;return site==='x'?'https://x.com/'+encodeURIComponent(handle.replace(/^@/,'')):'https://www.instagram.com/'+encodeURIComponent(handle.replace(/^@/,''))+'/'}
async function getEntities(ids,parts='labels|descriptions|claims|sitelinks'){
 if(!ids.length)return {};
 const url='https://www.wikidata.org/w/api.php?action=wbgetentities&format=json&origin=*&props='+encodeURIComponent(parts)+'&languages=it%7Cen%7Cja&sitefilter=itwiki%7Cenwiki%7Cjawiki&ids='+encodeURIComponent(ids.join('|'));
 const res=await fetch(url,{headers:{Accept:'application/json'}});if(!res.ok)throw Error('Wikidata API '+res.status);
 const data=await res.json();if(!data.entities)throw Error('Risposta senza entità');return data.entities;
}
function build(e,k){
 const v=p=>claim(e,p),web=safeUrl(v('P856')),photo=imageUrl(v('P18')),group=qid(v('P463')),work=qid(v('P800'));
 const it=e.sitelinks?.itwiki?.title,en=e.sitelinks?.enwiki?.title,ja=e.sitelinks?.jawiki?.title;
 const wiki=it?'https://it.wikipedia.org/wiki/'+encodeURIComponent(it.replace(/ /g,'_')):en?'https://en.wikipedia.org/wiki/'+encodeURIComponent(en.replace(/ /g,'_')):ja?'https://ja.wikipedia.org/wiki/'+encodeURIComponent(ja.replace(/ /g,'_')):null;
 return{id:e.id,name:label(e),description:desc(e)||conf[k].bio,birth:date(v('P569')),birthYear:year(v('P569')),height:height(v('P2048')),photo,photoFile:v('P18'),web,x:social(v('P2002'),'x'),instagram:social(v('P2003'),'ig'),wiki,group,work,linked:[],source:'https://www.wikidata.org/wiki/'+e.id};
}
async function load(k=active){
 const s=state[k];if(s.busy||s.exhausted)return;s.busy=true;s.error=false;render();
 const serial=++requestSerial;
 try{
  const jobs=conf[k].jobs.map(q=>'wd:'+q).join(' ');
  const query='PREFIX wd: <http://www.wikidata.org/entity/> PREFIX wdt: <http://www.wikidata.org/prop/direct/> SELECT DISTINCT ?person WHERE { VALUES ?job { '+jobs+' } ?person wdt:P106 ?job ; wdt:P27 wd:Q17 . } ORDER BY ?person LIMIT 48 OFFSET '+s.offset;
  const res=await fetch('https://query.wikidata.org/sparql?format=json&query='+encodeURIComponent(query),{headers:{Accept:'application/sparql-results+json'}});
  if(!res.ok)throw Error('Archivio temporaneamente indisponibile (HTTP '+res.status+')');
  const payload=await res.json(),rows=payload?.results?.bindings||[];
  const ids=rows.map(r=>(r.person?.value||'').match(/Q\d+$/)?.[0]).filter(Boolean);
  if(ids.length===0)s.exhausted=true;
  const entities=await getEntities(ids),newPeople=ids.map(q=>entities[q]).filter(e=>e&&e.id&&e.type==='item').map(e=>build(e,k));
  const linkedIds=[...new Set(newPeople.flatMap(p=>[p.group,p.work].filter(Boolean)))].slice(0,45);
  if(linkedIds.length){try{const related=await getEntities(linkedIds,'labels');for(const p of newPeople){for(const [field,kind] of [['group','Gruppo / associazione'],['work','Opera segnalata']]){const q=p[field],obj=related[q];if(q&&obj)p.linked.push({name:kind,value:label(obj),url:'https://www.wikidata.org/wiki/'+q})}}}catch{}}
  s.offset+=ids.length;
  for(const p of newPeople){if(!s.ids.has(p.id)){s.ids.add(p.id);s.people.push(p)}}
  if(ids.length<48||newPeople.length===0)s.exhausted=true;
  s.loaded=true;
 }catch(err){s.error=true;s.errorText=err.message||'Connessione non disponibile';}
 finally{s.busy=false;if(serial===requestSerial||k===active)render()}
}
function render(){
 const s=state[active],term=search.value.trim().toLocaleLowerCase('it');
 let people=s.people.filter(p=>!term||[p.name,p.description,p.linked.map(x=>x.value).join(' ')].join(' ').toLocaleLowerCase('it').includes(term));
 people.sort((a,b)=>sort.value==='recent'?(b.birthYear-a.birthYear)||a.name.localeCompare(b.name,'it'):a.name.localeCompare(b.name,'it'));
 grid.replaceChildren();
 for(const p of people){const card=el('article',null,'idol-card'),open=el('button');open.type='button';open.setAttribute('aria-label','Apri scheda di '+p.name);
 const media=el('div',null,'idol-card-photo');if(p.photo){const img=document.createElement('img');img.src=p.photo;img.alt='Ritratto Wikimedia Commons di '+p.name;img.loading='lazy';img.referrerPolicy='no-referrer';img.onerror=()=>{media.replaceChildren(el('span','✿','idol-empty-img'),el('small','Foto non disponibile'))};media.append(img)}else media.append(el('span','✿','idol-empty-img'),el('small','Foto non disponibile'));
 const meta=el('div',null,'idol-card-meta');meta.append(el('strong',p.name),el('p',p.description),el('span','Leggi la biografia ↗'));open.append(media,meta);open.addEventListener('click',()=>showProfile(p));card.append(open);grid.append(card)}
 $('idol-category-copy').textContent=conf[active].text;
 $('idol-status').textContent=s.busy?'Caricamento in corso da Wikidata…':s.error?'Impossibile leggere il catalogo: '+s.errorText+'. Puoi riprovare.':s.people.length?(s.people.length+' profili unici caricati · '+people.length+' visibili'+(s.exhausted?' · Fine dei risultati disponibili':' · Archivio espandibile')):'Nessun profilo caricato per questa categoria.';
 more.disabled=s.busy;more.hidden=s.exhausted||s.error;more.textContent=s.busy?'Caricamento…':'Carica altri profili ✦';retry.hidden=!s.error;
 for(const b of document.querySelectorAll('[data-idol-category]'))b.setAttribute('aria-pressed',String(b.dataset.idolCategory===active));
}
function showProfile(p){
 body.replaceChildren();
 const layout=el('div',null,'idol-profile-layout'),media=el('div',null,'idol-profile-photo'),info=el('div',null,'idol-profile-info');
 if(p.photo){const img=document.createElement('img');img.src=p.photo;img.alt='Foto di '+p.name;img.onerror=()=>media.replaceChildren(el('span','✿'));media.append(img)}else media.append(el('span','✿'));
 info.append(el('span',conf[active].name.toUpperCase(),'idol-kicker'));
 const heading=el('h2',p.name);heading.id='idol-profile-title';info.append(heading,el('p',p.description));
 const dl=el('dl',null,'idol-facts');
 const facts=[['Nascita',p.birth||'Non verificata'],['Altezza',p.height||'Non documentata'],['Settore',conf[active].name],['Identificativo',p.id]];
 for(const [k,v] of facts){const box=el('div');box.append(el('dt',k),el('dd',v));dl.append(box)}
 info.append(dl);
 if(p.linked.length){const h=el('h3','Attività e opere documentate');h.style.fontSize='17px';info.append(h);for(const x of p.linked){const row=el('p',x.name+': ');row.append(link(x.value,x.url));info.append(row)}}
 const links=el('div',null,'idol-links');
 for(const [title,url] of [['Sito ufficiale',p.web],['Instagram',p.instagram],['X / Twitter',p.x],['Wikipedia',p.wiki],['Scheda Wikidata',p.source]])if(url)links.append(link(title+' ↗',url));
 info.append(links);
 const credit=el('p','Le fotografie possono avere licenze differenti. Controlla la pagina del file su Wikimedia Commons. I dati sono riportati come presenti nelle fonti, non come verifiche anagrafiche indipendenti.','idol-credit');
 if(p.photoFile)credit.append(' ',link('Foto e licenza ↗','https://commons.wikimedia.org/wiki/File:'+encodeURIComponent(p.photoFile.replace(/^File:/i,''))));
 info.append(credit);layout.append(media,info);body.append(layout);detail.showModal();
}
function choose(k){
 if(conf[k].adult&&!ageAllowed){pendingAdult=k;age.showModal();return}
 active=k;search.value='';render();if(!state[k].loaded&&!state[k].busy&&!state[k].error)load(k);
}
document.querySelectorAll('[data-idol-category]').forEach(b=>b.addEventListener('click',()=>choose(b.dataset.idolCategory)));
$('idol-age-accept').addEventListener('click',()=>{ageAllowed=true;try{sessionStorage.setItem('yume-idols-adult-18','yes')}catch{}age.close();const k=pendingAdult;pendingAdult=null;if(k)choose(k)});
$('idol-age-decline').addEventListener('click',()=>{age.close();pendingAdult=null;choose('music')});
age.addEventListener('close',()=>{pendingAdult=null});
$('idol-close').addEventListener('click',()=>detail.close());detail.addEventListener('click',e=>{if(e.target===detail)detail.close()});
search.addEventListener('input',render);sort.addEventListener('change',render);more.addEventListener('click',()=>load());retry.addEventListener('click',()=>load());
render();load('music');
})();