(() => {
  "use strict";

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Expand one conversation principle at a time, including keyboard activation.
  const principleCards = [...document.querySelectorAll(".principle-card")];
  principleCards.forEach((card, cardIndex) => {
    card.addEventListener("click", () => {
      const parentGrid = card.closest(".principle-grid");
      if (parentGrid) parentGrid.dataset.active = String(cardIndex);
      principleCards.forEach((other) => {
        const active = other === card;
        other.classList.toggle("is-active", active);
        other.setAttribute("aria-expanded", String(active));
        const description = other.querySelector(".principle-description");
        if (description) description.hidden = !active;
      });
    });
  });

  // Scroll motion is only attached when the visitor has not requested reduced motion.
  if (reducedMotion || !window.gsap || !window.ScrollTrigger) return;

  window.gsap.registerPlugin(window.ScrollTrigger);
  const motion = window.gsap.matchMedia();

  motion.add("(prefers-reduced-motion: no-preference)", () => {
    window.gsap.from(".hero-copy > *", {
      y: 24,
      opacity: 0,
      duration: 0.9,
      stagger: 0.1,
      ease: "power3.out",
      clearProps: "transform"
    });
  });
})();
