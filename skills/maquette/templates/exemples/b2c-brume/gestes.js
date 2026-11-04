/*
 * Brume — gestes.js, version « film », refonte 2 (retours utilisateur du 4 novembre 2026).
 * Adapté de la bibliothèque du kit (templates/prototype/gestes.js, non modifiée) pour une page faite
 * d'écrans pleins : chaque scène épinglée est une enveloppe haute avec un plateau `position: sticky`
 * (pas de pin-spacer GSAP), et chaque transition est écrite à la main, écran par écran.
 *
 *   [data-ecran="n"]          écran compté (écran courant : barre d'action mobile, bouton d'en-tête)
 *   [data-sans-barre]         la barre d'action mobile se cache sur cet écran
 *   [data-titre="lignes|mots"] titre découpé (SplitText) et révélé en opacité / translation
 *   [data-apparait]           apparition en opacité après le titre
 *   [data-scene="torref|livraison"] scènes épinglées propres à la page
 *   canvas[data-sequence]     séquence d'images (chargée par lots de 3 : le petit serveur de test refuse les rafales)
 *   [data-composer], [data-tiroir], [data-fermer], [data-ouvrir-menu], [data-ouvrir-panier]  dialogues
 *   [data-composer][data-choix="Kanzu"]  ouvre la fenêtre avec ce café déjà coché
 *   .fiche[data-produit] [data-ajouter]  panier local (localStorage), commande de démonstration
 *
 * Règles d'accessibilité : on n'anime que `opacity` et les transformations, jamais `visibility` ;
 * en mouvement réduit, aucune scène n'est épinglée et chaque écran est une image fixe ; panier, menu,
 * rail et formulaires marchent pareil avec ou sans mouvement.
 */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduit = matchMedia("(prefers-reduced-motion: reduce)").matches;

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
  const dateFournee = () => fmt(mardi, { weekday: "long", day: "numeric", month: "long" });
  $$("[data-fournee]").forEach((el) => (el.textContent = dateFournee()));
  $$("[data-limite]").forEach((el) => (el.textContent = ecart === 1 ? "ce soir 23 h 59" : "lundi 23 h 59"));
  $$("[data-date-torref]").forEach((el) => (el.textContent = dateTorref));

  /* ---------- Argent ---------- */
  // La virgule dans un span : avec l'approche des chiffres, « 12,50 » se lisait « 1250 »
  const euros = (v) => v.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(",", '<span class="virgule">,</span>') + "&nbsp;€";
  const eurosTexte = (v) => v.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";

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

  // Lien de nav de la section en cours
  const liensNav = $$("[data-lien-nav]");
  const ioNav = new IntersectionObserver((entrees) => {
    entrees.forEach((e) => {
      if (!e.isIntersecting) return;
      liensNav.forEach((a) => (a.getAttribute("href") === `#${e.target.id}` ? a.setAttribute("aria-current", "true") : a.removeAttribute("aria-current")));
    });
  }, { rootMargin: "-45% 0px -55% 0px" });
  $$("main > section, main > .duo > section").forEach((s) => ioNav.observe(s));

  /* ---------- Écran courant, barre d'action mobile ---------- */
  // (le compteur « 0n / 08 » de la version film est retiré : la nav montre la section en cours)
  const ecrans = $$("[data-ecran]");
  const barre = $("[data-barre]");
  const visibles = new Set();
  let courant = null;
  const boutonEntete = $("[data-bouton-entete]");
  const majBarre = () => {
    const ouverture = !courant || courant.dataset.ecran === "1";
    const cache = ouverture || courant.hasAttribute("data-sans-barre");
    barre.classList.toggle("is-cache", cache);
    barre.inert = cache;
    barre.setAttribute("aria-hidden", String(cache));
    // Un seul bouton d'action sur l'ouverture : celui de l'en-tête attend l'écran 02
    entete.classList.toggle("sur-ouverture", ouverture);
    boutonEntete.inert = ouverture;
  };
  const io = new IntersectionObserver((entrees) => {
    entrees.forEach((e) => (e.isIntersecting ? visibles.add(e.target) : visibles.delete(e.target)));
    // l'écran du dessus (le dernier dans le DOM) gagne : l'ouverture reste collée sous l'écran 02
    courant = ecrans.filter((el) => visibles.has(el)).pop() || courant;
    majBarre();
  }, { rootMargin: "-50% 0px -50% 0px" });
  ecrans.forEach((el) => io.observe(el));

  /* ---------- Dialogues ---------- */
  let lenis = null;
  const allerA = (hash) => {
    const cible = hash && hash.length > 1 ? $(hash) : null;
    if (!cible) return;
    if (lenis) lenis.scrollTo(cible, { offset: 0, immediate: reduit, force: true });
    else cible.scrollIntoView({ behavior: reduit ? "auto" : "smooth", block: "start" });
    cible.setAttribute("tabindex", "-1");
    cible.focus({ preventScroll: true });
  };
  const ouvrir = (dlg, cible) => {
    $$("dialog[open]").forEach((d) => d !== dlg && d.close());
    if (!dlg.open) dlg.showModal();
    lenis?.stop();
    if (cible) requestAnimationFrame(() => $(`#${cible}`, dlg)?.scrollIntoView({ block: "start" }));
  };
  $$("dialog").forEach((dlg) => {
    dlg.setAttribute("data-lenis-prevent", "");
    dlg.addEventListener("close", () => { if (!$("dialog[open]")) lenis?.start(); });
    dlg.addEventListener("click", (e) => { if (e.target === dlg) dlg.close(); });
  });
  $$("[data-fermer]").forEach((b) => b.addEventListener("click", () => b.closest("dialog").close()));
  const composer = $("#composer");
  const tiroir = $("#tiroir");
  const menu = $("#menu");
  const panier = $("#panier");
  $$("[data-tiroir]").forEach((b) => b.addEventListener("click", () => ouvrir(tiroir, b.dataset.tiroir)));
  $$("[data-ouvrir-menu]").forEach((b) => b.addEventListener("click", () => ouvrir(menu)));
  $$("[data-ouvrir-panier]").forEach((b) => b.addEventListener("click", () => ouvrir(panier)));
  // Liens du menu et du panier vide : on ferme, puis on défile jusqu'à la section
  $$("[data-lien-menu]").forEach((a) => a.addEventListener("click", (e) => {
    e.preventDefault();
    a.closest("dialog")?.close();
    lenis?.start();
    requestAnimationFrame(() => allerA(a.getAttribute("href")));
  }));

  /* ---------- Composer l'abonnement ---------- */
  // Prix d'abonnement (port offert) et prix à l'unité « une seule fois » (exemple fictif : à fixer par la cliente).
  // « Une seule fois » reprend le prix de la fiche du café en boutique (250 g, 1 kg) ; PRIX_UNITE ne sert que pour
  // « Surprenez-moi » et pour 500 g, qui n'existe pas en boutique. Même règle de port que le panier : offert dès 39 €.
  const PRIX = { 250: 12.5, 500: 23.9, 1000: 45 };
  const PRIX_UNITE = { 250: 13.9, 500: 27.8, 1000: 49.9 };
  const PORT = 4.9;   // envoi unique et panier : inventé, à fixer par la cliente
  const SEUIL = 39;   // port offert dès 39 € dans le panier : inventé, à fixer par la cliente
  const form = $("[data-form-composer]");
  const prix = $("[data-prix]");
  const port = $("[data-port]");
  const notes = $("[data-notes]");
  const recap = $("[data-recap]");
  const visuelComposer = $("[data-composer-visuel]");
  const visuelSurprise = visuelComposer.innerHTML;
  let visuelCafe = null;
  const recapInitial = recap.innerHTML;
  // Les notes et la photo de chaque café viennent des fiches de la boutique (pas de doublon dans le HTML)
  const fiches = $$(".fiche[data-produit]");
  const fiche = (nom) => fiches.find((f) => f.dataset.nom === nom);
  const texteNotes = (cafe) => {
    const n = fiche(cafe) && $(".notes", fiche(cafe)).textContent;
    return n ? `${cafe} : ${n.charAt(0).toLowerCase()}${n.slice(1)}` : "Un café différent à chaque envoi, avec sa fiche.";
  };
  const majComposer = (anime) => {
    const d = Object.fromEntries(new FormData(form));
    const unique = d.rythme === "1";
    const f = fiche(d.cafe);
    // 500 g : toujours 2 × le 250 g du café choisi
    const p250 = +(f?.getAttribute("data-prix-250") || PRIX_UNITE[250]);
    const pu = d.quantite === "500" ? Math.round(p250 * 200) / 100 : +(f?.getAttribute(`data-prix-${d.quantite}`) || PRIX_UNITE[d.quantite]);
    prix.innerHTML = euros(unique ? pu : PRIX[d.quantite]);
    port.textContent = unique ? (pu >= SEUIL ? "une fois, port offert" : `une fois, port ${eurosTexte(PORT)}`) : "par envoi, port offert";
    const n = texteNotes(d.cafe);
    if (notes.textContent !== n) notes.textContent = n;
    // La photo du sachet arrive avec son étiquette : on clone la .couv de la fiche (photo + étiquette HTML)
    if (visuelCafe !== d.cafe) {
      visuelCafe = d.cafe;
      const couv = f && $(".couv", f);
      if (couv) {
        const c = couv.cloneNode(true);
        const im = $("img", c);
        im.alt = ""; im.loading = "eager"; im.sizes = "330px";
        visuelComposer.replaceChildren(c);
      } else visuelComposer.innerHTML = visuelSurprise;
    }
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
  $$("[data-composer]").forEach((b) => b.addEventListener("click", () => {
    const radio = b.dataset.choix && $(`input[name=cafe][value="${b.dataset.choix}"]`, form);
    if (radio && !radio.checked) radio.checked = true;
    majComposer(false);
    ouvrir(composer);
  }));
  majComposer(false);

  /* ---------- Boutique : prix selon le format, rail ---------- */
  const formatDe = (f) => $("input[type=radio]:checked", f)?.value || null;
  const prixDe = (f) => +(f.dataset.prixUnique || f.getAttribute(`data-prix-${formatDe(f)}`));
  fiches.forEach((f) => $$("input[type=radio]", f).forEach((r) => r.addEventListener("change", () => {
    const p = $("[data-prix-fiche]", f);
    if (p) p.innerHTML = euros(prixDe(f));
  })));
  const rail = $("[data-rail-liste]");
  const pas = () => (fiches[1] ? fiches[1].offsetLeft - fiches[0].offsetLeft : rail.clientWidth * 0.8);
  const fleches = $$("[data-rail]");
  const majFleches = () => {
    const max = rail.scrollWidth - rail.clientWidth - 2;
    fleches.forEach((b) => (b.disabled = +b.dataset.rail < 0 ? rail.scrollLeft <= 2 : rail.scrollLeft >= max));
  };
  fleches.forEach((b) => b.addEventListener("click", () => rail.scrollBy({ left: +b.dataset.rail * pas(), behavior: reduit ? "auto" : "smooth" })));
  rail.addEventListener("scroll", majFleches, { passive: true });
  // Au clavier (téléphone surtout) : la fiche ou la carte focalisée défile dans son rail
  [rail, $(".cartes")].forEach((r) => r?.addEventListener("focusin", (e) => {
    const li = e.target.closest("li");
    if (!li || r.scrollWidth <= r.clientWidth + 2) return;
    const g = li.offsetLeft - r.scrollLeft, d = g + li.offsetWidth;
    if (g < 0 || d > r.clientWidth) li.scrollIntoView({ inline: "start", block: "nearest", behavior: reduit ? "auto" : "smooth" });
  }));
  addEventListener("resize", majFleches);
  majFleches();
  $$("[data-vers-coffret]").forEach((a) => a.addEventListener("click", (e) => {
    e.preventDefault();
    allerA("#boutique");
    rail.scrollTo({ left: rail.scrollWidth, behavior: "auto" });
  }));

  /* ---------- Panier local (localStorage) ---------- */
  const CLE = "brume-panier";
  const MOUTURES = ["En grains", "Filtre", "Espresso", "Piston", "Moka"];
  let lignes = [];
  try { lignes = JSON.parse(localStorage.getItem(CLE) || "[]"); if (!Array.isArray(lignes)) lignes = []; } catch { lignes = []; }
  const sauver = () => { try { localStorage.setItem(CLE, JSON.stringify(lignes)); } catch { /* navigation privée : le panier vit le temps de la page */ } };
  const liste = $("[data-panier-liste]");
  const vide = $("[data-panier-vide]");
  const totaux = $("[data-panier-totaux]");
  const compte = $("[data-panier-compte]");
  const boutonPanier = $("[data-ouvrir-panier]");
  const retourPanier = $("[data-panier-retour]");
  const echapper = (t) => String(t).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const libelleFormat = (f) => (f === "1000" ? "1 kg" : f ? `${f} g` : "3 × 125 g");
  const rendre = () => {
    const n = lignes.reduce((s, l) => s + l.qte, 0);
    const st = lignes.reduce((s, l) => s + l.qte * l.prix, 0);
    const portDu = st === 0 || st >= SEUIL ? 0 : PORT;
    compte.textContent = String(n);
    compte.classList.toggle("vide", n === 0);
    boutonPanier.setAttribute("aria-label", `Panier, ${n} article${n > 1 ? "s" : ""}`);
    vide.hidden = n > 0;
    totaux.hidden = n === 0;
    liste.innerHTML = lignes.map((l, i) => `
      <li style="--c:${echapper(l.c)}">
        <span class="vign${l.format ? " haut" : ""}"><img src="${echapper(l.img)}" alt="" width="64" height="80"></span>
        <div>
          <p class="l-nom">${echapper(l.nom)}</p>
          <p class="l-detail">${libelleFormat(l.format)} · ${euros(l.prix)} l'unité</p>
          <label class="sr-only" for="mouture-${i}">Mouture de ${echapper(l.nom)}</label>
          <select id="mouture-${i}" data-mouture="${i}">${MOUTURES.map((m) => `<option${m === l.mouture ? " selected" : ""}>${m}</option>`).join("")}</select>
          <div class="l-bas">
            <span class="qte">
              <button type="button" data-moins="${i}" aria-label="Retirer un ${echapper(l.nom)}">−</button>
              <output aria-label="Quantité">${l.qte}</output>
              <button type="button" data-plus="${i}" aria-label="Ajouter un ${echapper(l.nom)}">+</button>
            </span>
            <span class="l-prix">${euros(l.qte * l.prix)}</span>
            <button type="button" class="retirer" data-retirer="${i}">Retirer<span class="sr-only"> ${echapper(l.nom)}</span></button>
          </div>
        </div>
      </li>`).join("");
    $("[data-panier-sous-total]").innerHTML = euros(st);
    $("[data-panier-port]").innerHTML = portDu ? euros(portDu) : "offerte";
    $("[data-panier-seuil]").textContent = st > 0 && st < SEUIL ? `Plus que ${eurosTexte(SEUIL - st)} pour la livraison offerte.` : "";
    $("[data-panier-total]").innerHTML = euros(st + portDu);
  };
  const annonce = $("[data-annonce]");
  let minuterie = null;
  const annoncer = (t) => {
    annonce.textContent = t;
    annonce.classList.add("is-visible");
    clearTimeout(minuterie);
    minuterie = setTimeout(() => annonce.classList.remove("is-visible"), 3200);
  };
  fiches.forEach((f) => $("[data-ajouter]", f)?.addEventListener("click", () => {
    const format = f.dataset.prixUnique ? null : formatDe(f);
    const id = `${f.dataset.produit}|${format}`;
    const l = lignes.find((x) => x.id === id && x.mouture === "En grains");
    if (l) l.qte += 1;
    else lignes.push({ id, nom: f.dataset.nom, format, mouture: "En grains", qte: 1, prix: prixDe(f), img: $("img", f).getAttribute("src"), c: f.style.getPropertyValue("--c").trim() });
    sauver(); rendre();
    retourPanier.textContent = "";
    annoncer(`${f.dataset.nom}${format ? `, ${libelleFormat(format)}` : ""} : ajouté au panier.`);
    entete.classList.remove("is-cache"); // le badge du panier redevient visible et cliquable
    if (!reduit && window.gsap) gsap.fromTo(compte, { scale: 1.5 }, { scale: 1, duration: 0.45, ease: "back.out(3)" });
  }));
  liste.addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    const i = +(b.dataset.plus ?? b.dataset.moins ?? b.dataset.retirer);
    if (!lignes[i]) return;
    let focus = null;
    if (b.dataset.plus !== undefined) { lignes[i].qte += 1; focus = `[data-plus="${i}"]`; }
    else if (b.dataset.moins !== undefined) { lignes[i].qte -= 1; focus = lignes[i].qte > 0 ? `[data-moins="${i}"]` : null; }
    else lignes[i].qte = 0;
    lignes = lignes.filter((l) => l.qte > 0);
    sauver(); rendre();
    // le focus reste dans le panier (sur le même bouton, ou sur le titre si la ligne a disparu)
    ((focus && $(focus, liste)) || $("#t-panier")).focus?.();
  });
  liste.addEventListener("change", (e) => {
    const s = e.target.closest("[data-mouture]");
    if (s) { lignes[+s.dataset.mouture].mouture = s.value; sauver(); }
  });
  $("#t-panier").setAttribute("tabindex", "-1");
  $("[data-commander]").addEventListener("click", () => {
    const n = lignes.reduce((s, l) => s + l.qte, 0);
    retourPanier.textContent = `${n} article${n > 1 ? "s" : ""} : redirection vers le paiement sécurisé…`;
  });
  rendre();

  /* ---------- La lettre du mardi (démonstration : rien n'est envoyé) ---------- */
  const lettre = $("[data-form-lettre]");
  lettre.addEventListener("submit", (e) => {
    e.preventDefault();
    const champ = $("input[type=email]", lettre);
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(champ.value.trim());
    champ.setAttribute("aria-invalid", String(!ok));
    $("[data-lettre-retour]").textContent = ok
      ? "Merci. La prochaine lettre part le premier mardi du mois."
      : "Il manque quelque chose à l'adresse, par exemple : vous@exemple.fr";
    if (!ok) champ.focus();
  });

  /* ---------- Mouvement réduit : images fixes, rien d'épinglé ---------- */
  const { gsap, ScrollTrigger, SplitText, Lenis } = window;
  if (reduit || !gsap || !ScrollTrigger) {
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
      const tl = gsap.timeline(premier ? { delay: 0.25 } : { scrollTrigger: { trigger: t, start: "top 82%", toggleActions: "play none none none" } });
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
    gsap.to("[data-fenetre]", { opacity: 0.45, ease: "none", scrollTrigger: { trigger: e2, start: "bottom bottom", end: "bottom top", scrub: true } });

    /* 03 · Torréfaction : séquence + minuteur + titre qui se recompose */
    const scTorref = $("[data-scene='torref']");
    if (scTorref && seq) {
      ScrollTrigger.create({ trigger: scTorref, start: "top 250%", onEnter: seq.toutCharger });
      const minuteur = $("[data-minuteur]", scTorref);
      const temps = { s: 0 };
      const majTemps = () => { const s = Math.round(temps.s); minuteur.textContent = `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`; };
      const a = SplitText.create($(".t-torref .a", scTorref), { type: "chars" });
      const b = SplitText.create($(".t-torref .b", scTorref), { type: "words,chars" });
      gsap.set(b.chars, { opacity: 0, yPercent: 60 });
      gsap.set($(".t-torref .b", scTorref), { opacity: 1 });
      const tl = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: scTorref, start: "top top", end: "bottom bottom", scrub: 0.6 } });
      // On devine la machine (sombre, floue : pas encore le vidage) dès l'entrée de la scène, avant l'épinglage : plus d'écran noir après la ferme
      gsap.fromTo(cv, { opacity: 0, scale: 1.06, filter: "brightness(0.6) blur(5px)" }, { opacity: 0.5, ease: "none", scrollTrigger: { trigger: scTorref, start: "top bottom", end: "top top", scrub: true } });
      tl.fromTo(cv, { opacity: 0.5, scale: 1.06, filter: "brightness(0.6) blur(5px)" }, { opacity: 0.5, scale: 1, duration: 0.1, immediateRender: false }, 0)
        .to(temps, { s: 720, duration: 0.62, onUpdate: majTemps }, 0.1)
        .fromTo("[data-crac]", { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.04, ease: "back.out(3)" }, 0.1 + 0.62 * 9 / 12)
        .to(cv, { opacity: 1, filter: "brightness(1) blur(0px)", duration: 0.06 }, 0.7)
        .to(a.chars, { opacity: 0, yPercent: -60, duration: 0.04, stagger: 0.004, ease: "power2.in" }, 0.68)
        .to(b.chars, { opacity: 1, yPercent: 0, duration: 0.05, stagger: 0.003, ease: "power3.out" }, 0.72)
        .to(seq, { f: seq.n - 1, duration: 0.26, onUpdate: seq.dessiner }, 0.72)
        .to({}, { duration: 0.04 });
    }

    /* 04 · Livraison : le rideau se lève sur le jeudi (ordinateur) ; fondu enchaîné (téléphone) */
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

    /* 05 · Boutique et 09 · Journal : les fiches et les cartes montent en cascade */
    [["#boutique", ".fiche"], ["#journal", ".cartes > li"]].forEach(([sel, items]) => {
      const sec = $(sel);
      const tw = gsap.from($$(items, sec), { opacity: 0, y: 60, duration: 0.9, ease: "power3.out", stagger: 0.08, scrollTrigger: { trigger: $(items, sec), start: "top 88%", toggleActions: "play none none none" } });
      sec.addEventListener("focusin", () => tw.progress(1));
    });

    /* 06 · Abonnement : l'iris s'ouvre sur l'outremer ; le sachet tourne pendant la traversée */
    const abo = $("#abonnement");
    const tlAbo = gsap.timeline({ scrollTrigger: { trigger: abo, start: "top bottom", end: "top top", scrub: true } })
      .fromTo("[data-iris]", { clipPath: "circle(6% at 72% 55%)" }, { clipPath: "circle(125% at 72% 55%)", ease: "power1.in" }, 0)
      .fromTo("[data-sachet]", { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, ease: "power2.out" }, 0.25)
      .fromTo("[data-offre] > *", { opacity: 0, y: 40 }, { opacity: 1, y: 0, stagger: 0.06, ease: "power2.out" }, 0.4);
    abo.addEventListener("focusin", (e) => {
      const st = tlAbo.scrollTrigger;
      if (st.progress < 1) lenis ? lenis.scrollTo(st.end, { immediate: true, force: true }) : scrollTo(0, st.end);
      // sur téléphone la section dépasse l'écran : on amène ensuite l'élément focalisé dans la vue
      requestAnimationFrame(() => {
        const r = e.target.getBoundingClientRect();
        if (r.bottom > innerHeight - 90 || r.top < 0) lenis ? lenis.scrollTo(e.target, { offset: -innerHeight / 2, immediate: true, force: true }) : e.target.scrollIntoView({ block: "center" });
      });
    });
    gsap.fromTo("[data-sachet] .couv", { rotateY: -8, yPercent: 5 }, { rotateY: 8, yPercent: -5, ease: "none", scrollTrigger: { trigger: abo, start: "top bottom", end: "bottom top", scrub: 0.6 } });

    /* 07, 08, 11 : zoom lent des photos à l'entrée (la photo de l'équipe zoome avec ses plaques) */
    $$("[data-lent]").forEach((img) => {
      const cible = img.parentElement.classList.contains("couv") ? img.parentElement : img;
      const sec = img.closest("section");
      gsap.fromTo(cible, { scale: 1.14 }, { scale: 1, ease: "none", scrollTrigger: { trigger: sec, start: "top bottom", end: "top top", scrub: true } });
    });

    ScrollTrigger.refresh();
  });
})();
