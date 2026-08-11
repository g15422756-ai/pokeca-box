(async()=>{
  const normalize=s=>String(s||'').replace(/\s+/g,'').replace(/[「」『』【】〖〗（）()]/g,'').replace(/拡張パック/g,'').replace(/強化拡張パック/g,'').replace(/ハイクラスパック/g,'').replace(/MEGA/g,'').replace(/シリーズ/g,'').toLowerCase();
  const aliases={'25thanniversarycollection':'25th ANNIVERSARY COLLECTION','25thアニバーサリー':'25th ANNIVERSARY COLLECTION','vmaxクライマックス':'VMAXクライマックス','ポケモンgo':'Pokémon GO','pokemon go':'Pokémon GO','メガドリームex':'MEGAドリームex','熱風のアリーナ':'熱風アリーナ','151':'ポケモンカード151'};
  try{
    const r=await fetch('data/prices.json?'+Date.now(),{cache:'no-store'}); if(!r.ok) return;
    const p=await r.json(); if(!Array.isArray(p.items)||typeof D==='undefined') return;
    const map=new Map(p.items.map(x=>[normalize(aliases[normalize(x.name)]||x.name),x]));
    D.forEach(d=>{const x=map.get(normalize(d[1])); if(x&&Number.isFinite(x.price)&&x.price>0){d[2]=x.price;d[3]=(x.source||'自動取得');d[4]=x.updatedAt||p.updatedAt||'—';}});
    if(typeof render==='function') render();
    const st=document.getElementById('status'); if(st) st.textContent=`買取価格：自動更新データ ${p.updatedAt||''}`;
  }catch(e){const st=document.getElementById('status');if(st)st.textContent='買取価格：前回取得データを表示';}
})();