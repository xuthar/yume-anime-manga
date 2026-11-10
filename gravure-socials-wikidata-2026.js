/* Wikimedia/Wikidata editorial social discovery for the Babepedia 100.
 * Retrieved claims are attributed to Wikidata, not asserted as fresh official accounts.
 * Strict exact-name, adult DOB and unique-entity matching. No scraped images.
 */
(()=>{'use strict';
const data=window.YumeIdolsDiscovery;if(!data?.people)return;
const norm=s=>String(s||'').normalize('NFKC').normalize('NFKD').toLowerCase().replace(/[\u0300-\u036f\s・･._'’()\-]/g,'');
const cache=new Map(),attempted=new Set(),queue=[],busy=new Set();let emitScheduled=false;
const storageKey=name=>'yume:gravure:wikidata-socials:v1:'+norm(name);
const send=()=>{if(emitScheduled)return;emitScheduled=true;setTimeout(()=>{emitScheduled=false;window.dispatchEvent(new CustomEvent('yume-gravure-social-update'))},250)};
function get(name){const k=norm(name);if(cache.has(k))return cache.get(k);try{const item=JSON.parse(localStorage.getItem(storageKey(name))||'null');if(item?.qid&&Array.isArray(item.socials)){cache.set(k,item);return item}}catch{}return null}
async function api(params){const q=new URLSearchParams({...params,format:'json',origin:'*'});const r=await fetch('https://www.wikidata.org/w/api.php?'+q,{mode:'cors',credentials:'omit'});if(!r.ok)throw Error(String(r.status));return r.json()}
const claims=(e,p)=>((e.claims||{})[p]||[]).map(x=>x.mainsnak?.datavalue?.value).filter(Boolean);
const has=(e,p,q)=>claims(e,p).some(x=>x.id===q);
const adult=e=>{const time=claims(e,'P569')[0]?.time;const m=String(time||'').match(/^\+?(\d{4})-(\d{2})-(\d{2})/);if(!m)return false;const [y,mo,d]=m.slice(1).map(Number);if(mo<1||d<1)return y<=2007;return y<2008||(y===2008&&(mo<11||(mo===11&&d<=10)))};
const matches=(e,p)=>{const labels=[e.labels?.en?.value,e.labels?.ja?.value,...(e.aliases?.en||[]).map(x=>x.value),...(e.aliases?.ja||[]).map(x=>x.value)].filter(Boolean);const keys=[norm(p.name),norm(p.alternate||'')];const split=p.name.split(' ');if(split.length===2)keys.push(norm(split.reverse().join(' ')));return labels.some(n=>keys.includes(norm(n)))};
async function discover(p){const ids=new Set();for(const [query,lang] of [[p.name,'en'],[p.alternate,'ja']].filter(x=>x[0])){try{const result=await api({action:'wbsearchentities',type:'item',search:query,language:lang,limit:'5'});for(const hit of result.search||[])if(/^Q\d+$/.test(hit.id||''))ids.add(hit.id)}catch{}}
 if(!ids.size)return null;const result=await api({action:'wbgetentities',ids:[...ids].slice(0,10).join('|'),props:'labels|aliases|claims',languages:'en|ja'});
 const good=Object.values(result.entities||{}).filter(e=>has(e,'P21','Q6581072')&&(!(e.claims?.P27||[]).length||has(e,'P27','Q17'))&&adult(e)&&matches(e,p));if(good.length!==1)return null;
 const e=good[0],socials=[];const entries=[['P2002','X',x=>'https://x.com/'+encodeURIComponent(x)],['P2003','Instagram',x=>'https://www.instagram.com/'+encodeURIComponent(x)+'/'],['P7085','TikTok',x=>'https://www.tiktok.com/@'+encodeURIComponent(x)],['P2397','YouTube',x=>'https://www.youtube.com/channel/'+encodeURIComponent(x)]];
 for(const [property,label,url] of entries){const values=claims(e,property).filter(x=>typeof x==='string'&&/^[a-zA-Z0-9._-]{2,80}$/.test(x));if(values.length===1)socials.push([label,url(values[0])])}
 if(!socials.length)return null;return {qid:e.id,socials,source:'https://www.wikidata.org/wiki/'+e.id,checked:'2026-11',status:'Wikidata · controllo attualità consigliato'};
}
function run(){while(busy.size<2&&queue.length){const p=queue.shift(),k=norm(p.name);if(busy.has(k))continue;busy.add(k);discover(p).then(info=>{if(!info)return;cache.set(k,info);try{localStorage.setItem(storageKey(p.name),JSON.stringify(info))}catch{}send()}).catch(()=>{}).finally(()=>{busy.delete(k);run()})}}
function ensure(items){for(const p of items||[]){if(!p.babepediaGravureRank||get(p.name))continue;const k=norm(p.name);if(attempted.has(k))continue;attempted.add(k);queue.push(p)}run()}
window.YumeGravureSocials=Object.freeze({get,ensure,source:'Wikidata · identity checked and sourced',version:'2026-11-10'});
})();