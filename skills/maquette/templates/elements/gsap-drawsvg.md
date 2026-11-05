# Itinéraire tracé au défilement (DrawSVG)

apercu: gsap-drawsvg.html?apercu

Élément · démo : [`gsap-drawsvg.html`](gsap-drawsvg.html) · captures : `captures/gsap-drawsvg-1440.webp`, `-375.png`, `-1440-reduit.png`

- **Technique** : GSAP 3.15.0 + ScrollTrigger (`scrub`, `endTrigger`) + DrawSVGPlugin ; carte collée en CSS `position: sticky` (aucun épinglage GSAP) ; tête du tracé par `gsap.quickSetter`
- **Poids** : démo 11,4 Ko (4,6 Ko gzip) + gsap 28,4 Ko, ScrollTrigger 18,0 Ko, DrawSVGPlugin 2,2 Ko gzip (≈ 49 Ko ; seul DrawSVG s'ajoute si `gestes.js` est là)
- **Inspiré de** : skills officiels `gsap-plugins` (DrawSVG) et `gsap-scrolltrigger` de [greensock/gsap-skills](https://github.com/greensock/gsap-skills), [doc DrawSVG](https://gsap.com/docs/v3/Plugins/DrawSVGPlugin). Tracé, code et textes écrits par nous.

## Licence

GSAP et DrawSVG : [licence standard GSAP](https://gsap.com/standard-license) (Webflow). Usage commercial gratuit ; interdit dans un outil visuel d'animation concurrent de Webflow. Voir [`gsap-bonnes-pratiques.md`](gsap-bonnes-pratiques.md).

## Quand l'utiliser

Un parcours en étapes qui a une géographie ou un fil : tournée de livraison, itinéraire de randonnée, chaîne de fabrication, schéma de méthode, signature. Pas d'épinglage : ne compte pas dans la limite de trois du kit. Si la page a déjà `data-trace` (courbe épinglée de `gestes.js`), n'en mettre qu'un.

## Brancher dans une maquette

1. Copier le bloc « à copier », la section `[data-trajet]` et le `<script>`.
2. Remplacer `ARRETS` (points d'ancrage, viewBox 800 × 500), `POIGNEES` (deux poignées de courbe par segment) et `NOMS` ; autant de `<li>` que d'arrêts.
3. Textes depuis `05-contenus/` ; variables sur `06-design-system/`.
4. Garder `clamp()` sur `start` et `end` (ScrollTrigger ≥ 3.12) : sans lui, si la section est la dernière avant un pied de page court, la page n'est pas assez longue pour que la dernière étape atteigne 55 % de l'écran, et la tournée n'arrive jamais. Sinon, laisser au moins 45 % d'écran sous la dernière étape.
5. Régler le début et la fin avec `?reperes` dans l'adresse (markers de ScrollTrigger, jamais en production), puis vérifier avec `../verifier-elements.cjs gsap-drawsvg`.

## Variables

| Variable | Défaut | Rôle |
|---|---|---|
| `--tr-route` | `#3f6b1f` | tracé, arrêts passés, heures (5,6:1) |
| `--tr-encre` | `#1c2414` | texte |
| `--tr-fond` | `#e3eadb` | fond vert sauge (aussi derrière la carte collée sur téléphone) |
| `--tr-filet` | `#c3cdb8` | route à venir (pointillés), filets |
| `--tr-gris` | `#4d5444` | paragraphes (6,3:1) |

Typo de la démo : Familjen Grotesk partout (400 pour le texte, 700 pour titres et horaires). Atkinson Hyperlegible, essayée d'abord, barre ses zéros (« 2Ø h ») : à éviter dès qu'il y a des horaires ou des prix.

Frise : un segment de durée 1 par étape (`ease: "none"`), de `clamp(top 55%)` de la première étape à `clamp(top 55%)` de la dernière, `scrub: 0.6`, `ScrollTrigger.refresh()` à `document.fonts.ready`. Chaque arrêt s'allume quand son étape passe la ligne des 55 %.

## Prompt pour le régénérer

> Écris une section HTML « tournée » : une liste ordonnée de 5 arrêts (heure, lieu, phrase) et, collée en `position: sticky`, une carte SVG 800 × 500 avec un tracé en courbes de Bézier passant par les 5 arrêts. Avec GSAP 3.15.0, ScrollTrigger et DrawSVGPlugin, construis une timeline (`ease: "none"`) avec un `drawSVG` par segment jusqu'à la fraction de longueur de l'arrêt suivant, pilotée en `scrub` de la première à la dernière étape (`endTrigger`), avec `start` et `end` en `clamp(top 55%)` pour que le tracé parte de 0 et finisse toujours, et un `refresh()` quand les polices sont chargées. Une pastille suit la pointe via `gsap.quickSetter` et `getPointAtLength` ; arrêts et étapes reçoivent une classe quand ils sont atteints. Étiquettes en HTML positionnées en pourcentage pour rester lisibles sur téléphone. `markers` seulement avec `?reperes`. Sans GSAP ou en mouvement réduit : tracé entier, tout allumé.

## Accessibilité

Le SVG et les étiquettes sont `aria-hidden` : le contenu est la liste ordonnée, lisible dans l'ordre. Aucun texte n'est estompé avant d'être atteint (contraste plein partout) ; seul le rond du numéro change.

## Mouvement réduit

Tracé complet, cinq arrêts allumés, pastille de tête masquée, rien ne bouge au défilement. Même état sans GSAP.

Vérifié le 5 novembre 2026 en `?apercu` (page courte, explication du bas masquée) : à 1440 et 375 px, en bas de page la route arrive à la Croix-Rousse et les cinq arrêts sont allumés ; à l'ouverture, aucun arrêt n'est allumé avant le premier.

## Performance

DrawSVG anime `stroke-dashoffset` d'un seul tracé ; la pastille bouge en `transform` via `quickSetter` (pas de nouvelle interpolation à chaque image). Pas d'épinglage : la carte tient en CSS sticky, sans calcul de ScrollTrigger.
