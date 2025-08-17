
(function(){
  const btn = document.getElementById('btn-add-post');
  const back = document.getElementById('modal-back');
  const form = document.getElementById('form-post');
  const close = document.getElementById('modal-close');
  const list = document.getElementById('posts');

  function open(){ back.style.display='flex'; playSound('soundXP'); }
  function hide(){ back.style.display='none'; }

  btn?.addEventListener('click', open);
  close?.addEventListener('click', hide);
  back?.addEventListener('click', (e)=>{ if(e.target===back) hide(); });

  function addPost(title, content){
    const el = document.createElement('article');
    el.className='post';
    el.innerHTML = `<h4>${title}</h4><time>${new Date().toLocaleString()}</time><p>${content}</p>`;
    list.prepend(el);
  }

  form?.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const title = form.title.value.trim();
    const content = form.content.value.trim();
    if(!title || !content) return;
    addPost(title, content);
    hide();
    form.reset();
    playSound('soundClick');

    // Hook futuro de backend (substituir URL):
    try{
      await fetch('/api/novidades', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ title, content, createdAt: new Date().toISOString() })
      });
    }catch(err){}
  });
})();
