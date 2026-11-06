# Modèle : PRD (document d'exigences produit)

> Livrable : `projet-site/10-prd.md` · Étape 10 · Version courte : 4 min visées (la vérification de l'étape 9, partie A de la passation, comprise)

## À quoi il sert

Le PRD dit **ce que le site doit faire** et à quoi on reconnaîtra qu'il le fait, avant
d'écrire une ligne de code. Les bons PRD restent courts : objectifs, hypothèses,
histoires d'utilisateurs, renvois au design, questions ouvertes et, surtout, ce qui est
hors périmètre. Il est la référence de la recette : chaque critère d'acceptation
deviendra un test.

Lecteur : le patron (objectifs, périmètre, stack et coûts) ; Claude en construction
(le reste).

## Sommaire type

| # | Section | Contenu exact | Longueur | Forme |
|---|---|---|---|---|
| 1 | Fiche | Statut, date de mise en ligne visée, qui décide, liens vers la maquette et le dossier projet | 5 lignes | Tableau |
| 2 | Objectif et mesures de succès | Objectif repris du cadrage ; 2 à 3 indicateurs avec cible et outil de mesure | 4 lignes | Tableau indicateur / cible / outil |
| 3 | Hypothèses | Sur les visiteurs, la technique, le métier ; chacune avec son risque | 3 à 6 lignes | Tableau hypothèse / risque si fausse |
| 4 | Exigences fonctionnelles | Une histoire par fonction : « En tant que…, je veux…, pour… », priorité, critères d'acceptation | 1 bloc par fonction | Tableau numéroté (E1, E2…) |
| 5 | Exigences non fonctionnelles | Performance, accessibilité, SEO technique, sécurité, RGPD, navigateurs, chacune chiffrée | 6 à 10 lignes | Tableau exigence / seuil / vérification |
| 6 | Design | Renvoi à la maquette, au design system, aux médias ; états à prévoir (vide, erreur, chargement) | 4 lignes | Liens |
| 7 | Stack et hébergement | Stack retenue, raison (qui maintient le site), hébergement, coûts récurrents | 5 lignes | Tableau |
| 8 | Contenus et intégrations | Formulaires, e-mails, outils tiers (paiement, agenda, CRM, analytics) | 3 à 6 lignes | Tableau |
| 9 | Questions ouvertes | Question, qui répond, date, réponse | 2 à 6 lignes | Tableau |
| 10 | Hors périmètre | Ce que cette version ne fera pas, précisément | 3 à 8 lignes | Liste |

### Détails qui comptent

- **Critères d'acceptation** testables (forme « Étant donné… quand… alors… ») :

| # | Histoire | Priorité | Critères d'acceptation |
|---|---|---|---|
| E1 | En tant qu'artisan, je veux demander un essai depuis l'accueil pour tester sans appeler. | Indispensable | Le formulaire tient en 3 champs ; une confirmation s'affiche en moins de 2 s ; un e-mail part vers l'adresse saisie. |

- **Non fonctionnel chiffré** : « LCP < 2,5 s sur mobile 4G », « contrastes AA sur toutes
  les pages », « score Lighthouse accessibilité ≥ 95 », jamais « site rapide ».
- **Hors périmètre** : le rempart contre les demandes qui s'ajoutent en cours de route.

## Ce qui le rend « niveau agence »

1. Chaque exigence fonctionnelle a des critères d'acceptation vérifiables.
2. Chaque exigence non fonctionnelle a un seuil chiffré et un outil de vérification.
3. La stack est justifiée par la personne qui maintiendra le site, avec ses coûts
   récurrents.
4. Le hors-périmètre a au moins 3 éléments nommés.
5. Les questions ouvertes ont un responsable et une date.

## Version courte (par défaut)

Temps visé : 4 min. Presque tout est repris des étapes précédentes : objectifs (cadrage),
pages et parcours (architecture), états (design system).

- **On garde** : fiche, objectif et 2 mesures, 4 à 8 exigences fonctionnelles avec
  critères, 5 exigences non fonctionnelles chiffrées, stack, hors périmètre.
- **On reporte** : hypothèses détaillées, intégrations secondaires, plan de mesure
  analytics complet.

```markdown
# PRD — {Nom}
> Étape 10 — mis à jour le JJ/MM/AAAA — statut : brouillon

| Statut | Mise en ligne visée | Décideur | Maquette |
|---|---|---|---|

## Objectif et mesures
| Indicateur | Cible | Outil |
|---|---|---|

## Exigences fonctionnelles
| # | Histoire | Priorité | Critères d'acceptation |
|---|---|---|---|

## Exigences non fonctionnelles
| Exigence | Seuil | Vérification |
|---|---|---|

## Stack
| Choix | Raison | Coût récurrent |
|---|---|---|

## Hors périmètre
- …
```

## Comment le publier

Markdown en artifact Docs. Les tableaux suffisent ; aucun visuel.

## Sources consultées

- Atlassian, ce que contient un PRD agile (objectifs, hypothèses, histoires, design,
  hors périmètre) : https://www.atlassian.com/agile/product-management/requirements
- Atlassian, modèle de PRD Confluence (mesures de succès, questions, hors périmètre) :
  https://www.atlassian.com/software/confluence/templates/product-requirements
- Figr, sections d'un PRD et critères d'acceptation :
  https://figr.design/blog/how-to-write-a-product-requirements-document
