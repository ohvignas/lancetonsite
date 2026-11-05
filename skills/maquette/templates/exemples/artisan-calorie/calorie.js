/*
 * Calorie — scripts de page (module ES).
 * Une donnée, une seule source : PRODUITS, CHANTIERS et BAREME sont écrits ici une fois, et servent
 * au catalogue, au simulateur, au comparatif sur dix ans (D3 7.9.0), au tableau équivalent et au formulaire.
 * Tous les prix et montants d'aides sont FICTIFS (inspirés des barèmes publics, à vérifier sur france-renov.gouv.fr).
 */
const root = document.documentElement;
const reduit = matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const euros = (n) => Math.round(n).toLocaleString("fr-FR").replace(/[\u202f\u00a0]/g, "\u00a0") + "\u00a0€";
const nb = (n, d = 0) => n.toLocaleString("fr-FR", { minimumFractionDigits: d, maximumFractionDigits: d });

/* ------------------------------------------------------------------ données (fictives) */
export const PRODUITS = [
  { id: "pac", nom: "Pompe à chaleur air/eau", texte: "Remplace la chaudière fioul, gaz ou propane.", prix: 11900, aideMax: 9000, projet: "pac",
    picto: '<svg viewBox="0 0 200 120"><rect x="40" y="22" width="120" height="84" rx="10" fill="#e9eef0"/><circle cx="84" cy="64" r="28" fill="none" stroke="#0e1820" stroke-width="5"/><path d="M84 40v48M60 64h48M67 47l34 34M101 47 67 81" stroke="#0e1820" stroke-width="3"/><rect x="124" y="40" width="22" height="48" rx="3" fill="#cdd6da"/><path d="M14 50h20M10 64h24M14 78h20" stroke="#6cc3e0" stroke-width="4" stroke-linecap="round"/><path d="M166 50h20M166 64h24M166 78h20" stroke="#f08a3c" stroke-width="4" stroke-linecap="round"/></svg>' },
  { id: "ballon", nom: "Chauffe-eau thermodynamique 200 L", texte: "L'eau chaude d'un foyer de quatre.", prix: 3300, aideMax: 1350, projet: "ballon",
    picto: '<svg viewBox="0 0 200 120"><rect x="76" y="8" width="48" height="24" rx="8" fill="#cdd6da"/><path d="M84 20h32" stroke="#0e1820" stroke-width="3" stroke-dasharray="3 4"/><rect x="72" y="32" width="56" height="82" rx="24" fill="#e9eef0"/><path d="M84 96c6-10 26-10 32 0" stroke="#f08a3c" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M84 80c6-10 26-10 32 0" stroke="#f6b54a" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M30 20h30M36 34h24" stroke="#6cc3e0" stroke-width="4" stroke-linecap="round"/></svg>' },
  { id: "entretien", nom: "Entretien annuel", texte: "Une visite par an, garantie conservée.", prix: 180, suffixe: " / an", aideMax: 0, projet: null,
    picto: '<svg viewBox="0 0 200 120"><circle cx="100" cy="60" r="40" fill="none" stroke="#e9eef0" stroke-width="6"/><path d="M100 30v30l20 14" stroke="#f6b54a" stroke-width="6" stroke-linecap="round" fill="none"/><path d="M150 26l16-12M156 40l20-4M34 26 18 14M44 40l-20-4" stroke="#6cc3e0" stroke-width="4" stroke-linecap="round"/></svg>' },
];

export const CHANTIERS = [
  { date: "2026-10-12", lieu: "Joucas", titre: "Une PAC sans toucher la façade", texte: "Unité dans la cour, liaison par la cave.", image: "chantier-joucas", alt: "Cour d’une maison de village à Joucas : unité de pompe à chaleur sur consoles à côté d’une arche de pierre, liaisons cuivre vers la cave" },
  { date: "2026-09-28", lieu: "Apt", titre: "Le fioul de 1994 remplacé en deux jours", texte: "Radiateurs en fonte gardés.", image: "chantier-apt", alt: "Façade en pierre d'une maison d'Apt, volets gris-bleu et glycine" },
  { date: "2026-09-09", lieu: "Roussillon", titre: "Un ballon thermodynamique à la place du cumulus", texte: "Posé en une matinée.", image: "chantier-roussillon", alt: "Porte et volets vert d'eau sur un mur en pierre à Roussillon" },
];

/* Barème d'exemple. Énergie : prix du kWh de chaleur utile (rendement de l'ancien appareil compris). */
export const BAREME = {
  energie: { fioul: { nom: "Chaudière au fioul", kwh: 0.147 }, gaz: { nom: "Chaudière au gaz", kwh: 0.136 }, propane: { nom: "Chaudière au propane", kwh: 0.21 }, elec: { nom: "Radiateurs électriques", kwh: 0.2516 } },
  elec: 0.2516, scopChauffage: 3.3, copEau: 2.8, ecsParPersonne: 800, hausse: 0.03,
  prixPac: (s) => (s <= 100 ? 11900 : s <= 160 ? 13400 : 15200), prixBallonPac: 1900, prixBallon: 3300,
  mprPac: [5000, 4000, 3000, 0], ceePac: [4000, 4000, 2500, 2500], mprBallon: [1200, 800, 400, 0], ceeBallon: 150,
  plafond: [0.9, 0.75, 0.6, 0.4], entretien: { pac: 180, ballon: 0 }, // PAC : 180 €/an, offert la première année ; ballon seul : rien
};

/* ------------------------------------------------------------------ calcul : la seule source des résultats */
const sim = { energie: "fioul", surface: 120, isolation: 120, personnes: 3, revenus: 1, projet: "pac-ballon" };
export const calculer = (s = sim) => {
  const B = BAREME, prixAvant = B.energie[s.energie].kwh;
  const chauffage = s.surface * s.isolation, eau = s.personnes * B.ecsParPersonne;
  // ballon seul : l'eau chaude d'avant vient d'un cumulus électrique (rendement 0,92), pas de la chaudière
  const avant = chauffage * prixAvant + eau * (s.projet === "ballon" ? B.elec / 0.92 : prixAvant);
  const pac = s.projet !== "ballon", ballon = s.projet !== "pac";
  let apres = 0, prix = 0, aides = 0, entretien = 0;
  apres += pac ? (chauffage / B.scopChauffage) * B.elec : chauffage * prixAvant;
  apres += ballon ? (eau / B.copEau) * B.elec : eau * prixAvant;
  const fossile = s.energie !== "elec";
  if (pac) { prix += B.prixPac(s.surface); aides += B.mprPac[s.revenus] + (fossile ? B.ceePac[s.revenus] : 0); entretien = B.entretien.pac; }
  if (ballon) {
    if (pac) prix += B.prixBallonPac;
    else { prix += B.prixBallon; aides += B.mprBallon[s.revenus] + B.ceeBallon; entretien = B.entretien.ballon; }
  }
  aides = Math.min(aides, prix * B.plafond[s.revenus]);
  const reste = prix - aides;
  const annees = [];
  let cumA = 0, cumP = reste;
  annees.push({ an: 0, avant: 0, apres: reste });
  for (let a = 1; a <= 10; a++) {
    const k = Math.pow(1 + B.hausse, a - 1);
    cumA += avant * k; cumP += apres * k + (a > 1 ? entretien : 0); // entretien offert la première année
    annees.push({ an: a, avant: cumA, apres: cumP });
  }
  // radiateurs électriques : pas de réseau d'eau ; la PAC air/eau suppose de le créer, chiffré à la visite
  const reseau = pac && s.energie === "elec";
  let retour = null;
  if (!reseau) for (let a = 1; a <= 10; a++) {
    const p = annees[a - 1], q = annees[a];
    const e0 = p.apres - p.avant, e1 = q.apres - q.avant;
    if (e0 > 0 && e1 <= 0) { retour = a - 1 + e0 / (e0 - e1); break; }
  }
  return { reseau, avant, apres: apres + entretien, economie: avant - apres - entretien, prix, aides, reste, annees, retour, nomAvant: B.energie[s.energie].nom };
};

/* ------------------------------------------------------------------ navigation en pilule + menu <dialog> */
(() => {
  const nav = $("[data-nav]"), menu = $("[data-menu]"), ouvrir = $("[data-ouvrir-menu]");
  const hero = $("#hero");
  new IntersectionObserver(([e]) => nav.classList.toggle("serree", !e.isIntersecting), { rootMargin: "-80px 0px 0px 0px", threshold: 0.35 }).observe(hero);
  const fermer = () => menu.open && menu.close();
  ouvrir.addEventListener("click", () => { menu.showModal(); ouvrir.setAttribute("aria-expanded", "true"); window.lenis?.stop(); });
  $("[data-fermer-menu]", menu).addEventListener("click", fermer);
  $$("a", menu).forEach((a) => a.addEventListener("click", fermer));
  menu.addEventListener("close", () => { ouvrir.setAttribute("aria-expanded", "false"); window.lenis?.start(); ouvrir.focus(); });
  matchMedia("(min-width: 961px)").addEventListener("change", (e) => e.matches && fermer());
})();

/* ------------------------------------------------------------------ hero : le relevé en direct (pause visible, figé en mouvement réduit) */
(() => {
  const releve = $(".releve"), btn = $("[data-releve-pause]"), svg = $("[data-releve-barres]");
  const dehors = $('[data-live="dehors"]'), cop = $('[data-live="cop"]');
  // 24 heures de chaleur produite (kWh) : forte la nuit et au matin, faible l'après-midi
  const H = [2.9, 3.0, 3.1, 3.2, 3.3, 3.3, 3.2, 3.0, 2.6, 2.2, 1.8, 1.5, 1.3, 1.2, 1.2, 1.4, 1.8, 2.3, 2.6, 2.7, 2.8, 2.8, 2.9, 2.9];
  const T = [1.2, .9, .6, .3, .1, 0, .2, .8, 1.9, 3.4, 5.1, 6.6, 7.8, 8.6, 8.9, 8.5, 7.3, 5.8, 4.6, 3.8, 3.1, 2.5, 2, 1.6];
  const heure = 9; // relevé d'exemple figé à 9 h, pour que la capture soit stable
  const ns = "http://www.w3.org/2000/svg";
  const w = 320 / 24, barres = [];
  H.forEach((v, i) => {
    const r = document.createElementNS(ns, "rect");
    const h = (v / 3.5) * 84;
    Object.entries({ x: i * w + 1.5, y: 92 - h, width: w - 3, height: h, rx: 2, fill: i < heure ? "#f08a3c" : i === heure ? "#f6b54a" : "#2c3d48" }).forEach(([k, val]) => r.setAttribute(k, val));
    svg.append(r); barres.push(r);
  });
  const ligne = document.createElementNS(ns, "path");
  ligne.setAttribute("d", T.map((t, i) => `${i ? "L" : "M"}${i * w + w / 2},${70 - t * 5}`).join(""));
  Object.entries({ fill: "none", stroke: "#6cc3e0", "stroke-width": 2, "stroke-dasharray": "3 4" }).forEach(([k, v]) => ligne.setAttribute(k, v));
  svg.append(ligne);

  let fige = reduit, id = 0;
  const pas = () => {
    if (fige || document.hidden) return;
    dehors.textContent = nb(2.8 + (Math.random() - 0.5) * 0.4, 1);
    cop.textContent = nb(3.4 + (Math.random() - 0.5) * 0.12, 1);
    // chaleur et coût du jour restent ceux de 9 h : le relevé est figé à cette heure
    const b = barres[heure], h = (2.6 + Math.random() * 0.5) / 3.5 * 84;
    b.setAttribute("y", 92 - h); b.setAttribute("height", h);
  };
  const lancer = () => { clearInterval(id); if (!fige) id = setInterval(pas, 1200); };
  const maj = () => {
    btn.setAttribute("aria-pressed", String(fige));
    btn.querySelector("span").textContent = fige ? "Relancer le relevé" : "Figer le relevé";
    releve.classList.toggle("fige", fige);
  };
  if (reduit) btn.hidden = true;
  btn.addEventListener("click", () => { fige = !fige; maj(); lancer(); });
  // hors écran : on s'arrête
  new IntersectionObserver(([e]) => { if (!e.isIntersecting) clearInterval(id); else lancer(); }).observe(releve);
  maj();
})();

/* ------------------------------------------------------------------ catalogue (PRODUITS) + cartes au projecteur */
(() => {
  const liste = $("#produits"), tpl = $("#tpl-produit");
  PRODUITS.forEach((p) => {
    const c = tpl.content.firstElementChild.cloneNode(true);
    $(".carte-picto", c).innerHTML = p.picto;
    $("h3", c).textContent = p.nom;
    $(".carte-texte", c).textContent = p.texte;
    $(".carte-prix span", c).textContent = euros(p.prix) + (p.suffixe || "");
    if (p.suffixe) $(".carte-prix small", c).remove();
    $(".carte-aide", c).textContent = p.aideMax ? `Aides jusqu'à ${euros(p.aideMax)}` : "Offert la première année avec la PAC";
    const lien = $(".carte-lien", c);
    if (p.projet) {
      lien.textContent = "Simuler →";
      lien.addEventListener("click", () => { const r = $(`input[name="projet"][value="${p.projet}"]`); if (r) { r.checked = true; r.dispatchEvent(new Event("change", { bubbles: true })); } });
    } else { lien.textContent = "Le déroulé →"; lien.href = "#etapes"; }
    liste.append(c);
  });
  const cartes = $$(".carte", liste);
  let id = 0, ev = null;
  const poser = () => { id = 0; for (const c of cartes) { const b = c.getBoundingClientRect(); c.style.setProperty("--x", `${ev.clientX - b.left}px`); c.style.setProperty("--y", `${ev.clientY - b.top}px`); } };
  liste.addEventListener("pointermove", (e) => { if (e.pointerType !== "mouse") return; ev = e; if (!id) id = requestAnimationFrame(poser); });
  liste.addEventListener("pointerleave", () => cartes.forEach((c) => { c.style.removeProperty("--x"); c.style.removeProperty("--y"); }));
})();

/* ------------------------------------------------------------------ chantiers (articles datés tirés de CHANTIERS) */
(() => {
  const liste = $("#liste-chantiers"), tpl = $("#tpl-chantier");
  const fmt = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric" });
  CHANTIERS.forEach((ch) => {
    const c = tpl.content.firstElementChild.cloneNode(true);
    const img = $("img", c);
    img.src = `images/${ch.image}-600.webp`;
    img.srcset = `images/${ch.image}-600.webp 600w, images/${ch.image}-900.webp 900w`;
    img.sizes = "(min-width: 768px) 30vw, 100vw";
    img.alt = ch.alt;
    img.dataset.prompt = `Chantier de pompe à chaleur à ${ch.lieu} (Luberon) : unité extérieure posée, lumière d'automne, même grain que la série`;
    img.dataset.ratio = "4:3";
    const t = $("time", c); t.dateTime = ch.date; t.textContent = `${fmt.format(new Date(ch.date))} · ${ch.lieu}`;
    $("h3", c).textContent = ch.titre; // pas de lien tant que la page du chantier n'existe pas
    $("p", c).textContent = ch.texte;
    liste.append(c);
  });
})();

/* ------------------------------------------------------------------ simulateur */
const form = $("[data-sim]");
const sortie = (k) => $(`[data-res="${k}"]`);
let graphe = null;
// même phrase dans le simulateur et le comparatif ; « isoler d'abord » seulement pour une PAC dans une maison d'avant 2000
const nonRembourse = () => sim.projet === "ballon" ? "Pas remboursé en dix ans avec ces réglages."
  : sim.isolation <= 60 ? "Pas remboursé en dix ans&#8239;: maison déjà sobre, la PAC se justifie surtout au remplacement de la chaudière."
  : "Pas remboursé en dix ans&#8239;: isoler d'abord&#8239;?";
const majSim = () => {
  const fd = new FormData(form);
  sim.energie = fd.get("energie"); sim.surface = +fd.get("surface"); sim.isolation = +fd.get("isolation");
  sim.personnes = +fd.get("personnes"); sim.revenus = +fd.get("revenus"); sim.projet = fd.get("projet");
  $('[data-sortie="surface"]').textContent = `${sim.surface} m²`;
  $('[data-sortie="personnes"]').textContent = sim.personnes;
  const r = calculer();
  const eco = Math.max(0, Math.round(r.economie / 10) * 10);
  const el = sortie("economie");
  if (window.gestes?.odometre) window.gestes.odometre(el, eco.toLocaleString("fr-FR").replace(/\s/g, " "));
  else el.textContent = nb(eco);
  sortie("avant").textContent = euros(r.avant) + "/an";
  sortie("apres").textContent = euros(r.apres) + "/an";
  sortie("prix").textContent = euros(r.prix) + (r.reseau ? "\u00a0+\u00a0réseau" : "");
  sortie("aides").textContent = r.aides ? "−" + euros(r.aides) : "aucune";
  sortie("reste").textContent = r.reseau ? "à la visite" : euros(r.reste);
  $(".res-titre").textContent = r.reseau ? "Économie estimée par an, une fois le réseau d'eau créé" : "Économie estimée par an";
  sortie("retour").innerHTML = r.reseau
    ? "Radiateurs électriques&#8239;: le réseau d'eau à créer, ou une PAC air/air, se chiffre à la visite. Pas de durée de remboursement sans ce chiffre."
    : r.retour ? `Remboursé en <b>${nb(r.retour, 1)}&nbsp;ans</b>.`
    : nonRembourse();
  // résumé repris dans le formulaire et le comparatif
  const nomE = { fioul: "fioul", gaz: "gaz", propane: "propane", elec: "électrique" }[sim.energie];
  const nomP = { "pac-ballon": "PAC + ballon", pac: "PAC seule", ballon: "ballon seul" }[sim.projet];
  $("[data-resume-sim]").textContent = r.reseau
    ? `${nomP}, ${nomE}, ${sim.surface}\u00a0m², réseau d'eau à chiffrer`
    : `${nomP}, ${nomE}, ${sim.surface}\u00a0m², ${euros(eco)} d'économie par an`;
  $("[data-dix-nom-avant]").textContent = r.nomAvant;
  $(".dix-legende .apres").hidden = r.reseau;
  $("#dix-ans").classList.toggle("sans-apres", !!r.reseau); // une seule courbe : le titre ne promet plus « avant et après »
  $("[data-dix-resume]").textContent = r.reseau
    ? "Le réseau d'eau se chiffre à la visite\u202f: seule la facture actuelle est tracée."
    : r.retour
    ? `Remboursé en ${nb(r.retour, 1)}\u00a0ans, puis ${euros(r.annees[10].avant - r.annees[10].apres)} gagnés à dix ans.`
    : nonRembourse().replace(/&#8239;/g, "\u202f");
  tableau(r);
  graphe?.maj(r);
};
form.addEventListener("input", majSim);
form.addEventListener("change", majSim);

/* tableau équivalent (accessible, et seul affichage si D3 ne charge pas) */
const tableau = (r) => {
  const k = (v) => nb(v / 1000, 1) + "\u202fk€";
  $("[data-dix-table] tbody").innerHTML = r.annees.filter((a) => a.an % 2 === 0).map((a) =>
    `<tr><td>${a.an === 0 ? "pose" : "an " + a.an}</td><td>${k(a.avant)}</td><td>${r.reseau ? "à la visite" : k(a.apres)}</td></tr>`).join("");
};

/* ------------------------------------------------------------------ comparatif sur dix ans (D3), animé à l'entrée */
const creerGraphe = (d3) => {
  const boite = $("[data-dix]");
  const svg = d3.select(boite).append("svg");
  const gAxeX = svg.append("g").attr("class", "axe"), gAxeY = svg.append("g").attr("class", "axe");
  const zone = svg.append("path").attr("fill", "rgb(246 181 74 / .28)");
  const lA = svg.append("path").attr("fill", "none").attr("stroke", "#7c8a93").attr("stroke-width", 3);
  const lP = svg.append("path").attr("fill", "none").attr("stroke", "#b83f1a").attr("stroke-width", 4);
  const point = svg.append("g").attr("opacity", 0);
  point.append("circle").attr("r", 7).attr("fill", "#fbfcfc").attr("stroke", "#b83f1a").attr("stroke-width", 3);
  const etiquette = point.append("text").attr("x", 12).attr("y", 26).attr("text-anchor", "start").attr("font-weight", 700).attr("font-size", 14).attr("fill", "#14212a").attr("stroke", "#fbfcfc").attr("stroke-width", 5).attr("paint-order", "stroke");
  const finA = svg.append("text").attr("font-weight", 700).attr("font-size", 14).attr("fill", "#4a5862");
  const finP = svg.append("text").attr("font-weight", 700).attr("font-size", 14).attr("fill", "#a33a17");
  let dernier = null, vu = reduit;

  const dessiner = (r, anim) => {
    dernier = r;
    const W = boite.clientWidth, Hh = boite.clientHeight, m = { t: 30, r: W < 500 ? 70 : 96, b: 30, l: W < 500 ? 46 : 56 };
    svg.attr("viewBox", `0 0 ${W} ${Hh}`);
    const x = d3.scaleLinear().domain([0, 10]).range([m.l, W - m.r]);
    const max = d3.max(r.annees, (a) => Math.max(a.avant, a.apres));
    const y = d3.scaleLinear().domain([0, max * 1.08]).nice().range([Hh - m.b, m.t]);
    const t = svg.transition().duration(anim && !reduit ? 700 : 0).ease(d3.easeCubicOut);
    gAxeX.attr("transform", `translate(0,${Hh - m.b})`).transition(t).call(d3.axisBottom(x).tickValues(W < 500 ? [0, 5, 10] : d3.range(0, 11, 2)).tickFormat((d) => (d === 0 ? "pose" : `${d} ans`)).tickSizeOuter(0));
    gAxeY.attr("transform", `translate(${m.l},0)`).transition(t).call(d3.axisLeft(y).ticks(5).tickFormat((d) => (d >= 1000 ? `${d / 1000} k€` : `${d} €`)).tickSize(-(W - m.l - m.r)));
    gAxeY.selectAll(".tick line").attr("stroke-opacity", 0.5);
    gAxeY.select(".domain").remove();
    const ligne = (k) => d3.line().x((a) => x(a.an)).y((a) => y(a[k])).curve(d3.curveMonotoneX)(r.annees);
    const aire = d3.area().x((a) => x(a.an)).y0((a) => y(Math.max(a.avant, a.apres))).y1((a) => y(a.apres)).curve(d3.curveMonotoneX)(r.annees.map((a) => ({ ...a, apres: Math.min(a.apres, a.avant) })));
    if (!vu) { // avant l'entrée à l'écran : chemins posés, cachés
      [lA, lP].forEach((l, i) => l.attr("d", ligne(i ? "apres" : "avant")));
      zone.attr("d", aire).attr("opacity", 0);
      [lA, lP].forEach((l) => { const n = l.node().getTotalLength(); l.attr("stroke-dasharray", `${n} ${n}`).attr("stroke-dashoffset", n); });
    } else {
      lA.transition(t).attr("d", ligne("avant"));
      lP.transition(t).attr("d", ligne("apres"));
      zone.transition(t).attr("d", aire).attr("opacity", r.reseau ? 0 : 1);
    }
    // radiateurs électriques : pas de courbe PAC tant que le réseau d'eau n'est pas chiffré
    lP.attr("opacity", r.reseau ? 0 : 1); finP.attr("opacity", r.reseau ? 0 : 1);
    const der = r.annees[10];
    finA.transition(t).attr("x", x(10) + 8).attr("y", y(der.avant) + 5).text(euros(der.avant));
    finP.transition(t).attr("x", x(10) + 8).attr("y", y(der.apres) + 5).text(euros(der.apres));
    if (r.retour) {
      const ar = Math.floor(r.retour), f = r.retour - ar, A = r.annees[ar], B = r.annees[ar + 1];
      const v = A.apres + (B.apres - A.apres) * f;
      point.transition(t).attr("transform", `translate(${x(r.retour)},${y(v)})`).attr("opacity", vu ? 1 : 0);
      etiquette.text(`remboursé en ${nb(r.retour, 1)}\u00a0ans`);
    } else point.transition(t).attr("opacity", 0);
  };
  const entree = () => {
    vu = true;
    const n = (l) => l.node().getTotalLength();
    [lA, lP].forEach((l, i) => l.transition().delay(i * 250).duration(1600).ease(d3.easeCubicInOut).attr("stroke-dashoffset", 0).on("end", () => l.attr("stroke-dasharray", null)));
    zone.transition().delay(1500).duration(600).attr("opacity", dernier?.reseau ? 0 : 1);
    point.transition().delay(1700).duration(400).attr("opacity", dernier?.retour ? 1 : 0);
  };
  if (!reduit) new IntersectionObserver(([e], io) => { if (e.isIntersecting) { io.disconnect(); entree(); } }, { threshold: 0.45 }).observe(boite);
  let rt = 0;
  new ResizeObserver(() => { cancelAnimationFrame(rt); rt = requestAnimationFrame(() => dernier && dessiner(dernier, false)); }).observe(boite);
  return { maj: (r) => dessiner(r, true) };
};

/* ------------------------------------------------------------------ formulaire de visite (n'envoie rien) */
(() => {
  const f = $("[data-form]"), err = $("[data-erreur]"), ok = $("[data-confirmation]");
  f.addEventListener("submit", (e) => {
    e.preventDefault();
    let vide = null;
    $$("input[required]", f).forEach((i) => { const bad = !i.value.trim(); i.setAttribute("aria-invalid", String(bad)); if (bad && !vide) vide = i; });
    err.hidden = !vide;
    if (vide) { vide.focus(); return; }
    ok.hidden = false;
    ok.textContent = `C'est noté, ${$("#f-prenom").value.trim()}. Thomas vous rappelle sous 48 h ouvrées pour fixer la visite (exemple : rien n'a été envoyé).`;
    ok.focus();
  });
  $$("input[required]", f).forEach((i) => i.addEventListener("input", () => i.value.trim() && i.setAttribute("aria-invalid", "false")));
})();

/* ------------------------------------------------------------------ apparition des cartes générées (gestes.js tourne avant ce module) */
(() => {
  const { gsap, ScrollTrigger } = window;
  if (!gsap || !ScrollTrigger || reduit) return;
  const mm = gsap.matchMedia();
  mm.add("(prefers-reduced-motion: no-preference)", () => {
    gsap.set("[data-apparait]", { opacity: 0, y: 28 }); // opacité seule : les liens restent atteignables au clavier
    ScrollTrigger.batch("[data-apparait]", {
      start: "top 88%", once: true,
      onEnter: (lot) => gsap.to(lot, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.1, overwrite: true }),
    });
    // atteint au clavier avant d'avoir défilé : on l'affiche tout de suite
    const auFocus = (e) => { const bloc = e.target.closest?.("[data-apparait]"); if (bloc) gsap.set(bloc, { opacity: 1, y: 0, overwrite: true }); };
    document.addEventListener("focusin", auFocus);
    return () => document.removeEventListener("focusin", auFocus);
  });
})();

/* ------------------------------------------------------------------ démarrage */
majSim();
try {
  const d3 = await import("d3");
  graphe = creerGraphe(d3);
  graphe.maj(calculer());
} catch (e) {
  // D3 absent : le tableau équivalent reste, ouvert
  $(".dix-tableau").open = true;
  $("[data-dix]").hidden = true;
}
// les images changent la hauteur des sections : recalcul des déclencheurs une fois tout chargé
const recalcul = () => window.ScrollTrigger?.refresh();
if (document.readyState === "complete") recalcul(); else addEventListener("load", recalcul, { once: true });
document.fonts?.ready.then(recalcul);
