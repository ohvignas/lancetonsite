/*
 * Lance ton site — bibliothèque de gestes (maquette animée et site).
 * Dépendances : GSAP 3.13+ (ScrollTrigger, SplitText), Lenis 1.3+.
 * Chaque geste se branche par un attribut data-* dans le HTML : aucune ligne à écrire
 * page par page. Voir le catalogue dans commun/niveau-agence.md § 4.
 *
 *   data-split="lines|words"     texte révélé ligne par ligne ou mot par mot
 *   data-split-scrub             … piloté par le défilement (s'allume en lisant)
 *   data-reveal / data-reveal-group + data-reveal-item   apparition (en cascade)
 *   data-image-reveal            image dévoilée (masque + léger zoom arrière)
 *   data-parallax="0.15"         parallaxe (fraction de la hauteur d'écran)
 *   data-hero-pin                hero épinglé : [data-hero-media] grandit, [data-hero-fade] s'efface
 *   data-grow                    image qui passe de la carte au plein écran
 *   data-steps + data-step / data-step-media   section épinglée en étapes
 *   data-hscroll + data-hscroll-track          galerie horizontale au défilement
 *   data-video-scrub             vidéo dont le défilement pilote la lecture
 *   data-sequence="url-{i}.webp" data-frames="120"   séquence d'images sur canvas
 *   data-counter="6"             compteur (chiffre réel seulement)
 *   data-marquee                 bande défilante (contenu dupliqué automatiquement)
 *   data-bg="#1f1a17"            la page change de fond quand la section arrive
 *   data-magnetic="0.25"         bouton magnétique
 *   data-tilt                    carte en léger relief au survol
 *   data-follow-list + data-follow-img="url"   image qui suit le curseur sur une liste
 *   data-cursor + data-cursor-label="Voir"     curseur personnalisé contextuel
 *   <model-viewer data-model-scroll="360">     objet 3D qui tourne de N degrés au défilement
 *   [data-depth="0.04"] dans [data-depth-scene]   couches (PNG détourés) qui suivent la souris
 */
(() => {
  const { gsap, ScrollTrigger, SplitText, Lenis } = window;
  gsap.registerPlugin(ScrollTrigger, SplitText);
  gsap.defaults({ ease: "power3.out", duration: 0.9 });

  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const reduit = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const tactile = matchMedia("(pointer: coarse)").matches;
  const root = document.documentElement;

  if (reduit) {
    // État final immédiat : rien de caché, pas de défilement doux, vidéos sur l'affiche.
    root.classList.add("motion-reduit");
    $$("video[autoplay]").forEach((v) => { v.pause(); v.removeAttribute("autoplay"); });
    $$("[data-counter]").forEach((el) => { el.textContent = el.dataset.counter; });
    return;
  }
  root.classList.add("motion");

  // Défilement doux, synchronisé avec ScrollTrigger.
  const lenis = new Lenis({ lerp: 0.09, smoothWheel: true, anchors: true });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  window.lenis = lenis;

  const mm = gsap.matchMedia();

  // Textes
  $$("[data-split]").forEach((el) => {
    const type = el.dataset.split === "words" ? "words" : "lines";
    const scrub = el.hasAttribute("data-split-scrub");
    SplitText.create(el, {
      type: type === "lines" ? "lines" : "words,lines",
      mask: scrub ? undefined : "lines",
      autoSplit: true,
      onSplit(self) {
        const cibles = self[type];
        if (scrub) {
          return gsap.fromTo(cibles, { opacity: 0.15 }, {
            opacity: 1, stagger: 0.1, ease: "none",
            scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: 1 },
          });
        }
        return gsap.from(cibles, {
          yPercent: 110, duration: 1, ease: "power4.out",
          stagger: type === "lines" ? 0.11 : 0.05,
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      },
    });
  });

  // Apparitions
  $$("[data-reveal-group]").forEach((g) => {
    gsap.from($$("[data-reveal-item]", g), {
      y: 40, autoAlpha: 0, stagger: 0.08,
      scrollTrigger: { trigger: g, start: "top 82%", once: true },
    });
  });
  $$("[data-reveal]").forEach((el) => {
    gsap.from(el, { y: 32, autoAlpha: 0, scrollTrigger: { trigger: el, start: "top 85%", once: true } });
  });
  $$("[data-image-reveal]").forEach((fig) => {
    const img = fig.querySelector("img, video");
    gsap.timeline({ scrollTrigger: { trigger: fig, start: "top 82%", once: true } })
      .fromTo(fig, { clipPath: "inset(18% 12% 18% 12%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "power4.inOut" })
      .from(img, { scale: 1.25, duration: 1.6, ease: "power3.out" }, 0);
  });

  // Parallaxe
  $$("[data-parallax]").forEach((el) => {
    const v = parseFloat(el.dataset.parallax || "0.15");
    gsap.fromTo(el, { yPercent: -v * 50 }, {
      yPercent: v * 50, ease: "none",
      scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
    });
  });

  // Narrations épinglées (desktop et mobile, plus courtes sur mobile)
  mm.add({ grand: "(min-width: 768px)", petit: "(max-width: 767px)" }, (ctx) => {
    const long = ctx.conditions.grand ? 1.6 : 0.9; // hauteurs d'écran

    $$("[data-hero-pin]").forEach((hero) => {
      gsap.timeline({
        scrollTrigger: { trigger: hero, start: "top top", end: `+=${long * 100}%`, scrub: 1, pin: true, anticipatePin: 1 },
      })
        .fromTo(hero.querySelector("[data-hero-media]"), { clipPath: "inset(4% 4% 4% 4% round 24px)", scale: 1.12 },
          { clipPath: "inset(0% 0% 0% 0% round 0px)", scale: 1, ease: "none" }, 0)
        .to(hero.querySelector("[data-hero-fade]"), { autoAlpha: 0, y: -60, ease: "none" }, 0.35);
    });

    $$("[data-grow]").forEach((el) => {
      gsap.fromTo(el, { clipPath: "inset(20% 25% 20% 25% round 20px)" }, {
        clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "none",
        scrollTrigger: { trigger: el, start: "top 85%", end: "top 15%", scrub: 1 },
      });
    });

    $$("[data-steps]").forEach((sec) => {
      const etapes = $$("[data-step]", sec);
      const medias = $$("[data-step-media]", sec);
      gsap.set([...etapes.slice(1), ...medias.slice(1)], { autoAlpha: 0 });
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sec, start: "top top", end: `+=${etapes.length * long * 60}%`, scrub: 1, pin: true, anticipatePin: 1 },
      });
      etapes.forEach((e, i) => {
        if (i === 0) return;
        tl.to([etapes[i - 1], medias[i - 1]].filter(Boolean), { autoAlpha: 0, y: -30, duration: 0.5 })
          .fromTo([e, medias[i]].filter(Boolean), { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.5 }, "<0.2");
      });
    });

    $$("[data-hscroll]").forEach((sec) => {
      const piste = sec.querySelector("[data-hscroll-track]");
      gsap.to(piste, {
        x: () => -(piste.scrollWidth - innerWidth), ease: "none",
        scrollTrigger: { trigger: sec, start: "top top", end: () => `+=${piste.scrollWidth - innerWidth}`, scrub: 1, pin: true, invalidateOnRefresh: true },
      });
    });
  });

  // Vidéo pilotée par le défilement
  $$("[data-video-scrub]").forEach((v) => {
    v.pause();
    v.addEventListener("loadedmetadata", () => {
      gsap.to(v, { currentTime: v.duration, ease: "none",
        scrollTrigger: { trigger: v.parentElement, start: "top top", end: "+=150%", scrub: true, pin: v.parentElement } });
    });
  });

  // Séquence d'images (façon Apple)
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

  // Objet 3D piloté par le défilement (model-viewer)
  $$("model-viewer[data-model-scroll]").forEach((mv) => {
    const tour = parseFloat(mv.dataset.modelScroll || "360");
    const etat = { a: 0 };
    mv.removeAttribute("auto-rotate");
    gsap.to(etat, { a: tour, ease: "none",
      onUpdate: () => mv.setAttribute("camera-orbit", `${etat.a}deg 75deg auto`),
      scrollTrigger: { trigger: mv.closest("section") || mv, start: "top bottom", end: "bottom top", scrub: 1 } });
  });

  // Compteurs
  $$("[data-counter]").forEach((el) => {
    if (Number.isNaN(parseFloat(el.dataset.counter))) return; // chiffre pas encore connu
    const cible = { v: 0 };
    gsap.to(cible, { v: parseFloat(el.dataset.counter), duration: 1.6, ease: "power2.out",
      onUpdate: () => { el.textContent = Math.round(cible.v); },
      scrollTrigger: { trigger: el, start: "top 90%", once: true } });
  });

  // Bande défilante
  $$("[data-marquee]").forEach((m) => {
    const piste = m.firstElementChild;
    piste.append(...Array.from(piste.children).map((n) => { const c = n.cloneNode(true); c.setAttribute("aria-hidden", "true"); return c; }));
    const tw = gsap.to(piste, { xPercent: -50, duration: parseFloat(m.dataset.marquee || "30"), ease: "none", repeat: -1 });
    m.addEventListener("pointerenter", () => gsap.to(tw, { timeScale: 0.25, duration: 0.6 }));
    m.addEventListener("pointerleave", () => gsap.to(tw, { timeScale: 1, duration: 0.6 }));
    ScrollTrigger.create({ trigger: m, onToggle: (s) => (s.isActive ? tw.play() : tw.pause()) });
  });

  // Changement de fond
  $$("[data-bg]").forEach((sec) => {
    ScrollTrigger.create({
      trigger: sec, start: "top 55%", end: "bottom 55%",
      onToggle: (s) => s.isActive && gsap.to(document.body, { backgroundColor: sec.dataset.bg, color: sec.dataset.fg || "", duration: 0.8, ease: "power2.out" }),
    });
  });

  // Vidéos : lecture seulement à l'écran
  $$("video[autoplay]").forEach((v) => {
    ScrollTrigger.create({ trigger: v, onToggle: (s) => (s.isActive ? v.play() : v.pause()) });
  });

  // Interactions de pointeur (desktop seulement)
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
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        ry(((e.clientX - r.left) / r.width - 0.5) * 8); rx(-((e.clientY - r.top) / r.height - 0.5) * 8);
      });
      el.addEventListener("pointerleave", () => { rx(0); ry(0); });
    });

    $$("[data-follow-list]").forEach((liste) => {
      const img = document.createElement("img");
      img.alt = "";
      img.className = "pointer-events-none fixed left-0 top-0 z-50 w-64 aspect-[4/5] object-cover rounded-xl opacity-0 scale-75";
      document.body.append(img);
      const x = gsap.quickTo(img, "x", { duration: 0.5 }), y = gsap.quickTo(img, "y", { duration: 0.5 });
      liste.addEventListener("pointermove", (e) => { x(e.clientX + 24); y(e.clientY - 160); });
      $$("[data-follow-img]", liste).forEach((ligne) => {
        ligne.addEventListener("pointerenter", () => { img.src = ligne.dataset.followImg; gsap.to(img, { autoAlpha: 1, scale: 1, duration: 0.4 }); });
        ligne.addEventListener("pointerleave", () => gsap.to(img, { autoAlpha: 0, scale: 0.75, duration: 0.3 }));
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

  addEventListener("load", () => ScrollTrigger.refresh());
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
})();
