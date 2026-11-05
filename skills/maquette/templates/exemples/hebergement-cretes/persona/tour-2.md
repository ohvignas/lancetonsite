# Boucle persona, tour 2 : refuge de la Vire

- Date : 5 novembre 2026
- Page testée : http://127.0.0.1:4339/atelier/skills/maquette/templates/exemples/hebergement-cretes/index.html
- Regard indépendant : je n'ai pas lu les rapports du relecteur. J'ai lu `brief.md` (qui tient lieu de cadrage et de marque), mon rapport du tour 1 (`persona/tour-1.md`) et la table des corrections de `NOTES.md` § 8.
- Navigateur : Chrome (Playwright headless), WebGL actif, puis désactivé (`--disable-webgl --disable-3d-apis`).
- Captures et scripts : `persona/captures-tour2/` (scripts `t1.cjs` à `t4.cjs`, planches `planche-*.png`).
- Contenu fictif assumé (avis, photos, tarifs réels = FIX-15 du tour 1) : il n'est pas pénalisé une deuxième fois.

Ce fichier regroupe les trois livrables : le rapport de test, les notes et le plan de corrections.

---

## 1. Rapport de test

Je suis toujours Margaux Ferrand, gardienne de la Vire. Pour tester, je me mets à la place de Léa et Tom (Grenoble, sur leur téléphone, le soir), puis du président du club de Voiron.

### 1.1 Reprise des FIX du tour 1

| FIX | Statut | Ce que j'ai vérifié |
|---|---|---|
| FIX-1 Bouton final déformé | **Fait** | Pilule normale à 1440 et à 375 (`1440-2-final.png`, `375-final.png`). |
| FIX-2 Horaires du soleil | **Fait** | Un seul jour de juillet : 6 h 15, 12 h 30, 19 h 00, 21 h 20. J'ai échantillonné 21 positions de défilement : l'horloge affiche exactement l'heure de chaque carte quand la carte apparaît (6 h 15 / 6 h 15, 12 h 30 / 12 h 30, 19 h 00 / 19 h 00, 21 h 20 / 21 h 20). Elle file à 21 h 45 en sortie de section : c'est la nuit, ça me va. Les horaires sont plausibles pour la mi-juillet à Grenoble (`1440-102-defil.png`, `1440-103-defil.png`). |
| FIX-3 Montrer un lit | **Fait** (à 0 $) | Chaque carte a sa coupe dessinée : 3 lits superposés, rideaux et casiers pour les Bouquetins, lit de 140 et tables de nuit pour La Vire. « Couchettes de 80 cm, rideau occultant et casier à chaque lit » (`1440-2-nuits.png`). Léa sait enfin à quoi ressemble un lit. La vraie photo reste à faire (FIX-15). |
| FIX-4 Gardiens et refuge | **Partiel** | Le refuge est maintenant une maison de pierre en assises irrégulières, avec un toit de lauzes en écailles : c'est juste. Les deux gardiens ne sont que deux silhouettes de 30 px (`1440-2-gardiens.png`). On ne voit toujours pas un visage : le portrait réel reste au client. |
| FIX-5 « Ce soir, la lampe… » | **Fait** | Le 5 novembre, le titre devient « On rallume la lampe le 19 décembre », suivi de « Il reste 12 lits pour le samedi 19 décembre » (`1440-2-final.png`). Reste un détail : la fenêtre du refuge dessiné est allumée, alors que le refuge est fermé (FIX-24). |
| FIX-6 Arrhes, colonne, total | **Fait, avec une régression à 375** | « dont 70 € d'arrhes (30 %), 162 € au refuge. Remboursées si on ferme pour la météo. » 70 + 162 = 232 €, c'est juste. La colonne gauche est remplie et collante. Le total est repris dans le bouton… mais à 375, ce bouton passe sur deux lignes et le « € » se retrouve seul sous « 232 » (`375-dates-envoi.png`, bouton de 295 × 75 px). Voir FIX-18. |
| FIX-7 Confort et groupes | **Partiel** | La 5ᵉ question « Y a-t-il une douche ? » répond bien (jetons 3 €, source, toilettes sèches) (`46-faq-douche.png`). Le tarif de groupe est annoncé sur la carte du dortoir (« 52 € en demi-pension dès 10 »), mais **le calculateur ne l'applique pas** : 12 personnes au dortoir pour 1 nuit donnent 696 € = 12 × 58, au lieu de 624 € = 12 × 52 (`42-club-12.png`). Voir FIX-17. |
| FIX-8 Pastille sur téléphone | **Partiel** | Elle disparaît bien à partir de la table. Mais quand on arrive en haut des nuits, elle est encore affichée et couvre le titre « Quatre façons » (`375-pastille-nuits.png`, et `planche-375-0.png`, dernière vignette). Mesure : visible à `nuits + 0`, masquée à `nuits + 300`. Voir FIX-19. |
| FIX-9 Menu déroulant tronqué | **Fait** | « Où dormir » prend toute la largeur (293 px) et affiche « Les Bouquetins » en entier (`375-dates-formulaire.png`). |
| FIX-10 `aria-invalid` sur Nom | **Fait** | Avec seulement le prénom vide : `prenom:true`, `nom:false`, `email:false`. |
| FIX-11 Lits libres visibles | **Fait** | Le nombre est écrit dans chaque case du calendrier, et une pastille sous le total indique « 7 lits libres sur tout le séjour · Les Bouquetins » (`1440-2-dates.png`). C'est exactement ce dont je rêvais. |
| FIX-12 L'hiver | **Fait** | « 2 h 30 l'été, 3 h 30 en raquettes » à l'étape 3 et dans la FAQ. La carte Hiver ajoute : « l'avant-veille, Margaux vous dit la neige et le risque d'avalanche ». |
| FIX-13 Vide dans `altitude` | **Fait** (en grande partie) | La section est plus courte et le titre de la journée arrive dans le même écran (`1440-101-defil.png`). |
| FIX-14 Été et hiver | **Fait** | L'été est doré, l'hiver est blanc, et le sentier est tracé en pointillé rouge sur les deux (`1440-2-saisons.png`, `45-hiver.png`). Le contraste se voit enfin. |
| FIX-15 Ce que seul le client fournit | Reste au client | Sans changement, comme prévu. |
| FIX-16 Calendrier au clavier | **Fait** | Un seul arrêt de tabulation (le jour choisi). Les flèches déplacent le focus et Entrée choisit le jour : → puis Entrée fait passer le récapitulatif au dimanche 20 décembre. |
| « À dos d'homme » | **Fait** | « L'hélicoptère monte les réserves en juin, le reste arrive à pied » : c'est vrai chez nous. |

**Bilan des reprises : 12 FIX faits, 3 partiels (4, 7, 8), 1 laissé au client (15).**

### 1.2 Les 5 premières secondes

- **1440** (`1440-00-premier-ecran.png`) : aube rose au-dessus de la brume, « Dormir à 2 140 m, au-dessus de la brume. », puis 30 lits, Belledonne, 2 h 30, « demi-pension dès 58 € » et le bouton jaune « Voir les dates libres ». Quoi, où, combien et quoi faire : tout y est.
- **375** (`375-00-premier-ecran.png`) : même lecture, et le bouton reste au-dessus de la ligne de flottaison.

### 1.3 Défilement complet

- **1440**, 12 captures au fil du défilement (`1440-101` à `1440-112-defil.png`) et une capture par section (`1440-2-*.png`). Le moment signature fonctionne toujours : la caméra traverse la brume, le ciel va de l'aube au coucher et l'horloge tombe juste. Rien ne saute ni ne clignote. Après un défilement rapide (30 × 500 px en 0,5 s, `1440-30-rapide.png`), l'état est propre.
- **375**, même série (`375-1xx-defil.png`, `375-2-*.png`, planches `planche-375-0.png` et `planche-375-1.png`). Aucun débordement horizontal (`scrollWidth` = 375). La barre « Voir les dates libres » apparaît en bas pendant le défilement.
- Deux défauts restent visibles :
  1. **à 1440**, la pastille « Figer la brume » est fixée en bas à droite sur toutes les sections. Elle recouvre la fin du texte de la carte La Vire (« …la Chartreuse », `1440-104-defil.png`) et le bord droit du champ E-mail (`1440-2-dates.png`) ;
  2. **à 375**, le profil du sentier est réduit à 335 px de large : les repères « Pré Long · 1 380 » et « Lac des Fées · 1 920 » font environ 6 px et ne se lisent pas (`planche-375-1.png`, dernière vignette).

### 1.4 Le parcours de l'acheteur

- **Bouton du hero** : on arrive sur `#dates` à 80 px du haut, sous la barre (`40-apres-cta-hero.png`).
- **« Choisir » La Vire** : chambre double, 2 personnes, 2 nuits, 316 € = 2 × 2 × 79. Arrhes 95 €, solde 221 €, « 2 lits libres sur tout le séjour » (`41-apres-choisir-double.png`). Tout concorde.
- **Le club, 12 personnes au dortoir pour 1 nuit** : le calendrier saute le 19 et le 21 décembre (pas assez de lits) et propose le mardi 22, avec 13 lits libres. C'est honnête. Mais le total vaut **696 €** alors que la carte promet **52 € dès 10** : le président du club verra l'écart (`42-club-12.png`). Si on tape 20 personnes, le champ redescend à 14.
- **Léa et Tom**, Le Lauzet, 2 personnes, 1 nuit, juillet 2027, avec le pique-nique : premier samedi le 3 juillet, 4 lits libres, total 150 € = 2 × (66 + 9). Arrhes 45 €, solde 105 € (`43-lea-tom-juillet.png`). C'est juste.
- **Erreurs** : à vide, « Il manque votre prénom, votre nom, un e-mail valide. » Avec seulement le prénom vide : « Il manque votre prénom. », et seul Prénom est marqué invalide.
- **Envoi** : « C'est noté, Léa : … Exemple de démonstration, aucune demande n'est envoyée. » (`44-confirmation.png`).
- **Été et hiver** : « Montrer l'hiver » bascule, puis « Revenir à l'été » (`45-hiver.png`).

### 1.5 Clavier (50 tabulations depuis le haut, à 1440)

Tout est atteint et visible, dans l'ordre : évitement, pastille, logo, 4 liens, Réserver, bouton du hero, 4 « Choisir », « Montrer l'hiver », les 3 champs, les 2 flèches du mois, **un seul jour**, les formules, l'identité, l'envoi, les 5 questions, l'appel final, le pied de page et les liens légaux. Le pied de page est atteint à la 40ᵉ tabulation (contre plus de 45 au tour 1). Le focus est un anneau jaune de 3 px, à l'écran à chaque pas (`50-tab-*.png`, `51-calendrier-fleches.png`).

### 1.6 Mouvement réduit et sans WebGL

- **Mouvement réduit** : la page fait 11 733 px, sans épinglage. La journée devient quatre cartes illustrées et aucun texte ne reste invisible (contrôle d'opacité sur tous les titres, paragraphes et éléments de liste). La pastille est masquée (`60-reduit-hero.png`, `61-reduit-*.png`). Un détail : les coordonnées du hero affichent « 7 h 18 » au lieu de « 6 h 15 » (FIX-23).
- **Sans WebGL** : classe `sans-webgl`, repli en images fixes, journée lisible, console vide (`70-sansgl-hero.png`, `71-sansgl-*.png`, `72-sansgl-375-hero.png`).

### 1.7 L'œil du métier

Ce qui était faux au tour 1 est corrigé : les horaires, « ce soir », « à dos d'homme », la durée en raquettes et le refuge en planches. Ce que je vois encore :

1. **Le tarif de groupe** est annoncé mais non appliqué (FIX-17). Pour un président de club, c'est la première chose qu'il vérifie.
2. **« Ce soir à la grande table »** : le 5 novembre, il n'y a pas de dîner ce soir. Au tour 1, le titre final mentait pendant la fermeture ; c'est maintenant celui de la table qui le fait (FIX-24).
3. **La lampe allumée** dans le dessin final, sous « On rallume la lampe le 19 décembre » : la fenêtre devrait être éteinte (FIX-24).
4. **La table** : le velouté décoré d'un trait de crème et de romarin fait toujours restaurant (FIX-15, photo du client).
5. Ce qui me plaît : les couchettes de 80 cm, la douche à jetons, les toilettes sèches, l'hélicoptère de juin, la neige et le risque d'avalanche dits par Margaux. C'est notre vrai quotidien, avec nos mots.

### 1.8 Densité (conventions § 11, à 1440, page fraîche)

**755 mots · 12 sections · 15,1 écrans.** C'est dans la fourchette (500 à 800 mots, 10 à 13 sections, 12 à 18 écrans).

| Bloc | Mots |
|---|---|
| Évitement, pastille, barre de navigation | 14 |
| `arrivee` | 32 |
| `altitude` | 22 |
| `journee` | 25 |
| `nuits` | 142 |
| `table` | 50 |
| `saisons` | 44 |
| `venir` | 76 |
| `avis` | 61 |
| `gardiens` | 32 |
| `dates` | 138 |
| `questions` | 24 (fermées) |
| `final` | 19 |
| pied de page | 76 |

Attention : après manipulation du calculateur, les textes dynamiques (arrhes, lits libres, confirmation) allongent `dates`, et j'ai mesuré jusqu'à 805 mots. Le comptage officiel se fait sur la page fraîche, donc aucune pénalité. Mais la marge est de 45 mots : ne rien ajouter sans retirer ailleurs. Aucun bloc ne dépasse 3 phrases ; la carte du dortoir en a 2 (« Couchettes… », « Groupes… »).

### 1.9 Console

Elle est vide à 1440, à 375, en mouvement réduit et sans WebGL : aucune erreur JS, aucune ressource en 4xx ni en échec.

---

## 2. Notes

### 2.1 Grille sur 100 (niveau-agence § 6)

| Critère | Points | Tour 1 | Tour 2 | Pourquoi |
|---|---|---|---|---|
| Direction artistique | 15 | 13 | **14** | Nuit ardoise, jaune balise, trait rouge. Les coupes des chambres et le refuge en pierre reprennent le trait du profil du sentier : tout parle la même langue. |
| Images | 15 | 10 | **11** | Les lits sont montrés (coupes), le refuge est juste et l'été se distingue de l'hiver. Mais il n'y a toujours aucun visage chez les gardiens (deux silhouettes de 30 px), et la table fait restaurant. Sans vraies photos, le plafond est vers 12-13. |
| Mise en page | 15 | 12 | **13** | Bouton final réparé, colonne gauche remplie et collante, `altitude` resserrée. Restent : la pastille sur le contenu à 1440, le bouton d'envoi cassé à 375 et le profil illisible à 375. |
| Mouvement | 10 | 8 | **9** | L'horloge tombe pile sur chaque carte et le contraste été / hiver est net. Mouvement réduit et repli sans WebGL exemplaires. |
| Clarté en 5 s et action | 10 | 9 | **9** | Inchangée et très bonne. |
| Densité | 5 | 5 | **5** | 755 mots, 12 sections, 15,1 écrans. |
| Preuves et objections | 10 | 7 | **7** | Les 5 objections sont maintenant traitées : lits visibles, effort (été et raquettes), confort (coupes, douche), total et arrhes, météo. Mais un chiffre se contredit : le tarif de groupe annoncé (52 €) n'est pas celui que calcule le formulaire (58 €). Le critère dit « aucune fausse donnée ». Une fois FIX-17 corrigé : 8, le plafond sans vrais avis. |
| Textes | 10 | 8 | **9** | Les erreurs de métier ont disparu. Reste « Ce soir à la grande table » pendant la fermeture. |
| Mobile, accessibilité, légèreté | 10 | 8 | **8** | Clavier exemplaire (un seul arrêt dans le calendrier), `aria-invalid` juste, menu déroulant réparé. Mais à 375 : la pastille couvre le titre des nuits, le « € » du bouton d'envoi est orphelin et les repères du profil font 6 px. |
| **Total** | **100** | **80** | **85** | |

- **Note sur 10 : 8,5.**
- **Seuil applicable : 85** (maquette avec médias provisoires). **Il est atteint, de justesse.**
- **Atteignable sans le vrai client : environ 88.** Il faut pour cela FIX-17 à FIX-24, tous à 0 $ (groupe +1, mobile +1, mise en page +1). 90 et plus demandent le portrait des gardiens, les photos de la chambre et de la table, et la source des avis (FIX-15).
- **Ce qui bloque 90** : le portrait réel de Margaux et Bastien, la photo de la grande table en mélèze, une photo du dortoir et la plateforme des 312 avis.

> « Cette fois, c'est mon refuge : Léa voit les lits libres du samedi, sait qu'elle paiera 150 € dont 45 € tout de suite, et sait qu'il y a une douche à jetons. Corrigez-moi le prix du club avant que Voiron appelle, et mettez nos têtes à la place des deux bonshommes. »

**Verdict : Oui, ça vaut mes 25 000 €.** C'est un oui pour la maquette : le seuil de 85 est atteint, et je le signe à condition que FIX-17 (prix de groupe) soit corrigé avant de me la présenter, et que les vraies photos (FIX-15) arrivent avant la construction.

---

## 3. Plan de corrections restant

| FIX | Gravité | Coût | Résumé |
|---|---|---|---|
| FIX-17 | majeur | **0 $** | Tarif de groupe annoncé (52 € dès 10) mais non appliqué au total (696 € au lieu de 624 € pour 12) |
| FIX-18 | moyen | **0 $** | Bouton « Demander ces nuits · 232 € » cassé sur deux lignes à 375 et 360, « € » orphelin |
| FIX-19 | moyen | **0 $** | Pastille « Figer la brume » encore affichée sur le titre des nuits à 375 |
| FIX-20 | léger | **0 $** | Pastille fixe sur le contenu à 1440 (carte La Vire, champ E-mail) |
| FIX-21 | léger | **0 $** | Profil du sentier illisible à 375 (repères d'environ 6 px) |
| FIX-22 | léger | **0 $** | Gardiens réduits à deux silhouettes ; à 0 $, grossir et nommer les silhouettes |
| FIX-23 | léger | **0 $** | Heure du hero en mouvement réduit : « 7 h 18 » au lieu de « 6 h 15 » |
| FIX-24 | léger | **0 $** | « Ce soir à la grande table » et la fenêtre allumée pendant la fermeture |
| FIX-15 | majeur pour 90 | **client** (ou **génération**, ~0,25 $ pour les 4 vues intérieures et ~0,10 $ pour un portrait provisoire, avec l'accord de l'utilisateur) | Portrait des gardiens, photos du dortoir et de la grande table, source des avis, tarif de groupe et règle de la douche réels |

### FIX-17 · Tarif de groupe non appliqué

- **Quoi** : la carte du dortoir promet « Groupes : le dortoir entier, 52 € en demi-pension dès 10 ». Pourtant, 12 personnes au dortoir pour 1 nuit donnent 696 € (12 × 58). Le président du club voit deux prix différents (`42-club-12.png`).
- **Où** : `cretes.js`, ligne 198 (`const total = …` dans `majTotal`) ; donnée du dortoir à la ligne 12.
- **Comment** :
  - ajouter au dortoir `groupe: { des: 10, dp: 52 }` dans `REFUGE` ;
  - dans `majTotal`, utiliser `ch.groupe && p >= ch.groupe.des && dp ? ch.groupe.dp : ch.dp` ;
  - écrire « tarif groupe » dans le récapitulatif quand il s'applique ;
  - décider avec le client si le tarif de groupe existe aussi en nuit seule.

### FIX-18 · Bouton d'envoi sur téléphone

- **Quoi** : à 375, le bouton fait 295 × 75 px. « Demander ces / nuits » d'un côté, « · 232 / € » de l'autre (`375-dates-envoi.png`).
- **Où** : `index.html`, ligne 246 ; `cretes.css`, ligne 337 (`.reservation .bouton`) ; texte posé par `cretes.js`, ligne 202.
- **Comment** :
  - mettre `.bouton-total { white-space: nowrap; }` et poser un espace insécable avant « € » dans la ligne 202 (`${euros(total)} €`) ;
  - sous 480 px, donner au bouton `justify-self: stretch` (toute la largeur) pour qu'il tienne sur une ligne ;
  - à défaut, raccourcir en « Demander · 232 € ».

### FIX-19 · Pastille encore visible sur les nuits (375)

- **Quoi** : l'`IntersectionObserver` garde `hautVu` vrai tant qu'un seul pixel de `journee` (ou de son pin-spacer) touche l'écran. La pastille couvre donc le titre « Quatre façons » quand les nuits arrivent en haut (`375-pastille-nuits.png`).
- **Où** : `paysage-page.js`, lignes 93 à 101.
- **Comment** : passer à l'observateur `{ rootMargin: "-90px 0px -50% 0px" }`, pour ne compter une section comme vue que lorsqu'elle occupe la moitié haute sous la barre. Ou bien cacher la pastille dès que `#nuits` passe sous 120 px du haut.

### FIX-20 · Pastille sur le contenu à 1440

- **Quoi** : fixée en bas à droite, elle recouvre la fin du texte de la carte La Vire et le bord du champ E-mail (`1440-104-defil.png`, `1440-2-dates.png`).
- **Où** : `cretes.css`, ligne 62 (la règle `.brume-loin .pause-brume { display: none }` n'existe que sous 767 px).
- **Comment** : appliquer la même règle `.brume-loin` à toutes les largeurs. La brume ne dérive pas sous les sections opaques, donc le bouton n'y sert à rien (WCAG 2.2.2 reste tenue).

### FIX-21 · Profil du sentier à 375

- **Quoi** : la `viewBox` de 620 px est réduite à 335 px, et les textes en 11 px tombent à environ 6 px.
- **Où** : `cretes.css`, ligne 236 (`.profil svg`) ; `index.html`, lignes 159 à 176.
- **Comment** : sous 600 px, passer la police du SVG à 18 px (unités de la `viewBox`), retirer les graduations 1 800 et 3 km, et ne garder que les trois repères. Ou bien faire défiler le profil horizontalement avec `min-width: 560px`.

### FIX-22 · Les gardiens, en attendant la photo

- **Quoi** : deux silhouettes de 30 px sous le titre « Margaux et Bastien… ».
- **Où** : `index.html`, ligne 203 (`.refuge-dessin`) et `symbol#refuge`.
- **Comment** :
  - à 0 $ : agrandir les silhouettes et leur donner un attribut (le tablier de Bastien, le bâton de Margaux) ;
  - ajouter une légende en mono : « Margaux et Bastien, terrasse, juillet » ;
  - **ensuite** : le portrait réel (client), priorité n° 1 de `medias-a-generer.md`.

### FIX-23 · Heure du hero en mouvement réduit

- **Quoi** : les coordonnées du hero affichent « 7 h 18 » en mouvement réduit, et « 6 h 15 » sinon (`60-reduit-hero.png`).
- **Où** : `paysage-page.js`, ligne 22 (`heureHero`) et le calcul de l'heure à l'état initial réduit.
- **Comment** : en mouvement réduit, afficher l'heure de la première carte (6 h 15), ou caler le `tod` initial sur cette heure.

### FIX-24 · « Ce soir » pendant la fermeture

- **Quoi** : « Ce soir à la grande table » alors que le refuge est fermé jusqu'au 19 décembre. Et dans l'appel final, la fenêtre du refuge dessiné est allumée sous « On rallume la lampe le 19 décembre ».
- **Où** : `index.html`, titre `#t-table` ; `cretes.js`, lignes 256 à 262 (titre final calculé) ; le `symbol#refuge` (fenêtre jaune).
- **Comment** :
  - réutiliser `ouvert(aujourdhui)` : si le refuge est fermé, titre « Le soir, à la grande table » et classe `.eteint` sur `.refuge-nuit` ;
  - avec cette classe, la fenêtre passe en `#3b2a1d` ; elle se rallume au survol de « Réserver mes nuits ».

### FIX-15 · Ce que seul le client peut fournir (rappel)

- Le portrait de Margaux et Bastien sur la terrasse.
- Les photos du dortoir (couchettes, rideaux) et de la chambre double.
- La grande table en mélèze avec la soupière.
- La source et le lien des avis (4,8 / 5 · 312).
- Le tarif de groupe réel et la règle réelle de la douche.
- En attendant le client, on peut générer des vues provisoires (environ 0,25 $ pour les 4 chambres), avec l'accord de l'utilisateur.
