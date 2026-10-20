const assert=require('node:assert/strict'),fs=require('fs'),vm=require('vm');
const context={window:{},Intl,Date,URL,document:{readyState:'loading',addEventListener(){}},setInterval(){}};
vm.createContext(context);for(const file of ['episode-calendar.js','seasonal.js'])vm.runInContext(fs.readFileSync(file,'utf8'),context);
const s=context.window.YumeSeasonal.seasonFor,c=context.window.YumeCalendar;
for(const [date,expected] of [['2026-09-30',''],['2026-10-01','halloween'],['2026-10-31','halloween'],['2026-11-01',''],['2026-12-07',''],['2026-12-08','christmas'],['2027-01-06','christmas'],['2027-01-07','']])assert.equal(s(date),expected,date);
assert.equal(c.monday('2026-10-25'),'2026-10-19');assert.equal(c.monday('2026-10-26'),'2026-10-26');assert.equal(c.addDays('2026-12-31',1),'2027-01-01');
assert.equal(c.dayKey(new Date('2026-10-25T23:30Z')),'2026-10-26');
const items=[{id:'anime-1',malId:1,status:'In corso'},{id:'anime-2',malId:2,status:'Da vedere'}];
const events=[{itemId:'anime-1',platform:'A'},{itemId:'anime-2',platform:'B'},{itemId:null,platform:'A'}];
assert.equal(c.selected(events,items,'all','all').length,3);assert.equal(c.selected(events,items,'catalog','all').length,2);assert.equal(c.selected(events,items,'following','all').length,1);assert.equal(c.selected(events,items,'following','all',{'anime-2':'watch'}).length,2);assert.equal(c.selected(events,items,'all','A').length,2);
const data=JSON.parse(fs.readFileSync('data/episode-calendar.json'));const ids=new Set(JSON.parse(fs.readFileSync('library.json')).items.map(x=>x.id));
for(const e of data.events){assert.match(e.start,/T\d\d:\d\d:00\+0[12]:00$/);assert.equal(e.start.slice(0,10),e.date);assert.ok(!e.itemId||ids.has(e.itemId));assert.ok(e.sourceUrl.startsWith('https://www.animeclick.it/episodio/'));}
assert.equal(new Set(data.events.map(e=>[e.date,e.time,e.sourceUrl,e.platform].join('|'))).size,data.events.length);
console.log('OK: holiday boundaries, Rome dates and DST, week rollover, filters, calendar IDs and unique dated listings');
