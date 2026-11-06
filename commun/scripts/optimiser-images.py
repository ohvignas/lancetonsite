#!/usr/bin/env python3
"""
Lance ton site : prépare les images pour le web.

    python3 optimiser-images.py projet-site/06-medias/images projet-site/site/medias [--sizes "50vw"]

Pour chaque image du dossier source (.jpg .jpeg .png .webp), écrit dans le dossier cible
<nom>-<largeur>.webp, nommé d'après sa largeur réelle : 1600 px au plus, plus une version de
800 px si l'image est plus large (proportions gardées, jamais agrandie), en baissant la qualité
jusqu'à passer sous 250 Ko pour la grande version.
Le nom du fichier source donne le nom de sortie : nommer les images par leur rôle
(hero.jpg, equipe.jpg…). Il faut Pillow (pip install pillow).
Affiche à la fin la balise <img> à copier pour chaque image (srcset, sizes, width/height) ;
--sizes donne la place de l'image dans la page (100vw par défaut).
"""
import argparse, os, sys
from PIL import Image, ImageOps

args = argparse.ArgumentParser(description="Prépare les images pour le web.")
args.add_argument("source")
args.add_argument("cible")
args.add_argument("--sizes", default="100vw")
a = args.parse_args()
src, dst = a.source, a.cible
os.makedirs(dst, exist_ok=True)
LIMITE = 250 * 1024

def ecrire(img, chemin, largeur, limite=None):
    im = img.copy()
    if im.width > largeur:
        im = im.resize((largeur, round(im.height * largeur / im.width)), Image.LANCZOS)
    chemin = chemin.format(l=im.width)
    for q in (82, 76, 70, 64, 58, 52):
        im.save(chemin, "WEBP", quality=q, method=6)
        if limite is None or os.path.getsize(chemin) <= limite:
            break
    return im.size, chemin

fichiers = sorted(f for f in os.listdir(src) if f.lower().endswith((".jpg", ".jpeg", ".png", ".webp")))
if not fichiers:
    sys.exit(f"Aucune image dans {src}")
for f in fichiers:
    nom = os.path.splitext(f)[0]
    img = ImageOps.exif_transpose(Image.open(os.path.join(src, f))).convert("RGB")
    gabarit = os.path.join(dst, nom.replace("{", "") + "-{l}.webp")
    (l, h), grande = ecrire(img, gabarit, 1600, LIMITE)
    versions = [l]
    if l > 800:
        ecrire(img, gabarit, 800)
        versions.insert(0, 800)
    ko = os.path.getsize(grande) // 1024
    web = os.path.basename(os.path.normpath(dst))
    srcset = ", ".join(f"{web}/{nom}-{v}.webp {v}w" for v in versions)
    print(f'{nom}: {l}x{h}, {ko} Ko\n  <img src="{web}/{nom}-{l}.webp" srcset="{srcset}" '
          f'sizes="{a.sizes}" width="{l}" height="{h}" alt="" loading="lazy" decoding="async">')
