"""
Ciste : modélise le flacon dans Blender (sans interface) et l'exporte en glTF binaire.

    blender -b --factory-startup --python outils/blender/flacon.py -- modeles/flacon.glb [apercu.png]

Trois objets nommés, en coordonnées du monde (origine au pied du flacon, unité = celle de flacon3d.js) :
  Verre    corps tourné, profil PROFIL_VERRE passé en spline (le liquide et l'étiquette du code s'y logent)
  Bague    collier en laiton moleté (120 stries), arêtes chanfreinées
  Bouchon  galet lisse, profil en spline (aucune facette visible)
Les matériaux restent dans le code (three.js) : le .glb ne porte que la forme.
"""
import bpy, bmesh, sys, math, os

args = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
SORTIE = os.path.abspath(args[0] if args else "flacon.glb")
APERCU = os.path.abspath(args[1]) if len(args) > 1 else None

bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene

PROFIL_VERRE = [(0, 0), (0.86, 0), (1.06, 0.03), (1.15, 0.12), (1.185, 0.3), (1.19, 0.6), (1.19, 2.3),
    (1.18, 2.52), (1.13, 2.74), (1.02, 2.92), (0.82, 3.06), (0.58, 3.15), (0.4, 3.2), (0.34, 3.26),
    (0.33, 3.62), (0, 3.62)]
PROFIL_BOUCHON = [(0, 3.4), (0.5, 3.4), (0.62, 3.44), (0.68, 3.56), (0.7, 3.8), (0.69, 4.12), (0.63, 4.36),
    (0.5, 4.52), (0.3, 4.6), (0, 4.62)]


def adoucir(profil, n=8):
    """Profil passé en spline (Catmull-Rom centripète simplifiée) : la silhouette ne montre plus de cassures."""
    P = [profil[0]] + list(profil) + [profil[-1]]; out = []
    for i in range(1, len(P) - 2):
        p0, p1, p2, p3 = P[i - 1], P[i], P[i + 1], P[i + 2]
        for k in range(n):
            t = k / n; t2, t3 = t * t, t * t * t
            out.append(tuple(0.5 * (2 * p1[j] + (-p0[j] + p2[j]) * t + (2 * p0[j] - 5 * p1[j] + 4 * p2[j] - p3[j]) * t2
                                    + (-p0[j] + 3 * p1[j] - 3 * p2[j] + p3[j]) * t3) for j in (0, 1)))
    out.append(profil[-1]); return out


def tourner(nom, profil, pas, lisse=True):
    """Fait tourner un profil (rayon, hauteur) autour de l'axe vertical : l'équivalent Blender de LatheGeometry."""
    me = bpy.data.meshes.new(nom)
    bm = bmesh.new()
    verts = [bm.verts.new((r, 0, z)) for r, z in profil]
    edges = [bm.edges.new((verts[i], verts[i + 1])) for i in range(len(verts) - 1)]
    bmesh.ops.spin(bm, geom=verts + edges, cent=(0, 0, 0), axis=(0, 0, 1), angle=2 * math.pi, steps=pas, use_merge=True)
    bmesh.ops.remove_doubles(bm, verts=bm.verts, dist=1e-5)  # referme les pôles sur l'axe
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    bm.to_mesh(me); bm.free()
    for p in me.polygons: p.use_smooth = lisse
    ob = bpy.data.objects.new(nom, me)
    scene.collection.objects.link(ob)
    return ob


def chanfrein(ob, largeur, segments=2, angle=30):
    m = ob.modifiers.new("Chanfrein", "BEVEL")
    m.width = largeur; m.segments = segments; m.limit_method = "ANGLE"
    m.angle_limit = math.radians(angle); m.harden_normals = True


# 1. le verre : le profil du code, en 160 pas, lissé
verre = tourner("Verre", adoucir(PROFIL_VERRE, 3), 128)

# 2. le bouchon : galet lisse (profil en spline, 96 pas, ombrage lisse) : aucune facette visible
bouchon = tourner("Bouchon", adoucir(PROFIL_BOUCHON, 4), 72)

# 3. la bague : collier moleté (un sommet sur deux poussé vers l'extérieur), centré en z = 3.33
me = bpy.data.meshes.new("Bague")
bm = bmesh.new()
N, R, H, Z = 120, 0.43, 0.16, 3.33
bmesh.ops.create_cone(bm, cap_ends=True, segments=N, radius1=R, radius2=R, depth=H)
for v in bm.verts:
    if abs(v.co.z) > 1e-6 and (v.co.x or v.co.y):
        a = math.atan2(v.co.y, v.co.x)
        k = round(a / (2 * math.pi / N)) % 2
        f = (R + (0.012 if k else -0.004)) / math.hypot(v.co.x, v.co.y)
        v.co.x *= f; v.co.y *= f
    v.co.z += Z
bm.to_mesh(me); bm.free()
bague = bpy.data.objects.new("Bague", me)
scene.collection.objects.link(bague)
chanfrein(bague, 0.01, segments=1, angle=60)

# appliquer les modificateurs : le .glb porte la forme finale
bpy.context.view_layer.update()
for ob in (bouchon, bague):
    bpy.context.view_layer.objects.active = ob
    ob.select_set(True)
    for m in list(ob.modifiers):
        bpy.ops.object.modifier_apply(modifier=m.name)
    ob.select_set(False)

os.makedirs(os.path.dirname(SORTIE), exist_ok=True)
bpy.ops.export_scene.gltf(filepath=SORTIE, export_format="GLB", use_selection=False, export_apply=True,
                          export_yup=True, export_normals=True, export_materials="NONE", export_texcoords=False)
print("EXPORT", SORTIE, os.path.getsize(SORTIE), "octets")
for ob in (verre, bague, bouchon):
    print(" ", ob.name, len(ob.data.vertices), "sommets", len(ob.data.polygons), "faces")

# aperçu facultatif rendu dans Blender (Cycles) : contrôle visuel de la forme, avec des matériaux proches du site
if APERCU:
    def mat(nom, **p):
        m = bpy.data.materials.new(nom); m.use_nodes = True
        b = m.node_tree.nodes["Principled BSDF"]
        for k, v in p.items(): b.inputs[k].default_value = v
        return m
    verre.data.materials.append(mat("verre", **{"Transmission Weight": 1.0, "Roughness": 0.02, "IOR": 1.5}))
    bague.data.materials.append(mat("laiton", **{"Base Color": (0.48, 0.27, 0.08, 1), "Metallic": 1.0, "Roughness": 0.28}))
    bouchon.data.materials.append(mat("ceramique", **{"Base Color": (0.025, 0.045, 0.03, 1), "Roughness": 0.3, "Coat Weight": 0.7}))
    bpy.ops.mesh.primitive_cylinder_add(radius=1.06, depth=1.9, location=(0, 0, 1.4))
    liq = bpy.context.active_object
    liq.data.materials.append(mat("liquide", **{"Base Color": (0.4, 0.37, 0.05, 1), "Roughness": 0.15}))
    bpy.ops.mesh.primitive_plane_add(size=40, location=(0, 0, 0))
    bpy.context.active_object.data.materials.append(mat("sol", **{"Base Color": (0.76, 0.78, 0.74, 1), "Roughness": 0.9}))
    w = bpy.data.worlds.new("monde"); scene.world = w; w.use_nodes = True
    w.node_tree.nodes["Background"].inputs[0].default_value = (0.76, 0.78, 0.74, 1)
    w.node_tree.nodes["Background"].inputs[1].default_value = 0.8
    for loc, e in (((-5, -7, 8), 900), ((6, 6, 4), 500)):
        bpy.ops.object.light_add(type="AREA", location=loc)
        l = bpy.context.active_object; l.data.energy = e; l.data.size = 4
        l.rotation_euler = (0, 0, 0); c = l.constraints.new("TRACK_TO"); c.target = verre
    bpy.ops.object.camera_add(location=(0, -16, 4.2))
    cam = bpy.context.active_object; cam.data.lens = 70
    c = cam.constraints.new("TRACK_TO"); c.target = verre
    scene.camera = cam
    bpy.ops.object.empty_add(location=(0, 0, 2.3)); c.target = bpy.context.active_object
    scene.render.engine = "CYCLES"; scene.cycles.samples = 48; scene.cycles.device = "CPU"
    scene.render.resolution_x, scene.render.resolution_y = 600, 800
    scene.render.filepath = APERCU
    bpy.ops.render.render(write_still=True)
    print("APERCU", APERCU)
