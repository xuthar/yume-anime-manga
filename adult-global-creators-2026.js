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
const records=[
 // category | stage/public name | birth year (guard only) | Commons category | pinned non-explicit photo | focus | country
 ['adult','Sasha Grey',1988,'Sasha Grey',null,'Cinema per adulti · cinema e streaming','US'],
 ['adult','Riley Reid',1991,'Riley Reid','Riley Reid 2019 by Glenn Francis (cropped).jpg','AV statunitense · produzioni per adulti','US'],
 ['adult','Angela White',1985,'Angela White','Angela White 2019 by Glenn Francis (cropped).jpg','AV australiana · regia e produzione','AU'],
 ['adult','Abella Danger',1995,'Abella Danger','Abella Danger 2016.jpg','AV americana · produzione video','US'],
 ['adult','Mia Khalifa',1993,'Mia Khalifa','Mia Khalifa in 2019 (Enhanced).jpg','Ex AV · media e personalità digitale','LB'],
 ['adult','Lana Rhoades',1996,'Lana Rhoades',null,'Ex AV · social media e creator','US'],
 ['adult','Alexis Texas',1985,'Alexis Texas',null,'AV · produzione e social','US'],
 ['adult','Lisa Ann',1972,'Lisa Ann',null,'Ex AV · imprenditoria e media','US'],
 ['adult','Jenna Jameson',1974,'Jenna Jameson',null,'Ex AV · media','US'],
 ['adult','Stormy Daniels',1979,'Stormy Daniels',null,'AV · regia e spettacolo','US'],
 ['adult','Eva Elfie',2000,'Eva Elfie',null,'AV europea · creator','RU'],
 ['adult','Emily Willis',1998,'Emily Willis',null,'Cinema per adulti · archivio professionale','US'],
 ['adult','Adriana Chechik',1991,'Adriana Chechik','Adriana Chechik 2019 by Glenn Francis (cropped).jpg','Ex AV · streaming','US'],
 ['adult','Valentina Nappi',1990,'Portrait photographs of Valentina Nappi','Valentina Nappi 2016.jpg','AV italiana · cinema e media','IT'],
 ['adult','Maitland Ward',1977,'Maitland Ward',null,'Cinema · produzioni per adulti','US'],
 ['adult','Kira Noir',1994,'Kira Noir','Kira Noir, HRU 2022 01.jpg','AV americana · premi professionali','US'],
 ['adult','Kendra Sunderland',1995,'Kendra Sunderland',null,'AV e modella','US'],
 ['adult','Brandi Love',1973,'Brandi Love',null,'Cinema per adulti · impresa','US'],
 ['adult','Cherie DeVille',1978,'Cherie DeVille',null,'AV americana · produzioni','US'],
 ['adult','Dani Daniels',1989,'Dani Daniels',null,'AV · arte e produzione','US'],
 ['adult','Tori Black',1988,'Tori Black',null,'Cinema per adulti · premi','US'],
 ['adult','Mia Malkova',1992,'Mia Malkova','Mia Malkova 2016.jpg','AV · creator digitale','US'],
 ['adult','Gianna Dior',1997,'Gianna Dior',null,'AV · premi professionali','US'],
 ['adult','Jewelz Blu',1994,'Jewelz Blu',null,'AV · spettacolo','DE'],
 ['adult','Vanna Bardot',1999,'Vanna Bardot',null,'AV · premi professionali','US'],
 ['adult','Ella Hughes',1995,'Ella Hughes','Ella Hughes at the 2019 Xbiz Europa Awards.jpg','AV britannica · premi','GB'],
 ['adult','Tera Patrick',1976,'Tera Patrick',null,'Ex AV · produzione','US'],
 ['adult','Sophie Dee',1984,'Sophie Dee',null,'AV e creator','GB'],
 ['adult','Tasha Reign',1989,'Tasha Reign',null,'Cinema per adulti · media','US'],
 ['adult','Kenzie Reeves',1997,'Kenzie Reeves',null,'AV · spettacolo','US'],
 ['adult','Kendra Lust',1978,'Kendra Lust',null,'AV americana · regia','US'],
 ['adult','Joanna Angel',1980,'Joanna Angel',null,'Cinema per adulti · regia','US'],
 ['adult','Julia Ann',1969,'Julia Ann',null,'Ex AV · premi professionali','US'],
 ['adult','Lauren Phillips',1987,'Lauren Phillips (porn actress)',null,'AV · produzioni','US'],
 ['adult','Katsuni',1979,'Katsuni',null,'Ex AV francese · spettacolo','FR'],
 ['adult','Ela Darling',1986,'Ela Darling','Ela Darling 2019 by Glenn Francis (cropped).jpg','AV · innovazione media','US'],
 ['adult','Lily Phillips',2001,'Lily Phillips',null,'Creator adulta · produzioni digitali','GB'],
 ['adult','Bonnie Blue',1999,'Bonnie Blue (actress)',null,'Creator adulta · social','GB'],
 ['adult','Rae Lil Black',1996,'Rae Lil Black',null,'AV · creator video','JP'],
 ['adult','Jenna Haze',1982,'Jenna Haze',null,'Ex AV · produzione','US'],
 ['adult','Romi Rain',1988,'Romi Rain',null,'Cinema per adulti','US'],
 ['adult','Abella Anderson',1988,'Abella Anderson',null,'Cinema per adulti · premi','CU'],
 ['adult','Anna Claire Clouds',1995,'Anna Claire Clouds',null,'AV · premi','US'],
 ['adult','Penny Barber',1985,'Penny Barber',null,'AV · cinema','US'],
 ['adult','Leah Gotti',1997,'Leah Gotti',null,'AV statunitense','US'],
 ['adult','Jessica Drake',1974,'Jessica Drake',null,'Ex AV · regia e produzione','US'],
 // OnlyFans = association with the platform, not a claim of pornographic film work
 ['onlyfans','Amouranth',1993,'Amouranth','Amouranth in 2022 05.png','Streaming · creator ad abbonamento','US'],
 ['onlyfans','Belle Delphine',1999,'Belle Delphine','Belle Delphine - 2020-b (cropped).png','Creator · cosplay · contenuti ad abbonamento','GB'],
 ['onlyfans','Iggy Azalea',1990,'Iggy Azalea','Iggy Azalea.jpg','Musica · progetto digitale ad abbonamento','AU'],
 ['onlyfans','Bella Thorne',1997,'Bella Thorne',null,'Attrice · contenuti creator ad abbonamento','US'],
 ['onlyfans','Tana Mongeau',1998,'Tana Mongeau','Tana Mongeau.png','Vlog · social · creator ad abbonamento','US'],
 ['onlyfans','Denise Richards',1971,'Denise Richards','Denise Richards (47364897421).jpg','Cinema e televisione · creator ad abbonamento','US'],
 ['onlyfans','Lottie Moss',1998,'Lottie Moss','2022 - Q&A PO1 4993 (52472354259).jpg','Moda · social · creator ad abbonamento','GB'],
 ['onlyfans','Key Alves',2000,'Key Alves',null,'Pallavolo · reality · creator ad abbonamento','BR'],
 ['onlyfans','Nala Ray',1997,'Nala Ray',null,'Creator · presenza storica su OnlyFans','US'],
 ['onlyfans','Yanet García',1990,'Yanet García',null,'TV · social · creator ad abbonamento','MX'],
 ['onlyfans','Demi Rose',1995,'Demi Rose',null,'Moda · influencer · creator ad abbonamento','GB'],
 ['onlyfans','Rae Lil Black',1996,'Rae Lil Black',null,'Creator · AV e streaming','JP'],
 ['onlyfans','Bhad Bhabie',2003,'Bhad Bhabie',null,'Musica · creator ad abbonamento','US'],
 ['onlyfans','Sophie Rain',2004,null,null,'Creator digitale · OnlyFans','US'],
 ['onlyfans','Corinna Kopf',1995,'Corinna Kopf',null,'Social · gaming · storico OnlyFans','US'],
 ['onlyfans','Camilla Araujo',2002,null,null,'Creator video · OnlyFans','BR'],
 ['onlyfans','Anna Paul',1999,'Anna Paul (social media personality)',null,'Lifestyle · creator ad abbonamento','AU'],
 ['onlyfans','Megan Barton-Hanson',1994,'Megan Barton-Hanson',null,'Reality TV · creator ad abbonamento','GB'],
 ['onlyfans','Amber Rose',1983,'Amber Rose','Amber Rose 2018 by Glenn Francis (cropped).jpg','Moda · media · creator ad abbonamento','US'],
 ['onlyfans','Larsa Pippen',1974,'Larsa Pippen',null,'TV e social · creator ad abbonamento','US'],
 ['onlyfans','Drea de Matteo',1972,'Drea de Matteo',null,'Attrice · creator ad abbonamento','US'],
 ['onlyfans','Kerry Katona',1980,'Kerry Katona',null,'Musica · TV · creator ad abbonamento','GB'],
 ['onlyfans','Meg Turney',1987,'Meg Turney',null,'Cosplay · creator ad abbonamento','US'],
 ['onlyfans','Jessica Nigri',1989,'Jessica Nigri','Jessica Nigri (12163892794).jpg','Cosplay · contenuti creator ad abbonamento','US'],
 ['onlyfans','Lily Phillips',2001,'Lily Phillips',null,'Creator adulta · OnlyFans','GB'],
 ['onlyfans','Bonnie Blue',1999,'Bonnie Blue (actress)',null,'Creator adulta · OnlyFans','GB'],
 ['onlyfans','Nang Mwe San',1990,'Nang Mwe San','American model Nang Mwe San.jpg','Moda · creator ad abbonamento','MM'],
 ['onlyfans','Denise Richards',1971,'Denise Richards',null,'Cinema · creator digitale','US'],
 ['onlyfans','Mia Khalifa',1993,'Mia Khalifa',null,'Media · creator ad abbonamento','LB'],
 ['onlyfans','Lana Rhoades',1996,'Lana Rhoades',null,'Social · creator ad abbonamento','US']
];
const norm=t=>String(t||'').normalize('NFKC').normalize('NFKD').toLowerCase().replace(/[\u0300-\u036f\s・･._\-’'()]/g,'');
const existing=new Map(old.people.map((p,i)=>[p.category+'|'+norm(p.name),i]));
const blocked=new Set(old.people.filter(p=>p.teenSafe||p.birth&&Number(String(p.birth).slice(0,4))>2007)
  .flatMap(p=>[norm(p.name),norm(p.alternate||'')]).filter(Boolean));
const people=old.people.slice(),curated=[],found=new Set();
for(const [category,name,birthYear,commonsCategory,file,focus,country] of records){
 const nk=norm(name),key=category+'|'+nk;
 if(found.has(key)||blocked.has(nk)||!Number.isInteger(birthYear)||birthYear>2005||birthYear<1940)continue;
 found.add(key);
 const cc=commonsCategory?'https://commons.wikimedia.org/wiki/Category:'+encodeURIComponent(commonsCategory.replace(/ /g,'_')):null;
 const source=cc||(category==='onlyfans'?'https://www.maxim.com/partner/the-best-onlyfans-models-to-follow-in-2026-according-to-onlyguider/':'https://commons.wikimedia.org/wiki/Category:Winners_of_the_XBIZ_Award');
 const p={category,name,alternate:'',source,sourceLabel:cc?'Wikimedia Commons · categoria personale':'Rassegna pubblica 2026 · piattaforma creator',
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
 stats:{...old.stats,entries:people.length}});
window.YumeAdultGlobal2026=Object.freeze({updated:'2026-11-09',records:curated,
 byCategory:{adult:curated.filter(x=>x.category==='adult').length,onlyfans:curated.filter(x=>x.category==='onlyfans').length},
 policy:'Women 18+ only; no crosslinks to Young Stars; portrait photos non-explicit and source licensed'});
})();