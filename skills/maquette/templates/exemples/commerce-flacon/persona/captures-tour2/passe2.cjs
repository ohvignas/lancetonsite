// Parcours acheteuse 375, clavier 1440, mouvement réduit, sans WebGL, densité.
const { chromium } = require("/Users/antoinevigneau/.dev-browser/node_modules/playwright-core");
const path = require("path");
const URL = "http://127.0.0.1:4339/atelier/skills/maquette/templates/exemples/commerce-flacon/index.html";
const cap = (n) => path.join(__dirname, n);
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const GPU = ["--use-angle=metal", "--enable-gpu", "--ignore-gpu-blocklist"];
const allerSel = async (page, sel, dy = 0, t = 1000) => { await page.evaluate(([s, dy]) => { const y = document.querySelector(s).getBoundingClientRect().top + scrollY + dy; const L = window.lenis || window.gestes?.lenis; L ? L.scrollTo(y, { immediate: true, force: true }) : scrollTo(0, y); }, [sel, dy]); await page.waitForTimeout(t); };
const densite = (page) => page.evaluate(() => {
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
  return { mots: detail.reduce((s, d) => s + d.mots, 0), sections: [...document.querySelectorAll("main section")].filter((x) => !x.parentElement.closest("main section")).length, ecrans: +(document.documentElement.scrollHeight / innerHeight).toFixed(1), detail: detail.map((d) => d.bloc + " " + d.mots).join(", ") };
});
const remonter = async (p) => { for (let k = 0; k < 6; k++) { await p.mouse.wheel(0, -120); await p.waitForTimeout(60); } await p.waitForTimeout(700); console.log("en-tête caché après remontée :", await p.evaluate(() => document.querySelector(".entete").classList.contains("is-cache"))); };
const quoi = process.argv[2] || "tout";
(async () => {
  let b = await chromium.launch({ executablePath: CHROME, args: GPU });
  if (quoi === "tout" || quoi === "parcours") {
    const ctx = await b.newContext({ viewport: { width: 375, height: 812 }, hasTouch: true, isMobile: true, deviceScaleFactor: 2 });
    const p = await ctx.newPage(); const err = []; p.on("pageerror", (e) => err.push(e.message));
    await p.goto(URL, { waitUntil: "networkidle" }); await p.waitForTimeout(3000);
    await p.click("[data-burger]"); await p.waitForTimeout(500); await p.screenshot({ path: cap("p375-01-menu.png") });
    await p.click("#menu-mobile a[href='#parfums']"); await p.waitForTimeout(1500); await p.screenshot({ path: cap("p375-02-parfums.png") });
    // Centifolia 100 ml
    const f = p.locator(".fiche").nth(2);
    await f.scrollIntoViewIfNeeded(); await f.locator("label:has-text('100 ml')").click(); await p.waitForTimeout(300);
    console.log("prix Centifolia 100 :", await f.locator("[data-prix]").textContent());
    await f.locator("[data-ajouter]").click(); await p.waitForTimeout(400); await p.screenshot({ path: cap("p375-03-ajout-vol.png") });
    await p.waitForTimeout(1200); console.log("annonce :", await p.textContent("[data-annonce]"), "| compte :", await p.textContent("[data-panier-compte]"));
    // panier seul flacon
    await remonter(p); await p.click("[data-panier-ouvrir]"); await p.waitForTimeout(600); await p.screenshot({ path: cap("p375-04-panier-flacon.png") });
    console.log("panier 1 :", (await p.textContent(".panier-pied")).replace(/\s+/g, " "));
    await p.click("[data-panier-fermer]"); await p.waitForTimeout(400);
    // coffret
    await allerSel(p, "#coffret"); await p.click("#coffret [data-ajouter]"); await p.waitForTimeout(1500);
    console.log("annonce :", await p.textContent("[data-annonce]"));
    await remonter(p); await p.click("[data-panier-ouvrir]"); await p.waitForTimeout(600); await p.screenshot({ path: cap("p375-05-panier-2.png") });
    console.log("panier 2 :", (await p.textContent(".panier")).replace(/\s+/g, " "));
    // retirer Centifolia : coffret seul
    await p.click("[data-qte='0'][data-pas='-1']"); await p.waitForTimeout(400); await p.screenshot({ path: cap("p375-06-panier-coffret-seul.png") });
    console.log("panier coffret seul :", (await p.textContent(".panier-pied")).replace(/\s+/g, " "));
    await p.click("[data-commander]"); await p.waitForTimeout(300); await p.screenshot({ path: cap("p375-07-commander.png") });
    console.log("commander :", await p.textContent("[data-commande-note]"));
    await p.keyboard.press("Escape"); await p.waitForTimeout(400);
    // réservation vide
    await allerSel(p, "[data-reservation]", -80); await p.click("[data-reservation] button[type=submit]"); await p.waitForTimeout(500);
    console.log("focus après envoi vide :", await p.evaluate(() => document.activeElement.outerHTML.slice(0, 90)));
    await p.screenshot({ path: cap("p375-08-resa-erreurs.png") });
    // séance 2 places
    await p.click("label.seance:has-text('14 novembre, 10')"); await p.waitForTimeout(300);
    console.log("options places s1 :", await p.$$eval("#f-places option", (o) => o.map((x) => x.textContent).join(",")), "| aide :", await p.textContent("#aide-places"));
    await p.fill("#f-prenom", "Léa"); await p.fill("#f-nom", "Martin"); await p.fill("#f-mail", "lea.martin@exemple.fr");
    await p.selectOption("#f-places", "2"); await p.waitForTimeout(200);
    console.log("aide 2 :", await p.textContent("#aide-places"));
    // séance 6 places
    await p.click("label.seance:has-text('28 novembre')"); await p.waitForTimeout(200);
    console.log("options places s5 :", await p.$$eval("#f-places option", (o) => o.map((x) => x.textContent).join(",")));
    await p.click("label.seance:has-text('14 novembre, 10')"); await p.selectOption("#f-places", "2");
    // tentative de forcer 4 via le DOM
    await p.evaluate(() => { const s = document.querySelector("#f-places"); s.insertAdjacentHTML("beforeend", "<option>4</option>"); s.value = "4"; });
    await p.click("[data-reservation] button[type=submit]"); await p.waitForTimeout(400);
    console.log("forcé 4 sur 2 :", await p.textContent("#err-places"), "| merci caché :", await p.isHidden("[data-form-merci]"));
    await p.screenshot({ path: cap("p375-09-resa-forcee.png") });
    await p.selectOption("#f-places", "2"); await p.click("[data-reservation] button[type=submit]"); await p.waitForTimeout(600);
    await p.screenshot({ path: cap("p375-10-resa-merci.png") });
    console.log("merci :", (await p.textContent("[data-form-merci]")).replace(/\s+/g, " "));
    // lettre
    await allerSel(p, ".pied"); await p.fill("#f-lettre", "pas-un-mail"); await p.click(".lettre button"); await p.waitForTimeout(300);
    console.log("lettre erreur visible :", await p.isVisible("#err-lettre"));
    // densité 375
    console.log("densité 375 :", JSON.stringify(await densite(p)));
    console.log("erreurs parcours :", err.length ? err : 0);
    await ctx.close();
  }
  if (quoi === "tout" || quoi === "clavier") {
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
    const p = await ctx.newPage(); await p.goto(URL, { waitUntil: "networkidle" }); await p.waitForTimeout(3000);
    const out = [];
    for (let i = 1; i <= 46; i++) {
      await p.keyboard.press("Tab"); await p.waitForTimeout(i < 3 ? 300 : 650);
      const r = await p.evaluate(() => { const e = document.activeElement; const c = e.getBoundingClientRect(); const s = getComputedStyle(e);
        const txt = (e.getAttribute("aria-label") || e.innerText || e.value || e.name || e.tagName).trim().replace(/\s+/g, " ").slice(0, 40);
        const visible = c.bottom > 0 && c.top < innerHeight && c.width > 0 && +s.opacity !== 0;
        let o = 1, n = e; while (n && n !== document.body) { o *= +getComputedStyle(n).opacity; n = n.parentElement; }
        return `${e.tagName.toLowerCase()} « ${txt} » ${visible ? "" : "HORS ÉCRAN "}${o < 0.5 ? "OPACITÉ " + o.toFixed(2) + " " : ""}outline=${s.outlineStyle !== "none" ? s.outlineWidth : s.boxShadow !== "none" ? "ombre" : "AUCUN"}`; });
      out.push(i + ". " + r);
      if ([1, 10, 14, 15, 16, 24, 30].includes(i)) await p.screenshot({ path: cap(`clavier-1440-tab${i}.png`) });
    }
    console.log(out.join("\n"));
    await ctx.close();
  }
  if (quoi === "tout" || quoi === "reduit") {
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
    const p = await ctx.newPage(); const err = []; p.on("pageerror", (e) => err.push(e.message));
    await p.goto(URL, { waitUntil: "networkidle" }); await p.waitForTimeout(3000);
    const pins = await p.evaluate(() => window.ScrollTrigger ? ScrollTrigger.getAll().filter((s) => s.pin).length : 0);
    await p.screenshot({ path: cap("reduit-1440-00.png") });
    let k = 1; const H = await p.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 900; y < H; y += 1800) { await p.evaluate((y) => scrollTo(0, y), y); await p.waitForTimeout(700); await p.screenshot({ path: cap(`reduit-1440-${String(k++).padStart(2, "0")}.png`) }); }
    console.log("réduit : épinglages", pins, "| classes", await p.evaluate(() => document.documentElement.className), "| hauteur", H, "| erreurs", err.length);
    await ctx.close();
    const c2 = await b.newContext({ viewport: { width: 375, height: 812 }, reducedMotion: "reduce" });
    const p2 = await c2.newPage(); await p2.goto(URL, { waitUntil: "networkidle" }); await p2.waitForTimeout(2500);
    await p2.screenshot({ path: cap("reduit-375-00.png") });
    await p2.evaluate(() => scrollTo(0, document.querySelector("#notes").offsetTop)); await p2.waitForTimeout(700); await p2.screenshot({ path: cap("reduit-375-notes.png") });
    await c2.close();
  }
  await b.close();
  if (quoi === "tout" || quoi === "nogl") {
    b = await chromium.launch({ executablePath: CHROME, args: ["--disable-webgl", "--disable-3d-apis"] });
    const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage(); const err = [];
    p.on("pageerror", (e) => err.push(e.message)); p.on("console", (m) => m.type() === "error" && err.push(m.text()));
    await p.goto(URL, { waitUntil: "networkidle" }); await p.waitForTimeout(3000);
    await p.screenshot({ path: cap("nogl-1440-00.png") });
    await allerSel(p, "#flacon", 900); await p.screenshot({ path: cap("nogl-1440-01.png") });
    await allerSel(p, "#notes"); await p.screenshot({ path: cap("nogl-1440-notes.png") });
    const d = await densite(p);
    console.log("sans WebGL : classes", await p.evaluate(() => document.documentElement.className), "| mots", d.mots, "| erreurs", err.length ? err : 0);
    await b.close();
  }
  if (quoi === "tout" || quoi === "densite") {
    b = await chromium.launch({ executablePath: CHROME, args: GPU });
    const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
    await p.goto(URL, { waitUntil: "networkidle" }); await p.waitForTimeout(3500);
    console.log("densité 1440 :", JSON.stringify(await densite(p)));
    await b.close();
  }
})();
