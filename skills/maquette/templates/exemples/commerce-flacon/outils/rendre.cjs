/*
 * Ciste — tire l'orgue à parfums (orgue-1344|960.webp) depuis outils/rendu.html (three.js, rendu en code).
 * Les flacons, gros plans, éclaté, coffret et fioles sont rendus dans Blender : outils/blender/ (voir NOTES.md).
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

const jobs = [
  { q: "vue=orgue&l=1344&h=768", sortie: "orgue-1344.webp" },
  { q: "vue=orgue&l=960&h=549", sortie: "orgue-960.webp" },
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
