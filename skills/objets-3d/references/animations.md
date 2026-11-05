# Animer le site avec des objets faits dans Blender

Un objet modélisé une fois dans Blender sert trois fois : la photo du catalogue, l'animation
de la page, et la 3D en direct. Le choix dépend de ce que la section doit faire.

| Besoin de la section | Technique | Ce qu'on livre | Geste du kit |
|---|---|---|---|
| L'objet tourne, s'ouvre, s'éclate **au défilement**, avec un rendu photo | **séquence d'images rendue dans Blender** (façon Apple) | 48 à 96 WebP numérotés `f-0001.webp`… | `canvas[data-sequence="…/f-{i}.webp"][data-frames="72"]`, dans `data-steps` |
| Boucle courte en fond (hero, bande) | **vidéo rendue dans Blender** | MP4 + WebM + affiche | `<video autoplay muted loop playsinline poster>` ou `data-video-scrub` |
| L'objet suit la souris, se manipule, change de couleur | **3D en direct** : `.glb` exporté + three.js | `modeles/objet.glb` (< 500 Ko) | `GLTFLoader` (modèle : `commerce-flacon/flacon3d.js`) ou `<model-viewer data-model-scroll>` |
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
rendre_sequence("rendu/tour", largeur=1200, echantillons=64)
```

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

Repères : 48 à 96 images, 960 px de large pour le web (1200 sur un plein écran), 64 à 96
échantillons par image (le débruiteur fait le reste ; une image prend 5 à 20 s sur GPU,
donc 72 images ≈ 10 à 20 min, en tâche de fond). `sequence.sh` affiche le poids total : viser 3 à 4 Mo au plus (baisser `qualite` ou le nombre d'images sinon).

## 2. Vidéo en boucle

Même rendu, puis la vidéo faite par `sequence.sh`. Pour une boucle sans à-coup :
`tour_complet(p, images=72, lineaire=True)` (rotation constante, la dernière image, identique à
la première, n'est pas rendue). L'affiche se prend alors sur la **première** image :
`AFFICHE=premiere bash sequence.sh …`.

## 3. 3D en direct

`exporter_glb("modeles/objet.glb", pieces, animations=True)` (les parents, comme le `Pivot` qui
porte la rotation, sont exportés avec les pièces) puis, côté site, le modèle
`commerce-flacon/flacon3d.js` : chargement avec `GLTFLoader`, géométrie remplacée par nom,
**matériaux réglés dans three.js**, forme en code gardée en repli si le `.glb` ne charge pas.

## Toujours

- **Première ET dernière image de face** : le geste `data-sequence` montre l'image 1 au repos et en
  mouvement réduit (`tour_complet` le garantit pour un nombre entier de tours). Sans JavaScript, le
  canvas reste vide : mettre l'affiche en fond CSS du canvas (`background: url(affiche.webp) center/cover`).
- Le canvas prend toute la section (`niveau-agence.md` § 2 bis, « 3D à fond perdu »).
- Contrôler la **dernière image** : face avant, logo lisible, bien éclairé.
- Les rendus d'animation passent par la même boucle de correction que la photo
  (`boucle-3d.md`), sur 3 images : la première, celle du milieu, la dernière.
