/* Yume Gravure · editorial cross-reference, November 2026.
 * gravureindex.com/idols/ was inaccessible (web and DNS, 2026-11-09);
 * it is NOT represented as an extracted or complete source.
 * Names below were checked instead in Gradoll.com's published DOB cohorts:
 * 1980s, 1990s and specifically birth year 2000. No under-18 profiles.
 * Only non-explicit professional metadata, no site thumbnails or copied photos.
 * Avoid stage names too generic to identify and products marked 18+ on the list.
 */
(()=>{'use strict';
const previous=window.YumeIdolsDiscovery;
if(!previous||!Array.isArray(previous.people))return;
const cohorts={"2000":["Rei Ikeda","Yukina Uehara","Nami Fujiwara","Sakura Ootawa","Asami Kondo","Momona Kamise","Nanoha Hasumi","Riyu Hinata","Asumi Sakakibara","Nagisa Sano","Rina Aoi","Hikari Kuroki","Nagisa Tachibana","Asuka Nekomiya","Fumi Murasame","Takara Suzuki","Fuuka Tsuchida","Yoshino Chitose","Yuuko Tsubakino","Rinna Umi","Yukie Fujioka","Noa Shiraki","Kano Hinatsu","Moka Hayashida","Nina Kurumi","Mari Asahina","Ayu Hazaki","Mio Sakuragi","Shiori Nakane","Kaname Mizuki","Sachiko Aizawa","Marina Asakawa","Minami Hori","Mirei Nahashima"],"1980s":["Asami Kumakiri","Nana Kasai","Yoko Kumada","Misumi Shiochi","Emi Ito","Minami Matsuzaka","Miri Hanai","Nana Hiratsuka","Moe Wakaki","Kaede Shimizu","Yuki Suzuki","Rei Toda","Masora Kanae","Yuika Anzai","Natsuki Ikeda","Risa Yoshiki","Saki Suzuki","Miho Abe","Ayaka Noda","Saki Yanase","Chika Tono","Risa Mitsui","Shizuka Nakamura","Asami Tada","Ruri Shinato","Mai Nishida","Yuu Mishima","Anna Konno","Mizuho Uchida","Mizuho Hata","Niko Nanami"],"1990s":["Narumi Okawa","Megumi Suzumoto","Rina Amatsuma","Fumina Suzuki","Wakana Shiba","Mai Ishioka","Rin Takahashi","Rui Kiriyama","Shihomi Yoshino","Saki Sakurai","Asuka Kishi","Yuri Hamada","Aya Hazuki","Ayumi Koyanagi","Miyu Sano","Tomo Todo","Usako Kurusu","Yuria Fujino","Sachie Okamura","Miho Miyata","Seiko Kirishima","Yumi Asahina","Tsugu Manaka","Yuka Takase","Sawako Shirakabe","Yume Hazuki","Ai Shinozaki","Misato Shimizu","Uki Satake","Ayano Sasai","Riko Suzuhara","Tomomi Morisaki","Yumi Kureha","Natsuri Okazato","Miyako Sono"]};
const sourceByCohort={"2000":"https://www.gradoll.com/en/idols/lists/born-2000s","1980s":"https://www.gradoll.com/en/idols/lists/born-1980s","1990s":"https://www.gradoll.com/en/idols/lists/born-1990s"};
const normalize=s=>String(s||'').normalize('NFKC').normalize('NFKD')
 .toLocaleLowerCase('en').replace(/[\u0300-\u036f\s・･._\-’'()]/g,'');
const people=previous.people.slice(),all=new Map();
for(let i=0;i<people.length;i++){
 const p=people[i];
 // Never merge a JAV profile with a gravure entry solely by name.
 if(p.category!=='gravure')continue;
 for(const n of [p.name,p.alternate||''].filter(Boolean))all.set(normalize(n),i);
}
const added=[],enriched=[],sourceItems=[];
for(const [cohort,artistNames] of Object.entries(cohorts)){
 const source=sourceByCohort[cohort];
 for(const name of artistNames){
  const key=normalize(name);if(!name||!key||/^(?:Umi|Marika|Ruirui|Wanko)$/i.test(name))continue;
  sourceItems.push(name);
  const birthYearLabel=cohort==='2000'?'2000':cohort;
  const match=all.get(key);
  if(match!==undefined){
   const p=people[match];
   people[match]={...p,
    gravureCohort:birthYearLabel,
    gravureEditorialSources:[...new Set([...(p.gravureEditorialSources||[]),source])],
    gravureIndexVerification:'Gradoll · cohort age documented',
    ageVerified:p.ageVerified||true};
   enriched.push(name);continue
  }
  const person={
   category:'gravure',name,alternate:'',country:'JP',
   source,sourceLabel:'Gradoll · Gravure Idols · nate '+birthYearLabel,
   sourceKind:'Repertorio editoriale di modelle maggiorenni · nascita su scheda pubblica',
   sourceYear:'2026',
   officialProfile:null,
   editorialBio:'Modella e talento gravure giapponese · repertorio pubblico. Nascita: '+birthYearLabel+
    '. Presenza nella fonte storica, attività attuale non verificata.',
   gravureCohort:birthYearLabel,gravureEditorialSources:[source],
   gravureIndexVerification:'Gradoll · anno o decennio di nascita indicato',
   ageVerified:true,photoFile:null,photoSource:null
  };
  people.push(person);all.set(key,people.length-1);added.push(name);
 }
}
window.YumeIdolsDiscovery=Object.freeze({...previous,people,
 stats:{...previous.stats,entries:people.length},updated:'2026-11-09'});
window.YumeGravure2026Index=Object.freeze({
 updated:'2026-11-09',requestedSource:'https://gravureindex.com/idols/',
 requestedSourceAccessible:false,actualSources:sourceByCohort,
 reviewed:sourceItems.length,added,addedCount:added.length,enriched,
 note:'This is a documented adult-model expansion from Gradoll, NOT the complete gravureindex.com catalog. Photos remain Commons licensed or linked source only.'
});
})();