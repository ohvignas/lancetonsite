#!/usr/bin/env python3
"""Lance ton site — génère toutes les images d'une maquette animée (fal ou OpenRouter).

Chaque emplacement d'image de la page porte son prompt :

    <img data-prompt="Mains couvertes d'argile montant un bol sur le tour…"
         data-ratio="16:9" data-ref="hero" data-name="hero" alt="…">

- data-prompt : le prompt complet, en anglais (le bloc de style de 06-medias est ajouté
  automatiquement s'il est passé avec --style).
- data-ratio  : 1:1, 4:5, 3:2, 16:9, 21:9… (16:9 par défaut).
- data-name   : nom du fichier produit (images/<name>.png). Sans lui : img-01, img-02…
- data-ref    : nom d'une image déjà générée à donner en référence (même shooting).
  L'image maîtresse (souvent le hero) n'a pas de data-ref et part en premier.

Usage :
    python3 generer-images.py accueil.html --estimer       # compte, n'appelle rien
    python3 generer-images.py accueil.html --fal --style style.txt [--refaire hero]
    python3 generer-images.py accueil.html --style style.txt [--modele …] [--refaire hero]

Les images sont écrites dans images/ à côté de la page, et le src de chaque <img> est
remplacé. Une image déjà générée (data-genere) n'est pas refaite, sauf --refaire <nom>.
Même ordre que les conventions (« Quel générateur ») : fal d'abord, OpenRouter ensuite.
- --fal : FAL_KEY (fal.ai/dashboard/keys), modèle fal-ai/nano-banana-2 (/edit avec une
  référence), résolution 2K par défaut (--resolution) : assez large pour un écran 2×.
- sinon : OPENROUTER_API_KEY, modèle google/gemini-3.1-flash-image.
Les clés restent des variables d'environnement, jamais écrites dans un fichier.
Sans clé, avec le connecteur MCP : fal (`run_model` / `submit_jobs`, même endpoint) ou
OpenRouter (`generate-image`), emplacement par emplacement, mêmes prompt, ratio et référence.
"""
import argparse, base64, json, os, re, sys, urllib.request
from pathlib import Path

API = "https://openrouter.ai/api/v1/images"
MODELE = "google/gemini-3.1-flash-image"
FAL = "https://fal.run/"
MODELE_FAL = "fal-ai/nano-banana-2"
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


def generer_fal(prompt, ratio, modele, ref_png, cle, resolution):
    corps = {"prompt": prompt, "aspect_ratio": ratio, "num_images": 1,
             "output_format": "png", "resolution": resolution, "sync_mode": True}
    if ref_png:
        modele += "/edit"
        corps["image_urls"] = ["data:image/png;base64," +
                               base64.b64encode(ref_png.read_bytes()).decode()]
    req = urllib.request.Request(FAL + modele, json.dumps(corps).encode(), {
        "Authorization": f"Key {cle}", "Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=300) as r:
        rep = json.load(r)
    if not rep.get("images"):
        raise RuntimeError(json.dumps(rep, ensure_ascii=False)[:400])
    url = rep["images"][0]["url"]
    if url.startswith("data:"):
        return base64.b64decode(url.split(",", 1)[1]), None
    with urllib.request.urlopen(url, timeout=120) as r:
        return r.read(), None


def main():
    a = argparse.ArgumentParser()
    a.add_argument("page")
    a.add_argument("--style", help="fichier texte du bloc de style (06-medias)")
    a.add_argument("--fal", action="store_true", help="générer avec fal (FAL_KEY)")
    a.add_argument("--modele", help=f"défaut : {MODELE_FAL} avec --fal, sinon {MODELE}")
    a.add_argument("--resolution", default="2K", help="fal seulement : 1K, 2K ou 4K")
    a.add_argument("--estimer", action="store_true")
    a.add_argument("--refaire", action="append", default=[])
    o = a.parse_args()
    o.modele = o.modele or (MODELE_FAL if o.fal else MODELE)

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
        prix = ("https://fal.ai/models/" + o.modele + " (ou estimate_cost du MCP fal)"
                if o.fal else "https://openrouter.ai/" + o.modele)
        print(f"Prix par image : voir {prix} (en dollars : convertir en euros, "
              "puis l'ajouter au « Budget IA » de 00-etat.md).")
        return
    var = "FAL_KEY" if o.fal else "OPENROUTER_API_KEY"
    cle = os.environ.get(var)
    if not cle:
        sys.exit(f"Définir {var}, ou générer avec le MCP "
                 + ("fal (run_model)" if o.fal else "OpenRouter (generate-image)")
                 + " : voir l'en-tête de ce script.")

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
            ratio = attr(tag, "data-ratio") or "16:9"
            octets, cout = (generer_fal(prompt, ratio, o.modele, ref_png, cle, o.resolution)
                            if o.fal else generer(prompt, ratio, o.modele, ref_png, cle))
        except Exception as e:  # une image ratée n'arrête pas la série
            print(f"✗ {nom} : {e}")
            continue
        (dossier / f"{nom}.png").write_bytes(octets)
        total += cout or 0
        neuf = poser(poser(tag, "src", f"images/{nom}.png"), "data-genere", o.modele)
        html = html.replace(tag, neuf, 1)
        page.write_text(html, encoding="utf-8")
        print(f"✓ images/{nom}.png" + (f" ({cout:.3f} $)" if cout else ""))
    if o.fal:
        print("Coût : voir l'historique fal (fal.ai/dashboard), à reporter au « Budget IA ».")
    else:
        print(f"Coût total : {total:.2f} $ (à convertir en euros, à reporter au « Budget IA »).")


if __name__ == "__main__":
    main()
