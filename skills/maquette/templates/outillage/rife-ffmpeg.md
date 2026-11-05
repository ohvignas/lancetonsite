# RIFE + FFmpeg — ralenti fluide, puis vidéo web légère

Recette pour l'étape 7 (médias) : une vidéo générée (Seedance, Kling…) dure souvent 5 s à 24 i/s ; on veut un **ralenti ×2 à ×4 sans saccade** pour un fond de hero ou une vidéo pilotée au défilement, puis des fichiers web légers.

- **RIFE** (Real-Time Intermediate Flow Estimation) invente les images intermédiaires à partir du mouvement estimé. Modèle d'origine : https://github.com/hzwer/ECCV2022-RIFE, licence **MIT** (« Copyright (c) Megvii Inc. »).
- **rife-ncnn-vulkan** : la version prête à l'emploi, sans Python ni CUDA, qui tourne sur tout GPU Vulkan (Mac via MoltenVK). https://github.com/nihui/rife-ncnn-vulkan, licence **MIT** (« Copyright (c) 2020 nihui »). Dernière release : **20221029** (`rife-ncnn-vulkan-20221029-macos.zip`, modèles inclus jusqu'à `rife-v4.6`).
- **FFmpeg** : 9.0.2 (Homebrew) ; LGPL 2.1+, binaire GPL quand il inclut libx264 (cas de Homebrew). Utilisé comme outil, rien n'est redistribué.

**Statut de la recette** : la partie FFmpeg (extraction, réassemblage, compressions, affiche) a été **exécutée** sur `exemples/b2c-brume/videos/hero-1920.mp4` (5 s, 1920×1068, 24 i/s, 329 Ko). RIFE lui-même **n'a pas été lancé** ici (pas de téléchargement d'exécutable tiers dans cette session) : les commandes suivent le README officiel ; le remplacement `minterpolate` de FFmpeg, lui, a été testé.

## Quand s'en servir

- La vidéo générée est trop courte ou trop rapide pour un fond calme : ralenti ×2 ou ×4.
- Vidéo **pilotée au défilement** : plus d'images = défilement plus doux.
- Passer une vidéo 24 i/s à 48/60 i/s pour un mouvement plus fluide.

## Quand ne pas s'en servir

- Mouvements très rapides, occlusions, mains, textes, flammes, liquides éclaboussés : RIFE « fond » les détails, artefacts visibles. Regénérer la vidéo plus lente à la source est souvent mieux.
- Fond **abstrait** : le rendre directement à la bonne vitesse (Remotion, `remotion.md`) plutôt que d'interpoler.
- Si le ralenti ×1,5 suffit : `setpts` seul (sans interpolation) passe souvent inaperçu sur un fond flou.

## 1. Installer rife-ncnn-vulkan (Mac)

1. Télécharger `rife-ncnn-vulkan-20221029-macos.zip` depuis la page Releases du dépôt (vérifier l'URL : `github.com/nihui/rife-ncnn-vulkan/releases`).
2. Dézipper dans un dossier d'outils (pas dans le projet du site).
3. Au premier lancement, macOS peut bloquer un exécutable non signé : Réglages Système → Confidentialité et sécurité → « Ouvrir quand même ». (Ne pas désactiver Gatekeeper globalement.)
4. Test : `./rife-ncnn-vulkan -h`.

## 2. Ralentir

```sh
mkdir -p images interp
ffprobe -v error -select_streams v -show_entries stream=r_frame_rate,nb_frames -of csv=p=0 source.mp4   # ex. 24/1,122
# une image PNG par image vidéo (pas de doublon ni de saut)
ffmpeg -i source.mp4 -fps_mode passthrough images/%08d.png
# RIFE v4.x accepte un nombre d'images cible quelconque : ×4 ici
N=$(ls images | wc -l)
./rife-ncnn-vulkan -i images -o interp -m rife-v4.6 -n $((N * 4))
#   -u  : mode UHD pour les sources 4K   -x : TTA (plus propre, 2× plus lent)
#   -j 2:2:2 : threads chargement:calcul:écriture, à baisser pour les grandes images
# ralenti ×4 : on relit 4× plus d'images à la cadence d'origine
ffmpeg -framerate 24 -i interp/%08d.png -c:v libx264 -crf 16 -pix_fmt yuv420p maitre-ralenti.mp4
# variante « ×2 plus fluide » : -n $((N*4)) puis -framerate 48
```

Sans RIFE (repli testé, qualité moindre sur les contours) : l'interpolation par compensation de mouvement de FFmpeg.

```sh
ffmpeg -i source.mp4 -vf "minterpolate=fps=96:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1,setpts=4*PTS" \
  -r 24 -an -c:v libx264 -crf 16 -pix_fmt yuv420p maitre-ralenti.mp4
```

Mesuré : 5 s → 20,04 s, maître 2 029 322 o ; 2 min 19 s de calcul sur Mac M (le filtre est lent, mono-cœur).

Pour une **boucle** : vérifier la jonction fin → début. Si elle saute, fondu enchaîné de la fin sur le début (`xfade`) ou boucle aller-retour (`[0]reverse[r];[0][r]concat`), puis recouper.

## 3. Compresser pour le web

Toujours : sans son (`-an`), `yuv420p`, `-movflags +faststart` (l'index MP4 en tête : la lecture démarre avant la fin du téléchargement), largeur 1920 max en paysage, 1080 en portrait.

### Fond en boucle (lecture normale)

```sh
# H.264 : compatible partout, en dernier dans <source>
ffmpeg -i maitre-ralenti.mp4 -an -c:v libx264 -preset slow -crf 26 -pix_fmt yuv420p -profile:v high \
  -g 72 -movflags +faststart fond.mp4
# AV1 : le plus léger, à proposer en premier (Chrome, Firefox, Safari sur puces avec décodage AV1)
ffmpeg -i maitre-ralenti.mp4 -an -c:v libsvtav1 -preset 6 -crf 38 -pix_fmt yuv420p -movflags +faststart fond-av1.mp4
# VP9 : alternative WebM
ffmpeg -i maitre-ralenti.mp4 -an -c:v libvpx-vp9 -b:v 0 -crf 36 -row-mt 1 -deadline good -cpu-used 2 fond.webm
```

### Vidéo pilotée au défilement (`currentTime` suit le scroll)

Le navigateur ne peut afficher une image qu'en repartant de la dernière **image clé** : avec une image clé toutes les 3 s, chaque saut de défilement décode jusqu'à 72 images → saccades. Il faut des images clés **rapprochées** et une définition plus basse pour compenser le poids.

```sh
ffmpeg -i maitre-ralenti.mp4 -vf scale=1280:-2 -an -c:v libx264 -preset slow -crf 28 -pix_fmt yuv420p \
  -g 12 -keyint_min 12 -sc_threshold 0 -movflags +faststart defilement.mp4
ffmpeg -i maitre-ralenti.mp4 -vf scale=1280:-2 -an -c:v libsvtav1 -preset 6 -crf 40 -g 12 -pix_fmt yuv420p \
  -movflags +faststart defilement-av1.mp4
ffmpeg -i maitre-ralenti.mp4 -vf scale=1280:-2 -an -c:v libvpx-vp9 -b:v 0 -crf 38 -row-mt 1 -deadline good \
  -cpu-used 2 -g 12 defilement.webm
```

`-g 12` = une image clé toutes les 0,5 s à 24 i/s ; descendre à `-g 6` si ça accroche encore, jusqu'à `-g 1` (tout en images clés, le plus fluide et le plus lourd). `-sc_threshold 0` empêche x264 d'en ajouter au hasard des changements de plan.

### Affiche

```sh
ffmpeg -i maitre-ralenti.mp4 -frames:v 1 -q:v 3 affiche.jpg          # image 0 = début de la boucle
cwebp -q 80 affiche.jpg -o affiche.webp                                # FFmpeg Homebrew n'a pas d'encodeur WebP
```

### Mesures (vidéo Brume ralentie ×4, 20 s, source granuleuse)

| Fichier | Réglage | Poids |
|---|---|---|
| fond.mp4 | H.264 CRF 26, 1920, `-g 72` | 1 718 632 o |
| fond-av1.mp4 | AV1 CRF 38, 1920 | 1 124 934 o |
| fond.webm | VP9 CRF 36, 1920 | 869 701 o |
| defilement.mp4 | H.264 CRF 28, 1280, `-g 12` | 3 635 782 o |
| defilement-av1.mp4 | AV1 CRF 40, 1280, `-g 12` | 4 051 386 o |
| defilement.webm | VP9 CRF 38, 1280, `-g 12` | 4 006 046 o |
| affiche.jpg | `-q:v 3`, 1920 | 230 086 o |

À retenir : les images clés rapprochées multiplient le poids (×2 malgré une définition divisée par 2,25) et **effacent l'avantage d'AV1/VP9** ; pour le défilement, H.264 en `-g 12` est le meilleur compromis. Un essai à 1920 en `-g 8` donnait 9,4 Mo en H.264 et 11,3 Mo en AV1 : inutilisable. Pour le défilement, viser 8 à 12 s maximum et 1280 px.

## 4. Brancher

Boucle de fond : gabarit `fonds-hero/video-boucle.html` (ou `remotion-*.html`, qui choisit déjà WebM/MP4), avec les sources dans l'ordre :

```html
<video muted loop playsinline preload="none" aria-hidden="true" tabindex="-1" poster="images/affiche.webp">
  <source src="videos/fond-av1.mp4" type='video/mp4; codecs="av01.0.08M.08"'>
  <source src="videos/fond.webm" type='video/webm; codecs="vp9"'>
  <source src="videos/fond.mp4" type="video/mp4">
</video>
```

(Avec `preload="none"` et un chargement après `load`, poser les `<source>` en JS comme dans les démos.)

Défilement : `preload="auto"`, pas de `loop`, et dans un `requestAnimationFrame` : `video.currentTime = progression * video.duration` (ne pas écrire à chaque événement `scroll`, seulement une fois par image ; ignorer si l'écart < 1/24 s). En mouvement réduit : afficher l'affiche, ne pas lier au défilement.
