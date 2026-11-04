/*
 * Lance ton site — bibliothèque de gestes (maquette animée et site).
 * Version 2, issue de l'exemple « b2b-vigie » : voir NOTES.md pour la liste des changements.
 * Dépendances : GSAP 3.13+ (ScrollTrigger, SplitText), Lenis 1.3+.
 * Chaque geste se branche par un attribut data-* dans le HTML. Catalogue complet :
 * commun/niveau-agence.md § 4.
 *
 * Anti-flash : mettre dans <head>
 *   <script>document.documentElement.classList.add("js-attente");setTimeout(()=>document.documentElement.classList.remove("js-attente"),2500)</script>
 *   et en CSS : .js-attente [data-split]{visibility:hidden}
 *
 *   data-split="lines|words"     texte révélé ligne par ligne ou mot par mot
 *   data-split-scrub             … piloté par le défilement (s'allume en lisant)
 *   data-reveal / data-reveal-group + data-reveal-item   apparition (en cascade)
 *   data-intro                   NOUVEAU — apparition au chargement (premier écran), dans l'ordre du DOM
 *   data-image-reveal            image dévoilée (masque + léger zoom arrière)
 *   data-parallax="0.15"         parallaxe (fraction de la hauteur de l'élément)
 *   data-hero-pin                hero épinglé : [data-hero-media] grandit, [data-hero-fade] s'efface
 *                                v2 : [data-hero-zoom] (ou l'image) zoome lentement ; la section émet l'événement « progression » (detail = 0 à 1)
 *   data-grow                    image qui passe de la carte au plein écran
 *   data-steps + data-step / data-step-media   section épinglée en étapes
 *     data-steps-mobile="stack"  sur téléphone : pas d'épinglage, étapes empilées
 *     [data-step-progress]       barre de progression (scaleX) ; [data-step-count] numéro courant
 *   data-trace                   NOUVEAU — narration au défilement d'un tracé (courbe, plan, carte)
 *     [data-trace-wipe="0,0.8"]  se dévoile de gauche à droite entre deux fractions du défilement
 *     [data-trace-note="0.4"]    s'affiche quand le défilement dépasse la fraction
 *     [data-trace-out] + data-trace-labels="S-8,S-7,…"   libellé courant (semaine, étape…)
 *                                v2 : émet aussi « progression » ; épinglage 1,5 écran (ordinateur), 1,2 (téléphone)
 *   data-coulisse + [data-coulisse-bec]        v2 — pied à coulisse : le bec mobile s'ouvre sur la largeur du chiffre
 *   data-hscroll + data-hscroll-track          galerie horizontale au défilement
 *   data-video-scrub             vidéo dont le défilement pilote la lecture
 *   data-sequence="url-{i}.webp" data-frames="120"   séquence d'images sur canvas
 *   data-counter="47300"         compteur (chiffre réel), formaté en français
 *     data-counter-decimals="1" data-counter-prefix="" data-counter-suffix=" €"
 *   data-live-rate="0.18"        NOUVEAU — valeur qui grimpe en continu tant qu'elle est à l'écran
 *   data-live-jitter="2.14"      NOUVEAU — mesure « vivante » qui oscille autour d'une valeur
 *   data-bar="0.42"              NOUVEAU — barre de comparaison (scaleX) ; style="--v:.42" sans JS
 *   data-marquee="35"            bande défilante, boucle exacte ; data-marquee-scroll : suit le défilement
 *     [data-marquee-toggle]      v2 — bouton pause / lecture (aria-pressed), respecté par le ticker
 *   data-header                  NOUVEAU — en-tête qui se cache en descendant, revient en remontant
 *     data-header-cache-sur="#id"  v3 — reste caché tant qu'il recouvrirait le titre de ces sections
 *   data-sticky-cta              NOUVEAU — action principale collée en bas (téléphone) après le hero
 *     data-sticky-after="#id"  data-sticky-hide="#id"  v2 : data-sticky-pause="#id" (s'efface pendant un épinglage)
 *   details[data-accordion]      NOUVEAU — accordéon (contenu [data-accordion-body] qui glisse)
 *   data-bg="#1f1a17"            la page change de fond quand la section arrive
 *   data-magnetic="0.25"         bouton magnétique
 *   data-tilt                    carte en léger relief au survol
 *   data-follow-list + data-follow-img="url"   image calée à droite de la liste, qui suit le curseur en y
 *   data-cursor + data-cursor-label="Voir"     curseur personnalisé contextuel
 *   <model-viewer data-model-scroll="360" data-model-pitch="75">  objet 3D qui tourne au défilement
 *                                v2 : data-model-lock (posé par la page) fige la caméra, ex. vue « taille réelle »
 *   [data-depth="0.04"] dans [data-depth-scene]   couches (PNG détourés) qui suivent la souris
 */
(() => {
  const root = document.documentElement;
  const fin = () => root.classList.remove("js-attente");
  const { gsap, ScrollTrigger, SplitText, Lenis } = window;

  // Garde-fou : si un CDN ne répond pas, la page reste entière et lisible.
  if (!gsap || !ScrollTrigger) {
    root.classList.add("motion-reduit");
    fin();
    return;
  }
  gsap.registerPlugin(ScrollTrigger, ...(SplitText ? [SplitText] : []));
  gsap.defaults({ ease: "power3.out", duration: 0.9 });

  const $$ = (sel, scope = document) => Array.from(scope.querySelectorAll(sel));
  const reduit = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const tactile = matchMedia("(pointer: coarse)").matches;

  // ---------------------------------------------------------------- utilitaires
  const nombre = (el, v) => {
    const d = parseInt(el.dataset.counterDecimals || "0", 10);
    const txt = new Intl.NumberFormat("fr-FR", { minimumFractionDigits: d, maximumFractionDigits: d, useGrouping: "always" }).format(v);
    return (el.dataset.counterPrefix || "") + txt + (el.dataset.counterSuffix || "");
  };

  // ---------------------------------------------------------------- gestes utiles même en mouvement réduit
  // Compteurs : valeur finale formatée.
  $$("[data-counter]").forEach((el) => {
    const v = parseFloat(el.dataset.counter);
    if (!Number.isNaN(v)) el.textContent = nombre(el, v);
  });

  // Valeur qui grimpe tant qu'elle est à l'écran (coût d'un arrêt qui court…).
  $$("[data-live-rate]").forEach((el) => {
    const taux = parseFloat(el.dataset.liveRate);
    let total = 0, visible = false, t0 = 0;
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; t0 = performance.now(); }).observe(el);
    setInterval(() => {
      if (!visible) return;
      const t = performance.now();
      total += ((t - t0) / 1000) * taux; t0 = t;
      el.textContent = nombre(el, total);
    }, 250);
  });

  // En-tête : état « défilé » (fond plein) ; masquage en descendant seulement si mouvement autorisé.
  // v3 : data-header-cache-sur="#id,…" : l'en-tête reste caché tant qu'il recouvrirait le titre de ces sections
  // (titre d'une section épinglée, collé en haut de l'écran, qui passerait dessous quand on remonte).
  $$("[data-header]").forEach((h) => {
    let cache = false;
    const titres = (h.dataset.headerCacheSur ? $$(h.dataset.headerCacheSur) : []).map((sec) => sec.querySelector("h1,h2,h3") || sec);
    // marge de 30 % d'écran au-dessus : l'en-tête est déjà parti quand le titre redescend dans l'écran
    const couvre = () => { const y = h.offsetHeight + 8; return titres.some((t) => { const r = t.getBoundingClientRect(); return r.top < y && r.bottom > -0.3 * innerHeight; }); };
    ScrollTrigger.create({
      start: 0, end: "max",
      onUpdate: (s) => {
        h.classList.toggle("is-defile", s.scroll() > 40);
        if (reduit) return;
        const doitCacher = ((s.direction === 1 && s.scroll() > innerHeight * 0.9) || couvre()) && !h.contains(document.activeElement);
        if (doitCacher !== cache) { cache = doitCacher; gsap.to(h, { yPercent: cache ? -110 : 0, duration: 0.45, ease: "power2.out" }); }
      },
    });
  });

  // Action principale collée en bas sur téléphone, après le hero, cachée près du formulaire final.
  $$("[data-sticky-cta]").forEach((bar) => {
    const apres = document.querySelector(bar.dataset.stickyAfter || "main > section");
    const cacheSur = bar.dataset.stickyHide ? document.querySelector(bar.dataset.stickyHide) : null;
    let passe = false, masque = false, pause = false;
    const maj = () => {
      const on = passe && !masque && !pause;
      bar.classList.toggle("is-visible", on);
      bar.toggleAttribute("inert", !on);
      if (reduit) gsap.set(bar, { yPercent: on ? 0 : 120 });
      else gsap.to(bar, { yPercent: on ? 0 : 120, duration: 0.5, ease: "power3.out" });
    };
    gsap.set(bar, { y: 0, yPercent: 120 }); bar.setAttribute("inert", ""); // y: 0 écrase la translation posée en CSS avant le JS
    if (apres) ScrollTrigger.create({ trigger: apres, start: "bottom 60%", onToggle: () => {}, onEnter: () => { passe = true; maj(); }, onLeaveBack: () => { passe = false; maj(); } });
    if (cacheSur) ScrollTrigger.create({ trigger: cacheSur, start: "top bottom", end: "bottom top", onToggle: (s) => { masque = s.isActive; maj(); } });
    // v2 : data-sticky-pause="#id" : la barre s'efface pendant l'épinglage de ces sections (elles émettent « progression »)
    (bar.dataset.stickyPause ? $$(bar.dataset.stickyPause) : []).forEach((sec) => sec.addEventListener("progression", (e) => {
      const p = e.detail > 0.002 && e.detail < 0.998;
      if (p !== pause) { pause = p; maj(); }
    }));
  });

  // Accordéon : ouverture native (<details>, exclusif avec name=""), contenu qui glisse.
  $$("details[data-accordion]").forEach((d) => {
    const corps = d.querySelector("[data-accordion-body]");
    d.addEventListener("toggle", () => {
      if (d.open && corps && !reduit) gsap.fromTo(corps, { autoAlpha: 0, y: -10 }, { autoAlpha: 1, y: 0, duration: 0.45 });
    });
  });

  if (reduit) {
    // État final immédiat : rien de caché, pas de défilement doux, vidéos sur l'affiche.
    root.classList.add("motion-reduit");
    $$("video[autoplay]").forEach((v) => { v.pause(); v.removeAttribute("autoplay"); v.currentTime = 0; });
    $$("[data-bar]").forEach((b) => gsap.set(b, { scaleX: parseFloat(b.dataset.bar) }));
    $$("model-viewer[data-model-scroll]").forEach((mv) => mv.removeAttribute("auto-rotate"));
    $$("[data-marquee-toggle]").forEach((b) => (b.hidden = true)); // la bande ne bouge pas
    // Tracé affiché en entier : le libellé courant prend sa dernière valeur (S-0, pas S-8).
    $$("[data-trace]").forEach((sec) => {
      const out = sec.querySelector("[data-trace-out]"), l = (sec.dataset.traceLabels || "").split(",").filter(Boolean);
      if (out && l.length) out.textContent = l[l.length - 1];
    });
    fin();
    return;
  }
  root.classList.add("motion");

  // Défilement doux, synchronisé avec ScrollTrigger.
  const lenis = Lenis ? new Lenis({ lerp: 0.1, smoothWheel: true, anchors: { offset: -72 } }) : null;
  if (lenis) {
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    window.lenis = lenis;
  }

  const mm = gsap.matchMedia();
  // Les sections épinglées diffusent leur avancement (0 à 1) : la page s'y branche (puce du hero, son, etc.).
  const progression = (el) => (s) => el.dispatchEvent(new CustomEvent("progression", { detail: s.progress }));

  // ---------------------------------------------------------------- textes
  if (SplitText) $$("[data-split]").forEach((el) => {
    const type = el.dataset.split === "words" ? "words" : "lines";
    const scrub = el.hasAttribute("data-split-scrub");
    SplitText.create(el, {
      type: type === "lines" ? "lines" : "words,lines",
      mask: scrub ? undefined : "lines",
      autoSplit: true,
      onSplit(self) {
        gsap.set(el, { visibility: "visible" });
        // Les capitales accentuées (É, Ê, Â) dépassent la ligne : on agrandit le masque sans bouger la mise en page.
        if (self.masks?.length) gsap.set(self.masks, { paddingTop: "0.16em", marginTop: "-0.16em", paddingBottom: "0.08em", marginBottom: "-0.08em" });
        const cibles = self[type];
        if (scrub) {
          return gsap.fromTo(cibles, { opacity: 0.18 }, {
            opacity: 1, stagger: 0.1, ease: "none",
            scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: 1 },
          });
        }
        return gsap.from(cibles, {
          yPercent: 110, duration: 1, ease: "power4.out",
          stagger: type === "lines" ? 0.11 : 0.05,
          delay: parseFloat(el.dataset.splitDelay || "0"),
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      },
    });
  });

  // ---------------------------------------------------------------- apparitions
  // Intro du premier écran : joue au chargement, pas au défilement (sinon ce qui est sous la ligne de flottaison reste caché).
  const intro = $$("[data-intro]");
  if (intro.length) gsap.from(intro, { y: 28, autoAlpha: 0, duration: 1, stagger: 0.1, delay: 0.35, ease: "power3.out" });
  $$("[data-reveal-group]").forEach((g) => {
    gsap.from($$("[data-reveal-item]", g), {
      y: 40, autoAlpha: 0, stagger: 0.09,
      scrollTrigger: { trigger: g, start: "top 84%", once: true },
    });
  });
  $$("[data-reveal]").forEach((el) => {
    gsap.from(el, { y: 32, autoAlpha: 0, scrollTrigger: { trigger: el, start: "top 88%", once: true } });
  });
  $$("[data-image-reveal]").forEach((fig) => {
    const img = fig.querySelector("img, video");
    gsap.timeline({ scrollTrigger: { trigger: fig, start: "top 84%", once: true } })
      .fromTo(fig, { clipPath: "inset(18% 12% 18% 12%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "power4.inOut" })
      .from(img, { scale: 1.25, duration: 1.6, ease: "power3.out" }, 0);
  });

  // Barres de comparaison
  $$("[data-bar]").forEach((b) => {
    gsap.fromTo(b, { scaleX: 0 }, {
      scaleX: parseFloat(b.dataset.bar), duration: 1.2, ease: "power3.inOut",
      scrollTrigger: { trigger: b, start: "top 90%", once: true },
    });
  });

  // ---------------------------------------------------------------- parallaxe
  $$("[data-parallax]").forEach((el) => {
    const v = parseFloat(el.dataset.parallax || "0.15");
    gsap.fromTo(el, { yPercent: -v * 50 }, {
      yPercent: v * 50, ease: "none",
      scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
    });
  });

  // ---------------------------------------------------------------- narrations épinglées
  mm.add({ grand: "(min-width: 768px)", petit: "(max-width: 767px)" }, (ctx) => {
    const { grand } = ctx.conditions;
    const long = grand ? 1.6 : 0.9; // hauteurs d'écran

    $$("[data-hero-pin]").forEach((hero) => {
      gsap.timeline({
        scrollTrigger: { trigger: hero, start: "top top", end: `+=${long * 50}%`, scrub: 1, pin: true, anticipatePin: 1, onUpdate: progression(hero) },
      })
        .fromTo(hero.querySelector("[data-hero-media]"), { clipPath: "inset(0% 0% 0% 0% round 0px)", scale: 1 },
          { clipPath: grand ? "inset(6% 4% 6% 4% round 18px)" : "inset(4% 3% 4% 3% round 14px)", scale: 0.96, ease: "none" }, 0)
        .fromTo(hero.querySelector("[data-hero-zoom]") || hero.querySelector("[data-hero-media] > img"), { scale: 1 }, { scale: 1.08, ease: "none" }, 0)
        .to(hero.querySelector("[data-hero-fade]"), { autoAlpha: 0, y: -60, ease: "none" }, 0.2);
    });

    $$("[data-grow]").forEach((el) => {
      gsap.fromTo(el, { clipPath: grand ? "inset(16% 22% 16% 22% round 16px)" : "inset(10% 8% 10% 8% round 12px)" }, {
        clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "none",
        scrollTrigger: { trigger: el, start: "top 90%", end: "top 20%", scrub: 1 },
      });
    });

    $$("[data-steps]").forEach((sec) => {
      const etapes = $$("[data-step]", sec);
      const medias = $$("[data-step-media]", sec);
      const barre = sec.querySelector("[data-step-progress]");
      const compte = sec.querySelector("[data-step-count]");
      if (!grand && sec.dataset.stepsMobile === "stack") {
        etapes.forEach((e) => gsap.from(e, { y: 40, autoAlpha: 0, scrollTrigger: { trigger: e, start: "top 85%", once: true } }));
        return;
      }
      gsap.set([...etapes.slice(1), ...medias.slice(1)], { autoAlpha: 0 });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sec, start: "top top", end: `+=${etapes.length * long * 24}%`, scrub: 1, pin: true, anticipatePin: 1,
          onUpdate: (s) => { if (compte) compte.textContent = String(Math.min(etapes.length, Math.floor(s.progress * etapes.length) + 1)); },
        },
      });
      if (barre) tl.fromTo(barre, { scaleX: 1 / etapes.length }, { scaleX: 1, ease: "none", duration: (etapes.length - 1) * 1 }, 0);
      etapes.forEach((e, i) => {
        if (i === 0) return;
        const at = (i - 1) * 1 + 0.25;
        tl.to([etapes[i - 1], medias[i - 1]].filter(Boolean), { autoAlpha: 0, y: -30, duration: 0.5 }, at)
          .fromTo([e, medias[i]].filter(Boolean), { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.5 }, at + 0.2);
        if (medias[i]) tl.fromTo(medias[i], { scale: 1.12 }, { scale: 1, duration: 1, ease: "none" }, at);
      });
    });

    // Tracé raconté au défilement (courbe, plan…), dévoilé par clip-path.
    $$("[data-trace]").forEach((sec) => {
      const wipes = $$("[data-trace-wipe]", sec);
      const notes = $$("[data-trace-note]", sec);
      const out = sec.querySelector("[data-trace-out]");
      const labels = (sec.dataset.traceLabels || "").split(",").filter(Boolean);
      const etat = new Map();
      gsap.set(notes, { autoAlpha: 0, y: 14 });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sec, start: "top top", end: `+=${(grand ? 1.5 : 1.2) * 100}%`, scrub: 0.6, pin: true, anticipatePin: 1,
          onUpdate: (s) => {
            const p = s.progress;
            sec.dispatchEvent(new CustomEvent("progression", { detail: p }));
            notes.forEach((n) => {
              const on = p >= parseFloat(n.dataset.traceNote);
              if (etat.get(n) !== on) { etat.set(n, on); gsap.to(n, { autoAlpha: on ? 1 : 0, y: on ? 0 : 14, duration: 0.35, overwrite: true }); }
            });
            if (out && labels.length) out.textContent = labels[Math.round(p * (labels.length - 1))];
          },
        },
      });
      wipes.forEach((w) => {
        const [a, b] = (w.dataset.traceWipe || "0,1").split(",").map(parseFloat);
        tl.fromTo(w, { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none", duration: b - a }, a);
      });
      tl.set({}, {}, 1); // la frise dure toujours 1, même si le dernier tracé finit avant
    });

    $$("[data-hscroll]").forEach((sec) => {
      const piste = sec.querySelector("[data-hscroll-track]");
      gsap.to(piste, {
        x: () => -(piste.scrollWidth - innerWidth), ease: "none",
        scrollTrigger: { trigger: sec, start: "top top", end: () => `+=${piste.scrollWidth - innerWidth}`, scrub: 1, pin: true, invalidateOnRefresh: true },
      });
    });
  });

  // ---------------------------------------------------------------- médias pilotés
  $$("[data-video-scrub]").forEach((v) => {
    v.pause();
    v.addEventListener("loadedmetadata", () => {
      gsap.to(v, { currentTime: v.duration, ease: "none",
        scrollTrigger: { trigger: v.parentElement, start: "top top", end: "+=150%", scrub: true, pin: v.parentElement } });
    });
  });

  $$("canvas[data-sequence]").forEach((cv) => {
    const n = parseInt(cv.dataset.frames || "60", 10);
    const url = (i) => cv.dataset.sequence.replace("{i}", String(i).padStart(4, "0"));
    const images = Array.from({ length: n }, (_, i) => { const im = new Image(); im.src = url(i + 1); return im; });
    const c = cv.getContext("2d");
    const etat = { f: 0 };
    const dessiner = () => { const im = images[Math.round(etat.f)]; if (im.complete) { cv.width = im.naturalWidth; cv.height = im.naturalHeight; c.drawImage(im, 0, 0); } };
    images[0].onload = dessiner;
    gsap.to(etat, { f: n - 1, snap: "f", ease: "none", onUpdate: dessiner,
      scrollTrigger: { trigger: cv.parentElement, start: "top top", end: "+=200%", scrub: 0.5, pin: true } });
  });

  // Objet 3D piloté par le défilement (model-viewer) : rotation + légère bascule.
  $$("model-viewer[data-model-scroll]").forEach((mv) => {
    const tour = parseFloat(mv.dataset.modelScroll || "360");
    const depart = parseFloat(mv.dataset.modelFrom || "0");
    const pitch = parseFloat(mv.dataset.modelPitch || "75");
    const etat = { a: depart, p: pitch + 12 };
    mv.removeAttribute("auto-rotate");
    let touche = false; // dès que l'utilisateur manipule l'objet, le défilement ne le reprend plus
    mv.addEventListener("pointerdown", () => { touche = true; });
    gsap.to(etat, { a: depart + tour, p: pitch - 8, ease: "none",
      onUpdate: () => { if (!touche && !mv.hasAttribute("data-model-lock")) mv.setAttribute("camera-orbit", `${etat.a}deg ${etat.p}deg auto`); /* attribut : marche aussi si model-viewer est chargé plus tard */ },
      scrollTrigger: { trigger: mv.closest("section") || mv, start: "top bottom", end: "bottom top", scrub: 1 } });
  });

  // ---------------------------------------------------------------- pied à coulisse
  // [data-coulisse] + [data-coulisse-bec] : le bec mobile s'ouvre sur la largeur du chiffre pendant que le compteur monte.
  $$("[data-coulisse]").forEach((c) => {
    const bec = c.querySelector("[data-coulisse-bec]");
    if (!bec) return;
    gsap.fromTo(bec, { x: () => -(c.offsetWidth - 3) }, { x: 0, duration: 1.7, ease: "power3.inOut",
      scrollTrigger: { trigger: c, start: "top 88%", once: true } });
  });

  // ---------------------------------------------------------------- compteurs
  $$("[data-counter]").forEach((el) => {
    const v = parseFloat(el.dataset.counter);
    if (Number.isNaN(v)) return; // chiffre pas encore connu
    const cible = { v: 0 };
    el.textContent = nombre(el, 0);
    gsap.to(cible, { v, duration: parseFloat(el.dataset.counterDuration || "1.8"), ease: "power2.out",
      onUpdate: () => { el.textContent = nombre(el, cible.v); },
      scrollTrigger: { trigger: el, start: "top 90%", once: true } });
  });

  // Mesure « vivante » : oscille autour d'une valeur (télémétrie d'un capteur).
  $$("[data-live-jitter]").forEach((el) => {
    const base = parseFloat(el.dataset.liveJitter);
    const amp = parseFloat(el.dataset.liveAmp || "0.06");
    el.dataset.counterDecimals ||= "2";
    setInterval(() => { if (!document.hidden) el.textContent = nombre(el, base + (Math.random() - 0.5) * 2 * amp); }, 900);
  });

  // ---------------------------------------------------------------- bande défilante
  $$("[data-marquee]").forEach((m) => {
    const piste = m.firstElementChild;
    const n = piste.children.length;
    piste.append(...Array.from(piste.children).map((el) => { const c = el.cloneNode(true); c.setAttribute("aria-hidden", "true"); return c; }));
    // Boucle exacte : on recule de la position du premier clone (gap compris), pas de 50 %.
    const distance = () => piste.children[n].offsetLeft - piste.children[0].offsetLeft;
    const tw = gsap.fromTo(piste, { x: 0 }, { x: () => -distance(), duration: parseFloat(m.dataset.marquee || "30"), ease: "none", repeat: -1 });
    ScrollTrigger.addEventListener("refreshInit", () => { const t = tw.progress(); tw.invalidate().progress(t); });
    let survol = 1, arret = false;
    const btn = m.querySelector("[data-marquee-toggle]");
    if (btn) btn.addEventListener("click", () => {
      arret = !arret;
      btn.setAttribute("aria-pressed", String(arret));
      const l = btn.querySelector("[data-marquee-label]"); if (l) l.textContent = arret ? "Relancer la bande" : "Mettre la bande en pause";
      btn.querySelector('[data-icone="pause"]')?.classList.toggle("hidden", arret);
      btn.querySelector('[data-icone="lecture"]')?.classList.toggle("hidden", !arret);
      arret ? tw.pause() : tw.resume();
    });
    m.addEventListener("pointerenter", () => { survol = 0.25; });
    m.addEventListener("pointerleave", () => { survol = 1; });
    let vitesse = 1;
    if (m.hasAttribute("data-marquee-scroll") && lenis) {
      lenis.on("scroll", ({ velocity }) => { vitesse = gsap.utils.clamp(-4, 4, velocity / 6); });
    }
    gsap.ticker.add(() => {
      if (arret) return;
      vitesse += ((vitesse >= 0 ? 1 : -1) - vitesse) * 0.05; // revient doucement au sens courant
      tw.timeScale(gsap.utils.interpolate(tw.timeScale(), vitesse * survol, 0.12) || 0.001);
    });
    ScrollTrigger.create({ trigger: m, onToggle: (s) => (s.isActive && !arret ? tw.resume() : tw.pause()) });
  });

  // ---------------------------------------------------------------- changement de fond
  // Attention : background-color n'est pas composité ; à réserver aux grandes bascules.
  $$("[data-bg]").forEach((sec) => {
    ScrollTrigger.create({
      trigger: sec, start: "top 55%", end: "bottom 55%",
      onToggle: (s) => s.isActive && gsap.to(document.body, { backgroundColor: sec.dataset.bg, color: sec.dataset.fg || "", duration: 0.8, ease: "power2.out" }),
    });
  });

  // Vidéos : lecture seulement à l'écran
  $$("video[autoplay]").forEach((v) => {
    ScrollTrigger.create({ trigger: v, onToggle: (s) => (s.isActive ? v.play().catch(() => {}) : v.pause()) });
  });

  // ---------------------------------------------------------------- pointeur (ordinateur seulement)
  if (!tactile) {
    $$("[data-magnetic]").forEach((el) => {
      const f = parseFloat(el.dataset.magnetic || "0.25");
      const x = gsap.quickTo(el, "x", { duration: 0.5 }), y = gsap.quickTo(el, "y", { duration: 0.5 });
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        x((e.clientX - r.left - r.width / 2) * f); y((e.clientY - r.top - r.height / 2) * f);
      });
      el.addEventListener("pointerleave", () => { x(0); y(0); });
    });

    $$("[data-tilt]").forEach((el) => {
      gsap.set(el, { transformPerspective: 900 });
      const rx = gsap.quickTo(el, "rotationX", { duration: 0.6 }), ry = gsap.quickTo(el, "rotationY", { duration: 0.6 });
      const force = parseFloat(el.dataset.tilt || "8") || 8;
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        ry(((e.clientX - r.left) / r.width - 0.5) * force); rx(-((e.clientY - r.top) / r.height - 0.5) * force);
      });
      el.addEventListener("pointerleave", () => { rx(0); ry(0); });
    });

    $$("[data-follow-list]").forEach((liste) => {
      const img = document.createElement("img");
      img.alt = "";
      img.setAttribute("aria-hidden", "true");
      Object.assign(img.style, { position: "fixed", left: "0", top: "0", zIndex: "50", width: "17rem", aspectRatio: "4 / 5", objectFit: "cover", borderRadius: "6px", pointerEvents: "none", opacity: "0" });
      document.body.append(img);
      $$("[data-follow-img]", liste).forEach((l) => { const p = new Image(); p.src = l.dataset.followImg; }); // préchargement
      gsap.set(img, { scale: 0.8, xPercent: -50, yPercent: -50 });
      const x = gsap.quickTo(img, "x", { duration: 0.55 }), y = gsap.quickTo(img, "y", { duration: 0.55 });
      const rot = gsap.quickTo(img, "rotation", { duration: 0.8 });
      let px = 0;
      // L'image reste calée en x dans la marge droite de la liste (colonne des libellés), à droite de
      // tout texte de description : elle ne suit que le y du curseur, et se masque s'il n'y a pas la place.
      let place = true;
      const caler = (ligne) => {
        const r = liste.getBoundingClientRect();
        const textes = $$("p", ligne).filter((p) => p.offsetParent && !p.classList.contains("etiquette"));
        const fin = Math.max(r.left, ...textes.map((p) => { const g = document.createRange(); g.selectNodeContents(p); return g.getBoundingClientRect().right; }));
        const w = Math.min(208, r.right - fin - 16);
        place = w >= 120;
        img.style.width = `${Math.max(w, 0)}px`;
        if (gsap.getProperty(img, "opacity") < 0.05) gsap.set(img, { x: r.right - w / 2 }); else x(r.right - w / 2);
      };
      liste.addEventListener("pointermove", (e) => { y(e.clientY); rot(gsap.utils.clamp(-6, 6, (e.clientY - px) * 0.4)); px = e.clientY; });
      // Le défilement déplace la liste sous un curseur immobile : on range l'image si on n'est plus dessus.
      addEventListener("scroll", () => { if (!liste.matches(":hover")) gsap.to(img, { autoAlpha: 0, scale: 0.8, duration: 0.25, overwrite: "auto" }); }, { passive: true });
      $$("[data-follow-img]", liste).forEach((ligne) => {
        ligne.addEventListener("pointerenter", () => { caler(ligne); img.src = ligne.dataset.followImg; gsap.to(img, { autoAlpha: place ? 1 : 0, scale: 1, duration: 0.4 }); });
        ligne.addEventListener("pointerleave", () => gsap.to(img, { autoAlpha: 0, scale: 0.8, duration: 0.3 }));
      });
    });

    $$("[data-depth-scene]").forEach((scene) => {
      const couches = $$("[data-depth]", scene).map((el) => ({
        f: parseFloat(el.dataset.depth || "0.04"),
        x: gsap.quickTo(el, "x", { duration: 0.8 }), y: gsap.quickTo(el, "y", { duration: 0.8 }) }));
      scene.addEventListener("pointermove", (e) => {
        const r = scene.getBoundingClientRect();
        const dx = e.clientX - r.left - r.width / 2, dy = e.clientY - r.top - r.height / 2;
        couches.forEach((c) => { c.x(dx * c.f); c.y(dy * c.f); });
      });
      scene.addEventListener("pointerleave", () => couches.forEach((c) => { c.x(0); c.y(0); }));
    });

    const curseur = document.querySelector("[data-cursor]");
    if (curseur) {
      const label = curseur.querySelector("span");
      const x = gsap.quickTo(curseur, "x", { duration: 0.35 }), y = gsap.quickTo(curseur, "y", { duration: 0.35 });
      addEventListener("pointermove", (e) => { x(e.clientX); y(e.clientY); });
      $$("[data-cursor-label]").forEach((el) => {
        el.addEventListener("pointerenter", () => { label.textContent = el.dataset.cursorLabel; gsap.to(curseur, { scale: 3.2, duration: 0.35 }); });
        el.addEventListener("pointerleave", () => { label.textContent = ""; gsap.to(curseur, { scale: 1, duration: 0.35 }); });
      });
    }
  }

  // Les gestes sont créés par type, pas dans l'ordre de la page : sans ce tri, une section épinglée
  // créée avant une autre placée plus haut calcule sa position sans l'espace de l'épinglage du dessus.
  ScrollTrigger.sort();
  ScrollTrigger.refresh();
  fin();
  addEventListener("load", () => { ScrollTrigger.sort(); ScrollTrigger.refresh(); });
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
})();
