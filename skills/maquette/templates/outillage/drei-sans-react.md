# Drei sans React — les bons réflexes en Three.js pur

- **Drei** (https://github.com/pmndrs/drei) : la boîte à outils de React Three Fiber. Licence **MIT** (fichier `LICENSE`, « Copyright (c) 2020 react-spring »). Version npm `@react-three/drei` 10.7.9.
- **Pourquoi cette fiche** : nos pages sont statiques, sans React. On ne charge donc ni R3F ni Drei, mais leurs composants donnent de bonnes idées de rendu. Ci-dessous, leurs équivalents en **Three.js pur** (`three@0.170.0`, importmap du kit). Les extraits sont **écrits par nous** (pas de code de Drei recopié) ; les addons Three.js cités sont sous MIT.

Importmap commune :

```html
<script type="importmap">
{ "imports": {
  "three": "https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.min.js",
  "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.170.0/examples/jsm/"
} }
</script>
```

Dans tous les extraits : `scene`, `camera`, `renderer` existent déjà ; `t` = temps en secondes dans la boucle de rendu ; la boucle s'arrête hors écran et en mouvement réduit (règles du kit).

## 1. `<Environment>` → éclairage d'ambiance par image

Ce que fait Drei : charge une HDR (ou un preset) et la met en `scene.environment` pour que les matériaux PBR aient des reflets.

Sans fichier à télécharger — une pièce studio générée en code :

```js
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
const pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture; // 0.04 = flou des reflets
pmrem.dispose();
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;
```

Avec une HDR (Poly Haven, CC0 ; viser une 1k ≈ 1,5 Mo, ou la convertir en `.hdr.jpg`/KTX2) :

```js
import { RGBELoader } from "three/addons/loaders/RGBELoader.js"; // r170 ; renommé HDRLoader dans les versions récentes
new RGBELoader().load("images/studio-1k.hdr", (tex) => {
  tex.mapping = THREE.EquirectangularReflectionMapping;
  scene.environment = tex;           // éclaire
  // scene.background = tex;         // seulement si on veut la voir
});
```

Quand : tout objet en `MeshStandardMaterial`/`MeshPhysicalMaterial`. `RoomEnvironment` d'abord (0 octet), HDR si on veut une couleur de lumière précise.

## 2. `<ContactShadows>` → ombre douce sous l'objet

Ce que fait Drei : rend la scène vue d'en dessous dans une texture, la floute et la pose sur un plan au sol.

Version légère (suffit pour un objet qui flotte) : un plan avec un dégradé radial peint dans un canvas.

```js
function ombreDouce(taille = 1.6, opacite = 0.45) {
  const c = document.createElement("canvas"); c.width = c.height = 128;
  const g = c.getContext("2d").createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0, `rgba(0,0,0,${opacite})`); g.addColorStop(1, "rgba(0,0,0,0)");
  const ctx = c.getContext("2d"); ctx.fillStyle = g; ctx.fillRect(0, 0, 128, 128);
  const plan = new THREE.Mesh(
    new THREE.PlaneGeometry(taille, taille),
    new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(c), transparent: true, depthWrite: false })
  );
  plan.rotation.x = -Math.PI / 2;
  return plan;
}
const ombre = ombreDouce(); ombre.position.y = -0.8; scene.add(ombre);
// si l'objet monte et descend : ombre.scale.setScalar(1 - hauteur * 0.3); ombre.material.opacity = 1 - hauteur * 0.5;
```

Version fidèle (forme réelle de l'objet) : voir l'exemple officiel `webgl_shadow_contact` de Three.js (caméra orthographique sous le sol, `MeshDepthMaterial`, deux passes de flou). À réserver aux objets posés, de forme irrégulière ; coûte deux rendus de plus par image.

## 3. `<Float>` → l'objet qui flotte

```js
const base = objet.position.y;
function flotter(t, { vitesse = 1.2, hauteur = 0.08, inclinaison = 0.06 } = {}) {
  objet.position.y = base + Math.sin(t * vitesse) * hauteur;
  objet.rotation.x = Math.cos(t * vitesse * 0.5) * inclinaison;
  objet.rotation.z = Math.sin(t * vitesse * 0.7) * inclinaison;
}
// boucle : flotter(t); en mouvement réduit, ne pas l'appeler (objet immobile).
```

Fréquences différentes sur chaque axe = mouvement qui ne paraît pas mécanique.

## 4. `<PresentationControls>` → tourner l'objet à la main, retour en douceur

Ce que fait Drei : on attrape l'objet, il tourne dans des limites, et revient à sa pose en ressort au relâchement. Pas de zoom, pas de déplacement (contrairement à `OrbitControls`).

```js
function presentation(cible, el, { maxX = 0.5, maxY = 1.2, retour = true } = {}) {
  let actif = false, x0 = 0, y0 = 0, visee = { x: 0, y: 0 };
  el.style.touchAction = "pan-y"; // le défilement vertical de la page reste possible
  el.addEventListener("pointerdown", (e) => { actif = true; x0 = e.clientX; y0 = e.clientY; el.setPointerCapture(e.pointerId); });
  el.addEventListener("pointermove", (e) => {
    if (!actif) return;
    visee.y = THREE.MathUtils.clamp((e.clientX - x0) / 200, -maxY, maxY);
    visee.x = THREE.MathUtils.clamp((e.clientY - y0) / 300, -maxX, maxX);
  });
  const fin = () => { actif = false; if (retour) visee = { x: 0, y: 0 }; };
  el.addEventListener("pointerup", fin); el.addEventListener("pointercancel", fin);
  // clavier : flèches pour tourner (accessibilité)
  el.tabIndex = 0;
  el.addEventListener("keydown", (e) => {
    const pas = { ArrowLeft: [0, -0.2], ArrowRight: [0, 0.2], ArrowUp: [-0.15, 0], ArrowDown: [0.15, 0] }[e.key];
    if (pas) { e.preventDefault(); visee.x = THREE.MathUtils.clamp(visee.x + pas[0], -maxX, maxX); visee.y = THREE.MathUtils.clamp(visee.y + pas[1], -maxY, maxY); }
  });
  return (dt) => { // à appeler dans la boucle
    const k = 1 - Math.exp(-dt * 8); // amorti indépendant de la fréquence d'images
    cible.rotation.x += (visee.x - cible.rotation.x) * k;
    cible.rotation.y += (visee.y - cible.rotation.y) * k;
  };
}
```

Mettre `cible` = un `Group` parent de l'objet (pour combiner avec `flotter`). Donner au canvas un `aria-label` (« Modèle 3D du fauteuil, flèches pour le faire tourner »).

## 5. `<Html>` ancré → étiquette HTML qui suit un point 3D

Option A, l'addon officiel :

```js
import { CSS2DRenderer, CSS2DObject } from "three/addons/renderers/CSS2DRenderer.js";
const etiquettes = new CSS2DRenderer();
etiquettes.setSize(innerWidth, innerHeight);
Object.assign(etiquettes.domElement.style, { position: "absolute", inset: 0, pointerEvents: "none" });
conteneur.append(etiquettes.domElement);
const el = document.querySelector("#etiquette-assise"); // vrai HTML, lisible et traduisible
const ancre = new CSS2DObject(el); ancre.position.set(0.4, 0.6, 0); objet.add(ancre);
// boucle : renderer.render(scene, camera); etiquettes.render(scene, camera);
```

Option B, sans addon (une ou deux étiquettes) :

```js
const v = new THREE.Vector3();
function placer(el, point3D) {
  v.copy(point3D).project(camera);
  const x = (v.x * 0.5 + 0.5) * conteneur.clientWidth;
  const y = (-v.y * 0.5 + 0.5) * conteneur.clientHeight;
  el.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
  el.hidden = v.z > 1; // derrière la caméra
}
```

Les étiquettes restent dans le DOM : lecteurs d'écran et SEO les voient. Pour masquer quand l'objet passe devant, Drei utilise un raycast (`occlude`) ; en pur Three.js, `Raycaster` de la caméra vers le point, ou plus simple : estomper selon l'angle (`normale · direction caméra`).

## 6. `<Center>` et `<Bounds>` → centrer et cadrer automatiquement

```js
function centrer(objet) {
  const boite = new THREE.Box3().setFromObject(objet);
  objet.position.sub(boite.getCenter(new THREE.Vector3())); // centre à l'origine
  return boite.getSize(new THREE.Vector3());
}
function cadrer(camera, taille, marge = 1.25) {
  const rayon = taille.length() / 2;
  const fov = THREE.MathUtils.degToRad(camera.fov);
  const fovH = 2 * Math.atan(Math.tan(fov / 2) * camera.aspect);
  const dist = (rayon * marge) / Math.sin(Math.min(fov, fovH) / 2); // tient en largeur ET en hauteur
  camera.position.set(0, 0, dist);
  camera.near = dist / 100; camera.far = dist * 10;
  camera.updateProjectionMatrix();
}
const taille = centrer(modele); cadrer(camera, taille);
// au resize : camera.aspect = w / h; cadrer(camera, taille);
```

Indispensable avec un glTF généré (étape 7) dont l'échelle et l'origine sont imprévisibles.

## 7. `<MeshTransmissionMaterial>` → verre, alternatives

Ce que fait Drei : un verre « réfractif » qui déforme ce qu'il y a derrière (rendu supplémentaire de la scène dans une texture, aberration chromatique, flou). Beau et **coûteux**.

Alternatives, de la plus fidèle à la plus légère :

1. **`MeshPhysicalMaterial` natif** (r170 sait la transmission, l'épaisseur et la dispersion) :

```js
const verre = new THREE.MeshPhysicalMaterial({
  transmission: 1, thickness: 0.6, roughness: 0.08, ior: 1.45,
  dispersion: 0.25,          // irisation sur les bords (r163+)
  attenuationColor: new THREE.Color("#d9efe8"), attenuationDistance: 1.2,
  clearcoat: 1, clearcoatRoughness: 0.05,
});
```

Exige `scene.environment` (section 1) sinon le verre est gris. Three.js fait lui-même une passe de transmission ; limiter à un ou deux objets, plafonner la densité de pixels à 2 (1,5 sur mobile).

2. **Faux verre sans transmission** : `MeshPhysicalMaterial({ metalness: 0, roughness: 0.05, transparent: true, opacity: 0.25, envMapIntensity: 1.5, clearcoat: 1 })` — reflets crédibles, aucune réfraction, coût minime.
3. **Verre en CSS** quand la 3D n'apporte rien : `backdrop-filter` (voir `elements/verre-liquide.html`).

## Ce qu'on ne transpose pas

`<Text>` (troika) : préférer du vrai HTML par-dessus. `<ScrollControls>` : ScrollTrigger du kit. `<Stage>` : c'est 1 + 2 + 6 ensemble. `<Sparkles>`/`<Stars>` : voir `fonds-hero/champ-etoiles.html`.
