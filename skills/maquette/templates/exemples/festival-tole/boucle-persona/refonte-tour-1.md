# Tôle : boucle persona, refonte, tour 1

- **Date** : 4 novembre 2026
- **Page testée** : http://127.0.0.1:4331/festival-tole/index.html (refonte du 4 novembre : 11 sections, vidéo dans le hero)
- **Navigateur** : Google Chrome 156 piloté par Playwright, à 1440 × 900, 1280 × 800, 768 × 1024, 375 × 812 et 360 × 740, en mouvement normal puis réduit
- **Regard indépendant** : je n'ai pas lu les rapports du relecteur. Je n'ai lu que `brief.md`, `NOTES.md`, `medias-a-generer.md`, les règles du plugin et les retours de l'utilisateur.
- **Captures** : `boucle-persona/captures-refonte-tour-1/` (chemins relatifs ci-dessous)
- **Seuil** : 85 / 100 (maquette aux médias provisoires) et verdict « Oui »

Je parle en Nadia Ferrand, directrice de l'association Tôle, qui signe le devis. Pour le parcours d'achat, je parle en Yanis, 24 ans, qui arrive de Lyon avec quatre amis.

---

## Partie 1 : rapport de test

### 1. Les 5 premières secondes

**Ordinateur, 1440 × 900** (`00-premier-ecran-1440x900.png`). La vidéo tourne au bout d'une seconde. On voit une halle d'usine avec des verrières, une charpente, la foule de dos et des faisceaux de lumière, le tout passé en trichromie minium. C'est mon lieu, ou presque. Les quatre repères de la grille donnent dates, ville, pass 79 € et dernier tram 4 h 30. Viennent ensuite le titre « Trois nuits sous la tôle. » sur toute la largeur, le chapo avec le prix, et le bouton « Prendre mon pass — 79 € ». En cinq secondes, je sais ce qu'on vend, où, quand, combien et comment on rentre. Le hero est équilibré : la vidéo remplit le milieu et je n'y vois aucun vide raté. Le décompte « J−241 » ne clignote pas, donc il ne me gêne pas.

**Téléphone, 375 × 812** (`00-premier-ecran-375x812.png`). Le premier écran montre le prix et le dernier tram sans défiler, avec le bouton et la vidéo. C'est exactement ce que je demandais (« dans le tram, avec le prix et l'heure du dernier tram sans chercher »). En regardant de près, l'accent circonflexe de **TÔLE** touche la base du T de **NUITS**, sur la ligne du dessus (`zoom-titre-hero-375.png`). On le voit aussi à 360 et à 768 (`zoom-titre-hero-768.png`). Le nom du festival se cogne dans le titre principal.

**1280 et 768** (`00-premier-ecran-1280x800.png`, `00-premier-ecran-768x1024.png`) : la composition tient. À 768, la grille de 4 repères reste lisible, avec le bouton « Menu ».

**Nav** : logo, cinq liens (Programme, Artistes, Le lieu, Venir, Journal) et un bouton « Pass 3 nuits — 79 € ». Elle n'affiche aucun numéro de téléphone. Sur téléphone, le menu est une liste propre sous la barre (`mobile-menu-ouvert.png`) : cibles de 52 px, `aria-expanded`, et il se referme après un clic sur un lien (`mobile-apres-lien-venir.png`, section à 72 px du haut).

### 2. Le défilement complet

**1440, lent** : 13 captures (`bureau-01-manifeste.png` à `bureau-13-FOOTER.png`).

- **Manifeste** (`bureau-01`, `bureau-02`) : les mots passent du gris à l'encre au fil du défilement. C'est le moment signature et il marche. La photo de la halle B vide (rails, verrières, flight-case au loin) est juste. Elle a l'air d'une manufacture.
- **Programme** (`bureau-02`, `bureau-03`) : trois colonnes, une photo par soir et quatre concerts avec heure et halle, plus une bande défilante des noms qu'on peut mettre en pause. C'est clair. Le titre « Trois soirs, trois halles, douze concerts annoncés » a un défaut à 1440 : la virgule de « HALLES, » tombe dans l'accent du É de « ANNONCÉS » (`zoom-collisions-titres.png`, en haut).
- **Artistes** (`bureau-04-artistes.png`, `artistes-galerie-0.png` à `-9.png`) : six fiches portrait. La galerie épinglée ne se déplace que d'environ 450 px de côté (mesuré : la première fiche passe de x = 40 à x = −414, puis tout s'arrête). Le geste reste discret, presque inutile à 1440, où cinq fiches tiennent déjà à l'écran.
- **Le lieu** (`bureau-05-lieu.png`, `bureau-06-public.png`) : aplat minium, quatre compteurs (41 / 3 / 4 200 / 12 000) et les trois halles en photo avec leur jauge. C'est le bloc dont je suis le plus fière.
- **Public** (`bureau-06`, `bureau-07`) : « 11 800 festivaliers en 2026, la pluie dehors », une mosaïque de quatre photos et trois avis. **La grande photo (`images/public-1.webp`) montre la pluie qui tombe à l'intérieur de la halle**, en traits verticaux au-dessus de la foule et devant la scène. Sous un titre qui dit « la pluie dehors », c'est un contresens : on croirait que le toit fuit. Les deux photos du bas (main en cornes et main levée sur fond de bokeh) se ressemblent, et ce sont les photos de foule interchangeables que je déteste.
- **Pass** (`bureau-08-pass.png`, `bureau-09-pratique.png`) : il y a bien deux colonnes. Les trois pass ont des prix lisibles, le pass trois nuits est en minium, et la phrase « La troisième nuit revient à 15 € » est juste (79 − 2 × 32). Sous les trois garanties, la colonne de gauche reste **vide sur environ 450 px**. Cette section n'a aucune image, alors que la règle en demande une par section, sauf la FAQ et l'appel final.
- **Pratique** (`bureau-09`) : photo du tram de nuit, accès, retour, accessibilité, pluie. Ça répond aux objections 2, 3 et 5 de Yanis.
- **Journal** (`bureau-10-journal.png`) : trois cartes datées (2 novembre, 21 octobre, 30 septembre 2026), avec rubrique, titre et une phrase. Elles sont prêtes pour un CMS.
- **FAQ, appel final, pied** (`bureau-11-faq.png`, `bureau-12-FOOTER.png`) : quatre questions en accordéon. L'appel final est en deux colonnes, avec le pass à gauche et l'alerte du 15 avril à droite. Le grand « TÔLE » en minium et le pied complet (plan, contact par e-mail, réseaux, mentions, CGV) concluent bien.

**1440, rapide** (`bureau-rapide-1.png` à `-4.png`) : rien ne saute et rien ne clignote. Pendant le lissage, quelques titres arrivent après leur bloc (masque d'apparition), mais tout est en place à l'arrêt. L'action n'est jamais cachée.

**375** : 15 captures (`mobile-01-manifeste.png` à `mobile-15-FOOTER.png`). Aucun débordement horizontal, et le bouton collant « Pass 3 nuits — 79 € » reste présent sans masquer d'action. La galerie des artistes se fait glisser au doigt avec aimantation (`mobile-artistes.png`, `mobile-artistes-glisse.png`). Défaut léger : la première fiche se cale à x = 0, son texte collé au bord de l'écran, sans la marge de 16 px.

### 3. Le parcours de l'acheteur (Yanis)

| Étape | Ce que j'ai fait | Ce que j'ai vu |
|---|---|---|
| 1 | Clic sur « Prendre mon pass — 79 € » dans le hero | Arrivée en haut de la billetterie, titre à 186 px du haut (`parcours-01-apres-clic-hero.png`) |
| 2 | Pass une nuit, choix « Samedi 3 », « Ajouter au panier » | À 1440 × 900, le panier commence à 788 px. On devine la ligne « 1 × Une nuit (samedi) » tout en bas, mais le message de confirmation est hors écran, à 1 039 px (`parcours-02-ajout-une-nuit.png`) |
| 3 | Le groupe : 4 pass trois nuits + 3 nuits au tarif réduit (l'étudiant) | Panier juste : 32 + 316 + 3 × 22 = **414 €**, bouton « Payer 414 € » (`parcours-03-panier-groupe.png`) |
| 4 | « Retirer » sur la ligne samedi, puis « Payer » | 382 €, puis « Exemple fictif : aucune billetterie derrière ce bouton. » (`parcours-04-payer.png`) |
| 5 | **Téléphone** : bouton collant, puis « Ajouter au panier » (trois nuits) | **Rien ne change à l'écran.** Le panier est à 1 121 px et le message à 1 372 px, pour un écran de 812 px. Aucun compteur de panier dans la barre non plus (`mobile-apres-tap-collant.png`, `mobile-apres-ajout.png`). Yanis appuiera deux fois et se retrouvera avec deux pass |
| 6 | FAQ : ouverture de deux questions | Accordéon exclusif, réponses courtes (`parcours-05-faq.png`) |
| 7 | Alerte du 15 avril avec « yanis@ », puis « yanis.test@exemple.fr » | Erreur claire avec `aria-invalid`, puis message fictif (`parcours-06-alerte-erreur.png`, `parcours-07-alerte-ok.png`) |
| 8 | « Écouter un extrait » | « Extrait indisponible (exemple fictif) » (`parcours-08-extrait.png`) |
| 9 | Les cinq liens de la nav | Chaque section arrive à 72 px du haut, sous la barre (`parcours-09-nav-journal.png`) |
| 10 | « Pause vidéo », descente puis remontée | La vidéo reste en pause (le correctif contre le kit marche) |

**Les chiffres d'un bloc à l'autre** : le prix de 79 € est le même partout (repère, nav, hero, bouton collant, billetterie, appel final). Le chapo (ligne 67) l'écrit en dur au lieu de le tirer de `TOLE.pass` : c'est sans effet aujourd'hui. Les jauges concordent (2 000 + 1 200 + 1 000 = 4 200 places par nuit), comme 12 + 29 = 41 artistes. Les incohérences sont dans les textes (voir § 6).

### 4. Le clavier : 40 tabulations depuis le haut

Toutes les tabulations sont listées dans le script, avec captures `clavier-tab-01.png` à `clavier-tab-38.png`.

- Ordre logique : lien d'évitement, logo, 5 liens, bouton pass, bouton du hero, programme, pause vidéo, pause de la bande, 6 extraits, choix du soir et ajouts, 3 articles, 4 questions, bouton final, champ e-mail, « Me prévenir », pied de page.
- Le focus est **visible partout** : contour de 3 px décalé, en minium sur fond clair ou encre, et en encre sur l'aplat minium (`clavier-tab-09.png`, `-20`, `-32`).
- **Défaut** : à la tabulation 13, « Écouter un extrait de Brise-Glace » prend le focus à x = −311, hors écran. La galerie épinglée ne ramène pas la fiche focalisée dans la vue. À la tabulation 16, la fiche de Furnace Club est coupée à droite (`clavier-tab-16.png`).

### 5. Le mouvement réduit

`reduced_motion = reduce`, à 1440 et 375 (`reduit-premier-ecran-1440.png`, `reduit-page-entiere-1440.png`, `reduit-premier-ecran-375.png`, `reduit-page-entiere-375.png`) :

- **La vidéo n'est pas demandée** : 0 requête `.mp4`, `currentSrc` vide. L'affiche fixe reste.
- Aucun élément ne reste caché : 0 titre, image ou paragraphe à opacité nulle. Aucune image cassée et une console vide.
- Les artistes passent en grille de 3 colonnes à 1440, sans débordement. La page reste complète : 750 mots et 11 sections, comme en mouvement normal.

### 6. L'œil du métier (je relis tout en directrice et en programmatrice)

Ce qui est juste : la Manufacture de Saint-Étienne a bien des halles du milieu du XIXᵉ siècle (« charpente de 1864 » est crédible), les jauges s'additionnent, et le tram jusqu'à 4 h 30 suivi du premier TER à 5 h 12 forment une chaîne de retour plausible. La vidéo et les trois images générées (halle vide, halle A avec scène, charpente de la halle C) montrent une vraie usine. Le bon geste a été fait là.

Ce qui ne passe pas devant moi, ni devant Hugo, mon programmateur :

1. **La pluie à l'intérieur** (`images/public-1.webp`, `index.html` ligne 192) : traits de pluie au-dessus de la foule, dans la halle. Ça contredit la promesse du titre de la section et l'objection numéro 3.
2. **Le tram, présenté à la fois comme une nouveauté et comme un souvenir** : l'article du 21 octobre 2026 annonce « Le tram roulera jusqu'à 4 h 30 » (ligne 353), alors que Mehdi raconte « Le tram de 4 h 30 était plein » en 2026 (ligne 199). L'un des deux est faux.
3. **« Brise-Glace ouvre le vendredi »** (journal, ligne 352) : le programme fait ouvrir Lou Garance à 19 h 30. Brise-Glace joue à 22 h 30, en troisième position (ligne 103).
4. **« Les Frigos »** dans la bande « Déjà annoncés » (ligne 131) n'apparaissent nulle part dans le programme ni dans les fiches.
5. **Les genres et les halles** : « Les Rivets, punk chanté en français » le soir rap (ligne 346, programme ligne 112). « Dalle Brute », concert rock, en halle C, alors que la C est présentée comme la halle électro (ligne 102 contre ligne 179). La halle A, « rock et rap », n'a aucun concert annoncé le dimanche. Hugo ne laisserait pas passer ça.
6. **La photo ne colle pas au texte** : Brise-Glace, « rock bruitiste, trois guitares », est illustré par « un claviériste » (ligne 344). Furnace Club, « house », par un groupe avec instruments (ligne 349).
7. **Le texte alternatif du journal annonce un lieu faux** : « La charpente ronde de la halle C » (ligne 352), alors que la photo montre un dôme de salle de concert moderne. La halle C est une charpente rivetée (`halle-toit.webp`). Les photos des cartes 1 et 3 ne sont pas notre lieu.
8. **Le trou entre 4 h 30 et 5 h** : la halle C joue jusqu'à 5 h, mais le dernier tram part à 4 h 30. Que fait Yanis s'il reste jusqu'à la fin ? La page ne le dit pas. C'est pourtant sa deuxième objection.
9. **« Qui on est »** : on voit le lieu, mais jamais les gens. Rien sur l'association, les trois salariés ou les 180 bénévoles (sauf une carte du journal). Pour un festival associatif, c'est une partie de la preuve.
10. Détails : « 1er juillet » (lignes 211 et 285) au lieu de « 1ᵉʳ ». Le message « Une nuit (samedi) ajouté au panier » (ligne 439) devrait être accordé : « ajoutée », ou mieux, « Pass une nuit (samedi) ajouté ». Dans les boutons, l'espace avant « 79 € » est trop large, le `gap` du flex s'ajoutant à l'espace du texte (`tole.src.css` ligne 49).

### 7. La densité (script de `conventions.md` § 11, à 1440 × 900, 3 s d'attente)

| Mode | Mots | Sections | Écrans |
|---|---|---|---|
| 1440, mouvement normal | **752** | **11** | **13** |
| 375, mouvement normal | 741 | 11 | 16 |
| 1440, mouvement réduit | 750 | 11 | 13,7 |
| 375, mouvement réduit | 739 | 11 | 16,4 |

Détail à 1440 : évitement 3, en-tête 11, hero 57, manifeste 47, programme 84, artistes 102 (6 fiches), lieu 45, public 48, pass 87, pratique 70, journal 63, FAQ 69, final 32, pied 34.

Les mots et les sections sont dans la fourchette. **Un bloc dépasse 3 phrases** : le manifeste (ligne 81) en a quatre, « Pendant deux siècles… fusils. / Trois nuits par an, on y monte le son. / Le toit tient. / Les murs aussi. » Tous les autres blocs en ont trois au plus. Avec 25 photos et une vidéo, la page a plus de visuels que de texte, **sauf la section pass, qui n'a aucune image**.

### 8. La console et le réseau

Sur chargement propre, à chaque taille et dans chaque mode, je n'ai eu aucune erreur, aucun avertissement et aucune requête échouée. Pendant mes tests enchaînés, j'ai vu quatre `ERR_CONNECTION_RESET`, qui ont cassé les photos d'artistes une fois (`artistes-galerie-0.png`). Ils viennent du `http.server` local, saturé par d'autres sessions en parallèle. Au rechargement, toutes les images étaient en place. Je ne compte pas ces erreurs contre la page.

### Responsive : contrôle des titres aux 5 tailles

Aucun débordement horizontal (0 px partout). Pas de texte sous 12 px. Interlettrage positif (+0,01 em) sur tous les titres, et aucune lettre collée à sa voisine. En revanche, **les lignes se touchent** : l'interligne est de 0,88 sur le titre du hero (`tole.src.css` ligne 99) et de 0,95 sur les h2 (ligne 23), et les capitales accentuées en souffrent. Ça se voit à 360, 375 et 768 sur « TÔLE », et à 1440 sur « ANNONCÉS » (`zoom-collisions-titres.png`).

---

## Partie 2 : la note

### Contrôle des 10 points (`agents/client-persona.md`)

| Point | Verdict | Preuve |
|---|---|---|
| Densité | **Pas OK** (léger) | 752 mots et 11 sections : OK. Mais le manifeste a 4 phrases (ligne 81) |
| Catalogue / articles | OK | 3 pass avec prix, choix du soir, panier, retrait, total ; 3 articles datés tirés de `TOLE` (`parcours-03`, `bureau-10`) |
| Titres | OK | « Trois nuits sous la tôle. » : promesse et nom dans le titre, titres de section de 4 à 10 mots, chacun avec un fait |
| Typographie | **Pas OK** (majeur) | Accent de TÔLE collé au T de NUITS à 360, 375 et 768 ; virgule dans le É d'ANNONCÉS à 1440 (`zoom-titre-hero-375.png`, `zoom-collisions-titres.png`) |
| Navigation | OK | Logo, 5 liens, 1 bouton, aucun téléphone ; menu mobile propre (`mobile-menu-ouvert.png`) |
| Blocs d'action | **Pas OK** (majeur) | Deux colonnes : OK. Mais l'ajout au panier ne donne aucun retour visible sur téléphone (`mobile-apres-ajout.png`) |
| Hero | OK | Vidéo, repères, titre, prix et action se répondent, sans vide (`00-premier-ecran-1440x900.png`) |
| Responsive | OK (hors typographie) | 0 débordement aux 5 tailles |
| Images | **Pas OK** (majeur) | La pluie tombe dans la halle (`public-1`) ; la section pass n'a pas d'image ; photos du journal et de certains artistes à contresens |
| 3D | Sans objet | Aucun objet 3D prévu pour un festival |

### Grille sur 100 (`niveau-agence.md` § 6)

| Critère | Points | Note | Pourquoi |
|---|---|---|---|
| Direction artistique | 15 | **13** | Je reconnais l'affiche Tôle sans le logo : encre, papier, minium, Archivo étroit, filets de grille, trichromie partout. Je retire 2 points pour la mosaïque de mains levées sur fond de bokeh, le cliché de festival que je déteste |
| Images | 15 | **11** | Vidéo d'usine réelle, 25 photos, tailles variées, série cohérente. Mais la photo phare de la preuve « pluie dehors » montre la pluie dedans, le pass n'a aucune image, et les photos du journal et de deux artistes ne disent pas ce que dit le texte. Avec des médias provisoires, le plafond est de 12 à 13 |
| Mise en page | 15 | **12** | Le brutaliste typographique est suivi : grille de 4 colonnes visible, ruptures encre, papier et minium, fort contraste d'échelle. Je retire des points pour le vide d'environ 450 px sous les garanties du pass à 1440 et pour la galerie épinglée qui bouge à peine |
| Mouvement | 10 | **8** | Vidéo, manifeste lu mot à mot (la signature marche), compteurs, apparitions, bande avec pause, pause vidéo, mouvement réduit complet. Je retire des points pour le déplacement horizontal trop court des artistes et pour le focus qui part hors écran (Brise-Glace) |
| Clarté en 5 s et action | 10 | **8** | Le premier écran est parfait sur ordinateur comme sur téléphone. L'action perd sa force au moment clé : on ajoute un pass et rien ne bouge à l'écran |
| Densité | 5 | **0** | Dans la fourchette (752 mots, 11 sections, 13 écrans, comptage fourni), mais un bloc dépasse 3 phrases, ce qui met « Densité » à 0 selon la règle |
| Preuves et objections | 10 | **6** | Chiffres 2026, avis nommés avec âge et ville, réponses au prix, au retour, à la pluie, au fauteuil et à l'affiche incomplète. Mais j'ai trouvé cinq contradictions internes (tram, ouverture du vendredi, Les Frigos, genres et halles, texte alternatif « halle C »), le trou entre 4 h 30 et 5 h, et l'équipe absente. Le plafond est de 8 sans vraies preuves |
| Textes | 10 | **8** | Titre fort, promesse concrète, voix sèche faite de données, sans adjectif de festival. Je retire des points pour la photo qui contredit le titre de la section, le message du panier mal accordé et « 1er » |
| Mobile et accessibilité | 10 | **5** (plafond) | Sans le plafond : 8 (0 débordement, focus visible partout, cibles de 44 à 52 px, console vide, vidéo non chargée en mouvement réduit). Le titre du hero, avec les lettres de lignes voisines qui se touchent à 360, 375 et 768, **plafonne ce critère à 5** |
| **Sous-total** | 100 | **71** | |
| Pénalité | | **−5** | Un bloc de plus de 3 phrases (le manifeste) |
| **Total** | | **66 / 100** | Sans les deux règles mécaniques (le plafond typographique et la pénalité du manifeste), la page vaudrait **79** |

**Note sur 10 : 6,6.**

**Seuil applicable : 85 / 100** (maquette aux médias provisoires : vidéo et 4 images générées, photos d'artistes libres). Je n'ai pas pénalisé le caractère provisoire des photos d'artistes : elles sont crédibles. Je n'ai pénalisé que celles qui contredisent leur texte.

**Ce qui est atteignable sans le vrai client** : environ **86 à 88**. Les FIX 1 à 9 coûtent 0 $ et rapportent à eux seuls environ +20 points :

- Mobile revient à 8 (+3).
- La densité revient à 5 et la pénalité disparaît (+10).
- Images passent à 12 (+1).
- Preuves passent à 8 (+2).
- Clarté passe à 9 (+1).
- Mise en page passe à 13 (+1).
- Mouvement passe à 9 (+1).

Le reste, jusqu'à 90, demande le vrai client : les photos de presse des artistes, de vrais avis 2026, la règle réelle de retour après 4 h 30, et des photos de l'équipe et des bénévoles.

> « Je la reconnais sans le logo, et le premier écran au téléphone, c'est exactement ce que je voulais. Mais sur la photo qui doit prouver qu'on est au sec, il pleut dans ma halle. Le nom du festival se cogne dans le titre sur téléphone. Et quand Yanis appuie sur "Ajouter au panier", il ne se passe rien sous ses yeux. Corrigez ça, et je signe. »

Verdict : Pas encore. La page est presque au niveau, mais la photo de la preuve pluie la contredit, le titre se télescope sur téléphone et l'ajout au panier reste muet sur mobile.

---

## Partie 3 : plan de corrections

| FIX | Gravité | Coût | Résumé |
|---|---|---|---|
| FIX-1 | bloquant | **0 $** | Interligne des titres : les capitales accentuées touchent la ligne du dessus (TÔLE, ANNONCÉS) |
| FIX-2 | bloquant | **0 $** (ou **génération** ≈ 0,06 $) | Remplacer `public-1` : la pluie tombe dans la halle |
| FIX-3 | majeur | **0 $** | Retour visible après « Ajouter au panier » (téléphone surtout) |
| FIX-4 | majeur | **0 $** | Manifeste : 4 phrases à ramener à 3 |
| FIX-5 | majeur | **0 $** | Contradictions de contenu : tram 4 h 30, « Brise-Glace ouvre », Les Frigos, genres et halles |
| FIX-6 | moyen | **0 $** | Billetterie : remplir la colonne vide par une image (la section n'en a aucune) |
| FIX-7 | moyen | **0 $** | Photos à contresens : Brise-Glace, Furnace Club, journal « halle C » ; mosaïque redondante |
| FIX-8 | moyen | **0 $** / **client** | Dire quoi faire entre 4 h 30 et 5 h (dernier tram contre fin de la halle C) |
| FIX-9 | moyen | **0 $** | Galerie des artistes : focus hors écran, déplacement trop court, première fiche collée au bord sur téléphone |
| FIX-10 | moyen | **client** (bloc à 0 $) | « Qui on est » : l'association, l'équipe, les bénévoles, en photo |
| FIX-11 | léger | **0 $** | Microtypographie : « 1ᵉʳ », accord du message du panier, espace avant le prix dans les boutons, prix du chapo en dur |
| FIX-12 | léger | **client** | Photos de presse des artistes, vrais avis 2026, photos des halles réelles |

### FIX-1 : les lignes des grands titres se touchent (bloquant)

- **Quoi** : l'accent circonflexe de « TÔLE » touche le T de « NUITS » à 360, 375 et 768. La virgule de « HALLES, » entre dans l'accent du É de « ANNONCÉS » à 1440. Le défaut plafonne « Mobile » à 5.
- **Où** : `tole.src.css` ligne 99 (`.titre-hero { line-height: .88 }`), ligne 23 (`h1, h2, h3 { line-height: .95 }`), ligne 305 (`.titre-final { line-height: .9 }`), puis recompiler `tole.css`.
- **Comment** : passer `.titre-hero` à `line-height: 1` (ou `.96` avec `padding-top: .08em` sur la deuxième ligne), et `h1, h2, h3` ainsi que `.titre-final` à `1`. Revérifier à l'œil à 1440, 1280, 768, 375 et 360 sur TÔLE, ANNONCÉS, ÉCOUTER, ÉLECTRO et BÉNÉVOLES. La compacité du brutaliste ne doit pas coûter le nom de la marque.

### FIX-2 : il pleut dans la halle (bloquant)

- **Quoi** : `images/public-1.webp`, la grande photo de la preuve « 11 800 festivaliers en 2026, la pluie dehors », montre des traits de pluie au-dessus de la foule, à l'intérieur. Son texte alternatif dit « la pluie visible par les hautes fenêtres », ce qui est faux sur l'image.
- **Où** : `index.html` ligne 192.
- **Comment** : à 0 $, mettre à la place `images/public-4.webp` (en réserve, faisceaux sur la foule) et corriger le texte alternatif. On peut aussi recadrer `public-1` sur le tiers droit (fenêtres, sans la pluie devant la scène). Sinon, régénérer le prompt P3 (≈ 0,06 $, FLUX.2 Pro) en ajoutant « dry interior, rain only visible on the outside of the window glass, no drops inside the hall ».

### FIX-3 : l'ajout au panier est muet sur téléphone (majeur)

- **Quoi** : à 375 × 812, après « Ajouter au panier », le panier est à 1 121 px et le message à 1 372 px. Rien ne change à l'écran. À 1440 × 900, le message est aussi hors écran (1 039 px).
- **Où** : `index.html`, fonction d'ajout (lignes 432 à 440), `.toast` (ligne 223), CSS `.panier` (`tole.src.css` ligne 250).
- **Comment** : déplacer le message hors du panier, dans une barre fixe en bas de l'écran (`position: fixed`), en réutilisant l'emplacement du bouton collant, qui est déjà masqué sur `#pass`. Exemple : « Trois nuits ajouté · Panier 79 € · Voir ». On peut aussi changer le texte du bouton pendant 2 s (« Ajouté ✓ ») et afficher un total collant « Panier (1) — 79 € » qui descend au panier. À 1440, rendre le panier `position: sticky; top: 5rem` dans la colonne de droite, ou le placer au-dessus des pass.

### FIX-4 : le manifeste a 4 phrases (majeur, −10 points à lui seul)

- **Quoi** : « Pendant deux siècles, ces halles ont fabriqué des fusils. Trois nuits par an, on y monte le son. Le toit tient. Les murs aussi. » fait 4 phrases. La règle impose 3 au plus par bloc : « Densité » tombe à 0 et la page prend une pénalité de 5 points.
- **Où** : `index.html` ligne 81.
- **Comment** : « … on y monte le son. Le toit tient, les murs aussi. » La chute garde son rythme et le bloc passe à 3 phrases.

### FIX-5 : contradictions de contenu (majeur)

- **Quoi et où** :
  - Tram : l'article du 21 octobre 2026, « Le tram roulera jusqu'à 4 h 30 » (ligne 353), contredit l'avis de Mehdi sur 2026 (ligne 199). Choisir l'un des deux : soit l'article devient « Le tram de nuit reconduit jusqu'à 4 h 30 », soit l'avis de Mehdi parle d'autre chose (par exemple « Le vestiaire à 2 €, et pas une minute d'attente. »).
  - « Brise-Glace ouvre le vendredi » (ligne 352) contredit le programme, où Lou Garance joue à 19 h 30 (ligne 101). Écrire « Brise-Glace en tête d'affiche du vendredi, Furnace Club ferme le dimanche. »
  - « Les Frigos » dans la bande (ligne 131) n'apparaissent nulle part ailleurs. Les retirer, ou les mettre dans le programme.
  - Genres et halles : Les Rivets « punk » le soir rap (ligne 346). Le passer en « rap punk, en français », ou le déplacer le vendredi. Dalle Brute, concert rock en halle C (ligne 102) : le passer en halle B. Pour la halle A, « rock et rap » (ligne 171), ajouter « ; électro le dimanche », ou mettre un concert du dimanche en halle A.

### FIX-6 : la billetterie n'a aucune image et un vide à gauche (moyen)

- **Quoi** : à 1440, la colonne de gauche est vide sur environ 450 px sous les trois garanties (`bureau-08-pass.png`, `bureau-09-pratique.png`). C'est la seule section, hors FAQ et appel final, sans visuel.
- **Où** : `index.html` lignes 208 à 215 (`.billetterie-texte`), `tole.src.css` ligne 235.
- **Comment** : ajouter sous les garanties une photo 4:5 alignée sur le filet, par exemple l'entrée de la halle, le bracelet ou la file au contrôle. À 0 $ : `halle-charpente` ou `public-4` en trichromie, en `position: sticky` pendant que la colonne des pass défile.

### FIX-7 : photos à contresens du texte (moyen)

- **Quoi et où** :
  - Brise-Glace, « rock bruitiste, trois guitares », est illustré par un claviériste (ligne 344) : échanger avec une photo de guitariste de la série, ou écrire « Rock bruitiste, claviers et guitares. »
  - Furnace Club, « house », montre un groupe avec instruments (ligne 349) : écrire « House jouée en live, clôture à 5 h. »
  - Le texte alternatif du journal annonce « La charpente ronde de la halle C » (ligne 352) sur une photo de dôme moderne : décrire ce qu'on voit (« Un dôme de projecteurs au-dessus d'une foule ») ou utiliser une des images générées du lieu. Même chose pour la carte 3 (ligne 354).
  - La mosaïque du public (lignes 193 à 195) montre deux mains levées sur bokeh presque identiques. En remplacer une par une scène de vie sous le toit : le vestiaire, le bar ou la file du tram.

### FIX-8 : le trou entre 4 h 30 et 5 h (moyen)

- **Quoi** : la halle C joue jusqu'à 5 h et le dernier tram part à 4 h 30. C'est l'objection 2 de Yanis, et la page ne répond pas.
- **Où** : `index.html` ligne 253 (« Retour de nuit »).
- **Comment** : ajouter une donnée, par exemple « Après 4 h 30 : la gare Châteaucreux est à 25 minutes à pied, TER à 5 h 12. » La règle réelle (navette, tram prolongé) relève du **client** : la noter en hypothèse dans « Ce qui manque encore ».

### FIX-9 : la galerie des artistes (moyen)

- **Quoi** : la tabulation 13 met le focus sur l'extrait de Brise-Glace hors écran (x = −311). À 1440, la galerie épinglée ne se déplace que d'environ 450 px. Sur téléphone, la première fiche se cale à x = 0, collée au bord.
- **Où** : `tole.src.css` lignes 168 à 171 (`.artistes-fenetre`, `.artistes-piste`), `index.html` ligne 137 (`data-hscroll`).
- **Comment** : sur `focusin` dans `.artistes-piste`, faire défiler la page jusqu'à la position du pin qui montre la fiche (ou désépingler pendant la navigation au clavier). À 1440, agrandir les fiches (environ 28 vw) pour que le geste ait du chemin à faire, ou renoncer à l'épinglage au-dessus de 1280. Sur téléphone, ajouter `scroll-padding-inline: 1rem` sur `.artistes-fenetre` et `scroll-snap-align: start` sur les fiches.

### FIX-10 : « Qui on est » sans visages (moyen)

- **Quoi** : on voit le lieu, mais ni l'association, ni ses trois salariés, ni ses 180 bénévoles. Pour un festival associatif financé par la Ville et la Région, c'est une preuve forte.
- **Où** : section `#lieu` ou `#public` (`index.html` lignes 157 à 203).
- **Comment** : à 0 $, ajouter une bande de trois photos sous les halles, avec la légende « 3 salariés à l'année, 180 bénévoles en juillet, une association loi 1901 ». Les vraies photos de l'équipe relèvent du **client**.

### FIX-11 : microtypographie (léger)

- « 1er juillet » s'écrit « 1ᵉʳ juillet » ou `1<sup>er</sup>` (lignes 211 et 285).
- Le message « Une nuit (samedi) ajouté au panier. » devient « Pass une nuit (samedi) ajouté au panier. » (ligne 439).
- L'espace avant le prix est trop large dans les boutons « Prendre mon pass — 79 € » : `gap: .5rem` s'ajoute à l'espace du texte (`tole.src.css` ligne 49). Envelopper le libellé dans un seul `<span>`, ou mettre le `gap` à 0 pour ces boutons.
- Le chapo du hero écrit « 79 € » en dur (ligne 67) : le tirer de `data-prix="trois"`, comme partout ailleurs.

### FIX-12 : médias réels (léger, client)

- **Quoi** : les photos de presse des six artistes, de vrais avis 2026 et de vraies photos des halles et de l'équipe.
- **Où** : `images/prog-1` à `prog-6`, avis lignes 198 à 200, journal.
- **Comment** : à mettre dans « Ce qui manque encore ». C'est ce qui sépare 86-88 de 90.
