const { chromium } = require(process.env.PW);
const OUT = __dirname + "/";
const URL = "http://127.0.0.1:4339/atelier/skills/maquette/templates/exemples/hebergement-cretes/index.html";
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
(async () => {
  const b = await chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", args: ["--use-angle=metal","--enable-gpu"] });
  for (const [w, h, tag] of [[1440, 900, "1440"], [375, 812, "375"]]) {
    const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, isMobile: w < 500, hasTouch: w < 500 });
    const p = await ctx.newPage();
    const errs = [];
    p.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") errs.push(m.type() + ": " + m.text()); });
    p.on("pageerror", (e) => errs.push("pageerror: " + e.message));
    p.on("requestfailed", (r) => errs.push("reqfail: " + r.url() + " " + r.failure()?.errorText));
    p.on("response", (r) => { if (r.status() >= 400) errs.push("HTTP " + r.status() + " " + r.url()); });
    await p.goto(URL, { waitUntil: "networkidle" });
    await wait(3200);
    await p.screenshot({ path: OUT + `${tag}-00-premier-ecran.png` });
    const H = await p.evaluate(() => document.documentElement.scrollHeight);
    const gl = await p.evaluate(() => { const c = document.querySelector("[data-paysage]"); return { canvasW: c?.width, cls: document.documentElement.className }; });
    console.log(tag, "H", H, "ecrans", (H / h).toFixed(1), JSON.stringify(gl));
    // slow scroll: 12 captures evenly
    const n = 12;
    for (let i = 1; i <= n; i++) {
      const y = Math.round((H - h) * i / n);
      // scroll gradually
      await p.evaluate(async (y) => { const s = scrollY; const steps = 20; for (let k = 1; k <= steps; k++) { scrollTo(0, s + (y - s) * k / steps); await new Promise(r => setTimeout(r, 40)); } }, y);
      await wait(1300);
      await p.screenshot({ path: OUT + `${tag}-1${String(i).padStart(2, "0")}-defil.png` });
    }
    // sections
    const ids = await p.evaluate(() => [...document.querySelectorAll("main > section")].map(s => s.id));
    for (const id of ids) {
      await p.evaluate((id) => { const el = document.getElementById(id); scrollTo(0, el.getBoundingClientRect().top + scrollY); }, id);
      await wait(1500);
      await p.screenshot({ path: OUT + `${tag}-2-${id}.png` });
    }
    await p.evaluate(() => scrollTo(0, document.documentElement.scrollHeight)); await wait(1200);
    await p.screenshot({ path: OUT + `${tag}-2-pied.png` });
    // fast scroll
    await p.evaluate(() => scrollTo(0, 0)); await wait(800);
    await p.evaluate(async () => { for (let k = 0; k < 30; k++) { scrollBy(0, 500); await new Promise(r => setTimeout(r, 16)); } });
    await p.screenshot({ path: OUT + `${tag}-30-rapide.png` });
    // overflow
    const ov = await p.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }));
    console.log(tag, "overflow", JSON.stringify(ov));
    console.log(tag, "errs", JSON.stringify(errs, null, 1));
    await ctx.close();
  }
  await b.close();
})();
