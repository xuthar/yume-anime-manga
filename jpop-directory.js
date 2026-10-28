/* Filterable, accessible J-Pop directory and resilient cover images. */
(()=>{'use strict';
const root=document.querySelector('.music-hub');if(!root)return;
const grid=root.querySelector('#jpop-artists'),cards=[...grid.querySelectorAll('.music-artist-card')],ctrl=root.querySelector('#jpop-controls'),search=root.querySelector('#jpop-search'),count=root.querySelector('#jpop-count'),empty=root.querySelector('#jpop-no-results'),clear=root.querySelector('#jpop-clear');
const news=new Set('more-star cutie-street avam phantom-siita inuwasi fav-me log-you myojou takane-no-nadeshiko fruits-zipper candy-tune sweet-steady not-equal-me nearly-equal-joy ilife rosy-chronicle ocha-norma palette-parade utage full-course enon scramble-smile jams-collection'.split(' '));
const rockRe=/rock|punk|metal|band|alt|dark|horror|loud/i;
for(const c of cards){
 const meta=c.querySelector('span')?.textContent||'',name=c.querySelector('h2')?.textContent||'',desc=c.querySelector('p')?.textContent||'';
 const genre=rockRe.test(meta)?'alternative':/idol|48|46|kawaii/i.test(meta+' '+name)?'idol':'artist';
 c.dataset.genre=genre;c.dataset.isNew=news.has(c.id)?'yes':'no';c.dataset.search=(name+' '+meta+' '+desc).toLocaleLowerCase('it');if(news.has(c.id))c.classList.add('is-new');
 const img=c.querySelector('img');if(img){img.loading='lazy';img.decoding='async';const fail=()=>{if(img.dataset.fallback)return;img.dataset.fallback='1';img.hidden=true;img.style.display='none';const ph=document.createElement('div');ph.className='music-image-fallback';ph.setAttribute('role','img');ph.setAttribute('aria-label','Immagine non disponibile per '+name);const title=document.createElement('span');title.textContent=name;ph.append(title);c.insertBefore(ph,c.firstChild)};img.addEventListener('error',fail);if(img.complete&&!img.naturalWidth)fail();}
}
let filter='all';
function apply(){
 const q=search.value.trim().toLocaleLowerCase('it');let visible=0;
 for(const c of cards){const matches=(filter==='all'||(filter==='new'?c.dataset.isNew==='yes':c.dataset.genre===filter))&&(!q||c.dataset.search.includes(q));c.hidden=!matches;if(matches)visible++}
 count.textContent=visible+' / '+cards.length+' artisti';empty.hidden=visible!==0;
 root.querySelectorAll('[data-jpop-filter]').forEach(btn=>btn.setAttribute('aria-pressed',String(btn.dataset.jpopFilter===filter)));
}
ctrl.hidden=false;search.addEventListener('input',apply);clear.addEventListener('click',()=>{search.value='';filter='all';apply();search.focus()});
root.querySelectorAll('[data-jpop-filter]').forEach(btn=>btn.addEventListener('click',()=>{filter=btn.dataset.jpopFilter;apply()}));
const sort=new Intl.Collator('it',{sensitivity:'base',numeric:true});cards.sort((a,b)=>sort.compare(a.querySelector('h2')?.textContent||'',b.querySelector('h2')?.textContent||'')).forEach(c=>grid.appendChild(c));
function hashHandler(){if(location.hash==='#nuove-idol'){filter='new';apply();root.querySelector('#artisti-jpop')?.scrollIntoView({block:'start'});}}
window.addEventListener('hashchange',hashHandler);hashHandler();apply();
})();