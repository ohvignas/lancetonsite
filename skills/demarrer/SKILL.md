---
name: demarrer
description: 'Point d''entrée de Lance ton site. Explique le parcours de l''idée au site en ligne, crée le dossier projet, détermine s''il s''agit d''une création ou d''une refonte, vérifie les connexions (fal, OpenRouter, Hostinger) et lance la première étape.'
when_to_use: '"créer mon site", "je veux un site web", "je lance mon entreprise", "refaire mon site", "par où commencer", "lance ton site", ou /lancetonsite:demarrer.'
argument-hint: "[nom du projet]"
---

# Démarrer

Lire `${CLAUDE_PLUGIN_ROOT}/commun/conventions.md`.

## 1. Vérifier l'existant

Si `projet-site/00-etat.md` existe déjà : ne rien recréer. Basculer sur
`/lancetonsite:statut` et le dire en une phrase.

## 2. Montrer le parcours

Présenter la carte en une fois, sans jargon :

```
 STRATÉGIE          1 Cadrage ──► 2 Marque
 IDENTITÉ           3 Charte graphique
 SITE               4 Architecture ──► 5 Contenus ──► 6 Design system ──► 7 Médias
 EN LIGNE           8 PRD + plan ──► 9 Construction ──► 10 Déploiement
```

Une phrase par étape (reprendre le tableau « Le parcours » de
`${CLAUDE_PLUGIN_ROOT}/README.md`). Préciser : chaque étape produit un
document dans `projet-site/`, on peut s'arrêter et reprendre quand on veut avec
`/lancetonsite:statut`.

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
`06-design-system`, `07-medias/images`, `sources/`.

Si le dossier de travail est un dépôt git : proposer d'ajouter `projet-site/sources/` au
`.gitignore` si des captures volumineuses ou privées y seront rangées.

## 5. Repérer les connexions (sans les déclencher)

Regarder seulement si les outils sont **présents** dans la session — ne pas les appeler :
un appel ouvrirait tout de suite une fenêtre de connexion.

| Connexion | Sert à | Étape |
|---|---|---|
| fal | images, vidéos, sons | 3, 7 |
| OpenRouter | images, second avis IA | 5, 7 |
| Hostinger | serveur, nom de domaine | 10 |
| Firecrawl | lire des sites (avis, concurrents, site actuel) | 1, 3, refonte |

Résumer en un tableau « disponible / à connecter le moment venu ». La connexion se fait
à l'étape concernée (fenêtre de navigateur au premier appel). Ne bloquer sur rien.

Vérifier aussi les outils de l'ordinateur utiles plus tard, sans rien installer :
`python3`, `node`, `ffmpeg`, `rsync`, `ssh`. Noter ceux qui manquent dans `00-etat.md` ;
on les installera à l'étape qui en a besoin.

Signaler aussi, s'ils sont installés, les skills qui renforcent Lance ton site :
`ui-ux-pro-max`, `impeccable`. S'ils manquent, Lance ton site fonctionne quand même.

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
