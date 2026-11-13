/* Yume Discovery · editorial leads found on named, public directories (08 Nov 2026).
   They are NOT represented as verified photo cards unless a licensed photo actually loads.
   Names from these indexes are artist names; do not infer legal identities, ages, official social handles.
   Editorial source URLs are explicitly documented and label agency vs third-party directory. */
(()=>{
'use strict';
const sources={
 me_i:{label:'ME:I · profili ufficiali membri',url:'https://me-i.jp/feature/profile?lang=en',kind:'agenzia ufficiale'},
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
 ilife:{label:'iLiFE! · membri e X (2026)',url:'https://liveidol.blog/group-profile/ilife_official/',kind:'directory idol, 2026'},
 nonfic:{label:'のんふぃく！ · membri e X (2026)',url:'https://liveidol.blog/group-profile/nonfic_official/',kind:'directory idol, 2026'},
 sweet:{label:'SWEET STEADY · membri e X (2026)',url:'https://liveidol.blog/group-profile/sweet_steady/',kind:'directory idol, 2026'},
 ill:{label:'Ill · membri e X (2026)',url:'https://liveidol.blog/group-profile/ill_idol/',kind:'directory idol, 2026'},
 exwhyz:{label:'ExWHYZ · membri (archivio 2026)',url:'https://liveidol.blog/group-profile/exwhyz_official/',kind:'archivio idol storico'},
 livegroups:{label:'地下アイドル戦線 · gruppi underground 2026',url:'https://liveidol.blog/en/groups/',kind:'directory di gruppi, 2026'},
 redditgroups:{label:'r/japanesemusic · segnalazioni della community',url:'https://www.reddit.com/r/japanesemusic/comments/1phhdl1/underground_idols/',kind:'segnalazioni community, da verificare'},
 redditgroup2:{label:'r/jpop · gruppi alternative idol segnalati',url:'https://www.reddit.com/r/jpop/comments/1ee2gzv/noncutesy_girl_group_recommendations/',kind:'segnalazioni community, da verificare'},
  shueisha:{label:'Weekly Playboy / Shueisha · gravure 2026',url:'https://wpb.shueisha.co.jp/gravure/list/',kind:'rivista e repertorio editoriale'},
 youngjump:{label:'Young Jump · gravure 2026',url:'https://youngjump.jp/gravure/search.html',kind:'rivista e repertorio editoriale'},
 gravureclub:{label:'JAV-Forum · forum Gravure Idols',url:'https://www.jav-forum.com/forums/gravure-idols.14/',kind:'forum community, nominativi da verificare'},
 modeltalk:{label:'JAV-Forum · ranking della community',url:'https://www.jav-forum.com/threads/your-most-fapped-gravure-idols-ranking.3893/',kind:'segnalazioni community, non profili ufficiali'},
 gravuresocial:{label:'Gravure Idol Searcher · social e nuovi profili',url:'https://gravure-idol.jp/',kind:'aggregatore gravure/social'},
 linx:{label:'LINX · catalogo ufficiale modelle AV 2026',url:'https://pub.linx.live/contents/model_all/',kind:'agenzia professionale ufficiale'},
 tpowers:{label:'T-Powers · elenco ufficiale talent 2026',url:'https://www.t-powers.co.jp/talent/',kind:'agenzia professionale ufficiale'},
 av2026:{label:'AV New Faces 2026 · nomi d’arte per debutto',url:'https://av.zetsubou.org/newface/list-2026/',kind:'repertorio editoriale debutti da confermare'},
  adult:{label:'Oshidols · directory JAV',url:'https://oshidols.com/',kind:'catalogo editoriale'}
};
const groups=[
 ['gravure','shueisha',`吉井明子;小野真弓;上田操;水原ゆき;井口裕香;長谷川朋加;出口亜梨沙;宮前真樹;小貫莉奈;宮部のぞみ;坂巻有紗;松本麗世;小池里奈;安藤奈々子;長谷川かすみ;小寺結花;アンジェラ芽衣;宮澤雪;野崎萌香;松川星;加藤玲菜;新堂円子;すずら;冴島なな;宮越虹海;清埜きり;菊地姫奈;眞木花;月山鈴音;星名美津紀;入間ゆい;豊島心桜;藤嶌果歩;七瀬なな;溝端葵;西澤由夏;天羽希純;渡邊渚;山岡雅弥;石田千穂;佐藤綺星;小柳歩`],
 ['gravure','youngjump',`東雲うみ;みゃこ;山本栞;髙野真央;桃田うた;月城莉奈;谷口彩菜;山田あい;蓬莱舞;櫻井おとの;旭萌花;鶴田りお;望月風花;駒井優空;黒江こはる;みことね;小柴あいり;水野Reta;稲光亜依;宮藤あどね;Märmi;姫野ひなの;沖玲萌;宮﨑想乃;和内璃乃;美登りみ;由良朱合;仙北谷ハンナ;清埜きり;璃音;十味;緑川希星;片田陽依;豊島心桜;野村るな;ブラダ;森脇梨々夏;大原円香;織莉叶;林美希;宮川みやび;榎本彩乃;佐々木ちょこ;音琴なるみ;東条澪;倉田アンナ`],
 ['gravure','gravuresocial',`吉沢朱音;星乃紗良;溝端葵;華彩なな;太田麻美;日下部ほたる;柳瀬さき`],
 ['gravure','gravureclub',`Yuka Shirase / 白瀬結香;Rui Kiriyama / 桐山瑠衣;Makoto Sanada / 真田まこと;Eriko Kimura / 木村絵里子;Hikaru Aoyama / 青山ひかる;Ai Yamada;Risa Yoshiki / 吉木りさ;Nonami Takizawa / 滝沢乃南;Sasha Yurikawa / 百合川サシャ;Jun Amaki / 天木じゅん;Mao Takano / 髙野真央;Hina Kikuchi / 菊地姫奈;Anna Konno;RaMu;Mea Shimotsuki / 霜月めあ`],
 ['gravure','modeltalk',`Anri Sugihara;Yuka Ogura;Mizuki Hoshina;Kei Fubuki;Akua Yamazaki;Ichigo Tominaga;Saaya Irie;Kaho Kisugi;Saya Kataoka;Chika Tono / 遠野千夏;Morinaga Nanase / 守永七彩;Mizuki Yamasaki / 山﨑登月;Marika Minami / 南まりか;Wakana Morita / 森田ワカナ;Marin Moriya / 森谷まりん;Mana Miyawaki / 宮脇麻那;Yuuri Haruki / 春希ゆうり;Chia Kinoshita / 樹下智愛;Sayaka Hoshijima / 星島沙也加;Eriko Sato / 佐藤衣里子;Yui Konno / 今野ゆい`],
 ['jav','linx',`谷田かりな;長谷川つきの;星乃莉子;槻本あすか;城山若菜;風谷みれい;月元史奈;湊本そら;東條なつ;柏木雫;沙月恵奈;柴崎はる;一乃あおい;架乃ゆら;結城花乃羽;水川スミレ;泉りおん;藍瀬ミナ;市来まひろ;真木今日子;逢見リカ;葵百合香;三池小春;宇流木さらら;妃ひかり;広瀬なるみ;小鳥遊まりん;高藤なほの;平良あゆな;高梨有紗;藤咲紗英;小林恵里;原嶋かなえ`],
 ['jav','tpowers',`AIKA;蒼乃美月;晶エリー;朝比奈紗良;あさみん;明日葉みつは;足立める;天海つばさ;天宮花南;雨宮ひびき;有岡みう;安藤もあ;泉ももか;市川まさみ;今井栞菜;羽咲みはる;羽佐美めい;碓井せりな;大浦真奈美;大槻ひびき;小笠原菜乃;推川ゆうり;織田真子;小野坂ゆいか;かすみりさ;佳苗るか;神菜美まい;金森聖良;鹿野あも;河合あすな;河北彩花;菊乃らん;希月あまね;君島みお;九野ひなの;倉木華;胡桃さくら;黒咲華;五条恋;小鈴みかん;小春;小日向みゆう;小湊よつ葉;古村えりか;桜空もも;里美ゆりあ;佐山愛;白石るな;鈴の家りん;涼森れむ;鷲見すみれ;皇ゆず;瀧本雫葉;谷あづさ;月瀬りりあ;月野江すい;辻井ほのか;椿りょう;紬りお;都﨑あやめ;長浜みつり;仲村みう;渚あいか;夏目彩春;七嶋舞;七ツ森りり;成瀬心美;成実まあり;虹村ゆみ;乃木絢愛;野々浦暖;波多野結衣;初川みなみ;花咲ゆら;花柳杏奈;早瀬ありす;早田菜々子;羽月乃蒼;ひなたなつ;姫森あむ;星あんず;星宮菜奈;穂村あいね;水谷心音;皆野あい;MINAMO;宮澤めぐ;宮下華奈;宮島めい;宮野ゆかな;めぐり;杜乃いつは;森沢かな;八掛うみ;雪美えみる;楪カレン;結月りあ;吉高寧々;依本しおり;ローレン花恋`],
 ['jav','av2026',`希望みう;枢木シエル;八神七々実;秋瀬りり;神田真弥;桜羽潤;宝生みさと;伊奈美いずな;里美百音;黒木りあ;白石こはる;上原あゆな;栞名結;秋菜;宇野こはる;江南美沙子;波坂しのぶ;月城ゆら;宮上唯依花;新堂かなえ;鷹宮麗華;鈴北梨乃;矢野あいみ;白川美玲;大野瑞季;山田さち;涼乃愛;美琴千緒;西田瑞希;柏木雫;羽田カイラ;秋月夕;山田ゆり;永崎麗香;朝比奈紗良;二階堂美雨;大門レヤ;朝羽穂乃;青峰こころ;白間兎花;桧山しずく;望月円;井上もも;国仲ありな;七瀬栞;月城るな;与田ひかげ;小泉玖美;高星なぎさ;結川ひより;林芽依;紫月みやび;生田さな;四季島澪;四季島渚;豊田怜花;七瀬川遥;湊音かれん;天音るな;佐野秋帆;東雲つばき;小泉楓;重盛れいか;香川あんず;溝端恋;青坂あおい;白鳥怜;水川菜月;凪咲あおい`],
 ['music','me_i',`MIU;MOMONA;AYANE;KEIKO;RINON;SUZU;TSUZUMI`],
 ['music','akb',`Saho Iwatate / 岩立沙穂;Seina Fukuoka / 福岡聖菜;Yui Oguri / 小栗有以;Yurina Gyoten / 行天優莉奈;Narumi Kuranoo / 倉野尾成美;Hiyuka Sakagawa / 坂川陽香;Miu Shitao / 下尾みう;Ayane Takahashi / 髙橋彩音;Remi Tokunaga / 徳永羚海;Serika Nagano / 永野芹佳;Haruna Hashimoto / 橋本陽菜;Erii Chiba / 千葉恵里;Haruka Kurosu / 黒須遥香;Ayami Nagatomo / 長友彩海;Orin Muto / 武藤小麟;Mizuki Yamauchi / 山内瑞葵;Suzuha Yamane / 山根涼羽;Yuki Ota / 太田有紀;Airi Sato / 佐藤綺星;Eriko Hashimoto / 橋本恵理子;Nozomi Hatakeyama / 畠山希美;Yuki Hirata / 平田侑希;Moka Hotei / 布袋百椛;Mayuu Masai / 正鋳真優;Miyuu Mizushima / 水島美結;Sora Yamazaki / 山﨑空;Yuna Akiyama / 秋山由奈;Sae Arai / 新井彩永;Kasumi Kudo / 工藤華純;Hinano Kubo / 久保姫菜乃;Yumemi Sako / 迫由芽実;Kohina Narita / 成田香姫奈;Azuki Yagi / 八木愛月;Yui Yamaguchi / 山口結愛;Momoka Ito / 伊藤百花;Kairi Okumoto / 奥本カイリ;Yui Kawamura / 川村結衣;Saki Oga / 大賀彩姫;Saki Kondo / 近藤沙樹;Hinata Maruyama / 丸山ひなた;Mao Takahashi / 髙橋舞桜;Sayuri Tanaka / 田中沙友利;Ema Makito / 牧戸愛茉;Yu Morikawa / 森川優;Kiko Watanabe / 渡邉葵心;Yuna Oonishi / 大西ゆな;Momoka Hasegawa / 長谷川百々花;Izumi Maeda / 前田衣澄;Rinoa Yamauchi / 山内利乃明`],
 ['music','ilife',`あいす;心花りり;若葉のあ;虹羽みに;福丸うさ;小熊まむ;空詩かれん;純嶺みき;真守みゅう`],
 ['music','nonfic',`恋星はるか;こるね;海まりん;永月十華;砂糖みるく;水瀬ぴあの;香月あむ;小枝ここあ;澪織にいな`],
 ['music','sweet',`白石まゆみ;塩川莉世;音井結衣;奥田彩友;栗田なつか;庄司なぎさ;山内咲奈`],
 ['music','ill',`白雪姫乃;蒼井叶;紫ノ色;森 緑藻`],
 ['music','exwhyz',`MiKiNA;MAYU;MAHO;YU-Ki`],
 ['groups','livegroups',`iLiFE!;FRUITS ZIPPER;CUTIE STREET;CANDY TUNE;きゅるりんってしてみて;ZOCX;豆柴の大群;メノニューイヤー;のんふぃく！;SWEET STEADY;iON!;夜光性アミューズ;スリジエ;Ill〖イル〗;ExWHYZ;TENRIN;GILTY×GILTY;ZUTTOMOTTO;アキシブproject;AdamLilith;RAY;JamsCollection;FES☆TIVE;MyDearDarlin';I MY ME MINE;Bunny La Crew;NORMiL;しろもん;Blossom Garden;ICECREAM SCREAM;SEKAIE☆;PassCode;yosugala;Kolokol;Axelight;BANZAI JAPAN;アンスリューム;キングサリ;ラナキュラ;プランクスターズ;まねきケチャ;CROSSNOESIS;METAMUSE;RINGO MUSIC;Devil ANTHEM.;AVAM;Phantom Siita;INUWASI;fav me;log you;myojou;Takane no Nadeshiko;MORE STAR;team shachi;STU48;NGT48;=LOVE;わーすた`],
 ['groups','redditgroups',`WeBana;Lion net girl;XOXO EXTREME;POPPiNG EMO;SUPER REPLiCA;SOMOSOMO;Merkmal Mermal;Heroic New Cinema;GANGEMIC;AdFicTioN;NiL;NANONI;9DayzGlitchClubTokyo;ΩMG;AKIARIM;TOROi;Kaishin no Ichigeki;AIBECK;LEIWAN;O-VER-KiLL;Konton Shojo;Fukansho Hebi Ichigo;MAGMAZ;AZ-ON;Chicken Blow The Idol;NEO JAPONISM;Tenohirael;BLUEGOATS;BELLRING Shojo Heart;Finger Runs;mistress;FaM;Zsasz;SPARK SPEAKER;Wagamama Rakia;YOLOZ;uijin;PIGGS;GANG PARADE;Planck Stars;MIGMA SHELTER;CHEMICAL X;Shihatsumachi Underground;Malcolm Mask McLaren;The Grateful a MogAAAz`],
 ['groups','redditgroup2',`UNBS;GANGDEMIC;EMPATHY;mercuro;Maze;Zenbu Kimi No Sei Da;Kamen Joshi;Zessei no Imperial Doll;Clara Magura;Hissatsu Emomo 7;odoro;You'll Melt More!;Payrin's;Melon Batake a gogo;Owaranaide Yoru;Shin Geki;Fudanjuku;PIPPING HOT;Maison book girl;There There Theres;BILLIE IDLE;Great Monkeys;The Patti;Bury;Leo Wonder;amiina;Hauptharmonie;QUEENS;KAQRIYOTERROR`],
 ['vtuber','holo',`Tokino Sora;Robocosan;Aki Rosenthal;Akai Haato;Shirakami Fubuki;Natsuiro Matsuri;Nakiri Ayame;Yuzuki Choco;Oozora Subaru;AZKi;Ookami Mio;Sakura Miko;Nekomata Okayu;Inugami Korone;Hoshimachi Suisei;Usada Pekora;Shiranui Flare;Shirogane Noel;Houshou Marine;Tsunomaki Watame;Tokoyami Towa;Himemori Luna;Yukihana Lamy;Momosuzu Nene;Shishiro Botan;Omaru Polka;La+ Darknesss;Takane Lui;Hakui Koyori;Kazama Iroha;Sakamata Chloe;Ayunda Risu;Moona Hoshinova;Airani Iofifteen;Kureiji Ollie;Anya Melfissa;Pavolia Reine;Vestia Zeta;Kaela Kovalskia;Kobo Kanaeru;Mori Calliope;Takanashi Kiara;Ninomae Ina'nis;Watson Amelia;IRyS;Ouro Kronii;Hakos Baelz;Shiori Novella;Koseki Bijou;Nerissa Ravencroft;Fuwawa Abyssgard;Mococo Abyssgard;Elizabeth Rose Bloodflame;Gigi Murin;Cecilia Immergreen;Raora Panthera;Otonose Kanade;Ichijou Ririka;Juufuutei Raden;Todoroki Hajime;Isaki Riona;Koganei Niko;Mizumiya Su;Rindo Chihaya;Kikirara Vivi;Achichi Mela;Sorashina Sopia;Suzuna Tsuzuri;Hyakuto Kyoko;Izuki Michiru;Hanazono Sayaka;Kazeshiro Yuki;Minato Aqua;Murasaki Shion;Amane Kanata;Kiryu Coco;Gawr Gura;Tsukumo Sana;Ceres Fauna;Nanashi Mumei;Hiodoshi Ao`],
 ['vtuber','niji',`Kokonami Iruka / 小々波いるか;Mikogami Kotone / 御子神琴音;Senri Ayumu / 千凛あゆむ;Rei7`],
 ['gravure','gravure',`Kirara Midorikawa / 緑川希星;Kotori Kaiga / 貝賀琴莉;Rea Momosato / 桃里れあ;Ayumi Koyanagi / 小柳歩;Mika Nonomiya / 野々宮ミカ;Marina Nagasawa / 長澤茉里奈;Arisa Sugimoto / 杉本愛莉鈴;Honoka Sasaki / 佐々木ほのか;Yurino Okada / 岡田佑里乃;Miku Tanaka / 田中美久;Minami Wachi / わちみなみ`],
 ['gravure','first',`Rui Nagumo / 南雲るい;Ayano Sumida / 澄田綾乃;Nao Usami / 宇佐美なお;Risako / 凛咲子;Kurumi Miyajima / 宮嶋くるみ;Tsumugi Hara / 原つむぎ;Sasha Yurikawa / 百合川サシャ;Maki Shinkai / 新海まき;Narumi Okawa / 大川成美`],
 ['gravure','dig',`Aika / 愛花;Honoka Aikawa / 相川暖花;Yuka Aisaka / 相坂優歌;Nanako Aizawa / 相沢菜々子;Rina Aizawa / 逢沢りな;Noel Aizome / 愛染のえる;Jurii Aida / 逢田珠里依;Rikako Aida / 逢田梨香子`],
 ['gravure','celeb',`Mio Imada;Kanna Seto;Riho Yoshioka;Hikari Mitsushima;Maya Imamori;Ema Yano;Mitsu Dan;Ruriko Kojima;Saki Tateno;Yotsuha Kominato;Miwako Kakei;Ai Shinozaki;Sayaka Isoyama;Yū Tano;Mizuki Kirihara;Nako Yabuki;Yuuri Rukawa;Sayaka Unagi;Yuki Kashiwagi;Rio Teramoto;Mikie Hara;Manami Hashimoto;Nene Shida;Maria Makino;Tomomi Morisaki;Yuki Kimura;Yūko Tsubakino;Ami Inamura;Hinako Sano;Moe Iori;Wakana Uehara;Nanami Matsumoto;Nana Asakawa;Aika Sawaguchi;Yasuyo Saitō;Asuka Kishi;Yūka Ogura;Yoshino Chitose;Rin Takahashi;Rurika Yokoyama;Anri Sugihara;Yuzuha Hongō;Kurea Hazuki;Fūka Hanasaki;Yūri Adachi;Kana Yamada;Yuka Kuramochi;Yume Hayashi;Runa Toyoda;Mizuki Takanashi;Rina Hashimoto;Hikaru Aoyama;Kaworu Yasui;Mami Nagase;Nanami Asahi;Oto Abe;Haruka Momokawa;Ayu Hazaki;Miu Shitao;Honoka Kukita;Yuki Fujiki;Kanae Watanabe;Kazue Watanabe;Meiri;Riho Horie;Iori Sagara;Enako;Nashiko Momotsuki;Maitei`],
 ['fashion','fashion',`Meru Nukumi;Suzu Hirose;Marie Iitoyo;Sayaka Okada;Yua Shinkawa;Ruriko Kojima;Rio Uchida;Rena Takeda;Ai Shinozaki;Mao Ichimichi;Fumika Baba;Akiko Kuji;Nashiko Momotsuki;Nene Shida;yuna / 星乃夢奈;Kana Nakada;Yuki Ishihara;Yumi Sugimoto;Kazusa Okuyama;Hinami Mori;Mariya Nagao;Yasuyo Saitō;Akemi Darenogare;Nanako Aizawa;Moga Mogami;Shieri Kurasawa;Yume Hayashi;Honoka;Nana Tanimura;Minami Fukuoka;Ikumi Hisamatsu;yunocy;Nanami Asahi;Yuko Sugamoto;Yuki Fujiki;Reika Hino;Rena Kuroki;Airi Ikematsu;Ruka Mishina;Nanaka Kawamura;Asami Ōta;Mio Arisu;Rio Miyamoto;Maya Sano;Saaya Asakura;Shihomi Ogoshi;Wakana Kazuki;Machi Kiyose;Ren Morizono;Erika Aoi`],
 ['cosplay','ppe',`Enako / えなこ;Umi Shinonome / 東雲うみ;Yokyu-n / よきゅーん;Kokoro Shinozaki / 篠崎こころ;Minami Ami / 南あみ;Saki Yoshida / 吉田早希;Minami Shinohara / 篠原みなみ;Eili / えい梨;Myako / みゃこ;Nao Takami / 高見奈央;Kitaro / 綺太郎;Yamamoto Shiori / 山本栞;Momoto Momo / 桃戸もも;Noe Mita / 三田のえ`],
 ['cosplay','cosplayguide',`Shinonome Umi / 東雲うみ;Sakurai Feel / 尊みを感じて桜井;Miyamoto Saki / 宮本彩希;Yunocy / ゆのしー;Suzuran / すずら;Shinozaki Kokoro / 篠崎こころ;Kikka / きっか;Tachibana Asahi / 橘あさひ;Tsukimi Tsukune / 月海つくね;Nekota Ashu / 猫田あしゅ;Koumaru-ya / 幸まる屋;Momotsuki Nashiko / 桃月なしこ;Kashou Roshieru / 火将ロシエル;Nyarumaa / にゃるまー。`],
 ['cosplay','cosplaymore',`Marina Amatsu;Liyuu;Fleia;Yami;Miiko;Usagi Usa;Saku;Honami Shizuku;Moe Iori;Akira Itsuki;Sithle;Non;Kuroneko;Momoiroreku;Shinohana Sumire;Yutori;Takanashi Kurea;Prince Ponyoo`],
 ['creators','social',`Miyako / 都;ADH / 末期のｱｰﾃﾞｰﾊｰﾃﾞｰ;Kuya / くや;Futeko / ふてこ;Mipota Pota / みぽたぽた;Chihiro ASMR / ちひろASMR;kinoko / kinoko;Pixel Ribbon;Amaha Haruka / 天羽遥;Momohana / ももはな;Asato / あさと;Shinmoto Shin / 慎本真;Fumiami / ふみあみ;Hinata / ひなた;Pukupuku / ぷくぷく;Myuu / みゅう;Mukuena / むくえな;Meika / めいか;Yuurich / ゆうり;Waon Syndrome / わおん;Sara Kordi / サラ・コールディ;Shuu / シュウ;Nyasupa / ニャスパ;Miru / ミル;Miyahara Hibiki / 宮原響;Hiyorimaru / 早速ひよりまる;Jiku Sosha / 時空操者;Kimura Sena / 木村星南;Murahama / 村濱遥;Rara / 来蘭;Shiroihito / 白い人;Takeshita Paradise / 竹下☆ぱらだいす;Hiiiyo / 陽世`],
 ['creators','grove',`Yui Kobashi / 小橋由依`],
 ['creators','lifestyle',`Mao Asada / 浅田真央;yuka;Nozomi Maeda / 前田希美;Amika / あみか;Ayase Rie;Risa Hirako / 平子理沙;rumi;Yurano Ochi / 越智ゆらの;Nanako Naozaki / なおざきななこ;Misaki Horio / 堀尾実咲;KAREN;kotoha;Yoshika Kita / 喜多よしか;Miki Ide / 井手美希;Miyu Kano / かのうみゆ`],
 ['jav','adult',`Turuya Cecil / 都留矢セシル;Fujisawa Yuria / 藤沢ユリア;Takigawa Nanami / 滝川菜々美;Tukishima Hana / 月島花;Minato Riku / 湊莉久;Komatsu Rui / 小松るい;Yunoki Hiori / 柚木ひおり;Yoshinaga Touko / 吉永塔子;Kurosaki Mika / 黒崎みか;Hijiri Toa / 聖璃とあ;Ayame Kurumi / 彩芽くるみ;Unpai / うんぱい;Takahashi Shouko / 高橋しょう子;Igarashi Natsu / 五十嵐なつ;Mizore Arisa / 水逸ありさ;Miyashita Madoka / 宮下まどか;Suzuna Nami / 涼菜波美;Neo Akari / 根尾あかり;Arisu Kanau / 有栖かなう;Megumi Rio / 恵凛音;Haneda Riko / 羽田璃子;Shirakami Emika / 白上咲花;Mihama Miki / 実浜みき;Nakajo Rino / 中条りの`],
 ['cosplay','cosplayguide',`Hanasaki Raimu / 花咲来夢;Manatsu / 茉夏;Chocolat / しょこら;87 Kabocha / 87かぼちゃ;Muyun / むゆん;Guilt Guy Shojo / ギルトガイ少女;Shirayuki / しらゆき;Keika;Sakurako / 桜虎;YOGA The Cosplayer / ギャクヨガ;Shinohara Minami / 篠原みなみ;Yokyu-n / よきゅーん;Momo Momoto / 桃戸もも;Eili / えい梨;Yamamoto Shiori / 山本栞`],
 ['jav','linx',`相浦茉莉花;相河めいな;相羽愛沙;青井いちご;青葉千明;赤西涼;有加里ののか;浅川純奈;朝霧智晶;麻倉みつき;朝羽穂乃;浅羽ゆめ;飛鳥りいな;天河みなせ;天乃のあ;天星佳澄;雨宮かえで;綾瀬舞菜;彩奈リナ;あやめ陽菜;鮎川きさら;有賀みなほ;有坂祥子;安堂はるの;安奈真理恵;伊織ひなの;伊佐木リアン;一条綺美香;市成心海;市元りくな;稲葉果織;稲葉ゆき;稲見なずな;今藤霧子;磐井玲子;宇垣せなみ;内海圭奈;宇野すずり;海埜ほたる;江夏ルキア;大沢カスミ;大本まり菜;丘崎りあな;岡名カレン;小倉みきね;音田絵凛;音羽エレナ;雄乃ゆめ`],
 ['adult','tpowers',`兒玉七海;児玉るみ;斎木香住;斉藤帆夏;島津かおる;剱聖蓮`],
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
const officialMemberProfiles={
 'MIU':'https://me-i.jp/feature/profile_miu?lang=en','MOMONA':'https://me-i.jp/feature/profile_momona?lang=en','AYANE':'https://me-i.jp/feature/profile_ayane?lang=en','KEIKO':'https://me-i.jp/feature/profile_keiko?lang=en','RINON':'https://me-i.jp/feature/profile_rinon?lang=en','SUZU':'https://me-i.jp/feature/profile_suzu?lang=en','TSUZUMI':'https://me-i.jp/feature/profile_tsuzumi?lang=en'
};
const canonical={"Shinonome Umi":"Umi Shinonome","Shinozaki Kokoro":"Kokoro Shinozaki","Miyamoto Saki":"Saki Miyamoto","Momotsuki Nashiko":"Nashiko Momotsuki","Nekota Ashu":"Ashu Nekota","Yunocy":"yunocy"};
const youngTalent=[["新井心菜","Cocona Arai","2008-12-18","music","MORE STAR","https://asobisystem.com/talent/morestar/"],["遠藤まりん","Marin Endo","2007-03-29","music","MORE STAR","https://asobisystem.com/talent/morestar/"],["笹原なな花","Nanaka Sasahara","2009-07-07","music","MORE STAR","https://asobisystem.com/talent/morestar/"],["中山こはく","Kohaku Nakayama","2008-07-30","music","MORE STAR","https://asobisystem.com/talent/morestar/"],["森田あみ","Ami Morita","2008-02-06","music","MORE STAR","https://asobisystem.com/talent/morestar/"],["星乃 あんな","Anna Hoshino","2009-11-01","fashion","Seventeen","https://seventeen-web.jp/stmodels/anna_hoshino/"],["原田花埜","Hanano Harada","2010-04-04","fashion","Seventeen","https://seventeen-web.jp/stmodels/hanano_harada/"],["希咲 うみ","Umi Kisaki","2010-06-25","fashion","Seventeen","https://seventeen-web.jp/stmodels/umi_kisaki/"],["岡本 望来","Miku Okamoto","2011-10-13","fashion","Seventeen","https://seventeen-web.jp/stmodels/miku_okamoto/"],["川瀬 翠子","Suiko Kawase","2012-03-27","fashion","Seventeen","https://seventeen-web.jp/stmodels/suiko_kawase/"],["平内 心音","Cocone Hirauchi","2011-05-31","fashion","Seventeen","https://seventeen-web.jp/stmodels/cocone_hirauchi/"],["竹下 優名","Yu-na Takeshita","2010-01-14","fashion","Seventeen","https://seventeen-web.jp/stmodels/yuuna_takeshita/"],["佐々木満音","Milon Sasaki","2010-05-14","fashion","Seventeen","https://seventeen-web.jp/stmodels/milon_sasaki/"],["梶原 叶渚","Kanna Kajiwara","2009-07-31","fashion","Seventeen","https://seventeen-web.jp/stmodels/kanna_kajiwara/"],["滝口 芽里衣","Merii Takiguchi","2008-11-04","fashion","Seventeen","https://seventeen-web.jp/stmodels/merii_takiguchi/"],["稲光 亜依","Ai Inamitsu","2008-12-09","fashion","Seventeen","https://seventeen-web.jp/stmodels/ai_inamitsu/"],["小國 舞羽","Mau Oguni","2008-01-24","fashion","Seventeen","https://seventeen-web.jp/stmodels/mau_oguni/"],["松本 麗世","Reiyo Matsumoto","2008-02-29","fashion","Seventeen","https://seventeen-web.jp/stmodels/reiyo_matsumoto/"],["多田 梨音","Rinon Tada","2008-06-07","fashion","Seventeen","https://seventeen-web.jp/stmodels/rinon_tada/"]];
const teenRestrictedNames=new Set(youngTalent.map(item=>item[0].normalize('NFKC').replace(/\s/g,'')));
const people=[],seen=new Set();
for(const [category,sourceKey,blob] of groups){
 const source=sources[sourceKey];
 for(const raw of blob.split(';').map(s=>s.trim()).filter(Boolean)){
  let [name,...other]=raw.split(' / ');
  const alternate=other.join(' / ').trim();
  name=canonical[name]||name;
  if(['gravure','jav','adult'].includes(category)&&teenRestrictedNames.has(name.normalize('NFKC').replace(/\s/g,'')))continue;
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
for(const [name,alternate,birth,category,group,url] of youngTalent){
 const same=people.find(p=>p.category===category&&p.name.replace(/\s/g,'')===name.replace(/\s/g,''));
 if(same){same.birth=birth;same.alternate=alternate;same.group=group;same.source=url;same.sourceLabel=group+' · profilo ufficiale';same.sourceKind='fonte ufficiale verificata';same.teenSafe=true;continue}
 people.push({category,name,alternate,birth,group,source:url,sourceLabel:group+' · profilo ufficiale',sourceKind:'fonte ufficiale verificata',officialProfile:url,platform:null,teenSafe:true})
}
/* Sakura Gakuin historical roster: names documented in a 2019 fan discussion.
   Historical music/performer context only; never infer current membership, age, social accounts or photographs. */
const sakuraHistorical=[["Hana Taguchi","田口華"],["Marina Horiuchi","堀内まり菜"],["Megumi Okada","岡田愛"],["Aiko Yamaide","山出愛子"],["Ayami Muto","武藤彩未"],["Hinata Sato","佐藤日向"],["Raura Iida","飯田來麗"],["Airi Matsui","松井愛莉"],["Ayaka Miyoshi","三吉彩花"]];
for(const [name,alternate] of sakuraHistorical){
 const existing=people.find(p=>p.name.toLocaleLowerCase('en')===name.toLocaleLowerCase('en')||p.name===alternate||p.alternate===alternate);
 if(existing){if(!existing.group)existing.group='Sakura Gakuin (ex membro · storico)';continue;}
 people.push({category:'music',name,alternate,group:'Sakura Gakuin (ex membro · storico)',source:'https://www.reddit.com/r/SakuraGakuin/comments/aehllj/i_made_a_website_listing_460_junior_idols_and/',sourceLabel:'r/SakuraGakuin · discussione storica (2019)',sourceKind:'community · da verificare con fonti ufficiali',officialProfile:null,platform:null});
}
window.YumeIdolsDiscovery=Object.freeze({updated:'2026-11-08',sources,people,verified,officialVT,officialMemberProfiles,stats:{entries:people.length,sources:Object.keys(sources).length}});
})();