/* Yume · Luoghi anime/manga. Photographs are real places, not anime frames. */
(()=>{'use strict';
 const spots=window.YumeAnimePlaces||[];
 const grid=document.getElementById('jp-gallery'),search=document.getElementById('jp-search'),region=document.getElementById('jp-region'),work=document.getElementById('jp-work'),count=document.getElementById('jp-counter'),empty=document.getElementById('jp-empty'),reset=document.getElementById('jp-reset');
 if(!grid||!Array.isArray(spots)||!spots.length)return;
 const types={scena:'Scena riconoscibile',ambientazione:'Ambientazione reale',ispirazione:'Modello e ispirazione',associazione:'Associazione culturale'};
 const clean=x=>String(x??'').toLocaleLowerCase('it').normalize('NFD').replace(/[\u0300-\u036f]/g,'');
 const make=(tag,cls,t)=>{const el=document.createElement(tag);if(cls)el.className=cls;if(t!==undefined)el.textContent=t;return el};
 const link=(label,href,klass)=>{const a=make('a',klass,label);a.href=href;a.target='_blank';a.rel='noopener noreferrer';return a};
 const commonsPath=file=>encodeURIComponent(file.replace(/ /g,'_'));
 const maps=p=>'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(p.place+', '+p.pref+', Japan');
 const cards=[];
 spots.forEach((p,i)=>{
   const card=make('article','jp-place');card.id='luogo-'+p.id;
   card.dataset.search=clean([p.place,p.pref,p.region,p.work,p.relation,p.history,p.anime].join(' '));
   card.dataset.region=p.region;card.dataset.relation=p.relation;card.dataset.work=p.work;
   const media=make('div','jp-place-media'),im=make('img');im.alt='Fotografia reale di '+p.place+', '+p.pref;im.loading=i<3?'eager':'lazy';im.decoding='async';
   const path='https://commons.wikimedia.org/wiki/Special:FilePath/'+commonsPath(p.file);
   im.src=path+'?width=760';
   let fallbackStage=0;
   im.addEventListener('error',()=>{
     if(fallbackStage===0){fallbackStage=1;im.src=path;return;}
     im.remove();media.prepend(make('span','jp-placeholder','🗾 Fotografia non disponibile'));
   });
   if(i<3)im.fetchPriority='high';
   media.append(im,make('span','jp-number',String(i+1).padStart(2,'0')));
   const body=make('div','jp-place-body'),tags=make('div','jp-place-tags');
   tags.append(make('span','',p.region),make('span','jp-relation',types[p.relation]||p.relation));
   const title=make('h2','',p.place),show=make('p','jp-work','✦ '+p.work);
   const section1=make('div','jp-story');section1.append(make('h3','','Il luogo reale'),make('p','',p.history));
   const section2=make('div','jp-story');section2.append(make('h3','','Il legame con l’anime / manga'),make('p','jp-literary',p.anime));
   body.append(tags,title,show,section1,section2);
   if(p.note)body.append(make('p','jp-note','Da sapere · '+p.note));
   const actions=make('div','jp-place-links');
   actions.append(link('📍 Apri sulla mappa',maps(p),'jp-map-link'),link('↗ Approfondimento',p.ref,'jp-reference-link'));
   body.append(actions);
   const photo=make('p','jp-image-credit','Foto reale: '),credit=link('Wikimedia Commons · autore e licenza','https://commons.wikimedia.org/wiki/File:'+commonsPath(p.file));
   photo.append(credit);body.append(photo);
   card.append(media,body);grid.append(card);cards.push(card);
 });
 const regions=[...new Set(spots.map(x=>x.region))].sort((a,b)=>a.localeCompare(b,'it'));
 regions.forEach(r=>{const option=make('option','',r);option.value=r;region.append(option)});
 const works=[...new Set(spots.map(x=>x.work))].sort((a,b)=>a.localeCompare(b,'it'));
 works.forEach(w=>{const opt=make('option','',w);opt.value=w;work.append(opt)});
 let selected='all';
 function render(){
   const q=clean(search.value.trim());let visible=0;
   for(const card of cards){
     const okay=(selected==='all'||card.dataset.relation===selected)&&(region.value==='all'||card.dataset.region===region.value)&&(work.value==='all'||card.dataset.work===work.value)&&(!q||card.dataset.search.includes(q));
     card.hidden=!okay;if(okay)visible++;
   }
   count.textContent=visible+' di '+spots.length+' luoghi';
   empty.hidden=visible!==0;
   document.querySelectorAll('[data-jp-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.jpFilter===selected)));
 }
 for(const b of document.querySelectorAll('[data-jp-filter]'))b.addEventListener('click',()=>{selected=b.dataset.jpFilter;render()});
 search.addEventListener('input',render);region.addEventListener('change',render);work.addEventListener('change',render);
 reset.addEventListener('click',()=>{selected='all';search.value='';region.value='all';work.value='all';render();search.focus()});
 document.getElementById('jp-total').textContent=String(spots.length);
 document.getElementById('jp-region-count').textContent=String(regions.length);
 document.getElementById('jp-work-count').textContent=String(works.length);
 render();
})();
