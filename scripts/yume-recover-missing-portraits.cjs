/* Source-specific Wikimedia recovery for Yume's browser-verified missing portraits.
 * Safe: non-explicit photos only, exact unique Wikidata female identity,
 * verified Commons attribution/license. No face matching or guessed images.
 */
'use strict';
const fs=require('node:fs/promises'),path=require('node:path');
const INPUT=process.env.AUDIT_REPORT||'artifacts/yume-idol-photo-audit/report.json';
const OUTPUT='data/yume-recovered-portraits.json';
const MAX=Math.max(1,Math.min(500,Number(process.env.RECOVER_LIMIT||220)));
const CATEGORIES=['music','fashion','cosplay','creators','gravure'];
const delay=ms=>new Promise(r=>setTimeout(r,ms));
const norm=s=>String(s||'').normalize('NFKC').normalize('NFKD').toLowerCase().replace(/[\u0300-\u036f\s・･._'’()\-]/g,'');
const unsafe=/(nude|naked|explicit|uncensored|genital|intercourse|porn|sex.?scene|masturb|乳首|全裸|ヌード|ポルノ|logo|banner|group photo|group portrait)/i;
const licenseOK=s=>/^(CC BY(?:[- ]SA)?(?:[- ]\d+(?:\.\d+)?)?|CC0(?:\s\d+(?:\.\d+)?)?|Public domain|PD(?:[- ].*)?|FAL)$/i.test(s);
const headers={'User-Agent':'YumeIdolPortraitRecovery/2026 (noncommercial catalog; github.com/xuthar/yume-anime-manga)','Accept':'application/json'};
let requests=0,errors=0;
async function request(host,params){
 const url='https://'+host+'/w/api.php?'+new URLSearchParams({...params,format:'json',origin:'*'});
 for(let attempt=0;attempt<3;attempt++){
  const abort=new AbortController(),tm=setTimeout(()=>abort.abort(),14000);
  try{
   const res=await fetch(url,{headers,signal:abort.signal});
   if(!res.ok)throw Error('HTTP '+res.status);
   requests++;return await res.json();
  }catch(e){if(attempt===2){errors++;return null}await delay(500*(attempt+1)**2)}
  finally{clearTimeout(tm)}
 }
 return null;
}
function claim(e,p){return(e.claims?.[p]||[]).filter(x=>x.rank!=='deprecated').map(x=>x.mainsnak?.datavalue?.value).filter(Boolean)}
function exactEntity(e,name){
 const list=[e.labels?.en?.value,e.labels?.ja?.value,...(e.aliases?.en||[]).map(a=>a.value),...(e.aliases?.ja||[]).map(a=>a.value)].filter(Boolean);
 const forms=[norm(name)];
 const parts=name.split(/\s+/);if(parts.length===2)forms.push(norm(parts.reverse().join(' ')));
 return list.some(x=>forms.includes(norm(x)));
}
function female(e){return claim(e,'P21').some(x=>x.id==='Q6581072')}
async function portraitFor(person){
 const name=person.name;
 const queries=[{search:name,language:/[一-龯ぁ-んァ-ヶ]/.test(name)?'ja':'en'}];
 const found=new Set();
 for(const q of queries){
  const j=await request('www.wikidata.org',{action:'wbsearchentities',type:'item',search:q.search,language:q.language,limit:'8'});
  for(const item of j?.search||[])if(/^Q\d+$/.test(item.id||''))found.add(item.id);
 }
 if(!found.size)return null;
 const raw=await request('www.wikidata.org',{action:'wbgetentities',ids:[...found].slice(0,8).join('|'),props:'labels|aliases|claims',languages:'en|ja'});
 const matches=Object.values(raw?.entities||{}).filter(e=>female(e)&&exactEntity(e,name)&&claim(e,'P18').length);
 if(matches.length!==1)return null;
 const e=matches[0];
 for(const file of claim(e,'P18').filter(f=>typeof f==='string').slice(0,2)){
  if(unsafe.test(file)||!/\.(jpe?g|png|webp)$/i.test(file))continue;
  const j=await request('commons.wikimedia.org',{action:'query',titles:'File:'+file,prop:'imageinfo',iiprop:'url|size|extmetadata',iiurlwidth:'640',formatversion:'2'});
  const pg=j?.query?.pages?.[0],info=pg?.imageinfo?.[0];if(!info||pg.missing||info.width<260||info.height<260)continue;
  const license=(info.extmetadata?.LicenseShortName?.value||'').replace(/<[^>]*>/g,'').trim();
  if(!licenseOK(license))continue;
  const author=(info.extmetadata?.Artist?.value||'').replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim().slice(0,140);
  const photo=info.thumburl||info.url;const link='https://commons.wikimedia.org/wiki/File:'+encodeURIComponent(file.replaceAll(' ','_'));
  if(!photo?.startsWith('https://'))continue;
  return {name,category:person.category,qid:e.id,file,photo,source:link,license,author,verified:true,verification:'Wikidata exact unique female identity + Commons license and imageinfo',checked:new Date().toISOString()};
 }
 return null;
}
(async()=>{
 let report;try{report=JSON.parse(await fs.readFile(INPUT,'utf8'))}catch(e){console.error('Audit report missing, no index update:',e.message);return}
 let current={};try{current=JSON.parse(await fs.readFile(OUTPUT,'utf8'))}catch{}
 const results={...(current.profiles||{})};
 const entries=[],seen=new Set();
 for(const cat of CATEGORIES){
  const group=(report.categories||[]).find(c=>c.category===cat);if(!group)continue;
  for(const failure of group.failures||[]){
   if(!failure.name||failure.loaded||failure.hasImage)continue;
   const key=norm(failure.name);if(!key||seen.has(key)||results[key])continue;
   seen.add(key);entries.push({name:failure.name,category:cat});
  }
 }
 const target=entries.slice(0,MAX);let matched=0;
 console.log('Recovering',target.length,'of',entries.length,'unpictured artist candidates.');
 for(let i=0;i<target.length;i++){
  const p=target[i];const data=await portraitFor(p);
  if(data){results[norm(p.name)]=data;matched++;console.log('FOUND',p.category,p.name,data.file)}
  if((i+1)%20===0)console.log('PROGRESS',i+1,'/',target.length,'found',matched,'errors',errors);
  await delay(180);
 }
 const result={updated:new Date().toISOString(),source:'Exact Wikidata person + Wikimedia Commons licensed image',nonExplicit:true,profiles:results,summary:{considered:target.length,newLicensedPortraits:matched,storedPortraits:Object.keys(results).length,failedRequests:errors,successfulRequests:requests,unverifiedNamesNotImported:target.length-matched}};
 await fs.mkdir(path.dirname(OUTPUT),{recursive:true});
 await fs.writeFile(OUTPUT,JSON.stringify(result,null,2)+'\n');
 console.log('RESULT',JSON.stringify(result.summary));
})().catch(e=>{console.error(e);process.exitCode=1});
