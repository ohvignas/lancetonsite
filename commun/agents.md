# Le travail en équipe d'agents

Règle : **à chaque étape, tout ce qui ne dépend pas d'autre chose part en même temps**,
chacun dans son agent, tous lancés **dans un même message** (outil `Agent`). L'agent
principal garde la direction (choix, arbitrages, document final) ; les agents Sonnet
font le volume. On attend leurs retours en préparant la suite, jamais à ne rien faire.

- **Autant d'agents que de tâches indépendantes**, jusqu'à 10 à la fois ; au-delà, par
  vagues de 10.
- **Une tâche = une source, une page ou une pièce**, avec ses fichiers de sortie à elle.
  Deux agents n'écrivent jamais dans le même fichier.
- **Brief complet** : chemin du projet, la tâche, les documents à lire, le fichier de
  sortie, le format du compte rendu. L'agent ne voit pas la conversation.
- **Relire avant de livrer** : un retour d'agent est un brouillon. L'agent principal le
  vérifie (fichier ouvert, capture regardée) avant de le montrer.
- Sans outil `Agent` (Claude sur le web, application) : faire les mêmes tâches l'une
  après l'autre, dans le même ordre.

## Les agents (tous en Sonnet)

| Agent | Fait | Étapes |
|---|---|---|
| `chercheur` | une source lue, des faits sourcés | 1, 2, 3, 4, 5 |
| `redacteur-page` | les textes d'une page | 5 |
| `fabricant` | un wireframe, une page, un composant, un script, un lot de médias | 4, 6, 8, 11 |
| `maquettiste-page` | une page secondaire de la maquette | 7 |
| `relecteur` | relecture indépendante d'un document ou d'une page | toutes |
| `client-persona` | le client qui teste et note | 7, 11 |
| `verificateur` | un contrôle (liens, accessibilité, performance, SEO…) | 11, 12 |

## Ce qui part en parallèle, étape par étape

| Étape | Agents lancés ensemble | Reste à l'agent principal |
|---|---|---|
| 0 Démarrer | un `chercheur` par source donnée : site actuel, chaque réseau, chaque site aimé ou détesté, fiche Google | les questions, `00-etat.md` |
| 1 Cadrage | un `chercheur` par concurrent (5 à 8), un pour les avis clients, un pour le marché et les chiffres, un pour les mots-clés | la synthèse, les personas |
| 2 Marque | un `chercheur` par piste de nom (domaine, INPI, réseaux), un sur le vocabulaire des clients ; `relecteur` à la fin | positionnement, voix |
| 3 Charte | un `chercheur` par site de référence (branding + capture), un par thème du moodboard (3 images libres chacun) ; un `fabricant` pour les versions du logo, un pour le PDF | la direction, couleurs, typos |
| 4 Architecture | un `chercheur` par page pour ses mots-clés et les questions posées ; puis un `fabricant` par page pour son wireframe | arborescence, zoning |
| 5 Contenus | un `redacteur-page` par page, toutes en même temps ; `relecteur` sur l'ensemble | l'harmonie de voix, les arbitrages |
| 6 Médias | toutes les générations en même temps ; un `fabricant` par lot d'optimisation (WebP, tailles, vidéos) | les prompts, le choix des images |
| 7 Maquette | un `maquettiste-page` par page secondaire et par gabarit ; puis `relecteur` et `client-persona` ensemble | l'accueil, la critique, les corrections |
| 8 Design system | un `fabricant` par groupe de composants (boutons et champs, cartes, navigation, formulaires…) et un pour la page de démonstration | l'inventaire de la maquette, les tokens, la critique |
| 10 PRD | un `chercheur` par choix technique à vérifier (stack, hébergeur, outils) ; `relecteur` | le document |
| 11 Construction | un `fabricant` par page (après la mise en page commune) ; puis un `verificateur` par contrôle et `client-persona` | mise en page commune, intégration |
| 12 Déploiement | un `verificateur` par contrôle en ligne (liens, performance, SEO, formulaires, mentions) | la mise en ligne, le domaine |
| 12 Remise au client (passation, partie B) | un `fabricant` par guide (saisie, réseaux, mesures) ; `verificateur` sur les accès | la réunion de passation |
