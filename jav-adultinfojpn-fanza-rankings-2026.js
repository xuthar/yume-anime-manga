/* Yume / AdultInfoJPN · historical FANZA top-100 indexes, 2020/2022/2023.
 * A ranking represents sales in that year, NOT live popularity in 2026.
 * Exact native names and documented stage-name aliases prevent false duplicates.
 * No inferences of legal identity, private age, current work or availability.
 * Images: exclusively portrait files documented on Wikimedia Commons;
 * historical ranking-site images are not hotlinked.
 */
(()=>{'use strict';
const old=window.YumeIdolsDiscovery;if(!old)return;
const ranks={"2020":["松本いちか","三上悠亜","深田えいみ","安齋らら","波多野結衣","高橋しょう子","石原希望","渚みつき","久留木玲","篠田ゆう","神宮寺ナオ","稲場るか","永瀬ゆい","JULIA","田中ねね","根尾あかり","仲村みう","松下紗栄子","佐知子","今井夏帆","山岸あや花","蓮実クレア","橋本ありな","八木奈々","花音うらら","紗倉まな","美谷朱里","枢木あおい","葵つかさ","本郷愛","向井藍","miru","伊藤舞雪","希島あいり","奏音かのん","天使もえ","楓カレン","小野六花","明里つむぎ","晶エリー","汐世","七ツ森りり","吉高寧々","架乃ゆら","桜空もも","冬愛ことね","美園和花","小倉由菜","桃乃木かな","加美杏奈","八乃つばさ","永井マリア","唯井まひろ","羽咲みはる","大槻ひびき","君島みお","本庄鈴","水戸かな","夢乃あいか","吉良りん","白石茉莉奈","辻井ほのか","青空ひかり","松本菜奈実","川上奈々美","森沢かな","桐谷まつり","大浦真奈美","春菜はな","木下ひまり","丘えりな","あおいれな","初川みなみ","弥生みづき","奥田咲","AIKA","七沢みあ","七海ひな","つぼみ","佐藤ののか","澤村レイコ","小梅えな","水卜さくら","岬ななみ","織田真子","逢見リカ","宮島めい","ジューン・ラブジョイ","夏目響","椿りか","伊賀まこ","宮沢ちはる","河合あすな","風間ゆみ","天音まひな","小早川怜子","東條なつ","椎名そら","通野未帆","岬あずさ"],"2022":["河北彩花","松本いちか","白桃はな","楪カレン","石川澪","東條なつ","さつき芽衣","倉本すみれ","北野未奈","篠田ゆう","小花のん","三上悠亜","山手梨愛","木下ひまり","水原みその","森沢かな","乙アリス","波多野結衣","吉根ゆりあ","神宮寺ナオ","工藤ララ","JULIA","小宵こなん","花狩まい","姫咲はな","月乃ルナ","浜崎真緒","小湊よつ葉","希島あいり","沙月恵奈","結城りの","藤森里穂","横宮七海","山岸あや花","高橋しょう子","黒川すみれ","桜空もも","渚みつき","新村あかり","紗倉まな","美谷朱里","宝田もなみ","天使もえ","弥生みづき","本郷愛","水川スミレ","八木奈々","宮下玲奈","蜜美杏","相沢みなみ","大槻ひびき","伊藤舞雪","天馬ゆい","末広純","木下凛々子","明里つむぎ","七沢みあ","汐世","枢木あおい","時田亜美","春菜はな","葵つかさ","百永さりな","有岡みう","新井リマ","森日向子","友田真希","今井夏帆","仲村みう","稲場るか","百瀬あすか","向井藍","松本菜奈実","愛宝すず","小早川怜子","美園和花","風間ゆみ","愛弓りょう","希咲那奈","美波もも","桃園怜奈","楓ふうあ","佐伯由美香","佐野なつ","森川玉緒","神木麗","小梅えな","小野六花","佐知子","宍戸里帆","水戸かな","田中ねね","明日見未来","久留木玲","桃乃木かな","うんぱい","七ツ森りり","宮島めい","望月あやか","石原希望"],"2023":["三上悠亜","河北彩花","石川澪","森沢かな","楪カレン","小湊よつ葉","小花のん","弥生みづき","松本いちか","倉本すみれ","末広純","星乃莉子","桜空もも","伊藤舞雪","黒川すみれ","紗倉まな","天川そら","波多野結衣","山手梨愛","乙アリス","新井リマ","恋渕ももな","明里つむぎ","神木麗","相沢みなみ","さつき芽衣","新村あかり","新ありな","JULIA","木下凛々子","吉根ゆりあ","山岸あや花","美園和花","凪ひかる","東條なつ","神宮寺ナオ","柏木こなつ","愛弓りょう","八木奈々","清原みゆう","希島あいり","椎名ゆな","渚恋生","木下ひまり","水卜さくら","本庄鈴","鷲尾めい","斎藤あみり","宮下玲奈","美乃すずめ","小宵こなん","沙月恵奈","天馬ゆい","森日向子","篠田ゆう","七沢みあ","天使もえ","八掛うみ","時田亜美","藤かんな","MINAMO","綾瀬こころ","橘メアリー","葵いぶき","宮島めい","石原希望","鈴村あいり","水戸かな","白峰ミウ","九野ひなの","花狩まい","美谷朱里","日下部加奈","大槻ひびき","柊ゆうき","奥田咲","尾崎えりか","佐山愛","浜崎真緒","八蜜凛","小野六花","宝田もなみ","梓ヒカリ","渚みつき","涼森れむ","美咲かんな","水原みその","田中ねね","中山ふみか","葵つかさ","月雲よる","円井萌華","桃乃木かな","四宮ありす","七ツ森りり","友田真希","春菜はな","上羽絢","天宮花南","未歩なな"]};
const roman={"三上悠亜":"Yua Mikami","河北彩花":"Saika Kawakita","石川澪":"Mio Ishikawa","森沢かな":"Kana Morisawa","楪カレン":"Karen Yuzuriha","小湊よつ葉":"Yotsuha Kominato","弥生みづき":"Mitsuki Yayoi","松本いちか":"Ichika Matsumoto","倉本すみれ":"Sumire Kuramoto","星乃莉子":"Riko Hoshino","桜空もも":"Momo Sakura","伊藤舞雪":"Mayuki Itou","波多野結衣":"Yui Hatano","山手梨愛":"Ria Yamate","明里つむぎ":"Akari Tsumugi","神木麗":"Rei Kamiki","紗倉まな":"Mana Sakura","七ツ森りり":"Riri Nanatsumori","天川そら":"Sora Amakawa","恋渕ももな":"Momona Koibuchi","小宵こなん":"Konan Koyoi","吉根ゆりあ":"Yuria Yoshine","葵いぶき":"Ibuki Aoi","葵つかさ":"Tsukasa Aoi","高橋しょう子":"Takahashi Shouko","佐山愛":"Ai Sayama","大槻ひびき":"Hibiki Otsuki","涼森れむ":"Remu Suzumori","天宮花南":"Kanan Amamiya","本庄鈴":"Suzu Honjo","北野未奈":"Mina Kitano","水川スミレ":"Sumire Mizukawa","友田真希":"Maki Tomoda","新ありな":"Arina Arata","新井リマ":"Rima Arai","美谷朱里":"Akari Mitani","桃乃木かな":"Kana Momonogi","神宮寺ナオ":"Nao Jinguji","横宮七海":"Nanami Yokomiya","楓カレン":"Karen Kaede","小倉由菜":"Yuna Ogura","本郷愛":"Ai Hongo","吉高寧々":"Nene Yoshitaka","仲村みう":"Miu Nakamura","羽咲みはる":"Miharu Usa","君島みお":"Mio Kimijima","初川みなみ":"Minami Hatsukawa","八掛うみ":"Umi Yatsugake","河合あすな":"Asuna Kawai","希島あいり":"Airi Kijima","石原希望":"Nozomi Ishihara","鈴村あいり":"Airi Suzumura","篠田ゆう":"Yu Shinoda","久留木玲":"Rei Kuruki","青空ひかり":"Hikari Aozora","小野六花":"Rikka Ono","七沢みあ":"Mia Nanasawa","田中ねね":"Nene Tanaka","橋本ありな":"Arina Hashimoto","渚みつき":"Mitsuki Nagisa","風間ゆみ":"Yumi Kazama","桐谷まつり":"Matsuri Kiritani","小梅えな":"Ena Koume","白峰ミウ":"Miu Shiramine","永井マリア":"Maria Nagai","水戸かな":"Kana Mito","天使もえ":"Moe Amatsuka","木下ひまり":"Himari Kinoshita","鷲尾めい":"Mei Washio","宮下玲奈":"Rena Miyashita","小早川怜子":"Reiko Kobayakawa","浜崎真緒":"Mao Hamasaki","奥田咲":"Saki Okuda","明日見未来":"Mirai Asumi","佐野なつ":"Natsu Sano","結城りの":"Rino Yuki","深田えいみ":"Eimi Fukada","安齋らら":"Rara Anzai","八木奈々":"Nana Yagi","小花のん":"Non Ohana","澤村レイコ":"Reiko Sawamura","楓ふうあ":"Fua Kaede","新村あかり":"Akari Niimura","百瀬あすか":"Asuka Momose","白石茉莉奈":"Marina Shiraishi","夏目響":"Hibiki Natsume","宮島めい":"Mei Miyajima","四宮ありす":"Arisu Shinomiya","天音まひな":"Mahina Amane","美乃すずめ":"Suzume Mino","沙月恵奈":"Ena Satsuki","月乃ルナ":"Luna Tsukino","藤森里穂":"Riho Fujimori","森日向子":"Hinako Mori","月雲よる":"Yoru Tsukumo","木下凛々子":"Ririko Kinoshita","水卜さくら":"Sakura Miura","松下紗栄子":"Saeko Matsushita","七海ひな":"Hina Nanami","上羽絢":"Aya Ueha","JULIA":"JULIA","山岸あや花":"Aika Yamagishi","相沢みなみ":"Minami Aizawa","愛宝すず":"Suzu Aiho","宝田もなみ":"Monami Takarada","佐藤ののか":"Nonoka Sato","miru":"Miru Sakamichi","黒川すみれ":"Sumire Kurokawa","百永さりな":"Sarina Momonaga","加美杏奈":"Anna Kami","松本菜奈実":"Nanami Matsumoto","愛弓りょう":"Ryo Ayumi","美園和花":"Waka Misono","藤かんな":"Kanna Fuji","凪ひかる":"Hikaru Nagi","上原亜衣":"Ai Uehara","稲場るか":"Ruka Inaba","汐世":"Hikaru Nagi","春菜はな":"Hana Haruna","皆野あい":"Ai Minano","有岡みう":"Miu Arioka","八蜜凛":"Rin Hachimitsu","水原みその":"Misono Mizuhara"};
const aliases={"凪ひかる":["汐世","有栖花あか"],"汐世":["凪ひかる","有栖花あか"],"山岸あや花":["山岸逢花"],"木下ひまり":["花沢ひまり"],"森沢かな":["飯岡かなこ"],"本郷愛":["二階堂夢"],"天音まひな":["星まりあ"],"稲場るか":["莉々はるか"],"澤村レイコ":["高坂保奈美","高坂ますみ"],"七海ひな":["七瀬ひな"],"佐藤ののか":["加藤ももか"],"miru":["坂道みる"]};
const pinned={"渚みつき":{"file":"Mitsuki Nagisa \"Strongest Attribute\" release press conference (Akihabara) IMG 7504.jpg","category":"Mitsuki Nagisa","birthYear":1998},"宮下玲奈":{"file":"Tregal Academy Cultural Festival 2026IMG 6699.jpg","category":"Rena Miyashita","birthYear":2002},"相沢みなみ":{"file":"Minami Aizawa 20230806.jpg","category":"Minami Aizawa","birthYear":1996}};
const norm=s=>String(s||'').normalize('NFKC').normalize('NFKD').toLowerCase().replace(/[\u0300-\u036f\s・･._\-’'()]/g,'');
const files=old.people.slice();
const index=new Map();
const addKey=(alias,i)=>{
 const key=norm(alias);if(!key)return;
 if(!index.has(key))index.set(key,i);
 const parts=alias.trim().split(/\s+/);
 if(parts.length===2&&parts.every(t=>/^[A-Za-zÀ-ÿ]+$/.test(t)))index.set(norm(parts.reverse().join(' ')),i);
};
for(let i=0;i<files.length;i++){
 if(files[i].category!=='jav')continue;
 for(const alias of [files[i].name,files[i].alternate,...(files[i].otherStageNames||[])].filter(Boolean))addKey(alias,i);
}
const added=[],updated=new Set(),skipped=[];
const removed=new Set(['ジューン・ラブジョイ']);
const sources=Object.fromEntries(Object.keys(ranks).map(y=>[y,'https://adultinfojpn.com/avstar_ranking/fanza'+y+'/']));
for(const year of ['2023','2022','2020']){
 const names=ranks[year],source=sources[year];
 for(let at=0;at<names.length;at++){
  const name=names[at],aliasesFor=[name,roman[name],...(aliases[name]||[])].filter(Boolean);
  if(removed.has(name)){skipped.push(name);continue;}
  const match=aliasesFor.map(norm).find(k=>index.has(k));
  const rank={year:Number(year),rank:at+1,source};
  const photo=pinned[name]||null;
  const photoSource=photo?'https://commons.wikimedia.org/wiki/File:'+encodeURIComponent(photo.file.replace(/ /g,'_')):null;
  if(match){
    const i=index.get(match),oldPerson=files[i];
    const ranksFound=oldPerson.javAnnualRankings||[];
    const prevAliases=oldPerson.otherStageNames||[];
    const next={...oldPerson, javAnnualRankings:ranksFound.some(x=>x.year===rank.year)?ranksFound:[...ranksFound,rank],
     otherStageNames:[...new Set([...prevAliases,...aliasesFor.filter(x=>norm(x)!==norm(oldPerson.name)&&norm(x)!==norm(oldPerson.alternate||''))])],
     photoFile:oldPerson.photoFile||photo?.file||null,
     photoSource:oldPerson.photoSource||photoSource,
     adultCountry:oldPerson.adultCountry||'JP',
     rankingReference:true};
    files[i]=next;updated.add(i);
    for(const alias of aliasesFor)addKey(alias,i);
    continue;
  }
  // Commercial adult-actress roster names; not birth-date attestation.
  // Leave personal age unverified if no independent professional biography.
  const item={category:'jav',name,alternate:roman[name]||'',adultCountry:'JP',
   adultVerified:!!photo?.birthYear,professionYearCheck:photo?.birthYear||null,
   ageSourceStatus:photo?.birthYear?'Wikimedia Commons biography':'FANZA annual industry ranking; exact birth date not supplied',
   source,sourceKind:'FANZA · classifica storica di vendite professionali',
   sourceLabel:'AdultInfoJPN · FANZA '+year+' · posizione '+(at+1),
   editorialBio:'Attrice JAV · presente nella classifica storica di vendite FANZA '+year+'. Non implica attività nel 2026.',
   platform:'JAV / AV',rankingReference:true,javAnnualRankings:[rank],
   otherStageNames:[...new Set(aliases[name]||[])],photoFile:photo?.file||null,photoSource,
   photoCommonsCategory:photo?.category||null,pornPreview:false};
  const i=files.push(item)-1;added.push(name);
  for(const alias of aliasesFor)addKey(alias,i);
 }
}
window.YumeIdolsDiscovery=Object.freeze({...old,people:files,updated:'2026-11-09',
 stats:{...old.stats,entries:files.length}});
window.YumeJAVRanking2026=Object.freeze({updated:'2026-11-09',sources,
 indexed:Object.values(ranks).reduce((a,x)=>a+x.length,0),
 distinctRanked:new Set(Object.values(ranks).flat()).size,
 added,addedCount:added.length,enriched:updated.size,
 excluded:skipped,licensedPhotos:Object.keys(pinned),
 note:'Rankings from 2020, 2022 and 2023 only. Positions are historic and source-linked.'});
})();