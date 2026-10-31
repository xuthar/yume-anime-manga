/* Yume 3.0 · Atlas editorial definitions · 31 October 2026
   Content is curated. Dates/events without a live source are NEVER presented as live. */
window.YumeAtlas = Object.freeze({
  worlds:[
    {id:'universe',name:'Universe & Nexus',eyebrow:'STORIE E CONNESSIONI',description:'Franchise, persone, generi, personaggi e le origini delle opere.',image:'assets/yume3-universe-scene.svg',icon:'✦',modules:['nexus','creators','mangaka','chronos','origins','characters','genres'],existing:[['Universe','universe.html'],['Manga vs Anime','manga-vs-anime.html'],['Seasons','seasons.html']]},
    {id:'collector',name:'Collector & Publishing',eyebrow:'LA BIBLIOTECA VIVENTE',description:'La collezione, gli editori, le edizioni e il mondo del manga stampato.',image:'assets/yume3-collector-scene.svg',icon:'▤',modules:['collector-pro','publishing'],existing:[['Collector originale','collector.html'],['Uscite manga & novel','uscite-manga.html'],['Libreria','libreria.html']]},
    {id:'japan',name:'Japan & Academy',eyebrow:'ESPLORA IL GIAPPONE',description:'La lingua, la vita giapponese, i viaggi e gli eventi culturali.',image:'assets/yume-japan-travel.svg',icon:'⛩',modules:['academy','events'],existing:[['Yume Japan','yume-japan.html'],['Pilgrimage','anime-pilgrimage.html'],['Cucina','cucina-giapponese.html'],['Folklore','folklore-giapponese.html']]},
    {id:'music',name:'Music & Entertainment',eyebrow:'ARTE E CULTURA POP',description:'Sigle, colonne sonore, cinema, videogiochi e museo virtuale.',image:'assets/yume-cosmos-music.svg',icon:'♫',modules:['sound','cinema','museum','gaming'],existing:[['J-Pop','jpop.html'],['Sigle anime','sigle-anime.html'],['Colonne sonore','colonne-sonore-anime.html']]},
    {id:'magazine',name:'Magazine & Newsroom',eyebrow:'STORIE, DOSSIER, NOVITÀ',description:'La redazione, le notizie editoriali e la rivista originale.',image:'assets/yume-cosmos-magazine.svg',icon:'誌',modules:['newsroom'],existing:[['Yume Magazine','yume-magazine.html'],['Manga vs Anime','manga-vs-anime.html'],['Chronos','chronos.html']]},
    {id:'discover',name:'Discover & Quest',eyebrow:'UN VIAGGIO PERSONALE',description:'Quiz, suggerimenti ragionati e diario di lettura e visione.',image:'assets/yume-cosmos-discover.svg',icon:'◇',modules:['quest','discover','journal'],existing:[['Cosa guardo stasera','index.html'],['Le mie liste','mie-liste.html'],['Anime visti','libreria.html#anime']]}
  ],
  modules:{
    nexus:{title:'Yume Nexus',subtitle:'La mappa viva delle connessioni',intro:'Esplora come gli anime del catalogo si raccolgono in franchise e condividono studi e generi. Le connessioni mostrate sono ricavate dai metadati della libreria; non sono parentela narrativa inventata.',world:'universe',icon:'✦',tip:'Seleziona un franchise: i nodi cambiano per mostrare le opere e gli studi registrati.'},
    creators:{title:'Yume Creators',subtitle:'Le persone e gli studi dietro alle storie',intro:'Un atlante di produzione che parte dagli studi documentati nel catalogo. I nomi degli autori e dei registi richiedono fonti opera per opera: non li attribuiamo sulla base di supposizioni.',world:'universe',icon:'✎',tip:'Filtra gli studi e apri le opere collegate.'},
    mangaka:{title:'Yume Mangaka Atlas',subtitle:'Biografie, opere ed edizioni italiane',intro:'38 profili di mangaka e collettivi, opere in giapponese, inglese e italiano con fonti editoriali e situazione delle pubblicazioni italiane.',world:'universe',icon:'筆',url:'mangaka.html'},
    chronos:{title:'Yume Chronos',subtitle:'La macchina del tempo',intro:'Un archivio interattivo dal 1917 con eventi, fonti, filtri ed epoche da attraversare.',world:'universe',icon:'◷',url:'chronos.html'},
    origins:{title:'Yume Origins',subtitle:'Dal primo segno all’anime',intro:'Un percorso illustrato attraverso le fasi dell’industria creativa: dalla serializzazione alla produzione animata e alla localizzazione.',world:'universe',icon:'✒',tip:'Apri ogni fase per scoprire che cosa avviene e quali professioni lavorano al progetto.'},
    characters:{title:'Yume Characters',subtitle:'Atlante dei protagonisti',intro:'Ritratti editoriali di personaggi storici e amatissimi. Le descrizioni evitano gli spoiler e rimandano alle opere originali.',world:'universe',icon:'♧',tip:'Cerca un nome o una serie per trovare un personaggio.'},
    genres:{title:'Yume Genre Lab',subtitle:'Anatomia dei generi',intro:'Scopri le etichette narrative, osserva come compaiono nel catalogo e apri titoli collegati. Demografie editoriali e generi non sono la stessa cosa.',world:'universe',icon:'◇',tip:'Seleziona una categoria per mostrare esempi realmente presenti in Yume.'},
    sound:{title:'Yume Sound Universe',subtitle:'La musica delle storie',intro:'Un portale tra opening, ending, colonne sonore, artisti J-Pop e composizione per lo schermo.',world:'music',icon:'♫',tip:'Scegli il percorso musicale che ti interessa; l’ascolto rimane sulle piattaforme ufficiali.'},
    'collector-pro':{title:'Yume Collector Pro',subtitle:'La collezione sotto la lente',intro:'Analisi degli editori, inventario manga, edizioni e volumi registrati nel catalogo. I conteggi non equivalgono ad acquisti nuovi e i totali possono rappresentare edizioni diverse.',world:'collector',icon:'▤',tip:'Esplora le opere registrate e trova le serie con volumi ancora da completare.'},
    publishing:{title:'Yume Publishing',subtitle:'Atlante degli editori',intro:'Dai cataloghi giapponesi alle edizioni italiane e inglesi. Esplora gli editori presenti nella tua libreria e scopri la terminologia editoriale.',world:'collector',icon:'本',tip:'Seleziona un editore per visualizzare le sue serie presenti nel catalogo.'},
    academy:{title:'Yume Academy',subtitle:'Giapponese per appassionati di anime',intro:'Microlezioni di lingua e cultura: formule comuni, sistemi di scrittura, onorifici e parole che ricorrono nelle storie.',world:'japan',icon:'あ',tip:'Gira le flashcard e prova il mini quiz per ripassare.'},
    events:{title:'Yume Events',subtitle:'Agenda di eventi e festival',intro:'Una bacheca di organizzatori ufficiali, più un’agenda personale. Le date future vanno sempre controllate sui siti ufficiali: qui non vengono inventati calendari aggiornati.',world:'japan',icon:'祭',tip:'Salva nel browser gli eventi che vorresti visitare.'},
    cinema:{title:'Yume Cinema',subtitle:'Il grande schermo giapponese',intro:'Un percorso attraverso il cinema d’animazione e i film del catalogo, con filtri per anno, studio e genere.',world:'music',icon:'◈',tip:'Cerca un film e apri la sua scheda originale.'},
    museum:{title:'Yume Museum',subtitle:'Museo delle forme e dei media',intro:'Sei sale curatoriali raccontano l’evoluzione delle modalità di creazione, visione e collezionismo di anime e manga.',world:'music',icon:'▣',tip:'Apri una sala: troverai il suo contesto storico e collegamenti per approfondire.'},
    quest:{title:'Yume Quest',subtitle:'Quiz e sfide del mondo Yume',intro:'Mettiti alla prova con domande su animazione, manga, musica e cultura giapponese. Nessun account e nessuna classifica pubblica.',world:'discover',icon:'⚔',tip:'La verifica avviene nel browser, e puoi ripetere il quiz quanto vuoi.'},
    discover:{title:'Yume Discover',subtitle:'Che storia scelgo oggi?',intro:'Un suggeritore che usa i generi, i formati e gli stati già presenti nel catalogo. Non inventa gusti o progressi: la selezione è locale e trasparente.',world:'discover',icon:'✧',tip:'Scegli atmosfera e formato, poi chiedi un suggerimento.'},
    gaming:{title:'Yume Gaming',subtitle:'Dalle pagine ai videogiochi',intro:'Panoramica dei legami tra manga, anime, JRPG, giochi di ruolo giapponesi e visual novel: categorie, meccaniche e opere di riferimento.',world:'music',icon:'⌘',tip:'Apri i percorsi per distinguere gli adattamenti dai mondi narrativi originali.'},
    newsroom:{title:'Yume Newsroom',subtitle:'La scrivania della redazione',intro:'Un quadro delle ultime osservazioni dei calendari e delle uscite del Magazine. Le date indicate sono quelle registrate dalle fonti, non conferme di avvenuta trasmissione o pubblicazione.',world:'magazine',icon:'✍',tip:'Le schede distinguono quando sono stati controllati i dati dalle date delle uscite.'},
    journal:{title:'Yume Journal',subtitle:'Il tuo diario di storie',intro:'Registra impressioni e ricordi su anime e manga: appunti privati in questo browser, con esportazione e importazione JSON. Nessuna scrittura al catalogo di Xuthar.',world:'discover',icon:'☾',tip:'Scrivi una nota, salva e scarica una copia: i dati del browser possono andare persi.'}
  },
  production:[
   ['Idea e proposta','Il progetto nasce da un’opera esistente, da un’idea originale o da una proposta editoriale. Si definiscono pubblico, formato e obiettivi.','Autori, editor, produttori'],
   ['Serializzazione manga','Per i manga serializzati, l’autore sviluppa capitoli con il supporto editoriale. Ritmo e tavole rispondono alla pubblicazione periodica.','Mangaka, assistenti, editor'],
   ['Pianificazione adattamento','Si individuano arco narrativo, durata prevista, finanziamento e diritti. Un adattamento non corrisponde automaticamente a un volume per episodio.','Produttori, comitato di produzione, studio'],
   ['Sceneggiatura','I testi definiscono scene, dialoghi e struttura degli episodi, apportando eventualmente modifiche al materiale di partenza.','Sceneggiatori, series composer'],
   ['Storyboard e regia','Lo storyboard organizza inquadrature, movimento della macchina virtuale, montaggio e intenzione della scena.','Regista, storyboard artist'],
   ['Character e art design','Si stabiliscono model sheet, palette, costumi, ambienti e direzione artistica.','Character designer, art director'],
   ['Animazione','Key animator impostano i movimenti principali; in-between, background, color e compositing completano le immagini.','Animatori, color designer, compositing'],
   ['Voce, musica e suono','Il doppiaggio giapponese, le musiche, i suoni e il missaggio contribuiscono a costruire il tono dell’opera.','Seiyū, compositori, sound director'],
   ['Montaggio e distribuzione','Episodi e film passano dal montaggio alla consegna per televisioni, cinema o piattaforme digitali.','Montatori, distributori, broadcaster'],
   ['Edizioni internazionali','Licenza, traduzione, adattamento e sottotitolazione cambiano a seconda del paese e del distributore.','Licenziatari, traduttori, localizzatori']
  ],
  genres:[
    ['Action','Azione','Combattimenti, dinamismo e conflitti fisici.'],['Adventure','Avventura','Viaggi, luoghi nuovi e scoperta progressiva.'],
    ['Fantasy','Fantasy','Mondi immaginari e regole sovrannaturali.'],['Sci-Fi','Fantascienza','Tecnologia, spazio e futuri possibili.'],
    ['Mystery','Mistero','Informazioni da ricostruire e indizi narrativi.'],['Drama','Drammatico','Relazioni, crisi e trasformazioni personali.'],
    ['Romance','Romantico','Relazioni sentimentali al centro della storia.'],['Comedy','Commedia','Gag, umorismo e situazioni paradossali.'],
    ['Horror','Horror','Paura, inquietudine e perturbante.'],['Slice of Life','Vita quotidiana','Relazioni e piccoli gesti del giorno per giorno.'],
    ['Psychological','Psicologico','Conflitti interiori e percezione della realtà.'],['Supernatural','Soprannaturale','Presenze e fenomeni oltre la spiegazione ordinaria.'],
    ['Sports','Sportivo','Atleti, rivalità, allenamento e squadre.'],['Mecha','Mecha','Macchine pilotate e immaginari robotici; può incrociare altri generi.']
  ],
  characters:[
    ['Astro Boy','Tetsuwan Atom / Astro Boy','Il piccolo robot di Osamu Tezuka, simbolo di una svolta nella serialità televisiva.','1963'],
    ['Son Goku','Dragon Ball','Un protagonista cresciuto tra avventura, arti marziali e immaginario fantastico.','1984'],
    ['Usagi Tsukino','Sailor Moon','Una studentessa che diventa figura centrale del genere magical girl moderno.','1992'],
    ['Nausicaä','Nausicaä della Valle del vento','Una giovane protagonista di un mondo attraversato da tensioni tra natura e umanità.','1984'],
    ['Satsuki e Mei','Il mio vicino Totoro','Due sorelle al centro di una storia che intreccia crescita, famiglia e meraviglia.','1988'],
    ['Chihiro','La città incantata','Una ragazza che affronta l’ignoto e cambia attraverso le proprie scelte.','2001'],
    ['Lupin III','Lupin III','Un ladro gentiluomo iconico che attraversa epoche e linguaggi.','1971'],
    ['Motoko Kusanagi','Ghost in the Shell','Una figura chiave del cyberpunk e delle domande sull’identità.','1995']
  ],
  academy:[
    {q:'こんにちは',a:'Konnichiwa',d:'Saluto comune, spesso equivalente a «buongiorno».',kind:'Saluti'},
    {q:'ありがとう',a:'Arigatō',d:'«Grazie», in registro informale o neutro.',kind:'Saluti'},
    {q:'おはよう',a:'Ohayō',d:'«Buongiorno» al mattino, in forma informale.',kind:'Saluti'},
    {q:'すみません',a:'Sumimasen',d:'«Mi scusi», «permesso» o «mi dispiace» secondo il contesto.',kind:'Saluti'},
    {q:'先輩',a:'Senpai',d:'Persona più anziana o con maggiore esperienza nello stesso contesto scolastico o professionale.',kind:'Anime'},
    {q:'先生',a:'Sensei',d:'Insegnante o titolo di rispetto per esperti di alcune professioni.',kind:'Anime'},
    {q:'本',a:'Hon',d:'Libro; il kanji è usato anche in molte parole composte.',kind:'Kanji'},
    {q:'夢',a:'Yume',d:'Sogno: il nome del nostro sito.',kind:'Kanji'},
    {q:'猫',a:'Neko',d:'Gatto.',kind:'Kanji'},
    {q:'桜',a:'Sakura',d:'Ciliegio e suo fiore; simbolo culturale ricorrente.',kind:'Kanji'},
    {q:'ひらがな',a:'Hiragana',d:'Uno dei due sillabari fonetici giapponesi.',kind:'Scrittura'},
    {q:'カタカナ',a:'Katakana',d:'Sillabario spesso usato per prestiti linguistici e onomatopee.',kind:'Scrittura'}
  ],
  museum:[
    ['Il manga come oggetto','Dalla serializzazione sulle riviste ai tankōbon, alle edizioni speciali e alle ristampe. Ogni formato modifica il modo di leggere e conservare le opere.','publishing','Manga & editoria'],
    ['Celle e disegni di animazione','Prima del compositing digitale molti studi utilizzavano rodovetri dipinti. Storyboard e model sheet aiutano a ricostruire un processo produttivo collettivo.','origins','L’arte dell’animazione'],
    ['I robot del futuro','I grandi anime mecha diventano anche oggetti di collezionismo, grazie a modelli, giocattoli, kit di montaggio e videogiochi.','gaming','Robot e franchise'],
    ['La voce delle storie','Dal doppiaggio in studio alle colonne sonore, la componente sonora rende riconoscibili personaggi e atmosfere.','sound','Suono & musica'],
    ['Dal cinema alla televisione','Formati di proiezione, programmazione settimanale e distribuzione internazionale raccontano epoche diverse dell’anime.','cinema','Schermi & pubblico'],
    ['Il tempo del collezionista','VHS, LaserDisc, DVD e Blu-ray hanno cambiato la memoria domestica degli anime. Il digitale aggiunge nuovi modi di conservare e cercare.','collector-pro','Home video & archivio']
  ],
  gaming:[
    ['Visual novel','Storie interattive basate su dialoghi, illustrazioni e scelte. Possono precedere adattamenti anime.','Esempio di fenomeno: la serie Fate'],
    ['JRPG','Giochi di ruolo giapponesi con crescita dei personaggi, esplorazione e narrazione articolata.','Esempio: la serie Persona'],
    ['Adattamento da manga','Un franchise nato su carta si trasforma in gioco d’azione, avventura o combattimento.','Esempio: Dragon Ball'],
    ['Media mix','Videogiochi, anime, manga, musica e merchandising si sviluppano come parti di una strategia multimediale.','Esempio: Pokémon'],
    ['Mecha e simulazione','L’immaginario dei robot si presta a giochi strategici, simulatori e combattimenti fra macchine.','Esempio: Gundam'],
    ['Retro gaming','Arcade, console portatili e supporti fisici raccontano il rapporto storico tra tecnologia e cultura pop giapponese.','Dal cabinato al gioco digitale']
  ],
  officialEvents:[
    ['Lucca Comics & Games','Italia','https://www.luccacomicsandgames.com/','Manifestazione dedicata a fumetti, giochi e cultura pop.'],
    ['COMICON Napoli','Italia','https://www.comicon.it/','Festival internazionale del fumetto e della cultura pop.'],
    ['AnimeJapan','Giappone','https://www.anime-japan.jp/','Evento del settore dell’animazione giapponese.'],
    ['Tokyo Game Show','Giappone','https://tgs.cesa.or.jp/','Manifestazione dell’industria videoludica.'],
    ['Japan Expo','Francia','https://www.japan-expo-paris.com/','Festival europeo della cultura giapponese.']
  ],
  quiz:[
    ['Quale opera di Tezuka debuttò in TV nel 1963?',['Astro Boy','Akira','Sailor Moon'],0,'Astro Boy contribuì a definire la serialità anime televisiva.'],
    ['Come si chiama il volume raccolto di un manga?',['Tankōbon','Seiyū','Sakuga'],0,'Tankōbon è il termine per un volume indipendente o una raccolta di capitoli.'],
    ['Che cosa indica «seiyū»?',['Un doppiatore','Un editore','Una tecnica di stampa'],0,'I seiyū prestano la voce ai personaggi.'],
    ['In quale anno uscì il film AKIRA?',['1979','1988','2001'],1,'Il lungometraggio di Katsuhiro Ōtomo arrivò nel 1988.'],
    ['Quale tra questi è un sillabario?',['Katakana','Tankōbon','Mangaka'],0,'Il katakana è uno dei due sillabari fonetici.'],
    ['Chi realizzò La città incantata?',['Hayao Miyazaki','Osamu Tezuka','Katsuhiro Ōtomo'],0,'Il film di Miyazaki vinse poi l’Oscar.'],
    ['Che cosa rappresenta lo storyboard?',['Sequenza prevista delle inquadrature','Lista di vendita','Formato audio'],0,'Aiuta a progettare regia e montaggio.'],
    ['Quale rivista iniziò nel 1968?',['Shōnen Jump','Newtype','Bessatsu Margaret'],0,'Shōnen Jump nasce nel 1968.'],
    ['Quale termine significa sogno?',['Yume','Neko','Hon'],0,'夢 si legge yume.'],
    ['Che cosa fa un character designer?',['Definisce l’aspetto dei personaggi','Gestisce le licenze di distribuzione','Stampa i volumi'],0,'Il character designer definisce il modello visivo dei personaggi.']
  ],
  publishingTerms:[
    ['Tankōbon','Volume raccolto, spesso composto da capitoli già apparsi in rivista.'],
    ['Kanzenban','Edizione detta «completa», spesso con impaginazione o materiali rivisti. I contenuti variano per opera.'],
    ['Bunkoban','Formato editoriale compatto, spesso impiegato per ristampe.'],
    ['Omnibus','Edizione che raccoglie più volumi originali in un singolo libro.'],
    ['Light novel','Narrativa prevalentemente testuale, spesso illustrata. Non è un genere unico.'],
    ['ISBN','Identificativo bibliografico di una specifica edizione, distinto dal titolo dell’opera.'],
    ['Licenza','Accordo per la pubblicazione o distribuzione di un’opera in uno specifico territorio o formato.'],
    ['Serializzazione','Pubblicazione a puntate, spesso in rivista o su piattaforma digitale.']
  ]
});