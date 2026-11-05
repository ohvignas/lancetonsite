// Tour 2 persona : arrivée, défilement, scènes, densité, console, à une taille donnée.
const { chromium } = require("/Users/antoinevigneau/.dev-browser/node_modules/playwright-core");
const path = require("path");
const URL = "http://127.0.0.1:4339/atelier/skills/maquette/templates/exemples/commerce-flacon/index.html";
const [l, h] = (process.argv[2] || "1440x900").split("x").map(Number);
const cap = (n) => path.join(__dirname, n);
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const aller = async (page, y, t = 900) => { await page.evaluate((y) => { const L = window.lenis || window.gestes?.lenis; if (L) L.scrollTo(y, { immediate: true, force: true }); else scrollTo(0, y); }, y); await page.waitForTimeout(t); };
(async () => {
  const b = await chromium.launch({ executablePath: CHROME, args: ["--use-angle=metal", "--enable-gpu", "--ignore-gpu-blocklist"] });
  const ctx = await b.newContext({ viewport: { width: l, height: h } });
  const page = await ctx.newPage(); const err = [];
  page.on("console", (m) => { if (m.type() === "error") err.push(m.text()); });
  page.on("pageerror", (e) => err.push("pageerror " + e.message));
  page.on("requestfailed", (r) => err.push("échec " + r.url().split("/").pop() + " " + r.failure()?.errorText));
  await page.goto(URL, { waitUntil: "networkidle" }); await page.waitForTimeout(3000);
  await page.screenshot({ path: cap(`${l}-00-arrivee.png`) });
  const info = await page.evaluate(() => ({ cls: document.documentElement.className, deb: document.documentElement.scrollWidth - innerWidth, H: document.documentElement.scrollHeight,
    pins: window.ScrollTrigger ? ScrollTrigger.getAll().filter((s) => s.pin).map((s) => [s.trigger.closest("section").id, Math.round(s.start), Math.round(s.end)]) : [] }));
  console.log(JSON.stringify(info));
  for (const [id, a, e] of info.pins) for (const f of [0.02, 0.1, 0.25, 0.4, 0.55, 0.7, 0.85, 1]) { await aller(page, a + (e - a) * f, 1000); await page.screenshot({ path: cap(`${l}-scene-${id}-${String(Math.round(f * 100)).padStart(3, "0")}.png`) }); }
  // défilement lent, écran par écran
  let i = 1;
  for (let y = 0; y < info.H; y += h) { await aller(page, y, 800); await page.screenshot({ path: cap(`${l}-defil-${String(i++).padStart(2, "0")}.png`) }); }
  // sections
  for (const s of ["preuves", "details", "parfums", "coffret", "atelier", "maison", "avis", "journal", "questions", "final"]) {
    const y = await page.evaluate((s) => document.getElementById(s).getBoundingClientRect().top + scrollY, s);
    await aller(page, y + 1, 1100); await page.screenshot({ path: cap(`${l}-section-${s}.png`) });
  }
  // pied
  await aller(page, info.H, 1000); await page.screenshot({ path: cap(`${l}-pied.png`) });
  // défilement rapide à la molette
  await aller(page, 0, 500);
  for (let k = 0; k < 40; k++) { await page.mouse.wheel(0, 600); await page.waitForTimeout(40); }
  await page.waitForTimeout(600); await page.screenshot({ path: cap(`${l}-rapide.png`) });
  // mesures : boutons du catalogue, notes à côté des couches
  const mes = await page.evaluate(() => ({
    boutons: [...document.querySelectorAll(".fiche [data-ajouter]")].map((x) => Math.round(x.getBoundingClientRect().height)),
    debordFin: document.documentElement.scrollWidth - innerWidth,
  }));
  console.log(JSON.stringify(mes));
  console.log("erreurs :", err.length ? err.join("\n ") : 0);
  await b.close();
})();
