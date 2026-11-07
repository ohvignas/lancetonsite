---
name: marque
description: 'Construit la plateforme de marque à partir du cadrage — mission, valeurs prouvées, positionnement, promesse en une phrase, messages clés, preuves, et voix de marque avec exemples « on dit / on ne dit pas ». Teste chaque message contre les concurrents. Étape 2 de Lance ton site.'
when_to_use: '"plateforme de marque", "positionnement", "ton de marque", "voix de marque", "slogan", "promesse", "mission et valeurs", "comment je parle à mes clients", ou /lancetonsite:marque.'
---

# Plateforme de marque

**Équipe d'agents** : pas de `chercheur`, sauf si un nom reste à trouver (§ 6) : alors un
`chercheur` par piste de nom, lancés ensemble (`${CLAUDE_PLUGIN_ROOT}/commun/agents.md`).

Lire `${CLAUDE_PLUGIN_ROOT}/commun/conventions.md` et
`${CLAUDE_PLUGIN_ROOT}/commun/parcours.md` (rythme, document publié, porte de
validation). Document présenté : suivre le modèle
`${CLAUDE_PLUGIN_ROOT}/commun/modeles/plateforme-de-marque.md`, en entier. Tout ce que ce
skill demande se fait (`parcours.md` § 1). Aucune nouvelle recherche : les concurrents et
les citations viennent du cadrage. Aucune question en cours d'étape : un manque devient une
`[hypothèse]`, une preuve manquante un `[à prouver : …]`.

La personnalité avant l'image : la charte (étape 3) et les textes (étape 5) découlent de
ce document.

## Entrées

- `projet-site/01-cadrage.md` (obligatoire) — personas, citations, concurrence, différence.

## 1. Positionnement

Remplir la phrase en partant des preuves du cadrage :

> Pour **[segment]** qui **[besoin / déclencheur]**, **[nom]** est **[catégorie]** qui
> **[bénéfice principal]**. Contrairement à **[alternative principale]**, **[preuve de la
> différence]**.

Puis la réduire à une **promesse de 10 mots maximum**, qui nomme un bénéfice client.

**Test de substitution** : remplacer le nom par celui d'un concurrent. Si la phrase reste
vraie, elle est ratée — recommencer. Écrire 3 variantes, **retenir la recommandée** et
montrer les deux autres en une ligne chacune dans le document (section « Variantes
écartées ») : l'utilisateur en change
à la porte de validation, sans question à part (`parcours.md` § 1). Publier la promesse
et ses variantes dès qu'elles existent : c'est le premier visuel de l'étape.

## 2. Raison d'être, vision, mission, valeurs

- **Raison d'être** : pourquoi l'entreprise existe, au-delà de gagner de l'argent. Une
  phrase, puis son développement en 3 lignes au plus.
- **Vision** : ce qui aura changé dans 5 à 10 ans si elle réussit, en une phrase.
- **Mission** : ce que l'entreprise fait chaque jour, et pour qui, en une phrase concrète.
- **Valeurs** : 3 à 4 maximum. Chacune avec **un comportement observable**, **une
  preuve** et **ce qu'elle interdit** (un fleuriste : « on ne livre jamais un bouquet monté
  la veille » ; un cabinet comptable : « on répond à chaque mail sous 24 h ouvrées »).
  Une valeur sans comportement (« excellence », « passion ») est supprimée.

## 3. Messages clés

- 1 message principal (la promesse développée en 2 phrases).
- 3 à 5 messages secondaires, chacun relié à une douleur ou un déclencheur du cadrage,
  avec sa preuve et l'endroit où il apparaîtra. Pas de preuve → `[à prouver : …]`.
- Pour chaque persona : l'angle qui lui parle le plus, et l'objection à lever.
- Pitch en 10 secondes, en 30 secondes.
- **Test concurrentiel** : passer la promesse et chaque message à la même épreuve que le
  test de substitution, face au concurrent du cadrage le plus proche. Écrire le verdict
  (message / concurrent le plus proche / verdict) ; un message qu'un concurrent pourrait
  signer est réécrit.

## 4. Voix de marque

Méthode : [references/methode-voix.md](references/methode-voix.md) (inspirée de
`product-marketing`, coreyhaines31/marketingskills, MIT ; original :
[voix-de-marque.en.md](references/voix-de-marque.en.md)).

1. Rassembler 5 à 10 échantillons : messages de l'utilisateur (questionnaire compris),
   posts qui ont marché, et la façon dont les clients parlent (banque de citations).
   Sans échantillon de l'utilisateur : partir des mots du questionnaire.
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

**Test de voix** : l'utilisateur doit reconnaître sa voix. Il ne se pose pas ici (aucune
question au fil de l'eau) : il se fait sur la maquette, avec les vraies phrases de la page
(`maquette`, § 3, « Les questions mises de côté »). Le noter dans `00-etat.md`, « Décisions
clés », en une ligne commençant par « À confirmer en voyant la maquette » ; la maquette la
reprend.

## 5. Prisme d'identité et manifeste

Une fois la voix écrite :

- **Prisme d'identité de Kapferer**, en tableau, chaque facette en 1 à 2 lignes, avec sa
  source dans le cadrage ou ce document :
  - **physique** : ce qu'on voit et touche déjà (produit, lieu, matière). Pas les couleurs
    ni le logo : ils viennent à la charte, sauf s'ils existent ;
  - **personnalité** : les traits de la voix ;
  - **culture** : l'origine et les valeurs ;
  - **relation** : le lien avec le client ;
  - **reflet** : le client tel que la marque le montre ;
  - **mentalisation** : ce que le client se dit de lui-même en achetant.
- **Manifeste** : 5 à 8 phrases dans la voix de la marque, à lire à voix haute. Chaque
  affirmation s'appuie sur une valeur ou une preuve de ce document. Aucun chiffre ni fait
  nouveau.

## 6. Nom (seulement si un nom reste à trouver)

Si le projet n'a pas encore de nom : 10 pistes réparties sur 4 familles (descriptif,
évocateur, inventé, propre au fondateur), puis pour les 3 retenues : prononciation,
sens dans d'autres langues, disponibilité du domaine `.fr`/`.com` et des réseaux (recherche web, un `chercheur` par piste) et
recherche d'antériorité indicative sur la base INPI. Rappeler qu'une vraie recherche
d'antériorité relève d'un professionnel.

## 7. Le document

Rédiger `projet-site/02-marque.md` avec [templates/02-marque.md](templates/02-marque.md).

## Avant la porte

Cocher d'après les fichiers ouverts, jamais de mémoire. Une case vide se fait maintenant.

**Le document, `projet-site/02-marque.md`**
- [ ] Toutes les sections du gabarit sont remplies, aucun champ `{{}}` ne reste. La date du cadrage utilisé est indiquée.
- [ ] La phrase de positionnement est complète, la preuve de la différence vient de `01-cadrage.md`.
- [ ] La promesse tient en 10 mots au plus, nomme un bénéfice client et passe le test de substitution, avec les concurrents testés nommés. Les 2 variantes écartées ont leur ligne.
- [ ] Raison d'être (une phrase et son développement), vision et mission sont écrites.
- [ ] 3 à 4 valeurs, chacune avec comportement, preuve et ce qu'elle interdit. Une preuve manquante est marquée `[à prouver : …]`.
- [ ] Un message principal, 3 à 5 secondaires, chacun avec sa douleur ou son déclencheur, sa preuve et l'endroit où il apparaît.
- [ ] Chaque persona du cadrage a son angle, son objection et sa réponse. Les pitchs en 10 et 30 secondes sont écrits.
- [ ] Les 4 curseurs sont placés et justifiés. Tu ou vous est tranché. Qui parle est repris de `00-etat.md`.
- [ ] 3 à 5 traits, chacun avec ce que ça veut dire, ce que ça ne veut pas dire et une phrase exemple.
- [ ] 8 à 12 lignes « on dit / on ne dit pas », tirées de la banque de citations.
- [ ] Le ton est donné pour l'accueil, l'erreur de formulaire, la confirmation, l'avis négatif et les réseaux sociaux, avec un exemple pour chacun.
- [ ] Les mots interdits sont listés : jargon du métier et tics de texte IA.
- [ ] Le test concurrentiel couvre la promesse et chaque message, avec le concurrent le plus proche et le verdict. Aucun message n'est signable par un concurrent.
- [ ] Le prisme a ses 6 facettes, chacune avec sa source. Le manifeste tient en 5 à 8 phrases et n'ajoute aucun fait.
- [ ] Le nom, seulement s'il restait à trouver : 10 pistes, 3 retenues vérifiées (prononciation, langues, domaines, réseaux, INPI indicatif) et le rappel sur l'antériorité.

**L'état et la fiche**
- [ ] `projet-site/00-etat.md` : l'étape est marquée « brouillon », avec le lien du document, et contient la ligne « À confirmer en voyant la maquette » pour le test de voix.
- [ ] `projet-site/boucle-persona/fiche-client.md` : les interdits de la voix et le positionnement y sont ajoutés. Elle est écrite maintenant depuis `skills/cadrage/templates/fiche-client.md` si elle manque.

Puis le **contrôle d'étape** (`${CLAUDE_PLUGIN_ROOT}/commun/boucle-persona.md`, « Le contrôle
d'étape »).

Puis publier la plateforme de marque (`parcours.md` § 3) et **porte de validation**
(`parcours.md` § 4), avec la note du contrôle : jamais la charte sans un oui. `00-etat.md`
et tableau de bord à jour. Prochaine étape : `/lancetonsite:charte`.
