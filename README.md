# Simple Design — landing page

The landing page for **Simple Design**: product design, Webflow, 3D and motion for startups building in the age of AI.

Visual language: a dark three-column grid with dashed guides and "+" markers, extra-black extended uppercase headlines, light skeuomorphic cards, pressable dark buttons with dot-matrix icons and mono chips. All of it carries Simple's own brand: the 4×6 diagonal-line mark from the *Logo – Rebrand* file and the Simple lime `#DBF130`.

Right under the hero, a single straight row of designs from the original site scrolls past (hover to pause it and lift a card). The services show the studio's 3D renders, which play when on screen.

**The work comes first.** Right after the hero and the client strip, *Selected work* shows scallopx.com (hover to scroll the full landing page), the Scallop app, E Money Network's 3D landing page (in progress) and the Human Design Academy app. Our own products live in *From the lab*.

## Sections

Hero · clients · selected work + the lab · pitch card · how it works · what we do · benefits · logo object · pricing ticket · FAQ · call to action · manifesto and team · footer.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs to /dist (static, deploy anywhere: Vercel, Netlify, GitHub Pages)
```

## Stack

- [Vite](https://vitejs.dev), no framework
- [GSAP](https://gsap.com) + ScrollTrigger: hero intro, scroll reveals, small card animations
- [Lenis](https://lenis.darkroom.engineering): smooth scrolling
- Canvas 2D: the aligning line field around the glowing logo object (`src/lines.js`)
- Fonts via Fontsource: Archivo (display), Outfit (body, Sofia Pro if installed), Geist Mono (labels)

## Editing

- Copy and case studies: `src/data.js`
- Section layout and static text: `index.html`
- Rendering and motion: `src/main.js`
- Styles and tokens: `src/styles.css`
- Work images: `public/work/`

## To do

- Add more Emoney and Scallop screens as they're ready.
- Point the social links in `src/data.js` at the real profiles.

## Hosting

Live at **https://simplr.art**. Every push to `main` builds the site and deploys it to GitHub Pages (`.github/workflows/deploy.yml`). The custom domain is set by `public/CNAME`; DNS for simplr.art lives in GoDaddy (A records to GitHub Pages, `www` CNAME to `geekydhaval.github.io`).
