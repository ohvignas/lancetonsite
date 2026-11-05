# Nav en pilule de verre

apercu: nav-pilule.html?apercu

Élément · démo : [`nav-pilule.html`](nav-pilule.html) · captures : `captures/nav-pilule-1440.webp`, `-375.png`, `-1440-reduit.png`

- **Technique** : CSS (verre) + JS (`IntersectionObserver` sur une sentinelle, `<dialog>` pour le menu mobile)
- **Poids** : démo 8,9 Ko, 8866 octets (3,3 Ko gzip, 3270 octets ; mesuré avec `wc -c` et `gzip -9`)
- **Inspiré de** : E4 (barre flottante arrondie des leçons et cartes d'aperçu) dans `../motionsites-etude.md`. Code et textes écrits par nous.

## Licence

Code original Lance ton site, sans dépendance. Police de la démo : Inter Tight (Google Fonts), SIL Open Font License 1.1, chargée par la démo seulement ; elle ne fait pas partie de la recette. Photo : `../exemples/festival-tole/images/halle-scene*.webp`, image de l'exemple festival du plugin, à remplacer par une photo du client.

## Quand l'utiliser

Sites vitrines et pages d'atterrissage dont le hero est une image ou un fond animé. La barre flotte au-dessus, se resserre après le hero, et devient un menu plein écran sur téléphone.

## Brancher dans une maquette

1. Copier le bloc « à copier » du `<style>`, le HTML de l'élément et son `<script>` s'il en a un. Le bloc « Démo » ne sert qu'à la page d'exemple.
2. Remplacer les textes et images fictifs par ceux de `05-contenus/` et `06-medias/`.
3. Régler les variables ci-dessous sur le thème de la maquette (`07-maquette/prototype/theme.css`).
4. Vérifier avec `../verifier-elements.cjs` (0 erreur, captures 1440 et 375, mouvement réduit).

## Variables

| Variable | Défaut | Rôle |
|---|---|---|
| `--nav-largeur` | `min(72rem, 100% − 2rem)` | largeur au chargement |
| `--nav-largeur-serree` | `min(46rem, 100% − 2rem)` | largeur une fois resserrée |
| `--nav-encre` | `#fff` | couleur du texte |
| `--nav-fond` | `rgb(255 255 255 / .08)` | verre au chargement, sur le hero |
| `--nav-fond-serree` | `rgb(18 16 22 / .55)` | verre plus sombre une fois resserrée |

La nav a son propre verre (flou 16 px, saturation 1,5), indépendant de `.verre`. Le script crée une sentinelle invisible de 80 px en haut de la page : quand elle sort de l'écran, la barre reçoit `.serree`. Pour ne resserrer qu'après le hero, placer la sentinelle en bas du hero.

Hero de la démo : `halle-scene-900.webp` sous 900 px, `halle-scene.webp` (1600 px) au-delà. Pour un site client, une photo de lieu d'au moins 2400 px de large en 16:10.

## Prompt pour le régénérer

> Écris une barre de navigation fixe en pilule de verre dépoli, centrée en haut, qui se resserre et fonce dès qu'on quitte le haut de page (classe posée par un `IntersectionObserver` sur une sentinelle de 80 px en haut du body, à déplacer en bas du hero si on veut resserrer plus tard ; pas d'écoute du défilement). Sur téléphone, un bouton « Menu » (`aria-controls`, `aria-expanded` mis à jour à l'ouverture et à la fermeture) ouvre un `<dialog>` plein écran dont les liens entrent en cascade ; Échap ferme, le focus revient au bouton. Largeurs et fonds en variables, transitions coupées en mouvement réduit, contour en couleurs forcées.

## Accessibilité

`<nav aria-label>`, bouton menu avec `aria-haspopup="dialog"`, `aria-controls="menu-principal"` et `aria-expanded` (passé à `true` à l'ouverture, à `false` à l'événement `close`), `<dialog>` modal natif (piège du focus, Échap), retour du focus au bouton. Anneau de focus blanc de 3 px. En couleurs forcées, barre et menu gardent un contour. Cibles ≥ 44 px. Liens blancs sur verre foncé ≥ 4,5:1.

## Mouvement réduit

Ni resserrement animé ni cascade : changement d'état immédiat.

## Performance

Pas d'écoute `scroll`. Le `backdrop-filter` ne couvre que la barre. Aucune dépendance externe hors polices de la démo.
