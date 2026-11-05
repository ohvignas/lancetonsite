"""
Exemple de référence avec lib3d : le flacon de parfum Ciste (verre épais, jus, étiquette papier, bague moletée,
bouchon céramique), réglé en 3 tours de boucle de correction. C'est le niveau attendu : partir d'ici et changer
les profils, les matières, l'étiquette et les couleurs pour un nouvel objet.

  blender -b --factory-startup --python exemple.py -- photo  rendu/apercu.png 720 96     (aperçu pour la boucle)
  blender -b --factory-startup --python exemple.py -- photo  rendu/final.png 1080 256    (final pour le site, après validation ; 3072 sur demande)
  blender -b --factory-startup --python exemple.py -- tour   rendu/tour 960 64 72        (séquence : 72 images)
  blender -b --factory-startup --python exemple.py -- glb    modeles/flacon.glb          (3D pour le site)
  6e argument facultatif : ratio hauteur/largeur (1.25 par défaut, 0.5625 pour un hero 16:9).

Variables d'environnement : ETIQUETTE (PNG de l'étiquette), JUS (couleur hex du liquide).
"""
import sys, os
ICI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, ICI)
from lib3d import *

# ---- profils (rayon, hauteur) : 1 unité ≈ 2,2 cm, flacon de 4,62 de haut
# verre : extérieur + cavité, fond épais (« lourd ») de 0,42
EXT = [(0, 0), (0.86, 0), (1.06, 0.03), (1.15, 0.12), (1.185, 0.3), (1.19, 0.6), (1.19, 2.3), (1.18, 2.52),
       (1.13, 2.74), (1.02, 2.92), (0.82, 3.06), (0.58, 3.15), (0.4, 3.2), (0.34, 3.26), (0.33, 3.6), (0.31, 3.62)]
INT = [(0.24, 3.62), (0.22, 3.6), (0.22, 3.27), (0.25, 3.19), (0.34, 3.12), (0.52, 3.06), (0.74, 2.97), (0.93, 2.85),
       (1.04, 2.69), (1.09, 2.5), (1.10, 2.3), (1.10, 0.8), (1.095, 0.6), (1.06, 0.48), (0.95, 0.43), (0, 0.42)]
# liquide : DÉBORDE de 0,006 dans la paroi (pas de film d'air) et monte dans l'épaule (au-dessus de l'appareil)
LIQ = [(0, 0.414), (0.95, 0.424), (1.064, 0.474), (1.1, 0.6), (1.106, 0.8), (1.106, 2.3), (1.096, 2.5), (1.046, 2.69),
       (0.975, 2.80), (0.94, 2.792), (0, 2.788)]
# bouchon galet
BOU = [(0, 3.4), (0.5, 3.4), (0.62, 3.44), (0.68, 3.56), (0.7, 3.8), (0.69, 4.12), (0.63, 4.36), (0.5, 4.52), (0.3, 4.6), (0, 4.62)]
ETIQUETTE_DEFAUT = os.path.join(ICI, "..", "..", "maquette", "templates", "exemples", "commerce-flacon", "outils", "blender",
                                "etiquettes", "restanque.png")


def construire(jus="#a9a23f", etiquette=ETIQUETTE_DEFAUT, web=False):
    """Le flacon complet. Renvoie un dict : verre, liquide, bague, bouchon, etiquette (None en web), pieces."""
    n, pas = (3, 96) if web else (8, 192)
    verre_ob = tourner("Verre", adoucir(EXT, n) + adoucir(INT, min(n, 6)), pas)
    liq_ob = tourner("Liquide", adoucir(LIQ, min(n, 6)), pas)   # même lissage que l'intérieur du verre : recouvrement garanti
    # À SAVOIR : ce liquide sort avec ses normales vers l'intérieur (lentille divergente). Les photos et séquences
    # Ciste validées ont été rendues ainsi ; pour un nouveau produit, appeler normales_dehors(liq_ob) et refaire le réglage.
    bou_ob = tourner("Bouchon", adoucir(BOU, 10 if not web else 4), pas)
    bague = bague_moletee("Bague", rayon=0.43, hauteur=0.20, z=3.30, stries=360 if not web else 72)
    verre_ob.data.materials.append(verre("verre"))
    liq_ob.data.materials.append(liquide("jus", jus))
    bou_ob.data.materials.append(laque("ceramique", "#2c3a31"))
    pieces = [verre_ob, liq_ob, bague, bou_ob]
    et = None
    if not web:
        et = etiquette_arc("Etiquette", etiquette, rayon=1.1935, hauteur=1.16, z=1.42)
        pieces.append(et)
    return dict(verre=verre_ob, liquide=liq_ob, bague=bague, bouchon=bou_ob, etiquette=et, pieces=pieces)


def studio(pieces, fond_hex="#e3e5df", niveau_liquide=2.7, **reglages):
    """Le studio réglé pour ce flacon (cyclo + schéma de lumière). Renvoie le fond."""
    fond = cyclo(fond_hex)
    eclairage_produit(pieces, fond, centre_z=2.2, hauteur=4.6, transparent=True, niveau_liquide=niveau_liquide, bas_carte=0.3, **reglages)
    return fond


def appareil_face():
    """Le cadrage de la photo produit : 100 mm, à hauteur d'épaule, face à l'étiquette."""
    return appareil(focale=100, loc=(0, -20.5, 3.6), cible=(0, 0, 2.3), mise_au_point=(0, -1.0, 2.2))


if __name__ == "__main__":
    a = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
    MODE = a[0] if a else "photo"
    SORTIE = a[1] if len(a) > 1 else "rendu/apercu.png"
    LARGEUR = int(a[2]) if len(a) > 2 else 720
    ECH = int(a[3]) if len(a) > 3 else 96
    IMAGES = int(a[4]) if len(a) > 4 else 72
    RATIO = float(a[5]) if len(a) > 5 else 1.25   # hauteur / largeur : 1.25 = 4:5 (fiche), 0.5625 = 16:9 (hero)
    WEB = MODE == "glb"

    scene_vide()
    F = construire(os.environ.get("JUS", "#a9a23f"), os.environ.get("ETIQUETTE") or ETIQUETTE_DEFAUT, web=WEB)
    if WEB:
        exporter_glb(SORTIE, F["pieces"], animations=False)
        sys.exit(0)
    studio(F["pieces"])
    appareil_face()

    if MODE == "tour":
        tour_complet(pivot(F["pieces"]), images=IMAGES)
        rendre_sequence(SORTIE, largeur=LARGEUR, ratio=RATIO, echantillons=ECH)
    else:
        reglages_rendu(SORTIE, largeur=LARGEUR, ratio=RATIO, echantillons=ECH)
        bpy.ops.render.render(write_still=True)
