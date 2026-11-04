---
name: design-system
description: 'Traduit la charte en design system web — choix du style parmi 50 styles d''interface et de la composition de page parmi 8, tokens en 3 couches (primitifs, sémantiques, composants), échelles typo et d''espacement, motion, composants avec tous leurs états, page de démonstration HTML — puis le critique contre une grille anti-« design généré par IA » et le corrige. Étape 6 de Lance ton site.'
when_to_use: '"design system", "tokens", "composants", "UI kit", "style du site", "glassmorphism ou brutalism", "bento", "maquette des composants", ou /lancetonsite:design-system.'
argument-hint: "[complet | style | tokens | composants | critique]"
---

# Design system

Lire `${CLAUDE_PLUGIN_ROOT}/commun/conventions.md`.

Le design system n'invente pas l'identité : il **traduit la charte** pour le web, et le
construit pour les **pages réelles** de l'architecture avec les **vrais textes**.

Viser le niveau décrit dans `${CLAUDE_PLUGIN_ROOT}/commun/niveau-agence.md` (le lire
maintenant) : grandes images, grille éditoriale, mouvement dessiné, note ≥ 90 / 100.

## Entrées

- `01-cadrage.md` (personas) · `02-marque.md` (curseurs de voix) · `03-charte/charte.md` (couleurs, typos, logo,
  photo) · `04-architecture.md` (pages, zonings) · `05-contenus/` (vrais textes).
- `00-etat.md` (ligne « Composition ») et `${CLAUDE_PLUGIN_ROOT}/commun/compositions.md`
  (les 8 compositions de page, la table par cible, la règle du choix).

## Outils

- Skill `ui-ux-pro-max` installé → l'utiliser pour la recherche de style et les règles UX.
  Sinon MCP `ui-skills` → `get_skill` `nextlevelbuilder-ui-ux-pro-max` (et
  `nextlevelbuilder-design-system` pour les tokens). Sinon, données intégrées (MIT, nextlevelbuilder/ui-ux-pro-max-skill) dans `data/` :
  `styles.csv` (50 styles actifs), `typography.csv`, `colors.csv`, `landing.csv`,
  `ux-guidelines.csv`, `motion.csv`. Recherche (mots clés **en anglais**, les données le
  sont) : `python3 ${CLAUDE_SKILL_DIR}/scripts/chercher.py styles "raw editorial natural"`.
- Skill `impeccable` installé → l'utiliser pour la critique finale (mode critique/audit).
  Sinon MCP `ui-skills` → `get_skill` `pbakaus-impeccable`, puis `pbakaus-critique` /
  `pbakaus-polish`. Sinon, grille intégrée [references/anti-patterns.md](references/anti-patterns.md).
  En cas de désaccord entre `ui-ux-pro-max` et `impeccable` (ou la grille), c'est
  `impeccable` / la grille anti-« IA » qui l'emporte.

## 0. Les références

Si la charte n'a pas déjà son tableau de références (`03-charte/references.md`) : faire
l'analyse de `niveau-agence.md` § 1 — 4 à 5 concurrents et 4 à 6 sites de référence en
design — et livrer le tableau des gestes retenus. Le montrer à l'utilisateur en une
planche de captures : « voilà le niveau qu'on vise ».

## 1. Le style d'interface et la composition

La charte fixe l'identité ; restent deux choix faits **ensemble** : la **composition**
de page (la structure et la mise en scène) et le **langage d'interface** (densité,
formes, profondeur, mouvement).

**La composition.** Lire `${CLAUDE_PLUGIN_ROOT}/commun/compositions.md`. Prendre la
ligne de la cible dans sa table, la confronter à la plateforme de marque, vérifier la
composition du projet précédent (« La règle du choix », même fichier). Proposer **deux
compositions** : la recommandée et celle de contraste, chacune avec son **schéma** (le
bloc de 6 lignes de sa fiche), son hero type et son moment signature. L'utilisateur
choisit. Jamais de composition par défaut, jamais le gabarit interdit. Noter le choix
dans `00-etat.md` (« Composition », avec la précédente) et dans `DESIGN.md` § 2.

**Le style.** Chercher dans `styles.csv` avec les mots de la marque et du
secteur. Retenir **3 styles maximum** compatibles avec la charte. Pour chacun :
- nom + une phrase en français simple ;
- pourquoi il sert les personas (citer le cadrage) ;
- son risque (accessibilité, performance, « déjà vu ») ;
- **la même mini-maquette** (le hero de l'accueil **dans la composition choisie**, avec
  ses vrais textes, son image ou son objet et son geste de mouvement) dans les trois
  styles, côte à côte, en HTML.

**Les images de l'étape 6 sont provisoires.** Les médias n'arrivent qu'à l'étape 7 :
mini-maquettes et démo prennent des images de banque libres (Unsplash, Pexels) choisies
avec les mots de la direction photo, ou les images d'ambiance des moodboards de
l'étape 3. Les marquer `provisoire` dans le code (commentaire) ; jamais un rectangle
vide. Elles sont remplacées à l'étape 8.

**Mode rapide** : une seule question pour les deux choix (les deux schémas de
composition, puis le style recommandé) ; une seule mini-maquette, celle du style
recommandé dans la composition recommandée ; les deux autres styles tiennent en une
ligne chacun.

Recommander un style. Signaler franchement un style qui ferait « généré par IA » pour ce
projet (glassmorphism décoratif, aurora, néon, dark mode « tech » par défaut, bento
partout). L'utilisateur choisit.

## 2. Les tokens

Architecture en 3 couches ([references/token-architecture.md](references/token-architecture.md)) :
primitifs (`--color-sable-200`) → sémantiques (`--color-surface`, `--color-action`) →
composants (`--button-bg`).

À produire dans `projet-site/06-design-system/tokens.json`, en partant de la **structure**
de [templates/design-tokens-starter.json](templates/design-tokens-starter.json) et en
remplaçant **toutes** ses valeurs (gris et bleus génériques) par celles de la charte.
Les noms de variables CSS découlent du chemin JSON (`semantic.color.bg` →
`--color-bg`) : choisir des chemins qui donnent les noms utilisés dans `DESIGN.md`.
Une valeur composite (objet) ou une référence introuvable fait échouer la génération :
découper en tokens simples.
- **Couleurs** : celles de la charte, avec états (survol, actif, désactivé, focus) et
  fonctionnelles (succès, alerte, erreur). Contrastes revérifiés
  (`python3 ${CLAUDE_PLUGIN_ROOT}/skills/charte/scripts/contraste.py`).
- **Typographie** : échelle fluide en `clamp()` (mobile → desktop), interlignage, longueur
  de ligne 60-75 caractères, chasse jamais plus serrée que -0,04 em.
- **Espacement** : base 4 ou 8 px, 8 à 10 paliers nommés.
- **Rayons, bordures, ombres** : peu de paliers, cohérents avec le style. Pas un rayon
  identique partout par défaut.
- **Motion** : 3 durées (rapide ~150 ms, normale ~250 ms, lente ~450 ms), 3 courbes
  nommées (entrée, sortie, emphase) en `cubic-bezier`, et la règle
  `prefers-reduced-motion`.
- **Points de rupture** : mobile d'abord.

Générer `tokens.css` :
`node ${CLAUDE_SKILL_DIR}/scripts/generate-tokens.cjs --config projet-site/06-design-system/tokens.json -o projet-site/06-design-system/tokens.css`.

Puis `tailwind.css` : le bloc `@theme` de **Tailwind CSS v4** qui expose ces tokens
(couleurs, polices, échelle typo, espacements, rayons, ombres, courbes et durées), pour
que la maquette et le site s'écrivent en classes Tailwind
([references/tailwind-integration.md](references/tailwind-integration.md)) :
`node ${CLAUDE_SKILL_DIR}/scripts/generate-tokens.cjs --config projet-site/06-design-system/tokens.json --format tailwind -o projet-site/06-design-system/tailwind.css`
(tokens sémantiques en clair, palette par défaut coupée). C'est ce bloc qui remplace le
`@theme` de démonstration du kit de maquette.

## 3. Les composants

Seulement ceux dont les pages ont besoin (lire les zonings). En général : en-tête et
navigation (desktop + mobile), boutons (principal, secondaire, lien), champs de
formulaire, cartes, bloc de l'**action principale** (le soigner en premier), FAQ
(accordéon), témoignage (**réel** uniquement), pied de page, bandeau cookies.

Pour chacun, tous les états ([references/states-and-variants.md](references/states-and-variants.md)) :
repos, survol, focus clavier **visible**, actif, désactivé, chargement, erreur, vide.
Cibles tactiles ≥ 44 px. Spécification au format de
[references/component-specs.md](references/component-specs.md).

## 4. Le mouvement

Le mouvement fait partie de l'identité : dans le catalogue de `niveau-agence.md` § 4
(narration au défilement façon Apple, sections épinglées, textes révélés, galerie
horizontale, survols riches, bouton magnétique, transitions de page…), choisir **un
geste par type de section** et **un moment signature** propre à la marque, plus fort
que le reste. Aucune section sans geste. Pour chaque geste : où, durée,
courbe, déclencheur, version « mouvement réduit ». Le tout dans `DESIGN.md` § motion.
Pas de rebond, rien qui retarde l'action principale, 60 images par seconde (`transform`,
`opacity`, `clip-path` seulement). Repères : `data/motion.csv`. Les gestes se **voient**
dans `demo.html` (animés, pas décrits).

## 5. La page de démonstration

`projet-site/06-design-system/demo.html`, autonome, écrite en **Tailwind CSS v4**
(`@tailwindcss/browser` depuis un CDN, version exacte, avec le `@theme` des tokens) et
GSAP + Lenis pour le mouvement — partir des gestes du kit
`${CLAUDE_PLUGIN_ROOT}/skills/maquette/templates/prototype/` (`gestes.js` et le `<head>`
technique d'`index.html` ; ses sections sont une démonstration, pas une structure) :
palette et contrastes, échelle typo, espacements, **tous** les composants dans **tous** leurs états, avec les vrais
textes du site, en clair, **les gestes de mouvement en action** et au moins une section
de démonstration avec une grande image (provisoire si besoin, voir `medias`).
Responsive. La montrer à l'utilisateur.

**Mode rapide : démo réduite.** Palette, échelle typo, espacements et les composants
dont l'accueil a besoin (bouton principal, en-tête, carte, champ, FAQ), chacun avec ses
états, et un seul geste en action. Pas de section avec grande image : la maquette
(étape 8) la montre. La critique complète (§ 6, points 2 et 5) se fait une seule fois,
sur la maquette ; ici, seulement la grille anti-« IA » (§ 6, point 1) et les contrastes.

## 6. La critique (obligatoire)

1. Passer la démo à `impeccable` (installé, ou via `ui-skills`) ou à la grille
   [references/anti-patterns.md](references/anti-patterns.md).
2. Capturer `demo.html` aux tailles de la liste unique (conventions, « Captures
   d'écran ») dans `06-design-system/captures/`, puis lancer l'agent `relecteur` avec
   les chemins des captures et de `demo.html`, et la consigne : « Trouve tout ce qui
   fait généré par IA, et tout ce qui pourrait servir tel quel à un concurrent. » Dans
   Claude (ni agent ni navigateur) : relire soi-même en changeant de posture, sur le
   rendu de `demo.html` ou du design system Claude Design.
3. Vérifier : chaque choix du design system renvoie-t-il à une ligne de la charte ou de
   la marque ? Sinon, il a été fait au hasard : le refaire.
4. Test persona : le persona principal se reconnaîtrait-il dans cette page ?
5. Noter la démo sur la grille sur 100 de `niveau-agence.md` § 6 (critères applicables
   à un design system : direction artistique, mise en page, mouvement, accessibilité).
   Une démo qui ressemble à une ébauche (composants alignés sans images ni mouvement)
   ne passe pas.
6. Corriger, régénérer la démo, lister les corrections.

## 7. Les livrables

Dans `projet-site/06-design-system/` :
- `DESIGN.md` ([templates/DESIGN.md](templates/DESIGN.md)) — la référence lisible par
  l'humain et par l'IA qui construira le site ;
- `tokens.json`, `tokens.css` et `tailwind.css` (`@theme`) ;
- `demo.html`.

Dans Claude, si `node` manque pour générer `tokens.css` : écrire `tokens.css` à la main
depuis `tokens.json` (même règle de nommage), et le dire.

## 8. Le design system dans Claude Design

Dans Claude : créer un **design system Claude Design** (type « Design system ») à partir
de `DESIGN.md`, `tokens.css`, `demo.html`, du logo (`03-charte/logo/`) et des polices de
la charte, nommé « {{Projet}} ». Vérifier sur son aperçu que couleurs, typos, rayons et
composants correspondent aux tokens ; corriger l'écart dans le design system Claude
Design, pas dans les tokens (les tokens font foi). C'est lui que la maquette (étape 8)
utilisera. Noter son nom ou son lien dans `00-etat.md`.

Dans Claude Code : même chose si l'outil Artifact propose le type « Design System »
(`action: "quickstart"`, `intent: "other"`) ; sinon `demo.html` suffit, le canevas de
la maquette reprendra les tokens.

Validation, `00-etat.md`. Prochaine étape : `/lancetonsite:medias`.
