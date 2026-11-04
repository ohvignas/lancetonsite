#!/usr/bin/env bash
# Lance ton site — prépare images et vidéos pour le web.
# Usage : optimiser-medias.sh <dossier_source> [dossier_sortie]
#   Parcourt <dossier_source> et ses sous-dossiers (images/, videos/…), en ignorant le
#   dossier de sortie. Sortie par défaut : <dossier_source>/web
# Images  → AVIF + WebP en 640/1024/1600/2560 px (jamais agrandies) ET toujours à la
#           largeur d'origine (une source de 928 px sort en 640 et 928 : utile en 2×).
#           Sources .png, .jpg, .jpeg, .webp, quel que soit le format réel (un PNG rangé
#           en .jpg est signalé) ; hero.jpg et hero.png ensemble : le second sort en hero-<ext>-…
# Vidéos  → MP4 H.264 + WebM VP9, sans son, 1920 px max, + poster JPG.
# 3D      → GLB compressé (Draco, textures WebP) avec gltf-transform, si npx est présent.
# Outils  : ffmpeg/ffprobe (obligatoires) ; npx (Node) pour les GLB.
#           Chaîne d'encodage : ffmpeg → PNG temporaire → cwebp / avifenc (brew install webp
#           libavif). Repli : encodeurs de ffmpeg (libwebp, libaom-av1), souvent absents du
#           ffmpeg du système. Pas de sips : en bac à sable macOS, il ne peut pas écrire.
set -euo pipefail

SRC="${1:?Usage: optimiser-medias.sh <dossier_source> [dossier_sortie]}"
OUT="${2:-$SRC/web}"
mkdir -p "$OUT"
OUT_ABS=$(cd "$OUT" && pwd)
command -v ffmpeg >/dev/null || { echo "✗ ffmpeg requis (macOS : brew install ffmpeg · Ubuntu : sudo apt install ffmpeg)" >&2; exit 1; }

LARGEURS=(640 1024 1600 2560)
NB_IMG=0; NB_VID=0; NB_3D=0

largeur() { ffprobe -v error -select_streams v:0 -show_entries stream=width -of csv=p=0 "$1" </dev/null; }
format() { ffprobe -v error -select_streams v:0 -show_entries stream=codec_name -of csv=p=0 "$1" </dev/null; }

# Encodeurs, choisis une fois : outil dédié d'abord, ffmpeg ensuite, sinon on le dit.
ENCODEURS=$(ffmpeg -hide_banner -encoders 2>/dev/null || true)
if command -v cwebp >/dev/null; then WEBP=cwebp
elif grep -q libwebp <<<"$ENCODEURS"; then WEBP=ffmpeg
else WEBP=""; echo "! WebP ignoré : ni cwebp ni ffmpeg avec libwebp (macOS : brew install webp)" >&2; fi
if command -v avifenc >/dev/null; then AVIF=avifenc
elif grep -q libaom-av1 <<<"$ENCODEURS"; then AVIF=ffmpeg
else AVIF=""; echo "! AVIF ignoré : ni avifenc ni ffmpeg avec libaom (macOS : brew install libavif)" >&2; fi

convertir() { # $1 source  $2 largeur  $3 base de sortie
  local tmp="$OUT_ABS/.tmp-$$.png"   # PNG intermédiaire : lu par cwebp et avifenc
  ffmpeg -nostdin -loglevel error -y -i "$1" -vf "scale=$2:-2:flags=lanczos" "$tmp"
  case "$WEBP" in
    cwebp)  cwebp -quiet -q 78 -m 6 "$tmp" -o "$3.webp" ;;
    ffmpeg) ffmpeg -nostdin -loglevel error -y -i "$tmp" -c:v libwebp -quality 78 "$3.webp" ;;
  esac
  case "$AVIF" in
    avifenc) avifenc -q 55 -s 4 "$tmp" "$3.avif" >/dev/null ;;
    ffmpeg)  ffmpeg -nostdin -loglevel error -y -i "$tmp" -c:v libaom-av1 -still-picture 1 -crf 32 "$3.avif" ;;
  esac
  rm -f "$tmp"
}

VUS="|"
while IFS= read -r -d '' img; do
  nom=$(basename "${img%.*}")
  ext=$(printf '%s' "${img##*.}" | tr '[:upper:]' '[:lower:]')
  # Les modèles d'édition rendent tantôt du JPEG, tantôt du PNG : on lit le contenu, pas l'extension.
  reel=$(format "$img")
  case "$ext:$reel" in
    png:png|jpg:mjpeg|jpeg:mjpeg|webp:webp) ;;
    *) echo "  ! $nom.$ext contient du ${reel:-format inconnu} : corriger l'extension dans le manifeste" ;;
  esac
  case "$VUS" in *"|$nom|"*) nom="$nom-$ext" ;; esac   # hero.jpg et hero.png : pas d'écrasement
  VUS="$VUS$nom|"
  if [ -z "$WEBP$AVIF" ]; then echo "  ✗ image  $nom non convertie (aucun encodeur)"; continue; fi
  l=$(largeur "$img")
  tailles=""
  for w in "${LARGEURS[@]}"; do
    [ "$w" -ge "$l" ] && continue
    convertir "$img" "$w" "$OUT_ABS/$nom-$w"; tailles="$tailles $w"
  done
  convertir "$img" "$l" "$OUT_ABS/$nom-$l"; tailles="$tailles $l"   # toujours l'original
  echo "✓ image  $nom ($l px →$tailles)"; NB_IMG=$((NB_IMG+1))
done < <(find "$SRC" -path "$OUT_ABS" -prune -o -path "$OUT" -prune -o -type f \
          \( -iname '*.png' -o -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.webp' \) -print0)

while IFS= read -r -d '' vid; do
  nom=$(basename "${vid%.*}")
  ffmpeg -nostdin -loglevel error -y -i "$vid" -an -vf "scale='min(1920,iw)':-2" -c:v libx264 -crf 26 -preset slow -pix_fmt yuv420p -movflags +faststart "$OUT_ABS/$nom.mp4"
  ffmpeg -nostdin -loglevel error -y -i "$vid" -an -vf "scale='min(1920,iw)':-2" -c:v libvpx-vp9 -crf 34 -b:v 0 "$OUT_ABS/$nom.webm"
  ffmpeg -nostdin -loglevel error -y -i "$vid" -vframes 1 -q:v 3 "$OUT_ABS/$nom-poster.jpg"
  echo "✓ vidéo  $nom"; NB_VID=$((NB_VID+1))
done < <(find "$SRC" -path "$OUT_ABS" -prune -o -path "$OUT" -prune -o -type f \
          \( -iname '*.mp4' -o -iname '*.mov' -o -iname '*.webm' \) -print0)

while IFS= read -r -d '' glb; do
  nom=$(basename "${glb%.*}")
  if command -v npx >/dev/null; then
    if npx --yes @gltf-transform/cli optimize "$glb" "$OUT_ABS/$nom.glb" \
         --compress draco --texture-compress webp >/dev/null 2>&1; then
      echo "✓ 3D     $nom ($(du -h "$OUT_ABS/$nom.glb" | cut -f1))"
    else
      cp "$glb" "$OUT_ABS/$nom.glb"; echo "  3D $nom copié tel quel (gltf-transform a échoué)"
    fi
  else
    cp "$glb" "$OUT_ABS/$nom.glb"; echo "  3D $nom copié tel quel (npx absent : installer Node pour compresser)"
  fi
  NB_3D=$((NB_3D+1))
done < <(find "$SRC" -path "$OUT_ABS" -prune -o -path "$OUT" -prune -o -type f \
          \( -iname '*.glb' -o -iname '*.gltf' \) -print0)

echo
if [ $((NB_IMG + NB_VID + NB_3D)) -eq 0 ]; then
  echo "✗ Aucun média trouvé dans $SRC" >&2; exit 1
fi
echo "$NB_IMG image(s), $NB_VID vidéo(s), $NB_3D modèle(s) 3D → $OUT_ABS ($(du -sh "$OUT_ABS" | cut -f1))"
