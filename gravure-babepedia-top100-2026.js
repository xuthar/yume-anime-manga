/* Yume Gravure · Babepedia Top 100 as TRANSCRIBED BY USER, 2026-11-10.
 * No claim that Babepedia was crawled, no current ranking guarantee.
 * Source is a cross-category popularity list, NOT proof of profession or adulthood.
 * No automatic AV classification, DOB, inferred photos, biography or handles.
 * Original rank retained for traceability, not used as site ranking.
 */
(()=>{'use strict';
const previous=window.YumeIdolsDiscovery;if(!previous||!Array.isArray(previous.people))return;
const ranked=["Shion Utsunomiya","Kanna Seto","Haru Minato","Anri Okita","Momona Koibuchi","Hikaru Nagi","Maki Shinkai","Seina Matsuda","Cjd Arisa","Nao Jinguji","Nanami Asahi","Tina Kitsune","Airi Kato","Asuka Kijima","Mio Matsuda","Momo Misono","Asami Sakanoue","Asana Mamoru","Hikari Kuroki","Cjd Aika","Rina Hashimoto","Saeko Kondo","Seira Nagasawa","Asuna Kawai","Minami Kato","Rena Kato (Gravure Idol)","Rika Izumi","Yumi Mizusaki","Cjd Haruka","Cjd Ena","Chu Chu","Sachiko Aizawa","Chiemi Kai","Ayaka Miyoshi","Miyu Murashima","Kenken","Mai Nishida","Akane Yoshinaga","Tao Tsuchiya","Mina Shirakawa","Natsumi Hirajima","Yu Tano","Kaia Kitsune","Hiroko Okabe","Shinonome Umi","Kiriya Matsuri","Haru Aoi","Ai Yamada","Kei Fubuki","Miyu Yoshii","Asuka Kishi","Cjd Minami","Satomi Ishihara","Neti JP","Rina Nagai","Riho Takada","Yumena Nishino","Miho Abe","Ume Hyakka","Cjd Miyabi","Yuki Odera","Airi Shirakawa","Kana Nakada","Jun Amaki","Reon Kadena","Ai Shinozaki","Kumiko Takeda","Sena Natsuki","Hiroe Igeta","Rina Saito","Kana Tsugihara","Rina Fujisaki","Erika Ikuta","Yuka Someya","Mio Kimishima","Anri Morishima","Enako (Cosplayer)","Tsubasa Amami","Cjd Kyon","Cjd Aoi","Rion Hiiragi","Erisa Kusunoki","Cjd Kyrie","Moeka Sasaki","Amano Chiyo","Emi Kobayashi","Chisato Morishita","Fumie Nakajima","Azusa Yamamoto","Ai Okawa","Eriko Sato","Amau Kisumi","Nanaka Fukue","Yuu Yamamoto","Natsuki Abe","Ai Uehara","Midori Nagatsuki","Shiori Kaneko","Yuuki Fukasawa","Anri Sakura"];
const source='https://www.babepedia.com/gravureidoltop100';
const norm=x=>String(x||'').normalize('NFKC').normalize('NFKD').toLowerCase().replace(/[\\u0300-\\u036f\\s・･._\\-'’()]/g,'');
const canonical=x=>x.replace(/^Cjd /i,'CJD ').replace(/ \(Gravure Idol\)$/i,'').replace(/ \(Cosplayer\)$/i,'');
const people=previous.people.slice();const byName=new Map();
people.forEach((p,i)=>{for(const n of [p.name,p.alternate])if(n){const key=norm(n);if(!byName.has(key))byName.set(key,[]);byName.get(key).push(i)}});
const added=[],matched=[],ambiguous=[];
ranked.forEach((original,i)=>{
const name=canonical(original),key=norm(name),matches=byName.get(key)||[];
const gravureMatch=matches.find(index=>people[index].category==='gravure');
if(gravureMatch!==undefined){const p=people[gravureMatch];people[gravureMatch]={...p,babepediaGravureRank:i+1,babepediaGravureSource:source,gravureEditorialSources:[...new Set([...(p.gravureEditorialSources||[]),source])]};matched.push({name,rank:i+1,category:'gravure'});return}
if(matches.length){ambiguous.push({name,rank:i+1,existingCategories:[...new Set(matches.map(j=>people[j].category))]});}
// Editorial lead; potentially an actress, cosplayer, or adult-video performer.
// Never assert an unverified age or classify as JAV based only on this list.
const record={category:'gravure',name,alternate:'',country:'JP',source,sourceLabel:'Babepedia · Top Gravure Idols (pagina 1, trascrizione utente)',sourceKind:'classifica fornita dall’utente · identità e professione da verificare',officialProfile:null,platform:null,photoFile:null,photoSource:null,ageVerified:false,biographyVerification:'pending',babepediaGravureRank:i+1,babepediaGravureSource:source,gravureEditorialSources:[source],gravureIndexVerification:'candidato editoriale: attività gravure e maggiore età da verificare'};
people.push(record);const j=people.length-1;if(!byName.has(key))byName.set(key,[]);byName.get(key).push(j);added.push({name,rank:i+1});
});
const sources={...previous.sources,babepediaGravureTop100:{label:'Babepedia · Top Gravure Idols (prima pagina, elenco fornito dall’utente)',url:source,kind:'classifica community, non fonte biografica verificata'}};
window.YumeIdolsDiscovery=Object.freeze({...previous,people,sources,updated:'2026-11-10',stats:{...previous.stats,entries:people.length,sources:Object.keys(sources).length}});
window.YumeBabepediaGravureTop100=Object.freeze({updated:'2026-11-10',source,sourceAccess:'trascrizione utente, non accesso automatico',reviewed:ranked.length,added,matched,ambiguous,warning:'Posizione nella classifica non equivale a professione verificata, età accertata o licenza fotografica.'});
})();
