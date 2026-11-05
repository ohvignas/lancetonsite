const { chromium } = require("/Users/antoinevigneau/.dev-browser/node_modules/playwright-core");
const path = require("path");
const URL = "http://127.0.0.1:4339/atelier/skills/maquette/templates/exemples/commerce-flacon/index.html";
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const cap = (n) => path.join(__dirname, n);
const aller = async (p, s, dy = 0) => { await p.evaluate(([s, dy]) => { const y = document.querySelector(s).getBoundingClientRect().top + scrollY + dy; (window.lenis || window.gestes?.lenis).scrollTo(y, { immediate: true, force: true }); }, [s, dy]); await p.waitForTimeout(1500); };
(async () => {
  const b = await chromium.launch({ executablePath: CHROME, args: ["--use-angle=metal", "--enable-gpu", "--ignore-gpu-blocklist"] });
  for (const scenario of ["sans-panier-bas", "panier-ferme-croix", "panier-ferme-croix-offset"]) {
    const ctx = await b.newContext({ viewport: { width: 375, height: 812 }, hasTouch: true, isMobile: true });
    const p = await ctx.newPage(); await p.goto(URL, { waitUntil: "networkidle" }); await p.waitForTimeout(3000);
    await p.evaluate(() => { window.__c = []; document.addEventListener("click", (e) => window.__c.push(e.target.className || e.target.tagName), true); });
    if (scenario.startsWith("panier")) { await p.evaluate(() => document.querySelector("[data-panier-ouvrir]").click()); await p.waitForTimeout(600); await p.click("[data-panier-fermer]"); await p.waitForTimeout(600); }
    await aller(p, "#coffret", scenario.endsWith("offset") ? 300 : 0);
    const box = await p.locator("#coffret [data-ajouter]").boundingBox();
    const st = await p.evaluate(() => ({ lenisStoppe: (window.lenis || window.gestes?.lenis)?.isStopped, html: document.documentElement.className, y: scrollY }));
    await p.screenshot({ path: cap(`p375-coffret-${scenario}.png`) });
    await p.tap("#coffret [data-ajouter]"); await p.waitForTimeout(1500);
    console.log(scenario, "box y", Math.round(box.y), JSON.stringify(st), "compte", await p.textContent("[data-panier-compte]"), "clics", JSON.stringify(await p.evaluate(() => window.__c)));
    await ctx.close();
  }
  await b.close();
})();
