# Le parcours — montrer, valider, avancer

La source unique pour le rythme du parcours. Chaque skill d'étape y renvoie en une ligne.
Les modèles de `commun/modeles/` donnent la **forme** des documents ; pour le rythme
(porte de validation à chaque étape, relecture, dépassement de budget), ce fichier
prime.

Quatre promesses à l'utilisateur :
- la **conception tient en une heure** (étapes 1 à 10) ;
- il **voit quelque chose toutes les 2 minutes** ;
- chaque étape lui livre **un vrai document**, lisible à l'écran, au même lien d'un bout
  à l'autre ;
- **rien n'avance sans son oui.**

## 1. Une heure pour concevoir

Budget indicatif, en minutes de travail de Claude (hors temps de réponse de
l'utilisateur, hors attente d'une génération lancée en lot) :

| Étape | Budget | Ce qu'on montre en premier |
|---|---|---|
| 0 Démarrer | 3 | le tableau de bord du projet, **avant 5 minutes** |
| 1 Cadrage | 6 | le tableau des concurrents |
| 2 Marque | 5 | la promesse et ses variantes |
| 3 Charte | 6 | la palette et les typos en situation |
| 4 Architecture | 7 | l'arborescence en schéma, puis les wireframes |
| 5 Contenus | 8 | la page d'accueil |
| 6 Médias | 8 | l'image maîtresse (ou l'aperçu de l'objet 3D) |
| 7 Maquette | 13 | le premier jet de l'accueil |
| 8 Design system | 4 | l'inventaire tiré de la maquette |
| 9 Vérification + 10 PRD et plan | 4 | la liste de contrôle, puis la stack recommandée |
| **Conception** | **≈ 60** | |
| 11 Construction | ~10 par page | chaque page construite, en aperçu |
| 12 Mise en ligne | ~15 (hors propagation DNS) | l'adresse du site |

**Budget dépassé** : s'arrêter, publier le document en l'état, dire en une phrase ce
qui manque, puis demander (outil de question à choix) : « Valider en l'état » /
« Continuer (environ N min de plus) » / « Modifier ». Jamais de dépassement en silence.
Noter le temps passé dans `00-etat.md` (colonne « Temps »).

### Les leviers qui font tenir l'heure

1. **Un seul questionnaire, au démarrage** (`demarrer` § 4). Ensuite, **aucune question
   au fil de l'eau** : un manque devient une `[hypothèse]` visible dans le document, et
   se tranche à la porte de validation (§ 4). Seules autres questions : la porte de
   chaque étape, et à la maquette les points mis de côté (« À confirmer en voyant la
   maquette », conventions § 3).
2. **Les choix ne sont pas des questions.** Direction de charte, composition, style,
   image maîtresse, titre : Claude prend l'option recommandée, la montre dans le
   document, avec les autres en une ligne chacune. L'utilisateur en change par
   « Modifier ».
3. **Version courte par défaut.** Le document suit son modèle
   (`${CLAUDE_PLUGIN_ROOT}/commun/modeles/`, § 3), en version courte. « Approfondir » se
   propose en une ligne à la porte, et ne se fait que sur demande.
4. **En parallèle, toujours.** Recherches web, lectures de sites, générations,
   sous-agents (outil `Agent`) : lancés **ensemble, dans un même message**, jamais l'un
   après l'autre.
   **Le plus d'agents possible** : à chaque étape, une tâche indépendante = un agent,
   tous lancés ensemble (tableau par étape : `${CLAUDE_PLUGIN_ROOT}/commun/agents.md`).
   **Les sous-agents tournent en Sonnet** (`model: "sonnet"`, réglé dans chaque agent du
   plugin) : recherches, lectures de sites,
   pages secondaires, relectures, client simulé. Les choix de direction (charte,
   composition, accueil de la maquette) restent à l'agent principal.
5. **Pas d'image générée avant l'étape 6** (médias), sauf le logo quand il est
   indispensable (création, piste symbole). À l'étape 3 : couleurs, typos, et le
   moodboard de l'étape 3 (12 à 15 images libres de banque, planche composée ; images
   générées seulement avec un oui et le coût annoncé).
6. **Une seule relecture lourde, à la maquette.** Le relecteur et la boucle persona
   font **un tour rapide**, à l'étape 7, lancés en parallèle ; les tours suivants
   seulement si l'utilisateur les demande (exception : la boucle automatique d'un
   objet 3D, § 5). Aux autres étapes : relecture soi-même, en
   une minute (conventions § 6).
7. **Jamais plus de 2 minutes sans montrer quelque chose** (§ 2).

## 2. Montrer : jamais plus de 2 minutes sans rien voir

- **Le premier visuel, en moins de 5 minutes** : le **tableau de bord du projet**,
  publié par `demarrer` avant le questionnaire. Il montre les 12 étapes en frise (faites,
  en cours, à venir), le budget de temps de chacune, le lien du document de chaque
  étape, les décisions clés, le budget IA et la prochaine étape. Sa source est
  `00-etat.md`. Il est **mis à jour au même lien** à la fin de chaque étape, et par
  `statut`.
- **Annoncer.** Avant tout travail de plus de 2 minutes : une ligne, « Je lis tes 4
  concurrents en parallèle, environ 3 minutes. »
- **Donner un point d'avancement** toutes les 2 minutes environ, en une ligne (« 3
  concurrents sur 4 lus, le tableau arrive »).
- **Montrer les résultats intermédiaires dès qu'ils existent** : les publier dans le
  document de l'étape, même incomplet, marqué « en cours ». Le tableau des concurrents
  avant les personas, la palette avant le logo, l'accueil avant les autres pages,
  l'image maîtresse avant la série.
- Une tâche en arrière-plan (sous-agent, génération) n'empêche pas de montrer ce qui
  est déjà prêt.

## 3. Le document de l'étape

Chaque étape produit **un vrai document professionnel**, comme une agence le remettrait.

- **La source** reste le fichier `.md` de `projet-site/` (structure du modèle
  `templates/` du skill) : c'est lui que lisent les étapes suivantes.
- **Le document présenté** en est la version mise en forme pour l'utilisateur. Il suit
  le modèle d'agence de `${CLAUDE_PLUGIN_ROOT}/commun/modeles/`, **en version courte par
  défaut**. Modèle introuvable : garder les titres du `.md` et la mise en forme
  ci-dessous.
- **Un seul lien par document**, mis à jour à chaque modification. Le lien va dans
  `00-etat.md` (colonne « Document ») et dans le tableau de bord.

| Étape | Document présenté | Modèle (`commun/modeles/`) | Forme |
|---|---|---|---|
| 0 | Tableau de bord du projet | — | page |
| 1 | Document de cadrage | `cadrage.md` | document |
| 2 | Plateforme de marque | `plateforme-de-marque.md` | document |
| 3 | Charte graphique | `charte-graphique.md` | design |
| 4 | Architecture du site (schéma, zonings et wireframes) | `architecture.md` | document |
| 5 | Contenus, page par page | `contenus.md` | document |
| 6 | Plan médias, avec la galerie des images | `plan-medias.md` | document |
| 7 | Maquette (canevas ou prototype animé) | `maquette.md` | design |
| 8 | Design system | `design-system.md` | design |
| 9 | Vérification avant de coder (`09-passation.md`, partie A) | `passation.md` (partie A) | document |
| 10 | PRD et plan de construction | `prd.md` | document |
| 11 | Recette (`11-recette.md`), et le site en aperçu | `recette.md` | document |
| 12 | Mise en ligne et remise du site (`09-passation.md`, partie B) | `passation.md` (partie B) | document |

**Ce qui fait un document d'agence** : une couverture (projet, étape, date, statut),
une synthèse en tête, les sections du modèle, des tableaux plutôt que des paragraphes,
de vrais éléments visuels là où ils comptent (pastilles de couleur réelles, typos
affichées, schéma d'arborescence, images du site placées). Les marques internes
(`[source]`, `[hypothèse]`, `[À PROUVER]`) y deviennent des notes lisibles : « Source :
lien », « À vérifier avec toi ». Aucun jargon non expliqué (conventions § 3).

### Comment publier — trois cas

Regarder ce que la session offre, sans rien appeler pour tester.

1. **L'outil `Artifact` est présent** (Claude Code, application de bureau ou web) :
   - document texte : `action: "quickstart"`, `intent: "document"` ; si le résultat
     liste le type Docs, partir de ce type ; sinon une page HTML soignée ;
   - charte, design system, maquette : `intent: "design"` (Claude Design) ; sinon une
     page HTML soignée ;
   - tableau de bord : `intent: "other"` ;
   - suivre ce que dit le résultat du quickstart (type, design system, façon de le
     remplir) ; mettre à jour en republiant **au même lien** (même fichier, ou `url`).
2. **Conversation claude.ai ou Cowork** (artifacts natifs, sans outil `Artifact`) :
   créer un artifact — un **document Markdown** pour les documents texte, une **page
   HTML** pour la charte, le design system et le tableau de bord, Claude Design s'il
   est là pour le design system et la maquette. À chaque retouche, **modifier le même
   artifact**, ne pas en créer un nouveau. Proposer aussi le téléchargement du `.md`
   (conventions § 0).
3. **Terminal, sans artifacts** : une page HTML locale et autonome,
   `projet-site/documents/NN-nom.html` (même contenu, même mise en forme), ouverte dans
   l'aperçu du navigateur (outil d'aperçu ou navigateur intégré s'il existe, servie par
   `python3 -m http.server` si besoin) ; sinon donner le chemin et la commande
   `open projet-site/documents/NN-nom.html`. Le fichier est réécrit à chaque retouche.

**Dans tous les cas : un document lisible à l'écran, jamais une image.** Interdit de
présenter une étape par une image générée ou par la capture d'écran d'une page. Les
captures servent au contrôle (relecteur, responsive), jamais de livrable. Les images
générées sont des **médias du site** (étape 6) : elles se placent dans un document,
jamais seules.

## 4. La porte de validation

À la fin de **chaque** étape, dans cet ordre :

1. **Publier** le document de l'étape (§ 3), à jour, et mettre à jour le tableau de
   bord.
2. **Résumer en 3 à 5 points** : ce qui est décidé, ce qui reste en hypothèse. Puis le
   lien du document.
3. **Poser une seule question de validation**, avec l'outil de question à choix
   (`AskUserQuestion`) s'il existe : « On valide [le document] et on passe à [étape
   suivante] ? », options **« Valider et passer à l'étape suivante »** /
   **« Modifier »**. Sans outil : la même question, en dernière ligne du message. Une
   ligne peut ajouter : « Tu peux aussi me demander d'approfondir. »
4. **Attendre.** Ne **jamais** démarrer l'étape suivante sans un oui explicite. Pas
   d'enchaînement automatique, **en aucun mode** : rapide, approfondi, session autonome,
   permissions élargies. Un silence, ou un « ok » qui répond à autre chose, n'est pas
   un oui. Un agent qui joue le client ne répond jamais à la porte à la place de
   l'utilisateur.

Puis :
- **« Valider »** : passer le `.md` en `validé`, mettre à jour `00-etat.md` et le tableau
  de bord, puis lancer la skill suivante (outil `Skill`) dans le même tour.
- **« Modifier »** : appliquer le retour s'il est déjà dit, sinon demander quoi en une
  question ; corriger le `.md` et le document **au même lien** ; dire en une ligne ce
  qui a changé ; reposer la porte.
- **« Pas maintenant »**, ou autre chose : rappeler que `/lancetonsite:statut` permet de
  reprendre.

Pendant une étape, aucune autre porte : les points d'avancement (§ 2) suffisent. Un
tour qui attend l'utilisateur finit toujours par **une** question claire.

**Seule exception : les objets 3D** (§ 5). Le skill `objets-3d` pose sa propre porte
(valider l'objet avant les rendus finaux, longs en temps machine), à l'intérieur de
l'étape qui l'appelle (médias, maquette, construction). Pendant sa boucle de correction,
un point d'avancement d'une ligne suffit, sans montrer d'image. Après les rendus finaux,
retour à l'étape appelante, dont la porte reste celle de ce § 4.

## 5. Les objets 3D : Blender, avec leur propre boucle et leur propre porte

Dès qu'un site gagne à montrer un objet (produit, contenant, outil, pièce), le proposer en
3D sans attendre qu'on le demande, et le faire **dans Blender** avec le skill `objets-3d`
(`${CLAUDE_PLUGIN_ROOT}/skills/objets-3d/SKILL.md`). Il est appelé par l'étape 6 (médias :
photos produit, animations, `.glb`), l'étape 7 (maquette : le moment signature) et
l'étape 11 (construction : objet manquant ou à refaire).

- **Blender d'abord**, par script, sans interface ; le produit du client est modélisé,
  jamais généré par IA. Blender absent : demander le oui avant de l'installer.
- **Boucle de correction automatique** avant de montrer : un agent `client-persona` neuf
  note l'aperçu sur 100 à chaque tour, jusqu'à 85 et « je paierais », 3 tours au plus.
- **Porte de validation avant les rendus finaux** (exception du § 4, même forme) : aperçu, note, ce qui
  reste en hypothèse, puis « Valider et lancer les rendus finaux » / « Modifier ».
- **Hors budget de l'heure** : les rendus finaux tournent en tâche de fond (plusieurs
  minutes par image) ; l'étape montre l'aperçu validé en attendant (§ 2).
