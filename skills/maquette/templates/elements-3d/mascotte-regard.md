# Mascotte qui suit du regard

apercu: mascotte-regard.html?apercu

Élément 3D · démo : [`mascotte-regard.html`](mascotte-regard.html) · captures : `captures/mascotte-regard-1440.webp`, `-375.png`, `-1440-reduit.png`, `-1440-sans-webgl.png`

- **Technique** : Three.js r170 : chouette hulotte en primitives (sphères déformées, tête ronde sans aigrettes : les aigrettes, c'est le hibou), disques faciaux ronds, cerclés d'un liseré brun foncé, peints (canvas) sur deux calottes de sphère concentriques à la tête : ils épousent sa courbe et ne peuvent jamais dépasser de la silhouette quand elle tourne la tête (le masque en cœur, c'est l'effraie ; la hulotte a un disque rond cerclé de brun), matière « peluche » `MeshPhysicalMaterial` avec `sheen`, plastron peint sur canvas, yeux brillants (`clearcoat`), paupières en demi-sphères qui pivotent pour cligner (le reflet de la pupille est masqué dès que la paupière se ferme), pile de livres en boîtes. La tête et les pupilles visent le curseur, ou l'élément qui reçoit le focus clavier ; respiration et clignement toutes les 4,3 s ; sans curseur, le regard flâne.
- **Poids** : démo 18,5 Ko (6,8 Ko gzip), plus three.module.min.js 171 Ko gzip + RoomEnvironment 1,2 Ko gzip (mis en cache d'une démo à l'autre).
- **Inspiré de** : Famille « personnages » de https://motionsites.ai/3d-websites (Lost Little Explorer : renard sur une page 404 ; Agehana et la leçon « cursor-tracking » : personnage qui suit la souris). Étude : `../etude/motionsites-3d.md`. Code, géométries et textes écrits par nous, aucun modèle ni asset repris.

## Licence

- **Three.js** r170 : MIT, https://github.com/mrdoob/three.js/blob/dev/LICENSE (chargé depuis le CDN, le fichier servi garde son en-tête de licence). Aucun autre code tiers ; géométries, textures et textes écrits par nous.

## Quand l'utiliser

Page 404, page « merci », écran vide d'une appli, site jeunesse ou de loisirs : un personnage qui donne de la chaleur. Une seule mascotte par site, jamais sur une page de vente sérieuse.

## Brancher dans une maquette

1. Copier le bloc « à copier » du `<style>`, le HTML de la section, l'`importmap` et le `<script type="module">`. Le bloc « Démo » ne sert qu'à la page d'exemple.
2. Remplacer les textes fictifs par ceux de `05-contenus/` et régler les variables ci-dessous sur les tokens du design system (`06-design-system/`).
3. Une seule scène 3D par page. Garder le test WebGL avant `import("three")` : le repli ne télécharge rien.
4. Vérifier avec `../verifier-elements.cjs` (normal puis `SANS_WEBGL=1`).

## Variables

| Variable | Défaut | Rôle |
|---|---|---|
| `--masc-fond` | `#dde7da` | fond sauge |
| `--masc-plume` | `#9a6a45` | plumage |
| `--masc-ventre` | `#ecd8b8` | ventre ; le disque facial mélange plumage et ventre (62 %), liseré = plumage × 0,55 |
| `--masc-bec` | `#e8932f` | bec et pattes |
| `--masc-encre` | `#22180f` | textes |

Dans le script : amplitude du regard (`gx * .55`, `gy * .3` dans `poser()`), période du clignement (`t % 4.3`), délai avant flânerie (`2500` ms), couleurs des livres.

## Prompt pour le régénérer

> Écris une page 404 avec une mascotte 3D en Three.js (r170, importmap ESM) faite seulement de primitives : une chouette hulotte ronde (corps et tête en sphères déformées, tête ronde sans aigrettes, disque facial rond cerclé d'un liseré brun foncé, comme une vraie hulotte (le cœur, c'est l'effraie), peint sur une calotte concentrique à la tête pour qu'il ne dépasse jamais de la silhouette, ailes, pattes), matière peluche (`MeshPhysicalMaterial` avec sheen), plastron à chevrons peint sur canvas, grands yeux brillants avec pupille et reflet, paupières en demi-sphères qui pivotent pour cligner ; cache le reflet quand la paupière est fermée. Elle est posée sur une pile de trois livres. La tête et les pupilles suivent le curseur ; au clavier, elle regarde le lien qui a le focus ; sans curseur depuis 2,5 s, son regard flâne. Respiration légère et clignement régulier, bouton pause visible au libellé changeant (sans `aria-pressed`), arrêt hors écran et onglet caché. Mouvement réduit : image fixe, regard droit devant. Sans WebGL : affiche SVG de la chouette et message discret. Texte à gauche, chouette à droite ; au-dessus du texte sur téléphone. Densité de pixels ≤ 2. Ajoute le mode `?apercu`. Vérifie l'élément avec l'œil du métier : chaque objet montré doit être juste pour un professionnel (pièce, matière, outil, contenance).

## Accessibilité

Canvas `aria-hidden` ; la page 404 reste complète sans la chouette (titre, deux boutons, trois liens de 44 px). Le regard suit aussi le focus clavier (`focusin`). Bouton pause au libellé changeant (« Mettre en pause » / « Relancer »), sans `aria-pressed` pour ne pas annoncer deux états contradictoires ; sur téléphone, rond de 44 px avec libellé masqué visuellement mais lu. Sans WebGL : affiche fixe + message discret « Aperçu fixe : la 3D n'est pas disponible sur cet appareil. »

## Mouvement réduit

Aucune respiration ni clignement, regard fixe droit devant, même au survol. Vérifié avec Playwright (`reducedMotion: "reduce"`) : deux captures à 1,2 s d'écart identiques.

## Performance

Une vingtaine de maillages, pas d'ombre portée calculée (texture radiale). Boucle arrêtée hors écran, onglet caché ou en pause ; au repos, une image n'est recalculée qu'au mouvement du curseur. Densité de pixels plafonnée à 2 (`setPixelRatio(Math.min(devicePixelRatio, 2))`). Three.js r170 chargé à la demande (`import()` après le test WebGL) : rien n'est téléchargé quand le repli s'affiche.
