# Diaporama plein écran au geste (Observer)

apercu: gsap-observer.html?apercu

Élément · démo : [`gsap-observer.html`](gsap-observer.html) · captures : `captures/gsap-observer-1440.png`, `-375.png`, `-1440-reduit.png`

- **Technique** : GSAP 3.15.0 + Observer (`type: "wheel,touch"`, `wheelSpeed: -1`, `preventDefault`) + ScrollTrigger (épinglage court qui ouvre et ferme la capture)
- **Poids** : démo 13,4 Ko (4,8 Ko gzip) + gsap 28,4 Ko, ScrollTrigger 18,0 Ko, Observer 4,3 Ko gzip (≈ 51 Ko). Observer est aussi inclus dans ScrollTrigger (`ScrollTrigger.observe()`) : si la page charge ScrollTrigger, on peut se passer d'`Observer.min.js`.
- **Inspiré de** : skill officiel `gsap-plugins` (Observer) de [greensock/gsap-skills](https://github.com/greensock/gsap-skills), [doc Observer](https://gsap.com/docs/v3/Plugins/Observer/) et le principe « capturer le geste pendant l'épinglage » des démos GSAP. Code écrit par nous ; artistes et photos : `exemples/festival-tole/`.

## Licence

GSAP et Observer : [licence standard GSAP](https://gsap.com/standard-license) (Webflow). Usage commercial gratuit ; interdit dans un outil visuel d'animation concurrent de Webflow. Voir [`gsap-bonnes-pratiques.md`](gsap-bonnes-pratiques.md).

## Quand l'utiliser

Programme, lancement de produit, portfolio : 3 à 6 écrans qu'on veut voir un par un. Compte pour **un épinglage** (sur trois). Jamais pour du contenu qu'on doit pouvoir parcourir vite (FAQ, tarifs).

## Comment le défilement n'est pas piégé

- Le geste (molette, doigt) n'est capturé que quand la section remplit l'écran (`onEnter` / `onEnterBack` de l'épinglage).
- À la dernière diapositive, un geste de plus vers le bas rend la main et fait sortir la page de la section ; même chose vers le haut à la première. Vérifié : 4 crans de molette → diapositives 2 à 5, le cran suivant → la page reprend son défilement.
- **Le clavier n'est jamais capturé** : ↑ ↓ Espace Page suivante font défiler la page (vérifié : PageDown sort de la section) ; ← → changent de diapositive quand la piste des diapositives (ou un bouton de la section) a le focus.
- Lien d'évitement « Passer le programme » au premier Tab, boutons ← → et pastilles numérotées toujours visibles.

## Brancher dans une maquette

1. Copier le bloc « à copier », la section `[data-diapo]` et le `<script>`.
2. Une diapositive = un `<li class="diapo-vue">` (texte + image) ; garder `aria-label="n sur N"`.
3. Textes depuis `05-contenus/`, photos depuis `07-medias/` ; variables sur `06-design-system/`.
4. Vérifier avec `../verifier-elements.cjs gsap-observer`.

## Variables

| Variable | Défaut | Rôle |
|---|---|---|
| `--di-encre` | `#0e0e0c` | fond |
| `--di-papier` | `#e8e6e1` | texte (15,5:1) |
| `--di-accent` | `#ec4c26` | pastille active, focus, lien d'évitement |
| `--di-gris` | `#a9a59c` | horaires, bordures (7,9:1) |

Transition 0,85 s `power3.inOut` : la nouvelle diapositive monte (`yPercent`), son image fait un contre-mouvement, l'ancienne recule de 30 %. `tolerance: 12` px avant de déclencher, puis 250 ms de repos après chaque transition, prolongé de 200 ms à chaque cran reçu pendant la transition ou le repos : l'inertie d'un pavé tactile (rafale de 30 petits crans) ne fait passer qu'une diapositive.

## Prompt pour le régénérer

> Écris une section plein écran de 5 diapositives (texte à gauche, photo à droite, empilées sur téléphone) avec GSAP 3.15.0, ScrollTrigger et Observer. Un épinglage court (`end: "+=120"`) ouvre la capture à l'entrée (`onEnter`/`onEnterBack`) : un Observer sur `window`, `type: "wheel,touch"`, `wheelSpeed: -1`, `preventDefault: true`, change de diapositive (montée en `yPercent` 0,85 s, contre-mouvement de l'image). Au bout de la liste, le geste suivant désactive l'Observer et fait sortir la page de la section dans le sens du geste. Le clavier n'est jamais capturé : ← → sur la piste focalisable (pas la section, pour que le lien d'évitement reste le premier Tab), ↑ ↓ défilent la page. Temps de repos de 250 ms après chaque transition, prolongé tant que des crans arrivent (inertie du pavé tactile). Boutons précédent/suivant et pastilles `aria-current`, diapositives cachées en `inert`, `aria-roledescription="carrousel"`, lien d'évitement. Sans GSAP ou en mouvement réduit : les diapositives empilées, sans épinglage ni boutons.

## Accessibilité

Section `aria-roledescription="carrousel"`, diapositives `role="group"` « n sur 5 », celles qui sont cachées en `inert` (hors clavier et lecteurs d'écran). Boutons de 44 px, `aria-current` sur la pastille active, focus visible. Rien ne défile seul : pas de bouton pause nécessaire.

Ordre de tabulation réel (vérifié le 5 novembre 2026) : 1. « Passer le programme » (lien d'évitement, visible au focus) ; 2. la piste des diapositives (`tabindex="0"`, nom « Artistes : flèches gauche et droite pour changer », anneau orange) ; 3. « Artiste précédent » ; 4. pastilles 01 à 05 ; 5. « Artiste suivant ». Un lien ajouté dans une diapositive viendrait entre 2 et 3, seulement pour la diapositive active (les autres sont `inert`). Horaires après minuit écrits « Nuit du ven. 02 · 01:10 » : à faire valider par le festival.

## Mouvement réduit

Ni épinglage ni capture : les cinq artistes les uns sous les autres, comme une liste. Même rendu sans GSAP.

## Performance

`transform` uniquement ; une seule transition à la fois (`enCours`). L'Observer est désactivé hors de la section : aucun écouteur actif ailleurs. Images après la première en `loading="lazy"`.
