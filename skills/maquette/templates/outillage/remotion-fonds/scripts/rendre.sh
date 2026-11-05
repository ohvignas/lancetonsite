#!/bin/sh
# Rend les 4 compositions puis les compresse pour le web (Lance ton site).
# Usage : sh scripts/rendre.sh            (depuis outillage/remotion-fonds/)
# Variables : NODE (défaut /opt/homebrew/bin/node, sinon node), SORTIE (défaut ../../fonds-hero/medias)
set -e
cd "$(dirname "$0")/.."
NODE="${NODE:-$(command -v /opt/homebrew/bin/node || command -v node)}"
SORTIE="${SORTIE:-../../fonds-hero/medias}"
REMOTION="$NODE node_modules/@remotion/cli/remotion-cli.js"
mkdir -p out "$SORTIE"

# nom-composition   crf-h264  crf-vp9   (réglés pour tenir < 1,5 Mo paysage, < 600 Ko portrait)
while read -r ID CRF264 CRFVP9; do
  [ -z "$ID" ] && continue
  echo "== $ID"
  # 1. rendu maître (CRF 20, propre)
  $REMOTION render src/index.ts "$ID" "out/$ID-maitre.mp4" --log=error < /dev/null
  # 2. H.264 web : sans son, faststart (lecture avant la fin du téléchargement),
  #    une image clé toutes les 3 s (72 images) : la boucle repart de l image 0, qui en est une
  ffmpeg -nostdin -y -loglevel error -i "out/$ID-maitre.mp4" -an -c:v libx264 -preset slow -crf "$CRF264" \
    -pix_fmt yuv420p -profile:v high -g 72 -keyint_min 24 -movflags +faststart "$SORTIE/remotion-$ID.mp4"
  # 3. VP9 WebM (souvent 20 à 40 % plus léger, proposé en premier dans <source>)
  ffmpeg -nostdin -y -loglevel error -i "out/$ID-maitre.mp4" -an -c:v libvpx-vp9 -b:v 0 -crf "$CRFVP9" \
    -row-mt 1 -deadline good -cpu-used 2 -g 72 -pix_fmt yuv420p "$SORTIE/remotion-$ID.webm"
  # 4. affiche = image 0, identique au début de la boucle (pas de saut au lancement)
  ffmpeg -nostdin -y -loglevel error -i "out/$ID-maitre.mp4" -frames:v 1 -q:v 4 "$SORTIE/remotion-$ID.jpg"
done <<LISTE
maille-paysage  ${CRF_MAILLE:-30} ${CRFVP9_MAILLE:-40}
maille-portrait ${CRF_MAILLE:-30} ${CRFVP9_MAILLE:-40}
lignes-paysage  ${CRF_LIGNES:-30} ${CRFVP9_LIGNES:-44}
lignes-portrait ${CRF_LIGNES_PORTRAIT:-32} ${CRFVP9_LIGNES_PORTRAIT:-46}
LISTE

ls -l "$SORTIE"/remotion-*
