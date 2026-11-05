# Bande de photos à parallaxe

apercu: bande-parallaxe.html?apercu

Élément · démo : [`bande-parallaxe.html`](bande-parallaxe.html) · captures : `captures/bande-parallaxe-1440.webp`, `-375.png`, `-1440-reduit.png`

- **Technique** : `position: sticky` (scène collée, pas d’épinglage GSAP) + GSAP 3.15.0 ScrollTrigger (`scrub`) : la piste glisse en `x` (`ease: "none"`) d’un pixel par pixel défilé, chaque photo coulisse en `xPercent` dans sa fenêtre selon `data-profondeur`
- **Poids** : démo 9941 octets (3662 gzip) + GSAP 3.15.0 + ScrollTrigger (jsdelivr, versions fixées ; ≈ 46 Ko gzip, déjà chargés si la page utilise `prototype/gestes.js`)
- **Inspiré de** : composant « Parallax Row » de scrolltide.co (bibliothèque de prompts d’animations au défilement), vidéo d’aperçu publique. Prompt payant non consulté. Code, textes et réglages écrits par nous ; voir `../etude/scrolltide.md`.
- **Licence** : code Lancetonsite original (libre d’usage dans les maquettes du kit). GSAP 3.15.0 et ScrollTrigger sous licence Standard « no charge » de GreenSock/Webflow (usage commercial permis, voir `gsap-bonnes-pratiques.md` § 1 et https://gsap.com/standard-license). Photos de démo reprises de `../exemples/festival-tole/images/` (générées pour le kit) : à remplacer par celles du client.

## Quand l’utiliser

Souvenirs d’événement, galerie de lieu, ambiance : 6 à 10 photos de formats mélangés. Alternative légère à `data-hscroll` : scène collée en CSS, ne compte pas dans les trois épinglages GSAP.

## Brancher dans une maquette

1. Copier le bloc « à copier » du `<style>`, le HTML de l’élément et son `<script>`. Le bloc « Démo » et les `[data-explication]` ne servent qu’à la page d’exemple.
2. Remplacer les textes et images fictifs par ceux de `05-contenus/` et `07-medias/`.
3. Régler les variables ci-dessous sur les tokens du design system (`06-design-system/`).
4. Si la page charge déjà `gestes.js`, ne pas recharger GSAP. Vérifier avec `../verifier-elements.cjs` (0 erreur, captures 1440 et 375, mouvement réduit).

## Variables

| Variable | Défaut | Rôle |
|---|---|---|
| `--bande-h` | `clamp(15rem, 30vw, 24rem)`, `44svh` sous 640 px | hauteur des cadres (sur téléphone, la scène collée remplit environ 70 % de l’écran) |
| `--bande-accent` | `#ff7a4d` | contour de focus |
| `data-profondeur` | `.6` à `1.5` | amplitude du glissement de la photo dans son cadre |

Course calée pour que toutes les photos passent à l’écran : la scène se colle centrée verticalement (`top` posé par le script), la section est allongée de la largeur qui dépasse (`hauteur de la scène + écart`, recalculée à chaque `refreshInit`), et la piste avance d’un pixel par pixel défilé. Mesuré en 1440 × 900 et 375 × 812 : en fin de course, le dernier cadre est entier à l’écran (`right` 1392 ≤ 1440, 355 ≤ 375) avec la bande toujours collée, puis la bande repart avec la page.

## Prompt pour le régénérer

> Écris une bande horizontale de photos aux formats mélangés (portrait 4/5, paysage 3/2, carré), décalées en hauteur, avec légende sous chaque cadre. Sans épinglage GSAP : la scène de la bande est en `position: sticky`, centrée verticalement, et la section est allongée en JS de la largeur qui dépasse (recalcul à chaque `refreshInit`) ; pendant ce trajet, GSAP ScrollTrigger (`scrub`, `ease: "none"`) fait glisser toute la piste vers la gauche, un pixel par pixel défilé, et sur téléphone, les cadres font 44svh de haut pour que la scène collée remplisse l’écran ; chaque photo (124 % de large) coulisse en sens inverse dans sa fenêtre selon un attribut `data-profondeur`. La course se termine avant que la bande quitte l’écran : chaque photo, la dernière comprise, passe entièrement à l’écran. Avec `gsap.matchMedia()` : en mouvement réduit ou sans GSAP, la piste est une rangée qu’on fait glisser au doigt ou au clavier (overflow-x, scroll-snap, `tabindex=0`). Dans les textes affichés, utilise les apostrophes typographiques (’), jamais l’apostrophe droite.

## Accessibilité

Liste `ul` de `figure` légendées ; en mode statique, la piste est focusable et défilable au clavier.

## Mouvement réduit

Rangée immobile, défilable de côté (scroll-snap). Tout passe par `gsap.matchMedia("(prefers-reduced-motion: no-preference)")` : la classe d’état et les ScrollTrigger sont annulés d’eux-mêmes si la préférence change.

## Performance

Seuls `transform` (piste, photos) sont animés ; photos après la deuxième en `loading="lazy"`. La hauteur de la section n’est changée qu’au recalcul (`refreshInit`), jamais pendant le défilement. `ScrollTrigger.refresh()` après le chargement des images.
