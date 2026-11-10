/* Yume Babepedia page 4, user-provided list dated 2026-11-10.
 * This is an editorial index; links alone do not verify identity, age,
 * reusable photo license, social handles, or current profession. */
(()=>{'use strict';
const old=window.YumeIdolsDiscovery;if(!old?.people)return;
const names=["Eriko Tamura","Hana Takeuchi","Nashiko Momotsuki","Ikechan","Kaho Takashima","Katoyuri","Misa Aisakura","Sana Mashiro","Aya Hazuki","Kirara Asuka","Nano Ogasawara","Fumiko Sawada","Kyouka","Miyu Kataoka","Hinako Sano","Eri Ishikawa","Saki Aoyama","Tsukiko Ishiguro","Memo Oba","Nozomi Shirakawa","Rumika Fukuda","Kasumi Arimura","MomoRina","Eiko Koike","Mei Washio","Risa Yukihira","Akane Yoshizawa","Iroha Yanagi","Otono Sakurai","Mayu Koseta","Kana Kurashina","Rie Kaneko","Anju Kozuki","Mayuka Okada","Guo Yun Meng","Seiko Kirishima","Ume Hoshino","Anna Kami","Hazuki Kimura","Raimu Hanasaki","Unagi Sayaka","Hotaru Kusakabe","Rei Okamoto","Mei Fujikawa","COCO (Gravure Idol)","Rarumu Fujikawa","Chieko Shiratori","Koto Hoshino","Makoto Sanada","Anna Ishibashi","Reia Inoko","Yuka Natsumi","Yume Shinjo","Minaho Ariga","Midori Takasago","Yuno Mizusawa","Cjd Chiaki","Mika Orihara","Nanako Kurosaki","Madoka Natsume","Momoko Tani","Aoi Mizobata","Minori Inudo","Miwa Oshiro","Mine Riorio","Yua Sakuya","Yuna Kono","Ayuri Iisaku","Cocoa Tani","China Fukunaga","Marie Sukegawa","Yuka Yoshida","Nana Yamada","Misao Aikawa","Kokoro Shinozaki","Ru Yumemi","Usa Hiiragi","Saki Akai","Hinako Kitano","Rika Ishikawa","Rika Sato","June Liu","Ayano Sumida","Kaori Morishima","Papiko Gurabia","Nemoto Harumi","Eunji Pyo","Wakana Uehara","Towa Momoki","Kaori Manabe","Ayako Yamanaka","Maggy (Model)","Niko Kawagoe","Hana Haruna","Miku Ito","Anna Ishida","Erica Tonooka","Yuria Takaki","Anna Ito","Sayumi Michishige"];
const norm=x=>String(x||'').normalize('NFKC').normalize('NFKD').toLowerCase().replace(/[\u0300-\u036f\s・･._'’()\-]/g,'');
const canon=x=>x.replace(/ \((?:Gravure Idol|Model)\)$/,'').replace(/^Cjd /i,'CJD ');
const people=old.people.slice(),idx=new Map(),added=[],enriched=[];
people.forEach((p,i)=>{for(const n of [p.name,p.alternate])if(n){const k=norm(n);if(!idx.has(k))idx.set(k,[]);idx.get(k).push(i)}});
for(let i=0;i<names.length;i++){
 const original=names[i],name=canon(original),url='https://www.babepedia.com/babe/'+original.replaceAll(' ','_');
 const match=(idx.get(norm(name))||[]).find(j=>people[j].category==='gravure');
 if(match!==undefined){const p=people[match];people[match]={...p,babepediaFourthListPosition:i+1,babepediaFourthProfileSource:url,gravureEditorialSources:[...new Set([...(p.gravureEditorialSources||[]),url])]};enriched.push(name);continue}
 const p={category:'gravure',name,alternate:'',source:url,sourceLabel:'Babepedia · pagina 4 (elenco fornito dall’utente)',sourceKind:'repertorio editoriale · identità/professione da verificare',officialProfile:null,platform:null,photoFile:null,photoSource:null,ageVerified:false,babepediaFourthListPosition:i+1,babepediaFourthProfileSource:url,gravureIndexVerification:'candidato editoriale; biografia, social e foto da confermare'};
 people.push(p);const k=norm(name);if(!idx.has(k))idx.set(k,[]);idx.get(k).push(people.length-1);added.push(name);
}
window.YumeIdolsDiscovery=Object.freeze({...old,people,updated:'2026-11-10',stats:{...old.stats,entries:people.length}});
window.YumeBabepediaFourth100=Object.freeze({reviewed:names.length,added,enriched,source:'user provided Babepedia page 4',updated:'2026-11-10'});
})();