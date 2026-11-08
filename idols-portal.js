/* Keep legacy Idols hashes working after the category-only portal reorganization. */
(()=>{'use strict';
 const paths={japan:'idol-category.html?section=japan',music:'idol-category.html?section=music',
  fashion:'idol-category.html?section=fashion',actors:'idol-category.html?section=actors',voice:'idol-category.html?section=voice',
  creators:'idol-category.html?section=creators',cosplay:'idol-category.html?section=cosplay',
  gravure:'idol-category.html?section=gravure',vtuber:'idol-category.html?section=vtuber',
  groups:'idol-category.html?section=groups',jpopwiki:'idol-category.html?section=jpopwiki',
  jav:'idol-category.html?section=jav',adult:'idol-category.html?section=adult',
  asia:'asia-idols.html',ph:'philippines-creators.html',sport:'sport-idols.html',young:'young-stars.html'};
 const old={ '#young-stars':'young','#idols-discover':'japan','#idols-directory':'japan',
  '#asia-idols':'asia','#sport-idols':'sport'};
 const hash=decodeURIComponent(location.hash||'');
 const key=hash.startsWith('#idol-')?hash.slice(6):old[hash];
 if(key&&paths[key])location.replace(paths[key]);
})();
