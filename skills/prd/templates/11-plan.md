# Plan d'implémentation — {{NOM_DU_PROJET}}

> Étape 10 — mis à jour le {{DATE}} — statut : brouillon
> Exécution : `/lancetonsite:construire` — suivi dans `site/.lancetonsite/progression.md`

## En-tête

- **Objectif** : {{}}
- **Stack** : {{framework + version}}, {{CSS}}, {{CMS}}
- **Dossier du code** : `site/`

### Contraintes globales (s'appliquent à toutes les tâches)

1. Couleurs, typos, espacements, rayons, durées : **tokens uniquement**
   (`projet-site/06-design-system/tokens.css`). Aucune valeur en dur.
2. Tous les textes viennent de `projet-site/05-contenus/`. Aucun texte inventé.
3. Mobile d'abord ; tester aux tailles de capture du plugin (`commun/conventions.md`, « Captures d'écran »).
4. Médias : versions web de `projet-site/07-medias/` avec leurs textes alternatifs.
5. Respecter `projet-site/06-design-system/DESIGN.md`, section « Pour l'IA ».
6. Chaque page reproduit la **maquette validée** (`projet-site/08-maquette/`) : mêmes
   sections, même ordre, mêmes composants. Le code du bundle Claude Design est une
   référence, pas du code à copier.

### Fichiers à créer

```
site/
├── {{arborescence}}
```

### Points de vigilance pour la revue

1. {{}}

## Tâches

### Tâche 1 — Initialiser le projet
- **Fichiers** : {{}}
- **Lire** : 10-prd.md § Stack
- **Étapes** :
  - [ ] {{commande d'initialisation, version vérifiée}}
  - [ ] {{}}
- **Vérifier** : `{{npm run build}}` → réussit sans erreur
- **Commit** : `init: projet {{stack}}`

### Tâche 2 — Tokens et polices
- **Fichiers** : {{}}
- **Lire** : 06-design-system/tokens.css, 03-charte/charte.md § Typographies
- **Étapes** :
  - [ ] {{}}
- **Vérifier** : {{page de test affiche palette et typos}}
- **Commit** : `style: tokens et polices`

<!-- … une tâche par composant, par page (action principale d'abord), puis SEO technique,
accessibilité, performance, pages légales, recette, déploiement -->

### Tâche N-1 — Redirections (refonte)
- **Lire** : 04-architecture.md § Redirections
- **Étapes** : une redirection 301 par ancienne URL (Caddyfile, `_redirects`, ou réglages de l'outil)
- **Vérifier** : `curl -sI <ancienne URL>` → `301` + bonne `location`

### Tâche N — Recette finale
- **Vérifier** chaque critère d'acceptation de `10-prd.md § 6`.

## Déploiement

- **Cible** : {{VPS Hostinger + Caddy / …}}
- **Domaine** : {{}}
- **Recette** : `/lancetonsite:deployer` — {{A statique / B Node / …}}
- **Mise à jour** : {{commande}}
