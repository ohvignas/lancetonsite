---
name: demarrer
description: 'Point d''entrée de Lance ton site. Explique le parcours de l''idée au site en ligne — tout dans Claude Code (maquette sur un canevas Claude Design créé depuis Claude Code), ou conception dans l''application Claude puis construction dans Claude Code — crée le dossier projet, détermine s''il s''agit d''une création ou d''une refonte, repère les connexions et lance la première étape.'
when_to_use: '"créer mon site", "je veux un site web", "je lance mon entreprise", "refaire mon site", "par où commencer", "lance ton site", ou /lancetonsite:demarrer.'
argument-hint: "[nom du projet]"
---

# Démarrer

Lire `${CLAUDE_PLUGIN_ROOT}/commun/conventions.md` (introuvable : voir « Trouver les
fichiers du plugin » dans ce même fichier, ou chercher `conventions.md` dans le dossier du
plugin) — surtout le § 0, « Deux lieux de travail ».

## 1. Vérifier l'existant

- `projet-site/00-etat.md` existe déjà : ne rien recréer. Basculer sur
  `/lancetonsite:statut` et le dire en une phrase.
- **Dans Claude Code**, avec un `projet-site.zip`, un `projet-site/` ou un export de
  Claude Design (`design-bundle/`, `08-maquette/bundle/`) dans le dossier de travail
  (pas besoin de chercher dans les sous-dossiers) : c'est la suite d'une passation.
  Basculer sur `/lancetonsite:prd`.
- **Dans Claude** : vérifier que l'exécution de code marche (créer le dossier projet en
  dépend) ; sinon expliquer comment l'activer et s'arrêter.

## 2. Montrer le parcours — court et sans jargon

Une carte, puis **une ligne de 10 mots au plus par étape**, avec des mots de tous les
jours (le nom technique entre parenthèses quand il existe) :

```
 CONCEPTION    1 Ton projet et tes clients ─► 2 Ta marque ─► 3 Ton identité visuelle
               ─► 4 Les pages ─► 5 Les textes ─► 6 La boîte à outils visuelle
               ─► 7 Les photos ─► 8 La maquette ✔ que tu valides
 CONSTRUCTION  9 Le passage au code ─► 10 Le choix technique et le plan
               ─► 11 La construction ─► 12 La mise en ligne
```

Exemples de lignes : « 6 · La boîte à outils visuelle (design system) : boutons,
titres, couleurs, les mêmes partout » ; « 9 · Le passage au code (passation) : on
vérifie que tout est prêt ».

Dans Claude, ajouter : « on fait tout ici jusqu'à la maquette ; la construction se fera
dans Claude Code ». Dans Claude Code, ajouter : « on fait tout ici, de l'idée à la mise
en ligne ; la maquette se dessine sur un canevas Claude Design que tu pourras ouvrir et
commenter » (sans outil Artifact dans la session : la phrase du § 3, version « absent »). Préciser : chaque étape produit un document dans `projet-site/`, on peut
s'arrêter et reprendre avec `/lancetonsite:statut`, et rien n'est codé avant que la
maquette soit validée.

Ne jamais montrer à l'utilisateur les mots du métier sans les expliquer (persona, SEO,
stack, tokens, design system, PRD, VPS, DNS, zoning, CTA, handoff, HTTPS…).

## 3. Le lieu (Claude Code, projet neuf seulement)

Par défaut, **tout se fait ici** : ne pas poser de question. Regarder (sans l'appeler)
si l'outil Artifact, qui crée le canevas Claude Design, est présent dans la session,
puis le dire en une phrase :
- présent : « Tout se fait ici ; la maquette se dessine sur un canevas Claude Design
  créé depuis Claude Code (comme `/design`), et une version animée s'ouvre dans ton
  navigateur. » ;
- absent : « Tout se fait ici ; la maquette sera une page animée qui s'ouvre dans ton
  navigateur, avec des captures, et tu me donneras tes retours ici. » (repli :
  conventions § 0). Le noter dans `00-etat.md` (« Maquette »).
L'étape 9 se résume alors à une vérification avant de coder (voir `passation`).

Seulement si l'utilisateur demande à concevoir dans l'application Claude : ne rien créer
ici, donner la marche à suivre — ouvrir Claude (claude.ai ou l'app, onglet Chat),
activer l'exécution de code (Paramètres → Fonctionnalités), ajouter le plugin s'il n'y
est pas (Personnaliser → Plugins → Ajouter une marketplace → `ohvignas/lancetonsite`),
créer un **Projet** au nom du site, y écrire « Lance ton site » — et ajouter : « À
l'étape 9, tu reviendras dans ce dossier avec ton `projet-site.zip`. »

Dans Claude (l'application) : conseiller une fois de travailler dans un Projet Claude
dédié au site, et dire que le parcours complet (agents, captures, génération en lot)
est plus riche dans Claude Code.

## 4. Cinq questions, une à la fois

Annoncer d'abord le nombre : « Je vais te poser environ 20 questions en tout, dont 5
maintenant » (mode rapide ; en mode guidé : « une quinzaine par séance, on peut faire
des pauses »). Le budget de questions est dans les conventions, § 3.

1. **Le nom du projet et la ville** (ou la zone servie, ou « en ligne seulement »).
   Provisoire accepté.
2. **Ce qui existe déjà**, en options :
   - « Rien encore, juste l'idée » → création ;
   - « Un site à refaire » → refonte : demander son adresse, le parcourir (Firecrawl
     `firecrawl_map` puis `firecrawl_scrape` des pages clés, formats `markdown`,
     `branding`, `screenshot` ; sinon `WebFetch`) et ranger l'extraction dans
     `projet-site/sources/site-actuel/` ;
   - « Un logo ou des couleurs, pas de site » → identité existante : l'étape 3 sera une
     mise au propre.
   Dans tous les cas, demander dans la même question les **réseaux sociaux** (Instagram,
   Facebook, Google Business…) : adresse, et ce qui y marche. Ce ne sont pas un site à
   refaire, mais une source précieuse pour le cadrage (commentaires, vraies photos, ton).
   Les fichiers (logo, photos) : **ne pas les réclamer maintenant**. Dire qu'ils seront
   demandés à l'étape qui en a besoin (3 pour le logo, 7 pour les photos) et le noter
   dans `00-etat.md` (« à recevoir »).
3. **Qui parle sur le site** : « je » (une personne), « nous » (une équipe), « on »
   ou la marque à la troisième personne. Proposer l'option qui colle à ce qu'on sait
   (un artisan seul → « je »). Toutes les étapes écriront ainsi.
4. **Le rythme** :
   - guidé (recommandé) : chaque document est montré et validé avant le suivant ;
   - rapide : les étapes s'enchaînent avec **environ 20 questions en tout** (budget
     des conventions, § 3 ; le reste est déduit et marqué `[hypothèse]`, ou mis de côté
     « à confirmer en voyant la maquette »), puis la maquette est montrée, retouchée et
     validée comme en mode guidé.
5. **Le budget de génération** (images, vidéos, 3D, sons, second avis d'autres
   modèles), **un seul pour tout le parcours** : options « environ 5 € (images
   seulement) » / « environ 15 € (images et une vidéo de hero) » / « environ 30 €
   (images, vidéos, objet 3D) » / « 0 €, images libres seulement ». Le noter dans
   `00-etat.md` : « Budget IA : 0 $ / y $ ». Les étapes suivantes ne redemandent plus
   d'accord tant qu'elles restent dedans (conventions, « Le budget de génération »).

## 5. Créer le dossier

Copier [templates/00-etat.md](templates/00-etat.md) dans `projet-site/00-etat.md` et le
remplir avec les réponses (ville, réseaux, voix, fichiers à recevoir, budget IA). Créer les
sous-dossiers vides `03-charte/logo`, `05-contenus`, `06-design-system`,
`07-medias/images`, `08-maquette/captures`, `sources/`.

Dans Claude : le dossier vit dans l'espace d'exécution de code ; le dire en une phrase
(« je te proposerai de télécharger chaque document validé, et tout le dossier à la
passation »).

Dans Claude Code, si le dossier de travail est un dépôt git : proposer d'ajouter
`projet-site/sources/` au `.gitignore` si des captures volumineuses ou privées y seront
rangées.

## 6. Repérer les connexions (sans les déclencher)

Regarder seulement si les outils sont **présents** dans la session — ne pas les appeler :
un appel ouvrirait tout de suite une fenêtre de connexion. D'abord les serveurs du
plugin (outils nommés `…lancetonsite…`, par exemple `mcp__plugin_lancetonsite_fal__…`).
Un serveur du plugin « à authentifier » alors qu'**une connexion équivalente existe
déjà** (un serveur fal, OpenRouter ou Firecrawl ajouté par l'utilisateur, aux outils
reconnaissables : `recommend_model`, `generate-image`, `firecrawl_scrape`…) : utiliser
celle-ci, ne pas demander de connecter celle du plugin, et le noter dans `00-etat.md`
comme « disponible (connexion perso) ». Sans équivalent, un serveur « à authentifier »
compte comme « à connecter ».

| Connexion | Sert à | Étape |
|---|---|---|
| fal | images, vidéos, sons | 3, 7 |
| OpenRouter | images et vidéos (par défaut si fal n'est pas connecté), second avis IA | 3, 5, 7 |
| Firecrawl | lire des sites (avis, concurrents, site actuel) | 1, 3, refonte |
| UI Skills | ui-ux-pro-max, impeccable et 600 skills UI (sans connexion) | 6, 8, 11 |
| Hostinger | serveur, nom de domaine | 12 (dans Claude Code) |

Résumer en un tableau « disponible / à connecter le moment venu ». La connexion se fait
à l'étape concernée (fenêtre de connexion au premier appel). Ne bloquer sur rien.

Dans Claude Code seulement, vérifier aussi les outils de l'ordinateur utiles plus tard,
sans rien installer : `python3`, `node`, `ffmpeg`, `rsync`, `ssh`. Noter ceux qui
manquent dans `00-etat.md` ; on les installera à l'étape qui en a besoin.

`ui-ux-pro-max` et `impeccable` n'ont pas à être installés : ils arrivent par UI Skills.
S'ils sont installés en local, le signaler : la version locale sera utilisée.

## 7. Lancer — obligatoire, toujours en dernier

Ne jamais finir le tour sur le résumé ou le tableau des connexions : l'utilisateur
n'aurait rien à quoi répondre et le parcours s'arrêterait là.

- **Mode rapide** : ne rien demander, enchaîner tout de suite sur le cadrage (outil
  `Skill`, `lancetonsite:cadrage`) dans le même tour.
- **Mode guidé** (ou mode pas encore choisi) : le tout dernier geste du tour est la
  question « Prochaine étape : le cadrage. On y va ? », posée avec l'outil de question
  à choix s'il est disponible (options « Oui, on lance le cadrage » / « Pas
  maintenant »), sinon en dernière ligne du message. Sur un oui : lancer aussitôt
  `lancetonsite:cadrage` (outil `Skill`), sans attendre un autre message. Sur « pas
  maintenant » : rappeler en une phrase que `/lancetonsite:statut` permet de reprendre.
