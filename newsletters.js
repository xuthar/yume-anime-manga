/* Chronological editorial summaries. Never renders original email HTML. */
(()=>{'use strict';
const $=id=>document.getElementById(id),list=$('nl-list'),status=$('nl-status');if(!list)return;
const search=$('nl-search'),publisher=$('nl-publisher'),month=$('nl-month'),order=$('nl-order'),more=$('nl-more');
const tz='Europe/Rome',norm=s=>String(s||'').normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const make=(t,c,text)=>{const n=document.createElement(t);if(c)n.className=c;if(text!==undefined)n.textContent=text;return n};
const date=d=>new Intl.DateTimeFormat('it-IT',{timeZone:tz,day:'numeric',month:'long',year:'numeric'}).format(new Date(d));
const monthKey=d=>new Intl.DateTimeFormat('sv-SE',{timeZone:tz,year:'numeric',month:'2-digit'}).format(new Date(d));
const monthLabel=k=>new Intl.DateTimeFormat('it-IT',{timeZone:tz,month:'long',year:'numeric'}).format(new Date(k+'-15T12:00:00Z'));
let entries=[],limit=15;
function source(url){try{const u=new URL(url);if(u.protocol!=='https:'||u.username||u.password||/unsubscribe|list-manage|musvc|mail.google|\/profile/i.test(url))return null;return u.href}catch{return null}}
function card(e){
 const article=make('article','nl-card');article.id='newsletter-'+e.id;
 const meta=make('div','nl-card-meta'),time=make('time',null,date(e.receivedAt));time.dateTime=e.receivedAt;
 meta.append(make('span','nl-publisher',e.publisher),time,make('span','nl-language',e.language||''));
 const title=make('h3',null,e.subject),summary=make('p','nl-summary',e.summary);article.append(meta,title,summary);
 const tags=make('div','nl-tags');for(const tag of e.tags||[])tags.append(make('span',null,tag));article.append(tags);
 const bottom=make('div','nl-card-bottom');
 if(e.highlights?.length||e.sections?.length){const details=make('details'),toggle=make('summary',null,'Leggi tutti i dettagli');details.append(toggle);const ul=make('ul');for(const item of e.highlights)ul.append(make('li',null,item));details.append(ul);for(const section of e.sections||[]){const block=make('section','nl-detail-section');block.append(make('h4',null,section.title));const rows=make('ul');for(const item of section.items||[])rows.append(make('li',null,item));block.append(rows);details.append(block)}if(e.detailNote)details.append(make('p','nl-detail-note',e.detailNote));bottom.append(details)}
 const url=source(e.sourceUrl);if(url){const a=make('a','nl-source',e.sourceType==='public-newsletter'?'Newsletter originale ↗':'Sito della fonte ↗');a.href=url;a.target='_blank';a.rel='noopener noreferrer';bottom.append(a)}
 article.append(bottom);return article;
}
function render(){
 const q=norm(search.value),items=entries.filter(e=>(publisher.value==='all'||publisher.value===e.publisher)&&(month.value==='all'||monthKey(e.receivedAt)===month.value)&&(!q||norm([e.publisher,e.subject,e.summary,...e.tags,...e.highlights,...(e.sections||[]).flatMap(s=>[s.title,...(s.items||[])])].join(' ')).includes(q)));
 items.sort((a,b)=>(order.value==='oldest'?1:-1)*(Date.parse(a.receivedAt)-Date.parse(b.receivedAt))||a.id.localeCompare(b.id));
 const shown=items.slice(0,limit),fragment=document.createDocumentFragment();let current='';
 for(const e of shown){const key=monthKey(e.receivedAt);if(key!==current){fragment.append(make('h2','nl-month-heading',monthLabel(key)));current=key}fragment.append(card(e))}
 if(!items.length)fragment.append(make('p','nl-empty','Nessuna newsletter corrispondente. Prova un altro editore, mese o titolo.'));
 list.replaceChildren(fragment);status.textContent=items.length+' newsletter'+(items.length===1?' trovata':' trovate')+' · '+shown.length+' visualizzate · '+(order.value==='newest'?'dalle più recenti':'dalle più vecchie');more.hidden=shown.length>=items.length;
}
for(const control of [search,publisher,month,order])control.addEventListener(control===search?'input':'change',()=>{limit=15;render()});more.addEventListener('click',()=>{limit+=15;render()});
fetch('data/newsletters.json',{cache:'no-cache'}).then(r=>{if(!r.ok)throw Error('Archivio non disponibile');return r.json()}).then(data=>{
 const seen=new Set();entries=(data.entries||[]).filter(e=>{if(!e.id||seen.has(e.id)||!e.publisher||!e.subject||!e.summary||!Number.isFinite(Date.parse(e.receivedAt)))return false;seen.add(e.id);e.tags=Array.isArray(e.tags)?e.tags:[];e.highlights=Array.isArray(e.highlights)?e.highlights:[];return true});
 const publishers=[...new Set(entries.map(e=>e.publisher))].sort((a,b)=>a.localeCompare(b,'it'));for(const name of publishers){const o=make('option',null,name);o.value=name;publisher.append(o)}
 for(const key of [...new Set(entries.map(e=>monthKey(e.receivedAt)))].sort().reverse()){const o=make('option',null,monthLabel(key));o.value=key;month.append(o)}
 $('nl-count').textContent=entries.length;$('nl-publishers').textContent=publishers.length;$('nl-updated').textContent='Archivio aggiornato al '+date(data.updatedAt);render();
}).catch(()=>{status.textContent='L’archivio non è disponibile in questo momento. Riprova tra poco.';list.replaceChildren();more.hidden=true});
})();
