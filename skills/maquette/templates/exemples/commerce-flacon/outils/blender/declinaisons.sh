#!/usr/bin/env bash
# Décline les rendus studio (images/studio/<id>.png) en WebP pour le site : 1080 px (fiche, zoom) et 400 px (vignettes).
# bash outils/blender/declinaisons.sh restanque mistral ...
set -euo pipefail
cd "$(dirname "$0")/../.."
for id in "$@"; do
  src="images/studio/$id.png"
  cwebp -quiet -q 86 -resize 1080 0 "$src" -o "images/flacon-$id-1080.webp"
  cwebp -quiet -q 82 -resize 400 0 "$src" -o "images/flacon-$id-400.webp"
  echo "$id : $(du -h images/flacon-$id-1080.webp | cut -f1) / $(du -h images/flacon-$id-400.webp | cut -f1)"
done
