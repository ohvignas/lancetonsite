# Outillage

Outils **hors navigateur** ou **de conception** qui servent à fabriquer des éléments du kit (vidéos de fond, animations calées à l'œil, 3D), avec pour chacun : licence vérifiée sur le dépôt, version, quand s'en servir dans le plugin et quand non. Les éléments prêts à copier restent dans `elements/`, `fonds-hero/`, `elements-3d/`.

| Fiche | Outil | Licence | En une ligne |
|---|---|---|---|
| [`remotion.md`](remotion.md) + [`remotion-fonds/`](remotion-fonds/) | Remotion 4.0.540 | **Remotion License** : gratuite pour particuliers, entreprises ≤ 3 personnes, associations, évaluation ; **licence entreprise payante au-delà** | Fonds de hero vidéo en boucle parfaite écrits en React, rendus et compressés en local. Démos : `fonds-hero/remotion-maille.html`, `remotion-lignes.html`. |
| [`theatre-js.md`](theatre-js.md) | Theatre.js 0.7.2 | core Apache 2.0 ; studio AGPL 3.0 (conception seulement) | Caler des keyframes dans un éditeur visuel, exporter le JSON, rejouer avec le seul core (34 Ko gzip). |
| [`babylon-vs-three.md`](babylon-vs-three.md) | Three.js 0.170 / Babylon.js 9.33 | MIT / Apache 2.0 | Three.js par défaut (171 Ko gzip contre 1,9 Mo) ; Babylon pour les configurateurs lourds. |
| [`cables-gl.md`](cables-gl.md) | cables.gl | MIT (runtime) | Éditeur à nœuds WebGL : utile à la marge (prototype, patch livré par un graphiste), pas pilotable par nous. |
| [`rife-ffmpeg.md`](rife-ffmpeg.md) | rife-ncnn-vulkan 20221029 + FFmpeg 9.0.2 | MIT / FFmpeg LGPL 2.1+ (GPL avec libx264) | Ralenti fluide d'une vidéo générée par interpolation, puis compression web (H.264, AV1, VP9, défilement). |
| [`drei-sans-react.md`](drei-sans-react.md) | Drei 10.7.9 → Three.js pur | MIT | Environment, ContactShadows, Float, PresentationControls, Html ancré, Center/Bounds, verre : nos équivalents sans React. |

## À ignorer pour les sites

Outils parfois cités dans des listes « créatives », mais hors champ pour produire un site vitrine :

- **OpenToonz** — logiciel d'animation 2D traditionnelle (dessin image par image, studio Ghibli) : fait pour des films, pas pour du web ; une boucle se fait plus simplement en vidéo ou en CSS.
- **Qwen3-TTS** — modèle de synthèse vocale : nos sites n'ont pas de voix off, et un son qui se lance seul est à proscrire.
- **Audacity** — éditeur audio : utile pour un podcast, pas pour un site (pas de son dans nos fonds vidéo).
- **Subtitle Edit** — édition de sous-titres : seulement si le site héberge une vraie vidéo parlée (alors : fichier `.vtt`), jamais pour un fond muet.
- **Auto-Editor** — coupe automatique des silences dans une vidéo parlée : montage de contenu, pas d'élément de page.
- **OBS** — capture et diffusion d'écran : sert à enregistrer un tutoriel, rien à intégrer dans une page.
- **Taichi** — langage de calcul parallèle (Python) pour la simulation : aucun export web direct ; une simulation pour le web s'écrit en shader.
- **SPlisHSPlasH** — simulateur de fluides SPH hors ligne (C++) : calculs de plusieurs heures pour une vidéo de fluide ; on obtient l'effet plus vite avec un shader ou une vidéo générée.
