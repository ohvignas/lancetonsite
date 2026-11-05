# Titre révélé par lignes puis mots (SplitText)

apercu: gsap-splittext.html?apercu

Élément · démo : [`gsap-splittext.html`](gsap-splittext.html) · captures : `captures/gsap-splittext-1440.webp`, `-375.png`, `-1440-reduit.png`

- **Technique** : GSAP 3.15.0 + SplitText (`type: "lines,words"`, `mask: "lines"`, `autoSplit`, `onSplit`) + ScrollTrigger pour le second titre
- **Poids** : démo 8,2 Ko (3,4 Ko gzip) + gsap 28,4 Ko, ScrollTrigger 18,0 Ko, SplitText 3,7 Ko gzip (≈ 50 Ko, déjà chargés par `prototype/gestes.js`)
- **Inspiré de** : skill officiel `gsap-plugins` (section SplitText) du dépôt [greensock/gsap-skills](https://github.com/greensock/gsap-skills) et [doc SplitText](https://gsap.com/docs/v3/Plugins/SplitText/). Code et textes écrits par nous.

## Licence

GSAP et SplitText : [licence standard GSAP](https://gsap.com/standard-license) (Webflow, en vigueur depuis le 30 avril 2025, modifiée le 30 mai 2025). Gratuit, usage commercial compris, tous plugins inclus. Interdit : s'en servir dans un outil visuel d'animation sans code concurrent de Webflow, et retirer les mentions de copyright des fichiers. Ce n'est pas une licence open source (pas MIT). Détails : [`gsap-bonnes-pratiques.md`](gsap-bonnes-pratiques.md).

## Quand l'utiliser

Le titre du hero (au chargement) ou un titre de section (à l'entrée dans l'écran, une fois). Un seul titre en grand par écran : le geste perd sa force s'il se répète partout. Pour un manifeste qui s'allume à la lecture, préférer `data-split="words"` + `data-split-scrub` de `gestes.js`.

## Brancher dans une maquette

1. Si la page charge déjà `gestes.js` : utiliser `data-split="lines"`, c'est le même geste (lignes masquées). Cette démo sert quand on veut **lignes puis mots** ou un réglage à part.
2. Sinon : copier le bloc « à copier », le script d'anti-flash dans `<head>` et le `<script>` ; mettre `data-revele="maintenant"` (au chargement) ou `data-revele` (au défilement) sur le titre.
3. Ne jamais mettre de `transition` sur la largeur d'un titre découpé, ni de largeur en `ch` sans attendre la police : la largeur change à l'arrivée de la police et le titre est découpé deux fois sous les yeux du visiteur. La démo attend `document.fonts.ready` (1,5 s au plus) avant de découper, et ne met la transition que sur la colonne étroite.
4. Remplacer les textes par ceux de `05-contenus/`, régler les variables sur `07-maquette/prototype/theme.css`.
5. Vérifier avec `../verifier-elements.cjs gsap-splittext`.

## Variables

| Variable | Défaut | Rôle |
|---|---|---|
| `--revele-encre` | `#f1e7d6` | couleur du titre (14:1 sur la croûte #2a1c13) |
| `--revele-accent` | `#e9b265` | mots en `<em>`, couleur du blé, sans italique (9:1) |

Typo de la démo : Bricolage Grotesque 760 (titres) et Public Sans (texte), fond croûte de pain sombre ; à remplacer par celles du design system.

Réglages JS : lignes `yPercent: 105`, 0,95 s, `power4.out`, décalage 0,12 s ; mots de 0,22 à 1 d'opacité, décalage 0,035 s, à partir de 0,45 s. Masques agrandis de 0,14 em en haut pour ne pas couper les capitales accentuées.

## Prompt pour le régénérer

> Écris un titre HTML révélé avec GSAP 3.15.0 et SplitText : découpe en lignes et en mots, une ligne par masque (`mask: "lines"`), `autoSplit: true` et toute l'animation créée dans `onSplit()` et renvoyée par lui, pour qu'elle soit redécoupée et recalée quand la police arrive ou que la largeur change. Les lignes montent depuis leur masque (`yPercent: 105`) en cascade, puis les mots passent d'une opacité de 0,22 à 1. Agrandis les masques de 0,14 em en haut pour ne pas couper « É ». Un titre joue au chargement, un autre à l'entrée dans l'écran (ScrollTrigger, `once`). Mets tout dans `gsap.matchMedia("(prefers-reduced-motion: no-preference)")`. Garde l'aria par défaut de SplitText. Attends `document.fonts.ready` (1,5 s au plus) avant de découper, pour une seule découpe. Anti-flash : titre caché 2,5 s au plus par une classe sur `<html>`. Aucune transition CSS sur la largeur du titre. Sans GSAP : titre affiché tel quel.

## Accessibilité

Vérifié dans Chrome : SplitText 3.15 (`aria: "auto"`, le défaut) pose sur le `<h1>` un `aria-label` égal au texte entier et `aria-hidden="true"` sur les 21 éléments créés (lignes et mots). Le lecteur d'écran lit la phrase, pas des morceaux. Attention : `aria-label` n'est fiable que sur un titre, un lien ou un bouton ; sur un `<p>`, passer `aria: "hidden"` et doubler le texte dans un élément visuellement masqué. Si le titre contient un lien, `aria: "none"` + copie masquée. Boutons de 44 px, focus visible.

## Mouvement réduit

Rien n'est découpé, rien ne bouge : le titre s'affiche tel quel (le `matchMedia` ne crée rien ; si le réglage change en cours de visite, il annule la découpe). Le bouton « Rejouer » est masqué.

## Performance

Seuls `transform` et `opacity` sont animés. Découper seulement ce qu'on anime (ici lignes et mots, pas les lettres). Pas de `text-wrap: balance` sur un texte découpé (il fausse les lignes) : `pretty` suffit. Vérifié (5 novembre 2026) : une seule découpe au chargement (4 lignes à 1440 px, 5 à 375 px), passage en colonne étroite 4 → 7 lignes (7 aussi à 375 px), redécoupe propre, 0 erreur.
