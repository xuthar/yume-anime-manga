/* Yume · Batangina Vlog / Baby Jean, Filipina public social creator.
 * Public professional activity only; no assumptions about birth date or age.
 * TikTok is public; Facebook URL supplied by the user, account ownership not independently verified.
 * No family tragedy, rumor, private data, or unlicensed image in profile.
 * Photos are accessible on public social profiles; no third-party photo embedded without license.
 * Research date 2026-11-09.
 */
(()=>{'use strict';
 const current=window.YumeAsiaIdols;if(!current||!Array.isArray(current.people))return;
 const target='batangina.babyjean',name='Batangina Vlog';
 const normal=s=>String(s||'').normalize('NFKC').trim().toLowerCase()
   .replace(/[^a-z0-9]/g,'');
 const same=p=>p.country==='ph'&&(
  ['Batangina Vlog','Batang Ina Vlog','Baby Jean','Babyjean'].some(alias=>normal(p.name)===normal(alias))||
  normal(p.tiktokHandle)===normal(target));
 const people=current.people.slice(),matchIndex=people.findIndex(same);
 const sourceId='ph-batangina-press-2026',facebookId='ph-batangina-facebook-userlink-2026';
 const source='https://kami.com.ph/tagalog/180524-batangina-vlog-umalma-sa-mga-mapanirang-komento-tungkol-sa-pagkawala-ng-anak/';
 const facebook='https://www.facebook.com/batangina.vlog.505375';
 const tiktok='https://www.tiktok.com/@'+target;
 const sources={...current.sources,
  [sourceId]:{id:sourceId,country:'ph',title:'KAMI Philippines · Batangina Vlog, creatrice di contenuti',url:source,year:'2025',kind:'articolo giornalistico'},
  [facebookId]:{id:facebookId,country:'ph',title:'Facebook · link fornito dall’utente per Batangina Vlog',url:facebook,year:'2026',kind:'account da confermare · contenuto non accessibile da qui'}
 };
 const verifiedLinks=[['Facebook · link da confermare',facebook],['TikTok @'+target,tiktok],['Articolo · KAMI Philippines',source]];
 const professional={
  id:'ph-batangina-vlog',country:'ph',nationality:'ph',
  name,alternate:'Baby Jean (nome pubblico)',category:'creators',digitalScene:'tiktok',focus:'digital',
  tiktokHandle:target,tiktokFocus:'Vlog · umorismo · vita quotidiana',
  groups:['TikTok Philippines · Vlog e intrattenimento'],
  editorialBio:'Creator filippina conosciuta come Baby Jean. Pubblica vlog, umorismo e brevi video social su Facebook e TikTok. Il collegamento Facebook è stato segnalato dall’utente ma la proprietà esatta dell’account non è verificata; età e dati personali non sono riportati.',
  sourceIds:[sourceId,facebookId],sourceYear:'2026',sourceKind:'stampa pubblica e link social segnalato',
  facebookProfileCandidate:facebook,facebookOwnershipVerified:false,
  verifiedLinks,birth:null,status:'catalog',socialScene:true,teenSafe:false,
  photoFile:null,photoSource:null,
  portraitStatus:'Nessun ritratto con licenza riutilizzabile identificato; immagini visibili dai link a Facebook e TikTok.'
 };
 let newRecord;
 if(matchIndex>=0){
  const old=people[matchIndex],links=[...(old.verifiedLinks||[])];
  for(const l of verifiedLinks)if(!links.some(x=>x[1]===l[1]))links.push(l);
  // Prefer the user-supplied Facebook page for the on-card photo link.
  links.sort((a,b)=>Number(b[1]===facebook)-Number(a[1]===facebook));
  newRecord={...old,...professional,id:old.id||professional.id,verifiedLinks:links,
    photoFile:old.photoFile||null,photoSource:old.photoSource||null,
    sourceIds:[...new Set([...(old.sourceIds||[]).filter(id=>id!=='ph-batangina-chartex-2026'),sourceId,facebookId])]};
  people[matchIndex]=newRecord;
 }else{newRecord=professional;people.push(newRecord)}
 const ph=people.filter(p=>p.country==='ph').length;
 window.YumeAsiaIdols=Object.freeze({...current,people,total:people.length,sources,
  sourceCount:Object.keys(sources).length,countryCounts:{...current.countryCounts,ph},
  updated:'2026-11-09'});
 window.YumeBatangina2026=Object.freeze({updated:'2026-11-09',added:matchIndex<0,
  name:newRecord.name,profile:tiktok,facebookCandidate:facebook,facebookOwnershipVerified:false,portraitVerified:false,
  note:'Identità artistica pubblica; età non verificata, nessuna fotografia senza licenza.'});
})();