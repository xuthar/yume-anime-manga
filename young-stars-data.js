/* Yume Young Stars · teen artists and athletes from cited, public professional sources.
   Allowed ages: 10–19 (local UTC date); under-13 channel coverage is family-operated and strictly professional, non-sexual categories only.
   Never include gravure, JAV, adult, adult/social glamour or unverifiable ages. */
(()=>{'use strict';
 const jp=window.YumeIdolsDiscovery,asia=window.YumeAsiaIdols,sports=window.YumeSportIdols;
 if(!jp||!asia||!sports)return;
 const min=10,max=19,today=new Date();
 const year=today.getUTCFullYear(),month=today.getUTCMonth()+1,day=today.getUTCDate();
 const normalize=t=>String(t||'').normalize('NFKC').replace(/[髙﨑]/g,x=>({'髙':'高','﨑':'崎'}[x]||x)).replace(/\s/g,'').toLowerCase();
 const dateAge=str=>{
  if(!/^\d{4}-\d{2}-\d{2}$/.test(str||''))return null;
  const [y,m,d]=str.split('-').map(Number),dt=new Date(Date.UTC(y,m-1,d));
  if(dt.getUTCFullYear()!==y||dt.getUTCMonth()+1!==m||dt.getUTCDate()!==d)return null;
  return year-y-(month<m||(month===m&&day<d)?1:0);
 };
 const yearAge=y=>{
  if(!Number.isInteger(y)||y<1900)return null;
  const oldest=year-y,youngest=oldest-1;
  return youngest>=min&&oldest<=max?{min:youngest,max:oldest}:null;
 };
 const safeSource=url=>typeof url==='string'&&url.startsWith('https://')?url:null;
 const results=new Map();
 function add(raw){
  const age=raw.birth?dateAge(raw.birth):null;
  const ages=age!=null?{min:age,max:age}:raw.birthYear?yearAge(raw.birthYear):null;
  if(!ages||ages.min<min||ages.max>max)return;
  if(!['music','fashion','sport','creators','acting'].includes(raw.category))return;
  const key=raw.scene+':'+normalize(raw.name);
  if(results.has(key))return;
  results.set(key,{...raw,key,age:ages.min===ages.max?ages.min:null,ageRange:ages,
   source:safeSource(raw.source)||'',birthDate:raw.birth||null,birthYear:raw.birthYear||null})
 }
 for(const p of jp.people){
  // Curated young musicians / conventional fashion models. Never derive teen status
  // from gravure, adult, doujin or adult performer catalog names.
  if(!p.teenSafe||!['music','fashion'].includes(p.category)||!p.birth)continue;
  add({name:p.name,alternate:p.alternate,scene:'jp',collection:'Idols Giappone',category:p.category,
   group:p.group||(p.category==='fashion'?'Seventeen':''),birth:p.birth,
   source:p.source,sourceLabel:p.sourceLabel||'Profilo ufficiale',archive:'japan'})
 }
 for(const p of asia.people){
  if(!p.birth&&!p.birthYear)continue;
  if(!['music','actors','creators','fashion','sport'].includes(p.category))continue;
  if(p.category==='vtuber'||(p.groups||[]).some(g=>/jav|adult|gravure/i.test(g)))continue;
  const src=(p.verifiedBirthSource||asia.sources[p.sourceIds?.[0]]?.url||'');
  add({name:p.name,alternate:p.alternate,scene:p.country,collection:'Asia Idols',
   category:p.category==='actors'?'acting':p.category,birth:p.birth,birthYear:p.birthYear,
   group:p.groups?.[0]||'',source:src,sourceLabel:asia.sources[p.sourceIds?.[0]]?.title||'Profilo artista',
   archive:'asia',nationality:p.nationality||null})
 }
 for(const p of (window.YumeYoungSpotlight?.people||[])){
  add({...p,sourceLabel:p.sourceLabel||'Scheda pubblica',archive:p.archive||'global'});
 }
 for(const p of sports.people){
  if(!p.teenSafe||!p.birth)continue;
  add({name:p.name,alternate:p.latin,scene:'jp',collection:'Sport Idols',
   category:'sport',birth:p.birth,group:p.disciplines.join(' / '),
   source:p.verifiedBirthSource||p.sources?.[0]?.url||'',sourceLabel:'Federazione sportiva / JOC / ISU',archive:'sport'})
 }
 const people=[...results.values()];
 const countBy=(field)=>Object.fromEntries([...new Set(people.map(p=>p[field]))].map(id=>[id,people.filter(p=>p[field]===id).length]));
 window.YumeYoungStars=Object.freeze({updated:'2026-11-08',ageRange:'10–19',
  people, count:people.length,byArchive:countBy('archive'),byScene:countBy('scene'),byCategory:countBy('category')});
})();