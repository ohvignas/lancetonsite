# Outils open source : une démo par outil

Six bibliothèques libres testées en conditions réelles dans nos pages statiques (pas de build, CDN à version exacte, ESM quand la bibliothèque l'exige). Licences vérifiées sur le fichier LICENSE de chaque dépôt via l'API GitHub le 5 novembre 2026 ; versions relevées sur le registre npm le même jour.

## Tableau

| Outil | Licence (dépôt) | Paquet npm et version | Poids bibliothèque (gzip) | Démo | Ce que la démo montre |
|---|---|---|---|---|---|
| Spark (sparkjsdev/spark) | MIT, © 2025 World Labs | `@sparkjsdev/spark@2.4.0` + `three@0.180.0` | ≈ 981 Ko + 180 Ko | `elements-3d/spark-splat-lieu.html` | hero d'un lieu scanné en Gaussian splats, affiche photo d'abord, scan en fondu, cadrage automatique, glisser pour tourner |
| THREE-CustomShaderMaterial | MIT, © 2024 Faraz Shaikh | `three-custom-shader-material@6.4.0` (entrée `vanilla`) + `three@0.170.0` | 4,5 Ko + 171 Ko | `elements-3d/flacon-verre.html` | flacon en verre tourné, transmission + Fresnel, liquide coloré à ménisque ondulant, couleur et niveau réglables |
| Anime.js v4 | MIT, © 2025 Julian Garnier | `animejs@4.5.0` | 41 Ko | `elements/micro-anime.html` | ajout au panier : vignette en arc vers le panier, pastille qui rebondit, total qui défile |
| mo.js | MIT, © O. Solomka, X. Foucrier, J. Sandstedt | `@mojs/core@1.7.1` | 31 Ko | `elements/micro-mojs.html` | « J'aime » avec éclats, pastille « Nouveau » qui pétille |
| Two.js | MIT, © 2012-2025 @jonobr1 | `two.js@0.8.24` | 50 Ko | `elements/carte-provenance-two.html`, `elements/schema-etapes-two.html` | carte illustrée « d'où vient le produit » avec trajet qui se dessine ; schéma d'étapes dont les liaisons se tracent |
| D3 | ISC, © 2010-2026 Mike Bostock | `d3@7.9.2` | 93 Ko | `elements/preuves-d3.html` | courbe « avec / sans nous » et barres comparées animées à l'entrée, tableaux équivalents |

Toutes ces licences sont permissives : usage commercial libre, seule obligation de garder la mention de copyright et la licence avec le code redistribué. Chaque démo porte la mention en commentaire d'en-tête ; chargées depuis jsdelivr, les bibliothèques gardent aussi leur propre en-tête.

## Limites et points d'attention

- **Spark** : le poids (≈ 1,2 Mo gzip de code + 4 à 6 Mo de scan) le réserve à une page dédiée ou à un bloc chargé à la demande. Exige Three.js ≥ 0.180, donc pas la version 0.170 du reste du kit : ne pas mettre Spark et un autre élément Three.js sur la même page. **Aucun scan libre de droits n'est fourni par le projet** : les scans d'exemple (`examples/assets.json`, hébergés sur sparkjs.dev) n'ont pas de licence publiée. La démo charge l'exemple « cheminée » à distance, sans le copier, et dit de le remplacer par le scan du client. URL configurable (`data-splat`, `?splat=`), repli photo solide.
- **CustomShaderMaterial** : un objet transmissif ne voit pas les autres objets transmissifs ; le liquide doit rester opaque pour être visible à travers le verre. `ACESFilmicToneMapping` grisait le décor vu à travers le verre : `NeutralToneMapping` corrige. Le rendu final dépend du fond (rayures derrière pour que la réfraction se lise).
- **Anime.js** : le paquet complet par CDN pèse 41 Ko gzip pour une seule fonction utilisée ; avec un build, n'importer que `animate`. Piège rencontré : un élément en `display: none` a une boîte vide (cible de vol à 0,0) — viser l'icône du panier, pas la pastille masquée.
- **mo.js** : dépôt peu actif (1.7.1) ; stable mais sans évolution attendue. Crée ses propres calques DOM, à marquer `aria-hidden`.
- **Two.js** : 50 Ko gzip pour du dessin que du SVG écrit à la main ferait aussi ; son intérêt est la courbe lissée et `ending` (tracé progressif) sans calcul de longueur. Les étiquettes dessinées deviennent minuscules sur téléphone : la démo les grossit, et la liste HTML porte l'information.
- **D3** : 93 Ko gzip pour le paquet complet ; un build avec seulement les modules utiles divise par trois. La palette bleu / rouille est validée en thème clair uniquement ; un thème sombre demande d'autres teintes.

## Vérification

`verifier-elements.cjs` (Chrome réel, captures en mode `?apercu`) : 7/7 démos OK (0 erreur console, pas de débordement à 1440 et 375, mouvement réduit figé), et les deux démos 3D OK avec `SANS_WEBGL=1` (repli photo pour Spark, flacon en CSS pour le verre). Captures regardées et corrigées : cadrage Spark (boîte englobante calculée avant mise à jour de la matrice), verre trop laiteux (tonalité), vol de vignette dans le mauvais sens, carte sans dernière étape, anneau de pastille rogné, contour de bouton sans couleur.

## Non retenu

- Copier un scan d'exemple Spark dans le kit : licence absente.
- Variante React de CustomShaderMaterial : nos pages sont statiques, l'entrée `vanilla` suffit.
- Boucle permanente sur la pastille mo.js : un éclat à l'entrée et au survol suffit, sans bouton pause à gérer.
