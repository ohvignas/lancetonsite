#!/usr/bin/env python3
"""
Lance ton site — planche de moodboard : toutes les images d'un dossier composées sur UNE seule image,
en rangées justifiées (comme une planche de directeur artistique), avec la palette et les typos en pied.

    python3 planche-moodboard.py projet-site/03-charte/moodboard \
        --titre "Ciel ouvert" --phrase "Un grand ciel, une interface qui s'y pose." \
        --couleurs "#056CA9,#F4602A,#241C18,#F5F5F5" --polices "Titres : Poppins · Texte : Inter"

Sortie : <dossier>/planche.jpg (3000 px de large) et planche-1200.jpg (pour l'aperçu).
Images lues : .jpg .jpeg .png .webp du dossier (sauf planche*), triées par nom : préfixer 01-, 02-…
pour choisir l'ordre ; la première est la plus grande (image clé). Il faut Pillow (pip install pillow).
"""
import argparse, glob, os, sys
from PIL import Image, ImageDraw, ImageFont, ImageOps

p = argparse.ArgumentParser()
p.add_argument("dossier")
p.add_argument("--titre", default="Moodboard")
p.add_argument("--phrase", default="")
p.add_argument("--couleurs", default="")
p.add_argument("--polices", default="")
p.add_argument("--largeur", type=int, default=3000)
p.add_argument("--hauteur-rangee", type=int, default=620)
p.add_argument("--fond", default="#F4F2EE")
p.add_argument("--encre", default="#1A1A1A")
a = p.parse_args()

W, G, M = a.largeur, 18, 70                      # largeur, gouttière, marge
fichiers = sorted(f for f in glob.glob(os.path.join(a.dossier, "*"))
                  if f.lower().endswith((".jpg", ".jpeg", ".png", ".webp")) and not os.path.basename(f).startswith("planche"))
if len(fichiers) < 2:
    sys.exit(f"Il faut au moins 2 images dans {a.dossier} (idéalement 9 à 15).")
imgs = [ImageOps.exif_transpose(Image.open(f)).convert("RGB") for f in fichiers]


def police(taille, gras=False):
    for nom in (["Helvetica.ttc", "Arial Bold.ttf", "DejaVuSans-Bold.ttf"] if gras else ["Helvetica.ttc", "Arial.ttf", "DejaVuSans.ttf"]):
        for d in ("/System/Library/Fonts", "/System/Library/Fonts/Supplemental", "/Library/Fonts", "/usr/share/fonts/truetype/dejavu", "C:/Windows/Fonts"):
            try:
                return ImageFont.truetype(os.path.join(d, nom), taille, index=1 if gras and nom.endswith(".ttc") else 0)
            except OSError:
                continue
    return ImageFont.load_default()


# --- rangées justifiées : la première image seule sur une rangée plus haute (image clé)
utile = W - 2 * M
rangees, i = [], 0
cle = imgs[0]
rangees.append([(0, cle)])
i = 1
while i < len(imgs):
    rangee, somme = [], 0.0
    while i < len(imgs):
        r = imgs[i].width / imgs[i].height
        rangee.append((i, imgs[i])); somme += r; i += 1
        if somme * a.hauteur_rangee + G * (len(rangee) - 1) >= utile:
            break
    rangees.append(rangee)

blocs = []
for k, rangee in enumerate(rangees):
    ratios = [im.width / im.height for _, im in rangee]
    h = (utile - G * (len(rangee) - 1)) / sum(ratios)
    if k == 0:
        h = min(h, a.hauteur_rangee * 1.55)       # image clé : grande mais pas démesurée
    elif k == len(rangees) - 1:
        h = min(h, a.hauteur_rangee * 1.2)        # dernière rangée incomplète : pas étirée
    blocs.append((rangee, ratios, int(h)))

entete, pied = 230, 300 if (a.couleurs or a.polices) else 120
H = entete + sum(h for _, _, h in blocs) + G * (len(blocs) - 1) + pied
planche = Image.new("RGB", (W, H), a.fond)
d = ImageDraw.Draw(planche)

d.text((M, 70), a.titre.upper(), font=police(64, True), fill=a.encre)
if a.phrase:
    d.text((M, 150), a.phrase, font=police(36), fill=a.encre)
d.text((W - M, 82), f"Moodboard · {len(imgs)} images", font=police(30), fill=a.encre, anchor="ra")

y = entete
for rangee, ratios, h in blocs:
    largeurs = [int(r * h) for r in ratios]
    total = sum(largeurs) + G * (len(largeurs) - 1)
    x = M + (utile - total) // 2 if total < utile else M
    for (_, im), w in zip(rangee, largeurs):
        planche.paste(ImageOps.fit(im, (w, h), Image.LANCZOS), (x, y))
        x += w + G
    y += h + G

y += 40
if a.couleurs:
    x = M
    for hexa in [c.strip() for c in a.couleurs.split(",") if c.strip()]:
        d.ellipse((x, y, x + 120, y + 120), fill=hexa, outline="#00000022")
        d.text((x + 60, y + 140), hexa.upper(), font=police(26), fill=a.encre, anchor="ma")
        x += 170
if a.polices:
    d.text((W - M, y + 45), a.polices, font=police(34), fill=a.encre, anchor="ra")

sortie = os.path.join(a.dossier, "planche.jpg")
planche.save(sortie, quality=88)
planche.resize((1200, int(H * 1200 / W)), Image.LANCZOS).save(os.path.join(a.dossier, "planche-1200.jpg"), quality=85)
print(sortie, f"{W}x{H}", f"{len(imgs)} images")
