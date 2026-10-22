/* Two local-time views of the same instant; IANA zones handle Italian DST. */
(() => {
  'use strict';
  const zones=[{zone:'Europe/Rome',name:'Italia',japanese:'イタリア',seal:'伊',className:'italy'},{zone:'Asia/Tokyo',name:'Giappone',japanese:'日本',seal:'日',className:'japan'}];
  function init(){
    const container=document.querySelector('.world-clocks');if(!container)return;
    const ticks=Array.from({length:12},(_,i)=>`<line x1="24" y1="4" x2="24" y2="${i%3===0?9:6}" transform="rotate(${i*30} 24 24)"/>`).join('');
    const clocks=zones.map(z=>{
      const card=document.createElement('div');card.className='world-clock clock-'+z.className;
      card.innerHTML=`<span class="clock-seal" lang="ja" aria-hidden="true">${z.seal}</span><svg class="clock-dial" viewBox="0 0 48 48" aria-hidden="true" focusable="false"><circle class="clock-ring" cx="24" cy="24" r="22"/><g class="clock-ticks">${ticks}</g><line class="clock-hand clock-hour" x1="24" y1="24" x2="24" y2="13"/><line class="clock-hand clock-minute" x1="24" y1="24" x2="24" y2="8"/><line class="clock-hand clock-second" x1="24" y1="28" x2="24" y2="6"/><circle class="clock-pin" cx="24" cy="24" r="2"/></svg><div class="clock-reading"><div class="clock-place"><span>${z.name}</span><span lang="ja">${z.japanese}</span></div><time class="clock-time"></time><span class="clock-date"></span></div>`;
      container.append(card);
      return {...z,card,time:card.querySelector('time'),date:card.querySelector('.clock-date'),hour:card.querySelector('.clock-hour'),minute:card.querySelector('.clock-minute'),second:card.querySelector('.clock-second'),formatter:new Intl.DateTimeFormat('en-GB',{timeZone:z.zone,hourCycle:'h23',hour:'2-digit',minute:'2-digit',second:'2-digit'}),dateFormatter:new Intl.DateTimeFormat('it-IT',{timeZone:z.zone,weekday:'short',day:'numeric',month:'short'}),labelFormatter:new Intl.DateTimeFormat('it-IT',{timeZone:z.zone,dateStyle:'full',timeStyle:'long'})};
    });
    function update(){
      const now=new Date();
      clocks.forEach(c=>{
        const parts=Object.fromEntries(c.formatter.formatToParts(now).map(p=>[p.type,p.value]));
        const h=Number(parts.hour),m=Number(parts.minute),s=Number(parts.second);
        c.time.textContent=`${parts.hour}:${parts.minute}:${parts.second}`;c.time.dateTime=now.toISOString();c.time.setAttribute('aria-label',c.name+': '+c.labelFormatter.format(now));c.date.textContent=c.dateFormatter.format(now);
        c.hour.setAttribute('transform',`rotate(${(h%12)*30+m/2} 24 24)`);c.minute.setAttribute('transform',`rotate(${m*6+s/10} 24 24)`);c.second.setAttribute('transform',`rotate(${s*6} 24 24)`);
      });
    }
    let timer;
    function resume(){clearInterval(timer);update();if(!document.hidden)timer=setInterval(update,1000)}
    document.addEventListener('visibilitychange',resume);window.addEventListener('pageshow',resume);resume();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
