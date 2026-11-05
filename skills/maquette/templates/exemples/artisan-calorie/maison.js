/*
 * Calorie — le moment signature : la maison en coupe (three.js 0.170.0, construite en code, aucun fichier 3D).
 *   Au défilement (section épinglée, le seul épinglage de la page) : la maison fermée s'ouvre (le mur de façade
 *   descend dans le sol, le pan de toit avant se relève), puis la chaleur fait son trajet :
 *   1 l'unité extérieure aspire l'air · 2 la liaison frigorifique rejoint le module du cellier ·
 *   3 l'eau chaude part dans le plancher puis les radiateurs de l'étage · 4 le ballon thermodynamique chauffe l'eau.
 *   Flux = particules qui glissent le long de courbes ; repères HTML projetés depuis la 3D.
 * Bouton pause : fige les flux et le ventilateur (le défilement reste maître de l'ouverture).
 * Mouvement réduit (ou GSAP absent) : pas d'épinglage, maison ouverte, flux posés, toutes les étapes lisibles.
 * Sans WebGL ou sans le CDN : schéma SVG de repli (dans index.html), même texte.
 * GSAP : gsap.matchMedia() pour les points de rupture et le mouvement réduit (nettoyage automatique), ScrollTrigger.sort() + refresh().
 */
const root = document.documentElement;
const section = document.querySelector("#trajet");
const scene3 = section.querySelector("[data-trajet]");
const canvas = section.querySelector("[data-trajet-3d]");
const reperes = [...section.querySelectorAll("[data-repere]")];
const etapes = [...section.querySelectorAll("[data-etape]")];
const barres = [...section.querySelectorAll(".trajet-progres i")];
const btnPause = section.querySelector("[data-trajet-pause]");
const { gsap, ScrollTrigger } = window;
const statique = matchMedia("(prefers-reduced-motion: reduce)").matches || !gsap || !ScrollTrigger || root.classList.contains("motion-reduit");

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const seg = (t, a, b) => clamp((t - a) / (b - a));
const doux = (k) => k * k * (3 - 2 * k);
const lerp = (a, b, k) => a + (b - a) * k;

let cible = statique ? 1 : 0, t = cible, temps = 0, enPause = false, visible = true, raf = 0, vue = null, dernier = performance.now();
const SEUILS = [0.28, 0.44, 0.6, 0.68, 0.8]; // apparition des 5 repères

/* ------------------------------------------------------------------ texte des étapes */
const majTexte = (p) => {
  const k = p < 0.42 ? 0 : p < 0.58 ? 1 : p < 0.78 ? 2 : 3;
  etapes.forEach((li, i) => li.classList.toggle("actif", statique || i === k));
  barres.forEach((b, i) => b.classList.toggle("plein", i <= k));
};

/* ------------------------------------------------------------------ boucle de rendu (seulement à l'écran) */
const demander = () => { if (!raf && visible) raf = requestAnimationFrame(image); };
function image(now) {
  raf = 0;
  const dt = Math.min(0.05, (now - dernier) / 1000); dernier = now;
  if (!enPause && !statique) temps += dt;
  t = Math.abs(cible - t) < 1e-4 ? cible : lerp(t, cible, 0.12);
  majTexte(t);
  if (vue) vue.rendre(t, temps);
  const bouge = Math.abs(cible - t) > 1e-4;
  if (!statique && visible && (!enPause || bouge)) demander();
}
new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) { dernier = performance.now(); demander(); } }, { rootMargin: "100px 0px" }).observe(scene3);

btnPause.addEventListener("click", () => {
  enPause = !enPause;
  btnPause.setAttribute("aria-pressed", String(enPause));
  btnPause.querySelector("span").textContent = enPause ? "Relancer les flux" : "Pause des flux";
  dernier = performance.now(); demander();
});
if (statique) btnPause.hidden = true;

/* ------------------------------------------------------------------ épinglage (gsap.matchMedia : nettoyé seul au changement de point de rupture) */
if (!statique) {
  const mm = gsap.matchMedia();
  mm.add({ bureau: "(min-width: 768px) and (prefers-reduced-motion: no-preference)", tel: "(max-width: 767px) and (prefers-reduced-motion: no-preference)" }, (ctx) => {
    const { bureau } = ctx.conditions;
    ScrollTrigger.create({
      trigger: scene3, pin: true, start: "top top",
      end: () => "+=" + Math.round(innerHeight * (bureau ? 2 : 1.5)), // 2 écrans au plus sur ordinateur, 1,5 sur téléphone
      invalidateOnRefresh: true,
      onUpdate: (self) => { cible = self.progress; section.dispatchEvent(new CustomEvent("progression", { detail: self.progress })); demander(); },
    });
    return () => { cible = 0; };
  });
  ScrollTrigger.sort();
  ScrollTrigger.refresh();
}
majTexte(t);

/* ------------------------------------------------------------------ la scène 3D */
const webglOK = () => {
  try { const c = document.createElement("canvas"); return !!(window.WebGLRenderingContext && (c.getContext("webgl2") || c.getContext("webgl"))); }
  catch { return false; }
};

function construire(THREE) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.localClippingEnabled = true;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 200);
  const V = (x, y, z) => new THREE.Vector3(x, y, z);
  const sol = new THREE.Plane(V(0, 1, 0), 0); // le mur de façade disparaît sous le sol
  const mat = (color, o = {}) => new THREE.MeshStandardMaterial({ color, roughness: 0.85, metalness: 0, flatShading: true, ...o });
  const ajout = (geo, m, x, y, z, parent = scene, ombre = true) => {
    const me = new THREE.Mesh(geo, m); me.position.set(x, y, z);
    me.castShadow = ombre; me.receiveShadow = true; parent.add(me); return me;
  };
  const box = (w, h, d, m, x, y, z, parent) => ajout(new THREE.BoxGeometry(w, h, d), m, x, y, z, parent);

  /* lumière douce : ciel d'hiver, soleil bas, intérieur qui se réchauffe */
  scene.add(new THREE.HemisphereLight(0xc4d9ea, 0x3b3128, 1.25));
  const soleil = new THREE.DirectionalLight(0xffdcb8, 2.1);
  soleil.position.set(9, 14, 11); soleil.castShadow = true;
  soleil.shadow.mapSize.set(2048, 2048); soleil.shadow.radius = 5; soleil.shadow.bias = -0.0004;
  Object.assign(soleil.shadow.camera, { left: -13, right: 13, top: 13, bottom: -13, near: 1, far: 50 });
  scene.add(soleil);
  const lune = new THREE.DirectionalLight(0x8fb4d9, 0.7); lune.position.set(-10, 6, 4); scene.add(lune);
  const lampes = [V(-1.6, 1.8, 0.5), V(-2, 4.3, -0.5), V(2, 4.3, -0.5), V(2.6, 1.8, -0.5)].map((p) => {
    const l = new THREE.PointLight(0xffa860, 0, 7, 1.6); l.position.copy(p); scene.add(l); return l;
  });

  /* le terrain : un socle de garrigue, cyprès, olivier, lavande */
  const socle = new THREE.Mesh(new THREE.CylinderGeometry(11, 11.4, 0.6, 56), [mat(0x3c3832), mat(0x7b8a62), mat(0x2b2824)]);
  socle.position.y = -0.3; socle.receiveShadow = true; scene.add(socle);
  box(1.6, 0.04, 5.4, mat(0xc8bba3), -0.2, 0.02, 5.8); // allée
  [[-6.2, -1.8, 3.4], [-7, -0.4, 2.8], [7.6, -2.6, 3.0]].forEach(([x, z, h]) => ajout(new THREE.ConeGeometry(0.42, h, 7), mat(0x2f4a36), x, h / 2, z));
  ajout(new THREE.CylinderGeometry(0.12, 0.18, 1.1, 6), mat(0x6b5a48), 6.9, 0.55, -0.6);
  ajout(new THREE.IcosahedronGeometry(1.05, 0), mat(0x8a9a72), 6.9, 1.7, -0.6);
  const lavande = mat(0x8a86a6);
  for (let r = 0; r < 2; r++) for (let i = 0; i < 6; i++) ajout(new THREE.ConeGeometry(0.13, 0.32, 5), lavande, 1.8 + i * 0.6 + r * 0.3, 0.16, 4.9 + r * 0.55);

  /* la maison : moellons calcaires dessinés en code (CanvasTexture, aucune image) */
  const moellons = (() => {
    const cv = document.createElement("canvas"); cv.width = cv.height = 512;
    const g = cv.getContext("2d");
    g.fillStyle = "#e6dfd1"; g.fillRect(0, 0, 512, 512); // joints beurrés, clairs
    const tons = ["#d6ccb6", "#cbbfa4", "#d0c3a8", "#c2b598", "#dbd1bc", "#c7b99b"];
    let y = 0, graine = 7;
    const hasard = () => ((graine = (graine * 16807) % 2147483647) / 2147483647);
    while (y < 512) {
      const h = 52 + hasard() * 40; let x = -hasard() * 60;
      while (x < 512) {
        const w = 70 + hasard() * 110;
        g.fillStyle = tons[Math.floor(hasard() * tons.length)];
        g.beginPath(); g.roundRect(x + 4 + hasard() * 3, y + 4 + hasard() * 3, w - 9 - hasard() * 4, h - 9 - hasard() * 4, 10 + hasard() * 14); g.fill();
        x += w;
      }
      y += h;
    }
    const t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = THREE.RepeatWrapping; t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4;
    return t;
  })();
  const pierre = (rx, ry, o = {}) => { const t = moellons.clone(); t.repeat.set(rx, ry); t.needsUpdate = true; return mat(0xffffff, { map: t, ...o }); };
  const enduit = pierre(1.6, 1.1), interieur = mat(0xf0ebe3), beton = mat(0xcac3b6);
  box(8, 0.3, 6, beton, 0, 0.15, 0);
  const tomette = mat(0xc4805a, { emissive: 0xff6a1f, emissiveIntensity: 0 });
  box(5.0, 0.04, 5.4, tomette, -1.35, 0.32, 0);
  box(2.4, 0.04, 5.4, mat(0xbfc6c9), 2.55, 0.32, 0);
  // murs : pierre dehors, enduit dedans (ordre des faces d'une boîte : +x, -x, +y, -y, +z, -z)
  const faces = (i, dedans, dehors) => Array.from({ length: 6 }, (_, j) => (j === i ? dedans : dehors));
  box(8, 5.4, 0.3, faces(4, interieur, enduit), 0, 2.7, -2.85);
  box(0.3, 5.4, 6, faces(0, interieur, enduit), -3.85, 2.7, 0);
  box(0.3, 5.4, 6, faces(1, interieur, enduit), 3.85, 2.7, 0);
  const pignon = new THREE.Shape(); pignon.moveTo(-3, 0); pignon.lineTo(3, 0); pignon.lineTo(0, 1.9); pignon.closePath();
  const geoPignon = new THREE.ExtrudeGeometry(pignon, { depth: 0.3, bevelEnabled: false });
  const pierrePignon = pierre(0.35, 0.5);
  [-4, 3.7].forEach((x) => { const p = ajout(geoPignon, pierrePignon, x, 5.4, 0); p.rotation.y = Math.PI / 2; });
  // génoise de deux rangs sous l'égout (arrière ; l'avant part avec la façade)
  const genoise = mat(0xc77a52);
  box(8.3, 0.12, 0.22, genoise, 0, 5.34, -3.08); box(8.5, 0.12, 0.36, genoise, 0, 5.46, -3.12);
  box(7.4, 0.25, 5.4, mat(0xa98058), 0, 2.95, 0); // plancher de l'étage
  box(0.14, 2.6, 5.4, interieur, 1.3, 1.6, 0);
  box(0.14, 2.3, 5.4, interieur, 0, 4.25, 0);
  box(7.4, 0.14, 5.4, interieur, 0, 5.47, 0); // plafond de l'étage : la coupe se lit en deux niveaux
  // fenêtres du mur du fond, éclairées de l'intérieur
  const vitre = mat(0x2a3d4a, { emissive: 0xffb36b, emissiveIntensity: 0.15 });
  [[-2.2, 1.7], [-2.2, 4.3], [2, 4.3]].forEach(([x, y]) => box(1, 1.2, 0.06, vitre, x, y, -2.68));

  // mobilier
  box(2, 0.45, 0.8, mat(0x5f7684), -2.3, 0.58, -2.1); box(2, 0.55, 0.22, mat(0x5f7684), -2.3, 0.95, -2.42);
  box(2.4, 0.03, 1.6, mat(0xd2ad80), -2.0, 0.35, -0.6);
  box(0.9, 0.06, 0.5, mat(0x8b6a4a), -2.0, 0.72, -0.6);
  box(1.6, 0.4, 2.1, mat(0xece6dc), -2.2, 3.3, -1.55); box(1.7, 0.75, 0.12, mat(0x8b6a4a), -2.2, 3.45, -2.66);
  box(1.2, 0.06, 0.6, mat(0xa98058), 2.3, 3.85, -2.35);

  // radiateurs (ailettes) et module, ballon
  const fonte = mat(0xe9e3da, { emissive: 0xff5a1a, emissiveIntensity: 0 });
  [-2.2, 2.0].forEach((x) => {
    const g = new THREE.Group(); g.position.set(x, 3.68, -2.62); scene.add(g);
    for (let i = 0; i < 9; i++) box(0.09, 0.62, 0.14, fonte, -0.48 + i * 0.12, 0, 0, g);
  });
  const blanc = mat(0xf3f5f5);
  box(0.62, 0.86, 0.36, blanc, 3.3, 1.7, -2.5);
  box(0.22, 0.1, 0.02, mat(0x0e1820, { emissive: 0x6cc3e0, emissiveIntensity: 0.9 }), 3.3, 1.92, -2.31);
  const cuve = mat(0xe9eef0, { emissive: 0xff7a2a, emissiveIntensity: 0 });
  ajout(new THREE.CylinderGeometry(0.36, 0.36, 1.5, 24), cuve, 2.05, 1.1, -2.2);
  ajout(new THREE.CylinderGeometry(0.37, 0.37, 0.36, 24), mat(0xc5cfd3), 2.05, 2.03, -2.2);

  // l'unité extérieure, face à la caméra
  const unite = new THREE.Group(); unite.position.set(5.15, 0, 0.7); scene.add(unite);
  box(1.25, 0.14, 0.62, mat(0x8f989c), 0, 0.07, 0, unite);
  box(1.12, 0.84, 0.42, mat(0xeef1f2), 0, 0.57, 0, unite);
  box(0.26, 0.7, 0.02, mat(0xb9c2c6), 0.38, 0.57, 0.22, unite);
  const anneau = ajout(new THREE.TorusGeometry(0.28, 0.035, 8, 36), mat(0x2b3a44), -0.16, 0.57, 0.22, unite);
  const helice = new THREE.Group(); helice.position.set(-0.16, 0.57, 0.2); unite.add(helice);
  for (let i = 0; i < 3; i++) { const p = box(0.08, 0.46, 0.02, mat(0x3a4a54), 0, 0, 0, helice); p.rotation.z = (i * Math.PI * 2) / 3; p.position.set(Math.sin(p.rotation.z) * -0.12, Math.cos(p.rotation.z) * 0.12, 0); }
  const halo = new THREE.Mesh(new THREE.RingGeometry(0.75, 0.82, 48), new THREE.MeshBasicMaterial({ color: 0xf6b54a, transparent: true, opacity: 0, side: THREE.DoubleSide }));
  halo.rotation.x = -Math.PI / 2; halo.position.set(5.15, 0.03, 0.7); scene.add(halo);

  /* la façade et le pan de toit avant : ce qui s'ouvre */
  const facade = new THREE.Group(); scene.add(facade);
  const enduitF = pierre(1.6, 1.1, { clippingPlanes: [sol] });
  const volet = mat(0x7f98a2, { clippingPlanes: [sol] });
  const vitreF = mat(0x22323c, { emissive: 0xffb36b, emissiveIntensity: 0.25, clippingPlanes: [sol] });
  box(8, 5.4, 0.3, faces(5, mat(0xf0ebe3, { clippingPlanes: [sol] }), enduitF), 0, 2.7, 2.85, facade);
  [[-2.2, 1.6], [2.4, 1.6], [-2.2, 4.3], [2.0, 4.3]].forEach(([x, y]) => {
    box(0.95, 1.2, 0.06, vitreF, x, y, 3.02, facade);
    box(0.5, 1.25, 0.06, volet, x - 0.78, y, 3.04, facade); box(0.5, 1.25, 0.06, volet, x + 0.78, y, 3.04, facade);
  });
  box(1.0, 2.1, 0.08, mat(0x6d5a48, { clippingPlanes: [sol] }), 0.2, 1.35, 3.03, facade);
  const genoiseF = mat(0xc77a52, { clippingPlanes: [sol] });
  box(8.3, 0.12, 0.22, genoiseF, 0, 5.34, 3.08, facade); box(8.5, 0.12, 0.36, genoiseF, 0, 5.46, 3.12, facade);

  const pente = Math.atan2(1.9, 3.3), long = Math.hypot(3.3, 1.9) + 0.15;
  // tuiles canal : 9 rangs de tuiles coniques qui se recouvrent, courant (creux) et couvert (bosse) en alternance
  const RANGS = 9, pas = long / RANGS, lgT = pas * 1.2;
  const geoCourant = new THREE.CylinderGeometry(0.15, 0.125, lgT, 8, 1, true, -Math.PI / 2, Math.PI);
  const geoCouvert = new THREE.CylinderGeometry(0.115, 0.14, lgT, 8, 1, true, -Math.PI / 2, Math.PI);
  const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), eu = new THREE.Euler(), pos = new THREE.Vector3(), un = new THREE.Vector3(1, 1, 1), teinte = new THREE.Color();
  let graineT = 11;
  const hasardT = () => ((graineT = (graineT * 16807) % 2147483647) / 2147483647);
  const pan = (signe, matPan) => {
    const pivot = new THREE.Group(); pivot.position.set(0, 7.32, 0); scene.add(pivot);
    box(8.7, 0.12, long, matPan, 0, 0, signe * long / 2, pivot);
    const lots = [new THREE.InstancedMesh(geoCourant, matPan, 16 * RANGS), new THREE.InstancedMesh(geoCouvert, matPan, 16 * RANGS)];
    const n = [0, 0];
    for (let i = 0; i < 32; i++) for (let k = 0; k < RANGS; k++) {
      const c = i % 2; // 0 : courant, creux vers le ciel ; 1 : couvert, bosse vers le ciel, posé sur deux courants
      // chaque tuile penche un peu : son bas remonte sur la tuile du rang suivant (le recouvrement se lit)
      eu.set((c ? -1 : 1) * Math.PI / 2 - signe * 0.06, 0, 0); q.setFromEuler(eu);
      pos.set(-4.2 + i * 0.271, c ? 0.21 : 0.2, signe * (k + 0.5) * pas);
      lots[c].setMatrixAt(n[c], m4.compose(pos, q, un));
      const v = 0.86 + hasardT() * 0.2; // terre cuite passée : une tuile plus claire, une plus sombre
      lots[c].setColorAt(n[c]++, teinte.setRGB(v, v * (0.97 + hasardT() * 0.05), v * 0.96));
    }
    lots.forEach((l) => { l.castShadow = l.receiveShadow = true; pivot.add(l); });
    pivot.rotation.x = signe * pente;
    return pivot;
  };
  pan(-1, mat(0xb7653f, { side: THREE.DoubleSide }));
  const tuileAvant = mat(0xb4613f, { transparent: true, side: THREE.DoubleSide });
  const panAvant = pan(1, tuileAvant);

  /* tuyaux et flux */
  const tube = (pts, couleur) => {
    const c = new THREE.CatmullRomCurve3(pts, false, "centripetal");
    const m = mat(couleur, { emissive: couleur, emissiveIntensity: 0, roughness: 0.5, metalness: 0.3, flatShading: false });
    ajout(new THREE.TubeGeometry(c, Math.max(64, pts.length * 24), 0.045, 8), m, 0, 0, 0, scene, false);
    return { c, m };
  };
  const serpentin = [V(3.1, 1.35, -2.55), V(2.5, 0.5, -2.6), V(1.0, 0.39, -2.5)];
  [-2.4, -1.6, -0.8, 0, 0.8, 1.6, 2.4].forEach((z, i) => { const a = i % 2 ? [-3.4, 0.9] : [0.9, -3.4]; serpentin.push(V(a[0], 0.39, z), V(a[1], 0.39, z)); });
  const P = {
    liaison: tube([V(5.0, 0.95, 0.45), V(4.7, 1.05, -0.5), V(4.3, 1.5, -2.25), V(3.62, 1.7, -2.5)], 0xb9744f),
    sol: tube(serpentin, 0xc1533a),
    rad: tube([V(3.45, 2.13, -2.6), V(3.45, 2.85, -2.66), V(3.0, 3.28, -2.7), V(1.0, 3.3, -2.7), V(-1.0, 3.3, -2.7), V(-2.8, 3.3, -2.7)], 0xc1533a),
  };
  const air = (pts) => ({ c: new THREE.CatmullRomCurve3(pts) });
  const A = {
    entree: air([V(7.2, 0.9, -1.6), V(6.2, 0.75, -0.6), V(5.45, 0.6, 0.45)]),
    sortie: air([V(5.0, 0.57, 0.95), V(4.9, 0.6, 2.2), V(4.6, 0.7, 3.6)]),
    ballon: air([V(1.4, 2.5, -1.7), V(1.75, 2.15, -2.0), V(2.05, 2.05, -2.2), V(2.4, 2.3, -1.8), V(2.7, 2.6, -1.5)]),
  };
  const sprite = (() => {
    const c = document.createElement("canvas"); c.width = c.height = 64;
    const g = c.getContext("2d"), r = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    r.addColorStop(0, "rgba(255,255,255,1)"); r.addColorStop(0.35, "rgba(255,255,255,.7)"); r.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = r; g.fillRect(0, 0, 64, 64);
    const tx = new THREE.CanvasTexture(c); tx.colorSpace = THREE.SRGBColorSpace; return tx;
  })();
  const flux = (courbe, n, deb, fin, taille, vitesse) => {
    const pos = new Float32Array(n * 3), col = new Float32Array(n * 3);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3)); geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
    const m = new THREE.PointsMaterial({ size: taille, map: sprite, vertexColors: true, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true });
    const pts = new THREE.Points(geo, m); pts.frustumCulled = false; pts.renderOrder = 2; scene.add(pts);
    const ca = new THREE.Color(deb), cb = new THREE.Color(fin), tmp = new THREE.Color(), p = new THREE.Vector3();
    return {
      m,
      maj(tps) {
        for (let i = 0; i < n; i++) {
          const u = (i / n + tps * vitesse) % 1;
          courbe.c.getPointAt(u, p); pos.set([p.x, p.y, p.z], i * 3);
          tmp.copy(ca).lerp(cb, u); col.set([tmp.r, tmp.g, tmp.b], i * 3);
        }
        geo.attributes.position.needsUpdate = true; geo.attributes.color.needsUpdate = true;
      },
    };
  };
  const F = {
    entree: flux(A.entree, 18, 0x9fdcf0, 0x6cc3e0, 0.5, 0.22),
    sortie: flux(A.sortie, 16, 0x6cc3e0, 0x2d6f8a, 0.45, 0.2),
    liaison: flux(P.liaison, 22, 0x6cc3e0, 0xf6b54a, 0.45, 0.18),
    sol: flux(P.sol, 90, 0xffd08a, 0xff7a3a, 0.42, 0.035),
    rad: flux(P.rad, 34, 0xffd08a, 0xff8a40, 0.42, 0.09),
    ballon: flux(A.ballon, 14, 0x9fdcf0, 0xf6b54a, 0.4, 0.25),
  };

  /* les repères (coordonnées 3D des 5 annotations) */
  const ANCRES = [V(5.15, 1.1, 0.7), V(3.3, 2.15, -2.45), V(-1.6, 0.45, 0.9), V(-2.2, 4.1, -2.6), V(2.05, 0.9, -1.9)];

  /* cadrage de la caméra, image clé par image clé */
  const CLES = [
    [0.0, V(13.5, 7.4, 17.5), V(0.5, 2.6, 0)],
    [0.3, V(6.5, 6.6, 19.5), V(0.6, 2.6, 0)],
    [1.0, V(3.0, 6.3, 18.6), V(0.8, 2.5, -0.3)],
  ];
  const posCam = V(0, 0, 0), cibleCam = V(0, 0, 0), tmp = V(0, 0, 0);
  let L = 1, H = 1, tel = false, etroit = false, dx = 0, dy = 0;
  const dimension = () => {
    L = canvas.clientWidth || 1; H = canvas.clientHeight || 1; tel = L < 768; etroit = L < 1100;
    // décalage du canvas dans la scène (non nul en mouvement réduit, où le canvas passe sous le texte)
    const rc = canvas.getBoundingClientRect(), rp = (reperes[0] && reperes[0].parentElement.getBoundingClientRect()) || rc;
    dx = rc.left - rp.left; dy = rc.top - rp.top;
    renderer.setSize(L, H, false);
    camera.aspect = L / H;
    if (statique) camera.clearViewOffset();
    else if (tel) camera.setViewOffset(L, H, 0, H * 0.1, L, H); // la maison descend vers le cartouche : moins de vide
    else camera.setViewOffset(L, H, -L * (etroit ? 0.21 : 0.15), -H * 0.02, L, H);
    camera.updateProjectionMatrix();
  };
  const recaler = () => { dimension(); vue && vue.rendre(t, temps); };
  new ResizeObserver(recaler).observe(canvas);
  document.fonts && document.fonts.ready.then(recaler); addEventListener("load", recaler);
  dimension();

  const rendre = (p, tps) => {
    // caméra
    let i = 0; while (i < CLES.length - 2 && p > CLES[i + 1][0]) i++;
    const a = CLES[i], b = CLES[i + 1], k = doux(seg(p, a[0], b[0]));
    posCam.lerpVectors(a[1], b[1], k); cibleCam.lerpVectors(a[2], b[2], k);
    const recul = Math.max(tel ? 1 : 1.18, (tel ? (statique ? 1.5 : 1.08) : statique ? 1.6 : 1.75) / camera.aspect) * (etroit && !tel && !statique ? 1.12 : 1);
    tmp.subVectors(posCam, cibleCam).multiplyScalar(recul);
    camera.position.copy(cibleCam).add(tmp); camera.lookAt(cibleCam);

    // ouverture
    const ouvre = doux(seg(p, 0.08, 0.3));
    facade.position.y = -6 * ouvre;
    panAvant.rotation.x = pente - ouvre * (pente + 1.25);
    tuileAvant.opacity = 1 - seg(p, 0.18, 0.3);
    panAvant.visible = tuileAvant.opacity > 0.01;

    // trajet
    const s1 = seg(p, 0.26, 0.36), s2 = seg(p, 0.42, 0.52), s3 = seg(p, 0.58, 0.68), s3b = seg(p, 0.66, 0.76), s4 = seg(p, 0.8, 0.9);
    F.entree.m.opacity = s1; F.sortie.m.opacity = s1 * 0.8;
    F.liaison.m.opacity = s2; P.liaison.m.emissiveIntensity = s2 * 0.5;
    F.sol.m.opacity = s3; P.sol.m.emissiveIntensity = s3 * 0.6; tomette.emissiveIntensity = s3 * 0.22;
    F.rad.m.opacity = s3b; P.rad.m.emissiveIntensity = s3b * 0.6; fonte.emissiveIntensity = s3b * 0.35;
    F.ballon.m.opacity = s4; cuve.emissiveIntensity = s4 * 0.18;
    Object.values(F).forEach((f) => f.m.opacity > 0.01 && f.maj(tps));
    halo.material.opacity = s1 * (1 - s2 * 0.6) * 0.9;
    helice.rotation.z = -tps * (2 + s1 * 9);
    const chaud = s3 * 0.5 + s3b * 0.5;
    lampes[0].intensity = s3 * 9; lampes[1].intensity = s3b * 6; lampes[2].intensity = s3b * 6; lampes[3].intensity = s2 * 3 + s4 * 3;
    vitre.emissiveIntensity = 0.15 + chaud * 0.6;
    renderer.render(scene, camera);

    // repères projetés
    const courant = SEUILS.reduce((c, sj, j) => (p >= sj ? j : c), -1);
    ANCRES.forEach((v, j) => {
      tmp.copy(v).project(camera);
      const x = (tmp.x + 1) / 2 * L, y = (1 - tmp.y) / 2 * H;
      const el = reperes[j];
      const lg = el.offsetWidth || 160, aGauche = x + 10 + lg > L - 12; // près du bord droit : l'étiquette passe à gauche du point
      // téléphone et tablette : à gauche, elle tomberait dans la pièce voisine ; elle se pose au-dessus du point, pastille sur l'objet
      const dessus = aGauche && etroit;
      const gx = dessus ? Math.min(Math.max(x - 14, 12), L - lg - 12) : aGauche ? x - lg - 10 : x + 10;
      el.style.transform = `translate(${Math.round(dx + gx)}px, ${Math.round(dy + y - (dessus ? 46 : 16))}px)`;
      el.classList.toggle("on", (statique ? !etroit : etroit ? j === courant : p >= SEUILS[j]) && tmp.z < 1); // téléphone et tablette : une étiquette à la fois (aucune en état fixe, la liste numérotée suffit)
    });
  };
  return { rendre };
}

try {
  if (!webglOK()) throw new Error("WebGL absent");
  const THREE = await import("three");
  vue = construire(THREE);
  vue.rendre(t, temps);
  demander();
} catch (e) {
  section.classList.add("sans-3d"); // schéma SVG de repli
}
