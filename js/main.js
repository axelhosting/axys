
const EMAIL_SUPORTE = "suporte@axysplay.com";
const SERVER_IP = "play.axysplay.com";

function playSound(id){
  const el = document.getElementById(id);
  if(!el) return;
  el.currentTime = 0;
  el.volume = 0.4;
  el.play().catch(()=>{});
}

function copiarIP(){
  navigator.clipboard.writeText(SERVER_IP).then(()=>{
    const el = document.getElementById('copy-ip-msg');
    if(el){ el.textContent = "IP copiado!"; setTimeout(()=> el.textContent="", 1800); }
    playSound('soundPling');
  });
}

document.addEventListener('DOMContentLoaded', ()=>{
  // sons de clique / hover
  document.querySelectorAll('a.btn, .navbar a, button, .btn').forEach(el=>{
    el.addEventListener('click', ()=> playSound('soundClick'));
    el.addEventListener('mouseover', ()=> playSound('soundStep'));
  });
});
