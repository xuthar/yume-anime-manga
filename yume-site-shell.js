/* Shared, accessible site chrome. Preserve page content and functional controls. */
(()=>{'use strict';
 document.body.classList.add('yume-unified');
 document.querySelectorAll('.yn-dock,.yn-menu').forEach(n=>n.remove());document.body.classList.remove('has-yume-dock');
 let header=[...document.querySelectorAll('body > header')].find(h=>h.querySelector('nav'));
 if(!header){
  header=document.createElement('header');
  header.innerHTML='<a class="brand" href="index.html" aria-label="Yume, homepage"><span class="mark">夢</span><span>yume<span class="brand-dot">.</span><small>ANIME & MANGA</small></span></a><nav aria-label="Menu principale"></nav>';
  document.body.prepend(header);
 }
 header.classList.add('yume-site-header');
 const nav=header.querySelector('nav');nav.setAttribute('aria-label','Menu principale');
 const logo=header.querySelector('a');
 if(logo){logo.classList.add('brand');logo.href='index.html';logo.setAttribute('aria-label','Yume, homepage');logo.innerHTML='<span class="mark">夢</span><span>yume<span class="brand-dot">.</span><small>ANIME & MANGA</small></span>'}
 let cta=header.querySelector('.nav-cta');if(!cta){cta=document.createElement('a');cta.className='nav-cta';header.append(cta)}cta.href='mie-liste.html';cta.textContent='Le mie liste ↗';
})();
