# Lot 6, tour 2 : regard du client (25 000 €)

Date : 5 novembre 2026. Testé dans Chrome via Playwright, sur `http://127.0.0.1:4339/…?apercu`, à 1440 × 900 et à 375 × 812, avec et sans mouvement réduit. J'ai aussi testé :
- le clavier (Tab) ;
- le survol de la courbe D3 et l'ouverture des tableaux ;
- les boutons « Rejouer » ;
- le défilement sur mobile, pour déclencher les barres ;
- le site sans Two.js ni D3 (toute requête hors 127.0.0.1 bloquée) ;
- le site sans WebGL pour le shader (`--disable-webgl --disable-3d-apis`).

Je n'ai vu aucune erreur dans la console ni aucune requête en échec sur les 6 éléments.

Je n'ai lu que mon propre rapport du tour 1 (`lot-6.md`) ; le regard reste indépendant. Captures : `persona-biblio/captures-tour2-lot-6/`.

| élément | tour 1 | tour 2 | 25 000 € ? |
|---|---|---|---|
| elements/carte-provenance-two | 82 | **91** | **Oui** |
| elements/schema-etapes-two | 75 | **84** | Pas encore (presque) |
| elements/preuves-d3 | 84 | **91** | **Oui** |
| fonds-hero/brume-shader | 73 | **85** | Pas encore (oui comme repli de la vidéo) |
| fonds-hero/aurore-maillee | 73 | **83** | Pas encore (propre, mais sans signature) |
| fonds-hero/horizon-eclipse | 77 | **87** | Pas encore (presque : le bas en mobile) |

Barème : beauté et finition /40, utilité /20, accessibilité, mouvement réduit et repli /20, fiche et prompt /20. Seuil : 90. La vidéo de mer de nuages et les vignettes photo sont hors périmètre ; je ne les compte pas une deuxième fois.

---

## 1. Carte de provenance (Two.js) : 82 → 91. Oui

Captures : `carte-provenance-two-1440-a.png` (tracé en cours), `-1440-b.png`, `-375-b.png`, `-sans-lib-1440.png`, `-sans-lib-375.png`, `-rejouer-700ms.png`.

Reprise du tour 1 :
- **Le trajet suit la route : corrigé.** Le tracé rouge est posé sur la route blanche, il franchit la rivière sur un pont dessiné, et les deux routes secondaires ont aussi leur pont (capture -1440-b). C'est exactement ce que le maraîcher voulait voir.
- **Repli sans Two.js : corrigé, et très bien.** La carte finale est en SVG inline, identique à l'état animé (capture sans-lib-1440). On ne voit aucune différence.
- **Rejouer sur mobile : corrigé.** C'est maintenant une icône ↻ de 44 × 44 px qui ne mange plus la carte (capture -375-b).
- **Distances : faites.** On lit 1 km, 14 km et 8 km sur la carte, ce qui fait bien 23 km, comme le titre et la liste.
- **Communes : corrigé.** Les noms sont inventés (La Gravelais, Saint-Mélaine-du-Gué, Montrouvel) ; plus personne ne peut tiquer.
- Fiche : licence MIT vérifiée, poids détaillé (repli compris), performance honnête.

Notes : beauté 35, utilité 18, accessibilité 19, fiche 19.

Corrections restantes (légères) :
1. **L'échelle n'est pas tenue.** Le tronçon de 1 km mesure environ 125 px, celui de 8 km environ 180 px. C'est un plan schématique, ce qui est acceptable, mais il faut le dire. Ajouter une mention discrète « plan schématique » en bas à droite de la carte, ou rapprocher la ferme du lavage.
2. L'étiquette « Halle des Moulins » touche presque la rivière à 1440. La décaler de 8 px vers le haut.

**25 000 € ?** Oui : c'est juste, charmant, et ça tient même sans la bibliothèque.

## 2. Schéma d'étapes (Two.js) : 75 → 84. Pas encore (presque)

Captures : `schema-etapes-two-1440-b.png`, `-375-b.png`, `-sans-lib-1440.png`, `-rejouer-700ms.png`.

Reprise du tour 1 :
- **Titre : corrigé.** « En 34 heures » est juste : de la récolte le lundi à 6 h jusqu'au panier disponible le mardi à 16 h.
- **Lisibilité : corrigé.** L'escalier qui monte, les arcs pleins avec flèche et les horaires sur les arcs racontent enfin une progression (capture -1440-b).
- **Mobile : corrigé.** L'écart est plus grand et les flèches verticales sont lisibles.
- **CTA : corrigé.** Il pointe vers `#abonnement`.
- **Fiche : corrigée.** La variante SVG + CSS sans Two.js est décrite.

Notes : beauté 31, utilité 16, accessibilité 18, fiche 19.

Ce qui manque encore :
1. **Sur mobile, les horaires disparaissent** (l. 107, `!vertical`). Or c'est ce qui prouve les 34 h. En colonne, poser l'horaire à droite de la flèche, en 12 px, entre deux étapes : il y a la place dans la gouttière de 56 px + 1 rem.
2. **Sans Two.js, l'escalier reste mais les arcs disparaissent** (capture sans-lib-1440) : les ronds flottent à des hauteurs différentes sans raison. Il faut soit poser les trois arcs finaux en SVG inline, comme pour la carte, soit aligner les étapes à plat quand Two.js manque (`.schema:not(.anime) li { margin-top: 0 }`).
3. **Le sens des horaires est ambigu.** « lundi 6 h » s'affiche au-dessus de l'arc 1 → 2, mais c'est l'heure de début de l'étape 2. Écrire « récolte lundi 6 h », « livraison mardi 14 h », « dispo mardi 16 h », ou bien mettre l'horaire sous le titre de chaque étape.
4. Étape 3 : le texte dit « mardi après-midi » et l'arc dit « mardi 14 h ». Écrire « mardi dès 14 h » dans le texte.

Ça reste propre mais sobre ; c'est surtout ce qui reste sans les vignettes photo, hors périmètre. Avec les corrections 1 et 2, je monte à 88-90.

**25 000 € ?** Pas encore : les horaires qui font la preuve disparaissent sur téléphone, et le repli laisse un escalier sans flèches.

## 3. Preuves chiffrées (D3) : 84 → 91. Oui

Captures : `preuves-d3-1440-b.png`, `-survol-8.png`, `-tableau.png`, `-375-full.png`, `-375-barres-scroll.png`, `-sans-lib-1440.png`.

Reprise du tour 1 :
- **Chiffre clé : corrigé.** La tuile affiche « −60 % » et elle est calculée depuis `COURBE` (l. 125-126) : elle ne peut plus contredire les données.
- **Ligne Total : ajoutée.** Elle donne 161 et 65 (capture tableau).
- **Info-bulle : corrigée.** Elle est sous la légende et ne la couvre plus (capture survol-8).
- **Disclosure : corrigé.** Le triangle ▸ est visible, et le focus est visible au clavier.
- **Hauteurs : corrigé.** La carte des barres ne garde plus de trou.
- **Unités : corrigé.** On lit « 212 h » en Plex Sans.
- **Repli sans D3 : corrigé.** La légende est masquée et les tableaux s'ouvrent (capture sans-lib) : excellent.
- Sur mobile, les barres poussent au défilement et sont complètes (capture 375-barres-scroll).

Notes : beauté 35, utilité 18, accessibilité 19, fiche 19.

Corrections restantes (légères) :
1. l. 158 : `curveMonotoneX` lisse des comptes mensuels. Un acheteur industriel préfère `d3.curveLinear` avec des points aux mois : c'est plus honnête pour des données discrètes.
2. Axe des x à 1440, en mono 12 px : « juin juil. » se touchent presque. Passer les étiquettes d'axe en Plex Sans 12 px, ou n'afficher qu'un mois sur deux sous 900 px.
3. À 375, les étiquettes directes « 17 · sans Vigie » et « 2 · avec Vigie » disparaissent (la légende suffit), et le dernier tick est « nov. » alors que la courbe va jusqu'en décembre. Forcer `tickValues([0, 3, 6, 9, 11])`.
4. Les barres totalisent 721 h contre 267 h, soit −63 % en heures, à côté du −60 % en nombre d'arrêts. C'est cohérent, mais un acheteur pressé y verra deux chiffres. Ajouter sous le titre des barres : « soit −63 % d'heures perdues ».

**25 000 € ?** Oui : la preuve se vérifie elle-même, et c'est ce qu'un acheteur industriel respecte.

## 4. Brume sur les crêtes (WebGL) : 73 → 85. Pas encore (oui comme repli)

Captures : `brume-shader-1440-a.png` et `-b.png`, `-375-b.png`, `-1440-reduit-b.png`, `-sans-webgl.png`, `-zoom-sommets.png`.

Reprise du tour 1 :
- **C'est maintenant une vraie mer de nuages vue d'en haut : corrigé.** On voit une nappe blanche et lumineuse, des sommets sombres qui en émergent, des voiles à leur pied et une palette d'aube (capture -1440-b). Le gardien du refuge reconnaît enfin le spectacle.
- **Soleil : corrigé.** Le disque est petit et net, le halo est chaud, rien n'est cramé.
- **Position du texte : corrigé.** Titre, chapô et bouton sont dans le ciel, à gauche des sommets, à 1440 comme à 375.
- **Repli sans WebGL : propre.** Le dégradé ciel → nappe blanche s'affiche et le bouton pause est retiré (capture sans-webgl).
- **Mouvement réduit : correct.** L'image est fixe et le bouton propose « Relancer le fond ».
- **Fiche : corrigée.** `--voile` est aligné (#f6f3ee), les 4 octaves et la densité 1 sur mobile sont notées, la licence est indiquée.

Notes : beauté 32, utilité 15, accessibilité 19, fiche 19.

Ce qui me retient encore, en gardien de refuge :
1. **Les sommets sont des pyramides lisses et grises, d'un gris uniforme** (capture zoom-sommets). Le « ridged » de la fiche ne se voit qu'en bordure. Il manque ce qui fait une montagne au lever du soleil : un liseré chaud sur l'arête côté soleil (rim light), et des couloirs ou des ressauts plus sombres sur la face à contre-jour. Dans le shader : ajouter `col += soleil * smoothstep(.0, .01, bord) * .25` le long de la crête, et moduler la roche par un second bruit à haute fréquence.
2. **« Refuge des Aiguilles · Vercors ».** Le Vercors, ce sont des falaises calcaires et des plateaux (le Mont Aiguille est une table à parois verticales), pas des pyramides alpines. Un client du Vercors le verra. Il faut soit changer le lieu de la démo (« Écrins », « Belledonne »), soit aplatir un sommet en table à falaises.
3. Le mouvement est presque imperceptible à l'œil (les voiles bougent, j'ai mesuré une différence entre deux captures à 3 s d'écart). C'est apaisant, mais un client demandera « ça bouge ? ». Accélérer la dérive des voiles d'environ 30 %.
4. À 375, le sommet de droite est coupé et le paysage tient dans 120 px. Remonter un peu l'horizon en portrait.

**25 000 € ?** Pas encore comme visuel principal, à cause des sommets génériques et du lieu faux. Oui dès maintenant comme repli et comme poster de la vraie vidéo.

## 5. Aurore maillée (CSS) : 73 → 83. Pas encore

Captures : `aurore-maillee-1440-b.png`, `-375-b.png`, `-1440-reduit-b.png`.

Reprise du tour 1 :
- **Contraste : corrigé.** Le voile est plus large et le chapô passe en #eef0fa. Le texte se lit partout, à 1440 comme à 375 (captures -b).
- **`filter: blur` : retiré.** Des dégradés radiaux doux le remplacent. La fiche explique pourquoi et ne recopie plus la section Performance du WebGL.
- **Texte comptable : corrigé.** « Vos comptes à jour, votre TVA déclarée, chaque mois », et « le bilan est prêt dès la clôture ».
- Pause masquée en mouvement réduit, focus visible (blanc 3 px), licence notée.

Notes : beauté 30, utilité 14, accessibilité 19, fiche 20.

Ce qui reste :
1. **Il n'a toujours pas de signature.** Ce sont quatre taches de couleur sur du marine, le hero SaaS type de 2022. Rien de ce qu'on corrige gratuitement ne change ça, sauf une idée. Par exemple, faire suivre aux taches une trajectoire lente en colonnes, comme des lignes de grand livre, ou poser une grille de lignes fines à 4 % d'opacité qui évoque le papier comptable sous le dégradé. Ce serait le détail métier qui le rendrait mémorable.
2. Métier (expert-comptable) : la TVA n'est mensuelle qu'au régime réel normal ; beaucoup de TPE sont au trimestre ou à la CA12. Écrire « votre TVA prête à chaque échéance ».
3. Les taches ont un centre visible (tache turquoise en bas à gauche, capture -1440-b) : on voit des projecteurs plutôt qu'un maillage. Passer le deuxième arrêt du `radial-gradient` de 65 % à 75 %.

**25 000 € ?** Pas encore : il est propre et accessible, mais un client qui paie 25 000 € veut un hero qu'il n'a pas vu chez son concurrent.

## 6. Horizon d'éclipse (CSS) : 77 → 87. Pas encore (presque)

Captures : `horizon-eclipse-1440-b.png`, `-375-b.png`, `-1440-reduit-b.png`.

Reprise du tour 1 :
- **Pause en mouvement réduit : corrigé.** Le bouton est en `display: none` (mesuré).
- **CTA : corrigé.** « Lancer la surveillance » est dans le ciel, au-dessus de l'arc, et l'arc est abaissé (capture -1440-b). La composition est nette et premium.
- **Pastille : corrigée.** Elle n'a plus de contour et ne ressemble plus à un lien.
- **Texte : corrigé.** « surveille vos serveurs et vos sites ».
- **Fiche : corrigée.** La section Performance est réécrite pour le CSS seul, et la licence est notée.

Notes : beauté 35, utilité 14, accessibilité 19, fiche 19.

Ce qui reste :
1. **À 375, environ 230 px de noir vide en bas** sous l'arc (capture -375-b), avec le bouton pause qui flotte dedans. Ce sont deux pouces d'écran pour rien sur le support où arrive la moitié du trafic. Remonter l'arc en portrait (`translate(-50%, 62%)`), ou réduire `min-height` du hero à `88svh` en portrait.
2. Le halo violet monte jusqu'au bouton à 1440 : le CTA blanc sur lueur violette reste lisible, mais il paraît posé dans la brume. Remonter le contenu de 2 rem ou baisser l'opacité haute du halo.
3. Le registre (Linear, Vercel) reste très répandu. C'est un choix de marque, pas un défaut ; c'est ce qui limite l'utilité à 14.

**25 000 € ?** Pas encore, de peu : à corriger, le bas vide sur téléphone. Pour une marque tech, c'est un oui après ça.

---

## En une phrase

« La carte et les preuves, je les signe : elles sont justes et elles tiennent même quand tout casse. Le schéma et l'éclipse sont à une correction près. La brume me parle enfin, mais ce n'est pas le Vercors. L'aurore est propre, mais j'ai déjà vu ce hero chez trois concurrents. »
