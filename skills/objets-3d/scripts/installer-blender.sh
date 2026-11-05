#!/usr/bin/env bash
# Trouve Blender, ou dit comment l'installer. N'installe RIEN sans --installer (et seulement après le oui de l'utilisateur).
#   bash installer-blender.sh             → affiche le chemin de Blender, ou la commande d'installation
#   bash installer-blender.sh --installer → installe (brew / winget / snap)
set -uo pipefail
trouver() {
  for b in "$(command -v blender 2>/dev/null)" /Applications/Blender.app/Contents/MacOS/Blender \
           "$HOME/Applications/Blender.app/Contents/MacOS/Blender" /snap/bin/blender /usr/bin/blender \
           "/c/Program Files/Blender Foundation/"*/blender.exe; do
    [ -n "$b" ] && [ -x "$b" ] && { echo "$b"; return 0; }
  done; return 1
}
if B=$(trouver); then
  echo "BLENDER=$B"
  "$B" -b --factory-startup --version 2>/dev/null | head -1 \
    || echo "(Blender trouvé mais ne démarre pas : code 139 = bac à sable, relancer sans bac à sable)"
  exit 0
fi
case "$(uname -s)" in
  Darwin) CMD="brew install --cask blender" ;;
  Linux)  CMD="sudo snap install blender --classic" ;;
  MINGW*|MSYS*|CYGWIN*) CMD="winget install -e --id BlenderFoundation.Blender" ;;
  *) CMD="" ;;
esac
if [ -z "$CMD" ]; then echo "Système non reconnu : télécharger Blender sur https://www.blender.org/download/"; exit 2; fi
if [ "${1:-}" = "--installer" ]; then
  echo "Installation : $CMD"; eval "$CMD" && trouver && exit 0; exit 1
fi
echo "Blender introuvable. Commande d'installation (environ 1 Go, gratuit, GPL) :"; echo "  $CMD"; exit 2
