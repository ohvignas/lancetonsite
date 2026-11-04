# Fournil Odette — boucle persona, refonte, tour 3 (dernier)

- **Date** : mercredi 4 novembre 2026, fin d'après-midi
- **Page testée** : `commerce-odette/index.html`, plus `journal/index.html` et `mentions-legales.html`, servis par mon propre serveur Node statique sur le port **4383** (dossier `exemples/`, arrêté à la fin ; ni le 4331 ni Python). Chrome (canal `chrome`) piloté par Playwright. L'horloge est décalée par un script de test (surcharge de `Date` qui **avance** avec le temps, hors page), au mercredi 4 novembre 16 h 10 sauf mention. *Note de méthode : un premier essai avec `page.clock.setFixedTime` figeait `Date.now`, donc GSAP, et le hero restait vide. C'était un artefact du test, pas un défaut de la page. Toutes les captures ont été refaites avec l'horloge qui avance.*
- **Regard indépendant : les rapports du relecteur n'ont pas été lus.** Lu avant de tester : `brief.md`, mon tour 2 (`refonte-tour-2.md`, 84/100, FIX-19 à FIX-28), `NOTES.md` § 11, `conventions.md` § 11, `boucle-persona.md`, `niveau-agence.md` § 6.
- **Qui parle** : moi, Odette Ravel, 41 ans, boulangère rue de la Fuye, 25 000 € payés. Pour le parcours, Claire, 38 ans, quartier Velpeau, sur son téléphone le soir, qui veut sa miche du vendredi et trouve le levain « bon mais cher ».
- Captures : `boucle-persona/refonte-tour-3-captures/` (noms courts ci-dessous). Je n'ai rien modifié dans la page, rien dépensé et rien envoyé.

---

## Partie 0 — Les FIX du tour 2, un par un

| FIX | Statut | Ce que j'ai vérifié |
|---|---|---|
| 19 — heure de la première fournée (majeur) | **fait** | 6 h 40 est partout l'heure de **sortie** : note du hero « première fournée, sortie à 6 h 40 » (`01-premier-ecran-1440.jpg`), étape 3 « 5 h 55 – 6 h 40 », quarante-cinq minutes à 240 °C (`07-defil-fabrication-etape-3.jpg`). Horloge : mardi 6 h 30, « Sortie du four à 6 h 40 » ; mardi 6 h 50, « Sorti du four ce matin » (c'est vrai maintenant) ; lundi, « Prochaine fournée mardi, 6 h 40 » (`45-fournee-*.jpg`). Levain rafraîchi la veille à 8 h : 8 h → 5 h 55 = 21 h 55 « du levain au four », 8 h → 6 h 40 = 22 h 40 « du levain à la grille ». Les deux « 22 heures » tiennent. Mon pain est sur les grilles avant que j'ouvre. |
| 20 — miche de campagne | **fait** | Une boule farinée aux cercles de banneton, **une seule grigne** longue et bien ouverte, croûte caramel dans la grigne, sur une planche de chêne près d'une fenêtre (`73-miche-640-taille-reelle.png`, `05-defil-boutique.jpg`). C'est une miche de boulanger. L'alt dit ce que montre l'image. |
| 21 — étape « four à sole » | **fait** | Porte en fonte ouverte, douze miches grignées qui dorent sur la sole, **aucune flamme**. L'image est nette en 1000 px (`07-defil-fabrication-etape-3.jpg`). Réserve, nouvelle : la photo de la **fournée** (section 2) montre toujours un feu de bois vif dans le four pendant qu'on défourne (FIX-30). |
| 22 — liens en 404 | **fait** | Les 7 liens répondent 200 et les ancres existent (`farine-recolte-2026`, `garder-une-miche`, `le-seigle-revient`, `retrait`, `donnees`). Le clic sur « Garder une miche six jours » pose l'article à y = 104, sous l'en-tête (`61-journal-ancre-garder.jpg`). Les deux pages sont propres à 1440 comme à 360, avec 0 px de débordement (`60-*.jpg`). Les mentions laissent des « [à fournir] » : SIRET, hébergeur, règle de la commande non retirée. Ça, c'est à moi de le donner. |
| 23 — confirmation | **à moitié** | Le texte est exactement ce que je voulais : « C'est noté, Claire : 2 miches de campagne, 1 pain aux noix, 2 croissants, 22,60 € à régler au comptoir, à retirer vendredi 6 novembre, 9 h – 12 h. Le récapitulatif part à claire@exemple.fr ; pour modifier, répondez-y avant 18 h la veille. » Le « 0,00 € » a disparu, le focus va sur la confirmation, le créneau ne se coupe plus. **À 1440, parfait** (`27-1440-confirmation.jpg`). **Au téléphone, la confirmation sort de l'écran** : la fiche se replie, la page remonte jusqu'à son maximum et Claire ne voit que le pied de page (`28-375-apres-valider.jpg`, `28-360-…`, `28-375-reduit-…`). C'est FIX-29. |
| 24 — carte de la farine | **fait (version 0 $)** | La roue à aubes du fournil est effacée, le blé va de la ferme (1) au moulin (2), puis la farine du moulin au fournil (3), en pointillé brun du dessin. Plus de route rouge rapportée. Étiquettes « le blé » et « la farine, 14 km », réduites à « 14 km » sous 768 px (`09-defil-farine.jpg`, `41-360-farine.jpg`, `72-carte-farine-taille-reelle.png`). Le trajet dit enfin la même chose que ma liste. Reste, en léger : mon fournil est une maisonnette de campagne au bord d'une rivière, avec une **pseudo-enseigne illisible** sur la façade (FIX-32). |
| 25 — pointage | **fait** | « Rafraîchi le matin ; pétrie à 15 h, la pâte lève la nuit à 6 °C. » Le froid y est. |
| 26 — « Modifiable » | **fait** | « Modifiable par e-mail jusqu'à 18 h la veille » ; la confirmation et la page légale (#retrait) disent comment. |
| 27 — deux accrocs | **fait** | « La tourte de 800 g, jusqu'en mars. » ; « Tout le carnet → » avec son espace (`11-defil-journal.jpg`). |
| 28 — carnet de suivi | **fait** | § 10 corrigé. Nouvelle petite inexactitude au § 5 (FIX-34). |
| 15 (reste), 18 | **client** | Instagram, lettre du carnet, reportage au fournil, avis signés : inchangé. C'est normal. |

Bilan : **8 faits, 1 fait en version 0 $ avec un reste léger, 1 à moitié, 2 client.** Le défaut de métier majeur du tour 2 (la fournée) est réglé, et bien réglé.

---

## Partie 1 — Ce que j'ai fait et vu (test-report)

### 1. Les cinq premières secondes

**1440 × 900** (`01-premier-ecran-1440.jpg`) : « Une miche le mardi, encore bonne le samedi », le chapô (levain, rue de la Fuye, avant 18 h, retrait le lendemain), « Commander pour demain », les horaires avec le dimanche et un point médian qui respire maintenant, puis 7,20 € / à 25 km / six jours. À droite, la croûte avec le trait de crayon « première fournée, sortie à 6 h 40 ». Quoi, où, combien, quand, quoi faire : tout se lit d'un coup d'œil.

**1280** (`-1280.jpg`) : même équilibre, bouton à y = 478. **768** (`-768.jpg`) : photo en tête, titre sur deux lignes, bouton et horaires sur une ligne. La note au crayon devient petite mais reste lisible. **375 / 360** (`-375.jpg`, `-360.jpg`) : titre sur trois lignes, bouton à y = 585 / 575, horaires et repères dans l'écran. Burger entier (296–340 à 360, 311–355 à 375).

### 2. Le défilement complet (1440 × 900)

Molette lente (≤ 280 px toutes les 110 ms, arrêt à chaque section), puis trois coups de 4 200 px.

| Capture | Ce que je vois |
|---|---|
| `03-defil-fournee.jpg` | Ticket « Mercredi 4 novembre · première fournée, 6 h 40 », quatre produits avec vignette et prix, la pelle qui sort trois miches. À 1440, le cadrage portrait cache presque tout le feu ; au téléphone, l'image est en 3:2 entière (`odette.src.css` l. 134) et **le feu de bois brûle au fond pendant qu'on défourne** (`70-trois-fours-…png`, à droite). |
| `04-defil-etabli.jpg` | Collage miche grignée en épi, mains, croquis coté 22 cm / croûte 4 mm / 76 % d'eau, étiquette 7,20 € et 3,70 €. « Soit 1,20 € par jour. » : plus court et plus fort. Toujours ma section préférée. |
| `05-defil-boutique.jpg` | Huit fiches et quatre filtres. La nouvelle miche ouvre enfin la grille avec la bonne grigne. **La demi-miche (fiche 2) est un recadrage de la photo de mie plein cadre** de la section avis (`71-demi-miche-et-mie-meme-photo.png`) : la même photo deux fois, à cinq écrans d'écart (FIX-31). |
| `06-defil-retrait.jpg` | Trois gestes, étiquette « Claire » : 7,20 + 2,80 = 10,00 €. Juste. |
| `07-defil-fabrication.jpg`, `-etape-2.jpg`, `-etape-3.jpg` | Épinglage 1/3 → 3/3 sans saut. Étape 3 : la porte ouverte, sans flamme, nette. |
| `08-defil-avis.jpg`, `16-rapide-2.jpg` | La mie plein cadre, citation de Claire marquée provisoire. |
| `09-defil-farine.jpg` | Liste 1-2-3 et carte 1-2-3 : le trajet est juste. |
| `10-defil-equipe.jpg` | Le portrait juste, « au four dès 4 h », Odette / Inès / Malo, compteurs (capturés en train de compter : 279, 449). |
| `11-defil-journal.jpg` | Sacs de farine à la une, torchon, tranche de seigle, dates, « Tout le carnet → ». |
| `12-defil-acces.jpg` | Adresse en titre, « Ouvert, jusqu'à 19 h 30 », ligne du jour en valeur, vitrine en tuffeau. |
| `13-defil-questions.jpg`, `14-defil-commander.jpg`, `15-defil-pied.jpg` | Quatre questions ; commande en deux colonnes, réassurance à gauche ; pied avec « Lundi fermé » et les liens légaux, qui marchent. |
| `16-rapide-1..3.jpg` | En défilement rapide, rien ne clignote et rien ne cache l'action. |

**Le moment signature** (le trait de crayon qui s'écrit sur la grigne, le collage qui suit la souris, les étapes épinglées) marche. S'y ajoute un petit rebond de la pastille du panier à chaque ajout, présent seulement quand le mouvement est permis (`.rebond` sous `html.motion`, vu dans le code et dans le changement de la pastille).

### 3. Le parcours de Claire

**À 1440 et à 375**, avec des données de test et sans rien envoyer (`20-*` à `27-*`) :

1. « Commander pour demain » dans le hero : le titre de la boutique tombe à y = 176 (1440) / 147 (375), sous l'en-tête. L'en-tête se cache en descendant et revient au moindre geste vers le haut : bon réflexe.
2. « Panier » dans l'en-tête, puis envoi vide : **5 erreurs claires**, focus sur « Choisir dans la boutique » (`21-*`).
3. Miche, 2 croissants, pain aux noix : pastille 4, annonce « Pain aux noix : 1. Panier : 4 articles, 15,40 € », barre mobile « Mon panier · 4 · 15,40 € » (`22-*`).
4. Filtres : week-end = brioche, crumble ; viennoiseries = 2 ; pains = 4 ; tout = 8 (`23-*`).
5. « Voir mon panier » (1440) et barre collante (375) : le titre de la commande tombe à y = 88 – 175 selon l'élan, toujours visible (`29-1440-voir-mon-panier-essai-*.jpg`).
6. Jours proposés le mercredi 16 h 10 : jeudi 5 → jeudi 12, lundi exclu. Jeudi : « Cuit seulement mardi et vendredi. » sous le pain aux noix (`24-*`). Envoi refusé, focus sur le « − » du pain aux noix (`25-*`).
7. Vendredi 6, 9 h – 12 h, + miche : 14,40 + 5,40 + 2,80 = **22,60 €** (`26-*`). Aucune erreur restante.
8. **Envoi** :
   - **1440** (`27-1440-confirmation.jpg`) : la fiche ne montre plus que la confirmation détaillée, le focus est dessus, la touche Tab va sur « Nouvelle commande ». Panier vidé, `localStorage` = `{}`, pastille 0. Très bien.
   - **375, 360 et 375 en mouvement réduit** (`28-375-avant-valider.jpg` → `28-375-apres-valider.jpg`) : Claire touche « Valider ma commande » au bas de la fiche. La fiche se replie d'environ 900 px, la page reste collée à son bas et la confirmation se retrouve **113 px au-dessus du haut de l'écran** (confirmation de y = −356 à −113 à 375, de −376 à −106 à 360, avec `scrollY` au maximum). À l'écran, il ne reste que le pied de page, la pastille repassée à 0 et la barre qui redit « Commander pour demain ». Claire ne sait pas si c'est passé, et elle risque de recommander. C'est le geste qui doit me rapporter mes 60 réservations par semaine (FIX-29, **majeur**, 0 $).
9. Rechargement : 0 article, `{}`. « Nouvelle commande » remet la fiche à zéro (jour, prénom, total 0,00 €) et ramène à la boutique (titre à y = 176). Un ajout après une commande rouvre la fiche et garde le jour, le créneau et le prénom. Pratique.

**Les prix concordent partout** : ticket, boutique, étiquette de l'établi, sac, récapitulatif, confirmation, page du carnet (« 6,80 € » pour la tourte).

**Horloge simulée** (12 moments, `45-fournee-*.jpg`) :

| Moment | Titre fournée | Ticket | Statut | Premier jour proposé | Mots |
|---|---|---|---|---|---|
| Lundi 10 h | La fournée de mardi | fermé. Prochaine fournée mardi, 6 h 40 | Fermé, réouverture mardi à 7 h | mardi 10 | 783 |
| Mardi 6 h 30 | **Sortie du four à 6 h 40** | sortie à 6 h 40 | Fermé, ouverture à 7 h | mercredi 11 | 783 |
| Mardi 6 h 50 | Sorti du four ce matin | première fournée, 6 h 40 | Fermé, ouverture à 7 h | mercredi 11 | 781 |
| Mardi 7 h 05 | idem | idem | Ouvert, jusqu'à 19 h 30 | mercredi 11 | 781 |
| Jeudi 10 h | idem, **tourte de seigle** | idem | Ouvert | vendredi 6 | 781 |
| Samedi 17 h 59 | idem, crumble | idem | Ouvert | **dimanche 8** | 781 |
| Samedi 18 h 05 | idem | idem | Ouvert | mardi 10 (dimanche exclu : juste) | 781 |
| Samedi 20 h | idem | idem | Fermé, réouverture dimanche à 7 h 30 | mardi 10 | 783 |
| Dimanche 6 h | Sortie du four à 6 h 40 | sortie à 6 h 40 | Fermé, ouverture à 7 h 30 | mardi 10 | 788 |
| Dimanche 11 h | Sorti du four ce matin, brioche et crumble | première fournée | Ouvert, jusqu'à 12 h 30 | mardi 10 | 785 |
| Dimanche 13 h | idem | idem | Fermé, réouverture mardi à 7 h | mardi 10 | 786 |
| Mercredi 21 h | idem | idem | Fermé, réouverture demain à 7 h | vendredi 6 (après 18 h : juste) | 778 |

Toute la logique d'horaires et de fournée est juste. Plus aucun faux de métier dans les heures.

### 4. Le clavier (60 tabulations depuis le haut, 1440)

44 arrêts, puis la boucle repart (`50-clavier-tab-*.jpg`) : « Aller au contenu », logo, 5 liens, Panier, « Commander pour demain », « Réserver pour demain », 4 filtres, 8 « Ajouter », « Voir mon panier », 3 articles et « Tout le carnet », itinéraire, 4 questions, « Choisir dans la boutique », jour, prénom, e-mail, « Valider », 3 + 3 liens du pied, « Haut de page ». **Anneau braise de 3 px (#e2773f) sur chaque arrêt, chaque arrêt dans l'écran, aucun sous l'en-tête.** Les créneaux n'apparaissent qu'après le choix du jour, ce qui est normal. Après la confirmation, Tab va sur « Nouvelle commande ».

### 5. Le mouvement réduit

`30-reduit-page-entiere-1440.jpg` : page complète, 12,6 écrans, **0 élément invisible**, 777 mots (les mêmes qu'en version animée). Seules animations en cours : les transitions CSS des « + » de la FAQ, ce qui est acceptable. `31-reduit-page-entiere-375.jpg` : 769 mots, 17,8 écrans, complet. Le défaut de confirmation du téléphone existe aussi en mouvement réduit (`28-375-reduit-apres-valider.jpg`).

### 6. L'œil du métier

**Les deux images refaites et la carte** (lues en taille réelle) :

| Image | Verdict de boulangère |
|---|---|
| `miche-640` | Juste : une seule grigne qui s'ouvre en oreille, cercles de banneton, farine, planche de chêne. Ma miche. |
| `four-bouche-1000` | Juste : porte en fonte, sole de pierre, miches grignées qui dorent, braise retirée. Nette. |
| `carte-farine` | Trajet juste (ferme → moulin → fournil), une seule roue (au moulin). Le fournil reste une maisonnette de campagne au bord de l'eau, avec une enseigne en fausses lettres (visible en taille réelle, à peine à l'écran). |

**Ce qui reste faux ou faible à l'image** :

- **La fournée** (`four-1400`, section 2) : un feu de bois vif brûle dans la chambre pendant qu'on défourne trois miches. Dans un four à sole à chauffe directe, on retire la braise et on écouvillonne avant d'enfourner : un confrère le voit tout de suite. En plus, la page montre maintenant **trois fours différents** (`70-trois-fours-…png`) : maçonné à porte en fonte derrière moi, briques rouges à porte en fonte à l'étape 3, voûte en tuffeau sous une hotte avec feu ouvert à la fournée. Les deux premiers peuvent passer pour le même four, pas le troisième. L'alt est honnête (« braises au fond »), mais il avoue l'erreur (FIX-30).
- **Demi-miche = mie plein cadre** : même photo Unsplash, deux recadrages (`71-…png`). `NOTES.md` § 5 le dit l. 108, puis l. 128 annonce « 1 recadrage (seigle-tranche-290) » (FIX-31, FIX-34).
- **Crumble** sur fond de verdure et **pâtons très blancs** de l'étape 2 : déjà notés, légers, inchangés.
- **Page du carnet** (`60-journal-1440.jpg`) : le troisième article prend la tourte entière en portrait (`seigle-640`, 640 × 800) ; il est plus haut et plus étroit que les deux autres et casse le rythme. C'est aussi la même photo que la fiche boutique (FIX-33).

**Les chiffres et les mots** : 22 heures, 6 h 40, 240 °C, 6 °C, 76 %, 22 cm, 4 mm, 25 km et 14 km, prix, poids, jours de cuisson, créneaux. Tout est cohérent d'un bloc à l'autre et avec la page du carnet. Apostrophes typographiques et espaces insécables : justes, confirmation comprise. Un seul détail de goût, que je ne compte pas : le samedi à 20 h, le titre dit encore « Sorti du four ce matin ».

### 7. La densité (`conventions.md` § 11, `/tmp/claude-501/compte-pane.js`, 1440 × 900, images chargées, 3,2 s d'attente)

| Mesure | Animé | Mouvement réduit | Budget |
|---|---|---|---|
| Mots | **777** | 777 | 500 – 800 |
| Sections dans `main` | **13** | 13 | 10 – 13 |
| Écrans | 14,5 | 12,6 | ≈ 15 (12 – 18) |
| Par jour simulé | de 778 (mercredi 21 h) à **788** (dimanche 6 h) | | ≤ 800 |
| Téléphone 375 | 769 mots, 17,8 écrans (réduit) | | |

Détail : lien d'évitement 3, en-tête 11, hero 65, fournée 36, établi 41, boutique 91, retrait 37, fabrication 64, avis 46, farine 47, équipe 46, journal 62, accès 41, questions 54, commande 88, pied 45. Aucun bloc ne dépasse 3 phrases. Un visuel par section, sauf les questions et la commande (c'est permis). Toutes les sections attendues sont là. La page n'est ni maigre ni bavarde, et il reste 12 mots de marge le dimanche matin.

### 8. Responsive (1440, 1280, 768, 375, 360)

- Débordement horizontal : **0 px** aux cinq tailles, et sur les deux pages secondaires à 1440 et 360.
- Titres : aucun coupé ni débordant (le seul relevé est le titre `sr-only` des avis, invisible par construction). h1 à 64,8 / 57,6 / 49,6 / 32,8 / 32,8 px, interlettrage normal.
- Aucun texte sous 12 px. Repères de la carte : 34 px à 768 et plus, 27 px à 375 et 360 ; étiquettes en 13 px (`41-*-farine.jpg`).
- Menu mobile propre à 768, 375 et 360 (`42-*-menu-ouvert.jpg`). Aucun numéro de téléphone nulle part.
- Boutique, fabrication en pile, équipe et commande vues à 768, 375, 360 et 1280 (`41-*`) : rien de cassé.

### 9. Console

Sur toutes les sessions (5 tailles, parcours, 12 horloges, clavier, mouvement réduit, deux pages secondaires) : **0 erreur de script, 0 requête échouée, 0 réponse ≥ 400.** Les 404 du tour 2 ont disparu.

---

## Partie 2 — Les notes (scores)

### Les 10 points

| # | Point | Résultat | Capture | Pourquoi |
|---|---|---|---|---|
| 1 | Page complète | **OK** | `30-reduit-page-entiere-1440.jpg` | 777 mots, 13 sections, toutes les sections attendues, 3 phrases au plus par bloc |
| 2 | Catalogue, articles | **OK** | `05-*`, `11-*`, `60-journal-1440.jpg` | 8 fiches tirées de `PRODUITS`, prix, jours, panier ; journal daté, lié, et sa page répond |
| 3 | Titres et promesse | **OK** | `01-premier-ecran-1440.jpg` | Concrets, ils vendent, et le prix est au premier écran |
| 4 | Typographie d'affichage | **OK** | `01-*` | Rien de collé, de 1440 à 360 |
| 5 | Barre de navigation | **OK** | `01-premier-ecran-360.jpg`, `42-375-menu-ouvert.jpg` | Logo, 5 liens, panier, burger entier à 360, aucun téléphone |
| 6 | Blocs d'action | **Pas OK (majeur, téléphone)** | `27-1440-confirmation.jpg` / `28-375-apres-valider.jpg` | Deux colonnes à l'ordinateur et formulaire exemplaire ; mais au téléphone la confirmation sort de l'écran à l'envoi |
| 7 | Hero équilibré | **OK** | `01-premier-ecran-1440.jpg`, `-1280.jpg` | Texte, photo et action se répondent ; prix et horaires présents |
| 8 | Responsive | **OK** | `01-*`, `41-*` | 0 débordement, aucun titre cassé aux 5 tailles |
| 9 | Images et vidéos | **OK, réserves moyennes** | `05-*`, `09-*`, `70-*`, `71-*` | Miche, four et carte corrigés. Restent le feu au défournement de la fournée et la demi-miche qui reprend la photo de mie |
| 10 | 3D produit | sans objet | — | Pas d'objet 3D |

### La grille sur 100 (`niveau-agence.md` § 6)

| Critère | Points | Tour 1 | Tour 2 | **Tour 3** | Pourquoi |
|---|---|---|---|---|---|
| Direction artistique | 15 | 13 | 13 | **13** | On reconnaît mon carnet de fournil sans le logo. Inchangé : le sac en boîte plate, le crumble sur verdure, trois fours différents. |
| Images | 15 | 9 | 11 | **12** | La miche n° 1, l'étape 3 et la carte sont justes, et c'était le gros. Restent le feu vif au défournement (section 2, entier au téléphone), la même photo en demi-miche et en mie plein cadre, les pâtons blancs, le crumble. Plafond des médias provisoires : 12-13. |
| Mise en page | 15 | 12 | 13 | **13** | Premier écran plein, collage, mie plein cadre, étapes épinglées. Toujours cinq sections « texte à gauche, visuel à droite ». Le troisième article de la page carnet casse le rythme. |
| Mouvement | 10 | 8 | 8 | **9** | Trait qui s'écrit, collage en profondeur, épinglage, parallaxe, compteurs ; et désormais un geste à l'ajout au panier (rebond de la pastille). Mouvement réduit complet. |
| Clarté en 5 s et action | 10 | 8 | 9 | **9** | Quoi, où, combien, quand, quoi faire : tout est au premier écran, avec un bouton fort. |
| Densité | 5 | 5 | 5 | **5** | 777 mots, 13 sections, comptage fourni, 788 au plus haut. Aucune pénalité. |
| Preuves et objections, aucune fausse donnée | 10 | 6 | 7 | **8** | Plus aucun faux dans les heures, le levain ou le froid ; prix et distances cohérents jusqu'au carnet. Avis provisoires signalés (c'est le plafond sans le vrai client). |
| Textes | 10 | 8 | 9 | **10** | Titres forts, voix sobre, plus d'accroc. La confirmation dit quoi, combien, quand et comment modifier. |
| Mobile, accessibilité, légèreté | 10 | 7 | 9 | **8** | 0 débordement, focus visible partout, 0 erreur console, liens réparés. Mais l'action principale, au téléphone, se termine sur le pied de page : Claire ne voit pas que sa commande est prise. C'est le persona du brief (« depuis leur téléphone, le soir »). |
| **Total** | **100** | **76** | **84** | **87** | |

**Note sur 10 : 8,7.**

**Seuil qui s'applique : 85** (maquette aux médias provisoires : images générées, photos de banque, avis à recueillir). Il est **dépassé de 2 points**.

**Ce qui est atteignable sans le vrai client** : FIX-29 (une ligne, 0 $) remonte Mobile à 9 ou 10, soit **88 – 89**. FIX-30 par recadrage local (0 $) et FIX-31 (≈ 0,03 $ de génération) montent Images à 13, soit **89 – 90**. Au-delà de 90, il faut le vrai client : reportage au fournil (moi, Inès, Malo, **un seul four**, les huit produits sur le même bois), trois avis signés, l'Instagram, les mentions remplies.

« Cette fois, mon pain sort du four avant que j'ouvre, ma miche a ma grigne, mon four ne brûle plus pendant la cuisson et la farine passe par le moulin. Le site me ressemble et il vend : je le paierais. Mais pas tant que Claire, sur son téléphone, tombe sur le pied de page au moment où elle valide sa miche du vendredi. C'est le seul geste que je lui demande, et il doit finir sur "C'est noté". »

Verdict : Pas encore — 87/100, au-dessus du seuil de 85, mais l'action principale a un défaut majeur au téléphone : après « Valider ma commande », la confirmation sort de l'écran et Claire ne voit que le pied de page (FIX-29, une ligne, 0 $). Une fois ce point corrigé et vérifié à 375 et 360, c'est « Oui, ça vaut mes 25 000 € ».

---

## Partie 3 — Le plan de corrections restant (fix-plan)

Numérotation à la suite du tour 2. Lignes de `index.html` au 4 novembre, 17 h.

| FIX | Gravité | Coût | Résumé |
|---|---|---|---|
| FIX-29 | **majeur** | **0 $** | Au téléphone (375, 360, avec ou sans mouvement), la confirmation sort de l'écran à l'envoi : Claire ne voit que le pied de page |
| FIX-30 | moyen | **0 $** (recadrage) ou **génération** ≈ 0,03 $ | Fournée (section 2) : feu de bois vif dans le four pendant le défournement, visible en entier au téléphone ; troisième four différent |
| FIX-31 | moyen | **génération** ≈ 0,03 $ | Demi-miche = recadrage de la mie plein cadre : la même photo deux fois |
| FIX-32 | léger | **0 $** (option **génération** ≈ 0,06 $) | Carte : fournil en maisonnette de campagne, enseigne en fausses lettres |
| FIX-33 | léger | **0 $** | Page du carnet : 3ᵉ article en portrait, rythme cassé, photo reprise de la boutique |
| FIX-34 | léger | **0 $** | `NOTES.md` § 5 : « 1 recadrage » alors que la demi-miche en est un aussi |
| FIX-15 (reste) | léger | **client** | Instagram et inscription au carnet dans le pied |
| FIX-18 | moyen | **client** | Reportage photo au fournil, avis signés |
| FIX-35 | léger | **client** | Mentions légales : SIRET, forme juridique, hébergeur, e-mail, règle de la commande non retirée, durée de conservation |

Total génération estimé : **≈ 0,03 $** (FIX-31), **0,06 à 0,12 $** avec les options (FIX-30, FIX-32), FLUX.2 Pro au tarif de `NOTES.md` § 5. Rien n'a été dépensé pendant ce test.

### FIX-29 — La confirmation au téléphone (majeur, 0 $)

- **Quoi** : à l'envoi, `.fiche.envoyee > :not(.confirmation) { display: none; }` replie la fiche d'environ 900 px. Le navigateur garde la page collée en bas, et `conf.focus({ preventScroll: true })` empêche tout recalage : la confirmation finit de −356 à −113 px (375) ou de −376 à −106 px (360). À 1440 la fiche est courte, d'où l'absence du défaut.
- **Où** : `index.html` l. 683-686 (bloc d'envoi) ; règle `odette.src.css` l. 435.
- **Comment** : après `f.classList.add("envoyee")`, amener la confirmation sous l'en-tête, puis donner le focus :

  ```js
  f.classList.add("envoyee");
  const haut = conf.getBoundingClientRect().top + scrollY - ((document.querySelector(".entete")?.offsetHeight || 72) + 16);
  if (window.lenis) window.lenis.scrollTo(haut, { immediate: !document.documentElement.classList.contains("motion") });
  else scrollTo({ top: haut });
  conf.tabIndex = -1; conf.focus({ preventScroll: true });
  ```

  Variante : viser `#titre-commander` pour garder le titre « Votre commande, prête à votre heure » au-dessus de la confirmation. Vérifier à 375, 360 et 375 en mouvement réduit : la confirmation doit être entière dans l'écran, sous l'en-tête, et la barre collante masquée.

### FIX-30 — La fournée au feu ouvert (moyen, 0 $ ou ≈ 0,03 $)

- **Quoi** : `images/four-1400.webp` montre un feu de bois vif dans la chambre pendant le défournement de trois miches. Au téléphone, `.fournee-photo img` est en 3:2 et montre l'image entière. C'est aussi un troisième modèle de four, différent de celui du portrait et de l'étape 3.
- **Où** : `index.html` l. 104 ; `odette.src.css` l. 133-139.
- **Comment, à 0 $** : recadrer en local à partir de x ≈ 600 px (la pelle, les trois miches et la main ; le feu est entre x ≈ 100 et 420), en 800 × 933 ou 3:4, et mettre l'alt « La pelle sort trois miches du four à sole ». Sinon, `object-position: 80% 50%` avec un ratio portrait aussi au téléphone. **Option génération** : « wooden peel pulling three round sourdough miches out of a masonry deck oven with a black cast-iron door, oven mouth dark, no fire, no flames, flour dust, morning light », dans la lumière de `four-bouche-1000`, pour qu'on voie un seul four.

### FIX-31 — La demi-miche (moyen, ≈ 0,03 $)

- **Quoi** : `demi-miche-640` est un recadrage de `mie-1920` (même photo Rahel Arlitt) : la fiche 2 de la boutique et la section avis plein cadre montrent la même scène.
- **Où** : `index.html` l. 435 ; `images/demi-miche-640.webp`.
- **Comment** : générer en 640 × 800, au style de `miche-640` : « half of a round 1 kg country sourdough miche, cut face showing open grey-beige T80 crumb, single ear scoring, on the same oak board by a window, flour ». Alt : « Demi-miche de 500 g, coupée, mie bise et alvéolée ». Vérifier à l'œil une mie **bise**, pas blanche.

### FIX-32 — Le fournil sur la carte (léger, 0 $ ; option ≈ 0,06 $)

- **Quoi** : le repère 3 est une maisonnette de campagne au bord d'une rivière, avec des pseudo-lettres sur la façade. Pour moi, c'est une boutique en ville, entre Loire et Cher.
- **Où** : `images/carte-farine.webp` ; `index.html` l. 273-281.
- **Comment, à 0 $** : effacer l'enseigne en local (même méthode que la roue) et poser sous le repère 3 un petit cartouche HTML « Tours » au style de `.carte-km`. **Option** : régénérer avec « small town shopfront among slate roofs of Tours », puis replacer les repères.

### FIX-33 — Le troisième article du carnet (léger, 0 $)

- **Où** : `journal/index.html` l. 59.
- **Comment** : passer l'image en `md:col-span-6` avec `aspect-ratio: 3/2; object-fit: cover` comme les deux autres, ou recadrer `seigle-640` en 1000 × 672 sur la tranche et la croûte, pour ne pas reprendre la vignette de la boutique.

### FIX-34 — Le carnet de suivi (léger, 0 $)

- **Où** : `NOTES.md` § 5, l. 128.
- **Comment** : « 2 recadrages (seigle-tranche-290, demi-miche-640 de mie-1920) », ou mettre la ligne à jour après FIX-31.

### FIX-15 (reste), FIX-18, FIX-35 — Ce que seule Odette peut fournir (client)

Instagram réel et décision sur une lettre du carnet ; reportage photo au fournil (moi, Inès, Malo, le four à sole, les huit produits sur le même bois) ; trois avis signés ; les valeurs entre crochets des mentions légales, dont la règle de la commande non retirée. C'est ce qui sépare 89-90 du 90 du site construit.
