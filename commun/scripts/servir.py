#!/usr/bin/env python3
"""Sert un dossier en local, sur un port libre, et vérifie que c'est bien lui qui répond.

    python3 commun/scripts/servir.py projet-site/site
    python3 commun/scripts/servir.py projet-site/site --reseau   (avec accord : aussi pour le téléphone)

Écrit l'adresse sur la première ligne, puis reste ouvert (à lancer en arrière-plan). Un port
fixe déjà pris par un autre projet ferait photographier et valider le mauvais site. Accepte
les requêtes Range : une vidéo pilotée au défilement en a besoin. Code 2 : dossier sans
index.html ni accueil.html, ou page servie différente du fichier.
"""
import functools
import http.server
import pathlib
import re
import socket
import sys
import threading
import urllib.request


class Gestion(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a):
        pass

    def do_GET(self):
        plage = re.fullmatch(r"bytes=(\d+)-(\d*)", self.headers.get("Range", ""))
        chemin = pathlib.Path(self.translate_path(self.path))
        if not plage or not chemin.is_file():
            return super().do_GET()
        taille = chemin.stat().st_size
        debut = int(plage[1])
        fin = min(int(plage[2]) if plage[2] else taille - 1, taille - 1)
        if debut > fin:
            self.send_error(416)
            return
        self.send_response(206)
        self.send_header("Content-Type", self.guess_type(str(chemin)))
        self.send_header("Accept-Ranges", "bytes")
        self.send_header("Content-Range", f"bytes {debut}-{fin}/{taille}")
        self.send_header("Content-Length", str(fin - debut + 1))
        self.end_headers()
        with chemin.open("rb") as f:
            f.seek(debut)
            self.wfile.write(f.read(fin - debut + 1))


class Serveur(http.server.ThreadingHTTPServer):
    daemon_threads = True

    def handle_error(self, requete, adresse):
        # Un navigateur qui coupe une vidéo en cours de lecture n'est pas une erreur du site.
        pass


def adresse_locale():
    with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
        try:
            # Aucun paquet n'est envoyé : sert seulement à connaître l'interface de sortie.
            s.connect(("10.255.255.255", 1))
            return s.getsockname()[0]
        except OSError:
            return "adresse-de-cet-ordinateur"


def main():
    args = [a for a in sys.argv[1:] if a != "--reseau"]
    reseau = "--reseau" in sys.argv[1:]
    if len(args) != 1:
        print("Usage : python3 servir.py <dossier du site> [--reseau]")
        return 2
    dossier = pathlib.Path(args[0]).resolve()
    # Le prototype de la maquette s'ouvre sur accueil.html, le site sur index.html.
    index = next((dossier / n for n in ("index.html", "accueil.html") if (dossier / n).is_file()), None)
    if index is None:
        print(f"Pas de index.html ni accueil.html dans {dossier}")
        return 2
    serveur = Serveur(("0.0.0.0" if reseau else "127.0.0.1", 0), functools.partial(Gestion, directory=str(dossier)))
    page = "" if index.name == "index.html" else index.name
    url = f"http://127.0.0.1:{serveur.server_address[1]}/{page}"
    threading.Thread(target=serveur.serve_forever, daemon=True).start()
    if urllib.request.urlopen(url, timeout=10).read() != index.read_bytes():
        print(f"La page servie sur {url} n'est pas {index}")
        return 2
    print(url, flush=True)
    if reseau:
        print(f"Téléphone, sur le même Wi-Fi : http://{adresse_locale()}:{serveur.server_address[1]}/{page}", flush=True)
    threading.Event().wait()


if __name__ == "__main__":
    sys.exit(main())
