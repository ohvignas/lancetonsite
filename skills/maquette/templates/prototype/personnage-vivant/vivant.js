/* Personnage vivant : une vidéo détourée (couleur en haut, alpha en bas) lue en WebGL2.
 * Seuls les iris suivent la souris : immobiles tant qu'elle n'a pas bougé, puis ils la suivent
 * tout le temps, défilement compris. Le corps et le clignement viennent de la vidéo.
 *
 *   const sam = Vivant(document.querySelector('canvas'), {
 *     video: 'medias/guide/personnage.mp4', yeux: 'medias/guide/yeux.json', pose: 'medias/guide/pose.webp',
 *     alt: 'Sam, votre guide', surPret: () => {}
 *   });
 *   sam.pause(); sam.reprendre(); sam.detruire();
 *
 * `yeux` : l'objet ou l'adresse de yeux.json. `zone` (facultatif) : l'élément dont le rectangle sert à
 * situer le personnage, le canevas par défaut.
 * Image fixe (`pose`) sans WebGL2, en mouvement réduit et au doigt. Le canevas prend le ratio de la
 * vidéo : ne lui donner qu'une largeur ou une hauteur en CSS. Aucune dépendance.
 */
(function (racine) {
  const VS = `#version 300 es
  in vec2 a;out vec2 v;void main(){v=vec2(a.x,1.-a.y);gl_Position=vec4(a*2.-1.,0.,1.);}`;
  // Sur chaque oeil : le blanc reconstitué, puis l'iris qui glisse, découpés par la forme de l'ouverture.
  // Le blanc et les paupières ne bougent pas ; une ombre tombe de la paupière haute sur l'iris.
  const FS = `#version 300 es
  precision highp float;in vec2 v;out vec4 sortie;
  uniform sampler2D uV,uY;uniform vec2 uL,uR,uG,uB,uIL,uIR,uTaille;uniform float uOp,uPret,uOmbre;
  vec2 pan(vec2 q,float i,float j){return (clamp(q,-.985,.985)*.5+.5+vec2(i,j))*.5;}
  vec3 oeil(vec3 c,vec2 u,vec2 b,vec2 ir,float i){
    vec2 q=(u-b)/uB;if(abs(q.x)>=1.||abs(q.y)>=1.)return c;
    vec4 p=texture(uY,pan(q,i,0.));if(p.a<=.001)return c;
    vec2 ci=b+ir+uG;vec4 d=texture(uY,pan((u-ci)/uB,i,1.));
    float ombre=mix(.62,1.,texture(uY,pan(q-vec2(0.,uOmbre/uTaille.y)/uB,i,0.)).a);
    vec3 r=mix(p.rgb,d.rgb*ombre,d.a);
    return mix(c,r,p.a*uOp*uPret);}
  void main(){vec2 u=v;
    vec3 c=texture(uV,vec2(u.x,min(u.y,.998)*.5)).rgb;float al=texture(uV,vec2(u.x,u.y*.5+.5)).r;
    c=oeil(c,u,uL,uIL,0.);c=oeil(c,u,uR,uIR,1.);
    sortie=vec4(c*al,al);}`;

  function Vivant(cv, o) {
    const zone = o.zone || cv;
    const moi = { pret: false, regard: { x: 0, y: 0, suit: false }, pause, reprendre, detruire };
    let Y = null, gl = null, U = null, vid = null, raf = 0, avant = 0, vue = -1, enPause = false, visible = true, mort = false, io = null, ro = null;
    const R = moi.regard;
    let vx = 0, vy = 0, sx = 0, sy = 0;

    cv.setAttribute('role', 'img');
    if (o.alt) cv.setAttribute('aria-label', o.alt);
    if (o.pose) cv.style.background = `url("${o.pose}") center/100% 100% no-repeat`;

    const auDoigt = matchMedia('(hover: none), (pointer: coarse)').matches;
    const reduit = matchMedia('(prefers-reduced-motion: reduce)').matches;

    const bouge = (e) => { if (e.pointerType === 'touch') return; sx = e.clientX; sy = e.clientY; R.suit = true; };
    const vis = () => { document.hidden ? arreter() : lancer(); };

    function taille() {
      if (!Y) return;
      const r = cv.getBoundingClientRect();
      const d = Math.min(devicePixelRatio || 1, 2), hh = Math.min(Math.max(r.height, 1) * d, Y.h * 1.5);
      cv.width = Math.round(hh * Y.w / Y.h); cv.height = Math.round(hh);
      if (gl) gl.viewport(0, 0, cv.width, cv.height);
    }
    function preparer() {
      gl = cv.getContext('webgl2', { alpha: true, premultipliedAlpha: true, antialias: false });
      if (!gl) return false;
      const sh = (t, s) => { const x = gl.createShader(t); gl.shaderSource(x, s); gl.compileShader(x); if (!gl.getShaderParameter(x, gl.COMPILE_STATUS)) throw gl.getShaderInfoLog(x); return x; };
      const p = gl.createProgram();
      gl.attachShader(p, sh(gl.VERTEX_SHADER, VS)); gl.attachShader(p, sh(gl.FRAGMENT_SHADER, FS)); gl.linkProgram(p); gl.useProgram(p);
      gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0, 0, 1, 0, 0, 1, 1, 1]), gl.STATIC_DRAW);
      const la = gl.getAttribLocation(p, 'a'); gl.enableVertexAttribArray(la); gl.vertexAttribPointer(la, 2, gl.FLOAT, false, 0, 0);
      gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, gl.createTexture());
      for (const [k, v] of [[gl.TEXTURE_MIN_FILTER, gl.LINEAR], [gl.TEXTURE_MAG_FILTER, gl.LINEAR], [gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE], [gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE]]) gl.texParameteri(gl.TEXTURE_2D, k, v);
      gl.uniform1i(gl.getUniformLocation(p, 'uV'), 0);
      U = Object.fromEntries(['uL', 'uR', 'uG', 'uB', 'uIL', 'uIR', 'uOp', 'uPret', 'uOmbre', 'uTaille', 'uY'].map((n) => [n, gl.getUniformLocation(p, n)]));
      gl.uniform2f(U.uB, Y.box[0] / Y.w, Y.box[1] / Y.h); gl.uniform2f(U.uTaille, Y.w, Y.h); gl.uniform1f(U.uPret, 0); gl.uniform1f(U.uOmbre, Y.ombre);
      gl.uniform2f(U.uIL, Y.yeux[0].i[0] / Y.w, Y.yeux[0].i[1] / Y.h); gl.uniform2f(U.uIR, Y.yeux[1].i[0] / Y.w, Y.yeux[1].i[1] / Y.h);
      gl.uniform1i(U.uY, 1);
      // les calques des yeux : tant qu'ils ne sont pas chargés, la vidéo seule s'affiche
      const tY = gl.createTexture(), im = new Image();
      im.onload = () => {
        if (mort) return;
        gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, tY);
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false); gl.pixelStorei(gl.UNPACK_COLORSPACE_CONVERSION_WEBGL, gl.NONE);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, im);
        for (const [k, v] of [[gl.TEXTURE_MIN_FILTER, gl.LINEAR], [gl.TEXTURE_MAG_FILTER, gl.LINEAR], [gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE], [gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE]]) gl.texParameteri(gl.TEXTURE_2D, k, v);
        gl.activeTexture(gl.TEXTURE0); gl.uniform1f(U.uPret, 1);
      };
      im.src = Y.A;
      gl.clearColor(0, 0, 0, 0);
      return true;
    }
    function dessiner(dt) {
      if (vid.readyState < 2) return;
      // où sont les yeux à l'écran, à cette image : le défilement est donc pris en compte
      const r = zone.getBoundingClientRect();
      const n = Math.min(Y.n - 1, Math.floor(vid.currentTime * Y.fps) % Y.n);
      const L = Y.L[n], D = Y.R[n], ex = r.left + r.width * (L[0] + D[0]) / 2 / Y.w, ey = r.top + r.height * (L[1] + D[1]) / 2 / Y.h;
      let gx = 0, gy = 0;
      if (R.suit) { const dx = sx - ex, dy = sy - ey; gx = dx / (Math.abs(dx) + 170); gy = dy / (Math.abs(dy) + 230); }
      // ressort à pas fixe : réponse rapide et sans à-coup, même si l'image ralentit
      for (let t = dt; t > 0; t -= 1 / 240) { const h = Math.min(t, 1 / 240); vx += ((gx - R.x) * 420 - vx * 41) * h; vy += ((gy - R.y) * 420 - vy * 41) * h; R.x += vx * h; R.y += vy * h; }
      if (n !== vue) { vue = n; gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false); gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, vid); }
      gl.uniform2f(U.uL, L[0] / Y.w, L[1] / Y.h); gl.uniform2f(U.uR, D[0] / Y.w, D[1] / Y.h);
      gl.uniform2f(U.uG, R.x * Y.G[0] / Y.w, R.y * Y.G[1] / Y.h); gl.uniform1f(U.uOp, Y.op[n]);
      gl.clear(gl.COLOR_BUFFER_BIT); gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
    function pas(t) {
      raf = requestAnimationFrame(pas);
      const dt = Math.min(.1, (t - avant) / 1000 || 0); avant = t;
      dessiner(dt);
    }
    function lancer() {
      if (mort || enPause || !visible || document.hidden || !vid || raf) return;
      avant = performance.now(); raf = requestAnimationFrame(pas);
      const q = vid.play(); if (q && q.catch) q.catch(() => addEventListener('pointerdown', lancer, { once: true }));
    }
    function arreter() { cancelAnimationFrame(raf); raf = 0; if (vid && !vid.paused) vid.pause(); }
    function pause() { enPause = true; arreter(); }
    function reprendre() { enPause = false; lancer(); }
    function detruire() {
      mort = true; arreter(); removeEventListener('pointermove', bouge); document.removeEventListener('visibilitychange', vis);
      if (io) io.disconnect(); if (ro) ro.disconnect();
      if (vid) { vid.removeAttribute('src'); vid.load(); }
    }
    async function demarrer() {
      Y = typeof o.yeux === 'string' ? await (await fetch(o.yeux)).json() : o.yeux;
      if (mort) return;
      cv.style.aspectRatio = Y.w + ' / ' + Y.h;
      if (reduit || auDoigt) return;
      try { if (!preparer()) return; } catch (e) { console.warn('Personnage en image fixe', e); gl = null; return; }
      taille();
      ro = new ResizeObserver(taille); ro.observe(cv);
      vid = moi.video = document.createElement('video');
      vid.muted = vid.defaultMuted = vid.loop = vid.playsInline = true;
      vid.setAttribute('playsinline', ''); vid.preload = 'auto'; vid.crossOrigin = 'anonymous';
      vid.addEventListener('playing', () => {
        if (moi.pret) return;
        moi.pret = true; cv.style.background = 'none'; if (o.surPret) o.surPret(moi);
      });
      vid.src = o.video;
      addEventListener('pointermove', bouge, { passive: true });
      document.addEventListener('visibilitychange', vis);
      io = new IntersectionObserver((e) => { visible = e[0].isIntersecting; visible ? lancer() : arreter(); });
      io.observe(cv);
      lancer();
    }
    demarrer().catch((e) => console.warn('Personnage en image fixe', e));
    return moi;
  }
  racine.Vivant = Vivant;
})(typeof window !== 'undefined' ? window : this);
