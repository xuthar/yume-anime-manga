/* Yume · Young TikTok generation across Idols / Asia / Young Stars
 * 08 Nov 2026. Public performers only; no inferred ages or private accounts.
 * Group channels are explicitly labeled GROUP and never represented as a child's
 * personal account. No crosslinks with gravure, JAV or adult catalogues.
 * Portraits: only separately licensed and named Wikimedia Commons files.
 */
(()=>{'use strict';
const refs={
 jp:'https://influencer.codigital.co.jp/insights/teen-genz-influencers-japan/',
 jprank:'https://jpn.tik-tok-rank.com/female',
 jppress:'https://newsroom.tiktok.com/tiktok-creator-directs-a-new-vertical-film-sachi-to-oto-which-is-shot-entirely-on-a-smartphone?lang=ja-JP',
 jpoto:'https://starray-p.com/artist/otoha',
 jpyua:'https://ivi-e.com/artist/yua-kobayashi',
 vn:'https://tkmetrics.com/creators/country/vietnam/',
 vnlist:'https://www.modash.io/find-influencers/tiktok/vietnam/female',
 id:'https://jkt48.com/news/pengumuman-mengenai-akun-media-sosial-generasi-12-jkt48',
 idu16:'https://jkt48.com/news/pengumuman-mengenai-akun-media-sosial-member-jkt48',
 kr:'https://linktr.ee/illit_official',
 th:'https://www.youtube.com/watch?v=ZxGW3Yxw0z8',
 pk:'https://creatordb.app/creatorstats/dananeerr/',
 ph:'https://hypeauditor.com/top-tiktok-philippines/',
 pl:'https://www.gmanetwork.com/entertainment/showbiznews/caprice-cayetano-hits-1m-followers-on-tiktok/127379'
};
// Japanese creators: a standalone agency/editorial directory. Source-linked without
// fabricating handles: an account is linked only when confirmed by TikTok/media.
const japan=[
 ['景井ひな','Hina Kagei','1999-02-19','TikTok, acting, short video','jppress','kageihina'],
 ['白石乙華','Otoha Shiraishi','2009-02-10','Teen creator · modelling · short video','jpoto',null],
 ['小林ゆあ','Yua Kobayashi','2008-06-04','Teen creator · fashion · TikTok','jpyua',null],
 ['本望あやか','Ayaka Honmou',null,'Gen Z · TikTok creator','jp',null],
 ['おさき','Osaki',null,'Gen Z · vlog · TikTok','jp',null],
 ['古園井寧々','Nene Kozonoi',null,'Gen Z · fashion · TikTok','jp',null],
 ['長浜広奈','Hirona Nagahama',null,'Gen Z · TikTok · fashion','jp',null],
 ['清水ゆうり','Yuuri Shimizu',null,'Teen video creator · Melpuchi','jp',null],
 ['岡本莉來','Rira Okamoto',null,'Teen creator · short video','jp',null],
 ['萌々花','Momoka',null,'Teen creator · fashion · short video','jp',null],
 ['なえなの','Naenano',null,'Lifestyle · Gen Z video creator','jprank','naenano'],
 ['MINAMI','MINAMI',null,'Dance · lifestyle · short video','jprank','minami.0819'],
 ['桜','Sakura',null,'Dance · lifestyle · short video','jprank','0808sakura']
];
const norm=v=>String(v||'').normalize('NFKC').normalize('NFKD')
 .toLowerCase().replace(/[\u0300-\u036f\s・･._\-’'()]/g,'');
let addedJP=0,addedAsia=0,updatedAsia=0;
if(window.YumeIdolsDiscovery){
 const d=window.YumeIdolsDiscovery,people=d.people.slice();
 const known=new Set(people.map(p=>norm(p.name)));
 for(const [name,alternate,birth,focus,sourceKey,handle] of japan){
  if(known.has(norm(name)))continue;
  const source=refs[sourceKey];
  people.push({name,alternate,category:'creators',source,sourceLabel:'TikTok / profilo professionale · '+sourceKey,
   sourceKind:'directory / profilo pubblico',group:'TikTok · Giappone',platform:'TikTok',
   officialProfile:source,birth:birth||null,teenSafe:!!birth&&birth>='2007-01-01',
   verifiedLinks:handle?[['TikTok', 'https://www.tiktok.com/@'+handle]]:[],
   tiktokHandle:handle||null,tiktokScene:'japan',editorialBio:focus});
  known.add(norm(name));addedJP++;
 }
 window.YumeIdolsDiscovery=Object.freeze({...d,people,stats:{...d.stats,entries:people.length},
  updated:'2026-11-08',tiktokGeneration:true});
}
// Country-specific TikTok creators, excluding presumed or scraped identities.
// Handles are linked only when present in published directory/platform sources.
const social=[
 ['vn','Trà Đặng','tra.dang.904','Dance · cosplay','vn'],
 ['vn','CiiN','ciin','Dance · lifestyle','vn'],
 ['vn','Đan Thy','thybui.__','Gen Z · dance','vn'],
 ['vn','Reency Ngô','reencyngo','TV · entertainment','vn'],
 ['vn','Lê Bống','lebong95','Dance · lifestyle','vn'],
 ['vn','Khánh Vy','khanhvyccf','Video · education','vn'],
 ['vn','Mèo Simmy','meosimmyyt','Gaming · video','vn'],
 ['pk','Dananeer Mobeen','dananeerr','Short-video trend · lifestyle','pk'],
 ['id','Shabilqis Naila','jkt48.nala','JKT48 · music · social','id'],
 ['id','Jazzlyn Trisha','jkt48.trisha','JKT48 · music · social','id'],
 ['id','Fritzy Rosmerian','jkt48.fritzy','JKT48 · music · social','id'],
 ['id','Heidi Suyangga','jkt48.heidi__','JKT48 · teen idol · social','idu16']
];
const groupTeams=[
 ['kr','ILLIT','illit_official','kr',['Yunah','Minju','Moka','Wonhee','Iroha']],
 ['th','BNK48','bnk48official_th','th',['Blythe','Emmy','Galeya','Inkcha','Janry','Khowjow','Micha','Monet','Niya','Pancake','Patt','Praew','Sindy']],
 ['ph','BINI','bini_ph','ph',['Aiah','Colet','Maloi','Gwen','Stacey','Mikha','Jhoanna','Sheena']]
];
if(window.YumeAsiaIdols){
 const d=window.YumeAsiaIdols,people=d.people.slice(),sources={...d.sources};
 const byKey=new Map(people.map((p,i)=>[p.country+':'+norm(p.name),i]));
 for(const [k,url] of Object.entries(refs))sources['tiktok2026-'+k]=
  {id:'tiktok2026-'+k,country:['vn','id','kr','th','ph','pk'].find(c=>k.startsWith(c))||'jp',
   title:'TikTok / fonte pubblica professionale',url,year:'2026',kind:'media / fonte professionale'};
 const merge=(p,attrs,sourceKey,link,group=false)=>{
  const sourceId='tiktok2026-'+sourceKey;
  const verifiedLinks=[...(p.verifiedLinks||[])];
  if(link&&!verifiedLinks.some(x=>x[1]===link[1]))verifiedLinks.unshift(link);
  return {...p,...attrs,sourceIds:[...new Set([...(p.sourceIds||[]),sourceId])],
   verifiedLinks,tiktokScene:group?'group':(p.tiktokScene||'individual')};
 };
 for(const [country,name,handle,focus,sourceKey] of social){
  const key=country+':'+norm(name),index=byKey.get(key);
  const attrs={tiktokHandle:handle,tiktokFocus:focus,
   digitalScene:'tiktok',editorialBio:focus,sourceYear:'2026'};
  const link=['TikTok · @'+handle,'https://www.tiktok.com/@'+handle];
  if(index!==undefined){people[index]=merge(people[index],attrs,sourceKey,link);updatedAsia++;}
  else{
   const sourceId='tiktok2026-'+sourceKey,cat=country==='id'?'music':country==='vn'&&/Reency/.test(name)?'actors':'creators';
   const p={id:'tiktok2026-'+country+'-'+handle,country,nationality:country,name,alternate:'',
    category:cat,groups:['TikTok · '+focus],birth:null,sourceIds:[sourceId],
    verifiedLinks:[link],status:'catalog',...attrs,tiktokScene:'individual'};
   byKey.set(key,people.length);people.push(p);addedAsia++;
  }
 }
 // Keep the group's account separate from individual TikTok profiles. This is
 // crucial for children: group handles must not be mislabeled as personal accounts.
 for(const [country,group,handle,sourceKey,names] of groupTeams){
  for(const name of names){
   const idx=byKey.get(country+':'+norm(name));if(idx===undefined)continue;
   const p=people[idx],link=['TikTok · account ufficiale '+group,'https://www.tiktok.com/@'+handle];
   const prev=Array.isArray(p.tiktokGroupHandles)?p.tiktokGroupHandles:[];
   people[idx]=merge(p,{tiktokGroupHandles:[...new Set([...prev,handle])],
    tiktokGroupName:group,editorialBio:p.editorialBio||group+' · musica e video brevi'},sourceKey,link,true);
   updatedAsia++;
  }
 }
 const counts=Object.fromEntries(d.countries.map(c=>[c.id,people.filter(p=>p.country===c.id).length]));
 const groups=new Set(people.flatMap(p=>(p.groups||[]).map(g=>p.country+':'+g)));
 window.YumeAsiaIdols=Object.freeze({...d,people,sources,total:people.length,countryCounts:counts,
  groupCount:groups.size,sourceCount:Object.keys(sources).length,updated:'2026-11-08',tiktokGeneration:true});
}
window.YumeTikTokGeneration=Object.freeze({updated:'2026-11-08',japanNew:addedJP,asiaNew:addedAsia,
 asiaEnriched:updatedAsia,policy:'Female creators and public groups; published ages only. Licensed Commons photos; no private underage profiles.'});
})();