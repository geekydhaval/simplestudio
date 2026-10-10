// Generative SVG covers for the work gallery, one per project.
// Each returns an SVG string sized 800×600. Deterministic (seeded), so they look
// the same on every load. Swap for real screenshots via `image` in data.js.

const LIME = '#DBF130';
const VIOLET = '#7B5CFF';
const MAGENTA = '#FF4DC4';
const BLUE = '#2E6BFF';
const WHITE = '#F2F2EE';

function rng(seed) {
  let s = seed >>> 0;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
}

const wrap = (id, defs, body, bg = '#08080A') => `
<svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
  <defs>
    <radialGradient id="${id}-glow" cx="70%" cy="85%" r="70%">
      <stop offset="0" stop-color="${VIOLET}" stop-opacity=".55"/>
      <stop offset=".45" stop-color="${MAGENTA}" stop-opacity=".12"/>
      <stop offset="1" stop-color="#000" stop-opacity="0"/>
    </radialGradient>
    ${defs}
  </defs>
  <rect width="800" height="600" fill="${bg}"/>
  <rect width="800" height="600" fill="url(#${id}-glow)"/>
  ${body}
</svg>`;

const art = {
  avatars() {
    const r = rng(7);
    let out = '';
    for (let y = 0; y < 5; y++) {
      for (let x = 0; x < 7; x++) {
        const cx = 70 + x * 110, cy = 70 + y * 115;
        const hot = r() > 0.86;
        const c = hot ? LIME : WHITE;
        out += `<g opacity="${hot ? 1 : 0.18 + r() * 0.35}">
          <circle cx="${cx}" cy="${cy - 14}" r="18" fill="none" stroke="${c}" stroke-width="2"/>
          <path d="M${cx - 32} ${cy + 36} Q${cx} ${cy - 2} ${cx + 32} ${cy + 36}" fill="none" stroke="${c}" stroke-width="2"/>
        </g>`;
      }
    }
    return wrap('av', '', out);
  },

  city() {
    const r = rng(21);
    let out = '';
    const iso = (x, y, w, h, c, o) => {
      const dx = w * 0.866, dy = w * 0.5;
      return `<g opacity="${o}" stroke="${c}" stroke-width="1.5" fill="none">
        <path d="M${x} ${y} l${dx} ${-dy} l${dx} ${dy} l${-dx} ${dy}z" fill="${c}" fill-opacity=".06"/>
        <path d="M${x} ${y} v${h} l${dx} ${dy} v${-h}"/>
        <path d="M${x + 2 * dx} ${y} v${h} l${-dx} ${dy}"/>
      </g>`;
    };
    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 6; col++) {
        const x = 120 + col * 104 - row * 52;
        const y = 120 + row * 74 + col * 0;
        const h = 30 + r() * 140;
        const hot = r() > 0.9;
        out += iso(x + 100, y + 160 - h, 52, h, hot ? LIME : WHITE, hot ? 1 : 0.25 + r() * 0.3);
      }
    }
    return wrap('ct', '', out);
  },

  garba() {
    let out = '';
    for (let i = 0; i < 14; i++) {
      const rad = 30 + i * 22;
      const dash = 6 + (i % 4) * 8;
      out += `<circle cx="400" cy="300" r="${rad}" fill="none" stroke="${i % 5 === 2 ? LIME : WHITE}"
        stroke-opacity="${i % 5 === 2 ? 1 : 0.25}" stroke-width="2" stroke-dasharray="${dash} ${dash * 1.6}"
        transform="rotate(${i * 17} 400 300)"/>`;
    }
    out += `<circle cx="400" cy="300" r="10" fill="${LIME}"/>`;
    return wrap('ga', '', out);
  },

  sphere() {
    let out = '';
    for (let i = 1; i < 12; i++) {
      const ry = Math.abs(Math.cos((i / 12) * Math.PI)) * 190;
      out += `<ellipse cx="400" cy="300" rx="190" ry="${ry.toFixed(1)}" fill="none" stroke="${WHITE}" stroke-opacity=".22" stroke-width="1.5"/>`;
      const rx = Math.abs(Math.cos((i / 12) * Math.PI)) * 190;
      out += `<ellipse cx="400" cy="300" rx="${rx.toFixed(1)}" ry="190" fill="none" stroke="${i === 4 ? LIME : WHITE}" stroke-opacity="${i === 4 ? 1 : 0.22}" stroke-width="1.5"/>`;
    }
    out += `<circle cx="400" cy="300" r="190" fill="none" stroke="${WHITE}" stroke-opacity=".5" stroke-width="2"/>`;
    return wrap('sp', '', out);
  },

  code() {
    const r = rng(4);
    let out = '';
    for (let i = 0; i < 13; i++) {
      const indent = [0, 1, 1, 2, 2, 1, 0, 1, 2, 3, 2, 1, 0][i];
      let x = 90 + indent * 40;
      const y = 92 + i * 34;
      const parts = 1 + Math.floor(r() * 3);
      for (let p = 0; p < parts; p++) {
        const w = 40 + r() * 140;
        const c = r() > 0.8 ? LIME : r() > 0.7 ? VIOLET : WHITE;
        out += `<rect x="${x}" y="${y}" width="${w.toFixed(0)}" height="12" rx="6" fill="${c}" opacity="${c === WHITE ? 0.22 : 0.9}"/>`;
        x += w + 16;
      }
    }
    // two collaborators' cursors
    out += `<g transform="translate(520 210)"><path d="M0 0 L0 34 L9 26 L16 42 L22 39 L15 24 L27 24Z" fill="${LIME}"/><rect x="24" y="40" width="64" height="22" rx="11" fill="${LIME}"/></g>`;
    out += `<g transform="translate(300 380)"><path d="M0 0 L0 34 L9 26 L16 42 L22 39 L15 24 L27 24Z" fill="${MAGENTA}"/><rect x="24" y="40" width="64" height="22" rx="11" fill="${MAGENTA}"/></g>`;
    return wrap('cd', '', out);
  },

  pixel() {
    const r = rng(90);
    let out = '';
    const s = 25;
    for (let y = 0; y < 24; y++) {
      for (let x = 0; x < 32; x++) {
        const road = Math.abs(x - 16 - (y - 12) * 0.35) < 4 + y * 0.18;
        if (road && r() > 0.25) {
          const lane = Math.abs(x - 16 - (y - 12) * 0.35) < 0.6 && y % 3 === 0;
          out += `<rect x="${x * s}" y="${y * s}" width="${s - 3}" height="${s - 3}" fill="${lane ? LIME : WHITE}" opacity="${lane ? 1 : 0.06 + (y / 24) * 0.22}"/>`;
        }
      }
    }
    // the car
    const car = [[0,1,1,1,1,0],[1,1,1,1,1,1],[1,0,1,1,0,1]];
    car.forEach((row, yy) => row.forEach((v, xx) => {
      if (v) out += `<rect x="${(14 + xx) * s}" y="${(17 + yy) * s}" width="${s - 3}" height="${s - 3}" fill="${MAGENTA}"/>`;
    }));
    return wrap('px', '', out);
  },

  nodes() {
    const r = rng(33);
    const pts = Array.from({ length: 22 }, () => [80 + r() * 640, 60 + r() * 480]);
    let out = '';
    pts.forEach((a, i) => pts.forEach((b, j) => {
      if (j <= i) return;
      const d = Math.hypot(a[0] - b[0], a[1] - b[1]);
      if (d < 170) out += `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="${WHITE}" stroke-opacity="${(0.35 - d / 600).toFixed(2)}" stroke-width="1.5"/>`;
    }));
    pts.forEach((p, i) => {
      const hot = i % 6 === 0;
      out += `<circle cx="${p[0]}" cy="${p[1]}" r="${hot ? 9 : 5}" fill="${hot ? LIME : '#08080A'}" stroke="${hot ? LIME : WHITE}" stroke-opacity="${hot ? 1 : 0.6}" stroke-width="2"/>`;
    });
    return wrap('nd', '', out);
  },

  arches() {
    let out = '';
    for (let i = 0; i < 7; i++) {
      const w = 520 - i * 64, h = 420 - i * 52;
      const x = 400 - w / 2, y = 560 - h;
      out += `<path d="M${x} 560 V${y + w / 2} A${w / 2} ${w / 2} 0 0 1 ${x + w} ${y + w / 2} V560"
        fill="none" stroke="${i === 3 ? LIME : WHITE}" stroke-opacity="${i === 3 ? 1 : 0.18 + i * 0.05}" stroke-width="2"/>`;
    }
    out += `<line x1="60" y1="560" x2="740" y2="560" stroke="${WHITE}" stroke-opacity=".4" stroke-width="2"/>`;
    return wrap('ar', '', out);
  },

  leaves() {
    const r = rng(12);
    let out = '';
    for (let i = 0; i < 26; i++) {
      const x = 60 + r() * 680, y = 40 + r() * 520;
      const rot = r() * 360, s = 0.5 + r() * 1.2;
      const hot = i % 7 === 0;
      out += `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})" opacity="${hot ? 1 : 0.2 + r() * 0.3}">
        <path d="M0 -40 C 26 -20 26 20 0 40 C -26 20 -26 -20 0 -40Z" fill="${hot ? LIME : 'none'}" stroke="${hot ? LIME : WHITE}" stroke-width="2"/>
        <line x1="0" y1="-34" x2="0" y2="34" stroke="${hot ? '#08080A' : WHITE}" stroke-width="1.5"/>
      </g>`;
    }
    return wrap('lv', '', out);
  },
};

export function coverFor(key) {
  return (art[key] || art.nodes)();
}

// Monogram avatar for team members: lines that align into the person's initial angle.
export function avatarFor(handle, i) {
  const hues = [LIME, VIOLET, MAGENTA, BLUE, LIME];
  const c = hues[i % hues.length];
  const r = rng(handle.length * 97 + i);
  let lines = '';
  for (let y = 0; y < 6; y++) for (let x = 0; x < 6; x++) {
    const a = 45 + (r() - 0.5) * 50;
    const cx = 25 + x * 30, cy = 25 + y * 30;
    lines += `<line x1="${cx - 9}" y1="${cy}" x2="${cx + 9}" y2="${cy}" style="--a:${-a.toFixed(1)}deg" stroke="${WHITE}" stroke-opacity=".28" stroke-width="2" stroke-linecap="round"/>`;
  }
  const letter = handle.replace('@', '').charAt(0).toUpperCase();
  return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs><radialGradient id="tm${i}" cx="50%" cy="100%" r="90%"><stop offset="0" stop-color="${c}" stop-opacity=".55"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient></defs>
    <rect width="200" height="200" fill="#08080A"/><rect width="200" height="200" fill="url(#tm${i})"/>
    <g class="tm-lines">${lines}</g>
    <text x="100" y="128" text-anchor="middle" font-family="Sofia Pro, Outfit Variable, sans-serif" font-weight="500" font-size="92" fill="${WHITE}">${letter}</text>
  </svg>`;
}
