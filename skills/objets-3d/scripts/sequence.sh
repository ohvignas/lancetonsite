#!/usr/bin/env bash
# Séquence Blender (PNG f-0001.png…) → séquence WebP pour canvas[data-sequence], vidéo MP4 + WebM, affiche.
#   bash sequence.sh <dossier_png> <dossier_sortie> [largeur=960] [qualite=78] [ips=30]
# Sortie : <sortie>/f-0001.webp…, <sortie>/boucle.mp4, <sortie>/boucle.webm, <sortie>/affiche.webp (dernière image, face avant)
set -euo pipefail
SRC="${1:?dossier des PNG}"; OUT="${2:?dossier de sortie}"; L="${3:-960}"; Q="${4:-78}"; IPS="${5:-30}"
command -v ffmpeg >/dev/null || { echo "ffmpeg manquant : brew install ffmpeg (ou apt install ffmpeg)"; exit 1; }
command -v cwebp  >/dev/null || { echo "cwebp manquant : brew install webp (ou apt install webp)"; exit 1; }
mkdir -p "$OUT"
shopt -s nullglob; PNGS=("$SRC"/f-*.png); [ ${#PNGS[@]} -gt 0 ] || { echo "aucun f-*.png dans $SRC"; exit 1; }

i=0
for f in "${PNGS[@]}"; do
  i=$((i + 1)); n=$(printf "%04d" "$i")
  cwebp -quiet -q "$Q" -resize "$L" 0 "$f" -o "$OUT/f-$n.webp"
done
# affiche = dernière image (face avant) ; AFFICHE=premiere pour une boucle linéaire
if [ "${AFFICHE:-derniere}" = "premiere" ]; then cp "$OUT/f-0001.webp" "$OUT/affiche.webp"
else cp "$OUT/f-$(printf "%04d" "$i").webp" "$OUT/affiche.webp"; fi

ffmpeg -loglevel error -y -framerate "$IPS" -pattern_type glob -i "$SRC/f-*.png" \
  -vf "scale=$L:-2:flags=lanczos,format=yuv420p" -c:v libx264 -crf 22 -preset slow -movflags +faststart -an "$OUT/boucle.mp4"
ffmpeg -loglevel error -y -framerate "$IPS" -pattern_type glob -i "$SRC/f-*.png" \
  -vf "scale=$L:-2:flags=lanczos,format=yuv420p" -c:v libvpx-vp9 -crf 34 -b:v 0 -an "$OUT/boucle.webm"

echo "images : $i  (data-frames=\"$i\")"
du -ch "$OUT"/f-*.webp | tail -1 | sed 's/total/poids de la séquence/'
ls -lh "$OUT"/boucle.* "$OUT"/affiche.webp | awk '{print $5, $NF}'
