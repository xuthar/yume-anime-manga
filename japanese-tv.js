/* Filters only: no account, cookies, playback tracking or personal-list writes. */
(() => {
  const form = document.querySelector('.tv-filters');
  if (!form) return;
  const cards = [...document.querySelectorAll('.tv-card')];
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
