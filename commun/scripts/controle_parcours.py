#!/usr/bin/env python3
"""Vérifie qu'un projet a suivi le parcours complet, d'après ses fichiers. Ne modifie rien.

Usage : python3 commun/scripts/controle_parcours.py projet-site
        python3 commun/scripts/controle_parcours.py projet-site --etape N   (liste de fin de l'étape N)

À lancer avant chaque porte (--etape), avant de présenter une page entière, et avant toute phrase du type « c'est fini ».
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
SEUIL_ETAPE = 85
# Dans l'application Claude, sans navigateur ni exécution locale : ces livrables ne s'exigent pas.
SANS_OUTILS = ("charte.pdf", "/captures/", "07-maquette/prototype/")
# Ce qu'une étape produit toujours, quel que soit le projet. Le reste dépend du cas : le skill le dit.
LIVRABLES = {
    1: ["01-cadrage.md", "sources/recherche.md", "sources/marche.md", "sources/mots-cles*", "sources/concurrents/*.md"],
    2: ["02-marque.md"],
    3: ["03-charte/charte.md", "03-charte/charte.html", "03-charte/charte.pdf", "03-charte/references.md",
        "03-charte/directions.md", "03-charte/logo/logo.*", "03-charte/moodboard/planche.jpg"],
    4: ["04-architecture.md", "04-wireframes/index.html", "04-wireframes/accueil.html", "04-wireframes/captures/accueil/*"],
    5: ["05-contenus/guide.md", "05-contenus/accueil.md", "05-contenus/_micro-textes.md", "05-contenus/_legal.md"],
    6: ["06-medias/medias.md", "06-medias/images/*", "06-medias/web/*"],
    7: ["07-maquette/maquette.md", "07-maquette/prototype/accueil.html", "07-maquette/prototype/theme.css",
        "07-maquette/prototype/gestes.js", "07-maquette/captures/**/*.png"],
    8: ["08-design-system/DESIGN.md", "08-design-system/tokens.json", "08-design-system/tokens.css",
        "08-design-system/tailwind.css", "08-design-system/demo.html", "08-design-system/captures/**/*.png"],
    9: ["09-passation.md"],
    10: ["10-prd.md", "11-plan.md"],
    11: ["11-recette.md"],
    12: ["12-deploiement.md"],
}
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
    res += etapes_validees(racine, etat)
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


def manquants(racine, etape):
    """Livrables toujours obligatoires de l'étape qui n'existent pas encore."""
    dans_claude = "application claude" in ligne_tableau(lire(racine, "00-etat.md"), "Lieu de conception").lower()
    res = []
    for m in LIVRABLES[etape]:
        if dans_claude and any(p in m for p in SANS_OUTILS):
            continue
        trouves = glob.glob(os.path.join(glob.escape(racine), m), recursive=True)
        # Les captures du hero seul ne prouvent pas que la page entière a été capturée.
        if not [t for t in trouves if f"{os.sep}captures{os.sep}hero{os.sep}" not in t]:
            res.append(m)
    return res


def liste_de_fin(racine, etape):
    res = [("NON", f"étape {etape} : {m} manque") for m in manquants(racine, etape)]
    return res or [("OK ", f"étape {etape} : tous les livrables sont là")]


def etapes_validees(racine, etat):
    """Chaque étape marquée validée : son contrôle noté, son dossier de rapports, ses livrables."""
    res = []
    colonnes = None
    for l in etat.splitlines():
        cellules = [c.strip() for c in l.strip().strip("|").split("|")]
        if "Statut" in cellules and "Contrôle" in cellules:
            colonnes = (cellules.index("Statut"), cellules.index("Contrôle"))
            continue
        if not colonnes or not l.lstrip().startswith("|") or not cellules[0].isdigit() or len(cellules) <= colonnes[1]:
            continue
        etape, statut, note = int(cellules[0]), cellules[colonnes[0]], cellules[colonnes[1]]
        if not statut.lower().startswith("validé") or etape not in LIVRABLES:
            continue
        notes = [] if "{{" in note else [int(n) for n in re.findall(r"\b\d{2,3}\b", note)]
        if not notes:
            res.append(("NON", f"étape {etape} validée sans contrôle noté (colonne Contrôle de 00-etat.md)"))
        elif notes[-1] < SEUIL_ETAPE:
            res.append(("NON", f"étape {etape} : contrôle à {notes[-1]}/100 (seuil {SEUIL_ETAPE}) : à annoncer tel quel"))
        else:
            res.append(("OK ", f"étape {etape} : contrôlée ({notes[-1]}/100)"))
        if etape not in (7, 11) and not glob.glob(
                os.path.join(glob.escape(racine), "boucle-persona", f"etape-{etape:02d}", "iteration-*", "*")):
            res.append(("NON", f"étape {etape} : aucun rapport dans boucle-persona/etape-{etape:02d}/"))
        res += [("NON", f"étape {etape} : {m} manque") for m in manquants(racine, etape)]
    return res


def main():
    args = sys.argv[1:]
    etape = None
    if len(args) == 3 and args[1] == "--etape" and args[2].isdigit() and int(args[2]) in LIVRABLES:
        etape = int(args[2])
    elif len(args) != 1:
        sys.exit(__doc__)
    res = liste_de_fin(args[0], etape) if etape else controle(args[0])
    print(f"Contrôle du parcours : {args[0]}")
    for etat, texte in res:
        print(f"  {etat:4} {texte}")
    non = sum(1 for e, _ in res if e == "NON")
    print(f"{non} point(s) NON : à corriger, ou à annoncer tel quel à l'utilisateur." if non else "Aucun point NON.")
    sys.exit(1 if non else 0)


if __name__ == "__main__":
    main()
