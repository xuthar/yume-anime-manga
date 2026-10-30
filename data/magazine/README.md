# Yume Magazine — calendario mensile e PDF

Il Magazine esce **l'ultimo giorno di ogni mese**. Il Numero 00 del 30 ottobre 2026 è l'edizione speciale inaugurale. La prima uscita regolare prevista è **Numero 01, 30 novembre 2026**.

## Preparazione di un nuovo numero
1. Creare un file JSON separato, per esempio `data/magazine/numero-01-2026-11.json` con struttura `schemaVersion`, `issues`, `articles`, seguendo `numero-zero.json`.
2. Dare al numero un identificativo unico sequenziale (`01`, `02`, …), `date` corrispondente **all'ultimo giorno del mese** nel fuso `Europe/Rome`, `title`, `articleSlugs`. Ogni articolo ha slug, titolo, sezioni originali, fonti e collegamenti al catalogo.
3. Preparare **almeno 6 articoli originali** con almeno 3 sezioni ciascuno e fonti indicate; il controllo per la pubblicazione programmata non considera pronti i numeri incompleti.
4. GitHub Actions controlla alle **18:15 UTC** ogni giorno dal 28 al 31: pubblica esclusivamente se la data locale di Roma è l'ultimo giorno del mese e il numero del mese è completo. Nei mesi di febbraio gestisce automaticamente il 28 o 29.
5. Il generatore `scripts/build-magazine-pdf.py` prepara un PDF originale per ciascun numero e aggiorna `data/magazine/pdf-catalog.json`. Il sito carica automaticamente il numero più recente e mantiene in archivio le edizioni precedenti, con lettura online e download PDF.
6. Per un intervento esplicito si può avviare manualmente il workflow `magazine-pdf.yml`.

## Regole editoriali
Il workflow **non scrive articoli da solo** e non finge la disponibilità di un nuovo numero. Una data in calendario non equivale alla pubblicazione se i contenuti mancano o non sono verificati. Ogni file pubblicato deve rispettare copyright, originalità, fonti attendibili e non alterare dati proprietari di acquisti, voti o progressi.

## Uscite
- **00 · Tra pagine e mondi · 30/10/2026** — speciale inaugurale, 8 articoli, PDF scaricabile.
- **01 · 30/11/2026** — prima uscita mensile prevista, contenuti editoriali da preparare.
- Successivamente: ultimo giorno di ogni mese, senza creare numeri vuoti.
