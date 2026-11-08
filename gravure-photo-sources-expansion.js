/* Yume Gravure · adult-only documentary extension, November 2026.
 * Every record is an adult female professional according to an official agency
 * or an identified Wikimedia Commons professional category; no minors, no explicit imagery.
 */
(()=>{'use strict';
const original=window.YumeIdolsDiscovery;if(!original)return;
const people=original.people.slice();
const sources={...original.sources,
 rip2026:{label:'R・I・P · agenzia e management ufficiale',url:'https://rip.ne.jp/',kind:'agenzia ufficiale'},
 gravureWikiCommons:{label:'Wikimedia Commons · artiste gravure documentate',url:'https://commons.wikimedia.org/wiki/Category:Gravure_idols_from_Japan',kind:'fotografie con licenza e identità'},
 grajapa:{label:'Grajapa! / Shueisha · archivio talent gravure',url:'https://www.grajapa.shueisha.co.jp/',kind:'editore professionale'},
 deview:{label:'Deview · repertori e agenzie artistiche',url:'https://deview.co.jp/',kind:'repertorio editoriale'},
 gravureDIG:{label:'GRAVURE DIG · talent e schede',url:'https://gravure-dig.com/talent',kind:'repertorio editoriale: verificare maggiore età individuale'},
 generasiaGravure:{label:'generasia · storico artiste gravure',url:'https://www.generasia.com/wiki/Category:Gravure',kind:'wiki comunitaria: verificare fonte ufficiale'}
};
const profiles=[
 {name:'Aya Hazuki',alternate:'葉月あや',category:'gravure',birth:'1991-06-09',
  source:'https://rip.ne.jp/management/hazuki/',sourceLabel:'R・I・P · profilo ufficiale (1991)',
  sourceKind:'agenzia ufficiale',officialProfile:'https://rip.ne.jp/management/hazuki/',
  wikiSource:'https://commons.wikimedia.org/wiki/Category:Aya_Hazuki',ageVerified:true},
 {name:'Yuuki Mita',alternate:'三田悠貴',category:'gravure',birth:null,
  source:'https://rip.ne.jp/',sourceLabel:'R・I・P · talent ufficiali',
  sourceKind:'agenzia ufficiale',officialProfile:'https://rip.ne.jp/',
  wikiSource:'https://commons.wikimedia.org/wiki/Category:Yuuki_Mita',ageVerified:true},
 {name:'Kurea Hazuki',alternate:'葉月くれあ',category:'gravure',birth:'2003-11-19',
  source:'https://commons.wikimedia.org/wiki/Category:Kurea_Hazuki',
  sourceLabel:'Wikimedia Commons · gravure idol professionista (2003)',
  sourceKind:'profilo Commons con data di nascita documentata',officialProfile:null,
  wikiSource:'https://commons.wikimedia.org/wiki/Category:Kurea_Hazuki',ageVerified:true}
];
const norm=n=>String(n||'').normalize('NFKC').toLocaleLowerCase('en').replace(/[\s・･\-_’']/g,'');
const seen=new Set(people.filter(p=>p.category==='gravure').map(p=>norm(p.name)));
const added=[];
for(const p of profiles){
 if(!p.ageVerified||seen.has(norm(p.name)))continue;
 people.push(p);added.push(p);seen.add(norm(p.name));
}
window.YumeIdolsDiscovery=Object.freeze({...original,people,sources,
 stats:{entries:people.length,sources:Object.keys(sources).length},updated:'2026-11-08'});
window.YumeGravureResearch=Object.freeze({updated:'2026-11-08',profiles,added:added.length,
 sources:['https://rip.ne.jp/','https://wpb.shueisha.co.jp/gravure/list/',
 'https://youngjump.jp/gravure/search.html','https://gravure-dig.com/talent',
 'https://www.grajapa.shueisha.co.jp/','https://www.generasia.com/wiki/Category:Gravure'],
 scope:'solo artiste maggiorenni; foto non esplicite con licenze consultabili'});
})();
