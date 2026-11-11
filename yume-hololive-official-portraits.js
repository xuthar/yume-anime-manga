/* Yume VTuber © COVER Corp. image references; no copied artworks.
 * Built against official hololive TALENT profile page images, identity checked.
 * If an original URL breaks it is hidden, and official profile remains reachable.
 */
(()=>{'use strict';
 const photos=new Map(),failed=new Set();
 const normalize=s=>String(s||'').normalize('NFKC').normalize('NFKD').toLowerCase().replace(/[\u0300-\u036f\s・･._'’()\-]/g,'');
 const notify=()=>window.dispatchEvent(new Event('yume-vtuber-official-photo-update'));
 function get(name){const key=normalize(name);if(failed.has(key))return null;return photos.get(key)||null}
 function reportBroken(name){failed.add(normalize(name));notify()}
 async function load(){
  const r=await fetch('data/yume-hololive-official-portraits.json?v=20261111-hololive1',{cache:'no-cache'});
  if(!r.ok)throw Error('Official portrait index not published');
  const j=await r.json();
  if(!j.profiles||typeof j.profiles!=='object')return;
  for(const [name,p] of Object.entries(j.profiles)){
   if(!p.verified||!p.photo||!p.source||!/^https:\/\/hololive\.hololivepro\.com\/en\/talents\//.test(p.source))continue;
   if(!/^https:\/\/(?:[\w.-]+\.)?hololivepro\.com\//.test(p.photo))continue;
   photos.set(normalize(name),{name,verified:true,photo:p.photo,source:p.source,license:'© COVER Corp. · official talent artwork, rights reserved',alternates:[],sourceLabel:'hololive · artwork ufficiale',characterArtwork:true});
  }
  notify();
 }
 window.YumeHololivePortraits=Object.freeze({get,reportBroken,ready:load().catch(()=>{}),source:'Official hololive talents © COVER Corp. — externally referenced'});
})();