#!/usr/bin/env python3
"""Atelier — recherche simple dans les catalogues de design intégrés.

Usage : chercher.py <catalogue> "mots clés en anglais" [nombre]
Les mots sont comparés par début de mot : « brutal » trouve « Brutalism ».
Catalogues : styles, typography, colors, landing, ux-guidelines, motion
Données : nextlevelbuilder/ui-ux-pro-max-skill (MIT).
"""
import csv
import math
import re
import sys
from pathlib import Path

DATA = Path(__file__).resolve().parent.parent / "data"


def mots(texte: str) -> list[str]:
    return re.findall(r"[a-z0-9]+", texte.lower())


def main() -> int:
    if len(sys.argv) < 3:
        print(__doc__)
        return 1
    catalogue, requete = sys.argv[1], sys.argv[2]
    n = int(sys.argv[3]) if len(sys.argv) > 3 and sys.argv[3].isdigit() else 5
    fichier = DATA / f"{catalogue}.csv"
    if not fichier.exists():
        print(f"Catalogue inconnu : {catalogue}. Disponibles : "
              + ", ".join(p.stem for p in DATA.glob("*.csv")))
        return 1
    lignes = list(csv.DictReader(fichier.open(encoding="utf-8")))
    docs = [mots(" ".join(str(v) for v in l.values())) for l in lignes]
    q = mots(requete)
    nb = len(docs)
    df = {t: sum(1 for d in docs if any(m.startswith(t) for m in d)) for t in set(q)}
    moy = sum(len(d) for d in docs) / max(nb, 1)
    scores = []
    for i, d in enumerate(docs):
        s = 0.0
        for t in q:
            f = sum(1 for m in d if m.startswith(t))
            if not f:
                continue
            idf = math.log(1 + (nb - df[t] + 0.5) / (df[t] + 0.5))
            s += idf * f * 2.2 / (f + 1.2 * (0.25 + 0.75 * len(d) / moy))
        scores.append((s, i))
    scores.sort(reverse=True)
    resultats = [i for s, i in scores[:n] if s > 0]
    if not resultats:
        print("Aucun résultat : élargir les mots clés (en anglais, les données le sont).")
        return 0
    for i in resultats:
        l = lignes[i]
        valeurs = [v for k, v in l.items() if k.strip().lower() not in ("no", "#", "id") and v]
        titre = valeurs[0] if valeurs else "?"
        print(f"\n=== {titre}")
        for k, v in l.items():
            if v and len(str(v)) < 400:
                print(f"  {k}: {v}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
