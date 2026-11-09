/* Yume · JAV 18+ · Wikimedia Commons portrait resolver, 08 Nov 2026.
 * Only runs after the 18+ consent in idol-category.html?section=jav.
 * Curated mappings match Commons named performer categories; other stage names
 * require exact Wikidata Japanese name + female + Japanese adult identity.
 * Commons files must have reusable licenses and a portrait/candid aspect.
 * No agency hotlinking, explicit image scraping, inferred ages or fake faces.
 */
(()=>{'use strict';
const FIXED=[
 ['Akiho Yoshizawa','Akiho Yoshizawa','Akiho Yoshizawa (2017, cropped).jpg'],
 ['Maria Ozawa','Maria Ozawa','Maria Ozawa.jpg'],
 ['Yuki Yoshizawa','Yuki Yoshizawa','Fresh Festival 2023 in Shirakobato Water Park IMG 1791.jpg'],
 ['Ria Yoshizawa','Ria Yoshizawa','Trend Girls Photo Session (May 4, 2025)IMG 3909.jpg'],
 ['明日花キララ','Kirara Asuka','아스카 키라라(Kirara Asuka) 팬미팅 (1).jpg'],
 ['葵つかさ','Tsukasa Aoi','아오이츠카사(Aoi Tsukasa) 국내 팬미팅 1.jpg'],
 ['本庄鈴','Suzu Honjō',"Suzu Honjo's refreshing smile2024.jpg"],
 ['蒼井そら','Sora Aoi','Aoi Sora "Lazy Hazy Crazy" at Opening Ceremony of the 28th Tokyo International Film Festival (22241441840) (cropped).jpg'],
 ['Yua Mikami','Yua Mikami','Mikami Yua to K-POP CIMG6690 (cropped).jpg'],
 ['Kirara Asuka','Kirara Asuka','아스카 키라라(Kirara Asuka) 팬미팅 (1).jpg'],
 ['Tsukasa Aoi','Tsukasa Aoi','아오이츠카사(Aoi Tsukasa) 국내 팬미팅 1.jpg'],
 ['Sora Aoi','Sora Aoi','Aoi Sora "Lazy Hazy Crazy" at Opening Ceremony of the 28th Tokyo International Film Festival (22241441840) (cropped).jpg'],
 ['Anri Okita','Anri Okita','Anri Okita at AVN Adult Entertainment Expo 2016 (25545790092).jpg'],
 ['Hibiki Otsuki','Hibiki Ōtsuki','Otsuki Hibiki (大槻ひびき) at Tokyo Game Show 2014.jpg'],
 ['Saika Kawakita','Saika Kawakita','Saika Kawakita2025 ReadjustmentIMG 8019.jpg'],
 ['Suzu Honjo','Suzu Honjō',"Suzu Honjo's refreshing smile2024.jpg"],

 // Verified identity, Commons category, individually sourced Wikimedia Commons photo (when specified)
 ['星乃莉子','Riko Hoshino','SOD AKIHABARA JACK 2023 IMG 9480-hoshino.jpg'],
 ['逢見リカ','Rika Aimi','Trend Girls Photo Session (September 15, 2024)IMG 0370.jpg'],
 ['天宮花南','Kanan Amamiya','Kanan Amamiya IMG 6006-1.jpg'],
 ['河合あすな','Asuna Kawai','Tregal Academy Cultural Festival 2026IMG 7370.jpg'],
 ['君島みお','Mio Kimijima','Trend Girls Photo Session (September 15, 2024)IMG 7031.jpg'],
 ['小湊よつ葉','Yotsuha Kominato','SOD AKIHABARA JACK 2023 IMG 9549.jpg'],
 ['成瀬心美','Kokomi Naruse','成瀬心美.png'],
 ['森沢かな','Kana Morisawa','Movie “Blue Porno” Stage Greetings Ikebukuro Cinema Rosa IMG 9652-1.jpg'],
 ['吉高寧々','Nene Yoshitaka','Nene Yoshitaka 20260823 IMG 4325.jpg'],
 ['桜空もも','Momo Sakura','CIMG3707sakura.jpg'],
 ['涼森れむ','Remu Suzumori','Tregal Academy Cultural Festival 2026IMG 6565.jpg'],
 ['明日葉みつは','Mitsuha Ashitaba','Kindai Mahjong Swimsuit Festival (April 29, 2024)051916.jpg'],
 ['架乃ゆら','Yura Kano',"Yura Kano's stage greeting IMG 4608.jpg"],
 ['初川みなみ','Minami Hatsukawa','初川みなみCIMG4158.jpg'],
 ['広瀬なるみ','Narumi Hirose','Kindai Mahjong Swimsuit Festival 20220911 IMG 3453-1.jpg'],
 ['一乃あおい','Aoi Ichino','Tregal Academy Cultural Festival 2026IMG 7296.jpg'],
 ['七嶋舞','Mai Nanashima','Trend Girls Photo Session (September 15, 2024)IMG 9024.jpg'],
 ['ひなたなつ','Natsu Hinata','Natsu hinata 20250504.jpg'],
 ['辻井ほのか','Honoka Tsujii','Trend Girls Photo Session (May 4, 2025)IMG 1501.jpg'],
 ['七ツ森りり','Riri Nanatsumori',null],
 ['東條なつ','Natsu Tōjō','Natsu Tojo IMG 6546.jpg'],
 ['真木今日子','Kyōko Maki','UENO CIMG6084.jpg'],
 ['八掛うみ','Umi Yatsugake','Tregal Academy Cultural Festival 2026IMG 5441.jpg'],
 ['羽咲みはる','Miharu Usa','Yasuyuki Totsuka studio photo session IMG 3822.jpg'],
 ['星あんず','Anzu Hoshi',null],
 ['波多野結衣','Yui Hatano',null],
 ['大槻ひびき','Hibiki Ōtsuki',null],
 ['河北彩花','Saika Kawakita',null],
 ['AIKA','Aika (porn actress)',null],
 ['MINAMO','Minamo (porn actress)',null],
 ['JULIA','Julia (porn actress)','Julia, Japanese porn actress.jpg'],
 ['Ruri Saijo','Ruri Saijō','Saijō Ruri, 2016 (cropped).jpg'],
 ['Yui Hatano','Yui Hatano',null],
 ['MINAMO','Minamo (porn actress)',null]
];
const clean=n=>String(n||'').normalize('NFKC').normalize('NFKD').toLocaleLowerCase('en')
 .replace(/[\u0300-\u036f\s・･._\-’'()]/g,'').trim();
const curated=new Map(FIXED.map(([name,category,file])=>[clean(name),{name,category,file}]));
const lookup=new Map(),attempted=new Set(),queued=[],active=new Set();
const consent=()=>{try{return sessionStorage.getItem('yume-idols-adult-18')==='yes'}catch{return false}};
const cacheKey=name=>'yume:jav:commons:portrait:v1:'+clean(name);
function commonsSource(file){return 'https://commons.wikimedia.org/wiki/File:'+encodeURIComponent(file.replaceAll(' ','_'))}
function toPhoto(name,file,category,license='Wikimedia Commons'){
 const value={name,file,photo:'https://commons.wikimedia.org/wiki/Special:FilePath/'+encodeURIComponent(file.replaceAll(' ','_'))+'?width=920',
  source:commonsSource(file),categoryUrl:category?'https://commons.wikimedia.org/wiki/Category:'+encodeURIComponent(category.replaceAll(' ','_')):null,
  verified:true,license,alternates:[]};
 return value;
}
// Pinned, manually confirmed Wikimedia filenames; do not rely on user-supplied images.
for(const [name,category,file] of FIXED)if(file){
 const key=clean(name);
 if(!lookup.has(key))lookup.set(key,toPhoto(name,file,category,'Wikimedia Commons · pagina della fotografia'));
}
function saved(name){
 try{
  const v=JSON.parse(localStorage.getItem(cacheKey(name))||'null');
  if(v?.checked&&Date.now()-v.checked<1000*60*60*24*28&&v.photo?.verified&&v.photo?.source?.startsWith('https://commons.wikimedia.org/')){
   lookup.set(clean(name),v.photo);return v.photo;
  }
 }catch{}
 return null;
}
function get(name){
 if(!consent())return null;
 const k=clean(name);
 // The original hand-curated JPG index may have a more exact portrait.
 const original=window.YumePhotoStore?.get('japan',name);
 if(original?.verified&&original.photo)return original;
 return lookup.get(k)||saved(name)||null;
}
function api(host,params){
 params.format='json';params.origin='*';
 const url=host+'?'+new URLSearchParams(params).toString();
 return fetch(url,{mode:'cors',credentials:'omit',headers:{Accept:'application/json'}})
 .then(r=>{if(!r.ok)throw new Error('HTTP '+r.status);return r.json()});
}
const forbid=/(nude|naked|strip|genital|uncensored|explicit|sexual|intercourse|penetration|masturbat|sex scene|作品パッケージ|ヌード|全裸|裸身|性交|乳首|cover art|swimsuit festival|bikini)/i;
const avoid=/(signature|autograph|sign\.|banner|poster|promotion|videoframe|full of stars|performers| and |group photo|集合|★|ロゴ)/i;
function suitable(p){
 const file=(p.title||'').replace(/^File:/,'');
 if(!/\.(jpe?g|png|webp)$/i.test(file)||forbid.test(file)||avoid.test(file))return null;
 const info=p.imageinfo?.[0];if(!info?.thumburl&&!info?.url)return null;
 const license=info.extmetadata?.LicenseShortName?.value||'';
 const allowed=/^(CC BY(?:[- ]SA)?(?:[- ]\d(?:\.\d)?)?|CC0(?:\s\d(?:\.\d)?)?|Public domain|PD(?:-.*)?|FAL)$/i.test(license.trim());
 if(!allowed)return null;
 const w=info.width||0,h=info.height||0;if(w<260||h<280||h<w*1.12)return null;
 let score=h/w;
 if(/cropp?ed|\([^)]+\).jpg|portrait|ポートレート|[\-_](?:1|2)\.jpg/i.test(file))score+=5;
 if(/stage greetings|festival|event|awards?|文化祭|撮影会|photo session|akihabara jack|Tregal Academy|SOD AKIHABARA|IMG/i.test(file))score+=2;
 if(/porn|scene|adult video|sexy|nudity|裸/i.test(file))score-=10;
 return {file,score,license};
}
async function categoryPhoto(name,category){
 if(!category)return null;
 const j=await api('https://commons.wikimedia.org/w/api.php',{
  action:'query',generator:'categorymembers',gcmtitle:'Category:'+category,
  gcmtype:'file',gcmlimit:'45',prop:'imageinfo',iiprop:'url|extmetadata',iiurlwidth:'920',formatversion:'2'});
 const ranked=(j.query?.pages||[]).map(suitable).filter(Boolean).sort((a,b)=>b.score-a.score);
 if(!ranked.length)return null;
 return toPhoto(name,ranked[0].file,category,ranked[0].license);
}
function claim(e,prop,q){return (e?.claims?.[prop]||[]).some(c=>c?.mainsnak?.datavalue?.value?.id===q)}
function first(e,prop){return (e?.claims?.[prop]||[]).map(c=>c?.mainsnak?.datavalue?.value).find(Boolean)}
const same=(a,b)=>clean(a)===clean(b);
async function discover(name){
 // Strict exact-name matching; never identify actresses from similar search labels.
 const search=await api('https://www.wikidata.org/w/api.php',{action:'wbsearchentities',
  search:name,language:'ja',limit:'5',type:'item'});
 const ids=(search.search||[]).filter(x=>x.id&&/^Q\d+$/.test(x.id)).map(x=>x.id);
 if(!ids.length)return null;
 const r=await api('https://www.wikidata.org/w/api.php',{action:'wbgetentities',ids:ids.join('|'),
  props:'labels|aliases|descriptions|claims|sitelinks',languages:'ja|en'});
 const entities=Object.values(r.entities||{}).filter(e=>{
  if(!claim(e,'P21','Q6581072'))return false;
  if((e.claims?.P27||[]).length&&!claim(e,'P27','Q17'))return false;
  const names=[e.labels?.ja?.value,...(e.aliases?.ja||[]).map(a=>a.value)];
  if(!names.some(n=>same(n,name)))return false;
  const date=first(e,'P569')?.time;
  const match=typeof date==='string'?date.match(/^\+?(\d{4})-(\d{2})-(\d{2})/):null;
  if(match){const y=Number(match[1]),m=Number(match[2]),d=Number(match[3]);
   if(y>2008||(y===2008&&(!m||!d||m>11||(m===11&&d>8))))return false;
  } // never resolve a Wikidata identity documented as under 18
  // Only documented professional AV performers.
  const description=((e.descriptions?.ja?.value||'')+' '+(e.descriptions?.en?.value||''));
  const recognized=['Q488111','Q1079215'];
  const isAV=(e.claims?.P106||[]).some(p=>recognized.includes(p.mainsnak?.datavalue?.value?.id))
    ||/AV女優|pornographic actress|AV idol|porn actor/i.test(description);
  return isAV;
 });
 if(entities.length!==1)return null;
 const entity=entities[0];
 const image=first(entity,'P18');
 if(typeof image==='string'&&/\.(jpe?g|png|webp)$/i.test(image)&&!forbid.test(image)){
  // P18 is a sourced, individual portrait attached to the validated Wikidata identity.
  return toPhoto(name,image,null,'Wikidata P18 · Wikimedia Commons');
 }
 const commons=entity.sitelinks?.commonswiki?.title;
 const p373=first(entity,'P373');
 const category=(commons?.startsWith('Category:')?commons.slice(9):null)||(typeof p373==='string'?p373:null);
 return category?categoryPhoto(name,category):null;
}
let notifyPending=false;
function notify(){
 if(notifyPending)return;notifyPending=true;
 setTimeout(()=>{notifyPending=false;window.dispatchEvent(new CustomEvent('yume-jav-photo-update'));},120);
}
async function resolve(name){
 if(!consent())return;
 const known=curated.get(clean(name));
 let photo=null;
 if(known?.file)photo=get(name);
 try{if(!photo&&known?.category)photo=await categoryPhoto(name,known.category)}
 catch{}
 try{if(!photo)photo=await discover(name)}
 catch{}
 if(photo){
  lookup.set(clean(name),photo);
  try{localStorage.setItem(cacheKey(name),JSON.stringify({checked:Date.now(),photo}))}catch{}
  notify();
 }
}
function drain(){
 if(!consent())return;
 while(active.size<3&&queued.length){
  const n=queued.shift(),k=clean(n);
  if(active.has(k))continue;
  active.add(k);
  resolve(n).finally(()=>{active.delete(k);drain()});
 }
}
function ensure(names){
 if(!consent()||!Array.isArray(names))return;
 for(const n of names){
  const name=typeof n==='string'?n:n?.name,key=clean(name);
  if(!key||get(name)||attempted.has(key))continue;
  attempted.add(key);queued.push(name);
 }
 drain();
}
window.YumeJAVPortraits=Object.freeze({get,ensure,curatedCount:curated.size,
 sources:'Wikimedia Commons and exact-name Wikidata, professional non-explicit portrait filter',
 ageGated:true});
})();