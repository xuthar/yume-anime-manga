/* Yume · Filipinas digital creators (08 Nov 2026)
 * Public professional profiles, women creators/streamers only.
 * No inferred age, follower counts, personal information or unlicensed portraits.
 * Each profile points to a direct public source (press, organization or creator profile).
 * Live activity status is not claimed; social account links are provided only if sourced.
 */
(()=>{'use strict';
 const base=window.YumeAsiaIdols;if(!base)return;
 // name | category | identity/discipline | sourceURL | public professional URL | focus
 const rows=[
 ['Sophy (sophmapua)','streamers','Gaming, Dota 2 · 100 Thieves','https://100thieves.com/pages/sophy','https://www.twitch.tv/sophmapua','gaming'],
 ['Raeyei','streamers','Gaming, cosplay · Twitch','https://streamscharts.com/news/most-followed-twitch-streamers-philippines','https://www.twitch.tv/raeyei','gaming'],
 ['Maggiekarp (Amanda Zamora)','streamers','VALORANT · Twitch, esports','https://mega-asia.com/women/must-follow-southeast-asian-content-creators-based-on-your-interests/',null,'gaming'],
 ['Cherizawa (Cher Bernacha)','streamers','VALORANT, Mobile Legends · Facebook Gaming','https://www.noypigeeks.com/featured/gaming-streamers-influencers-philippines/','https://www.facebook.com/cherizawagaming','gaming'],
 ['Bianca Yao (Biancake)','streamers','Dota 2 · Twitch, shoutcasting','https://www.noypigeeks.com/featured/gaming-streamers-influencers-philippines/','https://www.youtube.com/@biancayao3377','gaming'],
 ['Dexie Diaz','streamers','Gaming, lifestyle · Facebook, TikTok','https://www.spiralytics.com/blog/most-popular-streamers-in-the-philippines/','https://www.tiktok.com/@dexiediaz','gaming'],
 ['Myrtle Sarrosa','streamers','Cosplay, gaming, entertainment','https://www.spiralytics.com/blog/most-popular-streamers-in-the-philippines/','https://www.instagram.com/myrtlegail/','gaming'],
 ['Alodia Gosiengfiao','streamers','Cosplay, gaming · creative entrepreneur','https://www.spiralytics.com/blog/most-popular-streamers-in-the-philippines/','https://www.instagram.com/alodia/','gaming'],
 ['Megan Young (Boneezy)','streamers','Gaming, livestream e cultura pop','https://www.spiralytics.com/blog/most-popular-streamers-in-the-philippines/','https://www.instagram.com/meganbata/','gaming'],
 ['Sheila Snow','streamers','Gaming, community e varietà','https://gaming.yugatech.com/gaming/top-10-filipino-gamers-and-streamers-on-facebook/',null,'gaming'],
 ['Koleen Mercado (Een)','streamers','Videogiochi, livestream e gaming','https://www.enduins.com/features/game-streamer-koleen-een-mercado',null,'gaming'],
 ['Christine Samson','streamers','Gaming e conduzione di eventi','https://www.shawtout.com/talents/more/hosts/christine-samson/',null,'gaming'],
 ['Janna Chua','streamers','Call of Duty, VALORANT e TikTok','https://www.shawtout.com/talents/gamers/streamers/janna-chua/',null,'gaming'],
 ['Kayla Heredia (Kaybear)','streamers','Game streamer · Kaybear','https://www.shawtout.com/talents/gamers/streamers/kayla-heredia/',null,'gaming'],
 ['Kris Rey','streamers','Twitch, VALORANT','https://www.shawtout.com/talents/gamers/streamers/kris-rey/',null,'gaming'],
 ['Yana Cosplay','streamers','Cosplay, VALORANT livestream','https://www.shawtout.com/talents/gamers/streamers/yana-cosplay/',null,'gaming'],
 ['Chachi Oshiro','streamers','Gaming e contenuti live','https://www.shawtout.com/talents/gamers/streamers/chachi-oshiro/',null,'gaming'],
 ['Shin Gonzaga','streamers','Gamer, streamer e digital creator','https://www.shawtout.com/talents/gamers/streamers/shin-gonzaga/',null,'gaming'],
 ['Jillipuff (Jillian Santos)','streamers','VALORANT, League of Legends · Twitch','https://linktr.ee/jillipuff','https://www.twitch.tv/jillipuff','gaming'],
 ['deme','streamers','VALORANT, gaming · anche VTuber','https://streamscharts.com/news/most-followed-twitch-streamers-philippines',null,'gaming'],
 ['itsKatchii','streamers','Variety gaming e Twitch','https://streamscharts.com/news/most-followed-twitch-streamers-philippines',null,'gaming'],
 ['Rheaahh (Rhea Ballan)','streamers','Gaming, livestream · creator filippina','https://www.sbs.com.au/language/filipino/en/article/a-frontliner-with-a-different-frontline-pinay-nurse-pursues-online-games-streaming-as-a-profitable-hobby/tb8g6o7ed',null,'gaming'],
 ['Anne Yatco','streamers','Doppiaggio anime/videogiochi e live gaming; filippino-americana','https://m.twitch.tv/annejyatco/about','https://www.twitch.tv/annejyatco','gaming'],
 ['Ange','streamers','VALORANT, Apex Legends, PC gaming','https://easypc.com.ph/blogs/news-and-articles/i-am-ange',null,'gaming'],
 ['Mika Salamanca','streamers','TikTok Live, vlog e varietà','https://www.spiralytics.com/blog/most-popular-streamers-in-the-philippines/','https://www.tiktok.com/@mikasalamanca','livestream'],
 ['Joyce Anne Rosales (AnneYong)','streamers','BIGO Live · canto, eventi e live talk','https://www.wazzup.ph/the-future-is-filipina-bigo-live-ph-celebrates-its-top-women-creators/',null,'livestream'],
 ['Jannah Faye Bocatiya (jfaye)','streamers','BIGO Live · musica e canto','https://www.wazzup.ph/the-future-is-filipina-bigo-live-ph-celebrates-its-top-women-creators/',null,'livestream'],
 ['Jeanifer Olimba (Jeny24)','streamers','BIGO Live · programmi e musica','https://www.wazzup.ph/the-future-is-filipina-bigo-live-ph-celebrates-its-top-women-creators/',null,'livestream'],
 ['Jamii Velasco (spicyjamii)','streamers','BIGO Live · mukbang, musica','https://www.wazzup.ph/the-future-is-filipina-bigo-live-ph-celebrates-its-top-women-creators/',null,'livestream'],
 ['Bella Poarch','creators','TikTok, musica e intrattenimento · filippino-americana','https://commons.wikimedia.org/wiki/Category:Bella_Poarch',null,'social'],
 ['Rei Germar','creators','Beauty, fashion e lifestyle','https://www.cosmo.ph/entertainment/rei-germar-ck-de-leon-cosmo-up-close-april-2024-a2534-20240419-lfrm2','https://www.instagram.com/reigermar/','social'],
 ['Ry Velasco','creators','Beauty, lifestyle e fashion','https://mega-asia.com/lifestyle/culture/next-generation-filipino-content-creators-who-were-following-now/',null,'social'],
 ['Bella Racelis (ThatsBella)','creators','YouTube, lifestyle e fashion','https://mega-asia.com/lifestyle/culture/next-generation-filipino-content-creators-who-were-following-now/',null,'social'],
 ['CK de Leon','creators','YouTube, fashion e vlog','https://www.cosmo.ph/entertainment/rei-germar-ck-de-leon-cosmo-up-close-april-2024-a2534-20240419-lfrm2',null,'social'],
 ['Toni Sia','creators','Fashion, outfit e styling','https://www.cosmo.ph/style/dressing-like-pinay-instagram-influencers-a4822-a4462-20210601',null,'social'],
 ['Camille Co','creators','Fashion blog e lifestyle','https://influencermarketing.ainfluencer.com/filipino-influencers/','https://www.instagram.com/itscamilleco/','social'],
 ['Michelle Dy','creators','Beauty, recensioni e makeup','https://influencermarketing.ainfluencer.com/filipino-influencers/','https://www.instagram.com/michelledyy/','social'],
 ['Anne Clutz','creators','Beauty e makeup YouTube','https://allure.ph/makeup/filipino-beauty-youtubers-2010s/',null,'social'],
 ['Anna Cay','creators','Beauty, YouTube e imprenditoria','https://allure.ph/makeup/filipino-beauty-youtubers-2010s/',null,'social'],
 ['Raiza Contawi','creators','Beauty, makeup e YouTube','https://allure.ph/makeup/filipino-beauty-youtubers-2010s/','https://www.instagram.com/raizacontawi/','social'],
 ['Laureen Uy','creators','Fashion, travel e lifestyle creator','https://allure.ph/allure-face-card/laureen-uy-travel-content-creator-interview/',null,'social'],
 ['Viy Cortez','creators','Lifestyle, vlog e intrattenimento','https://www.gmanetwork.com/entertainment/photos/filipina-content-creators-and-their-businesses/24943/',null,'social'],
 ['Sachzna Laparan','creators','Vlog, beauty e lifestyle','https://cornerstoneent.ph/artists/sachzna-laparan',null,'social'],
 ['Dani Barretto','creators','Lifestyle e vlog','https://www.gmanetwork.com/entertainment/photos/filipina-content-creators-and-their-businesses/24943/',null,'social'],
 ['Tina Lata','creators','Social e lifestyle creator','https://www.marketing-interactive.com/ph-influencer-economy-moves-beyond-virality-as-meltwater-ranks-top-creators',null,'social']
 ];
 const norm=n=>String(n||'').normalize('NFKC').normalize('NFKD').toLocaleLowerCase('en')
 .replace(/[\u0300-\u036f\s・･\-_’'()]/g,'').trim();
 const seen=new Set(base.people.filter(p=>p.country==='ph').map(p=>norm(p.name)));
 const people=base.people.slice(),added=[],sources={...base.sources};
 const srcBase='ph-digital-2026-',groups=['Gaming & Streamers 🇵🇭','Live & Streaming 🇵🇭','Social & Influencer 🇵🇭'];
 const verifiedUrl=u=>typeof u==='string'&&/^https:\/\/[a-z0-9.-]+\/\S+/i.test(u);
 for(const [name,category,discipline,source,official,focus] of rows){
  if(!verifiedUrl(source)||!['streamers','creators'].includes(category)||seen.has(norm(name)))continue;
  const index=people.length+1,sourceId=srcBase+index;
  sources[sourceId]={id:sourceId,country:'ph',title:'Filippine · '+discipline,
   url:source,year:'2026',kind:source.includes('commons.wikimedia.org')?'Commons':'Profilo editoriale, aziendale o professionale'};
  const professionalLinks=official&&verifiedUrl(official)?[['Profilo creator',official]]:[];
  professionalLinks.push(['Fonte pubblica',source]);
  const person={
   id:'ph-digital-'+index,country:'ph',nationality:'ph',
   name,alternate:'',category,groups:[focus==='gaming'?groups[0]:focus==='livestream'?groups[1]:groups[2]],
   sourceIds:[sourceId],sourceYear:'2026',editorialBio:discipline,
   verifiedLinks:professionalLinks,birth:null,status:'catalog',
   sourceKind:'profilo pubblico professionale',focus:'digital',digitalScene:focus
  };
  people.push(person);added.push(person);seen.add(norm(name));
 }
 const countryCounts={...base.countryCounts,ph:people.filter(p=>p.country==='ph').length};
 const groupCount=new Set(people.flatMap(p=>(p.groups||[]).map(g=>p.country+':'+g))).size;
 window.YumeAsiaIdols=Object.freeze({...base,people,total:people.length,
  countryCounts,groupCount,sources,sourceCount:Object.keys(sources).length,updated:'2026-11-08'});
 window.YumePhilippinesDigital=Object.freeze({
  updated:'2026-11-08',added:added.length,records:added,names:rows.map(x=>x[0]),
  streams:added.filter(p=>p.category==='streamers').length,
  socials:added.filter(p=>p.category==='creators').length,
  note:'Professional female creators only; age/active status not inferred. Press/creator sources are dated snapshots.'
 });
})();