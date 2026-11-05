# Carte en métal flottante

apercu: carte-metal.html?apercu

Élément 3D · démo : [`carte-metal.html`](carte-metal.html) · captures : `captures/carte-metal-1440.png`, `-375.png`, `-1440-reduit.png`, `-1440-sans-webgl.png`, `-375-sans-webgl.png`

- **Technique** : Three.js 0.170 (importmap ESM jsdelivr) : `ExtrudeGeometry` d'un rectangle à coins arrondis au format 85,6 × 54 avec biseau, `MeshPhysicalMaterial` (métal, vernis `clearcoat`, `iridescence`), face gravée dans une `CanvasTexture` 2048 px (brossé, puce, pictogramme sans contact, marque, numéro masqué), dessinée après `document.fonts.load()` de chaque police ; la même gravure, en blanc sur noir légèrement floutée, sert de `bumpMap` (`bumpScale` .6) : les lettres accrochent la lumière comme une vraie gravure, reflets d'un studio (`RoomEnvironment` + `PMREMGenerator`), ombre au sol en disque flou ; repli et affiche en CSS 3D
- **Poids** : démo 15 142 octets (6 043 gzip) + Three.js (≈ 170 Ko gzip, cache CDN partagé) + `RoomEnvironment.js` (≈ 2 Ko)
- **Inspiré de** : « Amesi » sur https://sceneai.art/landing-pages (« This Card is Digital » : une carte bancaire qui flotte et tourne lentement). Voir `../etude/sceneai.md`. Code, carte et textes écrits par nous ; aucune marque de réseau de paiement.

## Licence

- **Three.js** (et `RoomEnvironment.js`, dans `examples/jsm`) : MIT — https://github.com/mrdoob/three.js/blob/dev/LICENSE. Chargé depuis le CDN, non modifié.
- **Notre code**, la gravure et les textes : originaux, libres d'usage dans le plugin. Polices IBM Plex Sans et Plex Mono : SIL Open Font License 1.1.

## Quand l'utiliser

Banque, néobanque, carte de fidélité, carte cadeau, abonnement premium, carte de membre d'un club : dès qu'un objet plat « précieux » est le produit. Dans une colonne de hero, à côté du titre.

## Brancher dans une maquette

1. Copier le `<div class="carte3d">` (repli CSS + bouton pause), le bloc CSS, l'importmap et le module.
2. Changer la gravure dans le bloc « Gravure de la face » : nom de marque, libellé, 4 derniers chiffres, titulaire fictif. Reporter les mêmes textes dans le repli CSS (les deux doivent montrer la même carte). Si la police change, l'ajouter à la liste `document.fonts.load(...)`, sinon le canvas grave en police de secours.
3. Pas de promesse tarifaire absolue dans le titre (« zéro frais ») : un service juridique bancaire la fera retirer.
4. Couleur du métal : `--carte-metal`. Pour une carte noire : `#1b1d24` et `iridescence: .15`.

## Variables

| Variable | Défaut | Rôle |
|---|---|---|
| `--carte-metal` | `#2c3a8c` | teinte du métal (dégradé de la face et du repli) |
| `--carte-encre` | `#e9ecff` | gravure |
| `--carte-fond` | `#e9ecf3` | fond de la démo |

Dans le JS : `metalness`, `roughness`, `iridescence` du matériau ; amplitude du flottement (`.12`), du balancement (`.35`) et de l'inclinaison au pointeur (`.9`, `.6`).

## Prompt pour le régénérer

> Écris en Three.js 0.170 (importmap ESM jsdelivr) une carte de paiement en métal qui flotte dans une colonne de hero. Géométrie : `ExtrudeGeometry` d'un rectangle aux coins arrondis au format 85,6 × 54, faible épaisseur, petit biseau, centrée. Face : `MeshPhysicalMaterial` métallique (`metalness` .9, `roughness` .22) avec vernis et irisation légère (.3), sa `map` est une `CanvasTexture` dessinée en code (2048 px de large ; dégradé de la couleur choisie, brossé en traits fins alternés clair et sombre d'opacité 0 à 0,10, puce dorée, pictogramme sans contact en quatre arcs, nom de la banque, numéro masqué en chasse fixe, titulaire, date ; attends `document.fonts.load()` pour chaque police avant de dessiner) ; redessine la gravure en blanc sur noir, légèrement floutée, dans un second canvas utilisé comme `bumpMap` (`bumpScale` .6) ; anisotropie au maximum du GPU ; ramène les UV de la forme vers [0, 1] avec `repeat` et `offset`. Tranche en acier. Reflets avec `RoomEnvironment` passé au `PMREMGenerator`. Ombre douce au sol : un plan avec un dégradé radial. La carte flotte (sinus), se balance et s'incline vers le pointeur (valeurs lissées). Une carte en CSS 3D, avec exactement la même gravure (pictogramme sans contact compris) et la même inclinaison que la carte 3D, sert d'affiche et de repli si WebGL manque. Sous 820 px, la carte passe au-dessus du titre, plus petite. Bouton pause, rendu stoppé hors écran et onglet caché, densité de pixels plafonnée à 2, pose fixe en mouvement réduit.

## Accessibilité

Le canvas est en `aria-hidden` ; une phrase masquée visuellement décrit l'illustration. Titre bleu nuit `#16204f` sur fond gris clair (14:1). Bouton pause de 44 px avec libellé, masqué en mouvement réduit (rien ne bouge alors).

## Mouvement réduit

Pose fixe (inclinaison de trois quarts), rendu une fois, pointeur ignoré. Vérifié avec Playwright : deux captures identiques. Sans WebGL (`SANS_WEBGL=1`) : 0 erreur, la carte CSS reste visible.

## Performance

Un seul maillage (≈ 3 000 triangles), une texture 2048 × 1290 (≈ 10 Mo de mémoire GPU, négligeable en réseau : dessinée en code). Boucle stoppée hors écran, onglet caché et en pause. Three.js chargé en `import()` dynamique : la page s'affiche avant, avec la carte CSS.
