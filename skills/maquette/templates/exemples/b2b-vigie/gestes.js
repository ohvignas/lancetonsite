/*
 * Vigie — gestes de la page (refonte « produit centré »).
 * Version allégée et adaptée du kit v3 (templates/prototype/gestes.js, non modifié) : seuls les gestes
 * dont la page se sert. Différence de principe : toutes les apparitions passent par l'opacité, jamais par
 * autoAlpha / visibility (un lien caché resterait sinon hors de l'ordre de tabulation, ou l'inverse).
 *
 *   html.motion                  posé dans <head> si le mouvement est permis ; retiré ici si GSAP manque
 *   data-split                   titre de section : lignes qui montent en fondu à l'entrée
 *   data-reveal                  bloc qui apparaît (opacité + 24 px) à l'entrée
 *   data-counter="54300"         compteur (format fr-FR), data-counter-suffix
 *   [data-barre]                 barre empilée qui se remplit de gauche à droite (clip-path)
 *   details[data-accordion]      accordéon natif ; [data-accordion-body] glisse (hauteur + opacité)
 *
 * La scène épinglée (capteur 3D, moments, courbe, SMS) vit dans scene.js.
 * Expose window.gestes = { lenis, reduit } et émet « gestes:pret » sur document.
 */
(() => {
  const root = document.documentElement;
  const { gsap, ScrollTrigger, SplitText, Lenis } = window;
  const $$ = (sel, scope = document) => Array.from(scope.querySelectorAll(sel));
  const fin = () => root.classList.remove("js-attente");
  const api = (window.gestes = window.gestes || {});
  const reduit = !root.classList.contains("motion");
  api.reduit = reduit;

  const nombre = (el, v) => {
    const d = parseInt(el.dataset.counterDecimals || "0", 10);
    return new Intl.NumberFormat("fr-FR", { minimumFractionDigits: d, maximumFractionDigits: d, useGrouping: "always" }).format(v)
      + (el.dataset.counterSuffix || "").replace(/&nbsp;/g, " ");
  };

  // ---------------------------------------------------------------- accordéon (toujours actif)
  $$("details[data-accordion]").forEach((d) => {
    const corps = d.querySelector("[data-accordion-body]");
    const resume = d.querySelector("summary");
    resume.addEventListener("click", (e) => {
      if (reduit || !gsap || !corps) return;
      e.preventDefault();
      if (d.open) {
        gsap.to(corps, { height: 0, opacity: 0, duration: 0.35, ease: "power2.inOut", onComplete: () => { d.open = false; gsap.set(corps, { clearProps: "height,opacity" }); } });
      } else {
        // ferme les autres du même groupe (l'attribut name ne joue pas quand on ouvre par script)
        if (d.name) $$(`details[name="${d.name}"][open]`).forEach((o) => { if (o !== d) o.querySelector("summary").click(); });
        d.open = true;
        gsap.fromTo(corps, { height: 0, opacity: 0 }, { height: "auto", opacity: 1, duration: 0.45, ease: "power2.out", clearProps: "height" });
      }
    });
    if (corps) corps.style.overflow = "hidden";
  });

  // ---------------------------------------------------------------- sans GSAP ou en mouvement réduit : tout est posé
  if (!gsap || !ScrollTrigger || reduit) {
    if (!gsap || !ScrollTrigger) { root.classList.remove("motion"); api.reduit = true; }
    fin();
    document.dispatchEvent(new Event("gestes:pret"));
    return;
  }

  gsap.registerPlugin(ScrollTrigger, ...(SplitText ? [SplitText] : []));

  // ---------------------------------------------------------------- Lenis
  const entete = document.querySelector(".entete");
  const lenis = Lenis ? new Lenis({ lerp: 0.1, smoothWheel: true, anchors: { offset: -((entete?.offsetHeight || 64) + 8) } }) : null;
  if (lenis) {
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    api.lenis = window.lenis = lenis;
  }

  // ---------------------------------------------------------------- titres de section
  const entree = { start: "top 82%", once: true };
  $$("[data-split]").forEach((el) => {
    const cibles = SplitText ? SplitText.create(el, { type: "lines", linesClass: "ligne" }).lines : [el];
    gsap.from(cibles, { opacity: 0, y: 34, duration: 0.95, ease: "expo.out", stagger: 0.09, scrollTrigger: { trigger: el, ...entree } });
  });

  // ---------------------------------------------------------------- apparitions
  // un bloc qui reçoit le focus au clavier finit son apparition tout de suite (sinon lien et anneau restent invisibles)
  $$("[data-reveal]").forEach((el) => {
    const tw = gsap.from(el, { opacity: 0, y: 24, duration: 0.9, ease: "power3.out", delay: parseFloat(el.dataset.reveal) || 0, scrollTrigger: { trigger: el, ...entree } });
    el.addEventListener("focusin", () => tw.progress(1), { once: true });
  });

  // ---------------------------------------------------------------- compteurs
  $$("[data-counter]").forEach((el) => {
    const v = parseFloat(el.dataset.counter), o = { v: 0 };
    el.textContent = nombre(el, 0);
    gsap.to(o, { v, duration: 1.6, ease: "power2.out", onUpdate: () => (el.textContent = nombre(el, Math.round(o.v))), scrollTrigger: { trigger: el, start: "top 88%", once: true } });
  });

  // ---------------------------------------------------------------- barre empilée
  $$("[data-barre]").forEach((b) => {
    gsap.fromTo(b, { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 1.4, ease: "expo.inOut", scrollTrigger: { trigger: b, start: "top 85%", once: true } });
  });

  if (!document.querySelector("[data-scene]")) fin(); // sinon scene.js lève l'anti-flash après avoir découpé les mots
  document.dispatchEvent(new Event("gestes:pret"));
  addEventListener("load", () => { ScrollTrigger.sort(); ScrollTrigger.refresh(); });
})();
