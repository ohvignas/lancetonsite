#!/usr/bin/env python3
"""Captures d'une page en état final, avec mesures (boucle persona, relecture visuelle).

Usage :
  python3 commun/scripts/captures.py --verifier      # prérequis, avant toute boucle persona
  python3 commun/scripts/captures.py URL DOSSIER [--tailles 1440x900,375x812]
                                     [--pleine-page] [--mouvement-reduit] [--selecteur CSS]

Pour chaque taille (par défaut la liste unique de conventions.md § 8) :
- attend le chargement, force les images différées et attend leur décodage ;
- attend la fin des animations non infinies (plafond 8 s) : on capture l'état final,
  celui que voit le visiteur, pas un état intermédiaire ;
- mesure le débordement horizontal, les animations restantes, les images non chargées
  et les erreurs de la console.

Écrit DOSSIER/<l>x<h>.png (et <l>x<h>-reduit.png avec --mouvement-reduit) et
DOSSIER/mesures.json. Code de sortie : 0 (les défauts mesurés sont des constats),
2 si l'URL ne répond pas, 3 si Playwright manque.
"""
import argparse
import json
import pathlib
import sys
import time
import urllib.request

TAILLES = ["360x740", "375x667", "375x812", "768x1024", "1280x720", "1440x900"]

PREPARER = """async () => {
  document.querySelectorAll('img[loading="lazy"]').forEach((i) => (i.loading = "eager"));
  await Promise.all([...document.images].map((i) =>
    i.complete ? (i.decode ? i.decode().catch(() => {}) : null)
               : new Promise((ok) => (i.onload = i.onerror = ok))));
}"""

ATTENDRE_ANIMATIONS = """async (plafond) => {
  const finies = () => document.getAnimations().filter((a) => {
    const t = a.effect && a.effect.getComputedTiming ? a.effect.getComputedTiming() : {};
    return t.iterations !== Infinity && a.playState !== "finished";
  });
  const attente = Promise.all(finies().map((a) => a.finished.catch(() => {})));
  await Promise.race([attente, new Promise((ok) => setTimeout(ok, plafond))]);
  return finies().length;
}"""

MESURER = """() => ({
  debordement_px: Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth),
  images_non_chargees: [...document.images].filter((i) => !i.complete || i.naturalWidth === 0).length,
})"""


def joignable(url):
    try:
        urllib.request.urlopen(url, timeout=10)
        return True
    except Exception:
        return False


def capturer(navigateur, url, dossier, taille, pleine_page, reduit, selecteur):
    l, h = (int(x) for x in taille.split("x"))
    contexte = navigateur.new_context(viewport={"width": l, "height": h},
                                      reduced_motion="reduce" if reduit else "no-preference")
    page = contexte.new_page()
    erreurs = []
    page.on("console", lambda m: erreurs.append(m.text) if m.type == "error" else None)
    page.on("pageerror", lambda e: erreurs.append(str(e)))
    debut = time.time()
    page.goto(url, wait_until="load", timeout=60000)
    page.evaluate(PREPARER)
    if selecteur:
        el = page.query_selector(selecteur)
        if el:
            el.scroll_into_view_if_needed()
    restantes = page.evaluate(ATTENDRE_ANIMATIONS, 8000)
    mesures = page.evaluate(MESURER)
    nom = f"{taille}{'-reduit' if reduit else ''}.png"
    page.screenshot(path=str(dossier / nom), full_page=pleine_page)
    contexte.close()
    mesures.update(animations_restantes=restantes, erreurs_console=erreurs,
                   duree_ms=int((time.time() - debut) * 1000))
    return mesures


def lancer(pw):
    """Chromium de Playwright, sinon le Chrome installé (aucun téléchargement)."""
    try:
        return pw.chromium.launch(), "Chromium de Playwright"
    except Exception:
        try:
            return pw.chromium.launch(channel="chrome"), "Google Chrome installé"
        except Exception:
            return None, None


def verifier():
    try:
        from playwright.sync_api import sync_playwright
    except ImportError:
        print("Manque : Playwright pour Python. À installer (téléchargement, demander l'accord) :"
              " pip install playwright && playwright install chromium")
        return 3
    with sync_playwright() as pw:
        nav, nom = lancer(pw)
        if not nav:
            print("Manque : un navigateur. À installer (téléchargement, demander l'accord) :"
                  " playwright install chromium")
            return 3
        nav.close()
    print(f"Prêt : Playwright pour Python + {nom}.")
    return 0


def main():
    if "--verifier" in sys.argv[1:]:
        return verifier()
    p = argparse.ArgumentParser(description="Captures en état final, avec mesures.")
    p.add_argument("url")
    p.add_argument("dossier")
    p.add_argument("--tailles", default=",".join(TAILLES))
    p.add_argument("--pleine-page", action="store_true")
    p.add_argument("--mouvement-reduit", action="store_true",
                   help="ajoute une capture en mouvement réduit à 375x812")
    p.add_argument("--selecteur", help="fait défiler jusqu'à cet élément avant la capture")
    a = p.parse_args()

    try:
        from playwright.sync_api import sync_playwright
    except ImportError:
        print("Playwright pour Python manque : pip install playwright && playwright install chromium")
        return 3
    if not joignable(a.url):
        print(f"La page ne répond pas : {a.url} (servir avec python3 -m http.server, jamais file://)")
        return 2

    dossier = pathlib.Path(a.dossier)
    dossier.mkdir(parents=True, exist_ok=True)
    tailles = [t.strip() for t in a.tailles.split(",") if t.strip()]
    resultats = {}
    with sync_playwright() as pw:
        nav, _ = lancer(pw)
        if not nav:
            print("Aucun navigateur : lancer d'abord captures.py --verifier")
            return 3
        for t in tailles:
            resultats[t] = capturer(nav, a.url, dossier, t, a.pleine_page, False, a.selecteur)
        if a.mouvement_reduit:
            t = "375x812"
            resultats[f"{t}-reduit"] = capturer(nav, a.url, dossier, t, a.pleine_page, True, a.selecteur)
        nav.close()
    (dossier / "mesures.json").write_text(json.dumps(resultats, ensure_ascii=False, indent=2))
    for t, m in resultats.items():
        alerte = []
        if m["debordement_px"]:
            alerte.append(f"débordement {m['debordement_px']} px")
        if m["animations_restantes"]:
            alerte.append(f"{m['animations_restantes']} animation(s) non finie(s)")
        if m["images_non_chargees"]:
            alerte.append(f"{m['images_non_chargees']} image(s) non chargée(s)")
        if m["erreurs_console"]:
            alerte.append(f"{len(m['erreurs_console'])} erreur(s) console")
        print(f"{t:>14}  {'; '.join(alerte) or 'ok'}  ({m['duree_ms']} ms)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
