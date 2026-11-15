/* Japanese idol photographs: exact named source records, checked 2026-11-15.
 * Individual portraits: official AKB48 / ME:I / ASOBISYSTEM profile pages.
 * Group photographs: named Live Idol directory records. Rights remain with owners.
 * No Instagram image requests, guessed filenames, or group photo as solo portrait.
 */
(()=>{'use strict';
const old=window.YumeIdolsDiscovery;if(!old)return;
const rows=[
  {
    "name": "iLiFE!",
    "category": "groups",
    "photo": "https://liveidol.blog/wp-content/uploads/2026/04/G8NLc4DaoAEjodb.jpg",
    "source": "https://liveidol.blog/group-profile/ilife_official/",
    "sourceLabel": "Live Idol · foto del gruppo attribuita nella scheda",
    "width": 1200,
    "height": 800
  },
  {
    "name": "FRUITS ZIPPER",
    "category": "groups",
    "photo": "https://liveidol.blog/wp-content/uploads/2026/05/HIWXtfxaQAABrVO.jpg",
    "source": "https://liveidol.blog/group-profile/fruits_zipper/",
    "sourceLabel": "Live Idol · foto del gruppo attribuita nella scheda",
    "width": 1200,
    "height": 800
  },
  {
    "name": "CUTIE STREET",
    "category": "groups",
    "photo": "https://liveidol.blog/wp-content/uploads/2025/02/Gi1yjqyaIAIqWNh-1.jpg",
    "source": "https://liveidol.blog/group-profile/cutie_street_/",
    "sourceLabel": "Live Idol · foto del gruppo attribuita nella scheda",
    "width": 1000,
    "height": 667
  },
  {
    "name": "CANDY TUNE",
    "category": "groups",
    "photo": "https://liveidol.blog/wp-content/uploads/2025/02/GkY81v3WkAASYoX-1.jpg",
    "source": "https://liveidol.blog/group-profile/candy_tune_/",
    "sourceLabel": "Live Idol · foto del gruppo attribuita nella scheda",
    "width": 1000,
    "height": 667
  },
  {
    "name": "きゅるりんってしてみて",
    "category": "groups",
    "photo": "https://liveidol.blog/wp-content/uploads/2025/04/GoVjtvdXQAADE9C-1.jpg",
    "source": "https://liveidol.blog/group-profile/kyurushite/",
    "sourceLabel": "Live Idol · foto del gruppo attribuita nella scheda",
    "width": 1000,
    "height": 667
  },
  {
    "name": "ZOCX",
    "category": "groups",
    "photo": "https://liveidol.blog/wp-content/uploads/2025/09/ZOCX.jpg",
    "source": "https://liveidol.blog/group-profile/___zocx___/",
    "sourceLabel": "Live Idol · foto del gruppo attribuita nella scheda",
    "width": 1000,
    "height": 653
  },
  {
    "name": "豆柴の大群",
    "category": "groups",
    "photo": "https://liveidol.blog/wp-content/uploads/2025/05/GsBCqYya8AAMUS_-1.jpg",
    "source": "https://liveidol.blog/group-profile/mameshiba_96/",
    "sourceLabel": "Live Idol · foto del gruppo attribuita nella scheda",
    "width": 1000,
    "height": 667
  },
  {
    "name": "メノニューイヤー",
    "category": "groups",
    "photo": "https://liveidol.blog/wp-content/uploads/2026/08/HLVuiPfboAAADXC.webp",
    "source": "https://liveidol.blog/group-profile/menonew_senden/",
    "sourceLabel": "Live Idol · foto del gruppo attribuita nella scheda",
    "width": 1200,
    "height": 848
  },
  {
    "name": "のんふぃく！",
    "category": "groups",
    "photo": "https://liveidol.blog/wp-content/uploads/2026/06/HJe1xr_bQAAA_hg-1.jpg",
    "source": "https://liveidol.blog/group-profile/nonfic_official/",
    "sourceLabel": "Live Idol · foto del gruppo attribuita nella scheda",
    "width": 1200,
    "height": 800
  },
  {
    "name": "SWEET STEADY",
    "category": "groups",
    "photo": "https://liveidol.blog/wp-content/uploads/2026/07/HM6bU3NagAEuUsk.jpg",
    "source": "https://liveidol.blog/group-profile/sweet_steady/",
    "sourceLabel": "Live Idol · foto del gruppo attribuita nella scheda",
    "width": 1200,
    "height": 900
  },
  {
    "name": "iON!",
    "category": "groups",
    "photo": "https://liveidol.blog/wp-content/uploads/2026/01/iON.jpg",
    "source": "https://liveidol.blog/group-profile/ion_idol_/",
    "sourceLabel": "Live Idol · foto del gruppo attribuita nella scheda",
    "width": 720,
    "height": 480
  },
  {
    "name": "夜光性アミューズ",
    "category": "groups",
    "photo": "https://liveidol.blog/wp-content/uploads/2026/06/HJkeUbBaYAAMfpl.jpg",
    "source": "https://liveidol.blog/group-profile/yoruamiofficial/",
    "sourceLabel": "Live Idol · foto del gruppo attribuita nella scheda",
    "width": 1200,
    "height": 800
  },
  {
    "name": "スリジエ",
    "category": "groups",
    "photo": "https://liveidol.blog/wp-content/uploads/2026/09/HRDWYBDbgAAKQwx.webp",
    "source": "https://liveidol.blog/group-profile/cerisier_rev/",
    "sourceLabel": "Live Idol · foto del gruppo attribuita nella scheda",
    "width": 1200,
    "height": 855
  },
  {
    "name": "TENRIN",
    "category": "groups",
    "photo": "https://liveidol.blog/wp-content/uploads/2026/06/HIhCsinawAErnT7.jpg",
    "source": "https://liveidol.blog/group-profile/tenrin_official/",
    "sourceLabel": "Live Idol · foto del gruppo attribuita nella scheda",
    "width": 1200,
    "height": 800
  },
  {
    "name": "GILTY×GILTY",
    "category": "groups",
    "photo": "https://liveidol.blog/wp-content/uploads/2026/02/Fs3loe8aEAY6M_G.jpg",
    "source": "https://liveidol.blog/group-profile/giltyxgilty/",
    "sourceLabel": "Live Idol · foto del gruppo attribuita nella scheda",
    "width": 1200,
    "height": 800
  },
  {
    "name": "ZUTTOMOTTO",
    "category": "groups",
    "photo": "https://liveidol.blog/wp-content/uploads/2026/06/HDXc9LTacAAnI_n.jpg",
    "source": "https://liveidol.blog/group-profile/zuttomoofficial/",
    "sourceLabel": "Live Idol · foto del gruppo attribuita nella scheda",
    "width": 1200,
    "height": 900
  },
  {
    "name": "アキシブproject",
    "category": "groups",
    "photo": "https://liveidol.blog/wp-content/uploads/2026/01/AkishibuProject.jpg",
    "source": "https://liveidol.blog/group-profile/akishibuproject/",
    "sourceLabel": "Live Idol · foto del gruppo attribuita nella scheda",
    "width": 720,
    "height": 479
  },
  {
    "name": "AdamLilith",
    "category": "groups",
    "photo": "https://liveidol.blog/wp-content/uploads/2026/01/Adamth_official.jpg",
    "source": "https://liveidol.blog/group-profile/adamth_official/",
    "sourceLabel": "Live Idol · foto del gruppo attribuita nella scheda",
    "width": 720,
    "height": 479
  },
  {
    "name": "RAY",
    "category": "groups",
    "photo": "https://liveidol.blog/wp-content/uploads/2026/04/HBMj0xVaEAALxmG.jpg",
    "source": "https://liveidol.blog/group-profile/_ray_world/",
    "sourceLabel": "Live Idol · foto del gruppo attribuita nella scheda",
    "width": 1200,
    "height": 800
  },
  {
    "name": "JamsCollection",
    "category": "groups",
    "photo": "https://liveidol.blog/wp-content/uploads/2026/01/JamsCollection.jpg",
    "source": "https://liveidol.blog/group-profile/jamscollection/",
    "sourceLabel": "Live Idol · foto del gruppo attribuita nella scheda",
    "width": 720,
    "height": 479
  },
  {
    "name": "FES☆TIVE",
    "category": "groups",
    "photo": "https://liveidol.blog/wp-content/uploads/2026/01/FES☆TIVE.jpg",
    "source": "https://liveidol.blog/group-profile/festiveofficial/",
    "sourceLabel": "Live Idol · foto del gruppo attribuita nella scheda",
    "width": 720,
    "height": 479
  },
  {
    "name": "MyDearDarlin'",
    "category": "groups",
    "photo": "https://liveidol.blog/wp-content/uploads/2026/10/HUBCrXYaIAA9O72.webp",
    "source": "https://liveidol.blog/group-profile/mydear_official/",
    "sourceLabel": "Live Idol · foto del gruppo attribuita nella scheda",
    "width": 1200,
    "height": 800
  },
  {
    "name": "I MY ME MINE",
    "category": "groups",
    "photo": "https://liveidol.blog/wp-content/uploads/2026/02/G9bC-hJaIAA3meb.jpg",
    "source": "https://liveidol.blog/group-profile/immm_official/",
    "sourceLabel": "Live Idol · foto del gruppo attribuita nella scheda",
    "width": 1200,
    "height": 749
  },
  {
    "name": "Bunny La Crew",
    "category": "groups",
    "photo": "https://liveidol.blog/wp-content/uploads/2026/02/G_l7KXfa4AAjZOs.jpg",
    "source": "https://liveidol.blog/group-profile/bunnylacrew/",
    "sourceLabel": "Live Idol · foto del gruppo attribuita nella scheda",
    "width": 1200,
    "height": 806
  },
  {
    "name": "NORMiL",
    "category": "groups",
    "photo": "https://liveidol.blog/wp-content/uploads/2026/08/HOe3TlnbYAALSo5.jpg",
    "source": "https://liveidol.blog/group-profile/normil_official/",
    "sourceLabel": "Live Idol · foto del gruppo attribuita nella scheda",
    "width": 1200,
    "height": 800
  },
  {
    "name": "しろもん",
    "category": "groups",
    "photo": "https://liveidol.blog/wp-content/uploads/2026/04/G_QZeMVbcAABrgu.jpg",
    "source": "https://liveidol.blog/group-profile/shiromon_idol/",
    "sourceLabel": "Live Idol · foto del gruppo attribuita nella scheda",
    "width": 1200,
    "height": 800
  },
  {
    "name": "Blossom Garden",
    "category": "groups",
    "photo": "https://liveidol.blog/wp-content/uploads/2026/09/HLlGpjbagAArUXH.webp",
    "source": "https://liveidol.blog/group-profile/blossomgarden_/",
    "sourceLabel": "Live Idol · foto del gruppo attribuita nella scheda",
    "width": 1200,
    "height": 802
  },
  {
    "name": "ICECREAM SCREAM",
    "category": "groups",
    "photo": "https://liveidol.blog/wp-content/uploads/2026/03/HAOUIV-aMAAy1C_.jpg",
    "source": "https://liveidol.blog/group-profile/official_icsc/",
    "sourceLabel": "Live Idol · foto del gruppo attribuita nella scheda",
    "width": 1200,
    "height": 800
  },
  {
    "name": "SEKAIE☆",
    "category": "groups",
    "photo": "https://liveidol.blog/wp-content/uploads/2026/05/HGWbo3gbEAEDbCD.jpg",
    "source": "https://liveidol.blog/group-profile/sekaieofficial/",
    "sourceLabel": "Live Idol · foto del gruppo attribuita nella scheda",
    "width": 1200,
    "height": 800
  },
  {
    "name": "PassCode",
    "category": "groups",
    "photo": "https://liveidol.blog/wp-content/uploads/2025/03/PassCode_art202108.webp",
    "source": "https://liveidol.blog/group-profile/passcodeo/",
    "sourceLabel": "Live Idol · foto del gruppo attribuita nella scheda",
    "width": 640,
    "height": 427
  },
  {
    "name": "yosugala",
    "category": "groups",
    "photo": "https://liveidol.blog/wp-content/uploads/2024/12/yosugala.jpg",
    "source": "https://liveidol.blog/group-profile/yosugala_info/",
    "sourceLabel": "Live Idol · foto del gruppo attribuita nella scheda",
    "width": 600,
    "height": 400
  },
  {
    "name": "Kolokol",
    "category": "groups",
    "photo": "https://liveidol.blog/wp-content/uploads/2026/02/G9Tf6kjaUAAVh8c.jpg",
    "source": "https://liveidol.blog/group-profile/klkl_official/",
    "sourceLabel": "Live Idol · foto del gruppo attribuita nella scheda",
    "width": 1200,
    "height": 800
  },
  {
    "name": "Axelight",
    "category": "groups",
    "photo": "https://liveidol.blog/wp-content/uploads/2026/02/G0e8lI5asAA46NP.jpg",
    "source": "https://liveidol.blog/group-profile/axlt_official/",
    "sourceLabel": "Live Idol · foto del gruppo attribuita nella scheda",
    "width": 1200,
    "height": 800
  },
  {
    "name": "BANZAI JAPAN",
    "category": "groups",
    "photo": "https://liveidol.blog/wp-content/uploads/2026/02/GIjXmOhbEAEmsa4.jpg",
    "source": "https://liveidol.blog/group-profile/banzaijapanpjt/",
    "sourceLabel": "Live Idol · foto del gruppo attribuita nella scheda",
    "width": 1200,
    "height": 855
  },
  {
    "name": "アンスリューム",
    "category": "groups",
    "photo": "https://liveidol.blog/wp-content/uploads/2026/01/anthurium.jpg",
    "source": "https://liveidol.blog/group-profile/anthurium0317/",
    "sourceLabel": "Live Idol · foto del gruppo attribuita nella scheda",
    "width": 720,
    "height": 960
  },
  {
    "name": "キングサリ",
    "category": "groups",
    "photo": "https://liveidol.blog/wp-content/uploads/2026/01/kingsari.jpg",
    "source": "https://liveidol.blog/group-profile/kingsari_0430/",
    "sourceLabel": "Live Idol · foto del gruppo attribuita nella scheda",
    "width": 720,
    "height": 479
  },
  {
    "name": "ラナキュラ",
    "category": "groups",
    "photo": "https://liveidol.blog/wp-content/uploads/2026/02/G-DhIFCaIAAn4yJ.jpg",
    "source": "https://liveidol.blog/group-profile/ranaqura_info/",
    "sourceLabel": "Live Idol · foto del gruppo attribuita nella scheda",
    "width": 1200,
    "height": 800
  },
  {
    "name": "プランクスターズ",
    "category": "groups",
    "photo": "https://liveidol.blog/wp-content/uploads/2026/04/HFX4v2Wa8AIIuV7.jpg",
    "source": "https://liveidol.blog/group-profile/planckstars/",
    "sourceLabel": "Live Idol · foto del gruppo attribuita nella scheda",
    "width": 1200,
    "height": 805
  },
  {
    "name": "まねきケチャ",
    "category": "groups",
    "photo": "https://liveidol.blog/wp-content/uploads/2026/05/HDrYznzbEAAA_z5.jpg",
    "source": "https://liveidol.blog/group-profile/maneki_kecak_x/",
    "sourceLabel": "Live Idol · foto del gruppo attribuita nella scheda",
    "width": 1200,
    "height": 895
  },
  {
    "name": "Devil ANTHEM.",
    "category": "groups",
    "photo": "https://liveidol.blog/wp-content/uploads/2026/01/devilanthem.jpg",
    "source": "https://liveidol.blog/group-profile/devilanthem/",
    "sourceLabel": "Live Idol · foto del gruppo attribuita nella scheda",
    "width": 720,
    "height": 720
  },
  {
    "name": "AVAM",
    "category": "groups",
    "photo": "https://liveidol.blog/wp-content/uploads/2025/10/AVAM.jpg",
    "source": "https://liveidol.blog/group-profile/avam_official/",
    "sourceLabel": "Live Idol · foto del gruppo attribuita nella scheda",
    "width": 720,
    "height": 480
  },
  {
    "name": "INUWASI",
    "category": "groups",
    "photo": "https://liveidol.blog/wp-content/uploads/2026/06/HKSk-4RboAA5Zo3.jpg",
    "source": "https://liveidol.blog/group-profile/inuwasi_o/",
    "sourceLabel": "Live Idol · foto del gruppo attribuita nella scheda",
    "width": 1200,
    "height": 800
  },
  {
    "name": "fav me",
    "category": "groups",
    "photo": "https://liveidol.blog/wp-content/uploads/2026/01/fav_me_.jpg",
    "source": "https://liveidol.blog/group-profile/_fav_me_/",
    "sourceLabel": "Live Idol · foto del gruppo attribuita nella scheda",
    "width": 720,
    "height": 480
  },
  {
    "name": "log you",
    "category": "groups",
    "photo": "https://liveidol.blog/wp-content/uploads/2026/02/G8nj1aKagAAkkp7.jpg",
    "source": "https://liveidol.blog/group-profile/_log_you_/",
    "sourceLabel": "Live Idol · foto del gruppo attribuita nella scheda",
    "width": 1200,
    "height": 800
  },
  {
    "name": "myojou",
    "category": "groups",
    "photo": "https://liveidol.blog/wp-content/uploads/2026/05/HATwiK6bEAADCpt.jpg",
    "source": "https://liveidol.blog/group-profile/info_myojou/",
    "sourceLabel": "Live Idol · foto del gruppo attribuita nella scheda",
    "width": 1200,
    "height": 800
  },
  {
    "name": "MORE STAR",
    "category": "groups",
    "photo": "https://liveidol.blog/wp-content/uploads/2026/02/HAOYn3kbQAA1R4j.jpg",
    "source": "https://liveidol.blog/group-profile/more_star_/",
    "sourceLabel": "Live Idol · foto del gruppo attribuita nella scheda",
    "width": 900,
    "height": 1200
  },
  {
    "name": "Lion net girl",
    "category": "groups",
    "photo": "https://liveidol.blog/wp-content/uploads/2026/06/HKSFKFfbsAAgVoF.jpg",
    "source": "https://liveidol.blog/group-profile/lng_info/",
    "sourceLabel": "Live Idol · foto del gruppo attribuita nella scheda",
    "width": 1199,
    "height": 798
  },
  {
    "name": "XOXO EXTREME",
    "category": "groups",
    "photo": "https://liveidol.blog/wp-content/uploads/2026/03/HCYkKqfawAAytj9.jpg",
    "source": "https://liveidol.blog/group-profile/xoxo_extreme/",
    "sourceLabel": "Live Idol · foto del gruppo attribuita nella scheda",
    "width": 1200,
    "height": 1006
  },
  {
    "name": "SUPER REPLiCA",
    "category": "groups",
    "photo": "https://liveidol.blog/wp-content/uploads/2026/03/GvPaoHTbEAAzCLd.jpg",
    "source": "https://liveidol.blog/group-profile/super_replica/",
    "sourceLabel": "Live Idol · foto del gruppo attribuita nella scheda",
    "width": 1200,
    "height": 800
  },
  {
    "name": "SOMOSOMO",
    "category": "groups",
    "photo": "https://liveidol.blog/wp-content/uploads/2026/10/HS-LinjbcAAbFPS.webp",
    "source": "https://liveidol.blog/group-profile/somo2_official/",
    "sourceLabel": "Live Idol · foto del gruppo attribuita nella scheda",
    "width": 1200,
    "height": 848
  },
  {
    "name": "AdFicTioN",
    "category": "groups",
    "photo": "https://liveidol.blog/wp-content/uploads/2026/03/Gu8TCs5a0AA7uUI.jpg",
    "source": "https://liveidol.blog/group-profile/info_adfiction/",
    "sourceLabel": "Live Idol · foto del gruppo attribuita nella scheda",
    "width": 1200,
    "height": 800
  },
  {
    "name": "9DayzGlitchClubTokyo",
    "category": "groups",
    "photo": "https://liveidol.blog/wp-content/uploads/2026/01/9DayzGlitchClubTokyo.jpg",
    "source": "https://liveidol.blog/group-profile/9dayzgct/",
    "sourceLabel": "Live Idol · foto del gruppo attribuita nella scheda",
    "width": 720,
    "height": 480
  },
  {
    "name": "AKIARIM",
    "category": "groups",
    "photo": "https://liveidol.blog/wp-content/uploads/2026/03/HCKNQhYagAADnnB.jpg",
    "source": "https://liveidol.blog/group-profile/akiarim/",
    "sourceLabel": "Live Idol · foto del gruppo attribuita nella scheda",
    "width": 1200,
    "height": 900
  },
  {
    "name": "AIBECK",
    "category": "groups",
    "photo": "https://liveidol.blog/wp-content/uploads/2026/02/G_Vt_AMboAAIg1b.jpg",
    "source": "https://liveidol.blog/group-profile/aibeck_/",
    "sourceLabel": "Live Idol · foto del gruppo attribuita nella scheda",
    "width": 800,
    "height": 1200
  },
  {
    "name": "LEIWAN",
    "category": "groups",
    "photo": "https://liveidol.blog/wp-content/uploads/2026/02/GzAY66NboAYUGMv.jpg",
    "source": "https://liveidol.blog/group-profile/leiwan01/",
    "sourceLabel": "Live Idol · foto del gruppo attribuita nella scheda",
    "width": 1200,
    "height": 848
  },
  {
    "name": "O-VER-KiLL",
    "category": "groups",
    "photo": "https://liveidol.blog/wp-content/uploads/2026/06/HKYWbL3a8AElA6L.jpg",
    "source": "https://liveidol.blog/group-profile/overkill_1008/",
    "sourceLabel": "Live Idol · foto del gruppo attribuita nella scheda",
    "width": 900,
    "height": 675
  },
  {
    "name": "MAGMAZ",
    "category": "groups",
    "photo": "https://liveidol.blog/wp-content/uploads/2026/02/G4leIGUbAAEcRLc.jpg",
    "source": "https://liveidol.blog/group-profile/magmaz_jp/",
    "sourceLabel": "Live Idol · foto del gruppo attribuita nella scheda",
    "width": 1200,
    "height": 800
  },
  {
    "name": "AZ-ON",
    "category": "groups",
    "photo": "https://liveidol.blog/wp-content/uploads/2026/05/HB6er5qaQAA3sXo.jpg",
    "source": "https://liveidol.blog/group-profile/azon_osaka/",
    "sourceLabel": "Live Idol · foto del gruppo attribuita nella scheda",
    "width": 1200,
    "height": 800
  },
  {
    "name": "Chicken Blow The Idol",
    "category": "groups",
    "photo": "https://liveidol.blog/wp-content/uploads/2026/03/G1s2YjnaAAMpzWH.jpg",
    "source": "https://liveidol.blog/group-profile/chicken__idol/",
    "sourceLabel": "Live Idol · foto del gruppo attribuita nella scheda",
    "width": 1200,
    "height": 810
  },
  {
    "name": "NEO JAPONISM",
    "category": "groups",
    "photo": "https://liveidol.blog/wp-content/uploads/2025/04/GnXF88GaQAEMaPh-1.jpg",
    "source": "https://liveidol.blog/group-profile/neojaponisminfo/",
    "sourceLabel": "Live Idol · foto del gruppo attribuita nella scheda",
    "width": 1000,
    "height": 625
  },
  {
    "name": "BLUEGOATS",
    "category": "groups",
    "photo": "https://liveidol.blog/wp-content/uploads/2026/02/G_1AYmwbUAMqLkN.jpg",
    "source": "https://liveidol.blog/group-profile/info_bluegoats/",
    "sourceLabel": "Live Idol · foto del gruppo attribuita nella scheda",
    "width": 1200,
    "height": 758
  },
  {
    "name": "YOLOZ",
    "category": "groups",
    "photo": "https://liveidol.blog/wp-content/uploads/2026/02/G_BlRouXsAAp0dw.jpg",
    "source": "https://liveidol.blog/group-profile/yoloz_info/",
    "sourceLabel": "Live Idol · foto del gruppo attribuita nella scheda",
    "width": 1200,
    "height": 800
  },
  {
    "name": "uijin",
    "category": "groups",
    "photo": "https://liveidol.blog/wp-content/uploads/2026/02/GAzP6E6bgAAMI0K.jpg",
    "source": "https://liveidol.blog/group-profile/uijin_2022/",
    "sourceLabel": "Live Idol · foto del gruppo attribuita nella scheda",
    "width": 1200,
    "height": 800
  },
  {
    "name": "PIGGS",
    "category": "groups",
    "photo": "https://liveidol.blog/wp-content/uploads/2026/01/PIGGS.jpg",
    "source": "https://liveidol.blog/group-profile/piggs_idol/",
    "sourceLabel": "Live Idol · foto del gruppo attribuita nella scheda",
    "width": 720,
    "height": 540
  },
  {
    "name": "GANG PARADE",
    "category": "groups",
    "photo": "https://liveidol.blog/wp-content/uploads/2026/01/GANG-PARADE.jpg",
    "source": "https://liveidol.blog/group-profile/gang_parade/",
    "sourceLabel": "Live Idol · foto del gruppo attribuita nella scheda",
    "width": 720,
    "height": 479
  },
  {
    "name": "CHEMICAL X",
    "category": "groups",
    "photo": "https://liveidol.blog/wp-content/uploads/2026/04/HFcNpODbUAAOGyh.jpg",
    "source": "https://liveidol.blog/group-profile/chemicalx_jp/",
    "sourceLabel": "Live Idol · foto del gruppo attribuita nella scheda",
    "width": 1200,
    "height": 800
  },
  {
    "name": "Malcolm Mask McLaren",
    "category": "groups",
    "photo": "https://liveidol.blog/wp-content/uploads/2026/02/G6mjKJ_aYAIFspC.jpg",
    "source": "https://liveidol.blog/group-profile/mmm_core/",
    "sourceLabel": "Live Idol · foto del gruppo attribuita nella scheda",
    "width": 1200,
    "height": 800
  },
  {
    "name": "The Grateful a MogAAAz",
    "category": "groups",
    "photo": "https://liveidol.blog/wp-content/uploads/2026/03/HC4qZlrbYAAUioe.jpg",
    "source": "https://liveidol.blog/group-profile/mogaaaz/",
    "sourceLabel": "Live Idol · foto del gruppo attribuita nella scheda",
    "width": 1108,
    "height": 1108
  },
  {
    "name": "GANGDEMIC",
    "category": "groups",
    "photo": "https://liveidol.blog/wp-content/uploads/2026/02/G5tT4d5bMAAHtcS.jpg",
    "source": "https://liveidol.blog/group-profile/gangdemic_info/",
    "sourceLabel": "Live Idol · foto del gruppo attribuita nella scheda",
    "width": 1200,
    "height": 831
  },
  {
    "name": "EMPATHY",
    "category": "groups",
    "photo": "https://liveidol.blog/wp-content/uploads/2026/02/G_66uBSacAA180s.jpg",
    "source": "https://liveidol.blog/group-profile/empathy_jp/",
    "sourceLabel": "Live Idol · foto del gruppo attribuita nella scheda",
    "width": 1200,
    "height": 859
  },
  {
    "name": "Maze",
    "category": "groups",
    "photo": "https://liveidol.blog/wp-content/uploads/2026/02/GwDq4K9bgAAPD98.jpg",
    "source": "https://liveidol.blog/group-profile/maze_idol/",
    "sourceLabel": "Live Idol · foto del gruppo attribuita nella scheda",
    "width": 1200,
    "height": 800
  },
  {
    "name": "Payrin's",
    "category": "groups",
    "photo": "https://liveidol.blog/wp-content/uploads/2026/02/G-3mpo4W8AAtciB.jpg",
    "source": "https://liveidol.blog/group-profile/payrinsofficial/",
    "sourceLabel": "Live Idol · foto del gruppo attribuita nella scheda",
    "width": 1200,
    "height": 800
  },
  {
    "name": "月足 天音",
    "category": "music",
    "photo": "https://fruitszipper.asobisystem.com/static/fcopen/fanplakit/artist/fruitszipper_VW1kjr8kbn/img/feature/profile/6c3c3ca51c377fedf36c658368f5d45c.jpg",
    "source": "https://fruitszipper.asobisystem.com/news/2/",
    "sourceLabel": "Profilo ufficiale · FRUITS ZIPPER",
    "width": 1200,
    "height": 1800
  },
  {
    "name": "鎮西 寿々歌",
    "category": "music",
    "photo": "https://fruitszipper.asobisystem.com/static/fcopen/fanplakit/artist/fruitszipper_VW1kjr8kbn/img/feature/profile/c36e23aadeb74c96275ba7c8f471c02b.jpg",
    "source": "https://fruitszipper.asobisystem.com/news/2/",
    "sourceLabel": "Profilo ufficiale · FRUITS ZIPPER",
    "width": 1200,
    "height": 1800
  },
  {
    "name": "櫻井 優衣",
    "category": "music",
    "photo": "https://fruitszipper.asobisystem.com/static/fcopen/fanplakit/artist/fruitszipper_VW1kjr8kbn/img/feature/profile/0b838a3c6e21b8de01d0972ad0a7f85e.jpg",
    "source": "https://fruitszipper.asobisystem.com/news/2/",
    "sourceLabel": "Profilo ufficiale · FRUITS ZIPPER",
    "width": 1200,
    "height": 1800
  },
  {
    "name": "仲川 瑠夏",
    "category": "music",
    "photo": "https://fruitszipper.asobisystem.com/static/fcopen/fanplakit/artist/fruitszipper_VW1kjr8kbn/img/feature/profile/cdcfef03dc399a5cff68f597079b2dd5.jpg",
    "source": "https://fruitszipper.asobisystem.com/news/2/",
    "sourceLabel": "Profilo ufficiale · FRUITS ZIPPER",
    "width": 1200,
    "height": 1800
  },
  {
    "name": "真中 まな",
    "category": "music",
    "photo": "https://fruitszipper.asobisystem.com/static/fcopen/fanplakit/artist/fruitszipper_VW1kjr8kbn/img/feature/profile/8e521d3da24be35a13a3284d5d0ed3dd.jpg",
    "source": "https://fruitszipper.asobisystem.com/news/2/",
    "sourceLabel": "Profilo ufficiale · FRUITS ZIPPER",
    "width": 1200,
    "height": 1800
  },
  {
    "name": "松本 かれん",
    "category": "music",
    "photo": "https://fruitszipper.asobisystem.com/static/fcopen/fanplakit/artist/fruitszipper_VW1kjr8kbn/img/feature/profile/ba14c0becfb857f05ecad683fc9f8ff7.jpg",
    "source": "https://fruitszipper.asobisystem.com/news/2/",
    "sourceLabel": "Profilo ufficiale · FRUITS ZIPPER",
    "width": 1200,
    "height": 1800
  },
  {
    "name": "早瀬 ノエル",
    "category": "music",
    "photo": "https://fruitszipper.asobisystem.com/static/fcopen/fanplakit/artist/fruitszipper_VW1kjr8kbn/img/feature/profile/940d6e272d323ea4b5d988484917c5d5.jpg",
    "source": "https://fruitszipper.asobisystem.com/news/2/",
    "sourceLabel": "Profilo ufficiale · FRUITS ZIPPER",
    "width": 1200,
    "height": 1800
  },
  {
    "name": "桐原美月",
    "category": "music",
    "photo": "https://candytune.asobisystem.com/static/fcopen/contents/upimg/666/d8a9e88223497bf216d2e7860f405ea5.jpg",
    "source": "https://candytune.asobisystem.com/news/2/",
    "sourceLabel": "Profilo ufficiale · CANDY TUNE",
    "width": 1200,
    "height": 1600
  },
  {
    "name": "福山梨乃",
    "category": "music",
    "photo": "https://candytune.asobisystem.com/static/fcopen/contents/upimg/666/7face7dc28b569fcdb62adffba996e47.jpg",
    "source": "https://candytune.asobisystem.com/news/2/",
    "sourceLabel": "Profilo ufficiale · CANDY TUNE",
    "width": 1200,
    "height": 1600
  },
  {
    "name": "南なつ",
    "category": "music",
    "photo": "https://candytune.asobisystem.com/static/fcopen/contents/upimg/666/0d019ebb5f01befecb7a90aa19c452da.jpg",
    "source": "https://candytune.asobisystem.com/news/2/",
    "sourceLabel": "Profilo ufficiale · CANDY TUNE",
    "width": 1200,
    "height": 1600
  },
  {
    "name": "立花琴未",
    "category": "music",
    "photo": "https://candytune.asobisystem.com/static/fcopen/contents/upimg/666/8814600e12e8405bdc287940ee45a267.jpg",
    "source": "https://candytune.asobisystem.com/news/2/",
    "sourceLabel": "Profilo ufficiale · CANDY TUNE",
    "width": 1200,
    "height": 1600
  },
  {
    "name": "小川奈々子",
    "category": "music",
    "photo": "https://candytune.asobisystem.com/static/fcopen/contents/upimg/666/f64159fbeb0a319c6aee87db3dedc562.jpg",
    "source": "https://candytune.asobisystem.com/news/2/",
    "sourceLabel": "Profilo ufficiale · CANDY TUNE",
    "width": 1200,
    "height": 1600
  },
  {
    "name": "村川緋杏",
    "category": "music",
    "photo": "https://candytune.asobisystem.com/static/fcopen/contents/upimg/666/62457d5af84fd4d8a593a4973520264b.jpg",
    "source": "https://candytune.asobisystem.com/news/2/",
    "sourceLabel": "Profilo ufficiale · CANDY TUNE",
    "width": 1200,
    "height": 1600
  },
  {
    "name": "宮野静",
    "category": "music",
    "photo": "https://candytune.asobisystem.com/static/fcopen/contents/upimg/666/1c7b538a4ed52d95c2b49cfa2fbf87cd.jpg",
    "source": "https://candytune.asobisystem.com/news/2/",
    "sourceLabel": "Profilo ufficiale · CANDY TUNE",
    "width": 1200,
    "height": 1600
  },
  {
    "name": "Saho Iwatate",
    "category": "music",
    "photo": "https://d2r1lkk9i7row.cloudfront.net/mobile/member/83100622.jpg",
    "source": "https://www.akb48.co.jp/about/members/detail/mid-110/",
    "sourceLabel": "AKB48 · ritratto ufficiale nominativo",
    "width": 1200,
    "height": 1200
  },
  {
    "name": "Seina Fukuoka",
    "category": "music",
    "photo": "https://d2r1lkk9i7row.cloudfront.net/mobile/member/83100790.jpg",
    "source": "https://www.akb48.co.jp/about/members/detail/mid-152/",
    "sourceLabel": "AKB48 · ritratto ufficiale nominativo",
    "width": 1200,
    "height": 1200
  },
  {
    "name": "Yui Oguri",
    "category": "music",
    "photo": "https://d2r1lkk9i7row.cloudfront.net/mobile/member/83100816.jpg",
    "source": "https://www.akb48.co.jp/about/members/detail/mid-180/",
    "sourceLabel": "AKB48 · ritratto ufficiale nominativo",
    "width": 1200,
    "height": 1200
  },
  {
    "name": "Yurina Gyoten",
    "category": "music",
    "photo": "https://d2r1lkk9i7row.cloudfront.net/mobile/member/83100840.jpg",
    "source": "https://www.akb48.co.jp/about/members/detail/mid-204/",
    "sourceLabel": "AKB48 · ritratto ufficiale nominativo",
    "width": 1200,
    "height": 1200
  },
  {
    "name": "Narumi Kuranoo",
    "category": "music",
    "photo": "https://d2r1lkk9i7row.cloudfront.net/mobile/member/83100846.jpg",
    "source": "https://www.akb48.co.jp/about/members/detail/mid-210/",
    "sourceLabel": "AKB48 · ritratto ufficiale nominativo",
    "width": 1200,
    "height": 1200
  },
  {
    "name": "Hiyuka Sakagawa",
    "category": "music",
    "photo": "https://d2r1lkk9i7row.cloudfront.net/mobile/member/83100997.jpg",
    "source": "https://www.akb48.co.jp/about/members/detail/mid-1073/",
    "sourceLabel": "AKB48 · ritratto ufficiale nominativo",
    "width": 1200,
    "height": 1200
  },
  {
    "name": "Miu Shitao",
    "category": "music",
    "photo": "https://d2r1lkk9i7row.cloudfront.net/mobile/member/83100838.jpg",
    "source": "https://www.akb48.co.jp/about/members/detail/mid-202/",
    "sourceLabel": "AKB48 · ritratto ufficiale nominativo",
    "width": 1200,
    "height": 1200
  },
  {
    "name": "Ayane Takahashi",
    "category": "music",
    "photo": "https://d2r1lkk9i7row.cloudfront.net/mobile/member/83100814.jpg",
    "source": "https://www.akb48.co.jp/about/members/detail/mid-178/",
    "sourceLabel": "AKB48 · ritratto ufficiale nominativo",
    "width": 1200,
    "height": 1200
  },
  {
    "name": "Remi Tokunaga",
    "category": "music",
    "photo": "https://d2r1lkk9i7row.cloudfront.net/mobile/member/83100993.jpg",
    "source": "https://www.akb48.co.jp/about/members/detail/mid-1069/",
    "sourceLabel": "AKB48 · ritratto ufficiale nominativo",
    "width": 1200,
    "height": 1200
  },
  {
    "name": "Serika Nagano",
    "category": "music",
    "photo": "https://d2r1lkk9i7row.cloudfront.net/mobile/member/83100828.jpg",
    "source": "https://www.akb48.co.jp/about/members/detail/mid-192/",
    "sourceLabel": "AKB48 · ritratto ufficiale nominativo",
    "width": 1200,
    "height": 1200
  },
  {
    "name": "Haruna Hashimoto",
    "category": "music",
    "photo": "https://d2r1lkk9i7row.cloudfront.net/mobile/member/83100824.jpg",
    "source": "https://www.akb48.co.jp/about/members/detail/mid-183/",
    "sourceLabel": "AKB48 · ritratto ufficiale nominativo",
    "width": 1200,
    "height": 1200
  },
  {
    "name": "Erii Chiba",
    "category": "music",
    "photo": "https://d2r1lkk9i7row.cloudfront.net/mobile/member/83100927.jpg",
    "source": "https://www.akb48.co.jp/about/members/detail/mid-289/",
    "sourceLabel": "AKB48 · ritratto ufficiale nominativo",
    "width": 1200,
    "height": 1200
  },
  {
    "name": "Haruka Kurosu",
    "category": "music",
    "photo": "https://d2r1lkk9i7row.cloudfront.net/mobile/member/83100937.jpg",
    "source": "https://www.akb48.co.jp/about/members/detail/mid-1010/",
    "sourceLabel": "AKB48 · ritratto ufficiale nominativo",
    "width": 1200,
    "height": 1200
  },
  {
    "name": "Ayami Nagatomo",
    "category": "music",
    "photo": "https://d2r1lkk9i7row.cloudfront.net/mobile/member/83100943.jpg",
    "source": "https://www.akb48.co.jp/about/members/detail/mid-1016/",
    "sourceLabel": "AKB48 · ritratto ufficiale nominativo",
    "width": 1200,
    "height": 1200
  },
  {
    "name": "Orin Muto",
    "category": "music",
    "photo": "https://d2r1lkk9i7row.cloudfront.net/mobile/member/83100949.jpg",
    "source": "https://www.akb48.co.jp/about/members/detail/mid-1022/",
    "sourceLabel": "AKB48 · ritratto ufficiale nominativo",
    "width": 1200,
    "height": 1200
  },
  {
    "name": "Mizuki Yamauchi",
    "category": "music",
    "photo": "https://d2r1lkk9i7row.cloudfront.net/mobile/member/83100951.jpg",
    "source": "https://www.akb48.co.jp/about/members/detail/mid-1024/",
    "sourceLabel": "AKB48 · ritratto ufficiale nominativo",
    "width": 1200,
    "height": 1200
  },
  {
    "name": "Suzuha Yamane",
    "category": "music",
    "photo": "https://d2r1lkk9i7row.cloudfront.net/mobile/member/83100952.jpg",
    "source": "https://www.akb48.co.jp/about/members/detail/mid-1025/",
    "sourceLabel": "AKB48 · ritratto ufficiale nominativo",
    "width": 1200,
    "height": 1200
  },
  {
    "name": "Yuki Ota",
    "category": "music",
    "photo": "https://d2r1lkk9i7row.cloudfront.net/mobile/member/83100998.jpg",
    "source": "https://www.akb48.co.jp/about/members/detail/mid-1074/",
    "sourceLabel": "AKB48 · ritratto ufficiale nominativo",
    "width": 1200,
    "height": 1200
  },
  {
    "name": "Airi Sato",
    "category": "music",
    "photo": "https://d2r1lkk9i7row.cloudfront.net/mobile/member/83101000.jpg",
    "source": "https://www.akb48.co.jp/about/members/detail/mid-1076/",
    "sourceLabel": "AKB48 · ritratto ufficiale nominativo",
    "width": 1200,
    "height": 1200
  },
  {
    "name": "Eriko Hashimoto",
    "category": "music",
    "photo": "https://d2r1lkk9i7row.cloudfront.net/mobile/member/83101001.jpg",
    "source": "https://www.akb48.co.jp/about/members/detail/mid-1077/",
    "sourceLabel": "AKB48 · ritratto ufficiale nominativo",
    "width": 1200,
    "height": 1200
  },
  {
    "name": "Nozomi Hatakeyama",
    "category": "music",
    "photo": "https://d2r1lkk9i7row.cloudfront.net/mobile/member/83101003.jpg",
    "source": "https://www.akb48.co.jp/about/members/detail/mid-1079/",
    "sourceLabel": "AKB48 · ritratto ufficiale nominativo",
    "width": 1200,
    "height": 1200
  },
  {
    "name": "Yuki Hirata",
    "category": "music",
    "photo": "https://d2r1lkk9i7row.cloudfront.net/mobile/member/83101004.jpg",
    "source": "https://www.akb48.co.jp/about/members/detail/mid-1080/",
    "sourceLabel": "AKB48 · ritratto ufficiale nominativo",
    "width": 1200,
    "height": 1200
  },
  {
    "name": "Moka Hotei",
    "category": "music",
    "photo": "https://d2r1lkk9i7row.cloudfront.net/mobile/member/83101005.jpg",
    "source": "https://www.akb48.co.jp/about/members/detail/mid-1081/",
    "sourceLabel": "AKB48 · ritratto ufficiale nominativo",
    "width": 1200,
    "height": 1200
  },
  {
    "name": "Mayuu Masai",
    "category": "music",
    "photo": "https://d2r1lkk9i7row.cloudfront.net/mobile/member/83101006.jpg",
    "source": "https://www.akb48.co.jp/about/members/detail/mid-1082/",
    "sourceLabel": "AKB48 · ritratto ufficiale nominativo",
    "width": 1200,
    "height": 1200
  },
  {
    "name": "Miyuu Mizushima",
    "category": "music",
    "photo": "https://d2r1lkk9i7row.cloudfront.net/mobile/member/83101007.jpg",
    "source": "https://www.akb48.co.jp/about/members/detail/mid-1083/",
    "sourceLabel": "AKB48 · ritratto ufficiale nominativo",
    "width": 1200,
    "height": 1200
  },
  {
    "name": "Sora Yamazaki",
    "category": "music",
    "photo": "https://d2r1lkk9i7row.cloudfront.net/mobile/member/83101008.jpg",
    "source": "https://www.akb48.co.jp/about/members/detail/mid-1084/",
    "sourceLabel": "AKB48 · ritratto ufficiale nominativo",
    "width": 1200,
    "height": 1200
  },
  {
    "name": "Yuna Akiyama",
    "category": "music",
    "photo": "https://d2r1lkk9i7row.cloudfront.net/hashiranokai/member/83101009.jpg",
    "source": "https://www.akb48.co.jp/about/members/detail/mid-1085/",
    "sourceLabel": "AKB48 · ritratto ufficiale nominativo",
    "width": 1200,
    "height": 1200
  },
  {
    "name": "Sae Arai",
    "category": "music",
    "photo": "https://d2r1lkk9i7row.cloudfront.net/hashiranokai/member/83101010.jpg",
    "source": "https://www.akb48.co.jp/about/members/detail/mid-1086/",
    "sourceLabel": "AKB48 · ritratto ufficiale nominativo",
    "width": 1200,
    "height": 1200
  },
  {
    "name": "Kasumi Kudo",
    "category": "music",
    "photo": "https://d2r1lkk9i7row.cloudfront.net/hashiranokai/member/83101011.jpg",
    "source": "https://www.akb48.co.jp/about/members/detail/mid-1087/",
    "sourceLabel": "AKB48 · ritratto ufficiale nominativo",
    "width": 1200,
    "height": 1200
  },
  {
    "name": "Hinano Kubo",
    "category": "music",
    "photo": "https://d2r1lkk9i7row.cloudfront.net/hashiranokai/member/83101012.jpg",
    "source": "https://www.akb48.co.jp/about/members/detail/mid-1088/",
    "sourceLabel": "AKB48 · ritratto ufficiale nominativo",
    "width": 1200,
    "height": 1200
  },
  {
    "name": "Yumemi Sako",
    "category": "music",
    "photo": "https://d2r1lkk9i7row.cloudfront.net/hashiranokai/member/83101013.jpg",
    "source": "https://www.akb48.co.jp/about/members/detail/mid-1089/",
    "sourceLabel": "AKB48 · ritratto ufficiale nominativo",
    "width": 1200,
    "height": 1200
  },
  {
    "name": "Kohina Narita",
    "category": "music",
    "photo": "https://d2r1lkk9i7row.cloudfront.net/hashiranokai/member/83101014.jpg",
    "source": "https://www.akb48.co.jp/about/members/detail/mid-1090/",
    "sourceLabel": "AKB48 · ritratto ufficiale nominativo",
    "width": 1200,
    "height": 1200
  },
  {
    "name": "Azuki Yagi",
    "category": "music",
    "photo": "https://d2r1lkk9i7row.cloudfront.net/hashiranokai/member/83101015.jpg",
    "source": "https://www.akb48.co.jp/about/members/detail/mid-1091/",
    "sourceLabel": "AKB48 · ritratto ufficiale nominativo",
    "width": 1200,
    "height": 1200
  },
  {
    "name": "Yui Yamaguchi",
    "category": "music",
    "photo": "https://d2r1lkk9i7row.cloudfront.net/hashiranokai/member/83101016.jpg",
    "source": "https://www.akb48.co.jp/about/members/detail/mid-1092/",
    "sourceLabel": "AKB48 · ritratto ufficiale nominativo",
    "width": 1200,
    "height": 1200
  },
  {
    "name": "Momoka Ito",
    "category": "music",
    "photo": "https://d2r1lkk9i7row.cloudfront.net/hashiranokai/member/83101017.jpg",
    "source": "https://www.akb48.co.jp/about/members/detail/mid-1093/",
    "sourceLabel": "AKB48 · ritratto ufficiale nominativo",
    "width": 1200,
    "height": 1200
  },
  {
    "name": "Kairi Okumoto",
    "category": "music",
    "photo": "https://d2r1lkk9i7row.cloudfront.net/hashiranokai/member/83101018.jpg",
    "source": "https://www.akb48.co.jp/about/members/detail/mid-1094/",
    "sourceLabel": "AKB48 · ritratto ufficiale nominativo",
    "width": 1200,
    "height": 1200
  },
  {
    "name": "Yui Kawamura",
    "category": "music",
    "photo": "https://d2r1lkk9i7row.cloudfront.net/hashiranokai/member/83101019.jpg",
    "source": "https://www.akb48.co.jp/about/members/detail/mid-1095/",
    "sourceLabel": "AKB48 · ritratto ufficiale nominativo",
    "width": 1200,
    "height": 1200
  },
  {
    "name": "Saki Oga",
    "category": "music",
    "photo": "https://d2r1lkk9i7row.cloudfront.net/hashiranokai/member/83101022.jpg",
    "source": "https://www.akb48.co.jp/about/members/detail/mid-1098/",
    "sourceLabel": "AKB48 · ritratto ufficiale nominativo",
    "width": 1200,
    "height": 1200
  },
  {
    "name": "Saki Kondo",
    "category": "music",
    "photo": "https://d2r1lkk9i7row.cloudfront.net/hashiranokai/member/83101023.jpg",
    "source": "https://www.akb48.co.jp/about/members/detail/mid-1099/",
    "sourceLabel": "AKB48 · ritratto ufficiale nominativo",
    "width": 1200,
    "height": 1200
  },
  {
    "name": "Hinata Maruyama",
    "category": "music",
    "photo": "https://d2r1lkk9i7row.cloudfront.net/hashiranokai/member/83101024.jpg",
    "source": "https://www.akb48.co.jp/about/members/detail/mid-1100/",
    "sourceLabel": "AKB48 · ritratto ufficiale nominativo",
    "width": 1200,
    "height": 1200
  },
  {
    "name": "Mao Takahashi",
    "category": "music",
    "photo": "https://d2r1lkk9i7row.cloudfront.net/hashiranokai/member/83101025.jpg",
    "source": "https://www.akb48.co.jp/about/members/detail/mid-1101/",
    "sourceLabel": "AKB48 · ritratto ufficiale nominativo",
    "width": 1200,
    "height": 1200
  },
  {
    "name": "Sayuri Tanaka",
    "category": "music",
    "photo": "https://d2r1lkk9i7row.cloudfront.net/hashiranokai/member/83101026.jpg",
    "source": "https://www.akb48.co.jp/about/members/detail/mid-1102/",
    "sourceLabel": "AKB48 · ritratto ufficiale nominativo",
    "width": 1200,
    "height": 1200
  },
  {
    "name": "Ema Makito",
    "category": "music",
    "photo": "https://d2r1lkk9i7row.cloudfront.net/hashiranokai/member/83101027.jpg",
    "source": "https://www.akb48.co.jp/about/members/detail/mid-1103/",
    "sourceLabel": "AKB48 · ritratto ufficiale nominativo",
    "width": 1200,
    "height": 1200
  },
  {
    "name": "Yu Morikawa",
    "category": "music",
    "photo": "https://d2r1lkk9i7row.cloudfront.net/hashiranokai/member/83101028.jpg",
    "source": "https://www.akb48.co.jp/about/members/detail/mid-1104/",
    "sourceLabel": "AKB48 · ritratto ufficiale nominativo",
    "width": 1200,
    "height": 1200
  },
  {
    "name": "Kiko Watanabe",
    "category": "music",
    "photo": "https://d2r1lkk9i7row.cloudfront.net/hashiranokai/member/83101029.jpg",
    "source": "https://www.akb48.co.jp/about/members/detail/mid-1105/",
    "sourceLabel": "AKB48 · ritratto ufficiale nominativo",
    "width": 1200,
    "height": 1200
  },
  {
    "name": "Yuna Oonishi",
    "category": "music",
    "photo": "https://d2r1lkk9i7row.cloudfront.net/hashiranokai/member/83101030.jpg",
    "source": "https://www.akb48.co.jp/about/members/detail/mid-1106/",
    "sourceLabel": "AKB48 · ritratto ufficiale nominativo",
    "width": 1200,
    "height": 1200
  },
  {
    "name": "Momoka Hasegawa",
    "category": "music",
    "photo": "https://d2r1lkk9i7row.cloudfront.net/hashiranokai/member/83101031.jpg",
    "source": "https://www.akb48.co.jp/about/members/detail/mid-1107/",
    "sourceLabel": "AKB48 · ritratto ufficiale nominativo",
    "width": 1200,
    "height": 1200
  },
  {
    "name": "Izumi Maeda",
    "category": "music",
    "photo": "https://d2r1lkk9i7row.cloudfront.net/hashiranokai/member/83101032.jpg",
    "source": "https://www.akb48.co.jp/about/members/detail/mid-1108/",
    "sourceLabel": "AKB48 · ritratto ufficiale nominativo",
    "width": 1200,
    "height": 1200
  },
  {
    "name": "Rinoa Yamauchi",
    "category": "music",
    "photo": "https://d2r1lkk9i7row.cloudfront.net/hashiranokai/member/83101033.jpg",
    "source": "https://www.akb48.co.jp/about/members/detail/mid-1109/",
    "sourceLabel": "AKB48 · ritratto ufficiale nominativo",
    "width": 1200,
    "height": 1200
  },
  {
    "name": "MIU",
    "category": "music",
    "photo": "https://me-i.jp/image/profile/miu.jpg",
    "source": "https://me-i.jp/feature/profile?lang=en",
    "sourceLabel": "ME:I · profilo ufficiale",
    "width": 1200,
    "height": 1200
  },
  {
    "name": "MOMONA",
    "category": "music",
    "photo": "https://me-i.jp/image/profile/momona.jpg",
    "source": "https://me-i.jp/feature/profile?lang=en",
    "sourceLabel": "ME:I · profilo ufficiale",
    "width": 1200,
    "height": 1200
  },
  {
    "name": "AYANE",
    "category": "music",
    "photo": "https://me-i.jp/image/profile/ayane.jpg",
    "source": "https://me-i.jp/feature/profile?lang=en",
    "sourceLabel": "ME:I · profilo ufficiale",
    "width": 1200,
    "height": 1200
  },
  {
    "name": "KEIKO",
    "category": "music",
    "photo": "https://me-i.jp/image/profile/keiko.jpg",
    "source": "https://me-i.jp/feature/profile?lang=en",
    "sourceLabel": "ME:I · profilo ufficiale",
    "width": 1200,
    "height": 1200
  },
  {
    "name": "RINON",
    "category": "music",
    "photo": "https://me-i.jp/image/profile/rinon.jpg",
    "source": "https://me-i.jp/feature/profile?lang=en",
    "sourceLabel": "ME:I · profilo ufficiale",
    "width": 1200,
    "height": 1200
  },
  {
    "name": "SUZU",
    "category": "music",
    "photo": "https://me-i.jp/image/profile/suzu.jpg",
    "source": "https://me-i.jp/feature/profile?lang=en",
    "sourceLabel": "ME:I · profilo ufficiale",
    "width": 1200,
    "height": 1200
  },
  {
    "name": "TSUZUMI",
    "category": "music",
    "photo": "https://me-i.jp/image/profile/tsuzumi.jpg",
    "source": "https://me-i.jp/feature/profile?lang=en",
    "sourceLabel": "ME:I · profilo ufficiale",
    "width": 1200,
    "height": 1200
  }
];
const index=new Map(rows.map(r=>[r.category+'|'+r.name,r]));
let updated=0;
const people=old.people.map(p=>{
 const photo=index.get(p.category+'|'+p.name);if(!photo)return p;
 updated++;
 return {...p,editorialPhoto:photo.photo,editorialPhotoSource:photo.source,editorialPhotoSourceLabel:photo.sourceLabel,
  editorialPhotoAlternates:[...(p.editorialPhoto&&p.editorialPhoto!==photo.photo?[p.editorialPhoto]:[]),...(p.editorialPhotoAlternates||[])],
  photoReviewedAt:'2026-11-15'};
});
window.YumeIdolsDiscovery=Object.freeze({...old,people,updated:'2026-11-15'});
window.YumeJapanesePhotoUpdate=Object.freeze({updated,checkedAt:'2026-11-15',
 groups:rows.filter(r=>r.category==='groups').length,individuals:rows.filter(r=>r.category==='music').length,
 sources:['https://liveidol.blog/en/groups/','https://www.akb48.co.jp/about/members/','https://me-i.jp/feature/profile?lang=en','https://fruitszipper.asobisystem.com/news/2/','https://candytune.asobisystem.com/news/2/']});
})();
