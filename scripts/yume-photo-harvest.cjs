/* Yume: build a reusable photographic index from free Wikimedia sources.
   Exact-name Wikidata verification, with separately labeled national scenes.
   This does not download copyrighted press photos or infer real VTuber identities. */
'use strict';
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const dest=path.join(process.cwd(),'data','yume-photo-index.json');
function dataset(filename,key){
 const window={};vm.runInNewContext(fs.readFileSync(filename,'utf8'),{window},{timeout:2500});
 if(!window[key])throw Error('Dataset unavailable: '+filename);
 return window[key];
}
const sport=dataset('sport-idols-data.js','YumeSportIdols');
const asia=dataset('asia-idols-data.js','YumeAsiaIdols');
const japan=dataset('idols-discovery-data.js','YumeIdolsDiscovery');
const norm=s=>String(s||'').normalize('NFKC').normalize('NFKD').toLowerCase()
 .replace(/[\u0300-\u036f]/g,'').replace(/[髙﨑﨑]/g,c=>({'髙':'高','﨑':'崎'}[c]||c))
 .replace(/[\s・･\-_’']/g,'').trim();
const alphabet={ja:'ja',kr:'ko',cn:'zh',tw:'zh',hk:'zh',th:'th',vn:'vi',in:'hi',ph:'en',id:'id',my:'ms',sg:'en',np:'ne'};
const national={sport:['Q17'],japan:['Q17'],kr:['Q884'],cn:['Q148'],tw:['Q865'],hk:['Q8646','Q148'],th:['Q869'],vn:['Q881'],in:['Q668'],ph:['Q928'],id:['Q252'],my:['Q833'],sg:['Q334'],np:['Q837']};
const female='Q6581072',person='Q5',virtualCategories=new Set(['vtuber']);
const seedSport={'池江璃花子':'Q20973721','髙木美帆':'Q444421','角田夏実':'Q27917959','早田ひな':'Q27917566'};
const entries=[];
for(const p of sport.people)entries.push({kind:'sport',key:norm(p.name),name:p.name,alt:p.latin||'',country:'sport',group:p.disciplines.join(' '),sources:p.sources.map(x=>x.url),seed:seedSport[norm(p.name).replace(/高/g,'髙')]||null});
for(const p of asia.people){
 if(virtualCategories.has(p.category))continue;
 entries.push({kind:'asia',key:p.country+':'+norm(p.name),name:p.name,alt:p.alternate||'',country:p.nationality||p.country,group:p.groups.join(' '),sources:p.sourceIds.map(id=>asia.sources[id]?.url).filter(Boolean)});
}
const jpUnique=new Map();
for(const p of japan.people){
 if(p.category==='groups'||p.category==='vtuber'||p.category==='jav'||p.category==='adult')continue;
 const k=norm(p.name);if(k&&!jpUnique.has(k))jpUnique.set(k,{kind:'japan',key:k,name:p.name,alt:p.alternate||'',country:'japan',group:'',sources:[p.source],category:p.category});
}
entries.push(...jpUnique.values());
const stats={total:entries.length,sport:sport.people.length,asia:asia.people.filter(p=>!virtualCategories.has(p.category)).length,japan:jpUnique.size};
const old=fs.existsSync(dest)?JSON.parse(fs.readFileSync(dest,'utf8')):{};
const out={version:2,updated:new Date().toISOString(),coverage:{...(old.coverage||{})},sport:{},asia:{},japan:{},global:{...(old.global||{})},notes:old.notes||'Solo foto con corrispondenza biografica Wikidata e licenza compatibile da Commons/Wikipedia; nessuna foto di repertorio copiata.'};
for(const k of ['sport','asia','japan'])Object.assign(out[k],old[k]||{});
// Preserve manually curated international Young Stars photos across scheduled harvests.
const headers={'User-Agent':'YumePhotoResearch/1.1 (noncommercial public GitHub Pages gallery; github.com/xuthar/yume-anime-manga)','Accept':'application/json'};
const sleep=t=>new Promise(resolve=>setTimeout(resolve,t));
let apiCount=0,failures=0;
async function get(url,tries=3){
 for(let i=0;i<tries;i++){
  const ac=new AbortController(),timer=setTimeout(()=>ac.abort(),16000);
  try{
   const r=await fetch(url,{headers,signal:ac.signal});
   if(!r.ok){if([429,502,503,504].includes(r.status)&&i<tries-1){await sleep(700*(i+1)*(i+1));continue}throw Error('HTTP '+r.status)}
   apiCount++;return await r.json()
  }catch(e){if(i===tries-1){failures++;return null}await sleep(420*(i+1))}
  finally{clearTimeout(timer)}
 }
 return null
}
const api=(host,params)=>'https://'+host+'/w/api.php?'+new URLSearchParams({action:'query',format:'json',formatversion:'2',origin:'*',...params});
const candidates=new Map();
function offer(entry,qid,thumb,pageurl,source){
 if(!/^Q\d+$/.test(qid))return;
 const row=candidates.get(qid)||{profiles:new Set(),thumbs:[],pages:[]};
 row.profiles.add(entry);
 if(thumb&&thumb.startsWith('https://')&&!row.thumbs.includes(thumb))row.thumbs.push(thumb);
 if(pageurl&&!row.pages.some(p=>p.url===pageurl))row.pages.push({url:pageurl,source});
 candidates.set(qid,row);
}
function titlesFor(p){
 const names=[p.name,p.alt].filter(Boolean).map(x=>x.trim());
 if(p.country==='sport'||p.country==='japan')names.unshift(p.name.replace(/\s+/g,''));
 return [...new Set(names.filter(x=>x.length>=2).slice(0,3))];
}
async function collectWiki(){
 const langs=new Map();
 for(const p of entries){
  const lang=p.kind==='sport'||p.kind==='japan'?'ja':alphabet[p.country]||'en';
  for(const title of titlesFor(p)){
   if(!langs.has(lang))langs.set(lang,new Map());
   const key=norm(title);
   if(!langs.get(lang).has(key))langs.get(lang).set(key,{title,profiles:new Set()});
   langs.get(lang).get(key).profiles.add(p)
  }
 }
 for(const [lang,lookup] of langs){
  const list=[...lookup.values()];
  for(let i=0;i<list.length;i+=30){
   const batch=list.slice(i,i+30);
   const url=api(lang+'.wikipedia.org',{prop:'pageprops|pageimages',ppprop:'wikibase_item',piprop:'thumbnail',pithumbsize:'480',pilicense:'free',redirects:'1',titles:batch.map(x=>x.title).join('|')});
   const data=await get(url);
   if(!data){await sleep(140);continue}
   const aliases=new Map();
   for(const x of [...(data.query?.normalized||[]),...(data.query?.redirects||[])])
    aliases.set(norm(x.from),norm(x.to));
   for(const page of data.query?.pages||[]){
    if(page.missing||!page.pageprops?.wikibase_item)continue;
    const pagekey=norm(page.title),matched=[];
    for(const [key,v] of lookup)if(key===pagekey||aliases.get(key)===pagekey||aliases.get(aliases.get(key))===pagekey)
     for(const p of v.profiles)matched.push(p);
    for(const p of matched)offer(p,page.pageprops.wikibase_item,page.thumbnail?.source||null,
       'https://'+lang+'.wikipedia.org/wiki/'+encodeURIComponent(page.title.replace(/ /g,'_')),lang+'wiki');
   }
   await sleep(150)
  }
 }
}
async function collectSearch(){
 // Wikipedia page titles will identify most documented people. Use a narrow
 // fallback for romanized names not present in local Wikipedia.
 let remaining=entries.filter(p=>![...candidates.values()].some(c=>c.profiles.has(p)));
 remaining.sort((a,b)=>Number(b.kind==='sport')-Number(a.kind==='sport'));
 const maxSearch=Math.min(remaining.length,550);
 for(const p of remaining.slice(0,maxSearch)){
  const title=p.alt&&p.alt.length>4?p.alt:p.name;
  if(!title||norm(title).length<6)continue;
  const lang=p.kind==='sport'?'ja':p.kind==='japan'?'ja':'en';
  const url='https://www.wikidata.org/w/api.php?'+new URLSearchParams({action:'wbsearchentities',format:'json',origin:'*',language:lang,uselang:lang,limit:'5',search:title});
  const data=await get(url,2);
  for(const hit of data?.search||[])if(/^Q\d+$/.test(hit.id))offer(p,hit.id,null,null,'Wikidata search');
  await sleep(120)
 }
}
function has(e,prop,qids){return (e?.claims?.[prop]||[]).some(c=>qids.includes(c.mainsnak?.datavalue?.value?.id))}
function dateYears(e){const v=(e?.claims?.P569||[]).map(c=>c.mainsnak?.datavalue?.value).find(x=>x?.time);return v?.time?.match(/\+?(\d{4})-/)?.[1]||null}
function verify(e,p){
 if(e?.type!=='item'||!has(e,'P31',[person])||!has(e,'P21',[female]))return false;
 const nations=national[p.country];if(!nations||!has(e,'P27',nations))return false;
 const labels=Object.values(e.labels||{}).map(x=>x.value),aliases=Object.values(e.aliases||{}).flatMap(x=>x.map(y=>y.value));
 const good=[p.name,p.alt].filter(Boolean).map(norm);
 if(![...labels,...aliases].some(x=>good.includes(norm(x))))return false;
 // One-word English idol stage names have many homonyms. Group must appear
 // in source descriptions or the name must be a longer distinctive name.
 const n=norm(p.name);
 if(p.kind==='asia'&&!/[\u3400-\u9fff\uac00-\ud7af\u0e00-\u0e7f]/.test(p.name)&&n.length<9){
  const allDesc=Object.values(e.descriptions||{}).map(x=>x.value).join(' ').toLowerCase();
  const groups=p.group.split(' / ');
  if(!groups.some(x=>x.length>3&&allDesc.includes(x.toLowerCase())))return false;
 }
 if(p.kind==='japan'&&(p.category==='gravure'||p.category==='cosplay')){
  // Avoid putting adult-oriented media next to anyone whose age is unknown or minor.
  const y=dateYears(e);
  if(!y||new Date().getFullYear()-Number(y)<18)return false;
 }
 return true
}
const mediaFileIds=new Map();
const imageByQid=new Map();
function photoFile(e){
 const vals=(e.claims?.P18||[]).map(c=>c.mainsnak?.datavalue?.value);
 return vals.find(x=>typeof x==='string'&&/\.(jpe?g|png|webp)$/i.test(x))||null;
}
function addResult(p,entity,sourceHint){
 const curated=out[p.kind]?.[p.key];
  // Never overwrite individually matched Commons photographs with an unreviewed search result.
  if(curated?.verified&&(curated.photoIdentitySource||curated.adultOnly||curated.verifiedAt))return;
  const file=photoFile(entity),found=imageByQid.get(entity.id);
 const record={qid:entity.id,name:p.name,photo:null,alternates:[],file:file||null,
  source:file?'https://commons.wikimedia.org/wiki/File:'+encodeURIComponent(file.replace(/^File:/i,'')):sourceHint||null,
  license:'Wikimedia Commons / Wikipedia file: consultare la pagina del file per autore e condizioni',verified:true};
 if(found?.photo)record.photo=found.photo;
 if(found?.others?.length)record.alternates=found.others.slice(0,3);
 if(!record.photo&&file)record.photo='https://commons.wikimedia.org/wiki/Special:FilePath/'+encodeURIComponent(file.replace(/^File:/i,''))+'?width=480';
 if(!record.photo)return;
 out[p.kind][p.key]=record;
}
async function resolveEntities(){
 const qs=[...candidates.keys()],verified=[];
 for(let i=0;i<qs.length;i+=28){
  const batch=qs.slice(i,i+28);
  const url='https://www.wikidata.org/w/api.php?'+new URLSearchParams({action:'wbgetentities',format:'json',origin:'*',
      props:'labels|aliases|descriptions|claims|sitelinks',languages:'ja|en|zh|ko|th|vi|id|ms|hi|ne',ids:batch.join('|')});
  const data=await get(url);if(!data)continue;
  for(const id of batch){
   const e=data.entities?.[id],c=candidates.get(id);if(!e||!c)continue;
   const eligible=[...c.profiles].filter(p=>verify(e,p));
   if(!eligible.length)continue;
   verified.push({e,profiles:eligible,thumbs:c.thumbs,pages:c.pages});
   const file=photoFile(e);
   if(file){
    const t='File:'+file.replace(/^File:/i,'');
    if(!mediaFileIds.has(t))mediaFileIds.set(t,[]);
    mediaFileIds.get(t).push(e.id)
   }
  }
  await sleep(180)
 }
 // Batch exact Commons P18 file names; thumbnail is generally faster than Special:FilePath.
 const fileNames=[...mediaFileIds.keys()];
 for(let i=0;i<fileNames.length;i+=30){
  const batch=fileNames.slice(i,i+30);
  const data=await get(api('commons.wikimedia.org',{prop:'imageinfo',iiprop:'url',iiurlwidth:'480',titles:batch.join('|')}));
  for(const page of data?.query?.pages||[]){
   const info=page.imageinfo?.[0];if(!info)continue;
   for(const qid of mediaFileIds.get(page.title)||[]){
    const record=imageByQid.get(qid)||{photo:null,others:[]};
    if(info.thumburl)record.photo=info.thumburl;
    if(info.url&&info.url!==record.photo)record.others.push(info.url);
    imageByQid.set(qid,record)
   }
  }
  await sleep(180)
 }
 // Use Commons categories explicitly bound to the subject as a second free-photo source.
 let categoryCalls=0;
 for(const item of verified){
  const {e,profiles}=item;
  if(photoFile(e))continue;
  const category=e.claims?.P373?.map(c=>c.mainsnak?.datavalue?.value).find(x=>typeof x==='string')||null;
  if(!category||categoryCalls>=180)continue;
  categoryCalls++;
  const data=await get(api('commons.wikimedia.org',{generator:'categorymembers',gcmtype:'file',gcmlimit:'18',gcmtitle:'Category:'+category,prop:'imageinfo',iiprop:'url',iiurlwidth:'480'}),2);
  const files=(data?.query?.pages||[]).filter(page=>/\.(jpe?g|png|webp)$/i.test(page.title||'')&&page.imageinfo?.[0]?.thumburl);
  for(const p of profiles){
   const matches=files.filter(file=>[p.name,p.alt,category].some(n=>norm(n).length>=6&&norm(file.title).includes(norm(n))));
   const chosen=matches[0];if(!chosen)continue;
   const record=imageByQid.get(e.id)||{photo:null,others:[]};
   record.photo=chosen.imageinfo[0].thumburl;
   imageByQid.set(e.id,record);
   item.categoryFile=chosen.title.replace(/^File:/i,'')
  }
  await sleep(180)
 }
 for(const {e,profiles,thumbs,pages,categoryFile} of verified){
  if(!imageByQid.has(e.id)&&thumbs.length)imageByQid.set(e.id,{photo:thumbs[0],others:thumbs.slice(1,4)});
  if(!imageByQid.has(e.id))continue;
  for(const p of profiles){
   addResult(p,e,pages[0]?.url||null);
   const record=out[p.kind][p.key];
   if(record&&categoryFile&&!record.file){
    record.file=categoryFile;
    record.source='https://commons.wikimedia.org/wiki/File:'+encodeURIComponent(categoryFile)
   }
  }
 }
}
async function main(){
 console.log('Yume photo index: '+JSON.stringify(stats)+' profiles.');
 await collectWiki();
 console.log('Wikipedia photo candidates: '+candidates.size);
 await collectSearch();
 console.log('All candidate Wikidata identities: '+candidates.size);
 await resolveEntities();
 const coverage={};
 for(const kind of ['sport','asia','japan'])coverage[kind]={photos:Object.keys(out[kind]).length,total:stats[kind]};
 out.coverage={...(old.coverage||{}),...coverage,global:{photos:Object.keys(out.global||{}).length,total:Object.keys(out.global||{}).length,notes:'International Young Stars photographs retained from the curated photo index.'}};
 fs.mkdirSync(path.dirname(dest),{recursive:true});
 fs.writeFileSync(dest,JSON.stringify(out,null,2)+'\n');
 const report={generated:out.updated,stats,coverage,apiRequests:apiCount,failedRequests:failures};
 fs.writeFileSync('data/yume-photo-report.json',JSON.stringify(report,null,2)+'\n');
 console.log('Yume verified image coverage: '+JSON.stringify(report));
}
main().catch(e=>{console.error(e);process.exitCode=1});
