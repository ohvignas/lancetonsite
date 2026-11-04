# Sablon — exemple « galerie ou portfolio » (céramiste)

Bastien Sablon est un céramiste fictif de Dieulefit (Drôme). Il tourne la vaisselle en grès des restaurants. La page d'accueil se compose de `index.html`, de `gestes.js` (copie figée du kit) et de 24 photos libres, toutes passées au même étalonnage. Quatre images sont générées (4 nov. 2026, `black-forest-labs/flux.2-pro` via OpenRouter, 0,15 $, même étalonnage que la séance) : voir § 5.

Tout est inventé : le céramiste, l'atelier, l'adresse, les restaurants, les chefs et leurs avis, les prix, les délais et les articles du journal. Le formulaire n'envoie rien. Le brief du client-persona est dans `brief.md`.

**Refonte du 4 novembre 2026**, d'après `test-lancetonsite/retours-utilisateur-2026-11-04.md` et les consignes de la session principale. Avant, la page faisait 7 sections et 243 mots, et l'en-tête portait le `h1`. Le retour de l'utilisateur : le hero était trop simple, et les sections suivantes tenaient mais n'étaient pas assez travaillées. La page passe à 12 sections et 782 mots, avec :
- un hero composé ;
- un catalogue de pièces avec prix et série d'essai ;
- la méthode avec ses délais ;
- les avis de chefs ;
- un journal prêt pour un CMS ;
- une FAQ ;
- une demande en deux colonnes ;
- un pied de page complet.

La composition galerie est gardée : les images d'abord, un mur, un projet ouvert, un index et une série horizontale.

## Structure du dossier

```
index.html           la page : 12 sections (GSAP 3.15 + ScrollTrigger + SplitText, Lenis 1.3.27),
                     données PIECES / JOURNAL rendues par <template>, scripts de page
sablon.src.css       source Tailwind v4 → sablon.css compilé, minifié
gestes.js            copie figée de templates/prototype/gestes.js (non modifiée)
images/              24 photos × 2 largeurs (webp, srcset), de 14 à 153 Ko
captures/            d-XX-1440 (page entière par écrans), m-XX-375x812, premiers écrans 375x667 et 360x740,
                     taille-{1440,1280,768,375,360} (premier écran à chaque taille), r-00-reduit-1440,
                     gestes : m-menu-375x812, d-essai-1440, d-formulaire-1440, d-faq-1440 ; verif.json
medias-a-generer.md  4 photos à générer (priorité : vaisselle servie en restaurant)
brief.md             cadrage et persona pour la boucle client-persona
```

## 1. Direction artistique

Elle est inchangée sur le fond.

- **Palette.** Le fond a la couleur du grès cru. Les sections sombres ont celle de l'ardoise de l'établi. Un seul accent : l'oxyde de fer.
  - Couleurs : terre `#ECE7DF`, encre `#1C1A17`, gris `#5B564E`, four `#1B1917`, craie `#F4F1EA`, oxyde `#8C3D22`.
  - Nouveau jeton `--color-oxyde-clair: #e3a78f`, pour les numéros et les prix sur fond sombre.
- **Typographie.** Instrument Serif et Hanken Grotesk. L'interlettrage des titres d'affichage est à 0 : jamais négatif (règle commune).
- **Ce qui est nouveau :**
  - Le hero est composé : texte à gauche (5/12) et œuvre à droite (7/12). Une vignette de pièce finie est posée en surimpression, avec un léger parallaxe.
  - Les fiches du catalogue suivent le format des cartels : photo 4:5, nom, dimensions, deux prix.
  - L'index de navigation reprend le modèle *book-serif-index* : entrées numérotées 01 à 05, et un menu plein écran sur téléphone.

## 2. Accroches (skills `ogilvy` et `copywriting`)

Le positionnement : de la vaisselle en grès tournée pour les restaurants, et réassortie à l'identique. Selon le brief, l'objection n° 1 est la casse et le réassort. La promesse unique est donc **« les mêmes assiettes dans cinq ans »**. La preuve qui la porte : la fiche d'émail gardée par l'atelier.

| | Titre du hero | Commentaire |
|---|---|---|
| A | « Vaisselle artisanale pour la restauration » | Tout atelier peut la signer, et elle ne contient pas de promesse. |
| B | « Bastien Sablon, céramiste à Dieulefit » | Un nom et un métier, sans bénéfice : c'était l'ancien `h1`, jugé trop simple. |
| C | « Des assiettes qu'on reconnaît avant de lire la carte » | Elle est fière, mais ne répond à aucune objection et reste vague. |
| **D — retenue** | **« Vos assiettes, tournées à Dieulefit. Les mêmes dans cinq ans. »** | Elle donne le lieu (la marque), la promesse et la réponse à l'objection n° 1, en 11 mots. Le « vos » désigne le chef. |

- **Sous-titre :** « Je tourne en grès la vaisselle des restaurants, dans un émail à votre nom. Sa recette reste en fiche : un réassort arrive sous trois semaines. »
- **Action :** « Demander la série d'essai → ». Formule : verbe + ce qu'on obtient.
- **Titres des sections :** chacun porte un fait, par exemple « Six pièces de base, dans l'émail de votre maison » ou « De la série d'essai au service complet : 14 semaines ». Les avis sont présentés par « Trois chefs, deux ans de service ».

## 3. Sections et gestes

Pour la navigation, le modèle vient de la skill ui-skills `mengto/book-serif-index` :
- logo texte, puis index numéroté 01 Pièces, 02 Projets, 03 Méthode, 04 L'atelier, 05 Journal, visible dès 1024 px ;
- bouton « Série d'essai » dès 640 px ;
- bouton « Menu », qui ouvre un panneau plein écran avec liste numérotée et action. Échap ferme le panneau et rend le focus. Le défilement Lenis est arrêté pendant l'ouverture.

Aucun numéro de téléphone n'apparaît sur la page.

| # | Section | Contenu | Gestes |
|---|---|---|---|
| 1 | `#oeuvre` | Hero composé : surtitre, `h1`, sous-titre, action et lien « Voir les pièces », trois assurances (dès 40 pièces, 10 à 14 semaines, lave-vaisselle pro). Grande image 3:2 avec cartel, et vignette « Après cuisson : émail mat moucheté ». Sous 1024 px, l'ordre devient titre → image → texte → action, pour que l'œuvre soit dans le premier écran. | `data-intro`, `data-parallax` (vignette), `data-magnetic` |
| 2 | `#preuve` | « Ils servent dans mon grès » : cinq maisons ; 604 pièces livrées depuis 2023, 3 semaines de réassort, 5 émaux en fiche | `data-counter`, `data-reveal-group` |
| 3 | `#mur` | Premier mouvement de galerie : « Chaque maison a son émail. Je le garde en fiche. » Mur irrégulier de 4 formats ; chaque vignette ouvre son projet | `data-split`, `data-image-reveal`, `data-tilt`, `data-cursor-label="Voir"` |
| 4 | `#pieces` | Catalogue de 6 fiches : photo, nom, dimensions, prix à l'unité et en série, bouton « Ajouter à la série d'essai ». Le compteur est collant (« n / 4 pièces · 160 € déduits »). Données dans `window.PIECES`, rendu par `template#tpl-piece`. | `data-split`, `data-reveal` ; script de page : 4 pièces au plus, `aria-pressed`, boutons désactivés une fois la série pleine, synchronisés avec les cases du formulaire |
| 5 | `#ouvert` | Moment signature : « Craie : 320 assiettes pour la Maison Ardoise », trois faits | `data-grow`, `data-reveal-group` |
| 6 | `#projets` | Index de 5 projets, chacun avec année, nom, client et quantité, qui s'ouvre sur une photo et une ligne | `data-follow-list`, `data-accordion` |
| 7 | `#methode` | « De la série d'essai au service complet : 14 semaines ». 5 étapes, chacune avec son délai : série d'essai, commande, tournage, émail et cuissons, livraison | `data-hscroll` (le seul épinglage) |
| 8 | `#atelier` | Portrait, vignette au tour en parallaxe ; « Un tour, un four, une seule paire de mains » ; 2014, 1 200 pièces par an, Dieulefit | `data-image-reveal`, `data-parallax`, `data-reveal-group` |
| 9 | `#avis` | Trois chefs : Maison Ardoise, Café Remous, Bistrot du Lavoir. Chaque avis a sa photo et une citation de trois phrases au plus. | `data-reveal-group` |
| 10 | `#journal` | Trois cartes datées (`<time datetime>`), données dans `window.JOURNAL` et rendues par `template#tpl-article`. `url: null` affiche une carte sans lien ; une URL de CMS la rend cliquable. | `data-split` |
| 11 | `#faq` | 4 questions : lave-vaisselle pro, casse (dix par mois), « les mêmes dans cinq ans », minimum de commande | `data-accordion` |
| 12 | `#ecrire` | Deux colonnes dès 1024 px. À gauche : « Commencez par quatre pièces », 160 € déduits, 4 garanties. À droite : nom, restaurant et ville, e-mail, couverts (liste), pièces de la série (cases générées depuis `PIECES`). | `data-magnetic` ; validation accessible ; la confirmation reprend le nombre de pièces choisies |

Hors `main` :
- **Pied de page :** marque, plan du site, l'atelier (adresse provisoire, visites sur rendez-vous, e-mail), crédits photo, mentions et confidentialité marquées provisoires.
- **Barre d'action mobile :** masquée sur le catalogue, sur la demande et sur le pied.
- **Curseur « Voir ».**
- `data-bg` et `data-fg` sont posés sur toutes les sections et sur le pied.

Les cinq objections du brief ont chacune leur réponse :

| Objection | Où la page y répond |
|---|---|
| Casse et réassort | Le titre du hero, la FAQ, le chiffre « 3 semaines » |
| Lave-vaisselle pro | Les assurances du hero, la FAQ |
| Délai | La méthode en 14 semaines |
| Prix et minimum | Le catalogue, la FAQ |
| Acheter sur photo | La série d'essai, choisie dans le catalogue |

## 4. Densité (`conventions.md` § 11, script `dens-fn.js`)

| Mesure | Valeur | Cible |
|---|---|---|
| Mots, mouvement réduit et animé, 1440 | **782** | 500–800 |
| Sections dans `main` | **12** | 10–13 |
| Hauteur à 1440 × 900 | 16,1 écrans en mouvement réduit, 17,4 en animé | — |

Détail par section :

| Section | Mots |
|---|---|
| Évitement | 3 |
| En-tête | 12 |
| Œuvre | 66 |
| Preuve | 37 |
| Mur | 33 |
| Pièces | 104 |
| Ouvert | 30 |
| Projets | 62 |
| Méthode | 72 |
| Atelier | 43 |
| Avis | 62 |
| Journal | 60 |
| FAQ | 82 |
| Demande | 74 |
| Pied | 42 |

Le premier jet faisait 990 mots. Il est passé à 856, puis à 782, en trois coupes :
- une question de FAQ retirée ;
- des phrases d'introduction supprimées ;
- les signatures des avis raccourcies.

Aucun bloc ne dépasse trois phrases. `verif.js` compte 717 mots, parce qu'il ignore le corps des accordéons fermés ; c'est `dens-fn.js` qui fait foi.

## 5. Photos (provisoires, Pexels, licence libre, crédits en pied de page)

Étalonnage commun (PIL) :
- saturation × 0,8 ;
- contraste × 1,04 ;
- gamma 0,97 ;
- rouge × 1,02, bleu × 0,965 ;
- puis `cwebp`.

Les nouvelles photos sont passées au même étalonnage que la séance de l'atelier.

| Fichier (2 largeurs) | Pexels | Auteur | Note |
|---|---|---|---|
| hero-table 1200 / 2400 | **généré** | FLUX.2 Pro (OpenRouter, 0,06 $) | Prompt 1 : service Craie servi sur ardoise |
| ouvert-craie 1200 / 2400 (3:2) | **généré** | FLUX.2 Pro | Tour 2 de la refonte (FIX-19) : piles d'assiettes Craie émaillées (grès blanc moucheté, bord brun) sur la table d'atelier, potier en tablier qui en tient une (visage hors champ), four en briques et papier kraft au fond. Mêmes noms et dimensions que l'ancienne photo Pexels. |
| mur-*, index-*, serie-*, portrait | 6611110, 6611475, 6611304, 6611426, 6611360, 6611129 / 410 / 357 / 307 / 249, 6611409 / 273 / 315 / 210, 6611363 | Yan Krukov | Inchangés |
| journal-assiettes 600 / 1000 (3:2) | 6611494 | Yan Krukov | Nouveau : piles d'assiettes crues |
| piece-assiette, piece-bol, piece-tasse, piece-coupelle 600 / 1000 (4:5) | **généré** | FLUX.2 Pro | Régénérées au tour 1 de la refonte (FIX-4) dans le même émail moucheté que piece-plat et piece-creuse, sur chêne, fond enduit crème. La séance Ласаева n'est plus utilisée. |
| avis-salle 600 / 1000 (3:2) | **généré** | FLUX.2 Pro (0,03 $) | Prompt 2 : assiette creuse posée en salle ; carré recadré en 3:2 |
| piece-creuse 600 / 1000 (4:5) | **généré** | FLUX.2 Pro (0,03 $) | Prompt 4 : assiette à aile, bœuf braisé ; carré recadré en 4:5 |
| piece-plat 600 / 1000 (4:5) | **généré** | FLUX.2 Pro (0,03 $) | Prompt 3 : plat émaillé ; la fiche passe à « Mat moucheté » |

Les légendes restent fidèles aux photos : une pièce crue est dite « avant cuisson » ou « au séchage », une pièce émaillée « mat moucheté ».

## 6. Vérification (Playwright, Chrome, serveur Node local)

| Contrôle | Résultat |
|---|---|
| Débordement horizontal (1440, 1280, 768, 375 × 812, 375 × 667, 360 × 740) | 0 px |
| Texte < 12 px | aucun |
| `h1` sous l'en-tête | oui partout : écart de 142 px à 1440, 72 px sur téléphone |
| Mouvement réduit | page complète, 0 élément invisible, méthode en grille, aucun épinglage |
| Console | propre, en animé comme en réduit |
| Menu mobile | s'ouvre avec `aria-expanded="true"` et le focus sur « 01 Pièces » ; Échap le ferme et rend le focus au bouton ; un lien ferme le menu et mène à la section |
| Série d'essai | 4 pièces choisies : les 2 autres sont désactivées, les cases du formulaire suivent (`x-xx-x`) ; retirer une pièce les réactive |
| Formulaire | vide : « Indiquez votre nom. », focus sur le nom ; rempli : la confirmation reprend le nombre de pièces |
| FAQ | un seul panneau ouvert à la fois |
| Interlettrage des titres | `normal` ; 1,04 px pour les surtitres en capitales ; jamais négatif |
| Poids des images | 14 à 153 Ko |

Scripts (bac à sable de la session) :
- `verif.js` ;
- `sab-q.js` : densité dans les deux modes, débordement et captures aux 5 tailles ;
- `sab-gestes.js` : menu, série d'essai, formulaire, FAQ, interlettrage.

## 7. Ce qui reste faible

- **Aucune pièce de Bastien n'est servie en restaurant.** La seule assiette « servie » vient d'une autre séance (Geovane Souza, autre lumière). La priorité n° 1 de `medias-a-generer.md` traite ce point.
- **Images réutilisées :**
  - `mur-detail` et `mur-galet` dans le mur et dans le journal ;
  - `index-galet` dans les projets et dans les avis ;
  - `serie-etaler` dans les avis.

  La séance n'a pas assez de plans distincts.
- **Plat Lavoir.** Sa fiche est la seule montrée crue (« Avant cuisson »), ce qui casse la série du catalogue. C'est la priorité n° 3.
- **Contenu provisoire.** Les avis de chefs, les prix et l'adresse sont inventés et marqués `provisoire` là où il faut.
- **Hauteur.** La page fait 16 à 17 écrans : c'est long pour un téléphone, même si les 12 sections sont dans la cible. La galerie horizontale de la méthode en ajoute à elle seule près de deux.
- **Index des projets sur téléphone.** Il ne montre ses images qu'à l'ouverture d'une ligne, puisque le survol n'existe pas. C'est le comportement du kit.

## 8. Boucle persona

Tour 1 de la refonte : `boucle-persona/refonte-tour-1.md` (74/100, « Pas encore »). Corrections appliquées : § 10. Tour 2 : `boucle-persona/refonte-tour-2.md` (85/100, « Oui »). Corrections finales : § 11. Le tour sur l'ancienne page de 7 sections est dans `boucle-persona/iteration-1`.

## 9. Retours sur le plugin

Ces retours s'ajoutent à ceux de la première version, qui tiennent toujours :
- `data-follow-list` lit aussi les nœuds `aria-hidden` ;
- son arrondi est codé en dur ;
- aucun motif n'existe pour un en-tête transparent sur une œuvre.

Nouveaux retours :

- **Faux positif du hook impeccable.** Le hook signale `broken-image` sur les `<img>` d'un `<template>`, qui n'ont pas de `src` avant le rendu. Il devrait ignorer le contenu des `<template>`.
- **Autres alertes du hook impeccable, gardées volontairement** (état final, tour 2 à 85) :
  - `cramped-padding` « flush against border-top/bottom » sur le menu, l'index, la FAQ, la ligne d'inscription et `.page` : ce sont des filets fins qui séparent des lignes, sans fond ni cadre autour. Le texte n'est collé à aucune boîte.
  - `tight-leading` 1,11 : il porte sur le titre d'affiche en Instrument Serif, pas sur le texte courant.
  - `overused-font` Instrument Serif et `cream-palette` #ece7df : ce sont les choix de la charte (fond argile, catalogue de céramiste), validés par la persona.
  - `hero-eyebrow-chip` sur « Atelier Sablon · Dieulefit, Drôme » : c'est un vrai motif générique. Le lieu sert de preuve pour un acheteur de restaurant, donc on le garde. Pour une vraie marque, le passer dans l'en-tête ou dans le cartel de la photo.
- **`$TMPDIR` hors bac à sable.** Il pointe ailleurs : `tw.sh` est introuvable via `$TMPDIR` dans une commande lancée hors bac à sable. Les scripts du plugin devraient utiliser un chemin absolu.
- **Serveur Python.** Le bac à sable interdit l'écoute locale. Hors bac à sable, `python3 -m http.server` coupe des connexions quand plusieurs exemples tournent : `gestes.js` saute, et la page reste statique sans erreur visible. Un petit serveur Node statique (`no-store`) règle le problème ; il mérite d'être fourni par le plugin.
- **Clics forcés de Playwright.** `click({ force: true })` sur un bouton hors écran ne déclenche rien de façon fiable. Les scripts de test doivent faire `scrollIntoViewIfNeeded()` d'abord.

## 10. Tour 1 de la refonte : corrections appliquées

Plan : `boucle-persona/refonte-tour-1.md` § 3. Tout est fait à 0 $, sans génération ni téléchargement. FIX-4, 6 et 7 (côté images) avaient été faits avant ce passage. Fichiers touchés : `index.html`, `sablon.src.css`, `sablon.css` (recompilé avec `tw.sh`), ce fichier. `gestes.js` n'est pas modifié.

| FIX | État | Ce qui a été fait |
|---|---|---|
| FIX-1 | fait | Titre de la méthode sans deux-points : « Quatorze semaines, de l'essai au service complet » (7 mots). Aucun titre découpé par SplitText ne contient plus `: ; ? !`, sauf « Craie&nbsp;: 320 assiettes… », vérifié sans casse aux 6 tailles en animé. |
| FIX-2 | fait | `.entete` porte le fond du hero (`--color-four`) avec un filet ; `.is-solide` garde le passage au clair. Mesure : fond `rgb(27,25,23)` à 150, 300 et 500 px de défilement, à toutes les tailles. |
| FIX-3 | fait | Sous 1024 px : titre, image, **action**, sous-titre, assurances. Le bouton est à y = 598–654 à 375 × 812 et 375 × 667, 588–645 à 360 × 740, 737–794 à 768 × 1024. La barre mobile garde son ancre `#oeuvre`. |
| FIX-4 | fait | Images : déjà régénérées. Ici : la légende du mur devient « **Tasses d'essai**, émaillées · 2025 » et la vignette mène au catalogue (`#pieces`), plus au projet Galet. La seule « Tasse Galet » de la page est la fiche du catalogue. |
| FIX-5 | fait | Mur : « **Gobelets et pichets**, au séchage · 2024 », lien vers `#projets`, alt corrigé. Projet ouvert : cartel « **Craie**, au séchage avant émail », avec un dégradé pour rester lisible sur les assiettes blanches. |
| FIX-6 | fait | Côté images, déjà fait (04 `methode-emailler`, 05 `methode-caisses`). Ici : 01 = `serie-monter` (il monte un bol), 02 = `mur-detail` (la barbotine, la terre de la fiche). |
| FIX-7 | fait | Déjà fait (`avis-cafe`, `avis-bistrot`). |
| FIX-8 | fait | **Zéro doublon** : les 28 fichiers images servent chacun à un seul endroit (vérifié par `grep`, hors `srcset` ; le `data-follow-img` d'une ligne d'index vit avec son image). Il y avait 31 emplacements pour 28 images : 3 emplacements retirés, le reste réaffecté. Retirés : le détail « barbotine » du mur (le mur passe à trois images) et les images de deux articles du journal (un article illustré, deux en texte). Réaffectés : vignette du hero = `index-craie` (« Craie, avant cuisson ») ; projet Craie = `journal-assiettes` ; article du journal = `serie-lisser` (« Réassort Silo&nbsp;: un vase pour Grignan ») ; geste de l'atelier = `serie-etaler` (la plaque au laminoir) ; méthode 01 et 02, voir FIX-6. |
| FIX-9 | fait | Étape 01 : « Quatre pièces dans un de mes cinq émaux, chez vous sous huit jours. » Demande : « 160&nbsp;€ les quatre pièces, port compris, déduits de votre commande. » |
| FIX-10 | fait | Mur à trois images dès 768 px : grande (1/8), Silo haut à droite (9/13, `margin-top: 7rem`), tasses (3/7, rang 2). Plus de demi-largeur vide sur un écran. |
| FIX-11 | fait | Sous 640 px, deux fiches par ligne (nom 1,25rem, prix et cotes en 0,8125rem, bouton pleine largeur) : le catalogue fait 1,3 écran à 375 × 812 au lieu de 6. Barre d'essai plus fine, `bottom: .5rem`. |
| FIX-12 | fait | Assiette creuse : « Ø 28 cm · 50 cl ». Toutes les cotes et tous les prix ont une espace insécable (Ø, nombre, unité, €). |
| FIX-13 | fait | Le chiffre « 1 200 pièces par an » de l'atelier est remplacé par « Seconde cuisson · 1 280 °C » : il ne reste qu'un volume sur la page, 604 pièces livrées depuis 2023, égal à la somme des projets. |
| FIX-14 | fait | Pied : inscription au journal (« Le journal, une fois par mois », champ e-mail et « S'inscrire », validé, rien n'est envoyé), lien Instagram provisoire, mentions et confidentialité en liens (`href="#"`, provisoires), crédits ramenés à « Photos&nbsp;: Pexels et images générées. » |
| FIX-15 | fait | « Avant de commander » devient « Ce que les chefs demandent d'abord » ; « Le journal de l'atelier » devient « Cet automne à l'atelier » (les articles sont datés de septembre et octobre). La preuve reçoit un visuel : le profil coté de l'assiette Craie, dessiné en SVG comme sur une fiche (pas de photo, pour ne rien doubler). |
| FIX-16 | fait | Sous 640 px, la légende de la vignette est masquée (plus de collision avec le cartel). De 640 à 1023 px, le titre du hero tient en deux lignes pleine largeur (une phrase par ligne) et la vignette passe à 21 %. La vignette montre maintenant `index-craie` : plus de demi-assiette unie. |
| FIX-17 | fait | La confirmation dit « Bastien vous écrit » si le contact contient `@`, « vous rappelle » sinon. |
| FIX-18 | non fait (client) | À fournir par le vrai client : photos des services servis chez ses clients, fiches d'émail réelles, vrais avis nommés avec autorisation, prix HT réels et règle de la série d'essai, adresse, liens légaux et Instagram. À reporter dans `maquette.md`, rubrique « Ce qui manque encore ». |

**Mesures après corrections** (script de `conventions.md` § 11, `compte-pane.js`, Playwright 1.65 + Google Chrome, serveur Node local `no-store` sur 127.0.0.1:4352) :

| Mesure | Valeur |
|---|---|
| Mots, 1440 × 900, animé et réduit | **796** (avant : 793) |
| Sections dans `main` | **12** |
| Hauteur | 17,7 écrans animé et 16,3 réduit à 1440 × 900 ; 19,5 à 375 × 812 (avant : 20,2) |
| Débordement horizontal (1440, 1280, 768, 375 × 812, 375 × 667, 360 × 740) | 0 px, animé et réduit |
| Titres `h1`/`h2` commençant une ligne par `: ; ? !` | aucun, aux 6 tailles, animé et réduit |
| Interlettrage négatif | aucun |
| Console | vide (aucune erreur, aucune requête échouée) aux 12 passages |
| Parcours | série d'essai, formulaire rempli (« vous écrit »), inscription (refus puis accord) : conformes |

Détail en mots : évitement 3, en-tête 12, œuvre 64, preuve 37, mur 31, pièces 103, ouvert 35, projets 62, méthode 76, atelier 43, avis 62, journal 59, FAQ 85, demande 77, pied 47.

**Ce qui reste faible après ce tour :**
- Il ne reste que 4 mots de marge sous 800.
- La méthode enchaîne trois plans d'atelier proches (01 bol au tour, 02 barbotine, 03 centrage) ; seul 04 et 05 montrent l'émail et la livraison. Une image de la série d'essai servie chez un chef réglerait 01 (génération ou FIX-18).
- L'article « Réassort Silo » (`serie-lisser`) et la vignette « Vase Silo » du mur (`mur-silo`) sont deux fichiers distincts, mais deux plans très proches de la même séance.
- Le mur n'a plus qu'une photo émaillée sur trois, sous un titre qui parle d'émail.
- Le lien e-mail du pied reste une cible de 20 px de haut (dans `<address>`).
- Le serveur Python (`python3 -m http.server`) a encore coupé des connexions au premier passage (`gestes.js` et trois images en `ERR_CONNECTION_RESET`) ; toutes les mesures ci-dessus viennent du serveur Node. Les § 3 à 7 décrivent l'état d'avant ce tour quand ils diffèrent de ce tableau.

## 11. Tour 2 : 85/100, Oui ; FIX finaux

Plan : `boucle-persona/refonte-tour-2.md` § 4 (FIX-18 à FIX-27). Ce passage est à 0 $ : rien n'a été généré ni téléchargé. FIX-19 avait été fait avant (nouvelle image `ouvert-craie`, voir § 5) ; ici, seuls son texte et son crédit changent. Fichiers touchés : `index.html`, `sablon.src.css`, `sablon.css` (recompilé avec `tw.sh`), ce fichier. `gestes.js` n'est pas modifié.

| FIX | État | Ce qui a été fait |
|---|---|---|
| FIX-18 | non fait (client) | Inchangé : vraies photos des services, fiches d'émail, avis, prix, adresse (voir § 10). |
| FIX-19 | fait | L'image montre maintenant la Craie émaillée (générée, FLUX.2 Pro). Alt réécrit : piles d'assiettes Craie émaillées, « toutes du même grès blanc moucheté au bord brun », Bastien en contrôle une, four en briques et kraft derrière. Cartel : « **Craie**, émaillée, teinte vérifiée » (4 mots au lieu de 5), qui répond à « sans écart de teinte ». Il tient sur une ligne à 360 ; lisible sur le dégradé à 1440. Crédit : commentaire d'en-tête (liste des générées) et § 5. La ligne Pexels du § 5 garde encore l'identifiant de l'ancienne photo, faute de savoir lequel c'est. |
| FIX-20 | fait | Titre de l'index : « Cinq services, tournés depuis 2023 » (5 mots, comme avant). Il dit ce que montrent les cinq plans d'atelier. |
| FIX-21 | non fait (génération) | Le quasi-doublon Silo (journal `serie-lisser` contre mur `mur-silo`) reste. La Craie crue n'apparaît plus que deux fois (vignette du hero, ligne Craie de l'index), au lieu de trois. Il faudrait générer le vase Silo émaillé, livré à Grignan (environ 0,04 $), et éventuellement un panier de lave-vaisselle pour l'article « 500 cycles ». |
| FIX-22 | fait (version 0 $) | Échange entre l'étape 02 et le geste de l'atelier. 02 « Commande » = `serie-etaler` (Bastien étale la plaque de la commande, la terre notée sur la fiche) : la suite 01-02-03 n'est plus trois plans de tour. Geste de l'atelier = `mur-detail` (la main dans la barbotine), à côté de « une seule paire de mains ». Les deux emplacements recadrent en 4:5 (`object-fit`), donc rien ne bouge. Vérifié par `grep`, hors `srcset` et `data-follow-img` : les 28 fichiers servent chacun une seule fois. L'étape 02 ne montre toujours pas de fiche : il faudrait générer une fiche d'émail épinglée au-dessus de l'établi (environ 0,04 $). |
| FIX-23 | non fait (génération) | La tasse Galet et le plat Lavoir n'ont toujours pas la même forme sur la fiche et à table (avis). Il faut régénérer les deux fiches à partir des pièces des avis (`medias-a-generer.md`, 2 × 0,04 à 0,06 $). |
| FIX-24 | fait | `html.lenis { scroll-padding-top: 0 }` : Lenis garde son décalage (hauteur de l'en-tête + 8 px), et sans Lenis (mouvement réduit), les 5rem restent. Mesure à 1440 (nav, « Voir les pièces », pied en remontant) et à 375 (menu) : chaque section arrive à 80 px du haut, au lieu de 160. Le titre est visible à chaque fois : 180 à 196 px pour Pièces, Projets et Journal, 343 pour Méthode (intro épinglée), 390 pour L'atelier (635 à 375, sous le portrait). En mouvement réduit, la section arrive aussi à 80 px, sous l'en-tête visible. |
| FIX-25 | fait | `.entete` ne fait plus de transition sur `background-color` ni sur `color` : fond et texte basculent dans la même image. Pendant 500 ms de part et d'autre du seuil, en descente comme en montée, à 1440 et à 375, le contraste du logo ne prend que deux valeurs, 15,5:1 et 14,1:1. Il n'y a plus aucun gris intermédiaire. |
| FIX-26 | fait | `.pied address a` : `inline-flex`, `min-height: 2.75rem`. E-mail et Instagram font 44 px de haut. L'adresse e-mail se coupe avant le « @ » (`<wbr>`) quand la colonne est trop étroite, à 768 et à 360 : elle fait alors 48 px de haut sur deux lignes, et ne déborde plus de sa colonne. |
| FIX-27 | fait | `.atelier-faits > div` en colonne flex, `dd` en `margin-top: auto`. Les filets et les trois valeurs sont alignés à 768 (où « Seconde cuisson » fait deux lignes) et à 1024. |
| Hors plan | fait | Le titre d'article « 500 cycles de lave-vaisselle à 85 °C » se coupait sur « lave- / vaisselle » à 768 et à 360 (`conventions.md` § 12). Un U+2060 (gluon de mots, invisible) après le trait d'union l'empêche, dans les données `JOURNAL`. |

**Mesures après corrections** (`compte-pane.js` de `conventions.md` § 11, Playwright 1.65 + Google Chrome, serveur Node local `no-store` sur 127.0.0.1:4363, arrêté après) :

| Mesure | Valeur |
|---|---|
| Mots, 1440 × 900, animé et réduit | **795** (avant : 796) |
| Sections dans `main` | **12** |
| Hauteur | 15,2 écrans animé et 13,8 réduit à 1440 × 900 ; 16,6 à 375 × 812 ; 18,2 à 360 × 740 |
| Débordement horizontal (1440, 1280, 768, 375 × 812, 360 × 740) | 0 px, animé et réduit |
| Titres `h1` à `h3` coupés sur un trait d'union, ou ligne commençant par `: ; ? ! »` | aucun, aux 5 tailles, animé et réduit |
| Console | vide (aucune erreur, aucun avertissement, aucune requête échouée) aux 10 passages |

Détail en mots : évitement 3, en-tête 12, œuvre 64, preuve 37, mur 31, pièces 103, ouvert 34, projets 62, méthode 76, atelier 43, avis 62, journal 59, FAQ 85, demande 77, pied 47.

**Ce qui reste faible :**
- **FIX-21 et FIX-23** : ils demandent une génération (environ 0,15 à 0,20 $ en tout).
- **L'étape 02 « Commande »** montre la terre, pas la fiche ni l'acompte (voir FIX-22).
- **Ancres en descente** : quand on clique un lien en descendant, l'en-tête se cache, et une bande de 80 px de la section précédente reste en haut de l'écran. Ce décalage vient de Lenis dans `gestes.js`, qui n'est pas modifié ici. En remontant, l'en-tête revient et couvre cette bande.
- **Marge de mots** : il reste 5 mots sous le plafond de 800.
