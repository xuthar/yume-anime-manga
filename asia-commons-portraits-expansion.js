/* Yume Asia · documented-photo expansion for 12 previously absent Asian scenes.
 * 33 distinct publicly known female artists/athletes/creators, each with
 * exact, individual Wikimedia Commons file and a link to source/credit.
 * Nonsexual performer data. One teen singer and one teen athlete with
 * publicly sourced birth dates; all other ages remain unspecified.
 * File existence does not guarantee every user/browser can reach Commons.
 * Snapshot 2026-11-12.
 */
(()=>{'use strict';
const old=window.YumeAsiaIdols;
if(!old)return;
const countries=[
 ['bd','Bangladesh','🇧🇩','বাংলাদেশ','Cinema, musica, attrici e creator','Dhaka'],
 ['pk','Pakistan','🇵🇰','پاکستان','Cinema, cantante e influencer','Lahore'],
 ['lk','Sri Lanka','🇱🇰','ශ්‍රී ලංකාව','Pop, cinema e cricket femminile','Colombo'],
 ['kh','Cambogia','🇰🇭','កម្ពុជា','Musica, creator e attrici','Phnom Penh'],
 ['mm','Myanmar','🇲🇲','မြန်မာ','Cantanti, influencer e cinema','Yangon'],
 ['mn','Mongolia','🇲🇳','Монгол','Musica alternativa e nuove voci','Ulaanbaatar'],
 ['kz','Kazakistan','🇰🇿','Қазақстан','Cantanti, pop e sport femminile','Almaty'],
 ['uz','Uzbekistan','🇺🇿','Oʻzbekiston','Pop femminile, cantanti e attrici','Tashkent'],
 ['af','Afghanistan','🇦🇫','افغانستان','Pop e artiste afghane','Kabul'],
 ['am','Armenia','🇦🇲','Հայաստան','Pop, folk e nuove voci','Yerevan'],
 ['ge','Georgia','🇬🇪','საქართველო','Jazz, folk e artiste contemporanee','Tbilisi'],
 ['az','Azerbaigian','🇦🇿','Azərbaycan','Pop, mugham e artiste','Baku']
];
// Each record: scene, public professional name, category, artistic area,
// exact Commons image filename, biographical/profile source, group, validated birth, birth source.
const records=[
 ['bd','Jaya Ahsan','actors','Cinema / televisione','Jaya Ahsan Chorki 2026 Program.jpg','https://commons.wikimedia.org/wiki/Category:Jaya_Ahsan','Cinema bengalese'],
 ['bd','Mehazabien Chowdhury','actors','Attrice / creator','Mehazabien Chowdhury in 2019.jpg','https://commons.wikimedia.org/wiki/Category:Mehazabien_Chowdhury','Cinema e televisione'],
 ['bd','Apu Biswas','actors','Cinema / modello','Apu Biswas portrait 2017.jpg','https://commons.wikimedia.org/wiki/Category:Apu_Biswas','Cinema bangladese'],
 ['bd','Shabnom Bubly','actors','Cinema / televisione','শবনম বুবলি.jpg','https://commons.wikimedia.org/wiki/Category:Shabnom_Bubly','Cinema bangladese'],
 ['pk','Mahira Khan','actors','Cinema / fashion','Mahira Khan 2024 (2).png','https://commons.wikimedia.org/wiki/Category:Mahira_Khan','Cinema e televisione'],
 ['pk','Maya Ali','actors','Attrice / fashion','Maya Ali 2020.png','https://commons.wikimedia.org/wiki/Category:Maya_Ali','Cinema e televisione'],
 ['pk','Dananeer Mobeen','creators','Creator / attrice','Dananeer Mobeen hosting Girls Only.jpg','https://commons.wikimedia.org/wiki/File:Dananeer_Mobeen_hosting_Girls_Only.jpg','Creator e conduzione'],
 ['pk','Aima Baig','music','Cantante / pop','Aima Baig 2023 (2).png','https://commons.wikimedia.org/wiki/Category:Aima_Baig','Pakistan pop'],
 ['pk','Hania Aamir','actors','Cinema / social','Hania Aamir.png','https://commons.wikimedia.org/wiki/Category:Hania_Aamir','Cinema e influencer'],
 ['pk','Arooj Aftab','music','Cantautrice / musica internazionale','Arooj Aftab 2022.png','https://commons.wikimedia.org/wiki/Category:Arooj_Aftab','Musicista e vocalist'],
 ['lk','Yohani','music','Singer / pop / video','Yohani D Silva.jpg','https://commons.wikimedia.org/wiki/File:Yohani_D_Silva.jpg','Sri Lankan pop'],
 ['lk','Anarkali Akarsha','fashion','Attrice / modella','Anarkali Akarsha.jpg','https://commons.wikimedia.org/wiki/Category:Anarkali_Akarsha','Moda e cinema'],
 ['lk','Chamari Atapattu','sport','Atleta / cricket','2020 ICC W T20 WC A v SL 02-24 Atapattu (02).jpg','https://commons.wikimedia.org/wiki/Category:Chamari_Atapattu','Cricket femminile'],
 ['kh','Norodom Jenna','music','Cantante / attrice · Young Stars','Norodom Jenna 2026.jpg','https://commons.wikimedia.org/wiki/Category:Norodom_Jenna','Cantante e attrice','2012-03-11','https://kprofiles.com/jenna-norodom-profile-and-facts/'],
 ['kh','Laura Mam','music','Cantante / Khmer pop','Laura Mam at US Embassy Cambodia.jpg','https://commons.wikimedia.org/wiki/Category:Laura_Mam','Cambodian pop'],
 ['kh','Pich Sophea','music','Cantante / pop','VS--YouTube-coffee1500-PichSophea-0’53” (crop 2x3).jpg','https://commons.wikimedia.org/wiki/Category:Pich_Sophea','Khmer pop'],
 ['kh','Mean Sonyta','actors','Cinema / TV','Mean Sonyta 05.jpg','https://commons.wikimedia.org/wiki/Category:Mean_Sonyta','Cinema e televisione'],
 ['mm','Paing Phyo Thu','actors','Cinema / teatro','PaingPhyoThu.jpg','https://commons.wikimedia.org/wiki/File:PaingPhyoThu.jpg','Cinema birmano'],
 ['mm','Nay Chi Oo','creators','Beauty creator / attrice','Nay Chi Oo.jpg','https://commons.wikimedia.org/wiki/Category:Nay_Chi_Oo','Beauty e lifestyle'],
 ['mm','Bobby Soxer','music','Cantante / rapper','Bobby Soxer Htet Htet.jpg','https://commons.wikimedia.org/wiki/Category:Bobby_Soxer','Pop e rap'],
 ['mm','Warso Moe Oo','actors','Attrice / modella','Warso Moe Oo.jpg','https://commons.wikimedia.org/wiki/Category:Warso_Moe_Oo','Cinema e moda'],
 ['mn','SIZI','music','Cantante / pop','HUR-Sizi.jpg','https://commons.wikimedia.org/wiki/Category:SIZI','Mongolia pop'],
 ['kz','Roza Rymbayeva','music','Cantante / pop','Roza Rymbayeva.jpg','https://commons.wikimedia.org/wiki/Category:Roza_Rymbayeva','Kazakh pop'],
 ['kz','Nazima','music','Cantante / hip-hop','Наzима на Видфест 2018 в Москве (cropped).jpg','https://commons.wikimedia.org/wiki/Category:Nazima','Hip-hop kazako'],
 ['kz','Dilnaz Akhmadieva','music','Cantante / attrice','Sportydilnaz (cropped).jpg','https://commons.wikimedia.org/wiki/Category:Dilnaz_Akhmadieva','Kazakh pop'],
 ['kz','Sofia Samodelkina','sport','Pattinaggio artistico / Young Stars','Sofia Samodelkina 2025 Worlds Free Skate 01.jpg','https://isu-skating.com/en/figure-skating/skaters/sofia-samodelkina/','Pattinaggio femminile','2007-02-18','https://www.isuresults.com/bios/isufs00111213.htm'],
 ['uz','Shahzoda','music','Cantante / attrice','Shahzoda in 2012.jpg','https://commons.wikimedia.org/wiki/Category:Shahzoda','Uzbek pop'],
 ['uz','Sevara Nazarkhan','music','Cantautrice / musica world','Sevara Nazarkhan Realworld Party 2006 (cropped).jpg','https://commons.wikimedia.org/wiki/Category:Sevara_Nazarkhan','Musica uzbeka'],
 ['uz',"Sevinch Mo'minova",'music','Cantante / attrice',"Sevinch Mo'minova (Aug 2021).png","https://commons.wikimedia.org/wiki/Category:Sevinch_Mo%27minova",'Uzbek pop'],
 ['af','Aryana Sayeed','music','Cantante e cantautrice pop','October 2019 Afghan singer.jpg','https://aryanasayeed.com/','Pop afghano'],
 ['am','Sirusho','music','Cantautrice · pop e folk armeno','Sirusho Harutyunyan in London 1.jpg','https://eurovision.com/eurovision-song-contest/belgrade-2008/participants/sirusho/','Pop armeno'],
 ['ge','Nino Katamadze','music','Cantante · jazz e world music georgiana','Nino Katamadze cropped.jpeg','https://ninokatamadze.com/','Jazz georgiano'],
 ['az','Aygün Kazımova','music','Cantante pop azera','Aygün Kazımova (2025).jpg','https://iticket.az/artists/aygun-kazimova','Pop azerbaigiano']
];
const norm=n=>String(n||'').normalize('NFKC').toLocaleLowerCase('en').trim();
const countriesAdded=countries.filter(([id])=>!old.countries.some(c=>c.id===id));
const allCountries=[...old.countries,...countriesAdded.map(([id,name,flag,local,description,city])=>({id,name,flag,local,description,city}))];
const sources={...old.sources};
const seen=new Set(old.people.map(p=>p.country+'|'+norm(p.name)));
const added=[],people=old.people.slice();
for(const [country,name,category,occupation,file,profile,group,birth,birthSource] of records){
 const ident=country+'|'+norm(name);
 if(seen.has(ident))continue;
 if(!countries.some(c=>c[0]===country))continue;
 const sourceId='asia-commons-'+country;
 if(!sources[sourceId])sources[sourceId]={id:sourceId,country,title:'Wikimedia Commons · artiste e ritratti per paese',url:'https://commons.wikimedia.org/wiki/Category:Women_by_name_by_country',year:'2026'};
 const fileUrl='https://commons.wikimedia.org/wiki/File:'+encodeURIComponent(file.replace(/ /g,'_'));
 const photoUrl='https://commons.wikimedia.org/wiki/Special:FilePath/'+encodeURIComponent(file.replace(/ /g,'_'))+'?width=500';
 const row={
  id:country+'-portrait-'+(added.length+1),
  name,alternate:'',country,nationality:country,category,groups:[group],sourceIds:[sourceId],
  birth:birth||null,verifiedBirthSource:birthSource||null,
  photoFile:file,photoUrls:[photoUrl],photo:photoUrl,photoValid:false,broken:false,verifiedLinks:[['Foto e licenza',fileUrl],['Fonte biografica',profile]],
  status:'catalog',sourceYear:'2026',editorialBio:occupation,
  photoVerifiedFrom:profile,photoSource:fileUrl
 };
 people.push(row);added.push(row);seen.add(ident);
}
const groupCount=new Set(people.flatMap(p=>(p.groups||[]).map(g=>p.country+':'+g))).size;
const countryCounts=Object.fromEntries(allCountries.map(c=>[c.id,people.filter(p=>p.country===c.id).length]));
window.YumeAsiaIdols=Object.freeze({...old,countries:allCountries,sources,people,
 total:people.length,countryCounts,groupCount,sourceCount:Object.keys(sources).length,updated:'2026-11-12'});
window.YumeAsiaPortraitExpansion=Object.freeze({updated:'2026-11-12',records,added:added.length,countries: countriesAdded.length,
 countriesAdded:countriesAdded.map(x=>x[0]),documentedBirths:added.filter(p=>p.verifiedBirthSource).length,
 photoCoverage:'Each added person has an exact Commons File URL; display/reachability may vary by browser.'});
})();
