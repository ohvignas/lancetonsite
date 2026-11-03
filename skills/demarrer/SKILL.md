---
name: demarrer
description: 'Point d''entrée de Lance ton site. Explique le parcours de l''idée au site en ligne — conception dans Claude Design jusqu''à la maquette validée, puis construction et mise en ligne dans Claude Code — crée le dossier projet, détermine s''il s''agit d''une création ou d''une refonte, repère les connexions et lance la première étape.'
when_to_use: '"créer mon site", "je veux un site web", "je lance mon entreprise", "refaire mon site", "par où commencer", "lance ton site", ou /lancetonsite:demarrer.'
argument-hint: "[nom du projet]"
---

# Démarrer

Lire `${CLAUDE_PLUGIN_ROOT}/commun/conventions.md` (introuvable : voir « Trouver les
fichiers du plugin » dans ce même fichier, ou chercher `conventions.md` dans le dossier du
plugin) — surtout le § 0, « Deux lieux de travail ».

## 1. Vérifier l'existant et le lieu

- `projet-site/00-etat.md` existe déjà : ne rien recréer. Basculer sur
  `/lancetonsite:statut` et le dire en une phrase.
- **Dans Claude Code**, avec un `projet-site.zip`, un `projet-site/` ou un export de
  Claude Design (`design-bundle/`, `08-maquette/bundle/`) dans le dossier : c'est la suite
  d'une passation. Basculer sur `/lancetonsite:prd`.
- **Dans Claude Code**, projet neuf : expliquer en deux phrases que la conception
  (étapes 1 à 8, jusqu'à la maquette validée) se fait de préférence dans **Claude
  Design**, dans l'application Claude, puis revient ici pour construire et publier.
  Question à choix : « Passer dans Claude Design (recommandé) » / « Tout faire ici ».
  - Claude Design : donner la marche à suivre — ouvrir Claude (claude.ai ou l'app,
    onglet Chat), activer l'exécution de code (Paramètres → Fonctionnalités), ajouter
    le plugin s'il n'y est pas (Personnaliser → Plugins → Ajouter une marketplace →
    `ohvignas/lancetonsite`), créer un **Projet** au nom du site, et y écrire « Lance ton
    site ». S'arrêter là.
  - Tout faire ici : continuer normalement ; la maquette sera faite en HTML (ou en
    artifact Design s'il est disponible).
- **Dans Claude** : vérifier que l'exécution de code marche (créer le dossier projet en
  dépend) ; sinon expliquer comment l'activer et s'arrêter. Conseiller, une fois, de
  travailler dans un Projet Claude dédié au site.

## 2. Montrer le parcours

Présenter la carte en une fois, sans jargon :

```
 DANS CLAUDE DESIGN   1 Cadrage ─► 2 Marque ─► 3 Charte ─► 4 Architecture ─► 5 Contenus
 (conception)         ─► 6 Design system ─► 7 Médias ─► 8 Maquette ✔ validée
                      ─► 9 Passation : maquette + dossier envoyés à Claude Code
 DANS CLAUDE CODE     10 PRD + plan ─► 11 Construction ─► 12 Mise en ligne
```

Une phrase par étape (reprendre le tableau « Le parcours » de
`${CLAUDE_PLUGIN_ROOT}/README.md`). Préciser : chaque étape produit un
document dans `projet-site/`, on peut s'arrêter et reprendre quand on veut avec
`/lancetonsite:statut` ; rien n'est codé avant que la maquette soit validée.

## 3. Trois questions, une à la fois

1. **Le nom du projet** (provisoire accepté).
2. **Création ou refonte ?**
   - Création : rien n'existe, ou juste une idée.
   - Refonte : un site existe → demander son adresse. Le parcourir (Firecrawl
     `firecrawl_map` puis `firecrawl_scrape` des pages clés, formats `markdown`,
     `branding`, `screenshot`) et enregistrer l'extraction dans
     `projet-site/sources/site-actuel/`. Les étapes suivantes partiront de l'existant.
   - Identité existante sans site : logo, couleurs, charte → demander les fichiers,
     les ranger dans `projet-site/sources/identite/`. L'étape 3 deviendra une mise au
     propre plutôt qu'une création.
3. **Le rythme** : guidé (on valide chaque document avant le suivant — recommandé) ou
   rapide (on enchaîne, l'utilisateur relit à la fin).

## 4. Créer le dossier

Copier [templates/00-etat.md](templates/00-etat.md) dans `projet-site/00-etat.md`, le
remplir, créer les sous-dossiers vides `03-charte/logo`, `05-contenus`,
`06-design-system`, `07-medias/images`, `08-maquette/captures`, `sources/`.

Dans Claude : le dossier vit dans l'espace d'exécution de code ; le dire en une phrase
(« je te proposerai de télécharger chaque document validé, et tout le dossier à la
passation »).

Dans Claude Code, si le dossier de travail est un dépôt git : proposer d'ajouter
`projet-site/sources/` au `.gitignore` si des captures volumineuses ou privées y seront
rangées.

## 5. Repérer les connexions (sans les déclencher)

Regarder seulement si les outils sont **présents** dans la session — ne pas les appeler :
un appel ouvrirait tout de suite une fenêtre de connexion.

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

## 6. Lancer — obligatoire, toujours en dernier

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
