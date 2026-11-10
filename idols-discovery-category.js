/* Research-backed Yume editorial index. No scraped or invented photos.
   Independent of Wikidata query availability; no adult previews before acknowledgment. */
(()=>{
'use strict';
const catalogSelection=new URLSearchParams(location.search).get('section');
if(document.body.classList.contains('idol-catalog-page')&&['actors','voice','jpopwiki'].includes(catalogSelection))return;

const data=window.YumeIdolsDiscovery;
if(!data)return;
const $=id=>document.getElementById(id),root=$('idols-discover');if(!root)return;
const input=$('discovery-search'),list=$('discovery-list'),summary=$('discovery-summary'),more=$('discovery-more'),ageDialog=$('discovery-age-dialog'),photoOnly=$('discovery-photo-only'),platformSelect=$('discovery-platform'),countrySelect=$('discovery-country');
const gate=$('discovery-age-enter'),cancel=$('discovery-age-back');
const adultCats=new Set(['jav','adult','onlyfans']);
const labels={all:'Tutte',music:'Idol musicali',groups:'Gruppi idol',gravure:'Gravure',fashion:'Modelli',creators:'Creator / Social',cosplay:'Cosplay',vtuber:'VTuber',jav:'JAV 18+',adult:'AV / Porno · Asia 18+',onlyfans:'Creator · Asia 18+'};
const photoFiles={
 'Asuka Kishi':'Kindai Mahjong Swimsuit Festival (April 27, 2024)051727MC.jpg',
 'Sayaka Isoyama':'Sayaka Isoyama 2012.jpg',
 'Ayu Hazaki':'Fresh Festival 2023 in Shirakobato Water Park IMG 1038.jpg',
 'Ai Shinozaki':'Shinozaki Ai, Japanese gravure idol 5.jpg',
 'Miku Tanaka':'Miku Tanaka SOS47.jpg',
 'Enako':'Enako as Snow Miku giving heart hand gesture in Bangkok (8433706089).jpg',
 'Nashiko Momotsuki':'Ready Player One Japan Premiere Red Carpet Momotsuki Nashiko (41604487721).jpg'
};
const verifiedIds=Object.fromEntries(data.verified.map(x=>[x.name,x.q]));
const birthday={
 'Shirakami Fubuki':'5 ottobre','Moona Hoshinova':'15 febbraio',
 'Mizumiya Su':'16 giugno','Kikirara Vivi':'27 agosto','Koganei Niko':'25 luglio',
 'AZKi':'1 luglio','Isaki Riona':'29 maggio','Gigi Murin':'18 ottobre',
 'Takanashi Kiara':'6 luglio','Aki Rosenthal':'17 febbraio','Omaru Polka':'30 gennaio',
 'Kaela Kovalskia':'30 agosto','Raora Panthera':'11 maggio'
};

const idolRosterX={
 'あいす':'ice_icol','心花りり':'iLiFE_riri','若葉のあ':'iLiFE_wakaba','虹羽みに':'iLiFE_mini',
 '福丸うさ':'iLiFE_fukumaru','小熊まむ':'iLiFE_koguma','空詩かれん':'iLiFE_karen','純嶺みき':'iLiFE_sumire','真守みゅう':'iLiFE_mew',
 '恋星はるか':'Haru_nonfic','こるね':'colne_icol','海まりん':'Marin_nonfic','永月十華':'Touka_nonfic','砂糖みるく':'Milk_nonfic','水瀬ぴあの':'Piano_nonfic',
 '白石まゆみ':'mayumi_ss1227','塩川莉世':'rise_ss0731','音井結衣':'yui_ss0109','奥田彩友':'ayu_ss0107','栗田なつか':'natsuka_ss0719',
 '白雪姫乃':'hime_Ill','蒼井叶':'kanau_Ill','紫ノ色':'shiki_Ill','森 緑藻':'mori_Ill',
 'MiKiNA':'mikina_ExWHYZ','MAYU':'mayu_ExWHYZ','MAHO':'maho_ExWHYZ','YU-Ki':'yu_ki_ExWHYZ'
};
const idolBirthdays={
 'あいす':'23 gennaio','心花りり':'19 maggio','若葉のあ':'7 luglio','虹羽みに':'2 marzo',
 '福丸うさ':'26 gennaio','小熊まむ':'23 novembre','空詩かれん':'10 luglio','純嶺みき':'12 aprile','真守みゅう':'6 ottobre',
 '恋星はるか':'7 ottobre','こるね':'23 aprile','海まりん':'29 dicembre','永月十華':'1 ottobre','砂糖みるく':'5 novembre','水瀬ぴあの':'10 agosto',
 '白石まゆみ':'27 dicembre','塩川莉世':'31 luglio','音井結衣':'9 gennaio','奥田彩友':'7 gennaio','栗田なつか':'19 luglio',
 '白雪姫乃':'20 settembre','蒼井叶':'9 novembre','紫ノ色':'6 aprile','森 緑藻':'14 novembre',
 'MiKiNA':'18 marzo','MAYU':'16 aprile','MAHO':'1 giugno','YU-Ki':'10 dicembre'
};
const editorialBirth={
 '吉井明子':'15/10/1980','小野真弓':'12/03/1981','水原ゆき':'14/12/1987'
};
const officialSocial={
 'Asuka Kishi':[['Instagram','https://www.instagram.com/aspoo02/'],['X','https://x.com/asupons02']],
 'Sayaka Isoyama':[['Instagram','https://www.instagram.com/sayakaisoyama/'],['X','https://x.com/sayaka23isoyama']],
 'Enako':[['Instagram','https://www.instagram.com/enakorin/']],
 'Ayu Hazaki':[['Instagram','https://www.instagram.com/ayu_photo_18/'],['X','https://x.com/ayu_hazaki']],
 '吉井明子':[['Instagram','https://www.instagram.com/akiko_yoshii_sunny_rain/']],
 '小野真弓':[['Instagram','https://www.instagram.com/hanaharuaroi/']],
 '水原ゆき':[['X','https://x.com/12yuchan14'],['Instagram','https://www.instagram.com/12yuchan14/']],
 'Miku Tanaka':[['X','https://x.com/miku_monmon3939']],
 'Nashiko Momotsuki':[['Instagram','https://www.instagram.com/nashiko_cos/']]
};
const normalize=x=>String(x||'').normalize('NFKC').normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
const make=(tag,cls,txt)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(txt!==undefined)n.textContent=txt;return n};
const link=(title,url,cls='')=>{const a=make('a',cls,title);a.href=url;a.rel='noopener noreferrer';a.target='_blank';return a};
const adultEnabled=()=>{try{return sessionStorage.getItem('yume-idols-adult-18')==='yes'}catch{return false}};
let active='all',limit=48,pending=null;
const dedup=new Map();
for(const p of data.people){
 const key=normalize(p.name);
 if(dedup.has(key)){const prev=dedup.get(key);
 prev.categories.add(p.category);
 if(!prev.sources.some(s=>s.url===p.source))prev.sources.push({url:p.source,label:p.sourceLabel,kind:p.sourceKind});
 if(p.cosplayFocus){prev.cosplayFocus=p.cosplayFocus;prev.cosplayGuideSource=p.cosplayGuideSource;prev.cosplayGuideDate=p.cosplayGuideDate;prev.cosplaySocials=p.cosplaySocials;prev.cosplayJapanese=p.cosplayJapanese;if(!prev.alternate)prev.alternate=p.alternate||p.cosplayJapanese||'';}
 if(p.adultPlatforms?.length)prev.adultPlatforms=[...new Set([...(prev.adultPlatforms||[]),...p.adultPlatforms])];
 if(!prev.adultCountry&&p.adultCountry)prev.adultCountry=p.adultCountry;
 if(!prev.photoFile&&p.photoFile)prev.photoFile=p.photoFile;
 if(!prev.editorialBio&&p.editorialBio)prev.editorialBio=p.editorialBio;
 // Gravure performers sometimes appear first under fashion, music, cosplay or JAV.
 // Keep the matching, separately sourced A–Z metadata on the unified card.
 if(p.category==='gravure'&&p.gravureIndexBirthYear){
  prev.gravureIndexBirthYear=p.gravureIndexBirthYear;
  prev.gravureIndexJapanese=p.gravureIndexJapanese||prev.gravureIndexJapanese;
  prev.gravureIndexSource=p.gravureIndexSource;
  prev.gravureOriginSource=p.gravureOriginSource||prev.gravureOriginSource;
  prev.gravureBirthYearSource=p.gravureBirthYearSource;
  if(!prev.alternate)prev.alternate=p.alternate||p.gravureIndexJapanese||'';
  prev.otherStageNames=[...new Set([...(prev.otherStageNames||[]),...(p.otherStageNames||[])])];
 }
 continue}
 dedup.set(key,{...p,categories:new Set([p.category]),sources:[{url:p.source,label:p.sourceLabel,kind:p.sourceKind}]});
}
for(const p of dedup.values()){
 p.qid=p.qid||verifiedIds[p.name]||null;p.photoFile=photoFiles[p.name]||p.photoFile||null;
 if(data.officialVT[p.name])p.officialProfile=data.officialVT[p.name];
}
const people=[...dedup.values()];
const photoRecord=p=>{
 const shared=window.YumePhotoStore?.get('japan',p.name);
 if(active==='gravure'&&p.categories.has('gravure'))return window.YumeGravurePortraits?.get(p.name)||shared;
 if(active==='jav'&&p.categories.has('jav'))return window.YumeJAVPortraits?.get(p.name)||shared;
 if((active==='adult'||active==='onlyfans')&&p.categories.has(active))return window.YumeAdultPortraits?.get(p.name,active)||shared;
 return shared||window.YumeIdolCommonsPortraits?.get(p.name)||null;
};
const brokenImages=new Set();
const countryLabels={JP:'🇯🇵 Giappone',KR:'🇰🇷 Corea del Sud',TH:'🇹🇭 Thailandia',PH:'🇵🇭 Filippine',VN:'🇻🇳 Vietnam',ID:'🇮🇩 Indonesia',MY:'🇲🇾 Malaysia',MM:'🇲🇲 Myanmar',SG:'🇸🇬 Singapore',TW:'🇹🇼 Taiwan',HK:'🇭🇰 Hong Kong',CN:'🇨🇳 Cina',IN:'🇮🇳 India'};
const region=p=>p.adultCountry||([...p.categories].some(c=>adultCats.has(c))?'JP':null);
const hasPhoto=p=>{
 if(brokenImages.has(active+'|'+p.name))return false;
 const item=photoRecord(p);
 return !!(item?.verified&&item.photo)||!!(p.photoFile&&p.photoSource);
};
function setupAdultFilters(){
 for(const select of [countrySelect,platformSelect])if(select){select.hidden=!adultCats.has(active);select.parentElement.hidden=!adultCats.has(active)}
 if(!adultCats.has(active))return;
 const eligible=people.filter(p=>p.categories.has(active));
 const countries=[...new Set(eligible.map(region).filter(Boolean))].sort((a,b)=>(countryLabels[a]||a).localeCompare(countryLabels[b]||b,'it'));
 const oldCountry=countrySelect?.value||'all',oldPlatform=platformSelect?.value||'all';
 if(countrySelect){countrySelect.replaceChildren();const all=make('option',null,'Tutta l’Asia');all.value='all';countrySelect.append(all);
  for(const c of countries){const o=make('option',null,countryLabels[c]||c);o.value=c;countrySelect.append(o)}
  countrySelect.value=countries.includes(oldCountry)?oldCountry:'all';
 }
 if(platformSelect){const platforms=[...new Set(eligible.flatMap(p=>p.adultPlatforms||[]))].sort((a,b)=>a.localeCompare(b,'it'));
  platformSelect.replaceChildren();const all=make('option',null,'Tutte le piattaforme');all.value='all';platformSelect.append(all);
  for(const p of platforms){const o=make('option',null,p);o.value=p;platformSelect.append(o)}
  platformSelect.value=platforms.includes(oldPlatform)?oldPlatform:'all';
 }
}
function categoriesOf(p){return [...p.categories].map(x=>labels[x]||x).join(' · ')}
function imageCard(p){
 const verified=photoRecord(p);
 const candidates=[];
 if(verified?.verified&&verified.photo)candidates.push(verified.photo,...(verified.alternates||[]));
 if(p.photoFile&&(!adultCats.has(active)||adultEnabled()))candidates.push('https://commons.wikimedia.org/wiki/Special:FilePath/'+encodeURIComponent(p.photoFile.replace(/ /g,'_'))+'?width=920');
 if(!candidates.length){
  const wrap=make('div','discovery-portrait is-unavailable'),monogram=make('span','discovery-portrait-glyph','✦');
  wrap.setAttribute('aria-label','Foto non disponibile per '+p.name);wrap.append(monogram,make('small',null,'Ritratto non disponibile'));
  if(adultCats.has(active)&&adultEnabled()&&(p.instagramProfile||p.source)){const a=link(p.instagramProfile?'Foto su Instagram ↗':'Foto nel profilo ↗',p.instagramProfile||p.source,'discovery-source-portrait');wrap.append(a)}
  return wrap;
 }
 const urls=[...new Set(candidates.filter(x=>typeof x==='string'&&x.startsWith('https://')))];
 const wrap=make('div','discovery-portrait'),img=document.createElement('img');
 img.alt='Ritratto di '+p.name;img.loading='lazy';img.decoding='async';img.referrerPolicy='no-referrer';
 let i=0;
 const failed=()=>{
  brokenImages.add(active+'|'+p.name);
  wrap.classList.add('is-unavailable');
  wrap.replaceChildren(make('span','discovery-portrait-glyph','✦'),make('small',null,'Foto non caricata'));
  if(adultCats.has(active)&&adultEnabled()&&(p.instagramProfile||p.source))wrap.append(link(p.instagramProfile?'Vedi Instagram ↗':'Vedi fonte ↗',p.instagramProfile||p.source,'discovery-source-portrait'));
  if(['adult','onlyfans'].includes(active))window.YumeAdultPortraits?.reportBroken?.(p.name,active,verified?.file||p.photoFile);
  else if(active==='jav')window.YumeJAVPortraits?.reportBroken?.(p.name,verified?.file||p.photoFile);
 };
 img.onload=()=>{if(img.naturalWidth<180||img.naturalHeight<240){img.onerror()}};
 img.onerror=()=>{i++;if(i<urls.length)img.src=urls[i];else failed()};
 img.src=urls[0];wrap.append(img);return wrap
}
function item(p){
 const item=make('article','discovery-card'),visual=imageCard(p);if(visual)item.append(visual);
 const contents=make('div','discovery-card-body');
 const eyebrow=make('span','discovery-card-type',categoriesOf(p));contents.append(eyebrow);
 const name=make('h3',null,p.name);contents.append(name);
 if(p.alternate)contents.append(make('p','discovery-japanese',p.alternate));
 if((p.groups?.length||0)||p.group)contents.append(make('p','discovery-japanese','Gruppo: '+[...new Set([...(p.groups||[]),...(p.group?[p.group]:[])])].join(' · ')));
 if(p.wikiYear&&p.categories.has('groups'))contents.append(make('p','discovery-japanese','Formazione: '+p.wikiYear+' · '+(p.wikiRoster?.length||0)+' membri nella fonte'));
 const summary=make('p','discovery-card-detail',p.editorialBio&&adultCats.has(active)?p.editorialBio:p.categories.has('vtuber')?(p.platform||'VTuber')+' · identità artistica digitale':p.categories.has('groups')?'Gruppo musicale · verifica attività sul sito della fonte':p.categories.has('jav')||p.categories.has('adult')||p.categories.has('onlyfans')?'Nome artistico · catalogo professionale':p.sourceKind==='agenzia ufficiale'?'Fonte: agenzia ufficiale':'Fonte: repertorio pubblico');
 contents.append(summary);
 if(p.cosplayFocus&&(active==='cosplay'||active==='all'||active==='creators'))contents.append(make('p','discovery-card-detail',p.cosplayFocus+' · Guida CoDigital, ottobre 2026'));
 if(active==='gravure'&&p.gravureIndexBirthYear){
  contents.append(make('p','discovery-japanese',
   'GravureIndex A–Z · nascita: '+p.gravureIndexBirthYear+
   ' (anno indicato dall’elenco, non verificato singolarmente)'));
 }
 if(active==='gravure'&&p.gravureIndexJapanese){
  const native=p.gravureIndexJapanese;
  if(native!==p.alternate)contents.append(make('p','discovery-japanese','Nome giapponese: '+native));
 }
 if(active==='jav'&&p.javDbReference){
  contents.append(make('p','discovery-japanese','Nuova scheda JAV Database · repertorio aggiornato al novembre 2026'));
 }
 if(active==='jav'&&Array.isArray(p.javAnnualRankings)&&p.javAnnualRankings.length){
  const ranks=[...p.javAnnualRankings].sort((a,b)=>b.year-a.year);
  const line=make('p','discovery-japanese','Classifica FANZA (DVD · storica): '+
   ranks.map(x=>x.year+' #'+x.rank).join(' · '));
  contents.append(line);
 }
 if(active==='jav'&&p.otherStageNames?.length){
  const distinct=[...new Set(p.otherStageNames)].filter(x=>x!==p.name&&x!==p.alternate).slice(0,5);
  if(distinct.length)contents.append(make('p','discovery-japanese','Altri nomi d’arte: '+distinct.join(' · ')));
 }
 if(adultCats.has(active)&&p.identityDisambiguation){
  contents.append(make('p','discovery-photo-caveat',p.identityDisambiguation));
 }
 if(adultCats.has(active)&&p.asianOriginNote){
  contents.append(make('p','discovery-photo-caveat','Origine: '+p.asianOriginNote));
 }
 if(adultCats.has(active)&&p.rankingSnapshot){
  const rs=p.rankingSnapshot;
  contents.append(make('p','discovery-photo-caveat',
   'Dati della classifica del '+rs.asOf.split('-').reverse().join('/')+
   ' · Instagram: '+rs.instagramReach+
   ' · Abbonamento indicato: '+rs.subscription+' (non in tempo reale)'));
 }
 if(adultCats.has(active)&&p.adultPlatforms?.length){
  const pills=make('div','adult-platform-chips');
  for(const platform of [...new Set(p.adultPlatforms)])pills.append(make('span','adult-platform-chip',platform));
  contents.append(pills)
 }
 if(adultCats.has(active)&&region(p))contents.append(make('p','discovery-japanese',countryLabels[region(p)]||region(p)));
 if(adultCats.has(active)&&p.ageSourceStatus&&p.adultVerified!==true)contents.append(make('p','discovery-photo-caveat','Età personale non pubblicata · Fonte: '+p.ageSourceStatus));

 if(birthday[p.name]&&p.categories.has('vtuber'))contents.append(make('p','discovery-character-birthday','Compleanno del personaggio: '+birthday[p.name]+' · età privata non pubblicata'));
 if(p.teenSafe&&/^\d{4}-\d{2}-\d{2}$/.test(p.birth||'')){
  const b=new Date(p.birth+'T00:00:00Z'),now=new Date();
  const age=now.getUTCFullYear()-b.getUTCFullYear()-(now.getUTCMonth()<b.getUTCMonth()||(now.getUTCMonth()===b.getUTCMonth()&&now.getUTCDate()<b.getUTCDate())?1:0);
  contents.append(make('p','discovery-character-birthday','Nascita pubblica: '+p.birth.split('-').reverse().join('/')+' · '+age+' anni · '+(p.group||'artista')));
 }
 if(editorialBirth[p.name]){const [d,m,y]=editorialBirth[p.name].split('/').map(Number),now=new Date(),age=now.getFullYear()-y-((now.getMonth()+1<m||(now.getMonth()+1===m&&now.getDate()<d))?1:0);contents.append(make('p','discovery-character-birthday','Nascita: '+editorialBirth[p.name]+' · '+age+' anni (fonte editoriale)'));}
 if(idolBirthdays[p.name]&&p.categories.has('music'))contents.append(make('p','discovery-character-birthday','Compleanno pubblico: '+idolBirthdays[p.name]+' · anno non indicato'));
 const actions=make('div','discovery-card-links');
 const profile=p.officialProfile||p.sources[0].url;
 actions.append(link(p.officialProfile?'Profilo ufficiale ↗':'Apri fonte ↗',profile));
 if(active==='gravure'&&p.gravureIndexSource&&p.gravureIndexSource!==profile)
  actions.append(link('GravureIndex · indice A–Z ↗',p.gravureIndexSource));
 if(active==='gravure'&&p.gravureOriginSource)
  actions.append(link('Provenienza · fonte editoriale ↗',p.gravureOriginSource));
 if(p.wikiSource&&p.wikiSource!==profile)actions.append(link('J-Pop Wiki · gruppo ↗',p.wikiSource));
 if(active==='jav'&&p.javAnnualRankings?.length){
  for(const rank of [...p.javAnnualRankings].sort((a,b)=>b.year-a.year)){
   actions.append(link('FANZA '+rank.year+' · #'+rank.rank+' ↗',rank.source));
  }
 }
 if(p.qid)actions.append(link('Wikidata ↗','https://www.wikidata.org/wiki/'+p.qid));
 const portrait=photoRecord(p);
 if(p.photoFile&&p.photoSource&&!portrait?.verified)actions.append(link('Foto · fonte e licenza ↗',p.photoSource));
 if(portrait?.verified&&portrait.source){
  actions.append(link('Foto e licenza ↗',portrait.source));
  if(adultCats.has(active)&&portrait.file){
   const original='https://commons.wikimedia.org/wiki/Special:FilePath/'+encodeURIComponent(portrait.file.replace(/ /g,'_'));
   actions.append(link('Ritratto HD ↗',original));
  }
 }
 if(adultCats.has(active)&&p.instagramProfile&&p.instagramHandle){
  actions.append(link('Instagram @'+p.instagramHandle+' ↗',p.instagramProfile));
 }
 if(adultCats.has(active)&&p.onlyfansProfile){
  actions.append(link('OnlyFans · profilo 18+ ↗',p.onlyfansProfile));
 }
 if(adultCats.has(active)&&p.editorialRankingSource){
  actions.append(link('Classifica 2026 ↗',p.editorialRankingSource));
 }
 if(idolRosterX[p.name])actions.append(link('X · dal portale ↗','https://x.com/'+idolRosterX[p.name]));
 if(!p.officialProfile&&!p.instagramProfile)actions.append(link('Cerca foto ↗','https://www.google.com/search?tbm=isch&q='+encodeURIComponent(p.name+' '+(p.alternate||'')+' official profile')));
 if(p.categories.has('vtuber'))actions.append(link('Cerca YouTube ↗','https://www.youtube.com/results?search_query='+encodeURIComponent(p.name+' VTuber')));
 else if(!adultCats.has(active)&&![...p.categories].some(c=>adultCats.has(c)))actions.append(link('Cerca X ↗','https://x.com/search?q='+encodeURIComponent(p.name)));
 for(const [social,url] of officialSocial[p.name]||[])actions.append(link(social+' ↗',url));
 for(const [social,url] of p.verifiedSocials||[])if(!(officialSocial[p.name]||[]).some(x=>x[1]===url))actions.append(link(social+' · verificato ↗',url));
 if(p.verifiedBiographySource&&p.verifiedBiographySource!==profile)actions.append(link('Biografia verificata ↗',p.verifiedBiographySource));
 if(p.cosplayGuideSource&&(active==='cosplay'||active==='all'||active==='creators')){
  if(p.cosplayGuideSource!==profile)actions.append(link('Guida Cosplay 2026 ↗',p.cosplayGuideSource));
  for(const [social,url] of (p.cosplaySocials||[]))if(![...(officialSocial[p.name]||[])].some(x=>x[1]===url))actions.append(link(social+' · guida 2026 ↗',url));
 }
 contents.append(actions);item.append(contents);return item
}
function isAllowed(p){
 if(adultCats.has(active))return p.categories.has(active)&&adultEnabled();
 // A model with a separate JAV career can appear in the Gravure roster
 // with public, non-explicit gravure metadata and photographs only.
 if(active==='gravure')return p.categories.has('gravure');
 return [...p.categories].some(c=>adultCats.has(c))?false:(active==='all'?true:p.categories.has(active))
}
function render(){
 const q=normalize(input.value),shown=people.filter(p=>isAllowed(p)
 &&(!adultCats.has(active)||!countrySelect||countrySelect.value==='all'||region(p)===countrySelect.value)
 &&(!adultCats.has(active)||!platformSelect||platformSelect.value==='all'||(p.adultPlatforms||[]).includes(platformSelect.value))
 &&(!photoOnly?.checked||hasPhoto(p))
 &&(!q||normalize(p.name+' '+(p.alternate||'')+' '+(p.gravureIndexJapanese||'')+' '+(p.otherStageNames||[]).join(' ')+' '+(p.group||'')+' '+(p.wikiGroup||'')+' '+(p.groups||[]).join(' ')+' '+(p.editorialBio||'')+' '+(p.adultPlatforms||[]).join(' ')+' '+categoriesOf(p)).includes(q)));
 shown.sort((a,b)=>['creators','adult','jav','onlyfans','gravure'].includes(active)?Number(hasPhoto(b))-Number(hasPhoto(a))||a.name.localeCompare(b.name,'it'):a.name.localeCompare(b.name,'it'));
 const display=shown.slice(0,limit),fragment=document.createDocumentFragment();
 if(!adultCats.has(active))window.YumeIdolCommonsPortraits?.ensure(display);
 for(const p of display)fragment.append(item(p));list.replaceChildren(fragment);
 if(active==='gravure')window.YumeGravurePortraits?.ensure(display);
 if(active==='jav'&&adultEnabled())window.YumeJAVPortraits?.ensure(display);
 if(['adult','onlyfans'].includes(active)&&adultEnabled())window.YumeAdultPortraits?.ensure(display,active);
 if(!display.length)list.append(make('p','discovery-empty','Nessun nome corrispondente. Prova un’altra ricerca o un’altra categoria.'));
 summary.textContent=shown.length+' nominativi distinti disponibili · '+display.length+' mostrati · '+shown.filter(hasPhoto).length+' con foto associata · '+data.stats.sources+' fonti'+(adultCats.has(active)?' · ritratti Commons e ricerca fotografica dopo consenso 18+':'');
 more.hidden=shown.length<=limit;more.textContent='Mostra altri '+Math.min(48,shown.length-limit)+' nomi ↓';
 for(const button of document.querySelectorAll('[data-discovery-category]'))button.setAttribute('aria-pressed',String(button.dataset.discoveryCategory===active));
}
function choose(k){
 if(adultCats.has(k)&&!adultEnabled()){pending=k;ageDialog.showModal();return}
 active=k;limit=48;setupAdultFilters();render();
}
document.querySelectorAll('[data-discovery-category]').forEach(btn=>btn.addEventListener('click',()=>choose(btn.dataset.discoveryCategory)));
input.addEventListener('input',()=>{limit=48;render()});
photoOnly?.addEventListener('change',()=>{limit=48;render()});
 for(const ctrl of [countrySelect,platformSelect])ctrl?.addEventListener('change',()=>{limit=48;render()});
more.addEventListener('click',()=>{limit+=48;render()});
gate.addEventListener('click',()=>{try{sessionStorage.setItem('yume-idols-adult-18','yes')}catch{}const k=pending;pending=null;ageDialog.close();if(k)choose(k)});
cancel.addEventListener('click',()=>{pending=null;ageDialog.close()});
ageDialog.addEventListener('close',()=>{pending=null});

const validSelection=['music','groups','gravure','fashion','creators','cosplay','vtuber','jav','adult','onlyfans'];
const selected=validSelection.includes(catalogSelection)?catalogSelection:'all';
if(adultCats.has(selected))list.classList.add('is-age-pending');
gate.addEventListener('click',()=>{list.classList.remove('is-age-pending')});
cancel.addEventListener('click',()=>{if(document.body.classList.contains('idol-catalog-page'))location.assign('idols.html')});
choose(selected);
if(adultCats.has(selected)&&adultEnabled())list.classList.remove('is-age-pending');
window.YumePhotoStore?.ready?.then(()=>render()).catch(()=>{});
window.addEventListener('yume-idol-photo-update',()=>{if(!adultCats.has(active))render()});
window.addEventListener('yume-gravure-photo-update',()=>{if(active==='gravure')render()});
window.addEventListener('yume-jav-photo-update',()=>{if(active==='jav'&&adultEnabled())render()});
window.addEventListener('yume-adult-portraits-updated',()=>{if(['adult','onlyfans'].includes(active)&&adultEnabled()){brokenImages.clear();render()}});

})();