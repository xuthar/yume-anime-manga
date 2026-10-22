/* Dated listings only: no client-side recurrence or changes to personal progress. */
(() => {
  'use strict';
  const zone='Europe/Rome', fmt=new Intl.DateTimeFormat('sv-SE',{timeZone:zone,year:'numeric',month:'2-digit',day:'2-digit'});
  const dayKey=(date=new Date())=>fmt.format(date);
  const addDays=(key,n)=>{const d=new Date(key+'T12:00:00Z');d.setUTCDate(d.getUTCDate()+n);return d.toISOString().slice(0,10)};
  const monday=key=>addDays(key,-((new Date(key+'T12:00:00Z').getUTCDay()+6)%7));
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const sourceUrl=s=>{try{const u=new URL(s);return u.protocol==='https:'&&u.hostname==='www.animeclick.it'?u.href:''}catch{return ''}};
  function selected(events,items,scope,platform,choices={}) {
    return events.filter(e=>{
      const x=items.find(x=>x.id===e.itemId);
      const follows=x&&(x.status==='In corso'||choices[x.id]==='watch'||choices['anime-'+x.malId]==='watch');
      return (scope==='all'||scope==='catalog'&&x||scope==='following'&&follows)
        &&(platform==='all'||e.platform===platform);
    });
  }
  async function init(items,openDetail){
    const root=document.getElementById('episode-calendar');if(!root)return;
    const status=root.querySelector('[data-calendar-status]'),grid=root.querySelector('[data-calendar-grid]'),weekLabel=root.querySelector('[data-calendar-week]');
    const scope=root.querySelector('[data-calendar-scope]'),platform=root.querySelector('[data-calendar-platform]');
    let week=monday(dayKey()),data,followCurrent=true;
    function draw(){
      let choices={};try{choices=JSON.parse(localStorage.getItem('yume-season-choices')||'{}')||{}}catch{}
      const end=addDays(week,6),today=dayKey();root.querySelector('[data-calendar-date]').value=week;
      weekLabel.textContent=new Date(week+'T12:00Z').toLocaleDateString('it-IT',{day:'numeric',month:'long'})+' – '+new Date(end+'T12:00Z').toLocaleDateString('it-IT',{day:'numeric',month:'long',year:'numeric'});
      const events=selected(data.events,items,scope.value,platform.value,choices).filter(e=>e.date>=week&&e.date<=end);
      const stale=Date.now()-Date.parse(data.updatedAt)>48*60*60*1000;
      status.textContent=(stale?'Aggiornamento in ritardo · ':'')+events.length+' uscite in questa settimana · Ultimo controllo: '+new Date(data.updatedAt).toLocaleString('it-IT',{timeZone:zone,dateStyle:'short',timeStyle:'short'})+'. Orari italiani, modificabili dalle piattaforme.';
      grid.innerHTML=Array.from({length:7},(_,i)=>{
        const date=addDays(week,i),daily=events.filter(e=>e.date===date);
        return `<article class="calendar-day ${date===today?'is-today':''}"><h3>${esc(new Date(date+'T12:00Z').toLocaleDateString('it-IT',{weekday:'long'}))} <span>${Number(date.slice(-2))}${date===today?' · oggi':''}</span></h3>${daily.length?daily.map(e=>`<div class="calendar-episode"><time datetime="${esc(e.start)}">${esc(e.time)}</time><h4>${esc(e.title)}</h4><p>Episodio ${esc(e.episode||'non indicato')} · ${esc(e.platform)}</p><div>${e.itemId?`<button type="button" data-calendar-item="${esc(e.itemId)}">Apri scheda ↗</button>`:''} <a href="${esc(sourceUrl(e.sourceUrl))}" target="_blank" rel="noopener noreferrer">Fonte e dettagli ↗</a></div></div>`).join(''):`<p class="calendar-empty">${date<data.coverageStart||date>data.coverageEnd?'Date non ancora coperte dalla fonte.':'Nessuna uscita documentata per i filtri scelti.'}</p>`}</article>`;
      }).join('');
      root.querySelector('[data-calendar-prev]').disabled=week<=monday(data.events.reduce((min,e)=>e.date<min?e.date:min,today));
      root.querySelector('[data-calendar-next]').disabled=week>=monday(data.coverageEnd>today?data.coverageEnd:today);
    }
    try{
      const response=await fetch('data/episode-calendar.json',{cache:'no-store'});if(!response.ok)throw Error();data=await response.json();if(!Array.isArray(data.events)||!data.updatedAt)throw Error();
      [...new Set(data.events.map(e=>e.platform))].sort().forEach(p=>{const option=document.createElement('option');option.value=p;option.textContent=p;platform.append(option)});
      scope.addEventListener('change',draw);platform.addEventListener('change',draw);
      root.querySelector('[data-calendar-prev]').addEventListener('click',()=>{followCurrent=false;week=addDays(week,-7);draw()});
      root.querySelector('[data-calendar-next]').addEventListener('click',()=>{followCurrent=false;week=addDays(week,7);draw()});
      root.querySelector('[data-calendar-date]').addEventListener('change',e=>{if(/^\d{4}-\d{2}-\d{2}$/.test(e.target.value)){followCurrent=false;week=monday(e.target.value);draw()}});
      root.querySelector('[data-calendar-today]').addEventListener('click',()=>{followCurrent=true;week=monday(dayKey());draw()});
      grid.addEventListener('click',e=>{const b=e.target.closest('[data-calendar-item]');if(b){const item=items.find(x=>x.id===b.dataset.calendarItem);if(item)openDetail(item)}});
      async function refresh(){
        if(document.hidden)return;
        try{const r=await fetch('data/episode-calendar.json',{cache:'no-store'});if(!r.ok)throw Error();const latest=await r.json();if(!Array.isArray(latest.events)||!latest.updatedAt)throw Error();data=latest;
          const currentPlatform=platform.value;platform.replaceChildren();const all=document.createElement('option');all.value='all';all.textContent='Tutte le piattaforme';platform.append(all);
          [...new Set(data.events.map(e=>e.platform))].sort().forEach(p=>{const o=document.createElement('option');o.value=p;o.textContent=p;platform.append(o)});platform.value=[...platform.options].some(o=>o.value===currentPlatform)?currentPlatform:'all';
        }catch{/* Keep the last valid data and its visible age. */}
        if(followCurrent)week=monday(dayKey());draw();
      }
      window.addEventListener('storage',draw);document.addEventListener('visibilitychange',refresh);setInterval(refresh,15*60*1000);
      draw();
    }catch{status.textContent='Calendario non disponibile. Ricarica la pagina oppure consulta il calendario della fonte.';grid.innerHTML=''}
  }
  window.YumeCalendar={init,dayKey,addDays,monday,selected};
})();
