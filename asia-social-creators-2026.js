/* Yume · nuovi profili social di creator asiatiche, 12 novembre 2026.
 * Account pubblici collegati da roster professionali o dai siti/link hub ufficiali.
 * Età e compleanni non dedotti; nessuna immagine social ripubblicata senza licenza.
 */
(()=>{'use strict';
 const base=window.YumeAsiaIdols;if(!base||!Array.isArray(base.people))return;
 const sources={
  alist:{id:'asia-social-alist-2026',country:'in',title:'alist.talent · roster pubblico di creator indiane',url:'https://alist.club/talent',year:'2026',kind:'roster professionale con link Instagram diretti'},
  gushcloud:{id:'asia-social-gushcloud-2026',country:'ph',title:'Gushcloud · roster pubblico creator Filippine',url:'https://gushcloud.com/creators?category_id=1',year:'2026',kind:'agenzia talent con account social collegati'},
  jihoon:{id:'asia-social-jihoon-2026',country:'kr',title:'Jihoon Kim · sito ufficiale e profilo talent TPA',url:'https://jihoon.co/',year:'2026',kind:'sito personale e profilo dell’agenzia di management'}
 };
 // country | nome | area | Instagram | piattaforme secondarie | fonte
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
  ],'jihoon']
 ];
 const norm=s=>String(s||'').normalize('NFKC').normalize('NFKD').toLowerCase().replace(/[\u0300-\u036f\s・･._\-’'()]/g,'');
 const people=base.people.slice(),added=[],enhanced=[],index=new Map();
 people.forEach((p,i)=>index.set(p.country+'|'+norm(p.name),i));
 for(const [country,name,focus,ig,other,sourceKey] of rows){
  const source=sources[sourceKey],sourceId=source.id,key=country+'|'+norm(name),pos=index.get(key);
  const links=[['Instagram','https://www.instagram.com/'+ig+'/'],...other,['Fonte / roster',source.url]];
  if(pos!==undefined){
   const original=people[pos],old=Array.isArray(original.verifiedLinks)?original.verifiedLinks:[],merged=[...old];
   for(const link of links)if(!merged.some(x=>Array.isArray(x)&&x[1]===link[1]))merged.push(link);
   people[pos]={...original,verifiedLinks:merged,sourceIds:[...new Set([...(original.sourceIds||[]),sourceId])],groups:[...new Set([...(original.groups||[]),'Social & Creators · '+country.toUpperCase()])]};
   enhanced.push(name);continue;
  }
  const person={id:'social-creator-'+country+'-'+norm(name),country,nationality:country,name,alternate:'',category:'creators',groups:['Social & Creators · '+country.toUpperCase()],sourceIds:[sourceId],sourceYear:'2026',editorialBio:focus+'; profilo pubblico di creator. Età non verificata.',verifiedLinks:links,birth:null,photoFile:null,photoSource:null,status:'catalog',sourceKind:'roster pubblico / profilo ufficiale',digitalScene:'social creator',socialScene:true,ageVerified:false};
  people.push(person);added.push(name);index.set(key,people.length-1);
 }
 const countryCounts={...base.countryCounts};
 for(const country of Object.keys(countryCounts))countryCounts[country]=people.filter(p=>p.country===country).length;
 window.YumeAsiaIdols=Object.freeze({...base,people,total:people.length,countryCounts,sources:{...base.sources,...sources},sourceCount:Object.keys({...base.sources,...sources}).length,updated:'2026-11-12'});
 window.YumeAsiaSocialCreators=Object.freeze({updated:'2026-11-12',added,enhanced,agesAdded:0,portraitsAdded:0,note:'Public social links sourced from talent rosters or the creator’s own site/link hub; no age inference or social-photo reuse.'});
})();
