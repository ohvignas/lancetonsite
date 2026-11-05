# Défilement adouci et profondeur (ScrollSmoother)

apercu: gsap-scrollsmoother.html?apercu

Élément · démo : [`gsap-scrollsmoother.html`](gsap-scrollsmoother.html) · captures : `captures/gsap-scrollsmoother-1440.png`, `-375.png`, `-1440-reduit.png`

- **Technique** : GSAP 3.15.0 + ScrollTrigger + ScrollSmoother (`effects: true` → `data-speed`, `data-lag`), créé dans `gsap.matchMedia()`
- **Poids** : démo 9,3 Ko (3,7 Ko gzip) + gsap 28,4 Ko, ScrollTrigger 18,0 Ko, ScrollSmoother 5,5 Ko gzip (≈ 52 Ko)
- **Inspiré de** : skill officiel `gsap-plugins` (ScrollSmoother) de [greensock/gsap-skills](https://github.com/greensock/gsap-skills), [doc ScrollSmoother](https://gsap.com/docs/v3/Plugins/ScrollSmoother/). Code et textes écrits par nous ; photos : `exemples/liberal-calade/images/`.

## Licence

GSAP et ScrollSmoother : [licence standard GSAP](https://gsap.com/standard-license) (Webflow). Usage commercial gratuit ; interdit dans un outil visuel d'animation concurrent de Webflow. Voir [`gsap-bonnes-pratiques.md`](gsap-bonnes-pratiques.md).

## Avertissement (à lire avant de l'utiliser)

- **Une seule instance par page**, et elle prend tout le défilement : tout le contenu doit être dans `#smooth-wrapper > #smooth-content`. Ce qui est `position: fixed` (en-tête, barre d'action mobile) doit rester **dehors**. `position: sticky` ne marche plus dans le contenu (le contenu est déplacé en `transform`) : utiliser un épinglage ScrollTrigger à la place.
- **Conflit avec Lenis** : `prototype/gestes.js` crée Lenis dès que Lenis est chargé. Deux moteurs de défilement doux se battent (saccades, ancres fausses). Choisir : **soit** `gestes.js` + Lenis (le défaut du kit), **soit** ScrollSmoother sans charger Lenis. Les gestes `data-*` de `gestes.js` restent utilisables avec ScrollSmoother si Lenis n'est pas chargé.
- **Coût** : le contenu entier est transformé à chaque image et chaque `data-speed` crée un ScrollTrigger. Sur une page longue, mesurer sur un téléphone moyen. Les ancres doivent passer par `smoother.scrollTo()` (fait dans la démo).
- Le gain doit justifier tout ça : réservé aux pages vitrines très visuelles (architecte, photographe, hôtel). Pour une simple parallaxe, `data-parallax` de `gestes.js` suffit.

## Quand l'utiliser

Page projet ou portfolio où les photos sont l'argument : légère profondeur entre colonnes (`data-speed` de 0,85 à 1,15) et image qui glisse dans son cadre (`data-speed="auto"`).

## Brancher dans une maquette

1. Envelopper tout le contenu défilant dans `#smooth-wrapper > #smooth-content` ; sortir l'en-tête fixe.
2. Copier le bloc « à copier » et le `<script>` ; ne pas charger Lenis.
3. `data-speed` sur les blocs (0,8 à 1,2), `data-speed="auto"` sur une image dans un `.cadre` ; `data-lag` (0,1 à 0,2) sur les légendes.
4. Légendes et `alt` écrits **en regardant chaque photo** : sur une page d'architecte, une légende fausse (« charpente » sous une voûte, « pierre sèche » sur un mur hourdé) se voit au premier coup d'œil. Faire relire par le client.
5. Ouverture à `min-height: 70svh` calée en bas : la première image affleure à 1440 × 900 sans grand vide au-dessus du titre (92svh en laissait 350 px). Sur téléphone, ne pas garder cette hauteur calée en bas (sous 760 px : `min-height: 0`, contenu en haut juste sous la barre) : sinon 380 px vides au-dessus du titre.
6. Vérifier avec `../verifier-elements.cjs gsap-scrollsmoother`.

## Variables

| Réglage | Défaut | Rôle |
|---|---|---|
| `smooth` | `1.1` | secondes de rattrapage ; au-delà de 1,5 la page semble molle |
| `data-speed` | `0.82` à `1.12` | vitesse relative d'un bloc |
| `data-speed="auto"` | — | l'image (128 % du cadre) glisse dans son cadre |
| `data-lag` | `0.1` à `0.2` | retard de rattrapage d'un texte |

## Prompt pour le régénérer

> Écris une page de projet d'architecte avec GSAP 3.15.0, ScrollTrigger et ScrollSmoother : en-tête fixe hors de `#smooth-wrapper > #smooth-content`, titre en `data-speed="0.82"`, mosaïque de 4 photos sur une grille de 12 colonnes avec `data-speed` entre 0,9 et 1,12, chaque image en `data-speed="auto"` dans un cadre `overflow: hidden` (image à 128 % seulement quand ScrollSmoother est actif), légendes en `data-lag="0.1"`. Crée l'instance dans `gsap.matchMedia("(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)")` pour qu'elle n'existe ni en mouvement réduit ni sur écran tactile. Fais passer les ancres par `smoother.scrollTo()`. Sans GSAP : page normale.

## Accessibilité

Vérifié au clavier : Tab vers le lien de contact en bas de page → ScrollSmoother l'amène à l'écran (top 629 px sur 900). Le lien d'ancre déplace aussi le focus sur l'action de la section visée. Contrastes ≥ 4,5:1 (légendes #46443f sur pierre #d9d8d3 : 6,9:1). Typo de la démo : Cormorant Garamond droit (titres) et Hanken Grotesk.

## Mouvement réduit

Aucune instance : défilement natif, `data-speed` et `data-lag` ignorés, images qui remplissent leur cadre. Même chose sur écran tactile (`pointer: coarse`) et sans GSAP. Si le réglage change pendant la visite, `matchMedia` annule l'instance.

## Performance

Voir l'avertissement. `smoothTouch: false` ; pas d'instance sur tactile, où le défilement natif est le plus fluide. `transform` uniquement.
