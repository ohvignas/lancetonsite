const { chromium } = require("/Users/antoinevigneau/.dev-browser/node_modules/playwright-core");
(async () => {
  const b = await chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" });
  const c = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
  const p = await c.newPage();
  await p.goto("http://127.0.0.1:4339/atelier/skills/maquette/templates/exemples/artisan-calorie/index.html", { waitUntil: "networkidle" });
  await p.waitForTimeout(1500);
  console.log(await p.evaluate(() => { const x = document.querySelector("[data-releve-pause]"); return JSON.stringify({ hidden: x.hidden, display: getComputedStyle(x).display, txt: x.innerText, pressed: x.getAttribute("aria-pressed") }); }));
  await p.locator(".releve").screenshot({ path: __dirname + "/reduit1440-releve.png" });
  await b.close();
})();
