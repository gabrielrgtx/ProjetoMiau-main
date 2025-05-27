document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('DOMContentLoaded', () => {
  // ** Se não houver conta registrada, envia para cadastro **
  const storedEmail = localStorage.getItem('userEmail');
  if (!storedEmail) {
    alert('Nenhuma conta encontrada. Você será redirecionado para a página de cadastro.');
    window.location.href = 'cadastro.html';
    return; 
  }
  const particleCanvas = document.getElementById('particle-canvas');
  const pCtx = particleCanvas.getContext('2d');
  let pW, pH;
  function resizeParticles(){
    pW = particleCanvas.width = window.innerWidth;
    pH = particleCanvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeParticles);
  resizeParticles();
  const particles = [];
  for(let i=0; i<100; i++){
    particles.push({
      x: Math.random()*pW,
      y: Math.random()*pH,
      vx: (Math.random()-0.5)*0.5,
      vy: (Math.random()-0.5)*0.5,
      size: Math.random()*2+1
    });
  }
  function updateParticles(){
    pCtx.clearRect(0,0,pW,pH);
    particles.forEach(p=>{
      p.x+=p.vx; p.y+=p.vy;
      if(p.x<0||p.x>pW) p.vx*=-1;
      if(p.y<0||p.y>pH) p.vy*=-1;
      pCtx.fillStyle='rgba(200,200,200,0.5)';
      pCtx.beginPath();
      pCtx.arc(p.x,p.y,p.size,0,Math.PI*2);
      pCtx.fill();
    });
    requestAnimationFrame(updateParticles);
  }
  updateParticles();

  const mCanvas = document.getElementById('mascot-canvas');
  const mCtx = mCanvas.getContext('2d');
  const mascots = [
    {emoji:'😸',x:50,y:40,blink:true},
    {emoji:'🐶',x:150,y:40,blink:false}
  ];
  function drawMascots(){
    mCtx.clearRect(0,0,mCanvas.width,mCanvas.height);
    mascots.forEach((m,i)=>{
      m.y = 40 + Math.sin(Date.now()/500 + i)*5;
      if(m.blink && Math.floor(Date.now()/500)%20===0){
        m.emoji = m.emoji==='😸'?'😺':'😸';
      }
      mCtx.font='48px serif';
      mCtx.fillText(m.emoji,m.x,m.y);
    });
    requestAnimationFrame(drawMascots);
  }
  drawMascots();

  // === microinterações e validação com localStorage ===
  const emailInput = document.getElementById('email');
  const senhaInput = document.getElementById('senha');
  const emailStatus = document.getElementById('email-status');
  const senhaStatus = document.getElementById('senha-status');

  function validateEmail(){
    const storedEmail = localStorage.getItem('userEmail');
    const valid = storedEmail===emailInput.value && /^\S+@\S+\.\S+$/.test(emailInput.value);
    emailStatus.textContent = valid?'✓':'';
    emailStatus.className = 'status-icon '+(valid?'valid':'invalid');
    return valid;
  }
  function validateSenha(){
    const storedSenha = localStorage.getItem('userSenha');
    const valid = storedSenha===senhaInput.value && senhaInput.value.length>=6;
    senhaStatus.textContent = valid?'✓':'';
    senhaStatus.className = 'status-icon '+(valid?'valid':'invalid');
    return valid;
  }
  emailInput.addEventListener('input', validateEmail);
  senhaInput.addEventListener('input', validateSenha);

  const form = document.getElementById('login-form');
  const gameOverlay = document.getElementById('game-overlay');
  const gameCanvas = document.getElementById('game-canvas');
  const gCtx = gameCanvas.getContext('2d');
  let bubbles = [], bubbleCount = 10;

  function startGame(){
    bubbles = [];
    for(let i=0;i<bubbleCount;i++){
      bubbles.push({
        x: Math.random()*(gameCanvas.width-40)+20,
        y: Math.random()*(gameCanvas.height-40)+20,
        r: Math.random()*20+10
      });
    }
    gameOverlay.classList.remove('hidden');
    drawGame();
  }
  function drawGame(){
    gCtx.clearRect(0,0,gameCanvas.width,gameCanvas.height);
    bubbles.forEach(b=>{
      gCtx.beginPath();
      gCtx.arc(b.x,b.y,b.r,0,Math.PI*2);
      gCtx.fillStyle = '#'+Math.floor(Math.random()*0xFFFFFF)
        .toString(16).padStart(6,'0');
      gCtx.fill();
    });
  }
  gameCanvas.addEventListener('click', e=>{
    const rect = gameCanvas.getBoundingClientRect();
    const mx = e.clientX-rect.left, my = e.clientY-rect.top;
    bubbles = bubbles.filter(b=>Math.hypot(b.x-mx,b.y-my)>b.r);
    if(bubbles.length===0){
      document.getElementById('game-message').textContent = 'Sucesso! Redirecionando...';
      setTimeout(()=>{
        gameOverlay.classList.add('hidden');
        window.location.href = 'perfil-novo.html';
      },1000);
    } else drawGame();
  });

  form.addEventListener('submit', e=>{
    e.preventDefault();
    if(validateEmail() && validateSenha()) startGame();
    else alert('Por favor corrija os campos destacados antes de entrar.');
  });

  // ===== Animações de entrada dos botões =====
  document.querySelectorAll('.button').forEach((btn,idx)=>{
    setTimeout(()=>btn.classList.add('show'),100*idx);
  });
  });
  });
