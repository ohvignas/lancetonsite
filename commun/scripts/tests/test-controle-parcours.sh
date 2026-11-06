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

# Un projet complet conforme.
B="$T/bon"; mkdir -p "$B/05-contenus" "$B/site/css" "$B/03-charte" "$B/06-medias" "$B/07-maquette" "$B/08-design-system"
touch "$B/01-cadrage.md" "$B/02-marque.md" "$B/04-architecture.md" "$B/08-design-system/tokens.css" "$B/09-passation.md" "$B/10-prd.md"
touch "$B/03-charte/charte.md" "$B/06-medias/medias.md" "$B/07-maquette/maquette.md"
cat >"$B/00-etat.md" <<'F'
# État
| Hero | essayé sur sa machine le 06/11 |
| Boucle persona | 71 → 83 → 91 |
F
echo "textes" >"$B/05-contenus/accueil.md"
python3 - "$B/site/index.html" <<'P'
import sys
s = "".join(f'<section id="s{i}"><img src="a.jpg" alt=""><p>{"mot " * 60}</p></section>' for i in range(10))
open(sys.argv[1], "w", encoding="utf-8").write(f"<html><body><main>{s}</main></body></html>")
P
attendu "projet conforme" 0 "Aucun point NON" "$B"

# Hero jamais essayé sur la vraie machine.
P="$T/hero"; cp -R "$B" "$P"; sed -i '' '/^| Hero/d' "$P/00-etat.md" 2>/dev/null || sed -i '/^| Hero/d' "$P/00-etat.md"
attendu "hero non essayé" 1 "NON  hero essayé" "$P"

# Page de texte, sans visuels, avec mot interne, note trop basse.
P="$T/vide"; cp -R "$B" "$P"
python3 - "$P/site/index.html" <<'F'
import sys
s = "".join(f'<section id="s{i}"><p>{"mot " * 60}</p></section>' for i in range(10))
open(sys.argv[1], "w", encoding="utf-8").write(f"<main>{s}<section><p>[à recevoir]</p></section></main>")
F
attendu "sections sans visuel" 1 "AVIS 10 sections sur 11 sans image" "$P"
attendu "mot interne" 1 "1 « [à recevoir] »" "$P"
sed -i '' 's/71 → 83 → 91/60 → 62/' "$P/00-etat.md" 2>/dev/null || sed -i 's/71 → 83 → 91/60 → 62/' "$P/00-etat.md"
attendu "note sous le seuil" 1 "62/100" "$P"

# Textes absents.
P="$T/textes"; cp -R "$B" "$P"; rm -rf "$P/05-contenus"
P="$T/sous90"; cp -R "$B" "$P"; sed -i '' 's/→ 91/→ 88/' "$P/00-etat.md" 2>/dev/null || sed -i 's/→ 91/→ 88/' "$P/00-etat.md"
attendu "site sous 90" 1 "88/100 (seuil 90)" "$P"

P="$T/modele"; cp -R "$B" "$P"; cat >"$P/00-etat.md" <<'F'
| Hero | {{essayé sur sa machine le JJ/MM, ou à essayer (étape 7)}} |
| Boucle persona | {{notes de chaque tour, ex. 71 → 83 → 88 · verdict du client simulé}} |
F
attendu "modèle non rempli" 1 "NON  client simulé passé" "$P"
attendu "hero du modèle" 1 "NON  hero essayé" "$P"

P="$T/ecart"; cp -R "$B" "$P"; echo "| Écart de densité | 9 sections : pas de catalogue |" >>"$P/00-etat.md"
python3 - "$P/site/index.html" <<'F'
import sys
s = "".join(f'<section id="s{i}"><img src="a.jpg" alt=""><p>{"mot " * 60}</p></section>' for i in range(9))
open(sys.argv[1], "w", encoding="utf-8").write(f"<main>{s}</main>")
F
attendu "écart justifié" 0 "écart justifié" "$P"

P="$T/sur100"; cp -R "$B" "$P"; sed -i '' 's/71 → 83 → 91/62\/100 · Pas encore/' "$P/00-etat.md" 2>/dev/null || sed -i 's/71 → 83 → 91/62\/100 · Pas encore/' "$P/00-etat.md"
attendu "note écrite sur 100" 1 "62/100 (seuil 90)" "$P"

echo "- Décision : le client simulé doit atteindre 95/100" >>"$P/00-etat.md"
attendu "une décision n'est pas une note" 1 "62/100 (seuil 90)" "$P"

P="$T/sansindex"; cp -R "$B" "$P"; mkdir -p "$P/07-maquette/prototype"; mv "$P/site/index.html" "$P/site/accueil.html"
cp "$P/site/accueil.html" "$P/07-maquette/prototype/accueil.html"; sed -i '' 's/→ 91/→ 86/' "$P/00-etat.md" 2>/dev/null || sed -i 's/→ 91/→ 86/' "$P/00-etat.md"
attendu "site sans index" 1 "NON  site/index.html présent" "$P"
attendu "site sans index : seuil du site" 1 "86/100 (seuil 90)" "$P"

attendu "textes absents" 1 "NON  textes écrits" "$T/textes"

# Une étape sautée, sans maquette.
A="$T/troue"; mkdir -p "$A/03-charte" "$A/site"; touch "$A/01-cadrage.md" "$A/03-charte/charte.md"; echo "<main></main>" >"$A/site/index.html"
echo "# État" >"$A/00-etat.md"
attendu "étape sautée" 1 "manque 02" "$A"
attendu "maquette absente" 1 "maquette absente" "$A"

# Début de parcours : rien à mesurer, pas de faux NON.
C="$T/debut"; mkdir -p "$C/07-maquette/captures" "$C/05-contenus"; touch "$C/01-cadrage.md"; echo "# État" >"$C/00-etat.md"
attendu "début de parcours" 0 "aucune page à mesurer" "$C"

# Dossier inconnu.
attendu "pas un projet" 1 "00-etat.md absent" "$T"

[ "$ECHECS" = 0 ] && echo "Tout passe." || { echo "$ECHECS échec(s)."; exit 1; }
