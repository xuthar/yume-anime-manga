/* Anime Pilgrimage: private itinerary on this device. */
(function(){
'use strict';
const make=(tag,txt)=>{const x=document.createElement(tag);if(txt!==undefined)x.textContent=String(txt);return x};
const key='yume-trip-stops-v1';
const notesKey='yume-trip-notes-v1';
let order=[],places=[],favorites=new Set(),box=null,notes='';
function save(){try{localStorage.setItem(key,JSON.stringify(order));localStorage.setItem(notesKey,notes)}catch(e){}}
function load(){try{const x=JSON.parse(localStorage.getItem(key)||'[]');if(Array.isArray(x))order=[...new Set(x)].filter(id=>places.some(p=>p.id===id));notes=localStorage.getItem(notesKey)||''}catch(e){}}
function refresh(){
 if(!box)return;
 const list=box.querySelector('.y3-trip-list');list.replaceChildren();
 order.forEach((id,i)=>{
  const p=places.find(x=>x.id===id);if(!p)return;
  const li=make('li'),label=make('span',(i+1)+'. '+p.place+' · '+p.pref),controls=make('div');controls.className='y3-trip-controls';
  function control(symbol,disabled,action){const b=make('button',symbol);b.type='button';b.disabled=disabled;b.onclick=()=>{action();save();refresh()};return b}
  controls.append(
   control('↑',i===0,()=>{const x=order[i-1];order[i-1]=order[i];order[i]=x}),
   control('↓',i===order.length-1,()=>{const x=order[i+1];order[i+1]=order[i];order[i]=x}),
   control('×',false,()=>{order=order.filter(x=>x!==id)})
  );
  li.append(label,controls);list.append(li)
 });
 if(!order.length)list.append(make('li','Non hai ancora scelto tappe per il viaggio.'));
 box.querySelector('.y3-trip-counter').textContent=order.length+' tappe · ordine personalizzabile';
 document.querySelectorAll('[data-yume-trip]').forEach(button=>{const found=order.includes(button.dataset.yumeTrip);button.textContent=found?'✓ Aggiunto':'+ Itinerario';button.disabled=found})
}
function exportTrip(){
 const lines=['Yume 3.0 · Anime Pilgrimage','Itinerario manuale: nessun percorso o tempo stimato',''];
 order.forEach((id,i)=>{const p=places.find(x=>x.id===id);if(p)lines.push((i+1)+'. '+p.place+' — '+p.pref+' · '+p.work)});
 lines.push('','Note:',notes,'','Verificare sempre trasporti, accessibilità e rispetto dei residenti.');
 const url=URL.createObjectURL(new Blob([lines.join('\n')],{type:'text/plain;charset=utf-8'})),a=make('a');a.href=url;a.download='yume-itinerario.txt';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000)
}
function init(host,all,fav){
 places=all;favorites=fav;load();
 box=make('details');box.className='y3-extra-box y3-trip';box.open=true;
 box.append(make('summary','🗾 Il mio itinerario anime'));
 box.append(make('p','Aggiungi tappe dalle schede, riordinale ed esporta il piano. Tutto rimane nel browser.'));
 const actions=make('div');actions.className='y3-extra-links';
 const b1=make('button','Aggiungi i luoghi preferiti'),b2=make('button','Esporta itinerario'),b3=make('button','Svuota itinerario');
 [b1,b2,b3].forEach(b=>{b.type='button';b.className='y3-extra-button'});
 b1.onclick=()=>{favorites.forEach(id=>{if(places.some(p=>p.id===id)&&!order.includes(id))order.push(id)});save();refresh()};
 b2.onclick=exportTrip;b3.onclick=()=>{order=[];save();refresh()};
 actions.append(b1,b2,b3);box.append(actions);
 const count=make('p');count.className='y3-trip-counter';box.append(count);
 const list=make('ol');list.className='y3-trip-list';box.append(list);
 const note=make('textarea');note.className='y3-trip-notes';note.rows=3;note.maxLength=5000;note.value=notes;note.placeholder='Appunti privati del tuo viaggio';note.setAttribute('aria-label','Appunti itinerario');note.oninput=()=>{notes=note.value;save()};box.append(note);
 box.append(make('p','Nessuna stima dei tempi di percorrenza; verifica i trasporti prima della partenza.'));
 const map=host.querySelector('.y3-maplayout');if(map)map.before(box);else host.append(box);refresh()
}
function addButton(parent,place){const b=make('button');b.type='button';b.className='y3-trip-add';b.dataset.yumeTrip=place.id;b.onclick=()=>{if(!order.includes(place.id)){order.push(place.id);save();refresh()}};parent.append(b);const found=order.includes(place.id);b.textContent=found?'✓ Aggiunto':'+ Itinerario';b.disabled=found}
window.Yume3Trip={init,addButton,refresh};
})();