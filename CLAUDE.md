# CLAUDE.md

Guidance for Claude Code when working in this repo.

## What this is
Simple Studio's landing page. Vanilla JS + Vite, GSAP/ScrollTrigger, Lenis, raw WebGL and Canvas 2D. No framework. Keep it that way unless asked.

## Commands
- `npm run dev` — dev server on :5173
- `npm run build` — static build to `dist/`

## Where things live
- Content: `src/data.js` (edit copy here, not in `main.js`)
- Static copy: `index.html` (hero, headings, CTA, footer)
- Motion/interaction: `src/main.js`
- Signature line field: `src/lines.js`; hero light: `src/aurora.js`; generated covers/avatars: `src/art.js`
- Tokens and styles: `src/styles.css` (`:root` holds the palette and type scale)

## Design rules (keep these)
- Pure black `#000` background. Lime `#DBF130` is a signal colour: CTAs, the cursor, highlights. Never large text fills.
- Violet `#7B5CFF`, magenta `#FF4DC4`, blue `#2E6BFF` appear only as light/glow, never as text colour.
- One family: Sofia Pro (fallback Outfit Variable). Weights 300/400/500. Tight negative tracking on display sizes.
- Sentence case everywhere. No all-caps labels, no eyebrow labels above headings, no arrows appended to buttons.
- Numbers only where content is a real sequence (process steps, onboarding).
- The line field is the one bold element. Keep other sections quiet; motion should answer scroll or the cursor, not decorate.
- Always respect `prefers-reduced-motion`. Test at 390px wide; no horizontal page scroll.

## Gotchas
- Don't put CSS `transition` on `transform` for elements GSAP animates (it fights GSAP). The nav intro uses a CSS class for this reason.
- After content changes that affect height, `ScrollTrigger.refresh()` runs on font load and window load; call it again if you add async content.
- `<use href="#mark">` can't be targeted by CSS/GSAP; inline the paths if you need to animate parts of the logo.
