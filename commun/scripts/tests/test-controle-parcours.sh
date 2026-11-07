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
  # shellcheck disable=SC2086
  sortie="$(python3 "$SCRIPT" $4 2>&1)"; code=$?
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

# Liste de fin d'une étape : le fichier manquant est nommé.
L="$T/liste"; mkdir -p "$L/03-charte/logo" "$L/03-charte/moodboard"; echo "# État" >"$L/00-etat.md"
touch "$L/03-charte/charte.md" "$L/03-charte/charte.html" "$L/03-charte/references.md" "$L/03-charte/directions.md" "$L/03-charte/logo/logo.svg" "$L/03-charte/moodboard/planche.jpg"
attendu "liste de fin : manque nommé" 1 "NON  étape 3 : 03-charte/charte.pdf" "$L --etape 3"
touch "$L/03-charte/charte.pdf"
attendu "liste de fin : complète" 0 "étape 3 : tous les livrables sont là" "$L --etape 3"

# Étape validée sans contrôle noté, puis sous le seuil, puis conforme.
V="$T/valide"; mkdir -p "$V"; touch "$V/01-cadrage.md"
cat >"$V/00-etat.md" <<'F'
| # | Étape | Où | Source | Document présenté (lien) | Statut | Date | Temps | Contrôle |
|---|---|---|---|---|---|---|---|---|
| 1 | Cadrage | Claude Code | 01-cadrage.md | | validé | 07/11 | 9 min | — |
F
attendu "étape validée sans note" 1 "NON  étape 1 validée sans contrôle noté" "$V"
sed -i '' 's/| — |$/| 71 → 80 |/' "$V/00-etat.md" 2>/dev/null || sed -i 's/| — |$/| 71 → 80 |/' "$V/00-etat.md"
attendu "étape validée sous le seuil" 1 "NON  étape 1 : contrôle à 80/100 (seuil 85)" "$V"
sed -i '' 's/71 → 80/71 → 86/' "$V/00-etat.md" 2>/dev/null || sed -i 's/71 → 80/71 → 86/' "$V/00-etat.md"
mkdir -p "$V/boucle-persona/etape-01/iteration-1" "$V/sources/concurrents"; touch "$V/boucle-persona/etape-01/iteration-1/rapport.md"
attendu "étape validée : manque un livrable" 1 "NON  étape 1 : sources/recherche.md" "$V"
touch "$V/sources/recherche.md" "$V/sources/marche.md" "$V/sources/mots-cles.md" "$V/sources/concurrents/a.md"
attendu "étape validée et contrôlée" 0 "étape 1 : contrôlée (86/100)" "$V"

# Pistes de logo sans logo, captures du hero seul, conception dans l'application Claude.
K="$T/creux"; mkdir -p "$K/03-charte/logo/pistes" "$K/07-maquette/captures/hero" "$K/07-maquette/prototype"; echo "# État" >"$K/00-etat.md"
touch "$K/03-charte/logo/pistes/a.png" "$K/07-maquette/captures/hero/1440x900.png"
attendu "pistes sans logo" 1 "NON  étape 3 : 03-charte/logo/logo.* manque" "$K --etape 3"
attendu "captures du hero seul" 1 "NON  étape 7 : 07-maquette/captures/**/*.png manque" "$K --etape 7"
echo "| Lieu de conception | application Claude |" >>"$K/00-etat.md"; touch "$K/07-maquette/maquette.md"
attendu "application Claude : sans captures ni prototype" 0 "étape 7 : tous les livrables sont là" "$K --etape 7"

# Dossier inconnu.
attendu "pas un projet" 1 "00-etat.md absent" "$T"

[ "$ECHECS" = 0 ] && echo "Tout passe." || { echo "$ECHECS échec(s)."; exit 1; }
