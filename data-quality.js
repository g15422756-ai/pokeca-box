(()=>{
  const OFFICIAL={
    'ストームエメラルダ':{date:'2026-07-31',price:200,url:'https://www.pokemon-card.com/products/'},
    'アビスアイ':{date:'2026-05-22',price:200,url:'https://www.pokemon-card.com/products/'},
    'ニンジャスピナー':{date:'2026-03-13',price:180,url:'https://www.pokemon-card.com/products/'},
    'ムニキスゼロ':{date:'2026-01-23',price:180,url:'https://www.pokemon-card.com/products/'},
    'MEGAドリームex':{date:'2025-11-28',price:550,url:'https://www.pokemon-card.com/products/'},
    'インフェルノX':{date:'2025-09-26',price:180,url:'https://www.pokemon-card.com/products/'},
    'メガブレイブ':{date:'2025-08-01',price:180,url:'https://www.pokemon-card.com/products/'},
    'メガシンフォニア':{date:'2025-08-01',price:180,url:'https://www.pokemon-card.com/products/'},
    '熱風アリーナ':{date:'2025-03-14',price:180,url:'https://www.pokemon-card.com/products/'},
    'テラスタルフェスex':{date:'2024-12-06',price:550,url:'https://www.pokemon-card.com/products/'},
    'ステラミラクル':{date:'2024-07-19',price:180,url:'https://www.pokemon-card.com/products/'},
    'ナイトワンダラー':{date:'2024-06-07',price:180,url:'https://www.pokemon-card.com/products/'},
    'ポケモンカード151':{date:'2023-06-16',price:180,url:'https://www.pokemon-card.com/products/'},
    'VSTARユニバース':{date:'2022-12-02',price:550,url:'https://www.pokemon-card.com/products/'},
    'パラダイムトリガー':{date:'2022-10-21',price:165,url:'https://www.pokemon-card.com/products/'},
    'ロストアビス':{date:'2022-07-15',price:165,url:'https://www.pokemon-card.com/products/'},
    'ダークファンタズマ':{date:'2022-05-13',price:260,url:'https://www.pokemon-card.com/products/'},
    'タイムゲイザー':{date:'2022-04-08',price:165,url:'https://www.pokemon-card.com/products/'},
    'スペースジャグラー':{date:'2022-04-08',price:165,url:'https://www.pokemon-card.com/products/'},
    'バトルリージョン':{date:'2022-02-25',price:260,url:'https://www.pokemon-card.com/products/'},
    'スターバース':{date:'2022-01-14',price:165,url:'https://www.pokemon-card.com/products/'},
    'VMAXクライマックス':{date:'2021-12-03',price:550,url:'https://www.pokemon-card.com/products/'},
    '25th ANNIVERSARY COLLECTION':{date:'2021-10-22',price:297,url:'https://www.pokemon-card.com/products/'},
    'フュージョンアーツ':{date:'2021-09-24',price:165,url:'https://www.pokemon-card.com/products/s/s8.html'},
    '蒼空ストリーム':{date:'2021-07-09',price:165,url:'https://www.pokemon-card.com/products/s/s7.html'},
    '摩天パーフェクト':{date:'2021-07-09',price:165,url:'https://www.pokemon-card.com/products/s/s7.html'},
    'イーブイヒーローズ':{date:'2021-05-28',price:165,url:'https://www.pokemon-card.com/products/s/s6a.html'},
    '白銀のランス':{date:'2021-04-23',price:165,url:'https://www.pokemon-card.com/products/s/s6.html'},
    '漆黒のガイスト':{date:'2021-04-23',price:165,url:'https://www.pokemon-card.com/products/s/s6.html'},
    '双璧のファイター':{date:'2021-03-19',price:165,url:'https://www.pokemon-card.com/products/'},
    '一撃マスター':{date:'2021-01-22',price:165,url:'https://www.pokemon-card.com/products/'},
    '連撃マスター':{date:'2021-01-22',price:165,url:'https://www.pokemon-card.com/products/'}
  };
  const inject=()=>{
    if(document.getElementById('quality')) return;
    const box=document.createElement('div'); box.id='quality';
    box.style.cssText='margin-top:12px;background:#fff;border:1px solid #e5e7eb;border-radius:14px;padding:12px;font-size:12px;line-height:1.6;color:#4b5563';
    box.innerHTML=`<div style="font-weight:700;color:#111827;margin-bottom:5px">🔎 データ品質について</div>
      <div>・商品名・発売日は、原則としてポケモンカード公式の商品情報・公式クロニクルで確認できたものを登録します。</div>
      <div>・定価を公式情報で確認できない商品は、推測せず「未確認」のままにします。</div>
      <div>・買取価格を取得できない商品は「未取得」と表示し、0円として評価額に入れません。</div>
      <div>・買取価格は市場価格の参考値で、状態・店舗・時期によって変動します。</div>
      <div style="margin-top:6px"><a href="https://www.pokemon-card.com/products/" target="_blank" rel="noopener" style="color:#2563eb">ポケモンカード公式 商品情報 ↗</a></div>`;
    const note=document.querySelector('.note'); (note?.after(box) || document.querySelector('main')?.appendChild(box));
  };
  const addBadges=()=>{
    document.querySelectorAll('#list .row').forEach(row=>{
      if(row.querySelector('.official-badge'))return;
      const el=row.querySelector('.name'); if(!el)return;
      const name=(el.childNodes[0]?.textContent||el.textContent||'').trim();
      const x=OFFICIAL[name]; if(!x)return;
      const a=document.createElement('a'); a.className='official-badge'; a.href=x.url; a.target='_blank'; a.rel='noopener'; a.textContent='公式確認';
      a.title=`公式確認：発売日 ${x.date}／希望小売価格 ${x.price}円（税込）`;
      a.style.cssText='font-size:10px;margin-left:5px;color:#2563eb;text-decoration:none;border:1px solid #bfdbfe;border-radius:999px;padding:2px 5px';
      el.appendChild(a);
    });
  };
  const start=()=>{inject(); addBadges(); const list=document.getElementById('list'); if(list)new MutationObserver(addBadges).observe(list,{childList:true,subtree:true});};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();
