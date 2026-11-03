#!/usr/bin/env bash
# Lance ton site — génère une image via l'API OpenRouter et l'enregistre.
# Usage : openrouter-image.sh "<prompt>" <sortie.png> [ratio=16:9] [modele] [image_reference]
# Requiert : OPENROUTER_API_KEY (variable d'environnement, jamais écrite dans un fichier
# versionné), curl, python3.
set -euo pipefail

PROMPT="${1:?Usage: openrouter-image.sh \"<prompt>\" <sortie.png> [ratio] [modele] [reference]}"
SORTIE="${2:?Fichier de sortie manquant}"
RATIO="${3:-16:9}"
MODELE="${4:-google/gemini-3.1-flash-image}"
REF="${5:-}"
: "${OPENROUTER_API_KEY:?Définir OPENROUTER_API_KEY (https://openrouter.ai/keys)}"

TMP=$(mktemp -d); trap 'rm -rf "$TMP"' EXIT

PROMPT="$PROMPT" RATIO="$RATIO" MODELE="$MODELE" REF="$REF" python3 - > "$TMP/corps.json" <<'EOF'
import base64, json, mimetypes, os, sys
corps = {"model": os.environ["MODELE"], "prompt": os.environ["PROMPT"],
         "aspect_ratio": os.environ["RATIO"]}
ref = os.environ.get("REF")
if ref:
    if ref.startswith("http"):
        url = ref
    else:
        if not os.path.exists(ref):
            sys.exit(f"Image de référence introuvable : {ref}")
        mime = mimetypes.guess_type(ref)[0] or "image/png"
        url = f"data:{mime};base64," + base64.b64encode(open(ref, "rb").read()).decode()
    corps["input_references"] = [{"type": "image_url", "image_url": {"url": url}}]
json.dump(corps, sys.stdout)
EOF

curl -sS https://openrouter.ai/api/v1/images \
  -H "Authorization: Bearer $OPENROUTER_API_KEY" \
  -H "Content-Type: application/json" \
  --data-binary @"$TMP/corps.json" > "$TMP/reponse.json"

SORTIE="$SORTIE" python3 - "$TMP/reponse.json" <<'EOF'
import base64, json, os, sys
r = json.load(open(sys.argv[1]))
if not r.get("data"):
    sys.exit("Erreur OpenRouter : " + json.dumps(r.get("error", r), ensure_ascii=False)[:500])
open(os.environ["SORTIE"], "wb").write(base64.b64decode(r["data"][0]["b64_json"]))
cout = r.get("usage", {}).get("cost")
print("✓", os.environ["SORTIE"], f"(coût : {cout} $)" if cout is not None else "")
EOF
