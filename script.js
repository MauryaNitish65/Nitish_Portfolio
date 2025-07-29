// Scroll to Top Button
const scrollBtn = document.getElementById('scrollToTopBtn');
window.addEventListener('scroll', () => {
  scrollBtn.style.display = window.scrollY > 400 ? 'block' : 'none';
});
scrollBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Lazy Image Loading
const lazyImages = document.querySelectorAll('img[loading="lazy"]');
lazyImages.forEach(img => {
  img.addEventListener('load', () => {
    img.classList.add('loaded');
  });
});

// Typing effect
const typingEl = document.querySelector('[data-typing]');
if (typingEl) {
  const words = JSON.parse(typingEl.dataset.typing);
  let wordIdx = 0, charIdx = 0, deleting = false;
  function type() {
    const currentWord = words[wordIdx];
    typingEl.textContent = currentWord.slice(0, charIdx) + (charIdx % 2 ? '|' : '');
    if (!deleting && charIdx === currentWord.length) {
      deleting = true;
      setTimeout(type, 1300);
    } else if (deleting && charIdx === 0) {
      deleting = false;
      wordIdx = (wordIdx + 1) % words.length;
      setTimeout(type, 400);
    } else {
      charIdx += deleting ? -1 : 1;
      setTimeout(type, deleting ? 40 : 90);
    }
  }
  type();
}

// Nav active link
const navLinks = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('section');
function onScroll() {
  const scrollPos = window.scrollY + 100;
  sections.forEach(sec => {
    if (scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
      navLinks.forEach(a => a.classList.remove('active'));
      const id = sec.getAttribute('id');
      document.querySelector(`nav a[href="#${id}"]`).classList.add('active');
    }
  });
}
window.addEventListener('scroll', onScroll);

// Reveal sections & animate progress
const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        if (entry.target.id === 'skills') {
          document.querySelectorAll('.progress').forEach(bar => {
            const val = bar.dataset.value;
            const inner = document.createElement('div');
            inner.className = 'progress-bar';
            inner.style.width = val + '%';
            bar.appendChild(inner);
          });
        }
      }
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll('.hidden').forEach(sec => revealObserver.observe(sec));

// Contact form dummy submission
const form = document.getElementById('contact-form');
form.addEventListener('submit', e => {
  e.preventDefault();
  alert('Thanks! Your message has been sent.');
  form.reset();
});

// Optional: Toggle dark mode
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}
