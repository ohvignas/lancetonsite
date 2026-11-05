# Calorie : boucle persona, tour 2

- Date : 5 novembre 2026
- Page testée : http://127.0.0.1:4339/atelier/skills/maquette/templates/exemples/artisan-calorie/index.html
- Regard indépendant : les rapports du relecteur n'ont pas été lus. Lus : `brief.md`, mon rapport du tour 1 (`persona/tour-1.md`, 77/100, FIX-1 à FIX-14) et `NOTES.md` § 8 (corrections annoncées).
- Rôles : Thomas Reynaud, patron de Calorie (Apt), qui paie le site ; Martine, 63 ans, mas de 120 m² à Saignon, fioul de 1994, qui découvre la page sur tablette puis la montre à son fils.
- Outils : Chrome piloté par Playwright à 1440 × 900, 375 × 812 et 360 × 740 (mobile tactile), mouvement réduit (1440 et 375), sans WebGL (1440). Scripts et captures dans `persona/captures-tour2/` (`t2.cjs` pour le parcours, `densite.cjs` pour le comptage, `faq.cjs`, `rien.cjs`, `btn.cjs` pour les vérifications ponctuelles, `montage.cjs` pour les planches). Mesures brutes : `desktop.json`, `sim.json`, `mobile375.json`, `mobile360.json`, `reduit1440.json`, `reduit375.json`, `sanswebgl.json`, `densite.json`. Aucun fichier du site n'a été modifié, rien n'a été envoyé ni généré.

Le document réunit les trois livrables : 1. rapport de test, 2. notes, 3. plan de corrections.

---

## 0. Les FIX du tour 1, un par un

| FIX | Sujet | Statut | Preuve |
|---|---|---|---|
| FIX-1 | Simulateur « Électrique » | **Partiel** | Le remboursement a disparu, le prix dit « 15 300 € + réseau » et un message renvoie à la visite (`sim-sim-elec-pac.png`). Mais le grand chiffre affiche toujours **2 600 €** par an (4 450 € à 220 m²), « Reste à payer 11 300 € » reste en gras comme un prix final, le résumé joint au formulaire dit « électrique, 120 m², 2 600 € d'économie par an », et surtout **le graphique des dix ans dessine encore les deux courbes qui se croisent vers 4 ans, avec 46 149 € contre 27 154 €** (`sim-dix-elec-pac.png`). Le texte dit « courbes indicatives », l'image dit « remboursé en 4 ans ». Voir 1.3. |
| FIX-2 | Simulateur « ballon seul » | **Fait** | Depuis la carte : 440 €/an, « Remboursé en 5,0 ans », base cumulus électrique, plus de « isoler d'abord ? » (`sim-carte-ballon-vers-sim.png`). |
| FIX-3 | Liens inatteignables au clavier | **Fait** | Les 3 liens du catalogue sont atteints aux tabulations 12 à 14, visibles (opacité 1) et entourés (`desktop-tab-12.png`). Les chantiers n'ont plus de lien. |
| FIX-4 | Débordement au téléphone | **Fait** | `innerWidth` = `scrollWidth` = 375 et 360 (`mobile375.json`, `mobile360.json`). |
| FIX-5 | Poêle à bois dans l'avis | **Fait** (provisoire, 0 $) | Soleil sur tomettes, sans appareil (`desktop-section-avis.png`). |
| FIX-6 | Photo de Thomas | Pas fait (hors périmètre gratuit) | Toujours l'atelier d'usinage (`desktop-section-equipe.png`). |
| FIX-7 | Entretien offert ou payant | **Fait** | Carte, FAQ et calcul disent la même chose ; Martine passe de 7,0 à 6,9 ans, ce qui prouve que l'an 1 est bien offert dans le calcul. |
| FIX-8 | Textes de métier | **Fait** | « chauffés par la pompe à chaleur », la fonte à 45 °C dite honnêtement (`desktop-faq-ouverte.png`), « Deux appareils et leur entretien ». |
| FIX-9 | Premier écran, « en direct » | **Fait** | « Dès 11 900 € posée, avant aides · 412 maisons équipées depuis 2012 », « un jour de janvier » (`desktop-01-premier-ecran.png`). |
| FIX-10 | Bloc équipe, cartes d'avis | **Fait** (équipe : nettement mieux) | Avis équilibrés ; équipe centrée verticalement. Il reste une bande vide à droite de la photo (voir 1.2). |
| FIX-11 | Démonstration au téléphone | **Fait** | Vide réduit (`planche-375-c.png`) ; en mouvement réduit, maison centrée, barre mobile absente (`reduit375-section-trajet.png`). |
| FIX-12 | Chantiers | **Partiel** (prévu) | Liens retirés ; photos sans pompe à chaleur (génération, puis client). |
| FIX-13 | Finitions | **Fait** | « aucune » au lieu de « −0 € », « 2 600 € » et « 4 450 € » avec espace, « Remboursé » partout, « Maison Giraud · Gargas » sur une ligne à 360 (`mobile360-01-premier-ecran.png`), relevé à 27,6 kWh / 2,04 € / 4,06 € au fioul, `autocomplete="on"`. |
| FIX-14 | Ce que seul le client fournit | Pas fait (hors périmètre) | Pas pénalisé une deuxième fois au-delà du plafond « médias provisoires ». |

Bilan : 10 faits, 2 partiels, 2 hors périmètre. Le travail est sérieux.

---

## 1. Rapport de test

### 1.1 Les 5 premières secondes

**Ordinateur** (`desktop-00-5s.png`, `desktop-01-premier-ecran.png`). Ce qu'on vend, où, à quel prix et quoi faire : tout y est maintenant. « Dès 11 900 € posée, avant aides » et « 412 maisons équipées depuis 2012 » à côté du bouton répondent aux deux manques du tour 1. Le relevé « un jour de janvier, données fictives » est honnête et ses chiffres tiennent : 27,6 kWh ÷ 3,4 × 0,2516 € = 2,04 € ; 27,6 × 0,147 € = 4,06 € au fioul.

**Téléphone** (`mobile375-01-premier-ecran.png`, `mobile360-01-premier-ecran.png`). Titre sur 3 lignes, bouton, prix et preuve au-dessus de la ligne de flottaison, aucun débordement. « Maison Giraud · Gargas » tient sur une ligne à 360.

### 1.2 Le défilement complet

**Lent, 1440** (12 captures : `desktop-defile-01` à `12.png`, planches `planche-desktop-a.png` et `-b.png`) :

- Preuve, bande des communes, puis la **maison en coupe** : la façade descend, les flux s'allument dans l'ordre, les 5 repères finissent lisibles (`desktop-defile-04.png`). La signature marche toujours. Réserve de métier inchangée depuis le tour 1 : murs crème lisses et tuiles plates rouges, on voit un pavillon, pas un mas en pierre du Pays d'Apt.
- Offre (`sim-offre.png`) : trois cartes nettes, prix, aides, « Offert la première année avec la PAC ». Juste.
- Simulateur et dix ans : voir 1.3.
- Étapes, équipe (`desktop-section-equipe.png`) : titre et texte centrés en face de la photo, c'est mieux. Il reste environ 150 px vides entre la photo (max 26 rem) et le bord droit de la grille, et la photo ne montre toujours pas un chauffagiste (FIX-6, hors périmètre).
- Avis (`desktop-section-avis.png`) : trois cartes équilibrées, plus de poêle. La troisième photo est une pièce vide : correcte, mais muette.
- Chantiers, FAQ, demande de visite, pied de page : propres.

**Rapide** (`desktop-rapide.png`, 40 coups de molette) : rien ne saute, l'épinglage tient, la barre ne clignote pas.

**Téléphone, 375** (`mobile375-defile-01` à `12.png`, planches `planche-375-a.png`, `-b.png`, `-c.png`) et **360** (`mobile360-defile-*.png`) : tout s'empile. La démonstration tient dans l'écran, maison en haut et cartouche en bas, sans grand vide. La barre « Visite technique gratuite » disparaît sur la démonstration, le simulateur et le formulaire. Menu `<dialog>` propre (`mobile375-menu.png`) ; l'ancre « Simulateur » tombe sous la pilule, titre lisible (`mobile375-ancre-sim.png`).

### 1.3 Le parcours de l'acheteuse : le simulateur, 10 combinaisons

Résultats bruts dans `sim.json`, captures `sim-sim-*.png` et `sim-dix-*.png`.

| Réglages | Économie / an | Prix | Aides | Reste | Retour | Jugement du patron |
|---|---|---|---|---|---|---|
| **Martine** : fioul, 120 m², avant 1975, 2 pers., modestes, PAC + ballon | 930 € | 15 300 € | −8 000 € | 7 300 € | 6,9 ans | Facture actuelle 2 352 € pour 2 300 € réels : juste. Résumé des dix ans, point du graphique et formulaire concordent (`sim-dix-martine.png`). |
| Réglage par défaut (3 pers.) | 980 € | 15 300 € | −8 000 € | 7 300 € | 6,6 ans | Juste. |
| **Électrique**, 120 m², 2 pers., modestes, PAC + ballon | **2 600 €** | 15 300 € + réseau | −4 000 € | **11 300 €** | aucun, message « se chiffre à la visite » | Voir ci-dessous. |
| Électrique, 220 m², 4 pers., supérieurs, PAC seule | **4 450 €** | 15 200 € + réseau | aucune | 15 200 € | aucun | Le chiffre de démarcheur est toujours en grand. |
| Électrique, ballon seul | 440 € | 3 300 € | −950 € | 2 350 € | 5,0 ans | Juste : un ballon thermodynamique remplace un cumulus. |
| Fioul, ballon seul, 3 pers. (lien de la carte) | 440 € | 3 300 € | −950 € | 2 350 € | 5,0 ans | Juste. |
| Fioul, ballon seul, 1 pers., supérieurs | 150 € | 3 300 € | −150 € | 3 150 € | « Pas remboursé en dix ans avec ces réglages. » | Honnête. |
| Gaz, 90 m², **après 2000**, supérieurs, PAC seule | 140 € | 11 900 € | −2 500 € | 9 400 € | « Pas remboursé en dix ans : **isoler d'abord ?** » | Faux conseil : une maison d'après 2000 est déjà isolée. |
| Propane, 160 m², 1975-2000, 4 pers., très modestes | 2 130 € | 15 300 € | −9 000 € (plafond 90 %) | 6 300 € | 2,8 ans | Plausible pour du propane à 0,21 €/kWh utile ; aides plafonnées comme le brief. |
| Fioul, 60 m², **après 2000**, 1 pers., supérieurs | 120 € | 13 800 € | −2 500 € | 11 300 € | « isoler d'abord ? » | Même faux conseil. |

**Le cas électrique (point demandé).** Le correctif a enlevé la phrase la plus dangereuse (« remboursé en 3,5 ans »), et c'est bien. L'économie annuelle n'est pas absurde en soi : si l'on crée le réseau d'eau, une PAC à SCOP 3,3 coûte bien trois fois moins que des convecteurs. Mais l'écran la présente comme un résultat acquis, au même endroit, à la même taille et dans la même couleur que pour le fioul, sans dire « si le réseau d'eau est créé ». Trois choses font qu'un voisin en convecteurs lira encore une promesse :

1. **Le graphique** (`sim-dix-elec-pac.png`) dessine la courbe de la PAC partant de 11 300 €, qui croise celle des radiateurs vers 4 ans, avec l'aire dorée du gain et « 27 154 € » contre « 46 149 € ». Le point « remboursé » est masqué, mais le croisement se voit à l'œil. La légende dit « hors création du réseau », l'image dit le contraire.
2. **« Reste à payer 11 300 € »** en gras : ce n'est pas ce qui restera à payer, puisque le réseau manque.
3. **Le résumé joint à la demande** : « électrique, 120 m², 2 600 € d'économie par an ». C'est ce que Thomas lira avant d'appeler, et ce que le client croira avoir obtenu.

Verdict du patron : **à moitié corrigé**. Garder le chiffre de l'économie est défendable s'il est étiqueté et s'il n'est pas dessiné comme un retour sur investissement. Sinon, retirer « Électrique » des choix (le cœur de cible du brief, c'est fioul, gaz et propane).

**Autres points du parcours**

- Carte « Chauffe-eau thermodynamique » → « Simuler » : le simulateur bascule sur « ballon seul » et affiche 440 € et 5,0 ans (`sim-carte-ballon-vers-sim.png`). Juste.
- Formulaire envoyé vide (`sim-form-vide.png`) : 4 champs en `aria-invalid`, message, focus sur « Prénom ». Rempli (Martine, Test, Saignon, 06 00 00 00 00, l'après-midi ; `sim-form-rempli.png`) : « C'est noté, Martine… (exemple : rien n'a été envoyé) ». Rien n'est parti.
- Le résumé joint dit « fioul, 120 m², 440 € d'économie par an » **sans le projet** : Thomas ne sait pas s'il rappelle pour un ballon à 3 300 € ou pour une PAC à 15 300 €.
- « Figer le relevé » : la température reste à 2,7 °C après 2,6 s, le bouton devient « Relancer le relevé ». Quand il tourne, le compteur de kWh monte de 0,05 toutes les 1,2 s, mais le coût du jour reste à 2,04 € : au bout d'une minute, 30,1 kWh pour 2,04 €. Détail, mais un chauffagiste le voit.

### 1.4 Le clavier (45 tabulations depuis le haut, `desktop.json`)

Ordre : évitement, logo, 4 liens, « Visite technique », « Simuler mes économies », « Figer le relevé », pause de la bande, « Pause des flux », **les 3 liens du catalogue** (corrigé), les 5 réglages du simulateur, « Faire vérifier ma simulation », « Voir le tableau », les 5 questions, le formulaire (4 champs, créneau, case, bouton), le pied de page (téléphone, courriel, 4 liens, 2 liens légaux). Tout est atteint, à l'écran, avec un contour de 3 px brique (blanc sur la FAQ sombre) : `desktop-tab-01.png`, `-08`, `-12`, `-14`, `-18`, `-22`, `-30`, `-38`. Les boutons radio sont à opacité 0, mais c'est leur pastille qui porte le contour (`desktop-tab-14.png`) : correct.

### 1.5 Le mouvement réduit

- 1440 (`reduit1440-01-premier-ecran.png` et `-01b-…-1500ms.png`, identiques ; `reduit1440-section-trajet.png`) : aucun épinglage, relevé figé, maison en état final avec ses 5 repères, aucun texte invisible (0 élément à opacité < 0,1).
- 375 (`reduit375-section-trajet.png`) : liste numérotée lisible, maison centrée, barre mobile absente. Les 5 repères sont masqués exprès au téléphone (`rien.cjs`), la liste les remplace.
- Un défaut : le bouton du relevé devait être masqué (`btn.hidden = true`, `calorie.js` l. 126), mais `.pause { display: inline-flex }` (`calorie.css` l. 52) l'emporte sur l'attribut `hidden`. On voit donc « **Relancer le relevé** » alors que rien n'a jamais tourné (`reduit1440-releve.png`, mesure : `hidden: true, display: flex`).

### 1.6 Sans WebGL

`sanswebgl-section-trajet.png`, `sanswebgl-trajet-1` à `3.png` : le schéma SVG prend le relais, les étapes s'allument au défilement, 0 erreur, page complète.

### 1.7 L'œil du métier

Juste et rassurant : le barème (prix par tranche de surface, aides MPR + CEE plafonnées), la facture de Martine qui retombe sur la sienne, le ballon comparé au cumulus, l'entretien offert la première année et compté comme tel, la fonte à 45 °C expliquée honnêtement, « jusqu'à −20 °C », 40 dB à cinq mètres, une heure de visite, deux jours de pose, le relevé du héros cohérent.

Reste faux ou bancal :

1. le cas électrique, en image et dans le résumé (1.3) ;
2. « isoler d'abord ? » proposé pour une maison construite après 2000 (`calorie.js` l. 201) ;
3. le résumé joint sans le projet (l. 204) ;
4. la maison 3D : enduit crème et tuiles plates, pas de pierre ni de tuiles canal (`maison.js` l. 129 et 134-139) ;
5. les photos : Thomas dans un atelier d'usinage, et pas une pompe à chaleur posée sur toute la page (hors périmètre gratuit, déjà compté au plafond « médias provisoires »).

### 1.8 La densité (`densite.cjs`, script de `conventions.md` § 11, à 1440, après défilement complet)

**839 mots · 12 sections · 13,7 écrans.**

| Bloc | Mots | | Bloc | Mots |
|---|---|---|---|---|
| évitement + en-tête | 12 | | étapes | 52 |
| hero | 77 | | équipe | 37 |
| preuve | 45 | | avis | 51 |
| trajet | 66 | | chantiers | 54 |
| offre | 70 | | **questions** | **98** |
| simulateur | 90 | | devis | 56 |
| dix ans | 73 | | pied de page | 58 |

**Correction de ma mesure du tour 1.** J'avais compté 772 mots, et `NOTES.md` en annonce 779. Les deux comptages ont manqué les réponses de la FAQ : le script ouvre les `<details>` puis lit le texte dans la foulée, et à cet instant la FAQ (animation de `faq-verre`) n'a pas encore rendu les réponses visibles (`checkVisibility()` faux). Mesuré après 1,5 s d'attente (`faq.cjs`), la section passe de 38 à 98 mots. Le mouvement réduit, où rien n'est animé, donne le même ordre : 836. La page est donc **au-dessus de 800 mots**, et elle l'était déjà au tour 1 (environ 832). Ce n'est pas une régression, mais la grille s'applique : « Densité » à 0 et 5 points de pénalité (tranche entamée au-delà de 800). Il suffit de retirer une quarantaine de mots (FIX-2).

Aucun bloc ne dépasse 3 phrases. Toutes les sections attendues du brief sont là, dans l'ordre.

### 1.9 Console et réseau

0 erreur, 0 avertissement, 0 requête échouée, dans les 7 configurations (1440, 375, 360, mouvement réduit 1440 et 375, sans WebGL, parcours du simulateur).

---

## 2. Notes

### Les 10 points

| # | Point | Résultat | Capture | Pourquoi |
|---|---|---|---|---|
| 1 | Page complète | **Pas OK** (léger) | `densite.json` | 12 sections, 13,7 écrans, toutes les sections attendues, mais 839 mots pour 800 au plus |
| 2 | Catalogue, articles | OK | `sim-offre.png`, `desktop-defile-10.png` | fiches avec prix, aides et action, chantiers datés sans faux liens |
| 3 | Titres et promesse | OK | `desktop-01-premier-ecran.png` | concrets, dans ma voix, « Deux appareils et leur entretien » est exact |
| 4 | Typographie d'affichage | OK | `desktop-01`, `mobile360-01` | Schibsted Grotesk sans lettres collées, aucun titre cassé |
| 5 | Barre de navigation | OK | `desktop-01`, `mobile375-menu.png` | logo, 4 liens, 1 bouton, aucun numéro |
| 6 | Blocs d'action | OK | `sim-form-rempli.png` | deux colonnes, réassurance, formulaire, simulation jointe |
| 7 | Héros équilibré | OK | `desktop-01` | texte, prix, preuve et relevé se répondent |
| 8 | Responsive | OK | `mobile375.json`, `mobile360.json`, `planche-375-*.png` | plus aucun débordement, démonstration lisible |
| 9 | Images | **Pas OK** (client et génération) | `desktop-section-equipe.png`, `desktop-defile-10.png` | Thomas en atelier d'usinage, aucune pompe à chaleur visible ; le poêle a disparu |
| 10 | 3D | OK (réserve) | `desktop-defile-04.png`, `sanswebgl-section-trajet.png` | la coupe explique, le repli est propre ; la maison fait pavillon |

### La grille sur 100

| Critère | Tour 1 | Tour 2 | Pourquoi |
|---|---|---|---|
| Direction artistique | 13 | 13 / 15 | Givre, nuit, braise, mono pour les mesures, un seul rouge pour l'action : reconnaissable sans le logo. La 3D reste un pavillon générique, sans pierre ni tuile canal. |
| Images | 10 | 11 / 15 | Le poêle a disparu. La coupe 3D et les courbes D3 restent excellentes. Mais Thomas est en atelier d'usinage et aucune photo ne montre une PAC : c'est le plafond des médias provisoires, je ne le compte pas deux fois. |
| Mise en page | 12 | 13 / 15 | Avis équilibrés, équipe centrée, démonstration au téléphone resserrée. Reste une bande vide à droite de la photo de l'équipe. |
| Mouvement | 9 | 9 / 10 | Signature lisible, relevé avec pause, courbes à l'entrée, repli sans WebGL, mouvement réduit complet. Le bouton « Relancer le relevé » visible en mouvement réduit est un défaut mineur. |
| Clarté 5 s et action | 8 | 9 / 10 | Prix et preuve au premier écran. Il manque seulement la note 4,8/5, qui reste plus bas. |
| Densité | 5 | **0 / 5** | 839 mots, au-dessus de 800 (voir 1.8 ; mon 5/5 du tour 1 reposait sur un comptage qui oubliait la FAQ). |
| Preuves et objections | 6 | 7 / 10 | Le ballon et l'entretien sont justes, et la facture de Martine tombe juste. Le cas électrique montre encore, en image, un remboursement vers 4 ans et un « reste à payer » faux. « Isoler d'abord ? » s'affiche pour une maison d'après 2000. |
| Textes | 8 | 9 / 10 | Mots du métier justes, promesse chiffrée, voix tenue. Le résumé joint oublie le projet. |
| Mobile et accessibilité | 6 | 9 / 10 | Plus de débordement, tout est atteint au clavier, focus visible, ancres justes. Reste l'attribut `hidden` ignoré sur le bouton du relevé. |
| Sous-total | 77 | 80 | |
| Pénalité densité | 0 | **−5** | plus de 800 mots : une tranche entamée |
| **Total** | **77** | **75 / 100** | |

- **Note sur 10 : 7,5.**
- **Lecture honnête de la baisse.** Hors densité, la page gagne 8 points (72 → 80 sur les autres critères). Avec la même règle de comptage, le tour 1 aurait valu 67. La baisse vient de ma mesure corrigée, pas du travail fait.
- **Seuil qui s'applique : 85** (maquette aux médias provisoires).
- **Ce qui est atteignable sans le vrai client.**
  - Les corrections à 0 $ : densité ramenée sous 800 (+10), cas électrique (+1 en preuves), « isoler d'abord ? » et résumé du projet (+1 en textes, +0,5 en preuves), bouton du relevé et bande vide de l'équipe (+1). On arrive à **environ 87 / 100**.
  - Avec des matières de pierre et des tuiles canal dans la 3D (0 $, code) : environ 88.
  - Avec les 3 générations prioritaires de `medias-a-generer.md` (Thomas devant une unité, maison Giraud avec son unité, un chantier avec l'unité posée ; environ 0,15 à 0,30 $) : environ 89 à 90.
  - 90 franc demande le vrai client : sa photo et celle de l'équipe, ses chantiers, de vrais avis liés à une fiche publique, son numéro RGE et le barème de l'année.

> « Cette fois, je reconnais mon métier. Le ballon est comparé au cumulus, l'entretien est offert partout pareil, la fonte est expliquée comme je l'explique dans les cuisines, et Martine retrouve sa facture au centime près. Il reste une chose qui me gêne vraiment : pour un voisin en convecteurs, la courbe montre encore qu'il est remboursé en quatre ans, et la fiche qui m'arrive dit "2 600 € d'économie". C'est mon nom qui est sur la page. Enlevez ce dessin, raccourcissez la FAQ de quarante mots, et je signe. »

**Verdict : Pas encore.** Raison principale : en « Électrique », le simulateur cache le remboursement dans le texte mais le dessine encore dans le graphique et l'envoie dans le résumé (2 600 €/an, reste à payer 11 300 € sans le réseau). Par ailleurs, la page dépasse 800 mots, ce qui la met sous le seuil (75 pour 85).

---

## 3. Plan de corrections (tour 2)

| FIX | Gravité | Coût | Résumé |
|---|---|---|---|
| FIX-1 | majeur | **0 $** | « Électrique » + PAC : le graphique dessine encore un remboursement vers 4 ans ; « Reste à payer » faux ; 2 600 €/an envoyés dans le résumé |
| FIX-2 | majeur | **0 $** | Densité : 839 mots, il faut en retirer au moins 40 |
| FIX-3 | moyen | **0 $** | « Pas remboursé : isoler d'abord ? » affiché pour une maison construite après 2000 |
| FIX-4 | moyen | **0 $** | Le résumé joint à la demande ne dit pas le projet (ballon seul ou PAC) |
| FIX-5 | moyen | **0 $** | Maison 3D : enduit crème et tuiles plates, ce n'est pas un mas du Luberon |
| FIX-6 | léger | **0 $** | Mouvement réduit : « Relancer le relevé » visible malgré `hidden` |
| FIX-7 | léger | **0 $** | Relevé : les kWh montent, le coût du jour reste figé à 2,04 € |
| FIX-8 | léger | **0 $** | Équipe : bande vide à droite de la photo à 1440 |
| FIX-9 | moyen | **génération** environ 0,15 à 0,30 $ | Photos : Thomas devant une unité, maison Giraud avec son unité, un chantier avec l'unité posée (prompts n° 1, 3 et 4 de `medias-a-generer.md`) |
| FIX-10 | moyen | **client** | Vraies photos (Thomas, équipe, chantiers), vrais avis liés à une fiche publique, numéro RGE réel, barème d'aides de l'année |

### FIX-1 : le cas électrique (majeur, 0 $)

- **Quoi.** Avec « Électrique » et un projet qui contient la PAC, la durée de remboursement est retirée, mais :
  - le graphique trace la courbe de la PAC, son croisement vers 4 ans et l'aire du gain (`sim-dix-elec-pac.png`) ;
  - « Reste à payer 11 300 € » est en gras alors que le réseau d'eau n'est pas compté ;
  - le grand chiffre « 2 600 € » s'affiche sans condition ;
  - le résumé joint dit « électrique, 120 m², 2 600 € d'économie par an ».
- **Où.**
  - `calorie.js` l. 239-270 (`dessiner`) : `lP` (l. 259), `zone` (l. 260), `finP` (l. 264) ;
  - l. 189-192 (grand chiffre) et l. 197 (`reste`) ;
  - l. 204 (résumé du formulaire) ;
  - `index.html` l. 246 (« Économie estimée par an »).
- **Comment.**
  - Solution la plus sûre : retirer `<label>…value="elec"…</label>` (`index.html` l. 215). Le cœur de cible, c'est fioul, gaz et propane.
  - Si on garde l'option, quand `r.reseau` est vrai :
    - dans `dessiner`, mettre `lP`, `zone` et `finP` à `opacity 0` et ne garder que la courbe « Radiateurs électriques », avec la phrase actuelle du résumé ;
    - afficher « à la visite » dans `reste` ;
    - passer le titre du résultat à « Économie estimée par an, une fois le réseau d'eau créé » (le texte de `.res-titre`, à changer en JS) ;
    - écrire dans le résumé joint « électrique, 120 m², réseau d'eau à chiffrer », sans montant.
  - Tester ensuite : électrique et PAC + ballon, électrique et PAC seule, électrique et ballon seul. Ce dernier cas doit rester tel quel (440 €, 5,0 ans).

### FIX-2 : densité, 839 → 800 mots au plus (majeur, 0 $)

- **Quoi.** 839 mots mesurés FAQ ouverte (1.8). Il faut retirer au moins 40 mots, idéalement 50 pour garder de la marge.
- **Où et comment** (environ 50 mots, sans perdre d'argument) :
  - `index.html` l. 367 : « 180 € par an, offert la première année avec la PAC. Il garde la garantie et le rendement. » devient « 180 € par an, offert la première année avec la PAC. » (−7).
  - l. 363 : « Oui, jusqu'à −20 °C. L'appoint électrique sert quelques heures par an. » devient « Oui, jusqu'à −20 °C. » (−8).
  - l. 364 : « Rarement. À 45 °C la fonte chauffe moins fort : on calcule chaque pièce à la visite et on ajoute un radiateur si besoin. » devient « Rarement. On calcule chaque pièce à la visite et on ajoute un radiateur si besoin. » (−6). Le mot « 45 °C » est déjà dans la démonstration.
  - l. 72, sous-titre du héros : « Pompes à chaleur et chauffe-eau thermodynamiques, posés par une équipe RGE d'Apt. » (−4, « aides déduites » est redit au § 11 et dans la FAQ).
  - l. 418, mention du pied de page : « Exemple fictif. Photos : AXP Photography, Rich Martello, Audric Wonkam, Sébastien Jermer, images générées. » (−6).
  - Simulateur et dix ans (90 et 73 mots) : l. 206, « Estimation fictive, sur des barèmes d'exemple. » devient « Barèmes d'exemple. » (−4) ; l. 269 garder tel quel.
  - Étapes l. 298-300 : retirer les trois sous-lignes `<span>` les moins utiles (« Nous montons le dossier. » est redit en FAQ ; −4).
  - Total : environ −39 à −45 ; recompter avec `persona/captures-tour2/densite.cjs`.
- **Retour au plugin.** Le script de `conventions.md` § 11 ouvre les `<details>` et lit `innerText` dans la foulée. Avec `faq-verre`, les réponses ne sont pas encore visibles à cet instant : la FAQ est sous-comptée d'environ 60 mots. Il faut ajouter « attendre 1,5 s après l'ouverture des `<details>` avant de compter », c'est-à-dire séparer le script en deux `evaluate`, avec une attente entre les deux.

### FIX-3 : « isoler d'abord ? » sur une maison récente (moyen, 0 $)

- **Où.** `calorie.js` l. 201.
- **Comment.** Faire dépendre le message de `sim.isolation` :
  - si `isolation === 60` (après 2000) : « Maison déjà sobre : la PAC se justifie surtout au remplacement de la chaudière. » ;
  - sinon, garder « isoler d'abord ? » ;
  - et, dans tous les cas, ne plus afficher deux formules différentes pour le même résultat dans le simulateur et dans les dix ans (l. 210 : « avec ces réglages »).

### FIX-4 : le projet dans le résumé joint (moyen, 0 $)

- **Où.** `calorie.js` l. 203-204.
- **Comment.** Ajouter le projet : `const nomP = { "pac-ballon": "PAC + ballon", pac: "PAC seule", ballon: "ballon seul" }[sim.projet];` puis écrire « ballon seul, fioul, 120 m², 440 € d'économie par an ». C'est la première ligne que Thomas lit avant d'appeler.

### FIX-5 : la maison 3D en pierre (moyen, 0 $)

- **Où.** `maison.js` l. 129 (`enduit = mat(0xe6dfd3)`), l. 134-139 (murs et pignons), l. 181-184 (façade), plus le toit (pans du toit).
- **Comment.**
  - Murs couleur calcaire chaud (`0xcdb89a`) avec une texture de moellons faite en code : un `CanvasTexture` de rectangles irréguliers à joints clairs, sans aucune image.
  - Toit en tuiles canal : des rangées de demi-cylindres, ou une texture à rayures ondulées, couleur terre cuite passée (`0xb7653f`) plutôt qu'un rouge vif.
  - Une génoise de deux rangs sous l'égout.
  - Garder le repli SVG tel quel.

### FIX-6 : bouton du relevé en mouvement réduit (léger, 0 $)

- **Où.** `calorie.css` l. 52 (`.pause { display: inline-flex }`) ; `calorie.js` l. 126.
- **Comment.** Ajouter `.pause[hidden] { display: none; }`. Ou bien laisser le bouton, mais avec le libellé « Lancer le relevé » quand rien n'a encore tourné.

### FIX-7 : relevé, kWh et coût (léger, 0 $)

- **Où.** `calorie.js` l. 116 ; `index.html` l. 99.
- **Comment.** Ne pas faire monter `total` (le relevé est « figé à 9 h »), ou recalculer le coût à chaque pas : `total / cop × 0,2516`, et `total × 0,147` pour le fioul.

### FIX-8 : bande vide de l'équipe (léger, 0 $)

- **Où.** `calorie.css` l. 297-300.
- **Comment.** `justify-self: end` sur `.equipe-photo`, ou `max-width: 30rem`, pour que la photo touche le bord droit de la grille comme les autres sections.

### FIX-9 : trois photos à générer (moyen, génération environ 0,15 à 0,30 $)

Après accord sur le coût, prompts n° 1 (Thomas devant une unité), n° 3 (maison Giraud avec son unité, utilisée deux fois) et n° 4 (un chantier avec l'unité posée) de `medias-a-generer.md`. C'est ce qui ferait passer « Images » de 11 à 12-13.

### FIX-10 : ce que seul le client fournit (moyen, client)

Photo de Thomas et des quatre chauffagistes devant une unité, les vrais chantiers avec l'unité posée, trois avis réels avec lien vers la fiche publique (et la note 4,8/5 qui la cite), le numéro RGE QualiPAC réel (`index.html` l. 416), le barème d'aides de l'année, la confirmation de l'entretien offert la première année, et la décision sur les clients en radiateurs électriques (PAC air/air ou réseau d'eau : qu'est-ce que Calorie vend vraiment ?). À reporter dans « Ce qui manque encore ».

### Retours sur le plugin

- `conventions.md` § 11 : le script de densité sous-compte une FAQ animée (ici 38 mots au lieu de 98). Il faut attendre après `d.open = true`. Sans cette attente, un tour peut donner 5/5 à une page qui dépasse 800 mots.
- Le kit : un `.pause` (ou tout bouton du kit en `display: flex`) ignore l'attribut `hidden`. Une règle `[hidden] { display: none !important; }` dans la base CSS du gabarit éviterait la famille entière.
