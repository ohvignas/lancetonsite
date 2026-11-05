#!/usr/bin/env bash
# Contrôle des textes de la boucle persona : bash commun/scripts/tests/test-procedure.sh [tâche]
set -u
cd "$(dirname "$0")/../../.."
ok=0; ko=0
verifie() { if eval "$2" >/dev/null 2>&1; then ok=$((ok+1)); else ko=$((ko+1)); echo "ÉCHEC : $1"; fi; }
T=${1:-tout}
if [[ $T == 2 || $T == tout ]]; then
  F=skills/cadrage/templates/fiche-client.md
  verifie "fiche : 6 rubriques" '[ "$(grep -c "^## " $F)" = 6 ]'
  verifie "fiche : 40 lignes au plus" '[ "$(wc -l < $F)" -le 40 ]'
  verifie "procédure : renvoi à la fiche (2 fois)" '[ "$(grep -c "fiche-client.md" commun/boucle-persona.md)" -ge 2 ]'
  verifie "procédure : prérequis --verifier" 'grep -q "captures.py --verifier" commun/boucle-persona.md'
fi
if [[ $T == 3 || $T == tout ]]; then
  verifie "persona : 3 modes nommés" '[ "$(grep -cE "Mode \`(rapide|controle|complet)\`" agents/client-persona.md)" -ge 3 ]'
  verifie "procédure : captures.py cité" 'grep -q "Les captures se font avec" commun/boucle-persona.md'
  verifie "persona : captures.py cité" 'grep -q "captures.py" agents/client-persona.md'
  verifie "procédure : tours 2-3 en contrôle" 'grep -q "Tours 2 et 3 : mode \`controle\`" commun/boucle-persona.md'
  verifie "persona : note reprise jamais remontée" 'grep -q "marquée « reprise »" agents/client-persona.md'
fi
echo "procédure : $ok ok, $ko échec(s)"; [ $ko = 0 ]
