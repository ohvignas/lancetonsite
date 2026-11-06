#!/usr/bin/env python3
"""Vérifie qu'un projet a suivi son parcours, d'après ses fichiers. Ne modifie rien.

Usage : python3 commun/scripts/controle_parcours.py projet-site

À lancer avant de présenter une page entière, et avant toute phrase du type « c'est fini ».
Coller le résultat dans le message à l'utilisateur. Code de sortie 1 s'il reste un point « NON ».
Ne juge pas la beauté : seulement ce que le parcours exige et que les fichiers peuvent prouver.
"""
import glob
import html.parser
import os
import re
import sys

SEUIL_PERSONA = 85
SECTIONS = (10, 13)
MOTS = (500, 800)
ETAPES = ("01", "02", "03", "04", "05", "06", "07", "08")
VISUELS = {"img", "video", "canvas", "svg", "picture", "model-viewer"}
SANS_TEXTE = {"script", "style", "noscript", "template"}
ORPHELINES = {"img", "br", "hr", "input", "meta", "link", "source", "wbr", "area", "col", "embed", "track"}
MOTS_INTERNES = re.compile(r"\[(à recevoir|hypothèse|a recevoir)", re.I)


class Page(html.parser.HTMLParser):
    """Sections directes du <main> : visuels et mots de chacune, mots de toute la page."""

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.pile, self.sections, self.mots, self.cache = [], [], 0, 0

    def handle_starttag(self, tag, attrs):
        if tag in ORPHELINES:
            self._visuel(tag)
            return
        if tag in SANS_TEXTE:
            self.cache += 1
        if tag == "section" and "main" in self.pile and "section" not in self.pile:
            nom = dict(attrs).get("id") or dict(attrs).get("class") or f"section {len(self.sections) + 1}"
            self.sections.append({"nom": nom, "visuels": 0, "mots": 0})
        self._visuel(tag)
        self.pile.append(tag)

    def _visuel(self, tag):
        if tag in VISUELS and "section" in self.pile and self.sections:
            self.sections[-1]["visuels"] += 1

    def handle_endtag(self, tag):
        if tag in ORPHELINES or tag not in self.pile:
            return
        while self.pile:
            haut = self.pile.pop()
            if haut in SANS_TEXTE:
                self.cache -= 1
            if haut == tag:
                break

    def handle_data(self, data):
        if self.cache:
            return
        n = len(data.split())
        self.mots += n
        if "section" in self.pile and self.sections:
            self.sections[-1]["mots"] += n


def lire(*morceaux):
    try:
        with open(os.path.join(*morceaux), encoding="utf-8") as f:
            return f.read()
    except OSError:
        return ""


def ligne_tableau(etat, champ):
    m = re.search(rf"^\|\s*{champ}\s*\|\s*(.+?)\s*\|\s*$", etat, re.M | re.I)
    return m.group(1) if m else ""


def notes_persona(etat):
    """Notes sur 100 du client simulé, dans l'ordre du fichier."""
    notes = []
    for l in etat.splitlines():
        if re.search(r"client simulé|persona", l, re.I):
            notes += [int(n) for n in re.findall(r"\b(\d{2,3})\s*/\s*100\b", l)]
            if l.lstrip().lower().startswith("| boucle persona"):
                notes += [int(n) for n in re.findall(r"\b(\d{2,3})\b(?=\s*(?:→|·|$))", l)]
    return notes


def controle(racine):
    res = []

    def point(ok, texte):
        res.append(("OK " if ok else "NON", texte))

    def avis(texte):
        res.append(("AVIS", texte))

    etat = lire(racine, "00-etat.md")
    if not etat:
        point(False, "00-etat.md absent : ce dossier n'est pas un projet Lance ton site")
        return res, ""
    parcours = ligne_tableau(etat, "Parcours")
    point("choisi par l'utilisateur" in parcours.lower(),
          f"parcours choisi par l'utilisateur, pas déduit (lu : « {parcours[:60]} »)")

    if "dossier agence" in parcours.lower():
        vus = [any(glob.glob(os.path.join(racine, e + "-*"))) for e in ETAPES]
        dernier = max((i for i, v in enumerate(vus) if v), default=-1)
        trous = [ETAPES[i] for i in range(dernier) if not vus[i]]
        point(not trous, "étapes faites dans l'ordre" + (f" : manque {', '.join(trous)}" if trous else ""))
        point(vus[6], "maquette présente (07-maquette)" if vus[6] else "maquette absente (07-maquette)")
        return res, parcours

    fiche = lire(racine, "00-fiche.md")
    point(bool(fiche), "00-fiche.md présente")
    point(bool(fiche) and not re.search(r"statut\s*:\s*brouillon", fiche, re.I),
          "fiche validée par l'utilisateur (sinon « statut : brouillon »)")
    point(any(glob.glob(os.path.join(racine, "05-contenus", "*.md"))),
          "textes écrits par un agent, dans 05-contenus/")
    point(os.path.exists(os.path.join(racine, "site", "css", "tokens.css")),
          "site/css/tokens.css tiré du hero validé")

    code = lire(racine, "site", "index.html")
    if not code:
        point(False, "site/index.html absent")
        return res, parcours
    page = Page()
    page.feed(code)
    n = len(page.sections)
    point(SECTIONS[0] <= n <= SECTIONS[1], f"{n} sections dans le <main> (attendu {SECTIONS[0]} à {SECTIONS[1]})")
    point(MOTS[0] <= page.mots <= MOTS[1], f"{page.mots} mots visibles (attendu {MOTS[0]} à {MOTS[1]})")
    nus = [s["nom"] for s in page.sections if not s["visuels"] and s["mots"] > 15]
    # Avis seulement : une FAQ peut s'en passer, et un fond CSS n'est pas vu ici.
    if n and len(nus) / n > 0.4:
        avis(f"{len(nus)} sections sur {n} sans image, vidéo, canvas ni svg ({', '.join(nus)[:140]}) : "
             "regarder la page, le visuel doit y être plus fort que le texte")
    internes = len(MOTS_INTERNES.findall(code))
    point(not internes, f"aucun mot interne dans le HTML ({internes} « [à recevoir] » ou « [hypothèse] »)")

    notes = notes_persona(etat)
    if not notes:
        point(False, "client simulé passé sur la page entière : aucune note dans 00-etat.md")
    else:
        derniere = notes[-1]
        point(derniere >= SEUIL_PERSONA, f"dernière note du client simulé : {derniere}/100 (seuil {SEUIL_PERSONA})")
    if re.search(r"non (re)?test", etat, re.I):
        point(False, "00-etat.md indique des corrections non retestées : relancer un tour `controle`")

    if "section par section" in parcours.lower() and not glob.glob(os.path.join(racine, "site", "_sections", "*")):
        avis("site/_sections/ vide : les sections n'ont pas été faites une par une par des agents `fabricant`")
    if "faites en autonomie" in etat.lower() or "autonomie" in ligne_tableau(etat, "Parcours").lower():
        avis("suite faite en autonomie : vérifier qu'elle a bien suivi `express`, avec ses agents")
    return res, parcours


def main():
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    res, parcours = controle(sys.argv[1])
    print(f"Contrôle du parcours : {sys.argv[1]} ({parcours[:50] or 'parcours inconnu'})")
    for etat, texte in res:
        print(f"  {etat:4} {texte}")
    non = sum(1 for e, _ in res if e == "NON")
    print(f"{non} point(s) NON : à corriger, ou à annoncer tel quel à l'utilisateur." if non else "Aucun point NON.")
    sys.exit(1 if non else 0)


if __name__ == "__main__":
    main()
