# Babylon.js ou Three.js pour nos pages statiques

- **Three.js** : https://github.com/mrdoob/three.js · licence **MIT** (fichier `LICENSE`, « Copyright © 2010-2026 three.js authors ») · dernière version npm `0.187.0` ; **le kit est figé sur `three@0.170.0`** (importmap des démos `elements-3d/`).
- **Babylon.js** : https://github.com/BabylonJS/Babylon.js · licence **Apache 2.0** (fichier `license.md`) · dernière version npm `9.33.2` (`babylonjs` UMD et `@babylonjs/core` ES modules).

## Verdict

**Three.js reste notre moteur par défaut.** Pour un hero 3D, un objet produit qui tourne ou un fond WebGL sur une page statique sans bundler, il pèse 10 fois moins, se charge par importmap en une ligne et tout le kit est déjà écrit avec. **Babylon.js** se justifie seulement pour une page qui est presque une application 3D (configurateur, visite, physique, beaucoup d'interface dans la scène), et de préférence avec un bundler.

## Comparatif

| Critère | Three.js 0.170 | Babylon.js 9.33 |
|---|---|---|
| **Poids** (jsDelivr, mesuré, gzip -9) | `three.module.min.js` 691 648 o → **170 890 o** ; + `GLTFLoader.js` 23 566 o | `babylon.js` (UMD, déjà minifié) 8 851 580 o → **1 911 314 o** ; + `babylonjs.loaders.min.js` 215 678 o |
| Sans bundler | importmap ESM, modules d'`addons/` à la carte | UMD global `BABYLON` (tout le moteur) ; le tree-shaking passe par `@babylonjs/core` + bundler |
| **API** | bas niveau : scène, caméra, renderer, boucle `requestAnimationFrame` écrite par nous ; beaucoup de choses en addons | haut niveau, « tout compris » : `Engine` + `Scene` + `runRenderLoop`, caméras avec contrôles, gizmos, GUI 2D/3D, physique (Havok), son, particules intégrés |
| Style de code | on compose des briques, peu de magie | conventions fortes, beaucoup d'options par objet |
| **Écosystème** | énorme : exemples officiels, Drei/R3F (React), shaders partagés, la plupart des tutoriels « site 3D » | plus restreint mais très soigné : **Playground** en ligne, **Inspector** intégré (débogage visuel de la scène), **Sandbox** pour tester un glTF, Node Material Editor, forum actif, soutien Microsoft |
| **glTF import** | `GLTFLoader` (+ `DRACOLoader`, `KTX2Loader`, `MeshoptDecoder`) | `@babylonjs/loaders` (glTF 2.0, Draco, KTX2, Meshopt), extensions KHR très complètes |
| **glTF export** | `GLTFExporter` (addons) : scène/objet → `.gltf`/`.glb` côté navigateur | `@babylonjs/serializers` (`GLTF2Export.GLBAsync`) |
| WebGPU | `three/webgpu` (`WebGPURenderer` avec repli WebGL 2) | `WebGPUEngine` mûr, repli manuel vers `Engine` WebGL |
| **Repli** sans WebGL | à écrire : tester le contexte, afficher l'affiche/image (patron des démos `elements-3d/`) | idem : `Engine.isSupported()` puis image de repli ; `NullEngine` sert aux tests côté serveur, pas d'affichage |
| Matériaux PBR | `MeshStandardMaterial`, `MeshPhysicalMaterial` (transmission, clearcoat, iridescence, dispersion) | `PBRMaterial` très complet (sheen, clearcoat, sous-surface, anisotropie) |
| Licence | MIT : mention de copyright à garder | Apache 2.0 : mention + `NOTICE` s'il y en a un, signaler les modifications |

## Quand prendre Babylon.js quand même

- Configurateur produit avec boutons et panneaux **dans** la 3D, sélection d'objets, gizmos : son GUI et son système de picking font gagner des jours.
- Scène qui a besoin de **physique** ou de collisions (Havok intégré).
- Équipe cliente qui a déjà du Babylon, ou un modèle préparé dans la Sandbox Babylon.
- Le poids est accepté (page dédiée, pas la page d'accueil) et il y a un bundler.

## Quand ne pas le prendre

- Hero, fond, objet qui flotte, carte produit 3D : c'est 90 % de nos cas, Three.js suffit (et ses snippets sont dans `elements-3d/`).
- Page d'accueil où chaque Ko compte : 1,9 Mo gzip de moteur avant la première image, c'est un LCP perdu sur mobile.
- Pas de bundler (nos maquettes statiques) : le UMD Babylon charge tout le moteur.

## Brancher (si Babylon est retenu)

```html
<canvas id="scene" aria-hidden="true"></canvas>
<script src="https://cdn.jsdelivr.net/npm/babylonjs@9.33.2/babylon.js"></script>
<script src="https://cdn.jsdelivr.net/npm/babylonjs-loaders@9.33.2/babylonjs.loaders.min.js"></script>
<script>
  /* Babylon.js 9.33.2 — Apache-2.0 — https://github.com/BabylonJS/Babylon.js */
  const toile = document.getElementById("scene");
  if (!BABYLON.Engine.isSupported()) { toile.replaceWith(Object.assign(new Image(), { src: "images/repli.webp", alt: "" })); }
  else {
    const moteur = new BABYLON.Engine(toile, true, { adaptToDeviceRatio: false });
    moteur.setHardwareScalingLevel(1 / Math.min(devicePixelRatio, 2)); // densité plafonnée à 2
    const scene = new BABYLON.Scene(moteur);
    scene.createDefaultCameraOrLight(true, true, true);
    BABYLON.AppendSceneAsync("modeles/objet.glb", scene).then(() => scene.createDefaultEnvironment());
    let visible = true;
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(toile);
    moteur.runRenderLoop(() => { if (visible && !document.hidden) scene.render(); });
    addEventListener("resize", () => moteur.resize());
  }
</script>
```

Même règles que le kit : repli sans WebGL, densité ≤ 2, rendu stoppé hors écran et onglet caché, rien ne bouge seul en mouvement réduit.
