/* 公式確認済み商品マスタ
 * 公式商品ページで商品名・発売日・希望小売価格を確認できたものだけを登録。
 * 不明な項目は登録しない。推測値を入れない。
 */
(()=>{
const OFFICIAL={
 'ストームエメラルダ':{date:'2026-07-31',pack:200,url:'https://www.pokemon-card.com/products/s/mega.html'},
 'アビスアイ':{date:'2026-05-22',pack:200,url:'https://www.pokemon-card.com/products/'},
 'ニンジャスピナー':{date:'2026-03-13',pack:180,url:'https://www.pokemon-card.com/products/'},
 'ムニキスゼロ':{date:'2026-01-23',pack:180,url:'https://www.pokemon-card.com/products/'},
 'MEGAドリームex':{date:'2025-11-28',pack:550,url:'https://www.pokemon-card.com/products/'},
 'インフェルノX':{date:'2025-09-26',pack:180,url:'https://www.pokemon-card.com/products/'},
 'メガブレイブ':{date:'2025-08-01',pack:180,url:'https://www.pokemon-card.com/products/'},
 'メガシンフォニア':{date:'2025-08-01',pack:180,url:'https://www.pokemon-card.com/products/'},
 '熱風アリーナ':{date:'2025-03-14',pack:180,url:'https://www.pokemon-card.com/products/'},
 'テラスタルフェスex':{date:'2024-12-06',pack:550,url:'https://www.pokemon-card.com/products/'},
 'ステラミラクル':{date:'2024-07-19',pack:180,url:'https://www.pokemon-card.com/products/'},
 'ナイトワンダラー':{date:'2024-06-07',pack:180,url:'https://www.pokemon-card.com/products/'},
 'バトルパートナーズ':{date:'2025-01-24',pack:180,url:'https://www.pokemon-card.com/products/'},
 'ポケモンカード151':{date:'2023-06-16',pack:180,url:'https://www.pokemon-card.com/products/'},
 'VSTARユニバース':{date:'2022-12-02',pack:550,url:'https://www.pokemon-card.com/products/'},
 'パラダイムトリガー':{date:'2022-10-21',pack:165,url:'https://www.pokemon-card.com/products/'},
 'ロストアビス':{date:'2022-07-15',pack:165,url:'https://www.pokemon-card.com/products/'},
 'ダークファンタズマ':{date:'2022-05-13',pack:260,url:'https://www.pokemon-card.com/products/'},
 'タイムゲイザー':{date:'2022-04-08',pack:165,url:'https://www.pokemon-card.com/products/'},
 'スペースジャグラー':{date:'2022-04-08',pack:165,url:'https://www.pokemon-card.com/products/'},
 'バトルリージョン':{date:'2022-02-25',pack:260,url:'https://www.pokemon-card.com/products/'},
 'スターバース':{date:'2022-01-14',pack:165,url:'https://www.pokemon-card.com/products/'},
 'VMAXクライマックス':{date:'2021-12-03',pack:550,url:'https://www.pokemon-card.com/products/'},
 '25th ANNIVERSARY COLLECTION':{date:'2021-10-22',pack:297,url:'https://www.pokemon-card.com/products/'},
 'フュージョンアーツ':{date:'2021-09-24',pack:165,url:'https://www.pokemon-card.com/products/s/s8.html'},
 '蒼空ストリーム':{date:'2021-07-09',pack:165,url:'https://www.pokemon-card.com/products/s/s7.html'},
 '摩天パーフェクト':{date:'2021-07-09',pack:165,url:'https://www.pokemon-card.com/products/s/s7.html'},
 'イーブイヒーローズ':{date:'2021-05-28',pack:165,url:'https://www.pokemon-card.com/products/s/s6a.html'},
 '白銀のランス':{date:'2021-04-23',pack:165,url:'https://www.pokemon-card.com/products/s/s6.html'},
 '漆黒のガイスト':{date:'2021-04-23',pack:165,url:'https://www.pokemon-card.com/products/s/s6.html'},
 '双璧のファイター':{date:'2021-03-19',pack:165,url:'https://www.pokemon-card.com/products/'},
 '一撃マスター':{date:'2021-01-22',pack:165,url:'https://www.pokemon-card.com/products/'},
 '連撃マスター':{date:'2021-01-22',pack:165,url:'https://www.pokemon-card.com/products/'}
};
window.POKECA_OFFICIAL=OFFICIAL;

/* 通常拡張BOX以外の「未開封で保有価値を管理したい商品」も同じ棚卸し対象にする。
 * 買取価格が確認できないものは null / 未取得のまま登録し、推測値を入れない。
 */
const SPECIALS=[
 [2025,'拡張パック メガブレイブ ポケモンセンターセット',12000,'もえたく！','2025/8/1',12800,'special'],
 [2025,'拡張パック メガシンフォニア ポケモンセンターセット',12500,'もえたく！','2025/8/1',12800,'special'],
 [2025,'スペシャルBOX ポケモンセンタートウホク',8500,'もえたく！','2025/6/20',2090,'special'],
 [2025,'スペシャルBOX ポケモンセンターヒロシマ',18500,'買取ホムラ','2025/7/4',2090,'special'],
 [2025,'スペシャルBOX ポケモンセンターフクオカ',10500,'もえたく！','2025/7/4',2090,'special'],
 [2025,'デッキビルドBOX バトルパートナーズ',3600,'もえたく！','2025/1/24',4200,'special'],
 [2025,'ブラックボルト・ホワイトフレア カードファイルセット',null,'未取得','2025/6/6',2640,'special'],
 [2024,'スタートデッキGenerations スペシャルバトルセット',12000,'駿河屋','2024/11/22',4620,'special'],
 [2024,'デッキビルドBOX ステラミラクル',1600,'もえたく！','2024/7/19',4200,'special'],
 [2024,'スペシャルジャンボカードセット オーガポン',500,'もえたく！','2024/5/17',1980,'special'],
 [2023,'拡張パック スノーハザード＆クレイバースト ポケモンセンター・ジムセット',null,'未取得','2023/4/14',12800,'special'],
 [2023,'ポケモンカードゲーム Classic',null,'未取得','2023/10/20',35000,'special'],
 [2023,'プレミアムトレーナーボックスex',null,'未取得','2023/1/20',6350,'special'],
 [2023,'スカーレットex＆バイオレットex スペシャルセット',null,'未取得','2023/1/20',1800,'special'],
 [2023,'スターターセットex ピカチュウスペシャルセット',null,'未取得','2023/3/24',3580,'special'],
 [2023,'exスペシャルセット',null,'未取得','2023/5/19',1800,'special'],
 [2023,'ポケモンカード151 カードファイルセット モンスターボール',null,'未取得','2023/6/16',2200,'special'],
 [2023,'ポケモンカード151 カードファイルセット フシギバナ・リザードン・カメックス',null,'未取得','2023/6/16',2200,'special'],
 [2023,'デッキビルドBOX 黒炎の支配者',null,'未取得','2023/7/28',4200,'special'],
 [2023,'YU NAGABA × ポケモンカードゲーム イーブイズ スペシャルBOX',null,'未取得','2023/5/24',4800,'special'],
 [2022,'シンジュ団スペシャルセット',null,'未取得','2022/12/2',5000,'special'],
 [2022,'コンゴウ団スペシャルセット',null,'未取得','2022/12/2',5000,'special'],
 [2022,'Pokémon GO スペシャルセット',null,'未取得','2022/7/15',2200,'special'],
 [2021,'YU NAGABA × ポケモンカードゲーム スペシャルBOX',null,'未取得','2021/6/5',6226,'special'],
 [2020,'スペシャルBOX ポケモンセンターカナザワオープン記念',null,'未取得','2020/11/20',5104,'special'],
 [2020,'SHINY BOX クロバットV',null,'未取得','2020/12/18',4180,'special'],
 [2019,'オルタージェネシス ポケモンセンター限定セット',null,'未取得','2019/9/6',11000,'special'],
 [2019,'ミラクルツイン ポケモンセンター限定セット',null,'未取得','2019/5/31',11000,'special'],
 [2019,'ダブルブレイズ ポケモンセンター限定セット',null,'未取得','2019/3/1',11000,'special'],
 [2019,'リミテッドコレクション マスターバトルセット',null,'未取得','2019/8/30',13200,'special'],
 [2018,'タッグボルト ポケモンセンター限定セット',null,'未取得','2018/12/7',10800,'special'],
 [2018,'超爆インパクト ポケモンセンター限定セット',null,'未取得','2018/9/7',10800,'special'],
 [2018,'裂空のカリスマ ポケモンセンター限定セット',null,'未取得','2018/6/1',10800,'special'],
 [2018,'禁断の光 ポケモンセンター限定セット',null,'未取得','2018/3/2',10800,'special']
];
if(typeof D!=='undefined' && typeof C!=='undefined'){
 const exists=new Set(D.map(d=>String(d[1])));
 SPECIALS.forEach(d=>{if(!exists.has(String(d[1]))){D.push(d);C.push(0)}});
 if(typeof render==='function')render();
}
const addLinks=()=>{
 document.querySelectorAll('#list .row').forEach(row=>{
  if(row.querySelector('.official-link'))return;
  const name=(row.querySelector('.name')?.childNodes?.[0]?.textContent||row.querySelector('.name')?.textContent||'').trim();
  const x=OFFICIAL[name]; if(!x)return;
  const a=document.createElement('a');a.className='official-link';a.href=x.url;a.target='_blank';a.rel='noopener';a.textContent='公式';
  a.style.cssText='font-size:10px;margin-left:5px;color:#2563eb;text-decoration:none;border:1px solid #bfdbfe;border-radius:999px;padding:2px 5px';
  row.querySelector('.name')?.appendChild(a);
 });
};
new MutationObserver(addLinks).observe(document.getElementById('list')||document.body,{childList:true,subtree:true});
setTimeout(addLinks,500);
})();