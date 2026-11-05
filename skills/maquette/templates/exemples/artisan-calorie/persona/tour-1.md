# Calorie : boucle persona, tour 1

- Date : 5 novembre 2026
- Page testée : http://localhost:4320/atelier/skills/maquette/templates/exemples/artisan-calorie/index.html
- Regard indépendant : les rapports du relecteur n'ont pas été lus. Aucun `fix-plan.md` précédent (tour 1).
- Rôles : Thomas Reynaud, patron de Calorie (Apt), qui paie le site ; Martine, 63 ans, mas de 120 m² à Saignon, fioul de 1994, qui découvre la page sur tablette.
- Outils : Chrome piloté par Playwright, à 1440 × 900, 1280 × 800, 768 × 1024, 375 × 812 et 360 × 740 (mobile tactile), mouvement réduit, sans WebGL. Captures dans `persona/captures/`, mesures brutes dans `persona/captures/t1.json` et `t3.json`. Aucun fichier du site n'a été modifié.

Le document réunit les trois livrables : 1. rapport de test, 2. notes, 3. plan de corrections.

---

## 1. Rapport de test

### 1.1 Les 5 premières secondes

**Ordinateur** (`captures/01-1440-premier-ecran.png`). Je vois tout de suite ce qu'on vend (pompes à chaleur et chauffe-eau thermodynamiques), où (Luberon, équipe RGE d'Apt) et quoi faire (« Simuler mes économies », plus « Visite technique » en haut à droite). Le relevé de la maison Giraud qui bouge vit vraiment : on est chez un chauffagiste, pas chez un vendeur de rêve. Il manque deux choses à Martine dans ces 5 secondes : **un prix** (« dès 11 900 € » n'apparaît qu'à la section 4) et **une preuve de confiance** (412 maisons, 4,8/5 : il faut défiler). Sa première objection est la confiance, et l'écran ne lui répond que par « RGE ».

**Téléphone** (`40-375-premier-ecran.png`, `40-360-premier-ecran.png`). Titre sur 3 lignes, sans lettres collées, bouton visible au-dessus de la ligne de flottaison. À 360, « Maison Giraud · Gargas » se casse sur 3 lignes et le point médian se retrouve seul en début de ligne.

### 1.2 Le défilement complet

Lent, à 1440 (`02` à `17-1440-*.png`) :

- **Preuve** (`02`) : photo du village perché, 412 / 4,8 / 48 h, RGE QualiPAC, décennale, bande des communes avec bouton pause. Propre.
- **Moment signature, la maison en coupe** (`03`, `04`, `05`, `06`, `07`) : il marche. La façade descend, le toit bascule, les flux s'allument dans l'ordre, les repères arrivent un par un, et ils finissent tous lisibles (`07`). C'est exactement ce que je voulais : qu'un retraité de Saignon comprenne en une minute comment l'air chauffe sa maison. Deux réserves de métier : la maison ressemble à un pavillon crépi aux tuiles plates, pas à un mas en pierre, et une fois le toit basculé, son dessous fait une grande dalle rouge vif au-dessus des chambres (`07`).
- **Offre** (`08`) : trois cartes avec prix, aides et lien. Le titre dit « Trois équipements », or la troisième carte est un contrat d'entretien. L'entretien est « Offert la première année » sur la carte, alors que le simulateur le facture 180 € dès l'an 1 et que la FAQ dit « 180 € par an ».
- **Simulateur** (`09`) : clair, lisible, chiffres alignés. Voir 1.3 pour ce qu'il calcule.
- **Dix ans** (`10`, `54`) : les courbes se tracent à l'entrée, le point « remboursé en 7,0 ans » arrive, l'aire de gain est juste. Le tableau équivalent s'ouvre (`55`). Très bien.
- **Étapes** (`11`) : cinq étapes datées, nettes. La photo montre une façade, pas la visite.
- **Équipe** (`12`) : le titre est collé en bas d'une colonne vide, avec un grand blanc au-dessus et entre texte et photo. Et la photo de « Thomas » est prise dans un atelier d'usinage, lunettes de protection sur le front, tablette durcie jaune : en trois secondes, ce n'est pas un chauffagiste.
- **Avis** (`13`) : bonne hiérarchie (Martine en grand, chiffres concrets). Mais la photo du séjour de Bonnieux montre **un poêle à bois** au centre de l'image, sous un avis client d'un installateur de pompes à chaleur. Et les cartes 2 et 3 ont 200 px de blanc sous la citation.
- **Chantiers** (`14`) : datés, avec lieu, titre et chapeau, donc conformes. Mais aucune des trois photos ne montre une pompe à chaleur ou un ballon : une arche, une façade, une porte. Le titre de chaque carte est un lien qui renvoie à `#chantiers`, soit à la section où l'on est déjà.
- **Questions** (`15`) : faq-verre lisible, réponses courtes.
- **Demande de visite** (`16`, `57`) : deux colonnes, réassurance à gauche, formulaire à droite, simulation jointe. Le numéro de téléphone n'apparaît qu'au pied de page. Conforme.
- **Pied de page** (`17`) : adresse, horaires, téléphone, courriel, plan du site, cadre légal, mention fictive. Complet.

Rapide (`30-1440-defilement-rapide.png`, 40 coups de molette) : rien ne saute, l'épinglage tient, la barre de navigation ne clignote pas.

Téléphone, 10 captures à 375 et à 360 (`41-375-defile-01` à `10`, `42-360-defile-01` à `10`) : tout s'empile proprement. Sur la démonstration épinglée (`41-375-defile-02`), on voit environ 180 px de vide entre la maison et le cartouche de texte. La barre « Visite technique gratuite » apparaît et disparaît comme prévu (cachée au simulateur et au formulaire).

### 1.3 Le parcours de l'acheteuse

- Menu de navigation, « Simulateur » (`50`) : l'ancre tombe à 200 px du haut à 1440, sans être masquée par la barre. Au téléphone, menu `<dialog>` propre (`43-375-menu.png`), puis l'ancre tombe à 72 px (`58`) : juste sous la pilule, ça passe.
- **La simulation de Martine** (fioul, 120 m², avant 1975, 2 personnes, revenus modestes, PAC + ballon ; `52`) : facture actuelle **2 352 €/an**, alors qu'elle paie 2 300 €. Ça tombe juste et ça la mettrait en confiance. Économie 930 €/an, prix posé 15 300 €, aides 8 000 €, reste 7 300 €, remboursé en 7,0 ans. **Les chiffres concordent d'un bloc à l'autre** : le résumé des dix ans (« Remboursée en 7,0 ans, puis 3 629 € gagnés »), le graphique (point à 7,0 ans), le tableau et la ligne « Joindre ma simulation : fioul, 120 m², 930 € d'économie par an » disent tous la même chose. Le prix (13 400 + 1 900) suit le barème du brief, et les aides (4 000 + 4 000, plafond de 75 %) aussi.
- Très modestes : aides 9 000 €, la carte dit bien « jusqu'à 9 000 € ». Supérieurs : « Pas remboursé en dix ans » : c'est honnête et je le garde.
- **Carte « Chauffe-eau thermodynamique », lien « Simuler »** (`51`) : le simulateur bascule bien sur « ballon seul », puis affiche **« 50 € » d'économie par an** et **« Pas remboursé en dix ans : isoler d'abord ? »**. C'est faux sur le métier et désastreux pour la vente. Le calcul prend comme base l'eau chauffée au fioul (`calorie.js` l. 48) alors qu'un ballon thermodynamique remplace presque toujours un cumulus électrique (c'est d'ailleurs le chantier de Roussillon : « à la place du cumulus »). Il compte aussi 90 € d'entretien par an pour un ballon (l. 36). Enfin, l'isolation des murs n'a rien à voir avec l'eau chaude.
- **Chauffage actuel « Électrique »** (`53`) : PAC air/eau sans aucun surcoût, aides 0 €, « Remboursé en 5,5 ans » ; à 220 m², **4 710 € d'économie par an, remboursé en 3,5 ans**. Or une PAC air/eau ne se branche pas sur des radiateurs électriques : il faut créer tout un réseau d'eau chaude, et la page dit pourtant « Vos radiateurs restent en place ». C'est exactement le chiffre de démarcheur que je déteste, et il est sur mon site.
- Petits défauts d'affichage : « Aides estimées −0 € » ; le grand chiffre « 4710€ » sans espace des milliers, alors que la liste écrit « 7 045 € » ; « Remboursé » dans le simulateur, « Remboursée » dans le comparatif.
- **Formulaire** : envoyé vide (`56`), il signale les 4 champs en rouge, affiche le message et met le focus sur « Prénom ». Rempli (Martine, Test, Saignon, 06 00 00 00 00, l'après-midi ; `57`), il confirme « C'est noté, Martine. Thomas vous rappelle sous 48 h ouvrées… (exemple : rien n'a été envoyé) ». Rien n'est parti. Le champ « Téléphone ou e-mail » porte `autocomplete="email"`, donc la tablette proposera une adresse électronique là où Martine tape son numéro.
- « Figer le relevé » fige bien les valeurs (3,0 °C avant et après 2,6 s), et le bouton devient « Relancer le relevé ».

### 1.4 Le clavier (45 tabulations depuis le haut)

Le focus est visible partout (contour brique de 3 px, blanc sur fond sombre ; `60-1440-tab-*.png`). L'ordre suit : évitement, logo, 4 liens, bouton, CTA du héros, « Figer », pause de la bande, « Pause des flux », simulateur, « Faire vérifier », tableau, 5 questions, formulaire, pied de page.

**Six liens ne sont jamais atteints** : les trois « Simuler → » / « Le déroulé → » du catalogue, et les trois titres des chantiers. De « Pause des flux », la tabulation saute directement au premier bouton radio du simulateur. Ces cartes sont posées en `autoAlpha: 0` (donc `visibility: hidden`, non focalisables) tant qu'on n'a pas défilé jusqu'à elles (`calorie.js` l. 299). Un visiteur au clavier ne peut donc pas utiliser le catalogue. Vérifié : avant défilement, les 6 cartes sont `vis=hidden op=0`.

### 1.5 Le mouvement réduit

À 1440 (`70-reduit-1440-premier-ecran.png`, `71-reduit-1440-trajet.png`, `-avis`, `-chantiers`) : pas d'épinglage, texte au-dessus, maison en coupe dans son état final avec les 5 repères, rien de caché (0 élément texte à opacité 0). Le relevé du héros est figé. Complet et lisible.
À 375 (`71-reduit-375-trajet.png`) : la maison est rognée à gauche et la barre d'action mobile recouvre les repères « Ballon » et « Module ».

### 1.6 Sans WebGL

`80-sans-webgl-trajet-0/1/2.png` : le schéma SVG prend le relais avec les 5 repères et les étapes qui s'allument. Aucune erreur.

### 1.7 L'œil du métier

- Juste : le prix au m² (13 400 € de 110 à 160 m²), le barème des aides et son plafond, le rendement de ×3,4 à 2,8 °C, les 40 dB à 5 m, « jusqu'à −20 °C », le plancher à 35 °C et les radiateurs à 45 °C, la liaison par la cave, la visite d'une heure, les 2 jours de pose, le dossier d'aides monté par nous. La facture simulée de Martine retombe sur sa vraie facture. Le relevé du héros est cohérent : 46,2 kWh ÷ 3,4 × 0,2516 € = 3,42 €.
- Faux ou bancal :
  1. le simulateur « Électrique » et « ballon seul » (voir 1.3) ;
  2. « 200 litres chauffés par l'air du cellier » (`index.html` l. 172) : dans la formule PAC + ballon intégré, c'est la pompe à chaleur qui chauffe le ballon. Le texte décrit un thermodynamique autonome ;
  3. « la fonte suit très bien » à 45 °C (l. 364) : des radiateurs en fonte dimensionnés pour du fioul à 70 °C donnent nettement moins à 45 °C. Le bon discours est « on calcule pièce par pièce, et on ajoute un radiateur si besoin ». C'est l'objection n° 4 de Martine, et une promesse trop lisse se paie au premier hiver ;
  4. « en direct » sur un relevé « fictif » : en production, il faut soit un vrai relevé connecté d'un client, soit « relevé type d'une journée de janvier ». Autre incohérence, à 9 h les barres totalisent environ 27,6 kWh alors que le compteur affiche 46 kWh ;
  5. images : poêle à bois dans un avis (Bonnieux), un ouvrier d'usine présenté comme Thomas, et aucune photo de pompe à chaleur posée sur toute la page (les 3 chantiers, la vignette du héros, l'étape « visite »).

### 1.8 La densité (script de `conventions.md` § 11, à 1440, après défilement complet)

**772 mots · 12 sections · 13,5 écrans**, dans la fourchette (500 à 800, 10 à 13, 12 à 18). Détail : hero 69, preuve 47, trajet 65, offre 66, simulateur 90, dix-ans 73, étapes 56, équipe 37, avis 51, chantiers 54, questions 38, devis 56, en-tête 9, pied 58. Aucun bloc ne dépasse 3 phrases.
Mesuré sans défiler, on obtient 669 mots, parce que les cartes de l'offre et des chantiers sont encore cachées : la cause est la même que pour le défaut clavier de 1.4.
Toutes les sections attendues du brief sont là, et dans l'ordre.

### 1.9 Console et réseau

0 erreur et 0 avertissement à 1440, 375, 360, 768 et 1280, ainsi qu'en mouvement réduit et sans WebGL. Une seule `requestfailed` sur `chantier-roussillon-600.webp` en mouvement réduit 1440, qui a disparu au rechargement : c'est la coupure connue du serveur local, pas compté.

### 1.10 Responsive

- **375 et 360 : la page déborde de 22 px et de 20 px.** En émulation mobile, `innerWidth` passe à 397 et à 380 et `scrollWidth` suit, ce qui fait dézoomer le téléphone ou défiler la page de côté. La cause est l'image de `.equipe-photo`, agrandie à 125 % avant son apparition (`data-image-reveal`, `gestes.js` l. 337-341), dans une figure sans `overflow` (`calorie.css` l. 299). Vérifié en injectant la règle dans le navigateur seulement : `.equipe-photo{overflow:hidden}` ou `html{overflow-x:clip}` ramènent `innerWidth` et `scrollWidth` à 375.
- Aucun titre ne déborde ni ne se coupe à 1440, 1280, 768, 375 ou 360 (mesuré sur les 18 titres h1 à h3).

---

## 2. Notes

### Les 10 points

| # | Point | Résultat | Capture | Pourquoi |
|---|---|---|---|---|
| 1 | Page complète | OK | densité 1.8 | 12 sections, 772 mots, 13,5 écrans, toutes les sections attendues, aucun bloc de plus de 3 phrases |
| 2 | Catalogue, articles | OK (réserve) | `08`, `14` | fiches avec prix et action, chantiers datés ; mais les liens des chantiers tournent sur eux-mêmes |
| 3 | Titres et promesse | OK (réserve) | `01`, `08` | titres concrets et dans ma voix ; « Trois équipements » est inexact ; la promesse du héros ne chiffre aucun résultat |
| 4 | Typographie d'affichage | OK | `01`, `40-375` | Schibsted Grotesk sans lettres collées, à toutes les tailles |
| 5 | Barre de navigation | OK | `01`, `43-375-menu` | logo, 4 liens, 1 bouton, menu `<dialog>` propre, aucun numéro |
| 6 | Blocs d'action | OK | `16`, `57` | deux colonnes, réassurance et formulaire, pas de numéro en gros |
| 7 | Héros équilibré | OK | `01`, `40-1280` | texte et relevé se répondent, pas de grand vide |
| 8 | Responsive | **Pas OK** | `t1.json` (`over375`, `over360`), `41-375-defile-02` | débordement de 22 px à 375 et de 20 px à 360, vide dans la démonstration au téléphone, « Maison Giraud · » cassé à 360 |
| 9 | Images | **Pas OK** | `12`, `13`, `14` | poêle à bois dans un avis, ouvrier d'usine présenté comme Thomas, aucune PAC sur aucune photo |
| 10 | 3D | OK (réserve) | `07`, `80` | la coupe finit sur l'état complet, les repères sont lisibles et le repli SVG est propre ; la maison fait pavillon plutôt que mas |

### La grille sur 100

| Critère | Note | Pourquoi |
|---|---|---|
| Direction artistique | 13 / 15 | « L'hiver dehors, la chaleur dedans » se reconnaît sans le logo : givre, nuit, braise, chiffres en mono, un seul rouge pour l'action. Cohérent du héros au pied de page. Il manque une texture de pierre ou de lieu dans la 3D pour que ce soit le Luberon et non un pavillon générique. |
| Images | 10 / 15 | Les deux visuels forts sont faits en code et sont excellents (coupe 3D, courbes D3). Les photos provisoires font plus que manquer : le poêle à bois et l'atelier d'usinage contredisent le métier, et aucune image ne montre une PAC posée. |
| Mise en page | 12 / 15 | La composition 7 est suivie : l'outil est au centre, avec des ruptures clair / nuit. Défauts : le bloc équipe (colonne vide, titre collé en bas), les cartes d'avis 2 et 3 à moitié vides, le vide de la démonstration au téléphone. |
| Mouvement | 9 / 10 | La signature fonctionne et explique quelque chose. Relevé vivant avec pause, courbes tracées à l'entrée, compteur, bande avec pause. Mouvement réduit complet, repli sans WebGL propre. |
| Clarté 5 s et action | 8 / 10 | Quoi, où et quoi faire : oui. Ni prix ni preuve de confiance au premier écran. |
| Densité | 5 / 5 | 772 mots, 12 sections, 13,5 écrans, comptage fourni (1.8). |
| Preuves et objections | 6 / 10 | Les 5 objections ont chacune une réponse : confiance (RGE, salariés, aides déduites), froid, reste à charge, travaux, bruit. Mais le simulateur, ma meilleure preuve, sort deux résultats faux (électrique, ballon seul), l'entretien est « offert » ici et payant là, et « en direct » s'affiche sur des données fictives. |
| Textes | 8 / 10 | Phrases courtes, chiffres concrets, « nous » et « Thomas », zéro « éco-responsable ». À corriger : « Trois équipements », « chauffés par l'air du cellier », « la fonte suit très bien », « isoler d'abord ? » sur un chauffe-eau. |
| Mobile et accessibilité | 6 / 10 | Débordement horizontal à 375 et 360, 6 liens inatteignables au clavier, barre mobile sur la maison en mouvement réduit. Le focus est visible partout, la FAQ est accessible et le formulaire gère bien les erreurs. |
| **Total** | **77 / 100** | |

- **Note sur 10 : 7,7.**
- **Seuil qui s'applique : 85** (maquette aux médias provisoires).
- **Ce qui est atteignable sans le vrai client** : environ **87 / 100**. Les corrections à 0 $ (FIX-1 à FIX-4 et FIX-7 à FIX-13) apportent à peu près : preuves +2, mobile et accessibilité +3, mise en page +2, clarté +1, textes +1, images +1 (recadrer le poêle). 90 demande le vrai client : photos de Thomas et de l'équipe devant une unité, chantiers avec l'unité posée, avis réels liés à une fiche publique, barème d'aides de l'année.

> « Le jour où Martine joue avec le simulateur, elle comprend en une minute ce que je mets une heure à expliquer dans sa cuisine, et sa facture de fioul tombe juste. C'est pour ça que je paie. Mais si son voisin en radiateurs électriques lit "remboursé en 3 ans et demi", je deviens le démarcheur que je combats. Et je ne veux pas d'un poêle à bois ni d'un type en usine sur ma page. Corrigez le calcul, et je signe. »

**Verdict : Pas encore.** Raison principale : le simulateur, qui porte la vente, donne deux résultats faux sur le métier (PAC air/eau sur radiateurs électriques sans réseau, ballon seul comparé au fioul).

---

## 3. Plan de corrections

| FIX | Gravité | Coût | Résumé |
|---|---|---|---|
| FIX-1 | majeur | **0 $** | Simulateur « Électrique » : une PAC air/eau sans réseau d'eau, c'est faux, et « remboursé en 3,5 ans » ressemble à du démarchage |
| FIX-2 | majeur | **0 $** | Simulateur « ballon seul » : comparer au cumulus électrique et non au fioul, sans « isoler d'abord ? » |
| FIX-3 | majeur | **0 $** | Clavier : 6 liens (catalogue, chantiers) inatteignables tant qu'on n'a pas défilé |
| FIX-4 | majeur | **0 $** | Débordement horizontal de 22 px à 375 et de 20 px à 360 (`.equipe-photo`) |
| FIX-5 | majeur | **génération** ~0,05 $ (provisoire à 0 $) | Poêle à bois dans l'avis de Bonnieux |
| FIX-6 | moyen | **génération** ~0,05 $, puis **client** | « Thomas » photographié dans un atelier d'usinage |
| FIX-7 | moyen | **0 $** | Entretien « offert la première année » sur la carte, mais payé dès l'an 1 au simulateur et dans la FAQ |
| FIX-8 | moyen | **0 $** | Textes de métier : « air du cellier », « la fonte suit très bien », « Trois équipements » |
| FIX-9 | moyen | **0 $** | Premier écran : ni prix ni preuve ; « en direct » sur des données fictives |
| FIX-10 | moyen | **0 $** | Mise en page : bloc équipe vide, cartes d'avis à moitié vides |
| FIX-11 | moyen | **0 $** | Téléphone : vide dans la démonstration, barre mobile sur la maison en mouvement réduit |
| FIX-12 | moyen | **0 $** liens ; **génération** ~0,10 $ photos ; **client** | Chantiers : liens qui tournent sur eux-mêmes, aucune PAC sur les photos |
| FIX-13 | léger | **0 $** | Finitions d'affichage : « −0 € », « 4710€ », Remboursé/Remboursée, « Maison Giraud · », kWh du relevé, `autocomplete` |
| FIX-14 | moyen | **client** | Vraies photos, vrais avis, numéro RGE, barèmes d'aides de l'année |

### FIX-1 : simulateur « Électrique » (majeur, 0 $)

- **Quoi.** Avec « Électrique », le simulateur vend la même PAC air/eau au même prix et annonce jusqu'à 4 710 €/an et « remboursé en 3,5 ans » (`captures/53-1440-simulation-extreme.png`). Une maison chauffée par des radiateurs électriques n'a pas de circuit d'eau : il faut le créer, ou proposer une PAC air/air.
- **Où.** `index.html` l. 215 (option `elec`) ; `calorie.js` l. 32 (`BAREME.energie.elec`), l. 47-50 (calcul), l. 195 et l. 200-202 (messages).
- **Comment.** Solution la plus simple : retirer « Électrique » des choix (ne garder que fioul, gaz et propane, le cœur de cible du brief). Sinon, garder l'option mais, quand `energie === "elec"` et que le projet contient la PAC, ajouter une ligne « Création du réseau de chauffage : sur visite », ne pas afficher de durée de remboursement, et écrire « Radiateurs électriques : on chiffre le réseau d'eau, ou une PAC air/air, à la visite. »

### FIX-2 : simulateur « ballon seul » (majeur, 0 $)

- **Quoi.** Depuis la carte du chauffe-eau, « Simuler » affiche 50 €/an et « Pas remboursé en dix ans : isoler d'abord ? » (`51-1440-carte-ballon-vers-simulateur.png`). La base est fausse (eau chaude au fioul au lieu d'un cumulus électrique), l'entretien de 90 €/an est excessif pour un ballon, et le conseil d'isoler n'a aucun rapport avec l'eau chaude.
- **Où.** `calorie.js` l. 48 (`eau * prixAvant`), l. 53, l. 36 (`entretien.ballon: 90`), l. 195.
- **Comment.** Pour l'eau chaude « avant », prendre un cumulus électrique (`eau * B.elec / 0,92`) dès que le projet est « ballon seul », ou ajouter un choix « Eau chaude actuelle : cumulus électrique / chaudière ». Passer `entretien.ballon` à 0 (ou à un contrôle tous les deux ans, intégré au contrat). Faire dépendre le message du projet : « isoler d'abord ? » seulement pour la PAC. Avec 3 personnes, l'économie redevient d'environ 380 à 400 €/an, et le ballon se rembourse en 6 ans environ avec les aides des revenus modestes.

### FIX-3 : liens inatteignables au clavier (majeur, 0 $)

- **Quoi.** Les 3 liens du catalogue et les 3 liens des chantiers sont en `visibility: hidden` tant qu'on n'a pas défilé jusqu'à eux : la tabulation les saute (rapport 1.4).
- **Où.** `calorie.js` l. 299 (`gsap.set("[data-apparait]", { autoAlpha: 0, y: 28 })`) et l. 302.
- **Comment.** Animer `opacity` et non `autoAlpha` (`gsap.set(..., { opacity: 0, y: 28 })`, puis `gsap.to(lot, { opacity: 1, y: 0, … })`). Ajouter `[data-apparait]` au gestionnaire `focusin` du kit (`gestes.js` l. 331-336), qui affiche tout de suite un bloc atteint au clavier. À signaler au plugin : tout `autoAlpha: 0` sur un bloc qui contient un lien reproduit ce défaut.

### FIX-4 : débordement horizontal au téléphone (majeur, 0 $)

- **Quoi.** À 375, la page fait 397 px de large ; à 360, 380 px. Le téléphone dézoome ou laisse défiler de côté.
- **Où.** `calorie.css` l. 299 (`.equipe-photo { position: relative; max-width: 26rem; }`), avec le zoom de 1,25 de `data-image-reveal` (`gestes.js` l. 337-341).
- **Comment.** Mettre l'image dans une boîte qui la rogne, par exemple `.equipe-photo { overflow: clip; border-radius: var(--rayon); }`, et sortir `figcaption` de la zone rognée, ou bien envelopper l'`<img>`. Filet de sécurité : `html { overflow-x: clip; }` à côté de la règle `body` de la l. 26. Les deux ont été vérifiés dans le navigateur (`innerWidth` = `scrollWidth` = 375). À signaler au plugin : le geste `data-image-reveal` devrait exiger ou poser lui-même `overflow: clip` sur sa figure.

### FIX-5 : poêle à bois dans un avis (majeur, génération ~0,05 $, provisoire à 0 $)

- **Quoi.** Sous « L'unité est derrière le mur du jardin », la photo montre un poêle à bois (`13-1440-avis.png`, `images/sejour-bonnieux-600.webp`). Pour un installateur de PAC, c'est un contresens immédiat.
- **Où.** `index.html` l. 335.
- **Comment.** Provisoire à 0 $ : recadrer sur la gauche de la pièce (canapé, porte-fenêtre), par exemple `.avis .temoin:nth-child(3) img { object-position: 15% 70%; scale: 1.6; transform-origin: 15% 70%; }`, ou bien utiliser une autre photo de la série. Ensuite, générer le prompt n° 5 de `medias-a-generer.md` (radiateur ou plancher sous tomettes) et le passer **en priorité 1**, avant Thomas.

### FIX-6 : la photo de Thomas (moyen, génération ~0,05 $, puis client)

- **Quoi.** Atelier d'usinage, lunettes de protection, tablette durcie (`12-1440-equipe.png`).
- **Où.** `index.html` l. 315.
- **Comment.** Générer le prompt n° 1 de `medias-a-generer.md` (chauffagiste accroupi devant une unité extérieure, au pied d'un mur de pierre), puis remplacer par la vraie photo de Thomas et de l'équipe : le titre annonce « Quatre chauffagistes », il faut les montrer à quatre.

### FIX-7 : l'entretien offert ou payant (moyen, 0 $)

- **Quoi.** La carte dit « Offert la première année », le simulateur compte 180 € dès l'an 1 et la FAQ dit « 180 € par an ». Le brief ne parle pas d'une première année offerte.
- **Où.** `calorie.js` l. 140 (texte de la carte), l. 62 (cumul de l'entretien).
- **Comment.** Écrire sur la carte « Garantie et rendement conservés », ou, si l'offre existe vraiment, ne pas compter l'entretien de l'an 1 dans `calculer()` et le dire dans la FAQ. Une seule règle, partout.

### FIX-8 : textes de métier (moyen, 0 $)

- **Où et comment.**
  - `index.html` l. 172 : « 200 litres chauffés par l'air du cellier » devient « 200 litres chauffés par la pompe à chaleur ». Pour le ballon seul, la carte peut garder « chauffé par l'air du garage ou du cellier ».
  - l. 364 : « Rarement. On vérifie chaque pièce à la visite : la fonte suit très bien. » devient « Rarement. À 45 °C la fonte chauffe moins fort : on calcule chaque pièce à la visite et on ajoute un radiateur si besoin. » (2 phrases.)
  - l. 184 : « Trois équipements, posés et entretenus par nous » devient « Deux appareils et leur entretien, posés par nous » ou « Trois offres, posées et suivies par nous ».

### FIX-9 : premier écran et « en direct » (moyen, 0 $)

- **Quoi.** Pas de prix ni de preuve au premier écran ; « en direct » sur des données fictives.
- **Où.** `index.html` l. 72-76 (sous-titre, réassurance), l. 86 (`en direct`), l. 102.
- **Comment.** Remplacer « Visite technique gratuite » (l. 75) par « Dès 11 900 € posée, aides déduites · 412 maisons équipées depuis 2012 », ou l'ajouter en deuxième ligne. Pour le site réel, « en direct » ne reste que si le relevé est branché sur une vraie installation d'un client consentant ; sinon, écrire « une journée de janvier » à la place de « en direct ».

### FIX-10 : bloc équipe et cartes d'avis (moyen, 0 $)

- **Où.** `calorie.css` l. 295-296 (`.equipe-grille … align-items: end; 7fr 4fr`) ; l. 305-311 (`.avis-grille`, `.temoin`).
- **Comment.** Équipe : `align-items: center` et une colonne de texte plus étroite (`5fr 4fr`), ou une ligne de chiffres ou de portraits (« 4 salariés · 12 ans · 0 sous-traitant ») qui remplit le vide. Avis : dans les cartes étroites, une image plus haute (`aspect-ratio: 3/4`) ou `align-items: start` sur la grille, pour que le blanc ne s'étale pas sous des citations de deux lignes.

### FIX-11 : la démonstration au téléphone (moyen, 0 $)

- **Où.** `calorie.css` l. 185-194 (cartouche `.trajet-texte` au téléphone) et l. 197-205 (mouvement réduit) ; `index.html` l. 422 (`data-sticky-pause="#trajet"`).
- **Comment.** Au téléphone, remonter la caméra ou la scène, ou laisser le cartouche suivre la maison plutôt que rester collé en bas, pour supprimer les environ 180 px de vide (`41-375-defile-02.png`). En mouvement réduit, masquer aussi la barre mobile sur `#trajet`, et centrer la maison (`71-reduit-375-trajet.png` : rognée à gauche, repères sous la barre).

### FIX-12 : chantiers (moyen ; 0 $ pour les liens, génération ~0,10 $, puis client)

- **Quoi.** Les titres sont des liens vers `#chantiers` (l. 351) et aucune photo ne montre l'équipement posé.
- **Où.** `index.html` l. 347-354 (gabarit), `calorie.js` l. 24-28 (`CHANTIERS`), l. 169.
- **Comment.** Ajouter un `slug` à chaque chantier et faire pointer le lien vers la future page `chantiers/<slug>.html`. En attendant, retirer le lien du `<h3>` pour ne pas promettre un récit absent. Photos : prompts n° 4 de `medias-a-generer.md`, puis les vraies photos de chantier du client.

### FIX-13 : finitions d'affichage (léger, 0 $)

- `calorie.js` l. 193 : afficher « aucune » au lieu de « −0 € » quand `r.aides === 0`.
- l. 188 : garder l'espace des milliers dans l'odomètre (« 4 710 € » comme dans la liste), avec une espace fine insécable plutôt qu'une espace supprimée.
- l. 195 et l. 200 : choisir une seule forme (« Remboursé » ou « Remboursée ») dans le simulateur et le comparatif.
- `calorie.css` l. 114 : à 360, éviter le point médian isolé (« Maison Giraud » et « Gargas » sur deux lignes, sans « · », ou `white-space: nowrap` sur « · Gargas »).
- `calorie.js` l. 92-108 : relevé figé à 9 h, mais « Chaleur du jour » à 46,2 kWh alors que les barres de 0 h à 9 h font environ 27,6 kWh. Mettre environ 27,6 kWh, 2,04 € et « au fioul : 4,06 € », ou bien placer l'heure du relevé en fin de journée.
- `index.html` l. 390 : `autocomplete="email"` sur « Téléphone ou e-mail » ; mettre `autocomplete="on"`, ou séparer les deux champs, ou garder un seul champ « Téléphone » (Martine sera rappelée par téléphone).

### FIX-14 : ce que seul le client peut fournir (moyen, client)

Photos réelles (Thomas et l'équipe devant une unité, 3 chantiers avec l'unité posée, la maison Giraud avec son unité), 3 avis réels nommés avec un lien vers la fiche publique, le vrai numéro RGE QualiPAC (l. 416), le barème d'aides de l'année, la règle réelle de l'entretien (FIX-7), un relevé réel si « en direct » est conservé (FIX-9). À noter dans `maquette.md`, « Ce qui manque encore ».

### Retours sur le plugin

- `gestes.js`, `data-image-reveal` (l. 337-341) : le zoom de 1,25 déborde si la figure n'a pas d'`overflow`, d'où un débordement horizontal au téléphone. Le geste devrait poser lui-même `overflow: clip` sur la figure.
- Les apparitions en `autoAlpha: 0` sur un bloc qui contient des liens rendent ces liens inatteignables au clavier : même famille que le défaut de FAQ corrigé en 1.4.2. Le `focusin` du kit ne peut pas rattraper un élément en `visibility: hidden`, qui ne reçoit jamais le focus.
- Le script de densité de `conventions.md` § 11 sous-compte les blocs encore cachés (669 au lieu de 772 ici). Ajouter « défiler jusqu'en bas avant de compter » dans la consigne.
