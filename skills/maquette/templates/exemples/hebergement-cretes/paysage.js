/*
 * Vire — paysage de crêtes en WebGL (moteur seul, sans dépendance).
 * Exemple fictif Lance ton site. Code original, inspiré de fonds-hero/brume-shader.html (même kit).
 *
 * Sept plans de crêtes à des profondeurs différentes. La caméra avance (cz) : chaque plan
 * se rapproche, grandit, passe sous la caméra et repart au fond ; la vallée suit un chemin
 * sinueux, donc les plans glissent de côté à des vitesses différentes (parallaxe).
 * L'heure (tod, de 0 = aube à 1 = nuit) choisit le ciel, le soleil, la brume et la lumière
 * rasante sur les faces tournées vers le soleil. snow = 1 : le même paysage en hiver.
 *
 *   const p = Paysage.creer(canvas, { echelle: 0.7 });   // null si WebGL manque
 *   p.rendre({ cz: 2.4, tod: 0.15, snow: 0, t: 12, cx: 0 });
 *   Paysage.heure(0.15) → la palette (aussi utilisée pour les images de repli)
 */
(() => {
  const FRAG = `precision highp float;
uniform vec2 r;
uniform float t, cz, cx, snow, stars, sunI;
uniform vec3 skyT, skyH, sunC, fogC, rockC, rimC;
uniform vec2 sunP;
float h21(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float n2(vec2 p){ vec2 i = floor(p), f = fract(p); f = f * f * (3. - 2. * f);
  return mix(mix(h21(i), h21(i + vec2(1., 0.)), f.x), mix(h21(i + vec2(0., 1.)), h21(i + vec2(1., 1.)), f.x), f.y); }
float fbm(vec2 p){ float v = 0., a = .5; for (int i = 0; i < 4; i++){ v += a * n2(p); p = p * 2.03 + vec2(1.7, 9.2); a *= .5; } return v; }
// crête « ridged » : arêtes vives, comme du calcaire ou du granite
float crete(float x, float s){ float v = 0., a = .6, f = 1.;
  for (int i = 0; i < 5; i++){ float n = n2(vec2(x * f, s * 7.13 + float(i) * 3.1)); n = 1. - abs(n * 2. - 1.); v += a * n * n; f *= 2.07; a *= .42; }
  return v; }
float chemin(float s){ return sin(s * .55) * .9 + sin(s * .23 + 1.3) * .6; }
float relief(float x, float s){ float c = crete(x * .5 + s * .37, s); return pow(c, 1.35) * 2.1 * (.2 + .95 * smoothstep(.15, 2.3, abs(x - chemin(s)))); }
void main(){
  vec2 uv = gl_FragCoord.xy / r;
  float asp = r.x / r.y;
  float px = (uv.x - .5) * asp, py = uv.y;
  const float yh = .5, camH = .42;
  // ciel et soleil
  vec3 col = mix(skyH, skyT, smoothstep(yh - .04, 1.05, py));
  float ds = length(vec2(px - sunP.x, py - sunP.y));
  col += sunC * sunI * (exp(-ds * 3.) * .32 + exp(-ds * 11.) * .5);
  col = mix(col, min(sunC * 1.25 + .15, vec3(1.)), smoothstep(.026, .02, ds) * sunI * smoothstep(yh - .03, yh + .01, sunP.y));
  if (stars > 0.){
    vec2 g = floor(gl_FragCoord.xy / 2.);
    float st = step(.9968, h21(g)) * (.4 + .6 * h21(g + 3.1));
    col += st * stars * smoothstep(yh + .02, yh + .3, py) * (.7 + .3 * sin(t * 1.7 + g.x * 3.));
  }
  // chaîne lointaine, presque immobile : neiges éternelles
  float xl = px * .9 + cx * .04 + cz * .015;
  float hl = yh + .012 + .12 * crete(xl * 1.3 + 5., 91.);
  if (py < hl){
    float hp = (py - yh) / .12;
    vec3 c = mix(rockC, fogC, .7);
    float ne = smoothstep(.55, .85, hp + .18 * n2(vec2(xl * 28., py * 70.))) * (.55 + .45 * snow);
    c = mix(c, mix(vec3(.95, .97, 1.), fogC, .4) * (.7 + .3 * sunI) + rimC * .1, ne * .8);
    col = mix(c, col, smoothstep(hl - .004, hl, py));
  }
  vec3 neigeC = mix(vec3(.94, .96, .99), fogC, .22);
  float fz = fract(cz), bz = floor(cz);
  float camX = chemin(cz) + cx;
  for (int j = 0; j < 7; j++){
    float k = float(7 - j);
    float D = k - fz;
    if (D < .06) continue;
    float s = bz + k;
    float sc = .34 / D;
    float a = smoothstep(7., 5.7, D) * smoothstep(.06, .5, D);
    float xw = px * D * 1.15 + camX;
    if (py < yh + (2.2 - camH) * sc + .01){
      float hx = relief(xw, s);
      float y = yh + (hx - camH) * sc;
      if (py < y + 2. / r.y){
        float hp = camH + (py - yh) / sc;
        float e = max(y - py, 0.);
        float sl = (relief(xw + .18 * D, s) - relief(xw - .18 * D, s)) * .5;
        float face = clamp(.5 + sl * 2.2 * clamp((sunP.x - px) * 2.5, -1., 1.), 0., 1.);
        face = mix(face, .45 + .2 * fbm(vec2(xw * 1.3, hp * 3.)), smoothstep(0., .35, (y - py) / sc));
        vec3 c = rockC * (.62 + .55 * face * (.35 + .65 * sunI));
        c *= .8 + .4 * fbm(vec2(xw * 2.2 + hp * 1.5, hp * 5.));
        c = mix(c, c * vec3(.82, 1., .72) + vec3(.01, .03, 0.), (1. - snow) * smoothstep(.5, .12, hp) * .7);
        float tn = fbm(vec2(xw * 2.6 + hp * 2., hp * 4.5 + s));
        float nv = snow * smoothstep(.0, .18, hp + .35 * tn - .2)
                 + (1. - snow) * smoothstep(1.0, 1.2, hp + .4 * tn - .1) * .9;
        c = mix(c, neigeC * (.68 + .42 * face), clamp(nv, 0., 1.));
        c += rimC * exp(-e * r.y / 2.4) * (.2 + .8 * face) * (.25 + .75 * sunI) * (D < 2. ? 1. : .55);
        c = mix(c, fogC, clamp(1. - exp(-(D - .2) * .27), 0., .9));
        float bord = smoothstep(y + 2. / r.y, y - 1. / r.y, py);
        col = mix(col, c, a * bord);
      }
    }
    // brume qui coule au fond de la vallée de ce plan
    float yb = yh + (.2 - camH) * sc;
    float ep = .2 * sc + .015;
    if (abs(py - yb) < ep * 1.4){
      float m = fbm(vec2(px * D * .9 - t * .045 + s * 1.7, (py - yb) / sc * 2.2 + t * .015 + s));
      float bande = smoothstep(ep, 0., abs(py - yb - .3 * ep));
      col = mix(col, fogC * 1.03 + .015, bande * smoothstep(.32, .78, m) * .8 * a);
    }
  }
  col = mix(col, fogC, smoothstep(.3, 0., py) * .22);
  col += (h21(gl_FragCoord.xy + fract(t) * 37.) - .5) * .022;
  gl_FragColor = vec4(col, 1.);
}`;
  const VERT = "attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}";

  // Les heures du jour : ciel haut, horizon, soleil (couleur, position, intensité), brume, roche, liseré, étoiles
  const hex = (h) => [0, 2, 4].map((i) => parseInt(h.slice(1 + i, 3 + i), 16) / 255);
  const CLES = [
    { tod: 0.00, skyT: "#2a3352", skyH: "#e2a08c", sunC: "#ffb08a", sunP: [-0.62, 0.47], sunI: 0.55, fogC: "#9ca2bd", rockC: "#2f3550", rimC: "#efa084", stars: 0.35 },
    { tod: 0.15, skyT: "#6d8bb6", skyH: "#f4c49c", sunC: "#ffcf9c", sunP: [-0.5, 0.56], sunI: 1.0, fogC: "#c4c6d2", rockC: "#3e475c", rimC: "#ffc89a", stars: 0 },
    { tod: 0.40, skyT: "#5b8cc4", skyH: "#cddfea", sunC: "#fff3dc", sunP: [0.05, 0.93], sunI: 0.85, fogC: "#d3dde4", rockC: "#5b6772", rimC: "#fff6e6", stars: 0 },
    { tod: 0.66, skyT: "#6a8db5", skyH: "#f1cf96", sunC: "#ffcf78", sunP: [0.36, 0.67], sunI: 1.0, fogC: "#dfcfb3", rockC: "#4d4951", rimC: "#ffc066", stars: 0 },
    { tod: 0.86, skyT: "#383d6a", skyH: "#ec8656", sunC: "#ff8a4a", sunP: [0.56, 0.505], sunI: 1.0, fogC: "#b1889d", rockC: "#2c2741", rimC: "#ff965a", stars: 0.05 },
    { tod: 1.00, skyT: "#070b16", skyH: "#1e2b4a", sunC: "#000000", sunP: [0.7, 0.2], sunI: 0.0, fogC: "#29344f", rockC: "#0f1524", rimC: "#7184b3", stars: 1 },
  ];
  CLES.forEach((c) => ["skyT", "skyH", "sunC", "fogC", "rockC", "rimC"].forEach((k) => (c[k] = hex(c[k]))));
  const mix = (a, b, f) => (Array.isArray(a) ? a.map((v, i) => v + (b[i] - v) * f) : a + (b - a) * f);
  const heure = (tod) => {
    tod = Math.min(1, Math.max(0, tod));
    let i = 0;
    while (i < CLES.length - 2 && tod > CLES[i + 1].tod) i++;
    const a = CLES[i], b = CLES[i + 1];
    const f = Math.min(1, Math.max(0, (tod - a.tod) / (b.tod - a.tod)));
    const g = f * f * (3 - 2 * f);
    const o = {};
    for (const k of Object.keys(a)) if (k !== "tod") o[k] = mix(a[k], b[k], g);
    return o;
  };

  const creer = (cv, opts = {}) => {
    const gl = cv.getContext("webgl", { antialias: false, alpha: false, preserveDrawingBuffer: !!opts.conserver, powerPreference: "high-performance" });
    if (!gl) return null;
    const sh = (type, src) => {
      const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
      return s;
    };
    const pr = gl.createProgram();
    try { gl.attachShader(pr, sh(gl.VERTEX_SHADER, VERT)); gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, FRAG)); }
    catch (e) { console.warn("Paysage : shader refusé, repli image.", e.message); return null; }
    gl.linkProgram(pr);
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) return null;
    gl.useProgram(pr);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(pr, "a"); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const U = {};
    ["r", "t", "cz", "cx", "snow", "stars", "sunI", "skyT", "skyH", "sunC", "fogC", "rockC", "rimC", "sunP"].forEach((n) => (U[n] = gl.getUniformLocation(pr, n)));
    const echelle = opts.echelle || 0.7;
    const taille = (l, h) => {
      const L = l ?? cv.clientWidth, H = h ?? cv.clientHeight;
      cv.width = Math.max(2, Math.round(L * echelle)); cv.height = Math.max(2, Math.round(H * echelle));
      gl.viewport(0, 0, cv.width, cv.height); gl.uniform2f(U.r, cv.width, cv.height);
    };
    const rendre = ({ cz = 0, tod = 0.15, snow = 0, t = 0, cx = 0 } = {}) => {
      const p = heure(tod);
      gl.uniform1f(U.t, t); gl.uniform1f(U.cz, cz); gl.uniform1f(U.cx, cx); gl.uniform1f(U.snow, snow);
      gl.uniform1f(U.stars, p.stars); gl.uniform1f(U.sunI, p.sunI);
      ["skyT", "skyH", "sunC", "fogC", "rockC", "rimC"].forEach((k) => gl.uniform3fv(U[k], p[k]));
      gl.uniform2fv(U.sunP, p.sunP);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    taille();
    return { gl, rendre, taille, perdu: () => gl.isContextLost() };
  };

  window.Paysage = { creer, heure };
})();
