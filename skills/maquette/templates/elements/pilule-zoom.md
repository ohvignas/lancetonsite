# Pilule qui s’ouvre

apercu: pilule-zoom.html?apercu

Élément · démo : [`pilule-zoom.html`](pilule-zoom.html) · captures : `captures/pilule-zoom-1440.webp`, `-375.png`, `-1440-reduit.png`

- **Technique** : GSAP 3.15.0 + ScrollTrigger : scène épinglée (`pin`, `scrub: .6`, `+=150%`), `clip-path: inset(… round …)` mesuré sur le trou de la ligne, mots poussés en `x`
- **Poids** : démo 7252 octets (3052 gzip) + GSAP 3.15.0 + ScrollTrigger (jsdelivr, versions fixées ; ≈ 46 Ko gzip, déjà chargés si la page utilise `prototype/gestes.js`)
- **Inspiré de** : composant « Zoom Reveal » de scrolltide.co (bibliothèque de prompts d’animations au défilement), vu en vidéo d’aperçu publique (https://www.scrolltide.co/components#c-zoom-reveal). Prompt payant non consulté. Code, textes et réglages écrits par nous ; voir `../etude/scrolltide.md`.
- **Licence** : code Lancetonsite original (libre d’usage dans les maquettes du kit). GSAP 3.15.0 et ScrollTrigger sous licence Standard « no charge » de GreenSock/Webflow (usage commercial permis, voir `gsap-bonnes-pratiques.md` § 1 et https://gsap.com/standard-license). Photos de démo reprises de `../exemples/artisan-sablon/images/` (générées pour le kit) : à remplacer par celles du client.

## Quand l’utiliser

Ouverture d’une section « lieu » ou « atelier » : on lit d’abord une phrase, puis on entre dans l’image. Une fois par page, compte comme un épinglage (limite de trois du kit).

## Brancher dans une maquette

1. Copier le bloc « à copier » du `<style>`, le HTML de l’élément et son `<script>`. Le bloc « Démo » et les `[data-explication]` ne servent qu’à la page d’exemple.
2. Remplacer les textes et images fictifs par ceux de `05-contenus/` et `06-medias/`.
3. Régler les variables ci-dessous sur le thème de la maquette (`07-maquette/prototype/theme.css`).
4. Si la page charge déjà `gestes.js`, ne pas recharger GSAP. Vérifier avec `../verifier-elements.cjs` (0 erreur, captures 1440 et 375, mouvement réduit).

## Variables

| Variable | Défaut | Rôle |
|---|---|---|
| `--pz-fond` | `#dce3dd` | fond de la scène (céladon) |
| `--pz-encre` | `#1d1a16` | couleur des mots |
| `--pz-accent` | `#a3391b` | second mot, pastille du bouton |

Taille de la pilule : `.pz-trou` (1,9 em × 0,82 em). Durée : `end: "+=150%"`.

## Prompt pour le régénérer

> Écris une scène GSAP ScrollTrigger épinglée sur un écran et demi : une phrase de deux mots en très grand, séparés par une petite pilule arrondie qui contient une photo. Au défilement, une copie plein cadre de la photo s’ouvre depuis la pilule grâce à un `clip-path: inset(... round ...)` mesuré sur la position réelle de la pilule (recalculé à chaque refresh), la photo dézoome de 1,25 à 1 dans son masque, et les deux mots glissent exactement avec les bords du cadre jusqu’à sortir de l’écran (même durée, même courbe). Un bouton d’action apparaît à 80 % en `opacity` seule (jamais `autoAlpha`, qui le cacherait au clavier) et reste atteignable par Tab pendant toute l’animation : `:focus-visible` le force à `opacity: 1`. Utilise `gsap.matchMedia()` : en mouvement réduit ou sans GSAP, la pilule reste petite entre les mots et le bouton est visible, rien n’est épinglé. Dans les textes affichés, utilise les apostrophes typographiques (’), jamais l’apostrophe droite.

## Accessibilité

La phrase est un vrai texte ; la photo de la pilule porte l’alt (« Piles d’assiettes en grès moucheté, émaillées et cuites, devant le four en brique de l’atelier »), la copie plein cadre est `aria-hidden`. Bouton de 48 px, focus visible. Le bouton est animé en `opacity` seule : il reste dans l’ordre de tabulation dès le chargement, et `.pz-action:focus-visible { opacity: 1 !important }` le montre dès qu’il reçoit le focus. Phrase en `clamp(2.2rem, 11vw, 7.5rem)` : 41 px en 375, de l’air aux bords en 320.

## Mouvement réduit

Pas d’épinglage, pas de masque : phrase avec sa pilule et bouton déjà visible (classe `pz-actif` jamais posée). Tout passe par `gsap.matchMedia("(prefers-reduced-motion: no-preference)")` : la classe d’état et les ScrollTrigger sont annulés d’eux-mêmes si la préférence change.

## Performance

Animés : `clip-path` (peinture seule, pas de mise en page), `transform` de l’image et des mots, `opacity` du bouton (pas `visibility`). Image plein cadre de 255 Ko (2400 px) : prévoir `srcset`. `ScrollTrigger.refresh()` après le chargement des images.
