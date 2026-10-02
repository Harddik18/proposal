// Screen Navigation
function nextScreen(num) {
  document.querySelectorAll('.card-screen').forEach(s => s.classList.remove('active'));
  const target = document.getElementById('screen-' + num);
  if (target) {
    target.classList.add('active');
  }
  // Start gentle music if not started
  if (!isMusicPlaying) {
    startRomanticMusic();
  }
}

// Background Floating Petals & Hearts
function initBackgroundDecor() {
  const decor = document.getElementById('decorations');
  const items = ['🌸', '💖', '💕', '✨', '🌹', '🤍', '🪷'];
  
  for (let i = 0; i < 26; i++) {
    const el = document.createElement('div');
    el.className = 'floating-petal';
    el.innerText = items[Math.floor(Math.random() * items.length)];
    el.style.left = Math.random() * 100 + 'vw';
    el.style.animationDuration = (Math.random() * 6 + 6) + 's';
    el.style.animationDelay = (Math.random() * 8) + 's';
    el.style.fontSize = (Math.random() * 18 + 14) + 'px';
    decor.appendChild(el);
  }
}
initBackgroundDecor();

// Playful "Not today... 💨" Button Interaction
let dodgeCounters = { 2: 0, 3: 0 };
const persuasionMessages = [
  "Are you sure, Sakina? 🥺",
  "Think again, Batu! 💖",
  "Radha's heart belongs to Krishna only! 🌸",
  "You cannot say no to our lifetime story! 😉✨",
  "Just say YES to your Kanhaiya! 🦚❤️"
];

function dodgeNo(step) {
  const noBtn = document.getElementById('btn-no-' + step);
  const yesBtn = document.getElementById('btn-yes-' + step);
  const msgEl = document.getElementById('persuasion-text-' + step);

  dodgeCounters[step] = (dodgeCounters[step] || 0) + 1;
  const count = dodgeCounters[step];

  // Make Yes button bloom bigger
  const scale = 1 + (count * 0.12);
  yesBtn.style.transform = `scale(${Math.min(scale, 1.55)})`;

  // Random offset for No button
  const randomX = (Math.random() - 0.5) * 110;
  const randomY = (Math.random() - 0.5) * 70;
  noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;

  // Show cute message
  msgEl.innerText = persuasionMessages[(count - 1) % persuasionMessages.length];
  msgEl.classList.remove('hidden');

  playSoftPluck(440);
}

// "Yes" Click Handler
function handleYesClick() {
  nextScreen(4);
  fireHeartConfetti();
  playJoyfulCelebrationChime();
  if (!isMusicPlaying) {
    startRomanticMusic();
  }
}

function fireMoreLove() {
  fireHeartConfetti();
  playJoyfulCelebrationChime();
}

// Celebration Confetti & Hearts
function fireHeartConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const emojis = ['💖', '🌸', '✨', '💕', '🌹', '🦚', '🎉', '🤍'];

  for (let i = 0; i < 70; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height * 0.42,
      vx: (Math.random() - 0.5) * 18,
      vy: (Math.random() - 0.9) * 20,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      size: Math.random() * 14 + 18,
      rotation: Math.random() * 360,
      rSpeed: (Math.random() - 0.5) * 10
    });
  }

  let frame = 0;
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.42;
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
    if (frame < 150) {
      requestAnimationFrame(animate);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }
  animate();
}

// ==========================================
// ROMANTIC MUSIC SYNTHESIZER (Web Audio API)
// 100% Native, Zero Downloads, Beautiful Tone
// ==========================================

let audioCtx = null;
let isMusicPlaying = false;
let melodyInterval = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Romantic melody notes (Harp / Celesta chords in C & F & G)
const romanticScore = [
  // C major 7
  { note: 261.63, dur: 0.5 }, // C4
  { note: 329.63, dur: 0.5 }, // E4
  { note: 392.00, dur: 0.5 }, // G4
  { note: 493.88, dur: 0.8 }, // B4
  { note: 523.25, dur: 1.2 }, // C5
  // A minor 7
  { note: 220.00, dur: 0.5 }, // A3
  { note: 261.63, dur: 0.5 }, // C4
  { note: 329.63, dur: 0.5 }, // E4
  { note: 392.00, dur: 0.8 }, // G4
  { note: 440.00, dur: 1.2 }, // A4
  // F major 7
  { note: 174.61, dur: 0.5 }, // F3
  { note: 261.63, dur: 0.5 }, // C4
  { note: 329.63, dur: 0.5 }, // E4
  { note: 392.00, dur: 0.8 }, // G4
  { note: 523.25, dur: 1.2 }, // C5
  // G dominant / sus
  { note: 196.00, dur: 0.5 }, // G3
  { note: 293.66, dur: 0.5 }, // D4
  { note: 392.00, dur: 0.5 }, // G4
  { note: 440.00, dur: 0.8 }, // A4
  { note: 493.88, dur: 1.4 }, // B4
];

let noteIdx = 0;

function playRomanticNote(freq, duration) {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  // Warm gentle sine & triangle blend
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(freq, now);

  // Soft envelope for music-box feel
  gain.gain.setValueAtTime(0.001, now);
  gain.gain.linearRampToValueAtTime(0.08, now + 0.05);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration + 0.8);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + duration + 0.9);
}

function startRomanticMusic() {
  const ctx = getAudioContext();
  if (!ctx) return;

  isMusicPlaying = true;
  updateMusicButton(true);

  if (melodyInterval) clearInterval(melodyInterval);

  melodyInterval = setInterval(() => {
    if (!isMusicPlaying) return;
    const item = romanticScore[noteIdx];
    playRomanticNote(item.note, item.dur);
    noteIdx = (noteIdx + 1) % romanticScore.length;
  }, 480);
}

function stopRomanticMusic() {
  isMusicPlaying = false;
  updateMusicButton(false);
  if (melodyInterval) {
    clearInterval(melodyInterval);
    melodyInterval = null;
  }
}

function toggleRomanticMusic() {
  if (isMusicPlaying) {
    stopRomanticMusic();
  } else {
    startRomanticMusic();
  }
}

function updateMusicButton(playing) {
  const btn = document.getElementById('music-btn');
  const icon = document.getElementById('music-icon');
  const txt = document.getElementById('music-text');

  if (playing) {
    btn.classList.add('playing');
    icon.innerText = '🎵';
    txt.innerText = 'Romantic Music: Playing';
  } else {
    btn.classList.remove('playing');
    icon.innerText = '🔇';
    txt.innerText = 'Music: Paused (Tap to Play)';
  }
}

function playSoftPluck(freq) {
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(freq, now);
  gain.gain.setValueAtTime(0.06, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.2);
}

function playJoyfulCelebrationChime() {
  const ctx = getAudioContext();
  if (!ctx) return;
  const celebrationNotes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
  celebrationNotes.forEach((freq, idx) => {
    setTimeout(() => {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.7);
    }, idx * 130);
  });
}

// First click anywhere on the page starts music smoothly
document.body.addEventListener('click', function initAudioOnTap() {
  if (!isMusicPlaying) {
    startRomanticMusic();
  }
  document.body.removeEventListener('click', initAudioOnTap);
}, { once: true });
