/* JAV 18+ · social accounts discoverable through Wikidata only after adult gate.
 * Exact female Japanese identity + validated adulthood + single Wikidata entity.
 * NOT an assertion of currently verified/owned accounts: show Wikidata provenance.
 */
(()=>{'use strict';
const norm=s=>String(s||'').normalize('NFKC').normalize('NFKD').toLowerCase().replace(/[\u0300-\u036f\s・･._'’()\-]/g,'');
const getConsent=()=>{try{return sessionStorage.getItem('yume-idols-adult-18')==='yes'}catch{return false}};
const cache=new Map(),pending=new Set(),queue=[],active=new Set();let timer=null;
const storage=n=>'yume:jav:social-wikidata:v1:'+norm(n);
const claim=(e,p)=>(e?.claims?.[p]||[]).map(x=>x.mainsnak?.datavalue?.value).filter(Boolean);
const has=(e,p,q)=>claim(e,p).some(x=>x?.id===q);
const adult=e=>{const d=claim(e,'P569')[0]?.time,m=String(d||'').match(/^\+?(\d{4})-(\d{2})-(\d{2})/);if(!m)return false;const [y,mo,da]=m.slice(1).map(Number);return y<2008||(y===2008&&(mo<11||(mo===11&&da<=11)))};
const names=e=>[e.labels?.en?.value,e.labels?.ja?.value,...(e.aliases?.en||[]).map(x=>x.value),...(e.aliases?.ja||[]).map(x=>x.value)].filter(Boolean).map(norm);
const exact=(e,p)=>{const keys=[p.name,p.alternate,...(p.otherStageNames||[])].filter(Boolean).map(norm);return names(e).some(x=>keys.includes(x))};
const api=async params=>{const qs=new URLSearchParams({...params,format:'json',origin:'*'});const r=await fetch('https://www.wikidata.org/w/api.php?'+qs,{mode:'cors',credentials:'omit'});if(!r.ok)throw Error('Wikidata HTTP '+r.status);return r.json()};
const get=n=>{if(!getConsent())return null;const k=norm(n);if(cache.has(k))return cache.get(k);try{const rec=JSON.parse(localStorage.getItem(storage(n))||'null');if(rec?.checked&&Date.now()-rec.checked<1000*60*60*24*30&&Array.isArray(rec.socials)){cache.set(k,rec);return rec}}catch{}return null};
const notify=()=>{if(timer)return;timer=setTimeout(()=>{timer=null;window.dispatchEvent(new Event('yume-jav-social-update'))},180)};
async function find(p){
 const ids=new Set();for(const [n,lang] of [[p.name,'en'],[p.alternate,'ja']].filter(x=>x[0])){
 try{const r=await api({action:'wbsearchentities',search:n,language:lang,type:'item',limit:'5'});for(const x of r.search||[])if(/^Q\d+$/.test(x.id||''))ids.add(x.id)}catch{}
 }
 if(!ids.size)return null;
 const j=await api({action:'wbgetentities',ids:[...ids].slice(0,10).join('|'),props:'labels|aliases|claims',languages:'en|ja'});
 const found=Object.values(j.entities||{}).filter(e=>has(e,'P21','Q6581072')&&(!(e.claims?.P27||[]).length||has(e,'P27','Q17'))&&adult(e)&&exact(e,p));
 if(found.length!==1)return null;
 const e=found[0],props=[['P2002','X',v=>'https://x.com/'+encodeURIComponent(v)],['P2003','Instagram',v=>'https://www.instagram.com/'+encodeURIComponent(v)+'/'],['P7085','TikTok',v=>'https://www.tiktok.com/@'+encodeURIComponent(v)],['P2397','YouTube',v=>'https://www.youtube.com/channel/'+encodeURIComponent(v)]],socials=[];
 for(const [property,label,link] of props){const values=claim(e,property).filter(v=>typeof v==='string'&&/^[\w.\-]{2,80}$/.test(v));if(values.length===1)socials.push([label,link(values[0])])}
 return socials.length?{qid:e.id,source:'https://www.wikidata.org/wiki/'+e.id,socials,checked:Date.now(),quality:'Exact identity + adult DOB; account recency not independently guaranteed'}:null
}
function drain(){if(!getConsent())return;while(active.size<2&&queue.length){const p=queue.shift(),k=norm(p.name);if(active.has(k))continue;active.add(k);
 find(p).then(v=>{if(!v)return;cache.set(k,v);try{localStorage.setItem(storage(p.name),JSON.stringify(v))}catch{}notify()}).catch(()=>{}).finally(()=>{active.delete(k);drain()})}}
function ensure(people){if(!getConsent())return;for(const p of people||[]){if(!p?.categories?.has('jav')||get(p.name)||pending.has(norm(p.name)))continue;pending.add(norm(p.name));queue.push(p)}drain()}
window.YumeJAVSocials=Object.freeze({ensure,get,source:'Wikidata, exact adult identity required',version:'2026-11-11'});
})();