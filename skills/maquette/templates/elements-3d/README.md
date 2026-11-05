# Éléments 3D

12 éléments en Three.js / WebGL, chacun avec une démo HTML autonome, une fiche (technique, poids, licence, prompt pour le régénérer, accessibilité, mouvement réduit) et des captures avec et sans WebGL dans `captures/`.

## Règles communes

- Three.js `0.170.0` par importmap ESM (jsDelivr). Exception : Spark exige Three.js 0.180 ou plus, donc pas sur la même page que les autres.
- **Repli sans WebGL** dans chaque démo (affiche, rendu fixe ou version CSS), vérifié avec `SANS_WEBGL=1`.
- Mouvement réduit : image fixe ; densité de pixels plafonnée à 2 ; rendu stoppé hors écran et onglet caché ; bouton pause visible.
- Un seul contexte WebGL lourd par écran ; la 3D sert le moment signature, pas la décoration.
- Aucune génération payante : géométries faites en code, médias repris des exemples.

### Repérés sur sceneai.art

Étude : [`../etude/sceneai.md`](../etude/sceneai.md).

| Élément | Ce que c'est | Gzip démo | Liens |
|---|---|---|---|
| [Carte en métal flottante](carte-metal.html) | Carte de paiement en métal, en 3D  | 5,0 Ko | [fiche](carte-metal.md) · [aperçu](carte-metal.html?apercu) |
| [Orbe vocal](orbe-voix.html) | Orbe 3D d'assistant vocal  | 4,4 Ko | [fiche](orbe-voix.md) · [aperçu](orbe-voix.html?apercu) |
| [Voiles de verre](voiles-verre.html) | Fond de hero en 3D  | 5,1 Ko | [fiche](voiles-verre.md) · [aperçu](voiles-verre.html?apercu) |

### Outils libres (licence citée dans chaque fiche)

Étude : [`../etude/outils-libres-demos.md`](../etude/outils-libres-demos.md).

| Élément | Ce que c'est | Gzip démo | Liens |
|---|---|---|---|
| [Lieu scanné (Gaussian splats)](spark-splat-lieu.html) | Hero de lieu ou de produit scanné en Gaussian splats avec Spark (Three.js)  | 4,6 Ko | [fiche](spark-splat-lieu.md) · [aperçu](spark-splat-lieu.html?apercu) |
| [Flacon en verre](flacon-verre.html) | Flacon en verre 3D réutilisable  | 6,6 Ko | [fiche](flacon-verre.md) · [aperçu](flacon-verre.html?apercu) |

### 3D repérée sur motionsites.ai/3d-websites

Étude : [`../etude/motionsites-3d.md`](../etude/motionsites-3d.md).

| Élément | Ce que c'est | Gzip démo | Liens |
|---|---|---|---|
| [Objet piloté au défilement](objet-defilement.html) | Une tasse en grès construite en code (Three.js) tourne et s'incline au fil du défilement, étape par étape, à… | 5,6 Ko | [fiche](objet-defilement.md) · [aperçu](objet-defilement.html?apercu) |
| [Île flottante low-poly](ile-flottante.html) | Hero avec une petite île flottante low-poly construite en code (Three.js)  | 5,8 Ko | [fiche](ile-flottante.md) · [aperçu](ile-flottante.html?apercu) |
| [Mascotte qui suit du regard](mascotte-regard.html) | Page 404 avec une mascotte 3D (une chouette en primitives Three.js) qui suit le curseur et le focus clavier… | 6,2 Ko | [fiche](mascotte-regard.md) · [aperçu](mascotte-regard.html?apercu) |
| [Mot extrudé en volume](titre-extrude.html) | Un mot géant en volume (TextGeometry de Three.js, police libre MgOpen)  | 5,1 Ko | [fiche](titre-extrude.md) · [aperçu](titre-extrude.html?apercu) |
| [Parcours caméra au défilement](tunnel-defilement.html) | Visite d'une cave troglodyte en 3D (Three.js)  | 6,6 Ko | [fiche](tunnel-defilement.md) · [aperçu](tunnel-defilement.html?apercu) |
| [Prairie instanciée réactive](champ-instances.html) | Hero avec une prairie de 9 000 brins d'herbe et fleurs (InstancedMesh Three.js) qui ondulent au vent et… | 5,3 Ko | [fiche](champ-instances.md) · [aperçu](champ-instances.html?apercu) |
| [Gelées qui tremblent](gelee-tremble.html) | Cinq gelées de fruits en 3D (Three.js, matière translucide) qui tremblent quand on les touche  | 5,2 Ko | [fiche](gelee-tremble.md) · [aperçu](gelee-tremble.html?apercu) |

## Mode aperçu

Chaque démo s'ouvre aussi en `<nom>.html?apercu` : l'élément seul, plein cadre, sans texte d'explication (tout ce qui explique porte `data-explication`). Les captures de `captures/` sont faites dans ce mode. Chaque fiche porte une ligne `apercu:` et une section « Prompt pour le régénérer » prête à coller.

## Vérifier

```
SANS_WEBGL=1 DOSSIERS=elements-3d node ../verifier-elements.cjs <base> [filtre]
```

Sans `SANS_WEBGL`, mêmes contrôles que les autres dossiers (0 erreur console, pas de débordement à 1440 et 375, mouvement réduit figé, mode aperçu branché).

## Formes modélisées dans Blender

Quand la forme dépasse le code (facettes, moletage, gravure, modèle importé), voir [blender.md](blender.md) : script Python sans interface, export `.glb`, chargement avec repli. Exemple réel : le bouchon taillé et la bague moletée de Ciste. Méthode complète (modélisation lisse, photo studio, animations, boucle de correction) : skill `objets-3d`.
