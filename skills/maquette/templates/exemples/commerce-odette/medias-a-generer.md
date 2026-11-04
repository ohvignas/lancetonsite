# Fournil Odette — médias à générer

Six images au plus, aucune vidéo (le hero tient avec la photo de croûte annotée). Générées le 4 novembre 2026 avec l'accord de l'utilisateur (FLUX.2 Pro, OpenRouter) : P1 à P6, puis odette, pain-chocolat, seigle, noix, sacs-farine, pain-torchon et couche (tour 1 de la persona), puis miche-640 et four-bouche-1000 / 660 (tour 2, FIX-20 et FIX-21, session principale). Au tour 2, la carte P1 a été retouchée en local sans nouvelle génération (FIX-24, `NOTES.md` § 5).

Chaque fichier remplace un fichier du même nom déjà présent dans `images/`. Le code accepte le fichier généré sans retouche : même nom, même ratio, `width` et `height` déjà posés dans le HTML ou dans `PRODUITS`.

## Style de shooting commun (photos P2 à P6)

À coller à la fin de chaque prompt photo :

> Documentary editorial photography in a small French sourdough bakery in Tours, early morning. Warm light from the wood-fired oven mixed with soft daylight from a side window. Palette: flour cream, deep crust brown, rye-dark ink, worn oak, linen. Shot on a 35 mm lens at f/2.8, natural shallow depth of field, light film grain, slightly desaturated warm grade. Real textures, flour dust, no styling props. No text, no logo, no signage, no watermark.

Après génération, même traitement que les photos libres (NOTES.md § 5) : étalonnage `eq=saturation=0.84:contrast=1.04:gamma=1.02,colorbalance=rs=0.03:bs=-0.04:rm=0.02:bm=-0.03:rh=0.01:bh=-0.02`, recadrage au format exact, puis `cwebp -size <poids> -pass 6 -m 6`.

## P1 — Carte de la farine (priorité 1, demande directe de l'utilisateur)

| | |
|---|---|
| Fichier | `images/carte-farine.webp` (remplace l'emplacement actuel) |
| Format | 1600 × 1200 px, 4:3, poids cible 220 Ko |
| Où | Section 8 `#farine`, « Le blé pousse à 25 km du four », colonne de droite, dans un cadre papier légèrement tourné. Sur téléphone, pleine largeur sous la liste des trois lieux. |
| Remarque | Le texte des lieux et des distances est déjà en HTML à côté de la carte (`ol.lieux`) : si le modèle écrit mal les noms, préférer une carte sans texte plutôt qu'avec des fautes. |

Prompt :

> Hand-drawn illustrated map in the style of a baker's field notebook, ink and watercolour on warm cream paper, seen from above, landscape 4:3. The region just north of Tours, France: the Loire river crossing the bottom of the page from left to right, the Cher river joining it lower right, both in soft grey-blue watercolour. Three places linked by dotted ink routes: top left, a wheat farm with golden wheat fields and a stone farmhouse, labelled "Ferme des Gâts"; centre right, a small stone water mill with a millstone, labelled "Moulin Bréchard"; bottom centre, between the two rivers, a tiny bakery shopfront with a chimney, labelled "Fournil Odette". The dotted route from the farm to the mill is marked "25 km", the route from the mill to the bakery "14 km". A small compass rose in the top right corner, a simple scale bar "10 km" bottom left. Fine sepia ink line, loose watercolour washes in wheat gold, crust brown and grey-blue, generous paper margins, subtle paper grain. Elegant, precise, calm, like a page from a craftsman's sketchbook. No other text, no modern map symbols, no roads, no logos, no frame.

## P2 — Odette au fournil (priorité 2)

| | |
|---|---|
| Fichier | `images/odette-900.webp` |
| Format | 900 × 1125 px, 4:5, poids cible 90 Ko |
| Où | Section 9 `#equipe`, « Trois personnes et un four à sole », photo posée avec la note « au four dès 4 h ». |

Prompt :

> Portrait of a French woman baker, 41 years old, dark brown hair tied back, a few flour marks on her forearms, linen apron dusted with flour, sleeves rolled up, holding a large round sourdough loaf scored with a cross in a linen towel, standing in front of a masonry deck oven, cast-iron door, fire not visible, looking slightly off camera with a calm, tired smile. Vertical 4:5 framing from mid-thigh up, the loaf at the centre of the image. [style commun]

Corrigé le 4 novembre 2026 (refonte, tour 1, FIX-3) : le premier prompt demandait « early fifties, short grey hair » et « open mouth of a wood-fired bread oven, glowing embers » ; l'image montrait une femme d'une soixantaine d'années devant un four à pizza. Odette a 41 ans (`brief.md`). Image régénérée avec ce prompt.

## P3 — La fournée qui sort du four (priorité 3)

| | |
|---|---|
| Fichier | `images/four-1400.webp` |
| Format | 1400 × 933 px, 3:2, poids cible 110 Ko |
| Où | Section 2 `#fournee` (« Sorti du four ce matin », à côté du ticket du jour, recadrée en 4:5 sur ordinateur, sujet centré). L'étape 3 de `#fabrication` a sa propre image depuis le tour 2 (`four-bouche-1000` / `660`, porte ouverte, sans flammes). |

Prompt :

> The mouth of a wood-fired sole oven, a long wooden peel sliding out three round sourdough loaves with dark blistered crusts and open ears, embers glowing at the back of the oven, a baker's forearm and hand on the peel, steam and flour dust in the light. Horizontal 3:2, the loaves in the central third so the image can be cropped to a vertical 4:5. [style commun]

## P4 — Croissant (priorité 4)

| | |
|---|---|
| Fichier | `images/croissant-640.webp` |
| Format | 640 × 640 px, 1:1 (générer en 1024 × 1024 puis réduire), poids cible 45 Ko |
| Où | Section 4 `#boutique`, fiche « Croissant · pur beurre · 1,40 € ». |

Prompt :

> Two all-butter croissants on a worn oak board with a sheet of baking paper, flaky golden layers, a few crumbs, shot from a 45-degree angle, square 1:1 framing with the croissants filling the centre and some breathing room around them. [style commun]

## P5 — Pain au chocolat (priorité 5)

| | |
|---|---|
| Fichier | `images/pain-chocolat-640.webp` |
| Format | 640 × 640 px, 1:1 (générer en 1024 × 1024 puis réduire), poids cible 45 Ko |
| Où | Section 4 `#boutique`, fiche « Pain au chocolat · pur beurre · 1,60 € ». |

Prompt :

> Three French pains au chocolat on the same worn oak board, one broken open to show the laminated layers and two dark chocolate batons, shot from a 45-degree angle, square 1:1 framing, same light and board as the croissant photo. [style commun]

## P6 — La vitrine le soir (priorité 6, facultative)

| | |
|---|---|
| Fichier | `images/vitrine-720.webp` |
| Format | 720 × 900 px, 4:5, poids cible 70 Ko |
| Où | Section 11 `#acces`, « 27 rue de la Fuye, quartier Velpeau », à côté des horaires. |

Prompt :

> Small neighbourhood bakery shopfront in a quiet street of Tours at dusk, warm light inside, wooden shelves of round sourdough loaves behind the window, a customer in a coat waiting at the counter seen through the glass, pale tufa-stone facade typical of the Loire valley, wet pavement. Vertical 4:5. No readable sign, no lettering on the glass. [style commun]

## Ordre si le budget est court

P1 seule règle la demande de l'utilisateur. P2 et P3 donnent une même lumière aux deux sections les plus vues après le hero. P4 à P6 harmonisent la boutique et l'accès ; sans elles, les photos libres actuelles tiennent.
