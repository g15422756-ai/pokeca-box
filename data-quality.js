(()=>{
  const inject=()=>{
    if(document.getElementById('quality')) return;
    const box=document.createElement('div');
    box.id='quality';
    box.style.cssText='margin-top:12px;background:#fff;border:1px solid #e5e7eb;border-radius:14px;padding:12px;font-size:12px;line-height:1.6;color:#4b5563';
    box.innerHTML=`<div style="font-weight:700;color:#111827;margin-bottom:5px">🔎 データ品質について</div>
      <div>・商品名・発売日は、原則としてポケモンカード公式の商品情報・公式クロニクルで確認できたものを登録します。</div>
      <div>・定価を公式情報で確認できない商品は、推測せず「未確認」のままにします。</div>
      <div>・買取価格を取得できない商品は「未取得」と表示し、0円として評価額に入れません。</div>
      <div>・買取価格は市場価格の参考値で、状態・店舗・時期によって変動します。</div>
      <div style="margin-top:6px"><a href="https://www.pokemon-card.com/products/" target="_blank" rel="noopener" style="color:#2563eb">ポケモンカード公式 商品情報 ↗</a></div>`;
    const note=document.querySelector('.note');
    (note?.after(box) || document.querySelector('main')?.appendChild(box));
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',inject);else inject();
})();
