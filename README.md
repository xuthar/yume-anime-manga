# Yume — La libreria anime e manga di Xuthar

Sito personale in italiano, con grafica originale e catalogo navigabile.

## Contenuti
- 752 anime e 275 manga/novel.
- 1.341 volumi posseduti, con dettagli delle edizioni.
- 928 copertine ottimizzate salvate localmente.
- Ricerca, filtri, voti di Xuthar e preferiti salvati nel browser del visitatore.

## Pubblicazione
Sito statico senza dipendenze di compilazione. GitHub Pages pubblica dal ramo `main`, cartella radice `/`.
I percorsi delle risorse sono relativi e compatibili con `/yume-anime-manga/`.

## Aggiornamento dei dati
`library.json` contiene l’importazione della lista del 15 ottobre 2026. La sincronizzazione automatica con Google Sheets non è attiva. I dati originali nel foglio non vengono modificati dal sito.
I volumi posseduti e il totale dell’opera sono distinti: alcune edizioni raccolgono più volumi originali.

## Crediti
Copertine e generi associati tramite AniList e identificativi MyAnimeList. Le immagini appartengono ai rispettivi autori ed editori. Le opere classificate per adulti e quelle senza copertina disponibile usano un riquadro neutro.
Illustrazione principale originale generata con AI. Non viene concessa alcuna licenza sulle immagini di terzi.

## Cast, sigle e cronologia
Le schede dei 752 anime includono i crediti disponibili: personaggi e doppiatori, opening/ending, artisti ed episodi di utilizzo. `anime-details.json` raccoglie 7.076 associazioni di cast e 2.392 sigle, con fonte MAL e data di verifica. I 624 collegamenti YouTube diretti forniti dalla fonte sono distinti dalle ricerche del brano. Le informazioni mancanti sono segnalate nelle schede.

Registro delle modifiche: `CHANGELOG.md`. Contesto per riprendere il progetto: `PROGETTO_ANIME_E_MANGA.md`.

Importazione riprendibile: `python import-anime-details.py` (richiede `lxml`). Verifiche: `python test-anime-import.py`, `node verify-anime-credits.cjs`, `node --check app.js`, `node --check anime-credits.js`.

## Seasons 2026
La pagina `seasons.html` raccoglie Summer (262 presenze), Autumn (169) e Winter (229) del 2026: 560 titoli distinti. Winter indica gennaio–marzo. TV, ONA, OVA, film e special sono ricercabili e filtrabili per formato, streaming italiano e nuove uscite/prosecuzioni. Schede con copertina, titoli disponibili, trama breve, studio, episodi, durata, adattamento e voto MAL.

`seasons.json` conserva il catalogo; `data/season-summaries-it.json` le sintesi editoriali e `data/season-italian-metadata.json` le denominazioni italiane documentate. Le informazioni assenti sono esplicite. Acquisti e noleggi sono distinti dagli abbonamenti. Le copertine aggiuntive sono caricate direttamente da MAL senza referrer; quelle per adulti non vengono mostrate.

Aggiornamento manuale: `python import-seasons.py`, `python enrich-seasons-it.py`, `python finalize-seasons.py`, `node verify-seasons.cjs`. Gli importatori usano pagine pubbliche e cache temporanee; i testi editoriali rimangono versionati. Il calendario segue MAL, distinto dalle date italiane di disponibilità.


### Calendario episodi e atmosfera stagionale

Il calendario nella pagina `calendario-anime.html`, accessibile dalla home e dal menu, usa `data/episode-calendar.json`, aggiornato ogni giorno alle 04:17 UTC dal workflow **Aggiorna calendario episodi** (avviabile anche manualmente). Il workflow interroga le uscite italiane datate di AnimeClick, associa al catalogo solo titoli univoci, conserva lo storico recente e pubblica esplicitamente il sito con Pages. Non genera ricorrenze, non cambia stati personali e non scrive nei fogli Google. Un errore della fonte interrompe il workflow conservando l’ultimo calendario valido; il sito segnala dati più vecchi di 48 ore. Le esecuzioni programmate GitHub possono subire ritardi; controllare Actions in caso di aggiornamento in ritardo.

`seasonal.js` usa la data Europe/Rome: Halloween dal 1 al 31 ottobre, Natale dall’8 dicembre al 6 gennaio. Il cambio avviene automaticamente anche nelle schede aperte; il pulsante decorazioni memorizza solo una preferenza locale.

Verifica: `node verify-calendar-seasonal.cjs` e `node verify-tonight.cjs`. Lo script Python richiede `lxml`; gli altri componenti funzionano senza dipendenze aggiuntive.


### Uscite manga e novel IT / EN

`uscite-manga.html` legge `data/book-calendar.json`: filtri per lingua, formato, editore e titolo, navigazione per settimana, passaggio automatico alla settimana attuale e rilettura dei dati nelle schede aperte. Il workflow **Aggiorna calendario manga e novel** aggiorna ogni lunedì alle 05:37 UTC e pubblica esplicitamente Pages. Condivide il gruppo di concorrenza del calendario anime per evitare aggiornamenti simultanei.

Fonti: AnimeClick manga e novel per l’Italia; Seven Seas (cartaceo), Yen Press (edizioni EN del calendario, compresa distribuzione) e J-Novel Club (ebook completi) per l’inglese. Il parser JNC legge il JSON pubblico renderizzato dal server senza eseguire script esterni e scarta le prepubblicazioni. La finestra JNC dipende dagli eventi forniti dalla pagina. Non viene dichiarata una copertura completa di tutti gli editori inglesi. Le date EN non indicano l’arrivo nei negozi italiani.

Ogni fonte mantiene il suo ultimo controllo; un errore conserva i dati precedenti segnalando il problema. Se falliscono tutte, lo script non sovrascrive il calendario valido. Le pagine esplicitamente vuote sono accettate, quelle non riconosciute sono errori. Non si ricavano date per ricorrenza. Gli ISBN identificano le edizioni, altrimenti viene usata la scheda di origine. Il catalogo personale e i fogli restano separati.

Verifiche: `python verify-book-calendar.py`, `node verify-book-calendar.cjs`, `node verify-calendar-seasonal.cjs`, `node verify-tonight.cjs`.

Le schede dei titoli del calendario anime aprono la stagione corrispondente nella libreria tramite `index.html?anime=ID#catalogo`. I dati e il workflow di aggiornamento restano condivisi con il calendario precedente.


### Sezione J-pop · BiSH

`jpop.html` è un archivio musicale indipendente dal catalogo anime/manga e dai suoi dati personali. La prima artista/gruppo è BiSH, con introduzione, sei componenti della formazione finale, quattro video ufficiali e la discografia audio in `data/jpop-bish.json`. Sono presenti i sette album in studio, i tre EP/mini-album, tre raccolte (incluso il vinile commemorativo 2026) e sette pubblicazioni con edizioni audio live. Le differenti scalette delle confezioni sono selezionabili e non vengono mescolate. Per REBOOT BiSH e FROM DUSK TiLL DAWN il CD è documentato ma la fonte non dettaglia separatamente le tracce: le lacune sono esplicite.

Titoli, date, fotografie e copertine provengono dall’archivio ufficiale BiSH/avex; profili e fonti sono collegati in pagina. I video diretti sono stati verificati tramite gli embed dell’archivio ufficiale e i relativi metadati YouTube. I link di ricerca sono etichettati come tali; i collegamenti Spotify dei singoli brani sono ricerche, mentre il profilo artista è quello collegato dal sito ufficiale. Nessun URL di traccia Spotify viene inventato. Progetti individuali e pubblicazioni collettive non sono classificati come album in studio BiSH. Aggiornamento editoriale verificato il 21 ottobre 2026.
