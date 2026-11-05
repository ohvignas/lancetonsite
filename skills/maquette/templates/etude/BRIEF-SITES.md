# Brief commun aux constructeurs de sites d'exemple

Racine du plugin : `/Users/antoinevigneau/Library/Application Support/Claude/scratch-workspaces/25bcb6e3-3306-454a-a769-79fd1fb1860d/16298988-3e01-40a8-9236-6c60ffb4f0b7/scratch-2026-11-03-fbd9f4/atelier/`. Tout en **français avec accents**. Serveur local : `http://localhost:4320/` sert le dossier parent d'`atelier/` (donc `http://localhost:4320/atelier/skills/maquette/templates/exemples/<dossier>/`).

## À lire avant d'écrire une ligne

1. `skills/maquette/templates/exemples/README.md` (le niveau visé, les 8 exemples) puis **ouvrir deux exemples** dans le navigateur et lire leur `index.html`, `NOTES.md`, `brief.md` : `artisan-sablon/` et `b2b-vigie/` (et `b2c-brume/` pour l'immersif).
2. `commun/conventions.md` § 11 (page d'accueil complète : 10 à 13 sections, 500 à 800 mots, 3 phrases max par bloc, plus de visuels que de texte, catalogue ou articles datés tirés d'un objet JS, nav sans téléphone, formulaire en deux colonnes sur ordinateur), `commun/compositions.md` (ta composition), `commun/niveau-agence.md`, `skills/maquette/SKILL.md` (hero interdit : « pastille + grand titre à gauche + 2 boutons + réassurance + 3 cartes » ; pas de surtitre en capitales espacées au-dessus du h1).
3. `skills/maquette/templates/prototype/GESTES.md` + `gestes.js` (gestes du kit, 3 épinglages max, pause obligatoire), et la bibliothèque : `templates/elements/README.md`, `templates/fonds-hero/README.md`, `templates/elements-3d/` (en cours de remplissage par d'autres agents : tu peux t'en inspirer ou écrire ta propre scène dans ton dossier).

## Règles

- Ton dossier : `skills/maquette/templates/exemples/<ton-dossier>/` uniquement. Fichiers attendus comme les autres exemples : `index.html`, CSS (Tailwind v4 compilé comme les exemples, ou CSS écrit à la main), `gestes.js` (copie du kit), tes scripts, `images/`, `brief.md`, `NOTES.md`, `medias-a-generer.md`, `captures/`.
- **Marque, personnes, adresses, chiffres, avis, prix inventés** et signalés comme fictifs dans le pied de page. Aucun formulaire n'envoie quoi que ce soit.
- **Aucune génération payante, aucun téléchargement d'image depuis le web.** Visuels : faits en code (Three.js/WebGL, canvas, SVG, CSS), réutilisation cohérente d'images déjà présentes dans `templates/exemples/*/images` (créditées comme dans leurs pages), et emplacements prêts à générer plus tard (`data-prompt` + `data-ratio`, liste dans `medias-a-generer.md`) avec un visuel de remplacement soigné (jamais une boîte grise vide). Le visuel signature doit être fait en code et être spectaculaire.
- Hero fort, **3D ou défilement signature** (moment signature unique), 1 seul fond animé, pause visible pour tout ce qui bouge seul, mouvement réduit respecté, repli si WebGL absent. Accessibilité AA. Typo et palette propres à la marque (pas Inter, pas Fraunces, pas de fond crème réflexe).
- Ne pas toucher `vitrine/index.html`, `exemples/b2c-petille/`, les autres exemples, ni les README d'index. Ne rien commiter.
- Node : `/opt/homebrew/bin/node` ; Playwright : `/Users/antoinevigneau/.dev-browser/node_modules/playwright-core`, Chrome `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`, lancé avec Bash `dangerouslyDisableSandbox: true`.

## Vérification (obligatoire avant de rendre)

Script Playwright à toi : à **1440, 768, 375 et 360 px** — 0 erreur console, 0 débordement horizontal, captures pleine page + captures en cours de défilement du moment signature, rangées dans `captures/`. Mouvement réduit : rien ne bouge seul, pas d'épinglage forcé. Sans WebGL (`--disable-webgl`) : la page reste complète. Compte les mots (500 à 800) et les sections (10 à 13). **Regarde tes captures** avec l'outil Read et corrige tout ce qui est faible, vide, illisible ou générique avant de rendre.

## Rendu

1. Le site dans son dossier. 2. Un prompt « refaire ce site » au format exact des entrées de `/…/scratch-2026-11-03-fbd9f4/vitrine/prompts.json` (lis ce fichier), écrit dans `<ton-dossier>/prompt-vitrine.json` (objet `{"<cle>": {"nom": …, "prompt": …}}`) — ne modifie pas `vitrine/prompts.json` lui-même. 3. En réponse : composition, sections (liste), mots, éléments de la bibliothèque utilisés, moment signature, résultats de vérification, limites connues.
