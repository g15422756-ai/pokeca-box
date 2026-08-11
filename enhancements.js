(()=>{
  const KEY='pokeca_box_analytics_v1';
  const getState=()=>{try{return JSON.parse(localStorage.getItem(KEY)||'{}')}catch{return {}}};
  const saveState=s=>localStorage.setItem(KEY,JSON.stringify(s));
  const yen=n=>'¥'+Math.round(n||0).toLocaleString('ja-JP');
  const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  const titleFromRow=row=>{
    const el=row?.querySelector('.name');
    return el?.childNodes?.[0]?.textContent?.trim()||row?.querySelector('.name')?.textContent?.trim()||'';
  };
  const readRows=()=>[...document.querySelectorAll('#list .row')].map(row=>{
    const name=titleFromRow(row);
    const num=Number(row.querySelector('.num')?.textContent||0);
    const texts=[...row.querySelectorAll('*')].map(x=>x.textContent.trim()).filter(Boolean);
    const priceText=texts.find(t=>/^¥[\d,]+$/.test(t));
    const price=priceText?Number(priceText.replace(/[^0-9]/g,'')):0;
    return {name,num,price,row};
  }).filter(x=>x.name);
  const inject=()=>{
    if(document.getElementById('analytics')) return;
    const css=document.createElement('style');
    css.textContent=`#analytics{margin-top:16px}.a-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:8px}.a-card{background:#fff;border:1px solid #e5e7eb;border-radius:14px;padding:12px}.a-title{font-size:15px;font-weight:700;margin:0 0 8px}.a-muted{font-size:11px;color:#6b7280}.a-list{display:flex;flex-direction:column;gap:6px}.a-item{display:grid;grid-template-columns:28px minmax(0,1fr) auto;gap:7px;align-items:center;font-size:13px}.a-bar{height:6px;background:#eef0f3;border-radius:99px;overflow:hidden;margin-top:4px}.a-bar>i{display:block;height:100%;background:#111827}.a-row{padding:8px 0;border-bottom:1px solid #f0f0f0}.a-row:last-child{border-bottom:0}.a-input{width:100%;padding:9px 10px;border:1px solid #d1d5db;border-radius:10px;font-size:15px}.a-btn{min-width:0;height:36px;padding:0 12px;font-size:13px}.a-alert{background:#fff8e1;border:1px solid #f0d98a;border-radius:12px;padding:9px;margin-top:8px;font-size:12px;line-height:1.5}.a-good{font-weight:700}.a-neg{font-weight:700}.a-history{max-height:240px;overflow:auto}.a-section{margin-top:10px}@media(max-width:560px){.a-grid{grid-template-columns:1fr}}`;
    document.head.appendChild(css);
    const box=document.createElement('div'); box.id='analytics';
    box.innerHTML=`<div class="a-grid"><div class="a-card"><div class="a-title">🏆 含み益ランキング</div><div id="rank" class="a-list"></div></div><div class="a-card"><div class="a-title">📊 年代別資産構成</div><div id="years" class="a-list"></div></div></div>
    <div class="a-section a-card"><div class="a-title">📈 買取価格の変化</div><div id="priceChanges" class="a-list"></div><div class="a-muted" style="margin-top:6px">価格データを取得した日ごとに、この端末へ履歴を保存します。</div></div>
    <div class="a-section a-card"><div class="a-title">🔔 価格アラート</div><div class="a-muted" style="margin-bottom:7px">設定額以上になったBOXを一覧表示します。</div><input id="alertPrice" class="a-input" type="number" min="0" step="1000" placeholder="例：50000"><div id="alerts"></div></div>
    <div class="a-section a-card"><div class="a-title">🧾 在庫変更履歴</div><div id="invHistory" class="a-history"></div></div>`;
    const data=document.querySelector('.data'); data?.before(box);
  };
  const snapshot=()=>{
    const rows=readRows(); if(!rows.length)return;
    const s=getState(), today=new Date().toLocaleDateString('sv-SE');
    s.prices=s.prices||{}; s.assets=s.assets||{}; s.changes=s.changes||[];
    const p={}; rows.forEach(x=>{if(x.price)p[x.name]=x.price});
    s.prices[today]=p;
    const asset=rows.reduce((a,x)=>a+x.num*x.price,0);
    const cost=Number(document.getElementById('costTotal')?.textContent?.replace(/[^0-9]/g,'')||0);
    s.assets[today]={asset,cost,profit:asset-cost};
    const dates=Object.keys(s.prices).sort(); while(dates.length>31)delete s.prices[dates.shift()];
    const ad=Object.keys(s.assets).sort(); while(ad.length>31)delete s.assets[ad.shift()];
    s.alertPrice=s.alertPrice||'';
    saveState(s);
  };
  const renderAnalytics=()=>{
    inject();
    const rows=readRows();
    const ranked=rows.filter(x=>x.num>0&&x.price>0).map(x=>({...x,profit:x.num*(x.price-(Number((document.getElementById('costTotal')?.textContent||'').replace(/[^0-9]/g,''))||0))}));
    // Use per-box cost when available from D, otherwise derive a conservative ranking from current displayed price and owned count.
    const dmap=new Map((window.D||[]).map(d=>[d[1],Number(d[2])||0]));
    ranked.forEach(x=>x.profit=x.num*(x.price-(dmap.get(x.name)||x.price)));
    ranked.sort((a,b)=>b.profit-a.profit);
    const max=Math.max(1,...ranked.slice(0,10).map(x=>Math.max(0,x.profit)));
    document.getElementById('rank').innerHTML=ranked.slice(0,10).map((x,i)=>`<div class="a-item"><b>${i+1}</b><div><div>${esc(x.name)} <span class="a-muted">×${x.num}</span></div><div class="a-bar"><i style="width:${Math.round(Math.max(0,x.profit)/max*100)}%"></i></div></div><b>${yen(x.profit)}</b></div>`).join('')||'<div class="a-muted">まだ所有BOXが登録されていません。</div>';
    const years={}; rows.filter(x=>x.num>0&&x.price>0).forEach(x=>{const d=(window.D||[]).find(d=>d[1]===x.name);const y=d?.[0]||'—';years[y]=(years[y]||0)+x.num*x.price});
    const yv=Object.entries(years).sort((a,b)=>b[1]-a[1]); const ym=Math.max(1,...yv.map(x=>x[1]));
    document.getElementById('years').innerHTML=yv.map(([y,v])=>`<div class="a-row"><div style="display:flex;justify-content:space-between"><span>${y}年</span><b>${yen(v)}</b></div><div class="a-bar"><i style="width:${Math.round(v/ym*100)}%"></i></div></div>`).join('')||'<div class="a-muted">在庫登録後に表示します。</div>';
    const s=getState(), dates=Object.keys(s.prices||{}).sort(), last=dates.at(-1), prev=dates.at(-2), changes=[];
    if(last){rows.filter(x=>x.price>0).forEach(x=>{const old=s.prices[prev]?.[x.name];if(old){const diff=x.price-old;if(diff)changes.push({name:x.name,diff,pct:diff/old});}})}
    changes.sort((a,b)=>Math.abs(b.diff)-Math.abs(a.diff));
    document.getElementById('priceChanges').innerHTML=changes.slice(0,12).map(x=>`<div class="a-row"><div style="display:flex;justify-content:space-between"><span>${esc(x.name)}</span><b class="${x.diff>=0?'a-good':'a-neg'}">${x.diff>=0?'+':''}${yen(x.diff)} (${x.pct>=0?'+':''}${(x.pct*100).toFixed(1)}%)</b></div></div>`).join('')||(prev?'<div class="a-muted">前回取得日から価格変化はありません。</div>':'<div class="a-muted">価格履歴が2日分たまると前日比を表示します。</div>');
    const inp=document.getElementById('alertPrice'); inp.value=s.alertPrice||''; const threshold=Number(inp.value||0);
    const al=rows.filter(x=>x.price>=threshold&&threshold>0).sort((a,b)=>b.price-a.price);
    document.getElementById('alerts').innerHTML=threshold?`<div class="a-alert">${al.length?al.slice(0,20).map(x=>`${esc(x.name)}：${yen(x.price)}`).join('<br>'):'条件に該当するBOXはありません。'}</div>`:'';
    const ch=(s.changes||[]).slice().reverse();
    document.getElementById('invHistory').innerHTML=ch.slice(0,30).map(x=>`<div class="a-row"><div>${esc(x.name)}　<b>${x.delta>0?'+':''}${x.delta}</b></div><div class="a-muted">${esc(x.at)}</div></div>`).join('')||'<div class="a-muted">在庫を増減すると履歴が残ります。</div>';
  };
  const recordClick=e=>{
    const btn=e.target.closest('button'); if(!btn)return;
    const txt=btn.textContent.trim(); if(txt!=='+'&&txt!=='−'&&txt!=='-')return;
    const row=btn.closest('.row'); if(!row)return;
    const s=getState();s.changes=s.changes||[];s.changes.push({name:titleFromRow(row),delta:txt==='+ '?1:1,at:new Date().toLocaleString('ja-JP')});
    if(txt!=='+' )s.changes[s.changes.length-1].delta=-1;
    s.changes=s.changes.slice(-100);saveState(s);setTimeout(renderAnalytics,100);
  };
  const init=()=>{
    inject();
    document.getElementById('alertPrice')?.addEventListener('change',e=>{const s=getState();s.alertPrice=e.target.value;saveState(s);renderAnalytics()});
    document.getElementById('list')?.addEventListener('click',recordClick);
    setTimeout(()=>{snapshot();renderAnalytics()},1800);
    setInterval(()=>{snapshot();renderAnalytics()},60000);
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
