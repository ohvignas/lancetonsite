# Fournil Odette — boucle persona, refonte, tour 2

- **Date** : mercredi 4 novembre 2026, vers 16 h 30
- **Page testée** : `commerce-odette/index.html`, servie par mon propre serveur Node statique sur le port **4360** (dossier `exemples/`, arrêté à la fin ; le 4331 n'a pas été touché). Chrome piloté par Playwright, horloge figée par script de test (surcharge de `Date`, hors page) au mercredi 4 novembre 16 h 10 sauf mention.
- **Regard indépendant : les rapports du relecteur n'ont pas été lus.** Lu avant de tester : `brief.md`, mon tour 1 (`refonte-tour-1.md`, 76/100, FIX-1 à FIX-18), `NOTES.md` § 10, `conventions.md` § 11, `niveau-agence.md` § 6, `retours-utilisateur-2026-11-04.md`.
- **Qui parle** : moi, Odette Ravel, 41 ans, boulangère rue de la Fuye, 25 000 € payés. Pour le parcours : Claire, 38 ans, quartier Velpeau, sur son téléphone le soir, qui trouve le levain « bon mais cher ».
- Captures : `boucle-persona/refonte-tour-2-captures/` (noms courts ci-dessous). Rien n'a été modifié dans la page, rien n'a été dépensé, rien n'a été envoyé.

---

## Partie 0 — Les FIX du tour 1, un par un

| FIX | Statut | Ce que j'ai vérifié |
|---|---|---|
| 1 — durée du levain | **fait** | Un seul schéma : levain rafraîchi la veille à 9 h, pâte pétrie à 15 h, façonnage 4 h, four 6 h 40, 45 min. 9 h → 7 h 25 = 22 h 25 ; « 22 heures » tient partout (établi l. 114, titre l. 210), la FAQ « rafraîchi le matin » est vraie. Mais le calage sur l'ouverture pose un nouveau problème (FIX-19). |
| 2 — pain au chocolat | **fait** | Rectangulaire, deux barres aux extrémités, un coupé : juste (`05-defil-boutique-bas.jpg`). |
| 3 — portrait d'Odette | **fait** | La quarantaine, cheveux bruns attachés, tablier fariné, four maçonné porte en fonte fermée. C'est moi. Très bien (`10-defil-equipe.jpg`, `41-375-equipe.jpg`). |
| 4 — carte de la farine | **à moitié** | Les repères 1, 2, 3 et les étiquettes 25 km / 14 km relient enfin la liste au dessin (`09-defil-farine.jpg`, `41-768-farine.jpg`, `41-360-carte.jpg`). Mais le dessin dit toujours faux : mon fournil (3) est une maison **à roue à aubes** au bord d'une rivière, et le chemin de 25 km va **de la ferme au fournil sans passer par le moulin**. La route de 14 km ajoutée en SVG est rouge et régulière, elle se voit rapportée. |
| 5 — burger à 360 | **fait** | Burger de x = 296 à 340 à 360, de 311 à 355 à 375 ; icône de sac à la place du mot (`01-premier-ecran-360.jpg`). |
| 6 — dimanche matin | **fait** | Dimanche 6 h et 7 h 15 : « Fermé, ouverture à 7 h 30 ». Testé sur 16 moments (tableau § 3). |
| 7 — seigle, noix, brioche | **fait** | Tourte sombre à croûte craquelée ; pain aux noix coupé, cerneaux dans la mie, noix à côté ; alt brioche « moulée ». Les alts disent ce que montrent les images. |
| 8 — images répétées | **fait, avec deux réserves** | Chaque fichier n'apparaît qu'une fois. Réserves : la tranche du journal (`seigle-tranche-290`) est la même tranche que la fiche boutique, recadrée ; l'étape 3 (`four-bouche-660`) est un recadrage de la fournée, **flou** (660 px affichés sur 780 px) et **le feu brûle à côté de la miche** (FIX-21). |
| 9 — erreurs qui restent | **fait** | Chaque erreur disparaît dès que le champ est juste ; l'erreur « pas cuit ce jour-là » part quand je passe au vendredi ; au refus, le focus va sur le « − » du pain aux noix, visible sous l'en-tête (y = 128 à 1440, 84 à 375). |
| 10 — panier après commande | **fait** | Après « C'est noté », panier vidé, `localStorage` = `{}`, rechargement à 0 ; « Nouvelle commande » remet la fiche à zéro et ramène à la boutique. Petit effet de bord : « À régler au comptoir 0,00 € » s'affiche juste au-dessus de « 22,60 € » (FIX-23). |
| 11 — premier écran | **fait** | « Miche d'un kilo 7,20 € », horaires avec le dimanche, photo jusqu'à 824 px à 1440 × 900 et 743 à 1280 × 800 (`01-premier-ecran-1440.jpg`, `-1280.jpg`). Le reste de fond (76 px) ne gêne pas. |
| 12 — chiffres de production | **fait** | « première fournée, 6 h 40 », farine « livrée chaque semaine », plus de « douze sacs ». |
| 13 — journal relié | **à moitié** | Titres en liens, « Tout le carnet » ajouté, atteints au clavier. Mais les quatre adresses répondent **404**, comme les trois liens légaux du pied (FIX-22). |
| 14 — « tous les jours » | **fait** | Pastilles « mardi – dimanche ». |
| 15 — pied de page | **à moitié** (le reste est **client**) | « Lundi fermé » présent ; liens légaux en `<a>` (404). Instagram et lettre du carnet : à fournir par moi. |
| 16 — apostrophes | **fait** | Plus aucune apostrophe droite dans le texte affiché (grep : seuls commentaires et code). |
| 17 — « Sorti du four » trop tôt | **fait, seuil faux** | Avant 6 h 40 : « Au four à 6 h 40 ». Mais 6 h 40 est l'heure d'**enfournement** dans la page : à 6 h 50 le site affiche « Sorti du four ce matin » alors que la miche cuit jusqu'à 7 h 25 (FIX-19). C'est mon propre conseil du tour 1 qui était mal calé. |
| 18 — vraies photos, avis | **client** | Inchangé, normal. |

Bilan : **12 faits, 4 à moitié, 2 client.** Le gros du tour 1 est réglé, et bien réglé.

---

## Partie 1 — Ce que j'ai fait et vu (test-report)

### 1. Les cinq premières secondes

**1440 × 900** (`01-premier-ecran-1440.jpg`). « Une miche le mardi, encore bonne le samedi », le chapô (levain, rue de la Fuye, commander avant 18 h, retirer le lendemain), « Commander pour demain », les horaires **avec le dimanche**, et trois repères dont **7,20 €** la miche d'un kilo. À droite, la croûte au crayon, « première fournée, 6 h 40, 240 °C ». Quoi, où, combien, quand, quoi faire : tout y est en une lecture. Le vide du tour 1 a disparu.

**1280** (`01-premier-ecran-1280.jpg`), **768** (`-768.jpg`), **375** (`-375.jpg`), **360** (`-360.jpg`) : même ordre, titre sur 2 ou 3 lignes, bouton, horaires, repères dans l'écran à 375 et 360. Rien de coupé. Seul détail : « 19 h 30 · dim. » se lit serré, le point médian colle presque.

### 2. Le défilement complet (1440 × 900)

Molette lente (≤ 300 px tous les 110 ms) avec arrêt à chaque section, puis trois coups de 4 200 px.

| Capture | Ce que je vois |
|---|---|
| `03-defil-fournee.jpg` | Ticket « Mercredi 4 novembre · première fournée, 6 h 40 », quatre produits avec vignette et prix, la pelle qui sort trois miches. Vivant. Toutes les vignettes chargées (le serveur Node ne coupe rien). |
| `04-defil-etabli.jpg` | Le collage : miche grignée, mains, croquis coté 22 cm / croûte 4 mm / 76 % d'eau, étiquette 7,20 € et 3,70 €. Toujours ma section préférée. |
| `05-defil-boutique.jpg`, `05-defil-boutique-bas.jpg` | Huit fiches, quatre filtres, « Voir mon panier ». Les nouvelles photos (noix, seigle, pain au chocolat) sont justes. **La miche de campagne, elle, est toujours une boule décorée au pochoir d'épis** : mon produit n° 1, le premier de la grille, ne ressemble pas à ma miche grignée du hero (FIX-20). |
| `06-defil-retrait.jpg` | Trois gestes, étiquette « Claire » : 7,20 + 2,80 = 10,00 €. Juste. |
| `07-fabrication-etape-1.jpg`, `-2.jpg`, `-3.jpg` | Épinglage 1/3 → 3/3 sans saut. Étape 2 : les nouveaux pâtons sur couche, beaux. Étape 3 (`07-defil-fabrication-2.jpg`) : flammes vives dans la chambre et une miche à la bouche, image molle (FIX-21). |
| `07-defil-fabrication-3.jpg`, `41-375-avis.jpg` | La mie plein cadre et les trois avis, marqués provisoires. |
| `09-defil-farine.jpg` | Liste numérotée 1-2-3 à gauche, carte numérotée à droite : on suit enfin. Mais le fournil a une roue à aubes et le blé saute le moulin (FIX-24). |
| `10-defil-equipe.jpg` | Le portrait juste, « au four dès 4 h », Odette / Inès / Malo, compteurs 280 et 450 (capturés en train de compter : 277, 446). |
| `11-defil-journal.jpg` | Sacs de farine à la une, pain au torchon, tranche de seigle, dates. « Tout le carnet→ » : la flèche colle au mot. |
| `12-defil-acces.jpg` | Adresse en titre, « Ouvert, jusqu'à 19 h 30 », la ligne du jour en valeur, la vitrine de Tours. Très bien. |
| `13-defil-questions.jpg`, `14-defil-commander.jpg`, `15-defil-pied.jpg` | Quatre questions ; commande en deux colonnes ; pied avec « Lundi fermé ». |
| `16-rapide-1..3.jpg` | En défilement rapide, rien ne clignote, rien ne cache l'action. |

**Le moment signature** (trait de crayon qui s'écrit sur la grigne, collage qui suit la souris, étapes épinglées) marche. Discret et juste pour une boulangerie.

### 3. Le parcours de Claire et l'horloge

**Parcours complet, à 1440 et à 375** (données de test, rien n'est envoyé) :

1. « Commander pour demain » du hero : titre de la boutique à y = 176 (1440) / 147 (375), sous l'en-tête (`20-1440-clic-hero.jpg`).
2. Envoi vide : 5 erreurs claires, focus sur « Choisir dans la boutique » (`21-1440-envoi-vide.jpg`).
3. Miche + 2 croissants + pain aux noix : pastille 4, annonce « Pain aux noix : 1. Panier : 4 articles, 15,40 € », l'erreur panier disparaît aussitôt (`22-1440-panier-rempli.jpg`). Barre mobile « Mon panier · 4 · 15,40 € ».
4. Filtres : week-end = brioche, crumble ; viennoiseries = 2 ; pains = 4 ; tout = 8 (`23-1440-filtre-week-end.jpg`).
5. « Voir mon panier », « Panier » de l'en-tête, barre collante, liens de nav et menu mobile : tous atterrissent titre visible sous l'en-tête (y = 147 à 176), à 1440 et 375 (`28-*`, `29-*`, `42-375-menu-ouvert.jpg`, `43-375-barre-collante.jpg`). *Note de méthode : un saut forcé par `scrollIntoView` dans mon script avant le clic faisait atterrir 1 000 px trop haut ; par la molette, comme une vraie personne, c'est juste. Pas un défaut de la page.*
6. Jeudi : « Cuit seulement mardi et vendredi. » sous le pain aux noix, l'erreur « jour » s'efface (`25-1440-jeudi-erreurs.jpg`). Créneau, prénom, e-mail : les erreurs s'effacent une à une.
7. Envoi jeudi refusé, focus sur le « − » du pain aux noix, visible (`26-1440-focus-apres-refus.jpg`, `26-375-focus-apres-refus.jpg`).
8. Vendredi : alerte et erreur panier parties. « + » miche : 14,40 + 2,80 + 5,40 = **22,60 €**. Juste.
9. Envoi : « C'est noté, Claire : 5 articles, 22,60 €, à retirer vendredi 6 novembre, 9 h – 12 h. Vous payez au comptoir. Nouvelle commande » (`27-1440-confirmation.jpg`). Trois défauts : la fiche affiche **« À régler au comptoir 0,00 € »** juste au-dessus ; la confirmation ne dit pas **quoi** (5 articles, lesquels ?) ni qu'un e-mail part ; « 9 h / – 12 h » se coupe en fin de ligne. Le focus tombe sur `body` (le bouton se désactive sous le doigt du clavier).
10. Rechargement : 0 article, `localStorage` `{}`. « Nouvelle commande » : fiche vide, retour boutique.

**Les prix concordent partout** (ticket, boutique, étiquette, sac, récapitulatif, confirmation).

**Horloge simulée** (16 moments, `45-fournee-*.jpg`, `46-acces-*.jpg`) :

| Moment | Titre fournée | Ticket | Statut | Premier jour proposé |
|---|---|---|---|---|
| Lundi 10 h | La fournée de mardi | fermé, prochaine fournée mardi 6 h 40 | Fermé, réouverture mardi à 7 h | mardi 10 |
| Lundi 17 h / 19 h | idem | idem | idem | mardi 10 / **mercredi 11** (après 18 h : juste, la FAQ le dit) |
| Dimanche 6 h | Au four à 6 h 40 | · au four à 6 h 40 | **Fermé, ouverture à 7 h 30** | mardi 10 |
| Dimanche 7 h 15 | Sorti du four ce matin | première fournée, 6 h 40 | Fermé, ouverture à 7 h 30 | mardi 10 |
| Dimanche 11 h | idem, brioche et crumble | idem | Ouvert, jusqu'à 12 h 30 | mardi 10 |
| Dimanche 13 h / 19 h | idem | idem | Fermé, réouverture mardi à 7 h | mardi 10 |
| Samedi 17 h 59 | idem, crumble | idem | Ouvert, jusqu'à 19 h 30 | **dimanche 8**, créneaux 7 h 30 – 10 h / 10 h – 12 h 30 |
| Samedi 18 h 05 | idem | idem | Ouvert | mardi 10 (dimanche exclu : juste) |
| Samedi 20 h | idem | idem | Fermé, réouverture dimanche à 7 h 30 | mardi 10 |
| Mardi 6 h 30 | Au four à 6 h 40 | au four à 6 h 40 | Fermé, ouverture à 7 h | mercredi 11 |
| **Mardi 6 h 50** | **Sorti du four ce matin** | première fournée, 6 h 40 | Fermé, ouverture à 7 h | mercredi 11 |
| Mardi 7 h | Sorti du four ce matin | idem | Ouvert, jusqu'à 19 h 30 | mercredi 11 |
| Jeudi 10 h | idem, **tourte de seigle** | idem | Ouvert | vendredi 6 |
| Mercredi 21 h | idem | idem | Fermé, réouverture demain à 7 h | vendredi 6 |

Toute la logique d'ouverture est juste. Reste un seul faux, de métier : **la page enfourne à 6 h 40** (étape 3 « 6 h 40, le four à sole, quarante-cinq minutes »), donc ma première miche sort à **7 h 25**, **après** l'ouverture de 7 h et en plein créneau 7 h – 9 h, et le site dit « Sorti du four » dès 6 h 40. Une boulangerie qui ouvre à 7 h a son premier pain sur les grilles avant 7 h. Un confrère le voit tout de suite (FIX-19).

### 4. Le clavier (60 tabulations depuis le haut, 1440)

44 arrêts puis la boucle repart (`50-clavier-tab-01.jpg` … `-45.jpg`). Ordre : « Aller au contenu » (pastille sombre par-dessus le logo, bien visible), logo, 5 liens, Panier, « Commander pour demain », « Réserver pour demain », 4 filtres, 8 « Ajouter », « Voir mon panier », **4 liens du journal** (nouveau), itinéraire, 4 questions, « Choisir dans la boutique », jour, prénom, e-mail, « Valider », 3 + 3 liens du pied, « Haut de page ». **Anneau braise de 3 px partout**, jamais sous l'en-tête. Les créneaux n'apparaissent qu'après le choix du jour : normal.

### 5. Le mouvement réduit

`30-reduit-page-entiere-1440.jpg` : page complète, 12,6 écrans, **0 élément invisible**, fabrication en trois colonnes, mêmes 779 mots. Bien.

### 6. L'œil du métier

**Les sept images refaites** (lues en taille réelle) :

| Image | Verdict de boulangère |
|---|---|
| `odette-900` | Juste : mon âge, mes cheveux, un four à sole maçonné porte fermée, une miche grignée en croix dans un torchon. |
| `pain-chocolat-640` | Juste : rectangulaire, deux barres, feuilletage visible. |
| `seigle-640` | Juste : tourte sombre, croûte craquelée farinée, mie brune serrée. |
| `noix-640` | Correct : cerneaux dans la mie, noix à côté. À la vignette, les cerneaux se lisent comme des trous ; acceptable. |
| `sacs-farine-1000` | Juste : sacs papier et sac de toile ouvert, pelle à farine, tomettes. Farine piquée de son, cohérente avec une T80. |
| `pain-torchon` | Juste, et l'article « Garder une miche six jours » dit la même chose que l'image. |
| `couche-1000` | Belle. Détail de métier : des pâtons **très blancs**, petits, en boules sur une toile plate, ça ressemble à une détente de pâte à pizza en T55 ; une miche T80 d'un kilo se façonne plus grosse, bise, souvent dans des bannetons ou des plis de couche. Acceptable en provisoire. |

**Ce qui reste faux à l'image** :

- **Carte** (`carte-farine.webp`) : fournil = moulin à roue à aubes au bord d'une rivière, avec cheminée qui fume ; le chemin de 25 km relie la ferme au fournil directement, un deuxième pointillé descend du haut vers le fournil sans partir de rien ; le moulin (2) n'est relié qu'au fournil. Le blé ne passe jamais par le moulin. L'utilisateur a demandé une illustration générée **soignée** : elle l'est, mais elle raconte un autre trajet que ma liste.
- **Étape 3** (`four-bouche-660`) : flammes et braises vives dans la chambre, une miche à la bouche. Dans un four à sole à chauffe directe, on retire la braise et on écouvillonne la sole **avant** d'enfourner. Et 660 px étirés à 780 px : c'est flou.
- **Miche de campagne** (`miche-640`, Unsplash) : boule au pochoir d'épis, croûte claire. Ce n'est ni ma grigne ni ma couleur, et c'est la première fiche de la boutique.
- **Crumble** : fond de verdure vive, lumière qui ne vient pas de la même boulangerie (déjà vu au tour 1, léger).

**Les chiffres et les mots** :

- 22 heures : tient (voir FIX-1). « Rafraîchi le matin ; pétrie à 15 h, la pâte lève toute la nuit » : treize heures de pointage au levain à température ambiante, la pâte serait morte au matin. Il manque « au frais » (et une température, c'est mon carnet : « au frais, à 6 °C ») — léger.
- Fournée : enfournement 6 h 40, sortie 7 h 25, ouverture 7 h : **faux** (FIX-19).
- Prix, poids, jours de cuisson, distances (Neuillé-Pont-Pierre 25 km, Monnaie 14 km) : justes et cohérents partout.
- « Modifiable jusqu'à 18 h la veille » : la page ne dit pas comment (pas de lien, pas de mention d'e-mail dans la confirmation) — léger.
- « La tourte de 800 g reprend jusqu'en mars » : « reprend » appelle « de… à » ; « est là chaque jeudi jusqu'en mars » — léger.
- Apostrophes et espaces insécables : bons partout, sauf dans les créneaux (« 9 h – 12 h » coupé au tiret dans la confirmation).
- `NOTES.md` § 10 dit avoir retiré « Quatre créneaux, deux le dimanche. » : la phrase est toujours l. 186 (et elle est juste). C'est le carnet de suivi qui se trompe, pas la page.

### 7. La densité (`conventions.md` § 11, script exact, 1440 × 900)

| Mesure | Animé | Mouvement réduit | Budget |
|---|---|---|---|
| Mots | **779** | 779 | 500 – 800 |
| Sections dans `main` | **13** | 13 | 10 – 13 |
| Écrans | 14,5 | 12,6 | ≈ 15 (12 – 18) |
| Par jour simulé | dimanche 787, lundi 785, jeudi 783, samedi 783 | | ≤ 800 |
| Téléphone | 17,5 (375) ; 18,3 (360) ; 15,9 (768) ; 15,0 (1280) | | |

Détail : en-tête 11, hero 65, fournée 36, établi 46, boutique 91, retrait 37, fabrication 59, avis 46, farine 47, équipe 49, journal 63, accès 41, questions 54, commande 86, pied 45. Aucun bloc au-delà de 3 phrases. Un visuel par section sauf questions et commande (permis). Toutes les sections attendues sont là. Ni maigre ni bavarde, et la marge sous 800 est mince (787 le dimanche) : toute phrase ajoutée doit en remplacer une.

### 8. Responsive (1440, 1280, 768, 375, 360)

Mesuré dans le navigateur puis vu à l'œil (`01-*`, `02-page-entiere-*`, `41-375-*`, `41-360-carte.jpg`, `41-768-*`) :

- Débordement horizontal : **0 px** aux cinq tailles.
- Titres : aucun coupé ni débordant. h1 64,8 px (1440), 57,6 (1280), 49,6 (768), 32,8 (375, 360) ; interlettrage `normal` sur Young Serif, rien de collé.
- Aucun texte sous 12 px. Cibles sous 24 px : seulement le lien « Choisir dans la boutique » (192 × 20, dans une phrase) ; les autres relevés sont des étiquettes de champ.
- Repères de la carte à 360 : pastilles 27 px, étiquettes 13 px, lisibles (`41-360-carte.jpg`).
- Menu mobile propre, aucun numéro de téléphone nulle part, barre collante qui devient « Mon panier · n · total ».

### 9. Console

Sur toutes les sessions (5 tailles, parcours, horloges, clavier, mouvement réduit) : **0 erreur de script, 0 requête échouée, 0 réponse ≥ 400** pendant le chargement. Avec le serveur Node, les `ERR_CONNECTION_RESET` du tour 1 ont disparu : c'était bien le serveur Python. Les seules 404 sont celles des liens qu'on clique (journal, pages légales).

---

## Partie 2 — Les notes (scores)

### Les 10 points

| # | Point | Résultat | Capture | Pourquoi |
|---|---|---|---|---|
| 1 | Page complète | **OK** | `30-reduit-page-entiere-1440.jpg` | 779 mots, 13 sections, toutes les sections attendues, 3 phrases au plus par bloc |
| 2 | Catalogue, articles | **OK** (réserve) | `05-*`, `11-defil-journal.jpg` | 8 fiches, prix, jours, panier, retrait, alerte de jour ; journal daté et lié. Réserve : les liens d'articles mènent à des 404 |
| 3 | Titres et promesse | **OK** | `01-premier-ecran-1440.jpg` | Concrets, ils vendent ; le prix est au premier écran |
| 4 | Typographie d'affichage | **OK** | `01-*` | Rien de collé à 1440 comme à 360 |
| 5 | Barre de navigation | **OK** | `01-premier-ecran-360.jpg`, `42-375-menu-ouvert.jpg` | Logo, 5 liens, panier, burger entier à 360, aucun téléphone |
| 6 | Blocs d'action | **OK** | `14-defil-commander.jpg` | Deux colonnes, réassurance à gauche, fiche à droite |
| 7 | Hero équilibré | **OK** | `01-premier-ecran-1440.jpg`, `-1280.jpg` | Texte, photo et action se répondent, plus de bande vide, prix et dimanche présents |
| 8 | Responsive | **OK** | `01-*`, `02-*`, `41-*` | 0 débordement, aucun titre cassé aux 5 tailles |
| 9 | Images et vidéos | **Pas OK** (moyen) | `09-defil-farine.jpg`, `07-defil-fabrication-2.jpg`, `05-defil-boutique.jpg` | Des photos partout, et les erreurs grossières du tour 1 sont corrigées. Restent : carte où le fournil est un moulin et où le blé saute le moulin ; four en flammes et flou à l'étape 3 ; miche n° 1 au pochoir |
| 10 | 3D produit | sans objet | — | Pas d'objet 3D |

### La grille sur 100 (`niveau-agence.md` § 6)

| Critère | Points | Tour 1 | **Tour 2** | Pourquoi |
|---|---|---|---|---|
| Direction artistique | 15 | 13 | **13** | Le carnet de fournil se reconnaît sans le logo (ticket, croquis coté, étiquette, trait de crayon, une note manuscrite par écran). Inchangé : le « sac » reste une boîte plate, la miche au pochoir et le crumble sur verdure tirent vers d'autres boulangeries. |
| Images | 15 | 9 | **11** | Gros progrès : Odette, pain au chocolat, seigle, noix, sacs, torchon, pâtons sont justes, plus aucune photo répétée. Restent trois images fausses pour un œil de métier, dont la carte demandée par l'utilisateur et la première fiche de la boutique ; l'étape 3 est floue. |
| Mise en page | 15 | 12 | **13** | Premier écran plein et équilibré, collage, mie plein cadre, étapes épinglées, boutique propre. Toujours cinq sections de suite en « texte à gauche, visuel à droite » ; respiration un peu large sous le ticket de la fournée. |
| Mouvement | 10 | 8 | **8** | Trait qui s'écrit, collage en profondeur, épinglage avec compteur, parallaxe, compteurs ; rien ne clignote ; mouvement réduit complet. Toujours pas de geste à l'ajout au panier (seule la pastille change). |
| Clarté en 5 s et action | 10 | 8 | **9** | Quoi, où, combien, quand, quoi faire : tout au premier écran, un bouton fort. |
| Densité | 5 | 5 | **5** | 779 mots, 13 sections, comptage fourni. Aucune pénalité. |
| Preuves et objections, aucune fausse donnée | 10 | 6 | **7** | Toutes les objections du brief traitées ; levain, production et horaires désormais cohérents. Reste un faux de métier : la première fournée sort après l'ouverture et le site dit « sorti du four » pendant qu'elle cuit ; pointage de 13 h sans froid. Avis provisoires (signalés). |
| Textes | 10 | 8 | **9** | Titres forts, voix sobre, alts conformes aux images, apostrophes justes. Petits accrocs : « reprend jusqu'en mars », « Modifiable » sans dire comment, créneau coupé au tiret. |
| Mobile, accessibilité, légèreté | 10 | 7 | **9** | Burger entier, erreurs qui s'effacent, panier vidé, focus visible partout, 0 débordement, 0 erreur console. Restent : 7 liens en 404, focus perdu sur `body` après la confirmation, « 0,00 € » affiché à côté de la confirmation. |
| **Total** | **100** | **76** | **84** | |

**Note sur 10 : 8,4.**

**Seuil qui s'applique : 85** (maquette aux médias provisoires : photos de banque, images générées, avis à recueillir). Il manque **1 point**.

**Ce qui est atteignable sans le vrai client** : les FIX à 0 $ (19, 22, 23, 25 à 28) remontent Preuves à 8, Mobile à 10, Textes à 10 : **≈ 88**. Avec environ **0,15 $** de génération (FIX-20 miche, FIX-21 four ; FIX-24 carte en option à 0,06 $), Images monte à 12-13 : **89 à 90**. Au-delà de 90, il faut le vrai client : reportage au fournil (moi, Inès, Malo, le four, les huit produits sur le même bois), trois avis signés, le compte Instagram.

« Cette fois, c'est moi sur la photo, mes pains au chocolat sont des pains au chocolat, et Claire commande sa miche du vendredi sans se perdre dans des erreurs : la structure et le parcours valent ce que j'ai payé. Mais je ne peux pas écrire que ma fournée sort du four à 6 h 50 quand elle y entre à 6 h 40 et que j'ouvre à 7 h, ni montrer un fournil à roue à aubes et un feu qui brûle à côté de mes miches. Ce sont trois détails, mais ce sont les détails de mon métier. »

Verdict : Pas encore — à 84, il manque un point : la première fournée sort après l'ouverture alors que le site l'annonce « sortie du four », et trois images restent fausses pour un boulanger (carte où le fournil est un moulin, four en flammes, miche au pochoir). Tout se corrige pour moins de 0,20 $.

---

## Partie 3 — Le plan de corrections restant (fix-plan)

Numérotation à la suite du tour 1. Lignes de `index.html` au 4 novembre, 16 h.

| FIX | Gravité | Coût | Résumé |
|---|---|---|---|
| FIX-19 | **majeur** | **0 $** | Première fournée enfournée à 6 h 40, sortie 7 h 25, après l'ouverture de 7 h ; « Sorti du four » affiché pendant la cuisson |
| FIX-20 | moyen | **génération** ≈ 0,03 $ | Miche de campagne (fiche n° 1) : boule au pochoir d'épis, pas ma miche grignée |
| FIX-21 | moyen | **génération** ≈ 0,06 $ | Étape 3 : flammes dans la chambre pendant la cuisson, recadrage flou |
| FIX-22 | moyen | **0 $** | 7 liens en 404 (3 articles, « Tout le carnet », 3 pages légales) |
| FIX-23 | moyen | **0 $** | Confirmation : « 0,00 € » affiché au-dessus, pas de détail des articles, focus perdu, créneau coupé |
| FIX-24 | moyen | **0 $** (option **génération** ≈ 0,06 $) | Carte : fournil à roue à aubes, blé qui saute le moulin, route SVG visible comme rapportée |
| FIX-25 | léger | **0 $** | « lève toute la nuit » : préciser « au frais, à 6 °C » |
| FIX-26 | léger | **0 $** | « Modifiable jusqu'à 18 h la veille » sans dire comment |
| FIX-27 | léger | **0 $** | « reprend jusqu'en mars », « Tout le carnet→ » collé |
| FIX-28 | léger | **0 $** | `NOTES.md` § 10 inexact (phrase des créneaux dite retirée, toujours là) |
| FIX-15 (reste) | léger | **client** | Instagram et inscription au carnet dans le pied |
| FIX-18 | moyen | **client** | Reportage photo au fournil, avis signés |

Total génération estimé : **≈ 0,09 $** (0,15 $ avec l'option carte), FLUX.2 Pro au tarif de `NOTES.md` § 5. Rien n'a été dépensé pendant ce test.

### FIX-19 — L'heure de la première fournée (majeur, 0 $)

- **Quoi** : l'étape 3 met l'enfournement à 6 h 40 pour 45 minutes, donc la sortie à 7 h 25, alors que j'ouvre à 7 h et que le premier créneau de retrait est 7 h – 9 h. Le ticket passe à « Sorti du four ce matin » dès 6 h 40 (testé mardi 6 h 50).
- **Où** : `index.html` l. 228-232 (étape 3), l. 72 (note du hero), l. 99 et l. 555, 558-561 (ticket et seuil `avant`).
- **Comment** : garder 6 h 40 comme heure de **sortie**, partout. Étape 3 : `<p class="heure">5 h 55</p>` et « Quarante-cinq minutes sur la pierre, à 240 °C ; la première fournée sort à 6 h 40. » Note du hero : « première fournée sortie à 6 h 40, 240 °C » (ou garder le texte, il devient vrai). Levain 9 h → 6 h 40 = 21 h 40 : « 22 heures » reste juste. Le seuil `h < 6 + 40 / 60` devient correct ; changer seulement le libellé « au four à 6 h 40 » en « sortie du four à 6 h 40 » (l. 560-561) et le lundi « Prochaine fournée mardi, 6 h 40 » reste bon.

### FIX-20 — La miche de campagne (moyen, ≈ 0,03 $)

- **Quoi** : `images/miche-640.webp` montre des boules décorées au pochoir d'épis, croûte claire : style « décor », pas la miche grignée du hero ni celle du portrait.
- **Où** : `images/miche-640.webp` ; `index.html` l. 435 (alt « Miche de campagne ronde, croûte farinée »).
- **Comment** : générer en 4:5 (640 × 800) au style commun des fiches : « round 1 kg French country sourdough miche, T80 flour, single long curved ear scoring, deep caramel bake, floury, on an oak board in a bakery, window light ». Vérifier à l'œil : une seule grigne, pas de pochoir. Alt : « Miche de campagne d'un kilo, grigne ouverte, croûte bien cuite ».

### FIX-21 — L'étape « four à sole » (moyen, ≈ 0,06 $)

- **Quoi** : `four-bouche-660` (recadrage de la fournée) montre des flammes et des braises vives dans la chambre, une miche à la bouche ; affichée à ~780 px de large, l'image est molle.
- **Où** : `index.html` l. 237 ; `images/four-bouche-660.webp`.
- **Comment** : générer 1400 × 933 (et 1000 en `srcset`) : « interior of a masonry wood-fired deck oven, fire removed, clean stone hearth with rows of round sourdough loaves baking, long wooden peel, warm glow, no flames ». Alt : « Miches qui cuisent sur la sole du four, la braise retirée ». Puis retirer `four-bouche-660` du dossier.

### FIX-22 — Les liens morts (moyen, 0 $)

- **Quoi** : `journal/index.html`, `journal/farine-recolte-2026.html`, `journal/garder-une-miche.html`, `journal/le-seigle-revient.html`, `mentions-legales.html`, `conditions-de-retrait.html`, `confidentialite.html` : 404.
- **Où** : `index.html` l. 315, l. 415, l. 587 (gabarit des articles).
- **Comment** : créer un gabarit d'article minimal (même en-tête, même pied, titre, date, image, deux paragraphes tirés de `JOURNAL`) et trois pages légales courtes marquées « à compléter » ; ou, à défaut, un seul `a-venir.html` vers lequel pointent ces liens. Une maquette qu'on clique ne doit pas répondre « 404 ».

### FIX-23 — La confirmation (moyen, 0 $)

- **Quoi** : après l'envoi, « À régler au comptoir **0,00 €** » s'affiche juste au-dessus de « 22,60 € » ; la confirmation ne liste pas les articles et ne dit pas qu'un e-mail part ; le focus tombe sur `body` ; « 9 h – 12 h » se coupe au tiret.
- **Où** : `index.html` l. 377 (total), l. 449 (`CRENEAUX`), l. 667-681 (envoi).
- **Comment** : construire le texte **avant** de vider le panier, avec les lignes (« 2 miches, 2 croissants, 1 pain aux noix ») ; masquer `.total` et `#recap` tant que la confirmation est affichée (ou garder la commande affichée en lecture seule) ; ajouter « Un récapitulatif part à claire@… » ; `conf.tabIndex = -1; conf.focus()` après affichage ; dans `CRENEAUX`, mettre des espaces insécables autour du tiret (`"9 h – 12 h"`).

### FIX-24 — La carte de la farine (moyen, 0 $ ; option ≈ 0,06 $)

- **Quoi** : les repères relient bien liste et dessin, mais le fournil (3) est une maison à roue à aubes au bord de la rivière, le blé va de la ferme au fournil sans passer par le moulin, un second pointillé descend vers le fournil sans origine, et la route rouge de 14 km se voit ajoutée.
- **Où** : `index.html` l. 273-283 ; `odette.src.css` (`.carte-route`, `.carte-num`, `.carte-km`) ; `images/carte-farine.webp`.
- **Comment, à 0 $** : redessiner le trajet en SVG au même brun et au même pointillé que le dessin (pas en rouge) : ferme (1) → moulin (2), puis moulin (2) → fournil (3), et masquer le pointillé direct ferme → fournil et celui qui descend du haut sans origine (deux caches couleur papier, ou un `clip-path`). Garder les distances de la liste (25 km reste la distance ferme-fournil, dite dans le titre) en étiquetant les tronçons « blé » et « farine, 14 km ». Poser sur la roue du fournil un petit cartouche HTML « Tours ». **Option génération (conseillée)** : refaire P1 avec « the bakery is a small town shopfront among slate roofs of Tours, cathedral twin towers in the distance, NO water wheel at the bakery ; single dotted route farm → water mill on a stream → town ; only one water wheel on the whole map ; no text », puis replacer les repères.

### FIX-25 — Le pointage (léger, 0 $)

- **Où** : `index.html` l. 221.
- **Comment** : « Rafraîchi le matin ; pétrie à 15 h, la pâte pousse la nuit au frais, à 6 °C. » (vérifier le compte de mots : +2).

### FIX-26 — « Modifiable » (léger, 0 $)

- **Où** : `index.html` l. 366, l. 669.
- **Comment** : soit « Modifiable par retour d'e-mail jusqu'à 18 h la veille », soit le dire dans la confirmation. Sinon, retirer la promesse.

### FIX-27 — Deux accrocs de texte (léger, 0 $)

- **Où** : `index.html` l. 447 ; l. 315.
- **Comment** : « La tourte de 800 g, chaque jeudi jusqu'en mars. » ; « Tout le carnet » : ajouter `gap-1` (ou `&nbsp;`) sur le lien `inline-flex`, l'espace avant la flèche y est avalé.

### FIX-28 — Le carnet de suivi (léger, 0 $)

- **Où** : `NOTES.md` § 10, ligne « Mots retirés pour tenir le plafond ».
- **Comment** : la phrase « Quatre créneaux, deux le dimanche. » est toujours à `index.html` l. 186 (et les 779 mots la comptent). Corriger la note, pas la page.

### FIX-15 (reste) et FIX-18 — Ce que seule Odette peut fournir (client)

Instagram réel et décision d'une lettre du carnet (pied de page) ; reportage photo au fournil (moi, Inès, Malo, le four à sole, les huit produits sur le même bois) ; trois avis signés. C'est ce qui sépare 88-90 du 90 du site construit.
