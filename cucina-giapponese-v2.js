/* YUME · Cucina giapponese 2.0 · ricettario regionale e atlante ingredienti.
  Script dedicato: non modifica il catalogo dei viaggi. */
(()=>{'use strict';
 const recipes=window.YumeJapaneseFood||[],ingredients=window.YumeJapaneseIngredients||[];
 if(!recipes.length||!ingredients.length)return;
 const get=id=>document.getElementById(id),create=(tag,cls,txt)=>{const x=document.createElement(tag);if(cls)x.className=cls;if(txt!==undefined)x.textContent=txt;return x};
 const normalize=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('it');
 const rGrid=get('atlas-grid'),iGrid=get('food-ingredients-grid'),rQuery=get('atlas-search'),rArea=get('atlas-area'),rTrad=get('food-tradition'),rSort=get('food-sort'),rTabs=get('atlas-pills'),rCount=get('atlas-count'),rEmpty=get('atlas-empty'),rMore=get('food-recipes-more');
 const iQuery=get('food-ingredients-search'),iTabs=get('food-ingredients-tabs'),iSort=get('food-ingredients-sort'),iCount=get('food-ingredients-count'),iEmpty=get('food-ingredients-empty'),iMore=get('food-ingredients-more');
 if(!rGrid||!iGrid||!rQuery||!iQuery)return;
 const regions=['Hokkaidō','Tōhoku','Kantō','Chūbu','Kansai','Chūgoku','Shikoku','Kyūshū','Okinawa'];
 const regionPattern=[
  [/hokkaid|sapporo|hakodate|asahikawa/i,'Hokkaidō'],
  [/tōhoku|tohoku|akita|sendai|miyagi|aomori|iwate|yamagata|fukushima/i,'Tōhoku'],
  [/kantō|kanto|tokyo|edo|chiba|saitama|kanagawa/i,'Kantō'],
  [/chūbu|chubu|nagano|yamanashi|shizuoka|gifu|niigata|toyama|ishikawa|kanazawa|fukui|aichi|nagoya|hida/i,'Chūbu'],
  [/kansai|kyoto|osaka|nara|shiga|hyōgo|hyogo|wakayama/i,'Kansai'],
  [/chūgoku|chugoku|hiroshima|okayama|shimane|tottori|yamaguchi/i,'Chūgoku'],
  [/shikoku|kagawa|tokushima|ehime|kōchi|kochi/i,'Shikoku'],
  [/kyūshū|kyushu|fukuoka|kumamoto|miyazaki|kagoshima|ōita|oita|nagasaki|saga/i,'Kyūshū'],
  [/okinawa|ryūkyū|ryukyu/i,'Okinawa']];
 const areaOf=r=>{
  if(r.area)return r.area;
  const s=r.region||'';
  if(/tutto il giappone/i.test(s))return 'Nazionale';
  const matching=regionPattern.filter(([re])=>re.test(s)).map(x=>x[1]);
  return matching.length>1?'Più regioni':matching[0]||'Nazionale'
 };
 function styleOf(r){
  const n=normalize(r.name);
  if(areaOf(r)==='Okinawa')return 'Cucina Ryūkyū';
  if(/nabe|sukiyaki|oden|shabu/.test(n))return 'Nabemono e pentole';
  if(r.category==='Dolci e bevande')return 'Dolci e wagashi';
  if(r.category==='Fritti e street food')return 'Street food';
  if(/omurice|hambāgu|hambagu|kare raisu|korokke|mentaiko pasta|taco rice/.test(n))return 'Yōshoku e fusion';
  if(r.category==='Noodle e zuppe')return 'Noodle e zuppe';
  if(r.area)return 'Kyōdo ryōri regionali';
  return 'Washoku quotidiano'
 }
 recipes.forEach(r=>{r._area=areaOf(r);r._style=styleOf(r);r._search=normalize([r.name,r.jp,r.desc,r.category,r.area,r.region,r.tradition,r._style,r.ingredients?.join(' '),r.tip].join(' '))});
 ingredients.forEach(i=>{i._search=normalize([i.name,i.jp,i.group,i.desc,i.use,i.tip].join(' '))});
 const distinct=(a)=>[...new Set(a)].sort((x,y)=>x.localeCompare(y,'it'));
 const cats=distinct(recipes.map(x=>x.category)),styles=distinct(recipes.map(x=>x._style)),ingCats=distinct(ingredients.map(x=>x.group));
 const anchor=(text,url,cls)=>{const a=create('a',cls,text);a.href=url;a.target='_blank';a.rel='noopener noreferrer';return a};
 const photo=(parent,obj,idx)=>{
  const media=create('div','atlas-photo'),placeholder=create('span','atlas-photo-placeholder','🇯🇵 Immagine illustrativa in caricamento…');
  media.append(placeholder,create('span','atlas-photo-badge',String(idx+1).padStart(3,'0')));
  const source=anchor('Foto / attribuzione · Wikimedia','https://commons.wikimedia.org/','atlas-credit');
  source.hidden=true;
  if(window.YumePhoto)window.YumePhoto.observe(media,{wiki:obj.wiki,query:obj.query,alt:(obj.group?'Ingrediente: ':'Piatto: ')+obj.name},source);
  else placeholder.textContent='Fotografia non disponibile';
  return {media,source}
 };
 function rCard(r,n){
  const card=create('article','atlas-card atlas-recipe-card');
  card.id='ricetta-'+r.id;
  const {media,source}=photo(card,r,recipes.indexOf(r));
  const body=create('div','atlas-card-content'),tags=create('div','atlas-cats');
  tags.append(create('span','',r._area),create('span','',r.category));
  body.append(tags,create('h2','',r.name),create('p','atlas-jp',r.jp),create('p','atlas-desc',r.desc));
  const chips=create('div','atlas-chips');
  chips.append(create('span','','⏱ '+r.time),create('span','','🍚 2 persone'),create('span','',r._style));
  body.append(chips);
  const detail=create('details','atlas-recipe'),summary=create('summary','','Ingredienti e preparazione');
  detail.append(summary,create('h3','','Ingredienti per 2'));
  const ul=create('ul');(r.ingredients||[]).forEach(x=>ul.append(create('li','',x)));detail.append(ul,create('h3','','Procedimento'));
  const ol=create('ol');(r.steps||[]).forEach(x=>ol.append(create('li','',x)));detail.append(ol);
  if(r.tip)detail.append(create('p','atlas-tip','Da sapere · '+r.tip));
  if(r.originNote)detail.append(create('p','atlas-tip',r.originNote));
  const copy=create('button','food-copy','⧉ Copia ingredienti');copy.type='button';
  copy.addEventListener('click',async()=>{
   const content=r.name+' · Per 2 persone\n'+r.ingredients.map(x=>'• '+x).join('\n');
   try{await navigator.clipboard.writeText(content);copy.textContent='✓ Ingredienti copiati'}
   catch(e){copy.textContent='Copia non disponibile sul browser';}
  });
  detail.append(copy);body.append(detail);
  const links=create('div','atlas-links');links.append(source);
  if(r.source)links.append(anchor('↗ Origini e specialità regionali',r.source));
  else links.append(anchor('↗ Cucina e tradizioni','https://www.maff.go.jp/e/policies/market/k_ryouri/index.html'));
  body.append(links);card.append(media,body);
  return card
 }
 function iCard(item,n){
  const card=create('article','atlas-card food-ingredient-card');card.id='ingrediente-'+item.id;
  const {media,source}=photo(card,item,ingredients.indexOf(item));
  const body=create('div','atlas-card-content'),tags=create('div','atlas-cats');
  tags.append(create('span','',item.group));
  body.append(tags,create('h2','',item.name),create('p','atlas-jp',item.jp),create('p','atlas-desc',item.desc));
  body.append(create('h3','','In cucina'),create('p','atlas-detail-text',item.use));
  if(item.tip)body.append(create('p','atlas-memo','Consiglio · '+item.tip));
  const links=create('div','atlas-links');links.append(source,anchor('↗ Approfondisci',item.source||'https://www.maff.go.jp/e/policies/market/dento_syoku/index.html'));
  body.append(links);card.append(media,body);return card
 }
 let rCategory='all',iCategory='all',rShown=0,iShown=0,rItems=[],iItems=[];
 function rFilter(){
  const q=normalize(rQuery.value.trim());
  let found=recipes.filter(x=>(rCategory==='all'||x.category===rCategory)
    &&(rArea.value==='all'||x._area===rArea.value)
    &&(rTrad.value==='all'||x._style===rTrad.value)
    &&(!q||x._search.includes(q)));
  if(rSort.value==='az')found.sort((a,b)=>a.name.localeCompare(b.name,'it'));
  if(rSort.value==='za')found.sort((a,b)=>b.name.localeCompare(a.name,'it'));
  if(rSort.value==='regional')found.sort((a,b)=>a._area.localeCompare(b._area,'it')||a.name.localeCompare(b.name,'it'));
  return found
 }
 function iFilter(){
  const q=normalize(iQuery.value.trim());
  let found=ingredients.filter(x=>(iCategory==='all'||x.group===iCategory)&&(!q||x._search.includes(q)));
  if(iSort.value==='az')found.sort((a,b)=>a.name.localeCompare(b.name,'it'));
  if(iSort.value==='za')found.sort((a,b)=>b.name.localeCompare(a.name,'it'));
  return found
 }
 function rLoad(){
  const portion=rItems.slice(rShown,rShown+12),frag=document.createDocumentFragment();
  for(const r of portion)frag.append(rCard(r));
  rGrid.append(frag);rShown+=portion.length;
  rMore.hidden=rShown>=rItems.length;
  rMore.textContent='Mostra altre ricette ('+(rItems.length-rShown)+' restanti) ↓';
  rCount.textContent=rShown+' mostrate · '+rItems.length+' trovate · '+recipes.length+' totali'
 }
 function iLoad(){
  const portion=iItems.slice(iShown,iShown+16),frag=document.createDocumentFragment();
  for(const item of portion)frag.append(iCard(item));
  iGrid.append(frag);iShown+=portion.length;
  iMore.hidden=iShown>=iItems.length;
  iMore.textContent='Mostra altri ingredienti ('+(iItems.length-iShown)+' restanti) ↓';
  iCount.textContent=iShown+' mostrati · '+iItems.length+' trovati · '+ingredients.length+' totali'
 }
 function renderRecipes(){
  rGrid.replaceChildren();rItems=rFilter();rShown=0;rEmpty.hidden=!!rItems.length;
  if(rItems.length)rLoad();else{rMore.hidden=true;rCount.textContent='0 risultati · '+recipes.length+' ricette'}
  rTabs.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.filter===rCategory)));
 }
 function renderIngredients(){
  iGrid.replaceChildren();iItems=iFilter();iShown=0;iEmpty.hidden=!!iItems.length;
  if(iItems.length)iLoad();else{iMore.hidden=true;iCount.textContent='0 risultati · '+ingredients.length+' ingredienti'}
  iTabs.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.group===iCategory)));
 }
 function tab(parent,key,label,kind){
  const b=create('button','',label);b.type='button';b.dataset[kind==='recipe'?'filter':'group']=key;
  b.addEventListener('click',()=>{if(kind==='recipe'){rCategory=key;renderRecipes()}else{iCategory=key;renderIngredients()}});
  parent.append(b)
 }
 tab(rTabs,'all','Tutte · '+recipes.length,'recipe');cats.forEach(c=>tab(rTabs,c,c+' · '+recipes.filter(r=>r.category===c).length,'recipe'));
 tab(iTabs,'all','Tutti · '+ingredients.length,'ingredient');ingCats.forEach(c=>tab(iTabs,c,c+' · '+ingredients.filter(i=>i.group===c).length,'ingredient'));
 const regionNames=['Nazionale',...regions,'Più regioni'];
 for(const area of regionNames)if(recipes.some(r=>r._area===area)){const o=create('option','',area);o.value=area;rArea.append(o)}
 for(const s of styles){const o=create('option','',s);o.value=s;rTrad.append(o)}
 const quick=get('food-region-cards');
 if(quick){for(const area of regions){
  const n=recipes.filter(r=>r._area===area).length;
  const b=create('button','food-region-card');b.type='button';
  b.append(create('span','',({Hokkaidō:'❄️',Tōhoku:'🌾',Kantō:'🏙️',Chūbu:'⛰️',Kansai:'⛩️',Chūgoku:'🌊',Shikoku:'🍊',Kyūshū:'♨️',Okinawa:'🏝️'})[area]||'🍱'),create('strong','',area),create('small','',n+' ricette'));
  b.addEventListener('click',()=>{rArea.value=area;rCategory='all';rTrad.value='all';rQuery.value='';renderRecipes();get('ricettario-giapponese')?.scrollIntoView({behavior:'smooth',block:'start'})});
  quick.append(b)
 }}
 get('atlas-total').textContent=recipes.length.toLocaleString('it-IT');
 get('atlas-areas').textContent='9';
 get('atlas-categories').textContent=String(cats.length);
 get('food-ingredients-total').textContent=String(ingredients.length);
 get('food-ingredients-groups').textContent=String(ingCats.length);
 const hero=get('atlas-hero-photo'),credit=get('atlas-hero-credit');
 if(hero&&window.YumePhoto)window.YumePhoto.observe(hero,{wiki:'Japanese cuisine',query:'Japanese traditional food wagashi sushi ramen',alt:'Selezione di cucina giapponese',hero:true},credit);
 rQuery.addEventListener('input',renderRecipes);rArea.addEventListener('change',renderRecipes);rTrad.addEventListener('change',renderRecipes);rSort.addEventListener('change',renderRecipes);
 iQuery.addEventListener('input',renderIngredients);iSort.addEventListener('change',renderIngredients);
 rMore.addEventListener('click',rLoad);iMore.addEventListener('click',iLoad);
 get('atlas-reset').addEventListener('click',()=>{rQuery.value='';rArea.value='all';rTrad.value='all';rSort.value='original';rCategory='all';renderRecipes();rQuery.focus()});
 get('food-ingredients-reset').addEventListener('click',()=>{iQuery.value='';iSort.value='original';iCategory='all';renderIngredients();iQuery.focus()});
 renderRecipes();renderIngredients();
})();