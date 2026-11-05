# Pelouse de causse instanciée réactive

apercu: champ-instances.html?apercu

Élément 3D · démo : [`champ-instances.html`](champ-instances.html) · captures : `captures/champ-instances-1440.webp`, `-375.png`, `-1440-reduit.png`, `-1440-sans-webgl.png`

- **Technique** : Three.js r170 : pelouse sèche et rase de causse : 7 500 brins d'herbe courts et jaunis (3 800 sur téléphone), un quart plus bas encore dans la bande la plus proche de la caméra, 100 orchis et 140 lins **sur leur tige** (une géométrie par espèce, tige + feuilles + fleur, fusionnée avec `mergeGeometries`, couleurs par sommet ; épi d'orchis en 12 petites fleurs, des sphères aplaties montées en spirale, du rose pâle en bas au pourpre en haut), 100 coussins de thym piqués de 45 fleurs mauves chacun, 120 pierres calcaires à demi enterrées ; tout en `InstancedMesh`, couleurs par instance (`setColorAt`), sol de terre sèche et gravier peint sur canvas. Le vent et l'écartement autour du curseur sont calculés dans le nuanceur de sommets (`onBeforeCompile` sur `MeshLambertMaterial`, remplacement de `project_vertex`) en coordonnées monde ; le curseur est projeté sur le sol par un rayon contre un plan. Brouillard couleur d'horizon, ciel en dégradé CSS.
- **Poids** : démo 28,0 Ko (9,3 Ko gzip, dont le SVG de repli), plus three.module.min.js 171 Ko gzip + BufferGeometryUtils 6,9 Ko gzip (mis en cache d'une démo à l'autre).
- **Licence** : Three.js et son addon `BufferGeometryUtils`, licence MIT (https://cdn.jsdelivr.net/npm/three@0.170.0/LICENSE), chargés depuis le CDN sans modification.
- **Inspiré de** : Famille « mondes / nature » de https://motionsites.ai/3d-websites (Moss Valley, Sky Cookie : herbe, fleurs, ciel clair) et champs d'objets instanciés réactifs vus dans les aperçus « 3D Interactive ». Étude : `../etude/motionsites-3d.md`. Code, géométries et textes écrits par nous, aucun modèle ni asset repris.

## Quand l'utiliser

Producteur, apiculteur, pépiniériste, marque d'extérieur : un hero qu'on a envie de toucher. Le texte va dans le ciel, au-dessus de l'herbe. **Adapter la flore au terroir du client** : ici un causse calcaire (herbe rase, thym, orchis, lin, pierre) ; pour un pré de fauche, herbe haute et verte, marguerites, sauges.

## Brancher dans une maquette

1. Copier le bloc « à copier » du `<style>`, le HTML de la section, l'`importmap` et le `<script type="module">`. Le bloc « Démo » ne sert qu'à la page d'exemple.
2. Remplacer les textes fictifs par ceux de `05-contenus/` et régler les variables ci-dessous sur le thème de la maquette (`07-maquette/prototype/theme.css`).
3. Une seule scène 3D par page. Garder le test WebGL avant `import("three")` : le repli ne télécharge rien.
4. Vérifier avec `../verifier-elements.cjs` (normal puis `SANS_WEBGL=1`).

## Variables

| Variable | Défaut | Rôle |
|---|---|---|
| `--champ-ciel` | `#cfe1ee` | ciel en haut |
| `--champ-brume` | `#f4ead6` | horizon et brouillard |
| `--champ-herbe` | `#9a9460` | sol sec du causse (aussi la base de la texture) |
| `--champ-encre` | `#1c2414` | textes |

Dans le script : `N`, `NO`, `NL`, `NT`, `NP` (brins, orchis, lins, coussins de thym, pierres), hauteur des brins (`.16 + … * .28`, × 0,75 pour `z > 1.5`, la bande la plus proche), `uRayon` (rayon d'écartement, 2), force du vent (`* .13`) et de l'écartement (`* 1.1`), palette `secs`, couleurs des fleurs dans `orchis` et `lin`.

## Prompt pour le régénérer

> Écris un hero en Three.js (r170, importmap ESM) avec une pelouse de causse calcaire : 7 500 brins d'herbe fins, courts et jaunis (plans effilés, pied à y = 0, plus ras encore au premier plan), des orchis et des lins bleus **sur leur tige** (tige, deux feuilles ; épi d'orchis de 8 à 12 petites sphères aplaties en spirale, du rose pâle en bas au pourpre en haut, jamais de cubes ; corolle de lin à cinq pétales ; une géométrie fusionnée par espèce avec couleurs par sommet, dessinée étirée en hauteur pour rester ronde une fois l'instance aplatie), des coussins bas de thym gris-vert piqués de fleurs mauves, des pierres calcaires claires à demi enterrées, un sol de terre sèche peint sur canvas ; tout en `InstancedMesh`, positions plus denses au premier plan, couleurs par instance. Dans le nuanceur de sommets (`onBeforeCompile`, en coordonnées monde), le vent fait onduler la pointe des brins et les brins s'écartent et se couchent autour du point du sol visé par le curseur ou le doigt (rayon contre un plan). Caméra basse, brouillard de la couleur de l'horizon, ciel en dégradé CSS ; le titre est centré dans le ciel. Bouton pause, arrêt hors écran et onglet caché ; mouvement réduit : pas de vent, l'herbe ne s'écarte que sous le curseur, sans lissage. Sans WebGL : la même pelouse en SVG (touffes en motif large, pierres, thym, fleurs sur tige, épis d'orchis en petites taches empilées du rose pâle au pourpre), posée sous les boutons, et un message discret (en bas à gauche sur ordinateur, en haut à droite sur téléphone, jamais sur la bande d'herbe). Moitié moins d'instances sur téléphone, densité de pixels ≤ 2, `aria-pressed` sur le bouton pause. Ajoute le mode `?apercu`. Avant de rendre, vérifie l'élément avec l'œil du métier : chaque objet montré doit être juste pour un professionnel (pièce, matière, outil), et cadré entier à 375 px de large.

## Accessibilité

Canvas `aria-hidden`, `touch-action: pan-y` pour que le défilement vertical reste libre au doigt. Texte sombre sur ciel clair > 12:1. Bouton pause de 44 px (rond sur téléphone, libellé lu), `aria-pressed` vrai quand le vent est en pause. Sans WebGL : affiche fixe + message discret « Aperçu fixe : la 3D n'est pas disponible sur cet appareil. »

## Mouvement réduit

Pas de vent ; l'herbe ne s'écarte que là où se trouve le curseur, sans animation. Vérifié avec Playwright (`reducedMotion: "reduce"`) : deux captures à 1,2 s d'écart identiques.

## Performance

Six appels de dessin pour toute la pelouse (herbe, orchis, lins, coussins, fleurs de thym, pierres), calcul du vent sur la carte graphique. Boucle arrêtée hors écran, onglet caché ou en pause. Densité de pixels plafonnée à 2 (`setPixelRatio(Math.min(devicePixelRatio, 2))`). Three.js r170 chargé à la demande (`import()` après le test WebGL) : rien n'est téléchargé quand le repli s'affiche.
