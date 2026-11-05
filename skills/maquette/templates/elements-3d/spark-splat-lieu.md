# Lieu scanné (Gaussian splats)

apercu: spark-splat-lieu.html?apercu

Élément · démo : [`spark-splat-lieu.html`](spark-splat-lieu.html) · captures : `captures/spark-splat-lieu-1440.png`, `-375.png`, `-1440-reduit.png`, `-1440-sans-webgl.png`

- **Technique** : Spark (rendu de Gaussian splats sur Three.js) en ESM par importmap. L'affiche photo est affichée d'abord ; le scan se charge ensuite et la remplace en fondu. Cadrage automatique sur la boîte englobante du scan, va-et-vient lent de la caméra, glisser pour tourner.
- **Paquets** : `@sparkjsdev/spark@2.4.0` (`dist/spark.module.min.js`), `three@0.180.0` (Spark exige `three >= 0.180` : ce n'est pas la version 0.170 du reste du kit ; ne pas mélanger les deux sur une même page).
- **Poids** : démo 12,4 Ko (5,1 Ko gzip). Bibliothèques : Spark 2,85 Mo (981 Ko gzip, le moteur WebAssembly est inclus), Three.js 0.180 ≈ 180 Ko gzip (`three.core` + `three.module`). Scan d'exemple : 4,4 Mo. Rien de tout ça n'est chargé sans WebGL 2 ni en mouvement réduit.
- **Inspiré de** : exemples officiels de Spark (« hello-world », « viewer ») sur https://sparkjs.dev/examples/. Code et textes écrits par nous.

## Licence

- **Spark** : MIT, © 2025 World Labs Technologies, Inc. — https://github.com/sparkjsdev/spark/blob/main/LICENSE (vérifiée sur le dépôt le 5 novembre 2026). Impose de conserver la mention de copyright et la licence avec le code redistribué : la mention est en commentaire d'en-tête de la démo ; en chargeant depuis le CDN, le fichier servi garde sa propre en-tête.
- **Three.js** : MIT, https://github.com/mrdoob/three.js/blob/dev/LICENSE.
- **Scan d'exemple** (`https://sparkjs.dev/assets/splats/fireplace.spz`, listé dans `examples/assets.json` du dépôt) : **aucune licence publiée** pour ce fichier ; la licence MIT couvre le code du dépôt, pas les fichiers hébergés sur sparkjs.dev. On ne le copie donc pas dans le kit : la démo le charge à distance, pour montrer le rendu, et la légende dit de le remplacer. **Avant toute mise en ligne, utiliser le scan du client** (capturé avec Polycam, Luma, Scaniverse, Postshot, etc., export `.spz` ou `.ply`).

## Démo

Le scan d'exemple de Spark montre un salon-bibliothèque avec cheminée : la démo est donc celle d'un gîte fictif (« Gîte La Liseuse ») qui fait visiter son salon-bibliothèque, pour que textes et scan disent la même chose. L'affiche (photo de repli) est `../exemples/liberal-calade/images/grange-sejour-1400.webp`, un séjour avec canapé et poêle à bois, réchauffé en CSS (`filter: sepia(.22) saturate(1.15) brightness(.86)`) pour se rapprocher de l'ambiance du soir du scan ; le texte alternatif décrit ce que montre le cadrage. Même usage de pièce, pas la même pièce. Avec un vrai client, l'affiche doit être une photo de la pièce scannée.

## Quand l'utiliser

Hero d'un lieu qu'on veut faire visiter (fournil, atelier, gîte, salle de restaurant, boutique) ou d'un produit scanné (plat, objet artisanal). Seulement si le client a un vrai scan propre : un scan flou fait plus de tort qu'une bonne photo. Une seule scène de splats par page.

## Brancher dans une maquette

1. Copier l'importmap, le bloc « à copier » du `<style>`, la `<figure class="splat">` et le `<script type="module">`.
2. Mettre l'URL du scan dans `data-splat` (ou `?splat=…` dans l'adresse pour essayer un autre scan sans toucher au code). Le serveur du scan doit autoriser le CORS.
3. Mettre dans `<img class="splat__affiche">` la meilleure photo du lieu (`07-medias/`) : c'est elle que voient les visiteurs sans WebGL, en mouvement réduit, et pendant le chargement.
4. Régler `data-recul` (cadrage), `data-balancier` (amplitude du mouvement) et les bornes du glisser `data-glisser-min` / `data-glisser-max` en regardant le rendu : glisser de 400 px dans chaque sens, aucune bande vide ni premier plan flou ne doit apparaître.
5. Vérifier avec `../verifier-elements.cjs`, puis avec `SANS_WEBGL=1`.

## Variables

| Variable | Défaut | Rôle |
|---|---|---|
| `data-splat` | `…/fireplace.spz` | URL du scan (`.spz`, `.ply`, `.splat`, `.ksplat`, `.sog`) |
| `data-recul` | `0.6` | distance caméra, en rayons de la boîte englobante (plus petit = plus près ; 0,6 fait remplir le cadre au scan d'exemple) |
| `data-balancier` | `0.15` | amplitude du va-et-vient en radians (0 = fixe) |
| `data-glisser-min` | `-0.35` | borne de l'angle total (glisser + va-et-vient) d'un côté, en radians |
| `data-glisser-max` | `0.1` | borne de l'autre côté ; souvent asymétrique, car un scan n'est complet que d'un côté (ici, au-delà de 0,1 la gauche du cadre devient vide et le premier plan flou) |
| `--splat-fond` | `#14100d` | couleur sous le scan (bords vides) |
| `--splat-ratio` | `16 / 10` | proportions du cadre |
| `--splat-rayon` | `20px` | arrondi |

La plupart des scans sont enregistrés tête en bas : la démo les retourne (`quaternion.set(1, 0, 0, 0)`). Si le vôtre apparaît à l'envers, retirer cette ligne.

## Prompt pour le régénérer

> Écris un hero HTML autonome qui affiche un lieu scanné en Gaussian splats avec Spark (`@sparkjsdev/spark@2.4.0`, Three.js 0.180 en importmap). Une `<figure>` contient une photo du lieu en `object-fit: cover` qui sert d'affiche ; le script, en module, ne charge Spark et le scan (URL dans `data-splat`, surchargeable par `?splat=`) que si WebGL 2 est disponible et que le visiteur n'a pas demandé moins d'animations. Le canevas se pose au-dessus de la photo et apparaît en fondu quand `SplatMesh.initialized` est résolu. Cadre la caméra sur `getBoundingBox()` (après `updateMatrixWorld`), fais-la osciller doucement de quelques degrés, permets de glisser pour tourner, avec un bouton Pause dont le libellé change (« Pause » / « Reprendre »), sans `aria-pressed` (les deux à la fois feraient annoncer « Reprendre, activé »), arrêt hors écran (IntersectionObserver) et onglet caché. Affiche la progression du chargement dans une pastille `role="status"`, garde la photo si le chargement échoue ou dépasse 25 s. Densité de pixels plafonnée à 1,5. Règle le recul pour que le scan remplisse le cadre, et borne l'angle total (glisser + va-et-vient) entre deux valeurs réglables, souvent asymétriques, pour ne jamais montrer le vide ni le premier plan flou du scan ; sans texte d'état, pas de fond sombre autour du bouton Pause. Mode `?apercu` : hero centré verticalement, pleine hauteur. Les textes et la photo d'affiche décrivent la pièce qu'on voit dans le scan. Vérifie l'élément avec l'œil du métier : chaque objet montré doit être juste pour un professionnel (pièce, matière, outil, contenance).

## Accessibilité

Le canevas est `aria-hidden` : la photo porte le texte alternatif et reste dans le DOM. La pastille d'état est `role="status"` (chargement, échec). Le bouton Pause fait 44 px, a son propre fond (lisible sur le scan) et un focus visible ; son libellé change (« Pause » / « Reprendre »), sans `aria-pressed`, pour ne pas annoncer deux états contradictoires. Quand la pastille n'a pas de texte (mode aperçu), elle perd son fond : plus de halo sombre. Glisser pour tourner n'est pas indispensable : rien n'est perdu au clavier.

## Mouvement réduit

Rien n'est chargé : la photo reste, fixe. Même chose sans WebGL 2.

## Performance

Le poids est le vrai coût : environ 1,2 Mo gzip de bibliothèques plus 4 à 6 Mo de scan. À réserver à une page dédiée ou à un hero sous la ligne de flottaison chargé à la demande ; ne pas l'utiliser sur la page d'accueil d'un site qui doit charger vite sur mobile. Boucle arrêtée hors écran et onglet caché ; densité de pixels plafonnée à 1,5. Sur les petits téléphones, préférer un scan allégé (moins de 500 000 splats).
