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
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!contactForm.action || contactForm.action.includes('YOUR_FORMSPREE_ID')) {
      formNote.textContent = 'Action required: Please replace "YOUR_FORMSPREE_ID" in the HTML with your actual Formspree endpoint ID.';
      formNote.style.color = '#ef4444';
      return;
    }

    const btn = contactForm.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Sending... 🛸';
    btn.disabled = true;

    try {
      const response = await fetch(contactForm.action, {
        method: contactForm.method,
        body: new FormData(contactForm),
        headers: {
            'Accept': 'application/json'
        }
      });
      if (response.ok) {
        formNote.textContent = 'Thanks! Your transmission has been successfully blasted into my inbox. 🚀';
        formNote.style.color = 'var(--accent)';
        contactForm.reset();
      } else {
        formNote.textContent = 'Oops! The transmission got lost in space. (Formspree error)';
        formNote.style.color = '#ef4444';
      }
    } catch (error) {
      formNote.textContent = 'Oops! There was a network error sending your message.';
      formNote.style.color = '#ef4444';
    } finally {
      btn.textContent = originalText;
      btn.disabled = false;
    }
  });
}