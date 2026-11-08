/* Yume 2026 · Japanese illustrated navigation shared by core pages. */
(()=>{'use strict';
 const header=document.querySelector('body > header'),nav=header?.querySelector('nav[aria-label="Menu principale"],nav[aria-label="Navigazione principale"]');if(!nav)return;
 const primary=[['index.html','夢','Home'],['index.html#universo','宇','Universo'],['libreria.html#anime','映','Anime'],['libreria.html#manga','漫','Manga'],['seasons.html','季','Seasons'],['jpop.html','音','J-Pop'],['idols.html','星','Idols'],['yume-japan.html','和','Giappone']];
 const secondary=[['mie-liste.html','帳','Le mie liste'],['uscite-manga.html','本','Uscite manga'],['calendario-anime.html','曜','Episodi anime'],['tv-giapponese.html','電','TV e Radio'],['yume-magazine.html','誌','Magazine'],['chronos.html','時','Chronos'],['mangaka.html','筆','Mangaka']];
 const path=location.pathname.split('/').pop()||'index.html',hash=location.hash;
 function item([url,kanji,name]){const a=document.createElement('a'),k=document.createElement('span');a.href=url;a.className='yume-nav-link';a.dataset.label=name;k.className='yume-nav-kanji';k.setAttribute('aria-hidden','true');k.textContent=kanji;a.append(k,document.createTextNode(name));const p=url.split('#')[0];
 const active=path===p&&(!url.includes('#')?!(p==='index.html'&&hash.startsWith('#world-')):hash===('#'+url.split('#')[1]));if(active){a.classList.add('active');a.setAttribute('aria-current','page')}return a}
 nav.className='yume-global-nav';nav.setAttribute('aria-label','Menu principale Yume');nav.replaceChildren(...primary.map(item));
 const details=document.createElement('details');details.className='yume-nav-more';const summary=document.createElement('summary');summary.innerHTML='<span aria-hidden="true" class="yume-nav-kanji">他</span> Altri <span aria-hidden="true">⌄</span>';details.append(summary);
 const list=document.createElement('div');list.className='yume-nav-more-list';secondary.forEach(x=>list.append(item(x)));details.append(list);nav.append(details);
 if(secondary.some(x=>x[0].split('#')[0]===path)){details.classList.add('has-current')}
 document.addEventListener('click',e=>{if(details.open&&!details.contains(e.target))details.open=false});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&details.open){details.open=false;summary.focus()}});
 const themes={'libreria.html':['archive','浮世絵 · ARCHIVIO ANIME & MANGA'],'seasons.html':['seasons','四季 · LE STAGIONI DELLE STORIE'],'uscite-manga.html':['books','本棚 · NUOVI VOLUMI'],'calendario-anime.html':['episodes','暦 · EPISODI DELLA SETTIMANA'],'mie-liste.html':['lists','私の物語 · LE TUE LISTE'],'jpop.html':['music','音楽 · MUSICA DEL GIAPPONE'],'tv-giapponese.html':['media','電波 · VOCI DAL GIAPPONE'],'idols.html':['idols','アイドル · STORIE E PERSONE'],'index.html':['home','夢 · UN SOLO UNIVERSO']};
 const theme=themes[path];if(theme){document.body.classList.add('yume-illustrated','yume-section-'+theme[0]);if(path!=='index.html'){const ribbon=document.createElement('div');ribbon.className='yume-scene-ribbon';ribbon.setAttribute('aria-hidden','true');ribbon.textContent=theme[1];const main=document.querySelector('body > main');if(main)main.prepend(ribbon)}}
})();
