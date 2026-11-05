/*
 * Ciste — le moment signature : le flacon en verre piloté au défilement (deux épinglages, deux scènes three.js).
 *
 *   #flacon (2 écrans, 1,5 sur téléphone) : le hero ; puis un tour complet par parfum (Restanque → Mistral →
 *            Centifolia → Nuitée). Le liquide change de couleur pendant le tour, le nom de l'étiquette change
 *            quand elle passe au dos. L'objet glisse à droite ou à gauche pour laisser la place au texte.
 *   #notes  (1,5 écran, 1,2 sur téléphone) : Garrigue. Le verre se lève, le liquide se sépare en trois couches
 *            (tête, cœur, fond) qui s'écartent, des gouttes tournent autour ; tout se referme et le flacon finit
 *            de face, étiquette lisible (niveau-agence § 2 bis).
 *
 * Règles GSAP suivies (skills gsap-core / scrolltrigger / performance) : gsap.matchMedia() pour le mouvement réduit
 * et les points de rupture (tout est défait quand la condition change), ScrollTrigger.create sans tween imbriqué,
 * sort() + refresh() après création et après chargement des images, opacité et transforms seulement dans le DOM.
 *
 * Mouvement réduit, WebGL absent ou CDN muet : la classe .scene-3d est retirée, les sections montrent les images
 * fixes rendues depuis la même scène (images/flacon-*.webp, eclate-garrigue.webp) ; three.js n'est pas chargé.
 */
const root = document.documentElement;
const { gsap, ScrollTrigger } = window;
const D = window.CISTE;
const P = (id) => D.parfums.find((p) => p.id === id);

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a, b, k) => a + (b - a) * k;
const seg = (t, a, b) => clamp((t - a) / (b - a));
const doux = (k) => k * k * (3 - 2 * k);
const E = (t, a, b) => { const k = seg(t, a, b); return k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2; };

const fixe = () => {
  root.classList.remove("scene-3d");
  root.classList.remove("js-attente");
  ScrollTrigger?.refresh();
};

/* cadrage clé par clé : [t, cx, cy, fr, el] */
const cadrage = (t, cles) => {
  let i = 0;
  while (i < cles.length - 2 && t > cles[i + 1][0]) i++;
  const a = cles[i], b = cles[i + 1], k = doux(seg(t, a[0], b[0]));
  return { cx: lerp(a[1], b[1], k), cy: lerp(a[2], b[2], k), fr: lerp(a[3], b[3], k), el: lerp(a[4], b[4], k) };
};
const CLES_FLACON = {
  bureau: [[0, 0.5, 0.5, 0.45, 7], [0.09, 0.5, 0.5, 0.45, 7], [0.17, 0.5, 0.5, 0.62, 8], [0.235, 0.66, 0.5, 0.64, 8],
    [0.43, 0.66, 0.5, 0.64, 8], [0.5, 0.34, 0.5, 0.64, 8], [0.68, 0.34, 0.5, 0.64, 8], [0.75, 0.66, 0.5, 0.64, 8], [1, 0.66, 0.5, 0.64, 8]],
  mobile: [[0, 0.5, 0.46, 0.33, 7], [0.09, 0.5, 0.46, 0.33, 7], [0.18, 0.5, 0.33, 0.42, 8], [1, 0.5, 0.33, 0.42, 8]],
};
const ORDRE = ["restanque", "mistral", "centifolia", "nuitee"];
const TOURS = [0.2, 0.465, 0.715], DEMI = 0.075;

const mobile = () => innerWidth < 768;

async function demarrer() {
  if (!root.classList.contains("scene-3d") || !gsap || !ScrollTrigger) return fixe();
  let L;
  try { L = await import("./flacon3d.js"); } catch (e) { console.warn("Ciste : three.js indisponible, images fixes.", e); return fixe(); }
  const { T } = L;
  await document.fonts?.load('500 104px "Bodoni Moda"').catch(() => {});
  await document.fonts?.load('italic 400 86px "Bodoni Moda"').catch(() => {});

  /* ---------------------------------------------------------------- une scène = un canvas, un rendu, un flacon */
  const creer = (cadre) => {
    const toile = cadre.querySelector(".scene-toile");
    let rendu;
    try { rendu = L.creerRendu(toile); } catch (e) { return null; }
    const m = L.construireFlacon({ env: rendu.env });
    const camera = new T.PerspectiveCamera(24, 1, 0.1, 200);
    const sc = { cadre, toile, r: rendu.r, m, camera, W: 1, H: 1, t: 0, temps: 0, sale: true, visible: false, pause: false };
    sc.mesurer = () => { sc.W = cadre.clientWidth; sc.H = cadre.clientHeight; sc.r.setSize(sc.W, sc.H, false); sc.sale = true; };
    new IntersectionObserver(([x]) => { sc.visible = x.isIntersecting; }, { rootMargin: "80px" }).observe(cadre);
    // bouton pause : arrête ce qui bouge seul (balancement, gouttes) ; le défilement pilote toujours la scène
    const btn = cadre.querySelector("[data-scene-pause]"), txt = btn?.querySelector("[data-pause-texte]"), libre = txt?.textContent;
    btn?.addEventListener("click", () => {
      sc.pause = !sc.pause;
      btn.setAttribute("aria-pressed", String(sc.pause));
      btn.classList.toggle("en-pause", sc.pause);
      txt.textContent = sc.pause ? "Relancer le mouvement" : libre;
    });
    sc.mesurer();
    return sc;
  };
  const A = creer(document.querySelector('[data-scene="flacon"]'));
  const B = creer(document.querySelector('[data-scene="notes"]'));
  if (!A || !B) return fixe();
  const couleurs = ORDRE.map((id) => new T.Color(P(id).liquide));
  const garrigue = new T.Color(P("garrigue").liquide);

  /* ---------------------------------------------------------------- scène A : le hero et les quatre parfums */
  const momentsA = [...A.cadre.querySelectorAll(".moment")].map((el) => ({
    el,
    entree: el.dataset.in ? el.dataset.in.split(",").map(Number) : null,
    sortie: el.dataset.out ? el.dataset.out.split(",").map(Number) : null,
  }));
  const dessinerA = () => {
    const { t, m, camera } = A;
    let rot = -0.16, couleur = couleurs[0].clone(), n = 0;
    TOURS.forEach((c, i) => {
      const k = E(t, c - DEMI, c + DEMI);
      rot += Math.PI * 2 * k;
      if (k > 0) couleur.lerp(couleurs[i + 1], k);
      if (k > 0.5) n = i + 1;
    });
    const repos = 1 - seg(t, 0, 0.06);
    rot += repos * Math.sin(A.temps * 0.55) * 0.42;
    L.poserFlacon(m, { rotY: rot, couleur, nom: P(ORDRE[n]).nom, eclate: 0, temps: 0 });
    L.cadrer(camera, cadrage(t, CLES_FLACON[mobile() ? "mobile" : "bureau"]), A.W, A.H);
    A.r.render(m.scene, camera);
    momentsA.forEach(({ el, entree, sortie }) => {
      let o = entree ? seg(t, entree[0], entree[1]) : 1;
      if (sortie) o *= 1 - seg(t, sortie[0], sortie[1]);
      el.style.opacity = o.toFixed(3);
      el.style.transform = `translate3d(0, ${((1 - o) * (entree && t < entree[1] ? 24 : -16)).toFixed(1)}px, 0)`;
      el.style.visibility = o > 0.01 ? "visible" : "hidden";
    });
  };

  /* ---------------------------------------------------------------- scène B : Garrigue se décompose */
  const notes = [...B.cadre.querySelectorAll(".note")];
  const fin = B.cadre.querySelector(".notes-fin");
  const v = new T.Vector3(), droite = new T.Vector3();
  const etatB = (t) => ({
    // les couches commencent à s'écarter DANS le flacon, puis le capot s'envole : on ne voit jamais le liquide seul, en bloc
    eclate: E(t, 0.1, 0.34) * (1 - E(t, 0.64, 0.88)),
    // le capot (verre + bouchon) quitte le cadre vite, pour ne jamais traîner sous le titre ; il revient avant que les couches se referment
    leve: E(t, 0.15, 0.26) * (1 - E(t, 0.72, 0.84)),
    rotY: -0.1 + Math.PI * 2 * E(t, 0.06, 0.93),
  });
  const dessinerB = () => {
    const { t, m, camera } = B;
    const s = etatB(t), e = s.eclate, mob = mobile();
    L.poserFlacon(m, { ...s, couleur: garrigue, nom: "Garrigue", temps: B.temps + t * 6 });
    L.cadrer(camera, mob
      ? { cx: 0.5, cy: lerp(0.56, 0.43, e), fr: lerp(0.44, 0.4, e), el: lerp(7, 13, e), refY: lerp(2.3, 1.55, e), refH: lerp(4.8, 4.7, e) }
      : { cx: 0.5, cy: lerp(0.535, 0.57, e), fr: lerp(0.47, 0.62, e), el: lerp(7, 13, e), refY: lerp(2.3, 1.55, e), refH: lerp(4.8, 4.7, e) }, B.W, B.H);
    B.r.render(m.scene, camera);
    // étiquettes HTML accrochées au bord de chaque couche (droite / gauche), à 16 px au moins des bords
    m.flacon.updateMatrixWorld(true);
    droite.set(1, 0, 0).applyQuaternion(camera.quaternion);
    notes.forEach((li, k) => {
      const i = +li.dataset.couche, cote = mob ? 1 : (i === 1 ? -1 : 1);
      const o = clamp((e - 0.55 - k * 0.08) / 0.22);
      li.style.opacity = o.toFixed(3);
      li.style.visibility = o > 0.01 ? "visible" : "hidden";
      // téléphone : les étiquettes forment une liste sous les couches (CSS), on ne fait que les allumer
      if (mob) { li.style.transform = `translate3d(0, ${((1 - o) * 10).toFixed(1)}px, 0)`; li.classList.remove("a-gauche"); return; }
      if (o <= 0) return;
      const c = m.couches[i];
      v.set(0, c.milieu, 0); c.g.localToWorld(v);
      v.addScaledVector(droite, cote * 1.45);
      v.project(camera);
      const x = (v.x * 0.5 + 0.5) * B.W, y = (-v.y * 0.5 + 0.5) * B.H;
      const lw = li.offsetWidth, lh = li.offsetHeight;
      const gx = clamp(cote > 0 ? x + 12 : x - lw - 12, 16, B.W - lw - 16);
      li.style.transform = `translate3d(${Math.round(gx)}px, ${Math.round(y - lh / 2)}px, 0)`;
      li.classList.toggle("a-gauche", cote < 0);
    });
    const of = seg(t, 0.9, 0.96);
    fin.style.opacity = of.toFixed(3);
    // pas de visibility: hidden : le bouton reste atteignable au clavier (le focus ramène la scène à sa fin)
    fin.style.pointerEvents = of > 0.5 ? "auto" : "none";
    fin.style.transform = `translate3d(0, ${((1 - of) * 16).toFixed(1)}px, 0)`;
  };

  /* ---------------------------------------------------------------- épinglages, selon le mouvement et la largeur */
  const mm = gsap.matchMedia();
  mm.add({ bureau: "(min-width: 768px)", tel: "(max-width: 767px)", reduit: "(prefers-reduced-motion: reduce)" }, (ctx) => {
    const { reduit, tel } = ctx.conditions;
    if (reduit) { root.classList.remove("scene-3d"); return () => root.classList.add("scene-3d"); }
    root.classList.add("scene-3d");
    const epingler = (sc, ecrans) => ScrollTrigger.create({
      trigger: sc.cadre.parentElement, start: "top top", end: () => `+=${ecrans * 100}%`,
      pin: sc.cadre, anticipatePin: 1, invalidateOnRefresh: true,
      onUpdate: (self) => { sc.t = self.progress; sc.sale = true; },
      onRefresh: (self) => { sc.t = self.progress; sc.mesurer(); },
    });
    const stA = epingler(A, tel ? 1.5 : 2);
    const stB = epingler(B, tel ? 1.2 : 1.5);
    // clavier : le bouton de fin de #notes ramène la scène à sa dernière image
    const auFocus = () => { if (B.t < 0.95) (window.gestes?.lenis ? window.gestes.lenis.scrollTo(stB.start + 0.97 * (stB.end - stB.start), { immediate: true }) : scrollTo(0, stB.start + 0.97 * (stB.end - stB.start))); };
    fin.addEventListener("focusin", auFocus);

    let dernier = performance.now();
    const boucle = () => {
      const maintenant = performance.now(), dt = Math.min(0.05, (maintenant - dernier) / 1000);
      dernier = maintenant;
      if (A.visible) {
        const bouge = !A.pause && A.t < 0.07;
        if (bouge) A.temps += dt;
        if (bouge || A.sale) { A.sale = false; dessinerA(); }
      }
      if (B.visible) {
        const bouge = !B.pause && etatB(B.t).eclate > 0.25;
        if (bouge) B.temps += dt;
        if (bouge || B.sale) { B.sale = false; dessinerB(); }
      }
    };
    gsap.ticker.add(boucle);
    ScrollTrigger.sort();
    ScrollTrigger.refresh();
    return () => { gsap.ticker.remove(boucle); fin.removeEventListener("focusin", auFocus); stA.kill(); stB.kill(); };
  });

  // l'objet arrive : l'affiche s'efface quand la première image 3D est posée
  A.mesurer(); B.mesurer();
  dessinerA(); dessinerB();
  A.cadre.classList.add("pret");
  gsap.fromTo(A.toile, { opacity: 0 }, { opacity: 1, duration: 0.9, ease: "power2.out" });
  addEventListener("resize", () => { A.mesurer(); B.mesurer(); });
  addEventListener("load", () => ScrollTrigger.refresh());
  window.cisteScene = { A, B };
}

await demarrer();
root.classList.remove("js-attente");
window.scenePrete = true;
