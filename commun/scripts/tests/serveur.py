#!/usr/bin/env python3
"""Serveur de test : fixtures, plus /bloquee.png qui ne répond pas à temps."""
import functools, http.server, pathlib, socketserver, sys, time

class H(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path.startswith("/bloquee.png"):
            time.sleep(120)
        return super().do_GET()
    def log_message(self, *a):
        pass

class S(socketserver.ThreadingMixIn, http.server.HTTPServer):
    daemon_threads = True

ici = pathlib.Path(__file__).parent / "fixtures"
S(("127.0.0.1", int(sys.argv[1])), functools.partial(H, directory=str(ici))).serve_forever()
