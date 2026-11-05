/*
 * Vire — le paysage piloté par la page (moment signature). Chargé après gestes.js (GSAP, Lenis prêts).
 *
 * - Le défilement fait avancer la caméra (cz) et passer l'heure (tod) : aube en haut de page,
 *   du lever au coucher pendant « Une journée là-haut » (seule section épinglée), nuit sur l'appel final.
 * - La brume dérive seule : bouton « Figer la brume » (WCAG 2.2.2), arrêt hors écran et onglet caché.
 * - On ne dessine que si une section « fenêtre » est à l'écran (les autres sont opaques).
 * - Mouvement réduit : pas d'épinglage, pas de dérive ni de caméra qui avance ; une image fixe par
 *   moment de la journée, changée sans fondu. Sans WebGL : images fixes du même paysage (images/plan-*).
 * - GSAP : gsap.matchMedia() pour les points de rupture et le mouvement réduit (nettoyage automatique),
 *   transforms et opacité seulement, ScrollTrigger.refresh() après le chargement des images.
 */
(() => {
  const root = document.documentElement;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const { gsap, ScrollTrigger, Paysage } = window;
  const cv = $("[data-paysage]");
  const images = $$("[data-repli] picture");
  const btn = $("[data-pause-brume]");
  const journee = $("[data-journee]");
  const horloge = $("[data-horloge]"), heureHero = $("[data-heure-affichee]");
  const mr = matchMedia("(prefers-reduced-motion: reduce)");
  const etroit = matchMedia("(max-width: 767px)");

  let p = null;
  try { p = Paysage?.creer(cv, { echelle: etroit.matches ? 0.6 : 0.62 }); } catch (e) { p = null; }
  root.classList.add(p ? "avec-webgl" : "sans-webgl");
  if (p) cv.addEventListener("webglcontextlost", (e) => { e.preventDefault(); p = null; root.classList.replace("avec-webgl", "sans-webgl"); poserRepli(etat.tod); });

  // ------------------------------------------------------------------ l'heure et la caméra selon le défilement
  let reperes = [[0, 0.05]], pin = { debut: 0, fin: 1, st: null };
  const haut = (el) => (el ? el.getBoundingClientRect().top + scrollY : 0);
  const mesurer = () => {
    const vh = innerHeight;
    const debut = pin.st ? pin.st.start : haut(journee) - vh * 0.2;
    const fin = pin.st ? pin.st.end : haut(journee) + journee.offsetHeight - vh * 0.6;
    pin.debut = debut; pin.fin = Math.max(debut + 1, fin);
    const L = pin.fin - debut;
    // pendant l'épinglage, la lumière suit les moments : midi à 12 h 30, doré à 18 h 40, coucher à 20 h 47
    reperes = [
      [0, 0.05],
      [debut, 0.1],
      [debut + L * 0.3, 0.4],
      [debut + L * 0.55, 0.64],
      [debut + L * 0.8, 0.84],
      [pin.fin, 0.88],
      [Math.max(pin.fin + 1, haut($("#questions")) - vh * 0.5), 0.92],
      [Math.max(pin.fin + 2, haut($("#final")) - vh * 0.35), 1],
    ];
  };
  const todDe = (s) => {
    if (s <= reperes[0][0]) return reperes[0][1];
    for (let i = 1; i < reperes.length; i++) {
      const [y0, t0] = reperes[i - 1], [y1, t1] = reperes[i];
      if (s <= y1) return t0 + (t1 - t0) * ((s - y0) / Math.max(1, y1 - y0));
    }
    return reperes.at(-1)[1];
  };
  const czDe = (s) => {
    const dans = Math.min(1, Math.max(0, (s - pin.debut) / (pin.fin - pin.debut)));
    return 0.8 + (s / innerHeight) * 0.5 + dans * 2.6;
  };
  // un seul jour de juillet : lever 6 h 15, pique-nique 12 h 30, soupe 19 h 00, coucher 21 h 20, nuit 21 h 45.
  // [heure du paysage (tod), minutes] ; POS = place de chaque moment dans l'épinglage (0 → 1)
  const HEURES = [[0.1, 375], [0.4, 750], [0.64, 1140], [0.84, 1280], [0.88, 1305]];
  const POS = [0, 0.3, 0.55, 0.8];
  const heureTexte = (tod) => {
    const q = Math.min(0.88, Math.max(0.1, tod));
    let i = 1; while (i < HEURES.length - 1 && q > HEURES[i][0]) i++;
    const [q0, m0] = HEURES[i - 1], [q1, m1] = HEURES[i];
    // près d'un moment, l'horloge affiche exactement l'heure de sa carte
    const cle = HEURES.find(([t]) => Math.abs(q - t) < 0.025);
    const min = cle ? cle[1] : Math.round(m0 + ((q - q0) / (q1 - q0)) * (m1 - m0));
    return `${Math.floor(min / 60)} h ${String(min % 60).padStart(2, "0")}`;
  };
  // mouvement réduit : une image fixe par moment, sans transition
  const CLES = [0.15, 0.4, 0.66, 0.86, 1];
  const HEURE_CLE = new Map(CLES.map((c, i) => [c, HEURES[i][0]]));
  const proche = (tod) => CLES.reduce((a, b) => (Math.abs(b - tod) < Math.abs(a - tod) ? b : a));

  // ------------------------------------------------------------------ repli sans WebGL : la photo de l'heure la plus proche
  const poserRepli = (tod) => {
    let meilleur = images[0];
    images.forEach((im) => { if (Math.abs(+im.dataset.heure - tod) < Math.abs(+meilleur.dataset.heure - tod)) meilleur = im; });
    images.forEach((im) => im.classList.toggle("actif", im === meilleur));
  };

  // ------------------------------------------------------------------ la boucle de dessin
  const etat = { tod: 0.05, cz: 0.8, cx: 0, t: 20 };
  const cible = { cx: 0 };
  let joue = !mr.matches, visibles = 0, dernier = null, avant = performance.now();
  // la pastille « Figer la brume » ne vit que sur les trois premières fenêtres (toutes largeurs) ;
  // ailleurs la brume ne dérive pas, la pastille n'a donc rien à figer et ne couvre aucun contenu
  const HAUT = $$(".fenetre").filter((s) => ["arrivee", "altitude", "journee"].includes(s.id));
  let hautVu = true;
  const io = new IntersectionObserver((es) => {
    es.forEach((e) => (e.target._vu = e.isIntersecting));
    visibles = $$(".fenetre").filter((s) => s._vu).length;
  });
  $$(".fenetre").forEach((s) => io.observe(s));
  // une section du haut ne compte que si elle occupe la moitié haute de l'écran, sous la barre
  const ioHaut = new IntersectionObserver((es) => {
    es.forEach((e) => (e.target._haut = e.isIntersecting));
    hautVu = HAUT.some((s) => s._haut);
    root.classList.toggle("brume-loin", !hautVu);
  }, { rootMargin: "-90px 0px -50% 0px" });
  HAUT.forEach((s) => ioHaut.observe(s));

  const tick = (now) => {
    const dt = Math.min((now - avant) / 1000, 0.05); avant = now;
    const s = scrollY, reduit = mr.matches;
    const todCible = reduit ? proche(todDe(s)) : todDe(s);
    const czCible = reduit ? 1.2 : czDe(s);
    const lisse = reduit ? 1 : 0.14;
    etat.tod += (todCible - etat.tod) * lisse;
    etat.cz += (czCible - etat.cz) * lisse;
    etat.cx += ((reduit ? 0 : cible.cx) - etat.cx) * 0.05;
    if (joue && !reduit && !document.hidden && visibles && hautVu) etat.t += dt;
    const cle = `${etat.tod.toFixed(4)}|${etat.cz.toFixed(4)}|${etat.cx.toFixed(3)}|${etat.t.toFixed(3)}|${cv.width}`;
    if (cle !== dernier && (visibles || dernier === null)) {
      dernier = cle;
      if (p) p.rendre({ ...etat, snow: 0 }); else poserRepli(etat.tod);
      // mouvement réduit : l'heure exacte de la carte du moment affiché (6 h 15, 12 h 30…), pas une interpolation
      const h = heureTexte(mr.matches ? HEURE_CLE.get(etat.tod) ?? etat.tod : etat.tod);
      if (horloge) horloge.textContent = h;
      if (heureHero) heureHero.textContent = h;
    }
    requestAnimationFrame(tick);
  };
  const taille = () => { if (p) { p.taille(); dernier = null; } };
  new ResizeObserver(taille).observe(cv);
  addEventListener("pointermove", (e) => { if (e.pointerType === "mouse") cible.cx = (e.clientX / innerWidth - 0.5) * 0.35; }, { passive: true });

  // bouton pause : visible seulement quand quelque chose bouge seul
  const majBouton = () => {
    btn.hidden = !p || mr.matches;
    btn.setAttribute("aria-pressed", String(!joue));
    $("[data-pause-texte]", btn).textContent = joue ? "Figer la brume" : "Relancer la brume";
    $("[data-pause-icone]", btn).textContent = joue ? "❚❚" : "▶";
  };
  btn.addEventListener("click", () => { joue = !joue; majBouton(); });
  mr.addEventListener("change", (e) => { joue = !e.matches; majBouton(); dernier = null; });
  majBouton();

  // ------------------------------------------------------------------ la journée épinglée (GSAP)
  const moments = $$("[data-moment]", journee), rail = $("[data-rail]", journee);
  if (gsap && ScrollTrigger && journee) {
    const mm = gsap.matchMedia();
    mm.add({ ordi: "(min-width: 768px) and (prefers-reduced-motion: no-preference)", tel: "(max-width: 767px) and (prefers-reduced-motion: no-preference)" }, (ctx) => {
      root.classList.add("journee-animee");
      gsap.set(moments, { autoAlpha: 0, y: 40 });
      gsap.set(moments[0], { autoAlpha: 1, y: 0 });
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: journee, start: "top top", end: ctx.conditions.ordi ? "+=200%" : "+=150%",
          pin: true, scrub: true, anticipatePin: 1,
          onRefresh: (self) => { pin.st = self; mesurer(); },
          onUpdate: (self) => journee.dispatchEvent(new CustomEvent("progression", { detail: self.progress })),
        },
      });
      tl.fromTo(rail, { scaleX: 0 }, { scaleX: 1, duration: 4 }, 0);
      // chaque moment est pleinement lisible quand l'horloge affiche son heure (POS × 4)
      moments.forEach((m, i) => {
        if (i > 0) tl.to(m, { autoAlpha: 1, y: 0, duration: 0.35 }, POS[i] * 4 - 0.35);
        if (i < moments.length - 1) tl.to(m, { autoAlpha: 0, y: -40, duration: 0.35 }, POS[i + 1] * 4 - 0.7);
      });
      // le sentier se trace au défilement (clip-path, sans toucher à la géométrie)
      gsap.fromTo(".profil .trace", { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", ease: "none",
        scrollTrigger: { trigger: ".profil", start: "top 85%", end: "bottom 45%", scrub: true } });
      return () => { root.classList.remove("journee-animee"); pin.st = null; mesurer(); };
    });
    ScrollTrigger.addEventListener("refresh", mesurer);
    // les images changent les hauteurs : recalculer après leur chargement (debounce léger)
    let attente = 0;
    $$("img").forEach((im) => { if (!im.complete) im.addEventListener("load", () => { clearTimeout(attente); attente = setTimeout(() => ScrollTrigger.refresh(), 200); }, { once: true }); });
  }
  mesurer();
  addEventListener("resize", mesurer);
  addEventListener("load", mesurer);
  requestAnimationFrame(tick);
})();
