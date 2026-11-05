#!/usr/bin/env bash
# Test du script de captures : bash commun/scripts/tests/test-captures.sh
set -euo pipefail
ICI="$(cd "$(dirname "$0")" && pwd)"
SCRIPT="$ICI/../captures.py"
SORTIE="${TMPDIR:-/tmp}/cap-test"
PORT=4399
rm -rf "$SORTIE"
python3 "$ICI/serveur.py" "$PORT" &
SERVEUR=$!
trap 'kill $SERVEUR 2>/dev/null || true' EXIT
sleep 1
B="http://127.0.0.1:$PORT"

# 1. Six tailles, fin d'animation CSS, mouvement réduit, durée
DEBUT=$(date +%s)
python3 "$SCRIPT" "$B/anime-decale.html" "$SORTIE/a" --mouvement-reduit
DUREE=$(( $(date +%s) - DEBUT ))
# 2. Animations JS, enchaînées, apparition au défilement, débordement masqué, onload de la page
python3 "$SCRIPT" "$B/pieges-js.html" "$SORTIE/b" --tailles 1440x900,375x812 --pleine-page
# 3. Sélecteur absent et sélecteur invalide : pas de plantage, signalés
python3 "$SCRIPT" "$B/anime-decale.html" "$SORTIE/c" --tailles 1440x900 --selecteur "#existe-pas"
python3 "$SCRIPT" "$B/anime-decale.html" "$SORTIE/d" --tailles 1440x900 --selecteur "###"
# 4. Image qui ne répond jamais : le script finit quand même, avec ses mesures
DEBUT2=$(date +%s)
python3 "$SCRIPT" "$B/bloquee.html" "$SORTIE/e" --tailles 1440x900
DUREE2=$(( $(date +%s) - DEBUT2 ))
# Sélecteur trouvé, timeline GSAP : attendue, même sans changement visible
python3 "$SCRIPT" "$B/pieges-js.html" "$SORTIE/g" --tailles 1440x900 --selecteur "#vu"
python3 "$SCRIPT" "$B/gsap-faux.html" "$SORTIE/h" --tailles 1440x900
# 5. Taille mal écrite : message clair, code 2, pas de trace Python
set +e
ERR=$(python3 "$SCRIPT" "$B/anime-decale.html" "$SORTIE/f" --tailles 1440 2>&1); CODE=$?
set -e

python3 - "$SORTIE" "$DUREE" "$DUREE2" "$CODE" "$ERR" <<'PY'
import json, sys, pathlib
from PIL import Image
d = pathlib.Path(sys.argv[1]); duree, duree2, code, err = int(sys.argv[2]), int(sys.argv[3]), int(sys.argv[4]), sys.argv[5]
def mes(x): return json.loads((d / x / "mesures.json").read_text())
m = mes("a")
for t in ["360x740", "375x667", "375x812", "768x1024", "1280x720", "1440x900"]:
    assert (d / "a" / f"{t}.png").exists(), f"capture manquante {t}"
assert (d / "a" / "375x812-reduit.png").exists()
assert m["375x812"]["debordement_px"] >= 30, m["375x812"]
assert m["1440x900"]["debordement_px"] == 0, m["1440x900"]
assert m["1440x900"]["animations_restantes"] == 0, m["1440x900"]
assert m["1440x900"]["images_non_chargees"] == 0, m["1440x900"]
assert not any(e for t in m for e in m[t]["erreurs_console"]), ("favicon compté comme erreur", m)
im = Image.open(d / "a" / "1440x900.png").convert("RGB")
assert im.getpixel((1000, 150))[0] > 200 and im.getpixel((1000, 150))[1] < 120, ("avant la fin de l'animation", im.getpixel((1000,150)))
assert im.getpixel((600, 150)) == (255, 255, 255), ("décalage final non capturé", im.getpixel((600,150)))
assert duree < 45, f"trop lent : {duree} s"

m = mes("b"); im = Image.open(d / "b" / "1440x900.png").convert("RGB")
p = im.getpixel((100, 100)); assert p[0] > 215 and p[1] < 110, ("fondu requestAnimationFrame non fini", p)
p = im.getpixel((500, 100)); assert p[2] > 215 and p[0] < 80, ("animation enchaînée non finie", p)
p = im.getpixel((100, 900 + 900 + 100 + 150)); assert p[1] > 150 and p[0] < 80, ("apparition au défilement vide", p)
assert m["1440x900"]["visuel_stable"] is False, "boucle infinie : le mouvement continu doit être signalé"
assert m["375x812"]["debordement_px"] == 0, "overflow-x:hidden masque le scrollWidth"
assert m["375x812"]["elements_hors_cadre"] >= 1, ("débordement masqué non vu", m["375x812"])
assert m["1440x900"]["titre"] == "charge", ("onload de la page écrasé", m["1440x900"])

assert mes("g")["1440x900"]["selecteur_trouve"] is True
im = Image.open(d / "g" / "1440x900.png").convert("RGB")
assert any(im.getpixel((100, y))[1] > 150 and im.getpixel((100, y))[0] < 80 for y in range(0, 900, 20)), "--selecteur : élément non amené à l'écran"
assert mes("h")["1440x900"]["duree_ms"] >= 2000 and mes("h")["1440x900"]["animations_restantes"] == 0, mes("h")
assert mes("c")["1440x900"]["selecteur_trouve"] is False
assert "erreur" in mes("d")["1440x900"] or mes("d")["1440x900"]["selecteur_trouve"] is False
assert (d / "e" / "1440x900.png").exists() and mes("e")["1440x900"]["images_non_chargees"] == 1
assert duree2 < 40, f"image bloquée : {duree2} s"
assert code == 2 and "Traceback" not in err and "1440" in err, (code, err)
print(f"OK captures ({duree} s pour 6 tailles, image bloquée {duree2} s)")
PY

# Prérequis : --verifier dit si la boucle peut partir, sans URL.
SORTIE_V=$(python3 "$SCRIPT" --verifier)
echo "$SORTIE_V" | grep -q "^Prêt" || { echo "ÉCHEC --verifier : $SORTIE_V"; exit 1; }
echo "OK verifier"
