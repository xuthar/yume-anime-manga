/* Keep the weekly calendar independent of the homepage catalog layout. */
(() => {
 'use strict';
 async function init(){
  try{
   const response=await fetch('library.json');if(!response.ok)throw Error();const data=await response.json();
   if(!Array.isArray(data.items))throw Error();
   await window.YumeCalendar.init(data.items,item=>{location.href='index.html?anime='+encodeURIComponent(item.id)+'#catalogo'});
  }catch{document.querySelector('[data-calendar-status]').textContent='Calendario non disponibile. Ricarica la pagina oppure consulta il calendario della fonte.'}
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
