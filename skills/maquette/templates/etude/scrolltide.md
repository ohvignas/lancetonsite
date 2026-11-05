# Étude — Scrolltide (scrolltide.co)

Site : https://www.scrolltide.co/ · visité le 5 novembre 2026 avec Playwright (Chrome réel, 1440 × 900), défilement réel et captures à plusieurs hauteurs, puis lecture image par image des vidéos d'aperçu publiques.

Scrolltide est une bibliothèque payante de **prompts** (138 modèles de pages, 73 composants, 22 sections, 55 fonds « shader ») à coller dans Claude, Cursor ou v0. Le site lui-même anime peu : ce sont les **vidéos d'aperçu** (MP4 publics, 6 à 30 s) qui montrent les gestes. Les prompts et le code source sont derrière l'abonnement : non consultés.

## Pages visitées

| URL | Accès | Ce qu'on y voit |
|---|---|---|
| `/` | libre | catalogue en grille, bandeau de techno qui défile, vidéos d'aperçu en boucle ; fenêtre d'abonnement qui assombrit la page après quelques secondes de défilement |
| `/components` | libre (aperçus) | 73 composants, chacun avec une vidéo d'aperçu et une description d'une phrase ; fenêtre de détail `#c-<nom>` |
| `/components#c-zoom-reveal` (et autres) | aperçu libre, **prompt payant** (« Unlock with Yearly or Lifetime ») | noté, non contourné |
| `/sections` | libre (aperçus) | 22 bandes (pied de page, prix, appel final) |
| `/templates/otis`, `/templates/selene`, `/templates/naiade` | libres (modèles gratuits) | vidéo d'aperçu ; « Copy the prompt » / « Download source » demandent un compte : **non utilisés** |
| `/free` | libre | 8 modèles gratuits |
| `/pricing`, `/login` | paiement / connexion | notés, passés |

## Animations relevées (vidéos d'aperçu)

| Composant | Déclencheur | Ce qui bouge | Épinglage | Durée, courbe | Style |
|---|---|---|---|---|---|
| **Zoom Reveal** | défilement (scrub) | une pilule d'image entre deux mots s'ouvre en plein cadre ; les mots restent collés à ses bords et sortent ; une étiquette « lecture » apparaît à la fin | oui, ≈ 1,5 écran | linéaire au défilement, ouverture douce aux extrémités | fond blanc, petite typo, photo minérale |
| **Scroll Index** | défilement | un projet par écran : photo plein cadre, nom géant au centre qui change en glissant, colonne de vignettes au centre qui marque la position | oui, un écran par projet | fondu croisé + masque du nom, ≈ 0,6 s si on s'arrête (accrochage) | photos chaudes, sans-serif blanc énorme |
| **Step Path** | entrée dans l'écran | ligne pointillée en arcs qui saute de point en point, chaque étape monte quand la ligne l'atteint, puis un tronçon plus sombre continue de voyager | non | ≈ 0,6 s par arc, puis boucle | très sobre, gris sur blanc |
| **Marble Scroll** | défilement + vitesse | photos plein cadre dont les coutures se déchirent et marbrent en se croisant, plus fort quand on défile vite, puis se lissent | sticky | dépend de la vitesse | titres condensés blancs, photos éditoriales |
| **Parallax Row** | défilement | rangée irrégulière de cadres (portrait, paysage, carré) qui glisse ; chaque photo coulisse dans son cadre à sa profondeur ; clic = visionneuse | non | linéaire | fond clair, photos mode |
| **Scroll 3D Slider** | vitesse de défilement | une loupe fixe au centre fait gonfler les photos qui passent, puis tout s'aplatit | non | ressort | photos lifestyle chaudes (WebGL) |
| **Focus Reveal** | survol | mots flous, un cadre de visée à coins se déplace et s'étire sur le mot survolé qui devient net | non | ≈ 0,3 s, courbe douce | fond noir, coins jaune-vert |
| **Pleated Strip**, **Arc Wave** | défilement / glisser | posters plissés sur un tambour, portraits sur un cylindre | non | inertie | 3D, hors de notre périmètre |
| Modèle **Selene** | défilement | poussière qui se dissipe (« scroll to clear the dust »), titre, puis galerie horizontale de missions | oui | lent, cinématographique | spatial, typo large espacée |
| Modèle **Naïade** | défilement | alternance photo plein cadre / fiche produit, grand mot de marque en pied de page | sticky | fondus | joaillerie, serif fin + turquoise |

Tendances : un seul geste fort par composant ; masques (clip-path) plutôt que fondus ; texte géant posé sur la photo ; la **vitesse de défilement** comme paramètre (Marble Scroll, Scroll 3D Slider, Pleated Strip) ; un indicateur de position discret (vignettes, numéro).

## Repéré → technique → notre fichier

| Repéré | Notre technique | Notre fichier |
|---|---|---|
| Zoom Reveal | `clip-path: inset(… round …)` mesuré sur le trou de la ligne, mots poussés en `x` du même pas, 1 épinglage | `elements/pilule-zoom.html` |
| Scroll Index | timeline épinglée, une étiquette par projet, `snap: "labels"`, vignettes-boutons qui défilent jusqu'au projet | `elements/index-projets.html` |
| Step Path | arcs SVG quadratiques calculés, pointillé dévoilé par un masque (`stroke-dashoffset`, `pathLength=1`), sans épinglage, sans DrawSVG | `elements/chemin-etapes.html` |
| Parallax Row | piste en `x` liée au passage de la section, photos en `xPercent` selon `data-profondeur`, sans épinglage | `elements/bande-parallaxe.html` |
| Marble Scroll | sticky + `clip-path: polygon()` déchiré, amplitude = arrivée + vitesse (`getVelocity`), un seul `gsap.ticker` ; pas de WebGL | `elements/rideau-dechire.html` |
| (motif d'offres empilées, vu dans les sections) | sticky + recul `scale` et voile en scrub | `elements/cartes-empilees.html` |
| Focus Reveal (survol) | transposé au défilement : quatre coins en `x`/`y`, mot net en `filter`, 1 épinglage | `elements/focus-mots.html` |

Toutes les démos : GSAP 3.15.0 + ScrollTrigger (jsdelivr), `gsap.matchMedia()` pour le mouvement réduit, nettoyage automatique (classes d'état retirées dans la fonction de retour), `transform` / `opacity` / `clip-path` seulement, `ScrollTrigger.refresh()` au chargement, mode `?apercu`, au plus un épinglage par démo. Bonnes pratiques prises dans les skills officiels `gsap-core`, `gsap-scrolltrigger`, `gsap-timeline`, `gsap-performance`.

## Prompts cités en référence

Aucun prompt de Scrolltide n'est en accès libre (tous derrière « Yearly » ou « Lifetime », ou derrière un compte pour les modèles gratuits). Seules les descriptions publiques d'une phrase ont été lues, par exemple pour Zoom Reveal : « opens into a full-bleed frame as the page scrolls » (scrolltide.co/components). Nos prompts, dans chaque fiche, sont écrits par nous.

## Non retenu, et pourquoi

- **Scroll 3D Slider, Pleated Strip, Arc Wave, Wave Gallery, DNA Carousel** : lentille et tambours en WebGL ou CSS 3D lourds, réagissent à la vitesse ; hors du périmètre « défilement léger », et proches de `elements-3d/`.
- **Tronçon qui voyage sans fin sur Step Path** : animation autonome de plus de 5 s, il aurait fallu un bouton pause pour un détail ; retiré.
- **Marbrure de Marble Scroll** : demande un shader ; le bord déchiré en `clip-path` garde l'idée (couture qui se lisse à l'arrivée, plus forte en vitesse) pour 3 Ko.
- **Texte qui se remplit au défilement, section qui change de couleur, image qui se dévoile, galerie horizontale épinglée** : déjà dans le kit (`data-split-scrub`, `data-bg`, `data-image-reveal`, `data-hscroll`, voir `prototype/GESTES.md`).
- **SplitText, Flip, DrawSVG, ScrollSmoother, Observer** : traités par un autre agent (`elements/gsap-*.html`) ; nos démos découpent et tracent sans ces plugins.
- Les composants à la souris (Ink Button, Meniscus, Eye Button, Image Trail…) : hors sujet de cette étude (défilement).

## Ce qui reste à faire

- Fusion dans `elements/README.md` (session principale).
- `index-projets` et `pilule-zoom` comptent chacun comme un épinglage : à signaler dans `GESTES.md` comme *Lettres qui s'envolent*.
