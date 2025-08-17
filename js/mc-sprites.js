
(function(){
  const c = document.createElement('canvas'); c.id='mc-particles'; document.body.appendChild(c);
  const ctx = c.getContext('2d'); let W=0,H=0; let sprites=[]; const imgs=[];
  const paths=['img/particles/heart.png','img/particles/note.png','img/particles/star.png','img/particles/smoke.png'];
  function resize(){ W=c.width=innerWidth; H=c.height=innerHeight; } addEventListener('resize',resize); resize();
  function load(list, cb){ let n=0; list.forEach(src=>{ const im=new Image(); im.onload=()=>{imgs.push(im); if(++n===list.length) cb();}; im.onerror=()=>{const cc=document.createElement('canvas');cc.width=32;cc.height=32;const g=cc.getContext('2d');g.fillStyle='#00eaff';g.fillRect(10,10,12,12);const i=new Image();i.onload=()=>{imgs.push(i); if(++n===list.length) cb();}; i.src=cc.toDataURL();}; im.src=src; }); }
  function spawn(){ if(!imgs.length) return; const im=imgs[(Math.random()*imgs.length)|0];
    const size=16+Math.random()*18, x=Math.random()*W, y=Math.random()*H;
    const vx=(Math.random()-.5)*0.6, vy=(Math.random()-.5)*0.6;
    const life=220+Math.random()*200; sprites.push({im,x,y,vx,vy,life,size,rot:Math.random()*6,va:(Math.random()-.5)*.01,a:.8+Math.random()*.2});
  }
  function tick(){ ctx.clearRect(0,0,W,H);
    const g=ctx.createRadialGradient(W/2,H/2,0,W/2,H/2,Math.max(W,H)/1.2);
    g.addColorStop(0,'rgba(183,0,255,0.07)'); g.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle=g; ctx.fillRect(0,0,W,H);
    if(sprites.length<110) for(let i=0;i<3;i++) spawn();
    sprites.forEach(p=>{ p.x+=p.vx; p.y+=p.vy; p.life--; p.rot+=p.va;
      if(p.x<-40)p.x=W+40; if(p.x>W+40)p.x=-40; if(p.y<-40)p.y=H+40; if(p.y>H+40)p.y=-40;
      ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.rot); ctx.globalAlpha=Math.max(0,Math.min(1,p.a*(p.life/420))); ctx.shadowBlur=18; ctx.shadowColor='#00eaff';
      ctx.drawImage(p.im,-p.size/2,-p.size/2,p.size,p.size); ctx.restore();
    }); sprites=sprites.filter(p=>p.life>0); requestAnimationFrame(tick); }
  load(paths, tick);
})();
