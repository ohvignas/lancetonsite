# Modéliser un objet qui ne « fait pas 3D »

Fonctions dans `scripts/lib3d.py`. Exemple complet : `skills/maquette/templates/exemples/commerce-flacon/outils/blender/`
(`studio.py` pour la photo, `sequences.py` pour les animations et les gros plans, `objets.py` pour le coffret et
les fioles ; le `.glb` sort de `exemple.py -- glb`).

## 1. Partir des vraies cotes

Une ligne par pièce : nom, matière, dimensions réelles (en cm, converties en unités de scène),
ce qui la rend reconnaissable (épaulement, moletage, gravure). Sans cotes données par le
client : les déduire d'une photo de référence et les marquer `[hypothèse]`.

Une forme = un objet nommé (`Verre`, `Bague`, `Bouchon`) : le site remplace la géométrie par
nom, et l'animation les déplace par nom.

## 2. Choisir la technique

| Objet | Technique | Fonction |
|---|---|---|
| De révolution (flacon, bol, vase, bouteille, bouchon, pied) | profil (rayon, hauteur) tourné autour de Z | `tourner(nom, adoucir(profil))` |
| Boîte, coffret, carte, étui | cube mis à l'échelle + arêtes arrondies | `arrondir(ob, rayon, segments)` |
| Sachet, coussin, forme molle | grille subdivisée + Cloth ou déplacement | Blender Cloth, puis appliquer |
| Pièce mécanique, logo en relief | courbe ou texte extrudé, booléens, arrondis | `bpy.ops.object.text_add` + Solidify + Bevel |
| Objet naturel sans marque (pierre, fruit, plante) | bibliothèque libre (`bibliotheques.md`) avant de modéliser | import glTF |

## 3. Les règles de finition (celles que le client voit en premier)

1. **Toujours lisse.** Profil passé en spline (`adoucir`, 6 à 10 points par segment pour la
   photo, 3 à 4 pour le web), 192 pas de révolution pour la photo, 64 à 128 pour le web,
   ombrage lisse. Aucune facette, aucun chanfrein dur : « on voit que c'est de la 3D faite vite ».
2. **Aucune arête vive** sur une forme non tournée : Bevel 3 à 5 segments, `harden_normals`.
3. **Épaisseurs réelles.** Un verre a une paroi (2 à 3 mm) et un fond lourd ; une étiquette a
   une tranche (Solidify 0,010 à 0,015) ; un bouchon pose sur son col, sans jour.
4. **Liquide dans un contenant transparent** : le maillage du liquide **déborde** de 0,004 à
   0,006 dans la paroi (méthode « overlap »). Avec un film d'air, la réflexion totale fait des
   bords noirs et un dôme clair. Vérifier le recouvrement à chaque hauteur après lissage (le
   même `adoucir` sur l'intérieur du verre et sur le liquide).
5. **Niveau du liquide** : remplir jusque **dans l'épaule**. La surface se cache alors derrière
   l'arrondi épais de l'épaule ; l'appareil reste plus haut que le liquide (à hauteur de l'épaule)
   et ne voit jamais la surface en face (elle ferait un arc sombre ou refléterait le bouchon).
6. **Étiquettes et logos** : UV faites par construction (arc de cylindre → u = angle, v = hauteur),
   image rendue depuis le HTML de la charte (`outils/blender/etiquettes.cjs`, Playwright), jamais
   une texture générée par IA (le texte serait faux). Dos de l'étiquette : second matériau
   (`material_offset = 1`), papier kraft, car on le voit par réflexion interne.
   **Logo en graisse forte** (700 à 800) : sur une photo réduite en vignette, une graisse
   500 se lit comme un filet gris. Même graisse pour le logo du site (cohérence).
7. **Détails à petite échelle** qui trahissent la 3D quand ils sont grossiers : moletage fin
   (360 stries, relief 0,003), gravure peu profonde, filet de vis.

## 4. Matières (recettes dans `lib3d.py`)

| Matière | Fonction | Réglages clés |
|---|---|---|
| Verre épais | `verre()` | Transmission 1, IOR 1,52, rugosité 0,012, MULTI_GGX, volume vert 1,2, dispersion 0,035 |
| Liquide | `liquide(nom, hex)` | IOR 1,36, couleur par Volume Absorption (`x**0.8`), densité 1,0 |
| Métal (laiton, acier) | `metal()` | Metallic 1, rugosité 0,28, anisotropie 0,5 |
| Céramique, laque, plastique | `laque(nom, hex)` | rugosité 0,18, Coat 1 (rugosité 0,04) |
| Papier imprimé | `papier_imprime(nom, png)` | multiplié par crème `#f8f3ea`, bruit 600 en bump 0,04 |

Couleur toujours par le volume pour le verre et les liquides, jamais par la surface.

## 5. Export pour le site

```python
exporter_glb("modeles/objet.glb", [verre, bague, bouchon], animations=True)
```

- Forme seule par défaut : les matériaux se règlent dans three.js (transmission, épaisseur).
- Moins de 500 Ko visé (3 Mo au plus) : baisser la densité du lissage, jamais revenir au plat ;
  sans compression par défaut (le chargeur du site n'a pas de décodeur). Compresser seulement en
  ajoutant le décodeur côté site : Draco (`optimiser-medias.sh`) → `DRACOLoader` dans le script three.js.
- Côté site : `GLTFLoader`, remplacement de la géométrie par nom, **forme en code gardée en
  repli**, image fixe pour le mouvement réduit et sans WebGL (voir `animations.md`).
