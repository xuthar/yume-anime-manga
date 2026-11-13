/*
 * Audits Yume's curated Commons portrait index. It checks public image URLs,
 * reads current Commons attribution/license metadata and cross-checks linked
 * Wikidata entities. It never performs face recognition or guesses identity.
 * Run with --write to refresh verified file metadata and save a dated report.
 */
'use strict';
const fs = require('node:fs/promises');
const path = require('node:path');
const ROOT = path.resolve(__dirname, '..');
const INDEX = path.join(ROOT, 'data/yume-photo-index.json');
const REPORT = path.join(ROOT, 'data', `yume-idols-photo-audit-${new Date().toISOString().slice(0,10)}.json`);
const WRITE = process.argv.includes('--write');
const CHECK_IMAGES = process.argv.includes('--check-images');
const UA = 'YumeIdolsPhotoAudit/1.0 (https://github.com/xuthar/yume-anime-manga)';
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const chunks = (xs, n) => Array.from({length: Math.ceil(xs.length / n)}, (_, i) => xs.slice(i*n, (i+1)*n));
const norm = s => String(s || '').normalize('NFKC').normalize('NFKD').replace(/[\u0300-\u036f\s・･._'’()\-]/g, '').toLowerCase();
async function json(url) {
  let last;
  for (let i=0; i<4; i++) {
    try {
      const r = await fetch(url, {headers:{'user-agent':UA}, signal:AbortSignal.timeout(20000)});
      const body = await r.text();
      if (!r.ok || !body.trim().startsWith('{')) throw new Error(`HTTP ${r.status}: ${body.slice(0,100)}`);
      return JSON.parse(body);
    } catch (e) { last=e; if (i<3) await sleep(700*(i+1)); }
  }
  throw last;
}
function fileFromUrl(raw) {
  if (!raw) return null;
  try {
    const u = new URL(raw);
    const parts = u.pathname.split('/').filter(Boolean);
    let name = null;
    if (parts.includes('thumb')) name = parts[parts.indexOf('thumb') + 3];
    else if (parts.includes('FilePath')) name = parts[parts.indexOf('FilePath') + 1];
    else if (/^File:/i.test(decodeURIComponent(parts.at(-1) || ''))) name = decodeURIComponent(parts.at(-1)).replace(/^File:/i,'');
    return name ? decodeURIComponent(name).replace(/^\d+px-/,'') : null;
  } catch { return null; }
}
function clean(value) { return String(value || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g,' ').trim(); }
function mediaKey(value) { return norm(String(value || '').replace(/^File:/i,'').replaceAll('_',' ')); }
function licenseAllowed(s) {
  return /^(CC BY(?:[- ]SA)?(?:[- ]\d+(?:\.\d+)?)(?:\s+[A-Z]{2})?|CC0(?:\s\d+(?:\.\d+)?)?|Public domain|PD(?:[- ].*)?|FAL)$/i.test(s || '');
}
async function main() {
  const data = JSON.parse(await fs.readFile(INDEX,'utf8'));
  const rows=[];
  for (const section of ['sport','asia','japan','global']) for (const [key, record] of Object.entries(data[section] || {})) {
    const file = record.file || fileFromUrl(record.photo);
    rows.push({section,key,record,file});
  }
  const byFile = new Map();
  for (const row of rows) if (row.file) { const list=byFile.get(row.file)||[]; list.push(row); byFile.set(row.file,list); }
  const issues=[]; let commonsLive=0, licenseMissing=0, authorMissing=0, disallowed=0;
  for (const batch of chunks([...byFile.keys()],30)) {
    const u='https://commons.wikimedia.org/w/api.php?'+new URLSearchParams({action:'query',format:'json',formatversion:'2',prop:'imageinfo',iiprop:'url|size|extmetadata',iiurlwidth:'700',titles:batch.map(x=>'File:'+x).join('|')});
    const result=await json(u);
    const pages=new Map((result.query?.pages||[]).map(p=>[mediaKey(p.title),p]));
    for (const file of batch) {
      const page=pages.get(mediaKey(file)), info=page?.imageinfo?.[0];
      for (const row of byFile.get(file)||[]) {
        const x=row.record;
        if (!page || page.missing || !info) { issues.push({section:row.section,name:x.name||row.key,file,kind:'commons-file-missing'}); continue; }
        commonsLive++;
        const license=clean(info.extmetadata?.LicenseShortName?.value);
        const author=clean(info.extmetadata?.Artist?.value);
        const credit=clean(info.extmetadata?.Credit?.value);
        const licenseUrl=clean(info.extmetadata?.LicenseUrl?.value);
        if (!license) licenseMissing++;
        else if (!licenseAllowed(license)) { disallowed++; issues.push({section:row.section,name:x.name||row.key,file,kind:'license-review-required',license}); }
        if (!author) authorMissing++;
        if (WRITE && license && author) {
          x.file=file; x.photo=info.thumburl || x.photo; x.source=info.descriptionurl || 'https://commons.wikimedia.org/wiki/File:'+encodeURIComponent(file.replaceAll(' ','_'));
          x.license=license; x.author=author; x.credit=credit || author; x.licenseUrl=licenseUrl || null;
          x.width=info.width || null; x.height=info.height || null; x.rightsCheckedAt=new Date().toISOString();
        }
      }
    }
    await sleep(400);
  }
  for (const row of rows) if (!row.file) issues.push({section:row.section,name:row.record.name||row.key,kind:'portrait-file-unknown'});

  const qids=[...new Set(rows.map(r=>r.record.qid).filter(Boolean))];
  const identityByQid=new Map(); let qidsChecked=0,identityMismatch=0,portraitClaimMatches=0;
  for (const batch of chunks(qids,30)) {
    const u='https://www.wikidata.org/w/api.php?'+new URLSearchParams({action:'wbgetentities',format:'json',props:'labels|aliases|claims',languages:'en|ja',ids:batch.join('|')});
    const result=await json(u);
    for (const qid of batch) identityByQid.set(qid,result.entities?.[qid]||null);
    await sleep(400);
  }
  for (const row of rows) {
    const r=row.record; if (!r.qid) continue; qidsChecked++;
    const e=identityByQid.get(r.qid);
    const female=(e?.claims?.P21||[]).some(c=>c.mainsnak?.datavalue?.value?.id==='Q6581072');
    const labels=[...Object.values(e?.labels||{}).map(x=>x.value),...Object.values(e?.aliases||{}).flatMap(a=>a.map(x=>x.value))];
    const nameMatch=labels.some(x=>norm(x)===norm(r.name||row.key));
    const imageClaim=(e?.claims?.P18||[]).map(c=>c.mainsnak?.datavalue?.value).filter(Boolean);
    const claimMatch=!!row.file && imageClaim.some(x=>norm(x.replace(/^File:/i,''))===norm(row.file));
    if (claimMatch) portraitClaimMatches++;
    if (!female || (!nameMatch && !claimMatch)) {
      identityMismatch++;
      issues.push({section:row.section,name:r.name||row.key,qid:r.qid,kind:'wikidata-identity-review',female,nameMatch,claimMatch});
    }
    if (WRITE) r.identityCheck={qid:r.qid,female,nameMatch,portraitClaimMatches:claimMatch,checkedAt:new Date().toISOString()};
  }

  let imageUrlsChecked=0,imageUrlsLive=0;
  const urls=CHECK_IMAGES ? [...new Set(rows.map(r=>r.record.photo).filter(Boolean))] : [];
  for (const group of chunks(urls,32)) {
    const results=await Promise.all(group.map(async url=>{
      imageUrlsChecked++;
      try { const r=await fetch(url,{method:'HEAD',headers:{'user-agent':UA},signal:AbortSignal.timeout(7000)}); return r.ok; }
      catch { return false; }
    }));
    imageUrlsLive+=results.filter(Boolean).length;
  }
  const summary={records:rows.length,recordsWithImage:rows.filter(r=>r.record.photo).length,commonsFilesLive:commonsLive,commonsFilesMissing:issues.filter(x=>x.kind==='commons-file-missing').length,recordsMissingLicenseMetadata:licenseMissing,recordsMissingAuthorMetadata:authorMissing,nonReusableOrUnclassifiedLicenses:disallowed,wikidataRelationsChecked:qidsChecked,wikidataIdentityReviews:identityMismatch,directP18PhotoMatches:portraitClaimMatches,imageUrlsChecked,imageUrlsResponding:imageUrlsLive};
  const report={generated:new Date().toISOString(),scope:'Curated data/yume-photo-index.json (sport, Asia, Japan and global public portrait records). This is a source and URL audit, not visual facial identity verification.',summary,limitations:['Profiles without indexed portraits are not represented in this file-level audit.','A successful HTTP response does not prove a photograph visually depicts its named subject.','Identity is supported by Wikidata or a manually recorded Commons category/file source; uncertain matches are not auto-added.'],issues};
  if (WRITE) {
    data.updated=new Date().toISOString();
    await fs.writeFile(INDEX,JSON.stringify(data,null,2)+'\n');
    await fs.writeFile(REPORT,JSON.stringify(report,null,2)+'\n');
  }
  console.log(JSON.stringify(report,null,2));
}
main().catch(e=>{console.error(e);process.exitCode=1});
