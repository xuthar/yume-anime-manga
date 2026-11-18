/* Yume Idols · verified official artist and group photographs · 18 Nov 2026.
 * The image URLs are from the respective official websites, NOT guessed filenames
 * or scraped social-media posts. Rights remain with the photographers/rights holders.
 * Failure to load an external image is handled by the existing neutral card fallback.
 * Never substitute a group picture for an individual member portrait.
 */
(()=>{'use strict';
 const old=window.YumeIdolsDiscovery;if(!old)return;
 const gpp='https://gpp-official.jp/profile/';
 const gppImg='https://fcdn.gpp-official.jp/img/profile/';
 const groups=[
  {name:'GPP',photo:gppImg+'profile-group_202611.jpg',source:gpp,
   bio:'Gruppo femminile giapponese di otto componenti, presentato da SM Entertainment Japan.'},
  {name:'enon',photo:'https://enon-idol.com/images/hero.jpg',source:'https://enon-idol.com/',
   bio:'Gruppo idol giapponese di cinque componenti, debutto annunciato per il 29 aprile 2026.'},
  {name:'SugarNote',photo:'https://sugarnote.jp/assets/img/group-1400.jpg',source:'https://sugarnote.jp/index.html?lang=en',
   bio:'Gruppo idol femminile giapponese; sei componenti nella fotografia ufficiale.'},
  {name:'QunQun',photo:'https://qunqun.asia/images/hero-group.webp',source:'https://qunqun.asia/',
   bio:'Gruppo idol femminile di Fukuoka: cinque componenti nella formazione presentata per il 15° anniversario.'},
  {name:"Morning Musume '26",photo:'https://helloproject.com/upload/images/17e47c0e8f5349a450f08f93fffad6e8264b2c2b4dd3a96bec988eb9f07794e4.webp',
   source:'https://helloproject.com/morningmusume/',
   bio:'Formazione 2026 delle Morning Musume, secondo la pagina ufficiale Hello! Project.'}
 ];
 // The official stage name is disambiguated by group to avoid joining unrelated performers.
 const members=[
  ['RINKA','安藤 梨花','RINKA'],
  ['HONOKA','伊藤 帆乃花','HONOKA'],
  ['ANAMI','大園 亜波','ANAMI'],
  ['MOMOKA','栗田 桃花','MOMOKA'],
  ['MIKA','髙宮 美香','MIKA'],
  ['MIA','ニュービー 未亜','MIA'],
  ['SARA','宮崎 晃','SARA'],
  ['LUNA','渡辺 瑠奈','LUNA']
 ].map(([stage,alternate,file])=>({
  name:stage+' (GPP)',alternate,group:'GPP',
  photo:gppImg+'profile__'+file+'_202611.jpg'+(file==='MIA'?'?20261104=':''),
  source:gpp,bio:'Componente di GPP · ritratto individuale dalla pagina ufficiale.'
 }));
 const rows=[
  ...groups.map(p=>({...p,category:'groups',group:null})),
  ...members.map(p=>({...p,category:'music'}))
 ];
 const existing=new Map(old.people.map((p,i)=>[p.category+'|'+p.name.toLocaleLowerCase('en'),i]));
 const people=old.people.slice();let added=0,enhanced=0;
 for(const r of rows){
  if(!/^https:\/\//.test(r.photo)||!/^https:\/\//.test(r.source))continue;
  const key=r.category+'|'+r.name.toLocaleLowerCase('en');
  const index=existing.get(key);
  const attrs={
   editorialPhoto:r.photo,editorialPhotoSource:r.source,
   editorialPhotoSourceLabel:'Sito ufficiale · foto promozionale (diritti riservati)',
   editorialPhotoAlternates:[],
   portraitReviewedAt:'2026-11-18',
   photoReviewedAt:'2026-11-18',
   officialProfile:r.source
  };
  if(index!==undefined){
   const prior=people[index];
   people[index]={...prior,...attrs,editorialPhotoAlternates:
    [prior.editorialPhoto,...(prior.editorialPhotoAlternates||[])].filter(x=>typeof x==='string'&&x!==r.photo),
    editorialBio:prior.editorialBio||r.bio,
    alternate:prior.alternate||r.alternate||'',group:prior.group||r.group||null};
   enhanced++;
  }else{
   people.push({name:r.name,alternate:r.alternate||'',group:r.group||null,
    category:r.category,source:r.source,sourceLabel:'Profilo ufficiale',
    sourceKind:'sito ufficiale',editorialBio:r.bio,verifiedSocials:[],...attrs});
   existing.set(key,people.length-1);added++;
  }
 }
 window.YumeIdolsDiscovery=Object.freeze({...old,people,updated:'2026-11-18',
  stats:{...old.stats,entries:people.length}});
 window.YumeOfficialPortraitsNov18=Object.freeze({date:'2026-11-18',added,enhanced,
  groups:groups.length,memberPortraits:members.length,sources:[gpp,'https://enon-idol.com/','https://sugarnote.jp/','https://qunqun.asia/','https://helloproject.com/morningmusume/']});
})();
