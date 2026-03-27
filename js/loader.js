/* ═══════════════════════════════════════════════
   NEETOOSAN — Loader + Typewriter
═══════════════════════════════════════════════ */

// ── Loading screen ─────────────────────────────
(function () {
  const loader = document.getElementById('nLoader');
  if (!loader) return;

  window.addEventListener('load', function () {
    // short extra pause so the animation is enjoyed
    setTimeout(function () {
      loader.classList.add('nLoader--out');
      // remove from DOM after transition ends
      loader.addEventListener('transitionend', function () {
        loader.remove();
      }, { once: true });
    }, 1400);
  });
})();

// ── Typewriter for hero quote ───────────────────
(function () {
  const el = document.getElementById('heroTypewriter');
  if (!el) return;

  const phrases = [
    'I build while the world sleeps.',
    'From isolation to innovation.',
    'Built in silence. Shipped with purpose.',
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;
  const TYPING_SPEED = 55;
  const DELETE_SPEED = 30;
  const PAUSE_AFTER = 2200;
  const PAUSE_BEFORE = 400;

  function tick() {
    const current = phrases[phraseIndex];

    if (!deleting) {
      el.textContent = current.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(tick, PAUSE_AFTER);
        return;
      }
    } else {
      el.textContent = current.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(tick, PAUSE_BEFORE);
        return;
      }
    }

    setTimeout(tick, deleting ? DELETE_SPEED : TYPING_SPEED);
  }

  // start after a small delay so the page entry animations settle
  setTimeout(tick, 1800);
})();
