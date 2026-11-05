---
name: demarrer
description: 'Point d''entrée de Lance ton site. Explique le parcours de l''idée au site en ligne — tout dans Claude Code (maquette sur un canevas Claude Design créé depuis Claude Code), ou conception dans l''application Claude puis construction dans Claude Code — crée le dossier projet, détermine s''il s''agit d''une création ou d''une refonte, repère les connexions et lance la première étape.'
when_to_use: '"créer mon site", "je veux un site web", "je lance mon entreprise", "refaire mon site", "par où commencer", "lance ton site", ou /lancetonsite:demarrer.'
argument-hint: "[nom du projet]"
---

# Démarrer

**Équipe d'agents** : lancer ensemble, dès le début, tout ce que prévoit
`${CLAUDE_PLUGIN_ROOT}/commun/agents.md` pour cette étape (un agent Sonnet par source,
page ou pièce indépendante).

Lire `${CLAUDE_PLUGIN_ROOT}/commun/conventions.md` (introuvable : voir « Trouver les
fichiers du plugin » dans ce même fichier, ou chercher `conventions.md` dans le dossier du
plugin) — surtout le § 0, « Deux lieux de travail » — et
`${CLAUDE_PLUGIN_ROOT}/commun/parcours.md` (le rythme : une heure pour concevoir, un
document publié par étape, la porte de validation). Budget de cette étape : **3 min**,
premier visuel avant 5 min.

## 1. Vérifier l'existant

- `projet-site/00-etat.md` existe déjà : ne rien recréer. Basculer sur
  `/lancetonsite:statut` et le dire en une phrase.
- **Dans Claude Code**, avec un `projet-site.zip`, un `projet-site/` ou un export de
  Claude Design (`design-bundle/`, `07-maquette/bundle/`) dans le dossier de travail
  (pas besoin de chercher dans les sous-dossiers) : c'est la suite d'une passation.
  Basculer sur `/lancetonsite:prd`.
- **Dans Claude** : vérifier que l'exécution de code marche (créer le dossier projet en
  dépend) ; sinon expliquer comment l'activer et s'arrêter.

## 2. Montrer le parcours — dans le tableau de bord, avant 5 minutes

Premier geste visible du parcours (`parcours.md` § 2) : créer tout de suite
`projet-site/00-etat.md` (modèle [templates/00-etat.md](templates/00-etat.md), rempli
avec ce qu'on sait déjà) et **publier le tableau de bord du projet** (`parcours.md`
§ 3, les trois cas de publication) : les 12 étapes en frise, l'étape en cours, le
budget de temps de chacune, ce qui vient ensuite. Son lien va dans `00-etat.md`. Il
sera mis à jour au même lien à chaque étape.

Dans le message, la même carte en texte court, **une ligne de 10 mots au plus par
étape**, avec des mots de tous les jours (le nom technique entre parenthèses quand il
existe) :

```
 CONCEPTION    1 Ton projet et tes clients ─► 2 Ta marque ─► 3 Ton identité visuelle
               ─► 4 Les pages et leurs plans ─► 5 Les textes ─► 6 Les photos et objets 3D
               ─► 7 La maquette ✔ que tu valides ─► 8 La boîte à outils visuelle
 CONSTRUCTION  9 Le passage au code ─► 10 Le choix technique et le plan
               ─► 11 La construction ─► 12 La mise en ligne
```

Exemples de lignes : « 4 · Les pages et leurs plans (zoning, wireframes) : la place de
chaque bloc, en gris, avant les couleurs » ; « 6 · Les photos et objets 3D : images IA,
objets modélisés dans Blender » ; « 8 · La boîte à outils visuelle (design system) :
tirée de la maquette validée, les mêmes boutons et couleurs partout » ; « 9 · Le passage au code (passation) : on
vérifie que tout est prêt ».

Dans Claude, ajouter : « on fait tout ici jusqu'à la maquette ; la construction se fera
dans Claude Code ». Dans Claude Code, ajouter : « on fait tout ici, de l'idée à la mise
en ligne ; la maquette se dessine sur un canevas Claude Design que tu pourras ouvrir et
commenter » (sans outil Artifact dans la session : la phrase du § 3, version « absent »). Préciser : **environ une heure jusqu'au plan de construction** ; à la fin de
chaque étape, je te montre un vrai document et **tu valides avant qu'on passe à la
suite** ; on peut s'arrêter et reprendre avec `/lancetonsite:statut` ; rien n'est codé
avant que la maquette soit validée.

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

## 4. Le questionnaire — une seule fois, tout groupé

C'est le **seul** moment de questions du parcours (`parcours.md` § 1, levier 1) :
ensuite, chaque étape travaille avec ces réponses, marque le reste en `[hypothèse]`, et
ne demande que la validation. L'annoncer en une phrase : « Je te pose toutes mes
questions maintenant, en deux temps ; ensuite je ne te demanderai plus que de valider
chaque document. »

**Le premier message compte.** Si l'utilisateur a collé le modèle de prompt du README
(premier projet ou projet existant) ou donné des informations en démarrant : les noter
tout de suite dans `00-etat.md` (et dans `sources/` pour ce qui relève du cadrage :
offre, prix, clients, concurrents, sites aimés ou détestés), puis **ne demander que ce
qui manque**. Un champ laissé entre crochets ou vide reste à demander. Ces réponses
servent à toutes les étapes : ne jamais les redemander.

**Temps 1 — un message à remplir**, en une fois (laisser vide ce qu'on ne sait pas) :
- le nom du projet (provisoire accepté) et la ville, ou la zone servie, ou « en ligne
  seulement » ;
- ce qui est vendu, concrètement, et à quel prix ;
- les clients d'aujourd'hui : qui achète, et comment ils ont trouvé l'entreprise ;
- l'action que doit faire le visiteur (réserver, acheter, appeler, demander un devis…) ;
- 2 à 5 concurrents (noms ou adresses) ;
- la différence, avec sa preuve (« la qualité » n'en est pas une) ;
- ce qui existe : site actuel, réseaux sociaux (Instagram, Facebook, fiche Google…),
  logo, couleurs, photos, avis ;
- 1 à 3 sites aimés (et ce qui plaît dedans), 1 site détesté.

**Temps 2 — un écran de choix**, avec l'outil de question à choix (4 questions au plus
sur le même écran), sinon en liste numérotée :
1. **Qui parle sur le site** : « je » (une personne), « nous » (une équipe), « on » ou
   la marque. Proposer en premier l'option qui colle à ce qu'on sait (un artisan seul →
   « je »). Toutes les étapes écriront ainsi.
2. **Le budget de génération** (images, vidéos, 3D, sons, second avis d'autres
   modèles), **un seul pour tout le parcours** : « environ 5 € (images seulement) » /
   « environ 15 € (images et une vidéo de hero) » / « environ 30 € (images, vidéos,
   objet 3D) » / « 0 €, images libres seulement ». Le noter : « Budget IA : 0 $ / y $ »
   (conventions, « Le budget de génération »).
3. **Qui mettra à jour le site** après la mise en ligne : « moi, sans coder » / « moi,
   avec l'IA » / « un développeur » / « personne ». Il sert au choix technique (étape
   10), qui ne reposera pas la question.
4. **Le rythme** :
   - « **express** : site vitrine **en ligne en une heure**, 2 validations seulement » ;
   - « complet rapide : les 12 étapes, documents courts ; conception en une heure
     environ, puis construction et mise en ligne (environ 2 h 30 en tout) » ;
   - « complet approfondi : plus d'entretien et des documents complets (une demi-journée
     ou plus) ».
   Recommander l'express pour un site vitrine sans boutique ni espace client, ou quand
   l'utilisateur dit être pressé ; le complet pour le niveau agence. **Express choisi** :
   passer tout de suite à `${CLAUDE_PLUGIN_ROOT}/skills/express/SKILL.md` (palier 1 :
   les réponses déjà données ne sont pas redemandées) et ne pas suivre la suite de ce
   fichier. Complet : chaque étape est montrée et validée avant la suivante.

Ce qui découle des réponses, sans question de plus :
- **un site à refaire** : le parcourir en arrière-plan (Firecrawl `firecrawl_map` puis
  `firecrawl_scrape` des pages clés, formats `markdown`, `branding`, `screenshot` ;
  sinon `WebFetch`), lectures lancées en parallèle, et ranger l'extraction dans
  `projet-site/sources/site-actuel/` ;
- **un logo ou des couleurs sans site** : l'étape 3 sera une mise au propre ;
- **les réseaux sociaux** : une source pour le cadrage (commentaires, vraies photos,
  ton), pas un site à refaire ;
- **les fichiers** (logo, photos) : ne pas les réclamer maintenant ; ils seront demandés
  à l'étape qui en a besoin (3 pour le logo, 7 pour les photos), notés « à recevoir »
  dans `00-etat.md`.

## 5. Créer le dossier

Compléter `projet-site/00-etat.md` (créé au § 2) avec les réponses (ville, réseaux,
voix, fichiers à recevoir, budget IA, qui mettra à jour le site, rythme) et mettre à
jour le tableau de bord au même lien. Créer les sous-dossiers vides `03-charte/logo`,
`05-contenus`, `08-design-system`, `06-medias/images`, `07-maquette/captures`,
`documents/` (versions HTML des documents, sans artifacts), `sources/`.

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
sans rien installer : `python3`, `node`, `ffmpeg`, `rsync`, `ssh`, et Blender
(`bash ${CLAUDE_PLUGIN_ROOT}/skills/objets-3d/scripts/installer-blender.sh`, qui ne fait que
chercher ; utile seulement si le site montrera un objet en 3D). Noter ceux qui
manquent dans `00-etat.md` ; on les installera à l'étape qui en a besoin.

`ui-ux-pro-max` et `impeccable` n'ont pas à être installés : ils arrivent par UI Skills.
S'ils sont installés en local, le signaler : la version locale sera utilisée.

## 7. La porte de validation — obligatoire, toujours en dernier

Ne jamais finir le tour sur le résumé ou le tableau des connexions : l'utilisateur
n'aurait rien à quoi répondre et le parcours s'arrêterait là.

Porte de validation (`parcours.md` § 4) : le tableau de bord à jour, ce qui est acquis
en 3 à 5 points (avec les `[hypothèse]` retenues pour les trous), puis **une** question
avec l'outil de question à choix s'il est disponible : « On passe au cadrage ? » —
options « Valider et passer à l'étape suivante » / « Modifier ». Sur « Valider » :
lancer aussitôt `lancetonsite:cadrage` (outil `Skill`). Sur « Modifier » : corriger,
reposer la question. **Jamais** de lancement du cadrage sans ce oui, quel que soit le
rythme choisi.
