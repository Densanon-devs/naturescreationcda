document.addEventListener('DOMContentLoaded', function () {
  // ── Mobile Menu Toggle ──
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', function () {
      menuToggle.classList.toggle('active');
      mainNav.classList.toggle('open');
      document.body.style.overflow = mainNav.classList.contains('open') ? 'hidden' : '';
    });
  }

  // ── Mobile Dropdown Toggle ──
  const dropdowns = document.querySelectorAll('.nav-dropdown');

  dropdowns.forEach(function (dropdown) {
    const link = dropdown.querySelector('a');
    if (!link) return;

    link.addEventListener('click', function (e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        dropdown.classList.toggle('open');
      }
    });
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 768) {
      dropdowns.forEach(function (d) { d.classList.remove('open'); });
      if (menuToggle) menuToggle.classList.remove('active');
      if (mainNav) mainNav.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  // ── Header Scroll Effect ──
  const header = document.querySelector('.site-header');

  function handleScroll() {
    if (!header) return;
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll);
  handleScroll();

  // ── FAQ Accordion ──
  const faqQuestions = document.querySelectorAll('.faq-item .faq-question');

  faqQuestions.forEach(function (question) {
    question.addEventListener('click', function () {
      const parent = question.closest('.faq-item');
      const isOpen = parent.classList.contains('open');

      // Close all FAQ items
      document.querySelectorAll('.faq-item').forEach(function (item) {
        item.classList.remove('open');
      });

      // Toggle the clicked item
      if (!isOpen) {
        parent.classList.add('open');
      }
    });
  });

  // ── Gallery Filter ──
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterButtons.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      var filter = btn.getAttribute('data-filter');

      galleryItems.forEach(function (item) {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // ── Contact Form Validation ──
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var isValid = true;
      var required = contactForm.querySelectorAll('[required]');

      required.forEach(function (field) {
        if (!field.value.trim()) {
          field.style.borderColor = '#e74c3c';
          isValid = false;
        } else {
          field.style.borderColor = '';
        }
      });

      var emailField = contactForm.querySelector('input[type="email"]');
      if (emailField && emailField.value.trim()) {
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailField.value.trim())) {
          emailField.style.borderColor = '#e74c3c';
          isValid = false;
        }
      }

      if (!isValid) return;

      var submitBtn = contactForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.textContent = 'Message Sent!';
        submitBtn.style.backgroundColor = '#27ae60';
      }

      setTimeout(function () {
        contactForm.reset();
        if (submitBtn) {
          submitBtn.textContent = 'Send Message';
          submitBtn.style.backgroundColor = '';
        }
      }, 3000);
    });
  }

  // ── Smooth Scrolling ──
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });

      // Close mobile menu
      if (menuToggle) menuToggle.classList.remove('active');
      if (mainNav) mainNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ── Click-to-Call Tracking ──
  document.querySelectorAll('a[href^="tel:"]').forEach(function (link) {
    link.addEventListener('click', function () {
      if (typeof gtag === 'function') {
        gtag('event', 'click_to_call', {
          event_category: 'engagement',
          event_label: this.getAttribute('href')
        });
      }
    });
  });

  // ── Active Nav Highlighting ──
  var currentPath = window.location.pathname;
  document.querySelectorAll('.main-nav a').forEach(function (link) {
    var href = link.getAttribute('href');
    if (!href) return;

    // Normalize paths for comparison
    var linkPath = href.replace(/index\.html$/, '').replace(/\/$/, '') || '/';
    var pagePath = currentPath.replace(/index\.html$/, '').replace(/\/$/, '') || '/';

    if (linkPath === pagePath) {
      link.classList.add('active');
    }
  });
});
