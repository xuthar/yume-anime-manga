/* Yume · TikToker filippine · revisione 8 novembre 2026.
 * Solo artiste / creator femminili, identità e handle pubblicamente documentati.
 * La classifica HypeAuditor è basata sulla performance, NON è una classifica dei follower.
 * Le età non vengono indovinate; nessun collegamento a sezioni per adulti.
 * Date e metriche sono snapshot editoriale, non dati live.
 */
(()=>{'use strict';
const old=window.YumeAsiaIdols;if(!old||!Array.isArray(old.people))return;
const S={
 hype:['HypeAuditor · TikTok Philippines, classifica performance','https://hypeauditor.com/top-tiktok-philippines/'],
 tk:['TKMetrics · Philippines, snapshot 6 novembre 2026','https://tkmetrics.com/creators/country/philippines/'],
 spir:['Spiralytics · Top TikTok Philippines 2026','https://www.spiralytics.com/blog/top-tiktok-content-creators-in-the-philippines/'],
 hafi:['Hafi · TikTok Philippines, classifica 2026','https://hafi.pro/top/most-followed-tiktok/philippines'],
 beauty:['influData · Beauty TikTok Philippines, novembre 2026','https://infludata.com/it/rankings/top-20-influencer-philippines-beauty-tiktok'],
 kol:['KolBuff · Philippines creator index, marzo 2026','https://kolbuff.com/blog/top-tiktok-creators-philippines-2026'],
 gma:['GMA Entertainment · Caprice Cayetano e TikTok','https://www.gmanetwork.com/entertainment/showbiznews/caprice-cayetano-hits-1m-followers-on-tiktok/127379'],
 bini:['BINI · link ai social ufficiali delle componenti','https://linktr.ee/binimembers']
};
/* nome | handle | focus | fonte | eventuale audience (milioni) | data snapshot
   Numeri facoltativi, per il solo canale indicato e NON aggregati a quelli dei gruppi. */
const rows=[
 ['Niana Guerrero','nianaguerrero','Dance · Lifestyle','tk',46.6,'2026-11-06'],
 ['Ivana Alawi','ivanaalawi','Lifestyle · Vlog','hype',25.7,'2026-11'],
 ['Marie Twins','sabbyandsophia','Danza · Duo femminile','tk',24.3,'2026-11-06'],
 ['Rosmar','rosmartan','Beauty · Imprenditoria','tk',22.6,'2026-11-06'],
 ['Andrea Brillantes','blythe','Beauty · Moda · TV','tk',21.9,'2026-11-06'],
 ['Zeinab Harake','zeinabharake','Lifestyle · Family','tk',17.9,'2026-11-06'],
 ['Mona Alawi','_monaalawi','Entertainment · Lifestyle','hype',17.4,'2026-11'],
 ['Ericka Pineda','erickapineda09','Beauty · Social · Video','tk',17.4,'2026-11-06'],
 ['Mona Gonzales','mngnzls','Musica · P-pop','spir',18,'2026-06'],
 ['Angela Mae Evangelista','itsme.gela','Danza · Trend','tk',15.9,'2026-11-06'],
 ['Dasuri Choi','dasurichoi__','Danza · Variety · coreana attiva nelle Filippine','tk',15.7,'2026-11-06'],
 ['Jillian Ward','jillianwxrd','TV · Lifestyle','tk',14.9,'2026-11-06'],
 ['Sanya Lopez','sanya_lopez','TV · Lifestyle','spir',16,'2026-06'],
 ['Toni Fowler','tonifowlerpo','Lifestyle · Video','spir',15,'2026-06'],
 ['Queenay Mercado','queenaymercado','Beauty · Comedy','spir',15,'2026-06'],
 ['Vanessa Alvarez','vanessakate_','Student Life · Vlog','spir',13,'2026-06'],
 ['Sai Datinguinoo','saidatinguinoo','Comedy · Short video','spir',13,'2026-06'],
 ['Zendee','zendeeofficial','Canto · Musica','spir',12,'2026-06'],
 ['Carlyn Ocampo','carlyncabel','P-pop · Lifestyle','spir',11,'2026-06'],
 ['Kyline Alcantara','itskylinealcantara3','TV · Fashion · Dance','hafi',null,null],
 ['Sofia Pablo','sofiapablo','TV · Lifestyle · Gen Z','hafi',null,null],
 ['Althea Ablan','altheaxblan','TV · Beauty · Gen Z','hafi',null,null],
 ['Sofia Smith','sofiaasmithh6_','Dance · Lifestyle','hafi',null,null],
 ['Mary Lite Lamayo','maryliteedang','Lifestyle · Comedy','hafi',null,null],
 ['Maymay Entrata','maymayentrata','Musica · Dance · TV','hafi',null,null],
 ['Janine Berdin','notjanineberdin','Musica · Comedy','hype',1.8,'2026-11'],
 ['Yaji Figueroa','yaji.figueroa_','Lifestyle · Video','hype',8,'2026-11'],
 ['Kai Montinola','kaii.montinola','Creator · Video','hype',2.9,'2026-11'],
 ['Angelica Jane Yap','angelicajyap','Entertainment · Social','hype',5.1,'2026-11'],
 ['AJ Raval','ajravsss','Cinema · Video','hype',9.2,'2026-11'],
 ['Mika Salamanca','mikasalamanca','TikTok · Lifestyle · Livestream','hafi',null,null],
 ['Bea Borres','beaaborres','Beauty · Lifestyle','beauty',5.2,'2026-11-08'],
 ['Lennie Enverga','lennieenverga','Lifestyle · TikTok','beauty',9.9,'2026-11-08'],
 ['Myrtle Sarrosa','myrtlegail','Cosplay · Gaming · TikTok','kol',3.4,'2026-03'],
 ['Rabiya Mateo','rabiyamateo','Fashion · TV · Social','kol',1.2,'2026-03'],
 ['Rei Germar','reigermar','Beauty · Fashion','kol',null,null],
 ['Vien Babina','vienbabinaaa','Social · Dance · Video','kol',5.5,'2026-03'],
 ['Maloi','bini_maloi','BINI · P-pop · Dance','hype',7.2,'2026-11'],
 ['Jhoanna','bini_jhoanna','BINI · P-pop · Canto','hype',6.2,'2026-11'],
 ['Mikha','bini_mikha','BINI · P-pop · Dance','hafi',null,null],
 ['Sheena','bini_sheena','BINI · P-pop · Dance','hafi',null,null],
 ['Colet','bini_colet','BINI · P-pop · Canto','bini',null,null],
 ['Aiah','bini_aiah','BINI · P-pop · Rap','bini',null,null],
 ['Gwen','bini_gwen','BINI · P-pop · Dance','bini',null,null],
 ['Stacey','bini_stacey','BINI · P-pop · Rap','bini',null,null],
 ['Caprice Cayetano','capricecayetano','Attrice · TikTok · Teen','gma',null,null]
];
const safeName=x=>String(x||'').normalize('NFKC').normalize('NFKD').toLowerCase()
 .replace(/[\u0300-\u036f\s\-_.’'()]/g,'');
const index=new Map(old.people.filter(p=>p.country==='ph').map(p=>[safeName(p.name),p]));
const sources={...old.sources};
for(const [id,[title,url]] of Object.entries(S))sources['ph-tiktok-'+id]={id:'ph-tiktok-'+id,country:'ph',title,url,year:'2026',kind:'ranking pubblico / fonte editoriale'};
const people=old.people.slice(),added=[],enriched=[];
for(const [name,handle,focus,sourceKey,millions,date] of rows){
 if(!/^[a-z0-9_.]+$/i.test(handle))continue;
 const sourceId='ph-tiktok-'+sourceKey,tiktok='https://www.tiktok.com/@'+handle;
 const existing=index.get(safeName(name));
 const links=existing?.verifiedLinks?.filter(x=>Array.isArray(x)&&x.length===2)||[];
 const verifiedLinks=[...links];
 if(!verifiedLinks.some(x=>x[1]===tiktok))verifiedLinks.unshift(['TikTok @'+handle,tiktok]);
 if(!verifiedLinks.some(x=>x[1]===S[sourceKey][1]))verifiedLinks.push(['Fonte classifica',S[sourceKey][1]]);
 const data={tiktokHandle:handle,tiktokFocus:focus,
  tiktokFollowersMillions:Number.isFinite(millions)?millions:null,
  tiktokMetricsDate:date||null,tiktokSourceId:sourceId};
 if(existing){
  const i=people.indexOf(existing);
  const updated={...existing,...data,verifiedLinks,sourceIds:[...new Set([...(existing.sourceIds||[]),sourceId])],
   digitalScene:existing.digitalScene||'tiktok'};
  people[i]=updated;index.set(safeName(name),updated);enriched.push(updated);
 }else{
  const p={id:'ph-tiktok-'+handle,country:'ph',nationality:name==='Dasuri Choi'?'kr':'ph',
   name,category:['Maloi','Jhoanna','Mikha','Sheena','Colet','Aiah','Gwen','Stacey','Zendee','Carlyn Ocampo','Mona Gonzales','Janine Berdin'].includes(name)?'music':
    ['Caprice Cayetano','Sofia Pablo','Althea Ablan','Jillian Ward','Kyline Alcantara','Sanya Lopez','Andrea Brillantes'].includes(name)?'actors':'creators',
   groups:['TikTok Philippines · '+focus],editorialBio:focus,verifiedLinks,
   sourceIds:[sourceId],sourceYear:'2026',status:'catalog',birth:null,
   digitalScene:'tiktok',focus:'digital',sourceKind:'classifica TikTok pubblica',...data};
  people.push(p);index.set(safeName(name),p);added.push(p);
 }
}
const phCount=people.filter(p=>p.country==='ph').length;
const groupCount=new Set(people.flatMap(p=>(p.groups||[]).map(g=>p.country+':'+g))).size;
window.YumeAsiaIdols=Object.freeze({...old,people,total:people.length,
 countryCounts:{...old.countryCounts,ph:phCount},groupCount,sources,
 sourceCount:Object.keys(sources).length,updated:'2026-11-08'});
window.YumePhilippinesTikTok=Object.freeze({updated:'2026-11-08',listed:rows.length,
 added:added.length,enriched:enriched.length,records:people.filter(p=>p.country==='ph'&&p.tiktokHandle),
 sources:S,note:'Solo creator femminili: profili e handle verificati tramite directory professionali. Età non desunte dall’aspetto. Snapshot non live.'});
})();