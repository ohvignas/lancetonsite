# Animer le site avec des objets faits dans Blender

Un objet modélisé une fois dans Blender sert trois fois : la photo du catalogue, l'animation
de la page, et la 3D en direct. Le choix dépend de ce que la section doit faire.

| Besoin de la section | Technique | Ce qu'on livre | Geste du kit |
|---|---|---|---|
| L'objet tourne, s'ouvre, s'éclate **au défilement**, avec un rendu photo | **séquence d'images rendue dans Blender** (façon Apple) | 48 à 96 WebP numérotés `f-0001.webp`… | `canvas[data-sequence="…/f-{i}.webp"][data-frames="72"]`, dans `data-steps` |
| Boucle courte en fond (hero, bande) | **vidéo rendue dans Blender** | MP4 + WebM + affiche | `<video autoplay muted loop playsinline poster>` ou `data-video-scrub` |
| L'objet suit la souris, se manipule, change de couleur | **3D en direct** : `.glb` exporté + three.js | `modeles/objet.glb` (< 500 Ko) | `GLTFLoader` (modèle : `commerce-flacon/outils/flacon3d.js`) ou `<model-viewer data-model-scroll>` |
| Pièces qui s'assemblent, piloté au défilement, mais interactif | **animation glTF** (clés exportées) + `AnimationMixer` piloté par la progression | `.glb` avec animations | `mixer.setTime(progression * duree)` sur l'événement « progression » |

**Par défaut : la séquence d'images.** Elle garde la qualité de la photo (verre, liquide,
reflets), ne demande pas WebGL, pèse peu en WebP, et marche partout. La 3D en direct vient
en plus quand l'interaction apporte quelque chose (choisir une teinte, tourner l'objet).

## 1. Séquence d'images (tour, éclaté, assemblage)

Dans le script de l'objet, après le studio (`lib3d.py`) :

```python
p = pivot([verre, liquide, etiquette, bague, bouchon])     # on anime le vide, les pièces suivent
tour_complet(p, images=72, tours=1.0)                       # finit FACE AVANT (règle niveau-agence § 2 bis)
# ou : eclate([bouchon, bague], [(0, 0, 1.2), (0, 0, 0.5)], images=72)
rendre_sequence("rendu/tour", largeur=960, echantillons=64)   # préréglage léger : rebonds réduits, scène persistante
```

Pour une animation plus riche que le tour (modèle : `commerce-flacon/outils/blender/sequences.py`) :
`cle()` pose une clé sur n'importe quelle propriété, `lineaire()` rend la vitesse constante (la page fait
l'accélération), `animer_jus()` change la teinte d'un liquide, `etiquettes_successives()` change l'image d'une
étiquette (au dos, le fondu ne se voit pas), `fondu()` et `visible()` font apparaître ou disparaître des pièces
(un objet entier remplacé par ses morceaux au début d'un éclaté), `travelling()` déplace l'appareil, `gros_plan()`
cadre un détail. `rendre_images(dossier, [1, 37, 73])` rend seulement les images de contrôle.
Une animation qui se défait (éclaté puis retour) ne se rend qu'à l'aller : la page la rejoue à l'envers.

Puis :

```bash
bash ${CLAUDE_PLUGIN_ROOT}/skills/objets-3d/scripts/sequence.sh 07-medias/3d/rendus/tour <site>/images/tour 960
```

Le script convertit les PNG en WebP (`f-0001.webp`…), fait une vidéo MP4 + WebM et une
affiche (la **dernière** image, face avant). Dans la page :

```html
<section data-steps="50">
  <div data-step-media>
    <canvas data-sequence="images/tour/f-{i}.webp" data-frames="72" width="960" height="1200"
            role="img" aria-label="Le flacon tourne et s'arrête face à vous"></canvas>
  </div>
  …
</section>
```

Repères : 48 à 72 images, 720 à 960 px de large (jamais de 4K), 64 échantillons (le débruiteur fait le
reste). Avec le préréglage léger de `rendre_sequence`, une image 720 × 900 du flacon Ciste prend 30 s
à 1 min sur un M1 Pro (4 min sans lui) : 72 images ≈ 40 min à 1 h, en tâche de fond. Une image
déjà rendue n'est pas refaite : on relance après une coupure. `sequence.sh` affiche le poids total : viser 3 à 4 Mo au plus (baisser `qualite` ou le nombre d'images sinon).

## 2. Vidéo en boucle

Même rendu, puis la vidéo faite par `sequence.sh`. Pour une boucle sans à-coup :
`tour_complet(p, images=72, lineaire=True)` (rotation constante, la dernière image, identique à
la première, n'est pas rendue). L'affiche se prend alors sur la **première** image :
`AFFICHE=premiere bash sequence.sh …`.

## 3. 3D en direct

`exporter_glb("modeles/objet.glb", pieces, animations=True)` (les parents, comme le `Pivot` qui
porte la rotation, sont exportés avec les pièces) puis, côté site, le modèle
`commerce-flacon/outils/flacon3d.js` : chargement avec `GLTFLoader`, géométrie remplacée par nom,
**matériaux réglés dans three.js**, forme en code gardée en repli si le `.glb` ne charge pas.

## Toujours

- **Première ET dernière image de face** : le geste `data-sequence` montre l'image 1 au repos et en
  mouvement réduit (`tour_complet` le garantit pour un nombre entier de tours). Sans JavaScript, le
  canvas reste vide : mettre l'affiche en fond CSS du canvas (`background: url(affiche.webp) center/cover`).
- Le canvas prend toute la section (`niveau-agence.md` § 2 bis, « 3D à fond perdu »).
- Contrôler la **dernière image** : face avant, logo lisible, bien éclairé.
- Les rendus d'animation passent par la même boucle de correction que la photo
  (`boucle-3d.md`), sur 3 images : la première, celle du milieu, la dernière.
