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
