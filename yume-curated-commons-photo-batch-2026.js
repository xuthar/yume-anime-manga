/* Portraits sourced from Wikimedia Commons file pages reviewed 11 November 2026.
 * No guessing, no adult images; preserve file provenance and author/license.
 */
(()=>{'use strict';const previous=window.YumeIdolsDiscovery;if(!previous?.people)return;
const rows=[{"name":"Ayaka Miyoshi","file":"Ayaka Miyoshi 三吉 彩花 01.jpg","license":"CC BY 3.0","author":"K-POPIT","category":"music"},{"name":"Fumika Baba","file":"Baba Fumika from \"In Her Room\" at Red Carpet of the Tokyo International Film Festival 2022 (52460527457) (cropped).jpg","license":"CC BY 2.0","author":"Dick Thomas Johnson","category":"fashion"},{"name":"Akira Itsuki","file":"Akira Itsuki as Super Sonico standing, front view (7834976586).jpg","license":"CC BY-SA 2.0","author":"Hikaru Kazushime","category":"cosplay"},{"name":"Leah Dizon","file":"Leah Dizon cropped.jpg","license":"CC BY 2.0","author":"Brian Filoteo","category":"gravure"}];
const norm=x=>String(x||'').normalize('NFKC').normalize('NFKD').toLowerCase().replace(/[\u0300-\u036f\s・･._'’()\-]/g,'');
const source=f=>'https://commons.wikimedia.org/wiki/File:'+encodeURIComponent(f.replaceAll(' ','_'));
let touched=0;const people=previous.people.map(p=>{
 const r=rows.find(x=>norm(x.name)===norm(p.name)||norm(x.name)===norm(p.alternate||''));
 if(!r)return p;touched++;
 return {...p,photoFile:r.file,photoSource:source(r.file),photoLicense:r.license+' · '+r.author,
  photoSourceKind:'Wikimedia Commons: nome e licenza verificati'};
});
window.YumeIdolsDiscovery=Object.freeze({...previous,people,updated:'2026-11-11',stats:{...previous.stats,entries:people.length}});
window.YumeCuratedIdolPortraits2026=Object.freeze({records:rows.length,matched:touched,source:'Commons user-reviewed',date:'2026-11-11'});
})();