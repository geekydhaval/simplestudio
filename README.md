# Simple Studio — landing page

A new landing page for **Simple Studio**: product design, Webflow, 3D and motion for startups building in the age of AI.

Built on the existing Simple brand (logo mark, Sofia Pro, the Simple lime `#DBF130`, the diagonal-line pattern from the prototype cover) and the 2.0 vision moodboard (dark, glowing light, lit-edge bento cards).

## The idea: chaos → simple

The diagonal lines from the original Simple cover are the signature. On load they start scattered and snap into perfect alignment. Wherever the cursor goes, everything aligns and lights up lime. Scroll away and a little chaos creeps back. In the closing call-to-action, hovering a button makes every line fall into place.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs to /dist (static, deploy anywhere: Vercel, Netlify, GitHub Pages)
```

## Stack

- [Vite](https://vitejs.dev) — dev server and build, no framework
- [GSAP](https://gsap.com) + ScrollTrigger — load sequence, pinned horizontal work gallery, scroll-scrubbed text and process beam
- [Lenis](https://lenis.darkroom.engineering) — smooth scrolling
- Raw WebGL — the spectral light behind the hero (`src/aurora.js`)
- Canvas 2D — the line field (`src/lines.js`)

## Files

| File | What it does |
| --- | --- |
| `index.html` | Page structure and static copy (hero, section headings, CTA, footer) |
| `src/data.js` | **All editable content**: services, work, process, plans, team, FAQs, links, socials |
| `src/main.js` | Renders content from `data.js` and runs all motion and interaction |
| `src/lines.js` | The signature line field |
| `src/aurora.js` | WebGL light beams behind the hero |
| `src/art.js` | Generated project covers and team avatars |
| `src/styles.css` | Design tokens and all styles |
| `public/` | Favicon, logo mark, fonts, work screenshots |

## To finish before launch

- [ ] **Brand font**: add the Sofia Pro files to `public/fonts/` and add `url()` sources in `src/styles.css` (instructions at the top of the file). Until then, Outfit is used as a close stand-in.
- [ ] **Logo**: the mark in `index.html` (`<symbol id="mark">`) and `public/logo-mark.svg` is rebuilt from the original by hand. Swap in the original SVG paths if they differ.
- [ ] **Work screenshots**: covers are generated artwork. Drop real screenshots into `public/work/` and set `image: '/work/your-file.png'` on each project in `src/data.js`. Add `url`s for projects that have live links.
- [ ] **Team photos**: avatars are generated monograms. Replace in `src/main.js` (`data-team` render) if you want real photos.
- [ ] **Social links**: `socials` in `src/data.js` currently point to each network's home page.
- [ ] **Client list**: `clients` in `src/data.js`; confirm these are teams you're happy to name.
- [ ] **Privacy policy**: footer links to the Webflow site's privacy page.

## Accessibility & performance

- Respects `prefers-reduced-motion` (no smooth scroll, no load sequence, static line field).
- Custom cursor only on fine pointers; touch devices get an auto-wandering light in the hero.
- Canvases pause when off-screen; WebGL renders at half resolution.
- Keyboard focus is visible everywhere; FAQ uses native `<details>`.
