/* Yume · nuovi profili social di creator asiatiche, 12 novembre 2026.
 * Account pubblici collegati da roster professionali o dai siti/link hub ufficiali.
 * Età e compleanni non dedotti; nessuna immagine social ripubblicata senza licenza.
 */
(()=>{'use strict';
 const base=window.YumeAsiaIdols;if(!base||!Array.isArray(base.people))return;
 const sources={
  alist:{id:'asia-social-alist-2026',country:'in',title:'alist.talent · roster pubblico di creator indiane',url:'https://alist.club/talent',year:'2026',kind:'roster professionale con link Instagram diretti'},
  gushcloud:{id:'asia-social-gushcloud-2026',country:'ph',title:'Gushcloud · roster pubblico creator Filippine',url:'https://gushcloud.com/creators?category_id=1',year:'2026',kind:'agenzia talent con account social collegati'},
  allureAge:{id:'asia-social-eula-age-2026',country:'ph',title:'Allure Philippines · profilo di Eula Arielle (17 luglio 2026)',url:'https://allure.ph/allure-face-card/eula-arielle-morena-beauty-creator-interview/',year:'2026',kind:'intervista editoriale con età e profilo Instagram collegato'},
  allureSocial:{id:'asia-social-eula-social-2026',country:'ph',title:'Allure Philippines · account TikTok di Eula Arielle',url:'https://allure.ph/allure-face-card/how-eula-arielle-became-tiktoks-bebot-darling/',year:'2026',kind:'intervista editoriale con account TikTok indicato'},
  viva:{id:'asia-social-viva-lorin-2026',country:'ph',title:'Viva Artists Agency · scheda ufficiale Lorin Gutierrez',url:'https://www.vivaartistsagency.ph/artists/lorin-gutierrez',year:'2026',kind:'agenzia ufficiale con data di nascita e attività professionale'},
  gma:{id:'asia-social-gma-lorin-2026',country:'ph',title:'GMA News · profili social pubblici di Lorin Bektas',url:'https://www.gmanetwork.com/news/lifestyle/hobbiesandactivities/878010/lorin-bektas-celebrates-20th-birthday-with-fellow-celebrities/story/',year:'2023',kind:'fonte giornalistica con account Instagram e TikTok collegati'},
  jihoon:{id:'asia-social-jihoon-2026',country:'kr',title:'Jihoon Kim · sito ufficiale e profilo talent TPA',url:'https://jihoon.co/',year:'2026',kind:'sito personale e profilo dell’agenzia di management'}
 };
 // country | nome | area | Instagram | piattaforme secondarie | fonti | età riportata | data nascita | fonte nascita | data età
 const rows=[
  ['in','Vrinda Suri','Fashion & lifestyle','vrindasurii',[], 'alist'],
  ['in','Alia Chhiba','Luxury lifestyle','aliachhiba',[], 'alist'],
  ['in','Aruna Beniwal','Fashion & beauty','arunabeniwal_',[], 'alist'],
  ['in','Anvesha Vij','Fashion & lifestyle','anveshavij',[], 'alist'],
  ['in','Khushi Chawla','Fashion & beauty','khushichawlaa',[], 'alist'],
  ['in','Yashaswinee','Fashion & lifestyle','yashaswineethepooh',[], 'alist'],
  ['in','Priyam Yonzon','Beauty & lifestyle','priyamyonzon',[], 'alist'],
  ['in','Priyanka Chauhan','Fashion & lifestyle','prriyankkachauhan',[], 'alist'],
  ['in','Bhavna Monga','Lifestyle & travel','bhavnamonga',[], 'alist'],
  ['in','Priya Dora','Beauty & lifestyle','prriyadora_',[], 'alist'],
  ['in','Rhea Kapahi','Luxury & fashion','rheakapahi',[], 'alist'],
  ['in','Krishangi Borah','Beauty & fashion','krishangi_borah',[], 'alist'],
  ['in','Laila Faisal','Beauty & lifestyle','laila.faisall',[], 'alist'],
  ['in','Atisha Pratap Singh','Fashion & culture','atishapratapsingh',[], 'alist'],
  ['in','Ashna Suri','Lifestyle & fashion','ashnasuri1',[], 'alist'],
  ['in','Sunaina Lal','Fashion & lifestyle','sunainalal',[], 'alist'],
  ['in','Alfia','Fashion & lifestyle','alfia_j',[], 'alist'],
  ['in','Ravkirat Kaur','Fashion & travel','ravkirat_',[], 'alist'],
  ['ph','Angelgrace America','Beauty, modeling & acting','angelgrace.america',[
   ['TikTok','https://www.tiktok.com/@angelgrace.america'],['Facebook','https://www.facebook.com/americanaaa'],['YouTube','https://www.youtube.com/@americana8']
  ],'gushcloud'],
  ['ph','Cheska San Pedro','Beauty & lifestyle','cheskasanpedro_',[
   ['TikTok','https://www.tiktok.com/@cheskasanpedro_onig'],['Facebook','https://www.facebook.com/francheska.sanpedro.50']
  ],'gushcloud'],
  ['kr','Jihoon Kim','Fashion & lifestyle','jihoon',[
   ['TikTok','https://www.tiktok.com/@jihoon'],['YouTube','https://www.youtube.com/@jihoonkm'],['Sito ufficiale','https://jihoon.co/']
  ],'jihoon'],
  ['ph','Eula Arielle','Beauty, comedy & modeling','eulaarielle',[
   ['TikTok','https://www.tiktok.com/@eulaarielle_']
  ],['allureAge','allureSocial'],23,null,null,'17/07/2026'],
  ['ph','Lorin Gutierrez','Fashion, beauty & lifestyle','loringabriella',[
   ['TikTok','https://www.tiktok.com/@loringabriella'],['Fonte account social','https://www.gmanetwork.com/news/lifestyle/hobbiesandactivities/878010/lorin-bektas-celebrates-20th-birthday-with-fellow-celebrities/story/']
  ],['viva','gma'],null,'2003-08-03','https://www.vivaartistsagency.ph/artists/lorin-gutierrez',null]
 ];
 const norm=s=>String(s||'').normalize('NFKC').normalize('NFKD').toLowerCase().replace(/[\u0300-\u036f\s・･._\-’'()]/g,'');
 const people=base.people.slice(),added=[],enhanced=[],index=new Map();
 people.forEach((p,i)=>index.set(p.country+'|'+norm(p.name),i));
 for(const [country,name,focus,ig,other,sourceKey,verifiedAge,birth,birthSource,verifiedAgeAsOf] of rows){
  const sourceKeys=Array.isArray(sourceKey)?sourceKey:[sourceKey],sourceList=sourceKeys.map(k=>sources[k]).filter(Boolean),source=sourceList[0],sourceIds=sourceList.map(s=>s.id),key=country+'|'+norm(name),pos=index.get(key);
  const links=[['Instagram','https://www.instagram.com/'+ig+'/'],...other,...sourceList.map(s=>['Fonte / roster',s.url])];
  if(pos!==undefined){
   const original=people[pos],old=Array.isArray(original.verifiedLinks)?original.verifiedLinks:[],merged=[...old];
   for(const link of links)if(!merged.some(x=>Array.isArray(x)&&x[1]===link[1]))merged.push(link);
   people[pos]={...original,verifiedLinks:merged,sourceIds:[...new Set([...(original.sourceIds||[]),...sourceIds])],groups:[...new Set([...(original.groups||[]),'Social & Creators · '+country.toUpperCase()])]};
   enhanced.push(name);continue;
  }
  const nationality=name==='Angelgrace America'?'ph':null;
  const person={id:'social-creator-'+country+'-'+norm(name),country,nationality,name,alternate:'',category:'creators',groups:['Social & Creators · '+country.toUpperCase()],sourceIds,sourceYear:'2026',editorialBio:focus+'; profilo pubblico di creator.'+(Number.isInteger(verifiedAge)?' Età riportata dalla fonte: '+verifiedAge+' anni'+(verifiedAgeAsOf?' (al '+verifiedAgeAsOf+')':'')+'.':birth?' Nascita documentata dalla fonte ufficiale.':' Età non verificata.'),verifiedLinks:links,birth:birth||null,verifiedBirthSource:birthSource||null,verifiedAge:Number.isInteger(verifiedAge)?verifiedAge:null,verifiedAgeAsOf:verifiedAgeAsOf||null,ageVerified:Number.isInteger(verifiedAge)||!!birth,photoFile:null,photoSource:null,status:'catalog',sourceKind:'roster pubblico / profilo ufficiale',digitalScene:'social creator',socialScene:true};
  people.push(person);added.push(name);index.set(key,people.length-1);
 }
 const countryCounts={...base.countryCounts};
 for(const country of Object.keys(countryCounts))countryCounts[country]=people.filter(p=>p.country===country).length;
 window.YumeAsiaIdols=Object.freeze({...base,people,total:people.length,countryCounts,sources:{...base.sources,...sources},sourceCount:Object.keys({...base.sources,...sources}).length,updated:'2026-11-12'});
 window.YumeAsiaSocialCreators=Object.freeze({updated:'2026-11-12',added,enhanced,agesAdded:0,portraitsAdded:0,note:'Public social links sourced from talent rosters or the creator’s own site/link hub; no age inference or social-photo reuse.'});
})();
