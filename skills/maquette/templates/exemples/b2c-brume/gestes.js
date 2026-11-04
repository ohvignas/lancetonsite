/*
 * Brume — gestes.js, version « film » (refonte immersive plein écran).
 * Adapté de la bibliothèque du kit (templates/prototype/gestes.js, non modifiée) pour une page faite
 * d'écrans pleins : chaque scène épinglée est une enveloppe haute avec un plateau `position: sticky`
 * (pas de pin-spacer GSAP), et chaque transition est écrite à la main, écran par écran.
 *
 *   [data-ecran="n"]          écran compté (compteur « 0n / 08 », barre d'action mobile)
 *   [data-sans-barre]         la barre d'action mobile se cache sur cet écran
 *   [data-titre="lignes|mots"] titre découpé (SplitText) et révélé en opacité / translation
 *   [data-apparait]           apparition en opacité après le titre
 *   [data-scene="torref|livraison|cafes"] scènes épinglées propres à la page
 *   canvas[data-sequence]     séquence d'images (chargée par lots de 3 : le petit serveur de test refuse les rafales)
 *   [data-composer], [data-tiroir], [data-fermer]  dialogues (actifs aussi en mouvement réduit)
 *   [data-composer][data-choix="Kanzu"]  ouvre la fenêtre avec ce café déjà coché
 *
 * Tour 1 de la boucle persona (79/100) : sachet 3D remplacé par la photo détourée, torréfaction remise
 * dans l'ordre du métier (minuteur sur le tambour fermé, vidage à 12:00), bouton d'en-tête caché sur
 * l'ouverture, café choisi repris dans la fenêtre et dans la barre mobile, « une seule fois » au rythme.
 *
 * Règles d'accessibilité : on n'anime que `opacity` et les transformations, jamais `visibility` ;
 * en mouvement réduit, aucune scène n'est épinglée et chaque écran est une image fixe.
 */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const root = document.documentElement;
  const reduit = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const estMobile = () => matchMedia("(max-width: 767px)").matches;

  /* ---------- Dates : on torréfie le mardi (heure de Paris) ---------- */
  const maintenantParis = () => {
    const p = Object.fromEntries(new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Paris", weekday: "short", year: "numeric", month: "2-digit", day: "2-digit" })
      .formatToParts(new Date()).map((x) => [x.type, x.value]));
    const jours = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
    return { jour: jours[p.weekday], date: new Date(Date.UTC(+p.year, +p.month - 1, +p.day)) };
  };
  const fmt = (d, o) => d.toLocaleDateString("fr-FR", { timeZone: "UTC", ...o });
  const plus = (d, n) => new Date(d.getTime() + n * 864e5);
  const now = maintenantParis();
  let ecart = (2 - now.jour + 7) % 7;
  if (ecart === 0) ecart = 7; // le mardi, la fournée du jour est déjà pesée
  const mardi = plus(now.date, ecart);
  const dateTorref = fmt(plus(now.date, -((now.jour - 2 + 7) % 7)), { day: "2-digit", month: "2-digit" });
  $$("[data-fournee]").forEach((el) => (el.textContent = fmt(mardi, { weekday: "long", day: "numeric", month: "long" })));
  $$("[data-limite]").forEach((el) => (el.textContent = ecart === 1 ? "ce soir 23 h 59" : "lundi 23 h 59"));
  $$("[data-date-torref]").forEach((el) => (el.textContent = dateTorref));

  /* ---------- Séquence d'images (canvas) ---------- */
  const preparerSequence = (cv) => {
    const n = parseInt(cv.dataset.frames || "60", 10);
    const url = (i) => cv.dataset.sequence.replace("{i}", String(i).padStart(4, "0"));
    const images = new Array(n);
    const c = cv.getContext("2d");
    const etat = { f: 0, n };
    const dessiner = () => {
      const i = Math.round(etat.f);
      let im = images[i];
      if (!im || !im.complete || !im.naturalWidth) {
        im = null;
        for (let k = i; k >= 0; k--) { const a = images[k]; if (a && a.complete && a.naturalWidth) { im = a; break; } }
        if (!im) for (let k = i; k < n; k++) { const a = images[k]; if (a && a.complete && a.naturalWidth) { im = a; break; } }
      }
      if (im) c.drawImage(im, 0, 0, cv.width, cv.height);
    };
    const charger = (i) => {
      if (images[i]) return;
      const im = new Image();
      im.decoding = "async";
      im.onload = () => { if (Math.abs(Math.round(etat.f) - i) < 2 || i === 0 || i === n - 1) dessiner(); };
      im.src = url(i + 1);
      images[i] = im;
    };
    etat.toutCharger = () => {
      if (etat.lance) return;
      etat.lance = true;
      let i = 1;
      const paquet = () => {
        const lot = [];
        for (let k = 0; k < 3 && i < n; k++, i++) { charger(i); lot.push(images[i]); }
        if (i < n) Promise.all(lot.map((im) => (im.decode ? im.decode().catch(() => {}) : null))).then(paquet);
      };
      paquet();
    };
    etat.charger = charger;
    etat.dessiner = dessiner;
    return etat;
  };
  const cv = $("canvas[data-sequence]");
  const seq = cv ? preparerSequence(cv) : null;
  if (seq) {
    if (reduit) { seq.f = seq.n - 1; seq.charger(seq.n - 1); }
    else seq.charger(0);
  }

  /* ---------- En-tête : se cache en descendant, revient en remontant ou au clavier ---------- */
  const entete = $("[data-entete]");
  let dernierY = scrollY;
  addEventListener("scroll", () => {
    const y = scrollY;
    if (Math.abs(y - dernierY) > 6) { entete.classList.toggle("is-cache", y > dernierY && y > 120); dernierY = y; }
  }, { passive: true });
  entete.addEventListener("focusin", () => entete.classList.remove("is-cache"));

  /* ---------- Compteur d'écran, progression, barre d'action mobile ---------- */
  const ecrans = $$("[data-ecran]");
  const compteur = $("[data-compteur]");
  const progression = $("[data-progression]");
  const barre = $("[data-barre]");
  const visibles = new Set();
  let courant = null;
  const boutonEntete = $("[data-bouton-entete]");
  const boutonBarre = $("[data-bouton-barre]");
  // Barre mobile : pendant les cafés, « Composer · Kanzu » ouvre la fenêtre avec le café qu'on regarde
  const choixBarre = (nom) => {
    if (nom) { boutonBarre.dataset.choix = nom; boutonBarre.textContent = `Composer · ${nom}`; }
    else if (boutonBarre.dataset.choix) { delete boutonBarre.dataset.choix; boutonBarre.textContent = "Composer"; }
  };
  let cafeVu = null;
  const majBarre = () => {
    const ouverture = !courant || courant.dataset.ecran === "1";
    const cache = ouverture || courant.hasAttribute("data-sans-barre");
    barre.classList.toggle("is-cache", cache);
    barre.inert = cache;
    barre.setAttribute("aria-hidden", String(cache));
    // Un seul bouton sur l'ouverture : celui de l'en-tête attend l'écran 02
    entete.classList.toggle("sur-ouverture", ouverture);
    boutonEntete.inert = ouverture;
    choixBarre(courant?.dataset.ecran === "5" ? cafeVu : null);
  };
  const io = new IntersectionObserver((entrees) => {
    entrees.forEach((e) => (e.isIntersecting ? visibles.add(e.target) : visibles.delete(e.target)));
    // l'écran du dessus (le dernier dans le DOM) gagne : l'ouverture reste collée sous l'écran 02
    courant = ecrans.filter((el) => visibles.has(el)).pop() || courant;
    if (courant) compteur.textContent = String(courant.dataset.ecran).padStart(2, "0");
    majBarre();
  }, { rootMargin: "-50% 0px -50% 0px" });
  ecrans.forEach((el) => io.observe(el));
  const majProgression = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    progression.style.setProperty("--p", max > 0 ? Math.min(1, scrollY / max).toFixed(4) : 0);
  };
  addEventListener("scroll", majProgression, { passive: true });
  addEventListener("resize", majProgression);
  majProgression();

  /* ---------- Dialogues : composer l'abonnement, tiroir des questions ---------- */
  let lenis = null;
  const ouvrir = (dlg, cible) => {
    if (!dlg.open) dlg.showModal();
    lenis?.stop();
    if (cible) requestAnimationFrame(() => $(`#${cible}`, dlg)?.scrollIntoView({ block: "start" }));
  };
  $$("dialog").forEach((dlg) => {
    dlg.setAttribute("data-lenis-prevent", "");
    dlg.addEventListener("close", () => lenis?.start());
    dlg.addEventListener("click", (e) => { if (e.target === dlg) dlg.close(); });
  });
  $$("[data-fermer]").forEach((b) => b.addEventListener("click", () => b.closest("dialog").close()));
  const composer = $("#composer");
  const tiroir = $("#tiroir");
  $$("[data-tiroir]").forEach((b) => b.addEventListener("click", () => ouvrir(tiroir, b.dataset.tiroir)));

  // Prix d'abonnement (port offert) et prix à l'unité « une seule fois » (exemple fictif : à fixer par la cliente)
  const PRIX = { 250: 12.5, 500: 23.9, 1000: 45 };
  const PRIX_UNITE = { 250: 13.9, 500: 26.5, 1000: 49.9 };
  const PORT_UNITE = "4,90\u00a0€";
  // La virgule dans un span : avec l'approche serrée des chiffres, « 12,50 » se lisait « 1250 »
  const euros = (v) => v.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(",", '<span class="virgule">,</span>') + "&nbsp;€";
  const form = $("[data-form-composer]");
  const prix = $("[data-prix]");
  const port = $("[data-port]");
  const notes = $("[data-notes]");
  const recap = $("[data-recap]");
  const recapInitial = recap.innerHTML;
  const dateFournee = () => fmt(mardi, { weekday: "long", day: "numeric", month: "long" });
  // Les notes de chaque café viennent de l'écran 05 (pas de doublon dans le HTML)
  const notesCafe = Object.fromEntries($$(".cafe .nom").map((n) => [$("b", n).textContent, $("span", n).textContent]));
  const texteNotes = (cafe) => (notesCafe[cafe]
    ? `${cafe}\u00a0: ${notesCafe[cafe].charAt(0).toLowerCase()}${notesCafe[cafe].slice(1)}`
    : "Un café différent à chaque envoi, avec sa fiche.");
  const majComposer = (anime) => {
    const d = Object.fromEntries(new FormData(form));
    const unique = d.rythme === "1";
    prix.innerHTML = euros((unique ? PRIX_UNITE : PRIX)[d.quantite]);
    port.textContent = unique ? `une fois, port\u00a0${PORT_UNITE}` : "par envoi, port offert";
    const n = texteNotes(d.cafe);
    if (notes.textContent !== n) notes.textContent = n;
    recap.innerHTML = unique ? "Envoi : <span data-fournee></span>. Sans abonnement." : recapInitial;
    $("[data-fournee]", recap).textContent = dateFournee();
    if (anime && !reduit && window.gsap) gsap.fromTo(prix, { yPercent: 30, opacity: 0.4 }, { yPercent: 0, opacity: 1, duration: 0.35, ease: "power3.out" });
  };
  form.addEventListener("change", () => majComposer(true));
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(form));
    const q = d.quantite === "1000" ? "1 kg" : `${d.quantite} g`;
    const r = { 15: "tous les 15 jours", 30: "tous les mois", 1: "une seule fois" }[d.rythme];
    recap.textContent = `${d.cafe}, ${d.methode}, ${q}, ${r} : redirection vers le paiement sécurisé…`;
  });
  // « Choisir Kanzu » (écran 05, barre mobile) : la fenêtre s'ouvre avec ce café coché
  $$("[data-composer]").forEach((b) => b.addEventListener("click", () => {
    const radio = b.dataset.choix && $(`input[name=cafe][value="${b.dataset.choix}"]`, form);
    if (radio && !radio.checked) { radio.checked = true; majComposer(false); }
    ouvrir(composer);
  }));
  // Coffret découverte (tiroir) : démonstration, rien n'est commandé
  $("[data-coffret]")?.addEventListener("click", () => {
    $("[data-coffret-retour]").textContent = "Coffret découverte, 24 € + 4,90 € de port : redirection vers le paiement sécurisé…";
  });

  const offre = $("#ecran-06");
  const plansCafes = $$("[data-cafe]");
  const nomPlan = (p) => $(".nom b", p)?.textContent || null;

  /* ---------- Mouvement réduit : images fixes, rien d'épinglé ---------- */
  const { gsap, ScrollTrigger, SplitText, Lenis } = window;
  if (reduit || !gsap || !ScrollTrigger) {
    // Les cafés sont empilés : la barre mobile reprend celui qui occupe le milieu de l'écran
    const ioCafes = new IntersectionObserver((entrees) => {
      entrees.forEach((e) => { if (e.isIntersecting) { cafeVu = nomPlan(e.target); majBarre(); } });
    }, { rootMargin: "-50% 0px -50% 0px" });
    plansCafes.forEach((p) => ioCafes.observe(p));
    $$("video[data-video]").forEach((v) => { v.pause(); v.removeAttribute("autoplay"); });
    const minuteur = $("[data-minuteur]");
    if (minuteur) minuteur.textContent = "12:00";
    return;
  }
  gsap.registerPlugin(ScrollTrigger, SplitText);

  if (Lenis) {
    lenis = new Lenis({ lerp: 0.1, smoothWheel: true, anchors: true });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    window.lenis = lenis;
  }
  $$("video[data-video]").forEach((v) => v.play?.().catch(() => {}));

  // Bouton magnétique (souris seulement)
  if (matchMedia("(hover: hover) and (pointer: fine)").matches) {
    $$("[data-magnetic]").forEach((b) => {
      const x = gsap.quickTo(b, "x", { duration: 0.5, ease: "power3.out" });
      const y = gsap.quickTo(b, "y", { duration: 0.5, ease: "power3.out" });
      b.addEventListener("pointermove", (e) => { const r = b.getBoundingClientRect(); x((e.clientX - r.left - r.width / 2) * 0.22); y((e.clientY - r.top - r.height / 2) * 0.3); });
      b.addEventListener("pointerleave", () => { x(0); y(0); });
    });
  }

  document.fonts.ready.then(() => {
    /* Titres : une mise en scène par écran, en opacité et translation */
    $$("[data-titre]").forEach((t) => {
      const ecran = t.closest("[data-ecran]");
      const premier = ecran?.dataset.ecran === "1";
      const lignes = t.dataset.titre === "lignes";
      const split = SplitText.create(t, lignes ? { type: "lines", mask: "lines", autoSplit: true } : { type: "words" });
      const cibles = lignes ? split.lines : split.words;
      const suite = $$("[data-apparait]", ecran);
      const tl = gsap.timeline(premier ? { delay: 0.25 } : { scrollTrigger: { trigger: t, start: "top 82%", once: true } });
      tl.from(cibles, lignes
        ? { yPercent: 110, duration: 1.1, ease: "expo.out", stagger: 0.09 }
        : { opacity: 0, y: 28, duration: 0.9, ease: "power3.out", stagger: 0.07 });
      if (suite.length) tl.from(suite, { opacity: 0, y: 14, duration: 0.8, ease: "power2.out", stagger: 0.12 }, "-=0.6");
      // Au clavier, le focus arrive avant l'animation : on la termine pour que le bouton soit visible tout de suite
      ecran?.addEventListener("focusin", () => tl.progress(1));
    });
    // L'ouverture est collée sous l'écran 02 : au clavier, son bouton ramène en haut de page
    $("#ecran-01").addEventListener("focusin", () => {
      if (scrollY > 4) { if (lenis) lenis.scrollTo(0, { immediate: true, force: true }); else scrollTo(0, 0); }
    });

    /* 01 → 02 : l'écran 02 glisse sur l'ouverture collée ; sa fenêtre arrondie s'ouvre en plein cadre */
    const e2 = $("#ecran-02");
    gsap.timeline({ scrollTrigger: { trigger: e2, start: "top bottom", end: "top top", scrub: true } })
      .fromTo("[data-fenetre]", { clipPath: "inset(16% 9% 0% 9% round 36px)" }, { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "none" }, 0)
      .fromTo("[data-fenetre] img", { scale: 1.28 }, { scale: 1.04, ease: "none" }, 0)
      .to("#ecran-01 video", { scale: 1.1, opacity: 0.35, ease: "none" }, 0)
      .to("#ecran-01 .texte", { opacity: 0, y: -40, ease: "none" }, 0);
    // 02 → 03 : fondu au noir pendant que la scène de torréfaction monte
    gsap.to("[data-fenetre]", { opacity: 0.15, ease: "none", scrollTrigger: { trigger: e2, start: "bottom bottom", end: "bottom top", scrub: true } });

    /* 03 · Torréfaction : séquence + minuteur + titre qui se recompose */
    const scTorref = $("[data-scene='torref']");
    if (scTorref && seq) {
      ScrollTrigger.create({ trigger: scTorref, start: "top 250%", once: true, onEnter: seq.toutCharger });
      const minuteur = $("[data-minuteur]", scTorref);
      const temps = { s: 0 };
      const majTemps = () => { const s = Math.round(temps.s); minuteur.textContent = `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`; };
      const a = SplitText.create($(".t-torref .a", scTorref), { type: "chars" });
      const b = SplitText.create($(".t-torref .b", scTorref), { type: "words,chars" });
      gsap.set(b.chars, { opacity: 0, yPercent: 60 });
      gsap.set($(".t-torref .b", scTorref), { opacity: 1 });
      // Dans l'ordre du métier : 0,10 → 0,72, le minuteur tourne sur le tambour fermé (image 0 assombrie,
      // on devine la machine, pas le vidage) ; à 12:00 seulement, l'image s'éclaire et les 61 images jouent le vidage.
      const tl = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: scTorref, start: "top top", end: "bottom bottom", scrub: 0.6 } });
      tl.fromTo(cv, { opacity: 0, scale: 1.06, filter: "brightness(0.5) blur(4px)" }, { opacity: 0.3, scale: 1, duration: 0.1 }, 0)
        .to(temps, { s: 720, duration: 0.62, onUpdate: majTemps }, 0.1)
        .fromTo("[data-crac]", { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.04, ease: "back.out(3)" }, 0.1 + 0.62 * 9 / 12)
        .to(cv, { opacity: 1, filter: "brightness(1) blur(0px)", duration: 0.06 }, 0.7)
        .to(a.chars, { opacity: 0, yPercent: -60, duration: 0.04, stagger: 0.004, ease: "power2.in" }, 0.68)
        .to(b.chars, { opacity: 1, yPercent: 0, duration: 0.05, stagger: 0.003, ease: "power3.out" }, 0.72)
        .to(seq, { f: seq.n - 1, duration: 0.26, onUpdate: seq.dessiner }, 0.72)
        .to({}, { duration: 0.04 });
    }

    /* 04 · Livraison : le rideau se lève sur le jeudi (desktop) ; fondu enchaîné (mobile) */
    const scLivr = $("[data-scene='livraison']");
    if (scLivr) {
      gsap.matchMedia().add({ grand: "(min-width: 768px)", petit: "(max-width: 767px)" }, (ctx) => {
        const tl = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: scLivr, start: "top top", end: "bottom bottom", scrub: 0.5 } });
        tl.fromTo("[data-envoi] img", { scale: 1.08 }, { scale: 1, duration: 1 }, 0);
        if (ctx.conditions.grand) tl.fromTo("[data-tasse]", { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.6, ease: "power1.inOut" }, 0.1)
          .fromTo("[data-tasse] img", { scale: 1.2, yPercent: 8 }, { scale: 1, yPercent: 0, duration: 0.7 }, 0.1);
        else tl.fromTo("[data-tasse]", { opacity: 0 }, { opacity: 1, duration: 0.5 }, 0.2)
          .fromTo("[data-tasse] img", { scale: 1.12 }, { scale: 1, duration: 0.7 }, 0.2);
        tl.fromTo("[data-l2]", { opacity: 0.25 }, { opacity: 1, duration: 0.2 }, 0.45)
          .fromTo("[data-l3]", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.2 }, 0.62)
          .to({}, { duration: 0.15 });
      });
    }

    /* 05 · Les cafés : fondu enchaîné épinglé, la couleur du champ suit le sachet */
    const scCafes = $("[data-scene='cafes']");
    if (scCafes) {
      const plans = $$("[data-cafe]", scCafes);
      const titre = $("[data-titre-cafes]", scCafes);
      gsap.set(plans.slice(1), { opacity: 0 });
      const tl = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: scCafes, start: "top top", end: "bottom bottom", scrub: 0.5 } });
      tl.to({}, { duration: 0.5 });
      plans.slice(1).forEach((p, i) => {
        const t = 0.5 + i * 1.3;
        tl.to($(".nom", plans[i]), { opacity: 0, y: -40, duration: 0.25, ease: "power1.in" }, t - 0.05)
          .fromTo(p, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power1.inOut" }, t)
          .fromTo($(".couv", p), { scale: 1.1 }, { scale: 1, duration: 1 }, t)
          .fromTo($(".nom", p), { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, t + 0.25);
        if (i === 0) tl.to(titre, { color: "#FFFDF8", duration: 0.2 }, t + 0.2);
      });
      tl.to({}, { duration: 0.6 });
      // Plan actif : seul lui reçoit les clics (les autres sont transparents mais au-dessus) ;
      // la barre mobile reprend son nom. Le plan i (i ≥ 1) prend la main à 0,5 + (i − 1) × 1,3 + 0,25.
      const bascules = plans.slice(1).map((_, i) => 0.75 + i * 1.3);
      let actif = -1;
      const majActif = () => {
        const i = bascules.filter((t) => tl.time() >= t).length;
        if (i === actif) return;
        actif = i;
        plans.forEach((p, k) => p.classList.toggle("is-actif", k === i));
        cafeVu = nomPlan(plans[i]);
        majBarre();
      };
      tl.eventCallback("onUpdate", majActif);
      majActif();
      // Au clavier, « Choisir El Mirador » : on défile jusqu'au moment où ce plan est à l'écran
      // (après le défilement automatique du navigateur, qui ne connaît pas la scène épinglée)
      const centres = plans.map((_, i) => (i === 0 ? 0.3 : 0.5 + (i - 1) * 1.3 + 0.9));
      plans.forEach((p, i) => $(".choisir", p)?.addEventListener("focus", () => requestAnimationFrame(() => {
        const st = tl.scrollTrigger;
        const y = st.start + (st.end - st.start) * (centres[i] / tl.duration());
        if (Math.abs(scrollY - y) < 8) return;
        if (lenis) lenis.scrollTo(y, { immediate: true, force: true }); else scrollTo(0, y);
      })));
      gsap.fromTo($(".couv", plans[0]), { scale: 1.12 }, { scale: 1, ease: "none", scrollTrigger: { trigger: scCafes, start: "top bottom", end: "top top", scrub: true } });
    }

    /* 06 · Offre : l'iris s'ouvre sur l'outremer ; le sachet tourne pendant la traversée */
    gsap.timeline({ scrollTrigger: { trigger: offre, start: "top bottom", end: "top top", scrub: true } })
      .fromTo("[data-iris]", { clipPath: "circle(6% at 66% 58%)" }, { clipPath: "circle(125% at 66% 58%)", ease: "power1.in" }, 0)
      .fromTo("[data-sachet]", { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, ease: "power2.out" }, 0.25)
      .fromTo("[data-offre] > *", { opacity: 0, y: 40 }, { opacity: 1, y: 0, stagger: 0.08, ease: "power2.out" }, 0.45);
    // Le sachet pivote légèrement (±8°) et monte pendant la traversée : jamais de flanc, toujours l'étiquette
    gsap.fromTo("[data-sachet] .couv", { rotateY: -8, yPercent: 5 }, { rotateY: 8, yPercent: -5, ease: "none", scrollTrigger: { trigger: offre, start: "top bottom", end: "bottom top", scrub: 0.6 } });

    /* 07 · Atelier : l'image tient pendant que le cadre monte (rideau), puis zoom lent */
    const img7 = $("#ecran-07 [data-lent]");
    gsap.fromTo(img7, { yPercent: -14, scale: 1.3 }, { yPercent: 0, scale: 1.06, ease: "none", scrollTrigger: { trigger: "#ecran-07", start: "top bottom", end: "top top", scrub: true } });
    gsap.fromTo(img7, { scale: 1.06 }, { scale: 1.16, ease: "none", immediateRender: false, scrollTrigger: { trigger: "#ecran-07", start: "top top", end: "bottom top", scrub: true } });

    /* 08 · Dernier écran : zoom arrière lent sur la Corniche */
    gsap.fromTo("#ecran-08 [data-lent]", { scale: 1.2 }, { scale: 1, ease: "none", scrollTrigger: { trigger: "#ecran-08", start: "top bottom", end: "top top", scrub: true } });

    ScrollTrigger.refresh();
  });
})();
