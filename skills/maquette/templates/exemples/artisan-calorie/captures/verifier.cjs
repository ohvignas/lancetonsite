// Vérification de l'exemple Calorie : node captures/verifier.cjs [base] [filtre]
// 1440 / 768 / 375 / 360 : erreurs console, débordement horizontal, captures pleine page et au défilement du moment signature.
// Puis mouvement réduit (1440, 375) et sans WebGL (1440). Comptage des mots (script de conventions § 11). Résultats : captures/verif.json
const { chromium } = require("/Users/antoinevigneau/.dev-browser/node_modules/playwright-core");
const path = require("path"), fs = require("fs");
const BASE = process.argv[2] || "http://127.0.0.1:4339/atelier/skills/maquette/templates/exemples/artisan-calorie/";
const FILTRE = process.argv[3] || "";
const OUT = __dirname;
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const attendre = (ms) => new Promise((r) => setTimeout(r, ms));

const DENSITE = () => {
  document.querySelectorAll("details").forEach((d) => { d.removeAttribute("name"); d.open = true; });
  const vu = (el) => el.checkVisibility?.() ?? true;
  const mots = (t = "") => t.split(/\s+/).filter((m) => /[\p{L}\p{N}]/u.test(m)).length;
  const masques = (el) => [...el.querySelectorAll('[aria-hidden="true"]')].filter((x) => vu(x) && !x.parentElement.closest('[aria-hidden="true"]')).reduce((s, x) => s + mots(x.innerText), 0);
  const enLigne = /^(H[1-6]|P|SPAN|STRONG|EM|B|SMALL|DT|DD|LABEL|BLOCKQUOTE)$/;
  const etiquettes = (el) => [...el.querySelectorAll("[aria-label]")].filter((x) => vu(x) && enLigne.test(x.tagName) && x.querySelector('[aria-hidden="true"]') && !x.closest('[aria-hidden="true"]') && !(x.parentElement.closest("[aria-label]")?.tagName.match(enLigne))).reduce((s, x) => s + mots(x.getAttribute("aria-label")) - mots(x.innerText) + masques(x), 0);
  const deplier = (el) => el.tagName === "MAIN" || (el.tagName !== "SECTION" && el.querySelector(":scope > section, :scope > main")) ? [...el.children].flatMap(deplier) : [el];
  const blocs = [...document.body.children].flatMap(deplier).filter((el) => !["SCRIPT", "STYLE", "TEMPLATE", "NOSCRIPT"].includes(el.tagName)).filter((el) => vu(el) && el.getAttribute("aria-hidden") !== "true");
  const nom = (b) => b.id || b.firstElementChild?.id || b.tagName.toLowerCase();
  const detail = blocs.map((b) => ({ bloc: nom(b), mots: mots(b.innerText) - masques(b) + etiquettes(b) }));
  return { mots: detail.reduce((s, d) => s + d.mots, 0), sections: [...document.querySelectorAll("main section")].filter((x) => !x.parentElement.closest("main section")).length, ecrans: +(document.documentElement.scrollHeight / innerHeight).toFixed(1), detail };
};

(async () => {
  const res = {};
  const cas = [
    { nom: "1440", w: 1440, h: 900 }, { nom: "768", w: 768, h: 1024 }, { nom: "375", w: 375, h: 812, mobile: true }, { nom: "360", w: 360, h: 740, mobile: true },
    { nom: "reduit-1440", w: 1440, h: 900, reduit: true }, { nom: "reduit-375", w: 375, h: 812, reduit: true, mobile: true },
    { nom: "sans-webgl-1440", w: 1440, h: 900, sansWebgl: true },
  ].filter((c) => c.nom.includes(FILTRE));
  for (const c of cas) {
    const browser = await chromium.launch({ executablePath: CHROME, args: c.sansWebgl ? ["--disable-webgl", "--disable-3d-apis"] : ["--use-angle=metal", "--enable-gpu"] });
    const ctx = await browser.newContext({ viewport: { width: c.w, height: c.h }, deviceScaleFactor: 1, reducedMotion: c.reduit ? "reduce" : "no-preference", isMobile: !!c.mobile, hasTouch: !!c.mobile });
    const page = await ctx.newPage();
    const erreurs = [];
    page.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") erreurs.push(`${m.type()}: ${m.text()}`); });
    page.on("pageerror", (e) => erreurs.push("pageerror: " + e.message));
    page.on("requestfailed", (r) => erreurs.push("requête: " + r.url()));
    await page.goto(BASE + "index.html", { waitUntil: "networkidle" });
    await attendre(3200);
    const r = { erreurs };
    // premier écran
    await page.screenshot({ path: path.join(OUT, `${c.nom}-00-premier-ecran.png`) });
    // défilement progressif : charge les images paresseuses et joue les révélations
    const H = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < H; y += Math.round(c.h * 0.6)) { await page.evaluate((y) => window.scrollTo(0, y), y); await attendre(160); }
    await page.evaluate(() => window.scrollTo(0, 0)); await attendre(800);
    r.debordement = await page.evaluate(() => {
      const w = document.documentElement.clientWidth;
      const fautifs = [...document.querySelectorAll("body *")].filter((el) => { const b = el.getBoundingClientRect(); return b.width && (b.right > w + 1) && getComputedStyle(el).position !== "fixed" && !el.closest(".bande, .trajet-scene, .tableau-defile, dialog"); }).slice(0, 8).map((el) => el.tagName + "." + el.className);
      return { scrollWidth: document.documentElement.scrollWidth, clientWidth: w, fautifs };
    });
    r.sans3d = await page.evaluate(() => document.querySelector("#trajet").classList.contains("sans-3d"));
    r.motionReduit = await page.evaluate(() => document.documentElement.classList.contains("motion-reduit"));
    r.pin = await page.evaluate(() => (window.ScrollTrigger?.getAll() || []).filter((s) => s.pin).length);
    // série de captures du moment signature
    const top = await page.evaluate(() => document.querySelector("#trajet").getBoundingClientRect().top + scrollY);
    const long = c.reduit ? 0 : await page.evaluate(() => { const s = (window.ScrollTrigger?.getAll() || []).find((s) => s.pin); return s ? s.end - s.start : 0; });
    const pas = long ? [0, 0.15, 0.3, 0.5, 0.7, 0.9, 1] : [0];
    for (const [i, k] of pas.entries()) {
      await page.evaluate((y) => window.scrollTo(0, y), top + long * k + (long ? 2 : 0));
      await attendre(long ? 1300 : 900);
      await page.screenshot({ path: path.join(OUT, `${c.nom}-signature-${i}.png`) });
    }
    if (c.reduit) { // vérifier que rien ne bouge seul : deux captures à 1,5 s d'écart identiques
      await page.evaluate(() => window.scrollTo(0, 0)); await attendre(500);
      const a = await page.screenshot(); await attendre(1500); const b = await page.screenshot();
      r.immobile = Buffer.compare(a, b) === 0;
    }
    // simulateur et comparatif
    await page.evaluate(() => document.querySelector("#simulateur").scrollIntoView()); await attendre(1200);
    await page.screenshot({ path: path.join(OUT, `${c.nom}-simulateur.png`) });
    await page.evaluate(() => document.querySelector("#dix-ans").scrollIntoView()); await attendre(2600);
    await page.screenshot({ path: path.join(OUT, `${c.nom}-dix-ans.png`) });
    // pleine page
    await page.evaluate(() => window.scrollTo(0, 0)); await attendre(500);
    await page.screenshot({ path: path.join(OUT, `${c.nom}-page.png`), fullPage: true });
    if (c.nom === "1440") r.densite = await page.evaluate(DENSITE);
    if (c.nom === "375") { // menu ouvert
      await page.click("[data-ouvrir-menu]"); await attendre(700);
      await page.screenshot({ path: path.join(OUT, `${c.nom}-menu.png`) });
    }
    res[c.nom] = r;
    console.log(c.nom, JSON.stringify({ erreurs: r.erreurs, deb: r.debordement, sans3d: r.sans3d, pin: r.pin, reduit: r.motionReduit, immobile: r.immobile }));
    if (r.densite) { console.table(r.densite.detail); console.log(`${r.densite.mots} mots · ${r.densite.sections} sections · ${r.densite.ecrans} écrans`); }
    await browser.close();
  }
  const fichier = path.join(OUT, "verif.json");
  const ancien = fs.existsSync(fichier) ? JSON.parse(fs.readFileSync(fichier, "utf8")) : {};
  fs.writeFileSync(fichier, JSON.stringify({ ...ancien, ...res }, null, 1));
})();
