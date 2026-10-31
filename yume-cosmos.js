/* Yume 3.0 cosmos: the map and world navigator are real controls, not a flat image. */
(function(){
'use strict';
const data=window.YumeAtlas;if(!data||!document.getElementById('cosmos-world-tabs'))return;
const byId=id=>document.getElementById(id);
const tabs=byId('cosmos-world-tabs'),experience=byId('cosmos-experiences'),original=byId('cosmos-original-links');
const map=byId('solar-system'),panel=byId('worlds');
const make=(tag,text,cls)=>{const x=document.createElement(tag);if(text!==undefined)x.textContent=text;if(cls)x.className=cls;return x};
const activeWorlds=new Map(data.worlds.map(w=>[w.id,w]));
let selected='';
function url(mod){return mod.url||'yume-explore.html?area='+encodeURIComponent(mod.id)}
function setWorld(id,updateAddress=false,scroll=false){
 const world=activeWorlds.get(id);if(!world)return;
 selected=id;
 byId('cosmos-world-title').textContent=world.name;
 byId('cosmos-world-description').textContent=world.description;
 byId('cosmos-world-subtitle').textContent=world.eyebrow;
 byId('cosmos-world-intro').textContent=world.description;
 const picture=byId('cosmos-world-image');picture.src=world.image;picture.alt='Illustrazione del mondo '+world.name;
 document.querySelectorAll('[data-cosmos-world]').forEach(link=>{const isCurrent=link.dataset.cosmosWorld===id;link.classList.toggle('is-selected',isCurrent);if(isCurrent)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current')});
 tabs.replaceChildren();
 data.worlds.forEach(w=>{
  const b=make('button',w.icon+' '+w.name,'cosmos-world-tab');b.type='button';b.setAttribute('aria-pressed',String(w.id===id));
  b.addEventListener('click',()=>setWorld(w.id,true,false));tabs.append(b);
 });
 experience.replaceChildren();
 world.modules.forEach(key=>{const mod=data.modules[key];if(!mod)return;
  const item=make('a',mod.icon+'  '+mod.title);item.href=url({...mod,id:key});item.title=mod.subtitle||mod.title;experience.append(item);
 });
 original.replaceChildren();
 world.existing.forEach(([label,href])=>{const item=make('a',label+' ↗');item.href=href;original.append(item)});
 if(updateAddress)history.pushState({yumeWorld:id},'',location.pathname+location.search+'#world-'+id);
 if(scroll)panel.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});
}
document.querySelectorAll('[data-cosmos-world]').forEach(link=>link.addEventListener('click',event=>{event.preventDefault();setWorld(link.dataset.cosmosWorld,true,true)}));
function fromLocation(){const m=location.hash.match(/^#world-([a-z]+)$/);return m&&activeWorlds.has(m[1])?m[1]:null}
window.addEventListener('popstate',()=>{setWorld(fromLocation()||'universe',false,false)});
window.addEventListener('hashchange',()=>{const w=fromLocation();if(w)setWorld(w,false,false)});
const initial=fromLocation();
setWorld(initial||'universe',false,false);
if(initial){requestAnimationFrame(()=>panel.scrollIntoView({block:'start',behavior:'auto'}))}
})();