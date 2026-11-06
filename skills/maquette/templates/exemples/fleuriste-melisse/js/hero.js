/* Atelier Mélisse : scène du hero. La vidéo vit seule, la souris déplace les plans (data-depth, gestes.js),
   le défilement resserre l'image dans la haute fenêtre, puis trois moments se succèdent. */
(() => {
  const racine = document.documentElement;
  const scene = document.querySelector("[data-scene]");
  const video = scene.querySelector("[data-video]");
  const pause = scene.querySelector("[data-pause]");
  const reduit = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const estPortrait = () => innerWidth < 768;

  // Vidéo : affiche tout de suite, fichier demandé seulement après load, jamais en mouvement réduit.
  const affiche = () => {
    const a = estPortrait() ? video.dataset.affichePortrait : video.dataset.affichePaysage;
    video.poster = a;
  };
  affiche();
  let arretVoulu = false, charge = null;
  const lire = () => { if (!arretVoulu && !reduit) video.play().catch(() => {}); };
  const charger = () => {
    if (reduit) return;
    const src = estPortrait() ? video.dataset.portrait : video.dataset.paysage;
    if (charge === src) return;
    charge = src; video.src = src; video.load(); lire(); pause.hidden = false;
  };
  if (document.readyState === "complete") charger(); else addEventListener("load", charger, { once: true });
  addEventListener("resize", () => { affiche(); if (charge) charger(); });
  pause.addEventListener("click", () => {
    arretVoulu = !arretVoulu;
    if (arretVoulu) video.pause(); else lire();
    pause.textContent = arretVoulu ? "Relancer la vidéo" : "Mettre en pause la vidéo";
    pause.setAttribute("aria-pressed", String(arretVoulu));
  });
  new IntersectionObserver(([e]) => (e.isIntersecting ? lire() : video.pause())).observe(scene);
  document.addEventListener("visibilitychange", () => (document.hidden ? video.pause() : lire()));

  // Bouton lumière
  document.querySelectorAll(".btn-lumiere").forEach((b) => b.addEventListener("pointermove", (e) => {
    const r = b.getBoundingClientRect();
    b.style.setProperty("--x", `${e.clientX - r.left}px`);
    b.style.setProperty("--y", `${e.clientY - r.top}px`);
  }));

  // Menu téléphone : <dialog> natif (Échap inclus)
  const menu = document.getElementById("menu");
  document.querySelector("[data-ouvrir-menu]").addEventListener("click", () => menu.showModal());
  menu.querySelector("[data-fermer-menu]").addEventListener("click", () => menu.close());
  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => menu.close()));

  // Formulaire : tant que la clé manque, on dit honnêtement que rien n'est parti.
  const form = document.querySelector("[data-formulaire]");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const etat = form.querySelector("[data-etat]");
    if (!form.reportValidity()) return;
    if (!form.access_key.value) { etat.textContent = "L'envoi n'est pas encore activé : votre message n'est pas parti."; return; }
    try {
      const r = await fetch(form.action, { method: "POST", body: new FormData(form) });
      etat.textContent = r.ok ? "Merci, nous vous répondons avec une proposition et un prix." : "L'envoi a échoué. Merci de réessayer.";
    } catch { etat.textContent = "L'envoi a échoué. Merci de réessayer."; }
  });

  if (!racine.classList.contains("motion") || !window.gsap) return;
  const { gsap } = window;
  gsap.registerPlugin(window.ScrollTrigger);
  const entete = document.querySelector(".site-header");
  const f = scene.querySelector("[data-fenetre]");
  const voile = scene.querySelector("[data-voile]");
  const titre = scene.querySelector("[data-titre-hero]");
  const imgs = gsap.utils.toArray("[data-f-moment]", scene);
  const moments = gsap.utils.toArray("[data-moment]", scene);
  const liste = scene.querySelector(".moments");
  const fl = (k) => scene.querySelector(`[data-fleur="${k}"]`);

  gsap.matchMedia().add({ grand: "(min-width: 768px)", petit: "(max-width: 767px)" }, (ctx) => {
    const grand = ctx.conditions.grand;
    const cadre = grand ? "inset(11% 7% 7% 56% round 4px)" : "inset(11% 15% 37% 15% round 4px)";
    gsap.set(f, { clipPath: "inset(0% 0% 0% 0% round 0px)" });
    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: scene, start: "top top", end: grand ? "+=200%" : "+=150%", scrub: 0.5, pin: true, anticipatePin: 1,
        onUpdate: (s) => entete.classList.toggle("is-sur-mur", s.progress > 0.05),
      },
    });
    // 1. L'image se resserre dans la fenêtre, le titre part.
    tl.to(titre, { autoAlpha: 0, y: -40, duration: 0.045 }, 0.003)
      .to(pause, { autoAlpha: 0, duration: 0.05 }, 0.06)
      .to(f, { clipPath: cadre, duration: 0.2 }, 0.02)
      .to(voile, { opacity: 0, duration: 0.14 }, 0.04)
      .set(liste, { visibility: "visible" }, 0.14);
    // 2. Trois moments : une phrase à gauche, une image dans la fenêtre.
    const pas = 0.25;
    moments.forEach((m, i) => {
      const t = 0.2 + i * pas;
      tl.fromTo(imgs[i], { opacity: 0 }, { opacity: 1, duration: 0.06 }, t - 0.02)
        .fromTo(m, { opacity: 0, y: 34 }, { opacity: 1, y: 0, duration: 0.06 }, t);
      if (i < moments.length - 1) tl.to(m, { opacity: 0, y: -28, duration: 0.05 }, t + pas - 0.05);
    });
    // 3. Les fleurs du premier plan sortent du cadre ; à la fin, une fleur tombe sur le bas du mur
    //    et passe à cheval sur la section suivante : pas de coupure.
    tl.to(fl("a"), { xPercent: 130, y: -innerHeight * 0.08, rotation: 24, duration: 0.18 }, 0)
      .to(fl("c"), { xPercent: -130, y: -innerHeight * 0.1, rotation: -32, duration: 0.18 }, 0)
      .fromTo(fl("b"), { opacity: 0, y: -innerHeight * 0.55, rotation: -40 }, { opacity: 1, y: 0, rotation: 16, duration: 0.14, ease: "power1.in" }, 0.86);
    return () => { entete.classList.remove("is-sur-mur"); };
  });
})();
