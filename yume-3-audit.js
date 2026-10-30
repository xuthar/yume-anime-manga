/* Yume Collector — non-destructive bibliographic audit. */
(function(){
'use strict';
const m=(tag,cls,txt)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(txt!==undefined)e.textContent=String(txt);return e};
const ck=(value)=>'"'+String(value??'').replace(/"/g,'""')+'"';
function download(rows){
 const payload='\uFEFF'+rows.map(row=>row.map(ck).join(';')).join('\r\n');
 const url=URL.createObjectURL(new Blob([payload],{type:'text/csv;charset=utf-8'}));
 const el=m('a');el.href=url;el.download='yume-collector-verifiche.csv';document.body.append(el);el.click();el.remove();setTimeout(()=>URL.revokeObjectURL(url),1000)
}
function render(container,books){
 let root=container.querySelector('#y3-collector-audit');
 if(!root){root=m('details','y3-extra-box');root.id='y3-collector-audit';const pos=container.querySelector('.y3-toolbar');if(pos)pos.before(root);else container.prepend(root)}
 const wasOpen=root.open;
 root.replaceChildren();root.append(m('summary','','🔎 Verifica ISBN, edizioni e conteggi della collezione'));
 const list=[],missing=[],identities=new Map(),historical=[];
 books.forEach(x=>{
  const volumes=Array.isArray(x.volumes)?x.volumes:[];
  if(!volumes.length&&Number(x.owned)>0)historical.push({title:x.title,owned:x.owned});
  volumes.forEach(v=>{
    const isbn=String(v.isbn||'').replace(/[^0-9X]/gi,'').toUpperCase();
    const rec={title:x.title,edition:v.edition||'Edizione da confermare',number:v.number||'?',isbn};
    list.push(rec);
    if(!isbn)missing.push(rec);
    else{if(!identities.has(isbn))identities.set(isbn,[]);identities.get(isbn).push(rec)}
  })
 });
 const repeated=[...identities].filter(([isbn,rs])=>rs.length>1);
 root.append(m('p','y3-muted','Analisi di sola lettura delle schede bibliografiche pubblicate. Non cambia il possesso, le ristampe, i voti o Google Sheets.'));
 const stats=m('div','y3-extra-stats');
 [[books.length,'Opere'],[list.length,'Record analitici'],[missing.length,'ISBN assenti'],[repeated.length,'ISBN ripetuti'],[historical.length,'Conteggi senza dettaglio']].forEach(([num,label])=>{const box=m('div');box.append(m('strong','',num.toLocaleString('it-IT')),m('span','',label));stats.append(box)});
 root.append(stats);
 root.append(m('p','y3-muted','Un ISBN ripetuto può rappresentare due righe editoriali; non è la prova di un doppio acquisto. Un ISBN vuoto non dimostra che manchi un volume.'));
 const actions=m('div','y3-extra-links'),button=m('button','y3-extra-button','Esporta report CSV'),details=m('details','y3-extra-nested');
 button.type='button';button.onclick=()=>{
  const rows=[['Tipo verifica','Opera','Edizione','Volume','ISBN','Nota']];
  missing.forEach(x=>rows.push(['ISBN da verificare',x.title,x.edition,x.number,'','Non inferire copie mancanti']));
  repeated.forEach(([isbn,recs])=>recs.forEach(x=>rows.push(['ISBN condiviso',x.title,x.edition,x.number,isbn,'Controllare edizione e ristampa'])));
  historical.forEach(x=>rows.push(['Conteggio storico senza singole righe',x.title,'','','','Posseduti dichiarati: '+x.owned]));
  download(rows)
 };
 actions.append(button);root.append(actions);
 details.append(m('summary','','Visualizza esempi di dati da verificare'));
 const ul=m('ul','y3-extra-audit-list');
 missing.slice(0,15).forEach(x=>ul.append(m('li','','ISBN vuoto: '+x.title+' · '+x.edition+' · '+x.number)));
 repeated.slice(0,15).forEach(([isbn,recs])=>ul.append(m('li','','ISBN '+isbn+' su '+recs.length+' schede: '+recs.map(x=>x.title+' '+x.number).join(', '))));
 historical.slice(0,15).forEach(x=>ul.append(m('li','','Conteggio storico: '+x.title+' ('+x.owned+' volumi)')));
 if(!ul.children.length)ul.append(m('li','','Non risultano criticità tra i controlli disponibili.'));
 details.append(ul);root.append(details);root.open=wasOpen
}
window.Yume3Audit={render};
})();