# Anime e Manga — Yume

## Progetto corrente

- Nome: **Yume — Anime & Manga**.
- Sito GitHub Pages: https://xuthar.github.io/yume-anime-manga/
- Repository: https://github.com/xuthar/yume-anime-manga
- Copia Sites: https://yume-anime-manga.spunky-note-8475.chatgpt.site
- Identità Sites: `appgprj_6ad103eed6a08191869f90350b495266`.
- Catalogo importato il 15 ottobre 2026: 752 anime, 275 manga e novel, 1.341 record di volumi posseduti.
- Il catalogo personale è `library.json`. I progressi, i voti e le edizioni non vanno alterati durante l'arricchimento delle schede.

## Richiesta del 17 ottobre 2026

Riprendere l'inserimento, **per ogni anime**, di:

1. Doppiatori principali, associati ai personaggi.
2. Sigle opening ed ending, associate alla stagione corretta.
3. Titolo e artista delle canzoni.
4. Link YouTube per l'ascolto.

L'utente vuole mantenere la cronologia nel progetto **Anime e Manga**. Questo registro conserva le decisioni e lo stato tecnico nel repository del sito; non sposta automaticamente conversazioni nei Progetti di ChatGPT.

## Scelte di implementazione

- Importazione dalla pagina pubblica MAL identificata dall'esatto ID dell'anime, con controllo dell'URL canonico per evitare associazioni fra stagioni diverse.
- Dati aggiuntivi in `anime-details.json`, separati dalla lista personale.
- Personaggi principali in primo piano; altre voci del cast raccolte in un riquadro espandibile. Lingua indicata accanto all'interprete.
- Opening ed ending conservano titolo, artista, numerazione ed episodi di utilizzo se disponibili.
- I collegamenti YouTube presenti nella fonte sono etichettati **Ascolta su YouTube**. In loro assenza, **Cerca su YouTube** apre una ricerca esatta per titolo e artista. Non presentare una ricerca come video verificato.
- Informazioni mancanti segnalate esplicitamente; non inventare dati o trasferire cast/sigle da un'altra stagione.
- Fonte MAL e data di verifica visibili nelle schede. Collegamenti MAL con etichetta breve **MAL**.
- Nessuna riproduzione o incorporamento di YouTube prima di una scelta del visitatore.
- Importazione riprendibile con `python import-anime-details.py` (richiede `lxml`).

## Verifiche

- `python test-anime-import.py`: identità dell'anime, crediti musicali con e senza collegamenti, testo giapponese e lingue del cast.
- `node --check app.js` e `node --check anime-credits.js`.
- `node verify-anime-credits.cjs`: copertura del catalogo, integrità dei dati personali, URL musicali, rendering e protezione dai contenuti HTML nella fonte.

## Come riprendere

### Risultato dell'importazione del 17 ottobre

752 anime verificati; 7.076 associazioni di cast e 2.392 sigle. Collegamenti musicali diretti forniti dalla fonte: 624. Nove opere non hanno crediti di doppiaggio disponibili su MAL; ventisei non hanno sigle elencate. Queste assenze sono segnalate nelle schede, senza trasferire informazioni da altri adattamenti.

Leggere questo registro e `CHANGELOG.md`, controllare la versione pubblicata e il repository corrente prima di apportare modifiche. Per ulteriori dati musicali mantenere la distinzione fra collegamenti diretti e ricerca YouTube. Il catalogo non si sincronizza automaticamente con MAL.

## Seasons — richiesta del 17 ottobre 2026

Pagina: https://xuthar.github.io/yume-anime-manga/seasons.html. Stagioni richieste: Summer, Autumn e Winter 2026. Winter 2026 indica gennaio–marzo, non Winter 2027. Spring è prevista nella struttura, senza catalogo in questa prima versione.

Catalogo stagionale separato dalla lista personale: 660 presenze, 560 titoli. Schede con immagini, dati principali, titoli originali/inglesi/italiani disponibili, trama breve e streaming in Italia. Nuove uscite e prosecuzioni hanno filtri distinti. Fonti: MAL e denominazioni/indicazioni regionali JustWatch. Non dedurre licenze italiane da altri paesi e non inventare titoli italiani traducendo liberamente.

File: `seasons.html`, `seasons.css`, `seasons.js`, `seasons.json`, cartella `data/`. Controllo: `node verify-seasons.cjs`. Pubblicare gli aggiornamenti su **GitHub Pages**, repository **xuthar/yume-anime-manga**.

### 17 ottobre 2026 — Scelte personali Seasons
Ogni anime stagionale dispone di «Voglio vederlo» e «Lo salto», sia nella card sia nella scheda. Ripremere annulla la scelta. Filtro «La mia scelta» con stati da vedere, saltato, da decidere. Chiave locale `yume-season-choices`, indicizzata per ID anime MAL, indipendente dai cuori dei preferiti. Salvataggio nel browser/dispositivo, senza sincronizzazione account. Test in `verify-seasons.cjs`.

## Stato del 18 ottobre 2026 — verifica estesa

Il catalogo contiene 1.933 anime in 580 franchise, ottenuti dai 794 record iniziali e dalle loro relazioni MAL. I dati personali dei record preesistenti e i 275 manga sono conservati. Le nuove opere hanno stato Da vedere, zero episodi visti, nessun voto e nessun preferito assegnato.

Identità: `malId` e `metadataKey` sono distinti dall'ID locale; non rinominare gli ID locali, usati da `yume-favorites`. Il raggruppamento usa `franchiseId` documentato dalle relazioni, non la rimozione di numeri dai titoli. Film, OVA, special, video musicali, spin-off e crossover restano distinti. I collegamenti generici Other/Character e gli adattamenti manga non espandono il catalogo.

Metadati: `catalog-metadata.json`; crediti: `anime-details.json`; lista e preferenze: `library.json`. `complete-catalog.py` recupera pagine pubbliche con cache locale ignorata da Git. `finalize-catalog.py` arricchisce la lista corrente mantenendone i campi personali e riusa i crediti salvati anche senza cache. Prima di un nuovo passaggio conservare sempre una fotografia della lista corrente; il commit 79a0e1f è il riferimento storico di questa verifica, non una lista da ripristinare.

Google Sheets: Anime contiene i metadati aggiuntivi in AA:AR; gli episodi dichiarati dalla fonte sono separati dal totale personale. Da vedere è una vista FILTER da Anime fino alla riga 2185. Non scrivere righe manuali nell'area di espansione. Le 41 righe duplicate preesistenti sono conservate in Archivio Da vedere 18-10. Serie e stagioni conserva stati, voti e progressi preesistenti. Tabelle native, convalide e colori sono mantenuti; i tipi testuali FALSE/0 dei vecchi record provvisori sono stati normalizzati dalla tabella senza cambiarne i valori.

Limiti: un link diretto MAL non prova l'ufficialità del canale YouTube; soltanto i video con fonte ufficiale sono etichettati così. Una pagina AnimeClick può aggregare più stagioni e non prova la licenza italiana di ogni singolo capitolo. Disponibilità mancanti significano non verificate. I dati di opere future non ancora pubblicati restano vuoti; nessuna data viene indovinata.

Controlli: `node verify-complete-catalog.cjs`, `node verify-anime-credits.cjs`, `node verify-seasons.cjs`, `python test-anime-import.py`. Resoconto: `RESOCONTO_CATALOGO_2026-10-18.md`; dettaglio per opera: `data/catalog-verification.csv`; prova di sincronizzazione: `data/sheets-verification.json`.
