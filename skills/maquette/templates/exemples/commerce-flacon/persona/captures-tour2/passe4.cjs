const { chromium } = require("/Users/antoinevigneau/.dev-browser/node_modules/playwright-core");
const path = require("path");
const URL = "http://127.0.0.1:4339/atelier/skills/maquette/templates/exemples/commerce-flacon/index.html";
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const cap = (n) => path.join(__dirname, n);
(async () => {
  const b = await chromium.launch({ executablePath: CHROME, args: ["--use-angle=metal", "--enable-gpu", "--ignore-gpu-blocklist"] });
  for (const [nom, opts] of [["1440", { viewport: { width: 1440, height: 900 } }], ["375-souris", { viewport: { width: 375, height: 812 } }], ["375-tactile", { viewport: { width: 375, height: 812 }, hasTouch: true, isMobile: true }]]) {
    const ctx = await b.newContext(opts); const p = await ctx.newPage(); const err = [];
    p.on("pageerror", (e) => err.push(e.message)); p.on("console", (m) => m.type() === "error" && err.push(m.text()));
    await p.goto(URL, { waitUntil: "networkidle" }); await p.waitForTimeout(3000);
    await p.evaluate(() => { window.__clics = []; document.addEventListener("click", (e) => window.__clics.push(e.target.outerHTML.slice(0, 60)), true); });
    for (const sel of ["#coffret [data-ajouter]", "#final [data-ajouter]"]) {
      await p.evaluate((s) => { const y = document.querySelector(s).getBoundingClientRect().top + scrollY - 300; const L = window.lenis || window.gestes?.lenis; L ? L.scrollTo(y, { immediate: true, force: true }) : scrollTo(0, y); }, sel);
      await p.waitForTimeout(1500);
      const avant = await p.textContent("[data-panier-compte]");
      if (opts.hasTouch) await p.tap(sel); else await p.click(sel);
      await p.waitForTimeout(1500);
      console.log(nom, sel, "compte", avant, "→", await p.textContent("[data-panier-compte]"), "| annonce :", await p.textContent("[data-annonce]"));
    }
    // la barre du bas
    if (nom !== "1440") {
      await p.evaluate(() => { const y = document.querySelector("#details").getBoundingClientRect().top + scrollY; (window.lenis || window.gestes?.lenis).scrollTo(y, { immediate: true, force: true }); });
      await p.waitForTimeout(1500);
      const st = await p.evaluate(() => { const e = document.querySelector(".barre-mobile"); const r = e.getBoundingClientRect(); return { top: Math.round(r.top), inert: e.inert, cls: e.className, aria: e.getAttribute("aria-hidden"), op: getComputedStyle(e).opacity, tr: getComputedStyle(e).transform }; });
      console.log(nom, "barre :", JSON.stringify(st));
      await p.screenshot({ path: cap(`p${nom}-barre-details.png`) });
      const avant = await p.textContent("[data-panier-compte]");
      try { if (opts.hasTouch) await p.tap(".barre-mobile [data-ajouter]", { timeout: 4000 }); else await p.click(".barre-mobile [data-ajouter]", { timeout: 4000 }); } catch (e) { console.log(nom, "barre : clic refusé", e.message.split("\n")[0]); }
      await p.waitForTimeout(1500);
      console.log(nom, "barre compte", avant, "→", await p.textContent("[data-panier-compte]"));
    }
    console.log(nom, "clics captés :", JSON.stringify(await p.evaluate(() => window.__clics)), "erreurs", err);
    await ctx.close();
  }
  await b.close();
})();
