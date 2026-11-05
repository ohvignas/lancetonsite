# Pétille — exemple B2C sur le design de Brume v1

Marque française fictive de produits ménagers rechargeables : un flacon en verre acheté une fois, puis des pastilles de 12 g à dissoudre dans l'eau du robinet, envoyées en lettre dans la boîte aux lettres, à l'unité ou en abonnement.

## Fichiers

```
index.html        la page (GSAP 3.15 + ScrollTrigger + SplitText, Lenis 1.3.27)
vendor/three.min.js   Three.js r158 UMD (copie locale de cdnjs 0.158.0, avertissement de dépréciation retiré), chargé par petille-3d.js après le premier affichage
petille-3d.js     fil rouge 3D : un canevas fixe, objet placé dans les emplacements [data-slot] de chaque section
petille.src.css   source Tailwind v4 → petille.css (compilé, minifié)
gestes.js         copie de templates/prototype/gestes.js, non modifiée
petille.js        panier local (localStorage « petille-panier »), kit + rythme, menu, lettre
images/           webp : 4:5 en 896 et 560 px, 16:9 en 1344 et 960 px
captures/         vitrine-1440.webp (premier écran 1440 × 900), vitrine-375, page-375, panier-1440
```

Compiler : `D=~/.npm/_npx/0d480d711c9a32eb/node_modules; NODE_PATH=$D node $D/@tailwindcss/cli/dist/index.mjs -i petille.src.css -o petille.css --minify`

## Nom

« Pétille » : ce que fait la pastille dans l'eau, court, verbe français, facile à dire. Recherches faites le 4 novembre 2026 : aucune marque de produits ménagers ou d'hygiène de ce nom. Écartés : « Ondée » (marque de salle de bain chez Mr Bricolage), « Clapot » (trop proche de Klapotis, savonnier). Le dépôt INPI reste à vérifier par un vrai client.

## Inspiration (900.care) — ce qu'on a repris, ce qu'on a fait autrement

Lu : structure de l'accueil, offre (pack d'essai, recharges, abonnement modifiable), preuves chiffrées et tierces, avis notés, FAQ. Aucun texte, nom de produit, logo ni visuel repris.
Fait autrement : une seule promesse concrète au lieu de deux héros promotionnels ; un prix unique et lisible (pas de « valeur barrée ») ; la comparaison chiffrée porte sur 500 ml (poids, plastique, prix) au lieu d'un comparatif de marques ; la boîte aux lettres (pas de colis) comme avantage ; l'équipe et l'atelier montrés.

## Composition (Brume v1 gardé, adapté)

Même rythme que Brume v1 : hero plein cadre qui se resserre en carte, bande défilante, manifeste qui s'allume mot à mot + trois chiffres, galerie horizontale épinglée, méthode en 4 temps épinglée, objet signature sur fond sombre, offre, preuve, avis sur fond de couleur, lieu en plein écran, FAQ, appel final.
Changements : palette zellige (carreau #E3EAE4, faïence #CBDACF, encre #142629, cobalt #2346C8 pour l'action, agrume #EFC94C en accent, une teinte par recharge : agrume, menthe, lavande, pamplemousse) ; typo d'accent Petrona (italique) à la place de Newsreader, Bricolage Grotesque gardée mais en largeur 90 et interlettrage 0 (retour « lettres collées ») ; trame de zellige à la place des persiennes ; la 3D du sachet devient une photo du flacon annotée.
Leçons de la Brume actuelle : panier gardé au rechargement, bascule « une fois / tous les 2 mois » sur chaque fiche, même prix partout (2,40 € / 2,04 € / kit 19 €), livraison offerte dès 25 € partout (sinon 3,90 €), nav sans téléphone (logo, 4 liens, panier, une action, menu plein écran sur téléphone), appel final en deux colonnes.
Épinglages : 3 (hero, boutique, méthode).

Sections du `<main>` (12) : hero, bande, principe + chiffres, boutique (4 fiches), comment ça marche, le flacon, l'offre (kit + rythme), comparatif, avis, l'atelier, FAQ, appel final. Pied de page complet.
Densité (script § 11, 1440 × 900) : **772 mots, 12 sections, 16,7 écrans**.

## Titres (pistes, retenue en gras)

| Section | Pistes | Retenue |
|---|---|---|
| Hero | « Arrêtez de payer pour de l'eau » (trop proche de 900.care) · « Le flacon reste. Seule la pastille voyage. » · **« Vos produits ménagers tiennent dans une enveloppe. »** | concrète, surprenante, dit le produit et la livraison |
| Boutique | « Nos recharges » · **« Quatre pastilles pour toute la maison. »** | |
| Méthode | « Comment ça marche » · **« Trois minutes, une fois par mois. »** | |
| Flacon | **« Le flacon reste. Seule la pastille voyage. »** | piste du hero, réemployée |
| Preuve | « Moins d'eau, moins de plastique » · **« 500 ml de nettoyant, deux façons de les acheter. »** | |
| Final | « Lancez-vous » · **« Le prochain bidon, ne l'achetez pas. »** | |

## Images et dépenses (fal, compte École illith, plafond 1,00 $)

Estimation avant lancement (estimate_cost) : 12 × 0,0398 $ = 0,48 $.
Une image maîtresse (cuisine, flacon), puis 11 éditions qui la prennent en référence pour garder la même lumière et **la même forme de flacon** (cylindre en verre clair, épaule arrondie, gâchette anthracite). Style : pellicule Portra 400, lumière de fenêtre douce, zellige vert d'eau, chêne.

| # | Fichier | Modèle | Sujet | Coût |
|---|---|---|---|---|
| 1 | hero | fal-ai/nano-banana, 16:9 | cuisine, évier, flacon jaune, pastille | 0,0398 $ |
| 2 | pastille | nano-banana/edit, 4:5 | la pastille tombe et colore l'eau | 0,0398 $ |
| 3–6 | flacon-agrume, -menthe, -lavande, -pamplemousse | nano-banana/edit, 4:5 | flacon seul sur carreau, liquide de couleur | 4 × 0,0398 $ |
| 7 | robinet | nano-banana/edit, 4:5 | remplissage au robinet | 0,0398 $ |
| 8 | courrier | nano-banana/edit, 4:5 | enveloppe kraft dans une boîte aux lettres | 0,0398 $ |
| 9 | geste | nano-banana/edit, 4:5 | vaporiser et essuyer le plan de travail | 0,0398 $ |
| 10 | kit | nano-banana/edit, 4:5 | 4 flacons vides et l'enveloppe | 0,0398 $ |
| 11 | atelier | nano-banana/edit, 16:9 | deux personnes emballent, Croix-Rousse | 0,0398 $ |
| 12 | final | nano-banana/edit, 16:9 | salle de bain, flacon rose | 0,0398 $ |
| | **Total** | | 12 images | **≈ 0,48 $** |

FIX-4 (4 nov., plafond 0,20 $) : 4 retouches fal-ai/nano-banana/edit à 0,0398 $ = **0,16 $** (total images ≈ 0,64 $). kit : 1 retouche, l'enveloppe montre 4 pastilles (sachets légèrement imprimés, illisibles). courrier : 3 retouches (la 3e avec « exactly four tablets… count them: 1 2 3 4 »), le faux mot « FARÉ » et tout texte ont disparu, mais le modèle garde 3 pastilles malgré 3 essais ; on garde la 1re retouche (plus nette). Défaut restant : courrier montre 3 pastilles.

## Contenus fictifs à faire valider par un vrai client

- Chiffres : 12 g la pastille, 520 g un flacon plein, 38 g de plastique, 3,60 € les 500 ml en supermarché, 18 400 foyers, 98 % d'origine naturelle, 48 h, 4,8/5 sur 1 312 avis.
- Avis (Claire, Karim, Sophie), fondateurs (Inès Marchal, Malik), adresse (14 rue Dumenge, Lyon), e-mail, garantie à vie du flacon, satisfait ou remboursé 30 jours, test par laboratoire indépendant.
- Prix : 2,40 €, 2,04 €, kit 19 €, port 3,90 €, seuil 25 €.
- Mentions légales à compléter. Paiement de démonstration : rien n'est envoyé.

## Vérifications (test-lancetonsite/landings/petille/creation/)

`verifier.js` : 1440, 1280, 768, 375, 360 et mouvement réduit (1440, 375) : 0 erreur console, 0 image cassée, 0 débordement, aucun titre qui déborde ni coupé sur un trait d'union. Panier : 2 articles ajoutés, toujours là après rechargement, seuil et total justes. `vitrine.js` : vitrine sans « Avant / après », carte Pétille visible sous le filtre B2C.

- 4 nov., persona tour 1 : FIX 1-3 et 5-8 appliqués (titre « tous les deux mois », compteur du kit hors aria-live avec phrase .sr-only, bouton « Ajouter une recharge, 2,04 € » sous 25 €, avis Karim, « Plus tard » et choix empilés quand la colonne est étroite, 1re carte de la galerie entière, barres du comparatif plus contrastées) ; marges intérieures (bascule, choix, pastille) à 12 px ; impeccable detect sans cramped-padding à 1440, 768, 375 ; Playwright : 0 erreur, 0 débordement, panier juste. FIX-4 (images) fait en partie, voir « Images et dépenses ».
- 4 nov., flacon 3D : la photo de #flacon devient un flacon Three.js r128 (cdnjs, petille-3d.js) qui tourne au glisser, à la souris et au défilement, finit de face logo lisible, pastille qui tombe et pétille, 4 recharges en aplats vifs (cobalt, agrume, rose, vert) ; mouvement réduit = image fixe, sans WebGL = photo, pas de rendu hors écran ; vérif test-lancetonsite/landings/petille/3d/ (1440, 768, 375 : 0 erreur, 0 débordement, panier juste).
- 4 nov., persona tour 2 : FIX 8, 10-13 appliqués. Flacon 3D refait d'après la photo (Boston en verre clair, MeshPhysicalMaterial transmission + environnement studio dessiné, gâchette noire extrudée avec biseau et détente courbe, logo sérigraphié blanc, trait gravé à 500 ml à la place de l'étiquette ; liquide vif, fonds inchangés ; cadrage corrigé, l'aspect suit [data-scene] et non plus le bloc entier). Three.js r128 en local (vendor/three.min.js), chargé seulement à 600 px de #flacon. Relance du panier calculée (« Ajouter 3 recharges (6,12 €), port offert » après le kit). 4 boutons de recharge sur une ligne dès 1280 px. Barres « Flacon plastique » à 100 % (aussi en style initial). Vérif test-lancetonsite/landings/petille/3d/verifier-v2.js en file:// (1440, 768, 375) : 0 erreur, 0 débordement, flacon de face, panier 22,90 € → 25,12 € port offert ; captures v2-*.png.
- 4 nov., refonte 3D (remplace FIX-10 et FIX-12 du tour 2) : fil rouge sur toute la page. Un seul canevas fixe sans clic (.toile-3d), découpé en clip-path sur l'emplacement [data-slot] le plus visible (hero, principe, fiche boutique, méthode, flacon, offre, final) : l'objet glisse d'une section à l'autre et ne passe jamais sur un texte. Flacon Boston en LatheGeometry 160 segments (verre épais, culot arrondi, col fileté), verre MeshPhysicalMaterial transmission + ior 1,5 + épaisseur, environnement studio en PMREM, gâchette noire mate extrudée avec biseau (bec hexagonal, détente courbe, col strié, tube plongeur), sérigraphie CanvasTexture, trait gravé à 500 ml, lumière trois points, ombre douce, pastilles bombées texturées, kit kraft qui s'ouvre. « Comment ça marche » : séquence épinglée en 5 temps pilotée par les barres de gestes.js (ouvrir, remplir au robinet avec filet et ondulations, pastille + effervescence + couleur, refermer en vissant, pschitt puis de face), légendes 1/5 à 5/5, réversible ; sur téléphone le flacon au-dessus, la légende dessous (barre CTA masquée sur #methode et #flacon). Mouvement réduit : images fixes rendues en 3D (une par section, 5 vignettes). Sans WebGL : photos. DPR ≤ 1,5 sur téléphone, pas de rendu onglet caché ni hors emplacement. Vérif 3d/verifier-fil.js et verifier-reduit.js (file://, 1440, 768, 375) : 0 erreur, 0 débordement, 0 chevauchement texte/bouton, panier 22,90 € → 25,12 € ; captures 3d/v2-etape-*.png.
- 4 nov., méthode étape 3 reprise : eau claire transparente (matériau à part, opacité 0,12) qui passe à la couleur de la recharge par fondu linéaire (couleur + opacité, sans gris) ; 420 bulles translucides de 0,5 à 2 mm (opacité 0,4, reflet spéculaire) qui partent de la pastille, rétrécissent et éclatent à la surface ; gâchette soulevée au-dessus du col, toujours dans le cadre (bec tourné vers l'arrière pour laisser passer l'eau) ; flacon de face pendant toute la séquence ; pastille nette (plus de rendu sans test de profondeur) qui rétrécit pendant que l'eau se colore. Captures v2-etape-4-methode-*-{1440,375}.png : 0 erreur, 0 chevauchement.
- 4 nov., persona tour 3 (tout sauf FIX-6) : flacon visible pendant l'épinglage du héros (opaciteDe ignore [data-hero-fade]) ; est-3d posé après la branche mouvement réduit ; changement d'emplacement = décalage amorti, découpe sur le cadre de l'objet sans aplat pendant le vol (jamais tranché), pas de vol d'une fiche boutique à l'autre ; tous les emplacements inactifs, les 5 vignettes de la méthode et les fiches boutique (4 couleurs) affichent des rendus fixes de la 3D (photo()), plus aucune photo réelle ni aplat vide, aussi en mouvement réduit ; kit = enveloppe kraft à rabat, 4 flacons vides, 4 petites pastilles #FFC21A/#1FC77A/#7B5CFF/#FF5C9A, impression « Pétille » nette ; robinet en laiton (étape 2), brume conique en points fins depuis le bec (étape 5) ; textes des étapes en fondu court (gestes.js, "<0.06") ; .teinte en clip-path arrondi, data-cursor-label retiré des fiches ; grille réduite 2 colonnes 768-1279, 4 dès 1280 ; flacon du héros mobile agrandi (min 220 px) ; en-tête transparent jusqu'à la fin du pin-spacer du héros (gestes.js). Protocole du testeur : ../../../../../../test-lancetonsite/landings/petille/3d/verifier-tour3.js (lent | rapide | reduit).
- 4 nov., persona tour 4 : héros épinglé raccourci (45 / 30 %), titre effacé seulement à 72 %, boutons et emplacement 3D marqués [data-hero-keep] jamais effacés (gestes.js) ; vol = flacon visible seulement sur l'emplacement quitté et le nouveau (clip-path path() des deux, une passe de rendu par emplacement avec son aplat derrière le verre : jamais sur le texte, liquide juste) ; vignettes du panier = rendus 3D (window.petilleImages, clé de recharge, rien de data: en localStorage) ; ligne « Ensuite : … premier prélèvement le … » dans le panier ; relance masquée au-delà de 4 recharges ; enveloppe couchée vers l'arrière, plus petite, 4 flacons visibles ; mitigeur col de cygne en laiton posé sur le plan, gâchette posée à gauche du flacon ; logo plus étroit et poses moins tournées ; final repart de face ; rendus fixes un par requestIdleCallback ; bande de survol à 89 % ; héros mobile min 260 px ; texte de l'atelier aligné sur la photo (Inès et Léa, emballage). Rafales pendant les transitions : verifier-tour3.js rafale.
- 5 nov., persona tour 5 : rendus fixes sur un second WebGLRenderer hors écran (caméra clonée, environnement PMREM à part), le renderer et la caméra visibles ne sont jamais touchés (N11 : position du héros constante) ; file paresseuse (IntersectionObserver, marge 100 %), seulement les images proches de l'écran ; plus de vol : la carte quittée garde son image fixe, l'arrivée apparaît en fondu de 250 ms dans son cadre (jamais tranchée) ; logo entier sur les fiches (poses recentrées) ; à 1440 le titre du héros n'est plus effacé ; comparatif = rendu 3D fixe ; offre sans aplat avant dévoilement ; principe vert ; rabat du kit à plat, pastilles devant ; dates de prélèvement par rythme ; rotation au doigt qui revient de face ; en-tête réaffiché après ajout ; en-tête opaque (C14).
