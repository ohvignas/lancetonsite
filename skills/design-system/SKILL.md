---
name: design-system
description: 'Tire de la maquette validée le design system web — inventaire des valeurs, composants et gestes réellement utilisés, tokens en 3 couches (primitifs, sémantiques, composants), échelles typo et d''espacement, motion, composants avec tous leurs états, page de démonstration HTML — puis le critique contre une grille anti-« design généré par IA » et le corrige. Étape 8 de Lance ton site.'
when_to_use: '"design system", "tokens", "composants", "UI kit", "bibliothèque de composants", "tirer les composants de la maquette", ou /lancetonsite:design-system.'
argument-hint: "[complet | style | tokens | composants | critique]"
---

# Design system

**Équipe d'agents** : lancer ensemble, dès le début, tout ce que prévoit
`${CLAUDE_PLUGIN_ROOT}/commun/agents.md` pour cette étape (un agent Sonnet par source,
page ou pièce indépendante).

Lire `${CLAUDE_PLUGIN_ROOT}/commun/conventions.md` et
`${CLAUDE_PLUGIN_ROOT}/commun/parcours.md` (rythme, document publié, porte de
validation). **Budget : 4 min** — l'inventaire de la maquette montré vers 2 min.
Document présenté : suivre le modèle `${CLAUDE_PLUGIN_ROOT}/commun/modeles/design-system.md`,
version courte par défaut. Aucune image générée à cette étape (les médias de
l'étape 6 suffisent).

Le design system n'invente rien : il **formalise la maquette validée** (étape 7), qui
a elle-même habillé les wireframes dans la charte. Il donne à la construction des tokens
et des composants nommés, avec tous leurs états, pour que le site reproduise la maquette
sans la réinterpréter.

Viser le niveau décrit dans `${CLAUDE_PLUGIN_ROOT}/commun/niveau-agence.md` (le lire
maintenant) : grandes images, grille éditoriale, mouvement dessiné, note ≥ 90 / 100.

## Entrées

- `07-maquette/` **validée** : `maquette.md` (style, composition, gestes, écarts),
  `prototype/theme.css`, le prototype et les pages. Pas validée : s'arrêter et renvoyer à
  `/lancetonsite:maquette`.
- `03-charte/charte.md` (couleurs, typos, logo) pour vérifier que rien n'a dérivé ·
  `05-contenus/` (vrais textes de la démo) · `06-medias/` (images de la démo).

## Outils

- Skill `ui-ux-pro-max` installé → l'utiliser pour les règles UX et les états des composants
  (le style est déjà choisi à la maquette).
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

## 1. Relever la maquette

Le style, la composition et les gestes sont **déjà choisis et validés** à la maquette
(`07-maquette/maquette.md`, `00-etat.md` ligne « Composition ») : ne pas les rouvrir.
Ici, on fait l'inventaire de ce que la maquette utilise vraiment, en lançant ensemble
(`commun/agents.md`) un agent par famille :
- **valeurs** : couleurs, polices, tailles, interlignes, espacements, rayons, ombres,
  durées et courbes lus dans `theme.css` et dans les pages (`07-maquette/prototype/`,
  `07-maquette/pages/`) ; toute valeur isolée trouvée dans une page est listée ;
- **composants** : chaque élément répété (bouton, carte, champ, en-tête, FAQ, fiche
  produit…), avec les pages où il apparaît et ses variantes vues ;
- **gestes** : ceux notés dans `maquette.md` et ceux branchés dans le prototype
  (`data-*`).

Puis **ranger** : deux valeurs presque égales se fusionnent (14 px et 15 px → une
seule), une valeur isolée rejoint l'échelle ou se justifie. Chaque fusion qui change le
rendu se note dans `DESIGN.md` (« Écarts avec la maquette ») et se reporte dans la
maquette : maquette et design system ne divergent jamais.

**Les images** de la démo viennent de `06-medias/` (manifeste) ; jamais un rectangle vide.

## 2. Les tokens

Architecture en 3 couches ([references/token-architecture.md](references/token-architecture.md)) :
primitifs (`--color-sable-200`) → sémantiques (`--color-surface`, `--color-action`) →
composants (`--button-bg`).

À produire dans `projet-site/08-design-system/tokens.json`, en partant de la **structure**
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
  de ligne 60-75 caractères. **Interlettrage des titres d'affichage (la source
  unique)** : les lettres d'un grand titre ne se touchent jamais. Sur une police
  condensée ou serrée (Anton, Bebas, Oswald, une grotesque étroite, une serif
  d'affichage resserrée), l'interlettrage des titres est **d'au moins 0** : jamais
  négatif, souvent `0.01em` à `0.02em` en très grand corps. Sur une police à chasse
  normale, -0,02 em au plus serré. Un token `--tracking-display` porte la valeur, et les
  titres l'utilisent tous ; un `tracking-tighter` proposé par le catalogue (`data/`)
  ne l'emporte pas sur cette règle. **Contrôle à l'œil** : capture du hero et d'un titre de
  section à 1440 × 900 et à 375 × 812, zoom sur les lettres ; deux lettres qui se
  touchent ou se chevauchent, c'est à corriger.
- **Espacement** : base 4 ou 8 px, 8 à 10 paliers nommés.
- **Rayons, bordures, ombres** : peu de paliers, cohérents avec le style. Pas un rayon
  identique partout par défaut.
- **Motion** : 3 durées (rapide ~150 ms, normale ~250 ms, lente ~450 ms), 3 courbes
  nommées (entrée, sortie, emphase) en `cubic-bezier`, et la règle
  `prefers-reduced-motion`.
- **Points de rupture** : mobile d'abord.

Générer `tokens.css` :
`node ${CLAUDE_SKILL_DIR}/scripts/generate-tokens.cjs --config projet-site/08-design-system/tokens.json -o projet-site/08-design-system/tokens.css`.

Puis `tailwind.css` : le bloc `@theme` de **Tailwind CSS v4** qui expose ces tokens
(couleurs, polices, échelle typo, espacements, rayons, ombres, courbes et durées), pour
que la maquette et le site s'écrivent en classes Tailwind
([references/tailwind-integration.md](references/tailwind-integration.md)) :
`node ${CLAUDE_SKILL_DIR}/scripts/generate-tokens.cjs --config projet-site/08-design-system/tokens.json --format tailwind -o projet-site/08-design-system/tailwind.css`
(tokens sémantiques en clair, palette par défaut coupée). C'est ce bloc qui remplace le
`@theme` de démonstration du kit de maquette.

## 3. Les composants

Ceux que la maquette utilise (inventaire du § 1), rien de plus. En général : en-tête et
navigation (desktop + mobile), boutons (principal, secondaire, lien), champs de
formulaire, cartes, bloc de l'**action principale** (le soigner en premier), fiche
produit et carte d'article si le zoning a un catalogue ou un journal, FAQ (accordéon),
témoignage (**réel** uniquement), pied de page complet, bandeau cookies.

La **barre de navigation** part d'un modèle des skills (`ui-ux-pro-max`, ou MCP
`ui-skills`) et le **bloc d'action** se compose en deux colonnes : règles dans
`${CLAUDE_PLUGIN_ROOT}/commun/niveau-agence.md` § 3 (barre de navigation, blocs
d'action et formulaires).

Pour chacun, tous les états ([references/states-and-variants.md](references/states-and-variants.md)) :
repos, survol, focus clavier **visible**, actif, désactivé, chargement, erreur, vide.
Cibles tactiles ≥ 44 px. Spécification au format de
[references/component-specs.md](references/component-specs.md).

## 4. Le mouvement

Les gestes sont ceux de la maquette validée (§ 1) : un par type de section et le moment
signature. Ne pas en ajouter ; un type de section sans geste se signale. Pour chaque
geste : où, durée,
courbe, déclencheur, version « mouvement réduit ». Le tout dans `DESIGN.md` § motion.
Pas de rebond, rien qui retarde l'action principale, 60 images par seconde (`transform`,
`opacity`, `clip-path` seulement). Repères : `data/motion.csv`. Les gestes se **voient**
dans `demo.html` (animés, pas décrits).

## 5. La page de démonstration

`projet-site/08-design-system/demo.html`, autonome, écrite en **Tailwind CSS v4**
(`@tailwindcss/browser` depuis un CDN, version exacte, avec le `@theme` des tokens) et
GSAP + Lenis pour le mouvement — partir des gestes du kit
`${CLAUDE_PLUGIN_ROOT}/skills/maquette/templates/prototype/` (`gestes.js` et le `<head>`
technique d'`index.html` ; ses sections sont une démonstration, pas une structure) :
palette et contrastes, échelle typo, espacements, **tous** les composants dans **tous** leurs états, avec les vrais
textes du site, en clair, **les gestes de mouvement en action** et au moins une section
de démonstration avec une grande image (de `06-medias/`).
Responsive. La montrer à l'utilisateur.

**Par défaut : démo réduite.** Palette, échelle typo, espacements et les composants
dont l'accueil a besoin (bouton principal, en-tête, carte, champ, FAQ), chacun avec ses
états, et un seul geste en action. Pas de section avec grande image : la maquette
(étape 7) la montre déjà. La critique complète (§ 6, points 2 et 5) se fait une seule fois,
sur la maquette ; ici, seulement la grille anti-« IA » (§ 6, point 1) et les contrastes.
La démo complète : en mode approfondi.

## 6. La critique (obligatoire)

**Par défaut : points 1 et 3 seulement**, soi-même, en une minute, plus les contrastes.
Les points 2, 4 et 5 (captures, agent `relecteur`, note sur 100) se font une seule fois,
sur la maquette (`parcours.md` § 1, levier 6) ; ici, en mode approfondi.

1. Passer la démo à `impeccable` (installé, ou via `ui-skills`) ou à la grille
   [references/anti-patterns.md](references/anti-patterns.md).
2. Capturer `demo.html` aux tailles de la liste unique (conventions, « Captures
   d'écran ») dans `08-design-system/captures/`, et faire le contrôle à l'œil de
   l'interlettrage des titres (§ 2, « Typographie »), puis lancer l'agent `relecteur` avec
   les chemins des captures et de `demo.html`, et la consigne : « Trouve tout ce qui
   fait généré par IA, et tout ce qui pourrait servir tel quel à un concurrent. » Dans
   Claude (ni agent ni navigateur) : relire soi-même en changeant de posture, sur le
   rendu de `demo.html` ou du design system Claude Design.
3. Vérifier : chaque token et chaque composant se retrouve-t-il dans la maquette validée,
   et chaque couleur ou police dans la charte ? Une valeur qui n'est ni l'une ni l'autre a
   été inventée : la retirer. Un composant de la maquette absent : l'ajouter.
4. Test persona : le persona principal se reconnaîtrait-il dans cette page ?
5. Noter la démo sur la grille sur 100 de `niveau-agence.md` § 6 (critères applicables
   à un design system : direction artistique, mise en page, mouvement, accessibilité).
   Une démo qui ressemble à une ébauche (composants alignés sans images ni mouvement)
   ne passe pas.
6. Corriger, régénérer la démo, lister les corrections.

## 7. Les livrables

Dans `projet-site/08-design-system/` :
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
Design, pas dans les tokens (les tokens font foi). C'est lui que la construction
(étape 11) utilisera ; relier le canevas de la maquette à ce design system si l'outil le
permet. Noter son nom ou son lien dans `00-etat.md`.

Dans Claude Code : même chose si l'outil Artifact propose le type « Design System »
(`action: "quickstart"`, `intent: "other"`) ; sinon `demo.html` suffit, le canevas de
la construction reprendra les tokens.

**Le document présenté** (`parcours.md` § 3) : le design system publié en design
(Claude Design, ou `demo.html` publiée comme page), avec en tête une synthèse lisible de
`DESIGN.md` (composition, style, couleurs, échelle typo, gestes). Jamais une capture
comme livrable. Puis **porte de validation** (`parcours.md` § 4) : jamais la vérification
sans un oui. `00-etat.md` et tableau de bord à jour. Prochaine étape :
`/lancetonsite:passation` — la vérification avant de coder.
