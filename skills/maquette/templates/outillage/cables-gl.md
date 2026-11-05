# cables.gl — évaluation

- **Ce que c'est** : un éditeur visuel **par nœuds** (des « ops » reliées par des câbles) pour créer des scènes WebGL/WebGPU interactives, du son et des visuels génératifs, dans le navigateur (https://cables.gl, compte requis) ou en application de bureau (« cables standalone », Electron). Développé par undev (Berlin).
- **Dépôts** : https://github.com/cables-gl/cables (moteur + ops), https://github.com/cables-gl/cables_electron (standalone), https://github.com/cables-gl/cables-cli (export en ligne de commande).
- **Version** : le moteur n'est pas publié sur npm ; on utilise la version en ligne ou le standalone (versions datées, voir https://cables.gl/changelog).

## Licence (vérifiée le 5 novembre 2026)

- Dépôt `cables` : **pas de fichier LICENSE à la racine** (l'API GitHub renvoie « license: null ») ; son `package.json` déclare **MIT**.
- Dépôt `cables_electron` : fichier de licence reconnu par GitHub comme **MIT**.
- FAQ officielle (https://cables.gl/docs/faq/licence_payment/userlicence/userlicence) : tout ce qui sert à faire tourner un patch est sous MIT ; ce qu'on crée nous appartient ; on fait ce qu'on veut des patchs exportés. En publiant un patch **sur cables.gl**, on choisit sa licence (CC, domaine public ou tous droits réservés).
- Conséquence : un patch exporté peut aller sur le site d'un client ; garder la mention MIT du runtime dans le JS exporté.

## Export

Dans la boîte de dialogue d'export (doc : https://cables.gl/docs/4_export_embed/dev_embed/export_zip/export_zip) :
- **Download HTML** : un zip avec un `index.html` d'exemple, le JS du patch (un seul fichier minifié ou plusieurs), les assets (automatique / tous / aucun), option sans sous-dossiers, minification du GLSL, source maps. À déposer tel quel sur n'importe quel hébergement statique : c'est l'option qui nous concerne.
- Autres cibles : iframe hébergée par cables.gl, GitHub Pages, Netlify, exécutable de bureau, « patch complet » réimportable dans le standalone, et `cables-cli` pour automatiser l'export.
- Le patch exporté expose des **variables** et des **déclencheurs** pilotables depuis le JS de la page (ex. passer la progression de défilement ou une couleur du design system).

## Verdict pour Lance ton site : **utile seulement à la marge**

Pour :
- Très rapide pour **explorer** un fond génératif (post-traitements, bruit, particules, réaction au son) sans écrire de shader ; énorme bibliothèque d'ops.
- Export statique propre, licence permissive, œuvre qui reste à l'utilisateur.

Contre (et ça pèse plus pour nous) :
- **Nous ne pouvons pas le piloter** : l'édition se fait à la souris dans une interface graphique ; Claude ne peut ni écrire ni relire un patch comme du code. Le plugin repose sur du code que l'on génère, vérifie et corrige.
- **Poids** : le runtime cables + les ops d'un patch dépassent vite une centaine de Ko gzip, contre 2 à 15 Ko pour nos fonds WebGL écrits à la main (`fonds-hero/`).
- Accessibilité et règles du kit (pause visible, mouvement réduit, arrêt hors écran, repli sans WebGL, densité ≤ 2) à **rebrancher à la main** autour du canvas exporté.
- Compte en ligne requis pour l'éditeur web (le standalone évite ça).

**Quand s'en servir** : l'utilisateur (ou son graphiste) sait déjà utiliser cables et livre un patch ; ou on veut prototyper vite une idée de fond avant de la réécrire en shader. On encapsule alors l'export dans le gabarit de `fonds-hero/` (pause, `IntersectionObserver`, `prefers-reduced-motion`, affiche de repli) et on mesure le poids.

**Quand ne pas s'en servir** : par défaut. Pour un fond animé, écrire le shader (Three.js ou WebGL nu, voir `fonds-hero/`) ou rendre une vidéo (`remotion.md`).
