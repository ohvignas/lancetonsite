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
# Contrôle du hero : conforme, puis page sans rien
python3 "$SCRIPT" "$B/hero-ok.html" "$SORTIE/i" --tailles 1440x900 --hero
set +e
python3 "$SCRIPT" "$B/gsap-faux.html" "$SORTIE/j" --tailles 1440x900 --hero; CODE_J=$?
# Fond qui change d'octets, invisible à l'œil : refusé. Scène GSAP : défilement dans son pin-spacer.
python3 "$SCRIPT" "$B/hero-fige.html" "$SORTIE/k" --tailles 1440x900 --hero; CODE_K=$?
python3 "$SCRIPT" "$B/hero-pin.html" "$SORTIE/l" --tailles 1440x900 --hero
# Mauvais titre : arrêt, code 2, aucune capture. Raccourci de tailles.
SORTIE_T=$(python3 "$SCRIPT" "$B/hero-ok.html" "$SORTIE/m" --titre "Autre site" 2>&1); CODE_T=$?
set -e
python3 "$SCRIPT" "$B/hero-ok.html" "$SORTIE/n" --tailles 3 --titre "Hero conforme"
# 5. Taille mal écrite : message clair, code 2, pas de trace Python
set +e
ERR=$(python3 "$SCRIPT" "$B/anime-decale.html" "$SORTIE/f" --tailles 1440 2>&1); CODE=$?
set -e

python3 - "$SORTIE" "$DUREE" "$DUREE2" "$CODE" "$ERR" "$CODE_J" "$CODE_K" "$CODE_T" "$SORTIE_T" <<'PY'
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
h = mes("i")["1440x900"]["hero"]
assert h["fond_anime"] and h["ecoute_souris"] and h["scene_epinglee"], h
assert len(list((d / "i").glob("1440x900-defil-*.png"))) == 5 and (d / "i" / "1440x900-souris.png").exists()
a = Image.open(d / "i" / "1440x900-defil-00.png"); assert a.size == (1440, 900)
h = mes("j")["1440x900"]["hero"]
assert not (h["fond_anime"] or h["ecoute_souris"] or h["scene_epinglee"]), h
assert mes("c")["1440x900"]["selecteur_trouve"] is False
assert "erreur" in mes("d")["1440x900"] or mes("d")["1440x900"]["selecteur_trouve"] is False
assert (d / "e" / "1440x900.png").exists() and mes("e")["1440x900"]["images_non_chargees"] == 1
assert duree2 < 40, f"image bloquée : {duree2} s"
assert code == 2 and "Traceback" not in err and "1440" in err, (code, err)
assert sys.argv[6:9] == ["5", "5", "2"], ("codes de sortie", sys.argv[6:9])
k = mes("k")["1440x900"]
assert k["visuel_stable"] is False, ("le fond doit changer d'octets", k)
assert k["hero"]["fond_anime"] is False and k["hero_detail"]["fond_pixels_changes_pct"] < 1, k["hero_detail"]
assert mes("i")["1440x900"]["hero_detail"]["fond_pixels_changes_pct"] >= 1, mes("i")["1440x900"]["hero_detail"]
l = mes("l")["1440x900"]
assert l["hero_detail"]["scene_portee_px"] == 1800, ("le défilement sort de la scène", l["hero_detail"])
assert l["liens_morts"] == ["/existe-pas.html"], l["liens_morts"]
assert "Mauvaise page" in sys.argv[9] and not (d / "m").exists(), sys.argv[9]
assert sorted(mes("n")) == ["1440x900", "375x812", "768x1024"], sorted(mes("n"))
assert "webgl" in mes("i")["1440x900"]["hero_detail"]
print(f"OK captures ({duree} s pour 6 tailles, image bloquée {duree2} s)")
PY

# Prérequis : --verifier dit si la boucle peut partir, sans URL.
SORTIE_V=$(python3 "$SCRIPT" --verifier)
echo "$SORTIE_V" | grep -q "^Prêt" || { echo "ÉCHEC --verifier : $SORTIE_V"; exit 1; }
echo "OK verifier"

# Serveur : port libre, bonne page, requêtes Range ; dossier sans index : refus.
SERVI="$SORTIE/servi"; mkdir -p "$SERVI"; printf '<title>Servi</title>abcdefghij' > "$SERVI/index.html"
python3 "$ICI/../servir.py" "$SERVI" > "$SORTIE/servir.txt" &
SERVIR=$!
trap 'kill $SERVEUR $SERVIR 2>/dev/null || true' EXIT
for _ in 1 2 3 4 5 6 7 8 9 10; do [ -s "$SORTIE/servir.txt" ] && break; sleep 0.5; done
U=$(head -1 "$SORTIE/servir.txt")
[ "$(curl -s "$U")" = "$(cat "$SERVI/index.html")" ] || { echo "ÉCHEC servir : mauvaise page"; exit 1; }
[ "$(curl -s -r 0-5 "${U}index.html")" = "<title" ] || { echo "ÉCHEC servir : Range"; exit 1; }
mkdir -p "$SORTIE/vide"
if python3 "$ICI/../servir.py" "$SORTIE/vide" >/dev/null; then echo "ÉCHEC servir : dossier vide accepté"; exit 1; fi
echo "OK servir"
