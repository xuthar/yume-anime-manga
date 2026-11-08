/* Yume Idols 2 — sourced people, photo fallback, searchable Japanese creative scene */
(()=>{'use strict';
const $=id=>document.getElementById(id);
const categories={
 music:{name:'Idol musicali',jobs:['Q226008'],featured:['Q41693136','Q1207378','Q74275','Q118696640','Q65230694','Q1195767','Q11629738'],description:'Idol musicali, cantanti e membri di gruppi giapponesi, anche indipendenti.',adult:false},
 gravure:{name:'Gravure e photomodels',jobs:['Q1328668','Q28692662'],featured:['Q123160205','Q65095777','Q111113137','Q123405211','Q135615344','Q55527939','Q8951402','Q110910871'],description:'Gravure, photomodels e fotografiche editoriali giapponesi, anche meno note.',adult:false},
 fashion:{name:'Fashion models',jobs:['Q3357567','Q4610556'],featured:['Q27150788','Q74275','Q1052497','Q11629738','Q21984356'],description:'Modelle, modelli e talent del fashion giapponese: passerelle, riviste e campagne.',adult:false},
 actors:{name:'Attrici e talent',jobs:['Q33999'],featured:['Q169400','Q11629738','Q74275','Q21984356'],description:'Attrici, interpreti e talent dello spettacolo giapponese.',adult:false},
 voice:{name:'Seiyū e doppiatrici',jobs:['Q622807'],featured:['Q106411305','Q8951402'],description:'Seiyū, interpreti vocali e creator legati al mondo degli anime.',adult:false},
 creators:{name:'Creator e influencer',jobs:['Q17125263','Q2906862','Q2045208'],featured:['Q81783459','Q11222605','Q74275','Q169400'],description:'YouTuber, creator indipendenti, influencer e personalità del web giapponese.',adult:false},
 cosplay:{name:'Cosplay e creator',jobs:['Q18810049'],featured:['Q8951402','Q106411305','Q110910871','Q111113564','Q55527939'],description:'Cosplayer, creator e protagonisti di eventi giapponesi, anche nomi meno conosciuti.',adult:false},
 jav:{name:'Performer JAV',jobs:['Q1079215'],featured:['Q8965460'],description:'Carriere e informazioni pubbliche del settore JAV (18+), ritratti non espliciti.',adult:true},
 adult:{name:'Adult performers',jobs:['Q488111','Q3286043'],featured:['Q8965460'],description:'Professionisti del settore adult (18+), informazioni verificabili e ritratti non espliciti.',adult:true}
};
const jobs={
 Q226008:'Idol musicale',Q1328668:'Gravure idol',Q28692662:'Modella/o gravure',
 Q17125263:'YouTuber',Q2906862:'Influencer',Q2045208:'Personalità del web',
 Q18810049:'Cosplayer',Q1079215:'Performer JAV',Q488111:'Performer adult',Q3286043:'Modella/o fotografico erotico',
 Q177220:'Cantante',Q33999:'Attore / attrice',Q4610556:'Modella/o',
 Q3357567:'Modella/o fashion',Q622807:'Seiyū',Q483501:'Artista',Q49757:'Poeta'
};
const state=Object.fromEntries(Object.keys(categories).map(k=>[k,{items:[],byId:new Set(),offset:0,busy:false,done:false,error:'',loaded:false,featuredLoaded:false,featuredBusy:false}]));
const grid=$('idols-grid'),query=$('idol-search'),onlyPhoto=$('idol-photo-only'),sort=$('idol-sort'),status=$('idol-status'),more=$('idol-more'),retry=$('idol-retry'),find=$('idol-online-search'),profile=$('idol-profile'),profileBody=$('idol-profile-body'),ageDialog=$('idol-age-dialog');
let active='music',pending=null,adultOK=false,visibleId=0;
try{adultOK=sessionStorage.getItem('yume-idols-adult-18')==='yes'}catch{}
const make=(tag,value,cls)=>{const e=document.createElement(tag);if(value!=null)e.textContent=String(value);if(cls)e.className=cls;return e};
const norm=x=>String(x||'').normalize('NFKD').toLowerCase().replace(/[\u0300-\u036f]/g,'').trim();
const read=(e,p)=>e?.claims?.[p]?.find(v=>v.rank!=='deprecated'&&v.mainsnak?.datavalue)?.mainsnak?.datavalue?.value||null;
const ref=v=>typeof v==='object'&&/^Q\d+$/.test(v?.id||'')?v.id:null;
const label=e=>e?.labels?.it?.value||e?.labels?.en?.value||e?.labels?.ja?.value||e?.id||'';
const description=e=>e?.descriptions?.it?.value||e?.descriptions?.en?.value||e?.descriptions?.ja?.value||'';
const normalURL=x=>{try{if(!x||typeof x!=='string')return null;const u=new URL(x);return ['https:','http:'].includes(u.protocol)?u.toString():null}catch{return null}};
function external(text,url){const a=make('a',text);a.href=url;a.target='_blank';a.rel='noopener noreferrer';return a}
function socialUrl(platform,id){
 if(typeof id!=='string'||!id.trim()||id.length>120)return null;
 const v=id.replace(/^@/,'').trim();
 if(platform==='youtube')return /^UC[A-Za-z0-9_-]{22}$/.test(v)?'https://www.youtube.com/channel/'+v:null;
 if(platform==='x')return /^[A-Za-z0-9_]{1,15}$/.test(v)?'https://x.com/'+v:null;
 if(platform==='instagram')return /^[A-Za-z0-9_.]{1,35}$/.test(v)?'https://www.instagram.com/'+v+'/':null;
 if(platform==='tiktok')return /^[A-Za-z0-9_.]{2,25}$/.test(v)?'https://www.tiktok.com/@'+v:null;
 if(platform==='facebook')return /^[A-Za-z0-9.]{3,100}$/.test(v)?'https://www.facebook.com/'+v:null;
 return null
}
const wikiUrl=(site,title)=>title?'https://'+site+'.wikipedia.org/wiki/'+encodeURIComponent(title.replace(/ /g,'_')):null;
function birthInfo(v){
 if(!v?.time)return {text:'Non documentata',age:null,year:0};
 const m=v.time.match(/^\+?(\d{4})-(\d{2})-(\d{2})/);if(!m)return {text:'Non documentata',age:null,year:0};
 const y=Number(m[1]),month=Number(m[2]),day=Number(m[3]),prec=v.precision||0;
 if(y<1850||y>new Date().getFullYear())return {text:'Non documentata',age:null,year:0};
 if(prec<10||month<1||month>12)return {text:String(y),age:null,year:y};
 if(prec<11||day<1||day>31)return {text:String(month).padStart(2,'0')+'/'+y,age:null,year:y};
 const verified=new Date(Date.UTC(y,month-1,day));if(verified.getUTCMonth()!==month-1||verified.getUTCDate()!==day)return {text:String(y),age:null,year:y};
 const today=new Date(),ny=today.getFullYear();const age=ny-y-(today.getMonth()+1<month||(today.getMonth()+1===month&&today.getDate()<day)?1:0);
 return {text:String(day).padStart(2,'0')+'/'+String(month).padStart(2,'0')+'/'+y,age:age>=0&&age<=130?age:null,year:y}
}
function measure(v,kind){
 if(!v?.amount)return null;const n=Number(v.amount);if(!Number.isFinite(n))return null;
 const unit=String(v.unit||'').split('/').pop();
 if(kind==='height'){
  const cm=unit==='Q11573'?n*100:unit==='Q174728'?n:null;
  return cm!=null&&cm>=80&&cm<=230?Math.round(cm)+' cm':null
 }
 const kg=unit==='Q11570'?n:unit==='Q41803'?n/1000:null;
 return kg!=null&&kg>=25&&kg<=200?Math.round(kg)+' kg':null
}
function pageSitelink(e){for(const s of ['itwiki','enwiki','jawiki'])if(e?.sitelinks?.[s]?.title)return{site:s.slice(0,2),title:e.sitelinks[s].title};return null}
function convert(e,cat){
 const birth=birthInfo(read(e,'P569')),sites=pageSitelink(e),picture=read(e,'P18');
 const photoFiles=(e.claims?.P18||[]).map(x=>x.mainsnak?.datavalue?.value).filter(x=>typeof x==='string'&&/\.(jpe?g|png|webp)$/i.test(x)).slice(0,4);
 const siteLinks=['itwiki','enwiki','jawiki'].filter(k=>e.sitelinks?.[k]?.title).map(k=>({site:k.slice(0,2),title:e.sitelinks[k].title}));
 const jobCodes=(e.claims?.P106||[]).map(x=>ref(x.mainsnak?.datavalue?.value)).filter(Boolean);
 const roles=jobCodes.map(x=>jobs[x]).filter(Boolean),title=label(e);
 const links=[
  ['X',socialUrl('x',read(e,'P2002'))],['Instagram',socialUrl('instagram',read(e,'P2003'))],
  ['YouTube',socialUrl('youtube',read(e,'P2397'))],['TikTok',socialUrl('tiktok',read(e,'P7085'))],
  ['Facebook',socialUrl('facebook',read(e,'P2013'))],['Sito',normalURL(read(e,'P856'))]
 ].filter(x=>x[1]);
 return{id:e.id,name:title,description:description(e)||roles.join(' · ')||categories[cat].description,roles:roles.length?Array.from(new Set(roles)).slice(0,3).join(' · '):categories[cat].name,birth:birth.text,age:birth.age,birthYear:birth.year,height:birth.age!=null&&birth.age<18?null:measure(read(e,'P2048'),'height'),weight:birth.age!=null&&birth.age<18?null:measure(read(e,'P2067'),'weight'),from:birthInfo(read(e,'P2031')).year,to:birthInfo(read(e,'P2032')).year,wiki:sites?wikiUrl(sites.site,sites.title):null,site:sites,siteLinks,photoFile:typeof picture==='string'?picture:null,photoFiles,commonsCategory:typeof read(e,'P373')==='string'?read(e,'P373'):null,photos:[],verifiedPhoto:null,noPhoto:false,links,source:'https://www.wikidata.org/wiki/'+e.id,group:ref(read(e,'P463')),work:ref(read(e,'P800')),extras:[]}
}
async function readJSON(url,format='application/json'){const r=await fetch(url,{headers:{Accept:format}});if(!r.ok)throw Error('HTTP '+r.status);return r.json()}
async function entities(ids){
 const all={};for(let i=0;i<ids.length;i+=45){
 const url='https://www.wikidata.org/w/api.php?action=wbgetentities&origin=*&format=json&props=labels%7Cdescriptions%7Cclaims%7Csitelinks&languages=it%7Cen%7Cja&sitefilter=itwiki%7Cenwiki%7Cjawiki&ids='+encodeURIComponent(ids.slice(i,i+45).join('|'));
 const d=await readJSON(url);Object.assign(all,d.entities||{});
 }return all
}
/* Images come only from the person's P18, their own Wikipedia pages, or their
   Wikidata-linked Commons category. No name-based guessing or image search. */
async function attachPhotos(people){
 const add=(p,url)=>{if(typeof url==='string'&&/^https:\/\//.test(url)&&!p.photos.includes(url))p.photos.push(url)};
 const filePeople=people.filter(p=>p.photoFiles.length),wikiPeople=people.filter(p=>p.siteLinks.length);
 for(let i=0;i<filePeople.length;i+=25){
  const group=filePeople.slice(i,i+25);
  const entries=group.flatMap(p=>p.photoFiles.map(f=>({p,f})));
  if(!entries.length)continue;
  try{
   const url='https://commons.wikimedia.org/w/api.php?action=query&format=json&formatversion=2&origin=*&prop=imageinfo&iiprop=url&iiurlwidth=450&titles='+encodeURIComponent(entries.map(x=>'File:'+x.f.replace(/^File:/i,'')).join('|'));
   const data=await readJSON(url);
   const pages=data.query?.pages||[];
   for(const {p,f} of entries){
    const page=pages.find(x=>norm(x.title?.replace(/^File:/i,'').replace(/_/g,' '))===norm(f.replace(/^File:/i,'').replace(/_/g,' ')));
    const info=page?.imageinfo?.[0];if(info?.thumburl)add(p,info.thumburl);if(info?.url)add(p,info.url)
   }
  }catch{}
 }
 // Wikipedia's own article thumbnails can work even when the Wikidata photograph is missing.
 for(const site of ['it','en','ja']){
  const list=wikiPeople.filter(p=>p.siteLinks.some(x=>x.site===site));
  for(let i=0;i<list.length;i+=30){
   const group=list.slice(i,i+30);
   try{
    const url='https://'+site+'.wikipedia.org/w/api.php?action=query&format=json&formatversion=2&origin=*&redirects=1&prop=pageimages&piprop=thumbnail&pilicense=free&pithumbsize=450&titles='+encodeURIComponent(group.map(p=>p.siteLinks.find(x=>x.site===site).title).join('|'));
    const data=await readJSON(url),pages=data.query?.pages||[];
    for(const p of group){
     const title=p.siteLinks.find(x=>x.site===site).title;
     const article=pages.find(x=>norm(x.title?.replace(/_/g,' '))===norm(title.replace(/_/g,' ')));
     if(article?.thumbnail?.source)add(p,article.thumbnail.source)
    }
   }catch{}
  }
 }
 // As an extra source, check a Commons category explicitly bound to this person in P373.
 const targets=people.filter(p=>!p.photos.length&&p.commonsCategory).slice(0,25);
 for(let i=0;i<targets.length;i+=5){
  await Promise.allSettled(targets.slice(i,i+5).map(async p=>{
   const url='https://commons.wikimedia.org/w/api.php?action=query&format=json&formatversion=2&origin=*&generator=categorymembers&gcmtype=file&gcmlimit=8&gcmtitle='+encodeURIComponent('Category:'+p.commonsCategory)+'&prop=imageinfo&iiprop=url&iiurlwidth=450';
   const data=await readJSON(url);
   for(const file of data.query?.pages||[]){
    if(!/\.(jpe?g|png|webp)$/i.test(file.title||''))continue;
    const info=file.imageinfo?.[0];if(info?.thumburl){add(p,info.thumburl);break}if(info?.url){add(p,info.url);break}
   }
  }))
 }
 // Fallback to the precise file stored in Wikidata, without replacing the person's identity.
 for(const p of people)for(const name of p.photoFiles.slice(0,3))add(p,'https://commons.wikimedia.org/wiki/Special:FilePath/'+encodeURIComponent(name.replace(/^File:/i,''))+'?width=450');
 for(const p of people)p.photos=p.photos.slice(0,10);
}
async function enrich(people){
 const ids=[...new Set(people.flatMap(p=>[p.group,p.work].filter(Boolean)))].slice(0,80);
 if(!ids.length)return;
 try{const related=await entities(ids);for(const p of people){for(const [field,title] of [['group','Gruppo / formazione'],['work','Opere collegate']]){
 const q=p[field],rec=related[q];if(q&&rec)p.extras.push({title,value:label(rec),url:'https://www.wikidata.org/wiki/'+q})}
 }}catch{}
}
async function fetchFeatured(cat){
 const s=state[cat];if(s.featuredLoaded||s.featuredBusy)return;
 s.featuredBusy=true;
 try{
  const records=await entities(categories[cat].featured||[]);
  const people=(categories[cat].featured||[]).map(id=>records[id]).filter(e=>{
   if(e?.type!=='item'||!(e.claims?.P31||[]).some(v=>ref(v.mainsnak?.datavalue?.value)==='Q5'))return false;
   const jobsSet=new Set(categories[cat].jobs);
   const occupation=(e.claims?.P106||[]).some(v=>jobsSet.has(ref(v.mainsnak?.datavalue?.value)));
   const nationality=(e.claims?.P27||[]).some(v=>ref(v.mainsnak?.datavalue?.value)==='Q17');
   return occupation&&nationality
  }).map(e=>convert(e,cat));
  await Promise.allSettled([attachPhotos(people),enrich(people)]);
  for(const p of people)if(!s.byId.has(p.id)){s.byId.add(p.id);s.items.push(p)}
  s.featuredLoaded=true;
 }catch(e){/* Keep pagination available if one endpoint is temporarily unavailable. */}
 finally{s.featuredBusy=false;if(cat===active)paint()}
}
async function fetchBatch(cat){
 const s=state[cat];if(s.busy||s.done)return;s.busy=true;s.error='';if(cat===active)paint();
 const qids=categories[cat].jobs.map(x=>'wd:'+x).join(' '),limit=60;
 // Photo-first search: omit image-less Wikidata items from the default gallery.
 const sparql='PREFIX wd: <http://www.wikidata.org/entity/> PREFIX wdt: <http://www.wikidata.org/prop/direct/> SELECT DISTINCT ?person WHERE { VALUES ?job { '+qids+' } ?person wdt:P106 ?job ; wdt:P27 wd:Q17 ; wdt:P31 wd:Q5 ; wdt:P18 ?photo . } ORDER BY ?person LIMIT '+limit+' OFFSET '+s.offset;
 try{
  const data=await readJSON('https://query.wikidata.org/sparql?format=json&query='+encodeURIComponent(sparql),'application/sparql-results+json');
  const ids=[...new Set((data.results?.bindings||[]).map(v=>v.person?.value?.match(/Q\d+$/)?.[0]).filter(Boolean))];
  if(ids.length<limit)s.done=true;
  s.offset+=limit;
  if(ids.length){
   const records=await entities(ids),people=ids.map(x=>records[x]).filter(x=>x?.type==='item'&&x.claims?.P31?.some(v=>ref(v.mainsnak?.datavalue?.value)==='Q5')).filter(e=>cat!=='jav'&&cat!=='adult'||birthInfo(read(e,'P569')).age>=18).map(e=>convert(e,cat));
   await Promise.allSettled([attachPhotos(people),enrich(people)]);
   for(const p of people)if(!s.byId.has(p.id)){s.byId.add(p.id);s.items.push(p)}
  }
  s.loaded=true;if(ids.length===0)s.done=true
 }catch(e){s.error='La fonte pubblica è temporaneamente indisponibile ('+(e?.message||'errore di rete')+').';}
 finally{s.busy=false;if(cat===active)paint()}
}
async function onlineSearch(){
 const term=query.value.trim();if(term.length<2)return;
 const s=state[active];if(s.busy)return;s.busy=true;s.error='';paint();
 try{
 const ids=new Set();for(const language of ['it','en','ja']){
 const u='https://www.wikidata.org/w/api.php?action=wbsearchentities&format=json&origin=*&language='+language+'&uselang='+language+'&limit=35&search='+encodeURIComponent(term);
 const data=await readJSON(u);(data.search||[]).forEach(x=>{if(/^Q\d+$/.test(x.id))ids.add(x.id)});
 }
 const records=await entities([...ids]),jobSet=new Set(categories[active].jobs);
 const people=[...ids].map(id=>records[id]).filter(e=>{
 const jobList=e?.claims?.P106||[];
 const relevant=jobList.some(x=>jobSet.has(ref(x.mainsnak?.datavalue?.value)));
 const japan=(e?.claims?.P27||[]).some(x=>ref(x.mainsnak?.datavalue?.value)==='Q17');
 return e?.type==='item'&&relevant&&japan&&(active!=='jav'&&active!=='adult'||birthInfo(read(e,'P569')).age>=18)
 }).map(e=>convert(e,active));
 await Promise.allSettled([attachPhotos(people),enrich(people)]);
 for(const p of people)if(!s.byId.has(p.id)){s.byId.add(p.id);s.items.push(p)}
 if(!people.length)s.error='Nessuna nuova corrispondenza classificata in questa categoria.';
 }catch(e){s.error='La ricerca estesa non è disponibile: '+(e?.message||'errore di rete')}
 finally{s.busy=false;paint()}
}
function photoNode(p,large=false){
 const box=make('div',null,large?'idol-profile-photo':'idol-card-photo');
 const files=p.verifiedPhoto?[p.verifiedPhoto]:p.photos;
 function placeholder(){
  box.replaceChildren(make('span','桜','idol-empty-img'));box.classList.add('is-empty');
  if(!large)box.append(make('small','Ritratto non documentato'))
 }
 function next(i){
  if(i>=files.length){
   p.noPhoto=true;placeholder();
   if(onlyPhoto.checked&&!large){
    const card=box.closest('.idol-card');if(card)card.remove();
    updatePhotoCount();
   }
   return
  }
  const url=files[i],img=document.createElement('img');
  img.alt='Ritratto di '+p.name;img.loading=large?'eager':'lazy';img.decoding='async';
  img.onerror=()=>next(i+1);
  img.onload=()=>{if(!p.verifiedPhoto){p.verifiedPhoto=url;p.noPhoto=false;}};
  img.src=url;box.replaceChildren(img)
 }
 if(files.length&&!p.noPhoto)next(0);else placeholder();
 return box
}
function updatePhotoCount(){
 const visible=grid.querySelectorAll('.idol-card').length,s=state[active];
 if(onlyPhoto.checked&&!s.busy)status.textContent=s.items.length+' profili disponibili · '+visible+' ritratti in galleria. Carica altri per scoprire nuove persone.'
}
function linksNode(p,cssClass='idol-card-links'){
 const row=make('div',null,cssClass);
 const byType=(label)=>p.links.find(x=>x[0]===label);
 for(const label of ['X','Instagram','YouTube','TikTok','Facebook','Sito']){const v=byType(label);if(v)row.append(external(label+' ↗',v[1]))}
 if(!byType('X'))row.append(external('Cerca X ↗','https://x.com/search?q='+encodeURIComponent(p.name)));
 if(!byType('Instagram'))row.append(external('Cerca IG ↗','https://www.google.com/search?q='+encodeURIComponent('site:instagram.com '+p.name)));
 if(!byType('YouTube'))row.append(external('Cerca YT ↗','https://www.youtube.com/results?search_query='+encodeURIComponent(p.name)));
 row.append(external('Profilo ↗',p.source));
 if(cssClass==='idol-card-links')row.append(external('Cerca ↗','https://www.google.com/search?q='+encodeURIComponent(p.name+' '+categories[active].name)));
 return row
}
function card(p){
 const article=make('article',null,'idol-card'),button=make('button',null,'idol-card-open');button.type='button';
 button.setAttribute('aria-label','Apri biografia completa di '+p.name);
 const media=photoNode(p),meta=make('div',null,'idol-card-meta'),title=make('strong',p.name),role=make('p',p.roles,'idol-occupation');
 const facts=make('div',null,'idol-card-facts'),birth=make('span'),age=make('span');birth.append(make('b','Nascita: '),document.createTextNode(p.birth));age.append(make('b','Età: '),document.createTextNode(p.age!=null?p.age+' anni':'N/D'));facts.append(birth,age);
 meta.append(title,role,facts,make('span','Biografia, attività e fonti','idol-card-hint'));
 button.append(media,meta);button.addEventListener('click',()=>detail(p));article.append(button,linksNode(p));return article
}
function detail(p){
 profileBody.replaceChildren();
 const layout=make('div',null,'idol-profile-layout'),info=make('div',null,'idol-profile-info'),title=make('h2',p.name);title.id='idol-profile-title';
 info.append(make('span',categories[active].name.toUpperCase(),'idol-kicker'),title,make('p',p.description));
 const facts=make('dl',null,'idol-facts');
 const fields=[['Professione',p.roles],['Data di nascita',p.birth],['Età',p.age==null?'Non documentabile':p.age+' anni'],['Altezza',p.height||'Non documentata'],['Peso',p.weight||'Non documentato'],['Attività dal',p.from||'Non documentata'],['Attività fino al',p.to||'Non documentata']];
 for(const [k,v] of fields){const pair=make('div');pair.append(make('dt',k),make('dd',v));facts.append(pair)}info.append(facts);
 for(const x of p.extras){const para=make('p',x.title+': ','idol-profile-extra');para.append(external(x.value,x.url));info.append(para)}
 info.append(make('h3','Social e siti verificabili','idol-profile-links-label'),linksNode(p,'idol-links'));
 const refs=make('p',null,'idol-profile-extra');refs.append(external('Wikidata / dati originali ↗',p.source));if(p.wiki)refs.append(document.createTextNode(' · '),external('Biografia Wikipedia ↗',p.wiki));if(p.photoFile)refs.append(document.createTextNode(' · '),external('Fotografia e licenza Commons ↗','https://commons.wikimedia.org/wiki/File:'+encodeURIComponent(p.photoFile.replace(/^File:/i,''))));
 refs.append(document.createTextNode(' · '),external('Cerca altri profili ↗','https://www.google.com/search?q='+encodeURIComponent(p.name+' '+categories[active].name)));
 info.append(refs,make('p','I collegamenti ai social sono indicati come ufficiali solo quando compaiono nella scheda Wikidata. Le ricerche su altri siti sono etichettate come tali.','idol-credit'));
 layout.append(photoNode(p,true),info);profileBody.append(layout);profile.showModal();
}
function paint(){
 const s=state[active],term=norm(query.value),shown=s.items.filter(p=>(!term||norm(p.name+' '+p.description+' '+p.roles).includes(term))&&(!onlyPhoto.checked||(p.photos.length>0&&!p.noPhoto)));
 shown.sort((a,b)=>sort.value==='recent'?(b.birthYear-a.birthYear)||a.name.localeCompare(b.name,'it'):a.name.localeCompare(b.name,'it'));
 const frag=document.createDocumentFragment();for(const p of shown)frag.append(card(p));if(!shown.length&&!s.busy)frag.append(make('p',s.error||'Nessuna scheda corrisponde ai filtri. Prova un’altra ricerca o carica altri profili.','idol-no-results'));
 grid.replaceChildren(frag);$('idol-category-copy').textContent=categories[active].description;
 status.textContent=s.busy?'Recupero delle schede e delle immagini libere…':s.error?s.error:s.items.length+' profili distinti disponibili · '+shown.length+' visibili'+(s.done?' · fine dei risultati di questa fonte':' · usa “Carica altri profili” per ampliare il catalogo');
 more.hidden=s.done||!!s.error;more.disabled=s.busy;more.textContent=s.busy?'Caricamento in corso…':'Carica altri 60 profili ✦';retry.hidden=!s.error;retry.disabled=s.busy;
 find.hidden=term.length<2;find.disabled=s.busy;
 for(const b of document.querySelectorAll('[data-idol-category]'))b.setAttribute('aria-pressed',String(b.dataset.idolCategory===active))
}
function choose(category){
 if(categories[category]?.adult&&!adultOK){pending=category;ageDialog.showModal();return}
 active=category;visibleId++;query.value='';paint();fetchFeatured(category);
 const s=state[category];if(!s.loaded&&!s.busy&&!s.error)fetchBatch(category)
}
document.querySelectorAll('[data-idol-category]').forEach(b=>b.addEventListener('click',()=>choose(b.dataset.idolCategory)));
$('idol-age-accept').addEventListener('click',()=>{adultOK=true;try{sessionStorage.setItem('yume-idols-adult-18','yes')}catch{}ageDialog.close();const k=pending;pending=null;if(k)choose(k)});
$('idol-age-decline').addEventListener('click',()=>{pending=null;ageDialog.close();choose('music')});ageDialog.addEventListener('close',()=>{pending=null});
$('idol-close').addEventListener('click',()=>profile.close());profile.addEventListener('click',e=>{if(e.target===profile)profile.close()});
query.addEventListener('input',paint);sort.addEventListener('change',paint);onlyPhoto.addEventListener('change',paint);
more.addEventListener('click',()=>fetchBatch(active));retry.addEventListener('click',()=>fetchBatch(active));find.addEventListener('click',onlineSearch);
if('IntersectionObserver' in window){
 const loader=new IntersectionObserver(entries=>{
  if(!entries.some(e=>e.isIntersecting)||query.value.trim())return;
  const s=state[active];if(!s.busy&&!s.done&&!s.error)fetchBatch(active)
 },{rootMargin:'250px'});
 loader.observe(more)
}
onlyPhoto.checked=true;paint();fetchFeatured('music');fetchBatch('music');
})();