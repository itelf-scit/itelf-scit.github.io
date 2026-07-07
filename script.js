/* =========================================================
   iTELF — script.js
   Minimal vanilla JS, no dependencies.
   1) Mobile nav toggle
   2) Board load-in sequence (threads draw, cards settle)
   3) Card hover/focus -> highlight connected threads, dim rest
========================================================= */

(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ---------------------------------------------------------
     1) Mobile nav toggle
  --------------------------------------------------------- */
  var navToggle = document.getElementById("navToggle");
  var navMenu = document.getElementById("navMenu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      var isOpen = navMenu.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navMenu.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------------------------------------------------------
     2) Board load-in sequence
  --------------------------------------------------------- */
  var board = document.getElementById("board");

  if (board) {
    var threads = board.querySelectorAll(".thread");
    var cards = board.querySelectorAll(".board-card");

    if (prefersReducedMotion) {
      threads.forEach(function (t) { t.classList.add("drawn"); });
      cards.forEach(function (c) { c.classList.add("settled"); });
    } else {
      // Draw threads first (single orchestrated stroke animation)
      threads.forEach(function (t) {
        t.classList.add("drawn");
      });

      // Cards settle in shortly after, staggered slightly
      cards.forEach(function (card, i) {
        setTimeout(function () {
          card.classList.add("settled");
        }, 250 + i * 90);
      });
    }

    /* -------------------------------------------------------
       3) Hover/focus -> connect + dim
       Each thread has data-pair="a-b" referencing card indices.
       Hovering/focusing a card highlights threads touching it
       and dims unrelated cards.
    ------------------------------------------------------- */
    var threadList = Array.prototype.slice.call(threads);

    function setActiveCard(index) {
      board.classList.add("dimming");

      cards.forEach(function (card) {
        var cardIndex = card.getAttribute("data-card");
        card.classList.toggle("card-active", cardIndex === String(index));
      });

      threadList.forEach(function (thread) {
        var pair = thread.getAttribute("data-pair") || "";
        var touches = pair.split("-").indexOf(String(index)) !== -1;
        thread.classList.toggle("active", touches);
      });
    }

    function clearActiveCard() {
      board.classList.remove("dimming");
      cards.forEach(function (card) {
        card.classList.remove("card-active");
      });
      threadList.forEach(function (thread) {
        thread.classList.remove("active");
      });
    }

    cards.forEach(function (card) {
      var index = card.getAttribute("data-card");

      card.addEventListener("mouseenter", function () {
        setActiveCard(index);
      });
      card.addEventListener("mouseleave", clearActiveCard);

      card.addEventListener("focus", function () {
        setActiveCard(index);
      });
      card.addEventListener("blur", clearActiveCard);
    });
  }
})();
