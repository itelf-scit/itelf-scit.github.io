# iTELF static website — rebuilt from the supplied baseline ZIP

This project uses the supplied `iTELF_STREAMS_No_Search_Bar(2).zip` as the structural baseline. Existing homepage layout, CSS responsive rules, local images, and the STREAMS page design are retained.

## Included updates

- SPROUT startup resource directory with search/category filters and a 10-item catalogue in `src/data/startup-resources.json`.
- An embedded fallback catalogue in `script.js`, so the directory renders immediately even if the JSON request fails. The JSON file is used when available and remains the editable source.
- Homepage footer contact: Vaidik, 90543 23204, and itelf@scit.edu.
- STREAMS footer contact: Vaidik, 90543 23204, and itelf@scit.edu.
- STREAMS subpage retained with its own `streams/index.html`, `streams/streams.css`, and `streams/streams.js`; the removed search bar and “From the room” gallery remain removed.
- The anime-style STREAMS hero illustration remains at `src/images/streams-anime-studio.png`.
- Homepage hero board cards are restored via a small staggered entrance, so their original CSS opacity/settled states are initialized. Pointer hover restores the active-card interaction.
- The existing floating navigation fade behaviour uses the `.site-header.nav-hidden` CSS state on scroll direction. No ScrollTrigger pin is added to the hero or content sections.

## Run locally with Apache

Place the project in `E:/Portfolio/itelf-scit.github.io` if that is the configured document root, or under the `iTELF` folder at the configured site root. Use the URL that matches your local Apache mapping, commonly `http://localhost/iTELF/` and `http://localhost/iTELF/streams/`.

## Update the resource directory

Edit `src/data/startup-resources.json`. The UI renders the embedded fallback list instantly and updates from the JSON catalogue when it is available. Keep each resource's `name`, `category`, `summary`, `audience`, `url`, and optional `tags` fields. The directory points to official portals; current eligibility, open calls, benefits, and deadlines should be confirmed on the owning organisation's website.
