const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const dataPath = fs.existsSync('dist/library.json') ? 'dist/' : '';
const library = JSON.parse(fs.readFileSync(dataPath + 'library.json'));
const metadata = JSON.parse(fs.readFileSync(dataPath + 'anime-details.json'));
const anime = library.items.filter(x => x.type === 'anime');
assert.equal(anime.length, 752);
assert.equal(library.items.length, 1027);
assert.equal(library.items.filter(x => x.type === 'manga').reduce((n,x) => n + x.owned, 0), 1341);
let songs = 0, cast = 0, direct = 0;
for (const item of anime) {
  const record = metadata.items[item.id];
  assert(record, `Missing record: ${item.id}`);
  assert.equal(record.malId, Number(item.id.split('-')[1]));
  assert.equal(record.parserVersion, 2);
  assert(record.sourceUrl.startsWith(`https://myanimelist.net/anime/${record.malId}/`));
  for (const row of record.cast) {
    assert(row.character && row.voices.length);
    for (const voice of row.voices) assert(voice.name && voice.language);
  }
  cast += record.cast.length;
  for (const song of [...record.openings, ...record.endings]) {
    assert(song.title);
    const url = new URL(song.youtubeUrl || song.youtubeSearch);
    assert(['www.youtube.com','youtube.com','music.youtube.com','youtu.be'].includes(url.hostname));
    assert.equal(url.protocol, 'https:');
    songs++;
    direct += !!song.youtubeUrl;
  }
}
const context = {
  URL, Date,
  escape: s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])),
  safeUrl: s => { try {const u = new URL(s); return u.protocol === 'https:' ? u.href : '';} catch {return '';} }
};
vm.createContext(context);
vm.runInContext(fs.readFileSync(dataPath + 'anime-credits.js', 'utf8'), context);
const sample = Object.values(metadata.items).find(x => x.cast.length && x.openings.length && x.endings.length);
const markup = context.animeCreditsMarkup(sample);
assert(markup.includes('Doppiatori principali') && markup.includes('Opening & Ending'));
assert(markup.includes('noopener noreferrer'));
assert(context.animeCreditsMarkup(null).includes('in corso di verifica'));
assert(!context.creditLink('javascript:alert(1)', '<script>').includes('<script>'));
assert(!context.themeSection([{title:'<script>',artist:'"<img>',youtubeSearch:'https://www.youtube.com/results?search_query=test'}], 'Opening','OP').includes('<script>'));
assert(context.castRows([{character:'Test',role:'Main',voices:[{name:'Actor',language:'Mandarin'}]}]).includes('Cinese mandarino'));
console.log(`PASS: ${anime.length} anime, ${cast} character credits, ${songs} themes (${direct} source YouTube links), catalog preserved, safe rendering and language labels.`);
