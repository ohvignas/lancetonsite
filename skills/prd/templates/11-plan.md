# Plan d'implémentation — {{NOM_DU_PROJET}}

> Étape 10 — mis à jour le {{DATE}} — statut : brouillon
> Exécution : `/lancetonsite:construire` — suivi dans `projet-site/site/.lancetonsite/progression.md`

## En-tête

- **Objectif** : {{}}
- **Stack** : {{framework + version}}, {{CSS}}, {{CMS}}
- **Dossier du code** : `projet-site/site/`

### Contraintes globales (s'appliquent à toutes les tâches)

1. Couleurs, typos, espacements, rayons, durées : **tokens uniquement**
   (`projet-site/08-design-system/tokens.css`). Aucune valeur en dur.
2. Tous les textes viennent de `projet-site/05-contenus/`. Aucun texte inventé.
3. Mobile d'abord ; tester aux tailles de capture du plugin (`commun/conventions.md`, « Captures d'écran »).
4. Médias : versions web de `projet-site/06-medias/` avec leurs textes alternatifs.
5. Respecter `projet-site/08-design-system/DESIGN.md`, section « Pour l'IA ».
6. Chaque page reproduit la **maquette validée** (`projet-site/07-maquette/`) : mêmes
   sections, même ordre, mêmes composants. Le code du bundle Claude Design est une
   référence, pas du code à copier.

### Fichiers à créer

```
projet-site/site/
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
- **Lire** : 08-design-system/tokens.css, 03-charte/charte.md § Typographies
- **Étapes** :
  - [ ] {{}}
- **Vérifier** : {{page de test affiche palette et typos}}
- **Commit** : `style: tokens et polices`

<!-- Stack HTML/CSS (le prototype devient le site, sans reconstruction) : ces 6 tâches, toutes faites.
1. Copier `07-maquette/prototype/` dans `site/`, renommer `accueil.html` en `index.html` et corriger les liens vers `accueil.html`.
2. Plusieurs pages : ranger l'en-tête et le pied dans `site/_partials/` (`entete.html`, `pied.html`), baliser chaque page, puis assembler : `python3 ${CLAUDE_PLUGIN_ROOT}/commun/scripts/assembler.py projet-site/site`. Une seule page : rien à assembler.
3. Médias : remplacer les originaux de `site/medias/` par les versions optimisées de `06-medias/web/`, vidéos comprises, et corriger les `src` et `poster`. Sans `06-medias/web/` : `python3 ${CLAUDE_PLUGIN_ROOT}/commun/scripts/optimiser-images.py SOURCE projet-site/site/medias` pour les images, `ffmpeg` pour les vidéos. Sans `ffmpeg` : signaler au bilan les vidéos non optimisées.
4. Nettoyer : retirer les attributs `data-prompt` du HTML, supprimer `generer-images.py` et `style.txt` de `site/`.
5. SEO technique et pages légales : title et meta de chaque page, canoniques, `sitemap.xml`, `robots.txt`, Open Graph, JSON-LD, page 404, pages légales.
6. Vérifier (liens, accessibilité, SEO, mobile), puis déploiement. -->

<!-- Autres stacks : une tâche par composant, par page (action principale d'abord), puis les tâches
ci-dessous, SEO technique, accessibilité, performance, pages légales, recette, déploiement -->

### Tâche — Médias
- **Fichiers** : {{dossier des médias du site}}
- **Lire** : 06-medias/medias.md
- **Étapes** :
  - [ ] Placer les versions web de `06-medias/`, vidéos comprises, avec leurs textes alternatifs
  - [ ] Lister au bilan les médias encore `provisoire`
- **Vérifier** : aucune image sans `alt`, aucun original non optimisé dans le site
- **Commit** : `medias: versions web et textes alternatifs`

### Tâche — Nettoyage
- **Fichiers** : {{pages et dossiers de travail du site}}
- **Étapes** :
  - [ ] Retirer les attributs `data-prompt` du HTML
  - [ ] Supprimer `generer-images.py`, `style.txt` et les fichiers de travail de la maquette
- **Vérifier** : `grep -r "data-prompt" {{dossier du site}}` → aucun résultat
- **Commit** : `chore: retire les fichiers de travail`

### Tâche N-1 — Redirections (refonte)
- **Lire** : 04-architecture.md § Redirections
- **Étapes** : une redirection 301 par ancienne URL (Caddyfile, `_redirects`, ou réglages de l'outil)
- **Vérifier** : `curl -sI <ancienne URL>` → `301` + bonne `location`

### Tâche N — Recette finale
- **Vérifier** chaque critère d'acceptation de `10-prd.md § 11`.

## Déploiement

- **Cible** : {{VPS Hostinger + Caddy / …}}
- **Domaine** : {{}}
- **Recette** : `/lancetonsite:deployer` — {{A statique / B Node / …}}
- **Mise à jour** : {{commande}}
