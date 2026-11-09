/* Yume · additional Japanese AV professionals from personally attributed Commons files.
 * Verified adult birth years from biography/category, no explicit media.
 * The high-quality original has a link to its Commons license.
 */
(()=>{'use strict';
const d=window.YumeIdolsDiscovery;if(!d)return;
const rows=[
 ['Akiho Yoshizawa','吉沢明歩','1984','Akiho Yoshizawa (2017, cropped).jpg','https://commons.wikimedia.org/wiki/File:Akiho_Yoshizawa_(2017,_cropped).jpg'],
 ['Maria Ozawa','小澤マリア','1986','Maria Ozawa.jpg','https://commons.wikimedia.org/wiki/File:Maria_Ozawa.jpg'],
 ['Yuki Yoshizawa','吉澤友貴','1992','Fresh Festival 2023 in Shirakobato Water Park IMG 1791.jpg','https://commons.wikimedia.org/wiki/Category:Yuki_Yoshizawa'],
 ['Ria Yoshizawa','吉沢里彩','2003','Trend Girls Photo Session (May 4, 2025)IMG 3909.jpg','https://commons.wikimedia.org/wiki/Category:Ria_Yoshizawa']
];
const key=x=>String(x||'').normalize('NFKC').normalize('NFKD').toLowerCase().replace(/[\\u0300-\\u036f\\s・･._'()]/g,'');
const existing=new Set(d.people.filter(p=>p.category==='jav').flatMap(p=>[key(p.name),key(p.alternate||'')]));
const people=d.people.slice(),added=[];
for(const [name,alternate,year,file,source] of rows){
 if(Number(year)>2005||existing.has(key(name))||existing.has(key(alternate)))continue;
 people.push({category:'jav',name,alternate,adultVerified:true,professionYearCheck:Number(year),
  source,sourceKind:'Wikimedia Commons · performer adulta identificata',
  sourceLabel:'Commons · fonte fotografica nominativa',editorialBio:'Japanese AV · film e apparizioni pubbliche',
  platform:'JAV / AV',photoFile:file,photoSource:'https://commons.wikimedia.org/wiki/File:'+encodeURIComponent(file.replace(/ /g,'_'))});
 added.push(name);existing.add(key(name));existing.add(key(alternate));
}
window.YumeIdolsDiscovery=Object.freeze({...d,people,stats:{...d.stats,entries:people.length},updated:'2026-11-09'});
window.YumeJAVNovember2026=Object.freeze({added,updated:'2026-11-09',portraitFiles:rows.length});
})();