/*
 * Lance ton site — bibliothèque de gestes (maquette animée et site).
 * Version enrichie pour l'exemple « Brume » (voir NOTES.md, § gestes.js, pour reporter
 * ces changements dans templates/prototype/gestes.js).
 * Dépendances : GSAP 3.13+ (ScrollTrigger, SplitText), Lenis 1.3+.
 * Chaque geste se branche par un attribut data-* dans le HTML.
 *
 *   data-split="lines|words"     texte révélé ligne par ligne ou mot par mot
 *   data-split-scrub             … piloté par le défilement (s'allume en lisant)
 *   data-reveal / data-reveal-group + data-reveal-item   apparition (en cascade)
 *   data-image-reveal            image dévoilée (masque + léger zoom arrière)
 *   data-parallax="0.15"         parallaxe (fraction de la hauteur d'écran)
 *   data-hero-pin                hero épinglé : [data-hero-media] grandit, [data-hero-fade] s'efface
 *   data-hero-pin="shrink"       NOUVEAU — l'inverse : le plein cadre se resserre en carte arrondie
 *   data-grow                    image qui passe de la carte au plein écran
 *   data-steps + data-step / data-step-media / data-step-bar   section épinglée en étapes
 *                                (NOUVEAU : volets en clip-path, barres de progression, et un
 *                                 canvas[data-sequence] placé dans une étape est joué par la frise)
 *   data-hscroll + data-hscroll-track   galerie horizontale (NOUVEAU : épinglée ≥ 768 px seulement,
 *                                en dessous on laisse le glisser natif + scroll-snap en CSS ;
 *                                data-hscroll="all" pour épingler partout)
 *   data-video-scrub             vidéo dont le défilement pilote la lecture
 *   canvas[data-sequence="url-{i}.webp"][data-frames="120"]   séquence d'images
 *                                (NOUVEAU : chargement paresseux, taille fixée une fois, repli
 *                                 sur l'image chargée la plus proche, object-fit possible)
 *   data-counter="6"             compteur (chiffre réel seulement) ; data-counter-sep pour « 1 950 »
 *   data-marquee="35"            bande défilante (contenu dupliqué, boucle sans à-coup)
 *   data-bg="#1f1a17" data-fg    la section pose toujours son fond ET sa couleur de texte
 *                                (NOUVEAU, itération 4 : aussi en mouvement normal) ; le body
 *                                suit pour les marges et le rebond du défilement
 *   data-magnetic="0.25"         bouton magnétique
 *   data-tilt="8"                carte en léger relief au survol
 *   data-follow-list + data-follow-img="url"   image qui suit le curseur sur une liste
 *   data-cursor + data-cursor-label="Voir"     curseur personnalisé contextuel
 *   <model-viewer data-model-scroll="360">     objet 3D qui tourne au défilement
 *     NOUVEAU : data-model-start, data-model-phi ; [data-model-scene][data-model-pin] épingle la
 *     scène ; [data-model-note] (+ [data-model-line]) s'affichent au fil de la rotation ; la
 *     souris ajoute ±15° (desktop) ; data-model-repos = angle de repos en mouvement réduit.
 *     Sans data-model-pin, la rotation court sur la traversée de la section (aucune épingle).
 *   [data-reveal-now] (ou dans [data-hero-pin]) : révélé au chargement, pas au défilement
 *   [data-marquee] : bouton pause ajouté (WCAG 2.2.2), sauf data-marquee-pause="false"
 *   [data-depth="0.04"] dans [data-depth-scene]   couches (PNG détourés) qui suivent la souris
 *
 *   NOUVEAUX gestes d'interface (actifs aussi en mouvement réduit) :
 *   data-header="#hero"          en-tête : devient plein après le hero, se cache en descendant
 *   data-sticky-cta="#ancre"     barre d'action mobile visible quand #ancre est sorti de l'écran ;
 *                                data-hide-on=".a, .b" la cache quand ces blocs sont à l'écran
 *   details[data-accordion]      accordéon (contenu qui glisse à l'ouverture)
 *   [data-odometer]              chiffres qui roulent : window.gestes.odometre(el, "12,50")
 */
(() => {
  const { gsap, ScrollTrigger, SplitText, Lenis } = window;
  const $$ = (sel, root = document) => (sel ? Array.from(root.querySelectorAll(sel)) : []);
  const reduit = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const tactile = matchMedia("(hover: none), (pointer: coarse)").matches;
  const root = document.documentElement;
  const api = (window.gestes = window.gestes || {});

  // ------------------------------------------------------------------------------------
  // 1. Gestes d'interface : utiles même sans animation
  // ------------------------------------------------------------------------------------

  // En-tête qui se pose après le hero et se cache quand on descend
  $$("[data-header]").forEach((h) => {
    const repere = h.dataset.header ? document.querySelector(h.dataset.header) : null;
    let dernier = scrollY;
    const maj = () => {
      const y = scrollY;
      const seuil = repere ? Math.max(120, repere.getBoundingClientRect().bottom + y - 90) : innerHeight * 0.8;
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

  // Barre d'action mobile
  $$("[data-sticky-cta]").forEach((bar) => {
    const ancre = document.querySelector(bar.dataset.stickyCta);
    const caches = new Set();
    let ancrePassee = false;
    const maj = () => {
      const visible = ancrePassee && caches.size === 0;
      bar.classList.toggle("is-visible", visible);
      bar.toggleAttribute("inert", !visible);
      bar.setAttribute("aria-hidden", String(!visible));
    };
    if (ancre) {
      new IntersectionObserver(([e]) => {
        ancrePassee = !e.isIntersecting && e.boundingClientRect.top < 0;
        maj();
      }).observe(ancre);
    }
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => (e.isIntersecting ? caches.add(e.target) : caches.delete(e.target)));
      maj();
    });
    $$(bar.dataset.hideOn).forEach((el) => io.observe(el));
    maj();
  });

  // Accordéon
  $$("details[data-accordion]").forEach((d) => {
    const corps = d.querySelector("[data-accordion-body]");
    d.addEventListener("toggle", () => {
      if (d.open && corps && gsap && !reduit) {
        gsap.fromTo(corps, { autoAlpha: 0, y: -10 }, { autoAlpha: 1, y: 0, duration: 0.45, ease: "power2.out" });
      }
    });
  });

  // Chiffres qui roulent (prix du configurateur…)
  api.odometre = (el, texte) => {
    texte = String(texte);
    el.setAttribute("aria-label", texte + (el.dataset.odometerSuffix || ""));
    const ancien = el.dataset.valeur || "";
    el.dataset.valeur = texte;
    const memeForme = ancien.length === texte.length && el.children.length === texte.length;
    if (!memeForme) {
      el.textContent = "";
      [...texte].forEach((ch) => {
        const col = document.createElement("span");
        col.setAttribute("aria-hidden", "true");
        if (/\d/.test(ch)) {
          col.className = "odo-col";
          const bande = document.createElement("span");
          bande.className = "odo-bande";
          bande.innerHTML = "0123456789".split("").map((n) => `<span>${n}</span>`).join("");
          col.append(bande);
        } else {
          col.className = "odo-sep";
          col.textContent = ch;
        }
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

  if (!gsap) return;
  gsap.registerPlugin(ScrollTrigger, SplitText);
  gsap.defaults({ ease: "power3.out", duration: 0.9 });

  // Séquences d'images : préparées même en mouvement réduit (première image affichée)
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
      if (!im || !im.complete || !im.naturalWidth) {
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
    // Chargement par paquets de 6 : le serveur et le réseau ne sont pas noyés sous 60 requêtes
    let lance = false;
    etat.toutCharger = () => {
      if (lance) return;
      lance = true;
      let i = 1;
      const paquet = () => {
        const lot = [];
        for (let k = 0; k < 6 && i < n; k++, i++) { charger(i); lot.push(images[i]); }
        if (i < n) Promise.all(lot.map((im) => im.decode ? im.decode().catch(() => {}) : null)).then(paquet);
      };
      paquet();
    };
    etat.dessiner = dessiner;
    cv._sequence = etat;
    return etat;
  };
  $$("canvas[data-sequence]").forEach(preparerSequence);

  if (reduit) {
    // État final immédiat : rien de caché, pas de défilement doux, vidéos sur l'affiche.
    root.classList.add("motion-reduit");
    $$("video[autoplay]").forEach((v) => { v.pause(); v.removeAttribute("autoplay"); });
    $$("[data-counter]").forEach((el) => { el.textContent = formaterNombre(el, parseFloat(el.dataset.counter)); });
    $$("[data-bg]").forEach((s) => { s.style.backgroundColor = s.dataset.bg; if (s.dataset.fg) s.style.color = s.dataset.fg; });
    $$("model-viewer[data-model-scroll]").forEach((mv) => {
      mv.removeAttribute("auto-rotate");
      const repos = mv.dataset.modelRepos ?? String(parseFloat(mv.dataset.modelStart || "0") + 25);
      mv.setAttribute("camera-orbit", `${repos}deg ${mv.dataset.modelPhi || "78deg"} auto`);
    });
    return;
  }
  root.classList.add("motion");

  // Défilement doux, synchronisé avec ScrollTrigger.
  const lenis = new Lenis({ lerp: 0.1, smoothWheel: true, anchors: { offset: -70 } });
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
          return gsap.fromTo(cibles, { opacity: 0.14 }, {
            opacity: 1, stagger: 0.1, ease: "none",
            scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 50%", scrub: 1 },
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

  // Apparitions
  $$("[data-reveal-group]").forEach((g) => {
    gsap.from($$("[data-reveal-item]", g), {
      y: 40, opacity: 0, stagger: 0.09,
      scrollTrigger: { trigger: g, start: "top 84%", once: true },
    });
  });
  $$("[data-reveal]").forEach((el) => {
    const delai = parseFloat(el.dataset.reveal || "0") || 0;
    // Dans le premier écran (hero), l'apparition part au chargement : jamais liée au défilement,
    // sinon une ligne placée sous 88 % de l'écran reste invisible tant qu'on ne bouge pas.
    if (el.closest("[data-hero-pin], [data-reveal-now]")) return gsap.from(el, { y: 24, opacity: 0, duration: 0.6, delay: delai });
    gsap.from(el, { y: 32, opacity: 0, delay: delai, scrollTrigger: { trigger: el, start: "top 88%", once: true } });
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
    const grand = ctx.conditions.grand;
    const long = grand ? 1.6 : 0.9; // hauteurs d'écran

    // Les épinglages sont créés dans l'ordre du document : un pin placé plus haut décale
    // tous ceux du dessous (sinon leurs débuts sont faux et les sections se chevauchent).
    const gestesEpingles = {
      hero: (hero) => {
      const media = hero.querySelector("[data-hero-media]");
      const fondu = hero.querySelector("[data-hero-fade]");
      if (hero.dataset.heroPin === "shrink") {
        const interieur = media.querySelector("video, img");
        gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: hero, start: "top top", end: `+=${grand ? 90 : 55}%`, scrub: 1, pin: true, anticipatePin: 1 },
        })
          .fromTo(media, { clipPath: "inset(0% 0% 0% 0% round 0px)" },
            { clipPath: grand ? "inset(9% 5% 12% 5% round 28px)" : "inset(7% 4% 9% 4% round 20px)" }, 0)
          .fromTo(interieur, { scale: 1 }, { scale: 1.12 }, 0)
          .to(fondu, { autoAlpha: 0, y: -80 }, 0.1);
        return;
      }
      gsap.timeline({
        scrollTrigger: { trigger: hero, start: "top top", end: `+=${long * 100}%`, scrub: 1, pin: true, anticipatePin: 1 },
      })
        .fromTo(media, { clipPath: "inset(4% 4% 4% 4% round 24px)", scale: 1.12 },
          { clipPath: "inset(0% 0% 0% 0% round 0px)", scale: 1, ease: "none" }, 0)
        .to(fondu, { autoAlpha: 0, y: -60, ease: "none" }, 0.35);
    },
      grow: (el) => {
      gsap.fromTo(el, { clipPath: grand ? "inset(16% 22% 16% 22% round 24px)" : "inset(10% 8% 10% 8% round 18px)" }, {
        clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "none",
        scrollTrigger: { trigger: el, start: "top 90%", end: "top 15%", scrub: 1 },
      });
    },
      steps: (sec) => {
      const etapes = $$("[data-step]", sec);
      const medias = $$("[data-step-media]", sec);
      const barres = $$("[data-step-bar]", sec);
      gsap.set(etapes.slice(1), { autoAlpha: 0 });
      gsap.set(medias.slice(1), { clipPath: "inset(100% 0% 0% 0%)" });
      gsap.set(barres, { scaleX: 0 });
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: sec, start: "top top", end: `+=${etapes.length * (grand ? 50 : 35)}%`, scrub: 1, pin: true, anticipatePin: 1,
          onEnter: () => medias.forEach((m) => m.querySelector("canvas[data-sequence]")?._sequence?.toutCharger()),
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
          if (m) {
            tl.to(m, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.55, ease: "power2.inOut" }, "<-0.2")
              .fromTo(m.querySelector(".couv, img, canvas") || m, { scale: 1.18 }, { scale: 1, duration: 0.8, ease: "power2.out" }, "<");
          }
        }
        const duree = seq ? 1.5 : 0.8;
        if (barres[i]) tl.to(barres[i], { scaleX: 1, duration: duree }, i === 0 ? 0 : ">-0.1");
        // première image tenue un instant : on voit le bac avant la chute des grains
        if (seq) tl.to(seq, { f: seq.n - 1, duration: duree - 0.35, onUpdate: seq.dessiner }, "<0.35");
      });
    },
      hscroll: (sec) => {
      if (!grand && sec.dataset.hscroll !== "all") return; // glisser natif en dessous de 768 px
      const piste = sec.querySelector("[data-hscroll-track]");
      const distance = () => Math.max(0, piste.scrollWidth - innerWidth);
      gsap.to(piste, {
        x: () => -distance(), ease: "none",
        scrollTrigger: { trigger: sec, start: "top top", end: () => `+=${distance()}`, scrub: 1, pin: true, invalidateOnRefresh: true, anticipatePin: 1 },
      });
    },
      model: (mv) => {
      const tour = parseFloat(mv.dataset.modelScroll || "360");
      const depart = parseFloat(mv.dataset.modelStart || "0");
      const phi = mv.dataset.modelPhi || "78deg";
      const scene = mv.closest("[data-model-scene]") || mv.closest("section") || mv;
      const notes = $$("[data-model-note]", scene);
      const etat = { a: depart, souris: 0 };
      const orbite = () => mv.setAttribute("camera-orbit", `${(etat.a + etat.souris).toFixed(2)}deg ${phi} auto`);
      mv.removeAttribute("auto-rotate");
      orbite();
      const epingle = scene.hasAttribute("data-model-pin");
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: epingle
          ? { trigger: scene, start: "top top", end: `+=${grand ? 200 : 110}%`, scrub: 1, pin: true, anticipatePin: 1 }
          : { trigger: scene, start: "top bottom", end: "bottom top", scrub: 1 },
      });
      tl.to(etat, { a: depart + tour, duration: 1, onUpdate: orbite }, 0);
      notes.forEach((n, i) => {
        const t = 0.12 + i * (0.72 / Math.max(notes.length, 1));
        tl.fromTo(n, { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, duration: 0.1, ease: "power2.out" }, t);
        const ligne = n.querySelector("[data-model-line]");
        if (ligne) tl.fromTo(ligne, { scaleX: 0 }, { scaleX: 1, duration: 0.1 }, t + 0.03);
      });
      if (grand && !tactile) {
        scene.addEventListener("pointermove", (e) => {
          const r = scene.getBoundingClientRect();
          gsap.to(etat, { souris: ((e.clientX - r.left) / r.width - 0.5) * 30, duration: 0.9, overwrite: "auto", onUpdate: orbite });
        });
      }
      },
    };
    $$("[data-hero-pin], [data-grow], [data-steps], [data-hscroll], model-viewer[data-model-scroll]").forEach((el) => {
      if (el.matches("[data-hero-pin]")) gestesEpingles.hero(el);
      else if (el.matches("[data-grow]")) gestesEpingles.grow(el);
      else if (el.matches("[data-steps]")) gestesEpingles.steps(el);
      else if (el.matches("[data-hscroll]")) gestesEpingles.hscroll(el);
      else gestesEpingles.model(el);
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

  // Séquence d'images autonome (hors étapes) : épinglée sur son parent
  $$("canvas[data-sequence]").forEach((cv) => {
    if (cv.closest("[data-steps]")) return; // jouée par la frise des étapes
    const seq = preparerSequence(cv);
    gsap.to(seq, { f: seq.n - 1, ease: "none", onUpdate: seq.dessiner,
      scrollTrigger: { trigger: cv.parentElement, start: "top top", end: "+=200%", scrub: 0.5, pin: true, onEnter: seq.toutCharger } });
  });

  // Compteurs
  function formaterNombre(el, v) {
    const n = Math.round(v);
    return el.hasAttribute("data-counter-sep") ? n.toLocaleString("fr-FR") : String(n);
  }
  $$("[data-counter]").forEach((el) => {
    if (Number.isNaN(parseFloat(el.dataset.counter))) return; // chiffre pas encore connu
    const cible = { v: 0 };
    gsap.to(cible, { v: parseFloat(el.dataset.counter), duration: 1.6, ease: "power2.out",
      onUpdate: () => { el.textContent = formaterNombre(el, cible.v); },
      scrollTrigger: { trigger: el, start: "top 90%", once: true } });
  });

  // Bande défilante : la piste est mesurée (gap compris) pour une boucle sans à-coup
  $$("[data-marquee]").forEach((m) => {
    const piste = m.firstElementChild;
    const originaux = Array.from(piste.children);
    piste.append(...originaux.map((n) => { const c = n.cloneNode(true); c.setAttribute("aria-hidden", "true"); return c; }));
    const pas = () => originaux[originaux.length - 1].offsetLeft + originaux[originaux.length - 1].offsetWidth
      + parseFloat(getComputedStyle(piste).columnGap || "0") - originaux[0].offsetLeft;
    const tw = gsap.fromTo(piste, { x: 0 }, { x: () => -pas(), duration: parseFloat(m.dataset.marquee || "30"), ease: "none", repeat: -1 });
    ScrollTrigger.addEventListener("refreshInit", () => tw.invalidate());
    m.addEventListener("pointerenter", () => gsap.to(tw, { timeScale: 0.25, duration: 0.6 }));
    m.addEventListener("pointerleave", () => gsap.to(tw, { timeScale: 1, duration: 0.6 }));
    // Bouton pause (WCAG 2.2.2) : injecté, sauf data-marquee-pause="false"
    let enPause = false;
    if (m.dataset.marqueePause !== "false") {
      if (getComputedStyle(m).position === "static") m.style.position = "relative";
      const b = document.createElement("button");
      b.type = "button"; b.className = "marquee-pause"; b.setAttribute("aria-pressed", "false");
      b.setAttribute("aria-label", "Mettre en pause la bande défilante");
      b.innerHTML = '<svg viewBox="0 0 16 16" aria-hidden="true"><path class="i-pause" d="M5 3v10M11 3v10"/><path class="i-lecture" d="M5 3l8 5-8 5z"/></svg>';
      b.addEventListener("click", () => {
        enPause = !enPause; enPause ? tw.pause() : tw.play();
        b.setAttribute("aria-pressed", String(enPause));
        b.setAttribute("aria-label", enPause ? "Relancer la bande défilante" : "Mettre en pause la bande défilante");
      });
      m.append(b);
    }
    ScrollTrigger.create({ trigger: m, onToggle: (s) => (s.isActive && !enPause ? tw.play() : tw.pause()) });
  });

  // Changement de fond
  $$("[data-bg]").forEach((sec) => {
    // La section porte fond et texte : jamais de texte hérité du body sur un fond qui n'a pas encore basculé.
    sec.style.backgroundColor = sec.dataset.bg; if (sec.dataset.fg) sec.style.color = sec.dataset.fg;
    ScrollTrigger.create({
      trigger: sec, start: "top 65%", end: "bottom 65%",
      // fondu court : entre un fond clair et un fond sombre, une interpolation lente passe par un gris boueux
      onToggle: (s) => s.isActive && gsap.to(document.body, { backgroundColor: sec.dataset.bg, color: sec.dataset.fg || "", duration: 0.45, ease: "power1.inOut", overwrite: "auto" }),
    });
  });

  // Vidéos : lecture seulement à l'écran
  $$("video[autoplay]").forEach((v) => {
    ScrollTrigger.create({ trigger: v, start: "top bottom", end: "bottom top", onToggle: (s) => (s.isActive ? v.play().catch(() => {}) : v.pause()) });
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
      const a = parseFloat(el.dataset.tilt || "8");
      gsap.set(el, { transformPerspective: 900 });
      const rx = gsap.quickTo(el, "rotationX", { duration: 0.6 }), ry = gsap.quickTo(el, "rotationY", { duration: 0.6 });
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        ry(((e.clientX - r.left) / r.width - 0.5) * a); rx(-((e.clientY - r.top) / r.height - 0.5) * a);
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
      root.classList.add("curseur-actif");
      const label = curseur.querySelector("span");
      const x = gsap.quickTo(curseur, "x", { duration: 0.35 }), y = gsap.quickTo(curseur, "y", { duration: 0.35 });
      addEventListener("pointermove", (e) => { x(e.clientX); y(e.clientY); curseur.classList.add("is-pret"); });
      document.addEventListener("pointerleave", () => curseur.classList.remove("is-pret"));
      $$("[data-cursor-label]").forEach((el) => {
        el.addEventListener("pointerenter", () => { label.textContent = el.dataset.cursorLabel; curseur.classList.add("is-label"); });
        el.addEventListener("pointerleave", () => { label.textContent = ""; curseur.classList.remove("is-label"); });
      });
    }
  }

  addEventListener("load", () => ScrollTrigger.refresh());
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
})();
