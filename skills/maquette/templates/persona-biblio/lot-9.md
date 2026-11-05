# Lot 9 — éléments 3D (regard client à 25 000 €)

Date : 5 novembre 2026. Testé dans Chrome (Playwright, GPU Metal) sur `http://127.0.0.1:4330/…/elements-3d/<nom>.html?apercu` et en mode normal, à 1440 × 900 et 375 × 812, avec mouvement réduit (`reducedMotion: 'reduce'`) et sans WebGL (`--disable-webgl --disable-3d-apis`). J'ai bougé la souris, cliqué, glissé, fait 10 tabulations, défilé en 6 paliers pour les éléments de défilement et touché au doigt à 375. Aucun fichier de la bibliothèque n'a été modifié.

**Console : 0 erreur, 0 requête en échec sur les 8 éléments. Aucun débordement horizontal (scrollWidth = largeur) à 1440 ni à 375.** Mouvement réduit : deux captures à 1,2 s d'écart identiques au pixel près pour les 8.

Captures (planches) : `persona-biblio/captures-lot-9/` (`m-<élément>*.png` pour les planches, `crop-*.png` pour les gros plans).

| élément | note | 25 000 € ? | médias utiles ? |
|---|---|---|---|
| spark-splat-lieu | 72 | Pas encore | Oui, mais pas générés : il faut le **vrai scan** du lieu (.spz) ; une image générée ne remplace pas un scan |
| objet-defilement | 81 | Pas encore | Non, la tasse en code tient ; au mieux une HDRI d'atelier pour les reflets |
| ile-flottante | 77 | Pas encore | Non, le low-poly en code est le style voulu |
| mascotte-regard | 78 | Pas encore | Non, ce sont les primitives qu'il faut corriger |
| titre-extrude | 76 | Pas encore | Oui : une texture de croûte générée, tuilable, 1024², ferait nettement monter la note |
| tunnel-defilement | 80 | Pas encore | Oui : textures tuilables générées (tuffeau taillé, fond de barrique en douelles, 1024²) et une affiche de repli 16:9 + 9:16 |
| champ-instances | 79 | Pas encore | Un peu : une affiche de repli générée (pelouse de causse fleurie, 16:9 et 9:16) à la place du SVG en peigne |
| gelee-tremble | 72 | Pas encore | Non pour la 3D ; une photo de vraies pâtes de fruits pour le repli serait un plus |

Barème : beauté et finition /40, utilité réelle /20, accessibilité, mouvement réduit et repli /20, fiche et prompt /20.

Mon constat d'ensemble : la technique est solide partout (zéro erreur, repli et mouvement réduit branchés sur les 8, fiches complètes avec poids, variables et prompt prêt à coller). Ce qui empêche le « oui », ce sont des **erreurs de métier visibles en trois secondes** : une anse cachée pile quand on parle de l'anse, une « chouette » qui a des aigrettes de hibou, des fonds de barrique dessinés comme des rondins, des lettres « croûte » en liège, des gelées cadrées hors de l'écran sur téléphone. Presque tout se corrige gratuitement.

---

## 1. spark-splat-lieu — 72/100

| Critère | Note | Pourquoi |
|---|---|---|
| Beauté et finition | 22/40 | Le rendu des splats est net et fluide, le fondu de l'affiche vers le scan est propre. Mais le scan montré est une **bibliothèque de fantaisie avec une cheminée** alors que le titre dit « Entrez dans le fournil… le four à bois, le pétrin, les bannetons » : le boulanger voit une pièce qui n'est pas la sienne. Le scan ne remplit pas le cadre (environ 15 % de vide sombre à gauche, `m-spark.png`). En aperçu à 1440, le hero n'occupe que les 500 px du haut et laisse 400 px de noir dessous. La pastille d'état reste là comme un halo sombre autour du bouton Pause, sans texte. |
| Utilité | 13/20 | Une vraie valeur pour un lieu qu'on visite (fournil, gîte, restaurant), mais seulement si le client a un scan propre, et c'est lourd (environ 1,2 Mo gzip de bibliothèques plus 4 Mo de scan). |
| Accessibilité, réduit, repli | 18/20 | Très bien : la photo reste en repli, rien n'est chargé en mouvement réduit ni sans WebGL, `aria-pressed` sur Pause (« true Reprendre » vérifié), `role="status"`, focus visible orange et blanc. |
| Fiche et prompt | 19/20 | La meilleure fiche du lot : licence MIT vérifiée, absence de licence du scan d'exemple signalée honnêtement, poids réels, variables, prompt complet. |

**25 000 € ?** Pas encore : je ne montre pas à un boulanger une bibliothèque de sorcier sous le mot « fournil », même en démo.

Corrections gratuites, par priorité :
1. `spark-splat-lieu.html` l. 84-85 : tant que le scan d'exemple est la cheminée, aligner les textes de démo sur ce qu'on voit (salon de thé ou librairie avec cheminée : « Entrez dans le salon avant même de pousser la porte ») ; ou bien démarrer en mode affiche (photo du fournil) avec un bouton « Voir la pièce en 3D » qui charge le scan à la demande.
2. Cadrage : passer `data-recul="1"` (l. 93) à environ `0.75`, et centrer le regard sur le centre de la boîte englobante (l. 160) pour supprimer la bande vide à gauche.
3. `.splat__etat` (l. 44) : quand le texte d'état est masqué ou vide, retirer le fond (`background: transparent`), sinon il reste un halo noir autour de Pause.
4. Démo en `?apercu` : `.page { min-height: 100svh; display: grid; align-content: center; }` pour ne pas laisser 45 % d'écran noir.

Médias : le gain viendra du vrai scan du client (Polycam ou Luma, .spz, moins de 500 000 splats), pas d'une génération.

---

## 2. objet-defilement — 81/100

| Critère | Note | Pourquoi |
|---|---|---|
| Beauté et finition | 30/40 | La tasse est belle : grès moucheté crédible, pied brut visible, soucoupe, vernis discret (`crop-obj.png`). Le défilement est fluide. Trois défauts de métier : (1) **à l'étape « 02 — L'anse », l'anse est cachée derrière la tasse**, à 1440 comme à 375 et en mouvement réduit (`m-obj1.png` défil2 et 3, `m-x.png`) : on parle de l'anse et on la cache ; (2) l'ombre de contact flotte 50 à 70 px sous la soucoupe sur téléphone (`crop-obj375.png`) ; (3) la « crème » est un dégradé radial avec un trou sombre au centre, ça ne ressemble pas à une crème d'espresso. |
| Utilité | 16/20 | Très bon gabarit de page produit d'artisan, réutilisable pour beaucoup d'objets. |
| Accessibilité, réduit, repli | 17/20 | Mouvement réduit : 3 poses fixes. Repli SVG propre. Le seul lien a un focus visible. Pas besoin de bouton pause. |
| Fiche et prompt | 18/20 | Complète ; le prompt ne dit pas que chaque pose doit montrer ce dont parle l'étape, ce qui a produit le bug de l'anse. |

**25 000 € ?** Pas encore : la céramiste verra tout de suite qu'on cache l'anse au moment où on la vante. C'est une correction d'une ligne.

Corrections gratuites :
1. `objet-defilement.html` l. 190 : la pose 2 `{ ry: 1.75, rx: .02 }` met l'anse au dos. La remplacer par une pose où l'anse est de profil et entière, côté texte (essayer `ry ≈ 0` à `0.3`, `rx: .05`), puis vérifier à 1440 et à 375.
2. l. 200 : l'ombre est posée à `y - .62 * e - .35`. Le `- .35` fixe décolle l'ombre quand l'échelle `e` baisse sur téléphone : le multiplier par `e` (`- .35 * e`) ou caler l'ombre sur le bas de la soucoupe.
3. Texture de crème : dégradé du noisette clair au bord vers un brun un peu plus foncé, pas un point noir au centre ; ajouter quelques taches tigrées.
4. Texte de démo l. 96-99 : « Votre espresso » dans une tasse d'environ 20 cl, c'est faux pour un torréfacteur. Écrire « votre café filtre » ou « votre cappuccino ».
5. Fiche, prompt : ajouter « chaque pose montre ce dont parle son étape (l'anse visible à l'étape anse) ».

---

## 3. ile-flottante — 77/100

| Critère | Note | Pourquoi |
|---|---|---|
| Beauté et finition | 29/40 | Charmant, lumière douce, glisser avec inertie agréable (`m-ile.png`). Mais le titre dit « **Trois cabanes**, un étang » et l'île n'a **qu'une** cabane ; l'étang est caché par les sapins sous la plupart des angles ; la cascade est une **plaque bleu-gris détachée** qui pend dans le vide comme un poteau (captures glisse et tab4). La pointe rocheuse est très grande et sombre, elle mange la moitié de l'image. |
| Utilité | 13/20 | Niche (gîtes, tourisme, appli « monde »), mais efficace pour ces métiers. |
| Accessibilité, réduit, repli | 17/20 | Pause 44 px, libellé qui change, focus 3 px. Mouvement réduit : image fixe. Le repli SVG est maigre (île plate grise). Pas d'`aria-pressed` (le libellé qui change suffit, mais le kit n'est pas homogène). |
| Fiche et prompt | 18/20 | Complète. |

**25 000 € ?** Pas encore : le gérant compte ses cabanes, et il en manque deux.

Corrections gratuites :
1. `ile-flottante.html` l. 138-143 : instancier la cabane trois fois (fonction `cabane(x, z, rot, échelle)`), trois tailles différentes, autour de l'étang.
2. l. 133-137 : coller la cascade au bord de l'île, depuis le déversoir de l'étang jusqu'à mi-hauteur de la roche ; utiliser un plan courbé ou un cône aplati avec un dégradé d'opacité vers le bas au lieu d'une `BoxGeometry` rigide.
3. Étang : retirer les sapins dans un rayon de 0,4 autour de l'étang pour qu'il se voie de face.
4. Pointe rocheuse : la réduire d'environ 20 % en hauteur et l'éclaircir (`--ile-roche` vers `#9b9384`).
5. Repli SVG : trois cabanes et la cascade, pour rester cohérent avec le titre.

---

## 4. mascotte-regard — 78/100

| Critère | Note | Pourquoi |
|---|---|---|
| Beauté et finition | 29/40 | Sympathique, matière peluche réussie, pile de livres bien faite, regard qui suit le focus clavier (vu sur « Bandes dessinées », `m-masc1.png`). Mais : (1) elle s'appelle « Hulotte », c'est une **chouette**, et elle a deux **aigrettes** : en français, aigrettes = hibou, et la hulotte n'en a pas ; un libraire jeunesse le sait. (2) Quand elle cligne, **le reflet blanc de la pupille reste visible par-dessus la paupière fermée** (`crop-masc.png`). (3) Les disques faciaux dépassent de chaque côté comme des oreillettes de casque, au lieu d'encadrer les yeux. |
| Utilité | 12/20 | 404 ou page merci uniquement, c'est assumé. |
| Accessibilité, réduit, repli | 19/20 | Exemplaire : regard sur `focusin`, page complète sans la chouette, liens de 44 px, pause en rond 44 px sur téléphone avec libellé lu, mouvement réduit fixe. |
| Fiche et prompt | 18/20 | Complète ; le prompt demande lui-même des « aigrettes en cônes », donc il reproduira l'erreur. |

**25 000 € ?** Pas encore : la chouette qui a des cornes de hibou et qui garde les yeux ouverts à travers ses paupières, je la vois tout de suite.

Corrections gratuites :
1. `mascotte-regard.html` l. 144-147 : supprimer les aigrettes (vraie hulotte) ; ou renommer en hibou (« Hulotte » devient « Moyen-Duc ») partout, fiche et texte l. 77 compris.
2. l. 153 : le reflet est en `MeshBasicMaterial` placé hors de la paupière. Le cacher pendant le clignement (`reflet.visible = paupiere.rotation.x < seuil`) ou le ramener sous le rayon 0,285 de la paupière.
3. l. 149 : disques faciaux plus larges et plus plats, centrés sur l'œil et un peu vers le bec (`boule(.5, ventre, s * .36, .0, .66, 1.05, 1.15, .3)`), pour former le masque en cœur de la hulotte.
4. Fiche, prompt : remplacer « aigrettes en cônes » par « tête ronde sans aigrettes (chouette hulotte), disque facial en cœur ».

---

## 5. titre-extrude — 76/100

| Critère | Note | Pourquoi |
|---|---|---|
| Beauté et finition | 25/40 | Effet fort, ombres et vague lisibles (`m-titre.png`). Mais la « croûte » est faite de cercles flous clairs et foncés : à l'œil, c'est du **liège ou de l'éponge**, pas du pain (`crop-titre.png`). Une croûte, c'est un dégradé du doré au brun caramélisé sur les arêtes, du fleurage de farine et des craquelures. Biseau trop faible : les faces sont plates comme du carton. À 375, le N touche le bord droit. |
| Utilité | 14/20 | Bon pour une marque courte ; limité à l'ASCII (pas d'accents), ce qui est bien signalé. |
| Accessibilité, réduit, repli | 18/20 | Repli CSS en relief réussi, `h1` HTML réel, pause 44 px avec focus. |
| Fiche et prompt | 19/20 | Licence MgOpen citée avec notice, alerte sur les accents et piste OFL : sérieux. |

**25 000 € ?** Pas encore : mon boulanger dira « c'est du liège », et il aura raison.

Corrections gratuites :
1. `titre-extrude.html` l. 115-116 : remplacer les disques aléatoires par un dégradé vertical doré vers brun (`#e0a55a` vers `#8a4f22`), des craquelures en traits fins et un voile de farine clair `rgba(255,250,240,.35)` sur le dessus ; l. 119 : grain de bump plus fin (rayon 0,5 à 1,5).
2. Assombrir les arêtes : `bevelSize` et `bevelThickness` plus grands, et couleur de biseau plus brune (deuxième matière sur le groupe biseau, ou `vertexColors` selon la normale).
3. À 375 : réduire la largeur cible du mot à environ 86 % du canevas pour garder une marge.

Médias : une texture de croûte générée, tuilable, 1024² (croûte de miche au levain bien cuite, grigne, farine), ferait monter la note d'environ 8 points.

---

## 6. tunnel-defilement — 80/100

| Critère | Note | Pourquoi |
|---|---|---|
| Beauté et finition | 32/40 | Le plus ambitieux du lot : travelling fluide, lanternes, rangées de barriques, casiers de bouteilles, porte lumineuse au bout (`m-tun1.png`). Erreurs de vigneron : (1) les **fonds de barrique ont des cernes concentriques comme des rondins** ; un fond, ce sont des douelles droites assemblées, pas un tronc scié. (2) Le « pressoir de 1880 » est un poteau avec une barre sur un disque, ça ressemble à un tourniquet, pas à un pressoir à cage. (3) À l'étape cuves, la caméra frôle les cuves inox : trois gros cylindres blancs surexposés mangent le bord droit. (4) La pierre, sous la lumière chaude, se lit comme de la brique orange, pas comme du tuffeau crème. |
| Utilité | 15/20 | Très bon pour une visite de lieu ; lourd en lecture pour une page qui doit aller vite (c'est dit dans la fiche). |
| Accessibilité, réduit, repli | 15/20 | Mouvement réduit en 4 plans fixes, bien ; mais le premier plan réduit colle la caméra au pressoir, qui écrase la carte de texte (`m-tun2.png`). Le repli sans WebGL est une simple lueur floue : aucune voûte ne se lit, contrairement à ce que dit la fiche. |
| Fiche et prompt | 18/20 | Complète et précise. |

**25 000 € ?** Pas encore : le vigneron de Vouvray verra des rondins à la place de ses barriques. Une fois corrigé, c'est l'élément que je vendrais le plus cher.

Corrections gratuites :
1. `tunnel-defilement.html` l. 190-191 : la texture `cercles` est mappée par le `LatheGeometry` jusque sur les fonds, d'où les cernes. Fermer le fût par deux disques séparés (`CircleGeometry`) avec une texture de douelles verticales (6 à 8 planches, joints sombres) et un cercle de jable sombre.
2. l. 183-186 : pressoir à cage : un plateau, une cage de 12 lattes verticales (`InstancedMesh`), la vis au centre et le mouton (poutre) en haut.
3. l. 188 : écarter les cuves (`cote` de 1,45 à environ 1,75, rayon .5 à .42) et baisser leur `metalness` pour éviter le blanc brûlé.
4. Lumière : `--tun-lueur` un peu moins saturé (`#ffc58a`) et texture de pierre plus claire, pour retrouver le blanc crème du tuffeau.
5. Mouvement réduit : décaler la pose de la première étape (pas sur `ETAPES[0]` exactement, l. 174/225, mais 0,04 avant) pour que le pressoir ne colle pas l'objectif.
6. Repli CSS l. 24-28 : dessiner l'arc (un `radial-gradient` elliptique avec bord net, ou un `border-radius: 50% 50% 0 0` en pseudo-élément) et deux ou trois arcs qui rapetissent vers le fond.

Médias : textures tuilables générées (pierre de tuffeau taillée, fond de barrique en douelles, 1024²) et une affiche de repli 16:9 et 9:16 de la galerie : environ 5 points de plus.

---

## 7. champ-instances — 79/100

| Critère | Note | Pourquoi |
|---|---|---|
| Beauté et finition | 30/40 | Le vent est beau, la profondeur et la brume sont réussies, le texte respire dans le ciel (`m-champ1.png`). Mais les **fleurs sont des cailloux à facettes sans tige**, comme des bonbons semés dans l'herbe (`crop-champ.png`). L'écartement sous le curseur se voit à peine sur capture. Et pour un apiculteur du **causse** Comtal, une prairie grasse d'herbes hautes de 60 cm, c'est un autre pays : le causse, c'est une pelouse rase et sèche, du thym, de la pierre. |
| Utilité | 15/20 | Hero attractif pour producteurs et marques d'extérieur. |
| Accessibilité, réduit, repli | 16/20 | `touch-action: pan-y`, pause 44 px, mouvement réduit fixe. Le repli SVG est une bande de dents de peigne vert qui heurte les boutons à 1440 et passe derrière « Parrainer une ruche » à 375 (`m-champ2.png`). |
| Fiche et prompt | 18/20 | Complète. |

**25 000 € ?** Pas encore : l'apiculteur cherchera son thym et trouvera des graviers colorés.

Corrections gratuites :
1. `champ-instances.html` l. 134 : fleur = petite tige (le brin réduit) plus une corolle aplatie de 5 pétales (`CircleGeometry(.05, 5)` ou un cône très court), au lieu d'un icosaèdre posé à y = 1.
2. Pour le causse : herbe plus courte et plus jaune (hauteur × 0,6, palette `verts` vers `#8d9a52` / `#b5a86a`), touffes de thym violettes en coussins bas, quelques pierres calcaires claires. Ou changer la démo pour un vrai pré de fauche si on garde l'herbe haute.
3. Écartement : `uRayon` de 1,4 à environ 2, force de 0,85 à 1,1, pour que la main se voie.
4. Repli SVG l. 62-68 : descendre la bande d'herbe sous les boutons (y ≥ 70 % de la hauteur) et varier hauteur et inclinaison des brins.
5. Texte l. 73 : « extraction à froid » ne veut rien dire (toute extraction se fait à froid) : écrire « miel non chauffé ».

---

## 8. gelee-tremble — 72/100

| Critère | Note | Pourquoi |
|---|---|---|
| Beauté et finition | 26/40 | Le tremblement est réussi (clic et bouton « Faire trembler » au clavier vérifiés, cisaillement visible, `m-gel2.png`). Mais : (1) **à 375, les gelées sont coupées en haut, à gauche et à droite**, puis vient un grand vide avant le texte (`m-gel1.png`, `m-gel2.png`). (2) Elles ont l'air de jouets en plastique brillant, opaques, aux couleurs de bonbons industriels (cube violet ?), alors que le titre promet « des fruits, du sucre, et rien d'autre ». À Apt, un confiseur fait des **pâtes de fruits** : mates, enrobées de sucre cristallisé, aux couleurs du fruit cuit. Personne ne les appelle « gelées » dans le métier. |
| Utilité | 13/20 | Réservé aux produits mous et aux marques ludiques. |
| Accessibilité, réduit, repli | 15/20 | Équivalent clavier, focus violet net. Mais en mouvement réduit, le bouton « Faire trembler » reste affiché et **ne fait rien** (l. 150). Repli SVG : un cube violet flotte au-dessus du vert, le palet jaune est une ellipse plate. |
| Fiche et prompt | 18/20 | Complète. |

**25 000 € ?** Pas encore : sur téléphone le produit sort de l'écran, et la confiseuse d'Apt dira « ce sont des Haribo ».

Corrections gratuites :
1. `gelee-tremble.html` l. 169 : la caméra ne tient compte que d'`etroit`. Calculer le recul selon le ratio (`const z = Math.max(9.5, 7.2 / camera.aspect)`) et donner au canevas une hauteur suffisante à 375 (environ 42svh), pour que les 5 pièces tiennent avec une marge.
2. Matière : `transmission` plus fort, `roughness` vers .45, `clearcoat` 0, et une `bumpMap`/`roughnessMap` de sucre cristallisé (points clairs serrés peints sur canvas) ; couleurs fruit cuit : abricot `#e08a3c`, cerise `#9e1f2e`, reine-claude `#a6b04a`, coing `#d9a441` ; remplacer le violet par une cassis `#4a1838`.
3. Mouvement réduit : masquer `[data-secouer]` (comme pour `.sans-3d`, l. 28) ou le désactiver avec un libellé « Animation désactivée ».
4. Texte l. 66 : « nos pâtes de fruits » au lieu de « nos gelées » ; nommer l'élément « Pâtes de fruits qui tremblent » dans la fiche.
5. Repli SVG : poser le cube violet sur le sol et donner du volume au palet.

---

## Corrections transversales (gratuites)

- Dans chaque prompt de fiche, ajouter une ligne « vérifier l'élément avec l'œil du métier : chaque objet montré doit être juste pour un professionnel (pièce, matière, outil) ». C'est exactement ce qui manque dans ce lot.
- Homogénéiser les boutons pause : `aria-pressed` partout (seul Spark l'a).
- Les fiches disent « vérifié : deux captures identiques » : c'est vrai, mais aucune ne vérifie le cadrage à 375 (gelées coupées, N du LEVAIN au bord, ombre de la tasse décollée). Ajouter dans `verifier-elements.cjs` un contrôle que la boîte englobante projetée de la scène reste dans le canevas.
