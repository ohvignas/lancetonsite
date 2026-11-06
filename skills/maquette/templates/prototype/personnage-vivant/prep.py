#!/usr/bin/env python3
"""Personnage vivant : prépare une vidéo sur fond vert pour vivant.js.

Principe : le corps et le clignement viennent de la vidéo. Sur chaque oeil, on pose deux calques
tirés de la première image : le blanc reconstitué sans l'iris, et l'iris complet. Seul l'iris glisse,
découpé par la forme de l'ouverture. Les calques s'effacent dès que l'oeil change de forme (clignement).

Entrée : une vidéo sur fond vert uni, tête quasi immobile, image de début = image de fin.
Sortie (dans --sortie) :
  personnage.mp4  vidéo empilée, couleur en haut, alpha en bas (H.264, se lit partout)
  pose.webp       première image détourée, repli quand la vidéo ne tourne pas
  yeux.json       calques, position image par image, ouverture, amplitude du regard
  oeils.json      forme des yeux utilisée : c'est ce fichier qu'on corrige
  yeux_ctl.png    forme des yeux dessinée sur l'image : À REGARDER, c'est de lui que tout dépend
  planche.png     détourage sur 3 fonds, clignement
  rapport.json    mesures et alertes

Usage :
  python3 prep.py source.mp4 --sortie medias/guide
  (regarder yeux_ctl.png, corriger medias/guide/oeils.json si une courbe n'est pas sur la paupière)
  python3 prep.py source.mp4 --sortie medias/guide --oeils medias/guide/oeils.json

Forme d'un oeil dans oeils.json, en pixels de la vidéo, l'oeil à gauche sur l'image d'abord :
  {"coins":[x1,y1,x2,y2], "haut":y, "bas":y, "iris":[cx,cy,r]}
"haut" et "bas" : hauteur de la paupière au milieu de l'oeil. Vert = paupière haute, jaune = basse,
magenta = iris. Le repérage automatique donne un point de départ, pas une garantie.
"""
import argparse, base64, io, json, pathlib, shutil, subprocess, sys

manque = []
try:
    import numpy as np
except ImportError:
    manque.append("numpy")
try:
    import cv2
except ImportError:
    manque.append("opencv-python")
try:
    from PIL import Image
except ImportError:
    manque.append("pillow")
if manque:
    sys.exit("Il manque : " + ", ".join(manque) + "\nÀ installer : python3 -m pip install " + " ".join(manque))
if not shutil.which("ffmpeg"):
    sys.exit("Il manque ffmpeg. Sur Mac : brew install ffmpeg. Sous Linux : sudo apt install ffmpeg.")

K = 2  # définition des calques par rapport à la vidéo


def lire_args():
    a = argparse.ArgumentParser(description="Prépare une vidéo sur fond vert pour vivant.js")
    a.add_argument("video", help="vidéo source sur fond vert")
    a.add_argument("--sortie", default="personnage", help="dossier de sortie")
    a.add_argument("--oeils", help="oeils.json corrigé à la main")
    a.add_argument("--fondu", type=int, default=16, help="images de fondu vers la première pour boucler")
    a.add_argument("--crf", type=int, default=19, help="qualité H.264 (plus bas = plus lourd)")
    a.add_argument("--clignement-max", type=float, default=.42, help="durée maximale du clignement, en secondes")
    a.add_argument("--pied-net", action="store_true", help="ne pas fondre le bas du personnage")
    a.add_argument("--cle-bas", type=float, default=14, help="excès de vert où le détourage commence")
    a.add_argument("--cle-haut", type=float, default=46, help="excès de vert où le pixel est transparent")
    return a.parse_args()


def lire_video(chemin):
    c = cv2.VideoCapture(str(chemin))
    if not c.isOpened():
        sys.exit(f"Vidéo illisible : {chemin}")
    fps = c.get(cv2.CAP_PROP_FPS) or 24
    F = []
    while True:
        ok, f = c.read()
        if not ok:
            break
        F.append(f[: f.shape[0] & ~1, : f.shape[1] & ~1])
    if len(F) < 24:
        sys.exit("Vidéo trop courte : il faut au moins une seconde.")
    return F, float(fps)


def lisse(v, a, b):
    t = np.clip((v - a) / (b - a), 0, 1)
    return t * t * (3 - 2 * t)


# ---------------------------------------------------------------- repérage de départ
def pupille(g, x0, x1, y0, y1):
    z = cv2.GaussianBlur(g[y0:y1, x0:x1], (0, 0), 2.2)
    m = cv2.minMaxLoc(z)[2]
    return int(m[0] + x0), int(m[1] + y0)


def forme_depuis_iris(cx, cy, d):
    """Une forme de départ, proportionnée à l'écart entre les yeux. À ajuster sur yeux_ctl.png."""
    r = round(.13 * d, 1)
    return {"coins": [round(cx - .28 * d, 1), cy + round(.03 * d, 1), round(cx + .28 * d, 1), cy + round(.03 * d, 1)],
            "haut": round(cy - .14 * d, 1), "bas": round(cy + .12 * d, 1), "iris": [cx, cy, r]}


def reperer_oeils(f):
    """Visage puis yeux par OpenCV. Sans oeil trouvé : pupilles sous le sourcil dans le visage."""
    h, w = f.shape[:2]
    g = cv2.cvtColor(f, cv2.COLOR_BGR2GRAY)
    vis = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml").detectMultiScale(g, 1.1, 5, minSize=(w // 8, w // 8))
    if len(vis):
        x, y, l, H = (int(v) for v in max(vis, key=lambda v: v[2] * v[3]))
        mid = x + l // 2
        yeux = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_eye.xml").detectMultiScale(g[y: y + H * 6 // 10, x: x + l], 1.05, 4, minSize=(l // 9, l // 9))
        # le centre de la boîte d'oeil : on cherche la pupille dans sa moitié basse, pour éviter le sourcil
        cote = {"g": [], "d": []}
        for ex, ey, el, eh in yeux:
            c = x + ex + el // 2
            cote["g" if c < mid else "d"].append((int(x + ex), int(y + ey), int(el), int(eh)))
        pts = {}
        for k, boites in cote.items():
            if boites:
                ex, ey, el, eh = max(boites, key=lambda b: b[2])
                pts[k] = pupille(g, ex + el // 5, ex + el * 4 // 5, ey + eh * 2 // 5, ey + eh * 4 // 5)
        if len(pts) == 2:
            return pts["g"], pts["d"], "yeux trouvés"
        y0, y1 = y + int(H * .34), y + int(H * .5)
        return pupille(g, x + int(l * .14), mid - int(l * .06), y0, y1), pupille(g, mid + int(l * .06), x + int(l * .86), y0, y1), "visage trouvé, yeux estimés"
    y0, y1 = int(h * .14), int(h * .34)
    return pupille(g, int(w * .34), w // 2 - 8, y0, y1), pupille(g, w // 2 + 8, int(w * .66), y0, y1), "visage non trouvé, yeux estimés"


# ---------------------------------------------------------------- calques des yeux
def arc(x, x1, y1, x2, y2, yc):
    t = np.clip((x - x1) / (x2 - x1), 0, 1)
    base, mi = y1 + (y2 - y1) * t, (y1 + y2) / 2
    return base + (yc - mi) * (4 * t * (1 - t)) ** (.6 if yc < mi else .9)


def masque(e, x0, y0, BW, BH, k=K):
    yy, xx = np.mgrid[0: 2 * BH * k, 0: 2 * BW * k].astype(np.float32)
    X, Y = xx / k + x0, yy / k + y0
    d = np.minimum(Y - arc(X, *e["coins"], e["haut"]), arc(X, *e["coins"], e["bas"]) - Y)
    x1, _, x2, _ = e["coins"]
    d = np.minimum(d, np.minimum(X - x1, x2 - X) * .8)
    return np.clip(d / .9 + .5, 0, 1).astype(np.float32), X, Y


def origine(e, BW, BH):
    return int(round((e["coins"][0] + e["coins"][2]) / 2)) - BW, int(round((e["haut"] + e["bas"]) / 2)) - BH


def panneaux(f, e, BW, BH):
    x0, y0 = origine(e, BW, BH)
    Z = cv2.resize(f[y0: y0 + 2 * BH, x0: x0 + 2 * BW], (2 * BW * K, 2 * BH * K), interpolation=cv2.INTER_CUBIC).astype(np.float32)
    m, X, Y = masque(e, x0, y0, BW, BH)
    cx, cy, r = e["iris"]
    # blanc : pixels sûrs (dans l'ouverture, hors iris), interpolés par rangée puis lissés
    sur = (m > .95) & (np.hypot(X - cx, Y - cy) > r + 1.2)
    if sur.sum() < 12:
        sys.exit("Forme d'oeil trop petite ou iris trop grand : regarder yeux_ctl.png et corriger oeils.json.")
    # on écarte seulement les cils très sombres : ils baveraient en gris. Garder les ombres douces, sinon le blanc paraît collé
    lum = Z.mean(axis=2)
    sur = sur & (lum > .6 * np.percentile(lum[sur], 85))
    o, base = Z.copy(), np.median(Z[sur], axis=0)
    for y in range(Z.shape[0]):
        xs = np.where(sur[y])[0]
        for ch in range(3):
            o[y, :, ch] = np.interp(np.arange(Z.shape[1]), xs, Z[y, xs, ch]) if len(xs) >= 4 else base[ch]
    o = cv2.GaussianBlur(o, (0, 0), 1.6 * K)
    # iris : panneau centré ; ce que cachent les paupières est complété par le profil radial de la partie visible
    yy, xx = np.mgrid[0: Z.shape[0], 0: Z.shape[1]].astype(np.float32)
    pcx, pcy = float(cx - x0) * K, float(cy - y0) * K
    rayon = np.hypot(xx - pcx, yy - pcy)
    anneau = np.clip(rayon.astype(int), 0, int(r * K) + 3)
    vu = m > .95
    prof = np.zeros((int(r * K) + 4, 3), np.float32)
    for i in range(prof.shape[0]):
        z = Z[(anneau == i) & vu]
        prof[i] = np.median(z, axis=0) if len(z) >= 3 else (prof[i - 1] if i else np.median(Z[vu & (rayon < r * K)], axis=0))
    plein = np.where(vu[..., None], Z, prof[anneau])
    dx, dy = xx - BW * K, yy - BH * K
    ir = cv2.remap(plein.astype(np.float32), (pcx + dx).astype(np.float32), (pcy + dy).astype(np.float32), cv2.INTER_LINEAR)
    a = 1 - np.clip((np.hypot(dx, dy) - (r - .7) * K) / (1.2 * K), 0, 1)
    return o, m, ir, a, x0, y0


def calques(f, oeils, BW, BH, S):
    pan, info = [], []
    for e in oeils:
        o, m, ir, a, x0, y0 = panneaux(f, e, BW, BH)
        pan.append((o, m, ir, a))
        info.append({"c": [x0 + BW, y0 + BH], "i": [round(e["iris"][0] - x0 - BW, 2), round(e["iris"][1] - y0 - BH, 2)], "r": e["iris"][2]})
    H, W = pan[0][0].shape[:2]
    A = np.zeros((H * 2, W * 2, 4), np.uint8)
    for i, (o, m, ir, a) in enumerate(pan):
        A[0:H, i * W: (i + 1) * W, :3] = np.clip(o, 0, 255)
        A[0:H, i * W: (i + 1) * W, 3] = m * 255
        A[H:2 * H, i * W: (i + 1) * W, :3] = np.clip(ir, 0, 255)
        A[H:2 * H, i * W: (i + 1) * W, 3] = a * 255
    rgb = A.copy()
    rgb[..., :3] = A[..., 2::-1]
    b = io.BytesIO()
    Image.fromarray(rgb, "RGBA").save(b, "PNG", optimize=True)
    return {"A": "data:image/png;base64," + base64.b64encode(b.getvalue()).decode(), "box": [BW, BH], "yeux": info}


def controle(f, oeils, BW, BH, chemin, zoom=7):
    ims = []
    for e in oeils:
        x0, y0 = origine(e, BW, BH)
        z = cv2.resize(f[y0: y0 + 2 * BH, x0: x0 + 2 * BW], None, fx=zoom, fy=zoom, interpolation=cv2.INTER_CUBIC)
        P = lambda x, y: (int((x - x0) * zoom), int((y - y0) * zoom))
        x1, y1, x2, y2 = e["coins"]
        xs = np.linspace(x1, x2, 60)
        for cle, col in (("haut", (0, 255, 0)), ("bas", (0, 255, 255))):
            ys = arc(xs, x1, y1, x2, y2, e[cle])
            cv2.polylines(z, [np.array([P(a, b) for a, b in zip(xs, ys)], np.int32)], False, col, 1, cv2.LINE_AA)
        cx, cy, r = e["iris"]
        cv2.circle(z, P(cx, cy), int(r * zoom), (255, 0, 255), 1, cv2.LINE_AA)
        ims.append(z)
    cv2.imwrite(str(chemin), np.hstack(ims))


# ---------------------------------------------------------------- tête et ouverture
def suivre_tete(F, G, D):
    """Déplacement de la tête, mesuré sur le nez et la bouche (les yeux clignent, pas eux)."""
    h, w = F[0].shape[:2]
    d = max(20, abs(D[0] - G[0]))
    mx, my = int((G[0] + D[0]) // 2), int((G[1] + D[1]) // 2)
    x0, x1 = max(0, mx - int(d * .42)), min(w, mx + int(d * .42))
    y0, y1 = min(h - 2, my + int(d * .18)), min(h, my + int(d * .95))
    marge = int(d * .3)
    gris = lambda f: cv2.cvtColor(f, cv2.COLOR_BGR2GRAY).astype(np.float32)
    T = gris(F[0])[y0:y1, x0:x1]
    X0, X1, Y0, Y1 = max(0, x0 - marge), min(w, x1 + marge), max(0, y0 - marge), min(h, y1 + marge)
    res = []
    for f in F:
        r = cv2.matchTemplate(gris(f)[Y0:Y1, X0:X1], T, cv2.TM_SQDIFF)
        m = cv2.minMaxLoc(r)[2]
        res.append((m[0] + X0 - x0, m[1] + Y0 - y0))
    return np.array(res, float)


def ouverture(F, dep, oeils, BW, BH):
    """1 = même forme d'oeil que sur l'image de référence ; dès qu'elle diffère, les calques s'effacent."""
    ref = F[0].astype(np.float32)
    h, w = F[0].shape[:2]
    ec = []
    for f, de in zip(F, dep):
        dx, dy = int(round(de[0])), int(round(de[1]))
        v = 0
        for e in oeils:
            x0, y0 = origine(e, BW, BH)
            m, X, Y = masque(e, x0, y0, BW, BH, 1)
            bord = (np.hypot(X - e["iris"][0], Y - e["iris"][1]) > e["iris"][2] + 1) & (m > .5)
            ya, xa = np.clip(y0 + dy, 0, h - 2 * BH), np.clip(x0 + dx, 0, w - 2 * BW)
            a = f[ya: ya + 2 * BH, xa: xa + 2 * BW].astype(np.float32)
            v += float(np.abs(a - ref[y0: y0 + 2 * BH, x0: x0 + 2 * BW]).mean(axis=2)[bord].mean())
        ec.append(v / 2)
    ec = np.array(ec)
    med = np.median(ec)
    # relatif au pic : une petite dérive de la lumière ne doit pas passer pour un clignement
    seuil = med + max(6, 2.5 * (np.percentile(ec, 75) - med), .3 * (ec.max() - med))
    op = 1 - np.clip((ec - seuil) / 3, 0, 1)
    return np.minimum.reduce([np.roll(op, k) for k in (-2, -1, 0, 1, 2)])


def groupes(op, seuil=.99):
    i = np.where(op < seuil)[0]
    return [(int(g[0]), int(g[-1])) for g in np.split(i, np.where(np.diff(i) > 3)[0] + 1)] if len(i) else []


def accelerer_clignements(F, op, fps, duree):
    """Le modèle cligne souvent trop lentement : on retire des images pendant le clignement."""
    maxi = max(5, int(duree * fps))
    garder = np.ones(len(F), bool)
    avant = []
    for a, b in groupes(op):
        n = b - a + 1
        avant.append(n)
        if n > maxi:
            pas = int(np.ceil(n / maxi))
            for i in range(a, b + 1):
                garder[i] = (i - a) % pas == 0
    return [f for f, k in zip(F, garder) if k], avant


def boucler(F, m):
    base = F[0].astype(np.float32)
    n = len(F)
    for i in range(n - m, n):
        a = (i - (n - m) + 1) / (m + 1)
        a = a * a * (3 - 2 * a)
        F[i] = np.uint8(F[i] * (1 - a) + base * a + .5)


# ---------------------------------------------------------------- détourage et contrôle
def detourer(f, bas, haut):
    a = f.astype(np.float32)
    b, g, r = a[..., 0], a[..., 1], a[..., 2]
    al = 1 - lisse(g - np.maximum(r, b), bas, haut)
    g2 = np.minimum(g, np.maximum(r, b) * 1.02)  # retire le reflet vert sur les bords
    al = cv2.GaussianBlur(al, (0, 0), .7)
    return np.dstack([b, g2, r]).clip(0, 255).astype(np.uint8), np.clip((al - .12) / .88, 0, 1)


def sur_fond(c, al, couleur):
    return np.uint8(c * al[..., None] + np.full_like(c, couleur) * (1 - al[..., None]))


def planche(F, chemin, ctl, G, D, d, op, bas, haut, pied):
    h, w = F[0].shape[:2]
    d = int(d)
    fermee = int(np.argmin(op))
    c0, al0 = detourer(F[0], bas, haut)
    al0 = al0 * pied
    H = 420
    tuile = lambda im: cv2.resize(im, (int(H * w / h), H), interpolation=cv2.INTER_AREA)
    mx, my = int((G[0] + D[0]) // 2), int((G[1] + D[1]) // 2)
    z = lambda im, a, b: im[max(0, my - a): my + b, max(0, mx - int(1.5 * d)): mx + int(1.5 * d)]
    ajuste = lambda im: cv2.resize(im, (int(H * im.shape[1] / im.shape[0]), H), interpolation=cv2.INTER_CUBIC)
    bleu, orange, blanc = (110, 60, 10), (42, 96, 244), (255, 255, 255)
    l1 = np.hstack([ajuste(cv2.imread(str(ctl))), tuile(sur_fond(c0, al0, bleu)), tuile(sur_fond(c0, al0, orange)), tuile(sur_fond(c0, al0, blanc))])
    l2 = np.hstack([ajuste(z(sur_fond(c0, al0, bleu), int(1.5 * d), d)), ajuste(z(F[fermee], d, d)), ajuste(z(F[len(F) // 2], d, d))])
    L = max(l1.shape[1], l2.shape[1])
    pad = lambda im: np.hstack([im, np.full((im.shape[0], L - im.shape[1], 3), 40, np.uint8)]) if im.shape[1] < L else im
    cv2.imwrite(str(chemin), np.vstack([pad(l1), pad(l2)]))


def main():
    A = lire_args()
    S = pathlib.Path(A.sortie)
    S.mkdir(parents=True, exist_ok=True)
    F, fps = lire_video(A.video)
    h, w = F[0].shape[:2]
    alertes = []

    # 1. la forme des yeux
    if A.oeils:
        oeils, comment = json.load(open(A.oeils)), "oeils.json donné"
        oeils = sorted(oeils, key=lambda e: e["iris"][0])
    else:
        G, D, comment = reperer_oeils(F[0])
        if G[0] > D[0]:
            G, D = D, G
        d0 = D[0] - G[0]
        oeils = [forme_depuis_iris(*G, d0), forme_depuis_iris(*D, d0)]
        alertes.append("Forme des yeux automatique : regarder yeux_ctl.png, corriger oeils.json, relancer avec --oeils.")
    if not A.oeils or pathlib.Path(A.oeils).resolve() != (S / "oeils.json").resolve():
        json.dump(oeils, open(S / "oeils.json", "w"), indent=1)
    G, D = oeils[0]["iris"][:2], oeils[1]["iris"][:2]
    d = max(20, D[0] - G[0])
    r = (oeils[0]["iris"][2] + oeils[1]["iris"][2]) / 2
    BW, BH = int(np.ceil(.36 * d)) + 1, int(np.ceil(.22 * d)) + 1
    controle(F[0], oeils, BW, BH, S / "yeux_ctl.png")
    print(f"yeux : {G} et {D} ({comment}) ; vidéo {w}x{h}, {fps:g} i/s, {len(F)} images")

    # 2. clignement trop lent : on l'accélère, puis on mesure tout sur les images gardées
    dep = suivre_tete(F, G, D)
    op = ouverture(F, dep, oeils, BW, BH)
    F, avant = accelerer_clignements(F, op, fps, A.clignement_max)
    boucler(F, min(A.fondu, len(F) // 4))
    dep = suivre_tete(F, G, D)
    for j in (0, 1):
        dep[:, j] = cv2.GaussianBlur(dep[:, j].reshape(-1, 1), (0, 0), 3).ravel()
    op = ouverture(F, dep, oeils, BW, BH)
    apres = [b - a + 1 for a, b in groupes(op)]
    print(f"clignements (images où les calques s'effacent) : {avant or 'aucun'} avant, {apres or 'aucun'} après")
    if not apres:
        alertes.append("Aucun clignement vu : les yeux restent ouverts, sans défaut, mais moins vivant.")
    if sum(apres) > .25 * len(F):
        alertes.append("Les calques s'effacent sur plus d'un quart de la vidéo : forme d'oeil mal posée ou tête qui bouge.")

    # 3. la tête doit rester quasi immobile, sinon le cadre paraît flotter
    ampl = float(np.hypot(*(dep.max(0) - dep.min(0))))
    print(f"mouvement de tête : {ampl:.1f} px pour {d:g} px entre les yeux")
    if ampl > .12 * d:
        alertes.append(f"La tête bouge de {ampl:.0f} px : trop (au-delà de {.12 * d:.0f}). Regénérer la vidéo, seed ou prompt différent.")

    # 4. yeux.json : amplitude proportionnelle au rayon d'iris (±8 et ±3,5 px pour un rayon de 13, au-delà les yeux louchent)
    cal = calques(F[0], oeils, BW, BH, S)
    tr = lambda e: (dep + np.array(e["c"], float)).round(1).tolist()
    json.dump({"w": w, "h": h, "fps": fps, "n": len(F), "L": tr(cal["yeux"][0]), "R": tr(cal["yeux"][1]), "op": op.round(2).tolist(),
               "G": [round(r * 8 / 13, 2), round(r * 3.5 / 13, 2)], "ombre": round(r * 3.2 / 13, 2), **cal},
              open(S / "yeux.json", "w"), separators=(",", ":"))

    # 5. vidéo empilée et pose
    pied = (1 - lisse(np.arange(h)[:, None] / h, .88, .995)) if not A.pied_net else np.ones((h, 1))
    p = subprocess.Popen(["ffmpeg", "-y", "-loglevel", "error", "-f", "rawvideo", "-pix_fmt", "bgr24", "-s", f"{w}x{h * 2}", "-r", f"{fps:g}", "-i", "-",
                          "-an", "-c:v", "libx264", "-profile:v", "high", "-preset", "veryslow", "-crf", str(A.crf), "-pix_fmt", "yuv420p", "-movflags", "+faststart",
                          str(S / "personnage.mp4")], stdin=subprocess.PIPE)
    for i, f in enumerate(F):
        co, al = detourer(f, A.cle_bas, A.cle_haut)
        a8 = np.uint8(al * pied * 255 + .5)
        p.stdin.write(np.vstack([co, cv2.merge([a8, a8, a8])]).tobytes())
        if i == 0:
            Image.fromarray(np.dstack([co[..., ::-1], a8]), "RGBA").save(S / "pose.webp", quality=86, method=6, alpha_quality=90)
            coins = [a8[:h // 12, :w // 12].mean(), a8[:h // 12, -w // 12:].mean()]
            part = float((a8 > 128).mean())
    p.stdin.close()
    if p.wait():
        sys.exit("ffmpeg a échoué.")
    if max(coins) > 40:
        alertes.append("Coins du haut pas transparents : fond pas assez vert ou pas uni. Regénérer sur fond uni #00B140, ou régler --cle-bas et --cle-haut.")
    if not .1 < part < .75:
        alertes.append(f"Le personnage occupe {part:.0%} de l'image : détourage suspect, à regarder sur la planche.")

    # 6. contrôle
    planche(F, S / "planche.png", S / "yeux_ctl.png", G, D, d, op, A.cle_bas, A.cle_haut, pied)
    rapport = {"yeux": [G, D], "reperage": comment, "images": len(F), "fps": fps, "tete_px": round(ampl, 1), "entre_yeux_px": d,
               "clignement_avant": avant, "clignement_apres": apres, "poids_ko": (S / "personnage.mp4").stat().st_size // 1024, "alertes": alertes}
    json.dump(rapport, open(S / "rapport.json", "w"), ensure_ascii=False, indent=1, default=float)
    print(f"personnage.mp4 : {rapport['poids_ko']} Ko")
    for t in alertes:
        print("ALERTE :", t)
    print("À regarder :", S / "yeux_ctl.png", "et", S / "planche.png")


if __name__ == "__main__":
    main()
