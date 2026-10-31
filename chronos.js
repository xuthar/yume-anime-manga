/* Yume Chronos · curated editorial timeline, not an auto-updating database.
   Every record has a documented source. Periods reflect the date of the specific event,
   not necessarily first Italian publication or broadcast. */
(() => {
'use strict';
const sources={
 nf:{name:'National Film Archive of Japan',url:'https://www.nfaj.go.jp/english/exhibition/historyofjapanesefilm/'},
 bfi:{name:'BFI · 100 anni di animazione',url:'https://www.bfi.org.uk/lists/100-years-japanese-animation-one-great-film-decade'},
 seeds:{name:'BFI · Le origini degli anime',url:'https://www.bfi.org.uk/sight-and-sound/features/seeds-anime-how-japanese-animation-arose'},
 tv:{name:'BFI · La storia degli anime TV',url:'https://www.bfi.org.uk/sight-and-sound/features/short-history-small-screen-anime'},
 film:{name:'BFI · 50 film anime fondamentali',url:'https://www.bfi.org.uk/sight-and-sound/lists/50-key-anime-films'},
 kod:{name:'Kodansha · Cronologia ufficiale',url:'https://www.kodansha.com/history/'},
 shu:{name:'Shueisha · Storia ufficiale',url:'https://www.shueisha.co.jp/history/index.html'},
 ghibli:{name:'Studio Ghibli · Cronologia ufficiale',url:'https://www.ghibli.jp/chronology/'},
 dragon:{name:'Dragon Ball · Cronologia ufficiale',url:'https://en.dragon-ball-official.com/about/dragon_ball_history.html'},
 media:{name:'Japan Media Arts Festival · Storia',url:'https://www.j-mediaarts.jp/en/about/history/index-2.html'},
 osc03:{name:'Academy Awards · Cerimonia 2003',url:'https://www.oscars.org/oscars/ceremonies/2003'},
 osc24:{name:'Academy Awards · Cerimonia 2024',url:'https://www.oscars.org/oscars/ceremonies/2024'},
 netflix:{name:'Netflix · AnimeJapan 2024',url:'https://about.netflix.com/en/news/anime-japan-2024'}
};
const eras=[
 {a:1917,b:1949,title:'Le origini',subtitle:'Cinema pionieristico',note:'Cortometraggi, sperimentazione e primi lungometraggi.'},
 {a:1950,b:1969,title:'L’era della TV',subtitle:'Nasce l’industria',note:'La produzione si struttura e l’animazione arriva nelle case.'},
 {a:1970,b:1979,title:'Nuovi mondi',subtitle:'Robot e avventure',note:'La serialità esplora mondi più complessi e nuovi pubblici.'},
 {a:1980,b:1989,title:'L’esplosione creativa',subtitle:'Manga e cinema',note:'Home video, autori e grandi franchise trasformano il settore.'},
 {a:1990,b:1999,title:'Il linguaggio globale',subtitle:'Anime oltre i confini',note:'Narrazioni sempre più mature e circolazione internazionale.'},
 {a:2000,b:2009,title:'La consacrazione',subtitle:'Riconoscimenti mondiali',note:'Il cinema giapponese ottiene nuova visibilità globale.'},
 {a:2010,b:2019,title:'Nuove generazioni',subtitle:'Autori e franchise',note:'Nuovi film, universi narrativi e grandi successi.'},
 {a:2020,b:2024,title:'L’età connessa',subtitle:'Streaming e continuità',note:'Il pubblico digitale convive con le grandi saghe storiche.'}
];
// year | type | title | documented description | why it matters | source key | optional Yume destination
const rows=[
[1917,'anime','I primi corti d’animazione giapponesi','Jun’ichi Kōuchi, Ōten Shimokawa e Seitarō Kitayama realizzano i loro primi lavori animati in Giappone. Tra le opere sopravvissute figura Namakura Gatana di Kōuchi.','È il punto di partenza dell’animazione giapponese destinata alle sale: tecniche, forme e autori sono ancora pionieristici.','bfi'],
[1926,'cinema','Noburō Ōfuji sperimenta con la carta','The Story of the Monkey King mostra l’approccio di Ōfuji all’animazione ritagliata, anche attraverso l’uso di carte decorative giapponesi.','Accanto al disegno su pellicola si sviluppa un filone sperimentale autonomo, legato alle arti visive tradizionali.','bfi'],
[1937,'cinema','Il colore raccontato dall’animazione','Il corto Shikisai manga no dekiru made di Shigeji Ogino testimonia la ricerca tecnica sul colore nella produzione giapponese precedente alla guerra.','Ricorda che la storia dell’animazione non segue una singola tecnica, né comincia soltanto con la televisione.','nf'],
[1945,'cinema','Momotarō: Umi no Shinpei','Esce Momotarō: Sacred Sailors di Mitsuyo Seo, fra i primi lungometraggi animati giapponesi e opera segnata dal contesto della guerra.','Il passaggio al formato lungo anticipa un’industria cinematografica molto diversa, ma pone anche domande sulla propaganda bellica.','seeds'],
[1956,'industria','Nasce Toei Dōga','Toei costituisce la propria divisione di animazione, poi divenuta Toei Animation, costruendo un nuovo modello di produzione su larga scala.','Lo studio contribuisce a formare intere generazioni di animatori e tecnici.','nf'],
[1958,'cinema','Hakujaden · La leggenda del serpente bianco','Toei porta al cinema Hakujaden, lungometraggio animato giapponese a colori ispirato a una leggenda cinese.','È una tappa decisiva per il cinema animato industriale e per le sue ambizioni internazionali.','bfi'],
[1959,'manga','Weekly Shōnen Magazine arriva in edicola','Kodansha pubblica il primo numero di Weekly Shōnen Magazine, una rivista destinata a diventare centrale nell’editoria manga.','La serializzazione periodica consolida un ecosistema in cui rivista, pubblico e volume raccolto si alimentano a vicenda.','kod'],
[1963,'anime','Tetsuwan Atom · Astro Boy in TV','La serie di Osamu Tezuka debutta il 1º gennaio e diventa un modello di produzione seriale televisiva.','La diffusione domestica e le tecniche di animazione limitata influenzano profondamente l’identità dell’anime televisivo.','tv','universe.html'],
[1966,'anime','Sally the Witch e le ragazze magiche','Mahōtsukai Sally porta in televisione una giovane protagonista capace di utilizzare la magia, contribuendo a definire un filone destinato a evolversi.','La crescita del pubblico e dei generi non riguarda soltanto robot e avventura.','tv'],
[1968,'manga','Nasce Shōnen Jump','Shueisha lancia Shōnen Jump, inizialmente con periodicità bisettimanale. La rivista diventerà Weekly Shōnen Jump.','La cultura della serializzazione e delle grandi saghe acquista una delle sue sedi più influenti.','shu'],
[1969,'anime','Sazae-san entra nella vita quotidiana','Inizia la messa in onda dell’anime televisivo Sazae-san, un racconto familiare che diventa un punto di riferimento della TV giapponese.','Gli anime possono parlare anche della vita ordinaria e raggiungere intere famiglie.','tv'],
[1971,'anime','Lupin III approda in TV','La prima serie animata di Lupin III porta le avventure del ladro gentiluomo sul piccolo schermo.','È uno degli esempi della crescente varietà di toni e destinatari della serialità.','tv'],
[1972,'anime','Science Ninja Team Gatchaman','Il gruppo di eroi di Gatchaman unisce azione, fantascienza e dinamiche di squadra.','La formula dei team eroici apre nuove strade per prodotti seriali e franchise multimediali.','tv'],
[1974,'anime','Space Battleship Yamato','La saga televisiva di Yamato intreccia viaggio spaziale, emozioni, guerra e fantascienza.','Contribuisce a consolidare un pubblico di appassionati più coinvolto, anche oltre l’infanzia.','tv'],
[1976,'cinema','Dōjōji · Il cinema di Kihachirō Kawamoto','Il cortometraggio Dōjōji rappresenta la sperimentazione di Kawamoto con il cinema di pupazzi e i racconti tradizionali.','L’animazione giapponese è anche cinema d’autore, stop-motion e rilettura del teatro classico.','bfi'],
[1979,'anime','Mobile Suit Gundam cambia i robot','Debutta in televisione Mobile Suit Gundam, con un racconto di guerra e personaggi alle prese con un conflitto politico.','Il mecha televisivo assume nuove sfumature drammatiche e alimenta un franchise longevo.','tv','universe.html'],
[1979,'anime','Le rose di Versailles in animazione','La storia di Oscar e della Rivoluzione francese approda in TV con Versailles no Bara.','I manga e gli anime possono intrecciare dramma storico, identità e autonomia personale, con un pubblico eterogeneo.','tv'],
[1981,'cinema','Gundam conquista anche le sale','La prima trasposizione cinematografica di Mobile Suit Gundam raduna un pubblico di appassionati e consolida il fenomeno.','La partecipazione dei fan diventa visibile anche fuori dal piccolo schermo.','seeds'],
[1982,'manga','AKIRA comincia sulle pagine di Kodansha','Katsuhiro Ōtomo avvia la serializzazione manga di AKIRA.','La fantascienza a fumetti sviluppa scenari urbani e sensibilità visive che lasceranno un segno nel cinema.','kod','manga-vs-anime.html'],
[1984,'manga','Dragon Ball inizia la serializzazione','Akira Toriyama avvia Dragon Ball su Weekly Shōnen Jump.','Un’avventura a fumetti diventa la base di una delle saghe transmediali più riconoscibili.','dragon','universe.html'],
[1984,'cinema','Nausicaä della Valle del vento','Il film di Hayao Miyazaki esce nelle sale giapponesi prima della fondazione di Studio Ghibli.','Il suo successo contribuisce a rendere possibile la nascita dello studio l’anno successivo.','ghibli'],
[1985,'industria','Nasce Studio Ghibli','Viene fondato lo Studio Ghibli, con Hayao Miyazaki e Isao Takahata tra le figure centrali.','L’animazione cinematografica giapponese consolida un laboratorio creativo riconoscibile in tutto il mondo.','ghibli'],
[1986,'cinema','Laputa · Il castello nel cielo','Esce Tenku no Shiro Laputa, uno dei primi lungometraggi di Studio Ghibli.','Avventura, immaginario tecnologico e paesaggio fantastico si incontrano nel cinema dello studio.','ghibli'],
[1986,'anime','Dragon Ball debutta in televisione','Arriva l’adattamento anime di Dragon Ball, che prosegue il viaggio iniziato nel manga.','Il passaggio dalla pagina alla TV moltiplica le possibilità di diffusione della saga.','dragon','manga-vs-anime.html'],
[1988,'cinema','Totoro e Una tomba per le lucciole','Studio Ghibli presenta nello stesso periodo Tonari no Totoro e Hotaru no Haka.','Due opere molto diverse mostrano quante emozioni e registri possano convivere nell’animazione.','ghibli'],
[1988,'cinema','AKIRA sul grande schermo','Il film AKIRA di Katsuhiro Ōtomo esce nel 1988.','Il lungometraggio diventa un riferimento del cinema d’animazione adulto e della fantascienza giapponese.','bfi','manga-vs-anime.html'],
[1989,'cinema','Kiki · Consegne a domicilio','Esce Majo no Takkyūbin di Hayao Miyazaki.','Le storie di crescita personale trovano grande spazio nella filmografia dello studio.','ghibli'],
[1989,'anime','Dragon Ball Z entra in scena','Inizia la trasmissione di Dragon Ball Z, nuova fase dell’adattamento televisivo di Toriyama.','Una saga può svilupparsi attraverso più serie, archi e generazioni di spettatori.','dragon','universe.html'],
[1992,'anime','Sailor Moon e l’immaginario magical girl','L’anime televisivo Sailor Moon porta una nuova generazione di eroine nel panorama popolare dei primi anni Novanta.','Il filone magical girl intreccia amicizia, azione e trasformazioni influenzando il pubblico internazionale.','tv'],
[1995,'cinema','Ghost in the Shell','Esce il lungometraggio Ghost in the Shell di Mamoru Oshii.','Identità, tecnologia e cyberpunk diventano parte di un immaginario cinematografico di grande influenza.','bfi'],
[1997,'cinema','Principessa Mononoke','Studio Ghibli distribuisce Mononoke Hime nei cinema giapponesi.','La fiaba epica si confronta con natura, conflitti e modernizzazione in una grande produzione cinematografica.','ghibli'],
[1998,'industria','Japan Media Arts Festival · Prima mostra','La prima esposizione delle opere premiate dal Japan Media Arts Festival si svolge a Tokyo, con categorie dedicate anche ad animazione e manga.','Animazione e fumetto vengono riconosciuti in una cornice istituzionale delle arti mediali.','media'],
[2001,'cinema','La città incantata arriva al cinema','Esce Sen to Chihiro no Kamikakushi di Hayao Miyazaki.','Un film radicato nell’immaginario giapponese conquista un pubblico internazionale vastissimo.','ghibli'],
[2003,'industria','L’Oscar a La città incantata','Spirited Away riceve il premio Oscar per il miglior film d’animazione alla cerimonia del 2003.','Il riconoscimento accresce ulteriormente la visibilità mondiale dell’animazione giapponese.','osc03'],
[2004,'cinema','Il castello errante di Howl','Esce Hauru no Ugoku Shiro di Studio Ghibli.','Il film mostra come letteratura, design fantastico e animazione possano incontrarsi in una nuova interpretazione.','ghibli'],
[2009,'anime','Dragon Ball Z Kai','Debutta Dragon Ball Kai, una nuova versione televisiva del materiale animato di Dragon Ball Z.','Riedizioni e nuove versioni permettono a una saga di raggiungere spettatori di generazioni successive.','dragon','universe.html'],
[2013,'cinema','Si alza il vento','Esce Kaze Tachinu di Hayao Miyazaki.','Il cinema animato continua a esplorare biografie romanzate, storia e dilemmi personali.','ghibli'],
[2015,'anime','Dragon Ball Super: nuova serialità','Debutta Dragon Ball Super in formato manga e anime, secondo la cronologia ufficiale del franchise.','Le saghe storiche possono proseguire in media diversi, mantenendo pubblici nuovi e di lunga data.','dragon'],
[2016,'cinema','Your Name e la nuova animazione popolare','Il film Kimi no Na wa. di Makoto Shinkai esce in Giappone nel 2016.','Romanticismo, fantascienza e grande successo commerciale si fondono in un film che raggiunge il pubblico globale.','bfi'],
[2018,'cinema','Dragon Ball Super: Broly','Arriva al cinema Dragon Ball Super: Broly.','Il lungometraggio mostra la forza dei franchise storici anche nelle nuove uscite cinematografiche.','dragon'],
[2022,'cinema','Dragon Ball Super: Super Hero','Esce il film Dragon Ball Super: Super Hero.','Lo stesso universo narrativo continua a sperimentare con tecnologie e linguaggi visivi differenti.','dragon'],
[2023,'cinema','Il ragazzo e l’airone','Esce in Giappone il nuovo film di Hayao Miyazaki, Kimitachi wa Dō Ikiru ka.','Il cinema d’autore dello Studio Ghibli continua a proporre nuove storie anche nel XXI secolo.','ghibli'],
[2024,'industria','Il ragazzo e l’airone vince l’Oscar','The Boy and the Heron vince l’Oscar al miglior film d’animazione alla cerimonia del marzo 2024.','Un secondo lungometraggio di Miyazaki ottiene il prestigioso riconoscimento dell’Academy.','osc24'],
[2024,'anime','Dragon Ball DAIMA debutta','La cronologia ufficiale di Dragon Ball registra nel 2024 l’inizio della trasmissione di DAIMA.','La serialità storica resta attiva attraverso nuovi progetti e pubblici.','dragon'],
[2024,'industria','Gli anime sulle piattaforme globali','AnimeJapan 2024 include una presentazione Netflix di nuovi titoli e produzioni, con distribuzione rivolta a pubblici internazionali.','Streaming e presentazioni internazionali sono ormai parte delle modalità con cui le opere raggiungono gli spettatori.','netflix']
];
const kind={anime:'Serie anime',manga:'Manga & riviste',cinema:'Cinema',industria:'Industria & cultura'};
const $=id=>document.getElementById(id);
const container=$('ch-timeline'),eraBar=$('ch-eras'),query=$('ch-search'),sort=$('ch-sort'),year=$('ch-year');
if(!container||!eraBar||!query||!sort||!year)return;
const state={era:null,category:'all',q:'',from:1917,order:'asc'};
const el=(tag,cls,txt)=>{const node=document.createElement(tag);if(cls)node.className=cls;if(txt!==undefined)node.textContent=String(txt);return node;};
const normal=s=>String(s||'').toLocaleLowerCase('it').normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/’/g,"'").trim();
const sourceLink=(name,url)=>{const a=el('a','',name+' ↗');a.href=url;a.target='_blank';a.rel='noopener noreferrer';return a;};
function renderEras(){
 eraBar.replaceChildren();
 eras.forEach((e,i)=>{const btn=el('button','ch-era');btn.type='button';btn.dataset.era=String(i);btn.setAttribute('aria-pressed',String(state.era===i));
 btn.append(el('small',null,e.a+' — '+e.b),el('strong',null,e.title),el('span',null,e.subtitle));
 btn.title=e.note;btn.addEventListener('click',()=>{state.era=state.era===i?null:i;state.from=1917;year.value='1917';$('ch-year-label').textContent='1917';$('ch-year-clear').hidden=true;render();});eraBar.append(btn);});
}
function render(){
 renderEras();
 document.querySelectorAll('[data-filter]').forEach(btn=>btn.setAttribute('aria-pressed',String(btn.dataset.filter===state.category)));
 const filtered=rows.filter(r=>(state.era===null||(r[0]>=eras[state.era].a&&r[0]<=eras[state.era].b))&&(state.category==='all'||r[1]===state.category)&&r[0]>=state.from&&(!state.q||normal([r[0],r[1],r[2],r[3],r[4],kind[r[1]]].join(' ')).includes(state.q)));
 filtered.sort((a,b)=>state.order==='asc'?a[0]-b[0]:b[0]-a[0]);
 $('ch-results-counter').textContent=filtered.length+' di '+rows.length+' tappe';
 $('ch-results-label').textContent=state.era===null?'Cronologia completa':eras[state.era].title;
 $('ch-empty').hidden=filtered.length!==0;
 const fragment=document.createDocumentFragment();
 filtered.forEach((r)=>{const [yr,cat,title,body,impact,key,local]=r;
 const article=el('article','ch-entry');article.dataset.cat=cat;article.id='anno-'+yr+'-'+normal(title).replace(/[^a-z0-9]+/g,'-').slice(0,38);
 const header=el('div','ch-entry-head');header.append(el('span','ch-year',yr),el('span','ch-tag',kind[cat]));article.append(header,el('h4','',title),el('p','',body));
 const why=el('div','ch-impact');why.append(el('strong',null,'Perché conta'),el('p','',impact));article.append(why);
 const links=el('div','ch-entry-links');if(sources[key])links.append(sourceLink('Consulta la fonte · '+sources[key].name,sources[key].url));
 if(local){const a=el('a','ch-local','Esplora in Yume ↗');a.href=local;links.append(a);}article.append(links);fragment.append(article);
 });
 container.replaceChildren(fragment);
}
function clear(){state.era=null;state.category='all';state.q='';state.from=1917;state.order='asc';query.value='';sort.value='asc';year.value='1917';$('ch-year-label').textContent='1917';$('ch-year-clear').hidden=true;render();}
document.querySelectorAll('[data-filter]').forEach(btn=>btn.addEventListener('click',()=>{state.category=btn.dataset.filter;render();}));
query.addEventListener('input',()=>{state.q=normal(query.value);render();});
sort.addEventListener('change',()=>{state.order=sort.value;render();});
year.addEventListener('input',()=>{state.from=Number(year.value);$('ch-year-label').textContent=String(state.from);$('ch-year-clear').hidden=state.from===1917;render();});
$('ch-reset').addEventListener('click',clear);
$('ch-year-clear').addEventListener('click',()=>{state.from=1917;year.value='1917';$('ch-year-label').textContent='1917';$('ch-year-clear').hidden=true;render();});
$('ch-count').textContent=String(rows.length);
$('ch-range').textContent='1917–2024';
$('ch-eras-count').textContent=String(eras.length);
const params=new URLSearchParams(location.search),q=params.get('q'),jump=params.get('anno');
if(q){query.value=q;state.q=normal(q);}if(jump&&/^\d{4}$/.test(jump)){state.from=Math.max(1917,Math.min(2024,Number(jump)));year.value=String(state.from);$('ch-year-label').textContent=String(state.from);$('ch-year-clear').hidden=state.from===1917;}
render();
})();