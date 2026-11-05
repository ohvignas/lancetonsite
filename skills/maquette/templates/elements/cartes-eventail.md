# Cartes en éventail

apercu: cartes-eventail.html?apercu

Élément · démo : [`cartes-eventail.html`](cartes-eventail.html) · captures : `captures/cartes-eventail-1440.png`, `-375.png`, `-1440-reduit.png`

- **Technique** : CSS (cartes empilées dans une même cellule de grille, position et inclinaison calculées par `calc()` depuis trois variables : `--i` rang dans la pile, `--p` place dans l'éventail (0, +1, −1, +2, −2), `--o` pile ouverte) + 25 lignes de JS qui ne font que renuméroter
- **Poids** : démo 8 499 octets (3 566 gzip) ; démo en Young Serif + Work Sans sur gris grès ; images de démo : `../exemples/artisan-sablon/images/index-*-600.webp`
- **Inspiré de** : cartes « stacked card » de la bibliothèque Jiro (https://jiro.build/components/cards/stackedcard), vues en aperçu public. Idée relevée seulement ; code et textes écrits par nous. Voir `../etude/jiro.md`.
- **Licence** : code maison Lancetonsite, libre pour les sites clients. Polices Young Serif et Work Sans sous licence SIL OFL 1.1 (Google Fonts). Photos de démo : `../exemples/artisan-sablon/images/index-*-600.webp`, photos libres Pexels de Yan Krukov (licence Pexels : usage gratuit, attribution non requise), recadrées en 4/5 pour l’exemple fictif Sablon ; en production, les photos du client. Technique observée sur jiro.build, code non repris.

## Quand l'utiliser

Montrer 3 à 6 photos d'un savoir-faire ou d'une gamme dans une section « l'atelier », « nos collections », à côté d'un texte. Remplace avantageusement un carrousel quand les photos sont fortes et peu nombreuses. Au-delà de six, préférer `galerie-infinie`.

## Brancher dans une maquette

1. Copier le bloc « à copier » du `<style>`, la `<section class="eventail" data-eventail>` et le `<script>`.
2. Une `<li><figure><img><figcaption>` par photo, au même ratio (4/5 par défaut). La légende décrit **ce qu'on voit** sur la photo (un cylindre au tour n'est pas « un bol ») : le client du métier le verra tout de suite.
3. La pile se règle sur la largeur de **sa colonne**, pas de l'écran : `.eventail` est un conteneur (`container: eventail / inline-size`), la carte fait `min(300px, 62cqi)`, l'écart `clamp(6px, (100cqi - largeur) / 16, 26px)`, et l'inclinaison passe à 5° sous 760 px de colonne et à 3° sous 600 px (requêtes `@container`). Garde-fou : **mettre `overflow-x: clip` sur la section parente**.
4. Contrôler la pile **ouverte** à 375, 768, 1024, 1280 et 1440 px : la page ne s'élargit pas, et l'éventail ne couvre pas la colonne de texte voisine. Mesuré sur la démo, pile ouverte, géométrie brute (garde-fou désactivé) :

| écran | largeur de page | cartes (gauche → droite) | texte couvert |
|---|---|---|---|
| 320 | 320 | 14 → 306 | non |
| 375 | 375 | 13 → 362 | non |
| 620 | 620 | 27 → 593 | non |
| 768 | 768 | 29 → 739 | non |
| 880 | 880 | 456 → 868 | non |
| 1024 | 1024 | 526 → 1014 | non |
| 1180 | 1180 | 612 → 1148 | non |
| 1280 | 1280 | 662 → 1198 | non |
| 1366 | 1366 | 705 → 1241 | non |
| 1440 | 1440 | 742 → 1278 | non |
5. Régler les variables ; vérifier avec `../verifier-elements.cjs`.

## Variables

| Variable | Défaut | Rôle |
|---|---|---|
| `--ev-largeur` | `min(300px, 62cqi)` | largeur d'une carte (relative à la colonne) |
| `--ev-ratio` | `4 / 5` | proportion des photos |
| `--ev-ecart` | `clamp(6px, (100cqi - largeur) / 16, 26px)` | décalage entre cartes, pile ouverte |
| `--ev-angle` | `7deg` (5° si colonne < 760 px, 3° si < 600 px) | inclinaison entre cartes, pile ouverte |

Ces trois variables sont posées sur les `li` (elles utilisent les unités `cqi` du conteneur `.eventail`).
| `--ev-ressort` | `cubic-bezier(.34,1.4,.5,1)` | rebond |

## Prompt pour le régénérer

> Écris une pile de 5 photos-cartes arrondies posées l'une sur l'autre dans la même cellule de grille, légèrement inclinées. Chaque carte reçoit son rang `--i` ; une variable `--o` vaut 0 (pile fermée) ou 1 au survol et quand un élément de la pile a le focus ; la position et la rotation de chaque carte sont calculées en `calc()` à partir de `--i` et `--o`, avec un ressort, pour ouvrir la pile en éventail centré : la carte du dessus reste au centre et droite (rotation nulle, légende lisible), les autres se répartissent de part et d'autre (places 0, +1, −1, +2, −2 dans une variable `--p`). Seule la légende de la carte du dessus est visible ; celles du dessous sont à opacité 0. Largeur, écart et inclinaison sont réglés sur la largeur de la colonne de la pile (requête de conteneur, unités `cqi`), pas sur celle de l'écran ; `overflow-x: clip` sur la section parente. Pile ouverte, à 375, 768, 1024, 1280 et 1440 px, aucune carte ne doit dépasser la largeur de l'écran, créer de défilement horizontal ni couvrir le texte voisin. Un bouton « Carte suivante » et les flèches ← → font passer la carte du dessus dessous, sans déplacer les nœuds du DOM (on renumérote seulement, pour garder les transitions). Les cartes cachées sont `inert`, une région `aria-live` annonce la légende de la carte du dessus. Mouvement réduit : pas de transition.

## Accessibilité

Seule la carte du dessus est lue (les autres sont `inert` et `aria-hidden`) ; la légende de la nouvelle carte est annoncée. Bouton de 44 px, focus visible ; flèches clavier quand la pile a le focus. Légendes blanches sur voile à 72 % (≥ 7:1) ; seule celle de la carte du dessus est affichée. Anneau de focus terre cuite `#b45309` (3,6:1 sur le fond grès, accordé à la palette). Aucun défilement horizontal ni texte couvert, pile ouverte, de 320 à 1440 px (dix largeurs mesurées, voir le tableau de « Brancher »).

## Mouvement réduit

Les cartes changent de place sans transition ; l'éventail s'ouvre d'un coup.

## Performance

Uniquement des `transform`. Cinq images de 600 px en WebP (≈ 40 Ko chacune).
