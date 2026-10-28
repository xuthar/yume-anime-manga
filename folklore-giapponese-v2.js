/* Yume Folklore · Enciclopedia illustrata, versione 2. Grande catalogo, nessun caricamento massivo. */
(()=>{'use strict';
 const all=Array.isArray(window.YumeYokai)?window.YumeYokai:[];
 const root=document.getElementById('yokai-grid');if(!root||!all.length)return;
 const search=document.getElementById('yokai-search'),type=document.getElementById('yokai-type'),tabs=document.getElementById('yokai-tabs'),counter=document.getElementById('yokai-count'),empty=document.getElementById('yokai-empty'),reset=document.getElementById('yokai-reset');
 const sort=document.getElementById('yokai-sort'),letter=document.getElementById('yokai-letter'),more=document.getElementById('yokai-more'),random=document.getElementById('yokai-random'),favCount=document.getElementById('yokai-favorite-count');
 const region=document.getElementById('yokai-region'),featured=document.getElementById('yokai-featured');
 const $=(tag,cls,content)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(content!==undefined)e.textContent=content;return e};
 const link=(label,url,klass)=>{const a=$('a',klass,label);a.href=url;a.target='_blank';a.rel='noopener noreferrer';return a};
 const normal=s=>String(s??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('it');
 const roman=s=>normal(s).replace(/[^a-z0-9]/g,'');
 const getLetter=s=>{const a=normal(s).match(/[a-z]/);return a?a[0].toUpperCase():'#'};
 const signs={'Oni e demoni':'鬼','Fantasmi e yūrei':'幽','Mutaforma e animali':'狐','Acqua e mare':'河','Montagne e foreste':'山','Spiriti della casa':'家','Oggetti animati':'器','Luci e fenomeni':'火','Leggende urbane moderne':'怪','Processioni e racconti':'百','Kami e miti':'神','Spettri e kaidan':'夜','Riti e presagi':'卜','Tradizioni Ryūkyū':'島','Tradizioni Ainu':'森'};
 const classType={'traditional':'Folklore','myth':'Mito / culto','modern':'Leggenda moderna'};
 const categoryList=[...new Set(all.map(x=>x.category))].sort((a,b)=>a.localeCompare(b,'it'));
 const letters=[...new Set(all.map(x=>getLetter(x.name)))].sort();
 const storeKey='yume-yokai-favorites-v2';
 const fav=new Set();try{const ids=JSON.parse(localStorage.getItem(storeKey)||'[]');if(Array.isArray(ids))ids.forEach(x=>{if(all.some(y=>y.id===x))fav.add(x)})}catch{}
 let selectedCategory='all',shown=0,filtered=[],viewToken=0;
 const batch=18,imageCache=new Map(),imageQueue=[];let imageActive=0;
 const FILES={
  'Ubagabi':'Sekien Ubagabi.jpg',
  'Ouni':'SekienOuni.jpg',
  'Sōgenbi':'Sekien Sogenbi.jpg',
  'Aobōzu':'SekienAobouzu.jpg',
  'Mikoshi-nyūdō':'SekienMikoshi.jpg'
 };
 function makeFileLink(f){return 'https://commons.wikimedia.org/wiki/File:'+encodeURIComponent(f.replaceAll(' ','_'))}
 function commonsFileUrl(f){return 'https://commons.wikimedia.org/wiki/Special:FilePath/'+encodeURIComponent(f.replaceAll(' ','_'))+'?width=740'}
 function textNode(t){return document.createTextNode(t)}
 function updateFavoriteCount(){if(favCount)favCount.textContent=String(fav.size)}
 function save(){try{localStorage.setItem(storeKey,JSON.stringify([...fav]))}catch{}updateFavoriteCount()}
 function imgLookup(p){
  if(FILES[p.name])return Promise.resolve({src:commonsFileUrl(FILES[p.name]),credit:'Toriyama Sekien · pubblico dominio',href:makeFileLink(FILES[p.name])});
  const wiki='https://commons.wikimedia.org/w/api.php';
  const args={action:'query',format:'json',origin:'*',generator:'search',gsrnamespace:'6',gsrlimit:'12',prop:'imageinfo',iiprop:'url|mime|extmetadata',iiurlwidth:'740'};
  const targets=[p.name,p.japanese||''].map(x=>normal(x));
  const words=(p.query||p.name).split(/\s+/).map(roman).filter(x=>x.length>4&&x!=='toriyama'&&x!=='sekien'&&x!=='japanese'&&x!=='folklore'&&x!=='illustration');
  const q=(p.query||p.name)+' filetype:bitmap';
  const url=wiki+'?'+new URLSearchParams({...args,gsrsearch:q});
  const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),9000);
  return fetch(url,{mode:'cors',credentials:'omit',signal:controller.signal,referrerPolicy:'no-referrer'}).then(r=>{if(!r.ok)throw Error('Commons');return r.json()}).then(data=>{
    const pages=Object.values(data.query?.pages||{});let best=null;
    for(const obj of pages){
      const info=obj.imageinfo?.[0];if(!info||!/^image\/(png|jpeg|webp)$/i.test(info.mime||'')||!(info.thumburl||info.url))continue;
      const name=normal(obj.title.replace(/^File:/i,'')),comp=roman(name);
      let score=0;
      if(roman(p.name).length>=4&&comp.includes(roman(p.name)))score+=12;
      if(p.japanese&&name.includes(normal(p.japanese)))score+=12;
      for(const w of words)if(comp.includes(w))score+=3;
      if(/sekien|toriyama|edo|woodblock|hyakki|kuniyoshi|yoshitoshi/.test(name))score+=2;
      if(/cosplay|fan.art|anime.screencap|game.play|generated|ai.art|drawing.request|cosplayer/i.test(name))score-=20;
      if(!best||score>best.score)best={score,obj,info};
    }
    if(!best||best.score<9)return null; // Nessuna immagine dubbia o attribuita a un altro mostro.
    const license=best.info.extmetadata?.LicenseShortName?.value||'licenza nella pagina';
    return {src:best.info.thumburl||best.info.url,href:best.info.descriptionurl||makeFileLink(best.obj.title.replace(/^File:/i,'')),credit:'Wikimedia Commons · '+license};
  }).catch(()=>null).finally(()=>clearTimeout(timer));
 }
 function pumpImages(){
  while(imageActive<4&&imageQueue.length){
   const job=imageQueue.shift();if(!job.card.isConnected)continue;imageActive++;
   if(!imageCache.has(job.p.id))imageCache.set(job.p.id,imgLookup(job.p));
   imageCache.get(job.p.id).then(a=>{
     if(!a||!job.card.isConnected){job.fallback.querySelector('small').textContent='Illustrazione non ancora identificata';return}
     const img=$('img');img.alt='Illustrazione storica associata a '+job.p.name;
     img.loading='lazy';img.decoding='async';img.referrerPolicy='no-referrer';
     img.addEventListener('load',()=>{job.fallback.hidden=true;job.credit.textContent='🖼 '+a.credit;job.credit.href=a.href;job.credit.hidden=false});
     img.addEventListener('error',()=>{img.remove();job.fallback.querySelector('small').textContent='Immagine non disponibile'});
     img.src=a.src;job.media.prepend(img);
   }).finally(()=>{imageActive--;pumpImages()})
  }
 }
 const observer=('IntersectionObserver' in window)?new IntersectionObserver(entries=>{
   for(const e of entries)if(e.isIntersecting){observer.unobserve(e.target);const job=e.target.__art;if(job){imageQueue.push(job);pumpImages()}}
 },{rootMargin:'240px 0px'}):null;
 function article(p,i){
  const card=$('article','yokai-card');card.id='creatura-'+p.id;
  const media=$('div','yokai-picture'),fallback=$('div','yokai-fallback');
  fallback.append($('span','yokai-symbol',signs[p.category]||'怪'),$('small','','Stampa / illustrazione tradizionale'));
  media.append(fallback,$('span','yokai-seal',String(i+1).padStart(3,'0')));
  const body=$('div','yokai-content');
  const tags=$('div','yokai-labels');tags.append($('span','',p.category),$('span','',classType[p.type]||'Tradizione'));
  body.append(tags,$('h2','',p.name),$('p','yokai-kanji',p.japanese),$('p','yokai-description',p.description));
  const info=$('p','yokai-era-label');info.append($('strong','','Origini · '),textNode(p.era+' · '+p.region));body.append(info);
  const details=$('details','yokai-story');details.append($('summary','','Leggi storia e contesto'),$('h3','','La leggenda / il motivo'),$('p','',p.story),$('h3','','Come interpretarlo'),$('p','yokai-caveat',p.historicalNote));
  body.append(details);
  const actions=$('div','yokai-links'),credit=link('🖼 Fonte e licenza','https://commons.wikimedia.org/','yokai-credit');credit.hidden=true;
  const favButton=$('button','yokai-favorite');favButton.type='button';
  function paint(){const yes=fav.has(p.id);favButton.textContent=yes?'♥ Preferito':'♡ Preferiti';favButton.setAttribute('aria-pressed',String(yes));favButton.setAttribute('aria-label',(yes?'Rimuovi dai preferiti: ':'Salva nei preferiti: ')+p.name)}
  favButton.addEventListener('click',()=>{if(fav.has(p.id))fav.delete(p.id);else fav.add(p.id);save();paint();if(selectedCategory==='favorites')filter()});paint();
  actions.append(link('Fonte d’epoca ↗',p.source?.url||'https://www.ndl.go.jp/en/imagebank/column/sekienyokai'),link('Archivio accademico ↗',p.research?.url||'https://www.nichibun.ac.jp/en/db/category/yokai/'),credit);body.append(actions,favButton);
  card.append(media,body);
  const job={card,p,media,credit,fallback};media.__art=job;
  if(observer)observer.observe(media);else{imageQueue.push(job)}
  return card
 }
 function addMore(){
   const part=filtered.slice(shown,shown+batch);
   const fragment=document.createDocumentFragment();
   for(const p of part)fragment.append(article(p,all.indexOf(p)));
   root.append(fragment);shown+=part.length;
   more.hidden=shown>=filtered.length;
   more.textContent='Mostra altre creature ('+(filtered.length-shown)+' restanti) ↓';
   counter.textContent=shown+' mostrate su '+filtered.length+' trovate · '+all.length+' nell’archivio';
   if(!observer)pumpImages();
 }
 function pick(){
  const q=normal(search.value.trim());const category=selectedCategory;
  let result=all.filter(p=>(category==='all'||(category==='favorites'?fav.has(p.id):p.category===category))&&(type.value==='all'||p.type===type.value)
  &&(region.value==='all'||(p.era||'').includes(region.value)||p.collection===region.value)&&(!q||normal([p.name,p.japanese,p.category,p.region,p.era,p.description,p.story,p.collection].join(' ')).includes(q))
  &&(letter.value==='all'||getLetter(p.name)===letter.value));
  if(sort.value==='az')result.sort((a,b)=>a.name.localeCompare(b.name,'it'));
  if(sort.value==='za')result.sort((a,b)=>b.name.localeCompare(a.name,'it'));
  if(sort.value==='new')result.reverse();
  return result;
 }
 function filter(){
  if(observer)observer.disconnect();imageQueue.length=0;root.replaceChildren();
  filtered=pick();shown=0;empty.hidden=filtered.length!==0;
  more.hidden=!filtered.length;
  if(filtered.length)addMore();else counter.textContent='0 risultati · '+all.length+' voci nell’archivio';
  for(const b of tabs.querySelectorAll('button'))b.setAttribute('aria-pressed',String(b.dataset.category===selectedCategory));
  updateFavoriteCount();
 }
 function tab(id,label){
  const b=$('button','',label);b.type='button';b.dataset.category=id;b.addEventListener('click',()=>{selectedCategory=id;filter()});tabs.append(b)
 }
 tab('all','Tutte · '+all.length);
 for(const name of categoryList)tab(name,name+' · '+all.filter(x=>x.category===name).length);
 tab('favorites','♥ I miei preferiti');
 for(const name of letters){const o=$('option','',name);o.value=name;letter.append(o)}
 for(const name of [...new Set(all.map(p=>p.collection).filter(Boolean))].sort())if(/Sekien/.test(name)){const o=$('option','',name);o.value=name;region.append(o)}
 const newTypes=[['Edo','Periodo Edo'],['Tradizioni varie','Tradizioni regionali'],['Moderno','Età moderna']];
 // Prefer explicit type and category over approximate chronological dating.
 search.addEventListener('input',filter);type.addEventListener('change',filter);region.addEventListener('change',filter);
 sort.addEventListener('change',filter);letter.addEventListener('change',filter);more.addEventListener('click',addMore);
 reset.addEventListener('click',()=>{selectedCategory='all';type.value='all';region.value='all';sort.value='original';letter.value='all';search.value='';filter();search.focus()});
 random.addEventListener('click',()=>{
  const pool=pick().length?pick():all;if(!pool.length)return;
  const one=pool[Math.floor(Math.random()*pool.length)];
  selectedCategory='all';type.value='all';region.value='all';letter.value='all';search.value=one.name;
  filter();document.getElementById('yokai-searchtools')?.scrollIntoView({behavior:'smooth',block:'start'});
 });
 document.getElementById('yokai-total').textContent=all.length.toLocaleString('it-IT');
 document.getElementById('yokai-categories').textContent=String(categoryList.length);
 document.querySelectorAll('[data-yokai-total]').forEach(x=>x.textContent=all.length.toLocaleString('it-IT'));
 document.querySelectorAll('[data-yokai-groupcount]').forEach(x=>x.textContent=String(categoryList.length));
 updateFavoriteCount();filter();
})();