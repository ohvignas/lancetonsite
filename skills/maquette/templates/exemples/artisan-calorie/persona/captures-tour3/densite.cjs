// Comptage conventions § 11, à 1440, après défilement complet ; details ouverts PUIS 1,5 s d'attente avant de compter
const { chromium } = require("/Users/antoinevigneau/.dev-browser/node_modules/playwright-core");
const src = require("fs").readFileSync(__dirname + "/t3.cjs", "utf8");
(async () => {
  const b = await chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" });
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto("http://127.0.0.1:4339/atelier/skills/maquette/templates/exemples/artisan-calorie/index.html", { waitUntil: "networkidle" });
  await p.waitForTimeout(3000);
  const H = await p.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < H; y += 500) { await p.mouse.wheel(0, 500); await p.waitForTimeout(120); }
  await p.waitForTimeout(1500);
  await p.evaluate(() => document.querySelectorAll("details").forEach((d) => { d.removeAttribute("name"); d.open = true; }));
  await p.waitForTimeout(1500);
  const D = eval("(" + src.match(/const DENSITE = (\(\) => \{[\s\S]*?\n\});/)[1] + ")");
  const r = await p.evaluate(D);
  console.log(r.mots, r.sections, r.ecrans); console.table(r.detail);
  require("fs").writeFileSync(__dirname + "/densite.json", JSON.stringify(r, null, 1));
  await b.close();
})();
