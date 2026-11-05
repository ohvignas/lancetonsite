"""
Ciste — le coffret découverte et les fioles de matières, rendus dans Blender (Cycles), même studio que le flacon.

    blender -b --factory-startup --python outils/blender/objets.py -- fioles  <dossier> [largeur=480] [echantillons=96]
    blender -b --factory-startup --python outils/blender/objets.py -- coffret <sortie.png> [largeur=1080] [echantillons=128]

  fioles   une fiole de 2 ml par matière de donnees.js (jus = couleur de la matière, fond = sa teinte), 4:5,
           <dossier>/fiole-<id>.png
  coffret  le plateau vert, l'insert crème, les cinq fioles des parfums, le couvercle debout derrière
           (impression : outils/blender/etiquettes/couvercle.png, `node outils/blender/etiquettes.cjs couvercle`), 3:2
"""
import os, re, sys

ICI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.normpath(os.path.join(ICI, "..", "..", "..", "..", "..", "..", "objets-3d", "scripts")))
from lib3d import *  # noqa: E402,F401

a = sys.argv[sys.argv.index("--") + 1:]
MODE, SORTIE = a[0], os.path.abspath(a[1])
SRC = open(os.path.join(ICI, "..", "..", "donnees.js"), encoding="utf-8").read()
JUS = dict(re.findall(r'id: "(\w+)".*?liquide: "(#\w+)"', SRC, re.S))
MATIERES = re.findall(r'\{ id: "(\w+)", nom: "[^"]+", lieu: "[^"]+", couleur: "(#\w+)", fond: "(#\w+)" \}', SRC)

# fiole de 2 ml (1 unité ≈ 2,2 cm, comme le flacon) : verre fin, épaule, col ; bouchon céramique vert arrondi
EXT = [(0, 0), (0.2, 0), (0.25, 0.02), (0.268, 0.07), (0.27, 0.15), (0.27, 1.12), (0.262, 1.2), (0.23, 1.26), (0.18, 1.3),
       (0.17, 1.34), (0.17, 1.46), (0.16, 1.47)]
INT = [(0.125, 1.47), (0.13, 1.45), (0.13, 1.33), (0.16, 1.29), (0.21, 1.24), (0.243, 1.17), (0.248, 1.1), (0.248, 0.14),
       (0.24, 0.09), (0.2, 0.065), (0, 0.06)]
LIQ = lambda h=0.92: [(0, 0.054), (0.2, 0.059), (0.242, 0.086), (0.254, 0.14), (0.254, h - 0.02), (0.24, h), (0, h)]
BOU = [(0, 1.36), (0.2, 1.36), (0.215, 1.38), (0.222, 1.42), (0.222, 1.74), (0.212, 1.8), (0.18, 1.83), (0, 1.835)]


def fiole(nom, jus_hex, x=0.0, y=0.0, z=0.0, niveau=0.92, echelle=1.0, densite=1.0):
    v = tourner(nom + "-verre", adoucir(EXT, 8) + adoucir(INT, 6), 160)
    j = tourner(nom + "-jus", adoucir(LIQ(niveau), 6), 160)
    normales_dehors(j)                      # sinon le jus fait lentille divergente (noyau sombre)
    b = tourner(nom + "-bouchon", adoucir(BOU, 8), 160)
    v.data.materials.append(verre("verre-" + nom, densite=0.6))
    j.data.materials.append(liquide("jus-" + nom, jus_hex, epaisseur=0.5, densite=densite))
    b.data.materials.append(laque("ceramique-" + nom, "#2c3a31"))
    for o in (v, j, b): o.location = (x, y, z); o.scale = (echelle,) * 3
    return [v, j, b]


if MODE == "fioles":
    LARGEUR = int(a[2]) if len(a) > 2 else 480
    ECH = int(a[3]) if len(a) > 3 else 96
    os.makedirs(SORTIE, exist_ok=True)
    for mid, couleur, fond in MATIERES:
        scene_vide()
        pieces = fiole("Fiole", couleur)
        f = cyclo(fond)
        eclairage_produit(pieces, f, centre_z=0.85, hauteur=1.85, transparent=True, niveau_liquide=0.95, bas_carte=0.12, drapeau_culot=False)
        appareil(focale=100, loc=(0, -8.4, 1.5), cible=(0, 0, 0.88), mise_au_point=(0, -0.27, 0.9), ouverture=5.6)
        reglages_rendu(os.path.join(SORTIE, "fiole-" + mid + ".png"), largeur=LARGEUR, ratio=1.25, echantillons=ECH)
        bpy.ops.render.render(write_still=True)

if MODE == "coffret":
    LARGEUR = int(a[2]) if len(a) > 2 else 1080
    ECH = int(a[3]) if len(a) > 3 else 128
    scene_vide()
    vert = laque("carton-vert", "#2c3a31", rugosite=0.55)
    creme = principled("insert", **{"Base Color": (*lin("#ece5d3"), 1), "Roughness": 0.8})[0]
    # plateau : boîte aux arêtes arrondies, insert crème posé dedans
    bpy.ops.mesh.primitive_cube_add(size=1, location=(0, 0, 0.15)); plateau = bpy.context.active_object
    plateau.name = "Plateau"; plateau.scale = (3.5, 1.0, 0.3); bpy.ops.object.transform_apply(scale=True)
    arrondir(plateau, rayon=0.035, segments=5); plateau.data.materials.append(vert)
    bpy.ops.mesh.primitive_cube_add(size=1, location=(0, -0.02, 0.305)); insert = bpy.context.active_object
    insert.name = "Insert"; insert.scale = (3.3, 0.82, 0.02); bpy.ops.object.transform_apply(scale=True)
    arrondir(insert, rayon=0.008, segments=3); insert.data.materials.append(creme)
    # dos crème derrière les fioles : les jus se lisent sur du clair, pas sur le vert du couvercle
    bpy.ops.mesh.primitive_cube_add(size=1, location=(0, 0.36, 0.78)); dos = bpy.context.active_object
    dos.name = "Dos"; dos.scale = (3.3, 0.06, 0.96); bpy.ops.object.transform_apply(scale=True)
    # carton crème rétroéclairé, comme un présentoir de parfumerie : les jus s'allument par transparence
    dm, db = principled("dos-lumineux", **{"Base Color": (*lin("#ece5d3"), 1), "Roughness": 0.8,
                                           "Emission Color": (*lin("#f3ecdc"), 1), "Emission Strength": 1.1})
    arrondir(dos, rayon=0.02, segments=4); dos.data.materials.append(dm)
    # couvercle debout derrière, légèrement incliné, face imprimée
    bpy.ops.mesh.primitive_cube_add(size=1, location=(0, 0.62, 1.5)); couv = bpy.context.active_object
    couv.name = "Couvercle"; couv.scale = (3.6, 0.1, 2.6); bpy.ops.object.transform_apply(scale=True)
    arrondir(couv, rayon=0.03, segments=4); couv.data.materials.append(vert)
    bpy.ops.mesh.primitive_plane_add(size=1, location=(0, 0.569, 1.5)); face = bpy.context.active_object
    face.name = "Impression"; face.scale = (3.56, 2.56, 1); face.rotation_euler = (math.pi / 2, 0, 0)
    imp, b = principled("impression", **{"Roughness": 0.6})
    t = imp.node_tree.nodes.new("ShaderNodeTexImage"); t.image = bpy.data.images.load(os.path.join(ICI, "etiquettes", "couvercle.png"))
    imp.node_tree.links.new(t.outputs["Color"], b.inputs["Base Color"]); face.data.materials.append(imp)
    for o in (couv, face):
        o.rotation_euler.x += math.radians(-7) if o is couv else math.radians(-7)
    pieces = [plateau, insert, dos, couv, face]
    for i, pid in enumerate(["restanque", "mistral", "centifolia", "nuitee", "garrigue"]):
        pieces += fiole("Fiole-" + pid, JUS[pid], x=(i - 2) * 0.6, y=-0.02, z=0.0, niveau=1.1, echelle=0.8, densite=0.8)
    f = cyclo("#e3e5df")
    eclairage_produit(pieces, f, centre_z=1.2, hauteur=2.9, transparent=True, niveau_liquide=1.05, bas_carte=0.42, drapeau_culot=False)
    appareil(focale=85, loc=(0, -15.5, 4.2), cible=(0, 0, 1.15), mise_au_point=(0, -0.1, 1.0), ouverture=8)
    reglages_rendu(SORTIE, largeur=LARGEUR, ratio=2 / 3, echantillons=ECH)
    bpy.ops.render.render(write_still=True)
