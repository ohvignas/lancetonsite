# Sillon — exemple « récit horizontal » (abonnement B2C)

Ferme maraîchère bio fictive à Saint-Julien-de-Concelles, à 14 km de Nantes, qui vend un panier de légumes par semaine, retiré le mardi soir dans 11 relais nantais. Page d'accueil : `index.html` + `gestes.js` (copie figée du kit) + photos libres et 6 images générées (`medias-a-generer.md`).

Exemple fictif — Lance ton site. Sillon, Claire et Mathieu Guérin, les relais, les témoignages, les chiffres (312 foyers, poids des paniers) et les prix (y compris le relevé du rayon bio) sont inventés. Les quartiers nantais existent. Les formulaires n'envoient rien. Cadre du client et de l'acheteur : `brief.md`.

**Version 2 (4 novembre 2026)**, d'après `test-lancetonsite/retours-utilisateur-2026-11-04.md` : hero refait (le titre de la v1 cassait sur trois lignes et plus), 7 → 12 sections, la ferme et les personnes, le panier de la semaine en fiches, l'objection du prix, le journal, nav refaite, inscription en deux colonnes, pied complet. Le récit horizontal des quatre semaines est gardé.

Composition suivie : **récit horizontal** (`commun/compositions.md` § 5). Le hero annonce « Novembre, 4 chapitres » avec sa frise ; le récit épinglé en quatre semaines (S45 à S48) vient en troisième position, après une preuve courte ; retour à la verticale ensuite.

## Structure du dossier

```
index.html           la page : 12 sections (GSAP 3.15 + ScrollTrigger + SplitText, Lenis 1.3.27), données en tête, scripts de page en pied
sillon.src.css       source Tailwind v4 (@theme + @layer components) → sillon.css compilé, minifié
gestes.js            copie figée de templates/prototype/gestes.js (une ligne ajoutée au tour 1 : reduceWhiteSpace: false, voir § 10)
images/              12 sujets en webp (deux tailles pour la plupart), voir § 5
captures/            une capture par section à 1440, 1280, 768, 375 et 360 (+ récit à 30/55/80/100 %, menu mobile),
                     pages entières en mouvement réduit à 1440 et 375
medias-a-generer.md  5 photos + 1 carte, prompts (générés le 4 novembre 2026)
brief.md             le client, l'offre, l'acheteur, ses objections, les contraintes (pour le client-persona)
```

## 1. Direction artistique

- **Le carnet de la ferme, pas la box à la mode.** Fond papier kraft, encre brun-noir ; chaque semaine du récit a la couleur de sa terre et de son légume : potiron brûlé, vert poireau, pourpre betterave, olive de fin de saison. Le fond change avec le chapitre : c'est le mois qui passe.
- **Palette** : kraft `#EFE7D8`, crème `#F6EFE2`, encre `#1E1A14`, brun `#5C5142`, filet `#CFC2AA`, orange courge `#F0A35E` (sur fonds sombres et boutons, texte encre dessus), rouille `#A3431A` (chiffres sur kraft, contraste 5,6), sapin `#1F3326` (panier), brun terre `#5A2A12` (inscription). Chapitres : `#6B3416`, `#24402D`, `#4D1832`, `#3B3A22`, texte crème dessus (contraste 8 à 12).
- **Typographie** : Young Serif (titres, un seul poids) et Hanken Grotesk (texte, chiffres alignés des prix). **Interlettrage 0** sur tous les titres et le logo (la v1 avait −0,045 em sur le h1 : lettres collées à 1440).
- **Tailles bornées** : h1 `clamp(2.1rem, 1.05rem + 4.4vw, 3.1rem)`, puis `clamp(3rem, .6rem + 3.9vw, 4.1rem)` à partir de 1024 px, largeur 16 ch : **2 lignes à toutes les largeurs testées** (65,6 px à 1440, 33,6 px à 360). h2 bornés à 2,75 rem sur téléphone, 3,6 rem sur grand écran.

## 2. Titres et promesse (skills `copywriting` et `ogilvy`)

Positionnement : le panier de la ferme d'à côté pour les Nantais qui cuisinent la semaine. Promesse unique : la fraîcheur que le rayon ne peut pas dater (« cueilli la veille »), à un prix fixe. Contraintes : titre ≤ 7 mots, 2 lignes à 360 px, sans « livré » (on retire au relais).

| | Accroche | Commentaire |
|---|---|---|
| A (v1) | Un panier de légumes par semaine, cueillis la veille | Juste mais long : 9 mots, 3 à 4 lignes sur téléphone. C'est le « texte cassé » du retour. |
| B | Récolté lundi, dans votre cabas mardi | Concret, rythmé ; ne dit pas « bio » ni « panier », et « cabas » fait catalogue. |
| C | Un panier bio par semaine, dès 16 € | Clair, mais le prix en titre range Sillon parmi les box ; la fraîcheur disparaît. |
| **D — retenue** | **Le panier bio cueilli la veille** | 6 mots : ce qu'on achète (un panier bio) et la seule chose que le supermarché ne peut pas dire (la veille). Le chapo porte les faits : 14 km, lundi / mardi, 11 relais, 16 €, sans engagement. |

Titres de section écrits comme des faits ou des réponses (4 à 9 mots) : « Quatre hectares en bio, à 14 km de Nantes », « Claire et Mathieu, maraîchers à Saint-Julien », « Ce qu'il y a dans le panier cette semaine », « S'abonner, retirer, mettre en pause », « Onze relais nantais, ouverts le mardi soir », « Le même panier, au rayon bio du supermarché », « Votre premier panier, dès mardi prochain ». Boutons : « Choisir mon panier », « S'abonner au petit / grand panier », « Réserver mon premier panier ».

## 3. Sections et gestes

| # | Section | Contenu | Gestes |
|---|---|---|---|
| 1 | `#hero` | Titre, chapo, un bouton (le surtitre « Ferme Sillon · bio depuis 2016 » est retiré au tour 2, voir § 11) ; à droite la photo de S45 (lien vers le chapitre) avec, en recouvrement, la **fiche du panier de la semaine** (5 légumes et leurs poids, tirés de `PANIER`) ; en bas « Novembre · 4 chapitres » et la frise | `data-intro`, `data-split`, `data-magnetic` |
| 2 | `#preuve` | Photo de la ferme et légende ; « Quatre hectares en bio » ; 312 foyers, 60 légumes, 11 relais, tampon « certifiée bio depuis 2016 » | `data-image-reveal`, `data-counter`, `data-reveal-group` |
| 3 | `#recit` | **Moment signature**, gardé : récit épinglé, 4 chapitres (une phrase chacun), frise, fond à la couleur du chapitre | `data-hscroll`, `progression`, `data-bg`/`data-fg`, `data-tilt` |
| 4 | `#ferme` | Deux portraits légendés (Claire, Mathieu), qui ils sont, la méthode en trois points (bio certifié, rotation sur quatre ans, récolte le lundi) | `data-reveal-group`, `data-split` |
| 5 | `#panier` | Bascule petit / grand ; **six fiches légume** (photo, nom, poids ; le fenouil « grand panier seulement ») ; résumé collant : nom, pour qui, poids total, prix (odomètre), prix au mois, « S'abonner au … panier » | `data-odometer`, `data-reveal-group` ; une seule source : l'objet `PANIER` |
| 6 | `#comment` | Choisir (mini-carte dessinée en code), retirer (photo), mettre en pause (mini-calendrier S45–S48) | `data-reveal-group` |
| 7 | `#relais` | Horaires, les 11 quartiers, carte SVG (Loire, Erdre, relais, la ferme) | la liste HTML nourrit les points de la carte et le `select` du formulaire |
| 8 | `#avis` | Photo, trois témoignages courts (prénom, relais, formule), marqués provisoires | `data-reveal-group` |
| 9 | `#prix` | **Objection du prix** : « Le même panier, au rayon bio du supermarché », écart calculé (petit : 2,16 € de moins ; grand : 3,09 €), barres et relevé ligne à ligne ; relevé daté, marqué provisoire | `data-bar` puis `gsap.to` quand on change de taille |
| 10 | `#journal` | Trois cartes datées (recette, à la ferme ×2) tirées de `ARTICLES` + « Tout le journal » | `<template id="modele-article">`, `data-reveal-group` |
| 11 | `#questions` | Cinq questions : cuisiner, week-end, petit pour deux, prélèvement, oubli | `details[data-accordion]` |
| 12 | `#inscription` | **Deux colonnes** : titre, « Rien n'est prélevé avant le premier retrait », trois réassurances / formulaire (prénom et e-mail côte à côte, panier, relais) ; confirmation qui reprend formule et relais | validation accessible |

Hors `main` :
- **En-tête** (modèle « logo, 3 à 5 liens, un bouton » de `ui-ux-pro-max`, les MCP UI Skills n'ayant pas de modèle de nav) : logo, La ferme, Le panier, Relais, Journal, « S'abonner » ; sous 1024 px, bouton « Menu » (`aria-expanded`) qui ouvre un panneau de 5 liens + le bouton, fermé par un lien, Échap (focus rendu au bouton) ou le passage à 1024 px. Aucun téléphone.
- **Pied complet** : adresse et e-mail, plan du site (6 liens), horaires de retrait, « La lettre du lundi » (e-mail, rien n'est envoyé), mentions légales, CGV, confidentialité, Instagram.
- **Barre collante mobile** « Choisir mon panier · dès 16 € », masquée sur le récit, le panier, l'inscription et le pied.

**CMS / boutique** : le panier (`PANIER` : semaine, formules, légumes avec poids petit / grand et prix relevé) et le journal (`ARTICLES` : date ISO, rubrique, titre, résumé, image, url) sont deux objets en tête de page, rendus dans des `<template>` avant le chargement de `gestes.js`. Une semaine nouvelle = un objet à remplacer.

Le récit dans les trois situations (bureau épinglé, téléphone en glisser natif, mouvement réduit empilé) et sa navigation au clavier sont inchangés depuis la v1. `data-cursor-label="Glisser"` est retiré (trompeur à la molette).

## 4. Densité (`conventions.md` § 11, `SP/dens-fn.js`)

| Mesure | Valeur | Budget |
|---|---|---|
| Mots, mouvement permis | **790** (tour 1 de la refonte ; 798 en v2, 805 avec la ligne de crédits) | 500–800 |
| Mots, mouvement réduit | 790 | |
| Sections dans `main` | 12 | 10–13 |
| Hauteur à 1440 × 900, mouvement permis | 14,9 écrans (épinglage compris) | ≈ 15 (12–18) |
| Hauteur à 1440 × 900, mouvement réduit | 12,5 écrans | |

Détail : évitement 3, en-tête 8, hero 72, preuve 31, récit 75, ferme 56, panier 65, comment 60, relais 33, avis 55, prix 84, journal 63, questions 81, inscription 60, pied 52.

Premier jet v2 : 940 mots. Coupé : colonne « poids » du relevé (déjà sur les fiches), note sous le résumé, phrase d'accroche de la lettre, pied resserré, méthode et étapes réduites à une ligne chacune. Les sections les plus longues sont le prix (le relevé est un tableau) et la FAQ.

## 5. Médias

Photos libres Unsplash (licence Unsplash ; attribution non requise, notée ici), **toutes étalonnées ensemble** pour un même shooting de novembre (`eq=saturation=0.88:contrast=1.04:gamma=0.98`, `colorbalance` chaud dans les ombres et les hautes lumières), `cwebp -m 6`, grandes tailles < 250 Ko. Récupérées depuis le CDN `images.unsplash.com` (sans passer le contrôle anti-robot du site). Aucune génération payante.

| Fichier | Sujet | Auteur (Unsplash) |
|---|---|---|
| courges-800 / 1600 | potimarrons (hero et S45 ; fiche potimarron en recadrage serré) | Yen Vu, `zbiswtURyrg` |
| poireaux-640 / 1200 | poireaux d'hiver givrés en cagette, main gantée (S46, fiche) | **générée** (FLUX.2 Pro), tour 1 de la refonte |
| betteraves-640 / 1200 | betteraves en cagette (S47, fiche) | Eugene Golovesov, `9xYw9PGCSS0` |
| fenouil-640 / 1200 | fenouil en cagette sans marquage (S48, fiche) | **générée** (FLUX.2 Pro), tour 1 de la refonte |
| ferme-640 / 1200 | cagette du panier portée (témoignages ; journal « poireaux » en recadrage) | **générée** (FLUX.2 Pro, 2K, 2:3) |
| claire-640 / 1200 | Claire, cagette de carottes (portrait) | **générée** (FLUX.2 Pro, 2K, 3:4 recadré 4:5) |
| mathieu-640 / 1200 | Mathieu, betteraves (portrait) | **générée** (FLUX.2 Pro, 2K, 3:4 recadré 4:5) |
| champ-800 / 1600 | planches, serre et longère (preuve ; fiche « chou de Milan » en recadrage) | **générée** (FLUX.2 Pro, 2K, 3:2) |
| relais-640 / 1200 | épicerie relais le mardi soir (étape « retirer ») | **générée** (FLUX.2 Pro, 2K, 4:3) |
| carte-relais-1600 | carte illustrée de Nantes, fond du SVG des relais | **générée** (FLUX.2 Pro, 2K, 16:9) |
| veloute-640 / 1200 | velouté (journal) | shibani Mishra, `T8KjDfBqK6o` |
| pommes-de-terre-640 | pommes de terre en seau (fiche, journal) | Robert Cavlovic, `YtruaYLOvxc` |
| carottes-640 | botte de carottes des sables tenue à la main (fiche) | **générée** (FLUX.2 Pro), tour 1 de la refonte |

**Médias générés (4 novembre 2026)** : les 6 entrées de `medias-a-generer.md`, FLUX.2 Pro via OpenRouter, 6 × 0,06 $ = 0,36 $, accord de l'utilisateur. Même étalonnage que les photos libres. La carte est une `<image>` dans le SVG (repère 1600 × 900) ; les noms Loire / Erdre / La ferme et les 11 points restent en SVG, tirés de la liste (`data-x` / `data-y` recalés sur l'illustration).

## 6. Vérification (Playwright, Chrome, `SP/sil4.js`, `SP/sil-inter.js`, `SP/sil-cap.js`)

| Contrôle | Résultat |
|---|---|
| h1 à 1440 / 1280 / 768 / 375 / 360 | 2 lignes partout (65,6 / 59,5 / 49,6 / 33,6 / 33,6 px), interlettrage 0 |
| Débordement horizontal, 5 largeurs × 2 modes | 0 px |
| Texte < 12 px | aucun |
| Titres > 3 lignes | aucun à l'œil ; le script compte 6–7 « lignes » pour le h2 de la FAQ à 1440 / 1280 à cause des masques de `SplitText` : la capture montre 3 lignes |
| Console | propre en mouvement permis et réduit (des `ERR_CONNECTION_RESET` isolés viennent du serveur Python local) |
| Menu mobile | s'ouvre (`aria-expanded=true`), Échap le ferme et rend le focus au bouton |
| Bascule petit / grand | prix 16 → 26 €, écart 2,16 → 3,09 €, fenouil grisé puis inclus, 5 → 6 lignes au relevé, barres animées, libellé du bouton |
| « S'abonner au grand panier » | défile au formulaire, coche « Grand » |
| Formulaire vide / rempli | 3 erreurs, focus sur le prénom / confirmation « C'est noté, Lucie. Votre grand panier vous attend mardi au relais Graslin… » |
| Lettre du lundi | « Inscrit. Première lettre lundi prochain. » |
| Tabulation | évitement, logo, 4 liens, S'abonner, bouton du hero, amorce, frise… ; focus visible partout |
| Corrigé pendant la vérification | les fiches légume restaient à opacité 0 : une `transition: opacity` CSS sur `.legume` faussait l'apparition GSAP ; la transition (et le grisé « grand panier seulement ») passent sur les enfants |

## 7. Ce qui reste faible

- **Fiches légumes** : photos libres de sources différentes, étalonnées ensemble ; un vrai shooting à la ferme les remplacerait.
- **Carte** : illustration générée d'une ville « à la nantaise », pas un plan exact ; les points sont placés au jugé par quartier.
- **Chiffres fictifs** : le relevé du rayon bio, les 312 foyers et les trois témoignages sont inventés et marqués « provisoire » ; le vrai client fournit ses relevés et ses avis.
- Le journal pointe vers `#journal` (pas de pages d'articles dans l'exemple).
- Le hero à 768 px dépasse un écran (1 087 px) : la frise passe sous la ligne de flottaison.
- Sur ordinateur, le dernier chapitre du récit ne se cale pas à gauche (fin de piste).

## 8. Boucle persona

Tour 1 de la refonte : `boucle-persona/refonte-tour-1.md` (67 / 100). Corrections appliquées : § 10.
Tour 2 de la refonte : `boucle-persona/refonte-tour-2.md` (**87 / 100, « Oui, ça vaut mes 25 000 € »**). Corrections finales : § 11.

## 9. Retours sur le plugin (kit `gestes.js`)

- `hscroll` n'émet `progression` que pour la piste épinglée : sur téléphone (glisser natif), rien. La frise et le fond par chapitre demandent un second branchement sur le `scroll` horizontal de la piste. Le kit pourrait émettre le même événement depuis le glisser natif.
- La fiche § 5 demande un **fond qui change à chaque chapitre** : le kit ne sait changer le fond qu'à l'entrée d'une section (`data-bg`, `top 65%`). Ici, le script de page change le fond de la section **et** son `data-bg`. Un attribut `data-hscroll-bg` sur les éléments de la piste ferait le travail.
- Pas d'aide pour **aller à un élément de la piste** : il faut retrouver le `ScrollTrigger` épinglé et convertir en défilement vertical. Un `gestes.allerA(element)` qui sache viser le `pin-spacer` servirait aussi à Escale.
- **Ancres de Lenis** : un lien `#chapitre` vers un élément de la piste est intercepté par Lenis, qui vise la position non transformée. Le kit pourrait exclure les ancres qui pointent dans une `[data-hscroll-track]`.
- Le **repli CSS** du récit (glisser natif, empilement en mouvement réduit) est entièrement à écrire dans la page.
- `odometre` : l'`aria-label` posé sur un `span` sans rôle n'est pas lu ; contourné par un `sr-only` en `aria-live`.
- **Nouveau (v2)** : `data-reveal-item` / `data-reveal` cassent si l'élément a une `transition` CSS sur `opacity` (l'élément reste invisible). Le kit pourrait poser `transition: none` pendant l'apparition, ou la fiche le signaler.
- `data-cursor-label="Glisser"` sur une piste qu'on fait avancer à la molette est trompeur : retiré en v2.
- **Nouveau (tour 1 de la refonte)** : `SplitText` (réglage par défaut `reduceWhiteSpace: true`) change l'espace insécable en espace normale : « 14 km » se coupait en fin de ligne. Corrigé ici par `reduceWhiteSpace: false` dans `SplitText.create` (`gestes.js`, § 4 textes). À reporter dans le kit : tout titre `data-split` contenant une insécable (nombre et unité, « : », « ? ») est touché.
- Le serveur `python3 -m http.server` coupe des images au premier chargement (`ERR_CONNECTION_RESET`) : sa file d'attente (5 connexions) déborde quand Chrome demande toutes les images d'un coup. Un `ThreadingHTTPServer` avec `request_queue_size = 256` règle le problème (vérifications du tour 1).

## 10. Tour 1 de la refonte : corrections appliquées (4 novembre 2026)

Plan : `boucle-persona/refonte-tour-1.md`. Tout à 0 $ (les trois images de FIX-5 avaient été régénérées avant, mêmes noms et dimensions). Vérifié avec Playwright et Chrome sans interface, serveur local à part (port 4353), à 1440, 1280, 1024, 768, 375 et 360, en mouvement permis et réduit.

| FIX | État | Ce qui a été fait |
|---|---|---|
| FIX-1 « à 14 / km » | **fait** | `reduceWhiteSpace: false` dans `SplitText.create` (`gestes.js`) : l'insécable survit au découpage. Lignes produites : « Quatre hectares / en bio, à 14 km / de Nantes » à 1440, 1280, 375 et 360 (« … à 14 km de Nantes » à 768). Aucun autre titre découpé n'a changé. |
| FIX-2 densité | **fait** | 805 → **790 mots** (mouvement permis et réduit), 12 sections, 14,9 écrans à 1440 (12,0 en réduit). Coupes : crédit du pied resserré (« Photos Unsplash, FLUX.2 Pro »), horaires du pied sans « 11 relais » (déjà partout), texte S45, relevé du prix reformulé, étapes 1 et 2, réponse FAQ « cuisiner », titre FAQ, légende de Claire, titre de l'article velouté. De quoi payer FIX-3, FIX-6 et les étiquettes « provisoire ». |
| FIX-3 grand panier | **fait** | 7ᵉ légume, **chou de Milan** (grand panier seulement, 800 g). Petit : 5 légumes, 3,6 kg (4,44 €/kg) ; grand : 7 légumes, 6 kg (4,33 €/kg, donc moins cher au kilo). Rayon bio recalculé : petit 12,89 € (écart 3,11 €), grand 22,89 € (écart 3,11 €). Commentaire « à confirmer par la ferme » dans `PANIER`. Fiches en 4 colonnes dès 1280 px. |
| FIX-4 faits | **fait** | S45 = « Potimarron, carottes des sables et poireaux » (même contenu que `PANIER`) ; journal : « Six tonnes, de quoi tenir jusqu'en mars » ; « Le froid les rend plus doux » ; légende et alt du champ en novembre. |
| FIX-5 images | **fait** | Alt et légendes des trois nouvelles images (poireaux d'hiver givrés en cagette, fenouil en cagette, carottes des sables tenues à la main). Réemplois : la fiche potimarron est un recadrage serré de `courges-1600` (différent du hero), l'article « poireaux » un recadrage de `ferme-1200` sur les poireaux de la cagette, la fiche chou de Milan un recadrage de `champ-1600`. Un champ `cadre: { pos, zoom }` dans `PANIER` / `ARTICLES` (classe `.cadrage`). Chaque fichier sert au plus deux fois, sauf `courges` (hero et S45, l'amorce du hero étant le lien vers S45, plus la fiche au cadrage différent). Crédits mis à jour (commentaire d'en-tête, pied, § 5). |
| FIX-6 fiche recette, voix | **fait** (sans l'option payante) | Fiche de papier en HTML / CSS sur la photo S45 : « Fiche recette · Velouté de potimarron · 20 min · une casserole », signée Claire. Dans `#ferme`, la phrase à la troisième personne devient une citation de Claire : « On a repris la ferme en 2014. Chaque recette du panier, je l'ai cuisinée avant vous. » Photo de Mathieu à la récolte : non faite (payante). |
| FIX-7 h2 serrés | **fait** | Dès 1024 px : panier et journal à 24 ch, relais et prix sans bride, FAQ 17 ch ; grilles relais 6fr / 7fr et prix 6fr / 5fr. À 1440 : panier, relais, prix, journal, FAQ sur 2 lignes. À 1280, le h2 du prix reste sur 3 lignes (équilibrage du texte). |
| FIX-8 étapes à 768 | **fait** | De 768 à 1023 px : une étape par ligne, visuel à gauche ; trois colonnes dès 1024 px avec des visuels de même hauteur ; les visuels en code ne coupent plus leur contenu (« Novembre », « en pause », « Petit · 16 € » sur une ligne). |
| FIX-9 légende rognée | **fait** | L'arrondi et le `overflow` passent sur un `span.preuve-cadre` autour de l'image ; la légende est entière. `.avis-photo` (sans légende) et `.portrait` (arrondi sur l'image) n'étaient pas touchés. |
| FIX-10 carte | **fait** (+ client) | Chaque relais est un `<button aria-pressed>` : survol, focus clavier et toucher allument le point (orange courge, contour encre, au premier plan) et écrivent le nom sur la carte ; second appui pour éteindre ; toucher un point marche aussi. Malakoff recalé sur la rive nord, juste au-dessus de la Loire, à l'est de l'île de Nantes (`1045, 268`). Noms grossis sur téléphone. La barre collante se masque sur `#relais`. Reste client : commerce et adresse de chaque relais (FIX-13). |
| FIX-11 bord du hero | **fait** | Largeur de l'amorce calculée jusqu'au bord de la fenêtre : bord droit à 1440 / 1440 et 1280 / 1280. |
| FIX-12 finitions | **fait** | Insécables (`17 h`, `19 h 30`, fine avant « ; ») dans la confirmation, et entre nombre et unité dans tous les gabarits (€, kg, g, légumes) ; soulignement pointillé remplacé par des étiquettes « Avis provisoires » et « Relevé provisoire du 2 novembre 2026 » ; fin de piste du récit calée (S48 à 115 px du bord gauche à 1440, 8 vw) ; bouton « Réserver mon panier » sur une ligne à 375. |
| FIX-13 client | **non fait** (client) | Vrais relevés de prix datés avec tickets et décision sur le parti pris « 2 € de plus », trois avis réels signés, nom et adresse des 11 relais, shooting à la ferme en novembre, vrais chiffres (312 foyers, 60 légumes, poids des paniers, 7ᵉ légume du grand panier). |

Contrôles : aucun débordement horizontal (5 largeurs, 2 modes), console vide, relais atteints au clavier (Tab, Entrée), nom affiché au survol, au focus et au toucher, formulaire et bascule petit / grand cohérents (« 7 légumes · 6 kg », 104 € par mois, écart 3,11 €).

Reste faible : le h2 du prix sur 3 lignes à 1280 ; les h2 de la preuve et de la ferme sur 3 lignes sur ordinateur (hors plan) ; la fiche chou de Milan est un recadrage du champ, un peu doux sur écran haute densité ; les recadrages agrandissent des photos (qualité à revoir avec le vrai shooting).

## 11. Tour 2 : 87/100, Oui ; FIX finaux (4 novembre 2026)

Plan : `boucle-persona/refonte-tour-2.md` (FIX-1 à FIX-8). Tout à 0 $ : aucune image générée ni téléchargée, `gestes.js` intact. Vérifié avec Playwright et Chrome sans interface, serveur Node statique à part (port 4364, arrêté ensuite), à 1440, 1280, 768, 375 et 360 (plus 1024 pour les titres), en mouvement permis et réduit.

| FIX | État | Ce qui a été fait |
|---|---|---|
| FIX-1 bascule → formulaire | **fait** | Une seule source d'état (`taille`, script du panier) : la bascule du panier et le choix « Panier » du formulaire en sont deux vues. Changer l'une coche l'autre et met à jour résumé, prix, relevé et barres ; l'ancien écouteur du bouton du résumé est supprimé. `autocomplete="off"` sur les quatre radios : au rechargement, le navigateur ne restaure plus un état désaccordé (tout repart sur « Petit »). Chemins testés à 1440 et 375, tous justes : bouton du résumé, « S'abonner » de l'en-tête, défilement jusqu'au formulaire, menu mobile (Le panier → Grand → Journal → S'abonner), ancre directe `#inscription`, choix « Grand » dans le formulaire (la bascule et le prix suivent), retour à « Petit » sur la bascule, rechargement, envoi (« Votre grand panier vous attend mardi au relais Zola… »). |
| FIX-2 dates | **fait** | `PANIER` affiche le **prochain** retrait : semaine 46, mardi 10 novembre (fiche du hero et surtitre du panier). S46 au futur : « Les premières gelées sucreront poireaux et chou de Milan. » Mini-calendrier : S45 retiré, S46 à venir, S47 en pause, S48 à venir. S45 reste au passé (« Les courges sont rentrées »), c'est la semaine en cours. |
| FIX-3 fin de piste | **fait** | Carte « Décembre · Panais, choux et mâche. · Choisir mon panier → » (8 mots) dans l'espace qui restait vide, en bout de piste ; sa largeur garde le calage de la S48. Atteinte au clavier : le focus amène en bout de course (`focusin`), et `.recit` passe en `overflow: clip` pour que le focus ne fasse plus défiler la section en douce. Entrée mène au panier (haut à 80 px). Masquée sur téléphone en mouvement permis (elle tomberait sous la S45, le glisser partant du début) ; affichée après les chapitres empilés en mouvement réduit. |
| FIX-4 réemplois | **fait** (version 0 $) | Plus aucune photo deux fois au même cadrage. S45 : les gros potimarrons de droite (zoom 1,4), le hero garde la photo entière. Fiche pommes de terre : gros plan sur les tubercules (zoom 1,8), le journal garde le seau entier. Fiches poireaux, betteraves et fenouil : gros plans (zoom 1,35 à 1,4) distincts des photos du récit. Chou de Milan : zoom 3,1 → 2 (net à 2×). Alt des fiches réécrits pour le cadrage. |
| FIX-5 pied | **fait** | Crédit et « Haut de page » deviennent deux éléments d'une ligne flexible (plus d'espace avalé, plus de « · » orphelin, lien sur une ligne à 375 et 360). « 44450 Saint-Julien-de-Concelles » insécable (pied), « Saint-Julien-de-Concelles » aussi dans la légende de la preuve. |
| FIX-6 finitions 1280 | **fait** | De 1024 à 1365 px : prix 7fr / 5fr et inscription 6fr / 6fr, h2 sur 2 lignes à 1280 (encore 3 à 1024) ; fiche du hero à 40 px du chapô (au lieu de 8). Ferme : « Claire et Mathieu, / maraîchers à / Saint-Julien » (équilibrage coupé sur ce titre, « Saint-Julien » insécable) : « maraîchers » n'est plus seul. |
| FIX-7 prix sur téléphone | **fait** | Sous 1024 px, les 7 fiches défilent en bande horizontale (accroche magnétique, la suivante dépasse). Section panier à 375 : 1 849 → 1 076 px ; le résumé (prix, « par mois », bouton) commence 646 px sous le haut de la section, au lieu d'après les 7 fiches. |
| FIX-8 client | **non fait** (client) | Relevé de prix réel daté avec tickets (et l'écart identique de 3,11 € à revoir), trois avis signés, nom et adresse des 11 relais, shooting à la ferme en novembre (fiches, récit, journal, Mathieu à la récolte), vrais chiffres (312 foyers, 60 légumes, poids, 7ᵉ légume). |

**Audit de design (`index.html`)**, vérifié en rendu :

- *Hero eyebrow* : **vrai cas**, le surtitre « Ferme Sillon · bio depuis 2016 » en capitales espacées au-dessus du h1. Supprimé : le logo dit Sillon, le h1 dit bio, et le tampon de la preuve dit « certifiée bio depuis 2016 ». La frise « Novembre · 4 chapitres », en bas du hero, est gardée : c'est la table des chapitres du récit (composition § 5), pas une étiquette au-dessus du titre.
- *Broken image* : **faux positif**. Les deux `<img>` sans `src` sont dans `<template id="modele-legume">` et `<template id="modele-article">` (gabarits clonés par le script). Aucune requête en échec, aucune image cassée dans le DOM après chargement forcé.
- *Tight leading* : **vrais cas** corrigés, les citations sur 2 à 3 lignes (Claire, avis) passent de 1,28 à 1,36. **Faux positifs** : titres en Young Serif à 1,15 sur 2 lignes (noms des fiches, titres d'articles, « Velouté de potimarron » de la fiche recette, « Panais, choux et mâche. »). Ce sont des titres, pas du texte courant.
- *Cramped padding* : **vrais cas** corrigés : étiquettes « provisoire » (2,4 px → 8 px de marge verticale), pastille « Semaine 45 → » (5,6 → 8 px), lignes de la fiche du hero (3,2 → 4,8 px au-dessus du filet). **Faux positifs** : pastilles rondes de taille fixe à glyphe centré (numéros d'étape, « + » de la FAQ) ; légende `sr-only` de la bascule et de la comparaison des prix (texte masqué) ; chiffres de la preuve (boîte de police de 60 px avec interligne 1, l'encre est à 18 px du filet) ; corps fermé de l'accordéon FAQ.

**Mesures** (`/tmp/claude-501/compte-pane.js`, à 1440) : **792 mots** (mouvement permis et réduit), 12 sections, 14,9 écrans (12,3 en réduit). À 375 : 779 (carte « Décembre » masquée) et 787 en réduit. Détail : évitement 3, en-tête 8, hero 67, preuve 31, récit 88, ferme 55, panier 71, comment 54, relais 33, avis 57, prix 79, journal 58, questions 78, inscription 59, pied 51.

**Contrôles** : aucun débordement horizontal aux 5 largeurs et dans les 2 modes ; aucun titre coupé sur un trait d'union ; h1 sur 2 lignes partout ; console vide (aucune erreur, aucun avertissement, aucune ressource manquante) ; tabulation jusqu'au bouton de fin de piste visible à 1440, 1280 et 768.

**Reste faible** : h2 du prix, de l'inscription et des relais sur 3 lignes à 1024 ; « maraîchers à » finit sur « à » (préféré à « maraîchers » seul) ; à 768, la S48 dépasse l'écran en bout de piste (le chapitre est plus large que la fenêtre, comme avant) ; dans la bande des fiches sur téléphone, les photos des fiches hors écran se chargent au glisser (`loading="lazy"`) ; tout ce qui attend le client (FIX-8).

