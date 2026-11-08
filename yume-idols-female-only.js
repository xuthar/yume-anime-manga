/* Yume Idols · female-only public catalog policy, 2026-11-08.
 * Names are exact-match removals of identified male performers/characters or
 * male-containing creator collectives. Do not guess gender from a stage name.
 * Fudanjuku and other women portraying male characters are not male idols.
 * Apply after source data and before renderers, counters and Young Stars merging.
 */
(()=>{'use strict';
 const norm=x=>String(x||'').normalize('NFKC').normalize('NFKD')
  .toLocaleLowerCase('en').replace(/[\u0300-\u036f]/g,'')
  .replace(/[\s・･\-_’'’]/g,'').trim();
 const excludedJapan=[
  // Male Japanese social creators, or public creator collectives including men.
  'Amenboplus','Paparapys','Sankyu Dokkoisho','Kaichosu Couple',
  'Kurukuru 3kyodai','Natsume Sanchi','Tomohiro Kaneki',
  'KAIMA','Kuga Oshima','Yuma Konno','Atsuhiro Hayashi',
  'Noa Fujii','Kiryu Tanaka','Toi Kimura','Shinya Ogawa',
  'BOBBY HOLMES','SotoTaka','HIKAKIN','Hajime Syacho',
  'Hikaru (YouTuber)','Kimagure Cook','Masuo',
  'Kazu (YouTuber)','SUSURU','Yuuki',
  // Publicly identified male-presenting NIJISANJI characters.
  'Tsukahara Daichi','Kuri Eita','Onotora'
 ];
 const excludedAsia=[
  // India: male creators, actors, models and child singers.
  ['in','Riyaz Aly'],['in','Faisal Shaikh'],['in','Awez Darbar'],
  ['in','Siddharth Nigam'],['in','Ishant Mishra'],['in','Avirbhav Sajimon Kappithan'],
  // Philippines: public male creators in the professional social directories.
  ['ph','Yanyan De Jesus'],['ph','Grae Cabase'],
  ['ph','Spencer Serafica'],['ph','Whamos Cruz'],['ph','Evan Tan']
 ];
 const excludedYoung=['Ryan Kaji','今井暖大'];
 const maleName=new Set(excludedJapan.map(norm));
 const maleCountryName=new Set(excludedAsia.map(([country,name])=>country+':'+norm(name)));
 const youngName=new Set(excludedYoung.map(norm));
 const before={};
 if(window.YumeIdolsDiscovery){
  const data=window.YumeIdolsDiscovery;before.japan=data.people.length;
  const people=data.people.filter(p=>!maleName.has(norm(p.name)));
  window.YumeIdolsDiscovery=Object.freeze({...data,people,
   stats:{...data.stats,entries:people.length},filterPolicy:'female-only verified editorial catalog'});
 }
 if(window.YumeAsiaIdols){
  const data=window.YumeAsiaIdols;before.asia=data.people.length;
  const people=data.people.filter(p=>!maleCountryName.has(p.country+':'+norm(p.name)));
  const countryCounts=Object.fromEntries(data.countries.map(c=>[c.id,people.filter(p=>p.country===c.id).length]));
  const groupCount=new Set(people.flatMap(p=>(p.groups||[]).map(g=>p.country+':'+g))).size;
  window.YumeAsiaIdols=Object.freeze({...data,people,total:people.length,
   countryCounts,groupCount,filterPolicy:'female-only verified editorial catalog'});
 }
 if(window.YumeAsiaNextGen){
  const data=window.YumeAsiaNextGen;before.spotlightAsia=data.people.length;
  const people=data.people.filter(p=>!maleCountryName.has(p.country+':'+norm(p.name)));
  window.YumeAsiaNextGen=Object.freeze({...data,people,
   byCountry:Object.fromEntries(['in','ph'].map(c=>[c,people.filter(p=>p.country===c).length])),
   filterPolicy:'female-only editorial spotlight'});
 }
 if(window.YumeYoungSpotlight){
  const data=window.YumeYoungSpotlight;before.young=data.people.length;
  const people=data.people.filter(p=>!youngName.has(norm(p.name)));
  const countBy=(field)=>Object.fromEntries([...new Set(people.map(p=>p[field]))].map(x=>[x,people.filter(p=>p[field]===x).length]));
  window.YumeYoungSpotlight=Object.freeze({...data,people,count:people.length,
   byScene:countBy('scene'),byCategory:countBy('category'),
   filterPolicy:'female-only editorial spotlight'});
 }
 if(window.YumeCreatorsPhotoExpansion){
  const data=window.YumeCreatorsPhotoExpansion;
  const keep=data.knownPhotoNames.filter(n=>!maleName.has(norm(n)));
  window.YumeCreatorsPhotoExpansion=Object.freeze({...data,knownPhotoNames:keep,
   added:keep.filter(n=>!['Mao Asada','Nozomi Maeda','Yurano Ochi','Miki Ide'].includes(n)).length});
 }
 window.YumeIdolsEditorialPolicy=Object.freeze({
  version:'2026-11-08-female-only',excludedJapan,excludedAsia,excludedYoung,
  removed:{japan:(before.japan||0)-(window.YumeIdolsDiscovery?.people.length||0),
   asia:(before.asia||0)-(window.YumeAsiaIdols?.people.length||0),
   asiaSpotlight:(before.spotlightAsia||0)-(window.YumeAsiaNextGen?.people.length||0),
   youngSpotlight:(before.young||0)-(window.YumeYoungSpotlight?.people.length||0)}
 });
})();
