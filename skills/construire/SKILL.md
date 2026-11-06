---
name: construire
description: 'Construit le site en exécutant le plan d''implémentation tâche par tâche — code dans la stack choisie, tokens du design system, vrais textes et médias, SEO technique, accessibilité, performance — avec une vérification à chaque tâche et une revue finale indépendante. Étape 11 de Lance ton site.'
when_to_use: '"construis le site", "code le site", "développe le site", "exécute le plan", "intégration", "reprends la construction", ou /lancetonsite:construire.'
argument-hint: "[tout | tache <n> | reprendre | recette]"
---

# Construire

**Stack HTML/CSS** (choisie à l'étape 10) : le prototype validé devient le site, sans réécriture. Parties
communes : `python3 ${CLAUDE_PLUGIN_ROOT}/commun/scripts/assembler.py projet-site/site` ; images :
`python3 ${CLAUDE_PLUGIN_ROOT}/commun/scripts/optimiser-images.py SOURCE projet-site/site/medias`.

**Équipe d'agents** : lancer ensemble, dès le début, tout ce que prévoit
`${CLAUDE_PLUGIN_ROOT}/commun/agents.md` pour cette étape (un agent Sonnet par source,
page ou pièce indépendante).

Lire `${CLAUDE_PLUGIN_ROOT}/commun/conventions.md` et
`${CLAUDE_PLUGIN_ROOT}/commun/parcours.md` (rythme, document publié, porte de
validation). **Budget indicatif : environ 10 min par page**, un point d'avancement à
chaque tâche. Document de fin d'étape : la recette, `projet-site/11-recette.md`, selon
le modèle `${CLAUDE_PLUGIN_ROOT}/commun/modeles/recette.md`, version courte par défaut.

Méthode adaptée de `executing-plans` (obra/superpowers, MIT ;
[references/methode-execution.en.md](references/methode-execution.en.md)).

## Entrées

- `projet-site/11-plan.md` (obligatoire) et `10-prd.md`.
- **La maquette validée** : `07-maquette/maquette.md`, `prototype/` (`bundle/` si la
  conception s'est faite dans l'application Claude) et `captures/` — la référence visuelle de chaque page.
- `04-architecture.md` (zonings, redirections), `05-contenus/`, `08-design-system/`
  (tokens, DESIGN.md, demo.html), `06-medias/` (dont `06-medias/3d/` : scripts Blender,
  rendus, `.glb`). Un objet 3D manquant ou à refaire se reprend avec le skill `objets-3d`
  (mêmes scripts, boucle de correction et porte de validation), jamais à la main dans la page.

Pas de plan → proposer `/lancetonsite:prd`. Ne jamais construire « à l'instinct » sans plan.
Cette étape se fait dans Claude Code ; lancée dans Claude, proposer
`/lancetonsite:passation`.

Le code du bundle Claude Design sert de **référence**, pas de code à copier tel quel :
pour une stack codée (Astro, Next…), on reconstruit proprement dans la stack choisie, avec
les tokens, en gardant le rendu. Stack HTML/CSS : voir la phrase du haut, le prototype
devient le site.

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

- Le code va dans `projet-site/site/` (`site/` dans ce fichier, conventions § 1).
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
4. Pour toute tâche visuelle : captures à **chacune** des tailles de la liste unique
   (conventions § 8, « Captures d'écran » ; navigateur intégré, Chrome ou Playwright),
   comparée **à la page de la maquette validée** (`07-maquette/`) : mêmes sections,
   même ordre, mêmes composants, mêmes textes. Aucun titre cassé, coupé, trop long ou
   trop grand (même liste) ; aucun titre coupé sur un trait d'union (conventions § 12,
   script de contrôle) ; grands titres aux lettres jamais collées (`design-system`
   § 2). Un écart volontaire
   (contrainte technique) est noté dans `progression.md` avec sa raison.
5. Commit avec le message du plan. Mettre à jour `progression.md`.
6. **Point d'avancement** en une ligne (« tâche 7 sur 18 : le pied de page est en
   place »), et à chaque page terminée, son **aperçu** (serveur local ouvert dans
   l'aperçu du navigateur, ou adresse à ouvrir) : l'utilisateur voit le site pousser.
   Jamais plus de 2 minutes sans rien montrer (`parcours.md` § 2).

Travailler d'une traite, sans porte de validation entre les tâches. S'arrêter **seulement** pour : une action irréversible ou
destructrice, une action sensible (secrets, paiement), un effet externe (publier,
pousser sur un dépôt public, déployer), ou un plan si faux que toute suite serait une
devinette. Une ambiguïté mineure : trancher, noter la décision dans `progression.md`
(quoi, pourquoi, coût si c'est faux), continuer.

Une fois la mise en page commune posée : **un agent `fabricant` par page**, tous lancés
ensemble, chacun avec la tâche, les contraintes globales et les documents à lire ;
puis un `verificateur` par contrôle, en parallèle (`${CLAUDE_PLUGIN_ROOT}/commun/agents.md`).

## 3. Règles de construction

- **Tokens uniquement.** Contrôle :
  `node ${CLAUDE_PLUGIN_ROOT}/skills/design-system/scripts/validate-tokens.cjs --dir <dossier source>`
  (`site/src` pour Astro, Next, Vite ; `site` pour du HTML pur). Le résultat est une
  **liste à examiner** : corriger les vraies valeurs en dur, ignorer les faux positifs
  justifiés (SVG du logo, couleurs de marques tierces).
- **Catalogue et articles** : branchés sur le CMS ou la boutique du PRD (`10-prd.md`),
  jamais écrits en dur. Les fiches et les cartes de l'accueil lisent la même source que
  les pages du catalogue et du journal (une donnée, une seule source :
  `niveau-agence.md` § 4). Vérifier qu'un produit ou un article ajouté dans l'outil
  apparaît sur l'accueil sans toucher au code.
- **Textes** : copiés de `05-contenus/`, jamais réécrits à la volée. Un texte manque →
  le signaler, ne pas l'inventer. Les `[À PROUVER]` restants sont listés à la fin.
- **Images** : `<picture>` AVIF → WebP → JPG, `width`/`height` explicites, `loading="lazy"`
  sauf l'image principale (`fetchpriority="high"`), alt depuis le manifeste.
- **Vidéo de fond** : `muted autoplay loop playsinline`, image poster, coupée si
  `prefers-reduced-motion`, mise en pause hors écran.
- **Mouvement** : reproduire les gestes de `DESIGN.md` § motion et du prototype animé
  de la maquette (`07-maquette/prototype/`), au même rythme, avec la boîte à outils de
  `prd/references/stacks.md` : **Tailwind CSS v4** (le `@theme` de
  `08-design-system/tailwind.css`), **GSAP** (ScrollTrigger, SplitText, Flip), **Lenis**,
  View Transitions ; skills `gsap-*` s'ils sont installés. Reprendre `gestes.js` de la
  maquette dans `src/scripts/gestes.js` (imports `gsap`, `gsap/ScrollTrigger`,
  `gsap/SplitText`, `lenis` installés par npm au lieu du CDN), chargé une fois dans le
  gabarit principal ; les attributs `data-*` des maquettes restent valables tels quels. Dans Astro : un seul script chargé en module, après
  l'affichage. N'animer que `transform`, `opacity`, `clip-path` ; tout passe par
  `gsap.matchMedia()` avec une branche `(prefers-reduced-motion: reduce)`.
- **Images provisoires** : toute image marquée `provisoire` dans le manifeste 06 est
  listée au bilan ; ne pas mettre en ligne une image de banque présentée comme le vrai
  lieu, le vrai produit ou l'équipe sans le dire à l'utilisateur.
- **Polices** : auto-hébergées (WOFF2), `font-display: swap`, préchargement de la police
  du titre seulement.
- **Titres et traits d'union** : dans chaque titre, un mot à trait d'union (« e-mail »,
  « peut-être », « Saint-Malo ») est protégé par `<span class="whitespace-nowrap">`, ou
  par le trait d'union insécable U+2011 si la police a ce glyphe ; titres en
  `hyphens: manual` (conventions § 12).
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
   (`npm run preview`, `npx serve dist` ou `commun/scripts/servir.py` pour du HTML pur) :
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
   mots de l'accueil et sections attendues (conventions § 11, à donner au relecteur),
   et **note sur 100**
   (`${CLAUDE_PLUGIN_ROOT}/commun/niveau-agence.md` § 6, seuil 90, avec les vraies photos et les vraies
   preuves). Reprendre d'abord la liste de ce qui bloquait 90 sur la maquette
   (`07-maquette/maquette.md`, « Ce qui manque encore ») : chaque point est réglé, ou
   reste une photo `provisoire` signalée avant la mise en ligne.
   Corriger les points bloquants et importants ; noter les mineurs. Vérifier aussi le
   mouvement à la main : fluide (pas de saccade au défilement sur mobile), rien qui
   cache l'action principale, mouvement réduit respecté.
7. **Boucle persona** sur le site construit, servi en local : agent `client-persona`,
   seuil 90 (`${CLAUDE_PLUGIN_ROOT}/commun/boucle-persona.md`). Il reprend d'abord les
   `FIX` laissés au client à l'étape 7. Tour `rapide`, puis tours `controle` jusqu'au seuil
   (3 au plus) ; notes et verdict dans le bilan et `00-etat.md`.

## 5. Bilan et porte de validation

Avant la porte : `python3 ${CLAUDE_PLUGIN_ROOT}/commun/scripts/controle_parcours.py projet-site`, résultat dans le
message (`parcours.md` § 4).

Rédiger `projet-site/11-recette.md` (modèle `${CLAUDE_PLUGIN_ROOT}/commun/modeles/recette.md` : cas de test
reliés aux critères du PRD, résultats, réserves, décision proposée) et le publier
(`parcours.md` § 3), avec le lien de l'aperçu du site. Mettre à jour `00-etat.md` et le
tableau de bord. Résumer en 3 à 5 points : ce qui est construit, scores, ce qui reste
(`[À PROUVER]`, mineurs, images `provisoire`). Puis **porte de validation**
(`parcours.md` § 4) : « Valider et passer à l'étape suivante » / « Modifier ». Jamais
de mise en ligne sans ce oui. Prochaine étape : `/lancetonsite:deployer`.
