# Brief correcteur — bibliothèque, après tour 1 persona

Racine du kit : `/Users/antoinevigneau/Library/Application Support/Claude/scratch-workspaces/25bcb6e3-3306-454a-a769-79fd1fb1860d/16298988-3e01-40a8-9236-6c60ffb4f0b7/scratch-2026-11-03-fbd9f4/atelier/skills/maquette/templates/`

1. Lis `etude/BRIEF-AGENTS.md` (format d'un élément, style, mode aperçu, droit d'auteur) puis le rapport persona de ton lot `persona-biblio/lot-<N>.md`.
2. Applique **toutes les corrections gratuites** proposées pour chaque élément de ton lot (code, CSS, textes, fiche `.md` : section Licence si absente, chiffres de la fiche alignés sur le code, poids à jour). Priorité aux éléments notés sous 85. Garde le mode aperçu, la pause, le mouvement réduit, le repli sans WebGL.
3. **Aucune génération payante** (ni image, ni vidéo, ni audio par API). Une voix peut passer par `speechSynthesis` du navigateur (gratuit) si c'est utile. Médias : réutiliser `exemples/*/images` ou produire en code. Note dans ta réponse les médias qu'une génération apporterait (sujet, format, coût estimé) sans les lancer.
4. Pas de nom réel d'institution ou d'entreprise dans les démos : marques fictives.
5. Vérifie chaque élément corrigé :
   `cd <racine du kit> && PW=/Users/antoinevigneau/.dev-browser/node_modules/playwright-core CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" /opt/homebrew/bin/node verifier-elements.cjs http://127.0.0.1:4339/atelier/skills/maquette/templates <nom>` (Bash avec dangerouslyDisableSandbox: true ; ajoute `SANS_WEBGL=1 DOSSIERS=elements-3d` devant pour la 3D). Utilise le port **4339** (gère les requêtes Range, utiles pour la vidéo), pas 4320. Doit dire OK. **Regarde** les captures `<dossier>/captures/<nom>-1440.png` et `-375.png` avec Read.
6. Ne touche qu'aux fichiers des éléments de ton lot (html, md, captures). Pas les README d'index, pas `persona-biblio/lot-*.md`, rien d'autre. Ne commite rien.

Réponse : par élément, les corrections faites (une ligne chacune), le statut du vérificateur, et ce qui reste (client ou génération).
