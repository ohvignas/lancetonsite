# Voiles de verre

apercu: voiles-verre.html?apercu

Élément 3D (fond de hero) · démo : [`voiles-verre.html`](voiles-verre.html) · captures : `captures/voiles-verre-1440.webp`, `-375.png`, `-1440-reduit.png`, `-1440-sans-webgl.png`, `-375-sans-webgl.png`

- **Technique** : Three.js 0.170 (importmap ESM jsdelivr) : trois plans longs (16 × 1,05, 240 × 12 segments) courbés et tordus dans le shader de sommets via `onBeforeCompile` (normales recalculées par différences finies), `MeshPhysicalMaterial` à transmission totale (verre blanc teinté dans la masse : `color` blanc, `transmission` 1, `roughness` .06, `thickness` .8, `attenuationColor` = couleur du ruban sur 2,5 unités, `sheen` .4 de la même couleur, vernis .4, `envMapIntensity` .7, sans émission ; exposition .95) qui réfracte une toile de fond en `CanvasTexture` à motif net (rayures fines obliques à 6 %, trois bandes de couleur à 7 % seulement, calmées côté texte : le motif se devine à travers le verre, il ne doit pas voler la vedette) ; reflets `RoomEnvironment` ; repli CSS en bandes floues
- **Poids** : démo 13 524 octets (5 582 gzip) + Three.js (≈ 170 Ko gzip, cache CDN partagé) + `RoomEnvironment.js`
- **Inspiré de** : la collection « Gradients » de https://sceneai.art/gradients (« 3D Glassy Gradient Backgrounds » : rubans de verre coloré et brillant, rendus 3D figés ou en vidéo). Voir `../etude/sceneai.md`. Ici en temps réel, code écrit par nous. Différent de `../fonds-hero/ruban-soie.html` (shader 2D de fils fins) : vrais volumes, vraie réfraction.

## Licence

- **Three.js** (et `RoomEnvironment.js`, dans `examples/jsm`) : MIT — https://github.com/mrdoob/three.js/blob/dev/LICENSE. Chargé depuis le CDN, non modifié.
- **Notre code** (shader de torsion, placement) et les textes : originaux, libres d'usage dans le plugin. Police Syne : SIL Open Font License 1.1.

## Quand l'utiliser

Galerie, verrier, parfumerie, studio de design, label de musique, événement culturel : un fond spectaculaire sur fond sombre, avec le texte à gauche et les rubans à droite (centrés sur téléphone).

## Brancher dans une maquette

1. Copier la `<section class="voiles">` (repli + contenu + bouton pause), le bloc CSS, l'importmap et le module.
2. Couleurs des rubans et du fond : variables ci-dessous ; elles nourrissent aussi la toile réfractée.
3. Formes : `forme()` dans le shader (torsion `p.x * .28`, vague `* .9`, profondeur `* 1.2`) ; position et inclinaison de chaque ruban dans `ruban(couleur, phase, decalY, inclinaison)`.

## Variables

| Variable | Défaut | Rôle |
|---|---|---|
| `--voile-fond-a` | `#1b0f2e` | fond, coin sombre |
| `--voile-fond-b` | `#3a1d5c` | lueur du fond |
| `--voile-1` | `#ff7a3d` | ruban orange |
| `--voile-2` | `#c86bff` | ruban violet |
| `--voile-3` | `#36d6c3` | ruban turquoise |

## Prompt pour le régénérer

> Écris en Three.js 0.170 (importmap ESM jsdelivr) un fond de hero de rubans de verre. Derrière, un plan qui remplit exactement le champ de la caméra, texturé par une `CanvasTexture` à motif net (dégradé violet sombre, rayures blanches fines obliques tous les 18 px à 6 %, trois bandes de la couleur des rubans à 7 %, motif calmé du côté du texte) : la réfraction ne se lit que sur un motif net, jamais sur des taches floues. Devant, trois `PlaneGeometry` longs et étroits très subdivisés, chacun avec un `MeshPhysicalMaterial` à transmission totale, teinté par l'atténuation et non par la couleur de surface (`color` blanc, `roughness` .06, `ior` 1,45, `thickness` .8, `attenuationColor` de sa couleur sur une distance de 2,5, `sheen` .4 de sa couleur, irisation, vernis .4, `envMapIntensity` .7, double face, sans émission ; `toneMappingExposure` .95 contre les reflets brûlés). Avec `onBeforeCompile`, remplace la position par une fonction `forme(p)` qui tord le ruban le long de sa longueur et le fait onduler en hauteur et en profondeur selon le temps, et recalcule la normale par différences finies. Reflets avec `RoomEnvironment`. Rubans à droite du texte sur grand écran, en bande sous le texte sur mobile, zone libre mesurée sur le texte réel et recalculée après `document.fonts.ready`. Densité de pixels plafonnée à 1,5 (la transmission coûte une passe). Repli CSS de trois bandes floues en dégradé, bouton pause, rendu stoppé hors écran et onglet caché, image figée en mouvement réduit.

## Accessibilité

Canvas en `aria-hidden`. Texte blanc avec ombre portée sombre sur un fond très sombre (plus de 12:1 hors des rubans). Bouton pause de 44 px avec libellé.

## Mouvement réduit

Une seule image rendue, rubans figés. Vérifié avec Playwright : deux captures identiques. Sans WebGL : 0 erreur, bandes CSS visibles.

## Performance

Le matériau à transmission rend la scène opaque une seconde fois dans une texture : c'est le poste le plus cher. Densité plafonnée à 1,5, ≈ 17 000 triangles en tout, boucle stoppée hors écran, onglet caché et en pause. Sur téléphone faible, passer à deux rubans.
