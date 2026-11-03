# Journal des versions

## 1.1.0 — 2026-11-03

Le parcours se fait désormais en deux temps.

- **Conception dans Claude Design** (application Claude) : étapes 1 à 8, jusqu'à la
  maquette validée. Les skills et les cinq connexions du plugin marchent dans Claude ;
  la relecture se fait sans agent (les agents n'existent que dans Claude Code).
- Nouvelle étape **8 · Maquette** (`/lancetonsite:maquette`) : toutes les pages dans
  Claude Design, desktop et mobile, avec les vrais textes et médias, critique
  anti-« IA générique », ajustements par commentaires sur le canevas, validation
  explicite. Toute retouche est reportée dans les contenus ou le design system.
- Nouvelle étape **9 · Passation** (`/lancetonsite:passation`) : note de passation,
  `projet-site.zip`, envoi de la maquette avec « Handoff to Claude Code » (ou export
  zip si l'envoi échoue).
- **Construction dans Claude Code** : le PRD (étape 10) récupère le dossier et la
  maquette, contrôle leur cohérence ; la construction (11) reproduit la maquette
  page par page ; la mise en ligne devient l'étape 12.
- Le design system (étape 6) crée aussi un design system Claude Design.
- Renumérotation : `10-prd.md`, `11-plan.md`, `12-deploiement.md`.
- Bannière et README mis à jour.

## 1.0.4 — 2026-11-03

- OpenRouter devient le générateur par défaut quand fal n'est pas connecté, pour les
  images **et les vidéos** (`generate-video` / `get-video`), sans redemander.
- Modèles OpenRouter vérifiés le 3 novembre 2026 (images et vidéos, boucles
  première/dernière image) ; limites indiquées (pas de sons, de SVG ni de détourage).

## 1.0.3 — 2026-11-03

- Connexion UI Skills embarquée (ui-skills.com, sans compte) : ui-ux-pro-max,
  impeccable et plus de 600 skills UI sans rien installer. Une version installée en
  local reste prioritaire.

## 1.0.2 — 2026-11-03

- Connexion Firecrawl embarquée (OAuth, sans clé) : lecture des avis, des sites
  concurrents, des sites de référence et du site actuel en refonte.

## 1.0.1 — 2026-11-03

- Le plugin s’appelle désormais « Lance ton site » (`lancetonsite`) ; commandes
  `/lancetonsite:…`.
- `demarrer` ne s’arrête plus sur le tableau des connexions : il finit toujours par la
  question « On y va ? » (avec boutons), lance le cadrage sur un oui, et enchaîne sans
  demander en mode rapide. Même règle à la fin de chaque étape (`commun/conventions.md`).

## 1.0.0 — 2026-11-03

Première version publique.

- 12 skills : demarrer, statut, cadrage, marque, charte, architecture, contenus,
  design-system, medias, prd, construire, deployer.
- Agent `relecteur` pour la relecture indépendante de chaque étape.
- Connexions embarquées (OAuth) : fal, OpenRouter, Hostinger.
- Scripts : contraste WCAG, recherche dans le catalogue de styles, génération et
  validation de tokens, optimisation des médias, génération d'image OpenRouter,
  déploiement statique.
