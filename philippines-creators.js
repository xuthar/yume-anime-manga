/* Filipinas · a standalone, professional, source-led streamer and social directory. */
(()=>{'use strict';
 const d=window.YumeAsiaIdols,root=document.getElementById('ph-digital-grid');
 if(!d||!root)return;
 const query=document.getElementById('ph-digital-query');
 const count=document.getElementById('ph-digital-count'),stats=document.getElementById('ph-digital-stats');
 const photoOnly=document.getElementById('ph-digital-photos'),more=document.getElementById('ph-digital-more');
 const filters=[...document.querySelectorAll('[data-ph-filter]')];
 const people=d.people.filter(p=>p.country==='ph'&&(p.digitalScene||p.category==='creators')).map(p=>({...p,digitalScene:p.digitalScene||(p.category==='creators'?'social':'other')}));
 const index=new Map(people.map(p=>[p.name,p]));
 const ready=window.YumePhotoStore?.ready||Promise.resolve();
 let active='tiktok',limit=24;
 const norm=v=>String(v||'').normalize('NFKC').normalize('NFKD').toLocaleLowerCase('en').replace(/[\u0300-\u036f]/g,'').trim();
 const el=(tag,cls,txt)=>{const node=document.createElement(tag);if(cls)node.className=cls;if(txt!=null)node.textContent=txt;return node};
 function source(p){const id=p.sourceIds?.[0];return d.sources?.[id]?.url||'https://www.spiralytics.com/blog/most-popular-streamers-in-the-philippines/'}
 function portrait(p){
  const picture=window.YumePhotoStore?.get('asia',p.name,'ph');
  const wrap=el('div','ph-avatar');
  const mark=el('div','ph-avatar-symbol',p.digitalScene==='gaming'?'🎮':p.digitalScene==='livestream'?'♫':p.tiktokHandle?'🎵':'✿');
  const label=el('span','ph-avatar-source','Ritratto da verificare');
  wrap.append(mark,label);
  if(!picture?.verified||!picture.photo)return wrap;
  const urls=[...new Set([picture.photo,...picture.alternates||[]].filter(u=>typeof u==='string'&&u.startsWith('https://')))];
  if(!urls.length)return wrap;
  const img=document.createElement('img');img.alt='Foto pubblica documentata di '+p.name;img.loading='lazy';img.decoding='async';img.referrerPolicy='no-referrer';
  let i=0;
  img.onload=()=>wrap.classList.add('has-photo');
  img.onerror=()=>{i++;if(i<urls.length)img.src=urls[i];else img.remove()};
  img.src=urls[0];wrap.prepend(img);return wrap
 }
 function card(p){
  const a=el('article','ph-person');
  const image=portrait(p);a.append(image);
  const info=el('div','ph-person-copy');info.append(el('span','ph-person-type',p.digitalScene==='gaming'?'GAMING · STREAMER':p.digitalScene==='livestream'?'LIVE · STREAMER':p.tiktokHandle?'TIKTOK · CREATOR':'SOCIAL · CREATOR'));
  info.append(el('h3',null,p.name));
  if(p.tiktokHandle){const snapshot=Number.isFinite(p.tiktokFollowersMillions)?' · circa '+p.tiktokFollowersMillions+'M follower ('+(p.tiktokMetricsDate||'2026')+')':'';
   info.append(el('p','ph-tiktok-line','TikTok @'+p.tiktokHandle+snapshot));}
  info.append(el('p','ph-person-description',p.editorialBio||p.groups?.[0]||'Creator filippina'));
  const actions=el('div','ph-person-actions');
  const links=[...(p.verifiedLinks||[])].filter(x=>x.length===2&&typeof x[1]==='string'&&x[1].startsWith('https://'));
  const sourced=source(p);
  if(!links.some(x=>x[1]===sourced))links.push(['Fonte',sourced]);
  const photo=window.YumePhotoStore?.get('asia',p.name,'ph');
  if(photo?.verified&&photo.source)links.push(['Foto e licenza',photo.source]);
  const urls=new Set();
  for(const [name,url] of links){
   if(urls.has(url))continue;urls.add(url);
   const link=el('a',null,name+' ↗');link.href=url;link.target='_blank';link.rel='noopener noreferrer';actions.append(link);
  }
  info.append(actions);a.append(info);return a
 }
 const hasPhoto=p=>{const x=window.YumePhotoStore?.get('asia',p.name,'ph');return Boolean(x?.verified&&x.photo)};
 function filtered(){
  const q=norm(query.value);
  return people.filter(p=>(active==='all'||active==='tiktok'&&p.tiktokHandle||p.digitalScene===active||active==='social'&&p.digitalScene==='other')
   &&(!photoOnly.checked||hasPhoto(p))
   &&(!q||norm(p.name+' '+p.editorialBio+' '+(p.groups||[]).join(' ')).includes(q)))
   .sort((a,b)=>active==='tiktok'?((b.tiktokFollowersMillions||0)-(a.tiktokFollowersMillions||0)||Number(hasPhoto(b))-Number(hasPhoto(a))||a.name.localeCompare(b.name,'it')):(Number(hasPhoto(b))-Number(hasPhoto(a))||a.name.localeCompare(b.name,'it')))
 }
 function render(){
  const selected=filtered(),show=selected.slice(0,limit),frag=document.createDocumentFragment();
  for(const p of show)frag.append(card(p));
  if(!show.length)frag.append(el('p','ph-empty','Nessuna creator trovata. Prova un altro nome o disattiva il filtro foto.'));
  root.replaceChildren(frag);
  count.textContent=selected.length+' creator disponibili · '+show.length+' mostrate · '+selected.filter(hasPhoto).length+' con ritratto Commons collegato';
  stats.textContent=people.filter(p=>p.tiktokHandle).length+' TikToker e talent con account TikTok verificato · '+people.filter(p=>p.digitalScene==='gaming'||p.digitalScene==='livestream').length+' streamer/live creator · '+people.filter(p=>p.digitalScene==='social'||p.digitalScene==='other').length+' social creator';
  more.hidden=selected.length<=limit;
  more.textContent='Mostra altre '+Math.min(24,selected.length-limit)+' creator ↓';
  for(const button of filters)button.setAttribute('aria-pressed',String(button.dataset.phFilter===active))
 }
 filters.forEach(b=>b.addEventListener('click',()=>{active=b.dataset.phFilter;limit=24;render()}));
 query.addEventListener('input',()=>{limit=24;render()});
 photoOnly.addEventListener('change',()=>{limit=24;render()});
 more.addEventListener('click',()=>{limit+=24;render()});
 const h=location.hash.slice(1);if(['gaming','livestream','social','tiktok','all'].includes(h))active=h;
 render();ready.then(render).catch(()=>{});
})();
