/* Yume Idols · conservative non-explicit Wikimedia portrait discovery (2026-11-09).
   No search-result images, no unlicensed hotlinks: Wikidata exact identity + Commons metadata.
   Applies only to non-adult Japanese solo artist categories without an existing portrait.
*/
(()=>{'use strict';
const norm=s=>String(s||'').normalize('NFKC').normalize('NFKD').toLowerCase().replace(/[\u0300-\u036f\s・･._\-’'()]/g,'');
const memory=new Map(),attempted=new Set(),queue=[],working=new Set();
const prefix='yume:idol:commons:nonadult:v1:';
function get(name){
 const k=norm(name);if(memory.has(k))return memory.get(k);
 try{
  const v=JSON.parse(localStorage.getItem(prefix+k)||'null');
  if(v?.verified===true&&v?.source?.startsWith('https://commons.wikimedia.org/wiki/File:')&&v?.photo?.startsWith('https://')){
   memory.set(k,v);return v
  }
 }catch{}
 return null
}
async function api(host,params){
 const u=host+'?'+new URLSearchParams({...params,format:'json',origin:'*'});
 const r=await fetch(u,{mode:'cors',credentials:'omit'});
 if(!r.ok)throw Error('Wikimedia HTTP '+r.status);
 return r.json()
}
function values(e,p){return (e?.claims?.[p]||[]).filter(x=>x.rank!=='deprecated').map(x=>x.mainsnak?.datavalue?.value).filter(Boolean)}
const isFemale=e=>values(e,'P21').some(v=>v.id==='Q6581072');
function nameMatch(e,p){
 const names=[e.labels?.en?.value,e.labels?.ja?.value,...(e.aliases?.en||[]).map(x=>x.value),...(e.aliases?.ja||[]).map(x=>x.value)].filter(Boolean);
 const candidates=[p.name,p.alternate,...(p.otherStageNames||[])].filter(Boolean);
 const parts=p.name.split(/\s+/);if(parts.length===2)candidates.push(parts.reverse().join(' '));
 return names.some(n=>candidates.some(c=>norm(n)===norm(c)));
}
const unsafe=/(nude|naked|explicit|uncensored|genital|intercourse|porn|sex.scene|乳首|全裸|ヌード|ポルノ|集合|group|logo|poster|banner)/i;
async function photoFor(file){
 if(typeof file!=='string'||unsafe.test(file)||!/\.(jpe?g|png|webp)$/i.test(file))return null;
 const r=await api('https://commons.wikimedia.org/w/api.php',{action:'query',titles:'File:'+file,prop:'imageinfo',iiprop:'url|size|extmetadata',iiurlwidth:'600',formatversion:'2'});
 const page=r.query?.pages?.[0],info=page?.imageinfo?.[0];
 if(!info||page.missing||(info.width||0)<220||(info.height||0)<220)return null;
 const license=(info.extmetadata?.LicenseShortName?.value||'').replace(/<[^>]+>/g,'').trim();
 if(!/^(CC BY(?:[- ]SA)?(?:[- ]\d+(?:\.\d+)?)?|CC0(?:\s\d+(?:\.\d+)?)?|Public domain|PD(?:[- ].*)?|FAL)$/i.test(license))return null;
 const source='https://commons.wikimedia.org/wiki/File:'+encodeURIComponent(file.replaceAll(' ','_'));
 return {verified:true,file,photo:info.thumburl||info.url,source,license,alternates:[info.url].filter(x=>x&&x!==(info.thumburl||info.url))}
}
async function discover(p){
 const lookups=[{name:p.name,lang:/[一-龯ぁ-んァ-ヶ]/.test(p.name)?'ja':'en'}];
 if(p.alternate&&norm(p.alternate)!==norm(p.name))lookups.push({name:p.alternate,lang:'ja'});
 const ids=new Set();
 for(const l of lookups.slice(0,2)){
  const result=await api('https://www.wikidata.org/w/api.php',{action:'wbsearchentities',search:l.name,language:l.lang,type:'item',limit:'5'});
  for(const r of result.search||[])if(/^Q\d+$/.test(r.id||''))ids.add(r.id)
 }
 if(!ids.size)return null;
 const result=await api('https://www.wikidata.org/w/api.php',{action:'wbgetentities',ids:[...ids].slice(0,8).join('|'),props:'labels|aliases|claims',languages:'ja|en'});
 const candidates=Object.values(result.entities||{}).filter(e=>isFemale(e)&&nameMatch(e,p)&&values(e,'P18').length);
 if(candidates.length!==1)return null; // ambiguous identity: leave portrait empty
 for(const f of values(candidates[0],'P18').slice(0,2)){
  const photo=await photoFor(f);
  if(photo)return photo
 }
 return null
}
let notice=false;
function changed(){
 if(notice)return;notice=true;
 setTimeout(()=>{notice=false;window.dispatchEvent(new Event('yume-idol-photo-update'))},250)
}
function run(){
 while(working.size<2&&queue.length){
  const p=queue.shift(),key=norm(p.name);if(working.has(key))continue;
  working.add(key);
  discover(p).then(photo=>{
   if(photo){memory.set(key,photo);try{localStorage.setItem(prefix+key,JSON.stringify(photo))}catch{}changed()}
  }).catch(()=>{}).finally(()=>{working.delete(key);run()})
 }
}
function ensure(rows){
 for(const p of rows||[]){
  if(!p||p.categories?.has?.('groups')||p.categories?.has?.('vtuber')||p.categories?.has?.('jav')||p.categories?.has?.('adult')||p.categories?.has?.('onlyfans')||p.categories?.has?.('gravure'))continue;
  if(p.teenSafe||p.photoFile||get(p.name)||window.YumePhotoStore?.get('japan',p.name)?.verified)continue;
  const key=norm(p.name);if(!key||attempted.has(key))continue;
  attempted.add(key);queue.push(p)
 }
 run()
}
window.YumeIdolCommonsPortraits=Object.freeze({get,ensure,version:'2026-11-09',source:'Exact Wikidata female entity + Wikimedia Commons free-licensed photograph'});
})();