/* Yume · global adult performers and OnlyFans public creators (9 Nov 2026)
 * Biographical/public professional index, NOT an explicit-image gallery.
 * Women only. Distinguish film careers from OnlyFans creator activity.
 * Years are minimum-adult editorial checks; do not show unverified ages.
 * Source profile: Wikimedia Commons category for public-event portraits,
 * plus published editorial reporting for OnlyFans associations.
 * Direct monetized-service links, illegal leaks and scraped photos excluded.
 */
(()=>{'use strict';
const old=window.YumeIdolsDiscovery;if(!old)return;
/* Curated from established public bios, Commons and platform announcements.
 * Scope: verified birth/affiliation in Japan, the Philippines or Myanmar.
 * Country means documented origin/nationality, not where they currently live.
 * Association with OnlyFans can be historical, NOT necessarily current.
 * Portrait filenames below refer to non-explicit Commons images only. */
const records=[
 ['adult','Rae Lil Black',1996,'Rae Lil Black','Rae Lil Black 2021 (cropped).png','Giappone · ex performer AV e creator','JP','https://en.wikipedia.org/wiki/Rae_Lil_Black'],
 ['adult','Marica Hase',1981,'Marica Hase','Marica Hase at AVN Awards 2016 (26606425451).jpg','Giappone · attrice AV e modella','JP','https://commons.wikimedia.org/wiki/Category:Marica_Hase'],
 ['adult','CJ Miles',1984,null,null,'Filippine · attrice AV e creator','PH','https://www.imdb.com/name/nm5285256/bio/'],
 ['adult','Maria Nagai',1996,null,null,'Giappone · attrice JAV e creator','JP','https://www.imdb.com/name/nm10823895/bio/'],
 ['adult','Unpai',1994,null,null,'Giappone · performer AV e social creator','JP','https://sirenindex.com/models/unpai'],
 ['onlyfans','Rae Lil Black',1996,'Rae Lil Black','Rae Lil Black 2021 (cropped).png','Giappone · archivio storico, non attività attuale confermata','JP','https://en.wikipedia.org/wiki/Rae_Lil_Black'],
 ['onlyfans','Nang Mwe San',1990,'Nang Mwe San','Dr Nang Mwe San, IG model.jpg','Myanmar · modella e creator ad abbonamento','MM','https://coconuts.co/yangon/news/being-a-doctor-made-her-parents-proud-going-on-onlyfans-made-her-rich/'],
 ['onlyfans','Anri Okita',1986,'Anri Okita','Anri Okita at AVN Adult Entertainment Expo 2016 (25545790092).jpg','Giappone · ex attrice AV e creator','JP','https://linktr.ee/Anri_Okita_'],
 ['onlyfans','Unpai',1994,null,null,'Giappone · TikToker e creator ad abbonamento','JP','https://www.onlyseeka.com/creators/unpai3'],
 ['onlyfans','Maria Nagai',1996,null,null,'Giappone · modella, attrice JAV e creator','JP','https://www.vicesnob.com/creators/maria-nagai/'],
 ['onlyfans','Marica Hase',1981,'Marica Hase','Marica Hase at AVN Awards 2016 (26606425451).jpg','Giappone · attrice AV e creator','JP','https://www.vicesnob.com/creators/marica-hase/'],
 ['onlyfans','CJ Miles',1984,null,null,'Filippine · attrice AV e creator','PH','https://www.vicesnob.com/best-filipina-onlyfans-creators/']
];
const norm=t=>String(t||'').normalize('NFKC').normalize('NFKD').toLowerCase().replace(/[\u0300-\u036f\s・･._\-’'()]/g,'');
const existing=new Map(old.people.map((p,i)=>[p.category+'|'+norm(p.name),i]));
const blocked=new Set(old.people.filter(p=>p.teenSafe||p.birth&&Number(String(p.birth).slice(0,4))>2007)
  .flatMap(p=>[norm(p.name),norm(p.alternate||'')]).filter(Boolean));
const people=old.people.slice(),curated=[],found=new Set();
for(const [category,name,birthYear,commonsCategory,file,focus,country,publicSource] of records){
 const nk=norm(name),key=category+'|'+nk;
 if(found.has(key)||blocked.has(nk)||!Number.isInteger(birthYear)||birthYear>2005||birthYear<1940||!new Set(["JP","PH","MM","KR","CN","TW","HK","TH","VN","ID","MY","SG","KH","LA","BD","IN","PK","NP","LK","MN","KZ","UZ"]).has(country))continue;
 found.add(key);
 const cc=commonsCategory?'https://commons.wikimedia.org/wiki/Category:'+encodeURIComponent(commonsCategory.replace(/ /g,'_')):null;
 const source=publicSource||cc;
 const p={category,name,alternate:'',source,sourceLabel:'Biografia professionale / ritratto attribuito',
  sourceKind:category==='onlyfans'?'creator digitale 18+ · attività storica o pubblica':'cinema per adulti · attività professionale',
  adultVerified:true,professionYearCheck:birthYear,adultCountry:country,editorialBio:focus,
  commonsCategory,photoFile:file||null,photoSource:file?'https://commons.wikimedia.org/wiki/File:'+encodeURIComponent(file.replace(/ /g,'_')):null,
  officialProfile:cc,platform:category==='onlyfans'?'OnlyFans · archivio professionale':'AV / cinema adulto',isOnlyFans:category==='onlyfans'};
 const idx=existing.get(key);
 if(idx!==undefined){people[idx]={...people[idx],...p,source:people[idx].source||source};}
 else {people.push(p);existing.set(key,people.length-1);}
 curated.push({name,category,commonsCategory,file,year:birthYear,focus,country,source});
}
window.YumeIdolsDiscovery=Object.freeze({...old,people,updated:'2026-11-09',
 stats:{...old.stats,entries:people.length},regionPolicy:'solo Asia, provenienza documentata'});
window.YumeAdultGlobal2026=Object.freeze({updated:'2026-11-09',records:curated,
 byCategory:{adult:curated.filter(x=>x.category==='adult').length,onlyfans:curated.filter(x=>x.category==='onlyfans').length},
 policy:'Solo artiste con provenienza documentata da paesi asiatici; 18+; immagini Commons non esplicite; Young Stars separate'});
})();