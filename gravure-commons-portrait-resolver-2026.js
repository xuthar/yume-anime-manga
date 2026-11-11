/* Yume Gravure · Wikimedia Commons portrait enrichment, 09 November 2026.
   Only exact Wikidata female Japanese gravure models, and only identified
   Commons files with reusable licenses and non-explicit filenames.
   This is not a crawler for commercial photos or inaccessible GravureIndex.
*/
(()=>{'use strict';
const data=window.YumeIdolsDiscovery;if(!data)return;
const norm=s=>String(s||'').normalize('NFKC').normalize('NFKD').toLowerCase().replace(/[\u0300-\u036f\s・･._\-’'()]/g,'');
const cache=new Map(),attempted=new Set(),pending=[],active=new Set(),badFiles=new Set();
const key=n=>'yume:gravure:commons:v2:'+norm(n);
function get(name){
 const k=norm(name);if(cache.has(k))return cache.get(k);
 try{const raw=JSON.parse(localStorage.getItem(key(name))||'null');
  if(raw?.verified&&raw.source?.startsWith('https://commons.wikimedia.org/wiki/File:')){
    cache.set(k,raw);return raw;
  }
 }catch{}
 return null
}
const api=(host,params)=>{
 const url=host+'?'+new URLSearchParams({...params,format:'json',origin:'*'});
 return fetch(url,{mode:'cors',credentials:'omit'}).then(r=>{
  if(!r.ok)throw Error('HTTP '+r.status);return r.json()
 })
};
const first=(e,p)=>((e?.claims||{})[p]||[]).map(x=>x.mainsnak?.datavalue?.value).find(Boolean);
const hasClaim=(e,p,q)=>((e?.claims||{})[p]||[]).some(x=>x.mainsnak?.datavalue?.value?.id===q);
const bad=/(nude|naked|explicit|uncensored|masturba|intercourse|genital|nipples|sex-scene|adult.video|cover.?art|porn|ヌード|全裸|性交|乳首|ポルノ)/i;
const group=/(poster|group|banner|logo| and | with |集合|まとめ)/i;
const fileUrl=file=>'https://commons.wikimedia.org/wiki/File:'+encodeURIComponent(file.replaceAll(' ','_'));
async function imageInfo(file){
 if(badFiles.has(file)||bad.test(file)||group.test(file)||!/\.(?:jpe?g|png|webp)$/i.test(file))return null;
 const r=await api('https://commons.wikimedia.org/w/api.php',{
  action:'query',titles:'File:'+file,prop:'imageinfo',iiprop:'url|size|extmetadata',
  iiurlwidth:'900',formatversion:'2'
 });
 return eligible(r.query?.pages?.[0],file);
}
function eligible(p,nameOverride){
 if(!p||p.missing)return null;
 const file=nameOverride||(p.title||'').replace(/^File:/,'');
 const i=p.imageinfo?.[0];
 if(!i||badFiles.has(file)||bad.test(file)||group.test(file)||!/\.jpe?g$|\.png$|\.webp$/i.test(file))return null;
 const license=(i.extmetadata?.LicenseShortName?.value||'').replace(/<[^>]+>/g,'').trim();
 if(!/^(CC BY(?:[- ]SA)?(?:[- ]\d+(?:\.\d+)?)?|CC0(?:\s\d+(?:\.\d+)?)?|Public domain|PD(?:[- ].*)?|FAL)$/i.test(license))return null;
 if((i.width||0)<300||(i.height||0)<350||(i.height||0)<(i.width||0)*1.05)return null;
 return {file,photo:i.thumburl||i.url,source:fileUrl(file),license,verified:true,alternates:[]};
}
function exactMatch(e,name,alternate){
 const names=[e.labels?.en?.value,e.labels?.ja?.value,...(e.aliases?.en||[]).map(x=>x.value),...(e.aliases?.ja||[]).map(x=>x.value)].filter(Boolean);
 const keys=[norm(name),norm(alternate)];
 const parts=name.trim().split(/\s+/);if(parts.length===2)keys.push(norm(parts.reverse().join(' ')));
 return names.some(v=>keys.includes(norm(v)));
}
function isAdult(e){
 const dob=first(e,'P569')?.time;
 if(!dob)return false; // rigorous: no date, no automatic gravure portrait
 const m=String(dob).match(/^\+?(\d{4})-(\d{2})-(\d{2})/);
 if(!m)return false;
 const y=+m[1],month=+m[2],day=+m[3];
 if(month<1||day<1)return y<=2007;
 return y<2008||(y===2008&&(month<11||(month===11&&day<=9)))
}
async function discover(person){
 const name=person.name,alternate=person.alternate||'';
 const queries=[{name,lang:/[一-龯ぁ-んァ-ヶ]/.test(name)?'ja':'en'}];
 if(alternate&&norm(alternate)!==norm(name))queries.push({name:alternate,lang:'ja'});
 const ids=new Set();
 for(const q of queries.slice(0,2)){
  try{const res=await api('https://www.wikidata.org/w/api.php',{
   action:'wbsearchentities',type:'item',search:q.name,language:q.lang,limit:'6'});
   for(const item of res.search||[])if(/^Q\d+$/.test(item.id||''))ids.add(item.id)
  }catch{}
 }
 if(!ids.size)return null;
 const entities=await api('https://www.wikidata.org/w/api.php',{
  action:'wbgetentities',ids:[...ids].slice(0,10).join('|'),
  props:'labels|aliases|descriptions|claims|sitelinks',languages:'en|ja'
 });
 const matches=Object.values(entities.entities||{}).filter(e=>
  hasClaim(e,'P21','Q6581072')&&
  (!(e.claims?.P27||[]).length||hasClaim(e,'P27','Q17'))&&
  exactMatch(e,name,alternate)&&isAdult(e)&&
  (hasClaim(e,'P106','Q1328668')||/gravure|グラビア/i.test((e.descriptions?.en?.value||'')+' '+(e.descriptions?.ja?.value||'')))
 );
 if(matches.length!==1)return null;
 const personItem=matches[0],p18=first(personItem,'P18');
 if(typeof p18==='string'){
  const photo=await imageInfo(p18).catch(()=>null);
  if(photo)return photo
 }
 const link=personItem.sitelinks?.commonswiki?.title;
 const cat=(typeof link==='string'&&link.startsWith('Category:')?link.slice(9):null)||first(personItem,'P373');
 if(!cat||typeof cat!=='string')return null;
 const res=await api('https://commons.wikimedia.org/w/api.php',{
  action:'query',generator:'categorymembers',gcmtitle:'Category:'+cat,
  gcmtype:'file',gcmlimit:'40',prop:'imageinfo',iiprop:'url|size|extmetadata',
  iiurlwidth:'900',formatversion:'2'
 });
 const pics=(res.query?.pages||[]).map(p=>eligible(p)).filter(Boolean).sort((a,b)=>{
  const score=v=>/portrait|cropp?ed|headshot|肖像|profile|IMG/i.test(v.file)?2:1;
  return score(b)-score(a)
 });
 return pics[0]||null
}
let notifyPending=false;
function notify(){
 if(notifyPending)return;notifyPending=true;
 setTimeout(()=>{notifyPending=false;window.dispatchEvent(new CustomEvent('yume-gravure-photo-update'))},170)
}
function run(){
 while(active.size<3&&pending.length){
  const person=pending.shift(),k=norm(person.name);
  if(active.has(k))continue;
  active.add(k);
  discover(person).then(photo=>{
   if(!photo)return;
   cache.set(k,photo);
   try{localStorage.setItem(key(person.name),JSON.stringify(photo))}catch{}
   notify()
  }).catch(()=>{}).finally(()=>{active.delete(k);run()});
 }
}
function ensure(people){
 for(const p of people||[]){
  if(!p.categories?.has?.('gravure')||p.teenSafe||get(p.name)||window.YumePhotoStore?.get('japan',p.name)?.verified)continue;
  const k=norm(p.name);if(attempted.has(k))continue;
  attempted.add(k);pending.push(p)
 }
 run()
}
function reportBroken(name,file){
 const k=norm(name);
 const prior=cache.get(k);
 const badFile=file||prior?.file||null;
 if(badFile)badFiles.add(badFile);
 cache.delete(k);attempted.delete(k);
 try{localStorage.removeItem(key(name))}catch{}
 const person=(window.YumeIdolsDiscovery?.people||[]).find(p=>p.category==='gravure'&&norm(p.name)===k);
 if(person)ensure([{...person,categories:new Set(['gravure'])}]);
}
window.YumeGravurePortraits=Object.freeze({get,ensure,reportBroken,source:'Wikidata exact identity + Commons license',version:'2026-11-11'});
})();