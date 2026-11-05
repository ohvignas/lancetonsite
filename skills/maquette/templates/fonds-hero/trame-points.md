# Trame de points

apercu: trame-points.html?apercu

Fond de hero · démo : [`trame-points.html`](trame-points.html) · captures : `captures/trame-points-1440.webp`, `-375.png`, `-1440-reduit.png`

- **Technique** : Canvas 2D (quelques milliers de cercles par image)
- **Poids** : démo 7,4 Ko (3,2 Ko gzip ; 7383 et 3244 octets)
- **Inspiré de** : F4 de `../motionsites-etude.md` (« Halftone FAQ », /?prompt=solace-faq). Code et textes écrits par nous.
- **Licence** : code original Lancetonsite, libre d'usage, de modification et de revente sur les sites clients, sans attribution ; aucune bibliothèque tierce. Polices de la démo (Inter Tight) : Google Fonts, licence SIL Open Font License 1.1, libres pour un usage commercial.

## Quand l'utiliser

Imprimerie, studio graphique, média, festival, tout métier « imprimé ». Aussi en fond de section (FAQ, appel final) : voir `../elements/faq-verre.html`. La trame monte du bas et grossit sous le curseur.

## Brancher dans une maquette

1. Copier la `<section class="hero">` (canvas ou calques + bouton pause), le bloc `<style>` et le `<script>` de la démo.
2. Remplacer les textes fictifs par ceux de `05-contenus/`.
3. Régler les variables ci-dessous sur les tokens du design system (`06-design-system/`).
4. Un seul fond animé par page, et seulement dans le hero ou l'appel final.

## Variables

| Variable | Défaut | Rôle |
|---|---|---|
| `--trame-fond` | `#140c06` | fond |
| `--trame-point` | `#f2a541` | couleur des points |
| `--trame-pas` | `18` | écart entre points en px (16 = plus fin, plus lourd) |
| `--trame-rayon` | `6.5` | rayon maximal |

Les deux ondes (`x * .012`, `(x + y) * .008`), la bosse du curseur (`/ 14000` = rayon d'influence), la montée (`.35 + .65 * (y / H)`).

## Prompt pour le régénérer

> Écris un fond de hero en canvas 2D : une trame de points en quinconce, façon impression en demi-teinte, dont le rayon de chaque point dépend de deux ondes sinusoïdales croisées qui avancent lentement, et grossit sous le curseur (bosse gaussienne, position lissée). Les points s'éteignent vers le haut de l'écran. Tous les cercles dans un seul chemin, un seul `fill` par image. Couleur, pas et rayon en variables CSS. Voile radial sombre derrière le texte (cœur à 42 % × 38 %, pour que la bosse du curseur reste visible autour du bouton) ; sur téléphone, un voile en bandeau de 22 à 64 % de la hauteur, la trame restant visible en bas. Pause, arrêt hors écran, image fixe en mouvement réduit.

## Accessibilité

Voile central opaque (0,92 au centre ; sur téléphone, bandeau à 0,9 de 22 à 64 % de la hauteur, la trame respire dans le dernier tiers) : le texte n'est jamais lu sur les points. Contraste mesuré au pire cas (fond capturé sous le texte, centile 95) à 375 px : titre 16,6:1, surtitre 12,6:1, paragraphe 12,4:1. Bouton d'action ambre sur fond noir (contraste 9:1).

## Mouvement réduit

Image fixe, la bosse du curseur ne suit plus la souris. Vérifié avec Playwright (`reducedMotion: "reduce"`) : deux captures à 1,2 s d'écart sont identiques.

## Performance

Le dessin ne tourne que si le hero est à l'écran, l'onglet visible et la lecture voulue (`IntersectionObserver`, `visibilitychange`). Densité de pixels plafonnée. Aucune dépendance externe hors polices de la démo.
