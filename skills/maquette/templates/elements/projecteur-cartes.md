# Cartes au projecteur

apercu: projecteur-cartes.html?apercu

Élément · démo : [`projecteur-cartes.html`](projecteur-cartes.html) · captures : `captures/projecteur-cartes-1440.webp`, `-375.png`, `-1440-reduit.png`

- **Technique** : CSS (dégradé radial sur `--x/--y`, liseré masqué) + une vingtaine de lignes de JS (souris, et `IntersectionObserver` au toucher)
- **Poids** : démo 6,8 Ko (2,9 Ko gzip)
- **Inspiré de** : E11 (cartes sombres « Halden », « Scanner Comparison ») dans `../motionsites-etude.md`. Code et textes écrits par nous.
- **Licence** : code original Lancetonsite. Police Inter Tight : SIL Open Font License 1.1. Aucune image.

## Quand l'utiliser

Grilles de 3 à 6 cartes sur fond sombre : offres, services, étapes. La lumière qui passe d'une carte à l'autre invite à parcourir la grille.

## Brancher dans une maquette

1. Copier le bloc « à copier » du `<style>`, le HTML de l'élément et son `<script>` s'il en a un. Le bloc « Démo » ne sert qu'à la page d'exemple.
2. Remplacer les textes et images fictifs par ceux de `05-contenus/` et `06-medias/`.
3. Régler les variables ci-dessous sur le thème de la maquette (`07-maquette/prototype/theme.css`).
4. Vérifier avec `../verifier-elements.cjs` (0 erreur, captures 1440 et 375, mouvement réduit).

## Variables

| Variable | Défaut | Rôle |
|---|---|---|
| `--proj-couleur` | `244 194 122` | teinte de la lampe (canaux RGB) |
| `--proj-taille` | `340px` | diamètre du halo |

Une seule écoute `pointermove` sur la grille, regroupée par `requestAnimationFrame` ; chaque carte reçoit des coordonnées relatives à elle, donc le halo déborde naturellement sur les voisines. Liseré à pleine teinte au centre du halo (opacité 1, le reste du bord à .12), fond éclairé à .16 : le geste se remarque sans crier. Sur écran tactile (`hover: none`), un `IntersectionObserver` (seuils 0, .25, .5, .75, 1) garde la part visible de chaque carte dans une `Map` et pose la lampe en haut au centre de celle qui a le plus grand `intersectionRatio` (à égalité, la plus proche du centre de l’écran).

## Prompt pour le régénérer

> Écris une grille de cartes sombres dont le liseré et le fond s'éclairent sous le pointeur : un seul écouteur sur la grille pose `--x` et `--y` relatifs à chaque carte, un pseudo-élément dessine un dégradé radial limité au bord par un double masque, un autre éclaire légèrement le fond (opacité .16). Le titre de chaque carte est un lien étiré (`a::after { position: absolute; inset: 0 }`) : toute la carte est cliquable et prend le contour de focus (`:has(a:focus-visible)`). Au toucher, un `IntersectionObserver` à plusieurs seuils allume le haut de la carte de plus grand `intersectionRatio` (à égalité, la plus proche du centre). La carte qui a le focus garde un liseré plein. Teinte et taille en variables ; apostrophes typographiques et espaces insécables dans les textes.

## Accessibilité

Carte entière cliquable par un lien étiré, contour de focus visible sur la carte (`:has(a:focus-visible)`). Texte #cfc6b9 sur #1b1916 ≈ 10:1. Liseré visible en couleurs forcées.

## Mouvement réduit

Rien n’est animé : la lumière suit la main sans transition ; au toucher, elle change de carte au défilement, sans transition non plus.

## Performance

Aucune boucle continue ; une écriture de variables par image au plus pendant le survol. Aucune dépendance externe hors polices de la démo.
