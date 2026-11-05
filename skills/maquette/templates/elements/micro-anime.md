# Ajout au panier animé (Anime.js)

apercu: micro-anime.html?apercu

Élément · démo : [`micro-anime.html`](micro-anime.html) · captures : `captures/micro-anime-1440.png`, `-375.png`, `-1440-reduit.png`

- **Technique** : Anime.js v4 en ESM. Les clics sont branchés **avant** le chargement de la bibliothèque, importée sans `await` : tant qu'Anime.js n'est pas arrivé (CDN lent ou bloqué), l'ajout est instantané. Au clic sur « Ajouter », la vignette (photo + étiquette) est clonée en `position: fixed` et vole vers l'icône du panier : `x` et `y` ont des courbes d'accélération différentes (`inOutSine` / `inBack`), ce qui dessine un arc. À l'arrivée, la pastille du panier rebondit (`outElastic`) et le total défile jusqu'au nouveau montant (Anime.js anime un simple objet JS, le texte est formaté en euros à chaque image).
- **Paquet** : `animejs@4.5.0` (`dist/bundles/anime.esm.min.js`).
- **Poids** : démo 13,4 Ko (4,8 Ko gzip). Bibliothèque : 119 Ko (41 Ko gzip) pour le paquet complet ; avec un outil de build, n'importer que `animate` réduit fortement.
- **Inspiré de** : documentation d'Anime.js v4 (animation d'objets JS, propriétés à accélération propre). Code et textes écrits par nous. Photos des sachets : `exemples/b2c-brume/images/` (marque fictive Brume) ; leurs étiquettes blanches sont remplies en HTML (marque, origine, nom du café, « torréfié le mardi »), posées en pourcentage sur la zone blanche de la photo, tailles en `cqi`.

## Licence

Anime.js : MIT, © 2025 Julian Garnier — https://github.com/juliangarnier/anime/blob/master/LICENSE.md (vérifiée sur le dépôt le 5 novembre 2026). Impose de garder la mention de copyright et la licence avec le code redistribué : mention en en-tête de la démo ; le fichier du CDN garde la sienne.

## Quand l'utiliser

Boutique avec panier visible en permanence (barre collante) : le vol de la vignette montre où est allé le produit. Une seule animation par action ; jamais sur un bouton « Acheter maintenant » qui change de page.

## Brancher dans une maquette

1. Copier le bloc « à copier », le lien `.panier`, le paragraphe `#panier-etat` et le script.
2. Chaque bouton `.ajouter` porte `data-nom` et `data-prix` (point décimal) et un nom accessible distinct : `Ajouter<span class="sr-only"> Konga au panier</span>`. La vignette qui vole est le bloc `.sachet` de la carte `.produit` (photo et étiquette).
3. Avec de vraies photos de sachets étiquetés, retirer les `.etiquette` HTML ; avec des sachets vierges, recaler `left`, `top`, `width`, `height` de `.etiquette` sur la zone blanche (ici 34 %, 46,8 %, 22,6 %, 32,8 % d'un cadre carré).
4. Ne jamais mettre `await import(…)` avant de brancher les clics : un bouton d'achat ne doit pas attendre un CDN.
5. Brancher la vraie logique de panier à l'endroit où `etat` est mis à jour, et faire pointer le lien `.panier` vers la vraie page panier (ici `/panier`, jamais `#panier` qui renvoie sur lui-même).
6. Garder `grid-template-rows: auto auto 1fr auto` sur `.produit` : la ligne prix + bouton reste alignée en bas des cartes, même si une description passe sur deux lignes.

## Variables

| Variable | Défaut | Rôle |
|---|---|---|
| `--panier-accent` | `#c2410c` | fond de la pastille du nombre d'articles |
| `--panier-encre` | `#fff` | chiffre de la pastille |
| durée du vol | `820` ms | dans l'appel `animate(v, …)` |
| `inBack(3)` | — | hauteur de l'arc (2 à 3,5) ; à 3, la vignette plonge un peu puis remonte vers le panier, l'arc se voit à 1440 px |
| `inBack(1.6)` et `scale` depuis 0,5 | sous 600 px | arc plus doux et vignette réduite d'emblée sur mobile, où la carte prend toute la largeur : le clone ne recouvre pas le texte |

## Prompt pour le régénérer

> Écris une micro-interaction d'ajout au panier en HTML autonome avec Anime.js 4.5.0 importé en ESM depuis jsdelivr. Branche les clics tout de suite et importe la bibliothèque sans `await` (`import(…).then(m => animate = m.animate)`) : tant qu'elle n'est pas là, l'ajout est instantané. Chaque bouton « Ajouter » a un nom accessible distinct (« Ajouter Konga au panier »). Au clic, mets d'abord à jour l'état (nombre, total, phrase dans une région `aria-live="polite"`), puis clone la vignette en `position: fixed` et anime-la vers l'icône du panier : `x` en `inOutSine`, `y` en `inBack(3)` pour faire un arc (sous 600 px : `inBack(1.6)` et départ à l'échelle 0,5 pour ne pas couvrir le texte), réduction d'échelle et légère rotation, environ 800 ms. À l'arrivée, supprime le clone, fais rebondir la pastille du panier (`scale` 1 → 1,45 → 1 en `outElastic`) et fais défiler le total jusqu'à la nouvelle valeur en animant un objet JS formaté avec `Intl.NumberFormat` en euros. Si la bibliothèque ne charge pas, ou si `prefers-reduced-motion: reduce`, tout est instantané.

## Accessibilité

Bouton natif de 44 px, focus visible. Noms accessibles distincts : « Ajouter Konga au panier », « Ajouter La Palma au panier »… (texte visible « Ajouter » + complément `sr-only`). Étiquettes HTML des sachets en `aria-hidden` : l'`alt` de la photo dit déjà marque, café et origine. L'annonce « Konga ajouté. Panier : 2 articles, 24,80 € » passe par une région polie, indépendante de l'animation. Le clone volant est `aria-hidden` et sans texte alternatif. Le nombre d'articles visuel est `aria-hidden` : le lien panier est décrit par la phrase d'état.

## Mouvement réduit

Pas de vol ni de rebond : le nombre et le total changent instantanément. Même chose sans Anime.js, et pendant qu'il charge. Vérifié le 5 novembre 2026 : CDN retardé de 6 s, clic à 0,3 s → total et annonce à jour en 0,2 s.

## Performance

Animation en `transform` et `opacity` seulement, un clone par clic, supprimé à la fin. Bibliothèque chargée en module, sans bloquer l'affichage.
