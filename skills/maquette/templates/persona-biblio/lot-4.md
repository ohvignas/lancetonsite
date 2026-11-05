# Lot 4 : éléments de défilement (persona client, tour 1)

Date : 2026-11-05. Pages testées : `elements/<nom>.html?apercu` sur `http://127.0.0.1:4330`, Chrome sans interface (Playwright), en 1440 × 900 et 375 × 812, avec mouvement réduit (`reducedMotion: 'reduce'`) et sans JavaScript.
Regard indépendant : les rapports du relecteur n'ont pas été lus.

Méthode : pour chaque élément, 10 captures en 1440 et 10 en 375 prises au fil d'un défilement à la molette, par crans de 120 px, avec 1,1 s de pause avant chaque capture. S'y ajoutent une capture pleine page en mouvement réduit, des tests au clavier (Tab, Entrée), un clic sur les vignettes, un défilement rapide (rideau) et un passage de 1440 à 375 (focus-mots). J'ai mesuré les positions et relevé la console. **0 erreur console, 0 ressource manquante et 0 débordement horizontal sur les 7 éléments.**
Captures : `persona-biblio/lot-4-captures/` (`<nom>-1440-00…09.png`, `<nom>-375-00…09.png`, `<nom>-1440-reduit-plein.png`, plus les captures d'interaction citées plus bas).

Notation sur 100 : beauté et finition 40, utilité réelle 20, accessibilité, mouvement réduit et repli 20, fiche et prompt 20.

| élément | note | 25 000 € ? | médias utiles ? |
|---|---|---|---|
| rideau-dechire | **84** | Oui | Non, les photos tiennent déjà. Au mieux une vraie photo de panier (osier ou carton de livraison) pour « mercredi », en 2:3 |
| pilule-zoom | **80** | Oui (après 2 corrections à 0 €) | Oui, un peu : une photo d'atelier composée pour le centre, en 3:2 2400 px, plus un recadrage 4:5 pour le téléphone |
| cartes-empilees | **80** | Oui (photo de la carte 04 à changer) | Oui : une photo « bilan » (une page chiffrée sur un établi, ou un point avec le chef d'atelier) et un capteur sur une machine d'usinage CN, en 4:3 |
| index-projets | **78** | Pas encore | Oui : une vraie photo « Source » (bols et coupelles cuits, dressés au restaurant) en 3:2, et les 4 vignettes recadrées au même cadrage que les grandes photos |
| chemin-etapes | **75** | Pas encore | Oui, nettement : une petite photo ou vidéo par étape (meule, pétrin, bannetons au froid, four à sole), en 4:5, l'élément en est privé |
| bande-parallaxe | **75** | Pas encore | Non, les photos de concert en duotone rouge sont fortes. Le défaut est dans le code |
| focus-mots | **70** | Pas encore | Non, c'est un élément de texte pur |

Défauts communs aux fiches (corrections à 0 €) :
- **Licence absente partout.** Ajouter une ligne `Licence :` dans chaque fiche : code Lancetonsite original ; GSAP 3.15 sous licence Standard « no charge » ; photos de démo reprises de `exemples/*/images`, donc à remplacer par celles du client.
- **Phrase recopiée fausse.** « La classe d'état et les ScrollTrigger sont annulés d'eux-mêmes » figure dans `chemin-etapes.md`, `rideau-dechire.md` et `cartes-empilees.md`, mais ces éléments ne posent **aucune** classe d'état. À remplacer par « les ScrollTrigger et le ticker sont annulés d'eux-mêmes ».
- **Apostrophes droites dans les grands titres** : « L'atelier » à 120 px (pilule-zoom), « n'est », « C'est » (focus-mots), « Séries de l'atelier »… À ces tailles, un client le voit tout de suite. Utiliser `’` dans le HTML de démo et le demander dans les prompts.

---

## 1. pilule-zoom : 80/100 (beauté 34, utilité 16, accès 14, fiche 16)

**Ce que j'ai vu.** En 1440 (`pilule-zoom-1440-00…09`), « L'atelier ⬭ ouvert » en très grand, puis la pilule s'ouvre en plein cadre et les deux mots sortent de l'écran, bien collés aux bords du masque (capture `-03` : 30 px à gauche, 38 px à droite). Le dézoom de 1,25 à 1 est doux et le bouton apparaît à 80 %. C'est le meilleur moment « signature » du lot avec le rideau. En 375 (`-375-*`), la pilule s'ouvre d'abord en portrait puis plein cadre, et c'est propre. En mouvement réduit, la pilule reste petite et le bouton est visible. Sans JS, même chose.

**Ce qui ne va pas.**
- **Clavier** : au chargement, Tab ne trouve rien. Le seul bouton de la scène est en `autoAlpha: 0`, donc en `visibility: hidden` (test : `activeElement = BODY`, capture `pilule-zoom-1440-tab.png`). Une personne au clavier ne peut pas atteindre l'action principale tant qu'elle n'a pas fait défiler la page à 80 %.
- **L'œil du métier** : l'alt de la pilule (ligne 55) dit « tables de tournage et étagères de pièces crues ». La photo montre deux piles d'assiettes **émaillées et cuites**, mouchetées, devant un four en brique. Je suis céramiste : du cru, ce n'est pas ça. Le même fichier est décrit autrement dans index-projets (« Piles d'assiettes en grès »), donc deux alts différents pour la même photo.
- En 375, la phrase tombe à 32 px et la pilule à 60 × 26 px : le moment de départ est timide sur téléphone.

**Corrections à 0 €, par priorité.**
1. `pilule-zoom.html` l.86 et l.96 : remplacer `autoAlpha` par `opacity` seul (le bouton reste focusable). Ajouter `.pz-action:focus-visible { opacity: 1 !important }`, ou bien sortir le bouton de l'animation quand `:focus-within`.
2. l.55 : alt = « Piles d'assiettes en grès moucheté, émaillées, devant le four de l'atelier ».
3. l.18 : `font-size: clamp(2.6rem, 8.4vw, 7.5rem)`, pour avoir au moins 42 px sur téléphone.
4. l.54 : `L’atelier` avec l'apostrophe typographique.
5. Fiche : ajouter la licence. Préciser dans le prompt que le bouton reste atteignable au clavier pendant l'animation.

**Médias.** Une photo d'atelier dont le sujet est au centre du cadre, pour que la pilule (zone centrale de 1,9 × 0,82 em) montre déjà quelque chose de lisible : 3:2 en 2400 px, plus un recadrage 4:5 pour le téléphone.

---

## 2. index-projets : 78/100 (beauté 30, utilité 18, accès 14, fiche 16)

**Ce que j'ai vu.** C'est beau : photo plein cadre, nom géant qui monte dans son masque, colonne de vignettes vitrées (1440) qui passe en rangée en bas sur téléphone (375). Cliquer sur « Galet » amène pile sur Galet (y = 1860, `aria-current` correct, capture `index-projets-1440-clic-galet.png`). Au clavier, Tab parcourt les 4 vignettes, le contour orange est bien visible, et Entrée sur « Source » amène à Source (capture `index-projets-1440-clavier.png`). En mouvement réduit, les 4 séries sont empilées, propres.

**Ce qui ne va pas.**
- **Bloquant pour moi : l'aimantation (snap) saute un projet.** Depuis Source (y = 930), un petit geste de 3 crans de molette m'amène à **Craie** (y = 2790) : Galet est sauté. Mesure faite deux fois, avec des gestes de 3 et de 6 crans. Dans la série de captures 1440, l'aimantation me renvoie aussi en arrière (`-01` Source, `-02` Silo, `-04` Silo à nouveau). Un acheteur qui fait défiler sa page de réalisations et rate une série, c'est une série qu'il ne verra jamais.
- **L'œil du métier** : « Source, bols et coupelles » est illustré par des **gobelets et pichets crus** posés sur un **bat en plâtre** (l'alt dit « Bols crus… sur l'établi »). Ce ne sont ni des bols, ni des coupelles, ni un établi.
- En 375, la légende de Source se coupe avec « · 2024 » tout seul sur la deuxième ligne (`-375-02`).

**Corrections à 0 €.**
1. l.120 : `snap: { snapTo: "labelsDirectional", duration: { min: .2, max: .5 }, delay: .15, inertia: false }`. Vérifier qu'un geste de 300 px depuis chaque projet amène exactement au suivant.
2. l.132 : la dernière étiquette `p${n-1}` doit tomber sur `tl.duration()` (ne pas ajouter `+=.15` après le dernier projet), sinon la fin de l'aimantation dépasse `end` (2790 mesuré pour une fin à 2700).
3. l.64-65 : alt = « Gobelets et pichets crus qui sèchent sur un bat en plâtre ». Sinon, changer la légende pour « Gobelets et pichets ».
4. l.23 : `.ix-nom span { text-wrap: balance; }`.
5. Fiche : licence ; ajouter « snapTo labelsDirectional » dans le prompt.

**Médias.** Une vraie photo de la série Source (bols cuits, dressés à table au restaurant) en 3:2, et des vignettes recadrées comme les grandes photos.

---

## 3. chemin-etapes : 75/100 (beauté 26, utilité 15, accès 18, fiche 16)

**Ce que j'ai vu.** En 1440 (`chemin-etapes-1440-*`), quatre étapes en escalier, reliées par des arcs pointillés qui se tracent au défilement. Ça marche, mais tout est **petit et pâle**. Le pointillé `#b8a084` de 1,6 px (tirets 1,5 / 7) se voit à peine sur le brun, le texte fait environ 16 px, et la moitié basse de l'écran reste vide. En 375 (`-375-*`), le zigzag avec les arcs à gauche est réussi, c'est la meilleure version. Le mouvement réduit montre la ligne tracée et toutes les étapes. Sans GSAP, pareil.

**Ce qui ne va pas.**
- **L'œil du métier, bloquant pour un boulanger** : le titre dit « Un pain, **quatre jours** de travail ». Or les étapes additionnent 20 min de pétrissage, 18 h de pointage et 45 min de cuisson, soit moins d'une journée. Mon client boulanger relève ça en trois secondes. Autre détail : à 6 °C pendant 18 h, on parle plutôt d'un pointage « retardé » ou « en bac au froid ».
- Rendu trop timide pour un site à 25 000 € : il n'y a ni image ni repère fort, et le pointillé disparaît sur un écran mal réglé.

**Corrections à 0 €.**
1. l.46 : « Un pain, deux jours de travail », ou bien ajouter les étapes manquantes (rafraîchi du levain la veille, façonnage) pour que la durée tienne. l.55 : « Pointage retardé : dix-huit heures en bac, au froid à 6 °C ».
2. l.18 : `stroke-width: 2.2; stroke-dasharray: 2 6;` et `--chemin-trait: #d4b994`.
3. l.22 : points de 14 px avec un anneau `box-shadow: 0 0 0 4px rgb(232 169 92 / .25)`.
4. l.23 et l.25 : titre `clamp(1.3rem, 2vw, 1.7rem)`, texte `clamp(1.02rem, 1.25vw, 1.15rem)`.
5. Fiche : retirer « la classe d'état » (il n'y en a pas) et ajouter la licence.

**Médias.** C'est l'élément du lot qui y gagnerait le plus : une vignette photo par étape (meule de pierre, pétrissage, bannetons au froid, four à sole ouvert), en 4:5, à 240 px.

---

## 4. bande-parallaxe : 75/100 (beauté 30, utilité 15, accès 15, fiche 15)

**Ce que j'ai vu.** Une rangée de photos de concert en duotone rouge, de formats mélangés et décalées en hauteur. Le glissement interne en parallaxe se sent bien. Le mouvement réduit donne une rangée immobile qui défile au doigt, avec `tabindex=0` et contour de focus.

**Ce qui ne va pas.**
- **Bloquant : les trois dernières photos ne sont jamais vues.** La bande est visible dès le chargement, donc le départ vaut 0, et la fin est réglée sur `"bottom top"` à 762 px. À mi-course (y = 381), **tous** les cadres sont déjà au-dessus de l'écran (top entre −116 et −201 px, mesuré). Sur les captures `bande-parallaxe-1440-05…09` et `-375-05…09`, « Dernier rappel », « Atlas Fanfare » et « Clôture » passent pendant que la bande sort par le haut : l'écran ne montre qu'un fond brun vide. Le dernier soir du festival n'est jamais montré.
- Une fois la bande active, plus rien n'est focusable (Tab arrive sur `BODY`). C'est acceptable puisque rien n'est cliquable, mais une personne au clavier ne voit défiler la bande que si la page défile.

**Corrections à 0 €.**
1. l.86 : `end: () => "+=" + Math.max(innerHeight * .9, ecart())`, avec `start: "top 85%"` borné à 0. Le but est que la piste finisse sa course **pendant que la bande est encore entièrement visible**. Vérifier que le dernier cadre a `right <= innerWidth` alors que la bande a encore `top >= 0`.
2. Fiche, prompt : remplacer « départ le plus tardif entre le haut de page et l'entrée par le bas » par « la course se termine avant que la bande quitte l'écran ».
3. Fiche : ajouter la licence.

**Médias.** Aucun utile : les photos sont bonnes et cohérentes entre elles.

---

## 5. rideau-dechire : 84/100 (beauté 36, utilité 16, accès 16, fiche 16)

**Ce que j'ai vu.** C'est le plus beau du lot. Lundi, mardi, mercredi, jeudi : chaque photo monte avec un bord de papier déchiré qui se lisse en arrivant (`rideau-dechire-1440-*`, `-375-*`). En défilement rapide, la déchirure se creuse nettement (`rideau-dechire-1440-rapide.png`), puis le bord redevient droit une fois la photo posée (`-pose.png`). Les grands titres en DM Serif sur ces photos d'automne donnent un vrai récit. En mouvement réduit, les photos se suivent sans déchirure. La photo du jeudi s'affiche bien, vérifiée (`rideau-dechire-1440-reduit-jeudi.png`) : sur la pleine page elle paraissait noire seulement à cause du `loading="lazy"`.

**Ce qui ne va pas.**
- **L'œil du métier, maraîcher** : « mercredi, on compose les **paniers** » sur une **cagette en bois**, et l'alt dit « Panier… porté à bout de bras ». Pour un maraîcher, une cagette n'est pas un panier.
- En 375, la déchirure fait des pointes régulières, plus montagne que papier (`-375-01`).
- Les sous-titres de 17 à 22 px sur photo claire (Mardi, `-375-02`) restent lisibles grâce à l'ombre, mais tout juste.

**Corrections à 0 €.**
1. l.47 : alt = « Cagette de carottes, poireaux, betteraves et potimarron, portée à deux mains ». Changer la légende en « on prépare les cagettes », ou garder « paniers » avec une vraie photo de panier.
2. l.67 : sur téléphone, baisser le sinus (`.3` → `.18`) et augmenter `N` à 48 pour un bord plus fibreux.
3. l.19 : voile un peu plus dense au centre (`/ .58`).
4. Fiche : retirer « la classe d'état » et ajouter la licence.

**Médias.** Pas indispensable. Une vraie photo de panier de livraison en 2:3 pour « mercredi » rendrait le texte exact.

---

## 6. cartes-empilees : 80/100 (beauté 30, utilité 18, accès 17, fiche 15)

**Ce que j'ai vu.** Des cartes d'offre qui viennent se poser l'une sur l'autre, avec recul et voile sur la carte du dessous (`cartes-empilees-1440-*`). C'est très utile pour une page d'offres B2B. En 375 (`-375-*`), la photo est au-dessus du texte et la pile reste lisible. En mouvement réduit, on a une liste de 4 cartes propres.

**Ce qui ne va pas.**
- **Finition** : en 1440, `align-content: space-between` laisse un grand trou entre le titre et le paragraphe. Le paragraphe gris de 15 px a l'air perdu (`-1440-00`, `-04`). La carte recouverte, voilée à 55 %, devient d'un gris terne.
- **L'œil du métier, maintenance industrielle** : la carte « 04 / Bilan » est illustrée par une main gantée qui **pose un capteur** sur un moteur. C'est l'image de la carte 01, pas celle d'un bilan trimestriel. La carte 01 parle d'« ateliers d'usinage » mais montre un palier de **convoyeur**, pas une machine-outil. L'alt de la carte 04 parle d'un « carter jaune » : c'est une **grille de protection**. Pour la carte 02, l'alt annonce « téléphone affichant une alerte », alors que l'écran n'affiche qu'un dégradé.

**Corrections à 0 €.**
1. l.21 : `align-content: start; gap: 1.1rem`, puis `.pile-texte ul { margin-top: auto }` pour garder les puces en bas.
2. l.24 : `.pile-texte p { font-size: clamp(1rem, 1.2vw, 1.12rem) }`.
3. l.86 : voile à `.4` au lieu de `.55`.
4. l.64 : alt = « Main gantée posant un capteur sur un moteur, à côté de sa grille de protection jaune ». Utiliser à la place la photo d'intervention ou une photo de bilan. l.58 : alt = « Bureau d'atelier vitré, téléphone posé à côté d'un carnet ».
5. Fiche : retirer « la classe d'état » et ajouter la licence.

**Médias.** Oui : une photo « bilan » (une page chiffrée sur un établi, ou un échange avec le chef d'atelier) et un capteur sur une broche de centre d'usinage CN, en 4:3.

---

## 7. focus-mots : 70/100 (beauté 28, utilité 12, accès 14, fiche 16)

**Ce que j'ai vu.** Une phrase-manifeste floue et un viseur doré qui va de mot en mot (`focus-mots-1440-*`, `-375-*`). À la fin, toute la phrase redevient nette et le viseur s'efface. L'idée est élégante. Le recalcul au redimensionnement est correct : j'ai mesuré un écart de −6 / −3 px en 375 direct comme après un passage de 1440 à 375. En mouvement réduit, la phrase est nette dès le départ.

**Ce qui ne va pas.**
- **Le viseur s'arrête sur des mots vides** : « de », « à », « ce », « et », « la ». Les 24 mots reçoivent le même traitement. La phrase reste **illisible sur environ 1 950 px de défilement** (deux écrans et plus) : on ne peut pas la lire avant la fin.
- **Décalage** : le mot suivant devient net avant que le viseur arrive. Sur `-1440-04`, « garder » est net et le viseur est sur « ce ». Sur `-375-01`, le viseur est sur « maison », encore flou, et « de » est net. Sur `-375-06`, le viseur est entre deux mots.
- **L'œil du métier** : l'intro dit « architecte du patrimoine », la signature dit « architecte DPLG ». Ce sont deux titres différents : architecte du patrimoine, c'est le DSA de Chaillot. Une architecte du Luberon signerait « architecte du patrimoine ».

**Corrections à 0 €.**
1. l.56 : ne viser que les mots marqués. Par exemple `<em data-vise>pierre</em>`, `neuf`, `garder`, `deux siècles`, `réparer` (5 à 7 cibles). Les autres mots restent à `blur(2px)` et opacité .7, donc lisibles. Fin de l'animation : `mots.length * 9 %` → `cibles.length * 25 %`.
2. l.79 : `"<.45"` au lieu de `"<.2"`, pour que le mot devienne net quand le viseur arrive.
3. l.42 : apostrophes `’`. l.43 : « Claire Arnaud, architecte du patrimoine ».
4. Fiche : mettre à jour le prompt (cibles choisies, le reste lisible) et ajouter la licence.

**Médias.** Aucun.

---

### Verdict du lot

« Le rideau et la pilule, je les mets demain sur le site d'un client. L'index et la bande ont chacun un défaut qui fait **perdre du contenu au visiteur** (un projet sauté, trois photos jamais vues). Ces deux-là passent en premier, et ça ne coûte rien. »
