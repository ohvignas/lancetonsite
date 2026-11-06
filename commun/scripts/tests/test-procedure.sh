#!/usr/bin/env bash
# Contrôle des textes du parcours et de la boucle persona : bash commun/scripts/tests/test-procedure.sh [tâche]
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
if [[ $T == 4 || $T == tout ]]; then
  verifie "procédure : complet-ordinateur" 'grep -q "complet-ordinateur" commun/boucle-persona.md'
  verifie "persona : complet-telephone" 'grep -q "complet-telephone" agents/client-persona.md'
  verifie "procédure : fusion, note la plus basse" 'grep -q "la plus basse" commun/boucle-persona.md'
  verifie "procédure : Oui seulement si les deux" 'grep -q "seulement si les deux" commun/boucle-persona.md'
  verifie "procédure : 10 points répartis sans doublon" 'python3 -c "
import re,sys
t=open(\"commun/boucle-persona.md\").read()
o=re.search(r\"complet-ordinateur.*?points ([0-9, et]+)\",t).group(1); m=re.search(r\"complet-telephone.*?points ([0-9, et]+)\",t).group(1)
a=set(map(int,re.findall(r\"\\d+\",o))); b=set(map(int,re.findall(r\"\\d+\",m)))
sys.exit(0 if a|b==set(range(1,11)) and a&b=={4,8} else 1)"'
  verifie "procédure : un point jugé par les deux garde le Pas OK" 'grep -q "garde le « Pas OK »" commun/boucle-persona.md'
  verifie "procédure : complet sur demande uniquement" 'grep -q "sur demande uniquement" commun/boucle-persona.md'
fi
if [[ $T == 5 || $T == tout ]]; then
  verifie "persona : colonne lot" 'grep -q "| lot |" agents/client-persona.md'
  verifie "conventions : médias en fichiers pendant la boucle" 'grep -q "base64" commun/conventions.md'
  verifie "conventions : renvoi au script" 'grep -q "commun/scripts/captures.py" commun/conventions.md'
  verifie "procédure : lots en parallèle" 'grep -q "un sous-agent par lot" commun/boucle-persona.md'
  verifie "procédure : médias en arrière-plan" 'grep -q "en arrière-plan" commun/boucle-persona.md && grep -q "média provisoire" commun/boucle-persona.md'
  verifie "procédure : arrêt anticipé" 'grep -q "Arrêt anticipé" commun/boucle-persona.md'
  verifie "procédure : 3 tours au plus gardé" 'grep -q "3 tours au plus" commun/boucle-persona.md'
  verifie "procédure : validé (simulé) gardé" 'grep -q "validé (simulé)" commun/boucle-persona.md'
  verifie "maquette : renvoi aux modes" 'grep -q "controle" skills/maquette/SKILL.md'
fi
if [[ $T == relecture || $T == tout ]]; then
  verifie "contrôle : reçoit les notes et les mesures du tour précédent" 'grep -q "scores.md. et le .mesures.json" commun/boucle-persona.md && grep -q "scores.md. et le .mesures.json" agents/client-persona.md'
  verifie "contrôle : lot partagé = page entière" 'grep -q "page entière" commun/boucle-persona.md && grep -q "page entière" agents/client-persona.md'
  verifie "contrôle : ni 40 tabulations ni scripts à part" 'grep -q "ni 40 tabulations" agents/client-persona.md'
  verifie "absent : suivants sur demande" '! grep -rn --exclude-dir=scripts "suivants sur demande" commun skills'
  verifie "absent : tours suivants à la demande" '! grep -rn --exclude-dir=scripts "tours suivants seulement si\|Les tours suivants seulement" commun skills'
  verifie "absent : onload écrasé dans les conventions" '! grep -n "\.onload *=" commun/conventions.md'
  verifie "persona : lit le débordement masqué" 'grep -q "elements_hors_cadre" agents/client-persona.md'
  verifie "procédure : durée mesurée affichée" 'grep -q "11 min 05 s" commun/boucle-persona.md'
fi
if [[ $T == hero || $T == tout ]]; then
  N=commun/niveau-agence.md
  verifie "hero : section obligatoire" 'grep -q "^## 2 ter. Le hero obligatoire" $N'
  verifie "hero : fond animé, souris, défilement" 'grep -q "Fond animé" $N && grep -q "Effet à la souris" $N && grep -q "Scène au défilement" $N'
  verifie "hero : objet en 3D, logiciel expliqué, modèle Vigie" 'grep -q "en 3D" $N && grep -q "b2b-vigie" $N && grep -q "logiciel-miroir" $N'
  verifie "hero : garde-fous" 'grep -q "mouvement réduit" $N && grep -q "tactile" $N'
  verifie "hero : renvoi compositions" 'grep -q "2 ter" commun/compositions.md'
  verifie "hero : renvoi maquette (brief et critique)" '[ "$(grep -c "2 ter" skills/maquette/SKILL.md)" -ge 2 ]'
  verifie "hero : renvoi modèle maquette" 'grep -q "2 ter" commun/modeles/maquette.md'
  verifie "hero : persona contrôle --hero" 'grep -q "captures.py .*--hero\|--hero" agents/client-persona.md'
  verifie "hero : gestes du kit" 'grep -q "2 ter" skills/maquette/templates/prototype/GESTES.md'
fi
if [[ $T == chrono || $T == tout ]]; then
  verifie "procédure : chrono de chaque tour" 'grep -q "boucle-persona/chrono.md" commun/boucle-persona.md'
fi
if [[ $T == parcours || $T == tout ]]; then
  D=skills/demarrer/SKILL.md
  verifie "parcours : un seul, plus de direct ni express" '[ ! -e skills/direct ] && [ ! -e skills/express ]'
  verifie "parcours : plus de question de choix" '! grep -q "Le parcours\*\*, question" $D && grep -q "aucune étape ne se saute" $D'
  verifie "parcours : les 12 étapes dans la frise" 'grep -q "12 La mise en ligne" $D'
  verifie "parcours : étape lancée à la main" 'grep -q "Une étape à la main" commun/parcours.md'
  verifie "parcours : aucun renvoi aux anciens skills" '! grep -rlE "skills/(direct|express)|lancetonsite:(direct|express) reprendre" commun skills agents --exclude-dir=tests --include=*.md --include=*.py --include=*.sh'
  verifie "hero : essai sur la vraie machine" 'grep -q "sa vraie machine" skills/maquette/SKILL.md && grep -q "87/100" skills/maquette/SKILL.md'
  verifie "maquette : compter la matière" 'grep -q "compter la matière" skills/maquette/SKILL.md'
  verifie "contrôle : avant les portes 7 et 11" 'grep -q "controle_parcours" skills/maquette/SKILL.md && grep -q "controle_parcours" skills/construire/SKILL.md'
  verifie "construire : HTML/CSS sans réécriture" 'grep -q "sans réécriture" skills/construire/SKILL.md'
  verifie "scripts déplacés" '[ -f commun/scripts/assembler.py ] && [ -f commun/scripts/optimiser-images.py ]'
  verifie "regard : immobile puis suivi permanent" 'grep -q "immobile tant que la souris" commun/niveau-agence.md && grep -q "défilement compris" commun/niveau-agence.md && ! grep -q "saccades rapides" commun/niveau-agence.md'
  verifie "hero : 5 briques" 'grep -q "cinq briques" commun/niveau-agence.md && grep -q "Fin vers la section suivante" commun/niveau-agence.md'
  verifie "bouton : pas d'\''aimant qui relit" 'grep -q "relit sa propre position" commun/niveau-agence.md'
fi
if [[ $T == chrono || $T == tout ]]; then
  verifie "chrono : aucune promesse d'\''une heure" '! grep -rnE "ligne en une heure|tient en une heure|environ une heure|60 minutes de travail de$|conception en une heure" commun/*.md skills/*/SKILL.md'
  verifie "chrono : durées dites visées" 'grep -q "jamais été chronométré de bout en bout" commun/parcours.md && grep -q "7 min 01" commun/parcours.md'
fi
echo "procédure : $ok ok, $ko échec(s)"; [ $ko = 0 ]
