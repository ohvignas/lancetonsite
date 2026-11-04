# Conventions communes de Lance ton site

Toutes les étapes suivent ces règles. Les lire avant de commencer une étape.

## 0. Deux lieux de travail

Le parcours se fait en deux temps :

| Phase | Où | Étapes |
|---|---|---|
| **Conception** | **Claude** (web, bureau ou mobile) avec **Claude Design** | 1 Cadrage → 8 Maquette validée, puis 9 Passation |
| **Construction** | **Claude Code** (terminal, onglet Code de l'app, IDE) | 10 PRD + plan → 11 Construction → 12 Mise en ligne |

Savoir où l'on tourne : dans Claude Code, on travaille dans un dossier de l'ordinateur de
l'utilisateur et les agents (`relecteur`) sont disponibles ; dans Claude, on a Claude
Design et un espace d'exécution de code temporaire, sans agents ni hooks.

- Une étape de conception lancée dans Claude Code : rappeler une fois que la conception
  se fait de préférence dans Claude Design (canevas visuel, commentaires, export vers
  Claude Code), puis suivre le choix de l'utilisateur. Tout reste faisable dans Claude
  Code.
- Une étape de construction (10 à 12) lancée dans Claude : expliquer qu'elle se fait
  dans Claude Code et proposer `/lancetonsite:passation`.

**Dans Claude, les fichiers.** `projet-site/` est créé dans l'espace d'exécution de code
(l'exécution de code doit être activée : Paramètres → Fonctionnalités). Cet espace peut
être réinitialisé : après chaque étape validée, proposer de télécharger le document, et
conseiller de travailler dans **un Projet Claude** dédié au site. Au début d'une étape,
si `projet-site/` a disparu, demander à l'utilisateur de redéposer son dernier
`projet-site.zip` (ou les documents) avant de continuer.

### Trouver les fichiers du plugin

Les chemins `${CLAUDE_PLUGIN_ROOT}` et `${CLAUDE_SKILL_DIR}` sont remplacés dans Claude
Code. Dans Claude, s'ils restent tels quels ou ne s'ouvrent pas, retrouver le dossier du
plugin avec `find / -name conventions.md -path "*commun*" 2>/dev/null | head -1` (le
dossier parent de `commun/` est la racine du plugin). Un fichier introuvable n'arrête
pas l'étape : le dire en une phrase et continuer avec les consignes du skill.

## 1. Le dossier projet

Tout vit dans `projet-site/`, à la racine du dossier de travail. Le code du site vit à côté,
dans `site/` (créé dans Claude Code).

```
projet-site/
├── 00-etat.md               ← tableau de bord : étape, mode, stack, décisions
├── 01-cadrage.md            ← projet, offre, concurrence, cible, personas, citations
├── 02-marque.md             ← plateforme de marque : mission, positionnement, ton
├── 03-charte/
│   ├── charte.md            ← logo, couleurs, typos, direction photo, règles
│   └── logo/                ← fichiers du logo (SVG, PNG)
├── 04-architecture.md       ← arborescence, parcours, SEO par page, zonings
├── 05-contenus/             ← un fichier par page : textes finaux + balises SEO
├── 06-design-system/
│   ├── DESIGN.md            ← règles, tokens, composants, motion
│   ├── tokens.json / tokens.css
│   └── demo.html            ← tous les composants, tous leurs états
├── 07-medias/
│   ├── medias.md            ← manifeste : fichier, rôle, prompt, modèle, alt
│   └── images/ videos/ sons/
├── 08-maquette/
│   ├── maquette.md          ← lien du design, pages, décisions, écarts reportés
│   ├── captures/            ← pages validées, desktop et mobile
│   └── bundle/              ← export de Claude Design (handoff), ajouté dans Claude Code
├── 09-passation.md          ← note de passage de Claude Design à Claude Code
├── 10-prd.md                ← exigences produit, stack retenue
├── 11-plan.md               ← plan d'implémentation en tâches
├── 12-deploiement.md        ← comment le site est en ligne et se met à jour
└── sources/                 ← captures, extractions de sites, verbatims bruts
```

Si `projet-site/` n'existe pas, proposer `/lancetonsite:demarrer` en une phrase, ou le créer
avec `00-etat.md` minimal si l'utilisateur préfère foncer.

## 2. Avant chaque étape

1. Lire `projet-site/00-etat.md`.
2. Lire **tous** les documents des étapes précédentes dont l'étape dépend (liste dans
   chaque skill, rubrique « Entrées »). Ne jamais reposer une question à laquelle un
   document répond déjà.
3. S'il manque un document requis : le dire en une phrase et proposer deux choix —
   faire l'étape manquante maintenant, ou continuer en marquant chaque déduction
   `[hypothèse]`.

## 3. L'entretien

- **Une question à la fois.** Attendre la réponse.
- Proposer **2 à 4 options concrètes** quand c'est possible (outil de question à choix
  si disponible). L'utilisateur peut toujours répondre autre chose.
- Réponse vague (« moderne », « épuré », « tout le monde », « qualité ») : ne pas
  l'accepter ; demander un exemple ou montrer deux versions opposées.
- Contradiction : la nommer, faire trancher.
- Toutes les 5 questions environ : résumer en 3 lignes, demander si c'est juste.
- Le registre : tutoiement ou vouvoiement selon l'utilisateur, français simple, aucun
  jargon non expliqué.
- Un débutant n'a pas à connaître le vocabulaire du métier : traduire les choix
  techniques en conséquences concrètes (« ça coûte X », « ça prend Y »). Les mots
  persona, SEO, stack, tokens, design system, PRD, VPS, DNS, zoning, CTA, handoff,
  HTTPS ne sont jamais dits sans explication en mots simples.
- **Budget de questions.** Mode guidé : une quinzaine de questions par séance au plus,
  puis proposer une pause. Mode rapide : **15 questions au plus pour les étapes 1 à 7
  réunies** — garder celles dont la réponse change le site, déduire le reste en
  `[hypothèse]`. Les questions soulevées par la relecture comptent dans ce budget :
  au-delà, les noter dans le document (« À confirmer ») au lieu de les poser.
- **Qui parle.** Écrire toujours à la personne choisie au démarrage (`00-etat.md`,
  « Qui parle sur le site ») : « je » pour une personne seule, jamais son prénom à la
  troisième personne sur son propre site.

## 4. Preuves et hypothèses

Chaque affirmation d'un document porte son origine :
- `[source : …]` — vient d'une recherche (lien, avis, capture).
- `[dit par l'utilisateur]` — vient de l'entretien.
- `[hypothèse]` — déduction non vérifiée.

Ne jamais boucher un trou par de l'invention plausible. Un faux chiffre, un faux avis,
un faux client ou une fausse citation sont interdits partout. Un avis laissé sur un
**concurrent** sert à comprendre la cible, jamais de témoignage sur le site.

Ces marques (`[source]`, `[hypothèse]`, `[À PROUVER]`) et les numéros d'étape sont du
vocabulaire **interne** : ils vivent dans les documents de `projet-site/`, jamais dans ce
que l'utilisateur ou ses clients voient comme le site (maquette, pages). Là, un manque
s'affiche comme une note visible seulement en mode annotation (pastille ou bulle hors
de la page), en mots simples : « Il me manque le nom des restaurants ».

## 5. Le document

- Partir du modèle `templates/` du skill. Garder les titres du modèle : les étapes
  suivantes s'appuient dessus.
- En tête : `> Étape N — mis à jour le JJ/MM/AAAA — statut : brouillon | validé`.
- Concret et vérifiable plutôt que joli. Un paragraphe qui pourrait servir à n'importe
  quelle entreprise du secteur est raté : le réécrire.
- Le document passe en `validé` seulement après le « ok » de l'utilisateur.

## 6. La relecture indépendante

Avant de présenter un document comme terminé, lancer l'agent `relecteur` du plugin (s'il
est disponible — dans Claude Code ; dans Claude, les agents n'existent pas : faire la
relecture soi-même en changeant de posture, avec ses 6 points dans
`${CLAUDE_PLUGIN_ROOT}/agents/relecteur.md`). Il ne voit
que le document et les documents amont, et répond : ce qui est vague, ce qui contredit
l'amont, ce qui n'est pas sourcé, ce qui sonne « généré par IA ». Corriger, puis
présenter.

## 7. Après chaque étape

1. Mettre à jour `00-etat.md` : étape terminée, date, décisions clés, prochaine étape.
2. Terminer par **une** ligne : ce qui a été produit, et la commande de l'étape suivante.
3. Ne jamais laisser le tour finir sans suite claire :
   - **mode guidé** : le dernier geste est une question pour passer à l'étape suivante,
     avec l'outil de question à choix s'il est disponible (« Oui, on continue » / « Pas
     maintenant »). Sur un oui, lancer la skill suivante aussitôt (outil `Skill`).
   - **mode rapide** : lancer la skill suivante directement, sans demander. Les
     documents restent en `brouillon` ; ils sont validés **ensemble** au moment de la
     maquette, avec cette question : « La maquette te va ? En la validant, tu valides
     aussi les textes, les couleurs et les photos prévues qu'elle montre. »

Pendant une étape aussi, chaque tour qui attend l'utilisateur finit par **une** question
claire. Un tour qui se termine sur un résumé sans question laisse l'utilisateur bloqué.

## 8. Les outils externes

| Besoin | Outil | Si absent |
|---|---|---|
| Lire un site, extraire couleurs et polices | MCP `firecrawl` (embarqué, connexion OAuth) : `firecrawl_scrape`, formats `branding` + `screenshot` | `WebFetch` + description de l'utilisateur |
| Images, vidéos, sons | MCP `fal` (embarqué, connexion OAuth) | MCP `openrouter` (images et vidéos), sinon prompts prêts à coller — voir « Quel générateur » |
| Second avis d'un autre modèle | MCP `openrouter` | relecture par l'agent `relecteur` |
| Style et catalogue UI | skill `ui-ux-pro-max` s'il est installé, sinon MCP `ui-skills` (embarqué, sans connexion) : `get_skill` `nextlevelbuilder-ui-ux-pro-max` | données intégrées à `design-system/data/` |
| Critique anti-« IA générique » | skill `impeccable` s'il est installé, sinon MCP `ui-skills` : `get_skill` `pbakaus-impeccable` (et `pbakaus-critique`, `pbakaus-polish`) | grille intégrée `design-system/references/anti-patterns.md` |
| Autres savoir-faire UI (typo, motion, accessibilité, une techno précise) | MCP `ui-skills` : `list_skills` puis `get_skill` | ce qu'on sait déjà |
| Serveur, DNS | MCP `hostinger` (embarqué, OAuth) | SSH seul |
| Design system visuel, maquette | Claude Design (dans Claude) | `demo.html` et pages HTML dans `08-maquette/pages/` |
| Mouvement (maquette animée, site) | GSAP + ScrollTrigger, Lenis (gratuits, CDN pour la maquette) ; skills `gsap-*` s'ils sont installés | CSS + Intersection Observer |
| Images, vidéos, objets 3D (aucune limite) | OpenRouter (`generate-image`, `generate-video`), fal (dont image → 3D, détourage) — voir `niveau-agence.md` § 2 bis | banques libres Unsplash, Pexels |

**Le niveau visé** pour tout ce qui se voit : `commun/niveau-agence.md` — grandes
images, grille éditoriale, mouvement dessiné, note ≥ 90 / 100.

Les cinq connexions embarquées sont des serveurs distants : elles marchent dans Claude
comme dans Claude Code. On les connecte au premier usage (dans Claude : fenêtre de
connexion ou Paramètres → Connecteurs ; dans Claude Code : `/mcp`).

Un outil absent n'arrête jamais une étape : le dire en une phrase et continuer.

### Captures d'écran (Claude Code)

Pour toute relecture visuelle (charte, design system, maquette, construction) :
navigateur intégré ou Playwright, à **375 × 812** et **1440 × 900**, pleine page. Chrome
sans interface ne descend pas sous ~500 px de large : ne pas l'utiliser pour le mobile.
Playwright peut demander à sortir du bac à sable (accès au navigateur) : le dire. Sans
aucun outil de capture : relire le code HTML et le dire dans le verdict.

### Node, Python

Si `node` ou `python3` « n'existe pas » alors qu'il est installé (gestionnaire de
versions comme nvm, qui ne se charge que dans un terminal interactif), chercher le
chemin absolu (`ls /opt/homebrew/bin/node /usr/local/bin/node ~/.nvm/versions/node/*/bin/node`)
et l'utiliser.

### Les prix

Les prix des services sont souvent en dollars : les convertir en euros (ordre de
grandeur) avant de les annoncer, et annoncer un total pour le lot, pas un prix unitaire
seul.

### Quel générateur d'images et de vidéos

Regarder quels outils sont **présents** dans la session (un serveur non connecté n'expose
pas ses outils) ; ne jamais appeler fal juste pour tester, ça ouvrirait une fenêtre.

1. **fal connecté** → fal (catalogue le plus large : sons, vectorisation, détourage).
2. **fal absent ou pas connecté, OpenRouter connecté** → OpenRouter **par défaut, sans
   redemander** : `generate-image` pour les images, `generate-video` + `get-video` pour les
   vidéos. Le dire en une phrase (« fal n'est pas connecté, j'utilise OpenRouter »).
3. **Aucun des deux** → proposer de connecter OpenRouter (une seule connexion couvre
   images et vidéos ; `/mcp` puis « openrouter »), ou fal. Sur refus : prompts prêts à
   coller.

Ce qu'OpenRouter ne fait pas : effets sonores et musique, vectorisation en SVG, détourage.
Pour ces besoins sans fal : le signaler, puis prompts prêts à coller (sons), PNG haute
définition sur fond blanc à vectoriser ensuite (logo), ou modèle d'édition d'image avec
consigne « fond blanc uni » (détourage approximatif).

## 9. Actions sensibles

Demander un « oui » explicite avant : tout achat, toute dépense de crédits au-delà du
budget annoncé, toute écriture DNS, toute modification de serveur qui peut effacer des
données ou couper un accès, toute publication publique. Ne jamais écrire de mot de
passe, jeton ou clé dans un document du projet.
