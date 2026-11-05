# Étude : skills officiels GSAP (greensock/gsap-skills)

Étude du 5 novembre 2026, pour la bibliothèque d'éléments de Lance ton site.

## Sources consultées

| Source | Accès | Contenu |
|---|---|---|
| [github.com/greensock/gsap-skills](https://github.com/greensock/gsap-skills), copie locale 1.0.0 (`~/.claude/plugins/cache/gsap-skills/…/skills/`) | libre, licence MIT (GreenSock 2026) | 8 `SKILL.md` : gsap-core, gsap-timeline, gsap-scrolltrigger, gsap-plugins, gsap-utils, gsap-performance (+ gsap-react, gsap-frameworks, non retenus : le kit est en HTML statique). Pas de dossier de références : chaque skill tient en un fichier. |
| [gsap.com/standard-license](https://gsap.com/standard-license) | libre | licence Webflow du 30 avril 2025, modifiée le 30 mai 2025 |
| `gsap@3.15.0` sur jsdelivr (`package.json`, `README.md`, en-têtes des fichiers `dist/`) | libre | champ `license`, mentions de copyright, liste des fichiers |
| Docs GSAP (SplitText, Flip, MorphSVG, DrawSVG, ScrollSmoother, Observer) | libre | options citées dans les fiches |

## Ce que disent les skills

- **gsap-core** : `to` / `from` / `fromTo` / `set`, propriétés en camelCase, alias de transform (`x`, `yPercent`, `rotation`…) plutôt que la chaîne `transform`, `autoAlpha` pour les fondus, `immediateRender` piège des `from()` empilés, `gsap.matchMedia()` pour points de rupture et mouvement réduit (annulation automatique), pas de `context()` dans un `matchMedia`.
- **gsap-timeline** : séquencer en timeline avec paramètre de position et labels, `defaults` sur la timeline, ScrollTrigger seulement au premier niveau.
- **gsap-scrolltrigger** : `registerPlugin`, `start`/`end`, `scrub` ou `toggleActions` (pas les deux), épingler un enveloppant, `markers` en développement seulement, `batch()`, `scrollerProxy()` pour une bibliothèque de défilement tierce, `containerAnimation` avec `ease: "none"`, créer de haut en bas ou `refreshPriority`, `refresh()` après chaque changement de mise en page.
- **gsap-plugins** : tous les plugins sont gratuits depuis le rachat par Webflow, plus de jeton ni de registre privé ; mémo de chaque plugin (SplitText `autoSplit` + `onSplit`, `aria`, `mask` ; Flip ; MorphSVG `type`, `shapeIndex`, `smooth` ; DrawSVG ; ScrollSmoother et sa structure ; Observer ; GSDevTools jamais en production).
- **gsap-utils** : `clamp`, `mapRange`, `normalize`, `interpolate`, `random` (forme fonction avec `true`), `snap`, `wrap`, `distribute`, `toArray`, `pipe` ; forme « fonction » quand on omet la valeur.
- **gsap-performance** : transforms et opacité, `will-change` ciblé, `quickTo` pour la souris, `stagger` plutôt que N tweens, arrêter l'invisible, `refresh()` avec parcimonie.

## Ce qu'on en retient pour le kit

| Repéré dans les skills | Règle ou technique | Notre fichier |
|---|---|---|
| Plugins gratuits, licence Webflow | licence vérifiée à la source, citée dans chaque fiche | `elements/gsap-bonnes-pratiques.md` § 1 |
| `matchMedia` annule tout | mouvement réduit et points de rupture par `matchMedia` | `gsap-splittext`, `gsap-scrollsmoother` |
| SplitText `autoSplit` + animation renvoyée par `onSplit` | redécoupe au redimensionnement sans casser l'animation | `gsap-splittext` (déjà dans `gestes.js`) |
| SplitText `aria: "auto"` | vérifié : `aria-label` sur le titre, 21 morceaux `aria-hidden` | `gsap-splittext.md` |
| Flip getState → DOM → from, `onEnter` / `onLeave` | filtre et bascule grille/liste animés | `gsap-flip` |
| MorphSVG `type: "rotational"` | morph goutte → feuille → flamme sans retournement | `gsap-morphsvg` |
| DrawSVG + `scrub` | itinéraire dessiné au défilement, synchronisé étape par étape | `gsap-drawsvg` |
| `markers` en dev seulement | `?reperes` dans l'adresse | `gsap-drawsvg` |
| `quickSetter` / `quickTo` | tête de tracé ; suivi souris (déjà dans `gestes.js`) | `gsap-drawsvg` |
| ScrollSmoother : structure imposée | avertissement coût, une instance, conflit Lenis | `gsap-scrollsmoother.md` |
| Observer pour molette et toucher | diaporama qui capture le geste puis rend la main ; clavier jamais capturé | `gsap-observer` |
| ScrollTrigger au premier niveau, ordre de création, `refresh` | tableau de conformité de `gestes.js` | `gsap-bonnes-pratiques.md` § 10 |

## Vérification

- `verifier-elements.cjs gsap-` : **6/6 OK** (0 erreur console, aucun débordement à 1440 et 375, mouvement réduit fixe, mode aperçu branché).
- Script Playwright à nous (défilement, molette, clic, clavier, tactile 375, GSAP bloqué) : SplitText redécoupe 4 → 6 lignes en colonne étroite ; Flip annonce « 5 produits · pains », marche au clavier et sans GSAP ; MorphSVG figé après pause, relancé ensuite ; DrawSVG allume les arrêts en phase avec la liste ; ScrollSmoother actif à la souris, absent sur tactile et en mouvement réduit, Tab amène le lien du bas à l'écran ; Observer : la molette fait défiler les 5 diapositives, le cran suivant rend la main à la page, PageDown jamais capturé.

## Pas retenu, et pourquoi

- **gsap-react, gsap-frameworks** : le kit produit du HTML statique ; à relire si une maquette passe en React (hook `useGSAP`).
- **Inertia, Draggable, MotionPath, Physics, ScrambleText, CustomEase** : pas demandés ici ; Draggable + Inertia seraient utiles pour un carrousel à lancer au doigt (piste suivante).
- **`normalizeScroll`** (ScrollTrigger) : corrige des cas mobiles mais détourne le défilement natif ; pas nécessaire dans nos démos.
- **ScrollSmoother comme défaut du kit** : non. Lenis (déjà dans `gestes.js`) est plus léger et garde `position: sticky` ; ScrollSmoother reste une option de page vitrine.
- Aucun code des skills ni des démos GSAP n'est recopié : textes résumés et code écrit par nous.

## Reste à faire

- Fusionner les six éléments dans `elements/README.md` (réservé à la session principale).
- Éventuellement : `ScrollTrigger.batch()` pour `data-reveal-group` dans `gestes.js`, et suivi du mouvement réduit en cours de visite.
