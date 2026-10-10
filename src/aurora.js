// Spectral light behind the hero: soft violet / magenta / blue beams rising
// from below, like the light leaks on the moodboard. Raw WebGL, no library.

const VERT = `
attribute vec2 p;
void main(){ gl_Position = vec4(p, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform float uIntensity;

float hash(vec2 p){ return fract(sin(dot(p, vec2(41.3, 289.1))) * 45758.5453); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  vec2 u = f*f*(3.0-2.0*f);
  return mix(mix(hash(i), hash(i+vec2(1,0)), u.x), mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), u.x), u.y);
}
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  for(int i=0;i<5;i++){ v += a*noise(p); p *= 2.02; a *= 0.5; }
  return v;
}

void main(){
  vec2 uv = gl_FragCoord.xy / uRes.xy;
  vec2 p = uv; p.x *= uRes.x / uRes.y;
  float t = uTime * 0.06;

  // Beams: tilted bands, warped by noise, fading upward.
  vec2 q = vec2(p.x * 0.9 + p.y * 0.55, p.y);
  float warp = fbm(vec2(q.x * 1.4 - t, q.y * 0.8 + t * 0.6));
  float bands = sin((q.x + warp * 0.9) * 5.5 - t * 3.0) * 0.5 + 0.5;
  bands = pow(bands, 6.0);

  float rise = smoothstep(1.05, 0.0, uv.y);           // brighter at the bottom
  float side = smoothstep(0.1, 1.0, uv.x);             // brighter to the right
  float mouseGlow = 0.35 * smoothstep(0.65, 0.0, distance(uv, uMouse));

  vec3 violet  = vec3(0.482, 0.361, 1.0);
  vec3 magenta = vec3(1.0, 0.302, 0.769);
  vec3 blue    = vec3(0.180, 0.420, 1.0);

  vec3 col = mix(blue, violet, smoothstep(0.2, 0.7, warp));
  col = mix(col, magenta, smoothstep(0.55, 0.9, fbm(q * 2.0 + t)));

  float a = bands * rise * side * 0.85 + rise * side * 0.18 * warp + mouseGlow * rise;
  col *= a * uIntensity;

  // grain
  col += (hash(gl_FragCoord.xy + uTime) - 0.5) * 0.025;
  gl_FragColor = vec4(col, 1.0);
}
`;

export function createAurora(canvas) {
  const gl = canvas.getContext('webgl', { antialias: false, premultipliedAlpha: false });
  if (!gl) return null;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const sh = (type, src) => {
    const s = gl.createShader(type);
    gl.shaderSource(s, src); gl.compileShader(s);
    return s;
  };
  const prog = gl.createProgram();
  gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT));
  gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG));
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null;
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, 'p');
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  const uRes = gl.getUniformLocation(prog, 'uRes');
  const uTime = gl.getUniformLocation(prog, 'uTime');
  const uMouse = gl.getUniformLocation(prog, 'uMouse');
  const uIntensity = gl.getUniformLocation(prog, 'uIntensity');

  let intensity = 0, raf = 0, visible = true;
  const mouse = { x: 0.7, y: 0.3, sx: 0.7, sy: 0.3 };

  function resize() {
    // Render at reduced resolution — it's soft light, nobody can tell.
    const scale = 0.5;
    const r = canvas.getBoundingClientRect();
    canvas.width = Math.max(1, Math.round(r.width * scale));
    canvas.height = Math.max(1, Math.round(r.height * scale));
    gl.viewport(0, 0, canvas.width, canvas.height);
  }

  function frame(now) {
    raf = requestAnimationFrame(frame);
    if (!visible) return;
    mouse.sx += (mouse.x - mouse.sx) * 0.04;
    mouse.sy += (mouse.y - mouse.sy) * 0.04;
    gl.uniform2f(uRes, canvas.width, canvas.height);
    gl.uniform1f(uTime, reduced ? 20 : now / 1000);
    gl.uniform2f(uMouse, mouse.sx, mouse.sy);
    gl.uniform1f(uIntensity, intensity);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  const onMove = (e) => {
    const r = canvas.getBoundingClientRect();
    mouse.x = (e.clientX - r.left) / r.width;
    mouse.y = 1 - (e.clientY - r.top) / r.height;
  };
  window.addEventListener('pointermove', onMove, { passive: true });
  const ro = new ResizeObserver(resize); ro.observe(canvas);
  const io = new IntersectionObserver(([en]) => (visible = en.isIntersecting)); io.observe(canvas);
  resize();
  raf = requestAnimationFrame(frame);

  return {
    get intensity() { return intensity; },
    set intensity(v) { intensity = v; },
    destroy() { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); window.removeEventListener('pointermove', onMove); },
  };
}
