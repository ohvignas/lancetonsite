#!/usr/bin/env bash
# Exporte le document de charte (03-charte/charte.html) en PDF A4 paysage, avec Chrome sans interface.
#   bash charte-pdf.sh projet-site/03-charte        → projet-site/03-charte/charte.pdf
set -euo pipefail
DIR="$(cd "${1:-.}" && pwd)"
CHROME="${CHROME:-}"
for c in "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" "/Applications/Chromium.app/Contents/MacOS/Chromium" "$(command -v google-chrome || true)" "$(command -v chromium || true)"; do
  [ -z "$CHROME" ] && [ -n "$c" ] && [ -x "$c" ] && CHROME="$c"
done
[ -z "$CHROME" ] && { echo "Chrome introuvable : ouvrir charte.html et faire Imprimer > Enregistrer en PDF (paysage, sans marges)."; exit 1; }
"$CHROME" --headless=new --disable-gpu --no-pdf-header-footer --virtual-time-budget=8000 \
  --print-to-pdf="$DIR/charte.pdf" "file://$DIR/charte.html" 2>/dev/null
echo "$DIR/charte.pdf"
