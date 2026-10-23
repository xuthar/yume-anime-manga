/* Public catalogue reads are anonymous; writes need an owner capability kept on this browser. */
(() => {
 'use strict';
 const PROFILE='yume-owner-connection',CACHE='yume-owner-public-purchases';let connection=null,configPromise=null;
 const endpoint=u=>typeof u==='string'&&/^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec$/.test(u);
 try{const value=JSON.parse(localStorage.getItem(PROFILE)||'null');if(value&&endpoint(value.endpoint)&&/^[a-f0-9-]{60,100}$/i.test(value.token))connection=value}catch{}
 if(location.hash.startsWith('#yume-owner=')){
  try{const data=JSON.parse(atob(location.hash.slice(12)));if(endpoint(data.endpoint)&&/^[a-f0-9-]{60,100}$/i.test(data.token)){localStorage.setItem(PROFILE,JSON.stringify(data));connection=data}}catch{}finally{history.replaceState(null,'',location.pathname+location.search)}
 }
 function jsonp(url){return new Promise((resolve,reject)=>{const name='yumePurchase_'+Date.now().toString(36)+Math.random().toString(36).slice(2),script=document.createElement('script');let timer;const clean=()=>{clearTimeout(timer);delete window[name];script.remove()};window[name]=data=>{clean();resolve(data)};script.referrerPolicy='no-referrer';script.src=url+(url.includes('?')?'&':'?')+'callback='+name;script.onerror=()=>{clean();reject(Error('Collegamento al catalogo non disponibile.'))};timer=setTimeout(()=>{clean();reject(Error('Il collegamento sta impiegando più tempo del previsto.'))},20000);document.head.append(script)})}
 async function config(){return configPromise??=(fetch('data/owner-sync-config.json',{cache:'no-cache'}).then(r=>r.ok?r.json():{}).catch(()=>({})))}
 function cached(){try{return JSON.parse(localStorage.getItem(CACHE)||'[]')}catch{return []}}
 async function loadPublic(){const c=await config(),url=connection?.endpoint||c.endpoint;if(!endpoint(url))return cached();try{const d=await jsonp(url+'?action=catalog');if(d.status==='unavailable'||!Array.isArray(d.records))throw Error();try{localStorage.setItem(CACHE,JSON.stringify(d.records))}catch{}return d.records}catch{return cached()}}
 async function submit(book){if(!connection)throw Error('Collegamento proprietario non attivo.');const requestId=crypto.randomUUID();const body=JSON.stringify({token:connection.token,requestId,book});await fetch(connection.endpoint,{method:'POST',mode:'no-cors',credentials:'omit',headers:{'Content-Type':'text/plain'},body});
  for(let n=0;n<10;n++){const result=await jsonp(connection.endpoint+'?action=status&id='+encodeURIComponent(requestId));if(result.status==='ok'){await loadPublic();window.dispatchEvent(new Event('yume-owner-updated'));return result.record}if(result.status==='error')throw Error(result.message||'Acquisto non sincronizzato.');await new Promise(resolve=>setTimeout(resolve,2000))}throw Error('Acquisto conservato sul dispositivo. Verifica la connessione e riprova: non verrà duplicato.');
 }
 function disconnect(){localStorage.removeItem(PROFILE);connection=null;location.reload()}
 window.YumeOwner={connected:()=>!!connection,loadPublic,cached,submit,disconnect};
})();
