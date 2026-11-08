/* Yume 2026 · Japanese illustrated navigation shared by core pages. */
(()=>{'use strict';
 const header=document.querySelector('body > header'),nav=header?.querySelector('nav[aria-label="Menu principale"],nav[aria-label="Navigazione principale"]');if(!nav)return;
 const primary=[['index.html','夢','Home'],['index.html#universo','宇','Universo'],['libreria.html#anime','映','Anime'],['libreria.html#manga','漫','Manga'],['seasons.html','季','Seasons'],['jpop.html','音','J-Pop'],['idols.html','星','Idols'],['yume-japan.html','和','Giappone']];
 const secondary=[['mie-liste.html','帳','Le mie liste'],['uscite-manga.html','本','Uscite manga'],['calendario-anime.html','曜','Episodi anime'],['tv-giapponese.html','電','TV e Radio'],['yume-magazine.html','誌','Magazine'],['chronos.html','時','Chronos'],['mangaka.html','筆','Mangaka']];
 const path=location.pathname.split('/').pop()||'index.html',hash=location.hash;
 function item([url,kanji,name]){const a=document.createElement('a'),k=document.createElement('span');a.href=url;a.className='yume-nav-link';a.dataset.label=name;k.className='yume-nav-kanji';k.setAttribute('aria-hidden','true');k.textContent=kanji;a.append(k,document.createTextNode(name));const p=url.split('#')[0];
 const active=path===p&&(url.includes('#')?hash==='#'+url.split('#')[1]:(p!=='index.html'||!['#universo','#ricerca'].includes(hash)&&!hash.startsWith('#world-')));if(active){a.classList.add('active');a.setAttribute('aria-current','page')}return a}
 nav.className='yume-global-nav';nav.setAttribute('aria-label','Menu principale Yume');nav.replaceChildren(...primary.map(item));
 const holder=document.createElement('div');holder.className='yume-nav-more';
 const trigger=document.createElement('button');trigger.type='button';trigger.className='yume-more-trigger';
 trigger.innerHTML='<span aria-hidden="true" class="yume-nav-kanji">他</span> Altri <span aria-hidden="true" class="yume-more-arrow">⌄</span>';
 trigger.setAttribute('aria-expanded','false');trigger.setAttribute('aria-haspopup','true');trigger.setAttribute('aria-controls','yume-other-links');
 holder.append(trigger);nav.append(holder);
 const list=document.createElement('div');list.className='yume-nav-popover';list.id='yume-other-links';
 list.setAttribute('role','region');list.setAttribute('aria-label','Altre sezioni di Yume');list.hidden=true;
 secondary.forEach(x=>list.append(item(x)));document.body.append(list);
 if(secondary.some(x=>x[0].split('#')[0]===path))holder.classList.add('has-current');
 function reposition(){
  if(list.hidden)return;
  const rect=trigger.getBoundingClientRect(),vw=window.innerWidth,vh=window.innerHeight;
  const width=Math.min(430,vw-24);list.style.width=width+'px';list.style.maxHeight='none';
  const needed=list.scrollHeight,below=vh-rect.bottom-18,above=rect.top-18;
  const flip=needed>below&&above>below;
  const room=Math.max(90,flip?above:below);
  const height=Math.min(needed,room);
  list.style.maxHeight=height+'px';
  const left=Math.max(12,Math.min(rect.right-width,vw-width-12));
  const top=flip?rect.top-height-8:rect.bottom+8;
  list.style.left=left+'px';list.style.top=Math.max(12,Math.min(top,vh-height-12))+'px';
 }
 function closeMenu(restoreFocus=false){
  if(list.hidden)return;
  list.hidden=true;holder.classList.remove('is-open');trigger.setAttribute('aria-expanded','false');
  if(restoreFocus)trigger.focus();
 }
 function openMenu(){
  list.hidden=false;holder.classList.add('is-open');trigger.setAttribute('aria-expanded','true');reposition();
 }
 trigger.addEventListener('click',()=>{if(list.hidden)openMenu();else closeMenu()});
 document.addEventListener('pointerdown',e=>{if(!list.hidden&&!holder.contains(e.target)&&!list.contains(e.target))closeMenu()});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!list.hidden){e.preventDefault();closeMenu(true)}});
 window.addEventListener('resize',reposition);
 window.addEventListener('scroll',reposition,{passive:true,capture:true});
 const themes={'libreria.html':['archive','浮世絵 · ARCHIVIO ANIME & MANGA'],'seasons.html':['seasons','四季 · LE STAGIONI DELLE STORIE'],'uscite-manga.html':['books','本棚 · NUOVI VOLUMI'],'calendario-anime.html':['episodes','暦 · EPISODI DELLA SETTIMANA'],'mie-liste.html':['lists','私の物語 · LE TUE LISTE'],'jpop.html':['music','音楽 · MUSICA DEL GIAPPONE'],'tv-giapponese.html':['media','電波 · VOCI DAL GIAPPONE'],'idols.html':['idols','アイドル · STORIE E PERSONE'],'index.html':['home','夢 · UN SOLO UNIVERSO']};
 if(path==='libreria.html'){
 const setCollection=()=>document.body.classList.toggle('yume-view-manga',location.hash==='#manga');
 window.addEventListener('hashchange',setCollection);setCollection();
}
 const theme=themes[path];if(theme){document.body.classList.add('yume-illustrated','yume-section-'+theme[0]);if(path!=='index.html'){const ribbon=document.createElement('div');ribbon.className='yume-scene-ribbon';ribbon.setAttribute('aria-hidden','true');ribbon.textContent=theme[1];const main=document.querySelector('body > main');if(main)main.prepend(ribbon)}}
})();
