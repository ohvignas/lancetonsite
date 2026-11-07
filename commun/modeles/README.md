# Modèles de documents professionnels

Un modèle par livrable de Lance ton site, construit à partir de vrais documents publics
d'agences, d'institutions et d'équipes produit (chartes de villes et d'États, guides
éditoriaux, design systems publics, modèles de PRD, procès-verbaux de recette). On en a
retenu les structures, jamais le texte.

Chaque modèle donne : à quoi sert le document et qui le lit, le sommaire type (contenu,
longueur et forme de chaque section), 5 critères « niveau agence » vérifiables, la
version produite, en entier, la manière de le publier et les sources.

## Index

| Modèle | Livrable produit | Étape (skill) |
|---|---|---|
| [cadrage.md](cadrage.md) | `01-cadrage.md` : brief et concurrents | 1 Cadrage (`cadrage`) |
| [plateforme-de-marque.md](plateforme-de-marque.md) | `02-marque.md` | 2 Marque (`marque`) |
| [charte-graphique.md](charte-graphique.md) | `03-charte/charte.md` | 3 Charte (`charte`) |
| [architecture.md](architecture.md) | `04-architecture.md` | 4 Architecture (`architecture`) |
| [contenus.md](contenus.md) | `05-contenus/` : guide + une page par fichier | 5 Contenus (`contenus`) |
| [plan-medias.md](plan-medias.md) | `06-medias/medias.md` : brief, liste de plans, manifeste | 6 Médias (`medias`) |
| [maquette.md](maquette.md) | `07-maquette/maquette.md` : présentation de la maquette | 7 Maquette (`maquette`) |
| [design-system.md](design-system.md) | `08-design-system/` : `DESIGN.md`, tokens, `demo.html` | 8 Design system (`design-system`) |
| [passation.md](passation.md) | `09-passation.md` : partie A vers la construction, partie B remise au client | 9 Vérification (`passation`), partie A ; 12 Mise en ligne (`deployer`), partie B |
| [prd.md](prd.md) | `10-prd.md` (et `11-plan.md`) | 10 PRD et plan (`prd`) |
| [recette.md](recette.md) | `11-recette.md` : plan de tests et procès-verbal | 11 Construction (`construire`), en fin d'étape |

## Le temps

Pas de budget de temps : chaque étape fait tout son travail, le temps réel se note. Le parcours n'a jamais été chronométré de bout en bout : ne promettre aucune durée (`commun/parcours.md` § 1). On ne passe jamais à l'étape suivante sans un oui explicite.

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
   pages de contenus sont écrites par plusieurs agents ; à l'étape 6, toutes les
   générations partent en même temps.
4. **Tout le modèle, chaque fois.** Rien ne se reporte et rien ne se propose à la place d'être fait.
5. **Dériver au lieu de réinventer.** Les tokens viennent du nuancier, les messages
   viennent du cadrage, le PRD vient de l'architecture, la passation vient de
   `00-etat.md`.
6. **Des valeurs par défaut décidées une fois.** Ratio typographique 1,25, espacement
   sur 8 px, contrastes AA, 6 composants de base : on ne les rediscute pas à chaque
   projet.
7. **Des documents en texte, des visuels en code.** Aucune image générée pour un
   document : une charte rendue en affiche n'aide pas à décider. Les
   nuanciers et les échelles typo sont des tableaux, ou un petit artifact HTML.
8. **Un contrôle noté à chaque étape.** Le relecteur indépendant et le client simulé passent
   en parallèle avant chaque porte ; on corrige, puis on retest jusqu'au seuil (3 tours au plus)
   (`commun/boucle-persona.md`, « Le contrôle d'étape »).
9. **Valider vite, à chaque étape.** Une seule question fermée par étape (« Valider et
   passer à l'étape suivante » / « Modifier »), avec le document sous les yeux : le
   patron répond en 10 secondes, et rien ne part dans la mauvaise direction.

## Règles de publication communes

- Chaque livrable est un document **Markdown propre**, lisible tel quel en artifact
  claude.ai ou en artifact Docs : titres de niveau 1 à 3, tableaux Markdown, citations
  en exergue, schémas Mermaid quand un schéma aide.
- **Aucune image comme livrable de document.** Les visuels (nuancier, échelle typo,
  composants) sont faits en Markdown (tableaux), en blocs de code (CSS des couleurs) ou
  dans un court artifact HTML. Seuls les médias (étape 6) et la maquette (étape 7)
  produisent des images, et ce sont de vraies images du site, pas des affiches.
- En tête de chaque document : `> Étape N — mis à jour le JJ/MM/AAAA — statut : …`
  (voir `conventions.md`).
- Longueur : celle qu'il faut pour tout dire. Chaque section doit servir à une décision.

## Ce que « niveau agence » veut dire, partout

Un document amateur décrit des intentions (« un site moderne et rassurant »). Un document
d'agence donne des valeurs vérifiables : un HEX et son contraste, une taille en pixels,
une URL de concurrent, un critère d'acceptation, une date de renouvellement. Chaque
modèle traduit cette différence en 5 critères qu'un relecteur peut cocher.
