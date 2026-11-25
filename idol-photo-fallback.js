/* Recover the same documented file when an image host no longer serves a thumbnail. */
(() => {
  const attempted = new WeakMap();

  function alternateSizes(url) {
    if (url.hostname === 'upload.wikimedia.org' && url.pathname.includes('/thumb/')) {
      const file = url.pathname.split('/').pop();
      if (!/^\d+px-/.test(file)) return [];
      return [500, 250].map(width => url.origin + url.pathname.replace(/\/\d+px-([^/]+)$/, '/' + width + 'px-$1'));
    }
    if (url.hostname === 'commons.wikimedia.org' && /\/Special:FilePath\//i.test(url.pathname)) {
      return [500, 250].map(width => url.origin + url.pathname + '?width=' + width);
    }
    if (url.hostname === 'static.wikia.nocookie.net' && url.pathname.includes('/revision/latest/scale-to-width-down/')) {
      return [url.origin + url.pathname.split('/revision/latest/')[0] + '/revision/latest'];
    }
    return [];
  }

  document.addEventListener('error', event => {
    const img = event.target;
    if (!(img instanceof HTMLImageElement) || !img.closest('main') || !img.src) return;
    const tried = attempted.get(img) || new Set();
    tried.add(img.src);
    attempted.set(img, tried);
    const next = alternateSizes(new URL(img.src)).find(url => !tried.has(url));
    if (!next) return;
    event.stopImmediatePropagation();
    img.src = next;
  }, true);
})();
