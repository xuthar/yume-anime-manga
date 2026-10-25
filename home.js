// Preserve links shared before the homepage became a navigation hub.
(()=>{function route(){const q=new URLSearchParams(location.search),h=location.hash;if(q.has('anime')||['#anime','#manga','#catalogo','#tonight','#preferiti'].includes(h)){location.replace('libreria.html'+location.search+h)}else if(h==='#episode-calendar'){location.replace('calendario-anime.html')}}route();window.addEventListener('hashchange',route)})();

// A small, non-interactive sakura layer; preferences stay on this device.
(()=>{
 const host=document.querySelector('.home-page'),heading=document.querySelector('.home-explore .section-heading');
 if(!host||!heading)return;
 const key='yume-sakura-enabled',motion=matchMedia('(prefers-reduced-motion: reduce)');
 let enabled=true;try{enabled=localStorage.getItem(key)!=='off'}catch{}
 const layer=document.createElement('div');layer.className='sakura-layer';layer.setAttribute('aria-hidden','true');
 for(let i=0;i<18;i++){
  const fall=document.createElement('span');fall.className='sakura-fall';
  fall.style.cssText=`--left:${(i*37+9)%100}%;--fall:${16+i%7*2}s;--delay:${-i*2.7}s;--drift:${(i%2?-1:1)*(35+i%5*20)}px;--size:${8+i%5*2}px;--sway:${3+i%4}s;--tilt:${i*29}deg`;
  const petal=document.createElement('i');petal.className='sakura-petal';fall.append(petal);layer.append(fall);
 }
 const button=document.createElement('button');button.type='button';button.className='sakura-toggle';heading.append(button);host.append(layer);
 function render(){
  const reduced=motion.matches;layer.hidden=!enabled||reduced;
  button.hidden=reduced;button.setAttribute('aria-pressed',String(enabled));
  button.textContent=enabled?'Petali · attivi':'Petali · disattivati';
  button.setAttribute('aria-label',enabled?'Nascondi i petali di ciliegio':'Mostra i petali di ciliegio');
 }
 button.addEventListener('click',()=>{enabled=!enabled;try{localStorage.setItem(key,enabled?'on':'off')}catch{}render()});
 function pause(){layer.dataset.paused=String(document.hidden)}
 document.addEventListener('visibilitychange',pause);motion.addEventListener('change',render);pause();render();
})();
