const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const data=JSON.parse(fs.readFileSync('seasons.json'));
assert.equal(data.region,'IT');assert.equal(Object.keys(data.items).length,560);
const expected={'summer-2026':262,'autumn-2026':169,'winter-2026':229};
for(const s of data.seasons){assert.equal(s.year,2026);assert.equal(s.entries.length,expected[s.key]);assert.equal(new Set(s.entries.map(e=>e.id)).size,s.entries.length);for(const e of s.entries){assert(data.items[e.id]);assert.equal(typeof e.continuing,'boolean')}}
let offers=0,plots=0;
for(const [id,x] of Object.entries(data.items)){
 assert.equal(id,`anime-${x.malId}`);assert(x.detailsChecked,`Unverified metadata: ${id}`);assert(x.title&&x.japanese);assert(x.url.startsWith(`https://myanimelist.net/anime/${x.malId}/`));assert(Array.isArray(x.genres));assert(x.checkedAt);assert(!('synopsisOriginal' in x));
 if(x.adult)assert.equal(x.image,'');
 for(const s of x.streaming){assert.equal(s.country,'IT');assert.equal(new URL(s.url).protocol,'https:');assert(s.name);offers++}
 if(x.synopsisIt)plots++;else assert(x.synopsisNote.includes('non ha ancora'),'Unexpected missing synopsis: '+id);
}
const stub={addEventListener(){},querySelector(){return stub}};
const context={URL,Date,document:{querySelector:()=>stub,querySelectorAll:()=>[]},window:{addEventListener(){}},fetch:()=>new Promise(()=>{})};vm.createContext(context);vm.runInContext(fs.readFileSync('seasons.js','utf8'),context);
assert.equal(vm.runInContext("safeUrl('javascript:alert(1)')",context),'');assert(!context.link('https://example.com','<script>').includes('<script>'));assert(!context.cover({image:'https://example.com/a.png',title:'Test',adult:true}).includes('<img'));
assert(!context.titleField('INGLESE','<img onerror=x>').includes('<img'));
assert(context.titleField('INGLESE','').includes('Non indicato'));
const parsed=fs.readFileSync('index.html','utf8');assert(parsed.includes('href="seasons.html"'));
console.log(`PASS: 3 seasons, 660 entries, 560 verified titles, ${plots} synopses/project notes, ${offers} Italian streaming offers; original titles, adult cover handling and safe rendering.`);
