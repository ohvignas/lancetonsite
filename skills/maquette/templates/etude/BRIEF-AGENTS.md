# Brief commun aux agents de la bibliothèque (à lire en entier)

Dossier racine du kit : `atelier/skills/maquette/templates/` (chemin absolu : `/Users/antoinevigneau/Library/Application Support/Claude/scratch-workspaces/25bcb6e3-3306-454a-a769-79fd1fb1860d/16298988-3e01-40a8-9236-6c60ffb4f0b7/scratch-2026-11-03-fbd9f4/atelier/skills/maquette/templates/`). Plugin « Lance ton site », tout en **français avec accents**.

## Garde-fou droit d'auteur (non négociable)

- On relève **techniques et style**, puis on écrit **notre propre code, nos propres textes, nos propres prompts**. Jamais de recopie en bloc de code, de prompt ni d'asset d'un site.
- Un prompt affiché en libre accès peut être **cité comme référence** (≤ 15 mots, source donnée) ; notre prompt est toujours réécrit.
- Page derrière connexion ou paiement : **ne pas contourner**, la noter et passer.
- Code open source : reprise permise **en respectant sa licence**, licence et lien cités dans la fiche (et `NOTICE` en commentaire d'en-tête de la démo si la licence l'exige). Vérifier la licence sur le dépôt (fichier LICENSE), pas de mémoire.
- **Aucune génération payante** (images, vidéo, API facturée). Médias : réutiliser ceux de `exemples/*/images|videos` ou produire en code.
- Ne rien commiter, ne rien pousser. Ne pas toucher `vitrine/index.html` ni `exemples/b2c-petille/`. Ne pas modifier les README d'index (`elements/README.md`, `fonds-hero/README.md`, `elements-3d/README.md`), ni `motionsites-etude.md` : la session principale fusionne. Ne toucher **que tes propres fichiers**.

## Format d'un élément (voir `elements/verre-liquide.html` + `.md` et `fonds-hero/trame-points.html` + `.md` comme modèles)

- Démo HTML autonome : `<link rel="icon" href="data:,">`, bloc CSS « à copier » séparé du bloc « Démo », textes fictifs français crédibles (métier réel), `<title>Élément — …</title>`, meta description. Bibliothèques par CDN **version exacte** (jsdelivr `…@x.y.z`), ou importmap ESM pour Three.js (`three@0.170.0`).
- **Accessibilité** : clavier, focus visible, cibles 44 px, contraste ≥ 4,5:1, `aria-hidden` sur le décoratif. Ce qui bouge seul > 5 s : bouton pause visible + arrêt hors écran (`IntersectionObserver`) et onglet caché.
- **Mouvement réduit** (`prefers-reduced-motion: reduce`) : image fixe ou état final, rien ne bouge seul.
- **3D / WebGL** : repli si WebGL absent (image/affiche ou version CSS) ; densité de pixels plafonnée à 2 ; boucle stoppée hors écran.
- Fiche `.md` du même nom, sections : titre, ligne « Élément · démo · captures », Technique, Poids (octets et gzip : `wc -c`, `gzip -c | wc -c`), Inspiré de (source + URL), Licence (si code tiers), Quand l'utiliser, Brancher dans une maquette, Variables (tableau), **Prompt pour le régénérer** (prompt prêt à coller, à la 2e personne : « Écris… »), Accessibilité, Mouvement réduit, Performance.

## Vérification obligatoire (Playwright, Chrome réel)

Serveur local déjà lancé : `http://localhost:4320/` sert la racine du projet (le dossier qui contient `atelier/`). Node : utiliser `/opt/homebrew/bin/node` (la commande `node` du shell boucle). Chrome doit tourner **hors bac à sable** (Bash avec `dangerouslyDisableSandbox: true`).

```
cd <racine du kit> && PW=/Users/antoinevigneau/.dev-browser/node_modules/playwright-core CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" /opt/homebrew/bin/node verifier-elements.cjs http://localhost:4320/atelier/skills/maquette/templates <filtre-nom-de-fichier>
```

Doit donner `OK` : 0 erreur console, pas de débordement à 1440 et 375, deux captures identiques en mouvement réduit. Pour la 3D, relancer aussi avec `SANS_WEBGL=1` devant : 0 erreur et un repli visible. Le serveur coupe parfois une connexion sous charge (`ERR_CONNECTION_RESET`) : relancer la démo seule. **Regarder les captures** (`<dossier>/captures/<nom>-1440.png`, `-375.png`) avec l'outil Read et corriger ce qui est laid, illisible ou vide.

## Rendu final attendu de chaque agent

1. Une section d'étude dans `etude/<source>.md` : pages visitées (URL, accès libre / connexion / payant), techniques et style relevés, tableau « repéré → technique → notre fichier », prompts libres cités en référence (court, sourcé), ce qui n'a pas été retenu et pourquoi.
2. Les fichiers créés. 3. En réponse : la liste des éléments (fichier, une ligne de description, poids gzip, statut de vérification), et ce qui reste à faire.

## Style des démos (ajout)

Pas de surtitre en capitales espacées au-dessus du h1 (forme de hero interdite par `SKILL.md`), pas de Fraunces / Inter / Roboto / Geist / Space Grotesk / Plus Jakarta, pas de titre géant en serif italique, pas de fond crème réflexe. Choisir une typo et une palette propres au métier de la démo.

## Mode aperçu (obligatoire pour chaque démo, ajout)

La galerie montre chaque élément **seul**, sans texte d'explication. Chaque démo a deux modes :

- **normal** : la démo avec ses explications ;
- **aperçu** (`<nom>.html?apercu`) : l'élément seul, plein cadre, au mieux de lui-même ; plus aucun paragraphe explicatif, mention « Démo », légende technique, consigne clavier ni crédit. Le contenu fictif réaliste du composant reste (titre du hero, textes du bandeau, questions de la FAQ…).

Mise en œuvre, à copier tel quel dans le `<head>` :

```html
<script>/* Mode aperçu (?apercu) : masque les explications pour la galerie */ if (/[?&]apercu\b/.test(location.search)) document.documentElement.classList.add("apercu");</script>
<style>.apercu [data-explication] { display: none !important; }</style>
```

Tout texte explicatif va dans un conteneur `data-explication` (attribut sur l'élément lui-même ou sur un enveloppant). Ajuster si besoin la mise en page avec `.apercu …` (marges réduites, élément centré qui remplit le cadre). Les boutons de pause et les contrôles d'accessibilité **restent** visibles en aperçu.

Le vérificateur fait maintenant ses captures en mode aperçu (`?apercu`) et contrôle aussi le mode normal (erreurs, débordement). Chaque fiche `.md` porte, juste sous le titre, une ligne `apercu: <nom>.html?apercu`.
