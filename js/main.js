/**
 * ═════════════════════════════════════════════════════════════════════════════
 *   NEETOOSAN — SPATIAL NAVIGATION & UI CONTROLLER
 *   Orchestrates 3D camera flight, station panels, keyboard shortcuts,
 *   and topology/wireframe mode switching.
 * ═════════════════════════════════════════════════════════════════════════════
 */

(function () {
  'use strict';

  const STATION_KEYS = ['identity', 'props', 'projects', 'about', 'contact'];
  let activeStation = 'identity';

  function initNavigation() {
    // 1. Dock button clicks
    document.querySelectorAll('.js-station-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const station = e.currentTarget.getAttribute('data-station');
        if (station) goToStation(station);
      });
    });

    // 2. In-panel CTA navigation triggers (.js-nav-to)
    document.querySelectorAll('.js-nav-to').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = e.currentTarget.getAttribute('data-target');
        if (target) goToStation(target);
      });
    });

    // 3. Brand link click
    const brandLink = document.getElementById('hudBrandLink');
    if (brandLink) {
      brandLink.addEventListener('click', (e) => {
        e.preventDefault();
        goToStation('identity');
      });
    }

    // 4. Shading Mode Toggle (Clay vs Wireframe)
    const toggleShadingBtn = document.getElementById('toggleShadingBtn');
    if (toggleShadingBtn) {
      toggleShadingBtn.addEventListener('click', () => {
        if (window.ThreeWorld && window.ThreeWorld.toggleShadingMode) {
          window.ThreeWorld.toggleShadingMode();
        }
      });
    }

    // 5. Keyboard Navigation (1-5, W for wireframe, Arrows)
    window.addEventListener('keydown', (e) => {
      // Ignore if user is currently typing in an input or textarea
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
      if (document.body.classList.contains('modal-open')) return;

      if (e.key >= '1' && e.key <= '5') {
        const idx = parseInt(e.key, 10) - 1;
        if (STATION_KEYS[idx]) goToStation(STATION_KEYS[idx]);
      } else if (e.key.toLowerCase() === 'w') {
        if (window.ThreeWorld && window.ThreeWorld.toggleShadingMode) {
          window.ThreeWorld.toggleShadingMode();
        }
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        cycleStation(1);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        cycleStation(-1);
      }
    });

    // 6. Check Initial Hash or default to identity
    const hash = window.location.hash.replace('#', '');
    if (STATION_KEYS.includes(hash)) {
      goToStation(hash, false);
    } else {
      goToStation('identity', false);
    }

    // 7. Handle browser back/forward buttons
    window.addEventListener('hashchange', () => {
      const currentHash = window.location.hash.replace('#', '');
      if (STATION_KEYS.includes(currentHash) && currentHash !== activeStation) {
        goToStation(currentHash, false);
      }
    });
  }

  function goToStation(stationKey, updateHistory = true) {
    if (!STATION_KEYS.includes(stationKey)) return;
    activeStation = stationKey;

    // A. Update station panels visibility
    document.querySelectorAll('.station-panel').forEach(panel => {
      const key = panel.getAttribute('data-station-key');
      if (key === stationKey) {
        panel.classList.add('is-active');
        panel.scrollTop = 0; // Reset scroll to top
      } else {
        panel.classList.remove('is-active');
      }
    });

    // B. Update dock buttons active state
    document.querySelectorAll('.js-station-btn').forEach(btn => {
      const key = btn.getAttribute('data-station');
      if (key === stationKey) {
        btn.classList.add('is-active');
        btn.setAttribute('aria-current', 'page');
      } else {
        btn.classList.remove('is-active');
        btn.removeAttribute('aria-current');
      }
    });

    // C. Trigger 3D camera spatial flight in Three.js engine
    if (window.ThreeWorld && window.ThreeWorld.flyToStation) {
      window.ThreeWorld.flyToStation(stationKey);
    }

    // D. If entering the Props station, tell Instagram engine to refresh layout
    if (stationKey === 'props' && window.InstagramShowcase) {
      window.InstagramShowcase.refreshEmbeds();
    }

    // E. Update URL hash
    if (updateHistory) {
      history.replaceState(null, '', `#${stationKey}`);
    }
  }

  function cycleStation(direction) {
    const currentIndex = STATION_KEYS.indexOf(activeStation);
    const nextIndex = (currentIndex + direction + STATION_KEYS.length) % STATION_KEYS.length;
    goToStation(STATION_KEYS[nextIndex]);
  }

  // Initialize once DOM is ready
  document.addEventListener('DOMContentLoaded', initNavigation);
})();