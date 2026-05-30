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

/* ============ ENHANCED FORM FUNCTIONALITY ============ */
// Floating label support for inputs with placeholder-shown
const formInputs = document.querySelectorAll('.form-input');

formInputs.forEach((input) => {
  // Handle input value on initial load
  if (input.value) {
    input.classList.add('has-value');
  }

  // Handle input and change events
  input.addEventListener('input', () => {
    input.classList.toggle('has-value', input.value.length > 0);
  });

  input.addEventListener('change', () => {
    input.classList.toggle('has-value', input.value.length > 0);
  });

  // Ensure select elements with values show filled state
  if (input.tagName === 'SELECT') {
    if (input.value) {
      input.classList.add('has-value');
    }
    input.addEventListener('change', () => {
      input.classList.toggle('has-value', input.value.length > 0);
    });
  }
});

// Form submission handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Basic validation
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const company = document.getElementById('company').value;
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value;

    if (!name || !email || !company || !service || !message) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Por favor ingresa un email válido');
      return;
    }

    // Success feedback
    const submitBtn = contactForm.querySelector('.btn-submit');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>✓ Enviado correctamente</span>';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';

    // Reset after 3 seconds
    setTimeout(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      submitBtn.style.opacity = '1';
      contactForm.reset();
      formInputs.forEach((input) => input.classList.remove('has-value'));
    }, 3000);

    // Here you would normally send the form data to a server
    console.log('Form submitted:', {
      name,
      email,
      company,
      service,
      message,
      phone: document.getElementById('phone').value
    });
  });
}

// Keyboard navigation improvements
formInputs.forEach((input, index) => {
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      const inputs = Array.from(formInputs);
      const nextInput = inputs[index + 1];
      if (!e.shiftKey && nextInput) {
        e.preventDefault();
        nextInput.focus();
      }
    }
  });
});