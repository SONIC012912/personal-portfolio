// Opens a project card in a modal and closes it again.
(function () {
  var cards = document.querySelectorAll(".project-card[data-project]");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var lastOpener = null;
  var closingTimer = 0;

  if (!cards.length) {
    return;
  }

  function finishClose(dialog) {
    window.clearTimeout(closingTimer);
    dialog.classList.remove("is-closing");

    if (dialog.open) {
      dialog.close();
    }
  }

  function requestClose(dialog) {
    if (!dialog.open || dialog.classList.contains("is-closing")) {
      return;
    }

    if (reduceMotion.matches) {
      finishClose(dialog);
      return;
    }

    dialog.classList.add("is-closing");
    closingTimer = window.setTimeout(function () {
      finishClose(dialog);
    }, 220);
  }

  cards.forEach(function (card) {
    var dialog = document.getElementById(card.getAttribute("data-project"));
    var opener = card.querySelector(".project-open");

    if (!dialog || !opener) {
      return;
    }

    function openModal() {
      lastOpener = opener;
      dialog.showModal();
      document.documentElement.classList.add("modal-open");
    }

    card.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        return;
      }

      openModal();
    });

    dialog.querySelector(".project-modal-close").addEventListener("click", function () {
      requestClose(dialog);
    });

    dialog.addEventListener("click", function (event) {
      if (event.target === dialog) {
        requestClose(dialog);
      }
    });

    dialog.addEventListener("cancel", function (event) {
      event.preventDefault();
      requestClose(dialog);
    });

    dialog.addEventListener("close", function () {
      document.documentElement.classList.remove("modal-open");

      if (lastOpener) {
        lastOpener.focus();
      }
    });
  });
})();
