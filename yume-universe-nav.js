/* Shared six-world navigator. Keeps a clear route home on every Yume 3.0 page. */
(function(){
'use strict';
if(document.querySelector('.yn-dock'))return;
const style=document.createElement('style');
style.textContent=`
body.has-yume-dock{padding-bottom:83px!important}
.yn-dock{--yn-bg:rgba(17,19,43,.95);position:fixed;left:50%;bottom:13px;transform:translateX(-50%);z-index:9998;display:flex;align-items:center;gap:7px;width:max-content;max-width:calc(100vw - 24px);padding:7px;border-radius:18px;border:1px solid rgba(240,189,228,.59);background:var(--yn-bg);backdrop-filter:blur(20px);box-shadow:0 8px 35px #06081dbc;font:700 12px/1.2 system-ui,sans-serif;color:#fff}
.yn-dock :is(a,button){display:flex;align-items:center;justify-content:center;gap:7px;padding:11px 14px;min-height:40px;border:1px solid transparent;border-radius:12px;background:transparent;color:#eee9fa;text-decoration:none;font:inherit;cursor:pointer;white-space:nowrap}
.yn-dock :is(a,button):hover{background:#503964;color:white;border-color:#d6acd875}
.yn-dock :is(a,button):focus-visible,.yn-menu a:focus-visible{outline:3px solid #a5f5e5;outline-offset:2px}
.yn-dock .yn-map{background:linear-gradient(110deg,#f4b5e2,#b4bdf1);color:#1b1a39;border-color:#eed0f5}
.yn-dock .yn-map:hover{background:#ffd5ed;color:#23213b}
.yn-menu{position:fixed;z-index:9997;bottom:83px;left:50%;transform:translateX(-50%);width:min(520px,calc(100vw - 22px));border:1px solid #edbade93;border-radius:18px;padding:16px;background:#171b38f5;backdrop-filter:blur(18px);box-shadow:0 12px 40px #07091dc9;color:#fff;font:700 12px system-ui,sans-serif}
.yn-menu[hidden]{display:none!important}
.yn-menu>strong{display:block;font-size:15px;margin:0 0 4px}
.yn-menu>p{color:#bdbfd6;font-size:11px;font-weight:400;margin:0 0 12px}
.yn-menu-links{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}
.yn-menu-links a{display:flex;align-items:center;gap:8px;min-width:0;padding:11px;border-radius:10px;border:1px solid #afa2d45c;background:#292c4e;color:#f1e6f7;text-decoration:none;font-size:12px;line-height:1.3}
.yn-menu-links a:hover,.yn-menu-links a[aria-current=page]{border-color:#f1bde2;background:#58436d}
.yn-menu-links a>span{color:#f5b4dd;font-size:17px}
@media(max-width:480px){.yn-dock{bottom:8px;gap:2px;padding:5px;border-radius:13px}.yn-dock :is(a,button){font-size:11px;padding:8px 11px;min-height:37px}.yn-menu{bottom:66px;padding:13px}.yn-menu-links a{font-size:11px;padding:10px 8px}}
@media(prefers-reduced-motion:reduce){.yn-dock,.yn-menu{scroll-behavior:auto}}
`;
document.head.append(style);
document.body.classList.add('has-yume-dock');
const el=(tag,cls,text)=>{const x=document.createElement(tag);if(cls)x.className=cls;if(text!==undefined)x.textContent=text;return x};
const box=el('nav','yn-dock');box.setAttribute('aria-label','Navigazione permanente di Yume 3.0');
const home=el('a','yn-map','✦ Mappa');home.href='yume-3.html';home.title='Torna all’universo interattivo';
const toggle=el('button','yn-toggle','◈ Sei mondi ▾');toggle.type='button';toggle.setAttribute('aria-haspopup','true');toggle.setAttribute('aria-expanded','false');
const back=el('button','yn-back','← Indietro');back.type='button';back.title='Torna alla pagina precedente o alla mappa';
box.append(home,toggle,back);
const menu=el('div','yn-menu');menu.id='yn-menu';menu.hidden=true;menu.setAttribute('role','region');menu.setAttribute('aria-label','Vai a un mondo');
toggle.setAttribute('aria-controls',menu.id);
menu.append(el('strong','', 'Esplora i sei mondi'),el('p','', 'Scegli un pianeta e ritrova tutte le sue sezioni.'));
const items=el('div','yn-menu-links');
const worlds=[
 ['universe','✦','Universe & Nexus'],['collector','▤','Collector & Publishing'],
 ['japan','⛩','Japan & Academy'],['music','♫','Music & Entertainment'],
 ['magazine','誌','Magazine & Newsroom'],['discover','◇','Discover & Quest']
];
let active='';
const path=location.pathname.split('/').pop(),type=document.body.dataset.y3;
if(path==='yume-explore.html'){const current=new URLSearchParams(location.search).get('area');active=(window.YumeAtlas?.modules?.[current]?.world)||''}
else if(['universe','collector','japan','magazine'].includes(type))active=type;
else if(['chronos.html','manga-vs-anime.html','mangaka.html','light-novel-authors.html','anime-directors.html'].includes(path))active='universe';
else if(path==='anime-pilgrimage.html'||['cucina-giapponese.html','giappone-da-visitare.html','folklore-giapponese.html','storia-giappone-anime.html','luoghi-anime-manga.html'].includes(path))active='japan';
else if(['jpop.html','sigle-anime.html','sigle-italiane.html','colonne-sonore-anime.html','top-canzoni-giapponesi.html','tv-giapponese.html'].includes(path))active='music';
else if(['magazine-article.html'].includes(path))active='magazine';
else if(['mie-liste.html'].includes(path))active='discover';
else if(['uscite-manga.html'].includes(path))active='collector';
worlds.forEach(([key,icon,name])=>{const a=el('a','',name);a.href='yume-3.html#world-'+key;a.prepend(el('span','',icon));if(key===active)a.setAttribute('aria-current','page');items.append(a)});
menu.append(items);
function close(){menu.hidden=true;toggle.setAttribute('aria-expanded','false')}
toggle.addEventListener('click',()=>{menu.hidden=!menu.hidden;toggle.setAttribute('aria-expanded',String(!menu.hidden))});
back.addEventListener('click',()=>{let local=false;try{const u=new URL(document.referrer);local=u.origin===location.origin&&u.pathname.startsWith('/yume-anime-manga/')&&u.href!==location.href}catch(e){}
if(local)history.back();else location.assign('yume-3.html')});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){close();toggle.focus()}});
document.addEventListener('click',e=>{if(!menu.hidden&&!menu.contains(e.target)&&!toggle.contains(e.target))close()});
document.body.append(menu,box);
})();