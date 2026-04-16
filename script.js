function toggleSenha() {
    const campo = document.getElementById("campo_senha");
    const olho = document.getElementById("toggle_olho");

    if (campo.type === "password") {
        campo.type = "text";
        olho.classList.remove("bi-eye-slash");
        olho.classList.add("bi-eye");
    } else {
        campo.type = "password";
        olho.classList.remove("bi-eye");
        olho.classList.add("bi-eye-slash");
    }
}

(function(){
  const canvas = document.getElementById('bg');
  const ctx = canvas.getContext('2d');

  function resize(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const COUNT = 110;
  const MAX_DIST = 130;
  const particles = [];

  for(let i = 0; i < COUNT; i++){
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.55,
      vy: (Math.random() - 0.5) * 0.55,
      r: Math.random() * 2.5 + 1,
      color: Math.random() > 0.5 ? '#b06bd4' : '#8b5bbf'
    });
  }

  function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for(let i = 0; i < COUNT; i++){
      const a = particles[i];
      for(let j = i + 1; j < COUNT; j++){
        const b = particles[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if(dist < MAX_DIST){
          const alpha = 1 - dist / MAX_DIST;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(176, 107, 212, ${alpha * 0.4})`;
          ctx.lineWidth = 0.8;
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    for(const p of particles){
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = 0.85;
      ctx.fill();
      ctx.globalAlpha = 1;

      p.x += p.vx;
      p.y += p.vy;
      if(p.x < 0 || p.x > canvas.width)  p.vx *= -1;
      if(p.y < 0 || p.y > canvas.height) p.vy *= -1;
    }

    requestAnimationFrame(draw);
  }

  draw();
})();