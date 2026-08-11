/**
 * ═════════════════════════════════════════════════════════════════════════════
 *   NEETOOSAN — 3D INTERACTIVE SPATIAL WORLD ENGINE (v2.0)
 *   Transforming portfolio navigation into an interactive 3D spatial flight 
 *   through layered scenes with distinct theme modes (CYBER, RPG, HOLODECK).
 * ═════════════════════════════════════════════════════════════════════════════
 */

(function () {
  'use strict';

  // ── Global & State Setup ────────────────────────────────────────────────
  let scene, camera, renderer;
  let canvasEl, tooltipEl, warpOverlayEl, sceneDockEl;
  let groundGrid, ceilingGrid, particleSystem;
  let ambientLight, pointLight1, pointLight2, pointLight3, dirLight;
  let interactiveNodes = [];
  let burstParticles = [];

  // Theme Definitions
  const THEMES = {
    cyber: {
      name: 'CYBER',
      bg: 0x060913,
      fog: 0x060913,
      fogDensity: 0.0075,
      gridPrimary: 0x00f3ff,
      gridSecondary: 0x0c2540,
      light1: 0x00f3ff,
      light2: 0x00ff9d,
      light3: 0xbd00ff,
      particleColors: [0x00f3ff, 0x00ff9d, 0xbd00ff, 0xffffff],
      nodeColors: [0x00f3ff, 0x00ff9d, 0xbd00ff, 0xff0055, 0xffb700, 0x00f3ff, 0x00ff9d, 0xff0055]
    },
    rpg: {
      name: 'RPG',
      bg: 0x1a0505,
      fog: 0x1a0505,
      fogDensity: 0.0085,
      gridPrimary: 0xe60045,
      gridSecondary: 0x440810,
      light1: 0xe60045,
      light2: 0xffb700,
      light3: 0xff0055,
      particleColors: [0xe60045, 0xffb700, 0xff5500, 0xffffff],
      nodeColors: [0xe60045, 0xffb700, 0xff0055, 0xe60045, 0xffb700, 0xff5500, 0xe60045, 0xffb700]
    },
    holodeck: {
      name: 'HOLODECK',
      bg: 0x02151a,
      fog: 0x02151a,
      fogDensity: 0.007,
      gridPrimary: 0x00ffaa,
      gridSecondary: 0x043540,
      light1: 0x00ffaa,
      light2: 0x00e1ff,
      light3: 0x7700ff,
      particleColors: [0x00ffaa, 0x00e1ff, 0xffffff, 0x7700ff],
      nodeColors: [0x00ffaa, 0x00e1ff, 0xffffff, 0x00ffaa, 0x00e1ff, 0x7700ff, 0x00ffaa, 0x00e1ff]
    }
  };

  let currentThemeKey = localStorage.getItem('n_theme') || 'cyber';
  if (!THEMES[currentThemeKey]) currentThemeKey = 'cyber';

  // Spatial Waypoints (Layered 3D Scenes in Space)
  const SPATIAL_SCENES = [
    { id: 'hero', name: '01 // SYS.INIT', pos: new THREE.Vector3(0, 0, 18), lookAt: new THREE.Vector3(0, 0, -10) },
    { id: 'about', name: '02 // CHAR.PROFILE', pos: new THREE.Vector3(-8, 3, -25), lookAt: new THREE.Vector3(4, 0, -42) },
    { id: 'stats', name: '03 // SYS.CAPABILITIES', pos: new THREE.Vector3(8, -2, -65), lookAt: new THREE.Vector3(-4, 0, -82) },
    { id: 'projects', name: '04 // MISSION.LOG', pos: new THREE.Vector3(0, 5, -105), lookAt: new THREE.Vector3(0, -2, -125) },
    { id: 'contact', name: '05 // SECURE.COMMS', pos: new THREE.Vector3(0, 0, -150), lookAt: new THREE.Vector3(0, 0, -170) }
  ];

  // Motion & Flight Engine State
  const flightState = {
    activeSceneIndex: 0,
    targetCamPos: SPATIAL_SCENES[0].pos.clone(),
    targetCamLook: SPATIAL_SCENES[0].lookAt.clone(),
    currentCamPos: SPATIAL_SCENES[0].pos.clone(),
    currentCamLook: SPATIAL_SCENES[0].lookAt.clone(),
    mouseX: 0,
    mouseY: 0,
    mouseSwayX: 0,
    mouseSwayY: 0,
    isWarping: false,
    scrollCooldown: false,
    mode: 'glide'
  };

  const isMobile = /Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent) || window.innerWidth < 768;

  // Raycasting
  const raycaster = new THREE.Raycaster();
  const mouseVec = new THREE.Vector2(-999, -999);
  let hoveredNode = null;

  // Node Definitions
  const nodeSpecs = [
    { name: 'NODE_01: PLAYBACK_MATCHMAKER', type: 'Icosahedron', desc: 'Real-time Skill Matchmaking, Flame Engine & WebSockets', pos: [-14, 4, -10] },
    { name: 'NODE_02: EYEBALANCE_VISION', type: 'TorusKnot', desc: 'Binocular Vision Therapy, Overlays & Riverpod', pos: [14, -3, -25] },
    { name: 'NODE_03: BLENDER_SCULPT_3D', type: 'Dodecahedron', desc: 'High-poly Character Sculpting, Rigging & Animation', pos: [-16, 5, -45] },
    { name: 'NODE_04: BACKEND_CORE', type: 'Icosahedron', desc: 'Python, FastAPI & PostgreSQL Architecture', pos: [15, 6, -65] },
    { name: 'NODE_05: AI_SAFEHUB', type: 'Octahedron', desc: 'AI-assisted Anonymous Case Reporting Platform', pos: [-12, -5, -85] },
    { name: 'NODE_06: CYBER_SECURITY', type: 'Tetrahedron', desc: 'Penetration Testing & Security Protocol', pos: [13, -4, -105] },
    { name: 'NODE_07: PLAYSPHERE_MEDIA', type: 'Sphere', desc: 'Media Streaming & Monetization Infrastructure', pos: [-15, -2, -125] },
    { name: 'NODE_08: ASSET_PIPELINES', type: 'Torus', desc: 'Production Asset Management Pipelines', pos: [12, 4, -145] }
  ];

  // ── Engine Initialization ──────────────────────────────────────────────
  function init() {
    if (typeof THREE === 'undefined') {
      setTimeout(init, 200);
      return;
    }

    createDOMOverlayElements();
    setupThreeScene();
    buildCyberGrid();
    buildParticleSystem();
    buildInteractiveNodes();
    setupEventListeners();
    setupHUDControls();
    init3DCardParallax();
    apply3DTheme(currentThemeKey);

    // Render loop
    requestAnimationFrame(animate);
    console.log('🚀 Neetoosan 3D Interactive Spatial Engine v2.0 Active');
  }

  // ── DOM Overlay Creation ───────────────────────────────────────────────
  function createDOMOverlayElements() {
    // 1. WebGL Canvas
    canvasEl = document.getElementById('cyber3dCanvas');
    if (!canvasEl) {
      canvasEl = document.createElement('canvas');
      canvasEl.id = 'cyber3dCanvas';
      canvasEl.className = 'cyber-3d-canvas';
      document.body.prepend(canvasEl);
    }

    // 2. Tooltip
    tooltipEl = document.querySelector('.cyber-3d-tooltip');
    if (!tooltipEl) {
      tooltipEl = document.createElement('div');
      tooltipEl.className = 'cyber-3d-tooltip';
      tooltipEl.innerHTML = `
        <div class="tooltip-header"><span class="tooltip-icon">◈</span> <span class="tooltip-title">SYSTEM NODE</span></div>
        <div class="tooltip-status">Node Status: Online</div>
      `;
      document.body.appendChild(tooltipEl);
    }

    // 3. Warp Overlay
    warpOverlayEl = document.querySelector('.warp-overlay');
    if (!warpOverlayEl) {
      warpOverlayEl = document.createElement('div');
      warpOverlayEl.className = 'warp-overlay';
      document.body.appendChild(warpOverlayEl);
    }

  }

  // ── Scene Setup ────────────────────────────────────────────────────────
  function setupThreeScene() {
    scene = new THREE.Scene();
    const t = THEMES[currentThemeKey];
    scene.fog = new THREE.FogExp2(t.fog, t.fogDensity);

    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.copy(flightState.currentCamPos);
    camera.lookAt(flightState.currentCamLook);

    renderer = new THREE.WebGLRenderer({
      canvas: canvasEl,
      antialias: !isMobile,
      alpha: true,
      powerPreference: 'high-performance'
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 2));

    // Lights
    ambientLight = new THREE.AmbientLight(t.light1, 0.45);
    scene.add(ambientLight);

    dirLight = new THREE.DirectionalLight(0xffffff, 0.7);
    dirLight.position.set(10, 20, 15);
    scene.add(dirLight);

    pointLight1 = new THREE.PointLight(t.light1, 2.5, 90);
    pointLight1.position.set(12, 10, -20);
    scene.add(pointLight1);

    pointLight2 = new THREE.PointLight(t.light2, 2.5, 90);
    pointLight2.position.set(-12, -10, -60);
    scene.add(pointLight2);

    pointLight3 = new THREE.PointLight(t.light3, 2.0, 90);
    pointLight3.position.set(0, 15, -110);
    scene.add(pointLight3);
  }

  // ── Grid & Tunnel Construction ────────────────────────────────────────
  function buildCyberGrid() {
    const t = THEMES[currentThemeKey];
    groundGrid = new THREE.GridHelper(260, 90, t.gridPrimary, t.gridSecondary);
    groundGrid.position.set(0, -14, -60);
    scene.add(groundGrid);

    ceilingGrid = new THREE.GridHelper(260, 90, t.gridPrimary, t.gridSecondary);
    ceilingGrid.position.set(0, 16, -60);
    scene.add(ceilingGrid);
  }

  // ── Starfield Particle System ──────────────────────────────────────────
  function buildParticleSystem() {
    const particleCount = isMobile ? 800 : 2200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const t = THEMES[currentThemeKey];
    const colorChoices = t.particleColors.map(hex => new THREE.Color(hex));

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 95;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 65;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 220 - 40;

      const c = colorChoices[Math.floor(Math.random() * colorChoices.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.4, 'rgba(0,243,255,0.8)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 32, 32);

    const texture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: 1.25,
      vertexColors: true,
      map: texture,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);
  }

  // ── Interactive Geometries ─────────────────────────────────────────────
  function buildInteractiveNodes() {
    interactiveNodes = [];
    const t = THEMES[currentThemeKey];

    nodeSpecs.forEach((spec, idx) => {
      let geo;
      // Morph geometry based on Theme
      if (currentThemeKey === 'rpg') {
        // Polyhedral dice & RPG artifacts
        switch (spec.type) {
          case 'Icosahedron': geo = new THREE.IcosahedronGeometry(2.3, 0); break; // D20
          case 'Dodecahedron': geo = new THREE.DodecahedronGeometry(2.3, 0); break; // D12
          case 'Octahedron': geo = new THREE.OctahedronGeometry(2.4, 0); break; // D8
          default: geo = new THREE.BoxGeometry(2.2, 2.2, 2.2); break; // RPG Chest/Cube
        }
      } else if (currentThemeKey === 'holodeck') {
        // Holographic Glass Prisms & Crystals
        switch (spec.type) {
          case 'Sphere': geo = new THREE.IcosahedronGeometry(2.2, 2); break;
          case 'TorusKnot': geo = new THREE.TorusGeometry(2.2, 0.4, 16, 32); break;
          default: geo = new THREE.OctahedronGeometry(2.5, 0); break;
        }
      } else {
        // Cyberpolyhedra
        switch (spec.type) {
          case 'Icosahedron': geo = new THREE.IcosahedronGeometry(2.2, 1); break;
          case 'TorusKnot': geo = new THREE.TorusKnotGeometry(1.6, 0.4, 64, 16); break;
          case 'Octahedron': geo = new THREE.OctahedronGeometry(2.4, 0); break;
          case 'Dodecahedron': geo = new THREE.DodecahedronGeometry(2.2, 0); break;
          case 'Sphere': geo = new THREE.SphereGeometry(2.0, 16, 16); break;
          case 'Tetrahedron': geo = new THREE.TetrahedronGeometry(2.5, 0); break;
          default: geo = new THREE.TorusGeometry(2.0, 0.5, 16, 32); break;
        }
      }

      const nodeColor = t.nodeColors[idx % t.nodeColors.length];

      const wireMat = new THREE.MeshStandardMaterial({
        color: nodeColor,
        wireframe: true,
        emissive: nodeColor,
        emissiveIntensity: 0.45,
        roughness: 0.15,
        metalness: 0.85
      });

      const mesh = new THREE.Mesh(geo, wireMat);
      mesh.position.set(...spec.pos);

      // Inner Core
      const coreGeo = new THREE.SphereGeometry(1.0, 12, 12);
      const coreMat = new THREE.MeshBasicMaterial({ color: nodeColor, transparent: true, opacity: 0.6 });
      const coreMesh = new THREE.Mesh(coreGeo, coreMat);
      mesh.add(coreMesh);

      // Orbit Ring
      const ringGeo = new THREE.RingGeometry(2.8, 2.95, 32);
      const ringMat = new THREE.MeshBasicMaterial({ color: nodeColor, side: THREE.DoubleSide, transparent: true, opacity: 0.35 });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 3;
      mesh.add(ringMesh);

      mesh.userData = {
        name: spec.name,
        type: spec.type,
        desc: spec.desc,
        baseColor: nodeColor,
        rotSpeedX: (Math.random() - 0.5) * 0.015 + 0.006,
        rotSpeedY: (Math.random() - 0.5) * 0.015 + 0.009,
        wireMat: wireMat
      };

      scene.add(mesh);
      interactiveNodes.push(mesh);
    });
  }

  // ── Dynamic Theme Switching Engine ─────────────────────────────────────
  function apply3DTheme(themeKey) {
    if (!THEMES[themeKey]) themeKey = 'cyber';
    currentThemeKey = themeKey;

    const t = THEMES[themeKey];

    // 1. Fog & Scene Background
    if (scene) {
      scene.fog.color.setHex(t.fog);
      scene.fog.density = t.fogDensity;
    }

    // 2. Lights
    if (ambientLight) ambientLight.color.setHex(t.light1);
    if (pointLight1) pointLight1.color.setHex(t.light1);
    if (pointLight2) pointLight2.color.setHex(t.light2);
    if (pointLight3) pointLight3.color.setHex(t.light3);

    // 3. Grid Colors
    if (groundGrid && ceilingGrid) {
      scene.remove(groundGrid);
      scene.remove(ceilingGrid);
      buildCyberGrid();
    }

    // 4. Particle System Colors
    if (particleSystem) {
      scene.remove(particleSystem);
      buildParticleSystem();
    }

    // 5. Rebuild Nodes with Theme Specific Geometry & Palette
    if (interactiveNodes.length > 0) {
      interactiveNodes.forEach(node => scene.remove(node));
      buildInteractiveNodes();
    }

    console.log(`🎨 3D Engine Theme Applied: ${t.name}`);
  }

  // Expose global setter for theme toggle
  window.set3DTheme = function (themeKey) {
    apply3DTheme(themeKey);
  };

  // ── 3D Spatial Scene Navigation ────────────────────────────────────────
  function jumpToSpatialScene(sceneIdx) {
    if (sceneIdx < 0 || sceneIdx >= SPATIAL_SCENES.length) return;

    flightState.activeSceneIndex = sceneIdx;
    const targetScene = SPATIAL_SCENES[sceneIdx];

    flightState.targetCamPos.copy(targetScene.pos);
    flightState.targetCamLook.copy(targetScene.lookAt);

    // Update Dock Active Class

    // Scroll DOM to section smoothly
    const sectionEl = document.getElementById(targetScene.id);
    if (sectionEl) {
      sectionEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  // ── Tab Switch Warp Light Effect (Only on Tab/Page Switch) ──────────────
  function triggerTabWarpEffect(targetUrl) {
    if (flightState.isWarping) return;
    flightState.isWarping = true;

    // Light flash overlay ONLY when switching tabs
    if (warpOverlayEl) {
      warpOverlayEl.classList.add('active');
    }

    if (typeof window.playSound === 'function') {
      window.playSound('quest');
    }

    setTimeout(() => {
      window.location.href = targetUrl;
    }, 380);
  }

  // ── Event Handlers ─────────────────────────────────────────────────────
  function setupEventListeners() {
    window.addEventListener('resize', onWindowResize, false);
    window.addEventListener('mousemove', onPointerMove, false);
    window.addEventListener('wheel', onWheelFlight, { passive: false });
    window.addEventListener('pointerdown', onPointerDown, false);

    // Touch Swipe Navigation for Mobile
    let touchStartY = 0;
    window.addEventListener('touchstart', (e) => { touchStartY = e.touches[0].clientY; }, { passive: true });
    window.addEventListener('touchend', (e) => {
      const touchEndY = e.changedTouches[0].clientY;
      const diff = touchStartY - touchEndY;
      if (Math.abs(diff) > 50) {
        if (diff > 0 && flightState.activeSceneIndex < SPATIAL_SCENES.length - 1) {
          jumpToSpatialScene(flightState.activeSceneIndex + 1);
        } else if (diff < 0 && flightState.activeSceneIndex > 0) {
          jumpToSpatialScene(flightState.activeSceneIndex - 1);
        }
      }
    }, { passive: true });

    // Keyboard Flight Controls (Up/Down Arrow, PageUp/PageDown)
    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        if (flightState.activeSceneIndex < SPATIAL_SCENES.length - 1) {
          e.preventDefault();
          jumpToSpatialScene(flightState.activeSceneIndex + 1);
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        if (flightState.activeSceneIndex > 0) {
          e.preventDefault();
          jumpToSpatialScene(flightState.activeSceneIndex - 1);
        }
      }
    });

    // Tab Navigation Link Intercept for Warp Light Effect
    document.querySelectorAll('.site-nav a, a[href]').forEach((link) => {
      const href = link.getAttribute('href');
      if (href && !href.startsWith('#') && !href.startsWith('javascript:') && !href.startsWith('mailto:') && !href.startsWith('http')) {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          triggerTabWarpEffect(href);
        });
      }
    });
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function onPointerMove(e) {
    flightState.mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    flightState.mouseY = -(e.clientY / window.innerHeight) * 2 + 1;

    mouseVec.x = flightState.mouseX;
    mouseVec.y = flightState.mouseY;

    if (hoveredNode && tooltipEl) {
      tooltipEl.style.left = `${e.clientX}px`;
      tooltipEl.style.top = `${e.clientY}px`;
    }
  }

  function onWheelFlight(e) {
    // Intercept scroll to turn simple page scroll into 3D Spatial Scene Flight
    if (flightState.scrollCooldown) return;

    if (e.deltaY > 25 && flightState.activeSceneIndex < SPATIAL_SCENES.length - 1) {
      flightState.scrollCooldown = true;
      jumpToSpatialScene(flightState.activeSceneIndex + 1);
      setTimeout(() => { flightState.scrollCooldown = false; }, 600);
    } else if (e.deltaY < -25 && flightState.activeSceneIndex > 0) {
      flightState.scrollCooldown = true;
      jumpToSpatialScene(flightState.activeSceneIndex - 1);
      setTimeout(() => { flightState.scrollCooldown = false; }, 600);
    }
  }

  function onPointerDown() {
    if (hoveredNode) {
      triggerParticleBurst(hoveredNode.position, hoveredNode.userData.baseColor);
      if (typeof window.playSound === 'function') window.playSound('quest');
      if (typeof window.addXp === 'function') window.addXp(10, `Explored ${hoveredNode.userData.name}`);
    }
  }

  function triggerParticleBurst(pos, colorHex) {
    const burstCount = 25;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(burstCount * 3);
    const velocities = [];

    for (let i = 0; i < burstCount; i++) {
      positions[i * 3] = pos.x;
      positions[i * 3 + 1] = pos.y;
      positions[i * 3 + 2] = pos.z;

      velocities.push(new THREE.Vector3(
        (Math.random() - 0.5) * 0.8,
        (Math.random() - 0.5) * 0.8,
        (Math.random() - 0.5) * 0.8
      ));
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
      color: colorHex,
      size: 0.8,
      transparent: true,
      opacity: 1.0,
      blending: THREE.AdditiveBlending
    });

    const pSystem = new THREE.Points(geometry, material);
    scene.add(pSystem);

    burstParticles.push({ system: pSystem, velocities: velocities, age: 0, maxAge: 40 });
  }

  // ── HUD Controls ───────────────────────────────────────────────────────
  function setupHUDControls() {
    const hudRight = document.querySelector('.hud-right');
    if (!hudRight || document.getElementById('hud3dModeBtn')) return;

    const controlsContainer = document.createElement('div');
    controlsContainer.className = 'hud-3d-controls';
    controlsContainer.innerHTML = `
      <button id="hud3dModeBtn" class="hud-3d-btn" title="Toggle 3D Flight View">&gt; 3D: GLIDE</button>
      <button id="hud3dResetBtn" class="hud-3d-btn" title="Reset Spatial Origin">&gt; RESET</button>
    `;

    hudRight.prepend(controlsContainer);

    document.getElementById('hud3dResetBtn').addEventListener('click', () => {
      jumpToSpatialScene(0);
    });
  }

  // ── 3D Card Parallax Integration ───────────────────────────────────────
  function init3DCardParallax() {
    const cards = document.querySelectorAll('.sh-card, .beyond-card, .project-card, .info-panel, .stat, .contact-card, .movie-card');

    cards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const cardX = e.clientX - rect.left - rect.width / 2;
        const cardY = e.clientY - rect.top - rect.height / 2;

        const tiltX = -(cardY / (rect.height / 2)) * 12;
        const tiltY = (cardX / (rect.width / 2)) * 12;

        card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(12px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
      });
    });
  }

  // ── Render Loop ────────────────────────────────────────────────────────
  function animate() {
    requestAnimationFrame(animate);

    // 1. Interpolate Camera Flight through Spatial Waypoints
    flightState.mouseSwayX += (flightState.mouseX * 3.5 - flightState.mouseSwayX) * 0.05;
    flightState.mouseSwayY += (flightState.mouseY * 2.0 - flightState.mouseSwayY) * 0.05;

    flightState.currentCamPos.x += (flightState.targetCamPos.x + flightState.mouseSwayX - flightState.currentCamPos.x) * 0.055;
    flightState.currentCamPos.y += (flightState.targetCamPos.y - flightState.mouseSwayY - flightState.currentCamPos.y) * 0.055;
    flightState.currentCamPos.z += (flightState.targetCamPos.z - flightState.currentCamPos.z) * 0.055;

    flightState.currentCamLook.x += (flightState.targetCamLook.x - flightState.currentCamLook.x) * 0.055;
    flightState.currentCamLook.y += (flightState.targetCamLook.y - flightState.currentCamLook.y) * 0.055;
    flightState.currentCamLook.z += (flightState.targetCamLook.z - flightState.currentCamLook.z) * 0.055;

    camera.position.copy(flightState.currentCamPos);
    camera.lookAt(flightState.currentCamLook);
    camera.rotation.z = -flightState.mouseX * 0.025;

    // 2. Animate Grid
    if (groundGrid && ceilingGrid) {
      groundGrid.position.z = (groundGrid.position.z + 0.15) % 20 - 60;
      ceilingGrid.position.z = (ceilingGrid.position.z + 0.15) % 20 - 60;
    }

    // 3. Animate Starfield
    if (particleSystem) {
      const positions = particleSystem.geometry.attributes.position.array;
      for (let i = 0; i < positions.length / 3; i++) {
        positions[i * 3 + 2] += 0.25;
        if (positions[i * 3 + 2] > camera.position.z + 10) {
          positions[i * 3 + 2] = camera.position.z - 200;
        }
      }
      particleSystem.geometry.attributes.position.needsUpdate = true;
    }

    // 4. Animate Interactive Geometries
    interactiveNodes.forEach((node) => {
      node.rotation.x += node.userData.rotSpeedX;
      node.rotation.y += node.userData.rotSpeedY;
    });

    // 5. Animate Particle Bursts
    for (let i = burstParticles.length - 1; i >= 0; i--) {
      const burst = burstParticles[i];
      const positions = burst.system.geometry.attributes.position.array;

      for (let j = 0; j < positions.length / 3; j++) {
        positions[j * 3] += burst.velocities[j].x;
        positions[j * 3 + 1] += burst.velocities[j].y;
        positions[j * 3 + 2] += burst.velocities[j].z;
      }
      burst.system.geometry.attributes.position.needsUpdate = true;

      burst.age++;
      burst.system.material.opacity = 1 - burst.age / burst.maxAge;

      if (burst.age >= burst.maxAge) {
        scene.remove(burst.system);
        burst.system.geometry.dispose();
        burst.system.material.dispose();
        burstParticles.splice(i, 1);
      }
    }

    // 6. Raycasting Interactivity
    raycaster.setFromCamera(mouseVec, camera);
    const intersects = raycaster.intersectObjects(interactiveNodes, false);

    if (intersects.length > 0) {
      const node = intersects[0].object;

      if (hoveredNode !== node) {
        if (hoveredNode) {
          hoveredNode.scale.set(1, 1, 1);
          hoveredNode.userData.wireMat.emissiveIntensity = 0.45;
        }

        hoveredNode = node;
        hoveredNode.scale.set(1.3, 1.3, 1.3);
        hoveredNode.userData.wireMat.emissiveIntensity = 1.0;
        document.body.style.cursor = 'pointer';

        if (tooltipEl) {
          tooltipEl.classList.add('active');
          const title = tooltipEl.querySelector('.tooltip-title');
          const status = tooltipEl.querySelector('.tooltip-status');
          if (title) title.textContent = node.userData.name;
          if (status) status.textContent = `[TYPE: ${node.userData.type}] ${node.userData.desc}`;
        }
      }
    } else {
      if (hoveredNode) {
        hoveredNode.scale.set(1, 1, 1);
        hoveredNode.userData.wireMat.emissiveIntensity = 0.45;
        hoveredNode = null;
        document.body.style.cursor = 'default';
        if (tooltipEl) tooltipEl.classList.remove('active');
      }
    }

    // Render Scene
    renderer.render(scene, camera);
  }

  // ── Auto Start ─────────────────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
