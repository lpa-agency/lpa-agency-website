/* LPA Agency — small progressive enhancements. No tracking, no external requests. */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Header shadow on scroll */
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 8); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* Mobile navigation */
  var nav = document.getElementById('site-nav');
  var toggle = document.querySelector('.nav-toggle');
  function setMenu(open) {
    if (!nav || !toggle) return;
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.style.overflow = open ? 'hidden' : '';
  }
  if (toggle) {
    toggle.addEventListener('click', function () {
      setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });
  }

  /* Services dropdown */
  var dropdowns = document.querySelectorAll('.has-dropdown');
  dropdowns.forEach(function (dd) {
    var btn = dd.querySelector('button');
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = !dd.classList.contains('is-open');
      dd.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', String(open));
    });
  });
  document.addEventListener('click', function () {
    dropdowns.forEach(function (dd) {
      dd.classList.remove('is-open');
      dd.querySelector('button').setAttribute('aria-expanded', 'false');
    });
  });

  /* Close menus after choosing an in-page link */
  document.querySelectorAll('.nav a[href*="#"]').forEach(function (a) {
    a.addEventListener('click', function () { setMenu(false); });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    setMenu(false);
    dropdowns.forEach(function (dd) {
      dd.classList.remove('is-open');
      dd.querySelector('button').setAttribute('aria-expanded', 'false');
    });
  });

  /* Logo marquee: duplicate once for a seamless loop */
  var track = document.getElementById('logo-track');
  if (track) {
    Array.prototype.slice.call(track.children).forEach(function (tile) {
      var clone = tile.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      clone.querySelector('img').alt = '';
      track.appendChild(clone);
    });
  }

  /* Reveal on scroll */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    revealEls.forEach(function (el, i) {
      el.style.transitionDelay = (i % 4) * 70 + 'ms';
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* Report carousel */
  document.querySelectorAll('[data-carousel]').forEach(function (carousel) {
    var t = carousel.querySelector('[data-track]');
    function step(dir) {
      var card = t.children[0];
      var amount = card ? card.getBoundingClientRect().width + 20 : t.clientWidth * 0.8;
      t.scrollBy({ left: dir * amount, behavior: reduceMotion ? 'auto' : 'smooth' });
    }
    carousel.querySelector('[data-prev]').addEventListener('click', function () { step(-1); });
    carousel.querySelector('[data-next]').addEventListener('click', function () { step(1); });
  });

  /* Testimonial videos: load only when the visitor presses play */
  document.querySelectorAll('[data-video]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var card = btn.parentElement;
      document.querySelectorAll('.video-card video').forEach(function (v) { v.pause(); });
      var video = document.createElement('video');
      video.src = btn.getAttribute('data-video');
      video.controls = true;
      video.playsInline = true;
      video.setAttribute('playsinline', '');
      video.poster = card.querySelector('img').getAttribute('src');
      card.replaceChild(video, btn);
      video.play().catch(function () {});
      video.focus();
    });
  });

  /* Lightbox */
  var dialog = document.getElementById('lightbox');
  if (dialog && typeof dialog.showModal === 'function') {
    var img = dialog.querySelector('img');
    document.querySelectorAll('[data-lightbox]').forEach(function (trigger) {
      trigger.addEventListener('click', function () {
        img.src = trigger.getAttribute('data-lightbox');
        img.alt = trigger.getAttribute('data-alt') || '';
        dialog.showModal();
      });
    });
    dialog.querySelector('.lightbox-close').addEventListener('click', function () { dialog.close(); });
    dialog.addEventListener('click', function (e) { if (e.target === dialog) dialog.close(); });
  }

  /* CTA background video: play only while visible, never with reduced motion */
  var ctaVideo = document.querySelector('[data-autoplay]');
  if (ctaVideo && !reduceMotion && 'IntersectionObserver' in window) {
    var vio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          if (ctaVideo.preload === 'none') { ctaVideo.preload = 'auto'; ctaVideo.load(); }
          ctaVideo.play().catch(function () {});
        } else {
          ctaVideo.pause();
        }
      });
    }, { threshold: 0.2 });
    vio.observe(ctaVideo);
  }

  /* Current year */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();
