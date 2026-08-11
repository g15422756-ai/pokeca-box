const CACHE='pokeca-v3';
const INVENTORY_KEY='pokecaCounts';
const HISTORY_KEY='pokecaHistoryV3';

self.addEventListener('install',event=>event.waitUntil(self.skipWaiting()));
self.addEventListener('activate',event=>event.waitUntil(self.clients.claim()));

self.addEventListener('fetch',event=>{
  const url=new URL(event.request.url);
  if(event.request.method==='GET' && event.request.mode==='navigate' && url.pathname.endsWith('/')){
    event.respondWith((async()=>{
      const res=await fetch(event.request);
      const html=await res.text();
      const injected=`<script>(function(){
const IK='${INVENTORY_KEY}',HK='${HISTORY_KEY}';
function inv(){try{return JSON.parse(localStorage.getItem(IK)||'[]')}catch(e){return []}}
function saveInv(a){localStorage.setItem(IK,JSON.stringify(a))}
function hist(){try{return JSON.parse(localStorage.getItem(HK)||'[]')}catch(e){return []}}
function saveHist(a){localStorage.setItem(HK,JSON.stringify(a.slice(-200)))}
function backup(){const data={version:3,exportedAt:new Date().toISOString(),inventory:inv(),history:hist()};const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:'application/json'}));a.download='pokeca-box-backup.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)}
function restore(file){const r=new FileReader();r.onload=()=>{try{const x=JSON.parse(r.result);const a=x.inventory||x.state||x;if(!Array.isArray(a))throw 0;saveInv(a);saveHist(Array.isArray(x.history)?x.history:[]);location.reload()}catch(e){alert('バックアップの復元に失敗しました')}};r.readAsText(file)}
function ui(){if(document.getElementById('v3bar'))return;const b=document.createElement('div');b.id='v3bar';b.style='position:fixed;bottom:12px;left:12px;right:12px;z-index:99999;display:flex;gap:8px;justify-content:center;flex-wrap:wrap;background:rgba(255,255,255,.96);border:1px solid #ddd;border-radius:14px;padding:8px;box-shadow:0 4px 18px rgba(0,0,0,.12)';
const mk=(t,fn)=>{const x=document.createElement('button');x.textContent=t;x.style='border:1px solid #ccc;background:#fff;border-radius:10px;padding:8px 12px;font-size:13px';x.onclick=fn;return x};
b.append(mk('📦 バックアップ',backup));const inp=document.createElement('input');inp.type='file';inp.accept='application/json';inp.style='display:none';inp.onchange=()=>inp.files[0]&&restore(inp.files[0]);b.append(mk('♻️ 復元',()=>inp.click()),inp);
b.append(mk('💾 自動保存ON',()=>alert('在庫は端末に自動保存されます。バックアップで別保存もできます。')));b.append(mk('履歴だけ削除',()=>{if(confirm('変更履歴だけ削除します。在庫は残ります。')){localStorage.removeItem(HK);alert('履歴を削除しました。在庫は残っています。')}}));document.body.appendChild(b)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ui);else ui();
})();</script>`;
      return new Response(html.replace('</body>',injected+'</body>'),{status:res.status,headers:res.headers});
    })());
  }
});