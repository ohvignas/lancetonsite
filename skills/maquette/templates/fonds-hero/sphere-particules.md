# Sphère de particules

apercu: sphere-particules.html?apercu

Fond de hero · démo : [`sphere-particules.html`](sphere-particules.html) · captures : `captures/sphere-particules-1440.webp`, `-375.png`, `-1440-reduit.png`

- **Technique** : Canvas 2D, 3D faite main (spirale de Fibonacci, rotation, perspective, éclairage par produit scalaire avec une lumière fixe en haut à gauche : opacité `0,25 + 0,75 × max(0, n·l)`, taille de 1 px au fond à 2,4 px devant ; halo `rgb(120 160 255 / .08)` au bord de la silhouette)
- **Poids** : démo 8,9 Ko (3,9 Ko gzip ; 8871 et 3863 octets)
- **Inspiré de** : F5 de `../motionsites-etude.md` (« Particle Brain », « Lumora », « Particle Self »). Code et textes écrits par nous.
- **Licence** : code original Lancetonsite, libre d'usage, de modification et de revente sur les sites clients, sans attribution ; aucune bibliothèque tierce. Polices de la démo (Inter Tight) : Google Fonts, licence SIL Open Font License 1.1, libres pour un usage commercial.

## Quand l'utiliser

IA, données, recherche, réseau, santé. Mise en page en deux colonnes sur ordinateur (texte à gauche, sphère à droite) ; sur téléphone, la sphère est dessinée dans une bande en haut de l'écran (hauteur `min(78vw, 42svh)`) et le texte commence sous elle : elle ne passe jamais derrière le titre. Pour une forme précise (main, cerveau, logo), il faut des points tirés d'un modèle : passer à Three.js.

## Brancher dans une maquette

1. Copier la `<section class="hero">` (canvas ou calques + bouton pause), le bloc `<style>` et le `<script>` de la démo.
2. Remplacer les textes fictifs par ceux de `05-contenus/`.
3. Régler les variables ci-dessous sur le thème de la maquette (`07-maquette/prototype/theme.css`).
4. Un seul fond animé par page, et seulement dans le hero ou l'appel final.

## Variables

| Variable | Défaut | Rôle |
|---|---|---|
| `--sphere-fond` | `#04070d` | fond |
| `--sphere-point` | `#9cc8ff` | points |
| `--sphere-coeur` | `#ffffff` | points les plus proches |
| `--sphere-nombre` | `2000` | nombre de points (×0,6 sous 768 px) |

Centre et rayon (`cx`, `cy`, `R` dans `dessiner`), respiration (`.06`), vitesse de rotation (`t * .18`), force du curseur (`.8`, `.5`).

## Prompt pour le régénérer

> Écris un fond de hero en canvas 2D, sans bibliothèque 3D : 2 000 points répartis régulièrement sur une sphère (spirale de Fibonacci). Chaque image : rotation autour de Y (lente) et de X (suit la souris, lissée), projection en perspective, taille de 1 px au fond à 2,4 px devant, les plus proches et les mieux éclairés en blanc. Éclaire chaque point par le produit scalaire entre sa normale et une lumière fixe venue d'en haut à gauche : opacité `0,25 + 0,75 × max(0, n·l)` (multipliée par `0,25 + 0,75 × profondeur`), pour que le côté opposé tombe vraiment dans le noir. Sous les points, un halo radial `rgb(120 160 255 / .08)` centré sur le bord de la silhouette (de 0,82 R à 1,22 R). La surface respire (rayon modulé par une sinusoïde propre à chaque point, phases tirées par un générateur à graine fixe). Sphère à droite sur ordinateur ; sur téléphone, sphère dans une bande en haut de l'écran (`min(78vw, 42svh)`) et texte poussé sous elle par un `padding-top` de la même hauteur. Ombre de texte sur le texte seulement, jamais sur le bouton. Variables CSS pour les couleurs et le nombre. Pause, arrêt hors écran, image fixe en mouvement réduit.

## Accessibilité

Canvas `aria-hidden`. Sur téléphone, la sphère reste au-dessus du texte ; une ombre douce n'est posée que sur le surtitre, le titre et le paragraphe (jamais sur le bouton blanc). Contraste mesuré au pire cas à 375 px : titre 16:1, surtitre 10,2:1, paragraphe 12,5:1.

## Mouvement réduit

Sphère figée de trois quarts, toujours la même : les graines de respiration sont tirées par un générateur à graine fixe, pas par `Math.random()`. Vérifié avec Playwright (`reducedMotion: "reduce"`) : deux captures à 1,2 s d'écart sont identiques.

## Performance

Le dessin ne tourne que si le hero est à l'écran, l'onglet visible et la lecture voulue (`IntersectionObserver`, `visibilitychange`). Densité de pixels plafonnée. Aucune dépendance externe hors polices de la démo.
