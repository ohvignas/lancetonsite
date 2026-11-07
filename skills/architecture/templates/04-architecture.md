# Architecture du site — {{NOM_DU_PROJET}}

> Étape 4 — mis à jour le {{DATE}} — statut : brouillon
> S'appuie sur : 01-cadrage.md, 02-marque.md
> Wireframes : `04-wireframes/index.html` — Recherche : `sources/mots-cles/`

## 1. Parcours

<!-- Un parcours par persona, en 4 à 6 étapes. -->

### {{Persona}}
1. Arrive par {{}} en cherchant « {{}} »
2. Doit comprendre {{}}
3. Doit voir levée l'objection {{}}
4. Passe à l'action sur {{page}} via {{}}

## 2. Arborescence

<!-- Périmètre « accueil seul » (00-etat.md) : l'accueil et les pages légales seulement. -->

```mermaid
graph TD
  A[Accueil /] --> B[{{}}]
```

| Page | URL | Parent | Menu | Priorité | Persona(s) | Intention |
|---|---|---|---|---|---|---|
| Accueil | `/` | — | — | 1 | tous | marque |
| Mentions légales | `/mentions-legales` | — | pied | — | — | — |
| Confidentialité | `/confidentialite` | — | pied | — | — | — |

### Redirections (refonte)

<!-- Refonte : une ligne par ancienne URL qui change. Création : retirer cette sous-section. -->

| Ancienne URL | Nouvelle URL |
|---|---|

## 3. Navigation

- **Barre de navigation** : logo + {{3 à 5 liens}} + bouton « {{action principale}} », sans numéro de téléphone (niveau-agence § 3)
- **Mobile** : {{}}
- **Pied de page** : {{}}

## 4. Mots-clés par page

<!-- Volume : chiffre si un outil l'a donné ; sinon « fort / moyen / faible (estimé) ». -->

| Page | Requête principale | Secondaires | Intention | Volume | Questions à traiter (IA) | Title visé |
|---|---|---|---|---|---|---|

## 5. Zoning

<!-- Accueil complet : sections attendues et fourchette de conventions § 11, 3 phrases au
plus par bloc. Noter la raison de chaque section attendue écartée. Le détail a sa page. -->

**Catalogue et articles** : {{section produits : oui / non, et comment on achète (panier,
commande et retrait, réservation) ; section articles ou journal : oui / non ; données
tirées de quel CMS ou de quelle boutique}}

### {{Page ou gabarit}} — `{{url}}`

Wireframe : `04-wireframes/{{page}}.html`

| # | Bloc | Rôle | Question du persona traitée | Message | Preuve | Image | Action |
|---|---|---|---|---|---|---|---|
| 1 | | | | | | | |

Sur téléphone : {{ce qui change d'ordre, passe en accordéon ou en carrousel}}

## 6. Liens internes

<!-- Plan complet : chaque page apparaît au moins une fois en « Depuis » et en « Vers ». -->

| Depuis | Vers | Ancre |
|---|---|---|

## 7. Hors périmètre

<!-- Ce que ce site ne contient pas, et pourquoi. Rien : écrire « Aucun ». -->

- {{}}

## 8. Gabarits

| Gabarit | Pages qui l'utilisent | Wireframe |
|---|---|---|
| {{}} | {{}} | `04-wireframes/{{gabarit}}.html` |

## 9. Inventaire de contenus

| Page | Contenu | Existe ? | Qui le fournit | Pour quand |
|---|---|---|---|---|

## 10. Hypothèses

{{Chaque manque, marqué `[hypothèse]`, tranché à la porte de validation. Ou « aucune ».}}
