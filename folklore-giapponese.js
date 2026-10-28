/* Yume — Japanese folklore bestiary. 104 documented stories and motifs, historical sources, art. */
(()=>{'use strict';
 const data=window.YumeYokai,grid=document.getElementById('yokai-grid');
 if(!Array.isArray(data)||!grid)return;
 const search=document.getElementById('yokai-search'),type=document.getElementById('yokai-type'),tabs=document.getElementById('yokai-tabs'),counter=document.getElementById('yokai-count'),empty=document.getElementById('yokai-empty'),reset=document.getElementById('yokai-reset');
 const el=(tag,cls,t)=>{const o=document.createElement(tag);if(cls)o.className=cls;if(t!==undefined)o.textContent=t;return o};
 const lnk=(label,href,cls)=>{const a=el('a',cls,label);a.href=href;a.target='_blank';a.rel='noopener noreferrer';return a};
 const norm=v=>String(v||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('it');
 const toSearch=p=>'https://en.wikipedia.org/w/index.php?search='+encodeURIComponent(p.wiki||p.name);
 const cards=[],types={modern:'Leggenda moderna',myth:'Mito e figura sacra',traditional:'Tradizione popolare'};
 const symbols={"Oni e demoni":"鬼","Fantasmi e yūrei":"幽","Mutaforma e animali":"狐","Acqua e mare":"河","Montagne e foreste":"山","Spiriti della casa":"家","Oggetti animati":"器","Luci e fenomeni":"火","Leggende urbane moderne":"怪","Processioni e racconti":"百","Kami e miti":"神"};
 const jobs=[];let running=0;const LIMIT=5;
 const cache=new Map();
 const api=(site,params)=>site+'?'+new URLSearchParams({action:'query',format:'json',origin:'*',...params});
 async function fetchJson(url){
   const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),9000);
   try{const response=await fetch(url,{mode:'cors',credentials:'omit',signal:controller.signal,referrerPolicy:'no-referrer'});if(!response.ok)throw Error('image service');return response.json()}
   finally{clearTimeout(timer)}
 }
 const original=name=>'https://commons.wikimedia.org/wiki/File:'+encodeURIComponent(name.replaceAll(' ','_'));
 async function findArt(p){
   // Historic woodcuts first. Never use generic unrelated art for a creature.
   // Some entries are post-war stories, and no Edo illustration exists for them.
   if(p.type!=='modern'){
     try{
       const terms=p.query+' filetype:bitmap';
       const url=api('https://commons.wikimedia.org/w/api.php',{generator:'search',gsrsearch:terms,gsrnamespace:'6',gsrlimit:'10',prop:'imageinfo',iiprop:'url|mime|extmetadata',iiurlwidth:'740'});
       const j=await fetchJson(url),pages=Object.values(j.query?.pages||{});
       const base=norm(p.name.split(/\s+[·/]/)[0]).replace(/[^a-z0-9]/g,''),query=norm(p.query).split(' ').filter(x=>x.length>=4&&x!=='toriyama'&&x!=='sekien');
       const options=pages.filter(x=>{const t=x.imageinfo?.[0];return t&&/image\/(jpeg|png|webp)/i.test(t.mime||'')&&(t.thumburl||t.url)});
       const best=options.map(x=>{
         const n=norm(x.title),compact=n.replace(/[^a-z0-9]/g,'');let score=0;
         if(base.length>=4&&compact.includes(base))score+=8;
         for(const q of query)if(n.includes(q))score+=2;
         if(/sekien|kuniyoshi|yoshitoshi|woodblock|edo|toriyama|hyakki/.test(n))score+=2;
         if(/cosplay|anime|manga cover|fan art|modern illustration|ai-generated/i.test(n))score-=8;
         return {x,score};
       }).sort((a,b)=>b.score-a.score)[0];
       if(best&&best.score>=3){
         const info=best.x.imageinfo[0],metadata=info.extmetadata||{};
         const license=metadata.LicenseShortName?.value||'autore e licenza nella scheda';
         return {src:info.thumburl||info.url,href:info.descriptionurl||original(best.x.title.replace(/^File:/,'')),caption:'Wikimedia Commons · '+license};
       }
     }catch(e){/* Wikipedia fallback */}
   }
   try{
     const url=api('https://en.wikipedia.org/w/api.php',{prop:'pageimages',piprop:'thumbnail|name',pithumbsize:'740',titles:p.wiki,redirects:'1'});
     const j=await fetchJson(url),entry=Object.values(j.query?.pages||{})[0];
     if(entry?.thumbnail?.source&&entry.pageimage&&!/\.svg$/i.test(entry.pageimage)){
       return {src:entry.thumbnail.source,href:original(entry.pageimage),caption:'Wikimedia Commons · verifica autore e licenza'};
     }
   }catch(e){/* no illustrated page */}
   // Last chance: exact term (not generic illustrations from another character).
   try{
     const url=api('https://commons.wikimedia.org/w/api.php',{generator:'search',gsrsearch:'"'+p.name+'" filetype:bitmap',gsrnamespace:'6',gsrlimit:'8',prop:'imageinfo',iiprop:'url|mime',iiurlwidth:'740'});
     const j=await fetchJson(url),items=Object.values(j.query?.pages||{}),q=norm(p.name).replace(/[^a-z0-9]/g,'');
     const item=items.find(x=>{const n=norm(x.title).replace(/[^a-z0-9]/g,'');return q.length>=4&&n.includes(q)&&/image\/(jpeg|png|webp)/i.test(x.imageinfo?.[0]?.mime||'')});
     if(item){const info=item.imageinfo[0];return {src:info.thumburl||info.url,href:info.descriptionurl||original(item.title.replace(/^File:/,'')),caption:'Wikimedia Commons · immagine e licenza'};}
   }catch(e){/* leave beautiful typographic placeholder */}
   return null;
 }
 function load(){
   while(jobs.length&&running<LIMIT){
     const {p,picture,credit,fallback}=jobs.shift();running++;
     if(!cache.has(p.id))cache.set(p.id,findArt(p));
     cache.get(p.id).then(art=>{
       if(!art){fallback.querySelector('small').textContent='Illustrazione storica da cercare nell’archivio';return}
       const img=el('img');img.alt='Illustrazione o immagine storica relativa a '+p.name;img.loading='lazy';img.decoding='async';img.referrerPolicy='no-referrer';
       img.addEventListener('load',()=>{fallback.hidden=true;credit.href=art.href;credit.textContent='🖼 '+art.caption;credit.hidden=false;});
       img.addEventListener('error',()=>{img.remove();fallback.querySelector('small').textContent='Immagine temporaneamente non disponibile';});
       img.src=art.src;picture.prepend(img);
     }).finally(()=>{running--;load()});
   }
 }
 const observer=('IntersectionObserver' in window)?new IntersectionObserver(entries=>{
   for(const e of entries)if(e.isIntersecting){observer.unobserve(e.target);const d=e.target.__yokaiData;if(d){jobs.push(d);load();}}
 },{rootMargin:'500px 0px'}):null;
 data.forEach((p,i)=>{
   const article=el('article','yokai-card');article.id='creatura-'+p.id;article.dataset.category=p.category;article.dataset.type=p.type;
   article.dataset.search=norm([p.name,p.japanese,p.category,p.region,p.era,p.description,p.story].join(' '));
   const picture=el('div','yokai-picture'),fallback=el('div','yokai-fallback');
   fallback.append(el('span','yokai-symbol',symbols[p.category]||'怪'),el('small','','Arte tradizionale giapponese · ricerca illustrazione'));
   picture.append(fallback,el('span','yokai-seal',String(i+1).padStart(3,'0')));
   const content=el('div','yokai-content'),labels=el('div','yokai-labels');
   labels.append(el('span','',p.category),el('span','',types[p.type]||'Folklore'));
   content.append(labels,el('h2','',p.name),el('p','yokai-kanji',p.japanese),el('p','yokai-description',p.description));
   const era=el('p','yokai-era-label');era.append(el('strong','','Storia · '),document.createTextNode(p.era+' · '+p.region));content.append(era);
   const detail=el('details','yokai-story');detail.append(el('summary','','Leggi la leggenda e le origini'));
   detail.append(el('h3','','Il racconto'),el('p','',p.story),el('h3','','Come interpretarlo'),el('p','yokai-caveat',p.historicalNote));
   content.append(detail);
   const links=el('div','yokai-links'),credit=lnk('🖼 Foto e licenza','https://commons.wikimedia.org','yokai-credit');credit.hidden=true;
   links.append(lnk('↗ Fonte storica',p.source.url),lnk('↗ Archivio Nichibunken',p.research.url),lnk('↗ Cerca illustrazioni',toSearch(p)),credit);
   content.append(links);article.append(picture,content);grid.append(article);cards.push(article);
   const queued={p,picture,credit,fallback};picture.__yokaiData=queued;
   if(observer&&i>5)observer.observe(picture);else jobs.push(queued);
 });
 const categories=[...new Set(data.map(x=>x.category))].sort((a,b)=>a.localeCompare(b,'it'));
 let chosen='all';
 function render(){
   const q=norm(search.value.trim());let count=0;
   for(const card of cards){
     const matches=(chosen==='all'||card.dataset.category===chosen)&&(type.value==='all'||card.dataset.type===type.value)&&(!q||card.dataset.search.includes(q));
     card.hidden=!matches;if(matches)count++;
   }
   counter.textContent=count+' di '+data.length+' voci';
   empty.hidden=count>0;
   for(const b of tabs.querySelectorAll('button'))b.setAttribute('aria-pressed',String(b.dataset.category===chosen));
 }
 function categoryButton(name,label){
   const b=el('button','',label);b.type='button';b.dataset.category=name;b.setAttribute('aria-pressed',String(name===chosen));
   b.addEventListener('click',()=>{chosen=name;render()});tabs.append(b);
 }
 categoryButton('all','Tutte');
 for(const category of categories)categoryButton(category,category);
 search.addEventListener('input',render);type.addEventListener('change',render);
 reset.addEventListener('click',()=>{chosen='all';type.value='all';search.value='';render();search.focus()});
 document.getElementById('yokai-total').textContent=String(data.length);
 document.getElementById('yokai-categories').textContent=String(categories.length);
 render();load();
})();
