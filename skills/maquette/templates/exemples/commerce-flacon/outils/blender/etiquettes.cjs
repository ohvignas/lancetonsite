// Ciste — dessine les étiquettes (PNG 2048 px) avec les vraies polices du site, pour le rendu Blender.
//   node outils/blender/etiquettes.cjs      → outils/blender/etiquettes/<id>.png + couvercle.png (coffret)
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
  // node etiquettes.cjs couvercle : le couvercle seul
  for (const x of process.argv[2] === "couvercle" ? [] : P) {
    await p.setContent(html(x.nom), { waitUntil: "networkidle" });
    await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: path.join(dossier, x.id + ".png") });
    console.log("ok", x.id);
  }
  // couvercle du coffret découverte (posé debout derrière les fioles) : vert ciste, lettres crème
  await p.setViewportSize({ width: 2048, height: 1480 });
  await p.setContent(`<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:opsz,wght@6..96,700&family=Schibsted+Grotesk:wght@600&display=block" rel="stylesheet">
<style>html,body{margin:0}body{width:2048px;height:1480px;background:#2c3a31;color:#ece5d3;text-align:center;font-family:"Schibsted Grotesk",sans-serif}
.d{padding-top:150px;font-size:84px;letter-spacing:14px}.m{font:700 360px/1 "Bodoni Moda",serif;letter-spacing:60px;margin:70px -60px 0 0}
.r{width:260px;height:8px;background:#ece5d3;margin:80px auto 0;opacity:.8}</style></head>
<body><div class="d">COFFRET DÉCOUVERTE · 5 × 2 ML</div><div class="m">CISTE</div><div class="r"></div></body></html>`, { waitUntil: "networkidle" });
  await p.evaluate(() => document.fonts.ready);
  await p.screenshot({ path: path.join(dossier, "couvercle.png") });
  console.log("ok couvercle");
  await b.close();
})();
