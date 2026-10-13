(() => {
  "use strict";

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // -------------------------------------------------------------
  // Mobile navigation
  // -------------------------------------------------------------
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  const siteHeader = document.querySelector(".site-header");

  const closeMenu = () => {
    if (!navToggle || !navMenu) return;
    navMenu.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    siteHeader?.classList.remove("nav-hidden");
  };

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const open = navMenu.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(open));
      if (open) siteHeader?.classList.remove("nav-hidden");
    });
    navMenu.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
  }

  // The floating navigation may reappear on upward scroll only while the
  // visitor is within the hero. Below the hero it stays hidden until the
  // visitor scrolls back into the hero region. This only toggles the existing
  // CSS state; it does not pin, resize, or transform page sections.
  if (siteHeader) {
    const hero = document.querySelector(".hero");
    let previousY = Math.max(0, window.scrollY);
    let framePending = false;
    const topRevealZone = 90;
    const movementThreshold = 6;

    const isWithinHero = (scrollY) => {
      if (!hero) return scrollY <= topRevealZone;
      const heroTop = hero.getBoundingClientRect().top + window.scrollY;
      const heroBottom = heroTop + hero.offsetHeight;
      return scrollY < heroBottom - 24;
    };

    const syncNavigation = () => {
      const currentY = Math.max(0, window.scrollY);
      const delta = currentY - previousY;
      const menuOpen = Boolean(navMenu?.classList.contains("open"));
      const withinHero = isWithinHero(currentY);

      if (menuOpen || currentY <= topRevealZone) {
        siteHeader.classList.remove("nav-hidden");
      } else if (!withinHero) {
        // Never re-open the floating navigation in lower page sections.
        siteHeader.classList.add("nav-hidden");
      } else if (delta > movementThreshold) {
        siteHeader.classList.add("nav-hidden");
      } else if (delta < -movementThreshold) {
        siteHeader.classList.remove("nav-hidden");
      }

      if (Math.abs(delta) > movementThreshold || currentY <= topRevealZone) previousY = currentY;
      framePending = false;
    };

    window.addEventListener("scroll", () => {
      if (framePending) return;
      framePending = true;
      window.requestAnimationFrame(syncNavigation);
    }, { passive: true });

    // Set the correct initial state too, including when the page is restored
    // from browser history at a position below the hero.
    if (window.scrollY <= topRevealZone || isWithinHero(window.scrollY)) {
      siteHeader.classList.remove("nav-hidden");
    } else {
      siteHeader.classList.add("nav-hidden");
    }
  }

  // -------------------------------------------------------------
  // Hero idea board. The cards begin at opacity: 0 in CSS and must be
  // settled into view. Keep this as a small entrance stagger: no ScrollTrigger
  // pinning, fixed-height scroll scenes, or layout-affecting transforms.
  // -------------------------------------------------------------
  const board = document.getElementById("board");
  if (board) {
    const cards = [...board.querySelectorAll(".board-card")];
    if (reducedMotion) {
      cards.forEach((card) => card.classList.add("settled"));
    } else {
      cards.forEach((card, index) => {
        window.setTimeout(() => card.classList.add("settled"), 90 + index * 105);
      });
    }

    const clearActiveCard = () => {
      board.classList.remove("dimming");
      cards.forEach((card) => card.classList.remove("card-active"));
    };
    board.addEventListener("pointerover", (event) => {
      const card = event.target instanceof Element ? event.target.closest(".board-card") : null;
      if (!card || !cards.includes(card)) return;
      board.classList.add("dimming");
      cards.forEach((item) => item.classList.toggle("card-active", item === card));
    });
    board.addEventListener("pointerleave", clearActiveCard);
  }

  // -------------------------------------------------------------
  // SPROUT startup resource directory
  // An embedded catalogue renders immediately, so a failed JSON fetch can
  // never leave the UI stuck on “Loading resources…”. The separate JSON file
  // remains the editable source and replaces the fallback when available.
  // -------------------------------------------------------------
  const fallbackResources = [
  {
    "name": "Startup India Portal",
    "category": "Market access & learning",
    "summary": "A central starting point for founder learning, startup programmes, ecosystem connections, updates and support resources.",
    "audience": "Founders exploring the Indian startup ecosystem",
    "url": "https://www.startupindia.gov.in/",
    "tags": [
      "learning",
      "mentorship",
      "network",
      "programmes",
      "ecosystem",
      "founders"
    ]
  },
  {
    "name": "DPIIT Startup Recognition",
    "category": "Recognition & compliance",
    "summary": "Check current eligibility, required information and the official application route for DPIIT startup recognition.",
    "audience": "Eligible incorporated startups; recognition is subject to current criteria",
    "url": "https://www.startupindia.gov.in/content/sih/en/startupgov/startup_recognition_page.html",
    "tags": [
      "DPIIT",
      "recognition",
      "tax",
      "compliance",
      "registration",
      "certificate"
    ]
  },
  {
    "name": "Central Government Schemes for Startups",
    "category": "Funding & grants",
    "summary": "Browse central-government programmes and compare their objectives, eligibility conditions and application information.",
    "audience": "Founders looking for a scheme that matches their stage and sector",
    "url": "https://www.startupindia.gov.in/content/sih/en/government-schemes.html",
    "tags": [
      "funding",
      "grant",
      "benefits",
      "schemes",
      "government",
      "subsidy"
    ]
  },
  {
    "name": "NIDHI-PRAYAS Prototype Support",
    "category": "Funding & grants",
    "summary": "Explore DST support that helps innovators turn technology ideas into working prototypes through participating PRAYAS centres.",
    "audience": "Innovators, student founders and early-stage teams with a prototype need",
    "url": "https://nidhi.dst.gov.in/schemes-programmes/nidhiprayas/",
    "tags": [
      "prototype",
      "proof of concept",
      "DST",
      "grant",
      "technology",
      "early stage",
      "NIDHI"
    ]
  },
  {
    "name": "Udyam MSME Registration",
    "category": "Recognition & compliance",
    "summary": "The Government of India's official, free and paperless Udyam registration portal for eligible micro, small and medium enterprises.",
    "audience": "Businesses that meet the applicable MSME classification and registration requirements",
    "url": "https://udyamregistration.gov.in/",
    "tags": [
      "MSME",
      "Udyam",
      "registration",
      "compliance",
      "free",
      "enterprise"
    ]
  },
  {
    "name": "Startup Intellectual Property Protection (SIPP)",
    "category": "IP & protection",
    "summary": "Read official notices and scheme documents and review facilitator information for startup patent, design and trademark support. Check current validity and terms before relying on benefits.",
    "audience": "Startups considering protection for inventions, designs or trademarks",
    "url": "https://ipindia.gov.in/page-content/startups-intellectual-property-protection-sipp",
    "tags": [
      "IP",
      "IPR",
      "patent",
      "trademark",
      "design",
      "protection",
      "facilitator"
    ]
  },
  {
    "name": "Maharashtra & State Startup Policies",
    "category": "Maharashtra ecosystem",
    "summary": "Compare notified startup policies by state and open the Maharashtra policy information from the official Startup India directory.",
    "audience": "Founders based in Maharashtra or evaluating state-specific support",
    "url": "https://www.startupindia.gov.in/content/sih/en/startup-scheme/state-startup-policies.html",
    "tags": [
      "Maharashtra",
      "state policy",
      "state schemes",
      "regional support",
      "incentives"
    ]
  },
  {
    "name": "Atal Incubation Centres",
    "category": "Incubation & mentoring",
    "summary": "Learn about Atal Innovation Mission's incubation-centre ecosystem and explore relevant centre and programme information. Application windows can vary; check the latest notice.",
    "audience": "Founders seeking incubation, facilities, mentors or ecosystem partners",
    "url": "https://aim.gov.in/aic-overview.php",
    "tags": [
      "AIM",
      "incubator",
      "incubation",
      "mentoring",
      "facilities",
      "innovation"
    ]
  },
  {
    "name": "MeitY Startup Hub",
    "category": "Incubation & mentoring",
    "summary": "Explore the Ministry of Electronics and IT's startup ecosystem and technology-focused programmes; eligibility and open calls differ by programme.",
    "audience": "Digital, software, electronics and technology-led startups",
    "url": "https://portal.meity.gov.in/",
    "tags": [
      "MeitY",
      "technology",
      "IT",
      "digital",
      "software",
      "incubator",
      "mentorship"
    ]
  },
  {
    "name": "BIRAC Biotechnology Ignition Grant (BIG)",
    "category": "Sector-specific support",
    "summary": "Explore BIRAC's biotech proof-of-concept support, programme guidance and call announcements. Confirm the latest deadline and eligibility on the official scheme page.",
    "audience": "Biotechnology, life-sciences and related science-led innovators",
    "url": "https://www.birac.nic.in/big.php",
    "tags": [
      "BIRAC",
      "biotech",
      "healthcare",
      "life sciences",
      "grant",
      "proof of concept",
      "research"
    ]
  }
];
  const grid = document.getElementById("startup-resource-grid");
  const search = document.getElementById("startup-resource-search");
  const category = document.getElementById("startup-resource-filter");
  const count = document.getElementById("startup-resource-count");

  if (grid && search && category && count) {
    let resources = Array.isArray(fallbackResources) ? fallbackResources : [];

    const escapeHTML = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[char]));

    const safeExternalURL = (value) => {
      try {
        const url = new URL(String(value), window.location.href);
        return url.protocol === "https:" ? url.href : "#";
      } catch {
        return "#";
      }
    };

    const renderResources = () => {
      const term = search.value.trim().toLowerCase();
      const selectedCategory = category.value;
      const matched = resources.filter((resource) => {
        const terms = [resource.name, resource.category, resource.summary, resource.audience, ...(resource.tags || [])];
        const searchableText = terms.join(" ").toLowerCase();
        return (!term || searchableText.includes(term)) &&
          (selectedCategory === "all" || resource.category === selectedCategory);
      });

      count.textContent = `${matched.length} ${matched.length === 1 ? "resource" : "resources"} found`;
      grid.setAttribute("aria-busy", "false");
      if (!matched.length) {
        grid.innerHTML = '<p class="sp-resource-empty">No resources match those filters. Try a broader keyword or choose “All resource categories”.</p>';
        return;
      }

      grid.innerHTML = matched.map((item) => {
        const href = escapeHTML(safeExternalURL(item.url));
        return `<article class="sp-resource-card">
          <span class="sp-resource-category">${escapeHTML(item.category)}</span>
          <h4>${escapeHTML(item.name)}</h4>
          <p>${escapeHTML(item.summary)}</p>
          <p class="sp-resource-audience"><strong>Best for:</strong> ${escapeHTML(item.audience)}</p>
          <a class="sp-resource-action" href="${href}" target="_blank" rel="noopener noreferrer">Open official resource <span aria-hidden="true">↗</span></a>
        </article>`;
      }).join("");
    };

    search.addEventListener("input", renderResources);
    category.addEventListener("change", renderResources);
    renderResources(); // render the embedded catalogue immediately

    try {
      const catalogueURL = new URL("src/data/startup-resources.json", document.baseURI);
      fetch(catalogueURL.href, { headers: { Accept: "application/json" } })
        .then((response) => {
          if (!response.ok) throw new Error(`Catalogue request returned ${response.status}`);
          return response.json();
        })
        .then((catalogue) => {
          if (Array.isArray(catalogue.resources) && catalogue.resources.length) {
            resources = catalogue.resources;
            renderResources();
          }
        })
        .catch(() => {
          // Keep the embedded catalogue active when JSON is unavailable.
        });
    } catch {
      // A non-page context (such as an about:blank preview) still uses fallback.
    }
  }

  // -------------------------------------------------------------
  // Homepage SPROUT gallery controls
  // -------------------------------------------------------------
  const galleryTrack = document.getElementById("sprout-gallery-track");
  const galleryControls = document.querySelector(".gl-carousel-controls");
  if (galleryTrack && galleryControls) {
    const scrollDistance = () => Math.max(260, Math.round(galleryTrack.clientWidth * 0.8));
    galleryControls.querySelector('[data-carousel="previous"]')?.addEventListener("click", () => {
      galleryTrack.scrollBy({ left: -scrollDistance(), behavior: reducedMotion ? "auto" : "smooth" });
    });
    galleryControls.querySelector('[data-carousel="next"]')?.addEventListener("click", () => {
      galleryTrack.scrollBy({ left: scrollDistance(), behavior: reducedMotion ? "auto" : "smooth" });
    });
    const pauseButton = galleryControls.querySelector('[data-carousel="pause"]');
    if (pauseButton) pauseButton.hidden = true;
  }
})();
