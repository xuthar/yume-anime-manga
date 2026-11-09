/* Research-backed Yume editorial index. No scraped or invented photos.
   Independent of Wikidata query availability; no adult previews before acknowledgment. */
(()=>{
'use strict';
const catalogSelection=new URLSearchParams(location.search).get('section');
if(document.body.classList.contains('idol-catalog-page')&&['actors','voice','jpopwiki'].includes(catalogSelection))return;

const data=window.YumeIdolsDiscovery;
if(!data)return;
const $=id=>document.getElementById(id),root=$('idols-discover');if(!root)return;
const input=$('discovery-search'),list=$('discovery-list'),summary=$('discovery-summary'),more=$('discovery-more'),ageDialog=$('discovery-age-dialog'),photoOnly=$('discovery-photo-only');
const gate=$('discovery-age-enter'),cancel=$('discovery-age-back');
const adultCats=new Set(['jav','adult','onlyfans']);
const labels={all:'Tutte',music:'Idol musicali',groups:'Gruppi idol',gravure:'Gravure',fashion:'Modelli',creators:'Creator / Social',cosplay:'Cosplay',vtuber:'VTuber',jav:'JAV 18+',adult:'AV / Porno 18+',onlyfans:'OnlyFans 18+'};
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
 if(dedup.has(key)){const prev=dedup.get(key);prev.categories.add(p.category);if(!prev.sources.some(s=>s.url===p.source))prev.sources.push({url:p.source,label:p.sourceLabel,kind:p.sourceKind});continue}
 dedup.set(key,{...p,categories:new Set([p.category]),sources:[{url:p.source,label:p.sourceLabel,kind:p.sourceKind}]});
}
for(const p of dedup.values()){
 p.qid=p.qid||verifiedIds[p.name]||null;p.photoFile=photoFiles[p.name]||p.photoFile||null;
 if(data.officialVT[p.name])p.officialProfile=data.officialVT[p.name];
}
const people=[...dedup.values()];
const photoRecord=p=>{
 const shared=window.YumePhotoStore?.get('japan',p.name);
 if(active==='jav'&&p.categories.has('jav'))return window.YumeJAVPortraits?.get(p.name)||shared;
 if((active==='adult'||active==='onlyfans')&&p.categories.has(active))return window.YumeAdultPortraits?.get(p.name,active)||shared;
 return shared;
};
const hasPhoto=p=>{const item=photoRecord(p);return !!(item?.verified&&item.photo)};
function categoriesOf(p){return [...p.categories].map(x=>labels[x]||x).join(' · ')}
function imageCard(p){
 const verified=photoRecord(p);
 const candidates=[];
 if(verified?.verified&&verified.photo)candidates.push(verified.photo,...(verified.alternates||[]));
 if(p.photoFile&&(!adultCats.has(active)||adultEnabled()))candidates.push('https://commons.wikimedia.org/wiki/Special:FilePath/'+encodeURIComponent(p.photoFile.replace(/ /g,'_'))+'?width=920');
 if(!candidates.length){
  const wrap=make('div','discovery-portrait is-unavailable'),monogram=make('span','discovery-portrait-glyph','✦');
  wrap.setAttribute('aria-label','Foto non disponibile per '+p.name);wrap.append(monogram,make('small',null,'Ritratto non disponibile'));return wrap;
 }
 const urls=[...new Set(candidates.filter(x=>typeof x==='string'&&x.startsWith('https://')))];
 const wrap=make('div','discovery-portrait'),img=document.createElement('img');
 img.alt='Ritratto di '+p.name;img.loading='lazy';img.decoding='async';
 let i=0;
 img.onerror=()=>{i++;if(i<urls.length)img.src=urls[i];else if(p.categories.has('creators')){
    wrap.classList.add('is-unavailable');wrap.replaceChildren(make('span','discovery-portrait-glyph','✦'),make('small',null,'Ritratto non disponibile'));
   }else{wrap.classList.add('is-unavailable');wrap.replaceChildren(make('span','discovery-portrait-glyph','✦'),make('small',null,'Ritratto non disponibile'));}};
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
 if(p.wikiSource&&p.wikiSource!==profile)actions.append(link('J-Pop Wiki · gruppo ↗',p.wikiSource));
 if(p.qid)actions.append(link('Wikidata ↗','https://www.wikidata.org/wiki/'+p.qid));
 const portrait=photoRecord(p);
 if(portrait?.verified&&portrait.source)actions.append(link('Licenza foto ↗',portrait.source));
 if(idolRosterX[p.name])actions.append(link('X · dal portale ↗','https://x.com/'+idolRosterX[p.name]));
 if(!p.officialProfile)actions.append(link('Cerca foto ↗','https://www.google.com/search?tbm=isch&q='+encodeURIComponent(p.name+' '+(p.alternate||'')+' official profile')));
 if(p.categories.has('vtuber'))actions.append(link('Cerca YouTube ↗','https://www.youtube.com/results?search_query='+encodeURIComponent(p.name+' VTuber')));
 else if(!adultCats.has(active)&&![...p.categories].some(c=>adultCats.has(c)))actions.append(link('Cerca X ↗','https://x.com/search?q='+encodeURIComponent(p.name)));
 for(const [social,url] of officialSocial[p.name]||[])actions.append(link(social+' ↗',url));
 contents.append(actions);item.append(contents);return item
}
function isAllowed(p){if(adultCats.has(active))return p.categories.has(active)&&adultEnabled();
 return [...p.categories].some(c=>adultCats.has(c))?false:(active==='all'?true:p.categories.has(active))}
function render(){
 const q=normalize(input.value),shown=people.filter(p=>isAllowed(p)&&(!photoOnly?.checked||hasPhoto(p))&&(!q||normalize(p.name+' '+(p.alternate||'')+' '+(p.group||'')+' '+(p.wikiGroup||'')+' '+(p.groups||[]).join(' ')+' '+categoriesOf(p)).includes(q)));
 shown.sort((a,b)=>['creators','adult','jav','onlyfans','gravure'].includes(active)?Number(hasPhoto(b))-Number(hasPhoto(a))||a.name.localeCompare(b.name,'it'):a.name.localeCompare(b.name,'it'));
 const display=shown.slice(0,limit),fragment=document.createDocumentFragment();
 for(const p of display)fragment.append(item(p));list.replaceChildren(fragment);
 if(active==='jav'&&adultEnabled())window.YumeJAVPortraits?.ensure(display);
 if(['adult','onlyfans'].includes(active)&&adultEnabled())window.YumeAdultPortraits?.ensure(display,active);
 if(!display.length)list.append(make('p','discovery-empty','Nessun nome corrispondente. Prova un’altra ricerca o un’altra categoria.'));
 summary.textContent=shown.length+' nominativi distinti disponibili · '+display.length+' mostrati · '+shown.filter(hasPhoto).length+' con foto associata · '+data.stats.sources+' fonti'+(adultCats.has(active)?' · ritratti Commons e ricerca fotografica dopo consenso 18+':'');
 more.hidden=shown.length<=limit;more.textContent='Mostra altri '+Math.min(48,shown.length-limit)+' nomi ↓';
 for(const button of document.querySelectorAll('[data-discovery-category]'))button.setAttribute('aria-pressed',String(button.dataset.discoveryCategory===active));
}
function choose(k){
 if(adultCats.has(k)&&!adultEnabled()){pending=k;ageDialog.showModal();return}
 active=k;limit=48;render();
}
document.querySelectorAll('[data-discovery-category]').forEach(btn=>btn.addEventListener('click',()=>choose(btn.dataset.discoveryCategory)));
input.addEventListener('input',()=>{limit=48;render()});
photoOnly?.addEventListener('change',()=>{limit=48;render()});
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
window.addEventListener('yume-jav-photo-update',()=>{if(active==='jav'&&adultEnabled())render()});
window.addEventListener('yume-adult-portraits-updated',()=>{if(['adult','onlyfans'].includes(active)&&adultEnabled())render()});

})();