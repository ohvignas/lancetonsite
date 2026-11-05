# Ciste : boucle persona, tour 2

- **Date** : 5 novembre 2026
- **Page testée** : http://127.0.0.1:4339/atelier/skills/maquette/templates/exemples/commerce-flacon/index.html
- **Regard indépendant** : je n'ai lu aucun rapport du relecteur. J'ai lu mon rapport du tour 1 (`persona/tour-1.md`), `NOTES.md` § 7 (les corrections annoncées), `brief.md` et le code de la page.
- **Navigateur** : Chrome via Playwright (GPU Metal). J'ai aussi testé Chrome sans WebGL (`--disable-webgl --disable-3d-apis`) et Chrome en mouvement réduit. Scripts et captures dans `persona/captures-tour2/` (`passe1.cjs` pour le défilement, `passe2.cjs` à `passe6.cjs` pour le parcours, le clavier, le mode réduit, le mode sans WebGL et les formulaires).
- **Qui parle** : Mireille Aubanel, nez et patronne de Ciste, qui a payé 25 000 €. Je joue aussi l'acheteuse : 40 ans, elle découvre la maison sur Instagram, téléphone en main, et se demande « à quoi ça sent avant de payer 130 € ».
- **Hors périmètre, pas pénalisé deux fois** : FIX-14 (photos du journal à générer) et FIX-15 (ce que seul le client fournit) ; le contenu fictif assumé ; la goutte qui passe un instant sur l'étiquette « fond » sur ordinateur ; le fait que l'orgue soit un rendu de synthèse.

---

## 0. Les FIX du tour 1, un par un

| FIX | Statut | Ce que j'ai vérifié | Capture ou mesure |
|---|---|---|---|
| FIX-1 retour 30 jours | **Fait** | L'appel final dit « Livré en 48 h · 22 € déduits du premier flacon · Livraison offerte dès 80 € ». Aucun retour n'est promis. | `1440-section-final.png` |
| FIX-2 surréservation | **Fait** | Sur la séance à 2 places, la liste propose 1 et 2. L'aide affiche « Il reste 2 places à cette séance. 190 € pour 2 places ». J'ai forcé 4 dans le code : l'envoi est refusé avec « Il reste 2 places à cette séance. » La confirmation donne le montant. | `p375-09-resa-forcee.png`, `p375-10-resa-merci.png` |
| FIX-3 mercredi | **Fait** | Les cinq séances tombent un samedi (14, 21 et 28 novembre 2026, vérifié au calendrier). | `1440-resa-merci.png` |
| FIX-4 boutons du catalogue | **Fait** | « Ajouter » tient sur une ligne, 50 px de haut à toutes les tailles. L'`aria-label` complet (« Ajouter Restanque au panier ») est lu au clavier. | `1440-section-parfums.png` |
| FIX-5 capot qui traverse le titre | **Fait** | Le capot s'efface en montant et ne touche plus le titre. Mais un autre défaut apparaît (voir FIX-3 du tour 2). | `1440-scene-notes-010.png` |
| FIX-6 scène B sur téléphone | **Fait** | À 375 et 360, les trois notes forment une liste lisible sous les couches, et les couches restent dans le cadre. | `375-scene-notes-055.png`, `360-scene-notes-055.png` |
| FIX-7 panier | **Fait** | Coffret seul : « Livraison calculée à l'étape suivante (offerte dès 80 €, encore 58 €) ». Coffret avec Garrigue : « offerte », plus « Le code glissé dans le coffret (−22 €) s'utilise sur votre prochain flacon, pas sur cette commande. » C'est honnête et clair. | `p375-12-panier-coffret-seul.png`, `p375-13-panier-coffret-flacon.png` |
| FIX-8 labdanum en fond | **Fait** | Garrigue : fond « ciste labdanum, encens », cœur « lavande, immortelle ». Le jus est brun ambré. | `1440-scene-notes-055.png` |
| FIX-9 « qu'on va chercher nous-mêmes » | **Fait** | Le titre devient « Huit matières, achetées à leurs producteurs. » | `1440-section-preuves.png` |
| FIX-10 vides de l'atelier et de la maison | **Fait** | La colonne de gauche de l'atelier porte maintenant l'encart « Vous repartez avec votre flacon de 30 ml ». Dans la maison, la niche est passée sous le texte, à côté du portrait. | `1440-defil-12.png`, `1440-defil-13.png` |
| FIX-11 fond de verre de 7 mm | **Fait** | Le gros plan montre le culot épais sous le liquide. | `1440-defil-08.png` |
| FIX-12 finitions | **Fait** | Les boutons sont en Schibsted. Le bouton de fin de la scène B est atteint au clavier (tabulation 14), et la scène est alors ramenée à sa dernière image. Les cartes du journal n'ont plus de faux lien. Instagram est sous « Suivre ». À 768, le bouton pause est éloigné de « Voir les parfums ». | `clavier-1440-tab14.png`, `1440-pied.png`, `768-00-arrivee.png` |
| FIX-13 photo de l'atelier | **Fait, version gratuite** | La « savonnerie » est remplacée par un orgue rendu en code : gradins de chêne, environ 80 flacons de matières, mouillettes, balance et un flacon Garrigue. On reconnaît mon métier. C'est une image de synthèse, et la vraie photo reste à fournir par le client. | `1440-section-atelier.png` |
| FIX-14 photos du journal | Hors périmètre | L'article sur la rose montre maintenant une fiole rendue au lieu de la ruelle du Luberon : le texte et l'image ne se contredisent plus. La photo « lumière » reste provisoire. | `1440-section-journal.png` |
| FIX-15 apports du client | Hors périmètre | Toujours à fournir : le portrait réel, la source des avis, le prix de la livraison, les conditions de retour et les vraies séances. Ces manques sont listés dans `NOTES.md` § 8. | |

**Bilan : 13 FIX sur 13 sont faits** dans le périmètre gratuit, sans régression sur ce qu'ils touchaient.

---

## 1. Test (test-report)

### 1.1 Les 5 premières secondes

| Taille | Capture | Ce que je vois |
|---|---|---|
| 1440 × 900 | `1440-00-arrivee.png` | « Cinq parfums composés à Grasse. » Le flacon Restanque est au centre, l'étiquette est lisible. Le chapeau dit « séries de 300 flacons, commencez par les sentir chez vous ». Le bouton « Le coffret de 5 échantillons · 22 € » est là, et le coffret revient en haut à droite. On comprend en 3 secondes ce qu'on vend, d'où ça vient et quoi faire. |
| 768 × 1024 | `768-00-arrivee.png` | C'est équilibré. Le bouton pause est bien à l'écart des liens. |
| 375 × 812 | `375-00-arrivee.png` | Titre sur deux lignes, flacon, chapeau, bouton à 22 € et « Voir les parfums » : tout tient dans le premier écran. |
| 360 × 740 | `360-00-arrivee.png` | Rien n'est coupé. |

### 1.2 Le défilement complet

À 1440 : 17 captures écran par écran (`1440-defil-01.png` à `-17.png`), 8 par scène épinglée (`1440-scene-flacon-*.png`, `1440-scene-notes-*.png`), une par section (`1440-section-*.png`), plus un défilement rapide à la molette (`1440-rapide.png`). Même série à 375, 360 et 768.

- **Scène A, la rotation** (`1440-scene-flacon-040/055/100.png`) : toujours aussi juste. Mistral, Centifolia puis Nuitée, chacun avec sa famille, son accord, deux notes et son prix. Le flacon finit de face, logo lisible. C'est le moment que j'avais acheté.
- **Scène B, la décomposition** (`1440-scene-notes-025/055/100.png`) : nette progression. Chaque note est maintenant un godet de verre épais qui contient son liquide, et non plus une meule de fromage. Les étiquettes sont accrochées au bord des couches, le Garrigue est brun ambré, et la scène finit de face avec le prix et le bouton.
  **Défaut restant** : au début (`1440-scene-notes-010.png`) et à la fin (`1440-scene-notes-085.png`), une fois le capot effacé et avant que les godets apparaissent, il reste seul au centre de l'écran un **cylindre cuivré, opaque et brillant**. On dirait un lingot ou une boîte de conserve, pas du parfum. On le voit deux fois par passage, sur environ 10 % de la scène.
- **Preuves** (`1440-section-preuves.png`) : propre. 1 312 avis, 8 matières, 300 flacons, puis la bande des fioles.
- **Trois détails** (`1440-defil-08.png`) : bouchon, culot de 7 mm, étiquette. Le gros plan de l'étiquette dit « numérotée à la main », mais l'étiquette rendue **ne porte aucun numéro**.
- **Catalogue** (`1440-section-parfums.png`) : cinq fiches nettes, boutons sur une ligne.
- **Coffret** (`1440-section-coffret.png`) : fond vert, trois étapes, bouton. Ça marche.
- **Atelier** (`1440-section-atelier.png`, `1440-defil-11/12.png`) : l'orgue en gradins, la carte en verre (2 h 30 · 6 personnes · 95 €), puis le texte et l'encart du flacon de 30 ml à gauche, le formulaire à droite. La colonne de gauche est maintenant habitée.
- **Maison** (`1440-defil-13.png`) : le portrait à gauche, le texte puis la niche à droite. La demi-page vide a disparu.
- **Avis, journal, questions, final, pied** (`1440-defil-14.png`, `1440-section-journal.png`, `1440-pied.png`) : c'est complet. Le journal a une composition « une grande carte et deux petites ».
- **Défilement rapide** : rien ne saute ni ne clignote, et les épinglages se relâchent proprement.

### 1.3 Le parcours de l'acheteuse (375, tactile)

Captures `p375-01-menu.png` à `p375-14-panier-final.png`.

1. **Menu** : il s'ouvre propre, et « Parfums » mène au catalogue.
2. **Centifolia en 100 ml** : le prix passe de 138 à **196 €**. Après l'ajout, l'annonce dit « Centifolia, 100 ml ajouté au panier. 1 article. » et le compteur passe à 1.
3. **Barre fixe du bas**, au niveau des détails : « Coffret découverte · 22 € » ajoute bien le coffret.
4. **Panier avec le coffret seul** : 22 €, « Livraison calculée à l'étape suivante (offerte dès 80 €, encore 58 €) ».
5. **Coffret et Garrigue** : total 154 €, livraison offerte, et la note du code coffret apparaît. Le calcul est juste.
6. **Commander** : « Exemple fictif : aucune commande n'est passée. »
7. **Réservation vide** : le focus va sur la première séance libre, et les erreurs sont reliées aux champs.
8. **Séance du 14 à 10 h (2 places)** : on ne peut choisir que 1 ou 2 places. Avec 2 places : « C'est noté, Léa. Samedi 14 novembre, 10 h : 2 places, 190 € à régler sur place. »
   **Mais** (`p375-10-resa-merci.png`, `1440-resa-merci.png`) : **le formulaire ne disparaît pas**. Les champs remplis et le bouton « Réserver ma place » restent affichés au-dessus du message de confirmation, et on peut cliquer une seconde fois. La cause est dans `ciste.css`, l. 289 : `[data-form-champs] { display: grid; }` écrase l'attribut `hidden` posé par `boutique.js`, l. 230 (mesure : `hidden: true`, `display: grid`).
9. **Lettre des saisons** (`1440-lettre-merci.png`) : même défaut. Le champ et le bouton « S'inscrire » restent affichés à côté de « Merci, à la prochaine saison. » La cause est `ciste.css`, l. 386 (`.lettre-ligne { display: flex; }`).
10. Au passage, deux défauts de typographie sur téléphone : « 5 échantillons de 2 / ml » coupe le nombre de son unité dans le panier (`p375-13`), et « Exemple fictif / : rien n'a été envoyé » rejette les deux-points en début de ligne (`p375-10`).
11. Une séance de 6 places ne se réserve que par 4 au plus (`boutique.js`, l. 104). Un groupe de 5 ou 6 (anniversaire, enterrement de vie de jeune fille, et c'est une bonne part de mes ateliers) ne sait pas quoi faire.

### 1.4 Le clavier (1440, 46 tabulations)

Source : `passe2.cjs clavier`. Captures `clavier-1440-tab1/10/14/15/16/24/30.png`.

L'ordre suit la page : lien d'évitement, logo, 5 liens, panier, coffret, CTA du hero, « Voir les parfums », pause de la scène A, pause du carrousel, **« Ajouter au panier » de la scène B** (atteint, avec la scène ramenée à sa fin), pause de la scène B, puis pour chaque fiche la contenance et « Ajouter ». Viennent ensuite le coffret, la séance, prénom, nom, e-mail, places, « Réserver », les 4 questions, l'appel final, Instagram, le plan du site et les liens légaux. **Le focus est toujours visible** : anneau de 3 px, reporté sur la pastille « 50 ml » quand le bouton radio caché a le focus (`clavier-1440-tab16.png`).

### 1.5 Le mouvement réduit et la page sans WebGL

- **Mouvement réduit** (`reduit-1440-00.png` à `-07.png`, `reduit-375-00.png`, `reduit-375-notes.png`) : 0 épinglage, 0 erreur. Le flacon est fixe, les trois parfums sont en fiches, la décomposition est en image avec la liste des notes. La page est complète et lisible.
- **Sans WebGL** (`nogl-1440-00.png`, `nogl-1440-01.png`, `nogl-1440-notes.png`) : la classe `scene-3d` est absente, la page est complète, 784 mots, 0 erreur. Petit défaut : le rectangle de l'image fixe se devine sur le fond de la section, parce que le grain de l'image ne correspond pas tout à fait au fond (`nogl-1440-notes.png`, autour de l'éclaté).

### 1.6 L'œil du métier, celui de Mireille

| Où | Ce qui ne va pas | Gravité |
|---|---|---|
| `donnees.js` l. 41, 42, 45, et les fioles `fiole-rose/jasmin/iris.webp` | **Les matières premières ont la couleur de leur fleur, pas de leur essence.** L'absolue de rose centifolia est orange rouge, pas rose bonbon. L'absolue de jasmin est ambre orangé, pas jaune pâle. Le beurre d'iris est beige crème, pas lilas. Un nez le voit en une seconde, et un acheteur averti aussi. La fiole rose revient en image de l'article « Cueillir la rose de mai ». Les cinq parfums finis peuvent garder leurs teintes : c'est un choix de maison. | moyen |
| `index.html` l. 180, `flacon3d.js` l. 64-74 | « Étiquette numérotée à la main » sous un gros plan d'étiquette **sans numéro**. Il suffit d'un « N° 127 / 300 » à la plume pour que l'image prouve le texte. | moyen |
| `scene.js` l. 120-124 | Le cylindre cuivré opaque au début et à la fin de la scène B : c'est mon parfum, et il a l'air d'un métal. | moyen |
| `boutique.js` l. 104 | 4 places au plus par réservation, alors que l'atelier en compte 6. | léger |
| `index.html` l. 338 | « Livré en 48 h · … · Livraison offerte dès 80 € » : le mot « livraison » revient deux fois sur une ligne de 11 mots. | léger |
| `images/orgue-*` | L'orgue est crédible : gradins en amphithéâtre, flacons ambrés, mouillettes. La « balance » au premier plan, coupée par le bord, ressemble à une imprimante. Connu : rendu de synthèse. | léger |
| Le reste | La rose de mai cueillie avant dix heures, le jasmin et la tubéreuse cueillis à l'aube, le néroli de Vallauris, le verre de Biot, la céramique de Vallauris, la concentration de 18 %, la tenue de 6 à 10 heures, le labdanum en fond, la recharge 30 % moins chère, l'annulation à 48 h, les séances le samedi, les prix conformes au brief : **tout est juste**. | OK |

### 1.7 La densité (script de `conventions.md` § 11)

| Taille | Mots | Sections | Écrans |
|---|---|---|---|
| 1440 × 900 | **720** | **12** | **16,6** |
| 375 × 812 | 737 | 12 | 17,6 |
| 1440, sans WebGL | 784 | 12 | — |

Détail à 1440 : lien d'évitement 3, en-tête 12, flacon 32, preuves 50, notes 17, détails 27, parfums 113, coffret 44, atelier 114, maison 36, avis 48, journal 49, questions 78, final 23, pied 74. Tout est dans la fourchette (500-800 mots, 10-13 sections, 12-18 écrans). L'atelier est le bloc le plus long (114 mots), mais c'est un formulaire avec ses étiquettes, pas de la prose : aucun bloc de texte ne dépasse 3 phrases.

### 1.8 La console et le débordement

- **0 erreur JavaScript, 0 ressource en échec** à 1440, 768, 375 et 360, en mouvement réduit et sans WebGL. Ce serveur n'a coupé aucune connexion.
- **Débordement horizontal : 0 px** à toutes les tailles.
- Alignement : à 1440, le champ « E-mail » est plus haut (environ 74 px) et décalé de 25 px par rapport au menu « Places » à côté (`1440-resa-merci.png`), parce que `.champ` est une grille étirée (`ciste.css`, l. 300) et que la colonne « Places » porte une ligne d'aide.

---

## 2. Notes (scores)

### 2.1 La grille sur 100

| Critère | Tour 1 | Tour 2 | Pourquoi |
|---|---|---|---|
| Direction artistique | 13 | **14 / 15** | Calcaire, vert ciste, labdanum, Bodoni : on reconnaît la maison sans le logo. Les godets de verre de la scène B sont dans le ton, le Garrigue est juste. On perd encore un point sur le cylindre cuivré qui ouvre et ferme la scène. |
| Images | 10 | **12 / 15** | L'orgue remplace la savonnerie, le culot de 7 mm est montré, la ruelle est retirée. Les rendus en code sont cohérents entre eux. Restent les fioles de matières aux couleurs fausses, l'étiquette « numérotée » sans numéro, et le portrait, la niche et la lumière, qui sont provisoires (plafond d'une maquette autour de 12 ou 13). |
| Mise en page | 12 | **14 / 15** | La composition produit centré est suivie. Les vides ratés ont disparu, les boutons sont sur une ligne. Reste le champ e-mail décalé dans le formulaire. |
| Mouvement | 8 | **9 / 10** | Les deux signatures marchent, les pauses sont là, le mouvement réduit est exemplaire. Le lingot cuivré au début et à la fin de la décomposition coûte le dernier point (la goutte sur « fond », déjà connue, n'est pas comptée). |
| Clarté en 5 secondes, action | 9 | **9 / 10** | Quoi, d'où, combien, quoi faire : tout est dans le premier écran. Le coffret à 22 € revient partout, avec la barre fixe sur téléphone. Le prix des flacons n'arrive qu'au deuxième écran, et c'est voulu. |
| Densité | 5 | **5 / 5** | 720 mots, 12 sections, 16,6 écrans, comptage fourni. |
| Preuves et objections | 6 | **8 / 10** | Les trois faux du tour 1 ont disparu. Les quatre objections sont traitées, le panier dit la livraison, la réservation dit le montant. C'est le plafond d'une maquette : les 1 312 avis n'ont pas encore de source (client). |
| Textes | 8 | **9 / 10** | La voix est juste, les titres sont concrets, le labdanum est à sa place. Restent « numérotée à la main » non montré et le doublon « livré / livraison ». |
| Mobile, accessibilité, légèreté | 8 | **8 / 10** | Clavier complet avec focus visible, `aria-live`, 0 débordement, scène B lisible à 360. Mais après l'envoi, les deux formulaires restent affichés et permettent de renvoyer (règle `hidden` écrasée). S'y ajoutent deux coupures de typographie sur téléphone et le champ décalé. |
| **Total** | **79** | **88 / 100** | |

- **Note sur 10** : 8,8.
- **Seuil** : **85**, puisque c'est une maquette avec médias provisoires (orgue rendu, portrait, niche et lumière repris, avis sans source). **Il est atteint.**
- **Atteignable sans le vrai client, à 0 $** : FIX-1 à FIX-8 ci-dessous rapportent environ +3 points (Mobile 8 → 9, Images 12 → 13, Direction artistique 14 → 15), soit **91 environ**. Pour un 90 solide au site construit, il faut la vraie photo du labo, mon portrait, une photo de récolte et la source des avis (FIX-9 et FIX-10).

> « Cette fois, c'est ma maison. Le flacon tourne et change de jus, le parfum se défait en trois godets de verre avec mes notes au bon étage, et l'atelier montre un orgue au lieu d'une savonnerie. Plus rien de faux dans l'offre. Avant de la mettre en ligne, je veux deux choses : que le formulaire disparaisse quand on a réservé, et que ma rose ne soit plus rose bonbon dans sa fiole. Une absolue de centifolia, c'est orange. »

Verdict : Oui, ça vaut mes 25 000 €, au stade de la maquette : 88 sur 100, au-dessus du seuil de 85, et les corrections restantes sont gratuites ou relèvent de ce que je dois fournir.

---

## 3. Plan de corrections (fix-plan)

| FIX | Gravité | Coût | Résumé |
|---|---|---|---|
| FIX-1 | majeur | **0 $** | Les formulaires restent affichés après l'envoi (réservation et lettre) |
| FIX-2 | moyen | **0 $** | Couleurs des fioles de matières : rose, jasmin et iris faux |
| FIX-3 | moyen | **0 $** | Scène B : plus de cylindre cuivré seul au début et à la fin |
| FIX-4 | moyen | **0 $** | Numéro de série sur l'étiquette, au moins sur le gros plan |
| FIX-5 | léger | **0 $** | Champ e-mail aligné sur le menu « Places » |
| FIX-6 | léger | **0 $** | Espaces insécables : « 2 ml », « fictif : » |
| FIX-7 | léger | **0 $** | Groupes de 5 ou 6 à l'atelier |
| FIX-8 | léger | **0 $** | Réassurance finale sans doublon, rectangle de l'image fixe sans WebGL |
| FIX-9 | moyen | **génération** (≈ 0,06 $ par image, avec l'accord de l'utilisateur) puis **client** | Photo de récolte de la rose et photo de lumière (ex-FIX-14) |
| FIX-10 | moyen | **client** | Photo réelle du labo, portrait, source des avis, prix de la livraison, conditions de retour, vraies séances (ex-FIX-15) |

### FIX-1 : les formulaires ne disparaissent pas après l'envoi
- **Où** : `ciste.css`, l. 289 (`[data-form-champs] { display: grid; … }`) et l. 386 (`.lettre-ligne { display: flex; … }`). `boutique.js` pose bien `hidden` (l. 230 et l. 242), mais le `display` de la feuille l'emporte.
- **Comment** : ajouter en tête de `ciste.css` la règle `[hidden] { display: none !important; }`, ou écrire `[data-form-champs]:not([hidden])` et `.lettre-ligne:not([hidden])`. Ensuite, refaire `p375-10-resa-merci.png` et `1440-lettre-merci.png` : seul le message de remerciement doit rester. Vérifier aussi que `.erreur`, `.panier-info` et `.panier-note` n'ont pas de `display` qui écrase `hidden`. Aujourd'hui elles n'en ont pas.

### FIX-2 : les couleurs des matières premières
- **Où** : `donnees.js`, l. 41-48 (`matieres[].couleur`), puis le nouveau rendu des fioles par `outils/rendre.cjs` (gratuit, rendu en code).
- **Comment** : rose centifolia (absolue) vers un orange rouge `#b5532a` ; jasmin (absolue) vers un ambre orangé `#c27a2a` ; iris (beurre d'iris) vers un beige crème `#e2d5b4` ; feuille de figuier (absolue) vers un vert sombre `#55602c`. Le néroli (jaune pâle), le labdanum, le vétiver et le benjoin sont justes. L'article « Cueillir la rose de mai » (`donnees.js`, l. 51-52) prendra la nouvelle fiole ; corriger son `alt` en « absolue de rose centifolia, orangée ».

### FIX-3 : le cylindre cuivré de la scène B
- **Où** : `scene.js`, l. 120-124 (`etatB` : `leve` de 0,04 à 0,15, puis de 0,85 à 0,95 ; `eclate` de 0,14 à 0,40, puis de 0,62 à 0,84).
- **Comment** : ne jamais montrer le liquide sans verre. Soit faire apparaître les godets en même temps que le capot s'efface (début de `eclate` à 0,06, et fermeture finie avant 0,85 pour que le capot revienne sur des godets déjà joints). Soit ne lever que le bouchon et l'épaule, en laissant le corps du flacon en verre autour du liquide jusqu'à l'éclatement. Dans les deux cas, donner au volume unique la même matière que les couches (pas de reflet métallique). Contrôler sur `1440-scene-notes-010.png` et `-085.png`.

### FIX-4 : l'étiquette « numérotée à la main »
- **Où** : `flacon3d.js`, l. 64-74 (étiquette dessinée sur un canvas), puis le nouveau rendu de `images/gros-etiquette.webp` (`outils/rendre.cjs`) ; `index.html`, l. 180.
- **Comment** : ajouter une ligne manuscrite « N° 127 / 300 » (Bodoni italique, encre plus foncée, légèrement de biais) sous « GRASSE ». Sinon, changer la légende pour « Étiquette imprimée à Grasse ».

### FIX-5 : le champ e-mail décalé
- **Où** : `ciste.css`, l. 300 (`.champ { display: grid; gap: 0.35rem; }`).
- **Comment** : ajouter `align-content: start;` à `.champ`. Le champ e-mail reprend 50 px de haut et s'aligne sur le menu « Places ».

### FIX-6 : les espaces insécables
- **Où** : `donnees.js`, l. 29 (`detail: "5 échantillons de 2 ml"`) et `boutique.js`, l. 120 (`${contenance} ml`) et l. 229 (`Exemple fictif : …`).
- **Comment** : mettre ` ` entre le nombre et « ml », et avant les deux-points (« fictif : »). Même chose pour « 95 € » et « 190 € » dans l'aide des places (`boutique.js`, l. 108).

### FIX-7 : les groupes à l'atelier
- **Où** : `boutique.js`, l. 104 (`Math.min(4, …)`), et l'aide sous les places.
- **Comment** : monter le plafond à `s.reste` (6 au plus), ou garder 4 et ajouter dans l'aide « Plus de 4 ? Écrivez-nous, on ouvre une séance pour votre groupe. » La réponse au client est à confirmer (FIX-10).

### FIX-8 : deux finitions
- `index.html`, l. 338 : « Coffret livré en 48 h · 22 € déduits du premier flacon · Port offert dès 80 € ».
- `ciste.css`, en mode fixe : sur `.notes-img` et `.moment-img-hero`, ajouter `mix-blend-mode: multiply` ou un fondu de bord (`mask-image: radial-gradient(…)`) pour que le rectangle de l'image ne se devine plus sur le fond `#f2f3ee` (`nogl-1440-notes.png`).

### FIX-9 : les images du journal (ex-FIX-14)
- **Où** : `images/lumiere-700.webp` et l'article de la rose (`donnees.js`, l. 51-56).
- **Comment** : prompts n° 4 et 5 de `medias-a-generer.md`, environ 0,12 $ pour les deux, **avec l'accord de l'utilisateur**. Puis les vraies photos du client. D'ici là, la fiole recolorée (FIX-2) suffit pour la rose.

### FIX-10 : ce que seul le client fournit (ex-FIX-15)
- La photo réelle de l'orgue et du labo, qui remplacera le rendu de synthèse.
- Le portrait réel de Mireille et la niche de la vraie boutique.
- La source des 1 312 avis (Avis Vérifiés, Google), avec un lien.
- Le prix de la livraison sous 80 €, les conditions de retour (échantillon ou flacon scellé, délai) et la durée de validité du code coffret (la FAQ dit « sans date limite » : à confirmer).
- Les vraies séances de l'atelier, et la règle pour les groupes (FIX-7).
