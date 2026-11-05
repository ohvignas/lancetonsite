/*
 * Vire — données et interface de la page (exemple fictif Lance ton site).
 * Une seule source pour les chambres, les prix, le menu et les saisons : l'objet REFUGE,
 * prêt à être remplacé par un CMS ou un logiciel de réservation de refuge.
 * Les lits libres sont simulés en local (calcul déterministe par date) : rien n'est envoyé.
 * Chargé AVANT gestes.js : les cartes créées ici reçoivent les gestes du kit (data-reveal…).
 */
(() => {
  const REFUGE = {
    chambres: [
      { id: "dortoir", nom: "Dortoir des Bouquetins", court: "Les Bouquetins", lits: 14, places: "dortoir · 14 couchettes", nuit: 24, dp: 58, groupe: { des: 10, dp: 52 },
        phrase: "Couchettes de 80 cm, rideau occultant et casier à chaque lit. Groupes : le dortoir entier, 52 € en demi-pension dès 10.", coupe: "dortoir", legende: "Coupe du dortoir : couchettes sur deux niveaux, rideaux, casiers", vue: "images/vue-dortoir-900.webp",
        alt: "Vue depuis la fenêtre du dortoir : les crêtes au lever du soleil.",
        prompt: "Dortoir de refuge de montagne, couchettes superposées en mélèze, couettes grises, petite fenêtre carrée sur les crêtes au lever du soleil, lumière rasante, pellicule moyen format, grain fin, sans personne" },
      { id: "six", nom: "Chambre de six · La Combe", court: "La Combe", lits: 6, places: "chambre de 6 lits", nuit: 29, dp: 63,
        phrase: "Pour une bande d'amis ou un club, la porte fermée.", coupe: "six", legende: "Coupe de La Combe : trois lits superposés", vue: "images/vue-six-900.webp",
        alt: "Vue depuis la chambre de six : la vallée en plein midi.",
        prompt: "Chambre de six lits dans un refuge de pierre, lits superposés en bois clair, sacs à dos posés, fenêtre sur la vallée en plein midi, pellicule moyen format, grain fin, sans personne" },
      { id: "quatre", nom: "Chambre de quatre · Le Lauzet", court: "Le Lauzet", lits: 8, places: "2 chambres de 4 lits", nuit: 32, dp: 66,
        phrase: "Les familles s'y disputent la place près de la fenêtre.", coupe: "quatre", legende: "Coupe du Lauzet : deux lits superposés par chambre", vue: "images/vue-quatre-900.webp",
        alt: "Vue depuis une chambre de quatre : la brume dorée du soir.",
        prompt: "Chambre de quatre lits d'un refuge, couettes en laine, lampe frontale accrochée, fenêtre sur la brume dorée du soir, pellicule moyen format, grain fin, sans personne" },
      { id: "double", nom: "Chambre double · La Vire", court: "La Vire", lits: 2, places: "chambre double, lit de 140", nuit: 45, dp: 79,
        phrase: "La seule chambre avec un vrai lit, draps faits, et la vue sur la Chartreuse.", coupe: "double", legende: "Coupe de La Vire : un lit de 140, deux tables de nuit", vue: "images/vue-double-900.webp",
        alt: "Vue depuis la chambre double : les crêtes enneigées au coucher du soleil.",
        prompt: "Chambre double lambrissée de refuge de montagne, lit de 140 en bois, plaid à carreaux, fenêtre sur les crêtes enneigées au coucher du soleil, pellicule moyen format, grain fin, sans personne" },
    ],
    piqueNique: 9,
    menu: ["Velouté de courge, lard fumé", "Diots au vin blanc, polenta crémeuse", "Tarte aux myrtilles de la combe"],
    // Saisons gardées : été tous les soirs ; hiver les vendredis et samedis, tous les soirs pendant les vacances.
    ete: ["06-13", "09-20"],
    hiver: ["12-19", "04-12"],
    vacances: [["12-19", "01-03"], ["02-06", "03-07"], ["04-04", "04-12"]],
  };
  window.REFUGE = REFUGE;

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const euros = (v) => new Intl.NumberFormat("fr-FR").format(v);
  const md = (d) => String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  const dans = (x, [a, b]) => (a <= b ? x >= a && x <= b : x >= a || x <= b);
  const ouvert = (d) => {
    const x = md(d);
    if (dans(x, REFUGE.ete)) return true;
    if (!dans(x, REFUGE.hiver)) return false;
    if (REFUGE.vacances.some((v) => dans(x, v))) return true;
    return d.getDay() === 5 || d.getDay() === 6;
  };
  const hache = (s) => { let h = 2166136261; for (const c of s) h = Math.imul(h ^ c.charCodeAt(0), 16777619); return ((h >>> 0) % 1000) / 1000; };
  const libres = (d, ch) => {
    if (!ouvert(d)) return 0;
    const f = hache(md(d) + ch.id) * 0.62 + (d.getDay() === 6 ? 0.34 : d.getDay() === 5 ? 0.16 : 0);
    return Math.max(0, ch.lits - Math.floor(ch.lits * Math.min(1, f)));
  };
  const jour = (d) => new Intl.DateTimeFormat("fr-FR", { weekday: "long", day: "numeric", month: "long" }).format(d);
  const plus = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
  const aujourdhui = new Date(); aujourdhui.setHours(0, 0, 0, 0);

  // ------------------------------------------------------------------ coupes des chambres (SVG, même trait que le profil du sentier)
  const piece = '<path class="c-piece" d="M8 90 V34 L56 12 H184 L232 34 V90 Z"/><path class="c-sol" d="M4 90 H236"/>';
  const lit = (x, y, w) => `<rect class="c-matelas" x="${x}" y="${y}" width="${w}" height="6" rx="2"/><rect class="c-oreiller" x="${x + 2}" y="${y - 4}" width="11" height="5" rx="2"/>`;
  const superpose = (x, w, rideau) => `<path class="c-bois" d="M${x} 90 V40 M${x + w} 90 V40 M${x} 66 H${x + w} M${x} 84 H${x + w}"/>${lit(x + 2, 60, w - 4)}${lit(x + 2, 78, w - 4)}<path class="c-bois fin" d="M${x + w - 5} 66 V86 M${x + w - 8} 72 H${x + w - 2} M${x + w - 8} 78 H${x + w - 2}"/>${rideau ? `<path class="c-rideau" d="M${x + 3} 42 q2 4 0 8 q-2 4 0 8 M${x + 3} 68 q2 4 0 8 q-2 4 0 8"/>` : ""}`;
  const fenetre = (x) => `<rect class="c-fenetre" x="${x}" y="40" width="16" height="14" rx="1"/><path class="c-bois fin" d="M${x + 8} 40 V54 M${x} 47 H${x + 16}"/>`;
  const casiers = (x) => [0, 1, 2].map((i) => `<rect class="c-casier" x="${x}" y="${50 + i * 13}" width="14" height="11" rx="1"/><rect class="c-casier" x="${x + 16}" y="${50 + i * 13}" width="14" height="11" rx="1"/>`).join("");
  const COUPES = {
    dortoir: superpose(16, 50, true) + superpose(70, 50, true) + superpose(124, 50, true) + casiers(190),
    six: superpose(18, 52, false) + superpose(76, 52, false) + superpose(134, 52, false) + fenetre(200),
    quatre: superpose(22, 56, false) + fenetre(112) + superpose(160, 56, false),
    double: `<path class="c-bois" d="M58 90 V60 M62 90 V60 M58 60 H62 M182 90 V72"/><rect class="c-matelas" x="62" y="72" width="120" height="9" rx="3"/><path class="c-couette" d="M96 71 Q140 64 182 70 V81 H96 Z"/><rect class="c-oreiller" x="66" y="66" width="14" height="6" rx="2.5"/><rect class="c-oreiller" x="80" y="66" width="14" height="6" rx="2.5"/><path class="c-bois" d="M36 90 V76 H52 V90 M190 90 V76 H206 V90"/><circle class="c-lampe" cx="44" cy="71" r="3"/>` + fenetre(112),
  };
  const coupe = (c) => `<svg class="coupe" viewBox="0 0 240 96" role="img" aria-label="${c.legende}">${piece}${COUPES[c.coupe]}</svg>`;

  // ------------------------------------------------------------------ catalogue des nuits
  const liste = $("[data-chambres]");
  if (liste) liste.innerHTML = REFUGE.chambres.map((c) => `
    <li class="carte" data-reveal>
      <figure class="vue"><img src="${c.vue}" width="900" height="1100" loading="lazy" alt="${c.alt}" data-prompt="${c.prompt}" data-ratio="9:11"><span class="cadre" aria-hidden="true"></span></figure>
      <div class="carte-corps">
        ${coupe(c)}
        <h3>${c.court}</h3>
        <p class="places">${c.places}</p>
        <p>${c.phrase}</p>
        <p class="prix"><span>${euros(c.nuit)}&nbsp;€ la nuit</span><strong>${euros(c.dp)}&nbsp;€ en demi-pension</strong></p>
        <a class="choisir" href="#dates" data-choisir="${c.id}">Choisir<span class="sr-only"> : ${c.nom}</span></a>
      </div>
    </li>`).join("");
  const menuSoir = $("[data-menu-soir]");
  if (menuSoir) menuSoir.innerHTML = REFUGE.menu.map((m) => `<li data-reveal-item>${m}</li>`).join("");

  // ------------------------------------------------------------------ navigation en pilule (élément nav-pilule)
  const nav = $("[data-nav]"), menu = $("[data-menu]"), ouvrir = $("[data-ouvrir-menu]");
  const sentinelle = Object.assign(document.createElement("div"), { style: "position:absolute;top:0;height:80px;width:1px" });
  sentinelle.setAttribute("aria-hidden", "true"); document.body.prepend(sentinelle);
  new IntersectionObserver(([e]) => nav.classList.toggle("serree", !e.isIntersecting)).observe(sentinelle);
  ouvrir.addEventListener("click", () => { menu.showModal(); ouvrir.setAttribute("aria-expanded", "true"); });
  $("[data-fermer-menu]").addEventListener("click", () => menu.close());
  $$("a", menu).forEach((a) => a.addEventListener("click", () => menu.close()));
  menu.addEventListener("close", () => { ouvrir.setAttribute("aria-expanded", "false"); ouvrir.focus(); });
  matchMedia("(min-width: 821px)").addEventListener("change", (e) => { if (e.matches && menu.open) menu.close(); });

  // ------------------------------------------------------------------ cartes au projecteur (élément projecteur-cartes)
  const grille = $("[data-projecteur]");
  if (grille) {
    let id = 0, ev = null;
    const poser = () => { id = 0; $$(".carte", grille).forEach((c) => { const b = c.getBoundingClientRect(); c.style.setProperty("--x", `${ev.clientX - b.left}px`); c.style.setProperty("--y", `${ev.clientY - b.top}px`); }); };
    grille.addEventListener("pointermove", (e) => { if (e.pointerType !== "mouse") return; ev = e; if (!id) id = requestAnimationFrame(poser); });
    grille.addEventListener("pointerleave", () => $$(".carte", grille).forEach((c) => { c.style.removeProperty("--x"); c.style.removeProperty("--y"); }));
  }

  // ------------------------------------------------------------------ révélation à l'encre, été → hiver (élément revele-encre)
  const racine = $("[data-revele]");
  if (racine) {
    const cachee = $(".cachee", racine), cv = $("canvas", racine), c = cv.getContext("2d");
    const masque = document.createElement("canvas"), m = masque.getContext("2d");
    const btn = $("[data-revele-bouton]");
    const mr = matchMedia("(prefers-reduced-motion: reduce)");
    let L = 0, H = 0, d = 1, id = 0, encre = 0, dernier = null;
    const taille = () => {
      d = Math.min(devicePixelRatio || 1, 2); L = racine.clientWidth; H = racine.clientHeight;
      for (const x of [cv, masque]) { x.width = Math.round(L * d); x.height = Math.round(H * d); }
      c.setTransform(d, 0, 0, d, 0, 0); m.setTransform(d, 0, 0, d, 0, 0);
    };
    const peindre = () => {
      c.globalCompositeOperation = "source-over"; c.clearRect(0, 0, L, H);
      if (!cachee.complete || !cachee.naturalWidth) return;
      const s = Math.max(L / cachee.naturalWidth, H / cachee.naturalHeight), w = cachee.naturalWidth * s, h = cachee.naturalHeight * s;
      c.drawImage(cachee, (L - w) / 2, (H - h) / 2, w, h);
      c.globalCompositeOperation = "destination-in";
      c.setTransform(1, 0, 0, 1, 0, 0); c.drawImage(masque, 0, 0); c.setTransform(d, 0, 0, d, 0, 0);
    };
    const tache = (x, y, r) => {
      for (let k = 0; k < 4; k++) {
        const ox = k ? (Math.random() - 0.5) * r : 0, oy = k ? (Math.random() - 0.5) * r : 0, rr = k ? r * (0.3 + Math.random() * 0.3) : r;
        const g = m.createRadialGradient(x + ox, y + oy, 0, x + ox, y + oy, rr);
        g.addColorStop(0, "rgba(0,0,0,1)"); g.addColorStop(0.6, "rgba(0,0,0,.85)"); g.addColorStop(1, "rgba(0,0,0,0)");
        m.fillStyle = g; m.beginPath(); m.arc(x + ox, y + oy, rr, 0, 6.2832); m.fill();
      }
    };
    const boucle = () => {
      if (!mr.matches) { m.globalCompositeOperation = "destination-out"; m.fillStyle = "rgba(0,0,0,.03)"; m.fillRect(0, 0, L, H); m.globalCompositeOperation = "source-over"; }
      peindre();
      encre = mr.matches ? 0 : encre - 1;
      id = encre > 0 ? requestAnimationFrame(boucle) : 0;
    };
    const relancer = () => { encre = 100; if (!id) id = requestAnimationFrame(boucle); };
    racine.addEventListener("pointermove", (e) => {
      if (racine.classList.contains("tout-revele")) return;
      const b = racine.getBoundingClientRect(), x = e.clientX - b.left, y = e.clientY - b.top;
      const rayon = L < 600 ? 55 : 85;
      const pas = Math.max(1, Math.ceil(Math.hypot(x - (dernier?.x ?? x), y - (dernier?.y ?? y)) / (rayon * 0.35)));
      for (let i = 1; i <= pas; i++) tache(dernier ? dernier.x + (x - dernier.x) * i / pas : x, dernier ? dernier.y + (y - dernier.y) * i / pas : y, rayon);
      dernier = { x, y };
      if (mr.matches) peindre(); else relancer();
    });
    racine.addEventListener("pointerleave", () => { dernier = null; });
    btn.addEventListener("click", () => {
      const tout = racine.classList.toggle("tout-revele");
      btn.setAttribute("aria-pressed", String(tout));
      btn.textContent = tout ? "Revenir à l'été" : "Montrer l'hiver";
      if (!tout) { m.clearRect(0, 0, L, H); peindre(); }
    });
    new ResizeObserver(() => { taille(); peindre(); }).observe(racine);
    cachee.decode?.().then(peindre).catch(() => {});
  }

  // ------------------------------------------------------------------ réservation : lits libres, total, demande
  const form = $("[data-reservation]");
  if (!form) return;
  const champ = { chambre: $("[data-champ-chambre]"), personnes: $("[data-champ-personnes]"), nuits: $("[data-champ-nuits]") };
  champ.chambre.innerHTML = REFUGE.chambres.map((c) => `<option value="${c.id}">${c.court}</option>`).join("");
  const grilleCal = $("[data-cal-grille]"), moisTxt = $("[data-cal-mois]"), totalEl = $("[data-total]"), recap = $("[data-recap]");
  const etat = { arrivee: null, mois: null };
  const chambre = () => REFUGE.chambres.find((c) => c.id === champ.chambre.value);
  const personnes = () => Math.max(1, Math.min(chambre().lits, parseInt(champ.personnes.value, 10) || 1));
  const nuits = () => parseInt(champ.nuits.value, 10);
  // lits libres sur tout le séjour (le minimum des nuits)
  const libresSejour = (d) => { let min = Infinity; for (let i = 0; i < nuits(); i++) min = Math.min(min, libres(plus(d, i), chambre())); return min; };
  const premiereDate = () => { for (let i = 0; i < 400; i++) { const d = plus(aujourdhui, i); if (libresSejour(d) >= personnes()) return d; } return null; };

  const dessinerCalendrier = () => {
    const m = etat.mois, an = m.getFullYear(), mo = m.getMonth();
    moisTxt.textContent = new Intl.DateTimeFormat("fr-FR", { month: "long", year: "numeric" }).format(m);
    const premier = new Date(an, mo, 1), decalage = (premier.getDay() + 6) % 7, n = new Date(an, mo + 1, 0).getDate();
    let html = "<span></span>".repeat(decalage);
    for (let j = 1; j <= n; j++) {
      const d = new Date(an, mo, j), passe = d < aujourdhui, l = passe ? 0 : libresSejour(d);
      const ok = l >= personnes(), cls = !ok ? "complet" : l < Math.max(personnes() + 2, chambre().lits * 0.35) ? "peu" : "libre";
      const choisi = etat.arrivee && +d === +etat.arrivee;
      const etiquette = `${jour(d)}, ${passe || !ouvert(d) ? "fermé" : l ? `${l} lit${l > 1 ? "s" : ""} libre${l > 1 ? "s" : ""}` : "complet"}`;
      // un seul arrêt de tabulation (le jour choisi) ; les flèches parcourent les jours libres
      html += `<button type="button" class="jour ${cls}${choisi ? " choisi" : ""}" data-jour="${j}" aria-label="${etiquette}" aria-pressed="${choisi}" tabindex="${choisi ? 0 : -1}" ${ok ? "" : "disabled"}>${j}${ok ? `<span class="n" aria-hidden="true">${l}</span>` : ""}</button>`;
    }
    grilleCal.innerHTML = html;
    if (!grilleCal.querySelector('[tabindex="0"]')) grilleCal.querySelector(".jour:not([disabled])")?.setAttribute("tabindex", "0");
  };
  const majTotal = () => {
    const ch = chambre(), p = personnes(), n = nuits(), dp = form.formule.value === "dp", pique = form.piquenique.checked;
    // tarif de groupe (dortoir, demi-pension, dès 10) : le prix promis sur la carte est celui du total
    const groupe = !!(ch.groupe && dp && p >= ch.groupe.des);
    const total = p * n * (groupe ? ch.groupe.dp : dp ? ch.dp : ch.nuit) + (pique ? p * n * REFUGE.piqueNique : 0);
    totalEl.dataset.odometer = euros(total);
    const arrhes = Math.round(total * 0.3);
    $("[data-arrhes]").textContent = `dont ${euros(arrhes)} € d'arrhes (30 %), ${euros(total - arrhes)} € au refuge. Remboursées si on ferme pour la météo.`;
    $("[data-total-bouton]").textContent = `·\u00a0${euros(total)}\u00a0€`;
    const l = etat.arrivee ? libresSejour(etat.arrivee) : 0;
    $("[data-lits-libres]").textContent = etat.arrivee ? `${l} lit${l > 1 ? "s" : ""} libre${l > 1 ? "s" : ""} ${n > 1 ? "sur tout le séjour" : "ce soir-là"} · ${ch.court}` : "";
    if (window.gestes?.odometre) window.gestes.odometre(totalEl, euros(total)); else totalEl.textContent = euros(total);
    recap.textContent = etat.arrivee
      ? `${p} personne${p > 1 ? "s" : ""} · ${ch.nom} · ${n} nuit${n > 1 ? "s" : ""} à partir du ${jour(etat.arrivee)} · ${groupe ? `demi-pension au tarif groupe (${ch.groupe.dp} €)` : dp ? "demi-pension" : "nuit seule"}${pique ? " et pique-nique" : ""}`
      : "Aucune date libre pour ce choix : changez de chambre ou de nombre de personnes.";
  };
  const tout = (garderMois) => {
    champ.personnes.max = String(chambre().lits);
    if (+champ.personnes.value > chambre().lits) champ.personnes.value = String(chambre().lits);
    if (!etat.arrivee || libresSejour(etat.arrivee) < personnes()) etat.arrivee = premiereDate();
    if (!garderMois || !etat.mois) etat.mois = new Date((etat.arrivee || aujourdhui).getFullYear(), (etat.arrivee || aujourdhui).getMonth(), 1);
    dessinerCalendrier(); majTotal();
  };
  grilleCal.addEventListener("click", (e) => {
    const b = e.target.closest("[data-jour]"); if (!b || b.disabled) return;
    etat.arrivee = new Date(etat.mois.getFullYear(), etat.mois.getMonth(), +b.dataset.jour);
    dessinerCalendrier(); majTotal();
    grilleCal.querySelector(`[data-jour="${b.dataset.jour}"]`)?.focus();
  });
  grilleCal.addEventListener("keydown", (e) => {
    const pas = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 }[e.key];
    const b = e.target.closest("[data-jour]"); if (!pas || !b) return;
    e.preventDefault();
    const jours = $$(".jour", grilleCal);
    let i = jours.indexOf(b) + pas;
    while (i >= 0 && i < jours.length && jours[i].disabled) i += Math.sign(pas);
    const cible = jours[i]; if (!cible) return;
    jours.forEach((j) => j.setAttribute("tabindex", "-1"));
    cible.setAttribute("tabindex", "0"); cible.focus();
  });
  $("[data-cal-prec]").addEventListener("click", () => { etat.mois = new Date(etat.mois.getFullYear(), etat.mois.getMonth() - 1, 1); dessinerCalendrier(); });
  $("[data-cal-suiv]").addEventListener("click", () => { etat.mois = new Date(etat.mois.getFullYear(), etat.mois.getMonth() + 1, 1); dessinerCalendrier(); });
  form.addEventListener("change", (e) => { if (e.target.matches("[name=formule], [name=piquenique]")) majTotal(); else tout(false); });
  champ.personnes.addEventListener("input", () => tout(true));
  $$("[data-choisir]").forEach((a) => a.addEventListener("click", () => { champ.chambre.value = a.dataset.choisir; tout(false); }));

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const err = $("[data-erreur]"), conf = $("[data-confirmation]");
    // un drapeau par champ : « votre prénom » contient « nom », on ne cherche plus dans les libellés
    const faux = { prenom: !form.prenom.value.trim(), nom: !form.nom.value.trim(), email: !/^\S+@\S+\.\S+$/.test(form.email.value.trim()) };
    const manque = [faux.prenom && "votre prénom", faux.nom && "votre nom", faux.email && "un e-mail valide", !etat.arrivee && "une date d'arrivée"].filter(Boolean);
    Object.entries(faux).forEach(([n, v]) => form[n].setAttribute("aria-invalid", String(v)));
    if (manque.length) { err.textContent = `Il manque ${manque.join(", ")}.`; conf.hidden = true; return; }
    err.textContent = "";
    conf.hidden = false;
    conf.textContent = `C'est noté, ${form.prenom.value.trim()} : ${recap.textContent}. Exemple de démonstration, aucune demande n'est envoyée.`;
    conf.focus();
  });
  tout(false);

  // ------------------------------------------------------------------ appel final : « ce soir » seulement si le refuge est gardé ce soir
  const finalTitre = $("[data-final-titre]");
  if (!ouvert(aujourdhui)) {
    // fermé ce soir : pas de « ce soir » à la grande table, et la fenêtre du refuge dessiné reste éteinte
    const tTable = $("#t-table"); if (tTable) tTable.textContent = "Le soir, à la grande table";
    $(".refuge-nuit")?.classList.add("eteint");
  }
  if (finalTitre && !ouvert(aujourdhui)) {
    for (let i = 1; i < 400; i++) {
      const d = plus(aujourdhui, i);
      if (ouvert(d)) { finalTitre.textContent = `On rallume la lampe le ${new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long" }).format(d)}`; break; }
    }
  }
  const finalLits = $("[data-final-lits]");
  for (let i = 0; i < 400 && finalLits; i++) {
    const d = plus(aujourdhui, i);
    if (d.getDay() !== 6 || !ouvert(d)) continue;
    const n = REFUGE.chambres.reduce((s, c) => s + libres(d, c), 0);
    finalLits.textContent = `Il reste ${n} lits pour le ${jour(d)}.`;
    break;
  }
})();
