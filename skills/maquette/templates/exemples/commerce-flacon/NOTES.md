# Ciste — exemple « produit centré » (commerce, parfumerie artisanale)

Parfumerie artisanale fictive à Grasse : cinq eaux de parfum composées par Mireille Aubanel, un coffret découverte de cinq échantillons à 22 € (déduits du premier flacon), un atelier « Composer son parfum » le samedi sur réservation. Page d'accueil : `index.html` + `ciste.css` (écrit à la main) + `gestes.js` (copie figée du kit) + trois scripts propres. **Tous les visuels du produit sont rendus dans Blender (Cycles)** : le vrai flacon du skill `objets-3d` (verre épais, jus coloré, étiquette papier, bague moletée en laiton, bouchon galet en céramique verte).

Exemple fictif — Lance ton site. Ciste, Mireille Aubanel, l'adresse rue des Distillateurs, les prix, les séances, les avis et les chiffres (1 312 avis, 300 flacons par série) sont inventés. Le panier, la réservation et la lettre n'envoient rien. Cadre du client et de l'acheteur : `brief.md`.

Composition suivie : **2. Produit centré (façon Apple)** (`commun/compositions.md`). Le flacon occupe l'écran d'arrivée, tourne au défilement pour présenter trois parfums (le jus change de couleur, l'étiquette de nom), puis une seconde scène le sépare en trois godets : notes de tête, de cœur et de fond. Les deux scènes sont des séquences d'images rendues dans Blender, pas de la 3D en direct. Le reste de la page vend : gros plans, catalogue, coffret, atelier.

## Structure du dossier

```
index.html            12 sections (GSAP 3.15 + ScrollTrigger + SplitText, Lenis 1.3.27 ; aucun WebGL)
ciste.css             feuille écrite à la main : tokens, mode 3D (.scene-3d) et mode fixe, sections, panier
gestes.js             copie figée de templates/prototype/gestes.js
donnees.js            window.CISTE : parfums (notes, couleur du liquide, prix), coffret, atelier, séances, matières, articles
scene.js              les deux scènes : séquences Blender sur canvas[data-sequence], 2 épinglages, fondu entre images
boutique.js           carrousel, catalogue, panier (vignette qui vole, compteur, aria-live), réservation, lettre, menu
images/               rendus Blender (webp) + orgue rendu en code + 3 photos reprises d'autres exemples
images/sequences/     parfums/f-0001…0073.webp (scène A), notes/f-0001…0044.webp (scène B)
images/studio/        PNG Blender des photos produit (ignorés par git, sources des -1080 / -400)
outils/blender/       studio.py (photo d'un parfum), sequences.py (scènes A et B, éclaté, gros plans),
                      objets.py (coffret, fioles), etiquettes.cjs (étiquettes et couvercle en PNG, vraies polices),
                      declinaisons.sh (PNG → -1080 / -400), sequence.sh du skill pour les séquences
outils/flacon3d.js    ancien module three.js, gardé pour l'orgue (outils/rendu.html + rendre.cjs) et comme modèle de 3D en direct
outils/verifier.cjs   vérification 1440/768/375/360, captures, mouvement réduit, sans WebGL, densité, pas des séquences
outils/parcours.cjs   ajout au panier, panier, réservation (erreurs puis merci)
captures/             captures de chaque passage
medias-a-generer.md   5 photos à remplacer (prompts, ratios)
brief.md              le client, l'offre, l'acheteur, ses objections
prompt-vitrine.json   le prompt « refaire ce site » pour la vitrine
```

## 1. Direction artistique

- **Le flacon est le héros, tout le reste se tait.** Fond minéral « calcaire » `#e3e5df` (pierre de Grasse, ni crème ni blanc), sur lequel le verre et la couleur des jus ressortent. Seules touches vives : les cinq liquides.
- **Palette** : calcaire `#e3e5df` (sections des scènes en `#d9d9d6`, le haut du cyclo Blender `#e3e5df` après AgX : séquences, photos et section se confondent), calcaire clair `#eef0eb` (catalogue, avis), encre vert-noir `#1d2420`, texte doux `#4b5650`, vert ciste `#2c3a31` (coffret, pied), labdanum `#8a3413` (actions, rouille de la résine). Contrastes : encre/calcaire 12,5:1, doux/calcaire 6,0:1, blanc/labdanum 8,1:1, clair/ciste 10:1, labdanum/calcaire 6,4:1.
- **Typographie** : Bodoni Moda (titres, noms de parfums en italique, étiquette du flacon dessinée sur un canvas avec la même police), Schibsted Grotesk (texte, boutons). Ni Inter ni Fraunces.
- **Liquides** : Restanque olive `#a9a23f`, Mistral citron `#e6c34a`, Centifolia rose `#d9707f`, Nuitée ambre `#d27a2c`, Garrigue brun ambré `#7e3f12`.

## 2. Sections et gestes

| # | Section | Contenu | Gestes |
|---|---|---|---|
| 1 | `#flacon` | titre, flacon 3D, chapeau, coffret 22 €, puis Mistral, Centifolia, Nuitée | **scène A épinglée** (2 écrans, 1,5 sur téléphone) : rotation complète par parfum, couleur du liquide interpolée, nom de l'étiquette changé à mi-tour ; pause |
| 2 | `#preuves` | 3 chiffres, bande des 8 matières (fioles rendues) | compteurs, **carrousel en fondu** avec pause |
| 3 | `#notes` | Garrigue décomposé : tête (genièvre, thym), cœur (lavande, immortelle), fond (ciste labdanum, encens) | **scène B épinglée** (1,5 écran, 1,2) : le capot (verre + bouchon) s'envole, trois couches de liquide s'écartent avec des gouttes, étiquettes HTML accrochées au bord de chaque couche ; tout se referme ; prix + ajout |
| 4 | `#details` | bouchon, fond de verre, étiquette (gros plans rendus) | apparition en cascade, zoom au survol |
| 5 | `#parfums` | catalogue des 5 (données JS), 50/100 ml, prix qui change | **ajout au panier** : vignette qui vole jusqu'au panier, compteur qui rebondit, toast, `aria-live` |
| 6 | `#coffret` | fond sombre, coffret rendu, 3 étapes, ajout | **titre-dégradé** sur « choisir » (couleurs des jus), changement de fond |
| 7 | `#atelier` | photo, carte en verre, texte, réservation en deux colonnes (séances avec places restantes) | parallaxe, **verre-liquide**, validation accessible |
| 8 | `#maison` | portrait, Mireille, niche | révélations |
| 9 | `#avis` | 3 avis avec le flacon choisi | cascade |
| 10 | `#journal` | 3 articles (données JS) | zoom au survol |
| 11 | `#questions` | 4 questions | accordéon |
| 12 | `#final` | « Commencez par les sentir, chez vous. » + coffret | bouton magnétique |

Barre d'achat fixe sur téléphone (cachée sur le coffret, l'appel final et le pied). Panier en `<dialog>` (Échap, focus gardé, Lenis arrêté).

## 3. Le moment signature (séquences Blender)

- **Le flacon** : celui de `skills/objets-3d/scripts/exemple.py` (fonction `construire()`), dans le même studio
  (`studio()`, `appareil_face()`) que les photos du catalogue. Rien n'est refait en code : la page montre des images.
- **Scène A** (`sequences.py -- parfums`) : 73 images 720 × 900, trois tours de 24 images à vitesse constante
  (15° par image). Restanque → Mistral → Centifolia → Nuitée : le jus passe d'une teinte à l'autre entre 90° et 270°
  (`animer_jus`), l'étiquette change de nom au dos, à 180° (`etiquettes_successives`). Images 1, 25, 49 et 73 de face.
  La page accélère et ralentit chaque tour (même calendrier qu'avant : tours centrés à 0,2 / 0,465 / 0,715 du pin)
  et fait glisser l'image à droite ou à gauche pour le texte.
- **Scène B** (`sequences.py -- notes`) : 44 images. L'étiquette s'efface (`fondu`), le flacon entier laisse la place
  (image 6, `visible`) à ses morceaux, modélisés pour l'éclaté : capot (épaule, col, bague, bouchon) et trois godets
  de verre épais à lèvre arrondie, chacun avec son jus (fond brun `#4a2108`, cœur ambré `#8e4a16`, tête ambre clair
  `#c48a3a`) ; ils s'écartent (cœur à gauche, tête à droite), l'appareil recule et monte (`travelling`). La page joue
  la séquence à l'aller puis au retour : le flacon se referme et finit de face, étiquette lisible.
  Simplifié par rapport à la version three.js : plus de gouttes qui tournent autour des couches.
- **Lecture** (`scene.js`) : un canvas par scène, `data-sequence` + `data-frames` (convention du kit), plus
  `data-sequence-pilotee` : gestes.js les prépare sans les épingler, scene.js les joue. Première image tout de suite (préchargée, et affiche CSS en
  attendant), les autres par lots de 6 quand la scène approche. Fondu entre deux images voisines : la rotation reste
  continue en défilant lentement. Image dessinée « contain » au cadrage de la scène, bords fondus (ellipse) dans le
  fond de la section, `#d9d9d6` = le haut du cyclo après AgX.
- **Notes** (scène B) : ordinateur, accrochées au bord de chaque godet sur la dernière image (positions en fractions
  de l'image, `ANCRES` dans scene.js, à remesurer si la séquence change) ; téléphone, en liste sous les godets.
- **Mouvement réduit** (ou GSAP absent) : pas d'épinglage ; le hero montre la photo Restanque, les trois parfums en
  fiches, l'éclaté en image fixe (`eclate-garrigue.webp`, dernière image de la scène B) avec la liste des notes.
  Plus aucun WebGL : la page est la même sans carte graphique.
- **Calendrier** : tours en sinus sur ±0,1 du pin (au plus ≈ 2 images par 1 % de défilement), éclat de B en sinus
  aussi. Pendant le défilement, fondu entre images voisines ; à l'arrêt (160 ms), glissement vers l'image entière.
- **Poids** : scène A 1,6 Mo (73 WebP q90), scène B 1,0 Mo (44 WebP q90), 720 × 900. Sous la cible de 3 à 4 Mo :
  le fond uni se compresse bien ; on peut monter en 960 px si l'écran le demande.
- **Plus de bouton pause** : rien ne bouge seul, tout suit le défilement.
- **Clavier** : le bouton d'ajout en fin de scène B reste dans l'ordre de tabulation ; au focus, le défilement va à la
  dernière image.

## 4. Textes

Densité (§ 11 des conventions, `outils/verifier.cjs`) : voir § 5. Titres de 4 à 10 mots, aucun ne coupe sur un trait d'union. Blocs de 3 phrases au plus. Pas de surtitre en capitales au-dessus du h1.

## 5. Vérification (5 novembre 2026, séquences Blender)

Chrome (Playwright), `outils/verifier.cjs` sur un serveur à file large (port 4330, même dossier ; le `http.server` par
défaut coupe des connexions quand la page charge ses images en rafale, `ERR_CONNECTION_RESET`) :

- 1440, 768, 375, 360 : 0 débordement, 0 erreur console, 0 réponse HTTP en erreur, 12 sections, titres coupés : aucun ;
  712 mots à 1440, 704 aux autres largeurs.
- Séquences, balayées par pas de 1 % du pin : scène A, 73 images, au plus 1,9 à 2,0 images par pas ; scène B, 44 images,
  au plus 1,9. À l'arrêt, l'image se cale sur une image entière : aucun dédoublement d'étiquette.
- Un seul épinglage par scène (gestes.js épinglait aussi chaque `canvas[data-sequence]` : `data-sequence-pilotee`).
- Mouvement réduit : captures identiques à 1,2 s, 0 épinglage, 0 erreur ; hero = `parfums/f-0001.webp`, éclaté fixe.
- Sans WebGL : rien ne change (la page n'en utilise plus), 0 erreur.
- Captures : `captures/{largeur}-scene-flacon-{1..6}.png`, `{largeur}-scene-notes-{1..6}.png`, une par section,
  `reduit-*`, `sans-webgl-*`, `vitrine-1440.webp`, `controle-dos-etiquette.webp` (dos de l'étiquette avant / après).

Corrigé au passage : `.fiche` en `position: relative` (la `legend.sr-only` des contenances sortait de la fiche quand
l'animation d'apparition retirait son `transform` : 597 px de débordement par intermittence à 768).

## 6. Images et crédits

- **Rendues dans Blender** (Cycles, même flacon et même studio que `skills/objets-3d/scripts/exemple.py`) :
  - `flacon-{parfum}-1080|-400.webp` : photos produit des cinq parfums (`studio.py`, `declinaisons.sh`) ;
  - `sequences/parfums/f-0001…0073.webp` et `sequences/notes/f-0001…0044.webp` (720×900) : scènes A et B ; l'affiche du hero est `parfums/f-0001.webp` ;
  - `eclate-garrigue.webp` (720×900, dernière image de la scène B) et `eclate-garrigue-960.webp` (960×720, journal) ;
  - `gros-bouchon|verre|etiquette.webp` (720²), `coffret.webp` (1080×720), `fiole-{matière}.webp` (480×600).
  - Fioles et coffret : liquide aux normales remises vers l'extérieur (`normales_dehors`) ; le flacon des photos et
    des séquences garde les siennes (rendus validés, voir § 9).
- **Orgue à parfums** (`orgue-1344|960`) : seule image encore rendue en code (`construireOrgue` dans `outils/flacon3d.js`, `outils/rendre.cjs`) : 78 flacons de matières, gradins de chêne veiné, balance, mouillettes ; à refaire dans Blender si l'exemple sert de vitrine à l'orgue. Il remplace la photo d'atelier reprise de `b2c-petille`, qui montrait des vaporisateurs (« une savonnerie », persona tour 1).
- **Reprises d'autres exemples, provisoires** (à remplacer, `medias-a-generer.md`) : `portrait-1000`, `niche-700`, `lumiere-700` (générées FLUX.2 Pro, via `liberal-calade`). Le portrait sert ici de « Mireille » : un vrai client fournit le sien. L'article de la rose montre la fiole rendue en attendant une photo de récolte.

## 7. Tour 1 de la boucle persona (79/100) : corrections faites

FIX-1 retour 30 jours retiré (remplacé par la livraison offerte dès 80 €) · FIX-2 places plafonnées à ce qui reste, aide « Il reste N places », montant dans la confirmation · FIX-3 séances toutes le samedi · FIX-4 bouton « Ajouter » sur une ligne (`aria-label` complet) · FIX-5 capot en fondu · FIX-6 notes en liste sur téléphone, couches recentrées · FIX-7 ligne de livraison et note sur le code du coffret dans le panier · FIX-8 labdanum en note de fond, Garrigue brun ambré · FIX-9 titre des preuves · FIX-10 portrait sur toute la hauteur et niche sous le texte ; « ce que vous emportez » sous le texte de l'atelier · FIX-11 gros plan du fond de verre refait · FIX-12 police des boutons, bouton de fin de scène au clavier, cartes du journal sans faux lien, Instagram dans « Suivre », pause du hero écartée des liens à 768 · FIX-13 (gratuit) orgue à parfums rendu en code.

## 8. Tour 2 de la boucle persona (88/100) : corrections faites

1. **Formulaires envoyés qui restaient à l'écran.** `ciste.css` contient maintenant `[hidden] { display: none !important; }`. Sans cette règle, `display: grid` sur `[data-form-champs]` et `display: flex` sur `.lettre-ligne` l'emportaient sur `hidden`. `boutique.js` ajoute un garde-fou : `form.dataset.envoye` bloque un second envoi. Vérifié par `outils/parcours.cjs` à 1440 et à 375 : après l'envoi, les champs et le bouton ne sont plus visibles ; un second `requestSubmit()` ne change rien ; pour la lettre, la ligne est cachée et le merci s'affiche.
2. **Couleurs des fioles** (`donnees.js`) :
   - rose `#9c4322` (orange rouge ; `#b5532a` sortait trop vif au rendu) ;
   - jasmin `#c27a2a` (ambre orangé) ;
   - iris `#e2d5b4` (beige crème) ;
   - figuier `#55602c` (vert olive sombre).
   Les teintes de fond ont été ajustées. L'alt de la rose dit maintenant « absolue de rose centifolia, orangée ». Toutes les images ont été refaites avec `outils/rendre.cjs` (26 fichiers).
3. **Cylindre cuivré seul au début et à la fin de la scène B.**
   - `flacon3d.js` : `plein` (le liquide d'un seul bloc) ne s'affiche que si le capot est entièrement opaque. Dans tous les autres cas, ce sont les godets de verre qui s'affichent.
   - `scene.js` : nouveau calendrier. Les couches commencent à s'écarter dans le flacon (`eclate` 0,10 → 0,34) avant que le capot ne s'envole (`leve` 0,15 → 0,26). En fin de scène, le capot revient (0,72 → 0,84) avant que les couches ne se referment (0,64 → 0,88).
   - Vérifié image par image, entre 0,17 et 0,85 du pin, à 1440 et à 375 : on ne voit plus de bloc de liquide seul.
4. **« N° 127 / 300 » sur l'étiquette.** Il est écrit en Bodoni italique, à l'encre foncée, légèrement de biais, sous GRASSE. Les lignes du bas de l'étiquette ont été remontées pour lui faire place. Le cadrage de `gros-etiquette` a changé (refY 1.37, refH 1.62) pour que le numéro ne soit plus coupé. L'image a été refaite, ainsi que les flacons et le coffret.
5. **Finitions.**
   - `.champ` a `align-content: start`.
   - Espaces insécables : `euros()` (« 95 € »), « 2 ml », « 50 ml », « ${contenance} ml », « fictif : », « 10 h : » dans le merci, « 2 places » dans l'aide, « personnes : ».
   - Groupes : on peut réserver jusqu'à 6 places, la taille de l'atelier (`D.atelier.places`), dans la limite des places restantes. Le select par défaut va de 1 à 6. L'aide indique « Jusqu'à 6 personnes : l'atelier entier ». Quand il reste moins de 6 places, elle ajoute « Un groupe plus grand ? Écrivez-nous, on ouvre une séance pour vous. »
   - Vérifié : la séance à 6 places propose 6 options.

Vérification sur :4339 :
- 1440, 768, 375 et 360 : aucun débordement, aucune erreur console ; 716 et 708 mots.
- Mouvement réduit : aucun pin, et l'image reste fixe.
- Sans WebGL : aucune erreur, 791 mots.
- Parcours panier et réservation : bons à 1440 et à 375.

## 9. Limites connues

- Scène A : l'étiquette du dos se lit en miroir à travers le jus clair (Mistral, Restanque) quand le flacon est de dos. C'est le vrai comportement du verre ; un vrai flacon fait pareil.
- **Normales du liquide du flacon** : `tourner()` sort le liquide d'`exemple.py` avec ses normales vers l'intérieur ;
  Cycles en fait une lentille divergente. Flacon de dos, on voit le dos de l'étiquette en petit, non teinté, au centre
  (corrigé en apparence par `lumiere_dos` : papier crème plein, `captures/controle-dos-etiquette.webp`). Le corriger
  pour de bon (`normales_dehors`) éclaircit le jus et agrandit le dos de l'étiquette sur toute la largeur : il faudra
  re-rendre photos et séquences, et revoir la densité des jus.
- Les séquences sont des images : changer un jus, une étiquette ou le cadrage veut dire re-rendre (≈ 1 h 30 pour les deux scènes sur un M1 Pro, en tâche de fond), puis remesurer `ANCRES` dans scene.js.
- Les photos reprises ne sont pas de Grasse (la niche et le portrait passent). L'orgue rendu est propre mais reste une image de synthèse : la vraie photo du labo du client vaut mieux.
- À fournir par le client : prix de la livraison sous 80 €, conditions de retour (aucun retour n'est promis sur la page), source des 1 312 avis, vraies séances.
- Le titre en dégradé (« choisir ») est l'élément `titre-degrade` de la bibliothèque, gardé volontairement sur un seul mot ; un linter de design le signale comme « gradient text ».
- Les § 7 et 8 décrivent la version three.js d'avant (godets en code, `flacon3d.js` dans la page) : les corrections de textes, de formulaires et de couleurs restent ; celles de la scène 3D ne s'appliquent plus.

## Rendus Blender (05/11/2026)

Le flacon three.js (bouchon à 12 facettes, `modeles/flacon.glb`, `outils/blender/flacon.py`) est retiré. La page ne
charge plus three.js : elle lit des images rendues dans Blender 5.2 (Cycles, GPU Metal).

Pour tout refaire, depuis ce dossier (Blender en `-b --factory-startup`, hors bac à sable ; sorties dans un dossier
temporaire, PNG jamais versionnés) :

```
B="/Applications/Blender.app/Contents/MacOS/Blender -b --factory-startup --python"
node outils/blender/etiquettes.cjs                         # étiquettes + couvercle (PNG, vraies polices)
$B outils/blender/sequences.py -- parfums  $T/parfums 720 64   # 73 images, ≈ 35 s chacune
$B outils/blender/sequences.py -- notes    $T/notes   720 64   # 44 images
$B outils/blender/sequences.py -- eclate   $T/eclate.png 960 96
$B outils/blender/sequences.py -- gros-plans $T/gros  720 96
$B outils/blender/objets.py    -- fioles   $T/fioles  480 96
$B outils/blender/objets.py    -- coffret  $T/coffret.png 1080 128
for f in $T/parfums/f-*.png; do cwebp -q 90 -m 6 -sharp_yuv "$f" -o images/sequences/parfums/$(basename "$f" .png).webp; done
# (idem notes ; sequence.sh du skill fait la même chose et ajoute MP4/WebM/affiche, inutiles ici)
```

Une séquence coupée se relance telle quelle : les images déjà là ne sont pas refaites. Tailles : 720 à 960 px pour les
séquences, 1080 px au plus pour les images du site, jamais de 4K.
