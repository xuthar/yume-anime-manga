# Sincronizzazione acquisti del proprietario

Stato iniziale: componente preparato, autorizzazione Google e deployment ancora da attivare. Nessun acquisto viene dedotto dalle uscite del calendario.

Il progetto Apps Script è associato al foglio privato del proprietario. Il codice da installare è la concatenazione di `manga-collection.js` e `apps-script/Purchases.gs`. Il progetto preparato nell'editor si chiama **Yume · Acquisti e collezione**.

1. Autorizzare il componente Google per l'accesso a Fogli, l'identità del proprietario e le richieste alle fonti pubbliche. Eseguire `setupYume` una volta: registra l'ID del foglio nelle proprietà private e crea il registro `Acquisti Yume`, senza aggiungere acquisti.
2. Pubblicare come app web eseguita dal proprietario. La lettura pubblica restituisce esclusivamente i volumi acquistati destinati al catalogo pubblico. Le scritture POST richiedono una capacità casuale privata; le chiamate JSONP sono esclusivamente di lettura.
3. Inserire il solo URL `/exec` pubblico in `data/owner-sync-config.json`. Non inserire ID del foglio, email, token o collegamenti privati nel repository.
4. Riaprire il foglio e usare **Yume → Collega questo browser → Attiva gli acquisti di Xuthar**. Il collegamento riservato configura il browser del proprietario. Non condividerlo. Il frammento contenente il token viene subito rimosso dall'URL.
5. Verificare il registro vuoto e il catalogo pubblico senza simulare acquisti nella collezione reale. Il primo acquisto effettivamente registrato aggiorna `Manga e novel`, `Volumi in possesso` e la ricevuta nello stesso batch atomico. Voti, lettura e formule non interessate restano intatti.

Il calendario corrente e lo storico permanente convalidano l'identità dell'edizione. Gli ISBN documentati consentono un'integrazione bibliografica tramite Google Books; i metadati assenti o non verificabili rimangono esplicitamente tali.

Il catalogo statico è preservato. Il sito integra le nuove registrazioni pubbliche in fase di caricamento; un errore di rete mantiene l'ultima copia locale leggibile. Senza collegamento proprietario le scelte e la collezione personale restano nel browser del singolo visitatore e non scrivono sui fogli di Xuthar.

Controlli: `node verify-manga-purchases.cjs`, `node verify-purchase-backend.cjs`, `node verify-visitor-lists.cjs`.
