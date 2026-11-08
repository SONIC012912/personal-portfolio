// This file runs only on the About page.
// It stamps journal notes, remembers them for this tab, and opens timeline stops.

var totalNotes = 5;
var storageKey = "field-notes-collected";
var countText = document.querySelector("#journal-count");
var progressBar = document.querySelector("#journal-bar");
var progress = document.querySelector("#journal-progress");
var completeNote = document.querySelector("#journal-complete");
var collected = new Set(loadCollected());

function loadCollected() {
  try {
    var saved = sessionStorage.getItem(storageKey);
    var names = saved ? JSON.parse(saved) : [];
    return Array.isArray(names) ? names : [];
  } catch (error) {
    return [];
  }
}

function saveCollected() {
  try {
    sessionStorage.setItem(storageKey, JSON.stringify(Array.from(collected)));
  } catch (error) {
    // If the browser blocks storage, the stamps still work until refresh.
  }
}

function renderJournal() {
  var count = collected.size;
  countText.textContent = String(count) + " of " + String(totalNotes) + " notes collected";
  progressBar.style.width = String((count / totalNotes) * 100) + "%";
  progress.setAttribute("aria-valuenow", String(count));
  completeNote.hidden = count < totalNotes;

  document.querySelectorAll("[data-stamp]").forEach(function (stamp) {
    var name = stamp.getAttribute("data-stamp");
    var label = stamp.querySelector(".stamp-label").textContent;
    var on = collected.has(name);
    stamp.classList.toggle("is-stamped", on);
    stamp.setAttribute("aria-label", label + (on ? ", collected" : ", not collected"));
  });

  document.querySelectorAll("[data-collect]").forEach(function (button) {
    var on = collected.has(button.getAttribute("data-collect"));
    button.setAttribute("aria-pressed", on ? "true" : "false");
    button.textContent = on ? "Stamped" : "Stamp this note";
  });
}

function collectNote(name) {
  collected.add(name);
  saveCollected();
  renderJournal();
}

document.querySelectorAll("[data-collect]").forEach(function (button) {
  button.addEventListener("click", function () {
    collectNote(button.getAttribute("data-collect"));
  });
});

document.querySelectorAll(".timeline-item").forEach(function (item) {
  var toggle = item.querySelector(".timeline-toggle");
  var panel = item.querySelector(".timeline-panel");

  toggle.addEventListener("click", function () {
    var open = !item.classList.contains("is-open");

    document.querySelectorAll(".timeline-item").forEach(function (other) {
      var otherToggle = other.querySelector(".timeline-toggle");
      var otherPanel = other.querySelector(".timeline-panel");
      other.classList.remove("is-open");
      otherToggle.setAttribute("aria-expanded", "false");
      otherPanel.setAttribute("aria-hidden", "true");
    });

    if (open) {
      item.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
      panel.setAttribute("aria-hidden", "false");
      collectNote("education");
    }
  });
});

document.querySelectorAll("[data-open-note]").forEach(function (card) {
  card.addEventListener("click", function () {
    var pressed = card.getAttribute("aria-pressed") === "true";
    card.setAttribute("aria-pressed", pressed ? "false" : "true");
    collectNote(card.getAttribute("data-open-note"));
  });
});

renderJournal();
