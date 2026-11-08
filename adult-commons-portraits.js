/* Yume Adult 18+ — documented professional portraits, November 2026.
 * Uses individually identified Wikimedia Commons records, adult women only.
 * Images are public-event headshots, red-carpet, or professional portraits;
 * do not expose in any teen/young-star category or before age acknowledgement.
 */
(()=>{'use strict';
 const old=window.YumeIdolsDiscovery;if(!old)return;
 const records=[
  ['AIKA','AIKA','1990','Q8916509','Aika (porn actress), 2016 (cropped).jpg','https://commons.wikimedia.org/wiki/Category:Aika_(porn_actress)'],
  ['Yui Hatano','波多野結衣','1988','Q9305078','하타노유이(Yui Hatano) 용과같이 극 기념행사 10.jpg','https://commons.wikimedia.org/wiki/Category:Yui_Hatano'],
  ['Hibiki Otsuki','大槻ひびき','1988','Q9187572','Otsuki Hibiki (大槻ひびき) at Tokyo Game Show 2014.jpg','https://commons.wikimedia.org/wiki/Category:Hibiki_Ōtsuki'],
  ['MINAMO','MINAMO','2000','Q106994179','MINAMO IMG 6009-2.jpg','https://commons.wikimedia.org/wiki/Category:Minamo_(porn_actress)'],
  ['Saika Kawakita','河北彩花','1999','Q55407040','Saika Kawakita2025 ReadjustmentIMG 8019.jpg','https://commons.wikimedia.org/wiki/Category:Saika_Kawakita'],
  ['Yua Mikami','三上悠亜','1993','Q28936158','Mikami Yua to K-POP CIMG6690 (cropped).jpg','https://commons.wikimedia.org/wiki/Category:Yua_Mikami'],
  ['Suzu Honjo','本庄鈴','1997','Q56349819',"Suzu Honjo's refreshing smile2024.jpg",'https://commons.wikimedia.org/wiki/Category:Suzu_Honjō'],
  ['Kirara Asuka','明日花キララ','1988','Q8965460','아스카 키라라(Kirara Asuka) 팬미팅 (1).jpg','https://commons.wikimedia.org/wiki/Category:Kirara_Asuka'],
  ['Tsukasa Aoi','葵つかさ','1990','Q11621180','아오이츠카사(Aoi Tsukasa) 국내 팬미팅 1.jpg','https://commons.wikimedia.org/wiki/Category:Tsukasa_Aoi'],
  ['Anri Okita','沖田杏梨','1986','Q720246','Anri Okita at AVN Adult Entertainment Expo 2016 (25545790092).jpg','https://commons.wikimedia.org/wiki/Category:Anri_Okita'],
  ['JULIA','JULIA','1987',null,'Julia, Japanese porn actress.jpg','https://commons.wikimedia.org/wiki/File:Julia,_Japanese_porn_actress.jpg'],
  ['Ruri Saijo','西条るり','1990',null,'Saijō Ruri, 2016 (cropped).jpg','https://commons.wikimedia.org/wiki/Category:Ruri_Saijō'],
  ['Sora Aoi','蒼井そら','1981','Q287027','Aoi Sora "Lazy Hazy Crazy" at Opening Ceremony of the 28th Tokyo International Film Festival (22241441840) (cropped).jpg','https://commons.wikimedia.org/wiki/Category:Sora_Aoi_smiling']
 ];
 const key=n=>String(n||'').normalize('NFKC').toLowerCase().replace(/\s+/g,'');
 const base=new Set(old.people.map(p=>p.category+':'+key(p.name)));
 const people=old.people.slice(),added=[];
 for(const [name,alternate,year,qid,file,source] of records){
  if(Number(year)>2008||Number(year)<1900||!source.startsWith('https://commons.wikimedia.org/'))continue;
  const item={category:'adult',name,alternate,source,sourceLabel:'Wikimedia Commons · scheda professionale e ritratto attribuito',sourceKind:'ritratto di attività pubblica · data di nascita dell’adulta documentata',officialProfile:null,platform:null,
   qid:qid||null,adultVerified:true,photoFile:file,photoSource:'https://commons.wikimedia.org/wiki/File:'+encodeURIComponent(file.replace(/ /g,'_'))};
  if(base.has('adult:'+key(name)))continue;
  people.push(item);added.push(name);base.add('adult:'+key(name))
 }
 const sources={...old.sources,adultCommonsPortraits:{label:'Wikimedia Commons · ritratti pubblici artiste adulte',url:'https://commons.wikimedia.org/wiki/Category:Porn_actresses_from_Japan',kind:'file con attribuzione Commons; dati pubblici'}};
 window.YumeIdolsDiscovery=Object.freeze({...old,people,sources,
  stats:{entries:people.length,sources:Object.keys(sources).length},updated:'2026-11-08'});
 window.YumeAdultPhotoExpansion=Object.freeze({updated:'2026-11-08',records,added,count:added.length});
})();
