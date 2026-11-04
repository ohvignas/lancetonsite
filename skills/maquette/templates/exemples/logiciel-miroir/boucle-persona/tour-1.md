# Miroir — boucle persona, tour 1

- **Date** : 4 novembre 2026
- **Page testée** : http://127.0.0.1:4331/logiciel-miroir/index.html (prototype animé, médias provisoires)
- **Regard indépendant** : je n'ai pas lu les rapports du relecteur. J'ai lu `brief.md`, `NOTES.md`, les retours de l'utilisateur du 4 novembre, `boucle-persona.md`, `niveau-agence.md` § 6, `conventions.md` § 11.
- **Navigateur** : Chrome piloté par Playwright. Ordinateur 1440 × 900 et 1280 × 800, tablette 768 × 1024, téléphones 375 × 812 et 360 × 740 (tactile, écran ×2), clavier, `prefers-reduced-motion: reduce`.
- **Captures** : `boucle-persona/captures-tour-1/` (91 fichiers webp). Les chemins ci-dessous partent de ce dossier.
- **Dépense** : 0 $. Rien n'a été envoyé : le formulaire n'envoie rien.

Ce fichier regroupe les trois livrables demandés : le rapport de test (§ A), les notes (§ B) et le plan de corrections (§ C).

---

## A. Rapport de test

### Qui je suis

**Le patron.** Je suis Lucie Ferrand. J'ai tenu un salon onze ans à la Croix-Rousse avant de fonder Miroir avec Karim. Je paie cette page 25 000 € pour qu'une gérante qui est aujourd'hui sur une place de marché se dise en une minute : « c'est fait par quelqu'un du métier, c'est moins cher que ce que je perds, j'essaie ce soir ». Je déteste deux choses : les pages de start-up avec captures d'écran penchées, et toute erreur de salon qu'une coiffeuse repère en trois secondes.

**L'acheteuse.** Sandrine, gérante d'un salon de 4 personnes à Villeurbanne, **sur Planity aujourd'hui**. Son objection la plus forte : « Planity ne me prend pas de commission et m'envoie des clientes. Pourquoi je paierais autre chose ? »

### 1. Les 5 premières secondes

**Ordinateur, 1440** (`01-1440-hero-1s.webp`, `02-1440-hero-5s.webp`, `03-1440-hero-19s.webp`, `30-1280-hero.webp`)
- Ce qu'on vend : « Réservation en ligne · salons et instituts ». C'est clair tout de suite.
- La promesse : « Votre agenda se remplit pendant que vous coupez. » C'est une vraie phrase de salon, concrète, et elle me plaît.
- Le prix : « 0 % de commission · dès 29 € par mois », à côté du bouton. Il est là, sans astérisque.
- L'action : « Essayer 30 jours », bouton corail, bien visible.
- À droite, l'agenda du Salon Lumière s'anime : réservations en ligne, toasts, annulation, reprise par la liste d'attente. Le hero est équilibré à 1440 comme à 1280, sans trou au milieu.

**Téléphone, 375 et 360** (`30-375-hero.webp`, `30-360-hero.webp`) : le titre tient en 3 lignes à 37,6 px, rien ne se casse, le bouton et le prix tiennent dans l'écran et le haut de l'agenda dépasse en bas. C'est bon.

**Ce que la coiffeuse voit au bout de 10 secondes** (`02-1440-hero-5s.webp`, `03-1440-hero-19s.webp`). Avec Playwright, j'ai relevé l'agenda seconde par seconde :
- la ligne « maintenant » part de **13 h 52** ;
- vers 13 h 54, « Chloé a réservé en ligne », dans un créneau de **13 h**, donc déjà passé ;
- vers 13 h 59, « Jade » réserve en ligne à **13 h**, elle aussi dans le passé ;
- à **14 h 01**, toast : « Emma annule son balayage de 14 h ». Elle annule une minute après le début de son rendez-vous. Dans un salon, ça ne s'appelle pas une annulation, c'est un lapin ;
- à **14 h 05**, « Julie prend 14 h · SMS accepté en 6 min ». Julie prend un balayage qui a commencé il y a 5 minutes. Et entre l'annulation et la reprise, il ne s'est écoulé que 4 minutes, pas 6 ;
- la démo, plus bas, raconte la même histoire **à 9 h 01** (« Emma a annulé à 9 h 01 »), ce qui contredit le hero.

C'est la pièce maîtresse de la page, et une gérante y voit en dix secondes un agenda qui ne peut pas exister. Le patron que je suis ne le laisse pas passer. En mouvement réduit, l'état final est cohérent pour Julie (ligne à 13 h 52, `60-1440-reduit-hero.webp`), mais Jade et Chloé restent posées « en ligne » dans des créneaux passés.

**Le calendrier est faux.** L'en-tête de l'agenda dit « jeudi 6 novembre », et le téléphone de la démo propose « mer. 5 · jeu. 6 · ven. 7 ». En 2026, le 6 novembre est un **vendredi**, et la page est datée de novembre 2026 (articles, « tarifs relevés en novembre 2026 »). Une gérante a son planning de la semaine en tête.

### 2. Le défilement complet

**Défilement lent à 1440** (`10-1440-defile-01` à `08`) et **démo épinglée** (`20-1440-demo-1-2` à `6-97`) :
- **Preuve** : grande photo du salon, puis 1 240 salons, −68 %, 0 €, avec les compteurs. La mention « Chiffres et photo provisoires » est honnête.
- **Démo épinglée, le moment signature : elle marche.** Trois temps avec la barre de progression 1/3, 2/3, 3/3. À l'étape 2, l'écran passe de « SMS envoyé » (09:02, Emma barrée) à « Accepté ✓ » (09:08), puis « Créneau repris en 6 minutes · 95 € sauvés ». C'est le meilleur moment de la page : ça vend la liste d'attente mieux qu'un paragraphe. Les créneaux du téléphone se cliquent (« Jeudi 17 h 45 avec Tom », `41-1440-creneau-17h45.webp`).
- **Comparatif** : honnête, avec « Oui, c'est leur force » pour les places de marché, et ça me plaît. Mais voir le point « Acheteuse » plus bas.
- **Démarrer** : Ce soir, Demain, Samedi, chacun avec sa mini-interface. Le titre « En ligne en une soirée » est démenti par l'étape 2, « Demain · Votre page est en ligne ».
- **Témoignages** : trois grandes photos, une citation et un résultat chiffré, c'est bien rythmé (`10-1440-defile-04.webp`). Les photos sont commentées au point 6.
- **Équipe** : Lucie et Karim au comptoir, ciseaux dans la poche du tablier. C'est crédible et chaleureux.
- **Tarifs et calculateur** : trois cartes, « Le plus choisi », le calculateur entoure le forfait qui correspond à la taille de l'équipe.
- **Journal** : trois cartes datées (28 octobre, 14 octobre, 30 septembre 2026), avec rubrique et photo, construites à partir de `ARTICLES` et prêtes pour un CMS.
- **FAQ, essai, pied de page** : propres.

**Défilement rapide** (`15-1440-defile-rapide-a/b.webp`) : rien ne saute, rien ne clignote, l'en-tête se cache en descendant et revient en remontant. La console est vide.

**Téléphone** (`31-375-*`, `31-360-*`, `32-375-menu.webp`) : la démo s'empile proprement, le comparatif devient des fiches lisibles, la barre « Essayer 30 jours » reste en bas et disparaît sur le formulaire.
- **Calculateur au téléphone** (`31-375-08-calculateur.webp`, `35-375-calculateur-resultat.webp`) : le montant « Récupéré chaque mois » est sous les 4 curseurs. On bouge un curseur sans voir le résultat changer, et la barre collante cache encore le bas de l'écran.
- **Menu** (`32-375-menu.webp`) : le tiroir s'arrête net sur le texte du hero, sans ombre ni fond. On croirait la page coupée.

**Tablette 768** (`30-768-hero.webp`, `33-768-*`) : c'est correct. La démo reste épinglée avec beaucoup de vert vide au-dessus et en dessous, ce qui est acceptable.

### 3. Le parcours de l'acheteuse (Sandrine, sur Planity)

1. **Hero** : elle comprend. Puis elle remarque les réservations « en ligne » à 13 h alors qu'il est 13 h 58, et elle se méfie.
2. **Clic sur « Tarifs »** dans la barre (`40-1440-clic-tarifs.webp`) : la page arrive au titre, à 80 px du haut, et l'en-tête se cache. En remontant un peu, il revient : c'est normal.
3. **Clic sur « Démo »** : le défilement arrive au début de l'épinglage (top = 0). Elle clique un créneau, la confirmation suit. C'est bon.
4. **Comparatif** : « Commission par nouvelle cliente : 0 à 35 % selon la plateforme ». Sa réaction : « Moi, chez Planity, c'est 0 %. Donc pour moi, la seule différence, c'est que mes clientes voient le salon d'en face. » La page ne lui parle jamais à elle, la gérante déjà sur une plateforme sans commission. Ce sera pourtant la majorité des gérantes en France.
5. **Calculateur** (`42`, `43`, `44-1440-calculateur-*.webp`) :
   - par défaut (3 personnes, 4 absences par semaine, 55 €, 6 nouvelles clientes) : **760 €** récupérés par mois, dont 662 € d'absences et 99 € de commission, pour le forfait Salon à 59 € ;
   - **son cas** (4 personnes, 3 absences, 45 €, 0 nouvelle cliente à commission) : **405 €**, forfait Salon. Elle répond : « Mais Planity m'envoie déjà des rappels. Ces 405 €, je ne les récupère pas, je les ai déjà. » Le calculateur compare Miroir à « rien », pas à l'outil qu'elle a aujourd'hui ;
   - la ligne « Commission évitée » contredit le comparatif. Si Miroir « n'apporte pas » de nouvelles clientes (« Non : à vous de les faire venir »), on ne peut pas compter comme économisée la commission sur des nouvelles clientes venues d'une place de marché ;
   - au clavier, les flèches sur « Absences » font bouger le montant (270 €). L'équipe à 8 bascule bien sur Institut à 99 €. Les chiffres concordent avec les cartes : PLANS est la source unique, et c'est bien fait.
6. **Tarifs** : le hero promet « liste d'attente … dès 29 € ». La carte Solo à 29 € ne liste **pas** la liste d'attente : elle n'apparaît que dans Salon à 59 €. Rien n'indique « Tout Solo, plus : ». L'acheteuse se sent piégée.
7. **FAQ** (`45-1440-faq.webp`) : l'accordéon referme la question précédente. « Puis-je garder ma place de marché ? Oui. » La réponse est bonne, mais elle ne dit pas ce qu'elle y gagne.
8. **Journal** : un clic sur un article ramène à `#journal`. C'est prévu (le slug est prêt), il n'y a pas de lien « Tous les articles ».
9. **Formulaire** (`46-1440-form-erreurs.webp`, `47-1440-form-confirmation.webp`) :
   - formulaire vide : 4 messages clairs, et le focus va sur « Prénom et nom » ;
   - avec « sandrine@salon-test », le message d'e-mail invalide s'affiche ;
   - avec des données valides : « C'est parti, Sandrine. Votre accès arrive à sandrine@salon-test.fr ; une ancienne coiffeuse vous écrit demain pour importer le fichier de Salon Sandrine. » Le ton est très juste ;
   - **bogue** : l'`id="equipe"` existe deux fois, sur la section « Qui fait Miroir » (l. 288) et sur la liste « Personnes dans l'équipe » (l. 392). Le `<label for="equipe">` pointe sur la section : `label.control` vaut `null`, et la liste n'a pas d'étiquette pour un lecteur d'écran. Playwright lui-même a buté sur `#equipe`.
   - Le formulaire est en deux colonnes sur ordinateur (titre et réassurances à gauche, carte à droite), avec les champs en 2 × 2. Sous les 3 réassurances, la colonne gauche reste vide sur 300 px (`10-1440-defile-07.webp`).

### 4. Le clavier (45 tabulations depuis le haut)

Ordre des arrêts : évitement → logo → Démo, Tarifs, Avis, Questions → Essai gratuit → Essayer 30 jours → 3 créneaux libres (les complets sont désactivés) → 4 curseurs → Essayer 30 jours → 3 articles → 5 questions → nom, salon, ville, liste, e-mail → Démarrer mon essai → 12 liens du pied de page.

**42 arrêts, tous visibles à l'écran, tous avec un contour net** : corail de 3 px, ou encre de 2 px sur les créneaux (`50-tab-01`, `03`, `07`, `08`, `11`, `15`, `21`, `31`, `40.webp`). Aucun élément n'est caché ou transparent au moment du focus. Le lien d'évitement mesure 24 px de haut, ce qui reste acceptable puisqu'il n'apparaît qu'au clavier. C'est un sans-faute.

### 5. Mouvement réduit

À 1440 et 375 (`60-1440-reduit-hero.webp`, `61-1440-reduit-page.webp`, `61-375-reduit-page.webp`) :
- l'agenda est à l'état final (5 réservations en ligne, Julie à la place d'Emma) ;
- la démo est dépliée en trois colonnes, une seule sur téléphone ;
- **aucun élément à opacité nulle**, la console est vide.

La page est complète et lisible.

### 6. L'œil du métier (relu comme une coiffeuse)

- **Agenda du hero** : réservations dans des créneaux passés, annulation après l'heure, reprise après le début du rendez-vous, « 6 min » qui en font 4 (voir le point 1). **C'est faux.**
- **Date** : « jeudi 6 novembre » tombe un vendredi en 2026. **C'est faux.**
- **Photo du salon** (`images/salon-2400.webp`, capture `10-1440-defile-01.webp`) : très belle lumière, tomettes, banquette. Mais en regardant bien, la coiffeuse a les deux mains dans les cheveux et le séchoir flotte devant le visage de la cliente, comme si c'était elle qui le tenait. Le reflet du miroir de droite ne correspond pas à la scène. C'est un brushing sans brosse, et un œil du métier le voit.
- **Camille, « Atelier Camille »** (`10-1440-defile-04.webp`) : sa citation parle de « couleurs », mais la photo montre un comptoir de soins (flacons en terre cuite, tunique noire d'esthéticienne), sans fauteuil, sans bac, sans miroir. On dirait un institut, pas un salon de coiffure. Or la coiffure est le cœur de la cible, et la seule photo de coiffure sur les témoignages, c'est un barbier.
- **Sami, barbier** : coupe-chou, serviette chaude, fauteuil Belmont, carreaux verts. C'est juste et c'est le plus crédible des trois.
- **Inès, institut** : pose de cils, mais l'esthéticienne porte un masque et on ne voit pas son visage. Pour un témoignage signé, c'est faible.
- **Article « Acompte »** (`journal-1`) : la carte tendue est un rectangle vierge, sans puce, et le paiement se fait au terminal du comptoir. Or un acompte de réservation se paie **en ligne**, au moment de réserver. L'image dit le contraire de l'article.
- **Bilan du lundi** :
  - le chiffre d'affaires par coiffeur, 2 480 à 2 910 € **par semaine**, fait 10 à 12 k€ par mois et par coiffeur dans un salon de quartier de 3 personnes. C'est flatteur, et une gérante connaît ses chiffres ;
  - « Jeudi après-midi encore à moitié vide » contredit le jeudi du hero, plein l'après-midi ;
  - « 1 absence (9 en sept.) » est ambigu (par semaine ou dans le mois ?).
- **Le reste** : prestations et durées (balayage 2 h, coupe 45 min, barbe 30 min, frange 30 min), prix (coupe + brushing 48 €, balayage 95 €, acompte de 10 € chez le barbier), import « fiches couleur » : tout est juste. Les SMS du forfait Salon (600 par mois jusqu'à 6 personnes) seront courts pour 6 personnes qui ont chacune 6 à 8 clientes par jour. Il faut dire ce qui se passe au-delà.

### 7. Densité (script de `conventions.md` § 11, à 1440 × 900)

| Mesure | Animé | Réduit | Fourchette |
|---|---|---|---|
| Mots | **787** | **788** | 500–800 |
| Sections dans `main` | 11 | 11 | 10–13 |
| Écrans | 12 | 10 | 12–18 |

Détail (réduit) :

| Bloc | Mots |
|---|---|
| évitement | 3 |
| en-tête | 7 |
| hero | 44 |
| preuve | 27 |
| démo | 99 |
| comparatif | 94 |
| démarrer | 50 |
| avis | 79 |
| équipe | 43 |
| tarifs | 116 |
| journal | 42 |
| questions | 90 |
| essai | 47 |
| pied | 47 |

- Aucun bloc ne dépasse 3 phrases. Le paragraphe de l'équipe en a 3, c'est la limite.
- Toutes les sections attendues sont là. Le pied de page n'est pas complet : il manque les réseaux sociaux et l'inscription au journal.
- La page est **à 12 mots du plafond** : chaque ajout du plan doit remplacer des mots.

### 8. Console et ressources

- **Console** : vide (aucune erreur ni aucun avertissement), aux cinq tailles, en animé et en réduit.
- **Requêtes** : aucune n'a échoué.
- **Débordement horizontal** : 0 aux cinq tailles. Aucun texte sous 12 px. Aucun titre ne déborde, sauf l'intertitre « Ressources » du pied de page à 768 : 13 px en capitales espacées, qui dépasse sa colonne de 14 px.
- **Interlettrage** : `normal` (0) sur tous les `h1` et `h2` en Fraunces. Rien n'est collé à 1440 ni à 375.

### 9. Bilan des règles de l'utilisateur

| Règle | Constat |
|---|---|
| Sujet connu de tous, inspiré des leaders, meilleur qu'eux | **Oui.** Tout le monde réserve sa coupe en ligne. L'agenda vivant, le comparatif honnête et le calculateur relié au tarif font mieux que les pages de Planity, Treatwell et Fresha. |
| 10 à 13 sections, 500 à 800 mots, 3 phrases par bloc, plus de visuels que de texte | **Oui** (11 sections, 787 mots). Interfaces et photos partout. |
| Articles datés pensés pour un CMS | **Oui** (`ARTICLES` : slug, rubrique, date, titre, image, alt). |
| Titres et promesse forts et concrets | **Oui.** Seul « En ligne en une soirée » est démenti par la page elle-même. |
| Lettres des grands titres jamais collées | **Oui.** |
| Nav propre (logo, 3 à 5 liens, bouton), sans téléphone | **Oui**, avec un tiroir sur téléphone ; Échap rend le focus au bouton. |
| Formulaire en deux colonnes sur ordinateur | **Oui.** |
| Hero équilibré | **Oui** à 1440 et à 1280. |
| Responsive réel à 1440, 1280, 768, 375, 360 | **Oui.** Le défaut d'usage du calculateur au téléphone est traité en FIX-7. |
| Mouvement réduit complet, focus visible, console vide | **Oui**, les trois. |

---

## B. Notes

### Les 10 points à contrôler

| # | Point | Verdict | Capture | Pourquoi |
|---|---|---|---|---|
| 1 | Page complète | OK | `61-1440-reduit-page.webp` | 11 sections, 787 mots, ≤ 3 phrases par bloc, toutes les sections attendues présentes. Réserve : pied de page sans réseaux ni inscription au journal (FIX-8). |
| 2 | Catalogue, articles | OK | `10-1440-defile-06.webp` | 3 cartes datées, rubrique, photo, champs d'un CMS. Pas de lien « Tous les articles » (FIX-8). |
| 3 | Titres et promesse | OK | `02-1440-hero-5s.webp` | « Votre agenda se remplit pendant que vous coupez. » : concret, désirable. « En ligne en une soirée » contredit par « Demain » (FIX-9). |
| 4 | Typographie d'affichage | OK | `30-1440-hero.webp`, `30-375-hero.webp` | Interlettrage 0, Fraunces non condensée, aucune lettre collée. « 30 / jours » coupé sur le titre d'essai (FIX-9). |
| 5 | Barre de navigation | OK | `02-1440-hero-5s.webp`, `32-375-menu.webp` | Logo, 4 liens, un bouton, tiroir sur téléphone, aucun numéro. Le bas du tiroir est à finir (FIX-12). |
| 6 | Blocs d'action, formulaires | OK | `10-1440-defile-07.webp` | Deux colonnes, champs 2 × 2, aucun téléphone. Étiquette de la liste cassée (FIX-4) et colonne gauche un peu vide (FIX-11). |
| 7 | Hero équilibré | OK | `30-1440-hero.webp`, `30-1280-hero.webp` | Texte, agenda vivant et action se répondent, sans vide. |
| 8 | Responsive | OK | `30-360-hero.webp`, `31-375-*`, `33-768-*` | 0 débordement, aucun titre cassé aux 5 tailles. |
| 9 | Images et vidéos | **Pas OK** (moyen) | `10-1440-defile-01.webp`, `10-1440-defile-04.webp` | Photos dans presque toutes les sections. Mais deux images fausses pour le métier (séchoir de la photo du salon, témoignage « couleurs » sur un décor d'institut) et une image d'acompte payé au comptoir (FIX-6, FIX-13). |
| 10 | 3D produit | Sans objet | — | Pas d'objet 3D. |

### La grille sur 100

| Critère | Points | Note | Pourquoi |
|---|---|---|---|
| Direction artistique | 15 | **13** | Crème, encre, corail, vert bouteille, Fraunces souple : on reconnaît un salon, pas une start-up. Le tarif et le formulaire retombent sur des gabarits SaaS plus communs. |
| Images | 15 | **11** | Grandes, chaudes, bien étalonnées et en bon rythme (salon pleine largeur, équipe 7/12, 3 portraits, 3 articles), plus l'interface en HTML. Plafond provisoire de 12–13, moins les deux fautes de métier (séchoir, Camille) et l'acompte au comptoir. |
| Mise en page | 15 | **13** | La composition « interface en démonstration » est suivie de bout en bout : agenda vivant, démo épinglée, calculateur. Bons contrastes d'échelle. Colonne gauche de l'essai vide, démo à 768 noyée de vert. |
| Mouvement | 10 | **8** | La démo épinglée est le meilleur moment, et le mouvement réduit est exemplaire. Mais le récit animé du hero est incohérent dans le temps (réservations au passé, annulation après l'heure, « 6 min » qui en font 4). |
| Clarté en 5 secondes, action | 10 | **9** | Quoi, pour qui, prix et action, tout est dans le premier écran. Le doute sur l'agenda abîme la confiance juste après. |
| Densité | 5 | **5** | 787 mots, 11 sections, 12 écrans, comptage fourni. Aucune pénalité. |
| Preuves et objections | 10 | **6** | Les six objections du brief sont traitées, les chiffres sont marqués provisoires. Mais l'agenda et la date sont faux. L'objection de l'acheteuse sur Planity reste sans réponse, et le calculateur compte une « commission évitée » que le comparatif dément. Solo à 29 € sans la liste d'attente promise dans le hero. Chiffre d'affaires du bilan gonflé. |
| Textes | 10 | **8** | Titres forts et concrets (« Le trou se rebouche seul », « Un prix fixe. Zéro commission. »), voix de coiffeuse, confirmation de formulaire très juste. « En ligne en une soirée » contredit par « Demain », « 30 / jours » coupé, bilan contradictoire avec le hero. |
| Mobile, accessibilité, légèreté | 10 | **8** | 0 débordement, 42 arrêts clavier visibles, console vide, mouvement réduit complet. Mais `id="equipe"` en double (la liste perd son étiquette) et un calculateur inutilisable d'un coup d'œil au téléphone. |
| **Total** | **100** | **81** | |

- **Note sur 10** : 8,1.
- **Seuil qui s'applique** : **85** (maquette aux médias provisoires).
- **Atteignable sans le vrai client** : environ **88**, avec les FIX à 0 $ (1 à 5, 7 à 12) et deux images régénérées (FIX-6, environ 0,12 $) :

| Critère | Note actuelle | Note visée |
|---|---|---|
| Preuves | 6 | 8 |
| Mouvement | 8 | 9 |
| Textes | 8 | 9 |
| Mobile | 8 | 9 |
| Images | 11 | 12 |
| Mise en page | 13 | 14 |

- **Ce qui bloque 90** (client) : vraies photos de salons clients, vrais chiffres (salons, absences, part en ligne), témoignages signés, tarifs des places de marché revérifiés (FIX-15).

**Ma phrase de client** : « La démo m'a convaincue, la liste d'attente qui rebouche le trou, c'est exactement ma vie. Mais votre agenda d'accueil fait réserver mes clientes à 13 h quand il est 14 h, et vous me dites jeudi 6 alors qu'on sera vendredi. Et moi qui suis sur Planity sans commission, vous ne m'avez toujours pas dit ce que je gagne à changer. »

Verdict : Pas encore. Le moment vivant du hero, la signature de la page, montre un agenda impossible (réservations dans le passé, annulation après le début du rendez-vous, mauvaise date), et la gérante déjà sur une plateforme sans commission ne trouve pas sa réponse.

---

## C. Plan de corrections

Classé par impact. Lignes de `index.html` sauf mention contraire. Le budget de mots est à 787 sur 800 : **tout ajout remplace des mots existants**.

| FIX | Gravité | Coût | Résumé |
|---|---|---|---|
| FIX-1 | bloquant | **0 $** | Rendre l'agenda du hero vrai dans le temps : pas de réservation dans le passé, annulation avant l'heure, 6 minutes réelles, même heure que la démo |
| FIX-2 | majeur | **0 $** | Corriger la date : le 6 novembre 2026 est un vendredi |
| FIX-3 | majeur | **0 $** | Répondre à la gérante déjà sur une plateforme sans commission (comparatif, FAQ, calculateur) |
| FIX-4 | majeur | **0 $** | `id="equipe"` en double : la liste « Personnes dans l'équipe » n'a pas d'étiquette |
| FIX-5 | moyen | **0 $** | Forfaits : la liste d'attente promise « dès 29 € » est absente de Solo ; « Tout Solo, plus » ; SMS au-delà du forfait |
| FIX-6 | moyen | **génération**, environ 0,12 $ | Régénérer la photo du salon (séchoir flottant) et Camille (décor d'institut pour une citation de coloriste) |
| FIX-7 | moyen | **0 $** | Calculateur au téléphone : le montant doit rester visible pendant qu'on bouge les curseurs |
| FIX-8 | moyen | **0 $** | Pied de page complet (Instagram, inscription au journal, adresse) et lien « Tous les articles » |
| FIX-9 | léger | **0 $** | Textes : « En ligne en une soirée » contredit par « Demain » ; « 30 jours » insécable |
| FIX-10 | léger | **0 $** | Bilan du lundi : chiffre d'affaires réaliste, jeudi cohérent avec le hero, « 9 en sept. » clarifié |
| FIX-11 | léger | **0 $** | Essai : remplir la colonne gauche vide à 1440 |
| FIX-12 | léger | **0 $** | Finitions : bas du tiroir mobile, ligne « maintenant » qui barre les noms, « Ressources » à 768 |
| FIX-13 | léger | **0 $** | Article « Acompte » : l'image montre un paiement au comptoir, pas un acompte en ligne |
| FIX-14 | léger | **0 $** | Lien « Connexion » pour les salons déjà clientes |
| FIX-15 | — | **client** | Vraies photos, vrais chiffres, témoignages signés, tarifs des plateformes revérifiés |

### FIX-1 — L'agenda du hero doit être vrai dans le temps (bloquant, 0 $)

**Quoi.**
- L'horloge démarre à 13 h 52 (`t = 292`, l. 529).
- Chloé et Jade sont « réservées en ligne » à 13 h (`NOUVELLES`, l. 507, départ 240) alors que l'heure est passée.
- Emma « annule son balayage de 14 h » à 14 h 01 (`tic === 9`, l. 556).
- Julie « prend 14 h » à 14 h 05 (`tic === 13`, l. 557), avec un toast « SMS accepté en 6 min » pour 4 minutes réelles.
- La démo raconte la même scène à 9 h 01 et 9 h 08 (l. 159, 176).

**Où.** `index.html` l. 507, l. 529, l. 555–557 ; état réduit l. 543–545.

**Comment.**
- Caler le hero sur la démo : `t = 0` au départ (9 h 00), annulation à `tic === 1` (9 h 01), reprise à `tic === 8` (9 h 08, donc 6 minutes vraies), arrêt de l'horloge vers 9 h 30.
- Toutes les `NOUVELLES` tombent alors l'après-midi, dans le futur. En garder 4 ou 5 qui ne chevauchent rien, après 13 h.
- Garder la ligne « maintenant » au-dessus des rendez-vous du matin. Margaux, en couleur de 9 h à 10 h, est alors « en cours », ce qui est juste.
- En mouvement réduit, poser la même scène avec l'horloge à 9 h 08.
- Variante plus courte : garder 13 h 52 mais déplacer Chloé et Jade sur des créneaux après 15 h, et faire annuler Emma *le matin* dans le toast (« Emma a annulé ce matin… »). Cette variante est moins forte, car elle ne colle pas à la démo.

### FIX-2 — Le 6 novembre 2026 est un vendredi (majeur, 0 $)

**Où et comment.**
- l. 73 : « jeudi 6 novembre » / « jeu. 6 nov. » → « jeudi 5 novembre » / « jeu. 5 nov. ».
- l. 139 (`aria-label` du téléphone) : « jeudi 6 novembre » → « jeudi 5 novembre ».
- l. 148 : « mer. 5 · jeu. 6 · ven. 7 » → « mer. 4 · jeu. 5 · ven. 6 ».
- Le « Bilan · semaine 45 » reste juste (5 novembre = semaine 45).
- Ajouter une vérification jour ↔ date dans `verif.js`, pour tous les exemples.

### FIX-3 — La gérante déjà sur une plateforme sans commission (majeur, 0 $)

**Quoi.** Le comparatif ne parle que de commission. La ligne « 0 à 35 % » range Planity et Treatwell ensemble, si bien qu'une gérante à 0 % n'y trouve aucun gain. Le calculateur compare Miroir à « aucun outil » : il compte les rappels comme un gain alors qu'elle en a déjà. Il compte aussi une « commission évitée » sur des nouvelles clientes que Miroir, d'après le comparatif, n'apporte pas.

**Où.** Comparatif l. 219–222 ; FAQ l. 367 ; calculateur l. 323 et l. 615–631.

**Comment.**
- **Comparatif** : remplacer la ligne « Abonnement » (déjà dite dans Tarifs) par « Votre fichier clientes : à vous, exportable / chez la plateforme ». Garder « 0 à 35 % » mais nommer le cas à 0 % dans la colonne : « 0 % sur certaines, jusqu'à 35 % sur d'autres ».
- **FAQ** : réécrire la réponse de « Puis-je garder ma place de marché ? » en deux phrases. Par exemple : « Oui. Gardez-la pour vous faire connaître, et donnez votre lien Miroir à vos habituées : elles ne verront plus le salon d'en face. »
- **Calculateur** :
  - renommer le curseur « Clientes déjà à vous qui réservent via une plateforme à commission » ;
  - ajouter sous le résultat la phrase « Comparé à un agenda sans rappel ni liste d'attente », ou une case « J'ai déjà des rappels SMS » qui retire les rappels du gain et ne garde que l'acompte et la liste d'attente (`HYP.evitees` réduit) ;
  - écrire les mots ajoutés à la place d'autres : par exemple raccourcir « Hypothèses : … » (l. 619).
- Vérifier avec le brief que « Environ 18 à 50 € » couvre bien les abonnements des trois plateformes citées, Planity compris, sinon écrire « selon la plateforme ».

### FIX-4 — `id="equipe"` en double (majeur, 0 $)

**Quoi.** `<section id="equipe">` (l. 288) et `<select id="equipe">` (l. 392) portent le même identifiant. Le `<label for="equipe">` s'accroche à la section (`label.control === null`), si bien que la liste n'a pas de nom accessible et qu'un clic sur l'étiquette ne la sélectionne pas.

**Comment.** l. 392 : `id="taille-equipe"` et `<label for="taille-equipe">`. Le script du formulaire n'utilise pas `equipe` : rien d'autre à changer. Ajouter « id uniques » à `verif.js`.

### FIX-5 — Les forfaits tiennent la promesse du hero (moyen, 0 $)

**Quoi.** Le hero dit « Rappels SMS, acompte et liste d'attente » puis « dès 29 € ». Solo (29 €) n'affiche pas la liste d'attente, et Salon ne dit pas qu'il contient Solo.

**Où.** `PLANS` l. 432–434 et gabarit l. 308–315.

**Comment.** Ajouter « Liste d'attente » à Solo (le plus honnête), ou bien faire commencer Salon et Institut par « Tout Solo, plus : » (champ `base` dans `PLANS`). Ajouter une ligne courte sous les cartes : « SMS en plus : 0,07 € » (tarif à fixer par le client).

### FIX-6 — Deux photos fausses pour le métier (moyen, génération, environ 0,12 $)

**Quoi.**
- `images/salon-*` (l. 98) : la coiffeuse a les deux mains dans les cheveux et le séchoir flotte devant le visage de la cliente. Le reflet du miroir de droite ne correspond pas.
- `images/temoin-1-*` (l. 260) : décor d'institut (flacons de soin, tunique d'esthéticienne) pour une citation de coloriste (« pendant les couleurs »).

**Comment.**
- Régénérer `salon` avec un brushing juste : brosse ronde dans une main, séchoir dans l'autre, buse vers la longueur, cliente assise face au miroir, reflet cohérent.
- Régénérer `temoin-1` en coiffeuse coloriste derrière son poste : bol et pinceau de couleur, papillotes sur la cliente en fond, bac à shampoing visible.
- Même direction photo que les autres (FLUX.2 Pro, environ 0,06 $ l'image), puis mettre à jour les `alt`.
- Si le budget est refusé : à 0 $, changer le salon de Camille en institut et la citation en « pendant les soins », mais alors aucun témoignage ne vient d'une coiffeuse : à éviter.

### FIX-7 — Le calculateur au téléphone (moyen, 0 $)

**Quoi.** À 375, le montant est sous les 4 curseurs (`31-375-08-calculateur.webp`). On règle sans voir le résultat bouger, et la barre collante masque le bas de l'écran.

**Où.** `miroir.src.css` l. 284–291 (`.calcul`, `.resultat`) et `index.html` l. 317–340.

**Comment.** Sous `md`, rendre `.resultat` collant en haut du bloc (`position: sticky; top: 4.5rem`) en version réduite à une ligne (« 760 € par mois · Salon 59 € »). Autre solution : le placer avant les curseurs (`order: -1`). Masquer la barre « Essayer 30 jours » tant que le calculateur est à l'écran (`data-hide-on="#essai, body > footer, #calculateur"`, l. 420).

### FIX-8 — Pied de page complet et sortie du journal (moyen, 0 $)

**Quoi.** `conventions.md` § 11 demande un pied de page avec les réseaux et l'inscription quand le métier publie. On n'y trouve ni Instagram (le canal des salons, que la page cite pourtant dans « Demain »), ni inscription au journal, ni adresse (seulement « Lyon »). Le journal n'a pas de lien « Tous les articles ».

**Où.** l. 404–418 et l. 346–357.

**Comment.**
- Ajouter dans le pied de page : Instagram, une adresse fictive à la Croix-Rousse, et un champ e-mail « Le journal du salon, une fois par mois ».
- Ajouter « Tous les articles → » sous les cartes du journal (href `/journal/` en production).
- Pour compenser les mots ajoutés, retirer les doublons du pied de page (« Essai », « Import », « Comparatif »).

### FIX-9 — Deux contradictions de texte (léger, 0 $)

- **l. 232** : le titre « En ligne en une soirée » est démenti par l'étape « Demain · Votre page est en ligne » (l. 241–242). Écrire « Prête en une soirée », ou bien faire passer l'étape 2 à « Ce soir, 21 h ». Sur le fond, c'est au client de dire si la page est en ligne le soir même.
- **l. 377** : « Essayez Miroir 30 jours dans votre salon » se coupe entre « 30 » et « jours » à 1440 et à 375 (`10-1440-defile-07.webp`, `31-375-11-essai.webp`). Mettre `30&nbsp;jours`.

### FIX-10 — Le bilan du lundi crédible (léger, 0 $)

**Où.** l. 182–198.

**Comment.**
- Ramener le chiffre d'affaires par semaine à un salon de quartier : Lina 1 640 €, Sarah 1 920 €, Tom 1 150 €. Recalculer `data-bar` (0,85, 1, 0,6) et l'`aria-label`.
- « Jeudi après-midi encore à moitié vide » contredit le hero : écrire « **Mardi** matin encore à moitié vide ».
- « 1 absence (9 en sept.) » → « 1 absence, contre 3 par semaine en septembre » (cohérent avec −68 %).

### FIX-11 — La colonne gauche de l'essai (léger, 0 $)

**Où.** l. 376–383.

**Comment.** Sous les 3 réassurances, ajouter une mini-carte : photo ronde de Lucie (recadrée depuis `equipe`) et une ligne, « Lucie ou une ancienne coiffeuse vous appelle demain pour régler l'agenda ». Elle remplace la 3ᵉ réassurance, qui dit la même chose : 0 mot de plus.

### FIX-12 — Finitions (léger, 0 $)

- **Tiroir mobile** (`miroir.src.css` l. 72) : il s'arrête net sur le texte du hero (`32-375-menu.webp`). Ajouter `box-shadow: 0 24px 40px -20px rgb(31 26 23 / .25)` et un voile sur la page, ou une hauteur pleine.
- **Ligne « maintenant »** (l. 113 du CSS) : elle barre les noms (« Léa », « Julie », `03-1440-hero-19s.webp`). La faire passer sous les étiquettes (`z-index: 0`, rendez-vous `z-index: 1`) ou à 50 % d'opacité sur les blocs.
- **« Ressources »** dans le pied de page à 768 : il déborde de 14 px. Réduire l'interlettrage à `.06em` ou passer le pied de page en 2 colonnes à cette taille.

### FIX-13 — L'image de l'article « Acompte » (léger, 0 $)

**Quoi.** `journal-1` montre une carte vierge tendue vers un terminal de comptoir, alors que l'acompte se règle en ligne à la réservation.

**Où.** l. 438.

**Comment.** À 0 $ : recadrer sur les mains et le terminal, et changer le titre en « Acompte : combien demander, et comment l'encaisser ». Mieux, en génération (environ 0,06 $) : une main tenant un téléphone avec un écran « Acompte 20 € · Salon Lumière ».

### FIX-14 — Lien « Connexion » (léger, 0 $)

**Quoi.** Toute page de logiciel en a un pour les salons déjà clientes, et il n'y en a pas ici.

**Où.** l. 33–41.

**Comment.** Ajouter un lien texte « Connexion » avant le bouton, discret, ce qui fait 5 liens au plus. Le mettre aussi dans le tiroir mobile.

### FIX-15 — Ce que seul le vrai client peut fournir (client)

- Photos de vrais salons clients, et les vrais visages de Lucie et Karim.
- Chiffres réels : nombre de salons, baisse des absences, part de réservations en ligne, délai moyen de reprise par la liste d'attente.
- Trois témoignages signés avec accord écrit : au moins **une coiffeuse coloriste** et **une gérante venue d'une place de marché sans commission**.
- Tarifs des plateformes revérifiés à la date de publication.
- Prix du SMS au-delà du forfait, et délai réel de mise en ligne.
