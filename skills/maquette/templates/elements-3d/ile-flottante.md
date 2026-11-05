# Île flottante low-poly

apercu: ile-flottante.html?apercu

Élément 3D · démo : [`ile-flottante.html`](ile-flottante.html) · captures : `captures/ile-flottante-1440.webp`, `-375.png`, `-1440-reduit.png`, `-1440-sans-webgl.png`

- **Technique** : Three.js r170 : île faite de cylindres et d'un cône dont les sommets sont fusionnés (`mergeVertices`) puis décalés par un bruit déterministe, `flatShading` pour les facettes ; sapins (cônes), trois cabanes de tailles différentes (boîte + prisme, fonction `cabane(x, z, rotation, échelle)`) autour de l'étang, étang dégagé et tourné vers la caméra au départ (caméra plus haute et île à 0,76 sur téléphone pour le voir de dessus), rigole puis cascade en ruban courbé qui colle au bord de l'île et à la roche (texture d'écume qui défile, fondu d'opacité vers le bas), rochers satellites, nuages en icosaèdres. Ombres portées (`PCFSoftShadowMap`). L'île flotte, tourne lentement, se glisse au doigt ou à la souris (inertie) et s'incline vers le curseur. Ciel en dégradé CSS derrière un canvas transparent.
- **Poids** : démo 18,6 Ko (7,2 Ko gzip), plus three.module.min.js 171 Ko gzip + BufferGeometryUtils 6,9 Ko gzip (mis en cache d'une démo à l'autre).
- **Inspiré de** : Famille « mondes » de https://motionsites.ai/3d-websites (Moss Valley, Sky Cookie : paysage miniature, ciel pastel, objet qui flotte). Étude : `../etude/motionsites-3d.md`. Code, géométries et textes écrits par nous, aucun modèle ni asset repris.

## Licence

- **Three.js** r170 : MIT, https://github.com/mrdoob/three.js/blob/dev/LICENSE (chargé depuis le CDN, le fichier servi garde son en-tête de licence). Aucun autre code tiers ; géométries, textures et textes écrits par nous.

## Quand l'utiliser

Hébergement, tourisme, camping, ferme pédagogique, application « monde » : un lieu résumé en miniature. Éviter pour un métier sérieux (juridique, santé).

## Brancher dans une maquette

1. Copier le bloc « à copier » du `<style>`, le HTML de la section, l'`importmap` et le `<script type="module">`. Le bloc « Démo » ne sert qu'à la page d'exemple.
2. Remplacer les textes fictifs par ceux de `05-contenus/` et régler les variables ci-dessous sur les tokens du design system (`06-design-system/`).
3. Une seule scène 3D par page. Garder le test WebGL avant `import("three")` : le repli ne télécharge rien.
4. Vérifier avec `../verifier-elements.cjs` (normal puis `SANS_WEBGL=1`).

## Variables

| Variable | Défaut | Rôle |
|---|---|---|
| `--ile-ciel-haut` | `#bcd9f2` | ciel en haut |
| `--ile-ciel-bas` | `#f7e9dc` | ciel à l'horizon |
| `--ile-herbe` | `#86b86a` | dessus de l'île |
| `--ile-terre` | `#a5714a` | couche de terre |
| `--ile-roche` | `#9b9384` | roche et rochers satellites |
| `--ile-encre` | `#14202b` | textes |

Dans le script : `bosseler(geo, amplitude)` règle le relief des facettes, `etang` (position, rayon), les appels `cabane(…)`, la liste des sapins `[x, z, échelle]` (tenus à distance de l'étang et des cabanes), la vitesse de rotation (`t * .12`) et le flottement (`Math.sin(t * .8) * .08`).

## Prompt pour le régénérer

> Écris un hero en Three.js (r170, importmap ESM) avec une petite île flottante low-poly construite uniquement en code : dessus d'herbe, couche de terre et pointe rocheuse inversée (plus étroite que la terre et enfoncée dessous, pour qu'aucun anneau clair ne se voie à la jointure), dont les sommets sont fusionnés puis légèrement décalés par un bruit déterministe et rendus en `flatShading` ; autant de cabanes que le titre en annonce, et du type annoncé (posées au bord de l'étang ; si le texte dit « perchées », mets-les sur pilotis) (ici trois, boîte + toit en prisme, trois tailles) autour d'un étang qu'aucun arbre ne cache, des sapins en cônes, une rigole qui part de l'étang et une cascade en ruban courbé qui tombe du bord de l'île en collant à la roche et s'efface vers le bas, trois rochers satellites et quelques nuages en icosaèdres. Ombres douces, lumière d'hémisphère + soleil chaud, ciel en dégradé CSS derrière un canvas transparent. L'île flotte et tourne lentement ; on peut la tourner en la glissant (inertie) et elle s'incline légèrement vers le curseur. Texte à gauche, île à droite ; sur téléphone l'île passe au-dessus du texte, plus petite et vue de plus haut pour que l'étang reste visible, avec une marge de chaque côté. Bouton pause visible au libellé changeant (sans `aria-pressed`), arrêt hors écran et onglet caché, mouvement réduit : image fixe. Sans WebGL : affiche SVG et message discret. Densité de pixels ≤ 2. Ajoute le mode `?apercu`. Vérifie l'élément avec l'œil du métier : chaque objet montré doit être juste pour un professionnel (pièce, matière, outil, contenance).

## Accessibilité

Canvas `aria-hidden`. Bouton pause de 44 px au libellé changeant (sans `aria-pressed`, pour ne pas annoncer deux états contradictoires), focus visible ; sur téléphone il passe en haut à droite pour rester à l'écran. Les liens restent cliquables par-dessus le canvas (`pointer-events`). Sans WebGL : affiche fixe + message discret « Aperçu fixe : la 3D n'est pas disponible sur cet appareil. »

## Mouvement réduit

Image fixe, ni flottement ni rotation. Le glisser reste possible (il ne bouge que sous le doigt) mais sans inertie. Vérifié avec Playwright (`reducedMotion: "reduce"`) : deux captures à 1,2 s d'écart identiques.

## Performance

Environ 40 maillages, ombre 1024². Boucle arrêtée hors écran, onglet caché ou en pause. Densité de pixels plafonnée à 2 (`setPixelRatio(Math.min(devicePixelRatio, 2))`). Three.js r170 chargé à la demande (`import()` après le test WebGL) : rien n'est téléchargé quand le repli s'affiche.
