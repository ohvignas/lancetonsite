# Bibliothèques 3D gratuites : partir d'un modèle existant pour aller plus vite

Avant de modéliser un objet **sans marque** (plante, pierre, outil, meuble, fruit, lampe,
tasse), chercher s'il existe déjà sous licence libre. Un objet **qui porte la marque du
client** (son flacon, sa boîte, son produit) se modélise toujours sur mesure (`modelage.md`) :
un modèle trouvé ne sera jamais le sien.

## Où chercher, dans cet ordre

| Source | Contenu | Licence | Accès sans interface |
|---|---|---|---|
| **Poly Haven** (polyhaven.com) | modèles photoscannés de qualité, HDRI de studio, textures PBR | **CC0** : tout usage, sans crédit | API publique `https://api.polyhaven.com/assets?t=models`, puis `/files/<id>` (liens .blend, .gltf, résolutions 1k à 8k) |
| **ambientCG** (ambientcg.com) | textures PBR, HDRI, quelques modèles | **CC0** | API `https://ambientcg.com/api/v2/full_json?type=...` |
| **Smithsonian 3D** (3d.si.edu) | objets de musée scannés (outils, poteries, fossiles) | **CC0** pour les objets marqués ainsi | téléchargement .glb par fiche |
| **Kenney** (kenney.nl) et **Quaternius** (quaternius.com) | objets stylisés, low poly, packs entiers | **CC0** | archives .glb / .fbx |
| **Poly Pizza** (poly.pizza) | objets low poly | CC0 ou CC-BY selon le modèle | API avec clé gratuite |
| **Khronos glTF Sample Assets** (github.com/KhronosGroup/glTF-Sample-Assets) | modèles de référence (verre, matières, animations) | licence par modèle (CC0, CC-BY) | dépôt Git |
| **Sketchfab** (sketchfab.com) | le plus grand choix, qualité variable | **par modèle** : garder CC0 et CC-BY, filtrer « Downloadable » | API v3 (compte gratuit) ; le MCP Blender sait l'interroger |
| **BlenderKit** (blenderkit.com) | modèles, matériaux, scènes de studio, dans Blender | gratuits « Royalty Free » ou CC0 selon l'asset | extension Blender (compte gratuit) |
| **Blender Studio** (studio.blender.org) | personnages, décors, fichiers de production | CC-BY | téléchargement .blend |

**À éviter** : Free3D, TurboSquid gratuit et CGTrader gratuit (licences floues, souvent
« usage personnel »), Thingiverse (fait pour l'impression : maillages lourds et sans
matériaux), et tout modèle « Editorial use only » ou « NoAI ».

## Règles

1. **Vérifier la licence de chaque fichier**, pas seulement celle du site, et la noter au
   manifeste (`06-medias/medias.md`) : source, auteur, licence, lien.
2. **CC-BY** : créditer l'auteur dans les mentions légales du site (« Modèle 3D : Nom,
   CC-BY 4.0, lien »). **CC0** : pas d'obligation, mais on garde la trace au manifeste.
3. **Télécharger demande un oui de l'utilisateur** : nom du fichier, source, poids.
   Ranger dans `06-medias/3d/sources/<source>-<id>/` (un dossier par téléchargement) et ne
   jamais exécuter de script venu d'une archive.
4. **Reprendre dans Blender avant le site** : import (`bpy.ops.import_scene.gltf`), mise à
   l'échelle de la scène, remise à plat des matériaux pour la charte, **lissage**
   (ombrage lisse, pas de facettes), puis le même export et la même boucle de correction
   que pour un objet modélisé (`SKILL.md` étapes 3 à 9).
5. **Alléger** : un scan Poly Haven 4k pèse lourd. Prendre la résolution 1k ou 2k pour le
   web, puis `gltf-transform optimize`.
6. **HDRI de studio** (Poly Haven « studio », CC0) : utiles pour enrichir les reflets d'un
   objet métallique. Le schéma de lumière de `lumiere-studio.md` reste la base, l'HDRI
   s'ajoute à faible intensité (Background Strength 0,1 à 0,3).

## Exemple : chercher et récupérer un modèle Poly Haven

```bash
# 1. Lister les modèles d'une catégorie (lecture seule, aucun téléchargement)
curl -s "https://api.polyhaven.com/assets?t=models&c=decorative" | python3 -c "import json,sys; d=json.load(sys.stdin); [print(k, '|', v['name']) for k,v in list(d.items())[:20]]"
# 2. Voir les fichiers proposés pour un modèle
curl -s "https://api.polyhaven.com/files/<id>" | python3 -m json.tool | grep -n '"url"' | head
# 3. Après le oui de l'utilisateur : télécharger le .gltf 1k et ses textures dans un dossier vide dédié
```
