/* Young Stars UI — educational/professional coverage only; no sexualized categories. */
(()=>{'use strict';
 const d=window.YumeYoungStars,photoStore=window.YumePhotoStore;
 const $=id=>document.getElementById(id),grid=$('young-grid'),query=$('young-query'),
 archive=$('young-archive'),country=$('young-country'),age=$('young-age'),platform=$('young-platform'),
 status=$('young-status'),more=$('young-more'),filters=$('young-categories');
 if(!d||!grid)return;
 const countryLabels={jp:'🇯🇵 Giappone',kr:'🇰🇷 Corea',th:'🇹🇭 Thailandia',id:'🇮🇩 Indonesia',vn:'🇻🇳 Vietnam',us:'🇺🇸 USA',gb:'🇬🇧 Regno Unito',au:'🇦🇺 Australia',br:'🇧🇷 Brasile',nl:'🇳🇱 Paesi Bassi',cn:'🇨🇳 Cina',in:'🇮🇳 India',ph:'🇵🇭 Filippine',tw:'🇹🇼 Taiwan'};
 const categories={all:'Tutte',music:'Musica',fashion:'Moda',sport:'Sport',acting:'Cinema & TV',creators:'Creator & Social'};
 const $make=(tag,cls,value)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(value!=null)n.textContent=String(value);return n};
 const norm=t=>String(t||'').normalize('NFKC').normalize('NFKD').toLowerCase().replace(/[\u0300-\u036f]/g,'').replace(/\s/g,'');
 const linked=(label,url)=>{const a=$make('a',null,label);a.href=url;a.target='_blank';a.rel='noopener noreferrer';return a};
 let category='all',limit=32;
 function filtered(){
  const q=norm(query.value),countryVal=country.value,archiveVal=archive.value,range=age.value.split('-').map(Number);
  return d.people.filter(p=>
   (category==='all'||p.category===category)&&
   (countryVal==='all'||p.scene===countryVal)&&
   (archiveVal==='all'||p.archive===archiveVal)&&
   (platform.value==='all'||(p.platforms||[]).some(v=>v[0]===platform.value))&&
   (age.value==='all'||p.ageRange.min>=range[0]&&p.ageRange.max<=range[1])&&
   (!q||norm(p.name+' '+p.alternate+' '+p.group+' '+(countryLabels[p.scene]||'')).includes(q))
  ).sort((a,b)=>a.ageRange.min-b.ageRange.min||a.name.localeCompare(b.name,'it'))
 }
 function image(p,wrap){
  const item=photoStore?.get(p.archive,p.name,p.archive==='asia'?p.scene:null);
  if(!item?.verified||!item.photo)return;
  const sources=[...new Set([item.photo,...(item.alternates||[])].filter(x=>typeof x==='string'&&x.startsWith('https://')))];
  let i=0;const img=$make('img');img.alt='Ritratto pubblico di '+p.name;
  img.loading='eager';img.decoding='async';
  img.onload=()=>{img.dataset.loaded='true'};
  img.onerror=()=>{i++;if(i<sources.length)img.src=sources[i];else img.remove()};
  img.src=sources[0];wrap.append(img)
 }
 function card(p){
  const box=$make('article','young-card'),photo=$make('div','young-card-top');
  photo.append($make('span',null,p.category==='sport'?'競':p.category==='fashion'?'装':p.category==='creators'?'映':'星'));
  const badge=$make('span','young-card-badge',countryLabels[p.scene]||p.scene);
  photo.append(badge);image(p,photo);box.append(photo);
  const body=$make('div','young-card-body');
  body.append($make('span','young-card-type',categories[p.category]+' · '+p.collection));
  body.append($make('h3',null,p.name));
  if(p.alternate)body.append($make('p','young-alt',p.alternate));
  body.append($make('p','young-card-group',p.group||'Artista'));
  if(p.description)body.append($make('p','young-description',p.description));
  const birthday=p.birthDate?new Date(p.birthDate+'T00:00:00Z').toLocaleDateString('it-IT',{timeZone:'UTC',day:'2-digit',month:'2-digit',year:'numeric'}):'Anno '+p.birthYear;
  const years=p.age!=null?p.age+' anni':p.ageRange.min+'–'+p.ageRange.max+' anni (approssimati)';
  body.append($make('p','young-age',years+' · Nascita: '+birthday));
  if(p.audience){
   const metric=$make('p','young-audience');
   const val=p.audience.count>=1000000?(p.audience.count/1000000).toLocaleString('it-IT',{maximumFractionDigits:1})+' M':p.audience.count.toLocaleString('it-IT');
   metric.append($make('strong',null,val+' iscritti'));
   metric.append($make('span',null,' · '+p.audience.platform+' · '+new Date(p.audience.date+'T00:00:00Z').toLocaleDateString('it-IT',{timeZone:'UTC'})));
   if(p.audience.source)metric.append(linked(' Fonte dati ↗',p.audience.source));
   body.append(metric)
  }
  const links=$make('div','young-card-links');
  if(p.source)links.append(linked('Profilo / fonte ↗',p.source));
  for(const [platform,url] of p.platforms||[]){
   if(/^https:\/\//.test(url))links.append(linked(platform+' ↗',url));
  }
  const pic=photoStore?.get(p.archive,p.name,p.archive==='asia'?p.scene:null);
  if(pic?.verified&&pic.source)links.append(linked('Licenza fotografia ↗',pic.source));
  body.append(links);box.append(body);return box
 }
 function render(){
  const items=filtered(),shown=items.slice(0,limit),frag=document.createDocumentFragment();
  for(const p of shown)frag.append(card(p));
  if(!shown.length)frag.append($make('p','young-empty','Nessun profilo corrisponde ai filtri. Sono elencate soltanto persone con età documentata.'));
  grid.replaceChildren(frag);
  status.textContent=items.length+' profili trovati · '+shown.length+' visualizzati · fonti e canali pubblici citati.';
  more.hidden=limit>=items.length;more.textContent='Mostra altre '+Math.min(32,items.length-limit)+' schede ↓';
  for(const btn of document.querySelectorAll('[data-young-category]'))btn.setAttribute('aria-pressed',String(btn.dataset.youngCategory===category))
 }
 $('young-total').textContent=String(d.count);
 $('young-scenes').textContent=String(Object.keys(d.byScene).length);
 $('young-music').textContent=String(d.byCategory.music||0);
 $('young-other').textContent=String((d.byCategory.fashion||0)+(d.byCategory.sport||0)+(d.byCategory.acting||0)+(d.byCategory.creators||0));
 for(const id of Object.keys(d.byScene)){
  const option=$make('option',null,(countryLabels[id]||id)+' ('+d.byScene[id]+')');option.value=id;country.append(option)
 }
 for(const k of Object.keys(categories).filter(k=>k==='all'||d.byCategory[k])){
  const btn=$make('button',null,categories[k]+(k!=='all'?' · '+d.byCategory[k]:''));
  btn.type='button';btn.dataset.youngCategory=k;btn.setAttribute('aria-pressed',String(k==='all'));
  btn.addEventListener('click',()=>{category=k;limit=32;render()});filters.append(btn)
 }
 [query,archive,country,age,platform].forEach(control=>control.addEventListener(control===query?'input':'change',()=>{limit=32;render()}));
 more.addEventListener('click',()=>{limit+=32;render()});
 function renderChannels(){
  const target=$('young-channel-grid'),channels=window.YumeYoungSpotlight?.channels||[];
  if(!target)return;
  const format=n=>n>=1000000?(n/1000000).toLocaleString('it-IT',{maximumFractionDigits:1})+' M':n.toLocaleString('it-IT');
  const frag=document.createDocumentFragment();
  for(const c of channels){
   const card=$make('article','young-channel-card');
   const top=$make('div','young-channel-art');
   top.append($make('span',null,c.theme||'✦'));
   top.append($make('small',null,c.category));
   card.append(top);
   const body=$make('div','young-channel-info');
   body.append($make('h3',null,c.name));
   body.append($make('p',null,c.description));
   for(const [network,amount,unit] of c.metrics||[]){
    const value=$make('div','young-channel-reach');
    value.append($make('strong',null,format(amount)));
    value.append($make('span',null,network+' · '+unit+' · '+new Date(c.snapshot+'T00:00:00Z').toLocaleDateString('it-IT',{timeZone:'UTC'})));
    body.append(value);
   }
   const links=$make('div','young-card-links');
   if(c.site)links.append(linked('Sito / canale ↗',c.site));
   for(const [platform,url] of c.platforms||[])if(url!==c.site&&/^https:\/\//.test(url))links.append(linked(platform+' ↗',url));
   if(c.metricSource)links.append(linked('Fonte dati ↗',c.metricSource));
   body.append(links);card.append(body);frag.append(card);
  }
  target.replaceChildren(frag)
 }
 renderChannels();
 render();photoStore?.ready?.then(()=>render()).catch(()=>{});
})();