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
   const art=E('div','jwiki-sigil','✿');art.setAttribute('aria-hidden','true');
   const title=E('div','jwiki-card-titles');
   title.append(E('span','jwiki-type',g.year+' · '+g.region),E('h3',null,g.name));
   h.append(art,title);
   const body=E('div','jwiki-card-body');
   body.append(E('p','jwiki-style',g.style));
   body.append(E('p','jwiki-group-count',g.roster.length+' componenti documentate'));
   const details=E('details','jwiki-roster');
   details.append(E('summary',null,'Leggi i nomi dei membri'));
   const list=E('ul');
   for(const m of g.roster){
    const li=E('li');li.append(E('strong',null,m.name));
    if(m.japanese)li.append(E('span',null,' · '+m.japanese));
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
  status.textContent=chosen.length+' gruppi trovati · roster riferiti alle fonti consultate, non aggiornati automaticamente';
  if(!chosen.length)grid.append(E('p','jwiki-empty','Nessun gruppo trovato. Prova un altro nome o cambia anno.'))
 }
 search.addEventListener('input',render);
 era.addEventListener('change',render);
 render();
})();
