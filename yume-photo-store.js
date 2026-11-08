/* Free Wikimedia portraits verified against Wikidata: one shared cache for all Yume catalogs. */
(()=>{'use strict';
 const key=name=>String(name||'').normalize('NFKC').normalize('NFKD').toLowerCase()
  .replace(/[\u0300-\u036f]/g,'').replace(/[髙﨑]/g,x=>({'髙':'高','﨑':'崎'}[x]||x))
  .replace(/[\s・･\-_’']/g,'').trim();
 let data={sport:{},asia:{},japan:{}};
 const fallback={
  sport:{
   '池江璃花子':{name:'池江 璃花子',qid:'Q20973721',file:'Rikako Ikee 20230408.jpg',
     photo:'https://commons.wikimedia.org/wiki/Special:FilePath/Rikako_Ikee_20230408.jpg?width=480',
     source:'https://commons.wikimedia.org/wiki/File:Rikako_Ikee_20230408.jpg',verified:true},
   '高木美帆':{name:'髙木 美帆',qid:'Q444421',file:'Miho Takagi (JAP) 2013.jpg',
     photo:'https://commons.wikimedia.org/wiki/Special:FilePath/Miho_Takagi_(JAP)_2013.jpg?width=480',
     source:'https://commons.wikimedia.org/wiki/File:Miho_Takagi_(JAP)_2013.jpg',verified:true}
  }
 };
 const read=(kind,name,country)=>{
  const k=kind==='asia'?country+':'+key(name):key(name);
  return data[kind]?.[k]||fallback[kind]?.[k]||null
 };
 const load=fetch('data/yume-photo-index.json?v=20261108-portrait1',{cache:'no-store'})
 .then(r=>{if(!r.ok)throw Error('Photo index not generated yet');return r.json()})
 .then(json=>{
  if(!json||json.version<1||!json.sport||!json.asia||!json.japan)throw Error('Invalid photo index');
  data=json;return data
 }).catch(()=>data);
 window.YumePhotoStore=Object.freeze({ready:load,key,get:read,count:(kind)=>Object.keys(data[kind]||{}).length,
  provenance:'Wikimedia Commons / free Wikipedia article thumbnails'});
})();