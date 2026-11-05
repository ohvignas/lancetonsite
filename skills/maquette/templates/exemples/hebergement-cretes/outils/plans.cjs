// Rend les plans fixes du paysage en PNG puis WebP. Usage : node outils/plans.cjs <url de outils/plans.html> [filtre]
const { chromium } = require("/Users/antoinevigneau/.dev-browser/node_modules/playwright-core");
const fs = require("fs"), path = require("path"), { execSync } = require("child_process");
const url = process.argv[2], filtre = process.argv[3] || "";
const dossier = path.join(__dirname, "..", "images");
const PLANS = [
  // repli du fond (sans WebGL, mouvement réduit) : une image par heure, paysage et portrait
  ...[["aube", 0.0, 0.6], ["lever", 0.15, 1.2], ["midi", 0.4, 2.6], ["dore", 0.66, 4.1], ["coucher", 0.86, 5.3], ["nuit", 1.0, 6.4]].flatMap(([n, tod, cz]) => [
    { nom: `plan-${n}-1600`, l: 1600, h: 1000, tod, cz, t: 20 },
    { nom: `plan-${n}-720`, l: 720, h: 1280, tod, cz, t: 20 },
  ]),
  // été / hiver : même cadrage pour la révélation à l'encre
  { nom: "saison-ete-1400", l: 1400, h: 875, tod: 0.64, cz: 3.35, t: 18, snow: 0 },
  { nom: "saison-hiver-1400", l: 1400, h: 875, tod: 0.3, cz: 3.35, t: 18, snow: 1 },
  // vues depuis les fenêtres des chambres (cartes du catalogue)
  { nom: "vue-dortoir-900", l: 900, h: 1100, tod: 0.12, cz: 7.7, t: 9, cx: -0.4 },
  { nom: "vue-six-900", l: 900, h: 1100, tod: 0.4, cz: 9.2, t: 9, cx: 0.3 },
  { nom: "vue-quatre-900", l: 900, h: 1100, tod: 0.7, cz: 11.4, t: 9, cx: -0.2 },
  { nom: "vue-double-900", l: 900, h: 1100, tod: 0.9, cz: 12.6, t: 9, cx: 0.5, snow: 1 },
  // les gardiens et l'appel final
  { nom: "refuge-dore-1400", l: 1400, h: 1000, tod: 0.72, cz: 14.3, t: 30 },
];
(async () => {
  const b = await chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", args: ["--use-angle=metal", "--enable-gpu"] });
  const page = await b.newPage();
  page.on("console", (m) => console.log("console:", m.text()));
  await page.goto(url);
  for (const pl of PLANS.filter((p) => p.nom.includes(filtre))) {
    const data = await page.evaluate((p) => window.rendrePlan(p), pl);
    const png = path.join(dossier, pl.nom + ".png");
    fs.writeFileSync(png, Buffer.from(data.split(",")[1], "base64"));
    execSync(`cwebp -quiet -q 80 -m 6 "${png}" -o "${png.replace(/\.png$/, ".webp")}"`);
    fs.unlinkSync(png);
    console.log("ok", pl.nom);
  }
  await b.close();
})();
