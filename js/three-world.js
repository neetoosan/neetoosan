/**
 * ═════════════════════════════════════════════════════════════════════════════
 *   NEETOOSAN — 3D SPATIAL WORLD ENGINE (STUDIO MONOCHROME EDITION)
 *   Minimal B&W spatial world navigation, studio darkroom lighting,
 *   floating geometric prop plinths, and interactive clay/wireframe topology.
 * ═════════════════════════════════════════════════════════════════════════════
 */

(function () {
  'use strict';

  // ── Station Camera Configurations ──────────────────────────────────────────
  const STATIONS = {
    identity: {
      id: 'identity',
      index: 0,
      name: '01 // IDENTITY',
      camPos: { x: 0, y: 1.4, z: 8.2 },
      targetPos: { x: 0, y: 0.2, z: 0 },
      propPos: { x: 0, y: 0, z: 0 }
    },
    props: {
      id: 'props',
      index: 1,
      name: '02 // 3D GAME PROPS',
      camPos: { x: 8.5, y: 2.2, z: 6.0 },
      targetPos: { x: 8.5, y: 0.6, z: -1.0 },
      propPos: { x: 8.5, y: 0.4, z: -1.0 }
    },
    projects: {
      id: 'projects',
      index: 2,
      name: '03 // ENGINEERING',
      camPos: { x: -8.5, y: 2.0, z: 6.0 },
      targetPos: { x: -8.5, y: 0.5, z: -1.0 },
      propPos: { x: -8.5, y: 0.4, z: -1.0 }
    },
    about: {
      id: 'about',
      index: 3,
      name: '04 // ABOUT & MY STORY',
      camPos: { x: 0, y: 5.8, z: -3.5 },
      targetPos: { x: 0, y: 0.8, z: -9.5 },
      propPos: { x: 0, y: 1.0, z: -9.5 }
    },
    contact: {
      id: 'contact',
      index: 4,
      name: '05 // TRANSMISSION',
      camPos: { x: 0, y: -0.2, z: 6.5 },
      targetPos: { x: 0, y: 0.4, z: 0 },
      propPos: { x: 0, y: 0.3, z: 0 }
    }
  };

  // ── Engine State ───────────────────────────────────────────────────────────
  let scene, camera, renderer;
  let canvasEl;
  let isWireframeMode = false;
  let currentStationKey = 'identity';
  
  // Camera motion state
  const camCurrent = { x: 0, y: 1.4, z: 8.2 };
  const targetCurrent = { x: 0, y: 0.2, z: 0 };
  const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
  
  // Materials & Meshes
  let clayMaterial, wireframeMaterial, accentWireMaterial, floorMaterial;
  let gltfLoader;
  const propGroups = [];
  let floorGrid, ceilingGrid;
  let ambientLight, rimLight, keyLight, stationPointLight;
  let animId = null;
  let isRunning = true;

  // Check WebGL availability
  function isWebGLAvailable() {
    try {
      const canvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && 
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (e) {
      return false;
    }
  }

  function init() {
    canvasEl = document.getElementById('webgl-canvas');
    if (!canvasEl) return;

    if (!isWebGLAvailable()) {
      showFallback();
      return;
    }

    // 1. Scene & Atmosphere
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x060606);
    scene.fog = new THREE.FogExp2(0x060606, 0.045);

    // 2. Camera Setup
    const aspect = window.innerWidth / window.innerHeight;
    camera = new THREE.PerspectiveCamera(48, aspect, 0.1, 100);
    camera.position.set(camCurrent.x, camCurrent.y, camCurrent.z);
    camera.lookAt(targetCurrent.x, targetCurrent.y, targetCurrent.z);

    // 3. Renderer Setup
    renderer = new THREE.WebGLRenderer({
      canvas: canvasEl,
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false
    });
    
    // Performance: Clamp devicePixelRatio
    const isMobile = window.innerWidth < 768;
    renderer.setPixelRatio(isMobile ? 1.0 : Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    // 4. Lighting (Studio Darkroom Style)
    setupStudioLighting();

    // 5. Materials
    createMaterials();

    // 5b. GLTF Loader for CC0 low-poly tech/game props (Kenney.nl)
    gltfLoader = new THREE.GLTFLoader();

    // 6. Environment Grids & Plinths
    createEnvironment();

    // 7. Spatial Station 3D Props/Plinths
    createStationProps();

    // 8. Event Listeners
    setupEvents();

    // 9. Start Loop
    animate();
  }

  function setupStudioLighting() {
    // Soft overhead ambient
    ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
    scene.add(ambientLight);

    // Sharp key light from top-front
    keyLight = new THREE.DirectionalLight(0xffffff, 1.4);
    keyLight.position.set(5, 12, 8);
    scene.add(keyLight);

    // Rim / Back light for crisp specular edges
    rimLight = new THREE.DirectionalLight(0xffffff, 2.0);
    rimLight.position.set(-6, 8, -8);
    scene.add(rimLight);

    // Dynamic station focus spotlight
    stationPointLight = new THREE.PointLight(0xffffff, 1.5, 20);
    stationPointLight.position.set(0, 3, 0);
    scene.add(stationPointLight);
  }

  function createMaterials() {
    // Smooth Matte Studio Clay Shading
    clayMaterial = new THREE.MeshStandardMaterial({
      color: 0xe0e0e0,
      roughness: 0.65,
      metalness: 0.08,
      flatShading: false
    });

    // Darker pedestal material
    const plinthMaterial = new THREE.MeshStandardMaterial({
      color: 0x181818,
      roughness: 0.9,
      metalness: 0.2
    });

    // Crisp Topology Wireframe
    wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.75
    });

    accentWireMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });
  }

  function createEnvironment() {
    // Studio Floor Grid
    const gridSize = 80;
    const gridDivisions = 80;
    floorGrid = new THREE.GridHelper(gridSize, gridDivisions, 0x555555, 0x1c1c1c);
    floorGrid.position.y = -1.2;
    scene.add(floorGrid);

    // Ceiling Subtle Echo Grid
    ceilingGrid = new THREE.GridHelper(gridSize, 40, 0x333333, 0x121212);
    ceilingGrid.position.y = 8.0;
    scene.add(ceilingGrid);

    // Background Dust / Floating Coordinates Particles
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 50;
      positions[i + 1] = Math.random() * 12 - 1.2;
      positions[i + 2] = (Math.random() - 0.5) * 50;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const particleMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.06,
      transparent: true,
      opacity: 0.4
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);
  }

  // Loads a CC0 low-poly GLB prop (Kenney.nl), normalizes its scale to
  // targetSize on its longest axis, centers it at `position` within the
  // parent group, and applies the studio clay/wireframe materials so it
  // matches the rest of the scene regardless of the source model's textures.
  function loadPropModel(url, targetGroup, opts) {
    const {
      targetSize = 1.6,
      position = { x: 0, y: 0.6, z: 0 },
      rotY = 0,
      rotSpeedY = 0.01,
      rotSpeedX = 0
    } = opts || {};

    gltfLoader.load(url, (gltf) => {
      const root = gltf.scene;

      const box = new THREE.Box3().setFromObject(root);
      const size = new THREE.Vector3();
      box.getSize(size);
      const maxDim = Math.max(size.x, size.y, size.z) || 1;
      root.scale.setScalar(targetSize / maxDim);
      root.rotation.y = rotY;

      // Kenney's exported props often keep their offset from the original
      // shared scene/grid layout instead of being re-centered on their own
      // local origin. Re-center `root` inside a `pivot` wrapper so that the
      // pivot's own origin -- the point animate() spins around every frame
      // -- lands exactly on the mesh's visual center, not off to one side.
      const box2 = new THREE.Box3().setFromObject(root);
      const center = new THREE.Vector3();
      box2.getCenter(center);
      root.position.set(-center.x, -center.y, -center.z);

      root.traverse((child) => {
        if (child.isMesh) {
          child.material = isWireframeMode ? wireframeMaterial : clayMaterial;
        }
      });

      const pivot = new THREE.Group();
      pivot.position.set(position.x, position.y, position.z);
      pivot.userData = { rotSpeedY, rotSpeedX };
      pivot.add(root);
      targetGroup.add(pivot);
    }, undefined, (err) => {
      console.warn('[ThreeWorld] failed to load prop model:', url, err);
    });
  }

  function createStationProps() {
    // ── Station 01: Hero Identity Plinth & Gyroscope Core ──
    const group01 = new THREE.Group();
    group01.position.set(0, 0, 0);

    // Pedestal
    const baseGeo = new THREE.CylinderGeometry(1.6, 1.8, 0.4, 32);
    const baseMesh = new THREE.Mesh(baseGeo, clayMaterial);
    baseMesh.position.y = -1.0;
    group01.add(baseMesh);

    // Hero Prop: sleek sci-fi speeder craft
    loadPropModel('asset/models/speeder.glb', group01, {
      targetSize: 1.9,
      position: { x: 0, y: 0.6, z: 0 },
      rotY: Math.PI * 0.15,
      rotSpeedY: 0.008
    });

    // Transmission Beacon: satellite dish sharing this spatial area,
    // framed prominently when the camera drops low for Station 05
    loadPropModel('asset/models/satellite-dish.glb', group01, {
      targetSize: 1.3,
      position: { x: 0.9, y: 1.6, z: -0.6 },
      rotY: -0.5,
      rotSpeedY: 0.004
    });

    // Orbital Gyroscope Rings
    const ring1Geo = new THREE.TorusGeometry(1.8, 0.02, 16, 64);
    const ring1 = new THREE.Mesh(ring1Geo, wireframeMaterial);
    ring1.position.y = 0.6;
    ring1.userData = { rotSpeedX: 0.012, rotSpeedY: 0.006 };
    group01.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(2.2, 0.015, 16, 64);
    const ring2 = new THREE.Mesh(ring2Geo, accentWireMaterial);
    ring2.position.y = 0.6;
    ring2.rotation.x = Math.PI / 3;
    ring2.userData = { rotSpeedX: -0.008, rotSpeedZ: 0.01 };
    group01.add(ring2);

    scene.add(group01);
    propGroups.push(group01);

    // ── Station 02: 3D Game Props Showcase Plinth ──
    const group02 = new THREE.Group();
    group02.position.set(8.5, 0.4, -1.0);

    // Pedestal
    const propBaseGeo = new THREE.BoxGeometry(3.0, 0.3, 3.0);
    const propBaseMesh = new THREE.Mesh(propBaseGeo, clayMaterial);
    propBaseMesh.position.y = -1.05;
    group02.add(propBaseMesh);

    // Weapon loadout: blaster, ammo crate, grenade
    loadPropModel('asset/models/blaster.glb', group02, {
      targetSize: 1.7,
      position: { x: -0.35, y: 0.7, z: 0.3 },
      rotY: Math.PI * 0.15,
      rotSpeedY: 0.015
    });
    loadPropModel('asset/models/crate.glb', group02, {
      targetSize: 1.0,
      position: { x: 0.7, y: 0.3, z: -0.4 },
      rotY: 0.4,
      rotSpeedY: 0.006
    });
    loadPropModel('asset/models/grenade.glb', group02, {
      targetSize: 0.55,
      position: { x: -0.2, y: 0.25, z: -0.7 },
      rotY: 0.2,
      rotSpeedY: 0.02
    });

    // Cage Gizmo
    const cageGeo = new THREE.BoxGeometry(2.2, 2.2, 2.2);
    const cageMesh = new THREE.Mesh(cageGeo, wireframeMaterial);
    cageMesh.position.y = 0.7;
    cageMesh.userData = { rotSpeedY: -0.005, rotSpeedX: 0.005 };
    group02.add(cageMesh);

    scene.add(group02);
    propGroups.push(group02);

    // ── Station 03: Engineering & Real-Time Matchmaking Plinth ──
    const group03 = new THREE.Group();
    group03.position.set(-8.5, 0.4, -1.0);

    const engBase = new THREE.Mesh(new THREE.CylinderGeometry(1.8, 2.0, 0.3, 8), clayMaterial);
    engBase.position.y = -1.05;
    group03.add(engBase);

    // Mechanical turret representing backend systems/concurrency
    loadPropModel('asset/models/turret.glb', group03, {
      targetSize: 2.0,
      position: { x: 0, y: 0.6, z: 0 },
      rotY: 0,
      rotSpeedY: 0.01
    });

    const outerCore = new THREE.Mesh(new THREE.OctahedronGeometry(1.5, 1), wireframeMaterial);
    outerCore.position.y = 0.6;
    outerCore.userData = { rotSpeedY: -0.007, rotSpeedX: 0.006 };
    group03.add(outerCore);

    scene.add(group03);
    propGroups.push(group03);

    // ── Station 04: About & My Story — Astronaut Figure ──
    const group04 = new THREE.Group();
    group04.position.set(0, 1.0, -9.5);

    // Personal story prop: astronaut figure (positioned so its world-space
    // height matches the station's camera look-at target, camPos.y=0.8)
    loadPropModel('asset/models/astronaut.glb', group04, {
      targetSize: 2.3,
      position: { x: 0, y: -0.2, z: 0 },
      rotY: 0,
      rotSpeedY: 0.006
    });

    const obeliskRing = new THREE.Mesh(new THREE.TorusGeometry(2.4, 0.02, 16, 48), wireframeMaterial);
    obeliskRing.position.y = 0.0;
    obeliskRing.rotation.x = Math.PI / 2;
    obeliskRing.userData = { rotSpeedZ: 0.015 };
    group04.add(obeliskRing);

    scene.add(group04);
    propGroups.push(group04);
  }

  function setupEvents() {
    window.addEventListener('resize', onWindowResize);

    window.addEventListener('mousemove', (e) => {
      mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        isRunning = false;
      } else {
        isRunning = true;
        animate();
      }
    });
  }

  function onWindowResize() {
    if (!renderer || !camera) return;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const isMobile = width < 768;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
    renderer.setPixelRatio(isMobile ? 1.0 : Math.min(window.devicePixelRatio, 1.5));
  }

  function animate() {
    if (!isRunning) return;
    animId = requestAnimationFrame(animate);

    // Smooth mouse lerping
    mouse.x += (mouse.targetX - mouse.x) * 0.05;
    mouse.y += (mouse.targetY - mouse.y) * 0.05;

    // Station camera flight lerping
    const targetConfig = STATIONS[currentStationKey] || STATIONS.identity;

    // Add gentle parallax offset to camera position
    const desiredCamX = targetConfig.camPos.x + mouse.x * 0.6;
    const desiredCamY = targetConfig.camPos.y - mouse.y * 0.4;
    const desiredCamZ = targetConfig.camPos.z;

    camCurrent.x += (desiredCamX - camCurrent.x) * 0.045;
    camCurrent.y += (desiredCamY - camCurrent.y) * 0.045;
    camCurrent.z += (desiredCamZ - camCurrent.z) * 0.045;

    targetCurrent.x += (targetConfig.targetPos.x - targetCurrent.x) * 0.05;
    targetCurrent.y += (targetConfig.targetPos.y - targetCurrent.y) * 0.05;
    targetCurrent.z += (targetConfig.targetPos.z - targetCurrent.z) * 0.05;

    camera.position.set(camCurrent.x, camCurrent.y, camCurrent.z);
    camera.lookAt(targetCurrent.x, targetCurrent.y, targetCurrent.z);

    // Update dynamic station spotlight position
    if (stationPointLight && targetConfig.propPos) {
      stationPointLight.position.set(
        targetConfig.propPos.x,
        targetConfig.propPos.y + 2.5,
        targetConfig.propPos.z + 1.0
      );
    }

    // Rotate 3D props (direct children carry rotSpeed userData; loaded
    // GLTF models rotate as a single unit via their wrapping root node)
    propGroups.forEach(group => {
      group.children.forEach(child => {
        if (child.userData.rotSpeedX) child.rotation.x += child.userData.rotSpeedX;
        if (child.userData.rotSpeedY) child.rotation.y += child.userData.rotSpeedY;
        if (child.userData.rotSpeedZ) child.rotation.z += child.userData.rotSpeedZ;
      });
    });

    renderer.render(scene, camera);
  }

  function showFallback() {
    if (canvasEl) {
      canvasEl.style.display = 'none';
    }
    const fallback = document.getElementById('webgl-fallback');
    if (fallback) {
      fallback.style.display = 'block';
    }
  }

  // ── Public API ─────────────────────────────────────────────────────────────
  window.ThreeWorld = {
    init: init,

    flyToStation: function (stationKey) {
      if (!STATIONS[stationKey]) return;
      currentStationKey = stationKey;

      // Update UI feedback if present
      const hudStationLabel = document.getElementById('hudStationLabel');
      if (hudStationLabel) {
        hudStationLabel.textContent = STATIONS[stationKey].name;
      }
    },

    getCurrentStation: function () {
      return currentStationKey;
    },

    getStations: function () {
      return STATIONS;
    },

    toggleShadingMode: function () {
      isWireframeMode = !isWireframeMode;
      this.setWireframeMode(isWireframeMode);
      return isWireframeMode;
    },

    setWireframeMode: function (enableWireframe) {
      isWireframeMode = enableWireframe;

      // Swap materials across all prop meshes, including nested meshes
      // inside loaded GLTF prop models
      propGroups.forEach(group => {
        group.traverse(child => {
          if (child.isMesh && child.material !== accentWireMaterial) {
            child.material = isWireframeMode ? wireframeMaterial : clayMaterial;
          }
        });
      });

      // Update HUD toggle button label
      const toggleBtn = document.getElementById('toggleShadingBtn');
      if (toggleBtn) {
        toggleBtn.textContent = isWireframeMode ? '[ MODE // WIREFRAME ]' : '[ MODE // CLAY ]';
        toggleBtn.setAttribute('aria-pressed', isWireframeMode ? 'true' : 'false');
      }
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    window.ThreeWorld.init();
  });
})();
