/**
 * ═══════════════════════════════════════════════
 *   NEETOOSAN — GAMIFIED CORE ENGINE
 *   Implements XP leveling, achievements quests,
 *   retro synthesizer sounds, onboarding modal,
 *   and interactive CLI command terminal.
 * ═══════════════════════════════════════════════
 */

(function() {
  'use strict';

  // ── State Initialization ──────────────────────
  const defaultQuests = {
    explorer: { name: 'System Explorer', desc: 'Visit Home, About, Projects, and Contact pages.', visited: [], target: ['index', 'about', 'projects', 'contact'], complete: false, xp: 20 },
    terminal: { name: 'Hacker Mode', desc: 'Open the secret systems terminal console.', complete: false, xp: 15 },
    comms: { name: 'Comms Officer', desc: 'Initiate a message or click an email link.', complete: false, xp: 15 },
    philosopher: { name: 'Deep Thinker', desc: 'Read Neetoosan\'s philosophy card carefully.', complete: false, xp: 20 },
    nerd: { name: 'Skill Analyst', desc: 'Run the "skills" command in the terminal.', complete: false, xp: 15 },
    cinema: { name: 'Cinematic Escape', desc: 'Check out the curated movie explorer.', complete: false, xp: 15 }
  };

  const state = {
    level: parseInt(localStorage.getItem('n_level')) || 27,
    xp: parseFloat(localStorage.getItem('n_xp')) || 0,
    muted: localStorage.getItem('n_muted') === 'true',
    tutorialPlayed: localStorage.getItem('n_tutorial_played') === 'true',
    quests: JSON.parse(localStorage.getItem('n_quests')) || defaultQuests
  };

  // Ensure state matches default updates if any
  for (let key in defaultQuests) {
    if (!state.quests[key]) state.quests[key] = defaultQuests[key];
  }

  function saveState() {
    localStorage.setItem('n_level', state.level);
    localStorage.setItem('n_xp', state.xp);
    localStorage.setItem('n_muted', state.muted);
    localStorage.setItem('n_tutorial_played', state.tutorialPlayed);
    localStorage.setItem('n_quests', JSON.stringify(state.quests));
  }

  // ── Audio Synthesizer (Web Audio API) ─────────
  let audioCtx = null;
  function getAudioCtx() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioCtx;
  }

  function playSound(type) {
    if (state.muted) return;
    try {
      const ctx = getAudioCtx();
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      const now = ctx.currentTime;

      if (type === 'click') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(100, now + 0.08);
        gainNode.gain.setValueAtTime(0.04, now);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      } 
      else if (type === 'quest') {
        osc.type = 'triangle';
        // Quest sound: chime arpeggio
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.1); // E5
        osc.frequency.setValueAtTime(783.99, now + 0.2); // G5
        osc.frequency.setValueAtTime(1046.50, now + 0.3); // C6
        gainNode.gain.setValueAtTime(0.06, now);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.55);
        osc.start(now);
        osc.stop(now + 0.55);
      }
      else if (type === 'level') {
        // Level up sound: victory synth chord
        osc.type = 'square';
        osc.frequency.setValueAtTime(261.63, now); // C4
        osc.frequency.exponentialRampToValueAtTime(1046.50, now + 0.5);
        gainNode.gain.setValueAtTime(0.04, now);
        gainNode.gain.linearRampToValueAtTime(0.08, now + 0.2);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);
        osc.start(now);
        osc.stop(now + 0.8);

        // Harmony oscillator
        const osc2 = ctx.createOscillator();
        const gainNode2 = ctx.createGain();
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(329.63, now); // E4
        osc2.frequency.exponentialRampToValueAtTime(1318.51, now + 0.5);
        osc2.connect(gainNode2);
        gainNode2.connect(ctx.destination);
        gainNode2.gain.setValueAtTime(0.04, now);
        gainNode2.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);
        osc2.start(now);
        osc2.stop(now + 0.8);
      }
      else if (type === 'boot') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.linearRampToValueAtTime(880, now + 0.45);
        gainNode.gain.setValueAtTime(0.05, now);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);
        osc.start(now);
        osc.stop(now + 0.5);
      }
    } catch (e) {
      console.warn("Audio synthesis block: User interaction required or unsupported.", e);
    }
  }

  // ── HUD Elements & State Renderer ─────────────
  function renderHUD() {
    const xpPercentEl = document.getElementById('hudXp');
    const levelEl = document.querySelector('.hud-left span:last-child');
    
    if (xpPercentEl) {
      xpPercentEl.textContent = `XP: ${Math.round(state.xp)}%`;
    }
    if (levelEl) {
      levelEl.textContent = `LVL ${state.level}`;
    }
  }

  function addXP(amount, reason = '') {
    state.xp += amount;
    if (state.xp >= 100) {
      state.level += 1;
      state.xp = state.xp - 100;
      saveState();
      playSound('level');
      triggerToast('🏆 LEVEL UP!', `Successfully advanced to Level ${state.level}! System capabilities expanded.`);
    } else {
      saveState();
      if (reason) {
        playSound('click');
      }
    }
    renderHUD();
  }

  function completeQuest(id) {
    if (state.quests[id] && !state.quests[id].complete) {
      state.quests[id].complete = true;
      saveState();
      playSound('quest');
      triggerToast('✨ QUEST COMPLETE!', `${state.quests[id].name}: +${state.quests[id].xp} XP earned!`);
      setTimeout(() => {
        addXP(state.quests[id].xp);
      }, 1000);
    }
  }

  // ── Slide Toast Notifications ─────────────────
  function triggerToast(title, body) {
    let container = document.querySelector('.quest-toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'quest-toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'quest-toast';
    toast.innerHTML = `
      <div class="quest-toast-icon">⚡</div>
      <div class="quest-toast-content">
        <h5>${title}</h5>
        <p>${body}</p>
      </div>
    `;
    container.appendChild(toast);

    // Trigger animation frame
    setTimeout(() => toast.classList.add('show'), 50);

    // Remove toast after delay
    setTimeout(() => {
      toast.classList.remove('show');
      toast.addEventListener('transitionend', () => toast.remove());
    }, 4500);
  }

  // ── Page Path Detector ────────────────────────
  function getPageId() {
    const path = window.location.pathname;
    const page = path.substring(path.lastIndexOf('/') + 1).replace('.html', '').toLowerCase();
    return page || 'index';
  }

  function trackPageVisit() {
    const pageId = getPageId();
    const expQuest = state.quests.explorer;
    
    if (expQuest.target.includes(pageId) && !expQuest.visited.includes(pageId)) {
      expQuest.visited.push(pageId);
      saveState();
      
      if (expQuest.visited.length === expQuest.target.length) {
        completeQuest('explorer');
      } else {
        triggerToast('🔍 ARCHITECTURE LOGGED', `Mapped page "${pageId.toUpperCase()}" (${expQuest.visited.length}/${expQuest.target.length}).`);
        addXP(5);
      }
    }
  }

  // ── Document Dynamic Injection ───────────────
  function injectElements() {
    // 1. HUD Buttons (Sound toggle + Onboarding Replay)
    const hudBar = document.querySelector('.hud-bar');
    if (hudBar && !document.querySelector('.hud-controls')) {
      const controls = document.createElement('div');
      controls.className = 'hud-controls';
      
      const soundBtn = document.createElement('button');
      soundBtn.className = 'hud-btn';
      soundBtn.title = 'Mute System Sounds';
      soundBtn.innerHTML = state.muted ? '🔇' : '🔊';
      soundBtn.addEventListener('click', () => {
        state.muted = !state.muted;
        soundBtn.innerHTML = state.muted ? '🔇' : '🔊';
        saveState();
        if (!state.muted) playSound('click');
      });

      const helpBtn = document.createElement('button');
      helpBtn.className = 'hud-btn';
      helpBtn.title = 'How to Play Onboarding';
      helpBtn.innerHTML = '❓';
      helpBtn.addEventListener('click', () => {
        showOnboarding(true);
      });

      controls.appendChild(soundBtn);
      controls.appendChild(helpBtn);
      
      // Insert in HUD bar right segment
      const hudRight = document.querySelector('.hud-right');
      if (hudRight) {
        hudRight.insertBefore(controls, hudRight.firstChild);
      }
    }

    // 2. Onboarding Modal Overlay
    if (!document.getElementById('onboardingModal')) {
      const overlay = document.createElement('div');
      overlay.className = 'onboarding-overlay';
      overlay.id = 'onboardingModal';
      overlay.innerHTML = `
        <div class="onboarding-window">
          <h2>◢ NEETOOSAN SYSTEM ONBOARDING ◣</h2>
          <p class="onboarding-subtitle">System Version 27.6.0 · Interactive Terminal Console Enabled</p>
          
          <div class="onboarding-steps">
            <div class="onboarding-step">
              <span class="onboarding-step-icon">🏆</span>
              <h4>Level Up & XP</h4>
              <p>Explore the architecture, interact with details, and scroll pages to earn XP and level up your system access.</p>
            </div>
            <div class="onboarding-step">
              <span class="onboarding-step-icon">🎯</span>
              <h4>Quest Log Achievements</h4>
              <p>Complete active operations like finding Easter Eggs, examining the tech stack, or reading philosophy logs.</p>
            </div>
            <div class="onboarding-step">
              <span class="onboarding-step-icon">⌨️</span>
              <h4>Hacker Terminal</h4>
              <p>Run secret commands by entering the Konami Code (↑ ↑ ↓ ↓ ← → ← → B A) anywhere on the website.</p>
            </div>
            <div class="onboarding-step">
              <span class="onboarding-step-icon">🔊</span>
              <h4>Synthesizer Sounds</h4>
              <p>Hear vintage synth chords and terminal feedback clicks. Toggle audio from the top HUD anytime.</p>
            </div>
          </div>
          
          <div class="onboarding-actions">
            <button class="btn btn-primary" id="enterSystemBtn" style="padding: 1rem 3rem;">INITIALIZE SYSTEM ACCESS 🚀</button>
          </div>
        </div>
      `;
      document.body.appendChild(overlay);
      
      document.getElementById('enterSystemBtn').addEventListener('click', () => {
        state.tutorialPlayed = true;
        saveState();
        overlay.classList.remove('active');
        playSound('boot');
        triggerToast('🚀 SYSTEM BOOT', 'Interface calibrated. Welcome aboard.');
      });
    }

    // 3. CLI Terminal Overlay
    if (!document.getElementById('terminalOverlay')) {
      const termOverlay = document.createElement('div');
      termOverlay.className = 'terminal-overlay';
      termOverlay.id = 'terminalOverlay';
      termOverlay.innerHTML = `
        <div class="terminal-window">
          <div class="terminal-header">
            <span class="terminal-btn red" id="closeTerminalBtn"></span>
            <span class="terminal-btn yellow"></span>
            <span class="terminal-btn green"></span>
            <span style="margin-left: auto; font-family: var(--font-mono); font-size: 0.72rem; color: var(--muted);">root@neetoosan-sys: ~</span>
          </div>
          <div class="terminal-body">
            <div class="output info">◤ NEETOOSAN SYSTEM CONSOLE [Version 27.6.0] ◥</div>
            <div class="output info">Security Clearance: LEVEL ${state.level} Admin</div>
            <div class="output info">Type 'help' to review directory of commands.</div>
            <br>
          </div>
          <div class="terminal-input-row">
            <span class="prompt">&gt;</span>
            <input type="text" class="terminal-input" id="terminalInput" placeholder="Enter system command..." autocomplete="off" spellcheck="false">
          </div>
        </div>
      `;
      document.body.appendChild(termOverlay);

      // Event handlers
      document.getElementById('closeTerminalBtn').addEventListener('click', closeTerminal);
      document.getElementById('terminalInput').addEventListener('keydown', handleCommandInput);
    }
  }

  function showOnboarding(force = false) {
    if (!state.tutorialPlayed || force) {
      setTimeout(() => {
        const modal = document.getElementById('onboardingModal');
        if (modal) modal.classList.add('active');
      }, 500);
    }
  }

  // ── CLI Terminal Operations ───────────────────
  function openTerminal() {
    const overlay = document.getElementById('terminalOverlay');
    if (overlay) {
      overlay.classList.add('active');
      const input = document.getElementById('terminalInput');
      if (input) input.focus();
      completeQuest('terminal');
    }
  }

  function closeTerminal() {
    const overlay = document.getElementById('terminalOverlay');
    if (overlay) {
      overlay.classList.remove('active');
      playSound('click');
    }
  }

  function printLine(text, type = 'output') {
    const body = document.querySelector('.terminal-body');
    if (!body) return;
    
    const div = document.createElement('div');
    div.className = `output ${type}`;
    div.textContent = text;
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
  }

  function handleCommandInput(e) {
    if (e.key === 'Enter') {
      const input = e.target;
      const cmdRaw = input.value.trim();
      input.value = '';
      
      if (!cmdRaw) return;
      
      printLine(`> ${cmdRaw}`, 'cmd');
      playSound('click');
      parseCommand(cmdRaw);
    }
  }

  function parseCommand(cmdRaw) {
    const args = cmdRaw.toLowerCase().split(' ');
    const command = args[0];

    switch (command) {
      case 'help':
        printLine('Directory of available commands:', 'info');
        printLine('  help      - Print list of commands.');
        printLine('  about     - Retrive dossier log about the developer.');
        printLine('  skills    - Visual chart detailing technical skill ratings.');
        printLine('  quest     - Track completed/active quests.');
        printLine('  matrix    - Toggle animated backdrop matrix simulation.');
        printLine('  tutorial  - Replay onboarding tutorial instructions.');
        printLine('  clear     - Cleanse the console terminal display.');
        printLine('  close     - Close the terminal console.');
        break;
      
      case 'about':
        printLine('Dossier: Israel Oyekanmi (aka Neetoosan)', 'info');
        printLine('Role: Software Engineer specialized in backend systems, mobile ops, and security.');
        printLine('Interests: 3D Blender modeling, cycling, anime narrative analysis, and cryptography.');
        break;
      
      case 'skills':
        printLine('CALIBRATING TECHNICAL CAPABILITIES...', 'info');
        printLine('  Python:     ████████████████░░ 85%');
        printLine('  FastAPI:    ████████████████░░ 85%');
        printLine('  Flutter:    ██████████████░░░░ 75%');
        printLine('  SQLAlchemy: ████████████████░░ 80%');
        printLine('  Security:   ████████████░░░░░░ 65%');
        completeQuest('nerd');
        break;
      
      case 'quest':
        printLine('ACTIVE QUEST JOURNAL:', 'info');
        for (let id in state.quests) {
          const q = state.quests[id];
          const status = q.complete ? '🟢 [COMPLETED]' : '🔴 [ACTIVE]';
          printLine(`  ${status} - ${q.name} (+${q.xp} XP)`);
          printLine(`               ${q.desc}`);
        }
        break;
        
      case 'matrix':
        const canvas = document.getElementById('matrixCanvas');
        if (canvas) {
          canvas.style.display = canvas.style.display === 'none' ? 'block' : 'none';
          printLine(`Matrix canvas toggled to: ${canvas.style.display === 'none' ? 'HIDDEN' : 'VISIBLE'}`, 'info');
        } else {
          printLine('Matrix background simulation canvas is missing from this page context.', 'error');
        }
        break;

      case 'tutorial':
        closeTerminal();
        showOnboarding(true);
        break;

      case 'clear':
        const body = document.querySelector('.terminal-body');
        if (body) body.innerHTML = '';
        break;

      case 'close':
        closeTerminal();
        break;

      default:
        printLine(`System Error: Command '${command}' not recognized. Type 'help' for directory.`, 'error');
    }
  }

  // ── Card Hover / 3D Tilt Integration ─────────
  function initHoloTilt() {
    const cards = document.querySelectorAll('.beyond-card, .project-card, .sh-card');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 8; // enhanced slightly
        const rotateY = (x - centerX) / 8;

        card.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
      });
    });
  }

  // ── Quest Trackers (philosopher, comms, cinema) ──
  function setupQuestTrackers() {
    // 1. philosopher (spend 45s on About page)
    if (getPageId() === 'about') {
      setTimeout(() => {
        completeQuest('philosopher');
      }, 45000);
    }

    // 2. comms (click contact links or type in input fields)
    const commsElements = document.querySelectorAll('a[href^="mailto:"], a[href*="linkedin.com"], input, textarea');
    commsElements.forEach(el => {
      el.addEventListener('click', () => completeQuest('comms'));
      el.addEventListener('input', () => completeQuest('comms'));
    });

    // 3. cinema (click movie explore buttons to streamimdb.ru)
    const movieLinks = document.querySelectorAll('a[href*="streamimdb.ru"]');
    movieLinks.forEach(el => {
      el.addEventListener('click', () => completeQuest('cinema'));
    });
  }

  // ── Konami Code Easter Egg Listener ──────────
  let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let konamiIndex = 0;

  document.addEventListener('keydown', (e) => {
    // sound on typing in input fields
    if (document.activeElement.classList.contains('terminal-input') || document.activeElement.tagName === 'INPUT') {
      playSound('click');
    }

    if (e.key === konamiCode[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiCode.length) {
        openTerminal();
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }
  });

  // ── Particle / Matrix Canvas (Optional Helper) ──
  function initMatrixCanvas() {
    const canvas = document.getElementById('matrixCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const cols = Math.floor(canvas.width / 20);
    const drops = Array(cols).fill(1);

    function drawMatrix() {
      ctx.fillStyle = 'rgba(10, 14, 23, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00ff9d';
      ctx.font = '15px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = String.fromCharCode(0x30A0 + Math.random() * 96);
        ctx.fillText(text, i * 20, drops[i] * 20);

        if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    setInterval(drawMatrix, 60);

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }

  // ── Initialize Gamification ──────────────────
  document.addEventListener('DOMContentLoaded', () => {
    injectElements();
    renderHUD();
    trackPageVisit();
    initHoloTilt();
    setupQuestTrackers();
    initMatrixCanvas();
    showOnboarding(false);

    console.log('%c[SYSTEM] Gamified System Engine calibrated and active.', 'color: #00ff9d;');
  });

})();
