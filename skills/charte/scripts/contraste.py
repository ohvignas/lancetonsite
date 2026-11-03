#!/usr/bin/env python3
"""Atelier — vérifie le contraste WCAG 2.2 entre paires de couleurs.

Usage :
  contraste.py "#1A1A1A" "#F4F1EA" [usage]     une paire (texte, fond)
  contraste.py --palette palette.json          toutes les paires déclarées
      palette.json : {"paires": [["#texte", "#fond", "usage"], ...]}
Usage : « texte » (défaut, seuil 4,5:1), ou un usage contenant « grand », « titre »
ou « interface » (seuil 3:1).
Code de sortie 1 si une paire est sous son seuil.
"""
import json
import re
import sys

HEX = re.compile(r"^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$")


def lum(hexa: str) -> float:
    m = HEX.match(hexa.strip())
    if not m:
        raise ValueError(f"Couleur invalide : {hexa!r} (attendu #RGB ou #RRGGBB, sans transparence)")
    h = m.group(1)
    if len(h) == 3:
        h = "".join(c * 2 for c in h)
    canaux = [int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)]
    lin = [c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4 for c in canaux]
    return 0.2126 * lin[0] + 0.7152 * lin[1] + 0.0722 * lin[2]


def ratio(a: str, b: str) -> float:
    la, lb = sorted((lum(a), lum(b)), reverse=True)
    return (la + 0.05) / (lb + 0.05)


def seuil(usage: str) -> float:
    u = usage.lower()
    return 3.0 if any(m in u for m in ("grand", "titre", "interface", "icône", "icone", "bordure")) else 4.5


def main() -> int:
    args = sys.argv[1:]
    if not args or (args[0] != "--palette" and len(args) < 2):
        print(__doc__)
        return 2
    try:
        if args[0] == "--palette":
            paires = json.load(open(args[1], encoding="utf-8"))["paires"]
        else:
            paires = [[args[0], args[1], args[2] if len(args) > 2 else "texte"]]
        echec = False
        for p in paires:
            texte, fond = p[0], p[1]
            usage = p[2] if len(p) > 2 else "texte"
            r, s = ratio(texte, fond), seuil(usage)
            ok = r >= s
            echec |= not ok
            print(f"{'✓' if ok else '✗'} {texte} sur {fond}  {r:5.2f}:1  (seuil {s:g}:1, {usage})")
        return 1 if echec else 0
    except (ValueError, KeyError, OSError, json.JSONDecodeError) as e:
        print(f"Erreur : {e}")
        return 2


if __name__ == "__main__":
    sys.exit(main())
