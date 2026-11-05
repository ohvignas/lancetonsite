# Ciste — exemple « produit centré » (commerce, parfumerie artisanale)

Parfumerie artisanale fictive à Grasse : cinq eaux de parfum composées par Mireille Aubanel, un coffret découverte de cinq échantillons à 22 € (déduits du premier flacon), un atelier « Composer son parfum » le samedi sur réservation. Page d'accueil : `index.html` + `ciste.css` (écrit à la main) + `gestes.js` (copie figée du kit) + trois scripts propres.

Exemple fictif — Lance ton site. Ciste, Mireille Aubanel, l'adresse rue des Distillateurs, les prix, les séances, les avis et les chiffres (1 312 avis, 300 flacons par série) sont inventés. Le panier, la réservation et la lettre n'envoient rien. Cadre du client et de l'acheteur : `brief.md`.

Composition suivie : **2. Produit centré (façon Apple)** (`commun/compositions.md`). Le flacon occupe l'écran d'arrivée, tourne au défilement pour présenter trois parfums (le liquide change de couleur), puis une seconde scène le décompose en notes de tête, de cœur et de fond. Le reste de la page vend : gros plans, catalogue, coffret, atelier.

## Structure du dossier

```
index.html            12 sections (GSAP 3.15 + ScrollTrigger + SplitText, Lenis 1.3.27, three 0.170.0 en importmap)
ciste.css             feuille écrite à la main : tokens, mode 3D (.scene-3d) et mode fixe, sections, panier
gestes.js             copie figée de templates/prototype/gestes.js
donnees.js            window.CISTE : parfums (notes, couleur du liquide, prix), coffret, atelier, séances, matières, articles
flacon3d.js           module three.js : flacon (LatheGeometry), verre MeshPhysicalMaterial, liquide, couches, étiquette, coffret, fioles
scene.js              les deux scènes pilotées au défilement (gsap.matchMedia, 2 épinglages, rendu à la demande)
boutique.js           carrousel, catalogue, panier (vignette qui vole, compteur, aria-live), réservation, lettre, menu
images/               rendus du flacon depuis la même scène (webp) + 5 photos reprises d'autres exemples
outils/rendu.html     atelier de rendu des vues fixes (même module flacon3d.js)
outils/rendre.cjs     Playwright → canvas → cwebp : flacons, éclaté, gros plans, coffret, fioles
outils/verifier.cjs   vérification 1440/768/375/360, captures, mouvement réduit, sans WebGL, densité
outils/parcours.cjs   ajout au panier, panier, réservation (erreurs puis merci)
captures/             captures de chaque passage
medias-a-generer.md   5 photos à remplacer (prompts, ratios)
brief.md              le client, l'offre, l'acheteur, ses objections
prompt-vitrine.json   le prompt « refaire ce site » pour la vitrine
```

## 1. Direction artistique

- **Le flacon est le héros, tout le reste se tait.** Fond minéral « calcaire » `#e3e5df` (pierre de Grasse, ni crème ni blanc), sur lequel le verre et la couleur des jus ressortent. Seules touches vives : les cinq liquides.
- **Palette** : calcaire `#e3e5df` (sections des scènes en `#f2f3ee`, la couleur que rend three.js après tone mapping : canvas, rendus fixes et section se confondent), calcaire clair `#eef0eb` (catalogue, avis), encre vert-noir `#1d2420`, texte doux `#4b5650`, vert ciste `#2c3a31` (coffret, pied), labdanum `#8a3413` (actions, rouille de la résine). Contrastes : encre/calcaire 12,5:1, doux/calcaire 6,0:1, blanc/labdanum 8,1:1, clair/ciste 10:1, labdanum/calcaire 6,4:1.
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

## 3. Le moment signature (three.js)

- **Flacon** : `LatheGeometry` (profil d'épaule arrondie, fond épais de 7 mm), `MeshPhysicalMaterial` transmission 1, épaisseur 0,9, IOR 1,5, rugosité 0,035, clearcoat ; `RoomEnvironment` + PMREM ; tone mapping neutre. Col laiton, bouchon céramique verte, étiquette en `CanvasTexture` (Bodoni Moda) sur une bande de cylindre ouverte, `transparent: true` pour rester hors de la passe de réfraction (sinon dédoublée sur les bords du verre).
- **Liquide** : opaque (seuls les objets opaques sont vus à travers la transmission de three r170), un seul volume au repos. Décomposé, chaque note devient une tranche du flacon : un godet de verre épais qui garde son liquide (tête ambre clair, cœur ambré, fond brun labdanum). Le capot (verre, bouchon, étiquette) s'efface pendant qu'il monte : il ne traverse plus le titre.
- **Téléphone** : les trois notes passent en liste sous les couches, au-dessus de la barre d'achat ; ordinateur : accrochées au bord de chaque couche.
- **Défilement** : `gsap.matchMedia()` avec `{ bureau, tel, reduit }` ; deux `ScrollTrigger` épinglés (le cadre enfant, pas la section), nettoyés au changement de condition ; rendu à la demande dans `gsap.ticker` seulement si la scène est visible (IntersectionObserver) et si quelque chose bouge ; transforms et opacité seulement pour le HTML. `ScrollTrigger.refresh()` après chargement des images et des polices.
- **Le flacon finit de face, logo lisible**, dans les deux scènes.
- **Pause** : bouton visible dans chaque scène (« Arrêter la rotation » / « Arrêter les gouttes »), rond de 44 px sur téléphone.
- **Mouvement réduit** : pas de WebGL, pas d'épinglage ; le hero montre le rendu fixe du flacon, les trois parfums en fiches, la décomposition en image (`eclate-garrigue.webp`) avec la liste des notes.
- **Sans WebGL** : même mise en page fixe, mêmes images (rendues depuis la même scène, donc cohérentes).
- **Clavier** : le bouton d'ajout en fin de scène B reste dans l'ordre de tabulation (opacité, pas `visibility: hidden`) ; quand il prend le focus, le défilement va à la dernière image.

## 4. Textes

Densité (§ 11 des conventions, `outils/verifier.cjs`) : voir § 5. Titres de 4 à 10 mots, aucun ne coupe sur un trait d'union. Blocs de 3 phrases au plus. Pas de surtitre en capitales au-dessus du h1.

## 5. Vérification (5 novembre 2026)

Chrome (Playwright), `outils/verifier.cjs` puis `outils/parcours.cjs` :

- 1440, 768, 375, 360 : 0 débordement horizontal, 0 erreur console, 12 sections, titres coupés : aucun.
- Mots (après le tour 1 du persona) : 709 à 1440 (mode 3D), 701 à 768/375/360, 784 sans WebGL (les trois parfums de la scène A y sont tous visibles). Dans la fourchette 500-800, au-dessus de la cible de la composition (520-650) : le catalogue et le formulaire pèsent ~230 mots.
- Mouvement réduit : deux captures à 1,2 s identiques, 0 épinglage, boutons pause cachés, 0 erreur.
- Sans WebGL (`--disable-webgl --disable-3d-apis`) : classe `scene-3d` absente, page complète, 0 erreur.
- Parcours : choix 100 ml → prix mis à jour, ajout → compteur 1 et annonce « … ajouté au panier », total juste, livraison « offerte » ; séance à 2 places → 2 places proposées au plus ; réservation vide → erreurs reliées aux champs ; remplie → « C'est noté, Léa. » et « 2 places, 190 € à régler sur place ».
- Captures : `captures/{largeur}-scene-flacon-{1..6}.png`, `{largeur}-scene-notes-{1..6}.png`, une par section, pleine page, `reduit-*`, `sans-webgl-*`, `*-parcours-*`.

Note serveur : le serveur `python3 -m http.server` de l'atelier a une file d'attente de 5 connexions et en coupe certaines quand la page charge ses fioles en rafale (`ERR_CONNECTION_RESET`, fichiers pourtant présents). Les passages comptés ci-dessus tournent sur un serveur à file large (port 4330, même dossier).

## 6. Images et crédits

- **Rendues en code** (scène three.js de la page, `outils/rendre.cjs`) : `flacon-{parfum}.webp` (800×1000) et `-400`, `eclate-garrigue.webp` (900×1000) et `-900` (4:3, journal), `gros-bouchon|verre|etiquette.webp` (600²), `coffret.webp` (1200×800), `fiole-{matière}.webp` (480×600).
- **Orgue à parfums** (`orgue-1344|960`) : rendu en code (`construireOrgue` dans `flacon3d.js`, gradins de chêne veiné, 78 flacons de matières, balance, mouillettes, un flacon Garrigue, ombres douces). Il remplace la photo d'atelier reprise de `b2c-petille`, qui montrait des vaporisateurs (« une savonnerie », persona tour 1).
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

- Pendant les 2 ou 3 % du pin où les couches s'écartent encore dans le flacon, un éclat blanc de l'étiquette peut apparaître entre deux godets (l'étiquette se trouve derrière le verre des godets). Ce n'est visible que sur une image figée.
- Les photos reprises ne sont pas de Grasse (la niche et le portrait passent). L'orgue rendu est propre mais reste une image de synthèse : la vraie photo du labo du client vaut mieux.
- À fournir par le client : prix de la livraison sous 80 €, conditions de retour (aucun retour n'est promis sur la page), source des 1 312 avis, vraies séances.
- Le titre en dégradé (« choisir ») est l'élément `titre-degrade` de la bibliothèque, gardé volontairement sur un seul mot ; un linter de design le signale comme « gradient text ».
- La scène charge three.js depuis jsDelivr (≈ 650 Ko) : sans réseau vers le CDN, la page reste en mode fixe (le module échoue, `fixe()` est appelé).
- Deux contextes WebGL (un par scène) : acceptable ici, mais une page avec plus de scènes devrait partager un seul renderer.
- Rendu du verre calibré sous Chrome/Metal ; sur GPU faible, la transmission coûte une passe de plus par image (rendu à la demande, ratio de pixels plafonné à 2).

## Forme Blender (05/11/2026)

Verre, bague moletée et bouchon taillé à 12 facettes modélisés dans Blender 5.2 par `outils/blender/flacon.py`, exportés dans `modeles/flacon.glb` (159 Ko). `flacon3d.js` charge le fichier et ne remplace que la géométrie ; si le fichier manque, le flacon tourné en code reprend. Procédure : `../../elements-3d/blender.md`.
