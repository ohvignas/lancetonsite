#!/usr/bin/env python3
"""Lance ton site — génère avec OpenRouter toutes les images d'une maquette animée.

Chaque emplacement d'image de la page porte son prompt :

    <img data-prompt="Mains couvertes d'argile montant un bol sur le tour…"
         data-ratio="16:9" data-ref="hero" data-name="hero" alt="…">

- data-prompt : le prompt complet, en anglais (le bloc de style de 07-medias est ajouté
  automatiquement s'il est passé avec --style).
- data-ratio  : 1:1, 4:5, 3:2, 16:9, 21:9… (16:9 par défaut).
- data-name   : nom du fichier produit (images/<name>.png). Sans lui : img-01, img-02…
- data-ref    : nom d'une image déjà générée à donner en référence (même shooting).
  L'image maîtresse (souvent le hero) n'a pas de data-ref et part en premier.

Usage :
    python3 generer-images.py accueil.html --estimer       # compte, n'appelle rien
    python3 generer-images.py accueil.html --style style.txt [--modele …] [--refaire hero]

Les images sont écrites dans images/ à côté de la page, et le src de chaque <img> est
remplacé. Une image déjà générée (data-genere) n'est pas refaite, sauf --refaire <nom>.
Requiert OPENROUTER_API_KEY (variable d'environnement, jamais écrite dans un fichier).
Sans clé, dans Claude ou avec le connecteur OpenRouter : appeler l'outil MCP
`generate-image` pour chaque emplacement avec les mêmes prompt, ratio et référence.
"""
import argparse, base64, json, os, re, sys, urllib.request
from pathlib import Path

API = "https://openrouter.ai/api/v1/images"
MODELE = "google/gemini-3.1-flash-image"
IMG = re.compile(r"<img\b[^>]*\bdata-prompt=\"[^\"]*\"[^>]*>", re.S)


def attr(tag, nom):
    m = re.search(rf'\b{nom}="([^"]*)"', tag)
    return m.group(1) if m else None


def poser(tag, nom, valeur):
    if attr(tag, nom) is not None:
        return re.sub(rf'\b{nom}="[^"]*"', f'{nom}="{valeur}"', tag, count=1)
    return tag[:-1].rstrip("/").rstrip() + f' {nom}="{valeur}">'


def generer(prompt, ratio, modele, ref_png, cle):
    corps = {"model": modele, "prompt": prompt, "aspect_ratio": ratio}
    if ref_png:
        url = "data:image/png;base64," + base64.b64encode(ref_png.read_bytes()).decode()
        corps["input_references"] = [{"type": "image_url", "image_url": {"url": url}}]
    req = urllib.request.Request(API, json.dumps(corps).encode(), {
        "Authorization": f"Bearer {cle}", "Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=300) as r:
        rep = json.load(r)
    if not rep.get("data"):
        raise RuntimeError(json.dumps(rep.get("error", rep), ensure_ascii=False)[:400])
    return base64.b64decode(rep["data"][0]["b64_json"]), rep.get("usage", {}).get("cost")


def main():
    a = argparse.ArgumentParser()
    a.add_argument("page")
    a.add_argument("--style", help="fichier texte du bloc de style (07-medias)")
    a.add_argument("--modele", default=MODELE)
    a.add_argument("--estimer", action="store_true")
    a.add_argument("--refaire", action="append", default=[])
    o = a.parse_args()

    page = Path(o.page)
    html = page.read_text(encoding="utf-8")
    style = Path(o.style).read_text(encoding="utf-8").strip() if o.style else ""
    dossier = page.parent / "images"
    balises = IMG.findall(html)

    # L'image maîtresse (sans data-ref) d'abord, puis celles qui s'y réfèrent.
    a_faire = []
    for i, tag in enumerate(balises, 1):
        nom = attr(tag, "data-name") or f"img-{i:02d}"
        if attr(tag, "data-genere") and nom not in o.refaire:
            continue
        a_faire.append((0 if not attr(tag, "data-ref") else 1, nom, tag))
    a_faire.sort(key=lambda t: t[0])

    print(f"{len(balises)} emplacements, {len(a_faire)} à générer avec {o.modele}.")
    if o.estimer or not a_faire:
        print("Prix par image : voir https://openrouter.ai/" + o.modele +
              " (en dollars : convertir en euros avant de l'annoncer).")
        return
    cle = os.environ.get("OPENROUTER_API_KEY")
    if not cle:
        sys.exit("Définir OPENROUTER_API_KEY, ou générer avec l'outil MCP OpenRouter "
                 "`generate-image` (voir l'en-tête de ce script).")

    dossier.mkdir(exist_ok=True)
    total = 0.0
    for _, nom, tag in a_faire:
        prompt = attr(tag, "data-prompt")
        if style:
            prompt = f"{prompt}\n\n{style}"
        ref = attr(tag, "data-ref")
        ref_png = dossier / f"{ref}.png" if ref else None
        if ref_png and not ref_png.exists():
            print(f"! {nom} : référence {ref}.png absente, générée sans référence")
            ref_png = None
        try:
            octets, cout = generer(prompt, attr(tag, "data-ratio") or "16:9",
                                   o.modele, ref_png, cle)
        except Exception as e:  # une image ratée n'arrête pas la série
            print(f"✗ {nom} : {e}")
            continue
        (dossier / f"{nom}.png").write_bytes(octets)
        total += cout or 0
        neuf = poser(poser(tag, "src", f"images/{nom}.png"), "data-genere", o.modele)
        html = html.replace(tag, neuf, 1)
        page.write_text(html, encoding="utf-8")
        print(f"✓ images/{nom}.png" + (f" ({cout:.3f} $)" if cout else ""))
    print(f"Coût total : {total:.2f} $ (à convertir en euros pour l'annoncer).")


if __name__ == "__main__":
    main()
