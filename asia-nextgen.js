/* India & Philippines: editorial social directory; no arbitrary portrait reuse. */
(()=>{'use strict';
 const data=window.YumeAsiaNextGen,photoIndex=window.YumePhotoStore,$=id=>document.getElementById(id);
 const root=$('asia-nextgen-cards'),search=$('asia-nextgen-search'),place=$('asia-nextgen-place'),kind=$('asia-nextgen-type'),more=$('asia-nextgen-more'),status=$('asia-nextgen-status');
 if(!data||!root||!place||!kind||!search||!more||!status)return;
 const label={in:'🇮🇳 India',ph:'🇵🇭 Filippine'},type={all:'Tutte le attività',creators:'Creator & Social',actors:'Cinema & TV',fashion:'Moda & Model',music:'Musica'};
 const currentAge=birth=>{
  if(!/^\d{4}-\d{2}-\d{2}$/.test(birth||''))return null;
  const [y,m,d]=birth.split('-').map(Number),now=new Date(),today=[now.getUTCFullYear(),now.getUTCMonth()+1,now.getUTCDate()];
  return today[0]-y-(today[1]<m||(today[1]===m&&today[2]<d)?1:0)
 };
 const norm=s=>String(s||'').normalize('NFKC').normalize('NFKD').toLowerCase().replace(/[\u0300-\u036f]/g,'').trim();
 const make=(tag,cls,value)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(value!==undefined)n.textContent=String(value);return n};
 const link=(text,url)=>{const a=make('a',null,text);a.href=url;a.target='_blank';a.rel='noopener noreferrer';return a};
 const niceNumber=v=>(v>=1e6?(v/1e6).toLocaleString('it-IT',{maximumFractionDigits:1})+' M':v>=1e3?(v/1e3).toLocaleString('it-IT',{maximumFractionDigits:0})+' mila':String(v));
 const metricDate=s=>{
  if(!s)return 'data non indicata';
  const d=new Date((s.length===7?s+'-01':s)+'T00:00:00Z');
  return Number.isNaN(d.getTime())?s:d.toLocaleDateString('it-IT',{timeZone:'UTC',month:'long',year:'numeric',...(s.length===10?{day:'numeric'}:{})})
 };
 const sourceOf=p=>data.sources[p.sourceId];
 const socialUrl=p=>{
  if(!p.social)return null;
  const {platform,handle}=p.social;
  if(platform==='Instagram'&&/^[A-Za-z0-9._]+$/.test(handle))return 'https://www.instagram.com/'+handle+'/';
  if(platform==='TikTok'&&/^[A-Za-z0-9._]+$/.test(handle))return 'https://www.tiktok.com/@'+handle;
  if(platform==='YouTube'&&/^@[A-Za-z0-9_-]+$/.test(handle))return 'https://www.youtube.com/'+handle;
  return null
 };
 let limit=18;
 const filtered=()=>{
  const q=norm(search.value),selected=kind.value;
  return data.people.filter(p=>(place.value==='all'||p.country===place.value)&&
    (selected==='all'||(selected==='teen'?((currentAge(p.birth)??30)>=10&&(currentAge(p.birth)??30)<=19):p.category===selected))&&
    (!q||norm(p.name+' '+p.group+' '+p.description).includes(q)))
    .sort((a,b)=>(b.audience?.count||0)-(a.audience?.count||0)||a.name.localeCompare(b.name,'it'))
 };
 function card(p){
  const age=currentAge(p.birth),src=sourceOf(p),article=make('article','asia-nextgen-card');
  article.dataset.country=p.country;
  const visual=make('div','asia-nextgen-visual');
  visual.append(make('span','asia-nextgen-glyph',p.category==='fashion'?'装':p.category==='actors'?'映':p.category==='music'?'音':'星'));
  visual.append(make('span','asia-nextgen-country',label[p.country]));
  if(photoIndex){
   const pic=photoIndex.get('asia',p.name,p.country);
   if(pic?.verified&&pic.photo){
    const photo=make('img');photo.alt='Ritratto di '+p.name;
    photo.loading='lazy';photo.decoding='async';photo.src=pic.photo;
    let i=0,backup=[pic.photo,...(pic.alternates||[])].filter(x=>typeof x==='string'&&x.startsWith('https://'));
    photo.onerror=()=>{i++;if(i<backup.length)photo.src=backup[i];else photo.remove()};
    visual.append(photo)
   }
  }
  const body=make('div','asia-nextgen-content');
  body.append(make('span','asia-nextgen-kind',type[p.category]||p.category));
  body.append(make('h3',null,p.name));
  body.append(make('p','asia-nextgen-group',p.group));
  body.append(make('p','asia-nextgen-desc',p.description));
  if(age!=null)body.append(make('p','asia-nextgen-age',(age>=10&&age<=19?'Young Stars · ':'Età documentata · ')+age+' anni'));
  else body.append(make('p','asia-nextgen-age','Età non verificata: nessuna classificazione teen'));
  if(p.audience){
   const metric=make('div','asia-nextgen-metric');
   metric.append(make('strong',null,'≈ '+niceNumber(p.audience.count)));
   metric.append(make('span',null,p.audience.platform+' · follower/iscritti · '+metricDate(p.audience.date)));
   body.append(metric)
  }
  const actions=make('div','asia-nextgen-links'),account=socialUrl(p);
  if(account)actions.append(link(p.social.platform+' ↗',account));
  if(src?.url)actions.append(link('Fonte ↗',src.url));
  if(p.birthSource)actions.append(link('Età ↗',p.birthSource));
  body.append(actions);article.append(visual,body);return article
 }
 function render(){
  const results=filtered(),frag=document.createDocumentFragment();
  for(const person of results.slice(0,limit))frag.append(card(person));
  root.replaceChildren(frag);
  status.textContent=results.length+' profili in questa selezione · '+Math.min(limit,results.length)+' visualizzati · audience riferite alla data indicata';
  more.hidden=limit>=results.length;
  more.textContent='Mostra altri '+Math.min(18,results.length-limit)+' profili ↓'
 }
 $('asia-nextgen-in').textContent=String(data.byCountry.in||0);
 $('asia-nextgen-ph').textContent=String(data.byCountry.ph||0);
 $('asia-nextgen-teen').textContent=String(data.people.filter(p=>{const a=currentAge(p.birth);return a!=null&&a>=10&&a<=19}).length);
 [search,place,kind].forEach(c=>c.addEventListener(c===search?'input':'change',()=>{limit=18;render()}));
 more.addEventListener('click',()=>{limit+=18;render()});
 document.querySelectorAll('[data-nextgen-jump]').forEach(btn=>btn.addEventListener('click',()=>{
  const country=btn.dataset.nextgenJump;
  place.value=country;kind.value='all';search.value='';limit=18;render();
  $('asia-nextgen').scrollIntoView({behavior:window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches?'instant':'smooth',block:'start'})
 }));
 render();
 photoIndex?.ready?.then(()=>render()).catch(()=>{});
})();
