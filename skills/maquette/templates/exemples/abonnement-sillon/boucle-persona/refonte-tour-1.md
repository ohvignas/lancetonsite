# Sillon : boucle persona, refonte, tour 1

- **Date** : 4 novembre 2026
- **Page testée** : `abonnement-sillon/index.html` (v2), servie par mon propre serveur local (`127.0.0.1:4342`, dossier `exemples/`), parce que le 4331 coupait des images (`ERR_CONNECTION_RESET` sur `carottes-640`, `relais-640`, `ferme-640`… au premier passage). Navigateur : Chrome piloté par Playwright.
- **Regard indépendant** : je n'ai lu ni les rapports du relecteur ni les tours précédents (`iteration-*`). J'ai lu `brief.md`, `NOTES.md`, `medias-a-generer.md` et les retours de l'utilisateur du 4 novembre.
- **Qui parle** : Claire et Mathieu Guérin, ferme Sillon, qui paient 25 000 €. Puis Lucie, 34 ans, quartier Zola, qui ouvre la page dans le tram.
- Captures : `refonte-tour-1-captures/` (chemins ci-dessous relatifs à ce dossier).

---

## Partie 1 : rapport de test

### 1. Les 5 premières secondes

| Taille | Capture | Ce que je vois |
|---|---|---|
| 1440 × 900 | `premier-ecran-1440x900.png` | « Le panier bio cueilli la veille » sur 2 lignes, le chapô (14 km, lundi / mardi, 11 relais, dès 16 €, sans engagement), un seul bouton, la photo des potimarrons avec la fiche du petit panier de mardi 3 novembre, et la frise « Novembre, 4 chapitres ». Composé, sans vide. **Bon.** |
| 1280 × 720 | `premier-ecran-1280x720.png` | Même équilibre, le titre ne passe pas sous l'en-tête, la frise tient dans l'écran. **Bon.** |
| 768 × 1024 | `premier-ecran-768x1024.png` | Titre sur 2 lignes, photo pleine largeur, la frise passe sous la ligne de flottaison (le hero fait 1 087 px). Acceptable. |
| 375 × 667 / 812 | `premier-ecran-375x667.png`, `premier-ecran-375x812.png` | Titre 33,6 px sur 2 lignes, chapô sur 3 lignes, bouton visible dans le premier écran, le haut de la photo et de la fiche en dessous. **Bon.** |
| 360 × 740 | `premier-ecran-360x740.png` | Chapô sur 4 lignes, bouton visible. **Bon.** |

En tant que Lucie, en 5 secondes je sais ce qu'on me vend, à qui (Nantes), le prix et le geste. Le retour « hero cassé, trop long, trop grand » est **réglé** : le h1 fait 2 lignes à toutes les tailles, avec un interlettrage normal.

Un défaut fin : la photo du hero doit toucher le bord droit (coins droits carrés), mais elle s'arrête à 1 429 px sur 1 440 (et vers 1 266 sur 1 280). Il reste une bande kraft de 11 px (`zoom-1440-hero-bord-droit.png`).

### 2. Le défilement (1440 et 375)

Série à 1440 : `section-1440-01-hero.png` à `section-1440-13-pied.png`, et le récit à 0, 30, 55, 80 et 100 % (`recit-1440-000.png` … `recit-1440-100.png`). Mêmes séries à 375 (`section-375-*`, `recit-375-chapitre1..4.png`), à 1280, à 768 et à 360 (`section-1280-*`, `section-768-*`, `section-360-*`). Planches : `planche-375-a.png`, `planche-375-b.png`, `planche-360.png`, `planche-768.png`, `planche-1280.png`.

- **Le moment signature marche.** Le récit est épinglé de 1 621 à 4 579 px à 1440. Le fond passe de la terre brûlée au vert poireau, puis au pourpre et à l'olive, et la frise avance. Les liens de la frise du hero mènent au bon chapitre (`parcours-1440-10-frise-betteraves.png`). Sur téléphone, on fait glisser les chapitres au doigt et la frise suit. Rien ne clignote et rien ne cache l'action. La barre collante « Choisir mon panier · dès 16 € » s'efface bien sur le récit, le panier et l'inscription.
- En fin de piste, à 1440, le dernier chapitre ne se cale pas : la S47 reste à gauche sous un bout de photo coupé (`recit-1440-100.png`). C'est léger.
- **Titre cassé, le défaut du retour utilisateur** : « Quatre hectares en bio, à 14 / km de Nantes ». Le nombre est séparé de son unité, avec « à 14 » en fin de ligne 2 et « km de Nantes » en ligne 3, à **1440, 1280, 375 et 360** (`section-1440-02-preuve.png`, `planche-1280.png`, `planche-375-a.png`, `planche-360.png`). Le HTML a pourtant un `&nbsp;` (`index.html:93`). Je l'ai vérifié dans le DOM : SplitText (`gestes.js:295`) découpe en lignes et **remplace l'espace insécable par une espace normale**. Les lignes produites sont `"Quatre hectares "`, `"en bio, à 14 "` et `"km de Nantes"`. En mouvement réduit (sans SplitText), l'insécable tient.
- **Légende coupée** : « Les planches de Saint-Julien… » s'affiche « ˈes planches ». Le L est rogné par le coin arrondi de la `figure` (`overflow: hidden` et `border-radius` sur la figure qui contient la légende, `sillon.src.css:178-180`). On le voit à toutes les tailles (`zoom-1440-legende-champ-coupee.png`, et le « o » d'« octobre » à 375). La légende dit aussi « en octobre » et l'alt « en novembre ».
- **À 768** (`zoom-768-etapes-calendrier.png`) : dans « S'abonner, retirer, mettre en pause », trois colonnes, c'est trop serré. Le mot « Novembre » du mini-calendrier est coupé en haut, « en pause » est coupé en bas, et « Petit · 16 € » passe sur deux lignes (`sillon.src.css:256`, les 3 colonnes dès 768).
- **Titres de section sur ordinateur** : beaucoup de h2 font 3 lignes à 53 px dans une colonne bridée à 12-17 ch, avec un grand vide à côté. C'est le cas du panier, du journal (titre à gauche, lien « Tout le journal » à 900 px de là), de la FAQ (« Les questions / avant de / s'abonner ») et du prix (`section-1440-05`, `-09`, `-10`, `-11`). Aucun n'est coupé, mais ils paraissent « trop grands pour leur boîte », ce que l'utilisateur reproche justement.
- Aucun débordement horizontal à 1440, 1280, 768, 375 et 360 (`scrollWidth` = largeur de la fenêtre). Aucun texte sous 12 px. Interlettrage `normal` (0) sur tous les titres.

### 3. Le parcours de Lucie jusqu'à l'inscription

1. « Choisir mon panier » mène au panier : le haut de la section arrive à 80 px, sous l'en-tête (`parcours-1440-01-choisir-mon-panier.png`).
2. Petit panier : 5 fiches, « 5 légumes · 3,9 kg », 16 €, 64 € par mois. Je bascule sur **Grand** (`parcours-1440-02-grand-panier.png`, `parcours-1440-03-grand-panier-fiches.png`) : l'odomètre passe à 26 €, 104 € par mois, « 6 légumes · 6 kg », le fenouil se dégrise et le bouton devient « S'abonner au grand panier ». La section prix suit : rayon bio 22,91 €, écart 3,09 € (`parcours-1440-04-prix-grand.png`). **Une seule source de données, tout concorde entre les blocs.**
3. « S'abonner au grand panier » mène au formulaire, et « Grand » y est coché (`parcours-1440-05-sabonner-grand.png`).
4. Formulaire vide : trois erreurs claires et le focus va sur le prénom (`parcours-1440-06-formulaire-erreurs.png`). Rempli (Lucie, `lucie.test@exemple.fr`, Zola) : « C'est noté, Lucie. Votre grand panier vous attend mardi au relais Zola, de 17 h à 19 h 30… » (`parcours-1440-07-formulaire-confirmation.png`). Le « 17 / h » est coupé en fin de ligne, faute d'insécable dans le gabarit JS (`index.html:683`). Rien n'est envoyé.
5. FAQ : elle s'ouvre, les réponses tiennent en une phrase (`parcours-1440-08-faq-ouverte.png`). La lettre du lundi répond « Inscrit. Première lettre lundi prochain. »
6. Carte des relais (`section-1440-07-relais.png`, `parcours-1440-09-relais-survol-malakoff.png`) : c'est une vraie illustration gouachée, avec 11 points SVG bien posés sur l'image. Au survol de « Malakoff », le point grossit (r 17 → 27). L'effet est discret, il n'y a **aucun nom sur la carte**, et les pastilles de la liste ne réagissent ni au clic ni au clavier. Sur téléphone, sans survol, les points ne disent rien et la barre collante cache le bas de la carte (`planche-375-a.png`).
7. Téléphone (`planche-375-parcours.png`) : le menu s'ouvre proprement (5 liens, « Fermer »), Échap le ferme et rend le focus au bouton, et « Relais » y mène. La bascule et le résumé du grand panier se lisent bien. Le formulaire passe en une colonne, et son bouton « Réserver mon premier panier » tient sur 2 lignes à 375.

### 4. Le clavier (45 tabulations depuis le haut, 1440)

Ordre : évitement, logo, 4 liens, S'abonner, bouton du hero, amorce S45, frise du hero (4), frise du récit (4), bascule petit / grand, « S'abonner au petit panier », « Tout le journal », 3 articles, 5 questions, prénom, e-mail, formule, relais, bouton, e-mail du pied, 6 liens du plan, lettre, S'inscrire, liens légaux. **Tout est atteint, et le focus est visible partout** : contour orange de 3 px, ou rouille de 2 px dans le formulaire (`clavier-1440-tab01.png` … `clavier-1440-tab40.png`). Seuls manques : les relais de la liste et les points de la carte, que le clavier n'atteint pas (le `select` du formulaire compense).

### 5. Mouvement réduit

`pleine-page-1440-reduit.png` (aperçu : `apercu-pleine-page-1440-reduit.png`) et `pleine-page-375-reduit.png`. Le récit s'empile en 4 cartes de couleur. Aucun élément ne reste invisible (vérifié : 0 élément à opacité < 0,1), et « 14 km » tient sur une ligne. Hauteur : 12,2 écrans à 1440. **Complet et lisible.**

### 6. L'œil du métier (je suis maraîcher)

Ce qui est juste et dont je suis fier : 2014 pour la reprise et 2016 pour la certification (deux ans de conversion, c'est exact), Saint-Julien-de-Concelles et 44450, la rotation sur quatre ans, la récolte du lundi pour un retrait le mardi, la mâche en fin novembre, le mardi 3 novembre 2026 qui est bien un mardi de la semaine 45. Les portraits générés de Claire et de Mathieu sont crédibles : bottes, terre sur les mains, poireaux d'hiver derrière (`section-1440-04-ferme.png`). Le champ avec le tunnel froid et la longère (`section-1440-02-preuve.png`) et le relais du mardi soir (`section-1440-06-comment.png`) le sont aussi.

Ce qui me fait mal, et que n'importe quel maraîcher verrait en trois secondes :

1. **Le fenouil est dans une cagette d'importation** marquée « ITALIA … P.O. Gr. 500 SC. ±15 % » (`recit-1440-100.png`, fiche du panier `parcours-1440-03-grand-panier-fiches.png`). Sur le site d'une ferme locale, c'est le pire message possible.
2. **Les « poireaux de novembre sucrés par le gel » sont des poireaux primeurs** : fûts fins, feuilles vert clair, posés sur une bâche bleue (`recit-1440-055.png`). Des poireaux d'hiver ont un gros fût et des feuilles bleu-vert foncé. La même photo revient **trois fois** (S46, fiche, journal).
3. **« Carottes des sables »** est illustré par des fanes de jeunes carottes encore en terre. Ce n'est pas ce qu'on trouve dans le panier.
4. **Le récit et le panier se contredisent** : la S45 du récit annonce « Potimarron, butternut, carottes des sables » (`index.html:117`), alors que la fiche du panier S45 donne potimarron, carottes, poireaux, pommes de terre et betteraves, sans butternut (`index.html:424-431`).
5. **Le grand panier ne correspond pas à l'offre** : la page affiche « 6 légumes · 6 kg », le brief dit 7 à 8 légumes. Et il revient **plus cher au kilo que le petit** (26 € / 6 kg = 4,33 €/kg contre 16 € / 3,9 kg = 4,10 €/kg). Une famille qui fait le calcul se sent volée.
6. **Le journal se trompe de chiffre** : « Huit cents kilos [de pommes de terre], de quoi tenir jusqu'en mars » (`index.html:437`). Avec 312 foyers et 0,8 à 1 kg par panier, il en sort environ 280 kg par semaine : 800 kg font trois semaines. Pour tenir jusqu'en mars, il en faut 5 à 6 tonnes.
7. Plus petit : « Le froid change l'amidon en sucre » pour le poireau. Le poireau stocke surtout des fructanes, et c'est le panais ou le chou qu'on cite pour ça. Mieux vaut « Le froid les rend plus doux. »
8. **Courges** : la même photo sert trois fois (hero, S45, fiche). On ne voit **jamais la fiche recette**, alors que c'est la réponse à l'objection n° 1 de Lucie (« je ne saurai pas cuisiner ça ») : elle n'existe qu'en texte.
9. **Carte** : Malakoff est placé au sud de la Loire (`data-x 1010, data-y 560`), alors que c'est un quartier de la rive nord. NOTES le reconnaît (« au jugé »), mais un Nantais le verra.
10. **Prix** : la section dit honnêtement que le rayon bio est 2,16 € moins cher. C'est courageux, mais la barre de Sillon est la plus longue et le titre ne dit pas ce qu'on y gagne. Je veux valider ce parti pris avec de vrais tickets avant de le publier.

### 7. Densité (script de `conventions.md` § 11, à 1440)

| Mesure | Valeur | Fourchette |
|---|---|---|
| Mots, mouvement permis | **805** | 500-800 : **5 mots au-dessus** |
| Mots, mouvement réduit | 805 | |
| Sections dans `main` | 12 | 10-13 |
| Écrans à 1440 × 900 | 14,8 (mouvement permis), 12,2 (réduit) | 12-18 |

Détail : évitement 3, en-tête 8, hero 72, preuve 31, récit 75, ferme 56, panier 65, comment 60, relais 33, avis 55, prix 84, journal 63, questions 81, inscription 60, pied **59**. Les 798 mots de `NOTES.md` datent d'avant la ligne de crédits « Exemple fictif · Photos Unsplash et images générées (FLUX.2 Pro) » (`index.html:406`), qui fait passer le pied de 52 à 59 mots.

Sections attendues (§ 11), cochées une à une : hero ✔, preuve ✔, offre / produits ✔ (panier), comment ça marche ✔, qui on est ✔ (Claire, Mathieu, le champ), témoignages ✔ (provisoires, signalés), catalogue ✔ (fiches de la semaine) et articles ✔ (journal daté), tarifs ✔, FAQ ✔ (5 questions), appel final ✔, pied complet ✔. Aucun bloc ne dépasse 3 phrases. Il y a plus de visuels que de texte (photo, carte, graphique ou mini-interface dans chaque section, sauf la FAQ et l'inscription).

**CMS** : `PANIER` et `ARTICLES` sont deux objets en tête de script, rendus par des `<template>`, avec des dates ISO. Une nouvelle semaine se résume à un objet. C'est bien pensé pour être branché.

### 8. Console

Avec mon serveur : **aucune erreur ni avertissement** à 1440, à 375, en mouvement permis comme réduit. Avec le 4331, seulement des `ERR_CONNECTION_RESET` d'images, qui viennent du serveur Python et pas de la page.

---

## Partie 2 : note

### Les 10 points

| # | Point | Résultat | Capture | Pourquoi |
|---|---|---|---|---|
| 1 | Page complète | **Pas OK** (léger) | densité ci-dessus | 12 sections, toutes les sections attendues, 3 phrases au plus par bloc, mais **805 mots** : 5 de trop |
| 2 | Catalogue, articles | OK | `parcours-1440-03-grand-panier-fiches.png`, `section-1440-10-journal.png` | Fiches de la semaine avec poids, prix et « s'abonner », journal daté, tout tiré de deux objets prêts pour un CMS |
| 3 | Titres et promesse | OK | `premier-ecran-1440x900.png` | « Le panier bio cueilli la veille » : concret, 6 mots, et le chapô porte les faits |
| 4 | Typographie d'affichage | OK | `premier-ecran-1440x900.png`, `premier-ecran-375x812.png` | Interlettrage 0, lettres jamais collées |
| 5 | Barre de navigation | OK | `premier-ecran-1440x900.png`, `mobile-375-menu-ouvert.png` | Logo, 4 liens, « S'abonner », menu propre sur téléphone, aucun numéro |
| 6 | Blocs d'action | OK | `section-1440-12-inscription.png` | Deux colonnes : promesse et réassurances / formulaire, prénom et e-mail côte à côte |
| 7 | Hero équilibré | OK | `premier-ecran-1440x900.png`, `premier-ecran-1280x720.png` | Texte, photo, fiche et frise se répondent (bande de 11 px à droite, léger) |
| 8 | Responsive | **Pas OK** | `section-1440-02-preuve.png`, `planche-360.png`, `zoom-768-etapes-calendrier.png` | « à 14 / km » coupé à 1440, 1280, 375 et 360 ; calendrier coupé à 768 ; légende rognée |
| 9 | Images et vidéos | **Pas OK** (métier) | `recit-1440-100.png`, `recit-1440-055.png` | Des photos partout et une carte illustrée soignée, mais un fenouil en cagette « ITALIA », des poireaux primeurs pour novembre, une même photo trois fois |
| 10 | 3D produit | Sans objet | | Pas d'objet 3D |

### Grille sur 100 (`niveau-agence.md` § 6)

| Critère | Points | Note | Pourquoi |
|---|---|---|---|
| Direction artistique | 15 | **13** | Le carnet kraft, la Young Serif, la couleur de chaque chapitre : c'est reconnaissable sans le logo et cohérent du hero au pied. Il manque une signature graphique propre à la ferme (tampon, écriture de Claire) au-delà du tampon « 2016 ». |
| Images | 15 | **10** | Les portraits, le champ, le relais et la cagette générés sont excellents, et la carte est une vraie illustration. Mais trois photos de banque sont fausses pour le métier (fenouil italien, poireaux primeurs sur bâche bleue, semis de carottes), courges et poireaux servent trois fois chacun, et aucune image ne montre la fiche recette. |
| Mise en page | 15 | **12** | Le récit horizontal est suivi, avec un bon rythme de fonds et une bonne alternance d'échelles. Mais plusieurs h2 sont bridés à 3 lignes à côté d'un grand vide, la photo du hero ne touche pas le bord, la légende est rognée et les étapes sont tassées à 768. |
| Mouvement | 10 | **9** | Récit épinglé, fond par chapitre, frise, odomètre, barres animées, apparitions ; le mouvement réduit est respecté. La fin de piste ne se cale pas. |
| Clarté en 5 s et action | 10 | **9** | Quoi, où, combien et quel geste en un écran, à toutes les tailles. Le bouton du hero mène au catalogue puis au formulaire, avec la formule pré-cochée. |
| Densité | 5 | **0** | Comptage fourni, mais 805 mots, au-dessus de 800 : la règle met « Densité » à 0. |
| Preuves et objections | 10 | **6** | Les objections 1 à 4 sont traitées (FAQ, calendrier de pause, petit panier pour deux, prix). Le provisoire est signalé. Mais des données sont fausses ou incohérentes : grand panier à 6 légumes au lieu de 7-8 et plus cher au kilo, butternut absent du panier S45, « 800 kg jusqu'en mars ». La fiche recette n'est jamais montrée. |
| Textes | 10 | **8** | Le h1 est fort et les titres disent des faits ; la voix est directe, sans lyrisme « terroir ». Quelques titres restent plats (« Les questions avant de s'abonner »), et « l'amidon du poireau » est approximatif. La ferme parle encore peu à la première personne. |
| Mobile, accessibilité, légèreté | 10 | **5** (plafond) | Sans le titre cassé, j'aurais mis 9 : zéro débordement, focus visible partout, menu exemplaire, barre collante bien gérée, cibles ≥ 44 px, console propre. Mais un titre coupé à une taille de capture plafonne ce critère à 5. |
| **Sous-total** | 100 | **72** | |
| Pénalité « trop bavarde » | | **−5** | 805 mots, soit une tranche de 50 mots entamée au-delà de 800 |
| **Total** | | **67 / 100** | soit **6,7 / 10** |

**Seuil applicable** : **85** (maquette aux médias provisoires).

**Ce qui est atteignable sans le vrai client**, si j'applique le plan ci-dessous :

- FIX-1 et FIX-2, à 0 $, une demi-heure : le plafond du Mobile et la pénalité tombent, ce qui donne environ **82**.
- FIX-3 à FIX-5 (données) : Preuves à 8, environ **84**.
- FIX-6 (trois images refaites, environ 0,18 $) et FIX-7 (fiche recette visible, voix de Claire) : Images à 12, Preuves et Textes à +1, environ **87-88**.

Au-delà, il faut le vrai client : vraies photos, avis signés, relevé de prix réel, liste des relais avec adresses (FIX-13).

> « La page est enfin à la hauteur de la ferme. Je comprends tout en cinq secondes, Lucie peut s'abonner depuis le tram, et je me reconnais dans les portraits. Mais je ne signe pas un site qui met mon fenouil dans une cagette italienne, qui coupe "14 km" en deux et qui dit que 800 kilos de patates tiennent jusqu'en mars. Ce sont des fautes que mes clients du marché verraient avant moi. »

Verdict : Pas encore. La base vaut l'argent, mais un titre est cassé à quatre tailles et trois erreurs de métier visibles (fenouil italien, poireaux primeurs, chiffres du panier et des pommes de terre) suffisent à me faire refuser la livraison.

---

## Partie 3 : plan de corrections

| FIX | Gravité | Coût | Résumé |
|---|---|---|---|
| FIX-1 | bloquant | 0 $ | « à 14 / km » : SplitText supprime l'insécable, le titre de la preuve est cassé à 1440, 1280, 375 et 360 |
| FIX-2 | majeur | 0 $ | 805 mots : en retirer au moins 5 (la ligne de crédits du pied suffit) |
| FIX-3 | majeur | 0 $ | Grand panier : 6 légumes au lieu de 7-8, plus cher au kilo que le petit |
| FIX-4 | majeur | 0 $ | Récit S45 (butternut) ≠ panier S45 ; « 800 kg jusqu'en mars » faux ; « amidon » du poireau |
| FIX-5 | majeur | génération ≈ 0,18 $ | Photos fausses pour le métier : fenouil en cagette « ITALIA », poireaux primeurs sur bâche bleue, semis de carottes ; une même photo trois fois |
| FIX-6 | majeur | 0 $ (option 0,06 $) | Montrer la fiche recette (objection n° 1) et donner la voix de Claire et Mathieu |
| FIX-7 | moyen | 0 $ | h2 bridés à 3 lignes sur ordinateur, avec un grand vide à côté |
| FIX-8 | moyen | 0 $ | À 768, les étapes en 3 colonnes coupent le mini-calendrier et le choix du panier |
| FIX-9 | moyen | 0 $ | Légende du champ rognée par le coin arrondi ; « octobre » contre « novembre » |
| FIX-10 | moyen | 0 $ (+ client) | Carte : pas de noms, survol faible, rien au clavier ni au doigt, Malakoff sur la mauvaise rive |
| FIX-11 | léger | 0 $ | Photo du hero arrêtée à 11 px du bord droit |
| FIX-12 | léger | 0 $ | Divers : « 17 / h » dans la confirmation, soulignés pointillés des avis, fin de piste du récit, bouton du formulaire sur 2 lignes à 375 |
| FIX-13 | moyen | client | Vrais relevés de prix, avis signés, relais (commerce et adresse), shooting à la ferme |

### FIX-1 : « à 14 / km de Nantes » coupé (bloquant, 0 $)

- **Quoi** : le h2 de la preuve sépare le nombre de son unité à 1440, 1280, 375 et 360. C'est exactement le « texte cassé » du retour utilisateur.
- **Où** : `index.html:93` (`à 14&nbsp;km`), et le découpage dans `gestes.js:295` (`SplitText.create(el, { type: "lines", mask: "lines", autoSplit: true … })`). Dans le DOM après découpage, l'insécable est devenu une espace normale.
- **Comment** : d'abord, côté kit, essayer `reduceWhiteSpace: false` dans l'appel `SplitText.create`, puis vérifier que ` ` survit (`h.textContent.includes(' ')`). Si l'option ne suffit pas, côté page, envelopper le groupe dans `<span class="whitespace-nowrap">à 14 km</span>` et le revérifier. Dernier recours : réécrire le titre sans unité (« Quatre hectares en bio, aux portes de Nantes »). Puis refaire les captures des 13 sections aux 5 largeurs. C'est un retour sur le plugin, à noter dans NOTES § 9 : tout titre `data-split` avec une insécable est touché.

### FIX-2 : 805 mots pour un budget de 800 (majeur, 0 $)

- **Quoi** : 5 mots de trop, qui coûtent 10 points (Densité 0 et pénalité de −5).
- **Où** : `index.html:406`, « Exemple fictif · Photos Unsplash et images générées (FLUX.2 Pro) · Haut de page ».
- **Comment** : garder seulement « Haut de page » ou « Exemple fictif ». Les crédits sont déjà dans le commentaire HTML (lignes 3-5) et dans NOTES § 5. Recompter avec le script § 11 et viser 790 au plus, pour garder de la marge pour FIX-6.

### FIX-3 : le grand panier contredit l'offre (majeur, 0 $)

- **Quoi** : « 6 légumes · 6 kg », alors que l'offre annonce 7 à 8 légumes. À 26 € pour 6 kg contre 16 € pour 3,9 kg, le grand panier coûte plus cher au kilo.
- **Où** : `index.html:424-431` (`PANIER.legumes`).
- **Comment** : ajouter un 7ᵉ légume réservé au grand panier, de saison et nantais : **mâche 250 g** ou **chou de Milan**, déjà cité en S46. Ajuster les poids pour que le grand panier fasse environ 6 kg et le petit environ 3,6 kg (4,44 €/kg pour le petit, 4,33 €/kg pour le grand), dans les fourchettes du brief. La fiche, le résumé, le relevé et l'écart de prix se recalculent seuls. Le marquer « à confirmer par la ferme ».

### FIX-4 : chiffres et faits incohérents (majeur, 0 $)

- **Où et comment** :
  - `index.html:117` : remplacer « Potimarron, butternut, carottes des sables, et la fiche du velouté. » par « Potimarron, carottes des sables, poireaux, et la fiche du velouté. » (même contenu que `PANIER`, semaine 45).
  - `index.html:437` : « Huit cents kilos, de quoi tenir jusqu'en mars » devient « Six tonnes, de quoi tenir jusqu'en mars ». Le calcul : 312 foyers × environ 0,9 kg × 20 semaines ≈ 5,6 t.
  - `index.html:436` : « Le froid change l'amidon en sucre » devient « Le froid les rend plus doux. »
  - `index.html:89-90` : accorder l'alt (« en novembre ») et la légende (« en octobre »).

### FIX-5 : photos fausses pour le métier (majeur, génération ≈ 0,18 $)

- **Quoi** : `fenouil-1200/640.webp` montre une cagette d'import « ITALIA P.O. Gr. 500 » ; `poireaux-1200/640.webp` des poireaux primeurs fins sur bâche bleue ; `carottes-640.webp` des semis de carottes en terre. Courges et poireaux servent trois fois chacun.
- **Où** : `index.html:121, 137` (récit), `index.html:426-430` (fiches), `index.html:436` (journal).
- **Comment** : trois images FLUX.2 Pro, même style commun que `medias-a-generer.md` (≈ 0,06 $ chacune), même nom et même ratio :
  1. poireaux d'hiver arrachés le matin, gros fûts blancs, feuilles bleu-vert, givre, dans une cagette de la ferme ;
  2. bulbes de fenouil dans une cagette en bois **sans aucun marquage**, terre aux racines ;
  3. carottes des sables tout juste tirées, fanes, sable clair collé.

  Pour le journal, prendre un recadrage du champ (`champ-800`) plutôt que la troisième occurrence des poireaux. Pour la fiche potimarron, un recadrage différent de celui du hero.

### FIX-6 : la fiche recette et la voix des personnes (majeur, 0 $ ; option 0,06 $)

- **Quoi** : l'objection n° 1 (« je ne saurai pas cuisiner ça ») n'a pas d'image. La fiche recette, promise dans le brief (« le récit montre une fiche dès la semaine 45 »), n'apparaît nulle part. Dans `#ferme`, une seule phrase à la troisième personne : l'utilisateur a demandé « plus d'éléments sur la ferme et les personnes ».
- **Où** : `index.html:112-118` (chapitre S45) ou l'étape 1 de `#comment` (`index.html:216-224`) ; `#ferme`, `index.html:164-171`.
- **Comment** :
  - Dessiner en HTML / CSS une petite fiche de papier (comme la fiche du hero) : « Fiche S45 · Velouté de potimarron · 20 min · 1 casserole », signée « Claire », posée sur la photo S45.
  - Dans `#ferme`, remplacer la phrase par une citation courte de Claire à la première personne, par exemple : « On récolte le lundi pour que vous cuisiniez le mardi. »
  - Option à 0,06 $ : Mathieu à la récolte du lundi matin, cagettes alignées, pour la section `#comment` ou `#ferme`.
  - Tenir le budget de 800 mots (voir FIX-2).

### FIX-7 : des h2 trop serrés sur ordinateur (moyen, 0 $)

- **Quoi** : à 1440 et 1280, beaucoup de h2 font 3 lignes à côté d'un grand vide (panier, journal, FAQ, prix, relais).
- **Où** : `sillon.src.css:207` (`.panier-tete h2 { max-width: 17ch }`), `:260` (16ch), `:283` (15ch), `:301` (15ch), `:316` (`.faq-grille h2 { max-width: 12ch }`).
- **Comment** : à partir de 1024 px, passer à 20-22 ch (et la FAQ à 16 ch) pour revenir à 2 lignes, sans toucher aux tailles sur téléphone. Revérifier à 1280.

### FIX-8 : étapes tassées à 768 (moyen, 0 $)

- **Où** : `sillon.src.css:256` (`@media (min-width: 768px) { .etapes { grid-template-columns: repeat(3, …) } }`), et `.etape-visuel` à la ligne 241 (`aspect-ratio: 4 / 3; overflow: hidden`).
- **Comment** : n'afficher 3 colonnes qu'à partir de 1024 px (une ou deux colonnes à 768), ou laisser la hauteur des visuels de code s'adapter (`aspect-ratio: auto; min-height`). Contrôler « Novembre », « en pause » et « Petit · 16 € » sur une seule ligne.

### FIX-9 : la légende du champ rognée (moyen, 0 $)

- **Où** : `sillon.src.css:178-180` (`.preuve-photo { overflow: hidden; border-radius: 20px }` alors que la figure contient la `figcaption`).
- **Comment** : mettre l'arrondi et le `overflow` sur l'`img` (ou sur un conteneur de l'image), et non sur la figure. Vérifier aussi `.avis-photo` (ligne 272) et `.portrait`.

### FIX-10 : la carte ne dit pas où sont les relais (moyen, 0 $ + client)

- **Où** : `index.html:250-262` (liste et coordonnées), `index.html:646-660` (script), `sillon.src.css:266-267`.
- **Comment** :
  - Faire de chaque relais un `<button>` qui active le point au survol, au focus et au toucher.
  - Afficher le nom du relais près du point actif (un `<text>` SVG) et changer la couleur du point actif (courge), pas seulement son rayon.
  - Recaler Malakoff sur la rive nord, à l'est.
  - Côté client : le nom du commerce et la rue de chaque relais (FIX-13).

### FIX-11 : la photo du hero ne touche pas le bord (léger, 0 $)

- **Où** : `sillon.src.css:101` (colonne de 50vw) et `:104` (`.hero-amorce { width: 52vw }`). Mesure : bord droit à 1 429 px pour une fenêtre de 1 440.
- **Comment** : `margin-right: calc(50% - 50vw)` ou une largeur calculée jusqu'au bord du viewport. Contrôler à 1280 et 1440.

### FIX-12 : finitions (léger, 0 $)

- `index.html:683` : mettre des insécables dans « de 17 h à 19 h 30 » (`17 h`, `19 h 30`).
- `sillon.src.css:50` : le soulignement pointillé `.provisoire` fait croire à des liens ou à des fautes. Le remplacer par une petite étiquette « avis provisoire » sous les trois témoignages.
- Récit à 1440 : caler le dernier chapitre en fin de piste (padding de fin de piste égal à 100vw moins la largeur du chapitre).
- Formulaire à 375 : raccourcir le bouton (« Réserver mon panier ») pour qu'il tienne sur une ligne.

### FIX-13 : ce que seul le vrai client peut fournir (moyen, client)

- Relevé réel du rayon bio, avec tickets et date, et décision sur le parti pris « nous sommes 2 € plus chers, voici pourquoi ». Peut-être y ajouter le prix du marché.
- Trois avis réels, signés (prénom, relais, formule).
- La liste des 11 relais : nom du commerce, adresse, et éventuellement horaires propres.
- Un shooting à la ferme en novembre, qui remplacera toutes les photos de banque (fiches légumes, récit, journal) et confirmera les portraits.
- Les vrais chiffres (312 foyers, 60 légumes, poids des paniers).
