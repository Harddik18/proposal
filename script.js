// Screen Navigation
function goToScreen(num) {
  document.querySelectorAll('.card-screen').forEach(s => s.classList.remove('active'));
  const target = document.getElementById('screen-' + num);
  if (target) {
    target.classList.add('active');
  }
}

// Background Floating Petals & Hearts
function initBackgroundDecor() {
  const decor = document.getElementById('decorations');
  const items = ['🌸', '💖', '💕', '✨', '🌸', '🤍'];
  
  for (let i = 0; i < 22; i++) {
    const el = document.createElement('div');
    el.className = 'floating-petal';
    el.innerText = items[Math.floor(Math.random() * items.length)];
    el.style.left = Math.random() * 100 + 'vw';
    el.style.animationDuration = (Math.random() * 6 + 6) + 's';
    el.style.animationDelay = (Math.random() * 8) + 's';
    el.style.fontSize = (Math.random() * 16 + 14) + 'px';
    decor.appendChild(el);
  }
}
initBackgroundDecor();

// Playful "No" Button Interaction
let dodgeCount = 0;
const messages = [
  "Are you sure? 🥺",
  "Think again! ✈️",
  "You can't say no to this adventure! 😉💖",
  "The pandas will be sad! 🐼💔",
  "Just click YES! ✨"
];

function dodgeNo() {
  const noBtn = document.getElementById('btn-no');
  const yesBtn = document.getElementById('btn-yes');
  const msgEl = document.getElementById('persuasion-text');

  dodgeCount++;

  // Make Yes button grow bigger
  const scale = 1 + (dodgeCount * 0.12);
  yesBtn.style.transform = `scale(${Math.min(scale, 1.6)})`;

  // Random offset for No button
  const randomX = (Math.random() - 0.5) * 120;
  const randomY = (Math.random() - 0.5) * 80;
  noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;

  // Show persuasion message
  msgEl.innerText = messages[(dodgeCount - 1) % messages.length];
  msgEl.classList.remove('hidden');

  // Play gentle boing sound
  playSoftBeep(320);
}

// "Yes" Click Handler
function handleYesClick() {
  goToScreen(3);
  fireHeartConfetti();
  playLoveMelody();
}

function fireMoreLove() {
  fireHeartConfetti();
  playLoveMelody();
}

// Confetti & Floating Hearts Engine
function fireHeartConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const emojis = ['💖', '🌸', '✨', '💕', '🎉', '✈️'];

  for (let i = 0; i < 60; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height * 0.45,
      vx: (Math.random() - 0.5) * 16,
      vy: (Math.random() - 0.9) * 18,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      size: Math.random() * 12 + 18,
      rotation: Math.random() * 360,
      rSpeed: (Math.random() - 0.5) * 8
    });
  }

  let frame = 0;
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.4; // gravity
      p.rotation += p.rSpeed;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.font = `${p.size}px serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(p.emoji, 0, 0);
      ctx.restore();
    });

    frame++;
    if (frame < 140) {
      requestAnimationFrame(animate);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }
  animate();
}

// Web Audio API Synthesizer (Works 100% offline, zero external files)
function getAudioContext() {
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  return AudioCtx ? new AudioCtx() : null;
}

function playSoftBeep(freq) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.2);
  } catch (e) {}
}

function playLoveMelody() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    // Pleasant romantic chime notes: C5, E5, G5, C6
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.6);
      }, idx * 160);
    });
  } catch (e) {}
}
