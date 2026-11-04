---
name: marque
description: 'Construit la plateforme de marque à partir du cadrage — mission, valeurs prouvées, positionnement, promesse en une phrase, messages clés, preuves, et voix de marque avec exemples « on dit / on ne dit pas ». Teste chaque message contre les concurrents. Étape 2 de Lance ton site.'
when_to_use: '"plateforme de marque", "positionnement", "ton de marque", "voix de marque", "slogan", "promesse", "mission et valeurs", "comment je parle à mes clients", ou /lancetonsite:marque.'
---

# Plateforme de marque

Lire `${CLAUDE_PLUGIN_ROOT}/commun/conventions.md`.

La personnalité avant l'image : la charte (étape 3) et les textes (étape 5) découlent de
ce document.

## Entrées

- `projet-site/01-cadrage.md` (obligatoire) — personas, citations, concurrence, différence.

## 1. Positionnement

Remplir la phrase, avec l'utilisateur, en partant des preuves du cadrage :

> Pour **[segment]** qui **[besoin / déclencheur]**, **[nom]** est **[catégorie]** qui
> **[bénéfice principal]**. Contrairement à **[alternative principale]**, **[preuve de la
> différence]**.

Puis la réduire à une **promesse de 10 mots maximum**.

**Test de substitution** : remplacer le nom par celui d'un concurrent. Si la phrase reste
vraie, elle est ratée — recommencer. Proposer 3 variantes, recommander une, faire choisir.

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

1. Rassembler 5 à 10 échantillons : messages de l'utilisateur à ses clients, posts qui ont
   marché, et la façon dont les clients parlent (banque de citations). Sans échantillon :
   lui demander de raconter à l'oral (ou par message vocal transcrit) comment il
   présente son activité à un client, et partir de ses mots ; le test à l'aveugle se fait
   alors avec lui, pas avec deux versions écrites par l'IA.
2. Situer la voix sur 4 curseurs : formel ↔ familier, sérieux ↔ joueur, expert ↔
   accessible, sobre ↔ expressif. Une position par curseur, justifiée.
3. 3 à 5 traits. Pour chacun : **ce que ça veut dire / ce que ça ne veut pas dire / une
   phrase exemple**.
4. Tu ou vous — trancher et justifier par la cible. Et **qui parle** : reprendre
   `00-etat.md` (« je », « nous », la marque) ou le demander s'il n'est pas fixé ; le
   noter en tête de la voix. Toutes les pages l'appliquent, jusqu'aux micro-textes.
5. Tableau « on dit / on ne dit pas » : 8 à 12 lignes, tirées du vrai vocabulaire client.
6. Le ton selon la situation : page d'accueil, erreur de formulaire, confirmation,
   réponse à un avis négatif, réseaux sociaux.
7. Mots interdits : jargon du métier que les clients n'emploient pas, et les tics de texte
   IA (« Libérez votre potentiel », « Vivez l'expérience », « Plongez dans… »,
   « Bien plus qu'un simple… »).

**Test à l'aveugle** : écrire une même accroche dans la voix de la marque et dans celle
d'un concurrent ; l'utilisateur doit reconnaître la sienne. Sinon, affiner.
En mode rapide, ne pas le poser ici (le budget de questions est compté) : il se fait
sur la maquette, avec les vraies phrases de la page (`maquette`, § 3, « Les questions
mises de côté »). Le noter dans « À confirmer en voyant la maquette ».

## 5. Nom (seulement si demandé)

Si le projet n'a pas encore de nom : 10 pistes réparties sur 4 familles (descriptif,
évocateur, inventé, propre au fondateur), puis pour les 3 retenues : prononciation,
sens dans d'autres langues, disponibilité du domaine `.fr`/`.com` (recherche web) et
recherche d'antériorité indicative sur la base INPI. Rappeler qu'une vraie recherche
d'antériorité relève d'un professionnel.

## 6. Le document

Rédiger `projet-site/02-marque.md` avec [templates/02-marque.md](templates/02-marque.md).
Relecture `relecteur`, validation, `00-etat.md`. Prochaine étape : `/lancetonsite:charte`.
