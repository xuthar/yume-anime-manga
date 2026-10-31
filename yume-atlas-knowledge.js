/* Yume Atlas · Knowledge and collections modules */
(function(){
'use strict';
const C=window.YumeAtlasCore;if(!C)return;
const {D,E,append,L,normalize,number,button,input,select,panel,stat,grid,tile,work,works,group,message,fail,load,save,catalog,root}=C;
C.renderers.nexus=async()=>{
 const p=panel('Costellazioni dei franchise','Ogni collegamento proviene dai campi franchiseId e studio del catalogo: non vengono dedotte relazioni narrative.');root.append(p);
 try{const items=(await catalog()).filter(x=>x.type==='anime'&&x.franchiseId),groups=new Map();
 items.forEach(x=>{if(!groups.has(x.franchiseId))groups.set(x.franchiseId,[]);groups.get(x.franchiseId).push(x)});
 const options=[...groups].filter(x=>x[1].length>1).sort((a,b)=>b[1].length-a[1].length).slice(0,50);
 append(p,append(grid('at-stats'),stat('Anime con franchise',number(items.length)),stat('Franchise documentati',number(groups.size)),stat('Mappe consultabili',number(options.length))));
 const pick=select(options.map(([key,items])=>[key,(items[0].franchiseTitle||items[0].title)+' · '+items.length+' opere']));pick.setAttribute('aria-label','Seleziona franchise');
 const visual=E('div','at-network'),listing=E('div');append(p,pick,visual,listing);
 const SVG='http://www.w3.org/2000/svg';
 const node=(tag,attrs,txt)=>{const el=document.createElementNS(SVG,tag);Object.entries(attrs).forEach(([key,value])=>el.setAttribute(key,value));if(txt)el.textContent=txt;return el};
 function draw(){visual.replaceChildren();listing.replaceChildren();const list=groups.get(pick.value)||[];if(!list.length)return;
 const svg=node('svg',{viewBox:'0 0 800 430',role:'img','aria-label':'Mappa delle opere del franchise selezionato'});
 const n=Math.min(9,list.length);svg.append(node('circle',{cx:400,cy:215,r:74,fill:'#64558b',stroke:'#f7c4e4','stroke-width':3}));
 svg.append(node('text',{x:400,y:215,'text-anchor':'middle',fill:'white','font-size':16},(list[0].franchiseTitle||list[0].title).slice(0,27)));
 for(let i=0;i<n;i++){const angle=2*Math.PI*i/n-Math.PI/2,x=400+270*Math.cos(angle),y=215+150*Math.sin(angle);
 svg.append(node('line',{x1:400,y1:215,x2:x,y2:y,stroke:'#99e5de','stroke-width':2,opacity:.6}));
 svg.append(node('circle',{cx:x,cy:y,r:38,fill:'#253c59',stroke:'#b0f1de','stroke-width':2}));
 svg.append(node('text',{x,y:y-3,'text-anchor':'middle',fill:'white','font-size':12},String(list[i].releaseYear||'Anime')));
 svg.append(node('text',{x,y:y+14,'text-anchor':'middle',fill:'#c4e5e5','font-size':10},String(list[i].mediaFormat||'TV').slice(0,9)));}
 visual.append(svg);listing.append(message(list.length+' opere correlate. La visualizzazione mostra al massimo 9 nodi, la lista fino a 24.'));works(listing,list.slice(0,24),x=>(x.releaseYear||'Anno n.d.')+' · '+(x.studio||'Studio n.d.'));}
 pick.addEventListener('change',draw);if(options.length)draw();else p.append(message('Non risultano franchise plurimi.'));
 }catch(e){fail(p,e)}
};
C.renderers.creators=async()=>{
 root.append(group('Autori, registi e figure chiave · profili introduttivi',[
 ['Osamu Tezuka','Autore di Astro Boy e figura centrale della storia del manga e della televisione animata.','https://tezukaosamu.net/en/'],
 ['Hayao Miyazaki','Regista e cofondatore di Studio Ghibli, autore di numerosi lungometraggi.','https://www.ghibli.jp/'],
 ['Isao Takahata','Regista e cofondatore dello Studio Ghibli; dal realismo al racconto storico.','https://www.ghibli.jp/'],
 ['Akira Toriyama','Mangaka e creatore di Dragon Ball.','https://en.dragon-ball-official.com/'],
 ['Katsuhiro Otomo','Autore e regista legato ad AKIRA e alla fantascienza urbana.','https://www.bfi.org.uk/'],
 ['Makoto Shinkai','Regista di Your Name e altri racconti cinematografici.','https://www.cwfilms.jp/']]));
 const p=panel('Gli studi presenti nel tuo catalogo','Gli studi sono ricavati dal campo studio delle schede anime. Non attribuiamo automaticamente autori o registi: serve una verifica individuale.');root.append(p);
 try{const anime=(await catalog()).filter(x=>x.type==='anime'&&x.studio),count=new Map();
 anime.forEach(x=>String(x.studio).split(/[,/&]/).map(y=>y.trim()).filter(Boolean).forEach(k=>{if(!count.has(k))count.set(k,[]);count.get(k).push(x)}));
 const sorted=[...count].sort((a,b)=>b[1].length-a[1].length);
 p.append(append(grid('at-stats'),stat('Studi individuati',number(sorted.length)),stat('Schede con studio',number(anime.length))));
 const query=input('Cerca studio di animazione…'),out=E('div');append(p,query,out);
 function draw(){out.replaceChildren();const g=grid();sorted.filter(x=>normalize(x[0]).includes(normalize(query.value))).slice(0,36).forEach(([name,rows])=>{
 g.append(tile(name,rows.length+' anime associati. '+rows.slice(0,3).map(x=>x.title).join(' · '),'universe.html','Esplora Universe ↗'))});out.append(g)}
 query.addEventListener('input',draw);draw();
 }catch(e){fail(p,e)}
};
C.renderers.origins=()=>{
 const p=panel('Dieci fasi della produzione','Una pipeline tipica, non una regola universale. Un anime originale può non avere alcun manga di partenza.');root.append(p);
 const list=E('div','at-steps');D.production.forEach(([name,detail,roles],i)=>{
 const d=E('details','at-step');append(d,E('summary','',(i+1)+'. '+name),E('p','',detail),E('small','',roles));list.append(d)});p.append(list);
 root.append(group('Continua a esplorare',[['Manga vs Anime','Confronti editoriali tra linguaggio visivo della pagina e dell’animazione.','manga-vs-anime.html'],['Chronos','Come la produzione è cambiata nel corso del tempo.','chronos.html'],['Yume Publishing','Riviste, volumi ed edizioni.','yume-explore.html?area=publishing']]));
};
C.renderers.characters=()=>{
 const p=panel('Profili introduttivi senza spoiler','Una selezione editoriale di protagonisti. Le biografie non affermano parentele o apparizioni non documentate.');root.append(p);
 const q=input('Cerca un personaggio o una storia…'),out=E('div');append(p,q,out);
 function draw(){out.replaceChildren();const g=grid();D.characters.filter(row=>normalize(row.join(' ')).includes(normalize(q.value))).forEach(([name,work,desc,year])=>g.append(tile(name+' · '+year,work+' — '+desc,'universe.html','Esplora universi ↗')));out.append(g)}
 q.addEventListener('input',draw);draw();
};
C.renderers.genres=async()=>{
 const p=panel('Il laboratorio dei generi','Generi narrativi, temi e demografie editoriali non sono la stessa cosa: i conteggi seguenti riprendono solo le etichette del catalogo.');root.append(p);
 try{const anime=(await catalog()).filter(x=>x.type==='anime'),labels=grid('at-genre-grid'),out=E('div');append(p,labels,out);let current='';
 function draw(){labels.replaceChildren();D.genres.forEach(([key,name,desc])=>{const count=anime.filter(x=>(x.genres||[]).includes(key)).length,b=button(name+' · '+number(count),'at-genre');b.title=desc;b.setAttribute('aria-pressed',String(current===key));b.addEventListener('click',()=>{current=current===key?'':key;draw()});labels.append(b)});
 out.replaceChildren();if(!current){out.append(message('Scegli un genere per vedere i titoli registrati.'));return}const item=D.genres.find(x=>x[0]===current);
 append(out,E('h3','',item[1]),E('p','at-muted',item[2]));works(out,anime.filter(x=>(x.genres||[]).includes(current)).slice(0,18));}
 draw();
 }catch(e){fail(p,e)}
};
C.renderers.sound=()=>{
 root.append(group('Sei modi per ascoltare gli anime',[
 ['Opening & ending','Esplora le sigle, gli artisti e i collegamenti disponibili.','sigle-anime.html'],
 ['Colonne sonore','Temi strumentali, OST e musica per le scene.','colonne-sonore-anime.html'],
 ['J-Pop & idol','Gruppi, artisti, musica dal vivo e discografie.','jpop.html'],
 ['Sigle italiane','La storia delle sigle adattate e interpretate per la TV italiana.','sigle-italiane.html'],
 ['Top 100 canzoni giapponesi','Una selezione editoriale di brani da scoprire.','top-canzoni-giapponesi.html'],
 ['Produzione sonora','Compositori, registi del suono e doppiatori nel processo produttivo.','yume-explore.html?area=origins']]));
 const p=panel('Tre linguaggi sonori','L’opening introduce una serie, l’ending accompagna la chiusura, la colonna sonora accompagna le scene. Gli interpreti delle sigle non sono necessariamente i compositori della musica strumentale.');p.append(message('Le registrazioni musicali restano sui servizi autorizzati, non vengono riutilizzate come file audio.'));root.append(p);
};
C.renderers['collector-pro']=async()=>{
 const p=panel('Inventario ragionato','Confronti tra volumi posseduti e volumi originali possono essere fuorvianti per omnibus, kanzenban e raccolte. Nessuna differenza viene classificata automaticamente come acquisto da fare.');root.append(p);
 try{const manga=(await catalog()).filter(x=>x.type==='manga'),owned=manga.reduce((s,x)=>s+(Number(x.owned)||0),0),records=manga.reduce((s,x)=>s+(x.volumes||[]).length,0);
 append(p,append(grid('at-stats'),stat('Opere manga',number(manga.length)),stat('Volumi dichiarati',number(owned)),stat('Record di volumi',number(records)),stat('Editori',number(new Set(manga.map(x=>x.publisher).filter(Boolean)).size))));
 const q=input('Cerca titolo, editore o edizione…'),f=select([['all','Tutte le serie'],['count','Conteggi diversi'],['edition','Edizioni registrate']]),out=E('div'),bar=append(grid('at-toolbar'),q,f);append(p,bar,out);
 function draw(){out.replaceChildren();const list=manga.filter(x=>normalize([x.title,x.publisher,x.editionSummary].join(' ')).includes(normalize(q.value)))
 .filter(x=>f.value==='count'?(Number(x.total)||0)>(Number(x.owned)||0):f.value==='edition'?(x.volumes||[]).length>0:true);
 out.append(message(number(list.length)+' opere corrispondenti, prime 48 mostrate. I dati restano invariati.'));works(out,list.slice(0,48),x=>(x.publisher||'Editore n.d.')+' · posseduti: '+(x.owned??'?')+' · totale: '+(x.total??'?')+(x.editionSummary?' · '+x.editionSummary:''));}
 q.addEventListener('input',draw);f.addEventListener('change',draw);draw();p.append(L('Apri Yume Collector completo ↗','collector.html'));
 }catch(e){fail(p,e)}
};
C.renderers.publishing=async()=>{
 const p=panel('Editori del catalogo','Le presenze indicano soltanto le opere presenti in Yume, non l’intera produzione di ciascun editore.');root.append(p);
 try{const list=(await catalog()).filter(x=>x.type==='manga'),groups=new Map();list.forEach(x=>{const k=x.publisher||'Non indicato';if(!groups.has(k))groups.set(k,[]);groups.get(k).push(x)});
 const ordered=[...groups].sort((a,b)=>b[1].length-a[1].length),pick=select([['','Tutti gli editori'],...ordered.map(([k,v])=>[k,k+' · '+v.length])]),out=E('div');pick.setAttribute('aria-label','Seleziona editore');
 append(p,stat('Editori registrati',ordered.length),pick,out);
 function draw(){out.replaceChildren();if(pick.value){works(out,groups.get(pick.value)||[],x=>(x.owned??'?')+' volumi dichiarati · '+(x.editionSummary||x.publisher||''));return}
 const g=grid('at-genre-grid');ordered.forEach(([name,rows])=>{const b=button(name+' · '+rows.length,'at-genre');b.addEventListener('click',()=>{pick.value=name;draw()});g.append(b)});out.append(g)}
 pick.addEventListener('change',draw);draw()
 }catch(e){fail(p,e)}
 root.append(group('Vocabolario dell’editoria',D.publishingTerms.map(([name,desc])=>[name,desc])));
};
C.renderers.academy=()=>{
 const p=panel('Flashcard di lingua giapponese','Un primo percorso fra parole, kanji, registri e formule che compaiono spesso negli anime. Tocca una carta per girarla.');root.append(p);
 const choices=['Tutte',...new Set(D.academy.map(x=>x.kind))],chips=grid('at-chips'),out=grid('at-flash-grid');append(p,chips,out);let selected='Tutte';
 function draw(){chips.replaceChildren();choices.forEach(name=>{const b=button(name,'at-genre');b.setAttribute('aria-pressed',String(selected===name));b.addEventListener('click',()=>{selected=name;draw()});chips.append(b)});
 out.replaceChildren();D.academy.filter(x=>selected==='Tutte'||x.kind===selected).forEach(x=>{const b=button(x.q,'at-flash');b.setAttribute('aria-label','Gira la carta '+x.q);let flip=false;b.addEventListener('click',()=>{flip=!flip;b.textContent=flip?x.a+' · '+x.d:x.q;b.setAttribute('aria-pressed',String(flip))});out.append(b)});}
 draw();root.append(group('Approfondimenti',[['Gli onorifici','-san, -kun e -chan dipendono da relazione e contesto: non hanno una traduzione italiana unica.'],['Scrivere','Hiragana e katakana sono sillabari; molti kanji hanno più letture.'],['Yume Japan','Storia, tradizioni, società e luoghi giapponesi.','yume-japan.html']]));
};
C.renderers.events=()=>{
 const p=panel('Eventi e organizzatori ufficiali','Le date vengono pubblicate solo dopo averle verificate: qui trovi collegamenti alle pagine ufficiali e un’agenda personale.');root.append(p);
 const g=grid();D.officialEvents.forEach(([name,place,url,desc])=>g.append(tile(name+' · '+place,desc,url,'Sito ufficiale ↗')));p.append(g);
 const key='yume-atlas-eventi-v1',agenda=panel('La mia agenda locale','Salva promemoria nel browser. Per le date effettive verifica sempre il sito organizzatore.');root.append(agenda);
 const form=E('form','at-form'),title=input('Titolo evento','text'),date=input('Data','date'),place=input('Luogo o appunti','text'),submit=E('button','at-button','Aggiungi'),out=E('div');title.required=true;date.required=true;submit.type='submit';append(form,title,date,place,submit);append(agenda,form,out);
 function draw(){out.replaceChildren();const events=load(key).slice().sort((a,b)=>a.date.localeCompare(b.date));if(!events.length){out.append(message('Nessun evento personale salvato.'));return}
 events.forEach(e=>{const row=append(E('article','at-note'),E('strong','',e.title),E('small','',e.date+' · '+e.place));const del=button('Elimina','at-quiet');del.addEventListener('click',()=>{save(key,load(key).filter(x=>x.id!==e.id));draw()});row.append(del);out.append(row)})}
 form.addEventListener('submit',e=>{e.preventDefault();const all=load(key);all.push({id:Date.now()+'-'+Math.random().toString(36).slice(2),title:title.value.trim().slice(0,150),date:date.value,place:place.value.trim().slice(0,150)});save(key,all);form.reset();draw()});draw();
};
})();