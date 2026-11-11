/* Wikimedia Commons portraits independently matched by exact Wikidata identity.
 * Data produced by scripts/yume-recover-missing-portraits.cjs.
 * Never loads adult content. Linked photos must remain non-explicit and licensed.
 */
(()=>{'use strict';
 const photos=new Map(),broken=new Set();
 const normalize=s=>String(s||'').normalize('NFKC').normalize('NFKD').toLowerCase().replace(/[\u0300-\u036f\s・･._'’()\-]/g,'');
 const allowed=new Set(['music','fashion','creators','cosplay','gravure']);
 const isHttps=s=>{try{return new URL(s).protocol==='https:'}catch{return false}};
 const notify=()=>window.dispatchEvent(new Event('yume-recovered-portrait-update'));
 function get(name,category){
  const k=normalize(name),row=photos.get(k);
  if(!row||broken.has(k)||category&&!allowed.has(category))return null;
  return row;
 }
 function reportBroken(name){const k=normalize(name);broken.add(k);notify()}
 async function load(){
  const r=await fetch('data/yume-recovered-portraits.json?v=20261111-batch1',{cache:'no-cache'});
  if(!r.ok)return;
  const j=await r.json();
  for(const record of Object.values(j.profiles||{})){
   if(!record?.verified||!allowed.has(record.category)||!/^Q\d+$/.test(record.qid||''))continue;
   if(!isHttps(record.photo)||!/^https:\/\/commons\.wikimedia\.org\/wiki\/File:/.test(record.source||''))continue;
   if(!/^(CC BY(?:[- ]SA)?(?:[- ]\d+(?:\.\d+)?)?|CC0(?:\s\d+(?:\.\d+)?)?|Public domain|PD(?:[- ].*)?|FAL)$/i.test(record.license||''))continue;
   photos.set(normalize(record.name),{...record,verified:true,alternates:[],sourceLabel:'Wikimedia Commons · ritratto con licenza verificata'});
  }
  notify();
 }
 window.YumeRecoveredPortraits=Object.freeze({get,reportBroken,ready:load().catch(()=>{}),source:'Wikidata exact subject + Wikimedia Commons license',version:'2026-11-11'});
})();