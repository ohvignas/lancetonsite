# Tour 2 — lot 9b, éléments 3D (regard client à 25 000 €)

Date : 5 novembre 2026. Je joue le patron qui paie et le designer qui choisit. Chrome (Playwright, GPU Metal) sur `http://127.0.0.1:4339/…/elements-3d/<nom>.html` en `?apercu` et en mode normal, à 1440 × 900 et 375 × 812 (tactile), avec la souris (balayage), un appui au doigt, 8 tabulations, le bouton pause activé au clavier, le défilement en 8 paliers pour le tunnel, le mouvement réduit (`reducedMotion: 'reduce'`) et sans WebGL (`--disable-webgl --disable-3d-apis`). Je n'ai lu que mon rapport du tour 1 (`lot-9.md`) et les fiches. Aucun fichier de la bibliothèque n'a été modifié.

**Console : 0 erreur, 0 requête en échec sur les 4 éléments, dans toutes les configurations. Aucun débordement horizontal (scrollWidth = largeur) à 1440 ni à 375.** Focus : contour plein de 3 px sur chaque lien et chaque bouton atteint. `aria-pressed` présent et juste sur les trois boutons pause testés (titre, champ, gelée).

Mouvement réduit, souris bougée entre deux captures prises à 1,3 s d'écart : titre, gelée et tunnel identiques au pixel près. Pour le champ, l'image change : l'herbe s'écarte d'un coup sous le curseur, sans animation. C'est voulu et écrit dans la fiche (« l'herbe ne s'écarte que sous le curseur, sans lissage ») ; je l'accepte, puisque rien ne bouge seul.

Captures : `persona-biblio/captures-tour2-lot-9b/` (`<élément>-<config>-*.png`, planches `m-*.png`, gros plans `crop-*.png`).

| élément | tour 1 | tour 2 | 25 000 € ? |
|---|---|---|---|
| titre-extrude | 76 | 83 | Pas encore : la croûte tient, mais le mot se lit « LEV AIN » |
| tunnel-defilement | 80 | 87 | Pas encore, à une retouche : les barriques flottent sans chantier |
| champ-instances | 79 | 87 | **Oui** |
| gelee-tremble | 72 | 82 | Pas encore : le sucre ressemble à de la mousse, la composition à 1440 reste en bas à droite |

Barème : beauté et finition /40, utilité réelle /20, accessibilité, mouvement réduit et repli /20, fiche et prompt /20.

---

## 1. titre-extrude — 76 → 83

Reprise du tour 1 :
- Croûte en liège : **corrigé**. De face, on voit maintenant un dégradé doré, des bulles, des craquelures fines, un voile de farine et une grigne courbe par lettre (`crop-titre-LEV.png`). Un boulanger y voit du pain, ou au moins du biscuit bien cuit.
- Arêtes plus brunes : **partiellement corrigé**. Les flancs sont bruns mais d'un orange uni, presque terre cuite, sans grain ni dorure inégale : sur les côtés, on dirait de la brique.
- N dans le cadre à 375 : **corrigé** (marge d'environ 40 px, `titre-extrude-375-a.png`).
- `aria-pressed` : **corrigé** (« true / Relancer le mot » vérifié).

| Critère | Note | Pourquoi |
|---|---|---|
| Beauté et finition | 31/40 | Les faces sont enfin crédibles. Mais (1) **le mot se lit « LEV AIN »** : entre le V et le A, il y a un trou nettement plus large qu'entre les autres lettres (`titre-extrude-1440-a.png`, `-souris.png`). Le code espace les lettres selon leur boîte (l. 189 `x += w + .1`) et ignore les approches de la police, alors que V et A doivent s'emboîter. Un designer le voit en une seconde, et sur le mot de la marque c'est rédhibitoire. (2) Les flancs sont unis et orange. (3) À 375, le mot ne fait que 65 px de haut, avec 160 px de vide sous lui avant le surtitre. |
| Utilité | 14/20 | Inchangée : bon pour un nom court, ASCII seulement (dit dans la fiche). |
| Accessibilité, réduit, repli | 19/20 | Repli CSS en relief propre, avec message discret (`titre-extrude-nogl-375-a.png`). En mouvement réduit, l'image est fixe et le bouton propose « Relancer le mot ». Vrai `h1`. |
| Fiche et prompt | 19/20 | Licence MgOpen, poids détaillé, prompt précis (grigne, normal map, flancs, 78 % à 375, œil du métier). Il manque juste l'approche des paires. |

**25 000 € ?** Pas encore : mon boulanger s'appelle « Levain », pas « Lev Ain ». C'est une correction de dix lignes.

Corrections restantes (gratuites) :
1. `titre-extrude.html` l. 180-189 : avancer chaque lettre selon la chasse de la police (`font.data.glyphs[c].ha * taille / font.data.resolution`) au lieu de la largeur de sa boîte, ou appliquer une table d'approche pour les paires creuses (`VA`, `AV`, `LV`, `AW`, `LT`, `TA`, `YA`) d'environ −0,12 × taille. Vérifier à l'œil que les six espaces entre lettres paraissent égaux.
2. Matière des flancs : reprendre la texture de croûte en plus sombre (`color` multiplié vers `#7a4520`), avec un peu de bruit et la même normal map, au lieu d'une teinte unie.
3. À 375 : remonter le titre HTML ou réduire la hauteur du canevas d'environ 120 px pour supprimer le vide sous le mot.
4. Fiche, prompt : ajouter « approches de paires respectées (V et A s'emboîtent) ».

---

## 2. tunnel-defilement — 80 → 87

Reprise du tour 1 :
- Fonds de barrique en rondins : **corrigé**. Les fonds sont en douelles droites, avec le jable et une marque à la craie « B·24 » (`crop-tunnel-barriques.png`, `m-tunnel-rm1440.png`).
- Pressoir en tourniquet : **corrigé**. C'est un vrai pressoir à cage : maie, lattes cerclées, vis, madriers, écrou à levier, bec de la maie (`crop-tunnel-pressoir.png`).
- Cuves qui frôlent la caméra : **corrigé** en défilement (`tunnel-defilement-1440-s2.png`, inox satiné, rien de brûlé) ; **partiellement** en mouvement réduit, où le plan fixe des cuves reste très près et coupe la troisième cuve au bord droit, à 1440 comme à 375 (`m-tunnel-rm1440.png`, `m-tunnel-rm375.png`).
- Tuffeau qui se lit comme de la brique : **corrigé**. On voit des blocs crème appareillés.
- Premier plan réduit collé au pressoir : **corrigé** (`tunnel-defilement-rm-1440-a.png`).
- Repli flou : **corrigé**. Une vraie image de la scène se charge seulement sans WebGL (`m-tunnel-nogl1440.png`).

| Critère | Note | Pourquoi |
|---|---|---|
| Beauté et finition | 35/40 | C'est maintenant une vraie cave de Vouvray : voûte en tuffeau, doubleaux, pressoir juste, cuves, casiers, porte de lumière au bout. Restent deux défauts de vigneron et un de finition. (1) **Les barriques flottent** : pas de chantier (les deux poutres de bois sur lesquelles on les couche), et le rang du bas ne touche pas le sol. (2) La même marque « B·24 » sur toutes les barriques, alors qu'on marque le millésime ou le lot, pas le même numéro partout. (3) Aux extrémités des fûts les plus proches, le jable dépasse en éclats pointus, comme du papier déchiré (`crop-tunnel-barriques.png`, bords gauche et droit). Un seul cercle visible par moitié de fût : une barrique bordelaise en a trois par côté. |
| Utilité | 15/20 | Inchangée : excellent pour une visite de lieu, lourd pour une page qui doit aller vite. |
| Accessibilité, réduit, repli | 18/20 | Plans fixes par étape, image de repli légère (23 Ko et 18 Ko) chargée seulement quand il le faut. Deux réserves. À 375 sans WebGL, la pastille « Aperçu fixe » dépasse des deux côtés de la carte de texte quand celle-ci passe dessus (`m-tunnel-nogl375.png`, 2e et 3e vues). Et c'est la même image du pressoir pour les quatre étapes : on parle des cuves en montrant un pressoir. |
| Fiche et prompt | 19/20 | Précise : douelles, « jamais de cernes de rondin », pressoir à cage détaillé, poids des images. Il manque les chantiers. |

**25 000 € ?** Pas encore, mais à une retouche : mon vigneron demandera « elles tiennent sur quoi, mes barriques ? ». Avec les chantiers, je le vends.

Corrections restantes (gratuites) :
1. Chantiers : deux poutres basses le long de chaque rangée (`BoxGeometry` instanciée ou une seule maille allongée), le rang du bas posé dessus, le rang du haut calé dans le creux entre deux fûts du dessous.
2. Profil du fût (`LatheGeometry`) : fermer le jable avec un dernier point du profil qui rentre vers le fond au lieu de sortir, pour supprimer les éclats aux bords. Ajouter deux cercles de plus par moitié.
3. Marques à la craie variées (millésime et parcelle : « 24 GR », « 24 CL », « 23 GR »), tirées au hasard par instance.
4. Mouvement réduit : reculer le plan fixe de l'étape cuves (plus loin sur le trajet, ou regard décalé vers l'axe) pour que les trois cuves tiennent entières.
5. Repli sans WebGL : `.tunnel__etat` sous les cartes (`z-index` plus bas ou placé en bas à droite) ; idéalement une image par étape (même procédé de capture, environ 20 Ko chacune).
6. Fiche, prompt : ajouter « barriques couchées sur chantiers, rang du bas posé ».

---

## 3. champ-instances — 79 → 87

Reprise du tour 1 :
- Fleurs en cailloux sans tige : **corrigé**. Les orchis pourpres sont en épi sur une tige, les lins bleus à cinq pétales sur leur tige (`crop-champ.png`).
- Prairie grasse au lieu du causse : **corrigé pour l'essentiel**. Sol de terre sèche, pierres calcaires à demi enterrées, coussins de thym gris-vert piqués de mauve, herbe jaunie (`champ-instances-1440-souris.png`). L'herbe reste un peu haute et serrée au premier plan pour une pelouse rase, mais ça se lit comme une pelouse sèche.
- Écartement invisible : **corrigé**. Sous la main, les brins se couchent nettement (`m-champ-main.png`, à gauche sans la main, à droite avec).
- Repli en peigne qui heurte les boutons : **corrigé**. La bande est sous les boutons à 1440 et à 375 (`champ-instances-nogl-1440-a.png`).
- « Extraction à froid » : **corrigé** en « miel non chauffé ».

| Critère | Note | Pourquoi |
|---|---|---|
| Beauté et finition | 34/40 | Le causse est là : thym, pierre, orchis, lin, lumière sèche. Le titre « le thym et la pierre chaude » correspond enfin à ce qu'on voit. Réserves : les épis d'orchis sont faits de petits cubes (on dirait des grappes de raisin au premier plan, `crop-champ.png` à droite) ; l'herbe du premier plan est encore haute ; à 1440, les pointes d'herbe passent derrière les deux boutons (ils restent lisibles). |
| Utilité | 16/20 | Hero vivant pour producteurs, gîtes, marques d'extérieur. |
| Accessibilité, réduit, repli | 18/20 | Pause 44 px avec `aria-pressed`, pas de vent en mouvement réduit, `touch-action: pan-y`. Le repli SVG est propre mais naïf : les orchis y deviennent des cotons-tiges roses, et à 375 la pastille « Aperçu fixe » recouvre la moitié de la bande (`m-champ-375.png`, 4e vue). |
| Fiche et prompt | 19/20 | Prompt très précis (espèces, tiges, thym, pierres, comportement en mouvement réduit, œil du métier). |

**25 000 € ?** Oui : mon apiculteur reconnaît son causse, et la main qui couche l'herbe fait sourire. Les retouches ci-dessous sont du polissage.

Corrections restantes (gratuites, non bloquantes) :
1. Épi d'orchis : remplacer les petits cubes par 8 à 12 petites sphères aplaties ou des triangles, en spirale le long de l'épi, avec un dégradé du rose pâle en bas au pourpre en haut.
2. Herbe du premier plan : hauteur × 0,75 dans la bande la plus proche de la caméra.
3. Repli SVG : épis d'orchis en petites taches empilées plutôt qu'une ellipse ; pastille de message en haut à droite à 375, ou au-dessus de la bande.

---

## 4. gelee-tremble — 72 → 82

Reprise du tour 1 :
- Gelées coupées à 375 : **corrigé**. Les cinq pièces tiennent entières avec une marge (`m-gelee-375.png`).
- Jouets en plastique brillant : **corrigé pour l'essentiel**. Les pièces sont mates, enrobées de sucre, aux couleurs du fruit cuit : abricot, cerise, reine-claude, coing, cassis (`crop-gelee.png`).
- Bouton inutile en mouvement réduit : **corrigé**. Il devient « Voir secouées » / « Remettre au repos » avec `aria-pressed`, et passe bien à l'état déformé figé (`m-gelee-375.png`, 4e vue).
- « Gelées » au lieu de « pâtes de fruits » : **corrigé** dans le texte et la fiche.
- Repli SVG : **corrigé** (tout est posé au sol, le palet a du volume).

| Critère | Note | Pourquoi |
|---|---|---|
| Beauté et finition | 30/40 | Les pièces ressemblent maintenant à des pâtes de fruits. Mais (1) l'enrobage est un bruit fin et régulier sur toute la surface : de près, ça fait mousse de polystyrène ou éponge (vert surtout, `crop-gelee.png`), pas des cristaux de sucre qui accrochent la lumière. (2) Le dôme de cerise est énorme (deux fois le volume d'un cube) et brille au sommet : ce n'est pas une forme de confiseur, une pâte de fruits moulée fait la taille d'une bouchée. (3) À 1440, les pièces sont groupées en bas à droite et laissent tout le quart en haut à droite vide (`gelee-tremble-1440-a.png`). |
| Utilité | 14/20 | Confiserie, produits mous : niche, mais juste. |
| Accessibilité, réduit, repli | 20/20 | Exemplaire maintenant : équivalent clavier, bouton utile en mouvement réduit, pause avec `aria-pressed`, repli SVG cohérent, image fixe en mouvement réduit. |
| Fiche et prompt | 18/20 | Complète, avec la note de métier « on dit pâtes de fruits ». Le prompt dit encore « chaque gelée a un petit ressort » : à remplacer par « chaque pièce ». |

**25 000 € ?** Pas encore : la confiseuse d'Apt reconnaîtra ses pâtes de fruits de loin, mais de près elle verra de l'éponge et un dôme de cerise grand comme une orange.

Corrections restantes (gratuites) :
1. Sucre : peindre des grains plus gros (2 à 4 px sur 1024²), moins nombreux, avec des facettes claires (quelques pixels blancs purs) et laisser voir la pâte entre eux. Mettre la même carte en `roughnessMap` (grains plus brillants que la pâte) pour qu'ils scintillent à la rotation.
2. Dôme de cerise : rayon × 0,7 et légèrement aplati (`scale.y ≈ .75`), `roughness` relevée pour supprimer le point brillant.
3. Composition à 1440 : centrer le groupe verticalement sur le titre (monter la cible de caméra d'environ 0,6 unité) ou agrandir légèrement la scène pour occuper la moitié droite.
4. Fiche, prompt : « chaque pièce » au lieu de « chaque gelée » ; « grains de sucre visibles un à un ».

Médias : une vraie photo de pâtes de fruits pour le repli serait un plus, mais ce n'est pas nécessaire.

---

## Constat d'ensemble

Le correcteur a traité chaque reproche du tour 1. Les erreurs de métier criantes ont disparu : le liège, les rondins, le tourniquet, les cailloux et les jouets en plastique. Le champ passe. Le tunnel est à une retouche (les chantiers). Le titre bute sur une faute de typographe (l'approche V-A) qui se corrige en dix lignes. La gelée demande encore un vrai travail de matière sur le sucre. Tout le reste se corrige gratuitement, sans génération.
