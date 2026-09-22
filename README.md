# Neetoosan

**Israel Oyekanmi** (aka **Neetoosan**) — Software Engineer × 3D Prop Artist

An interactive, single-page portfolio rendered as a navigable 3D spatial world. Instead of scrolling through static sections, visitors fly a camera between five "stations" — Identity, 3D Game Props, Engineering Systems, About, and Transmission — each staged with its own low-poly hard-surface prop, built with vanilla HTML/CSS/JavaScript and [Three.js](https://threejs.org/).

**Live site:** [neetoosan.tech](https://neetoosan.tech)

---

## Overview

This repository is the source for Israel's personal portfolio, presenting his dual focus as a **backend/mobile software engineer** and a **hard-surface 3D prop artist**. The site is built around a single spatial canvas (`index.html`) rather than traditional multi-page navigation — `about.html`, `contact.html`, `projects.html`, and `movies.html` exist only as redirect shims to the corresponding in-page station, preserved for backward-compatible/bookmarkable URLs.

### Design language

- **Studio monochrome** — a black-and-white "darkroom" aesthetic: matte clay-grey materials, crisp key/rim lighting, and wireframe topology overlays, evoking a 3D modeling studio rather than a typical colorful portfolio.
- **HUD / spatial-console framing** — station labels, mode toggles, and copy are styled like a sci-fi interface (`[ MODE // CLAY ]`, `01 // IDENTITY`), reinforcing the "navigating a 3D world" concept.
- **Zero emoji, line-icon system** — all iconography is a hand-authored inline SVG `<symbol>` sprite (`.icon` class), keeping the UI visually consistent in both light content and dark UI chrome.

---

## Features

- **Interactive 3D spatial world** (`js/three-world.js`) — a Three.js scene with five camera-driven "stations," each holding a procedurally-lit low-poly prop (a sci-fi speeder, a blaster/crate/grenade loadout, a mechanical turret, an astronaut figure, and a satellite dish) sourced from [Kenney.nl](https://kenney.nl)'s CC0 asset packs, recolored to match the site's clay/wireframe material system.
- **Clay ⇄ Wireframe shading toggle** — switch every prop in the scene between solid clay-grey shading and topology wireframe view.
- **Spatial navigation controller** (`js/main.js`) — keyboard shortcuts (`1`–`5`, arrow keys), a dock nav, and hash-based deep links (`#about`, `#props`, …) that drive both the DOM content panels and the 3D camera flight in sync.
- **Live Instagram render showcase** (`js/instagram-showcase.js`) — pulls curated 3D art posts into the "3D Game Props" station.
- **Engineering project matrix** — four featured production systems (see below) with tech-stack pill tags.
- **Capability matrix** — a two-column breakdown of 3D art pipeline skills vs. software engineering stack.
- **Direct transmission (contact) form** — `mailto:`-based contact form plus social/GitHub/LinkedIn/Instagram links.
- **Graceful WebGL fallback** — visitors on unsupported browsers/devices see a static fallback instead of a broken canvas.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Markup / Styling | Semantic HTML5, hand-written CSS3 (custom properties, no framework) |
| 3D Rendering | [Three.js](https://threejs.org/) r128 + `GLTFLoader` (vendored, no build step) |
| 3D Assets | Low-poly CC0 `.glb` models — [Kenney.nl](https://kenney.nl) Blaster Kit & Space Kit |
| Interactivity | Vanilla JavaScript (ES6+, no framework, no bundler) |
| Fonts | [Inter](https://fonts.google.com/specimen/Inter) + [Share Tech Mono](https://fonts.google.com/specimen/Share+Tech+Mono) (Google Fonts) |
| Hosting | Static hosting (GitHub Pages) |

No build tooling, package manager, or framework is required — the site is plain static files served as-is.

---

## Featured Engineering Projects

| Project | Category | Stack |
|---|---|---|
| **PlayBack** | Real-time competitive matchmaking platform with sub-100ms player pairing | Flame Engine, WebSockets, Flutter, Node.js |
| **EyeBalance** | Mobile binocular vision-therapy app with custom canvas stimulus overlays | Flutter, Riverpod, Canvas Overlays, Dart |
| **AI SafeHub** | Anonymous incident-reporting platform with zero-knowledge client-side encryption | Python, FastAPI, AES-GCM, PostgreSQL |
| **Asset Management System** | Enterprise inventory/loan tracker handling 3,000+ records with audit logging | Python GUI, SQLAlchemy, PostgreSQL, ReportLab |

---

## Project Structure

```text
neetoosan-1/
├── index.html                 # Main entry point — the entire 3D spatial site lives here
├── about.html                 # Redirect shim → index.html#about
├── contact.html                # Redirect shim → index.html#contact
├── projects.html               # Redirect shim → index.html#projects
├── movies.html                  # Redirect shim → index.html#identity
│
├── css/
│   └── style.css               # Full design system: tokens, layout, components, icons
│
├── js/
│   ├── three-world.js           # Three.js scene: stations, camera flight, prop loading, lighting
│   ├── main.js                  # Navigation controller: nav dock, keyboard shortcuts, hash routing
│   ├── instagram-showcase.js    # Instagram render feed embed logic
│   ├── vendor/
│   │   ├── three.min.js          # Three.js r128 (vendored)
│   │   └── GLTFLoader.js         # Matching GLTFLoader build
│   ├── game.js                  # (Inactive) legacy gamification/RPG easter-egg system
│   ├── loader.js                # (Inactive) legacy loader script
│   └── projects.js              # (Inactive) legacy projects-page script
│
├── asset/
│   ├── models/                  # CC0 low-poly .glb props (Kenney.nl) + license + texture
│   ├── favicon.png
│   └── *.png                    # Profile photo, character art, artifact renders
│
└── web.md                       # Historical design/spec notes from an earlier iteration
```

> **Note:** `js/game.js`, `js/loader.js`, and `js/projects.js` are not referenced by any HTML page in the current design — they remain from an earlier "gamified RPG" iteration of the site and are kept for reference rather than wired into the live build.

---

## Running Locally

No install step is required — this is a static site.

```bash
git clone https://github.com/neetoosan/neetoosan.git
cd neetoosan
```

Serve the directory with any static file server, for example:

```bash
python -m http.server 8080
# then open http://localhost:8080
```

or with Node:

```bash
npx serve .
```

> Opening `index.html` directly via `file://` will work for most content, but the GLTF prop loading and Instagram embeds require an HTTP(S) origin — always serve through a local server.

---

## 3D Assets & Licensing

The low-poly props used across the spatial world (`asset/models/*.glb`) are sourced from **Kenney.nl**'s Blaster Kit and Space Kit asset packs, licensed under **CC0 1.0 Universal** (public domain — free for personal, educational, and commercial use, no attribution required). See [`asset/models/LICENSE-kenney.txt`](asset/models/LICENSE-kenney.txt) for the full license text.

All other original code, design, copy, and custom artwork in this repository is © Israel Oyekanmi.

---

## Contact

- **Email:** [tobimolla44@gmail.com](mailto:tobimolla44@gmail.com)
- **GitHub:** [github.com/neetoosan](https://github.com/neetoosan)
- **Instagram:** [@neetoosan](https://www.instagram.com/neetoosan/)
- **LinkedIn:** [Israel Oyekanmi](https://www.linkedin.com/in/israel-oyekanmi-876148392/)

Open to 3D asset commissions, game prop partnerships, and software engineering opportunities.
