import '@fontsource-variable/outfit';
import './styles.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { createLineField } from './lines.js';
import { createAurora } from './aurora.js';
import { coverFor, avatarFor } from './art.js';
import { links, clients, services, featured, work, process, plans, onboarding, team, faqs, socials } from './data.js';

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
const markSvg = `<svg viewBox="-4 -4 184 258" aria-hidden="true"><use href="#mark"/></svg>`;

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
  brand: (() => {
    // The Simple mark, scattered. Hover the card and every line falls into place.
    let l = '';
    for (let r = 0; r < 6; r++) for (let c = 0; c < 4; c++) {
      const centre = (c === 1 || c === 2) && (r === 2 || r === 3);
      const x2 = 34 + 47 * c, y2 = 43 * r, x1 = centre ? 53 + 47 * (c - 1) : 9 + 47 * c, y1 = y2 + (centre ? 27 : 24);
      const rot = Math.round((Math.sin(r * 7.3 + c * 3.1) * 0.5 + 0.5) * 140 - 70);
      l += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" style="--r:${rot}deg" stroke="${centre ? '#DBF130' : '#F2F2EE'}" stroke-opacity="${centre ? 1 : 0.55}"/>`;
    }
    return `<svg class="ill-brand" viewBox="0 0 420 260" fill="none">
      <g class="grid" stroke="#F2F2EE"><rect x="122" y="14" width="176" height="232" rx="2"/><line x1="122" y1="130" x2="298" y2="130"/><line x1="210" y1="14" x2="210" y2="246"/><circle cx="210" cy="130" r="88"/></g>
      <g transform="translate(122 14) scale(1 .93)" stroke-width="4.5" stroke-linecap="round">${l}</g>
      <rect x="338" y="214" width="34" height="22" rx="6" fill="#DBF130"/><rect x="298" y="214" width="34" height="22" rx="6" fill="#F2F2EE"/><rect x="378" y="214" width="34" height="22" rx="6" fill="#7B5CFF"/>
    </svg>`;
  })(),
};

// Coded mockup of the HDA academy app (habit-tracker home). Swap for real screens when ready.
const hdaMock = () => `
  <div class="phone" aria-label="Human Design Academy app home screen mockup" role="img">
    <div class="phone__screen hda">
      <div class="hda__status"><span>9:41</span><span class="hda__island"></span><span>●●● ▮</span></div>
      <p class="hda__hi">Good morning,</p>
      <p class="hda__name">Aarav</p>
      <div class="hda__streak">
        <svg class="hda__ring" viewBox="0 0 120 120"><circle cx="60" cy="60" r="50" stroke="rgba(242,242,238,.12)" stroke-width="10" fill="none"/><circle class="hda__ring-fill" cx="60" cy="60" r="50" stroke="#F2F2EE" stroke-width="10" fill="none" stroke-linecap="round" pathLength="100" stroke-dasharray="100" stroke-dashoffset="100" transform="rotate(-90 60 60)"/></svg>
        <div class="hda__streak-text"><strong>12</strong><span>day streak</span></div>
        <svg class="hda__scribble" viewBox="0 0 200 120" aria-hidden="true"><path class="hda__scribble-path" d="M24 64 C 20 20, 120 6, 170 34 C 205 56, 176 104, 104 110 C 40 116, 6 90, 22 58 C 30 42, 60 30, 90 28" fill="none" stroke="#FF3B30" stroke-width="4" stroke-linecap="round" pathLength="100" stroke-dasharray="100" stroke-dashoffset="100"/></svg>
      </div>
      <div class="hda__week">${['M','T','W','T','F','S','S'].map((d, i) => `<span class="${i < 5 ? 'is-done' : i === 5 ? 'is-today' : ''}"><i></i>${d}</span>`).join('')}</div>
      <p class="hda__label">Today</p>
      <ul class="hda__list">
        <li class="is-done"><b></b><div><strong>Prompt engineering</strong><span>Week 1 · 12 min</span></div></li>
        <li class="is-now"><b></b><div><strong>Make your first AI video</strong><span>Week 2 · 18 min</span></div></li>
        <li><b></b><div><strong>Build an AI agent</strong><span>Week 3 · locked</span></div></li>
      </ul>
      <div class="hda__tabs"><span class="is-on"></span><span></span><span></span><span></span></div>
    </div>
  </div>`;

const caseMedia = (c) => {
  if (c.media === 'site') {
    return `<div class="browser"><div class="browser__bar"><i></i><i></i><i></i><span>${esc(c.url.replace('https://', ''))}</span></div>
      <div class="browser__view"><img src="${c.image}" alt="${esc(c.name)} landing page" loading="lazy" /></div></div>`;
  }
  if (c.media === 'hda') return hdaMock();
  return `<img class="case__img" src="${c.image}" alt="${esc(c.name)} by Simple" loading="lazy" />`;
};

$('[data-featured]').innerHTML = featured
  .map(
    (c, i) => `
  <article class="case case--${c.media}" style="--accent:${c.accent}; --i:${i}">
    <div class="case__info">
      <div class="case__top">
        <ul class="case__tags"><li>${esc(c.kind)}</li><li>${esc(c.industry)}</li>${c.status ? `<li class="is-status">${esc(c.status)}</li>` : ''}</ul>
        <h3 class="case__name">${esc(c.name)}</h3>
        <p class="case__body">${esc(c.body)}</p>
      </div>
      <div class="case__bottom">
        <ul class="case__services">${c.services.map((sv) => `<li>${esc(sv)}</li>`).join('')}</ul>
        ${c.url ? `<a class="btn btn--ghost magnetic" href="${c.url}" target="_blank" rel="noopener" data-cursor="Visit">${esc(c.linkLabel || 'Visit')}</a>` : `<span class="case__soon">${c.client === 'Human Design Academy' ? 'Coming to the App Store' : 'Launching soon'}</span>`}
      </div>
    </div>
    <div class="case__media" ${c.url ? 'data-cursor="Visit"' : ''}>${caseMedia(c)}</div>
  </article>`
  )
  .join('');

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
    if (lenis) lenis.scrollTo(target, { offset: id === '#lab' ? 0 : -40 });
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
    .fromTo('.hm-line', { strokeDasharray: 40, strokeDashoffset: 40 }, { strokeDashoffset: 0, duration: 1.2, stagger: { each: 0.035, from: 'random' }, ease: 'expo.out' }, 0.9)
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
   Selected work: cards stack like a deck. While a card is held,
   its screenshot scrolls / its render breathes.
   ───────────────────────────────────────────────────────── */

const cases = $$('.case');
ScrollTrigger.matchMedia({
  '(min-width: 901px)': () => {
    if (reduced) return;
    cases.forEach((c, i) => {
      const next = cases[i + 1];
      const hold = next ? { trigger: next, start: 'top bottom', end: 'top 15%', scrub: true } : { trigger: c, start: 'top 70%', end: 'bottom bottom', scrub: true };
      if (next) gsap.to(c, { scale: 0.93, '--dim': 0.6, ease: 'none', scrollTrigger: { trigger: next, start: 'top bottom', end: 'top 15%', scrub: true } });
      const img = $('.browser__view img', c);
      if (img) gsap.fromTo(img, { y: 0 }, { y: () => -(img.offsetHeight - img.parentElement.offsetHeight), ease: 'none', scrollTrigger: { ...hold, invalidateOnRefresh: true } });
      const still = $('.case__img', c);
      if (still) gsap.fromTo(still, { scale: 1.12 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: c, start: 'top bottom', end: next ? 'top 15%' : 'top top', scrub: true } });
    });
  },
  '(max-width: 900px)': () => {
    if (reduced) return;
    $$('.browser__view img').forEach((img) =>
      gsap.fromTo(img, { y: 0 }, { y: () => -(img.offsetHeight - img.parentElement.offsetHeight), ease: 'none', scrollTrigger: { trigger: img.closest('.case'), start: 'top 60%', end: 'bottom 20%', scrub: true, invalidateOnRefresh: true } })
    );
  },
});

// HDA mockup: streak ring fills and the red scribble draws when it comes into view.
{
  const hdaEl = $('.hda');
  if (hdaEl) {
    const play = () => {
      if (reduced) { hdaEl.classList.add('is-in'); return; }
      gsap.to('.hda__ring-fill', { strokeDashoffset: 18, duration: 1.8, ease: 'expo.out' });
      gsap.to('.hda__scribble-path', { strokeDashoffset: 0, duration: 1.1, delay: 0.7, ease: 'power2.inOut' });
      gsap.from('.hda__list li', { x: 24, opacity: 0, duration: 0.9, stagger: 0.12, delay: 0.3, ease: 'expo.out' });
    };
    ScrollTrigger.create({ trigger: hdaEl, start: 'top 75%', once: true, onEnter: play });
  }
}

/* ─────────────────────────────────────────────────────────
   Lab: horizontal scroll, pinned (desktop)
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
