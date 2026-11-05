# Vire — exemple « immersif plein écran » (refuge-gîte d'altitude)

Le refuge de la Vire est un refuge gardé fictif à 2 140 m, dans le massif de Belledonne (Isère) : 30 lits, table d'hôtes, accès à pied ou en raquettes. La page vend des nuits en demi-pension aux randonneurs, aux couples en week-end et aux groupes.

La page d'accueil se compose de :
- `index.html` ;
- `cretes.css`, écrit à la main ;
- `paysage.js`, le moteur WebGL ;
- `paysage-page.js`, qui pilote le paysage au défilement ;
- `cretes.js`, qui porte les données, les cartes, le calendrier et le formulaire ;
- `gestes.js`, copie figée du kit, non modifiée.

Exemple fictif, Lance ton site. Tout ce qui suit est inventé :
- le refuge de la Vire, Margaux et Bastien, l'adresse ;
- les chiffres (30 lits, 4,8/5, 312 avis) ;
- les avis et les prix ;
- les disponibilités, calculées au hasard mais de façon stable pour chaque date.

Le massif, le lac des Fées et les noms de lieux servent de décor. Aucun formulaire n'envoie quoi que ce soit. Le cadre du client et des acheteurs est dans `brief.md`.

Composition suivie : **1. Immersif plein écran** (`commun/compositions.md`). La raison pour laquelle l'éditorial n'a pas été retenu est dans `brief.md`.

## Structure du dossier

```
index.html            12 sections, GSAP 3.15 (ScrollTrigger, SplitText), Lenis 1.3.27, Archivo + IBM Plex Mono
cretes.css            tokens, sections, états sans WebGL / mouvement réduit / journée statique
paysage.js            moteur WebGL : shader de crêtes, palette des heures (window.Paysage)
paysage-page.js       défilement → heure et caméra, épinglage de la journée, repli, bouton pause
cretes.js             données REFUGE (chambres, prix, saisons), cartes, menu, nav-pilule, encre, calendrier, formulaire
gestes.js             copie figée de templates/prototype/gestes.js
images/               paysages rendus en code (plan-*, saison-*, vue-*, refuge-dore) + 3 photos du repas reprises
outils/plans.html     rend les images fixes avec le même shader ; outils/plans.cjs les exporte (Playwright + cwebp)
outils/verifier.cjs   vérification Playwright (4 largeurs, mouvement réduit, sans WebGL, densité, titres coupés)
outils/derniere-verification.txt  sortie de la dernière vérification
captures/             captures 1440 / 768 / 375 / 360, journée épinglée (5 temps), mouvement réduit, sans WebGL
brief.md              les gardiens, les acheteurs, les objections, la composition
medias-a-generer.md   photos à produire (gardiens, chambres, table), prompts, coût
prompt-vitrine.json   entrée « hebergement-cretes » pour la vitrine
```

## 1. Direction artistique

**La montagne derrière toute la page.** Un seul fond animé, le paysage WebGL, fixé derrière la page. Les sections « fenêtres » sont transparentes : arrivée, altitude, journée, avis, questions, final. Les sections opaques, comme les nuits, la table et les dates, interrompent le paysage comme on rentre au chaud.

**Palette.**

| Couleur | Valeur | Usage |
|---|---|---|
| Nuit | `#10151d` | fond des sections sombres |
| Neige | `#e8edef` | fond des sections claires ; ce n'est pas du crème |
| Jaune de balise | `#f2c230` | action, heures, repères ; texte nuit dessus |
| Rouge de trait de sentier | `#c8432b` | l'itinéraire seulement |
| Bois | `#3b2a1d` | huisseries, porte |

Les paires texte/fond utilisées passent AA.

**Typographie.**
- Archivo, en axe `wdth` 118 à 125 et en graisse 800, pour les titres larges et grasses.
- IBM Plex Mono pour les heures, altitudes, prix et coordonnées.
- Aucune police de la liste interdite.

**Hero.**
- Aucune pastille, aucun surtitre en capitales espacées, un seul bouton (« Voir les dates libres »).
- Le titre est posé bas sur le paysage : « Dormir à 2 140 m, au-dessus de la brume. »
- En mono, les coordonnées et l'heure du paysage, qui change au défilement.

## 2. Sections (745 à 753 mots selon la largeur, 12 sections)

| # | Section | Geste |
|---|---|---|
| 1 | Arrivée (fenêtre) | `data-intro`, `data-split`, heure vivante |
| 2 | « La route s'arrête. Le sentier commence. » 2 140 m · 760 m · 2 h 30 · 30 lits (fenêtre) | compteurs du kit (`data-counter`) |
| 3 | Une journée là-haut (fenêtre, **seule section épinglée**) | **signature** : la caméra avance, 4 moments datés, horloge, rail |
| 4 | Les nuits : 4 cartes avec vue par la fenêtre, coupe SVG de la chambre (lits visibles), prix nuit seule et demi-pension, tarif groupe au dortoir | **projecteur-cartes**, cartes rendues depuis `REFUGE` |
| 5 | La table : menu du soir, 3 photos | `data-image-reveal`, menu rendu depuis `REFUGE.menu` |
| 6 | Le même sentier, deux saisons | **revele-encre** été → hiver, bouton « Montrer l'hiver », dates des saisons |
| 7 | Venir : profil SVG du sentier (Pré Long 1 380, lac des Fées 1 920, refuge 2 140, 6,2 km) et 4 étapes | le sentier se trace au défilement (`clip-path` scrub) |
| 8 | Avis : 4,8/5, 312 avis, 3 citations sur verre (fenêtre) | compteur décimal |
| 9 | Les gardiens | image de refuge rendue en code + dessin SVG du refuge, `data-prompt` pour le vrai portrait |
| 10 | Choisissez vos dates, en deux colonnes | calendrier des lits libres, formule, pique-nique, **odomètre du kit** sur le total, validation `aria-invalid` |
| 11 | Avant de monter (fenêtre) | **faq-verre**, 4 questions |
| 12 | « Ce soir, la lampe reste allumée » (fenêtre, nuit) | lits libres du samedi suivant calculés, crête et refuge éclairé en SVG |

**Navigation.** C'est une **nav-pilule** : 4 liens (Les nuits, La table, Saisons, Venir) et l'action « Réserver ». Sur téléphone, elle ouvre un menu `<dialog>`. Aucun numéro de téléphone.

**Barre d'action mobile.** Elle passe par `data-sticky-cta` et se masque sur les dates, l'appel final et le pied de page.

**Pied de page.** Il donne l'adresse, les saisons, le plan du site, la mention « exemple fictif » et les crédits photo.

## 3. Le moment signature : le paysage de crêtes

### Moteur (`paysage.js`)

C'est un shader plein écran ; la piste de départ était `fonds-hero/brume-shader.html`.

**Plans et relief.**
- Sept plans de profondeur sont recyclés pendant que la caméra avance : `D = k − fract(cz)`, échelle `0,34 / D`.
- Le relief de chaque crête est un fbm « ridged ». Le fond de vallée suit un chemin sinueux, et les sommets s'élèvent loin de l'axe.
- Une chaîne lointaine reste fixe.

**Lumière et atmosphère.**
- Perspective aérienne.
- Liseré de lumière sur les crêtes face au soleil.
- Faces éclairées selon la pente.
- Neige en option.
- Bandes de brume qui dérivent.
- Étoiles la nuit.
- Disque et halo du soleil.

**Heure du jour.** La palette est interpolée en JavaScript entre six clés : aube, lever, midi, doré, coucher, nuit. Ces clés pilotent le ciel, le soleil, la brume et le liseré.

**Parallaxe.** Les plans proches défilent plus vite que les lointains. La souris décale aussi la caméra.

### Pilotage (`paysage-page.js`)

**Défilement.** Le défilement donne l'heure par morceaux linéaires :

| Moment du défilement | Heure du paysage |
|---|---|
| Haut de page | aube |
| Début de la journée épinglée | lever |
| Pendant l'épinglage | une seule journée de juillet : lever 6 h 15, pique-nique 12 h 30, soupe 19 h 00, coucher 21 h 20 ; l'horloge affiche exactement l'heure de la carte active |
| Questions | brune |
| Appel final | nuit |

La caméra avance de 2,6 plans pendant l'épinglage. L'horloge et les 4 moments sont synchronisés sur la même table d'heures.

**Économie.**
- Rendu à environ 0,6 de la résolution.
- Dessin seulement si une section fenêtre est visible et si l'état a changé.
- Arrêt quand l'onglet est caché.

**Garde-fous.**

| Situation | Ce qui se passe |
|---|---|
| Brume qui dérive seule | bouton « Figer la brume » (`aria-pressed`, WCAG 2.2.2) |
| Pas de WebGL ou contexte perdu | images fixes du **même** shader (`images/plan-*`, 1600 et 720 px), celle de l'heure la plus proche, classe `sans-webgl` |
| Mouvement réduit | pas d'épinglage ni de dérive ; caméra fixe ; heure quantifiée en 5 états changés sans fondu ; bouton pause masqué ; la journée devient une grille de 4 cartes illustrées |

## 4. GSAP (skills gsap-core, gsap-scrolltrigger, gsap-timeline, gsap-performance)

- `gsap.matchMedia()` sépare deux conditions : ordinateur (`min-width: 768px`) et téléphone (`max-width: 767px`), chacune avec `prefers-reduced-motion: no-preference`. Le nettoyage est automatique au changement de condition et retire la classe `journee-animee`.
- La timeline a `scrub: true`. Elle n'anime que des transforms et l'opacité (`autoAlpha`, `y`, `scaleX`), plus le `clip-path` du sentier.
- `ScrollTrigger.refresh()` est relancé après le chargement de chaque image, avec un délai de 200 ms. Le kit le relance aussi au `load` et après les polices.
- La page n'a qu'**un seul épinglage** (`+=200%` sur ordinateur, `+=150%` sur téléphone).

## 5. Images

| Fichier | Source | Crédit |
|---|---|---|
| `plan-*`, `saison-*`, `vue-*`, `refuge-dore-1400` | rendus en code par `paysage.js` (`outils/plans.cjs`) | — |
| `veloute-640/1200` | exemple Sillon | shibani Mishra / Unsplash |
| `miche-640` | exemple Odette | image générée FLUX.2 Pro |
| `avis-salle-600/1000` | exemple Sablon | image générée FLUX.2 Pro |

Il n'y a eu aucune génération et aucun téléchargement. Les cartes des chambres et toutes les photos portent `data-prompt` et `data-ratio` : cela fait 4 chambres, 1 portrait et 3 photos de table. Voir `medias-a-generer.md`.

## 6. Vérification

`outils/verifier.cjs` (Playwright et Chrome) contrôle les points suivants :
- largeurs 1440, 768, 375 et 360 ;
- erreurs console et requêtes échouées ;
- débordement horizontal ;
- captures de chaque section et de la journée épinglée en 5 temps ;
- pleine page ;
- densité (conventions § 11) et titres coupés au trait d'union (§ 12) ;
- mouvement réduit : deux captures prises à 1,2 s d'intervalle doivent être identiques, sans épinglage, avec le bouton masqué ;
- `--disable-webgl --disable-3d-apis`.

Résultats de la dernière passe : `outils/derniere-verification.txt`.

**Note sur le serveur.** Le `python3 -m http.server` partagé coupait des connexions (`ERR_CONNECTION_RESET`) sous la charge de Chrome, avec une file d'attente de 5. La vérification finale tourne donc sur un serveur statique dont la file est à 256. La page elle-même ne fait aucune requête en double.

## 7. Limites connues

**Contenu.**
- Les vues des chambres sont des paysages par la fenêtre, pas l'intérieur des chambres. Les photos des gardiens, des chambres et de la table restent à produire (`medias-a-generer.md`).
- Les trois photos du repas viennent d'autres exemples : la lumière est proche, mais le lieu n'est pas le même.

**Moteur et rendu.**
- Le shader reste coûteux sur les très vieux téléphones. L'échelle de rendu est fixe à environ 0,6 et ne s'adapte pas au nombre d'images par seconde.
- Les captures headless sont faites sous ANGLE Metal. Les couleurs WebGL peuvent légèrement différer d'un GPU à l'autre.

**Données.**
- Les disponibilités sont simulées : un hachage de la date plus les règles de saison. Le calendrier ne propose que les dates gardées.
- La densité compte les numéros du calendrier comme des mots, autour de 60 dans la section dates. Le texte réellement lu est donc plus proche de 690 mots.

## 8. Tour 1 du client-persona (80/100) : corrections appliquées

| FIX | Correction |
|---|---|
| 1 | Bouton final : `.final-texte` en `align-content: center`, le bouton garde 52 px |
| 2 | Un seul jour de juillet (6 h 15, 12 h 30, 19 h 00, 21 h 20), titre « Un jour de juillet, du lever au coucher » ; l'horloge se cale exactement sur l'heure de chaque carte |
| 3 | Coupe SVG de chaque chambre sous la fenêtre : couchettes sur deux niveaux, rideaux, casiers (dortoir), lits superposés, lit de 140 et tables de nuit ; « couchettes de 80 cm, rideau occultant » |
| 4 | Refuge redessiné : pierres en assises irrégulières avec chaînage d'angle, toit de lauzes en écailles, terrasse, deux silhouettes de gardiens |
| 5 | Titre final calculé : « Ce soir, la lampe reste allumée » si le refuge est gardé ce soir, sinon « On rallume la lampe le 19 décembre » (prochaine ouverture) |
| 6 | Arrhes chiffrées sous le total (30 %, reste au refuge), colonne gauche collante et remplie, total répété dans le bouton d'envoi |
| 7 | 5ᵉ question « Y a-t-il une douche ? » (jetons 3 €, source, toilettes sèches) ; tarif groupe fictif au dortoir (52 € en demi-pension dès 10) |
| 8 | Téléphone : la pastille « Figer la brume » ne s'affiche que sur l'arrivée, l'altitude et la journée ; la brume ne dérive plus ailleurs (WCAG 2.2.2 tenue) |
| 9 | « Où dormir » sur toute la largeur sous 520 px (`label:first-of-type`), libellé court dans le menu |
| 10 | `aria-invalid` posé champ par champ (plus de faux positif sur Nom) |
| 11 | Nombre de lits libres écrit dans chaque case du calendrier et en pastille sous le total |
| 12 | « 2 h 30 l'été, 3 h 30 en raquettes » (étape 3, FAQ, chiffres) ; carte Hiver : Margaux donne la neige et le risque d'avalanche l'avant-veille |
| 13 | Section altitude ramenée à 78svh |
| 14 | Été rendu en lumière dorée et plus saturé, sentier tracé en pointillé rouge sur les deux saisons |
| 16 | Calendrier : un seul arrêt de tabulation, flèches pour changer de jour |
| texte | « à dos d'homme » remplacé : l'hélicoptère monte les réserves en juin, le reste arrive à pied |

Restent pour le client (FIX-15) : source des avis, vraies photos (chambres, gardiens, table), tarif de groupe et règle de la douche réels.

## 9. Tour 2 du client-persona (85/100, « oui, ça vaut 25 000 € ») : corrections appliquées

| FIX | Correction |
|---|---|
| 17 | Tarif de groupe appliqué : `groupe: { des: 10, dp: 52 }` sur le dortoir, utilisé par `majTotal` en demi-pension dès 10 (12 personnes, 1 nuit : 624 € et non 696 €) ; le récapitulatif écrit « demi-pension au tarif groupe (52 €) ». En nuit seule, pas de tarif groupe (à confirmer avec le client) |
| 18 | Bouton d'envoi en deux blocs insécables, « Demander ces nuits » et « · 624 € → », avec des espaces insécables autour du prix. S'il faut couper, la coupure tombe entre les deux blocs. Sous 520 px, le bouton prend toute la largeur. Résultat : une ligne et 52 px de haut à 375 et à 360 |
| 19 | La pastille ne compte une section du haut (arrivée, altitude, journée) que si celle-ci occupe la moitié haute de l'écran sous la barre (second `IntersectionObserver`, `rootMargin: -90px 0px -50% 0px`). Elle est donc cachée sur « Quatre façons de dormir » |
| 20 | `.brume-loin .pause-brume { display: none }` vaut à toutes les largeurs. La brume ne dérive que là où la pastille est visible, donc WCAG 2.2.2 reste tenue |
| 21 | Profil du sentier sous 600 px : texte à 20 unités (environ 11 px à l'écran). Seuls restent les trois repères et « 6,2 km » ; l'étiquette du lac est décalée pour ne plus toucher le tracé |
| 22 | Les gardiens sont dessinés au premier plan, 1,5 fois plus grands : le bâton de Margaux, le tablier de Bastien. Une légende en mono dit « Margaux et Bastien, terrasse, juillet ». Les petites silhouettes du symbole sont masquées sur ce dessin |
| 23 | Mouvement réduit : l'heure affichée est celle de la carte du moment (6 h 15 sur le hero, et non 7 h 18) |
| 24 | Refuge fermé ce soir : le titre devient « Le soir, à la grande table » et la fenêtre du refuge dessiné dans l'appel final est éteinte (`#3b2a1d`, sans lueur). Elle se rallume au survol ou au focus de « Réserver mes nuits » |

Vérification sur http://127.0.0.1:4339/ : à 1440, 768, 375 et 360, 0 erreur console, 0 px de débordement, 740 à 755 mots, 12 sections et aucun titre coupé. En mouvement réduit, les captures restent identiques, il n'y a aucun épinglage et la pastille est cachée. Sans WebGL, la page est complète, sans erreur. Restent pour le client : FIX-15 (portrait, photos, source des avis, tarif de groupe et règle de la douche réels).
