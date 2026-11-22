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

// Tracks a soft highlight under the pointer on cards.
// Touch screens skip this, because there is no cursor to follow.
(function () {
  var motionOk = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  if (!motionOk || !finePointer) {
    return;
  }

  var cards = document.querySelectorAll(
    ".project-card, .skill-card, .interest-card, .info-card, .goal-card, .journal, .timeline-toggle, .portrait"
  );

  cards.forEach(function (card) {
    var frame = 0;
    var latest = null;

    card.addEventListener("pointermove", function (event) {
      if (event.pointerType === "touch") {
        return;
      }

      latest = event;

      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(function () {
        frame = 0;

        if (!latest) {
          return;
        }

        var rect = card.getBoundingClientRect();
        if (!rect.width || !rect.height) {
          return;
        }

        var x = ((latest.clientX - rect.left) / rect.width) * 100;
        var y = ((latest.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty("--shine-x", x.toFixed(1) + "%");
        card.style.setProperty("--shine-y", y.toFixed(1) + "%");
        card.classList.add("is-lit");
      });
    });

    function clearShine() {
      card.classList.remove("is-lit");
    }

    card.addEventListener("pointerleave", clearShine);
    card.addEventListener("pointercancel", clearShine);
  });
})();
