/* Unified Yume: compact Japanese cosmos powered by existing YumeAtlas. */
(()=>{'use strict';
const data=window.YumeAtlas,root=document.getElementById('universo');if(!root||!data)return;
const buttons=[...root.querySelectorAll('[data-world]')],by=id=>document.getElementById(id);
const create=(tag,txt)=>{const x=document.createElement(tag);x.textContent=txt;return x};
let active='';
const href=(key,mod)=>mod.url||'yume-explore.html?area='+encodeURIComponent(key);
function select(id,updateHash=false,scroll=false){
 const w=data.worlds.find(x=>x.id===id);if(!w)return;
 active=id;buttons.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.world===id)));
 by('unified-world-kicker').textContent=w.eyebrow;
 by('unified-world-title').textContent=w.name;
 by('unified-world-description').textContent=w.description;
 const nav=by('unified-world-links');nav.replaceChildren();
 const seen=new Set();
 const items=[...w.existing.map(([name,url])=>({name,url})),...w.modules.map(key=>{const m=data.modules[key];return m?{name:m.title,url:href(key,m)}:null}).filter(Boolean)];
 if(id==='music')items.unshift({name:'Idols · archivio unico (musica, Asia, atlete, Young Stars e 18+)',url:'idols.html#idols-hub'});
 for(const x of items){if(seen.has(x.url))continue;seen.add(x.url);const a=create('a',x.name+' ↗');a.href=x.url;nav.append(a)}
 if(updateHash)history.replaceState({yumeWorld:id},'',location.pathname+location.search+'#world-'+id);
 if(scroll)root.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});
}
buttons.forEach(b=>b.addEventListener('click',()=>select(b.dataset.world,true,false)));
function fromHash(){const m=location.hash.match(/^#world-(universe|collector|japan|music|magazine|discover)$/);return m&&m[1]}
window.addEventListener('hashchange',()=>{const id=fromHash();if(id)select(id,false,true)});
const initial=fromHash();select(initial||'universe',false,false);if(initial)requestAnimationFrame(()=>root.scrollIntoView({block:'start',behavior:'auto'}));
})();