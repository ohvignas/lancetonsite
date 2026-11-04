# Miroir — exemple « interface en démonstration » (logiciel grand public)

Éditeur lyonnais fictif d'un logiciel de **réservation en ligne pour salons de coiffure, barbiers et instituts**. Remplace Escale (rendez-vous à quai pour entrepôts), jugé « trop niche » par l'utilisateur le 4 novembre 2026. Le marché est celui de Planity, Treatwell et Fresha (relevé dans `brief.md`).

Exemple fictif — Lance ton site. Miroir, le Salon Lumière, Lucie Ferrand, Karim Haddad, les salons des témoignages, les chiffres et les tarifs sont inventés. Les tarifs des places de marché cités dans le comparatif sont des ordres de grandeur publics relevés le 4 novembre 2026, à revérifier avant toute publication. Le formulaire n'envoie rien.

Composition suivie : **interface en démonstration** (`commun/compositions.md` § 7). L'agenda du salon tourne dès le premier écran, une démonstration épinglée en trois moments, une preuve chiffrée, un calculateur relié au tarif, puis l'action. Budget de la refonte du 4 novembre : 10 à 13 sections, 500 à 800 mots.

## Structure du dossier

```
index.html           la page : 11 sections (GSAP 3.15 + ScrollTrigger + SplitText, Lenis 1.3.27) et ses scripts
miroir.src.css       source Tailwind v4 (@import "tailwindcss" source(none) : seul index.html est lu) → miroir.css
gestes.js            copie figée de templates/prototype/gestes.js (non modifiée)
brief.md             métier, leaders, positionnement, objections, tarifs
medias-a-generer.md  5 images à générer (prompts anglais, fichiers cibles, priorités) — rien n'a été généré
images/              photos en webp à 2 ou 3 largeurs : 5 générées (FLUX.2 Pro), 3 Unsplash, + lucie-192 (recadrée de equipe-1400)
captures/            1440, 1280, 768, 375, 360 : premier écran animé + page entière en mouvement réduit ; démo épinglée à 1440
```

## 1. Direction artistique

- **Le salon, pas la start-up.** Crème chaude, encre brune, corail pour l'action et le « en ligne », vert bouteille pour les écrans sombres (démo, résultat du calculateur) et pour « repris par la liste d'attente ». Les couleurs d'état de l'agenda sont celles de la page.
- **Palette** : crème `#F7F1EA`, crème-2 `#EFE5D9`, encre `#1F1A17`, gris `#5C534D`, filet `#E3D8CB`, corail `#E2553A` (texte encre dessus : 5,3:1), corail foncé `#A63A22`, vert `#1D4A3C`, vert pâle `#D7EADF`, ambre `#E3A13A`.
- **Typographie** : Fraunces (titres, chiffres de preuve, prix ; axe optique 96, `SOFT` 30, **interlettrage 0**, jamais négatif) et Figtree (texte, interface, chiffres tabulaires). Pas de mono : on est dans un salon, pas dans une salle de contrôle.
- **Ce qui est évité** (fiche § 7 et leaders) : capture d'appli inclinée, bande de logos, grille de six fonctions à icônes, dégradé violet. Les fonctions se lisent dans la démo et dans les cartes de tarif.

## 2. Accroches (skills `copywriting` et `ogilvy`)

Positionnement (Ogilvy) : la page de réservation **à soi**, pas une place de marché, pour la gérante indépendante qui décroche en pleine couleur. Promesse unique : un agenda qui se remplit seul, sans commission.

| | Accroche | Commentaire |
|---|---|---|
| A | Plus de rendez-vous, zéro commission. | Clair, mais tout concurrent sans commission peut la signer (Planity). |
| B | Le salon complet, sans décrocher le téléphone. | Bonne douleur (le téléphone), mais « complet » promet trop. |
| C | Un fauteuil annulé, repris en six minutes. | Vraie nouvelle (la liste d'attente), trop étroite pour un titre de page. Gardée pour l'étape 2 de la démo. |
| D | Vos clientes réservent chez vous, pas chez les autres. | Le positionnement mot pour mot ; ton défensif. Devenue le titre du comparatif (« Vos clientes restent les vôtres »). |
| **E — retenue** | **Votre agenda se remplit pendant que vous coupez.** | Bénéfice concret, une scène que la gérante vit, et l'agenda à droite le montre en direct. 8 mots, 3 lignes à 1440 et à 375. |

Titres de section retenus : « Une semaine au salon, en trois moments » · « Vos clientes restent les vôtres » · « En ligne dès demain » (tour 1 persona ; « En ligne en une soirée » était démenti par l'étape « Demain ») · « Trois salons, trois mois après » · « Pensé par une coiffeuse, pas par une plateforme » · « Un prix fixe. Zéro commission. » · « Le journal du salon » · « Avant de vous lancer » · « Essayez Miroir 30 jours dans votre salon ». Bouton : « Essayer 30 jours » (hero, tarifs, barre mobile), « Essai gratuit » (nav), « Démarrer mon essai » (formulaire).

## 3. Sections et gestes

| # | Section | Contenu | Gestes |
|---|---|---|---|
| — | en-tête | Modèle de barre (règles `ui-ux-pro-max` : nav fixe sans recouvrir, lien actif, ≤ 5 liens) : logo, Démo · Tarifs · Avis · Questions, bouton « Essai gratuit » ; sous 1024 px, bouton « Menu » → tiroir (aria-expanded, Échap rend le focus). **Aucun numéro de téléphone.** | `data-header` ; lien actif par IntersectionObserver (`aria-current`) |
| 1 | `#hero` | Titre, une phrase, bouton, « 0 % de commission · dès 29 € » ; à droite l'agenda du jeudi 5 novembre du Salon Lumière (3 coiffeurs, 9 h – 19 h) | `data-intro`, `data-split`, `data-magnetic` ; script : horloge de 9 h 00 à 9 h 30 (1 s = 1 min, départ après 1,5 s), Emma annule à 9 h 01, Julie (SMS à 9 h 02) la reprend à 9 h 08 comme dans la démo, puis 5 réservations en ligne pour l'après-midi (9 h 12 à 9 h 28) ; toasts de 3,4 s espacés d'au moins 4 s ; remplissage et compteurs recalculés depuis `RDV` |
| 2 | `#preuve` | Grande photo du salon, 3 chiffres (1 240 salons, −68 % d'absences, 0 € de commission), marqués provisoires | `data-image-reveal`, `data-parallax`, `data-counter` |
| 3 | `#demo` | **Moment signature**, épinglé : mardi 23 h 12 la cliente réserve sur son téléphone (créneaux cliquables), jeudi 9 h l'annulation reprise par la liste d'attente, lundi le bilan | `data-steps="62"`, `data-steps-mobile="stack"`, `data-bar` ; script : écran précédent effacé, à l'étape 2 l'écran passe de « Emma annule / SMS envoyé » à « Julie accepte ✓ » au milieu de l'étape (`progression`) |
| 4 | `#comparatif` | Miroir face aux places de marché, **honnête** : elles apportent des clientes (« Oui, c'est leur force »), commission « 0 % sur certaines, jusqu'à 35 % sur d'autres », fichier clientes « à vous, exportable / chez la plateforme » | `data-split`, `data-reveal` ; tableau qui devient des fiches sous 768 px |
| 5 | `#demarrer` | Ce soir / Demain / Samedi, chaque étape avec sa mini-interface | `data-reveal-group` |
| 6 | `#avis` | 3 témoignages photo + citation + résultat chiffré (coiffure, barbier, institut), marqués provisoires | `data-reveal-group` |
| 7 | `#equipe` | Qui fait Miroir : la fondatrice ancienne coiffeuse, le développeur, le support | `data-image-reveal`, `data-split` |
| 8 | `#tarifs` | 3 forfaits **générés depuis `PLANS`** + calculateur (taille d'équipe, absences, prix moyen, clientes à vous facturées en commission, case « J'ai déjà des rappels SMS ») → montant récupéré par mois ; collé en haut sur téléphone ; la taille d'équipe choisit et entoure le forfait | `data-odometer`, curseurs natifs ; hypothèses `HYP` affichées |
| 9 | `#journal` | 3 articles datés **générés depuis `ARTICLES`** via `<template>` (slug, rubrique, date, titre, image, alt : champs d'un CMS) | `data-reveal-group` |
| 10 | `#questions` | 5 questions | `details[data-accordion]` |
| 11 | `#essai` | Deux colonnes : titre + 2 réassurances + carte de Lucie à gauche, formulaire (nom, salon, ville, équipe, e-mail) à droite | validation accessible, confirmation `role="status"` |
| — | pied | Logo et adresse, inscription au journal, Produit, Société (avec Instagram), crédits photo, mentions | inscription : validation, `role="status"`, rien n'est envoyé |

Hors `main` : barre d'action mobile (cachée sur l'essai et le pied). Un seul épinglage.

Les cartes de tarif et d'articles sont rendues **avant** `gestes.js` (script placé avant le kit), pour que le kit trouve leurs `data-reveal-item` à son lancement.

## 4. Densité (`conventions.md` § 11, script à jour)

| Mesure | Valeur | Budget |
|---|---|---|
| Mots, mouvement réduit | **791** | 500–800 |
| Mots, mouvement permis | **790** | 500–800 |
| Sections dans `main` | 11 | 10–13 |
| Hauteur à 1440 × 900 | 12 écrans animé (épinglage compris), 10 en réduit | |

Détail (réduit) : évitement 3, en-tête 7, hero 44, preuve 27, démo 99, comparatif 94, démarrer 50, avis 79, équipe 43, tarifs 128, journal 42, questions 90, essai 47, pied 38. Les écrans d'interface (`role="img"` + `aria-hidden`) ne comptent pas ; l'écran manipulable du téléphone compte (ses boutons). Le tarif compte une phrase `sr-only` qui double l'odomètre.

## 5. Photos (générées et libres, provisoires)

**4 nov. 2026, session principale** : les 5 remplacements de `medias-a-generer.md` sont générés (`black-forest-labs/flux.2-pro` via OpenRouter, 0,33 $ au total). Plus aucune photo SumUp. Restent libres : `temoin-3`, `journal-2`, `journal-3`. Le portable de Karim garde un logo de pomme à peine visible. **Tour 1 persona, 4 nov. 2026** : `salon`, `temoin-1` et `journal-1` régénérés (FLUX.2 Pro, 0,15 $ pour les trois, session principale) ; total des générations de la page : 0,48 $.

Huit photos **Unsplash, licence Unsplash** (pas Unsplash+, vérifié page par page), même étalonnage (`eq=saturation=0.86:contrast=1.03:gamma=1.03`, balance chaude), webp qualité 84, 916 Ko au total, aucune au-dessus de 111 Ko.

| Fichier | Source | Auteur | Traitement |
|---|---|---|---|
| `salon-*` | **régénéré le 4 nov. (tour 1 persona)** FLUX.2 Pro : brushing à la brosse ronde, séchoir derrière la tête, reflet cohérent ; 1er tirage (0,06 $, séchoir flottant) remplacé | — | mêmes noms et ratio 3:2 |
| `temoin-1-*` | **régénéré le 4 nov. (tour 1 persona)** FLUX.2 Pro : Camille coloriste, bol et pinceau, cliente en papillotes, bac à shampoing ; 1er tirage (0,06 $, décor d'institut) remplacé | — | mêmes noms et ratio 4:5 |
| `temoin-2-*` | **généré** FLUX.2 Pro (0,06 $), prompt 5 | — | 3:4 recadré en 4:5 |
| `temoin-3-*` | unsplash.com/photos/ToLhVLEbiRg | Cipriano Bala | recadrage 4:5 |
| `equipe-*` | **généré** FLUX.2 Pro (0,06 $), prompt 1 : Lucie et Karim | — | recadrage 3:2 |
| `journal-1-*` | **régénéré le 4 nov. (tour 1 persona)** FLUX.2 Pro : mains qui tiennent un téléphone le soir sur un canapé (écran flou), tasse de thé ; tirages précédents (0,06 $, carte au terminal du comptoir) remplacés | — | mêmes noms et ratio 3:2 |
| `lucie-192` | recadrage local de `equipe-1400` (ffmpeg + cwebp, 0 $) | — | carré 192 px, carte de l'essai |
| `journal-2-*` | unsplash.com/photos/UnSFmJCCrW0 | Land O'Lakes, Inc. | — |
| `journal-3-*` | unsplash.com/photos/quaIM4h-u5E | Farhad Ibrahimzade | recadrage 3:2 |

Écartée : `XIdsLkLM0a4` (Unsplash+, Getty Images). `medias-a-generer.md` liste 5 remplacements par priorité (équipe, salon, témoignage 1, article acompte, témoignage 2), sans vidéo.

## 6. Vérification

Script `verif.js` + script de captures aux cinq tailles (Playwright, Chrome) :

- console vide (animé et réduit, aux cinq tailles) ;
- 0 débordement horizontal à 1440, 1280, 768, 375, 360 ; aucun texte sous 12 px ; aucun titre qui déborde (le script signale deux faux positifs : le `h2` `sr-only` « Miroir en chiffres », et « Ressources » à 768 qui dépasse d'un pixel avec son interlettrage ; les `IMG` signalées en mode animé sont les photos en parallaxe, agrandies dans leur cadre rogné) ;
- tabulation : évitement → logo → 4 liens → essai → bouton du hero → créneaux (le focus sur un créneau recouvert ramène à l'étape 1) → curseurs → articles → questions → formulaire ;
- mouvement réduit : agenda à l'état final (réservations posées, Emma reprise par Julie, comme le dit l'étiquette), démo dépliée en trois colonnes (une colonne sur téléphone), aucun élément invisible ;
- espaces insécables fines avant `: ? ! ;` et dans les montants.

Captures dans `captures/` (webp) : `<largeur>-1-hero` (animé, après 16 s : réservations, annulation reprise), `<largeur>-9-page-reduit` (page entière), `1440-2-demo-1/2/3`.

## 7. Ce qui reste faible

- **Photos d'emprunt** : trois viennent d'une campagne SumUp (logos floutés mais formes de caisse reconnaissables) ; « Qui fait Miroir » montre une inconnue, pas Lucie et Karim. Les générations de `medias-a-generer.md` règlent les deux.
- **Chiffres et témoignages inventés** (1 240 salons, −68 %, 58 % en ligne, citations), marqués « provisoire » ; à recueillir.
- **Comparatif** : fourchettes de prix des places de marché approximatives (relevé public du 4 novembre 2026) ; à revérifier avant publication, et à garder sans nom de marque.
- **Journal** : les cartes pointent vers `#journal` ; le `slug` est prêt pour `/journal/<slug>`.
- **Densité** : 791 mots, au bord du plafond de 800 ; toute phrase ajoutée doit en remplacer une.

## 8. Boucle persona

Tour 1 : 81/100, « pas encore » (`boucle-persona/tour-1.md`). Corrections ci-dessous (§ 10).

À venir (faite par la session principale).

## 9. Retours sur le plugin

- `tw.sh` sans `source(none)` laisse Tailwind v4 balayer tout le répertoire courant : le CSS d'Escale comme celui de Miroir embarquaient les classes des autres exemples (105 Ko au lieu de 35 Ko). Ajouter `source(none)` dans les sources des exemples, ou lancer le CLI depuis le dossier de l'exemple.
- Pas de modèle de barre de navigation dans le registre UI Skills (recherche « nav » : aucun) ; la barre suit les règles de navigation d'`ui-ux-pro-max` (fixe sans recouvrir, ≤ 5 liens, lien actif, menu clair sur téléphone). Un modèle de nav dans `templates/prototype` éviterait que chaque exemple la réécrive.
- Les données rendues par script (forfaits, articles) doivent être posées **avant** `gestes.js`, sinon leurs `data-reveal-item` ne sont jamais révélés. À dire dans `GESTES.md`.
- Unsplash bloque `curl` (page « Checking your browser ») : les URL d'images ont été lues par Firecrawl (5 crédits par photo), les fichiers téléchargés depuis `images.unsplash.com`.

## 10. Tour 1 persona (81/100) : corrections

Plan : `boucle-persona/tour-1.md`, partie C. Dépense de cette passe : 0 $ (les trois images de FIX-6 et FIX-13 ont été régénérées par la session principale, 0,15 $).

| FIX | Fait | Ce qui a changé |
|---|---|---|
| 1 | oui | Hero calé sur la démo : horloge de 9 h 00 à 9 h 30 (1 s = 1 min, départ après l'apparition du hero). Emma annule son balayage de 14 h à 9 h 01, Julie, prévenue par SMS à 9 h 02, le prend à 9 h 08 (6 min vraies). Les 5 réservations en ligne arrivent de 9 h 12 à 9 h 28, toutes pour l'après-midi, sur des créneaux libres. Toasts de 3,4 s espacés d'au moins 4 s (relevé seconde par seconde : aucun ne se coupe). Mouvement réduit : même scène, horloge à 9 h 08. Louis passe à 16 h (accord avec la mini-colonne de la démo) ; Rose devient « Coupe + brushing » à 18 h avec Sarah, la cliente de la démo. |
| 2 | oui | Jeudi **5** novembre 2026 (vérifié : jeudi, semaine ISO 45) ; téléphone « mer. 4 · jeu. 5 · ven. 6 ». Créneaux du téléphone accordés à l'agenda du jeudi (10 h 15 et 17 h complets avec Lina ; 18 h avec Sarah choisi par défaut ; plus de 19 h 15, le salon ferme à 19 h). La vérification jour ↔ date dans `verif.js` n'est pas faite : le script est hors de ce dossier. |
| 3 | oui | Comparatif : « 0 % sur certaines, jusqu'à 35 % sur d'autres » ; la ligne « Abonnement » devient « Votre fichier clientes : à vous, exportable / chez la plateforme » (la fourchette « 18 à 50 € » disparaît). FAQ : « Oui, pour vous faire connaître. Vos habituées passent par votre lien, sans voir le salon d'en face. » Calculateur : curseur « Clientes à vous facturées en commission, par mois » (défaut 3), case « J'ai déjà des rappels SMS » qui ramène les absences évitées de 70 à 35 % (restent l'acompte et la liste d'attente), hypothèses raccourcies. |
| 4 | oui | `<select id="taille-equipe">` et son `label for` ; contrôle : aucun `id` en double, aucun `label` sans contrôle. Ajout à `verif.js` non fait (hors dossier). |
| 5 | oui | Solo : « Acompte et liste d'attente ». Salon et Institut commencent par « Tout Solo » / « Tout Salon » (champ `base` de `PLANS`). « SMS en plus : 0,07 € » sous le titre (prix fictif, à fixer par le client). « Import offert » reste dans l'essai et la FAQ. |
| 6 | oui (images : session principale) | `alt` de la photo du salon et de Camille réécrits selon les nouvelles images ; crédits du pied de page et § 5 à jour. |
| 7 | oui | Sous 768 px : titre, puis montant collé en haut (une ligne : montant à gauche, forfait à droite, détail masqué), puis curseurs ; il remonte à 0,75 rem quand l'en-tête se cache. La barre « Essayer 30 jours » se cache sur `#calculateur`. Contrôlé à 375 et 360 : montant visible pendant qu'on règle « Absences » au clavier. |
| 8 | oui | Pied : adresse (12 rue d'Austerlitz, 69004 Lyon), Instagram, inscription « Le journal, chaque mois » (validation, message `role="status"`, rien n'est envoyé), doublons retirés (Comparatif, Import, Essai), crédits raccourcis. « Tous les articles → » sous le journal (`/journal/` en production). |
| 9 | oui | « En ligne en une soirée » → « En ligne dès demain ». « 30 jours » insécable : `&nbsp;` ne suffit pas à SplitText, d'où un `span.whitespace-nowrap` (contrôlé aux 5 tailles, animé). |
| 10 | oui | Chiffre d'affaires de la semaine : Lina 1 640 €, Sarah 1 920 €, Tom 1 150 € (barres 0,85 / 1 / 0,6) ; « Mardi matin encore à moitié vide » ; « 1 absence, contre 3 par semaine en septembre » ; `aria-label` à jour. |
| 11 | oui | 3ᵉ réassurance remplacée par une carte : portrait rond de Lucie (`images/lucie-192.webp`, recadré de `equipe-1400`) et « Lucie ou une ancienne coiffeuse règle l'agenda avec vous. » ; « Import du fichier offert ». |
| 12 | oui | Tiroir mobile en pleine hauteur avec ombre ; ligne « maintenant » sous les rendez-vous (`z-index`), elle ne barre plus les noms ; « Ressources » supprimé (pied réorganisé en 2 colonnes à 768). |
| 13 | oui (image : session principale) | Nouvelle image (réservation le soir sur le téléphone) : le titre « Acompte : combien demander sans faire fuir la cliente » est gardé ; `alt` réécrit. |
| 14 | oui | « Connexion » avant « Essai gratuit » dès 1024 px (hors `.nav-liens`, que le script du lien actif lit comme des ancres), et dans le tiroir ; adresse fictive `app.miroir.example`. |
| 15 | à noter | Pour le vrai client : photos de vrais salons et vrais visages de Lucie et Karim ; chiffres réels (salons, absences, part en ligne, délai de reprise) ; trois témoignages signés dont une coloriste et une gérante venue d'une place de marché sans commission ; tarifs des plateformes revérifiés ; prix du SMS au-delà du forfait ; délai réel de mise en ligne (« dès demain »). |

**Densité après corrections** (script § 11, 1440 × 900) : 788 mots en animé comme en réduit, 11 sections, 12,2 écrans animé, 10,2 réduit. Détail : évitement 3, en-tête 8, hero 44, preuve 27, démo 97, comparatif 94, démarrer 49, avis 79, équipe 41, tarifs 120, journal 45, questions 95, essai 47, pied 39. Ajouts compensés : pied (−8), « à Lyon » de l'équipe, « import offert » des tarifs, hypothèses du calculateur, réassurance raccourcie.

**Vérification** (Chrome piloté par Playwright, serveur local propre au contrôle) : 1440, 1280, 768, 375, 360, animé et réduit : 0 débordement horizontal, aucun titre qui déborde, aucun texte sous 12 px, aucun `id` en double, aucun `label` orphelin, console vide, aucune requête en échec. Récit du hero relevé seconde par seconde (9 h 00 → 9 h 30). Clavier : 44 arrêts, tous à l'écran avec contour. Mouvement réduit : agenda à 9 h 08, aucun élément à opacité nulle. Téléphone : tiroir pleine hauteur, calculateur lisible pendant le réglage, case « rappels » (710 € → 380 € avec les réglages par défaut), inscription au journal (erreur puis confirmation, URL inchangée).


## 11. Tour 2 : 89/100, Oui ; FIX finaux

Plan : `boucle-persona/tour-2.md`. Le client dit oui à 89/100. Cette passe applique les FIX à 0 $ ; dépense : 0 $, rien de généré ni de téléchargé.

| FIX | Fait | Ce qui a changé |
|---|---|---|
| 16 | oui | L'horloge du hero observe `.hero-ecran` (seuils 0 à 1) et ne tourne que si 55 % de l'écran sont visibles, ou si la partie visible couvre 55 % de la fenêtre. Sur ordinateur, rien ne change (écran entier visible, 9 h 05 au bout de 6 s). À 375 et 360, l'horloge reste à 9 h 00 tant qu'on ne fait pas défiler ; une fois l'agenda à l'écran, le toast « 9 h 01 · Emma annule son balayage de 14 h » apparaît (relevé à +2,6 s). |
| 17 | oui | Chaque ligne du détail est arrondie à 5 € avant la somme : 660 € + 50 € = 710 € par défaut ; 270 + 0 = 270, 1 265 + 210 = 1 475, 6 775 + 1 350 = 8 125. `data-odometer` passe de 755 à 710 (valeur calculée). |
| 18 | non (génération) | Photo du salon : reflet incohérent et cordon qui sort de la brosse. À régénérer (environ 0,06 $) ou à recadrer sur les deux tiers gauches. |
| 19 | oui | Lou passe à 17 h 15 (`[1, 495, 30, …]`, libre entre Louis et Rose). Le repère d'heure que recouvre l'étiquette de la ligne « maintenant » (le « 9 h » au départ) est masqué tant que la ligne est à moins de 18 px. L'étiquette passe à 12 px (`.75rem`, padding `.1rem .35rem`). |
| 20 | oui | « Sans engagement. SMS au-delà du forfait : 0,07 €. » (+1 mot). Prix toujours à fixer par le client. |
| 21 | non (génération) | Article sur l'acompte : écran du téléphone flou. À régénérer avec « Salon Lumière · Acompte 20 € · Payer » lisible (environ 0,06 $). |
| 22 | client | Inchangé : voir la ligne 15 du § 10, plus une photo d'Inès à visage découvert, les mentions légales et la politique de confidentialité (aujourd'hui `href="#hero"`). |
| 23 | retour pour le kit | Non touché ici (`gestes.js` est partagé). Les cascades `data-reveal-group` ont du retard quand on défile très vite : dans le `scrollTrigger` de la cascade (l. 323), terminer l'animation si la vitesse dépasse 2 500 px/s (`onEnter: (self) => Math.abs(self.getVelocity()) > 2500 && self.animation.progress(1)`), ou ramener `stagger` à 0,06 et la durée à 0,5 s. À corriger dans le kit, puis refaire la série de défilement rapide. |

**Marges intérieures (« cramped padding »).** Relevé en rendu (Chrome piloté par Playwright, 5 largeurs) : pour chaque élément à fond, ombre ou bordure qui contient du texte, l'écart entre le texte et le bord ; pour un simple filet, seul le côté bordé compte.

Cas corrigés :

- `.agenda` : marge gauche de 6,4 px → 12 px (les heures collaient au cadre de l'écran).
- `.rdv` (agenda du hero et de la démo) : 6,4 px → 11,2 px à gauche (8 px après la barre de couleur de 3 px), 8 px à droite.
- `.file .statut` (liste d'attente) : 4,4 px → 6,8 px en haut et en bas, 9,6 px sur les côtés.
- `.temoin .resultat-temoin` : 4 px → 6,4 px en haut et en bas, 12,8 px sur les côtés.
- `.forfait .badge` « Le plus choisi » : 5,2 px → 6,8 px en haut et en bas, 12 px sur les côtés.

Faux positifs :

- `.agenda-tetes i` : initiales dans une pastille ronde de 22 px, centrées. C'est un avatar.
- `.colonne` et `.mini-col` : le texte mesuré appartient aux blocs `.rdv`, qui sont posés dedans à l'heure exacte.
- `.rdv`, en haut et en bas (3,2 px) : la hauteur suit l'échelle de temps (un créneau de 30 min fait 17 à 19 px). On ne peut pas ajouter de marge verticale sans fausser l'agenda.
- Pastilles compactes d'au moins 6 px et d'au moins 28 px de haut : `.tel-url`, jours du téléphone (« mer. 4 »), `.etapes .quand`.
- `.forfait.conseille` (−4 px en haut) : le badge « Le plus choisi » est posé à cheval sur le bord, c'est voulu.
- `.faq summary .plus` : signe « + » centré dans un bouton rond de 32 px. C'est une icône.
- `.faq details:last-child` : le texte « mesuré » sous le filet est la réponse d'un accordéon fermé, donc invisible.
- Filets d'une seule bordure (indicateurs du hero, `li` de la liste d'attente, `tr` du comparatif, ligne de tarif, pied) : ce sont des séparateurs, pas des cadres. Le texte part du bord comme dans le reste de la page.
- `.maintenant::before` (étiquette d'heure) : une pastille de 12 px collée à la ligne, qui marque l'heure.

**Densité** (script § 11, 1440 × 900) : 788 mots en animé (789 après défilement complet, le compteur de la preuve ayant fini de rouler), 789 en mouvement réduit, 11 sections, 12,2 écrans en animé et 10,3 en réduit. Le détail : tarifs 121.

**Vérification** (Chrome piloté par Playwright, serveur local de contrôle sur le port 4361, arrêté ensuite) : 1440, 1280, 768, 375 et 360 px. Aucun débordement horizontal. Aucun titre qui déborde : le seul relevé est le titre `sr-only` « Miroir en chiffres ». Aucun texte sous 12 px. Console vide, en animé comme en réduit. En mouvement réduit, l'agenda est à 9 h 08, le « 9 h » est masqué sous l'étiquette, et Lou est à 17 h 15.
