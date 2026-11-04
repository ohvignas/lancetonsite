# Fournil Odette — exemple « artisanal ou carnet » (boulangerie de quartier avec boutique de retrait)

Boulangerie au levain fictive, rue de la Fuye à Tours. Page d'accueil complète : `index.html` + `gestes.js` (copie figée du kit) + 22 images affichées (13 générées, 8 photos libres provisoires, 1 recadrage local ; voir § 5), plus deux pages secondaires minimales (`journal/index.html`, `mentions-legales.html`, tour 2).

Refonte du 4 novembre 2026 d'après `test-lancetonsite/retours-utilisateur-2026-11-04.md` : « le plan doit être une image générée, le dessin est mal fait ; trop simple, il manque les produits et la commande ou le retrait ». La page passe de 8 à 13 sections, ajoute une boutique de retrait au fournil (catalogue, panier, jour et créneau), une fournée du jour, l'équipe, un journal, l'accès et un bloc de commande en deux colonnes. La carte SVG est remplacée par un emplacement prêt pour une illustration générée (`medias-a-generer.md`, P1).

Exemple fictif — Lance ton site. Le Fournil Odette, Odette Ravel, Inès, Malo, les clients cités, la ferme des Gâts, le moulin Bréchard, les prix et les horaires sont inventés. Neuillé-Pont-Pierre, Monnaie, la rue de la Fuye, le quartier Velpeau, la Loire et le Cher existent ; les distances sont celles des communes à Tours, arrondies. Aucun numéro de téléphone sur la page. Le panier et le formulaire n'envoient rien.

Composition suivie : **artisanal ou carnet** (`commun/compositions.md` § 8) : matière annotée en premier écran, ticket de fournée, collage d'établi, étiquettes, sac kraft au prénom, photos posées de travers, note manuscrite une fois par écran.

Brief du client-persona : `brief.md`.

## Structure du dossier

```
index.html           la page : 13 sections (GSAP 3.15 + ScrollTrigger + SplitText, Lenis 1.3.27), un script de données (catalogue, panier, jours) et un script de page
odette.src.css       source Tailwind v4 (@theme + @layer components) → odette.css compilé, minifié
gestes.js            copie figée de templates/prototype/gestes.js (non modifiée)
images/              webp étalonnés en série : photos libres, images générées (dont carte-farine.webp 1600 × 1200, retouchée en local au tour 2), 1 recadrage
journal/index.html   le carnet (3 articles, ancres #<slug>), cible des cartes du journal en attendant le CMS (tour 2, FIX-22)
mentions-legales.html mentions légales, conditions de retrait (#retrait), données personnelles (#donnees), valeurs à fournir entre crochets (tour 2, FIX-22)
medias-a-generer.md  6 images à générer, prompts anglais, style de shooting commun, priorités
boucle-persona/      rapports du client simulé (tours 1 et 2) et captures ; carte-farine-avant-tour-2.webp = la carte générée telle quelle, avant la retouche locale
captures/            5 tailles × 7 vues (premier écran, boutique, retrait, farine, équipe, journal, commande) + page entière en mouvement réduit
brief.md             le client, l'acheteur, les objections, les contraintes
```

## 1. Direction artistique

- **Le carnet du fournil, pas la carte postale.** Fond farine, encre de seigle, croûte pour l'action, braise pour les heures. Les sections sombres (fournée, mie, fabrication) sont la couleur du four la nuit ; la commande finit sur la couleur de la croûte.
- **Palette** : farine `#F2EADC`, papier `#FBF7EF`, kraft clair `#E9DFCD`, encre `#2B2019`, graphite `#66574A` (texte secondaire, 5,8 sur farine), croûte `#8A3F17` (bouton, texte papier dessus : 7,0), braise `#E2773F` (heures sur fond four : 5,9), four `#1D1611`.
- **Typographie** : Young Serif (titres, noms de pains, prix), Instrument Sans (texte, horaires, formulaires), Caveat **une fois par écran** (note du hero, prénom du sac, note de l'équipe). Interlettrage 0 sur tous les titres (vérifié à l'œil à 1440 et 375).
- **Le côté carnet est dessiné** : trait de crayon en SVG autour de la grigne, ticket de fournée et étiquette au bord dentelé (`mask`), sac kraft en HTML avec l'étiquette « Claire », photos posées avec bord papier et rotation (`rotate` CSS, qui se compose avec GSAP).
- **Évité** : pas de pastille au-dessus du titre, pas de titre sur photo plein cadre, pas de rangée de trois cartes identiques, pas de téléphone.

## 2. Accroches et promesse (skills `copywriting` et `ogilvy`)

Acheteur : habitant du quartier, 30–55 ans, qui trouve le levain cher. Promesse unique : une miche qui se garde la semaine, commandée la veille, prête au fournil.

| | Accroche | Commentaire |
|---|---|---|
| A | Du pain au levain qui tient la semaine. | L'ancienne. Juste, mais abstraite : « tenir » ne se voit pas. |
| **B — retenue** | **Une miche le mardi, encore bonne le samedi** | Démonstration concrète de la promesse (Ogilvy : montrer, pas qualifier). Mardi et samedi sont les jours d'ouverture : l'acheteur lit aussi le calendrier. Répond à l'objection du prix sans la nommer ; le prix vient en section 3. |
| C | Commandez ce soir, votre miche sort du four à 6 h 40. | Bonne pour l'action, gardée pour la boutique (« Choisissez ce soir, c'est cuit demain matin »). Parle du service, pas du pain. |
| D | L'artisan boulanger au levain naturel à Tours. | Catégorie et ville : toutes les boulangeries de Tours la signeraient. |
| E | 22 heures pour une miche. | Parle de l'effort du boulanger. Reprise comme titre de la fabrication. |

Chapô : « Pain au levain cuit chaque matin rue de la Fuye, à Tours. Commandez avant 18 h, retirez-le au fournil le lendemain. » Bouton : « Commander pour demain ».

Titres de section : chacun dit un fait ou une action (« Six jours de tenue pour 7,20 € le kilo », « Trois gestes, et votre sac vous attend », « Le blé pousse à 25 km du four », « Votre commande, prête à votre heure »).

## 3. Sections et gestes

| # | Section | Contenu | Gestes |
|---|---|---|---|
| 1 | `#hero` | Titre, chapô, « Commander pour demain », horaires de la semaine et du dimanche ; trois preuves (miche d'un kilo 7,20 €, farine à 25 km, se garde six jours) ; à droite la croûte, grigne entourée au crayon, note « première fournée, sortie à 6 h 40 ». À partir de 1024 px, la photo descend jusqu'au bas du premier écran (fenêtre `.hero-visuel` qui recadre la figure 3:2 par la gauche) | `data-magnetic` ; script de page : le trait s'écrit (`stroke-dashoffset`) |
| 2 | `#fournee` | « Sorti du four ce matin » (« Sortie du four à 6 h 40 » avant 6 h 40, « La fournée de mardi » le lundi) : ticket daté rendu en JS (produits cuits ce jour, prix ; le lundi : fermé, prochaine fournée mardi) + photo de la pelle | `data-reveal`, `data-image-reveal`, fond four |
| 3 | `#etabli` | « Six jours de tenue pour 7,20 € le kilo » : collage (miche grignée, mains, croquis de coupe coté, étiquette) | `data-depth-scene` + `data-depth`, `data-tilt="6"` |
| 4 | `#boutique` | **Boutique** : filtres (Tout, Pains, Viennoiseries, Le week-end ; `aria-pressed`), 8 fiches (photo, jours de cuisson, nom, poids, prix, « Ajouter » puis − n +) | rendu depuis `PRODUITS` + `<template id="tpl-produit">`, `data-reveal-group` |
| 5 | `#retrait` | Comment ça marche : 3 étapes + sac kraft au prénom (retrait, lignes, total) | `data-reveal-group`, `data-tilt` |
| 6 | `#fabrication` | 22 heures du levain à la grille : levain rafraîchi la veille à 8 h, pâte pétrie à 15 h qui lève la nuit à 6 °C, façonnage à 4 h (pâtons sur couche), four de 5 h 55 à 6 h 40 (porte du four ouverte, fournée sur la sole) ; trois étapes épinglées | `data-steps="55"`, `data-steps-mobile="stack"` |
| 7 | `#avis` | La mie plein cadre, citation de Claire M. + deux courtes (provisoires) | `data-image-reveal`, `data-parallax="0.12"` |
| 8 | `#farine` | Liste numérotée des trois lieux avec distances + **carte illustrée** (`images/carte-farine.webp`, générée puis retouchée en local) : trajet pointillé ferme → moulin → fournil dans l'image, repères HTML 1-2-3, étiquettes « le blé » et « la farine, 14 km » (« 14 km » seul sous 768 px) | `data-split`, `data-reveal` |
| 9 | `#equipe` | Odette, Inès, Malo ; photo posée, note « au four dès 4 h » ; compteurs 280 miches par jour / 450 le samedi | `data-tilt="4"`, `data-counter` |
| 10 | `#journal` | Le carnet du fournil : un article à la une + deux courts, datés, chaque carte est un lien (`journal/index.html#<slug>`, lien étiré ; adresse CMS dans `data-cms-href`) ; « Tout le carnet » (`journal/index.html`) | rendu depuis `JOURNAL` + `<template id="tpl-article">` |
| 11 | `#acces` | Adresse, statut ouvert / fermé calculé à l'heure, horaires (ligne du jour en valeur), lien OpenStreetMap, photo de vitrine | script de données |
| 12 | `#questions` | 4 questions (acidité, jusqu'à quand commander, payer en ligne, gluten) | `details[data-accordion]` |
| 13 | `#commander` | **Deux colonnes** : à gauche titre, phrase, 3 réassurances (paiement au comptoir, modifiable jusqu'à 18 h, sac gardé jusqu'à la fermeture), collantes ; à droite la fiche (récap du panier avec − n +, total, jour de retrait, créneau, prénom, e-mail, « Valider ma commande ») | validation accessible ; confirmation `role="status"` qui liste les articles, le total, le jour, le créneau et l'e-mail, et prend le focus ; la fiche ne montre plus qu'elle (classe `envoyee`) |

Hors `main` :
- **En-tête** (modèle « barre de nav » ui-ux-pro-max : logo · 3–5 liens · une action) : logo, 5 liens (Boutique, Retrait, La farine, Journal, Horaires et accès), bouton « Panier » avec pastille de compte. Sous 1024 px : burger, menu déroulant (`aria-expanded`, Échap, fermeture au clic d'un lien, retour du focus). Se cache à la descente. Aucun téléphone.
- **Barre collante mobile** : « Commander pour demain », puis « Mon panier · n · total » dès que le panier n'est pas vide ; cachée sur la commande et le pied.
- **Pied** à 4 colonnes : marque, fournil (adresse, horaires, lundi fermé), Commander, Informations (liens vers `mentions-legales.html`, `mentions-legales.html#retrait`, `mentions-legales.html#donnees`) ; ligne « Exemple fictif · photos provisoires » et « Haut de page ».
- **En-tête sous 400 px** : le mot « Panier » passe en texte masqué (l'`aria-label` du lien reste), une icône de sac le remplace, le logo passe à 1,12 rem : le burger tient entier à 360.

### Boutique (prête pour un CMS ou une boutique en ligne)

- `PRODUITS` : un objet par produit `{ id, cat, nom, detail, prix, jours, img, alt }`, `jours` = jours de cuisson (0 = dimanche). Miche 7,20 € (1 kg), demi-miche 3,70 €, pain aux noix 5,40 € (mardi, vendredi), tourte de seigle 6,80 € (jeudi), croissant 1,40 €, pain au chocolat 1,60 €, brioche 9,50 € (dimanche), crumble 16 € (samedi, dimanche).
- `JOURNAL` : `{ date, titre, texte, img, w, h, alt }`, trié par date, le premier à la une.
- `CRENEAUX` : semaine (4 créneaux), dimanche (2).
- Panier dans `localStorage` (try/catch) ; un seul `rendre()` met à jour fiches, récap, pastille, barre collante et annonce `aria-live`.
- Jours proposés : à partir de demain avant 18 h, sinon après-demain ; lundi sauté ; 7 jours. Si un produit du panier n'est pas cuit le jour choisi, alerte sous le champ et envoi refusé.
- Pour brancher une vraie boutique : remplacer les tableaux par un `fetch` et l'envoi du formulaire par l'API de commande ; le balisage ne change pas.

## 4. Densité (`conventions.md` § 11, version à jour)

| Mesure | Valeur | Budget |
|---|---|---|
| Mots (mouvement réduit et animé) | **777** (mercredi 16 h 40, après le tour 2 ; 779 après le tour 1) ; par jour simulé : dimanche 6 h 788 (le plus haut), dimanche 11 h 785, lundi 10 h 783, mardi 6 h 30 783, mardi 6 h 50 781, jeudi 10 h 781, samedi 17 h 59 781 | 500–800 |
| Sections dans `main` | 13 | 10–13 |
| Hauteur à 1440 × 900 | 14,5 écrans animé (épinglage compris), 12,6 en mouvement réduit | — |

Détail (mercredi, après le tour 2) : lien d'évitement 3, en-tête 11, hero 65, fournée 36, établi 41, boutique 91, retrait 37, fabrication 64, avis 46, farine 47, équipe 46, journal 62, accès 41, questions 54, commande 88, pied 45.

Premier jet à 915 mots, puis 809 : détails produits réduits au poids, FAQ ramenée à 4 questions, réassurances, journal, accès et pied raccourcis. Rien de pratique n'a été retiré : prix, jours de cuisson, créneaux, adresse, horaires.

## 5. Médias et crédits

Photos Unsplash (licence Unsplash), provisoires. Étalonnage commun : `eq=saturation=0.84:contrast=1.04:gamma=1.02,colorbalance=rs=0.03:bs=-0.04:rm=0.02:bm=-0.03:rh=0.01:bh=-0.02`, puis `cwebp -size` cible, `-pass 6 -m 6`. Poids total des images : 1,6 Mo, chargement différé hors premier écran.

| Fichier | Photographe | Identifiant |
|---|---|---|
| croute-1920 / croute-1000 | Conor Brown | `1e7Csw0288I` |
| levain-1400 | Conor Brown | `okQaEUv_cPo` |
| miche-grigne-800 | Diego Arenas de Rodrigo | `mZLQOt4so40` |
| brioche-640 | Diego Arenas de Rodrigo | `ZwptJFcZC9A` (recadrée sous le logo du fond) |
| faconnage-1400 | ddp | `zqg6ctfkYuo` |
| mie-1920 / mie-900 / demi-miche-640 | Rahel Arlitt | `OuKM3yXOScY` (demi-miche : recadrage de la mie) |
| four-1400 | **générée** (FLUX.2 Pro, OpenRouter, 4 novembre 2026) |
| miche-640 | **générée** (FLUX.2 Pro, 4 novembre 2026), tour 2 (FIX-20) : miche d'un kilo grignée, sans pochoir ; remplace la photo Unsplash d'Alex Preusser (`9__89QmmyxU`) | — |
| noix-640 | **générée**, refaite au tour 1 (FIX-7) : pain au levain rond coupé, cerneaux dans la mie, noix à côté | — |
| seigle-640 | **générée**, refaite au tour 1 (FIX-7) : tourte ronde, croûte craquelée farinée, tranche à mie sombre | — |
| croissant-640 | **générée** (FLUX.2 Pro, OpenRouter, 4 novembre 2026) |
| pain-chocolat-640 | **générée**, refaite au tour 1 (FIX-2) : pains rectangulaires, un coupé sur ses deux barres | — |
| crumble-640 | Joanna Stołowicz | `U1OOjVj7NVA` |
| odette-900 | **générée**, refaite au tour 1 (FIX-3) : Odette, la quarantaine, cheveux bruns attachés, four à sole maçonné, porte en fonte fermée | — |
| vitrine-720 | **générée** (FLUX.2 Pro, OpenRouter, 4 novembre 2026) |
| sacs-farine-1000 / 640 | **générée** au tour 1 (FIX-8) : sacs kraft, sac de toile ouvert et pelle en bois, tomettes ; journal, article à la une | — |
| pain-torchon-1000 / 640 | **générée** au tour 1 (FIX-8) : miche à moitié dans un torchon de lin, couteau ; journal 2 (seule la 640 sert : vignette de 9 rem) | — |
| couche-1000 / 640 | **générée** au tour 1 (FIX-8) : pâtons ronds sur couche de lin farinée ; étape 2 de la fabrication | — |
| four-bouche-1000 / 660 | **générée** (FLUX.2 Pro, 4 novembre 2026), tour 2 (FIX-21) : porte du four à sole ouverte, fournée qui dore sur la sole, sans flammes ; étape 3 de la fabrication (`srcset` 660 / 1000). Remplace le recadrage flou de four-1400 | — |
| seigle-tranche-290 | **recadrage local** de seigle-640 (la tranche seule, 290 × 290) : journal 3 | — |

`carte-farine.webp` : **générée** (FLUX.2 Pro, 2K, 4:3, recadrée pour ôter une signature parasite), carte aquarelle sans texte ; les noms et distances restent en HTML (`ol.lieux`). **Retouchée en local au tour 2 (FIX-24, 0 $)** avec OpenCV : roue à aubes du fournil effacée (mur, papier et sol reconstitués par copie de motifs voisins, arête du mur redessinée), anciens pointillés effacés (ferme → fournil direct, branche sans issue sous la ferme, boucle qui descendait du haut sans origine), puis trajet redessiné dans l'image, au brun et au pointillé du dessin : ferme → moulin, moulin → fournil. Seul le moulin garde sa roue. Original conservé : `boucle-persona/carte-farine-avant-tour-2.webp`.

**Médias générés (4 novembre 2026)** : les 6 entrées de `medias-a-generer.md`, FLUX.2 Pro via OpenRouter (3 × 0,06 $ + 3 × 0,03 $ = 0,27 $), accord de l'utilisateur ; même étalonnage que les photos libres. Défaut connu : sur la carte, le fournil porte aussi une petite roue à aubes, comme le moulin.

**Tour 1 de la refonte** : odette, pain-chocolat, seigle et noix régénérées (mêmes noms, mêmes dimensions), sacs-farine, pain-torchon et couche ajoutées, par la session principale. Aucune génération ni téléchargement pendant l'application du plan ; les deux recadrages sont faits en local (ffmpeg, cwebp). Bilan après le tour 1 : 11 images générées affichées, 9 photos libres, 2 recadrages. **Après le tour 2 : 13 images générées** (miche-640 et four-bouche ajoutées par la session principale), **8 photos libres** (croûte, levain, miche grignée, façonnage, mie, demi-miche, brioche, crumble), **1 recadrage** (seigle-tranche-290). Chaque image n'apparaît qu'une fois dans le HTML (vérifié par grep, hors `srcset`) ; seules les vignettes de 44 px du ticket de fournée reprennent les photos de la boutique.

## 6. Vérification (Playwright, Chrome)

| Contrôle | Résultat |
|---|---|
| Débordement horizontal (1440, 1280, 768, 375, 360) | 0 px |
| Texte < 12 px | aucun |
| Titre sous l'en-tête | jamais |
| Titres cassés ou trop grands | aucun, vérifié à l'œil sur les captures des 5 tailles (seul signalement : le `h2` en `sr-only` des avis, faux positif) |
| Mouvement réduit | page complète, 0 élément invisible, étapes empilées |
| Boutique | ajout au clavier (focus sur « + » après « Ajouter »), total recalculé à chaque geste (21,20 € au test), filtre « Le week-end » = 2 fiches, alerte « pain aux noix » si le jeudi est choisi |
| Commande | envoi vide : 6 erreurs, focus sur le lien vers la boutique ; envoi complet : confirmation avec date et créneau |
| Jours | densité et fournée contrôlées un mercredi, un dimanche, un lundi (fournée : fermé, prochaine mardi) et un samedi soir |
| Menu mobile | ouverture, Échap, retour du focus sur le burger |
| Espaces insécables | avant « : ? ! ; », dans les heures (6 h 40), les prix, les poids et les distances |
| Console | aucune erreur de script ; quelques `ERR_CONNECTION_RESET` du serveur local de test sur les vignettes (voir § 7) |

Note pour les captures : `page.clock.setFixedTime()` de Playwright fige aussi le temps de GSAP, le hero reste alors invisible. Captures prises à l'heure réelle (mercredi 4 novembre, 14 h 40).

## 7. Ce qui reste faible

- **Carte** : après la retouche du tour 2, le trajet est juste (ferme → moulin → fournil) et seul le moulin a une roue. Le fournil reste une maison isolée au bord de l'eau plutôt qu'une boutique dans les toits de Tours : seule une nouvelle génération de P1 (option du FIX-24, ≈ 0,06 $) le corrige.
- Photos d'emprunt de plusieurs boulangeries pour la demi-miche, la brioche et le crumble : lumières et bois différents d'une fiche à l'autre (le crumble surtout, sur fond de verdure).
- La photo de la fournée (four-1400) montre encore des braises au fond pendant le défournement (remarque de métier du tour 1, non relevée au tour 2) ; l'étape 3 a désormais sa propre image, sans flammes.
- Citations de clients provisoires, à recueillir.
- Le carnet (`journal/index.html`) et la page légale sont des pages de démonstration : articles à écrire avec Odette, valeurs légales entre crochets à fournir.
- Sur téléphone, la pastille du panier en en-tête et la barre collante disent la même chose ; acceptable, à surveiller en test.
- Servir la page avec un petit serveur Node statique, pas `http.server` de Python, qui coupe des connexions quand plusieurs vignettes partent ensemble (`ERR_CONNECTION_RESET` du tour 1, disparus au tour 2 avec Node).

### Ce qui manque encore (client, FIX-18)

Ce que seule Odette peut fournir, et qui sépare 86-88 de 90 : un reportage photo au fournil (Odette, Inès, Malo, le four à sole, les huit produits sur le même bois), trois avis signés de vrais clients (les trois citations actuelles sont provisoires), le compte Instagram réel et la décision d'ouvrir une lettre du carnet (inscription par e-mail dans le pied). Rien de cela n'est inventé sur la page.

## 8. Boucle persona

Refonte, tour 1 : `boucle-persona/refonte-tour-1.md` (76/100, « Pas encore »), plan FIX-1 à FIX-18. Corrections appliquées : § 10.
Refonte, tour 2 : `boucle-persona/refonte-tour-2.md` (84/100, « Pas encore », seuil 85), plan FIX-19 à FIX-28. Corrections appliquées : § 11.

## 9. Retours sur le plugin (kit `gestes.js`)

- `data-split` : SplitText remplace les espaces insécables par des espaces simples. Le kit devrait reposer les espaces insécables après le découpage.
- `data-depth` et `data-tilt` sur un même élément : la rotation d'une photo posée doit passer par la propriété CSS `rotate`, sinon GSAP l'écrase. À documenter dans `GESTES.md`.
- Les fonds `data-bg` ne sont posés que par le script : il faut aussi les poser en CSS pour que le texte clair reste lisible sans `gestes.js`.
- `steps()` met les étapes cachées en `visibility: hidden` ; contourné en CSS.
- Nouveau : le contrôle de densité et de débordement compte les `h2` en `sr-only` comme titres débordants (faux positif à exclure : `clip`, `width: 1px`).
- Nouveau : le kit n'a pas de geste « panier » (ajout qui vole vers la pastille, pastille qui rebondit). Une boutique de retrait en aurait l'usage ; ici, annonce `aria-live` et mise à jour de la pastille sans animation.
- Nouveau : `page.clock.setFixedTime()` gèle le ticker GSAP ; à signaler dans le guide de capture.

## 10. Tour 1 de la refonte : corrections appliquées

Mercredi 4 novembre 2026, d'après `boucle-persona/refonte-tour-1.md`. Tout à 0 $ : aucune génération, aucun téléchargement pendant ce tour (les images refaites ou nouvelles ont été fournies par la session principale, § 5). Seuls `index.html`, `odette.src.css` → `odette.css`, `medias-a-generer.md`, `NOTES.md` et deux recadrages dans `images/` ont changé.

| FIX | Fait | Ce qui a changé |
|---|---|---|
| 1 — durée du levain | **fait** | Un seul schéma de 22 heures : levain rafraîchi la veille à 9 h, pâte pétrie à 15 h qui lève la nuit, façonnage 4 h, four 6 h 40. Établi : « 22 heures du levain au four ». La FAQ (« rafraîchi le matin ») devient vraie. Le hero ne parle plus du levain (FIX-11). |
| 2 — pain au chocolat | **fait** (image fournie) | Alt : « Deux pains au chocolat rectangulaires, un troisième coupé sur ses deux barres de chocolat ». |
| 3 — portrait d'Odette | **fait** (image fournie) | Alt : la quarantaine, cheveux bruns attachés, miche dans un torchon, four à sole maçonné, porte en fonte fermée. Prompt P2 corrigé dans `medias-a-generer.md`. |
| 4 — carte | **fait, version 0 $** | Repères HTML 1, 2, 3 (pastilles croûte en Young Serif, `aria-hidden`) sur la ferme, le bâtiment de droite (moulin) et la maison du centre (fournil, la pastille couvre la fausse enseigne) ; la liste `ol.lieux` porte les mêmes pastilles (compteur CSS) ; étiquettes « 25 km » sur le chemin de la ferme et « 14 km » sur une route pointillée SVG ajoutée du moulin au fournil ; alt numéroté. L'option génération n'est pas faite : le dessin garde deux roues à aubes et un fournil au bord de l'eau. |
| 5 — burger à 360 | **fait** | Sous 400 px : mot « Panier » masqué (`aria-label` conservé), icône de sac, logo à 1,12 rem. À 360 le burger va de x = 296 à 340 ; à 375 de 311 à 355. |
| 6 — statut du dimanche matin | **fait** | « Avant l'ouverture le jour même » traité d'abord. Testé en surchargeant `Date` (Playwright, `addInitScript`, code de test hors page) : dimanche 6 h « Fermé, ouverture à 7 h 30 » ; dimanche 8 h « Ouvert, jusqu'à 12 h 30 » ; dimanche 13 h et lundi « réouverture mardi à 7 h » ; mardi 6 h « ouverture à 7 h » ; mardi 7 h « Ouvert, jusqu'à 19 h 30 » ; samedi 20 h « réouverture dimanche à 7 h 30 » ; mercredi 21 h « réouverture demain à 7 h ». |
| 7 — seigle, noix, brioche | **fait** (images fournies) | Alts refaits : tourte ronde à croûte craquelée et tranche sombre ; pain aux noix coupé, cerneaux dans la mie ; « Brioche moulée dorée ». |
| 8 — images répétées | **fait** | Étape 2 : `couche-1000/640` ; journal 1 (la farine) : `sacs-farine-1000/640` ; journal 2 : `pain-torchon-640` ; journal 3 : `seigle-tranche-290`, recadrage local de la tranche seule (la tourte entière reste dans la boutique) ; étape 3 : `four-bouche-660`, recadrage local de la bouche du four, la fournée gardant `four-1400` cadrée sur la pelle. Grep hors `srcset` : chaque fichier une seule fois. `pain-torchon-1000` n'est pas utilisée (vignette de 9 rem). Restent les vignettes de 44 px du ticket, qui reprennent les photos de la boutique. |
| 9 — erreurs qui restent | **fait** | Une erreur affichée est recalculée à chaque changement (panier, jour, créneau, prénom, e-mail) et disparaît dès que le champ est juste ; refus « pas cuit ce jour-là » : focus sur le « − » du produit concerné. Testé à 1440 et 375. |
| 10 — panier après commande | **fait** | Après la confirmation : panier vidé et sauvé, récapitulatif vide, lien « Nouvelle commande » qui réactive le bouton (ajouter un produit le réactive aussi). Rechargement : 0 article, `localStorage` `{}`. |
| 11 — premier écran | **fait** | Prix au premier écran (« Miche d'un kilo · 7,20 € » à la place du levain), horaires « Mar. – sam. 7 h – 19 h 30 · dim. 7 h 30 – 12 h 30 ». À partir de 1024 px, la photo descend jusqu'à 824 px à 1440 × 900 (au lieu de 660) et 743 px à 1280 × 800 : la figure garde son 3:2, une fenêtre la recadre par la gauche entre 3:2 et 1,15:1, si bien que le trait et la note restent sur la grigne. Il reste environ 75 px de fond farine sous la photo à 1440 × 900. |
| 12 — chiffres de production | **fait** | « première fournée, 6 h 40 » (note du hero, ticket) ; farine « livrée chaque semaine » ; journal : « Premier camion de T80, blé coupé le 11 juillet aux Gâts » (plus de « douze sacs »). |
| 13 — journal relié | **fait** | `slug` dans `JOURNAL`, titre en lien étiré vers `journal/<slug>.html`, « Tout le carnet » vers `journal/index.html`. Les pages restent à créer. |
| 14 — « tous les jours » | **fait** | Pastille « mardi – dimanche » (plus courte que « du mardi au dimanche » : −4 mots). |
| 15 — pied | **fait en partie** | « Lundi fermé » ajouté ; mentions légales, conditions de retrait et confidentialité en liens (pages à créer). Instagram et lettre du carnet : **client** (compte réel et décision d'Odette), notés au § 7. |
| 16 — apostrophes | **fait** | ’ dans tout le texte visible, les alts, les `aria-label`, les messages JS et le `content` CSS « aujourd’hui ». Restent droites : commentaires et code. |
| 17 — « Sorti du four » trop tôt | **fait** | Avant 6 h 40 : titre « Au four à 6 h 40 », ticket « … · au four à 6 h 40 » ; le lundi : « La fournée de mardi ». Testé dimanche 6 h, mardi 6 h, mardi 7 h, lundi. |
| 18 — vraies photos, avis signés | **client** | Noté au § 7 (« Ce qui manque encore »). |

**Mots retirés pour tenir le plafond** : sous-titre de la boutique (−1), pastilles « mardi – dimanche » au lieu de « du mardi au dimanche » (−4). *Corrigé au tour 2 (FIX-28) : cette ligne disait aussi avoir retiré « Quatre créneaux, deux le dimanche. » et « au comptoir » pour Inès ; c'était faux, les deux sont toujours dans la page (retrait, étape 2 ; équipe) et comptés dans les 779 mots. « livré chaque semaine » (farine) est lui aussi toujours là, comme le demandait le FIX-12.*

**Mesures après le tour** (script de `conventions.md` § 11, Chrome 1440 × 900) : **779 mots** le mercredi, animé comme en mouvement réduit ; **13 sections** ; 14,5 écrans animé, 12,6 en mouvement réduit. Par jour simulé : voir § 4.

**Contrôles** (Playwright + Chrome, serveur `http.server` sur le port 4354) : débordement horizontal 0 px à 1440, 1280, 768, 375 et 360 ; aucun titre coupé ou débordant ; aucun texte sous 12 px ; burger entier à 360 et 375, Échap rend le focus au burger ; console sans erreur de script (seuls des `ERR_CONNECTION_RESET` du serveur Python sur des vignettes, comme au tour 1) ; parcours de commande complet à 1440 et 375.

## 11. Tour 2 → corrections

Mercredi 4 novembre 2026, d'après `boucle-persona/refonte-tour-2.md` (84/100, plan FIX-19 à FIX-28). **Tout à 0 $** : aucune génération, aucun appel OpenRouter ni fal pendant ce tour. Les deux images nouvelles du tour (miche-640, four-bouche-1000/660) ont été générées par la session principale (FIX-20, FIX-21). Changés : `index.html`, `odette.src.css` → `odette.css` (Tailwind 4.3.3, même méthode de compilation qu'avant, résultat identique octet pour octet avant les modifications), `images/carte-farine.webp` (retouche locale), `NOTES.md`, `medias-a-generer.md` ; créés : `journal/index.html`, `mentions-legales.html`, `boucle-persona/carte-farine-avant-tour-2.webp` (original de la carte).

| FIX | Fait | Ce qui a changé |
|---|---|---|
| 19 — heure de la première fournée (majeur) | **fait** | 6 h 40 est partout l'heure de **sortie**. Étape 3 : « 5 h 55 – 6 h 40 », quarante-cinq minutes à 240 °C ; note du hero « première fournée, sortie à 6 h 40 » ; avant 6 h 40 : titre « Sortie du four à 6 h 40 », ticket « … · sortie à 6 h 40 » (le seuil `h < 6 h 40` devient juste) ; lundi « Prochaine fournée mardi, 6 h 40 » inchangé. Levain rafraîchi la veille à **8 h** (au lieu de 9 h) pour que les deux « 22 heures » restent vrais : 8 h → 5 h 55 = 21 h 55 « du levain au four » (établi), 8 h → 6 h 40 = 22 h 40 « du levain à la grille » (fabrication). Testé : mardi 6 h 30 « Sortie du four à 6 h 40 », mardi 6 h 50 « Sorti du four ce matin » (vrai désormais), dimanche 6 h idem. |
| 20 — miche de campagne | **fait** (session principale) | Image générée, alt « Miche de campagne d'un kilo, grigne ouverte, croûte bien cuite ». Crédits mis à jour (§ 5, en-tête de `index.html`). |
| 21 — étape « four à sole » | **fait** (session principale) | four-bouche-1000 / 660 générées, `srcset` branché, alt sans flamme. Commentaire d'en-tête et crédits mis à jour : plus de recadrage de four-1400. |
| 22 — liens en 404 | **fait** | Solution la plus légère, celle des autres exemples : **une** page carnet `journal/index.html` (comme `b2c-brume/journal/`), trois articles à ancre `#<slug>` (date, titre, image, deux phrases, « Article complet à la mise en ligne du carnet »), adresse CMS dans `data-cms-href` ; **une** page légale `mentions-legales.html` (comme `b2b-vigie`) avec `#retrait` (conditions de retrait) et `#donnees` (données personnelles), valeurs à fournir entre crochets. Même en-tête (logo → accueil, « Retour à l'accueil »), même feuille `odette.css`, pied court. Les 7 liens répondent 200, ancres présentes. |
| 23 — confirmation | **fait** | Texte construit avant de vider le panier : « C'est noté, Claire : 2 miches de campagne, 1 pain aux noix, 2 croissants, 22,60 € à régler au comptoir, à retirer vendredi 6 novembre, 9 h – 12 h. Le récapitulatif part à claire@exemple.fr ; pour modifier, répondez-y avant 18 h la veille. Nouvelle commande ». Pluriels dans `PRODUITS` (`pl`). La fiche ne montre plus que la confirmation (classe `envoyee`, règle hors couche pour passer devant `.grid`) : plus de « 0,00 € » au-dessus. Focus sur la confirmation (`tabIndex = -1`). Créneaux en insécables autour du tiret (`CRENEAUX`) et entre le jour et le mois. « Nouvelle commande » ou un ajout au panier rouvrent la fiche. |
| 24 — carte de la farine | **fait, version 0 $** | Retouche locale de l'image (§ 5) : plus de roue à aubes sur le fournil, anciens pointillés effacés, trajet ferme → moulin → fournil redessiné **dans l'image**, au brun et au pointillé du dessin (points ovales irréguliers, légèrement flous) : la route SVG rouge est supprimée (HTML et CSS). Étiquettes « le blé » (tronçon 1) et « la farine, 14 km » (tronçon 2), « 14 km » seul sous 768 px où l'étiquette longue cachait le moulin. Alt réécrit dans l'ordre du trajet. Non fait : le fournil reste une maison au bord de l'eau, pas une boutique dans les toits de Tours (option génération). |
| 25 — pointage | **fait** | « Rafraîchi le matin ; pétrie à 15 h, la pâte lève la nuit à 6 °C. » (+2 mots ; « à 6 °C » dit le froid). |
| 26 — « Modifiable » | **fait** | Réassurance « Modifiable par e-mail jusqu'à 18 h la veille » ; la confirmation dit comment (répondre au récapitulatif) ; la page légale le reprend (#retrait). |
| 27 — deux accrocs | **fait** | Journal : « La tourte de 800 g, jusqu'en mars. » (le titre dit déjà « le jeudi ») ; « Tout le carnet → » : `gap-[.35em]` sur le lien `inline-flex`, l'espace avant la flèche n'est plus avalée. |
| 28 — carnet de suivi | **fait** | § 10, ligne « Mots retirés » corrigée (la phrase des créneaux et « au comptoir » sont toujours dans la page). |
| 15 (reste), 18 | **client** | Instagram, lettre du carnet, reportage photo, avis signés : inchangé (§ 7). |

**Autres remarques du rapport, à 0 $** :
- « 19 h 30 · dim. » serré dans le hero : point médian dans un `span` à marge (`px-1`, `aria-hidden`), espaces conservées pour le comptage.
- « Pas de geste à l'ajout au panier » : la pastille du panier rebondit quand le compte change (`.rebond`, `@keyframes rebond`, seulement sous `html.motion` : rien en mouvement réduit). Script de page, `gestes.js` non modifié.
- Focus perdu sur `body` après l'envoi : réglé (FIX-23).
- Non traités (hors 0 $ ou de goût) : crumble sur fond de verdure, pâtons très blancs de l'étape 2, braises au fond de four-1400, « sac » en boîte plate, respiration sous le ticket de fournée, cinq sections « texte à gauche, visuel à droite ».

**Mots, pour tenir le plafond** (+2 pointage, +3 heure de l'étape 3, +2 réassurance, +1/−1 libellés de la fournée) compensés par : établi « Soit 1,20 € par jour. » au lieu de « La miche d'un kilo revient à 1,20 € par jour. » (−5), Odette « au four jusqu'à midi » au lieu de « au four, de 4 h à midi » (−3, la note manuscrite dit « au four dès 4 h »), journal « La tourte de 800 g, jusqu'en mars. » (−1).

**Mesures après le tour** (script `conventions.md` § 11, `/tmp/claude-501/compte-pane.js`, Chrome 1440 × 900 par Playwright, horloge simulée par surcharge de `Date`, 3,2 s d'attente, images chargées) : **777 mots** le mercredi 16 h 40, animé comme en mouvement réduit ; **13 sections** ; 14,5 écrans animé, 12,6 en mouvement réduit. Par jour simulé : dimanche 6 h 788 (le plus haut), dimanche 11 h 785, lundi 10 h 783, mardi 6 h 30 783, mardi 6 h 50 781, jeudi 10 h 781, samedi 17 h 59 781. Aucun bloc au-delà de 3 phrases.

**Contrôles** (serveur Node statique, port 4371 ; Playwright + Chrome, et navigateur de l'application pour la console et le parcours) : débordement horizontal 0 px à 1440, 1280, 768, 375 et 360 (page d'accueil), 0 px à 1440 et 360 pour `journal/index.html` et `mentions-legales.html` ; burger entier à 360 (296–340) et 375 (311–355) ; console : 0 erreur, 0 requête échouée, 0 réponse ≥ 400 sur toutes les sessions ; parcours complet à 1440 et 375 : 5 articles, pastille 5 (rebond), 22,60 €, jeudi refusé (focus sur « − » du pain aux noix), vendredi accepté, confirmation détaillée qui prend le focus, fiche réduite à la confirmation, panier vidé (`localStorage` `{}`), « Nouvelle commande » remet la fiche à zéro. Carte vue à l'œil à 1440, 768 et 360 ; étape 3 à 375.

**Hook impeccable** : aucune alerte sur les fichiers écrits pendant ce tour (`journal/index.html`, `mentions-legales.html`) ; `index.html` et `odette.src.css` ont été modifiés par script, le hook n'y a rien signalé. Pas de faux positif à consigner.

## 12. Tour 3 de la refonte : 87/100, « Pas encore » ; FIX-29 appliqué après le tour

Rapport : `boucle-persona/refonte-tour-3.md` (dernier tour de la boucle). Note 87, au-dessus du seuil, mais verdict « Pas encore » à cause d'un seul défaut majeur sur l'action principale au téléphone.

- **FIX-29 (majeur, 0 $) : fait après le tour, vérifié.** À l'envoi, la fiche se replie et la page restait collée en bas sur téléphone : la confirmation finissait au-dessus de l'écran. Désormais `ScrollTrigger.refresh()`, puis `lenis.scrollTo` sous l'en-tête (immédiat en mouvement réduit), avec une correction à l'arrivée si la mise en page a bougé (35 px d'écart mesurés en animé sans elle), puis le focus. Mesuré avec Playwright, parcours complet (miche, jour, créneau, prénom, e-mail, envoi) : haut de la confirmation à 88 px (sous l'en-tête de 72 px) à 375 et 360, animé comme réduit ; 162 et 165 px à 1440 ; focus sur la confirmation ; aucune erreur.
- **Non faits** (pas de tour suivant pour les noter) : FIX-30 (photo de la fournée `four-1400` avec feu de bois vif, troisième four différent ; recadrage ou ≈ 0,03 $), FIX-31 (demi-miche = recadrage de la mie des avis ; ≈ 0,03 $), FIX-32 (enseigne en fausses lettres sur la carte), FIX-33 (rythme du troisième article du carnet), FIX-34 (le § 5 doit dire deux recadrages : `seigle-tranche-290` et `demi-miche-640`), FIX-35 (mentions légales : au client).
- **Alertes du hook impeccable (état final).**
  - Vrai cas corrigé : les avis (`.avis-suite blockquote p`), citations de 1,35 rem sur plusieurs lignes, passent d'un interligne de 1,25 à 1,35 (`odette.css` recompilé).
  - Faux positifs, laissés : `cramped-padding` sur les sections pleine largeur (boutique, retrait, fabrication, mie, farine, journal, commande). Ce sont des bandes de fond dont le contenu est en retrait par `.page`.
  - Autres faux positifs : les filets fins entre lignes (lieux, personnes, horaires, FAQ, `.page`), sans cadre autour ; `tight-leading` 1,07 sur les titres ; `broken-image` des `<img>` de `<template>`.
  - Choix de la charte, gardés : `overused-font` Instrument Sans et `cream-palette` #f2eadc, le papier farine du carnet.
