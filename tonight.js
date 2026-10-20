/* Recommendations use the existing collection; no personal data is written. */
(() => {
  'use strict';
  function eligible(items, filters, durations, choices = {}) {
    return items.filter(x => x.type === 'anime' && x.status === 'Da vedere'
      && ['Finished Airing', 'Currently Airing'].includes(x.releaseStatus)
      && choices['anime-' + (x.malId || '')] !== 'skip' && choices[x.id] !== 'skip'
      && (filters.format === 'all' || (filters.format === 'series'
        ? x.seasonCategory === 'Stagioni e serie' && ['TV', 'ONA'].includes(x.mediaFormat)
        : x.seasonCategory === 'Film'))
      && (filters.genre === 'all' || x.genres.includes(filters.genre))
      && (!filters.finished || x.releaseStatus === 'Finished Airing')
      && (!filters.minutes || (Number.isFinite(durations[x.id]) && durations[x.id] <= filters.minutes)));
  }
  function choose(pool, seen, random = Math.random) {
    if (!pool.length) return null;
    let available = pool.filter(x => !seen.has(x.id));
    if (!available.length) {
      const previous = [...seen].at(-1);
      seen.clear();
      available = pool.length > 1 ? pool.filter(x => x.id !== previous) : pool;
    }
    const selected = available[Math.floor(random() * available.length)];
    seen.add(selected.id);
    return selected;
  }
  function readChoices() {
    try {
      const value = JSON.parse(localStorage.getItem('yume-season-choices') || '{}');
      return value && typeof value === 'object' && !Array.isArray(value) ? value : {};
    } catch { return {}; }
  }
  async function init(items, openDetail, genreLabel) {
    const root = document.querySelector('#tonight');
    if (!root) return;
    const genre = root.querySelector('#tonight-genre');
    const format = root.querySelector('#tonight-format');
    const minutes = root.querySelector('#tonight-minutes');
    const finished = root.querySelector('#tonight-finished');
    const draw = root.querySelector('#tonight-draw');
    const result = root.querySelector('#tonight-result');
    const status = root.querySelector('#tonight-status');
    const seen = new Set();
    let durations = {};
    try {
      const response = await fetch('data/tonight-durations.json?v=20261020');
      if (!response.ok) throw Error('Durations unavailable');
      durations = await response.json();
    } catch { /* Unknown durations remain usable with no time filter. */ }
    const genres = [...new Set(eligible(items, {format:'all',genre:'all'}, durations, readChoices()).flatMap(x => x.genres))];
    genres.sort((a,b) => genreLabel(a).localeCompare(genreLabel(b), 'it')).forEach(g => genre.add(new Option(genreLabel(g), g)));
    function pool() {
      return eligible(items, {format:format.value, genre:genre.value, minutes:Number(minutes.value), finished:finished.checked}, durations, readChoices());
    }
    function update() {
      seen.clear();
      result.replaceChildren();
      result.hidden = true;
      const count = pool().length;
      status.textContent = count ? `${count} ${count === 1 ? 'titolo disponibile' : 'titoli disponibili'} dalla lista «Da vedere».` : 'Nessun titolo corrisponde: prova un altro genere o allarga i filtri.';
      draw.disabled = !count;
      draw.textContent = '✦ Scegli per me';
    }
    function paragraph(text, className) {
      const p = document.createElement('p');
      p.textContent = text;
      if (className) p.className = className;
      return p;
    }
    draw.addEventListener('click', () => {
      const candidates = pool();
      const x = choose(candidates, seen);
      if (!x) { update(); return; }
      result.replaceChildren();
      result.hidden = false;
      const poster = document.createElement('div'); poster.className = 'tonight-poster';
      if (x.image && !x.adult) {
        const img = document.createElement('img'); img.src = x.image; img.alt = 'Copertina di ' + x.title; img.referrerPolicy = 'no-referrer';
        img.addEventListener('error', () => { img.remove(); poster.textContent = '夢'; }, {once:true});
        poster.append(img);
      } else poster.textContent = x.adult ? '18+' : '夢';
      const copy = document.createElement('div'); copy.className = 'tonight-copy';
      const heading = document.createElement('h3'); heading.textContent = x.title;
      copy.append(paragraph('IL TUO CONSIGLIO DI STASERA', 'eyebrow turquoise'), heading);
      const duration = durations[x.id];
      copy.append(paragraph([x.format || 'Anime', duration ? `${duration} min${x.mediaFormat === 'TV' || x.mediaFormat === 'ONA' ? ' a episodio' : ''}` : 'Durata non disponibile', x.releaseStatus === 'Finished Airing' ? 'Stagione / opera conclusa' : 'In trasmissione'].join(' · '), 'tonight-facts'));
      copy.append(paragraph(x.genres.map(genreLabel).join(' · '), 'tonight-genres'));
      if (x.synopsis) copy.append(paragraph(x.synopsis, 'tonight-synopsis'));
      if (x.streaming) copy.append(paragraph('Streaming indicato: ' + x.streaming, 'tonight-facts'));
      copy.append(paragraph('Dalla lista «Da vedere». Può essere un sequel: controlla le altre stagioni nella scheda.', 'tonight-note'));
      const open = document.createElement('button'); open.type = 'button'; open.className = 'button glass'; open.textContent = 'Apri la scheda ↗';
      open.addEventListener('click', () => openDetail(x)); copy.append(open);
      result.append(poster, copy);
      status.textContent = `Scelto: ${x.title}. ${candidates.length} ${candidates.length === 1 ? 'titolo adatto' : 'titoli adatti'} ai filtri.`;
      draw.textContent = candidates.length > 1 ? '✦ Un altro consiglio' : '✦ Scegli di nuovo';
    });
    [genre, format, minutes, finished].forEach(el => el.addEventListener('change', update));
    root.querySelector('#tonight-reset').addEventListener('click', () => {
      genre.value = 'all'; format.value = 'series'; minutes.value = '0'; finished.checked = false; update();
    });
    window.addEventListener('storage', event => { if (event.key === 'yume-season-choices' || event.key === null) update(); });
    update();
  }
  window.YumeTonight = {init, eligible, choose};
})();
