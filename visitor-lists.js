/* Visitor choices stay on this browser; never write to the owner's catalogue. */
(() => {
 'use strict';
 const keys={anime:'yume-season-choices',snapshots:'yume-watch-snapshots',books:'yume-shopping-list'};
 const dict=()=>Object.create(null);let memory=dict();
 function read(key){if(memory[key])return memory[key];try{const v=JSON.parse(localStorage.getItem(key)||'{}');return memory[key]=v&&typeof v==='object'&&!Array.isArray(v)?Object.assign(dict(),v):dict()}catch{return memory[key]=dict()}}
 function write(key,value){memory[key]=value;try{localStorage.setItem(key,JSON.stringify(value));return true}catch{return false}}
 function choices(){return Object.assign(dict(),Object.fromEntries(Object.entries(read(keys.anime)).filter(([id,v])=>/^anime-\d+$/.test(id)&&['watch','skip'].includes(v))))}
 function setAnime(item,value){const c=choices();if(value)c[item.id]=value;else delete c[item.id];let ok=true;if(value==='watch'){const s=read(keys.snapshots);s[item.id]={id:item.id,title:item.title,image:item.adult?'':item.image,format:item.format,adult:!!item.adult};ok=write(keys.snapshots,s)}return write(keys.anime,c)&&ok}
 const bookKey=x=>JSON.stringify([x.language||'',x.isbn?'isbn:'+String(x.isbn).replace(/[^\dX]/gi,''):'url:'+String(x.url||'').split('#')[0]]);
 function books(){return Object.assign(dict(),Object.fromEntries(Object.entries(read(keys.books)).filter(([,x])=>x&&typeof x==='object'&&typeof x.title==='string'&&typeof x.url==='string')))}
 function addBook(x){const b=books(),key=bookKey(x);if(!b[key])b[key]={title:x.title,series:x.series||'',publisher:x.publisher||'',language:x.language||'',kind:x.kind||'manga',edition:x.edition||'',isbn:x.isbn||'',url:x.url,date:x.date,purchased:false,addedAt:new Date().toISOString()};return write(keys.books,b)}
 function removeBook(key){const b=books();delete b[key];return write(keys.books,b)}
 function purchased(key,value){const b=books();if(b[key])b[key].purchased=!!value;return write(keys.books,b)}
 window.addEventListener('storage',e=>{if(!e.key)memory=dict();else delete memory[e.key]});
 window.YumeLists={keys,choices,setAnime,snapshots:()=>read(keys.snapshots),bookKey,books,addBook,removeBook,purchased};
})();
