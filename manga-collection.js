/* Shared, deterministic volume identity and non-destructive collection merge. */
(function(root){
 'use strict';
 const norm=s=>String(s||'').normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9\u3040-\u30ff\u3400-\u9fff]+/g,' ').trim();
 const isbn=s=>String(s||'').replace(/[^\dX]/gi,'').toUpperCase();
 const key=b=>JSON.stringify([b.language||'',isbn(b.isbn)?'isbn:'+isbn(b.isbn):'url:'+String(b.url||'')]);
 function identify(b,details={}){
  const title=String(b.title||'').trim();let number=String(details.number??b.number??'').trim();
  const explicit=title.match(/\b(?:vol(?:ume)?\.?|tomo|numero|n\.)\s*(\d+(?:[.,]\d+)?(?:\s*[-–]\s*\d+)?)/i),trailing=title.match(/\s(\d+(?:\.\d+)?(?:\s*[-–]\s*\d+)?)\s*$/);
  if(!number)number=explicit?.[1]||trailing?.[1]||(/\b(?:unico|one[ -]shot)\b/i.test(title)?'Unico':'');
  let series=String(details.series||b.series||title).trim();series=series.replace(/[,\s:]*(?:\((?:light novel|manga)\)\s*)?(?:vol(?:ume)?\.?|tomo|numero|n\.)\s*\d.*$/i,'').trim();
  if(norm(series)===norm(title)&&trailing)series=series.slice(0,trailing.index).trim();
  let edition=title;if(explicit)edition=title.slice(0,explicit.index).replace(/[,\s:]+$/,'');else if(trailing)edition=title.slice(0,trailing.index).trim();
  return {...b,...details,title,series:series||title,number,editionTitle:details.editionTitle||b.editionTitle||edition||series,language:b.language||'IT',kind:b.kind||'manga'};
 }
 const kind=x=>x.mediaFormat==='NOVEL'||x.kind==='novel'?'novel':'manga';
 function find(items,book){const b=identify(book);if(b.workId){const hit=items.find(x=>x.id===b.workId);if(hit)return hit}
  const resolvedIsbn=b.isbn||b.isbnVerified;const byIsbn=resolvedIsbn&&items.filter(x=>x.type==='manga'&&(isbn(x.isbn)===isbn(resolvedIsbn)||(x.volumes||[]).some(v=>isbn(v.isbn)===isbn(resolvedIsbn))));if(byIsbn?.length===1)return byIsbn[0];
  const names=new Set([b.series,b.editionTitle].map(norm));const hits=items.filter(x=>x.type==='manga'&&kind(x)===b.kind&&[x.title,x.original,x.english,x.italian,x.collectionSourceTitle].some(t=>t&&names.has(norm(t))));return hits.length===1?hits[0]:null;
 }
 function hash(s){let n=2166136261;for(let i=0;i<s.length;i++){n^=s.charCodeAt(i);n=Math.imul(n,16777619)}return (n>>>0).toString(16)}
 const language=v=>/^en|ingles/i.test(v||'')?'EN':'IT';
 function sameVolume(v,b,item){if((b.isbn||b.isbnVerified)&&v.isbn&&isbn(v.isbn)===isbn(b.isbn||b.isbnVerified))return true;return norm(v.number)===norm(b.number)&&norm(v.edition)===norm(b.editionTitle)&&language(v.language||item.language)===language(b.language)}
 function empty(book){const b=identify(book),m=b.metadata||{};return {id:b.workId||'manga-purchase-'+hash(norm(b.series)+'|'+b.kind),type:'manga',purchaseKeys:[],title:b.series,italian:b.language==='IT'?b.series:'',english:b.language==='EN'?b.series:'',original:m.original||'',status:'Da verificare',rating:null,favorite:false,progress:null,owned:0,total:null,numbers:'',publisher:b.publisher||'',volumes:[],genres:[],adult:!!m.adult,mediaFormat:b.kind==='novel'?'NOVEL':'MANGA',format:b.kind==='novel'?'Light novel / novel':'Manga',language:b.language,image:m.image||'',author:m.author||'',synopsis:m.synopsis||'',officialSource:b.url,synopsisSource:m.source||'',bibliographicSource:m.source||'',url:'',animeclick:'',collectionSourceTitle:b.series,collectionNote:'Volumi registrati come acquistati tramite il carrello. Lettura, voto e totale dell’opera non vengono dedotti dal possesso.',metadataNote:'Le informazioni non disponibili restano da verificare.',pricing:{currency:'EUR',lastVolumePrice:null,knownTotal:0,pricedVolumes:0,inventoryVolumes:0,complete:false,volumePrices:[]}}}
 function merge(items,records){const out=items.map(x=>({...x,volumes:(x.volumes||[]).map(v=>({...v})),purchaseKeys:[...(x.purchaseKeys||[])]}));
  for(const original of records){const b=identify(original);if(!b.number||!b.series)continue;const purchaseKey=b.key||key(b);let item=find(out,b);if(!item){item=empty(b);out.push(item)}
   if(item.purchaseKeys.includes(purchaseKey))continue;if(Number.isFinite(b.baseOwned))item.owned=Math.max(Number(item.owned)||0,b.baseOwned);if(b.baseNumbers)item.numbers=[...new Set(String(b.baseNumbers).split(/,\s*/).concat(String(item.numbers||'').split(/,\s*/)).filter(Boolean))].join(', ');
   if(!item.volumes.some(v=>sameVolume(v,b,item))){item.volumes.push({edition:b.editionTitle,number:b.number,publisher:b.publisher||'',format:b.kind==='novel'?'Novel':'Manga',language:b.language,isbn:b.isbn||b.isbnVerified||'',source:b.url,purchaseKey,purchasedAt:b.purchasedAt});item.owned=(Number(item.owned)||0)+1;const display=b.number+(b.language==='EN'?' (EN)':'');item.numbers=item.numbers?[...new Set(item.numbers.split(/,\s*/).concat(display))].join(', '):display;item.pricing={...item.pricing,inventoryVolumes:item.volumes.length,complete:false};}
   item.purchaseKeys.push(purchaseKey);item.lastPurchaseAt=b.purchasedAt||'';
   for(const [field,value] of Object.entries({image:b.metadata?.image,author:b.metadata?.author,synopsis:b.metadata?.synopsis,bibliographicSource:b.metadata?.source}))if(!item[field]&&value)item[field]=value;
  }return out;
 }
 function personal(items,records){const seeds=[];for(const b of records){const x=find(items,b);if(x&&!seeds.some(s=>s.id===x.id))seeds.push({...x,owned:0,volumes:[],numbers:'',rating:null,progress:null,purchaseKeys:[],pricing:{currency:'EUR',lastVolumePrice:null,knownTotal:0,pricedVolumes:0,inventoryVolumes:0,complete:false,volumePrices:[]}})}return merge(seeds,records.map(({baseOwned,baseNumbers,...b})=>b))}
 const api={norm,isbn,key,identify,find,merge,personal,sameVolume};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.YumeCollection=api;
})(typeof window!=='undefined'?window:this);
