"""Contrôle d'une scène Blender avant rendu ou export. Ne modifie rien.

Sans interface :
    "$BLENDER" -b objet.blend --python controle_scene.py

Par le connecteur `blender`, dans `execute_blender_code` (scène ouverte) ou
`execute_blender_code_for_cli` (fichier .blend) :
    exec(open("/chemin/controle_scene.py").read()); result = controle()

Rend un dict : `defauts` à corriger avant de montrer, `avis` à regarder (une
étiquette ouverte n'est pas un défaut), `triangles` par objet, modificateurs
compris, du plus lourd au plus léger.
"""
import json
import os

import bmesh
import bpy


def _maillages():
    return [o for o in bpy.context.scene.objects
            if o.type == "MESH" and not o.hide_render]


def _forme(ob):
    bm = bmesh.new()
    bm.from_mesh(ob.data)
    ouvertes = sum(1 for e in bm.edges if not e.is_manifold)
    # Arête bien fermée mais faces de sens opposés : normale retournée.
    retournees = sum(1 for e in bm.edges if e.is_manifold and not e.is_contiguous)
    bm.free()
    return ouvertes, retournees


def controle():
    defauts, avis, poids = [], [], []
    depsgraph = bpy.context.evaluated_depsgraph_get()

    for ob in _maillages():
        me = ob.data
        faces = len(me.polygons)
        # Une seule face (plan de lumière, carton) : rien à lisser. Stries d'une
        # bague moletée : ob["facettes_voulues"] = True, posé par le modèle.
        if faces > 1 and not ob.get("facettes_voulues"):
            plates = sum(1 for p in me.polygons if not p.use_smooth)
            if plates:
                defauts.append(f"{ob.name} : {plates}/{faces} faces plates (facettes visibles)")
        if not any(ob.material_slots) or not any(s.material for s in ob.material_slots):
            defauts.append(f"{ob.name} : aucune matière")
        ouvertes, retournees = _forme(ob)
        if retournees:
            defauts.append(f"{ob.name} : {retournees} arêtes entre normales opposées")
        if ouvertes and faces > 1:
            avis.append(f"{ob.name} : {ouvertes} arêtes ouvertes ou non manifold")
        sx, sy, sz = (abs(v) for v in ob.scale)
        if faces > 1 and max(sx, sy, sz) - min(sx, sy, sz) > 1e-4:
            avis.append(f"{ob.name} : échelle non uniforme ({sx:.3g}, {sy:.3g}, {sz:.3g})")

        ev = ob.evaluated_get(depsgraph)
        tmp = ev.to_mesh()
        tmp.calc_loop_triangles()
        poids.append((len(tmp.loop_triangles), ob.name))
        ev.to_mesh_clear()

    for img in bpy.data.images:
        if img.source != "FILE" or img.packed_file or not img.filepath:
            continue
        chemin = bpy.path.abspath(img.filepath)
        if not os.path.exists(chemin):
            defauts.append(f"image manquante : {img.name} ({img.filepath})")
        elif not img.filepath.startswith("//"):
            avis.append(f"chemin absolu : {img.name} ({img.filepath})")

    poids.sort(reverse=True)
    return {
        "defauts": defauts,
        "avis": avis,
        "triangles": {nom: n for n, nom in poids},
        "total_triangles": sum(n for n, _ in poids),
    }


if __name__ == "__main__":
    print("CONTROLE " + json.dumps(controle(), ensure_ascii=False))
