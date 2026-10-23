/* ISBN supplements never change shopping-list identities or ownership. */
(() => {
 const norm=s=>String(s||'').normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
 const key=v=>[v.workId,norm(v.edition),norm(v.number),norm(v.publisher)].join('|');
 function volumeIndex(rows){const map=new Map();for(const r of rows){const k=key(r),old=map.get(k);if(old&&old.isbn!==r.isbn)map.set(k,{...r,isbn:'',isbnStatus:'Edizione / ristampa ambigua'});else if(!old)map.set(k,r)}return map}
 let promise,loadedAt=0;
 async function load(){if(promise&&Date.now()-loadedAt<15*60000)return promise;loadedAt=Date.now();return promise=Promise.all(['manga-isbn','book-isbn'].map(n=>fetch('data/'+n+'.json',{cache:'no-cache'}).then(r=>r.ok?r.json():{records:[]}).catch(()=>({records:[]})))).then(([m,b])=>({volumes:volumeIndex(m.records),books:new Map(b.records.map(r=>[r.url,r]))}))}
 function volume(v,workId,data){const r=data.volumes.get(key({...v,workId}));return r?{...v,isbn:r.isbn||v.isbn||'',isbnStatus:r.isbnStatus,isbnSource:r.isbnSource||'',isbnCheckedAt:r.isbnCheckedAt}:v}
 function library(items,data){return items.map(x=>x.type==='manga'?{...x,volumes:(x.volumes||[]).map(v=>volume(v,x.id,data))}:x)}
 function book(b,data){const r=data.books.get(b.url),value=String(b.isbn||'').replace(/[^\dX]/gi,'');const base=value?b:{...b,isbn:''};return r?{...base,isbnVerified:r.isbn||'',isbnStatus:r.isbnStatus,isbnSource:r.isbnSource||''}:base}
 window.YumeISBN={load,library,book};
})();
