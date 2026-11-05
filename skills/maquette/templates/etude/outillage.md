# Étude — outillage (Remotion, Theatre.js, Babylon/Three, cables.gl, RIFE + FFmpeg, Drei)

Agent « outillage », 5 novembre 2026. Fichiers produits : `outillage/` (README, 6 fiches, projet `remotion-fonds/`), `fonds-hero/remotion-maille.html|.md`, `fonds-hero/remotion-lignes.html|.md`, `fonds-hero/medias/remotion-*`.

## Pages et fichiers consultés

| Source | Accès | Pour |
|---|---|---|
| https://github.com/remotion-dev/remotion/blob/main/LICENSE.md | libre | licence Remotion (résumée dans `outillage/remotion.md`) |
| https://github.com/remotion-dev/remotion/pull/3750 | libre | brouillon de licence Remotion 5.0 (non fusionné) |
| https://github.com/theatre-js/theatre (LICENSE, README) | libre | double licence Apache 2.0 / AGPL 3.0 |
| https://github.com/BabylonJS/Babylon.js/blob/master/license.md | libre | Apache 2.0 |
| https://github.com/mrdoob/three.js/blob/dev/LICENSE | libre | MIT |
| https://github.com/pmndrs/drei/blob/master/LICENSE | libre | MIT |
| https://github.com/cables-gl/cables (package.json, README), API GitHub de `cables_electron` | libre | MIT ; pas de fichier LICENSE à la racine de `cables` |
| https://cables.gl/docs/4_export_embed/dev_embed/export_zip/export_zip, FAQ licence | libre | export HTML, licence des œuvres |
| https://github.com/nihui/rife-ncnn-vulkan (LICENSE, README, dernière release) | libre | MIT, options de la ligne de commande, release 20221029 |
| https://github.com/hzwer/ECCV2022-RIFE/blob/main/LICENSE | libre | MIT (modèle RIFE d'origine) |
| registre npm, jsDelivr | libre | versions exactes, poids mesurés des bundles |

## Repéré → technique → notre fichier

| Repéré | Technique | Notre fichier |
|---|---|---|
| Fonds « mesh gradient » des pages d'accueil | 5 `radial-gradient` animés par phase entière, rendus en vidéo | `fonds-hero/remotion-maille.html` |
| Lignes ondulées éditoriales | portée SVG + lentille gaussienne avec seuil, grain en CSS | `fonds-hero/remotion-lignes.html` |
| Composants Drei | réécriture Three.js pur | `outillage/drei-sans-react.md` |

Aucun prompt tiers cité ; aucun code tiers recopié (Remotion n'est pas redistribué : seul notre `package.json` est livré).

## Non retenu

- Grain **dans** la vidéo Remotion : doublait le poids (1,44 Mo → 0,80 Mo sans) ; déplacé en CSS.
- Test réel de rife-ncnn-vulkan : non exécuté (téléchargement d'un exécutable tiers non demandé, GPU Vulkan non garanti dans le bac à sable) ; la chaîne FFmpeg a été testée avec `minterpolate` en remplacement.
- cables.gl comme outil par défaut : pas pilotable en code, poids, accessibilité à rebrancher.
