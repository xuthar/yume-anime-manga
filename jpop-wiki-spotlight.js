/* Yume editorial introduction to newly indexed J-Pop Wiki artist rosters. */
(()=>{'use strict';
 const catalog=window.YumeJPopWikiArchive,root=document.getElementById('jpop-wiki-rosters');
 if(!catalog||!root)return;
 const search=document.getElementById('jpop-wiki-search'),era=document.getElementById('jpop-wiki-year');
 const total=document.getElementById('jpop-wiki-count'),grid=document.getElementById('jpop-wiki-grid');
 const status=document.getElementById('jpop-wiki-status');
 if(!search||!era||!total||!grid||!status)return;
 const E=(tag,cls,content)=>{
  const el=document.createElement(tag);if(cls)el.className=cls;
  if(content!=null)el.textContent=String(content);
  return el
 };
 const ext=(text,url)=>{
  const a=E('a',null,text);a.href=url;a.target='_blank';a.rel='noopener noreferrer';return a
 };
 const photo=(record,label,cls)=>{const a=ext('',record.source);a.className=cls;const img=E('img');img.src=record.url;img.alt=label;img.loading='lazy';img.decoding='async';img.referrerPolicy='no-referrer';img.addEventListener('error',()=>a.remove(),{once:true});a.append(img);return a};
 const css=E('style');css.textContent=`
 .jwiki-grid{align-items:start}.jwiki-card-head{display:flex!important;flex-direction:column!important;align-items:stretch!important;gap:10px!important;box-sizing:border-box!important;width:100%!important;max-width:none!important;min-height:0!important;margin:0!important;padding:12px!important;filter:none!important;position:static!important;transform:none!important}
 .jwiki-group-photo{display:block;width:100%;height:148px;overflow:hidden;border-radius:10px;background:#0c1225}.jwiki-group-photo img{display:block!important;width:100%!important;max-width:100%!important;height:148px!important;object-fit:contain!important;object-position:center!important}
 .jwiki-roster ul{padding:8px 12px!important;list-style:none!important}.jwiki-roster li{display:flex;align-items:center;gap:10px;min-width:0;padding:7px 0!important;border-top:1px solid #b1b8d622}.jwiki-member-photo{display:block;flex:0 0 48px;width:48px;height:64px;border-radius:7px;overflow:hidden;background:#0c1225}.jwiki-member-photo img{display:block!important;width:48px!important;max-width:48px!important;height:64px!important;object-fit:contain!important}.jwiki-member-copy{min-width:0;overflow-wrap:anywhere}.jwiki-member-copy span{display:block}.jwiki-photo-credit{font-size:10px;line-height:1.5;color:#c3c7da;margin:0}.jwiki-photo-credit a{color:#d1edf0}.jwiki-card h3{font-size:18px!important}.jwiki-card-head .jwiki-card-titles{filter:none}
 `;document.head.append(css);
 const fold=s=>String(s||'').normalize('NFKC').toLocaleLowerCase('en');
 const parts=catalog.groups.reduce((n,g)=>n+g.roster.length,0);
 total.textContent=catalog.groups.length+' gruppi · '+parts+' nomi nei roster';
 function render(){
  const query=fold(search.value.trim());
  const chosen=catalog.groups.filter(g=>(era.value==='all'||String(g.year)===era.value)
   &&(!query||fold(g.name+' '+g.region+' '+g.style+' '+g.roster.map(x=>x.name+' '+x.japanese).join(' ')).includes(query)));
  const fragment=document.createDocumentFragment();
  chosen.forEach((g,i)=>{
   const card=E('article','jwiki-card');
   card.style.setProperty('--jwiki-tone',String((i%7)*40)+'deg');
   const h=E('header','jwiki-card-head');
   const art=g.photo?photo(g.photo,'Foto promozionale di '+g.name,'jwiki-group-photo'):null;
   const title=E('div','jwiki-card-titles');
   title.append(E('span','jwiki-type',g.year+' · '+g.region),E('h3',null,g.name));
   if(art)h.append(art);h.append(title);
   const body=E('div','jwiki-card-body');
   body.append(E('p','jwiki-style',g.style));
   if(g.photo){const credit=E('p','jwiki-photo-credit');credit.append(ext('Foto · fonte originale ↗',g.photo.source),document.createTextNode(' · La formazione può differire dal roster.'));body.append(credit);}
   body.append(E('p','jwiki-group-count',g.roster.length+' componenti documentate'));
   const details=E('details','jwiki-roster');
   details.append(E('summary',null,'Leggi i nomi dei membri'));
   const list=E('ul');
   for(const m of g.roster){
    const li=E('li'),copy=E('div','jwiki-member-copy');if(m.photo)li.append(photo(m.photo,'Foto di '+m.name,'jwiki-member-photo'));copy.append(E('strong',null,m.name));
    if(m.japanese)copy.append(E('span',null,m.japanese));li.append(copy);
    list.append(li)
   }
   details.append(list);body.append(details);
   const links=E('div','jwiki-links');
   links.append(ext('Scheda J-Pop Wiki ↗',g.source));
   if(g.official)links.append(ext('Sito ufficiale ↗',g.official));
   const mine=E('a',null,'Cerca in Idols ↓');mine.href='#idols-discover';
   mine.addEventListener('click',()=>{
    const selector=document.querySelector('[data-discovery-category="all"]');
    if(selector)selector.click();
    const q=document.getElementById('discovery-search');if(q){
     q.value=g.name;q.dispatchEvent(new Event('input',{bubbles:true}));
    }
   });
   links.append(mine);body.append(links);
   card.append(h,body);fragment.append(card)
  });
  grid.replaceChildren(fragment);
  status.textContent=chosen.length+' gruppi trovati · '+catalog.groupPhotos+' foto di gruppo · '+catalog.memberPhotos+' ritratti verificati · roster riferiti alle fonti consultate';
  if(!chosen.length)grid.append(E('p','jwiki-empty','Nessun gruppo trovato. Prova un altro nome o cambia anno.'))
 }
 search.addEventListener('input',render);
 era.addEventListener('change',render);
 render();
})();
