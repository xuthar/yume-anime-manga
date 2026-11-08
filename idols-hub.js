/* Yume Idols · one hub for all idol catalogues.
 * Only the Idols hub exposes category navigation; legacy URLs remain valid.
 * Adult/JAV sections retain their pre-existing acknowledgement dialogs.
 */
(()=>{'use strict';
 const tabs=[...document.querySelectorAll('[data-idols-hub-tab]')];
 const japan=document.getElementById('idols-hub-japan');
 const catalog=document.getElementById('idols-hub-embedded');
 const young=document.getElementById('idols-hub-young');
 const viewer=document.getElementById('idols-hub-frame');
 const title=document.getElementById('idols-hub-current-title');
 const description=document.getElementById('idols-hub-current-description');
 const status=document.getElementById('idols-hub-frame-status');
 if(!tabs.length||!japan||!catalog||!viewer||!young)return;
 const sections={
  japan:{title:'Idols del Giappone',desc:'Musica, moda, cinema, seiyū, creator e professioniste dello spettacolo.'},
  asia:{title:'Asia Idols',desc:'Corea, Cina, Thailandia, Vietnam, India, Filippine e altre scene asiatiche.',url:'asia-idols.html?embedded=1#asia-countries'},
  sport:{title:'Sport Idols',desc:'Atlete, discipline, carriere e traguardi dello sport femminile giapponese.',url:'sport-idols.html?embedded=1'},
  young:{title:'Young Stars',desc:'Talenti di 10–19 anni, solo informazioni professionali e fonti pubbliche.',url:'young-stars.html?embedded=1'}
 };
 const editorialCategories={cosplay:'cosplay',gravure:'gravure',jav:'jav',adult:'adult',fashion:'fashion',creators:'creators',music:'music',vtuber:'vtuber',groups:'groups'};
 const spotlightCategories={jpopwiki:'jpop-wiki-rosters'};
 const normalize=(value)=>String(value||'').replace(/^#idol-/,'');
 const known=new Set([...Object.keys(sections),...Object.keys(editorialCategories),...Object.keys(spotlightCategories)]);
 let current='';
 function openSection(value,{record=true,scroll=false}={}){
  const key=known.has(value)?value:'japan';
  const isPage=!!sections[key],page=isPage?key:'japan',detail=sections[page];
  current=key;
  for(const tab of tabs){
   const selected=tab.dataset.idolsHubTab===key;
   tab.setAttribute('aria-selected',String(selected));
   tab.tabIndex=selected?0:-1;
   tab.classList.toggle('is-current',selected);
  }
  japan.hidden=page!=='japan';
  young.hidden=page!=='young';
  catalog.hidden=page==='japan'||page==='young';
  title.textContent=isPage?detail.title:({
   cosplay:'Cosplay & creator',gravure:'Gravure',jav:'JAV · 18+',adult:'Adult · 18+',
   fashion:'Moda & modelle',creators:'Creator & influencer',music:'Idol musicali',vtuber:'VTuber',groups:'Gruppi idol',jpopwiki:'Nuovi gruppi · Japanese Music Wiki'
  })[key]||detail.title;
  description.textContent=isPage?detail.desc:key==='jpopwiki'?'Gruppi emergenti 2024–2026, roster, nomi delle componenti e fonti consultabili.':'Esplora questa categoria nell’archivio giapponese. I contenuti per adulti rimangono protetti da conferma 18+.';
  if(page==='young'){
   // Native inline Young Stars: no nested iframe, secondary scroll area or mini-site chrome.
   if(scroll)document.getElementById('idols-hub-young')?.scrollIntoView({behavior:'smooth',block:'start'});
  }else if(page!=='japan'){
   const url=sections[page].url;
   if(viewer.dataset.loadedSection!==page){
    viewer.src=url;viewer.dataset.loadedSection=page;
    status.textContent='Caricamento '+detail.title+'…';
   }
  }else if(spotlightCategories[key]){
   document.getElementById(spotlightCategories[key])?.scrollIntoView({behavior:scroll?'smooth':'instant',block:'start'});
  }else if(!isPage){
   // The existing discovery UI handles JAV/Adult age confirmation itself.
   const button=document.querySelector('[data-discovery-category="'+editorialCategories[key]+'"]');
   if(button){
    button.click();
    document.getElementById('idols-discover')?.scrollIntoView({behavior:scroll?'smooth':'instant',block:'start'});
   }
  }
  if(record&&location.hash!=='#idol-'+key)history.replaceState(null,'',location.pathname+location.search+'#idol-'+key);
  if(scroll&&isPage)document.getElementById('idols-hub')?.scrollIntoView({behavior:'smooth',block:'start'});
 }
 tabs.forEach((tab,i)=>{
  tab.addEventListener('click',()=>openSection(tab.dataset.idolsHubTab,{scroll:true}));
  tab.addEventListener('keydown',event=>{
   if(!['ArrowRight','ArrowLeft','Home','End'].includes(event.key))return;
   event.preventDefault();let n=i;
   if(event.key==='Home')n=0;
   else if(event.key==='End')n=tabs.length-1;
   else n=(i+(event.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;
   tabs[n].focus();openSection(tabs[n].dataset.idolsHubTab,{scroll:false});
  });
 });
 window.addEventListener('message',event=>{
  if(event.origin!==location.origin||event.source!==viewer.contentWindow)return;
  const msg=event.data;
  if(msg?.type==='yume-idols-category'&&known.has(msg.key))openSection(msg.key,{scroll:true});
 });
 viewer.addEventListener('load',()=>{status.textContent='Sfoglia il catalogo qui sotto, senza uscire da Idols.'});
 window.addEventListener('hashchange',()=>{
  const key=normalize(location.hash);
  if(known.has(key)&&key!==current)openSection(key,{record:false,scroll:false});
 });
 const route=normalize(location.hash);
 const legacyMap={'#idols-discover':'japan','#idols-directory':'japan','#young-stars':'young','#asia-idols':'asia','#sport-idols':'sport'};
 openSection(known.has(route)?route:(legacyMap[location.hash]||'japan'),{record:false});
})();
