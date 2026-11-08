/* Yume Discovery · editorial leads found on named, public directories (08 Nov 2026).
   They are NOT represented as verified photo cards unless a licensed photo actually loads.
   Names from these indexes are artist names; do not infer legal identities, ages, official social handles.
   Editorial source URLs are explicitly documented and label agency vs third-party directory. */
(()=>{
'use strict';
const sources={
 akb:{label:'AKB48 · elenco ufficiale dei membri',url:'https://www.akb48.co.jp/about/members',kind:'agenzia ufficiale'},
 holo:{label:'hololive · elenco ufficiale',url:'https://hololive.hololivepro.com/en/talents',kind:'agenzia ufficiale'},
 niji:{label:'NIJISANJI · annuncio ufficiale',url:'https://www.nijisanji.jp/news/5ftn6ozbki',kind:'agenzia ufficiale'},
 gravure:{label:'Gravure Idol Searcher',url:'https://gravure-idol.jp/',kind:'portale editoriale'},
 dig:{label:'GRAVURE DIG · Talent',url:'https://gravure-dig.com/talent',kind:'portale editoriale'},
 first:{label:'First Gravure · Models',url:'https://www.firstgravure.jp/models',kind:'catalogo fotografico'},
 celeb:{label:'celeb-db · Gravure Idols',url:'https://celeb-db.com/en/occupation/gravure-idol/',kind:'catalogo editoriale'},
 fashion:{label:'celeb-db · Gravure Models',url:'https://celeb-db.com/en/occupation/gravure-model/',kind:'catalogo editoriale'},
 ppe:{label:'PP Enterprise · talent ufficiali',url:'https://ppe.jp/talent/',kind:'agenzia ufficiale'},
 cosplayguide:{label:'CoDigital · Cosplay Influencers 2026',url:'https://influencer.codigital.co.jp/insights/cosplay-influencers-japan/',kind:'catalogo editoriale'},
 cosplaymore:{label:'TokyoCandies · Cosplay Influencers 2026',url:'https://tokyocandies.com/top-cosplay-influencers-you-should-know/',kind:'catalogo editoriale'},
 social:{label:'GROVE · account dei creator',url:'https://handledex.com/ja/group/grove/',kind:'repertorio social'},
 grove:{label:'YUSŌ / GROVE · talent ufficiali',url:'https://yuso.tokyo/',kind:'agenzia ufficiale'},
 lifestyle:{label:'Virev · lifestyle creator in Japan',url:'https://virev.ai/blog/japanese-lifestyle-influencers',kind:'ricerca social'},
 adult:{label:'Oshidols · directory JAV',url:'https://oshidols.com/',kind:'catalogo editoriale'}
};
const groups=[
 ['music','akb',`Saho Iwatate / 岩立沙穂;Seina Fukuoka / 福岡聖菜;Yui Oguri / 小栗有以;Yurina Gyoten / 行天優莉奈;Narumi Kuranoo / 倉野尾成美;Hiyuka Sakagawa / 坂川陽香;Miu Shitao / 下尾みう;Ayane Takahashi / 髙橋彩音;Remi Tokunaga / 徳永羚海;Serika Nagano / 永野芹佳;Haruna Hashimoto / 橋本陽菜;Erii Chiba / 千葉恵里;Haruka Kurosu / 黒須遥香;Ayami Nagatomo / 長友彩海;Orin Muto / 武藤小麟;Mizuki Yamauchi / 山内瑞葵;Suzuha Yamane / 山根涼羽;Yuki Ota / 太田有紀;Airi Sato / 佐藤綺星;Eriko Hashimoto / 橋本恵理子;Nozomi Hatakeyama / 畠山希美;Yuki Hirata / 平田侑希;Moka Hotei / 布袋百椛;Mayuu Masai / 正鋳真優;Miyuu Mizushima / 水島美結;Sora Yamazaki / 山﨑空;Yuna Akiyama / 秋山由奈;Sae Arai / 新井彩永;Kasumi Kudo / 工藤華純;Hinano Kubo / 久保姫菜乃;Yumemi Sako / 迫由芽実;Kohina Narita / 成田香姫奈;Azuki Yagi / 八木愛月;Yui Yamaguchi / 山口結愛;Momoka Ito / 伊藤百花;Kairi Okumoto / 奥本カイリ;Yui Kawamura / 川村結衣;Saki Oga / 大賀彩姫;Saki Kondo / 近藤沙樹;Hinata Maruyama / 丸山ひなた;Mao Takahashi / 髙橋舞桜;Sayuri Tanaka / 田中沙友利;Ema Makito / 牧戸愛茉;Yu Morikawa / 森川優;Kiko Watanabe / 渡邉葵心;Yuna Oonishi / 大西ゆな;Momoka Hasegawa / 長谷川百々花;Izumi Maeda / 前田衣澄;Rinoa Yamauchi / 山内利乃明`],
 ['vtuber','holo',`Tokino Sora;Robocosan;Aki Rosenthal;Akai Haato;Shirakami Fubuki;Natsuiro Matsuri;Nakiri Ayame;Yuzuki Choco;Oozora Subaru;AZKi;Ookami Mio;Sakura Miko;Nekomata Okayu;Inugami Korone;Hoshimachi Suisei;Usada Pekora;Shiranui Flare;Shirogane Noel;Houshou Marine;Tsunomaki Watame;Tokoyami Towa;Himemori Luna;Yukihana Lamy;Momosuzu Nene;Shishiro Botan;Omaru Polka;La+ Darknesss;Takane Lui;Hakui Koyori;Kazama Iroha;Sakamata Chloe;Ayunda Risu;Moona Hoshinova;Airani Iofifteen;Kureiji Ollie;Anya Melfissa;Pavolia Reine;Vestia Zeta;Kaela Kovalskia;Kobo Kanaeru;Mori Calliope;Takanashi Kiara;Ninomae Ina'nis;Watson Amelia;IRyS;Ouro Kronii;Hakos Baelz;Shiori Novella;Koseki Bijou;Nerissa Ravencroft;Fuwawa Abyssgard;Mococo Abyssgard;Elizabeth Rose Bloodflame;Gigi Murin;Cecilia Immergreen;Raora Panthera;Otonose Kanade;Ichijou Ririka;Juufuutei Raden;Todoroki Hajime;Isaki Riona;Koganei Niko;Mizumiya Su;Rindo Chihaya;Kikirara Vivi;Achichi Mela;Sorashina Sopia;Suzuna Tsuzuri;Hyakuto Kyoko;Izuki Michiru;Hanazono Sayaka;Kazeshiro Yuki;Minato Aqua;Murasaki Shion;Amane Kanata;Kiryu Coco;Gawr Gura;Tsukumo Sana;Ceres Fauna;Nanashi Mumei;Hiodoshi Ao`],
 ['vtuber','niji',`Tsukahara Daichi / 塚原大地;Kokonami Iruka / 小々波いるか;Rayon / レヨン;Mikogami Kotone / 御子神琴音;Senri Ayumu / 千凛あゆむ;Kuri Eita / 九里詠太;Rei7;Onotora / 男虎`],
 ['gravure','gravure',`Kirara Midorikawa / 緑川希星;Kotori Kaiga / 貝賀琴莉;Rea Momosato / 桃里れあ;Ayumi Koyanagi / 小柳歩;Mika Nonomiya / 野々宮ミカ;Marina Nagasawa / 長澤茉里奈;Arisa Sugimoto / 杉本愛莉鈴;Honoka Sasaki / 佐々木ほのか;Yurino Okada / 岡田佑里乃;Miku Tanaka / 田中美久;Minami Wachi / わちみなみ`],
 ['gravure','first',`Rui Nagumo / 南雲るい;Ayano Sumida / 澄田綾乃;Nao Usami / 宇佐美なお;Risako / 凛咲子;Kurumi Miyajima / 宮嶋くるみ;Tsumugi Hara / 原つむぎ;Sasha Yurikawa / 百合川サシャ;Maki Shinkai / 新海まき;Narumi Okawa / 大川成美`],
 ['gravure','dig',`Aika / 愛花;Honoka Aikawa / 相川暖花;Yuka Aisaka / 相坂優歌;Nanako Aizawa / 相沢菜々子;Rina Aizawa / 逢沢りな;Noel Aizome / 愛染のえる;Jurii Aida / 逢田珠里依;Rikako Aida / 逢田梨香子`],
 ['gravure','celeb',`Mio Imada;Kanna Seto;Riho Yoshioka;Hikari Mitsushima;Maya Imamori;Ema Yano;Mitsu Dan;Ruriko Kojima;Saki Tateno;Yotsuha Kominato;Miwako Kakei;Ai Shinozaki;Sayaka Isoyama;Yū Tano;Mizuki Kirihara;Nako Yabuki;Yuuri Rukawa;Sayaka Unagi;Yuki Kashiwagi;Rio Teramoto;Mikie Hara;Manami Hashimoto;Nene Shida;Maria Makino;Tomomi Morisaki;Yuki Kimura;Yūko Tsubakino;Ami Inamura;Hinako Sano;Moe Iori;Wakana Uehara;Nanami Matsumoto;Nana Asakawa;Aika Sawaguchi;Yasuyo Saitō;Asuka Kishi;Yūka Ogura;Yoshino Chitose;Rin Takahashi;Rurika Yokoyama;Anri Sugihara;Yuzuha Hongō;Kurea Hazuki;Fūka Hanasaki;Yūri Adachi;Kana Yamada;Yuka Kuramochi;Yume Hayashi;Runa Toyoda;Mizuki Takanashi;Rina Hashimoto;Hikaru Aoyama;Kaworu Yasui;Mami Nagase;Nanami Asahi;Oto Abe;Haruka Momokawa;Ayu Hazaki;Miu Shitao;Honoka Kukita;Yuki Fujiki;Kanae Watanabe;Kazue Watanabe;Meiri;Riho Horie;Iori Sagara;Enako;Nashiko Momotsuki;Maitei`],
 ['fashion','fashion',`Meru Nukumi;Suzu Hirose;Marie Iitoyo;Sayaka Okada;Yua Shinkawa;Ruriko Kojima;Rio Uchida;Rena Takeda;Ai Shinozaki;Mao Ichimichi;Fumika Baba;Akiko Kuji;Nashiko Momotsuki;Nene Shida;yuna / 星乃夢奈;Kana Nakada;Yuki Ishihara;Yumi Sugimoto;Kazusa Okuyama;Hinami Mori;Mariya Nagao;Yasuyo Saitō;Akemi Darenogare;Nanako Aizawa;Moga Mogami;Shieri Kurasawa;Yume Hayashi;Honoka;Nana Tanimura;Minami Fukuoka;Ikumi Hisamatsu;yunocy;Nanami Asahi;Yuko Sugamoto;Yuki Fujiki;Reika Hino;Rena Kuroki;Airi Ikematsu;Ruka Mishina;Nanaka Kawamura;Asami Ōta;Mio Arisu;Rio Miyamoto;Maya Sano;Saaya Asakura;Shihomi Ogoshi;Wakana Kazuki;Machi Kiyose;Ren Morizono;Erika Aoi`],
 ['cosplay','ppe',`Enako / えなこ;Umi Shinonome / 東雲うみ;Yokyu-n / よきゅーん;Kokoro Shinozaki / 篠崎こころ;Minami Ami / 南あみ;Saki Yoshida / 吉田早希;Minami Shinohara / 篠原みなみ;Eili / えい梨;Myako / みゃこ;Nao Takami / 高見奈央;Kitaro / 綺太郎;Yamamoto Shiori / 山本栞;Momoto Momo / 桃戸もも;Noe Mita / 三田のえ`],
 ['cosplay','cosplayguide',`Shinonome Umi / 東雲うみ;Sakurai Feel / 尊みを感じて桜井;Miyamoto Saki / 宮本彩希;Yunocy / ゆのしー;Suzuran / すずら;Shinozaki Kokoro / 篠崎こころ;Kikka / きっか;Tachibana Asahi / 橘あさひ;Tsukimi Tsukune / 月海つくね;Nekota Ashu / 猫田あしゅ;Koumaru-ya / 幸まる屋;Momotsuki Nashiko / 桃月なしこ;Kashou Roshieru / 火将ロシエル;Nyarumaa / にゃるまー。`],
 ['cosplay','cosplaymore',`Marina Amatsu;Liyuu;Fleia;Yami;Miiko;Usagi Usa;Saku;Honami Shizuku;Moe Iori;Akira Itsuki;Sithle;Non;Kuroneko;Will Will;Momoiroreku;Shinohana Sumire;Yutori;Takanashi Kurea;Prince Ponyoo;Chiba`],
 ['creators','social',`Amenboplus / あめんぼぷらす;Paparapys / パパラピーズ;Miyako / 都;Sankyu Dokkoisho / サンキューどっこいしょ;ADH / 末期のｱｰﾃﾞｰﾊｰﾃﾞｰ;Kuya / くや;Futeko / ふてこ;Mipota Pota / みぽたぽた;Ikirumonotachi / イキル者タチ;Chihiro ASMR / ちひろASMR;kinoko / kinoko;Pixel Ribbon;219goshitsu / 2/2/9号室;Amaha Haruka / 天羽遥;Momohana / ももはな;Asato / あさと;Shinmoto Shin / 慎本真;Fumiami / ふみあみ;Kaichosu Couple / かいちょすカップル;Kurukuru 3kyodai / くるくる3兄妹;Natsume Sanchi / なつめさんち;Hinata / ひなた;Pukupuku / ぷくぷく;Myuu / みゅう;Mukuena / むくえな;Meika / めいか;Yuurich / ゆうり;Waon Syndrome / わおん;Sara Kordi / サラ・コールディ;Shuu / シュウ;Nyasupa / ニャスパ;Miru / ミル;Miyahara Hibiki / 宮原響;Hiyorimaru / 早速ひよりまる;Jiku Sosha / 時空操者;Kimura Sena / 木村星南;Murahama / 村濱遥;Rara / 来蘭;Shiroihito / 白い人;Takeshita Paradise / 竹下☆ぱらだいす;Tomohiro Kaneki / 金木朋裕;Hiiiyo / 陽世`],
 ['creators','grove',`KAIMA / 海馬;Kuga Oshima / 大島空凱;Yuma Konno / 今野優誠;Atsuhiro Hayashi / 林敦大;Noa Fujii / 藤井希空;Kiryu Tanaka / 田中希龍;Yui Kobashi / 小橋由依;Toi Kimura / 木村斗一`],
 ['creators','lifestyle',`Shinya Ogawa / しにゃ;BOBBY HOLMES;Mao Asada / 浅田真央;yuka;Yuuki / 筋築家ゆうき;Nozomi Maeda / 前田希美;Amika / あみか;Ayase Rie;Risa Hirako / 平子理沙;rumi;Yurano Ochi / 越智ゆらの;Nanako Naozaki / なおざきななこ;Misaki Horio / 堀尾実咲;KAREN;SotoTaka;kotoha;Yoshika Kita / 喜多よしか;Miki Ide / 井手美希;Miyu Kano / かのうみゆ`],
 ['jav','adult',`Turuya Cecil / 都留矢セシル;Fujisawa Yuria / 藤沢ユリア;Takigawa Nanami / 滝川菜々美;Tukishima Hana / 月島花;Minato Riku / 湊莉久;Komatsu Rui / 小松るい;Yunoki Hiori / 柚木ひおり;Yoshinaga Touko / 吉永塔子;Kurosaki Mika / 黒崎みか;Hijiri Toa / 聖璃とあ;Ayame Kurumi / 彩芽くるみ;Unpai / うんぱい;Takahashi Shouko / 高橋しょう子;Igarashi Natsu / 五十嵐なつ;Mizore Arisa / 水逸ありさ;Miyashita Madoka / 宮下まどか;Suzuna Nami / 涼菜波美;Neo Akari / 根尾あかり;Arisu Kanau / 有栖かなう;Megumi Rio / 恵凛音;Haneda Riko / 羽田璃子;Shirakami Emika / 白上咲花;Mihama Miki / 実浜みき;Nakajo Rino / 中条りの`],
 ['adult','adult',`Sasahara Mika / 笹原美香;Kuon Reira / 久遠れいら;Tukimi Serina / 月見芹菜;Aono Miku / 蒼乃ミク;Nanatuki Mirei / 奈々月みれい;Otoha Love / 乙葉らぶ;Kurihara Sanae / 栗原早苗;Mio Mao / 澪真央;Himeno Momona / 姫野ももな;Tsukamoto Saya / 塚本さや;Satou Iori / 佐藤衣栞;Asakura Cocona / 朝倉ここな;Mizohata Ren / 溝端恋;Morikawa Honoka / 森川ほのか;Kokonoi Sunao / 九井スナオ;Kurashina Momo / 倉科モモ;Kohaku Maho / 琥珀まほ;Kotoishi Yumeru / 琴石ゆめる;Seta Ichika / 瀬田一花;Kirishima Kurumi / 桐嶋くるみ;Hoshi Huyuka / 星冬香;Makino Rena / 牧野怜奈;Takahata Yui / 高畑ゆい;Arisugawa Amane / 有栖川あまね`],
];
const verified=[
 {cat:'gravure',name:'Asuka Kishi',q:'Q11475874'},{cat:'gravure',name:'Sayaka Isoyama',q:'Q1869466'},
 {cat:'gravure',name:'Ayu Hazaki',q:'Q123160205'},{cat:'gravure',name:'Ai Shinozaki',q:'Q1101166'},
 {cat:'gravure',name:'Miku Tanaka',q:'Q60806764'},{cat:'gravure',name:'Nashiko Momotsuki',q:'Q55527939'},
 {cat:'cosplay',name:'Enako',q:'Q8951402'},{cat:'gravure',name:'Iori Sagara',q:'Q68184989'},
 {cat:'gravure',name:'Meiri',q:'Q59551789'},{cat:'gravure',name:'Riho Horie',q:'Q115629952'},
 {cat:'gravure',name:'Maitei',q:'Q60613919'},
 {cat:'vtuber',name:'Kizuna AI',q:'Q29515292'},{cat:'vtuber',name:'Rindou Mikoto',q:'Q114398357'},
 {cat:'vtuber',name:'Ruri Asano',q:'Q111445823'},{cat:'vtuber',name:'Chihiro Yuki',q:'Q108528658'}
];
const officialVT={
 'Shirakami Fubuki':'https://hololive.hololivepro.com/en/talents/shirakami-fubuki/',
 'Moona Hoshinova':'https://hololive.hololivepro.com/en/talents/moona-hoshinova/',
 'Mizumiya Su':'https://hololive.hololivepro.com/en/talents/mizumiya-su/',
 'Kikirara Vivi':'https://hololive.hololivepro.com/en/talents/kikirara-vivi/',
 'Koganei Niko':'https://hololive.hololivepro.com/en/talents/koganei-niko/',
 'AZKi':'https://hololive.hololivepro.com/en/talents/azki/',
 'Isaki Riona':'https://hololive.hololivepro.com/en/talents/isaki-riona/',
 'Gigi Murin':'https://hololive.hololivepro.com/en/talents/gigi-murin/',
 'Takanashi Kiara':'https://hololive.hololivepro.com/en/talents/takanashi-kiara/',
 'Aki Rosenthal':'https://hololive.hololivepro.com/en/talents/aki-rosenthal/',
 'Omaru Polka':'https://hololive.hololivepro.com/en/talents/omaru-polka/',
 'Kaela Kovalskia':'https://hololive.hololivepro.com/en/talents/kaela-kovalskia/',
 'Raora Panthera':'https://hololive.hololivepro.com/en/talents/raora-panthera/',
 'Nozomi Ishigami':'https://www.nijisanji.jp/talents/l/nozomi-ishigami',
 'Rindou Mikoto':'https://www.nijisanji.jp/talents/l/mikoto-rindou'
};
const canonical={"Shinonome Umi":"Umi Shinonome","Shinozaki Kokoro":"Kokoro Shinozaki","Miyamoto Saki":"Saki Miyamoto","Momotsuki Nashiko":"Nashiko Momotsuki","Nekota Ashu":"Ashu Nekota","Yunocy":"yunocy"};
const people=[],seen=new Set();
for(const [category,sourceKey,blob] of groups){
 const source=sources[sourceKey];
 for(const raw of blob.split(';').map(s=>s.trim()).filter(Boolean)){
  let [name,...other]=raw.split(' / ');
  const alternate=other.join(' / ').trim();
  name=canonical[name]||name;
  const key=category+':'+name.normalize('NFKC').toLocaleLowerCase('en');
  if(seen.has(key))continue;seen.add(key);
  people.push({category,name,alternate,source:source.url,sourceLabel:source.label,sourceKind:source.kind,
    officialProfile:sourceKey==='holo'?(officialVT[name]||null):null,platform:sourceKey==='holo'?'hololive':sourceKey==='niji'?'NIJISANJI':null});
 }
}
for(const item of verified){
 if(!people.some(p=>p.category===item.cat&&p.name===item.name))
 people.push({category:item.cat,name:item.name,alternate:'',source:'https://www.wikidata.org/wiki/'+item.q,sourceLabel:'Wikidata · scheda identificata',sourceKind:'dati strutturati',qid:item.q,officialProfile:officialVT[item.name]||null,platform:null});
}
window.YumeIdolsDiscovery=Object.freeze({updated:'2026-11-08',sources,people,verified,officialVT,stats:{entries:people.length,sources:Object.keys(sources).length}});
})();