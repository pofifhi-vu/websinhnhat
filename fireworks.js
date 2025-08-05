const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function createFirework() {
  const x = random(100, canvas.width - 100);
  const y = random(50, canvas.height / 2);
  const count = 100;
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count;
    const speed = random(2, 5);
    particles.push({
      x: x,
      y: y,
      dx: Math.cos(angle) * speed,
      dy: Math.sin(angle) * speed,
      life: 100,
      color: `hsl(${Math.floor(Math.random() * 360)}, 100%, 60%)`,
    });
  }
}

function animate() {
  ctx.fillStyle = "rgba(0,0,0,0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p, index) => {
    p.x += p.dx;
    p.y += p.dy;
    p.life--;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();
    if (p.life <= 0) particles.splice(index, 1);
  });

  requestAnimationFrame(animate);
}

setInterval(createFirework, 800);
animate();
