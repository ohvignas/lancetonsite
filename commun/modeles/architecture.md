# Modèle : architecture du site

> Livrable : `projet-site/04-architecture.md` · Étape 4 · Version courte : 12 min visées

## À quoi il sert

Il dit quelles pages existent, comment on passe de l'une à l'autre, ce que chaque page
doit faire faire au visiteur, et dans quel ordre les blocs s'y empilent. L'architecture
de l'information n'est pas un seul schéma : c'est un plan du site, des parcours, un
plan SEO et des zonings. Le patron y vérifie que son client trouve ce qu'il cherche en
deux clics et arrive toujours à l'action principale.

Lecteur : le patron (le plan et les parcours) ; Claude aux étapes 5 à 8 (le zoning).

## Sommaire type

| # | Section | Contenu exact | Longueur | Forme |
|---|---|---|---|---|
| 1 | Plan du site | Toutes les pages V1, hiérarchie, URL de chacune | 6 à 15 nœuds | Schéma Mermaid `flowchart` + tableau page / URL |
| 2 | Navigation | Menu principal (5 entrées au plus), menu de pied de page, bouton d'action permanent | 6 lignes | Liste |
| 3 | Parcours | Par profil cible : point d'entrée, étapes, objections levées en route, action finale | 1 schéma par profil | Mermaid `flowchart LR` |
| 4 | SEO par page | Requête principale, intention (info, comparaison, achat), 2 requêtes secondaires, title visé | 1 ligne par page | Tableau |
| 5 | Liens internes | Quelle page renvoie vers quelle autre, et avec quel texte de lien | 5 à 10 lignes | Tableau source / cible / ancre |
| 6 | Zoning par page | Les blocs dans l'ordre, chacun avec son rôle (accrocher, prouver, rassurer, faire agir) et son contenu attendu | 6 à 10 blocs par page | Tableau ordonné ; zoning ASCII facultatif |
| 7 | Gabarits | Types de pages réutilisables (accueil, offre, article, contact) ; chacun a son zoning et son wireframe | 3 à 5 lignes | Liste |
| 8 | Inventaire de contenus | Ce qui existe déjà et ce qu'il faut produire (textes, photos, avis, chiffres) | 5 à 10 lignes | Tableau contenu / existe ? / qui le fournit |
| 9 | Wireframes | Chaque page et chaque gabarit en blocs gris légendés, ordinateur et téléphone, d'après son zoning (obligatoire) | 1 fichier par page | HTML dans `04-wireframes/`, relié depuis le document ; captures facultatives |

### Détails qui comptent

- **Plan du site** en Mermaid, lisible tel quel dans un artifact :

```mermaid
flowchart TD
    A[Accueil /] --> B[Fonctionnement /fonctionnement]
    A --> C[Tarifs /tarifs]
    A --> D[Essai gratuit /essai]
    C --> D
```

- **Zoning** : un tableau par page, ordre de défilement, sans dessin.

| Ordre | Bloc | Rôle | Contenu attendu | Action |
|---|---|---|---|---|
| 1 | Hero | Accrocher | Promesse, sous-titre, image plein cadre | Bouton principal |
| 2 | Preuve rapide | Rassurer | 3 chiffres ou logos clients | — |

- **Mobile** : préciser ce qui change d'ordre ou disparaît sur téléphone.
- **SEO** : une seule requête principale par page ; deux pages ne visent jamais la même.

## Ce qui le rend « niveau agence »

1. Chaque page a une URL, une requête principale distincte et une action attendue.
2. Chaque profil cible a un parcours écrit qui finit sur l'action principale en 3 clics
   au plus.
3. Le zoning donne un rôle à chaque bloc ; aucun bloc « présentation » sans fonction.
   Chaque page et chaque gabarit a son zoning et son wireframe.
4. L'inventaire dit qui fournit chaque contenu manquant et pour quand.
5. Le menu principal a 5 entrées au plus, nommées avec les mots du client (pas
   « Solutions », « Services »).

## Version courte (par défaut)

Temps visé : 12 min.

- **On garde** : plan du site (Mermaid + tableau URL), navigation, un parcours pour le
  profil principal, SEO par page (requête principale et intention), **le zoning et le
  wireframe de chaque page et de chaque gabarit** (obligatoires, sans exception).
- **On reporte** : plan de liens internes complet, inventaire détaillé, captures des
  wireframes (facultatives), recherche de volumes de mots-clés (on note l'intention, pas
  les volumes, sauf outil de volumes connecté).
- **Périmètre « accueil seul »** (`00-etat.md`) : le plan du site ne compte que l'accueil
  et les pages légales ; le contenu des pages dédiées reste sur l'accueil.

```markdown
# Architecture — {Nom}
> Étape 4 — mis à jour le JJ/MM/AAAA — statut : brouillon

## Plan du site
(Mermaid flowchart)
| Page | URL | Action attendue |
|---|---|---|

## Navigation
- Menu :
- Pied de page :
- Bouton permanent :

## Parcours — {profil}
(Mermaid flowchart LR)

## SEO par page
| Page | Requête principale | Intention | Title visé |
|---|---|---|---|

## Zoning et wireframe — {chaque page, chaque gabarit}
Wireframe : `04-wireframes/{page}.html`
| Ordre | Bloc | Rôle | Contenu attendu | Action |
|---|---|---|---|---|
```

## Comment le publier

Markdown en artifact Docs ; les schémas Mermaid s'affichent dans l'artifact. Les
**wireframes** de chaque page (`04-wireframes/`, blocs gris légendés, ordinateur et
téléphone) sont publiés avec lui : l'index en artifact, relié depuis le document. Pas de
couleur ni de police de la charte dans un wireframe : la maquette les apporte.

## Sources consultées

- Nielsen Norman Group, architecture de l'information et plan du site :
  https://www.nngroup.com/articles/information-architecture-sitemaps/
- Adobe, panorama des livrables UX (plan, parcours, wireframes annotés) :
  https://blog.adobe.com/en/publish/2017/09/26/a-comprehensive-overview-of-ux-design-deliverables
- AltexSoft, architecture de l'information pas à pas :
  https://www.altexsoft.com/blog/information-architecture/
