#!/usr/bin/env python3
"""Captures d'une page en état final, avec mesures (boucle persona, relecture visuelle).

Usage :
  python3 commun/scripts/captures.py --verifier      # prérequis, avant toute boucle persona
  python3 commun/scripts/captures.py URL DOSSIER [--tailles 3|6|1440x900,375x812] [--titre "…"]
                                     [--pleine-page] [--mouvement-reduit] [--selecteur CSS] [--hero]

Servir la page avec commun/scripts/servir.py (port libre, page vérifiée). --titre arrête tout si
le titre de la page servie ne contient pas ce texte : un autre site tourne sur ce port.
--tailles 3 : 1440x900, 768x1024, 375x812, pendant le travail. --tailles 6, le défaut : la liste
complète, sur le hero et avant de montrer la page entière.

Pour chaque taille (par défaut la liste unique de conventions.md § 8) :
- attend le chargement (plafond 15 s), force les images différées et attend leur décodage
  (plafond 5 s) ; une image qui ne répond pas est comptée, elle ne bloque rien ;
- en pleine page, sans --selecteur : fait défiler toute la page, pour déclencher les
  apparitions au défilement, puis revient en haut ;
- attend la fin des animations non infinies, enchaînements et timeline GSAP compris
  (plafond 8 s), puis que deux états visuels à 300 ms soient identiques (plafond 3 s) ;
- mesure le débordement horizontal, les éléments hors cadre (même masqués par
  overflow-x:hidden), les animations restantes, les images non chargées, la console, les
  liens internes morts.

Navigateur : Chrome installé (il lit le H.264), sinon le Chromium de Playwright, avec WebGL et
lecture automatique activés, pour tester un hero dans les conditions d'un vrai visiteur.

visuel_stable à false : la page bouge encore. Normal avec une boucle voulue, à regarder
sinon. Ce script voit des états finaux : il ne juge pas la qualité d'un mouvement ni les
animations liées à la position du défilement.

--hero contrôle les briques mesurables du hero (niveau-agence.md § 2 ter) : fond qui bouge
seul, assez pour se voir (au moins 1 % des pixels change de plus de 8 niveaux sur 255 en 2,4 s),
page qui écoute la souris, scène épinglée. Il ajoute <l>x<h>-souris.png et cinq étapes du
défilement, <l>x<h>-defil-00.png à -100.png, à regarder : le script dit que l'effet existe,
il ne dit pas qu'il est beau.

Écrit DOSSIER/<l>x<h>.png (et <l>x<h>-reduit.png avec --mouvement-reduit) et
DOSSIER/mesures.json, mis à jour après chaque taille. Une taille qui échoue note
{"erreur": …} et les suivantes continuent. Code de sortie : 0 (les autres défauts mesurés sont
des constats), 2 si l'URL ne répond pas, si le titre diffère ou si --tailles est mal écrit,
3 si Playwright ou le navigateur manque, 4 si le navigateur est présent mais refuse de démarrer
(bac à sable : ne rien télécharger), 5 si --hero trouve un hero incomplet.
"""
import argparse
import base64
import json
import pathlib
import re
import sys
import time
import urllib.request

TAILLES = ["360x740", "375x667", "375x812", "768x1024", "1280x720", "1440x900"]
TAILLES_COURTES = ["375x812", "768x1024", "1440x900"]
ARGUMENTS_NAVIGATEUR = ["--autoplay-policy=no-user-gesture-required", "--enable-webgl",
                        "--ignore-gpu-blocklist", "--enable-unsafe-swiftshader"]
SEUIL_PIXEL = 8        # écart sur 255, en dessous l'œil ne voit rien
SEUIL_MOUVEMENT = 1.0  # % de pixels qui changent : en dessous, le fond paraît figé

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


ECOUTE_SOURIS = """(() => {
  window.__souris = false;
  const origine = EventTarget.prototype.addEventListener;
  EventTarget.prototype.addEventListener = function (type, ...reste) {
    if (type === "mousemove" || type === "pointermove") window.__souris = true;
    return origine.call(this, type, ...reste);
  };
})();"""

SCENE_HERO = """() => {
  const estEpingle = (el) => {
    const r = el.getBoundingClientRect();
    return r.top < innerHeight * 1.5 && r.height >= innerHeight * 0.7 &&
      (getComputedStyle(el).position === "sticky" || el.classList.contains("pin-spacer"));
  };
  const scene = [...document.querySelectorAll("body *")].find(estEpingle);
  const page = document.scrollingElement || document.documentElement;
  const max = page.scrollHeight - innerHeight;
  // Scène GSAP : le pin-spacer porte lui-même la longueur. Sticky : c'est son parent.
  const piste = !scene ? 0 : scene.classList.contains("pin-spacer") ? scene.offsetHeight - innerHeight
    : scene.parentElement ? scene.parentElement.offsetHeight - innerHeight : 0;
  const debut = scene ? Math.max(0, scene.getBoundingClientRect().top + scrollY) : 0;
  const portee = scene && piste > 0 ? piste : innerHeight * 2;
  return { epinglee: !!scene, debut, portee: Math.max(0, Math.min(portee, max - debut)) };
}"""

COMPARER = """async ([a, b, seuil]) => {
  const pixels = async (d) => {
    const i = new Image();
    i.src = "data:image/png;base64," + d;
    await i.decode();
    const c = new OffscreenCanvas(i.width, i.height).getContext("2d", { willReadFrequently: true });
    c.drawImage(i, 0, 0);
    return c.getImageData(0, 0, i.width, i.height).data;
  };
  const [p, q] = await Promise.all([pixels(a), pixels(b)]);
  let n = 0;
  for (let k = 0; k < p.length; k += 4)
    if (Math.abs(p[k] - q[k]) > seuil || Math.abs(p[k + 1] - q[k + 1]) > seuil || Math.abs(p[k + 2] - q[k + 2]) > seuil) n++;
  return 100 * n / (p.length / 4);
}"""

MEDIAS_HERO = """() => {
  const v = [...document.querySelectorAll("video")];
  let webgl = false;
  try { webgl = !!document.createElement("canvas").getContext("webgl2"); } catch (e) {}
  return { videos: v.length, videos_en_lecture: v.filter((x) => !x.paused && x.readyState >= 2).length, webgl };
}"""

LIENS = """async () => {
  const page = location.pathname;
  const chemins = new Set();
  for (const a of document.querySelectorAll("a[href]")) {
    const u = new URL(a.href);
    if (u.origin === location.origin && u.pathname !== page) chemins.add(u.pathname);
  }
  const morts = [];
  await Promise.all([...chemins].slice(0, 40).map(async (c) => {
    try {
      const r = await fetch(c, { method: "HEAD", signal: AbortSignal.timeout(4000) });
      if (r.status >= 400) morts.push(c);
    } catch (e) { morts.push(c); }
  }));
  return morts.sort();
}"""


def mouvement_visible(page):
    """Part des pixels (%) qui changent à l'œil en 2,4 s. Compare des pixels, pas des octets :
    une boucle peut changer chaque fichier de capture et paraître figée."""
    images = [base64.b64encode(page.screenshot()).decode()]
    for _ in range(3):
        page.wait_for_timeout(800)
        images.append(base64.b64encode(page.screenshot()).decode())
    blanche = page.context.new_page()
    try:
        return round(max(blanche.evaluate(COMPARER, [images[0], i, SEUIL_PIXEL]) for i in images[1:]), 2)
    finally:
        blanche.close()


def controle_hero(page, dossier, taille, l, h):
    pct = mouvement_visible(page)
    medias = page.evaluate(MEDIAS_HERO)
    scene = page.evaluate(SCENE_HERO)
    page.mouse.move(l * 0.25, h * 0.4)
    page.mouse.move(l * 0.75, h * 0.6, steps=8)
    page.wait_for_timeout(500)
    page.screenshot(path=str(dossier / f"{taille}-souris.png"))
    for etape in (0, 25, 50, 75, 100):
        page.evaluate("(y) => window.scrollTo({ top: y, behavior: 'instant' })", scene["debut"] + scene["portee"] * etape / 100)
        page.wait_for_timeout(700)
        page.screenshot(path=str(dossier / f"{taille}-defil-{etape:02d}.png"))
    return {"fond_anime": pct >= SEUIL_MOUVEMENT, "ecoute_souris": page.evaluate("window.__souris === true"),
            "scene_epinglee": scene["epinglee"]}, dict(medias, fond_pixels_changes_pct=pct, scene_portee_px=round(scene["portee"]))


def page_servie(url):
    """Le début du HTML servi, ou None si l'URL ne répond pas."""
    try:
        return urllib.request.urlopen(url, timeout=10).read(200000).decode("utf-8", "replace")
    except Exception:
        return None


def titre_html(html):
    m = re.search(r"<title[^>]*>(.*?)</title>", html, re.I | re.S)
    return m[1].strip() if m else ""


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


def capturer(navigateur, url, dossier, taille, pleine_page, reduit, selecteur, hero=False):
    l, h = (int(x) for x in taille.split("x"))
    contexte = navigateur.new_context(viewport={"width": l, "height": h},
                                      reduced_motion="reduce" if reduit else "no-preference")
    try:
        page = contexte.new_page()
        if hero:
            page.add_init_script(ECOUTE_SOURIS)
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
        mesures.update(animations_restantes=restantes, visuel_stable=stable)
        if hero:
            mesures["hero"], mesures["hero_detail"] = controle_hero(page, dossier, taille, l, h)
        mesures["erreurs_console"] = list(erreurs)  # avant les liens : un 404 testé s'écrit en console
        mesures["liens_morts"] = page.evaluate(LIENS)
        mesures["duree_ms"] = int((time.time() - debut) * 1000)
        return mesures
    finally:
        contexte.close()


def lancer(pw):
    """Chrome installé (il lit le H.264), sinon Chromium de Playwright (aucun téléchargement).
    Rend le navigateur, son nom et, s'il n'a pas démarré, la raison de chaque essai."""
    raisons = []
    for nom, options in (("Google Chrome installé", {"channel": "chrome"}), ("Chromium de Playwright", {})):
        try:
            return pw.chromium.launch(args=ARGUMENTS_NAVIGATEUR, **options), nom, []
        except Exception as e:
            raisons.append(str(e))
    return None, None, raisons


def absent(raison):
    """Vrai si le navigateur n'est pas installé, faux s'il existe et refuse de démarrer."""
    return bool(re.search(r"doesn't exist|is not found|not found at|No such file", raison))


def message_navigateur(raisons):
    if all(absent(r) for r in raisons):
        return 3, ("Manque : un navigateur. À installer (téléchargement, demander l'accord) :"
                   " playwright install chromium")
    detail = next(r for r in raisons if not absent(r)).splitlines()[0][:160]
    return 4, ("Refus de lancement : un navigateur est installé mais n'a pas pu démarrer, le bac à sable"
               f" le bloque sans doute. Relancer hors bac à sable, ne rien télécharger. Détail : {detail}")


def verifier():
    try:
        from playwright.sync_api import sync_playwright
    except ImportError:
        print("Manque : Playwright pour Python. À installer (téléchargement, demander l'accord) :"
              " pip install playwright && playwright install chromium")
        return 3
    with sync_playwright() as pw:
        nav, nom, raisons = lancer(pw)
        if not nav:
            code, message = message_navigateur(raisons)
            print(message)
            return code
        nav.close()
    print(f"Prêt : Playwright pour Python + {nom}.")
    return 0


def alertes(m):
    if "erreur" in m:
        return [f"ÉCHEC : {m['erreur']}"]
    a = []
    if m.get("selecteur_trouve") is False:
        a.append("sélecteur introuvable : capture du haut de page")
    if "hero" in m:
        d = m["hero_detail"]
        fond = f"fond figé à l'œil ({d['fond_pixels_changes_pct']} % de pixels changent, {SEUIL_MOUVEMENT:g} % requis"
        fond += f", {d['videos_en_lecture']} vidéo(s) en lecture sur {d['videos']})" if d["videos"] else ")"
        libelles = {"fond_anime": fond, "ecoute_souris": "aucun effet à la souris",
                    "scene_epinglee": "aucune scène au défilement"}
        manque = [libelles[k] for k, v in m["hero"].items() if not v]
        if manque:
            a.append("hero incomplet : " + ", ".join(manque))
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
    if m["liens_morts"]:
        a.append(f"{len(m['liens_morts'])} lien(s) interne(s) mort(s) ({', '.join(m['liens_morts'][:3])})")
    if m["erreurs_console"]:
        a.append(f"{len(m['erreurs_console'])} erreur(s) console")
    return a


def main():
    if "--verifier" in sys.argv[1:]:
        return verifier()
    p = argparse.ArgumentParser(description="Captures en état final, avec mesures.")
    p.add_argument("url")
    p.add_argument("dossier")
    p.add_argument("--tailles", default="6", help="3, 6 ou une liste : 1440x900,375x812")
    p.add_argument("--titre", help="arrête tout si le titre de la page servie ne contient pas ce texte")
    p.add_argument("--pleine-page", action="store_true")
    p.add_argument("--mouvement-reduit", action="store_true",
                   help="ajoute une capture en mouvement réduit à 375x812")
    p.add_argument("--selecteur", help="fait défiler jusqu'à cet élément avant la capture")
    p.add_argument("--hero", action="store_true", help="contrôle les obligations du hero, sans mouvement réduit")
    a = p.parse_args()

    raccourcis = {"3": TAILLES_COURTES, "6": TAILLES}
    tailles = raccourcis.get(a.tailles.strip()) or [t.strip() for t in a.tailles.split(",") if t.strip()]
    mauvaises = [t for t in tailles if not re.fullmatch(r"[1-9]\d*x[1-9]\d*", t)]
    if mauvaises or not tailles:
        print(f"--tailles mal écrit : {', '.join(mauvaises) or a.tailles} (attendu : 3, 6 ou 1440x900,375x812)")
        return 2
    try:
        from playwright.sync_api import sync_playwright
    except ImportError:
        print("Playwright pour Python manque : pip install playwright && playwright install chromium")
        return 3
    html = page_servie(a.url)
    if html is None:
        print(f"La page ne répond pas : {a.url} (servir avec commun/scripts/servir.py, jamais file://)")
        return 2
    if a.titre and a.titre.lower() not in titre_html(html).lower():
        print(f"Mauvaise page sur {a.url} : titre « {titre_html(html)} », attendu « {a.titre} ». "
              "Un autre site tourne sans doute sur ce port : servir avec commun/scripts/servir.py.")
        return 2

    dossier = pathlib.Path(a.dossier)
    dossier.mkdir(parents=True, exist_ok=True)
    travaux = [(t, t, False) for t in tailles]
    if a.mouvement_reduit:
        travaux.append(("375x812-reduit", "375x812", True))
    resultats = {}
    with sync_playwright() as pw:
        nav, _, raisons = lancer(pw)
        if not nav:
            code, message = message_navigateur(raisons)
            print(message)
            return code
        for cle, t, reduit in travaux:
            try:
                resultats[cle] = capturer(nav, a.url, dossier, t, a.pleine_page, reduit, a.selecteur, a.hero and not reduit)
            except Exception as e:
                resultats[cle] = {"erreur": str(e).splitlines()[0]}
            (dossier / "mesures.json").write_text(json.dumps(resultats, ensure_ascii=False, indent=2))
            m = resultats[cle]
            print(f"{cle:>14}  {'; '.join(alertes(m)) or 'ok'}  ({m.get('duree_ms', '?')} ms)")
        nav.close()
    if any(not all(m["hero"].values()) for m in resultats.values() if "hero" in m):
        print("Hero incomplet : à corriger avant de présenter (niveau-agence.md § 2 ter).")
        return 5
    return 0


if __name__ == "__main__":
    sys.exit(main())
