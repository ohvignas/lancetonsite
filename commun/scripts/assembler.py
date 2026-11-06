#!/usr/bin/env python3
"""
Lance ton site : recopie l'en-tête et le pied de page partagés dans chaque page.

    python3 assembler.py projet-site/site

Le site est en HTML statique, sans moteur d'inclusion. Les parties communes vivent dans
site/_partials/ (entete.html, pied.html, et tout autre fichier .html qu'on y ajoute).
Dans chaque page, une zone balisée reçoit la partie du même nom :

    <!-- partiel:entete -->   …remplacé…   <!-- /partiel:entete -->

Le script remplace le contenu entre les deux balises par le fichier _partials/<nom>.html,
dans toutes les pages .html de site/ (sous-dossiers compris, sauf _partials/).
Il est idempotent : on le relance après chaque changement du menu ou du pied.
Dans le partiel, {{racine}} devient le chemin relatif vers la racine du site
("" pour index.html, "../" pour blog/article.html), pour que les liens marchent partout.
Un lien du menu vers la page courante reçoit aria-current="page".
"""
import os, re, sys

if len(sys.argv) != 2:
    sys.exit("Usage : python3 assembler.py <dossier du site>")
site = sys.argv[1]
dossier_partiels = os.path.join(site, "_partials")
if not os.path.isdir(dossier_partiels):
    sys.exit(f"Dossier introuvable : {dossier_partiels}")

partiels = {}
for f in os.listdir(dossier_partiels):
    if f.endswith(".html"):
        with open(os.path.join(dossier_partiels, f), encoding="utf-8") as h:
            partiels[f[:-5]] = h.read().strip("\n")

zone = re.compile(r"(<!-- partiel:([\w-]+) -->)(.*?)(<!-- /partiel:\2 -->)", re.S)
pages, manquants = 0, set()
for racine, dossiers, fichiers in os.walk(site):
    dossiers[:] = [d for d in dossiers if d != "_partials" and not d.startswith(".")]
    for f in fichiers:
        if not f.endswith(".html"):
            continue
        chemin = os.path.join(racine, f)
        rel = os.path.relpath(chemin, site).replace(os.sep, "/")
        profondeur = rel.count("/")
        vers_racine = "../" * profondeur
        with open(chemin, encoding="utf-8") as h:
            html = h.read()

        def remplacer(m):
            nom = m.group(2)
            if nom not in partiels:
                manquants.add(nom)
                return m.group(0)
            contenu = partiels[nom].replace("{{racine}}", vers_racine)
            contenu = re.sub(r'(<a\s[^>]*href="' + re.escape(vers_racine + rel) + r'")',
                             r'\1 aria-current="page"', contenu)
            return f"{m.group(1)}\n{contenu}\n{m.group(4)}"

        nouveau = zone.sub(remplacer, html)
        if nouveau != html:
            with open(chemin, "w", encoding="utf-8") as h:
                h.write(nouveau)
            pages += 1

print(f"{pages} page(s) mise(s) à jour avec : {', '.join(sorted(partiels)) or 'aucun partiel'}")
if manquants:
    print("Partiels absents de _partials/ : " + ", ".join(sorted(manquants)))
