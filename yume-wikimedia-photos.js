/* Yume photo gallery — Wikimedia (CC/PD) lead photos and Commons search.
 All images are loaded from verified API URLs and linked to their original file pages.
 Documentation: https://www.mediawiki.org/wiki/API:Cross-site_requests */
(()=>{'use strict';
 const cache=new Map(),queue=[];let active=0;
 const MAX=5;
 const api=(base,params)=>base+'?'+new URLSearchParams({action:'query',format:'json',origin:'*',...params});
 const timeout=async(url)=>{
  const ctrl=new AbortController(),t=setTimeout(()=>ctrl.abort(),10000);
  try{const r=await fetch(url,{signal:ctrl.signal,credentials:'omit',referrerPolicy:'no-referrer'});if(!r.ok)throw Error('Photo service unavailable');return await r.json()}
  finally{clearTimeout(t)}
 };
 const urlFile=name=>'https://commons.wikimedia.org/wiki/File:'+encodeURIComponent(name.replaceAll(' ','_'));
 async function lookup(wiki,search){
  if(wiki){
   try{
    const u=api('https://en.wikipedia.org/w/api.php',{prop:'pageimages',piprop:'thumbnail|name',pithumbsize:'820',redirects:'1',titles:wiki});
    const j=await timeout(u),p=Object.values(j.query?.pages||{})[0];
    if(p?.thumbnail?.source&&p.pageimage&&!/\.(svg|ogg|gif)$/i.test(p.pageimage)){
     return {src:p.thumbnail.source,href:urlFile(p.pageimage),credit:'Wikimedia Commons · autore e licenza'};
    }
   }catch(e){/* Commons fallback below. */}
  }
  const q=(search||wiki||'Japan');
  try{
   const u=api('https://commons.wikimedia.org/w/api.php',{generator:'search',gsrsearch:q+' filetype:bitmap',gsrnamespace:'6',gsrlimit:'8',prop:'imageinfo',iiprop:'url|mime',iiurlwidth:'820'});
   const j=await timeout(u),pages=Object.values(j.query?.pages||{});
   const p=pages.find(x=>{const i=x.imageinfo?.[0];return i&&(i.thumburl||i.url)&&/^image\/(jpeg|png|webp)$/i.test(i.mime||'')});
   const i=p?.imageinfo?.[0];
   if(i)return {src:i.thumburl||i.url,href:i.descriptionurl||urlFile(p.title.replace(/^File:/,'')),credit:'Wikimedia Commons · foto e licenza'};
  }catch(e){/* The placeholder remains visible. */}
  return null;
 }
 function dequeue(){
  while(active<MAX&&queue.length){
   const item=queue.shift();active++;
   const key=item.data.wiki+'|'+item.data.query;
   if(!cache.has(key))cache.set(key,lookup(item.data.wiki,item.data.query));
   cache.get(key).then(photo=>{
    if(!photo){item.fallback.textContent='Fotografia momentaneamente non disponibile';return}
    const img=document.createElement('img');img.alt=item.data.alt||'Fotografia reale';img.loading=item.data.hero?'eager':'lazy';img.decoding='async';img.referrerPolicy='no-referrer';
    img.onerror=()=>{img.remove();item.fallback.textContent='Fotografia momentaneamente non disponibile'};
    img.onload=()=>{
      if(item.fallback)item.fallback.hidden=true;
      if(item.credit){item.credit.href=photo.href;item.credit.textContent=photo.credit;item.credit.hidden=false}
    };
    img.src=photo.src;
    item.host.prepend(img);
   }).finally(()=>{active--;dequeue()});
  }
 }
 const observer='IntersectionObserver' in window?new IntersectionObserver(entries=>{
  for(const e of entries)if(e.isIntersecting){observer.unobserve(e.target);const item=e.target.__yumePhotoItem;if(item){queue.push(item);dequeue()}}
 },{rootMargin:'600px 0px'}):null;
 function observe(host,data,credit){
  const fallback=host.querySelector('.atlas-photo-placeholder');
  const item={host,data,credit,fallback};host.__yumePhotoItem=item;
  if(observer&&!data.hero)observer.observe(host);else{queue.push(item);dequeue()}
 }
 window.YumePhoto=Object.freeze({observe});
})();
