/*
 * Pétille — fil rouge 3D de la page (Three.js r158, copie locale vendor/three.min.js).
 *
 * Un seul canevas WebGL fixe (.toile-3d), sans clic, au-dessus du contenu. Chaque section déclare un
 * emplacement vide [data-slot="…"] (aplat de couleur). L'objet se place dans l'emplacement le plus visible,
 * et le canevas est découpé (clip-path) sur ce seul rectangle : l'objet ne passe jamais sur un texte ni un
 * bouton. En changeant d'emplacement, il glisse de l'un vers l'autre (amorti), découpé par le nouveau.
 *
 *   hero      le flacon, grand, incliné          principe   il passe sur le côté, de trois quarts
 *   boutique  couleur de la fiche survolée / visible
 *   methode   séquence épinglée en 5 temps, pilotée par les barres de gestes.js (scrub, réversible) :
 *             ouvrir, remplir au robinet, pastille + effervescence, refermer, pschitt puis de face
 *   flacon    de face, il tourne à la main ; pastilles de couleur = recharge
 *   offre     le kit s'ouvre, 4 pastilles colorées flottent       final  de face, logo lisible
 *
 * Mouvement réduit : pas d'animation ; on rend une image fixe par section (et les 5 temps de la
 * méthode en vignettes) à la place des photos. Sans WebGL ou sans Three.js : les photos restent.
 * Téléphone : objet plus petit, DPR 1,5 au plus. Onglet caché ou aucun emplacement visible : pas de rendu.
 * Three.js est chargé après le premier affichage (requestIdleCallback), jamais avant le contenu.
 */
(() => {
  const reduit = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const lancer = () => {
    if (window.THREE) return init();
    const s = document.createElement("script");
    s.src = "vendor/three.min.js"; s.async = true; s.onload = init; // échec : les photos restent
    document.head.appendChild(s);
  };
  const quandPret = () => ("requestIdleCallback" in window ? requestIdleCallback(lancer, { timeout: 1500 }) : setTimeout(lancer, 300));
  if (document.readyState === "complete") quandPret(); else addEventListener("load", quandPret, { once: true });

  function init() {
    const T = window.THREE;
    if (!T || !T.MeshPhysicalMaterial) return;
    const canvas = document.createElement("canvas");
    canvas.className = "toile-3d"; canvas.setAttribute("aria-hidden", "true");
    let renderer;
    try {
      const gl = canvas.getContext("webgl2", { antialias: true, alpha: true, preserveDrawingBuffer: reduit });
      if (!gl) return;
      renderer = new T.WebGLRenderer({ canvas, context: gl, antialias: true, alpha: true });
    } catch { return; }
    const mobile = matchMedia("(max-width: 767px)").matches;
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, mobile ? 1.5 : 1.75));
    renderer.outputColorSpace = T.SRGBColorSpace;
    renderer.toneMapping = T.NoToneMapping;
    renderer.setClearColor(0x000000, 0);

    // ------------------------------------------------------------ scène, lumière trois points, reflets
    const scene = new T.Scene();
    const camera = new T.PerspectiveCamera(24, 1, 0.1, 100);
    camera.position.set(0, 0, 16);
    let cam = camera; // caméra utilisée par poser() : la visible, ou celle des rendus fixes
    const pmrem = new T.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(studio(T), 0.035).texture;
    const cle = new T.DirectionalLight(0xffffff, 2.4); cle.position.set(4, 5, 6);
    const remplissage = new T.DirectionalLight(0xdfe9ff, 0.8); remplissage.position.set(-5, 1, 4);
    const contre = new T.DirectionalLight(0xffffff, 2.2); contre.position.set(-1, 4, -6);
    scene.add(cle, remplissage, contre, new T.HemisphereLight(0xffffff, 0x445566, 0.35));

    // Fond : un aplat de la couleur de l'emplacement (le verre le réfracte), et une ombre douce au sol.
    const fondMat = new T.MeshBasicMaterial({ color: 0x2346c8, toneMapped: false });
    const fond = new T.Mesh(new T.PlaneGeometry(400, 400), fondMat); fond.position.z = -6; scene.add(fond);
    const racine = new T.Group(); scene.add(racine);
    const ombre = new T.Mesh(new T.PlaneGeometry(1, 1), new T.MeshBasicMaterial({ map: degrade(T), color: 0x000000, transparent: true, opacity: 0.32, depthWrite: false, toneMapped: false }));
    ombre.scale.set(2.6, 0.55, 1); ombre.position.set(0, -1.93, -1.2); ombre.renderOrder = -1; racine.add(ombre);

    const M = construireFlacon(T);
    racine.add(M.flacon);
    const kit = construireKit(T, M); racine.add(kit.groupe);
    const eau = construireEau(T); M.flacon.add(eau.filet);

    // ------------------------------------------------------------ emplacements
    const RECH = {
      multi: { liquide: "#FFC21A", fond: "#2346C8", nom: "Multi-surfaces" },
      vaisselle: { liquide: "#1FC77A", fond: "#FF5C9A", nom: "Vaisselle" },
      sols: { liquide: "#7B5CFF", fond: "#FFC21A", nom: "Sols" },
      sdb: { liquide: "#FF5C9A", fond: "#1FC77A", nom: "Salle de bain" },
    };
    let rechargeFlacon = "multi";
    let survolee = null;
    document.querySelectorAll(".fiche").forEach((f) => {
      const v = f.querySelector("[data-slot]");
      const r = RECH[f.dataset.produit] || RECH.multi;
      v.style.setProperty("--aplat", r.fond); v.dataset.recharge = f.dataset.produit;
      f.addEventListener("pointerenter", () => { survolee = v; reveiller(); });
      f.addEventListener("pointerleave", () => { if (survolee === v) survolee = null; reveiller(); });
      f.addEventListener("focusin", () => { survolee = v; reveiller(); });
    });
    const sceneFlacon = document.querySelector("[data-flacon-3d]");

    const POSES = {
      hero: { remplir: mobile ? 0.97 : 0.9, rotY: -0.12, rotZ: -0.16, rotX: 0.08 },
      principe: { remplir: 0.8, rotY: 0.15, rotZ: 0.04, rotX: 0.05 },
      boutique: { remplir: 0.8, rotY: -0.1, rotZ: 0, rotX: 0.06 },
      methode: { remplir: 0.72, rotY: 0, rotZ: 0, rotX: 0.1 },
      flacon: { remplir: 0.84, rotY: 0, rotZ: 0, rotX: 0.04 },
      offre: { remplir: 0.86, rotY: -0.22, rotZ: 0, rotX: 0.14 },
      final: { remplir: 0.84, rotY: 0, rotZ: 0, rotX: 0.04 },
    };
    const emplacements = () => Array.from(document.querySelectorAll("[data-slot]")).filter((e) => e.offsetWidth > 20 && e.offsetHeight > 20);

    // opacité effective (les sections qui s'effacent, comme le héros épinglé, effacent l'objet aussi)
    const opaciteDe = (el) => { let o = 1; for (let e = el; e && e !== document.body; e = e.parentElement) { if (e.closest("[data-hero-fade]")) continue; /* le flacon reste pendant l'épinglage du héros */ const cs = getComputedStyle(e); if (cs.visibility === "hidden" || cs.display === "none") return 0; o *= +cs.opacity; } return o; };

    const choisir = (actuel) => {
      const W = innerWidth, H = innerHeight;
      let meilleur = null, score = 0, scoreActuel = 0;
      for (const el of emplacements()) {
        const r = el.getBoundingClientRect();
        const vis = Math.max(0, Math.min(r.right, W) - Math.max(r.left, 0)) * Math.max(0, Math.min(r.bottom, H) - Math.max(r.top, 0));
        const part = vis / (r.width * r.height);
        if (part < 0.3) continue;
        const dx = Math.abs((r.left + r.right) / 2 - W / 2) / W;
        let s = vis * (1 - 0.6 * dx) * (el === survolee ? 3 : 1);
        if (el.dataset.slot === "methode") s *= 2;
        if (el === actuel) scoreActuel = s;
        if (s > score) { score = s; meilleur = el; }
      }
      if (actuel && scoreActuel > 0 && score < scoreActuel * 1.2) return actuel; // hystérésis
      return meilleur;
    };

    // ------------------------------------------------------------ état animé
    const etat = { x: 0, y: 0, ox: 0, oy: 0, s: 0, bascule: false, rotY: 0, rotZ: 0, rotX: 0, couleur: new T.Color("#FFC21A"), ouvert: 0, vu: 0 };
    let actif = null, poseNom = null, premier = true, glisse = 0, vitesse = 0, enMain = false;
    const ciblePx = { cx: 0, cy: 0, w: 0, h: 0 };

    const phaseMethode = () => {
      const sec = document.getElementById("methode");
      const barres = sec.querySelectorAll("[data-step-bar]");
      let p = 0;
      barres.forEach((b) => { const m = getComputedStyle(b).transform; p += m === "none" ? 0 : Math.min(1, Math.max(0, new DOMMatrix(m).a)); });
      return p; // 0 … 5, continu, suit le scrub dans les deux sens
    };

    const couleurCible = (nom, el) => {
      if (nom === "boutique") return RECH[el.dataset.recharge]?.liquide || "#FFC21A";
      if (nom === "flacon" || nom === "final") return RECH[rechargeFlacon].liquide;
      return "#FFC21A";
    };

    let derniere = performance.now(), raf = 0, temps = 0, arrivee = -1e9;
    function image(now) {
      raf = 0;
      const dt = Math.max(0, Math.min(0.05, (now - derniere) / 1000)); derniere = Math.max(derniere, now); temps += dt;
      const el = choisir(actif);
      if (el !== actif) {
        // Changement de carte : l'ancienne reprend aussitôt son image fixe ; la nouvelle garde la sienne
        // pendant que le direct apparaît par-dessus en fondu (250 ms), l'objet déjà en place, jamais tranché.
        const voisine = actif && el && actif.dataset.slot === "boutique" && el.dataset.slot === "boutique";
        actif?.classList.remove("slot-actif");
        if (el) { premier = true; arrivee = voisine ? -1e9 : now; }
        actif = el;
        if (el && el.dataset.slot === "final" && poseNom !== "final") { glisse = 0; vitesse = 0; } // le final repart de face
        if (el) { poseNom = el.dataset.slot; fondMat.color.setStyle(getComputedStyle(el).getPropertyValue("--aplat").trim() || getComputedStyle(el).backgroundColor); }
      }
      if (!actif) { canvas.style.opacity = "0"; return; }
      const r = actif.getBoundingClientRect();
      const o = opaciteDe(actif);
      const entree = Math.min(1, Math.max(0, (now - arrivee) / 250));
      canvas.style.opacity = String(o * entree);
      if (entree >= 1) actif.classList.add("slot-actif");
      if (o < 0.02) { if (!document.hidden) raf = requestAnimationFrame(image); return; }
      const W = innerWidth, H = innerHeight;
      poser(poseNom, r, dt, now);
      fond.visible = true; ombre.visible = true;
      const rayon = parseFloat(getComputedStyle(actif).borderTopLeftRadius) || 0;
      canvas.style.clipPath = `inset(${Math.max(0, r.top)}px ${Math.max(0, W - r.right)}px ${Math.max(0, H - r.bottom)}px ${Math.max(0, r.left)}px round ${rayon}px)`;
      rendre(r);
      canvas.dataset.vol = entree < 1 ? "1" : "0";
      if (!document.hidden) raf = requestAnimationFrame(image);
    }
    const reveiller = () => { if (!raf && !document.hidden && !reduit) { derniere = performance.now(); raf = requestAnimationFrame(image); } };

    function rendre(r) { // r : rectangle découpé (écran)
      const W = innerWidth, H = innerHeight;
      if (canvas.width !== Math.round(W * renderer.getPixelRatio()) || canvas.height !== Math.round(H * renderer.getPixelRatio())) {
        renderer.setSize(W, H, false); camera.aspect = W / H; camera.updateProjectionMatrix();
      }
      const x0 = Math.max(0, r.left), y0 = Math.max(0, r.top), x1 = Math.min(W, r.right), y1 = Math.min(H, r.bottom);
      renderer.setScissorTest(true);
      renderer.setScissor(x0, H - y1, Math.max(1, x1 - x0), Math.max(1, y1 - y0));
      renderer.setViewport(0, 0, W, H);
      renderer.render(scene, camera);
    }

    // Place l'objet au centre de l'emplacement : conversion pixels -> unités du monde (plan z = 0).
    const amortir = (a, b, k, dt) => a + (b - a) * (1 - Math.exp(-k * dt));
    function poser(nom, r, dt, now) {
      const P = POSES[nom] || POSES.hero;
      const W = innerWidth, H = innerHeight;
      const hMonde = 2 * cam.position.z * Math.tan((cam.fov * Math.PI) / 360), k = hMonde / H;
      const HAUT = nom === "offre" ? 3.0 : 4.45, LARGE = nom === "offre" ? 3.6 : 2.0;
      const remplir = P.remplir * (mobile && nom !== "hero" ? 0.9 : 1);
      const s = Math.min((r.height * remplir * k) / HAUT, (r.width * 0.86 * k) / LARGE);
      const cx = ((r.left + r.width / 2) / W - 0.5) * hMonde * cam.aspect;
      const cy = -((r.top + r.height / 2) / H - 0.5) * hMonde;
      const centreLocal = nom === "offre" ? 0.38 : 0.28;
      const tx = cx, ty = cy - centreLocal * s;
      // position = cible de l'emplacement + décalage amorti : aucun retard pendant le défilement,
      // glissement seulement au changement d'emplacement.
      if (premier) { etat.ox = etat.oy = 0; etat.s = s; premier = false; etat.bascule = false; }
      if (etat.bascule) { etat.ox = etat.x - tx; etat.oy = etat.y - ty; etat.bascule = false; }
      const kPos = 7;
      etat.ox = amortir(etat.ox, 0, kPos, dt); etat.oy = amortir(etat.oy, 0, kPos, dt); etat.s = amortir(etat.s, s, kPos, dt);
      etat.x = tx + etat.ox; etat.y = ty + etat.oy;
      racine.position.set(etat.x, etat.y, 0); racine.scale.setScalar(etat.s);
      const enVol = Math.hypot(etat.ox, etat.oy) / k > 2 || Math.abs(etat.s - s) / s > 0.02;
      let vol = null;
      if (enVol) {
        const px = (etat.x / (hMonde * cam.aspect) + 0.5) * W, py = (0.5 - (etat.y + centreLocal * etat.s) / hMonde) * H;
        const dx = (LARGE * etat.s) / k * 0.75, dy = (HAUT * etat.s) / k * 0.62;
        vol = { left: px - dx, right: px + dx, top: py - dy, bottom: py + dy };
      }

      const t = temps;
      let rotY = P.rotY, rotZ = P.rotZ, rotX = P.rotX;
      if (nom === "hero") rotY += Math.sin(t * 0.5) * 0.06;
      if (nom === "principe" || nom === "boutique") rotY += Math.sin(t * 0.6) * 0.05;
      if (nom === "flacon" || nom === "final") {
        if (!enMain) { glisse += vitesse; vitesse *= 0.88; if (Math.abs(vitesse) < 0.01) vitesse = 0; glisse = amortir(glisse, Math.round(glisse / (Math.PI * 2)) * Math.PI * 2, 4, dt); } // revient toujours de face
        rotY = glisse + Math.sin(t * 0.7) * 0.05;
      }
      etat.rotY = amortir(etat.rotY, rotY, 5, dt); etat.rotZ = amortir(etat.rotZ, rotZ, 5, dt); etat.rotX = amortir(etat.rotX, rotX, 5, dt);
      racine.rotation.set(etat.rotX, 0, etat.rotZ);
      M.flacon.rotation.y = etat.rotY;
      M.flacon.position.y = nom === "methode" || nom === "offre" ? 0 : Math.sin(t * 1.1) * 0.04;

      const estKit = nom === "offre";
      M.flacon.visible = !estKit; kit.groupe.visible = estKit;
      ombre.scale.set(estKit ? 4.2 : 2.6, estKit ? 0.7 : 0.55, 1); ombre.position.y = estKit ? -1.0 : -1.93;
      etat.ouvert = estKit ? Math.min(1, etat.ouvert + dt * 0.9) : 0;
      if (estKit) kit.animer(etat.ouvert, t);

      if (nom === "methode") { M.sequence(phaseMethode(), t, eau); etat.couleur.set("#FFC21A"); return vol; } // sort de la méthode déjà jaune
      M.repos(t);
      eau.cacher();
      etat.couleur.lerpHSL(new T.Color(couleurCible(nom, actif)), 1 - Math.exp(-9 * dt)); // teinte à teinte, jamais par le brun
      M.teinter(etat.couleur, nom === "boutique" ? RECH[actif.dataset.recharge]?.nom : RECH[nom === "flacon" || nom === "final" ? rechargeFlacon : "multi"].nom);
      return vol;
    }

    document.body.appendChild(canvas);

    // ------------------------------------------------------------ images fixes rendues par la 3D
    // Chaque cadre garde une seule nature d'image : l'emplacement actif est en direct, tous les autres
    // montrent une image fixe du même modèle (jamais une photo réelle, jamais un aplat vide).
    // Moteur à part, sur un canevas hors document : le canevas visible, son moteur et sa caméra ne sont
    // jamais touchés par un rendu fixe (aucun saut du flacon en direct).
    let fixe = null, envFixe = null;
    const moteurFixe = () => {
      if (fixe) return fixe;
      fixe = new T.WebGLRenderer({ canvas: document.createElement("canvas"), antialias: true, alpha: true, preserveDrawingBuffer: true });
      fixe.outputColorSpace = T.SRGBColorSpace; fixe.toneMapping = T.NoToneMapping; fixe.setClearColor(0x000000, 0);
      envFixe = new T.PMREMGenerator(fixe).fromScene(studio(T), 0.035).texture;
      return fixe;
    };
    const photo = (nom, el, phase) => {
      const R2 = moteurFixe();
      const r = { left: 0, top: 0, width: el.offsetWidth || 400, height: el.offsetHeight || 500 };
      r.right = r.width; r.bottom = r.height;
      const W = Math.round(r.width), H = Math.round(r.height);
      R2.setPixelRatio(mobile ? 1.25 : 1.4); R2.setSize(W, H, false);
      const cam2 = camera.clone(); cam2.aspect = W / H; cam2.updateProjectionMatrix();
      const envDirect = scene.environment, sauve = { innerWidth, innerHeight };
      cam = cam2; scene.environment = envFixe;
      premier = true; temps = 0; actif = el; fond.visible = true; ombre.visible = true;
      fondMat.color.setStyle(getComputedStyle(el).getPropertyValue("--aplat").trim() || "#2346C8");
      Object.defineProperty(window, "innerWidth", { value: W, configurable: true });
      Object.defineProperty(window, "innerHeight", { value: H, configurable: true });
      try {
        if (nom === "methode") { poser("methode", r, 1, 0); M.sequence(phase, 0, eau); }
        else { etat.ouvert = 1; etat.couleur.set(couleurCible(nom, el)); poser(nom, r, 1, 0); }
        R2.render(scene, cam2);
      } finally {
        cam = camera; scene.environment = envDirect;
        Object.defineProperty(window, "innerWidth", { value: sauve.innerWidth, configurable: true });
        Object.defineProperty(window, "innerHeight", { value: sauve.innerHeight, configurable: true });
      }
      return R2.domElement.toDataURL("image/webp", 0.86);
    };
    const remplacer = (img, url, alt) => { if (!img) return; img.removeAttribute("srcset"); img.removeAttribute("sizes"); img.src = url; if (alt) img.alt = alt; };
    const ALT = {
      principe: "Le flacon Pétille en verre, rempli de nettoyant jaune, de trois quarts.",
      offre: "Le kit de départ : quatre flacons en verre et une enveloppe kraft d'où sortent quatre pastilles de couleur.",
      flacon: "Le flacon Pétille en verre, rempli de recharge multi-surfaces, logo de face.",
    };
    const textes = ["Étape 1 : la gâchette est dévissée et soulevée.", "Étape 2 : l'eau du robinet monte jusqu'au trait gravé.", "Étape 3 : la pastille tombe et pétille, l'eau prend la couleur.", "Étape 4 : la gâchette est revissée.", "Étape 5 : un pschitt, le flacon est prêt, de face."];
    // Rendus fixes à la demande : seulement les cadres à moins d'un écran de la vue (IntersectionObserver),
    // un par moment libre. Les fiches et le kit suivent ensuite (vignettes du panier).
    const images = (window.petilleImages = window.petilleImages || {});
    const publier = (cle, url) => { images[cle] = url; document.dispatchEvent(new CustomEvent("petille:image", { detail: cle })); };
    const avecSauvegarde = (fn) => {
      const s0 = { actif, premier, temps, poseNom, etat: { ...etat, couleur: etat.couleur.clone() }, fond: fondMat.color.clone() };
      const url = fn();
      actif = s0.actif; premier = s0.premier; temps = s0.temps; poseNom = s0.poseNom;
      Object.assign(etat, s0.etat); fondMat.color.copy(s0.fond);
      return url;
    };
    const travaux = [], taches = new Map();
    const ajouterTache = (el) => { const f = taches.get(el); if (f) { taches.delete(el); travaux.push(f); lancer(); } };
    document.documentElement.classList.add("images-3d"); // emplacements héros et final affichés avant le rendu
    emplacements().forEach((el) => {
      const nom = el.dataset.slot;
      if (nom === "methode") return;
      taches.set(el, () => {
        const url = photo(nom, el);
        if (nom === "hero" || nom === "final") { el.style.backgroundImage = `url(${url})`; el.style.backgroundSize = "cover"; return; }
        if (nom === "boutique") { remplacer(el.querySelector("img"), url, `Le flacon Pétille en verre, rempli de recharge ${RECH[el.dataset.recharge].nom.toLowerCase()}.`); el.style.background = "var(--aplat)"; publier(el.dataset.recharge, url); return; }
        remplacer(el.querySelector("img"), url, ALT[nom]);
        if (!el.matches("[data-image-reveal]")) el.style.background = "var(--aplat)"; // pas d'aplat nu avant le dévoilement
        if (nom === "offre") publier("kit", url);
      });
    });
    const medias = document.querySelector("#methode .steps-medias");
    if (medias) taches.set(medias, () => document.querySelectorAll("#methode [data-step-media]").forEach((m, i) => {
      const cible = m.offsetWidth > 20 ? m : medias;
      m.style.setProperty("--aplat", "#2346C8"); m.style.background = "#2346C8";
      remplacer(m.querySelector("img"), photo("methode", cible, [0.85, 1.75, 2.62, 3.85, 4.4][i]), textes[i]);
    }));
    // comparatif : le vrai flacon qui vaporise (rendu fixe du temps 5), plus l'ancienne photo
    const figComp = document.querySelector("#comparatif figure");
    if (figComp) taches.set(figComp, () => {
      figComp.style.setProperty("--aplat", "#1FC77A");
      remplacer(figComp.querySelector("img"), photo("methode", figComp, 4.55), "Le flacon Pétille en verre, rempli de nettoyant jaune : un pschitt, une brume fine sort du bec.");
    });
    const libre = window.requestIdleCallback || ((f) => setTimeout(f, 16));
    let enCours = false;
    const suivant = () => {
      const t = travaux.shift();
      if (!t) { enCours = false; document.documentElement.dataset.rendusFixes = taches.size ? "attente" : "fini"; return; }
      try { avecSauvegarde(t); } catch (e) { console.error("rendu fixe", e); }
      libre(suivant, { timeout: 300 });
    };
    function lancer() { if (!enCours) { enCours = true; document.documentElement.dataset.rendusFixes = "en-cours"; libre(suivant, { timeout: 300 }); } }
    const proche = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { proche.unobserve(e.target); ajouterTache(e.target); } }), { rootMargin: "100% 0px 100% 0px" });
    taches.forEach((_, el) => proche.observe(el));
    // vignettes du panier : fiches et kit dès que la page est calme
    setTimeout(() => document.querySelectorAll('[data-slot="boutique"], [data-slot="offre"]').forEach((el) => { proche.unobserve(el); ajouterTache(el); }), 4000);

    if (reduit) { canvas.remove(); renderer.dispose(); return; }

    // ------------------------------------------------------------ section #flacon : glisser, recharges
    if (sceneFlacon) {
      sceneFlacon.classList.add("est-3d");
      const zone = sceneFlacon.querySelector("[data-scene]");
      zone.setAttribute("role", "img");
      const dire = () => zone.setAttribute("aria-label", `Le flacon Pétille en verre, rempli de recharge ${RECH[rechargeFlacon].nom.toLowerCase()}, logo de face.`);
      dire();
      let x = null;
      zone.addEventListener("pointerdown", (e) => { enMain = true; x = e.clientX; zone.setPointerCapture(e.pointerId); sceneFlacon.classList.add("tire"); reveiller(); });
      zone.addEventListener("pointermove", (e) => { if (x === null) return; const d = (e.clientX - x) * 0.012; glisse += d; vitesse = d * 0.5; x = e.clientX; reveiller(); });
      const lacher = () => { x = null; enMain = false; vitesse = Math.max(-0.08, Math.min(0.08, vitesse)); sceneFlacon.classList.remove("tire"); };
      zone.addEventListener("pointerup", lacher); zone.addEventListener("pointercancel", lacher); zone.addEventListener("lostpointercapture", lacher);
      sceneFlacon.querySelectorAll("[data-recharge-3d]").forEach((b) => b.addEventListener("click", () => {
        sceneFlacon.querySelectorAll("[data-recharge-3d]").forEach((y) => y.setAttribute("aria-pressed", String(y === b)));
        rechargeFlacon = b.getAttribute("data-recharge-3d") in RECH ? b.getAttribute("data-recharge-3d") : "multi";
        zone.style.setProperty("--fond-3d", RECH[rechargeFlacon].fond);
        zone.style.setProperty("--aplat", RECH[rechargeFlacon].fond);
        fondMat.color.setStyle(RECH[rechargeFlacon].fond);
        vitesse = 0.09; dire(); reveiller();
      }));
      zone.style.setProperty("--aplat", RECH.multi.fond);
    }

    document.documentElement.classList.add("avec-3d");
    addEventListener("scroll", reveiller, { passive: true });
    addEventListener("resize", reveiller);
    addEventListener("pointermove", reveiller, { passive: true });
    document.addEventListener("visibilitychange", () => { if (document.hidden) { cancelAnimationFrame(raf); raf = 0; } else reveiller(); });
    if (document.fonts) document.fonts.ready.then(() => { M.teinter(etat.couleur, "Multi-surfaces", true); reveiller(); });
    // le défilement doux (Lenis) et les épinglages bougent sans événement « scroll » à chaque image
    setInterval(reveiller, 250);
    reveiller();
    window.petille3d = { phaseMethode, actif: () => actif?.dataset.slot || null, _d: { racine, M, etat, camera } };
  }

  // ================================================================ modèles
  function studio(T) {
    // Petite « RoomEnvironment » : une pièce claire, deux boîtes à lumière et un bandeau.
    const s = new T.Scene();
    const salle = new T.Mesh(new T.BoxGeometry(10, 8, 10), new T.MeshBasicMaterial({ color: 0x5c6466, side: T.BackSide }));
    s.add(salle);
    const lampe = (w, h, x, y, z, ry, f) => { const m = new T.Mesh(new T.PlaneGeometry(w, h), new T.MeshBasicMaterial({ color: new T.Color(f, f, f), side: T.DoubleSide })); m.position.set(x, y, z); m.rotation.y = ry; s.add(m); };
    lampe(2.2, 4.5, -4.9, 0.5, 1, Math.PI / 2, 9);
    lampe(1.2, 3.5, 4.9, 0.8, -1.5, -Math.PI / 2, 5);
    const haut = new T.Mesh(new T.PlaneGeometry(5, 3), new T.MeshBasicMaterial({ color: new T.Color(3, 3, 3), side: T.DoubleSide }));
    haut.rotation.x = Math.PI / 2; haut.position.y = 3.95; s.add(haut);
    const sol = new T.Mesh(new T.PlaneGeometry(10, 10), new T.MeshBasicMaterial({ color: 0x2a2f30, side: T.DoubleSide }));
    sol.rotation.x = -Math.PI / 2; sol.position.y = -3.95; s.add(sol);
    return s;
  }

  function degrade(T) {
    const c = document.createElement("canvas"); c.width = c.height = 128;
    const x = c.getContext("2d"), g = x.createRadialGradient(64, 64, 0, 64, 64, 64);
    g.addColorStop(0, "rgba(255,255,255,1)"); g.addColorStop(0.5, "rgba(255,255,255,.45)"); g.addColorStop(1, "rgba(255,255,255,0)");
    x.fillStyle = g; x.fillRect(0, 0, 128, 128);
    return new T.CanvasTexture(c);
  }

  function bezier(p0, p1, p2, p3, n) {
    const out = [];
    for (let i = 1; i <= n; i++) {
      const t = i / n, u = 1 - t;
      out.push([u * u * u * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t * t * t * p3[0], u * u * u * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t * t * t * p3[1]]);
    }
    return out;
  }
  const arc = (cx, cy, r, a0, a1, n) => Array.from({ length: n + 1 }, (_, i) => { const a = a0 + ((a1 - a0) * i) / n; return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; });

  function texturePastille(T) {
    const c = document.createElement("canvas"); c.width = c.height = 256;
    const x = c.getContext("2d"); x.fillStyle = "#fff"; x.fillRect(0, 0, 256, 256);
    for (let i = 0; i < 2600; i++) { const v = 200 + Math.random() * 55; x.fillStyle = `rgb(${v},${v},${v})`; x.fillRect(Math.random() * 256, Math.random() * 256, 1 + Math.random() * 2, 1 + Math.random() * 2); }
    const t = new T.CanvasTexture(c); t.colorSpace = T.SRGBColorSpace; t.wrapS = t.wrapT = T.RepeatWrapping;
    return t;
  }
  function geoPastille(T) {
    // disque bombé : tranche arrondie, deux faces en dôme, chanfrein
    const pts = [[0, -0.075], ...arc(0, -0.2, 0.125, Math.PI / 2, Math.PI / 2 - 0.9, 8).map(([x, y]) => [x * 1.45, y]).filter(([x]) => x < 0.17), ...arc(0.17, 0, 0.045, -Math.PI / 2, Math.PI / 2, 10), [0.12, 0.072], [0.06, 0.08], [0, 0.082]];
    return new T.LatheGeometry(pts.map(([x, y]) => new T.Vector2(Math.max(0, x), y)), 48);
  }

  function construireFlacon(T) {
    const flacon = new T.Group();
    // Profil Boston, verre épais : extérieur en montant, intérieur en descendant.
    const ext = [[0, -1.86], [0.48, -1.86], ...arc(0.5, -1.72, 0.125, -Math.PI / 2, 0, 10), [0.625, 0.55], ...bezier([0.625, 0.55], [0.625, 1.02], [0.33, 1.08], [0.255, 1.26], 18), [0.255, 1.36], [0.272, 1.38], [0.272, 1.43], [0.255, 1.45], [0.255, 1.5], [0.272, 1.52], [0.272, 1.57], [0.245, 1.6], [0.215, 1.6]];
    const int = [[0.208, 1.58], [0.208, 1.28], ...bezier([0.208, 1.28], [0.29, 1.1], [0.58, 1.02], [0.582, 0.55], 18), [0.582, -1.66], ...arc(0.47, -1.66, 0.112, 0, -Math.PI / 2, 8), [0, -1.775]];
    const verre = new T.Mesh(new T.LatheGeometry([...ext, ...int].map(([x, y]) => new T.Vector2(x, y)), 160), new T.MeshPhysicalMaterial({
      color: 0xffffff, metalness: 0, roughness: 0.04, transmission: 1, ior: 1.5, thickness: 0.35,
      attenuationColor: new T.Color("#d8efe4"), attenuationDistance: 2.5, specularIntensity: 1, envMapIntensity: 1.25, clearcoat: 0.6, clearcoatRoughness: 0.05,
    }));
    verre.renderOrder = 2; verre.material.depthWrite = false;

    // Liquide : lathe de hauteur 1 (mise à l'échelle selon le niveau) + surface ondulée.
    const liqMat = new T.MeshPhysicalMaterial({ color: 0xffc21a, roughness: 0.12, metalness: 0, clearcoat: 0.3, envMapIntensity: 0.7, side: T.DoubleSide });
    // Séquence : eau claire transparente qui se colore (fondu de couleur et d'opacité, en espace linéaire)
    const eauMat = new T.MeshPhysicalMaterial({ color: 0xffffff, roughness: 0.05, metalness: 0, transparent: true, opacity: 0.12, depthWrite: false, envMapIntensity: 1, side: T.DoubleSide });
    const liq = new T.Mesh(new T.LatheGeometry([[0, 0], [0.47, 0], ...arc(0.47, 0.105, 0.105, -Math.PI / 2, 0, 6), [0.575, 1]].map(([x, y]) => new T.Vector2(x, y)), 96), liqMat);
    const surfGeo = new T.CircleGeometry(0.574, 96, 0, Math.PI * 2);
    const surfBase = surfGeo.attributes.position.array.slice();
    const surface = new T.Mesh(surfGeo, liqMat); surface.rotation.x = -Math.PI / 2;
    const BAS = -1.77, TRAIT = 0.62;
    const niveau = (y) => { const h = Math.max(0.001, y - BAS); liq.scale.set(1, h, 1); liq.position.y = BAS; surface.position.y = y; liq.visible = surface.visible = y > BAS + 0.01; };
    const onduler = (amp, t) => {
      const p = surfGeo.attributes.position;
      for (let i = 0; i < p.count; i++) { const x = surfBase[i * 3], y = surfBase[i * 3 + 1], r = Math.hypot(x, y); p.array[i * 3 + 2] = amp * Math.sin(r * 26 - t * 9) * (0.4 + r); }
      p.needsUpdate = true; surfGeo.computeVertexNormals();
    };

    // Sérigraphie blanche (CanvasTexture) + trait gravé à 500 ml.
    const toile = document.createElement("canvas"); toile.width = 1024; toile.height = 512;
    const texLogo = new T.CanvasTexture(toile); texLogo.colorSpace = T.SRGBColorSpace; texLogo.anisotropy = 8;
    const logo = new T.Mesh(new T.CylinderGeometry(0.629, 0.629, 1.25, 96, 1, true, -1.15, 2.3), new T.MeshStandardMaterial({ map: texLogo, transparent: true, roughness: 0.55, depthWrite: false }));
    logo.position.y = -0.62; logo.renderOrder = 4;
    let nomDessine = "";
    const dessiner = (nom, force) => {
      if (nom === nomDessine && !force) return; nomDessine = nom;
      const c = toile.getContext("2d"); c.clearRect(0, 0, 1024, 512);
      c.fillStyle = "rgba(255,255,255,.97)"; c.textAlign = "center";
      c.font = '700 118px "Bricolage Grotesque", "Avenir Next", system-ui, sans-serif'; c.fillText("Pétille", 512, 230);
      c.font = '600 46px "Bricolage Grotesque", system-ui, sans-serif'; c.fillText(nom, 512, 315);
      c.beginPath(); c.arc(512, 380, 10, 0, Math.PI * 2); c.fill();
      c.font = '500 32px "Bricolage Grotesque", system-ui, sans-serif'; c.fillText("FAIT À LYON", 512, 440);
      texLogo.needsUpdate = true;
    };
    dessiner("Multi-surfaces");
    const grave = new T.Mesh(new T.TorusGeometry(0.627, 0.006, 6, 120, Math.PI * 0.55), new T.MeshStandardMaterial({ color: 0xffffff, roughness: 1, transparent: true, opacity: 0.75, depthWrite: false }));
    grave.rotation.x = Math.PI / 2; grave.rotation.z = Math.PI * 0.225; grave.position.y = TRAIT; grave.renderOrder = 4;
    const repere = new T.Mesh(new T.PlaneGeometry(0.16, 0.05), new T.MeshBasicMaterial({ map: (() => { const c = document.createElement("canvas"); c.width = 128; c.height = 40; const x = c.getContext("2d"); x.fillStyle = "rgba(255,255,255,.8)"; x.font = "600 30px system-ui"; x.textAlign = "center"; x.fillText("500", 64, 30); const t = new T.CanvasTexture(c); t.colorSpace = T.SRGBColorSpace; return t; })(), transparent: true, depthWrite: false }));
    repere.position.set(0.24, TRAIT + 0.06, 0.585); repere.rotation.y = 0.39; repere.renderOrder = 4;

    // Gâchette noire mate : col fileté (stries), corps arrondi, bec hexagonal, détente courbe, tube plongeur.
    const noir = new T.MeshPhysicalMaterial({ color: 0x0e0f10, roughness: 0.62, metalness: 0, clearcoat: 0.15, clearcoatRoughness: 0.6, envMapIntensity: 0.6 });
    const tete = new T.Group();
    const col = new T.Mesh(new T.LatheGeometry([[0.2, 1.36], [0.305, 1.36], [0.315, 1.38], [0.315, 1.66], [0.3, 1.69], [0.2, 1.71], [0.16, 1.72], [0.16, 1.8]].map(([x, y]) => new T.Vector2(x, y)), 64), noir);
    const NS = 56, stries = new T.InstancedMesh(new T.BoxGeometry(0.018, 0.26, 0.022), noir, NS), m4 = new T.Matrix4();
    for (let i = 0; i < NS; i++) { const a = (i / NS) * Math.PI * 2; m4.makeRotationY(-a).setPosition(Math.sin(a) * 0.318, 1.515, Math.cos(a) * 0.318); stries.setMatrixAt(i, m4); }
    const forme = new T.Shape();
    forme.moveTo(0.19, 1.76); forme.lineTo(0.215, 2.0);
    forme.bezierCurveTo(0.225, 2.2, 0.12, 2.27, -0.02, 2.27);
    forme.lineTo(-0.5, 2.22); forme.quadraticCurveTo(-0.64, 2.2, -0.66, 2.11);
    forme.lineTo(-0.66, 2.0); forme.quadraticCurveTo(-0.6, 1.95, -0.42, 1.95);
    forme.quadraticCurveTo(-0.22, 1.94, -0.17, 1.76); forme.closePath();
    const corps = new T.Mesh(new T.ExtrudeGeometry(forme, { depth: 0.28, bevelEnabled: true, bevelThickness: 0.07, bevelSize: 0.06, bevelSegments: 8, curveSegments: 32 }), noir);
    corps.position.z = -0.14;
    const bec = new T.Mesh(new T.CylinderGeometry(0.1, 0.1, 0.13, 6), noir); bec.rotation.z = Math.PI / 2; bec.position.set(-0.76, 2.07, 0);
    const trou = new T.Mesh(new T.CircleGeometry(0.025, 16), new T.MeshBasicMaterial({ color: 0x000000 })); trou.rotation.y = -Math.PI / 2; trou.position.set(-0.828, 2.07, 0);
    const levier = new T.Shape();
    levier.moveTo(-0.3, 1.94); levier.bezierCurveTo(-0.55, 1.86, -0.6, 1.6, -0.5, 1.4);
    levier.quadraticCurveTo(-0.47, 1.35, -0.42, 1.39); levier.bezierCurveTo(-0.47, 1.6, -0.4, 1.8, -0.18, 1.87); levier.closePath();
    const detente = new T.Mesh(new T.ExtrudeGeometry(levier, { depth: 0.13, bevelEnabled: true, bevelThickness: 0.04, bevelSize: 0.03, bevelSegments: 6, curveSegments: 28 }), noir);
    detente.position.z = -0.065;
    const pivotDetente = new T.Group(); pivotDetente.position.set(-0.3, 1.94, 0); detente.position.x += 0.3; detente.position.y -= 1.94; pivotDetente.add(detente);
    const tube = new T.Mesh(new T.CylinderGeometry(0.022, 0.022, 3.1, 12), new T.MeshStandardMaterial({ color: 0xe8eeec, roughness: 0.35 }));
    tube.position.y = -0.15;
    tete.add(col, stries, corps, bec, trou, pivotDetente, tube);

    // Pastille de la séquence, bulles, nuage du pschitt.
    const pastille = new T.Mesh(geoPastille(T), new T.MeshStandardMaterial({ color: 0xffc21a, map: texturePastille(T), roughness: 0.75 }));
    pastille.scale.setScalar(1.25);
    const NB = 420;
    const bulles = new T.InstancedMesh(new T.SphereGeometry(1, 10, 8), new T.MeshPhysicalMaterial({ color: 0xffffff, roughness: 0, metalness: 0, transparent: true, opacity: 0.4, specularIntensity: 1, envMapIntensity: 2.2, clearcoat: 1, depthWrite: false }), NB);
    bulles.renderOrder = 6;
    const graines = Array.from({ length: NB }, () => ({ a: Math.random() * Math.PI * 2, r: Math.random(), v: 0.5 + Math.random(), t: Math.random(), s: 0.0035 + Math.random() * 0.011, j: Math.random() * 6.28 })); // rayon 0,25 à 1 mm (1 unité ≈ 7 cm)
    // Pschitt : brume conique de fines gouttelettes (Points de 2 à 3 px) qui part exactement du bec.
    const NN = 700, BEC = new T.Vector3(-0.83, 2.07, 0);
    const posBrume = new Float32Array(NN * 3);
    const geoBrume = new T.BufferGeometry(); geoBrume.setAttribute("position", new T.BufferAttribute(posBrume, 3));
    const nuage = new T.Points(geoBrume, new T.PointsMaterial({ color: 0xffffff, size: 2.4, sizeAttenuation: false, transparent: true, opacity: 0.7, depthWrite: false }));
    nuage.frustumCulled = false; nuage.renderOrder = 7;
    const gNuage = Array.from({ length: NN }, () => ({ d: Math.random(), a: Math.random() * Math.PI * 2, r: Math.sqrt(Math.random()) }));
    // Robinet en laiton (étape 2) : le filet d'eau en sort, dans le cadre.
    const laiton = new T.MeshPhysicalMaterial({ color: 0xc9a248, metalness: 1, roughness: 0.22, clearcoat: 0.4 });
    const robinet = new T.Group();
    // Mitigeur col de cygne : socle sur le plan de travail à droite, colonne, bec qui redescend au-dessus du goulot.
    const PLAN = -1.93, XC = 0.95, YC = 2.86, RA = XC / 2;
    const socle = new T.Mesh(new T.CylinderGeometry(0.2, 0.24, 0.12, 40), laiton); socle.position.set(XC, PLAN + 0.06, -0.15); robinet.add(socle);
    const pts = [new T.Vector3(XC, PLAN + 0.1, -0.15), new T.Vector3(XC, YC, -0.15)];
    for (let i = 1; i <= 24; i++) { const a2 = (i / 24) * Math.PI; pts.push(new T.Vector3(RA + RA * Math.cos(a2), YC + RA * Math.sin(a2), -0.15 * (1 - i / 24))); }
    pts.push(new T.Vector3(0, YC - 0.12, 0));
    robinet.add(new T.Mesh(new T.TubeGeometry(new T.CatmullRomCurve3(pts, false, "catmullrom", 0.1), 160, 0.085, 28, false), laiton));
    const manette = new T.Mesh(new T.CylinderGeometry(0.035, 0.035, 0.5, 16), laiton); manette.rotation.z = -1.0; manette.position.set(XC + 0.2, 0.9, -0.15); robinet.add(manette);
    const mousseur = new T.Mesh(new T.CylinderGeometry(0.1, 0.1, 0.1, 32), laiton); mousseur.position.set(0, YC - 0.14, 0); robinet.add(mousseur);
    const bague2 = new T.Mesh(new T.TorusGeometry(0.1, 0.014, 8, 32), laiton); bague2.rotation.x = Math.PI / 2; bague2.position.set(0, YC - 0.19, 0); robinet.add(bague2);
    flacon.add(liq, surface, verre, logo, grave, repere, tete, pastille, bulles, nuage, robinet);

    const liqCible = new T.Color("#FFC21A");
    const lisse = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
    const zero = new T.Matrix4().makeScale(0, 0, 0);
    const cacherInst = (im, n) => { for (let i = 0; i < n; i++) im.setMatrixAt(i, zero); im.instanceMatrix.needsUpdate = true; };

    const repos = (t) => {
      liq.material = surface.material = liqMat;
      tube.visible = true;
      tete.position.set(0, 0, 0); tete.rotation.set(0, 0, 0); pivotDetente.rotation.z = 0;
      niveau(TRAIT - 0.04); onduler(0.004, t);
      pastille.visible = false; cacherInst(bulles, NB); nuage.visible = false; robinet.visible = false;
    };
    const teinter = (couleur, nom, force) => { liqMat.color.copy(couleur); if (nom) dessiner(nom, force); };

    // p : 0…5. Tout dépend de p seul (sauf le frémissement de surface) : le retour arrière rejoue à l'envers.
    const sequence = (p, t, eau) => {
      liq.material = surface.material = eauMat;
      dessiner("Multi-surfaces");
      // 1. ouvrir : un tour de dévissage, puis la gâchette se lève, bec tourné vers l'arrière, juste au-dessus
      //    et à droite du col (toujours dans le cadre), pour laisser passer le filet d'eau et la pastille.
      const devisse = lisse(0.1, 0.6, p), leve = lisse(0.6, 1.0, p);
      // 4. refermer : elle revient sur le col, descend, un tour de vissage
      const revient = lisse(3.05, 3.5, p), revisse = lisse(3.5, 3.95, p);
      const dehors = leve * (1 - revient);
      // trajet : monte, passe au-dessus de l'épaule vers la gauche, puis descend se poser sur le plan
      const lat = lisse(0, 0.6, dehors), desc = lisse(0.5, 1, dehors);
      const montee = 0.12 * devisse * (1 - revisse) + 0.45 * Math.sin(Math.PI * Math.min(1, dehors / 0.75)) * (1 - desc) - 3.41 * desc;
      tete.position.set(-1.6 * lat, montee, 0.1 * lat);
      const tour = -devisse * Math.PI * 2 * (1 - revient) - (1 - revisse) * revient * Math.PI * 2;
      tete.rotation.set(0, tour + dehors * Math.PI / 2, 0);
      tube.visible = dehors < 0.02;
      // 2. remplir : filet d'eau puis niveau jusqu'au trait
      const remplit = lisse(1.15, 1.95, p);
      const y = -1.77 + (TRAIT - 0.04 + 1.77) * remplit;
      niveau(y);
      const verse = p > 1.05 && p < 2.0 ? Math.min(lisse(1.05, 1.15, p), 1 - lisse(1.9, 2.0, p)) : 0;
      eau.verser(verse, y, t);
      const ouvreR = lisse(0.95, 1.12, p) * (1 - lisse(1.98, 2.15, p));
      robinet.visible = ouvreR > 0.01; robinet.position.set((1 - ouvreR) * 2.2, 0, 0);
      // 3. pastille : tombe dans le goulot, coule à plat, se dissout en rétrécissant pendant que l'eau se colore
      const chute = lisse(2.0, 2.3, p), coule = lisse(2.3, 2.5, p), fond = lisse(2.4, 3.1, p);
      pastille.visible = p > 1.98 && p < 3.1;
      const yP = -1.7 + 0.06 * (1 - fond);
      pastille.position.set(0, 3.0 - (3.0 - y) * chute - (y - yP) * coule, 0.06);
      pastille.rotation.set(0.35 + chute * 1.6 - coule * 1.25, 0, 0.15);
      pastille.scale.setScalar(1.25 * Math.max(0.001, 1 - fond));
      const teinte = lisse(2.4, 3.1, p);
      eauMat.color.setRGB(0.92, 0.97, 1).lerp(liqCible, teinte); // couleurs linéaires (ColorManagement)
      eauMat.opacity = 0.12 + 0.82 * teinte;
      const efferv = p < 2.3 ? 0 : p < 2.45 ? lisse(2.3, 2.45, p) : 1 - lisse(2.95, 3.4, p);
      onduler(0.004 + 0.02 * verse + 0.008 * efferv, t);
      // bulles : partent de la pastille, montent en rétrécissant, éclatent à la surface
      graines.forEach((g, i) => {
        if (efferv <= 0.01 || i / NB > efferv) { bulles.setMatrixAt(i, zero); return; }
        const h = (g.t + p * g.v * 5 + t * 0.35 * g.v) % 1;
        const yy = yP + 0.05 + h * (y - yP - 0.05);
        const rr = 0.03 + g.r * 0.12 + h * h * g.r * 0.35;
        const eclat = h > 0.94 ? 1 + (h - 0.94) * 25 : 1; // gonfle puis disparaît à la surface
        const s = h > 0.985 ? 0 : g.s * (1 - 0.55 * h) * eclat;
        m4.makeScale(s, s, s).setPosition(Math.cos(g.a) * rr + Math.sin(h * 9 + g.j) * 0.015, yy, Math.sin(g.a) * rr);
        bulles.setMatrixAt(i, m4);
      });
      bulles.instanceMatrix.needsUpdate = true;
      // 5. prêt : pression sur la détente, pschitt (nuage qui sort du bec), puis de face
      const presse = p > 4.05 && p < 4.45 ? Math.sin(lisse(4.05, 4.45, p) * Math.PI) : 0;
      pivotDetente.rotation.z = -0.22 * presse;
      const pschitt = lisse(4.12, 4.6, p), fondu = 1 - lisse(4.6, 4.9, p);
      nuage.visible = pschitt > 0 && fondu > 0;
      if (nuage.visible) {
        gNuage.forEach((g, i) => {
          const d = pschitt * (0.15 + 1.05 * g.d);
          const rr = d * 0.3 * g.r; // cône d'environ 17°
          posBrume[i * 3] = BEC.x - 0.05 - d; posBrume[i * 3 + 1] = BEC.y + Math.cos(g.a) * rr; posBrume[i * 3 + 2] = Math.sin(g.a) * rr;
        });
        geoBrume.attributes.position.needsUpdate = true;
        nuage.material.opacity = 0.75 * fondu;
      }
      flacon.rotation.y = 0; // étiquette de face pendant toute la séquence
    };

    return { flacon, repos, teinter, sequence, pieces: { verre, tete } };
  }

  function construireEau(T) {
    const mat = new T.MeshPhysicalMaterial({ color: 0xeaf6fb, roughness: 0.02, transmission: 0.6, transparent: true, opacity: 0.85, ior: 1.33, thickness: 0.1, depthWrite: false });
    const filet = new T.Mesh(new T.CylinderGeometry(0.045, 0.035, 1, 16, 12, true), mat);
    filet.renderOrder = 5;
    const base = filet.geometry.attributes.position.array.slice();
    return {
      filet,
      verser(f, niveau, t) {
        filet.visible = f > 0.01;
        if (!filet.visible) return;
        const haut = 2.7, bas = niveau;
        filet.scale.set(0.5 + 0.5 * f, haut - bas, 0.5 + 0.5 * f);
        filet.position.set(0, (haut + bas) / 2, 0);
        const p = filet.geometry.attributes.position;
        for (let i = 0; i < p.count; i++) { const y = base[i * 3 + 1]; p.array[i * 3] = base[i * 3] * (1 + 0.25 * Math.sin(y * 30 + t * 25)); p.array[i * 3 + 2] = base[i * 3 + 2] * (1 + 0.25 * Math.cos(y * 27 + t * 21)); }
        p.needsUpdate = true;
      },
      cacher() { filet.visible = false; },
    };
  }

  function construireKit(T, M) {
    // Kit de départ : 4 flacons en verre vides, devant eux une enveloppe kraft (lettre suivie) dont le
    // rabat s'ouvre ; 4 pastilles de 12 g, aux couleurs des 4 recharges, en sortent et flottent.
    const groupe = new T.Group();
    const flacons = [-1.35, -0.45, 0.45, 1.35].map((x, i) => {
      const f = new T.Group();
      f.add(M.pieces.verre.clone(), M.pieces.tete.clone(true));
      f.scale.setScalar(0.56); f.position.set(x * 1.02, -1.0 + 1.86 * 0.56, -0.75 - (i % 2) * 0.12);
      f.rotation.y = 0.3 - i * 0.2; groupe.add(f); return f;
    });
    // papier kraft + impression nette (grande texture)
    const c = document.createElement("canvas"); c.width = 1024; c.height = 672;
    const x = c.getContext("2d"); x.fillStyle = "#c79f6e"; x.fillRect(0, 0, 1024, 672);
    for (let i = 0; i < 9000; i++) { x.fillStyle = `rgba(${90 + Math.random() * 60},${60 + Math.random() * 40},30,${Math.random() * 0.16})`; x.fillRect(Math.random() * 1024, Math.random() * 672, 3, 1); }
    x.fillStyle = "#142629"; x.textAlign = "center";
    x.font = '700 150px "Bricolage Grotesque", "Avenir Next", system-ui, sans-serif'; x.fillText("Pétille", 512, 470);
    x.font = '600 40px "Bricolage Grotesque", system-ui, sans-serif'; x.fillText("4 pastilles · lettre suivie", 512, 545);
    const kraftTex = new T.CanvasTexture(c); kraftTex.colorSpace = T.SRGBColorSpace; kraftTex.anisotropy = 8;
    const kraftUni = new T.MeshStandardMaterial({ color: 0xc79f6e, roughness: 0.92 });
    const env = new T.Group(); env.position.set(0, -0.78, 0.55); env.rotation.x = -1.05; groupe.add(env);
    const LA = 2.0, HA = 1.25;
    const corps = new T.Mesh(new T.BoxGeometry(LA, HA, 0.03), [kraftUni, kraftUni, kraftUni, kraftUni, new T.MeshStandardMaterial({ map: kraftTex, roughness: 0.9 }), kraftUni]);
    env.add(corps);
    const tri = new T.Shape(); tri.moveTo(-LA / 2, 0); tri.lineTo(LA / 2, 0); tri.lineTo(0, -0.62); tri.closePath();
    const rabat = new T.Mesh(new T.ShapeGeometry(tri), new T.MeshStandardMaterial({ color: 0xbd9564, roughness: 0.92, side: T.DoubleSide }));
    const charniere = new T.Group(); charniere.position.set(0, HA / 2, 0.02); charniere.add(rabat); env.add(charniere);
    const tex = texturePastille(T), geo = geoPastille(T);
    const pastilles = ["#FFC21A", "#1FC77A", "#7B5CFF", "#FF5C9A"].map((col) => {
      const m = new T.Mesh(geo, new T.MeshStandardMaterial({ color: col, map: tex, roughness: 0.78 }));
      m.scale.setScalar(0.7); groupe.add(m); return m;
    });
    return {
      groupe,
      animer(o, t) {
        const r = Math.min(1, o / 0.45), e2 = r * r * (3 - 2 * r);
        charniere.rotation.x = -e2 * 2.96; // le rabat s'ouvre et se couche à plat vers l'arrière
        pastilles.forEach((m, i) => {
          const sortie = Math.min(1, Math.max(0, (o - 0.35 - i * 0.08) / 0.45));
          const s2 = sortie * sortie * (3 - 2 * sortie);
          m.position.set((-0.7 + i * 0.47) * s2, -0.5 + s2 * (0.42 + 0.03 * Math.sin(t * 1.5 + i * 1.7)), 0.25 + 0.45 * s2); // sortent de l'ouverture et se posent devant
          m.rotation.set(1.15 + 0.25 * Math.sin(t * 0.9 + i), t * 0.35 + i, 0.2 * Math.cos(t * 0.7 + i));
          m.visible = s2 > 0.02;
        });
      },
    };
  }
})();
