// Panier en détail (375) : ce qui est VISIBLE, coffret seul, coffret + flacon.
const { chromium } = require("/Users/antoinevigneau/.dev-browser/node_modules/playwright-core");
const path = require("path");
const URL = "http://127.0.0.1:4339/atelier/skills/maquette/templates/exemples/commerce-flacon/index.html";
const cap = (n) => path.join(__dirname, n);
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const vis = (p) => p.evaluate(() => [...document.querySelectorAll(".panier *")].filter((e) => e.children.length === 0 && e.checkVisibility() && e.textContent.trim()).map((e) => e.textContent.trim()).join(" | "));
const aller = async (p, sel) => { await p.evaluate((s) => { const y = document.querySelector(s).getBoundingClientRect().top + scrollY; const L = window.lenis || window.gestes?.lenis; L ? L.scrollTo(y, { immediate: true, force: true }) : scrollTo(0, y); }, sel); await p.waitForTimeout(1200); };
const ouvrir = async (p) => { await p.evaluate(() => document.querySelector("[data-panier-ouvrir]").click()); await p.waitForTimeout(700); };
(async () => {
  const b = await chromium.launch({ executablePath: CHROME, args: ["--use-angle=metal", "--enable-gpu", "--ignore-gpu-blocklist"] });
  const ctx = await b.newContext({ viewport: { width: 375, height: 812 }, hasTouch: true, isMobile: true, deviceScaleFactor: 2 });
  const p = await ctx.newPage(); await p.goto(URL, { waitUntil: "networkidle" }); await p.waitForTimeout(3000);
  // 1. coffret seul, depuis la barre fixe du bas
  await aller(p, "#details");
  console.log("barre mobile visible :", await p.evaluate(() => { const e = document.querySelector(".barre-mobile"); const r = e.getBoundingClientRect(); return r.top < innerHeight && getComputedStyle(e).visibility !== "hidden" && !e.inert; }));
  await p.screenshot({ path: cap("p375-11-barre.png") });
  await p.tap(".barre-mobile [data-ajouter]").catch((e) => console.log("tap barre impossible :", e.message.split("\n")[0]));
  await p.waitForTimeout(1500);
  console.log("après barre, compte :", await p.textContent("[data-panier-compte]"), "| annonce :", await p.textContent("[data-annonce]"));
  await ouvrir(p); await p.screenshot({ path: cap("p375-12-panier-coffret-seul.png") }); console.log("VISIBLE coffret seul :", await vis(p));
  await p.evaluate(() => document.querySelector("[data-panier]").close()); await p.waitForTimeout(400);
  // 2. ajouter Garrigue 50 depuis le catalogue
  await aller(p, "#parfums"); const f = p.locator(".fiche").nth(4); await f.scrollIntoViewIfNeeded(); await f.locator("[data-ajouter]").tap(); await p.waitForTimeout(1500);
  console.log("après Garrigue :", await p.textContent("[data-annonce]"));
  await ouvrir(p); await p.screenshot({ path: cap("p375-13-panier-coffret-flacon.png") }); console.log("VISIBLE coffret + Garrigue :", await vis(p));
  await p.evaluate(() => document.querySelector("[data-panier]").close()); await p.waitForTimeout(400);
  // 3. bouton coffret de la section coffret
  await p.evaluate(() => { const y = document.querySelector("#coffret").getBoundingClientRect().top + scrollY + 300; (window.lenis || window.gestes?.lenis).scrollTo(y, { immediate: true, force: true }); }); await p.waitForTimeout(1500);
  const btn = p.locator("#coffret [data-ajouter]"); await btn.scrollIntoViewIfNeeded();
  const r = await btn.boundingBox(); console.log("bouton coffret :", JSON.stringify(r));
  const dessus = await p.evaluate(({ x, y }) => { const e = document.elementFromPoint(x, y); return e.outerHTML.slice(0, 80); }, { x: r.x + r.width / 2, y: r.y + r.height / 2 });
  console.log("élément sous le doigt :", dessus);
  await btn.tap(); await p.waitForTimeout(1500); console.log("après bouton coffret :", await p.textContent("[data-annonce]"));
  await ouvrir(p); await p.screenshot({ path: cap("p375-14-panier-final.png") }); console.log("VISIBLE final :", await vis(p));
  await b.close();
})();
