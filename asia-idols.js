/* Yume Asia Idols · source first, conservative identity matching and Wikimedia portraits.
 Stage name, nation of activity, actual citizenship, and official profiles are kept distinct. */
(()=>{'use strict';
const d=window.YumeAsiaIdols,$=id=>document.getElementById(id);if(!d)return;
const root=$('asia-cards'),countryGrid=$('asia-country-grid'),search=$('asia-search'),countrySelect=$('asia-country-select'),
 groupSelect=$('asia-group-select'),categorySelect=$('asia-category-select'),onlyPhoto=$('asia-photos-only'),status=$('asia-status'),more=$('asia-more'),
 checkBtn=$('asia-verify-current'),scanBtn=$('asia-scan-country'),modal=$('asia-profile'),modalBody=$('asia-profile-body');
if(!root||!countryGrid)return;
const countries=Object.fromEntries(d.countries.map(c=>[c.id,c]));
const countryQ={kr:'Q884',cn:'Q148',th:'Q869',vn:'Q881',in:'Q668',tw:'Q865',ph:'Q928',id:'Q252',my:'Q833',sg:'Q334',hk:'Q8646',np:'Q837',jp:'Q17'};
const language={kr:'ko',cn:'zh',th:'th',vn:'vi',in:'hi',tw:'zh',ph:'en',id:'id',my:'ms',sg:'en',hk:'zh',np:'ne'};
const sources=d.sources;
const persons=d.people;
const seededEntities={'cn:杨冰怡':'Q47464482'};
for(const person of persons)if(seededEntities[person.country+':'+person.name])person.externalQid=seededEntities[person.country+':'+person.name];
const $make=(tag,cls,text)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(text!=null)e.textContent=String(text);return e};
const external=(name,url)=>{const a=$make('a',null,name);a.href=url;a.target='_blank';a.rel='noopener noreferrer';return a};
const safeUrl=v=>{try{const u=new URL(v);return u.protocol==='https:'?u.toString():null}catch{return null}};
const norm=x=>String(x||'').normalize('NFKC').normalize('NFKD').toLowerCase().replace(/[\u0300-\u036f]/g,'').replace(/[\s·・･-]/g,'');
const val=(e,k)=>(e?.claims?.[k]||[]).filter(c=>c.rank!=='deprecated').map(c=>c.mainsnak?.datavalue?.value).find(Boolean)||null;
const claim=(e,k,q)=>(e?.claims?.[k]||[]).some(c=>c.mainsnak?.datavalue?.value?.id===q);
const nc=new Intl.NumberFormat('it-IT');
let current='all',group='all',category='all',limit=36,busy=false,scan=false;
const groupSource=p=>sources[p.sourceIds[0]];
function dob(value){
 if(!value||!/^(\d{4})-(\d\d)-(\d\d)$/.test(value))return null;
 const [y,m,day]=value.split('-').map(Number),dt=new Date(Date.UTC(y,m-1,day));if(dt.getUTCFullYear()!==y||dt.getUTCMonth()!==m-1||dt.getUTCDate()!==day)return null;
 const today=new Date(),age=today.getFullYear()-y-((today.getMonth()+1<m||(today.getMonth()+1===m&&today.getDate()<day))?1:0);
 return {text:day.toString().padStart(2,'0')+'/'+m.toString().padStart(2,'0')+'/'+y,age:age>=0&&age<=120?age:null}
}
function valueDate(value){
 if(!value?.time||value.precision<11)return null;
 const m=value.time.match(/^\+?(\d{4})-(\d{2})-(\d{2})/);return m?dob(m[1]+'-'+m[2]+'-'+m[3]):null
}
function countryLabel(id){const c=countries[id];return c?(c.flag+' '+c.name):'🌸 Asia'}
function saved(p){
 try{
 const raw=localStorage.getItem('yume-asia-idol-v2:'+p.id);if(!raw)return;
 const v=JSON.parse(raw);if(Date.now()-v.checked>86400000*14)return;
 p.entityId=v.entityId||null;p.photoUrls=Array.isArray(v.photos)?v.photos.slice(0,6).filter(x=>typeof x==='string'&&x.startsWith('https://')):[];
 p.photo=p.photoUrls[0]||null;p.photoValid=v.photoValid===true&&!!p.photo;p.broken=v.broken===true;
 p.birth=p.birth||v.birth||null;p.verifiedLinks=Array.isArray(v.links)&&v.links.length?v.links:(p.verifiedLinks||[]);
 p.status=v.entityId?'verified':v.status==='none'?'none':'idle';
 }catch{}
}
function store(p){
 try{localStorage.setItem('yume-asia-idol-v2:'+p.id,JSON.stringify({checked:Date.now(),entityId:p.entityId||null,photos:p.photoUrls||[],photoValid:!!p.photoValid,broken:!!p.broken,birth:p.birth,links:p.verifiedLinks,status:p.status}))}catch{}
}
for(const p of persons){p.photoUrls=[];p.photo=null;p.photoValid=false;p.broken=false;p.entityId=null;p.status='idle';p.verifiedLinks=p.verifiedLinks||[];saved(p)}
function equivalent(e,p){
 if(e?.type!=='item'||!claim(e,'P31','Q5')||!claim(e,'P21','Q6581072'))return false;
 const citizenship=p.nationality||p.country;
 if(!claim(e,'P27',countryQ[citizenship]))return false;
 // Reject nonunique short stage names without an independently established QID.
 if(norm(p.name).length<5&&!p.externalQid)return false;
 const words=[...Object.values(e.labels||{}).map(x=>x.value),...Object.values(e.aliases||{}).flatMap(rows=>rows.map(x=>x.value))].filter(Boolean);
 const expected=[p.name,p.alternate].filter(Boolean).map(norm);
 if(!words.some(x=>expected.includes(norm(x))))return false;
 // A known public performer occupation; never classify by photograph alone.
 const known=new Set(['Q177220','Q33999','Q488111','Q4610556','Q2252262','Q10800557','Q49757','Q483501','Q1259809','Q3282637','Q13590141']);
 const occ=(e.claims?.P106||[]).map(x=>x.mainsnak?.datavalue?.value?.id);
 return occ.some(q=>known.has(q))||occ.length===0&&!!e.sitelinks?.enwiki?.title&&norm(p.name).length>7
}
async function api(url){const r=await fetch(url,{headers:{Accept:'application/json'}});if(!r.ok)throw Error('HTTP '+r.status);return r.json()}
async function media(e,p){
 const push=url=>{if(typeof url==='string'&&url.startsWith('https://')&&!p.photoUrls.includes(url))p.photoUrls.push(url)};
 const fileNames=(e.claims?.P18||[]).map(c=>c.mainsnak?.datavalue?.value).filter(x=>typeof x==='string'&&/\.(jpe?g|png|webp)$/i.test(x)).slice(0,4);
 p.photoFile=fileNames[0]||null;
 for(let j=0;j<fileNames.length;j+=12){
  try{
   const items=fileNames.slice(j,j+12),url='https://commons.wikimedia.org/w/api.php?action=query&format=json&formatversion=2&origin=*&prop=imageinfo&iiprop=url&iiurlwidth=480&titles='+encodeURIComponent(items.map(f=>'File:'+f.replace(/^File:/i,'')).join('|'));
   const json=await api(url);for(const page of json.query?.pages||[]){const inf=page.imageinfo?.[0];if(inf?.thumburl)push(inf.thumburl);if(inf?.url)push(inf.url)}
  }catch{}
 }
 const sitelinks=e.sitelinks||{};
 for(const [site,lang] of [['enwiki','en'],['kowiki','ko'],['zhwiki','zh'],['thwiki','th'],['viwiki','vi'],['idwiki','id']]){
  if(!sitelinks[site]?.title)continue;
  try{
   const u='https://'+lang+'.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=pageimages&piprop=thumbnail&pilicense=free&pithumbsize=480&titles='+encodeURIComponent(sitelinks[site].title);
   const j=await api(u);for(const x of Object.values(j.query?.pages||{}))if(x.thumbnail?.source)push(x.thumbnail.source)
  }catch{}
  if(p.photoUrls.length>1)break
 }
 for(const file of fileNames)push('https://commons.wikimedia.org/wiki/Special:FilePath/'+encodeURIComponent(file.replace(/^File:/i,''))+'?width=480');
 p.photo=p.photoUrls[0]||null
}
async function resolve(p){
 if(p.status==='loading'||p.status==='verified')return;
 p.status='loading';
 try{
  const keys=new Map();
  if(p.externalQid)keys.set(p.externalQid,true);
  for(const [lang,s] of [[language[p.country],p.name],['en',p.name],[language[p.country],p.alternate]]){
   if(!s||s.length<3)continue;
   const url='https://www.wikidata.org/w/api.php?action=wbsearchentities&format=json&origin=*&language='+lang+'&uselang='+lang+'&limit=15&search='+encodeURIComponent(s);
   try{for(const row of (await api(url)).search||[])if(/^Q\d+$/.test(row.id))keys.set(row.id,true)}catch{}
  }
  const ids=[...keys.keys()].slice(0,35);
  if(!ids.length){p.status='none';return}
  const url='https://www.wikidata.org/w/api.php?action=wbgetentities&format=json&origin=*&props=labels%7Caliases%7Cclaims%7Csitelinks&languages=en%7Cko%7Czh%7Cja%7Cth%7Cvi%7Chi%7Cid%7Cms&sitefilter=enwiki%7Ckowiki%7Czhwiki%7Cthwiki%7Cviwiki%7Cidwiki&ids='+encodeURIComponent(ids.join('|'));
  const ents=(await api(url)).entities||{};
  const e=ids.map(x=>ents[x]).find(x=>equivalent(x,p));
  if(!e){p.status='none';return}
  p.entityId=e.id;
  const dated=valueDate(val(e,'P569'));if(dated&&!p.birth)p.birth=dated.text.split('/').reverse().join('-');
  const linkPairs=[...(p.verifiedLinks||[])];
  const x=val(e,'P2002'),ig=val(e,'P2003'),yt=val(e,'P2397'),tk=val(e,'P7085'),website=val(e,'P856');
  if(typeof x==='string'&&/^[A-Za-z0-9_]{1,15}$/.test(x.replace(/^@/,'')))linkPairs.push(['X','https://x.com/'+x.replace(/^@/,'')]);
  if(typeof ig==='string'&&/^[A-Za-z0-9_.]{1,35}$/.test(ig.replace(/^@/,'')))linkPairs.push(['Instagram','https://www.instagram.com/'+ig.replace(/^@/,'')+'/']);
  if(typeof yt==='string'&&/^UC[A-Za-z0-9_-]{22}$/.test(yt))linkPairs.push(['YouTube','https://www.youtube.com/channel/'+yt]);
  if(typeof tk==='string'&&/^[A-Za-z0-9_.]{2,25}$/.test(tk.replace(/^@/,'')))linkPairs.push(['TikTok','https://www.tiktok.com/@'+tk.replace(/^@/,'')]);
  const site=safeUrl(website);if(site)linkPairs.push(['Sito',''+site]);
  p.verifiedLinks=[...new Map(linkPairs.map(x=>[x[0]+x[1],x])).values()];
  await media(e,p);p.status='verified'
 }catch{p.status='error'}
 finally{store(p)}
}
function pageSources(p){
 return p.sourceIds.map(k=>sources[k]).filter(Boolean)
}
function shown(includePhoto=false){
 const term=norm(search.value),all=current==='all';
 return persons.filter(p=>(all||p.country===current)&&(group==='all'||p.groups.includes(group))&&(category==='all'||p.category===category)&&(!term||norm(p.name+' '+p.alternate+' '+p.groups.join(' ')).includes(term))&&(includePhoto||!onlyPhoto.checked||p.photoValid===true))
 .sort((a,b)=>Number(!!b.photoValid)-Number(!!a.photoValid)||a.name.localeCompare(b.name,'it'))
}
function image(p,box){
 const urls=p.photoUrls||[];if(!urls.length||p.broken)return;
 let i=0;const img=document.createElement('img');img.alt='Ritratto pubblico di '+p.name;img.decoding='async';img.loading='lazy';
 img.onload=()=>{const isNew=p.photoValid!==true;p.photoValid=true;p.broken=false;img.dataset.loaded='true';p.photo=urls[i];store(p);if(isNew&&onlyPhoto.checked)render()};
 img.onerror=()=>{i++;if(i<urls.length){img.src=urls[i];return}p.broken=true;p.photoValid=false;img.remove();store(p);if(onlyPhoto.checked)render()};
 img.src=urls[i];box.append(img)
}
function card(p){
 const article=$make('article','asia-person');
 const c=countries[p.country],photo=$make('div','asia-person-photo');
 photo.append($make('span','asia-photo-mark',c.local?.slice(0,2)||'夢'));
 photo.append($make('span','asia-group-tag',p.groups[0]||'Artist'));
 image(p,photo);article.append(photo);
 const text=$make('div','asia-person-text');
 text.append($make('span','asia-person-country',countryLabel(p.country)));
 text.append($make('h3',null,p.name));
 text.append($make('p','asia-alt',p.alternate||'—'));
 text.append($make('p','asia-role',(p.category==='actors'?'Attrice / talent':p.category==='creators'?'Creator / influencer':'Idol musicale')+' · '+p.groups[0]));
 const date=dob(p.birth),born=$make('p','asia-meta','Nascita: '+(date?.text||'Non documentata'));
 const age=$make('p','asia-meta','Età: '+(date?.age!=null?date.age+' anni':'N/D'));text.append(born,age);
 const links=$make('div','asia-person-actions'),btn=$make('button',null,'Scheda ↗');btn.type='button';btn.addEventListener('click',()=>detail(p));
 const source=groupSource(p);
 links.append(btn);if(source)links.append(external('Foto ufficiali ↗',source.url));
 if(p.verifiedLinks?.length)for(const [name,url] of p.verifiedLinks.slice(0,2))links.append(external(name+' ↗',url));
 text.append(links);article.append(text);return article
}
function detail(p){
 modalBody.replaceChildren();
 const c=countries[p.country],source=groupSource(p),date=dob(p.birth);
 modalBody.append($make('span','asia-kicker',countryLabel(p.country)+' · '+p.groups.join(' / ')));
 const title=$make('h2',null,p.name);title.id='asia-profile-name';modalBody.append(title);
 if(p.alternate)modalBody.append($make('p',null,'Altro nome / grafia: '+p.alternate));
 if(p.photoValid&&p.photo){const img=document.createElement('img');img.className='asia-portrait-large';img.src=p.photo;img.alt='Ritratto di '+p.name;img.onerror=()=>img.remove();modalBody.append(img)}
 const facts=$make('div','asia-profile-grid');
 const field=(k,v)=>{const item=$make('div');item.append($make('b',null,k),$make('span',null,v||'Non disponibile'));facts.append(item)};
 field('Scena / paese di attività',c?.name);field('Gruppo o attività',p.groups.join(' · '));
 field('Professione',p.category==='actors'?'Attrice, talent':p.category==='creators'?'Creator, influencer o modella':'Idol, cantante o performer');
 field('Data di nascita',date?.text||'Non documentata');
 field('Età',date?.age!=null?date.age+' anni':'Non documentata');
 field('Nazionalità',p.nationality&&countries[p.nationality]?countries[p.nationality].name+' · diversa dalla scena':'Non specificata separatamente');
 field('Identità su Wikidata',p.entityId||'Non ancora verificata');
 field('Documentazione',pageSources(p).map(s=>s.year).join(', '));modalBody.append(facts);
 const links=$make('div','asia-profile-links');
 for(const source of pageSources(p))links.append(external('Fonte · '+source.title+' ↗',source.url));
 for(const [name,url] of p.verifiedLinks||[])links.append(external(name+' ↗',url));
 if(p.entityId)links.append(external('Wikidata ↗','https://www.wikidata.org/wiki/'+p.entityId));
 if(p.photoFile)links.append(external('Foto e licenza Commons ↗','https://commons.wikimedia.org/wiki/File:'+encodeURIComponent(p.photoFile)));
 if(!p.entityId){
  const verify=$make('button',null,'Verifica foto, data e social');verify.type='button';verify.disabled=p.status==='loading';
  verify.addEventListener('click',async()=>{verify.disabled=true;verify.textContent='Ricerca in corso…';p.status='idle';await resolve(p);detail(p);render()});links.append(verify)
 }
 links.append(external('Cerca X ↗','https://x.com/search?q='+encodeURIComponent(p.name+' '+p.groups[0])));
 links.append(external('Cerca YouTube ↗','https://www.youtube.com/results?search_query='+encodeURIComponent(p.name+' '+p.groups[0])));
 links.append(external('Cerca foto ↗','https://www.google.com/search?tbm=isch&q='+encodeURIComponent(p.name+' '+p.groups[0])));
 modalBody.append(links,$make('p',null,'I link “Cerca” aprono una ricerca esterna, non sono account verificati. Nessun volto è attribuito in base a una semplice somiglianza.'));
 if(!modal.open)modal.showModal()
}
function selectCountry(id){
 current=id;group='all';category='all';countrySelect.value=id;categorySelect.value='all';limit=36;groupOptions();render();
 for(const b of document.querySelectorAll('[data-asia-country]'))b.setAttribute('aria-pressed',String(b.dataset.asiaCountry===id));
}
function groupOptions(){
 groupSelect.replaceChildren();
 const all=$make('option',null,'Tutti i gruppi');all.value='all';groupSelect.append(all);
 const names=[...new Set(persons.filter(p=>current==='all'||p.country===current).flatMap(p=>p.groups))].sort((a,b)=>a.localeCompare(b,'it'));
 for(const g of names){const opt=$make('option',null,g);opt.value=g;groupSelect.append(opt)}
 groupSelect.value=group
}
function render(){
 const list=shown(),subset=list.slice(0,limit),frag=document.createDocumentFragment();
 for(const p of subset)frag.append(card(p));
 if(!subset.length)frag.append($make('p','asia-empty',onlyPhoto.checked?'Non ci sono ancora ritratti Commons confermati per questi filtri. Prova a disattivare il filtro o a verificare nuove schede.':'Nessuna corrispondenza. Prova un nome diverso.'));
 root.replaceChildren(frag);
 const photoCount=persons.filter(p=>p.photoValid).length;
 status.textContent=nc.format(list.length)+' nomi trovati · '+nc.format(subset.length)+' schede visibili · '+photoCount+' ritratti confermati da Wikimedia · '+persons.filter(p=>p.entityId).length+' identità collegate';
 more.hidden=list.length<=limit;more.textContent='Carica altre '+Math.min(36,list.length-limit)+' artiste ↓'
}
$('asia-total').textContent=nc.format(d.total);$('asia-countries-count').textContent=String(d.countries.length);
$('asia-sources-count').textContent=String(d.sourceCount);$('asia-groups-count').textContent=String(d.groupCount);
const allBtn=$make('button','asia-country');allBtn.type='button';allBtn.dataset.asiaCountry='all';
allBtn.append($make('span','asia-country-flag','🌏'),$make('strong',null,'Tutta l’Asia'),$make('small',null,'Un archivio, molte scene'),$make('span','asia-country-total',d.total+' artiste'));allBtn.setAttribute('aria-pressed','true');
allBtn.addEventListener('click',()=>selectCountry('all'));countryGrid.append(allBtn);
for(const c of d.countries){
 const option=$make('option',null,c.flag+' '+c.name);option.value=c.id;countrySelect.append(option);
 const b=$make('button','asia-country');b.type='button';b.dataset.asiaCountry=c.id;b.setAttribute('aria-pressed','false');
 b.append($make('span','asia-country-flag',c.flag),$make('strong',null,c.name+' · '+c.local),$make('small',null,c.description),$make('span','asia-country-total',d.countryCounts[c.id]+' artiste'));
 b.addEventListener('click',()=>{selectCountry(c.id);$('asia-catalogue').scrollIntoView({behavior:window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches?'instant':'smooth',block:'start'})});
 countryGrid.append(b)
}
countrySelect.addEventListener('change',()=>selectCountry(countrySelect.value));
groupSelect.addEventListener('change',()=>{group=groupSelect.value;limit=36;render()});
categorySelect.addEventListener('change',()=>{category=categorySelect.value;limit=36;render()});
search.addEventListener('input',()=>{limit=36;render()});onlyPhoto.addEventListener('change',()=>{limit=36;render()});
more.addEventListener('click',()=>{limit+=36;render()});$('asia-profile-close').addEventListener('click',()=>modal.close());
modal.addEventListener('click',e=>{if(e.target===modal)modal.close()});
async function verifyCurrent(){
 if(busy)return;
 const matches=shown(true).filter(p=>p.status==='idle'||p.status==='error').slice(0,7);
 if(!matches.length){status.textContent='Non ci sono nuove schede da verificare in questa selezione.';return}
 busy=true;checkBtn.disabled=true;checkBtn.textContent='Verifica in corso…';
 try{for(let i=0;i<matches.length;i+=2)await Promise.allSettled(matches.slice(i,i+2).map(async p=>{if(p.status==='error')p.status='idle';await resolve(p)}));render()}
 finally{busy=false;checkBtn.disabled=false;checkBtn.textContent='Trova foto e biografie'}
}
checkBtn.addEventListener('click',verifyCurrent);
scanBtn.addEventListener('click',async()=>{
 if(scan){scan=false;scanBtn.textContent='Continua a cercare foto nel paese';return}
 scan=true;scanBtn.textContent='Ferma ricerca';checkBtn.disabled=true;
 const queue=shown(true).filter(p=>p.status==='idle'||p.status==='error');
 try{
  for(let i=0;i<queue.length&&scan;i+=3){
   await Promise.allSettled(queue.slice(i,i+3).map(async p=>{if(p.status==='error')p.status='idle';await resolve(p)}));
   if(i%12===0)render();
   scanBtn.textContent='Ferma ricerca · '+Math.min(i+3,queue.length)+' / '+queue.length
  }
 }finally{scan=false;scanBtn.textContent='Cerca foto per tutto il paese';checkBtn.disabled=false;render()}
});
groupOptions();render();
Promise.resolve().then(verifyCurrent);
})();