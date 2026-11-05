#!/usr/bin/env python3
"""
Lance ton site — express : prépare les images pour le web.

    python3 optimiser-images.py projet-site/06-medias/brut projet-site/site/images

Pour chaque image du dossier source (.jpg .jpeg .png .webp), écrit dans le dossier cible
<nom>-1600.webp et <nom>-800.webp (largeur maximale, proportions gardées, jamais agrandie),
en baissant la qualité jusqu'à passer sous 250 Ko pour la grande version.
Le nom du fichier source donne le nom de sortie : nommer les images par leur rôle
(hero.jpg, equipe.jpg…). Il faut Pillow (pip install pillow).
Affiche à la fin la balise <img> à copier pour chaque image (srcset, sizes, width/height).
"""
import os, sys
from PIL import Image, ImageOps

if len(sys.argv) != 3:
    sys.exit("Usage : python3 optimiser-images.py <dossier source> <dossier cible>")
src, dst = sys.argv[1], sys.argv[2]
os.makedirs(dst, exist_ok=True)
LIMITE = 250 * 1024

def ecrire(img, chemin, largeur, limite=None):
    im = img.copy()
    if im.width > largeur:
        im = im.resize((largeur, round(im.height * largeur / im.width)), Image.LANCZOS)
    for q in (82, 76, 70, 64, 58, 52):
        im.save(chemin, "WEBP", quality=q, method=6)
        if limite is None or os.path.getsize(chemin) <= limite:
            break
    return im.size

fichiers = sorted(f for f in os.listdir(src) if f.lower().endswith((".jpg", ".jpeg", ".png", ".webp")))
if not fichiers:
    sys.exit(f"Aucune image dans {src}")
for f in fichiers:
    nom = os.path.splitext(f)[0]
    img = ImageOps.exif_transpose(Image.open(os.path.join(src, f))).convert("RGB")
    l, h = ecrire(img, os.path.join(dst, f"{nom}-1600.webp"), 1600, LIMITE)
    ecrire(img, os.path.join(dst, f"{nom}-800.webp"), 800)
    ko = os.path.getsize(os.path.join(dst, f"{nom}-1600.webp")) // 1024
    print(f'{nom}: {l}x{h}, {ko} Ko\n  <img src="images/{nom}-1600.webp" '
          f'srcset="images/{nom}-800.webp 800w, images/{nom}-1600.webp 1600w" '
          f'sizes="100vw" width="{l}" height="{h}" alt="" loading="lazy" decoding="async">')
