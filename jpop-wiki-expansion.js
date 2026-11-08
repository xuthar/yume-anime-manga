/* Yume × Japanese Music Wiki: curated 2025–2026 idol discovery.
 * Sources: direct Fandom group pages, supplemented with official rosters.
 * No guessed birthdays, relatives, locations of private persons or photos.
 * Snapshot: 2026-11-08. Rosters may change; see original links.
 */
(()=>{'use strict';
 const previous=window.YumeIdolsDiscovery;
 if(!previous)return;
 // roster strings use "artist name|published Japanese artist name"; no name interpolation.
 const records=[
 ['Full Course',2026,'Tokyo','HEROINES × TWIN PLANET','https://jpop.fandom.com/wiki/Full_Course',null,
  'Nakagawa Cocoro|中川心;Abe Nanami|阿部菜々実;Suzuki Haruka|鈴木遥夏;Konoha Cona|小葉こな;Kaneshiro Maki|金城まき;Osaki Mihane|桜咲みはね;Mizukami Rimika|水上凜巳花'],
 ['Harunision',2025,'Tokyo','Idol pop','https://jpop.fandom.com/wiki/Harunision',null,
  'Kurumi Toi|来海とい;Baba Sayaka|馬場彩華;Serizawa Kokoro|芹沢心色;Nagahama Ruka|長浜瑠花;Murase Yuuna|村瀬ゆうな;Fukuma Ayane|福間彩音'],
 ['New Crown',2024,'Tokyo','Idol pop · nuove componenti 2026','https://jpop.fandom.com/wiki/New_Crown',null,
  'Shiraishi Rin|白石凛;Mashiro Moe|真白萌;Riian|りぃあん;Sano Aoi|佐野葵;Ichinose Moa|一ノ瀬萌愛'],
 ['Periculum',2025,'Tokyo','Underground idol · nuova formazione 2026','https://jpop.fandom.com/wiki/Periculum',null,
  'Aimu Nico|愛夢にこ;Shiruna Shio|紫月しお;Himeno Ano|姫乃あの;Hinagi Urara|緋凪うらら'],
 ['Y∀KiN',2025,'Nagoya','FreoMotto · Nagoya','https://jpop.fandom.com/wiki/Y%E2%88%80KiN',null,
  'Oriyama Azu|織山あず;Shirosaki Ria|城咲莉愛;Asamiya Shione|朝宮しおね;Hiiragi Riria|柊木璃々歩'],
 ['YUGUREMI',2025,'Tokyo','Alternative idol · TRACE SILVER','https://jpop.fandom.com/wiki/YUGUREMI',null,
  'Sakura Yume|咲桜ゆめ;Kasumine Ayana|霞音あやな;Nakaharu Aji|仲昏アジ;Myoujou Hibi|明星響'],
 ['@youuuuu!!!',2025,'Tokyo','Idol pop · aggiornamenti 2026','https://jpop.fandom.com/wiki/%40youuuuu%21%21%21',null,
  'Tsukino Seina|月乃星愛;Usua Karin|薄明かりん;Kinami Yui|樹波由依;Tamaki Lulu|環るる;Mochita Arice|もちたありす'],
 ['iCON!',2025,'Tokyo','PRODUCTION IDOL BANG · nuovo roster 2026','https://jpop.fandom.com/wiki/ICON%21',null,
  'Hoshina Anzu|星奈杏;Fuyutsuki Sana|冬月さな;Enomoto Mao|榎本真緒;Himenogi Oto|姫乃樹おと;Shirahama Miku|白浜みく;Ichinose Reia|一ノ瀬れいあ;Inoue Yuna|井上由梛;Narumiya Koyoi|鳴宮こよい'],
 ['Lumi Prima',2026,'Osaka','LumiPri · idol pop','https://jpop.fandom.com/wiki/Lumi_Prima',null,
  'Ruka × Ruka|るか×るか;Sakurahime Nico|椿あい子;Amagi Mero|天城めろ;Uonome|ウオノメ;Hibikine Rira|櫻井桃羽;Mori Miyu|森みゆ'],
 ['RE-GE',2026,'Tokyo','STARDUST PROMOTION × Bandai Namco','https://jpop.fandom.com/wiki/RE-GE','https://re-ge.com/profile/',
  'Shiraishi Ruri|白石るり;Nogimoto Jyui|禾本珠彩;Hanai Kokoro|花井心桜;Takatsuki Riri|高月凛々;Tasaki Anna|田崎杏夏;Morise Cocoro|森瀬こころ;Mizukawa Aoi|瑞川蒼依;Hiyama Yumi|桧山ゆうみ;Nasu Hohomi|那須ほほみ'],
 ['AIWO',2026,'Nagoya','HATENA CREATION · Nagoya','https://jpop.fandom.com/wiki/AIWO',null,
  'Yunomi Yuni|ゆのみゆに;Coco Cola|黒子こーら;Hisame Rui|氷雨るい;Yuuki Meika|結城めいか'],
 ['MADOROMI',2026,'Tokyo','Alternative idol · MAD’S iNK','https://jpop.fandom.com/wiki/MADOROMI',null,
  'Ojo.|堕嬢。;Enma Tora|猿馬虎;Serene Kira|月神キラ;Yamiga Aru|闇牙アル;Fukai Numa|深ゐ沼'],
 ['FRESH CHARM',2026,'Japan','Idol pop · Ichikawa Miori','https://www.j-enta.com/en/artist/806/FRESH%2BCHARM',null,
  'Yamashita Sawa;Komori Shuki;Yamada Ayuka;Hirosaki Nono;Kazunomiya Nana;Takei Karina;Nagase Saki'],
 ['SugarNote',2026,'Tokyo','FLAP ENTERTAINMENT · official roster','https://jpop.fandom.com/wiki/SugarNote','https://sugarnote.jp/en/',
  'Shirosaki Ririho|白咲里莉穂;Sakurai Nanako|櫻井那奈子;Bando Hinata|坂東日奈多;Bando Fuka|坂東楓夏;Saijo Airi|西条藍里;Tsukishiro Rana|月城蘭花'],
 ['unFinale Tokyo',2026,'Tokyo','PLUM JAPAN · Ishida Haruka','https://jpop.fandom.com/wiki/UnFinale_Tokyo','https://www.unfinaletokyo.com/',
  'Ishida Haruka|石田晴香;Fujie Reina|藤江れいな;Kobayashi Chie|小林智絵;Arisu An|彩鈴杏;Kojima Runa|小島瑠那;Oborone Ruru|朧音るる;Yabu Sayo|八伏紗世'],
 ['Final Epilogue',2024,'Nagoya','StageA Production · support member included','https://jpop.fandom.com/wiki/Final_Epilogue',null,
  'Kohaku Ren|湖白れん;Yumeka Sana|夢叶さな;Koara Amo|恋來あも'],
 ['Kono Idol wa Fiction desu.',2024,'Tokyo','SHU PRODUCTION · roster 2026','https://jpop.fandom.com/wiki/Kono_Idol_wa_Fiction_desu.',null,
  'Sawamura Yuuna|沢村優奈;Yukino Jun|雪野純;Itokawa Hina|糸川ひな;Nitta Kanako|新田夏奈子;Fujino Maiha|藤野まいは;Hoshimiya Yurina|星宮結莉奈']
 ];
 const key=x=>String(x||'').normalize('NFKC').normalize('NFKD').toLocaleLowerCase('en')
   .replace(/[\u0300-\u036f\s・･\-_.’'!?♡×∀]/g,'').trim();
 const groups=records.map(([name,year,region,style,source,official,roster])=>({
  name,year,region,style,source,official:official||null,
  roster:roster.split(';').filter(Boolean).map(line=>{
   const [label,japanese]=line.split('|');return {name:label,japanese:japanese||''}
  })
 }));
 const people=previous.people.slice();
 const sources={...previous.sources,jpopwiki2026:{label:'Japanese Music Wiki · gruppi idol 2025–2026',url:'https://jpop.fandom.com/wiki/Category%3A2026_Group_Formations',kind:'wiki collaborativa; verifica il roster sulla fonte'},
  jpopcurated:{label:'Siti ufficiali e repertori musicali · roster 2026',url:'https://jpop.fandom.com/wiki/Main_Page',kind:'fonti professionali ed editoriali'}};
 const lookup=new Map();
 function remember(p){
  for(const n of [p.name,p.alternate]){
   const k=key(n);if(k.length>3&&!lookup.has(k))lookup.set(k,p);
  }
 }
 people.forEach(remember);
 let addedArtists=0,addedGroups=0,enriched=0;
 function groupMemberLabel(m,g){
  // Single-word stage names are not globally unique; always disambiguate.
  return m.name.split(/\s+/).length<2&&key(m.name).length<8?m.name+' ('+g.name+')':m.name
 }
 for(const g of groups){
  let group=lookup.get(key(g.name));
  if(!group||group.category!=='groups'){
   group={category:'groups',name:g.name,alternate:'',group:g.name,
    source:g.official||g.source,sourceLabel:g.official?g.name+' · sito ufficiale':g.name+' · Japanese Music Wiki',
    sourceKind:g.official?'sito ufficiale + repertorio':'wiki collaborativa · roster da ricontrollare',
    officialProfile:g.official||null,platform:null};
   people.push(group);remember(group);addedGroups++;
  }else{enriched++}
  group.wikiSource=g.source;
  group.wikiRoster=g.roster.map(x=>x.name);
  group.wikiYear=g.year;
  group.wikiGroup='Idol pop giapponese';
  for(const m of g.roster){
   const label=groupMemberLabel(m,g);
   // Never merge a short stage name with an unrelated existing performer.
   const found=[key(label),key(m.japanese)].filter(x=>x.length>=6).map(x=>lookup.get(x)).find(p=>p&&p.category==='music');
   if(found){
    if(!found.group)found.group=g.name;
    found.wikiSource=g.source;found.wikiGroup=g.name;
    if(!found.alternate&&m.japanese)found.alternate=m.japanese;
    enriched++;
    continue
   }
   const person={category:'music',name:label,alternate:m.japanese||'',group:g.name,
    source:g.official||g.source,sourceLabel:g.official?g.name+' · sito ufficiale / Japanese Music Wiki':g.name+' · Japanese Music Wiki',
    sourceKind:g.official?'formazione del gruppo confermata sul sito ufficiale':'wiki collaborativa; formazione alla data della fonte',
    officialProfile:null,platform:null,wikiSource:g.source,wikiGroup:g.name};
   people.push(person);remember(person);addedArtists++;
  }
 }
 const archive=Object.freeze({updated:'2026-11-08',groups,addedArtists,addedGroups,enriched,
  source:'https://jpop.fandom.com/wiki/Main_Page',
  note:'Roster fotografato dalle fonti nel 2026: cambiamenti possibili; nessuna età o foto inferita.'});
 window.YumeJPopWikiArchive=archive;
 window.YumeIdolsDiscovery=Object.freeze({...previous,people,sources,
  stats:{entries:people.length,sources:Object.keys(sources).length},updated:'2026-11-08'});
})();
