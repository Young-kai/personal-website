(function () {
  "use strict";

  /* =========================================================
     Theme toggle — persists via localStorage, defaults to
     prefers-color-scheme, cross-fades via CSS transition.
     ========================================================= */
  var root = document.documentElement;
  var themeToggle = document.getElementById("theme-toggle");
  var STORAGE_KEY = "yy-theme";

  function siteCopy(chinese) {
    return window.yyI18n ? window.yyI18n.t(chinese) : chinese;
  }

  function updateCurrentAge() {
    var birthDate = document.getElementById("birth-date");
    var ageOutput = document.getElementById("current-age");
    if (!birthDate || !ageOutput) return;

    var birthParts = (birthDate.getAttribute("datetime") || "").split("-").map(Number);
    if (birthParts.length !== 3 || birthParts.some(function (part) { return !Number.isFinite(part); })) return;

    var today = new Date();
    var age = today.getFullYear() - birthParts[0];
    var birthdayHasPassed = today.getMonth() + 1 > birthParts[1]
      || (today.getMonth() + 1 === birthParts[1] && today.getDate() >= birthParts[2]);

    if (!birthdayHasPassed) age -= 1;
    ageOutput.textContent = String(age);
  }

  updateCurrentAge();

  function projectToggleCopy(isOpen) {
    var isEnglish = root.lang.toLowerCase().indexOf("en") === 0;
    if (isEnglish) return isOpen ? "Hide abstract" : "Show abstract";
    return isOpen ? "收起摘要" : "展开摘要";
  }

  function getPreferredTheme() {
    var stored = null;
    try { stored = localStorage.getItem(STORAGE_KEY); } catch (e) { /* storage unavailable */ }
    if (stored === "light" || stored === "dark") return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function applyTheme(theme) {
    if (theme === "dark") {
      root.setAttribute("data-theme", "dark");
    } else {
      root.removeAttribute("data-theme");
    }
    if (themeToggle) {
      themeToggle.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
      themeToggle.setAttribute("aria-label", theme === "dark" ? siteCopy("切换为浅色主题") : siteCopy("切换为深色主题"));
    }
  }

  var currentTheme = getPreferredTheme();
  applyTheme(currentTheme);

  /* =========================================================
     Split-character brand reveal
     A framework-free equivalent of the React Bits SplitText
     entrance for this static site.
     ========================================================= */
  var splitBrand = document.querySelector(".brand-title[data-split-text]");

  if (splitBrand) {
    var splitBrandText = splitBrand.getAttribute("data-split-text") || splitBrand.textContent || "";
    var splitBrandMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    function buildSplitBrand() {
      if (splitBrandMotion.matches) {
        splitBrand.textContent = splitBrandText;
        splitBrand.classList.add("is-split-visible");
        return;
      }

      splitBrand.textContent = "";
      Array.from(splitBrandText).forEach(function (character, index) {
        var characterSpan = document.createElement("span");
        characterSpan.className = "brand-split-char";
        characterSpan.textContent = character;
        characterSpan.style.setProperty("--split-delay", String(index * 70) + "ms");
        splitBrand.appendChild(characterSpan);
      });

      var revealSplitBrand = function () {
        splitBrand.classList.add("is-split-visible");
      };

      if ("IntersectionObserver" in window) {
        var brandObserver = new IntersectionObserver(function (entries, observer) {
          if (!entries[0] || !entries[0].isIntersecting) return;
          revealSplitBrand();
          observer.disconnect();
        }, { threshold: 0.1, rootMargin: "0px" });
        brandObserver.observe(splitBrand);
      } else {
        window.requestAnimationFrame(revealSplitBrand);
      }
    }

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(buildSplitBrand);
    } else {
      buildSplitBrand();
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", function (event) {
      var keyboardTriggered = event.detail === 0;
      if (keyboardTriggered) themeToggle.classList.add("skip-motion");
      currentTheme = currentTheme === "dark" ? "light" : "dark";
      applyTheme(currentTheme);
      try { localStorage.setItem(STORAGE_KEY, currentTheme); } catch (e) { /* ignore */ }
      if (keyboardTriggered) {
        window.requestAnimationFrame(function () {
          window.requestAnimationFrame(function () {
            themeToggle.classList.remove("skip-motion");
          });
        });
      }
    });
  }

  // Follow system changes only if the user hasn't explicitly chosen a theme.
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (e) {
    var stored = null;
    try { stored = localStorage.getItem(STORAGE_KEY); } catch (err) { /* ignore */ }
    if (stored) return;
    currentTheme = e.matches ? "dark" : "light";
    applyTheme(currentTheme);
  });

  /* =========================================================
     Mobile nav
     ========================================================= */
  var burger = document.getElementById("nav-burger");
  var navLinks = document.getElementById("nav-links");

  if (burger && navLinks) {
    var mobileNavQuery = window.matchMedia("(max-width: 1200px)");

    function setMenuState(isOpen) {
      var shouldOpen = mobileNavQuery.matches && isOpen;
      navLinks.classList.toggle("is-open", shouldOpen);
      document.body.classList.toggle("menu-open", shouldOpen);
      burger.setAttribute("aria-expanded", shouldOpen ? "true" : "false");
      burger.setAttribute("aria-label", shouldOpen ? siteCopy("关闭菜单") : siteCopy("打开菜单"));

      if (mobileNavQuery.matches) {
        navLinks.inert = !shouldOpen;
        navLinks.setAttribute("aria-hidden", shouldOpen ? "false" : "true");
      } else {
        navLinks.inert = false;
        navLinks.removeAttribute("aria-hidden");
      }
    }

    burger.addEventListener("click", function (event) {
      var keyboardTriggered = event.detail === 0;
      if (keyboardTriggered) {
        burger.classList.add("skip-motion");
        navLinks.classList.add("skip-motion");
      }
      setMenuState(burger.getAttribute("aria-expanded") !== "true");
      if (keyboardTriggered) {
        window.requestAnimationFrame(function () {
          window.requestAnimationFrame(function () {
            burger.classList.remove("skip-motion");
            navLinks.classList.remove("skip-motion");
          });
        });
      }
    });
    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setMenuState(false);
      });
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && burger.getAttribute("aria-expanded") === "true") {
        setMenuState(false);
        burger.focus();
      }
    });
    document.addEventListener("click", function (event) {
      if (burger.getAttribute("aria-expanded") !== "true") return;
      // Ignore clicks on the burger itself (it has its own toggle handler)
      // and inside the open dropdown (link clicks already close it above).
      if (event.target.closest("#nav-burger, #nav-links")) return;
      setMenuState(false);
    });
    mobileNavQuery.addEventListener("change", function () {
      setMenuState(false);
    });
    setMenuState(false);
  }

  /* =========================================================
     Sticky nav condense + scroll-spy active section
     ========================================================= */
  var siteNav = document.getElementById("site-nav");
  var navAnchors = Array.prototype.slice.call(document.querySelectorAll(".nav-link[data-nav]"));
  var sections = navAnchors
    .map(function (a) { return document.querySelector(a.getAttribute("href")); })
    .filter(Boolean);

  function setActiveNav(activeId) {
    navAnchors.forEach(function (a) {
      var isActive = activeId && a.getAttribute("href") === "#" + activeId;
      a.classList.toggle("is-active", !!isActive);
      if (isActive) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
    });
  }

  function updateActiveNavFromScroll() {
    if (!sections.length) return;

    var documentHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    var atPageEnd = window.scrollY + window.innerHeight >= documentHeight - 4;
    if (atPageEnd) {
      setActiveNav(sections[sections.length - 1].id);
      return;
    }

    var marker = window.scrollY + (siteNav ? siteNav.offsetHeight : 72) + 24;
    var activeId = sections[0].id;
    sections.forEach(function (section) {
      if (section.offsetTop <= marker) activeId = section.id;
    });
    setActiveNav(activeId);
  }

  var navFramePending = false;
  function updateCondensedNav() {
    if (siteNav) siteNav.classList.toggle("is-condensed", window.scrollY > 80);
    updateActiveNavFromScroll();
    navFramePending = false;
  }

  function onScroll() {
    if (navFramePending) return;
    navFramePending = true;
    window.requestAnimationFrame(updateCondensedNav);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  updateCondensedNav();

  window.addEventListener("resize", updateActiveNavFromScroll, { passive: true });

  /* =========================================================
     Project card expand / collapse
     ========================================================= */
  var reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  document.querySelectorAll("[data-project-toggle]").forEach(function (btn) {
    btn.addEventListener("click", function (event) {
      var card = btn.closest(".project-card");
      var summary = document.getElementById(btn.getAttribute("aria-controls"));
      var isOpen = card.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
      btn.textContent = projectToggleCopy(isOpen);
      if (summary) {
        summary.hidden = !isOpen;
        if (isOpen && event.detail !== 0 && !reducedMotionQuery.matches && summary.animate) {
          summary.animate([
            { opacity: 0, transform: "translateY(-4px)" },
            { opacity: 1, transform: "translateY(0)" }
          ], {
            duration: 180,
            easing: "cubic-bezier(0.23, 1, 0.32, 1)"
          });
        }
      }
    });
  });

  /* =========================================================
     Publication list filter (全部 / 一作·通讯 / 其它)
     ========================================================= */
  var filterChips = Array.prototype.slice.call(document.querySelectorAll(".filter-chip"));
  var pubRows = Array.prototype.slice.call(document.querySelectorAll(".pub-row"));

  filterChips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      var group = chip.getAttribute("data-filter");
      filterChips.forEach(function (c) {
        var active = c === chip;
        c.classList.toggle("is-active", active);
        c.setAttribute("aria-pressed", active ? "true" : "false");
      });
      pubRows.forEach(function (row) {
        var show = group === "all" || row.getAttribute("data-group") === group;
        row.classList.toggle("is-hidden", !show);
      });
    });
  });

  document.querySelectorAll("[data-stat-filter]").forEach(function (link) {
    link.addEventListener("click", function () {
      var group = link.getAttribute("data-stat-filter");
      var targetChip = filterChips.find(function (chip) {
        return chip.getAttribute("data-filter") === group;
      });
      if (targetChip) targetChip.click();
    });
  });

  /* =========================================================
     Contact form — no backend wired up yet; give an honest,
     explicit status instead of a silent no-op (design.md §9).
     Honeypot field blocks obvious bots client-side.
     ========================================================= */
  var contactForm = document.getElementById("contact-form");
  var formStatus = document.getElementById("form-status");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var honeypot = contactForm.querySelector('[name="website"]');
      if (honeypot && honeypot.value) {
        // Silently drop likely-bot submissions without feedback.
        return;
      }
      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }
      if (formStatus) {
        formStatus.textContent = siteCopy("留言表单尚未接入邮件服务，请暂时通过邮箱直接联系我。");
      }
    });
  }

  document.addEventListener("yy:languagechange", function () {
    applyTheme(currentTheme);
    if (burger && navLinks) {
      setMenuState(navLinks.classList.contains("is-open"));
    }
    document.querySelectorAll("[data-project-toggle]").forEach(function (btn) {
      btn.textContent = projectToggleCopy(btn.getAttribute("aria-expanded") === "true");
    });
    if (formStatus && formStatus.textContent.trim()) {
      formStatus.textContent = siteCopy("留言表单尚未接入邮件服务，请暂时通过邮箱直接联系我。");
    }
  });

  /* =========================================================
     Scroll reveal — fades/rises each [data-reveal] block into
     place the first time it enters the viewport, then leaves it
     alone (no re-trigger on scroll-back). CSS gates the hidden
     state behind html.js-reveal so content stays visible if this
     never runs (IntersectionObserver missing, script blocked).
     ========================================================= */
  if ("IntersectionObserver" in window) {
    var revealTargets = Array.prototype.slice.call(document.querySelectorAll("[data-reveal]"));
    if (revealTargets.length) {
      var revealObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        });
      }, { threshold: 0, rootMargin: "0px 0px -5% 0px" });
      revealTargets.forEach(function (target) { revealObserver.observe(target); });
    }
  } else {
    // No IntersectionObserver support: reveal everything immediately
    // rather than leaving it in the hidden state forever.
    document.querySelectorAll("[data-reveal]").forEach(function (target) {
      target.classList.add("is-revealed");
    });
  }
})();
