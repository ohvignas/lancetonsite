#!/usr/bin/env python3
"""Captures d'une page en état final, avec mesures (boucle persona, relecture visuelle).

Usage :
  python3 commun/scripts/captures.py --verifier      # prérequis, avant toute boucle persona
  python3 commun/scripts/captures.py URL DOSSIER [--tailles 1440x900,375x812]
                                     [--pleine-page] [--mouvement-reduit] [--selecteur CSS]

Pour chaque taille (par défaut la liste unique de conventions.md § 8) :
- attend le chargement (plafond 15 s), force les images différées et attend leur décodage
  (plafond 5 s) ; une image qui ne répond pas est comptée, elle ne bloque rien ;
- en pleine page, sans --selecteur : fait défiler toute la page, pour déclencher les
  apparitions au défilement, puis revient en haut ;
- attend la fin des animations non infinies, enchaînements et timeline GSAP compris
  (plafond 8 s), puis que deux états visuels à 300 ms soient identiques (plafond 3 s) ;
- mesure le débordement horizontal, les éléments hors cadre (même masqués par
  overflow-x:hidden), les animations restantes, les images non chargées, la console.

visuel_stable à false : la page bouge encore. Normal avec une boucle voulue, à regarder
sinon. Ce script voit des états finaux : il ne juge pas la qualité d'un mouvement ni les
animations liées à la position du défilement.

Écrit DOSSIER/<l>x<h>.png (et <l>x<h>-reduit.png avec --mouvement-reduit) et
DOSSIER/mesures.json, mis à jour après chaque taille. Une taille qui échoue note
{"erreur": …} et les suivantes continuent. Code de sortie : 0 (les défauts mesurés sont
des constats), 2 si l'URL ne répond pas ou si --tailles est mal écrit, 3 si Playwright manque.
"""
import argparse
import json
import pathlib
import re
import sys
import time
import urllib.request

TAILLES = ["360x740", "375x667", "375x812", "768x1024", "1280x720", "1440x900"]

PREPARER = """async (plafond) => {
  document.querySelectorAll('img[loading="lazy"]').forEach((i) => (i.loading = "eager"));
  const images = Promise.all([...document.images].map((i) =>
    i.complete ? (i.decode ? i.decode().catch(() => {}) : null)
               : new Promise((ok) => {
                   i.addEventListener("load", ok, { once: true });
                   i.addEventListener("error", ok, { once: true });
                 })));
  await Promise.race([images, new Promise((ok) => setTimeout(ok, plafond))]);
}"""

DEFILER = """async () => {
  const pause = (ms) => new Promise((ok) => setTimeout(ok, ms));
  const page = document.scrollingElement || document.documentElement;
  for (let y = 0, n = 0; y < page.scrollHeight && n < 60; y += innerHeight, n++) {
    window.scrollTo({ top: y, behavior: "instant" });
    await pause(150);
  }
  window.scrollTo({ top: 0, behavior: "instant" });
  await pause(150);
}"""

ATTENDRE_ANIMATIONS = """async (plafond) => {
  const fin = performance.now() + plafond;
  const pause = (ms) => new Promise((ok) => setTimeout(ok, ms));
  const css = () => document.getAnimations().filter((a) => {
    const t = a.effect && a.effect.getComputedTiming ? a.effect.getComputedTiming() : {};
    return t.iterations !== Infinity && a.playState !== "finished";
  });
  const gsap = () => {
    const tl = window.gsap && window.gsap.globalTimeline;
    if (!tl || !tl.getChildren) return [];
    return tl.getChildren(true, true, false).filter((t) =>
      t.isActive && t.isActive() && !(t.repeat && t.repeat() === -1) && !t.scrollTrigger);
  };
  const restantes = () => css().length + gsap().length;
  let calmes = 0;
  while (performance.now() < fin && calmes < 2) {
    const encours = css();
    if (encours.length) await Promise.race([
      Promise.all(encours.map((a) => a.finished.catch(() => {}))), pause(100)]);
    else await pause(120);
    calmes = restantes() ? 0 : calmes + 1;
  }
  return restantes();
}"""

MESURER = """() => {
  const racine = document.documentElement, v = innerWidth;
  const coupe = (el) => {
    for (let p = el.parentElement; p && p !== document.body && p !== racine; p = p.parentElement)
      if (getComputedStyle(p).overflowX !== "visible") return true;
    return false;
  };
  const dehors = new Set();
  for (const el of document.body.querySelectorAll("*")) {
    const r = el.getBoundingClientRect();
    if (!r.width || !r.height || (r.right <= v + 1 && r.left >= -1)) continue;
    const s = getComputedStyle(el);
    if (s.visibility === "hidden" || s.position === "fixed" || coupe(el)) continue;
    dehors.add(el);
  }
  const premiers = [...dehors].filter((el) => !dehors.has(el.parentElement));
  const nom = (el) => el.tagName.toLowerCase() + (el.id ? "#" + el.id : "") +
    (typeof el.className === "string" && el.className.trim() ? "." + el.className.trim().split(/\\s+/)[0] : "");
  return {
    titre: document.title,
    debordement_px: Math.max(0, racine.scrollWidth - racine.clientWidth),
    elements_hors_cadre: premiers.length,
    exemples_hors_cadre: premiers.slice(0, 3).map(nom),
    images_non_chargees: [...document.images].filter((i) => !i.complete || i.naturalWidth === 0).length,
  };
}"""


def joignable(url):
    try:
        urllib.request.urlopen(url, timeout=10)
        return True
    except Exception:
        return False


def stabiliser(page, plafond=3.0):
    """Vrai si deux états visuels à 300 ms sont identiques avant le plafond (secondes)."""
    fin = time.time() + plafond
    avant = page.screenshot()
    while time.time() < fin:
        page.wait_for_timeout(300)
        apres = page.screenshot()
        if apres == avant:
            return True
        avant = apres
    return False


def console_erreur(erreurs, m):
    if m.type != "error":
        return
    lieu = (m.location or {}).get("url", "")
    if lieu.split("?")[0].endswith("/favicon.ico"):
        return
    erreurs.append(f"{m.text} ({lieu})" if lieu and lieu not in m.text else m.text)


def capturer(navigateur, url, dossier, taille, pleine_page, reduit, selecteur):
    l, h = (int(x) for x in taille.split("x"))
    contexte = navigateur.new_context(viewport={"width": l, "height": h},
                                      reduced_motion="reduce" if reduit else "no-preference")
    try:
        page = contexte.new_page()
        erreurs = []
        page.on("console", lambda m: console_erreur(erreurs, m))
        page.on("pageerror", lambda e: erreurs.append(str(e)))
        debut = time.time()
        page.goto(url, wait_until="domcontentloaded", timeout=60000)
        try:
            page.wait_for_load_state("load", timeout=15000)
        except Exception:
            pass
        page.evaluate(PREPARER, 5000)
        mesures = {}
        if selecteur:
            try:
                el = page.query_selector(selecteur)
            except Exception as e:
                el = None
                mesures["selecteur_erreur"] = str(e).splitlines()[0]
            mesures["selecteur_trouve"] = bool(el)
            if el:
                el.scroll_into_view_if_needed()
        elif pleine_page:
            page.evaluate(DEFILER)
        restantes = page.evaluate(ATTENDRE_ANIMATIONS, 8000)
        stable = stabiliser(page)
        mesures.update(page.evaluate(MESURER))
        nom = f"{taille}{'-reduit' if reduit else ''}.png"
        page.screenshot(path=str(dossier / nom), full_page=pleine_page)
        mesures.update(animations_restantes=restantes, visuel_stable=stable, erreurs_console=erreurs,
                       duree_ms=int((time.time() - debut) * 1000))
        return mesures
    finally:
        contexte.close()


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


def alertes(m):
    if "erreur" in m:
        return [f"ÉCHEC : {m['erreur']}"]
    a = []
    if m.get("selecteur_trouve") is False:
        a.append("sélecteur introuvable : capture du haut de page")
    if m["debordement_px"]:
        a.append(f"débordement {m['debordement_px']} px")
    if m["elements_hors_cadre"]:
        a.append(f"{m['elements_hors_cadre']} élément(s) hors cadre ({', '.join(m['exemples_hors_cadre'])})")
    if m["animations_restantes"]:
        a.append(f"{m['animations_restantes']} animation(s) non finie(s)")
    if not m["visuel_stable"]:
        a.append("la page bouge encore")
    if m["images_non_chargees"]:
        a.append(f"{m['images_non_chargees']} image(s) non chargée(s)")
    if m["erreurs_console"]:
        a.append(f"{len(m['erreurs_console'])} erreur(s) console")
    return a


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

    tailles = [t.strip() for t in a.tailles.split(",") if t.strip()]
    mauvaises = [t for t in tailles if not re.fullmatch(r"[1-9]\d*x[1-9]\d*", t)]
    if mauvaises or not tailles:
        print(f"--tailles mal écrit : {', '.join(mauvaises) or a.tailles} (attendu : 1440x900,375x812)")
        return 2
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
    travaux = [(t, t, False) for t in tailles]
    if a.mouvement_reduit:
        travaux.append(("375x812-reduit", "375x812", True))
    resultats = {}
    with sync_playwright() as pw:
        nav, _ = lancer(pw)
        if not nav:
            print("Aucun navigateur : lancer d'abord captures.py --verifier")
            return 3
        for cle, t, reduit in travaux:
            try:
                resultats[cle] = capturer(nav, a.url, dossier, t, a.pleine_page, reduit, a.selecteur)
            except Exception as e:
                resultats[cle] = {"erreur": str(e).splitlines()[0]}
            (dossier / "mesures.json").write_text(json.dumps(resultats, ensure_ascii=False, indent=2))
            m = resultats[cle]
            print(f"{cle:>14}  {'; '.join(alertes(m)) or 'ok'}  ({m.get('duree_ms', '?')} ms)")
        nav.close()
    return 0


if __name__ == "__main__":
    sys.exit(main())
