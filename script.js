/* ============================================================
   Sanjita Sendang Limbu — Portfolio
   Small enhancements: scroll-reveal animations and an active
   section highlight in the navigation.
   ============================================================ */

(function () {
  "use strict";

  /* ---------- Scroll reveal ----------
     Elements with class "reveal" fade/slide in when they enter
     the viewport. We add the class to the main blocks here so
     the HTML stays clean. */
  var revealTargets = document.querySelectorAll(
    ".panel, .step, .service, .eyebrow, h2, .tag-cloud"
  );

  // Respect users who prefer reduced motion: skip the effect.
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!reducedMotion && "IntersectionObserver" in window) {
    revealTargets.forEach(function (el) {
      el.classList.add("reveal");
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealTargets.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ---------- Active nav link ----------
     Highlights the nav link matching the section currently
     in view. */
  var navLinks = document.querySelectorAll(".nav-links a");
  var sections = [];

  navLinks.forEach(function (link) {
    var id = link.getAttribute("href");
    if (id && id.charAt(0) === "#") {
      var section = document.querySelector(id);
      if (section) sections.push({ link: link, section: section });
    }
  });

  function updateActiveLink() {
    var current = null;
    var offset = 120; // accounts for the sticky header

    sections.forEach(function (item) {
      var top = item.section.getBoundingClientRect().top;
      if (top - offset <= 0) current = item;
    });

    sections.forEach(function (item) {
      if (item === current) {
        item.link.style.color = "var(--signal)";
      } else {
        item.link.style.color = "";
      }
    });
  }

  window.addEventListener("scroll", updateActiveLink, { passive: true });
  updateActiveLink();
})();
