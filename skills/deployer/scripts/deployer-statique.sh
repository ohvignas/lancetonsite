#!/usr/bin/env bash
# Lance ton site — construit puis envoie un site statique vers un VPS (Caddy).
# Usage : deployer-statique.sh <domaine> <ip> [dossier_build] [utilisateur]
#   À lancer depuis le dossier du site (projet-site/site/). Au premier déploiement, Lance ton site
#   copie ce script dans projet-site/site/scripts/ : la mise à jour devient alors
#   « bash scripts/deployer-statique.sh exemple.fr 1.2.3.4 ».
#   Site HTML pur sans étape de build : passer « . » comme dossier_build.
#   Parcours direct ou express : passer « ../public », la copie sans les fichiers de travail.
set -euo pipefail

DOMAINE="${1:?Usage: deployer-statique.sh <domaine> <ip> [dossier_build] [utilisateur]}"
IP="${2:?IP du VPS manquante}"
UTILISATEUR="${4:-deploy}"

if [ -f package.json ] && grep -q '"build"' package.json; then
  echo "→ Construction (npm run build)"
  npm run build
fi

SORTIE="${3:-}"
if [ -z "$SORTIE" ]; then
  for d in dist _site out build public; do
    # Avec un package.json, public/ est un dossier source (Astro, Vite) : on l'ignore.
    if [ -f package.json ] && [ "$d" = "public" ]; then continue; fi
    if [ -d "$d" ]; then SORTIE="$d"; break; fi
  done
fi
if [ -z "$SORTIE" ] && [ -f index.html ]; then SORTIE="."; fi
[ -n "$SORTIE" ] && [ -d "$SORTIE" ] || { echo "✗ Dossier de build introuvable. Préciser le 3e argument (ex. dist, ou . pour un site HTML pur)." >&2; exit 1; }
[ -f "$SORTIE/index.html" ] || { echo "✗ Pas de index.html dans $SORTIE" >&2; exit 1; }

echo "→ Envoi de $SORTIE/ vers $UTILISATEUR@$IP:/var/www/$DOMAINE/"
rsync -az --delete --human-readable \
  --exclude '.git' --exclude '.lancetonsite' --exclude 'node_modules' --exclude '.env*' \
  --exclude 'scripts' --exclude '.DS_Store' \
  -e "ssh -o StrictHostKeyChecking=accept-new" \
  "$SORTIE"/ "$UTILISATEUR@$IP:/var/www/$DOMAINE/"

echo "→ Rechargement de Caddy"
ssh "$UTILISATEUR@$IP" 'sudo -n systemctl reload caddy' 2>/dev/null \
  || echo "  (rechargement ignoré : Caddy sert déjà les nouveaux fichiers)"

echo "→ Vérification"
CODE=$(curl -s -o /dev/null -w '%{http_code}' "https://$DOMAINE/" || true)
echo "  https://$DOMAINE/ → $CODE"
if [ "$CODE" = "200" ]; then echo "✓ En ligne"; else echo "✗ Réponse inattendue : lancer /lancetonsite:deployer diagnostic" >&2; exit 1; fi
