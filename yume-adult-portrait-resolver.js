/* Yume Adult 18+ image library, November 2026.
 * Only publicly licensed, non-explicit Commons event/headshot photographs.
 * Scoped to the dedicated age-gated Adult and OnlyFans catalogue pages.
 * Original pixel dimensions >= 700x850 for automatically selected images.
 * Missing / ambiguous? Show 'photo unavailable', never a fake/blurred avatar.
 */
(()=>{'use strict';
const d=window.YumeAdultGlobal2026;
const normalize=n=>String(n||'').normalize('NFKC').normalize('NFKD').toLowerCase()
 .replace(/[\u0300-\u036f\s・･._\-’'()]/g,'');
const records=new Map((d?.records||[]).map(r=>[r.category+'|'+normalize(r.name),r]));
const images=new Map(),attempted=new Map(),queue=[],running=new Set(),badFiles=new Set();
const enabled=()=>{try{return sessionStorage.getItem('yume-idols-adult-18')==='yes'}catch{return false}};
const notify=()=>window.dispatchEvent(new CustomEvent('yume-adult-portraits-updated'));
const fileUrl=(name,w)=>'https://commons.wikimedia.org/wiki/Special:FilePath/'+encodeURIComponent(name.replace(/ /g,'_'))+'?width='+w;
const filePage=name=>'https://commons.wikimedia.org/wiki/File:'+encodeURIComponent(name.replace(/ /g,'_'));
function entry(r,file,width,height,license){
 return {name:r.name,file,photo:fileUrl(file,920),alternates:[fileUrl(file,740)],
  source:filePage(file),categoryUrl:r.commonsCategory?
  'https://commons.wikimedia.org/wiki/Category:'+encodeURIComponent(r.commonsCategory.replace(/ /g,'_')):r.source,
  verified:true,license:license||'Vedi licenza Commons',imageWidth:width||null,imageHeight:height||null,
  sharpness:width>=700&&height>=850?'alta':'da verificare',
  provenance:'Wikimedia Commons · nome e categoria professionale'};
}
const unsafe=/(naked|nude|nudity|nudes|explicit|porn\s*scene|sexual|uncensored|intercourse|sex\s*scene|masturbat|genital|fellatio|penetration|orgasm|anal\s|hardcore|topless|boobs|playboy cover|bikini|lingerie|swimsuit|erotic|intimate|裸|ヌード|性交|乳首|水着)/i;
const groupish=/( and | with |group|duo|collage|poster|banner|logo|cast of |screencap|teaser|film still|signature|autograph|album art|magazine|video cover)/i;
const supported=/(jpe?g|png|webp)$/i;
const licenseOK=s=>/\b(CC BY(?:-SA)?(?:\s|-)?[1-4](?:\.\d)?|CC0(?:\s[1-9])?|Public Domain|PD[- ]|PDM|FAL|CC BY-SA)\b/i.test(s);
function suitable(p){
 const file=String(p.title||'').replace(/^File:/i,''),i=p.imageinfo?.[0];
 if(!supported.test(file)||unsafe.test(file)||groupish.test(file)||!/portrait|headshot|cropped|event|awards|premiere|convention|Comiket|cosplay|photo session|[12]0\d\d by/i.test(file))return null;
 if(!i?.thumburl||!i?.width||!i?.height||i.width<700||i.height<850)return null;
 const ratio=i.height/i.width;
 if(ratio<1.13||ratio>2.45)return null;
 const license=i.extmetadata?.LicenseShortName?.value||'';
 if(!licenseOK(license))return null;
 let score=Math.min(i.width,2200)/300+Math.min(i.height,3200)/400;
 if(/portrait|headshot|cropped|facecrop|head shot/i.test(file))score+=4;
 if(/at the|awards|premiere|event|festival|convention|photo\s*call|201\d|202\d/i.test(file))score+=2;
 if(/facecrop/i.test(file)&&i.width<700)score-=10;
 return {file,width:i.width,height:i.height,license,score};
}
function cached(r){
 try{
  const v=JSON.parse(localStorage.getItem('yume:adult-photo-v2:'+r.category+':'+normalize(r.name))||'null');
  if(v&&Date.now()-v.when<30*86400000&&v.photo?.verified&&v.photo.source.startsWith('https://commons.wikimedia.org/wiki/File:')){
   images.set(r.category+'|'+normalize(r.name),v.photo);return v.photo;
  }
 }catch{}return null;
}
function get(name,section='adult'){
 if(!enabled())return null;
 const key=section+'|'+normalize(name),r=records.get(key);
 if(!r)return null;
 const original=window.YumePhotoStore?.get('japan',name);
 if(original?.verified&&original.photo&&!badFiles.has(key+'|'+(original.file||'')))return original.file
  ?{...original,photo:fileUrl(original.file,920),alternates:[original.photo,...(original.alternates||[])]}:original;
 const pinned=images.get(key)||cached(r);
 if(pinned&&!badFiles.has(key+'|'+pinned.file))return pinned;
 return null;
}
for(const r of records.values())if(r.file&& !unsafe.test(r.file)){
 const key=r.category+'|'+normalize(r.name);
 images.set(key,entry(r,r.file,null,null,'Wikimedia Commons · licenza nella pagina file'));
}
async function requestPhoto(r){
 if(!r.commonsCategory)return null;
 const q=new URLSearchParams({action:'query',format:'json',formatversion:'2',origin:'*',
  generator:'categorymembers',gcmtitle:'Category:'+r.commonsCategory,gcmtype:'file',gcmlimit:'70',
  prop:'imageinfo',iiprop:'url|size|extmetadata',iiurlwidth:'920'});
 const response=await fetch('https://commons.wikimedia.org/w/api.php?'+q,
  {mode:'cors',credentials:'omit',headers:{Accept:'application/json'}});
 if(!response.ok)return null;
 const j=await response.json(),key=r.category+'|'+normalize(r.name),
  items=(j.query?.pages||[]).map(suitable).filter(v=>v&&!badFiles.has(key+'|'+v.file));
 if(!items.length)return null;
 items.sort((a,b)=>b.score-a.score);
 const win=items[0];
 return entry(r,win.file,win.width,win.height,win.license);
}
let debounce=false;
function signal(){
 if(debounce)return;debounce=true;
 setTimeout(()=>{debounce=false;notify()},150);
}
async function run(r){
 const key=r.category+'|'+normalize(r.name);
 let item=null;
 try{item=await requestPhoto(r)}catch{}
 if(item){
  images.set(key,item);
  try{localStorage.setItem('yume:adult-photo-v2:'+key,JSON.stringify({when:Date.now(),photo:item}))}catch{}
  signal();
 }
}
function pump(){
 if(!enabled())return;
 while(running.size<3&&queue.length){
  const r=queue.shift(),k=r.category+'|'+normalize(r.name);
  if(running.has(k))continue;
  running.add(k);run(r).finally(()=>{running.delete(k);pump()});
 }
}
function ensure(people,section){
 if(!enabled()||!['adult','onlyfans'].includes(section))return;
 for(const item of people||[]){
  const name=typeof item==='string'?item:item?.name,k=section+'|'+normalize(name),r=records.get(k);
  if(!r||get(name,section)||attempted.has(k))continue;
  attempted.set(k,Date.now());queue.push(r);
 }
 pump();
}
function reportBroken(name,section,file){
 if(!enabled()||!['adult','onlyfans'].includes(section))return;
 const key=section+'|'+normalize(name),r=records.get(key);
 if(!r)return;
 if(file)badFiles.add(key+'|'+file);
 images.delete(key);
 attempted.delete(key);
 if(r.commonsCategory){attempted.set(key,Date.now());queue.push(r);pump()}
}
window.YumeAdultPortraits=Object.freeze({
 get,ensure,reportBroken,recordCount:records.size,
 pinnedCount:[...images.values()].length,
 policy:'Only Wikimedia Commons non-explicit photos, visible only after age gate; >=700x850 dynamic candidates'});
})();