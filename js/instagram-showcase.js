/**
 * ═════════════════════════════════════════════════════════════════════════════
 *   NEETOOSAN — 3D GAME PROPS & INSTAGRAM RENDER SHOWCASE MODULE
 *   Live Instagram embeds & interactive modal viewer for 3D asset renders.
 * ═════════════════════════════════════════════════════════════════════════════
 */

(function () {
  'use strict';

  const INSTAGRAM_PROFILE_URL = 'https://www.instagram.com/neetoosan/';

  const PROP_RENDERS = [
    {
      id: 'Dda2GXIAHSk',
      title: '3D Game Prop / Asset Render I',
      category: 'Hard Surface // Game Asset',
      date: 'Latest Render',
      tags: ['3D Asset', 'Hard Surface', 'Prop Design', 'Topology'],
      permalink: 'https://www.instagram.com/p/Dda2GXIAHSk/',
      embedCode: `<blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/p/Dda2GXIAHSk/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style=" background:#0d0d0d; border:1px solid rgba(255,255,255,0.15); border-radius:4px; box-shadow:0 8px 30px rgba(0,0,0,0.8); margin: 0 auto; max-width:540px; min-width:300px; padding:0; width:100%;"><div style="padding:16px;"> <a href="https://www.instagram.com/p/Dda2GXIAHSk/?utm_source=ig_embed&amp;utm_campaign=loading" style=" background:#0d0d0d; line-height:0; padding:0; text-align:center; text-decoration:none; width:100%; display:block;" target="_blank"> <div style="display:flex; align-items:center; margin-bottom:12px;"><div style="background:#222; border-radius:50%; width:36px; height:36px; margin-right:12px;"></div><div style="text-align:left;"><div style="background:#333; height:12px; width:90px; margin-bottom:6px; border-radius:2px;"></div><div style="background:#222; height:10px; width:50px; border-radius:2px;"></div></div></div><div style="padding:24% 0; color:#fff; font-family:monospace; font-size:12px; letter-spacing:1px;">[ LOADING INSTAGRAM RENDER... ]</div><div style="color:#ffffff; font-family:monospace; font-size:12px; padding-top:8px;">View Render on Instagram ↗</div></a><p style="color:#888; font-family:monospace; font-size:11px; margin-top:8px; text-align:center;"><a href="https://www.instagram.com/p/Dda2GXIAHSk/" style="color:#aaa; text-decoration:none;" target="_blank">@neetoosan // 3D Prop Render</a></p></div></blockquote>`
    },
    {
      id: 'DdXx0OSCCVC',
      title: '3D Game Prop / Asset Render II',
      category: 'Prop Art // Clay & Shading',
      date: 'Featured Showcase',
      tags: ['Game Prop', 'Clay Render', 'Sculpt', 'Blender'],
      permalink: 'https://www.instagram.com/p/DdXx0OSCCVC/',
      embedCode: `<blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/p/DdXx0OSCCVC/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style=" background:#0d0d0d; border:1px solid rgba(255,255,255,0.15); border-radius:4px; box-shadow:0 8px 30px rgba(0,0,0,0.8); margin: 0 auto; max-width:540px; min-width:300px; padding:0; width:100%;"><div style="padding:16px;"> <a href="https://www.instagram.com/p/DdXx0OSCCVC/?utm_source=ig_embed&amp;utm_campaign=loading" style=" background:#0d0d0d; line-height:0; padding:0; text-align:center; text-decoration:none; width:100%; display:block;" target="_blank"> <div style="display:flex; align-items:center; margin-bottom:12px;"><div style="background:#222; border-radius:50%; width:36px; height:36px; margin-right:12px;"></div><div style="text-align:left;"><div style="background:#333; height:12px; width:90px; margin-bottom:6px; border-radius:2px;"></div><div style="background:#222; height:10px; width:50px; border-radius:2px;"></div></div></div><div style="padding:24% 0; color:#fff; font-family:monospace; font-size:12px; letter-spacing:1px;">[ LOADING INSTAGRAM RENDER... ]</div><div style="color:#ffffff; font-family:monospace; font-size:12px; padding-top:8px;">View Render on Instagram ↗</div></a><p style="color:#888; font-family:monospace; font-size:11px; margin-top:8px; text-align:center;"><a href="https://www.instagram.com/p/DdXx0OSCCVC/" style="color:#aaa; text-decoration:none;" target="_blank">@neetoosan // 3D Prop Render</a></p></div></blockquote>`
    },
    {
      id: 'DdVaUFoDTJp',
      title: '3D Game Prop / Asset Render III',
      category: 'Asset Modeling // Edge Flow',
      date: 'Asset Archive',
      tags: ['Wireframe', 'Edge Flow', 'Game Ready', 'Optimized'],
      permalink: 'https://www.instagram.com/p/DdVaUFoDTJp/',
      embedCode: `<blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/p/DdVaUFoDTJp/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style=" background:#0d0d0d; border:1px solid rgba(255,255,255,0.15); border-radius:4px; box-shadow:0 8px 30px rgba(0,0,0,0.8); margin: 0 auto; max-width:540px; min-width:300px; padding:0; width:100%;"><div style="padding:16px;"> <a href="https://www.instagram.com/p/DdVaUFoDTJp/?utm_source=ig_embed&amp;utm_campaign=loading" style=" background:#0d0d0d; line-height:0; padding:0; text-align:center; text-decoration:none; width:100%; display:block;" target="_blank"> <div style="display:flex; align-items:center; margin-bottom:12px;"><div style="background:#222; border-radius:50%; width:36px; height:36px; margin-right:12px;"></div><div style="text-align:left;"><div style="background:#333; height:12px; width:90px; margin-bottom:6px; border-radius:2px;"></div><div style="background:#222; height:10px; width:50px; border-radius:2px;"></div></div></div><div style="padding:24% 0; color:#fff; font-family:monospace; font-size:12px; letter-spacing:1px;">[ LOADING INSTAGRAM RENDER... ]</div><div style="color:#ffffff; font-family:monospace; font-size:12px; padding-top:8px;">View Render on Instagram ↗</div></a><p style="color:#888; font-family:monospace; font-size:11px; margin-top:8px; text-align:center;"><a href="https://www.instagram.com/p/DdVaUFoDTJp/" style="color:#aaa; text-decoration:none;" target="_blank">@neetoosan // 3D Prop Render</a></p></div></blockquote>`
    },
    {
      id: 'DdT4TKbAAYs',
      title: '3D Game Prop / Asset Render IV',
      category: 'Concept Sculpt // High Poly',
      date: 'Asset Archive',
      tags: ['Concept Art', 'Sculpting', 'Props', 'Stylized'],
      permalink: 'https://www.instagram.com/p/DdT4TKbAAYs/',
      embedCode: `<blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/p/DdT4TKbAAYs/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style=" background:#0d0d0d; border:1px solid rgba(255,255,255,0.15); border-radius:4px; box-shadow:0 8px 30px rgba(0,0,0,0.8); margin: 0 auto; max-width:540px; min-width:300px; padding:0; width:100%;"><div style="padding:16px;"> <a href="https://www.instagram.com/p/DdT4TKbAAYs/?utm_source=ig_embed&amp;utm_campaign=loading" style=" background:#0d0d0d; line-height:0; padding:0; text-align:center; text-decoration:none; width:100%; display:block;" target="_blank"> <div style="display:flex; align-items:center; margin-bottom:12px;"><div style="background:#222; border-radius:50%; width:36px; height:36px; margin-right:12px;"></div><div style="text-align:left;"><div style="background:#333; height:12px; width:90px; margin-bottom:6px; border-radius:2px;"></div><div style="background:#222; height:10px; width:50px; border-radius:2px;"></div></div></div><div style="padding:24% 0; color:#fff; font-family:monospace; font-size:12px; letter-spacing:1px;">[ LOADING INSTAGRAM RENDER... ]</div><div style="color:#ffffff; font-family:monospace; font-size:12px; padding-top:8px;">View Render on Instagram ↗</div></a><p style="color:#888; font-family:monospace; font-size:11px; margin-top:8px; text-align:center;"><a href="https://www.instagram.com/p/DdT4TKbAAYs/" style="color:#aaa; text-decoration:none;" target="_blank">@neetoosan // 3D Prop Render</a></p></div></blockquote>`
    }
  ];

  let modalEl = null;
  let modalBodyEl = null;
  let currentActiveIndex = 0;

  function loadInstagramScript() {
    if (window.instgrm) {
      window.instgrm.Embeds.process();
      return;
    }
    if (!document.getElementById('instagram-embed-script')) {
      const script = document.createElement('script');
      script.id = 'instagram-embed-script';
      script.src = 'https://www.instagram.com/embed.js';
      script.async = true;
      script.onload = () => {
        if (window.instgrm) {
          window.instgrm.Embeds.process();
        }
      };
      document.body.appendChild(script);
    }
  }

  function renderGallery(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';

    PROP_RENDERS.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'prop-card';
      card.setAttribute('data-id', item.id);
      card.setAttribute('data-index', index);

      card.innerHTML = `
        <div class="prop-card__header">
          <div class="prop-card__id">PROP // ${String(index + 1).padStart(2, '0')}</div>
          <span class="prop-card__cat">${item.category}</span>
        </div>
        
        <div class="prop-card__embed-wrapper">
          ${item.embedCode}
        </div>

        <div class="prop-card__footer">
          <div class="prop-card__info">
            <h3 class="prop-card__title">${item.title}</h3>
            <div class="prop-card__tags">
              ${item.tags.map(tag => `<span class="prop-tag">#${tag}</span>`).join('')}
            </div>
          </div>
          <div class="prop-card__actions">
            <a href="${item.permalink}" target="_blank" rel="noopener" class="btn-ghost-sm" title="View original post on Instagram">
              IG ↗
            </a>
            <button type="button" class="btn-minimal-sm js-expand-render" data-index="${index}" aria-label="Expand 3D Render">
              EXPAND
            </button>
          </div>
        </div>
      `;

      container.appendChild(card);
    });

    // Wire expand buttons
    container.querySelectorAll('.js-expand-render').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.getAttribute('data-index'), 10);
        openModal(idx);
      });
    });

    // Initialize Instagram's embed engine
    loadInstagramScript();
  }

  function initModal() {
    modalEl = document.getElementById('renderModal');
    if (!modalEl) return;

    modalBodyEl = modalEl.querySelector('.modal-body');
    const closeBtn = modalEl.querySelector('.modal-close');
    const backdrop = modalEl.querySelector('.modal-backdrop');
    const prevBtn = modalEl.querySelector('.modal-nav-prev');
    const nextBtn = modalEl.querySelector('.modal-nav-next');

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (backdrop) backdrop.addEventListener('click', closeModal);
    if (prevBtn) prevBtn.addEventListener('click', () => navigateModal(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => navigateModal(1));

    window.addEventListener('keydown', (e) => {
      if (!modalEl.classList.contains('is-active')) return;
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') navigateModal(-1);
      if (e.key === 'ArrowRight') navigateModal(1);
    });
  }

  function openModal(index) {
    if (!modalEl || !modalBodyEl) return;
    currentActiveIndex = (index + PROP_RENDERS.length) % PROP_RENDERS.length;
    const item = PROP_RENDERS[currentActiveIndex];

    modalBodyEl.innerHTML = `
      <div class="modal-render-header">
        <div class="modal-render-badge">SPECIFICATION // ${String(currentActiveIndex + 1).padStart(2, '0')}</div>
        <h2 class="modal-render-title">${item.title}</h2>
        <div class="modal-render-meta">
          <span>${item.category}</span> · 
          <a href="${item.permalink}" target="_blank" rel="noopener" class="modal-ig-link">Direct Instagram Post ↗</a>
        </div>
      </div>
      <div class="modal-render-content">
        ${item.embedCode}
      </div>
      <div class="modal-render-tags">
        ${item.tags.map(t => `<span class="prop-tag">#${t}</span>`).join(' ')}
      </div>
    `;

    modalEl.classList.add('is-active');
    document.body.classList.add('modal-open');

    // Trigger Instagram renderer inside modal
    setTimeout(() => {
      if (window.instgrm) {
        window.instgrm.Embeds.process();
      }
    }, 50);
  }

  function navigateModal(direction) {
    openModal(currentActiveIndex + direction);
  }

  function closeModal() {
    if (!modalEl) return;
    modalEl.classList.remove('is-active');
    document.body.classList.remove('modal-open');
    if (modalBodyEl) modalBodyEl.innerHTML = '';
  }

  // Public API
  window.InstagramShowcase = {
    init: function () {
      renderGallery('instagram-grid');
      initModal();
    },
    refreshEmbeds: function () {
      loadInstagramScript();
    },
    getProfileUrl: function () {
      return INSTAGRAM_PROFILE_URL;
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    window.InstagramShowcase.init();
  });
})();
