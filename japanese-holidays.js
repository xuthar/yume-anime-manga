/* Yume · Piccole festività sotto gli orologi nella sola home.
   Fuso orario Asia/Tokyo. Regole: Cabinet Office Japan, National Holidays Act.
   2026/2027 riscontrati su https://www8.cao.go.jp/chosei/shukujitsu/gaiyou.html
   Dal 2028 gli equinozi sono calcolati astronomicamente in modo indicativo:
   la data ufficiale viene pubblicata annualmente dalla NAOJ. */
(()=>{
 'use strict';
 const tokyo=new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Tokyo',year:'numeric',month:'2-digit',day:'2-digit'});
 const cache=new Map(),pad=n=>String(n).padStart(2,'0'),key=(y,m,d)=>y+'-'+pad(m)+'-'+pad(d);
 const utc=(y,m,d)=>new Date(Date.UTC(y,m-1,d)),iso=d=>d.toISOString().slice(0,10);
 function weekday(y,m,d){return utc(y,m,d).getUTCDay()}
 function monday(y,m,index){return 1+((8-weekday(y,m,1))%7)+7*(index-1)}
 function equinox(y,season){
   if(season==='spring')return y===2026?20:y===2027?21:Math.floor(20.8431+0.242194*(y-1980)-Math.floor((y-1980)/4));
   return y===2026||y===2027?23:Math.floor(23.2488+0.242194*(y-1980)-Math.floor((y-1980)/4));
 }
 function calendar(y){
   if(cache.has(y))return cache.get(y);
   const days=new Map();cache.set(y,days);
   if(y<2020||y>2099)return days;
   const national=new Set();
   const add=(m,d,it,ja)=>{
     const k=key(y,m,d);national.add(k);days.set(k,{it,ja,type:'national'});
   };
   [
     [1,1,'Capodanno','元日'],
     [2,11,'Giornata della fondazione nazionale','建国記念の日'],
     [2,23,"Compleanno dell’Imperatore",'天皇誕生日'],
     [4,29,'Giornata Shōwa','昭和の日'],
     [5,3,'Giornata della Costituzione','憲法記念日'],
     [5,4,'Giornata del verde','みどりの日'],
     [5,5,'Giornata dei bambini','こどもの日'],
     [8,11,'Giornata della montagna','山の日'],
     [11,3,'Giornata della cultura','文化の日'],
     [11,23,'Ringraziamento per il lavoro','勤労感謝の日']
   ].forEach(([m,d,it,ja])=>add(m,d,it,ja));
   add(1,monday(y,1,2),'Giornata della maggiore età','成人の日');
   add(3,equinox(y,'spring'),'Equinozio di primavera','春分の日');
   add(7,monday(y,7,3),'Giornata del mare','海の日');
   add(9,monday(y,9,3),'Giornata del rispetto per gli anziani','敬老の日');
   add(9,equinox(y,'autumn'),'Equinozio d’autunno','秋分の日');
   add(10,monday(y,10,2),'Giornata dello sport','スポーツの日');
   // Festa nazionale intermedia: giorno tra due festività nazionali originarie.
   for(let date=utc(y,1,2);date.getUTCFullYear()===y;date.setUTCDate(date.getUTCDate()+1)){
     const k=iso(date);if(national.has(k))continue;
     const prev=new Date(date),next=new Date(date);
     prev.setUTCDate(prev.getUTCDate()-1);next.setUTCDate(next.getUTCDate()+1);
     if(national.has(iso(prev))&&national.has(iso(next))){
       days.set(k,{it:'Festa nazionale intermedia',ja:'国民の休日',type:'citizen'});
     }
   }
   // Se una festività nazionale cade di domenica, il primo giorno successivo
   // non già festivo diventa giorno sostitutivo (es.: 6 maggio 2026).
   for(const k of national){
     const date=new Date(k+'T00:00:00Z');if(date.getUTCDay()!==0)continue;
     date.setUTCDate(date.getUTCDate()+1);
     while(days.has(iso(date)))date.setUTCDate(date.getUTCDate()+1);
     days.set(iso(date),{it:'Giorno festivo sostitutivo',ja:'振替休日',type:'substitute'});
   }
   return days;
 }
 const traditions=new Map([
  ['03-03',{it:'Hinamatsuri · Festa delle bambine',ja:'ひな祭り',type:'tradition'}],
  ['07-07',{it:'Tanabata · Festa delle stelle',ja:'七夕',type:'tradition'}],
  ['11-15',{it:'Shichi-Go-San · Festa dei bambini',ja:'七五三',type:'tradition'}]
 ]);
 function getForDate(year,month,day){
   const today=key(year,month,day);
   return calendar(year).get(today)||traditions.get(today.slice(5))||null;
 }
 // Esposto per le verifiche del calendario e per futuri aggiornamenti.
 if(typeof window!=='undefined')window.YumeJapaneseHolidays=Object.freeze({getForDate});
 function init(){
   const host=document.querySelector('.home-page .world-clocks');
   if(!host)return;
   const banner=document.createElement('div');banner.className='jp-holiday-today';
   banner.hidden=true;banner.setAttribute('role','status');banner.setAttribute('aria-live','polite');
   banner.setAttribute('aria-label','Festività e ricorrenze in Giappone');
   host.append(banner);
   let lastDay='';
   function update(){
     const p=Object.fromEntries(tokyo.formatToParts(new Date()).map(x=>[x.type,x.value]));
     const y=Number(p.year),m=Number(p.month),d=Number(p.day),today=key(y,m,d);
     if(today===lastDay)return;lastDay=today;
     const holiday=getForDate(y,m,d);
     banner.replaceChildren();
     if(!holiday){banner.hidden=true;return;}
     banner.dataset.type=holiday.type;
     const label=document.createElement('span');label.className='jp-holiday-label';
     label.textContent=holiday.type==='tradition'?'🌸 Tradizione in Giappone':'🇯🇵 Oggi in Giappone';
     const japanese=document.createElement('strong');japanese.lang='ja';
     japanese.className='jp-holiday-japanese';japanese.textContent=holiday.ja;
     const italian=document.createElement('span');italian.className='jp-holiday-italian';
     italian.textContent='· '+holiday.it;
     banner.append(label,japanese,italian);banner.hidden=false;
     banner.title=(holiday.type==='tradition'?'Ricorrenza tradizionale, non festività nazionale':'Festività pubblica o giorno festivo in Giappone')+' · '+today;
   }
   update();
   let timer=setInterval(update,60000);
   document.addEventListener('visibilitychange',()=>{if(!document.hidden)update()});
   window.addEventListener('pageshow',update);
   window.addEventListener('pagehide',()=>{clearInterval(timer);timer=null},{once:true});
 }
 if(typeof document==='undefined')return;
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);
 else init();
})();
