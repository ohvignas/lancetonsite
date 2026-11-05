"""
Ciste — les deux animations de la page et les vues fixes qui en découlent, rendues dans Blender (Cycles).
Même flacon, mêmes matières et même studio que la photo produit (skills/objets-3d/scripts/exemple.py + lib3d.py).

    blender -b --factory-startup --python outils/blender/sequences.py -- <mode> <sortie> [largeur] [echantillons] [images…]

  parfums  <dossier>     scène A : 73 images, 3 tours. Restanque → Mistral → Centifolia → Nuitée ; le jus change
                         de teinte entre 90° et 270°, l'étiquette change de nom au dos (180°). Images 1, 25, 49, 73
                         de face. Rotation à vitesse constante : la page accélère et ralentit au défilement.
  notes    <dossier>     scène B : 44 images. Garrigue se décompose : l'étiquette s'efface, le flacon se sépare en
                         capot (épaule, bague, bouchon) et trois godets de verre (fond, cœur, tête) qui s'écartent ;
                         le jus de chaque godet prend la teinte de sa note. La page la joue à l'aller puis au retour
                         (le flacon se referme et finit de face, étiquette lisible).
  eclate   <png>         la dernière image de la scène B, cadrée 4:3 pour le journal (ratio 0.75).
  gros-plans <dossier>   bouchon, fond de verre, étiquette (même studio, appareil rapproché), carrés.

  images…  (facultatif, modes parfums et notes) : ne rendre que ces images (aperçu : 1 37 73).
  Les images déjà présentes ne sont pas refaites : on peut relancer après une coupure.
"""
import math, os, re, sys

ICI = os.path.dirname(os.path.abspath(__file__))
OBJETS3D = os.path.normpath(os.path.join(ICI, "..", "..", "..", "..", "..", "..", "objets-3d", "scripts"))
sys.path.insert(0, OBJETS3D)
from lib3d import *            # noqa: E402,F401
import exemple as X            # noqa: E402  (profils, construire(), studio(), appareil_face())

a = sys.argv[sys.argv.index("--") + 1:]
MODE, SORTIE = a[0], os.path.abspath(a[1])
LARGEUR = int(a[2]) if len(a) > 2 else 720
ECH = int(a[3]) if len(a) > 3 else 64
CHOIX = [int(x) for x in a[4:]]

SRC = open(os.path.join(ICI, "..", "..", "donnees.js"), encoding="utf-8").read()
JUS = dict(re.findall(r'id: "(\w+)".*?liquide: "(#\w+)"', SRC, re.S))
ETQ = lambda i: os.path.join(ICI, "etiquettes", i + ".png")

scene_vide()


def rendre(images_total, ratio=1.25):
    if CHOIX:
        rendre_images(SORTIE, CHOIX, largeur=LARGEUR, ratio=ratio, echantillons=ECH)
    else:
        rendre_sequence(SORTIE, largeur=LARGEUR, ratio=ratio, echantillons=ECH, debut=1, fin=images_total)


# ================================================================================================ scène A
if MODE == "parfums":
    ORDRE = ["restanque", "mistral", "centifolia", "nuitee"]
    PAS = 24                                  # images par tour (15° par image, vitesse constante)
    N = PAS * (len(ORDRE) - 1) + 1            # 73
    F = X.construire(JUS[ORDRE[0]], ETQ(ORDRE[0]))
    X.studio(F["pieces"])
    X.appareil_face()
    p = pivot(F["pieces"])
    cle(p, "rotation_euler", (0, 0, 0), 1)
    cle(p, "rotation_euler", (0, 0, 2 * math.pi * (len(ORDRE) - 1)), N)
    lineaire(p)
    jus_cles, etq_cles = [(1, JUS[ORDRE[0]])], [(1, 0)]
    for i in range(len(ORDRE) - 1):
        d = 1 + PAS * i
        jus_cles += [(d + PAS // 4, JUS[ORDRE[i]]), (d + 3 * PAS // 4, JUS[ORDRE[i + 1]])]  # change entre 90° et 270°
        etq_cles += [(d + PAS // 2 - 1, i), (d + PAS // 2 + 1, i + 1)]                      # au dos (180°)
    jus_cles.append((N, JUS[ORDRE[-1]])); etq_cles.append((N, len(ORDRE) - 1))
    animer_jus(F["liquide"].data.materials[0], jus_cles)
    etiquettes_successives(F["etiquette"], [ETQ(i) for i in ORDRE], etq_cles)
    bpy.context.scene.frame_start, bpy.context.scene.frame_end = 1, N
    rendre(N)


# ================================================================================================ scène B
def arc(cx, cz, r, a0, a1, n=14):
    return [(cx + r * math.cos(a0 + (a1 - a0) * k / n), cz + r * math.sin(a0 + (a1 - a0) * k / n)) for k in range(n + 1)]


RE, RI, RHO, FL = 1.19, 1.10, 0.045, 0.08      # rayon extérieur / intérieur du corps, demi-épaisseur de la lèvre, fond


def levre_haut(z):        # de l'extérieur vers l'intérieur, par-dessus
    return arc((RE + RI) / 2, z - RHO, RHO, 0, math.pi)


def godet(nom, z0, z1):
    """Tranche du corps refermée en godet : paroi épaisse, lèvre arrondie, fond de 0,08, coins arrondis."""
    pr = [(0, z0), (RE - 0.04, z0)] + arc(RE - 0.04, z0 + 0.04, 0.04, -math.pi / 2, 0, 8)[1:]
    pr += [(RE, z1 - RHO)] + levre_haut(z1)[1:]
    pr += [(RI, z0 + FL + 0.03)] + arc(RI - 0.03, z0 + FL + 0.03, 0.03, 0, -math.pi / 2, 8)[1:] + [(0, z0 + FL)]
    return tourner(nom, pr, 192)


def jus_godet(nom, z0, z1):
    zl = z1 - 0.14
    pr = [(0, z0 + FL - 0.006), (RI + 0.006 - 0.03, z0 + FL - 0.006)]
    pr += arc(RI + 0.006 - 0.03, z0 + FL + 0.024, 0.03, -math.pi / 2, 0, 8)[1:]
    pr += [(RI + 0.006, zl - 0.02), (RI + 0.006 - 0.02, zl), (0, zl)]
    return tourner(nom, pr, 192)


def fond_godet(z1):
    ext = [q for q in adoucir(X.EXT, 8) if q[1] < z1 - RHO - 0.01]
    inn = [q for q in adoucir(X.INT, 6) if q[1] < z1 - RHO - 0.01]
    return tourner("Godet-fond", ext + [(RE, z1 - RHO)] + levre_haut(z1)[1:] + inn, 192)


def jus_fond(z1):
    zl = z1 - 0.14
    pr = [q for q in adoucir(X.LIQ, 6) if q[1] < zl - 0.03]
    return tourner("Jus-fond", pr + [(RI + 0.006, zl - 0.02), (RI + 0.006 - 0.02, zl), (0, zl)], 192)


def capot(z0):
    """Épaule et col, coupés en z0, lèvre arrondie en bas (anneau fermé)."""
    bas = arc((RE + RI) / 2, z0 + RHO, RHO, math.pi, 2 * math.pi)            # intérieur → dessous → extérieur
    ext = [q for q in adoucir(X.EXT, 8) if q[1] > z0 + RHO + 0.01]
    inn = [q for q in adoucir(X.INT, 6) if q[1] > z0 + RHO + 0.01]
    return tourner("Capot", bas + ext + inn + [bas[0]], 192)


if MODE in ("notes", "eclate"):
    N = 44
    COUPES = [0.98, 1.64, 2.30]               # fond | cœur | tête | capot
    NOTES = {"fond": "#4a2108", "coeur": "#8e4a16", "tete": "#c48a3a"}
    DECALAGE = {"fond": (0, 0, 0), "coeur": (-0.5, 0, 0.62), "tete": (0.5, 0, 1.24), "capot": (0, 0, 1.95)}
    S = 6                                     # image où le flacon entier laisse la place à ses morceaux

    F = X.construire(JUS["garrigue"], ETQ("garrigue"))
    mv = verre("verre-godets")
    g_fond, g_coeur, g_tete, cap = fond_godet(COUPES[0]), godet("Godet-coeur", COUPES[0], COUPES[1]), \
        godet("Godet-tete", COUPES[1], COUPES[2]), capot(COUPES[2])
    for g in (g_fond, g_coeur, g_tete, cap): g.data.materials.append(mv)
    j_fond, j_coeur, j_tete = jus_fond(COUPES[0]), jus_godet("Jus-coeur", COUPES[0], COUPES[1]), jus_godet("Jus-tete", COUPES[1], COUPES[2])
    for j, n in ((j_fond, "fond"), (j_coeur, "coeur"), (j_tete, "tete")):
        j.data.materials.append(liquide("jus-" + n, JUS["garrigue"]))
        animer_jus(j.data.materials[0], [(S, JUS["garrigue"]), (S + 6, JUS["garrigue"]), (34, NOTES[n])])
    morceaux = [g_fond, g_coeur, g_tete, cap, j_fond, j_coeur, j_tete]
    X.studio(F["pieces"] + morceaux)
    visible([F["verre"], F["liquide"]], [(1, True), (S, False)])
    visible(morceaux, [(1, False), (S, True)])
    fondu([F["etiquette"]], [(1, 1.0), (S + 2, 0.0)])

    # chaque tranche part de sa place (S) vers place + décalage (fin) ; le capot emporte la bague et le bouchon
    groupes = {"fond": [g_fond, j_fond], "coeur": [g_coeur, j_coeur], "tete": [g_tete, j_tete],
               "capot": [cap, F["bague"], F["bouchon"]]}
    for nom, obs in groupes.items():
        v = pivot(obs, "Pivot-" + nom)
        cle(v, "location", (0, 0, 0), S)
        cle(v, "location", DECALAGE[nom], N)
    # la carte de contre-jour suit le jus qui monte (sinon la tête, levée, n'est plus éclairée par derrière)
    carte = bpy.data.objects["Carte"]
    z0, h0 = carte.location.z, carte.scale.y
    cle(carte, "location", (carte.location.x, carte.location.y, z0), S)
    cle(carte, "scale", (carte.scale.x, h0, 1), S)
    cle(carte, "location", (carte.location.x, carte.location.y, z0 + 0.62), N)
    cle(carte, "scale", (carte.scale.x, h0 + 1.24, 1), N)

    cam = X.appareil_face()
    if MODE == "notes":
        travelling(cam, [(1, (0, -20.5, 3.6), (0, 0, 2.3), 100), (S, (0, -20.6, 3.75), (0, 0, 2.38), 98),
                         (N, (0, -22.5, 6.2), (0, 0, 3.25), 84)])
        bpy.context.scene.frame_start, bpy.context.scene.frame_end = 1, N
        rendre(N)
    else:  # vue fixe 4:3 : la dernière image, plus large
        travelling(cam, [(1, (0, -24, 6.0), (0, 0, 3.25), 72)])
        bpy.context.scene.frame_set(N)
        reglages_rendu(SORTIE, largeur=LARGEUR, ratio=0.75, echantillons=ECH)
        bpy.ops.render.render(write_still=True)


# ================================================================================================ gros plans
if MODE == "gros-plans":
    os.makedirs(SORTIE, exist_ok=True)
    VUES = {  # parfum, cible, distance, hauteur, azimut, focale
        "bouchon": ("garrigue", (0, 0, 3.75), 9.0, 1.2, -0.35, 100),
        "verre": ("restanque", (0, 0, 0.45), 8.0, 2.2, 0.0, 100),
        "etiquette": ("centifolia", (0, 0, 1.45), 6.4, 0.25, -0.05, 100),
    }
    for nom, (pid, cible, dist, haut, az, foc) in VUES.items():
        scene_vide()
        F = X.construire(JUS[pid], ETQ(pid))
        X.studio(F["pieces"])
        gros_plan(cible, distance=dist, hauteur=haut, azimut=az, focale=foc)
        sortie = os.path.join(SORTIE, nom + ".png")
        reglages_rendu(sortie, largeur=LARGEUR, ratio=1.0, echantillons=ECH)
        bpy.ops.render.render(write_still=True)
