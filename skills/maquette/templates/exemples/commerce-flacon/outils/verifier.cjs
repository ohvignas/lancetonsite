// Vérification de la page Ciste : 1440, 768, 375, 360 ; console ; débordement ; captures au défilement ;
// mouvement réduit ; sans WebGL ; densité (conventions § 11) ; titres coupés (§ 12) ; séquences Blender (images
// chargées, défilement sans saut : l'image affichée avance pas à pas avec le défilement).
// Usage : node outils/verifier.cjs <url> [rapide]
const { chromium } = require("/Users/antoinevigneau/.dev-browser/node_modules/playwright-core");
const path = require("path");
const url = process.argv[2], rapide = process.argv[3] === "rapide";
const cap = (n) => path.join(__dirname, "..", "captures", n);
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const SECTIONS = ["#flacon", "#preuves", "#notes", "#details", "#parfums", "#coffret", "#atelier", "#maison", "#avis", "#journal", "#questions", "#final"];

const aller = async (page, y) => {
  await page.evaluate((y) => { if (window.lenis) window.lenis.scrollTo(y, { immediate: true, force: true }); else window.scrollTo(0, y); }, y);
  await page.waitForTimeout(900);
};
const densite = (page) => page.evaluate(() => {
  document.querySelectorAll("details").forEach((d) => { d.removeAttribute("name"); d.open = true; });
  const vu = (el) => el.checkVisibility?.() ?? true;
  const mots = (t = "") => t.split(/\s+/).filter((m) => /[\p{L}\p{N}]/u.test(m)).length;
  const masques = (el) => [...el.querySelectorAll('[aria-hidden="true"]')].filter((x) => vu(x) && !x.parentElement.closest('[aria-hidden="true"]')).reduce((s, x) => s + mots(x.innerText), 0);
  const enLigne = /^(H[1-6]|P|SPAN|STRONG|EM|B|SMALL|DT|DD|LABEL|BLOCKQUOTE)$/;
  const etiquettes = (el) => [...el.querySelectorAll("[aria-label]")].filter((x) => vu(x) && enLigne.test(x.tagName) && x.querySelector('[aria-hidden="true"]') && !x.closest('[aria-hidden="true"]') && !(x.parentElement.closest("[aria-label]")?.tagName.match(enLigne))).reduce((s, x) => s + mots(x.getAttribute("aria-label")) - mots(x.innerText) + masques(x), 0);
  const deplier = (el) => el.tagName === "MAIN" || (el.tagName !== "SECTION" && el.querySelector(":scope > section, :scope > main")) ? [...el.children].flatMap(deplier) : [el];
  const blocs = [...document.body.children].flatMap(deplier).filter((el) => !["SCRIPT", "STYLE", "TEMPLATE", "NOSCRIPT"].includes(el.tagName)).filter((el) => vu(el) && el.getAttribute("aria-hidden") !== "true");
  const nom = (b) => b.id || b.firstElementChild?.id || b.className || b.tagName.toLowerCase();
  const detail = blocs.map((b) => ({ bloc: String(nom(b)).slice(0, 24), mots: mots(b.innerText) - masques(b) + etiquettes(b) }));
  return { mots: detail.reduce((s, d) => s + d.mots, 0), sections: [...document.querySelectorAll("main section")].filter((x) => !x.parentElement.closest("main section")).length, ecrans: +(document.documentElement.scrollHeight / innerHeight).toFixed(1), detail };
});
const coupes = (page) => page.evaluate(() => {
  const res = [];
  document.querySelectorAll("h1, h2, h3, [data-titre]").forEach((h) => {
    const w = document.createTreeWalker(h, NodeFilter.SHOW_TEXT);
    for (let n; (n = w.nextNode()); ) for (const m of n.data.matchAll(/[\p{L}\p{N}][-‐](?=[\p{L}\p{N}])/gu)) {
      const i = m.index + 1, r = document.createRange();
      r.setStart(n, i); r.setEnd(n, i + 1); const a = r.getBoundingClientRect();
      r.setStart(n, i + 1); r.setEnd(n, i + 2); const b = r.getBoundingClientRect();
      if (b.top > a.top + a.height / 2) res.push(h.textContent.trim().slice(0, 60));
    }
  });
  return res;
});

(async () => {
  const navigateur = await chromium.launch({ executablePath: CHROME, args: ["--use-angle=metal", "--enable-gpu", "--ignore-gpu-blocklist"] });
  const tailles = rapide ? [[1440, 900]] : [[1440, 900], [768, 1024], [375, 812], [360, 740]];
  for (const [l, h] of tailles) {
    const ctx = await navigateur.newContext({ viewport: { width: l, height: h }, deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    const erreurs = [];
    page.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") erreurs.push(m.type() + ": " + m.text()); });
    page.on("pageerror", (e) => erreurs.push("pageerror: " + e.message));
    page.on("response", (r) => { if (r.status() >= 400) erreurs.push(`http ${r.status()}: ${r.url()}`); });
    await page.goto(url, { waitUntil: "networkidle" });
    await page.waitForTimeout(2500);
    await page.screenshot({ path: cap(`${l}-01-arrivee.png`) });
    const deb = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    // les deux scènes épinglées : 6 captures chacune
    const pins = await page.evaluate(() => ScrollTrigger.getAll().filter((s) => s.pin).map((s) => [s.trigger.closest("section").id, s.start, s.end]));
    for (const [id, a, b] of pins) for (const [k, f] of [[1, 0.02], [2, 0.2], [3, 0.4], [4, 0.6], [5, 0.8], [6, 0.99]]) { await aller(page, a + (b - a) * f); await page.screenshot({ path: cap(`${l}-scene-${id}-${k}.png`) }); }
    // séquences : on balaie chaque pin par pas de 1 %, on relève l'image affichée (A.f, B.f)
    if (await page.evaluate(() => !!window.cisteScene)) for (const [id, a, b] of pins) {
      const cle = id === "flacon" ? "A" : "B";
      await page.evaluate(() => { cisteScene.A.toutCharger(); cisteScene.B.toutCharger(); });
      await page.waitForTimeout(2500);
      const fs = [];
      for (let k = 0; k <= 100; k++) {
        await page.evaluate((y) => { window.lenis ? lenis.scrollTo(y, { immediate: true, force: true }) : scrollTo(0, y); }, a + (b - a) * k / 100);
        await page.waitForTimeout(30);
        fs.push(await page.evaluate((c) => cisteScene[c].f, cle));
      }
      const sauts = fs.slice(1).map((f, i) => Math.abs(f - fs[i]));
      const charge = await page.evaluate((c) => { const L = cisteScene[c]; return L.n; }, cle);
      console.log(`  séquence #${id} : ${charge} images, image max ${Math.max(...fs).toFixed(1)}, plus grand pas entre deux pas de 1 % : ${Math.max(...sauts).toFixed(2)} image(s)`);
    }
    let n = 2;
    for (const s of SECTIONS.slice(1)) {
      if (s === "#notes") { n++; continue; }
      const y = await page.evaluate((s) => document.querySelector(s).getBoundingClientRect().top + scrollY + (s === "#final" ? 0 : 0), s);
      await aller(page, y + 1);
      n++;
      if (!rapide || l === 1440) await page.screenshot({ path: cap(`${l}-${String(n).padStart(2, "0")}-${s.slice(1)}.png`) });
    }
    const coupe = await coupes(page);
    const d = await densite(page);
    if (l === 1440) {
      console.table(d.detail);
      await aller(page, 0);
      await page.screenshot({ path: cap(`${l}-pleine-page.png`), fullPage: true });
    }
    console.log(`${l}px : débordement ${deb}px · ${d.mots} mots · ${d.sections} sections · ${d.ecrans} écrans · titres coupés : ${coupe.length ? coupe.join(" | ") : "aucun"}`);
    console.log(erreurs.length ? "  console : " + erreurs.join("\n  ") : "  console : 0 erreur");
    await ctx.close();
  }
  if (!rapide) {
    // mouvement réduit : rien ne bouge seul, pas d'épinglage
    const ctx = await navigateur.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
    const page = await ctx.newPage(); const err = [];
    page.on("pageerror", (e) => err.push(e.message)); page.on("console", (m) => m.type() === "error" && err.push(m.text()));
    await page.goto(url, { waitUntil: "networkidle" }); await page.waitForTimeout(2000);
    const a = await page.screenshot(); await page.waitForTimeout(1200); const b = await page.screenshot();
    const pins = await page.evaluate(() => (window.ScrollTrigger ? ScrollTrigger.getAll().filter((s) => s.pin).length : 0));
    const pause = await page.evaluate(() => [...document.querySelectorAll(".scene-pause")].every((b) => !b.checkVisibility()));
    await page.screenshot({ path: cap("reduit-1440-arrivee.png") });
    const yj = await page.evaluate(() => document.querySelector("#notes").getBoundingClientRect().top + scrollY);
    await page.evaluate((y) => scrollTo(0, y), yj); await page.waitForTimeout(500);
    await page.screenshot({ path: cap("reduit-1440-notes.png") });
    console.log(`mouvement réduit : captures identiques à 1,2 s : ${a.equals(b)} · épinglages : ${pins} · bouton pause caché : ${pause} · erreurs : ${err.length}`);
    await ctx.close();
  }
  await navigateur.close();
  if (!rapide) {
    const sans = await chromium.launch({ executablePath: CHROME, args: ["--disable-webgl", "--disable-3d-apis"] });
    const page = await (await sans.newContext({ viewport: { width: 1440, height: 900 } })).newPage(); const err = [];
    page.on("pageerror", (e) => err.push(e.message)); page.on("console", (m) => m.type() === "error" && err.push(m.text()));
    await page.goto(url, { waitUntil: "networkidle" }); await page.waitForTimeout(2000);
    const cls = await page.evaluate(() => document.documentElement.className);
    await page.screenshot({ path: cap("sans-webgl-1440-arrivee.png") });
    const y = await page.evaluate(() => document.querySelector("#avis").getBoundingClientRect().top + scrollY);
    await page.evaluate((y) => window.lenis ? lenis.scrollTo(y, { immediate: true }) : scrollTo(0, y), y); await page.waitForTimeout(1500);
    await page.screenshot({ path: cap("sans-webgl-1440-avis.png") });
    const d = await densite(page);
    console.log(`sans WebGL : classes « ${cls} » · ${d.mots} mots · ${d.sections} sections · erreurs : ${err.join(" / ") || 0}`);
    await sans.close();
  }
})();
