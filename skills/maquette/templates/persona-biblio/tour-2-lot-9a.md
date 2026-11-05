# Lot 9a, tour 2 : éléments 3D (regard client à 25 000 €)

Date : 5 novembre 2026. Testé dans Chrome (Playwright, GPU Metal) sur `http://127.0.0.1:4339/…/elements-3d/<nom>.html` en mode normal et `?apercu`, à 1440 × 900 et 375 × 812, avec mouvement réduit (`reducedMotion: 'reduce'`) et sans WebGL (`--disable-webgl --disable-3d-apis`). J'ai attendu le chargement complet, pris des captures dans le temps (t0, t+8 s, t+14 s), glissé à la souris, tabulé jusqu'au bouton Pause et appuyé sur Entrée, défilé étape par étape, et pris une rafale de 74 images de la chouette pour attraper un clignement. Je n'ai lu que mon rapport du tour 1 (`lot-9.md`) et le brief. Je n'ai modifié aucun fichier de la bibliothèque.

**Console : 0 erreur, 0 requête en échec sur les 4 éléments, dans toutes les configurations. Aucun débordement horizontal (`scrollWidth` = largeur) à 1440 ni à 375.** Sans WebGL : aucun canevas pour Spark, la classe `sans-3d` est posée pour les trois autres. Mouvement réduit : Spark ne crée aucun canevas, l'île et la chouette donnent deux captures identiques au pixel près (la chouette, même quand je bouge la souris).

Captures : `persona-biblio/captures-tour2-lot-9a/` (`m-*.png` pour les planches, `crop-*.png` pour les gros plans).

| élément | tour 1 | tour 2 | 25 000 € ? |
|---|---|---|---|
| spark-splat-lieu | 72 | **79** | Pas encore : il faut borner le glisser, sinon le visiteur tombe sur un trou noir et des taches floues (gratuit). Le vrai scan reste hors périmètre. |
| objet-defilement | 81 | **88** | **Oui** : l'anse, l'ombre et le cappuccino sont justes. Il reste une ligne commentée par erreur. |
| ile-flottante | 77 | **83** | Pas encore : « Nuits perchées » avec trois cabanes posées au sol, le gérant le voit tout de suite (gratuit). |
| mascotte-regard | 78 | **82** | Pas encore : les disques du visage débordent de la tête dès qu'elle tourne la tête, et c'est sa pose de départ (gratuit). |

Barème : beauté et finition /40, utilité réelle /20, accessibilité, mouvement réduit et repli /20, fiche et prompt /20. Seuil retenu pour un « oui » : 85 (démo aux médias provisoires).

Une correction sur mon propre tour 1 : j'avais demandé pour la hulotte un « disque facial en cœur ». C'est faux. Le masque en cœur, c'est la **chouette effraie**. La hulotte a un disque rond, cerclé de brun foncé, et des yeux noirs. Le correcteur a suivi mon conseil, donc je ne le compte pas comme une faute de sa part, mais il faut le rectifier dans la fiche (voir FIX-M3).

---

## 1. spark-splat-lieu : 72 → 79

### Reprise des corrections du tour 1

| Tour 1 | État | Preuve |
|---|---|---|
| 1. Textes alignés sur le scan | **Corrigé** : gîte « La Liseuse », salon-bibliothèque, coin du feu ; légende honnête en mode normal | `spark-1440.png` |
| 2. Le scan remplit le cadre (`data-recul`) | **Partiellement corrigé** : au repos, le cadre est plein (1440 comme 375). Mais au bout du va-et-vient une bande vide d'environ 10 % revient à gauche (`spark-1440-apercu-t8.png`). Après un glisser de 250 px, un **tiers du cadre est noir** et le premier plan devient des taches floues (`crop-spark.png`, 3e vignette) | `crop-spark.png`, `m-spark-1440.png` |
| 3. Pas de halo autour de Pause | **Corrigé** : fond `rgba(0,0,0,0)` et `padding: 0` mesurés en aperçu ; en mode normal, la pastille avec texte garde son fond, ce qui est voulu | `spark-1440-apercu.png` |
| 4. Aperçu centré verticalement | **Corrigé** | `m-spark-1440.png` |

### Ce que j'ai vu

- Le fondu entre l'affiche et le scan est propre. Pause marche au clavier (Tab ×4, Entrée : « Reprendre », `aria-pressed="true"`) et fige vraiment l'image : 0 pixel différent entre deux captures prises à 3 s d'écart.
- À 375, c'est très bien : le scan remplit le cadre à t0, à t+8 s et à t+14 s (`m-spark-375.png`).
- **L'affiche et le scan sont deux pièces sans rapport** (`crop-spark.png`, vignettes 1 et 2). D'abord un séjour blanc, en plein jour, avec un poêle éteint. Puis, en fondu, une bibliothèque de nuit avec une fenêtre gothique et une cheminée monumentale. Le visiteur voit une pièce se changer en une autre. La fiche le reconnaît (« pas la même pièce »). Avec un vrai client, l'affiche sera une photo de la pièce scannée : je ne compte donc ce point qu'à moitié. Autre détail : le texte alternatif parle d'un « salon voûté » et de « livres posés ». Dans le cadrage affiché (`object-position: 50% 62%`), on ne voit ni voûte ni livres, seulement un linteau en pierre.
- Le scan d'exemple ressemble à une illustration fantastique, pas à une vraie pièce. C'est hors périmètre et je ne le pénalise pas une deuxième fois.

| Critère | Note | Pourquoi |
|---|---|---|
| Beauté et finition | 28/40 | Textes justes, cadre plein au repos, plus de halo. Mais le glisser n'a pas de limite et montre le vide et le flou ; la bande vide revient au bout du va-et-vient ; l'affiche est trop éloignée du scan. |
| Utilité | 13/20 | Inchangé : très fort pour un lieu, mais lourd (1,2 Mo gzip plus le scan). |
| Accessibilité, réduit, repli | 19/20 | Pause qui fige vraiment, `role="status"`, rien n'est chargé en mouvement réduit ni sans WebGL. −1 : le libellé change (« Reprendre ») **et** `aria-pressed` passe à `true`, si bien que le lecteur d'écran annonce « Reprendre, activé ». Les deux états se contredisent. |
| Fiche et prompt | 19/20 | Licence, poids et variables exacts ; le prompt contient la règle « œil du métier ». −1 : le texte alternatif décrit ce qu'on ne voit pas. |
| **Total** | **79** | |

**25 000 € ?** Pas encore. Si mon visiteur glisse le doigt et tombe sur un trou noir, il croit que le site est cassé. C'est une ligne à ajouter. Avec le vrai scan du client et le glisser borné, c'est un oui.

---

## 2. objet-defilement : 81 → 88

### Reprise des corrections du tour 1

| Tour 1 | État | Preuve |
|---|---|---|
| 1. Anse visible à l'étape 02 | **Corrigé** : anse de profil, entière, côté texte, à 1440, à 375 et en mouvement réduit | `obj-1440-etape2.png`, `m-obj-375.png` (vignettes 2 et 5) |
| 2. Ombre qui suit l'échelle | **Corrigé à l'œil, pas dans le code** : la position suit bien `e` et l'ombre ne flotte plus sous la soucoupe à 375. Mais `ombre.scale.setScalar(e);` est **resté dans le commentaire** (l. 212), donc l'ombre ne change jamais de taille. La fiche affirme l'inverse | `crop-obj-ombre.png`, l. 212 |
| 3. Crème de cappuccino | **Corrigé** : noisette tigrée, cœur de mousse de lait. C'est crédible | `obj-1440-etape3.png` |
| 4. Texte « espresso » | **Corrigé** : « Votre cappuccino », contenance cohérente | l. 99 |
| 5. Prompt « chaque pose montre son étape » | **Corrigé**, avec en plus la règle sur la contenance | fiche |

### Ce que j'ai vu

- Les trois étapes racontent enfin ce qu'elles disent : 01 le grès et le pied brut, 02 l'anse, 03 la surface du cappuccino vue d'en haut, avec l'ombre qui s'efface quand la tasse bascule. Je montrerais ça à une céramiste sans rougir.
- À 375, la tasse reste en haut, entière, la carte de verre en bas. Pendant les transitions, la carte passe sur la tasse floutée (`obj-375-mi0.5.png`) : c'est voulu et ça passe.
- Repli sans WebGL : l'affiche SVG de la tasse et de la soucoupe est propre aux deux tailles (`m-sansgl.png`, `m-sansgl-375.png`).
- Petit défaut : à 1440, l'ombre vue en rasant montre de fines rayures horizontales à gauche de la soucoupe (`crop-obj-ombre.png`, 1re vignette). La texture de 128 px est étirée sur 2,4 unités, sans mipmaps anisotropes.

| Critère | Note | Pourquoi |
|---|---|---|
| Beauté et finition | 35/40 | Juste pour le métier, belle matière, défilement fluide. Petites rayures dans l'ombre. |
| Utilité | 17/20 | Gabarit de page produit d'artisan réutilisable. |
| Accessibilité, réduit, repli | 17/20 | Inchangé : trois poses fixes en mouvement réduit, SVG de repli, un seul lien avec focus visible. |
| Fiche et prompt | 19/20 | Le prompt porte maintenant les règles de métier. −1 : la fiche décrit une mise à l'échelle de l'ombre que le code ne fait pas. |
| **Total** | **88** | |

**25 000 € ?** Oui. La céramiste voit son anse et le torréfacteur son cappuccino. Il reste une ligne à décommenter.

---

## 3. ile-flottante : 77 → 83

### Reprise des corrections du tour 1

| Tour 1 | État | Preuve |
|---|---|---|
| 1. Trois cabanes | **Corrigé** : trois tailles, autour de l'étang | `ile-1440.png` |
| 2. Cascade collée au bord | **Corrigé** : ruban courbé qui longe la roche et s'efface vers le bas. Il est pâle et fin, mais il est à sa place | `crop-ile.png` |
| 3. Étang dégagé | **Corrigé à 1440** : visible de face au départ. **À 375, l'étang n'est plus qu'un trait bleu** à cause de l'angle de caméra (`m-ile-375.png`) | |
| 4. Roche réduite et éclaircie | **Corrigé** (`#9b9384`) | |
| 5. Repli SVG avec trois cabanes et la cascade | **Corrigé** | `m-sansgl.png` |
| `aria-pressed` | **Ajouté** : Tab ×3, Entrée : « Relancer l'île », `aria-pressed="true"`, image figée (captures identiques) | `ile-1440-focus-pause.png` |

### Ce que j'ai vu

- **Erreur de métier, toujours dans le texte** : « Nuits **perchées** à quarante minutes de Guéret » (l. 79). Une cabane perchée est dans un arbre ou sur pilotis. Les trois cabanes de l'île sont posées dans l'herbe, avec de grands toits de maison. Le gérant de cabanes perchées dira « ce ne sont pas mes cabanes ».
- Sous la couche de terre, un **anneau gris clair** sépare la terre de la roche sur toutes les vues (`crop-ile.png`, sous la bande marron). Le haut du cône (sommet à y = −0,5, rayon 1,4) ne rejoint pas le bas de la terre (y = −0,525, rayon 1,45) et la face plane du cône se voit en clair.
- À 375, l'île touche presque les deux bords de l'écran et un rocher satellite est coupé à droite (`ile-375-t6.png`).
- Le reste est réussi : le glisser a de l'inertie, la lumière est douce, et l'île tourne sans à-coup.

| Critère | Note | Pourquoi |
|---|---|---|
| Beauté et finition | 33/40 | Trois cabanes, étang, cascade à leur place. Mais « perchées » contredit l'image, l'anneau gris se voit, et à 375 l'étang disparaît et l'île est trop large. |
| Utilité | 13/20 | Inchangé : un créneau (hébergement, tourisme). |
| Accessibilité, réduit, repli | 18/20 | Pause qui fige, mouvement réduit fixe, repli SVG cohérent. −1 : libellé qui change et `aria-pressed` en même temps (« Relancer l'île, activé »). −1 : le repli reste sommaire. |
| Fiche et prompt | 19/20 | « Autant de cabanes que le titre en annonce » est la bonne règle. Il manque « et du type annoncé (perchées) ». |
| **Total** | **83** | |

**25 000 € ?** Pas encore. Le titre compte juste maintenant, mais le chapô promet des cabanes perchées et l'image montre des cabanes au sol. Il suffit de changer un mot ou d'ajouter des pilotis.

---

## 4. mascotte-regard : 78 → 82

### Reprise des corrections du tour 1

| Tour 1 | État | Preuve |
|---|---|---|
| 1. Pas d'aigrettes | **Corrigé**, en 3D comme en SVG | `masc-1440.png`, `m-sansgl.png` |
| 2. Reflet caché au clignement | **Corrigé** : paupières fermées propres, sans point blanc (images 48 à 50 de la rafale) | `masc-clignement-049.png`, `crop-masc.png` |
| 3. Disques faciaux qui encadrent les yeux | **Partiellement corrigé** : de face, les deux disques forment un beau masque (`crop-masc.png`, image 030). Dès qu'elle tourne la tête, et c'est sa pose de départ en aperçu, **le disque du côté qui s'éloigne dépasse la silhouette de la tête** comme une joue collée (`masc-1440.png`, `masc-1440-hautgauche.png`, `crop-masc.png` image 005) | |
| 4. Prompt sans aigrettes | **Corrigé**, mais il demande un disque « en cœur » (voir ma correction plus haut) | fiche |
| `aria-pressed` | **Ajouté** : Tab ×6, Entrée : « Relancer la chouette », `aria-pressed="true"` | `masc-1440-focus-pause.png` |

### Ce que j'ai vu

- Le regard suit bien le focus : sur « Nous trouver à Rennes », elle regarde en bas à gauche (`masc-1440-focus-bd.png`). À 375, le focus fait défiler la page et elle suit.
- Le clignement est maintenant propre. En mouvement réduit, elle reste fixe et regarde droit devant, même quand je bouge la souris.
- Le débord des disques est le seul défaut qui se voit en trois secondes. Pour un libraire jeunesse, des yeux blancs à pupille noire sur une hulotte (qui a les yeux noirs), c'est une convention de dessin animé qui passe.

| Critère | Note | Pourquoi |
|---|---|---|
| Beauté et finition | 33/40 | Plus d'aigrettes, clignement propre, matière peluche réussie. Les disques débordent dès que la tête tourne. |
| Utilité | 12/20 | Inchangé : page 404 ou page de remerciement. |
| Accessibilité, réduit, repli | 19/20 | Toujours exemplaire. Même remarque sur le libellé qui change en plus d'`aria-pressed`. |
| Fiche et prompt | 18/20 | Le prompt demande un masque « en cœur », un trait de l'effraie : il reproduira le mauvais oiseau. |
| **Total** | **82** | |

**25 000 € ?** Pas encore. De face, c'est une jolie hulotte. Mais la première image qu'on voit, tête tournée, montre une joue qui sort de la tête.

---

## Plan de corrections (tour 2)

| FIX | gravité | coût | résumé |
|---|---|---|---|
| FIX-S1 | majeur | **0 $** | Spark : borner le glisser et le va-et-vient pour ne jamais montrer le vide |
| FIX-S2 | léger | **0 $** | Spark : texte alternatif de l'affiche fidèle au cadrage ; affiche plus proche de l'ambiance du scan |
| FIX-O1 | léger | **0 $** | Objet : sortir `ombre.scale.setScalar(e)` du commentaire |
| FIX-O2 | léger | **0 $** | Objet : texture d'ombre en 256 px avec anisotropie (rayures) |
| FIX-I1 | majeur | **0 $** | Île : « perchées » contredit l'image : changer le mot ou poser les cabanes sur pilotis |
| FIX-I2 | moyen | **0 $** | Île : supprimer l'anneau gris entre la terre et la roche |
| FIX-I3 | moyen | **0 $** | Île à 375 : île plus petite et caméra plus haute pour voir l'étang |
| FIX-M1 | majeur | **0 $** | Mascotte : disques faciaux qui ne dépassent jamais de la tête |
| FIX-M2 | léger | **0 $** | Mascotte : fiche et prompt : disque rond cerclé de brun (hulotte), pas en cœur (effraie) |
| FIX-T1 | léger | **0 $** | Les trois boutons Pause : soit un libellé fixe avec `aria-pressed`, soit un libellé qui change sans `aria-pressed` |
| FIX-S3 | (hors périmètre) | **client** | Vrai scan du lieu (.spz, moins de 500 000 splats) et photo d'affiche de la même pièce |

### FIX-S1 : borner le glisser (spark-splat-lieu.html)
- Où : l. 186 (`pointermove`) et l. 171 (`placer`).
- Comment : `cible = Math.max(-0.35, Math.min(0.35, glisse.c - (e.clientX - glisse.x) / 300));` et borner l'angle total : `const total = Math.max(-0.4, Math.min(0.4, cible + balancier));`. Si la bande vide revient au bout du va-et-vient (`spark-1440-apercu-t8.png`), baisser `data-balancier` à 0,15 ou `data-recul` à 0,6. Ajouter dans la fiche une variable `data-glisser-max`.
- Vérifier : glisser de 400 px dans chaque sens, aucune bande noire.

### FIX-S2 : affiche (spark-splat-lieu.html, l. 99-100)
- Texte alternatif : décrire ce qu'on voit dans le cadrage (« Le séjour du gîte : un canapé en lin, le poêle à bois près de la porte-fenêtre, murs de pierre »).
- Tant que le scan d'exemple est une bibliothèque de nuit, choisir dans `exemples/` une photo du soir, au feu allumé, si elle existe, pour que le fondu choque moins.

### FIX-O1 : ombre (objet-defilement.html, l. 212)
- Remplacer par deux instructions : `ombre.position.set(x, y - .6 * e, 0); ombre.scale.setScalar(e);`.

### FIX-O2 : rayures de l'ombre (objet-defilement.html, l. 194-197)
- Canvas en 256 px et `tex.anisotropy = renderer.capabilities.getMaxAnisotropy()`. Ou, plus simple, une ombre sur un plan tourné un peu vers la caméra.

### FIX-I1 : « perchées » (ile-flottante.html, l. 79 et l. 174-181)
- Le plus simple : « Nuits au bord de l'étang à quarante minutes de Guéret ».
- Ou garder « perchées » : dans `cabane()`, poser la boîte sur quatre pilotis (`CylinderGeometry(.025,.025,.35,5)` aux quatre coins, cabane remontée de 0,35), avec une petite échelle. Mettre à jour le SVG de repli et la fiche (« du type annoncé »).

### FIX-I2 : anneau gris (ile-flottante.html, l. 136)
- Faire entrer le cône dans la terre : `maille(..., 0, -1.3, 0)` (sommet à −0,45), et donner au cône un rayon de 1,45 pour qu'il rejoigne le bas de la terre. Adapter `bord()` (l. 139) pour que la cascade reste collée.

### FIX-I3 : île à 375 (ile-flottante.html, l. 209-213)
- Quand l'écran est étroit : `ile.scale.setScalar(.76)` et `camera.position.set(0, 4.6, 15)`, puis `lookAt(0, -.3, 0)`, pour qu'on voie l'étang de dessus et qu'il reste au moins 24 px de marge de chaque côté.

### FIX-M1 : disques faciaux (mascotte-regard.html, l. 147)
- Rapprocher les disques du centre, les rendre plus étroits et les coucher davantage sur la courbe de la tête, par exemple `boule(.46, masque, s * .3, -.02, .78, .9, 1.1, .28)` avec `disque.rotation.y = s * .6`. Ou créer les disques comme une calotte (`SphereGeometry(.97, 32, 16, φ, Δφ, θ, Δθ)`) concentrique à la tête : ils ne peuvent alors pas sortir de la silhouette.
- Vérifier avec la souris en haut à gauche puis en bas à droite (`masc-1440-hautgauche.png`, `masc-1440-basdroite.png`).

### FIX-M2 : fiche et prompt (mascotte-regard.md)
- Remplacer « disque facial en cœur » par « disque facial rond, cerclé d'un liseré brun foncé (chouette hulotte ; le cœur, c'est l'effraie) ». En option, pour plus de vérité : un liseré sombre (`--masc-plume` × 0,6) autour des disques.

### FIX-T1 : boutons Pause (spark l. 194-195, île l. 250-251, mascotte l. 232-233)
- Choisir un seul modèle pour tout le kit. Recommandé : garder le libellé qui change (« Mettre en pause » / « Relancer ») et **retirer** `aria-pressed`. C'est ma recommandation du tour 1 (« `aria-pressed` partout ») qui a mené à ce doublon : je la rectifie ici.

« La tasse, je la mets en ligne demain. Pour les trois autres, il reste un mot, un réglage et une joue à corriger : rien qui coûte, mais rien que mes clients ne verraient pas. »
