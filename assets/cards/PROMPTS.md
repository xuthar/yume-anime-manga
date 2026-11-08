# Yume — art direction degli sfondi cinematici

Riferimento approvato: le card Anime, Manga, Seasons e J-Pop della Home.
Lo stile è **un'illustrazione ambientale anime dettagliata, non una grafica vettoriale di simboli**. Le nove card "Ancora più Giappone" riutilizzano in modo coerente le stesse illustrazioni ambientali già presenti e funzionanti in `assets/home/` e `assets/hero.webp`, con inquadrature e luce diverse, kanji in alto a destra, badge tematico in alto a sinistra, overlay scuro nella parte inferiore e invito Esplora.

## Prompt generale per futuri sfondi indipendenti

Cinematic Japanese anime environment background illustration, hand painted detailed scenery, blue-hour Kyoto alleys and wooden architecture, vivid yet realistic atmospheric perspective, intricate timber lattice, warm amber lanterns, sakura petals drifting, deep indigo navy twilight, pastel pink and turquoise highlights, subtle water reflections and distant Tokyo skyline. Rich layered textures and beautiful artwork, polished animation background painting, no people, no logos, no lettering. Portrait-friendly crop for a 3:4 UI card, leave the lower 45% comparatively quiet and dark for legible white card text. Similar visual quality and framing to the existing Yume home illustrations.

## Scelte applicate alle nove card

| Card | Immagine già presente | Tema cromatico / inquadratura |
| --- | --- | --- |
| Yume Japan | `assets/home/garden.webp` | 京, inquadratura dedicata e tonalità blu notte/sakura |
| Chronos | `assets/home/library.webp` | 時, inquadratura dedicata e tonalità blu notte/sakura |
| Yume Magazine | `assets/hero.webp` | 誌, inquadratura dedicata e tonalità blu notte/sakura |
| Idols | `assets/home/music.webp` | 歌, inquadratura dedicata e tonalità blu notte/sakura |
| Le atlete giapponesi | `assets/home/city.webp` | 競, inquadratura dedicata e tonalità blu notte/sakura |
| Asia Idols | `assets/home/city.webp` | 亜, inquadratura dedicata e tonalità blu notte/sakura |
| Young Stars | `assets/home/garden.webp` | 星, inquadratura dedicata e tonalità blu notte/sakura |
| Manga vs Anime | `assets/home/library.webp` | 漫, inquadratura dedicata e tonalità blu notte/sakura |
| Yume Nexus | `assets/home/music.webp` | 宙, inquadratura dedicata e tonalità blu notte/sakura |

## Regole di pubblicazione

1. Immagini locali al repository, non hotlink a siti terzi.
2. Nove link originali invariati.
3. Sfumatura verso il blu notte nel 45% inferiore.
4. Nome, descrizione e invito Esplora leggibili in primo piano.
5. Su schermi piccoli mantenere l'immagine con `object-fit:cover`.
6. Non aggiungere volti o marchi riconoscibili: sono ambientazioni illustrative, senza persone.

L'implementazione attuale si trova in `index.html` e `yume-feature-art.css`.

## Rimozione duplicati — 8 novembre 2026

Ogni card ora ha un proprio file illustrato, senza ripetizioni nemmeno quando cambia il ritaglio.

1. **japan**: `assets/yume3-kyoto-panorama.svg` — Kyoto illustrata: torii, monti e ciliegi
2. **chronos**: `assets/yume3-chronos-scene.svg` — Orologio astrale tra epoche storiche
3. **magazine**: `assets/yume3-magazine-scene.svg` — Scena editoriale con pagine e riviste
4. **idols**: `assets/home/music.webp` — Studio musicale notturno
5. **sport**: `assets/cards/sport.svg` — Medaglia e dinamismo sportivo
6. **asia**: `assets/home/city.webp` — Skyline asiatico notturno
7. **young**: `assets/home/garden.webp` — Giardino e luci delle giovani generazioni
8. **compare**: `assets/yume3-compare-scene.svg` — Libro manga e adattamento animato
9. **nexus**: `assets/yume3-universe-scene.svg` — Atlante cosmico e connessioni

## Pubblicazione definitiva — 9 immagini AI originali (08/11/2026)

Le nove card non riutilizzano più SVG o fotografie delle card Anime/Manga. Le nove immagini cinematiche generate per Yume sono salvate nella repository come AVIF ad alta risoluzione (960 × 540, compressione per il web), ciascuna con nome e contenuto distinti:

- **japan** — `assets/cards/yume-japan-20261108.avif` — Torii al tramonto, ciliegi, Fuji e lago
- **chronos** — `assets/cards/yume-chronos-20261108.avif` — Osservatorio del tempo con grande orologio e libri
- **magazine** — `assets/cards/yume-magazine-20261108.avif` — Studio editoriale con manga, penne e lampada
- **idols** — `assets/cards/yume-idols-20261108.avif` — Concerto idol con palco e luci rosa
- **sport** — `assets/cards/yume-sport-20261108.avif` — Atleta che corre in uno stadio al tramonto
- **asia** — `assets/cards/yume-asia-20261108.avif` — Metropoli asiatica di notte tra templi e neon
- **young** — `assets/cards/yume-young-20261108.avif` — Giovane che osserva il cielo stellato da una terrazza
- **compare** — `assets/cards/yume-compare-20261108.avif` — Studio disegno manga diviso con scena anime
- **nexus** — `assets/cards/yume-nexus-20261108.avif` — Biblioteca astronomica e atlante di universi narrativi

La griglia usa `yume-feature-art.css` e conserva i collegamenti originali. Gli SVG storici in `assets/cards` non sono referenziati dalle nuove nove card.
