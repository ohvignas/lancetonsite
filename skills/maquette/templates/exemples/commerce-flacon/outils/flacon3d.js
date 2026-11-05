/*
 * Ciste — le flacon en verre, construit en code avec three.js 0.170.0 (aucun fichier 3D à charger).
 *
 *   verre      LatheGeometry (profil tourné), MeshPhysicalMaterial : transmission 1, épaisseur, IOR 1,5
 *   liquide    trois couches tournées (fond, cœur, tête), opaques : elles se voient à travers le verre
 *              (le passage de transmission ne contient que les objets opaques)
 *   bouchon    céramique émaillée vert ciste, bague en laiton
 *   étiquette  bande de cylindre ouverte, UV faites par construction : le nom du parfum s'y écrit en canvas
 *   lumière    RoomEnvironment (PMREM) + deux lumières, fond uni de la charte, ombre de contact
 *
 * N'est plus chargé par la page (05/11/2026) : flacons, animations, gros plans, coffret et fioles sont rendus dans
 * Blender (outils/blender/). Gardé pour outils/rendu.html, qui en tire encore l'orgue à parfums (orgue-*.webp),
 * et comme modèle de 3D en direct three.js (GLTFLoader, géométrie remplacée par nom, forme en code en repli).
 */
import * as T from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

/* Modèle de chargement d'une forme Blender (objets-3d/scripts/exemple.py -- glb modeles/flacon.glb) : seule la
   géométrie vient du fichier, par nom ; les matériaux restent ici. Sans fichier, le flacon tourné en code sert. */
let MODELE = null;
const FICHIER = null; // ex. new URL("../modeles/flacon.glb", import.meta.url).href
if (FICHIER) try {
  const g = await new GLTFLoader().loadAsync(FICHIER);
  const geo = (nom) => g.scene.getObjectByName(nom)?.geometry || null;
  MODELE = { verre: geo("Verre"), bague: geo("Bague"), bouchon: geo("Bouchon") };
} catch (e) {
  console.warn("Ciste : modèle Blender indisponible, flacon tourné en code.", e);
}
export const SOURCE_FORME = () => (MODELE ? "blender" : "code");

export const FOND = "#e3e5df"; // « calcaire », fond de la charte
const ENCRE = "#1d2420";
const V = (x, y) => new T.Vector2(x, y);
const lerp = (a, b, k) => a + (b - a) * k;

/* ------------------------------------------------------------------ rendu */
export function creerRendu(canvas, { conserver = false, ratio } = {}) {
  const r = new T.WebGLRenderer({ canvas, antialias: true, preserveDrawingBuffer: conserver, powerPreference: "high-performance" });
  r.setPixelRatio(ratio || Math.min(devicePixelRatio || 1, 1.5));
  r.outputColorSpace = T.SRGBColorSpace;
  r.toneMapping = T.NeutralToneMapping;
  r.toneMappingExposure = 1.0;
  const pmrem = new T.PMREMGenerator(r);
  const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  pmrem.dispose();
  return { r, env };
}

/* ------------------------------------------------------------------ textures dessinées */
const texture = (l, h, dessin) => {
  const c = document.createElement("canvas");
  c.width = l; c.height = h;
  dessin(c.getContext("2d"), l, h);
  const t = new T.CanvasTexture(c);
  t.colorSpace = T.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
};
const halo = (couleurCentre, couleurBord) => texture(512, 512, (g, l, h) => {
  const d = g.createRadialGradient(l / 2, h / 2, 0, l / 2, h / 2, l / 2);
  d.addColorStop(0, couleurCentre); d.addColorStop(1, couleurBord);
  g.fillStyle = d; g.fillRect(0, 0, l, h);
});
const ombre = () => texture(256, 256, (g, l, h) => {
  const d = g.createRadialGradient(l / 2, h / 2, 0, l / 2, h / 2, l / 2);
  d.addColorStop(0, "rgba(20,26,22,0.55)"); d.addColorStop(0.45, "rgba(20,26,22,0.22)"); d.addColorStop(1, "rgba(20,26,22,0)");
  g.fillStyle = d; g.fillRect(0, 0, l, h);
});

// L'étiquette : papier calcaire, filet, marque en capitales espacées, nom du parfum en italique.
const dessinerEtiquette = (g, l, h, nom, contenance = "50 ml") => {
  g.fillStyle = "#f2f1ea"; g.fillRect(0, 0, l, h);
  g.strokeStyle = ENCRE; g.lineWidth = 3; g.strokeRect(26, 26, l - 52, h - 52);
  g.lineWidth = 1; g.strokeRect(36, 36, l - 72, h - 72);
  g.fillStyle = ENCRE; g.textAlign = "center"; g.textBaseline = "alphabetic";
  g.font = '500 104px "Bodoni Moda", Didot, serif';
  if ("letterSpacing" in g) g.letterSpacing = "20px";
  g.fillText("CISTE", l / 2 + 10, 190);
  if ("letterSpacing" in g) g.letterSpacing = "0px";
  g.fillRect(l / 2 - 50, 228, 100, 3);
  g.font = 'italic 400 86px "Bodoni Moda", Didot, serif';
  let taille = 86;
  while (g.measureText(nom).width > l - 110 && taille > 50) { taille -= 4; g.font = `italic 400 ${taille}px "Bodoni Moda", Didot, serif`; }
  g.fillText(nom, l / 2, 346);
  g.font = '500 30px "Schibsted Grotesk", Arial, sans-serif';
  if ("letterSpacing" in g) g.letterSpacing = "5px";
  g.fillText(`EAU DE PARFUM · ${contenance.toUpperCase()}`, l / 2, 428);
  g.fillText("GRASSE", l / 2, 480);
  if ("letterSpacing" in g) g.letterSpacing = "0px";
  // numéro de série écrit à la plume, un peu de biais
  g.save(); g.translate(l / 2, 548); g.rotate(-0.035);
  g.fillStyle = "#14231d"; g.font = 'italic 400 44px "Bodoni Moda", Didot, serif';
  g.fillText("N° 127 / 300", 0, 0); g.restore();
};

/* ------------------------------------------------------------------ profils tournés */
const PROFIL_VERRE = [
  V(0, 0), V(0.86, 0), V(1.06, 0.03), V(1.15, 0.12), V(1.185, 0.3), V(1.19, 0.6), V(1.19, 2.3),
  V(1.18, 2.52), V(1.13, 2.74), V(1.02, 2.92), V(0.82, 3.06), V(0.58, 3.15), V(0.4, 3.2), V(0.34, 3.26),
  V(0.33, 3.62), V(0, 3.62),
];
const PROFIL_BOUCHON = [
  V(0, 3.4), V(0.5, 3.4), V(0.62, 3.44), V(0.68, 3.56), V(0.7, 3.8), V(0.69, 4.12), V(0.63, 4.36),
  V(0.5, 4.52), V(0.3, 4.6), V(0, 4.62),
];
// une couche de liquide : disque épais aux arêtes adoucies (r = rayon, y0 / y1 = bas / haut)
const profilCouche = (r, y0, y1, b = 0.045) => [
  V(0, y0), V(r - b, y0), V(r - b * 0.3, y0 + b * 0.3), V(r, y0 + b), V(r, y1 - b),
  V(r - b * 0.3, y1 - b * 0.3), V(r - b, y1), V(0, y1),
];
export const COUCHES = [
  { nom: "fond", y0: 0.44, y1: 1.08, ton: -0.32 },
  { nom: "coeur", y0: 1.08, y1: 1.72, ton: 0 },
  { nom: "tete", y0: 1.72, y1: 2.36, ton: 0.3 },
];
const R_LIQUIDE = 1.07;

// nuance d'une note : la tête plus claire, le fond plus sombre (même teinte, luminosité décalée)
const nuance = (base, ton) => base.clone().offsetHSL(ton > 0 ? 0.02 * ton : 0, ton > 0 ? -0.1 * ton : 0.04 * -ton, (ton > 0 ? 0.45 : 0.3) * ton);

/* ------------------------------------------------------------------ le flacon */
export function construireFlacon({ env, fond = FOND }) {
  const scene = new T.Scene();
  scene.background = new T.Color(fond);
  scene.environment = env;
  scene.environmentIntensity = 1;

  // fond : un halo plus clair au centre, pour que le verre ait quelque chose à réfracter
  const decor = new T.Mesh(new T.PlaneGeometry(60, 60),
    new T.MeshBasicMaterial({ map: halo("#f4f5f1", fond), toneMapped: false, depthWrite: false }));
  decor.position.set(0, 2.4, -9);
  scene.add(decor);

  const lumiere = new T.DirectionalLight(0xffffff, 2.4); lumiere.position.set(-5, 8, 7);
  const contre = new T.DirectionalLight(0xfff1dc, 1.6); contre.position.set(6, 4, -6);
  scene.add(lumiere, contre, new T.AmbientLight(0xffffff, 0.25));

  const flacon = new T.Group();
  scene.add(flacon);

  // verre, bague, bouchon, étiquette : ils montent ensemble quand le parfum se décompose
  const capot = new T.Group();
  flacon.add(capot);
  const matVerre = new T.MeshPhysicalMaterial({
    color: 0xffffff, metalness: 0, roughness: 0.035, transmission: 1, thickness: 0.9, ior: 1.5,
    specularIntensity: 1, clearcoat: 1, clearcoatRoughness: 0.03, envMapIntensity: 1.25,
  });
  const verre = new T.Mesh(new T.LatheGeometry(PROFIL_VERRE, 128), matVerre);
  capot.add(verre);
  const bague = new T.Mesh(new T.CylinderGeometry(0.43, 0.43, 0.16, 64),
    new T.MeshStandardMaterial({ color: "#b98d4f", metalness: 1, roughness: 0.28 }));
  bague.position.y = 3.33;
  const bouchon = new T.Mesh(new T.LatheGeometry(PROFIL_BOUCHON, 96),
    new T.MeshPhysicalMaterial({ color: "#2c3a31", roughness: 0.34, clearcoat: 0.7, clearcoatRoughness: 0.25, sheen: 0.3, sheenColor: new T.Color("#5e7a68") }));
  capot.add(bague, bouchon);
  // forme Blender : géométries en coordonnées du monde, donc la bague revient à l'origine
  if (MODELE?.verre) verre.geometry = MODELE.verre;
  if (MODELE?.bague) { bague.geometry = MODELE.bague; bague.position.y = 0; }
  if (MODELE?.bouchon) { bouchon.geometry = MODELE.bouchon; bouchon.material.flatShading = false; }

  // étiquette : bande de cylindre centrée sur +z (theta 0 = face à la caméra)
  const toile = document.createElement("canvas");
  toile.width = 640; toile.height = 620;
  const texEtiquette = new T.CanvasTexture(toile);
  texEtiquette.colorSpace = T.SRGBColorSpace; texEtiquette.anisotropy = 8;
  const etiquette = new T.Mesh(new T.CylinderGeometry(1.198, 1.198, 1.16, 64, 1, true, -0.5, 1.0),
    // transparent : exclue du passage de transmission, sinon le verre la réfracte en doubles sur les bords
    new T.MeshStandardMaterial({ map: texEtiquette, roughness: 0.82, metalness: 0, transparent: true }));
  etiquette.position.y = 1.42;
  capot.add(etiquette);
  let nomEtiquette = "";
  const ecrire = (nom, contenance) => {
    if (nom === nomEtiquette) return;
    nomEtiquette = nom;
    dessinerEtiquette(toile.getContext("2d"), toile.width, toile.height, nom, contenance);
    texEtiquette.needsUpdate = true;
  };

  // liquide : trois couches, et des gouttes qui n'apparaissent qu'à la décomposition
  const base = new T.Color("#a9a23f");
  const couches = COUCHES.map((c) => {
    // décomposée, chaque note est une tranche du flacon : un godet de verre épais qui garde son liquide
    // (le liquide reste opaque : c'est ce que la transmission du verre montre le mieux, comme dans le flacon entier)
    const mat = new T.MeshPhysicalMaterial({ color: 0xffffff, roughness: 0.16, clearcoat: 1, clearcoatRoughness: 0.08, emissiveIntensity: 0.12 });
    const mesh = new T.Mesh(new T.LatheGeometry(profilCouche(R_LIQUIDE, c.y0 + 0.02, c.y1 - 0.1, 0.05), 96), mat);
    const godet = new T.Mesh(new T.LatheGeometry([
      V(0, c.y0 - 0.1), V(1.16, c.y0 - 0.1), V(1.2, c.y0 - 0.06), V(1.2, c.y1 + 0.02), V(1.17, c.y1 + 0.05),
      V(1.12, c.y1 + 0.02), V(1.11, c.y0 + 0.01), V(0, c.y0 + 0.01)], 96), matVerre.clone());
    mesh.add(godet);
    const g = new T.Group(); g.add(mesh);
    flacon.add(g);
    const gouttes = [0, 1, 2].map((i) => {
      const s = new T.Mesh(new T.SphereGeometry(0.07 + 0.03 * ((i + c.y0 * 3) % 2), 32, 16), mat);
      g.add(s); s.visible = false;
      return { s, phase: i * 2.1 + c.y0 * 5, rayon: 1.55 + 0.25 * i, haut: (c.y0 + c.y1) / 2 + (i - 1) * 0.16 };
    });
    return { ...c, g, mat, gouttes, milieu: (c.y0 + c.y1) / 2 };
  });
  // dans le flacon, le liquide est presque uni ; décomposé, chaque note prend sa nuance
  // au repos, un seul volume de liquide (pas de joints visibles) ; les couches prennent le relais à la décomposition
  const matPlein = new T.MeshPhysicalMaterial({ color: 0xffffff, roughness: 0.16, clearcoat: 1, clearcoatRoughness: 0.08, emissiveIntensity: 0.12 });
  const plein = new T.Mesh(new T.LatheGeometry(profilCouche(R_LIQUIDE, COUCHES[0].y0, COUCHES[2].y1, 0.05), 96), matPlein);
  flacon.add(plein);
  const teinter = (couleur, e = 0) => {
    base.copy(couleur);
    matPlein.color.copy(base); matPlein.emissive.copy(base);
    couches.forEach((c) => {
      const n = nuance(base, c.ton * (0.25 + 0.75 * e));
      c.mat.color.copy(n);
      c.mat.emissive.copy(n);
    });
  };

  const sol = new T.Mesh(new T.PlaneGeometry(1, 1), new T.MeshBasicMaterial({ map: ombre(), transparent: true, depthWrite: false, toneMapped: false }));
  sol.rotation.x = -Math.PI / 2; sol.position.y = 0.003; sol.scale.setScalar(4.4);
  scene.add(sol);

  // matériaux du capot : ils s'effacent quand il s'envole (le verre ne traverse jamais le titre en restant net)
  const matsCapot = [matVerre, bague.material, bouchon.material, etiquette.material];
  return { scene, flacon, capot, matsCapot, verre, couches, plein, sol, teinter, ecrire, base, decor };
}

/* ------------------------------------------------------------------ état → scène
   s = { rotY, eclate (0 → 1), leve (0 → 1), temps (s), couleur (T.Color), nom } */
export function poserFlacon(m, s) {
  const e = s.eclate || 0, leve = s.leve ?? e;
  m.flacon.rotation.y = s.rotY || 0;
  m.capot.position.y = 11 * leve * leve;
  m.capot.rotation.y = -0.6 * leve;
  // fondu du capot entre 6 % et 35 % de sa montée ; « transparent » ne bascule qu'au franchissement (recompilation)
  const op = 1 - T.MathUtils.smoothstep(leve, 0.06, 0.35);
  m.capot.visible = op > 0.01;
  m.matsCapot.forEach((mt, k) => {
    const tr = k === 3 || op < 0.999;
    if (mt.transparent !== tr) { mt.transparent = tr; mt.needsUpdate = true; }
    mt.opacity = op;
  });
  if (s.couleur) m.teinter(s.couleur, e);
  if (s.nom) m.ecrire(s.nom, s.contenance);
  // les couches s'écartent : la tête monte et part à droite, le fond descend et part à gauche
  const ecarts = [[-0.34, -0.85, -0.16], [0.18, 0, 0.1], [-0.12, 0.85, 0.22]];
  const t = s.temps || 0;
  // le liquide n'est jamais à nu : tant que le capot de verre n'est pas entier, on montre les godets (qui ont leur verre)
  m.plein.visible = e < 0.015 && op >= 0.999;
  m.couches.forEach((c, i) => {
    c.g.visible = !m.plein.visible;
    const [dx, dy, rx] = ecarts[i];
    c.g.position.set(dx * e * 1.6, dy * e * 1.15, 0);
    c.g.rotation.set(rx * e, (i - 1) * 0.35 * e + t * 0.25 * e * (i % 2 ? 1 : -1), 0);
    c.gouttes.forEach((d) => {
      d.s.visible = e > 0.25;
      const a = d.phase + t * 0.6;
      d.s.position.set(Math.cos(a) * d.rayon * (0.6 + 0.4 * e), d.haut + Math.sin(a * 1.3) * 0.08, Math.sin(a) * d.rayon * (0.6 + 0.4 * e));
      d.s.scale.setScalar(Math.max(0.001, (e - 0.25) / 0.75));
    });
  });
  m.sol.position.y = Math.min(0.003, m.couches[0].g.position.y + 0.42);
  m.sol.material.opacity = 1 - 0.45 * e;
}

/* Caméra : l'objet (repère refY, hauteur refH) occupe la fraction fr de la hauteur d'écran, centré en (cx, cy),
   vu d'une élévation el (degrés). W, H : taille de la vue en pixels CSS. */
export function cadrer(camera, { cx = 0.5, cy = 0.5, fr = 0.6, el = 8, refY = 2.3, refH = 4.8 }, W, H) {
  const fov = camera.fov * (Math.PI / 180);
  const dist = refH / (2 * fr * Math.tan(fov / 2));
  const a = el * (Math.PI / 180);
  camera.position.set(0, refY + Math.sin(a) * dist, Math.cos(a) * dist);
  camera.lookAt(0, refY, 0);
  camera.aspect = W / H;
  camera.setViewOffset(W, H, (0.5 - cx) * W, (0.5 - cy) * H, W, H);
  camera.updateProjectionMatrix();
  camera.updateMatrixWorld();
}

/* Position à l'écran du milieu (bord droit ou gauche) d'une couche : pour accrocher les étiquettes HTML. */
export function ecranCouche(m, camera, i, cote, W, H) {
  const c = m.couches[i];
  const v = new T.Vector3(cote * (R_LIQUIDE + 0.2), c.milieu, 0);
  c.g.localToWorld(v);
  v.project(camera);
  return [(v.x * 0.5 + 0.5) * W, (-v.y * 0.5 + 0.5) * H];
}

/* ------------------------------------------------------------------ la fiole d'échantillon et le coffret */
const PROFIL_FIOLE = [V(0, 0), V(0.26, 0), V(0.31, 0.04), V(0.33, 0.12), V(0.33, 1.7), V(0.3, 1.78), V(0.22, 1.82), V(0.22, 1.95), V(0, 1.95)];
export function construireFiole(couleur, matVerre) {
  const g = new T.Group();
  const verre = new T.Mesh(new T.LatheGeometry(PROFIL_FIOLE, 64), matVerre);
  const c = new T.Color(couleur);
  const liquide = new T.Mesh(new T.LatheGeometry(profilCouche(0.27, 0.1, 1.42, 0.03), 48),
    new T.MeshPhysicalMaterial({ color: c, emissive: c, emissiveIntensity: 0.12, roughness: 0.15, clearcoat: 1 }));
  const bouchon = new T.Mesh(new T.CylinderGeometry(0.25, 0.25, 0.5, 48), new T.MeshPhysicalMaterial({ color: "#2c3a31", roughness: 0.35, clearcoat: 0.6 }));
  bouchon.position.y = 2.1;
  g.add(verre, liquide, bouchon);
  return g;
}
export function construireCoffret({ env, fond = FOND, couleurs }) {
  const scene = new T.Scene();
  scene.background = new T.Color(fond);
  scene.environment = env;
  const decor = new T.Mesh(new T.PlaneGeometry(60, 60), new T.MeshBasicMaterial({ map: halo("#f4f5f1", fond), toneMapped: false }));
  decor.position.set(0, 1, -9); scene.add(decor);
  const l1 = new T.DirectionalLight(0xffffff, 2.2); l1.position.set(-5, 8, 7);
  const l2 = new T.DirectionalLight(0xfff1dc, 1.2); l2.position.set(6, 4, -6);
  scene.add(l1, l2, new T.AmbientLight(0xffffff, 0.3));
  const vert = new T.MeshPhysicalMaterial({ color: "#2c3a31", roughness: 0.6, sheen: 0.4, sheenColor: new T.Color("#5e7a68") });
  const interieur = new T.MeshStandardMaterial({ color: "#d9d3c4", roughness: 0.95 });
  const boite = new T.Mesh(new T.BoxGeometry(5.2, 0.55, 1.5), vert); boite.position.y = 0.275;
  const calage = new T.Mesh(new T.BoxGeometry(4.9, 0.06, 1.25), interieur); calage.position.y = 0.53;
  // couvercle posé debout derrière, avec la marque
  const tex = texture(1024, 480, (g, l, h) => {
    g.fillStyle = "#2c3a31"; g.fillRect(0, 0, l, h);
    g.fillStyle = "#e9e3d2"; g.textAlign = "center";
    g.font = '500 120px "Bodoni Moda", Didot, serif';
    if ("letterSpacing" in g) g.letterSpacing = "30px";
    g.fillText("CISTE", l / 2 + 15, 178);
    if ("letterSpacing" in g) g.letterSpacing = "8px";
    g.font = '500 28px "Schibsted Grotesk", Arial, sans-serif';
    g.fillText("COFFRET DÉCOUVERTE · 5 × 2 ML", l / 2 + 4, 52);
  });
  const couvercle = new T.Mesh(new T.BoxGeometry(5.2, 4, 0.14), [vert, vert, vert, vert, new T.MeshPhysicalMaterial({ map: tex, roughness: 0.6 }), vert]);
  couvercle.position.set(0, 2.05, -1.2); couvercle.rotation.x = -0.1;
  scene.add(boite, calage, couvercle);
  const matVerre = new T.MeshPhysicalMaterial({ color: 0xffffff, roughness: 0.04, transmission: 1, thickness: 0.4, ior: 1.5, clearcoat: 1 });
  couleurs.forEach((c, i) => {
    const f = construireFiole(c, matVerre);
    f.position.set((i - 2) * 0.92, 0.42, 0.05);
    scene.add(f);
  });
  const sol = new T.Mesh(new T.PlaneGeometry(1, 1), new T.MeshBasicMaterial({ map: ombre(), transparent: true, depthWrite: false, toneMapped: false }));
  sol.rotation.x = -Math.PI / 2; sol.position.y = 0.002; sol.scale.set(8, 4, 1);
  scene.add(sol);
  return { scene };
}
export function construireFioleSeule({ env, fond, couleur }) {
  const scene = new T.Scene();
  scene.background = new T.Color(fond);
  scene.environment = env;
  const decor = new T.Mesh(new T.PlaneGeometry(40, 40), new T.MeshBasicMaterial({ map: halo("#fbfbf8", fond), toneMapped: false }));
  decor.position.set(0, 1, -6); scene.add(decor);
  const l1 = new T.DirectionalLight(0xffffff, 2.2); l1.position.set(-5, 8, 7);
  scene.add(l1, new T.AmbientLight(0xffffff, 0.3));
  const matVerre = new T.MeshPhysicalMaterial({ color: 0xffffff, roughness: 0.04, transmission: 1, thickness: 0.4, ior: 1.5, clearcoat: 1 });
  const f = construireFiole(couleur, matVerre);
  f.rotation.z = -0.22; f.position.set(0.22, 0.08, 0);
  scene.add(f);
  const sol = new T.Mesh(new T.PlaneGeometry(1, 1), new T.MeshBasicMaterial({ map: ombre(), transparent: true, depthWrite: false, toneMapped: false }));
  sol.rotation.x = -Math.PI / 2; sol.scale.set(2.4, 1.4, 1);
  scene.add(sol);
  return { scene };
}

/* ------------------------------------------------------------------ l'orgue à parfums (bandeau de l'atelier, rendu fixe)
   Gradins en arc de cercle chargés de flacons de matières, table de chêne, balance, mouillettes en éventail. */
export function construireOrgue({ env }) {
  const scene = new T.Scene();
  scene.background = new T.Color("#d8d4c8");
  scene.environment = env;
  scene.environmentIntensity = 0.55;
  const fenetre = new T.DirectionalLight(0xfff0dc, 3.2); fenetre.position.set(-7, 6, 3);
  const bouche = new T.DirectionalLight(0xdfe6ee, 0.7); bouche.position.set(5, 3, 6);
  scene.add(fenetre, bouche, new T.AmbientLight(0xffffff, 0.15));
  // mur chaulé et sol de tomettes
  const mur = new T.Mesh(new T.PlaneGeometry(40, 14), new T.MeshStandardMaterial({ color: "#e4e0d4", roughness: 0.95 }));
  mur.position.set(0, 4, -5.2); scene.add(mur);
  const sol = new T.Mesh(new T.PlaneGeometry(40, 20), new T.MeshStandardMaterial({ color: "#6f5442", roughness: 0.9 }));
  sol.rotation.x = -Math.PI / 2; sol.position.y = -0.9; scene.add(sol);
  // veinage du chêne, dessiné : fibres fines et irrégulières
  const veinage = (base) => {
    const t = texture(1024, 256, (g, l, h) => {
      g.fillStyle = base; g.fillRect(0, 0, l, h);
      let s = 3; const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647);
      for (let i = 0; i < 260; i++) {
        const y = rnd() * h, a = 0.04 + rnd() * 0.12;
        g.strokeStyle = rnd() > 0.5 ? `rgba(40,24,10,${a})` : `rgba(255,236,205,${a * 0.7})`;
        g.lineWidth = 0.6 + rnd() * 2.2; g.beginPath(); g.moveTo(0, y);
        for (let x = 0; x <= l; x += 64) g.lineTo(x, y + Math.sin(x * 0.004 + i) * 1.2 + (rnd() - 0.5) * 0.8);
        g.stroke();
      }
    });
    t.wrapS = t.wrapT = T.RepeatWrapping; t.repeat.set(3, 1);
    return t;
  };
  const bois = new T.MeshStandardMaterial({ map: veinage("#6e4a2c"), roughness: 0.6 });
  const boisClair = new T.MeshStandardMaterial({ map: veinage("#93693f"), roughness: 0.5 });
  // gradins : anneaux partiels (lathe d'un rectangle), du plus bas et proche au plus haut et lointain
  const centreZ = -1.2, ouv = 1.25;
  const amb = (c) => new T.MeshPhysicalMaterial({ color: 0xffffff, roughness: 0.08, transmission: 1, thickness: 0.25, ior: 1.5,
    attenuationColor: new T.Color(c), attenuationDistance: 0.12, clearcoat: 0.6 });
  const verres = ["#9a5a1c", "#b8761f", "#7d4a16", "#c99a3c", "#8a6a2a"].map(amb);
  const capNoir = new T.MeshStandardMaterial({ color: "#1c1d1b", roughness: 0.4 });
  const capLaiton = new T.MeshStandardMaterial({ color: "#b98d4f", metalness: 1, roughness: 0.3 });
  const papier = new T.MeshStandardMaterial({ color: "#f4f1e8", roughness: 0.9 });
  let graine = 7; const hasard = () => ((graine = (graine * 16807) % 2147483647) / 2147483647);
  for (let k = 0; k < 4; k++) {
    const ri = 1.9 + 0.42 * k, re = ri + 0.42, haut = 0.12 + 0.34 * k;
    const g = new T.Mesh(new T.LatheGeometry([V(ri, -0.9), V(re, -0.9), V(re, haut), V(ri, haut), V(ri, -0.9)], 96, Math.PI - ouv, ouv * 2), k % 2 ? bois : boisClair);
    g.position.z = centreZ; scene.add(g);
    const n = 15 + 3 * k;
    for (let i = 0; i < n; i++) {
      const a = Math.PI - ouv + 0.06 + (i + 0.5) * ((ouv * 2 - 0.12) / n), r = ri + 0.21;
      const h = 0.2 + 0.08 * hasard(), rr = 0.065 + 0.02 * hasard();
      const b = new T.Group();
      const corps = new T.Mesh(new T.CylinderGeometry(rr, rr, h, 24), verres[Math.floor(hasard() * verres.length)]);
      corps.position.y = h / 2;
      const cap = new T.Mesh(new T.CylinderGeometry(rr * 0.6, rr * 0.6, 0.06, 16), hasard() > 0.7 ? capLaiton : capNoir);
      cap.position.y = h + 0.03;
      const etq = new T.Mesh(new T.PlaneGeometry(rr * 1.3, h * 0.38), papier);
      etq.position.set(0, h * 0.45, rr + 0.002);
      b.add(corps, cap, etq);
      b.position.set(Math.sin(a) * r, haut, centreZ + Math.cos(a) * r);
      b.lookAt(0, haut, centreZ); b.rotateY(Math.PI);
      scene.add(b);
    }
  }
  // table de travail (chêne) devant l'orgue
  const table = new T.Mesh(new T.BoxGeometry(7, 0.1, 2.6), boisClair);
  table.position.set(0, -0.15, 1.0); scene.add(table);
  // balance de précision
  const balance = new T.Group();
  const socle = new T.Mesh(new T.BoxGeometry(0.62, 0.12, 0.52), new T.MeshStandardMaterial({ color: "#d9d9d4", roughness: 0.35 }));
  socle.position.y = 0.06;
  const ecran = new T.Mesh(new T.BoxGeometry(0.3, 0.06, 0.02), new T.MeshStandardMaterial({ color: "#2b2f2c", roughness: 0.2 }));
  ecran.position.set(0, 0.07, 0.265);
  const plateau = new T.Mesh(new T.CylinderGeometry(0.2, 0.2, 0.015, 48), new T.MeshStandardMaterial({ color: "#c9cbc8", metalness: 1, roughness: 0.25 }));
  plateau.position.y = 0.13;
  const becher = new T.Mesh(new T.CylinderGeometry(0.09, 0.09, 0.2, 32, 1, true), new T.MeshPhysicalMaterial({ color: 0xffffff, roughness: 0.03, transmission: 1, thickness: 0.05, ior: 1.5, side: T.DoubleSide }));
  becher.position.y = 0.24;
  const jus = new T.Mesh(new T.CylinderGeometry(0.085, 0.085, 0.09, 32), new T.MeshStandardMaterial({ color: "#c9a043", roughness: 0.15 }));
  jus.position.y = 0.185;
  balance.add(socle, ecran, plateau, jus, becher);
  balance.position.set(-0.85, -0.1, 1.25); balance.rotation.y = 0.25; scene.add(balance);
  // mouillettes en éventail dans un petit verre, bouts teintés
  const pot = new T.Mesh(new T.CylinderGeometry(0.1, 0.09, 0.22, 32, 1, true), becher.material);
  pot.position.set(0.55, 0.01, 1.2); scene.add(pot);
  ["#d9707f", "#e6c34a", "#d27a2c", "#a9a23f", "#7e3f12", "#f4f1e8", "#f4f1e8"].forEach((c, i) => {
    const m = new T.Group();
    const bande = new T.Mesh(new T.BoxGeometry(0.035, 0.62, 0.004), papier);
    bande.position.y = 0.31;
    const bout = new T.Mesh(new T.BoxGeometry(0.036, 0.12, 0.005), new T.MeshStandardMaterial({ color: c, roughness: 0.9 }));
    bout.position.y = 0.57;
    m.add(bande, bout);
    m.position.set(0.55, -0.08, 1.2);
    m.rotation.set(-0.12 + 0.04 * (i % 3), 0.3 * i, -0.36 + i * 0.12);
    scene.add(m);
  });
  // un flacon Ciste posé, et deux mouillettes couchées
  const fl = construireFlacon({ env, fond: "#d8d4c8" });
  poserFlacon(fl, { rotY: -0.25, couleur: new T.Color("#7e3f12"), nom: "Garrigue" });
  fl.flacon.scale.setScalar(0.12); fl.flacon.position.set(1.45, -0.1, 1.3);
  scene.add(fl.flacon);
  [[-0.15, 1.65, 0.5], [0.1, 1.75, 0.2]].forEach(([x, z, r]) => {
    const b = new T.Mesh(new T.BoxGeometry(0.035, 0.004, 0.62), papier);
    b.position.set(x, -0.095, z); b.rotation.y = r; scene.add(b);
  });
  // ombres portées douces depuis la fenêtre
  fenetre.castShadow = true;
  fenetre.shadow.mapSize.set(2048, 2048); fenetre.shadow.radius = 4; fenetre.shadow.bias = -0.0006;
  Object.assign(fenetre.shadow.camera, { left: -6, right: 6, top: 5, bottom: -4, near: 0.5, far: 30 });
  scene.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
  mur.castShadow = false; sol.castShadow = false;
  return { scene };
}

export { T, lerp };
