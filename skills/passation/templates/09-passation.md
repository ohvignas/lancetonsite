# {{NOM_DU_PROJET}} — note de passation, de la conception à la construction

> Étape 9 — mis à jour le {{DATE}} — statut : brouillon
> {{Tout fait dans Claude Code / Conception dans l'application Claude, construction et mise en ligne dans Claude Code}}

# Partie A — Conception vers construction

## Le projet en 5 lignes

<!-- Qui, quoi, pour qui, la promesse, l'action principale du site -->

## A1. État des étapes

| # | Document | Statut | Date |
|---|---|---|---|
| 1 | 01-cadrage.md | | |
| 2 | 02-marque.md | | |
| 3 | 03-charte/ | | |
| 4 | 04-architecture.md | | |
| 5 | 05-contenus/ | | |
| 6 | 06-medias/ | | |
| 7 | 07-maquette/ (note sur 100 : {{}}, ce qui bloque encore 90 : {{}}, `FIX` laissés au client : {{}}) | | |
| 8 | 08-design-system/ | | |

## A2. Où trouver quoi

| Besoin | Source qui fait foi |
|---|---|
| Apparence d'une page | maquette validée (`07-maquette/prototype/`, ou `bundle/` depuis l'application Claude, + `maquette.md`) |
| Textes, balises SEO | `05-contenus/` |
| Couleurs, typos, espacements, composants | `08-design-system/` (DESIGN.md, tokens.css) |
| Images, vidéos, textes alternatifs | `06-medias/medias.md` |
| Pages, menu, redirections | `04-architecture.md` |
| Ton et mots interdits | `02-marque.md` |

En cas d'écart entre la maquette et un document : la maquette validée fait foi pour
l'apparence, le document pour le texte — le signaler et mettre à jour l'autre.

## A3. Provisoire et points ouverts

| Provisoire ou ouvert | Remplacé par, ou décision attendue | Fourni par |
|---|---|---|

<!-- Images `provisoire`, [À PROUVER], [hypothèse], brouillons restants, choix à trancher à la porte -->

## A4. Décisions à ne pas rejouer

- {{Décision prise pendant la conception, et sa raison}}

## A5. Points d'attention pour la construction

- {{Ce que la construction risque de rater : une animation, un état mobile, un média lourd}}

## Ce que Claude Code fait en premier

1. `/lancetonsite:prd` — retrouver le dossier et la maquette, choisir la techno, écrire
   le PRD et le plan.
2. `/lancetonsite:construire` — construire, page par page, fidèle à la maquette.
3. `/lancetonsite:deployer` — mettre en ligne.

---

# Partie B — Remise au client

> Remplie à l'étape 12 (`/lancetonsite:deployer`). Laisser vide jusqu'à la mise en ligne.
> Aucun mot de passe dans ce document : ils vont dans un gestionnaire de mots de passe.

## B1. Accès et propriété

| Service | Titulaire | Où se connecter | Double authentification | Renouvellement |
|---|---|---|---|---|
| Domaine | {{Entreprise}} | | oui / non | JJ/MM/AAAA |
| Hébergement | {{Entreprise}} | | oui / non | JJ/MM/AAAA |
| Administration du site | | | | |
| E-mail | | | | |
| Mesure d'audience | | | | |
| Search Console | | | | |

## B2. Fiche technique

| | |
|---|---|
| Stack et versions | |
| Dépôt de code | |
| Services tiers | |
| Certificat HTTPS | |

## B3. Modifier son site

1. Changer un texte : {{}}
2. Changer une image : {{}}
3. Ajouter un article : {{}}
4. Changer un prix : {{}}
5. Changer des horaires : {{}}

Vidéos d'écran : {{liens, ou la raison de leur absence}}

À confier à un pro : {{}}

## B4. Entretien

| Tâche | Qui | Fréquence | Coût |
|---|---|---|---|
| Mises à jour | | | |
| Sauvegardes | | | |
| Surveillance | | | |

## B5. Limites connues

- {{Réserve acceptée à la recette, ou « aucune »}}

## B6. Assistance

Garantie jusqu'au {{JJ/MM/AAAA}} · signaler un problème : {{}} · exclu : {{}}

## B7. Acceptation

Remis le {{JJ/MM/AAAA}} · confirmation écrite du patron : {{en attente de la porte de l'étape 12}}
