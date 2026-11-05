"""
lib3d — boîte à outils Blender (bpy) de Lance ton site, pour des objets 3D lisses et des photos produit
qui passent pour de vraies photos. Utilisée par les scripts d'objet (voir exemple.py) :

    import sys, os; sys.path.insert(0, "<dossier de ce fichier>"); from lib3d import *

Tout tourne sans interface :  blender -b --factory-startup --python mon_objet.py -- <arguments>
Testé sur Blender 5.2 LTS (Cycles, GPU Metal / CUDA / OptiX, sinon CPU).

Recettes reprises et adaptées de :
- cc-blender-skill (RobLe3, licence MIT) : verre à absorption de volume, éclairage produit, Cycles + débruitage + AgX ;
- doc Blender (light linking 4.0+, Principled BSDF, glTF) ;
- photographie produit de parfum (bandes, drapeaux noirs, contre-jour, cyclo) ;
- conseils BlenderArtists / Blender StackExchange (liquide qui déborde dans le verre, volume_bounces, MULTI_GGX).
"""
import bpy, bmesh, math, os
from mathutils import Vector

# ------------------------------------------------------------------------------------------------ bases

def scene_vide():
    """Repart d'une scène vide (sans cube ni lampe par défaut) et la renvoie."""
    bpy.ops.wm.read_factory_settings(use_empty=True)
    return bpy.context.scene


def lin(hexa):
    """Couleur hex sRGB (#rrggbb) → tuple linéaire (ce qu'attendent les nœuds)."""
    h = hexa.lstrip("#"); c = [int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)]
    return tuple(((x + 0.055) / 1.055) ** 2.4 if x > 0.04045 else x / 12.92 for x in c)


def viser(ob, cible):
    """Oriente un objet (lampe, appareil, plan) pour que son axe -Z regarde la cible."""
    d = (Vector(cible) - ob.location).normalized()
    ob.rotation_euler = d.to_track_quat("-Z", "Y").to_euler()


# ------------------------------------------------------------------------------------------------ formes lisses

def adoucir(profil, n=8):
    """Passe un profil (rayon, hauteur) en spline Catmull-Rom : plus aucune cassure dans la silhouette.
    n = points ajoutés par segment (8 pour une photo, 3 à 4 pour un .glb web)."""
    P = [profil[0]] + list(profil) + [profil[-1]]; out = []
    for i in range(1, len(P) - 2):
        p0, p1, p2, p3 = P[i - 1], P[i], P[i + 1], P[i + 2]
        for k in range(n):
            t = k / n; t2, t3 = t * t, t * t * t
            out.append(tuple(0.5 * (2 * p1[j] + (-p0[j] + p2[j]) * t + (2 * p0[j] - 5 * p1[j] + 4 * p2[j] - p3[j]) * t2
                                    + (-p0[j] + 3 * p1[j] - 3 * p2[j] + p3[j]) * t3) for j in (0, 1)))
    out.append(profil[-1]); return out


def tourner(nom, profil, pas=192, lisse=True, scene=None):
    """Fait tourner un profil (rayon, hauteur) autour de Z : flacon, bol, vase, bouchon, pied de lampe…
    pas = 192 pour une photo, 64 à 128 pour le web. Ombrage lisse par défaut (jamais de facettes)."""
    sc = scene or bpy.context.scene
    me = bpy.data.meshes.new(nom); bm = bmesh.new()
    vs = [bm.verts.new((r, 0, z)) for r, z in profil]
    es = [bm.edges.new((vs[i], vs[i + 1])) for i in range(len(vs) - 1)]
    bmesh.ops.spin(bm, geom=vs + es, cent=(0, 0, 0), axis=(0, 0, 1), angle=2 * math.pi, steps=pas, use_merge=True)
    bmesh.ops.remove_doubles(bm, verts=bm.verts, dist=1e-5)  # referme les pôles sur l'axe
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    bm.to_mesh(me); bm.free()
    for p in me.polygons: p.use_smooth = lisse
    ob = bpy.data.objects.new(nom, me); sc.collection.objects.link(ob)
    return ob


def normales_dehors(ob):
    """Retourne les normales d'un solide fermé si elles pointent vers l'intérieur (volume signé négatif).
    Indispensable pour un liquide : normales inversées = Cycles croit sortir quand il entre, le jus devient une
    lentille divergente (noyau sombre « en porte » au centre, étiquette du dos vue en petit et sans teinte).
    `tourner()` peut produire un liquide retourné (recalc_face_normals se trompe sur ces profils). Renvoie True si retourné."""
    me = ob.data; me.calc_loop_triangles(); V = me.vertices
    vol = sum(V[t.vertices[0]].co.dot(V[t.vertices[1]].co.cross(V[t.vertices[2]].co)) for t in me.loop_triangles) / 6
    if vol < 0:
        me.flip_normals(); me.update()
    return vol < 0


def arrondir(ob, rayon=0.02, segments=4, subdiv=0):
    """Pour une forme non tournée (boîte, sachet, carte) : arêtes arrondies (Bevel) + lissage pondéré,
    et subdivision optionnelle. Aucune arête vive : une arête vive « fait 3D » au premier regard."""
    b = ob.modifiers.new("arrondi", "BEVEL"); b.width = rayon; b.segments = segments; b.limit_method = "ANGLE"
    b.harden_normals = True
    if subdiv:
        s = ob.modifiers.new("lisse", "SUBSURF"); s.levels = s.render_levels = subdiv
    for p in ob.data.polygons: p.use_smooth = True
    return ob


def etiquette_arc(nom, image_path, rayon, hauteur, z, demi_angle=0.5, epaisseur=0.015, creme="#f8f3ea", dos="#d8cdbb", lumiere_dos=1.6):
    """Étiquette papier posée sur un corps cylindrique : arc face à l'appareil (-Y) de ±demi_angle rad,
    UV par construction (u = angle, v = hauteur), tranche réelle (Solidify), dos kraft vu par réflexion interne.
    rayon = rayon extérieur du verre + 0,0035 (le papier pose, sans jour). Image : rendue depuis le HTML de la charte.
    lumiere_dos : le dos, vu de l'autre côté à travers le liquide, n'est éclairé dans Cycles que par des caustiques
    (la lumière directe ne traverse pas le verre) : il sort sombre et se lit comme un cadre vide. Une émission (1,6)
    de sa propre teinte rend la lumière transmise ; elle ne se voit que flacon de dos (la face avant n'en a pas)."""
    bpy.ops.mesh.primitive_cylinder_add(vertices=256, radius=rayon, depth=hauteur, location=(0, 0, z), end_fill_type="NOTHING")
    et = bpy.context.active_object; et.name = nom
    bm = bmesh.new(); bm.from_mesh(et.data)
    bmesh.ops.delete(bm, geom=[f for f in bm.faces
                               if abs(math.atan2(f.calc_center_median().x, -f.calc_center_median().y)) > demi_angle], context="FACES")
    uv = bm.loops.layers.uv.active or bm.loops.layers.uv.new()
    for f in bm.faces:
        for l in f.loops:
            l[uv].uv = (math.atan2(l.vert.co.x, -l.vert.co.y) / (2 * demi_angle) + 0.5, l.vert.co.z / hauteur + 0.5)
    bm.to_mesh(et.data); bm.free()
    for p in et.data.polygons: p.use_smooth = True
    so = et.modifiers.new("epaisseur", "SOLIDIFY"); so.thickness = epaisseur; so.offset = 1; so.material_offset = 1
    et.data.materials.append(papier_imprime(nom + "-papier", image_path, creme))
    et.data.materials.append(principled(nom + "-dos", **{"Base Color": (*lin(dos), 1), "Roughness": 0.8,
                                                        "Emission Color": (*lin(dos), 1), "Emission Strength": lumiere_dos})[0])
    return et


def bague_moletee(nom, rayon, hauteur, z, stries=360, relief=0.003, materiau=None):
    """Bague métal moletée (col de flacon, molette, couronne de montre) : stries fines, arêtes cassées."""
    bm = bmesh.new()
    bmesh.ops.create_cone(bm, cap_ends=True, segments=stries, radius1=rayon, radius2=rayon, depth=hauteur)
    for v in bm.verts:
        d = math.hypot(v.co.x, v.co.y)
        if abs(v.co.z) > 1e-6 and d > 0.1:
            k = round(math.atan2(v.co.y, v.co.x) / (2 * math.pi / stries)) % 2
            f = (rayon + (relief if k else -relief / 3)) / d; v.co.x *= f; v.co.y *= f
        v.co.z += z
    me = bpy.data.meshes.new(nom); bm.to_mesh(me); bm.free()
    ob = bpy.data.objects.new(nom, me); bpy.context.scene.collection.objects.link(ob)
    b = ob.modifiers.new("arrondi", "BEVEL"); b.width = 0.008; b.limit_method = "ANGLE"
    ob.data.materials.append(materiau or metal(nom + "-metal"))
    return ob


# ------------------------------------------------------------------------------------------------ matières

def principled(nom, **p):
    """Matériau Principled BSDF avec ses entrées par nom : principled("laiton", **{"Metallic": 1, "Roughness": .25})."""
    m = bpy.data.materials.new(nom); m.use_nodes = True
    b = m.node_tree.nodes["Principled BSDF"]
    for k, v in p.items(): b.inputs[k].default_value = v
    return m, b


def volume(m, couleur, densite):
    """Couleur dans la masse (verre teinté, liquide) : Volume Absorption branché sur la sortie Volume.
    La teinte dépend alors de l'épaisseur traversée, comme dans le réel. Jamais de couleur sur la surface."""
    n = m.node_tree.nodes.new("ShaderNodeVolumeAbsorption")
    n.inputs["Color"].default_value = (*couleur, 1); n.inputs["Density"].default_value = densite
    m.node_tree.links.new(n.outputs["Volume"], m.node_tree.nodes["Material Output"].inputs["Volume"])


def verre(nom="verre", teinte=(0.80, 0.93, 0.88), densite=1.2, ior=1.52, rugosite=0.012, dispersion=0.035):
    """Verre épais réaliste : transmission 1, MULTI_GGX, léger vert dans la masse (visible dans le culot)."""
    m, b = principled(nom, **{"Base Color": (0.96, 0.985, 0.975, 1), "Roughness": rugosite, "IOR": ior,
                              "Transmission Weight": 1.0, "Specular IOR Level": 0.5})
    b.distribution = "MULTI_GGX"
    if "Dispersion" in b.inputs: b.inputs["Dispersion"].default_value = dispersion
    volume(m, teinte, densite)
    return m


def liquide(nom, couleur_hex, densite=1.0, ior=1.36, epaisseur=2.0):
    """Liquide coloré (parfum, huile, sirop). Le maillage doit DÉBORDER de 0,005 dans le verre (pas de film d'air).
    La couleur hex est celle qu'on veut VOIR au centre, à travers `epaisseur` unités de liquide, sur fond blanc.
    Cycles absorbe (1 - couleur) x densité par unité : passer la couleur telle quelle grise les teintes sombres
    (un ambre devient mauve). On calcule donc l'absorption par canal : sigma = -ln(couleur) / épaisseur.
    densite = multiplicateur (1 = la couleur voulue au centre, plus = jus plus dense)."""
    m, _ = principled(nom, **{"Base Color": (1, 1, 1, 1), "Roughness": 0.0, "IOR": ior, "Transmission Weight": 1.0})
    couleur, d = absorption(couleur_hex, densite, epaisseur)
    volume(m, couleur, d)
    return m


def absorption(couleur_hex, densite=1.0, epaisseur=2.0):
    """(couleur, densité) du nœud Volume Absorption qui donne `couleur_hex` au centre d'un liquide épais de `epaisseur`."""
    sig = [-math.log(max(c, 0.002)) / epaisseur for c in lin(couleur_hex)]
    smax = max(max(sig), 1e-4)
    return tuple(1 - x / smax for x in sig), smax * densite


def metal(nom, couleur=(0.78, 0.55, 0.26), rugosite=0.28, anisotropie=0.5):
    """Métal (laiton par défaut ; acier : (0.56, 0.57, 0.58))."""
    return principled(nom, **{"Base Color": (*couleur, 1), "Metallic": 1.0, "Roughness": rugosite, "Anisotropic": anisotropie})[0]


def laque(nom, couleur_hex, rugosite=0.18):
    """Céramique, bois laqué, plastique de qualité : couche de vernis (coat) qui donne un reflet net."""
    return principled(nom, **{"Base Color": (*lin(couleur_hex), 1), "Roughness": rugosite, "Coat Weight": 1.0,
                              "Coat Roughness": 0.04, "Specular IOR Level": 0.6})[0]


def papier_imprime(nom, image_path, creme="#f8f3ea"):
    """Étiquette : l'image (UV par construction) multipliée par un papier crème, grain fin en relief.
    Poser sur un maillage avec Solidify 0,010 pour qu'on voie la tranche."""
    m, b = principled(nom, **{"Roughness": 0.62, "Sheen Weight": 0.25}); nt = m.node_tree
    tex = nt.nodes.new("ShaderNodeTexImage"); tex.image = bpy.data.images.load(image_path)
    mx = nt.nodes.new("ShaderNodeMix"); mx.data_type = "RGBA"; mx.blend_type = "MULTIPLY"; mx.inputs["Factor"].default_value = 1
    mx.inputs["B"].default_value = (*lin(creme), 1)
    nt.links.new(tex.outputs["Color"], mx.inputs["A"]); nt.links.new(mx.outputs["Result"], b.inputs["Base Color"])
    g = nt.nodes.new("ShaderNodeTexNoise"); g.inputs["Scale"].default_value = 600; g.inputs["Detail"].default_value = 2
    bp = nt.nodes.new("ShaderNodeBump"); bp.inputs["Strength"].default_value = 0.04
    nt.links.new(g.outputs["Fac"], bp.inputs["Height"]); nt.links.new(bp.outputs["Normal"], b.inputs["Normal"])
    return m


# ------------------------------------------------------------------------------------------------ studio photo

def cyclo(couleur_hex="#e3e5df", rayon=12, monde=0.06, scene=None):
    """Fond de studio en arrondi (sol → courbe → mur), profil fin (240 points) : aucune ligne d'horizon.
    Ombre de contact par Ambient Occlusion dans le matériau : l'objet pose, il ne flotte pas."""
    sc = scene or bpy.context.scene; F = lin(couleur_hex)
    bm = bmesh.new(); prof = []
    for i in range(241):
        t = i / 240
        if t < 0.4: prof.append((-30 + t / 0.4 * 34, 0))
        elif t < 0.75:
            a = (t - 0.4) / 0.35 * math.pi / 2; prof.append((4 + rayon * math.sin(a), rayon - rayon * math.cos(a)))
        else: prof.append((4 + rayon, rayon + (t - 0.75) / 0.25 * 28))
    rang = [[bm.verts.new((x, y, z)) for y, z in prof] for x in (-40, 40)]
    for i in range(len(prof) - 1): bm.faces.new((rang[0][i], rang[1][i], rang[1][i + 1], rang[0][i + 1]))
    me = bpy.data.meshes.new("Cyclo"); bm.to_mesh(me); bm.free()
    for p in me.polygons: p.use_smooth = True
    ob = bpy.data.objects.new("Cyclo", me); sc.collection.objects.link(ob)
    m, b = principled("fond", **{"Base Color": (*F, 1), "Roughness": 0.85}); nt = m.node_tree
    ao = nt.nodes.new("ShaderNodeAmbientOcclusion"); ao.inputs["Distance"].default_value = 0.35
    ao.inputs["Color"].default_value = (*F, 1); nt.links.new(ao.outputs["Color"], b.inputs["Base Color"])
    ob.data.materials.append(m)
    w = bpy.data.worlds.new("monde"); sc.world = w; w.use_nodes = True
    w.node_tree.nodes["Background"].inputs[0].default_value = (*F, 1)
    w.node_tree.nodes["Background"].inputs[1].default_value = monde
    return ob


def collection(nom, objets):
    """Collection de receveurs pour le light linking."""
    c = bpy.data.collections.new(nom)
    for o in objets: c.objects.link(o)
    return c


def _emission_degradee(nt, force, plancher, puissance=0.55):
    """Émission avec point chaud au centre et bords qui retombent (diffuseur de vraie boîte à lumière)."""
    N, L = nt.nodes, nt.links
    tc = N.new("ShaderNodeTexCoord"); mp = N.new("ShaderNodeMapping")
    mp.inputs["Location"].default_value = (-1, -1, 0); mp.inputs["Scale"].default_value = (2, 2, 1)
    gr = N.new("ShaderNodeTexGradient"); gr.gradient_type = "SPHERICAL"
    pw = N.new("ShaderNodeMath"); pw.operation = "POWER"; pw.inputs[1].default_value = puissance
    mr = N.new("ShaderNodeMapRange"); mr.inputs["To Min"].default_value = plancher
    mu = N.new("ShaderNodeMath"); mu.operation = "MULTIPLY"; mu.inputs[1].default_value = force
    em = N.new("ShaderNodeEmission")
    for a, b in ((tc.outputs["UV"], mp.inputs["Vector"]), (mp.outputs[0], gr.inputs["Vector"]), (gr.outputs["Fac"], pw.inputs[0]),
                 (pw.outputs[0], mr.inputs["Value"]), (mr.outputs[0], mu.inputs[0]), (mu.outputs[0], em.inputs["Strength"])):
        L.new(a, b)
    return em


def softbox(nom, loc, larg, haut, force, cible=(0, 0, 2), plancher=0.3, couleur=(1, 0.985, 0.96),
            receveurs=None, reflet=True, refraction=True):
    """Boîte à lumière « vraie » : plan émissif en dégradé, invisible pour l'appareil, lu dans les reflets du verre.
    receveurs = collection → light linking : la lumière n'éclaire que ces objets (Cycles 4.0+).
    reflet / refraction = False pour une lumière qui éclaire sans se voir sur l'objet (débouché, halo)."""
    bpy.ops.mesh.primitive_plane_add(size=1, location=loc)
    o = bpy.context.active_object; o.name = nom; o.scale = (larg, haut, 1); viser(o, cible)
    m = bpy.data.materials.new(nom); m.use_nodes = True; nt = m.node_tree
    nt.nodes.remove(nt.nodes["Principled BSDF"])
    em = _emission_degradee(nt, force, plancher); em.inputs["Color"].default_value = (*couleur, 1)
    nt.links.new(em.outputs[0], nt.nodes["Material Output"].inputs["Surface"])
    o.data.materials.append(m)
    o.visible_camera = False; o.visible_shadow = False
    o.visible_glossy = reflet; o.visible_transmission = refraction
    if receveurs: o.light_linking.receiver_collection = receveurs
    return o


def drapeau(nom, loc, larg=0.6, haut=9):
    """Panneau noir hors champ : le verre le réfracte en filets sombres qui dessinent ses bords."""
    noir = bpy.data.materials.get("noir") or principled("noir", **{"Base Color": (0.004, 0.004, 0.004, 1), "Roughness": 0.9})[0]
    bpy.ops.mesh.primitive_plane_add(size=1, location=loc)
    d = bpy.context.active_object; d.name = nom; d.scale = (larg, 1, haut); d.rotation_euler = (math.pi / 2, 0, 0)
    d.data.materials.append(noir); d.visible_camera = False; d.visible_shadow = False
    return d


def eclairage_produit(objets, fond, centre_z=2.2, hauteur=4.6, transparent=True, niveau_liquide=None, bas_carte=None, drapeau_culot=True,
                      force_carte=5.0, force_remplissage=4.0, force_flancs=8.0, larg_flancs=6.0, y_flancs=1.0):
    """Le schéma complet de photo produit (réglé sur le flacon Ciste, tour 3 de la boucle), mis à l'échelle de l'objet.
    - bandes arrière (bords clairs) et bandes avant (deux reflets verticaux, reflet seul), sur l'objet seul ;
    - strip au-dessus (ligne sur le haut de l'objet), boîte clé devant à gauche (ombre courte, reflet rond : plancher 0) ;
    - halo au-dessus vers le fond (lueur derrière l'objet, sans ligne d'horizon), sur le fond seul ;
    - débouché frontal sans reflet ;
    - drapeaux noirs EN REFLET SEULEMENT (en réfraction, un liquide fait loupe et les grossit en flancs noirs),
      plus deux drapeaux latéraux rasants pour les filets noirs, et une bande noire derrière le culot (fond lourd) ;
    - si l'objet est transparent : carte de contre-jour en dégradé, LIMITÉE À LA HAUTEUR DU LIQUIDE
      (au-dessus, le verre vide montrerait une source blanche ; en dessous d un fond épais, le culot brûle).
      bas_carte : bas de la carte (0,15 × hauteur par défaut, pour un culot épais ; au fond du liquide pour un fond fin)."""
    k = hauteur / 4.6; C = (0, 0, centre_z)
    obj = collection("objet", objets); fd = collection("fond_seul", [fond])
    softbox("bande-g", (-4.6 * k, 6 * k, 3 * k), 1.1 * k, 7.5 * k, 70, cible=C, receveurs=obj)
    softbox("bande-d", (4.6 * k, 6 * k, 3 * k), 1.1 * k, 7.5 * k, 70, cible=C, receveurs=obj)
    softbox("face-g", (-6.5 * k, -3 * k, 3 * k), 0.8 * k, 7 * k, 55, cible=C, plancher=0.05, receveurs=obj, refraction=False)
    softbox("face-d", (6.5 * k, -3 * k, 3 * k), 0.8 * k, 7 * k, 55, cible=C, plancher=0.05, receveurs=obj, refraction=False)
    softbox("strip-haut", (0, -2.5 * k, 10 * k), 7 * k, 0.9 * k, 45, cible=(0, 0, centre_z * 1.6), receveurs=obj, refraction=False)
    softbox("cle", (-6 * k, -5 * k, 9.5 * k), 3.5 * k, 2.5 * k, 30, cible=C, plancher=0.0)  # haute : son reflet reste sur l'épaule vide, pas dans le liquide
    softbox("halo", (0, 2 * k, 11 * k), 9 * k, 6 * k, 50, cible=(0, 16 * k, 5 * k), plancher=0.0, receveurs=fd,
            reflet=False, refraction=False)
    softbox("debouche", (0, -16 * k, 3.5 * k), 10 * k, 6 * k, 11, cible=C, plancher=0.6, reflet=False)
    # remplissage avant, invisible en reflet : les rayons qui ressortent par les flancs du liquide (réflexion totale)
    # trouvent de la lumière au lieu du studio sombre ; sinon deux barres noires sur les flancs
    for nom_, x_ in (("rempl-g", -5 * k), ("rempl-d", 5 * k)):
        softbox(nom_, (x_, -5 * k, 1.6 * k), 3 * k, 3 * k, force_remplissage, cible=(0, 0, 1.5 * k), plancher=0.5, receveurs=obj, reflet=False)
    # cartes latérales, vues seulement À TRAVERS le liquide : par réfraction, les bords d'un cylindre « regardent »
    # les côtés du studio ; sans elles, les flancs du jus sont noirs quelle que soit la densité
    if transparent and force_flancs:
        for nom_, x_ in (("flanc-g", -4 * k), ("flanc-d", 4 * k)):
            softbox(nom_, (x_, y_flancs * k, 1.6 * k), larg_flancs * k, 2.6 * k, force_flancs,
                    cible=(0, 0, 1.6 * k), plancher=0.4, receveurs=obj, reflet=False)
    # douche : petit spot au-dessus et derrière, caustique colorée projetée au sol devant l'objet
    sp = bpy.data.lights.new("douche", "SPOT"); sp.energy = 100 * k * k; sp.spot_size = math.radians(12)
    sp.shadow_soft_size = 0.18 * k; sp.color = (1, 0.97, 0.92)
    so = bpy.data.objects.new("douche", sp); bpy.context.scene.collection.objects.link(so)
    so.location = (1.2 * k, 6 * k, 11 * k); viser(so, (0, -1.8 * k, 0))
    for x in (-2.5 * k, 2.5 * k):
        drapeau("drapeau", (x, 1.9 * k, 2.4 * k), 0.6 * k, 9 * k).visible_transmission = False
    for x in (-3.5 * k, 3.5 * k):
        d = drapeau("drapeau-lateral", (x, -0.5 * k, 2.4 * k), 2 * k, 9 * k)
        d.rotation_euler = (math.pi / 2, 0, math.pi / 2); d.visible_transmission = False; d.visible_diffuse = False
    if transparent:
        if drapeau_culot:  # fond « lourd » ; à couper si l'objet n'a pas d'étiquette (bande sombre vue dans le liquide)
            d = drapeau("drapeau-culot", (0, 1.6 * k, 0.2 * k), 2.4 * k, 0.2 * k)  # ne touche que le fond de verre
            d.visible_diffuse = False  # vu à travers le fond épais : c'est ce qui le rend « lourd »
        haut = niveau_liquide if niveau_liquide else 0.6 * hauteur; bas = bas_carte if bas_carte is not None else 0.15 * hauteur
        bpy.ops.mesh.primitive_plane_add(size=1, location=(0, 2.6 * k, (haut + bas) / 2))
        ca = bpy.context.active_object; ca.name = "Carte"; ca.scale = (14 * k, haut - bas, 1); ca.rotation_euler = (math.pi / 2, 0, 0)
        m = bpy.data.materials.new("carte"); m.use_nodes = True; nt = m.node_tree; nt.nodes.remove(nt.nodes["Principled BSDF"])
        em = _emission_degradee(nt, force_carte, 0.3, puissance=1.0)  # trop fort : AgX délave le jus en crème; em.inputs["Color"].default_value = (1, 0.97, 0.92, 1)
        nt.links.new(em.outputs[0], nt.nodes["Material Output"].inputs["Surface"]); ca.data.materials.append(m)
        ca.visible_camera = False; ca.visible_glossy = False; ca.visible_shadow = False; ca.visible_diffuse = False


def appareil(focale=100, loc=(0, -20.5, 3.6), cible=(0, 0, 2.3), mise_au_point=(0, -1.0, 2.2), ouverture=8, scene=None):
    """Appareil photo produit : longue focale (90-120 mm), à hauteur de l'objet, profondeur de champ légère."""
    sc = scene or bpy.context.scene
    cam = bpy.data.cameras.new("cam"); cam.lens = focale; cam.sensor_width = 36
    cam.dof.use_dof = True; cam.dof.aperture_fstop = ouverture; cam.dof.aperture_blades = 7
    co = bpy.data.objects.new("cam", cam); sc.collection.objects.link(co)
    co.location = loc; viser(co, cible); sc.camera = co
    cam.dof.focus_distance = (co.location - Vector(mise_au_point)).length
    return co


def reglages_rendu(sortie, largeur=1080, ratio=1.25, echantillons=256, scene=None, sequence=False):
    """Cycles photo : GPU si possible, 32 rebonds, caustiques, OIDN précis, AgX. ratio = hauteur / largeur (4:5 → 1.25).
    sequence=True : préréglage des séquences d'images (voir rendre_sequence) : rebonds réduits, seuil adaptatif plus
    large, scène gardée en mémoire d'une image à l'autre. Environ 3 fois plus rapide, différence invisible à 720-960 px."""
    sc = scene or bpy.context.scene
    try:
        pr = bpy.context.preferences.addons["cycles"].preferences
        for t in ("METAL", "OPTIX", "CUDA", "HIP", "ONEAPI"):
            try:
                pr.compute_device_type = t; pr.get_devices()
                if any(d.type != "CPU" for d in pr.devices): break
            except Exception: continue
        for d in pr.devices: d.use = True
        dev = "GPU" if any(d.type != "CPU" for d in pr.devices) else "CPU"
    except Exception:
        dev = "CPU"
    sc.render.engine = "CYCLES"; sc.cycles.device = dev
    sc.cycles.samples = echantillons; sc.cycles.use_adaptive_sampling = True; sc.cycles.adaptive_threshold = 0.006
    sc.cycles.use_denoising = True; sc.cycles.denoiser = "OPENIMAGEDENOISE"
    sc.cycles.denoising_input_passes = "RGB_ALBEDO_NORMAL"; sc.cycles.denoising_prefilter = "ACCURATE"
    sc.cycles.max_bounces = 32; sc.cycles.transmission_bounces = 32; sc.cycles.glossy_bounces = 12
    sc.cycles.transparent_max_bounces = 16; sc.cycles.volume_bounces = 2
    sc.cycles.caustics_refractive = True; sc.cycles.caustics_reflective = True; sc.cycles.blur_glossy = 0.4
    sc.cycles.filter_width = 1.1
    sc.view_settings.view_transform = "AgX"; sc.view_settings.look = "AgX - Medium High Contrast"
    if sequence:
        sc.cycles.max_bounces = 12; sc.cycles.transmission_bounces = 12; sc.cycles.glossy_bounces = 4
        sc.cycles.transparent_max_bounces = 8; sc.cycles.volume_bounces = 1; sc.cycles.caustics_reflective = False
        sc.cycles.adaptive_threshold = 0.01  # plus large : grain visible dans un jus sombre (Garrigue)
        sc.render.use_persistent_data = True
    sc.render.resolution_x = largeur; sc.render.resolution_y = round(largeur * ratio)
    sc.render.image_settings.file_format = "PNG"; sc.render.image_settings.color_mode = "RGB"; sc.render.image_settings.color_depth = "8"
    sc.render.filepath = os.path.abspath(sortie)
    print("RENDU", dev, sc.render.filepath)
    return dev


# ------------------------------------------------------------------------------------------------ animation

def pivot(objets, nom="Pivot"):
    """Regroupe les pièces sous un vide : on anime le vide, toutes les pièces suivent."""
    v = bpy.data.objects.new(nom, None); bpy.context.scene.collection.objects.link(v)
    for o in objets: o.parent = v
    return v


def tour_complet(ob, images=96, tours=1.0, depart=0.0, lineaire=False):
    """Rotation autour de Z sur `images` images, qui FINIT FACE AVANT (règle niveau-agence § 2 bis).
    Interpolation douce (ease in/out). Pour une boucle sans à-coup : interpolation linéaire, voir animations.md."""
    sc = bpy.context.scene; sc.frame_start = 1; sc.frame_end = images
    ob.rotation_euler = (0, 0, depart - 2 * math.pi * tours); ob.keyframe_insert("rotation_euler", index=2, frame=1)
    ob.rotation_euler = (0, 0, depart); ob.keyframe_insert("rotation_euler", index=2, frame=images)
    if lineaire:  # boucle vidéo : vitesse constante, et l'image de fin (= la première) n'est pas rendue
        act = ob.animation_data.action
        courbes = act.fcurves if hasattr(act, "fcurves") else [c for l in act.layers for s in l.strips
                                                               for cb in s.channelbags for c in cb.fcurves]
        for c in courbes:
            for k in c.keyframe_points: k.interpolation = "LINEAR"
        sc.frame_end = images - 1
    return ob


def eclate(pieces, decalages, images=72):
    """Vue éclatée : chaque pièce part de sa place (image 1) vers place + décalage (mi-course) et revient (fin).
    pieces = [obj], decalages = [(dx, dy, dz)]. La dernière image remontre l'objet assemblé, de face."""
    sc = bpy.context.scene; sc.frame_start = 1; sc.frame_end = images; mi = images // 2
    for o, d in zip(pieces, decalages):
        base = o.location.copy()
        o.keyframe_insert("location", frame=1)
        o.location = base + Vector(d); o.keyframe_insert("location", frame=mi)
        o.location = base; o.keyframe_insert("location", frame=images)


def rendre_sequence(dossier, largeur=960, ratio=1.25, echantillons=64, debut=None, fin=None, leger=True):
    """Rend toutes les images de l'animation en PNG numérotés (f-0001.png…) dans `dossier`.
    debut / fin : rendre une partie seulement (reprise après coupure, ou aperçu de 3 images : première, milieu, dernière).
    Les images déjà rendues ne sont pas refaites (on peut relancer après une coupure).
    leger=True : préréglage « sequence » de reglages_rendu (rebonds réduits, scène persistante).
    Ensuite : scripts/sequence.sh pour en faire une séquence WebP (data-sequence), une vidéo et une affiche."""
    os.makedirs(dossier, exist_ok=True)
    reglages_rendu(os.path.join(dossier, "f-"), largeur, ratio, echantillons, sequence=leger)
    sc = bpy.context.scene; sc.render.use_file_extension = True; sc.render.use_overwrite = False
    if debut: sc.frame_start = debut
    if fin: sc.frame_end = fin
    bpy.ops.render.render(animation=True)


def rendre_images(dossier, images, largeur=960, ratio=1.25, echantillons=64, leger=True):
    """Rend seulement certaines images de l'animation (aperçu de contrôle : la première, celle du milieu, la dernière)."""
    os.makedirs(dossier, exist_ok=True)
    reglages_rendu(os.path.join(dossier, "f-"), largeur, ratio, echantillons, sequence=leger)
    sc = bpy.context.scene
    for f in images:
        sc.frame_set(f); sc.render.filepath = os.path.join(os.path.abspath(dossier), "f-%04d.png" % f)
        bpy.ops.render.render(write_still=True)


def cle(cible, chemin, valeur, image, interpolation=None):
    """Pose une clé d'animation : cle(ob, "location", (0, 0, 1), 24) ; cle(noeud.inputs[0], "default_value", 0.5, 12).
    interpolation = "LINEAR" ou "CONSTANT" pour la dernière clé posée (Bézier par défaut)."""
    setattr(cible, chemin, valeur)
    cible.keyframe_insert(chemin, frame=image)
    if interpolation:
        for c in _courbes(cible.id_data if hasattr(cible, "id_data") else cible):
            for k in c.keyframe_points:
                if int(round(k.co[0])) == image: k.interpolation = interpolation


def _courbes(idb):
    """Toutes les courbes d'animation d'un bloc (objet, matériau, arbre de nœuds), Blender 4 et 5."""
    ad = getattr(idb, "animation_data", None)
    if not ad or not ad.action: return []
    act = ad.action
    if hasattr(act, "fcurves") and len(act.fcurves): return list(act.fcurves)
    return [c for l in getattr(act, "layers", []) for s in l.strips for cb in s.channelbags for c in cb.fcurves]


def lineaire(idb):
    """Passe toutes les clés d'un bloc en interpolation linéaire (vitesse constante : l'accélération se fait sur la page)."""
    for c in _courbes(idb):
        for k in c.keyframe_points: k.interpolation = "LINEAR"


def animer_jus(materiau, cles, densite=1.0, epaisseur=2.0):
    """Change la couleur d'un liquide (fait par liquide()) pendant l'animation : cles = [(image, "#hex"), …].
    Entre deux clés, la teinte passe de l'une à l'autre dans la masse (comme deux jus qui se remplacent)."""
    n = next(x for x in materiau.node_tree.nodes if x.type == "VOLUME_ABSORPTION")
    for f, hx in cles:
        c, d = absorption(hx, densite, epaisseur)
        cle(n.inputs["Color"], "default_value", (*c, 1), f)
        cle(n.inputs["Density"], "default_value", d, f)


def etiquettes_successives(etiquette, images, cles):
    """Une étiquette (etiquette_arc) qui change d'image pendant l'animation (changement de parfum, de modèle…).
    images = [png0, png1, …] (png0 = celle de etiquette_arc) ; cles = [(image, indice)], indice décimal = fondu.
    Changer l'image quand l'étiquette est au dos ou sur le côté : le fondu ne se voit pas."""
    m = etiquette.data.materials[0]; nt = m.node_tree; N, L = nt.nodes, nt.links
    tex0 = next(x for x in N if x.type == "TEX_IMAGE")
    mult = next(x for x in N if x.type == "MIX" and x.blend_type == "MULTIPLY")
    choix = N.new("ShaderNodeValue"); choix.name = "choix"
    acc = tex0.outputs["Color"]
    for k, png in enumerate(images[1:], start=1):
        t = N.new("ShaderNodeTexImage"); t.image = bpy.data.images.load(png)  # même UV par défaut que la première
        f = N.new("ShaderNodeMath"); f.operation = "SUBTRACT"; f.use_clamp = True; f.inputs[1].default_value = k - 1
        L.new(choix.outputs[0], f.inputs[0])
        mx = N.new("ShaderNodeMix"); mx.data_type = "RGBA"
        L.new(f.outputs[0], mx.inputs["Factor"]); L.new(acc, mx.inputs["A"]); L.new(t.outputs["Color"], mx.inputs["B"])
        acc = mx.outputs["Result"]
    L.new(acc, mult.inputs["A"])
    for f_, i in cles: cle(choix.outputs[0], "default_value", float(i), f_)
    return choix


def fondu(objets, cles):
    """Fait apparaître / disparaître des objets en fondu (opacité 0 à 1) : cles = [(image, opacite)].
    Ajoute un mélange avec un shader transparent à chaque matériau (copie propre à l'objet)."""
    for ob in objets:
        for i, m in enumerate(ob.data.materials):
            m = m.copy(); ob.data.materials[i] = m; nt = m.node_tree; out = nt.nodes["Material Output"]
            src = out.inputs["Surface"].links[0].from_socket
            tr = nt.nodes.new("ShaderNodeBsdfTransparent"); mx = nt.nodes.new("ShaderNodeMixShader")
            nt.links.new(tr.outputs[0], mx.inputs[1]); nt.links.new(src, mx.inputs[2]); nt.links.new(mx.outputs[0], out.inputs["Surface"])
            for f, o in cles: cle(mx.inputs["Fac"], "default_value", o, f)


def visible(objets, cles):
    """Montre ou cache des objets à certaines images (sans fondu) : cles = [(image, True/False)].
    Sert à passer d'une pièce entière à ses morceaux au moment où une vue éclatée commence."""
    for ob in objets:
        for f, v in cles:
            ob.hide_render = not v; ob.keyframe_insert("hide_render", frame=f)


def travelling(cam, cles):
    """Appareil qui bouge pendant l'animation : cles = [(image, position, cible, focale)].
    L'appareil vise un repère animé (contrainte Track To) ; la mise au point suit la cible."""
    vis = bpy.data.objects.new("Visee", None); bpy.context.scene.collection.objects.link(vis)
    for c in list(cam.constraints): cam.constraints.remove(c)
    tt = cam.constraints.new("TRACK_TO"); tt.target = vis; tt.track_axis = "TRACK_NEGATIVE_Z"; tt.up_axis = "UP_Y"
    cam.data.dof.focus_object = vis
    for f, loc, cible, focale in cles:
        cle(cam, "location", Vector(loc), f); cle(vis, "location", Vector(cible), f); cle(cam.data, "lens", focale, f)
    return vis


def gros_plan(cible, distance=7.0, hauteur=0.0, azimut=0.0, focale=100, ouverture=4, scene=None):
    """Appareil rapproché sur un détail (bouchon, fond de verre, étiquette) dans le même studio que la photo produit.
    cible = point visé ; distance le long de -Y ; hauteur = décalage vertical de l'appareil ; azimut en radians.
    Profondeur de champ plus courte (f/4) : le détail net, le reste qui fond, comme un vrai macro."""
    x = cible[0] - distance * math.sin(azimut); y = cible[1] - distance * math.cos(azimut)
    return appareil(focale=focale, loc=(x, y, cible[2] + hauteur), cible=cible, mise_au_point=cible, ouverture=ouverture, scene=scene)


def exporter_glb(chemin, objets=None, animations=True, materiaux=False):
    """Export glTF binaire pour le site (three.js / model-viewer). Par défaut la forme seule : les matériaux se
    règlent dans three.js. animations=True garde les clés (rotation, éclaté) pour un AnimationMixer piloté au défilement."""
    if objets:
        bpy.ops.object.select_all(action="DESELECT")
        for o in objets:
            o.select_set(True)
            p = o.parent
            while p:  # le Pivot qui porte l'animation part avec les pièces
                p.select_set(True); p = p.parent
    bpy.ops.export_scene.gltf(filepath=os.path.abspath(chemin), export_format="GLB", export_yup=True,
                              use_selection=bool(objets), export_apply=True, export_animations=animations,
                              export_materials="EXPORT" if materiaux else "NONE")
    print("EXPORT", os.path.abspath(chemin), os.path.getsize(os.path.abspath(chemin)), "octets")
