# iTELF site — responsive pass

This build keeps the existing desktop composition and adds a full responsive pass across:
- Header / navigation
- Hero + idea board
- About
- SPROUT'IT
- STREAMS
- TEDxSIUHinjewadi
- Gallery
- Domains
- Closing CTA
- Footer

Responsive rules are consolidated as final overrides in `css/responsive.css`.

The STREAMS orbit overlay remains disabled, matching the latest visual direction.

- TEDxSIUHinjewadi section revamped with a strict red / black / white palette, supplied TEDxSIUHinjewadi logo, and direct link to https://tedxsiuhinjewadi.scit.edu/.
- STREAMS CTA updated from “Talk to iTELF” to “Contact Us”.


## STREAMS subpage

The standalone podcast-style landing page is in `streams/` with its own `index.html`, `streams.css`, and `streams.js`. The main page links to `streams/` from the navigation, hero CTA, STREAMS section CTA, and footer. The subpage reuses the existing images in `src/` and links back to the iTELF home page.

### STREAMS hero artwork

The STREAMS subpage hero image is currently loaded from `../src/images/streams-anime-studio.png`. To switch to a CDN later, update the `src` attribute on the hero image in `streams/index.html`; the rest of the section does not depend on the image location.


## Main-page STREAMS episode CTA

The home-page STREAMS section includes a prominent anime-art feature panel linking to `/iTELF/streams/`. It invites visitors to explore the STREAMS page and check back as new episodes are added. Update the image later by changing `src/images/streams-anime-studio.png` or swapping its image URL in `index.html`.


### Latest STREAMS page edit

The “From the room — A conversation can stay with you” photo-gallery section has been removed from `streams/index.html`, along with its section-specific CSS and carousel JavaScript. The homepage episode CTA remains in place.

Logo correction: the Sprout/Creatiflect section now references the verified asset `creatiflect_logo_black.png`, which includes the red thread and red accent lettering. The logo-specific CSS filter override has been removed; unrelated hero and footer logo filters remain unchanged.


## Latest footer adjustment

Removed only the search form from the STREAMS footer. The oversized “streams” wordmark, “Keep the conversation going” heading, supporting caption, contact information, Back to iTELF link, copyright, and SCIT link remain. Search-only CSS and JavaScript were removed as unused.
