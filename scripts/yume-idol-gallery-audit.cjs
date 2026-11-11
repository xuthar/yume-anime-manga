/* Visual Yume Idols QA: opens the actual gallery in Chromium and captures
 * non-explicit, age-gated screenshots for review. Does not identify people via face recognition.
 * Run: npm install --no-save playwright && npx playwright install chromium
 *      node scripts/yume-idol-gallery-audit.cjs
 */
const { chromium } = require('playwright');
const { spawn } = require('node:child_process');
const fs = require('node:fs/promises');
const path = require('node:path');
const PORT = Number(process.env.AUDIT_PORT || 8765);
const CATEGORIES = (process.env.AUDIT_CATEGORIES || 'gravure,jav,music,creators,cosplay,fashion,vtuber,adult,onlyfans')
  .split(',').map(s => s.trim()).filter(Boolean);
const MAX = Math.max(1, Math.min(5000, Number(process.env.AUDIT_MAX_CARDS || 96)));
const OFFSET = Math.max(0, Number(process.env.AUDIT_OFFSET || 0));
const SHOT_LIMIT = Math.max(0, Math.min(80, Number(process.env.AUDIT_SCREENSHOTS || 24)));
const OUT = path.join(process.cwd(), 'artifacts', 'yume-idol-photo-audit');
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
async function startServer() {
 const p = spawn('python3', ['-m', 'http.server', String(PORT), '--bind', '127.0.0.1'], {stdio:'ignore'});
 for(let i=0;i<60;i++) {
  try { const response = await fetch('http://127.0.0.1:'+PORT+'/idol-category.html'); if(response.ok)return p; }
  catch{}
  await sleep(350);
 }
 p.kill();throw Error('Yume local HTTP server did not start');
}
function nameFrom(card) {
 return card.querySelector('h3')?.textContent?.trim() || 'unknown';
}
async function reviewCategory(browser, category, report) {
 const context = await browser.newContext({ viewport:{width:1280,height:960}, deviceScaleFactor:1 });
 // Only an isolated automated QA browser session; original site's gate remains unchanged.
 await context.addInitScript(() => sessionStorage.setItem('yume-idols-adult-18', 'yes'));
 const page = await context.newPage();
 const entry = {category, checked:0, loaded:0, unloaded:0, noPhoto:0, failures:[], samples:[], totalReported:null, note:null};
 report.categories.push(entry);
 try {
  await page.goto('http://127.0.0.1:'+PORT+'/idol-category.html?section='+encodeURIComponent(category), {waitUntil:'domcontentloaded',timeout:40000});
  await page.locator('.discovery-card').first().waitFor({timeout:25000});
  let target = OFFSET + MAX;
  const more = page.locator('#discovery-more');
  let previous = 0;
  for(let n=0;n<Math.ceil(target/48)+3;n++){
   const current=await page.locator('.discovery-card').count();
   if(current>=target||await more.isHidden()||current===previous&&n>1)break;
   previous=current;
   await more.click({timeout:8000});
   await sleep(200);
  }
  const totalCards = await page.locator('.discovery-card').count();
  entry.totalReported=await page.locator('#discovery-summary').textContent().catch(()=>null);
  const end=Math.min(totalCards,target);
  for(let start=OFFSET;start<end;start+=12){
   const last=Math.min(end,start+12)-1;
   const locator=page.locator('.discovery-card').nth(last);
   await locator.scrollIntoViewIfNeeded({timeout:8000}).catch(()=>{});
   await sleep(1300);
   const cards=await page.locator('.discovery-card').evaluateAll((nodes,args)=>
    nodes.slice(args.start,args.end).map((c,k)=>{
     const img=c.querySelector('img');
     const placeholder=c.querySelector('.discovery-portrait.is-unavailable');
     return {index:args.start+k,name:c.querySelector('h3')?.textContent?.trim()||'?',hasImage:!!img,src:img?.currentSrc||img?.src||null,loaded:!!img?.complete&&img.naturalWidth>=180&&img.naturalHeight>=240,width:img?.naturalWidth||0,height:img?.naturalHeight||0,placeholder:!!placeholder,missing:!img||!!placeholder}
    }),{start,end:last+1});
   for(const c of cards){
    entry.checked++;
    if(c.loaded)entry.loaded++;else if(c.hasImage)entry.unloaded++;else entry.noPhoto++;
    if(!c.loaded)entry.failures.push(c);
   }
   if(entry.samples.length<SHOT_LIMIT){
    // Cards are captured with their title for human identity/visual review.
    const card=page.locator('.discovery-card').nth(last);
    const base=path.join(OUT,category);
    await fs.mkdir(base,{recursive:true});
    const filename='cards-'+String(start+1).padStart(4,'0')+'-'+String(last+1).padStart(4,'0')+'.png';
    // Screenshot the visible window, which includes the just-scrolled cards.
    await page.screenshot({path:path.join(base,filename),fullPage:false,animations:'disabled'}).catch(()=>{});
    entry.samples.push(filename);
   }
  }
  entry.note='A loaded image is NOT confirmation that it depicts the correct performer. Human review of captured screenshots is required.';
 }catch(err){entry.error=String(err)}
 finally{await context.close()}
}
(async()=>{
 await fs.mkdir(OUT,{recursive:true});
 const server=await startServer();
 let browser;
 try {
  browser=await chromium.launch({headless:true,args:['--no-sandbox']});
  const report={generated:new Date().toISOString(),status:'automated image-load and screenshot audit, not identity verification',offset:OFFSET,maxCardsPerCategory:MAX,categories:[]};
  for(const category of CATEGORIES)await reviewCategory(browser,category,report);
  await fs.writeFile(path.join(OUT,'report.json'),JSON.stringify(report,null,2));
  const summary=report.categories.map(x=>[x.category,x.checked,x.loaded,x.unloaded,x.noPhoto,x.error||''].join(','));
  await fs.writeFile(path.join(OUT,'summary.csv'),'category,checked,loaded,unloaded,noPhoto,error\n'+summary.join('\n')+'\n');
  process.stdout.write(JSON.stringify(report.categories.map(({category,checked,loaded,unloaded,noPhoto,error})=>({category,checked,loaded,unloaded,noPhoto,error})),null,2)+'\n');
 } finally {await browser?.close();server.kill()}
})().catch(e=>{console.error(e);process.exitCode=1});
