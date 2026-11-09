/* Yume · Batangina Vlog / Baby Jean, Filipina public social creator.
 * Public professional activity only; no assumptions about birth date or age.
 * Known TikTok handle cross-checked against ChartEx and public news.
 * No family tragedy, rumor, private data, or unlicensed image in profile.
 * Photos are linked on TikTok; no third-party photo embedded without license.
 * Research date 2026-11-09.
 */
(()=>{'use strict';
 const current=window.YumeAsiaIdols;if(!current||!Array.isArray(current.people))return;
 const target='batangina.babyjean',name='Batangina Vlog';
 const normal=s=>String(s||'').normalize('NFKC').trim().toLowerCase()
   .replace(/[\\s._\-’'()]/g,'');
 const same=p=>p.country==='ph'&&(
  ['Batangina Vlog','Batang Ina Vlog','Baby Jean','Babyjean'].some(alias=>normal(p.name)===normal(alias))||
  normal(p.tiktokHandle)===normal(target));
 const people=current.people.slice(),matchIndex=people.findIndex(same);
 const sourceId='ph-batangina-press-2026',chartId='ph-batangina-chartex-2026';
 const source='https://kami.com.ph/tagalog/180524-batangina-vlog-umalma-sa-mga-mapanirang-komento-tungkol-sa-pagkawala-ng-anak/';
 const chart='https://chartex.com/song/bddz-sgoob-and-dzzy-taste-9227381';
 const tiktok='https://www.tiktok.com/@'+target;
 const sources={...current.sources,
  [sourceId]:{id:sourceId,country:'ph',title:'KAMI Philippines · Batangina Vlog, creatrice di contenuti',url:source,year:'2025',kind:'articolo giornalistico'},
  [chartId]:{id:chartId,country:'ph',title:'ChartEx · handle TikTok @batangina.babyjean',url:chart,year:'2026',kind:'repertorio social'}
 };
 const verifiedLinks=[['TikTok @'+target,tiktok],['Articolo · KAMI Philippines',source],['Rilevazione social · ChartEx',chart]];
 const professional={
  id:'ph-batangina-vlog',country:'ph',nationality:'ph',
  name,alternate:'Baby Jean (nome pubblico)',category:'creators',digitalScene:'tiktok',focus:'digital',
  tiktokHandle:target,tiktokFocus:'Vlog · umorismo · vita quotidiana',
  groups:['TikTok Philippines · Vlog e intrattenimento'],
  editorialBio:'Creator filippina conosciuta come Baby Jean. Pubblica vlog, umorismo e brevi video social. Il profilo è documentato da una testata filippina e da una directory TikTok; età e dati personali non sono riportati.',
  sourceIds:[sourceId,chartId],sourceYear:'2026',sourceKind:'profilo pubblico e stampa',
  verifiedLinks,birth:null,status:'catalog',socialScene:true,teenSafe:false,
  photoFile:null,photoSource:null,
  portraitStatus:'Nessun ritratto con licenza riutilizzabile identificato; fotografie sul profilo TikTok pubblico.'
 };
 let newRecord;
 if(matchIndex>=0){
  const old=people[matchIndex],links=[...(old.verifiedLinks||[])];
  for(const l of verifiedLinks)if(!links.some(x=>x[1]===l[1]))links.push(l);
  newRecord={...old,...professional,id:old.id||professional.id,verifiedLinks:links,
    photoFile:old.photoFile||null,photoSource:old.photoSource||null,
    sourceIds:[...new Set([...(old.sourceIds||[]),sourceId,chartId])]};
  people[matchIndex]=newRecord;
 }else{newRecord=professional;people.push(newRecord)}
 const ph=people.filter(p=>p.country==='ph').length;
 window.YumeAsiaIdols=Object.freeze({...current,people,total:people.length,sources,
  sourceCount:Object.keys(sources).length,countryCounts:{...current.countryCounts,ph},
  updated:'2026-11-09'});
 window.YumeBatangina2026=Object.freeze({updated:'2026-11-09',added:matchIndex<0,
  name:newRecord.name,profile:tiktok,portraitVerified:false,
  note:'Identità artistica pubblica; età non verificata, nessuna fotografia senza licenza.'});
})();