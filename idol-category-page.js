/* Yume Idols: route a single dedicated catalogue and never display unrelated sections. */
(()=>{'use strict';
 const map={
  japan:{title:'Idols del Giappone',label:'日本 · GIAPPONE',symbol:'桜',description:'Voci, gruppi e artiste della scena giapponese, dai grandi nomi alle realtà indipendenti.',discovery:'all'},
  music:{title:'Idol musicali',label:'音楽 · JAPANESE IDOLS',symbol:'音',description:'Gruppi, cantanti, performance, profili ufficiali e nuove artiste della scena idol.',discovery:'music',wikidata:'music'},
  fashion:{title:'Fashion & modelle',label:'装い · FASHION',symbol:'装',description:'Modelle, riviste, campagne, passerelle e talenti femminili.',discovery:'fashion',wikidata:'fashion'},
  actors:{title:'Attrici e cinema',label:'映像 · ACTRESSES',symbol:'映',description:'Attrici e talenti femminili della televisione e del cinema giapponese.',wikidata:'actors'},
  voice:{title:'Seiyū e doppiatrici',label:'声優 · VOICE ACTRESSES',symbol:'声',description:'Le voci dietro anime, videogiochi e produzioni giapponesi.',wikidata:'voice'},
  creators:{title:'Creator & Influencer',label:'網 · DIGITAL CREATORS',symbol:'映',description:'Creator, YouTuber e influencer giapponesi, con foto documentate e profili professionali.',discovery:'creators',wikidata:'creators'},
  cosplay:{title:'Cosplay & Creator',label:'衣装 · COSPLAY',symbol:'衣',description:'Cosplayer, convention, eventi e creatività ispirata al mondo anime.',discovery:'cosplay',wikidata:'cosplay'},
  gravure:{title:'Gravure & photomodels',label:'花 · GRAVURE',symbol:'花',description:'Fotomodelle e riviste, solo artiste adulte con foto non esplicite, fonti e licenze.',discovery:'gravure',wikidata:'gravure'},
  vtuber:{title:'VTuber',label:'電脳 · VIRTUAL IDOLS',symbol:'電',description:'Avatar, talent digitali, doppiatrici e performance dei personaggi VTuber.',discovery:'vtuber',wikidata:'vtuber'},
  groups:{title:'Gruppi idol',label:'組 · IDOL GROUPS',symbol:'組',description:'Gruppi e formazioni femminili, roster e fonti ufficiali.',discovery:'groups'},
  jpopwiki:{title:'Nuove idol underground',label:'新 · NEW IDOL GROUPS',symbol:'新',description:'Le nuove formazioni 2024–2026 con ricerca nei roster e fonti Japanese Music Wiki.',wiki:true},
  jav:{title:'JAV · Archivio 18+',label:'十八禁 · SOLO MAGGIORENNI',symbol:'18+',description:'Schede professionali di interpreti adulte, con ritratti non espliciti e fonti documentate.',discovery:'jav',age:true},
  adult:{title:'Adult Video · Asia · 18+',label:'十八禁 · SOLO PAESI ASIATICI',symbol:'18+',description:'Attrici e artiste adulte esclusivamente asiatiche: schede pubbliche, ritratti nitidi non espliciti e licenze Commons.',discovery:'adult',age:true},
  onlyfans:{title:'Creator Asia · 18+',label:'十八禁 · CREATOR DEI PAESI ASIATICI',symbol:'18+',description:'Creator adulte asiatiche associate a piattaforme pubblicamente documentate, con profili professionali e ritratti non espliciti. La presenza nel catalogo non implica attività attuale.',discovery:'onlyfans',age:true}
 };
 const key=new URLSearchParams(location.search).get('section')||'japan';
 const selected=map[key];
 if(!selected){location.replace('idols.html');return}
 document.body.dataset.idolCatalog=selected.discovery||selected.wikidata||key;
 document.body.dataset.idolSelection=key;
 if(selected.age)document.body.dataset.adultSection='true';
 const byId=id=>document.getElementById(id);
 byId('catalog-label').textContent=selected.label;
 byId('catalog-symbol').textContent=selected.symbol;
 byId('catalog-title').textContent=selected.title;
 byId('catalog-breadcrumb-label').textContent=selected.title;
 byId('catalog-description').textContent=selected.description;
 document.title=selected.title+' · Idols | Yume Anime & Manga';
 const dir=byId('idols-directory'),disc=byId('idols-discover'),wiki=byId('jpop-wiki-rosters');
 if(dir)dir.hidden=!selected.wikidata;
 if(disc)disc.hidden=!selected.discovery;
 if(wiki)wiki.hidden=!selected.wiki;
 const source=byId('gravure-sources');if(source)source.hidden=key!=='gravure';
 const message=byId('catalog-age-notice');if(message)message.hidden=!selected.age;
 const intro=byId('catalog-selected-message');if(intro)intro.textContent=selected.age?'Contenuti disponibili dopo conferma 18+; nessuna anteprima esplicita.':'Solo il catalogo selezionato, senza sezioni incorporate o frame.';
})();
