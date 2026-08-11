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
 '連撃マスター':{date:'2021-01-22',pack:165,url:'https://www.pokemon-card.com/products/'},
};
window.POKECA_OFFICIAL=OFFICIAL;
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
