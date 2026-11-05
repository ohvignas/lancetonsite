# Galerie infinie

apercu: galerie-infinie.html?apercu

Élément · démo : [`galerie-infinie.html`](galerie-infinie.html) · captures : `captures/galerie-infinie-1440.webp`, `-375.png`, `-1440-reduit.png`

- **Technique** : JS (tuiles recyclées en modulo, glisser avec inertie, dérive lente) + CSS
- **Poids** : démo 10,6 Ko, 10562 octets (`wc -c`) ; environ 4,2 Ko gzip (4236 octets avec `gzip -9 -c | wc -c`, à quelques octets près selon la version de gzip)
- **Inspiré de** : E7 (« Infinite Gallery », accueil) dans `../motionsites-etude.md`. Code et textes écrits par nous.

## Licence

Code original Lance ton site, sans dépendance. Police de la démo : Inter Tight (Google Fonts), SIL Open Font License 1.1, chargée par la démo seulement ; elle ne fait pas partie de la recette. Photos : `../exemples/commerce-odette/images/`, images de l'exemple boulangerie du plugin, à remplacer par celles du client.

## Quand l'utiliser

Grandes collections visuelles : photographe, boulangerie, catalogue d'objets, festival. À poser en section pleine largeur, jamais en hero (le texte n'y a pas sa place).

## Brancher dans une maquette

1. Copier le bloc « à copier » du `<style>`, le HTML de l'élément et son `<script>` s'il en a un. Le bloc « Démo » ne sert qu'à la page d'exemple.
2. Remplacer les textes et images fictifs par ceux de `05-contenus/` et `07-medias/`.
3. Régler les variables ci-dessous sur les tokens du design system (`06-design-system/`).
4. Vérifier avec `../verifier-elements.cjs` (0 erreur, captures 1440 et 375, mouvement réduit).

## Variables

| Variable | Défaut | Rôle |
|---|---|---|
| `--tuile-l` | `clamp(150px, 22vw, 300px)` | largeur d'une tuile (ratio 4:5) |
| `--tuile-ecart` | `clamp(10px, 1.4vw, 20px)` | écart entre tuiles |

Liste des images dans `data-images` (séparées par des espaces). La démo prend 18 photos d'un seul métier (l'exemple boulangerie) : un mur de sept métiers différents ne se lit pas. Seules (colonnes + 2) × (lignes + 2) tuiles existent dans la page, recyclées quelle que soit la distance parcourue ; colonnes en quinconce. L'image d'une tuile vaut (x·A + y·B) modulo le nombre de photos ; à chaque construction, le script cherche A et B pour que deux tuiles qui montrent la même photo soient le plus loin possible l'une de l'autre dans la fenêtre (aucun doublon voisin).

## Prompt pour le régénérer

> Écris un mur d'images infini en JS sans bibliothèque : une grille de tuiles juste plus grande que l'écran, positionnées en `translate3d` par modulo d'un décalage global, chaque tuile choisit son image selon ses coordonnées « logiques » pour que le mur paraisse sans fin. On le traîne dans tous les sens avec inertie, il dérive lentement seul (bouton pour arrêter), flèches au clavier, masque radial sur les bords. Tailles en variables CSS lues par des sondes. Ne jamais bloquer le défilement vertical de la page au toucher : `touch-action: pan-y pinch-zoom` sur le mur, et au doigt seul le glissement horizontal déplace le mur. Pas de zoom au survol pendant un glisser. En mouvement réduit : pas de dérive ni d'inertie.

## Téléphone

Le mur occupe 78svh (100svh en aperçu). Avec `touch-action: none`, un pouce posé dessus bloquerait la page et le visiteur n'atteindrait plus le formulaire. D'où `touch-action: pan-y pinch-zoom` : un geste vertical fait défiler la page (le navigateur envoie `pointercancel` et le mur se lâche) ; un geste horizontal fait glisser le mur, avec inertie. La souris et le stylet gardent le glisser dans toutes les directions. Si le mur doit rester entièrement manipulable au doigt, lui donner au plus `60svh` de haut pour laisser au pouce une marge où faire défiler la page.

## Accessibilité

Conteneur `role="region"` avec `aria-roledescription="mur de photos"` et un `aria-label` qui décrit le mur (les tuiles sont décoratives, `alt` vide ; `role="img"` serait contradictoire sur un bloc qu'on pilote aux flèches), focusable, flèches pour se déplacer, bouton pour arrêter la dérive. Doubler par une galerie classique si les images portent de l'information.

## Mouvement réduit

Pas de dérive ni d'inertie : le mur ne bouge que sous la main ou les flèches.

## Performance

Nombre de tuiles constant (≈ 30) ; la boucle s'arrête quand plus rien ne bouge, hors écran et onglet caché. Aucune dépendance externe hors polices de la démo.
