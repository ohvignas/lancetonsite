# Les compositions de page

Une composition, c'est la **structure et la mise en scène** d'une page : la forme du
hero, l'enchaînement des sections, le moment qui marque. Pas une palette : les couleurs
viennent de la charte, le langage d'interface du style choisi à l'étape 7 (maquette). Quelle que soit
la composition, son hero remplit les cinq briques de `niveau-agence.md` § 2 ter (source
unique) : une fiche qui dit « aucun épinglage » parle de la suite de la page, pas du hero. Voici huit
compositions radicalement différentes. Ce fichier est lu par `maquette` (le choix et le dessin), `design-system` (qui le reprend),
`architecture` (le zoning), `construire` et l'agent `relecteur`.

Le kit de maquette (`skills/maquette/templates/prototype/`) fournit les **gestes**
(`GESTES.md`), **pas la structure** : son `index.html` est une démonstration de gestes,
pas un gabarit à remplir.

Les sections attendues d'une page d'accueil complète et la fourchette de texte (10 à 13
sections, 500 à 800 mots) sont dans `conventions.md` § 11. Chaque composition les met
en scène à sa façon : la fiche donne une cible de mots plus précise, toujours dans
cette fourchette, et dit comment elle montre le catalogue ou les articles. Une
composition change la forme d'une section, jamais son absence.

## La règle du choix

1. La composition se choisit au début de la maquette (étape 7), **avec le style d'interface**, à partir de la
   cible (`01-cadrage.md`) et de la plateforme de marque (`02-marque.md` :
   positionnement, curseurs de voix). **Jamais par défaut.**
2. On montre **deux** compositions, chacune avec son schéma : la première de la table
   ci-dessous (celle qui sert la cible), la seconde en contraste. Claude retient la
   recommandée (la première, sauf raison de marque) ; l'utilisateur en change par
   « Modifier » à la porte de validation (`parcours.md` § 1, règles de travail).
3. **Deux projets successifs ne prennent jamais la même.** La composition retenue est
   notée dans `00-etat.md` (ligne « Composition »). Avant de proposer, chercher celle du
   projet précédent dans les autres `00-etat.md` à côté du projet
   (`find .. -maxdepth 3 -name 00-etat.md`). Si c'est la première de la ligne, proposer
   la seconde et une autre composition compatible. Rien trouvé : noter « précédente :
   inconnue », sans poser de question.
4. **Le gabarit interdit.** « Pastille au-dessus du titre + grand titre calé à gauche sur
   une photo plein cadre + 2 boutons + ligne de réassurance, puis 3 cartes » n'est
   jamais une structure par défaut. Aucune des huit compositions ne le prend tel quel.
   Une page qui y revient est reprise (relecteur : **majeur**).
5. Le zoning (`04-architecture.md`) fixe les blocs et leur ordre, d'après le parcours
   du persona. La composition fixe leur mise en scène : elle peut fusionner deux blocs
   ou changer leur forme, jamais retirer une section attendue ni sortir de la fourchette
   de 10 à 13 sections (`conventions.md` § 11), sauf écart justifié et noté (`maquette` § 2).
6. Les autres pages gardent la composition de l'accueil, en plus calme (même famille de
   hero, même rythme). Les pages de détail (FAQ, tarifs, caractéristiques) restent
   lisibles d'abord : liste, tableau, questions.

## Quelle composition pour quelle cible

La première est celle par défaut ; la seconde sert de contraste à montrer.

| Cible | Par défaut | En contraste |
|---|---|---|
| B2B industriel | Produit centré | Immersif plein écran |
| B2B logiciel | Interface en démonstration | Typographique brutaliste |
| B2C produit physique premium | Produit centré | Éditorial magazine |
| B2C abonnement | Récit horizontal | Interface en démonstration |
| Artisan ou créateur | Artisanal ou carnet | Galerie ou portfolio |
| Restaurant ou lieu | Immersif plein écran | Artisanal ou carnet |
| Service local | Galerie ou portfolio | Typographique brutaliste |
| Profession libérale | Éditorial magazine | Typographique brutaliste |
| Culture et événement | Typographique brutaliste | Récit horizontal |

La table est un point de départ : la plateforme de marque peut faire passer la seconde
devant (un artisan au positionnement très contemporain, un cabinet qui veut trancher).
Le dire en une phrase.

**Le sujet d'un exemple.** Un exemple du plugin (page de démonstration, exemple du kit,
projet de test) porte **toujours sur une activité connue de tous** : boulangerie, café,
fleuriste, garage, salle de sport, festival, hôtel, cabinet d'avocat, boutique de
vêtements. Jamais un métier trop niche, qu'il faut expliquer avant de juger la page.
On s'inspire des leaders réels du secteur (ce qu'ils font de mieux) et on fait mieux
qu'eux.

---

## 1. Immersif plein écran

**Principe.** La page est une suite d'écrans pleins, comme les plans d'un film. Une
image ou une vidéo par écran, une phrase posée dessus : on ne lit pas, on traverse.

| | |
|---|---|
| Cibles et métiers | restaurant, hôtel, lieu, domaine, tourisme, café ou spiritueux d'ambiance ; B2B industriel quand l'usine ou le geste impressionne |
| Hero | vidéo plein cadre en boucle, titre court posé en bas, un seul bouton ; ni pastille ni second bouton |
| Rythme | 10 à 13 écrans de 100 svh ; alternance plein cadre et respiration (une phrase sur fond uni) ; l'offre, l'équipe, les avis et la FAQ y passent aussi, en plein cadre ou posés sur l'image ; jamais deux blocs de texte de suite |
| Moment signature | la vidéo pilotée au défilement : le geste du métier avance quand on descend |
| Gestes du kit | `data-hero-pin` (carte → plein cadre), `data-video-scrub`, `data-grow`, `data-bg` / `data-fg`, `data-split="words"` + `data-split-scrub`, `data-parallax`, `data-sticky-cta` |
| Médias | 1 vidéo de hero (16:9 et 9:16), 1 vidéo courte pour le *scrub*, 8 à 12 photos plein cadre d'un même shooting (lieu, plats ou produits, équipe), une affiche par vidéo |
| Catalogue, articles | la carte, les chambres ou les produits en galerie horizontale de grandes photos, prix et bouton sur chaque fiche ; le journal en 3 cartes datées sur fond d'image |
| Budget de mots | 500 à 620 |

```
[█████████ VIDÉO PLEIN CADRE █████████]  titre en bas, un bouton
[        une phrase, fond uni          ]  respiration
[█████████ PHOTO PLEIN CADRE █████████]  la matière, le lieu
[██████ VIDÉO PILOTÉE ▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶]  signature : le geste avance
[███ LIEU ███]  [ 3 lignes : où, quand ]  la preuve
[████████ PLEIN CADRE + ACTION ███████]  appel final
```

**Ce qui la rate.** Le film de vacances : de belles images qui ne disent pas ce qu'on
vend, le drone et le titre en capitales espacées. Chaque écran porte une information
(un prix, une adresse, un horaire) et l'action reste à portée du pouce.

## 2. Produit centré (façon Apple)

**Principe.** L'objet seul, au centre, sur un fond uni. Il tourne, s'éclate en pièces
et se transforme pendant qu'on défile ; chaque état porte une phrase.

| | |
|---|---|
| Cibles et métiers | B2C produit physique premium (audio, vélo, montre, planche, cosmétique), B2B industriel (capteur, pièce, machine), objet connecté |
| Hero | l'objet seul, en grand, sur le fond de la charte ; le nom au-dessus, une ligne dessous, un bouton ; aucune photo d'ambiance |
| Rythme | sections centrées sur l'axe : objet → rotation → vue éclatée → 3 gros plans → une photo d'usage → prix → action |
| Moment signature | la vue éclatée épinglée : l'objet se défait en pièces annotées, puis se referme et **finit de face, logo visible** (`niveau-agence.md` § 2 bis) |
| Gestes du kit | `<model-viewer data-model-scroll>` + `data-model-pin` + `data-model-note` / `data-model-line`, `canvas[data-sequence]` dans `data-steps`, `data-grow`, `data-odometer`, `data-magnetic`, `data-bg` |
| Médias | un objet 3D (GLB à UV propres s'il porte une marque, `niveau-agence.md` § 2 bis) ou une séquence de 60 à 120 images (rotation, éclaté) ; 3 gros plans détourés ; 3 à 4 photos d'usage et de l'équipe |
| Catalogue, articles | la gamme en fiches centrées (modèle, déclinaisons, prix, ajout au panier), l'objet détouré sur chaque fiche ; les guides ou nouveautés en 3 cartes datées |
| Budget de mots | 520 à 650 |

```
                 NOM DU PRODUIT
                   ( objet )                hero : l'objet seul, un bouton
             ⟲    ( objet )    ⟲            il tourne au défilement
       note ·  [ ▢  ▢  ▢  ▢ ]  · note       signature : vue éclatée épinglée
     [ détail ]   [ détail ]   [ détail ]   3 gros plans, une ligne chacun
        [ photo d'usage ]   [ prix · action ]
```

**Ce qui la rate.** La page Apple singée : fond noir, objet qui flotte, titres « Pro.
Max. Ultra. » et texte en dégradé. Et l'objet 3D générique, sans marque. Fond de la
charte, objet marqué, phrases de métier.

## 3. Éditorial magazine

**Principe.** La page se lit comme un numéro de magazine : grandes photos, colonnes
asymétriques, serif énorme, un numéro et une rubrique. Des blocs courts, composés.

| | |
|---|---|
| Cibles et métiers | profession libérale (avocat, architecte, thérapeute), conseil, B2C premium qui a une histoire (domaine, maison, hôtel de caractère), édition |
| Hero | une couverture : titre serif sur deux lignes qui chevauche une grande photo verticale décalée ; un folio (numéro, saison, ville) qui porte une vraie information |
| Rythme | couverture → sommaire de 3 à 4 entrées → article (photo pleine page, colonne étroite) → portrait → citation géante → action ; colonnes jamais deux fois identiques |
| Moment signature | le sommaire : chaque entrée fait apparaître son image et mène à sa page |
| Gestes du kit | `data-follow-list="curseur"`, `data-image-reveal`, `data-split="lines"`, `data-parallax`, `data-grow`, `data-reveal-group` |
| Médias | 8 à 12 photos d'auteur aux formats variés (une verticale pleine page, une panoramique, deux détails), des portraits ; rien de détouré |
| Catalogue, articles | le journal en une de magazine : 3 articles datés, rubrique et photo, en colonnes inégales ; les offres ou chambres en sommaire illustré avec prix |
| Budget de mots | 600 à 780 |

```
N° 12 · AUTOMNE · MARSEILLE      rubrique
GRAND TITRE        [██████ PHOTO ███]       couverture, titre qui chevauche
SERIF ÉNORME       [██ VERTICALE ███]
— sommaire — 1 ·  2 ·  3 ·  4  ↗ [img]      signature : l'image suit la liste
[█████ PHOTO PLEINE PAGE █████] | 3 phrases  article en colonne étroite
« citation géante »     [portrait]  action
```

**Ce qui la rate.** Le « look éditorial IA » : fond crème, serif, accent terracotta et
petit libellé en capitales sur chaque bloc (`anti-patterns.md`). Et le folio décoratif
« 01 / 02 / 03 » : un numéro dit une date, une saison, un lieu, ou il disparaît.

## 4. Typographique brutaliste

**Principe.** Le texte est le visuel : des mots immenses, une grille visible (filets,
repères, coordonnées), peu ou pas de photo. La page se lit comme une affiche.

| | |
|---|---|
| Cibles et métiers | culture et événement (festival, théâtre, salle), studio de création, logiciel pour développeurs, profession libérale qui veut trancher, service local qui affiche son prix et son délai |
| Hero | une phrase de 3 à 6 mots sur toute la largeur de la grille (au plafond de 6 rem, graisse extrême), alignée sur ses filets ; c'est le hero texte seul justifié de `niveau-agence.md` § 2 |
| Rythme | blocs pleine largeur séparés par des filets ; alternance texte immense, liste dense en petit corps, une photo en aplat ou bichromie ; repères = vraies données (date, heure, prix) |
| Moment signature | le manifeste lu au défilement, mot par mot, en très grand ; ou le programme dont chaque ligne fait surgir son image |
| Gestes du kit | `data-split="words"` + `data-split-scrub`, `data-marquee` (bouton pause), `data-follow-list="curseur"`, `data-cursor` + `data-cursor-label`, `data-bg` / `data-fg` en aplats francs, `data-counter` |
| Médias | 6 à 10 photos traitées (bichromie, trame, grain), une par moment fort (artistes, lieu, public) ; une vidéo du lieu ou de l'ambiance pour un événement ; la typo de la charte en graisses extrêmes ; une texture de papier ou de trame si la charte la porte |
| Catalogue, articles | la billetterie en liste dense (date, nom, prix, « Réserver ») ; les actualités en lignes datées, chacune avec son image au survol |
| Budget de mots | 500 à 650 |

```
│ 12—14 JUIN │ MARSEILLE │ 3 SCÈNES       │  repères = vraies données
│ DES MOTS QUI REMPLISSENT LA LARGEUR     │  hero : la phrase est l'image
├────────────┼────────────┼───────────────┤
│ un mot · s'allume · en · lisant ·       │  signature : manifeste en scrub
│ 20:00 Nom ↗[img] │ 21:30 Nom │ 23:00 Nom │  programme, l'image suit
│ ██ APLAT ██ │ PRIX  │ ACTION ━━━━━━━━━━ │
```

**Ce qui la rate.** Le néo-brutalisme de Dribbble : ombres noires décalées, boutons
jaunes, éléments tournés de 2°. Et la grille visible qui ne sert à rien : chaque filet
aligne quelque chose, chaque repère est une donnée.

## 5. Récit horizontal

**Principe.** La page défile de côté, en chapitres : on descend, l'histoire avance vers
la droite. Chaque chapitre est un écran avec une image, un titre et une phrase.

| | |
|---|---|
| Cibles et métiers | B2C abonnement (un mois raconté), culture et événement (programme, parcours d'expo), tourisme (un itinéraire), fabrication racontée, marque qui a une histoire |
| Hero | un écran d'ouverture qui annonce le récit (« 4 chapitres ») avec sa frise ; le premier chapitre dépasse déjà à droite et invite à avancer |
| Rythme | ouverture verticale → récit horizontal en 4 à 6 chapitres (épinglé) → retour vertical pour la preuve, l'offre et l'action ; deux pistes horizontales au plus |
| Moment signature | le récit lui-même : frise de progression et fond qui change à chaque chapitre |
| Gestes du kit | `data-hscroll` (et l'événement `progression` pour la frise), `data-bg` / `data-fg`, `data-split="lines"`, `data-tilt`, `data-cursor` + `data-cursor-label="Glisser"`, `data-steps` pour un second temps, `data-odometer` pour l'offre |
| Médias | une image par chapitre (4 à 6, même shooting, cadrages variés), plus les photos de l'offre et de l'équipe ; une carte ou une frise en illustration générée soignée si le récit est un parcours (`medias`, « Plans et cartes ») |
| Catalogue, articles | les formules ou produits en fiches au retour vertical (prix, choix, action) ; le journal en cartes datées, une par chapitre récent |
| Budget de mots | 550 à 700 |

```
[ OUVERTURE · « 4 chapitres » ━━━━━○○○ ]   hero : la frise, le 1er chapitre dépasse
[ CH.1 ██ ] → [ CH.2 ██ ] → [ CH.3 ██ ] →   signature : on descend, ça avance
  une phrase    une phrase    une phrase    fond qui change par chapitre
━━━━━━━━━━━━━●━━━━━━━━━━━━━━━━━━━━━━━━━━━   progression
[ preuve ]  [ formule · prix ]               retour à la verticale
[ ACTION ]
```

**Ce qui la rate.** Le carrousel déguisé : des cartes qui glissent sans récit. Et la page
horizontale où l'on se perd : l'action revient à la verticale, et sur téléphone la piste
devient un glisser natif, un chapitre par écran.

## 6. Galerie ou portfolio

**Principe.** Les œuvres d'abord, le texte court. La page est un accrochage : des
images de tailles différentes, une légende courte, du vide.

| | |
|---|---|
| Cibles et métiers | photographe, architecte, designer, céramiste, studio ; service local qui montre ses chantiers (paysagiste, menuisier, rénovation, avant / après) ; galerie d'art |
| Hero | une œuvre ou un chantier plein écran, légende en petit (titre, lieu, année) ; le nom et le métier dans l'en-tête, pas de titre d'accroche |
| Rythme | mur d'images en grille irrégulière (une grande, deux moyennes, un détail) → un projet ouvert en grand → index des projets → portrait et méthode en 3 phrases → action |
| Moment signature | la vignette qui devient plein écran, ou l'index où chaque nom fait apparaître son image |
| Gestes du kit | `data-grow`, `data-image-reveal`, `data-cursor` + `data-cursor-label="Voir"`, `data-tilt` léger, `data-follow-list`, `data-hscroll` pour une série, `data-reveal-group` |
| Médias | les vraies réalisations d'abord (photos du client, étalonnées ensemble) ; génération seulement pour combler, marquée `provisoire` ; 12 à 20 images aux formats variés |
| Catalogue, articles | la boutique (tirages, pièces, prestations) en fiches avec prix et action ; les projets récents ou le journal en cartes datées |
| Budget de mots | 500 à 600 |

```
[█████████ ŒUVRE PLEIN ÉCRAN █████████]  légende : titre · lieu · année
[████ grande ████] [██ moy. ██]          mur irrégulier, du vide
                   [██ moy. ██] [▪]
[███ projet ouvert ↗ plein écran ████]   signature : la vignette grandit
Index — Projet A ↗[img] · B · C · D      la liste fait surgir l'image
[ portrait ] 3 phrases · ACTION
```

**Ce qui la rate.** La grille Pinterest de vignettes carrées toutes pareilles, avec un
zoom au survol. Et l'image générée présentée comme une réalisation : interdit en ligne
(`niveau-agence.md` § 2).

## 7. Interface en démonstration

**Principe.** Pour un logiciel ou un service numérique : le produit se manipule dans la
page. On touche l'interface (filtre, curseur, bouton) et on voit le résultat, au lieu
de lire une liste de fonctions.

| | |
|---|---|
| Cibles et métiers | B2B logiciel (SaaS, outil métier), application grand public, service numérique (réservation, simulateur, banque en ligne), abonnement avec choix de formule |
| Hero | l'interface en HTML, vivante, à côté d'un titre de 4 à 8 mots ; une donnée bouge déjà ; un seul bouton (« Essayer ») ; aucune capture figée dans un cadre de navigateur |
| Rythme | 3 démonstrations courtes, une par tâche du persona (avant → geste → après), une phrase chacune → preuve chiffrée → calculateur ou choix de formule → action |
| Moment signature | la démonstration épinglée : l'interface se remplit étape par étape au défilement, puis rend la main au visiteur |
| Gestes du kit | `data-steps` + `data-steps-reduit="dernier"` (fiche HTML), `data-live-jitter`, `data-live-rate`, `data-trace`, `data-odometer`, `data-counter`, `data-bar`, `data-magnetic` ; les contrôles manipulables s'écrivent pour le projet, hors kit, avec une seule source de données (`niveau-agence.md` § 4) |
| Médias | l'interface est l'image : écrans en HTML, jamais en image générée ; 3 à 4 photos d'usage réel et de l'équipe (le métier, pas l'écran) ; icônes de l'interface dessinées dans la charte |
| Catalogue, articles | les formules en grille de tarifs (prix, ce qui est compris, action) ; le blog ou les cas clients en 3 cartes datées |
| Budget de mots | 600 à 780 |

```
TITRE EN 6 MOTS     ┌─ interface vivante ─┐   hero : le produit tourne déjà
[ Essayer ]         │ ▁▃▅▇▅▃  2,14 ●      │
┌ avant ┐ → ┌ geste ┐ → ┌ après ┐            signature : démo épinglée
│ ░░░░░ │   │ ▣ ◀── │   │ ▇▇▇▇▇ │            une tâche, une phrase
[ preuve : 1 chiffre réel ]  [ curseur ◀━●━▶ = 1 240 € ]
[ ACTION ]                                    calculateur, puis action
```

**Ce qui la rate.** La landing SaaS : capture inclinée sur fond dégradé violet, bande de
logos, grille de 6 fonctions à icônes. Et la démo trop riche : trois tâches, trois
gestes, pas le produit entier.

## 8. Artisanal ou carnet

**Principe.** La page est un carnet d'atelier : matières, notes manuscrites, collages,
photos posées, croquis. On sent la main, l'outil et le lieu.

| | |
|---|---|
| Cibles et métiers | artisan (boulanger, ébéniste, maroquinier, céramiste), producteur et terroir, vigneron, créateur, commerce de quartier, restaurant de produit |
| Hero | une grande photo de matière ou d'atelier, une note manuscrite qui annote un détail ; le titre composé normalement, lisible |
| Rythme | pages de carnet qui alternent : collage (photo, croquis, note) → grande photo de matière → fabrication en étapes → origine (carte illustrée) → les personnes et le lieu → produits de saison → adresse et action |
| Moment signature | le collage en couches qui suit la souris, ou la fabrication racontée par une séquence d'images du geste |
| Gestes du kit | `data-depth-scene` + `data-depth`, `data-image-reveal`, `data-steps` + `canvas[data-sequence]`, `data-tilt` (photos posées), `data-follow-list` (produits de saison), `data-bg` / `data-fg` en couleurs de matière, `data-parallax` |
| Médias | photos de matière et de mains (même lumière), des personnes et du lieu, 3 à 5 objets détourés pour le collage, textures (papier, kraft, toile), annotations manuscrites en SVG, une carte en illustration générée soignée (`medias`, « Plans et cartes »), jamais un tracé SVG approximatif |
| Catalogue, articles | les produits de la semaine en fiches posées sur le carnet (photo, prix, « Réserver pour samedi » ou commande et retrait) ; le journal d'atelier en cartes datées |
| Budget de mots | 580 à 750 |

```
[███ PHOTO DE MATIÈRE ███]  ~ note à la main ↙   hero : la matière, annotée
   TITRE LISIBLE            [ Commander ]
[ photo ]  ✎ croquis  [ objet détouré ]          signature : collage en couches
[█ étape 1 █] [█ étape 2 █] [█ étape 3 █]        fabrication, séquence du geste
[ carte illustrée · parcelle ]  [ saison ]
[ adresse · horaires ]  ACTION
```

**Ce qui la rate.** Le « fait main » de banque : kraft et police manuscrite partout,
taches de café, ficelle. Une note manuscrite par écran au plus, et elle dit une vraie
chose : une date, un nom de parcelle, une température.

---

## Après le choix

- `00-etat.md`, ligne « Composition » : le nom retenu, et celui du projet précédent.
- `07-maquette/maquette.md` : la composition, pourquoi, et celle proposée en contraste
  (`DESIGN.md` § 2 la reprend à l'étape 8).
- La maquette (étape 7) suit la fiche : hero type, rythme, moment signature, gestes,
  médias, catalogue ou articles, budget. Les médias de la fiche absents du plan médias
  (`06-medias/medias.md`) y sont ajoutés et générés pendant la maquette, comme images
  manquantes.
- Le relecteur vérifie que la page suit sa fiche et ne revient pas au gabarit interdit.
