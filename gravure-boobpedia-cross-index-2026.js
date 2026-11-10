/* User-provided Boobpedia artist directory links, 2026-11-10.
 * Secondary cross-index only; do not copy photos, sensitive traits or claim adult status.
 * Category article "Gravure idol" intentionally omitted.
 */
(()=>{'use strict';const previous=window.YumeIdolsDiscovery;if(!previous?.people)return;
const names=["Ai Kawanaka","Ai Koromo","Ai Maehara","Ai Minagi","Ai Nakayama","Ai Shinozaki","Airi Nakajima","Aive","An Tsujimoto","Anna Konno","Anri Okita","Anri Sugihara","Aoi Ibuki","Asana Mamoru","Atsuko Okamoto","Azumi Harusaki","Azumi Nakama","Chikako Aoyama","Eimi Fukada","Fuko","Fumina Suzuki","Hinako Sano","Hitomi Aizawa","Hitomi Kitamura","Hitomi Tanaka","Jun Amaki","Jun Serizawa","Kanako Urai","Kokone Sasaki","Mai Nishida","Mikie Hara","Moemi Katayama","Non Ohana","Noriko Endo","Ran Niyama","Reon Kadena","Rina Hashimoto","Rio Natsume","Risa Murakami","Rui Kiriyama","Saaya Irie","Saki Yanase","Saya Kataoka","Sayuki Matsumoto","Tsukasa Wachi","Yoko Kumada","Yoko Matsugane","Yua Sakuya","Yukie Kawamura","Yuu Tejima","Yuuri Morishita"];
const norm=s=>String(s||'').normalize('NFKC').normalize('NFKD').toLowerCase().replace(/[\u0300-\u036f\s・･._'’()\-]/g,'');
const people=previous.people.slice(),idx=new Map(),matched=[],added=[],ambiguous=[];
const register=(s,i)=>{const key=norm(s);if(!key)return;const arr=idx.get(key)||[];arr.push(i);idx.set(key,arr)};
people.forEach((p,i)=>{for(const n of [p.name,p.alternate,...(p.otherStageNames||[])])if(n)register(n,i)});
for(const name of names){
 const url='https://www.boobpedia.com/boobs/'+encodeURIComponent(name.replaceAll(' ','_'));
 const hits=idx.get(norm(name))||[];
 const g=hits.find(i=>people[i].category==='gravure');
 if(g!==undefined){const p=people[g];people[g]={...p,boobpediaCrossReference:url,gravureEditorialSources:[...new Set([...(p.gravureEditorialSources||[]),url])]};matched.push(name);continue}
 if(hits.length)ambiguous.push(name);
 const record={category:'gravure',name,alternate:'',source:url,sourceLabel:'Boobpedia · repertorio di confronto fornito dall’utente',sourceKind:'directory non autorevole per biografia, età o licenza foto',officialProfile:null,photoFile:null,photoSource:null,ageVerified:false,boobpediaCrossReference:url,gravureIndexVerification:'identità e fotografia da verificare indipendentemente'};
 people.push(record);register(name,people.length-1);added.push(name);
}
window.YumeIdolsDiscovery=Object.freeze({...previous,people,updated:'2026-11-10',stats:{...previous.stats,entries:people.length}});
window.YumeBoobpediaGravureCrossIndex=Object.freeze({reviewed:names.length,matched,added,ambiguous,updated:'2026-11-10'});
})();