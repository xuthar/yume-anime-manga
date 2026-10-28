/* Yume · two Japan atlases: food with recipe cards, travel with map links. */
(()=>{'use strict';
 const type=document.body.dataset.atlas,food=type==='food';
 const data=food?window.YumeJapaneseFood:window.YumeJapanDestinations;
 const grid=document.getElementById('atlas-grid');
 if(!grid||!Array.isArray(data)||!data.length)return;
 const search=document.getElementById('atlas-search'),sel=document.getElementById('atlas-area'),status=document.getElementById('atlas-count'),noResults=document.getElementById('atlas-empty'),tabs=document.getElementById('atlas-pills');
 const categoryKey=food?'category':'kind',areaKey=food?'region':'region';
 const collection=new Set();
 const favKey='yume-japan-visit-wishlist-v1';
 if(!food)try{const saved=JSON.parse(localStorage.getItem(favKey)||'[]');if(Array.isArray(saved))saved.forEach(s=>collection.add(s))}catch(e){}
 const node=(tag,cls,content)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(content!==undefined)e.textContent=content;return e};
 const anchor=(t,url,cls)=>{const a=node('a',cls,t);a.href=url;a.target='_blank';a.rel='noopener noreferrer';return a};
 const normal=s=>String(s??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('it');
 const photo=(p,parent,index)=>{
   const media=node('div','atlas-photo'),fallback=node('span','atlas-photo-placeholder','🗾 Fotografia del '+(food?'piatto':'luogo')+' in caricamento…');
   media.append(fallback,node('span','atlas-photo-badge',String(index+1).padStart(2,'0')));
   const credit=anchor('Foto: Wikimedia Commons · licenza','https://commons.wikimedia.org/','atlas-credit');credit.hidden=true;
   parent.__credit=credit;
   window.YumePhoto?.observe(media,{wiki:p.wiki,query:p.query,alt:'Fotografia di '+p.name,hero:false},credit);
   return media;
 };
 const cards=[];
 data.forEach((p,i)=>{
   const card=node('article','atlas-card');card.id=p.id;
   card.dataset.category=p[categoryKey];card.dataset.area=p[areaKey];
   card.dataset.search=normal(food?[p.name,p.jp,p.category,p.region,p.desc,p.ingredients.join(' ')].join(' '):[p.name,p.jp,p.region,p.pref,p.kind,p.desc,p.experience,p.season].join(' '));
   const media=photo(p,card,i),body=node('div','atlas-card-content'),tags=node('div','atlas-cats');
   tags.append(node('span','',food?p.category:p.kind),node('span','',food?p.region:p.pref));
   body.append(tags,node('h2','',p.name),node('p','atlas-jp',p.jp),node('p','atlas-desc',p.desc));
   if(food){
     const chips=node('div','atlas-chips');chips.append(node('span','','⏱ '+p.time),node('span','','🍚 Per '+p.serves+' persone'));
     body.append(chips);
     const det=node('details','atlas-recipe'),summary=node('summary','','Apri ricetta · ingredienti e preparazione');
     const h3=node('h3','','Ingredienti'),list=node('ul');for(const x of p.ingredients)list.append(node('li','',x));
     const h32=node('h3','','Preparazione'),steps=node('ol');for(const x of p.steps)steps.append(node('li','',x));
     det.append(summary,h3,list,h32,steps);
     if(p.tip)det.append(node('p','atlas-tip','Consiglio · '+p.tip));
     body.append(det);
   }else{
     body.append(node('h3','','Perché visitarlo'),node('p','atlas-detail-text',p.experience));
     const chips=node('div','atlas-chips');chips.append(node('span','','🌸 '+p.season));body.append(chips);
     if(p.note)body.append(node('p','atlas-memo',p.note));
     const action=node('button','atlas-reset','♡ Salva per un viaggio');action.type='button';
     function paint(){const saved=collection.has(p.id);action.textContent=saved?'♥ Salvato per il viaggio':'♡ Salva per un viaggio';action.setAttribute('aria-pressed',String(saved))}
     paint();action.addEventListener('click',()=>{
       if(collection.has(p.id))collection.delete(p.id);else collection.add(p.id);
       try{localStorage.setItem(favKey,JSON.stringify([...collection]))}catch(e){}
       paint();if(selected==='favorites')render();
     });body.append(action);
   }
   const actions=node('div','atlas-links');
   if(!food)actions.append(anchor('📍 Mappa', 'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(p.name+', '+p.pref+', Japan')));
   if(p.link)actions.append(anchor('↗ Fonte turistica',p.link));
   else if(food)actions.append(anchor('↗ Piatti e tradizioni','https://www.japan.travel/it/gastronomy/'));
   actions.append(card.__credit);
   body.append(actions);card.append(media,body);grid.append(card);
   cards.push(card);
 });
 // Create an image for the hero independently; it is not tied to an invisible card.
 const hero=document.getElementById('atlas-hero-photo'),heroCredit=document.getElementById('atlas-hero-credit');
 if(hero&&window.YumePhoto){const p=data[0];const im=hero.querySelector('.atlas-photo-placeholder');
 window.YumePhoto.observe(hero,{wiki:food?'Sushi':'Fushimi Inari-taisha',query:food?'sushi maki nigiri Japanese food':'Fushimi Inari Kyoto torii',alt:food?'Sushi giapponese':'Torii del santuario Fushimi Inari',hero:true},heroCredit);}
 const areas=[...new Set(data.map(x=>x[areaKey]))].sort((a,b)=>a.localeCompare(b,'it'));
 for(const a of areas){const option=node('option','',a);option.value=a;sel.append(option)}
 const cats=[...new Set(data.map(x=>x[categoryKey]))].sort((a,b)=>a.localeCompare(b,'it'));

 function makeTab(key,label){
   const b=node('button','',label);b.type='button';b.dataset.filter=key;b.setAttribute('aria-pressed',key==='all'?'true':'false');
   b.addEventListener('click',()=>{selected=key;render()});tabs.append(b);
 }
 makeTab('all','Tutti');
 for(const c of cats)makeTab(c,c);
 if(!food)makeTab('favorites','♥ Da visitare');
 let selected='all';
 function render(){
   const q=normal(search.value.trim());let visible=0;
   for(const card of cards){
     const good=(selected==='all'||(selected==='favorites'?collection.has(card.id):card.dataset.category===selected))
      &&(sel.value==='all'||card.dataset.area===sel.value)&&(!q||card.dataset.search.includes(q));
     card.hidden=!good;if(good)visible++;
   }
   status.textContent=visible+' di '+data.length+(food?' piatti e ricette':' destinazioni');
   noResults.hidden=visible!==0;
   tabs.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.filter===selected)));
 }
 search.addEventListener('input',render);sel.addEventListener('change',render);
 document.getElementById('atlas-reset').addEventListener('click',()=>{search.value='';sel.value='all';selected='all';render();search.focus()});
 document.getElementById('atlas-total').textContent=String(data.length);
 document.getElementById('atlas-areas').textContent=String(areas.length);
 document.getElementById('atlas-categories').textContent=String(cats.length);
 render();
})();