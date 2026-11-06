#!/usr/bin/env python3
"""Vérifie qu'un projet a suivi le parcours complet, d'après ses fichiers. Ne modifie rien.

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

SEUIL_MAQUETTE = 85
SEUIL_SITE = 90
SECTIONS = (10, 13)
MOTS = (500, 800)
ETAPES = ("01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12")
VISUELS = {"img", "video", "canvas", "svg", "picture", "model-viewer"}
SANS_TEXTE = {"script", "style", "noscript", "template"}
ORPHELINES = {"img", "br", "hr", "input", "meta", "link", "source", "wbr", "area", "col", "embed", "track"}
MOTS_INTERNES = re.compile(r"\[(à recevoir|hypothèse|a recevoir|à prouver|a prouver)", re.I)


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
    """Notes sur 100 du client simulé, dans l'ordre du fichier. Le modèle non rempli ne compte pas."""
    notes = []
    for l in etat.splitlines():
        cellules = [c for c in l.split("|") if c.strip()]
        if "{{" not in l and l.lstrip().lower().startswith("| boucle persona") and len(cellules) >= 2:
            cellule = re.sub(r"\b(\d{2,3})\s*/\s*100\b", r"\1", cellules[1].strip())
            notes += [int(n) for n in re.findall(r"(?<![/\d])\b(\d{2,3})\b(?=\s*(?:→|·|$))", cellule)]
    if notes:  # La ligne du tableau fait foi : une décision citant « 85/100 » n'est pas une note.
        return notes
    for l in etat.splitlines():
        if "{{" not in l and re.search(r"client simulé|persona", l, re.I):
            notes += [int(n) for n in re.findall(r"\b(\d{2,3})\s*/\s*100\b", l)]
    return notes


def fait(chemin):
    """Une étape est faite si son fichier existe, ou si son dossier contient au moins un fichier."""
    if os.path.isfile(chemin):
        return True
    return any(fichiers for _, _, fichiers in os.walk(chemin))


def controle(racine):
    res = []

    def point(ok, texte):
        res.append(("OK " if ok else "NON", texte))

    def avis(texte):
        res.append(("AVIS", texte))

    etat = lire(racine, "00-etat.md")
    if not etat:
        point(False, "00-etat.md absent : ce dossier n'est pas un projet Lance ton site")
        return res
    vus = [any(fait(c) for c in glob.glob(os.path.join(racine, e + "-*"))) for e in ETAPES]
    dernier = max((i for i, v in enumerate(vus) if v), default=-1)
    trous = [ETAPES[i] for i in range(dernier) if not vus[i]]
    point(not trous, "étapes faites dans l'ordre" + (f" : manque {', '.join(trous)}" if trous else ""))
    if os.path.exists(os.path.join(racine, "00-fiche.md")) and not vus[0]:
        avis("ancien projet avec 00-fiche.md : voir `statut`, « Reprendre un ancien projet »")
    if dernier >= 4:
        point(any(glob.glob(os.path.join(racine, "05-contenus", "*.md"))),
              "textes écrits par un agent, dans 05-contenus/")

    chemin_site = os.path.join("site", "index.html")
    chemin_maquette = os.path.join("07-maquette", "prototype", "accueil.html")
    code = lire(racine, chemin_site) or lire(racine, chemin_maquette)
    if vus[6] or code:
        point(vus[6], "maquette présente (07-maquette)" if vus[6] else "maquette absente (07-maquette)")
        hero = ligne_tableau(etat, "Hero")
        point(bool(re.search(r"essayé sur sa machine le \d{2}/\d{2}", hero, re.I)),
              f"hero essayé par l'utilisateur sur sa machine (lu : « {hero[:50]} »)")
    a_site = any(fichiers for _, _, fichiers in os.walk(os.path.join(racine, "site")))
    if a_site:
        point(bool(lire(racine, chemin_site)), "site/index.html présent (page d'entrée du site)")
        point(vus[9], "plan écrit avant le code (10-prd.md)")
        point(any(glob.glob(os.path.join(racine, "08-design-system", "*tokens*")))
              or os.path.exists(os.path.join(racine, "site", "css", "tokens.css")),
              "tokens tirés de la maquette validée")
    if not code:
        avis("aucune page à mesurer pour l'instant (site/index.html, 07-maquette/prototype/accueil.html)")
        return res

    page = Page()
    page.feed(code)
    n = len(page.sections)
    ecart = ligne_tableau(etat, "Écart de densité")
    justifie = ecart and "{{" not in ecart and ecart.strip() != "—"

    def densite(ok, texte):
        if ok or not justifie:
            point(ok, texte)
        else:
            avis(f"{texte} : écart justifié dans 00-etat.md (« {ecart[:60]} »)")

    densite(SECTIONS[0] <= n <= SECTIONS[1], f"{n} sections dans le <main> (attendu {SECTIONS[0]} à {SECTIONS[1]})")
    densite(MOTS[0] <= page.mots <= MOTS[1], f"{page.mots} mots visibles (attendu {MOTS[0]} à {MOTS[1]})")
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
        seuil = SEUIL_SITE if a_site else SEUIL_MAQUETTE
        point(derniere >= seuil, f"dernière note du client simulé : {derniere}/100 (seuil {seuil})")
    if re.search(r"non (re)?test", etat, re.I):
        point(False, "00-etat.md indique des corrections non retestées : relancer un tour `controle`")
    return res


def main():
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    res = controle(sys.argv[1])
    print(f"Contrôle du parcours : {sys.argv[1]}")
    for etat, texte in res:
        print(f"  {etat:4} {texte}")
    non = sum(1 for e, _ in res if e == "NON")
    print(f"{non} point(s) NON : à corriger, ou à annoncer tel quel à l'utilisateur." if non else "Aucun point NON.")
    sys.exit(1 if non else 0)


if __name__ == "__main__":
    main()
