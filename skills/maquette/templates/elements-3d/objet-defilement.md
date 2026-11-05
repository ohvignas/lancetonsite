# Objet piloté au défilement

apercu: objet-defilement.html?apercu

Élément 3D · démo : [`objet-defilement.html`](objet-defilement.html) · captures : `captures/objet-defilement-1440.webp`, `-375.png`, `-1440-reduit.png`, `-1440-sans-webgl.png`

- **Technique** : Three.js r170 (importmap ESM) : tasse et soucoupe en `LatheGeometry` (profil 2D tourné), anse en `TorusGeometry` partiel, `MeshPhysicalMaterial` (vernis `clearcoat`), textures peintes en code sur `<canvas>` (émail moucheté, pied brut via `roughnessMap`, cappuccino : crème noisette tigrée et cœur de mousse de lait), reflets `RoomEnvironment`, ombre de contact en texture radiale (256 px, anisotropie maximale : pas de rayures vue en rasant), placée et mise à l'échelle avec l'objet. Section collante (`position: sticky`) + trois étapes de texte qui défilent par-dessus ; la progression du défilement interpole trois poses clés (rotation, inclinaison).
- **Poids** : démo 16,1 Ko (6,1 Ko gzip), plus three.module.min.js 171 Ko gzip + RoomEnvironment 1,2 Ko gzip (mis en cache d'une démo à l'autre).
- **Inspiré de** : Famille « objet produit » de https://motionsites.ai/3d-websites (Sky Cookie, Fin Coin, Go On White : un objet unique au centre, qui tourne pendant qu'on lit). Leçon « 3D scroll » de l'Academy (objet piloté au défilement). Étude : `../etude/motionsites-3d.md`. Code, géométries et textes écrits par nous, aucun modèle ni asset repris.

## Licence

- **Three.js** r170 : MIT, https://github.com/mrdoob/three.js/blob/dev/LICENSE (chargé depuis le CDN, le fichier servi garde son en-tête de licence). Aucun autre code tiers ; géométries, textures et textes écrits par nous.

## Quand l'utiliser

Fiche produit d'artisan, page « savoir-faire », lancement d'un objet physique (tasse, bijou, couteau, flacon). Trois à cinq étapes au plus. Pas pour un service immatériel.

## Brancher dans une maquette

1. Copier le bloc « à copier » du `<style>`, le HTML de la section, l'`importmap` et le `<script type="module">`. Le bloc « Démo » ne sert qu'à la page d'exemple.
2. Remplacer les textes fictifs par ceux de `05-contenus/` et régler les variables ci-dessous sur le thème de la maquette (`07-maquette/prototype/theme.css`).
3. Une seule scène 3D par page. Garder le test WebGL avant `import("three")` : le repli ne télécharge rien.
4. Vérifier avec `../verifier-elements.cjs` (normal puis `SANS_WEBGL=1`).

## Variables

| Variable | Défaut | Rôle |
|---|---|---|
| `--objet-fond` | `#2a1c15` | fond de la scène (expresso) |
| `--objet-email` | `#ebe4d8` | couleur de l'émail peint sur la tasse |
| `--objet-terre` | `#b98d68` | grès brut du pied |
| `--objet-encre` | `#f3ebe1` | textes |

Dans le script : tableau `poses` (une pose `{ ry, rx }` par étape ; chaque pose montre ce dont parle son étape : à l'étape 02, l'anse est de profil, entière, côté texte), position et échelle selon la largeur dans `placer()`, profil de la tasse `profilTasse` (points x = rayon, y = hauteur).

## Prompt pour le régénérer

> Écris une section de page en Three.js (r170, importmap ESM depuis jsdelivr) où un objet construit en code accompagne un texte en trois étapes. L'objet (ici une tasse en grès et sa soucoupe) est fait de `LatheGeometry` à partir d'un profil 2D, l'anse d'un tore partiel ; matière `MeshPhysicalMaterial` avec un léger vernis, textures peintes sur canvas (mouchetures, pied brut plus rugueux), reflets d'un `RoomEnvironment`, ombre douce en texture radiale posée juste sous la soucoupe à toute échelle (son décalage suit l'échelle de l'objet) et qui s'efface quand l'objet bascule. La scène est collante (sticky) pendant que trois cartes de texte défilent par-dessus ; la progression du défilement interpole trois poses clés (rotation et inclinaison, vue plongeante à la dernière) avec un lissage ; chaque pose montre ce dont parle son étape (l'anse visible et entière à l'étape « anse », la surface du café à l'étape « mousse »). Le texte doit être juste pour le métier : une tasse de 20 cl, c'est un cappuccino ou un café filtre, pas un espresso. Objet à droite sur grand écran, en haut sur téléphone avec des cartes en verre sombre. Teste WebGL avant de charger Three.js ; sans WebGL, une affiche SVG de l'objet et un message discret. Mouvement réduit : l'objet saute d'une pose à l'autre sans interpolation. Rendu seulement quand on défile et que la section est visible, densité de pixels ≤ 2. Ajoute le mode `?apercu`. Vérifie l'élément avec l'œil du métier : chaque objet montré doit être juste pour un professionnel (pièce, matière, outil, contenance).

## Accessibilité

Canvas et affiche `aria-hidden` ; tout le contenu est dans les cartes de texte (titres `h2`, ordre de lecture normal). Contraste du texte clair sur expresso > 12:1. Rien n'est interactif dans la scène. Sans WebGL : affiche fixe + message discret « Aperçu fixe : la 3D n'est pas disponible sur cet appareil. »

## Mouvement réduit

L'objet ne glisse plus : il prend directement la pose de l'étape en cours (trois images fixes). Aucune animation autonome, donc pas de bouton pause nécessaire. Vérifié avec Playwright (`reducedMotion: "reduce"`) : deux captures à 1,2 s d'écart identiques.

## Performance

Une image n'est calculée que pendant le défilement et le lissage, et seulement si la section est à l'écran (`IntersectionObserver`) et l'onglet visible. Densité de pixels plafonnée à 2 (`setPixelRatio(Math.min(devicePixelRatio, 2))`). Three.js r170 chargé à la demande (`import()` après le test WebGL) : rien n'est téléchargé quand le repli s'affiche.
