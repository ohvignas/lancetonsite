---
name: contenus
description: 'Écrit tous les textes du site page par page, dans la voix de la marque et avec les mots réels des clients — titres, accroches, appels à l''action, FAQ, balises title et meta description, textes alternatifs, micro-textes (erreurs, confirmations), pages légales à compléter. Passe chaque texte au crible anti-« texte d''IA ». Étape 5 de Lance ton site.'
when_to_use: '"écrire les textes du site", "copywriting", "rédiger la page d''accueil", "accroche", "texte du bouton", "FAQ", "meta description", "réécrire mes textes", ou /lancetonsite:contenus.'
argument-hint: "[toutes | <nom de page>]"
---

# Contenus

Lire `${CLAUDE_PLUGIN_ROOT}/commun/conventions.md`.

Méthode adaptée de `copywriting` et `copy-editing` (coreyhaines31/marketingskills, MIT).

## Entrées

- `01-cadrage.md` — **banque de citations**, objections, déclencheurs.
- `02-marque.md` — promesse, messages, voix, « on dit / on ne dit pas ».
- `04-architecture.md` — pages, zonings, mots-clés, questions IA.
- En refonte : textes actuels dans `sources/site-actuel/`.

## Diagnostic avant d'écrire

Pour chaque page :
- **A — page blanche ou texte creux** : construire l'argumentaire depuis le cadrage. Ne
  jamais inventer un fait, un chiffre, un avis.
- **B — une vraie voix existe déjà** (refonte) : la restaurer, garder son vocabulaire.
- **C — correction ponctuelle** : ne changer que la ligne visée.

## Écrire, bloc par bloc

Suivre le zoning de l'architecture. Rédiger la page entière, en donnant **2 à 3
candidats** seulement pour les éléments décisifs (titre principal, accroche, bouton de
l'action principale), avec une recommandation. L'utilisateur valide **la page** en une
fois, en choisissant parmi les candidats regroupés en fin de page. Structures de page utiles :
[references/structures-de-pages.en.md](references/structures-de-pages.en.md).

**Le filtre en 3 questions** pour chaque phrase :
1. Le lecteur peut-il se le représenter ? (concret)
2. Peut-on le vérifier vrai ou faux ? (précis)
3. Un concurrent pourrait-il l'écrire tel quel ? (si oui, réécrire)

Règles :
- Le titre principal reprend le résultat espéré **dans les mots du client**.
- Le bouton = verbe + ce qu'on obtient (« Réserver mon cours d'essai »), jamais
  « Envoyer », « En savoir plus », « Cliquez ici ».
- Chaque objection du cadrage est levée quelque part, près de l'action.
- Affirmation sans preuve → `[À PROUVER : quelle preuve débloquerait cette phrase]`.
  Ne jamais écrire de faux avis, faux chiffre, faux logo client.
- Un ou deux moments forts par page, pas plus.
- Phrases courtes, un paragraphe = une idée, voix active.

## Le français

- Registre tu/vous fixé par la plateforme de marque, tenu partout.
- Typographie française : espace insécable avant `: ; ! ?` et dans « guillemets »,
  `€` après le nombre avec espace insécable (`25 €`), heures en `9 h 30`, nombres
  `1 500`. Apostrophe typographique ’.
- Écriture inclusive : appliquer le choix de la marque, de façon cohérente.

## SEO, sans écrire pour les robots

Par page, d'après l'architecture :
- **Title** 50-60 caractères, requête principale au début, nom de marque à la fin
  ([references/balises-title.en.md](references/balises-title.en.md)).
- **Meta description** 140-160 caractères, promesse + action.
- **Un seul H1**, hiérarchie H2/H3 sans saut.
- Requête principale dans les 100 premiers mots, naturellement.
- **Réponses autonomes** de 40 à 60 mots aux questions notées dans l'architecture,
  sous un titre formulé comme la question : c'est ce que citent les assistants IA
  ([references/seo-ia-structures.en.md](references/seo-ia-structures.en.md)).
- Textes alternatifs des images prévues (≤ 125 caractères).

## Micro-textes

Messages d'erreur de formulaire (dire quoi corriger, sans blâmer), confirmation
d'envoi, page 404, bandeau cookies, état vide, chargement. Dans la voix de la marque.

## Pages légales

Préparer les structures (mentions légales, confidentialité, cookies, CGV si vente) avec
les champs à remplir et la liste des informations à fournir. **Préciser que ces textes
doivent être vérifiés par l'utilisateur ou un professionnel du droit** ; ne jamais
inventer un numéro SIRET, une adresse ou un hébergeur.

## Relecture en 7 passes

Avant de livrer chaque page ([references/checklist-relecture.en.md](references/checklist-relecture.en.md)) :
clarté → voix → « et alors ? » (relier chaque caractéristique à un bénéfice) → preuve →
précision → émotion → risque (rassurer près de l'action).

Puis la chasse aux tics d'IA
([references/tics-ia.en.md](references/tics-ia.en.md) et la liste de
`02-marque.md`) : « Ce n'est pas X, c'est Y », listes de trois adjectifs, questions
rhétoriques suivies de leur réponse, « Plongez », « Découvrez », « Libérez »,
« Bien plus qu'un simple », tirets cadratins en série, phrases-slogans en fin de
paragraphe.

**Panel d'experts** : faire noter chaque page de 1 à 10 par 3 regards — le persona
principal, un rédacteur conversion, la voix de la marque. Itérer jusqu'à 7 minimum
pour chacun et 8 de moyenne. Pour un vrai second avis, envoyer la page à un autre modèle
via le MCP `openrouter` (`send-message`) si connecté — c'est payant : annoncer l'usage
une fois pour toute l'étape et attendre l'accord.

## Les fichiers

Un fichier par page dans `projet-site/05-contenus/`, nommé comme l'URL
(`accueil.md`, `cours-debutant.md`), avec [templates/page.md](templates/page.md).
Plus `05-contenus/_micro-textes.md` et `05-contenus/_legal.md`.

Validation page par page en mode guidé, en bloc en mode rapide. `00-etat.md`.
Prochaine étape : `/lancetonsite:design-system`.
