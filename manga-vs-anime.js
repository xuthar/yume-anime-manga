/* Yume 3.0 · Manga vs Anime · 2026-10-30
 * Editorial comparisons are not an inference of purchases or episode coverage.
 */
(function(){'use strict';
const root=document.getElementById('compare-root');if(!root)return;
const $=s=>document.querySelector(s);
const make=(tag,cls,text)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=String(text);return e};
const append=(parent,...nodes)=>{nodes.forEach(x=>parent.append(x));return parent};
const anchor=(text,url,cls='ye-link')=>{const a=make('a',cls,text);a.href=url;return a};
const norm=s=>String(s||'').normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9\u3040-\u30ff\u3400-\u9fff]+/g,' ').trim();
const safeURL=value=>{try{const u=new URL(value,location.href);return ['http:','https:'].includes(u.protocol)?u.href:null}catch{return null}};
const chip=t=>make('span','ye-chip',t);
const state=$('#compare-status');let dossiers=[],filter='all',search='',spoiler=false;
const openState=()=>sessionStorage.getItem('y3-adapt-spoilers')==='on';
try{spoiler=openState()}catch{}
function detailUrl(d){return 'manga-vs-anime.html?opera='+encodeURIComponent(d.slug)}
function linkBlock(label,url){const l=anchor(label,url);return l}
function renderList(){
 root.replaceChildren();
 const intro=make('section','ye-section-intro');
 intro.append(make('div','ye-kicker','08 DOSSIER EDITORIALI · DATI E FONTI VERIFICABILI'),make('h2','','Trova la storia, confronta i linguaggi.'),make('p','','Cerca per titolo o genere e apri il confronto. Analisi originali senza spoiler di trama; ciò che non è documentato è segnalato.'));
 root.append(intro);
 const bar=make('div','ye-toolbar'),field=make('input'),select=make('select');field.type='search';field.placeholder='Cerca titolo, autore o studio…';field.value=search;field.setAttribute('aria-label','Cerca tra i confronti');
 const cats=['all',...new Set(dossiers.map(d=>d.category))];cats.forEach(c=>{const o=make('option','',c==='all'?'Tutti i generi':c);o.value=c;select.append(o)});select.value=filter;select.setAttribute('aria-label','Filtra genere');
 append(bar,field,select);root.append(bar);
 const count=make('p','ye-count'),grid=make('div','ye-comparison-grid');root.append(count,grid);
 const rerender=()=>{
  search=field.value;filter=select.value;grid.replaceChildren();
  const chosen=dossiers.filter(d=>(filter==='all'||d.category===filter)&&norm([d.title,d.original.creators,d.anime.studio,d.hook,...d.aliases].join(' ')).includes(norm(search)));
  count.textContent=chosen.length+' confronti disponibili · non sono indicati rapporti capitoli/episodi non verificati';
  chosen.forEach((d,i)=>{
   const article=make('article','ye-compare-card');
   const art=make('div','ye-compare-art ye-art-'+(i%5));art.setAttribute('aria-hidden','true');
   append(art,make('span','ye-left-book','本'),make('span','ye-art-vs','VS'),make('span','ye-right-screen','映'));
   const c=make('div','ye-compare-body');
   append(c,chip(d.category),make('h3','',d.title),make('p','',d.hook));
   const meta=make('div','ye-compare-meta');append(meta,make('span','','Originale: '+d.original.kind),make('span','','Anime: '+d.anime.studio));c.append(meta);
   c.append(anchor('Apri il confronto →',detailUrl(d),'ye-cta'));article.append(art,c);grid.append(article)
  });
  if(!chosen.length)grid.append(make('p','ye-empty','Nessuna scheda corrisponde alla ricerca.'));
 };
 field.oninput=rerender;select.onchange=rerender;rerender()
}
function section(title,klass){const s=make('section',klass||'ye-panel');s.append(make('h2','',title));return s}
function sourceList(d){const block=section('Fonti e verifiche');block.append(make('p','ye-muted','Le informazioni di produzione e genealogia delle opere si basano su fonti editoriali e ufficiali. I commenti espressivi sono analisi della redazione Yume, non differenze scena per scena certificate.'));
 const ul=make('ul','ye-sources');d.sources.forEach(([name,url])=>{const resolved=safeURL(url);if(!resolved)return;const li=make('li'),a=anchor(name+' ↗',resolved);a.target='_blank';a.rel='noopener noreferrer';li.append(a);ul.append(li)});block.append(ul);
 block.append(make('p','ye-muted','Verifica editoriale: 30 ottobre 2026 · nessuna deduzione di acquisti, stato di lettura o voti.'));return block}
function metadata(d){const grid=make('div','ye-duo'),left=make('section','ye-side ye-paper'),right=make('section','ye-side ye-screen');
 append(left,make('div','ye-label','PAGINA · OPERA DI PARTENZA'),make('h2','',d.original.kind),make('p','',d.original.creators),make('small','','Editore / collana: '+d.original.publisher));
 append(right,make('div','ye-label','SCHERMO · ADATTAMENTO'),make('h2','','Anime'),make('p','',d.anime.studio),make('small','',d.anime.format+' · Musica: '+d.anime.music));
 grid.append(left,right);return grid}
function comparison(d){const box=section('Tre prospettive sul confronto');box.append(make('p','ye-muted','La colonna interpretativa segnala opportunità di analisi; non attribuisce modifiche narrative specifiche senza fonte.'));
 d.axes.forEach(([topic,print,screen,note],i)=>{
  const block=make('article','ye-axis'),heading=make('h3','','0'+(i+1)+' · '+topic),cols=make('div','ye-axis-duo');
  const p=make('div');append(p,make('span','ye-label','NELLA LETTURA'),make('p','',print));
  const a=make('div');append(a,make('span','ye-label','NELLA VISIONE'),make('p','',screen));
  cols.append(p,a);append(block,heading,cols,make('p','ye-axis-note','Punto di confronto — '+note));box.append(block)
 });return box}
function spoilers(d){const box=section('Approfondimenti e spoiler');const row=make('div','ye-spoiler-toggle'),button=make('button','ye-button'),text=make('p','ye-muted');
 button.type='button';const paint=()=>{
  button.textContent=spoiler?'Nascondi note sensibili':'Mostra note sensibili';
  button.setAttribute('aria-pressed',String(spoiler));
  text.textContent=spoiler?d.spoiler:'Nessuna informazione narrativa avanzata è visibile. Apri solo se vuoi leggere le avvertenze relative allo sviluppo della serie.'
 };
 button.onclick=()=>{spoiler=!spoiler;try{sessionStorage.setItem('y3-adapt-spoilers',spoiler?'on':'off')}catch{}paint()};paint();row.append(button);box.append(row,text);return box}
function actions(d){const box=section('Continua su Yume');const links=make('div','ye-actions');
 links.append(anchor('✦ Cerca la saga in Universe','universe.html?q='+encodeURIComponent(d.aliases[0])),anchor('▤ Cerca il manga in Collector','collector.html?q='+encodeURIComponent(d.aliases[0])),anchor('♫ Musica e sigle','jpop.html'),anchor('✎ Leggi Yume Magazine','yume-magazine.html'));box.append(links);const hits=make('div','ye-catalog-hits');box.append(hits);hydrate(d,hits);return box}
async function hydrate(d,holder){
 const status=make('p','ye-muted','Collegamenti al catalogo personale: caricamento solo di schede corrispondenti ai titoli dichiarati.');holder.append(status);
 try{
  const response=await fetch('library.json?v=20261030-vsa');if(!response.ok)throw Error('Catalogo non disponibile');const data=await response.json();
  if(!Array.isArray(data.items))throw Error('Formato catalogo non supportato');
  const known=new Set(d.aliases.map(norm));const matches=data.items.filter(x=>!x.adult&&x.title&&
   (known.has(norm(x.title))||[x.english,x.original,x.italian].some(z=>known.has(norm(z)))||
   (x.type==='anime'&&d.aliases.some(alias=>norm(x.title).startsWith(norm(alias)+' season '))))) .slice(0,10);
  holder.replaceChildren();
  const title=make('h3','','Schede presenti nel catalogo Yume'),p=make('p','ye-muted','Corrispondenze basate sui titoli: l’identità di edizione e i dati di possesso non vengono dedotti.');holder.append(title,p);
  if(!matches.length){holder.append(make('p','ye-muted','Nessuna corrispondenza esatta riscontrata; usa la ricerca generale del sito.'));return}
  const group=make('div','ye-actions');
  matches.forEach(x=>group.append(anchor((x.type==='anime'?'▶ Anime: ':'▤ Manga: ')+x.title,x.type==='anime'?'libreria.html?anime='+encodeURIComponent(x.id):'collector.html?q='+encodeURIComponent(x.title))));
  holder.append(group)
 }catch(e){status.textContent='Schede del catalogo non disponibili al momento. Il dossier editoriale resta consultabile.'}
}
function renderDetail(d){
 root.replaceChildren();
 const top=make('div','ye-reading-hero'),eyebrow=make('p','ye-kicker','MANGA VS ANIME · DOSSIER DOCUMENTATO');
 append(top,anchor('← Tutti i confronti','manga-vs-anime.html','ye-back'),eyebrow,make('h2','',d.title),make('p','ye-lead',d.hook),make('p','ye-muted',d.intro));
 root.append(top,metadata(d),comparison(d),spoilers(d),actions(d),sourceList(d));
 const end=make('section','ye-up-next');end.append(make('h2','','Altri mondi, altri confronti'));const links=make('div','ye-actions');
 dossiers.filter(x=>x.slug!==d.slug).slice(0,4).forEach(x=>links.append(anchor(x.title,detailUrl(x))));end.append(links);root.append(end);
}
async function init(){try{
 const r=await fetch('data/adaptations/yume-comparisons.json?v=20261030');if(!r.ok)throw Error('Dossier temporaneamente non disponibili');
 const data=await r.json();if(!Array.isArray(data.items))throw Error('Dati non riconosciuti');
 dossiers=data.items;const slug=new URLSearchParams(location.search).get('opera');
 if(slug){const d=dossiers.find(x=>x.slug===slug);if(!d){state.textContent='Opera non presente nel numero iniziale.';renderList()}else renderDetail(d)}else renderList();
 state.hidden=true;
}catch(e){state.textContent='Impossibile caricare Manga vs Anime: '+e.message}}
init()
})();