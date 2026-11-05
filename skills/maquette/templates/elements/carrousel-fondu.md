# Carrousel à bords fondus

apercu: carrousel-fondu.html?apercu

Élément · démo : [`carrousel-fondu.html`](carrousel-fondu.html) · captures : `captures/carrousel-fondu-1440.webp`, `-375.png`, `-1440-reduit.png`

- **Technique** : CSS (`@keyframes` sur `transform`, `mask-image`) + JS (duplication de la liste, pause)
- **Poids** : démo 7,7 Ko, 7672 octets (3,1 Ko gzip, 3117 octets ; mesuré avec `wc -c` et `gzip -9`)
- **Inspiré de** : E5 (bande de visuels en tête de /backgrounds) dans `../motionsites-etude.md`. Code et textes écrits par nous.

## Licence

Code original Lance ton site, sans dépendance. Police de la démo : Inter Tight (Google Fonts), SIL Open Font License 1.1, chargée par la démo seulement ; elle ne fait pas partie de la recette. Photos : images des exemples du plugin (`../exemples/*/images/`), à remplacer par celles du client.

## Quand l'utiliser

Montrer beaucoup de réalisations, de logos ou de produits sans prendre de place : sous un hero, avant une galerie. Pas pour un contenu qu'il faut lire (prix, étapes).

## Brancher dans une maquette

1. Copier le bloc « à copier » du `<style>`, le HTML de l'élément et son `<script>` s'il en a un. Le bloc « Démo » ne sert qu'à la page d'exemple.
2. Remplacer les textes et images fictifs par ceux de `05-contenus/` et `07-medias/`.
3. Régler les variables ci-dessous sur les tokens du design system (`06-design-system/`).
4. Vérifier avec `../verifier-elements.cjs` (0 erreur, captures 1440 et 375, mouvement réduit).

## Variables

| Variable | Défaut | Rôle |
|---|---|---|
| `--carrousel-duree` | `50s` | durée d'un tour ; plus long = plus calme |
| `--carrousel-ecart` | `14px` | écart entre visuels |
| `--carrousel-fondu` | `12%` | largeur du fondu sur chaque bord |
| `--carrousel-hauteur` | `clamp(220px, 34vw, 380px)` | hauteur de la bande |

La liste est dupliquée une fois par le script (`aria-hidden` sur la copie) ; l'animation va de 0 à −50 % moins un demi-écart, ce qui rend la boucle sans raccord. En mode aperçu, la démo force la hauteur à `clamp(240px, 50vh, 540px)`.

## Prompt pour le régénérer

> Écris une bande d'images qui défile seule à vitesse constante (animation CSS `translateX` sur une piste dont le contenu est doublé par JS), avec les deux bords qui s'effacent par `mask-image`. Pause au survol, au focus, hors écran et via un bouton visible « Mettre en pause le défilement ». En mouvement réduit : pas de défilement, la bande devient un défilement horizontal manuel avec `scroll-snap`, chaque photo limitée à 82vw pour qu'on voie le bord de la suivante, et la bande reçoit `tabindex="0"` pour se faire défiler aux flèches. Durée, écart, fondu et hauteur en variables.

## Accessibilité

Bouton pause visible (WCAG 2.2.2, contenu qui bouge plus de 5 s). La copie de la liste est `aria-hidden` et ses liens sont hors tabulation. Chaque visuel garde un `alt` ou une légende.

## Mouvement réduit

Aucun défilement automatique : la bande se fait défiler à la main ou au clavier, avec accroche (`scroll-snap`). Le script lui pose `tabindex="0"` (Safari ne rend pas focusables les zones qui défilent) et un anneau de focus blanc. Chaque photo fait au plus 82vw : sur téléphone, le bord de la suivante dépasse et montre qu'on peut glisser.

## Performance

Seul `transform` est animé (composité par le GPU). L'animation est mise en pause hors écran. Aucune dépendance externe hors polices de la démo.
