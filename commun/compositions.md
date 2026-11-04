# Les compositions de page

Une composition, c'est la **structure et la mise en scène** d'une page : la forme du
hero, l'enchaînement des sections, le moment qui marque. Pas une palette : les couleurs
viennent de la charte, le langage d'interface du style choisi à l'étape 6. Voici huit
compositions radicalement différentes. Ce fichier est lu par `design-system` (le choix),
`architecture` (le zoning), `maquette` (le dessin), `construire` et l'agent `relecteur`.

Le kit de maquette (`skills/maquette/templates/prototype/`) fournit les **gestes**
(`GESTES.md`), **pas la structure** : son `index.html` est une démonstration de gestes,
pas un gabarit à remplir.

Le budget de texte commun à toutes les compositions est dans `conventions.md` § 11.
Chaque fiche donne une cible plus précise, toujours sous ce plafond.

## La règle du choix

1. La composition se choisit à l'étape 6, **avec le style d'interface**, à partir de la
   cible (`01-cadrage.md`) et de la plateforme de marque (`02-marque.md` :
   positionnement, curseurs de voix). **Jamais par défaut.**
2. On propose **deux** compositions, chacune avec son schéma : la première de la table
   ci-dessous (celle qui sert la cible), la seconde en contraste. L'utilisateur choisit.
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
   ou changer leur forme, jamais dépasser 9 sections.
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

---

## 1. Immersif plein écran

**Principe.** La page est une suite d'écrans pleins, comme les plans d'un film. Une
image ou une vidéo par écran, une phrase posée dessus : on ne lit pas, on traverse.

| | |
|---|---|
| Cibles et métiers | restaurant, hôtel, lieu, domaine, tourisme, café ou spiritueux d'ambiance ; B2B industriel quand l'usine ou le geste impressionne |
| Hero | vidéo plein cadre en boucle, titre court posé en bas, un seul bouton ; ni pastille ni second bouton |
| Rythme | 7 à 8 écrans de 100 svh ; alternance plein cadre et respiration (une phrase sur fond uni) ; jamais deux blocs de texte de suite |
| Moment signature | la vidéo pilotée au défilement : le geste du métier avance quand on descend |
| Gestes du kit | `data-hero-pin` (carte → plein cadre), `data-video-scrub`, `data-grow`, `data-bg` / `data-fg`, `data-split="words"` + `data-split-scrub`, `data-parallax`, `data-sticky-cta` |
| Médias | 1 vidéo de hero (16:9 et 9:16), 1 vidéo courte pour le *scrub*, 5 à 6 photos plein cadre d'un même shooting, une affiche par vidéo |
| Budget de mots | 220 à 320 |

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
| Moment signature | la vue éclatée épinglée : l'objet se défait en pièces annotées, puis se referme |
| Gestes du kit | `<model-viewer data-model-scroll>` + `data-model-pin` + `data-model-note` / `data-model-line`, `canvas[data-sequence]` dans `data-steps`, `data-grow`, `data-odometer`, `data-magnetic`, `data-bg` |
| Médias | un objet 3D (GLB à UV propres s'il porte une marque, `niveau-agence.md` § 2 bis) ou une séquence de 60 à 120 images (rotation, éclaté) ; 3 gros plans détourés ; 1 photo d'usage |
| Budget de mots | 250 à 350 |

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
asymétriques, serif énorme, un numéro et une rubrique. Peu de texte, mais composé.

| | |
|---|---|
| Cibles et métiers | profession libérale (avocat, architecte, thérapeute), conseil, B2C premium qui a une histoire (domaine, maison, hôtel de caractère), édition |
| Hero | une couverture : titre serif sur deux lignes qui chevauche une grande photo verticale décalée ; un folio (numéro, saison, ville) qui porte une vraie information |
| Rythme | couverture → sommaire de 3 à 4 entrées → article (photo pleine page, colonne étroite) → portrait → citation géante → action ; colonnes jamais deux fois identiques |
| Moment signature | le sommaire : chaque entrée fait apparaître son image et mène à sa page |
| Gestes du kit | `data-follow-list="curseur"`, `data-image-reveal`, `data-split="lines"`, `data-parallax`, `data-grow`, `data-reveal-group` |
| Médias | 6 à 8 photos d'auteur aux formats variés (une verticale pleine page, une panoramique, deux détails), un portrait ; rien de détouré |
| Budget de mots | 320 à 390 |

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
| Cibles et métiers | culture et événement (festival, théâtre, salle), studio de création, logiciel pour développeurs, profession libérale qui veut trancher, service local qui affiche son prix et son numéro |
| Hero | une phrase de 3 à 6 mots sur toute la largeur de la grille (au plafond de 6 rem, graisse extrême), alignée sur ses filets ; c'est le hero texte seul justifié de `niveau-agence.md` § 2 |
| Rythme | blocs pleine largeur séparés par des filets ; alternance texte immense, liste dense en petit corps, une photo en aplat ou bichromie ; repères = vraies données (date, heure, prix) |
| Moment signature | le manifeste lu au défilement, mot par mot, en très grand ; ou le programme dont chaque ligne fait surgir son image |
| Gestes du kit | `data-split="words"` + `data-split-scrub`, `data-marquee` (bouton pause), `data-follow-list="curseur"`, `data-cursor` + `data-cursor-label`, `data-bg` / `data-fg` en aplats francs, `data-counter` |
| Médias | 0 à 4 photos traitées (bichromie, trame, grain) ; la typo de la charte en graisses extrêmes ; une texture de papier ou de trame si la charte la porte |
| Budget de mots | 180 à 300 |

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
| Médias | une image par chapitre (4 à 6, même shooting, cadrages variés) ; une carte ou une frise dessinée si le récit est un parcours |
| Budget de mots | 250 à 330 |

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

**Principe.** Les œuvres d'abord, le texte au minimum. La page est un accrochage : des
images de tailles différentes, une légende courte, du vide.

| | |
|---|---|
| Cibles et métiers | photographe, architecte, designer, céramiste, studio ; service local qui montre ses chantiers (paysagiste, menuisier, rénovation, avant / après) ; galerie d'art |
| Hero | une œuvre ou un chantier plein écran, légende en petit (titre, lieu, année) ; le nom et le métier dans l'en-tête, pas de titre d'accroche |
| Rythme | mur d'images en grille irrégulière (une grande, deux moyennes, un détail) → un projet ouvert en grand → index des projets → portrait et méthode en 3 phrases → action |
| Moment signature | la vignette qui devient plein écran, ou l'index où chaque nom fait apparaître son image |
| Gestes du kit | `data-grow`, `data-image-reveal`, `data-cursor` + `data-cursor-label="Voir"`, `data-tilt` léger, `data-follow-list`, `data-hscroll` pour une série, `data-reveal-group` |
| Médias | les vraies réalisations d'abord (photos du client, étalonnées ensemble) ; génération seulement pour combler, marquée `provisoire` ; 10 à 16 images aux formats variés |
| Budget de mots | 120 à 250 |

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
| Médias | l'interface est l'image : écrans en HTML, jamais en image générée ; 1 ou 2 photos d'usage réel (le métier, pas l'écran) ; icônes de l'interface dessinées dans la charte |
| Budget de mots | 280 à 380 |

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
| Rythme | pages de carnet qui alternent : collage (photo, croquis, note) → grande photo de matière → fabrication en étapes → origine (carte dessinée) → saison ou calendrier → adresse et action |
| Moment signature | le collage en couches qui suit la souris, ou la fabrication racontée par une séquence d'images du geste |
| Gestes du kit | `data-depth-scene` + `data-depth`, `data-image-reveal`, `data-steps` + `canvas[data-sequence]`, `data-tilt` (photos posées), `data-follow-list` (produits de saison), `data-bg` / `data-fg` en couleurs de matière, `data-parallax` |
| Médias | photos de matière et de mains (même lumière), 3 à 5 objets détourés pour le collage, textures (papier, kraft, toile), annotations manuscrites en SVG, une carte dessinée |
| Budget de mots | 260 à 360 |

```
[███ PHOTO DE MATIÈRE ███]  ~ note à la main ↙   hero : la matière, annotée
   TITRE LISIBLE            [ Commander ]
[ photo ]  ✎ croquis  [ objet détouré ]          signature : collage en couches
[█ étape 1 █] [█ étape 2 █] [█ étape 3 █]        fabrication, séquence du geste
[ carte dessinée · parcelle ]  [ saison ]
[ adresse · horaires ]  ACTION
```

**Ce qui la rate.** Le « fait main » de banque : kraft et police manuscrite partout,
taches de café, ficelle. Une note manuscrite par écran au plus, et elle dit une vraie
chose : une date, un nom de parcelle, une température.

---

## Après le choix

- `00-etat.md`, ligne « Composition » : le nom retenu, et celui du projet précédent.
- `DESIGN.md` § 2 : la composition, pourquoi, et celle proposée en contraste.
- La maquette (étape 8) suit la fiche : hero type, rythme, moment signature, gestes,
  médias, budget. Les médias de la fiche entrent dans la liste de l'étape 7.
- Le relecteur vérifie que la page suit sa fiche et ne revient pas au gabarit interdit.
