const revealElements = document.querySelectorAll('[data-reveal]');
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.menu');
const navLinks = document.querySelectorAll('.menu a');
const themeToggle = document.querySelector('.theme-toggle');
const scrollTopBtn = document.querySelector('.scroll-top');

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.16,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('is-visible'));
}

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const sections = Array.from(document.querySelectorAll('main section[id]'));
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    navLinks.forEach((link) => {
      const targetId = link.getAttribute('href')?.slice(1);
      link.classList.toggle('active', targetId === entry.target.id);
    });
  });
}, {
  threshold: 0.45
});

sections.forEach((section) => sectionObserver.observe(section));

// Scroll-to-top button behavior
function checkScrollTop() {
  if (!scrollTopBtn) return;
  if (window.scrollY > 320) {
    scrollTopBtn.classList.add('show');
  } else {
    scrollTopBtn.classList.remove('show');
  }
}

window.addEventListener('scroll', checkScrollTop, { passive: true });
checkScrollTop();

if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Theme toggle (dark mode)
function isMobileViewport() {
  return window.innerWidth <= 560;
}

function applyTheme(theme) {
  // En móvil, SIEMPRE light mode
  if (isMobileViewport()) {
    document.body.classList.remove('dark');
    return;
  }
  
  if (theme === 'dark') document.body.classList.add('dark');
  else document.body.classList.remove('dark');
  if (themeToggle) {
    themeToggle.setAttribute('aria-pressed', String(theme === 'dark'));
    themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro');
    themeToggle.title = theme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro';
  }
}

function initTheme() {
  try {
    // En móvil, siempre light
    if (isMobileViewport()) {
      applyTheme('light');
      return;
    }
    
    const saved = localStorage.getItem('site-theme');
    if (saved) {
      applyTheme(saved);
      return;
    }
    // default: follow media query
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark ? 'dark' : 'light');
  } catch (e) {
    applyTheme('light');
  }
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    // No permitir cambio si es móvil
    if (isMobileViewport()) return;
    
    const isDark = document.body.classList.contains('dark');
    const next = isDark ? 'light' : 'dark';
    applyTheme(next);
    try { localStorage.setItem('site-theme', next); } catch (e) {}
  });
}

// Detectar cambios de viewport (redimensionamiento)
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    if (isMobileViewport()) {
      document.body.classList.remove('dark');
    }
  }, 250);
}, { passive: true });

initTheme();