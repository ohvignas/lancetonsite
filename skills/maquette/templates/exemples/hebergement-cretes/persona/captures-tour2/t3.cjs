const { chromium } = require(process.env.PW);
const OUT = __dirname + "/";
const URL = "http://127.0.0.1:4339/atelier/skills/maquette/templates/exemples/hebergement-cretes/index.html";
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const DENS = () => {
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
  return { mots: detail.reduce((s, d) => s + d.mots, 0), sections: [...document.querySelectorAll("main section")].filter((x) => !x.parentElement.closest("main section")).length, ecrans: +(document.documentElement.scrollHeight / innerHeight).toFixed(1), detail, datesTxt: document.getElementById("dates").innerText };
};
(async () => {
  const b = await chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" });
  {
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
    const p = await ctx.newPage(); await p.goto(URL, { waitUntil: "networkidle" }); await wait(3500);
    // journee
    const info = await p.evaluate(() => { const s = document.getElementById("journee"); const sp = s.parentElement.classList.contains("pin-spacer") ? s.parentElement : s; return { top: sp.getBoundingClientRect().top + scrollY, h: sp.offsetHeight }; });
    const jr = [];
    for (let k = 0; k <= 20; k++) { await p.evaluate((y) => scrollTo(0, y), info.top + (info.h - 900) * k / 20); await wait(700); jr.push(await p.evaluate(() => document.querySelector("[data-horloge]").innerText + " / " + [...document.querySelectorAll("[data-moment]")].filter(m => +getComputedStyle(m).opacity > 0.5).map(m => m.querySelector(".heure").innerText).join("|"))); }
    console.log("JOURNEE", JSON.stringify(jr));
    await p.evaluate(() => scrollTo(0, 0)); await wait(1000);
    const d = await p.evaluate(DENS);
    console.log("DENSITE", d.mots, d.sections, d.ecrans, JSON.stringify(d.detail)); console.log("DATESTXT", JSON.stringify(d.datesTxt));
    await ctx.close();
  }
  // keyboard
  {
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
    const p = await ctx.newPage(); await p.goto(URL, { waitUntil: "networkidle" }); await wait(3500);
    const log = [];
    for (let i = 1; i <= 50; i++) {
      await p.keyboard.press("Tab"); await wait(350);
      const r = await p.evaluate(() => { const a = document.activeElement; const r = a.getBoundingClientRect(); const cs = getComputedStyle(a); return { tag: a.tagName, txt: (a.innerText || a.getAttribute("aria-label") || a.name || "").replace(/\s+/g, " ").slice(0, 40), inView: r.top >= 0 && r.bottom <= innerHeight && r.width > 0, outline: cs.outlineStyle + " " + cs.outlineWidth + " " + cs.outlineColor, box: cs.boxShadow !== "none" }; });
      log.push(i + " " + r.tag + " «" + r.txt + "» " + (r.inView ? "vu" : "HORS-ECRAN") + " " + r.outline + (r.box ? " +shadow" : ""));
      if ([1, 2, 6, 12, 18, 24, 30, 36, 42, 50].includes(i)) await p.screenshot({ path: OUT + `50-tab-${String(i).padStart(2, "0")}.png` });
    }
    console.log("TAB\n" + log.join("\n"));
    // arrows in calendar
    await p.focus("[data-cal-grille] button[tabindex='0']");
    const before = await p.evaluate(() => document.activeElement.getAttribute("aria-label"));
    await p.keyboard.press("ArrowRight"); await wait(300);
    const after = await p.evaluate(() => document.activeElement.getAttribute("aria-label") + " | recap: " + document.querySelector("[data-recap]").innerText);
    await p.keyboard.press("ArrowDown"); await wait(300);
    const after2 = await p.evaluate(() => document.activeElement.getAttribute("aria-label"));
    console.log("FLECHES", before, "=>", after, "=>", after2);
    await p.screenshot({ path: OUT + "51-calendrier-fleches.png" });
    await ctx.close();
  }
  // reduced motion
  {
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
    const p = await ctx.newPage(); await p.goto(URL, { waitUntil: "networkidle" }); await wait(3500);
    console.log("REDUIT H", await p.evaluate(() => document.documentElement.scrollHeight), await p.evaluate(() => document.documentElement.className));
    await p.screenshot({ path: OUT + "60-reduit-hero.png" });
    for (const id of ["journee", "nuits", "avis", "final"]) { await p.evaluate((id) => document.getElementById(id).scrollIntoView(), id); await wait(1200); await p.screenshot({ path: OUT + `61-reduit-${id}.png` }); }
    const invis = await p.evaluate(() => [...document.querySelectorAll("main h1,main h2,main p,main li")].filter(e => e.checkVisibility() && +getComputedStyle(e).opacity < 0.1).map(e => e.innerText.slice(0, 30)));
    console.log("REDUIT invisibles", JSON.stringify(invis));
    await ctx.close();
  }
  await b.close();
  // no webgl
  const b2 = await chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", args: ["--disable-webgl", "--disable-3d-apis"] });
  {
    const ctx = await b2.newContext({ viewport: { width: 1440, height: 900 } });
    const p = await ctx.newPage(); const errs = []; p.on("pageerror", e => errs.push(e.message)); p.on("console", m => { if (m.type() === "error") errs.push(m.text()); });
    await p.goto(URL, { waitUntil: "networkidle" }); await wait(3500);
    console.log("SANSGL cls", await p.evaluate(() => document.documentElement.className));
    await p.screenshot({ path: OUT + "70-sansgl-hero.png" });
    for (const [id, off] of [["journee", 1500], ["avis", 0], ["final", 0]]) { await p.evaluate(([id, off]) => scrollTo(0, document.getElementById(id).getBoundingClientRect().top + scrollY + off), [id, off]); await wait(1500); await p.screenshot({ path: OUT + `71-sansgl-${id}.png` }); }
    console.log("SANSGL errs", JSON.stringify(errs));
  }
  {
    const ctx = await b2.newContext({ viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true });
    const p = await ctx.newPage(); await p.goto(URL, { waitUntil: "networkidle" }); await wait(3500);
    await p.screenshot({ path: OUT + "72-sansgl-375-hero.png" });
  }
  await b2.close();
})();
