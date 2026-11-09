/* Yume Cosplay · editorial expansion from CoDigital 50-creators guide, 9 October 2026.
 * A conservative female-catalogue selection: ambiguous and explicitly male/crossdressing
 * sections are not imported. Handles are transcribed from the supplied article, not
 * independently verified current account ownership; followers are intentionally omitted.
 * No images are copied or hotlinked from CoDigital/social profiles.
 */
(()=>{'use strict';
const original=window.YumeIdolsDiscovery;if(!original?.people)return;
const source='https://influencer.codigital.co.jp/insights/cosplay-influencers-japan/';
const records=[
 // romanised name, Japanese name, specialty (short editorial paraphrase), X, Instagram, TikTok, YouTube
 ['Shinonome Umi','東雲うみ','Cosplay fotografico, modellismo, video e gaming','sinonome_umi','umi_portrait','shinonome_umi','umi_shinonome'],
 ['Sakurai Feel','尊みを感じて桜井','Cosplay anime e videogiochi; video e streaming','angelia_lapin','lapinangelia','sakuraifeel',''],
 ['Miyamoto Saki','宮本彩希','Cosplay anime e giochi, doppiaggio e merchandising','saki_miyamoto','sakimi_cos','',''],
 ['yunocy','ゆのしー','Cosplay, avatar digitali ed esport','mizuyuno_','mizuyunosan_','mizuyuno_',''],
 ['Suzuran','すずら','Presentazioni di costumi e video di vita quotidiana','suzuran_ro','suzuran_ro','suzuran_ro','suzuran_tube'],
 ['Shinozaki Kokoro','篠崎こころ','Cosplay, moda e DJ; PP Enterprise','kokoro777pp','kokoro777pp','kokoro777ppe',''],
 ['Kikka','きっか','Cosplay, photobook e prodotti autopubblicati','kikka_cos','kikka_cos','kikka_cos','kikka_nikki'],
 ['Tachibana Asahi','橘あさひ','Cosplay e recitazione; collezionismo Pokémon','tadanoasahi','tadanoasahi','',''],
 ['Tsukimi Tsukune','月海つくね','Cosplay, backstage, eventi e vlog','XaiabP','xaiabp','xaiabp',''],
 ['Nekota Ashu','猫田あしゅ','Cosplay e modella freelance; intrattenimento familiare','Nekota_Ashu','nekota_ashu','nekota_ashu',''],
 ['Koumaru-ya','幸まる屋','Vlog da eventi cosplay e collaborazioni internazionali','y_k_mr812','yuki_mr_08','','y_k_mr812'],
 ['Momotsuki Nashiko','桃月なしこ','Cosplay, photobook e contenuti su giochi e hobby','nashiko_cos','nashiko_cos','nashiko_cos','nashiko_cos'],
 ['Kashou Roshieru','火将ロシエル','Cosplay professionale, eventi e iniziative imprenditoriali','Kasyou3roshieru','','kasyou3roshieru',''],
 ['Nyarumaa','にゃるまー。','Cosplay professionale per videogiochi; pubblico giapponese e cinese','himononeko','nyarumaa.cosplay','',''],
 ['Shinohara Minami','篠原みなみ','Cosplay, streaming e photobook','snhr_minami','snhr_minami','snhr_minami',''],
 ['Myako','みゃこ','Cosplay, streaming e basso elettrico; PP Enterprise','myakkomyako','myakkomyako','myakkomyako',''],
 ['Hanasaki Raimu','花咲来夢','Cosplay fotografico e gravure','raimu_charlotte','raimu_charlotte','',''],
 ['Minami Ami','南あみ','Cosplay professionale, fan club e shop','amichan_0907','amichan0907','',''],
 ['Manatsu','茉夏','Cosplay per festival ed eventi gaming nel Kansai','manatsukin','manatsukin','',''],
 ['Chocolat','しょこら','Tutorial trucco cosplay, parrucche e costumi','Chocolat_cos0','chocolatcos0','','channel-ff3rs'],
 ['87 Kabocha','87かぼちゃ','Tutorial cosplay, lenti colorate e accessori','pumpkin6non','87kabocha','','87kabocha'],
 ['Muyun','むゆん','Tutorial base cosplay, trucco, parrucche e shooting','__muyun__','__muyun__','_muyun_','__muyun__'],
 ['Shirayuki','しらゆき','Cosplay di Hatsune Miku, DJ e video musicali','snow_white__y','shirayuki_yy','snow_white__y','shirayuki39'],
 ['Keika','Keika','Tutorial trucco occhi e lenti a contatto per cosplay','','keika_o0','','Keika_en'],
 ['Sakurako','桜虎','Creazione costumi, parrucche e tutorial make-up','sakurako_kokko','sakurako_kokko','sakurako_kokko','sakurako_kokko'],
 ['Shibainu Miku','柴犬ミク(onienna)','Props artigianali, cosplay e progetti VRoid','shibainumiku','shibaneko5_','','onienna'],
 ['Hinano','ひなの','Realizzazione di costumi e resoconti dei servizi fotografici','','hinayahho','','hinanono_channel'],
 ['Nairu','ないる','Cosplay fotografico e costumi su commissione','nairuru','nairuru.i','nairuru.t',''],
 ['Akase Akari','あかせあかり','Cosplay, recitazione, canto, doppiaggio e video brevi','Akase_Official','akaseakari_official','ao_akase','akaseakari174'],
 ['Leila','レイラ','Cosplay, video TikTok e photobook','mishirudo','mishirudo','mishirudo','mishirudo'],
 ['Majime','まじめ','Cosplay, danza e dance-cover','majime003','majime003','majime003','Majime'],
 ['Peach Milky','ソフィー','Cosplay e streaming in inglese da Tokyo','PeachMilky_','','','PeachMilkyYT'],
 ['Momoto','ももと','Vlog su cosplay, eventi e vita quotidiana','','','','momoto_momo'],
 ['Tabuko','たぶ子。','Vlog da convention cosplay e streaming Twitch','TAB_c001','','','TABu_co0113'],
 ['Marmalade','Marmalade','Costume design e video in inglese sulla vita in Giappone','','marmalade.cos','marmalade.chu','Marmaladecos'],
 ['Reika','麗華','Cosplay internazionale e comunicazione in inglese','reika2011','reika_japan_','','']
];
const aliases={
 'Shinonome Umi':['Umi Shinonome'],
 'Miyamoto Saki':['Saki Miyamoto'],
 'Momotsuki Nashiko':['Nashiko Momotsuki'],
 'Kashou Roshieru':['Roshieru Kashou'],
 'Shinohara Minami':['Minami Shinohara'],
 'Hanasaki Raimu':['Raimu Hanasaki'],
 'Akase Akari':['Akari Akase'],
 'Leila':['Leila (mishirudo)'],
 'Shibainu Miku':['Shibainu Miku (onienna)']
};
const key=s=>String(s||'').normalize('NFKC').normalize('NFKD').toLowerCase().replace(/[\u0300-\u036f\s・･._\-’'()]/g,'');
const people=original.people.slice(),known=new Map();
function register(p,index){
 for(const n of [p.name,p.alternate,...(p.otherStageNames||[]),...(aliases[p.name]||[])])
  if(key(n))known.set(key(n),index)
}
people.forEach(register);
let added=0,enriched=0,categoryAdded=0;
for(const [roman,japanese,focus,x,instagram,tiktok,youtube] of records){
 const handles={};
 for(const [platform,handle] of [['X',x],['Instagram',instagram],['TikTok',tiktok],['YouTube',youtube]])if(handle)handles[platform]=handle;
 const socials=Object.entries(handles).map(([platform,handle])=>[platform,
  platform==='X'?'https://x.com/'+encodeURIComponent(handle):
  platform==='Instagram'?'https://www.instagram.com/'+encodeURIComponent(handle)+'/':
  platform==='TikTok'?'https://www.tiktok.com/@'+encodeURIComponent(handle):
  'https://www.youtube.com/@'+encodeURIComponent(handle)]);
 const names=[roman,japanese,...(aliases[roman]||[])];
 const match=names.map(n=>known.get(key(n))).find(i=>i!==undefined);
 const extras={cosplayFocus:focus,cosplayGuideSource:source,cosplayGuideDate:'2026-10-09',
  cosplaySocials:socials,cosplayJapanese:japanese};
 if(match!==undefined){
  const prior=people[match];
  if(prior.category==='cosplay'){
   people[match]={...prior,...extras,alternate:prior.alternate||japanese};
   enriched++;
  }else{
   // Preserve the existing music/gravure/creator identity and add a matching
   // cosplay classification, subsequently unified by the catalogue card.
   people.push({category:'cosplay',name:prior.name,alternate:prior.alternate||japanese,
    source,sourceLabel:'CoDigital · 50 Cosplay Influencers 2026',sourceKind:'repertorio editoriale',
    editorialBio:focus,otherStageNames:[roman,japanese],...extras});
   categoryAdded++;
  }
 }else{
  people.push({category:'cosplay',name:roman,alternate:japanese,
   source,sourceLabel:'CoDigital · 50 Cosplay Influencers 2026',sourceKind:'repertorio editoriale',
   editorialBio:focus,otherStageNames:aliases[roman]||[],...extras});
  added++;
 }
 register(people[people.length-1],people.length-1);
}
const sources={...original.sources,codigitalCosplay:{
 label:'CoDigital · Top 50 Cosplay Influencers (9 Oct 2026)',url:source,kind:'guida editoriale; social da riconfermare nel tempo'
}};
window.YumeIdolsDiscovery=Object.freeze({...original,people,sources,
 stats:{...original.stats,entries:people.length,sources:Object.keys(sources).length},
 updated:'2026-11-09'});
window.YumeCosplayGuide2026=Object.freeze({source,updated:'2026-11-09',selected:records.length,
 added,existingEnriched:enriched,crossCategory:categoryAdded,
 note:'Catalogo femminile: i profili maschili e quelli a identificazione incerta non sono importati; nessuna immagine social incorporata.'});
})();
