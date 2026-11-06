# Personnage vivant

Un personnage en vidéo détourée, dans le hero : il respire et cligne des yeux, et **seuls ses iris suivent la souris**. Le blanc de l'oeil, les paupières, la tête et le cou ne bougent pas.

Fichiers : `prep.py` (prépare la vidéo), `vivant.js` (la lit dans la page, sans dépendance). Ils restent dans le plugin : `${CLAUDE_PLUGIN_ROOT}/skills/maquette/templates/prototype/personnage-vivant/`. Lancer les commandes ci-dessous depuis le dossier du site (`projet-site/site/`), avec ce chemin devant `prep.py`, et copier `vivant.js` à côté de la page.

## Quand NE PAS l'utiliser

- Le site parle d'un lieu ou d'un geste : vidéo pilotée au défilement.
- Le site vend un objet : 3D ou rotation en images.
- **Jamais de faux membre d'équipe.** Le personnage est un guide, un agent, une mascotte, annoncé comme tel. Pas un employé inventé, pas un faux fondateur. S'il ressemble à une vraie personne, la page doit dire que c'est une image créée.
- **Jamais le même personnage d'un site à l'autre** : on en crée un pour chaque client, dans le style de sa marque.

Autres méthodes essayées, écartées : tête 3D (regard inquiétant de près), plusieurs poses animées (le cou se décolle, les têtes diffèrent), glissement de tout l'oeil (l'utilisateur veut l'iris seul).

## Recette

**fal requis pour cette recette ; sans fal, utiliser la vidéo au défilement ou l'image fixe.** OpenRouter liste bien `bytedance/seedance-2.0-fast` (catalogue lu le 06/11/2026), mais ni ses réglages ni son passage dans `prep.py` n'ont été testés.

Coût estimé : **environ 2 $ par personnage** (image 0,10 à 0,20 $, vidéo Seedance 2.0 Fast de 8 s environ 1,95 $). Temps : non mesuré de bout en bout ; le script lui-même tourne en moins d'une minute par passage (23 s et 18 s sur la vidéo de test), l'essentiel va au réglage des yeux.

### 1. L'image, sur fond vert

Via fal, `fal-ai/nano-banana-2`, 3:4, 1K. Partir de ce prompt, en décrivant le personnage et son style :

> Waist-up portrait of [le personnage, ses vêtements, son style : photorealistic ou 3D animated film style], facing the camera perfectly straight, head level, centered in frame, looking directly into the lens with both eyes wide open and clearly visible irises, closed-mouth gentle smile, no glasses, arms relaxed at the sides. Head in the upper third of the frame, with space above the hair. Solid flat pure chroma key green background #00B140, evenly lit, no shadow on the background, no green on the clothing, clean edges around hair.

Vérifier : yeux grands ouverts et bien visibles, regard droit, pas de vert sur les habits, pas de lunettes. Une frange sur les yeux ou de grosses boucles d'oreilles vertes ne passeront pas.

### 2. La vidéo

`bytedance/seedance-2.0/fast/image-to-video` : `image_url` et `end_image_url` = la même image, `duration` "8" (une chaîne, c'est ce qu'attend le modèle), `resolution` 720p, `aspect_ratio` 3:4, `generate_audio` false, `bitrate_mode` high, `codec` H264.

> Continuous subtle idle looping motion that returns to the starting pose, no jump cut. The same [character] breathes calmly, chest and shoulders rise and fall gently, clothing moves softly. Blinks once, quickly and naturally, in the middle. Head stays perfectly still and centered, face and neck unchanged, eyes looking straight at the camera, same gentle smile, mouth closed, no head turn, no nod. Fixed camera, no zoom, no pan. Uniform flat green background, unchanged lighting.

### 3. La préparation

```bash
python3 prep.py source.mp4 --sortie medias/guide
```

Il faut python3, numpy, opencv-python, pillow et ffmpeg ; le script dit ce qui manque.

### 4. Régler les yeux : l'étape qui fait tout

Ouvrir `medias/guide/yeux_ctl.png`. Le vert doit suivre la paupière haute, le jaune la paupière basse, le magenta le tour de l'iris. **Le repérage automatique place le centre de l'oeil, pas sa forme** : il faut presque toujours corriger `medias/guide/oeils.json`, en pixels de la vidéo :

```json
[{"coins":[342.5,285,390.5,290],"haut":270,"bas":293.7,"iris":[369.1,282.3,11.9]},
 {"coins":[448,290.5,495.3,285.4],"haut":270.5,"bas":294.7,"iris":[468.4,283.3,11.9]}]
```

`coins` : x et y des deux coins de l'oeil, aux pointes du blanc et non au bout des cils. `haut`, `bas` : hauteur des paupières au milieu. `iris` : centre et rayon, y compris la partie cachée sous la paupière. Corriger, puis relancer. Compter 2 essais.

```bash
python3 prep.py source.mp4 --sortie medias/guide --oeils medias/guide/oeils.json
```

### 5. Lire les alertes

| Alerte | Quoi faire |
|---|---|
| La tête bouge de N px | regénérer la vidéo : au-delà de 12 % de l'écart entre les yeux, le cadre flotte |
| Aucun clignement vu | acceptable, ou regénérer |
| Calques effacés sur plus d'un quart de la vidéo | forme d'oeil mal posée |
| Coins du haut pas transparents | fond pas uni : regénérer l'image, ou régler `--cle-bas` et `--cle-haut` |
| Le personnage occupe N % de l'image | détourage suspect : regarder `planche.png` |

`planche.png` montre le détourage sur 3 fonds et le clignement. Regarder les cheveux et les oreilles.

### 6. Dans la page

```html
<canvas id="guide" style="height:90vh"></canvas>
<script src="vivant.js"></script>
<script>
  const guide = Vivant(document.getElementById('guide'), {
    video: 'medias/guide/personnage.mp4', yeux: 'medias/guide/yeux.json', pose: 'medias/guide/pose.webp',
    alt: 'Sam, votre guide'
  });
  // bouton pause du hero : guide.pause(); guide.reprendre();
</script>
```

Ne donner au canevas qu'une hauteur ou une largeur : le script pose le ratio. Pour une scène qui déplace le personnage, garder le canevas seul en `transform` : `vivant.js` relit sa position à chaque image.

## Ce que le kit garantit

- **Regard** : rien ne bouge tant que la souris n'a pas bougé. Ensuite les iris la suivent tout le temps, défilement compris : la position des yeux à l'écran est relue à chaque image.
- **Amplitude** : ±8 px en x et ±3,5 px en y pour un iris de 13 px de rayon sur 834×1112, soit 0,62 et 0,27 fois le rayon. `prep.py` la calcule, avec l'ombre de la paupière (0,25 fois le rayon).
- **Clignement** : c'est celui de la vidéo. Trop lent, il est accéléré à 0,42 s au plus (`--clignement-max`). Les calques s'effacent dès que l'oeil change de forme.
- **Boucle** : fondu des 16 dernières images vers la première.
- **Replis** : image fixe (`pose.webp`) sans WebGL2, en mouvement réduit et au doigt. Pause hors écran et onglet caché.

## Contrôles avant de présenter

1. Sur un écran réel, souris à gauche, à droite, en haut, en bas, puis en défilant : l'iris suit, le blanc ne bouge pas.
2. Recharger sans toucher à la souris : aucun mouvement des yeux, hors clignement.
3. Attendre le clignement : pas de saut de l'iris, pas de trace.
4. Fond réel de la page : pas de liseré vert autour des cheveux.
5. Mouvement réduit et téléphone : image fixe, propre.

## Limites connues

- Testé sur 3 personnages (2 en 3D, 1 photo réaliste), en rendu logiciel. La fluidité sur une vraie carte graphique reste à voir.
- Sur photo réaliste, l'oeil est petit et l'écart à la vidéo se voit plus : bien régler la forme.
- La vidéo fait 834×1112 : un peu douce sur écran Retina si le personnage occupe tout l'écran.
- Personnage de face seulement. Lunettes, oeil caché par les cheveux, regard de côté : non testés, à éviter.
