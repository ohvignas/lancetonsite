# Modéliser un objet 3D avec Blender (sans interface)

> **Voie complète : skill `objets-3d`** (`${CLAUDE_PLUGIN_ROOT}/skills/objets-3d/SKILL.md`) : bibliothèque `lib3d.py`,
> exemple réglé, boucle de correction, animations. Ce fichier garde le chargement côté site et l'historique de Ciste.

> Testé le 05/11/2026 sur Ciste (`exemples/commerce-flacon/`) avec Blender 5.2.3 LTS.

Three.js en code suffit pour les formes simples (profil tourné, boîte, sphère). Blender sert quand la forme
dépasse le code : facettes taillées, moletage, chanfreins, booléens, texte gravé, modèle importé, ou des
images fixes en rendu Cycles. On le pilote par script Python, sans ouvrir l'interface : c'est reproductible
et ça marche sur toutes les machines.

## 1. Installer Blender (une fois, avec l'accord de l'utilisateur)

```bash
blender --version                                   # déjà installé ?
brew install --cask blender                         # macOS
winget install -e --id BlenderFoundation.Blender    # Windows
sudo snap install blender --classic                 # Linux
```

Sur macOS, dans le bac à sable de Claude Code, Blender plante au lancement (code 139) : le lancer hors du bac à sable.

## 2. Écrire le script de l'objet

Modèle : `skills/objets-3d/scripts/exemple.py` (mode `glb`), avec `lib3d.py`. Ciste n'utilise plus de `.glb` :
ses animations sont des séquences d'images rendues dans Blender (`exemples/commerce-flacon/outils/blender/sequences.py`).

- Une forme = un objet nommé (`Verre`, `Bague`, `Bouchon`), en coordonnées du monde, cotes identiques au code.
- Profils tournés avec `bmesh.ops.spin` (l'équivalent de `LatheGeometry`).
- **Toujours lisse** : profil passé en spline (`adoucir()`), 96 à 192 pas, ombrage lisse. Aucune facette ni
  chanfrein dur : ça se voit tout de suite comme de la 3D faite vite. Pour alléger le `.glb`, baisser la densité,
  ne jamais revenir à l'ombrage plat.
- Modificateurs (chanfrein, booléen…) appliqués avant l'export.
- Export : `export_scene.gltf(export_format="GLB", export_yup=True, export_materials="NONE")`. Le `.glb` ne
  porte que la forme ; les matériaux restent dans three.js, où ils se règlent finement (transmission, épaisseur).
- Pour exporter aussi le verre : Principled BSDF Transmission 1, alpha Opaque, nœud Volume Absorption pour la
  couleur (`KHR_materials_transmission`, `_ior`, `_volume`).

```bash
blender -b --factory-startup --python skills/objets-3d/scripts/exemple.py -- glb modeles/flacon.glb
blender -b --factory-startup --python skills/objets-3d/scripts/exemple.py -- photo apercu.png 720 96
```

Le second appel rend un aperçu Cycles (720 px) : contrôle de la forme avant le site.

## 3. Charger dans le site

```js
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
let MODELE = null;
try { MODELE = await new GLTFLoader().loadAsync(new URL("./modeles/flacon.glb", import.meta.url).href); }
catch (e) { /* repli : la forme en code */ }
// puis : mesh.geometry = MODELE.scene.getObjectByName("Bouchon").geometry
```

Toujours garder la forme en code comme repli, et les images fixes pour le mouvement réduit et sans WebGL.

## 4. Alléger (si le fichier dépasse 500 Ko)

```bash
npx @gltf-transform/cli optimize in.glb out.glb --compress draco --simplify false   # puis DRACOLoader côté site
```

Avec Meshopt, déclarer `MeshoptDecoder` sur le chargeur.

## 5. Photo produit réaliste (catalogue, fiche produit)

Modèle : `exemples/commerce-flacon/outils/blender/studio.py` (rend un parfum de `donnees.js`, 4:5).

```bash
blender -b --factory-startup --python outils/blender/studio.py -- garrigue images/studio/garrigue.png 1080 256
```

Ce qui fait la différence entre « rendu 3D » et « photo », par ordre d'impact :

1. **Lumière dessinée pour le verre.** Le verre ne montre que des reflets : des softboxes émissives en dégradé
   (point chaud au centre, bords qui retombent ; le principe de Light Wrangler et HDR Light Studio), des bandes
   étroites sur les côtés, en arrière pour les bords clairs et en avant pour les deux reflets verticaux, un strip
   au-dessus pour le bouchon, et des drapeaux noirs hors champ pour les filets sombres. Les sources n'apparaissent
   pas à l'image (`visible_camera = False`).
2. **Light linking** (Cycles 4.0+) : les bandes n'éclairent que le flacon (`light_linking.receiver_collection`),
   le halo n'éclaire que le fond. Sans ça, on obtient un V clair sur le fond et une ligne d'horizon.
3. **Contre-jour pour le liquide** : une carte lumineuse en dégradé derrière le flacon, invisible pour l'appareil
   et en reflet. Elle s'arrête au-dessus du culot, sinon le fond épais s'allume comme une veilleuse.
4. **Verre et liquide** : la couleur passe par Volume Absorption, jamais par la surface. Le liquide déborde de
   quelques millièmes dans le verre, sans film d'air (sinon réflexion totale : bords noirs). Il est rempli jusque
   dans l'épaule : la surface se cache derrière l'arrondi, l'appareil reste plus haut que le liquide. Glass en `MULTI_GGX`, avec une dispersion légère.
5. **Contact au sol** : un nœud Ambient Occlusion dans le matériau du sol, avec un cyclo à grand rayon (12) et un
   profil fin, sinon l'arête sol/mur se voit derrière la base.
6. **Détails** : papier crème avec du grain en bump et une vraie tranche (Solidify), moletage fin, aucune facette.
7. **Rendu** : 32 rebonds, volume ≥ 2, caustiques, OIDN avec albédo et normales en préfiltre `ACCURATE`,
   `filter_width` 1.1, AgX. 1080 px pour le site, 256 échantillons ; plus grand seulement sur demande.

Validation : la boucle persona (`client-persona`) note l'image sur 100 avant de la livrer.

Sources : recettes de matériaux de cc-blender-skill (RobLe3, MIT) ; doc Blender (light linking, Principled BSDF) ;
fils BlenderArtists « perfume bottle packshot » ; Blender StackExchange (volume absorption dans le verre) ;
photographes produit (robandrewphoto.com, picjam.ai, broncolor.swiss) pour le schéma bandes et drapeaux.

## MCP Blender : seulement en option

Le MCP officiel du Blender Lab (projects.blender.org/lab/blender_mcp), livré avec le plugin, pilote
un Blender ouvert : utile pour retoucher en regardant le viewport. Il exécute du Python sans garde-fou
et demande l'interface ouverte : on n'installe son module que si
l'utilisateur le demande. Par défaut, le script sans interface ci-dessus.
