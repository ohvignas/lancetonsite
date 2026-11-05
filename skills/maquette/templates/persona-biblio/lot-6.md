# Lot 6 : regard du client (25 000 €)

Date : 5 novembre 2026. Testé dans Chrome via Playwright, sur `http://127.0.0.1:4330/…?apercu`, à 1440 × 900 et 375 × 812, avec et sans mouvement réduit. J'ai aussi testé le clavier (Tab), le survol, les clics, le redimensionnement 1440 → 800, le site sans les bibliothèques (CDN bloqué : Two.js, D3) et le site sans WebGL (`--disable-webgl --disable-3d-apis`). Je n'ai vu aucune erreur dans la console sur les 7 éléments.
Captures : `persona-biblio/captures-lot-6/` (`<nom>-<largeur>[-reduit]-a.png` au chargement, `-b.png` après 3,5 s, plus les captures d'interaction citées plus bas).

| élément | note | 25 000 € ? | médias utiles ? |
|---|---|---|---|
| elements/carte-provenance-two | 82 | Pas encore | Peu : une photo carrée du producteur pour l'étape 1, et c'est tout |
| elements/schema-etapes-two | 75 | Pas encore | Oui : 4 vignettes photo 1:1, une par étape |
| elements/preuves-d3 | 84 | Pas encore (un chiffre faux) | Non |
| fonds-hero/ruban-soie | 85 | Oui | Non |
| fonds-hero/brume-shader | 73 | Pas encore | Oui, nettement : une vidéo de mer de nuages vue d'un refuge |
| fonds-hero/aurore-maillee | 73 | Pas encore | Non |
| fonds-hero/horizon-eclipse | 77 | Pas encore | Non |

Barème : beauté et finition /40, utilité /20, accessibilité, mouvement réduit et repli /20, fiche et prompt /20.

---

## 1. Carte de provenance (Two.js) : 82/100

Ce que j'ai vu : `carte-provenance-two-1440-a.png` (tracé en cours), `-1440-b.png` (état final), `-375-b.png`, `carte-provenance-two-rejouer-700ms.png`, `carte-provenance-two-sans-two.png`.

- **Beauté 31/40.** C'est charmant et juste de ton : papier kraft, parcelles, sillons, rivière. Le tracé qui se dessine avec les étapes qui s'allument, c'est exactement le moment « d'où ça vient ». En revanche, l'œil du maraîcher voit tout de suite que **le camion ne prend pas la route**. Le trajet rouge longe la route blanche à 30 px en dessous, coupe la parcelle du Lavage en diagonale et franchit la rivière là où il n'y a pas de pont (capture -1440-b, entre les étapes 2 et 3). Sur une carte de circuit court, c'est le genre de détail faux qu'un client remarque. Le bouton « Rejouer » recouvre un bosquet à 1440 et presque un tiers de la largeur de la carte à 375.
- **Utilité 17/20.** C'est un vrai argument de vente pour un producteur, un torréfacteur ou un artisan. La liste HTML à côté porte l'information.
- **Accessibilité 15/20.** La carte est `aria-hidden`, la liste ordonnée est réelle, le bouton fait 44 px avec un focus visible. En mouvement réduit, le tracé est complet d'emblée et il n'y a pas de bouton : très bien. **Sans Two.js, en revanche, on voit un grand rectangle beige vide de 670 × 470 px** (capture sans-two). C'est un repli qui fait cassé.
- **Fiche 19/20.** Elle est complète : licence MIT vérifiée, poids, variables, prompt prêt à coller.
- **Métier.** Ligné et Montfort existent, mais à environ 80 km l'un de l'autre, pas 23. La fiche dit « lieux fictifs » ; un client breton tiquera quand même.

**25 000 € ?** Pas encore : il faut que le trajet suive la route et que le repli sans bibliothèque ne laisse pas un trou.

Corrections gratuites, par priorité :
1. `carte-provenance-two.html` l. 113 et 122 : faire passer la route principale **par les ancres du trajet**. Par exemple, remplacer la route l. 113 par une courbe qui reprend `ancres` (route blanche de 10 px, puis trajet rouge de 5 px dessus). Ajouter un petit pont : un rectangle `--carte-route` de 22 × 12 px à l'endroit où le trajet croise la rivière, vers (440, 285).
2. l. 26 : poser un fond de repli `.provenance__carte:not(:has(svg)) { display: none; }`, ou un `background-image` SVG statique de la carte finale. Le mieux est d'écrire l'état final dans un `<svg>` inline que Two.js remplace.
3. l. 28 : sous 600 px, sortir le bouton Rejouer de la carte (`position: static; margin-top: .6rem`), ou le réduire à une icône ↻ de 44 × 44 avec `aria-label`.
4. Ajouter les distances par tronçon sur la carte (« 14 km » entre 2 et 3), puisque la liste les cite.
5. Texte de démo : prendre trois communes réellement voisines, ou des noms inventés.

Médias : une photo carrée du producteur au champ (1:1, 600 px), en vignette dans l'étape 1 de la liste. Gain modeste ; la carte dessinée en code est le bon choix.

---

## 2. Schéma d'étapes (Two.js) : 75/100

Ce que j'ai vu : `schema-etapes-two-1440-a.png` (éclosion en cours), `-1440-b.png`, `-375-b.png`, `schema-etapes-two-375-zoom.png`, `schema-etapes-two-sans-two.png`.

- **Beauté 26/40.** C'est propre, mais banal : quatre ronds verts reliés par des pointillés de 2,5 px très pâles. L'arc qui monte, descend puis remonte (l. 95, `i % 2`) ne raconte rien. Sur téléphone, les liaisons verticales tiennent dans 25 px et ressemblent à des points de suspension (capture zoom). Rien ici ne justifie qu'un client se souvienne de la section.
- **Utilité 14/20.** C'est une section dont tous les sites ont besoin, mais **205 Ko de Two.js pour des pointillés et un rebond**, alors qu'un SVG inline avec `stroke-dashoffset` en CSS ferait la même chose pour 1 Ko. La fiche le reconnaît à moitié (« bibliothèque partagée si la carte est là »).
- **Accessibilité 18/20.** Vraie liste `<ol>`, pastilles CSS si Two.js manque, état final en mouvement réduit, bouton de 44 px. C'est bien fait.
- **Fiche 17/20.** Le prompt est clair. Mais le titre de la démo, « du champ à votre cabas **en quatre jours** », ne colle avec rien : la récolte a lieu le lundi et le panier est disponible dès le mardi 16 h, soit un jour et demi. Le CTA « Choisir mon panier » pointe sur `#schema`, c'est-à-dire sur lui-même.

**25 000 € ?** Pas encore : c'est correct, mais rien ne le distingue d'un gabarit gratuit.

Corrections gratuites :
1. l. 96 : passer à `linewidth = 3`, avec `dashes = [0.001, 10]` et une opacité pleine. Ou mieux, un trait continu qui se dessine, avec une flèche en bout (`two.makePath` triangle) pour donner le sens de lecture.
2. l. 95 : remplacer l'alternance haut/bas par une seule courbe douce, ou par un arc qui monte d'une étape à l'autre (progression).
3. l. 24 : sur mobile, passer à `gap: 2.4rem` pour que les liaisons verticales soient lisibles.
4. l. 55 : titre « Du champ à votre cabas en 36 heures. » (ou « en deux jours »).
5. l. 65 : `href` vers une vraie ancre (`#abonnement`), et noter dans la fiche qu'il faut le brancher.
6. Fiche : proposer une variante sans Two.js (SVG inline + CSS) quand la carte de provenance n'est pas sur la page.

Médias : oui, 4 vignettes photo 1:1 (main qui coche un panier, récolte au petit matin, caisse dans une camionnette, panier sur le comptoir de l'épicerie) à la place des numéros ou au-dessus. C'est ce qui ferait le plus monter la note.

---

## 3. Preuves chiffrées (D3) : 84/100

Ce que j'ai vu : `preuves-d3-1440-b.png`, `-375-b.png`, `preuves-d3-375-barres.png`, `preuves-d3-1440-survol.png`, `preuves-d3-1440-survol-barre.png`, `preuves-d3-1440-tableau.png`, `preuves-d3-800-resize.png`, `preuves-d3-sans-d3.png`.

- **Beauté 33/40.** C'est le plus sérieux du lot : grille discrète, étiquettes directes en bout de courbe, barres groupées lisibles, chiffres en chasse fixe. La courbe se trace et les barres poussent : c'est sobre. Points faibles :
  - la carte des barres garde environ 150 px de blanc en bas à 1440, parce que la grille égalise les hauteurs (capture -1440-b) ;
  - l'info-bulle de la courbe recouvre la légende (capture survol) ;
  - le « h » en police mono est détaché (« 212  h »).
- **Utilité 18/20.** Pour un industriel ou un service B2B, c'est exactement la preuve qu'on demande.
- **Accessibilité 19/20.** `role="img"` avec un résumé, de vrais tableaux avec `th scope`, et un repli sans D3 qui ouvre les tableaux : excellent. Le redimensionnement redessine sans rejouer. Seul défaut : `summary { display: flex }` (l. 41) **fait disparaître le triangle** de `<details>`. « Voir les données de la courbe » ressemble à du texte et non à une commande.
- **Fiche 14/20.** Fiche excellente sur la forme. **Mais le chiffre clé est faux par rapport à ses propres données.** La courbe totalise 161 arrêts en 2024 et 65 en 2025, soit **−60 %, pas −64 %** (l. 67 contre l. 103-104). L'acheteur industriel qui ouvre le tableau fait l'addition. Une preuve chiffrée qui se contredit, c'est pire que pas de preuve.

**25 000 € ?** Pas encore : il reste une ligne à corriger, puis ce sera un oui.

Corrections gratuites :
1. l. 67 : écrire « −60 % ». Mieux, calculer la tuile en JS à partir de `COURBE` (somme des valeurs) pour que l'écart ne puisse plus revenir. Le noter dans « Brancher » de la fiche.
2. l. 41 : ajouter `.donnees summary::before { content: "▸"; margin-right: .5rem; transition: transform .2s } .donnees[open] summary::before { transform: rotate(90deg) }`.
3. l. 22 : `align-items: start` sur `.preuves`, pour que la carte des barres ne garde pas un trou blanc.
4. l. 166 : placer la bulle sous le point quand `y < 60`, ou au niveau de la série la plus basse, pour ne plus couvrir la légende.
5. l. 191 : `${b[cle]} h` → `${b[cle]} h`, et passer les valeurs en `IBM Plex Sans` avec `tabular-nums` plutôt qu'en mono.
6. Tableau de la courbe : ajouter une ligne « Total : 161 / 65 ».
7. Masquer la légende quand D3 manque (le repli montre une légende sans graphique).

Médias : non, les chiffres se suffisent.

---

## 4. Ruban de soie (WebGL) : 85/100

Ce que j'ai vu : `ruban-soie-1440-t6.png`, `-375-b.png`, `-1440-reduit-b.png`, `ruban-soie-sans-webgl.png`.

- **Beauté 34/40.** C'est élégant et fin : 28 fils, un léger reflet irisé, et le titre reste parfaitement lisible. Il tourne à 60 i/s. À 375, le ruban n'est plus qu'une traînée basse à moitié coupée : il perd son volume.
- **Utilité 15/20.** Cabinet, SaaS, conseil : ça marche, mais c'est un registre vu partout.
- **Accessibilité 19/20.** Pause de 44 px avec un libellé qui change, image fixe en mouvement réduit (le bouton propose alors « Relancer », c'est un vrai choix), repli en dégradé sans WebGL, propre (capture sans-webgl). Rien à redire.
- **Fiche 17/20.** Complète et honnête. Il manque une ligne « Licence » explicite (code original, police Inter Tight sous OFL).

**25 000 € ?** Oui, pour un hero de cabinet ou de SaaS, après avoir corrigé le mobile.

Corrections gratuites :
1. l. 79 : rendre la hauteur et la largeur du ruban dépendantes du format. Par exemple `- .2` → `- (r.x < r.y ? .05 : .2)`, et amplifier `p.x` en portrait (`p.x * (r.x < r.y ? .6 : 1.)`) pour que le ruban traverse l'écran sous le CTA.
2. Fiche : ajouter « Licence : code original Lancetonsite ; police Inter Tight (OFL) ».
3. l. 63 : tester `antialias: false` contre un léger `smoothstep` plus large (.006) en densité 1, pour éviter le moiré visible sur les fils en bas à gauche à 1440.

Médias : non.

---

## 5. Brume sur les crêtes (WebGL) : 73/100

Ce que j'ai vu : `brume-shader-1440-t6.png`, `-375-b.png`, `-1440-reduit-b.png`, `brume-shader-sans-webgl.png`.

- **Beauté 26/40.** L'idée est bonne, le rendu ne l'est pas encore. Le soleil est un disque blanc cramé de 500 px. La moitié basse est un gris sale (#7a8086 environ) qui évoque le brouillard de pollution, pas la montagne.
- **Métier (je suis le gardien du refuge).** Le titre promet « dormir **au-dessus** de la mer de nuages ». L'image montre l'inverse : des collines basses noyées dans la brume, vues d'en bas. Une mer de nuages, c'est une nappe blanche, plate et lumineuse en bas, avec des sommets sombres et nets qui en émergent. Ici, la palette est inversée.
- **Utilité 14/20.** Pour un hébergement, une vraie image gagnera toujours. Le dessin en code n'est un bon dépannage que s'il est juste.
- **Accessibilité 17/20.** Pause, image fixe en mouvement réduit, repli en dégradé sans WebGL : tout fonctionne. Contraste correct. Mais à 1440, le chapô et le bouton sont posés **sur les crêtes** (capture t6, y ≈ 600-730), contrairement à ce que dit la fiche.
- **Fiche 16/20.** `--voile` vaut `#f4f1ec` dans la fiche et `#eef1f2` dans le code (l. 19). L'affirmation « le titre reste dans la moitié haute, jamais sur les crêtes » est fausse à 1440. Rien n'est dit sur le coût sur mobile (35 bruits par pixel).

**25 000 € ?** Pas encore : le gardien du refuge ne reconnaîtrait pas son paysage.

Corrections gratuites :
1. l. 86-91 : inverser la logique pour obtenir une mer de nuages. Il faut une nappe claire (`cv` éclaircie à 1.05) **en dessous** de la crête la plus proche, et des crêtes sombres et nettes qui en sortent. Retirer le voile qui assombrit le bas (`smoothstep(.55, 0., uv.y) * .6` → nappe claire avec `mix(col, cv*1.04, …)`).
2. l. 74 : soleil moins cramé, `exp(-ds * 9.) * .55` → `* .3`, et halo plus large et plus chaud.
3. l. 78 : remonter les crêtes ou baisser le texte. Viser une base vers `.32 - fi * .08` pour que le chapô reste dans le ciel à 1440.
4. Fiche : aligner `--voile`, corriger la phrase sur la position du titre et ajouter « sur mobile, densité 1 et 4 octaves ».

Médias : **oui, nettement.** Une vidéo en boucle de 8 à 10 s d'une mer de nuages au lever du soleil, vue depuis une terrasse en bois de refuge (16:9 avec poster ; recadrage 9:16 pour mobile). Le shader resterait comme repli.

---

## 6. Aurore maillée (CSS) : 73/100

Ce que j'ai vu : `aurore-maillee-1440-t6.png`, `-375-b.png`, `-1440-reduit-b.png`.

- **Beauté 29/40.** C'est bien exécuté : les couleurs sont riches et le grain est réussi. Mais c'est le dégradé maillé des landing pages SaaS de 2022, sans aucune signature. Un client à 25 000 € l'a déjà vu dix fois cette semaine.
- **Utilité 14/20.** C'est léger et facile à recolorer. C'est son vrai atout.
- **Accessibilité 14/20.** J'ai mesuré sur les captures : **le chapô #d7daee descend à 2,9-3,4:1** sur la zone mauve-pêche (vers « Un comptable », x ≈ 900, y ≈ 500), en mouvement réduit comme en animation. La fiche prévient du risque mais la démo ne le tient pas. Le bouton pause est bien masqué en mouvement réduit.
- **Fiche 16/20.** Le prompt est bon. Mais la section Performance est recopiée des fonds WebGL : « densité de pixels plafonnée » et `visibilitychange` n'existent pas ici. Le commentaire l. 28 dit « composité, pas de repeint » alors que `filter: blur(80px)` sur le conteneur des taches animées (l. 29) oblige à refaire le flou à chaque image : c'est coûteux sur mobile.
- **Métier (je suis l'expert-comptable).** « Votre **bilan** prêt avant la fin du mois » : le bilan est annuel, on le prépare à la clôture de l'exercice. Ce qui est prêt chaque mois, ce sont la **tenue**, le **rapprochement bancaire** et la **déclaration de TVA**.

**25 000 € ?** Pas encore : il est générique, et un texte est illisible par endroits.

Corrections gratuites :
1. l. 45 : renforcer le voile, `radial-gradient(70% 55% at 50% 50%, rgb(11 13 26 / .6), transparent 75%)`, puis remesurer le chapô (cible 4,5:1). Ou passer le chapô en `#fff` avec `text-shadow: 0 1px 12px rgb(11 13 26 / .5)`.
2. l. 29-30 : appliquer le flou une fois. Soit `filter` sur chaque `i` avec `will-change: transform` (le flou est alors rastérisé une seule fois par calque), soit des `radial-gradient` doux à la place du `blur`.
3. Fiche, section Performance : remplacer par « CSS seul ; pause hors écran par `IntersectionObserver` ; le navigateur suspend les animations des onglets cachés ».
4. l. 67 : écrire « Votre TVA déclarée, vos comptes à jour, chaque mois. » ou « Votre bilan prêt dès la clôture. ».

Médias : non.

---

## 7. Horizon d'éclipse (CSS) : 77/100

Ce que j'ai vu : `horizon-eclipse-1440-t6.png`, `-375-b.png`, `-1440-reduit-b.png`.

- **Beauté 33/40.** C'est net et premium. Le liseré, la lueur et le reflet qui glisse sur l'arc sont réussis. Mais à 1440, **le bouton « Lancer la surveillance » est posé pile sur le liseré** (y ≈ 530-580) : on dirait une erreur de placement plutôt qu'un choix. À 375, l'arc est petit et les 280 px du bas sont du noir vide. Le registre (Linear, Vercel) est très répandu.
- **Utilité 14/20.** C'est léger, mais réservé à la tech, à la sécurité ou à un événement.
- **Accessibilité 14/20.** **Bug : en mouvement réduit, le bouton pause reste affiché** (`display: flex` mesuré). La règle `@media (prefers-reduced-motion) { .pause { display: none } }` l. 52 est écrasée par `.pause { display: inline-flex }` l. 60, déclarée après. Le bouton bascule donc « Relancer le fond » sans effet. La pastille « Nouveau · rapport mensuel » ressemble à un lien mais ne l'est pas.
- **Fiche 16/20.** Le prompt est bon. Même section Performance recopiée (« densité plafonnée », `visibilitychange` absents). « Sentinelle surveille vos **sites** » sous « vos **serveurs** veillent » : il faut choisir un des deux.

**25 000 € ?** Pas encore : le bug de mouvement réduit et le CTA sur le liseré sont à corriger d'abord.

Corrections gratuites :
1. Déplacer l. 52 **après** l. 60, ou écrire `@media (prefers-reduced-motion: reduce) { .hero .pause { display: none } }`.
2. l. 35, 39 et 43 : baisser l'arc à 1440 (`translate(-50%, 86%)`) ou augmenter le padding bas de `.contenu` (l. 54 : `14rem` → `18rem`) pour que le CTA reste dans le ciel. En portrait, ajouter `@media (orientation: portrait) { .planete, .reflet { transform: translate(-50%, 70%) } }` pour remonter l'arc et remplir le bas.
3. l. 71 : faire de la pastille un vrai lien (`<a href="#rapport">`) ou retirer son contour.
4. Fiche, section Performance : la réécrire pour le CSS seul (comme pour l'aurore).
5. l. 73 : « surveille vos serveurs et vos sites ».

Médias : non.
