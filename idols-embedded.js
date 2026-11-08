/* Child view only when a catalog is read inside the unified Idols page. */
(()=>{'use strict';
 if(new URLSearchParams(location.search).get('embedded')!=='1')return;
 document.documentElement.classList.add('idols-embedded');
 document.addEventListener('click',event=>{
  const anchor=event.target.closest('a[href]');if(!anchor||anchor.target==='_blank'||event.metaKey||event.ctrlKey||event.shiftKey)return;
  const url=new URL(anchor.href,location.href);
  if(url.origin!==location.origin)return;
  const key={'idols.html':'japan','young-stars.html':'young','sport-idols.html':'sport','asia-idols.html':'asia'}[url.pathname.split('/').pop()];
  if(!key)return;
  event.preventDefault();
  if(window.parent!==window)window.parent.postMessage({type:'yume-idols-category',key},location.origin);
  else location.assign('idols.html#idol-'+key)
 });
})();
