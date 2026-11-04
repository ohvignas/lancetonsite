# Tôle : boucle persona, refonte, tour 3 (dernier)

- **Date** : 4 novembre 2026
- **Page testée** : http://127.0.0.1:4377/festival-tole/index.html. Elle est servie par un petit serveur Node statique, qui gère les requêtes partielles pour la vidéo et qui a été arrêté à la fin du test. La version testée a 12 sections.
- **Navigateur** : Google Chrome piloté par Playwright 1.65. Tailles testées : 1440 × 900, 1280 × 800, 1280 × 720, 768 × 1024, 375 × 812, 375 × 667 et 360 × 740, en mouvement normal puis réduit.
- **Regard indépendant : les rapports du relecteur n'ont pas été lus.** J'ai lu `brief.md`, mes plans des tours 1 et 2 (`refonte-tour-1.md`, `refonte-tour-2.md`), la section « Tour 2 de la refonte (77/100) : corrections » de `NOTES.md` et son § 5 (crédits), ainsi que les règles du plugin : `conventions.md` § 11, `niveau-agence.md` § 6, `boucle-persona.md` et `agents/client-persona.md`.
- **Captures** : `boucle-persona/refonte-tour-3-captures/`. Les noms ci-dessous sont relatifs à ce dossier : 108 captures.
- **Seuil** : 85 / 100 (maquette aux médias provisoires) et verdict « Oui ».

Je parle en Hugo Besset. Le brief me présente comme le programmateur, aux côtés de Nadia Ferrand qui signe le devis. Ici, je parle pour la direction du festival, celle qui paie ce site 25 000 €. Pour le parcours d'achat, je parle en Yanis, 24 ans, qui vient de Lyon avec quatre amis et achète sur son téléphone.

---

## Partie 1 : les FIX du tour 2, un par un

| FIX | Verdict | Ce que j'ai vérifié |
|---|---|---|
| FIX-13 Ô coupé du pied (bloquant) | **Fait** | Le chapeau du grand « TÔLE » est entier, sur l'encre et sous le filet blanc, à toutes les tailles : `pied-marque-1440.png`, `-1280.png`, `-768.png`, `-375.png`, `-360.png` et `-1440-reduit.png`, en ×2. Le haut de la boîte est à 42 px sous le filet à toutes les tailles, et l'accent garde de l'air. Le plafond de la mise en page est levé |
| FIX-14 « deux siècles » contre 1864 | **Fait** | « Pendant plus d'un siècle, ces halles ont fabriqué des fusils. » Avec une charpente de 1864, c'est juste (`bureau-01-manifeste.png`, `bureau-02-programme.png`) |
| FIX-15 photos et légendes à contresens | **Fait** | Furnace Club montre trois silhouettes penchées sur leurs machines, dans un cadre de néons : c'est enfin un plateau électro (`bureau-05-artistes.png`). L'article du tram montre un tram (`bureau-11-journal.png`). « Balances de 17 h en halle B. » (`bureau-07-equipe.png`). La halle B a sa photo de groupe sur scène, et les trois halles ont la même hauteur (`bureau-06-lieu.png`) |
| FIX-16 mains levées, pluie dehors | **À moitié** | Les deux images générées sont en place. `public-3` (billetterie) se lit : sous la charpente, un garçon scanne le bracelet d'un festivalier devant une file (`bureau-09-pass.png`, `mobile-parcours-05-panier.png`). Mais le texte alternatif annonce « deux bénévoles en gilet », et on n'en voit qu'un, sans gilet. `public-2` (« la pluie dehors ») déçoit : à l'écran, les gouttes sur la verrière se lisent comme des paillettes ou du grain, pas comme de la pluie. La moitié basse de l'image est **encore une forêt de mains levées** (`bureau-08-public.png`). Sur téléphone, le recadrage 3:2 ne garde que le toit pailleté (`mobile-09-public.png`). La preuve « la pluie dehors » n'est toujours pas faite à l'œil |
| FIX-17 retour après 4 h 30 | **Fait (à confirmer par le client)** | « Après, Châteaucreux est à 25 minutes à pied : partez à 4 h 40 pour le premier TER vers Lyon, à 5 h 12. » Le calcul tient : 4 h 40 + 25 min = 5 h 05 (`bureau-10-pratique.png`). Reste un trou que seul le client peut combler : la halle C et Furnace Club jouent jusqu'à 5 h, donc qui reste jusqu'au bout rate ce TER |
| FIX-18 Les Rivets en halle B | **Fait** | Halle A, samedi à 21 h 50, dans le programme comme sur la fiche (`bureau-03-programme.png`, `bureau-04-artistes.png`) |
| FIX-19 clavier sur téléphone | **Fait** | 48 tabulations à 375, 375 en mouvement réduit, et 360 : 47 éléments atteints, tous entièrement à l'écran, aucun sous le bouton collant, contour visible partout (`clavier-375-tab-*.png`, `clavier-360-tab-*.png`). Au doigt, la galerie se cale à 16 px (`mobile-parcours-06-galerie.png`) |
| FIX-20 colonnes décalées | **Fait** | Les trois photos et les trois titres du programme et du journal sont à la même hauteur (`bureau-02-programme.png`, `bureau-03-programme.png`, `bureau-11-journal.png`). Les six fiches de la galerie ont la même taille et leurs noms sont alignés (`ecouter-souris-avant-1440.png`). Les légendes A, B et C du lieu sont alignées (`bureau-06-lieu.png`) |
| FIX-21 détails | **Fait** | « LE 15 AVRIL » tient sur une ligne (`bureau-12-final.png`). La FAQ s'appelle « Trois questions avant de payer ». Sur téléphone, la photo passe après le panier (`mobile-11-pass.png`, `mobile-parcours-05-panier.png`). « 41 concerts » est écrit partout |
| FIX-12 médias réels | Non (client) | Rien de plus n'est possible sans le client |

**Le défaut connu : « Prendre mon pass » du hero, sur téléphone.** Je l'ai cherché sérieusement, sur 91 essais, chacun sur une page rechargée :

| Essai | Résultat (haut du titre « Trois pass… » après 3,5 s) |
|---|---|
| 375 × 812, au doigt, 1,5 s, 3,5 s et 6 s après le chargement (18 essais) | **146 px, 18 fois sur 18** (`mobile-hero-ok-375.png`, `mobile-parcours-03-apres-hero.png`) |
| 360 × 740, au doigt, mêmes délais (18 essais) | 146 px, 18 fois sur 18 |
| 375, au doigt 0,8 s et 1,2 s après (8 essais), au doigt ou à la souris 3 s après (16 essais) | Bonne arrivée, 24 fois sur 24 |
| 1440, à la souris (12 essais) | 186 px, 12 fois sur 12 |
| Bouton collant, à 375 (3 essais) | 146 px, 3 fois sur 3 |
| 375, au doigt ou à la souris, **0,3 s** après le chargement (16 essais) | 2 fois la bonne arrivée, 1 fois à 458 px, **13 fois la page ne bouge pas** (`mobile-hero-tap-avant-apparition.png`) |

J'ai cherché la cause avec un journal des événements de la page. À 0,3 s, le bloc du bouton est **encore à opacité 0** : l'entrée du hero (`data-intro`, `gestes.js` ligne 321) le fait apparaître à partir de 0,35 s. Aucun clic n'arrive à la page (aucun événement `click` relevé), donc on « tape » un bouton qu'on ne voit pas encore. Dès que le bouton est visible (0,8 s, opacité 0,8 à 0,95), l'arrivée est juste dans 100 % des cas. **Je ne reproduis pas les arrivées à 384 px ou à −620 px du tour 2.** Les rafraîchissements de ScrollTrigger tombent tous à 0,5–0,6 s, avant le moindre clic possible. **Poids : léger.** Un vrai visiteur ne tape pas un bouton invisible. À revérifier une fois sur un vrai téléphone, au réseau lent, sans plus.

Bilan : sept FIX faits, un à moitié (FIX-16), un qui attend le client, et le défaut connu n'en est pas un en usage réel. Le travail est sérieux, et c'est la meilleure version des trois tours.

---

## Partie 2 : rapport de test

### 1. Les 5 premières secondes

**Ordinateur, 1440 × 900** (`00-premier-ecran-1440x900.png`). La vidéo de la halle tourne, avec la verrière et les faisceaux. On lit les quatre repères (02—04.07.2027, Saint-Étienne, 79 €, 4 h 30), puis « TROIS NUITS SOUS LA TÔLE. » sur toute la largeur, le chapo, et le bouton « PRENDRE MON PASS — 79 € » à 828–880 px. En cinq secondes, je sais quoi, où, quand, combien et comment je rentre. Le J−241 ne clignote pas.

**1280 × 800 et 1280 × 720** (`00-premier-ecran-1280x720.png`) : tout tient dans l'écran, et le bouton est à 600–652 px à 720.

**768** (`00-premier-ecran-768x1024.png`) : le titre tient sur deux lignes. Le bouton et « Voir le programme » se répondent.

**Téléphone** (`00-premier-ecran-375x812.png`, `-375x667.png`, `-360x740.png`) : les quatre repères en deux par deux, le titre sur deux lignes, le prix et le dernier tram sans défiler. Le bouton est à 692 px sur 812, et à 547 px sur 667 : il reste dans le premier écran, même sur un petit téléphone.

### 2. Le défilement complet

**1440, lent** : 13 captures, de `bureau-01-manifeste.png` à `bureau-13-pied.png`.

- **Manifeste** (`bureau-01`) : les mots passent du gris à l'encre au fil du défilement. La signature marche. La halle B vide est l'image la plus juste de la page.
- **Programme** (`bureau-02`, `bureau-03`) : trois colonnes alignées, douze concerts, des heures en chiffres de mono, la halle en bout de ligne. La bande des noms défile avec son bouton pause.
- **Artistes** (`bureau-04`, `bureau-05`) : la galerie épinglée fait son chemin et finit sur Furnace Club, entier dans l'écran. Les photos sont toutes de même taille. **Mais à la souris, « Écouter un extrait » rate deux clics sur trois** (voir § 3 et FIX-22).
- **Le lieu** (`bureau-06`, `lieu-compteurs-fin-1440.png`) : les compteurs finissent sur « 4 200 » et « 12 000 ». Les trois halles en photo, alignées, restent mon bloc préféré.
- **Équipe** (`bureau-07-equipe.png`) : titre fort, chapo net, et une légende qui ne ment plus.
- **Public** (`bureau-08-public.png`) : deux photos, puis trois avis nommés. La verrière « sous la pluie » ne se lit pas comme de la pluie (FIX-24).
- **Pass** (`bureau-09-pass.png`) : deux colonnes, des prix énormes, le trois nuits en minium, « la troisième nuit revient à 15 € » (79 − 2 × 32). La photo de l'entrée est à sa place sous les garanties.
- **Pratique** (`bureau-10-pratique.png`) : tram de nuit, accès, retour, accessibilité, pluie. Les quatre réponses de Yanis tiennent dans un écran.
- **Journal** (`bureau-11-journal.png`) : trois cartes datées et alignées, et l'article du tram montre enfin un tram. La carte « 180 bénévoles recherchés » montre encore un dôme de projecteurs, alors que la page a désormais une photo de bénévoles (FIX-25).
- **FAQ et appel final** (`bureau-12-final.png`) : « LA SUITE DE L'AFFICHE, / LE 15 AVRIL » tient. Le formulaire est en deux colonnes.
- **Pied de page** (`bureau-13-pied.png`, `pied-marque-*.png`) : le TÔLE de 300 px est entier. C'est la dernière image que voit Yanis, et elle est juste.

**1440, rapide** (`bureau-rapide-1.png` à `-4.png`) : rien ne saute, rien ne clignote, l'action n'est jamais cachée.

**375** : 19 captures, de `mobile-01-manifeste.png` à `mobile-19-fin.png`. Aucun débordement horizontal. Le bouton collant ne cache jamais une action, et il se retire sur la billetterie, l'appel final et le pied. La billetterie se lit dans l'ordre : titre, garanties, prix, panier, puis la photo (`mobile-10-pass.png`, `mobile-11-pass.png`). Un détail dans le pied : « YouTube » passe à la ligne avec un retrait de 12 px, hérité de la marge entre les liens (`mobile-17-pied.png`, FIX-26).

### 3. Le parcours de l'acheteur (Yanis)

| Étape | Ce que j'ai fait | Ce que j'ai vu |
|---|---|---|
| 1 | Clic sur « Prendre mon pass — 79 € » dans le hero, à 1440 | Billetterie, titre à 186 px (`parcours-01-apres-clic-hero-1440.png`) |
| 2 | Pass une nuit, « Samedi 3 », « Ajouter au panier » | Barre « Pass une nuit (samedi) ajouté · Panier 32 € » (`parcours-02-une-nuit-samedi-1440.png`) |
| 3 | Le groupe : 4 pass trois nuits, plus 3 réduits pour le dimanche | Lignes « 1 × Une nuit (samedi) 32 € », « 4 × Trois nuits 316 € », « 3 × Réduit (dimanche) 66 € ». Total **414 €**, bouton « Payer 414 € », barre à 786–876 px (`parcours-03-groupe-1440.png`) |
| 4 | « Voir le panier » | Titre du panier à 72 px (`parcours-04-voir-panier-1440.png`) |
| 5 | « Retirer » la ligne du samedi, puis « Payer » | 382 €, puis « Exemple fictif : aucune billetterie derrière ce bouton. » (`parcours-05-payer-1440.png`) |
| 6 | Les cinq liens de la nav | Chaque section arrive à 72 px |
| 7 | FAQ : ouvrir la 1ʳᵉ question, puis la 3ᵉ | Accordéon exclusif, réponses d'une phrase (`parcours-06-faq-1440.png`) |
| 8 | Alerte : « yanis@ », puis « yanis.test@exemple.fr » | « Il manque une adresse e-mail valide. » avec `aria-invalid`, puis le message fictif (`parcours-07-alerte-erreur-1440.png`) |
| 9 | Bouton de l'appel final | Billetterie, titre à 186 px |
| 10 | « Pause vidéo », descente puis remontée | La vidéo reste en pause, et le bouton dit « Lire la vidéo » |
| 11 | **« Écouter un extrait » à la souris**, dans la galerie épinglée | **Clics perdus** : 26 sur 37 à 1440, 28 sur 42 à 1280 et 17 sur 28 à 768. Au clic, la galerie saute de 300 à 600 px et le bouton visé file sous la souris (`ecouter-souris-avant-1440.png`, puis `ecouter-souris-apres-1440.png` : j'ai cliqué sur l'extrait de Saïda K., la piste a glissé, rien n'est joué). Quand la fiche est déjà au centre, le clic passe (`ecouter-souris-reussi-1440.png`) |
| 12 | **Téléphone** : menu, puis « Venir » | Le menu s'ouvre (`aria-expanded` à true). « Venir » amène la section à 72 px et referme le menu (`mobile-parcours-01-menu.png`, `mobile-parcours-02-venir.png`) |
| 13 | Téléphone : hero, puis « Ajouter » sur le trois nuits | Billetterie bien posée (`mobile-parcours-03-apres-hero.png`). Barre « Pass trois nuits ajouté · Panier 79 € » à 710–800 px, bouton « AJOUTÉ ✓ » (`mobile-parcours-04-ajout.png`) |
| 14 | Téléphone : un réduit pour le samedi, « Voir le panier », « Payer » | « 1 × Trois nuits 79 € », « 1 × Réduit (samedi) 22 € », **101 €**, « Payer 101 € », puis le message fictif (`mobile-parcours-05-panier.png`) |

**Pourquoi l'extrait rate.** Le script de la page ramène la fiche au centre dès qu'un bouton de la galerie prend le focus : `index.html`, lignes 496 à 511, `focusin`, avec `lenis.scrollTo(y, { immediate: true })`. Chrome donne le focus à un bouton dès qu'on appuie sur la souris. La page saute donc entre l'appui et le relâchement, et le clic tombe ailleurs. C'est la correction clavier du tour 1, et elle n'est pas réservée au clavier. Au clavier, tout va bien (§ 4). Hugo le dirait ainsi : « La section s'appelle "à écouter avant juillet", et deux fois sur trois, le bouton "écouter" se dérobe sous la souris. »

**Les chiffres d'un bloc à l'autre.** Le prix de 79 € est le même partout : repère, nav, hero, chapo, bouton collant, billetterie, appel final. Les jauges s'additionnent (2 000 + 1 200 + 1 000 = 4 200), l'affiche aussi (12 + 29 = 41), et le panier aussi (32 + 316 + 66 = 414, puis 79 + 22 = 101). Les horaires collent entre le programme et les fiches, Les Rivets compris. Le tram à 4 h 30 et le TER à 5 h 12 disent la même chose dans la pratique, le journal, les avis et l'appel final. Je ne trouve aucune contradiction.

### 4. Le clavier : 48 tabulations depuis le haut, à 1440, 768, 375, 375 réduit et 360

- **1440** (`clavier-1440-tab-01.png`, `-10`, `-15`, `-20`, `-25`, `-30`, `-40`) : 47 éléments atteints, **47 sur 47 entièrement à l'écran**, avec un contour minium de 3 px. L'ordre est logique : évitement, logo, cinq liens, pass, hero (pass, programme, pause), pause de la bande, six extraits, choix du soir et trois « Ajouter », trois articles, trois questions, bouton final, e-mail, « Me prévenir », pied (sept liens, e-mail, trois réseaux, trois mentions), puis retour à l'évitement. Au clavier, chaque extrait est amené au centre (`clavier-1440-tab-15.png`).
- **768, 375, 375 réduit, 360** : 47 sur 47 à l'écran, aucun sous le bouton collant. Le FIX-19 est réglé.
- Remarque d'environnement : sur une capture à 375 (`clavier-375-tab-15.png`), IBM Plex Mono n'était pas encore chargée (repli en Courier). C'était pendant cinq tests en parallèle, et le défaut n'apparaît sur aucune autre capture. Je ne le compte pas, mais la page dépend de Google Fonts pour ses repères.

### 5. Le mouvement réduit

Testé à 1440 et à 375 (`00-premier-ecran-1440x900-reduit.png`, `00-premier-ecran-375x812-reduit.png`, `reduit-page-entiere-1440.png`, `reduit-page-entiere-375.png`, `pied-marque-1440-reduit.png`) :

- la vidéo n'est pas demandée (`currentSrc` vide) et l'affiche fixe reste ;
- aucun titre, paragraphe, image, élément de liste ou légende n'est caché ou à opacité nulle ;
- à 1440, les artistes passent en grille, et à 375, la galerie se glisse au doigt ;
- les compteurs affichent directement « 4 200 » et « 12 000 » ;
- la page reste complète : 791 mots à 1440, 780 à 375, 12 sections, aucun débordement.

### 6. L'œil du métier

Ce qui est juste :

- le lieu : halle B vide avec ses rails, halle A avec sa scène et ses murs de brique, une charpente de 1864 et « plus d'un siècle » de fusils ;
- les jauges, les heures en 24 h, la halle en bout de ligne ;
- la chaîne du retour : tram toutes les 15 min jusqu'à 4 h 30, puis la gare à pied, l'heure de départ et le premier TER ;
- le tarif réduit, la revente gratuite jusqu'au 1ᵉʳ juillet, le pass offert aux bénévoles, le mineur de 16 ans accompagné jusqu'à 1 h.

Le programmateur que je suis voit enfin Furnace Club en vrai plateau électro.

Ce que je relève encore :

1. **L'extrait qui se dérobe sous la souris** (§ 3). C'est le seul vrai défaut d'usage de la page.
2. **La « pluie dehors » ne se voit pas.** Sur `public-2`, les gouttes ressemblent à des paillettes, et le bas de l'image ajoute une rangée de mains levées. Je compte encore sept images de bras levés devant des projecteurs : `soir-ven`, `soir-sam`, `halle-toit`, `public-5`, `public-2`, `journal-1`, et la foule de la vidéo. C'est mieux qu'au tour 1, mais pas encore l'affiche d'usine que je veux.
3. **Un texte alternatif qui en dit plus que la photo** : « deux bénévoles en gilet » pour un seul garçon en t-shirt sombre (`index.html` ligne 228).
4. **Le journal « 180 bénévoles recherchés » est illustré par un dôme de projecteurs**, alors que la page a une photo d'entrée tenue par des bénévoles.
5. **Ceux qui restent jusqu'à 5 h** en halle C : la page ne leur dit pas comment rentrer à Lyon. La réponse appartient au client.
6. Photos 1 et 3 du journal : un dôme et une coupole, qui ne sont pas mes halles. La légende ne ment pas, mais c'est provisoire (client).

### 7. La densité (`/tmp/claude-501/compte-pane.js`, dans la page, Chrome, 3,5 s d'attente, images chargées)

| Mode | Mots | Sections | Écrans |
|---|---|---|---|
| 1440 × 900, mouvement normal | **793** | **12** | **13,8** |
| 1440 × 900, mouvement réduit | 791 | 12 | 13,7 |
| 1280 × 800 | 793 | 12 | 14,4 |
| 1280 × 720 | 793 | 12 | 15,4 |
| 768 × 1024 | 788 | 12 | 12,2 |
| 375 × 812, mouvement normal | 782 | 12 | 17,2 |
| 375 × 812, mouvement réduit | 780 | 12 | 17,5 |
| 375 × 667 | 782 | 12 | 20,7 |
| 360 × 740 | 782 | 12 | 18,6 |

Détail à 1440 : évitement 3, en-tête 11, hero 57, manifeste 48, programme 82, artistes 100, lieu 48, équipe 37, public 48, pass 93, pratique 84, journal 63, FAQ 53, final 32, pied 34.

Tout est dans la fourchette : 500 à 800 mots, 10 à 13 sections, 12 à 18 écrans à 1440. Le chiffre de 20,7 écrans à 375 × 667 n'est pas compté : la règle se mesure à 1440 × 900. Aucun bloc ne dépasse trois phrases, puisque le manifeste et la garantie finale en ont exactement trois. Toutes les sections ont un visuel, sauf la FAQ et l'appel final, comme le permet la règle. **Attention : il ne reste que 7 mots de marge sous 800.** Chaque correction de texte doit se faire à nombre de mots constant.

### 8. La console et le réseau

À toutes les tailles et dans tous les modes, je n'ai relevé aucune erreur, aucun avertissement, aucune requête échouée et aucune réponse 4xx ou 5xx. Aucune image n'est cassée et aucun texte ne passe sous 12 px. Il n'y a de débordement horizontal à aucune taille (`scrollWidth` égal à la largeur de la fenêtre).

### Responsive : les titres aux 5 tailles

Aucun titre n'est cassé, coupé ou aux lettres collées, et aucune ligne ne touche la suivante. Je l'ai vérifié sur TÔLE dans le hero et le pied, ANNONCÉS, ÉCOUTER, BÉNÉVOLES, RALLUME et les titres de trois lignes sur téléphone. **Le grand « TÔLE » du pied est entier à 1440, 1280, 768, 375 et 360.**

---

## Partie 3 : la note

### Les 10 points (`agents/client-persona.md`)

| # | Point | Verdict | Capture | Pourquoi |
|---|---|---|---|---|
| 1 | Page complète | OK | `reduit-page-entiere-1440.png` | 793 mots, 12 sections, 13,8 écrans, aucun bloc de plus de 3 phrases. Toutes les sections attendues sont là |
| 2 | Catalogue, articles | OK | `parcours-03-groupe-1440.png`, `bureau-11-journal.png` | Trois pass avec prix, choix du soir, panier, retrait et total ; trois articles datés, tirés de `TOLE` |
| 3 | Titres et promesse | OK | `00-premier-ecran-1440x900.png` | « Trois nuits sous la tôle. » ; chaque titre de section porte un fait |
| 4 | Typographie d'affichage | OK | `bureau-03-programme.png`, `mobile-05-artistes.png` | Interlettrage positif, aucune lettre collée, lignes séparées |
| 5 | Barre de navigation | OK | `mobile-parcours-01-menu.png` | Logo, 5 liens, un bouton, aucun téléphone, menu propre |
| 6 | Blocs d'action, formulaires | OK | `bureau-09-pass.png`, `bureau-12-final.png` | Deux colonnes sur ordinateur, retour visible à l'ajout, formulaire en deux colonnes |
| 7 | Hero équilibré | OK | `00-premier-ecran-1280x720.png` | La vidéo remplit le milieu ; repères, titre et action se répondent |
| 8 | Responsive | **OK** | `pied-marque-1440.png`, `pied-marque-1280.png` | Le Ô du pied est réparé ; aucun titre cassé aux 5 tailles |
| 9 | Images et vidéos | OK, avec réserve | `bureau-08-public.png` | Des photos dans 10 sections sur 12, plus la vidéo. La « pluie dehors » ne se lit pas, et il reste beaucoup de mains levées |
| 10 | 3D produit | Sans objet | | Pas d'objet 3D pour un festival |

### Grille sur 100 (`niveau-agence.md` § 6)

| Critère | Points | Note | Pourquoi |
|---|---|---|---|
| Direction artistique | 15 | **13** | L'affiche Tôle se reconnaît sans le logo : encre, papier, minium, Archivo étroit, filets de grille, trichromie partout, y compris sur les deux nouvelles images. Je retire 2 points pour la série de mains levées devant des projecteurs, que `public-2` vient encore allonger |
| Images | 15 | **12** | Une vidéo d'usine, la halle vide, la halle A, Furnace Club en vrai plateau, le tram dans l'article du tram, l'entrée tenue par les bénévoles. Je retire des points parce que la pluie de `public-2` ne se lit pas et que le journal des bénévoles montre un dôme de projecteurs. 12 à 13 est le plafond des médias provisoires |
| Mise en page | 15 | **14** | Plafond levé (FIX-13). La composition brutaliste est suivie : grille de quatre colonnes visible, colonnes alignées partout (FIX-20), ruptures franches encre, papier et minium, galerie épinglée qui fait son chemin, pied monumental. Je retire 1 point pour des détails : le retrait de « YouTube » dans le pied à 375 et 360, et la colonne pratique où la photo du tram reste petite à 1440 |
| Mouvement | 10 | **8** | Vidéo avec pause, manifeste lu mot à mot, galerie épinglée, compteurs, bande avec pause, barre d'ajout ; le mouvement réduit est complet. Je retire 2 points parce que **la galerie fait sauter la page au clic de souris, et que l'extrait rate 2 clics sur 3** à 1440, 1280 et 768 |
| Clarté en 5 s et action | 10 | **10** | Le premier écran est parfait à 7 tailles. Le bouton du hero pose la billetterie juste dans 100 % des essais où il est visible (72 sur 72). La billetterie se lit dans l'ordre sur téléphone, et l'ajout répond sous le doigt |
| Densité | 5 | **5** | 793 mots, 12 sections, 13,8 écrans, comptage fourni, aucun bloc de plus de 3 phrases |
| Preuves et objections | 10 | **8** | Les cinq objections de Yanis ont leur réponse, chiffrée et sans contradiction : prix et troisième nuit à 15 €, retour heure par heure, halles couvertes et vestiaire, 29 noms le 15 avril, fauteuil et réduit. Plafond de 8 sans vraies preuves. Le retour après 5 h reste au client |
| Textes | 10 | **9** | Titres forts, voix sèche et faite de données, sans adjectif de festival, légendes enfin honnêtes. Je retire 1 point pour le texte alternatif de `public-3` (« deux bénévoles en gilet », que la photo ne montre pas) et pour la carte « 180 bénévoles » illustrée par des projecteurs |
| Mobile et accessibilité | 10 | **9** | Aucun débordement aux 7 tailles, 47 tabulations sur 47 visibles à 5 réglages, rien sous le bouton collant, cibles de 44 à 52 px, console vide, vidéo non chargée en mouvement réduit. Je retire 1 point pour le clic perdu à 768 (tablette avec souris ou pavé tactile) et le retrait du pied sur téléphone |
| **Sous-total** | 100 | **88** | |
| Pénalités | | **0** | Densité dans la fourchette, aucun bloc de plus de 3 phrases |
| **Total** | | **88 / 100** | |

**Note sur 10 : 8,8.** C'était 6,6 au tour 1 et 7,7 au tour 2.

**Seuil applicable : 85 / 100** (maquette aux médias provisoires). **Il est atteint.**

**Ce qui est atteignable sans le vrai client : 90 à 91.** FIX-22, une ligne de JavaScript, rend 2 points au Mouvement et 1 au Mobile. FIX-25 et la partie gratuite de FIX-24 rendent 1 point aux Textes. Une nouvelle `public-2` générée, où la pluie se voit et sans mains levées (≈ 0,06 $), rend 1 point à la Direction artistique. Pour passer nettement 90, il faut le client : photos de presse des artistes, vrais avis de 2026, vraies photos des halles, de l'équipe et des bénévoles, et la règle du retour après 5 h.

> « Trois tours, et je reconnais enfin mon festival : l'usine, le minium, le prix, le tram de 4 h 30, et mon nom entier en bas de page. Yanis remplit son panier en trente secondes sur son téléphone, et il sait comment rentrer. Il me reste deux choses à demander. Réparez le bouton "Écouter", qui fuit sous la souris : c'est une ligne. Et montrez-moi de la vraie pluie sur la verrière, pas des paillettes. Mais je signe. »

Verdict : Oui, ça vaut mes 25 000 €

---

## Partie 4 : plan de corrections (ce qui reste)

| FIX | Gravité | Coût | Résumé |
|---|---|---|---|
| FIX-22 | majeur | **0 $** | « Écouter un extrait » rate 2 clics sur 3 à la souris : la galerie saute au focus de la souris (1440, 1280, 768) |
| FIX-24 | moyen | **0 $** + **génération** ≈ 0,06 $ | `public-2` : la pluie ne se lit pas et les mains levées sont revenues ; texte alternatif de `public-3` trop affirmatif |
| FIX-25 | léger | **0 $** | Carte du journal « 180 bénévoles recherchés » illustrée par un dôme de projecteurs |
| FIX-26 | léger | **0 $** | Pied à 375 et 360 : « YouTube » passe à la ligne avec un retrait de 12 px |
| FIX-23 | léger | **0 $** (vérification) | Bouton du hero tapé avant d'être visible (< 0,4 s) : la page ne bouge pas. Non reproduit dès que le bouton apparaît |
| FIX-17 | moyen | **client** | Le retour pour ceux qui restent jusqu'à 5 h (halle C), et la confirmation de « 4 h 40 » et « TER de 5 h 12 » |
| FIX-12 | léger | **client** | Photos de presse des artistes, vrais avis de 2026, photos réelles des halles, de l'équipe et des bénévoles |

Le budget de mots est de 793 sur 800 à 1440 : toute correction de texte se fait à nombre de mots constant.

### FIX-22 : l'extrait qui se dérobe sous la souris (majeur)

- **Quoi** : dans la galerie épinglée, cliquer à la souris sur « Écouter un extrait » d'une fiche qui n'est pas au centre fait sauter la page de 300 à 600 px avant le relâchement. Le clic se perd : 26 sur 37 à 1440, 28 sur 42 à 1280 et 17 sur 28 à 768 (`ecouter-souris-avant-1440.png`, `ecouter-souris-apres-1440.png`). Chrome donne le focus au bouton dès l'appui, et le gestionnaire `focusin` ramène la fiche au centre tout de suite (`immediate: true`). C'était pensé pour le clavier (FIX-9 du tour 1), mais rien ne le réserve au clavier.
- **Où** : `index.html`, lignes 496 à 511 (`secA.addEventListener("focusin", …)`).
- **Comment** : en première ligne du gestionnaire, ajouter `if (!e.target.matches(":focus-visible")) return;`. Une souris ne déclenche pas `:focus-visible` sur un bouton, alors que le clavier, si. Vérifier ensuite que les 6 extraits répondent au premier clic à 1440, 1280 et 768, quelle que soit la position de la galerie. Vérifier aussi que les tabulations 13 à 18 ramènent toujours chaque fiche au centre, puis refaire `ecouter-souris-*.png`.

### FIX-24 : la pluie qui ne se voit pas (moyen)

- **Quoi** : sur `images/public-2.webp`, les gouttes sur la verrière se lisent comme des paillettes à la taille d'affichage. La moitié basse de l'image ajoute une rangée de mains levées, ce qui fait sept images de bras levés. Sur téléphone, le recadrage 3:2 (`object-position: 50% 30%`) ne garde que le toit (`mobile-09-public.png`). Par ailleurs, le texte alternatif de `public-3` annonce « deux bénévoles en gilet », alors qu'on voit un seul garçon en t-shirt sombre.
- **Où** : `index.html` ligne 207 (`public-2`) et ligne 228 (texte alternatif de `public-3`) ; `tole.src.css` ligne 246 (`.mosaique .m2`).
- **Comment** :
  - à 0 $, réécrire le texte alternatif de `public-3` tel qu'on le voit : « À l'entrée, sous la charpente, un bénévole scanne le bracelet d'un festivalier ; la file attend derrière. » Le texte alternatif n'est pas compté dans les mots visibles.
  - en **génération** (≈ 0,06 $, FLUX.2 Pro, même trichromie), refaire `public-2` avec la consigne : « heavy rain streaks and running water clearly visible on the outer glass, backlit by stage light; crowd seen from behind at shoulder height, no raised hands; dry interior ». Le cadrage doit tenir en 4:5 sur ordinateur et en 3:2 sur téléphone : la verrière mouillée dans le tiers haut, les têtes dans le tiers bas. Ajouter le prompt à `medias-a-generer.md`.

### FIX-25 : la carte des bénévoles (léger)

- **Quoi** : l'article « 180 bénévoles recherchés » est illustré par un dôme de projecteurs (`images/journal-3.webp`, `bureau-11-journal.png`), alors que la page a désormais une photo de bénévoles à l'entrée.
- **Où** : `index.html` ligne 375 (`TOLE.journal[2]`).
- **Comment** : faire un recadrage 3:2 de `public-3`, sans génération (`crop=800:533:0:330` sur `public-3.webp`, 800 × 1000, `cwebp -q 74`) : `images/journal-benevoles.webp`. Écrire le texte alternatif tel qu'on le voit. Le tram sert déjà deux fois dans deux cadrages : c'est le même principe.

### FIX-26 : le retrait de « YouTube » (léger)

- **Quoi** : à 375 et 360, les trois réseaux passent sur deux lignes, et « YouTube » garde la marge gauche de 12 px qui le sépare de « TikTok » (`mobile-17-pied.png`).
- **Où** : `tole.src.css` ligne 372 (`.pied-reseaux a + a { margin-left: .75rem; }`), puis recompiler `tole.css`.
- **Comment** : `.pied-reseaux { display: flex; flex-wrap: wrap; gap: .5rem .75rem; }`, et retirer la règle `a + a`.

### FIX-23 : le bouton du hero tapé trop tôt (léger, à vérifier)

- **Quoi** : 0,3 s après le chargement, le bloc du bouton est encore à opacité 0, parce que l'entrée `data-intro` commence à 0,35 s. Un tap à cet instant ne produit aucun clic, et la page ne bouge pas : 13 fois sur 16 (`mobile-hero-tap-avant-apparition.png`). Dès que le bouton est visible, c'est juste à 100 % : 72 essais sur 72 à 375, 360 et 1440, au doigt comme à la souris, plus 3 sur 3 pour le bouton collant. Les arrivées à 384 px et à −620 px notées au tour 2 ne se reproduisent pas.
- **Où** : `gestes.js` ligne 321 (`gsap.from(intro, { … delay: 0.35 })`, kit, à ne pas modifier ici).
- **Comment** : rien à corriger dans la page. Il reste une vérification sur un vrai téléphone, au réseau lent (4G bridée). Si un tap visible se perd, noter dans « Retours sur le plugin » que l'entrée du hero pourrait laisser le bouton d'action cliquable et visible dès le départ (`data-intro` sans opacité pour les boutons).

### FIX-17 : rentrer après 5 h (client)

La halle C et Furnace Club jouent jusqu'à 5 h, mais le TER de 5 h 12 impose de partir à 4 h 40. Il faut la vraie règle du client : navette, tram prolongé ou TER suivant. Il faut aussi la confirmation des horaires écrits (« partez à 4 h 40 », « TER de 5 h 12 »). À noter dans « Ce qui manque encore ».

### FIX-12 : médias réels (client)

Il faut les photos de presse des six artistes (Les Rivets, un groupe, est montré par une seule chanteuse), les vrais avis signés de 2026, et les photos réelles des halles, de l'équipe et des bénévoles. C'est ce qui sépare 90–91 d'un 90 net à la construction.
