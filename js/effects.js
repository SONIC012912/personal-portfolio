// Remembers the light or dark choice and updates the header switch.
(function () {
  var root = document.documentElement;
  var button = document.querySelector(".theme-toggle");
  var storageKey = "field-notes-theme";

  function applyTheme(theme) {
    var dark = theme === "dark";
    root.setAttribute("data-theme", dark ? "dark" : "light");

    if (!button) {
      return;
    }

    button.setAttribute("aria-pressed", dark ? "true" : "false");
    button.textContent = dark ? "Light" : "Dark";
    button.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
  }

  var saved = "light";
  try {
    if (localStorage.getItem(storageKey) === "dark") {
      saved = "dark";
    }
  } catch (error) {
    saved = "light";
  }

  applyTheme(saved);

  if (button) {
    button.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
      try {
        localStorage.setItem(storageKey, next);
      } catch (error) {}
    });
  }
})();

// Shows a back-to-top button after the page has moved down, then returns to the top.
(function () {
  var button = document.querySelector(".back-to-top");

  if (!button) {
    return;
  }

  var footer = document.querySelector(".site-footer");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var gap = 20;

  function place() {
    var lift = gap;

    if (footer) {
      var rect = footer.getBoundingClientRect();
      var covering = window.innerHeight - rect.top;

      if (covering > 0) {
        lift = covering + gap;
      }
    }

    button.style.bottom = lift + "px";
  }

  function update() {
    var show = window.scrollY >= 300;
    button.classList.toggle("is-visible", show);

    if (show) {
      button.removeAttribute("aria-hidden");
      button.removeAttribute("tabindex");
    } else {
      button.setAttribute("aria-hidden", "true");
      button.setAttribute("tabindex", "-1");

      if (document.activeElement === button) {
        button.blur();
      }
    }

    place();
  }

  button.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: reduceMotion.matches ? "auto" : "smooth"
    });
  });

  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", place);
})();
