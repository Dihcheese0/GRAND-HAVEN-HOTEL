/* grand-haven-hotel - script.js */

// ===== Hamburger Menu =====
(function () {
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (!hamburger || !mobileNav) return;

  hamburger.addEventListener('click', function () {
    const open = mobileNav.classList.toggle('open');
    hamburger.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open);
    // prevent body scroll when menu open
    document.body.style.overflow = open ? 'hidden' : '';
  });

  // Close on outside click
  document.addEventListener('click', function (e) {
    if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
      mobileNav.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
      document.body.style.overflow = '';
    }
  });

  // Close on link click
  mobileNav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      mobileNav.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
      document.body.style.overflow = '';
    });
  });
})();

// ===== Slideshow =====
(function () {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  if (!slides.length) return;

  let current = 0;
  let timer = null;

  function showSlide(n) {
    slides.forEach(function (s) { s.classList.remove('active'); });
    dots.forEach(function (d) { d.classList.remove('active'); });
    current = (n + slides.length) % slides.length;
    slides[current].classList.add('active');
    if (dots[current]) dots[current].classList.add('active');
  }

  function next() { showSlide(current + 1); }
  function prev() { showSlide(current - 1); }

  function startAuto() {
    timer = setInterval(next, 4000);
  }
  function resetAuto() {
    clearInterval(timer);
    startAuto();
  }

  const btnNext = document.querySelector('.slide-btn.next');
  const btnPrev = document.querySelector('.slide-btn.prev');
  if (btnNext) btnNext.addEventListener('click', function () { next(); resetAuto(); });
  if (btnPrev) btnPrev.addEventListener('click', function () { prev(); resetAuto(); });

  dots.forEach(function (dot, i) {
    dot.addEventListener('click', function () { showSlide(i); resetAuto(); });
  });

  showSlide(0);
  startAuto();
})();
