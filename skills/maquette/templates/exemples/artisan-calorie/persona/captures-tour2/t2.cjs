// Tour 2 persona : node t2.cjs <mode>   modes : desktop | mobile375 | mobile360 | reduit1440 | reduit375 | sanswebgl | sim
const { chromium } = require("/Users/antoinevigneau/.dev-browser/node_modules/playwright-core");
const path = require("path"), fs = require("fs");
const URL = "http://127.0.0.1:4339/atelier/skills/maquette/templates/exemples/artisan-calorie/index.html";
const OUT = __dirname, CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const MODE = process.argv[2] || "desktop";
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
const cfg = {
  desktop: { w: 1440, h: 900 }, sim: { w: 1440, h: 900 },
  mobile375: { w: 375, h: 812, mobile: true }, mobile360: { w: 360, h: 740, mobile: true },
  reduit1440: { w: 1440, h: 900, reduit: true }, reduit375: { w: 375, h: 812, mobile: true, reduit: true },
  sanswebgl: { w: 1440, h: 900, sansWebgl: true },
}[MODE];
(async () => {
  const browser = await chromium.launch({ executablePath: CHROME, args: cfg.sansWebgl ? ["--disable-webgl", "--disable-3d-apis"] : ["--use-angle=metal", "--enable-gpu"] });
  const ctx = await browser.newContext({ viewport: { width: cfg.w, height: cfg.h }, deviceScaleFactor: 1, reducedMotion: cfg.reduit ? "reduce" : "no-preference", isMobile: !!cfg.mobile, hasTouch: !!cfg.mobile });
  const page = await ctx.newPage();
  const log = { mode: MODE, erreurs: [] };
  page.on("console", (m) => { if (["error", "warning"].includes(m.type())) log.erreurs.push(`${m.type()}: ${m.text()}`); });
  page.on("pageerror", (e) => log.erreurs.push("pageerror: " + e.message));
  page.on("requestfailed", (r) => log.erreurs.push("requête: " + r.url()));
  const shot = (n, full = false) => page.screenshot({ path: path.join(OUT, `${MODE}-${n}.png`), fullPage: full });
  await page.goto(URL, { waitUntil: "networkidle" });
  await wait(1500); await shot("00-5s"); await wait(2000);
  log.premier = await page.evaluate(() => ({ w: innerWidth, sw: document.documentElement.scrollWidth, h1: document.querySelector("h1").innerText, rassure: document.querySelector(".hero-rassure")?.innerText, ctaVisible: (() => { const b = document.querySelector(".hero .bouton").getBoundingClientRect(); return b.bottom < innerHeight; })() }));
  await shot("01-premier-ecran");

  if (MODE === "sim") {
    await page.evaluate(() => document.querySelector("#simulateur").scrollIntoView()); await wait(1500);
    const set = async (o) => {
      await page.evaluate((o) => {
        const f = document.querySelector("[data-sim]");
        for (const [k, v] of Object.entries(o)) {
          const el = f.querySelector(`[name="${k}"]${["surface", "personnes"].includes(k) ? "" : `[value="${v}"]`}`);
          if (["surface", "personnes"].includes(k)) el.value = v; else el.checked = true;
          el.dispatchEvent(new Event("input", { bubbles: true })); el.dispatchEvent(new Event("change", { bubbles: true }));
        }
      }, o);
      await wait(1600);
      return page.evaluate(() => {
        const g = (k) => document.querySelector(`[data-res="${k}"]`)?.innerText.replace(/\s+/g, " ").trim();
        return { economie: document.querySelector('[data-res="economie"]').getAttribute("aria-label") || g("economie"), avant: g("avant"), apres: g("apres"), prix: g("prix"), aides: g("aides"), reste: g("reste"), retour: g("retour"), dix: document.querySelector("[data-dix-resume]").innerText, joindre: document.querySelector("[data-resume-sim]").innerText, legende: document.querySelector("[data-dix-nom-avant]").innerText, table: [...document.querySelectorAll("[data-dix-table] tbody tr")].map((tr) => tr.innerText.replace(/\s+/g, " ")) };
      });
    };
    const combos = [
      ["martine", { energie: "fioul", surface: 120, isolation: 120, personnes: 2, revenus: 1, projet: "pac-ballon" }],
      ["defaut", { energie: "fioul", surface: 120, isolation: 120, personnes: 3, revenus: 1, projet: "pac-ballon" }],
      ["elec-pac", { energie: "elec", surface: 120, isolation: 120, personnes: 2, revenus: 1, projet: "pac-ballon" }],
      ["elec-pac-220", { energie: "elec", surface: 220, isolation: 120, personnes: 4, revenus: 3, projet: "pac" }],
      ["elec-ballon", { energie: "elec", surface: 120, isolation: 120, personnes: 3, revenus: 1, projet: "ballon" }],
      ["fioul-ballon-3", { energie: "fioul", surface: 120, isolation: 120, personnes: 3, revenus: 1, projet: "ballon" }],
      ["fioul-ballon-1-sup", { energie: "fioul", surface: 120, isolation: 120, personnes: 1, revenus: 3, projet: "ballon" }],
      ["gaz-recent-sup", { energie: "gaz", surface: 90, isolation: 60, personnes: 2, revenus: 3, projet: "pac" }],
      ["propane-tresmod", { energie: "propane", surface: 160, isolation: 90, personnes: 4, revenus: 0, projet: "pac-ballon" }],
      ["fioul-60-sup", { energie: "fioul", surface: 60, isolation: 60, personnes: 1, revenus: 3, projet: "pac-ballon" }],
    ];
    log.sim = {};
    for (const [n, o] of combos) {
      log.sim[n] = await set(o);
      await page.evaluate(() => document.querySelector("#simulateur").scrollIntoView()); await wait(300);
      await shot(`sim-${n}`);
      if (["martine", "elec-pac", "elec-ballon"].includes(n)) { await page.evaluate(() => document.querySelector("#dix-ans").scrollIntoView()); await wait(2600); await shot(`dix-${n}`); }
    }
    // carte ballon -> simulateur
    await page.goto(URL, { waitUntil: "networkidle" }); await wait(2500);
    await page.evaluate(() => document.querySelector("#offre").scrollIntoView()); await wait(1500);
    await shot("offre");
    log.cartes = await page.evaluate(() => [...document.querySelectorAll(".carte")].map((c) => c.innerText.replace(/\s+/g, " ")));
    await page.click(".carte:nth-child(2) .carte-lien"); await wait(2500);
    await shot("carte-ballon-vers-sim");
    log.carteBallon = await page.evaluate(() => ({ projet: document.querySelector('[name="projet"]:checked').value, eco: document.querySelector('[data-res="economie"]').getAttribute("aria-label"), retour: document.querySelector('[data-res="retour"]').innerText, avant: document.querySelector('[data-res="avant"]').innerText }));
    // formulaire
    await page.evaluate(() => document.querySelector("#devis").scrollIntoView()); await wait(1200);
    await page.click("[data-form] button[type=submit]"); await wait(500); await shot("form-vide");
    log.formVide = await page.evaluate(() => ({ invalides: [...document.querySelectorAll('[aria-invalid="true"]')].map((i) => i.id), focus: document.activeElement.id, err: !document.querySelector("[data-erreur]").hidden }));
    await page.fill("#f-prenom", "Martine"); await page.fill("#f-nom", "Test"); await page.fill("#f-commune", "Saignon"); await page.fill("#f-contact", "06 00 00 00 00");
    await page.click('label:has(input[value="aprem"])');
    await page.click("[data-form] button[type=submit]"); await wait(600); await shot("form-rempli");
    log.formOk = await page.evaluate(() => document.querySelector("[data-confirmation]").innerText);
    // figer le relevé
    await page.evaluate(() => scrollTo(0, 0)); await wait(800);
    await page.click("[data-releve-pause]"); const a = await page.innerText('[data-live="dehors"]'); await wait(2600); const b = await page.innerText('[data-live="dehors"]');
    log.figer = { a, b, label: await page.innerText("[data-releve-pause] span") };
  }

  if (MODE === "desktop" || MODE.startsWith("mobile")) {
    // clavier avant défilement
    if (MODE === "desktop") {
      log.tab = [];
      for (let i = 0; i < 45; i++) {
        await page.keyboard.press("Tab"); await wait(120);
        const f = await page.evaluate(() => { const e = document.activeElement; const cs = getComputedStyle(e); const r = e.getBoundingClientRect(); return { t: e.tagName, txt: (e.innerText || e.value || e.getAttribute("aria-label") || "").trim().slice(0, 40), outline: cs.outlineStyle + " " + cs.outlineWidth + " " + cs.outlineColor, inView: r.bottom > 0 && r.top < innerHeight, op: (() => { let o = 1, n = e; while (n && n.nodeType === 1) { o *= +getComputedStyle(n).opacity; n = n.parentElement; } return +o.toFixed(2); })() }; });
        log.tab.push(f);
        if ([1, 8, 12, 14, 18, 22, 30, 38].includes(i)) await shot(`tab-${String(i).padStart(2, "0")}`);
      }
      await page.evaluate(() => scrollTo(0, 0)); await wait(1000);
    }
    // défilement lent
    const H = await page.evaluate(() => document.documentElement.scrollHeight);
    const n = 12; log.captures = [];
    for (let k = 1; k <= n; k++) {
      const y = Math.round((H - cfg.h) * k / n);
      // pas progressifs pour l'épinglage
      const cur = await page.evaluate(() => scrollY);
      for (let s = cur; s < y; s += 180) { await page.mouse.wheel(0, 180); await wait(60); }
      await wait(900);
      const sy = await page.evaluate(() => scrollY);
      await shot(`defile-${String(k).padStart(2, "0")}`); log.captures.push(sy);
    }
    // débordement + densité
    log.debord = await page.evaluate(() => ({ w: innerWidth, sw: document.documentElement.scrollWidth, larges: [...document.querySelectorAll("body *")].filter((e) => e.getBoundingClientRect().right > innerWidth + 1 && getComputedStyle(e).position !== "fixed").slice(0, 8).map((e) => e.className || e.tagName) }));
    log.densite = await page.evaluate(DENSITE);
    // défilement rapide
    await page.evaluate(() => scrollTo(0, 0)); await wait(800);
    for (let i = 0; i < 40; i++) { await page.mouse.wheel(0, 900); await wait(25); }
    await wait(300); await shot("rapide");
    // trajet détaillé
    const top = await page.evaluate(() => document.querySelector("#trajet").getBoundingClientRect().top + scrollY);
    await page.evaluate((t) => scrollTo(0, t - 50), top); await wait(800);
    for (let k = 0; k < 6; k++) { await page.evaluate((d) => scrollBy(0, d), Math.round(cfg.h * 0.45)); await wait(1200); await shot(`trajet-${k}`); }
    if (MODE.startsWith("mobile")) {
      await page.evaluate(() => scrollTo(0, 0)); await wait(800);
      await page.click("[data-ouvrir-menu]"); await wait(800); await shot("menu");
      await page.click('[data-menu] a[href="#simulateur"]'); await wait(1800); await shot("ancre-sim");
      log.ancre = await page.evaluate(() => document.querySelector("#simulateur").getBoundingClientRect().top);
      await page.evaluate(() => document.querySelector("#equipe").scrollIntoView()); await wait(1500); await shot("equipe");
      await page.evaluate(() => document.querySelector("#avis").scrollIntoView()); await wait(1500); await shot("avis");
      log.barre = await page.evaluate(() => getComputedStyle(document.querySelector(".barre-mobile")).transform + " " + document.querySelector(".barre-mobile").className);
    } else {
      for (const id of ["offre", "equipe", "avis", "chantiers", "devis"]) { await page.evaluate((id) => document.querySelector("#" + id).scrollIntoView(), id); await wait(1600); await shot(`section-${id}`); }
      await page.evaluate(() => scrollTo(0, document.documentElement.scrollHeight)); await wait(1000); await shot("pied");
    }
  }

  if (MODE.startsWith("reduit") || MODE === "sanswebgl") {
    await wait(1500); await shot("01b-premier-ecran-1500ms");
    log.rien = await page.evaluate(() => [...document.querySelectorAll("main h1,main h2,main h3,main p,main li")].filter((e) => +getComputedStyle(e).opacity < 0.1 && e.checkVisibility()).length);
    log.pins = await page.evaluate(() => window.ScrollTrigger ? ScrollTrigger.getAll().filter((t) => t.pin).length : -1);
    const H = await page.evaluate(() => document.documentElement.scrollHeight);
    let k = 0;
    for (let y = 0; y < H; y += Math.round(cfg.h * 0.9)) { await page.evaluate((y) => scrollTo(0, y), y); await wait(500); if (k % 2 === 0) await shot(`defile-${String(k).padStart(2, "0")}`); k++; }
    for (const id of ["trajet", "dix-ans", "avis"]) { await page.evaluate((id) => document.querySelector("#" + id).scrollIntoView(), id); await wait(900); await shot(`section-${id}`); if (id === "trajet" && MODE === "sanswebgl") { for (let j = 1; j <= 3; j++) { await page.evaluate(() => scrollBy(0, 500)); await wait(900); await shot(`trajet-${j}`); } } }
    log.debord = await page.evaluate(() => ({ w: innerWidth, sw: document.documentElement.scrollWidth }));
    log.densite = await page.evaluate(DENSITE);
    log.svg = await page.evaluate(() => { const s = document.querySelector("[data-trajet-svg]"), c = document.querySelector("[data-trajet-3d]"); return { svg: s && getComputedStyle(s).display, canvas: c && getComputedStyle(c).display, html: document.documentElement.className }; });
  }
  fs.writeFileSync(path.join(OUT, `${MODE}.json`), JSON.stringify(log, null, 1));
  console.log(JSON.stringify({ ...log, densite: log.densite && { mots: log.densite.mots, sections: log.densite.sections, ecrans: log.densite.ecrans } }, null, 0).slice(0, 6000));
  await browser.close();
})();
