const { chromium } = require("/Users/antoinevigneau/.dev-browser/node_modules/playwright-core");
(async () => {
  const b = await chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", args: process.argv[2]==="nogl"?["--disable-webgl","--disable-3d-apis"]:[] });
  const c = await b.newContext({ viewport: { width: +process.argv[3]||375, height: 812 }, isMobile: (+process.argv[3]||375)<500, hasTouch: true, reducedMotion: process.argv[2]==="reduit"?"reduce":"no-preference" });
  const p = await c.newPage();
  await p.goto("http://127.0.0.1:4339/atelier/skills/maquette/templates/exemples/artisan-calorie/index.html", { waitUntil: "networkidle" });
  await p.waitForTimeout(3000);
  const H = await p.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < H; y += 500) { await p.evaluate((y) => scrollTo(0, y), y); await p.waitForTimeout(150); }
  await p.waitForTimeout(1500);
  console.log(JSON.stringify(await p.evaluate(() => [...document.querySelectorAll("main h1,main h2,main h3,main p,main li")].filter((e) => { let o = 1, n = e; while (n && n.nodeType === 1) { o *= +getComputedStyle(n).opacity; n = n.parentElement; } return o < 0.1 && e.checkVisibility(); }).map((e) => e.className + "|" + e.innerText.slice(0, 40)))));
  await b.close();
})();
