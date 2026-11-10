/* Yume gravure discovery update 10 Nov 2026.
 * Requested Babepedia ranking could not be retrieved; do not claim the rows came from it.
 * Actual sources: Japanese professional gravure ranking and work directory.
 * Fairlist entries selected only where source states an adult age >=20.
 * Meikan entries are editorial leads, reviewed for adulthood; no age asserted.
 * No explicit images and no inferred social handles.
 */
(()=>{'use strict';const previous=window.YumeIdolsDiscovery;if(!previous||!Array.isArray(previous.people))return;
const rows=[["水野Reta","Mizuno Reta","https://fairlist.net/ranking/"],["松島かのん","Kanon Matsushima","https://fairlist.net/ranking/"],["蓬莱舞","Mai Horai","https://fairlist.net/ranking/"],["ちとせよしの","Yoshino Chitose","https://fairlist.net/ranking/"],["涼井菜生","Nao Suzui","https://fairlist.net/ranking/"],["七瀬なな","Nana Nanase","https://fairlist.net/ranking/"],["髙野真央","Mao Takano","https://fairlist.net/ranking/"],["谷口彩菜","Ayana Taniguchi","https://fairlist.net/ranking/"],["美波那緒","Nao Minami","https://fairlist.net/ranking/"],["佐野なぎさ","Nagisa Sano","https://fairlist.net/ranking/"],["加藤玲菜","Rena Kato","https://fairlist.net/ranking/"],["坂巻有紗","Arisa Sakamaki","https://fairlist.net/ranking/"],["宮部のぞみ","Nozomi Miyabe","https://fairlist.net/ranking/"],["福井梨莉華","Ririka Fukui","https://fairlist.net/ranking/"],["香月杏珠","Anju Kouzuki","https://gravure-meikan.jp/"],["柳瀬早紀","Saki Yanase","https://gravure-meikan.jp/"],["原つむぎ","Tsumugi Hara","https://gravure-meikan.jp/"],["斎藤恭代","Yasuyo Saito","https://gravure-meikan.jp/"]];
const norm=x=>String(x||'').normalize('NFKC').normalize('NFKD').toLowerCase().replace(/[\u0300-\u036f\s・･._\-'’()]/g,'');
const people=previous.people.slice();const found=new Map();
people.forEach((p,i)=>{if(p.category!=='gravure')return;for(const n of [p.name,p.alternate])if(n)found.set(norm(n),i)});
const added=[],existing=[];
for(const [jp,en,url] of rows){let i=found.get(norm(jp));if(i===undefined)i=found.get(norm(en));
if(i!==undefined){existing.push(en);continue}
people.push({category:'gravure',name:en,alternate:jp,country:'JP',source:url,sourceLabel:url.includes('fairlist')?'Fairlist · classifica 9 novembre 2026':'Gravure Meikan · repertorio professionale 2026',sourceKind:'directory editoriale da approfondire',officialProfile:null,platform:null,photoFile:null,photoSource:null,gravureEditorialSources:[url],gravureIndexVerification:'nome presente in repertorio editoriale; dati anagrafici da verificare'});
found.set(norm(en),people.length-1);found.set(norm(jp),people.length-1);added.push(en)}
const sources={...previous.sources,gravureFairlistNov2026:{label:'Fairlist · gravure ranking 9 novembre 2026',url:'https://fairlist.net/ranking/',kind:'classifica editoriale'},gravureMeikan2026:{label:'Gravure Meikan · directory 2026',url:'https://gravure-meikan.jp/',kind:'directory professionale'}};
window.YumeIdolsDiscovery=Object.freeze({...previous,people,sources,updated:'2026-11-10',stats:{...previous.stats,entries:people.length,sources:Object.keys(sources).length}});
window.YumeGravureNov2026=Object.freeze({requestedSource:'https://www.babepedia.com/gravureidoltop100',requestedSourceAccessible:false,verifiedAlternativeSources:['https://fairlist.net/ranking/','https://gravure-meikan.jp/'],reviewed:rows.length,added,existing,updated:'2026-11-10'});
})();
