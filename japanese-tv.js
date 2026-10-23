/* Filters only: no account, cookies, playback tracking or personal-list writes. */
(() => {
  const form = document.querySelector('.tv-filters');
  if (!form) return;
  const cards = [...document.querySelectorAll('#canali-tv .tv-card')];
  const language = document.querySelector('#tv-language');
  const genre = document.querySelector('#tv-genre');
  const render = () => {
    let count = 0;
    for (const card of cards) {
      card.hidden = !(language.value === 'all' || language.value === card.dataset.language) || !(genre.value === 'all' || genre.value === card.dataset.genre);
      if (!card.hidden) count++;
    }
    document.querySelector('#tv-count').textContent = `${count} ${count === 1 ? 'canale' : 'canali'}`;
    document.querySelector('#tv-empty').hidden = count !== 0;
  };
  form.hidden = false;
  form.addEventListener('change', render);
  form.addEventListener('submit', event => event.preventDefault());
  form.addEventListener('reset', () => { language.value = 'all'; genre.value = 'all'; render(); });
})();

/* Official J1 feeds: https://www.j1fm.tokyo/j1/developers/ */
(() => {
  const audios = [...document.querySelectorAll('.radio-audio')];
  for (const button of document.querySelectorAll('.radio-start')) {
    const audio = document.getElementById(button.getAttribute('aria-controls'));
    const status = button.closest('article').querySelector('.radio-status');
    if (!audio) continue;
    audio.addEventListener('play', () => {
      for (const other of audios) if (other !== audio) other.pause();
      status.textContent = 'In ascolto · streaming live';
    });
    audio.addEventListener('pause', () => { status.textContent = 'In pausa'; });
    audio.addEventListener('waiting', () => { status.textContent = 'Caricamento della diretta…'; });
    audio.addEventListener('playing', () => { status.textContent = 'In ascolto · streaming live'; });
    audio.addEventListener('error', () => { status.textContent = 'Stream non disponibile. Prova il player ufficiale qui sotto.'; });
    button.addEventListener('click', async () => {
      for (const other of audios) if (other !== audio) other.pause();
      audio.hidden = false;
      if (!audio.src) audio.src = button.dataset.stream;
      status.textContent = 'Connessione alla radio…';
      try { await audio.play(); }
      catch { status.textContent = 'Premi Play nel lettore oppure usa il player ufficiale qui sotto.'; }
    });
  }
})();
