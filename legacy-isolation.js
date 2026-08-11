(()=>{
  const run=()=>{
    if(!Array.isArray(window.D)) return;
    window.D=window.D.filter(d=>d[3]!=='歴代カタログ');
    const years=document.getElementById('year');
    if(years){for(let y=2017;y>=1996;y--){if(![...years.options].some(o=>o.value===String(y))){const o=document.createElement('option');o.value=String(y);o.textContent=y+'年';years.appendChild(o)}}}
    if(typeof window.render==='function')window.render();
  };
  setTimeout(run,120);
})();