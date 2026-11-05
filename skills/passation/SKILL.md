---
name: passation
description: 'Vérifie que tout est prêt avant de coder une fois la maquette validée (étapes validées, maquette notée, textes, médias provisoires) et rédige la note de passation. Si la conception s''est faite dans l''application Claude : emballe le dossier projet (projet-site.zip) et guide l''envoi de la maquette à Claude Code. Étape 9 de Lance ton site.'
when_to_use: '"envoyer à Claude Code", "passer à la construction", "handoff", "exporter la maquette", "la maquette est validée, et maintenant ?", ou /lancetonsite:passation.'
argument-hint: "[verifier | emballer | envoyer]"
---

# Passation vers Claude Code

**Équipe d'agents** : lancer ensemble, dès le début, tout ce que prévoit
`${CLAUDE_PLUGIN_ROOT}/commun/agents.md` pour cette étape (un agent Sonnet par source,
page ou pièce indépendante).

Lire `${CLAUDE_PLUGIN_ROOT}/commun/conventions.md` (introuvable : chercher
`conventions.md` dans le dossier du plugin) et `${CLAUDE_PLUGIN_ROOT}/commun/parcours.md`
(rythme, document publié, porte de validation). **Budget : environ 1 min**, compté
avec le PRD (4 min pour les deux). Document présenté : suivre le modèle
`${CLAUDE_PLUGIN_ROOT}/commun/modeles/passation.md`, **partie A**, version courte par
défaut (la partie B, remise au client, se remplit à l'étape 12).

**Tout a été fait dans Claude Code** (`00-etat.md` : maquette en HTML ou design créé
depuis Claude Code) : l'étape se résume à **§ 1 Vérifier** et **§ 2 La note**, puis la
porte de validation (§ 5). Pas d'archive, pas d'export, pas de § 4. Le dire en une
phrase : « Tout est déjà ici, je vérifie, puis je te montre la liste avant le choix
technique. »

Sinon (conception dans l'application Claude), Claude Code doit recevoir **deux choses** :
1. **la maquette validée** — exportée de Claude Design (le « handoff bundle » : fichiers
   HTML/CSS/JS, captures, README d'intention) ;
2. **le dossier projet** `projet-site/` — les documents 00 à 08 : sans eux, Claude Code
   n'aurait que l'apparence, pas les textes sourcés, le SEO, les personas ni les règles.

## 1. Vérifier

Lire `00-etat.md` et l'en-tête de chaque document. Lister en une fois :
- les étapes 1 à 8 **validées** ;
- celles en brouillon ou « à revoir » (voir `/lancetonsite:statut`) ;
- celles en `validé (simulé)` (un agent a joué le client) : à faire confirmer par le
  vrai client avant de coder ;
- `07-maquette/maquette.md` présent et validé — **obligatoire**. Sans maquette validée :
  proposer `/lancetonsite:maquette` et s'arrêter là ;
- `08-design-system/DESIGN.md` présent et validé, tiré de la maquette — **obligatoire**.
  Absent : proposer `/lancetonsite:design-system` et s'arrêter là ;
- la maquette animée (`07-maquette/prototype/`) et sa note sur 100 (seuils :
  `commun/niveau-agence.md` § 6), avec ce qui bloque encore 90 ;
- la boucle persona faite (`projet-site/boucle-persona/`, rubrique « Boucle persona »
  de `maquette.md`) : notes de chaque tour, verdict, `FIX` laissés au client. Absente :
  la lancer avant de continuer (`commun/boucle-persona.md`) ;
- les images encore `provisoire` dans `06-medias/medias.md`, listées dans la note.

Un brouillon restant : le dire, proposer de le valider maintenant ou de passer quand
même en le signalant dans la note.

## 2. La note de passation

Rédiger `projet-site/09-passation.md` (partie A) avec [templates/09-passation.md](templates/09-passation.md) :
le projet en 5 lignes, ce qui est validé, où trouver quoi, ce que Claude Code doit faire
en premier (`/lancetonsite:prd`), les points ouverts (médias à venir, `[À PROUVER]`,
choix techniques non tranchés). Pas de mot de passe ni de clé.

Mettre à jour `00-etat.md` : phase « Claude Code », prochaine étape `/lancetonsite:prd`.

## 3. Emballer le dossier projet

- **Dans Claude** : créer l'archive avec l'exécution de code
  (`cd <dossier contenant projet-site> && zip -r projet-site.zip projet-site -x "*.DS_Store"`)
  et la proposer au téléchargement. Si l'archive dépasse ~30 Mo (vidéos), faire une
  seconde archive `projet-site-medias.zip` pour `06-medias/` et le dire.
- **Dans Claude Code** (tout a été fait ici) : rien à emballer, le dossier est déjà sur
  l'ordinateur.

## 4. Envoyer la maquette à Claude Code

Expliquer à l'utilisateur, étape par étape, en lui laissant faire les clics :

1. Choisir **le dossier du site** sur l'ordinateur (un dossier vide, par exemple
   `Documents/{{nom-du-projet}}`). Y déposer `projet-site.zip` et le décompresser.
2. Dans le design de la maquette (Claude Design) : **Exporter** → **Handoff to Claude
   Code** →
   - **Send to local coding agent** si Claude Code est installé sur l'ordinateur : choisir
     le dossier du site ;
   - **Send to Claude Code Web** sinon (le dossier projet devra alors être dans le
     dépôt GitHub du site).
3. Si l'envoi échoue (message sur un « connecteur Claude Design » introuvable — problème
   connu) : cocher **Download zip instead**, puis décompresser le zip dans
   `projet-site/07-maquette/bundle/` du dossier du site.
4. Ouvrir Claude Code **dans le dossier du site** et écrire :

   ```text
   /lancetonsite:prd
   ```

   L'étape PRD retrouve toute seule le dossier projet et la maquette, vérifie qu'ils sont
   cohérents, puis propose la techno.

Préciser : le plugin Lance ton site ajouté dans Claude est aussi disponible dans Claude
Code avec le même compte. S'il n'y apparaît pas : `/plugin marketplace add
ohvignas/lancetonsite` puis `/plugin install lancetonsite@lancetonsite-marketplace`.

## 5. Finir

**Tout dans Claude Code** : publier la note de passation (`parcours.md` § 3), puis
**porte de validation** (`parcours.md` § 4) : la liste de contrôle en 3 à 5 points, et
« Valider et passer à l'étape suivante » / « Modifier ». Sur « Valider » : lancer
`lancetonsite:prd` (outil `Skill`). Jamais le PRD sans ce oui.

**Conception dans l'application Claude** :

Une ligne de bilan (« Maquette et dossier prêts pour Claude Code »), puis la question
finale (outil de question à choix si disponible) : « Tu as pu ouvrir Claude Code dans le
dossier du site ? » — options « Oui, c'est parti » / « J'ai un souci ». Sur un souci :
aider pas à pas (où est le zip, comment ouvrir le dossier, comment installer Claude Code).
