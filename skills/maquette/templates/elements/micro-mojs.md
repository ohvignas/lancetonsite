# « J'aime » qui éclate (mo.js)

apercu: micro-mojs.html?apercu

Élément · démo : [`micro-mojs.html`](micro-mojs.html) · captures : `captures/micro-mojs-1440.png`, `-375.png`, `-1440-reduit.png`

- **Technique** : mo.js. Au clic, le cœur se remplit en CSS (petit « pop » en `@keyframes`) et trois effets mo.js partent du cœur : un anneau qui s'ouvre (`Shape`), une couronne de points bicolores et une couronne de traits (`Burst`). La pastille « Nouveau » pétille : neuf bulles ambre et vert sapin cerclées de blanc partent de son bord haut et montent en éventail (`Burst` sur 160°, `rotate: -80` pour le centrer vers le haut ; tailles de 3 à 6 px et durées tirées au hasard avec `rand()`, regénérées à chaque fois par `.generate()` ; la bulle garde sa taille et ne rétrécit qu'en fin de course), une fois à l'entrée dans l'écran puis au survol de la carte. mo.js est chargé en `async` et les clics sont branchés sans l'attendre.
- **Paquet** : `@mojs/core@1.7.1` (`dist/mo.umd.js`, global `mojs`), en `<script async>`. Attention : en mo.js 1.x, c'est `rotate` qui tourne un `Burst` ; l'ancien `angle` des exemples en ligne est ignoré sans erreur.
- **Poids** : démo 11,7 Ko (4,5 Ko gzip). Bibliothèque : 116 Ko (31 Ko gzip).
- **Inspiré de** : démonstrations de `Burst` dans la documentation de mo.js. Code et textes écrits par nous.

## Licence

mo.js : MIT, © Oleg Solomka, Xavier Foucrier, Jonas Sandstedt — https://github.com/mojs/mojs/blob/main/LICENSE.md (vérifiée sur le dépôt le 5 novembre 2026). Impose de garder la mention de copyright et la licence avec le code redistribué : mention en en-tête de la démo. Note : le dépôt est peu actif (dernière version 1.7.1) ; la bibliothèque est stable mais ne recevra probablement pas de nouveautés.

## Quand l'utiliser

Bouton « J'aime », « Garder », « Ajouter aux favoris » ; pastille « Nouveau » ou « Dernières pièces ». Effet de récompense ponctuel : un seul éclat par action, jamais en boucle.

## Brancher dans une maquette

1. Copier le `<script src>` de mo.js, le bloc « à copier », un bouton `.jaime` (avec `data-compte`), la région `#annonce` et le script.
2. Brancher l'enregistrement réel (favoris) dans l'écouteur de clic, là où `aria-pressed` change. Lire `window.mojs` **au moment du clic** et ne jamais attendre la bibliothèque pour brancher les clics : CDN lent, le bouton doit marquer quand même.
3. Ne pas mettre `overflow: hidden` sur la carte qui porte la pastille : les bulles en sortent. Arrondir l'image elle-même (`border-radius: 20px 20px 0 0`).
4. Chaque bouton porte le nom de sa pièce, pour qu'on sache au clavier et au lecteur d'écran ce qu'on aime : `J'aime<span class="sr-only"> Bol Craie,</span> <span class="jaime__compte">127</span>` → nom accessible « J'aime Bol Craie, 127 », qui commence par le texte visible.
5. Annonce : une tournure sans accord (« Ajouté à vos pièces aimées : Tasse Galet »), juste quel que soit le genre du nom de la pièce.
6. Couleurs des éclats : `--jaime-accent` et `--jaime-eclat-2`.

## Variables

| Variable | Défaut | Rôle |
|---|---|---|
| `--jaime-accent` | `#b3261e` | cœur plein, anneau, points |
| `--jaime-eclat-2` | `#e8a33d` | seconde couleur d'éclats |
| `--pastille-fond` | `#1e4d3a` | fond de la pastille, une des deux couleurs des bulles (l'autre : `--jaime-eclat-2`) |
| `count`, `radius`, `degree` des `Burst` du cœur | points 9 / 12→40 / 250°, traits 5 / 8→34 / 220° | densité, portée et ouverture des éclats ; `rotate` laisse le côté du texte vide |

## Prompt pour le régénérer

> Écris en HTML autonome un bouton « J'aime » avec mo.js 1.7.1 (UMD depuis jsdelivr, en `async`). Branche les clics sans attendre mo.js et lis `window.mojs` au moment du clic. Le bouton est un vrai `<button aria-pressed>` avec un cœur SVG, le nom de la pièce en texte masqué (nom accessible « J'aime Bol Craie, 127 ») et un compteur ; au clic, change l'état, le compteur et une annonce sans accord de genre (« Ajouté à vos pièces aimées : Tasse Galet (89). ») dans une région `aria-live="polite"`, remplis le cœur en CSS avec un petit rebond, puis, seulement si mo.js est chargé et que le visiteur n'a pas demandé moins d'animations, fais partir du cœur un anneau qui s'ouvre sans dépasser 14 px (`mojs.Shape`) et deux couronnes (`mojs.Burst`) de points bicolores de 3,5 px et de traits, en éventail de 250° tourné pour laisser vide le côté du texte : rien ne passe sur « J'aime ». Crée les effets au premier clic et rejoue-les ensuite avec `.replay()`. Ajoute une pastille « Nouveau » sur la photo qui pétille : un `Burst` de 9 bulles de 3 à 6 px, ambre et vert sapin cerclées de blanc, qui partent du bord haut en éventail vers le haut (`rotate: -80`, `degree: 160`), taille fixe et `scale` 1 → 0 en fin de course, durées aléatoires ; la carte n'a pas d'`overflow: hidden` ; regénéré à chaque fois, une fois quand elle entre dans l'écran puis au survol de la carte. Marque les calques de mo.js `aria-hidden`.

## Accessibilité

Bouton natif 44 px, `aria-pressed`, focus visible, nom accessible distinct par pièce (« J'aime Bol Craie, 127 », « J'aime Tasse Galet, 88 »…), annonce polie (« Ajouté à vos pièces aimées : Tasse Galet (89). », « Retiré de vos pièces aimées : Tasse Galet. » : tournure sans accord, juste pour un bol comme pour une assiette). Les calques créés par mo.js sont `aria-hidden` et ne captent pas le pointeur. La pastille est un simple texte, non focalisable.

## Mouvement réduit

Aucun éclat ni bulle : le cœur se remplit instantanément, sans rebond. Même chose sans mo.js et pendant qu'il charge. Vérifié le 5 novembre 2026 : CDN retardé de 6 s, clic à 0,3 s → `aria-pressed`, compteur et annonce à jour tout de suite.

## Performance

Effets créés à la demande (premier clic) puis réutilisés ; aucune boucle permanente. Les bulles de la pastille ne partent qu'une fois à l'entrée dans l'écran.
