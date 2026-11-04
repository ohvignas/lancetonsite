/*
 * Lance ton site — bibliothèque de gestes (maquette animée et site). Version 3.
 * Fusion des copies validées de « b2c-brume » (itérations 1 à 4) et « b2b-vigie » (itérations 1 à 3).
 * Dépendances : GSAP 3.13+ (ScrollTrigger, SplitText), Lenis 1.3+ ; model-viewer 4.2.0 chargé
 * à la demande. Sans GSAP (CDN bloqué), la page reste entière et lisible (classe motion-reduit).
 * Chaque geste se branche par un attribut data-* : aucune ligne à écrire page par page.
 * Documentation, options et cas d'usage : GESTES.md (à côté de ce fichier).
 *
 * Anti-flash, dans <head> :
 *   <script>document.documentElement.classList.add("js-attente");setTimeout(()=>document.documentElement.classList.remove("js-attente"),2500)</script>
 *   et en CSS : .js-attente [data-split]{visibility:hidden}
 *
 * Gestes d'interface (actifs aussi en mouvement réduit et sans GSAP)
 *   data-header="#hero"          en-tête : .is-solide après le hero, .is-cache en descendant (revient au focus)
 *   data-sticky-cta="#ancre"     barre d'action mobile (.is-visible) dès que #ancre est passé en haut
 *     data-hide-on=".a, #b"      … cachée tant que ces blocs sont à l'écran
 *     data-sticky-pause="#id"    … cachée pendant l'épinglage de ces sections
 *   details[data-accordion]      accordéon natif (name="" exclusif) ; [data-accordion-body] glisse
 *   data-odometer="12,50"        chiffres qui roulent ; window.gestes.odometre(el, "13,90") pour changer
 *     data-odometer-suffix=" €"  ajouté au libellé lu par les lecteurs d'écran
 *   data-counter="1950"          compteur (chiffre réel), format fr-FR « 1 950 »
 *     data-counter-decimals data-counter-prefix data-counter-suffix data-counter-duration
 *     data-counter-group="false" (années : « 2024 »)
 *   data-bar="0.42"              barre de comparaison (scaleX), valeur finale sans animation
 *   data-live-rate="0.18"        valeur qui grimpe (par seconde) tant qu'elle est à l'écran
 *   data-bg="#1a120d" data-fg="#fffdf8"   la section pose son fond ET sa couleur de texte ;
 *                                le body suit pour les marges (fondu à top 65 %)
 *   <model-viewer>               chargé (4.2.0) à 800 px de l'écran ; orbite de repos en mouvement réduit
 *   canvas[data-sequence="…/f-{i}.webp"][data-frames="61"]   séquence d'images, chargée par lots de 6
 *
 * Gestes de mouvement
 *   data-intro                   premier écran : apparaît au chargement, en cascade, jamais au défilement
 *   data-split="lines|words"     texte révélé ligne à ligne ou mot à mot (masques qui gardent les accents)
 *     data-split-scrub="0.5"     … qui s'allume en lisant (valeur = opacité de départ)
 *     data-split-delay="0.2"
 *   data-reveal="0.2"            apparition (valeur = délai) ; data-reveal-group + data-reveal-item : cascade
 *   data-image-reveal            image dévoilée (masque + léger zoom arrière)
 *   data-parallax="0.15"         parallaxe (fraction de la hauteur de l'élément)
 *   data-hero-pin                hero épinglé : [data-hero-media] passe de la carte au plein cadre
 *   data-hero-pin="shrink"       … l'inverse : le plein cadre se resserre en carte, l'image zoome
 *     [data-hero-fade] s'efface ; [data-hero-zoom] (ou les img/video du média) zoome
 *   data-grow                    image qui passe de la carte au plein écran (sans épinglage)
 *   data-steps="50"              section épinglée en étapes (valeur = % de défilement par étape)
 *     [data-step] [data-step-media] [data-step-bar] [data-step-progress] [data-step-count]
 *     data-steps-mobile="stack"  sur téléphone : pas d'épinglage, étapes empilées (.steps-empile)
 *     data-steps-reduit="dernier"  étapes cumulatives : sans épinglage, seul le dernier média reste
 *     un canvas[data-sequence] dans une étape est joué par la frise
 *     un média sans img, canvas ni video (fiche HTML) entre en fondu, sans zoom
 *   data-hscroll                 galerie horizontale épinglée dès 768 px ; glisser natif en dessous
 *     [data-hscroll-track] ; data-hscroll="all" épingle aussi sur téléphone
 *   data-trace="1.5"             tracé SVG raconté au défilement (valeur = écrans d'épinglage)
 *     [data-trace-wipe="0,0.8"] [data-trace-note="0.4"] [data-trace-out] + data-trace-labels="S-8,…"
 *   data-video-scrub             vidéo dont le défilement pilote la lecture
 *   data-marquee="35"            bande défilante (secondes par tour), boucle exacte, bouton pause
 *     data-marquee-scroll        suit la vitesse et le sens du défilement
 *     [data-marquee-toggle]      bouton fourni par la page ; sinon injecté (data-marquee-pause="false" : aucun)
 *   data-live-jitter="2.14"      mesure « vivante » qui oscille (data-live-amp="0.06")
 *   <model-viewer data-model-scroll="360">   objet 3D qui tourne au défilement
 *     data-model-start data-model-phi data-model-repos data-model-lock ;
 *     [data-model-scene][data-model-pin] épingle la scène ; [data-model-note] (+ [data-model-line])
 *   data-magnetic="0.25"  data-tilt="8"  data-cursor + data-cursor-label="Voir"
 *   data-follow-list + data-follow-img="url"   image calée dans la marge droite de la liste, suit le y ;
 *                                data-follow-list="curseur" : suit le curseur en x et y
 *   [data-depth="0.04"] dans [data-depth-scene]   couches qui suivent la souris
 *
 * Événement : les sections épinglées émettent « progression » (detail = 0 à 1).
 */
(() => {
  const root = document.documentElement;
  const fin = () => root.classList.remove("js-attente");
  const { gsap, ScrollTrigger, SplitText, Lenis } = window;
  const $$ = (sel, scope = document) => (sel ? Array.from(scope.querySelectorAll(sel)) : []);
  const reduit = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const tactile = matchMedia("(hover: none), (pointer: coarse)").matches;
  const api = (window.gestes = window.gestes || {});
  const MODEL_VIEWER = "https://cdn.jsdelivr.net/npm/@google/model-viewer@4.2.0/dist/model-viewer.min.js"; // 4.3.1 écrit des logs de débogage

  // ------------------------------------------------------------------ utilitaires
  const nombre = (el, v) => {
    const d = parseInt(el.dataset.counterDecimals || "0", 10);
    const txt = new Intl.NumberFormat("fr-FR", {
      minimumFractionDigits: d, maximumFractionDigits: d,
      useGrouping: el.dataset.counterGroup === "false" ? false : "always", // « 1 490 », pas « 1490 »
    }).format(v);
    return (el.dataset.counterPrefix || "") + txt + (el.dataset.counterSuffix || "");
  };
  const progression = (el, p) => el.dispatchEvent(new CustomEvent("progression", { detail: p }));

  // ------------------------------------------------------------------ 1. gestes utiles, toujours actifs
  // Fond et texte posés sur la section : jamais de texte hérité d'un body pas encore basculé.
  $$("[data-bg]").forEach((s) => {
    s.style.setProperty("--bg", s.dataset.bg);
    s.style.backgroundColor = s.dataset.bg;
    if (s.dataset.fg) { s.style.setProperty("--fg", s.dataset.fg); s.style.color = s.dataset.fg; }
  });

  // Compteurs et barres : valeur finale tout de suite (le mouvement repart de zéro plus bas).
  $$("[data-counter]").forEach((el) => {
    const v = parseFloat(el.dataset.counter);
    if (!Number.isNaN(v)) el.textContent = nombre(el, v);
  });
  $$("[data-bar]").forEach((b) => { b.style.transformOrigin ||= "left center"; b.style.transform = `scaleX(${parseFloat(b.dataset.bar) || 0})`; });

  // Étapes cumulatives (fiche qui se remplit) : sans épinglage, le CSS ne garde que ce dernier média.
  $$('[data-steps-reduit="dernier"]').forEach((sec) => $$("[data-step-media]", sec).at(-1)?.setAttribute("data-step-dernier", ""));

  // Valeur qui grimpe tant qu'elle est visible (coût d'un arrêt qui court…).
  $$("[data-live-rate]").forEach((el) => {
    const taux = parseFloat(el.dataset.liveRate);
    let total = 0, visible = false, t0 = 0;
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; t0 = performance.now(); }).observe(el);
    setInterval(() => {
      if (!visible || document.hidden) return;
      const t = performance.now();
      total += ((t - t0) / 1000) * taux; t0 = t;
      el.textContent = nombre(el, total);
    }, 250);
  });

  // En-tête : plein après le hero, caché en descendant (pas en mouvement réduit), revient au focus.
  $$("[data-header]").forEach((h) => {
    const repere = h.dataset.header ? document.querySelector(h.dataset.header) : null;
    let dernier = scrollY;
    const maj = () => {
      const y = scrollY;
      const seuil = repere ? Math.max(120, repere.getBoundingClientRect().bottom + y - h.offsetHeight) : innerHeight * 0.8;
      h.classList.toggle("is-solide", y > Math.min(seuil, innerHeight * 0.85));
      const descend = y > dernier + 4, monte = y < dernier - 4;
      if (!reduit && descend && y > seuil && !h.contains(document.activeElement)) h.classList.add("is-cache");
      if (monte || y < seuil) h.classList.remove("is-cache");
      dernier = y;
    };
    addEventListener("scroll", maj, { passive: true });
    h.addEventListener("focusin", () => h.classList.remove("is-cache"));
    maj();
  });

  // Barre d'action mobile : visible après l'ancre, cachée sur certains blocs et pendant certains épinglages.
  $$("[data-sticky-cta]").forEach((bar) => {
    const ancre = document.querySelector(bar.dataset.stickyCta || "main > section");
    const caches = new Set();
    let passe = false, pause = false;
    const maj = () => {
      const on = passe && caches.size === 0 && !pause;
      bar.classList.toggle("is-visible", on);
      bar.toggleAttribute("inert", !on);
      bar.setAttribute("aria-hidden", String(!on));
    };
    if (ancre) new IntersectionObserver(([e]) => { passe = !e.isIntersecting && e.boundingClientRect.top < 0; maj(); }).observe(ancre);
    const io = new IntersectionObserver((es) => { es.forEach((e) => (e.isIntersecting ? caches.add(e.target) : caches.delete(e.target))); maj(); });
    $$(bar.dataset.hideOn).forEach((el) => io.observe(el));
    $$(bar.dataset.stickyPause).forEach((sec) => sec.addEventListener("progression", (e) => {
      const p = e.detail > 0.002 && e.detail < 0.998;
      if (p !== pause) { pause = p; maj(); }
    }));
    maj();
  });

  // Accordéon : ouverture native (clavier compris), le contenu glisse si le mouvement est permis.
  $$("details[data-accordion]").forEach((d) => {
    const corps = d.querySelector("[data-accordion-body]");
    d.addEventListener("toggle", () => {
      if (d.open && corps && gsap && !reduit) gsap.fromTo(corps, { autoAlpha: 0, y: -10 }, { autoAlpha: 1, y: 0, duration: 0.45, ease: "power2.out" });
    });
  });

  // Odomètre : bandes de chiffres qui roulent. Styles posés en ligne (aucun CSS à ajouter).
  api.odometre = (el, texte) => {
    texte = String(texte);
    el.setAttribute("aria-label", texte + (el.dataset.odometerSuffix || ""));
    Object.assign(el.style, { fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap", display: el.style.display || "inline-block" });
    const ancien = el.dataset.valeur || "";
    el.dataset.valeur = texte;
    if (!(ancien.length === texte.length && el.children.length === texte.length)) {
      el.textContent = "";
      [...texte].forEach((ch) => {
        const col = document.createElement("span");
        col.setAttribute("aria-hidden", "true");
        Object.assign(col.style, { display: "inline-block", height: "1em", lineHeight: "1", overflow: "hidden", verticalAlign: "top", textAlign: "center" });
        if (/\d/.test(ch)) {
          const bande = document.createElement("span");
          Object.assign(bande.style, { display: "flex", flexDirection: "column" });
          bande.innerHTML = "0123456789".split("").map((n) => `<span style="display:block;height:1em;line-height:1">${n}</span>`).join("");
          col.append(bande);
        } else col.textContent = ch;
        el.append(col);
      });
    }
    [...texte].forEach((ch, i) => {
      const bande = el.children[i]?.firstElementChild;
      if (!bande || !/\d/.test(ch)) return;
      const y = -Number(ch) * 10;
      if (reduit || !gsap) bande.style.transform = `translateY(${y}%)`;
      else gsap.to(bande, { yPercent: y, duration: 0.9 + i * 0.08, ease: "expo.out", overwrite: true });
    });
  };
  $$("[data-odometer]").forEach((el) => { if (el.dataset.odometer) api.odometre(el, el.dataset.odometer); });

  // model-viewer (≈ 900 Ko) : chargé seulement à l'approche, version épinglée.
  const mvs = $$("model-viewer");
  if (mvs.length && !customElements.get("model-viewer") && !document.querySelector('script[src*="model-viewer"]')) {
    let charge = false;
    const charger = () => {
      if (charge) return; charge = true;
      const sc = document.createElement("script");
      sc.type = "module"; sc.src = MODEL_VIEWER;
      document.head.append(sc);
    };
    const io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) { charger(); io.disconnect(); } }, { rootMargin: "800px 0px" });
    mvs.forEach((m) => io.observe(m));
  }

  // Séquence d'images : première image tout de suite, le reste par lots de 6 (petits serveurs épargnés).
  const preparerSequence = (cv) => {
    if (cv._sequence) return cv._sequence;
    const n = parseInt(cv.dataset.frames || "60", 10);
    const url = (i) => cv.dataset.sequence.replace("{i}", String(i).padStart(4, "0"));
    const images = new Array(n);
    const c = cv.getContext("2d");
    const etat = { f: 0, n };
    let dimensionne = false;
    const dessiner = () => {
      const i = Math.round(etat.f);
      let im = images[i];
      if (!im || !im.complete || !im.naturalWidth) { // image pas encore là : la plus proche déjà chargée
        im = null;
        for (let k = i; k >= 0; k--) { const a = images[k]; if (a && a.complete && a.naturalWidth) { im = a; break; } }
      }
      if (!im) return;
      if (!dimensionne) { cv.width = im.naturalWidth; cv.height = im.naturalHeight; dimensionne = true; }
      c.drawImage(im, 0, 0, cv.width, cv.height);
    };
    const charger = (i) => {
      if (images[i]) return;
      const im = new Image();
      im.decoding = "async";
      im.onload = () => { if (i === 0 || Math.round(etat.f) === i) dessiner(); };
      im.src = url(i + 1);
      images[i] = im;
    };
    charger(0);
    let lance = false;
    etat.toutCharger = () => {
      if (lance) return;
      lance = true;
      let i = 1;
      const lot = () => {
        const paquet = [];
        for (let k = 0; k < 6 && i < n; k++, i++) { charger(i); paquet.push(images[i]); }
        if (i < n) Promise.all(paquet.map((im) => (im.decode ? im.decode().catch(() => {}) : null))).then(lot);
      };
      lot();
    };
    etat.dessiner = dessiner;
    cv._sequence = etat;
    return etat;
  };
  $$("canvas[data-sequence]").forEach(preparerSequence);

  // ------------------------------------------------------------------ 2. repli et mouvement réduit
  const etatFinal = () => {
    root.classList.add("motion-reduit");
    $$("video[autoplay]").forEach((v) => { v.pause(); v.removeAttribute("autoplay"); });
    $$("[data-marquee-toggle]").forEach((b) => (b.hidden = true)); // la bande ne bouge pas
    $$("model-viewer[data-model-scroll]").forEach((mv) => {
      mv.removeAttribute("auto-rotate");
      const repos = mv.dataset.modelRepos ?? String(parseFloat(mv.dataset.modelStart || "0") + 25);
      mv.setAttribute("camera-orbit", `${repos}deg ${mv.dataset.modelPhi || "78deg"} auto`);
    });
    fin();
  };
  if (!gsap || !ScrollTrigger) return etatFinal(); // CDN muet : page entière, sans mouvement
  gsap.registerPlugin(ScrollTrigger, ...(SplitText ? [SplitText] : []));
  gsap.defaults({ ease: "power3.out", duration: 0.9 });
  if (reduit) return etatFinal();
  root.classList.add("motion");

  // ------------------------------------------------------------------ 3. défilement doux
  const entete = document.querySelector("[data-header]");
  const lenis = Lenis ? new Lenis({ lerp: 0.1, smoothWheel: true, anchors: { offset: -((entete?.offsetHeight || 72) + 8) } }) : null;
  if (lenis) {
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    window.lenis = api.lenis = lenis;
  }
  const mm = gsap.matchMedia();
  const auChargement = (el) => el.closest("[data-intro], [data-hero-pin], [data-reveal-now]");

  // ------------------------------------------------------------------ 4. textes
  if (SplitText) $$("[data-split]").forEach((el) => {
    const type = el.dataset.split === "words" ? "words" : "lines";
    const scrub = el.hasAttribute("data-split-scrub");
    const depart = parseFloat(el.dataset.splitScrub) || 0.5; // 0,5 : le texte « pas encore lu » reste à 3:1
    SplitText.create(el, {
      type: type === "lines" ? "lines" : "words,lines",
      mask: scrub ? undefined : "lines",
      autoSplit: true,
      reduceWhiteSpace: false, // sinon SplitText change l'espace insécable (« 14 km ») en espace normale
      onSplit(self) {
        gsap.set(el, { visibility: "visible" });
        // Les capitales accentuées (É, Â) dépassent la ligne : masque agrandi, mise en page inchangée.
        if (self.masks?.length) gsap.set(self.masks, { paddingTop: "0.16em", marginTop: "-0.16em", paddingBottom: "0.08em", marginBottom: "-0.08em" });
        const cibles = self[type];
        if (scrub) {
          return gsap.fromTo(cibles, { opacity: depart }, {
            opacity: 1, stagger: 0.1, ease: "none",
            scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 50%", scrub: 1 },
          });
        }
        const delay = parseFloat(el.dataset.splitDelay || (auChargement(el) ? "0.15" : "0"));
        const base = { yPercent: 110, duration: 1, ease: "power4.out", stagger: type === "lines" ? 0.11 : 0.05, delay };
        return auChargement(el) ? gsap.from(cibles, base) : gsap.from(cibles, { ...base, scrollTrigger: { trigger: el, start: "top 88%", once: true } });
      },
    });
  });

  // ------------------------------------------------------------------ 5. apparitions
  // Premier écran : au chargement, dans l'ordre du DOM (ce qui est sous la ligne de flottaison n'attend pas le défilement).
  // opacity, jamais autoAlpha : visibility:hidden sortirait liens et boutons de l'ordre de tabulation.
  const intro = $$("[data-intro]").filter((el) => !el.hasAttribute("data-split"));
  if (intro.length) gsap.from(intro, { y: 28, opacity: 0, duration: 1, stagger: 0.1, delay: 0.35 });
  $$("[data-reveal-group]").forEach((g) => {
    gsap.from($$("[data-reveal-item]", g), { y: 40, opacity: 0, stagger: 0.09, scrollTrigger: { trigger: g, start: "top 84%", once: true } });
  });
  $$("[data-reveal]").forEach((el) => {
    const delay = parseFloat(el.dataset.reveal || "0") || 0;
    if (auChargement(el)) return gsap.from(el, { y: 24, opacity: 0, duration: 0.6, delay });
    gsap.from(el, { y: 32, opacity: 0, delay, scrollTrigger: { trigger: el, start: "top 88%", once: true } });
  });
  // Clavier : un élément atteint par Tab avant son apparition s'affiche tout de suite.
  document.addEventListener("focusin", (e) => {
    const bloc = e.target.closest && e.target.closest("[data-reveal], [data-reveal-item], [data-intro]");
    if (!bloc || getComputedStyle(bloc).opacity === "1") return;
    gsap.killTweensOf(bloc);
    gsap.set(bloc, { opacity: 1, y: 0 });
  });
  $$("[data-image-reveal]").forEach((fig) => {
    const img = fig.querySelector("img, video, canvas");
    gsap.timeline({ scrollTrigger: { trigger: fig, start: "top 84%", once: true } })
      .fromTo(fig, { clipPath: "inset(18% 12% 18% 12%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "power4.inOut" })
      .from(img, { scale: 1.25, duration: 1.6 }, 0);
  });
  $$("[data-bar]").forEach((b) => {
    gsap.fromTo(b, { scaleX: 0 }, { scaleX: parseFloat(b.dataset.bar) || 0, duration: 1.2, ease: "power3.inOut", scrollTrigger: { trigger: b, start: "top 90%", once: true } });
  });
  $$("[data-parallax]").forEach((el) => {
    const v = parseFloat(el.dataset.parallax || "0.15");
    gsap.fromTo(el, { yPercent: -v * 50 }, { yPercent: v * 50, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true } });
  });

  // ------------------------------------------------------------------ 6. narrations épinglées
  // Créées dans l'ordre du DOM (et triées avant chaque refresh) : un épinglage placé plus haut
  // décale tous ceux du dessous ; créés dans le désordre, leurs débuts sont faux et ils se chevauchent.
  mm.add({ grand: "(min-width: 768px)", petit: "(max-width: 767px)" }, (ctx) => {
    const { grand } = ctx.conditions;
    const nettoyage = [];

    const gestes = {
      hero(hero) {
        const media = hero.querySelector("[data-hero-media]");
        const fondu = hero.querySelector("[data-hero-fade]");
        const zoom = $$("[data-hero-zoom]", hero);
        const interieur = zoom.length ? zoom : $$(":scope > img, :scope > video, :scope > picture img", media || hero);
        const st = (fin) => ({ trigger: hero, start: "top top", end: `+=${fin}%`, scrub: 1, pin: true, anticipatePin: 1, onUpdate: (s) => progression(hero, s.progress) });
        if (hero.dataset.heroPin === "shrink") {
          const tl = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: st(grand ? 90 : 55) });
          if (media) tl.fromTo(media, { clipPath: "inset(0% 0% 0% 0% round 0px)" }, { clipPath: grand ? "inset(9% 5% 12% 5% round 28px)" : "inset(7% 4% 9% 4% round 20px)" }, 0);
          if (interieur.length) tl.fromTo(interieur, { scale: 1 }, { scale: 1.12 }, 0);
          if (fondu) tl.to(fondu, { autoAlpha: 0, y: -80, duration: 0.35 }, 0.05); // fondu court : le texte ne reste pas longtemps à demi lisible
          return;
        }
        const tl = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: st(grand ? 160 : 90) });
        if (media) tl.fromTo(media, { clipPath: "inset(4% 4% 4% 4% round 24px)", scale: 1.12 }, { clipPath: "inset(0% 0% 0% 0% round 0px)", scale: 1 }, 0);
        if (fondu) tl.to(fondu, { autoAlpha: 0, y: -60 }, 0.35);
      },

      grow(el) {
        gsap.fromTo(el, { clipPath: grand ? "inset(16% 22% 16% 22% round 24px)" : "inset(10% 8% 10% 8% round 18px)" }, {
          clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "none",
          scrollTrigger: { trigger: el, start: "top 90%", end: "top 15%", scrub: 1 },
        });
      },

      steps(sec) {
        const etapes = $$("[data-step]", sec);
        const medias = $$("[data-step-media]", sec);
        const barres = $$("[data-step-bar]", sec);
        const barre = sec.querySelector("[data-step-progress]");
        const compte = sec.querySelector("[data-step-count]");
        const n = etapes.length;
        if (!grand && sec.dataset.stepsMobile === "stack") { // téléphone : liste lisible, sans épinglage
          sec.classList.add("steps-empile");
          nettoyage.push(() => sec.classList.remove("steps-empile"));
          etapes.forEach((e) => gsap.from(e, { y: 40, opacity: 0, scrollTrigger: { trigger: e, start: "top 85%", once: true } }));
          return;
        }
        const parEtape = (parseFloat(sec.dataset.steps) || 50) * (grand ? 1 : 0.7);
        // média visuel (img, canvas, video) : volet + zoom ; fiche HTML : simple fondu (un zoom ferait sauter le texte)
        const visuel = (m) => (m.matches("img, canvas, video") ? m : m.querySelector("img, canvas, video"));
        gsap.set(etapes.slice(1), { autoAlpha: 0 });
        medias.slice(1).forEach((m) => gsap.set(m, visuel(m) ? { clipPath: "inset(100% 0% 0% 0%)" } : { autoAlpha: 0 }));
        gsap.set(barres, { scaleX: 0 });
        const debuts = [0];
        const sequences = medias.map((m) => (m.matches("canvas[data-sequence]") ? m : m.querySelector("canvas[data-sequence]"))).filter(Boolean);
        const charger = () => sequences.forEach((cv) => preparerSequence(cv).toutCharger());
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          // numéro courant : lu sur la frise elle-même, qui continue d'avancer (scrub) après le dernier défilement
          onUpdate: () => {
            if (!compte) return;
            const t = tl.time();
            let i = 0; debuts.forEach((d, k) => { if (t >= d) i = k; });
            const txt = String(i + 1).padStart(compte.dataset.stepCount?.length || 1, "0");
            if (compte.textContent !== txt) compte.textContent = txt;
          },
          scrollTrigger: {
            trigger: sec, start: "top top", end: `+=${n * parEtape}%`, scrub: 1, pin: true, anticipatePin: 1,
            onEnter: charger, onEnterBack: charger,
            onUpdate: (s) => progression(sec, s.progress),
          },
        });
        etapes.forEach((e, i) => {
          const m = medias[i];
          const cv = m && (m.matches("canvas[data-sequence]") ? m : m.querySelector("canvas[data-sequence]"));
          const seq = cv ? preparerSequence(cv) : null;
          if (i > 0) {
            // le texte sortant disparaît avant que l'entrant apparaisse : jamais deux titres lisibles ensemble
            tl.to(etapes[i - 1], { autoAlpha: 0, y: -24, duration: 0.2 })
              .fromTo(e, { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, duration: 0.3 }, ">0.05");
            debuts[i] = tl.duration() - 0.3;
            const v = m && visuel(m);
            if (v) {
              tl.to(m, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.55, ease: "power2.inOut" }, "<-0.2")
                .fromTo(v, { scale: 1.18 }, { scale: 1, duration: 0.8, ease: "power2.out" }, "<");
            } else if (m) tl.to(m, { autoAlpha: 1, duration: 0.45, ease: "power1.inOut" }, "<-0.2");
          }
          const duree = seq ? 1.5 : 0.8;
          if (barres[i]) tl.to(barres[i], { scaleX: 1, duration: duree }, i === 0 ? 0 : ">-0.1");
          // séquence : première image tenue un instant avant de jouer
          if (seq) tl.to(seq, { f: seq.n - 1, duration: duree - 0.35, onUpdate: seq.dessiner }, "<0.35");
          else if (!barres[i]) tl.to({}, { duration: duree });
        });
        if (barre) tl.fromTo(barre, { scaleX: 0 }, { scaleX: 1, duration: tl.duration(), transformOrigin: "left center" }, 0);
      },

      hscroll(sec) {
        if (!grand && sec.dataset.hscroll !== "all") return; // glisser natif + scroll-snap (CSS) sous 768 px
        const piste = sec.querySelector("[data-hscroll-track]");
        const distance = () => Math.max(0, piste.scrollWidth - innerWidth);
        gsap.to(piste, {
          x: () => -distance(), ease: "none",
          scrollTrigger: { trigger: sec, start: "top top", end: () => `+=${distance()}`, scrub: 1, pin: true, anticipatePin: 1, invalidateOnRefresh: true, onUpdate: (s) => progression(sec, s.progress) },
        });
      },

      trace(sec) {
        const wipes = $$("[data-trace-wipe]", sec);
        const notes = $$("[data-trace-note]", sec);
        const out = sec.querySelector("[data-trace-out]");
        const labels = (sec.dataset.traceLabels || "").split(",").filter(Boolean);
        const ecrans = (parseFloat(sec.dataset.trace) || 1.5) * (grand ? 1 : 0.8);
        const etat = new Map();
        gsap.set(notes, { autoAlpha: 0, y: 14 });
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sec, start: "top top", end: `+=${ecrans * 100}%`, scrub: 0.6, pin: true, anticipatePin: 1,
            onUpdate: (s) => {
              const p = s.progress;
              progression(sec, p);
              notes.forEach((nt) => {
                const on = p >= parseFloat(nt.dataset.traceNote);
                if (etat.get(nt) !== on) { etat.set(nt, on); gsap.to(nt, { autoAlpha: on ? 1 : 0, y: on ? 0 : 14, duration: 0.35, overwrite: true }); }
              });
              if (out && labels.length) out.textContent = labels[Math.round(p * (labels.length - 1))];
            },
          },
        });
        wipes.forEach((w) => {
          const [a, b] = (w.dataset.traceWipe || "0,1").split(",").map(parseFloat);
          tl.fromTo(w, { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none", duration: b - a }, a);
        });
        tl.set({}, {}, 1); // la frise dure toujours 1
      },

      model(mv) {
        const tour = parseFloat(mv.dataset.modelScroll || "360");
        const depart = parseFloat(mv.dataset.modelStart || mv.dataset.modelFrom || "0");
        const phi = mv.dataset.modelPhi || (mv.dataset.modelPitch ? `${mv.dataset.modelPitch}deg` : "78deg");
        const scene = mv.closest("[data-model-scene]") || mv.closest("section") || mv;
        const notes = $$("[data-model-note]", scene);
        const etat = { a: depart, souris: 0 };
        let touche = false; // l'utilisateur a saisi l'objet : le défilement ne le reprend plus
        mv.addEventListener("pointerdown", () => { touche = true; });
        // attribut camera-orbit : fonctionne même si model-viewer est chargé plus tard
        const orbite = () => { if (!touche && !mv.hasAttribute("data-model-lock")) mv.setAttribute("camera-orbit", `${(etat.a + etat.souris).toFixed(2)}deg ${phi} auto`); };
        mv.removeAttribute("auto-rotate");
        orbite();
        const epingle = scene.hasAttribute("data-model-pin");
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: epingle
            ? { trigger: scene, start: "top top", end: `+=${grand ? 200 : 110}%`, scrub: 1, pin: true, anticipatePin: 1, onUpdate: (s) => progression(scene, s.progress) }
            : { trigger: scene, start: "top bottom", end: "bottom top", scrub: 1 },
        });
        tl.to(etat, { a: depart + tour, duration: 1, onUpdate: orbite }, 0);
        notes.forEach((nt, i) => {
          const t = 0.12 + i * (0.72 / Math.max(notes.length, 1));
          tl.fromTo(nt, { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, duration: 0.1, ease: "power2.out" }, t);
          const ligne = nt.querySelector("[data-model-line]");
          if (ligne) tl.fromTo(ligne, { scaleX: 0 }, { scaleX: 1, duration: 0.1 }, t + 0.03);
        });
        if (grand && !tactile) {
          const suivre = (e) => {
            const r = scene.getBoundingClientRect();
            gsap.to(etat, { souris: ((e.clientX - r.left) / r.width - 0.5) * 30, duration: 0.9, overwrite: "auto", onUpdate: orbite });
          };
          scene.addEventListener("pointermove", suivre);
          nettoyage.push(() => scene.removeEventListener("pointermove", suivre));
        }
      },

      video(v) {
        v.pause();
        const lancer = () => gsap.to(v, { currentTime: v.duration, ease: "none",
          scrollTrigger: { trigger: v.parentElement, start: "top top", end: "+=150%", scrub: true, pin: v.parentElement } });
        if (v.readyState >= 1) lancer(); else v.addEventListener("loadedmetadata", () => { lancer(); ScrollTrigger.sort(); ScrollTrigger.refresh(); }, { once: true });
      },

      sequence(cv) {
        if (cv.closest("[data-steps]")) return; // jouée par la frise des étapes
        const seq = preparerSequence(cv);
        gsap.to(seq, { f: seq.n - 1, ease: "none", onUpdate: seq.dessiner,
          scrollTrigger: { trigger: cv.parentElement, start: "top top", end: "+=200%", scrub: 0.5, pin: true, onEnter: seq.toutCharger, onEnterBack: seq.toutCharger } });
      },
    };

    $$("[data-hero-pin], [data-grow], [data-steps], [data-hscroll], [data-trace], model-viewer[data-model-scroll], video[data-video-scrub], canvas[data-sequence]").forEach((el) => {
      if (el.matches("[data-hero-pin]")) gestes.hero(el);
      else if (el.matches("[data-grow]")) gestes.grow(el);
      else if (el.matches("[data-steps]")) gestes.steps(el);
      else if (el.matches("[data-hscroll]")) gestes.hscroll(el);
      else if (el.matches("[data-trace]")) gestes.trace(el);
      else if (el.matches("model-viewer")) gestes.model(el);
      else if (el.matches("video")) gestes.video(el);
      else gestes.sequence(el);
    });
    return () => nettoyage.forEach((f) => f());
  });

  // ------------------------------------------------------------------ 7. compteurs et mesures
  $$("[data-counter]").forEach((el) => {
    const v = parseFloat(el.dataset.counter);
    if (Number.isNaN(v)) return; // chiffre pas encore connu : le texte reste tel quel
    const cible = { v: 0 };
    el.textContent = nombre(el, 0);
    gsap.to(cible, { v, duration: parseFloat(el.dataset.counterDuration || "1.6"), ease: "power2.out",
      onUpdate: () => { el.textContent = nombre(el, cible.v); },
      scrollTrigger: { trigger: el, start: "top 90%", once: true } });
  });
  $$("[data-live-jitter]").forEach((el) => {
    const base = parseFloat(el.dataset.liveJitter);
    const amp = parseFloat(el.dataset.liveAmp || "0.06");
    el.dataset.counterDecimals ||= "2";
    setInterval(() => { if (!document.hidden) el.textContent = nombre(el, base + (Math.random() - 0.5) * 2 * amp); }, 900);
  });

  // ------------------------------------------------------------------ 8. bande défilante
  $$("[data-marquee]").forEach((m) => {
    const piste = m.querySelector("[data-marquee-track]") || m.firstElementChild;
    const n = piste.children.length;
    piste.append(...Array.from(piste.children).map((el) => { const c = el.cloneNode(true); c.setAttribute("aria-hidden", "true"); return c; }));
    // Boucle exacte : on recule jusqu'au premier clone (écart compris), pas de 50 %.
    const distance = () => piste.children[n].offsetLeft - piste.children[0].offsetLeft;
    const tw = gsap.fromTo(piste, { x: 0 }, { x: () => -distance(), duration: parseFloat(m.dataset.marquee || "30"), ease: "none", repeat: -1 });
    ScrollTrigger.addEventListener("refreshInit", () => { const t = tw.progress(); tw.invalidate().progress(t); });

    // Bouton pause (WCAG 2.2.2) : celui de la page, sinon injecté.
    let arret = false;
    let btn = m.querySelector("[data-marquee-toggle]");
    if (!btn && m.dataset.marqueePause !== "false") {
      if (getComputedStyle(m).position === "static") m.style.position = "relative";
      btn = document.createElement("button");
      btn.type = "button"; btn.className = "marquee-pause"; btn.setAttribute("data-marquee-toggle", "");
      btn.innerHTML = '<svg viewBox="0 0 16 16" aria-hidden="true"><path class="i-pause" d="M5 3v10M11 3v10"/><path class="i-lecture" d="M5 3l8 5-8 5z"/></svg>';
      m.append(btn);
    }
    const libelle = () => {
      if (!btn) return;
      const txt = arret ? "Relancer la bande défilante" : "Mettre en pause la bande défilante";
      btn.setAttribute("aria-pressed", String(arret));
      const l = btn.querySelector("[data-marquee-label]");
      if (l) l.textContent = txt; else btn.setAttribute("aria-label", txt);
      btn.querySelector('[data-icone="pause"]')?.classList.toggle("hidden", arret);
      btn.querySelector('[data-icone="lecture"]')?.classList.toggle("hidden", !arret);
    };
    libelle();
    btn?.addEventListener("click", () => { arret = !arret; libelle(); arret ? tw.pause() : tw.resume(); });

    let survol = 1, vitesse = 1, sens = 1;
    m.addEventListener("pointerenter", () => { survol = 0.25; });
    m.addEventListener("pointerleave", () => { survol = 1; });
    if (m.hasAttribute("data-marquee-scroll") && lenis) {
      lenis.on("scroll", ({ velocity }) => { if (velocity) { sens = velocity > 0 ? 1 : -1; vitesse = sens * gsap.utils.clamp(1, 5, Math.abs(velocity) / 4); } });
    }
    gsap.ticker.add(() => {
      if (arret) return;
      vitesse += (sens - vitesse) * 0.05; // revient doucement à la vitesse de croisière, dans le dernier sens
      tw.timeScale(gsap.utils.interpolate(tw.timeScale(), vitesse * survol, 0.12) || 0.001);
    });
    ScrollTrigger.create({ trigger: m, start: "top bottom", end: "bottom top", onToggle: (s) => (s.isActive && !arret ? tw.resume() : tw.pause()) });
  });

  // ------------------------------------------------------------------ 9. fond de page et vidéos
  $$("[data-bg]").forEach((sec) => {
    ScrollTrigger.create({
      trigger: sec, start: "top 65%", end: "bottom 65%",
      // fondu court : entre un clair et un sombre, une interpolation lente passe par un gris boueux
      onToggle: (s) => s.isActive && gsap.to(document.body, { backgroundColor: sec.dataset.bg, color: sec.dataset.fg || "", duration: 0.45, ease: "power1.inOut", overwrite: "auto" }),
    });
  });
  $$("video[autoplay]").forEach((v) => {
    ScrollTrigger.create({ trigger: v, start: "top bottom", end: "bottom top", onToggle: (s) => (s.isActive ? v.play().catch(() => {}) : v.pause()) });
  });

  // ------------------------------------------------------------------ 10. pointeur (ordinateur seulement)
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
      const force = parseFloat(el.dataset.tilt || "8") || 8;
      gsap.set(el, { transformPerspective: 900 });
      const rx = gsap.quickTo(el, "rotationX", { duration: 0.6 }), ry = gsap.quickTo(el, "rotationY", { duration: 0.6 });
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        ry(((e.clientX - r.left) / r.width - 0.5) * force); rx(-((e.clientY - r.top) / r.height - 0.5) * force);
      });
      el.addEventListener("pointerleave", () => { rx(0); ry(0); });
    });

    $$("[data-follow-list]").forEach((liste) => {
      const img = document.createElement("img");
      img.alt = ""; img.setAttribute("aria-hidden", "true");
      Object.assign(img.style, { position: "fixed", left: "0", top: "0", zIndex: "50", width: "16rem", aspectRatio: "4 / 5", objectFit: "cover", borderRadius: "14px", pointerEvents: "none", opacity: "0", visibility: "hidden" });
      document.body.append(img);
      $$("[data-follow-img]", liste).forEach((l) => { new Image().src = l.dataset.followImg; }); // préchargement
      gsap.set(img, { scale: 0.8, xPercent: -50, yPercent: -50 });
      const x = gsap.quickTo(img, "x", { duration: 0.55 }), y = gsap.quickTo(img, "y", { duration: 0.55 });
      const rot = gsap.quickTo(img, "rotation", { duration: 0.8 });
      const libre = liste.dataset.followList === "curseur";
      let px = 0, py = 0, place = true;
      const ranger = () => gsap.to(img, { autoAlpha: 0, scale: 0.8, duration: 0.25, overwrite: "auto" });
      // Par défaut (Vigie) : image calée dans la marge droite de la liste, après la fin réelle du texte
      // de la ligne, largeur ≤ 208 px, masquée s'il reste moins de 120 px ; elle ne suit que le y.
      const caler = (ligne) => {
        const r = liste.getBoundingClientRect();
        let finTexte = r.left;
        const tw = document.createTreeWalker(ligne, NodeFilter.SHOW_TEXT);
        for (let n; (n = tw.nextNode());) {
          if (!n.nodeValue.trim()) continue;
          const g = document.createRange(); g.selectNodeContents(n);
          finTexte = Math.max(finTexte, g.getBoundingClientRect().right);
        }
        const w = Math.min(208, r.right - finTexte - 24);
        place = w >= 120;
        img.style.width = `${Math.max(w, 0)}px`;
        const cx = r.right - w / 2;
        // première apparition : posée directement, sans glisser depuis x = 0
        if (gsap.getProperty(img, "opacity") < 0.05) gsap.set(img, { x: cx, y: py }); else x(cx);
      };
      liste.addEventListener("pointermove", (e) => {
        py = e.clientY; y(e.clientY);
        if (libre) x(e.clientX + (e.clientX > innerWidth / 2 ? -170 : 170)); // moitié droite : l'image passe à gauche
        rot(gsap.utils.clamp(-6, 6, ((libre ? e.clientX - px : 0) + (e.clientY - py)) * 0.3)); px = e.clientX;
      });
      // le défilement fait glisser la liste sous un curseur immobile : on range l'image
      addEventListener("scroll", () => { if (!liste.matches(":hover")) ranger(); }, { passive: true });
      $$("[data-follow-img]", liste).forEach((ligne) => {
        ligne.addEventListener("pointerenter", (e) => {
          py = e.clientY;
          if (!libre) caler(ligne); else place = true;
          img.src = ligne.dataset.followImg;
          gsap.to(img, { autoAlpha: place ? 1 : 0, scale: 1, duration: 0.4, overwrite: "auto" });
        });
        ligne.addEventListener("pointerleave", ranger);
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

    // Curseur : gsap ne déplace que l'élément (x, y) ; la taille change en CSS sur .curseur-rond
    // (classes is-pret et is-label), pour que les deux ne se battent pas sur le même transform.
    const curseur = document.querySelector("[data-cursor]");
    if (curseur) {
      root.classList.add("curseur-actif");
      const label = curseur.querySelector("span");
      const x = gsap.quickTo(curseur, "x", { duration: 0.35 }), y = gsap.quickTo(curseur, "y", { duration: 0.35 });
      addEventListener("pointermove", (e) => { x(e.clientX); y(e.clientY); curseur.classList.add("is-pret"); });
      document.addEventListener("pointerleave", () => curseur.classList.remove("is-pret"));
      $$("[data-cursor-label]").forEach((el) => {
        el.addEventListener("pointerenter", () => { if (label) label.textContent = el.dataset.cursorLabel; curseur.classList.add("is-label"); });
        el.addEventListener("pointerleave", () => { if (label) label.textContent = ""; curseur.classList.remove("is-label"); });
      });
    }
  }

  // ------------------------------------------------------------------ 11. mise en place
  const recalculer = () => { ScrollTrigger.sort(); ScrollTrigger.refresh(); };
  recalculer();
  fin();
  addEventListener("load", recalculer);
  document.fonts?.ready.then(recalculer);
})();
