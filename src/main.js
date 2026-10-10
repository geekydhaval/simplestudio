import '@fontsource-variable/outfit';
import '@fontsource-variable/archivo/wdth.css';
import '@fontsource-variable/geist-mono';
import './styles.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { createLineField } from './lines.js';
import { coverFor, avatarFor } from './art.js';
import { cdn, heroDesigns, clients, services, featured, work, plans, onboarding, team, faqs, socials } from './data.js';

gsap.registerPlugin(ScrollTrigger);

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const fill = (sel, html) => { const el = $(sel); if (el) el.innerHTML = html; return el; };

const check = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.2 4.2L19 7" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

/* ─────────────────────────────────────────────────────────
   The Simple mark, generated from the rebrand geometry.
   4×6 diagonal lines; the centre four are longer and brighter.
   ───────────────────────────────────────────────────────── */

let markId = 0;
function markSvg({ color = '#ffffff', centre = '#dbf130', alpha = 0.5, centreAlpha = 1, stroke = 8, cls = '' } = {}) {
  const id = `mk${++markId}`;
  let lines = '';
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 4; c++) {
      const mid = (c === 1 || c === 2) && (r === 2 || r === 3);
      const x2 = 34 + 47 * c, y2 = 43 * r;
      const x1 = mid ? 53 + 47 * (c - 1) : 9 + 47 * c;
      const y1 = y2 + (mid ? 27 : 24);
      lines += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="url(#${id}${mid ? 'c' : 'n'})"/>`;
    }
  }
  return `<svg class="mark ${cls}" viewBox="-4 -4 184 258" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id="${id}n" x1="0" y1="1" x2="1" y2="0"><stop stop-color="${color}" stop-opacity="${alpha * 0.25}"/><stop offset="1" stop-color="${color}" stop-opacity="${alpha}"/></linearGradient>
      <linearGradient id="${id}c" x1="0" y1="1" x2="1" y2="0"><stop stop-color="${centre}" stop-opacity="${centreAlpha * 0.55}"/><stop offset="1" stop-color="${centre}" stop-opacity="${centreAlpha}"/></linearGradient>
    </defs>
    <g stroke-width="${stroke}" stroke-linecap="round">${lines}</g></svg>`;
}

const markPresets = {
  nav: { alpha: 0.85, stroke: 10 },
  dot: { color: '#ffffff', alpha: 0.6, stroke: 12 },
  badge: { color: '#1b1f00', centre: '#1b1f00', alpha: 0.55, centreAlpha: 1, stroke: 12 },
  glyph: { color: '#1b1f00', centre: '#1b1f00', alpha: 0.5, centreAlpha: 1, stroke: 11 },
  orb: { color: '#ffffff', alpha: 0.7, stroke: 7 },
  team: { alpha: 0.7, stroke: 10 },
  benefit: { alpha: 0.6, stroke: 8 },
  medal: { color: '#1b1f00', centre: '#1b1f00', alpha: 0.5, stroke: 13 },
  req: { alpha: 0.7, stroke: 11 },
};
const mark = (preset) => markSvg(markPresets[preset]);

/* ─────────────────────────────────────────────────────────
   Dot-matrix icons
   ───────────────────────────────────────────────────────── */

const dotMaps = {
  arrow: ['..#..', '...#.', '#####', '...#.', '..#..'],
  grid: ['#.#.#', '.#.#.', '#.#.#', '.#.#.', '#.#.#'],
  star: ['..#..', '#.#.#', '.###.', '#.#.#', '..#..'],
  quote: ['##.##', '##.##', '.#..#', '#..#.', '.....'],
  flask: ['.###.', '..#..', '.#.#.', '#####', '#####'],
  check: ['.....', '....#', '...#.', '#.#..', '.#...'],
  pause: ['##.##', '##.##', '##.##', '##.##', '##.##'],
  seven: ['#####', '....#', '...#.', '..#..', '..#..'],
  code: ['.#...#.', '#.....#', '#..#..#', '#.....#', '.#...#.'],
};
function dotsSvg(kind) {
  const map = dotMaps[kind] || dotMaps.grid;
  const w = map[0].length, h = map.length;
  let d = '';
  map.forEach((row, y) => [...row].forEach((ch, x) => {
    d += `<circle cx="${x * 4 + 2}" cy="${y * 4 + 2}" r="1.35" fill="currentColor" opacity="${ch === '#' ? 1 : 0.16}"/>`;
  }));
  return `<svg viewBox="0 0 ${w * 4} ${h * 4}" aria-hidden="true">${d}</svg>`;
}

/* ─────────────────────────────────────────────────────────
   Render
   ───────────────────────────────────────────────────────── */

$$('[data-mark]').forEach((el) => (el.innerHTML = mark(el.dataset.mark)));
$$('[data-dots]').forEach((el) => (el.innerHTML = dotsSvg(el.dataset.dots)));

// Hero app icons: what we design, in four colours
{
  const icons = [
    { c: '#ff4dc4', label: 'Product UI', svg: '<path d="M4 3l13 6-5.5 1.8L9.7 16z" fill="#fff"/>' },
    { c: '#7b5cff', label: 'Motion', svg: '<path d="M6 4l10 6-10 6z" fill="#fff"/>' },
    { c: '#dbf130', label: '3D', svg: '<path d="M10 2.5l6.5 3.7v7.6L10 17.5l-6.5-3.7V6.2z M10 2.5v7.6 M3.5 6.2l6.5 3.9 6.5-3.9" fill="none" stroke="#1b1f00" stroke-width="1.6" stroke-linejoin="round"/>' },
    { c: '#2e6bff', label: 'Branding', svg: '<path d="M4 16l2.5-.6L15.8 6a1.6 1.6 0 0 0-2.3-2.3L4.6 13.5z" fill="#fff"/>' },
  ];
  fill('[data-icons]', icons.map((i) => `<li style="--c:${i.c}" title="${i.label}"><svg viewBox="0 0 20 20" aria-label="${i.label}">${i.svg}</svg></li>`).join(''));
}

// Hero wall: two rows of designs drifting in opposite directions
{
  const half = Math.ceil(heroDesigns.length / 2);
  // Both rows carry every design, offset, so the loop never shows a repeat side by side.
  const card = (d, hide) => `<figure class="wall__card"${hide ? ' aria-hidden="true"' : ''}><img src="${cdn}${d.file}" alt="${hide ? '' : esc(d.alt)}" loading="lazy" /></figure>`;
  const row = (list, rev) => `<div class="wall__row${rev ? ' wall__row--rev' : ''}"><div class="wall__track">${list.map((d) => card(d)).join('')}${list.map((d) => card(d, true)).join('')}</div></div>`;
  fill('[data-wall]', row(heroDesigns) + row([...heroDesigns.slice(half), ...heroDesigns.slice(0, half)].reverse(), true));
}

// Clients marquee (doubled for a seamless loop)
{
  const cols = ['#dbf130', '#7b5cff', '#ff4dc4', '#2e6bff'];
  const items = clients.map((c, i) => `<span class="marquee__item"><i style="--c:${cols[i % 4]}"></i>${esc(c)}</span>`).join('');
  fill('[data-marquee]', items + items.replace(/class="marquee__item"/g, 'class="marquee__item" aria-hidden="true"'));
}

// Selected work tiles
{
  const layout = { site: 'tile--tall', hda: 'tile--wide tile--fan' };
  const media = (c) => {
    if (c.media === 'site') return `<div class="tile__scroll"><img src="${c.image}" alt="${esc(c.name)} landing page, full length" loading="lazy" /></div>`;
    if (c.media === 'hda') return `<div class="fan">${c.screens.map((src, i) => `<img src="${src}" alt="${i ? '' : esc(c.name) + ' app screens'}" loading="lazy" style="--i:${i - (c.screens.length - 1) / 2};--ia:${Math.abs(i - (c.screens.length - 1) / 2)};z-index:${10 - Math.abs(i - (c.screens.length - 1) / 2) * 2}" />`).join('')}</div>`;
    return `<img src="${c.image}" alt="${esc(c.name)}, designed by Simple" loading="lazy" />${c.phone ? `<div class="tile__phone" aria-hidden="true"><div><img src="${c.phone}" alt="" loading="lazy" /></div></div>` : ''}`;
  };
  fill('[data-featured]', featured.map((c) => {
    const tag = c.url ? 'a' : 'div';
    const attrs = c.url ? ` href="${c.url}" target="_blank" rel="noopener" aria-label="${esc(c.name)}: ${esc(c.linkLabel || 'Visit')}"` : '';
    return `<${tag} class="tile ${layout[c.media] || ''}${c.phone ? ' tile--phone' : ''}"${attrs} data-tilt style="--accent:${c.accent}">
      ${c.status ? `<span class="chip-mono chip-mono--violet tile__status">${esc(c.status)}</span>` : ''}
      <div class="tile__media">${media(c)}</div>
      <div class="tile__cap">
        <div><p class="tile__name">${esc(c.name)}</p><p class="tile__kind">${esc(c.kind)} · ${esc(c.industry)}</p></div>
        ${c.url ? '<span class="tile__go" aria-hidden="true">↗</span>' : `<span class="tile__kind">${c.media === 'hda' ? 'App Store soon' : 'Launching soon'}</span>`}
      </div>
    </${tag}>`;
  }).join(''));

  // How far the tall site screenshot scrolls on hover
  const setScroll = () => $$('.tile__scroll').forEach((s) => {
    const img = $('img', s);
    if (img?.naturalHeight) s.closest('.tile').style.setProperty('--scroll', `${-(img.offsetHeight - s.offsetHeight)}px`);
  });
  $$('.tile__scroll img').forEach((img) => img.addEventListener('load', setScroll));
  window.addEventListener('resize', setScroll);
  window.addEventListener('load', setScroll);
}

// What we design
fill('[data-chipcloud]', ['Landing pages', 'Product UI', 'Mobile apps', 'Branding', 'Logos', '3D illustration', 'Motion', 'Explainers', 'Social media', 'Webflow', 'Pitch decks']
  .map((c) => `<li>${esc(c)}</li>`).join('') + '<li class="more">More</li>');

// The lab
fill('[data-lab]', work.map((p) => {
  const tag = p.url ? 'a' : 'div';
  const attrs = p.url ? ` href="${p.url}" target="_blank" rel="noopener"` : '';
  return `<${tag} class="panel lab-card"${attrs} data-tilt>
    <div class="lab-card__cover">${p.image ? `<img src="${p.image}" alt="${esc(p.name)}" loading="lazy" />` : coverFor(p.art)}</div>
    <div class="lab-card__meta"><span class="lab-card__name">${esc(p.name)}</span><span class="tile__kind">${esc(p.tag)}</span></div>
    <p class="muted lab-card__body">${esc(p.body)}</p>
  </${tag}>`;
}).join(''));

// How it works
{
  const cursor = `<svg class="vis-cursor" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 3l14 7-6 2-2.6 6.4z" fill="#ececec" stroke="#0f0f0f" stroke-width="1.2" stroke-linejoin="round"/></svg>`;
  const chipsA = ['Landing page', 'App screens', 'Logo', '3D hero', 'Pitch deck', 'Launch film'];
  const chipsB = ['Webflow build', 'Icons', 'Social posts', 'Explainer', 'Onboarding', 'Brand kit'];
  const row = (arr, rev) => `<div class="vis-row ${rev ? 'vis-row--rev' : ''}">${[...arr, ...arr].map((c) => `<span>${c}</span>`).join('')}</div>`;
  const visuals = [
    `<ul class="vis-plan"><li>Your Trello board</li><li>Unlimited requests</li><li>Figma file access</li>
       <li class="vis-plan__btn"><span class="btn-dark" aria-hidden="true"><span class="btn-dark__icon">${dotsSvg('arrow')}</span><span>Get started</span></span></li></ul>${cursor}`,
    `<div class="vis-rows">${row(chipsA)}${row(chipsB, true)}</div>
     <div class="vis-req"><div class="vis-req__logo">${mark('req')}</div><div class="vis-req__input">Design a landing page for our AI launch</div><div class="vis-req__meta"><i></i>Due in 2 days</div></div>`,
    `<div class="vis-frames"><div><span>v1</span></div><div><span>Final</span><span>.fig</span></div><div><span>v2</span></div></div>`,
  ];
  const bars = ['lime', 'violet', 'magenta'];
  const icons = ['check', 'quote', 'star'];
  fill('[data-steps]', onboarding.map((s, i) => `
    <article class="panel step" data-tilt>
      <div class="step__vis">${visuals[i]}</div>
      <div class="step__foot">
        <h3 class="bar-title"><span class="sq">${dotsSvg(icons[i])}</span><span class="bar bar--${bars[i]}"></span>${esc(s.title)}</h3>
        <p class="muted">${esc(s.body)}</p>
      </div>
    </article>`).join(''));
}

// Services
{
  const illustrations = {
    product: `<svg class="ill-ui" viewBox="0 0 420 240" fill="none">
      <rect x="10" y="10" width="400" height="220" rx="16" stroke="rgba(242,242,238,.18)"/>
      <circle cx="32" cy="30" r="4" fill="rgba(242,242,238,.25)"/><circle cx="46" cy="30" r="4" fill="rgba(242,242,238,.25)"/><circle cx="60" cy="30" r="4" fill="rgba(242,242,238,.25)"/>
      <line x1="10" y1="48" x2="410" y2="48" stroke="rgba(242,242,238,.12)"/>
      <rect class="float" x="34" y="70" width="170" height="16" rx="8" fill="rgba(242,242,238,.85)"/>
      <rect x="34" y="96" width="120" height="10" rx="5" fill="rgba(242,242,238,.25)"/>
      <rect x="34" y="114" width="140" height="10" rx="5" fill="rgba(242,242,238,.25)"/>
      <rect class="float" x="34" y="144" width="96" height="32" rx="16" fill="#DBF130"/>
      <rect class="float" x="236" y="70" width="150" height="130" rx="14" fill="url(#uiGlow)" stroke="rgba(123,92,255,.6)"/>
      <path d="M262 160 l26 -30 l20 18 l26 -36 l26 30" stroke="#F2F2EE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <g class="float"><path d="M330 168 L330 196 L338 189 L344 202 L349 200 L343 187 L353 187Z" fill="#DBF130"/></g>
      <defs><linearGradient id="uiGlow" x1="0" y1="1" x2="1" y2="0"><stop stop-color="#7B5CFF" stop-opacity=".45"/><stop offset="1" stop-color="#FF4DC4" stop-opacity=".1"/></linearGradient></defs>
    </svg>`,
    motion: `<svg class="ill-curve" viewBox="0 0 400 230" fill="none">
      <g stroke="rgba(242,242,238,.08)"><line x1="20" y1="30" x2="380" y2="30"/><line x1="20" y1="115" x2="380" y2="115"/><line x1="20" y1="200" x2="380" y2="200"/>
      <line x1="20" y1="20" x2="20" y2="210"/><line x1="200" y1="20" x2="200" y2="210"/><line x1="380" y1="20" x2="380" y2="210"/></g>
      <path d="M20 200 C 140 200, 160 30, 380 30" stroke="rgba(242,242,238,.15)" stroke-width="2"/>
      <path class="track" d="M20 200 C 140 200, 160 30, 380 30" stroke="#DBF130" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="20" y1="200" x2="140" y2="200" stroke="rgba(123,92,255,.8)" stroke-dasharray="3 4"/><line x1="380" y1="30" x2="160" y2="30" stroke="rgba(123,92,255,.8)" stroke-dasharray="3 4"/>
      <circle cx="140" cy="200" r="5" fill="#7B5CFF"/><circle cx="160" cy="30" r="5" fill="#7B5CFF"/>
      <circle class="dot" r="9" fill="#DBF130"/>
    </svg>`,
    brand: (() => {
      // The Simple mark, scattered. Hover the card and every line falls into place.
      let l = '';
      for (let r = 0; r < 6; r++) for (let c = 0; c < 4; c++) {
        const mid = (c === 1 || c === 2) && (r === 2 || r === 3);
        const x2 = 34 + 47 * c, y2 = 43 * r, x1 = mid ? 53 + 47 * (c - 1) : 9 + 47 * c, y1 = y2 + (mid ? 27 : 24);
        const rot = Math.round((Math.sin(r * 7.3 + c * 3.1) * 0.5 + 0.5) * 140 - 70);
        l += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" style="--r:${rot}deg" stroke="${mid ? '#DBF130' : '#F2F2EE'}" stroke-opacity="${mid ? 1 : 0.55}"/>`;
      }
      return `<svg class="ill-brand" viewBox="0 0 420 260" fill="none">
        <g class="grid" stroke="#F2F2EE"><rect x="122" y="14" width="176" height="232" rx="2"/><line x1="122" y1="130" x2="298" y2="130"/><line x1="210" y1="14" x2="210" y2="246"/><circle cx="210" cy="130" r="88"/></g>
        <g transform="translate(122 14) scale(1 .93)" stroke-width="4.5" stroke-linecap="round">${l}</g>
      </svg>`;
    })(),
  };
  fill('[data-services]', services.map((s) => `
    <article class="panel feat" data-tilt>
      <div class="feat__head"><h3 class="feat__title">${esc(s.title)}</h3><p class="muted">${esc(s.body)}</p></div>
      <div class="feat__vis">${s.video ? `<div class="feat__video"><video muted loop playsinline preload="none" poster="${cdn}${s.video}-poster-00001.jpg" aria-label="3D animation: ${esc(s.title)}"><source src="${cdn}${s.video}-transcode.webm" type="video/webm" /><source src="${cdn}${s.video}-transcode.mp4" type="video/mp4" /></video></div>` : illustrations[s.id]}</div>
      <ul class="feat__items">${s.items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>
    </article>`).join(''));
}

// Benefits
{
  const star = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l2.9 6 6.6.8-4.9 4.5 1.3 6.5L12 17l-5.9 3.3 1.3-6.5L2.5 9.3l6.6-.8z" fill="#dbf130"/></svg>`;
  const benefits = [
    { t: 'Unlimited requests', b: 'Add as many requests to your board as you like. We work through them one by one, in your order.',
      v: `<div class="b-stack">${[3, 2, 1].map((n) => `<div>Request 0${n}<i></i></div>`).join('')}</div>` },
    { t: 'Lightning-fast delivery', b: 'Most requests land in one to four days. Simple designs often in one or two.',
      v: `<div class="b-track"><div class="b-track__bar"><span></span></div><div class="b-track__labels"><span>Request</span><span>1–4 days</span><span>Delivered</span></div></div>` },
    { t: 'One flat plan', b: 'One monthly plan, scoped to you. No hourly bills, no surprise invoices.',
      v: `<div class="b-loop"><svg viewBox="0 0 200 110" fill="none"><ellipse cx="100" cy="55" rx="96" ry="50" stroke="#2c2c2c" stroke-dasharray="4 6"/><circle cx="196" cy="55" r="4" fill="#7b5cff"/><circle cx="4" cy="55" r="4" fill="#ff4dc4"/></svg><span class="b-loop__pill">One plan</span></div>` },
    { t: 'Unique and all yours', b: 'Every design is made for you and is 100% yours. Figma files included.',
      v: `<div class="b-mark">${mark('benefit')}</div>` },
    { t: 'Top-notch quality', b: 'Senior-level craft on every request, directed by a designer with 8+ years in the industry.',
      v: `<div class="b-stars">${star}${star}${star}<span class="medal">${mark('medal')}</span></div>` },
    { t: 'Pause anytime', b: 'Quiet month? Pause your subscription and pick up right where you left off.',
      v: `<button class="b-toggle is-on" type="button" aria-pressed="true" aria-label="Subscription active, click to pause"><span></span><em class="b-toggle__label">Active</em></button>` },
  ];
  fill('[data-benefits]', benefits.map((x) => `
    <article class="panel feat feat--benefit" data-tilt>
      <div class="feat__vis">${x.v}</div>
      <div class="feat__head"><h3 class="feat__title">${esc(x.t)}</h3><p class="muted">${esc(x.b)}</p></div>
    </article>`).join(''));
  const tog = $('.b-toggle');
  tog?.addEventListener('click', () => {
    const on = !tog.classList.contains('is-on');
    tog.classList.toggle('is-on', on);
    tog.setAttribute('aria-pressed', String(on));
    tog.setAttribute('aria-label', on ? 'Subscription active, click to pause' : 'Subscription paused, click to resume');
    $('.b-toggle__label', tog).textContent = on ? 'Active' : 'Paused';
  });
}

// Pricing: one ticket, three scopes
{
  const short = ['Design + Webflow', '+ 3D & Motion', 'Enterprise'];
  const seg = $('[data-seg]');
  const list = $('[data-ticket]');
  const start = Math.max(0, plans.findIndex((p) => p.featured));
  seg.innerHTML = plans.map((p, i) => `<button type="button" role="tab" id="plan-${i}" aria-controls="plan-panel" aria-selected="${i === start}">${esc(short[i] || p.name)}</button>`).join('');
  list.id = 'plan-panel';
  list.setAttribute('role', 'tabpanel');
  const render = (i, animate) => {
    const p = plans[i];
    list.setAttribute('aria-labelledby', `plan-${i}`);
    list.innerHTML = `<li class="ticket__for">${esc(p.for)}</li>` + p.items.map((it) => `<li>${check}<span>${esc(it)}</span></li>`).join('');
    if (animate && !reduced) gsap.from(list.children, { y: 10, opacity: 0, duration: 0.5, stagger: 0.035, ease: 'expo.out' });
  };
  render(start);
  $$('button', seg).forEach((b, i) => b.addEventListener('click', () => {
    $$('button', seg).forEach((o) => o.setAttribute('aria-selected', String(o === b)));
    render(i, true);
    ScrollTrigger.refresh();
  }));
}

// FAQ
fill('[data-faq]', faqs.map((f) => `
  <details class="qa"><summary>${esc(f.q)}<span class="qa__icon" aria-hidden="true"></span></summary><div class="qa__a"><p>${esc(f.a)}</p></div></details>`).join(''));

// Team
fill('[data-faces]', team.map((m, i) => `<li title="${esc(m.handle)}">${avatarFor(m.handle, i)}</li>`).join(''));
fill('[data-team]', team.map((m) => `<dt>${esc(m.handle)}</dt><dd>${esc(m.role)}</dd>`).join('') + '<dt>Based in</dt><dd>Surat, India</dd>');
fill('[data-skills]', ['UI/UX', 'Webflow', '3D', 'Motion', 'Branding', 'Rive'].map((s) => `<li class="chip-mono">${s}</li>`).join(''));
fill('[data-socials]', socials.map((s) => `<li><a href="${s.url}" target="_blank" rel="noopener">${esc(s.name)}</a></li>`).join(''));
$$('[data-year]').forEach((el) => (el.textContent = new Date().getFullYear()));

/* ─────────────────────────────────────────────────────────
   Smooth scroll, nav, menu
   ───────────────────────────────────────────────────────── */

let lenis = null;
if (!reduced) {
  lenis = new Lenis({ duration: 1.1, easing: (t) => 1 - Math.pow(1 - t, 4) });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}

const menuBtn = $('.nav__menu');
const menu = $('#mobile-menu');
function closeMenu() {
  if (menu.hidden) return;
  menu.hidden = true;
  menuBtn.setAttribute('aria-expanded', 'false');
  menuBtn.setAttribute('aria-label', 'Open menu');
  lenis?.start();
}
menuBtn.addEventListener('click', () => {
  if (!menu.hidden) return closeMenu();
  menu.hidden = false;
  menuBtn.setAttribute('aria-expanded', 'true');
  menuBtn.setAttribute('aria-label', 'Close menu');
  lenis?.stop();
  if (!reduced) gsap.from($$('#mobile-menu a'), { yPercent: 60, opacity: 0, stagger: 0.05, duration: 0.7, ease: 'expo.out' });
});
document.addEventListener('keydown', (e) => e.key === 'Escape' && closeMenu());

$$('a[href^="#"]').forEach((a) =>
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    const target = id === '#top' ? document.body : $(id);
    if (!target) return;
    e.preventDefault();
    closeMenu();
    if (lenis) lenis.scrollTo(target, { offset: id === '#top' ? 0 : -90 });
    else target.scrollIntoView();
  })
);

// Nav tucks away while scrolling down, returns on scroll up
{
  const nav = $('[data-nav]');
  let last = 0;
  const onScroll = () => {
    const y = window.scrollY;
    nav.classList.toggle('is-hidden', y > 300 && y > last && menu.hidden);
    last = y;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ─────────────────────────────────────────────────────────
   Motion
   ───────────────────────────────────────────────────────── */

// Logo object: an aligned line field around the glowing mark
const orbField = createLineField($('.orb__lines'), { startOrdered: true, spacing: 26, length: 13, radius: 150, baseAlpha: 0.14, noise: 0.5 });
if (finePointer && !reduced) {
  const stage = $('.orb__stage');
  const m = $('.orb__mark');
  const rx = gsap.quickTo(m, 'rotationY', { duration: 0.8, ease: 'power3' });
  const ry = gsap.quickTo(m, 'rotationX', { duration: 0.8, ease: 'power3' });
  gsap.set(stage, { perspective: 700 });
  stage.addEventListener('pointermove', (e) => {
    const r = stage.getBoundingClientRect();
    rx(((e.clientX - r.left) / r.width - 0.5) * 30);
    ry(-((e.clientY - r.top) / r.height - 0.5) * 30);
  });
  stage.addEventListener('pointerleave', () => { rx(0); ry(0); });
}
// Scrolling through the object, the field shakes loose then settles
if (!reduced) {
  ScrollTrigger.create({
    trigger: '.orb', start: 'top bottom', end: 'bottom top', scrub: true,
    onUpdate: (st) => orbField.setEntropy(Math.abs(st.progress - 0.5) * 1.4),
  });
}

// Feature cards play their small animations once seen
$$('.feat').forEach((c) => ScrollTrigger.create({ trigger: c, start: 'top 80%', once: true, onEnter: () => c.classList.add('is-in') }));

// 3D renders play while they're on screen
{
  const vids = $$('.feat__video video');
  if (!reduced && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.preload = 'auto'; e.target.play().catch(() => {}); } else e.target.pause();
    }), { threshold: 0.25 });
    vids.forEach((v) => io.observe(v));
    // Hover speeds the render up a little
    vids.forEach((v) => {
      const card = v.closest('.feat');
      card.addEventListener('pointerenter', () => (v.playbackRate = 1.6));
      card.addEventListener('pointerleave', () => (v.playbackRate = 1));
    });
  }
}

// Cards tilt toward the cursor
if (finePointer && !reduced) {
  $$('[data-tilt]').forEach((el) => {
    gsap.set(el, { transformPerspective: 900 });
    const rx = gsap.quickTo(el, 'rotationX', { duration: 0.6, ease: 'power3' });
    const ry = gsap.quickTo(el, 'rotationY', { duration: 0.6, ease: 'power3' });
    const max = el.classList.contains('tile') ? 5 : 8;
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      ry(((e.clientX - r.left) / r.width - 0.5) * max);
      rx(-((e.clientY - r.top) / r.height - 0.5) * max);
    });
    el.addEventListener('pointerleave', () => { rx(0); ry(0); });
  });
}

// FAQ: animated open/close on top of native <details>
$$('.qa').forEach((d) => {
  const summary = $('summary', d);
  const body = $('.qa__a', d);
  summary.addEventListener('click', (e) => {
    if (reduced) return;
    e.preventDefault();
    if (d.open) {
      gsap.to(body, { height: 0, duration: 0.45, ease: 'expo.inOut', onComplete: () => { d.open = false; body.style.height = ''; ScrollTrigger.refresh(); } });
    } else {
      d.open = true;
      gsap.fromTo(body, { height: 0 }, { height: 'auto', duration: 0.6, ease: 'expo.out', onComplete: () => ScrollTrigger.refresh() });
    }
  });
});

if (!reduced) {
  // Hero intro
  const tl = gsap.timeline({ delay: 0.1 });
  tl.from('.hero .hl', { yPercent: 60, opacity: 0, duration: 1.2, stagger: 0.1, ease: 'expo.out' })
    .from('.app-icons li', { scale: 0, duration: 0.7, stagger: 0.06, ease: 'back.out(2)' }, 0.2)
    .from('.hero__badge', { scale: 0, rotate: -90, duration: 1, ease: 'back.out(1.8)' }, 0.35)
    .from('.arrow', { scaleX: 0, transformOrigin: 'left center', duration: 0.9, ease: 'expo.out' }, 0.6)
    .from('.wall__row', { y: 60, opacity: 0, duration: 1.4, stagger: 0.12, ease: 'expo.out' }, 0.5)
    .from(['.hero__caption', '.hero__note', '.hero__card'], { y: 30, opacity: 0, duration: 1, stagger: 0.08, ease: 'expo.out' }, 0.45);

  // Section reveals
  const revealSel = ['.sec-head', '.tile', '.side-card', '.side-label', '.chip-cloud', '.glow-card', '.lab > *', '.pitch__card', '.step', '.feat',
    '.pricing__lead', '.ticket', '.mini-card', '.qa', '.cta__copy', '.manifesto', '.team', '.footer__row'].join(',');
  gsap.set(revealSel, { y: 40, opacity: 0 });
  ScrollTrigger.batch(revealSel, {
    start: 'top 90%', once: true,
    onEnter: (els) => gsap.to(els, { y: 0, opacity: 1, duration: 1, stagger: 0.07, ease: 'expo.out', overwrite: true }),
  });

  // The pitch card's app icon floats up into place
  gsap.from('.app-glyph', { y: 40, rotate: -8, scale: 0.85, ease: 'none', scrollTrigger: { trigger: '.pitch', start: 'top bottom', end: 'center center', scrub: true } });

  // Footer wordmark rises
  gsap.from('.footer__word', { yPercent: 40, opacity: 0, duration: 1.4, ease: 'expo.out', scrollTrigger: { trigger: '.footer', start: 'top 95%', once: true } });

  // Lit card edges follow the pointer
  if (finePointer) {
    $$('.panel').forEach((c) =>
      c.addEventListener('pointermove', (e) => {
        const r = c.getBoundingClientRect();
        c.style.setProperty('--mx', `${e.clientX - r.left}px`);
        c.style.setProperty('--my', `${e.clientY - r.top}px`);
      })
    );
  }
}

document.fonts?.ready.then(() => ScrollTrigger.refresh());
window.addEventListener('load', () => ScrollTrigger.refresh());
