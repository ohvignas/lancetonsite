# Journal des versions

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
