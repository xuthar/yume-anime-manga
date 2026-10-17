'use strict';
// Credits are a separate, shared download: opening a manga never needs it.
let animeCreditsPromise;
function getAnimeCredits() {
  if (!animeCreditsPromise) {
    animeCreditsPromise = fetch('anime-details.json?v=20261017').then(response => {
      if (!response.ok) throw new Error('Credits unavailable');
      return response.json();
    }).catch(error => { animeCreditsPromise = undefined; throw error; });
  }
  return animeCreditsPromise;
}
function creditLink(url, title, className = '') {
  return safeUrl(url) ? `<a class="${escape(className)}" href="${escape(safeUrl(url))}" target="_blank" rel="noopener noreferrer">${escape(title)}</a>` : escape(title);
}
function castRows(rows) {
  const languages = {Japanese:'Giapponese', Italian:'Italiano', English:'Inglese', Mandarin:'Cinese mandarino', Chinese:'Cinese', Cantonese:'Cinese cantonese', Korean:'Coreano'};
  return `<dl class="voice-cast">${rows.map(row => `<div><dt>${creditLink(row.characterUrl, row.character)}</dt><dd>${row.voices.map(voice => `${creditLink(voice.url, voice.name)} <small>${escape(languages[voice.language] || voice.language)}</small>`).join('<br>')}</dd></div>`).join('')}</dl>`;
}
function themeSection(songs, title, shortTitle) {
  return `<section class="theme-section"><h4>${title} <span>${songs.length}</span></h4>${songs.length ? `<ol class="theme-list">${songs.map((song, i) => `<li><span class="song-number">${shortTitle} ${escape(song.index || i + 1)}</span><div class="song-copy"><strong>${escape(song.title)}</strong><p>Artista: ${escape(song.artist || 'Non indicato nella fonte')}</p>${song.episodes ? `<small>${escape(song.episodes.replace(/^\(eps?\s*/i, 'Episodi ').replace(/\)$/, ''))}</small>` : ''}</div>${creditLink(song.youtubeUrl || song.youtubeSearch, song.youtubeUrl ? '▶ Ascolta su YouTube ↗' : '⌕ Cerca su YouTube ↗', 'song-youtube')}</li>`).join('')}</ol>` : '<p class="credits-empty">Nessuna sigla indicata nella fonte per questa opera.</p>'}</section>`;
}
function animeCreditsMarkup(record) {
  if (!record) return '<p class="credits-empty">Cast e sigle in corso di verifica per questo anime.</p>';
  const mains = record.cast.filter(row => row.role === 'Main');
  const supporting = record.cast.filter(row => row.role !== 'Main');
  return `<section class="cast-section" aria-labelledby="cast-heading"><span class="eyebrow turquoise">LE VOCI DELLA STORIA</span><h3 id="cast-heading">Doppiatori principali</h3><p class="credits-intro">Personaggi e interpreti riportati nella scheda originale, con la lingua di ogni voce. Tocca un nome per aprire la sua scheda.</p>${mains.length ? castRows(mains) : '<p class="credits-empty">Ruoli principali non indicati nella fonte.</p>'}${supporting.length ? `<details class="supporting-cast"><summary>Altre voci del cast · ${supporting.length}</summary>${castRows(supporting)}</details>` : ''}</section><section class="music-section" aria-labelledby="music-heading"><span class="eyebrow turquoise">LA COLONNA SONORA</span><h3 id="music-heading">Opening & Ending</h3><p class="credits-intro">Le sigle di questa specifica stagione, con titolo, artista e ascolto su YouTube.</p>${themeSection(record.openings, 'Opening', 'OP')}${themeSection(record.endings, 'Ending', 'ED')}<p class="credits-footnote">“Cerca su YouTube” apre i risultati per il brano e l’artista; “Ascolta su YouTube” apre un collegamento fornito dalla fonte. La disponibilità dei video può cambiare.</p></section><p class="credits-source">Fonte cast e sigle: ${creditLink(record.sourceUrl, 'MAL ↗')}. Verificati il ${escape(new Date(record.checkedAt).toLocaleDateString('it-IT', {timeZone:'Europe/Rome'}))}.</p>`;
}
function loadAnimeCredits(item) {
  const root = document.querySelector('#anime-credits');
  if (!root) return;
  root.dataset.itemId = item.id;
  getAnimeCredits().then(data => {
    // A previous request must never populate a different anime's dialog.
    if (root.isConnected && root.dataset.itemId === item.id) {
      root.innerHTML = animeCreditsMarkup(data.items[item.id]);
      root.removeAttribute('aria-busy');
    }
  }).catch(() => {
    if (!root.isConnected) return;
    root.innerHTML = '<p class="credits-empty">Non riesco a caricare cast e sigle in questo momento.</p><button class="button glass credits-retry">Riprova</button>';
    root.removeAttribute('aria-busy');
    root.querySelector('button').onclick = () => {
      root.innerHTML = '<p class="credits-empty" role="status">Caricamento di cast e sigle…</p>';
      root.setAttribute('aria-busy', 'true');
      loadAnimeCredits(item);
    };
  });
}
