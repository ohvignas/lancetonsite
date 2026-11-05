/*
 * Ciste — tire les images fixes depuis outils/rendu.html (même scène three.js que la page).
 *   node outils/rendre.cjs [filtre]     (serveur local sur :4320, voir NOTES.md)
 * PNG → WebP avec cwebp (-q 82), dans images/.
 */
const { chromium } = require("/Users/antoinevigneau/.dev-browser/node_modules/playwright-core");
const { execFileSync } = require("child_process");
const path = require("path");
const fs = require("fs");
const BASE = (process.env.BASE || "http://127.0.0.1:4330") + "/atelier/skills/maquette/templates/exemples/commerce-flacon/outils/rendu.html";
const IMG = path.join(__dirname, "..", "images");
const filtre = process.argv[2] || "";

const parfums = ["restanque", "mistral", "centifolia", "nuitee", "garrigue"];
const matieres = ["rose", "jasmin", "neroli", "ciste", "iris", "vetiver", "benjoin", "figuier"];
const jobs = [
  ...parfums.map((id) => ({ q: `vue=flacon&id=${id}`, sortie: `flacon-${id}.webp` })),
  ...parfums.map((id) => ({ q: `vue=flacon&id=${id}&l=400&h=500`, sortie: `flacon-${id}-400.webp` })),
  { q: "vue=eclate&id=garrigue", sortie: "eclate-garrigue.webp" },
  { q: "vue=eclate&id=garrigue&l=900&h=675", sortie: "eclate-garrigue-900.webp" },
  { q: "vue=gros-bouchon&id=garrigue", sortie: "gros-bouchon.webp" },
  { q: "vue=gros-verre&id=restanque", sortie: "gros-verre.webp" },
  { q: "vue=gros-etiquette&id=centifolia", sortie: "gros-etiquette.webp" },
  { q: "vue=coffret&l=1200&h=800", sortie: "coffret.webp" },
  { q: "vue=orgue&l=1344&h=768", sortie: "orgue-1344.webp" },
  { q: "vue=orgue&l=960&h=549", sortie: "orgue-960.webp" },
  ...matieres.map((id) => ({ q: `vue=fiole&id=${id}&l=480&h=600`, sortie: `fiole-${id}.webp` })),
].filter((j) => j.sortie.includes(filtre));

(async () => {
  const navigateur = await chromium.launch({
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    args: ["--use-angle=metal", "--enable-gpu", "--ignore-gpu-blocklist"],
  });
  const page = await navigateur.newPage({ viewport: { width: 1400, height: 1100 } });
  page.on("console", (m) => m.type() === "error" && console.log("console:", m.text()));
  page.on("pageerror", (e) => console.log("erreur:", e.message));
  for (const j of jobs) {
    await page.goto(`${BASE}?${j.q}`);
    await page.waitForFunction(() => window.rendu === "ok", null, { timeout: 60000 });
    const png = path.join(IMG, j.sortie.replace(".webp", ".png"));
    await page.locator("canvas").screenshot({ path: png });
    execFileSync("/opt/homebrew/bin/cwebp", ["-quiet", "-q", "82", "-m", "6", png, "-o", path.join(IMG, j.sortie)]);
    fs.unlinkSync(png);
    console.log("ok", j.sortie);
  }
  await navigateur.close();
})();
