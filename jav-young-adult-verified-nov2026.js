/* Yume JAV: adult-only verified portrait and social batch, 2026-11-10.
   Wikimedia individual categories document adulthood and the depicted performer.
   Portraits retain Commons source/license/author, no explicit stills or hotlinks to film posters.
   Do not claim official social accounts unless tied to an artist-controlled profile.
 */
(()=>{'use strict';const old=window.YumeIdolsDiscovery;if(!old?.people)return;
const rows=[{"name":"Emika Shirakami","aliases":["Shirakami Emika","白上咲花"],"japanese":"白上咲花","born":"2003-12-27","debut":2024,"source":"https://commons.wikimedia.org/wiki/Category:Emika_Shirakami","file":"Kindai Mahjong Swimsuit Festival (September 30, 2026)IMG 9929.jpg","license":"CC BY 4.0","socials":[["X","https://x.com/emika_shirakami"],["Instagram","https://www.instagram.com/emika_shirakami/"]],"socialProof":"https://x.com/emika_shirakami/highlights"},{"name":"Shiori Yorimoto","aliases":["依本しおり"],"japanese":"依本しおり","born":"1998-10-01","debut":2024,"source":"https://commons.wikimedia.org/wiki/Category:Shiori_Yorimoto","file":"Trend Girls Photo Session (September 28, 2025) IMG 3217.jpg","license":"CC BY 4.0","socials":[["X","https://x.com/yorimoto_s"]],"socialProof":"https://x.com/yorimoto_s"},{"name":"Noa Araki","aliases":["新木希空"],"japanese":"新木希空","born":"2004-10-10","debut":2025,"source":"https://commons.wikimedia.org/wiki/Category:Noa_Araki","file":null,"license":null,"socials":[["X","https://x.com/araki_noa_"],["Instagram","https://www.instagram.com/araki_noa/"]],"socialProof":"https://x.com/araki_noa_"},{"name":"Nao Satsuki","aliases":["さつきなお","Nao"],"japanese":"さつきなお","born":"2002-06-16","debut":2024,"source":"https://commons.wikimedia.org/wiki/Category:Nao_Satsuki_by_year","file":"Trend Girls Photo Session (May 3, 2025)IMG 5771.jpg","license":"CC BY-SA 4.0","socials":[]}];
const normalize=s=>String(s||'').normalize('NFKC').normalize('NFKD').toLowerCase().replace(/[\u0300-\u036f\s・･._'’()\-]/g,'');
const people=old.people.slice(),added=[],updated=[];
for(const row of rows){
 const keys=[row.name,...row.aliases].map(normalize);
 const i=people.findIndex(p=>p.category==='jav'&&[p.name,p.alternate,...(p.otherStageNames||[])].some(n=>keys.includes(normalize(n))));
 const photoSource=row.file?'https://commons.wikimedia.org/wiki/File:'+encodeURIComponent(row.file.replaceAll(' ','_')):null;
 const basic={adultCountry:'JP',adultVerified:true,professionYearCheck:Number(row.born.slice(0,4)),verifiedBirthDate:row.born,
   ageSourceStatus:'Data di nascita attribuita alla categoria Wikimedia Commons, verificata 2026-11-10',
   javYoungAdultSource:row.source,source:row.source,sourceLabel:'Wikimedia Commons · profilo professionale nominativo',
   sourceKind:'Identità adulta e foto documentate in Wikimedia Commons',
   editorialBio:'Attrice JAV adulta · debutto riportato nei repertori professionali: '+row.debut,
   verifiedBiographySource:row.source,verifiedSocials:row.socials,officialProfile:row.socialProof||row.source,
   ...(row.file?{photoFile:row.file,photoSource,photoLicense:row.license+' · Bject · Wikimedia Commons; attribuzione obbligatoria'}:{})};
 if(i>=0){const p=people[i];people[i]={...p,...basic,name:p.name,alternate:p.alternate||row.japanese,photoFile:p.photoFile||basic.photoFile||null,photoSource:p.photoSource||basic.photoSource||null,verifiedSocials:[...new Map([...(p.verifiedSocials||[]),...row.socials].map(x=>[x[1],x])).values()]};updated.push(row.name)}
 else{people.push({category:'jav',name:row.name,alternate:row.japanese,platform:'JAV / AV',...basic});added.push(row.name)}
}
window.YumeIdolsDiscovery=Object.freeze({...old,people,updated:'2026-11-10',stats:{...old.stats,entries:people.length}});
window.YumeJAVYoungAdultVerified2026=Object.freeze({reviewed:rows.length,added,updated,portraits:rows.filter(x=>x.file).length,officialSocials:rows.filter(x=>x.socials.length).length});
})();