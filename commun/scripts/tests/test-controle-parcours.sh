#!/usr/bin/env bash
# Test du contrôle de parcours : bash commun/scripts/tests/test-controle-parcours.sh
set -uo pipefail
ICI="$(cd "$(dirname "$0")" && pwd)"
SCRIPT="$ICI/../controle_parcours.py"
T="$(mktemp -d "${TMPDIR:-/tmp}/ctl-parcours.XXXX")"
trap 'rm -rf "$T"' EXIT
ECHECS=0

attendu() { # nom, code attendu, texte attendu, dossier
  local sortie code
  sortie="$(python3 "$SCRIPT" "$4" 2>&1)"; code=$?
  if [ "$code" != "$2" ] || ! grep -qF -- "$3" <<<"$sortie"; then
    echo "ÉCHEC $1 (code $code, attendu $2, texte : $3)"; echo "$sortie"; ECHECS=$((ECHECS + 1))
  else
    echo "ok   $1"
  fi
}

# Un projet direct conforme.
B="$T/bon"; mkdir -p "$B/05-contenus" "$B/site/css" "$B/site/_sections/01-hero"
cat >"$B/00-etat.md" <<'F'
# État
| Parcours | direct section par section, choisi par l'utilisateur le 06/11 |
| Boucle persona | 71 → 88 · validé (simulé) |
F
echo "statut : validée" >"$B/00-fiche.md"
echo "textes" >"$B/05-contenus/accueil.md"
echo ":root{}" >"$B/site/css/tokens.css"
python3 - "$B/site/index.html" <<'P'
import sys
s = "".join(f'<section id="s{i}"><img src="a.jpg" alt=""><p>{"mot " * 60}</p></section>' for i in range(10))
open(sys.argv[1], "w", encoding="utf-8").write(f"<html><body><main>{s}</main></body></html>")
P
attendu "projet conforme" 0 "Aucun point NON" "$B"

# Parcours déduit du prompt, sans question.
P="$T/deduit"; cp -R "$B" "$P"; sed -i '' "s/, choisi par l'utilisateur le 06\/11//" "$P/00-etat.md" 2>/dev/null || sed -i "s/, choisi par l'utilisateur le 06\/11//" "$P/00-etat.md"
attendu "parcours déduit" 1 "NON  parcours choisi" "$P"

# Page de texte, sans visuels, avec mot interne, note trop basse.
P="$T/vide"; cp -R "$B" "$P"
python3 - "$P/site/index.html" <<'F'
import sys
s = "".join(f'<section id="s{i}"><p>{"mot " * 60}</p></section>' for i in range(10))
open(sys.argv[1], "w", encoding="utf-8").write(f"<main>{s}<section><p>[à recevoir]</p></section></main>")
F
attendu "sections sans visuel" 1 "AVIS 10 sections sur 11 sans image" "$P"
attendu "mot interne" 1 "1 « [à recevoir] »" "$P"
sed -i '' 's/71 → 88/60 → 62/' "$P/00-etat.md" 2>/dev/null || sed -i 's/71 → 88/60 → 62/' "$P/00-etat.md"
attendu "note sous le seuil" 1 "62/100" "$P"

# Textes absents.
P="$T/textes"; cp -R "$B" "$P"; rm -rf "$P/05-contenus"
attendu "textes absents" 1 "NON  textes écrits" "$P"

# Dossier agence : une étape sautée, sans maquette.
A="$T/agence"; mkdir -p "$A/03-charte"; touch "$A/01-cadrage.md"
echo "| Parcours | dossier agence rapide, choisi par l'utilisateur |" >"$A/00-etat.md"
attendu "dossier agence troué" 1 "manque 02" "$A"
attendu "maquette absente" 1 "maquette absente" "$A"

# Dossier inconnu.
attendu "pas un projet" 1 "00-etat.md absent" "$T"

[ "$ECHECS" = 0 ] && echo "Tout passe." || { echo "$ECHECS échec(s)."; exit 1; }
