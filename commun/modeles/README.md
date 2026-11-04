# Modèles de documents professionnels

Un modèle par livrable de Lance ton site, construit à partir de vrais documents publics
d'agences, d'institutions et d'équipes produit (chartes de villes et d'États, guides
éditoriaux, design systems publics, modèles de PRD, procès-verbaux de recette). On en a
retenu les structures, jamais le texte.

Chaque modèle donne : à quoi sert le document et qui le lit, le sommaire type (contenu,
longueur et forme de chaque section), 5 critères « niveau agence » vérifiables, la
**version courte** produite par défaut, la manière de le publier et les sources.

## Index

| Modèle | Livrable produit | Étape (skill) | Version courte |
|---|---|---|---|
| [cadrage.md](cadrage.md) | `01-cadrage.md` : brief et concurrents | 1 Cadrage (`cadrage`) | 6 min |
| [plateforme-de-marque.md](plateforme-de-marque.md) | `02-marque.md` | 2 Marque (`marque`) | 5 min |
| [charte-graphique.md](charte-graphique.md) | `03-charte/charte.md` | 3 Charte (`charte`) | 6 min |
| [architecture.md](architecture.md) | `04-architecture.md` | 4 Architecture (`architecture`) | 5 min |
| [contenus.md](contenus.md) | `05-contenus/` : guide + une page par fichier | 5 Contenus (`contenus`) | 8 min |
| [design-system.md](design-system.md) | `06-design-system/` : `DESIGN.md`, tokens, `demo.html` | 6 Design system (`design-system`) | 6 min |
| [plan-medias.md](plan-medias.md) | `07-medias/medias.md` : brief, liste de plans, manifeste | 7 Médias (`medias`) | 8 min |
| [maquette.md](maquette.md) | `08-maquette/maquette.md` : présentation de la maquette | 8 Maquette (`maquette`) | 12 min |
| [passation.md](passation.md) | `09-passation.md` : partie A vers la construction, partie B remise au client | 9 Vérification (`passation`), partie A ; 12 Mise en ligne (`deployer`), partie B | A fondue dans les 4 min du PRD ; B 5 min |
| [prd.md](prd.md) | `10-prd.md` (et `11-plan.md`) | 10 PRD et plan (`prd`) | 4 min, partie A de la passation comprise |
| [recette.md](recette.md) | `11-recette.md` : plan de tests et procès-verbal | 11 Construction (`construire`), en fin d'étape | 6 min |

## Budget de temps du parcours de conception : 60 min

| Étape | Livrable | Budget | Ce qui tient dans ce temps |
|---|---|---|---|
| 1 | Cadrage | 6 min | Questionnaire groupé déjà rempli, 4 concurrents extraits en parallèle |
| 2 | Marque | 5 min | Tirée du cadrage, sans nouvelle question |
| 3 | Charte | 6 min | Tableaux (logo, nuancier, échelle typo, photo) ; aucune image générée |
| 4 | Architecture | 5 min | Plan Mermaid, SEO par page, zoning des pages qui vendent |
| 5 | Contenus | 8 min | Un agent par page, en parallèle, sur le même guide |
| 6 | Design system | 6 min | Tokens dérivés de la charte, 6 composants, une démo |
| 7 | Médias | 8 min | Prompts écrits d'un bloc, générations lancées en parallèle au début de l'étape 7 |
| 8 | Maquette | 12 min | Accueil complet bureau et mobile, autres pages sur le même système |
| 9 + 10 | Vérification (passation A) puis PRD et plan | 4 min | La liste de contrôle de `09-passation.md` (partie A), puis le PRD repris des étapes précédentes |
| | **Total** | **60 min** | |

Hors de l'heure : la construction, la recette (6 min de rédaction, plus l'exécution des
tests), la mise en ligne et la remise au client.

La numérotation est celle des skills (`commun/parcours.md` § 1) : 9 vérification
(`passation`, partie A), puis 10 PRD et plan. Les deux tiennent ensemble en 4 min.

**Règle du minuteur.** À la fin du budget d'une étape, on livre la version courte en
l'état, les manques marqués `[H]` ou « à compléter », et on demande : « Valider en
l'état » / « Continuer (≈ N min) » / « Modifier » (`commun/parcours.md`). On ne passe
jamais à l'étape suivante sans un oui explicite.

## Leviers de vitesse

Tirés des process d'agence et des modèles étudiés :

1. **Un seul questionnaire groupé au début.** Toutes les questions du parcours sont
   posées en une fois au démarrage (activité, offre, prix, client, concurrents connus,
   logo existant, couleurs imposées, photos disponibles, budget, date, qui maintiendra le
   site). Ensuite, plus aucune question bloquante : ce qui manque devient une hypothèse
   `[H]`, signalée dans le résumé de l'étape et confirmée à sa validation.
2. **Des modèles pré-remplis.** Chaque modèle contient un squelette Markdown à copier :
   on remplit des cases, on ne compose pas un document.
3. **Des recherches en parallèle.** Les 4 concurrents sont extraits en même temps ; les
   pages de contenus sont écrites par plusieurs agents ; à l'étape 7, toutes les
   générations partent en même temps.
4. **La version courte d'abord.** Chaque modèle définit ce qu'on garde et ce qu'on
   reporte. L'approfondissement (prisme de Kapferer, pages secondaires, vidéo, thème
   sombre) se fait seulement si le client le demande.
5. **Dériver au lieu de réinventer.** Les tokens viennent du nuancier, les messages
   viennent du cadrage, le PRD vient de l'architecture, la passation vient de
   `00-etat.md`.
6. **Des valeurs par défaut décidées une fois.** Ratio typographique 1,25, espacement
   sur 8 px, contrastes AA, 6 composants de base : on ne les rediscute pas à chaque
   projet.
7. **Des documents en texte, des visuels en code.** Aucune image générée pour un
   document : une charte rendue en affiche est la cause la plus probable des 40 minutes du projet test. Les
   nuanciers et les échelles typo sont des tableaux, ou un petit artifact HTML.
8. **Une relecture, une seule, à la maquette.** Le relecteur indépendant et le client
   simulé passent une fois, en parallèle, à l'étape 8 ; on corrige et on présente, sans
   boucle. Les tours suivants seulement si le client les demande.
9. **Valider vite, à chaque étape.** Une seule question fermée par étape (« Valider et
   passer à l'étape suivante » / « Modifier »), avec le document sous les yeux : le
   patron répond en 10 secondes, et rien ne part dans la mauvaise direction.

## Règles de publication communes

- Chaque livrable est un document **Markdown propre**, lisible tel quel en artifact
  claude.ai ou en artifact Docs : titres de niveau 1 à 3, tableaux Markdown, citations
  en exergue, schémas Mermaid quand un schéma aide.
- **Aucune image comme livrable de document.** Les visuels (nuancier, échelle typo,
  composants) sont faits en Markdown (tableaux), en blocs de code (CSS des couleurs) ou
  dans un court artifact HTML. Seuls les médias (étape 7) et la maquette (étape 8)
  produisent des images, et ce sont de vraies images du site, pas des affiches.
- En tête de chaque document : `> Étape N — mis à jour le JJ/MM/AAAA — statut : …`
  (voir `conventions.md`).
- Longueur : 1 à 3 pages d'écran en version courte. Un document plus long doit en
  justifier chaque section.

## Ce que « niveau agence » veut dire, partout

Un document amateur décrit des intentions (« un site moderne et rassurant »). Un document
d'agence donne des valeurs vérifiables : un HEX et son contraste, une taille en pixels,
une URL de concurrent, un critère d'acceptation, une date de renouvellement. Chaque
modèle traduit cette différence en 5 critères qu'un relecteur peut cocher.
