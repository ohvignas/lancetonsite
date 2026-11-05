"""
Ciste — photo produit réaliste d'un parfum, rendue dans Blender (Cycles), sans interface.

    blender -b --factory-startup --python outils/blender/studio.py -- <id> <sortie.png> [largeur=3072] [echantillons=256]

Le flacon, les matières et le studio sont ceux du skill objets-3d (skills/objets-3d/scripts/exemple.py et lib3d.py) :
ce script ne fait que choisir le parfum (couleur du jus lue dans donnees.js, étiquette rendue par etiquettes.cjs).
"""
import os, re, runpy, sys

ICI = os.path.dirname(os.path.abspath(__file__))
a = sys.argv[sys.argv.index("--") + 1:]
ID, SORTIE = a[0], os.path.abspath(a[1])
LARGEUR = a[2] if len(a) > 2 else "3072"
ECH = a[3] if len(a) > 3 else "256"

src = open(os.path.join(ICI, "..", "..", "donnees.js"), encoding="utf-8").read()
os.environ["JUS"] = dict(re.findall(r'id: "(\w+)".*?liquide: "(#\w+)"', src, re.S))[ID]
os.environ["ETIQUETTE"] = os.path.join(ICI, "etiquettes", ID + ".png")

EXEMPLE = os.path.normpath(os.path.join(ICI, "..", "..", "..", "..", "..", "..", "objets-3d", "scripts", "exemple.py"))
sys.argv = [sys.argv[0], "--", "photo", SORTIE, LARGEUR, ECH]
runpy.run_path(EXEMPLE, run_name="__main__")
print("RENDU", ID, SORTIE)
