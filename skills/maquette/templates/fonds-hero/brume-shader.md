# Mer de nuages sur les crêtes

apercu: brume-shader.html?apercu

Fond de hero · démo : [`brume-shader.html`](brume-shader.html) · captures : `captures/brume-shader-1440.webp`, `-375.png`, `-1440-reduit.png`

- **Technique** : WebGL, un seul shader plein écran. Mer de nuages vue d'au-dessus (bruit fractal fbm projeté en perspective, relief éclairé côté soleil), chaîne lointaine et sommets proches en bruit « ridged » (arêtes vives), voiles qui dérivent au pied des sommets, soleil bas à disque net et halo chaud. La roche est modelée : pente de l'arête calculée par différence finie, versant tourné vers le soleil plus clair et plus chaud, liseré de lumière sur l'arête côté soleil, couloirs plus sombres (bruit étiré verticalement).
- **Poids** : démo 12 296 octets (5 276 octets gzip), aucune bibliothèque.
- **Inspiré de** : F6 de `../motionsites-etude.md` (« Solar Fog », /?prompt=lumen-roof-hero). Code et textes écrits par nous.
- **Licence** : code original Lancetonsite. Polices de la démo : Young Serif et Inter Tight (SIL Open Font License).

## Quand l'utiliser

Refuge, hébergement de montagne, station, bien-être, vin d'altitude : tout ce qui vend un lieu et une lumière d'aube. Le texte va à gauche, dans le ciel ; les sommets se dressent à droite et la nappe de nuages occupe le bas. Remplace une vidéo de paysage tant qu'on n'en a pas, puis sert de repli (poster) quand la vidéo arrive. Les sommets sont des aiguilles alpines (démo : Écrins) : pour un massif calcaire à falaises et plateaux (Vercors, Chartreuse), remplacer les `tente` par des plateaux à bords raides, sinon un client du coin le verra.

## Brancher dans une maquette

1. Copier la `<section class="hero">` (canvas + bouton pause), le bloc `<style>` et le `<script>` de la démo.
2. Remplacer les textes fictifs par ceux de `05-contenus/`.
3. Régler les variables ci-dessous sur le thème de la maquette (`07-maquette/prototype/theme.css`).
4. Un seul fond animé par page, et seulement dans le hero ou l'appel final.
5. Si le titre passe à quatre lignes, réduire la taille du `h1` ou baisser la ligne des nuages (`hz`) : le texte doit rester au-dessus de la nappe.

## Variables

| Variable | Défaut | Rôle |
|---|---|---|
| `--ciel-haut` | `#a9bfd0` | haut du ciel, bleu du petit matin |
| `--ciel-bas` | `#f3d9bf` | horizon (teinte chaude du lever) |
| `--crete` | `#4f5f6e` | roche ; la chaîne lointaine est éclaircie par l'air, les sommets proches assombris |
| `--voile` | `#f6f3ee` | couleur de la mer de nuages |

Dans le shader : ligne des nuages `hz = .27` (part de la hauteur), position du soleil `vec2(asp * .74, hz + .085)`, sommets proches définis par trois `tente(x, centre, demi-largeur, hauteur)`, vitesse de la nappe `t * .06` et des voiles `t * .05`. En portrait, la ligne des nuages remonte (`hz = .31`), les sommets sont recentrés (sommet principal à `.74` de la largeur, entier à 375 px) et un peu abaissés (`k = clamp(asp, .72, 1.)`) pour ne pas passer sous le texte.

## Prompt pour le régénérer

> Écris un fond de hero en WebGL pur, un seul shader plein écran : une mer de nuages vue d'au-dessus à l'aube. Le tiers bas est une nappe de nuages blanche et lumineuse, texturée par du bruit fractal projeté en perspective (gros bourrelets au premier plan, étirés vers l'horizon), éclairée du côté du soleil, avec un reflet chaud sous le soleil. Au-dessus, une chaîne lointaine bleutée et deux ou trois sommets proches, sombres et nets (bruit « ridged » pour des arêtes vives), tous à droite pour laisser le ciel libre à gauche pour le texte ; modèle la roche : versant tourné vers le soleil plus clair et chaud, liseré de lumière sur l'arête côté soleil, couloirs sombres sur la face à contre-jour. Des voiles de brume dérivent au pied des sommets, assez vite pour qu'on voie que ça bouge. En portrait, remonte la nappe et recentre les sommets pour qu'ils restent entiers. Soleil bas entre deux sommets : petit disque net, halo chaud large, jamais blanc cramé. Couleurs (ciel haut, horizon, roche, nuage) en variables CSS. Pas de texte dans le canvas. Bouton pause, arrêt hors écran et onglet caché, image fixe en mouvement réduit, repli en dégradé CSS si WebGL manque, densité de pixels plafonnée.

## Accessibilité

Texte foncé (`#1d2428`) sur le ciel clair : contraste supérieur à 7:1 du bleu du haut à la pêche de l'horizon. À 1440 × 900 comme à 375 × 812, le titre, le chapô et le bouton restent dans le ciel, au-dessus de la nappe et à gauche des sommets. Canvas `aria-hidden`. Bouton pause de 44 px avec libellé qui change, focus visible.

## Mouvement réduit

Image fixe à t = 20 s (voiles déjà installés). Vérifié avec Playwright (`reducedMotion: "reduce"`) : deux captures à 1,2 s d'écart sont identiques. Le bouton propose alors « Relancer le fond ».

## Performance

Le dessin ne tourne que si le hero est à l'écran, l'onglet visible et la lecture voulue (`IntersectionObserver`, `visibilitychange`). Environ 45 appels de bruit par pixel (le relief des sommets est évalué deux fois pour la pente). Sur grand écran : 5 octaves, densité de pixels plafonnée à 1,25. Sur petit écran (plus petit côté < 700 px) : 4 octaves et densité 1. Aucune dépendance externe hors polices de la démo. Sans WebGL : dégradé CSS ciel → nappe blanche, bouton pause retiré.
