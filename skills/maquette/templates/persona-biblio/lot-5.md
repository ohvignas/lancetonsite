# Lot 5 : avis du client (GSAP et micro-interactions)

Date : 5 novembre 2026. Testé dans Chrome (Playwright), sur `http://127.0.0.1:4330/…/elements/<nom>.html` et `?apercu`, à 1440 × 900 et 375 × 812 (tactile), en mouvement réduit et avec le CDN jsdelivr bloqué. J'ai cliqué, survolé, tabulé, fait défiler à la molette et au doigt (CDP). Je n'ai modifié aucun fichier de la bibliothèque. Mes captures sont dans `persona-biblio/captures-lot-5/`.

Grille : beauté et finition /40, utilité réelle /20, accessibilité, mouvement réduit et repli /20, fiche et prompt /20.

| élément | note | 25 000 € ? | médias utiles ? |
|---|---|---|---|
| gsap-splittext | 85 | Pas encore | Non |
| gsap-flip | 88 | Oui | Un peu : une vraie brioche tressée, toute la série sous la même lumière |
| gsap-morphsvg | 61 | Pas encore | Non (dessiner de meilleurs tracés, pas d'images) |
| gsap-drawsvg | 82 | Pas encore | Oui, moyen : un fond de carte illustré |
| gsap-scrollsmoother | 80 | Pas encore | Oui, si on garde les légendes : de vraies photos de charpente et de verrière |
| gsap-observer | 86 | Oui | Non |
| micro-anime | 79 | Pas encore | Oui : des sachets étiquetés |
| micro-mojs | 73 | Pas encore | Non |

Ce qui revient dans tout le lot : les six démos GSAP suivent bien `gsap-bonnes-pratiques.md` (version exacte 3.15.0, plugins enregistrés après avoir vérifié qu'ils existent, `matchMedia`, transforms seulement, repères de debug derrière `?reperes`). J'ai pourtant trouvé deux vrais bugs que les fiches présentent comme vérifiés : MorphSVG tourne tout seul en mouvement réduit, et DrawSVG ne finit jamais son tracé en mode `?apercu`. Les deux micro-interactions se dégradent bien quand le CDN est **bloqué**, mais pas quand il est **lent** : leurs boutons attendent la bibliothèque.

---

## 1. gsap-splittext : titre révélé par lignes puis mots, 85/100

Beauté 32 · utilité 17 · accessibilité 18 · fiche 18

**Ce que j'ai vu.** À l'arrivée, c'est très beau (`split-1440-fin.png`) : la Bricolage 760 couleur crème sur fond croûte, « chaque matin » couleur blé. Mais j'ai suivi l'apparition image par image et pendant les 600 premières millisecondes, les lignes ne sont pas les bonnes (`split-seq-5.png`, `split-1440-t0.png`) : « chaque » est seul sur sa ligne, « matin depuis 1987, des » passe sur la suivante, puis tout est redécoupé vers 1 s (journal : coupe 1 vers 400 ms, coupe 2 vers 1 000 ms, les deux avec les polices déjà chargées). En plein geste d'ouverture, le titre change de mise en page. Pour un hero, c'est exactement la seconde qui compte.

Cause : la ligne 30, `.ouverture .revele-titre { max-width: 16ch; transition: max-width .4s ease; }`. La largeur en `ch` change à l'arrivée de la police, la transition l'anime pendant 0,4 s, et `autoSplit` découpe une première fois puis redécoupe.

Le reste est bon : `aria-label` = la phrase entière, 21 morceaux en `aria-hidden`, rien n'est découpé en mouvement réduit, titre visible quand le CDN est bloqué, pas de débordement à 375 px. Le passage en colonne étroite donne **7** lignes, pas « 4 → 6 » comme le dit la fiche.

**Je l'utiliserais à 25 000 € ?** Pas encore : le saut de lignes au chargement se voit sur un hero, alors qu'une ligne suffit à le corriger.

**Corrections gratuites**
1. `gsap-splittext.html` l. 30 : retirer `transition: max-width .4s ease` de la règle de base et le mettre seulement sur `.ouverture.etroite .revele-titre` (ou passer `16ch` en `rem`). Contrôle : une seule coupe au chargement.
2. Fiche, § Brancher : ajouter « ne jamais mettre de `transition` sur la largeur d'un titre découpé ni de largeur en `ch` sans police chargée ».
3. Fiche, § Performance : remplacer « 4 → 6 lignes » par le compte réel (7 à 1440 px).

**Médias.** Non : c'est de la typographie.

---

## 2. gsap-flip : catalogue filtré animé, 88/100

Beauté 32 · utilité 19 · accessibilité 19 · fiche 18

**Ce que j'ai vu.** Le catalogue est propre et désirable (`flip-1440-full.png`). Le filtre est fluide : les sortants s'effacent, les restants glissent (`flip-1440-filtre-mi.png`). L'annonce « 3 produits · viennoiseries » est juste. Quand on enchaîne les clics vite, tout retombe juste (5 pains, opacité 1, pas de transform résiduel). Au clavier, Tab parcourt Tout → Pains → … → Liste avec un focus visible (`flip-1440-focus.png`). Le filtre marche aussi en mouvement réduit et sans GSAP (« 5 produits · pains »).

Défauts :
- **Bascule grille → liste** (`flip-1440-liste-mi.png`) : pendant la transition, la vignette qui rétrécit recouvre le texte, qui saute directement à sa place finale. On lit « oissant au beurre », « 0 € ». Ça se voit à chaque bascule.
- **Typo** : « chocolat noir à 64 / %. ». Le signe % passe seul à la ligne (`flip-1440-full.png`, carte Pain au chocolat). Il faut une espace insécable.
- **Œil du boulanger** : la photo de « Brioche tressée » montre une brioche moulée à boules, pas une tresse. N'importe quel boulanger le voit tout de suite.
- En liste à 1440 px, les lignes de 1 100 px sont très vides : le prix pourrait se caler à droite.

**Je l'utiliserais à 25 000 € ?** Oui. C'est le plus utile du lot, il me faut juste la bascule liste propre et l'insécable.

**Corrections gratuites**
1. `gsap-flip.html` l. 109 : mettre `.produit-texte` dans les cibles de la bascule de vue (`…produits.map(p => p.querySelector(".produit-texte"))`), ou ajouter dans `Flip.from` un `onStart` qui fait `gsap.fromTo(".produit-texte", {opacity:0}, {opacity:1, delay:.35, duration:.25})`.
2. l. 77 : `64&nbsp;%` ; l. 72 : `80&nbsp;%`.
3. l. 75 : renommer en « Brioche » (ou « Brioche moulée ») tant que la photo ne montre pas une tresse.
4. CSS `.en-liste .produit-texte` : `grid-template-columns: 1fr auto` avec le prix à droite à partir de 900 px.

**Médias.** Un peu : une photo de vraie brioche tressée, au carré 1:1 comme les autres, même table et même lumière.

---

## 3. gsap-morphsvg : forme qui se transforme, 61/100

Beauté 26 · utilité 12 · accessibilité 9 · fiche 14

**Ce que j'ai vu.** La morph est propre (`morph-1440-feuille-mi.png`, `morph-1440-flamme.png`), la couleur suit, et `type: "rotational"` évite le retournement. Mais :

- **Bloquant : mouvement réduit.** Au chargement rien ne bouge, mais dès que la souris quitte un service (ou que le focus le quitte), `relancer()` démarre la boucle. Mesuré : la forme passe feuille → flamme → goutte toutes les 2,6 s, alors que le bouton pause est **masqué** en mouvement réduit (`morph-1440-reduit-apres.png`). C'est le contraire de ce qu'annonce la fiche (« Aucune boucle »). Cause : l. 92-93 branchent `relancer` avant le `return` de la l. 96, et `relancer` (déclarée en `function`, donc hissée) appelle `gsap.delayedCall`.
- **Sans GSAP** : à la sortie du survol, la console affiche `pageerror: Cannot read properties of undefined (reading 'delayedCall')`. La règle § 5 des bonnes pratiques (« GSAP absent : la page doit être entière ») n'est donc pas tenue.
- **Beauté** : la goutte, la feuille en citron sans nervure et la flamme sont des pictogrammes plats de banque d'icônes. Un chauffagiste d'Apt ne se reconnaît pas là-dedans. La moitié basse de l'écran est vide à 1440 px.
- **Œil du métier** : « isolation des réseaux », un chauffagiste dirait « calorifugeage des réseaux ».

**Je l'utiliserais à 25 000 € ?** Pas encore : il y a un bug d'accessibilité réel, et en l'état c'est un gadget qui ne vend pas le métier.

**Corrections gratuites**
1. `gsap-morphsvg.html` l. 101 : première ligne de `relancer()` : `if (!anime) return;`. Contrôle : en mouvement réduit, survol puis sortie, la forme ne bouge plus pendant 6 s. Même correctif pour l'erreur sans GSAP.
2. Fiche § Mouvement réduit : reprendre le test « survol puis sortie » et ajouter ce contrôle à `verifier-elements.cjs`.
3. Tracés l. 74 : ajouter une nervure en creux (sous-tracé) et un pétiole à la feuille. Viser des pictos dessinés, pas génériques.
4. Texte l. 56 : « calorifugeage des réseaux ».

**Médias.** Non. Ce qu'il faut, ce sont des tracés mieux dessinés, pas des images générées.

---

## 4. gsap-drawsvg : itinéraire tracé au défilement, 82/100

Beauté 32 · utilité 17 · accessibilité 18 · fiche 15

**Ce que j'ai vu.** En mode normal, c'est le meilleur « fil » que j'aie vu : la route se dessine, la pastille suit, les arrêts s'allument, et la carte reste collée en `sticky` sans épinglage (`draw-1440-6.png`). La géographie tient : Brindas → Craponne → Tassin → Lyon 5e à l'ouest de la Saône, puis la Croix-Rousse entre Saône et Rhône. Rue d'Austerlitz à la Croix-Rousse, juste. En bas de page, tout est allumé (`11111`).

Défauts :
- **En `?apercu` (la vue de la galerie), le tracé ne finit jamais.** Le paragraphe `.bas` est en `data-explication`, donc masqué, et la page n'est plus assez longue pour que la 5e étape atteigne 55 % de l'écran. Défilement maximal : 492 px à 1440, 857 px à 375. L'étape 5 reste grise et la route s'arrête avant la Croix-Rousse (`draw-1440-6.png`, `draw-375-6.png`). Le même piège attend toute maquette où cette section est la dernière avant un pied de page court.
- À l'ouverture en apercu, Craponne est déjà allumé et un tiers de la route est déjà dessiné : le début (`top 55%`) est passé avant tout défilement (`draw-1440-0.png`).
- La police Atkinson Hyperlegible barre ses zéros : « 2Ø h », « 1Ø h 15 » ressemblent à des Ø dans les horaires (`draw-1440-6.png`).

**Je l'utiliserais à 25 000 € ?** Pas encore : la vue d'aperçu montre une tournée qui n'arrive pas, alors que la correction tient en deux mots.

**Corrections gratuites**
1. `gsap-drawsvg.html` l. 146-147 : `start: "clamp(top 55%)"` et `end: "clamp(top 55%)"` (ScrollTrigger ≥ 3.12). Le tracé commence à 0 et finit toujours au bas de la page.
2. Ou bien sortir l'espace de fin du `data-explication` : `.trajet { padding-bottom: 45svh }`.
3. Fiche § Brancher : « laisser au moins 45 % d'écran sous la dernière étape, ou garder `clamp()` ».
4. Horaires `.heure` : `font-family: "Familjen Grotesk"` (zéro sans barre) ou `font-variant-numeric: normal` avec une autre police.
5. Ajouter `document.fonts.ready.then(() => ScrollTrigger.refresh())` (règle § 7 des bonnes pratiques : les hauteurs dépendent des polices).

**Médias.** Oui, gain moyen : un fond de carte illustré (relief des Monts du Lyonnais, Saône et Rhône, 8:5, 1600 × 1000, tons sauge) sous le tracé. Aujourd'hui, la carte est un peu nue.

---

## 5. gsap-scrollsmoother : défilement adouci et profondeur, 80/100

Beauté 31 · utilité 14 · accessibilité 18 · fiche 17

**Ce que j'ai vu.** Techniquement c'est propre : une seule instance, créée uniquement pour souris et mouvement non réduit (pas d'instance à 375 tactile ni en mouvement réduit), images qui glissent dans leur cadre (`-233 px` → `0`), ancre « Parler de votre projet » qui passe par `scrollTo` et donne le focus à « Écrire à l'atelier ». Tab vers le contact l'amène à l'écran (top 630). La Cormorant donne une vraie allure d'architecte (`smooth-1440-2.png`, `smooth-1440-6.png`).

Mais je suis l'architecte, et trois légendes me font honte :
- **« Le séjour sous la charpente d'origine »** (l. 65) : la photo montre une **voûte en berceau** en pierre, sans aucune charpente (`smooth-1440-2.png`). Pour un client du Luberon, c'est faux au premier coup d'œil.
- **Alt « Détail d'un mur en pierre sèche »** (l. 68) : la photo montre des moellons hourdés au mortier, et la légende dit elle-même « joints à la chaux ». Une pierre sèche, par définition, n'a pas de joint.
- **« La verrière au sud »** (l. 69) : on voit une petite fenêtre à encadrement de pierre et une tache de soleil, pas de verrière.
- À 375 px, le premier écran est vide sur 380 px au-dessus du titre (`smooth-375-0.png`) : `align-content: end` sur 92svh coûte cher sur téléphone.

**Je l'utiliserais à 25 000 € ?** Pas encore : le geste est juste, mais des légendes fausses sur ma propre réalisation, je ne peux pas les mettre en ligne.

**Corrections gratuites**
1. l. 65 : « Le séjour sous la voûte d'origine, poêle à bois dans l'angle. » ; l. 62 : remplacer « charpente gardée telle quelle » par « voûtes gardées telles quelles » (ou changer de photo).
2. l. 68 : alt « Mur en moellons hourdés à la chaux ».
3. l. 69 : « La lumière de la fenêtre sud, 16 heures en novembre. »
4. `@media (max-width: 760px) { .ouverture { min-height: 70svh; } }`.

**Médias.** Oui, si on garde le récit « charpente + verrière » : une photo de charpente de grange conservée au-dessus d'un séjour (4:5, 1400 × 1750) et une verrière sud dans un mur de pierre (4:3). Corriger les légendes, gratuit, passe avant.

---

## 6. gsap-observer : diaporama plein écran au geste, 86/100

Beauté 36 · utilité 16 · accessibilité 16 · fiche 18

**Ce que j'ai vu.** C'est le plus beau du lot (`obs-1440-apercu-0.png`, `obs-1440-mi-a.png`, `obs-375-2.png`) : l'Archivo condensée en capitales, la photo virée au rouge, le contre-mouvement de l'image. Le défilement n'est pas piégé : en mode normal, molette vers le bas → entrée dans la section, diapositives 2, 3, 4, puis sortie ; vers le haut, retour à 1 puis sortie (journal). Au doigt à 375 : 4 balayages → 5e diapositive, le suivant rend la page. Les flèches ← → changent d'artiste, PageDown sort. Les diapositives cachées sont `inert`. En mouvement réduit, la liste est empilée.

Défauts :
- **Ordre du clavier** : le premier Tab tombe sur la **section** (`tabIndex = 0`, l. 98), entourée de rouge (`obs-1440-tab1.png`), et seulement le second sur « Passer le programme ». Un lien d'évitement doit venir en premier.
- **Pavé tactile** : une rafale de 30 petits crans (geste de trackpad avec inertie) a fait passer **2** diapositives d'un coup (journal `burst … act: 2`).
- Sur la liste des horaires, « Ven 02 · 01:10 » : pour un programmateur, c'est la nuit du vendredi, d'accord, mais beaucoup de festivals écrivent « Nuit ven → sam ». À trancher avec le vrai client.

**Je l'utiliserais à 25 000 € ?** Oui : rare, maîtrisé, accessible. Il reste deux réglages à faire.

**Corrections gratuites**
1. `gsap-observer.html` l. 60 : sortir `<a class="diapo-passer">` juste avant `<section class="diapo">` (avec `position: relative` sur un enveloppant), ou mettre le `tabIndex = 0` sur `.diapo-piste` plutôt que sur la section.
2. l. 135 `avancer()` : ajouter un temps de repos après chaque transition, `if (performance.now() < pret) return;`, et `pret = performance.now() + 250` dans le `onComplete` l. 122.
3. Fiche § Accessibilité : décrire l'ordre réel de tabulation.

**Médias.** Non : les photos de scène font déjà le travail.

---

## 7. micro-anime : ajout au panier animé (Anime.js), 79/100

Beauté 29 · utilité 18 · accessibilité 15 · fiche 17

**Ce que j'ai vu.** Le vol de la vignette vers le panier est lisible (`anime-1440-vol-300.png`, `anime-1440-vol-550.png`, `anime-375-vol.png`). Le compteur et le total se mettent à jour, et les chiffres concordent : 12,40 + 12,40 + 19,80 + 13,10 = **57,70 €**, affiché et annoncé. Aucun clone ne reste après des clics rapides. En mouvement réduit et CDN bloqué, la mise à jour est instantanée et juste.

Défauts :
- **CDN lent = boutons morts** : les écouteurs de clic (l. 145) ne sont posés qu'**après** `await import(...)` (l. 99). Si jsdelivr met 5 s à répondre, « Ajouter » ne fait rien pendant 5 s. Sur une boutique, c'est grave.
- **Quatre boutons nommés « Ajouter »** (Tab : « Ajouter », « Ajouter », « Ajouter ») : au lecteur d'écran, on ne sait pas quel café on ajoute.
- **Œil du torréfacteur** : les sachets ont des étiquettes **blanches et vides** (`anime-1440.png`). Un client torréfacteur ne montrerait jamais ça. Et la marque s'appelle « Atelier Brune » alors que l'exemple d'origine est **Brume** (`exemples/b2c-brume`, produit « Brume du matin ») : coquille ou confusion.
- L'arc est peu marqué à 1440 : la vignette file presque en ligne droite.
- Le poids est lourd pour un seul geste : 41 Ko gzip (la fiche le dit, honnêtement).

**Je l'utiliserais à 25 000 € ?** Pas encore : le bouton d'achat ne doit jamais dépendre d'un CDN.

**Corrections gratuites**
1. `micro-anime.html` : déplacer la l. 145 avant l'import, puis remplacer l. 98-99 par `let animate = null; import("…anime.esm.min.js").then(m => { animate = m.animate; }).catch(() => {});`.
2. l. 75, 80, 85, 90 : `<button …>Ajouter<span class="sr-only"> Konga au panier</span></button>` (même chose pour chaque café).
3. l. 57 : « Brume » (ou un nom qui ne se confond pas avec l'exemple).
4. l. 136 : `inBack(3)` pour un arc visible ; tester à 1440.

**Médias.** Oui : 4 photos de sachets **étiquetés** Brume (nom du café, origine, date de torréfaction), carré 1:1, 1120 × 1120, même fond.

---

## 8. micro-mojs : « J'aime » qui éclate (mo.js), 73/100

Beauté 27 · utilité 14 · accessibilité 16 · fiche 16

**Ce que j'ai vu.** Le bouton « J'aime » se remplit avec un petit pop, et l'éclat (anneau, points, traits) est juste et discret (`mojs-1440-eclat-120.png`, `mojs-zoom-eclat-200.png`). `aria-pressed` bascule, le compteur passe de 88 à 89 puis revient à 88, les calques de mo.js sont `aria-hidden`. En mouvement réduit : rien ne part, le cœur se remplit.

Défauts :
- **Faute d'accord dans l'annonce** : « Tasse Galet ajouté à vos pièces aimées » et « Assiette Lavoir ajouté ». La fiche cite même la faute en exemple (§ Accessibilité). Pour une céramiste qui soigne ses mots, c'est rédhibitoire.
- **La pastille « Nouveau » ne pétille pas** : les bulles font 2 à 4 px et partent vers le haut, donc elles sont coupées par `.piece { overflow: hidden }` (l. 48), la pastille étant à 12 px du bord. On voit deux poussières blanches sur « Nouveau » (`mojs-zoom-pastille-160.png`, `mojs-1440-pastille.png`) : on croirait un défaut d'écran.
- **CDN lent** : mo.js est chargé en `defer` (l. 15) et tout le script attend `DOMContentLoaded` (l. 110), donc le bouton « J'aime » est inerte tant que jsdelivr n'a pas répondu.
- l. 38 : le commentaire « calque créé par mo.js, décoratif » est accroché à `.sr-only` par erreur.

**Je l'utiliserais à 25 000 € ?** Pas encore : la faute d'accord et la pastille invisible se voient, et ça se corrige en dix minutes.

**Corrections gratuites**
1. `micro-mojs.html` l. 137 : `actif ? \`Ajouté à vos pièces aimées : ${nom} (${n}).\` : \`Retiré de vos pièces aimées : ${nom}.\``. Corriger l'exemple de la fiche.
2. l. 48 : `.piece { overflow: visible }` et `.piece__image img { border-radius: 20px 20px 0 0 }` ; l. 145 : `radius: { "rand(3, 6)": 0 }`, `count: 9`, bulles avec la couleur `--jaime-eclat-2` pour qu'elles se voient sur la photo.
3. l. 15 : passer le script en `async` ; l. 110 : brancher les clics sans attendre mo.js et lire `window.mojs` au moment du clic.
4. l. 38 : déplacer le commentaire sur `.eclats` (l. 37).

**Médias.** Non : les photos de grès sont bonnes et cohérentes.
