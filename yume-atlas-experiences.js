/* Yume Atlas · media, discovery and personal experiences */
(function(){
'use strict';
const C=window.YumeAtlasCore;if(!C)return;
const {D,E,append,L,normalize,number,button,input,select,panel,stat,grid,tile,works,group,message,fail,load,save,date,catalog,fetchJSON,root}=C;
C.renderers.cinema=async()=>{
 const p=panel('Film anime nel catalogo','Filtra i lungometraggi in base alla classificazione registrata nei metadati originali. Nessuna disponibilità cinema o streaming viene dedotta.');root.append(p);
 try{const films=(await catalog()).filter(x=>x.type==='anime'&&/movie|film/i.test([x.mediaFormat,x.format].join(' '))).sort((a,b)=>(b.releaseYear||0)-(a.releaseYear||0));
 const years=[['','Tutti gli anni'],['2020','2020–2029'],['2010','2010–2019'],['2000','2000–2009'],['1990','1990–1999'],['1980','1980–1989'],['1970','Prima del 1980']];
 const q=input('Cerca film, studio, genere…'),pick=select(years),bar=append(grid('at-toolbar'),q,pick),out=E('div');
 append(p,stat('Film registrati',number(films.length)),bar,out);
 function draw(){out.replaceChildren();let matches=films.filter(x=>normalize([x.title,x.studio,(x.genres||[]).join(' ')].join(' ')).includes(normalize(q.value)));
 if(pick.value){const y=Number(pick.value);matches=matches.filter(x=>y===1970?(x.releaseYear||0)<1980:(x.releaseYear||0)>=y&&(x.releaseYear||0)<y+10)}
 out.append(message(number(matches.length)+' film corrispondenti, primi 36 visualizzati.'));works(out,matches.slice(0,36),x=>(x.releaseYear||'Anno n.d.')+' · '+(x.studio||'Studio non indicato'))}
 q.addEventListener('input',draw);pick.addEventListener('change',draw);draw();
 }catch(e){fail(p,e)}
 root.append(group('Dietro lo schermo',[['Yume Chronos','L’evoluzione storica del cinema anime.','chronos.html'],['Studio Ghibli e autori','Scopri registi e studi del cinema giapponese.','yume-explore.html?area=creators'],['Yume Magazine','Analisi, storie e dossier originali.','yume-magazine.html']]));
};
C.renderers.museum=()=>{
 const p=panel('Sei sale da esplorare','Un museo digitale editoriale: nessun oggetto è spacciato per manufatto fisico della tua collezione.');root.append(p);
 const g=grid('at-museum-grid');D.museum.forEach(([name,desc,id,label],i)=>{
 const detail=E('details','at-museum-room'),head=E('summary');append(head,E('span','at-room-number','0'+(i+1)),E('h3','',name),E('small','',label));append(detail,head,E('p','',desc),L('Apri il percorso ↗','yume-explore.html?area='+id));g.append(detail)});p.append(g);
 root.append(group('Archivi correlati',[['La macchina del tempo','La cronologia di anime e manga dal 1917 al 2024.','chronos.html'],['Il Giappone','Tradizioni, luoghi e miti che hanno influenzato le opere.','yume-japan.html']]));
};
C.renderers.quest=()=>{
 const p=panel('Yume Quiz · 10 domande','Rispondi, controlla il risultato e riprova quando vuoi. Tutto avviene nel browser.');root.append(p);
 const out=E('div','at-quiz'),foot=E('p','at-muted');append(p,out,foot);let current=0,score=0;
 function draw(){out.replaceChildren();if(current>=D.quiz.length){append(out,E('h3','',score+' / '+D.quiz.length+' punti'),E('p','',score>=8?'Ottimo! Hai attraversato Yume con stile.':'Ci sono ancora tanti mondi da scoprire.'));const again=button('Ricomincia');again.addEventListener('click',()=>{current=0;score=0;draw()});out.append(again);foot.textContent='Nessun risultato è inviato al server.';return}
 let answered=false;const [q,options,correct,explanation]=D.quiz[current];append(out,E('p','at-quiz-progress','Domanda '+(current+1)+' / '+D.quiz.length),E('h3','',q));
 const choices=grid('at-quiz-choices'),messageBox=E('p','at-status'),next=button(current===D.quiz.length-1?'Mostra il risultato':'Prossima domanda →');next.hidden=true;
 options.forEach((text,i)=>{const btn=button(text,'at-choice');btn.addEventListener('click',()=>{if(answered)return;answered=true;if(i===correct)score++;
 [...choices.children].forEach((b,j)=>{b.disabled=true;if(j===correct)b.classList.add('at-correct');else if(i===j)b.classList.add('at-incorrect')});
 messageBox.textContent=(i===correct?'Esatto. ':'Non esatto. ')+explanation;next.hidden=false});choices.append(btn)});
 next.addEventListener('click',()=>{current++;draw()});append(out,choices,messageBox,next);foot.textContent='Punti: '+score;
 }draw();
};
C.renderers.discover=async()=>{
 const p=panel('Che cosa guardo stasera?','Selezione casuale filtrata per genere e formato. Non modifica lo stato delle opere e non promette consigli basati su preferenze non registrate.');root.append(p);
 try{const anime=(await catalog()).filter(x=>x.type==='anime'&&!/completed|completato|completo|visto|concluso/i.test(x.status||'')),g=select([['','Tutti i generi'],...D.genres.map(x=>[x[0],x[1]])]),f=select([['','Qualsiasi formato'],['TV','Serie TV'],['MOVIE','Film'],['ONA','Serie web'],['OVA','OVA']]),go=button('Sorprendimi ✧'),out=E('div');
 g.setAttribute('aria-label','Scegli un genere');f.setAttribute('aria-label','Scegli un formato');append(p,append(grid('at-toolbar'),g,f,go),out);
 function draw(){out.replaceChildren();const candidates=anime.filter(x=>(!g.value||(x.genres||[]).includes(g.value))&&(!f.value||String(x.mediaFormat||'').toUpperCase().includes(f.value)));
 if(!candidates.length){out.append(message('Nessuna opera soddisfa questi filtri.'));return}
 const pick=candidates[Math.floor(Math.random()*candidates.length)];out.append(stat('Candidati',number(candidates.length)));works(out,[pick],x=>(x.genres||[]).slice(0,4).join(' · ')+' · '+(x.total??'?')+' episodi registrati');
 out.append(message('Estratto casualmente tra le schede compatibili: nessuna preferenza o progresso è stato alterato.'))}
 go.addEventListener('click',draw);draw();
 }catch(e){fail(p,e)}
};
C.renderers.gaming=()=>{
 const p=panel('Videogiochi, storie e media mix','Sei percorsi per distinguere anime adattati da videogiochi, giochi tratti da manga e mondi narrativi nati come giochi.');root.append(p);
 const tabs=grid('at-chips'),out=E('div','at-feature-detail');append(p,tabs,out);
 function draw(i){tabs.replaceChildren();D.gaming.forEach(([label],index)=>{const b=button(label,'at-genre');b.setAttribute('aria-pressed',String(i===index));b.addEventListener('click',()=>draw(index));tabs.append(b)});
 const [name,description,example]=D.gaming[i];out.replaceChildren();append(out,E('h3','',name),E('p','',description),E('p','at-muted',example))}
 draw(0);p.append(L('Esplora gli universi collegati ↗','universe.html'));
};
C.renderers.newsroom=async()=>{
 const p=panel('Archivi della redazione','Questa bacheca mostra gli archivi consultati dal sito. Gli annunci e le date non sono prove di uscita, acquisto o trasmissione avvenuta.');root.append(p);
 const sources=[['Episodi anime','data/episode-calendar.json','calendario-anime.html'],['Calendario manga & novel','data/book-calendar.json','uscite-manga.html'],['Yume Magazine','data/magazine/numero-zero.json','yume-magazine.html']];
 const response=await Promise.allSettled(sources.map(x=>fetchJSON(x[1]))),g=grid();
 response.forEach((v,i)=>{const [title,url,href]=sources[i],box=tile(title,'',href,'Apri archivio ↗');
 if(v.status==='fulfilled'){const obj=v.value,rows=Array.isArray(obj.events)?obj.events:Array.isArray(obj.releases)?obj.releases:Array.isArray(obj.articles)?obj.articles:[];
 append(box,E('p','at-muted','Ultima osservazione o data editoriale: '+date(obj.updatedAt||obj.date)),
 E('p','',number(rows.length)+' record leggibili in questo archivio.'));
 const today=new Date().toISOString().slice(0,10),dated=rows.filter(x=>x.date).sort((a,b)=>String(a.date).localeCompare(String(b.date))),next=dated.filter(x=>x.date>=today);(next.length?next.slice(0,3):dated.slice(-3)).concat(dated.length?[]:rows.slice(0,3)).forEach(x=>box.append(E('p','at-small',[x.date||x.releaseDate||'',x.title||x.name||'Voce editoriale'].filter(Boolean).join(' · '))))
 }else box.append(message('La fonte non è accessibile ora.'));g.append(box)});p.append(g);
 root.append(group('Le altre scrivanie di Yume',[['Yume Magazine','Dossier, rubriche e articoli originali.','yume-magazine.html'],['Manga vs Anime','Analisi comparate con controllo degli spoiler.','manga-vs-anime.html'],['Chronos','Le date storiche della cultura anime.','chronos.html']]));
};
C.renderers.journal=()=>{
 const key='yume-atlas-journal-v1',p=panel('Il tuo diario personale','Le note sono salvate solo in questo browser, non su Google Sheets né sul server. Scarica un backup JSON per conservarle.');root.append(p);
 const form=E('form','at-journal-form'),title=input('Nome anime o manga','text'),rating=select([['','Nessun voto'],...Array.from({length:10},(_,i)=>[String(10-i),String(10-i)+'/10'])]),note=E('textarea','at-input'),saveButton=E('button','at-button','Salva nota');
 title.required=true;note.required=true;note.rows=5;note.maxLength=5000;note.placeholder='Un ricordo, una recensione, le tue impressioni…';note.setAttribute('aria-label','Testo della nota');rating.setAttribute('aria-label','Voto alla storia');saveButton.type='submit';
 append(form,title,rating,note,saveButton);p.append(form);
 const tools=grid('at-toolbar'),exp=button('Esporta JSON'),imp=button('Importa JSON'),file=input('Importa JSON','file'),out=E('div');
 file.accept='.json,application/json';file.hidden=true;append(tools,exp,imp,file);append(p,tools,out);
 function render(){out.replaceChildren();const data=load(key);if(!data.length){out.append(message('Nessuna nota ancora registrata.'));return}
 data.slice().reverse().forEach(n=>{const row=E('article','at-note');append(row,E('h3','',n.title),E('small','',date(n.date)+(n.rating?' · '+n.rating+'/10':'')),E('p','',n.note));
 const del=button('Elimina','at-quiet');del.addEventListener('click',()=>{if(!window.confirm('Eliminare questa nota?'))return;save(key,load(key).filter(x=>x.id!==n.id));render()});row.append(del);out.append(row)})}
 form.addEventListener('submit',e=>{e.preventDefault();const obj={id:Date.now()+'-'+Math.random().toString(36).slice(2),date:new Date().toISOString(),title:title.value.trim().slice(0,200),note:note.value.trim().slice(0,5000),rating:rating.value};
 if(!obj.title||!obj.note)return;const all=load(key);all.push(obj);if(!save(key,all)){window.alert('Impossibile salvare: verifica le impostazioni di archiviazione del browser.');return}form.reset();render()});
 exp.addEventListener('click',()=>{const data=JSON.stringify({schemaVersion:1,notes:load(key)},null,2),blob=new Blob([data],{type:'application/json'}),url=URL.createObjectURL(blob),link=E('a');link.href=url;link.download='yume-journal-backup.json';link.click();window.setTimeout(()=>URL.revokeObjectURL(url),1500)});
 imp.addEventListener('click',()=>file.click());
 file.addEventListener('change',async()=>{if(!file.files?.[0])return;try{if(file.files[0].size>2000000)throw Error('File troppo grande');const data=JSON.parse(await file.files[0].text());if(data.schemaVersion!==1||!Array.isArray(data.notes))throw Error('Struttura non valida');
 const old=load(key),existing=new Set(old.map(x=>x.id));
 const rows=data.notes.filter(x=>x&&typeof x.title==='string'&&typeof x.note==='string').slice(0,500).map(x=>({id:String(x.id||Date.now()).slice(0,100),date:String(x.date||new Date().toISOString()).slice(0,35),title:x.title.slice(0,200),note:x.note.slice(0,5000),rating:String(x.rating||'').slice(0,2)})).filter(x=>!existing.has(x.id));
 if(!save(key,old.concat(rows)))throw Error('Il browser non ha accettato il salvataggio');render();window.alert(rows.length+' note importate senza cancellare le altre.');
 }catch(e){window.alert('Importazione fallita: '+e.message)}finally{file.value=''}});
 render();
};
C.run();
})();