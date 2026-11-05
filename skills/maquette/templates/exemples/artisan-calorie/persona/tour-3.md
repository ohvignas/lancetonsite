# Calorie : boucle persona, tour 3

- Date : 5 novembre 2026
- Page testée : http://127.0.0.1:4339/atelier/skills/maquette/templates/exemples/artisan-calorie/index.html
- Regard indépendant : les rapports du relecteur n'ont pas été lus. Lus : `persona/tour-1.md` (77), `persona/tour-2.md` (75, FIX-1 à FIX-10) et `NOTES.md` § 9 (corrections annoncées).
- Rôles : Thomas Reynaud, patron de Calorie (Apt), qui paie le site ; Martine, 63 ans, mas de 120 m² à Saignon, fioul de 1994, qui découvre la page sur tablette.
- Outils : Chrome piloté par Playwright à 1440 × 900, 375 × 812 et 360 × 740 (tactile), mouvement réduit (1440 et 375), sans WebGL (1440). Scripts et captures dans `persona/captures-tour3/` : `t3.cjs` (parcours, repris du tour 2 avec 5 combinaisons de plus), `densite.cjs` (même méthode qu'au tour 2 : FAQ ouverte, 1,5 s d'attente), `verif.cjs` (bouton du relevé, tableau en électrique, relevé qui tourne, 360), `toit.cjs` (maison fermée), `montage.cjs` (planches). Mesures brutes : `desktop.json`, `sim.json`, `mobile375.json`, `reduit1440.json`, `reduit375.json`, `sanswebgl.json`, `densite.json`, `log-*.txt`. Aucun fichier du site n'a été modifié, rien n'a été envoyé ni généré.

Le document réunit les trois livrables : 1. rapport de test, 2. notes, 3. plan de corrections.

---

## 0. Les FIX du tour 2, un par un

| FIX | Sujet | Statut | Preuve |
|---|---|---|---|
| FIX-1 | Cas « Électrique » + PAC | **Fait** | Graphique réduit à la seule courbe « Radiateurs électriques », sans croisement ni aire du gain (`sim-dix-elec-pac.png`). « Reste à payer : à la visite », titre « Économie estimée par an, une fois le réseau d'eau créé », prix « 15 300 € + réseau », pas de durée (`sim-sim-elec-pac.png`). Tableau : colonne Après « à la visite » sur toutes les lignes (`verif.cjs`, `sim-dix-elec-tableau.png`). Résumé joint : « PAC + ballon, électrique, 120 m², réseau d'eau à chiffrer ». Même chose en PAC seule à 120 et 220 m². Retour sur fioul : la courbe PAC et le point « remboursé en 6,9 ans » reviennent (`sim-dix-retour-martine.png`). |
| FIX-2 | Densité | **Fait** | **773 mots** · 12 sections · 13,7 écrans, même script qu'au tour 2 (`densite.json`). FAQ : 98 → 72 mots. |
| FIX-3 | « Isoler d'abord ? » après 2000 | **Fait** | Gaz 90 m², fioul 60 m², gaz 140 m², fioul 200 m², tous après 2000 : « Pas remboursé en dix ans : maison déjà sobre, la PAC se justifie surtout au remplacement de la chaudière. » Même phrase dans le simulateur et les dix ans (`sim-dix-gaz-recent-sup.png`). Ballon seul : « Pas remboursé en dix ans avec ces réglages. » |
| FIX-4 | Projet dans le résumé | **Fait** | « ballon seul, fioul, 120 m², 440 € d'économie par an » (`sim-form-rempli.png`). |
| FIX-5 | Maison 3D en pierre | **Fait** (réserve légère) | Moellons calcaires, volets bleu-gris, lavandes, tuiles terre cuite (`desktop-maison-fermee.png`, `desktop-defile-02.png`). Réserves : le toit lit plus « tôle ondulée » que tuiles canal (un seul demi-cylindre par rang, sans recouvrement) ; les murs sont en pierre aussi côté chambres. |
| FIX-6 | Bouton du relevé en mouvement réduit | **Fait** | `hidden: true, display: none` (`verif.cjs`, `reduit1440-releve.png`). |
| FIX-7 | kWh qui montent | **Fait** | 27,6 kWh et 2,04 € après 8 s ; seule la température bouge (2,9 → 2,8 °C). |
| FIX-8 | Bande vide de l'équipe | **Partiel** | La photo touche le bord droit, mais le vide est passé au milieu : environ 350 px entre la fin du texte (x ≈ 620) et la photo (x ≈ 976) (`desktop-section-equipe.png`). |
| FIX-9 | Trois photos à générer | Hors périmètre | Pas pénalisé une deuxième fois. |
| FIX-10 | Contenus du client | Hors périmètre | Pas pénalisé une deuxième fois. |

Bilan : 7 faits, 1 partiel, 2 hors périmètre. Les deux défauts majeurs du tour 2 sont réglés.

---

## 1. Rapport de test

### 1.1 Les 5 premières secondes

**Ordinateur** (`desktop-00-5s.png`, `desktop-01-premier-ecran.png`). « Chauffez la maison avec l'air du Luberon. », « Pompes à chaleur et chauffe-eau thermodynamiques, posés par une équipe RGE d'Apt. », le bouton « Simuler mes économies », « Dès 11 900 € posée, avant aides · 412 maisons équipées », et le relevé « un jour de janvier ». Quoi, où, combien, quoi faire : tout est là en un coup d'œil. Le relevé tient : 27,6 kWh, × 3,4, 2,04 €, 4,06 € au fioul.

**Téléphone** (`mobile375-01-premier-ecran.png`, `mobile360-01-premier-ecran.png`) : titre sur 3 lignes, bouton, prix et preuve au-dessus de la ligne de flottaison ; `scrollWidth` = 375 et 360.

### 1.2 Le défilement complet

**Lent, 1440** (`desktop-defile-01` à `12.png`, planche `planche-desktop.png`) :

- **La signature** (`desktop-maison-fermee.png`, `desktop-trajet-0` à `5.png`). Cette fois, c'est une maison d'ici : moellons calcaires, volets bleu-gris, une rangée de lavandes, l'unité sur le pignon à côté de l'arbre. La façade descend, le toit s'ouvre, les flux s'allument dans l'ordre, les 5 repères tombent au bon endroit. C'est le bloc qui vend le métier.
  - Le toit, vu de près : 32 demi-cylindres continus du faîtage à l'égout, sans rangs ni recouvrement. Un couvreur y voit une plaque ondulée, pas des tuiles canal.
  - Une fois ouverte, la maison montre de la pierre aussi à l'intérieur des chambres et du séjour (`desktop-trajet-2.png`). Chez nous, l'intérieur est enduit.
- Offre (`sim-offre.png`) : trois cartes justes, « Offert la première année avec la PAC ».
- Simulateur et dix ans : voir 1.3.
- Étapes : propres.
- Équipe (`desktop-section-equipe.png`) : texte à gauche sur 5 colonnes, photo collée à droite, et entre les deux un trou d'environ 350 px. Le titre dit « Quatre chauffagistes salariés », le texte dit « Ses trois techniciens » : on compte Thomas, mais il faut le deviner.
- Avis, chantiers, FAQ, demande de visite, pied de page : propres. À la demande de visite, la colonne de gauche finit sous les deux puces et laisse un grand vide à côté du formulaire (`sim-form-rempli.png`).

**Rapide** (`desktop-rapide.png`, 40 coups de molette) : rien ne saute, l'épinglage tient.

**Téléphone, 375** (`mobile375-defile-01` à `12.png`, `planche-375.png`) : tout s'empile, pas de débordement, menu `<dialog>` propre, l'ancre « Simulateur » tombe juste (`mobile375-ancre-sim.png`). Barre « Visite technique gratuite » présente hors simulateur et formulaire. Dans la démonstration, une seule étiquette à la fois : celle de l'étape 5, « Ballon de 200 L », passe à gauche du point (bord droit trop proche) et se pose sur le canapé du séjour (`mobile375-trajet-2.png`). Le ballon est dans le cellier : l'œil lit l'étiquette au mauvais endroit.

### 1.3 Le parcours de l'acheteuse : le simulateur, 15 combinaisons

Résultats bruts dans `sim.json`, captures `sim-sim-*.png` et `sim-dix-*.png`.

| Réglages | Économie / an | Prix | Aides | Reste | Retour / message | Jugement du patron |
|---|---|---|---|---|---|---|
| **Martine** : fioul, 120 m², avant 1975, 2 pers., modestes, PAC + ballon | 930 € | 15 300 € | −8 000 € | 7 300 € | 6,9 ans | Facture 2 352 € pour 2 300 € réels ; graphique, résumé et formulaire concordent. |
| Défaut (3 pers.) | 980 € | 15 300 € | −8 000 € | 7 300 € | 6,6 ans | Juste. |
| **Électrique**, 120 m², PAC + ballon | 2 600 € « une fois le réseau d'eau créé » | 15 300 € + réseau | −4 000 € | à la visite | « se chiffre à la visite. Pas de durée de remboursement sans ce chiffre. » | Honnête. Plus de courbe PAC. |
| Électrique, 120 m², 1975-2000, PAC seule, intermédiaires | 1 710 € (même étiquette) | 13 400 € + réseau | −3 000 € | à la visite | idem | Honnête. |
| Électrique, 220 m², 4 pers., supérieurs, PAC seule | 4 450 € (même étiquette) | 15 200 € + réseau | aucune | à la visite | idem | Le chiffre reste grand, mais il est étiqueté et sans retour : acceptable. |
| **Électrique, ballon seul** | 440 € | 3 300 € | −950 € | 2 350 € | 5,0 ans | Juste : le ballon remplace un cumulus. Le cas n'a pas été cassé par la correction. |
| Fioul, ballon seul, 3 pers. (lien de la carte) | 440 € | 3 300 € | −950 € | 2 350 € | 5,0 ans | Juste (`sim-carte-ballon-vers-sim.png`). |
| Fioul, ballon seul, 1 pers., supérieurs | 150 € | 3 300 € | −150 € | 3 150 € | « Pas remboursé en dix ans avec ces réglages. » | Honnête. |
| Fioul, **après 2000**, ballon seul, 1 pers. | 150 € | 3 300 € | −150 € | 3 150 € | idem | Juste : le ballon ne dépend pas de l'isolation. |
| Gaz, 90 m², **après 2000**, supérieurs, PAC seule | 140 € | 11 900 € | −2 500 € | 9 400 € | « maison déjà sobre, la PAC se justifie surtout au remplacement de la chaudière » | C'est ce que je dis en visite. |
| Gaz, 140 m², **après 2000**, 4 pers., modestes | 470 € | 15 300 € | −8 000 € | 7 300 € | idem | Juste. |
| Fioul, 200 m², **après 2000**, intermédiaires | 850 € | 17 100 € | −5 500 € | 11 600 € | idem | Juste (13,6 ans). |
| Fioul, 60 m², **après 2000**, supérieurs | 120 € | 13 800 € | −2 500 € | 11 300 € | idem | Juste. |
| Propane, 160 m², 1975-2000, très modestes | 2 130 € | 15 300 € | −9 000 € | 6 300 € | 2,8 ans | Plausible au prix du propane, aides plafonnées. |
| Retour à Martine après les cas électriques | 930 € | 15 300 € | −8 000 € | 7 300 € | 6,9 ans | L'état se remet bien : courbe PAC, aire et point reviennent. |

**Le cas électrique.** Corrigé comme je le demandais. Il reste deux mots qui grincent dans les dix ans (`sim-dix-elec-pac.png`) : le titre « Dix ans de factures, avant et après » au-dessus d'une seule courbe, et la phrase « Sans réseau d'eau, la courbe après travaux se chiffre à la visite » (on chiffre un réseau, pas une courbe). Léger.

**Autres points du parcours**

- Formulaire envoyé vide (`sim-form-vide.png`) : 4 champs en `aria-invalid`, message, focus sur « Prénom ». Rempli (Martine, Test, Saignon, 06 00 00 00 00, l'après-midi) : « C'est noté, Martine… (exemple : rien n'a été envoyé) » (`sim-form-rempli.png`). Rien n'est parti.
- « Figer le relevé » : 3,0 °C avant et après 2,6 s, le bouton devient « Relancer le relevé ». Quand il tourne, kWh et coût restent cohérents.
- Les chiffres concordent d'un bloc à l'autre : 11 900 € (héros, carte, PAC seule 90 m²), 3 300 € (carte, ballon seul), 180 € et première année offerte (carte, FAQ, calcul), 412 (héros, preuve).

### 1.4 Le clavier (45 tabulations depuis le haut, `desktop.json`)

Évitement, logo, 4 liens, « Visite technique », « Simuler mes économies », « Figer le relevé », pause de la bande, « Pause des flux », les 3 liens du catalogue, les 5 réglages du simulateur, « Faire vérifier ma simulation », « Voir le tableau », les 5 questions, le formulaire (4 champs, créneau, case, bouton), le pied de page (téléphone, courriel, 4 liens, 2 liens légaux), puis retour en haut. Tout est atteint, à l'écran, contour de 3 px brique (blanc sur la FAQ sombre) : `desktop-tab-01`, `-08`, `-12`, `-14`, `-18`, `-22`, `-30`, `-38.png`. Les radios sont à opacité 0, leur pastille porte le contour : correct. (Le contour visible autour du logo sur certaines captures de défilement vient du test clavier qui finit sur lui, pas d'un défaut.)

### 1.5 Le mouvement réduit

- 1440 (`reduit1440-01-premier-ecran.png` = `-01b-…-1500ms.png`, `reduit1440-section-trajet.png`, `reduit1440-releve.png`) : 0 épinglage, relevé figé, bouton masqué, maison en pierre en état final avec ses 5 repères, 0 texte invisible.
- 375 (`reduit375-*.png`, `planche-reduit.png`) : liste numérotée, maison centrée ; les 5 éléments à opacité 0 sont les repères, masqués exprès au téléphone (la liste les remplace).

### 1.6 Sans WebGL

`sanswebgl-section-trajet.png`, `sanswebgl-trajet-1` à `3.png` : le schéma SVG prend le relais, les étapes s'allument, 0 erreur. Le schéma reste une maison générique, ce qui est normal pour un repli.

### 1.7 L'œil du métier

Juste : le barème par surface, les aides MPR + CEE plafonnées, la facture de Martine, le ballon comparé au cumulus, l'entretien offert la première année et compté comme tel, la fonte à 45 °C, −20 °C, le relevé cohérent, l'électrique traité comme je le traite au téléphone (« ça se chiffre chez vous »), la maison récente à qui on ne conseille plus d'isoler, et maintenant un mas en pierre avec ses volets.

Reste bancal, sans gravité :

1. le toit en « plaque ondulée » et la pierre apparente à l'intérieur (`maison.js` l. 151-158, 220-236) ;
2. « Quatre chauffagistes » / « trois techniciens » (`index.html` l. 310-311) ;
3. « Dix ans de factures, avant et après » sur une seule courbe en électrique (`index.html` l. 266, `calorie.js` l. 216) ;
4. l'étiquette « Ballon de 200 L » posée sur le séjour au téléphone ;
5. les photos (Thomas en atelier d'usinage, aucune PAC posée en photo) : hors périmètre, déjà au plafond « médias provisoires ».

### 1.8 La densité (`densite.cjs`, même méthode qu'au tour 2)

**773 mots · 12 sections · 13,7 écrans.** Dans la fourchette (500 à 800 mots, 12 à 18 écrans).

| Bloc | Mots | | Bloc | Mots |
|---|---|---|---|---|
| évitement + en-tête | 12 | | étapes | 38 |
| hero | 71 | | équipe | 30 |
| preuve | 45 | | avis | 51 |
| trajet | 66 | | chantiers | 54 |
| offre | 69 | | questions | 72 |
| simulateur | 86 | | devis | 52 |
| dix ans | 73 | | pied de page | 54 |

Contrôles : mouvement réduit 1440, 767 mots ; 375, 725 à 763 selon l'animation des réponses. Aucun bloc de plus de 3 phrases. Marge de 27 mots : à surveiller si le client ajoute du texte.

### 1.9 Console et réseau

0 erreur, 0 avertissement, 0 requête échouée dans les 6 configurations (`log-*.txt`, champ `erreurs`).

---

## 2. Notes

### Les 10 points

| # | Point | Résultat | Capture | Pourquoi |
|---|---|---|---|---|
| 1 | Page complète | OK | `densite.json` | 773 mots, 12 sections, 13,7 écrans |
| 2 | Catalogue, articles | OK | `sim-offre.png`, `desktop-defile-10.png` | fiches avec prix, aides, action ; chantiers datés |
| 3 | Titres et promesse | OK | `desktop-01-premier-ecran.png` | concrets, dans ma voix |
| 4 | Typographie d'affichage | OK | `desktop-01`, `mobile360-01` | aucun titre cassé |
| 5 | Barre de navigation | OK | `desktop-01`, `mobile375-menu.png` | logo, 4 liens, 1 bouton |
| 6 | Blocs d'action | OK | `sim-form-rempli.png` | simulation jointe avec le projet |
| 7 | Héros équilibré | OK | `desktop-01` | texte, prix, preuve, relevé |
| 8 | Responsive | OK | `mobile375.json`, `mobile360-01-premier-ecran.png` | aucun débordement |
| 9 | Images | **Pas OK** (génération et client) | `desktop-section-equipe.png` | Thomas en atelier d'usinage, aucune PAC posée en photo |
| 10 | 3D | OK | `desktop-maison-fermee.png`, `desktop-trajet-4.png` | un mas d'ici, la coupe explique ; toit à affiner |

### La grille sur 100

| Critère | Tour 1 | Tour 2 | Tour 3 | Pourquoi |
|---|---|---|---|---|
| Direction artistique | 13 | 13 | **14 / 15** | Givre, nuit, braise, mono pour les mesures ; la maison est enfin un mas en pierre du Pays d'Apt. Le toit fait plaque ondulée et la pierre apparaît à l'intérieur. |
| Images | 10 | 11 | **11 / 15** | Coupe 3D et courbes excellentes ; photos au plafond des médias provisoires (Thomas en atelier d'usinage, aucune PAC en photo). Pas compté deux fois. |
| Mise en page | 12 | 13 | **13 / 15** | Le vide de l'équipe a changé de côté sans disparaître (≈ 350 px au milieu) ; colonne gauche de la demande de visite vide sous les puces. |
| Mouvement | 9 | 9 | **10 / 10** | Signature lisible et maintenant juste, relevé figé ou en pause, repli sans WebGL, mouvement réduit complet, bouton masqué. |
| Clarté 5 s et action | 8 | 9 | **9 / 10** | Prix et preuve au premier écran. La note 4,8/5 reste plus bas. |
| Densité | 5 | 0 | **5 / 5** | 773 mots, 12 sections, 13,7 écrans, comptage fourni. |
| Preuves et objections | 6 | 7 | **8 / 10** | Électrique honnête, maison récente bien conseillée, chiffres concordants partout. Plafond « preuves à venir » (avis non liés, RGE fictif). |
| Textes | 8 | 9 | **9 / 10** | Voix tenue, résumé complet. « Quatre chauffagistes / trois techniciens », « avant et après » sur une courbe, « la courbe se chiffre ». |
| Mobile et accessibilité | 6 | 9 | **10 / 10** | Aucun débordement à 375 et 360, tout au clavier avec focus visible, `hidden` respecté, formulaire accessible. |
| Sous-total | 77 | 80 | **89** | |
| Pénalité densité | 0 | −5 | **0** | |
| **Total** | **77** | **75** | **89 / 100** | |

- **Note sur 10 : 8,9.**
- **Seuil qui s'applique : 85** (maquette aux médias provisoires). **Atteint.**
- **Ce qui est atteignable sans le vrai client.**
  - Corrections à 0 $ restantes (équipe, toit et intérieur, deux phrases, étiquette au téléphone, note dans le héros) : environ 90-91.
  - Avec les 3 générations de `medias-a-generer.md` (n° 1, 3 et 4, environ 0,15 à 0,30 $) : « Images » 12-13, soit environ 92.
  - 90 franc à la construction demande le vrai client : sa photo et celle de l'équipe devant une unité, ses chantiers avec l'unité posée, de vrais avis liés à une fiche publique, son numéro RGE, le barème de l'année, et sa décision sur les clients en radiateurs électriques.

> « Là, je reconnais ma maison et mon métier. Le voisin en convecteurs n'est plus trompé : on lui dit que le réseau se chiffre chez lui, et la fiche qui m'arrive le dit aussi. La dame de Saignon retrouve sa facture, le jeune couple d'une maison de 2005 n'entend plus qu'il faut isoler. Il me reste des broutilles : le toit qui fait tôle, le trou à côté de ma photo, et cette photo, justement, qui n'est pas moi. Ça, c'est à moi de l'apporter. »

**Verdict : Oui, ça vaut mes 25 000 €** (pour la maquette, au seuil de 85 ; les 90 de la construction dépendent de mes vraies photos et de mes vrais avis).

---

## 3. Plan de corrections (tour 3)

| FIX | Gravité | Coût | Résumé |
|---|---|---|---|
| FIX-1 | moyen | **génération** environ 0,15 à 0,30 $ | Trois photos : Thomas devant une unité, maison Giraud avec son unité, un chantier avec l'unité posée |
| FIX-2 | moyen | **client** | Vraies photos, vrais avis liés, numéro RGE, barème de l'année, décision sur l'électrique |
| FIX-3 | moyen | **0 $** | Équipe : vide d'environ 350 px entre le texte et la photo à 1440 |
| FIX-4 | léger | **0 $** | Toit : tuiles canal lues comme plaque ondulée ; pierre apparente à l'intérieur |
| FIX-5 | léger | **0 $** | Textes : « Quatre chauffagistes / trois techniciens » ; « avant et après » et « la courbe se chiffre » en électrique |
| FIX-6 | léger | **0 $** | Téléphone : l'étiquette « Ballon de 200 L » se pose sur le séjour |
| FIX-7 | léger | **0 $** | Héros : la note 4,8/5 n'est pas au premier écran |
| FIX-8 | léger | **0 $** | Demande de visite : colonne gauche vide sous les deux puces |

### FIX-1 : trois photos à générer (moyen, génération environ 0,15 à 0,30 $)

Après accord sur le coût : prompts n° 1 (Thomas devant une unité), n° 3 (maison Giraud avec son unité, utilisée dans le relevé et un avis) et n° 4 (un chantier avec l'unité posée) de `medias-a-generer.md`. Remplacer `images/` correspondantes, garder les `alt`.

### FIX-2 : ce que seul le client fournit (moyen, client)

À reporter dans « Ce qui manque encore » : photo de Thomas et des trois techniciens devant une unité, vrais chantiers avec l'unité posée, trois avis réels liés à la fiche publique (et la note 4,8/5 qui la cite), numéro RGE QualiPAC réel (pied de page), barème d'aides de l'année, confirmation de l'entretien offert, et la décision sur les clients en radiateurs électriques (réseau d'eau ou PAC air/air : que vend Calorie ?).

### FIX-3 : le vide de l'équipe (moyen, 0 $)

- **Où.** `calorie.css` l. 299 (`grid-template-columns: 5fr 4fr; gap: 5rem`), l. 302-303 (`max-width: 26rem`, `justify-self: end`).
- **Comment.** Au choix :
  - laisser la photo grandir : `max-width: 32rem` à partir de 1024 px, pour qu'elle remplisse sa colonne ;
  - ou rapprocher le texte de la photo : `grid-template-columns: 1fr 26rem; gap: 4rem`, et `justify-self: end` sur `.equipe-texte` (qui garde `max-width: 36rem`).
- Vérifier à 1440 et 1100 : moins de 120 px entre le texte et la photo.

### FIX-4 : toit et intérieur de la maison (léger, 0 $)

- **Où.** `maison.js` l. 220-236 (tuiles), l. 151-158 et 207-210 (murs).
- **Comment.**
  - Tuiles : couper chaque rang en 8 à 10 tuiles de 0,45 environ, chacune légèrement décalée en hauteur (recouvrement de 0,05) et alterner tuile de courant (creux) et de couvert (bosse) ; garder la couleur terre cuite passée, un ton plus sourd sur le pan avant (`0xb5583a` est plus vif que `0xb7653f`).
  - Murs : passer un tableau de matériaux à `box` pour les murs extérieurs, `pierre` sur la face extérieure et `interieur` (`0xf0ebe3`, déjà défini l. 151) sur la face intérieure.
- Recapturer `desktop-maison-fermee.png` et `desktop-trajet-2.png`.

### FIX-5 : trois phrases (léger, 0 $)

- `index.html` l. 310-311 : « Quatre chauffagistes salariés, aucun sous-traitant » / « Thomas Reynaud a fondé Calorie en 2012… Ses trois techniciens… » devient « Thomas et ses trois techniciens, tous salariés : aucun sous-traitant n'entretient ce qu'ils ont posé. » ou garder le titre et écrire « Thomas et ses trois techniciens entretiennent ce qu'ils ont posé. »
- `calorie.js` l. 216 : « Sans réseau d'eau, la courbe après travaux se chiffre à la visite. » devient « Le réseau d'eau se chiffre à la visite : seule la facture actuelle est tracée. »
- `index.html` l. 266 : en électrique + PAC, passer le titre à « Dix ans de factures aujourd'hui » (à changer en JS, comme `.res-titre` l. 202), ou laisser tel quel si la phrase ci-dessus suffit.

### FIX-6 : étiquette du ballon au téléphone (léger, 0 $)

- **Où.** `maison.js`, boucle des repères (`aGauche`, environ l. 358-360).
- **Comment.** Au téléphone (`tel`), poser l'étiquette au-dessus du point (`y - 44`) plutôt qu'à gauche quand elle déborde à droite, ou décaler l'ancre du ballon vers l'intérieur du cellier. Vérifier `mobile375-trajet-2.png` : l'étiquette doit toucher le cylindre, pas le canapé.

### FIX-7 : la note au premier écran (léger, 0 $)

- **Où.** `index.html` l. 75 (`.hero-rassure`).
- **Comment.** « Dès 11 900 € posée, avant aides<br>412 maisons équipées · 4,8/5 sur 96 avis ». +5 mots, la densité reste sous 800 (778).

### FIX-8 : colonne gauche de la demande de visite (léger, 0 $)

- **Où.** Section `#devis` de `index.html`, et sa grille dans `calorie.css`.
- **Comment.** `align-self: center` sur la colonne de texte, ou y poser un petit rappel de la simulation jointe (sans ajouter plus de 10 mots).

### Retours sur le plugin

- La méthode du tour 2 (attendre 1,5 s après l'ouverture des `<details>`) a donné des chiffres stables d'un tour à l'autre : 841 annoncés avant correction, 773 mesurés après. À garder dans `conventions.md` § 11.
- Le passage d'un vide d'un côté à l'autre (FIX-8 du tour 2) montre qu'un correctif de mise en page doit être revérifié par la mesure (« écart entre les colonnes < 120 px »), pas seulement par la propriété ajoutée.
