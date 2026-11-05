# Lot 5, tour 2 : avis du client (GSAP et micro-interactions)

Date : 5 novembre 2026. Testé dans Chrome (Playwright) sur `http://127.0.0.1:4339/…/elements/<nom>.html` et `?apercu`, à 1440 × 900 et 375 × 812 (tactile). J'ai survolé puis quitté, cliqué, tapé au doigt, fait défiler à la molette, tabulé, testé en mouvement réduit, avec le CDN jsdelivr **bloqué** et avec le CDN **retardé de 3 à 5 s** (route Playwright). Je n'ai modifié aucun fichier de la bibliothèque. Mes captures sont dans `persona-biblio/captures-tour2-lot-5/`.

Grille : beauté et finition /40, utilité réelle /20, accessibilité, mouvement réduit et repli /20, fiche et prompt /20. Comme demandé, les photos payantes ne pèsent pas dans la note.

| élément | tour 1 | tour 2 | 25 000 € ? |
|---|---|---|---|
| gsap-morphsvg | 61 | 81 | Oui, à sa place (artisan à trois métiers) |
| gsap-drawsvg | 82 | 88 | Oui |
| gsap-scrollsmoother | 80 | 87 | Oui (page vitrine d'architecte, souris seulement) |
| micro-anime | 79 | 89 | Oui |
| micro-mojs | 73 | 82 | Pas encore : trois boutons au même nom (10 minutes) |

Ce que le tour 2 change : les deux vrais bugs du tour 1 sont corrigés et je les ai vérifiés en les mesurant (MorphSVG ne relance plus de boucle en mouvement réduit, et DrawSVG va au bout de sa tournée en `?apercu`). Les deux micro-interactions marchent maintenant avec un CDN lent. Les légendes de l'architecte sont justes. Il ne reste qu'un défaut d'accessibilité réel, sur mo.js, et je ne l'avais pas relevé au tour 1 : je le signale franchement.

---

## 1. gsap-morphsvg : 61 → 81

Beauté 31 · utilité 13 · accessibilité 19 · fiche 18

**Corrections du tour 1, une par une**
1. *Garde mouvement réduit dans `relancer()`* : **corrigé**. En mouvement réduit, j'ai survolé la feuille puis quitté : l'attribut `d` est identique 6,2 s plus tard. Même chose après focus puis sortie au clavier, et le bouton pause reste masqué (`morph-1440-reduit.png`).
2. *Sans GSAP* : **corrigé**. CDN bloqué, j'ai survolé la flamme puis quitté : aucune erreur de page, la forme et ses détails basculent d'un coup (`morph-1440-sans-cdn.png`).
3. *Tracés* : **nettement mieux**. La goutte a un reflet (`morph-zoom-0.png`). La feuille a un pétiole, une nervure centrale et six nervures secondaires (`morph-zoom-1.png`). La flamme a deux langues et un cœur orange puis jaune (`morph-zoom-2.png`). Les détails s'effacent avant le morph et reviennent à la fin : à mi-course, on voit une silhouette nette, sans nervure qui flotte (`morph-mi-goutte-feuille-50.png`). Ce ne sont plus des icônes de banque d'images.
4. *« Calorifugeage des réseaux »* : **corrigé**.
5. *Contrôle « survol puis sortie » dans `verifier-elements.cjs`* : **pas fait**. La fiche le reconnaît honnêtement (« le refaire à la main »).

**Le reste.** La pause tient : 6 s sans changement, y compris après un survol puis une sortie pendant la pause. L'aperçu est centré à 1440 et à 375, sans débordement (`morph-1440-apercu.png`, `morph-375-apercu.png`). Tab parcourt Pause, puis les trois services, et chaque focus donne sa forme (`morph-1440-focus.png`).

**Défauts restants**
- **Feuille → flamme, à mi-course** : un fil de 1 px dépasse à droite de la forme pendant environ 0,1 s (`morph-mi-feuille-flamme-50.png`, vers x = 300, y = 153). C'est un point de la flamme mal apparié avec la feuille. On le voit si on regarde bien.
- Le geste reste décoratif. Sur une page de services, il fait bien son travail, mais il ne vendra pas à lui seul.

**25 000 € ?** Oui, pour un artisan à trois métiers et une seule fois par page. Ce n'est plus un gadget mal dessiné.

**Corrections restantes (gratuites)**
1. `gsap-morphsvg.html` l. 109 : passer un `shapeIndex` pour la paire feuille → flamme (trouver la valeur avec `MorphSVGPlugin` en `shapeIndex: "log"`), ou ajouter un point à la base du pétiole dans `FORMES[1]` pour que les nombres de points se rapprochent. Contrôle : capture à 50 % sans fil.
2. `verifier-elements.cjs` : ajouter le test « mouvement réduit, survol, sortie, `d` identique 6 s plus tard ». La fiche pourra alors retirer sa phrase « à refaire à la main ».

---

## 2. gsap-drawsvg : 82 → 88

Beauté 33 · utilité 17 · accessibilité 19 · fiche 19

**Corrections du tour 1**
1. *`clamp()` sur start et end* : **corrigé**, et je l'ai mesuré. En `?apercu` à 1440, au défilement maximal (472 px), le tracé est complet (740/740), les cinq arrêts sont allumés (`11111`) et la route arrive à la Croix-Rousse (`draw-1440-apercu-6.png`). Même chose à 375 (`draw-375-apercu-6.png`) et en mode normal.
2. *Début à zéro* : **corrigé**. À l'ouverture, le tracé est à 0 et seule la ferme est allumée (`draw-1440-apercu-0.png`). Au tour 1, un tiers de la route était déjà dessiné.
3. *Zéros barrés* : **corrigé**. La Familjen Grotesk donne « 20 h » et « 10 h 15 » propres.
4. *`refresh` à `fonts.ready`* : **fait** (l. 159).
5. *Fiche* : la règle « garder `clamp()` ou laisser 45 % d'écran » y est, et le prompt aussi.

**Le reste.** Retour en haut : tout se remet à zéro proprement. Avec un CDN lent (3 s) et un défilement fait avant l'arrivée de GSAP, l'état se cale sur la position réelle dès qu'il arrive (`11100` à 300 px). En mouvement réduit ou sans CDN : tracé entier, tout allumé, pas d'erreur. La géographie tient toujours.

**Défauts restants.** Rien de cassé. La carte reste un peu nue (fond crème, deux rivières), et c'est une question de média, pas de code.

**25 000 € ?** Oui. C'est le meilleur « fil » de la bibliothèque.

**Corrections restantes.** Aucune obligatoire. Option : un fond de carte illustré (relief des Monts du Lyonnais, Saône et Rhône, 8:5).

---

## 3. gsap-scrollsmoother : 80 → 87

Beauté 34 · utilité 14 · accessibilité 19 · fiche 20

**Corrections du tour 1**
1. *Légendes et alt* : **corrigés et justes**. « Le séjour sous la voûte d'origine, poêle à bois dans l'angle. » correspond à la photo (`smooth-375-0.png` montre bien la voûte en berceau). L'alt du mur dit « Mur en moellons hourdés à la chaux ». « La lumière de la fenêtre sud, 16 heures en novembre. » : on voit l'ombre portée des petits bois sur l'enduit et des tomettes au sol, que l'alt cite (`smooth-1440-4.png`). L'intro dit « voûtes gardées telles quelles ». Comme architecte, je signe.
2. *Vide sur téléphone* : **corrigé**. Le titre est à 104 px du haut, et la photo du séjour entre dans le premier écran (`smooth-375-0.png`).
3. La fiche ajoute la règle « légendes écrites en regardant chaque photo, faire relire par le client ». C'est exactement la bonne leçon.

**Le reste.** Une seule instance, à la souris seulement. Aucune à 375 tactile ni en mouvement réduit. L'ancre fait défiler jusqu'au contact et donne le focus à « Écrire à l'atelier » (`smooth-1440-ancre.png`). Tab vers le contact l'amène à l'écran (top 630). Sans CDN, l'ancre native marche. Console propre.

**Défauts restants.** Rien de bloquant. À 1440, l'ouverture garde environ 350 px de vide au-dessus du titre (`smooth-1440-0.png`). C'est un choix éditorial, mais on le défend devant un client pressé.

**25 000 € ?** Oui, sur une page vitrine d'architecte ou de photographe, en respectant l'avertissement de la fiche (pas de Lenis, pas de sticky dedans).

**Corrections restantes.** Aucune obligatoire. Option : `.ouverture { min-height: 80svh }` à partir de 761 px, si le client trouve le haut trop vide.

---

## 4. micro-anime : 79 → 89

Beauté 34 · utilité 19 · accessibilité 19 · fiche 17

**Corrections du tour 1**
1. *Clics avant le CDN* : **corrigé**. Avec le CDN retardé de 5 s, un clic à 1,1 s met à jour tout de suite le nombre, le total et l'annonce (12,40 €). Une fois Anime.js arrivé, le clic suivant fait voler la vignette. CDN bloqué : l'ajout est instantané, sans erreur.
2. *Noms distincts* : **corrigé**. « Ajouter Konga au panier », « Ajouter La Palma au panier », « Ajouter Huila déca au panier », « Ajouter Brume du matin au panier ».
3. *Marque Brume* : **corrigé**.
4. *Étiquettes* : **corrigé, et bien fait**. Les étiquettes en HTML (marque, origine, nom, tampon « torréfié le mardi ») sont posées juste sur la zone blanche, et elles volent avec le sachet (`anime-1440-carte-konga.png`, `anime-375-vol.png`). Un torréfacteur ne verrait plus de sachet vierge.
5. *Arc* : **visible**. Avec `inBack(3)`, la vignette plonge puis remonte vers le panier (`anime-1440-vol-400.png`).

**Les chiffres concordent.** 12,40 + 19,80 + 13,10 + 11,20 + 19,80 = **76,30 €**, avec 5 articles, à l'affichage comme dans l'annonce. Aucun clone ne reste après des clics rapides. Mouvement réduit : la mise à jour est instantanée.

**Défauts restants**
- **Alignement des cartes à 1440** (`anime-1440-0.png`) : les titres et les descriptions ne sont pas à la même hauteur d'une carte à l'autre (titre à 497 px pour Konga, à 492 pour Huila). La grille de la carte répartit la hauteur en trop entre ses lignes.
- **Sur téléphone**, la vignette pleine largeur plonge d'abord sur le texte de sa propre carte (`anime-375-vol.png`). Ça dure 0,3 s, mais c'est lourd.
- Le lien panier pointe sur lui-même (`href="#panier"`).

**25 000 € ?** Oui. Le bouton d'achat ne dépend plus de rien, et le geste est joli.

**Corrections restantes (gratuites)**
1. `micro-anime.html` l. 44 : `.produit { align-content: start; grid-template-rows: auto auto 1fr auto; }` (ou `.ligne { margin-top: auto }` avec la carte en flex colonne).
2. l. 147 : sous 600 px, `inBack(1.6)` et un départ à `scale: .5`, pour que le clone ne recouvre pas le texte.
3. l. 67 : `href="/panier"` dans la fiche § Brancher (« pointer vers la vraie page panier »).

---

## 5. micro-mojs : 73 → 82

Beauté 32 · utilité 14 · accessibilité 17 · fiche 19

**Corrections du tour 1**
1. *Accord* : **corrigé**. « Ajouté à vos pièces aimées : Tasse Galet (89). », « Retiré de vos pièces aimées : Tasse Galet. », et « Assiette Lavoir » sans faute. La fiche est corrigée elle aussi.
2. *Bulles de la pastille* : **corrigé**. Au survol, neuf bulles ambre et vert sapin montent en éventail au-dessus de « Nouveau », bien visibles (`mojs-pastille-survol-380.png`, `mojs-1440-survol.png`). Elles se voient aussi à l'entrée sur téléphone (`mojs-375-eclat.png`). La carte n'a plus d'`overflow: hidden`, et l'image garde ses coins arrondis.
3. *CDN lent* : **corrigé**. Avec un retard de 5 s, un clic à 0,3 s donne `aria-pressed=true`, 128 et l'annonce. Une fois mo.js arrivé, les éclats partent et les bulles se branchent. CDN bloqué : le bouton marche, sans erreur.
4. *Commentaire mal placé* : **corrigé** (l. 38).

**Le reste.** Les calques mo.js sont tous `aria-hidden` (7 sur 7). En mouvement réduit : 0 calque, le cœur se remplit. La barre d'espace marche au clavier.

**Défauts restants**
- **Trois boutons au même nom** : au clavier ou au lecteur d'écran, on entend « J'aime 127 », « J'aime 88 », « J'aime 203 », sans savoir de quelle pièce il s'agit. C'est exactement le défaut corrigé sur micro-anime, et je l'avais manqué au tour 1. Pour une boutique, c'est le seul vrai reproche qui reste.
- **Typo à 375** : « d'un clic sur « / J'aime ». ». Le guillemet ouvrant reste seul en fin de ligne (`mojs-375-eclat.png`), il manque des insécables.
- L'éclat du cœur est très discret : à 350 ms, les points sont presque invisibles (`mojs-eclat-350.png`), et l'anneau passe sur le « J » de « J'aime » (`mojs-eclat-200.png`). C'est acceptable, mais l'effet est plus timide que la pastille.

**25 000 € ?** Pas encore, pour dix minutes de travail. Avec un nom distinct par bouton, c'est oui.

**Corrections restantes (gratuites)**
1. `micro-mojs.html` l. 76, 88, 100 : `J'aime<span class="sr-only"> Bol Craie,</span> <span class="jaime__compte">127</span>` (même chose pour Tasse Galet et Assiette Lavoir). Le nom accessible devient « J'aime Bol Craie, 127 » et contient bien le texte visible. Ajouter la règle dans la fiche (§ Brancher et prompt).
2. l. 64 : `«&nbsp;J'aime&nbsp;»`.
3. l. 126 : `radius: { 12: 40 }` et enfants `radius: { 3.5: 0 }`, pour que l'anneau ne passe pas sur le texte et que les points se voient. Ou bien décaler le calque avec `left: 18`.
