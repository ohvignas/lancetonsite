# Sphère de cartes

apercu: sphere-cartes.html?apercu

Élément · démo : [`sphere-cartes.html`](sphere-cartes.html) · captures : `captures/sphere-cartes-1440.png`, `-375.png`, `-1440-reduit.png`

- **Technique** : CSS 3D (`perspective`, `preserve-3d`) + JS (48 positions sur une spirale de Fibonacci, glisser avec inertie, flèches)
- **Poids** : démo 14,5 Ko, 14511 octets (`wc -c`) ; environ 5,1 Ko gzip (5108 octets avec `gzip -9 -c | wc -c`, à quelques octets près selon la version de gzip)
- **Inspiré de** : E6 (« Orbit Sphere », /?prompt=orbit-sphere) dans `../motionsites-etude.md`. Code et textes écrits par nous.

## Licence

Code original Lance ton site, sans dépendance. Polices de la démo : Inter Tight et Young Serif (Google Fonts), SIL Open Font License 1.1, chargées par la démo seulement. Photos : `../exemples/artisan-sablon/images/`, images de l'exemple céramiste du plugin, à remplacer par celles du client.

## Quand l'utiliser

Portfolio, réalisations d'artisan, collection de produits : un « objet » à manipuler qui donne envie de jouer. Pas pour plus de 30 images utiles, ni comme seul accès au contenu (doubler par une grille ou un lien « tout voir »).

## Brancher dans une maquette

1. Copier le bloc « à copier » du `<style>`, le HTML de l'élément et son `<script>` s'il en a un. Le bloc « Démo » ne sert qu'à la page d'exemple.
2. Remplacer les textes et images fictifs par ceux de `05-contenus/` et `07-medias/`.
3. Régler les variables ci-dessous sur les tokens du design system (`06-design-system/`).
4. Vérifier avec `../verifier-elements.cjs` (0 erreur, captures 1440 et 375, mouvement réduit).

## Variables

| Variable | Défaut | Rôle |
|---|---|---|
| `--sphere-rayon` | `min(34vw, 300px)` | rayon de la sphère (40vw sur téléphone) |
| `--sphere-carte` | `calc(var(--sphere-rayon) * .34)` | largeur d'une carte 4:5 ; au-delà de 0,36 × rayon avec 48 cartes, les cartes se coupent en éclats |

Le script complète à 48 cartes (constante `N = Math.max(48, n)`) par des copies `aria-hidden`. Chaque place libre reçoit la photo dont l'original est le plus loin d'elle sur la sphère (produit scalaire minimal) : une photo et sa copie ne sont jamais voisines. Avec 24 photos, chacune apparaît exactement deux fois. Les cartes de l'hémisphère arrière restent visibles (`backface-visibility: visible`) mais reçoivent `.dos` (`brightness(.5) grayscale(.6)`) et une opacité de 0,5 à 0,7 (1 pour les cartes de face) : on voit la forme se refermer, et la photo de dos est remise à l'endroit (`scaleX(-1)` sur l'image). Les cartes vues de profil (|z| < 0,05) tombent à 0,12 d'opacité et remontent en douceur jusqu'à |z| = 0,3 : plus de traits ni de copeaux au pourtour. Chaque carte est décalée de 0, 1,5 ou 3 px en profondeur, pour que deux cartes voisines ne soient jamais dans le même plan (pas d'intersections dessinées en triangles).

Sans JavaScript, la sphère est une grille de vignettes (`.sphere-cartes:not(.prete)`, la classe `.prete` est posée par le script) et le bouton de rotation reste caché (`hidden`, retiré par le script). Le rayon réel est relu sur la hauteur du conteneur au redimensionnement.

Un seul métier par sphère : la démo prend les 24 photos de l'exemple céramiste (pièces, gestes au tour, émaillage, service en salle). Des photos de sept métiers différents donnent un vide-poche, pas un objet.

Au doigt, seule la rotation horizontale répond : `touch-action: pan-y` laisse le geste vertical faire défiler la page, ce qui est voulu.

## Prompt pour le régénérer

> Écris une sphère d'images en CSS 3D sans bibliothèque : N cartes réparties sur une sphère par la spirale de Fibonacci, chacune orientée vers l'extérieur, le tout dans un conteneur en perspective. On la fait tourner en la glissant (souris ou doigt) avec inertie, au clavier avec les flèches ; elle tourne doucement seule, avec un bouton pour arrêter. Cartes de l'arrière visibles mais assombries et désaturées (pas masquées), pour que la sphère se lise ; une quarantaine de cartes, taille ≈ 0,34 × rayon pour qu'elles ne se coupent pas, chacune décalée de 1 à 3 px en profondeur ; cartes de profil presque effacées ; photos de dos remises à l'endroit (`scaleX(-1)`) ; sans JavaScript, une grille de vignettes ; si les photos manquent, compléter par des copies décoratives, chacune posée à la place la plus éloignée de son original. Au doigt, ne jamais bloquer le défilement vertical de la page (`touch-action: pan-y`). Rayon et taille de carte en variables. En mouvement réduit : pas de rotation automatique ni d'inertie.

## Accessibilité

Conteneur focusable avec consigne clavier dans le texte voisin, flèches pour tourner, bouton « Arrêter la rotation ». Les copies de complément sont `aria-hidden` avec `alt` vide. Chaque photo utile a un `alt` qui décrit ce qu'on voit (« Assiette crue trempée dans un bain d'émail »), vérifié image par image.

## Mouvement réduit

Pas de rotation automatique ni d'inertie ; le glisser et les flèches tournent la sphère pas à pas.

## Performance

48 éléments transformés, une seule boucle `requestAnimationFrame` arrêtée hors écran et onglet caché. Images en `decoding="async"` et `loading="lazy"`, en 500 à 900 px de large. Aucune dépendance externe hors polices de la démo.
