// The Simple line field.
// The diagonal lines from the original Simple cover, made alive:
// they start as chaos, snap into order on load, and wherever the cursor goes,
// everything aligns perfectly and lights up. Chaos → simple.

const TAU = Math.PI * 2;
const TARGET = -Math.PI / 4; // the "/" diagonal

export function createLineField(canvas, opts = {}) {
  const o = {
    spacing: 38,
    length: 20,
    radius: 230,
    base: 'rgba(242,242,238,',
    hot: [219, 241, 48], // lime
    baseAlpha: 0.16,
    noise: 0.32, // radians of ambient drift once ordered
    startOrdered: false,
    ...opts,
  };

  const ctx = canvas.getContext('2d');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let w = 0, h = 0, dpr = 1, lines = [], raf = 0, visible = true, t = 0;
  let order = o.startOrdered || reduced ? 1 : 0;
  let entropy = 0; // extra chaos, e.g. while scrolling away
  let boost = 0; // 0..1 global "everything aligns" (used by CTA hover)
  const pointer = { x: -9999, y: -9999, sx: -9999, sy: -9999, active: false, last: 0 };

  function build() {
    const rect = canvas.getBoundingClientRect();
    w = rect.width; h = rect.height;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const sp = w < 700 ? o.spacing * 0.82 : o.spacing;
    const cols = Math.ceil(w / sp) + 1, rows = Math.ceil(h / sp) + 1;
    const offX = (w - (cols - 1) * sp) / 2, offY = (h - (rows - 1) * sp) / 2;
    lines = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = offX + c * sp, y = offY + r * sp;
        lines.push({
          x, y,
          chaos: Math.random() * TAU,
          seed: Math.random() * 1000,
          delay: (x / w) * 0.55 + (y / h) * 0.15 + Math.random() * 0.08,
          a: 0, heat: 0,
        });
      }
    }
  }

  function noise(x, y, s) {
    // cheap smooth pseudo-noise from layered sines
    return (
      Math.sin(x * 0.0061 + s * 0.9 + t * 0.35) * 0.6 +
      Math.sin(y * 0.0083 - s * 0.4 + t * 0.27) * 0.4 +
      Math.sin((x + y) * 0.0037 + t * 0.21) * 0.5
    );
  }

  function frame(now) {
    raf = requestAnimationFrame(frame);
    if (!visible) return;
    t = now / 1000;

    // Auto-wander when there's no pointer (touch devices, idle).
    if (!pointer.active || now - pointer.last > 4000) {
      pointer.x = w * (0.62 + Math.sin(t * 0.33) * 0.22);
      pointer.y = h * (0.45 + Math.sin(t * 0.47 + 1.3) * 0.25);
    }
    pointer.sx += (pointer.x - pointer.sx) * 0.12;
    pointer.sy += (pointer.y - pointer.sy) * 0.12;
    if (pointer.sx < -9000) { pointer.sx = pointer.x; pointer.sy = pointer.y; }

    ctx.clearRect(0, 0, w, h);
    const R = o.radius * (w < 700 ? 0.7 : 1);
    const len = w < 700 ? o.length * 0.85 : o.length;

    for (const l of lines) {
      // local order: global intro wave
      const lo = Math.min(1, Math.max(0, (order * 1.6 - l.delay) / 0.6));
      const ease = lo < 0.5 ? 4 * lo * lo * lo : 1 - Math.pow(-2 * lo + 2, 3) / 2;

      const dx = l.x - pointer.sx, dy = l.y - pointer.sy;
      const d = Math.sqrt(dx * dx + dy * dy);
      const near = Math.max(0, 1 - d / R);
      const heatTarget = Math.max(near * near * (3 - 2 * near), boost * 0.55);
      l.heat += (heatTarget - l.heat) * 0.14;

      const drift = noise(l.x, l.y, l.seed) * (o.noise + entropy * 1.4) * (1 - l.heat);
      const ordered = TARGET + drift;
      const target = l.chaos * (1 - ease) + ordered * ease;
      // shortest-path rotation smoothing
      let diff = ((target - l.a + Math.PI) % TAU + TAU) % TAU - Math.PI;
      l.a += diff * (reduced ? 1 : 0.16);

      const L = len * (0.75 + l.heat * 0.7) * (0.55 + ease * 0.45);
      const cx = Math.cos(l.a) * L * 0.5, cy = Math.sin(l.a) * L * 0.5;

      if (l.heat > 0.02) {
        const [r, g, b] = o.hot;
        const mix = l.heat;
        const rr = Math.round(242 + (r - 242) * mix), gg = Math.round(242 + (g - 242) * mix), bb = Math.round(238 + (b - 238) * mix);
        ctx.strokeStyle = `rgba(${rr},${gg},${bb},${(o.baseAlpha + mix * 0.84) * (0.35 + ease * 0.65)})`;
        ctx.lineWidth = 1.2 + mix * 0.9;
      } else {
        ctx.strokeStyle = o.base + o.baseAlpha * (0.35 + ease * 0.65) + ')';
        ctx.lineWidth = 1.2;
      }
      ctx.beginPath();
      ctx.moveTo(l.x - cx, l.y - cy);
      ctx.lineTo(l.x + cx, l.y + cy);
      ctx.stroke();
    }
  }

  function onMove(e) {
    const rect = canvas.getBoundingClientRect();
    pointer.x = e.clientX - rect.left;
    pointer.y = e.clientY - rect.top;
    pointer.active = true;
    pointer.last = performance.now();
  }

  const ro = new ResizeObserver(() => build());
  ro.observe(canvas);
  const io = new IntersectionObserver(([en]) => (visible = en.isIntersecting));
  io.observe(canvas);
  window.addEventListener('pointermove', onMove, { passive: true });
  build();
  raf = requestAnimationFrame(frame);

  return {
    get order() { return order; },
    set order(v) { order = v; },
    setEntropy(v) { entropy = v; },
    setBoost(v) { boost = v; },
    destroy() {
      cancelAnimationFrame(raf);
      ro.disconnect(); io.disconnect();
      window.removeEventListener('pointermove', onMove);
    },
  };
}
