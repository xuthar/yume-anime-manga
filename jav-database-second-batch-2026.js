/* JAV Database · second major import, 9 Nov 2026.
   Catalogue entries are names as displayed in public source filters, not scraped photos.
   Birth-year filters are editorial references, not independently verified DOBs.
   The gallery remains non-explicit, behind the 18+ gate.
   Avoid copying film stills, cover art, copyrighted performer headshots.
*/
(()=>{'use strict';
const d=window.YumeIdolsDiscovery;if(!d)return;
const sourceGroups=[{"year":2000,"page":1,"source":"https://www.javdatabase.com/idols/?_birth_year=2000.00%2C2000.00","names":"Hina Yukino;Seren Tsurugi;Nodoka Misasa;Reya Daimon;Mizuki Nishida;Shiori Nagase;Noa Koitsuki;Tamaki Shinokura;Iroha Sakurai;Karen Mitsuki;Seira Kanamori;Mio Hanasaki;Airi Ichise;Ai Aina;Jadilica;Hikari Imada;Itsuki Yukimura;Kaho Satake"},{"year":2002,"page":1,"source":"https://javdb.steg.gg/idols/?_birth_year=2002.00%2C2002.00","names":"Haruka Tachibana;Sarasa Tsuji;Ciel Kururugi;Sachi Yamada;Ayuna Uehara;Marika Sonoda;Tsumugi Nagano;Rinon Sono;Saho Shinozaki;Moa Hanazono;Nanami Aoba;Uta Miyoshi;Mio Sakai;Yuki Kona;Ouka Yoshida;Asumi Miona;Mirina Kishinaga;Mina Sashihara"},{"year":2002,"page":13,"source":"https://javdb.steg.gg/idols/page/13/?_birth_year=2002.00%2C2002.00","names":"Reiai Sarashina;Mimu Yokozawa;Mugi Shinonome;Moeka Kato;Amu Amatsuka;Ayame Imano;Kasumi Tsukino;Uta Tenno;Airi Shiomi;Rikka Ono"},{"year":2004,"page":1,"source":"https://www.javdatabase.com/idols/?_birth_year=2004.00%2C2004.00","names":"Ena Minami;Arisa Saijo;Kotori Natsume;Seina Hayase;Karen Misaki;Neru Hoshizora;Sena Yoshiki;Momo Fukatsu;Yuri Kurusu;Mone Mizuno;Urara Momojiri;Hiyori Sasakura;Amu Shida;Yua Shimizu;Shiori Mamiya;Yui Amanatsu;Momo Inoue;Tsugumi Aida"},{"year":1995,"page":1,"source":"https://javdb.steg.gg/idols/?_birth_year=1995.00%2C1995.00","names":"Tsuki Shibuya;Miu Nikaido;Rio Saeki;Itsuki Asami;Jun Shiraishi;Asuka Tsukimoto;Nanami Mihi;Mio Kuon;Suzuno Kashima;Kaori Mitsuki;Kanae Mitsuki;Shiho Hanasaki;Ayaka Asahina;Haruka Nanasegawa;Tamaki Umino;Yuki Kotone;Chinatsu Mizumoto"},{"year":1995,"page":2,"source":"https://javdb.steg.gg/idols/page/2/?_birth_year=1995.00%2C1995.00","names":"Haruka Kitagawa;Shuri Mitsumori;Kotone Tsukino;Saaya Motoyoshi;Ayane Ishihara;Emiko Kono;Kaede Tsukahara;Fumika Kashiwagi;Minami Umeda;Ai Shinoda;Sakura Kamiya;Mai Koine;Sumire Minato;Reiko Himori;Manaka Hoshina;Nanase Mizusawa;Rino Tanaka;Fumino Satsuki"},{"year":1983,"page":1,"source":"https://javdb.steg.gg/idols/?_birth_year=1983.00%2C1983.00","names":"Kanan Haruta;Airi Kitami;Izuna Inami;Akari Moriyama;Miyabi Inamori;Ema Nanasawa;Misato Okui;Risako Takeuchi;Yuu Fukuda;Ayaha Mikumo;Mitsuno Maehara;Yuri Katahira;Natsumi Sasaoka;Karen Yamashita;Azusa Amami;Fumina Sakurai;Satsuki Hoshikawa;Shuho Kiryu"},{"year":1983,"page":2,"source":"https://javdb.steg.gg/idols/page/2/?_birth_year=1983.00%2C1983.00","names":"Shiori Aizawa;Minami Shirakawa;Otoha Kuchiki;Iroha Natsume;Anna Kishi;Mako Oda;Hikaru Usada;Sanae Arimura;Ayaka Seki;Yurika Mikawa;Mitsuha Kikuta;Miho Iwasaki;Miha Hano;Maiko Inoue;Mikoto Uemura;Ririko Kinoshita"},{"year":1996,"page":3,"source":"https://javdb.steg.gg/idols/page/3/?_birth_year=1996.00%2C1996.00","names":"Mio Ichijo;Rinka Momozono;Natsuki Takeuchi;Azusa Ono;Suzu Harumiya;Sana Matsunaga;Nao Satsuki 2;Asuka Hoshimi;Karin Kotooki;Maria Aine;Sayaka Ikeda;Aoi Tominaga;Erina;Izumi Imamiya;Megu Mizumori;Abi Momose;Rika Matsuyama;Misa Katase"}];
const supplemental=["Ai Uehara,1989","Ai Sayama,1989","Yu Shinoda,1991","Hana Haruna,1988","Ririko Kinoshita,1983","Mako Oda,1983","Meari Tachibana,1993","Eimi Fukada,1998","Momoko Isshiki,1977","Miu Shiromine,1997","Maki Hojo,1978","Saeko Matsushita,1990","Chitose Saegusa,1991","Nao Jinguji,1997","Maki Tomoda,1972","Aka Asuka,2000","Ayaka Mutou,1981","Karen Yuzuriha,2001","Mizuki Yayoi,1998","Chisato Shoda,1968","Riho Fujimori,1994","Asahi Mizuno,1990","Reiko Kobayakawa,1982","Maria Nagai,1996","Mina Kitano,2000","Mizuho"];
const normalize=s=>String(s||'').normalize('NFKC').normalize('NFKD').toLowerCase().replace(/[\u0300-\u036f\s・･._\-’'()]/g,'').trim();
const known=new Set(d.people.filter(p=>p.category==='jav').flatMap(p=>[normalize(p.name),normalize(p.alternate||'')]).filter(Boolean));
const duplicateAliases={
  'Izuna Inami':'伊奈美いずな', 'Reya Daimon':'大門レヤ',
  'Mizuki Nishida':'西田瑞希', 'Miu Nikaido':'二階堂美雨',
  'Mirei Shirakawa':'白川美玲', 'Yuri Yamada':'山田ゆり',
  'Mina Kitano':'北野未奈', 'Maki Tomoda':'友田真希',
  'Miu Shiromine':'白峰ミウ', 'Mizuki Yayoi':'弥生みづき',
  'Erena Otowa':'音羽エレナ','Shiori Aizawa':'相沢しおり',
  'Mio Sakai':'酒井美緒','Anri Fujiura':'藤浦杏里',
  'Saeka Mizuhara':'水原さえか','Mako Oda':'織田真子',
  'Maria Nagai':'永井マリア','Asahi Mizuno':'水野朝陽',
  'Ai Sayama':'佐山愛','Reika Nagasaki':'永崎麗香',
  'Yuri Katahira':'片平ゆり', 'Mina Kitano':'北野未奈'
};
const people=d.people.slice(),added=[],skipped=[],conflicts=[],seen=new Set();
const ingest=(name,year,source,filter)=>{
 name=String(name||'').trim();const key=normalize(name);if(!key||seen.has(key))return;
 seen.add(key);
 if(!Number.isInteger(year)||year<1940||year>2004){conflicts.push(name);return;}
 if(known.has(key)||duplicateAliases[name]&&known.has(normalize(duplicateAliases[name]))){skipped.push(name);return;}
 const person={category:'jav',name,alternate:'',adultCountry:'JP',adultVerified:false,
  professionYearCheck:year,ageSourceStatus:'Fonte editoriale: filtro di anno di nascita (non documento ufficiale)',
  javDbReference:true,javDbIndexedOn:'2026-11-09',javDbPhase:'estensione 2',
  source,sourceLabel:'JAV Database · '+filter,sourceKind:'database pubblico professionale',
  editorialBio:'Interprete JAV · repertorio per anno di nascita '+year,
  platform:'JAV / AV',photoFile:null,photoSource:null};
 people.push(person);known.add(key);added.push(name);
};
for(const row of sourceGroups){if(row.year>2004||row.year<1940)continue;
 for(const name of row.names.split(';'))ingest(name,row.year,row.source,'elenco anno '+row.year+', pagina '+row.page);
}
for(const text of supplemental){const m=text.match(/^(.*),(\d{4})$/);if(!m)continue;
 ingest(m[1],Number(m[2]),'https://sextb.net/list-actress','repertorio supplementare con data di nascita');
}
window.YumeIdolsDiscovery=Object.freeze({...d,people,updated:'2026-11-09',
 stats:{...d.stats,entries:people.length}});
window.YumeJAVDatabaseSecondBatch=Object.freeze({updated:'2026-11-09',
 sourceGroups:sourceGroups.length,reviewed:seen.size,added,skipped,conflicts,
 sources:['https://www.javdatabase.com/idols/','https://sextb.net/list-actress'],
 policy:'Only adult professional identities. No scraped photos, no copies of film covers.'});
})();