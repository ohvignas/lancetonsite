# Pâtes de fruits qui tremblent

apercu: gelee-tremble.html?apercu

Élément 3D · démo : [`gelee-tremble.html`](gelee-tremble.html) · captures : `captures/gelee-tremble-1440.png`, `-375.png`, `-1440-reduit.png`, `-1440-sans-webgl.png`

- **Technique** : Three.js r170 : cinq pâtes de fruits (abricot, cerise, reine-claude, coing, cassis : cubes `RoundedBoxGeometry`, dôme et palet en `LatheGeometry`) en `MeshPhysicalMaterial` translucide et mat (`transmission` 0,7, `roughness` 0,42, `attenuationColor`, pas de vernis). Dôme de cerise de la taille d'une bouchée (rayon × 0,7, aplati à 0,75 en hauteur, `roughness` 0,62 : aucun point brillant). **Sucre cristallisé** peint en code sur trois canvas 512² : une coque à peine plus grande (× 1,012) en 1 700 gros grains (facettes à pixels blancs purs, pâte visible entre eux) en `alphaMap`, relief (`bumpMap`) et **`roughnessMap`** (grains plus brillants que la pâte : ils scintillent quand la pièce bouge), déformée par le même nuanceur que la pâte. Chaque pièce a un ressort amorti (position + vitesse, deux sous-pas par image) ; le nuanceur de sommets la cisaille et l'écrase d'autant plus qu'on monte (`onBeforeCompile`, volume à peu près conservé). Toucher une pièce (rayon) lui donne une impulsion dans la direction du regard ; un bouton « Faire trembler » le fait au clavier ; une pièce tremble seule toutes les 3 s. Sur téléphone, le recul de la caméra est calculé sur la largeur visible : les cinq pièces tiennent avec une marge. Sur ordinateur, le groupe occupe la moitié droite, centré en hauteur sur le titre.
- **Poids** : démo 17,3 Ko (6,8 Ko gzip), plus three.module.min.js 171 Ko gzip + RoundedBoxGeometry 1,3 Ko + RoomEnvironment 1,2 Ko gzip (mis en cache d'une démo à l'autre).
- **Inspiré de** : « Jelly Garden » de https://motionsites.ai/3d-websites (fruits en gelée qu'on fait trembler en les tirant, boutons Soft / Hard / Shake). Étude : `../etude/motionsites-3d.md`. Code, géométries et textes écrits par nous, aucun modèle ni asset repris.
- **Licence** : Three.js et ses addons `RoundedBoxGeometry` et `RoomEnvironment`, licence MIT (https://cdn.jsdelivr.net/npm/three@0.170.0/LICENSE), chargés depuis le CDN sans modification.

## Quand l'utiliser

Confiserie (pâtes de fruits, guimauves, nougat tendre), pâtisserie, cosmétique en gel, marque ludique : un produit mou qu'on a envie de toucher. Pas plus de six objets. Dans le métier, on dit « pâtes de fruits », pas « gelées ».

## Brancher dans une maquette

1. Copier le bloc « à copier » du `<style>`, le HTML de la section, l'`importmap` et le `<script type="module">`. Le bloc « Démo » ne sert qu'à la page d'exemple.
2. Remplacer les textes fictifs par ceux de `05-contenus/` et régler les variables ci-dessous sur les tokens du design system (`06-design-system/`).
3. Une seule scène 3D par page. Garder le test WebGL avant `import("three")` : le repli ne télécharge rien.
4. Vérifier avec `../verifier-elements.cjs` (normal puis `SANS_WEBGL=1`).

## Variables

| Variable | Défaut | Rôle |
|---|---|---|
| `--gel-fond` | `#e4ddf0` | fond lavande (aussi fond de la scène 3D) |
| `--gel-encre` | `#2a1f3d` | textes |
| `--gel-accent` | `#7d3c98` | nom de la maison, focus |

Dans le script : raideur (`140`) et amortissement (`2.5`) du ressort, force d'un toucher (`2.2`), intervalle du tremblement automatique (`3.2` s), couleurs et formes de `pieces` (fruit cuit : abricot `#e08a3c`, cerise `#9e1f2e`, reine-claude `#a6b04a`, coing `#d9a441`, cassis `#4a1838`), densité du sucre (1 700 grains de 2,6 à 5,6 px, répétition 2 × 2), taille et aplatissement du dôme de cerise (`dome(.43).scale(1, .75, 1)`), largeur gardée à l'écran sur téléphone (`2.3`).

## Prompt pour le régénérer

> Écris un hero en Three.js (r170, importmap ESM) avec cinq pâtes de fruits de confiseur posées sur un fond lavande : cubes arrondis, un dôme et un palet, aux couleurs du fruit cuit (abricot, cerise, reine-claude, coing, cassis), en `MeshPhysicalMaterial` translucide et mat (transmission, épaisseur, couleur d'atténuation, sans vernis), chaque pièce de la taille d'une bouchée (le dôme pas plus gros qu'un cube, aplati, sans point brillant), enrobées de sucre cristallisé : une coque à peine plus grande, grains de sucre visibles un à un (gros, peu nombreux, facettes blanches, pâte visible entre eux) peints sur canvas en `alphaMap`, avec relief et `roughnessMap` pour qu'ils scintillent ; reflets `RoomEnvironment`, ombres douces. Chaque pièce a un petit ressort amorti ; dans le nuanceur de sommets, le décalage du ressort cisaille la pièce et l'écrase d'autant plus qu'on monte vers son sommet, en conservant à peu près le volume. Toucher ou cliquer une pièce lui donne une impulsion ; un bouton « Faire trembler » fait trembler toutes les pièces au clavier ; une pièce tremble seule de temps en temps. Sur ordinateur, groupe centré en hauteur sur le titre, dans la moitié droite. Bouton pause (`aria-pressed`), arrêt hors écran et onglet caché ; mouvement réduit : image fixe, rien ne tremble, et le bouton devient « Voir secouées » / « Remettre au repos » (`aria-pressed`) qui bascule vers un état déformé figé. Sur téléphone, calcule le recul de la caméra sur la largeur visible pour que les cinq pièces tiennent entières. Sans WebGL : affiche SVG des pièces sucrées (toutes posées au sol, palet en volume) et message discret. Scène sur fond opaque (la transmission en a besoin), densité de pixels ≤ 2. Ajoute le mode `?apercu`. Avant de rendre, vérifie l'élément avec l'œil du métier : chaque objet montré doit être juste pour un professionnel (pièce, matière, outil), et cadré entier à 375 px de large.

## Accessibilité

Canvas `aria-hidden` ; l'interaction a son équivalent clavier (bouton « Faire trembler »). Boutons de 44 px, focus visible violet, `aria-pressed` sur la pause et, en mouvement réduit, sur « Voir secouées ». Texte sombre sur lavande > 11:1. Sans WebGL : affiche fixe + message discret « Aperçu fixe : la 3D n'est pas disponible sur cet appareil. »

## Mouvement réduit

Rien ne tremble : ni tremblement automatique, ni réaction au toucher. Le bouton reste utile : « Voir secouées » montre d'un coup les pièces dans un état déformé figé (sans animation), « Remettre au repos » les rend droites. Vérifié avec Playwright (`reducedMotion: "reduce"`) : deux captures à 1,2 s d'écart identiques.

## Performance

La transmission ajoute une passe de rendu, la coque de sucre double le nombre d'objets (transparents, sans écriture de profondeur) : à réserver au hero, cinq pièces au plus. Boucle arrêtée hors écran, onglet caché ou en pause. Densité de pixels plafonnée à 2 (`setPixelRatio(Math.min(devicePixelRatio, 2))`). Three.js r170 chargé à la demande (`import()` après le test WebGL) : rien n'est téléchargé quand le repli s'affiche.
