# Parcours caméra au défilement

apercu: tunnel-defilement.html?apercu

Élément 3D · démo : [`tunnel-defilement.html`](tunnel-defilement.html) · captures : `captures/tunnel-defilement-1440.webp`, `-375.png`, `-1440-reduit.png`, `-1440-sans-webgl.png` · repli : `medias/tunnel-defilement-e1-16x9.webp` à `-e4-16x9.webp` et `-e1-9x16.webp` à `-e4-9x16.webp` (une image par étape)

- **Technique** : Three.js r170 : un trajet `CatmullRomCurve3` ; voûte et sol obtenus en balayant un profil 2D le long du trajet (géométrie écrite à la main) ; arcs doubleaux, piliers, barriques et 1 600 culots de bouteilles en `InstancedMesh` ; barriques : corps en douelles (`LatheGeometry` dont le dernier point du profil rentre vers le fond : jable fermé, aucun éclat au bord), six cercles de fer (trois par moitié) et **fonds plats en douelles droites** (deux `CircleGeometry` fusionnées avec `mergeGeometries`, jable sombre au bord) ; marques à la craie variées (millésime et parcelle : « 24 GR », « 24 CL », « 23 GR », « 24 BV », une `InstancedMesh` par marque, tirage au hasard par fût) ; **barriques couchées sur chantiers** : deux poutres basses instanciées sous chaque rangée, rang du bas posé dessus, rang du haut calé dans le creux entre deux fûts du dessous ; pressoir à cage (maie à bec, 12 lattes cerclées, vis filetée en `TubeGeometry` hélicoïdale, madriers croisés, mouton et levier) ; cuves inox satiné écartées de l'axe (fond conique, trappe, pieds) ; textures de tuffeau taillé (grands blocs, traces de pic, lit de silex, voile de moisissure de cave) et de sol damé peintes sur canvas ; brouillard, lanterne qui suit la caméra et quatre lanternes aux étapes. La progression du défilement place la caméra sur le trajet (`getPointAt`) et la fait regarder un peu plus loin.
- **Poids** : démo 26,5 Ko (9,3 Ko gzip), plus three.module.min.js 171 Ko gzip + BufferGeometryUtils 6,9 Ko gzip (mis en cache d'une démo à l'autre). Repli sans WebGL : une image par étape (pressoir, cuves, barriques, sortie), en 16:9 (`-eN-16x9.webp`, 23 à 43 Ko) ou en 9:16 sur écran en portrait (`-eN-9x16.webp`, 16 à 30 Ko), environ 130 Ko pour les quatre en 16:9 ; téléchargées **seulement** quand WebGL manque, et chacune seulement quand le visiteur arrive à son étape.
- **Licence** : Three.js et son addon `BufferGeometryUtils`, licence MIT (https://cdn.jsdelivr.net/npm/three@0.170.0/LICENSE), chargés depuis le CDN sans modification. Les huit images de repli sont des captures de notre propre scène.
- **Inspiré de** : Famille « mondes » et parcours de https://motionsites.ai/3d-websites (Moss Valley : caméra qui avance dans un paysage) et leçon « 3D scroll » de l'Academy. Étude : `../etude/motionsites-3d.md`. Code, géométries et textes écrits par nous, aucun modèle ni asset repris.

## Quand l'utiliser

Visite d'un lieu (cave, atelier, musée, usine), récit en étapes d'une fabrication. Quatre à six étapes. Pas pour une page qui doit se lire vite.

## Brancher dans une maquette

1. Copier le bloc « à copier » du `<style>`, le HTML de la section, l'`importmap` et le `<script type="module">`. Le bloc « Démo » ne sert qu'à la page d'exemple.
2. Remplacer les textes fictifs par ceux de `05-contenus/` et régler les variables ci-dessous sur le thème de la maquette (`07-maquette/prototype/theme.css`).
3. Une seule scène 3D par page. Garder le test WebGL avant `import("three")` : le repli ne télécharge rien.
4. Vérifier avec `../verifier-elements.cjs` (normal puis `SANS_WEBGL=1`).

## Variables

| Variable | Défaut | Rôle |
|---|---|---|
| `--tun-nuit` | `#120c08` | fond et brouillard |
| `--tun-pierre` | `#ddd2b8` | pierre de la voûte (tuffeau crème) |
| `--tun-lueur` | `#ffc58a` | lanternes, porte du fond, numéros |
| `--tun-texte` | `#f7efe4` | textes |

Dans le script : points du trajet, `R` (rayon de la voûte) et `SOL`, `ETAPES` (position de chaque étape sur le trajet, de 0 à 1), `POSES_REDUIT` (plan fixe de chaque étape en mouvement réduit), `DEBUT`/`FIN` de la course de la caméra, distance du brouillard, écart des cuves à l'axe (`1.62`).

**Refaire les images de repli** après tout changement de scène : en mouvement réduit (plans fixes `POSES_REDUIT`), amener chaque carte au centre (`.chapitre` n° 1 à 4, `scrollIntoView({ block: "center" })`), masquer ensuite les cartes et le bouton (`visibility: hidden`), capturer à 1600 × 900 et 720 × 1280 (Playwright), puis `cwebp -q 72` vers `medias/tunnel-defilement-eN-16x9.webp` et `-eN-9x16.webp` (pour une image 16:9 trop lourde : `-q 60 -resize 1280 720`). Le script de repli pose `data-etape` sur la section au défilement ; le CSS choisit l'image.

## Prompt pour le régénérer

> Écris une section en Three.js (r170, importmap ESM) qui fait visiter une cave voûtée au fil du défilement. Un trajet `CatmullRomCurve3` qui serpente ; la voûte (murs droits + demi-cercle) et le sol sont fabriqués en balayant un profil 2D le long du trajet ; arcs doubleaux et piliers tous les 4 m, barriques couchées sur chantiers, rang du bas posé (deux poutres basses le long de chaque rangée, rang du haut calé dans le creux entre deux fûts ; corps en douelles avec trois cercles par moitié, jable qui rentre vers le fond sans éclats, fonds plats en douelles droites fermés par deux disques : jamais de cernes de rondin ; marques à la craie variées, millésime et parcelle), pressoir à cage (maie, lattes cerclées, vis, madriers, mouton à levier), cuves inox satiné écartées de l'axe pour que la caméra ne les frôle pas, casiers de bouteilles en `InstancedMesh` ; textures de tuffeau taillé crème et de sol damé peintes sur canvas ; brouillard sombre, une lanterne attachée à la caméra et une lanterne à chacune des quatre étapes ; une porte lumineuse au bout. La scène est collante pendant que quatre cartes de texte défilent ; le défilement place la caméra sur le trajet avec un lissage. Mouvement réduit : un plan fixe par étape, assez en retrait pour que l'objet ne colle ni l'objectif ni la carte. Sans WebGL : un rendu fixe de la scène elle-même, une image par étape (captures WebP 16:9 et 9:16, chargées seulement dans ce cas, changées au défilement) et un message discret en haut de la section, jamais sous une carte. Avant de rendre, vérifie l'élément avec l'œil du métier : chaque objet montré doit être juste pour un professionnel (pièce, matière, outil), et cadré entier à 375 px de large. Rendu seulement pendant le défilement, densité de pixels ≤ 2. Ajoute le mode `?apercu`.

## Accessibilité

Canvas `aria-hidden`, contenu dans les cartes (`h2`), fond des cartes sombre translucide : contraste > 10:1. Rien n'est interactif dans la scène. Sans WebGL : rendu fixe de la scène (WebP) + message discret « Aperçu fixe : la 3D n'est pas disponible sur cet appareil. »

## Mouvement réduit

Pas de travelling : quatre plans fixes, un par étape (`POSES_REDUIT`), le premier en retrait du pressoir. Vérifié avec Playwright (`reducedMotion: "reduce"`) : deux captures à 1,2 s d'écart identiques.

## Performance

Six lumières ponctuelles, environ 1 800 instances en sept appels de dessin (fûts par marque, chantiers, bouteilles). Une image n'est calculée que pendant le défilement et le lissage, section visible et onglet visible. Densité de pixels plafonnée à 2 (`setPixelRatio(Math.min(devicePixelRatio, 2))`). Three.js r170 chargé à la demande (`import()` après le test WebGL) : rien n'est téléchargé quand le repli s'affiche.
