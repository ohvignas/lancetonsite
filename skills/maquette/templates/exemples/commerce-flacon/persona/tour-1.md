# Ciste : boucle persona, tour 1

- **Date** : 5 novembre 2026
- **Page testée** : http://localhost:4320/atelier/skills/maquette/templates/exemples/commerce-flacon/index.html
- **Regard indépendant** : je n'ai lu aucun rapport du relecteur. J'ai lu le cadrage (`brief.md`, `NOTES.md`, `medias-a-generer.md`) et le code de la page.
- **Navigateur** : Chrome via Playwright (GPU Metal), puis Chrome sans WebGL (`--disable-webgl --disable-3d-apis`) et Chrome avec mouvement réduit. Captures dans `persona/captures/`.
- **Qui parle** : Mireille Aubanel, nez et patronne de Ciste, qui a payé 25 000 €. Je joue aussi l'acheteuse : 40 ans, découvre la maison sur Instagram, téléphone en main, et se demande « à quoi ça sent avant de payer 130 € ».

---

## 1. Test (test-report)

### 1.1 Les 5 premières secondes

| Taille | Capture | Ce que je vois |
|---|---|---|
| 1440 × 900 | `captures/scroll-1440-00-arrivee.png` | « Cinq parfums composés à Grasse. » Mon flacon au centre, l'étiquette Restanque lisible, le chapeau « séries de 300 flacons, commencez par les sentir chez vous », le bouton « Le coffret de 5 échantillons · 22 € », et le coffret répété en haut à droite. On comprend en 3 secondes ce qu'on vend, d'où ça vient et quoi faire. |
| 1280 × 800 | `captures/taille-1280-arrivee.png` | Même équilibre, aucun vide raté. |
| 768 × 1024 | `captures/taille-768-arrivee.png` | Correct. Le bouton « Arrêter la rotation » touche presque le lien « Voir les parfums » (en bas à droite). |
| 375 × 812 | `captures/scene-375-flacon-10.png`, `captures/scroll-375-00-arrivee.png` | Titre sur deux lignes, flacon, chapeau, bouton coffret à 22 € : tout tient dans le premier écran. Ensuite, une barre « Coffret découverte · 22 € » reste fixée en bas. Pour mon acheteuse, c'est exactement ce que je voulais. |
| 360 × 740 | `captures/taille-360-arrivee.png` | Pareil, rien n'est coupé. |

Le prix des flacons (124 à 196 €) n'apparaît pas dans le premier écran, mais on le voit dès le deuxième parfum de la scène. Ça me va : le coffret est la porte d'entrée que je voulais.

### 1.2 Le défilement complet

À 1440, 14 captures (`captures/scroll-1440-01.png` à `-14.png`), plus 6 par scène épinglée (`captures/scene-1440-flacon-*.png`, `captures/scene-1440-notes-*.png`). À 375, 12 captures (`captures/scroll-375-*.png`) et les scènes (`captures/scene-375-*.png`). J'ai aussi fait un défilement rapide à la molette (`captures/scroll-1440-rapide-fin.png`).

- **Scène A, le flacon qui tourne** (`scene-1440-flacon-30.png`, `scroll-1440-01.png`) : c'est réussi. Le flacon fait un tour, le jus passe de l'olive au citron puis au rose, et l'étiquette change de nom quand elle passe au dos. On voit Mistral, Centifolia, puis Nuitée, chaque fois avec la famille, l'accord, deux notes et le prix. Le flacon finit de face, logo lisible. Le bouton pause est visible. C'est « le flacon comme si on l'avait en main » que j'avais demandé.
- **Scène B, la décomposition** (`scene-1440-notes-10/30/50/100.png`) : c'est l'idée juste (tête, cœur, fond, avec leurs durées). Trois défauts pourtant :
  1. Au début (`scene-1440-notes-10.png`), le capot de verre, rendu **opaque blanc**, monte **à travers le titre** « Un parfum se lit en trois temps » : on lit « CISTE » en travers des lettres. Le jus seul ressemble alors à un cylindre de cire rouge.
  2. Les trois couches ressemblent à des **meules de fromage ou à des bonbons laqués**, pas à du liquide. Mon Garrigue devient rouge tomate alors que c'est un ambré résineux.
  3. À 375 et 360 (`scene-375-notes-50.png`, `taille-360-notes.png`), les couches sortent du cadre à gauche, les étiquettes s'empilent mot par mot dans une colonne de 40 % (« TÊTE · 20 / MINUTES ») et une goutte passe sur « LENDEMAIN ».
- **Preuves** (`scroll-1440-03.png`) : 1 312 avis, 8 matières, 300 flacons, puis la bande des fioles avec leur origine. C'est propre. La fiole « Ciste labdanum · Estérel » est vide sur cette capture : c'est le serveur local qui a coupé la connexion (`ERR_CONNECTION_RESET`), et l'image s'affiche après rechargement.
- **Trois détails** (`scroll-1440-06.png`) : le bouchon et l'étiquette sont de vrais gros plans. Le « fond de verre de 7 mm » montre en fait le flacon entier sans son bouchon : on ne voit pas l'épaisseur du verre.
- **Catalogue** (`scroll-1440-07.png`) : cinq fiches avec 50 ou 100 ml, prix et bouton. À 1440, **le bouton « Ajouter au panier » passe sur deux lignes** dans les cinq fiches. C'est le premier défaut qu'un acheteur voit dans une boutique.
- **Coffret** (`scroll-1440-08.png`) : fond vert, trois étapes, bouton. C'est clair. Le titre en dégradé sur « choisir » passe.
- **Atelier** (`scroll-1440-09.png`, `-10.png`) : carte en verre (2 h 30, 6 personnes, 95 €), réservation en deux colonnes, places restantes par séance. En dessous du texte, un **vide de 250 px environ** avant la section suivante.
- **Maison** (`scroll-1440-10.png`, `-11.png`) : le portrait et le texte sont bons. Mais la niche reste seule à droite, avec **une demi-page vide à gauche** (`scroll-1440-11.png`).
- **Avis, journal, questions, appel final, pied** (`scroll-1440-12/13/14.png`) : c'est complet. Le pied de page a l'adresse, les horaires, le plan du site, les liens légaux et la lettre d'information.
- **Défilement rapide** : rien ne saute ni ne clignote. Les épinglages se relâchent proprement.

### 1.3 Le parcours de l'acheteuse (375)

Captures `captures/p375-01-menu.png` à `p375-07-merci-4-places-sur-2.png`.

1. **Menu** : il s'ouvre propre, avec 5 liens et le coffret. « Parfums » mène au catalogue.
2. **Centifolia en 100 ml** : le prix passe de 138 à **196 €**, conforme au brief. « Ajouter au panier » : la vignette vole, le toast « Centifolia ajouté au panier » s'affiche et l'annonce lecteur d'écran est correcte.
3. **Coffret** ajouté depuis la section coffret : le compteur passe à **2**, et l'annonce dit « Coffret découverte ajouté au panier. 2 articles. »
4. **Panier** : Centifolia 100 ml à 196 € et coffret à 22 €, **total 218 €**. Le calcul est juste. Mais le coffret promet « 22 € déduits du premier flacon » et rien dans le panier ne le dit quand on prend les deux ensemble. Il n'y a **aucune ligne de livraison**, alors que le coffret seul (22 €) est sous le seuil de 80 €. Mon acheteuse se demandera combien coûte le port.
5. **Commander** : le message « Exemple fictif : aucune commande n'est passée » s'affiche. C'est correct.
6. **Réservation vide** : les erreurs sont reliées aux champs, et le focus va sur la première séance libre. C'est correct.
7. **Réservation de 4 places sur la séance du samedi 14 à 10 h, qui affiche « 2 places »** : le formulaire **accepte** et répond « C'est noté, Léa. Samedi 14 novembre, 10 h : 4 places à l'atelier. » C'est une faute de métier : je me retrouve avec 8 personnes pour 6 postes. Le message ne donne pas non plus le montant (4 × 95 = 380 €).

### 1.4 Le clavier (1440, 44 tabulations)

Source : sortie de `tab.cjs`. Captures `captures/clavier-1440-lent-tab12/14/15/16/20.png`.

- L'ordre est logique : lien d'évitement, logo, 5 liens, panier, coffret, CTA du hero, « Voir les parfums », les pauses des scènes, les 5 fiches (contenance et bouton), le coffret, la séance, les champs, « Réserver », les 3 articles, les 4 questions, l'appel final et le pied. Le focus est **toujours visible** (anneau de 3 px, voir `clavier-1440-lent-tab14.png`).
- Le bouton « Ajouter au panier » de la scène B (Garrigue) n'est **jamais atteint** : il reste en `visibility: hidden` tant que la scène n'est pas finie. Le même produit s'achète dans le catalogue, donc c'est un défaut léger.
- Les 3 cartes du journal pointent vers `#journal` : elles sont focusables, mais **ne mènent nulle part**.

### 1.5 Le mouvement réduit et la page sans WebGL

- **Mouvement réduit** (`captures/reduit-1440-00-arrivee.png` à `-14.png`) : aucun épinglage (`pins: []`). Le flacon est fixe, les trois parfums sont présentés en fiches, la décomposition en image avec la liste des notes. La page est complète et lisible. C'est bien fait.
- **Sans WebGL** (`captures/nogl-1440-*.png`) : la classe `scene-3d` est absente et la page est complète, avec les mêmes images rendues. **0 erreur** console.

### 1.6 L'œil du métier, celui de Mireille

| Où | Ce qui ne va pas | Gravité |
|---|---|---|
| `donnees.js` l. 35 | Une séance le **mercredi 18 novembre à 18 h 30**, alors que le brief dit « le samedi » et que le titre de la section promet « un samedi à l'atelier ». Le 18 novembre 2026 est bien un mercredi. | majeur |
| `boutique.js` l. 184-206 | On réserve plus de places qu'il n'en reste. | majeur |
| `index.html` l. 334 | « Retour gratuit sous 30 jours » : ce n'est pas dans mon offre. En plus, un parfum ouvert ne se reprend pas : un flacon descellé est exclu du droit de rétractation, pour des raisons d'hygiène. C'est une fausse promesse. | majeur |
| `donnees.js` l. 26 | Garrigue : « ciste labdanum » en **cœur**. Le labdanum est une résine, une note de fond, et c'est celle qui donne son nom à ma maison. Un nez le met en fond, avec l'encens et le cuir. | moyen |
| `index.html` l. 133 | « Des matières **qu'on va chercher nous-mêmes** », alors que la bande montre du vétiver d'Haïti et du benjoin du Laos. Le brief dit « achetées directement à leurs producteurs ». | moyen |
| `index.html` l. 214-216, `images/atelier-*` | La photo de l'atelier montre deux femmes qui plient du carton devant des étagères de **vaporisateurs à gâchette**. Pas de balance, pas de pipette, pas de mouillettes, pas d'orgue. Pour moi, c'est une savonnerie. C'est la photo qui me gêne le plus. | majeur, photo provisoire |
| `donnees.js` l. 52, `images/village-900` | La ruelle ensoleillée d'un village du Luberon illustre « Cueillir la rose de mai ». Le texte et l'image ne se répondent pas. | moyen, photo provisoire |
| `index.html` l. 179, `images/gros-verre.webp` | « Fond de verre de 7 mm » sur une image de flacon entier. | moyen |
| Scène B, liquide | Garrigue rouge tomate. Un ambré résineux tire sur le brun ambré. | léger |
| `index.html` l. 353 | « Instagram » rangé sous « Légal ». | léger |
| Le reste | Bouchon émaillé à Vallauris, néroli de Vallauris, verre de Biot, rose de mai de Grasse, concentration de 18 %, tenue de 6 à 10 heures, recharge 30 % moins chère, prix de 124 à 196 € : **tout est juste**. Les accords (« une rose sans poudre », « le figuier sur un mur de pierre sèche ») sont écrits comme je parle. | OK |

### 1.7 La densité (script de `conventions.md` § 11)

| Taille | Mots | Sections | Écrans |
|---|---|---|---|
| 1440 × 900 | **693** | **12** | **16,7** |
| 375 × 812 | 685 | 12 | 17,1 |

Détail à 1440 : en-tête 12, flacon 32, preuves 50, notes 10, détails 27, parfums 123, coffret 44, atelier 96, maison 36, avis 48, journal 37, questions 78, final 24, pied 73. Tout est dans la fourchette (500-800 mots, 10-13 sections, 12-18 écrans) et aucun bloc ne dépasse 3 phrases. **La page n'est ni maigre ni bavarde.** Elle a toutes les sections attendues : hero, preuve, offre, comment ça marche (le coffret en trois étapes), qui on est, avis, catalogue, articles, tarifs, FAQ, appel final et pied complet.

### 1.8 La console et le débordement

- **0 erreur JavaScript** à toutes les tailles et dans tous les modes.
- Seules erreurs vues : `ERR_CONNECTION_RESET` ou `ERR_SOCKET_NOT_CONNECTED` sur une ou deux fioles, à chaque fois une différente. C'est la file de 5 connexions du serveur local : je ne le compte pas comme un défaut.
- Débordement horizontal : 0 px à 1440, 1280, 1024, 820, 768, 375 et 360. J'ai mesuré une fois 597 px à 768 ; je ne l'ai pas reproduit en trois relances, donc je ne le compte pas.

---

## 2. Notes (scores)

### 2.1 Les 10 points

| # | Point | Résultat | Capture | Pourquoi |
|---|---|---|---|---|
| 1 | Page complète | OK | § 1.7 | 693 mots, 12 sections, 16,7 écrans, toutes les sections attendues |
| 2 | Catalogue, articles | OK | `scroll-1440-07.png`, `-12.png` | 5 fiches avec prix, contenance et panier ; 3 articles datés, mais leurs liens ne mènent nulle part |
| 3 | Titres et promesse | OK | `scroll-1440-00-arrivee.png` | Titres concrets, promesse « commencez par les sentir chez vous » |
| 4 | Typographie d'affichage | OK | toutes | Bodoni bien espacé à 1440 comme à 360 |
| 5 | Barre de navigation | OK | `scroll-1440-00-arrivee.png`, `p375-01-menu.png` | Logo, 5 liens, panier, bouton ; aucun téléphone |
| 6 | Blocs d'action, formulaires | **Pas OK** | `p375-07-merci-4-places-sur-2.png` | Deux colonnes, mais le formulaire accepte 4 places sur 2 et propose un mercredi |
| 7 | Hero équilibré | OK | `taille-1280-arrivee.png` | Texte, flacon et action se répondent |
| 8 | Responsive | **Pas OK** (moyen) | `scroll-1440-07.png`, `scene-375-notes-50.png` | Boutons du catalogue sur deux lignes à 1440 ; étiquettes de la scène B écrasées à 375 et 360 |
| 9 | Images et vidéos | **Pas OK** | `scroll-1440-09.png`, `scroll-1440-12.png` | Photo de l'atelier hors métier, ruelle hors sujet, « 7 mm » non montré |
| 10 | 3D produit | OK | `scene-1440-flacon-100.png`, `scene-1440-notes-100.png` | Les deux scènes finissent de face, logo lisible ; seul défaut, le capot qui traverse le titre |

### 2.2 La grille sur 100

| Critère | Note | Pourquoi |
|---|---|---|
| Direction artistique | **13 / 15** | Calcaire, vert ciste, labdanum, Bodoni : on reconnaît la maison sans le logo, sans luxe criard. On perd des points sur les couches de la scène B, qui font bonbon, et sur le Garrigue rouge tomate. |
| Images | **10 / 15** | Les flacons, le coffret et les fioles rendus en code sont cohérents entre eux, c'est le gros atout. Mais la photo de l'atelier n'est pas un labo de parfumeur, la ruelle est hors sujet et le « 7 mm » n'est pas montré. Avec des médias provisoires, ce critère plafonne de toute façon vers 12 ou 13. |
| Mise en page | **12 / 15** | La composition produit centré est suivie, avec deux épinglages et un vrai contraste d'échelle. Défauts : vides ratés sous l'atelier et à côté de la niche (`scroll-1440-10/11.png`), boutons du catalogue sur deux lignes, capot qui traverse le titre. |
| Mouvement | **8 / 10** | La signature fonctionne : rotation, changement de jus et d'étiquette. Les boutons pause sont là, le mouvement réduit est exemplaire. La décomposition est moins aboutie (début raté, version téléphone serrée). |
| Clarté en 5 secondes, action | **9 / 10** | Quoi, d'où, combien, quoi faire : tout est dans le premier écran. Le coffret à 22 € revient partout, avec la barre fixe sur téléphone. |
| Densité | **5 / 5** | 693 mots, 12 sections, 16,7 écrans, comptage fourni. |
| Preuves et objections | **6 / 10** | Les quatre objections du brief sont traitées : coffret, tenue chiffrée, origine et adresse, détail de l'atelier. Mais il y a trois faux : un retour de 30 jours inventé et juridiquement faux, une séance le mercredi, une réservation au-delà des places. Les 1 312 avis n'ont pas de source et le panier ne dit rien de la livraison. |
| Textes | **8 / 10** | La voix est juste et la page écrit comme on parle au comptoir. « Qu'on va chercher nous-mêmes » est exagéré, et le labdanum en cœur, c'est mon métier qu'on écorne. |
| Mobile, accessibilité, légèreté | **8 / 10** | Clavier complet avec focus visible, `aria-live`, panier en `<dialog>`, 0 débordement, cibles de 44 px. Les étiquettes de la scène B sont écrasées à 375 et 360, le bouton de fin de la scène B est hors clavier, et le bouton prend la police Bodoni dans cette scène. |
| **Total** | **79 / 100** | |

- **Note sur 10** : 7,9.
- **Seuil** : **85**, puisque c'est une maquette avec médias provisoires.
- **Atteignable sans le vrai client, à 0 $** : FIX-1 à FIX-12 rapportent environ +7 points (Preuves 6 → 8, Mise en page 12 → 14, Mouvement 8 → 9, Textes 8 → 9, Mobile 8 → 9), soit **86 environ**, au-dessus du seuil. Pour atteindre 90, il faut la vraie photo de l'atelier, mon portrait, la récolte de rose et la source des avis.

> « Le flacon qui tourne et change de jus, c'est exactement ce que j'ai demandé, et mon acheteuse comprend tout depuis son téléphone. Mais une page qui promet un retour à 30 jours sur un parfum ouvert, une séance un mercredi et 4 places là où il en reste 2, je ne la mets pas en ligne avec mon nom dessus. Et cette photo d'atelier, ce n'est pas un orgue, c'est une savonnerie. »

Verdict : Pas encore. Trois erreurs de métier, gratuites à corriger, dans l'offre et la réservation : le retour 30 jours inventé, la séance du mercredi, la surréservation.

---

## 3. Plan de corrections (fix-plan)

| FIX | Gravité | Coût | Résumé |
|---|---|---|---|
| FIX-1 | majeur | **0 $** | Retirer « Retour gratuit sous 30 jours » de l'appel final |
| FIX-2 | majeur | **0 $** | Bloquer la réservation au-delà des places restantes |
| FIX-3 | majeur | **0 $** | Remplacer la séance du mercredi par un samedi |
| FIX-4 | majeur | **0 $** | Boutons du catalogue sur une ligne à 1440 |
| FIX-5 | moyen | **0 $** | Scène B : le capot ne doit plus traverser le titre |
| FIX-6 | moyen | **0 $** | Scène B sur téléphone : étiquettes lisibles, couches dans le cadre |
| FIX-7 | moyen | **0 $** | Panier : déduction du coffret et ligne de livraison |
| FIX-8 | moyen | **0 $** | Garrigue : labdanum en note de fond |
| FIX-9 | moyen | **0 $** | Corriger « qu'on va chercher nous-mêmes » |
| FIX-10 | moyen | **0 $** | Combler les vides de l'atelier et de la maison à 1440 |
| FIX-11 | moyen | **0 $** | Gros plan « fond de verre 7 mm » qui montre vraiment le fond |
| FIX-12 | léger | **0 $** | Police des boutons, bouton de la scène B au clavier, liens du journal, Instagram, montant de la réservation |
| FIX-13 | majeur | **génération** (≈ 0,06 $) puis **client** | Photo de l'atelier : un vrai labo de parfumeur |
| FIX-14 | moyen | **génération** (≈ 0,12 $) puis **client** | Récolte de rose et lumière sur le flacon |
| FIX-15 | moyen | **client** | Portrait réel de Mireille, source des 1 312 avis, conditions de retour et de livraison |

### FIX-1 : la promesse de retour inventée
- **Où** : `index.html`, ligne 334 (`.final-reassurance`).
- **Comment** : remplacer par une phrase de l'offre réelle, par exemple « Livré en 48 h · 22 € déduits du premier flacon · Livraison offerte dès 80 € ». Aucun retour n'est promis tant que le client ne l'a pas confirmé (voir FIX-15).

### FIX-2 : la surréservation
- **Où** : `boutique.js`, lignes 184-206 (validation de `[data-reservation]`) et 91-96 (séances) ; `index.html`, ligne 242 (`#f-places`).
- **Comment** : au changement de séance, limiter les `<option>` de `#f-places` à `reste` (ou les désactiver au-delà). À l'envoi, ajouter la règle `places <= seance.reste`, avec un message relié au champ du type « Il reste 2 places à cette séance ». Dans le message de confirmation, ajouter le montant : « 2 places, 190 € à régler sur place ».

### FIX-3 : le mercredi
- **Où** : `donnees.js`, ligne 35.
- **Comment** : remplacer par `{ id: "s3", jour: "Samedi 21 novembre", heure: "15 h", reste: 4 }` et réordonner les séances par date. Sinon, si le client veut garder une séance en semaine, changer le titre en « Composez le vôtre, à l'atelier » (`index.html`, l. 225).

### FIX-4 : les boutons du catalogue
- **Où** : `ciste.css`, l. 205 (`.fiches`, 5 colonnes) et l. 221 (`.fiche .bouton`).
- **Comment** : passer le libellé à « Ajouter » avec `aria-label="Ajouter ${p.nom} au panier"` dans `boutique.js` (l. 65). Sinon, ajouter `white-space: nowrap; padding-inline: 1rem; font-size: 0.94rem` sur `.fiche .bouton`. Vérifier à 1440 et à 1280.

### FIX-5 : le capot qui traverse le titre
- **Où** : `scene.js`, autour de la l. 122 (timeline du capot) ; `index.html`, l. 153 (`.notes-tete`).
- **Comment** : faire sortir le capot en fondu (opacité de 1 à 0 sur les premiers 10 % du déplacement) ou le déplacer en diagonale, hors de la colonne du titre. Sinon, placer `.notes-tete` au-dessus du canvas (`z-index`) avec un fond `#f2f3ee`. Contrôler sur `scene-1440-notes-10.png`.

### FIX-6 : la scène B sur téléphone
- **Où** : `ciste.css`, l. 158-164 (`@media (max-width: 767px)`, `.scene-3d .note { max-width: 40vw }`) ; `scene.js` (cadrage de la caméra sur téléphone).
- **Comment** : sous 768 px, mettre les étiquettes **sous** les couches, en liste à trois lignes en bas du cadre, au lieu de les accrocher à côté. Sinon, réduire l'écartement horizontal des couches et passer `max-width` à 52vw, `note-temps` sur une ligne (`white-space: nowrap`, taille 0,7 rem). Mettre les gouttes derrière les étiquettes (`z-index` du HTML au-dessus du canvas). Contrôler à 375 et à 360.

### FIX-7 : le panier, le coffret et la livraison
- **Où** : `boutique.js`, l. 108-118 (`afficher`) ; `index.html`, l. 378-381 (`.panier-pied`).
- **Comment** : sous le total, ajouter la ligne « Livraison : offerte dès 80 € » ou « Livraison : X € » (montant à fournir par le client, en attendant « calculée à l'étape suivante »). Si le panier contient le coffret **et** un flacon, ajouter la ligne « Le code du coffret (−22 €) s'utilisera sur votre prochain flacon » pour lever le doute.

### FIX-8 : le labdanum en cœur
- **Où** : `donnees.js`, l. 26.
- **Comment** : `notes: { tete: "genièvre, thym", coeur: "lavande, immortelle", fond: "ciste labdanum, encens" }` (le cuir peut rester si la place le permet). L'accord de la l. 25 reste juste.

### FIX-9 : « qu'on va chercher nous-mêmes »
- **Où** : `index.html`, l. 133.
- **Comment** : « Des matières achetées à ceux qui les cultivent. », ou « Huit matières, achetées à leurs producteurs. ».

### FIX-10 : les vides de l'atelier et de la maison
- **Où** : `ciste.css`, l. 305-312 (`.maison-grille`) et la grille de l'atelier.
- **Comment** : pour la maison, mettre la niche en `grid-column: 1 / 5` sous le portrait, ou réduire le portrait à 1/8 et placer la niche à côté du texte sur la même rangée, pour ne plus laisser la demi-page vide de `scroll-1440-11.png`. Pour l'atelier, placer `.atelier-texte` en `position: sticky; top: 120px` le long du formulaire, ou ajouter sous le texte une ligne de réassurance avec une vignette du flacon de 30 ml (`flacon-*-400.webp`) pour habiter la colonne.

### FIX-11 : le gros plan du verre
- **Où** : `outils/rendre.cjs` (vue `gros-verre`) ; `index.html`, l. 179.
- **Comment** : relancer le rendu avec la caméra basse, en contre-plongée, cadrée sur le dernier tiers du flacon, pour voir l'épaisseur du fond à travers le jus. C'est gratuit, rendu en code. Sinon, changer la légende pour ce qui se voit.

### FIX-12 : les finitions légères
- `ciste.css`, l. 50-51 : ajouter `font-family: var(--sans)` (ou la variable du Schibsted) à `.bouton`. Le bouton de `.notes-fin` hérite aujourd'hui du Bodoni (`scene-1440-notes-100.png`).
- `ciste.css`, l. 152 : pour que le bouton de la scène B prenne le focus comme prévu dans `NOTES.md` § 3, remplacer `visibility: hidden` par `opacity: 0` et `pointer-events: none`.
- `boutique.js`, l. 83 : les cartes du journal pointent vers `#journal`. Il faut un `href` vers une page d'article, même factice (`journal/rose-de-mai.html`), ou retirer le lien.
- `index.html`, l. 353 : sortir « Instagram » de « Légal » et le mettre dans une rubrique « Suivre ».
- `index.html`, l. 123-126, à 768 : décaler le bouton « Arrêter la rotation » pour qu'il ne touche plus « Voir les parfums » (`taille-768-arrivee.png`).

### FIX-13 : la photo de l'atelier
- **Où** : `images/atelier-1344.webp` et `images/atelier-960.webp` (`index.html`, l. 214-216).
- **Comment** : la régénérer avec le prompt n° 1 de `medias-a-generer.md`, en ajoutant « precision scale, glass pipettes, paper blotters, perfumer's organ of small amber bottles, no spray bottles ». Coût ≈ 0,06 $ en FLUX.2 Pro, **avec l'accord de l'utilisateur**. Ensuite, la remplacer par la vraie photo du client.

### FIX-14 : les images du journal
- **Où** : `images/village-900.webp` (`donnees.js`, l. 52) et `images/lumiere-700.webp`.
- **Comment** : prompts n° 4 et 5 de `medias-a-generer.md`, ≈ 0,12 $ pour deux images. En attendant, mieux vaut mettre `eclate-garrigue-900` ou un rendu de flacon sur l'article de la rose qu'une ruelle du Luberon.

### FIX-15 : ce que seul le client fournit
- Le portrait réel de Mireille et la niche de la vraie boutique.
- La source des 1 312 avis (Avis Vérifiés, Google), avec un lien.
- Les conditions de retour : un échantillon ou un flacon scellé, sous combien de jours.
- Le prix de la livraison sous 80 €.
- Les vraies séances de l'atelier.
- À noter dans « Ce qui manque encore ».
