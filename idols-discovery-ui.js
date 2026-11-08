/* Research-backed Yume editorial index. No scraped or invented photos.
   Independent of Wikidata query availability; no adult previews before acknowledgment. */
(()=>{
'use strict';
const data=window.YumeIdolsDiscovery;
if(!data)return;
const $=id=>document.getElementById(id),root=$('idols-discover');if(!root)return;
const input=$('discovery-search'),list=$('discovery-list'),summary=$('discovery-summary'),more=$('discovery-more'),ageDialog=$('discovery-age-dialog');
const gate=$('discovery-age-enter'),cancel=$('discovery-age-back');
const adultCats=new Set(['jav','adult']);
const labels={all:'Tutte',music:'Idol musicali',groups:'Gruppi idol',gravure:'Gravure',fashion:'Modelli',creators:'Creator / Social',cosplay:'Cosplay',vtuber:'VTuber',jav:'JAV 18+',adult:'Adult 18+'};
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
const officialSocial={
 'Asuka Kishi':[['Instagram','https://www.instagram.com/aspoo02/'],['X','https://x.com/asupons02']],
 'Sayaka Isoyama':[['Instagram','https://www.instagram.com/sayakaisoyama/'],['X','https://x.com/sayaka23isoyama']],
 'Enako':[['Instagram','https://www.instagram.com/enakorin/']],
 'Ayu Hazaki':[['Instagram','https://www.instagram.com/ayu_photo_18/'],['X','https://x.com/ayu_hazaki']],
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
 p.qid=p.qid||verifiedIds[p.name]||null;p.photoFile=photoFiles[p.name]||null;
 if(data.officialVT[p.name])p.officialProfile=data.officialVT[p.name];
}
const people=[...dedup.values()];
function categoriesOf(p){return [...p.categories].map(x=>labels[x]||x).join(' · ')}
function imageCard(p){
 const file=p.photoFile;if(!file)return null;
 const wrap=make('div','discovery-portrait'),img=document.createElement('img');
 img.alt='Ritratto di '+p.name;img.loading='lazy';img.decoding='async';
 img.onerror=()=>{wrap.remove();};
 img.src='https://commons.wikimedia.org/wiki/Special:FilePath/'+encodeURIComponent(file)+'?width=360';
 wrap.append(img);return wrap
}
function item(p){
 const item=make('article','discovery-card'),visual=imageCard(p);if(visual)item.append(visual);
 const contents=make('div','discovery-card-body');
 const eyebrow=make('span','discovery-card-type',categoriesOf(p));contents.append(eyebrow);
 const name=make('h3',null,p.name);contents.append(name);
 if(p.alternate)contents.append(make('p','discovery-japanese',p.alternate));
 const summary=make('p','discovery-card-detail',p.categories.has('vtuber')?(p.platform||'VTuber')+' · identità artistica digitale':p.categories.has('groups')?'Gruppo musicale · verifica attività sul sito della fonte':p.categories.has('jav')||p.categories.has('adult')?'Nome artistico · catalogo professionale':p.sourceKind==='agenzia ufficiale'?'Fonte: agenzia ufficiale':'Fonte: repertorio pubblico');
 contents.append(summary);
 if(birthday[p.name]&&p.categories.has('vtuber'))contents.append(make('p','discovery-character-birthday','Compleanno del personaggio: '+birthday[p.name]+' · età privata non pubblicata'));
 if(idolBirthdays[p.name]&&p.categories.has('music'))contents.append(make('p','discovery-character-birthday','Compleanno pubblico: '+idolBirthdays[p.name]+' · anno non indicato'));
 const actions=make('div','discovery-card-links');
 const profile=p.officialProfile||p.sources[0].url;
 actions.append(link(p.officialProfile?'Profilo ufficiale ↗':'Apri fonte ↗',profile));
 if(p.qid)actions.append(link('Wikidata ↗','https://www.wikidata.org/wiki/'+p.qid));
 if(idolRosterX[p.name])actions.append(link('X · dal portale ↗','https://x.com/'+idolRosterX[p.name]));
 if(!p.officialProfile)actions.append(link('Cerca foto ↗','https://www.google.com/search?tbm=isch&q='+encodeURIComponent(p.name+' '+(p.alternate||'')+' official profile')));
 if(p.categories.has('vtuber'))actions.append(link('Cerca YouTube ↗','https://www.youtube.com/results?search_query='+encodeURIComponent(p.name+' VTuber')));
 else if(!adultCats.has(active)&&!p.categories.has('jav')&&!p.categories.has('adult'))actions.append(link('Cerca X ↗','https://x.com/search?q='+encodeURIComponent(p.name)));
 for(const [social,url] of officialSocial[p.name]||[])actions.append(link(social+' ↗',url));
 contents.append(actions);item.append(contents);return item
}
function isAllowed(p){if(adultCats.has(active))return p.categories.has(active)&&adultEnabled();
 return active==='all'?[...p.categories].some(c=>!adultCats.has(c)):p.categories.has(active)}
function render(){
 const q=normalize(input.value),shown=people.filter(p=>isAllowed(p)&&(!q||normalize(p.name+' '+p.alternate+' '+categoriesOf(p)).includes(q)));
 shown.sort((a,b)=>a.name.localeCompare(b.name,'it'));
 const display=shown.slice(0,limit),fragment=document.createDocumentFragment();
 for(const p of display)fragment.append(item(p));list.replaceChildren(fragment);
 if(!display.length)list.append(make('p','discovery-empty','Nessun nome corrispondente. Prova un’altra ricerca o un’altra categoria.'));
 summary.textContent=shown.length+' nominativi distinti disponibili in questa selezione · '+display.length+' mostrati · '+data.stats.sources+' fonti consultate';
 more.hidden=shown.length<=limit;more.textContent='Mostra altri '+Math.min(48,shown.length-limit)+' nomi ↓';
 for(const button of document.querySelectorAll('[data-discovery-category]'))button.setAttribute('aria-pressed',String(button.dataset.discoveryCategory===active));
}
function choose(k){
 if(adultCats.has(k)&&!adultEnabled()){pending=k;ageDialog.showModal();return}
 active=k;limit=48;render();
}
document.querySelectorAll('[data-discovery-category]').forEach(btn=>btn.addEventListener('click',()=>choose(btn.dataset.discoveryCategory)));
input.addEventListener('input',()=>{limit=48;render()});
more.addEventListener('click',()=>{limit+=48;render()});
gate.addEventListener('click',()=>{try{sessionStorage.setItem('yume-idols-adult-18','yes')}catch{}const k=pending;pending=null;ageDialog.close();if(k)choose(k)});
cancel.addEventListener('click',()=>{pending=null;ageDialog.close()});
ageDialog.addEventListener('close',()=>{pending=null});
render();
})();