#!/usr/bin/env python3
"""Build illustrated, source-linked Yume Magazine issues without external media.
Inputs: data/magazine/*.json, with issues/articles. Output: assets/yume-magazine-numero-XX.pdf.
Requires reportlab. No modification to library.json or owner data.
"""
from __future__ import annotations
import glob, html, json, math, os, random
from pathlib import Path
from datetime import datetime, date, timedelta
from zoneinfo import ZoneInfo
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor, Color
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT
from reportlab.platypus import Paragraph
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

PAGE_W, PAGE_H = A4
PAD = 48
INK = HexColor('#12182C')
PINK = HexColor('#F1AED5')
TEAL = HexColor('#86E2D3')
NIGHT = HexColor('#10162B')
PAPER = HexColor('#F8F6F1')
SOFT = HexColor('#56657C')
ACTIVE_NUMBER = '00'
ACTIVE_DATE = '30.10.2026'

# Font is supplied by the build environment, not redistributed with the document.
font_root = '/usr/share/fonts/truetype/dejavu'
if os.path.exists(font_root + '/DejaVuSans.ttf'):
    pdfmetrics.registerFont(TTFont('Yu',font_root+'/DejaVuSans.ttf'))
    pdfmetrics.registerFont(TTFont('YuBold',font_root+'/DejaVuSans-Bold.ttf'))
else:
    font_root = '/usr/share/fonts/truetype/liberation2'
    if os.path.exists(font_root + '/LiberationSans-Regular.ttf'):
        pdfmetrics.registerFont(TTFont('Yu', font_root+'/LiberationSans-Regular.ttf'))
        pdfmetrics.registerFont(TTFont('YuBold', font_root+'/LiberationSans-Bold.ttf'))
    else:
        pdfmetrics.registerFont('Yu', pdfmetrics.getFont('Helvetica'))
        pdfmetrics.registerFont('YuBold', pdfmetrics.getFont('Helvetica-Bold'))

BASE = ParagraphStyle('base', fontName='Yu', fontSize=10.1, leading=17, textColor=INK, spaceAfter=0, allowWidows=0, allowOrphans=0)
SUB = ParagraphStyle('sub', parent=BASE, fontSize=13, leading=19, textColor=SOFT)
HEAD = ParagraphStyle('head', fontName='YuBold', fontSize=25, leading=31, textColor=INK)
PARA = ParagraphStyle('p', parent=BASE, fontSize=10.5, leading=18)
SMALL = ParagraphStyle('small',parent=BASE,fontSize=8.2,leading=13.5)


def txt(c,s,x,y,size=11,color=INK,bold=False):
    c.setFillColor(color)
    c.setFont('YuBold' if bold else 'Yu',size)
    c.drawString(x,y,str(s))


def para(c,text,x,top,width,style=PARA):
    p=Paragraph(html.escape(str(text)),style)
    w,h=p.wrap(width,1000)
    p.drawOn(c,x,top-h)
    return top-h


def rounded(c,x,y,w,h,fill,rad=12,stroke=None):
    c.setFillColor(fill)
    if stroke:c.setStrokeColor(stroke)
    c.roundRect(x,y,w,h,rad,stroke=bool(stroke),fill=1)


def panel_gradient(c,x,y,w,h,colors):
    # Linear soft-gradient approximation with fine stripes, stable in vector PDF.
    steps=48
    c0,c1=colors
    for i in range(steps):
        t=i/(steps-1)
        col=Color(c0.red*(1-t)+c1.red*t,c0.green*(1-t)+c1.green*t,c0.blue*(1-t)+c1.blue*t)
        c.setFillColor(col)
        c.rect(x,y+h*i/steps,w,h/steps+1,stroke=0,fill=1)


def petals(c,cx,cy,s,seed):
    # Five petal cherry blossoms, each drawn as layered elliptical petals.
    rnd=random.Random(seed)
    c.saveState()
    c.translate(cx,cy);c.rotate(rnd.randrange(-30,31))
    for i in range(5):
        c.saveState();c.rotate(i*72)
        c.setFillColor(Color(0.98,0.68,0.83,alpha=.88))
        c.ellipse(-s*.21,s*.09,s*.21,s*.98,stroke=0,fill=1)
        c.restoreState()
    c.setFillColor(HexColor('#FBE5A9'));c.circle(0,0,s*.18,stroke=0,fill=1)
    c.restoreState()


def star(c,x,y,r,color=TEAL):
    p=c.beginPath()
    for i in range(10):
        a=math.pi*2*i/10+math.pi/2
        rad=r if i%2==0 else r*.3
        nx=x+math.cos(a)*rad;ny=y+math.sin(a)*rad
        if i==0:p.moveTo(nx,ny)
        else:p.lineTo(nx,ny)
    p.close();c.setFillColor(color);c.drawPath(p,stroke=0,fill=1)


def mountain(c,x,y,w,h):
    p=c.beginPath();p.moveTo(x,y);p.lineTo(x+w*.45,y+h);p.lineTo(x+w,y);p.close()
    c.setFillColor(HexColor('#435B80'));c.drawPath(p,fill=1,stroke=0)
    p=c.beginPath();p.moveTo(x+w*.31,y+h*.68);p.lineTo(x+w*.45,y+h);p.lineTo(x+w*.61,y+h*.68);p.lineTo(x+w*.51,y+h*.71);p.lineTo(x+w*.45,y+h*.82);p.lineTo(x+w*.39,y+h*.72);p.close()
    c.setFillColor(HexColor('#D7EAF5'));c.drawPath(p,fill=1,stroke=0)


def torii(c,x,y,scale=1):
    c.saveState();c.translate(x,y);c.scale(scale,scale)
    c.setFillColor(HexColor('#DE7479'))
    c.roundRect(0,3,8,85,2,stroke=0,fill=1);c.roundRect(102,3,8,85,2,stroke=0,fill=1)
    c.roundRect(-12,78,134,13,4,stroke=0,fill=1);c.roundRect(-22,95,154,12,4,stroke=0,fill=1)
    c.setStrokeColor(HexColor('#DE7479'));c.setLineWidth(7)
    c.line(7,45,105,45)
    c.restoreState()


def bookshelf(c,x,y,w,h):
    c.setFillColor(HexColor('#36253F'));c.roundRect(x,y,w,h,7,fill=1,stroke=0)
    c.setFillColor(HexColor('#AD815E'))
    for line in range(3):
        c.rect(x+9,y+12+line*(h-20)/3,w-18,5,fill=1,stroke=0)
    rnd=random.Random(902)
    for r in range(3):
        sx=x+15
        top=y+17+r*(h-20)/3
        while sx < x+w-22:
            bw=rnd.randint(7,15);bh=rnd.randint(27,43)
            hue=rnd.choice(['#9E729E','#7BA3AB','#D7A76D','#947DAE','#D8C0AC'])
            c.setFillColor(HexColor(hue));c.roundRect(sx,top,bw,bh,1.5,stroke=0,fill=1)
            sx+=bw+rnd.randint(3,7)


def art(c,x,y,w,h,seed=0,mode='panel'):
    c.saveState()
    p=c.beginPath();p.roundRect(x,y,w,h,14)
    c.clipPath(p,fill=0,stroke=0)
    panel_gradient(c,x,y,w,h,(HexColor('#1D2549'),HexColor('#6E4278' if seed%2 else '#244660')))
    c.setFillColor(Color(0.83,0.85,0.99,alpha=.06))
    for j in range(10):
        yy=y+j*(h/9)
        c.rect(x,yy,w,h/55,fill=1,stroke=0)
    random.seed(seed+500)
    for j in range(38):
        star(c,x+random.random()*w,y+random.random()*h,random.uniform(.7,2.5),HexColor('#DCE8F3'))
    c.setFillColor(HexColor('#FFE3E9'));c.circle(x+w*.73,y+h*.74,min(h,w)*.12,stroke=0,fill=1)
    mountain(c,x+w*.30,y-h*.02,w*.58,h*.70)
    mountain(c,x+w*.63,y-h*.02,w*.51,h*.49)
    c.setFillColor(HexColor('#142039'))
    p=c.beginPath();p.moveTo(x,y);p.curveTo(x+w*.28,y+h*.2,x+w*.49,y+h*.06,x+w,y+h*.19)
    p.lineTo(x+w,y);p.close();c.drawPath(p,stroke=0,fill=1)
    # Article-specific motifs: manga shelves, torii, constellations, sound waves.
    motif=seed%4
    if motif==0:bookshelf(c,x+w*.06,y+h*.12,w*.28,h*.64)
    elif motif==1:torii(c,x+w*.11,y+h*.13,min(w*.004,h*.007))
    elif motif==2:
        c.setStrokeColor(HexColor('#C2B8F4'));c.setLineWidth(2)
        coords=[(x+w*.11,y+h*.26),(x+w*.17,y+h*.60),(x+w*.35,y+h*.39),(x+w*.49,y+h*.77)]
        for a,b in zip(coords,coords[1:]):c.line(*a,*b)
        for px,py in coords:c.setFillColor(TEAL);c.circle(px,py,5,stroke=0,fill=1)
    else:
        c.setStrokeColor(HexColor('#C9C3F8'));c.setLineWidth(2.3)
        for n in range(5):
            xx=x+w*(.13+n*.05)
            c.line(xx,y+h*.31-10*math.sin(n),xx,y+h*.31+20+8*math.sin(n))
    for j in range(7):
        petals(c,x+((seed*13+j*37)%91)/100*w,y+((seed*11+j*17)%77)/100*h,3+j%3,seed*100+j)
    c.restoreState()


def bg(c,dark=False):
    c.setFillColor(NIGHT if dark else PAPER);c.rect(0,0,PAGE_W,PAGE_H,fill=1,stroke=0)


def small_header(c,issue,chapter=''):
    txt(c,'YUME  /  MAGAZINE',PAD,PAGE_H-29,8,SOFT,True)
    if chapter:
        s=chapter.upper()[:30]
        c.setFont('Yu',8);c.setFillColor(SOFT)
        c.drawRightString(PAGE_W-PAD,PAGE_H-29,s)
    c.setStrokeColor(HexColor('#C9CBD0'));c.line(PAD,PAGE_H-40,PAGE_W-PAD,PAGE_H-40)


def foot(c,page):
    c.setStrokeColor(HexColor('#CDCDD3'));c.line(PAD,43,PAGE_W-PAD,43)
    txt(c,'Numero '+ACTIVE_NUMBER+'   /   '+ACTIVE_DATE,PAD,28,7.5,SOFT)
    c.setFont('YuBold',8);c.setFillColor(INK);c.drawRightString(PAGE_W-PAD,28,f'{page:02d}')


def cover(c,issue):
    bg(c,True)
    art(c,32,210,PAGE_W-64,510,3)
    rounded(c,32,690,PAGE_W-64,105,HexColor('#11192E'),12)
    txt(c,'YUME',55,733,40,HexColor('#F7F2F4'),True)
    txt(c,'M A G A Z I N E',57,702,18,PINK,True)
    txt(c,'NUMERO '+ACTIVE_NUMBER+'   /   '+ACTIVE_DATE,53,186,10,TEAL,True)
    txt(c,'TRA PAGINE',53,139,31,HexColor('#FAF7F7'),True)
    txt(c,'E MONDI',53,103,31,HexColor('#FAF7F7'),True)
    txt(c,'Anime  /  Manga  /  Musica  /  Giappone',53,75,10,HexColor('#D2D4E1'))
    txt(c,'LA RIVISTA DI YUME 3.0',PAGE_W-230,30,8,PINK,True)
    c.showPage()


def editorial(c):
    bg(c);small_header(c,None,'Editoriale');
    txt(c,'NUMERO '+ACTIVE_NUMBER+'  /  EDITORIALE',PAD,735,9,HexColor('#956091'),True)
    txt(c,'Un sogno da sfogliare.',PAD,677,27,INK,True)
    art(c,PAD,376,PAGE_W-2*PAD,235,4)
    y=344
    for text in [
     'Yume nasce dall’incontro tra una libreria personale e la curiosità per i mondi raccontati da anime e manga. Il Magazine aggiunge una terza dimensione: il tempo di fermarsi, leggere e approfondire.',
     'Questo numero raccoglie articoli originali. Si parla di adattamenti, memoria, collezionismo, performance, cucina immaginaria e viaggi in Giappone. Ogni testo rimanda alle relative sezioni del sito e cita le fonti dei fatti documentati.',
     'Le opinioni interpretative sono della redazione Yume. Il sito non inventa acquisti, cronologie o corrispondenze tra episodi e capitoli. È una rivista da sfogliare con curiosità, non una scorciatoia per saltare le storie.'
    ]:
        y=para(c,text,PAD,y,PAGE_W-2*PAD,PARA)-18
    txt(c,'YUME 3.0  /  NUMERO '+ACTIVE_NUMBER,PAD,92,9,HexColor('#845777'),True)
    foot(c,2);c.showPage()


def contents(c,issue,articles):
    bg(c);small_header(c,issue,'Sommario')
    txt(c,'IL SOMMARIO',PAD,730,9,HexColor('#A56A94'),True)
    txt(c,'Otto storie.',PAD,674,36,INK,True)
    txt(c,'Otto modi di guardare più lontano.',PAD,640,14,SOFT)
    art(c,PAD,432,PAGE_W-2*PAD,170,2)
    y=397
    for idx,a in enumerate(articles):
        c.setStrokeColor(HexColor('#DCDCE0'));c.line(PAD,y-9,PAGE_W-PAD,y-9)
        txt(c,f'{idx+1:02d}',PAD,y+5,12,HexColor('#A6689D'),True)
        title=a['title'];maxchars=57
        if len(title)>maxchars:title=title[:maxchars-1]+'…'
        txt(c,title,PAD+40,y+5,9.1,INK,True)
        c.setFont('YuBold',9);c.setFillColor(INK)
        c.drawRightString(PAGE_W-PAD,y+5,f'{4+idx*2:02d}')
        y-=37
    foot(c,3);c.showPage()


def paragraph_group(c,x,y,w,title,body,maxbottom=76):
    txt(c,title,x,y,15,INK,True);y-=19
    y=para(c,body,x,y,w,PARA)-11
    if y<maxbottom:
        raise RuntimeError(f'Article text overflow near {title}: y={y}')
    return y


def article_start(c,issue,a,index):
    page=4+index*2
    bg(c);small_header(c,issue,a['category'])
    txt(c,'DOSSIER  /  '+f'{index+1:02d}',PAD,759,9,HexColor('#9F609C'),True)
    y=741
    y=para(c,a['title'],PAD,y,PAGE_W-2*PAD,HEAD)-9
    y=para(c,a['subtitle'],PAD,y,PAGE_W-2*PAD,SUB)-14
    visual_h=min(250,max(180,y-390))
    art(c,PAD,y-visual_h,PAGE_W-2*PAD,visual_h,index+5)
    y-=visual_h+34
    first=a['sections'][0]
    y=paragraph_group(c,PAD,y,PAGE_W-2*PAD,first[0],first[1],67)
    foot(c,page);c.showPage()


def article_finish(c,issue,a,index):
    page=5+index*2
    bg(c);small_header(c,issue,a['category'])
    txt(c,'CONTINUA  /  '+f'{index+1:02d}',PAD,760,9,HexColor('#9F609C'),True)
    # Small illustrated ornament, plus editorial text.
    art(c,PAGE_W-232,620,184,105,index+11)
    txt(c,'IL RACCONTO',PAD,690,19,INK,True)
    txt(c,'CONTINUA',PAD,666,19,HexColor('#A56E9B'),True)
    y=594
    for title,body in a['sections'][1:]:
        y=paragraph_group(c,PAD,y,PAGE_W-2*PAD,title,body,168)
        y-=14
    c.setStrokeColor(HexColor('#C8CBD3'));c.line(PAD,y-7,PAGE_W-PAD,y-7)
    y-=31
    txt(c,'FONTI',PAD,y,10,HexColor('#A65E94'),True);y-=20
    for title,url in a.get('sources',[])[:5]:
        # Source labels plus link annotations, full URL kept clickable not printed overlong.
        label='•  '+title
        y=para(c,label,PAD,y,PAGE_W-2*PAD,SMALL)-9
        c.linkURL(url,(PAD,y-2,PAGE_W-PAD,y+17),relative=0,thickness=0)
    if y<62:raise RuntimeError(f'Sources overflow {a["slug"]}: {y}')
    foot(c,page);c.showPage()


def back(c,issue,page):
    bg(c,True)
    art(c,28,265,PAGE_W-56,490,9)
    txt(c,'CONTINUA A ESPLORARE',PAD,224,11,TEAL,True)
    txt(c,'Il mondo di Yume',PAD,180,32,HexColor('#FFF9FA'),True)
    txt(c,'non finisce qui.',PAD,139,30,PINK,True)
    txt(c,'xuthar.github.io/yume-anime-manga/yume-magazine.html',PAD,89,9,HexColor('#E6DDED'))
    txt(c,'Le illustrazioni sono grafiche vettoriali originali realizzate per Yume Magazine.',PAD,61,7.4,HexColor('#C4CBD8'))
    txt(c,'NUMERO '+ACTIVE_NUMBER+' / '+ACTIVE_DATE[-4:],PAD,35,8,TEAL,True)
    c.showPage()


def build_all(root:Path):
    outdir=root/'assets';outdir.mkdir(parents=True,exist_ok=True)
    source_files=sorted((root/'data'/'magazine').glob('*.json'))
    today=datetime.now(ZoneInfo('Europe/Rome')).date()
    built=[]
    manifest=[]
    for src in source_files:
        obj=json.loads(src.read_text(encoding='utf-8'))
        if not isinstance(obj,dict) or not obj.get('issues') or not obj.get('articles'):
            continue
        byslug={a['slug']:a for a in obj['articles']}
        for issue in obj['issues']:
            issue_num=str(issue['number']).zfill(2)
            issue_date=date.fromisoformat(str(issue['date']))
            # The launch issue 00 is a one-time exception (2026-10-30).
            # Every later issue must date the last day of its target month.
            month_ended=(issue_date+timedelta(days=1)).month!=issue_date.month
            if issue_num!='00' and not month_ended:
                print('SKIP issue',issue_num,'not dated on the last day of the month')
                continue
            if issue_date>today:
                print('SKIP unreleased issue',issue_num,'until',issue_date)
                continue
            if issue_num!='00':
                article_index={a.get('slug'):a for a in obj.get('articles',[]) if isinstance(a,dict)}
                slugs=issue.get('articleSlugs',[])
                ready=len(slugs)>=6 and len(slugs)==len(set(slugs)) and all(
                    k in article_index and len(article_index[k].get('sections',[]))>=3
                    and bool(article_index[k].get('sources',[])) and bool(article_index[k].get('title'))
                    for k in slugs
                )
                if not ready:
                    print('SKIP incomplete issue',issue_num,'(requires 6 original articles with sources)')
                    continue
            global ACTIVE_NUMBER, ACTIVE_DATE
            ACTIVE_NUMBER = issue_num
            raw_date = str(issue.get('date',''))
            ACTIVE_DATE = raw_date[8:10]+'.'+raw_date[5:7]+'.'+raw_date[:4] if len(raw_date)==10 else raw_date
            articles=[byslug[x] for x in issue['articleSlugs'] if x in byslug]
            if len(articles)!=len(issue['articleSlugs']):raise ValueError('Issue contains missing article references')
            if not articles:continue
            target=outdir/('yume-magazine-numero-'+issue_num+'.pdf')
            c=canvas.Canvas(str(target),pagesize=A4,pageCompression=1)
            c.setTitle('Yume Magazine - Numero '+issue_num+' - '+issue['title'])
            c.setAuthor('Redazione Yume')
            c.setSubject('Anime, manga e cultura giapponese - edizione illustrata')
            cover(c,issue);editorial(c);contents(c,issue,articles)
            for i,a in enumerate(articles):article_start(c,issue,a,i);article_finish(c,issue,a,i)
            back(c,issue,4+len(articles)*2)
            c.save()
            built.append((target,len(articles),3+len(articles)*2+1))
            manifest.append({'number':issue_num,'title':issue['title'],'date':issue.get('date'),'articles':len(articles),'pages':3+len(articles)*2+1,'pdf':'assets/'+target.name,'source':'data/magazine/'+src.name})
    if not built:raise RuntimeError('No valid Magazine issues found')
    manifest.sort(key=lambda x: (x.get('date') or '', x.get('number') or ''), reverse=True)
    if len({x['number'] for x in manifest})!=len(manifest):raise ValueError('Duplicate issue numbers')
    index_path=root/'data'/'magazine'/'pdf-catalog.json'
    index_path.write_text(json.dumps({'updatedBy':'scripts/build-magazine-pdf.py','issues':manifest},ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    return built

if __name__=='__main__':
    root=Path(__file__).resolve().parent.parent
    for p,articles,pages in build_all(root):print(f'CREATED {p} ({p.stat().st_size} bytes; {articles} articles; {pages} pages)')