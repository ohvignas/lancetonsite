# La boucle de correction 3D : critiquer, corriger, re-rendre, avant de montrer

Aucun rendu 3D n'est présenté à l'utilisateur sans être passé par cette boucle. Elle est
**automatique** : on ne demande pas la permission de la lancer, on la lance. Elle suit la
logique de `commun/boucle-persona.md`, appliquée à une image au lieu d'une page.

Exemple réel (flacon Ciste) : tour 1 **54**, tour 2 **67**, tour 3 **68** (jus crème, flancs noirs), corrigés au tour 4.
Chaque tour a trouvé des défauts que l'œil de celui qui a fait le rendu ne voyait plus
(culot brûlé, flacon qui flotte, liquide « crème », épaule blanche).

## Le tour

1. **Rendre l'aperçu** : 720 px de large, 96 échantillons (30 s à 1 min). Pour une animation :
   la première image, celle du milieu et la dernière.
2. **Se relire soi-même d'abord** (2 minutes) avec la grille ci-dessous. Corriger les défauts
   évidents avant de lancer l'agent : il coûte un tour.
3. **Lancer un agent `client-persona` neuf**, en mode « élément 3D », avec :
   - le chemin de l'aperçu (et celui du tour précédent, pour comparer) ;
   - le script qui le produit (lecture seule) ;
   - la marque (`02-marque.md`), la charte, et ce que l'objet doit dire ;
   - `01-cadrage.md` (qui est le patron) ;
   - à partir du tour 2 : la liste des corrections faites, pour qu'il vérifie chacune.
   Il écrit un seul fichier, `07-medias/3d/boucle/tour-N/scores.md` (grille, défauts « objet /
   paramètre / valeur », verdict), et ses agrandissements dans le même dossier.
   Consigne : jouer le patron (compare avec les marques de référence du secteur) puis un
   directeur artistique photo ; agrandir les zones (×3) et mesurer les pixels ; rendre une
   note sur 100, un verdict « je paierais / pas encore », et **chaque défaut avec sa correction
   réglable dans le script** (objet, paramètre, valeur).
4. **Appliquer** les corrections, re-rendre, et regarder soi-même avant le tour suivant :
   une correction peut en casser une autre (exemple : drapeaux rapprochés → liquide noir).
5. **Tour suivant** avec un agent neuf.

## Quand s'arrêter

- **Note ≥ 85 et verdict « je paierais »** : présenter.
- **3 tours au plus** en automatique. Après le 3e : présenter quand même, avec la note, ce qui
  a été corrigé, et la liste des défauts restants. L'utilisateur choisit.
- Un défaut qui dépend du client (couleur exacte d'un produit, vraie cote, vrai logo) ne bloque
  pas la boucle : il va dans « Ce qui manque » et dans la question à l'utilisateur.

## La grille (/100)

| Critère | Points | On regarde |
|---|---|---|
| Matière principale (verre, métal, bois, tissu) | 15 | épaisseur, réfraction, bords dessinés, aucune zone brûlée |
| Matière secondaire (liquide, contenu, garniture) | 10 | couleur juste, densité, cœur lumineux, aucune zone « crème » ou noire |
| Pièces et finition | 10 | **aucune facette**, aucun jour entre les pièces, détails fins (moletage, gravure) |
| Marquage (étiquette, logo, gravure) | 10 | lisible, papier ou matière crédible, tranche, intégré à la courbure |
| Lumière | 15 | reflets lisibles en bandes, filets sombres et clairs, halo, aucun reflet rectangulaire dur |
| Sol et contact | 10 | ombre de contact, aucune ligne d'horizon, l'objet pose |
| Cadrage | 10 | format de l'emplacement (4:5 fiche, 16:9 hero), objet centré ou placé pour le texte |
| Cohérence de marque | 10 | palette de la charte, niveau des marques de référence du secteur |
| « On croit à une vraie photo ? » | 10 | en vignette ET agrandi |

## Après la boucle : la porte de validation (obligatoire)

Une fois la boucle finie, **montrer** (publication de `commun/parcours.md` § 3, ou galerie du plan médias) :
l'image, la note finale et son évolution (54 → 67 → …), 3 à 5 points sur ce qui a été fait,
ce qui reste en hypothèse. Puis **une seule question**, avec `AskUserQuestion` :

> « On valide l'objet 3D [nom] et on lance les rendus finaux (photos 1080 px pour le site, animation) ? »
> Proposer aussi une taille plus grande (2048 ou 3072 px) si l'utilisateur en a l'usage.
> **Valider et lancer les rendus finaux** / **Modifier**

**Ne jamais lancer les rendus finaux ni passer à la suite sans un oui explicite**, en aucun mode
(`commun/parcours.md` § 4). Les rendus grand format et les séquences prennent du temps machine : on ne
les lance que sur un objet validé. Sur « Modifier » : appliquer le retour, re-rendre l'aperçu,
un tour de boucle si le changement est important, puis reposer la question.
