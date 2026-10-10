import '@fontsource-variable/outfit';
import './styles.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { createLineField } from './lines.js';
import { createAurora } from './aurora.js';
import { coverFor, avatarFor } from './art.js';
import { links, clients, services, work, process, plans, onboarding, team, faqs, socials } from './data.js';

gsap.registerPlugin(ScrollTrigger);

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/* ─────────────────────────────────────────────────────────
   Render content from data.js
   ───────────────────────────────────────────────────────── */

const check = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.2 4.2L19 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const markSvg = `<svg viewBox="0 0 100 100" aria-hidden="true"><use href="#mark"/></svg>`;

// Marquee (duplicated once so the loop is seamless)
{
  const items = clients.map((c) => `<span class="marquee__item">${markSvg}${esc(c)}</span>`).join('');
  $('.marquee__track').innerHTML = items + items.replace(/class="marquee__item"/g, 'class="marquee__item" aria-hidden="true"');
}

// Service illustrations — each one says what the service is.
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
  brand: `<svg class="ill-brand" viewBox="0 0 420 240" fill="none">
      <g class="grid" stroke="#F2F2EE"><circle cx="210" cy="120" r="96"/><circle cx="210" cy="120" r="64"/><circle cx="210" cy="120" r="32"/>
      <line x1="90" y1="120" x2="330" y2="120"/><line x1="210" y1="10" x2="210" y2="230"/><line x1="125" y1="35" x2="295" y2="205"/><line x1="295" y1="35" x2="125" y2="205"/></g>
      <g class="spin" transform="translate(146 56) scale(1.28)" stroke="#DBF130" stroke-width="5" stroke-linecap="round">
        <path d="M82.91 31 A38 38 0 0 1 31 82.91"/><path d="M17.09 69 A38 38 0 0 1 69 17.09"/><path d="M76.87 23.13 L66.97 33.03"/><path d="M23.13 76.87 L33.03 66.97"/>
      </g>
      <text x="34" y="226" fill="rgba(242,242,238,.4)" font-size="12" font-family="Sofia Pro, Outfit Variable, sans-serif">#DBF130</text>
      <rect x="350" y="200" width="36" height="24" rx="6" fill="#DBF130"/><rect x="306" y="200" width="36" height="24" rx="6" fill="#7B5CFF"/>
    </svg>`,
};

$('[data-services]').innerHTML =
  services
    .map(
      (s) => `
    <article class="card card--${s.id}">
      <div class="card__art">${illustrations[s.id]}</div>
      <h3 class="card__title">${esc(s.title)}</h3>
      <p class="card__body">${esc(s.body)}</p>
      <ul class="card__items">${s.items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>
    </article>`
    )
    .join('') +
  `<article class="card card--deal">
      <p class="deal__big">Unlimited requests. One flat plan.</p>
      <div class="deal__row">
        <p class="card__body">Free for the first 7 days. Pause or cancel anytime.</p>
        <a class="btn btn--dark magnetic" href="${links.booking}" target="_blank" rel="noopener" data-cursor="Book">Start free</a>
      </div>
    </article>`;

$('[data-work]').innerHTML = work
  .map((p, i) => {
    const cover = p.image ? `<img src="${p.image}" alt="${esc(p.name)} preview" loading="lazy"/>` : coverFor(p.art);
    const tagOpen = p.url ? `<a class="project" href="${p.url}" target="_blank" rel="noopener" data-cursor="Visit">` : `<article class="project" data-cursor="Soon">`;
    const tagClose = p.url ? '</a>' : '</article>';
    return `${tagOpen}
      <div class="project__cover">${cover}<span class="project__tag">${esc(p.tag)}</span></div>
      <div class="project__meta"><h3 class="project__name">${esc(p.name)}</h3><span class="project__index">${String(i + 1).padStart(2, '0')} / ${String(work.length).padStart(2, '0')}</span></div>
      <p class="project__body">${esc(p.body)}</p>
    ${tagClose}`;
  })
  .join('');

$('[data-process]').innerHTML = process
  .map((s) => `<li class="step"><h3 class="step__title">${esc(s.title)}</h3><p class="step__body">${esc(s.body)}</p></li>`)
  .join('');

$('[data-plans]').innerHTML = plans
  .map(
    (p) => `
  <article class="plan${p.featured ? ' plan--featured' : ''}">
    ${p.featured ? '<span class="plan__flag">Most loved</span>' : ''}
    <h3 class="plan__name">${esc(p.name)}</h3>
    <p class="plan__for">${esc(p.for)}</p>
    <p class="plan__price">Let's talk<small>Priced to your scope</small></p>
    <ul class="plan__items">${p.items.map((i) => `<li>${check}<span>${esc(i)}</span></li>`).join('')}</ul>
    <a class="btn ${p.featured ? 'btn--lime' : 'btn--ghost'} magnetic" href="${links.booking}" target="_blank" rel="noopener" data-cursor="Book">${p.featured || p.name.startsWith('Design + Webflow') ? 'Book a call' : 'Schedule a call'}</a>
  </article>`
  )
  .join('');

$('[data-onboard]').innerHTML = onboarding.map((o) => `<li><strong>${esc(o.title)}</strong><p>${esc(o.body)}</p></li>`).join('');

$('[data-team]').innerHTML = team
  .map((m, i) => `<li class="member"><div class="member__face">${avatarFor(m.handle, i)}</div><p class="member__handle">${esc(m.handle)}</p><p class="member__role">${esc(m.role)}</p></li>`)
  .join('');

$('[data-faq]').innerHTML = faqs
  .map((f) => `<details class="qa"><summary>${esc(f.q)}<span class="qa__icon" aria-hidden="true"></span></summary><div class="qa__a"><p>${esc(f.a)}</p></div></details>`)
  .join('');

$('[data-socials]').innerHTML = socials.map((s) => `<li><a href="${s.url}" target="_blank" rel="noopener">${esc(s.name)}</a></li>`).join('');
$('[data-year]').textContent = new Date().getFullYear();

/* ─────────────────────────────────────────────────────────
   Smooth scroll
   ───────────────────────────────────────────────────────── */

let lenis = null;
if (!reduced) {
  lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}

$$('a[href^="#"]').forEach((a) =>
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    const target = id === '#top' ? 0 : $(id);
    if (id !== '#top' && !target) return;
    e.preventDefault();
    closeMenu();
    if (lenis) lenis.scrollTo(target, { offset: id === '#work' ? 0 : -40 });
    else window.scrollTo({ top: id === '#top' ? 0 : target.offsetTop - 40 });
  })
);

/* ─────────────────────────────────────────────────────────
   Nav: hide on scroll down, show on scroll up. Mobile menu.
   ───────────────────────────────────────────────────────── */

const nav = $('[data-nav]');
let lastY = 0;
window.addEventListener(
  'scroll',
  () => {
    const y = window.scrollY;
    nav.classList.toggle('is-hidden', y > 300 && y > lastY && !document.body.classList.contains('menu-open'));
    lastY = y;
  },
  { passive: true }
);

const menuBtn = $('.nav__menu');
const menu = $('#mobile-menu');
function closeMenu() {
  if (menu.hidden) return;
  menu.hidden = true;
  menuBtn.setAttribute('aria-expanded', 'false');
  menuBtn.setAttribute('aria-label', 'Open menu');
  document.body.classList.remove('menu-open');
  lenis?.start();
}
menuBtn.addEventListener('click', () => {
  if (!menu.hidden) return closeMenu();
  menu.hidden = false;
  menuBtn.setAttribute('aria-expanded', 'true');
  menuBtn.setAttribute('aria-label', 'Close menu');
  document.body.classList.add('menu-open');
  lenis?.stop();
  if (!reduced) gsap.from($$('#mobile-menu a'), { yPercent: 60, opacity: 0, stagger: 0.05, duration: 0.7, ease: 'expo.out' });
});
document.addEventListener('keydown', (e) => e.key === 'Escape' && closeMenu());

/* ─────────────────────────────────────────────────────────
   Hero: the one orchestrated moment. Chaos → simple.
   ───────────────────────────────────────────────────────── */

const field = createLineField($('.hero__lines'));
const aurora = createAurora($('.hero__aurora'));

function splitChars(el) {
  const text = el.textContent;
  el.textContent = '';
  [...text].forEach((c) => {
    const s = document.createElement('span');
    s.className = c === ' ' ? 'ch sp' : 'ch';
    s.textContent = c === ' ' ? '\u00a0' : c;
    el.appendChild(s);
  });
  return $$('.ch', el);
}
const chars = $$('.hero__title .split').flatMap(splitChars);

if (reduced) {
  field.order = 1;
  if (aurora) aurora.intensity = 1;
} else {
  nav.classList.add('is-pre');
  const tl = gsap.timeline({ delay: 0.15 });
  tl.to(field, { order: 1, duration: 2.6, ease: 'expo.inOut' }, 0)
    .to(aurora || {}, { intensity: 1, duration: 3, ease: 'power2.inOut' }, 0.4)
    .from(chars, { yPercent: 115, rotate: 6, duration: 1.4, stagger: 0.035, ease: 'expo.out' }, 0.75)
    .from('.hero__mark', { rotate: -220, scale: 0.4, opacity: 0, duration: 1.8, ease: 'expo.out' }, 0.9)
    .fromTo('.hero__mark .mark__arc', { strokeDashoffset: 160 }, { strokeDashoffset: 0, duration: 1.6, ease: 'expo.inOut' }, 0.9)
    .from('[data-hero-fade]', { y: 24, opacity: 0, duration: 1.1, stagger: 0.09, ease: 'expo.out' }, 1.5)
    .call(() => nav.classList.remove('is-pre'), null, 1.4);

  // Leaving the hero, the world gets a little chaotic again.
  ScrollTrigger.create({
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: true,
    onUpdate: (st) => field.setEntropy(st.progress * 0.9),
  });
  gsap.to('.hero__inner', { yPercent: -18, opacity: 0.2, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
}

/* ─────────────────────────────────────────────────────────
   Statement: words light up as you read
   ───────────────────────────────────────────────────────── */

{
  const el = $('[data-scrub-words]');
  const words = el.textContent.trim().split(/\s+/);
  el.innerHTML = words.map((w) => `<span class="w">${esc(w)}</span>`).join(' ');
  const spans = $$('.w', el);
  if (!reduced) {
    ScrollTrigger.create({
      trigger: el,
      start: 'top 78%',
      end: 'bottom 40%',
      scrub: true,
      onUpdate: (st) => {
        const n = st.progress * spans.length;
        spans.forEach((s, i) => {
          const k = Math.min(1, Math.max(0, n - i));
          s.style.color = `rgba(242,242,238,${0.14 + k * 0.86})`;
        });
      },
    });
  }
}

/* ─────────────────────────────────────────────────────────
   Work: horizontal scroll, pinned (desktop)
   ───────────────────────────────────────────────────────── */

ScrollTrigger.matchMedia({
  '(min-width: 901px)': () => {
    if (reduced) return;
    const track = $('.work__track');
    const distance = () => track.scrollWidth - window.innerWidth;
    const tween = gsap.to(track, {
      x: () => -distance(),
      ease: 'none',
      scrollTrigger: {
        trigger: '.work',
        pin: '.work__pin',
        start: 'top top',
        end: () => `+=${distance()}`,
        scrub: 0.6,
        invalidateOnRefresh: true,
      },
    });
    gsap.to('.work__progress span', { scaleX: 1, ease: 'none', scrollTrigger: { trigger: '.work', start: 'top top', end: () => `+=${distance()}`, scrub: true } });
    // covers drift slightly against the scroll for depth
    $$('.project__cover > svg, .project__cover > img').forEach((c) =>
      gsap.fromTo(c, { xPercent: -6 }, { xPercent: 6, ease: 'none', scrollTrigger: { trigger: c.parentElement, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true } })
    );
  },
});

/* ─────────────────────────────────────────────────────────
   Process: a beam fills as you move through the steps
   ───────────────────────────────────────────────────────── */

if (!reduced) {
  gsap.to('.steps__beam span', {
    scaleY: 1,
    ease: 'none',
    scrollTrigger: { trigger: '.steps', start: 'top 60%', end: 'bottom 60%', scrub: true },
  });
}
$$('.step').forEach((s) =>
  ScrollTrigger.create({ trigger: s, start: 'top 62%', end: 'bottom 62%', onToggle: (st) => st.isActive && $$('.step').forEach((o) => o.classList.toggle('is-active', o === s)) })
);
if (reduced) $$('.step').forEach((s) => s.classList.add('is-active'));

/* Service card motion curve draws in once it's seen */
$$('.card').forEach((c) => ScrollTrigger.create({ trigger: c, start: 'top 75%', once: true, onEnter: () => c.classList.add('is-in') }));

/* ─────────────────────────────────────────────────────────
   FAQ: animated open / close (native <details> underneath)
   ───────────────────────────────────────────────────────── */

$$('.qa').forEach((d) => {
  const summary = $('summary', d);
  const body = $('.qa__a', d);
  summary.addEventListener('click', (e) => {
    if (reduced) return;
    e.preventDefault();
    if (d.open) {
      gsap.to(body, { height: 0, duration: 0.5, ease: 'expo.inOut', onComplete: () => { d.open = false; body.style.height = ''; ScrollTrigger.refresh(); } });
    } else {
      d.open = true;
      gsap.fromTo(body, { height: 0 }, { height: 'auto', duration: 0.6, ease: 'expo.out', onComplete: () => ScrollTrigger.refresh() });
    }
  });
});

/* ─────────────────────────────────────────────────────────
   CTA: hover a button and every line falls into place
   ───────────────────────────────────────────────────────── */

const ctaField = createLineField($('.cta__lines'), { startOrdered: true, radius: 200, baseAlpha: 0.12, noise: 0.9 });
const boost = { v: 0 };
$$('[data-align]').forEach((b) => {
  const go = (v) => gsap.to(boost, { v, duration: v ? 1.1 : 1.6, ease: 'expo.out', onUpdate: () => ctaField.setBoost(boost.v) });
  b.addEventListener('pointerenter', () => go(1));
  b.addEventListener('pointerleave', () => go(0));
  b.addEventListener('focus', () => go(1));
  b.addEventListener('blur', () => go(0));
});

/* Footer wordmark rises in */
if (!reduced) {
  const fw = $('.footer__word span');
  const fchars = splitChars(fw);
  gsap.from([$('.footer__mark'), ...fchars], {
    yPercent: 110, duration: 1.3, stagger: 0.05, ease: 'expo.out',
    scrollTrigger: { trigger: '.footer__word', start: 'top 92%', once: true },
  });
}

/* ─────────────────────────────────────────────────────────
   Pointer: custom cursor, magnetic buttons, lit card edges
   ───────────────────────────────────────────────────────── */

if (finePointer && !reduced) {
  const cursor = $('.cursor');
  const label = $('.cursor__label');
  const xTo = gsap.quickTo(cursor, 'x', { duration: 0.35, ease: 'power3' });
  const yTo = gsap.quickTo(cursor, 'y', { duration: 0.35, ease: 'power3' });
  window.addEventListener('pointermove', (e) => { xTo(e.clientX); yTo(e.clientY); cursor.style.opacity = 1; }, { passive: true });
  document.addEventListener('pointerleave', () => (cursor.style.opacity = 0));

  document.addEventListener('pointerover', (e) => {
    const t = e.target.closest('[data-cursor], a, button, summary');
    if (!t) { cursor.classList.remove('is-label', 'is-hover'); return; }
    const text = t.getAttribute('data-cursor');
    if (text) { label.textContent = text; cursor.classList.add('is-label'); cursor.classList.remove('is-hover'); }
    else { cursor.classList.add('is-hover'); cursor.classList.remove('is-label'); }
  });

  $$('.magnetic').forEach((el) => {
    const mx = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3' });
    const my = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3' });
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      mx((e.clientX - (r.left + r.width / 2)) * 0.28);
      my((e.clientY - (r.top + r.height / 2)) * 0.38);
    });
    el.addEventListener('pointerleave', () => { gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.4)' }); });
  });

  $$('.card').forEach((c) =>
    c.addEventListener('pointermove', (e) => {
      const r = c.getBoundingClientRect();
      c.style.setProperty('--mx', `${e.clientX - r.left}px`);
      c.style.setProperty('--my', `${e.clientY - r.top}px`);
    })
  );
}

// Fonts change metrics; recalc scroll positions once they're in.
document.fonts?.ready.then(() => ScrollTrigger.refresh());
window.addEventListener('load', () => ScrollTrigger.refresh());
