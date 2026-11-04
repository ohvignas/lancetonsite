# Calade — exemple « éditorial magazine » (profession libérale)

Atelier d'architecture fictif à L'Isle-sur-la-Sorgue (Vaucluse), fondé par Hélène Garcin. Il réhabilite mas, granges et maisons de village. Page d'accueil : `index.html` + `gestes.js` (copie figée du kit) + photos libres provisoires.

Exemple fictif — Lance ton site. L'atelier, les noms, l'adresse, le téléphone, les chantiers, les honoraires et le témoignage sont inventés, mais écrits comme si la cliente les avait fournis. La mention « exemple » est dans le commentaire en tête de `index.html` et ici, pas sur la page. Le formulaire n'envoie rien. Le numéro de téléphone a été retiré de la page (règle du 4 novembre : aucun numéro dans la nav ni en gros).

Composition suivie : **éditorial magazine** (`compositions.md`). Hero en couverture de revue, sommaire en liste qui s'ouvre, article long avec fiche technique, matière en grille asymétrique, méthode en quatre étapes, honoraires en tableau, portrait, témoignages sur fond sombre, journal en cartes d'articles, questions, contact en deux colonnes, pied de page complet.

**Refonte du 4 novembre 2026** (retours de l'utilisateur : « rien de spécial, sauf les titres et la promesse, à retravailler », plus les règles communes) : voir § 10.

## Structure du dossier

```
index.html        la page : 11 sections + pied de page (GSAP 3.15 + ScrollTrigger + SplitText, Lenis 1.3.27)
calade.src.css    source Tailwind v4 (@theme + @layer components) → calade.css compilé, minifié
gestes.js         copie figée de templates/prototype/gestes.js (non modifiée)
images/           webp, deux tailles par image (900/1800, 700/1400, 1000/2000)
captures/         premier écran et page entière (mouvement réduit) à 1440, 1280, 768, 375, 360 ; menu ouvert ; formulaire envoyé ; question ouverte
medias-a-generer.md  3 images à générer (remplacent des fichiers existants, même nom, même ratio)
boucle-persona/   rapports du client-persona, un dossier par tour
```

## 1. Direction artistique

- **Chaux, pierre, lumière rasante.** Une revue d'architecture imprimée sur papier mat : fond chaux, encre presque noire, un seul vert (la Sorgue) pour l'action. Les photos sont désaturées et légèrement réchauffées pour sortir d'un même tirage.
- **Palette** : chaux `#EBEAE5`, chaux-2 `#E1E0D9`, encre `#191B18`, gris `#565952`, filet `#C3C2BA`, sorgue `#2B584D` (boutons, liens), nuit `#161D1A` (citation).
- **Typographie** : Bodoni Moda (titres, très contrastée, italique pour un seul mot par titre) et Albert Sans (texte, interface). Folio de revue en tête (« Hiver 2026 · L'Isle-sur-la-Sorgue · … »), légendes sous chaque image, filets fins.
- **Mise en page** : grille de 12 colonnes, asymétries franches, beaucoup d'air. Le titre du hero passe *sur* la photo en `mix-blend-mode: multiply`, comme un titre de couverture.
- **Ce qui est évité** (gabarit interdit, `conventions.md` § 10) : pas de pastille, pas de photo plein cadre avec titre à gauche et deux boutons, pas de bande de réassurance, pas de trois cartes. Polices hors liste interdite.

## 2. Promesse et titres (skills `ogilvy` puis `copywriting`)

**Positionnement** : un atelier d'architectes pour les propriétaires et acheteurs d'une bâtisse de pierre du Vaucluse (mas, grange, maison de village) qui veulent y vivre sans en effacer le caractère. **Promesse unique** : la bâtisse devient habitable toute l'année (lumière, isolation, chaleur), la pierre est gardée, et le permis passe les Bâtiments de France. Le reste de la page en apporte les preuves (64 bâtisses, la grange, les honoraires chiffrés, la méthode, les avis).

### Titre de couverture (h1)

| | Piste | Verdict |
|---|---|---|
| A | Garder la pierre, *ouvrir* la lumière. | Ancien titre. Un parti pris élégant, mais aucun bénéfice pour le lecteur : il dit ce que fait l'atelier, pas ce qu'on y gagne. |
| **B — retenue** | **Votre bâtisse de pierre, *habitable* toute l'année.** | Bénéfice concret dans les mots du client (« bâtisse », « habitable »), répond à la peur n° 1 d'une vieille pierre (froide l'hiver, sombre, humide). S'adresse au lecteur (« votre »). 7 mots : tient en trois lignes de couverture. |
| C | Avant d'acheter un mas, sachez ce qu'il deviendra. | Bon titre de réponse directe (cible les acheteurs, promet une information), mais exclut les propriétaires déjà installés. Recyclé en article de journal. |
| D | L'atelier Calade rend les bâtisses du Vaucluse habitables, permis compris. | Marque + promesse + nouvelle, la formule d'Ogilvy. Trop long pour une couverture de revue (13 mots) ; la marque passe dans le chapeau. |
| E | 64 bâtisses de pierre rendues habitables depuis 2009. | Fait fort, mais c'est une preuve, pas une promesse. Devenu le titre du sommaire. |

**Chapeau** (marque + faits, la « nouvelle ») : « Atelier Calade, architectes à L'Isle-sur-la-Sorgue. Nous gardons la pierre des mas, granges et maisons de village, et y ajoutons lumière, isolation à la chaux et permis des Bâtiments de France. » Sous le bouton : « 1 h 30 sur place, 240 € TTC, déduits si vous continuez. »
**Légende de couverture** (mini-annonce, Ogilvy) : « Maison du Passage, Joucas : habitée toute l'année depuis 2024 » — elle prouve la promesse sur la photo même.
**Bouton** : « Demander la visite » partout (un seul libellé depuis le tour 2).

### Titres de section

| Section | Avant | Après | Pourquoi |
|---|---|---|---|
| Sommaire | Les dernières bâtisses rendues à leurs habitants | **64 bâtisses depuis 2009. Voici les trois dernières.** | Un chiffre vérifiable plutôt qu'une formule. |
| Article | La voûte gardée, la grange habitée | **Une grange à foin devenue maison en onze mois** | Avant / après et durée : un fait, une nouvelle. |
| Matière | La chaux, la pierre, et rien de plus | **Chaux et pierre : frais en août, secs en janvier** (raccourci au tour 2 de la refonte, 13 → 9 mots) | Le bénéfice de la matière, pas la matière seule ; relie à « toute l'année ». |
| Méthode (nouv.) | — | **De la visite aux clés : quatre étapes, une architecte** (11 → 9 mots) | Réduit la complexité perçue ; l'interlocuteur unique est l'objection levée. |
| Honoraires | Ce que coûte un architecte, avant de signer | **Nos honoraires, chiffrés avant que vous signiez** | Même idée, à la première personne, l'engagement devient celui de l'atelier. |
| Portrait | Hélène Garcin, architecte | **Hélène Garcin dessine, puis visite votre chantier chaque semaine** (11 → 9 mots) | Le nom seul ne disait rien ; ici le bénéfice (la même personne du dessin au chantier). |
| Témoignages | (aucun titre) | **Ce qu'en disent ceux qui y vivent** | Surtitre court, les citations portent la section. |
| Journal (nouv.) | — | **Le journal : ce que les chantiers nous apprennent** | Promet du contenu utile (Ogilvy : le conseil accroche). |
| Questions (nouv.) | — | **Ce qu'on nous demande à chaque visite** | Les mots du client ; annonce des réponses vécues, pas une FAQ générique. |
| Écrire | Racontez-nous votre bâtisse | Racontez-nous votre bâtisse (gardé) | Clair et dans la voix ; les promesses chiffrées vont dans la liste de réassurance à côté. |

Pistes écartées pour les sections : « 240 € pour savoir, 9 % pour bâtir » (honoraires — astucieux, mais oublie le permis), « Une architecte, pas un catalogue » (portrait — négation, Ogilvy la déconseille), « Vos questions » (FAQ — générique).

## 3. Sections et gestes

| # | Section | Contenu | Gestes |
|---|---|---|---|
| 1 | `#couverture` (hero) | Folio, photo d'escalier à la chaux, titre en surimpression sur trois lignes, chapeau, bouton, prix de la visite, légende verticale | `data-reveal-now`, `data-image-reveal`, `data-split="lines"`, `data-magnetic` |
| 2 | `#sommaire` (preuve) | 64 bâtisses ; les trois dernières en accordéon, l'image suit le curseur | `details[data-accordion]`, `data-follow-list="curseur"` |
| 3 | `#grange` (article à la une) | Grande photo, titre, deux phrases, fiche (180 m², 11 mois) | `data-image-reveal`, `data-parallax="0.08"`, `data-split` |
| 4 | `#matiere` (offre) | Grille asymétrique de quatre détails avec légendes | `data-image-reveal` |
| 5 | `#methode` (comment ça marche) — **nouv.** | Façade enduite (4:5) à gauche, quatre étapes numérotées à droite | `data-image-reveal`, `data-reveal-group` |
| 6 | `#honoraires` (tarifs) | 240 € · dès 5 760 € · 9 % ; exemple chiffré ; bouton | `data-reveal-group` |
| 7 | `#atelier` (qui on est) | Portrait, titre-bénéfice, une phrase | `data-image-reveal`, `data-split` |
| 8 | `#temoignage` | Fond nuit : grande citation + **deux avis courts** en colonnes (tous marqués provisoires) | `data-bg="#161d1a"`, `data-split`, `data-reveal-group` |
| 9 | `#journal` — **nouv.** | Trois cartes d'articles datées (chantier en cours, conseil, réglementation) générées depuis l'objet `JOURNAL` et le `<template id="modele-article">` | `data-reveal-group` |
| 10 | `#questions` (FAQ) — **nouv.** | Architecte ou maître d'œuvre, Bâtiments de France, délais, zone d'intervention | `details[data-accordion]` (name exclusif) |
| 11 | `#ecrire` (appel final) | **Deux colonnes** sur ordinateur : titre, trois promesses chiffrées, adresse à gauche ; formulaire à droite en deux colonnes de champs | `data-reveal`, `data-magnetic` |
| — | `footer` (pied complet) | Grand logotype, adresse et horaires, plan de la page, cadre (Ordre, décennale), crédits photo, haut de page | — |

Toutes les sections portent `data-bg`/`data-fg` (correction du tour 3 gardée).

**Nav** (modèle UI Skills `mengto/documentary-brutalist-agency` : « identité compacte, section en cours, déclencheur de menu net ») : logo, 4 liens (Réalisations, Méthode, Honoraires, Journal), bouton « Demander la visite ». Le lien de la section en cours prend `aria-current` (souligné). Sous 1024 px : logo, bouton (dès 640 px) et bouton « Menu » non modal (`aria-expanded`, Échap, fermeture au clic) qui déroule les liens en Bodoni sous l'en-tête. **Aucun numéro de téléphone** sur la page.

**Journal prêt pour un CMS** : une seule source, `const JOURNAL = [{ date, rubrique, titre, image, alt, url }]`, rendue par le `<template>` ; la date est formatée par `Intl.DateTimeFormat("fr-FR")` et l'espace fine insécable posée avant « : ; ? ! ». `url` vide = carte sans lien (pas de lien mort dans l'exemple, même règle que le FIX-3 refusé).

## 4. Densité (`conventions.md` § 11, script à jour)

| Mesure | Valeur | Budget (4 nov.) |
|---|---|---|
| Mots | **792** à 1440 × 900 en mouvement réduit (770 à 375 × 812 : folio et légende verticale masqués), après les FIX finaux du tour 2 de la refonte. Le « 783 » noté au tour 1 était faux : le script en comptait 800 | 500–800 |
| Sections dans `main` | **11** (+ pied de page complet = 12 blocs) | 10–13 |
| Hauteur à 1440 × 900 | 13 écrans | — |

Détail par bloc (1440, mouvement réduit, `compte-pane.js`) : lien d'évitement 3, en-tête 9, couverture 73, sommaire 61, grange 54, matière 29, méthode 86, honoraires 85, atelier 24, témoignages 73, journal 56, questions 128 (les quatre réponses dépliées), écrire 57, pied 54. Aucun bloc ne dépasse trois phrases. Tous les titres font de 4 à 10 mots.

Premier compte : 824 mots. Ramené à 794 : chapeau resserré, deux phrases de méthode, deux réponses de FAQ, crédits photo sans initiales, phrase du portrait. Avant la refonte : 384 mots, 8 sections.

**Méthode** : `dens-fn.js` (script § 11 corrigé : accordéons `name` ouverts ensemble, `aria-label` comptés une fois), à 1440 × 900, `reducedMotion` `reduce` puis `no-preference`, après 2,5 s.

## 5. Photos (provisoires)

Photos Unsplash (licence Unsplash), étalonnées au même grain : `eq=saturation=0.8:contrast=1.03:gamma=1.02,colorbalance=rs=0.02:bs=-0.03:rh=0.02:bh=-0.02`, puis `cwebp -q 78 -m 6`. Elles sont **provisoires** : un vrai atelier montre ses propres chantiers, photographiés au même moment de la journée.

| Fichier | Photographe (Unsplash) | Note |
|---|---|---|
| couverture | Alesia Kazantceva | escalier enduit |
| mas | AXP Photography (Pexels `29837842`) | mas en moellons calcaires, génoise et tuiles canal, volets de bois ; remplace deux essais (lauzes, puis PVC) |
| grange-article / grange-etage | Mike Von (`GrfbQPPYguU`) | grange calcaire et tuile canal à Barjac (Gard) ; l'article en entier ; le sommaire en recadrage sur l'étage (auvent de tuiles, porte rouge, lanterne), pour ne pas répéter la voûte de l'article (aucun intérieur voûté provençal libre trouvé) |
| village | Rich Martello (`8TQQK0vShv8`) | arche sur une calade à Joucas (Luberon) ; remplace une cour grecque |
| niche | **généré** FLUX.2 Pro (OpenRouter, 0,06 $) | plein cintre, jarre vernissée |
| lumiere | **généré** FLUX.2 Pro (OpenRouter, 0,06 $) | soleil d'hiver, tomettes, embrasure |
| enduit | **généré** FLUX.2 Pro (OpenRouter, 0,06 $) | enduit chaux ocre pâle, lumière rasante |
| pierre | Pawel Czerwinski (`kuwTa9uTv8g`) | moellons calcaires à joints beurrés ; remplace une niche de musée |
| portrait | **généré** FLUX.2 Pro (OpenRouter, 0,06 $) | remplace Age Cymru (mur de schiste) : moellons calcaires, poteau de chêne |
| journal-chantier | **généré** FLUX.2 Pro (OpenRouter, 0,03 $ + 0,03 $ au tour 1 de la refonte) | charpente chêne et tuiles canal, enduit chaux clair en cours (plus de gris « ciment »), tréteau |
| grange-sejour | **généré** FLUX.2 Pro (OpenRouter, 0,06 $) | séjour de la grange sous la voûte, porte de chêne vitrée ; à droite de la grande citation |
| journal-achat | Audric Wonkam (`xRut-7vJsE8`) | **nouv.** porte et volets vert d'eau sur moellons calcaires |
| journal-abf | Sébastien Jermer (`Oo3jbnStg6g`) | **nouv.** Gordes sur son rocher |
| methode | **généré** FLUX.2 Pro (OpenRouter, 0,06 $) | remplace La Brequa : façade calcaire, volets gris-bleu, glycine, perron ; 3:4 recadré en 4:5 |

La bergerie de Gordes (article du premier jet) a été retirée : aucune photo libre crédible d'une bergerie provençale réhabilitée (la seule trouvée montrait une fouille de musée). L'article porte désormais sur la grange, dont on avait une vraie photo du Midi.

Les quatre nouvelles photos (4 nov.) ont reçu le même étalonnage (`gamma=1.04`), recadrage 4:3 ou 4:5, `cwebp -size` (≤ 160 Ko). Crédits aussi dans le pied de page.

Aucune génération payante n'a été lancée. Trois images à générer, avec prompts et priorités, dans `medias-a-generer.md` : portrait sur calcaire (P1), chantier en cours du journal (P2), façade de la méthode (P3) ; chacune remplace un fichier existant, même nom et même ratio.

## 6. Vérification (Playwright, Chrome, 4 nov.)

| Contrôle | Résultat |
|---|---|
| Débordement horizontal à 1440, 1280, 768, 375, 360 (mouvement permis et réduit) | 0 px |
| Titres coupés ou qui dépassent (h1, h2, h3, entrées, questions, montants, logotype) | aucun, aux 5 tailles |
| Interlettrage négatif sur h1/h2/h3 | aucun (`letter-spacing: 0` partout ; titres, sommaire, montants, citations) ; contrôlé à l'œil à 1440 et 375 |
| h1 | 3 lignes aux 5 tailles ; jamais sous l'en-tête (écart 110 px à 1280 × 800, 307 px à 360 × 740) |
| Premier écran : titre, chapeau, bouton visibles | oui aux 5 tailles (à 360 × 740, « Hiver 2026 » est masqué pour garder le folio sur une ligne) |
| Texte < 12 px | aucun |
| Menu (768, 375, 360) | s'ouvre (`aria-expanded="true"`), 0 débordement, se ferme au clic sur « Méthode » et l'ancre arrive sous l'en-tête |
| Formulaire | envoi vide : 3 erreurs annoncées, focus sur « Prénom et nom » ; envoi rempli : confirmation affichée, bouton désactivé |
| Mouvement réduit | page complète, 0 élément invisible, aux 5 tailles |
| Console | propre sur un chargement isolé à 1440 et 375 (défilement complet). Sous charge (10 contextes à la suite), le `http.server` local coupe parfois une connexion d'image : c'est le serveur, pas la page |
| Tabulation | évitement, logo, 4 liens, bouton, bouton du hero, 3 entrées du sommaire, bouton des honoraires, 4 questions, 5 champs, envoi, liens du pied — focus visible partout |

Script : `scratchpad/cal5.js` (densité, contrôles aux 5 tailles, menu, formulaire, FAQ) et `cal5-cap.js` (captures).

Note : le hook « broken-image » signale l'`<img>` sans `src` du `<template id="modele-article">` ; c'est le modèle de carte, rempli par script — faux positif.

## 7. Ce qui reste faible

- Photos d'emprunt : aucune ne montre un vrai chantier de l'atelier ; le portrait est devant un mur de schiste (P1 de `medias-a-generer.md`).
- Le journal n'a pas de pages d'articles : les cartes ne sont pas cliquables (`url` vide). Au vrai projet, le CMS remplit `url`.
- Les trois avis restent provisoires (soulignés en pointillé) ; il faut de vrais avis signés, avec accord écrit.
- 792 mots : en haut du budget (8 de marge) ; toute phrase ajoutée doit en remplacer une (le pied de page compte).
- La promesse « habitable toute l'année » engage l'atelier : à valider avec la cliente (isolation, chauffage, ventilation chiffrés au cas par cas).

## 8. Boucle persona

Rapports dans `boucle-persona/iteration-N/`.

| Tour | Note | Verdict |
|---|---|---|
| 1 | 75 | Pas encore — photos d'autres régions et d'un musée, objection « architecte ou maître d'œuvre » sans réponse |
| 2 | 80 | Pas encore — cour grecque à Ménerbes, mas en PVC, Bâtiments de France sans réponse, image du sommaire sur le titre |
| 3 | **80** | **Pas encore** — 80/100 sous le seuil de 85 : remonter depuis la citation efface le nom de l'atelier dans l'en-tête et, sur téléphone, plonge toute la couverture dans le noir ; le sommaire montre encore la même grange quatre fois et deux entrées sans suite |

Corrections du tour 1 : prix TTC et seuil des 150 m², exemple de suivi chiffré, bouton sous les honoraires, visite à 240 € dès le premier écran, champ « votre bâtisse », témoignage marqué provisoire, bergerie retirée au profit de la grange, citation sans image, trois photos remplacées.

Corrections du tour 2 : Bâtiments de France dans la visite, total chiffré (permis + suivi), un seul libellé « Demander la visite », image du sommaire droite et dans la colonne vide, légendes de la matière lisibles sur téléphone, encart du portrait, premier écran à 375 × 667, cibles tactiles, quatre photos changées (village, mas, pierre, détail de la grange), images allégées.

**Le tour 3 était le dernier : la page reste à 80, sous le seuil de 85.** Le client simulé estime que ses FIX gratuits mènent vers 86-87. Ils sont appliqués **après** le dernier tour et **n'ont pas été re-notés** :
- fond : `data-bg` sur toutes les sections, en-tête qui pose sa propre couleur (vérifié : en-tête encre sur chaux au-dessus de la citation, couverture sur chaux après un toucher du logo depuis la citation, à 375 px) ;
- toit du mas gardé dans le cadre (`object-position: 50% 12%`) ;
- « Adossée à l'arche », « quatre chambres à l'étage », enduit « lissé » : ce que montrent les photos ;
- « 300 000 € HT de travaux… au moins 38 160 € TTC » (règle commerciale à valider par le client) ;
- grange : vignette « À la une » retirée, sommaire recadré sur l'étage ; la voûte n'apparaît plus qu'une fois, dans l'article ;
- portrait sans encoche (photo en colonnes 5 à 13), titres et citation en `text-wrap: balance` ;
- images recompressées à taille cible (toutes sous 245 Ko).

Non fait, à dessein : le FIX-3 (un lien sur les entrées du mas et de la maison du Passage). L'exemple n'a qu'une page ; un lien vers `#` serait un lien mort. Au vrai projet, chaque entrée mène à sa page de chantier. Restent pour le client (FIX-11) : vrais chantiers, la grange de l'intérieur, un portrait sur calcaire, des avis signés, le numéro d'Ordre, le SIRET et l'assureur.

## 9. Retours sur le plugin (kit `gestes.js`)

- Fond au défilement (`data-bg`) : le kit ne change le fond qu'en **entrant** dans une section `data-bg`. Une page qui n'en met que sur quelques sections garde le dernier fond après un saut (logo, ancre, téléphone sans défilement doux) : ici, la couverture restait en fond nuit après la citation. Le kit devrait remettre le fond par défaut au `onLeaveBack` de la première section `data-bg` et au `onLeave` de la dernière, ou exiger `data-bg` partout dès qu'une section en a un. `GESTES.md` devrait dire que l'en-tête fixe pose sa propre couleur.

- `data-follow-list` : l'image flottante prend un arrondi (14 px) et une rotation fixés en ligne par le kit ; une page éditoriale à angles vifs doit les annuler par script. Proposer `data-follow-radius` et `data-follow-tilt="0"`.
- `data-follow-list` + `details` : l'image suit encore le curseur au-dessus d'une entrée ouverte, et recouvre l'image de l'entrée. La page la cache à l'ouverture ; le kit pourrait le faire seul.

## 10. Refonte du 4 novembre 2026

Source : `test-lancetonsite/retours-utilisateur-2026-11-04.md` et les consignes communes de la refonte des 6 pages. Pas de nouveau tour persona (fait par la session principale si besoin).

- **Promesse et titres** retravaillés avec `ogilvy` puis `copywriting` (§ 2) : h1 « Votre bâtisse de pierre, *habitable* toute l'année. », chapeau avec la marque et les faits, huit titres de section réécrits.
- **De 8 à 11 sections, de 384 à 794 mots** : méthode, deux avis de plus, journal (cartes datées depuis un objet JS), questions, pied de page complet.
- **Nav** refaite depuis une skill UI Skills, menu propre sur téléphone, **téléphone retiré** (nav, contact, pied).
- **Écrire** en deux colonnes : promesses chiffrées à gauche, formulaire à droite en deux colonnes de champs.
- **Typo** : interlettrage à 0 sur tous les titres (il était à −0,02 à −0,035 em).
- **4 photos libres** ajoutées (même étalonnage), **3 à générer** listées.
- Gardé du tour 3 : `data-bg` partout, image du sommaire droite et rangée à l'ouverture, toit du mas dans le cadre, total chiffré des honoraires, un seul libellé de bouton.


## Médias générés (4 nov. 2026, session principale)
Prompts de `medias-a-generer.md` (P1 à P3), modèle `black-forest-labs/flux.2-pro` via OpenRouter, un seul tirage chacun. Recadrage aux ratios cibles, étalonnage commun (`gamma=1.04`), `cwebp -size`. Coût : 0,06 + 0,03 + 0,06 = **0,15 $**.


## Tour 1 de la refonte (persona 73/100) : corrections

FIX-1 à FIX-13 appliqués : crédits raccourcis (800 mots au script du § 11, et non 783), matière régénérée (niche, lumière, enduit), séjour habité dans les témoignages, FAQ architecte / maître d'œuvre, e-mail et mentions légales au pied, photo du hero plus basse sous 700 px de haut, première entrée du sommaire ouverte sur écran tactile, apostrophes typographiques, insécable avant « : » dans le journal, « 9 % HT », « levée des réserves », « volets d'origine gardés », titre de la matière remonté, h1 mobile qui ne mord plus la photo, lien courant effacé hors nav. Génération : 0,27 $. FIX-14 reste au vrai client.


## Tour 2 : 88/100, Oui ; FIX finaux appliqués

Rapport : `boucle-persona/refonte-tour-2.md`. Le client simulé signe à 88/100 (« Oui, ça vaut mes 25 000 € »). Les FIX gratuits 1 à 8 sont appliqués **sans nouveau tour** ; ils n'ont pas été re-notés.

| FIX | Fait | Vérifié |
|---|---|---|
| 1 · hero sur petit écran | `calade.src.css` : `@media (max-width: 899px) and (max-height: 760px) { .couverture-photo { height: 22svh; } }` | 360 × 740 : bouton 583 → 639, prix jusqu'à 692 (écran 740). 375 × 667 : bouton 569 → 625, prix jusqu'à 658 (écran 667). 375 × 812 inchangé |
| 2 · densité, titres longs | Matière, méthode, portrait à 9 mots ; légende de la méthode « : le résultat visé » | **792 mots** (était 800), 11 sections |
| 3 · lien courant | Un seul `IntersectionObserver` sur `main > section` et une table section → lien (`grange`, `matiere` → Réalisations) ; l'observateur `hors` est retiré | 1440, tous les 150 px, en descendant et en remontant, mouvement réduit et permis : 0 erreur hors des 45 px de bascule entre deux sections |
| 4 · légende verticale | `text-orientation: sideways` sur `.couverture .legende-cote` | Apostrophe de « l’année » couchée avec le texte, à 1440 et 1280 |
| 5 · textes démentis | Lumière : « Soleil d’hiver, en fin de journée » ; Saumane : « …on pique les vieux enduits » (titre et alt) ; grange : « ouvert au fond une porte-fenêtre de chêne » | Relu contre les trois images |
| 6 · tournures | « Du montant HT des travaux » ; « C’est noté » | Confirmation du formulaire affichée avec l’apostrophe typographique |
| 7 · pied sans fond | `data-bg="#ebeae5" data-fg="#191b18"` sur le `footer` | Saut instantané depuis la citation : pied chaux, « Haut de page » encre |
| 8 · vide de la méthode à 768 | 600–899 px : photo pleine largeur, `aspect-ratio: 3 / 2`, `object-position: 50% 70%` ; la limite à 26 rem ne vaut plus que sous 600 px | 768 : photo 688 × 488 sur une colonne de 688, glycine et perron dans le cadre |

`calade.css` recompilé (`tw.sh`). Contrôles Playwright (Chrome headless) à 1440 × 900, 1280 × 800, 768 × 1024, 375 × 812, 375 × 667 et 360 × 740, mouvement réduit et permis : 0 px de débordement, aucun titre qui dépasse ni coupé, console propre sur chargement isolé (les `ERR_CONNECTION_RESET` vus en rafale viennent du `http.server` local, comme noté au § 6).

**FIX-9, reste au vrai client** (va dans « Ce qui manque encore ») : ses chantiers photographiés, dont la grange Berthier dedans et dehors avec les mêmes portes ; des avis signés avec accord écrit ; le nombre réel de bâtisses (64) ; le numéro d’Ordre, le SIRET et l’assureur ; l’écart de prix assumé face à un maître d’œuvre ; la validation de la promesse « habitable toute l’année ».
