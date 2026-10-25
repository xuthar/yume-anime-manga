/* Visitor choices stay local. Only a separately connected owner can sync purchases. */
(() => {
 'use strict';
 const keys={anime:'yume-season-choices',snapshots:'yume-watch-snapshots',books:'yume-shopping-list',owned:'yume-owned-books',progress:'yume-anime-progress'};
 const dict=()=>Object.create(null);let memory=dict();
 function read(key){if(memory[key])return memory[key];try{const v=JSON.parse(localStorage.getItem(key)||'{}');return memory[key]=v&&typeof v==='object'&&!Array.isArray(v)?Object.assign(dict(),v):dict()}catch{return memory[key]=dict()}}
 function write(key,value){memory[key]=value;try{localStorage.setItem(key,JSON.stringify(value));return true}catch{return false}}
 function choices(){return Object.assign(dict(),Object.fromEntries(Object.entries(read(keys.anime)).filter(([id,v])=>/^anime-\d+$/.test(id)&&['watch','skip'].includes(v))))}
 function remember(item){const s=read(keys.snapshots);s[item.id]={...(s[item.id]||{}),...item,image:item.adult?'':item.image||s[item.id]?.image||''};return write(keys.snapshots,s)}
 function animeProgress(){const result=dict();for(const [id,x] of Object.entries(read(keys.progress))){if(!/^anime-\d+$/.test(id)||!x||!['watch','onair','completed'].includes(x.status))continue;result[id]={...x,progress:Number.isFinite(x.progress)?Math.max(0,Math.floor(x.progress)):0,rating:Number.isInteger(x.rating)&&x.rating>=1&&x.rating<=10?x.rating:null}}return result}
 function setAnimeProgress(item,patch){if(!/^anime-\d+$/.test(item?.id||''))return false;const all=animeProgress(),previous=all[item.id]||{status:'watch',progress:0,rating:null};let next={...previous,...patch};const total=Number(item.episodes||item.total)||0;
  next.progress=Math.max(0,Math.floor(Number(next.progress)||0));if(total>0)next.progress=Math.min(next.progress,total);
  next.rating=next.rating===null||next.rating===''?null:Math.min(10,Math.max(1,Math.round(Number(next.rating)||1)));
  if(!['watch','onair','completed'].includes(next.status))return false;
  if(next.status==='onair')for(const [id,x] of Object.entries(all))if(id!==item.id&&x.status==='onair')all[id]={...x,status:'watch'};
  if(next.status==='completed'){if(total>0)next.progress=total;next.completedAt=previous.completedAt||new Date().toISOString()}else delete next.completedAt;
  next.updatedAt=new Date().toISOString();all[item.id]=next;const saved=remember(item);return write(keys.progress,all)&&saved;
 }
 function setAnime(item,value){const c=choices();if(value)c[item.id]=value;else delete c[item.id];let ok=true;
  if(value==='watch'){ok=remember(item);if(animeProgress()[item.id]?.status==='completed')ok=setAnimeProgress(item,{status:'watch'})&&ok}
  if(value!=='watch'&&animeProgress()[item.id]?.status==='onair')ok=setAnimeProgress({...read(keys.snapshots)[item.id],...item},{status:'watch'})&&ok;
  return write(keys.anime,c)&&ok
 }
 function forgetAnime(id){const all=animeProgress(),c=choices(),s=read(keys.snapshots);delete all[id];delete c[id];delete s[id];const a=write(keys.progress,all),b=write(keys.anime,c),d=write(keys.snapshots,s);return a&&b&&d}
 window.addEventListener('pageshow',e=>{if(e.persisted)memory=dict()});
 const bookKey=x=>{const value=String(x.isbn||'').replace(/[^\dX]/gi,'');return JSON.stringify([x.language||'',value?'isbn:'+value:'url:'+String(x.url||'')])};
 function books(){const result=dict();for(const x of Object.values(read(keys.books))){if(!x||typeof x!=='object'||typeof x.title!=='string'||typeof x.url!=='string')continue;const key=bookKey(x);if(!result[key])result[key]=x;else if(x.purchased)result[key].purchased=true}return result}
 function owned(){const all=dict();for(const [key,x] of Object.entries(read(keys.owned))){const next=key.endsWith('\"isbn:\"]')&&x?.url?bookKey(x):key;all[next]=next===key?x:{...x,key:next}}return all}
 function setOwned(key,x){const all=owned();if(x)all[key]=x;else delete all[key];return write(keys.owned,all)}
 function addBook(x){const b=books(),key=bookKey(x);if(!b[key])b[key]={...x,title:x.title,series:x.series||'',publisher:x.publisher||'',language:x.language||'',kind:x.kind||'manga',edition:x.edition||'',isbn:x.isbn||'',url:x.url,date:x.date,purchased:false,addedAt:new Date().toISOString()};return write(keys.books,b)}
 function removeBook(key){const b=books();delete b[key];return write(keys.books,b)}
 function purchased(key,value,details={}){const b=books();if(!b[key])return false;let ok=true;if(value){const record=window.YumeCollection?window.YumeCollection.identify({...b[key],...details}):{...b[key],...details};record.key=key;record.purchasedAt=owned()[key]?.purchasedAt||new Date().toISOString();ok=setOwned(key,record)}else ok=setOwned(key,null);b[key].purchased=!!value;return write(keys.books,b)&&ok}
 window.addEventListener('storage',e=>{if(!e.key)memory=dict();else delete memory[e.key]});
 window.YumeLists={keys,choices,setAnime,remember,animeProgress,setAnimeProgress,forgetAnime,snapshots:()=>read(keys.snapshots),bookKey,books,addBook,removeBook,purchased,owned,setOwned};
})();
