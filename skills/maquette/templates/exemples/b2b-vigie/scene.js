/*
 * Vigie — la scène épinglée : le capteur 3D au centre, cinq moments au défilement.
 *   0 titre · 1 il tourne (140 g) · 2 il se pose sur un palier · 3 vue éclatée (4 pièces chiffrées)
 *   4 il émet (ondes radio) : la courbe S-8 → aujourd'hui → S+3 franchit le seuil · 5 le SMS sur un téléphone en HTML
 *
 * Le capteur est construit en code avec three.js 0.170.0 (aucun fichier 3D) : profils tournés (« lathe »)
 * à arêtes vives, aluminium anodisé, bague moletée (relief généré), capot jaune vernis, aimant, carte,
 * pile, vis, LED. Il se pose sur un palier à semelle en fonte. Éclairage studio (RoomEnvironment + 3 lumières),
 * ombre de contact douce.
 *
 * Mouvement réduit : pas d'épinglage et pas de three.js. Les moments deviennent une suite d'états fixes ; les vues
 * du capteur (capteur, posé, éclaté) sont des images rendues une fois depuis cette scène (images/planche-*.webp),
 * comme les 3 gros plans de #details (images/gros-plan-*.webp) : voir VUES et rendreVues, exporté pour les refaire.
 * Sans WebGL ou si le CDN manque : une vraie photo du capteur remplace l'objet 3D, le reste fonctionne.
 */
const root = document.documentElement;
const { gsap, ScrollTrigger, SplitText } = window;
const cadre = document.querySelector("[data-scene]");
const toile = cadre.querySelector("[data-scene-3d]");
const halo = cadre.querySelector(".scene-halo");
const moments = [...cadre.querySelectorAll(".moment")];
const etiquettes = [...cadre.querySelectorAll(".etiquette")];
const courbe = cadre.querySelector("[data-courbe]");
const telephone = cadre.querySelector("[data-telephone]");
const notif = cadre.querySelector("[data-notif]");

const anime = () => root.classList.contains("motion");
const mobile = () => innerWidth < 768;
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a, b, k) => a + (b - a) * k;
const seg = (t, a, b) => clamp((t - a) / (b - a));
const doux = (k) => k * k * (3 - 2 * k);
const E = (t, a, b) => { const k = seg(t, a, b); return k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2; };

/* ------------------------------------------------------------------ cadrage de l'objet, image clé par image clé
   cx, cy : centre de l'objet dans l'écran (fractions) · fr : hauteur de l'objet / hauteur d'écran
   el : élévation de la caméra (degrés). Entre deux clés, interpolation douce. */
const CLES = {
  bureau: [
    [0.00, 0.5, 0.64, 0.33, 14], [0.12, 0.5, 0.62, 0.42, 10], [0.22, 0.5, 0.6, 0.42, 12],
    // posé : l'objet plus petit et plus haut, pour que le palier (corps rond, arbre, bague) se lise dessous
    [0.33, 0.5, 0.45, 0.22, 17], [0.42, 0.5, 0.45, 0.22, 16], [0.53, 0.5, 0.62, 0.58, 9],
    [0.6, 0.5, 0.62, 0.58, 9], [0.68, 0.2, 0.6, 0.3, 13], [1, 0.2, 0.6, 0.3, 13],
  ],
  // téléphone : objet plus grand et plus bas (moments 1 et 3), le texte en dessous à 68svh (FIX-8) ;
  // posé : objet plus petit pour que le palier se lise entre lui et le texte
  mobile: [
    [0.00, 0.5, 0.3, 0.33, 14], [0.12, 0.5, 0.39, 0.43, 10], [0.22, 0.5, 0.39, 0.43, 12],
    [0.33, 0.5, 0.27, 0.2, 16], [0.42, 0.5, 0.27, 0.2, 16], [0.53, 0.5, 0.36, 0.45, 9],
    [0.6, 0.5, 0.36, 0.45, 9], [0.68, 0.5, 0.19, 0.17, 14], [0.85, 0.5, 0.19, 0.17, 14], [0.9, 0.5, 0.15, 0.13, 14], [1, 0.5, 0.15, 0.13, 14],
  ],
};
const cadrage = (t, liste) => {
  let i = 0;
  while (i < liste.length - 2 && t > liste[i + 1][0]) i++;
  const a = liste[i], b = liste[i + 1], k = doux(seg(t, a[0], b[0]));
  return { cx: lerp(a[1], b[1], k), cy: lerp(a[2], b[2], k), fr: lerp(a[3], b[3], k), el: lerp(a[4], b[4], k) };
};

/* ------------------------------------------------------------------ l'état de la scène en fonction de t (0 à 1) */
const etat = (t, temps = 0, intro = 0) => {
  const repos = 1 - seg(t, 0, 0.05);
  return {
    t,
    rotY: -0.55 + Math.PI * 2 * E(t, 0, 0.34) + 0.45 * E(t, 0.42, 0.53) - 0.45 * E(t, 0.6, 0.68) + 0.55 * E(t, 0.6, 0.68)
      + repos * (Math.sin(temps * 0.35) * 0.35) - intro * 1.4,
    rotX: 0.3 * (1 - E(t, 0.1, 0.3)),
    base: 1.2 * (1 - Math.pow(seg(t, 0.24, 0.335), 2)) + repos * Math.sin(temps * 1.1) * 0.06,
    // le palier monte à la rencontre du capteur, puis s'efface quand le capteur émet (fond uni pour la courbe) ;
    // sa sortie finit avant l'entrée du moment 4 (0,645), sinon il traîne derrière le titre sur téléphone (tour 3, FIX-5)
    carter: t < 0.5 ? lerp(-17, 0, 1 - Math.pow(1 - seg(t, 0.19, 0.325), 3)) : lerp(0, -17, Math.pow(seg(t, 0.585, 0.645), 2)),
    eclate: E(t, 0.43, 0.53) * (1 - E(t, 0.6, 0.68)),
    alerte: t > 0.765,
    trace: seg(t, 0.675, 0.775),
    // la projection et « Casse probable » sont pleines à 0,81, le moment 4 s'efface à partir de 0,83 (FIX-7)
    projection: seg(t, 0.775, 0.81),
    tel: E(t, 0.875, 0.915),
    notif: E(t, 0.91, 0.945),
  };
};

/* ------------------------------------------------------------------ la courbe : tendance de vitesse efficace, S-8 à S+3
   Semaines : 0 = aujourd'hui (4,6 mm/s, seuil 4,5 franchi) ; de 0 à +3, la projection jusqu'à la casse probable. */
const alea = (s) => () => ((s = (s * 16807) % 2147483647) / 2147483647);
const W0 = -8, W1 = 3;
const donnees = (() => {
  const r = alea(42), pts = [];
  for (let i = 0; i <= (W1 - W0) * 7; i++) {
    const w = W0 + i / 7; // semaines
    const v = 1.9 + 2.7 * Math.exp(0.386 * w) + (w <= 0 ? (r() - 0.5) * 0.26 : 0);
    pts.push([w, Math.abs(w) < 1e-6 ? 4.6 : Math.min(v, 10.6)]);
  }
  return pts;
})();

const tracer = (boite, origine) => {
  // boite : { x0, x1, haut, bas } en pixels du conteneur ; origine : le capteur, d'où partent les ondes radio (ou null)
  const svg = courbe.querySelector("svg");
  const W = courbe.clientWidth, H = courbe.clientHeight;
  svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
  const X = (w) => lerp(boite.x0, boite.x1, (w - W0) / (W1 - W0));
  const Y = (v) => lerp(boite.bas, boite.haut, v / 12);
  const solide = donnees.filter(([w]) => w <= 1e-6);
  const futur = donnees.filter(([w]) => w >= -1e-6);
  const chemin = (pts) => pts.map(([w, v], i) => `${i ? "L" : "M"}${X(w).toFixed(1)},${Y(v).toFixed(1)}`).join("");
  const d = chemin(solide);
  const q = (s) => courbe.querySelector(s);
  const attrs = (el, o) => Object.entries(o).forEach(([k, v]) => el.setAttribute(k, typeof v === "number" ? +v.toFixed(1) : v));
  q("[data-courbe-trace]").setAttribute("d", d);
  q("[data-courbe-alerte]").setAttribute("d", d);
  q("[data-courbe-projection]").setAttribute("d", chemin(futur));
  const ys = Y(4.5), fin = solide.at(-1), bout = futur.at(-1);
  attrs(q("[data-courbe-seuil]"), { x1: boite.x0, x2: boite.x1, y1: ys, y2: ys });
  attrs(q("[data-courbe-clip]"), { x: boite.x0 - 10, y: -H, width: boite.x1 - boite.x0 + 20, height: ys + H });

  // l'échelle de temps : axe, 3 graduations, repère « aujourd'hui », accolade jaune « 3 semaines » (FIX-5)
  const ya = boite.bas + 8, yb = ya + 36, x0 = X(W0), xa = X(0), x3 = X(W1);
  attrs(q("[data-courbe-axe]"), { x1: x0, x2: x3, y1: ya, y2: ya });
  q("[data-courbe-graduations]").setAttribute("d", [x0, xa, x3].map((x) => `M${x.toFixed(1)},${ya}v5`).join(""));
  attrs(q("[data-courbe-repere]"), { x1: xa, x2: xa, y1: Y(fin[1]) + 9, y2: ya });
  q("[data-courbe-accolade]").setAttribute("d", `M${xa.toFixed(1)},${yb - 6}V${yb}H${x3.toFixed(1)}V${yb - 6}`);

  // les ondes radio : 3 arcs qui partent du capteur (aucun câble), vers la droite sur ordinateur, vers le bas sur téléphone (FIX-4)
  const ondes = q("[data-courbe-ondes]");
  if (origine) {
    const [ox, oy] = origine, th = mobile() ? Math.PI / 2 : 0, ouv = 0.62;
    [...ondes.children].forEach((a, i) => {
      const r = 17 + i * 15, p = (k) => `${(ox + r * Math.cos(th + k * ouv)).toFixed(1)},${(oy + r * Math.sin(th + k * ouv)).toFixed(1)}`;
      a.setAttribute("d", `M${p(-1)}A${r},${r} 0 0 1 ${p(1)}`);
    });
    ondes.style.display = "";
  } else ondes.style.display = "none";

  // les étiquettes, à 16 px au moins des bords et jamais sur la courbe (FIX-6)
  const notes = Object.fromEntries([...courbe.querySelectorAll("[data-note]")].map((n) => [n.dataset.note, n]));
  const place = (n, x, y) => { n.style.transform = `translate(${Math.round(clamp(x, 0, W - n.offsetWidth))}px, ${Math.round(y)}px)`; };
  const ls = notes.seuil.offsetWidth, hs = notes.seuil.offsetHeight;
  // « Seuil » à droite sous la ligne (la courbe passe au-dessus après aujourd'hui) ; à gauche au-dessus si la place manque
  if (boite.x1 - ls >= xa + 16) place(notes.seuil, boite.x1 - ls, ys + 8);
  else place(notes.seuil, boite.x0, ys - hs - 8);
  place(notes.aujourdhui, xa - notes.aujourdhui.offsetWidth - 14, Y(fin[1]) - 30);
  // bord droit calé sur le bout de la projection : l'étiquette ne dépasse plus l'axe (tour 3, FIX-6)
  place(notes.casse, Math.min(X(bout[0]) - notes.casse.offsetWidth, W - notes.casse.offsetWidth - 16), Y(bout[1]) - 30);
  place(notes.s8, x0, ya + 9);
  place(notes.auj, xa - notes.auj.offsetWidth / 2, ya + 9);
  place(notes.s3, x3 - notes.s3.offsetWidth, ya + 9);
  place(notes.duree, (xa + x3) / 2 - notes.duree.offsetWidth / 2, yb + 5);

  const trace = q("[data-courbe-trace]"), L = trace.getTotalLength();
  courbe._trace = {
    L, trace, alerte: q("[data-courbe-alerte]"), point: q("[data-courbe-point]"), proj: q("[data-courbe-projection]"), notes, ondes,
    axe: [q("[data-courbe-axe]"), q("[data-courbe-graduations]"), notes.s8, notes.auj, notes.s3], repere: q("[data-courbe-repere]"),
    accolade: [q("[data-courbe-accolade]"), notes.duree],
  };
  [trace, courbe._trace.alerte].forEach((p) => p.setAttribute("stroke-dasharray", `${L} ${L}`));
};

const dessinerCourbe = (s) => {
  const c = courbe._trace;
  if (!c) return;
  const p = s.trace;
  c.ondes.style.opacity = clamp(p * 8); // les ondes partent du capteur d'abord
  const pt = clamp((p - 0.2) / 0.8);
  [c.trace, c.alerte].forEach((x) => x.setAttribute("stroke-dashoffset", c.L * (1 - pt)));
  const pos = c.trace.getPointAtLength(c.L * pt);
  c.point.setAttribute("cx", pos.x); c.point.setAttribute("cy", pos.y);
  c.point.style.opacity = pt > 0.01 ? 1 : 0;
  c.proj.style.opacity = s.projection;
  c.notes.seuil.style.opacity = clamp(p * 5);
  c.axe.forEach((x) => (x.style.opacity = clamp(p * 5)));
  const auj = clamp((pt - 0.97) * 30);
  c.notes.aujourdhui.style.opacity = auj;
  c.repere.style.opacity = auj;
  c.notes.casse.style.opacity = s.projection;
  c.accolade.forEach((x) => (x.style.opacity = s.projection));
};

/* ================================================================== 3D */
const charger3D = async () => {
  try {
    const T = await import("three");
    const [{ RoomEnvironment }, { RoundedBoxGeometry }, { mergeGeometries }] = await Promise.all([
      import("three/addons/environments/RoomEnvironment.js"),
      import("three/addons/geometries/RoundedBoxGeometry.js"),
      import("three/addons/utils/BufferGeometryUtils.js"),
    ]);
    return { T, RoomEnvironment, RoundedBoxGeometry, mergeGeometries };
  } catch (e) {
    console.warn("Vigie : three.js indisponible, photo de repli.", e);
    return null;
  }
};

const textureToile = (T, l, h, dessin, repete) => {
  const c = document.createElement("canvas"); c.width = l; c.height = h;
  dessin(c.getContext("2d"), l, h);
  const tx = new T.CanvasTexture(c);
  if (repete) { tx.wrapS = tx.wrapT = T.RepeatWrapping; tx.repeat.set(...repete); }
  tx.anisotropy = 4;
  return tx;
};

const construire = (L) => {
  const { T, RoundedBoxGeometry, mergeGeometries } = L;
  const V2 = (x, y) => new T.Vector2(x, y);
  // Profil tourné à arêtes vives : chaque « trait » est tourné à part puis fusionné.
  const tour = (traits, n = 112) => mergeGeometries(traits.map((tr) => new T.LatheGeometry(tr.map(([x, y]) => V2(x, y)), n)));
  const arc = (cx, cy, r, a0, a1, n = 12) => Array.from({ length: n + 1 }, (_, i) => { const a = a0 + ((a1 - a0) * i) / n; return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; });
  const maille = (geo, mat, x = 0, y = 0, z = 0) => { const m = new T.Mesh(geo, mat); m.position.set(x, y, z); return m; };

  // Relief du moletage (losanges), répété sur la bague.
  const molette = textureToile(T, 64, 64, (g, l, h) => {
    g.fillStyle = "#fff"; g.fillRect(0, 0, l, h);
    g.strokeStyle = "#000"; g.lineWidth = 9;
    [[0, 0, l, h], [l, 0, 0, h], [-l, 0, 0, h], [l, 0, 2 * l, h], [0, h, l, 2 * h], [l, -h, 0, 0]].forEach(([a, b, c, d]) => { g.beginPath(); g.moveTo(a, b); g.lineTo(c, d); g.stroke(); });
  }, [120, 9]);
  const ombreTx = textureToile(T, 256, 256, (g, l) => {
    const r = g.createRadialGradient(l / 2, l / 2, 0, l / 2, l / 2, l / 2);
    r.addColorStop(0, "rgba(0,0,0,0.85)"); r.addColorStop(0.35, "rgba(0,0,0,0.5)"); r.addColorStop(1, "rgba(0,0,0,0)");
    g.fillStyle = r; g.fillRect(0, 0, l, l);
  });
  const lueurTx = textureToile(T, 128, 128, (g, l) => {
    const r = g.createRadialGradient(l / 2, l / 2, 0, l / 2, l / 2, l / 2);
    r.addColorStop(0, "rgba(255,214,90,1)"); r.addColorStop(0.25, "rgba(255,194,26,0.55)"); r.addColorStop(1, "rgba(255,194,26,0)");
    g.fillStyle = r; g.fillRect(0, 0, l, l);
  });
  const marque = textureToile(T, 512, 512, (g, l) => {
    g.clearRect(0, 0, l, l);
    g.fillStyle = "rgba(20,22,24,0.72)";
    g.font = "600 66px Archivo, Arial, sans-serif"; g.textAlign = "center"; g.textBaseline = "middle";
    g.fillText("VIGIE", l / 2, l / 2 + 4);
    g.lineWidth = 3; g.strokeStyle = "rgba(20,22,24,0.35)"; g.beginPath(); g.arc(l / 2, l / 2, l * 0.4, 0, Math.PI * 2); g.stroke();
  });
  // Grain de la fonte moulée (relief fin, aléatoire mais reproductible).
  const grain = textureToile(T, 128, 128, (g, l, h) => {
    const r = alea(11);
    g.fillStyle = "#808080"; g.fillRect(0, 0, l, h);
    for (let i = 0; i < 1400; i++) { const v = 90 + r() * 90; g.fillStyle = `rgb(${v},${v},${v})`; g.fillRect(r() * l, r() * h, 1 + r() * 2, 1 + r() * 2); }
  }, [10, 3]);
  // Dessus de la carte : pistes, pastilles, et le repère X / Y / Z sérigraphié à côté de l'accéléromètre 3 axes.
  // (chapeau d'un cylindre : u = z / 2r + 0,5 ; v = x / 2r + 0,5 ; en pixels du canvas, y = (0,5 - x / 2r) × taille)
  const serigraphie = textureToile(T, 512, 512, (g, l) => {
    const px = (x, z) => [(z / 3.76 + 0.5) * l, (0.5 - x / 3.76) * l];
    g.fillStyle = "#12241b"; g.fillRect(0, 0, l, l);
    const r = alea(5);
    g.strokeStyle = "#1f3d2d"; g.lineWidth = 3; g.lineCap = "round";
    for (let i = 0; i < 26; i++) {
      let x = r() * l, y = r() * l; g.beginPath(); g.moveTo(x, y);
      for (let k = 0; k < 3; k++) { const d = 30 + r() * 90; if (r() < 0.5) x += (r() < 0.5 ? -d : d); else y += (r() < 0.5 ? -d : d); g.lineTo(x, y); }
      g.stroke();
    }
    g.fillStyle = "#b9a76c";
    for (let i = 0; i < 40; i++) g.fillRect(r() * l, r() * l, 6, 9);
    const [ax, ay] = px(-0.95, -0.45);
    g.strokeStyle = g.fillStyle = "#e9ece6"; g.lineWidth = 3;
    g.beginPath(); g.moveTo(ax, ay); g.lineTo(ax + 64, ay); g.moveTo(ax, ay); g.lineTo(ax, ay - 64); g.stroke();
    g.beginPath(); g.moveTo(ax + 72, ay); g.lineTo(ax + 58, ay - 7); g.lineTo(ax + 58, ay + 7); g.fill();
    g.beginPath(); g.moveTo(ax, ay - 72); g.lineTo(ax - 7, ay - 58); g.lineTo(ax + 7, ay - 58); g.fill();
    g.beginPath(); g.arc(ax, ay, 9, 0, Math.PI * 2); g.stroke(); g.beginPath(); g.arc(ax, ay, 3, 0, Math.PI * 2); g.fill();
    g.font = "600 24px 'IBM Plex Mono', monospace"; g.textBaseline = "middle"; g.textAlign = "center";
    g.fillText("X", ax + 84, ay + 18); g.fillText("Y", ax - 20, ay - 76); g.fillText("Z", ax - 22, ay + 20);
  });
  serigraphie.colorSpace = T.SRGBColorSpace;
  marque.colorSpace = T.SRGBColorSpace; lueurTx.colorSpace = T.SRGBColorSpace;

  const M = {
    anodise: new T.MeshPhysicalMaterial({ color: 0x6d757b, metalness: 1, roughness: 0.4, anisotropy: 0.6, clearcoat: 0.25, clearcoatRoughness: 0.3 }),
    molette: new T.MeshPhysicalMaterial({ color: 0x737b81, metalness: 1, roughness: 0.42, bumpMap: molette, bumpScale: 3 }),
    dedans: new T.MeshStandardMaterial({ color: 0x15181a, metalness: 0.7, roughness: 0.6, side: T.DoubleSide }),
    jaune: new T.MeshPhysicalMaterial({ color: 0xffc21a, metalness: 0, roughness: 0.3, clearcoat: 1, clearcoatRoughness: 0.12 }),
    aimant: new T.MeshStandardMaterial({ color: 0x0c0d0e, metalness: 0.35, roughness: 0.5 }),
    acier: new T.MeshStandardMaterial({ color: 0xbfc5c9, metalness: 1, roughness: 0.24 }),
    pcb: new T.MeshStandardMaterial({ color: 0x0f1d17, metalness: 0.15, roughness: 0.42 }),
    puce: new T.MeshStandardMaterial({ color: 0x0a0a0b, metalness: 0.25, roughness: 0.38 }),
    etain: new T.MeshStandardMaterial({ color: 0xcfd3d6, metalness: 1, roughness: 0.28 }),
    manchon: new T.MeshPhysicalMaterial({ color: 0x24292d, metalness: 0.25, roughness: 0.48, clearcoat: 0.5 }),
    bande: new T.MeshStandardMaterial({ color: 0xd8d7d1, metalness: 0, roughness: 0.6 }),
    fonte: new T.MeshStandardMaterial({ color: 0x384240, metalness: 0.3, roughness: 0.8, bumpMap: grain, bumpScale: 0.7 }),
    joint: new T.MeshStandardMaterial({ color: 0x111314, metalness: 0.1, roughness: 0.7 }),
    usine: new T.MeshStandardMaterial({ color: 0xa3abb0, metalness: 1, roughness: 0.2 }),
    vis: new T.MeshStandardMaterial({ color: 0x5b6267, metalness: 1, roughness: 0.32 }),
    led: new T.MeshBasicMaterial({ color: 0xffc21a, toneMapped: false }),
  };

  // ---------- aimant (base) + plaque + 3 vis
  const aimant = new T.Group();
  aimant.add(new T.Mesh(tour([[[0, 0], [2.0, 0]], [[2.0, 0], [2.1, 0.08]], [[2.1, 0.08], [2.1, 0.42]], [[2.1, 0.42], [2.05, 0.45]], [[2.05, 0.45], [0, 0.45]]]), M.aimant));
  aimant.add(new T.Mesh(tour([[[2.14, 0.45], [2.14, 0.6]], [[2.14, 0.6], [0, 0.6]]]), M.acier));
  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * Math.PI * 2 + 0.5, x = Math.cos(a) * 1.72, z = Math.sin(a) * 1.72;
    aimant.add(maille(new T.CylinderGeometry(0.17, 0.17, 0.08, 24), M.vis, x, 0.64, z));
    aimant.add(maille(new T.CylinderGeometry(0.075, 0.075, 0.6, 12), M.vis, x, 0.98, z));
    const fente = maille(new T.BoxGeometry(0.3, 0.03, 0.05), M.puce, x, 0.68, z); fente.rotation.y = a; aimant.add(fente);
  }

  // ---------- pile
  const pile = new T.Group();
  pile.add(maille(new T.CylinderGeometry(1.5, 1.5, 1.1, 72, 1, true), M.manchon, 0, 2.0, 0));
  pile.add(maille(new T.CylinderGeometry(1.505, 1.505, 0.14, 72, 1, true), M.bande, 0, 2.28, 0));
  pile.add(maille(new T.CylinderGeometry(1.47, 1.47, 0.05, 72), M.etain, 0, 1.43, 0));
  pile.add(maille(new T.CylinderGeometry(1.47, 1.47, 0.05, 72), M.etain, 0, 2.57, 0));
  pile.add(maille(new T.CylinderGeometry(0.36, 0.36, 0.09, 36), M.etain, 0, 2.63, 0));

  // ---------- carte
  const carte = new T.Group();
  carte.add(maille(new T.CylinderGeometry(1.88, 1.88, 0.1, 72), [M.pcb, new T.MeshStandardMaterial({ map: serigraphie, metalness: 0.15, roughness: 0.42 }), M.pcb], 0, 3.4, 0));
  carte.add(maille(new T.BoxGeometry(0.66, 0.1, 0.66), M.puce, -0.25, 3.5, 0.12));
  carte.add(maille(new T.BoxGeometry(0.38, 0.14, 0.38), M.puce, 0.78, 3.52, -0.45));
  carte.add(maille(new T.BoxGeometry(0.95, 0.14, 0.56), M.etain, 0.3, 3.52, 0.85));
  const antenne = maille(new T.BoxGeometry(1.7, 0.02, 0.09), M.etain, -0.55, 3.46, -1.25); antenne.rotation.y = 0.25; carte.add(antenne);
  const ra = alea(7);
  for (let i = 0; i < 14; i++) {
    const a = ra() * Math.PI * 2, r = 0.9 + ra() * 0.75;
    const c = maille(new T.BoxGeometry(0.14, 0.06, 0.07), i % 3 ? M.etain : M.puce, Math.cos(a) * r, 3.48, Math.sin(a) * r);
    c.rotation.y = ra() * Math.PI; carte.add(c);
  }

  // ---------- coque : corps anodisé, bague moletée, capot jaune, LED
  //   Proportions du capteur des photos (ecoute, palier, intervention), de haut en bas : capot jaune mince (≈ 14 %),
  //   bandeau anodisé, bague moletée (≈ 22 %), corps avec la LED au tiers haut, puis l'aimant (tour 2, FIX-3).
  const coque = new T.Group();
  coque.add(new T.Mesh(tour([
    [[1.95, 0.6], [2.2, 0.6]], [[2.2, 0.6], [2.2, 1.15]], [[2.2, 1.15], [2.12, 1.19]], [[2.12, 1.19], [2.12, 1.27]],
    [[2.12, 1.27], [2.2, 1.31]], [[2.2, 1.31], [2.2, 2.6]], [[2.2, 3.75], [2.2, 4.42]], [[2.2, 4.42], [2.15, 4.46]],
  ]), M.anodise));
  coque.add(new T.Mesh(tour([[[2.2, 2.6], [2.27, 2.65]], [[2.27, 2.65], [2.27, 3.7]], [[2.27, 3.7], [2.2, 3.75]]]), M.molette));
  coque.add(new T.Mesh(tour([[[2.16, 4.46], [2.16, 4.86]], arc(1.86, 4.86, 0.3, 0, Math.PI / 2), [[1.86, 5.16], [1.1, 5.19], [0, 5.2]]]), M.jaune));
  coque.add(new T.Mesh(tour([[[1.95, 3.9], [1.95, 0.6]], [[0, 3.9], [1.95, 3.9]]], 64), M.dedans));
  const decal = maille(new T.CircleGeometry(1.3, 48), new T.MeshStandardMaterial({ map: marque, transparent: true, roughness: 0.5, polygonOffset: true, polygonOffsetFactor: -2 }), 0, 5.205, 0);
  decal.rotation.x = -Math.PI / 2; coque.add(decal);
  const lunette = maille(new T.RingGeometry(0.12, 0.19, 40), M.vis, 0, 2.0, 2.203); coque.add(lunette);
  const led = maille(new T.CircleGeometry(0.12, 32), M.led, 0, 2.0, 2.205); coque.add(led);
  const lueur = new T.Sprite(new T.SpriteMaterial({ map: lueurTx, transparent: true, depthWrite: false, depthTest: false, blending: T.AdditiveBlending, opacity: 0.8 }));
  lueur.position.set(0, 2.0, 2.26); lueur.scale.setScalar(1.1); lueur.renderOrder = 10; coque.add(lueur);

  // ---------- assemblage : pivot au centre du capteur (inclinaison), base à y = 0
  const capteur = new T.Group(), corps = new T.Group();
  corps.position.y = -2.6;
  corps.add(aimant, pile, carte, coque);
  capteur.add(corps);

  // ---------- palier à semelle en fonte (celui des photos « ecoute » et « palier ») : 1 unité ≈ 10 mm.
  //   Corps rond tourné autour de l'arbre (axe vers la caméra), roulement et joint, bague de blocage, bout d'arbre usiné,
  //   pied et semelle à 2 boulons. Le capteur se pose sur un bossage usiné au droit du roulement (haut du palier, y = 0).
  const carter = new T.Group();
  const yc = -5, R = 4.4, P = 2.6; // axe de l'arbre, rayon du corps, demi-largeur du corps le long de l'arbre
  const axeZ = (mesh, y = yc, z = 0) => { mesh.rotation.x = Math.PI / 2; mesh.position.set(0, y, z); return mesh; };
  carter.add(axeZ(new T.Mesh(tour([
    [[3.2, -P], [4.05, -P]], [[4.05, -P], [R, -P + 0.35]], [[R, -P + 0.35], [R, P - 0.35]], [[R, P - 0.35], [4.05, P]], [[4.05, P], [3.2, P]],
  ]), M.fonte)));
  // (ordre des points d'un profil : rayon qui décroît = face tournée vers +z, rayon qui croît = face vers -z)
  carter.add(axeZ(new T.Mesh(tour([[[3.2, P], [3.2, -P]], [[3.2, P - 0.15], [2.0, P - 0.15]], [[2.0, -P + 0.15], [3.2, -P + 0.15]]], 72), M.vis)));
  carter.add(axeZ(new T.Mesh(tour([[[3.12, P + 0.02], [2.55, P + 0.02]]], 72), M.joint)));
  // bague de blocage et sa vis, puis l'arbre (bout usiné, centre pointé)
  carter.add(axeZ(new T.Mesh(tour([[[2.0, P], [2.62, P]], [[2.62, P], [2.72, P + 0.1]], [[2.72, P + 0.1], [2.72, P + 1.05]], [[2.72, P + 1.05], [2.62, P + 1.15]], [[2.62, P + 1.15], [2.0, P + 1.15]]], 72), M.vis)));
  carter.add(maille(new T.CylinderGeometry(0.26, 0.26, 0.5, 16), M.puce, 0, yc + 2.8, P + 0.6));
  carter.add(axeZ(new T.Mesh(new T.CylinderGeometry(2.0, 2.0, 13, 72), M.usine), yc, P + 1.75 - 6.5));
  carter.add(axeZ(new T.Mesh(tour([[[2.0, P + 1.75], [1.85, P + 1.9]], [[1.85, P + 1.9], [0, P + 1.9]]], 72), M.usine)));
  carter.add(maille(new T.CircleGeometry(0.32, 24), M.puce, 0, yc, P + 1.91));
  // bossage usiné sous le capteur
  carter.add(maille(new T.CylinderGeometry(2.4, 2.55, 1.8, 72), M.fonte, 0, -0.9, 0));
  carter.add(maille(new T.CylinderGeometry(2.4, 2.4, 0.04, 96), M.usine, 0, 0.0, 0));
  // pied et semelle (fonte), 2 boulons à six pans avec rondelle
  carter.add(maille(new RoundedBoxGeometry(7.6, 3.6, 4.6, 4, 0.4), M.fonte, 0, -6.6, 0));
  carter.add(maille(new RoundedBoxGeometry(17.6, 1.7, 5.0, 4, 0.3), M.fonte, 0, -9.05, 0));
  [-6.8, 6.8].forEach((x) => {
    carter.add(maille(new RoundedBoxGeometry(2.8, 0.5, 3.4, 3, 0.15), M.fonte, x, -8.05, 0));
    carter.add(maille(new T.CylinderGeometry(1.1, 1.1, 0.12, 36), M.acier, x, -7.74, 0));
    const ecrou = maille(new T.CylinderGeometry(0.85, 0.85, 0.7, 6), M.vis, x, -7.33, 0); ecrou.rotation.y = 0.3; carter.add(ecrou);
    carter.add(maille(new T.CylinderGeometry(0.42, 0.42, 0.55, 20), M.acier, x, -6.7, 0));
  });

  const ombre = new T.Mesh(new T.PlaneGeometry(1, 1), new T.MeshBasicMaterial({ map: ombreTx, transparent: true, depthWrite: false, color: 0x000000 }));
  ombre.rotation.x = -Math.PI / 2;

  const scene = new T.Scene();
  scene.add(capteur, carter, ombre);
  const cles = [
    new T.DirectionalLight(0xffffff, 2.6), new T.DirectionalLight(0xcfe0ff, 2.2), new T.DirectionalLight(0xfff4e0, 0.7),
  ];
  cles[0].position.set(-6, 10, 8); cles[1].position.set(8, 5, -9); cles[2].position.set(0, 12, 3);
  scene.add(...cles);

  const pieces = {
    coque: { g: coque, y: 2.9, r: 2.3, dy: 6.4 },
    carte: { g: carte, y: 3.4, r: 1.9, dy: 2.6 },
    pile: { g: pile, y: 2.0, r: 1.5, dy: 1.6 },
    aimant: { g: aimant, y: 0.3, r: 2.15, dy: 0 },
  };
  return { scene, capteur, corps, carter, ombre, pieces, led, lueur, M };
};

const preparerRendu = (L, canvas, conserver = false) => {
  const { T, RoomEnvironment } = L;
  const r = new T.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance", preserveDrawingBuffer: conserver });
  r.setPixelRatio(Math.min(devicePixelRatio || 1, 1.75));
  r.setClearColor(0x000000, 0);
  r.toneMapping = T.NeutralToneMapping;
  r.toneMappingExposure = 1.02;
  r.outputColorSpace = T.SRGBColorSpace;
  const pmrem = new T.PMREMGenerator(r);
  const env = pmrem.fromScene(new RoomEnvironment(), 0.035).texture;
  pmrem.dispose();
  return { r, env };
};

/* Pose l'objet et la caméra pour l'état s ; c = cadrage (cx, cy, fr, el) ; W, H en pixels CSS */
const poser = (L, m, camera, s, c, W, H) => {
  const { T } = L;
  const e = s.eclate;
  m.capteur.position.set(0, s.base + 2.6, 0);
  m.capteur.rotation.set(s.rotX, s.rotY, 0);
  for (const p of Object.values(m.pieces)) p.g.position.y = p.dy * e;
  m.pieces.coque.g.rotation.y = 0.5 * e;
  m.pieces.carte.g.rotation.y = -0.35 * e;
  m.carter.position.y = s.carter;
  m.carter.visible = s.carter > -16.5;
  // ombre de contact : sur le carter quand il est là, sinon sur un sol invisible ; plus nette quand l'objet est près
  const sol = Math.max(s.carter, s.t > 0.6 ? 0 : -1.2) + 0.065;
  const haut = Math.max(0, s.base - sol);
  m.ombre.position.set(0, sol, 0);
  m.ombre.scale.setScalar(5.6 + haut * 1.6);
  m.ombre.material.opacity = (s.carter > -0.6 ? 0.95 : 0.45) / (1 + haut * 0.8);

  const refY = s.base + lerp(2.6, 5.8, e), refH = lerp(5.2, 11.8, e);
  const fov = camera.fov * (Math.PI / 180);
  const dist = refH / (2 * c.fr * Math.tan(fov / 2));
  const el = c.el * (Math.PI / 180);
  camera.position.set(0, refY + Math.sin(el) * dist, Math.cos(el) * dist);
  camera.lookAt(0, refY, 0);
  camera.aspect = W / H;
  camera.setViewOffset(W, H, (0.5 - c.cx) * W, (0.5 - c.cy) * H, W, H);
  camera.updateProjectionMatrix();
  camera.updateMatrixWorld();
  m.capteur.updateMatrixWorld(true);
  return { refY, refH };
};

const projeter = (T, camera, v, W, H) => {
  const p = v.clone().project(camera);
  return [(p.x * 0.5 + 0.5) * W, (-p.y * 0.5 + 0.5) * H];
};

/* ================================================================== vues fixes rendues depuis cette scène
   Les planches du mouvement réduit et les 3 gros plans de #details sont des images rendues une fois par rendreVues
   (exporté : voir NOTES.md, « Boucle persona — tour 1 », pour le script qui les refait) et rangées dans images/.
   l × h : taille CSS de la vue ; t, s : état de la scène ; c : cadrage (comme CLES) ou camera : { cible, dist, el, az } ;
   seules : pièces visibles (gros plans détourés). */
const VUES = {
  "planche-1": { l: 880, h: 660, t: 0.15, s: { rotY: -0.5, rotX: 0.28, base: 0.4 }, c: { cx: 0.5, cy: 0.55, fr: 0.62, el: 12 } },
  "planche-2": { l: 880, h: 660, t: 0.38, s: { rotY: 0.35, rotX: 0, base: 0 }, c: { cx: 0.5, cy: 0.3, fr: 0.3, el: 16 } },
  "planche-3": { l: 880, h: 660, t: 0.565, s: { rotY: 0.5, rotX: 0, base: 0 }, c: { cx: 0.5, cy: 0.5, fr: 0.7, el: 12 }, etiquettes: true },
  // bague moletée et LED en gros plan (cadrée sur la bague, tour 2 FIX-7)
  "gros-plan-molette": { l: 400, h: 400, t: 0, s: { rotY: 0.45, rotX: 0, base: 0, carter: -17, eclate: 0 }, camera: { cible: [0, 2.95, 0], dist: 9.5, el: 8, az: 0.5 } },
  // la carte seule, le repère X / Y / Z de l'accéléromètre lisible
  "gros-plan-carte": { l: 400, h: 400, t: 0, s: { rotY: 0, rotX: 0, base: 0, carter: -17, eclate: 0 }, seules: ["carte"], camera: { cible: [0, 3.45, 0], dist: 9.2, el: 42, az: 0 } },
  // l'aimant posé sur le bossage du palier, fonte nue : rien de percé
  //   (capteur tourné d'un demi-tour : la LED, descendue au tour 2, entrait dans le cadre ; elle reste au gros plan de la bague)
  "gros-plan-aimant": { l: 400, h: 400, t: 0.4, s: { rotY: 3.4, rotX: 0, base: 0, carter: 0, eclate: 0 }, camera: { cible: [0, 0.1, 0], dist: 13, el: 9, az: 0.55 } },
};

const rendreVues = async (L, noms = Object.keys(VUES), ratio = 2) => {
  const { T } = L;
  const rendu = preparerRendu(L, document.createElement("canvas"), true);
  const m = construire(L);
  m.scene.environment = rendu.env; m.scene.environmentIntensity = 0.9;
  const camera = new T.PerspectiveCamera(28, 1, 0.1, 400);
  await document.fonts?.ready; // la marque gravée sur le capot utilise Archivo
  const sortie = {};
  for (const nom of noms) {
    const v = VUES[nom];
    rendu.r.setPixelRatio(ratio); rendu.r.setSize(v.l, v.h, false);
    poser(L, m, camera, Object.assign(etat(v.t), v.s), v.c || { cx: 0.5, cy: 0.5, fr: 0.5, el: 10 }, v.l, v.h);
    Object.entries(m.pieces).forEach(([k, p]) => (p.g.visible = !v.seules || v.seules.includes(k)));
    m.ombre.visible = !v.camera;
    if (v.camera) {
      const { cible: [x, y, z], dist, el, az } = v.camera, e = (el * Math.PI) / 180;
      camera.clearViewOffset();
      camera.position.set(x + Math.sin(az) * Math.cos(e) * dist, y + Math.sin(e) * dist, z + Math.cos(az) * Math.cos(e) * dist);
      camera.lookAt(x, y, z); camera.aspect = v.l / v.h; camera.updateProjectionMatrix(); camera.updateMatrixWorld();
    }
    // comme dans la scène : pas de lueur quand la LED tourne le dos (le halo passe à travers la coque)
    m.lueur.visible = Math.cos(m.capteur.rotation.y + 0.5 * (v.s.eclate ?? etat(v.t).eclate)) > 0.35;
    rendu.r.render(m.scene, camera);
    sortie[nom] = { url: rendu.r.domElement.toDataURL("image/webp", 0.92) };
    if (v.etiquettes) {
      // point d'accroche de chaque étiquette, en fractions de l'image (data-fx / data-fy dans index.html)
      sortie[nom].etiquettes = etiquettes.map((et) => {
        const p = m.pieces[et.dataset.piece], g = et.dataset.cote === "gauche" ? -1 : 1;
        const w = new T.Vector3(0, p.y, 0); p.g.localToWorld(w); w.x += g * (p.r + 0.2);
        const [x, y] = projeter(T, camera, w, v.l, v.h);
        return { piece: et.dataset.piece, fx: +(x / v.l).toFixed(3), fy: +(y / v.h).toFixed(3) };
      });
    }
  }
  rendu.r.dispose();
  return sortie;
};

/* ================================================================== mouvement réduit : suite d'états fixes (sans three.js) */
const etatsFixes = () => {
  // étiquettes de la vue éclatée : accrochées aux pièces de l'image, à 16 px au moins des bords (FIX-6)
  const slot = cadre.querySelector('[data-planche="3"]');
  const placer = () => {
    const Wp = slot.clientWidth, Hp = slot.clientHeight;
    if (!Wp || !Hp) return;
    slot.querySelector(".etiquettes").classList.add("placees");
    etiquettes.forEach((et) => {
      const g = et.dataset.cote === "gauche" ? -1 : 1, lw = et.offsetWidth, lh = et.offsetHeight;
      const x = +et.dataset.fx * Wp, y = +et.dataset.fy * Hp;
      et.style.transform = `translate(${Math.round(clamp(g < 0 ? x - lw : x, 16, Wp - lw - 16))}px, ${Math.round(y - lh / 2)}px)`;
    });
  };
  // la courbe entière ; place gardée en bas pour l'axe des semaines
  const tracerFixe = () => {
    const W = courbe.clientWidth, H = courbe.clientHeight;
    tracer({ x0: 8, x1: W - 8, haut: H * 0.08, bas: H - 76 }, null);
    dessinerCourbe({ trace: 1, projection: 1 });
  };
  const tout = () => { placer(); tracerFixe(); };
  tout();
  document.fonts?.ready.then(tout);
  addEventListener("resize", tout);
};

/* ================================================================== mouvement : la scène épinglée */
const sceneAnimee = async (promesse3D) => {
  let L = null, m = null, camera = null, rendu = null, v3 = null;
  let W = 0, H = 0, t = 0, sale = true, introK = 1, opaToile = 0, dernierLed = -1;
  const larg = new Map();

  const mesurer = () => {
    W = cadre.clientWidth; H = cadre.clientHeight;
    if (rendu) rendu.r.setSize(W, H, false);
    etiquettes.forEach((x) => larg.set(x, [x.offsetWidth, x.offsetHeight]));
    // la courbe part du capteur tel qu'il est posé pendant le moment 4
    const c = cadrage(0.74, CLES[mobile() ? "mobile" : "bureau"]);
    let origine;
    if (m) {
      poser(L, m, camera, etat(0.74), c, W, H);
      const pt = mobile() ? new L.T.Vector3(0, 0.02, 0) : new L.T.Vector3(2.35, 2.4, 0);
      origine = projeter(L.T, camera, pt, W, H);
    } else origine = mobile() ? [c.cx * W, (c.cy + c.fr / 2) * H] : [(c.cx + 0.07) * W, c.cy * H];
    // sous la boîte : l'axe des semaines et l'accolade (environ 64 px)
    const boite = mobile()
      ? { x0: W * 0.07, x1: W * 0.93, haut: H * 0.27, bas: H * 0.5 }
      : { x0: Math.max(origine[0] + W * 0.06, W * 0.34), x1: W * 0.93, haut: Math.max(H * 0.4, c.cy * H - H * 0.3), bas: c.cy * H + H * 0.2 };
    tracer(boite, origine);
    sale = true;
  };

  // ---------- les mots de chaque moment (découpés avant tout rendu : pas de flash)
  const tl = gsap.timeline({ paused: true, defaults: { ease: "none" } });
  moments.forEach((mo) => {
    const [a, b] = mo.dataset.in ? mo.dataset.in.split(",").map(Number) : [NaN, NaN];
    const [c, d] = mo.dataset.out ? mo.dataset.out.split(",").map(Number) : [NaN, NaN];
    const txt = mo.querySelector(".moment-texte");
    const mots = mo.dataset.moment !== "0" && SplitText ? SplitText.create(mo.querySelector("[data-mots]"), { type: "words", wordsClass: "mot" }).words : [];
    const petit = mo.querySelector(".sous-phrase");
    // Un lien n'est cliquable que pendant que son moment est visible : effacé (opacité 0), il ne doit capter ni clic
    // ni toucher (tour 3, FIX-1). Les set de la timeline s'annulent d'eux-mêmes quand on remonte ; le clavier n'est
    // pas touché (pointer-events ne retire pas le focus, et focusin ramène la scène au moment visible).
    const liens = mo.querySelectorAll("a, button");
    if (liens.length) {
      gsap.set(liens, { pointerEvents: Number.isNaN(a) ? "auto" : "none" });
      if (!Number.isNaN(a)) tl.set(liens, { pointerEvents: "auto" }, a);
      if (!Number.isNaN(c)) tl.set(liens, { pointerEvents: "none" }, c);
    }
    if (!Number.isNaN(a)) {
      tl.fromTo(mo, { opacity: 0 }, { opacity: 1, duration: b - a }, a);
      if (mots.length) tl.fromTo(mots, { opacity: 0, yPercent: 45 }, { opacity: 1, yPercent: 0, duration: (b - a) * 0.75, stagger: ((b - a) * 0.25) / mots.length, ease: "power2.out" }, a);
      if (petit) tl.fromTo(petit, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: b - a, ease: "power2.out" }, a + (b - a) * 0.4);
    }
    if (!Number.isNaN(c)) {
      tl.to(mo, { opacity: 0, duration: d - c }, c);
      tl.to(txt, { y: -40, duration: d - c, ease: "power1.in" }, c);
    }
  });
  tl.set({}, {}, 1); // durée totale = 1 : progression = t

  // Le titre arrive au chargement.
  const h1 = cadre.querySelector("h1");
  const motsTitre = SplitText ? SplitText.create(h1, { type: "words", wordsClass: "mot" }).words : [h1];
  gsap.from(motsTitre, { opacity: 0, yPercent: 40, duration: 1.1, ease: "expo.out", stagger: 0.06, delay: 0.1 });
  gsap.from(cadre.querySelectorAll(".moment-titre .chapeau, .moment-titre .lien-prix"), { opacity: 0, y: 16, duration: 1, ease: "power3.out", stagger: 0.1, delay: 0.4 });
  root.classList.remove("js-attente");

  const st = ScrollTrigger.create({
    trigger: ".scene", start: "top top", pin: cadre, anticipatePin: 1,
    end: () => `+=${mobile() ? 470 : 520}%`,
    onUpdate: (self) => { t = self.progress; tl.progress(t); sale = true; },
    onRefresh: (self) => { t = self.progress; tl.progress(t); mesurer(); },
  });

  // Clavier : un lien qui reçoit le focus ramène la scène au moment où il est visible.
  moments.forEach((mo) => mo.addEventListener("focusin", () => {
    const [, b] = (mo.dataset.in || "0,0").split(",").map(Number), [c] = (mo.dataset.out || "1").split(",").map(Number);
    const cible = mo.dataset.in ? (b + c) / 2 : 0;
    const y = st.start + cible * (st.end - st.start);
    if (Math.abs(t - cible) > 0.02) (window.gestes?.lenis ? window.gestes.lenis.scrollTo(y, { immediate: true }) : scrollTo(0, y));
  }));

  // ---------- rendu à la demande
  let visible = true;
  new IntersectionObserver(([x]) => { visible = x.isIntersecting; }, { rootMargin: "100px" }).observe(cadre);

  gsap.ticker.add((temps) => {
    if (!visible) return;
    const s = etat(t, temps, introK);
    const bouge = m && (t < 0.06 || introK > 0.001);
    // LED : clignement lent au repos, rapide en alerte
    const periode = s.alerte ? 0.55 : 2.4, phase = (temps % periode) / periode;
    const ledOn = s.alerte ? (phase < 0.5 ? 1 : 0.15) : (phase < 0.88 ? 0.75 : 0.2);
    if (!(sale || bouge || (m && ledOn !== dernierLed))) return;
    sale = false; dernierLed = ledOn;
    const mob = mobile();
    const c = cadrage(t, CLES[mob ? "mobile" : "bureau"]);

    if (m) {
      poser(L, m, camera, s, c, W, H);
      m.led.material.color.setRGB(1, 0.76 * (0.6 + ledOn * 0.4), 0.1).multiplyScalar(0.5 + ledOn);
      // la lueur ne se voit que si la LED regarde la caméra (sinon elle dépasserait de la silhouette)
      const face = Math.cos(s.rotY + 0.5 * s.eclate);
      m.lueur.material.opacity = ledOn * (s.alerte ? 1 : 0.7) * clamp((face - 0.35) / 0.4);
      m.lueur.scale.setScalar(s.alerte ? 1.7 : 1.1);
      rendu.r.render(m.scene, camera);
      toile.style.opacity = opaToile * (mob ? 1 - E(t, 0.875, 0.905) : 1);

      // étiquettes de la vue éclatée, accrochées aux pièces, à 16 px au moins des bords
      const e = s.eclate;
      etiquettes.forEach((et, i) => {
        const p = m.pieces[et.dataset.piece], g = et.dataset.cote === "gauche" ? -1 : 1;
        const op = clamp((e - 0.55 - i * 0.08) / 0.25);
        et.style.opacity = op;
        if (op <= 0) return;
        v3.set(0, p.y, 0); p.g.localToWorld(v3); v3.x += g * (p.r + 0.25);
        const [x, y] = projeter(L.T, camera, v3, W, H), [lw, lh] = larg.get(et) || [0, 0];
        et.style.transform = `translate(${Math.round(clamp(g < 0 ? x - lw : x, 16, W - lw - 16))}px, ${Math.round(y - lh / 2)}px)`;
      });
    }
    halo.style.transform = `translate3d(${c.cx * W}px, ${c.cy * H}px, 0) scale(${0.55 + c.fr * 0.9})`;
    dessinerCourbe(s);
    telephone.style.opacity = s.tel;
    telephone.style.transform = mob ? `translateY(${(1 - s.tel) * 40}px)` : `translateX(${(1 - s.tel) * 60}px)`;
    notif.style.opacity = s.notif;
    notif.style.transform = `translateY(${(1 - s.notif) * -18}px) scale(${0.96 + 0.04 * s.notif})`;
  });

  mesurer();
  addEventListener("resize", mesurer);
  ScrollTrigger.sort();
  ScrollTrigger.refresh();
  window.vigieScene = { st, t: () => t };

  // ---------- l'objet 3D arrive quand three.js est chargé
  L = await promesse3D;
  if (L) {
    try {
      rendu = preparerRendu(L, toile);
      m = construire(L);
      m.scene.environment = rendu.env; m.scene.environmentIntensity = 0.9;
      camera = new L.T.PerspectiveCamera(28, 1, 0.1, 400);
      v3 = new L.T.Vector3();
    } catch (e) { console.warn("Vigie : WebGL indisponible, photo de repli.", e); rendu = null; m = null; }
  }
  if (!m) {
    toile.hidden = true; cadre.querySelector(".scene-repli").hidden = false;
    etiquettes.forEach((x) => (x.style.opacity = 0));
    return;
  }
  await document.fonts?.ready; // la marque gravée sur le capot utilise Archivo
  mesurer();
  const intro = { k: 1, o: 0 };
  gsap.to(intro, { k: 0, o: 1, duration: 2.2, ease: "expo.out", onUpdate: () => { introK = intro.k; opaToile = Math.min(1, intro.o * 1.6); sale = true; } });
};

/* ================================================================== départ */
// three.js ne se charge qu'en mouvement : le mouvement réduit n'affiche que des images déjà rendues.
if (anime() && gsap && ScrollTrigger) await sceneAnimee(charger3D());
else { etatsFixes(); root.classList.remove("js-attente"); }
window.vigiePret = true;
document.dispatchEvent(new Event("scene:prete"));

// Pour refaire les images de VUES depuis la page : const s = await import('./scene.js'); await s.rendreVues(await s.charger3D());
export { rendreVues, charger3D };
