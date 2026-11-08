/* Free Wikimedia portraits verified against Wikidata: one shared cache for all Yume catalogs. */
(()=>{'use strict';
 const key=name=>String(name||'').normalize('NFKC').normalize('NFKD').toLowerCase()
  .replace(/[\u0300-\u036f]/g,'').replace(/[髙﨑]/g,x=>({'髙':'高','﨑':'崎'}[x]||x))
  .replace(/[\s・･\-_’']/g,'').trim();
 let data={sport:{},asia:{},japan:{},global:{}};
 const fallback={
  global:{},
  sport:{
   '池江璃花子':{name:'池江 璃花子',qid:'Q20973721',file:'Rikako Ikee 20230408.jpg',
     photo:'https://commons.wikimedia.org/wiki/Special:FilePath/Rikako_Ikee_20230408.jpg?width=480',
     source:'https://commons.wikimedia.org/wiki/File:Rikako_Ikee_20230408.jpg',verified:true},
   '高木美帆':{name:'髙木 美帆',qid:'Q444421',file:'Miho Takagi (JAP) 2013.jpg',
     photo:'https://commons.wikimedia.org/wiki/Special:FilePath/Miho_Takagi_(JAP)_2013.jpg?width=480',
     source:'https://commons.wikimedia.org/wiki/File:Miho_Takagi_(JAP)_2013.jpg',verified:true}
  }
 };
 const additionalSportPortraits=[
  ['阿部詩','Q55281936','Uta Abe (JAP) 2024.jpg'],
  ['早田ひな',null,'ITTF World Tour 2017 German Open Hina Hayata 01.jpg'],
  ['山口茜','Q415740','Akane Yamaguchi (JAP).jpg'],
  ['坂本花織',null,'Kaori Sakamoto during a practice session at the 2026 Winter Olympics (cropped).jpg'],
  ['北口榛花','Q22128988','Haruka Kitaguchi Budapest 2023(2).jpg'],
  ['髙梨沙羅','Q467082','Sara Oslo 2019 by Andreas-Jobst (cropped).jpg'],
  ['長谷川唯','Q18121626','20250905-Yui Hasegawa.jpg'],
  ['平野美宇','Q11483715','ITTF World Tour 2017 German Open Hirano Miu 02.jpg'],
  ['熊谷紗希',null,'Kumagai 2024.png']
 ];
 for(const [name,qid,file] of additionalSportPortraits){
  const uri=encodeURIComponent(file.replace(/ /g,'_'));
  fallback.sport[key(name)]={name,qid,file,photo:'https://commons.wikimedia.org/wiki/Special:FilePath/'+uri+'?width=480',
   source:'https://commons.wikimedia.org/wiki/File:'+uri,verified:true,alternates:[]};
 }
 const asianPortraits=[
  ['kr','Nayeon','Q22804243','Nayeon.jpg'],
  ['kr','Sana',null,'Sana Minatozaki.jpg'],
  ['kr','Jihyo',null,'20260624 Jihyo 04.jpg'],
  ['kr','Jennie',null,'20260526 Jennie Kim 03.jpg'],
  ['kr','Jisoo',null,'Kim Jisoo 2025 01.jpg'],
  ['kr','Wonyoung',null,'033126 Jang Won-young for Rolarola photo call (1).jpg']
 ];
 fallback.asia={};
 for(const [country,name,qid,file] of asianPortraits){
  const uri=encodeURIComponent(file.replace(/ /g,'_'));
  fallback.asia[country+':'+key(name)]={name,qid,file,photo:'https://commons.wikimedia.org/wiki/Special:FilePath/'+uri+'?width=480',
   source:'https://commons.wikimedia.org/wiki/File:'+uri,verified:true,alternates:[]};
 }
 const read=(kind,name,country)=>{
  const k=kind==='asia'?country+':'+key(name):key(name);
  return data[kind]?.[k]||fallback[kind]?.[k]||null
 };
 const load=fetch('data/yume-photo-index.json?v=20261108-photos36',{cache:'no-store'})
 .then(r=>{if(!r.ok)throw Error('Photo index not generated yet');return r.json()})
 .then(json=>{
  if(!json||json.version<1||!json.sport||!json.asia||!json.japan)throw Error('Invalid photo index');
  data=json;return data
 }).catch(()=>data);
 window.YumePhotoStore=Object.freeze({ready:load,key,get:read,count:(kind)=>Object.keys(data[kind]||{}).length,
  provenance:'Wikimedia Commons / free Wikipedia article thumbnails'});
})();