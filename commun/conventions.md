# Conventions communes de Lance ton site

Toutes les étapes suivent ces règles. Les lire avant de commencer une étape, avec
`${CLAUDE_PLUGIN_ROOT}/commun/parcours.md` : le rythme du parcours (quelque chose à voir
toutes les 2 minutes, un document publié par étape, la porte de validation à la fin de
chaque étape). Il n'y a qu'un parcours, les 12 étapes ; chaque étape peut aussi se lancer seule.

## 0. Deux lieux de travail

**Le parcours recommandé : tout dans Claude Code, de A à Z** (terminal, onglet Code de
l'app, IDE). Les étapes visuelles (moodboards, design system, maquette) s'y dessinent
sur un **canevas Claude Design créé depuis Claude Code** (artifact de type Design, comme
la commande `/design`), que l'utilisateur ouvre et commente. Claude Code a tout ce qu'il
faut : le dossier sur l'ordinateur, l'agent `relecteur`, les captures, les scripts
(génération d'images, tokens), puis la construction et la mise en ligne.

**Sans canevas Claude Design.** L'outil qui crée le canevas (Artifact, type Design) n'est
pas toujours présent dans la session. Le vérifier au démarrage, sans l'appeler. Absent :
la maquette est le **prototype HTML** du kit, ouvert dans le navigateur, avec ses
captures dans `07-maquette/captures/` ; l'utilisateur donne ses retours ici, et chacun
est noté dans `07-maquette/maquette.md` (rubrique « Retours ») avec ce qui a été fait.
Pas de commentaires sur le canevas ni de retouches directes : le dire une fois, en une
phrase, et ne plus les promettre.

| Phase | Étapes |
|---|---|
| **Conception** | 1 Cadrage → 7 Maquette validée (canevas Claude Design + maquette animée) → 8 Design system |
| **Construction** | 9 Vérification → 10 PRD + plan → 11 Construction → 12 Mise en ligne |

**L'autre chemin : l'application Claude** (web, bureau, mobile), pour qui ne veut rien
installer : les étapes 1 à 8 s'y font avec Claude Design et un espace d'exécution de
code temporaire (sans agents ni hooks), puis l'étape 9 envoie la maquette et le dossier
à Claude Code pour construire.

Savoir où l'on tourne : dans Claude Code, on travaille dans un dossier de l'ordinateur et
les agents sont disponibles ; dans Claude, non.

- Une étape de construction (9 à 12) lancée dans Claude : expliquer qu'elle se fait
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

Tout vit dans `projet-site/`, à la racine du dossier de travail, le code du site compris :
`projet-site/site/` (créé dans Claude Code), quel que soit le parcours. **Dans tous les fichiers
du plugin, `site/` désigne ce dossier.** Un ancien projet dont `site/` est à côté de `projet-site/`
reste lu tel quel, sans déplacement.

```
projet-site/
├── 00-etat.md               ← tableau de bord : étape, mode, stack, décisions
├── 01-cadrage.md            ← projet, offre, concurrence, cible, personas, citations
├── 02-marque.md             ← plateforme de marque : mission, positionnement, ton
├── 03-charte/
│   ├── charte.md            ← logo, couleurs, typos, direction photo, règles
│   └── logo/                ← fichiers du logo (SVG, PNG)
├── 04-architecture.md       ← arborescence, parcours, SEO par page, zonings
├── 04-wireframes/           ← un wireframe gris par page (HTML), index.html, captures/
├── 05-contenus/             ← un fichier par page : textes finaux + balises SEO
├── 06-medias/
│   ├── medias.md            ← manifeste : fichier, rôle, prompt, modèle, alt
│   ├── images/ videos/ sons/ 3d/
│   └── web/ a-recevoir/     ← sortie de l'optimiseur ; fichiers attendus du client
├── 07-maquette/
│   ├── maquette.md          ← lien du design ou du prototype, retours, écarts reportés
│   ├── prototype/           ← accueil.html, theme.css, gestes.js, medias/ : la version qui fait foi
│   ├── captures/            ← pages validées, desktop et mobile
│   ├── source/              ← copie de la source du design (canevas)
│   └── bundle/              ← export de Claude Design (handoff), ajouté dans Claude Code
├── 08-design-system/
│   ├── DESIGN.md            ← règles, tokens, composants, motion
│   ├── tokens.json / tokens.css / tailwind.css
│   └── demo.html            ← tous les composants, tous leurs états
├── boucle-persona/          ← fiche-client.md, un dossier par tour (étape 7)
├── 09-passation.md          ← A : prêt à construire ; B : remise au client (étape 12)
├── 10-prd.md                ← exigences produit, stack retenue
├── 11-plan.md               ← plan d'implémentation en tâches
├── 11-recette.md            ← plan de tests et procès-verbal de recette (étape 11)
├── 12-deploiement.md        ← comment le site est en ligne et se met à jour
├── site/                    ← le code du site (créé dans Claude Code)
├── public/                  ← site en HTML pur : copie publiée de site/, sans les fichiers de travail
├── documents/               ← versions HTML des documents présentés (sans artifacts)
└── sources/                 ← captures, extractions de sites, verbatims bruts
```

Si `projet-site/` n'existe pas : une étape lancée à la main le crée avec un `00-etat.md` minimal
(ligne « Enchaînement : manuel ») et le dit en une phrase ; elle signale que `/lancetonsite:demarrer`
fait le parcours complet.

## 2. Avant chaque étape

1. Lire `projet-site/00-etat.md`.
2. Lire **tous** les documents des étapes précédentes dont l'étape dépend (liste dans
   chaque skill, rubrique « Entrées »). Ne jamais reposer une question à laquelle un
   document répond déjà.
3. S'il manque un document requis : le dire en une phrase et proposer deux choix —
   faire l'étape manquante maintenant, ou continuer en marquant chaque déduction
   `[hypothèse]`. Exception : le design system et la passation sont tirés de la maquette validée
   (et la passation du design system) ; sans eux, rien à déduire : l'étape manquante se fait d'abord.

## 3. L'entretien

- **Un seul questionnaire, au démarrage** (`demarrer` § 4), groupé : le modèle à
  remplir en un message, plus un écran de choix. Ensuite, **aucune question au fil de
  l'eau** : un manque devient une `[hypothèse]` visible dans le document et se tranche
  à la porte de validation (`parcours.md` § 4). Les choix (direction, composition,
  style, image maîtresse, titre) ne sont pas des questions : l'option recommandée est
  prise et montrée, les autres tiennent en une ligne.
- **Jamais une question déjà répondue** : ce que l'utilisateur a dit (premier message,
  modèle de prompt du README, étape précédente, `00-etat.md`, `sources/`) est acquis.
  Le confirmer en une ligne si besoin, ne pas le redemander.
- Proposer **2 à 4 options concrètes** quand c'est possible (outil de question à choix
  si disponible). L'utilisateur peut toujours répondre autre chose.
- Réponse vague (« moderne », « épuré », « tout le monde », « qualité ») : ne pas
  l'accepter ; demander un exemple ou montrer deux versions opposées.
- Contradiction : la nommer, faire trancher.
- Le registre : tutoiement ou vouvoiement selon l'utilisateur, français simple, aucun
  jargon non expliqué.
- Un débutant n'a pas à connaître le vocabulaire du métier : traduire les choix
  techniques en conséquences concrètes (« ça coûte X », « ça prend Y »). Les mots
  persona, SEO, stack, tokens, design system, PRD, VPS, DNS, zoning, CTA, handoff,
  HTTPS ne sont jamais dits sans explication en mots simples.
- **Le rythme.** Le questionnaire du démarrage, puis une question par étape (la porte de validation) et
  les points mis de côté à la maquette ; documents courts, budgets de temps visés (`parcours.md` § 1).
  **Approfondir** un point, seulement si l'utilisateur le demande : entretien plus long, version longue,
  relecture complète. Rien ne s'enlève, jamais.
- **À confirmer en voyant la maquette.** Une question hors budget, ou plus facile à
  trancher sur un écran (quantités, grille de prix, ordre des sections, ton d'un titre),
  n'est pas posée : la noter dans `00-etat.md`, « Décisions clés », avec l'hypothèse retenue
  en attendant ; la maquette la reprend dans `07-maquette/maquette.md`, rubrique « À confirmer en voyant la maquette ». La maquette les pose
  toutes ensemble, en une seule question à choix multiples.
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
- Le **document présenté** à l'utilisateur suit le modèle d'agence de
  `${CLAUDE_PLUGIN_ROOT}/commun/modeles/`, version courte par défaut, et se publie en
  artifact, au même lien à chaque retouche (`parcours.md` § 3). Jamais une image.
- En tête : `> Étape N — mis à jour le JJ/MM/AAAA — statut : brouillon | validé | validé (simulé)`.
- Concret et vérifiable plutôt que joli. Un paragraphe qui pourrait servir à n'importe
  quelle entreprise du secteur est raté : le réécrire.
- Le document passe en `validé` seulement après le « Valider » de l'utilisateur, à la
  porte de validation (`parcours.md` § 4).
- **Validation simulée.** Quand un agent joue le client (test automatique, persona
  simulé), le statut est `validé (simulé)`, jamais `validé`, dans le document comme dans
  `00-etat.md`. Le vrai client confirme avant la construction ; l'étape 9 (passation)
  le signale.

## 6. La relecture indépendante

**Une seule relecture lourde, à la maquette** (`parcours.md` § 1, levier 6). À
l'étape 7, l'agent `relecteur` du plugin fait **un tour rapide**, lancé en parallèle de
la boucle persona (dans Claude, les agents n'existent pas : se relire soi-même en
changeant de posture, avec ses points dans `${CLAUDE_PLUGIN_ROOT}/agents/relecteur.md`).
Il ne voit que la maquette et les documents amont, et répond : ce qui est vague, ce qui
contredit l'amont, ce qui n'est pas sourcé, ce qui sonne « généré par IA ». À travers
la maquette, il relit aussi les wireframes, les textes, la charte et les médias. Un
deuxième tour seulement si l'utilisateur le demande.

**Aux autres étapes** : relecture soi-même, en une minute, en changeant de posture, sur
les points 1 à 4 du relecteur. Seulement si l'utilisateur demande d'approfondir, le relecteur passe aussi
sur le cadrage et la marque.

**Pour un rendu visuel** (charte, design system, maquette, pages construites), le
relecteur ne voit que des images : lui passer les chemins des captures aux tailles de
« Captures d'écran » (§ 8), **plus une série de 8 à 12 captures prises au fil du
défilement** à 1440 × 900 (début, milieu et fin de chaque section épinglée, état
ouvert des éléments interactifs). Si possible, enregistrer aussi une courte vidéo du
défilement (Playwright `recordVideo`) et en extraire 2 images par seconde
(`ffmpeg -i defilement.webm -vf fps=2 defilement-%03d.png`) : le relecteur lit des
images, pas des vidéos. Sans cette série, il juge le mouvement sur le code et le dit.

**Après le relecteur, la boucle persona** (maquette et site construit seulement) : un
agent `client-persona` joue le client, utilise la page dans un vrai navigateur, la note
et rend un plan de corrections : un tour `rapide`, puis des tours `controle` jusqu'au
seuil (3 au plus). Source unique :
`${CLAUDE_PLUGIN_ROOT}/commun/boucle-persona.md`.

## 7. Après chaque étape : la porte de validation

La règle complète est dans `${CLAUDE_PLUGIN_ROOT}/commun/parcours.md` § 4. En bref :
1. publier le document de l'étape (artifact, au même lien) et mettre à jour le tableau
   de bord ;
2. résumer en 3 à 5 points, avec le lien ;
3. poser **une** question de validation (outil `AskUserQuestion` s'il existe) :
   « Valider et passer à l'étape suivante » / « Modifier » ;
4. **ne jamais démarrer l'étape suivante sans un oui explicite**, en aucun mode
   (exception écrite par l'utilisateur : `parcours.md` § 4) ;
5. sur « Valider » : `validé` dans le document et dans `00-etat.md` (étape, date,
   temps passé, décisions clés, lien du document, prochaine étape), puis lancer la skill
   suivante (outil `Skill`).

Chaque tour qui attend l'utilisateur finit par **une** question claire. Un tour qui se
termine sur un résumé sans question laisse l'utilisateur bloqué.

## 8. Les outils externes

| Besoin | Outil | Si absent |
|---|---|---|
| Lire un site, extraire couleurs et polices | MCP `firecrawl` (embarqué, connexion OAuth) : `firecrawl_scrape`, formats `branding` + `screenshot` | `WebFetch` + description de l'utilisateur |
| Images, vidéos, sons | MCP `fal` (embarqué, connexion OAuth) | MCP `openrouter` (images et vidéos), sinon prompts prêts à coller — voir « Quel générateur » |
| Second avis d'un autre modèle | MCP `openrouter` | relecture par l'agent `relecteur` |
| Volumes de mots-clés, résultats Google, concurrents | MCP `dataforseo` (embarqué, connexion OAuth, payant à l'usage : annoncer le coût avant un lot) | recherche web et `firecrawl`, en disant que les volumes ne sont pas mesurés |
| Regarder ou modifier une scène Blender ouverte | MCP `blender` (embarqué ; `uv` et module Blender requis, jamais installés sans oui) | skill `objets-3d` par script, qui reste la voie par défaut |
| Style et catalogue UI | skill `ui-ux-pro-max` s'il est installé, sinon MCP `ui-skills` (embarqué, sans connexion) : `get_skill` `nextlevelbuilder-ui-ux-pro-max` | données intégrées à `design-system/data/` |
| Critique anti-« IA générique » | skill `impeccable` s'il est installé, sinon MCP `ui-skills` : `get_skill` `pbakaus-impeccable` (et `pbakaus-critique`, `pbakaus-polish`) | grille intégrée `design-system/references/anti-patterns.md` |
| Autres savoir-faire UI (typo, motion, accessibilité, une techno précise) | MCP `ui-skills` : `list_skills` puis `get_skill` | ce qu'on sait déjà |
| Serveur, DNS | MCP `hostinger` (embarqué, OAuth) | SSH seul |
| Design system visuel, maquette | Claude Design (dans Claude) | `demo.html` et pages HTML dans `07-maquette/pages/` |
| Mouvement (maquette animée, site) | GSAP + ScrollTrigger, Lenis (gratuits, CDN pour la maquette) ; skills `gsap-*` s'ils sont installés | CSS + Intersection Observer |
| Images, vidéos, objets 3D (aucune limite) | fal (dont image → 3D, détourage), puis OpenRouter (`generate-image`, `generate-video`) — voir « Quel générateur » et `niveau-agence.md` § 2 bis | banques libres Unsplash, Pexels |

**Le niveau visé** pour tout ce qui se voit : `commun/niveau-agence.md` — grandes
images, grille éditoriale, mouvement dessiné, note sur 100 (seuils : `boucle-persona.md`).
La structure de la page vient de `commun/compositions.md` ; les sections attendues et
la fourchette de texte, du § 11.

Six des sept connexions embarquées sont des serveurs distants : elles marchent dans Claude
comme dans Claude Code. Blender tourne sur l'ordinateur : sans `uv`, elle ne démarre pas, et
la 3D par script continue sans elle. On les connecte au premier usage (dans Claude : fenêtre de
connexion ou Paramètres → Connecteurs ; dans Claude Code : `/mcp`).

Un outil absent n'arrête jamais une étape : le dire en une phrase et continuer.
Une connexion équivalente déjà présente dans la session (un serveur fal, OpenRouter ou
Firecrawl ajouté par l'utilisateur hors du plugin) remplace celle du plugin : l'utiliser
sans redemander de connexion, et le noter dans `00-etat.md` (« Connexions »).

### Captures d'écran (Claude Code) — la liste unique

Pour toute relecture visuelle (charte, design system, maquette, construction), avec le
navigateur intégré ou Playwright. Les autres fichiers renvoient à cette liste :

| Taille | Ce qu'on contrôle |
|---|---|
| **360 × 740** | débordement horizontal (petit Android) |
| **375 × 667** | premier écran mobile : titre et action principale visibles sans défiler |
| **375 × 812** | page entière sur téléphone (pleine page) |
| **768 × 1024** | tablette : la grille passe de deux colonnes à une sans rien casser |
| **1280 × 720** | écran bas d'ordinateur : le titre du hero ne passe pas sous l'en-tête, le hero reste équilibré |
| **1440 × 900** | page entière sur ordinateur (pleine page), série au défilement |

**Le responsive se contrôle pour de vrai.** Chaque page (pas seulement l'accueil) est
capturée à **chacune** de ces tailles, et chaque capture est regardée. À aucune taille
un titre n'est cassé (un mot coupé en deux, une lettre seule sur sa ligne), coupé par
son cadre, trop long (plus de 4 lignes sur téléphone) ou trop grand (il pousse l'action
hors du premier écran). Un titre d'affichage a sa taille mobile à lui (`clamp()`), pas
la taille ordinateur réduite. Aucun titre ne se coupe sur un trait d'union (« e- /
mail ») : règle et contrôle au § 12. Un défaut trouvé à une taille : corriger, puis
refaire **toutes** les captures.

**Avant toute capture, forcer le chargement des images.** Les images différées
(`loading="lazy"`) laissent des cases vides sur une capture pleine page, en mouvement
réduit surtout, et le relecteur juge sur ces captures. Dans le script Playwright, après
le chargement de la page :

```js
await page.evaluate(async () => {
  document.querySelectorAll('img[loading="lazy"]').forEach((i) => (i.loading = "eager"));
  await Promise.all([...document.images].map((i) => i.complete || new Promise((ok) => { i.addEventListener("load", ok, { once: true }); i.addEventListener("error", ok, { once: true }); })));
});
```

**Servir la page** : `python3 ${CLAUDE_PLUGIN_ROOT}/commun/scripts/servir.py DOSSIER`, en arrière-plan :
port libre, page servie comparée au fichier, adresse sur la première ligne. Jamais de port fixe : il
peut être pris par un autre projet, et on validerait alors le mauvais site.

**Script** : `${CLAUDE_PLUGIN_ROOT}/commun/scripts/captures.py URL DOSSIER`. Il fait les
six tailles ci-dessus (`--tailles 3` pendant le travail : 1440, 768 et 375), force les images, attend
la fin des animations (on capture l'état final, pas un état intermédiaire) et écrit `mesures.json`
(débordement, console, images, animations restantes, liens morts). `--titre "…"` arrête tout si la
page servie n'est pas la bonne. Il lance le navigateur avec WebGL et lecture automatique. Prérequis :
`captures.py --verifier`. « Manque » : c'est un téléchargement, à faire accepter avant la boucle.
« Refus de lancement » : le navigateur existe, relancer hors du bac à sable, sans rien télécharger.

**Médias en fichiers pendant la boucle.** La page testée référence ses images et
vidéos par chemin relatif. Une page qui embarque ses médias en base64 (plusieurs Mo)
ralentit chaque chargement, chaque capture et chaque agent. L'intégration en base64,
pour publier un artifact d'une seule pièce, se fait **après** la boucle, jamais avant un
tour.

Chrome sans interface ne descend pas sous ~500 px de large : ne pas l'utiliser pour le
mobile.
Playwright peut demander à sortir du bac à sable (accès au navigateur) : le dire. Sans
aucun outil de capture : relire le code HTML et le dire dans le verdict.

### Les médias : un seul discours, un seul dossier

- **Le discours** : le niveau agence demande des images générées et une boucle vidéo de hero (`medias`,
  `niveau-agence.md` § 2). Recommandé : environ 5 $ (estimé sur un test : 2,79 $ pour 14 images et 2 boucles,
  4,13 $ avec des boucles refaites). Budget à 0 : images et vidéo libres de banques, choisies dans la même
  lumière, marquées `provisoire`. Ce choix ne se repose pas.
- **Le dossier** : manifeste dans `projet-site/06-medias/medias.md`, fichiers dans `06-medias/images/` et
  `videos/` (§ 1), repris dans `site/` à la construction.

### Node, polices et bibliothèques

**Sans Node** : `styles.css` écrit à la main avec les variables de la fiche, plus
`${CLAUDE_PLUGIN_ROOT}/skills/maquette/templates/prototype/gestes.css`, autonome (étapes, galerie,
bande, curseur). Aucun geste n'exige Tailwind.

**Polices et bibliothèques, sans jamais bloquer** : pendant le travail, CDN à version exacte, aucun oui
à attendre. Avant la mise en ligne, l'auto-hébergement est demandé une seule fois, avec le oui de la
mise en ligne (« je télécharge polices et bibliothèques libres dans ton site »). Sur un refus, la page
reste sur CDN et l'écart est noté dans `12-deploiement.md`.

Si `node` ou `python3` « n'existe pas » alors qu'il est installé (gestionnaire de
versions comme nvm, qui ne se charge que dans un terminal interactif), chercher le
chemin absolu (`ls /opt/homebrew/bin/node /usr/local/bin/node ~/.nvm/versions/node/*/bin/node`)
et l'utiliser.

### Les prix

Les prix des services sont souvent en dollars : les convertir en euros (ordre de
grandeur) avant de les annoncer, et annoncer un total pour le lot, pas un prix unitaire
seul.

### Le budget de génération (un seul pour tout le parcours)

Un **seul** budget couvre tout ce qui se paie à l'usage : logo s'il faut le générer
(3), second avis d'autres modèles (5, sur demande), images, vidéos, 3D et sons (6),
images manquantes de la maquette (7), DataForSEO et tout autre service payant à l'usage (1, 4). Aucune autre image générée avant l'étape 6
(`parcours.md` § 1). Il est demandé **une fois, au démarrage** (`demarrer` § 4, temps
2), et suivi dans
`00-etat.md` sur une ligne : « Budget IA : x $ / y $ » (dépensé / accordé, annoncé en
euros à l'utilisateur).

- Avant chaque lot : estimer, puis le dire en une phrase (« environ 2 € pour 9 images,
  il restera 6 € »). Dans le budget : lancer sans redemander. Au-delà : annoncer le
  dépassement et son coût avant de lancer, puis l'afficher ; jamais en silence.
- Après chaque lot : mettre à jour la ligne avec le coût réel (`get-session-cost` sur
  OpenRouter, historique fal), jamais avec l'estimation seule.
- Budget à 0 : banques libres et prompts prêts à coller, sans reposer la question.

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

Demander un « oui » explicite avant : tout achat, toute écriture DNS, toute modification de serveur qui peut effacer des
données ou couper un accès, toute publication publique. Ne jamais écrire de mot de
passe, jeton ou clé dans un document du projet.

## 10. Polices à éviter — la liste unique

Vues partout, elles signent le « site généré ». Les autres fichiers (charte, design
system, relecteur) renvoient à cette liste :

Inter, Roboto, Open Sans, Lato, Montserrat, Poppins, Arial, Helvetica, Space Grotesk,
Plus Jakarta Sans, Geist, Instrument Serif, Fraunces.

Une exception doit être justifiée par la charte (police existante de la marque, par
exemple). Au catalogue `design-system/data/typography.csv`, écarter toute paire qui en
contient une.

## 11. La page d'accueil complète — la source unique

La page d'accueil est **complète** : le visiteur y trouve tout ce qu'il doit savoir
pour décider, sans chercher. Chaque bloc reste court, et la page montre plus qu'elle ne
dit : **plus de visuels que de texte**. Deux erreurs comptent autant l'une que
l'autre : la page **trop maigre** (structure incomplète, il manque l'offre, les
personnes ou le catalogue) et la page **trop bavarde** (blocs de texte longs). Les
autres fichiers (`niveau-agence.md`, `compositions.md`, `architecture`, `contenus`,
`maquette`, `construire`, relecteur, client simulé) renvoient ici.

| Page d'accueil | Fourchette |
|---|---|
| Sections du `<main>` (hero et appel final compris) | **10 à 13** |
| Phrases par bloc (titre non compté) | **3 au plus**, sauf un avis cité, reproduit mot pour mot |
| Titres | **4 à 10 mots** |
| Mots visibles, menus et pied de page compris | **500 à 800** |
| Visuels | au moins une image, une vidéo ou un objet par section, sauf l'appel final et la FAQ |
| Hauteur à 1440 × 900, épinglages compris | **environ 15 écrans** (12 à 18) |

**Les sections attendues**, selon le métier. L'ordre suit le parcours du persona
(`architecture` § 5) ; la mise en scène suit la composition (`compositions.md`). Une
section absente se justifie dans le zoning (« pas de tarifs publics : devis sur
mesure »), sinon elle manque.

| Section | Ce qu'elle dit | Quand |
|---|---|---|
| Hero | quoi, pour qui, quoi faire, en 5 secondes | toujours |
| Preuve | avis réels, chiffres réels, presse, lieux, clients | toujours, tôt dans la page |
| Offre ou produits | ce qu'on achète, les familles, les formules | toujours |
| Comment ça marche | les étapes, du premier contact au résultat | toujours |
| Qui on est | les personnes, le lieu, l'équipe, en photos | toujours |
| Témoignages | des clients réels, nommés | dès qu'il y en a ; sinon le bloc de preuve sans avis (`contenus`) |
| Catalogue ou articles | fiches produits avec prix et action, ou cartes d'articles datées (`architecture` § 5) | dès que le métier vend des produits ou publie |
| Tarifs | les prix, ou la fourchette et ce qui la fait varier | dès que les prix peuvent s'afficher |
| FAQ | 3 à 5 questions, réponse en une ou deux phrases | toujours |
| Appel final | l'action principale, avec sa réassurance | toujours |
| Pied de page complet | coordonnées, horaires si commerce, plan du site, liens légaux, réseaux, inscription si le métier publie | toujours |

- **Aucun lien vers une page absente**, mentions légales et confidentialité comprises, dès le premier
  aperçu : la page se génère (structure de `contenus`, « Pages légales » ; un champ inconnu ne s'invente
  pas : sa ligne se retire et le manque se signale), sinon le lien se retire. `captures.py` liste les
  liens morts dans `mesures.json`.
- **Le détail va sur des pages dédiées**, liées depuis le bloc qui l'annonce : FAQ
  complète, caractéristiques, tarifs détaillés, méthode longue, catalogue entier.
- Chaque composition a sa cible, dans cette fourchette (`compositions.md`).
- Les autres pages n'ont pas de plafond de mots, mais gardent 3 phrases au plus par
  bloc ; le détail s'y lit en liste, en tableau ou en questions.
- **Comptage obligatoire** à la critique de la maquette (étape 7), du site construit
  (étape 11), avec le script ci-dessous. Le résultat va dans `maquette.md` (« Où la
  voir », ligne « Densité ») et au relecteur. Hors fourchette, d'un côté comme de
  l'autre : pénalité sur la note sur 100 (`niveau-agence.md` § 6).

```js
// Playwright, à 1440 × 900 : images chargées (§ 8), puis 3 s d'attente (anti-flash js-attente)
const densite = await page.evaluate(() => {
  // Une FAQ fermée compte aussi ; sans name, sinon l'accordéon referme les autres.
  document.querySelectorAll("details").forEach((d) => { d.removeAttribute("name"); d.open = true; });
  // Les moments d'une scène, masqués hors de leur tour, comptent aussi : leur donner data-moment ou data-step.
  document.querySelectorAll("[data-moment], [data-step]").forEach((m) => m.style.setProperty("visibility", "visible", "important"));
  const vu = (el) => el.checkVisibility?.() ?? true; // innerText d'un bloc caché rendrait tout son texte
  const mots = (t = "") => t.split(/\s+/).filter((m) => /[\p{L}\p{N}]/u.test(m)).length; // t vide : SVG
  const masques = (el) => [...el.querySelectorAll('[aria-hidden="true"]')] // copies de la bande défilante
    .filter((x) => vu(x) && !x.parentElement.closest('[aria-hidden="true"]'))
    .reduce((s, x) => s + mots(x.innerText), 0);
  // Titre découpé en lettres, compteur qui défile : le texte vit dans aria-label, les
  // morceaux visibles sont aria-hidden. On compte l'étiquette une fois, à la place.
  const enLigne = /^(H[1-6]|P|SPAN|STRONG|EM|B|SMALL|DT|DD|LABEL|BLOCKQUOTE)$/;
  const etiquettes = (el) => [...el.querySelectorAll("[aria-label]")]
    .filter((x) => vu(x) && enLigne.test(x.tagName) && x.querySelector('[aria-hidden="true"]')
      && !x.closest('[aria-hidden="true"]') && !(x.parentElement.closest("[aria-label]")?.tagName.match(enLigne)))
    .reduce((s, x) => s + mots(x.getAttribute("aria-label")) - mots(x.innerText) + masques(x), 0);
  // Déplier <main> et toute enveloppe qui contient des sections (div.carnet, pin-spacer…),
  // pour garder le détail par section ; le total ne change pas.
  const deplier = (el) =>
    el.tagName === "MAIN" || (el.tagName !== "SECTION" && el.querySelector(":scope > section, :scope > main"))
      ? [...el.children].flatMap(deplier) : [el];
  const blocs = [...document.body.children]
    .flatMap(deplier)
    .filter((el) => !["SCRIPT", "STYLE", "TEMPLATE", "NOSCRIPT"].includes(el.tagName))
    .filter((el) => vu(el) && el.getAttribute("aria-hidden") !== "true");
  const nom = (b) => b.id || b.firstElementChild?.id || b.tagName.toLowerCase();
  const detail = blocs.map((b) => ({ bloc: nom(b), mots: mots(b.innerText) - masques(b) + etiquettes(b) }));
  return {
    mots: detail.reduce((s, d) => s + d.mots, 0),
    sections: [...document.querySelectorAll("main section")].filter((x) => !x.parentElement.closest("main section")).length,
    ecrans: +(document.documentElement.scrollHeight / innerHeight).toFixed(1),
    detail,
  };
});
console.table(densite.detail);
console.log(`${densite.mots} mots · ${densite.sections} sections · ${densite.ecrans} écrans`);
```

Les phrases par bloc se vérifient à l'œil sur le détail par bloc : un bloc à plus de
60 mots a presque toujours plus de 3 phrases (une section de catalogue ou de FAQ en
compte plusieurs : chaque fiche, chaque question est un bloc). Une section à moins de
10 mots et sans visuel est presque toujours une section vide : la remplir ou la retirer.

## 12. Titres : jamais coupés sur un trait d'union — la source unique

Un mot à trait d'union (« e-mail », « peut-être », « Saint-Malo », « après-midi »,
« porte-à-porte ») peut se couper en fin de ligne, au trait d'union : « Vos impayés
relancés par e- / mail et SMS ». Sur un titre, c'est un défaut visible du premier coup
d'œil. `maquette` et `construire` y renvoient.

- **Dans les titres** (`h1` à `h3`, accroches, boutons), chaque mot à trait d'union
  est protégé :
  - de préférence `<span class="whitespace-nowrap">e-mail</span>` (Tailwind), ou
    `white-space: nowrap` en CSS ;
  - ou le trait d'union insécable U+2011 (`e‑mail`, entité `&#8209;`), **seulement si
    la police du titre a ce glyphe** : sinon le navigateur le prend dans une autre
    police et il se voit. Le vérifier sur la capture.
- Les titres gardent `hyphens: manual` (aucune césure automatique) ; `text-wrap:
  balance` aide à équilibrer les lignes.
- Dans `05-contenus/`, les textes restent écrits normalement (« e-mail ») : la
  protection se pose dans le HTML.
- **Contrôle**, à chacune des tailles du § 8 (Playwright, après le chargement) : la
  liste doit être vide.

```js
const coupes = await page.evaluate(() => {
  const res = [];
  document.querySelectorAll("h1, h2, h3, [data-titre]").forEach((h) => {
    const w = document.createTreeWalker(h, NodeFilter.SHOW_TEXT);
    for (let n; (n = w.nextNode()); ) {
      for (const m of n.data.matchAll(/[\p{L}\p{N}][-\u2010](?=[\p{L}\p{N}])/gu)) {
        const i = m.index + 1, r = document.createRange();
        r.setStart(n, i); r.setEnd(n, i + 1); const a = r.getBoundingClientRect();
        r.setStart(n, i + 1); r.setEnd(n, i + 2); const b = r.getBoundingClientRect();
        if (b.top > a.top + a.height / 2) res.push(h.textContent.trim().slice(0, 60));
      }
    }
  });
  return res;
});
console.log(coupes.length ? `Titres coupés sur un trait d'union : ${coupes.join(" | ")}` : "Aucun titre coupé.");
```
