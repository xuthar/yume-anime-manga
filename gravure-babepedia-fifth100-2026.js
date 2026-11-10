/* User-provided Babepedia gravure index, page 5, 2026-11-10.
 * Indexing is not verification of identity, age, profession, socials or rights.
 * Source URLs are NOT themselves official performer profiles.
 */
(()=>{'use strict';const old=window.YumeIdolsDiscovery;if(!old||!Array.isArray(old.people))return;
const names=["Risa Murakami","Momo Sakura","Ami Inamura","Sakura Sato","Sayaka Ando","Fuka Hanasaki","Momo Iriki","Yuzuha Saeki","Ai Koromo","Mayu Oya","Rika Adachi","Yumeka Tani","Rui Kiriyama","Aoi Hinata","Elly Akira","Sumire Uesaka","Eri Akiyama","Kanon Matsushima","Yuko Hamano","Io Iori","Akemi Darenogare","Ayano Washizu","Setsuko Karasuma","Yuka Iguchi","Erika Denya","Mariko Yamagishi","Miyu Kotohara","Sora Aoi","Mio Imada","Manami Hashimoto","An Yamamoto","Kana Riri","Nagisa Aoyama","Toko Ushikawa","Yurina Ogata","Ayaka Noda","Honoka Sasaki","Yuko Aoki","Akari Yoshida","Kozue Tanaka","Mizuho Uchida","Mio Kudo","Tomomi Itano","Sayaka Tomaru","Takara Suzuki","Riko Narumi","Shuri Saika","Rin Takahashi","Kyoko Hinami","Mizuho Hata","Misako Tanaka","Ema Nagase","Kohana Kusunoki","Sakurako Okubo","Minami Matsuzaka","Mizuki Fukumura","Runa Ichinose","Yuno Ohara","Tsukasa Aoi","Tomomi Morisaki","Erika Hori","Nanoka","Haruka Ando","Erena Ono","Miu Shirahama","Kazumi Kawai","Sera Ichijo","Rei Kuromiya","Sara Kawamichi","Umika Kawashima","Hara Tsumugi","Ikumi Hisamatsu","Iori Sagara","Risa Yoshiki","Chika Kanayama","Sario Okada","Nao Usami","Moemi Katayama","Tomoe Yamanaka","Agnes Lum","Nanami Miyakoshi","Miranda Yi","Mika Inagaki","Moe Kawase","Yuria Kizaki","Alisa Sakamaki","Maika Kunugi","Yoko Kamon","Ai Ozora","Ayu Hazaki","Yui Kudo","Saki Tsuji","Yumi Asahina","Meruda Ikeda","Hitomi Aizawa","Saki Onodera","Noriko Kijima","Kazuko Iwamoto","Yuki Mamiya","Moka Hashimoto"];
const aliases={"Hara Tsumugi":"Tsumugi Hara","Fuka Hanasaki":"Fūka Hanasaki","Erika Denya":"Erika Den'ya","Alisa Sakamaki":"Arisa Sakamaki"};
const norm=s=>String(s||'').normalize('NFKC').normalize('NFKD').toLowerCase().replace(/[\u0300-\u036f\s・･._'’()\-]/g,'');
const people=old.people.slice(),idx=new Map(),added=[],matched=[];
const register=(name,i)=>{const k=norm(name);if(!k)return;if(!idx.has(k))idx.set(k,[]);idx.get(k).push(i)};
people.forEach((p,i)=>{for(const n of [p.name,p.alternate,...(p.otherStageNames||[])])if(n)register(n,i)});
names.forEach((name,i)=>{
 const url='https://www.babepedia.com/babe/'+encodeURIComponent(name.replaceAll(' ','_'));
 const keys=[name,aliases[name]||''];
 const hit=keys.flatMap(x=>(idx.get(norm(x))||[])).find(j=>people[j].category==='gravure');
 if(hit!==undefined){const p=people[hit];people[hit]={...p,babepediaFifthListPosition:i+1,babepediaFifthProfileSource:url,gravureEditorialSources:[...new Set([...(p.gravureEditorialSources||[]),url])]};
 matched.push(name);return;}
 const p={category:'gravure',name,alternate:aliases[name]||'',source:url,sourceLabel:'Babepedia · pagina 5 (elenco fornito dall’utente)',sourceKind:'elenco editoriale, identità non necessariamente verificata',officialProfile:null,platform:null,photoFile:null,photoSource:null,ageVerified:false,babepediaFifthListPosition:i+1,babepediaFifthProfileSource:url,gravureIndexVerification:'identità, social e fotografie in attesa di verifica'};
 people.push(p);register(name,people.length-1);if(aliases[name])register(aliases[name],people.length-1);added.push(name);
});
window.YumeIdolsDiscovery=Object.freeze({...old,people,updated:'2026-11-10',stats:{...old.stats,entries:people.length}});
window.YumeBabepediaFifth100=Object.freeze({reviewed:names.length,added,matched,source:'user-supplied Babepedia page 5',updated:'2026-11-10'});
})();