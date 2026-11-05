# Persona bibliothèque, lot 3

Date : 2026-11-05. Regard indépendant : les rapports du relecteur n'ont pas été lus.
Testé dans Chrome (Playwright) sur `http://127.0.0.1:4330/.../elements/<nom>.html?apercu` et sans `?apercu`, à 1440 × 900 et 375 × 812 (écran tactile), avec `reducedMotion: 'reduce'`, au clavier (12 tabulations), au survol, au clic et au défilement. Les animations ont été échantillonnées image par image (`requestAnimationFrame`) pour mesurer largeurs, positions et états, pas seulement « à l'œil ».
Console : **aucune erreur ni ressource manquante** sur les 7 éléments, en aperçu comme en mode normal. Captures du lot : `persona-biblio/lot-3-captures/`.

| élément | note | 25 000 € ? | médias utiles ? |
|---|---|---|---|
| bouton-balayage | 80 / 100 | Pas encore | Non |
| bouton-brouille | 82 / 100 | Oui | Non |
| bouton-permute | 70 / 100 | Pas encore | Non |
| bouton-chrome | 82 / 100 | Oui | Non |
| cartes-eventail | 70 / 100 | Pas encore | Oui : 5 photos 4/5 dont le sujet colle à la légende |
| processus-viseur | 87 / 100 | Oui | Oui : 5 photos 4/5 nettes du même atelier (remplacer la 1re, floue) |
| temoignages-orbite | 73 / 100 | Pas encore | Oui pour la démo : 4 portraits 1/1 serrés sur le visage |

Grille : beauté et finition /40, utilité réelle /20, accessibilité, mouvement réduit et repli /20, fiche et prompt /20.

---

## bouton-balayage, 80 / 100

**Ce que j'ai vu.** Au repos, deux pilules sombres identiques (`bouton-balayage-1440.png`). Au survol, la barre lumineuse et le masque `clip-path` avancent ensemble : à 352 ms, le masque découvre 60 % du libellé et la barre est à 126 px sur 205, donc parfaitement calée. La barre s'arrête au bord (217 px, mesurés par le script) et s'éteint. En mouvement réduit, pas de barre, la couleur bascule d'un coup. Focus : anneau cyan de 3 px bien visible (`-1440-focus1.png`). Pas de débordement à 375.

| critère | note | pourquoi |
|---|---|---|
| Beauté, finition | 31/40 | Geste propre et synchronisé. Mais au repos, le bouton principal « Lancer l'audit » est **identique** au secondaire : texte gris, aucun accent. Sur un téléphone, sans survol, l'appel à l'action n'a aucune présence. |
| Utilité | 13/20 | Niche (site sombre et technique). Effet invisible au doigt. |
| Accessibilité, repli | 18/20 | Contrastes vérifiés (10,6:1 au repos, 13,5:1 allumé), couleurs forcées prévues, mouvement réduit propre. Petit défaut : le libellé est écrit deux fois dans le DOM, donc un copier-coller ou le mode lecture donne « LANCER L'AUDIT LANCER L'AUDIT ». |
| Fiche, prompt | 18/20 | Prompt prêt à coller, variables, poids. Pas de ligne « Licence » explicite (code maison, police OFL). |

**25 000 € ?** Pas encore : sur mobile, mon bouton principal ressemble à un bouton éteint.

**Corrections gratuites, par priorité**
1. `bouton-balayage.html` l. 16-28 : donner un état repos au bouton principal. Ajouter une variable `--bal-repos-bord` et l'utiliser dans `box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--bal-lumiere) 35%, transparent), …`, éventuellement avec un texte un peu plus clair. Dans la démo, garder la version neutre pour « Rapport type » seulement.
2. l. 31 : `.balayage .bal-allume { user-select: none; }` pour que le copier-coller ne double pas le libellé.
3. `bouton-balayage.md` : ajouter « Licence : code original Lancetonsite, libre pour les sites clients ; Chakra Petch sous OFL ». Dans « Quand l'utiliser », écrire que sur mobile seul l'état repos compte.

**Médias générés ?** Non, l'élément est purement typographique.

---

## bouton-brouille, 82 / 100

**Ce que j'ai vu.** Le brouillage est lisible et rapide : « DÉMARRER » devient « PRÊT EN 60 S » en 0,87 s, et « TARIFS » devient « DÈS 4 €/MOIS » (`bouton-brouille-1440-survol-150ms.png`, `-focus2.png`). **Largeur figée à 194,9 px sur toutes les images mesurées** : rien ne saute. Le lecteur d'écran entend « Démarrer — Prêt en 60 s » une seule fois. En mouvement réduit, le libellé change d'un coup.

| critère | note | pourquoi |
|---|---|---|
| Beauté, finition | 32/40 | Effet « machine » réussi, chasse fixe bien tenue. Le bouton clair est un peu plat face au sombre. |
| Utilité | 16/20 | Vraie valeur commerciale : le second libellé donne une information concrète (prix, délai) au moment de l'hésitation. |
| Accessibilité, repli | 16/20 | Anneau de focus du bouton clair `#4c1fb0` sur le fond `#050408` : **2,07:1**, sous le seuil de 3:1 (visible mais faible sur `-focus2.png`). Pas de règle `forced-colors`, mais la bordure de 1 px suffit. |
| Fiche, prompt | 18/20 | Prompt complet, piège du `pointerenter` documenté. La fiche annonce 7,8:1 pour le violet au survol, je mesure 7,1:1 sur le fond mélangé (ça reste conforme). Pas de ligne « Licence ». |

**25 000 € ?** Oui, pour un hébergeur, un studio de jeu ou un outil pour développeurs, une fois l'anneau du bouton clair corrigé.

**Corrections gratuites**
1. `bouton-brouille.html` l. 29 et 42 : anneau de focus réglable par une variable. Ajouter `--br-anneau` (par défaut `var(--br-accent)`), et pour `.brouille.clair` mettre `--br-anneau: #b98cff` (environ 7:1 sur le fond noir).
2. `bouton-brouille.md` : corriger 7,8:1 en 7,1:1. Ajouter la ligne « Licence » (code maison ; Oxanium et JetBrains Mono sous OFL). Prévenir aussi : sur un lien, au doigt, le second libellé ne s'affiche qu'un instant avant la navigation, donc ne pas y mettre une information indispensable.

**Médias générés ?** Non.

---

## bouton-permute, 70 / 100

**Ce que j'ai vu (défaut mesuré).** Au premier instant du survol, la pastille de gauche passe en `position: absolute` (l. 38) : **le bouton perd d'un coup 49,6 px de largeur (253,7 → 204,1) et le libellé saute de 54,6 px à 5 px**, puis le ressort le ramène à 22,4 px et la largeur revient à 254. On voit donc un à-coup gauche-droite, et le bouton voisin « Voir les travaux » recule de 50 px puis revient. Même chose dans l'autre sens à la sortie. En mouvement réduit, le saut final est propre (le bouton passe directement à 254 px). L'état final est joli (`bouton-permute-1440-focus1.png`).

| critère | note | pourquoi |
|---|---|---|
| Beauté, finition | 25/40 | La palette et la typographie sont belles. Mais le geste vendu (« le libellé glisse à sa place ») est en fait un saut, et c'est exactement le détail qu'un client voit au premier survol. |
| Utilité | 15/20 | Appel à l'action chaleureux, valable sur fond clair comme sombre. |
| Accessibilité, repli | 16/20 | Icônes masquées, libellé comme nom accessible, focus visible, mouvement réduit respecté. L'anneau orange sur fond `#e8ecf6` est à 4,38:1 (correct). |
| Fiche, prompt | 14/20 | Le prompt décrit l'effet voulu mais pas la contrainte qui l'évite (réserver la place de la pastille) : régénérer reproduira le défaut. Pas de ligne « Licence ». Apostrophes droites dans la démo (« qu'on », « l'autre »). |

**25 000 € ?** Pas encore : le bouton tressaute au survol.

**Corrections gratuites**
1. `bouton-permute.html` l. 23-38 : mettre la pastille de gauche **toujours** en position absolue (`.pm-gauche { position: absolute; left: 5px; top: 5px; }`) et réserver sa place par du padding : au repos `padding-left: calc(var(--pm-taille) + 5px + .6rem)`, au survol `padding-left: 1.4rem`. Retirer `position: absolute; left: 5px` de la règle `:hover .pm-gauche` (l. 38). Le libellé glisse alors réellement, à largeur constante.
2. `bouton-permute.md`, prompt : ajouter « les deux pastilles sont en position absolue ; la place est réservée par le padding, qui seul transite ; la largeur du bouton ne doit jamais changer ».
3. Démo l. 62 : apostrophes typographiques (’). Fiche : ligne « Licence » (code maison, Bricolage Grotesque sous OFL).

**Médias générés ?** Non.

---

## bouton-chrome, 82 / 100

**Ce que j'ai vu.** La lunette en `conic-gradient` fait un vrai effet de métal poli, avec ses reflets blancs et ses zones anthracite (`bouton-chrome-1440.png`). Au survol, l'angle passe de 30° à 390° en 1,1 s avec une courbe douce (`-survol-400ms.png`) ; à la sortie, le reflet repart en sens inverse. En mouvement réduit, l'angle saute à 390°, ce qui donne visuellement la même image : rien ne bouge. Les deux faces sont élégantes, et la typographie de la démo (Instrument Serif) est juste pour un orfèvre.

| critère | note | pourquoi |
|---|---|---|
| Beauté, finition | 34/40 | Très convaincant. L'anneau de focus bleu vif `#1d4ed8` (`-focus2.png`) jure avec une palette argent et noir. |
| Utilité | 14/20 | Niche (luxe, précision), mais très juste dans cette niche. |
| Accessibilité, repli | 17/20 | Contrastes 16:1 et 15:1, couleurs forcées prévues, repli sans `@property` correct. |
| Fiche, prompt | 17/20 | Le dégradé conique est copié deux fois (l. 28 et l. 37) : changer la teinte du métal oblige à modifier deux endroits, sans variable. Pas de ligne « Licence ». |

**25 000 € ?** Oui, pour une maison de matière (orfèvre, horloger, audio), avec un anneau de focus aux couleurs de la marque.

**Corrections gratuites**
1. `bouton-chrome.html` l. 28 et l. 37 : sortir le dégradé conique dans une variable `--chr-lunette: conic-gradient(from var(--chr-angle), …)` et l'utiliser dans les deux fonds.
2. l. 34 : `outline: 2px solid var(--chr-texte)` pour la face claire et `#1d1d1f` pour la face pleine (sur le fond gris, ça donne plus de 12:1), ou une variable `--chr-anneau`.
3. Démo l. 57 : apostrophe typographique dans « L’argenterie ». Fiche : ligne « Licence » (Instrument Sans et Instrument Serif sous OFL) et la nouvelle variable.

**Médias générés ?** Non (une photo d'argenterie en fond ferait une plus belle démo, mais n'apporte rien à l'élément).

---

## cartes-eventail, 70 / 100

**Ce que j'ai vu.** La pile fermée est belle et chaleureuse (`cartes-eventail-1440.png`). Ouverte au survol (`-1440-ouvert.png`), elle a deux défauts : la carte du dessus part tout à gauche, inclinée de 14°, avec sa légende de travers, et **les légendes des cartes de dessous restent visibles, coupées** (« …ue », « …que »). Le bouton, les flèches ← → et l'annonce `aria-live` fonctionnent (« Service Galet · bols tournés », puis « Service Lavoir · plats à la plaque »).
**Sur téléphone, défaut bloquant** : après un appui sur « Carte suivante », le focus ouvre l'éventail et **la page devient large de 513 px pour un écran de 375** (cartes de -138 px à 513 px, `cartes-eventail-375-suivante.png`), avec un défilement horizontal et des photos coupées. Fermée, la pile est décentrée vers la droite et mord sur le bouton (`-375-pleine.png`).
**Œil du potier** : la carte « Service Galet · bols tournés » montre un **cylindre** haut monté au tour, pas un bol (`-1440-suivante-250ms.png`). « Service Silo · pichets » a pour texte alternatif « lisse la panse d'un grand **vase** ». Un client potier le voit tout de suite.

| critère | note | pourquoi |
|---|---|---|
| Beauté, finition | 27/40 | Belle au repos, brouillonne une fois ouverte (légendes coupées, carte du dessus rejetée sur le bord). |
| Utilité | 15/20 | Bonne alternative au carrousel pour 3 à 6 photos d'atelier. |
| Accessibilité, repli | 13/20 | Débordement horizontal sur mobile (critère « reflow » non tenu). Ouverture liée au survol, donc au doigt elle n'arrive que par le focus. Points positifs : `inert`, annonce, flèches au clavier, mouvement réduit correct. |
| Fiche, prompt | 15/20 | Prompt solide, mais muet sur la largeur mobile et sur les légendes cachées. Les légendes ne correspondent pas aux photos. Pas de ligne « Licence » ni la provenance des photos. |

**25 000 € ?** Pas encore : elle casse la largeur de la page sur téléphone.

**Corrections gratuites**
1. `cartes-eventail.html` l. 19 : `--ev-ecart: min(26px, 3.5vw)` et, à partir de 600 px, `--ev-angle: 4deg`. Ajouter aussi `overflow-x: clip` sur `.eventail` (l. 22) par sécurité.
2. l. 38-41 : `.eventail li[aria-hidden="true"] figcaption { opacity: 0; transition: opacity .2s; }` pour ne garder que la légende de la carte du dessus.
3. l. 31-33 : centrer la carte du dessus (rang 0 au milieu, les autres réparties de part et d'autre) ou ouvrir l'éventail vers la droite sans faire pivoter la carte du dessus (rotation 0 pour `--i: 0`), pour que sa légende reste droite.
4. l. 74 et 76 : légendes vraies. « Service Galet · bols tournés » devient « Tournage · cylindre de pichet » ou bien on change la photo. « Silo · pichets » prend une photo de pichet, ou la légende « Silo · vases ».
5. Fiche : ajouter « sur mobile, vérifier qu'aucune carte ne dépasse la largeur de l'écran » au prompt et aux points de contrôle, ainsi qu'une ligne « Licence » et la provenance des photos de démo.

**Médias générés ?** Oui : 5 photos 4/5 (1200 × 1500), une par légende, même lumière d'atelier en grès clair : assiettes plates empilées, bols tournés posés sur la planche, plat à la plaque, pichet émaillé, saladier sur le tour.

---

## processus-viseur, 87 / 100

**Ce que j'ai vu.** C'est le meilleur du lot. Au défilement lent (11 positions), l'étape active, la photo, le compteur, les segments et le timecode suivent sans faute (`processus-viseur-1440-defile-00.png` à `-10.png`). La 5e étape devient bien active en bas de page. Au défilement rapide, on arrive juste sur « 05 / 05 ». Sur mobile, le viseur devient un bandeau épinglé de 38 % de la hauteur et la carte active reste lisible dessous (`-375-defile-06.png`). En mouvement réduit, plus de fondu ni de zoom, mais tout reste complet.
**Œil de l'industriel** : palier à semelle avec un capteur cylindrique posé dessus, passerelle au mur, roulement à billes changé à l'établi : c'est crédible. « Capteurs aimantés sur les paliers, sans perçage » : juste.
**Défauts** : la photo de l'étape 1 (`technicien-640.webp`, **11 Ko**) est nettement floue dans le grand cadre de 508 × 635 (`-1440.png`). Toutes les photos sont en paysage 640 × 478, recadrées puis agrandies en 4/5, d'où un léger flou général. Sur mobile, les 12 px au-dessus du bandeau épinglé laissent voir du texte qui passe derrière (« CRITIQUES » en haut de `-375-defile-06.png`). « 01 / » seul, sans total, ressemble à une coquille.

| critère | note | pourquoi |
|---|---|---|
| Beauté, finition | 34/40 | Direction forte (viseur, REC, typographie condensée), mais la 1re image est floue et les autres un peu molles. |
| Utilité | 19/20 | Une section « notre méthode » dont chaque artisan ou industriel a besoin. |
| Accessibilité, repli | 18/20 | Liste ordonnée complète sans le viseur, `aria-current`, rien à piloter, mouvement réduit propre. |
| Fiche, prompt | 16/20 | Prompt très complet. La fiche ne demande pas des photos en portrait assez grandes, d'où le flou. Pas de ligne « Licence ». |

**25 000 € ?** Oui, avec des photos nettes en 4/5 : c'est une section qui fait « agence ».

**Corrections gratuites**
1. `processus-viseur.html` l. 106-115 : « 01 / 05 » au lieu de « 01 / » (ou « Étape 01 »).
2. l. 63, mobile : `top: 0; border-radius: 0 0 6px 6px;`, ou garder 0,75 rem et ajouter `box-shadow: 0 -0.75rem 0 var(--pv-fond), …` pour masquer le texte qui passe au-dessus.
3. l. 94-97 : `loading="lazy"` sur les images 2 à 5, comme la fiche le conseille.
4. Fiche, « Brancher » : « photos en 4/5, au moins 800 × 1000, une par étape, même lieu ». Ajouter la ligne « Licence » et la provenance des photos.

**Médias générés ?** Oui : 5 photos 4/5 (1000 × 1250) du même atelier de mécanique, dans la même lumière : tour du parc avec le chef d'atelier, pose d'un capteur aimanté sur un palier, capteur en écoute, téléphone qui reçoit le SMS d'alerte devant la machine, changement du roulement. La 1re actuelle est à refaire en priorité.

---

## temoignages-orbite, 73 / 100

**Ce que j'ai vu.** À 1440, la carte pastel est agréable et chaque portrait-bouton affiche son avis, sans saut de hauteur (188 px constants, `-1440-portrait1.png` à `-portrait4.png`). Pas de rotation automatique, et c'est bien.
**Défauts** :
- Les portraits de 64 px sont des **plans larges** (Odette dans sa boulangerie, Bastien devant ses étagères, Hélène dans une embrasure) : à cette taille, on ne voit pas de visage, seulement des silhouettes (`-1440.png`). Seule Lucie est un vrai portrait.
- Les bulles sont entre guillemets mais **ne reprennent pas les mots du client** : la citation dit « 4 200 € récupérés », la bulle dit « 4 200 € retrouvés ». Pour un cabinet comptable, un faux guillemet, c'est grave.
- Mobile (`-375-pleine.png`) : la fiche promet « les portraits passent en rangée au-dessus de la citation ». En réalité ils sont **sous les flèches** et le portrait actif (agrandi à 1,12) touche la rangée des flèches (chevauchement détecté entre le bouton « Odette Marchal » et `.or-pied`).
- Composition à 1440 : les quatre portraits sont posés de façon asymétrique, avec de grands vides à droite.

| critère | note | pourquoi |
|---|---|---|
| Beauté, finition | 28/40 | Belle carte, mais les portraits illisibles annulent l'idée même de l'élément (« de vraies personnes »). |
| Utilité | 15/20 | Utile si le client a de vraies photos ; la fiche le dit honnêtement. |
| Accessibilité, repli | 15/20 | Boutons nommés, `aria-pressed`, `aria-live`, flèches de 44 px. Mais l'ordre de tabulation (flèches puis portraits) ne suit pas l'ordre visuel sur mobile, et des éléments se touchent sur mobile. |
| Fiche, prompt | 15/20 | Le comportement mobile décrit est faux. Rien n'exige que les bulles reprennent les mots exacts. Portraits de 900 à 1000 px (220 Ko) pour des ronds de 64 px. |

**25 000 € ?** Pas encore : des avatars où l'on ne voit pas les visages et des guillemets qui ne citent pas.

**Corrections gratuites**
1. `temoignages-orbite.html` l. 99-100 : bulles fidèles au mot près, « « Tout est prêt en janvier. » » et « « 4 200 € récupérés. » ».
2. l. 99-102 et 84-90 : recadrer sur le visage avec `object-position` et un zoom (`transform: scale(1.8)` sur l'`img`, ou des fichiers recadrés). Pour Odette par exemple `object-position: 50% 18%` avec un zoom ; vérifier à 64 px.
3. l. 61-67 (mobile) : `.orbite { display: flex; flex-direction: column; }`, `.or-portraits { order: -1; margin: 0 0 1.25rem; }`, et passer l'agrandissement du portrait actif à 1,06 sur mobile. Placer le `<ul class="or-portraits">` avant `.or-scene` dans le DOM, pour que l'ordre de tabulation suive aussi.
4. l. 46-49 (1440) : rééquilibrer (p3 à droite à la même hauteur que p4) ou ajouter un cinquième portrait.
5. Fiche : corriger la description mobile, ajouter « bulles = extrait exact de la citation », « portraits recadrés serré, 160 × 160 », et une ligne « Licence » avec la provenance des portraits de démo.

**Médias générés ?** Oui pour la démo seulement : 4 portraits carrés 1/1 (320 × 320) serrés tête et épaules, même lumière douce, fond flou du métier (fournil, atelier de poterie, salon de coiffure, agence d'architecte). En production, uniquement les vraies photos des clients, comme la fiche le dit.
