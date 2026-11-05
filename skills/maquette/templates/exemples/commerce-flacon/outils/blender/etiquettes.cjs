// Ciste — dessine les étiquettes (PNG 2048 px) avec les vraies polices du site, pour le rendu Blender.
//   node outils/blender/etiquettes.cjs      → outils/blender/etiquettes/<id>.png
const { chromium } = require("/Users/antoinevigneau/.dev-browser/node_modules/playwright-core");
const path = require("path"), fs = require("fs");
global.window = {}; require("../../donnees.js");
const P = window.CISTE.parfums;
const html = (nom) => `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,800;1,6..96,400&family=Schibsted+Grotesk:wght@500&display=block" rel="stylesheet">
<style>html,body{margin:0}body{width:2048px;height:1984px;background:#f2f1ea;color:#1d2420;display:grid;place-items:center;
font-family:"Schibsted Grotesk",sans-serif}
.c{position:absolute;inset:83px;border:10px solid #1d2420}.c::after{content:"";position:absolute;inset:22px;border:3px solid #1d2420}
.t{text-align:center;position:relative}
.m{font:800 330px/1 "Bodoni Moda",serif;letter-spacing:56px;margin-right:-56px}
.r{width:320px;height:10px;background:#1d2420;margin:110px auto 90px}
.n{font:italic 400 270px/1 "Bodoni Moda",serif}
.d{font-size:96px;letter-spacing:16px;margin:130px 0 0;line-height:1.7}
.s{font:italic 400 140px/1 "Bodoni Moda",serif;margin-top:90px;transform:rotate(-2deg);color:#14231d}
</style></head><body><div class="c"></div><div class="t"><div class="m">CISTE</div><div class="r"></div>
<div class="n">${nom}</div><div class="d">EAU DE PARFUM · 50 ML<br>GRASSE</div><div class="s">N° 127 / 300</div></div></body></html>`;
(async () => {
  const b = await chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" });
  const p = await b.newPage({ viewport: { width: 2048, height: 1984 } });
  const dossier = path.join(__dirname, "etiquettes");
  for (const x of P) {
    await p.setContent(html(x.nom), { waitUntil: "networkidle" });
    await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: path.join(dossier, x.id + ".png") });
    console.log("ok", x.id);
  }
  await b.close();
})();
