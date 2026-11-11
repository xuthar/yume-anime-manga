/* Recover hololive-owned talent illustrations by visiting only hololive official
 * talent pages. Store URLs + attribution, NEVER copy image bytes.
 * Each result requires a matching official profile heading and an image
 * rendered in that profile, not a guessed path or search thumbnail.
 */
const {chromium}=require('playwright');
const fs=require('node:fs/promises');
const targets=require('../data/yume-hololive-photo-targets.json').targets;
const normalize=s=>String(s||'').normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]/g,'');
const overrides={
 'La+ Darknesss':'laplus-darknesss', "Ninomae Ina'nis":'ninomae-inanis',
 'AZKi':'azki','IRyS':'irys','Robocosan':'robocosan','Oozora Subaru':'oozora-subaru',
 'Ookami Mio':'ookami-mio','Houshou Marine':'houshou-marine',
 'Juufuutei Raden':'juufuutei-raden','Ichijou Ririka':'ichijou-ririka',
 'Amane Kanata':'amane-kanata'
};
const slug=name=>overrides[name]||name.normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/['’]/g,'').replace(/\+/g,'plus').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const source=name=>'https://hololive.hololivepro.com/en/talents/'+slug(name)+'/';
const allowed=(u)=>{try{const v=new URL(u);return v.protocol==='https:'&&(/(^|\.)hololivepro\.com$/.test(v.hostname)||/(^|\.)hololive\.hololivepro\.com$/.test(v.hostname))&&/\.(png|jpe?g|webp)(?:$|\?)/i.test(v.pathname+v.search)}catch{return false}};
async function candidate(page,name){
 return await page.evaluate((name)=>{
  const n=s=>String(s||'').toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f\s._'+’]/g,'');
  const headline=[...document.querySelectorAll('h1,h2')].map(x=>x.textContent).join(' ');
  const checked=n(headline).includes(n(name))||n(document.title).includes(n(name));
  const imgs=[...document.querySelectorAll('img')].map((el,i)=>{
   const rect=el.getBoundingClientRect();
   const url=el.currentSrc||el.getAttribute('data-src')||el.getAttribute('src')||'';
   const alt=el.alt||'';
   const classnames=(el.className?.baseVal||el.className||'')+' '+(el.closest('section,article,div')?.className||'');
   let score=0;
   if(n(alt).includes(n(name)))score+=60;
   if(/talent|character|visual|profile|kv|chara|main/i.test(String(classnames)))score+=22;
   if(/(?:talent|character|profile|chara|立ち絵)/i.test(url))score+=18;
   if(el.naturalHeight>300&&el.naturalWidth>180)score+=10;
   if(el.naturalHeight>el.naturalWidth*1.05)score+=10;
   if(rect.height>320)score+=6;
   if(/logo|icon|banner|header|footer|sns|thumb|twitter|youtube|instagram/i.test(url+' '+classnames))score-=40;
   if(url.includes('default'))score-=20;
   return {i,url,alt,width:el.naturalWidth,height:el.naturalHeight,score,classnames:String(classnames).slice(0,120)};
  }).sort((a,b)=>b.score-a.score);
  const headings=[...document.querySelectorAll('h1,h2')].map(x=>x.textContent.trim()).slice(0,8);
  return {checked,headings,imgs:imgs.slice(0,8)};
 },name);
}
(async()=>{
 const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
 const ctx=await browser.newContext({userAgent:'Mozilla/5.0 (compatible; YumeIdolsPhotoAudit/1.0)',viewport:{width:1280,height:900}});
 let previous={};try{previous=JSON.parse(await fs.readFile('data/yume-hololive-official-portraits.json','utf8')).profiles||{}}catch{}
 const found={source:'hololive production TALENT official pages',sourceUrl:'https://hololive.hololivepro.com/en/talents',generated:new Date().toISOString(),license:'© COVER Corp. · official promotional artwork, linked from origin; not a free license',profiles:{...previous}};
 const review=[];
 try{
  for(const [i,name] of targets.entries()){
   const url=source(name),page=await ctx.newPage();
   try{
    await page.goto(url,{waitUntil:'domcontentloaded',timeout:26000});
    await page.waitForTimeout(350);
    const result=await candidate(page,name);
    const picks=result.imgs.filter(x=>allowed(x.url)&&x.width>=180&&x.height>=240&&x.score>=20&&x.height>=x.width*0.8);
    const best=picks[0];
    const item={name,source:url,status:page.url().includes('/talents/')&&result.checked?'profile_found':'unconfirmed',headings:result.headings,picks:result.imgs.slice(0,4)};
    if(best&&item.status==='profile_found'){
     item.status='portrait_found';
     found.profiles[name]={photo:best.url,source:url,license:'© COVER Corp. · official talent portrait',verified:true,characterArtwork:true,sourceLabel:'hololive · ritratto ufficiale'};
    }
    review.push(item);
   }catch(err){review.push({name,source:url,status:'error',error:String(err).slice(0,220)})}
   finally{await page.close()}
   if((i+1)%10===0)console.log('Processed',i+1,'/',targets.length,'matches',Object.keys(found.profiles).length);
  }
 }finally{await browser.close()}
 await fs.mkdir('data',{recursive:true});
 await fs.writeFile('data/yume-hololive-official-portraits.json',JSON.stringify(found,null,2)+'\n');
 await fs.writeFile('data/yume-hololive-portrait-audit.json',JSON.stringify({date:new Date().toISOString(),total:targets.length,matched:Object.keys(found.profiles).length,review},null,2)+'\n');
 console.log('COMPLETE',targets.length,Object.keys(found.profiles).length);
 if(!Object.keys(found.profiles).length)process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1});
