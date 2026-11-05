# Lot 4, tour 2 : éléments de défilement (persona client)

Date : 2026-11-05. Pages : `elements/<nom>.html?apercu` sur `http://127.0.0.1:4339`, Chrome sans interface (Playwright).
Regard indépendant : les rapports du relecteur n'ont pas été lus. Seul mon rapport du tour 1 (`lot-4.md`) a été relu.

**Méthode.** Pour chaque élément, j'ai fait 13 captures au fil d'un défilement réel à la molette, en 1440 × 900 puis en 375 × 812, avec une pause de 1,1 s entre deux captures. J'ai ensuite fait un Tab au chargement, une capture pleine page en mouvement réduit suivie de 8 Tab, puis des gestes tactiles synthétiques (CDP `synthesizeScrollGesture`) sur index-projets, bande-parallaxe et pilule-zoom. J'ai aussi testé l'aimantation de l'index avec 1, 3 et 6 crans de molette et des gestes tactiles de 150, 300 et 600 px. J'ai mesuré l'alignement du viseur de focus-mots sur 21 positions, et vérifié pilule-zoom en 320 px.
**Résultat global : 0 erreur console, 0 ressource manquante, 0 débordement horizontal sur les 7 éléments.**
Captures : `persona-biblio/captures-tour2-lot-4/`. On y trouve `<nom>-1440-00…12.png`, `<nom>-375-00…12.png`, `<nom>-<l>-tab.png`, `<nom>-1440-reduit-plein.png`, ainsi que `index-projets-1440-clavier-galet.png`, `index-projets-375-toucher.png`, `bande-parallaxe-375-toucher.png`, `bande-parallaxe-375-rapide.png`, `pilule-zoom-375-toucher-0…3.png`, `pilule-zoom-320.png` et `rideau-dechire-<l>-rapide.png`.

Notation sur 100 : beauté et finition 40, utilité 20, accessibilité, mouvement réduit et repli 20, fiche et prompt 20. Les photos payantes sont hors périmètre : je ne les pénalise pas une deuxième fois.

| élément | tour 1 | tour 2 | 25 000 € ? |
|---|---|---|---|
| rideau-dechire | 84 | **89** | **Oui** |
| pilule-zoom | 80 | **88** | **Oui** |
| index-projets | 78 | **86** | **Oui** (vignettes à aligner, 0 €) |
| cartes-empilees | 80 | **86** | **Oui** (2 retouches de texte, 0 €) |
| bande-parallaxe | 75 | **85** | **Oui** sur ordinateur, **pas encore** sur téléphone (bande trop basse, 0 €) |
| focus-mots | 70 | **84** | **Pas encore**, à un réglage près |
| chemin-etapes | 75 | **82** | **Pas encore** comme moment fort ; oui comme bloc secondaire |

Fiches : la licence et le poids sont présents partout, et les apostrophes typographiques sont en place dans les textes affichés. La phrase « la classe d'état » ne reste que là où une classe d'état existe vraiment (`pz-actif`, `ix-actif`, `bande-active`, `focus-actif`). Le défaut commun du tour 1 est donc corrigé.

---

## 1. pilule-zoom : 80 → 88 (beauté 35, utilité 16, accès 19, fiche 18)

**Corrections du tour 1.**
- Clavier : **corrigé.** Le premier Tab au chargement arrive sur « Réserver une visite du jeudi », avec `opacity 1` et un contour rouille bien visible (`pilule-zoom-1440-tab.png`, `-375-tab.png`).
- Alt : **corrigé.** Il dit maintenant « assiettes en grès moucheté, émaillées et cuites, devant le four en brique », et c'est exact.
- Taille sur téléphone : **corrigé.** La phrase fait 42 px en 375 et la pilule devient lisible (`-375-00`).
- Apostrophe de « L’atelier » : **corrigée.**

**Ce que j'ai vu.** L'ouverture plein cadre reste le plus beau geste du lot (`-1440-02…05`). Au doigt, en 375, l'ouverture est fluide et le bouton arrive sur la photo (`pilule-zoom-375-toucher-*`). En mouvement réduit, la pilule reste petite et le bouton est visible.

**Ce qui reste.**
- *Léger.* En 320 px, les deux mots touchent exactement les bords de l'écran (mesure : 0 et 320 px, `pilule-zoom-320.png`). l.18 : `font-size: clamp(2.2rem, 11vw, 7.5rem)` garde 41 px en 375 et laisse de l'air en 320.
- *Léger.* Le bouton n'apparaît qu'à 80 % de la course. C'est voulu, mais une souris qui défile vite ne le voit qu'une fois la scène relâchée. Rien à changer pour moi.

**25 000 € ?** Oui. C'est l'entrée de page « atelier » que je montrerais à un client.

---

## 2. index-projets : 78 → 86 (beauté 33, utilité 18, accès 17, fiche 18)

**Corrections du tour 1.**
- Aimantation : **corrigé, et vérifié.** À la molette (1, 3 et 6 crans) comme au toucher (150, 300 et 600 px), la descente donne toujours `0 → 1 → 2 → 3` (900, 1800, 2700 en 1440 ; 812, 1624, 2436 en 375). Aucun projet n'est sauté et aucun retour en arrière ne se produit. Tab ×3 puis Entrée amène pile sur Galet (`index-projets-1440-clavier-galet.png`).
- Légende de Source : **corrigée.** « Gobelets et pichets, pour le restaurant La Source » correspond à la photo de pièces crues sur un bat en plâtre, et l'alt est juste.
- `text-wrap: balance` : **corrigé.** En 375, la légende de Source passe sur deux lignes équilibrées (`-375-01`).

**Ce qui reste.**
- *Moyen, 0 €.* **Les vignettes ne montrent pas la même chose que les grandes photos.** La vignette Galet montre un cylindre sur le tour, alors que la grande photo montre des tasses mouchetées. La vignette Source montre un bol en tournage, la grande photo des gobelets sur un bat. La vignette Craie montre des assiettes blanches crues, la grande photo des piles mouchetées cuites. Le céramiste qui clique sur la vignette « tasses » et tombe sur autre chose le remarque. Correction l.63-66 : prendre comme vignettes les grandes photos elles-mêmes (`mur-silo-1200`, `mur-source-1600`, `mur-galet-1100`, `ouvert-craie-1200`), en `object-fit: cover` (le poids est déjà chargé), ou recadrer les fichiers `index-*`.
- *Léger.* Quand on remonte depuis la section suivante avec un grand geste (6 crans), on retombe sur Galet (1800) et Craie est survolé. À la descente, tout est parfait. Si l'on veut corriger, il faut un `snap` qui ne s'active qu'à l'intérieur de la scène, ou un `end` augmenté d'une demi-hauteur d'écran.

**25 000 € ?** Oui. Le défaut bloquant (un projet sauté) a disparu. Les vignettes s'alignent en 10 minutes.

---

## 3. chemin-etapes : 75 → 82 (beauté 30, utilité 15, accès 19, fiche 18)

**Corrections du tour 1.**
- Titre : **corrigé.** « Un pain, deux jours de travail » tient : le levain est rafraîchi à l'aube, le pétrissage a lieu en fin de matinée, suivent 18 h au froid, et la cuisson se fait le lendemain matin. « Pointage retardé… en bac, au froid à 6 °C » est le bon terme.
- Lisibilité : **corrigée.** Les titres font 27 px, le texte 18 px, le pointillé 2,2 px en `#d4b994` et les points 14 px avec un anneau. En 1440, ça se lit de loin (`chemin-etapes-1440-01`). Le zigzag en 375 reste réussi.

**Ce qui reste.**
- *Moyen, 0 €. L'œil du boulanger :* entre le pointage et la cuisson, il **manque le façonnage**. On passe d'un bac de pâte au four. l.43 : « Le lendemain à l'aube, façonnage à la main, puis four à sole, 45 minutes. » Ou bien ajouter une 5e étape « Façonnage ».
- *Moyen.* Visuellement, c'est encore un bloc de texte sur un fond brun, avec un grand vide sous l'escalier en 1440 (moitié basse de `-1440-01`). C'est propre, pas mémorable. Sans une vignette photo par étape (meule, pétrin, bac au froid, four ouvert, en 4:5), ce n'est pas un moment fort de page. C'est du média, donc hors 0 €.
- *Léger, fiche.* Le prompt contient deux parenthèses collées : « (titres 21 à 27 px… titre) (4 étapes…) ». Les fusionner en une phrase. La section « Performance » parle d'un `refresh()` après le chargement des images alors que l'élément n'a aucune image.

**25 000 € ?** Pas encore comme pièce maîtresse. Oui comme bloc « notre méthode » en bas de page, une fois le façonnage ajouté.

---

## 4. bande-parallaxe : 75 → 85 (beauté 33, utilité 16, accès 18, fiche 18)

**Le nouveau mécanisme (scène en `position: sticky`, 1 px défilé = 1 px de piste) : je l'accepte.** Le défaut bloquant du tour 1 a disparu. Mesures en 1440 : la scène reste collée à `top = 159` de y = 0 à y ≈ 2100, et le dernier cadre « Clôture » est **entier à l'écran** (`entiers=00000111`, L 816, R 1392) pendant que la scène est encore à `top = 94`. Ce n'est qu'ensuite que la bande repart (`bande-parallaxe-1440-09`). Au toucher en 375, toutes les photos passent entières (`bande-parallaxe-375-toucher.png`), et le geste rapide ne produit ni saut ni à-coup. La parallaxe interne se sent toujours. Le comportement est plus honnête qu'un épinglage GSAP : aucun saut à la sortie, et rien à redimensionner. En mouvement réduit, la rangée défilable reste focusable (`UL` atteint au premier Tab).

**Ce qui reste.**
- *Majeur, 0 €, sur téléphone.* La bande fait 192 px de photo dans un écran de 812 px. Pendant environ 1 600 px de défilement collé, **60 % de l'écran reste noir** au-dessus et en dessous (`bande-parallaxe-375-04…06`, `-375-toucher`). Sur un téléphone, on a l'impression de défiler dans le vide. l.16 : `--bande-h: clamp(15rem, 30vw, 24rem)`, plus `@media (max-width: 640px) { .bande { --bande-h: 44svh } }`, pour que la scène remplisse environ 70 % de l'écran.
- *Léger.* En 1440, une fois le titre sorti, la bande flotte seule au milieu d'un écran sombre. Ce n'est pas faux, mais un rappel du titre ou du jour (« Vendredi → Dimanche ») collé avec la scène donnerait un repère. C'est un choix de designer, pas un défaut.

**25 000 € ?** Oui sur ordinateur. Sur téléphone, pas avant d'avoir agrandi la bande (une ligne de CSS).

---

## 5. rideau-dechire : 84 → 89 (beauté 37, utilité 16, accès 18, fiche 18)

**Corrections du tour 1.**
- Mercredi : **corrigé.** La légende dit « on prépare les cagettes » et l'alt dit « Cagette de carottes, poireaux, betteraves et potimarron, portée à deux mains ». Pour le maraîcher, c'est juste. Mardi « Cagette de poireaux tout juste arrachés » : juste aussi.
- Voile : **corrigé.** Il est à 58 % au centre, et les sous-titres se lisent mieux sur Mardi (`-375-03`).
- Bord sur téléphone : **partiellement corrigé.** Avec 48 points et une ondulation de 0,18, c'est mieux. Mais sur la photo Mardi (`rideau-dechire-375-03`, `-375-rapide`), le bord forme encore des pointes régulières, plus « dents » ou « crêtes de montagne » dans la brume que papier déchiré.

**Ce qui reste.**
- *Léger, 0 €.* l.56 : en téléphone, augmenter la part du bruit par rapport au sinus, par exemple `.55 + onde * sin(i * 1.3 + g) + .5 * (a() - .5)`, pour casser la régularité. Ajouter aussi un liseré clair d'un pixel (`filter: drop-shadow(0 -1px 0 rgb(255 250 240 / .5))` sur le plan qui entre) pour donner la tranche du papier.
- La photo de Jeudi (velouté) et la promesse « du champ à votre bol » restent cohérentes. Rien à redire sur le métier.

**25 000 € ?** Oui. C'est toujours le meilleur récit du lot.

---

## 6. cartes-empilees : 80 → 86 (beauté 33, utilité 18, accès 17, fiche 18)

**Corrections du tour 1.**
- Texte en haut de carte : **corrigé.** Titre, paragraphe à 18 px et puces se lisent d'un bloc (`cartes-empilees-1440-04`). Le voile à 40 % laisse la carte du dessous lisible, sans gris sale.
- Photos dans le bon ordre : **corrigé.** 01 « Écoute » montre un capteur jaune sur la tête de broche d'un centre d'usinage : enfin une vraie machine-outil. 02 montre un bureau d'atelier avec un téléphone, et l'alt est juste. 03 montre un roulement démonté sur l'établi. 04 montre une vue d'ensemble de la ligne, avec un alt fidèle.

**Ce qui reste.**
- *Moyen, 0 €.* « Un technicien sous 48 / heures » : le chiffre et l'unité sont coupés à la ligne en 1440 (`-1440-04`). Pour un industriel, « 48 h » est l'engagement contractuel, on ne le casse pas. l.47 : `48&nbsp;heures`. À faire partout où un nombre précède son unité.
- *Moyen, 0 €.* En 1440, la colonne de texte laisse environ 200 px vides en bas de carte. `ul { margin-top: auto }` n'a aucun effet tant que `.pile-texte` est en `align-content: start` avec des lignes automatiques. l.8 : `grid-template-rows: auto auto 1fr`, avec `align-self: end` sur la liste. Les puces se posent alors en bas, comme prévu.
- *Léger, fiche.* Le prompt dit « voile sombre passe à 55 % » alors que le code l.73 met `.4`. Mettre 40 % dans le prompt.
- *Médias, hors 0 €.* La carte « Bilan » montre une ligne de production, pas un bilan. C'est acceptable, mais une page chiffrée sur un établi serait plus juste.

**25 000 € ?** Oui, pour une page d'offres B2B, après les deux retouches de texte.

---

## 7. focus-mots : 70 → 84 (beauté 33, utilité 13, accès 19, fiche 19)

**Corrections du tour 1.**
- Cibles : **corrigé.** Il y en a 5 seulement : pierre, neuf, garder, deux siècles, réparer. Aucun mot vide.
- Phrase lisible dès le départ : **corrigé en 1440** (`focus-mots-1440-00`). Le flou à 2 px avec une opacité de 0,7 se lit à 57 px de corps.
- Synchronisation : **corrigée.** Une fois posé, le viseur encadre la cible à 6 px près, sur les 21 positions mesurées, en 1440 comme en 375. Le décalage visible sur `-375-03` vient d'une capture prise en plein glissement : ce n'est pas un défaut.
- Course : **réduite.** Elle fait 125 % d'écran (1 125 px en 1440) au lieu d'environ 1 950 px.
- Signature « architecte du patrimoine » : **corrigée.** Elle est maintenant cohérente avec l'intro.

**Ce qui reste.**
- *Moyen, 0 €.* **En 375, le flou de 2 px sur des lettres de 27 px rend la phrase brumeuse** (`focus-mots-375-03`). « Restaurer une maison de » et « tient depuis » se devinent plus qu'ils ne se lisent. l.11 : flou proportionnel au corps, par exemple `filter: blur(.06em)`, ce qui donne environ 1,6 px en 375 et 3,4 px en 1440. Ou bien `@media (max-width: 640px) { … blur(1.2px); opacity: .78 }`.
- *Moyen.* Le viseur ne s'arrête qu'environ 60 à 100 px sur chaque cible. Le reste du temps, il glisse. On a peu le temps de « voir la mise au point ». Proposition : `.6` de glissement suivi d'un `.3` de tenue (`tl.to({}, {duration: .3})`) après chaque cible.
- *Utilité.* Ça reste une phrase-manifeste. C'est beau, mais ça ne sert qu'une fois par site, et je ne le mettrais jamais au-dessus de la ligne de flottaison.
- *Léger.* l.34 (texte d'explication, masqué en aperçu) : « n'apparaît » a une apostrophe droite.

**25 000 € ?** Pas encore, à un réglage près : le flou sur téléphone. Une fois corrigé, je le mets dans une page « notre démarche ».

---

### Verdict du lot

« Les deux défauts qui me faisaient perdre du contenu (un projet sauté, trois photos jamais vues) sont réglés, et je l'ai mesuré. Rideau, pilule, index et cartes partent chez un client tels quels, ou presque. La bande doit grandir sur téléphone, le focus doit flouter moins sur petit écran, et le chemin a besoin du façonnage et de vraies photos d'étapes pour devenir autre chose qu'un joli schéma. »
