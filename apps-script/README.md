# Sincronizzazione acquisti del proprietario

Stato al 23 ottobre 2026: componente Google autorizzato, Google Sheets API v4 abilitata, applicazione web pubblicata e browser del proprietario collegato. Nessun acquisto viene dedotto dalle uscite del calendario.

Il progetto Apps Script è associato al foglio privato del proprietario. Il codice da installare è la concatenazione di `manga-collection.js`, `apps-script/Purchases.gs` e `apps-script/Anime.gs`. Il progetto preparato nell'editor si chiama **Yume · Acquisti e collezione**.

1. Autorizzare il componente Google per l'accesso a Fogli, l'identità del proprietario e le richieste alle fonti pubbliche. Eseguire `setupYume` una volta: registra l'ID del foglio nelle proprietà private e crea il registro `Acquisti Yume`, senza aggiungere acquisti.
2. Aggiungere il servizio avanzato **Google Sheets API v4** al progetto e verificare con `verifyYumeSetup` (sola lettura, nessun acquisto aggiunto). Pubblicare come app web eseguita dal proprietario. La lettura pubblica restituisce esclusivamente i volumi acquistati destinati al catalogo pubblico. Le scritture POST richiedono una capacità casuale privata; le chiamate JSONP sono esclusivamente di lettura.
3. Inserire il solo URL `/exec` pubblico in `data/owner-sync-config.json`. Non inserire ID del foglio, email, token o collegamenti privati nel repository.
4. Riaprire il foglio e usare **Yume → Collega questo browser → Attiva gli acquisti di Xuthar**. Il collegamento riservato configura il browser del proprietario. Non condividerlo. Il frammento contenente il token viene subito rimosso dall'URL.
5. Verificare il registro vuoto e il catalogo pubblico senza simulare acquisti nella collezione reale. Il primo acquisto effettivamente registrato aggiorna `Manga e novel`, `Volumi in possesso` e la ricevuta nello stesso batch atomico. Voti, lettura e formule non interessate restano intatti.

Il calendario corrente e lo storico permanente convalidano l'identità dell'edizione. Gli ISBN documentati consentono un'integrazione bibliografica tramite Google Books; i metadati assenti o non verificabili rimangono esplicitamente tali.

Il catalogo statico è preservato. Il sito integra le nuove registrazioni pubbliche in fase di caricamento; un errore di rete mantiene l'ultima copia locale leggibile. Senza collegamento proprietario le scelte e la collezione personale restano nel browser del singolo visitatore e non scrivono sui fogli di Xuthar.

Controlli: `node verify-manga-purchases.cjs`, `node verify-purchase-backend.cjs`, `node verify-visitor-lists.cjs`.

## ISBN

Gli ISBN sono verificati per titolo, numero, editore ed edizione commerciale, con checksum e fonte. Non attestano la ristampa esatta della copia fisica posseduta. I codici dubbi rimangono da verificare. Il workflow settimanale aggiorna i supplementi `data/manga-isbn.json` e `data/book-isbn.json`, lasciando intatti catalogo, storico e identità delle liste. I nuovi acquisti scrivono ISBN, fonte e stato nelle colonne O:Q dell’inventario. Dal browser proprietario il primo accesso dopo sette giorni sincronizza anche gli ISBN recuperati nel frattempo per i volumi già posseduti; senza accesso del proprietario il sito si aggiorna, mentre Sheets si riallinea alla visita successiva. Nessun acquisto viene generato da questa sincronizzazione dei metadati.

## Visioni riservate a Xuthar

Eseguire `verifyYumeAnimeSetup` dall’editor con l’account proprietario: crea solo l’intestazione di `Visioni Yume`. Aggiornare la versione del deployment esistente conservando l’URL `/exec`. Il browser viene riconosciuto come proprietario solo dopo una verifica POST della capacità privata già usata per gli acquisti. Nascondere i comandi non sostituisce la verifica sul server: ogni scrittura è autorizzata nuovamente.

`anime-save` accetta solo ID del catalogo, stato, episodi e voto. I metadati vengono letti dalle fonti del repository, mai dal client. Il salvataggio aggiorna Anime, Serie e stagioni e il registro permanente nello stesso batch, conservando gli altri campi. Completati e Da vedere restano viste filtrate. Un solo anime è On Air; cambiarlo riporta il precedente a Da vedere/In corso senza cancellare voto ed episodi. Le richieste ripetute non duplicano il registro.

`anime-catalog` è di sola lettura: alimenta il catalogo pubblico, i completati e il banner della home. Le scelte dei visitatori restano locali e non modificano la collezione di Xuthar. Nessun progresso locale precedente viene pubblicato automaticamente. Controlli: `node verify-owner-anime.cjs` e regressioni delle liste e degli acquisti.
