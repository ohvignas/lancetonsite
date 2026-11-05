#!/usr/bin/env bash
# Test du script de captures : bash commun/scripts/tests/test-captures.sh
set -euo pipefail
ICI="$(cd "$(dirname "$0")" && pwd)"
SCRIPT="$ICI/../captures.py"
SORTIE="${TMPDIR:-/tmp}/cap-test"
PORT=4399
rm -rf "$SORTIE"
python3 -m http.server "$PORT" --bind 127.0.0.1 --directory "$ICI/fixtures" >/dev/null 2>&1 &
SERVEUR=$!
trap 'kill $SERVEUR 2>/dev/null || true' EXIT
sleep 1
DEBUT=$(date +%s)
python3 "$SCRIPT" "http://127.0.0.1:$PORT/anime-decale.html" "$SORTIE" --mouvement-reduit
DUREE=$(( $(date +%s) - DEBUT ))
python3 - "$SORTIE" "$DUREE" <<'PY'
import json, sys, pathlib
from PIL import Image
d = pathlib.Path(sys.argv[1]); duree = int(sys.argv[2])
m = json.loads((d / "mesures.json").read_text())
tailles = ["360x740", "375x667", "375x812", "768x1024", "1280x720", "1440x900"]
for t in tailles:
    assert (d / f"{t}.png").exists(), f"capture manquante {t}"
    assert t in m, f"mesure manquante {t}"
assert (d / "375x812-reduit.png").exists(), "capture en mouvement réduit manquante"
assert m["375x812"]["debordement_px"] >= 30, m["375x812"]
assert m["1440x900"]["debordement_px"] == 0, m["1440x900"]
assert m["1440x900"]["animations_restantes"] == 0, m["1440x900"]
assert m["1440x900"]["images_non_chargees"] == 0, m["1440x900"]
im = Image.open(d / "1440x900.png").convert("RGB")
# fin d'animation : fenêtre décalée (720 → 1320), donc visible à x=1000 et absente à x=600
assert im.getpixel((1000, 150))[0] > 200 and im.getpixel((1000, 150))[1] < 120, ("fenêtre absente : capture prise avant la fin de l'animation", im.getpixel((1000,150)))
assert im.getpixel((600, 150)) == (255, 255, 255), ("fenêtre centrée : le décalage final n'est pas capturé", im.getpixel((600,150)))
assert duree < 40, f"trop lent : {duree} s"
print(f"OK captures (6 tailles, débordement 375 détecté, animations finies, {duree} s)")
PY
