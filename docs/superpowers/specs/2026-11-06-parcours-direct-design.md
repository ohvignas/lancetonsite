# Parcours direct : créer, passer dessus, avancer

**Date** : 6 novembre 2026. **Origine** : test réel Kweeto ; demande de « créer direct les éléments
de la maquette, passer dessus, avancer ». L'utilisateur a demandé de ne pas être interrogé cette
nuit : conception et approche retenues par défaut, à relire au réveil.

## Problème
Douze étapes de documents avant de voir le site. Sur Kweeto, ce qui a fait progresser la page est
le retour de l'utilisateur sur la vraie page, à la souris. Le client simulé a mis 87/100 à un hero
au cou cassé et au bouton tremblant. La boucle persona seule a été accélérée, et les durées
promises (« une heure ») n'ont jamais été chronométrées de bout en bout.

## Choix
Approche B : le parcours direct devient le défaut ; les 12 étapes restent, en option « dossier
agence ». Écartées : A, remplacer les 12 étapes (certains clients veulent les documents) ; C, ajouter
seulement le kit du hero (ne règle pas la lenteur).

## Le parcours (`skills/direct/SKILL.md`)
1. Fiche d'une page, recherches en arrière-plan.
2. Hero d'abord, dans un seul lien, validé point par point par l'utilisateur sur sa machine ; il
   fixe le style, le design system en est tiré.
3. Section par section sur la même page : contrôles automatiques, retour de l'utilisateur, suivante
   préparée en arrière-plan.
4. Page entière : persona et relecteur une seule fois, en parallèle, 2 tours au plus.
5. Autres pages par agents, en reprenant les sections ; mise en ligne avec accord.

Rythmes : « section par section » (défaut) et « tout d'un coup » (l'express).

## Décisions prises sans l'utilisateur
- Un skill `direct` plutôt qu'un fichier de `commun/` : commande propre et déclenchement naturel.
- **Écart avec une demande antérieure** (2 boucles persona par section) : un seul passage sur la
  page entière, car 12 sections × 2 × environ 9 min ≈ 3 h 30. À trancher par l'utilisateur.
- Sections préparées dans `site/_sections/NN-nom/`, insérées dans `index.html` par l'agent principal :
  deux agents n'écrivent jamais le même fichier. Pas de script d'assemblage de plus.
- HTML, CSS, JS par défaut ; autre technique seulement sur besoin ou demande.
- Une seule porte par section, sans document d'étape.

## Honnêteté des durées
Les durées visées sont dites visées. Le parcours se chronomètre dans `00-etat.md`. Le kit du
personnage vivant n'est éprouvé que sur un personnage.

## Tests
`commun/scripts/tests/test-procedure.sh direct` et `chrono`.
