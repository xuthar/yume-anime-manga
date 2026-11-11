/* JAV 18+: public professional social accounts, reviewed 2026-11-11.
 * Source attribution is independent of nude/explicit media. Social links
 * are professional profiles, not guarantees of future account ownership.
 */
(()=>{'use strict';const old=window.YumeIdolsDiscovery;if(!old?.people)return;
const records=[{"name":"Moe Amatsuka","alternates":["天使もえ","Amatsuka Moe"],"birth":"1994-07-10","official":"https://amatsuka.moe/","socials":[["X","https://x.com/amatsuka_moe"],["Instagram","https://www.instagram.com/amatsuka.moe/"]],"evidence":"https://amatsuka.moe/"},{"name":"Eimi Fukada","alternates":["深田えいみ"],"birth":null,"official":"https://fukadaeimi.com/","socials":[["X","https://x.com/fukada0318"],["Instagram","https://www.instagram.com/eimi0318/"],["TikTok","https://www.tiktok.com/@fukada0318"]],"evidence":"https://fukadaeimi.com/news/detail/3"}];
const norm=x=>String(x||'').normalize('NFKC').normalize('NFKD').toLowerCase().replace(/[\u0300-\u036f\s・･._'’()\-]/g,'');
const people=old.people.slice(),updated=[],unmatched=[];
for(const r of records){const keys=[r.name,...r.alternates].map(norm);
const i=people.findIndex(p=>p.category==='jav'&&[p.name,p.alternate,...(p.otherStageNames||[])].some(n=>keys.includes(norm(n))));
if(i===-1){unmatched.push(r.name);continue}
const p=people[i],socials=new Map([...(p.verifiedSocials||[]),...r.socials].map(([platform,url])=>[platform+'|'+url,[platform,url]]));
people[i]={...p,verifiedSocials:[...socials.values()],verifiedBiographySource:r.official||p.verifiedBiographySource||r.evidence,officialProfile:r.official||p.officialProfile,verifiedBirthDate:r.birth||p.verifiedBirthDate,professionalSocialSource:r.evidence};
updated.push(r.name)}
window.YumeIdolsDiscovery=Object.freeze({...old,people,updated:'2026-11-11',stats:{...old.stats,entries:people.length}});
window.YumeJAVSocialAudit2026=Object.freeze({reviewed:records.length,updated,unmatched,date:'2026-11-11'});
})();