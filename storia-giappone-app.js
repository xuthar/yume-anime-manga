/* Yume — Storia del Giappone: 21 epoche, 72 eventi, 40 opere, 61 termini e 15 dossier. */
(()=>{'use strict';
const periods=window.YumeJapanHistoryPeriods||[],events=window.YumeJapanHistoryEvents||[],works=window.YumeJapanHistoryWorks||[],terms=window.YumeJapanHistoryGlossary||[],themes=window.YumeJapanHistoryThemes||[];
if(!periods.length||!events.length||!works.length||!terms.length||!themes.length)return;
const $=id=>document.getElementById(id),N=(tag,cl,t)=>{const e=document.createElement(tag);if(cl)e.className=cl;if(t!==undefined)e.textContent=t;return e},A=(t,u)=>{const e=N('a','',t);e.href=u;e.target='_blank';e.rel='noopener noreferrer';return e};
const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('it');
const date=y=>y<0?Math.abs(y).toLocaleString('it-IT')+' a.C.':String(y);
const byId=new Map(periods.map(p=>[p.id,p])),macros=[...new Set(periods.map(p=>p.macro))],pEmoji={'Preistoria':'🪨','Antichità':'🏛️','Classico':'🌸','Medioevo':'⚔️','Prima età moderna':'🏯','Moderno':'🚂','Contemporaneo':'🌆'};
for(const [id,len] of [['hist-count-periods',periods.length],['hist-count-events',events.length],['hist-count-works',works.length],['hist-count-terms',terms.length]])$(id).textContent=String(len);
const cover=$('hist-hero-art');if(window.YumePhoto)window.YumePhoto.observe(cover,{wiki:'The Great Wave off Kanagawa',query:'Hokusai Great Wave 1831 Edo woodblock',alt:'Stampa di Hokusai del 1831, La grande onda presso Kanagawa',hero:true},$('hist-hero-credit'));
function selectPeriod(id){selPeriod=id;$('hist-period-search').value='';$('hist-period-group').value='all';renderPeriods();$('history-epoche').scrollIntoView({behavior:'smooth',block:'start'})}
let selPeriod='all';
const pTabs=$('hist-period-tabs'),pGrid=$('hist-period-grid');
function periodButton(key,label){const b=N('button','',label);b.type='button';b.dataset.period=key;b.onclick=()=>{selPeriod=key;$('hist-period-search').value='';$('hist-period-group').value='all';renderPeriods();if(key!=='all')$('epoca-'+key)?.scrollIntoView({behavior:'smooth',block:'center'})};pTabs.append(b)}
periodButton('all','Tutte · '+periods.length);periods.forEach(p=>periodButton(p.id,p.name));
macros.forEach(g=>{const o=N('option','',g);o.value=g;$('hist-period-group').append(o)});
function renderPeriods(){
 pGrid.replaceChildren();const q=norm($('hist-period-search').value.trim()),group=$('hist-period-group').value;
 const found=periods.filter(p=>(selPeriod==='all'||p.id===selPeriod)&&(group==='all'||p.macro===group)&&(!q||norm(Object.values(p).join(' ')).includes(q)));
 for(const p of found){
  const card=N('article','jhistory-period-card');card.id='epoca-'+p.id;
  const art=N('figure','jhistory-period-art');art.append(N('span','atlas-photo-placeholder','✦ Arte e luoghi dell’epoca'));
  const credit=A('Immagine e licenza ↗','https://commons.wikimedia.org/');credit.className='jhistory-art-credit';credit.hidden=true;art.append(credit);
  if(window.YumePhoto)window.YumePhoto.observe(art,{wiki:p.wiki,query:p.name+' Japanese historical art',alt:'Immagine associata al periodo '+p.name},credit);
  const body=N('div','jhistory-period-main'),meta=N('div','jhistory-period-meta');
  meta.append(N('span','',pEmoji[p.macro]+' '+p.macro),N('span','',p.dates));body.append(meta,N('h3','',p.name),N('p','jhistory-jp',p.jp),N('p','jhistory-period-teaser',p.power));
  const detail=N('details','jhistory-period-details');detail.append(N('summary','','Leggi il capitolo approfondito'));
  for(const [label,key] of [['Centro del potere','center'],['Governo e istituzioni','power'],['Società, cultura e vita quotidiana','society'],['Indizi visivi per anime e manga','visual'],['Eventi fondamentali','moments'],['Anime e manga: storia e finzione','media'],['Attenzione agli anacronismi','caution']]){
   const section=N('section','jhistory-period-section');section.append(N('h4','',label),N('p','',p[key]));detail.append(section)
  }
  const actions=N('div','jhistory-period-links');actions.append(A('↗ Fonte e approfondimento',p.source));
  const matching=works.filter(w=>w.period===p.id).length;if(matching){const b=N('button','','🎞 '+matching+' riferimenti anime/manga ↗');b.type='button';b.onclick=()=>{$('hist-work-period').value=p.id;$('hist-work-search').value='';renderWorks();$('history-anime').scrollIntoView({behavior:'smooth',block:'start'})};actions.append(b)}
  detail.append(actions);body.append(detail);card.append(art,body);pGrid.append(card)
 }
 $('hist-period-empty').hidden=found.length>0;
 pTabs.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.period===selPeriod)));
}
$('hist-period-search').oninput=()=>{selPeriod='all';renderPeriods()};
$('hist-period-group').onchange=()=>{selPeriod='all';renderPeriods()};
$('hist-period-reset').onclick=()=>{selPeriod='all';$('hist-period-group').value='all';$('hist-period-search').value='';renderPeriods()};
renderPeriods();
// Year lookup; overlaps are intentional, notably 1336, 1600, 1868, 1945.
function matchYear(){
 const y=Number($('hist-year-input').value),out=$('hist-year-output');out.replaceChildren();
 if(!Number.isInteger(y)||y===0||y< -35000||y>2026){out.append(N('p','','Inserisci un anno valido tra 35.000 a.C. e il 2026. Non esiste l’anno zero nella numerazione storica convenzionale.'));return}
 const found=periods.filter(p=>p.start<=y&&p.end>=y);
 out.append(N('h3','',date(y)+' · '+found.length+' epoche compatibili'),N('p','','Le date sono convenzionali; alcuni periodi si sovrappongono e gli anni di transizione possono comparire due volte.'));
 const box=N('div','jhistory-year-results');for(const p of found){const b=N('button','jhistory-year-chip');b.type='button';b.append(N('strong','',p.name),N('small','',p.dates));b.onclick=()=>selectPeriod(p.id);box.append(b)}out.append(box)
}
$('hist-year-form').onsubmit=e=>{e.preventDefault();matchYear()};matchYear();
// Generic paged collection engine (events, works, dictionary)
function collection({root,more,count,search,select,batch,data,make,match,label}){
 let active=[],shown=0;const container=$(root),btn=$(more),status=$(count),q=$(search),sel=$(select);
 const load=()=>{const frag=document.createDocumentFragment(),slice=active.slice(shown,shown+batch);slice.forEach(x=>frag.append(make(x)));container.append(frag);shown+=slice.length;btn.hidden=shown>=active.length;btn.textContent='Mostra altri ('+(active.length-shown)+' restanti) ↓';status.textContent=shown+' mostrati su '+active.length+' trovati · '+data.length+' '+label};
 const render=()=>{const query=norm(q.value.trim()),filter=sel.value;active=data.filter(x=>match(x,query,filter));shown=0;container.replaceChildren();if(active.length)load();else{btn.hidden=true;status.textContent='Nessun risultato trovato'}};
 q.addEventListener('input',render);sel.addEventListener('change',render);btn.addEventListener('click',load);render();return render
}
function toOption(select,id,label){const o=N('option','',label);o.value=id;$(select).append(o)}
for(const p of periods)toOption('hist-event-period',p.id,p.name);
const eventsSorted=events.slice().sort((a,b)=>a.year-b.year);
const renderEvents=collection({root:'hist-events-list',more:'hist-events-more',count:'hist-events-count',search:'hist-event-search',select:'hist-event-period',batch:16,data:eventsSorted,label:'eventi',
 match:(e,q,filter)=>(filter==='all'||e.period===filter)&&(!q||norm([date(e.year),e.title,e.description,e.qualifier,byId.get(e.period)?.name].join(' ')).includes(q)),
 make:e=>{const card=N('article','jhistory-event'),body=N('div','jhistory-event-body');body.append(N('h3','',e.title),N('p','',e.description));if(e.qualifier)body.append(N('p','jhistory-event-caveat',e.qualifier));
 const p=byId.get(e.period);if(p){const b=N('button','jhistory-event-era',p.name+' ↗');b.type='button';b.onclick=()=>selectPeriod(p.id);body.append(b)}
 card.append(N('span','jhistory-event-date',date(e.year)),body);return card}});
$('hist-event-reset').onclick=()=>{$('hist-event-search').value='';$('hist-event-period').value='all';renderEvents()};
for(const p of periods)if(works.some(w=>w.period===p.id))toOption('hist-work-period',p.id,p.name);
const renderWorks=collection({root:'hist-work-grid',more:'hist-works-more',count:'hist-works-count',search:'hist-work-search',select:'hist-work-period',batch:12,data:works,label:'opere',
 match:(w,q,f)=>(f==='all'||f===w.period)&&(!q||norm([w.title,w.relation,w.description,w.caution,byId.get(w.period)?.name].join(' ')).includes(q)),
 make:w=>{const card=N('article','jhistory-work-card'),p=byId.get(w.period);
 card.append(N('span','jhistory-work-period',p?.name||'Epoca'),N('h3','',w.title),N('p','jhistory-work-type',w.relation),N('p','',w.description));
 const caveat=N('p','jhistory-work-caution');caveat.append(N('strong','','Finzione ≠ fatto storico. '),document.createTextNode(w.caution));card.append(caveat);
 const action=N('div','jhistory-work-actions');if(w.source)action.append(A('↗ '+(w.sourceType==='Editore / licenziatario'?'Scheda dell’opera':'Contesto storico'),w.source));
 if(p){const btn=N('button','','Apri l’epoca ↗');btn.type='button';btn.onclick=()=>selectPeriod(p.id);action.append(btn)}
 card.append(action);return card}});
$('hist-work-reset').onclick=()=>{$('hist-work-search').value='';$('hist-work-period').value='all';renderWorks()};
// Thematic essays
const topicTabs=$('hist-topic-tabs'),topicGrid=$('hist-topic-grid');let topicSel='all';
function topicButton(id,label){const b=N('button','',label);b.type='button';b.dataset.group=id;b.onclick=()=>{topicSel=id;renderThemes()};topicTabs.append(b)}
topicButton('all','Tutti · '+themes.length);[...new Set(themes.map(t=>t.group))].forEach(x=>topicButton(x,x));
function renderThemes(){topicGrid.replaceChildren();for(const t of themes.filter(x=>topicSel==='all'||x.group===topicSel)){
 const card=N('article','jhistory-topic-card'),detail=N('details');detail.append(N('summary','',t.title),N('p','',t.body));
 const note=N('p','jhistory-topic-question');note.append(N('strong','','Come leggere un anime: '),document.createTextNode(t.question));
 detail.append(note,A('↗ Fonte storica',t.source));card.append(N('span','jhistory-topic-category',t.group),detail);topicGrid.append(card)
 }
 topicTabs.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.group===topicSel)))
}renderThemes();
// Glossary
for(const g of [...new Set(terms.map(x=>x.group))])toOption('hist-gloss-group',g,g);
const renderGloss=collection({root:'hist-glossary-grid',more:'hist-gloss-more',count:'hist-gloss-count',search:'hist-gloss-search',select:'hist-gloss-group',batch:20,data:terms,label:'termini',
 match:(t,q,f)=>(f==='all'||t.group===f)&&(!q||norm([t.term,t.jp,t.group,t.description,t.recognize].join(' ')).includes(q)),
 make:t=>{const card=N('article','jhistory-glossary-card');card.append(N('span','jhistory-glossary-group',t.group),N('h3','',t.term),N('p','jhistory-jp',t.jp),N('p','',t.description));
 const note=N('p','jhistory-glossary-note');note.append(N('strong','','Da ricordare · '),document.createTextNode(t.recognize));card.append(note);return card}});
$('hist-gloss-reset').onclick=()=>{$('hist-gloss-search').value='';$('hist-gloss-group').value='all';renderGloss()};
// Mini quiz uses dated clues that avoid ambiguous boundaries.
const quiz=[
 ['Una dama scrive poesie waka nella corte aristocratica di Heian-kyō attorno al 1000.','heian','nara,heian,edo,taisho','È il mondo letterario Heian di Murasaki Shikibu.'],
 ['Vasi con impronte di corda e statuette dogū nei villaggi antichissimi.','jomon','yayoi,kofun,jomon,asuka','Gli oggetti dogū sono un indizio del Jōmon.'],
 ['Grandi tombe a forma di buco di serratura e figurine haniwa.','kofun','kamakura,kofun,heian,nara','Le grandi sepolture d’élite identificano Kofun.'],
 ['Un guerriero difende Tsushima durante l’invasione mongola del 1274.','kamakura','sengoku,heian,kamakura,bakumatsu','Il 1274 è nel periodo Kamakura.'],
 ['Siamo nel 1334: Go-Daigo tenta di restaurare l’autorità imperiale dopo gli Hōjō.','kenmu','kenmu,meiji,nanbokucho,muromachi','Il periodo Kenmu dura dal 1333 al 1336.'],
 ['Nel 1360 ci sono una corte imperiale del Nord e una del Sud.','nanbokucho','kamakura,edo,nanbokucho,taisho','È il conflitto fra le corti, 1336–1392.'],
 ['La guerra Ōnin devasta Kyoto nel 1467, aprendo la fase delle guerre dei domini.','sengoku','bakumatsu,sengoku,nara,meiji','L’inizio convenzionale del Sengoku è il 1467.'],
 ['Un governo Tokugawa a Edo, teatro kabuki e stampe ukiyo-e.','edo','edo,heian,kamakura,reiwa','Gli indizi sono caratteristici della cultura Edo.'],
 ['Siamo nel 1864: Shinsengumi a Kyoto, navi straniere, crollo dello shogunato.','bakumatsu','meiji,sengoku,bakumatsu,heisei','Bakumatsu è l’ultima fase di Edo, prima del 1868.'],
 ['Nel 1877 ex samurai si ribellano all’esercito di leva del nuovo Stato.','meiji','meiji,edo,taisho,kamakura','La ribellione di Satsuma è nel Meiji.'],
 ['Nell’anno 1918 convivono treni, lampade elettriche e kimono.','taisho','meiji,taisho,heian,showa-dopoguerra','Il 1918 è nell’era Taishō.'],
 ['È il 1944: guerra nel Pacifico, razionamento, bombardamenti.','showa-guerra','showa-dopoguerra,showa-guerra,taisho,heisei','È lo Shōwa prima della sconfitta del 1945.'],
 ['Nel 1964 si inaugurano lo Shinkansen e le Olimpiadi di Tokyo.','showa-dopoguerra','meiji,showa-dopoguerra,showa-guerra,reiwa','Siamo nel boom postbellico dello Shōwa.'],
 ['Un manga mostra il Giappone dei primi anni 2000, nel regno di Akihito.','heisei','heisei,reiwa,showa-dopoguerra,edo','Heisei è il nome dell’era 1989–2019.'],
 ['Nel 2024 l’era imperiale porta il nome Reiwa.','reiwa','taisho,heisei,reiwa,meiji','La Reiwa è iniziata nel 2019.']
];
let index=0,score=0,answered=false;
function quizRender(){
 const row=quiz[index];answered=false;
 $('hist-quiz-number').textContent='Domanda '+(index+1)+' di '+quiz.length;
 $('hist-quiz-score').textContent=score+' risposte corrette';
 $('hist-quiz-question').textContent=row[0];
 $('hist-quiz-feedback').textContent='';$('hist-quiz-feedback').className='jhistory-quiz-feedback';
 const panel=$('hist-quiz-answers');panel.replaceChildren();
 for(const v of row[2].split(',')){const p=byId.get(v);const b=N('button','jhistory-quiz-answer',p?.name||v);b.type='button';b.dataset.id=v;b.onclick=()=>{
  if(answered)return;answered=true;const yes=v===row[1];if(yes)score++;
  panel.querySelectorAll('button').forEach(x=>{x.disabled=true;if(x.dataset.id===row[1])x.classList.add('correct');else if(x===b)x.classList.add('incorrect')});
  $('hist-quiz-score').textContent=score+' risposte corrette';
  $('hist-quiz-feedback').textContent=(yes?'✓ Corretto! ':'✗ Risposta corretta: '+byId.get(row[1]).name+'. ')+row[3];
  $('hist-quiz-feedback').classList.add(yes?'right':'wrong');$('hist-quiz-next').disabled=false;
 };panel.append(b)}
 $('hist-quiz-next').disabled=true;
 $('hist-quiz-next').textContent=index===quiz.length-1?'Termina il quiz →':'Prossima domanda →'
}
$('hist-quiz-next').onclick=()=>{if(!answered)return;if(index===quiz.length-1){$('hist-quiz-question').textContent='Risultato: '+score+' su '+quiz.length+' epoche riconosciute';$('hist-quiz-number').textContent='Quiz completato';$('hist-quiz-answers').replaceChildren();$('hist-quiz-feedback').textContent='Puoi ripassare le epoche e riprovare. Le date di queste domande sono scelte per evitare sovrapposizioni ambigue.';$('hist-quiz-next').disabled=true}else{index++;quizRender()}};
$('hist-quiz-restart').onclick=()=>{index=0;score=0;quizRender()};quizRender();
})();