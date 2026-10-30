/* Yume Magazine · native reader, independent editorial records */
(function(){'use strict';
const home=document.body.dataset.magazine==='home',root=document.getElementById('magazine-root');if(!root)return;
const status=document.getElementById('magazine-status');
const make=(tag,cls,txt)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(txt!==undefined)e.textContent=String(txt);return e};
const norm=s=>String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim();
const link=(txt,url,cls='ye-link')=>{const e=make('a',cls,txt);e.href=url;return e};
const append=(p,...children)=>{children.forEach(x=>p.append(x));return p};
const favoriteKey='yume-magazine-reading-list-v1',readingKey='yume-magazine-reader-mode-v1';
const read=(k,fallback)=>{try{const x=JSON.parse(localStorage.getItem(k)||'null');return x===null?fallback:x}catch{return fallback}};
const store=(k,value)=>{try{localStorage.setItem(k,JSON.stringify(value))}catch{}};
let favorites=new Set(Array.isArray(read(favoriteKey,[]))?read(favoriteKey,[]):[]),readMode=read(readingKey,false)===true;
const articleLink=a=>'magazine-article.html?id='+encodeURIComponent(a.slug);
const pdfLink=(issue,label)=>{const path='assets/yume-magazine-numero-'+String(issue.number).padStart(2,'0')+'.pdf';const a=link(label||'↓ Scarica PDF completo',path,'ye-pdf-download');a.download='Yume-Magazine-Numero-'+String(issue.number).padStart(2,'0')+'.pdf';a.type='application/pdf';return a};
const sourceURL=s=>{try{const u=new URL(s);return u.protocol==='https:'?u.href:null}catch{return null}};
function favoriteButton(a){
 const b=make('button','ye-fav');
 b.type='button';function update(){const active=favorites.has(a.slug);b.textContent=active?'♥ Salvato':'♡ Salva articolo';b.setAttribute('aria-pressed',String(active))}
 b.onclick=()=>{if(favorites.has(a.slug))favorites.delete(a.slug);else favorites.add(a.slug);store(favoriteKey,[...favorites]);update()};
 update();return b
}
function readingButton(){const b=make('button','ye-button');b.type='button';const apply=()=>{document.body.classList.toggle('ye-reader',readMode);b.textContent=readMode?'Disattiva modalità lettura':'Modalità lettura';b.setAttribute('aria-pressed',String(readMode))};
 b.onclick=()=>{readMode=!readMode;store(readingKey,readMode);apply()};apply();return b}
function dateString(s){return new Date(s+'T12:00:00').toLocaleDateString('it-IT',{day:'numeric',month:'long',year:'numeric'})}
function card(a,n=0){const article=make('article','ye-mag-card'),art=make('div','ye-mag-card-art ye-art-'+(n%5));art.setAttribute('aria-hidden','true');art.append(make('span','',n%2?'夢':'物'));
 const copy=make('div','ye-mag-card-copy');append(copy,make('span','ye-kicker',a.category.toUpperCase()),make('h3','',a.title),make('p','',a.subtitle),make('small','',a.reading+' min di lettura · '+dateString(a.publishedAt)));
 const acts=make('div','ye-mag-actions');acts.append(link('Leggi l’articolo →',articleLink(a),'ye-cta'),favoriteButton(a));copy.append(acts);article.append(art,copy);return article}
function homePage(data){
 const issue=data.issues[0],articles=data.articles,featured=articles.find(a=>a.slug===issue.featuredSlug)||articles[0];
 const issueBlock=make('section','ye-issue-cover');issueBlock.append(make('p','ye-kicker','YUME MAGAZINE · NUMERO 00 · '+dateString(issue.date)),make('h2','',issue.title),make('p','ye-lead',issue.theme));
 const cover=make('div','ye-issue-feature'),art=make('div','ye-issue-art');append(art,make('span','ye-art-kanji','夢'),make('span','ye-art-sub','YUME / STORIES'));
 const body=make('div','ye-issue-feature-copy');append(body,make('span','ye-kicker','IN COPERTINA'),make('h3','',featured.title),make('p','',featured.subtitle),link('Leggi la cover story →',articleLink(featured),'ye-cta'));cover.append(art,body);issueBlock.append(cover,pdfLink(issue,'↓ Scarica il Numero '+issue.number+' illustrato · PDF'));root.append(issueBlock);
 const section=make('section','ye-mag-index');append(section,make('h2','','Sfoglia il Numero Zero'),make('p','ye-muted','Otto articoli originali: adattamenti, storia delle opere, musica, collezionismo e Giappone. Non è un feed di notizie automatiche.'));
 const bar=make('div','ye-toolbar'),q=make('input'),category=make('select'),onlySaved=make('label','ye-checkbox'),tick=make('input');q.type='search';q.placeholder='Cerca una rubrica o un articolo…';q.setAttribute('aria-label','Cerca articoli');tick.type='checkbox';onlySaved.append(tick,document.createTextNode('Solo preferiti'));
 const cats=['Tutte le rubriche',...new Set(articles.map(a=>a.category))];cats.forEach((c,i)=>{const o=make('option','',c);o.value=i?c:'all';category.append(o)});category.setAttribute('aria-label','Filtra rubriche');
 bar.append(q,category,onlySaved);section.append(bar);
 const count=make('p','ye-count'),grid=make('div','ye-mag-grid');section.append(count,grid);root.append(section);
 function render(){const needle=norm(q.value);grid.replaceChildren();const filtered=articles.filter(a=>(category.value==='all'||a.category===category.value)&&(!tick.checked||favorites.has(a.slug))&&norm([a.title,a.subtitle,a.category,...a.tags].join(' ')).includes(needle));
 count.textContent=filtered.length+' articoli nel numero 00';filtered.forEach((a,i)=>grid.append(card(a,i)));if(!filtered.length)grid.append(make('p','ye-empty','Nessun articolo corrisponde ai filtri selezionati.'))}
 q.oninput=category.onchange=tick.onchange=render;render();
 const archive=make('section','ye-archive');append(archive,make('h2','','Archivio dei numeri'),make('p','ye-muted','Numero Zero — 30 ottobre 2026. I prossimi numeri verranno pubblicati soltanto quando saranno pronti: nessun contenuto futuro simulato.'));
 const tag=make('div','ye-archive-issue');append(tag,make('strong','','N° '+issue.number+' · '+issue.title),make('span','',dateString(issue.date)),make('span','',issue.articleSlugs.length+' articoli'));tag.append(pdfLink(issue,'↓ PDF completo'));archive.append(tag);root.append(archive);loadPdfArchive(archive,issue)
}
async function loadPdfArchive(archive,current){
 try{
  const r=await fetch('data/magazine/pdf-catalog.json?v=20261030');if(!r.ok)return;
  const d=await r.json();
  const extra=Array.isArray(d.issues)?d.issues.filter(i=>String(i.number)!==String(current.number)):[];
  extra.forEach(i=>{const row=make('div','ye-archive-issue');
   append(row,make('strong','','N° '+i.number+' · '+i.title),make('span','',dateString(i.date)),make('span','',i.articles+' articoli'),pdfLink(i,'↓ PDF completo'));archive.append(row)})
 }catch(e){}
}
function articlePage(data){
 const slug=new URLSearchParams(location.search).get('id'),a=data.articles.find(x=>x.slug===slug);
 if(!a){root.append(make('p','ye-empty','Articolo non trovato o non ancora pubblicato.'),link('← Torna al Magazine','yume-magazine.html'));return}
 document.title=a.title+' — Yume Magazine';
 const head=make('header','ye-article-head'),tools=make('div','ye-article-tools');
 tools.append(link('← Numero Zero','yume-magazine.html','ye-back'),readingButton(),favoriteButton(a),pdfLink(data.issues[0],'↓ PDF completo'));
 append(head,tools,make('p','ye-kicker',a.category.toUpperCase()+' · NUMERO 00'),make('h1','',a.title),make('p','ye-lead',a.subtitle),make('p','ye-muted',a.byline+' · '+dateString(a.publishedAt)+' · '+a.reading+' minuti'));
 root.append(head);
 const layout=make('div','ye-reader-layout'),aside=make('aside','ye-toc'),h=make('h2','','In questo articolo'),ol=make('ol');aside.append(h,ol);
 const content=make('article','ye-story');
 a.sections.forEach(([heading,body],i)=>{const section=make('section');section.id='paragrafo-'+(i+1);
 append(section,make('h2','',heading),make('p','',body));content.append(section);
 const li=make('li'),linkTo=link(heading,'#'+section.id);li.append(linkTo);ol.append(li)});
 const source=make('section','ye-story-sources');append(source,make('h2','','Fonti e approfondimenti'),make('p','ye-muted','Fonti a supporto dei fatti documentati; il testo interpretativo è originale e distinto dalle informazioni editoriali.'));
 const ul=make('ul');a.sources.forEach(([label,url])=>{const safe=sourceURL(url);if(safe){const li=make('li'),x=link(label+' ↗',safe);x.target='_blank';x.rel='noopener noreferrer';li.append(x);ul.append(li)}});source.append(ul);content.append(source);
 const related=make('section','ye-story-related');related.append(make('h2','','Continua a esplorare'));const group=make('div','ye-actions');
 a.related.forEach(([name,url])=>group.append(link(name,url)));related.append(group);content.append(related);
 layout.append(aside,content);root.append(layout);
 const bottom=make('nav','ye-end-nav');bottom.setAttribute('aria-label','Articoli correlati');const others=data.articles.filter(x=>x.slug!==a.slug&&x.category===a.category).concat(data.articles.filter(x=>x.slug!==a.slug&&x.category!==a.category)).slice(0,3);
 bottom.append(make('h2','','Prossime letture'));const grid=make('div','ye-mag-grid');others.forEach((x,i)=>grid.append(card(x,i)));bottom.append(grid);root.append(bottom)
}
async function init(){try{
 const r=await fetch('data/magazine/numero-zero.json?v=20261030');if(!r.ok)throw Error('Archivio non disponibile');
 const d=await r.json();if(!Array.isArray(d.articles)||!Array.isArray(d.issues))throw Error('Archivio non valido');
 if(home)homePage(d);else articlePage(d);status.hidden=true;
}catch(e){status.textContent='Impossibile caricare il Magazine: '+e.message}}
init()
})();