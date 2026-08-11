import json,re,datetime,os
from urllib.request import Request,urlopen
from bs4 import BeautifulSoup

URL='https://pokeca-box-hikaku.com/'
req=Request(URL,headers={'User-Agent':'Mozilla/5.0'})
html=urlopen(req,timeout=30).read().decode('utf-8','ignore')
soup=BeautifulSoup(html,'html.parser')
items=[]
for tr in soup.find_all('tr'):
    cells=[c.get_text(' ',strip=True) for c in tr.find_all(['th','td'])]
    if len(cells)<2: continue
    text=' '.join(cells)
    if not ('買取' in text or '¥' in text): continue
    yen=[]
    for m in re.findall(r'¥\s*([0-9][0-9,]*)',text):
        try: yen.append(int(m.replace(',','')))
        except: pass
    if not yen: continue
    name=cells[0]
    name=re.sub(r'^\s*(MEGA|SV|S&S|スペシャルBOX)\s*','',name)
    name=re.sub(r'^(?:拡張パック|強化拡張パック|ハイクラスパック)\s*','',name)
    name=re.sub(r'[「」『』【】〖〗]','',name).strip()
    if not name or name in ('商品名','買取価格'): continue
    if any(k in name.upper() for k in ['ONE PIECE','ワンピース','遊戯王']): continue
    items.append({'name':name,'price':max(yen),'source':'ポケカ買取チェッカー（10店舗最高値）'})
best={}
for x in items:
    key=re.sub(r'\s+','',x['name']).lower()
    if key not in best or x['price']>best[key]['price']: best[key]=x
now=datetime.datetime.now(datetime.timezone.utc).astimezone(datetime.timezone(datetime.timedelta(hours=9)))
updated=now.strftime('%Y/%m/%d %H:%M')
for x in best.values(): x['updatedAt']=updated
out={'updatedAt':updated,'source':URL,'items':list(best.values())}
os.makedirs('data',exist_ok=True)
with open('data/prices.json','w',encoding='utf-8') as f: json.dump(out,f,ensure_ascii=False,indent=2)
print(f'updated {len(best)} price rows at {updated}')
