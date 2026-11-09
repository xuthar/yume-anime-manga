/* Yume · India and Philippines professional social / dance creator galleries.
   Country-specific stand-alone pages, no embedded frames.
   Public adult belly-dance is a performance art, never mixed with adult AV content.
   Show only identity-matched Wikimedia Commons portraits with file licensing;
   social links remain usable when no reusable photo exists.
*/
(()=>{'use strict';
 const d=window.YumeAsiaIdols,root=document.getElementById('ph-digital-grid');
 if(!d||!root)return;
 const country=document.body.dataset.creatorsCountry==='in'?'in':'ph';
 const countryName=country==='in'?'India':'Filippine';
 const query=document.getElementById('ph-digital-query');
 const count=document.getElementById('ph-digital-count'),stats=document.getElementById('ph-digital-stats');
 const photoOnly=document.getElementById('ph-digital-photos'),more=document.getElementById('ph-digital-more');
 const filters=[...document.querySelectorAll('[data-ph-filter]')];
 const people=d.people.filter(p=>p.country===country&&(
   p.socialScene||p.digitalScene||p.category==='creators'
 )).map(p=>({...p,digitalScene:p.digitalScene||'social'}));
 const ready=window.YumePhotoStore?.ready||Promise.resolve();
 let active=country==='in'?'dance':'tiktok',limit=24;
 const norm=v=>String(v||'').normalize('NFKC').normalize('NFKD').toLocaleLowerCase('en').replace(/[\u0300-\u036f]/g,'').trim();
 const el=(tag,cls,txt)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(txt!==undefined)n.textContent=txt;return n};
 const safeLink=url=>typeof url==='string'&&/^https:\/\//i.test(url);
 const directLinks=p=>(p.verifiedLinks||[]).filter(x=>Array.isArray(x)&&x.length===2&&safeLink(x[1]));
 const photoFileURL=file=>file?'https://commons.wikimedia.org/wiki/Special:FilePath/'+encodeURIComponent(file.replace(/ /g,'_'))+'?width=920':null;
 const photoFilePage=file=>file?'https://commons.wikimedia.org/wiki/File:'+encodeURIComponent(file.replace(/ /g,'_')):null;
 const picture=p=>window.YumePhotoStore?.get('asia',p.name,country);
 const photoSource=p=>p.photoFile?photoFilePage(p.photoFile):picture(p)?.source||null;
 const hasPhoto=p=>!!(p.photoFile&&p.photoSource)||!!(picture(p)?.verified&&picture(p)?.photo);
 const profileLink=p=>directLinks(p).find(([label,url])=>/Instagram|TikTok|YouTube|Facebook|profilo creator|canale/i.test(label))?.[1]||null;
 const allCategories=new Set(['all','tiktok','gaming','livestream','social','dance','bellydance','reels','youtube']);
 const typeLabel=p=>({
   gaming:'🎮 GAMING · STREAMER',livestream:'♫ LIVE · STREAMER',
   dance:'💃 DANZA · VIDEO',bellydance:'✦ BELLY DANCE · ARTISTA ADULTA',
   reels:'▣ REELS · SOCIAL',youtube:'▶ YOUTUBE · SHORTS',
   tiktok:'♪ TIKTOK · DANCE',social:'✿ SOCIAL · CREATOR'
 })[p.digitalScene]||(p.tiktokHandle?'♪ TIKTOK · CREATOR':'✿ SOCIAL · CREATOR');
 function portrait(p){
  const wrap=el('div','ph-avatar'),mark=el('div','ph-avatar-symbol',p.digitalScene==='bellydance'?'✧':p.digitalScene==='dance'?'♫':p.digitalScene==='gaming'?'🎮':'✿');
  const label=el('span','ph-avatar-source','Ritratto non disponibile');
  wrap.append(mark,label);
  const existing=picture(p);
  const candidates=[photoFileURL(p.photoFile),existing?.photo,...(existing?.alternates||[])];
  const urls=[...new Set(candidates.filter(safeLink))];
  const fallback=()=>{
   const official=profileLink(p);
   if(official){
    const a=el('a','ph-avatar-action','Apri le foto ↗');
    a.href=official;a.target='_blank';a.rel='noopener noreferrer';wrap.append(a);
   }
  };
  if(!urls.length){fallback();return wrap}
  const img=document.createElement('img');
  img.alt='Ritratto pubblico attribuito di '+p.name;
  img.loading='lazy';img.decoding='async';img.referrerPolicy='no-referrer';
  let i=0;
  const failed=()=>{img.remove();wrap.classList.remove('has-photo');fallback()};
  img.onload=()=>{if(img.naturalWidth<220||img.naturalHeight<250){img.onerror();return}wrap.classList.add('has-photo')};
  img.onerror=()=>{i++;if(i<urls.length)img.src=urls[i];else failed()};
  img.src=urls[0];wrap.prepend(img);return wrap
 }
 function card(p){
  const card=el('article','ph-person');card.append(portrait(p));
  const info=el('div','ph-person-copy');info.append(el('span','ph-person-type',typeLabel(p)));
  info.append(el('h3',null,p.name));
  if(p.tiktokHandle){
   const snapshot=Number.isFinite(p.tiktokFollowersMillions)?' · ~'+p.tiktokFollowersMillions+'M follower ('+(p.tiktokMetricsDate||'fonte storica')+')':'';
   info.append(el('p','ph-tiktok-line','TikTok @'+p.tiktokHandle+snapshot))
  }
  info.append(el('p','ph-person-description',p.editorialBio||p.groups?.[0]||'Creator · '+countryName));
  if(p.socialArtForm)info.append(el('p','ph-artist-discipline',p.socialArtForm+' · attività professionale'));
  const actions=el('div','ph-person-actions'),links=directLinks(p).slice();
  const ref=d.sources?.[p.sourceIds?.[0]]?.url;
  if(safeLink(ref)&&!links.some(x=>x[1]===ref))links.push(['Fonte',ref]);
  const filePage=photoSource(p);
  if(safeLink(filePage)&&!links.some(x=>x[1]===filePage))links.push(['Foto e licenza',filePage]);
  if(!hasPhoto(p)&&!profileLink(p))links.push(['Cerca foto attribuite','https://www.google.com/search?tbm=isch&q='+encodeURIComponent(p.name+' '+countryName+' official creator')]);
  const unique=new Set();
  for(const [name,url] of links){
   if(!safeLink(url)||unique.has(url))continue;unique.add(url);
   const a=el('a',null,name+' ↗');a.href=url;a.rel='noopener noreferrer';a.target='_blank';actions.append(a)
  }
  info.append(actions);card.append(info);return card
 }
 function matchCategory(p){
  const sc=p.digitalScene||'social',links=directLinks(p);
  if(active==='all')return true;
  if(active==='tiktok')return !!p.tiktokHandle||sc==='tiktok'||links.some(x=>/tiktok/i.test(x[0]));
  if(active==='youtube')return sc==='youtube'||links.some(x=>/youtube/i.test(x[0]))||/youtube|vlog/i.test(p.editorialBio||'');
  if(active==='reels')return sc==='reels'||(sc==='social'&&links.some(x=>/instagram|facebook/i.test(x[0])));
  if(active==='social')return ['social','reels','other'].includes(sc);
  return sc===active
 }
 function filtered(){
  const q=norm(query.value);
  return people.filter(p=>matchCategory(p)&&(!photoOnly.checked||hasPhoto(p))
   &&(!q||norm(p.name+' '+(p.editorialBio||'')+' '+(p.groups||[]).join(' ')+' '+p.digitalScene+' '+(p.verifiedLinks||[]).map(x=>x[0]).join(' ')).includes(q)))
   .sort((a,b)=>Number(hasPhoto(b))-Number(hasPhoto(a))||
    (active==='tiktok'?b.tiktokFollowersMillions-a.tiktokFollowersMillions:0)||a.name.localeCompare(b.name,'it'))
 }
 function render(){
  const selected=filtered(),shown=selected.slice(0,limit),frag=document.createDocumentFragment();
  for(const p of shown)frag.append(card(p));
  if(!shown.length)frag.append(el('p','ph-empty','Nessun profilo corrispondente. Prova un’altra ricerca o togli il filtro foto.'));
  root.replaceChildren(frag);
  count.textContent=selected.length+' profili · '+shown.length+' mostrati · '+selected.filter(hasPhoto).length+' con fotografie Commons associate';
  const dancers=people.filter(p=>p.digitalScene==='dance'||p.digitalScene==='bellydance').length;
  stats.textContent=people.length+' creator in '+countryName+' · '+dancers+' profili di danza · '+
   people.filter(p=>p.digitalScene==='bellydance').length+' di belly dance professionale · '+people.filter(hasPhoto).length+' foto Commons attribuite';
  more.hidden=selected.length<=limit;more.textContent='Mostra altri '+Math.min(24,selected.length-limit)+' profili ↓';
  for(const b of filters)b.setAttribute('aria-pressed',String(b.dataset.phFilter===active))
 }
 filters.forEach(b=>b.addEventListener('click',()=>{active=b.dataset.phFilter;limit=24;render()}));
 query.addEventListener('input',()=>{limit=24;render()});
 photoOnly.addEventListener('change',()=>{limit=24;render()});
 more.addEventListener('click',()=>{limit+=24;render()});
 const hash=location.hash.slice(1);
 if(allCategories.has(hash))active=hash;
 render();ready.then(render).catch(()=>{});
})();