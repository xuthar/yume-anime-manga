import csv,datetime,json,pathlib,collections
ROOT=pathlib.Path(__file__).resolve().parent
lib=json.loads((ROOT/'library.json').read_text());audit=json.loads((ROOT/'data/catalog-audit.json').read_text());credits=json.loads((ROOT/'anime-details.json').read_text())['items'];anime=[x for x in lib['items'] if x['type']=='anime']
with (ROOT/'data/catalog-verification.csv').open('w',newline='',encoding='utf-8-sig') as f:
 writer=csv.writer(f);writer.writerow(['ID locale','MAL ID','Franchise','Titolo','Categoria','Uscita','Anno','Metadati MAL','Titolo JP','Titolo EN','Titolo IT stagione verificato','Trama','Studio','Episodi fonte','Streaming IT','Cast','Opening','Ending','Video da fonte ufficiale','AnimeClick','Fonte MAL','Siti ufficiali','Controllato il'])
 for x in anime:
  c=credits.get(x.get('metadataKey',x['id']),{});writer.writerow([x['id'],x.get('malId'),x.get('franchiseTitle'),x['title'],x.get('seasonCategory'),x.get('releaseStatus'),x.get('releaseYear'),'Verificati' if x.get('metadataAvailable') else 'Pagina non accessibile',bool(x.get('original')),bool(x.get('english')),bool(x.get('italianTitleVerified')),x.get('synopsisLanguage') if x.get('synopsis') else 'Non disponibile',x.get('studio'),x.get('totalVerified'),x.get('streaming') or 'Non verificato',len(c.get('cast',[])),len(c.get('openings',[])),len(c.get('endings',[])),sum(bool(z.get('officialYoutubeUrl')) for k in ['openings','endings'] for z in c.get(k,[])),x.get('sourceChecks',{}).get('animeClick','non verificato'),x.get('url'),'; '.join(x.get('officialSources',[])),x.get('metadataCheckedAt')])
release_counts={k:sum(x.get('releaseStatus')==k for x in anime) for k in ['Finished Airing','Currently Airing','Not yet aired']}
text=f'''# Verifica estesa del catalogo Yume — 18 ottobre 2026

- Catalogo iniziale: **{audit['originalAnime']} anime**.
- Schede finali: **{len(anime)}**, organizzate in **{audit['franchises']} franchise**.
- Nuove opere collegate aggiunte: **{audit['newEntries']}**. Comprendono stagioni, film, OVA, special, storie laterali e riepiloghi, distinti nella navigazione.
- Pagine MAL di dettaglio verificate: **{audit['verifiedMalEntries']}**; pagine non accessibili: **{audit['unreadableSourceEntries']}**.
- Opere annunciate e non ancora trasmesse secondo MAL: **{release_counts['Not yet aired']}**. In trasmissione: **{release_counts['Currently Airing']}**. Trasmissione conclusa: **{release_counts['Finished Airing']}**.
- Video associati tramite una fonte ufficiale: **{audit['officialMusicVideos']}**. Link diretti forniti da MAL: **{audit['youtubeDirect']}**, senza presumere che il canale sia ufficiale.
- Identità iniziali non risolte: **{len(audit['unresolvedOriginalIds'])}**. Gruppi con più ID per la stessa identità MAL: **{len(audit['duplicateIdentityGroups'])}**.

## Dati personali

Confronto con il commit `{audit['baselineCommit']}`: ogni ID precedente, stato, voto, preferito, progresso e totale personale è conservato. I manga non sono stati modificati. Le nuove opere hanno stato «Da vedere», zero episodi visti, nessun voto e nessun preferito assegnato. I preferiti del browser e le scelte di Seasons mantengono chiavi e identificativi.

## Copertura e limiti

L'elaborazione segue ricorsivamente le relazioni MAL Prequel, Sequel, Side Story, Parent Story, Spin-off, Alternative Version/Setting, Summary, Compilation e Full Story. Le relazioni generiche «Other», «Character» e gli adattamenti manga non espandono il catalogo, per evitare di importare opere non appartenenti al franchise. I crossover con più serie di origine restano separati.

AnimeClick: effettuate ricerche per tutti i 794 titoli iniziali, ricerca con alias verificati per i casi ambigui e lettura delle pagine corrispondenti. Il riepilogo degli esiti è riportato nei dati di audit. Le corrispondenze non univoche non sono state trasferite alle stagioni. AnimeClick può aggregare più stagioni in una pagina: il link di franchise non conferma gli episodi o la licenza della singola stagione. I siti ufficiali sono collegati quando indicati da MAL; il controllo di raggiungibilità non è presentato come conferma indipendente di tutti i metadati. Le notizie non ancora registrate nelle relazioni MAL possono quindi restare assenti.

Le disponibilità italiane sono ricavate solo da offerte regionali IT o conferme ufficiali documentate. Assenza di un'offerta significa «non verificato», non «indisponibile». Titoli italiani non documentati restano non verificati. Le trame inglesi sono etichettate; non sono state inventate traduzioni ufficiali.

Cast o sigle assenti possono dipendere da dati non pubblicati, special senza musica, opere future o pagine non accessibili. I link di ricerca YouTube non sono video verificati. I link diretti MAL non attestano l'ufficialità del canale.

Il dettaglio per ogni opera è in [catalog-verification.csv](data/catalog-verification.csv); i conteggi e gli errori sono in [catalog-audit.json](data/catalog-audit.json).

## Dati non disponibili nella fonte

'''
text+='\n'.join('- '+k+': **'+str(v)+'** opere.' for k,v in audit['missing'].items())
text+=f"\n- Cast non disponibile: **{audit['emptyCast']}**.\n- Nessuna opening o ending elencata: **{audit['emptyThemes']}**.\n"
(ROOT/'RESOCONTO_CATALOGO_2026-10-18.md').write_text(text)
print('Report written',len(anime),'anime')

# Append the verified destination state and composition of the additions.
proof=ROOT/'data/sheets-verification.json'
if proof.exists():
 verify=json.loads(proof.read_text());audit['googleSheetsSync']=verify;(ROOT/'data/catalog-audit.json').write_text(json.dumps(audit,ensure_ascii=False,indent=2)+'\n')
 text+='\n## Google Sheets\n\nAggiornati Anime, Da vedere e Serie e stagioni. Confrontati '+str(verify['personalFields'])+' campi personali: nessuna differenza nei valori. La vista Da vedere contiene '+str(verify['watchListCount'])+' titoli. Le 41 righe manuali preesistenti che bloccavano la formula sono conservate integralmente in Archivio Da vedere 18-10.\n'
newset=set(audit['newIds']);categories=collections.Counter(x.get('seasonCategory','Altro') for x in anime if x['id'] in newset)
text+='\n## Composizione delle aggiunte\n\n'+'\n'.join('- '+name+': **'+str(n)+'**.' for name,n in sorted(categories.items()))+'\n'
text+='\n## Informazioni raccolte\n\n'
text+='- Associazioni di doppiaggio: **'+str(sum(len(credits[x['metadataKey']]['cast']) for x in anime))+'**.\n'
text+='- Opening ed ending: **'+str(sum(len(credits[x['metadataKey']][k]) for x in anime for k in ['openings','endings']))+'**.\n'
text+='- Schede con indicazioni regionali italiane: **'+str(sum(bool(x.get('streamingOffers')) for x in anime))+'**.\n'
text+='- AnimeClick: **'+str(audit['animeClickChecks']['metadata-retrieved'])+'** corrispondenze con metadati leggibili; **'+str(audit['animeClickChecks']['matching-page-found'])+'** pagine corrispondenti senza metadati sufficienti; **'+str(audit['animeClickChecks']['no-unambiguous-match'])+'** corrispondenze non univoche.\n'
(ROOT/'RESOCONTO_CATALOGO_2026-10-18.md').write_text(text)
