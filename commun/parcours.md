# Le parcours — montrer, valider, avancer

La source unique pour le rythme du parcours. Chaque skill d'étape y renvoie en une ligne.
Les modèles de `commun/modeles/` donnent la **forme** des documents ; pour le rythme
(porte de validation à chaque étape, relecture, dépassement de budget), ce fichier
prime.

**Un seul parcours, complet.** `/lancetonsite:demarrer` enchaîne les 12 étapes dans l'ordre, chacune
montrée et validée ; aucune n'est sautée, quels que soient les mots du premier message. « Rythme »,
« section par section », « le hero d'abord » ou « je veux aller vite » disent comment on avance, jamais
quelle étape retirer.

**Une étape à la main.** Chaque skill d'étape se lance aussi seul (`/lancetonsite:charte`…) : on prend ce
qu'on veut. Il travaille avec les documents présents et suit conventions § 2 pour ce qui manque. Ce
fichier s'y applique de la même façon, y compris la porte de validation ; sur « Valider », lancé à la
main (ligne « Enchaînement : manuel » de `00-etat.md`), il propose l'étape suivante sans la lancer d'office.

Quatre engagements envers l'utilisateur :
- un **temps visé par étape** (§ 1), jamais promis, et le temps réel noté ;
- il **voit quelque chose toutes les 2 minutes** ;
- chaque étape lui livre **un vrai document**, lisible à l'écran, au même lien d'un bout
  à l'autre ;
- **rien n'avance sans son oui.**

## 1. Les budgets de temps

Budget indicatif, en minutes de travail de Claude (hors temps de réponse de
l'utilisateur, hors attente d'une génération lancée en lot). **Ce sont des objectifs : le
parcours n'a jamais été chronométré de bout en bout. Ne pas les annoncer comme une promesse**,
dire « visé » et noter le temps réel. Sur le projet de test Kweeto, les durées réelles ont été
nettement plus longues que ce tableau.

**Mesures réelles, à donner comme repères seulement** : relevées sur un ancien parcours plus court, le
parcours complet n'a pas été chronométré. Page d'accueil seule, sans client simulé, sans essai réel, sans
autres pages ni mise en ligne : 25 min 30 s, environ 4,13 $ estimés (Atelier Mélisse, 06/11/2026). Client
simulé : `rapide` 7 min 01, `controle` entre 8 min 48 et 11 min 19. Pages construites par agents : 7 pages en 4 min.

| Étape | Budget | Ce qu'on montre en premier |
|---|---|---|
| 0 Démarrer | 3 | le tableau de bord du projet, **avant 5 minutes** |
| 1 Cadrage | 6 | le tableau des concurrents |
| 2 Marque | 5 | la promesse et ses variantes |
| 3 Charte | 12 | la palette et les typos en situation |
| 4 Architecture | 12 | l'arborescence en schéma, puis les wireframes |
| 5 Contenus | 8 | la page d'accueil |
| 6 Médias | 8 | l'image maîtresse (ou l'aperçu de l'objet 3D) |
| 7 Maquette | 20 | le hero, à essayer sur sa machine |
| 8 Design system | 4 | l'inventaire tiré de la maquette |
| 9 Vérification + 10 PRD et plan | 4 | la liste de contrôle, puis la stack recommandée |
| 11 Construction | ~10 par page | chaque page construite, en aperçu |
| 12 Mise en ligne | ~15 (hors propagation DNS) | l'adresse du site |

**Temps visé dépassé** : le dire en une ligne, continuer, et le rappeler à la porte. Jamais de dépassement en
silence, et pas de porte de plus pour autant.
Noter le temps passé dans `00-etat.md` (colonne « Temps »).

### Les leviers pour tenir ces budgets

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
   moodboard de l'étape 3 (6 à 8 images libres de banque, planche composée ; images
   générées seulement avec un oui et le coût annoncé).
6. **Une seule relecture lourde, à la maquette.** Le relecteur et la boucle persona
   font **un tour rapide**, à l'étape 7, lancés en parallèle. La boucle persona
   enchaîne ensuite ses tours `controle` jusqu'au seuil (3 au plus), comme la boucle
   automatique d'un objet 3D (§ 5) ; un autre tour du relecteur seulement si
   l'utilisateur le demande. Aux autres étapes : relecture soi-même, en
   une minute (conventions § 6).
7. **Jamais plus de 2 minutes sans montrer quelque chose** (§ 2).

## 2. Montrer : jamais plus de 2 minutes sans rien voir

- **Le premier visuel, en moins de 5 minutes** : le **tableau de bord du projet**,
  publié par `demarrer` avant le questionnaire. Il montre **la frise des 12 étapes** (faites, en
  cours, à venir), avec le budget de temps visé de chacune. Puis le lien du document de chaque pièce, les décisions clés, le
  budget IA et la prochaine étape. Sa source est `00-etat.md`. Il est **mis à jour au même
  lien** à la fin de chaque étape, et par `statut`.
- **Marquer l'étape.** En la commençant, passer son statut à « en cours » dans `00-etat.md` et au tableau de
  bord ; à « brouillon » dès qu'un document est publié. Après une coupure, on sait où reprendre.
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
   `commun/scripts/servir.py` si besoin) ; sinon donner le chemin et la commande
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
   d'enchaînement automatique, ni en session autonome ni avec des permissions élargies. Un silence, ou un « ok » qui répond à autre chose, n'est pas
   un oui. Un agent qui joue le client ne répond jamais à la porte à la place de
   l'utilisateur.

Puis :
- **« Valider »** : passer le `.md` en `validé`, mettre à jour `00-etat.md` et le tableau
  de bord, puis lancer la skill suivante (outil `Skill`) dans le même tour ; « Enchaînement : manuel » : la
  proposer seulement.
- **« Modifier »** : appliquer le retour s'il est déjà dit, sinon demander quoi en une
  question ; corriger le `.md` et le document **au même lien** ; dire en une ligne ce
  qui a changé ; reposer la porte.
- **« Pas maintenant »**, ou autre chose : rappeler que `/lancetonsite:statut` permet de
  reprendre.

**« Continue seul », « ne me demande plus »**, écrit par l'utilisateur lui-même, vaut oui pour les portes des
étapes de conception et de construction, à noter dans `00-etat.md` (« validé sans relecture ») : aucune
étape, aucun agent, aucun texte, média ni test ne saute pour autant. Il ne vaut jamais pour le hero sur sa
machine (dire ce qui reste à essayer), ni pour un achat, le DNS, le pare-feu ou la mise en ligne. « Ne mets
rien en ligne » n'interdit que le déploiement : les étapes se font et se montrent quand même.

**Le contrôle avant de dire « fini ».** Avant la porte des étapes 7 et 11, et avant toute phrase du type
« c'est fini » : `python3 ${CLAUDE_PLUGIN_ROOT}/commun/scripts/controle_parcours.py projet-site`, résultat collé
dans le message. Un point `NON` se corrige ; sinon il s'annonce tel quel, en tête du message. Une page sous le
niveau ne se présente jamais comme finie.

Pendant une étape, aucune autre porte : les points d'avancement (§ 2) suffisent. Un
tour qui attend l'utilisateur finit toujours par **une** question claire.

**Trois exceptions : le hero**, essayé sur la vraie machine de l'utilisateur à l'étape 7, avant le reste de
l'accueil ; **chaque section**, seulement s'il demande à valider section par section (`maquette` § 1 bis) ;
**les objets 3D** (§ 5). Le skill `objets-3d` pose sa propre porte
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
- **Hors budget de temps** : les rendus finaux tournent en tâche de fond (plusieurs
  minutes par image) ; l'étape montre l'aperçu validé en attendant (§ 2).
