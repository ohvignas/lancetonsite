---
name: passation
description: 'Prépare le passage de Claude Design à Claude Code une fois la maquette validée — vérifie que tout est prêt, rédige la note de passation, emballe le dossier projet (projet-site.zip) et guide l''envoi de la maquette à Claude Code (« Handoff to Claude Code » ou export zip). Étape 9 de Lance ton site.'
when_to_use: '"envoyer à Claude Code", "passer à la construction", "handoff", "exporter la maquette", "la maquette est validée, et maintenant ?", ou /lancetonsite:passation.'
argument-hint: "[verifier | emballer | envoyer]"
---

# Passation vers Claude Code

Lire `${CLAUDE_PLUGIN_ROOT}/commun/conventions.md` (introuvable : chercher
`conventions.md` dans le dossier du plugin).

**Tout a été fait dans Claude Code** (`00-etat.md` : maquette en HTML ou design créé
depuis Claude Code) : l'étape se résume à **§ 1 Vérifier** et **§ 2 La note**, puis
enchaîner sur `/lancetonsite:prd` dans le même tour. Pas d'archive, pas d'export, pas de
§ 4. Le dire en une phrase : « Tout est déjà ici, je vérifie et on passe au choix
technique. »

Sinon (conception dans Claude Design), Claude Code doit recevoir **deux choses** :
1. **la maquette validée** — exportée de Claude Design (le « handoff bundle » : fichiers
   HTML/CSS/JS, captures, README d'intention) ;
2. **le dossier projet** `projet-site/` — les documents 00 à 08 : sans eux, Claude Code
   n'aurait que l'apparence, pas les textes sourcés, le SEO, les personas ni les règles.

## 1. Vérifier

Lire `00-etat.md` et l'en-tête de chaque document. Lister en une fois :
- les étapes 1 à 8 **validées** ;
- celles en brouillon ou « à revoir » (voir `/lancetonsite:statut`) ;
- `08-maquette/maquette.md` présent et validé — **obligatoire**. Sans maquette validée :
  proposer `/lancetonsite:maquette` et s'arrêter là ;
- la maquette animée (`08-maquette/prototype/`) et sa note sur 100 (seuil 90) ;
- les images encore `provisoire` dans `07-medias/medias.md`, listées dans la note.

Un brouillon restant : le dire, proposer de le valider maintenant ou de passer quand
même en le signalant dans la note.

## 2. La note de passation

Rédiger `projet-site/09-passation.md` avec [templates/09-passation.md](templates/09-passation.md) :
le projet en 5 lignes, ce qui est validé, où trouver quoi, ce que Claude Code doit faire
en premier (`/lancetonsite:prd`), les points ouverts (médias à venir, `[À PROUVER]`,
choix techniques non tranchés). Pas de mot de passe ni de clé.

Mettre à jour `00-etat.md` : phase « Claude Code », prochaine étape `/lancetonsite:prd`.

## 3. Emballer le dossier projet

- **Dans Claude** : créer l'archive avec l'exécution de code
  (`cd <dossier contenant projet-site> && zip -r projet-site.zip projet-site -x "*.DS_Store"`)
  et la proposer au téléchargement. Si l'archive dépasse ~30 Mo (vidéos), faire une
  seconde archive `projet-site-medias.zip` pour `07-medias/` et le dire.
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
   `projet-site/08-maquette/bundle/` du dossier du site.
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

Une ligne de bilan (« Maquette et dossier prêts pour Claude Code »), puis la question
finale (outil de question à choix si disponible) : « Tu as pu ouvrir Claude Code dans le
dossier du site ? » — options « Oui, c'est parti » / « J'ai un souci ». Sur un souci :
aider pas à pas (où est le zip, comment ouvrir le dossier, comment installer Claude Code).
