# Outils, extensions et sources utilisés

Tout ce qui a servi à faire le flacon Ciste, avec la licence et le rôle de chaque outil.

## Indispensables (gratuits, en local)

| Outil | Rôle | Licence | Installation |
|---|---|---|---|
| **Blender** 4.2+ (testé 5.2 LTS) | modélisation, matières, lumière, rendu Cycles, animation, export glTF | GPL | `scripts/installer-blender.sh` (avec l'accord de l'utilisateur) |
| **bpy / bmesh** | API Python de Blender, tout se fait par script, sans interface | GPL | inclus dans Blender |
| **Cycles** + **OIDN** | rendu physique (verre, liquide, caustiques) + débruitage Intel | Apache 2.0 | inclus |
| **AgX** | rendu des couleurs façon photo (hautes lumières douces) | inclus | `view_transform = "AgX"` |
| **Light linking** (Cycles 4.0+) | une lumière n'éclaire que les objets choisis | inclus | `obj.light_linking.receiver_collection` |
| **Exporteur glTF 2.0** | `.glb` pour le site | Apache 2.0 | inclus |
| **ffmpeg** + **cwebp** | séquence WebP, vidéo MP4/WebM, affiche | LGPL / BSD | `brew install ffmpeg webp` |
| **Playwright** (Chromium) | étiquettes et logos rendus depuis le HTML de la charte, avec les vraies polices | Apache 2.0 | déjà utilisé par le plugin |

## Côté site

| Outil | Rôle | Licence |
|---|---|---|
| **three.js** (`GLTFLoader`, `AnimationMixer`) | 3D en direct, piloté au défilement | MIT |
| **model-viewer** (Google) | 3D simple, sans code, avec AR | Apache 2.0 |
| **gltf-transform** | compresser le `.glb` (Draco + `DRACOLoader` côté site, textures WebP) | MIT |
| Geste `canvas[data-sequence]` du kit (`gestes.js`) | séquence d'images au défilement | du plugin |

## Optionnels

- **MCP Blender** (celui du plugin : le MCP officiel du Blender Lab, projects.blender.org/lab/blender_mcp, GPL ; autre projet, sans lien : `blender-mcp` d'ahujasid, MIT, qui cherche aussi dans Poly Haven / Sketchfab) : piloter un Blender **ouvert** depuis Claude. Utile pour un humain qui veut voir la scène ; les scripts
  `-b` (sans interface) restent la voie par défaut, plus fiables et rejouables.
- **BlenderKit** (extension, compte gratuit) : bibliothèque dans Blender. Voir `bibliotheques.md`.
- **Light Wrangler**, **HDR Light Studio** (payants) : leur principe (des textures de boîtes à
  lumière) est reproduit par `softbox()` de `lib3d.py` ; on n'en a pas eu besoin pour Ciste.
- **fal image → 3D** (Hunyuan3D, Trellis…) : seulement pour un objet organique ou une forme
  qu'on ne sait pas modéliser, jamais pour le produit du client ; génération payante, avec un oui.

## Recettes et conseils repris (style et méthode, pas de code copié)

- **cc-blender-skill** (RobLe3, MIT) : recettes de départ (verre en volume, Cycles + OIDN + AgX).
- **Doc Blender** : Light linking, Principled BSDF (MULTI_GGX, Dispersion), Cycles sampling, glTF.
- **Photographie de parfum** : picjam.ai, nightjar.so, robandrewphoto.com, broncolor.swiss
  (bandes, drapeaux noirs, contre-jour, cyclo).
- **Forums** : BlenderArtists « Perfume bottle ad packshot practice », Blender StackExchange
  156100 (liquide qui déborde dans le verre), imeshh.com, 80.lv (dispersion).
- **Apple** (pages produit) : principe de la séquence d'images au défilement.

Toujours citer au manifeste les modèles et textures tiers (`bibliotheques.md`, règle 1).
