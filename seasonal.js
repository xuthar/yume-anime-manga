/* Local date in Italy controls the annual decorations, including open tabs. */
(() => {
  'use strict';
  const KEY='yume-seasonal-decor';
  function seasonFor(key){const md=key.slice(5);return md>='10-01'&&md<='10-31'?'halloween':md>='12-08'||md<='01-06'?'christmas':''}
  function init(){
    const control=document.createElement('button');control.type='button';control.className='seasonal-toggle';
    const decor=document.createElement('div');decor.className='seasonal-decor';decor.setAttribute('aria-hidden','true');
    const header=document.querySelector('header');if(header)header.after(control);else document.body.prepend(control);document.body.append(decor);
    const symbols={halloween:['🎃','✦','👻','✧','🎃'],christmas:['🎄','❄','✦','❄','🎁']};
    function render(){
      const key=new Intl.DateTimeFormat('sv-SE',{timeZone:'Europe/Rome',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
      const season=seasonFor(key);let enabled=true;try{enabled=localStorage.getItem(KEY)!=='off'}catch{}
      control.hidden=!season;decor.hidden=!season||!enabled;document.body.dataset.season=enabled?season:'';
      const name=season==='halloween'?'Halloween':'Natale';
      control.textContent=(enabled?'Nascondi':'Mostra')+' decorazioni · '+name;control.setAttribute('aria-pressed',String(enabled));
      decor.innerHTML=season?symbols[season].map((s,i)=>`<span class="season-ornament ornament-${i}">${s}</span>`).join(''):'';
    }
    control.addEventListener('click',()=>{try{localStorage.setItem(KEY,control.getAttribute('aria-pressed')==='true'?'off':'on')}catch{decor.hidden=!decor.hidden;return}render()});
    window.addEventListener('storage',render);document.addEventListener('visibilitychange',render);setInterval(render,60000);render();
  }
  window.YumeSeasonal={seasonFor};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
