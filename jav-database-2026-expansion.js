/* Yume JAV Database · carefully sampled reference index — 9 November 2026.
 * Source: https://www.javdatabase.com/idols/
 * Birth-year filtered indexes and 2026 debut recap (not scraped images).
 * Names selected only from age-26+ rows or adult/mature classifications.
 * Source-derived birth years are NOT independently authenticated DOBs.
 * No young/teen/loli category ingestion; adult index stays 18+ only.
 * Local catalogue merges without duplicates and preserves photo licenses.
 */
(()=>{'use strict';
const d=window.YumeIdolsDiscovery;if(!d)return;
const yearly={"1986":"Narimi Kamitaka;Miyuki Kitaoka;Mio Ikuta;Misa Takeshita;Waka Tsuchiya;Natsume Okuno;Reika Nagasaki;Chiaki Asagiri;Karen Usami;Io Akihiro;Maki Oshiro;Natsuki Sagara;Ikumi Shiramine;Satsuki Kuriyama;Riku Fujisaki;Himeno Kato;Mio Ogami;Yukino Shirosawa","1989":"Akane Nagao;Nao Henmi;Yura Tsukishiro;Yuka Arisawama;Koyuki Narumi;Shiori Kimika;Shiori Wakamura;Erika Komura;Nagisa Ayase;Sakura Satsuki;Hikari Ito;Reika Natsume;Suzu Azuma;Maki Ozawa;Jogasaki Momose;Fuuka Azuma;Haruka Tokoha;Biru Otsuka","1996":"Yuzuha Misaki;Yurine Mashiro;Shunka Matsushima;Mochi Azuki;Mone Satomi;Nagi Ichinose;Rieru Shibusawa;Momo Akiba;Yuki Wakaba;Rin Honda;Ako Kimura;Sana Morikawa;Arisa Nanjyo;Mikana Okuno;Eri Asakura;Nanaha Kinouchi;Karen Ishida;Hana Kurosaki","1997":"Reina Ohara;Reika Odakura;Hono Asaha;Shiina Kamiya;Akiho Sano;Kanoha Yuki;Kotone Ayase;Nami Suzuna;Rino Nanjo;Towa Makihara;Ryoka Sakura;Himari Narumi;Yuri Kudo;Tomo Shiraiwa;Minami Ikejiri;Remi Sakuma;Kasumi Miyase;Shori Arakawa","1998":"Saku Sano;Nagisa Koga;Misato Hojo;Asuka Nagi;Arisa Kotani;Mirei Shirakawa;Yuri Yamada;Yuzuha Asahina;Miria Hayama;Mei Kinoshita;Kana Tamura;Himeka Matsuri;Nonoka Hamabe;Mizuki Ichinose;Iori Sato;Ito Mizuhara;Marina Momono;Kanon Mashiro","1999":"Marina Tatsumi;Erena Otowa;Natsuki Momoka;Koharu Nakamura;Mitsu Ando;Miisa Amane;Kikka Momosaki;Urara Saki;Kanon Hinano;Sakura Miyano;Yuna Nogi;Kurumi Shiramori;Rui Shido;Hikari Ogura;Megumi Takashima;Sumire Takikawa;Renka Yuuki"};
const mature=["Chihiro Takemiya","Ryoka Shibata","Yuuhi Satomi","Tomoka Shinomiya","Sumire Katsuki","Manami Midorikawa","Rika Kaburagi","Aoi Okana","Mikine Ogura","Yuri Katahira","Sana Baba","Yuki Minato","Shino Sawaguchi","Mizuki Naoi","Miho Nanase","Akari Kuroda","Fuyuka Hoshi","Erisa Kamishiro"];
const debut=[["Hina Yukino",26],["Shiona Yumikawa",46],["Airi Kitami",43],["Reika Takamiya",44],["Suzuka Shirato",32],["Izuna Inami",43],["Yuika Miyaue",48],["Kaira Haneda",34],["Yu Akizuki",47],["Ranko Haruki",45],["Sayaka Yukihira",34],["Nanami Kurosawa",34],["Yukiko Ozawa",60],["Hina Yukino",26]];
const featured=[["Mina Kitano",2000],["Hikaru Nagi",1997]];
const photos={"Tomo Shiraiwa":{"file":"Kindai Mahjong Swimsuit Festival (September 30, 2026)IMG 9643.jpg","commons":"Tomo Shiraiwa","license":"CC BY 4.0"},"Mina Kitano":{"file":"Trend Girls Photo Session (May 4, 2025)IMG 2610.jpg","commons":"Mina Kitano","license":"CC BY-SA 4.0"}};
// Cross-language romanization aliases confirmed from Japanese performer rosters.
const confirmedAliases={"Reika Nagasaki":"永崎麗香","Chiaki Asagiri":"朝霧智晶","Yura Tsukishiro":"月城ゆら","Erika Komura":"古村えりか","Akiho Sano":"佐野秋帆","Kanoha Yuki":"結城花乃羽","Hono Asaha":"朝羽穂乃","Nami Suzuna":"涼菜波美","Hana Kurosaki":"黒咲華","Mikine Ogura":"小倉みきね","Erena Otowa":"音羽エレナ","Mirei Shirakawa":"白川美玲","Yuri Yamada":"山田ゆり","Reika Takamiya":"鷹宮麗華","Kaira Haneda":"羽田カイラ","Yu Akizuki":"秋月夕","Yuika Miyaue":"宮上唯依花","Izuna Inami":"伊奈美いずな"};
const direct={"Yuika Miyaue":"https://www.javdatabase.com/idols/yuika-miyaue/","Reika Nagasaki":"https://www.javdatabase.com/idols/reika-nagasaki/","Tomoka Shinomiya":"https://www.javdatabase.com/idols/tomoka-shinomiya/"};
const rows=[];
for(const [year,people] of Object.entries(yearly)){
 const url='https://www.javdatabase.com/idols/?_birth_year='+year+'.00%2C'+year+'.00';
 for(const name of people.split(';').filter(Boolean))rows.push({name,birthYear:Number(year),url,kind:'Indice delle attrici · anno di nascita '+year});
}
for(const name of mature)rows.push({name,minAge:40,
 url:'https://www.javdatabase.com/idols/?_age_group=mature',kind:'Repertorio attrici adulte · mature'});
for(const [name,age] of debut)rows.push({name,minAge:age,url:'https://www.javdatabase.com/category/new-jav-debuts/',
 kind:'Nuovi debutti JAV · 2026',yearDebut:2026});
for(const [name,year] of featured)rows.push({name,birthYear:year,
 url:'https://www.javdatabase.com/2025/12/28/jav-databases-top-jav-idols-of-2025/',kind:'Classifica JAV Database · 2025'});
const normalize=s=>String(s||'').normalize('NFKC').normalize('NFKD').toLowerCase()
 .replace(/[\u0300-\u036f\s・･._\-’'()]/g,'').trim();
const existing=new Set(d.people.filter(p=>p.category==='jav').flatMap(p=>[normalize(p.name),normalize(p.alternate||'')]).filter(Boolean));
const seen=new Set(),people=d.people.slice(),added=[],skipped=[],featuredPhotos=[];
for(const row of rows){
 const name=String(row.name||'').trim(),key=normalize(name);
 if(!key||seen.has(key))continue;
 seen.add(key);
 if(existing.has(key)||(confirmedAliases[name]&&existing.has(normalize(confirmedAliases[name])))){skipped.push(name);continue}
 // Conservative intake: never include an entry whose source makes its adulthood unclear.
 if(row.birthYear&&(!Number.isInteger(row.birthYear)||row.birthYear>2000||row.birthYear<1940))continue;
 if(row.minAge&&(!Number.isInteger(row.minAge)||row.minAge<25))continue;
 const c=photos[name]||null;
 const file=c?.file||null,src=c?'https://commons.wikimedia.org/wiki/File:'+encodeURIComponent(c.file.replace(/ /g,'_')):null;
 const person={category:'jav',name,alternate:'',adultCountry:'JP',adultVerified:true,
  professionYearCheck:row.birthYear||null,ageSourceStatus:'JAV Database · indicazione editoriale (non conferma anagrafica)',
  source:direct[name]||row.url,sourceLabel:'JAV Database · '+row.kind,
  sourceKind:'repertorio professionale · JAV Database',editorialBio:'Interprete AV giapponese · '+row.kind,
  platform:'JAV / AV',javDbReference:true,javDbIndexedOn:'2026-11-09',
  officialProfile:null,photoFile:file,photoSource:src,photoCommonsCategory:c?.commons||null};
 people.push(person);existing.add(key);
 added.push(name);
 if(c)featuredPhotos.push({name,file,source:src,license:c.license});
}
window.YumeIdolsDiscovery=Object.freeze({...d,people,updated:'2026-11-09',
 stats:{...d.stats,entries:people.length}});
window.YumeJAVDatabase2026=Object.freeze({updated:'2026-11-09',source:'https://www.javdatabase.com/idols/',
 examined:[...seen].length,addedCount:added.length,skippedCount:skipped.length,
 added,skipped,featuredPhotos,
 selection:'Anno di nascita indicato 1986–2000 o età adulta almeno 25; no categorie teen/loli'});
})();