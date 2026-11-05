# Lot 8 : regard client sur la bibliothèque d'éléments (tour 1)

Date : 5 novembre 2026. Testé dans Chrome via Playwright, sur `http://127.0.0.1:4330/…?apercu` et en mode normal, à 1440 × 900 et à 375 × 812 (DPR 2, tactile), avec le mouvement réduit (`reducedMotion: 'reduce'`) et sans WebGL (`--disable-webgl --disable-3d-apis`). J'ai aussi fait 12 tabulations, bougé le pointeur, cliqué chaque bouton, manipulé les radios et le curseur du flacon, et lu la console. Résultat : **0 erreur console, 0 requête en échec, aucun débordement horizontal** sur les 7 éléments. En mouvement réduit, deux captures prises à 1,2 s d'écart sont identiques pour les 7. En mode normal, ça bouge bien.

Captures de ce lot : `persona-biblio/lot-8-captures/` (noms `<dossier>_<élément>-<largeur>[-variante].png`, plus `orbe-parle-*.png`, `flacon-*.png` et `accent-*.png`).

| élément | note | 25 000 € ? | médias utiles ? |
|---|---|---|---|
| fonds-hero/rayons-lumiere | **77** | Pas encore | Non : le shader suffit, une vidéo n'apporterait rien |
| fonds-hero/remotion-maille | **81** | Pas encore | Oui : pour un domaine viticole, une vraie vidéo de vigne sur schiste battrait le dégradé |
| fonds-hero/remotion-lignes | **84** | Pas encore (Oui après deux corrections de typo) | Non : le motif abstrait colle au métier, une vidéo d'atelier irait dans une autre section |
| elements-3d/carte-metal | **75** | Pas encore | Non : il faut corriger la 3D ; une photo de carte ferait « banque d'images » |
| elements-3d/orbe-voix | **68** | Non | Oui : un vrai extrait audio de 20 s, voix de synthèse, ferait tenir la promesse du bouton |
| elements-3d/voiles-verre | **79** | Pas encore | Non : le temps réel est l'intérêt ; un rendu figé n'a d'intérêt que comme affiche |
| elements-3d/flacon-verre | **85** | Oui, sous réserve (grammaire et mobile à corriger) | Non : la 3D fait le travail ; une photo produit irait à côté, pas à la place |

Barème : beauté et finition /40, utilité réelle /20, accessibilité, mouvement réduit et repli /20, fiche et prompt /20.

---

## 1. fonds-hero/rayons-lumiere : 77/100

Captures : `fonds-hero_rayons-lumiere-1440.png`, `-375.png`, `-1440-reduit.png`, `-1440-sans-webgl.png`, `-1440-pointeur*.png`.

**Ce que je vois.** Le rendu WebGL est beau : un éventail violet net, du grain contre les bandes, un halo bien dosé, et le titre lisible grâce au voile radial. À 375, le voile vertical fonctionne. Le déplacement de la source vers le pointeur est subtil, et c'est bien ainsi. En mouvement réduit on garde une image fixe, et le bouton devient « Relancer le fond ». Le repli CSS (sans WebGL) est nettement plus pauvre : un éventail sombre en « rideau plissé », sans halo.

**Œil du métier.** La démo est habillée pour un observatoire, mais un astronome déteste la lumière : des faisceaux de projecteur qui tombent du ciel, c'est la pollution lumineuse dont il se plaint. Le texte cite aussi une institution réelle (l'Observatoire de Haute-Provence, CNRS), et une démo ne doit pas emprunter un vrai nom. Ce fond convient à un spectacle, une salle de concert, un lancement ou un lieu de culte, pas à de l'astronomie.

| Beauté 32/40 | Utilité 13/20 | Accessibilité 16/20 | Fiche 16/20 |
|---|---|---|---|

**25 000 € ?** Pas encore : le shader est réussi, mais la démo vend le mauvais métier, le repli est terne et un attribut ARIA est cassé.

**Corrections gratuites, par priorité**
1. `rayons-lumiere.html` l. 45 : `aria-labelledby="titre"` pointe vers un id qui n'existe pas. Ajouter `id="titre"` au `<h1>` de la l. 49.
2. Ligne 48-49 : changer de métier dans la démo, par exemple « Salle Lumière · saison 2026-2027 / Trois soirs pour voir la lumière danser ». Retirer « Observatoire de Haute-Provence ». Dans la fiche, section « Quand l'utiliser », enlever « observatoire, planétarium » et garder spectacle, lancement, lieu de culte.
3. Repli l. 26-28 : ajouter le halo (`radial-gradient(40% 30% at 50% -5%, rgb(229 163 255 / .35), transparent)` avant le conique) et monter l'opacité des rayons de `.22` à `.32`. Aujourd'hui, le repli a l'air d'un autre produit.
4. Captures : `captures/rayons-lumiere-1440-reduit.png` et `-1440-sans-webgl.png` sont **le même fichier** (`cmp` identique). La capture « réduit » montre le repli, pas l'image figée du shader. La refaire.
5. Fiche : ajouter une ligne **Licence** explicite (« code original, libre d'usage dans le plugin ; aucune bibliothèque »), comme pour les autres éléments.
6. Bouton pause : ajouter `aria-pressed`, ou laisser seulement le libellé changeant (c'est déjà correct). C'est optionnel, à harmoniser avec `remotion-*`.

**Médias générés.** Non : le shader de 4 Ko fait mieux qu'une vidéo pour ce motif.

---

## 2. fonds-hero/remotion-maille : 81/100

Captures : `fonds-hero_remotion-maille-1440.png`, `-1440-t2.png`, `-375.png`, `-1440-reduit.png`, `accent-avant.png`, `accent-apres.png`, `accent-ls0.png`.

**Ce que je vois.** Le dégradé chaud respire lentement et la boucle ne saute pas. La vidéo ne se charge qu'après `load` : 73 Ko en WebM, c'est exemplaire. Le bouton pause n'apparaît que quand la vidéo joue. En mouvement réduit on a l'affiche seule, sans bouton. Le texte crème est bien lisible sur le voile.

**Défaut visible tout de suite.** Dans le titre, l'accent de « go**û**t » flotte au-dessus de la ligne, détaché du « u » (`accent-avant.png`). Ce n'est pas un problème d'encodage : le û est précomposé, j'ai vérifié en `xxd`. Le défaut ne disparaît ni en graisse 500 (`accent-apres.png`) ni avec un interlettrage à 0 (`accent-ls0.png`) : c'est le dessin de Cormorant Garamond servi par Google Fonts. Le même défaut apparaît sur « imprim**é**s » dans `remotion-lignes`. Sur le mot vedette d'un hero de vigneron, ça se voit en trois secondes.

**Œil du métier.** « Vins nature », « sans sulfites ajoutés », « vendanges en caissettes », « schiste » dans le Minervois : c'est juste. En revanche, le dégradé maillé reste générique : rien ne dit vigne, cave ou schiste. C'est un beau fond, mais il n'a rien en propre.

| Beauté 30/40 | Utilité 15/20 | Accessibilité 18/20 | Fiche 18/20 |
|---|---|---|---|

**25 000 € ?** Pas encore : un accent qui flotte sur le titre suffit à faire refuser la page par un vigneron.

**Corrections gratuites, par priorité**
1. l. 13 et 36 : remplacer Cormorant Garamond par une serif dont les accents sont propres, par exemple `EB Garamond` (500 et 400 italique) ou `Cormorant` (sans « Garamond »). Revérifier « goût », « été » et « crû » en capture.
2. l. 37 : `h1 em { font-weight: 300 }` demande une graisse qui n'est pas chargée (l. 13 ne charge que 500 et 600). Le navigateur se rabat sur 500. Soit charger 300, soit écrire 500.
3. l. 26 : le voile côté texte (`.6`) suffit à 1440. À 375, la tache sable passe sous le surtitre (`-375.png`) : monter `--voile-bas` à `.85` sous 767 px.
4. Fiche : ajouter dans « Quand l'utiliser » qu'en vigne ou en restauration, une vraie vidéo du lieu bat toujours ce fond, et que celui-ci sert faute de tournage.

**Médias générés.** Oui, nettement : une vidéo de 7 s en boucle, en 16:9 et en 9:16, montrant des rangs de vigne sur schiste en lumière rasante de fin de journée, caméra quasi fixe. Branchée tel quel dans ce lecteur.

---

## 3. fonds-hero/remotion-lignes : 84/100

Captures : `fonds-hero_remotion-lignes-1440.png`, `-375.png`, `-1440-reduit.png`, `-1440-t2.png`.

**Ce que je vois.** C'est l'élément le plus élégant du lot. La portée de lignes se soulève comme une feuille sous une loupe, le grain CSS donne du papier, et le voile crème garde le titre propre à 1440. Le bouton pause est sombre et bien contrasté, avec un focus rouille visible.

**Défauts.** On retrouve l'accent flottant de Cormorant Garamond sur « imprim**é**s », bien visible à 1440 et à 375. À 375, les lignes traversent le chapô (`-375.png`) : ça reste lisible, mais c'est chargé.

**Œil du métier.** Un imprimeur typographe écrit « 600 g/m² », jamais « 600 g » : c'est un grammage, pas un poids. « Presse Heidelberg de 1962 » et « composition à la main » sont justes, et le nom « Corps 12 » est bien trouvé.

| Beauté 34/40 | Utilité 15/20 | Accessibilité 17/20 | Fiche 18/20 |
|---|---|---|---|

**25 000 € ?** Pas encore, mais c'est tout proche : une fois la police changée et l'unité corrigée, je dis oui.

**Corrections gratuites, par priorité**
1. Police : même correction que pour la maille (l. 13, 41-42).
2. l. 58 : « papiers coton de 600 g » devient « papiers coton de 600 g/m² ».
3. l. 27 : sous 767 px, élargir le voile, par exemple `linear-gradient(90deg, var(--voile-cote) 0 70%, transparent)`, ou passer `--voile-cote` à `.96` pour calmer les lignes sous le chapô.
4. l. 53 et 56 : surtitre « Lyon 4e » en « Lyon 4ᵉ » (exposant), par cohérence typographique avec un métier de typographe.

**Médias générés.** Non pour ce fond. Une vraie photo ou vidéo de la presse irait dans la section suivante.

---

## 4. elements-3d/carte-metal : 75/100

Captures : `elements-3d_carte-metal-1440.png`, `-1440-pointeur.png`, `-375.png`, `-1440-reduit.png`, `-1440-sans-webgl.png`, `-375-sans-webgl.png`.

**Ce que je vois.** La carte flotte, se balance et suit le pointeur avec douceur, et l'ombre au sol respire. La mise en page est propre à 1440 comme à 375. En revanche, la face est floue : à 1440, « Lien » et les chiffres sont mous. Le métal ressemble à du plastique laqué violet, et le brossage est invisible alors que le chapô promet de « l'acier brossé ».

**Bug vérifiable.** La gravure (titulaire, numéro, date) est rendue dans une **Courier de secours**, pas en IBM Plex Mono : voir « CLAIRE MARCHAND » à empattements dans `-1440.png`. La cause est que `document.fonts.ready` (l. 80) ne force pas le chargement d'une police qu'aucun élément du DOM n'utilise encore. Plex Mono n'est chargée qu'après le dessin du canvas : après coup, `document.fonts` montre bien « IBM Plex Mono 500 loaded », trop tard.

**Œil du métier.** Un banquier remarquerait que le repli CSS dit « LIEN · DÉBIT / •••• 4821 C. MARCHAND » alors que la 3D dit « DÉBIT · PRO / CLAIRE MARCHAND / 09/29 » : ce sont deux cartes différentes. Il manque aussi le symbole sans contact, présent sur toute carte réelle, et il reste un emplacement vide pour le réseau. « Zéro frais cachés » est une promesse que le service juridique d'une banque fera retirer : à éviter dans une démo qu'on va recopier.

| Beauté 28/40 | Utilité 15/20 | Accessibilité 17/20 | Fiche 15/20 |
|---|---|---|---|

**25 000 € ?** Pas encore : une police de secours et une texture floue sur l'objet vedette, ça ne passe pas.

**Corrections gratuites, par priorité**
1. l. 80 : remplacer par `await Promise.all(["700 72px 'IBM Plex Sans'", "600 34px 'IBM Plex Sans'", "500 46px 'IBM Plex Mono'"].map((f) => document.fonts.load(f)));`.
2. l. 104 : texture en `T = 2048` (le poids reste négligeable), avec `tex.anisotropy = rendu.capabilities.getMaxAnisotropy()` (l. 119) pour une gravure nette.
3. l. 111 : rendre le brossage visible, avec des traits de 1 px à opacité 0 à 0,10 et des alternances clair/sombre, pas seulement du blanc à 4 %. Ou passer `roughness` à .22 et `metalness` à .9 (l. 123) pour un vrai reflet métal. Baisser `iridescence` à .3 : à .6, ça vire au violet bonbon.
4. l. 59 : aligner le repli sur la 3D, soit « DÉBIT · PRO », « •••• 4821 », « CLAIRE MARCHAND », « 09/29 ».
5. Gravure : ajouter le pictogramme sans contact (quatre arcs) à droite de la puce.
6. l. 54 : « zéro frais cachés » devient « des frais affichés, rien d'autre » ou « 9 € par mois, tout compris ».
7. Fiche : ajouter une section **Licence** (Three.js MIT avec lien, `RoomEnvironment` MIT, code original), sur le modèle de `flacon-verre.md`.

**Médias générés.** Non : il faut corriger le rendu 3D. Une photo de carte ferait banque d'images.

---

## 5. elements-3d/orbe-voix : 68/100

Captures : `elements-3d_orbe-voix-1440.png`, `-375.png`, `-1440-tab1.png`, `orbe-parle-1.png`, `orbe-parle-2.png`, `orbe-parle-reduit.png`, `-1440-sans-webgl.png`.

**Ce que je vois.** Une boule rouge-orangé marbrée de sombre sur fond bleu vif. Elle évoque Mars ou une tomate plutôt qu'une voix. Les veines claires (`--orbe-c`) sont presque absentes, et la silhouette est bosselée comme une planète. Quand on clique sur « Écouter un appel type », l'anneau blanc apparaît, la surface ondule et les répliques défilent (`orbe-parle-1.png`). Ça fonctionne techniquement, et c'est fidèle en mouvement réduit (anneau et répliques présents).

**Le vrai problème, côté acheteur.** Le bouton dit « **Écouter** » et **aucun son** ne sort : j'ai vérifié, il n'y a aucun `<audio>` dans la page. Le patron d'artisan à qui l'on vend un standard vocal clique pour entendre la voix de Margot, et n'entend rien. C'est la pire promesse non tenue possible sur ce produit.

**Accessibilité.** Le `role="status"` change de texte toutes les 3,5 s **sans fin** (`setInterval`, l. 82) : un lecteur d'écran est noyé d'annonces tant qu'on ne raccroche pas. Le bouton change à la fois de libellé (« Arrêter l'appel ») et d'`aria-pressed` : c'est redondant, il faut garder l'un ou l'autre.

| Beauté 26/40 | Utilité 12/20 | Accessibilité 15/20 | Fiche 15/20 |
|---|---|---|---|

**25 000 € ?** Non : l'objet ne fait pas « voix » et le bouton promet un son qui n'existe pas.

**Corrections gratuites, par priorité**
1. l. 60 et 80 : renommer en « Voir un appel type » / « Arrêter », ou brancher un vrai audio (voir médias). Ne jamais écrire « Écouter » sans son.
2. l. 82 : arrêter le défilement après la dernière réplique (`if (iPhrase === phrases.length) { clearInterval(minuteur); … }`) et finir sur « Appel terminé : résumé envoyé par SMS à Julien. ». Trois annonces, pas une infinité.
3. Couleurs l. 17-19 : relever les veines. Dans le shader l. 120, passer `smoothstep(.55,.75,m)*.75` à `smoothstep(.45,.7,m)*.9`, et éclaircir `--orbe-b` vers `#d4502a` pour sortir du rouge sang.
4. l. 111 : réduire le relief au repos de `d * .07` à `d * .035`. La sphère doit rester lisse au repos et ne se déformer que quand elle « parle ».
5. l. 79 : garder `aria-pressed` et un libellé fixe (« Appel type »), ou garder le libellé changeant sans `aria-pressed`.
6. Fiche : ajouter une section **Licence** (Three.js MIT, shader original).

**Médias générés.** Oui, nettement : un extrait audio de 20 s environ (MP3/Opus, mono), voix française de synthèse, qui joue les trois répliques. `voix` serait alors piloté par un `AnalyserNode`, comme le prévoit déjà la fiche.

---

## 6. elements-3d/voiles-verre : 79/100

Captures : `elements-3d_voiles-verre-1440.png`, `-1440-t2.png`, `-375.png`, `-1440-reduit.png`, `-1440-sans-webgl.png`, `-375-sans-webgl.png`.

**Ce que je vois.** Trois rubans qui se tordent dans la colonne de droite à 1440, et en bande sous le texte à 375 : le placement calculé sur le texte réel marche bien, sans aucun chevauchement. C'est spectaculaire et soigné. Le repli CSS (bandes floues inclinées) est presque plus « verre » que la 3D. Cependant, en 3D, les rubans lisent comme du **satin opaque** avec un reflet blanc. La réfraction du fond, qui est la promesse de l'élément, se voit à peine. Les taches de couleur du fond (rouge en bas à gauche, turquoise en haut) font des lueurs isolées sans rapport avec les rubans.

**Œil du métier.** « Exposition collective de huit verriers » : un verrier attend de la transparence. Ici, le verre ne laisse pas voir à travers, ce qui contredit le titre « Ce qui passe à travers nous ».

| Beauté 33/40 | Utilité 13/20 | Accessibilité 17/20 | Fiche 16/20 |
|---|---|---|---|

**25 000 € ?** Pas encore : c'est beau, mais ça n'a pas encore l'air de verre.

**Corrections gratuites, par priorité**
1. l. 108-109 : pour un verre plus clair, `transmission: 1`, `roughness: .06`, `attenuationDistance: 1.6` (au lieu de .45, qui sature la teinte) et `emissiveIntensity: 0`.
2. l. 98-101 : remplacer les quatre taches du fond par des **bandes ou un quadrillage** fin. La réfraction ne se voit que sur un motif net, comme les rayures du flacon.
3. Fiche : « 16 × 1,5 » devient « 16 × 1,05 » (le code l. 127 dit `1.05`).
4. Fiche : ajouter une section **Licence** (Three.js MIT, `RoomEnvironment` MIT).
5. l. 175 : relancer `taille()` après `document.fonts.ready`, car le calcul de la zone libre mesure le texte avant le chargement de Syne.

**Médias générés.** Non : l'intérêt est le temps réel. Un rendu figé haute définition (16:9, PNG) peut servir d'affiche, rien de plus.

---

## 7. elements-3d/flacon-verre : 85/100

Captures : `elements-3d_flacon-verre-1440.png`, `flacon-menthe.png`, `flacon-sureau-plein.png`, `flacon-abricot-bas.png`, `flacon-clavier.png`, `-375.png`, `flacon-375-bas.png`, `-1440-reduit.png`, `-1440-sans-webgl.png`.

**Ce que je vois.** C'est le meilleur du lot. Le verre est crédible : rayures du fond réfractées, liseré de Fresnel, bouchon de liège. Changer de parfum recolore le sirop instantanément (cassis, menthe, abricot, sureau, tous justes), le ménisque ondule, et le curseur de niveau fonctionne de 15 % à 100 %. Les radios natives se pilotent aux flèches. Le repli CSS est honnête et garde la même couleur et le même niveau.

**Défauts vérifiés.**
- La page annonce « rempli à 15 % de sirop **de abricot** » (`aria-label`, l. 122). Il faut écrire « d'abricot ». Une faute de français lue par le lecteur d'écran sur une fiche produit, c'est une erreur de métier.
- À 375, le flacon est **sous** les commandes (`-375.png`) : on choisit « Menthe » sans voir le flacon changer, ce qui annule le principe de l'élément (« un sirop qu'on voit avant de le goûter »).
- À 375, une **couture verticale** est visible au milieu du liquide et du col (`flacon-375-bas.png`) : c'est le raccord de la `LatheGeometry`.
- Titre « qu'on » écrit avec une apostrophe droite `'` (l. 91) : il faut l'apostrophe typographique `’`.
- Le bouton Pause se trouve à l'intérieur d'un `role="img"` (l. 109-111). Chrome l'expose bien, mais selon ARIA les enfants d'une image sont présentationnels : VoiceOver peut le masquer.

**Œil du métier.** Un sirotier ne vend pas un flacon à moitié vide. Le curseur « Niveau dans le flacon » n'a pas de sens commercial à côté d'un prix fixe de 12,50 € pour 50 cl. Il vaut mieux le présenter comme un réglage de démo, ou le remplacer par un choix de contenance (25 cl / 50 cl / 1 L) qui change le niveau et le prix.

| Beauté 34/40 | Utilité 17/20 | Accessibilité 15/20 | Fiche 19/20 |
|---|---|---|---|

**25 000 € ?** Oui, une fois corrigés « de abricot » et l'ordre sur mobile : c'est un vrai argument de vente pour une fiche produit.

**Corrections gratuites, par priorité**
1. l. 121-122 : élision. Utiliser `const de = /^[aeiouyéèh]/i.test(parfum) ? "d’" : "de ";`, puis `…de sirop ${de}${parfum}`.
2. l. 69 : sous 860 px, mettre le flacon en premier (`.flacon { order: -1 }` avec une hauteur bornée `max-height: 55svh`), ou rendre la boîte `position: sticky; top: 0` au-dessus des commandes.
3. l. 180 et 258 : supprimer la couture, soit avec `LatheGeometry(profil, 128, 0, Math.PI * 2)` puis `mergeVertices` et `computeVertexNormals()`, soit en faisant démarrer la révolution face caméra masquée (`phiStart = Math.PI`).
4. l. 91 : `qu'on` devient `qu’on`.
5. l. 109-111 : sortir le bouton Pause du `role="img"`. Envelopper la boîte dans un `<div class="flacon-cadre">` qui porte le bouton, et garder `role="img"` sur la scène seule.
6. l. 102-106 : remplacer le curseur de niveau par des contenances (25 / 50 / 100 cl, avec 6,90 / 12,50 / 21 €). Ou garder le curseur dans la fiche comme réglage de démonstration seulement.
7. l. 138 : écouter `change` sur `matchMedia` pour basculer en direct, comme le font les autres éléments.

**Médias générés.** Non : la 3D est l'argument. Une vraie photo du flacon irait dans la galerie produit, pas à la place.

---

## Ce qui revient dans tout le lot (corrections transversales gratuites)

1. **Police des canvas** : toute texture dessinée en 2D doit attendre `document.fonts.load(...)` pour chaque police utilisée. C'est le bug de `carte-metal`, et le même risque existe partout où l'on dessine du texte en canvas.
2. **Cormorant Garamond** (Google Fonts) : les accents sont mal posés en grande taille. À bannir des titres, ou à vérifier mot accentué par mot accentué en capture.
3. **Sections Licence** : présentes et exemplaires dans `flacon-verre.md`, `remotion-maille.md` et `remotion-lignes.md`, absentes de `carte-metal.md`, `orbe-voix.md`, `voiles-verre.md` et `rayons-lumiere.md`. Copier le modèle du flacon.
4. **Noms réels** dans les démos (Observatoire de Haute-Provence) : à remplacer par des noms fictifs.
