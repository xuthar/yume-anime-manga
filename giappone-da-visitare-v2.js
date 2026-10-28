/* YUME Japan Travel Atlas 2.0 — real 47-prefecture SVG map + travel guide.
 * Geography: generalized public-domain GSI boundaries via amay077/JapanPrefGeoJson.
 * Maps and travel information are illustrative, not a route planner or real-time service.
 */
(()=>{'use strict';
const data=window.YumeJapanDestinations||[],geo=window.YumeJapanMapShapes||[];
const get=id=>document.getElementById(id),main=get('atlas-grid'),svg=get('japan-map-svg');
if(!main||!svg||!data.length)return;
const names=['Hokkaidō','Tōhoku','Kantō','Chūbu','Kansai','Chūgoku','Shikoku','Kyūshū','Okinawa'];
const palette={'Hokkaidō':'#a0d7b4','Tōhoku':'#9bbce0','Kantō':'#b9b5ef','Chūbu':'#d1c1e8','Kansai':'#f3bfc8','Chūgoku':'#edca9c','Shikoku':'#f5bd9b','Kyūshū':'#a5cde0','Okinawa':'#98e5de'};
const coords={'Hokkaidō':[783,111],'Tōhoku':[691,269],'Kantō':[624,426],'Chūbu':[548,382],'Kansai':[463,458],'Chūgoku':[331,432],'Shikoku':[373,492],'Kyūshū':[232,544],'Okinawa':[170,770]};
const nativeNS='http://www.w3.org/2000/svg';
const el=(tag,klass,t)=>{const node=document.createElement(tag);if(klass)node.className=klass;if(t!==undefined)node.textContent=t;return node};
const sv=(tag,attr)=>{const node=document.createElementNS(nativeNS,tag);for(const [k,v] of Object.entries(attr||{}))node.setAttribute(k,String(v));return node};
const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('it');
const link=(t,u,klass)=>{const a=el('a',klass,t);a.href=u;a.target='_blank';a.rel='noopener noreferrer';return a};
const categoryOf=p=>p.kind;
const search=get('atlas-search'),area=get('atlas-area'),tabs=get('atlas-pills'),count=get('atlas-count'),empty=get('atlas-empty'),more=get('travel-more'),sort=get('travel-sort'),interest=get('travel-interest'),clear=get('atlas-reset'),mapCount=get('travel-map-count');
const favIds=new Set(),favKey='yume-japan-visit-wishlist-v1';
try{const saved=JSON.parse(localStorage.getItem(favKey)||'[]');if(Array.isArray(saved))saved.forEach(id=>favIds.add(id))}catch(e){}
const saveFav=()=>{try{localStorage.setItem(favKey,JSON.stringify([...favIds]))}catch(e){}};
const cats=[...new Set(data.map(p=>p.kind))].sort((a,b)=>a.localeCompare(b,'it'));
const querySearch=p=>norm([p.name,p.jp,p.region,p.pref,p.kind,p.desc,p.experience,p.season,p.note,p.interest].join(' '));
data.forEach(p=>p._index=querySearch(p));
let chosenCat='all',shown=0,filtered=[],chosenArea='all',selectedFocus='all';
const batch=18;
const travelTypes=[['all','Tutti i viaggi'],['sea','🌊 Mare e isole'],['beach','🏖️ Spiagge'],['island','🏝️ Isole'],['onsen','♨️ Onsen'],['quiet','🌿 Natura e relax'],['favorites','♥ Salvati']];
const interestMatch=(p,v)=>v==='all'||v==='favorites'?v==='all'||favIds.has(p.id):v==='sea'?(p.kind==='Mare e spiagge'||p.kind==='Isole e snorkeling'):v==='beach'?p.kind==='Mare e spiagge':v==='island'?p.kind==='Isole e snorkeling':v==='onsen'?p.kind==='Onsen e benessere':v==='quiet'?p.kind==='Natura e relax':true;
const totalRelax=data.filter(p=>p.relax===true).length;
function sourcePhoto(p,card,i){
 const media=el('div','atlas-photo'),fallback=el('span','atlas-photo-placeholder','🗾 Fotografia in caricamento…');
 media.append(fallback,el('span','atlas-photo-badge',String(i+1).padStart(3,'0')));
 const credit=link('Foto / licenza · Wikimedia','https://commons.wikimedia.org/','atlas-credit');credit.hidden=true;
 if(window.YumePhoto)window.YumePhoto.observe(media,{wiki:p.wiki,query:p.query,alt:'Fotografia di '+p.name},credit);
 else fallback.textContent='Fotografia non disponibile';
 card.__photoCredit=credit;return media
}
function addCard(p){
 const card=el('article','atlas-card travel-card');card.id='meta-'+p.id;
 const photo=sourcePhoto(p,card,data.indexOf(p)),body=el('div','atlas-card-content'),cats=el('div','atlas-cats');
 cats.append(el('span','',p.kind),el('span','',p.region+' · '+p.pref));
 body.append(cats,el('h2','',p.name),el('p','atlas-jp',p.jp),el('p','atlas-desc',p.desc));
 body.append(el('h3','','Perché andarci'),el('p','atlas-detail-text',p.experience));
 const chips=el('div','atlas-chips');chips.append(el('span','','🌸 '+p.season));if(p.relax)chips.append(el('span','','🌴 Relax'));body.append(chips);
 if(p.note)body.append(el('p','atlas-memo','Da sapere · '+p.note));
 const fav=el('button','travel-favorite');fav.type='button';
 function paint(){const ok=favIds.has(p.id);fav.textContent=ok?'♥ Salvato per il viaggio':'♡ Salva per un viaggio';fav.setAttribute('aria-pressed',String(ok))}
 fav.addEventListener('click',()=>{
   if(favIds.has(p.id))favIds.delete(p.id);else favIds.add(p.id);
   saveFav();paint();if(interest.value==='favorites')filter();
 });paint();body.append(fav);
 const links=el('div','atlas-links');links.append(link('📍 Apri sulla mappa','https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(p.name+', '+p.pref+', Japan')));
 if(p.link)links.append(link('↗ Guida ufficiale JNTO',p.link));
 links.append(card.__photoCredit);body.append(links);
 card.append(photo,body);return card
}
function applyList(){
 let q=norm(search.value.trim());const reg=area.value;
 let result=data.filter(p=>(chosenCat==='all'||p.kind===chosenCat)&&(reg==='all'||p.region===reg)&&interestMatch(p,interest.value)&&(!q||p._index.includes(q)));
 if(sort.value==='az')result.sort((a,b)=>a.name.localeCompare(b.name,'it'));
 if(sort.value==='za')result.sort((a,b)=>b.name.localeCompare(a.name,'it'));
 if(sort.value==='region')result.sort((a,b)=>names.indexOf(a.region)-names.indexOf(b.region)||a.name.localeCompare(b.name,'it'));
 return result
}
function moreCards(){
 const partial=filtered.slice(shown,shown+batch),frag=document.createDocumentFragment();
 partial.forEach(p=>frag.append(addCard(p)));main.append(frag);shown+=partial.length;
 more.hidden=shown>=filtered.length;
 more.textContent='Mostra altri luoghi ('+(filtered.length-shown)+' restanti) ↓';
 count.textContent=shown+' mostrati · '+filtered.length+' trovati · '+data.length+' destinazioni'
}
function filter(){
 main.replaceChildren();filtered=applyList();shown=0;empty.hidden=filtered.length!==0;
 if(filtered.length)moreCards();else{more.hidden=true;count.textContent='Nessun risultato · '+data.length+' destinazioni totali'}
 for(const b of tabs.querySelectorAll('button'))b.setAttribute('aria-pressed',String(b.dataset.category===chosenCat));
 updateRegionState();
}
function pickRegion(r,scroll=true){
 area.value=r;chosenArea=r;selectedFocus=r;chosenCat='all';tabs.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.category==='all')));
 search.value='';interest.value='all';filter();
 if(scroll)get('destinazioni-giappone')?.scrollIntoView({behavior:'smooth',block:'start'})
}
function updateRegionState(){
 const active=area.value;svg.querySelectorAll('[data-region]').forEach(x=>{x.classList.toggle('is-active',active===x.dataset.region);x.classList.toggle('is-dimmed',active!=='all'&&active!==x.dataset.region)});
 get('japan-map-all')?.setAttribute('aria-pressed',String(active==='all'));
 get('travel-region-summary').textContent=active==='all'?'Tutto il Giappone':active;
 mapCount.textContent=String(data.filter(p=>active==='all'||p.region===active).length);
 const stars=get('travel-region-picks');if(stars){
  stars.replaceChildren();const opts=data.filter(p=>active==='all'?p.relax===true:p.region===active);
  opts.slice(0,5).forEach(p=>{const b=el('button','map-pick',p.name+' ›');b.type='button';b.addEventListener('click',()=>{area.value=p.region;chosenCat='all';interest.value='all';search.value=p.name;filter();get('destinazioni-giappone').scrollIntoView({behavior:'smooth',block:'start'})});stars.append(b)})
 }
 const badges=get('travel-region-badges');if(badges){badges.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',String(x.dataset.region===active)))}
}
function drawMap(){
 svg.replaceChildren();
 const bg=sv('g',{'aria-hidden':'true'}),map=sv('g',{}),labels=sv('g',{'class':'japan-map-labels'});
 bg.append(sv('rect',{x:0,y:0,width:1100,height:870,rx:24,fill:'#131c35'}));
 for(const [x,y,rx] of [[760,130,90],[620,315,120],[400,540,80],[168,748,120]]){
  bg.append(sv('ellipse',{cx:x,cy:y,rx,ry:rx*.65,fill:'#3b5679',opacity:'.15'}))
 }
 bg.append(sv('path',{d:'M15 665 H1085',stroke:'#ffffff24','stroke-width':'1','stroke-dasharray':'6 8'}));
 bg.append(sv('rect',{x:12,y:679,width:355,height:165,rx:16,fill:'#1b3145',stroke:'#7cb5b04a','stroke-width':'2'}));
 const islandLabel=sv('text',{x:30,y:707,fill:'#d8f5ee','font-size':18,'font-weight':700});islandLabel.textContent='沖縄 · Isole di Okinawa';bg.append(islandLabel);
 const sea=sv('text',{x:40,y:115,fill:'#6c9db4','font-size':23,opacity:.55,'font-weight':700});sea.textContent='MARE DEL GIAPPONE';bg.append(sea);
 const pac=sv('text',{x:715,y:610,fill:'#82bad0','font-size':24,opacity:.45,'font-weight':700});pac.textContent='OCEANO PACIFICO';bg.append(pac);
 svg.append(bg);
 for(const p of geo){
  if(!p.d)continue;
  const path=sv('path',{d:p.d,fill:palette[p.region]||'#dde2e7',stroke:'#18263d','stroke-width':'1.8','stroke-linejoin':'round',role:'button',tabindex:'0','aria-label':p.name+' · '+p.region,'data-region':p.region});
  const title=sv('title');title.textContent=p.name+' · '+p.region+' — Mostra destinazioni';path.append(title);
  if(p.region==='Okinawa')path.setAttribute('transform','translate(0 195)');
  path.addEventListener('click',()=>pickRegion(p.region));
  path.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();pickRegion(p.region)}});
  map.append(path)
 }
 svg.append(map);
 for(const r of names){
  const [x,y]=coords[r],group=sv('g',{'class':'japan-map-label','data-region':r,role:'button',tabindex:0,'aria-label':'Esplora '+r});
  const label=sv('text',{x,y,fill:'#ffffff','font-size':17,'font-weight':750,'text-anchor':'middle','paint-order':'stroke',stroke:'#13233c','stroke-width':5,'stroke-linejoin':'round'});label.textContent=r;
  const number=sv('text',{x,y:y+20,fill:'#ddf5ec','font-size':12,'text-anchor':'middle','paint-order':'stroke',stroke:'#11263b','stroke-width':4});number.textContent=data.filter(p=>p.region===r).length+' luoghi';
  group.append(label,number);
  group.addEventListener('click',()=>pickRegion(r));group.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();pickRegion(r)}});
  labels.append(group)
 }
 svg.append(labels);
}
for(const r of names){const o=el('option','',r);o.value=r;area.append(o)}
function categoryButton(key,label){const b=el('button','',label);b.type='button';b.dataset.category=key;b.addEventListener('click',()=>{chosenCat=key;filter()});tabs.append(b)}
categoryButton('all','Tutte');for(const c of cats)categoryButton(c,c+' · '+data.filter(p=>p.kind===c).length);
for(const [id,label] of travelTypes){const o=el('option','',label);o.value=id;interest.append(o)}
const regionBadges=get('travel-region-badges');
if(regionBadges){const all=el('button','travel-region-chip','Tutto');all.type='button';all.dataset.region='all';all.addEventListener('click',()=>pickRegion('all'));regionBadges.append(all);
 for(const r of names){const b=el('button','travel-region-chip',r);b.type='button';b.dataset.region=r;b.addEventListener('click',()=>pickRegion(r));regionBadges.append(b)}
}
get('atlas-total').textContent=String(data.length);
get('atlas-areas').textContent=String(names.length);
get('atlas-categories').textContent=String(cats.length);
get('travel-relax-total').textContent=String(totalRelax);
get('travel-beach-total').textContent=String(data.filter(x=>x.kind==='Mare e spiagge').length);
get('travel-islands-total').textContent=String(data.filter(x=>x.kind==='Isole e snorkeling').length);
const hero=get('atlas-hero-photo'),credit=get('atlas-hero-credit');
if(hero&&window.YumePhoto)window.YumePhoto.observe(hero,{wiki:'Miyakojima',query:'Yonaha Maehama Miyakojima Okinawa turquoise beach',alt:'Mare e spiagge di Okinawa',hero:true},credit);
search.addEventListener('input',filter);area.addEventListener('change',()=>{chosenArea=area.value;filter()});
sort.addEventListener('change',filter);interest.addEventListener('change',filter);
more.addEventListener('click',moreCards);
get('japan-map-all')?.addEventListener('click',()=>pickRegion('all',false));
get('travel-sea-shortcut')?.addEventListener('click',()=>{area.value='all';interest.value='sea';chosenCat='all';search.value='';filter();get('destinazioni-giappone')?.scrollIntoView({behavior:'smooth'})});
get('travel-okinawa-shortcut')?.addEventListener('click',()=>pickRegion('Okinawa'));
get('travel-onsen-shortcut')?.addEventListener('click',()=>{area.value='all';interest.value='onsen';chosenCat='all';search.value='';filter();get('destinazioni-giappone')?.scrollIntoView({behavior:'smooth'})});
clear.addEventListener('click',()=>{area.value='all';search.value='';chosenCat='all';interest.value='all';sort.value='original';filter();search.focus()});
drawMap();filter();
})();