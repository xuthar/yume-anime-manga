/* Yume Asia Spotlight · India & Philippines · 2026-11-08
 * Public professional artists and creator accounts only.
 * Cohort "teen" is determined ONLY from an independently supported exact birth date.
 * Audience snapshots have dates and their own source; they are NOT live counts.
 * No age guessing from "teen" marketing lists; no contact information or private data.
 */
(()=>{'use strict';
const old=window.YumeAsiaIdols;if(!old)return;
const sourceList=[
 ['in20','in','Tring · Top 50 influencer in India (2026)','https://www.tring.co.in/influencer-marketing/influencers-in-india','2026'],
 ['inTeen','in','Tring · Influencer teen in India (2026)','https://www.tring.co.in/influencer-marketing/teenage-influencers-in-india','2026'],
 ['inKids','in','Feedspot · Indian Kids Influencers (2026)','https://influencers.feedspot.com/indian_kids_instagram_influencers/','2026'],
 ['inAnantya','in','Famous Birthdays · MyMissAnand, canale YouTube','https://www.famousbirthdays.com/people/anantya-anand.html','2026'],
 ['inNit','in','HypeAuditor · Nitanshi (October 2026)','https://hypeauditor.com/instagram/nitanshigoelofficial/','2026'],
 ['inRash','in','SocialBlade · Rashi Shinde','https://socialblade.com/instagram/user/rashishinde2406','2026'],
 ['inRuh','in','PicMany · Ruhaanika (4 November 2026)','https://picmany.com/ruhaanikad','2026'],
 ['inMale','in','Economic Times · Maleesha (May 2026)','https://economictimes.indiatimes.com/news/new-updates/people-called-her-too-dark-this-teenager-slum-princess-from-dharavi-is-now-the-face-of-international-fashion-campaign/articleshow/131005958.cms','2026'],
 ['inAadh','in','SocialBlade · Aadhya Anand','https://socialblade.com/instagram/user/aadhya_anand','2026'],
 ['inVogue','in','Vogue Business · It-Kids of India','https://www.vogue.com/article/the-it-kids-of-india','2026'],
 ['phTik','ph','TKMetrics · Top TikTok Philippines (6 November 2026)','https://tkmetrics.com/creators/country/philippines/','2026'],
 ['phSpir','ph','Spiralytics · Top 20 TikTok creators Philippines (2026)','https://www.spiralytics.com/blog/top-tiktok-content-creators-in-the-philippines/','2026'],
 ['phKend','ph','HypeAuditor · Kendra Kramer (October 2026)','https://hypeauditor.com/instagram/kramer.kendra/','2026'],
 ['phCap','ph','PicMany · Caprice (4 November 2026)','https://picmany.com/capcaprice','2026'],
 ['phGMA','ph','GMA · Caprice Cayetano e Sparkle','https://www.gmanetwork.com/entertainment/showbiznews/caprice-cayetano-receives-birthday-greeting-from-dad-chef-jorge-mendez/127684/','2025'],
 ['phStar','ph','ABS-CBN Star Magic · Gen Z & Rookies','https://corporate.abs-cbn.com/newsroom/news-releases/2024/3/17/hit-star-magic-gen-z-stars-and-fresh-faces-turn-pr?lang=en','2024'],
 ['phVogue','ph','Vogue Business · It-Kids Philippines','https://www.vogue.com/article/the-it-kids-of-the-philippines','2026'],
 ['phInst','ph','AInfluencer · Influencer filippini (September 2026)','https://influencermarketing.ainfluencer.com/filipino-influencers/','2026']
];
const sources=Object.fromEntries(sourceList.map(([id,country,title,url,year])=>[id,{id,country,title,url,year}]));
/* [country,name,category,group,sourceKey,platform,handle,birth,followers,metricsDate,description,birthSource]
   The account belongs to the named public performer except specifically identified
   branded/family channels. Never infer personal metrics from a group account. */
const rows=[
 ['in','Nitanshi Goel','actors','Bollywood · Fashion','inNit','Instagram','nitanshigoelofficial','2007-06-12',10100000,'2026-10','Attrice di Laapataa Ladies e campagne di moda.','https://www.imdb.com/name/nm9849994/bio/'],
 ['in','Riva Arora','actors','Cinema · Social','inTeen','Instagram','rivarora_',null,10900000,'2026-11-08','Attrice e creator; età indicata come non verificata a causa di fonti biografiche controverse.'],
 ['in','Rashi Shinde','creators','Dance · Video','inRash','Instagram','rashishinde2406','2010-06-24',4112128,'2026-11','Clip di danza e recitazione; account pubblico gestito in famiglia.','https://www.famousbirthdays.com/people/rashi-shinde.html'],
 ['in','Anantya Anand','creators','MyMissAnand · YouTube','inAnantya','YouTube','@MyMissAnand','2009-06-12',13000000,'2026-10','Creator di contenuti lifestyle, tutorial e progetti video per famiglie.','https://www.famousbirthdays.com/people/anantya-anand.html'],
 ['in','Ruhaanika Dhawan','actors','Televisione · Fashion','inRuh','Instagram','ruhaanikad','2007-09-25',2659692,'2026-11-04','Attrice televisiva e creator di moda, con profilo pubblico verificato.','https://www.imdb.com/name/nm6923837/'],
 ['in','Aakriti Sharma','actors','Televisione · Dance','inKids','Instagram','aakritisharma.official','2011-11-03',1900000,'2026-10','Attrice di Kullfi Kumarr Bajewala; profilo gestito dai genitori.','https://www.famousbirthdays.com/people/aakriti-sharma.html'],
 ['in','Aadhya Anand','actors','OTT · Cinema · Modella','inAadh','Instagram','aadhya_anand','2007-11-02',940008,'2026-09','Attrice e modella di Bombay Begums e Crushed.','https://www.imdb.com/name/nm8488623/bio/'],
 ['in','Maleesha Kharwa','fashion','Fashion Model · Campaign','inTeen','Instagram','maleeshakharwa','2008-01-13',510000,'2026-11-08','Modella protagonista di campagne di bellezza e editoriali internazionali.','https://www.indiatoday.in/trending-news/video/how-maleesha-kharwas-chance-encounter-with-a-foreigner-opened-doors-to-modelling-3014464-2026-10-10'],
 ['in','Hastu Goyal','creators','Fashion · Lifestyle','inTeen','Instagram','hastu__goyal',null,1040000,'2026-09','Creator di video di moda e lifestyle. Età non documentata con precisione.'],
 ['in','Jannat Zubair','actors','TV · Lifestyle','in20','Instagram','jannatzubair29',null,51000000,'2026-11-08','Attrice e influencer, oggi adulta.'],
 ['in','Anushka Sen','actors','Televisione · Lifestyle','in20','Instagram','anushkasen0408',null,38000000,'2026-11-08','Attrice e creator con presenza social internazionale, oggi adulta.'],
 ['in','Avneet Kaur','actors','Cinema · Fashion','in20','Instagram','avneetkaur_13',null,31000000,'2026-11-08','Attrice, moda e videoclip; oggi adulta.'],
 ['in','Arishfa Khan','actors','TV · Fashion','in20','Instagram','arishfakhan',null,29000000,'2026-09','Attrice e influencer, adulta; già nota per ruoli interpretati da bambina.'],
 ['in','Riyaz Aly','creators','Fashion · Reels','in20','Instagram','riyaz.14',null,27000000,'2026-11-08','Creator di short video e moda.'],
 ['in','Faisal Shaikh','creators','Fashion · Lifestyle','in20','Instagram','mr_faisu_07',null,33000000,'2026-11-08','Creator di video e collaborazioni di moda.'],
 ['in','Prajakta Koli','creators','Comedy · YouTube','in20','Instagram','mostlysane',null,8800000,'2026-11-08','Comica e attrice, conosciuta anche per i contenuti YouTube.'],
 ['in','Nancy Tyagi','fashion','Fashion Design','in20','Instagram','nancytyagi___',null,3000000,'2026-11-08','Designer e creator di progetti di moda.'],
 ['in','Aashna Hegde','creators','Lifestyle · Fashion','in20','Instagram','aashnahegde',null,1000000,'2026-11-08','Creator di moda e lifestyle.'],
 ['in','Ahsaas Channa','actors','OTT · Social','in20','Instagram','ahsaassy_',null,3700000,'2026-11-08','Attrice di serie e produzioni digitali.'],
 ['in','Ashi Khanna','creators','Fashion · Lifestyle','in20','Instagram','ashi_khanna',null,1600000,'2026-11-08','Creator di video di moda e lifestyle.'],
 ['in','Nagma Mirajkar','creators','Dance · Fashion','in20','Instagram','nagmamirajkar',null,8000000,'2026-11-08','Video di danza, creator lifestyle e moda.'],
 ['in','Awez Darbar','creators','Dance · Choreography','in20','Instagram','awez_darbar',null,30000000,'2026-11-08','Creator e coreografo con audience social molto ampia.'],
 ['in','Sameeksha Sud','creators','Beauty · Fashion','in20','Instagram','sameeksha_sud',null,10500000,'2026-11-08','Creator di moda e intrattenimento.'],
 ['in','Ashi Singh','actors','TV · Fashion','in20','Instagram','i_ashisinghh',null,2400000,'2026-11-08','Attrice e creator di lifestyle.'],
 ['in','Siddharth Nigam','actors','TV · Fitness','in20','Instagram','thesiddharthnigam',null,10000000,'2026-11-08','Attore e performer televisivo.'],
 ['in','Sakshi Keswani','creators','Comedy · Reels','in20','Instagram','beingsuku',null,2000000,'2026-11-08','Commedia e video brevi.'],
 ['in','Dharna Durga','creators','Comedy · Sketch','in20','Instagram','dharnaaaaa',null,1700000,'2026-11-08','Comica e creator di sketch.'],
 ['in','Masoom Minawala','creators','Fashion · Luxury','in20','Instagram','masoomminawala',null,1300000,'2026-11-08','Fashion creator e imprenditrice.'],
 ['in','Apoorva Mukhija','creators','Lifestyle · Vlog','in20','Instagram','the.rebel.kid',null,4300000,'2026-11-08','Creator nota per vlog e racconti quotidiani.'],
 ['in','Dolly Singh','creators','Comedy · Fashion','in20','Instagram','dollysingh',null,1800000,'2026-11-08','Comica, attrice e creator.'],
 ['in','Komal Pandey','creators','Style · Fashion','in20','Instagram','komalpandeyofficial',null,1900000,'2026-11-08','Fashion styling e video di tendenze.'],
 ['in','Sejal Kumar','creators','YouTube · Lifestyle','in20','Instagram','sejalkumar1195',null,800000,'2026-11-08','Creator lifestyle e musica.'],
 ['in','Bhavitha Mandava','fashion','Runway · Fashion','inVogue',null,null,null,null,null,'Modella e protagonista della nuova scena moda indiana.'],
 ['in','Diya Joukani','creators','Design · Fashion','inVogue',null,null,null,null,null,'Designer e creator con progetti per brand internazionali.'],
 ['in','Aneet Padda','actors','Cinema · Fashion','inVogue',null,null,null,null,null,'Attrice emergente della scena cinematografica.'],
 ['in','Sara Tendulkar','creators','Fashion · Lifestyle','inVogue',null,null,null,null,null,'Creator e figura pubblica nella scena moda e lifestyle.'],
 ['in','Zara Zyanna','creators','Family-managed · Video','inKids','Instagram','zara.zyanna',null,2100000,'2026-08','Canale e profilo pubblico gestiti dai genitori.'],
 ['in','Ishant Mishra','creators','Family-managed · Video','inKids','Instagram','ishant_mishra_rs',null,1700000,'2026-08','Creator video con account dichiarato gestito da un familiare.'],
 ['in','Avirbhav Sajimon Kappithan','music','Singer · Talent Show','inKids','Instagram','avirbhav_official',null,863700,'2026-08','Giovane cantante e vincitore del talent Superstar Singer.'],
 ['ph','Clair Kendra Kramer','fashion','Teen Fashion · Sport','phKend','Instagram','kramer.kendra','2009-06-25',1633733,'2026-10','Creator di fashion e sport con account pubblico; attività in famiglia.','https://www.famousbirthdays.com/people/clair-kramer.html'],
 ['ph','Caprice Cayetano','actors','Sparkle · PBB','phCap','Instagram','capcaprice','2008-11-10',997785,'2026-11-04','Attrice Sparkle e vincitrice di Pinoy Big Brother: Celebrity Collab 2.0.','https://www.gmanetwork.com/entertainment/showbiznews/caprice-cayetano-receives-birthday-greeting-from-dad-chef-jorge-mendez/127684/'],
 ['ph','Xia Vigor','actors','Cinema · Televisione','phStar',null,null,'2009-06-23',null,null,'Giovane attrice britannico-filippina attiva in TV.','https://en.wikipedia.org/wiki/Xia_Vigor'],
 ['ph','Niana Guerrero','creators','Dance · Lifestyle','phTik','TikTok','nianaguerrero',null,46600000,'2026-11-06','Danzatrice e creator di video virali; oggi adulta.'],
 ['ph','Andrea Brillantes','actors','TV · Fashion','phTik','TikTok','blythe',null,21900000,'2026-11-06','Attrice e fashion creator; oggi adulta.'],
 ['ph','Rosmar','creators','Beauty · Lifestyle','phTik','TikTok','rosmartan',null,22600000,'2026-11-06','Creator e imprenditrice.'],
 ['ph','Marie Twins','creators','Dance · Duo','phTik','TikTok','sabbyandsophia',null,24275883,'2026-11-06','Account condiviso di un duo: il conteggio riguarda il canale collettivo.'],
 ['ph','Yanyan De Jesus','creators','Dance · Comedy','phTik','TikTok','yanyandejesus1',null,22700000,'2026-11-06','Creator di danza e comicità.'],
 ['ph','Grae Cabase','creators','Lifestyle · Video','phSpir','TikTok','graecabasee',null,21000000,'2026-10','Creator di video e trend social.'],
 ['ph','Mona Gonzales','music','Music · P-Pop','phSpir','TikTok','mngnzls',null,18000000,'2026-10','Creator e cantante attiva nei video musicali.'],
 ['ph','Zeinab Harake','creators','Lifestyle · Family','phSpir','TikTok','zeinabharake',null,17000000,'2026-10','Lifestyle e progetti video familiari.'],
 ['ph','Ivana Alawi','creators','YouTube · Lifestyle','phSpir','TikTok','ivanaalawi',null,16000000,'2026-10','Attrice e creator video per YouTube e TikTok.'],
 ['ph','Sanya Lopez','actors','TV · Social','phSpir','TikTok','sanya_lopez',null,16000000,'2026-10','Attrice e personaggio televisivo.'],
 ['ph','Spencer Serafica','creators','Comedy · Short Video','phSpir','TikTok','spencerserafica02',null,16000000,'2026-10','Creator di video comici.'],
 ['ph','Toni Fowler','creators','Lifestyle · Video','phSpir','TikTok','tonifowlerpo',null,15000000,'2026-10','Creator e personaggio dei reality social.'],
 ['ph','Queenay Mercado','creators','Beauty · Comedy','phSpir','TikTok','queenaymercado',null,15000000,'2026-10','Video di bellezza, comicità e lifestyle.'],
 ['ph','Jillian Ward','actors','TV · Beauty','phSpir','TikTok','jillianwxrd',null,14000000,'2026-10','Attrice televisiva e creator, oggi adulta.'],
 ['ph','Whamos Cruz','creators','Comedy · Short Video','phSpir','TikTok','masterwhamos',null,14000000,'2026-10','Creator di sketch e video di intrattenimento.'],
 ['ph','Vanessa Alvarez','creators','Lifestyle · Video','phSpir','TikTok','vanessakate_',null,13000000,'2026-10','Creator di lifestyle e video social.'],
 ['ph','Sai Datinguinoo','creators','Comedy · Short Video','phSpir','TikTok','saidatinguinoo',null,13000000,'2026-10','Video brevi comici e trend.'],
 ['ph','Janio','creators','Makeup · Video','phSpir','TikTok','janioooooooo',null,12000000,'2026-10','Creator di makeup e brevi video.'],
 ['ph','Evan Tan','creators','Comedy · Sketch','phSpir','TikTok','itsevantan',null,12000000,'2026-10','Creator di sketch e video umoristici.'],
 ['ph','Zendee','music','Singer · Video','phSpir','TikTok','zendeeofficial',null,12000000,'2026-10','Cantante e creator musicale.'],
 ['ph','Carlyn Ocampo','music','P-Pop · Lifestyle','phSpir','TikTok','carlyncabel',null,11000000,'2026-10','Cantante, dance performer e creator lifestyle.'],
 ['ph','Francine Diaz','actors','Star Magic · TV','phStar',null,null,null,null,null,'Attrice protagonista di serie televisive e progetti Star Magic.'],
 ['ph','Belle Mariano','actors','Star Magic · TV · Music','phStar',null,null,null,null,null,'Attrice e cantante attiva in serie, cinema e musica.'],
 ['ph','Alexa Ilacad','actors','Star Magic · Music','phStar',null,null,null,null,null,'Attrice e cantante.'],
 ['ph','Criza Taa','actors','Star Magic · TV','phStar',null,null,null,null,null,'Attrice e talento della scena Gen Z.'],
 ['ph','Victoria Vega','actors','Star Magic · New Talents','phStar',null,null,null,null,null,'Talento presentato tra le nuove leve dell’agenzia.'],
 ['ph','Nicole San Juan','actors','Star Magic · New Talents','phStar',null,null,null,null,null,'Talento presentato dall’agenzia.'],
 ['ph','Eliza Borromeo','actors','Star Magic · New Talents','phStar',null,null,null,null,null,'Talento di recitazione della nuova generazione.'],
 ['ph','Atasha Muhlach','actors','Cinema · Fashion','phVogue',null,null,null,null,null,'Attrice e protagonista emergente della scena entertainment.'],
 ['ph','Alex Eala','creators','Sport · Fashion','phVogue',null,null,null,null,null,'Tennista e protagonista della nuova visibilità internazionale filippina.'],
 ['ph','Siobhan Moylan','fashion','Runway · Fashion','phVogue',null,null,null,null,null,'Modella della nuova scena editoriale filippina.'],
 ['ph','Liza Soberano','actors','Cinema · Fashion','phInst','Instagram','lizasoberano',null,17600000,'2026-09','Attrice attiva anche a livello internazionale.'],
 ['ph','Heart Evangelista','creators','Luxury · Fashion','phInst','Instagram','iamhearte',null,16400000,'2026-09','Artista e fashion influencer internazionale.'],
 ['ph','Anne Curtis','actors','Televisione · Lifestyle','phInst','Instagram','annecurtissmith',null,20700000,'2026-09','Attrice e conduttrice molto seguita.'],
 ['ph','Kim Chiu','actors','TV · Cinema','phInst','Instagram','chinitaprincess',null,12400000,'2026-09','Attrice, presentatrice e imprenditrice.'],
 ['ph','Julia Barretto','actors','Cinema · Fashion','phInst','Instagram','juliabarretto',null,11400000,'2026-09','Attrice e fashion creator.'],
 ['ph','Catriona Gray','creators','Fashion · Advocacy','phInst','Instagram','catriona_gray',null,13300000,'2026-09','Modella e attivista nota anche nel mondo beauty.']
];
const existing=new Map(old.people.map(p=>[p.country+'|'+p.name.normalize('NFKC').toLowerCase(),p]));
const people=old.people.slice();const nextgen=[];
const normalize=p=>p.name.normalize('NFKC').toLowerCase();
for(const [country,name,category,group,sourceId,platform,handle,birth,followers,metricDate,description,birthSource] of rows){
 const entry={country,name,category,group,description,sourceId,
  audience:followers?{platform,count:followers,date:metricDate,source:sources[sourceId].url,approximate:true}:null,
  social:handle?{platform,handle}:null,
  birth:birth||null,birthSource:birthSource||null};
 nextgen.push(entry);
 const key=country+'|'+name.normalize('NFKC').toLowerCase();
 let person=existing.get(key);
 if(!person){person={id:country+'-nextgen-'+(people.length+1),name,alternate:'',country,nationality:null,
   groups:[group],category,sourceIds:[sourceId],birth:birth||null,
   verifiedLinks:[],status:'catalog',photoFile:null,sourceYear:sources[sourceId].year};
  people.push(person);existing.set(key,person);
 }else{
  if(!person.groups.includes(group))person.groups.push(group);
  if(!person.sourceIds.includes(sourceId))person.sourceIds.push(sourceId);
  if(birth&&!person.birth)person.birth=birth;
  if(['creators','actors'].includes(category)&&person.category==='music'&&person.groups.length===1)person.category=category;
 }
 if(birthSource)person.verifiedBirthSource=birthSource;
 if(description)person.editorialBio=description;
 if(entry.audience)person.audience=entry.audience;
 if(entry.social){
  let url=null;
  if(platform==='Instagram'&&/^[a-zA-Z0-9._]+$/.test(handle))url='https://www.instagram.com/'+handle+'/';
  if(platform==='TikTok'&&/^[a-zA-Z0-9._]+$/.test(handle))url='https://www.tiktok.com/@'+handle;
  if(platform==='YouTube'&&/^@[A-Za-z0-9_-]+$/.test(handle))url='https://www.youtube.com/'+handle;
  if(url){person.verifiedLinks=person.verifiedLinks||[];
   if(!person.verifiedLinks.some(x=>x[1]===url))person.verifiedLinks.unshift([platform,url])}
 }
}
const mergedSources={...old.sources,...sources};
const newGroupCount=new Set(people.flatMap(p=>p.groups.map(g=>p.country+':'+g))).size;
const countryCounts=Object.fromEntries(old.countries.map(c=>[c.id,people.filter(p=>p.country===c.id).length]));
const updated=Object.freeze({...old,people,total:people.length,sources:mergedSources,sourceCount:Object.keys(mergedSources).length,groupCount:newGroupCount,countryCounts,updated:'2026-11-08'});
window.YumeAsiaIdols=updated;
window.YumeAsiaNextGen=Object.freeze({updated:'2026-11-08',people:nextgen,sources,added:people.length-old.people.length,
 byCountry:Object.fromEntries(['in','ph'].map(c=>[c,nextgen.filter(p=>p.country===c).length])),
 note:'Statistiche: stime pubblicate dalla fonte nel mese indicato. Età solo quando documentata.'});
})();
