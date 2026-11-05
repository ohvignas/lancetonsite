# GSAP : bonnes pratiques du kit

Fiche de règles, sans démo. Résumé et réécrit par nous à partir des skills officiels [greensock/gsap-skills](https://github.com/greensock/gsap-skills) (licence MIT, GreenSock 2026 : `gsap-core`, `gsap-timeline`, `gsap-scrolltrigger`, `gsap-plugins`, `gsap-utils`, `gsap-performance`) et de la [documentation GSAP](https://gsap.com/docs/v3/). Démos qui les appliquent : `gsap-splittext`, `gsap-flip`, `gsap-morphsvg`, `gsap-drawsvg`, `gsap-scrollsmoother`, `gsap-observer` (même dossier).

## 1. Licence (vérifiée le 5 novembre 2026)

- **Sources lues** : la page [gsap.com/standard-license](https://gsap.com/standard-license) (« Standard "No Charge" GSAP License », en vigueur le 30 avril 2025, modifiée le 30 mai 2025, © Webflow) et le paquet npm `gsap@3.15.0` : `package.json` indique `"license": "Standard 'no charge' license: https://gsap.com/standard-license."`, chaque fichier porte « Copyright 2026, GreenSock. All rights reserved. Subject to the terms at https://gsap.com/standard-license » ; le README annonce GSAP « 100% FREE », plugins compris. Le paquet n'a pas de fichier LICENSE.
- **Ce qui est permis** : utiliser, reproduire et intégrer GSAP **et tous ses plugins** (SplitText, MorphSVG, DrawSVG, ScrollSmoother, Flip, Observer, Inertia…) dans tout site ou application, **commercial compris**, sans abonnement, sans clé, sans registre privé. La FAQ de la page précise que le code GSAP généré par une IA n'est pas un usage interdit.
- **Ce qui est interdit** : (1) l'usage dans un **outil qui permet de construire des animations visuelles sans code** et qui concurrence les capacités d'animation visuelle de **Webflow**, sans accord écrit ; (2) la rétro-ingénierie de GSAP pour créer un tel produit concurrent ; (3) retirer ou modifier les mentions de propriété des fichiers.
- **À retenir** : ce n'est **pas** une licence open source (pas MIT, pas de redistribution libre du code modifié). Webflow peut modifier la licence ; les versions déjà publiées restent sous leurs termes. L'ancien résumé « gratuit tant que l'utilisateur final ne paie pas » est retiré de la page (resté en commentaire HTML) : il ne s'applique plus.
- **Pour Lance ton site** : générer des sites avec GSAP pour des clients est un usage permis. Le plugin produit du code, il n'est pas un éditeur visuel d'animation ; s'il devenait un jour un outil visuel « sans code » d'animation, relire la clause « Prohibited Uses ».
- Les skills eux-mêmes (texte des `SKILL.md`) sont sous **MIT** : on peut les citer ; ici on les résume avec nos mots.

## 2. Charger GSAP

- CDN jsdelivr, **version exacte**, jamais `@3` ni `latest` : `https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/<Fichier>.min.js`. Le kit est sur **3.15.0** (`prototype/index.html`, `gestes.js`).
- Fichiers vérifiés à 3.15.0 (HTTP 200, poids gzip) : `gsap` 28,4 Ko · `ScrollTrigger` 18,0 · `SplitText` 3,7 · `Flip` 9,7 · `MorphSVGPlugin` 9,6 · `DrawSVGPlugin` 2,2 · `ScrollSmoother` 5,5 · `Observer` 4,3. Observer est déjà inclus dans ScrollTrigger (`ScrollTrigger.observe()`).
- Ordre : `gsap.min.js`, puis les plugins, puis le script de la page. Pas de `.npmrc`, pas de jeton, pas de `npm.greensock.com` : consignes périmées.
- Ne charger que les plugins utilisés. Une page avec `gestes.js` a déjà gsap + ScrollTrigger + SplitText : n'ajouter que le plugin manquant.

## 3. Enregistrer les plugins

- `gsap.registerPlugin(ScrollTrigger, SplitText, …)` **une fois**, avant tout usage, après avoir vérifié qu'ils existent (`if (!window.gsap || !window.Flip) …` → repli).
- `gestes.js` le fait déjà pour ScrollTrigger et SplitText ; un script de page qui ajoute Flip enregistre Flip lui-même.

## 4. Nettoyage : `gsap.context()` et `gsap.matchMedia()`

- Tout ce qui est créé dans `gsap.matchMedia().add(requête, () => { … })` (tweens, timelines, ScrollTrigger, SplitText, ScrollSmoother) est **annulé tout seul** quand la requête cesse d'être vraie. C'est l'outil pour les points de rupture **et** pour le mouvement réduit.
- Conditions nommées : `mm.add({ grand: "(min-width: 768px)", petit: "(max-width: 767px)" }, (ctx) => { const { grand } = ctx.conditions; … })`.
- Ne pas mettre un `gsap.context()` dans un `matchMedia` (il en crée un). Hors React/Vue, une page statique n'a besoin de `gsap.context()` que pour un composant qu'on retire du DOM (`ctx.revert()`).
- SPA ou composant démonté : `ScrollTrigger.getAll().forEach(t => t.kill())` ou `ctx.revert()`.

## 5. Mouvement réduit et repli

- Règle du kit : **état final, rien ne bouge seul**. Deux façons : `matchMedia("(prefers-reduced-motion: no-preference)")` autour des animations (SplitText, ScrollSmoother), ou `if (reduit) return etatFinal()` (gestes.js, DrawSVG, Observer).
- Un **contrôle** reste utilisable en mouvement réduit : le filtre Flip filtre, sans transition ; le survol MorphSVG change la forme, sans fondu.
- **GSAP absent** (CDN bloqué) : la page doit être entière. Rien n'est caché en CSS en attendant GSAP, sauf l'anti-flash borné (`js-attente`, levé à 2,5 s au plus). Les états initiaux (`drawSVG: 0`, `yPercent: 100`) sont posés **par le JS**, jamais par la feuille de style.
- Ce qui bouge seul plus de 5 s : bouton pause visible, arrêt hors écran (`IntersectionObserver`) et onglet caché (`visibilitychange`).

## 6. Quoi animer

- `x`, `y`, `xPercent`, `yPercent`, `scale`, `rotation`, `opacity` / `autoAlpha` : rien d'autre pour bouger un bloc. Pas de `top`, `left`, `width`, `height`, `margin` pour un déplacement. Exceptions assumées : Flip en bascule de vue (largeur et hauteur de cartes), DrawSVG (`stroke-dashoffset`), MorphSVG (`d` d'un petit SVG).
- `autoAlpha` met `visibility: hidden` à 0 : **ne pas** l'utiliser sur un élément qui contient un lien ou un bouton qu'on veut garder dans l'ordre de tabulation pendant l'apparition (`gestes.js` utilise `opacity` pour cette raison).
- `will-change: transform` seulement sur ce qui bouge vraiment.
- Séquencer avec une **timeline** et le paramètre de position (`"<"`, `"-=0.2"`, labels), pas avec des `delay` en chaîne ; `defaults` sur la timeline.
- `from()` / `fromTo()` sur la même propriété deux fois : `immediateRender: false` sur le second.

## 7. ScrollTrigger

- `scrollTrigger` sur la **timeline** ou un tween de premier niveau, jamais sur un tween dans une timeline.
- `scrub` **ou** `toggleActions`, pas les deux. Défilement horizontal simulé : `ease: "none"` obligatoire.
- **Ordre** : créer les déclencheurs du haut vers le bas de la page, sinon `refreshPriority`. `gestes.js` appelle `ScrollTrigger.sort()` avant chaque `refresh()`.
- **refresh** : automatique au redimensionnement (anti-rebond 200 ms). À appeler soi-même après un changement de mise en page : polices chargées (`document.fonts.ready`), images, contenu ajouté. `gestes.js` le fait au `load` et à `fonts.ready`.
- **Épinglage** : épingler un enveloppant et animer ses enfants, jamais l'élément épinglé lui-même. **3 épinglages au plus par page** (règle du kit, `GESTES.md`) : `data-hero-pin`, `data-steps`, `data-hscroll`, `data-trace`, `data-model-pin`, *Lettres qui s'envolent*, le diaporama `gsap-observer`. Pour une carte qui reste à l'écran sans compter, `position: sticky` en CSS (démo `gsap-drawsvg`), sauf sous ScrollSmoother.
- **Markers** : `markers: true` seulement en développement. Astuce du kit : `markers: new URLSearchParams(location.search).has("reperes")`, jamais livré activé.
- `once: true` pour une apparition qui ne rejoue pas ; `ScrollTrigger.batch()` pour faire apparaître une grille de cartes par paquets (un seul `gsap.to` par paquet au lieu d'un ScrollTrigger par carte animé séparément).

## 8. Plugins (repères rapides)

- **SplitText** : `autoSplit: true` et animation créée **dans** `onSplit()` et **renvoyée** (resynchronisée à chaque redécoupe). `mask: "lines"` pour les révélations. Ne découper que le nécessaire. Pas de `text-wrap: balance`. `aria: "auto"` (défaut) : `aria-label` sur l'élément, `aria-hidden` sur les morceaux ; sur un paragraphe, préférer `aria: "hidden"` + copie masquée.
- **Flip** : `getState()` → changement du DOM → `Flip.from()` ; `absolute: true` pour un filtre, `onEnter` / `onLeave` pour les entrées et sorties.
- **MorphSVG** : tracés fermés ; `type: "rotational"` ou `shapeIndex` si la forme se retourne ; `convertToPath()` pour cercle et rectangle.
- **DrawSVG** : il faut un `stroke` visible ; préférer un seul `<path>`.
- **ScrollSmoother** : une instance, structure `#smooth-wrapper > #smooth-content`, éléments fixes dehors, plus de `position: sticky` dedans, **jamais avec Lenis** (voir sa fiche).
- **Observer** : `preventDefault` seulement pendant une capture qu'on sait relâcher ; jamais le clavier.
- **GSDevTools** : développement uniquement.

## 9. Performance

- `gsap.quickTo(el, "x", { duration })` pour ce qui suit la souris (`gestes.js` : magnétique, inclinaison, curseur, liste à image) ; `gsap.quickSetter(el, "x")` quand la valeur doit être posée telle quelle à chaque image, sans interpolation (tête du tracé `gsap-drawsvg`).
- `stagger` plutôt que N tweens avec délais ; réutiliser une timeline plutôt que d'en créer une par événement.
- **lagSmoothing** : par défaut GSAP « saute » le temps perdu après un gel. Avec Lenis branché sur le ticker GSAP, `gestes.js` fait `gsap.ticker.lagSmoothing(0)` pour que défilement et animations restent alignés ; ne pas le changer ailleurs.
- `scrub: 0.5` à `1` lisse le travail au défilement ; ne pas appeler `refresh()` à chaque redimensionnement (déjà fait, avec anti-rebond).
- Arrêter ce qui ne se voit pas (hors écran, onglet caché) et tuer ce qui est retiré du DOM.

## 10. Comment `prototype/gestes.js` applique ces règles

| Règle | Dans `gestes.js` | Écart ou à surveiller |
|---|---|---|
| Version exacte, ordre de chargement | 3.15.0 jsdelivr dans `index.html`, puis Lenis, puis `gestes.js` | l'en-tête du fichier dit « GSAP 3.13+ » : minimum requis (SplitText `onSplit`), la version chargée est 3.15.0 |
| Enregistrement | `gsap.registerPlugin(ScrollTrigger, SplitText?)` après test d'existence | conforme |
| Repli sans GSAP | `if (!gsap \|\| !ScrollTrigger) return etatFinal()` + classe `motion-reduit` | conforme |
| Mouvement réduit | `if (reduit) return etatFinal()` au chargement | le changement de réglage **pendant** la visite n'est pas suivi (il faudrait `matchMedia` : accepté, cas rare) |
| `matchMedia` | narrations épinglées dans `mm.add({ grand, petit })`, annulées au changement de point de rupture | conforme |
| Transforms seulement | `y`, `yPercent`, `scale`, `clipPath` (révélations), `opacity` | `clipPath` repeint : réservé aux images et cartes, assumé |
| SplitText | `autoSplit`, animation renvoyée par `onSplit`, masques agrandis pour les accents | conforme au skill |
| Ordre et refresh | créés dans l'ordre du DOM, `ScrollTrigger.sort()` + `refresh()` au `load` et à `fonts.ready` | conforme |
| 3 épinglages | règle écrite dans `GESTES.md` | non contrôlée par le code : à vérifier à la relecture de chaque maquette |
| quickTo | magnétique, inclinaison, curseur, liste à image, profondeur | conforme |
| lagSmoothing | `lagSmoothing(0)` seulement si Lenis tourne | conforme |
| Markers | aucun | conforme |
| Lenis vs ScrollSmoother | Lenis créé dès que `window.Lenis` existe | une page ScrollSmoother ne doit **pas** charger Lenis |
| batch | apparitions en `ScrollTrigger` individuels `once: true` | possible amélioration : `ScrollTrigger.batch()` pour `data-reveal-group` sur de longues grilles |

## Liens

- Skills officiels : <https://github.com/greensock/gsap-skills> (copie locale : `~/.claude/plugins/cache/gsap-skills/gsap-skills/1.0.0/skills/`)
- Licence : <https://gsap.com/standard-license>
- Documentation : <https://gsap.com/docs/v3/> · ScrollTrigger : <https://gsap.com/docs/v3/Plugins/ScrollTrigger/> · plugins : <https://gsap.com/docs/v3/Plugins/>
- Étude : `../etude/gsap-skills.md`
