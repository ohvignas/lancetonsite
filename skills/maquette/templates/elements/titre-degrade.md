# Titre en dégradé lumineux

apercu: titre-degrade.html?apercu

Élément · démo : [`titre-degrade.html`](titre-degrade.html) · captures : `captures/titre-degrade-1440.webp`, `-375.png`, `-1440-reduit.png`

- **Technique** : CSS (`background-clip: text` sur deux couches, `drop-shadow`) + 10 lignes de JS (`IntersectionObserver` qui lance le reflet à l'apparition)
- **Poids** : démo 5,4 Ko, 5427 octets (`wc -c`) ; environ 2,5 Ko gzip (2467 octets avec `gzip -9 -c | wc -c`, à quelques octets près selon la version de gzip)
- **Inspiré de** : E2 (mot en dégradé pêche → rose → lilas, accueil, /backgrounds, /mcp) dans `../motionsites-etude.md`. Code et textes écrits par nous.

## Licence

Code original Lance ton site, sans dépendance. Police de la démo : Inter Tight (Google Fonts), SIL Open Font License 1.1, chargée par la démo seulement ; elle ne fait pas partie de la recette.

## Quand l'utiliser

Un seul mot ou groupe de mots par page, celui qui porte la promesse. Fonds très sombres (version halo) ou clairs (version dense, sans halo). Pas sur un paragraphe.

## Brancher dans une maquette

1. Copier le bloc « à copier » du `<style>`, le HTML de l'élément et son `<script>` s'il en a un. Le bloc « Démo » ne sert qu'à la page d'exemple.
2. Remplacer les textes et images fictifs par ceux de `05-contenus/` et `07-medias/`.
3. Régler les variables ci-dessous sur les tokens du design system (`06-design-system/`).
4. Vérifier avec `../verifier-elements.cjs` (0 erreur, captures 1440 et 375, mouvement réduit).

## Variables

| Variable | Défaut | Rôle |
|---|---|---|
| `--degrade-a` | `#ffb38a` | première couleur |
| `--degrade-b` | `#f7a8c8` | deuxième couleur, aussi celle du halo |
| `--degrade-c` | `#c9b6ff` | troisième couleur |
| `--degrade-halo` | `.45` | force du halo, 0 = aucun |
| `--degrade-reflet` | `rgb(255 255 255 / .85)` | couleur de la bande de reflet |

Deux couches de fond : en dessous, le dégradé à trois couleurs à 100 % de large, toujours entier (le lilas se voit au repos) ; au-dessus, une bande de reflet de 250 % de large, hors du mot au repos, que l'animation fait traverser une fois. Le reflet reste en pause (`animation-play-state: paused`) tant que le mot n'est pas à l'écran : le script pose `.vu` quand 60 % du mot est visible. Sans JS, le mot reste dans son état de repos.

La variante `.clair .degrade` fonce les trois couleurs (`#c2461b`, `#c42f7a`, `#6b4ce0`) et coupe le halo pour tenir le contraste sur fond clair.

## Prompt pour le régénérer

> Écris une classe CSS `.degrade` à poser sur un `<span>` dans un titre : texte transparent rempli par un dégradé à trois couleurs en variables (`background-clip: text`), un halo doux de la même teinte via `filter: drop-shadow`, et un reflet blanc qui traverse le mot une seule fois quand il entre à l'écran. Le reflet est une deuxième couche de fond, étroite, au-dessus du dégradé : seule sa `background-position` est animée, le dégradé reste entier au repos (les trois couleurs visibles). L'animation démarre en pause et un `IntersectionObserver` la lance à l'apparition. `box-decoration-break: clone` pour les retours à la ligne. Variante claire plus dense sans halo. Animation coupée en mouvement réduit, texte plein en couleurs forcées.

## Accessibilité

Le contraste se mesure couleur par couleur, sur la moins contrastée. Fond sombre `#0b0b0d` : pêche 11,3:1, rose 10,7:1, lilas 10,9:1. Fond clair `#fbf8f4` : orange `#c2461b` 4,7:1 (la moins contrastée), rose `#c42f7a` 4,9:1, lilas `#6b4ce0` 5,3:1. Tout passe 4,5:1. Pendant le passage du reflet (1,6 s, courbe douce `cubic-bezier(.45, .05, .25, 1)` : la lumière glisse sur le mot au lieu de le traverser d'un éclair), la bande blanche baisse le contraste localement ; c'est bref et le mot reste lisible. En couleurs forcées, le mot redevient `CanvasText`. Titres équilibrés (`text-wrap: balance`) et espace insécable dans le groupe en dégradé (`ce&nbsp;soir`) pour ne pas laisser un mot seul sur sa ligne au téléphone.

## Mouvement réduit

Le reflet ne passe pas : le mot s'affiche directement avec ses trois couleurs.

## Performance

Aucun coût notable. Exception « gradient-text » déclarée dans `.impeccable/config.json` pour ce fichier seulement : c'est l'élément catalogué. Aucune dépendance externe hors polices de la démo.
