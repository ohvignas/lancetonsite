// Capture de la maison fermée (toit en tuiles canal) au début de la démonstration, 1440
const { chromium } = require("/Users/antoinevigneau/.dev-browser/node_modules/playwright-core");
(async () => {
  const b = await chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", args: ["--use-angle=metal", "--enable-gpu"] });
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto("http://127.0.0.1:4339/atelier/skills/maquette/templates/exemples/artisan-calorie/index.html", { waitUntil: "networkidle" });
  await p.waitForTimeout(2000);
  const top = await p.evaluate(() => document.querySelector("#trajet").getBoundingClientRect().top + scrollY);
  for (let y = 0; y < top; y += 200) { await p.mouse.wheel(0, 200); await p.waitForTimeout(50); }
  await p.waitForTimeout(1500);
  await p.screenshot({ path: __dirname + "/desktop-maison-fermee.png" });
  await b.close();
})();
