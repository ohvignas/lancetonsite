# Journal des versions

## 1.2.0 — 2026-11-04

Le niveau visuel passe de « propre » à « site d'agence à 25 000 € », et le parcours est
corrigé après un test complet avec une persona débutante (atelier de céramique, tout
fait dans Claude Code).

**Design, mouvement, images**
- Nouveau `commun/niveau-agence.md` : références (concurrents + sites Awwwards/Godly),
  images plein cadre, grille éditoriale, catalogue de mouvement façon pages produit Apple
  (hero épinglé, séquences d'images, étapes épinglées, galerie horizontale, textes
  révélés, bouton magnétique, curseur…), règles de fluidité et de mouvement réduit,
  **grille notée sur 100, seuil 90**.
- Nouveau **kit de maquette animée** (`skills/maquette/templates/prototype/`) :
  Tailwind CSS v4 + GSAP (ScrollTrigger, SplitText) + Lenis, et `gestes.js` qui branche
  chaque geste par un attribut `data-*`. Testé à 1440 et 375 px.
- Tailwind CSS v4 partout : `tailwind.css` (`@theme`) produit par le design system,
  référence réécrite pour la v4 ; stack par défaut Astro + Tailwind + GSAP + Lenis.
- Les étapes chargent les skills d'animation du MCP UI Skills
  (`mengto-build-awwwards-quality-sites`, `mengto-cinematic-gsap-lenis-motion-system`,
  GSAP officiels, accessibilité du mouvement).
- Plus jamais de rectangle « photo à venir » : **images provisoires** gratuites
  (Unsplash, Pexels) fidèles à la direction photo, listées et signalées avant la mise en
  ligne ; liste de prises de vue quand les vraies photos sont attendues ; droit à
  l'image ; prix toujours en euros ; recherche des modèles vidéo récents.
- Le relecteur note les rendus sur 100 et bloque une maquette qui ressemble à une ébauche.

**Parcours (retours du test)**
- Démarrage : carte du parcours en mots simples, choix du lieu (Claude Design ou tout
  dans Claude Code), ville, réseaux sociaux, **qui parle sur le site** (je / nous / la
  marque), budget de 15 questions en mode rapide.
- Plus aucune note interne (`[À PROUVER]`, « étape N ») dans une maquette ou une page :
  annotations hors de la page.
- Maquette : contrôle de cohérence avant de dessiner, action principale visible dans le
  premier écran mobile, chaque objectif du cadrage a son entrée, pas de grand vide,
  source du design gardée dans `08-maquette/`, `maquette.md` ouvert dès le début.
- Passation simplifiée quand tout a été fait dans Claude Code.
- Noms des tokens de mouvement alignés entre le modèle `DESIGN.md` et le générateur.

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
