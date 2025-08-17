
(function(){
  const form = document.getElementById('chat-form');
  const input = document.getElementById('chat-input');
  const log = document.getElementById('chat-log');

  function push(msg){
    const el = document.createElement('div');
    el.className = 'chat-msg';
    el.textContent = msg;
    log.appendChild(el);
    log.scrollTop = log.scrollHeight;
  }

  form?.addEventListener('submit', (e)=>{
    e.preventDefault();
    const v = input.value.trim();
    if(!v) return;
    push("Você: " + v);
    input.value = "";
    playSound('soundClick');
    // Simula resposta
    setTimeout(()=>{
      push("Bot: Valeu por participar do AxysPlay! 😄");
      playSound('soundXP');
    }, 500);
  });
})();
