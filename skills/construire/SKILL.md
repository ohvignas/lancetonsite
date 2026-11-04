---
name: construire
description: 'Construit le site en exécutant le plan d''implémentation tâche par tâche — code dans la stack choisie, tokens du design system, vrais textes et médias, SEO technique, accessibilité, performance — avec une vérification à chaque tâche et une revue finale indépendante. Étape 11 de Lance ton site.'
when_to_use: '"construis le site", "code le site", "développe le site", "exécute le plan", "intégration", "reprends la construction", ou /lancetonsite:construire.'
argument-hint: "[tout | tache <n> | reprendre | recette]"
---

# Construire

Lire `${CLAUDE_PLUGIN_ROOT}/commun/conventions.md`.

Méthode adaptée de `executing-plans` (obra/superpowers, MIT ;
[references/methode-execution.en.md](references/methode-execution.en.md)).

## Entrées

- `projet-site/11-plan.md` (obligatoire) et `10-prd.md`.
- **La maquette validée** : `08-maquette/maquette.md`, `bundle/` (export de Claude
  Design) et `captures/` — la référence visuelle de chaque page.
- `04-architecture.md` (zonings, redirections), `05-contenus/`, `06-design-system/`
  (tokens, DESIGN.md, demo.html), `07-medias/`.

Pas de plan → proposer `/lancetonsite:prd`. Ne jamais construire « à l'instinct » sans plan.
Cette étape se fait dans Claude Code ; lancée dans Claude, proposer
`/lancetonsite:passation`.

Le code du bundle Claude Design sert de **référence**, pas de code à copier tel quel :
on reconstruit proprement dans la stack choisie, avec les tokens, en gardant le rendu.

## Stack hébergée (Webflow, Framer, Wix, Shopify)

Pas de dossier `site/` ni de build. À la place :
- Connecteur de l'outil disponible (MCP Webflow, Framer…) : créer variables de couleur,
  styles de texte, composants et pages **dans l'outil** à partir du design system et des
  contenus, page par page, en vérifiant chaque page publiée en aperçu.
- Sinon : produire `projet-site/11b-guide-de-saisie.md` — pour chaque page, l'ordre des
  sections, les classes et styles à créer (valeurs des tokens), les textes exacts à
  coller, les images et leurs textes alternatifs, les réglages SEO (title, meta, URL).
- La recette (§ 4) se fait sur l'URL d'aperçu de l'outil ; les contrôles de code
  (tokens, git) ne s'appliquent pas.

## 1. Préparer

- Si le dossier n'est pas un dépôt git : `git init` dans `site/` (après accord).
- Créer `site/.lancetonsite/progression.md` : tâche en cours, faites, décisions prises en
  route. Il permet de reprendre après une pause. Ajouter au `.gitignore` de `site/` :
  `.lancetonsite/`, `.env`, `.env.*`, `node_modules/`. Aucune clé (OpenRouter, fal…) ne va
  dans un fichier versionné.
- Vérifier que les outils de la stack sont installés (Node, npm…). Versions : celles du
  plan, revérifiées si le plan a plus d'un mois.

## 2. Exécuter

Pour chaque tâche, dans l'ordre du plan :
1. Lire les documents amont indiqués par la tâche.
2. Réaliser les étapes.
3. Lancer la **commande de vérification** et constater le résultat attendu. Ne jamais
   cocher une tâche sans cette preuve.
4. Pour toute tâche visuelle : captures aux tailles de la liste unique (conventions,
   « Captures d'écran » ; navigateur intégré, Chrome ou Playwright), comparée **à la page de la maquette validée** (`08-maquette/`) :
   mêmes sections, même ordre, mêmes composants, mêmes textes. Un écart volontaire
   (contrainte technique) est noté dans `progression.md` avec sa raison.
5. Commit avec le message du plan. Mettre à jour `progression.md`.

Travailler d'une traite. S'arrêter **seulement** pour : une action irréversible ou
destructrice, une action sensible (secrets, paiement), un effet externe (publier,
pousser sur un dépôt public, déployer), ou un plan si faux que toute suite serait une
devinette. Une ambiguïté mineure : trancher, noter la décision dans `progression.md`
(quoi, pourquoi, coût si c'est faux), continuer.

Si la tâche peut être confiée à des sous-agents (pages indépendantes), le faire en
parallèle, chacun avec la tâche, les contraintes globales et les documents à lire.

## 3. Règles de construction

- **Tokens uniquement.** Contrôle :
  `node ${CLAUDE_PLUGIN_ROOT}/skills/design-system/scripts/validate-tokens.cjs --dir <dossier source>`
  (`site/src` pour Astro, Next, Vite ; `site` pour du HTML pur). Le résultat est une
  **liste à examiner** : corriger les vraies valeurs en dur, ignorer les faux positifs
  justifiés (SVG du logo, couleurs de marques tierces).
- **Textes** : copiés de `05-contenus/`, jamais réécrits à la volée. Un texte manque →
  le signaler, ne pas l'inventer. Les `[À PROUVER]` restants sont listés à la fin.
- **Images** : `<picture>` AVIF → WebP → JPG, `width`/`height` explicites, `loading="lazy"`
  sauf l'image principale (`fetchpriority="high"`), alt depuis le manifeste.
- **Vidéo de fond** : `muted autoplay loop playsinline`, image poster, coupée si
  `prefers-reduced-motion`, mise en pause hors écran.
- **Mouvement** : reproduire les gestes de `DESIGN.md` § motion et du prototype animé
  de la maquette (`08-maquette/prototype/`), au même rythme, avec la boîte à outils de
  `prd/references/stacks.md` : **Tailwind CSS v4** (le `@theme` de
  `06-design-system/tailwind.css`), **GSAP** (ScrollTrigger, SplitText, Flip), **Lenis**,
  View Transitions ; skills `gsap-*` s'ils sont installés. Reprendre `gestes.js` de la
  maquette dans `src/scripts/gestes.js` (imports `gsap`, `gsap/ScrollTrigger`,
  `gsap/SplitText`, `lenis` installés par npm au lieu du CDN), chargé une fois dans le
  gabarit principal ; les attributs `data-*` des maquettes restent valables tels quels. Dans Astro : un seul script chargé en module, après
  l'affichage. N'animer que `transform`, `opacity`, `clip-path` ; tout passe par
  `gsap.matchMedia()` avec une branche `(prefers-reduced-motion: reduce)`.
- **Images provisoires** : toute image marquée `provisoire` dans le manifeste 07 est
  listée au bilan ; ne pas mettre en ligne une image de banque présentée comme le vrai
  lieu, le vrai produit ou l'équipe sans le dire à l'utilisateur.
- **Polices** : auto-hébergées (WOFF2), `font-display: swap`, préchargement de la police
  du titre seulement.
- **SEO technique** : title/meta par page, canonique, `sitemap.xml`, `robots.txt`,
  Open Graph, JSON-LD validé
  ([references/schema-jsonld.en.md](references/schema-jsonld.en.md)) — ne baliser que ce
  qui est visible sur la page.
- **Accessibilité** : HTML sémantique, un H1, ordre de tabulation logique, focus visible,
  formulaires avec `<label>` et messages d'erreur reliés, lien d'évitement.
- **Pas de traceur** avant consentement ; mesure d'audience exemptée si possible.

## 4. Recette

Une fois toutes les tâches faites :
1. Build de production sans erreur ni avertissement, puis lancer la prévisualisation
   (`npm run preview`, `npx serve dist` ou `python3 -m http.server` pour du HTML pur) :
   Lighthouse et axe ont besoin d'une URL. Ils demandent Chrome ou Chromium ; à défaut,
   le dire et passer aux contrôles manuels.
2. **Lighthouse** mobile sur les pages principales
   (`npx lighthouse <url> --form-factor=mobile --output=json`) : performance, accessibilité,
   bonnes pratiques et SEO ≥ 90 ; noter LCP, INP (ou TBT), CLS.
3. **Accessibilité** automatisée (`npx @axe-core/cli <url>`), puis vérification au clavier.
4. Liens cassés (outil de vérification de liens), images sans alt, pages orphelines.
5. Chaque critère d'acceptation du PRD, coché avec sa preuve.
6. **Revue finale indépendante** : prendre les captures des pages principales aux
   tailles de la liste unique, plus la série au défilement (conventions, § 6), dans
   `site/.lancetonsite/captures/`, puis lancer l'agent
   `relecteur` en lui donnant les chemins des captures et des fichiers source (ou
   `impeccable`, installé ou via le MCP `ui-skills`) — anti-« IA générique », fidélité à
   la maquette validée et au design system, composition suivie, textes, comptage des
   mots de l'accueil (conventions § 11, à donner au relecteur), et **note sur 100**
   (`commun/niveau-agence.md` § 6, seuil 90, avec les vraies photos et les vraies
   preuves). Reprendre d'abord la liste de ce qui bloquait 90 sur la maquette
   (`08-maquette/maquette.md`, « Ce qui manque encore ») : chaque point est réglé, ou
   reste une photo `provisoire` signalée avant la mise en ligne.
   Corriger les points bloquants et importants ; noter les mineurs. Vérifier aussi le
   mouvement à la main : fluide (pas de saccade au défilement sur mobile), rien qui
   cache l'action principale, mouvement réduit respecté.

## 5. Bilan

Mettre à jour `00-etat.md`. Résumer en 5 lignes : ce qui est construit, scores, ce qui
reste (`[À PROUVER]`, mineurs), et la commande suivante : `/lancetonsite:deployer`.
