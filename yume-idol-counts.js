/* Yume Idols — single-source counters. Duplicates within and across category lists are removed by displayed name; no unverified live Wikidata totals. */
(()=>{'use strict';
 const d=window.YumeIdolsDiscovery,s=window.YumeSportIdols,a=window.YumeAsiaIdols,y=window.YumeYoungStars;if(!d||!s||!a)return;
 const normalize=x=>String(x||'').normalize('NFKC').normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('en').replace(/\s+/g,'').trim();
 const unique=arr=>new Set(arr.map(x=>normalize(x.name)).filter(Boolean));
 const persons=d.people.filter(x=>x.category!=='groups');
 const japaneseAndSport=unique([...persons,...s.people]).size;
 const bands=[
  ['universo','Profili in archivio',japaneseAndSport+a.total,'Somma delle tre raccolte individuali'],
  ['idols','Idols del Giappone',unique(persons).size,'Artiste, modelle, creator e VTuber'],
  ['asia','Asia Idols',a.total,a.countries.length+' scene asiatiche'],
  ['sport','Sport Idols',unique(s.people).size,s.disciplines.length+' discipline'],
  ['gruppi','Gruppi e formazioni',unique(d.people.filter(x=>x.category==='groups')).size+a.groupCount,'Progetti giapponesi e asiatici'],
  ['young','Young Stars · 13–19',y?.count||0,'Sottoinsieme dei cataloghi, non sommato al totale']
 ];
 const nf=new Intl.NumberFormat('it-IT');
 for(const section of document.querySelectorAll('[data-yume-counts]')){
  const heading=document.createElement('div');heading.className='yume-counts-header';
  const eyebrow=document.createElement('span');eyebrow.className='yume-counts-eyebrow';eyebrow.textContent='夢 · L’ARCHIVIO IN NUMERI';
  const title=document.createElement('h2');title.textContent='I volti di Yume, in continua crescita.';
  heading.append(eyebrow,title);
  const grid=document.createElement('div');grid.className='yume-counts-grid';
  for(const [key,label,total,note] of bands){
   const card=document.createElement('a');card.className='yume-counts-card';card.href=key==='sport'?'sport-idols.html':key==='asia'?'asia-idols.html':key==='young'?'young-stars.html':key==='universo'?'idols.html#idols-directory':key==='gruppi'?'idols.html#idols-discover':'idols.html';
   const value=document.createElement('strong');value.textContent=nf.format(total);value.className='yume-counts-number';
   const caption=document.createElement('span');caption.className='yume-counts-label';caption.textContent=label;
   const small=document.createElement('small');small.textContent=note;
   card.append(value,caption,small);grid.append(card);
  }
  const note=document.createElement('p');note.className='yume-counts-note';
  note.textContent='Conteggi dei cataloghi pubblicati: '+nf.format(d.people.length)+' voci categorizzate giapponesi, '+nf.format(a.total)+' artiste nelle scene asiatiche e '+nf.format(s.people.length)+' atlete. I gruppi sono conteggiati a parte. Il totale somma le tre raccolte: nomi d’arte e appartenenze internazionali possono sovrapporsi; non è un censimento di persone uniche a livello mondiale. Young Stars è un sottoinsieme professionale, non aggiunto al totale. Le foto e i profili Wikidata caricati in tempo reale non incrementano questi numeri.';
  section.replaceChildren(heading,grid,note)
 }
 window.YumePeopleCounts=Object.freeze({people:bands[0][2],idols:bands[1][2],asia:bands[2][2],athletes:bands[3][2],groups:bands[4][2],young:bands[5][2],entries:d.people.length,asiaSources:a.sourceCount,sourceTotal:d.stats.sources+a.sourceCount});
})();