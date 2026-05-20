/* ==============================================================
   LE FIGARO - JS COMMUN
   ============================================================== */

// THEME JOUR/NUIT (init avant DOMContentLoaded pour éviter le flash)
(function() {
  try {
    var stored = localStorage.getItem('theme-maximator');
    if (stored === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  } catch (e) { /* localStorage indisponible, OK */ }
})();

// MENU MOBILE
document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.querySelector('.menu-toggle');
  const list = document.querySelector('.rubriques__list');
  if (toggle && list) {
    toggle.addEventListener('click', () => {
      list.classList.toggle('is-open');
    });
  }

  // BOUTON THEME (lune/soleil)
  const themeBtn = document.querySelector('.theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const root = document.documentElement;
      const isDark = root.getAttribute('data-theme') === 'dark';
      if (isDark) {
        root.removeAttribute('data-theme');
        try { localStorage.setItem('theme-maximator', 'light'); } catch (e) {}
      } else {
        root.setAttribute('data-theme', 'dark');
        try { localStorage.setItem('theme-maximator', 'dark'); } catch (e) {}
      }
    });
  }

  // ANIMATION DES BARRES (baromètre, schwartz, etc.) au scroll
  const bars = document.querySelectorAll('.barometer__bar-fill, .selfeval-bar__fill, .schwartz-card__strength span');
  if (bars.length && 'IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target.dataset.value || entry.target.style.getPropertyValue('--value');
          if (target) entry.target.style.width = target;
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    bars.forEach(b => {
      const val = b.dataset.value;
      if (val) b.style.width = '0';
      obs.observe(b);
    });
  }

  // FADE-IN des cartes au scroll
  const cards = document.querySelectorAll('.article-card, .article-grid__card, .left-rail__item, .mbti-cell, .maslow-row');
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    cards.forEach(c => {
      c.style.opacity = '0';
      c.style.transform = 'translateY(20px)';
      c.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      obs.observe(c);
    });
  }
});
