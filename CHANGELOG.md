# Cronologia — Anime e Manga

## 17 ottobre 2026 — Seasons su GitHub Pages

- Aggiunti menu Seasons, richiamo nella homepage e pagina stagionale dedicata.
- Summer 2026: 262 presenze; Autumn 2026: 169; Winter 2026: 229. Totale: 560 anime distinti. Winter 2026 indica gennaio–marzo 2026.
- Schede con immagini, titoli disponibili, trama breve, studio, formato, episodi, durata, adattamento e voto MAL.
- Ricerca e filtri per formato, piattaforma italiana e nuove uscite/prosecuzioni.
- Streaming italiano indicato per 158 titoli; assenze e dati non confermati restano espliciti. Fonti e data di controllo nelle schede; acquisti/noleggi distinti dagli abbonamenti.
- Integrate 11 conferme dal palinsesto ufficiale italiano di Crunchyroll, con fonte nelle schede.
- Verificate 560 pagine individuali MAL. Titoli italiani documentati dal catalogo italiano. Trame come sintesi editoriali, brevi estratti attribuiti o note sul progetto.
- Pubblicazione nel repository xuthar/yume-anime-manga e nella sua GitHub Pages.

## 17 ottobre 2026 — Cast e sigle

Copertura verificata: **752/752 anime**, **7.076 associazioni personaggio/interprete** e **2.392 sigle**. La fonte fornisce **624 collegamenti YouTube diretti**; le altre sigle hanno una ricerca YouTube per titolo e artista. Per 9 anime non sono disponibili associazioni di doppiaggio nella fonte e per 26 non sono indicate sigle: le schede mostrano messaggi espliciti. Il secondo controllo delle 9 schede senza cast non ha prodotto ulteriori crediti.

Controlli superati: importazione con identità MAL verificata, regressioni del parser, schema dell'intero catalogo, escaping dei contenuti, URL YouTube e conservazione dei 1.027 titoli e 1.341 record di volumi. Controllo visivo sulla copia Sites pubblicata: cast e sigle caricati correttamente, collegamenti coerenti, nessun errore JavaScript e nessuno scorrimento orizzontale a 390 px. Aggiornamento trasferito nel repository GitHub esistente, mantenendo la pubblicazione dalla radice del ramo main.

- Ripresa la richiesta di completare le schede di tutti i 752 anime con doppiatori e opening/ending.
- Aggiunte sezioni dedicate nelle schede, con personaggi, interpreti, lingua, titolo delle sigle, artista ed episodi di utilizzo disponibili.
- Aggiunti collegamenti YouTube diretti quando forniti dalla fonte e ricerche del brano chiaramente etichettate negli altri casi.
- Aggiunta tracciabilità della fonte MAL e della data di verifica, con controllo dell'identità della stagione durante l'importazione.
- Conservati catalogo personale, voti, progressi, preferiti locali e dati delle edizioni manga.
- Aggiunti importatore riprendibile e controlli dei dati e del rendering.
- Creato il registro `PROGETTO_ANIME_E_MANGA.md` per mantenere le decisioni e riprendere il lavoro con continuità.

## Stato precedente — versione pubblicata 3, 16 ottobre 2026

- Catalogo di 752 anime e 275 manga/novel, con 1.341 volumi in collezione.
- Copertine, ricerca per titoli alternativi, filtri, paginazione, voti, progressi e preferiti del browser.
- Nell'istantanea del sorgente recuperata il 17 ottobre non erano presenti sezioni di cast e sigle.

## 2026-10-17 — Scelte personali nelle Seasons
- Pulsanti «Voglio vederlo» e «Lo salto» nelle card e nelle schede complete, con scelta esclusiva e annullamento premendo di nuovo.
- Filtro per anime da vedere, saltati e ancora da decidere; scelte condivise tra stagioni tramite ID MAL.
- Salvataggio locale come i preferiti, sincronizzazione fra schede del browser e avviso se il salvataggio non è disponibile.
- Verificati catalogo, persistenza, cambio scelta, annullamento e fallback senza localStorage.

## 2026-10-18 — Catalogo completo e schede franchise
- Controllati i 794 anime iniziali e chiuse ricorsivamente le relazioni MAL: 1.933 opere, 580 franchise, 1.139 aggiunte senza progressi o voti assegnati.
- Identificati i 42 record provvisori mantenendo gli ID locali usati dai preferiti; corrette le copertine prese in prestito da altre stagioni.
- Cast e musica: 15.334 associazioni di doppiaggio, 4.080 sigle, 910 link YouTube da MAL; 24 video associati da fonti ufficiali.
- Confronto AnimeClick: 794 titoli cercati, alias e pagine approfondite; corrispondenze ambigue esplicitamente non verificate.
- Aggiornati Anime, Da vedere e Serie e stagioni; 11.598 campi personali verificati. Archiviati i 41 duplicati manuali che bloccavano la vista Da vedere; la formula ora restituisce 1.227 titoli.
- Salvati resoconto completo, audit e CSV per opera. Tutti i manga e i campi personali già presenti restano preservati.
