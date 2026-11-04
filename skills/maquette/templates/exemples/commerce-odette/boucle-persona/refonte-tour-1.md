# Fournil Odette — boucle persona, refonte, tour 1

- **Date** : mercredi 4 novembre 2026, vers 15 h 15
- **Page testée** : `commerce-odette/index.html`, servie par mon propre `python3 -m http.server 4377` dans `exemples/` (le 4331 n'a pas été touché). Chrome 156 piloté par Playwright.
- **Regard indépendant : les rapports du relecteur n'ont pas été lus**, ni les anciens tours `iteration-*`. Lu avant de tester : `brief.md`, `NOTES.md`, `medias-a-generer.md`, `retours-utilisateur-2026-11-04.md`.
- **Qui parle** : moi, Odette Ravel, 41 ans, boulangère rue de la Fuye. J'ai payé 25 000 €. Et, pour le parcours, Claire, 38 ans, quartier Velpeau, qui ouvre le site sur son téléphone le soir pour voir l'heure et le prix.
- Captures : `boucle-persona/refonte-tour-1-captures/` (chemins relatifs à ce dossier ci-dessous).

---

## Partie 1 — Ce que j'ai fait et vu (test-report)

### 1. Les cinq premières secondes

**Ordinateur, 1440 × 900** (`01-desktop-5s.jpg`). Je lis « Une miche le mardi, encore bonne le samedi », le chapô (levain, rue de la Fuye, commander avant 18 h, retirer le lendemain), le bouton « Commander pour demain », « Mardi – samedi, 7 h – 19 h 30 », trois repères (levain 22 heures, farine à 25 km, se garde six jours). À droite, ma croûte en gros plan, la grigne entourée au crayon, « fournée de 6 h 40, 240 °C ». C'est mon carnet, pas une carte postale : ça me plaît.

- **Quoi** : oui. **Où** : oui. **Quoi faire** : oui, un seul bouton.
- **À quel prix** : non. Le prix n'arrive qu'à la troisième section. Pour Claire, qui trouve le levain cher, c'est la première question.
- **Horaires** : le dimanche manque. Claire peut croire que je suis fermée le dimanche, alors que c'est ma meilleure matinée.
- **Vide** : sous le hero, une bande vide d'environ 240 px (de 660 à 880 px), avec un coin de photo qui dépasse en bas à droite. Même chose à 1280 (`40-1280-premier-ecran.jpg`). Le premier écran s'arrête à 70 % de la hauteur.

**Téléphone, 375 × 812** (`40-375-premier-ecran.jpg`) : photo, titre sur trois lignes, chapô, bouton, horaires, repères. Propre, lisible d'une main. À **360** (`40-360-premier-ecran.jpg`, `44-360-entete-burger.png`) : **le bouton du menu est coupé**. Il occupe x = 331 à 375 sur un écran de 360 : 15 px sortent de l'écran.

### 2. Le défilement complet (1440 × 900)

Défilement lent à la molette (300 px tous les 110 ms), puis arrêt sur chaque section, puis défilement rapide (5 400 px d'un coup, trois fois).

| Capture | Ce que je vois |
|---|---|
| `02-defil-fournee.jpg` | « Sorti du four ce matin » : un ticket daté du jour (« Mercredi 4 novembre · 6 h 40, 240 °C »), quatre produits avec vignette et prix, et la photo du four. Bonne idée, c'est vivant. La vignette du croissant ne s'est pas affichée : c'est le serveur Python de test qui coupe la connexion (`ERR_CONNECTION_RESET`), le fichier répond bien en 200 seul. Ce n'est pas la page. |
| `03-defil-etabli.jpg` | « Six jours de tenue pour 7,20 € le kilo » : le collage (miche grignée, mains, croquis coté 22 cm, croûte 4 mm, 76 % d'eau, étiquette 7,20 € et 3,70 €). C'est la plus belle section, c'est mon carnet. |
| `04-defil-boutique.jpg`, `05-defil-boutique-bas.jpg` | La boutique : quatre filtres, huit fiches (photo, jours de cuisson, nom, poids, prix, « Ajouter »), « Voir mon panier ». La structure est juste. Les photos, non (voir § 6). |
| `06-defil-retrait.jpg` | « Trois gestes, et votre sac vous attend » : trois étapes et l'étiquette « Claire » avec le total. Le calcul est juste (7,20 + 2,80 = 10,00 €). Le « sac » ressemble à une boîte plate plus qu'à un sac kraft. |
| `07` à `09-defil-fabrication-*.jpg` | « 22 heures du levain à la grille » épinglé, trois étapes, compteur 1/3 → 3/3 : ça marche, sans saut. Mais l'image 2 est celle du collage et l'image 3 est celle de la fournée : je les ai déjà vues deux écrans plus haut. |
| `10-defil-avis.jpg` | La mie plein cadre et « Le vendredi, je la trouve encore meilleure que le mardi. » Fort. Les avis sont marqués provisoires (soulignés en pointillé, avec une infobulle) : honnête. |
| `11-defil-farine.jpg` | « Le blé pousse à 25 km du four » : la liste des trois lieux à gauche, la carte aquarelle à droite (voir § 6). |
| `12-defil-equipe.jpg` | « Trois personnes et un four à sole » : ma photo posée de travers, la note « au four dès 4 h », Odette, Inès, Malo, compteurs 280 et 450. |
| `13-defil-journal.jpg` | « Le carnet du fournil » : un article à la une et deux courts, datés. |
| `14-defil-acces.jpg` | Adresse en titre, « Ouvert, jusqu'à 19 h 30 » calculé à l'heure, la ligne du jour en valeur, la vitrine le soir. Très bien. |
| `15-defil-questions.jpg` | Quatre questions du comptoir. |
| `16-defil-commande.jpg` | Deux colonnes : titre, une phrase et trois réassurances à gauche ; la fiche (panier, total, jour, créneau, prénom, e-mail) à droite. Conforme à la demande. |
| `17-defil-pied.jpg` | Pied sombre, quatre colonnes. |
| `18-rapide-1..3.jpg` | En défilement rapide : rien ne clignote, rien ne cache l'action. Les images arrivent en volet, c'est normal en vol. |

**Le moment signature** : le trait de crayon qui s'écrit autour de la grigne au chargement, et le collage de l'établi qui suit la souris. C'est discret, c'est juste pour une boulangerie. Les étapes épinglées tiennent.

### 3. Le parcours de l'acheteuse (Claire, jusqu'à « Valider ma commande »)

Données de test, rien n'est envoyé.

1. Clic sur « Commander pour demain » du hero : j'arrive sur la boutique, titre visible sous l'en-tête (`20-parcours-clic-hero.jpg`).
2. Envoi du formulaire vide (`21-parcours-envoi-vide.jpg`) : 5 erreurs claires, focus sur « Choisir dans la boutique ». Bien.
3. Ajout d'une miche, de deux croissants et d'un pain aux noix : la pastille passe à 4, l'annonce dit « Pain aux noix : 1. Panier : 4 articles, 15,40 € ». Le « Ajouter » devient « − 1 + » (`22-parcours-panier-rempli.jpg`). Le calcul est juste.
4. Filtres : « Le week-end » = brioche et crumble (`23-filtre-week-end.jpg`), « Viennoiseries » = 2, « Pains » = 4, « Tout » = 8. Juste.
5. « Voir mon panier » puis « Panier » de l'en-tête : j'atterris sur la commande, titre sous l'en-tête, à 1440 comme à 375 (`27-1440-clic-panier-entete.jpg`, `27-375-clic-panier-entete.jpg`, `29-voir-mon-panier-atterrissage.jpg`).
6. Jours proposés ce mercredi 15 h : jeudi 5 → jeudi 12 novembre, lundi 9 sauté. Juste.
7. Je choisis **jeudi** : sous le pain aux noix, « Cuit seulement mardi et vendredi. » (`24-alerte-noix-jeudi.jpg`). Très bien. **Mais les erreurs du premier envoi restent affichées** : « Choisissez le jour de retrait. » sous un champ qui affiche « jeudi 5 novembre », « Choisissez un créneau. » sous un créneau coché. Claire ne sait plus ce qui cloche.
8. Envoi avec le jeudi : refusé, « Pain aux noix : pas cuit ce jour-là. Retirez-le ou changez de jour. » (`25-envoi-refuse-noix.jpg`). Bien. Le focus va sur le « − » de la **miche**, pas sur la ligne du pain aux noix.
9. Je passe à **vendredi** : l'alerte de ligne disparaît, **mais le message d'erreur du panier reste affiché** au-dessus du total.
10. « + » sur la miche dans le récapitulatif : total 22,60 € (14,40 + 5,40 + 2,80). Juste.
11. Envoi : « C'est noté, Claire : 5 articles, 22,60 €, à retirer vendredi 6 novembre, 9 h – 12 h. Vous payez au comptoir. » (`26-confirmation.jpg`). Bon message.
12. Je recharge la page : **le panier contient toujours 5 articles**. Après une commande validée, le panier n'est pas vidé : Claire peut repasser la même commande sans le vouloir.

**Les chiffres d'un bloc à l'autre.** Les prix concordent partout (ticket, boutique, étiquette, sac, récapitulatif). **Les heures du levain, non** :

- hero : « Levain naturel : 22 heures » ;
- établi : « 22 heures du pétrin au four » ;
- fabrication : levain « la veille, 17 h », façonnage « 4 h », four « 6 h 40 », 45 minutes de cuisson. De 17 h à 7 h 25, ça fait **14 h 25**, pas 22 heures. Et 22 heures du pétrin au four voudrait dire pétrir à 8 h 40 la veille, pas à 17 h ;
- questions : « un levain jeune, rafraîchi **le matin** », alors que la fabrication dit « rafraîchi deux fois » **la veille à 17 h**.

Trois versions du même geste sur une page. Un client de passage ne le voit pas ; un confrère, un journaliste ou moi, si, en trois secondes.

**Les dates simulées** (horloge décalée par script, `45-fournee-lundi.jpg`) :

| Moment | Ticket de fournée | Statut « accès » | Jours proposés |
|---|---|---|---|
| Lundi 10 h | « Lundi 9 novembre : fermé. Prochaine fournée mardi, 6 h 40. » + produits du mardi | Fermé, réouverture mardi à 7 h | mardi → mardi suivant |
| **Dimanche 6 h** | « Dimanche · 6 h 40, 240 °C » (« Sorti du four ce matin » avant la sortie du four) | **« Fermé, réouverture mardi à 7 h »** : **faux**, j'ouvre à 7 h 30 ce dimanche-là | mardi → |
| Dimanche 11 h | 6 produits, brioche et crumble | Ouvert, jusqu'à 12 h 30 | mardi → |
| Samedi 19 h | 5 produits | Ouvert, jusqu'à 19 h 30 | mardi → (dimanche exclu après 18 h : juste) |
| Mardi 6 h 30 | 5 produits | Fermé, réouverture à 7 h | mercredi → |

Le dimanche matin avant l'ouverture, le site renvoie mes clients au mardi. C'est le pire moment pour se tromper.

### 4. Le clavier (60 tabulations depuis le haut, 1440)

`50-clavier-tab-01.jpg` à `50-clavier-tab-33.jpg`. 37 arrêts, puis la boucle repart. Ordre : « Aller au contenu », logo, 5 liens, Panier, « Commander pour demain », « Réserver pour demain », 4 filtres, 8 « Ajouter », « Voir mon panier », itinéraire, 4 questions, lien boutique, jour, prénom, e-mail, « Valider », 3 liens du pied, « Haut de page ». **Tous visibles au focus**, anneau braise de 3 px, jamais sous l'en-tête. Le journal n'a aucun arrêt : ses cartes ne sont pas des liens.

### 5. Le mouvement réduit

`30-reduit-page-entiere-1440.jpg` : page complète, 12,3 écrans, **0 élément invisible**, étapes de fabrication en trois colonnes, rien ne manque. Les mêmes 783 mots. Bien.

### 6. L'œil du métier (chaque image, chaque chiffre)

**Les six images générées** (planche `images/` lue en taille réelle) :

| Image | Ce que je vois | Verdict de boulangère |
|---|---|---|
| Carte (`carte-farine.webp`) | Aquarelle et encre sur papier crème, sans texte, très jolie. Champs de blé et ferme en haut à gauche, une maison au bord de l'eau **avec une roue à aubes** au centre, un **second moulin** à droite. Les deux chemins pointillés partent de la ferme et **arrivent tous les deux à la maison du centre** ; le moulin de droite n'est relié à rien. Sur la façade du centre, un gribouillis qui imite une enseigne. | Soignée, oui. **Utile, non** : on ne sait pas lequel est le moulin, lequel est mon fournil. Mon fournil est rue de la Fuye, en ville : ici c'est une chaumière au bord d'une rivière. Rien ne relie la liste (25 km, 14 km, 0 km) au dessin : pas de numéro, pas de repère. |
| Odette (`odette-900.webp`) | Une femme d'une soixantaine d'années, cheveux gris, tablier de lin, miche grignée en croix, four à bois allumé. | **Ce n'est pas moi.** J'ai 41 ans (`brief.md`). Le prompt demandait « early fifties, short grey hair » : l'erreur vient du prompt. Le four ressemble à un four à pizza en dôme. |
| Fournée (`four-1400.webp`) | Trois miches sur une planche qui sort d'un four à bois, braises au fond, vapeur. | Belle image. Deux détails qu'un boulanger voit : on ne défourne pas avec le feu qui brûle encore dans la chambre, et une pelle de four a un long manche, pas une planche tenue d'une main. Acceptable en provisoire. |
| Croissant (`croissant-640.webp`) | Deux croissants feuilletés sur papier et planche. | Juste. |
| Pain au chocolat (`pain-chocolat-640.webp`) | Trois viennoiseries **en forme de croissant**, celle du milieu ouverte sur des barres de chocolat. | **Faux.** Un pain au chocolat est rectangulaire, roulé sur deux barres. Ce sont des croissants fourrés. Mes clients le verront avant moi. |
| Vitrine (`vitrine-720.webp`) | Façade en tuffeau, vitrine éclairée, étagères de miches, un client, trottoir mouillé. | Très bien, c'est Tours. |

**Les photos libres de la boutique** :

- Miche de campagne : des boules au pochoir décoratif (épis, feuilles), style boulangerie industrielle « décor » : pas ma miche.
- **Tourte de seigle** : une boule de blé à mie blanche, sur béton gris. Une tourte de seigle a une mie brune et dense et une croûte craquelée. **Faux**, et l'alt dit « croûte craquelée ».
- **Pain aux noix** : un pain moulé sombre aux graines, avec des pruneaux ou des raisins à côté, **pas une noix visible**. L'alt dit « tranché » : il ne l'est pas.
- Brioche : une brioche moulée, l'alt dit « tressée » : elle ne l'est pas.
- Crumble : verdure vive en fond, lumière différente des autres.

**Les répétitions** : la photo des mains qui façonnent apparaît **trois fois** (collage de l'établi, étape 2 de la fabrication, article à la une du journal), celle du four **deux fois** (fournée, étape 3), la mie deux fois (avis, journal), la fausse tourte deux fois (boutique, journal). L'article « La farine de la récolte 2026 est arrivée » est illustré par des mains qui façonnent, pas par la farine.

**Les chiffres** :

- 22 heures : voir § 3, ça ne tient pas.
- « Fournée de 6 h 40 » au singulier et « 280 miches par jour » : un four à sole maçonné prend quelques dizaines de miches par fournée. Il y a plusieurs fournées ; écrire « première fournée, 6 h 40 ».
- « Douze sacs de T80 » livrés « tous les quinze jours » : 300 kg pour deux semaines, alors que 280 miches d'un kilo demandent près de 170 kg de farine **par jour**. Un meunier le voit.
- « tous les jours » sur la miche, la demi-miche et les viennoiseries, alors que je suis fermée le lundi : écrire « du mardi au dimanche ».
- Distances : Neuillé-Pont-Pierre à 25 km, Monnaie à 14 km de Tours, « entre Loire et Cher » : justes.
- Prix : 7,20 € le kilo, 3,70 € la demie, 1,20 € par jour sur six jours : justes et cohérents partout.

**Les mots** : apostrophes droites partout (« c'est », « Jusqu'à », « d'abord ») au lieu de l'apostrophe typographique ’. Espaces insécables bien posés dans les heures, prix, poids, distances et avant « : ? ! » (vérifié dans le source et à l'écran).

### 7. La densité (`conventions.md` § 11, script exact, 1440 × 900)

| Mesure | Animé | Mouvement réduit | Budget |
|---|---|---|---|
| Mots | **783** | 783 | 500 – 800 |
| Sections dans `main` | **13** | 13 | 10 – 13 |
| Écrans | 14,2 | 12,3 | ≈ 15 (12 – 18) |
| Téléphone | 17,3 (375) ; 19,1 (360) ; 15,8 (768) | | |

Détail : en-tête 11, hero 58, fournée 36, établi 46, boutique 96 (8 fiches), retrait 45, fabrication 56, avis 46, farine 49, équipe 53, journal 60, accès 41, questions 54, commande 86, pied 43. Aucun bloc au-delà de 3 phrases. Chaque section a un visuel, sauf les questions et la commande (permis). Sections attendues toutes présentes : hero, preuve, produits et tarifs, comment ça marche, équipe, témoignages, articles, FAQ, appel final, pied. La page n'est **ni maigre ni bavarde**.

### 8. Responsive (1440, 1280, 768, 375, 360)

Mesuré dans le navigateur, puis vérifié à l'œil (`40-*-premier-ecran.jpg`, `41-768-*.jpg`, `41-375-*.jpg`, `41-360-*.jpg`, `42-375-menu-ouvert.jpg`, `43-375-barre-collante.jpg`) :

- Débordement horizontal : **0 px** aux cinq tailles.
- Titres : aucun mot coupé, aucun titre qui déborde, aucun titre trop grand. h1 à 57,6 px (1440 et 1280), 49,6 (768), 32,8 (375 et 360) ; h2 à 49,9 puis 30,4. Interlettrage `normal` sur Young Serif : les lettres respirent à 1440 comme à 375.
- Texte de moins de 12 px : aucun. Cibles de moins de 24 px : seulement le lien « Choisir dans la boutique » (192 × 20, en ligne dans une phrase : acceptable).
- Menu téléphone : ouvert propre, 5 liens, Échap le referme et rend le focus au burger. Aucun numéro de téléphone nulle part.
- **360 : burger coupé de 15 px** (logo 185 px + Panier 106 px + burger 44 px + espaces > 360 − marges).
- Barre collante « Commander pour demain » en bas : bien, elle se cache sur la commande.

### 9. Console

Aucune erreur de script, aucune exception. Seuls des `ERR_CONNECTION_RESET` sur deux vignettes (croissant, pain au chocolat), dus au serveur de test Python (les mêmes fichiers répondent en 200 avec `curl`, trois fois de suite). Non comptés.

---

## Partie 2 — Les notes (scores)

### Les 10 points

| # | Point | Résultat | Capture | Pourquoi |
|---|---|---|---|---|
| 1 | Page complète | **OK** | `30-reduit-page-entiere-1440.jpg` | 783 mots, 13 sections, 3 phrases au plus par bloc, un visuel par section, toutes les sections attendues |
| 2 | Catalogue, articles | **OK** (réserve) | `04`, `05`, `13-defil-journal.jpg` | 8 fiches avec prix, jours, panier, jour et créneau de retrait, alerte « pas cuit ce jour » ; journal daté rendu depuis des données. Réserve : les articles ne mènent nulle part |
| 3 | Titres et promesse | **OK** | `01-desktop-5s.jpg` | « Une miche le mardi, encore bonne le samedi », « Six jours de tenue pour 7,20 € le kilo », « Choisissez ce soir, c'est cuit demain matin » : concrets, ils vendent |
| 4 | Typographie d'affichage | **OK** | `40-1440-premier-ecran.jpg`, `40-375-premier-ecran.jpg` | Interlettrage normal, rien de collé |
| 5 | Barre de navigation | **Pas OK** | `44-360-entete-burger.png` | Logo, 5 liens, Panier, aucun téléphone, menu propre ; mais burger coupé à 360 |
| 6 | Blocs d'action | **OK** | `16-defil-commande.jpg` | Deux colonnes à l'ordinateur, réassurance à gauche, fiche à droite |
| 7 | Hero équilibré | **Pas OK** (moyen) | `01-desktop-5s.jpg`, `40-1280-premier-ecran.jpg` | Texte et photo se répondent, mais bande vide de 240 px en bas du premier écran à 1440 et 1280 ; pas de prix |
| 8 | Responsive | **OK** | `40-*`, `41-*` | Aucun titre cassé, coupé ou trop grand aux 5 tailles, 0 px de débordement |
| 9 | Images et vidéos | **Pas OK** | `11-defil-farine.jpg`, `05-defil-boutique-bas.jpg`, `12-defil-equipe.jpg` | Des images partout et la carte est générée, mais : carte illisible (deux moulins, fournil à la campagne, lieux non reliés), pain au chocolat en forme de croissant, fausse tourte de seigle, pain aux noix sans noix, Odette de 60 ans, une photo montrée trois fois |
| 10 | 3D produit | sans objet | — | Pas d'objet 3D |

### La grille sur 100 (`niveau-agence.md` § 6)

| Critère | Points | Note | Pourquoi |
|---|---|---|---|
| Direction artistique | 15 | **13** | Le carnet de fournil se reconnaît sans le logo : ticket dentelé, croquis coté, étiquette, trait de crayon, une note manuscrite par écran, palette farine, croûte et four. Le « sac » kraft ressemble à une boîte ; les photos de banque tirent vers d'autres boulangeries (béton, verdure). |
| Images | 15 | **9** | Beaucoup d'images, grandes, bien étalonnées ; vitrine, four et croissant générés sont bons. Mais trois produits sont faux (pain au chocolat, seigle, noix), la patronne n'a pas le bon âge, la carte ne dit pas ce qu'elle doit dire, et la même photo de mains revient trois fois. |
| Mise en page | 15 | **12** | Composition « artisanal ou carnet » suivie, collage, plein cadre de la mie, étapes épinglées, boutique en grille propre. Vide en bas du premier écran ; cinq sections de suite en « texte à gauche, visuel à droite ». |
| Mouvement | 10 | **8** | Trait qui s'écrit, collage en profondeur, étapes épinglées avec compteur, parallaxe de la mie, apparitions. Fluide, rien ne clignote en défilement rapide, mouvement réduit complet. Pas de geste panier (l'ajout ne se voit qu'à la pastille). |
| Clarté en 5 s et action | 10 | **8** | Quoi, où, quoi faire : oui, un bouton fort. Pas de prix au premier écran, horaires sans le dimanche. |
| Densité | 5 | **5** | 783 mots, 13 sections, comptage fourni (NOTES.md et ce rapport), aucun bloc trop long. Aucune pénalité. |
| Preuves et objections, aucune fausse donnée | 10 | **6** | Les objections du brief sont toutes traitées (prix et conservation, acidité, horaires, réservation, gluten, farine). Mais des données fausses : 22 heures contredit l'horaire de fabrication et la FAQ ; « réouverture mardi » un dimanche matin ; « tous les jours » sur des produits fermés le lundi ; douze sacs pour quinze jours. Avis provisoires (signalés, à remplacer). |
| Textes | 10 | **8** | Titres forts et concrets, voix sobre, aucune phrase creuse. Incohérences texte / image : article sur la farine illustré par des mains, alts « tressée », « tranché », « croûte craquelée » qui décrivent autre chose que l'image. Apostrophes droites. |
| Mobile, accessibilité, légèreté | 10 | **7** | 0 débordement, focus visible partout, clavier complet, menu accessible, annonces `aria-live`, 1,6 Mo d'images en différé. Burger coupé à 360 ; erreurs de formulaire qui restent après correction ; panier non vidé après commande. |
| **Total** | **100** | **76** | |

**Note sur 10 : 7,6.**

**Seuil qui s'applique : 85** (maquette aux médias provisoires : photos de banque, images générées, avis à recueillir).

**Ce qui est atteignable sans le vrai client** : les FIX à 0 $ (1, 4, 5, 6, 9 à 17) et environ 0,30 $ de génération (2, 3, 7, 8) remontent Images vers 12, Preuves vers 8, Mobile vers 9, Mise en page vers 13, Clarté vers 9, Textes vers 9 : **86 à 88**. Pour 90, il faut le vrai client : un reportage au fournil (Odette, Inès, Malo, le four, les vrais pains), des avis signés et un compte Instagram réel.

« La structure, c'est exactement ce que je voulais : on voit mes pains, on réserve, on vient chercher son sac. Mais je ne peux pas montrer à mes clients une boulangère qui n'est pas moi, des pains au chocolat qui sont des croissants et un levain qui fait 22 heures en haut de la page et 14 heures plus bas. Et une carte jolie où personne ne trouve mon fournil, ça ne sert à rien. »

Verdict : Pas encore. Des erreurs de métier visibles (levain 22 h contradictoire, pain au chocolat, tourte de seigle, Odette, statut faux le dimanche) et une carte qui ne montre pas le trajet.

---

## Partie 3 — Le plan de corrections (fix-plan)

| FIX | Gravité | Coût | Résumé |
|---|---|---|---|
| FIX-1 | majeur | **0 $** | Durée du levain contradictoire : 22 h (hero, établi) contre 17 h → 6 h 40 (fabrication) et « rafraîchi le matin » (FAQ) |
| FIX-2 | majeur | **génération** ≈ 0,03 $ | Pain au chocolat en forme de croissant : refaire l'image |
| FIX-3 | majeur | **génération** ≈ 0,06 $ | Odette a 41 ans, l'image en montre 60 : refaire le portrait |
| FIX-4 | majeur | **0 $** (option **génération** ≈ 0,06 $) | Carte : relier la liste au dessin (repères numérotés), distinguer moulin et fournil |
| FIX-5 | majeur | **0 $** | Burger coupé de 15 px à 360 |
| FIX-6 | majeur | **0 $** | Dimanche avant 7 h 30 : « réouverture mardi » au lieu de « à 7 h 30 » |
| FIX-7 | moyen | **génération** ≈ 0,06 $ | Tourte de seigle (boule de blé) et pain aux noix (sans noix) : refaire ; corriger l'alt de la brioche |
| FIX-8 | moyen | **génération** ≈ 0,09 $ | Images répétées (mains ×3, four ×2, mie ×2, seigle ×2) : nouvelles images pour le journal et l'étape 2 |
| FIX-9 | moyen | **0 $** | Erreurs du formulaire qui restent affichées après correction |
| FIX-10 | moyen | **0 $** | Panier non vidé après une commande validée |
| FIX-11 | moyen | **0 $** | Hero : vide en bas à 1440 et 1280, pas de prix, dimanche absent des horaires |
| FIX-12 | moyen | **0 $** | Chiffres de production : une seule « fournée de 6 h 40 » pour 280 miches, douze sacs pour quinze jours |
| FIX-13 | moyen | **0 $** | Journal : cartes sans lien, pas de « tout le carnet » |
| FIX-14 | léger | **0 $** | « tous les jours » sur des produits fermés le lundi |
| FIX-15 | léger | **0 $** + **client** | Pied : lundi fermé absent, mentions légales sans lien, ni Instagram ni lettre du journal |
| FIX-16 | léger | **0 $** | Apostrophes droites → apostrophe typographique ’ |
| FIX-17 | léger | **0 $** | « Sorti du four ce matin » affiché avant 6 h 40 |
| FIX-18 | moyen | **client** | Vraies photos (Odette, Inès, Malo, four, pains), avis signés |

Total génération estimé : **≈ 0,30 $** (FLUX.2 Pro via OpenRouter, au tarif noté dans `NOTES.md` § 5 : 0,06 $ en 2K, 0,03 $ en 1 Mpx). Rien n'a été dépensé pendant ce test.

### FIX-1 — La durée du levain (majeur, 0 $)

- **Quoi** : quatre affirmations incompatibles. Hero « Levain naturel 22 heures » ; établi « 22 heures du pétrin au four » ; fabrication : levain la veille à 17 h, façonnage 4 h, four 6 h 40 (soit environ 14 h 25 jusqu'à la grille) ; FAQ « rafraîchi le matin ».
- **Où** : `index.html` l. 80 (hero), l. 111 (établi), l. 207 (titre fabrication), l. 216-218 (étape 1), l. 338 (FAQ). `NOTES.md` § 2 (accroche E).
- **Comment** : choisir **un** schéma et l'écrire partout. Exemple cohérent avec 22 heures : « Le levain, rafraîchi le matin à 9 h » (étape 1, heure « La veille, 9 h ») → « Pétri à 15 h, il pousse toute la nuit au frais » → « 4 h, le façonnage » → « 6 h 40, le four ». Du rafraîchi à la grille : 22 heures, et la FAQ (« rafraîchi le matin ») devient vraie. Sinon, garder 17 h et écrire « 14 heures » partout. Libellé du hero conseillé : voir FIX-11.

### FIX-2 — Le pain au chocolat (majeur, ≈ 0,03 $)

- **Quoi** : l'image montre trois viennoiseries en croissant, dont une ouverte sur du chocolat.
- **Où** : `images/pain-chocolat-640.webp` ; `index.html` l. 428.
- **Comment** : régénérer en 1024 × 1024 puis 640, prompt P5 de `medias-a-generer.md` renforcé : « rectangular French pain au chocolat, straight rectangular rolled laminated dough, NOT crescent-shaped, two dark chocolate batons visible at both ends, one cut in half crosswise showing the two batons ». Vérifier à l'œil la forme rectangulaire avant de remplacer. Même étalonnage.

### FIX-3 — Le portrait d'Odette (majeur, ≈ 0,06 $)

- **Quoi** : brief « Odette Ravel, 41 ans » ; image : femme d'environ 60 ans, cheveux gris. Le prompt P2 demandait « early fifties, short grey hair ».
- **Où** : `images/odette-900.webp` ; `index.html` l. 280 ; `medias-a-generer.md` P2.
- **Comment** : corriger le prompt (« French woman baker, 41 years old, dark brown hair tied back, a few flour marks on her forearms ») et préciser le four : « masonry deck oven door, cast-iron door, fire not visible » pour éviter le four à pizza. 900 × 1125. Corriger aussi le prompt dans `medias-a-generer.md`.

### FIX-4 — La carte de la farine (majeur, 0 $ ; option ≈ 0,06 $)

- **Quoi** : l'illustration est belle mais ne se lit pas : deux bâtiments à roue à aubes, les deux chemins vont de la ferme à la maison du centre, le moulin de droite n'est relié à rien, le fournil est une chaumière au bord de l'eau avec une fausse enseigne. Rien ne relie la liste (25 km, 14 km, 0 km) à l'image.
- **Où** : `index.html` l. 262-272 (`ol.lieux`, `figure.carte`) ; `odette.src.css` l. 270-275.
- **Comment, à 0 $** : poser sur la figure trois repères HTML absolus (pastilles rondes croûte, chiffres 1, 2, 3 en Young Serif, `aria-hidden`) : 1 sur la ferme (≈ 32 % / 17 %), 2 sur le bâtiment de **droite** (≈ 83 % / 58 %), 3 sur la maison du **centre** (≈ 58 % / 64 %) ; numéroter la liste dans le même ordre (`ol` déjà numérotable : afficher le chiffre dans la même pastille). Ajouter sur l'image deux petites étiquettes HTML de distance au milieu des pointillés. Recadrer légèrement pour couper la fausse enseigne si elle se lit. **Option génération** : refaire P1 avec « the bakery is a small town shopfront among slate roofs of Tours with the twin towers of the cathedral, no water wheel ; dotted route farm → mill → bakery, mill on a small stream, only one water wheel on the whole map », puis garder les repères HTML.

### FIX-5 — Le burger à 360 (majeur, 0 $)

- **Quoi** : à 360, logo (185 px), « Panier 0 » (106 px) et burger (44 px) dépassent : le burger va de x = 331 à 375.
- **Où** : `index.html` l. 30-46 ; `odette.src.css` l. 62 (`.marque`), l. 66 (`.entete .bouton`).
- **Comment** : sous 400 px, masquer le mot « Panier » (`<span class="max-[399px]:sr-only">Panier</span>`, garder la pastille et une icône de sac) ou réduire `.marque` à 1.15rem et `gap` à .4rem. Contrôler à 360 et 320.

### FIX-6 — Le statut du dimanche matin (majeur, 0 $)

- **Quoi** : dimanche 6 h → « Fermé, réouverture mardi à 7 h ». J'ouvre à 7 h 30 ce jour-là.
- **Où** : `index.html` l. 549.
- **Comment** : traiter « avant l'ouverture » en premier : `if (j !== 1 && h < ouvre) → "à " + (j === 0 ? "7 h 30" : "7 h")`, puis lundi → « mardi à 7 h », dimanche après 12 h 30 → « mardi à 7 h », samedi après 19 h 30 → « dimanche à 7 h 30 », sinon « demain à 7 h ». Retester dimanche 6 h, dimanche 13 h, lundi, samedi 20 h.

### FIX-7 — Seigle, noix, brioche (moyen, ≈ 0,06 $)

- **Quoi** : la « tourte de seigle » est une boule de blé à mie blanche sur béton ; le « pain aux noix » est un pain moulé aux graines sans noix visible ; l'alt de la brioche dit « tressée », l'image est moulée.
- **Où** : `images/seigle-640.webp` (640 × 800), `images/noix-640.webp` (640 × 800) ; `index.html` l. 425, 426, 429.
- **Comment** : générer deux images 4:5 avec le style de shooting commun : « round rye tourte, dark brown dense crumb, deeply cracked floury crust, one slice cut » et « round walnut sourdough loaf, sliced, walnut halves clearly visible in the crumb ». Corriger l'alt de la brioche en « Brioche moulée dorée » (0 $).

### FIX-8 — Les images répétées (moyen, ≈ 0,09 $)

- **Quoi** : mains qui façonnent ×3 (l. 118, 233, 433), four ×2 (l. 101, 234), mie ×2 (l. 245, 434), seigle ×2 (l. 426, 435). L'article sur la farine est illustré par des mains.
- **Où** : `index.html` l. 233, l. 433-435.
- **Comment** : trois nouvelles images au style commun : « paper flour sacks stacked in the bakehouse, one open, stone-ground T80 flour » (journal 1) ; « a sourdough loaf wrapped in a linen tea towel on an oak board » (journal 2) ; « shaped dough rounds resting on floured linen couche » (étape 2 de la fabrication). Le journal 3 reprend la nouvelle tourte de seigle (FIX-7) seulement si la boutique change de cadrage ; sinon, une quatrième image.

### FIX-9 — Les erreurs qui restent (moyen, 0 $)

- **Quoi** : après un envoi vide, choisir un jour, un créneau ou changer de jour ne retire pas « Choisissez le jour de retrait. », « Choisissez un créneau. », ni le message du panier.
- **Où** : `index.html` l. 531 (change du jour), l. 505 (seul endroit où `#panier-err` se cache), l. 602-608 (`montrer`).
- **Comment** : exposer `montrer` et l'appeler à chaque `change` / `input` : sur `#jour` → `montrer("jour", "")` et recalcul du message panier (vide si plus aucun produit hors jour) ; sur `[name=creneau]` → `montrer("creneau", "")` ; sur prénom et e-mail, à la sortie du champ. Au refus « pas cuit ce jour-là », mettre le focus sur le « − » **du produit concerné** (`#recap [data-moins="noix"]`).

### FIX-10 — Le panier après la commande (moyen, 0 $)

- **Quoi** : après « C'est noté, Claire », le rechargement montre toujours 5 articles.
- **Où** : `index.html` l. 623-628.
- **Comment** : après la confirmation, vider `panier`, `sauver()`, `rendre()`, et garder la confirmation affichée avec un lien « Nouvelle commande » qui réactive le bouton.

### FIX-11 — Le premier écran (moyen, 0 $)

- **Quoi** : 240 px vides en bas à 1440 et 1280, pas de prix, dimanche absent.
- **Où** : `index.html` l. 77-83 ; `odette.src.css` l. 86-101 (`.hero`, `.hero-photo`).
- **Comment** : à partir de 1024 px, donner à la photo `aspect-ratio: auto; height: calc(100svh - 7rem - 1.5rem)` (ou `min-height`) pour qu'elle descende jusqu'au bas de l'écran. Remplacer le repère « Levain naturel · 22 heures » par « Miche d'un kilo · 7,20 € » (le prix est l'objection n° 1 du brief). Horaires : réutiliser le statut calculé (« Ouvert jusqu'à 19 h 30 » / « Fermé, réouverture… ») ou écrire « Mar. – sam. 7 h – 19 h 30 · dim. 7 h 30 – 12 h 30 ».

### FIX-12 — Les chiffres de production (moyen, 0 $)

- **Quoi** : « Fournée de 6 h 40 » au singulier pour 280 miches ; « Douze sacs de T80 » « livrés tous les quinze jours » pour environ 170 kg de farine par jour.
- **Où** : `index.html` l. 70, l. 96, l. 263, l. 433 (`JOURNAL[0].texte`), l. 543.
- **Comment** : « première fournée, 6 h 40 » (note du hero et ticket) ; farine : « livrée chaque semaine » et, dans le journal, « Le premier camion de la récolte 2026 : blé coupé le 11 juillet aux Gâts » sans nombre de sacs, ou un nombre juste (« 2 tonnes »).

### FIX-13 — Le journal relié au CMS (moyen, 0 $)

- **Quoi** : les cartes ne sont pas des liens, aucun accès au reste du carnet.
- **Où** : `index.html` l. 305-310 (`tpl-article`), l. 432-436 (`JOURNAL`), l. 555-568.
- **Comment** : ajouter `slug` aux objets, envelopper le titre dans `<a href="journal/${slug}.html">` (lien étiré sur la carte), et un lien « Tout le carnet » sous la grille. Le gabarit reste prêt pour un `fetch`.

### FIX-14 — « tous les jours » (léger, 0 $)

- **Où** : `index.html` l. 443 (`joursTexte`).
- **Comment** : si `j.length >= 6` → « du mardi au dimanche ».

### FIX-15 — Le pied de page (léger, 0 $ et client)

- **Où** : `index.html` l. 393-404.
- **Comment** : ajouter « Lundi fermé » sous les horaires ; transformer « Mentions légales », « Conditions de retrait », « Confidentialité » en liens `<a>` (pages à venir) ; prévoir un lien Instagram (compte réel : **client**) et une inscription au carnet (e-mail), le métier publie.

### FIX-16 — Les apostrophes (léger, 0 $)

- **Où** : tout le texte visible de `index.html` (titres l. 151, FAQ l. 338-339, l. 528, l. 549, l. 626…).
- **Comment** : remplacer `'` par `’` dans le texte affiché (pas dans le code JS hors chaînes).

### FIX-17 — « Sorti du four » avant la fournée (léger, 0 $)

- **Où** : `index.html` l. 92, l. 543.
- **Comment** : avant 6 h 40 le jour même, ticket « Au four à 6 h 40 » ; après, « Sorti du four ce matin ».

### FIX-18 — Ce que seule Odette peut fournir (moyen, client)

Reportage photo au fournil (Odette, Inès, Malo, le four à sole, les huit produits sur le même bois), trois avis signés de vrais clients, le compte Instagram. À noter dans « Ce qui manque encore » : c'est ce qui sépare 86-88 de 90.
