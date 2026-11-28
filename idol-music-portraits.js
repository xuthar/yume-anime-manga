/* Portraits from official group profiles and the existing Yume discographies. */
(() => {
  const catalog = window.YumeIdolsDiscovery;
  if (!catalog) return;
  const portraits = [
  {
    "name": "Akama Shiki",
    "source": "https://mooove.world/profile/akama-shiki/",
    "image": "https://mooove.world/wp-content/uploads/2026/05/4bed09ad26b7806f94f7f225e38dcf30.jpg",
    "category": "music",
    "group": "#Mooove!"
  },
  {
    "name": "Himeno Hinano",
    "source": "https://mooove.world/profile/himeno-hinano/",
    "image": "https://mooove.world/wp-content/uploads/2026/05/ff298ba2b3fd2fe5d8903a5052325f9d.jpg",
    "category": "music",
    "group": "#Mooove!"
  },
  {
    "name": "Kuki Naho",
    "source": "https://mooove.world/profile/kuki-naho/",
    "image": "https://mooove.world/wp-content/uploads/2026/05/3833c6e0d2d9dcba7334bb7988060bcd.jpg",
    "category": "music",
    "group": "#Mooove!"
  },
  {
    "name": "Orito",
    "source": "https://mooove.world/profile/orito/",
    "image": "https://mooove.world/wp-content/uploads/2026/05/c1a34b08395ca45b04921a960bd91775.jpg",
    "category": "music",
    "group": "#Mooove!"
  },
  {
    "name": "Hoshino Sara",
    "source": "https://mooove.world/profile/hoshino-sara/",
    "image": "https://mooove.world/wp-content/uploads/2026/05/13c32760c9427bd8331abd875f201f0b.jpg",
    "category": "music",
    "group": "#Mooove!"
  },
  {
    "name": "Himeno Yumeno",
    "source": "https://mooove.world/profile/himeno-yumeno/",
    "image": "https://mooove.world/wp-content/uploads/2026/05/56008a6a32939a68521d323d9b5072f9.jpg",
    "category": "music",
    "group": "#Mooove!"
  },
  {
    "name": "Nanami Rio",
    "source": "https://mooove.world/profile/nanami-rio/",
    "image": "https://mooove.world/wp-content/uploads/2026/10/d341f1eb86e3ed47be45917ebfac8e8f.jpg",
    "category": "music",
    "group": "#Mooove!"
  },
  {
    "name": "Otani Emiri",
    "alternate": "大谷 映美里",
    "category": "music",
    "source": "https://equal-love.jp/feature/profile",
    "image": "assets/jpop/equal-love/otani-emiri.webp",
    "group": "=LOVE",
    "profile": "https://equal-love.jp/feature/otani_emiri"
  },
  {
    "name": "Oba Hana",
    "alternate": "大場 花菜",
    "category": "music",
    "source": "https://equal-love.jp/feature/profile",
    "image": "assets/jpop/equal-love/oba-hana.webp",
    "group": "=LOVE",
    "profile": "https://equal-love.jp/feature/oba_hana"
  },
  {
    "name": "Otoshima Risa",
    "alternate": "音嶋 莉沙",
    "category": "music",
    "source": "https://equal-love.jp/feature/profile",
    "image": "assets/jpop/equal-love/otoshima-risa.webp",
    "group": "=LOVE",
    "profile": "https://equal-love.jp/feature/otoshima_risa"
  },
  {
    "name": "Saito Kiara",
    "alternate": "齋藤 樹愛羅",
    "category": "music",
    "source": "https://equal-love.jp/feature/profile",
    "image": "assets/jpop/equal-love/saito-kiara.webp",
    "group": "=LOVE",
    "profile": "https://equal-love.jp/feature/saito_kiara"
  },
  {
    "name": "Sasaki Maika",
    "alternate": "佐々木 舞香",
    "category": "music",
    "source": "https://equal-love.jp/feature/profile",
    "image": "assets/jpop/equal-love/sasaki-maika.webp",
    "group": "=LOVE",
    "profile": "https://equal-love.jp/feature/sasaki_maika"
  },
  {
    "name": "Takamatsu Hitomi",
    "alternate": "髙松 瞳",
    "category": "music",
    "source": "https://equal-love.jp/feature/profile",
    "image": "assets/jpop/equal-love/takamatsu-hitomi.webp",
    "group": "=LOVE",
    "profile": "https://equal-love.jp/feature/takamatsu_hitomi"
  },
  {
    "name": "Takiwaki Shoko",
    "alternate": "瀧脇 笙古",
    "category": "music",
    "source": "https://equal-love.jp/feature/profile",
    "image": "assets/jpop/equal-love/takiwaki-shoko.webp",
    "group": "=LOVE",
    "profile": "https://equal-love.jp/feature/takiwaki_shoko"
  },
  {
    "name": "Noguchi Iori",
    "alternate": "野口 衣織",
    "category": "music",
    "source": "https://equal-love.jp/feature/profile",
    "image": "assets/jpop/equal-love/noguchi-iori.webp",
    "group": "=LOVE",
    "profile": "https://equal-love.jp/feature/noguchi_iori"
  },
  {
    "name": "Morohashi Sana",
    "alternate": "諸橋 沙夏",
    "category": "music",
    "source": "https://equal-love.jp/feature/profile",
    "image": "assets/jpop/equal-love/morohashi-sana.webp",
    "group": "=LOVE",
    "profile": "https://equal-love.jp/feature/morohashi_sana"
  },
  {
    "name": "Yamamoto Anna",
    "alternate": "山本 杏奈",
    "category": "music",
    "source": "https://equal-love.jp/feature/profile",
    "image": "assets/jpop/equal-love/yamamoto-anna.webp",
    "group": "=LOVE",
    "profile": "https://equal-love.jp/feature/yamamoto_anna"
  },
  {
    "name": "Rei Asahina",
    "alternate": "朝比奈 れい",
    "category": "music",
    "source": "https://appare-official.jp/profiles",
    "image": "assets/jpop/appare/member-1.jpg",
    "group": "Appare!",
    "profile": "https://appare-official.jp/profiles"
  },
  {
    "name": "Yume Nagahori",
    "alternate": "永堀 ゆめ",
    "category": "music",
    "source": "https://appare-official.jp/profiles",
    "image": "assets/jpop/appare/member-2.jpg",
    "group": "Appare!",
    "profile": "https://appare-official.jp/profiles"
  },
  {
    "name": "Mei Fujimiya",
    "alternate": "藤宮 めい",
    "category": "music",
    "source": "https://appare-official.jp/profiles",
    "image": "assets/jpop/appare/member-3.jpg",
    "group": "Appare!",
    "profile": "https://appare-official.jp/profiles"
  },
  {
    "name": "Rea Nanase",
    "alternate": "七瀬 れあ",
    "category": "music",
    "source": "https://appare-official.jp/profiles",
    "image": "assets/jpop/appare/member-4.jpg",
    "group": "Appare!",
    "profile": "https://appare-official.jp/profiles"
  },
  {
    "name": "Suzu Aoi",
    "alternate": "藍井 すず",
    "category": "music",
    "source": "https://appare-official.jp/profiles",
    "image": "assets/jpop/appare/member-5.jpg",
    "group": "Appare!",
    "profile": "https://appare-official.jp/profiles"
  },
  {
    "name": "Ami Hashimoto",
    "alternate": "橋本 あみ",
    "category": "music",
    "source": "https://appare-official.jp/profiles",
    "image": "assets/jpop/appare/member-6.jpg",
    "group": "Appare!",
    "profile": "https://appare-official.jp/profiles"
  },
  {
    "name": "Amu Kitano",
    "alternate": "北野 あむ",
    "category": "music",
    "source": "https://appare-official.jp/profiles",
    "image": "assets/jpop/appare/member-7.jpg",
    "group": "Appare!",
    "profile": "https://appare-official.jp/profiles"
  },
  {
    "name": "Natsu Morikawa",
    "alternate": "森川 なつ",
    "category": "music",
    "source": "https://appare-official.jp/profiles",
    "image": "assets/jpop/appare/member-8.jpg",
    "group": "Appare!",
    "profile": "https://appare-official.jp/profiles"
  },
  {
    "name": "Risa Sakamoto",
    "alternate": "坂本 りさ",
    "category": "music",
    "source": "https://appare-official.jp/profiles",
    "image": "assets/jpop/appare/member-9.jpg",
    "group": "Appare!",
    "profile": "https://appare-official.jp/profiles"
  },
  {
    "name": "=LOVE",
    "category": "groups",
    "group": "=LOVE",
    "source": "https://equal-love.jp/feature/profile",
    "image": "assets/jpop/equal-love/group.webp"
  },
  {
    "name": "Appare!",
    "category": "groups",
    "group": "Appare!",
    "source": "https://appare-official.jp/profiles",
    "image": "assets/jpop/appare/group.jpg"
  },
  {
    "name": "AKB48",
    "category": "groups",
    "group": "AKB48",
    "source": "https://www.akb48.co.jp/",
    "image": "assets/jpop/akb48/group.webp"
  },
  {
    "name": "Nogizaka46",
    "category": "groups",
    "group": "Nogizaka46",
    "source": "https://www.nogizaka46.com/s/n46/search/artist",
    "image": "assets/jpop/nogizaka46/group.jpg"
  },
  {
    "name": "NGT48",
    "category": "groups",
    "group": "NGT48",
    "source": "https://ngt48.jp/profile",
    "image": "assets/jpop/ngt48/group.webp"
  },
  {
    "name": "Yuho Aoki",
    "alternate": "青木 宙帆",
    "category": "music",
    "group": "BokuAo",
    "profile": "https://bokuao.com/feature/profile_aoki_yuho",
    "source": "https://bokuao.com/feature/profile_aoki_yuho",
    "image": "assets/jpop/bokuao/aoki-yuho.jpg"
  },
  {
    "name": "Rian Akita",
    "alternate": "秋田 莉杏",
    "category": "music",
    "group": "BokuAo",
    "profile": "https://bokuao.com/feature/profile_akita_rian",
    "source": "https://bokuao.com/feature/profile_akita_rian",
    "image": "assets/jpop/bokuao/akita-rian.jpg"
  },
  {
    "name": "Aoi Anno",
    "alternate": "安納 蒼衣",
    "category": "music",
    "group": "BokuAo",
    "profile": "https://bokuao.com/feature/profile_anno_aoi",
    "source": "https://bokuao.com/feature/profile_anno_aoi",
    "image": "assets/jpop/bokuao/anno-aoi.jpg"
  },
  {
    "name": "Yuzu Ito",
    "alternate": "伊藤 ゆず",
    "category": "music",
    "group": "BokuAo",
    "profile": "https://bokuao.com/feature/profile_ito_yuzu",
    "source": "https://bokuao.com/feature/profile_ito_yuzu",
    "image": "assets/jpop/bokuao/ito-yuzu.jpg"
  },
  {
    "name": "Yuki Imai",
    "alternate": "今井 優希",
    "category": "music",
    "group": "BokuAo",
    "profile": "https://bokuao.com/feature/profile_imai_yuki",
    "source": "https://bokuao.com/feature/profile_imai_yuki",
    "image": "assets/jpop/bokuao/imai-yuki.jpg"
  },
  {
    "name": "Riko Iwamoto",
    "alternate": "岩本 理瑚",
    "category": "music",
    "group": "BokuAo",
    "profile": "https://bokuao.com/feature/profile_iwamoto_riko",
    "source": "https://bokuao.com/feature/profile_iwamoto_riko",
    "image": "assets/jpop/bokuao/iwamoto-riko.jpg"
  },
  {
    "name": "Ami Kanazawa",
    "alternate": "金澤 亜美",
    "category": "music",
    "group": "BokuAo",
    "profile": "https://bokuao.com/feature/profile_kanazawa_ami",
    "source": "https://bokuao.com/feature/profile_kanazawa_ami",
    "image": "assets/jpop/bokuao/kanazawa-ami.jpg"
  },
  {
    "name": "Ai Kinoshita",
    "alternate": "木下 藍",
    "category": "music",
    "group": "BokuAo",
    "profile": "https://bokuao.com/feature/profile_kinoshita_ai",
    "source": "https://bokuao.com/feature/profile_kinoshita_ai",
    "image": "assets/jpop/bokuao/kinoshita-ai.jpg"
  },
  {
    "name": "Yua Kudo",
    "alternate": "工藤 唯愛",
    "category": "music",
    "group": "BokuAo",
    "profile": "https://bokuao.com/feature/profile_kudo_yua",
    "source": "https://bokuao.com/feature/profile_kudo_yua",
    "image": "assets/jpop/bokuao/kudo-yua.jpg"
  },
  {
    "name": "Nana Shiogama",
    "alternate": "塩釜 菜那",
    "category": "music",
    "group": "BokuAo",
    "profile": "https://bokuao.com/feature/profile_shiogama_nana",
    "source": "https://bokuao.com/feature/profile_shiogama_nana",
    "image": "assets/jpop/bokuao/shiogama-nana.jpg"
  },
  {
    "name": "Eren Sugiura",
    "alternate": "杉浦 英恋",
    "category": "music",
    "group": "BokuAo",
    "profile": "https://bokuao.com/feature/profile_sugiura_eren",
    "source": "https://bokuao.com/feature/profile_sugiura_eren",
    "image": "assets/jpop/bokuao/sugiura-eren.jpg"
  },
  {
    "name": "Miuna Sunaga",
    "alternate": "須永 心海",
    "category": "music",
    "group": "BokuAo",
    "profile": "https://bokuao.com/feature/profile_sunaga_miuna",
    "source": "https://bokuao.com/feature/profile_sunaga_miuna",
    "image": "assets/jpop/bokuao/sunaga-miuna.jpg"
  },
  {
    "name": "Aya Nishimori",
    "alternate": "西森 杏弥",
    "category": "music",
    "group": "BokuAo",
    "profile": "https://bokuao.com/feature/profile_nishimori_aya",
    "source": "https://bokuao.com/feature/profile_nishimori_aya",
    "image": "assets/jpop/bokuao/nishimori-aya.jpg"
  },
  {
    "name": "Kokoka Hagiwara",
    "alternate": "萩原 心花",
    "category": "music",
    "group": "BokuAo",
    "profile": "https://bokuao.com/feature/profile_hagiwara_kokoka",
    "source": "https://bokuao.com/feature/profile_hagiwara_kokoka",
    "image": "assets/jpop/bokuao/hagiwara-kokoka.jpg"
  },
  {
    "name": "Hitomi Hasegawa",
    "alternate": "長谷川 稀未",
    "category": "music",
    "group": "BokuAo",
    "profile": "https://bokuao.com/feature/profile_hasegawa_hitomi",
    "source": "https://bokuao.com/feature/profile_hasegawa_hitomi",
    "image": "assets/jpop/bokuao/hasegawa-hitomi.jpg"
  },
  {
    "name": "Suzuki Hayasaki",
    "alternate": "早﨑 すずき",
    "category": "music",
    "group": "BokuAo",
    "profile": "https://bokuao.com/feature/profile_hayasaki_suzuki",
    "source": "https://bokuao.com/feature/profile_hayasaki_suzuki",
    "image": "assets/jpop/bokuao/hayasaki-suzuki.jpg"
  },
  {
    "name": "Yuria Miyakoshi",
    "alternate": "宮腰 友里亜",
    "category": "music",
    "group": "BokuAo",
    "profile": "https://bokuao.com/feature/profile_miyakoshi_yuria",
    "source": "https://bokuao.com/feature/profile_miyakoshi_yuria",
    "image": "assets/jpop/bokuao/miyakoshi-yuria.jpg"
  },
  {
    "name": "Miisa Yaegashi",
    "alternate": "八重樫 美伊咲",
    "category": "music",
    "group": "BokuAo",
    "profile": "https://bokuao.com/feature/profile_yaegashi_miisa",
    "source": "https://bokuao.com/feature/profile_yaegashi_miisa",
    "image": "assets/jpop/bokuao/yaegashi-miisa.jpg"
  },
  {
    "name": "Toa Yagi",
    "alternate": "八木 仁愛",
    "category": "music",
    "group": "BokuAo",
    "profile": "https://bokuao.com/feature/profile_yagi_toa",
    "source": "https://bokuao.com/feature/profile_yagi_toa",
    "image": "assets/jpop/bokuao/yagi-toa.jpg"
  },
  {
    "name": "Karen Yanagihori",
    "alternate": "柳堀 花怜",
    "category": "music",
    "group": "BokuAo",
    "profile": "https://bokuao.com/feature/profile_yanagihori_karen",
    "source": "https://bokuao.com/feature/profile_yanagihori_karen",
    "image": "assets/jpop/bokuao/yanagihori-karen.jpg"
  },
  {
    "name": "Cocona Yoshimoto",
    "alternate": "吉本 此那",
    "category": "music",
    "group": "BokuAo",
    "profile": "https://bokuao.com/feature/profile_yoshimoto_cocona",
    "source": "https://bokuao.com/feature/profile_yoshimoto_cocona",
    "image": "assets/jpop/bokuao/yoshimoto-cocona.jpg"
  }
];
  const normalize = value => (value || '').normalize('NFKC').replace(/\s/g, '').toLowerCase();
  const people = catalog.people.slice();
  for (const portrait of portraits) {
    const names = new Set([portrait.name, portrait.alternate].filter(Boolean).map(normalize));
    const matches = people.filter(p => p.category === portrait.category &&
      [p.name, p.alternate].some(n => n && names.has(normalize(n))));
    if (matches.length > 1) continue;
    const person = matches[0];
    if (person && person.group && normalize(person.group) !== normalize(portrait.group)) continue;
    const record = {
      ...person, category: portrait.category, name: person?.name || portrait.name,
      alternate: person?.alternate || portrait.alternate || '', group: portrait.group,
      officialProfile: portrait.profile || portrait.source,
      source: person?.source || portrait.source, sourceLabel: person?.sourceLabel || portrait.group,
      sourceKind: person?.sourceKind || 'profilo ufficiale',
      editorialPhoto: new URL(portrait.image, document.baseURI).href,
      editorialPhotoSource: portrait.source
    };
    if (person) people[people.indexOf(person)] = record;
    else people.push(record);
  }
  window.YumeIdolsDiscovery = {...catalog, people};
})();
