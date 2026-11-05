# Calorie — exemple « interface en démonstration » (artisan RGE, pompes à chaleur)

Installateur fictif de pompes à chaleur air/eau et de chauffe-eau thermodynamiques à Apt (Vaucluse), qui vend aux propriétaires du Pays d'Apt et du Luberon. Page d'accueil : `index.html` + `calorie.css` (écrit à la main, sans Tailwind) + `calorie.js` et `maison.js` (modules ES) + `gestes.js` (copie figée du kit, non modifiée).

Exemple fictif — Lance ton site. Calorie, Thomas Reynaud, l'équipe, les clients, les avis, l'adresse, le téléphone, les chiffres (412 installations, 4,8/5, 48 h), les prix et les montants d'aides sont inventés. Les montants d'aides s'inspirent des barèmes publics MaPrimeRénov' et CEE sans les reproduire ; toutes les sommes du simulateur sont des estimations indicatives. Les communes existent. Aucun formulaire n'envoie quoi que ce soit. Cadre du client et de l'acheteuse : `brief.md`.

Composition suivie : **7. Interface en démonstration** (`commun/compositions.md`). Pourquoi pas le récit horizontal : voir `brief.md`.

## Structure du dossier

```
index.html           12 sections, importmap (three@0.170.0, d3@7.9.0), GSAP 3.15 + ScrollTrigger + SplitText, Lenis 1.3.27
calorie.css          tokens, sections, états .motion-reduit et .sans-3d
calorie.js           données (PRODUITS, CHANTIERS, BAREME), simulateur, comparatif D3, relevé vivant du hero, formulaire
maison.js            maison en coupe Three.js, épinglage ScrollTrigger, repères projetés, repli SVG
gestes.js            copie figée de templates/prototype/gestes.js
images/              8 sujets réutilisés (webp, deux tailles), voir § 5
captures/            verifier.cjs (Playwright) + captures 1440 / 768 / 375 / 360, mouvement réduit, sans WebGL ; verif.json
brief.md             le patron, l'acheteuse, ses objections, la composition, le refus du bandeau minuteur
medias-a-generer.md  5 photos à régénérer, prompts, coût estimé
prompt-vitrine.json  entrée « artisan-calorie » pour la vitrine
```

## 1. Direction artistique

- **L'hiver dehors, la chaleur dedans.** Fond givre froid (pas de crème), sections nuit bleu ardoise où la chaleur se voit : braise et ambre. Un seul rouge brique, réservé à l'action.
- **Palette** : givre `#e8edef`, blanc `#fbfcfc`, encre `#14212a`, gris `#4a5862`, nuit `#0e1820`, brique `#b83f1a` (boutons, texte blanc dessus), brique-texte `#a33a17` (liens sur clair), braise `#f08a3c`, ambre `#f6b54a` (repères, chiffres sur nuit), glace `#6cc3e0` (l'air froid capté), brume `#b9c7cf`. Toutes les paires texte/fond utilisées passent AA.
- **Typographie** : Schibsted Grotesk 800–900 (titres, interlettrage 0), Instrument Sans (texte), Martian Mono (mesures du relevé, axes du graphique). Pas d'Inter ni de Fraunces.
- **Hero** : titre à gauche, mais pas de pastille, pas de double bouton, pas de trois cartes ; à droite, le relevé vivant d'une maison équipée (températures, rendement, barres de consommation) qui se met à jour toutes les 1,2 s, avec bouton « Figer le relevé ».

## 2. Sections (772 mots, 12 sections)

| # | Section | Geste |
|---|---|---|
| 1 | Hero : « Chauffez la maison avec l'air du Luberon. » + relevé vivant | `data-intro`, `data-split`, relevé `setInterval` en pause hors écran |
| 2 | Preuve : photo, 412 / 4,8 / 48 h, bande des communes | compteurs du kit (`data-counter`), `data-marquee` avec pause |
| 3 | Le trajet de la chaleur (épinglé) | **signature** : maison en coupe Three.js, 4 étapes, 5 repères |
| 4 | Offre : PAC, ballon intégré, ballon seul, entretien | **projecteur-cartes**, rendu depuis `PRODUITS` |
| 5 | Simulateur d'économies et d'aides | odomètre du kit (`gestes.odometre`), résumé relié au formulaire |
| 6 | Dix ans, avant et après | **courbes D3** tracées à l'entrée + tableau équivalent (`details`) |
| 7 | Étapes, de l'appel à la mise en service | `data-reveal-group` |
| 8 | Équipe (Thomas) | `data-image-reveal` |
| 9 | Avis (3) | `data-reveal` |
| 10 | Chantiers datés | rendus depuis `CHANTIERS`, `ScrollTrigger.batch` |
| 11 | Questions (5) | **faq-verre** |
| 12 | Demande de visite, deux colonnes | validation `aria-invalid`, « Joindre ma simulation », rien n'est envoyé |

Navigation : **nav-pilule** (4 liens + « Visite technique », menu `<dialog>` sur téléphone, aucun numéro dans la nav). Barre d'action mobile `data-sticky-cta`, masquée pendant la démonstration et au formulaire.

## 3. Le moment signature

- **Maison en coupe** (`maison.js`, Three.js 0.170 en importmap) : low-poly, lumière hémisphérique + soleil bas à ombres douces, mas de pierre avec cyprès, olivier, lavande. Au défilement (une seule section épinglée, `+=2 écrans` sur ordinateur, 1,5 sur téléphone) la façade s'enfonce dans le sol (plan de coupe), le pan de toit avant bascule, puis les flux s'allument dans l'ordre : air froid capté par l'unité extérieure (hélice qui accélère), liaison vers le module du cellier, serpentin du plancher, radiateurs à ailettes, ballon. Particules sur courbes Catmull-Rom, repères HTML projetés depuis des ancres 3D (un seul repère à la fois sous 1 100 px pour éviter les chevauchements).
- **Garde-fous** : bouton « Pause des flux » visible ; rendu seulement quand la section est à l'écran ; sans WebGL (ou si `import("three")` échoue), schéma SVG de la même maison avec ses 5 repères ; mouvement réduit : pas d'épinglage, état final fixe, texte empilé sous l'image.
- **Comparatif sur dix ans** (`calorie.js`, D3 7.9 importé à la demande) : coût cumulé fioul contre PAC aides déduites, aire de gain après le croisement, point « remboursé en N ans », étiquettes de fin. Se trace à l'entrée, se recalcule avec le simulateur. Si D3 ne charge pas, le tableau s'ouvre.

## 4. GSAP (skills gsap-core, scrolltrigger, timeline, performance)

`gsap.matchMedia()` pour mouvement réduit et points de rupture (ordinateur / téléphone), nettoyage par `revert` au changement de condition, transforms et opacité seulement, `ScrollTrigger.refresh()` au `load` et après `document.fonts.ready`, `ScrollTrigger.sort()` après création de l'épinglage. **1 épinglage** sur la page.

## 5. Images (réutilisées, à régénérer : `medias-a-generer.md`)

| Fichier | Source | Crédit |
|---|---|---|
| `maison-giraud-*` | exemple Calade | AXP Photography / Pexels |
| `martine-*` | exemple Calade (portrait) | image générée FLUX.2 Pro |
| `sejour-tomettes-*` | exemple Calade (`lumiere`) | image générée FLUX.2 Pro ; remplace au tour 1 une photo avec un poêle à bois |
| `chantier-joucas-*` | exemple Calade | Rich Martello / Unsplash |
| `chantier-apt-*` | exemple Calade (méthode) | image générée FLUX.2 Pro |
| `chantier-roussillon-*` | exemple Calade | Audric Wonkam / Unsplash |
| `luberon-*` | exemple Calade | Sébastien Jermer / Unsplash |
| `thomas-*` | exemple Vigie (Julien) | image générée nano-banana |

Chaque `<img>` porte `data-prompt` et `data-ratio`.

## 6. Vérification

Résultats au § 7. Détail de densité dans `captures/verif.json`.

## 7. Résultats et limites connues

Dernière passe (`captures/verifier.cjs`, Chrome via Playwright) :

| Cas | Erreurs console | Débordement horizontal | Épinglages | Remarque |
|---|---|---|---|---|
| 1440 | 0 | 0 | 1 | 779 mots, 12 sections, 13,5 écrans |
| 768 | 0 | 0 | 1 | maison décalée à droite, un repère à la fois |
| 375 | 0 | 0 | 1 | maison en haut, texte en bas, un repère à la fois |
| 360 | 0 | 0 | 1 | titre sur 3 lignes, tuiles du relevé resserrées |
| mouvement réduit 1440 / 375 | 0 | 0 | 0 | rien ne bouge seul (vérifié sur 2 captures à 1,5 s d'écart), état final fixe, 5 repères sur ordinateur, liste numérotée seule sur téléphone |
| sans WebGL 1440 | 0 | 0 | 1 | schéma SVG de repli, page complète |

Corrections faites après lecture des captures : cadrage 3D (maison coupée en haut, étiquettes coupées ou superposées), lavande en cônes discrets, plafond ajouté, texte et maison qui se chevauchaient à 768, débordement à 360 (grille du hero et tuiles du relevé), axe du graphique sur téléphone (pose / 5 ans / 10 ans), séparateur de milliers du SVG, étiquettes du schéma de repli, repères mal placés en mouvement réduit.

- Les photos réutilisées sont provisoires : la photo de Thomas vient d'un atelier d'usinage, les maisons n'ont pas d'unité extérieure visible.
- Montants d'aides et prix fictifs : à remplacer par les barèmes de l'année du client.
- Le hook « broken-image » d'impeccable signale l'`<img>` sans `src` du `<template>` des chantiers : faux positif, le module remplit `src` au rendu.
- Bandeau minuteur non utilisé : aucune échéance réelle et crédible (voir `brief.md`).

## 8. Tour 1 du client-persona (77/100) : corrections gratuites appliquées

Rapport : `persona/tour-1.md`. Appliqués : FIX 1 à 5 et 7 à 13 (le 5 en remplaçant la photo, sans génération). Restent : FIX 6 (photo de Thomas, génération) et FIX 14 (contenus du client), ainsi que les photos de chantier du FIX 12.

- **Simulateur.** « Électrique » + PAC : prix « + réseau », pas de durée de remboursement, message « le réseau d'eau à créer, ou une PAC air/air, se chiffre à la visite ». « Ballon seul » : base cumulus électrique (rendement 0,92), entretien 0 €, « isoler d'abord ? » réservé à la PAC.
- **Entretien.** Offert la première année avec la PAC, partout : carte, calcul sur dix ans, FAQ.
- **Clavier.** Les cartes générées sont animées en `opacity` (plus `autoAlpha`). Un bloc atteint au clavier s'affiche tout de suite (`focusin`).
- **Débordement.** Image de l'équipe dans une boîte `overflow: clip`, plus `html { overflow-x: clip }`.
- **Textes de métier.** Ballon « chauffé par la pompe à chaleur », FAQ sur la fonte à 45 °C, titre « Deux appareils et leur entretien, posés par nous ».
- **Premier écran.** « Dès 11 900 € posée, avant aides · 412 maisons équipées depuis 2012 ». « En direct » remplacé par « un jour de janvier ». Le relevé est cohérent : 27,6 kWh, 2,04 €, au fioul 4,06 €.
- **Mise en page.** Équipe centrée sur deux colonnes en 5/4. Photos des avis étroits en 3:4. Au téléphone, la maison de la démo est descendue. Barre mobile masquée sur `#trajet`. En mouvement réduit, la maison est recentrée, sans repères au téléphone.
- **Avis de Bonnieux.** La photo au poêle est remplacée par `sejour-tomettes-*` (Calade `lumiere`).
- **Chantiers.** Titres sans lien, en attendant les pages de chantier.
- **Finitions.**
  - « aucune » au lieu de « −0 € » ;
  - espaces insécables dans les milliers (la police n'a pas d'espace fine) ;
  - « Remboursé » partout ;
  - « · Gargas » insécable ;
  - `autocomplete="on"` sur le champ de contact.

## 9. Tour 2 du client-persona (75/100) : corrections gratuites appliquées

Rapport : `persona/tour-2.md`. Appliqués : FIX 1 à 8. Restent : FIX 9 (trois photos à générer, environ 0,15 à 0,30 $) et FIX 10 (contenus du client).

- **FIX-1, cas « Électrique » + PAC.** L'option est gardée. Quand le projet contient la PAC :
  - le graphique cache la courbe PAC, l'aire du gain, l'étiquette de fin et sa légende ; il ne reste que la courbe des radiateurs électriques ;
  - le tableau affiche « à la visite » dans la colonne Après ;
  - « Reste à payer » affiche « à la visite » ;
  - le titre du résultat devient « Économie estimée par an, une fois le réseau d'eau créé » ;
  - le résumé joint dit « PAC + ballon, électrique, 120 m², réseau d'eau à chiffrer », sans montant.
  - Électrique et ballon seul reste inchangé : 440 €, 5,0 ans.
- **FIX-2, densité.** 841 → 773 mots avec le script du persona (FAQ ouverte, 1,5 s d'attente). Coupes :
  - FAQ (gel, radiateurs, entretien, dossier d'aides) ;
  - sous-titre du héros, réassurance du héros ;
  - pied de page (« tout est inventé ») ;
  - chapo du simulateur ;
  - trois sous-lignes des étapes ;
  - ligne « Atelier et dépôt » de l'équipe ;
  - une ligne du bloc de demande.
- **FIX-3.** « Isoler d'abord ? » seulement pour une maison d'avant 2000. Après 2000 : « maison déjà sobre, la PAC se justifie surtout au remplacement de la chaudière ». Ballon seul : « Pas remboursé en dix ans avec ces réglages. » La phrase est la même dans le simulateur et dans le comparatif.
- **FIX-4.** Le résumé joint commence par le projet : « ballon seul, fioul, 120 m², 440 € d'économie par an ».
- **FIX-5, maison 3D en pierre.**
  - Moellons calcaires dessinés en code : `CanvasTexture` de pierres arrondies irrégulières à joints clairs, sans image.
  - Tuiles canal en terre cuite passée : 32 demi-cylindres par pan.
  - Génoise de deux rangs sous l'égout, avant et arrière.
  - Le repli SVG est inchangé.
- **FIX-6.** `[hidden] { display: none !important; }` en base CSS : le bouton du relevé disparaît en mouvement réduit, comme tout composant en flex.
- **FIX-7.** Le relevé reste figé à 9 h : les kWh ne montent plus, le coût du jour reste cohérent (27,6 kWh, 2,04 €). Seules la température extérieure et le rendement bougent.
- **FIX-8.** La photo de l'équipe touche le bord droit de la grille (`justify-self: end`).

## 10. Tour 3 (89/100)

Rapport : `persona/tour-3.md`. Appliqués : FIX 3 à 6 et FIX 8. Restent : FIX-1 (trois photos à générer, environ 0,15 à 0,30 $), FIX-2 (contenus du client) et FIX-7 (note 4,8/5 au premier écran, non demandé).

- **FIX-3, vide de l'équipe.**
  - À partir de 1024 px, la grille passe en `minmax(0, 1fr) 30rem` avec un écart de 4rem. La photo s'affiche à sa taille native (480 px), et `sizes` passe à 480px.
  - Le texte (`max-width: 46rem`, `justify-self: end`) est collé contre la photo.
  - Écart mesuré entre la fin du texte et la photo : 64 px à 1440, 1100 et 1024 (350 px avant).
- **FIX-4, maison 3D.**
  - Toit :
    - 9 rangs de tuiles coniques qui se recouvrent, inclinées de 0,06 rad pour que le bas de chaque tuile remonte sur le rang suivant ;
    - alternance de courants (creux) et de couverts (bosses) ;
    - teinte légèrement différente d'une tuile à l'autre ;
    - deux `InstancedMesh` par pan, donc 4 appels de dessin au lieu de 64.
  - Murs : la face intérieure des quatre murs (façade comprise) est en enduit `interieur`, la face extérieure reste en pierre.
- **FIX-5, trois phrases.**
  - Équipe : on garde le titre « Quatre chauffagistes salariés ». Le texte dit maintenant « Lui et son équipe entretiennent ce qu'ils ont posé », il n'y a donc plus de second chiffre.
  - Comparatif, cas électrique :
    - la phrase devient « Le réseau d'eau se chiffre à la visite : seule la facture actuelle est tracée. » ;
    - le titre devient « Dix ans de factures au chauffage actuel » grâce à la classe `.sans-apres` sur `#dix-ans` (deux variantes du titre, une seule affichée) ;
    - ce titre est révélé en `data-reveal` et non plus en `data-split`, car SplitText mettait les deux variantes dans l'`aria-label`.
- **FIX-6, étiquette du ballon.** Au téléphone et sur tablette, une étiquette qui déborderait à droite se pose au-dessus du point, pastille sur l'objet, au lieu de passer à gauche (dans le séjour).
- **FIX-8, demande de visite.** La colonne de texte est centrée verticalement face au formulaire (`align-items: center`).
- **Vérification** (scripts du persona copiés hors du dossier) :
  - 774 mots, 12 sections, 13,7 écrans ;
  - 0 erreur ni avertissement console à 1440, 375, en mouvement réduit et sans WebGL ;
  - `scrollWidth` égal à la largeur à 1440, 375 et 360.

## 11. Photos générées (5 nov. 2026, accord de l'utilisateur)

Trois photos générées avec FLUX.2 Pro (OpenRouter, 1K, 0,03 $ chacune, 0,09 $ au total), prompts 1, 3 et 4 de `medias-a-generer.md` :

- `thomas-320/480.webp` : le chauffagiste accroupi devant une unité extérieure au pied d'un mur de pierre (généré en 3:4, recadré en 4:5).
- `maison-giraud-600/900.webp` : le mas de Gargas avec son unité au pied du mur latéral et la bordure de lavande.
- `chantier-joucas-600/900.webp` : la cour de Joucas, unité sur consoles près de l'arche, liaisons cuivre vers la cave.

Les marques visibles sur les deux unités ont été floutées. Les sources pleine taille sont dans `medias-sources/`. Les textes alternatifs et le crédit d'en-tête sont à jour. Vérifié à 1440 et 375 : 0 erreur, aucun débordement.

Restent provisoires : `chantier-apt`, `chantier-roussillon`, `sejour-tomettes` (prompts 2, 4 bis et 5). Les vraies photos de Thomas et des chantiers restent à fournir par le client.
