/*
 * Ciste — le moment signature : le vrai flacon, rendu dans Blender (Cycles), piloté au défilement.
 * Deux séquences d'images (outils/blender/sequences.py → images/sequences/…/f-0001.webp…), chacune sur un
 * canvas[data-sequence][data-frames] (convention du kit gestes.js), jouées par ce script :
 *
 *   #flacon (2 écrans, 1,5 sur téléphone) : le hero ; puis un tour complet par parfum (Restanque → Mistral →
 *            Centifolia → Nuitée), 24 images par tour. Le jus change de teinte pendant le tour, l'étiquette
 *            change de nom au dos (c'est dans les images). Le canvas glisse à droite ou à gauche pour le texte.
 *   #notes  (1,5 écran, 1,2 sur téléphone) : Garrigue, 44 images jouées à l'aller puis au retour. L'étiquette
 *            s'efface, le flacon se sépare en capot et trois godets (fond, cœur, tête) qui s'écartent, puis tout
 *            se referme et finit de face, étiquette lisible.
 *
 * Entre deux images, fondu de l'une sur l'autre : la rotation reste continue même en défilant lentement.
 * Les images sont dessinées « contain » dans le canvas, à la position et à la hauteur du cadrage, bords fondus
 * dans le fond de la section (même couleur que le studio).
 *
 * Règles GSAP suivies : gsap.matchMedia() pour le mouvement réduit et les points de rupture (tout est défait
 * quand la condition change), ScrollTrigger.create sans tween imbriqué, refresh() après chargement.
 * Mouvement réduit ou GSAP absent : la classe .scene-3d est retirée, les sections montrent les images fixes
 * (la première image de chaque séquence, face avant) et les fiches. Aucun WebGL nulle part.
 */
(() => {
  const root = document.documentElement;
  const { gsap, ScrollTrigger } = window;

  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, k) => a + (b - a) * k;
  const seg = (t, a, b) => clamp((t - a) / (b - a));
  const doux = (k) => k * k * (3 - 2 * k);
  const E = (t, a, b) => { const k = seg(t, a, b); return k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2; };
  const mobile = () => innerWidth < 768;

  const fixe = () => {
    root.classList.remove("scene-3d");
    root.classList.remove("js-attente");
    window.ScrollTrigger?.refresh();
    window.scenePrete = true;
  };
  if (!root.classList.contains("scene-3d") || !gsap || !ScrollTrigger) return fixe();

  /* ---------------------------------------------------------------- lecteur de séquence (canvas[data-sequence]) */
  // Première image tout de suite, les suivantes par lots de 6 quand la scène approche (petits serveurs épargnés).
  const lecteur = (cadre) => {
    const cv = cadre.querySelector("canvas[data-sequence]");
    const n = parseInt(cv.dataset.frames, 10);
    const url = (i) => cv.dataset.sequence.replace("{i}", String(i + 1).padStart(4, "0"));
    const images = new Array(n);
    const c = cv.getContext("2d");
    const L = { cv, n, f: 0, cadrage: { cx: 0.5, cy: 0.5, h: 0.7 }, W: 1, H: 1, sale: true };
    const pret = (im) => im && im.complete && im.naturalWidth;
    const charger = (i) => {
      if (images[i]) return images[i];
      const im = new Image();
      im.decoding = "async";
      im.onload = () => { L.sale = true; };
      im.src = url(i);
      return (images[i] = im);
    };
    const proche = (i, pas) => { for (let k = i; k >= 0 && k < n; k += pas) if (pret(images[k])) return images[k]; return null; };
    charger(0);
    let lance = false;
    L.toutCharger = () => {
      if (lance) return; lance = true;
      let i = 1;
      const lot = () => {
        const paquet = [];
        for (let k = 0; k < 6 && i < n; k++, i++) paquet.push(charger(i));
        if (i < n) Promise.all(paquet.map((im) => im.decode().catch(() => {}))).then(lot);
      };
      lot();
    };
    // masque : ellipse pleine au centre, bords qui retombent dans le fond de la section
    const masque = document.createElement("canvas"), tampon = document.createElement("canvas");
    let masqueTaille = "";
    L.mesurer = () => {
      const r = Math.min(devicePixelRatio || 1, 2);
      L.W = cadre.clientWidth; L.H = cadre.clientHeight;
      cv.width = L.cw = Math.round(L.W * r); cv.height = L.ch = Math.round(L.H * r);
      L.sale = true;
    };
    // image affichée : suit L.f pendant le défilement (fondu entre voisines = rotation continue) ; à l'arrêt, glisse
    // vers l'image entière la plus proche (deux images à 15° fondues l'une dans l'autre dédoublent l'étiquette)
    L.v = 0; L.bouge = 0; L.pose = true;
    L.dessiner = () => {
      if (performance.now() - L.bouge < 160) { L.v = L.f; L.pose = false; }
      else {
        const cible = Math.round(L.f), d = cible - L.v;
        L.v = Math.abs(d) < 0.02 || Math.abs(d) > 1 ? cible : L.v + d * 0.25;   // saut (chargement, ancre) : direct
        L.pose = L.v === cible;
      }
      const i0 = clamp(Math.floor(L.v), 0, n - 1), i1 = Math.min(n - 1, i0 + 1), k = L.v - i0;
      const a = pret(images[i0]) ? images[i0] : proche(i0, -1) || proche(i0, 1);
      if (!a) return false;
      const b = k > 0.02 && pret(images[i1]) ? images[i1] : null;
      const { cx, cy, h } = L.cadrage;
      const dh = h * cv.height, dw = dh * (a.naturalWidth / a.naturalHeight);
      const x = cx * cv.width - dw / 2, y = cy * cv.height - dh / 2;
      // l'image (et sa voisine en fondu) passe par un tampon masqué, puis se pose sur le fond
      const tw = Math.ceil(dw), th = Math.ceil(dh);
      if (tampon.width !== tw || tampon.height !== th) { tampon.width = tw; tampon.height = th; }
      if (masqueTaille !== tw + "x" + th) {
        masque.width = tw; masque.height = th; masqueTaille = tw + "x" + th;
        const m = masque.getContext("2d");
        m.save(); m.translate(tw / 2, th / 2); m.scale(1, th / tw);
        const g = m.createRadialGradient(0, 0, tw * 0.3, 0, 0, tw * 0.5);
        g.addColorStop(0, "#000"); g.addColorStop(1, "rgba(0,0,0,0)");
        m.fillStyle = g; m.fillRect(-tw, -tw, tw * 2, tw * 2); m.restore();
      }
      const t = tampon.getContext("2d");
      t.globalCompositeOperation = "source-over"; t.globalAlpha = 1;
      t.clearRect(0, 0, tw, th);
      t.drawImage(a, 0, 0, tw, th);
      if (b) { t.globalAlpha = k; t.drawImage(b, 0, 0, tw, th); t.globalAlpha = 1; }
      t.globalCompositeOperation = "destination-in"; t.drawImage(masque, 0, 0);
      c.clearRect(0, 0, cv.width, cv.height);
      c.drawImage(tampon, Math.round(x), Math.round(y));
      return true;
    };
    L.mesurer();
    return L;
  };

  /* ---------------------------------------------------------------- cadrage clé par clé : [t, cx, cy, h] */
  // h = hauteur de l'image / hauteur de l'écran ; le flacon occupe environ 63 % de l'image.
  const cadrage = (t, cles) => {
    let i = 0;
    while (i < cles.length - 2 && t > cles[i + 1][0]) i++;
    const a = cles[i], b = cles[i + 1], k = doux(seg(t, a[0], b[0]));
    return { cx: lerp(a[1], b[1], k), cy: lerp(a[2], b[2], k), h: lerp(a[3], b[3], k) };
  };
  const CLES_A = {
    bureau: [[0, 0.5, 0.5, 0.66], [0.09, 0.5, 0.5, 0.66], [0.17, 0.5, 0.5, 0.9], [0.235, 0.66, 0.5, 0.96],
      [0.43, 0.66, 0.5, 0.96], [0.5, 0.34, 0.5, 0.96], [0.68, 0.34, 0.5, 0.96], [0.75, 0.66, 0.5, 0.96], [1, 0.66, 0.5, 0.96]],
    mobile: [[0, 0.5, 0.46, 0.52], [0.09, 0.5, 0.46, 0.52], [0.18, 0.5, 0.33, 0.6], [1, 0.5, 0.33, 0.6]],
  };
  // trois tours, centrés sur ces moments du défilement (comme les textes data-in / data-out). Accélération en sinus
  // sur ±0,1 du pin : au plus ≈ 2 images par 1 % de défilement (un easing cubique sur ±0,075 montait à 6 : saccades).
  const TOURS = [0.2, 0.465, 0.715], DEMI = 0.1, PAS = 24;
  const sinus = (t, a, b) => (1 - Math.cos(Math.PI * seg(t, a, b))) / 2;

  const A = lecteur(document.querySelector('[data-scene="flacon"]'));
  const B = lecteur(document.querySelector('[data-scene="notes"]'));
  A.cadre = document.querySelector('[data-scene="flacon"]');
  B.cadre = document.querySelector('[data-scene="notes"]');
  A.t = 0; B.t = 0;

  /* ---------------------------------------------------------------- scène A : le hero et les quatre parfums */
  const momentsA = [...A.cadre.querySelectorAll(".moment")].map((el) => ({
    el,
    entree: el.dataset.in ? el.dataset.in.split(",").map(Number) : null,
    sortie: el.dataset.out ? el.dataset.out.split(",").map(Number) : null,
  }));
  const dessinerA = () => {
    const t = A.t;
    let f = 0;
    TOURS.forEach((c) => { f += PAS * sinus(t, c - DEMI, c + DEMI); });
    A.f = f;
    A.cadrage = cadrage(t, CLES_A[mobile() ? "mobile" : "bureau"]);
    const ok = A.dessiner();
    momentsA.forEach(({ el, entree, sortie }) => {
      let o = entree ? seg(t, entree[0], entree[1]) : 1;
      if (sortie) o *= 1 - seg(t, sortie[0], sortie[1]);
      el.style.opacity = o.toFixed(3);
      el.style.transform = `translate3d(0, ${((1 - o) * (entree && t < entree[1] ? 24 : -16)).toFixed(1)}px, 0)`;
      el.style.visibility = o > 0.01 ? "visible" : "hidden";
    });
    return ok;
  };

  /* ---------------------------------------------------------------- scène B : Garrigue se décompose */
  const notes = [...B.cadre.querySelectorAll(".note")];
  const fin = B.cadre.querySelector(".notes-fin");
  // où se trouve chaque couche sur la dernière image (fractions de l'image 720 × 900) : x du bord, y du milieu
  const ANCRES = { 0: [0.64, 0.76, 1], 1: [0.28, 0.64, -1], 2: [0.72, 0.51, 1] };
  const eclat = (t) => sinus(t, 0.06, 0.44) * (1 - sinus(t, 0.58, 0.94));   // sinus : au plus ≈ 2 images par 1 %
  const dessinerB = () => {
    const t = B.t, e = eclat(t), mob = mobile();
    B.f = e * (B.n - 1);
    B.cadrage = mob ? { cx: 0.5, cy: lerp(0.56, 0.47, e), h: lerp(0.6, 0.66, e) } : { cx: 0.5, cy: lerp(0.56, 0.58, e), h: lerp(0.74, 0.8, e) };
    const ok = B.dessiner();
    const { cx, cy, h } = B.cadrage;
    const ih = h * B.H, iw = ih * 0.8, x0 = cx * B.W - iw / 2, y0 = cy * B.H - ih / 2;
    notes.forEach((li, k) => {
      const o = clamp((e - 0.72 - k * 0.06) / 0.16);
      li.style.opacity = o.toFixed(3);
      li.style.visibility = o > 0.01 ? "visible" : "hidden";
      // téléphone : les notes forment une liste sous les couches (CSS), on ne fait que les allumer
      if (mob) { li.style.transform = `translate3d(0, ${((1 - o) * 10).toFixed(1)}px, 0)`; li.classList.remove("a-gauche"); return; }
      const [ax, ay, cote] = ANCRES[li.dataset.couche];
      const x = x0 + ax * iw, y = y0 + ay * ih;
      const lw = li.offsetWidth, lh = li.offsetHeight;
      const gx = clamp(cote > 0 ? x + 12 : x - lw - 12, 16, B.W - lw - 16);
      li.style.transform = `translate3d(${Math.round(gx)}px, ${Math.round(y - lh / 2 + (1 - o) * 10)}px, 0)`;
      li.classList.toggle("a-gauche", cote < 0);
    });
    const of = seg(t, 0.9, 0.96);
    fin.style.opacity = of.toFixed(3);
    // pas de visibility: hidden : le bouton reste atteignable au clavier (le focus ramène la scène à sa fin)
    fin.style.pointerEvents = of > 0.5 ? "auto" : "none";
    fin.style.transform = `translate3d(0, ${((1 - of) * 16).toFixed(1)}px, 0)`;
    return ok;
  };

  /* ---------------------------------------------------------------- épinglages, selon le mouvement et la largeur */
  const mm = gsap.matchMedia();
  mm.add({ bureau: "(min-width: 768px)", tel: "(max-width: 767px)", reduit: "(prefers-reduced-motion: reduce)" }, (ctx) => {
    const { reduit, tel } = ctx.conditions;
    if (reduit) { root.classList.remove("scene-3d"); return () => root.classList.add("scene-3d"); }
    root.classList.add("scene-3d");
    A.mesurer(); B.mesurer();
    const epingler = (sc, ecrans) => ScrollTrigger.create({
      trigger: sc.cadre.parentElement, start: "top top", end: () => `+=${ecrans * 100}%`,
      pin: sc.cadre, anticipatePin: 1, invalidateOnRefresh: true,
      onUpdate: (self) => { sc.t = self.progress; sc.sale = true; sc.bouge = performance.now(); },
      onRefresh: (self) => { sc.t = self.progress; sc.mesurer(); },
    });
    const stA = epingler(A, tel ? 1.5 : 2);
    const stB = epingler(B, tel ? 1.2 : 1.5);
    // les images suivantes se chargent quand la scène approche (la première est déjà là)
    const approche = (L, st) => ScrollTrigger.create({ trigger: st.trigger, start: "top 250%", onEnter: L.toutCharger, onEnterBack: L.toutCharger });
    const prA = approche(A, stA), prB = approche(B, stB);
    if (scrollY < 10) A.toutCharger();
    // clavier : le bouton de fin de #notes ramène la scène à sa dernière image
    const auFocus = () => { if (B.t < 0.95) (window.gestes?.lenis ? window.gestes.lenis.scrollTo(stB.start + 0.97 * (stB.end - stB.start), { immediate: true }) : scrollTo(0, stB.start + 0.97 * (stB.end - stB.start))); };
    fin.addEventListener("focusin", auFocus);
    const boucle = () => {
      // gestes.js prépare aussi les canvas[data-sequence] et peut les redimensionner à sa première image
      [A, B].forEach((L) => { if (L.cv.width !== L.cw || L.cv.height !== L.ch) L.mesurer(); if (!L.pose) L.sale = true; });
      if (A.sale) A.sale = !dessinerA();
      if (B.sale) B.sale = !dessinerB();
    };
    gsap.ticker.add(boucle);
    ScrollTrigger.sort();
    ScrollTrigger.refresh();
    return () => { gsap.ticker.remove(boucle); fin.removeEventListener("focusin", auFocus); stA.kill(); stB.kill(); prA.kill(); prB.kill(); };
  });

  // l'affiche (première image) laisse la place au canvas quand celui-ci a dessiné
  const montrer = () => {
    if (!dessinerA()) return requestAnimationFrame(montrer);
    A.cadre.classList.add("pret");
  };
  montrer();
  addEventListener("resize", () => { A.mesurer(); B.mesurer(); });
  addEventListener("load", () => ScrollTrigger.refresh());
  window.cisteScene = { A, B };
  root.classList.remove("js-attente");
  window.scenePrete = true;
})();
