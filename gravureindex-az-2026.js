/* Yume Gravure · 239-name A–Z index supplied by a user on 2026-11-09.
 * Requested index URL: https://gravureindex.com/idols/
 * Website unavailable to live retrieval: year of birth and Japanese name
 * transcribed from the user-supplied index, NOT independently re-verified.
 * No copyrighted image imports, no unsupported biographies or social accounts.
 * All included birth years <=2007: adults as of 9 Nov 2026.
 */
(()=>{'use strict';
 const old=window.YumeIdolsDiscovery;if(!old||!Array.isArray(old.people))return;
 const rows=[["Ai Shinozaki","篠崎愛","1992"],["Ai Yamada","山田あい","2003"],["Aika Sawaguchi","沢口愛華","2003"],["Akane Sagara","相良朱音","1995"],["Akira Itsuki","五木あきら","1994"],["Ami Inamura","稲村亜美","1996"],["Ami Tokitō","時東ぁみ","1987"],["An Yamamoto","山本杏","2006"],["Ancham","杏ちゃむ","1998"],["Anna Hongō","本郷杏奈","1991"],["Anna Ōtsuka","大塚杏奈","1993"],["Anna Tamechika","為近あんな","1992"],["Anri Sugihara","杉原杏璃","1982"],["Asuka Kishi","岸明日香","1991"],["Aya Asahina","朝比奈彩","1993"],["Aya Hazuki","葉月あや","1991"],["Aya Kawasaki","川崎あや","1991"],["Ayana Nishinaga","西永彩奈","1996"],["Ayana Shinozaki","篠崎彩奈","1996"],["Ayu Hazaki","波崎天結","2000"],["Chisato Akita","秋田知里","1994"],["Eimi Matsushima","松嶋えいみ","1992"],["Elly Tran Ha","エリー・トラン・ハ","1987"],["Emi Andō","安藤笑","1995"],["Emi Kurita","栗田恵美","1994"],["Enako","えなこ","1994"],["Eri Akiyama","秋山依里","1989"],["Erika Chiba","千葉えりか","1988"],["Erika Den'ya","傳谷英里香","1995"],["Erina Kamiya","上矢えり奈","1991"],["Erisa Kusunoki","楠エリサ","1993"],["Fonchi","フォンチー","1990"],["Fūka Hanasaki","花咲楓香","2001"],["Fūka Kumazawa","熊澤風花","2002"],["Fumika Mizukusa","水草文香","1994"],["Hana Okamoto","岡本杷奈","1997"],["Hana Takeuchi","竹内花","1998"],["Haruka Kodama","兒玉遥","1996"],["Haruka Momokawa","百川晴香","1995"],["Haruka Ogura","小倉遥","1984"],["Haruna Shiraishi","白石陽菜","1993"],["Hazuki","瀬名葉月","1994"],["Hikaru Aoyama","青山ひかる","1993"],["Hina Kikuchi","菊地姫奈","2004"],["Hina Makino","蒔埜ひな","2004"],["Hinako Sano","佐野ひなこ","1994"],["Hinata Matsumoto","松本日向","2000"],["Hitomi Shimamura","嶋村瞳","1990"],["Hitomi Takamatsu","髙松瞳","2001"],["Honoka Kukita","久木田帆乃夏","2002"],["Ichika Yumikawa","弓川いち華","1995"],["Iyo Shibusawa","渋沢一葉","1989"],["Izumi Karen","和泉芳怜","2004"],["Jun Amaki","天木じゅん","1995"],["Juria Nagano","長野じゅりあ","1996"],["Jurii Aida","逢田珠里依","2005"],["Kaira Shirahase","白波瀬海来","1997"],["Kana Tokue","徳江かな","1998"],["Kana Yamada","山田かな","1995"],["Kanae Watanabe","渡辺加苗","1988"],["Kanami Takasaki","高崎かなみ","1997"],["Kanna Morimoto","森本栞菜","2001"],["Kanna Nijimura","虹村かんな","1995"],["Karen Takeda","武田華恋","1988"],["Kasumi Mori","森香澄","1995"],["Kaworu Yasui","安位薫","1999"],["Kazue Watanabe","渡辺加和","1990"],["Kiho Kanematsu","金松季歩","1989"],["Kizuna Tanaka","田中きずな","2004"],["Koharu Ito","伊藤小春","2002"],["Kōme Watanabe","渡邉幸愛","1998"],["Kozue Fujita","藤田こずえ","2001"],["Kurea Hazuki","葉月くれあ","2003"],["Kurumi Takahashi","高橋胡桃","1997"],["Liyuu","Liyuu","1997"],["Maaya Uchida","内田真礼","1989"],["Mai Hirukawa","比留川マイ","1995"],["Mai Ishioka","石岡真衣","1990"],["Mai Mizusawa","水沢まい","1991"],["Maia","麻衣愛","1988"],["Maika Kobayashi","小林マイカ","1988"],["Maika Misaki","三咲舞花","1980"],["Maki Nanami","七海マキ","1990"],["Makiho Tatsuya","達家真姫宝","2001"],["Makoto Okunaka","奥仲麻琴","1993"],["Makoto Sanada","真田まこと","1994"],["Mame Endō","遠藤まめ","1996"],["Mana Sakurai","櫻井麻七","1992"],["Manami Hashimoto","橋本マナミ","1984"],["Mao Goto","後藤真桜","2003"],["Mao Sakurada","桜田茉央","1997"],["Mari Takamiya","高宮まり","1988"],["Mariko Okubo","大久保麻理子","1984"],["Marina Matsuura","松浦麻里奈","1987"],["Marina Nagasawa","長澤茉里奈","1995"],["Mariya Nagao","永尾まりや","1994"],["Maya Imamori","今森茉耶","2006"],["Mayu Tsukishiro","月城まゆ","1994"],["Mei Ishihama","石浜芽衣","2002"],["Midori Nagatsuki","長月翠","2000"],["Mika Ichikawa","市川みか","1980"],["Mika Orihara","折原みか","1983"],["Miku Aono","青野未来","1990"],["Miku Tanaka","田中美久","2001"],["Mina Shiragawa","白川未奈","1987"],["Minami Wachi","わちみなみ","1995"],["Minamo","MINAMO","2000"],["Minori Inudō","犬童美乃梨","1994"],["Mio Arisu","有栖未桜","1994"],["Mio Matsuda","松田実桜","2005"],["Misato Maeda","前田美里","1996"],["Misumi Shiochi","塩地美澄","1982"],["Miu Shiromine","白峰ミウ","1997"],["Miu Shitao","下尾みう","2001"],["Miwako Kakei","筧美和子","1994"],["Miyabi Tateishi","立石都美","1988"],["Miyū Inamori","稲森美優","1990"],["Mizuki Hoshina","星名美津紀","1996"],["Mizuki Katase","片瀬美月","1996"],["Mizuki Kirihara","桐原美月","2003"],["Mizuki Takanashi","高梨瑞樹","1997"],["Moe Hirano","平野もえ","1994"],["Moe Iori","伊織もえ","1993"],["Moeka Arai","新井萌花","2002"],["Moeka Sasaki","佐々木萌香","1997"],["Moka Hibiya","日比谷萌甘","2007"],["Momo Akabane","赤羽もも","1996"],["Momo Miyahana","宮花もも","1996"],["Momoka Ishida","石田桃香","1997"],["Momoka Itō","伊藤萌々香","1997"],["Momoko Ōshiro","大白桃子","2003"],["Momoko Tani","谷桃子","1984"],["Nagisa Hayakawa","早川渚紗","2000"],["Nagisa Sano","佐野なぎさ","2000"],["Nana Asakawa","浅川梨奈","1999"],["Nana Miho","未歩なな","2002"],["Nana Ōwada","大和田南那","1999"],["Nanaka Kawamura","川村虹花","1995"],["Nanoka Nakane","仲根なのか","2001"],["Nao Hanashiro","花城奈央","2004"],["Nao Takami","高見奈央","1996"],["Natsu Minami","南なつ","2001"],["Natsuki Satonaka","里仲菜月","2003"],["Natsumi Hirajima","平嶋夏海","1992"],["Natsumi Yamagishi","山岸奈津美","1994"],["Natsupoi","なつぽい","1995"],["Nene Shida","志田音々","1998"],["Nori Horikoshi","堀越のり","1982"],["Nozomi Sasaki","佐々木希","1988"],["Orie Akiyoshi","秋吉織栄","1986"],["Oto Abe","安倍乙","2000"],["Punitan","ぷにたん","1996"],["Reika Tajima","田島怜華","2007"],["Reimi Ōsawa","大澤玲美","1993"],["Reina Aoi","蒼怜奈","1987"],["Ren Gojō","五条恋","1997"],["Riho Abiru","阿比留李帆","1993"],["Riho Horie","堀江りほ","1994"],["Rika Adachi","足立梨花","1992"],["Rika Shimura","志村理佳","1992"],["Riko Ōtsuki","大槻りこ","2001"],["Rin Miyauchi","宮内凛","1998"],["Rin Takahashi","高橋凛","1990"],["Rina Hashimoto","橋本梨菜","1993"],["Rina Hirata","平田梨奈","1998"],["Rina Koyama","小山リーナ","2003"],["Rina Kurebayashi","榑林里奈","1997"],["Rina Makuuchi","幕内里奈","1996"],["Rinoa Kanzaki","神崎りのあ","1991"],["Rio Uchida","内田理央","1991"],["Rio Yoshida","吉田莉桜","2002"],["Ririka Moriwaki","森脇梨々夏","2002"],["Rui Kumae","熊江琉唯","1995"],["Runa Amemiya","雨宮留菜","1993"],["Runa Toyoda","豊田ルナ","2002"],["Rurika Yokoyama","横山ルリカ","1991"],["Ruriko Kojima","小島瑠璃子","1993"],["Ruu Totsuka","十束るう","1997"],["Saemi Shinohara","篠原冴美","1992"],["Saki Akai","赤井沙希","1987"],["Saki Funaoka","船岡咲","1993"],["Saki Miyamoto","宮本彩希","1989"],["Saki Ogata","緒方咲","1994"],["Saki Sakurai","桜井紗稀","1991"],["Saki Suzuki","鈴木咲","1987"],["Saki Tateno","立野沙紀","1994"],["Saki Yanase","柳瀬さき","1988"],["Saki Yoshida","吉田早希","1988"],["Sakura Andō","安藤咲桜","2001"],["Sakurako Okubo","大久保桜子","1998"],["Sarina Toyama","外山さりな","2001"],["Sayaka Isoyama","磯山さやか","1983"],["Sayaka Matsui","松井さやか","1993"],["Sayaka Unagi","ウナギ・サヤカ","1989"],["Shoko Nakagawa","中川翔子","1985"],["Shōko Takahashi","高橋しょう子","1993"],["Sumire Kudō","工藤菫","2001"],["Sumire Uesaka","上坂すみれ","1991"],["Suzuko Mimori","三森すずこ","1986"],["Suzuran Yamauchi","山内鈴蘭","1994"],["Tenka Hashimoto","橋本甜歌","1993"],["Tomomi Morisaki","森咲智美","1992"],["Umi Shinonome","東雲うみ","1996"],["Unpai","うんぱい","1994"],["Vanessa Pan","ヴァネッサ・パン","1991"],["Wakana Uehara","上原わかな","1996"],["Yami","Yami","1998"],["Yasuyo Saitō","斎藤恭代","1996"],["Yoshino Chitose","ちとせよしの","2000"],["Yotsuha Kominato","小湊よつ葉","1996"],["Yu","ユウ","1998"],["Yū Nitta","新田ゆう","1994"],["Yua Fukuda","福田ゆあ","2005"],["Yua Shinkawa","新川優愛","1993"],["Yuhane Yamazaki","山﨑夢羽","2002"],["Yūho Honda","本田夕歩","1998"],["Yui Sakurai","櫻井優衣","2000"],["Yuka Itano","板野優花","1993"],["Yuka Kuramochi","倉持由香","1991"],["Yūka Ogura","小倉ゆうか","1998"],["Yukari Fukui","福井裕佳梨","1982"],["Yuki Fujiki","藤木由貴","1989"],["Yuki Kamifuku","上福ゆき","1993"],["Yuki Kashiwagi","柏木由紀","1991"],["Yuki Kimura","木村有希","1996"],["Yuki Ōsaki","大崎由希","1987"],["Yūko Tsubakino","椿野ゆうこ","2000"],["Yume Hayashi","林ゆめ","1995"],["Yume Shinjō","新條由芽","1998"],["Yumi Asahina","朝比奈祐未","1991"],["Yūna Manase","まなせゆうな","1987"],["Yuna Nogi","乃木結夢","1999"],["yunocy","yunocy","1998"],["Yurina Gyoten","行天優莉奈","1999"],["Yurino Okada","岡田佑里乃","1998"],["Yuzuha Hongō","本郷柚巴","2003"],["Yuzuha Saeki","冴木柚葉","1999"],["Yuzuki Aikawa","愛川ゆず季","1983"],["Yuzuki Akiyama","秋山ゆずき","1993"]];
 const overrides={"Miu Shiromine":["Miu Shiramine","白峰ミウ"],"Shōko Takahashi":["Shoko Takahashi","Takahashi Shouko"],"Yūka Ogura":["Yuka Ogura","Yuuka Ogura","小倉ゆうか"],"Yūko Tsubakino":["Yuuko Tsubakino","Yuko Tsubakino"],"Enako":["えなこ"],"Minamo":["MINAMO"],"Yoshino Chitose":["ちとせよしの"],"Ayu Hazaki":["波崎天結"],"Riho Horie":["堀江りほ"],"Fūka Hanasaki":["Fuuka Hanasaki"],"Yū Nitta":["Yu Nitta"],"Yūna Manase":["Yuna Manase"],"Kōme Watanabe":["Kome Watanabe"],"Miyū Inamori":["Miyu Inamori"],"Anna Ōtsuka":["Anna Otsuka"],"Nana Ōwada":["Nana Owada"],"Yuki Ōsaki":["Yuki Osaki"],"Reimi Ōsawa":["Reimi Osawa"],"Riko Ōtsuki":["Riko Otsuki"]};
 const source='https://gravureindex.com/idols/';
 const origin={'Elly Tran Ha':'VN',Liyuu:'CN',Yami:'CN','Vanessa Pan':null};
 const originSource={'Elly Tran Ha':'https://vnexpress.net/hot-girl-viet-khoe-duong-cong-o-han-quoc-1905535.html',
  Liyuu:'https://en.wikipedia.org/wiki/Liyuu',
  Yami:'https://wpb.shueisha.co.jp/gravure/20250427-126826/'};

 const norm=s=>String(s||'').normalize('NFKC').normalize('NFKD').toLowerCase()
    .replace(/[\u0300-\u036f\s・･._\-’'()]/g,'');
 const people=old.people.slice(),known=new Map();
 const keyVariants=name=>{
  const k=[norm(name)];const parts=String(name||'').trim().split(/\s+/);
  if(parts.length===2)k.push(norm(parts.reverse().join(' ')));
  return k.filter(Boolean);
 };
 const put=(n,i)=>{if(!n)return;for(const k of keyVariants(n))if(!known.has(k))known.set(k,i)};
 for(let i=0;i<people.length;i++){
  const p=people[i];if(p.category!=='gravure')continue;
  for(const n of [p.name,p.alternate,...(p.otherStageNames||[]),p.gravureIndexJapanese||''])put(n,i)
 }
 const added=[],enriched=[],ageUnverified=[],matched=[],skipped=[],seen=new Set();
 for(const [latin,japanese,yearText] of rows){
  const year=Number(yearText),id=norm(japanese)||norm(latin);
  if(seen.has(id)){skipped.push(latin);continue}seen.add(id);
  if(!Number.isInteger(year)||year>2007||year<1900){skipped.push(latin);continue}
  const names=[latin,japanese,...(overrides[latin]||[])];
  const existing=names.flatMap(keyVariants).map(k=>known.get(k)).find(i=>i!==undefined);
  const meta={gravureIndexJapanese:japanese,gravureIndexBirthYear:year,
   ...(Object.prototype.hasOwnProperty.call(origin,latin)?{adultCountry:origin[latin]}:{}),
   ...(originSource[latin]?{gravureOriginSource:originSource[latin]}:{}),
    gravureIndexSource:source,gravureIndexListDate:'2026-11-09',
    gravureBirthYearSource:'Elenco A–Z condiviso dall’utente; verificare su biografia individuale',
    gravureIndexAdultAsOf:'2026-11-09'};
  if(existing!==undefined){
    const p=people[existing],aka=[...(p.otherStageNames||[])];
    for(const n of names)if(n&&norm(n)!==norm(p.name)&&norm(n)!==norm(p.alternate||'')&&!aka.some(x=>norm(x)===norm(n)))aka.push(n);
    people[existing]={...p,...meta,otherStageNames:aka,
      alternate:p.alternate||japanese,
      // Existing independently sourced DOBs are always authoritative.
      source:p.source||source,sourceLabel:p.sourceLabel||'GravureIndex · indice A–Z',
      sourceKind:p.sourceKind||'Elenco professionale fornito dall’utente'};
    for(const n of names)put(n,existing);
    enriched.push(latin);matched.push({latin,existingName:p.name});
  }else{
    const p={category:'gravure',name:latin,alternate:japanese,...meta,
      otherStageNames:[...(overrides[latin]||[])],
      source,sourceLabel:'GravureIndex · indice A–Z (testo fornito dall’utente)',
      sourceKind:'Repertorio nominativo pubblico · dati individuali da verificare',
      editorialBio:'Modella o talento incluso nell’indice GravureIndex condiviso. Anno di nascita riportato: '+year+'. Dettagli biografici da verificare sulla fonte.',
      adultCountry:Object.prototype.hasOwnProperty.call(origin,latin)?origin[latin]:'JP',sourceYear:'2026',photoFile:null,photoSource:null,
      ageVerified:false, // birth year from user-supplied list ≠ DOB independently verified
      teenSafe:false,gravureIndexAdded:true};
    people.push(p);const pos=people.length-1;
    for(const n of names)put(n,pos);
    added.push(latin);ageUnverified.push(latin)
  }
 }
 // Repair one pre-existing romanization-only duplicate without losing its references.
 // Require an indexed primary with a matching standardized professional name.
 const removals=[];
 for(let i=0;i<people.length;i++){
  const target=people[i];
  if(target.category!=='gravure'||!target.gravureIndexBirthYear)continue;
  for(let j=0;j<people.length;j++){
   if(i===j||removals.includes(j))continue;
   const other=people[j];if(other.category!=='gravure'||other.gravureIndexBirthYear)continue;
   if(norm(target.name)!==norm(other.name))continue;
   const refs=[...(target.gravureEditorialSources||[]),...(other.gravureEditorialSources||[]),
      target.source,other.source].filter(Boolean);
   people[i]={...other,...target,
    gravureEditorialSources:[...new Set(refs)],
    photoFile:target.photoFile||other.photoFile||null,
    photoSource:target.photoSource||other.photoSource||null,
    officialProfile:target.officialProfile||other.officialProfile||null};
   removals.push(j);
  }
 }
 for(const i of removals.sort((a,b)=>b-a))people.splice(i,1);
 const sources={...(old.sources||{}),gravureindexUser2026:{
  label:'GravureIndex · 239 idol A–Z (elenco testuale fornito dall’utente)',
  url:source,kind:'Fonte non recuperabile direttamente; verificare schede individuali'
 }};
 window.YumeIdolsDiscovery=Object.freeze({...old,people,sources,
   stats:{...(old.stats||{}),entries:people.length,sources:Object.keys(sources).length},
   updated:'2026-11-09'});
 window.YumeGravureIndexAZ2026=Object.freeze({updated:'2026-11-09',totalSourceRows:rows.length,
  distinctNames:seen.size,addedCount:added.length,added,enrichedCount:enriched.length,
  enriched,matched,skipped,existingDuplicatesUnified:removals.length,source,sourceAccess:'user text; live site unavailable',
  warning:'I nomi e anni sono riportati dall’elenco fornito; biografie e date complete non sono state controllate individualmente.'});
})();