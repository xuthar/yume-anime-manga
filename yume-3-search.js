/* Yume 3.0 — search all five experiences. No data is fabricated. */
(function(){'use strict';
const form=document.getElementById('y3-unified-search');if(!form)return;
const input=form.querySelector('input'),out=document.getElementById('y3-search-results'),message=document.getElementById('y3-search-status');
const japanTopics=[
 ['Il Giappone degli anime, luoghi e scene reali','luoghi-anime-manga.html#jp-gallery'],
 ['Cucina giapponese, ricette regionali, ramen e sushi','cucina-giapponese.html#ricettario-giapponese'],
 ['Ingredienti giapponesi, dashi, miso e spezie','cucina-giapponese.html#atlante-ingredienti'],
 ['Giappone mare, spiagge e Okinawa, isole','giappone-da-visitare.html#travel-okinawa-shortcut'],
 ['Giappone onsen, terme e relax','giappone-da-visitare.html#travel-onsen-shortcut'],
 ['Yokai, yōkai, spiriti, fantasmi e leggende','folklore-giapponese.html#yokai-searchtools'],
 ['Creature tradizionali, bestiario del Giappone','folklore-giapponese.html#yokai-shelf-heading'],
 ['Storia del Giappone, samurai, shogun, Sengoku, Edo, Meiji','storia-giappone-anime.html#history-epoche'],
 ['Storia del Giappone, anime storici','storia-giappone-anime.html#history-anime'],
 ['Quiz sulla storia del Giappone','storia-giappone-anime.html#history-riconosci'],
 ['Yume Japan, cultura, atlanti del Giappone','yume-japan.html']
];
const norm=s=>String(s||'').toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'').trim();
const make=(tag,txt)=>{const n=document.createElement(tag);if(txt!==undefined)n.textContent=String(txt);return n};
const section=(title,items)=>{const box=make('section');box.className='y3-search-group';box.append(make('h3',title));if(!items.length){box.append(make('p','Nessuna corrispondenza'));return box}const ul=make('ul');items.slice(0,8).forEach(x=>{const li=make('li'),a=make('a',x.title);a.href=x.url;li.append(a);ul.append(li)});box.append(ul);return box};
const get=async u=>{const r=await fetch(u);if(!r.ok)throw Error(u);return r.json()};
form.addEventListener('submit',async event=>{
 event.preventDefault();const q=norm(input.value.trim());if(q.length<3){message.textContent='Inserisci almeno tre caratteri.';return}
 out.replaceChildren();message.textContent='Ricerca tra le cinque esperienze di Yume 3.0…';
 const [lib,compare,mag]=await Promise.allSettled([
 get('library.json?v=20261030-editorial'),get('data/adaptations/yume-comparisons.json?v=20261030'),get('data/magazine/numero-zero.json?v=20261030')
 ]);
 const library=lib.status==='fulfilled'&&Array.isArray(lib.value.items)?lib.value.items:[];
 const matches=library.filter(x=>!x.adult&&norm([x.title,x.english,x.original,x.italian,x.franchiseTitle,x.publisher].join(' ')).includes(q));
 const anime=matches.filter(x=>x.type==='anime').slice(0,8).map(x=>({title:x.title,url:'universe.html#franchise='+encodeURIComponent(x.franchiseId||x.id)}));
 const manga=matches.filter(x=>x.type==='manga').slice(0,8).map(x=>({title:x.title,url:'collector.html?q='+encodeURIComponent(x.title)}));
 const places=(window.YumeAnimePlaces||[]).filter(p=>norm([p.place,p.pref,p.region,p.work].join(' ')).includes(q)).slice(0,8).map(p=>({title:p.place+' · '+p.work,url:'anime-pilgrimage.html?q='+encodeURIComponent(p.place)}));
 const dossiers=compare.status==='fulfilled'&&Array.isArray(compare.value.items)?compare.value.items:[];
 const comparisons=dossiers.filter(x=>norm([x.title,x.hook,...x.aliases].join(' ')).includes(q)).slice(0,8).map(x=>({title:x.title,url:'manga-vs-anime.html?opera='+encodeURIComponent(x.slug)}));
 const stories=mag.status==='fulfilled'&&Array.isArray(mag.value.articles)?mag.value.articles:[];
 const articles=stories.filter(x=>norm([x.title,x.subtitle,x.category,...x.tags].join(' ')).includes(q)).slice(0,8).map(x=>({title:x.title,url:'magazine-article.html?id='+encodeURIComponent(x.slug)}));
 const japan=japanTopics.filter(x=>norm(x[0]).includes(q)).slice(0,8).map(x=>({title:x[0].split(',')[0],url:x[1]}));
 out.append(section('✦ Universe · anime',anime),section('▤ Collector · manga',manga),section('🗾 Pilgrimage · luoghi',places),section('本 Manga vs Anime',comparisons),section('誌 Yume Magazine',articles),section('⛩ Yume Japan · cultura',japan));
 message.textContent='Trovati '+(anime.length+manga.length+places.length+comparisons.length+articles.length+japan.length)+' risultati visibili (fino a 8 per categoria).'+(lib.status==='rejected'?' Catalogo principale temporaneamente non disponibile.':'')
});
})();