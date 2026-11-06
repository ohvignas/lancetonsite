# Gestes — mode d'emploi

`gestes.js` branche chaque animation par un attribut `data-*`. On n'écrit aucune ligne de JS page par page.
Dépendances : GSAP 3.13+ (ScrollTrigger, SplitText) et Lenis 1.3+, chargés avant `gestes.js` (voir `index.html`).
model-viewer 4.2.0 se charge seul, et seulement si la page contient un `<model-viewer>`.
**Le CSS des gestes** : `gestes.css`, autonome, sans Tailwind ni Node. Il donne `data-steps`, `data-hscroll`, `data-marquee`, `data-hero-pin`, `data-cursor`, `data-sticky-cta`, `data-bg`, `data-accordion` et leurs replis, avec les classes `.steps-grille`, `.steps-textes`, `.steps-medias`, `.steps-repere` et `.piste-glisser`. Avec Tailwind, `index.html` montre les mêmes règles en utilitaires : ne pas charger les deux.

**Trois règles :**

- **3 épinglages au plus par page** (`data-hero-pin`, `data-steps`, `data-hscroll`, `data-trace`, `data-model-pin`). Au-delà, la page paraît longue et lourde.
- **Le contenu existe sans le geste.** Si GSAP ne se charge pas, ou si le visiteur a demandé moins de mouvement (« mouvement réduit »), la page reste entière et lisible (classe `motion-reduit` sur `<html>`).
- **Anti-flash :** garder dans `<head>` le script `js-attente` et la règle CSS `.js-attente [data-split]{visibility:hidden}` d'`index.html`.

Les épinglages sont créés dans l'ordre du DOM et triés avant chaque recalcul, donc leur ordre dans la page n'importe pas.
Les ancres (`href="#offre"`) tombent sous l'en-tête fixe, pas dessous.
Flou d'en-tête dans une CSS compilée par Tailwind 4 : écrire `-webkit-backdrop-filter`
**avant** `backdrop-filter` (au besoin via une variable `--flou`). Dans l'autre ordre,
Lightning CSS ne garde que le préfixe et Chrome n'affiche aucun flou.
Scène épinglée à plusieurs moments : les liens d'un moment effacé reçoivent
`pointer-events: none` (coupés à sa sortie, rendus à son entrée), sinon un clic ou un
toucher sur la scène part vers un lien invisible.

## Gestes d'interface (actifs aussi en mouvement réduit et sans GSAP)

| Attribut | Options | Mouvement réduit | Téléphone | Quand l'utiliser |
|---|---|---|---|---|
| `data-header="#hero"` | valeur = bloc après lequel l'en-tête devient plein (`.is-solide`) | plein après le hero, ne se cache jamais | idem | toujours. L'en-tête se cache en descendant et revient au focus clavier. Ne pas mettre d'utilitaire de couleur dessus : le CSS des états s'en charge. |
| `data-sticky-cta="#ancre"` | `data-hide-on=".a, #b"` (cachée tant que ces blocs sont à l'écran) · `data-sticky-pause="#id"` (cachée pendant leur épinglage) | identique | c'est son terrain (`md:hidden` côté page) | landing qui vend : action toujours à portée du pouce. Masquer sur l'offre, l'appel final et le pied de page. |
| `details[data-accordion]` | `name="faq"` = un seul ouvert · `[data-accordion-body]` glisse à l'ouverture | ouverture sèche | idem | FAQ, détails d'offre. Natif, donc clavier (Entrée, Espace) et lecteurs d'écran inclus. |
| `data-odometer="12,50"` | `data-odometer-suffix=" €"` (lu par les lecteurs d'écran) · `window.gestes.odometre(el, "11,25")` pour changer | chiffres posés sans rouler | idem | prix qui change (mois/an, quantité). |
| `data-counter="1950"` | `data-counter-decimals`, `-prefix`, `-suffix`, `-duration`, `data-counter-group="false"` (années) | valeur finale affichée | idem | chiffres de preuve. Toujours un chiffre réel, au format fr-FR « 1 950 ». |
| `data-bar="0.42"` | valeur de 0 à 1 | barre à sa valeur finale | idem | comparaison avant/après, part d'un total. |
| `data-live-rate="0.18"` | par seconde, mêmes options de format que `data-counter` | identique (information, pas décor) | idem | coût ou gain qui court pendant la lecture. |
| `data-bg="#1a120d" data-fg="#fffdf8"` | fond et couleur de texte | fond posé, sans fondu | idem | section sombre ou de couleur. Le texte n'est jamais lu sur un fond pas encore basculé. |
| `<model-viewer>` | voir « Objet 3D » plus bas | orbite de repos fixe | idem | produit physique à faire tourner. |
| `canvas[data-sequence="…/f-{i}.webp"][data-frames="61"]` | `{i}` sur 4 chiffres (`0001`) | première image | idem | geste de fabrication filmé en images (dans une étape de `data-steps`). Chargé par lots de 6. Seule, elle est épinglée sur 200 % ; `data-sequence-pilotee` : gestes.js la laisse à un script de la page (cadrage, calendrier propres, ex. `commerce-flacon/scene.js`). |

## Gestes de mouvement

En mouvement réduit, aucun de ces gestes ne tourne : tout est visible à sa place finale, sans épinglage.

| Attribut | Options | Téléphone | Quand l'utiliser |
|---|---|---|---|
| `data-intro` | — | idem | éléments du premier écran : apparaissent au chargement, en cascade, jamais au défilement. |
| `data-split="lines\|words"` | `data-split-scrub="0.5"` (s'allume en lisant, valeur = opacité de départ) · `data-split-delay` | idem | titres de section (`lines`), manifeste lu au défilement (`words` + `scrub`). Les masques ne coupent pas les accents des capitales. |
| `data-reveal="0.2"` | valeur = délai · `data-reveal-group` + `data-reveal-item` : cascade | idem | paragraphes, cartes, listes. Le geste par défaut. |
| `data-image-reveal` | — | idem | image éditoriale à dévoiler (masque et léger zoom arrière). |
| `data-parallax="0.15"` | fraction de la hauteur | idem | image de fond d'une section ou d'un appel final. Rester sous 0.2. |
| `data-hero-pin` | `[data-hero-media]` passe de la carte au plein cadre | épinglage plus court | hero produit : on part d'une carte, on entre dans l'image. |
| `data-hero-pin="shrink"` | `[data-hero-fade]` s'efface vite · `[data-hero-zoom]` (sinon les img/video du média) zoome | 55 % au lieu de 90 % | hero plein cadre qui se resserre en carte. Le h1 reste toujours sous l'en-tête. |
| `data-grow` | — | idem | image qui passe de la carte au plein écran, sans épinglage. |
| `data-steps="50"` | % de défilement par étape · `[data-step]` `[data-step-media]` `[data-step-bar]` `[data-step-progress]` `[data-step-count]` · `data-steps-mobile="stack"` · `data-steps-reduit="dernier"` (sans épinglage, seul le dernier média reste, pas la grille 2 × 2) | avec `stack` : pas d'épinglage, étapes empilées (`.steps-empile`) | méthode, processus en 3 à 5 étapes. Un `canvas[data-sequence]` dans une étape est joué par la frise. Un média sans image, canvas ni vidéo (fiche HTML) entre en fondu, sans zoom. Fiche qui se remplit en plusieurs états : `data-steps-reduit="dernier"`. |
| `data-hscroll` | `[data-hscroll-track]` · `data-hscroll="all"` épingle aussi sur téléphone | glisser natif (scroll-snap) sous 768 px | galerie, gamme, réalisations (4 à 8 cartes). |
| `data-trace="1.5"` | écrans d'épinglage · `[data-trace-wipe="0,0.8"]` `[data-trace-note="0.4"]` `[data-trace-out]` · `data-trace-labels="S-8,…"` | idem | courbe ou parcours raconté (B2B : avant/après, délai). |
| `data-video-scrub` | — | idem | vidéo courte dont le défilement pilote la lecture. |
| `data-marquee="35"` | secondes par tour · `data-marquee-scroll` (suit vitesse et sens du défilement) · `[data-marquee-toggle]` fourni, sinon bouton injecté · `data-marquee-pause="false"` : aucun bouton | idem | bande de mots-clés, logos clients. Le bouton pause est obligatoire (WCAG 2.2.2) : on ne le retire pas. |
| `data-live-jitter="2.14"` | `data-live-amp="0.06"` | idem | mesure « vivante » d'un tableau de bord (B2B). |
| `<model-viewer data-model-scroll="360">` | `data-model-start`, `data-model-phi`, `data-model-repos`, `data-model-lock` · `[data-model-scene][data-model-pin]` épingle la scène · `[data-model-note]` (+ `[data-model-line]`) | réagit au défilement, pas à la souris | objet 3D qui tourne au défilement, avec annotations. Compte comme un épinglage s'il est épinglé. |
| `data-magnetic="0.25"` | force | désactivé (tactile) | bouton d'action principal, une ou deux fois par page. |
| `data-tilt="8"` | degrés | désactivé | cartes de galerie, produit. |
| `data-cursor` + `data-cursor-label="Voir"` | `.curseur-rond` dans la page | désactivé | galerie ou réalisations cliquables. |
| `data-follow-list` + `data-follow-img="url"` | défaut : image calée dans la marge droite de la liste, ne suit que le y · `data-follow-list="curseur"` : suit le curseur | désactivé (la liste reste une liste) | liste de lieux, services, projets avec une image chacun. Se cache quand on défile. |
| `[data-depth="0.04"]` dans `[data-depth-scene]` | force par couche | désactivé | illustration en couches qui suit la souris (hero, 404). |

Événement : chaque section épinglée émet `progression` (`detail` de 0 à 1), par exemple pour une jauge propre à la page.

## Quel geste pour quelle section

| Section | Geste conseillé | Alternative | À éviter |
|---|---|---|---|
| En-tête | `data-header` | — | couleurs fixes dans le balisage |
| Hero (obligations : `niveau-agence.md` § 2 ter) | `data-hero-pin="shrink"` + `data-intro` | `data-hero-pin` (carte → plein cadre), `data-depth-scene` | `data-reveal` (attend le défilement) |
| Bande de mots-clés / logos | `data-marquee` + `data-marquee-scroll` | — | bande sans bouton pause |
| Manifeste, promesse | `data-split="words"` + `data-split-scrub` | `data-split="lines"` | plusieurs paragraphes en scrub |
| Méthode, processus | `data-steps` + `data-steps-mobile="stack"` | `data-trace` (B2B, chiffres dans le temps) | plus de 5 étapes |
| Galerie, gamme | `data-hscroll` + `data-tilt` + `data-cursor-label` | grille + `data-reveal-group` | `data-hscroll="all"` si les cartes sont hautes |
| Section sombre, lieu | `data-bg`/`data-fg` + `data-grow` ou `data-parallax` | `data-follow-list` | texte posé sur une photo sans voile |
| Preuves | `data-counter` + `data-bar` + `data-reveal-group` | `data-live-rate` (coût qui court) | chiffres inventés |
| Produit 3D | `<model-viewer data-model-scroll>` + `data-model-note` | `canvas[data-sequence]` | 3D sans image de repli |
| Offre, prix | `data-odometer` + `data-reveal` | — | épinglage |
| FAQ | `details[data-accordion]` | — | accordéon en JS maison |
| Appel final | `data-parallax` + `data-magnetic` | `data-split="lines"` | — |
| Téléphone | `data-sticky-cta` + `data-hide-on` | — | barre visible sur l'offre ou le pied de page |

## Au-delà des gestes : éléments et fonds de hero

Pour un moment signature plus spectaculaire que les gestes `data-*`, voir [`../elements/README.md`](../elements/README.md) (42 éléments autonomes), [`../fonds-hero/README.md`](../fonds-hero/README.md) (14 fonds animés) et [`../elements-3d/README.md`](../elements-3d/README.md) (12 éléments Three.js avec repli sans WebGL). Ils suivent les mêmes règles : pause visible, arrêt hors écran, mouvement réduit. Un fond animé est l'unique « grand mouvement » du hero ; *Lettres qui s'envolent*, *Pilule qui s'ouvre*, *Index de projets*, *Mise au point mot à mot* et *Processus au viseur* comptent chacun dans la limite de trois épinglages. Pour GSAP, lire [`../elements/gsap-bonnes-pratiques.md`](../elements/gsap-bonnes-pratiques.md).
