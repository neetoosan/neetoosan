# Neetoosan Portfolio Website

A professional multi-page portfolio website built with **HTML, CSS, and JavaScript**.

## Project Structure

```text
portfolio/
├── index.html
├── about.html
├── projects.html
├── contact.html
├── css/
│   └── style.css
├── js/
│   ├── main.js
│   └── projects.js
└── assets/
    └── README.txt
```

---

## 1) `index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="Neetoosan - Software Engineer portfolio showcasing Python, Flutter, backend, cybersecurity, and AI-driven projects." />
  <title>Neetoosan | Software Engineer</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css" />
</head>
<body>
  <header class="site-header">
    <div class="container nav-wrap">
      <a href="index.html" class="logo">NEETOOSAN<span>.</span></a>
      <button class="menu-toggle" id="menuToggle" aria-label="Toggle navigation">☰</button>
      <nav class="site-nav" id="siteNav">
        <a href="index.html" class="active">Home</a>
        <a href="about.html">About</a>
        <a href="projects.html">Projects</a>
        <a href="contact.html">Contact</a>
      </nav>
    </div>
  </header>

  <main>
    <section class="hero">
      <div class="container hero-grid">
        <div>
          <p class="eyebrow">Software Engineer • Mobile Developer • Backend Builder</p>
          <h1>Building secure, smart, and scalable digital products.</h1>
          <p class="hero-text">
            I’m Israel Oyekanmi, also known as <strong>Neetoosan</strong> — a software engineer focused on Python,
            Flutter, backend systems, AI integrations, and cybersecurity-aware development.
          </p>
          <div class="hero-actions">
            <a class="btn btn-primary" href="projects.html">View Projects</a>
            <a class="btn btn-secondary" href="contact.html">Hire Me</a>
          </div>
          <div class="hero-links">
            <a href="https://github.com/neetoosan" target="_blank" rel="noopener">GitHub</a>
            <a href="https://www.linkedin.com/in/israel-oyekanmi-876148392/" target="_blank" rel="noopener">LinkedIn</a>
            <a href="mailto:tobimolla44@gmail.com">Email</a>
          </div>
        </div>
        <div class="hero-card glass reveal">
          <span class="status-dot"></span>
          <p class="mini-title">Current Focus</p>
          <h3>Python • Flutter • FastAPI • Cybersecurity</h3>
          <p>
            Designing backend APIs, mobile applications, and AI-assisted workflows that solve real-world problems.
          </p>
          <div class="tag-list">
            <span>FastAPI</span>
            <span>Flutter</span>
            <span>PostgreSQL</span>
            <span>AI APIs</span>
            <span>Security</span>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-heading">
          <p class="eyebrow">What I Do</p>
          <h2>Engineering with performance, clarity, and purpose.</h2>
        </div>

        <div class="card-grid">
          <article class="feature-card reveal">
            <h3>Backend Engineering</h3>
            <p>I build clean REST APIs, secure authentication flows, and scalable service architectures using Python tools like FastAPI, Flask, and SQLAlchemy.</p>
          </article>
          <article class="feature-card reveal">
            <h3>Mobile Development</h3>
            <p>I create modern mobile apps with Flutter and growing Android/Kotlin experience, with focus on usability, responsiveness, and maintainable code.</p>
          </article>
          <article class="feature-card reveal">
            <h3>AI Integration</h3>
            <p>I integrate AI-powered features into user workflows, from classification and insights to smarter app experiences and automation.</p>
          </article>
          <article class="feature-card reveal">
            <h3>Cybersecurity Mindset</h3>
            <p>I approach products with secure API design, OWASP awareness, automation, and practical security thinking built into development.</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section alt-section">
      <div class="container stats-grid">
        <div class="stat reveal">
          <h3>4+</h3>
          <p>Production Flutter apps</p>
        </div>
        <div class="stat reveal">
          <h3>3000+</h3>
          <p>Assets handled in a backend system</p>
        </div>
        <div class="stat reveal">
          <h3>100+</h3>
          <p>Weekly loan records processed</p>
        </div>
        <div class="stat reveal">
          <h3>40%</h3>
          <p>Manual tracking reduction achieved</p>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container split-section">
        <div>
          <p class="eyebrow">Featured Work</p>
          <h2>Projects that reflect my engineering style.</h2>
          <p>
            From asset and loan management systems to AI-assisted anonymous reporting tools and media-driven mobile products,
            I enjoy building solutions that connect technical depth with real user needs.
          </p>
          <a class="btn btn-primary" href="projects.html">Explore My Work</a>
        </div>
        <div class="info-panel reveal">
          <div class="info-item">
            <strong>Asset Management</strong>
            <span>Python GUI, PostgreSQL, SQLAlchemy</span>
          </div>
          <div class="info-item">
            <strong>AI SafeHub</strong>
            <span>AI-assisted anonymous reporting platform</span>
          </div>
          <div class="info-item">
            <strong>PlaySphere</strong>
            <span>Flutter app for streaming and monetization</span>
          </div>
        </div>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="container footer-wrap">
      <p>© 2026 Neetoosan. Built with HTML, CSS & JavaScript.</p>
      <div>
        <a href="https://github.com/neetoosan" target="_blank" rel="noopener">GitHub</a>
        <a href="contact.html">Contact</a>
      </div>
    </div>
  </footer>

  <script src="js/main.js"></script>
</body>
</html>
```

---

## 2) `about.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="About Neetoosan - Software Engineer with experience in Python, Flutter, backend development, AI integration, and cybersecurity." />
  <title>About | Neetoosan</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css" />
</head>
<body>
  <header class="site-header">
    <div class="container nav-wrap">
      <a href="index.html" class="logo">NEETOOSAN<span>.</span></a>
      <button class="menu-toggle" id="menuToggle" aria-label="Toggle navigation">☰</button>
      <nav class="site-nav" id="siteNav">
        <a href="index.html">Home</a>
        <a href="about.html" class="active">About</a>
        <a href="projects.html">Projects</a>
        <a href="contact.html">Contact</a>
      </nav>
    </div>
  </header>

  <main>
    <section class="page-hero small">
      <div class="container">
        <p class="eyebrow">About Me</p>
        <h1>Engineer first. Problem-solver always.</h1>
        <p>
          I build software that is useful, secure, and grounded in practical workflows.
        </p>
      </div>
    </section>

    <section class="section">
      <div class="container about-grid">
        <div class="about-copy reveal">
          <h2>My Story</h2>
          <p>
            I’m Israel Oyekanmi, a software engineer with hands-on experience in mobile development,
            backend engineering, AI-assisted workflows, and cybersecurity-focused thinking.
          </p>
          <p>
            My work sits at the intersection of product building and problem solving — from creating backend systems for operations,
            to building mobile apps, to integrating intelligent features that make software more helpful and efficient.
          </p>
          <p>
            I enjoy turning ideas into polished, working systems with a strong focus on maintainability, user value, and real-world impact.
          </p>
        </div>

        <aside class="skills-panel reveal">
          <h3>Core Stack</h3>
          <div class="tag-list big">
            <span>Python</span>
            <span>FastAPI</span>
            <span>Django</span>
            <span>Flask</span>
            <span>Flutter</span>
            <span>Dart</span>
            <span>Kotlin</span>
            <span>PostgreSQL</span>
            <span>MySQL</span>
            <span>SQLAlchemy</span>
            <span>Docker</span>
            <span>Linux</span>
            <span>Flet</span>
            <span>PySide6</span>
            <span>C++</span>
            <span>Bash</span>
          </div>
        </aside>
      </div>
    </section>

    <section class="section alt-section">
      <div class="container timeline">
        <div class="section-heading">
          <p class="eyebrow">Experience</p>
          <h2>Work that shaped my growth.</h2>
        </div>

        <article class="timeline-item reveal">
          <div class="timeline-dot"></div>
          <div>
            <h3>Freelance Software Engineer</h3>
            <p class="muted">2021 – Present</p>
            <p>
              Built backend APIs, financial systems, asset tracking solutions, secure auth flows, and automation tools for real operational environments.
            </p>
          </div>
        </article>

        <article class="timeline-item reveal">
          <div class="timeline-dot"></div>
          <div>
            <h3>Python Instructor (Intern)</h3>
            <p class="muted">2022 – 2025</p>
            <p>
              Taught Python to students, designed practical exercises, and guided learners through mini-projects that improved confidence and completion rate.
            </p>
          </div>
        </article>
      </div>
    </section>

    <section class="section">
      <div class="container two-col">
        <div class="reveal">
          <h2>Education</h2>
          <p><strong>Miva Open University</strong></p>
          <p>B.Sc. Cybersecurity (In Progress)</p>
        </div>
        <div class="reveal">
          <h2>Certifications</h2>
          <ul class="clean-list">
            <li>Certified Phishing Prevention Specialist (2025)</li>
            <li>TryHackMe – 24 Days of Cybersecurity Challenge (2022)</li>
            <li>Udemy – Building Mobile Applications with Flutter (2022)</li>
            <li>Udemy – Introduction to Backend with Flutter (Firebase) (2022)</li>
          </ul>
        </div>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="container footer-wrap">
      <p>© 2026 Neetoosan. Built with HTML, CSS & JavaScript.</p>
      <div>
        <a href="https://github.com/neetoosan" target="_blank" rel="noopener">GitHub</a>
        <a href="contact.html">Contact</a>
      </div>
    </div>
  </footer>

  <script src="js/main.js"></script>
</body>
</html>
```

---

## 3) `projects.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="Projects by Neetoosan - backend systems, Flutter apps, AI platforms, and software engineering work." />
  <title>Projects | Neetoosan</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css" />
</head>
<body>
  <header class="site-header">
    <div class="container nav-wrap">
      <a href="index.html" class="logo">NEETOOSAN<span>.</span></a>
      <button class="menu-toggle" id="menuToggle" aria-label="Toggle navigation">☰</button>
      <nav class="site-nav" id="siteNav">
        <a href="index.html">Home</a>
        <a href="about.html">About</a>
        <a href="projects.html" class="active">Projects</a>
        <a href="contact.html">Contact</a>
      </nav>
    </div>
  </header>

  <main>
    <section class="page-hero small">
      <div class="container">
        <p class="eyebrow">Selected Projects</p>
        <h1>Built around real problems, not just pretty screens.</h1>
        <p>Explore software systems, mobile apps, AI-assisted tools, and backend-driven solutions.</p>
      </div>
    </section>

    <section class="section">
      <div class="container filter-row">
        <button class="filter-btn active" data-filter="all">All</button>
        <button class="filter-btn" data-filter="backend">Backend</button>
        <button class="filter-btn" data-filter="mobile">Mobile</button>
        <button class="filter-btn" data-filter="ai">AI</button>
        <button class="filter-btn" data-filter="security">Security</button>
      </div>

      <div class="container projects-grid" id="projectsGrid">
        <article class="project-card reveal" data-category="backend security">
          <div class="project-top">
            <span class="project-badge">Backend</span>
            <h3>Asset Management System</h3>
          </div>
          <p>
            A robust Python-based system supporting multiple users, custom permissions, PostgreSQL storage,
            and efficient data operations for large asset records.
          </p>
          <div class="tag-list">
            <span>Python</span>
            <span>PySide6</span>
            <span>PostgreSQL</span>
            <span>SQLAlchemy</span>
          </div>
          <a class="text-link" href="https://github.com/neetoosan/asset_management" target="_blank" rel="noopener">View Repository</a>
        </article>

        <article class="project-card reveal" data-category="backend">
          <div class="project-top">
            <span class="project-badge">Backend</span>
            <h3>Loan Management System</h3>
          </div>
          <p>
            A backend-driven financial platform with role-based access control, improved tracking efficiency,
            and practical workflow support for loan records.
          </p>
          <div class="tag-list">
            <span>Python</span>
            <span>FastAPI</span>
            <span>RBAC</span>
            <span>SQL</span>
          </div>
          <a class="text-link" href="https://github.com/neetoosan/LMS-PYTHON" target="_blank" rel="noopener">View Repository</a>
        </article>

        <article class="project-card reveal" data-category="ai security backend">
          <div class="project-top">
            <span class="project-badge">AI</span>
            <h3>AI SafeHub</h3>
          </div>
          <p>
            An anonymous reporting platform for schools and workplaces with secure architecture and AI-assisted categorization for urgent case visibility.
          </p>
          <div class="tag-list">
            <span>Python</span>
            <span>AI</span>
            <span>Secure Reporting</span>
            <span>Backend</span>
          </div>
          <a class="text-link" href="https://github.com/neetoosan/AI_safehub" target="_blank" rel="noopener">View Repository</a>
        </article>

        <article class="project-card reveal" data-category="mobile">
          <div class="project-top">
            <span class="project-badge">Mobile</span>
            <h3>PlaySphere</h3>
          </div>
          <p>
            A Flutter-based media platform that supports streaming, video content, and payment-powered access for creators and viewers.
          </p>
          <div class="tag-list">
            <span>Flutter</span>
            <span>Dart</span>
            <span>Payments</span>
            <span>Media</span>
          </div>
          <a class="text-link" href="https://github.com/neetoosan/playsphere" target="_blank" rel="noopener">View Repository</a>
        </article>

        <article class="project-card reveal" data-category="ai">
          <div class="project-top">
            <span class="project-badge">AI</span>
            <h3>Emotion Journal</h3>
          </div>
          <p>
            An AI-powered emotional journaling project using HTML, CSS, JavaScript, and Flask for a more supportive user experience.
          </p>
          <div class="tag-list">
            <span>HTML</span>
            <span>CSS</span>
            <span>JavaScript</span>
            <span>Flask</span>
          </div>
          <a class="text-link" href="https://github.com/kenzki63/emotion_journal" target="_blank" rel="noopener">View Repository</a>
        </article>

        <article class="project-card reveal" data-category="backend">
          <div class="project-top">
            <span class="project-badge">Data</span>
            <h3>COVID-19 Global Data Tracker</h3>
          </div>
          <p>
            A Python-driven data tracker project focused on collecting, organizing, and presenting global COVID-19 data clearly.
          </p>
          <div class="tag-list">
            <span>Python</span>
            <span>Data</span>
            <span>Tracking</span>
            <span>Analytics</span>
          </div>
          <a class="text-link" href="https://github.com/neetoosan/Covid-19-global-data-tracker" target="_blank" rel="noopener">View Repository</a>
        </article>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="container footer-wrap">
      <p>© 2026 Neetoosan. Built with HTML, CSS & JavaScript.</p>
      <div>
        <a href="https://github.com/neetoosan" target="_blank" rel="noopener">GitHub</a>
        <a href="contact.html">Contact</a>
      </div>
    </div>
  </footer>

  <script src="js/main.js"></script>
  <script src="js/projects.js"></script>
</body>
</html>
```

---

## 4) `contact.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="Contact Neetoosan for software engineering, backend, mobile, AI, and cybersecurity-related opportunities." />
  <title>Contact | Neetoosan</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css" />
</head>
<body>
  <header class="site-header">
    <div class="container nav-wrap">
      <a href="index.html" class="logo">NEETOOSAN<span>.</span></a>
      <button class="menu-toggle" id="menuToggle" aria-label="Toggle navigation">☰</button>
      <nav class="site-nav" id="siteNav">
        <a href="index.html">Home</a>
        <a href="about.html">About</a>
        <a href="projects.html">Projects</a>
        <a href="contact.html" class="active">Contact</a>
      </nav>
    </div>
  </header>

  <main>
    <section class="page-hero small">
      <div class="container">
        <p class="eyebrow">Let’s Work Together</p>
        <h1>Open to engineering opportunities and collaborations.</h1>
        <p>I’m available for freelance work, contract roles, and great product-building conversations.</p>
      </div>
    </section>

    <section class="section">
      <div class="container contact-grid">
        <div class="contact-card reveal">
          <h2>Contact Details</h2>
          <div class="contact-item">
            <span>Email</span>
            <a href="mailto:tobimolla44@gmail.com">tobimolla44@gmail.com</a>
          </div>
          <div class="contact-item">
            <span>GitHub</span>
            <a href="https://github.com/neetoosan" target="_blank" rel="noopener">github.com/neetoosan</a>
          </div>
          <div class="contact-item">
            <span>LinkedIn</span>
            <a href="https://www.linkedin.com/in/israel-oyekanmi-876148392/" target="_blank" rel="noopener">View Profile</a>
          </div>
          <div class="contact-item">
            <span>Location</span>
            <p>Lagos, Nigeria</p>
          </div>
        </div>

        <form class="contact-form reveal" id="contactForm">
          <h2>Quick Message</h2>
          <div class="form-group">
            <label for="name">Your Name</label>
            <input type="text" id="name" name="name" placeholder="Enter your name" required>
          </div>
          <div class="form-group">
            <label for="email">Your Email</label>
            <input type="email" id="email" name="email" placeholder="Enter your email" required>
          </div>
          <div class="form-group">
            <label for="message">Message</label>
            <textarea id="message" name="message" rows="6" placeholder="Tell me about your project or role" required></textarea>
          </div>
          <button type="submit" class="btn btn-primary">Send Message</button>
          <p class="form-note" id="formNote"></p>
        </form>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="container footer-wrap">
      <p>© 2026 Neetoosan. Built with HTML, CSS & JavaScript.</p>
      <div>
        <a href="https://github.com/neetoosan" target="_blank" rel="noopener">GitHub</a>
        <a href="index.html">Home</a>
      </div>
    </div>
  </footer>

  <script src="js/main.js"></script>
</body>
</html>
```

---

## 5) `css/style.css`

```css
:root {
  --bg: #08111f;
  --bg-soft: #0e1a2f;
  --panel: rgba(255, 255, 255, 0.06);
  --panel-strong: #101d34;
  --text: #f5f7fb;
  --muted: #aeb9cc;
  --line: rgba(255, 255, 255, 0.08);
  --accent: #4ade80;
  --accent-dark: #22c55e;
  --shadow: 0 20px 60px rgba(0, 0, 0, 0.35);
  --radius: 20px;
  --max-width: 1180px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Inter', sans-serif;
  background:
    radial-gradient(circle at top left, rgba(74, 222, 128, 0.14), transparent 20%),
    radial-gradient(circle at right center, rgba(59, 130, 246, 0.10), transparent 20%),
    var(--bg);
  color: var(--text);
  line-height: 1.7;
}

img {
  max-width: 100%;
  display: block;
}

a {
  color: inherit;
  text-decoration: none;
}

.container {
  width: min(92%, var(--max-width));
  margin: 0 auto;
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 1000;
  backdrop-filter: blur(14px);
  background: rgba(8, 17, 31, 0.75);
  border-bottom: 1px solid var(--line);
}

.nav-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 78px;
}

.logo {
  font-size: 1.35rem;
  font-weight: 800;
  letter-spacing: 0.08em;
}

.logo span {
  color: var(--accent);
}

.site-nav {
  display: flex;
  gap: 1.25rem;
  align-items: center;
}

.site-nav a {
  color: var(--muted);
  font-weight: 500;
  transition: 0.25s ease;
}

.site-nav a:hover,
.site-nav a.active {
  color: var(--text);
}

.menu-toggle {
  display: none;
  background: none;
  border: none;
  color: var(--text);
  font-size: 1.7rem;
  cursor: pointer;
}

.hero,
.page-hero {
  padding: 6rem 0 4rem;
}

.page-hero.small {
  padding-bottom: 2rem;
}

.hero-grid,
.about-grid,
.contact-grid,
.split-section,
.two-col {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 2rem;
  align-items: center;
}

.hero h1,
.page-hero h1 {
  font-size: clamp(2.4rem, 5vw, 4.8rem);
  line-height: 1.08;
  margin: 0.6rem 0 1rem;
}

.hero-text,
.page-hero p,
.about-copy p,
.feature-card p,
.project-card p,
.contact-card p {
  color: var(--muted);
}

.eyebrow {
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-size: 0.82rem;
  font-weight: 700;
}

.hero-actions,
.hero-links,
.footer-wrap,
.filter-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
}

.hero-actions {
  margin: 1.6rem 0 1rem;
}

.hero-links a,
.text-link {
  color: var(--accent);
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.95rem 1.35rem;
  border-radius: 999px;
  font-weight: 700;
  transition: 0.25s ease;
  border: 1px solid transparent;
}

.btn:hover {
  transform: translateY(-2px);
}

.btn-primary {
  background: linear-gradient(135deg, var(--accent), var(--accent-dark));
  color: #07111f;
}

.btn-secondary {
  border-color: var(--line);
  background: rgba(255, 255, 255, 0.03);
}

.glass,
.feature-card,
.project-card,
.contact-card,
.contact-form,
.skills-panel,
.info-panel,
.stat {
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
}

.hero-card,
.contact-card,
.contact-form,
.skills-panel,
.info-panel {
  padding: 2rem;
}

.feature-card,
.project-card,
.stat {
  padding: 1.6rem;
}

.status-dot {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 24px var(--accent);
  margin-bottom: 1rem;
}

.mini-title,
.muted,
.form-note {
  color: var(--muted);
}

.section {
  padding: 4rem 0;
}

.alt-section {
  background: rgba(255, 255, 255, 0.02);
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}

.section-heading {
  margin-bottom: 2rem;
}

.section-heading h2,
.about-copy h2,
.contact-card h2,
.contact-form h2,
.two-col h2 {
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  margin-top: 0.45rem;
}

.card-grid,
.projects-grid,
.stats-grid {
  display: grid;
  gap: 1.5rem;
}

.card-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.projects-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.stats-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.feature-card h3,
.project-card h3,
.stat h3,
.hero-card h3,
.timeline-item h3 {
  margin-bottom: 0.6rem;
}

.stat h3 {
  font-size: 2rem;
  color: var(--accent);
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  margin-top: 1rem;
}

.tag-list span,
.project-badge,
.filter-btn {
  border: 1px solid var(--line);
  background: rgba(255, 255, 255, 0.04);
  color: var(--muted);
  padding: 0.45rem 0.8rem;
  border-radius: 999px;
  font-size: 0.9rem;
}

.tag-list.big span {
  font-size: 0.95rem;
}

.info-panel {
  display: grid;
  gap: 1rem;
}

.info-item {
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--line);
}

.info-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.timeline {
  display: grid;
  gap: 1.5rem;
}

.timeline-item {
  display: grid;
  grid-template-columns: 26px 1fr;
  gap: 1rem;
  align-items: start;
}

.timeline-dot {
  width: 14px;
  height: 14px;
  margin-top: 0.45rem;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 18px var(--accent);
}

.clean-list {
  list-style: none;
  display: grid;
  gap: 0.75rem;
  color: var(--muted);
}

.filter-row {
  margin-bottom: 2rem;
}

.filter-btn {
  cursor: pointer;
  transition: 0.25s ease;
}

.filter-btn.active,
.filter-btn:hover,
.project-badge {
  color: var(--text);
  border-color: rgba(74, 222, 128, 0.35);
}

.project-top {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  margin-bottom: 1rem;
}

.contact-item {
  margin-top: 1rem;
}

.contact-item span,
label {
  display: block;
  font-size: 0.9rem;
  color: var(--muted);
  margin-bottom: 0.35rem;
}

.form-group {
  margin-bottom: 1rem;
}

input,
textarea {
  width: 100%;
  padding: 0.95rem 1rem;
  border-radius: 14px;
  border: 1px solid var(--line);
  background: rgba(255, 255, 255, 0.03);
  color: var(--text);
  font: inherit;
}

input:focus,
textarea:focus {
  outline: 2px solid rgba(74, 222, 128, 0.25);
  border-color: rgba(74, 222, 128, 0.45);
}

.site-footer {
  padding: 1.5rem 0 2.5rem;
  border-top: 1px solid var(--line);
}

.footer-wrap {
  justify-content: space-between;
}

.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}

.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

.hidden {
  display: none;
}

@media (max-width: 1024px) {
  .card-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .projects-grid,
  .stats-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 768px) {
  .menu-toggle {
    display: block;
  }

  .site-nav {
    position: absolute;
    top: 78px;
    right: 4%;
    width: min(260px, 92vw);
    background: #0d1729;
    border: 1px solid var(--line);
    border-radius: 18px;
    padding: 1rem;
    display: none;
    flex-direction: column;
    align-items: flex-start;
  }

  .site-nav.show {
    display: flex;
  }

  .hero-grid,
  .about-grid,
  .contact-grid,
  .split-section,
  .two-col {
    grid-template-columns: 1fr;
  }

  .card-grid,
  .projects-grid,
  .stats-grid {
    grid-template-columns: 1fr;
  }

  .hero,
  .page-hero {
    padding-top: 4.5rem;
  }

  .footer-wrap {
    flex-direction: column;
    align-items: flex-start;
  }
}
```

---

## 6) `js/main.js`

```javascript
const menuToggle = document.getElementById('menuToggle');
const siteNav = document.getElementById('siteNav');

if (menuToggle && siteNav) {
  menuToggle.addEventListener('click', () => {
    siteNav.classList.toggle('show');
  });
}

const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
  revealElements.forEach((element) => {
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      element.classList.add('visible');
    }
  });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

if (contactForm && formNote) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    formNote.textContent = 'Thanks for reaching out. Connect your form to Formspree, EmailJS, or your backend to receive messages.';
    contactForm.reset();
  });
}
```

---

## 7) `js/projects.js`

```javascript
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');

    const filter = button.dataset.filter;

    projectCards.forEach((card) => {
      const category = card.dataset.category;
      if (filter === 'all' || category.includes(filter)) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});
```

---

## Notes for Deployment

* Replace placeholder texts or add screenshots in an `assets/` folder later.
* Host on **GitHub Pages**, **Netlify**, or **Vercel**.
* Optional next upgrades:

  * Add a downloadable CV button
  * Add dark/light theme switcher
  * Add project screenshots
  * Connect contact form to Formspree or EmailJS
  * Add a testimonials page or blog page

## Recommended Next Step

Create a new GitHub repository named something like `portfolio-website`, paste these files into the correct folders, and deploy it with GitHub Pages.
