/* Yume 2026 · Japanese illustrated navigation shared by core pages. */
(()=>{'use strict';
 const header=document.querySelector('body > header'),nav=header?.querySelector('nav[aria-label="Menu principale"],nav[aria-label="Navigazione principale"]');if(!nav)return;
 const primary=[['index.html','夢','Home'],['index.html#universo','宇','Universo'],['libreria.html#anime','映','Anime'],['libreria.html#manga','漫','Manga'],['seasons.html','季','Seasons'],['jpop.html','音','J-Pop'],['idols.html','星','Idols'],['yume-japan.html','和','Giappone']];
 const secondary=[['young-stars.html','星','Young Stars'],['asia-idols.html','亜','Asia Idols'],['sport-idols.html','競','Sport Idols'],['mie-liste.html','帳','Le mie liste'],['uscite-manga.html','本','Uscite manga'],['calendario-anime.html','曜','Episodi anime'],['tv-giapponese.html','電','TV e Radio'],['yume-magazine.html','誌','Magazine'],['chronos.html','時','Chronos'],['mangaka.html','筆','Mangaka']];
 const path=location.pathname.split('/').pop()||'index.html',hash=location.hash;
 function item([url,kanji,name]){const a=document.createElement('a'),k=document.createElement('span');a.href=url;a.className='yume-nav-link';a.dataset.label=name;k.className='yume-nav-kanji';k.setAttribute('aria-hidden','true');k.textContent=kanji;a.append(k,document.createTextNode(name));const p=url.split('#')[0];
 const active=path===p&&(url.includes('#')?hash==='#'+url.split('#')[1]:(p!=='index.html'||!['#universo','#ricerca'].includes(hash)&&!hash.startsWith('#world-')));if(active){a.classList.add('active');a.setAttribute('aria-current','page')}return a}
 nav.className='yume-global-nav';nav.setAttribute('aria-label','Menu principale Yume');nav.replaceChildren(...primary.map(item));
 const holder=document.createElement('div');holder.className='yume-nav-more';
 const trigger=document.createElement('button');trigger.type='button';trigger.className='yume-more-trigger';
 trigger.innerHTML='<span aria-hidden="true" class="yume-nav-kanji">他</span><span>Altri</span><span aria-hidden="true" class="yume-more-arrow">⌄</span>';
 trigger.setAttribute('aria-haspopup','dialog');trigger.setAttribute('aria-expanded','false');
 trigger.setAttribute('aria-controls','yume-more-dialog');trigger.setAttribute('aria-label','Apri le altre sezioni di Yume');
 holder.append(trigger);nav.append(holder);
 if(secondary.some(x=>x[0].split('#')[0]===path))holder.classList.add('has-current');
 const dialog=document.createElement('dialog');dialog.className='yume-menu-dialog';dialog.id='yume-more-dialog';
 dialog.setAttribute('aria-labelledby','yume-more-title');
 const head=document.createElement('div');head.className='yume-menu-heading';
 const nameBox=document.createElement('div');nameBox.className='yume-menu-heading-copy';
 const eyebrow=document.createElement('span');eyebrow.className='yume-menu-eyebrow';eyebrow.textContent='夢 · SCOPRI YUME';
 const heading=document.createElement('h2');heading.id='yume-more-title';heading.textContent='Altri mondi da esplorare';
 const description=document.createElement('p');description.textContent='Calendari, collezioni e percorsi nel Giappone di Yume.';
 nameBox.append(eyebrow,heading,description);
 const exit=document.createElement('button');exit.type='button';exit.className='yume-menu-close';exit.setAttribute('aria-label','Chiudi il menu');exit.textContent='×';
 head.append(nameBox,exit);dialog.append(head);
 const links=document.createElement('div');links.className='yume-menu-grid';
 secondary.forEach(x=>links.append(item(x)));dialog.append(links);
 const footer=document.createElement('div');footer.className='yume-menu-footer';footer.textContent='夢 · Un universo, tante storie';dialog.append(footer);
 document.body.append(dialog);
 const inlineStyle=document.createElement('style');inlineStyle.id='yume-menu-guaranteed-style';
 inlineStyle.textContent=`
 .yume-global-nav .yume-nav-more{display:flex!important;flex:0 0 auto!important;align-items:center!important}
 .yume-global-nav .yume-nav-more .yume-more-trigger{appearance:none!important;-webkit-appearance:none!important;box-sizing:border-box!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;gap:6px!important;padding:7px 10px!important;min-height:40px!important;width:auto!important;border:1px solid #e5a9d17a!important;border-radius:11px!important;background:#342741!important;color:#ffedf8!important;white-space:nowrap!important;line-height:1.15!important;font:700 12px/1.15 system-ui,sans-serif!important;box-shadow:none!important;text-transform:none!important;text-shadow:none!important;cursor:pointer!important}
 .yume-global-nav .yume-nav-more .yume-more-trigger:hover,.yume-global-nav .yume-nav-more .yume-more-trigger[aria-expanded="true"]{background:#533752!important;border-color:#f1b8de!important}
 .yume-global-nav .yume-nav-more .yume-more-trigger:focus-visible{outline:3px solid #a4f2e6!important;outline-offset:2px!important}
 .yume-global-nav .yume-nav-more .yume-more-trigger .yume-nav-kanji{display:inline-grid!important;place-items:center!important;flex:0 0 24px!important;width:24px!important;height:25px!important;border-radius:7px!important;background:#e8b0d32a!important;color:#ffdaef!important;border:1px solid #f0c7e260!important;font:700 15px/1 serif!important}
 .yume-global-nav .yume-nav-more .yume-more-trigger .yume-more-arrow{font:800 15px/1 system-ui,sans-serif!important;color:#eed0e2!important}
 .yume-menu-dialog:not([open]){display:none!important}
 .yume-menu-dialog[open]{position:fixed!important;inset:0!important;display:block!important;box-sizing:border-box!important;margin:auto!important;padding:0!important;border:1px solid #e5b5d887!important;border-radius:20px!important;width:min(540px,calc(100vw - 24px))!important;max-width:min(540px,calc(100vw - 24px))!important;max-height:calc(100dvh - 28px)!important;overflow:auto!important;overscroll-behavior:contain!important;background:radial-gradient(circle at 95% 5%,#81567466,transparent 45%),linear-gradient(155deg,#242039,#14182b)!important;color:#fdf3fb!important;box-shadow:0 30px 110px #050610eb!important;z-index:2147483600!important;scrollbar-color:#cfa2ca #332840!important}
 .yume-menu-dialog::backdrop{background:#0c0c1ec7!important;backdrop-filter:blur(5px)!important}
 .yume-menu-dialog .yume-menu-heading{display:flex;gap:14px;align-items:flex-start;justify-content:space-between;padding:25px 25px 16px;border-bottom:1px solid #eac2e72c}
 .yume-menu-dialog .yume-menu-eyebrow{display:block;font:750 10px/1.4 system-ui,sans-serif;letter-spacing:.24em;color:#efbfdf}
 .yume-menu-dialog h2{margin:8px 0!important;font:700 clamp(20px,4.5vw,28px)/1.15 system-ui,sans-serif!important;letter-spacing:-.03em;color:#fff3fc}
 .yume-menu-dialog .yume-menu-heading p{margin:6px 0 0!important;font:400 12px/1.6 system-ui,sans-serif!important;color:#d5c9df}
 .yume-menu-dialog .yume-menu-close{appearance:none!important;display:grid!important;place-items:center!important;width:35px!important;height:35px!important;flex:0 0 35px!important;padding:0!important;border:1px solid #e4b8db69!important;border-radius:10px!important;background:#6249664f!important;color:#fff0f9!important;font:400 26px/1 system-ui,sans-serif!important;cursor:pointer!important}
 .yume-menu-dialog .yume-menu-close:hover{background:#795472!important}
 .yume-menu-dialog .yume-menu-grid{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:9px!important;padding:21px 24px 24px!important}
 .yume-menu-dialog .yume-menu-grid>a{display:flex!important;align-items:center!important;justify-content:flex-start!important;min-height:52px!important;gap:10px!important;padding:9px 12px!important;border:1px solid #dfb2d545!important;border-radius:12px!important;background:#efe0f010!important;color:#f9e8f4!important;text-decoration:none!important;text-align:left!important;white-space:normal!important;font:650 12px/1.3 system-ui,sans-serif!important}
 .yume-menu-dialog .yume-menu-grid>a:hover,.yume-menu-dialog .yume-menu-grid>a:focus-visible,.yume-menu-dialog .yume-menu-grid>a.active{background:#a36e9b3b!important;border-color:#ebbbddad!important;color:white!important}
 .yume-menu-dialog .yume-menu-grid .yume-nav-kanji{display:grid!important;place-items:center!important;flex:0 0 30px!important;width:30px!important;height:31px!important;border:1px solid #eebfe070!important;border-radius:8px!important;background:#dfb6d726!important;color:#ffdaef!important;font:700 17px/1 serif!important}
 .yume-menu-dialog .yume-menu-footer{padding:13px 22px 17px;border-top:1px solid #e6b8d42c;text-align:center;color:#d7b1d1;font:600 10px/1.3 system-ui,sans-serif;letter-spacing:.12em}
 .yume-menu-dialog button:focus-visible,.yume-menu-dialog a:focus-visible{outline:3px solid #a4f2e6!important;outline-offset:2px!important}
 @media(max-width:610px){.yume-global-nav .yume-nav-more .yume-more-trigger{min-height:37px!important;padding:6px 7px!important;gap:4px!important;font-size:11px!important}.yume-global-nav .yume-nav-more .yume-more-trigger .yume-nav-kanji{width:21px!important;height:22px!important;flex-basis:21px!important;font-size:13px!important}.yume-menu-dialog .yume-menu-heading{padding:20px 17px 14px}.yume-menu-dialog .yume-menu-grid{gap:7px!important;padding:15px!important}.yume-menu-dialog .yume-menu-grid>a{min-height:50px!important;padding:8px!important;gap:7px!important;font-size:11px!important}.yume-menu-dialog .yume-menu-grid .yume-nav-kanji{width:26px!important;height:28px!important;flex-basis:26px!important;font-size:15px!important}}
 @media(prefers-reduced-motion:reduce){.yume-menu-dialog *{transition:none!important}}
 `;
 document.head.append(inlineStyle);
 function closeMenu(){if(dialog.open){dialog.close();trigger.setAttribute('aria-expanded','false')}}
 trigger.addEventListener('click',()=>{if(dialog.open){closeMenu();return}trigger.setAttribute('aria-expanded','true');if(typeof dialog.showModal==='function')dialog.showModal();else dialog.setAttribute('open','');});
 exit.addEventListener('click',closeMenu);
 dialog.addEventListener('close',()=>trigger.setAttribute('aria-expanded','false'));
 dialog.addEventListener('click',e=>{if(e.target===dialog)closeMenu()});
 const themes={'libreria.html':['archive','浮世絵 · ARCHIVIO ANIME & MANGA'],'seasons.html':['seasons','四季 · LE STAGIONI DELLE STORIE'],'uscite-manga.html':['books','本棚 · NUOVI VOLUMI'],'calendario-anime.html':['episodes','暦 · EPISODI DELLA SETTIMANA'],'mie-liste.html':['lists','私の物語 · LE TUE LISTE'],'jpop.html':['music','音楽 · MUSICA DEL GIAPPONE'],'tv-giapponese.html':['media','電波 · VOCI DAL GIAPPONE'],'idols.html':['idols','アイドル · STORIE E PERSONE'],'sport-idols.html':['sport','競技 · ATLETE GIAPPONESI'],'asia-idols.html':['asia','亞洲 · IDOLS DELL’ASIA'],'young-stars.html':['young','未来 · GIOVANI TALENTI'],'index.html':['home','夢 · UN SOLO UNIVERSO']};
 if(path==='libreria.html'){
 const setCollection=()=>document.body.classList.toggle('yume-view-manga',location.hash==='#manga');
 window.addEventListener('hashchange',setCollection);setCollection();
}
 const theme=themes[path];if(theme){document.body.classList.add('yume-illustrated','yume-section-'+theme[0]);if(path!=='index.html'){const ribbon=document.createElement('div');ribbon.className='yume-scene-ribbon';ribbon.setAttribute('aria-hidden','true');ribbon.textContent=theme[1];const main=document.querySelector('body > main');if(main)main.prepend(ribbon)}}
})();
