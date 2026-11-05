---
name: marque
description: 'Construit la plateforme de marque à partir du cadrage — mission, valeurs prouvées, positionnement, promesse en une phrase, messages clés, preuves, et voix de marque avec exemples « on dit / on ne dit pas ». Teste chaque message contre les concurrents. Étape 2 de Lance ton site.'
when_to_use: '"plateforme de marque", "positionnement", "ton de marque", "voix de marque", "slogan", "promesse", "mission et valeurs", "comment je parle à mes clients", ou /lancetonsite:marque.'
---

# Plateforme de marque

**Équipe d'agents** : lancer ensemble, dès le début, tout ce que prévoit
`${CLAUDE_PLUGIN_ROOT}/commun/agents.md` pour cette étape (un agent Sonnet par source,
page ou pièce indépendante).

Lire `${CLAUDE_PLUGIN_ROOT}/commun/conventions.md` et
`${CLAUDE_PLUGIN_ROOT}/commun/parcours.md` (rythme, document publié, porte de
validation). **Budget : 5 min.** Document présenté : suivre le modèle
`${CLAUDE_PLUGIN_ROOT}/commun/modeles/plateforme-de-marque.md`, version courte par
défaut. Aucune nouvelle recherche : les concurrents et les citations viennent du
cadrage.

La personnalité avant l'image : la charte (étape 3) et les textes (étape 5) découlent de
ce document.

## Entrées

- `projet-site/01-cadrage.md` (obligatoire) — personas, citations, concurrence, différence.

## 1. Positionnement

Remplir la phrase en partant des preuves du cadrage (sans entretien par défaut ; avec
l'utilisateur en mode approfondi) :

> Pour **[segment]** qui **[besoin / déclencheur]**, **[nom]** est **[catégorie]** qui
> **[bénéfice principal]**. Contrairement à **[alternative principale]**, **[preuve de la
> différence]**.

Puis la réduire à une **promesse de 10 mots maximum**.

**Test de substitution** : remplacer le nom par celui d'un concurrent. Si la phrase reste
vraie, elle est ratée — recommencer. Écrire 3 variantes, **retenir la recommandée** et
montrer les deux autres en une ligne chacune dans le document : l'utilisateur en change
à la porte de validation, sans question à part (`parcours.md` § 1). Publier la promesse
et ses variantes dès qu'elles existent : c'est le premier visuel de l'étape.

## 2. Mission, vision, valeurs

- **Mission** : ce que l'entreprise fait chaque jour, pour qui, en une phrase concrète.
- **Vision** : ce qui aura changé si elle réussit.
- **Valeurs** : 3 à 4 maximum. Chacune avec **un comportement observable** et **une
  preuve** (un fleuriste : « on ne livre jamais un bouquet monté la veille » ; un
  cabinet comptable : « on répond à chaque mail sous 24 h ouvrées »).
  Une valeur sans comportement (« excellence », « passion ») est supprimée.

## 3. Messages clés

- 1 message principal (la promesse développée en 2 phrases).
- 3 à 5 messages secondaires, chacun relié à une douleur ou un déclencheur du cadrage,
  avec sa preuve. Pas de preuve → `[à prouver : …]`.
- Pour chaque persona : l'angle qui lui parle le plus, et l'objection à lever.
- Pitch en 10 secondes, en 30 secondes.

## 4. Voix de marque

Méthode : [references/methode-voix.md](references/methode-voix.md) (inspirée de
`product-marketing`, coreyhaines31/marketingskills, MIT ; original :
[voix-de-marque.en.md](references/voix-de-marque.en.md)).

1. Rassembler 5 à 10 échantillons : messages de l'utilisateur (questionnaire compris),
   posts qui ont marché, et la façon dont les clients parlent (banque de citations).
   Sans échantillon : partir des mots du questionnaire ; en mode approfondi, lui
   demander de raconter à l'oral comment il présente son activité à un client.
2. Situer la voix sur 4 curseurs : formel ↔ familier, sérieux ↔ joueur, expert ↔
   accessible, sobre ↔ expressif. Une position par curseur, justifiée.
3. 3 à 5 traits. Pour chacun : **ce que ça veut dire / ce que ça ne veut pas dire / une
   phrase exemple**.
4. Tu ou vous — trancher et justifier par la cible. Et **qui parle** : reprendre
   `00-etat.md` (« je », « nous », la marque) ; le noter en tête de la voix. Toutes les pages l'appliquent, jusqu'aux micro-textes.
5. Tableau « on dit / on ne dit pas » : 8 à 12 lignes, tirées du vrai vocabulaire client.
6. Le ton selon la situation : page d'accueil, erreur de formulaire, confirmation,
   réponse à un avis négatif, réseaux sociaux.
7. Mots interdits : jargon du métier que les clients n'emploient pas, et les tics de texte
   IA (« Libérez votre potentiel », « Vivez l'expérience », « Plongez dans… »,
   « Bien plus qu'un simple… »).

**Test à l'aveugle** : écrire une même accroche dans la voix de la marque et dans celle
d'un concurrent ; l'utilisateur doit reconnaître la sienne. Sinon, affiner.
Par défaut, ne pas le poser ici (aucune question au fil de l'eau) : il se fait sur la
maquette, avec les vraies phrases de la page (`maquette`, § 3, « Les questions mises de
côté »). Le noter dans « À confirmer en voyant la maquette ».

## 5. Nom (seulement si demandé)

Si le projet n'a pas encore de nom : 10 pistes réparties sur 4 familles (descriptif,
évocateur, inventé, propre au fondateur), puis pour les 3 retenues : prononciation,
sens dans d'autres langues, disponibilité du domaine `.fr`/`.com` (recherche web) et
recherche d'antériorité indicative sur la base INPI. Rappeler qu'une vraie recherche
d'antériorité relève d'un professionnel.

## 6. Le document

Rédiger `projet-site/02-marque.md` avec [templates/02-marque.md](templates/02-marque.md).
Relecture soi-même en une minute (agent `relecteur` en mode approfondi), puis publier la
plateforme de marque (`parcours.md` § 3) et **porte de validation** (`parcours.md`
§ 4) : jamais la charte sans un oui. `00-etat.md` et tableau de bord à jour. Prochaine
étape : `/lancetonsite:charte`.
