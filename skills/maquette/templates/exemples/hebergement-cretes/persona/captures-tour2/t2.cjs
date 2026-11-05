const { chromium } = require(process.env.PW);
const OUT = __dirname + "/";
const URL = "http://127.0.0.1:4339/atelier/skills/maquette/templates/exemples/hebergement-cretes/index.html";
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const go = async (p, id, off = 0) => { await p.evaluate(([id, off]) => { const el = document.getElementById(id); scrollTo(0, el.getBoundingClientRect().top + scrollY + off); }, [id, off]); await wait(1500); };
(async () => {
  const b = await chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" });
  // ---------- 375: pill per section, select, total in button
  {
    const ctx = await b.newContext({ viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true });
    const p = await ctx.newPage(); await p.goto(URL, { waitUntil: "networkidle" }); await wait(3000);
    const ids = await p.evaluate(() => [...document.querySelectorAll("main > section")].map(s => s.id));
    const res = {};
    for (const id of ids) { for (const off of [0, 300]) { await go(p, id, off); await wait(800); res[id + "+" + off] = await p.evaluate(() => { const b = document.querySelector("[data-pause-brume]"); const r = b.getBoundingClientRect(); const cs = getComputedStyle(b); return b.hidden ? "hidden" : `${cs.display}/${cs.visibility}/op${cs.opacity}`; }); } }
    console.log("PILL375", JSON.stringify(res));
    await go(p, "nuits", 0); await wait(1500); await p.screenshot({ path: OUT + "375-pastille-nuits.png" });
    await go(p, "dates", 300);
    const sel = await p.evaluate(() => { const s = document.querySelector("[data-champ-chambre]"); return { w: s.clientWidth, opts: [...s.options].map(o => o.text) }; });
    console.log("SELECT375", JSON.stringify(sel));
    await p.screenshot({ path: OUT + "375-dates-formulaire.png" });
    await go(p, "dates", 900); await p.screenshot({ path: OUT + "375-dates-calendrier.png" });
    await go(p, "dates", 1500); await p.screenshot({ path: OUT + "375-dates-envoi.png" });
    const btn = await p.evaluate(() => document.querySelector(".reservation button[type=submit]").innerText);
    console.log("BTN375", btn);
    // profile label sizes
    const prof = await p.evaluate(() => { const t = document.querySelector(".profil text"); return t.getBoundingClientRect().height; });
    console.log("PROFIL label h px 375", prof);
    await go(p, "final", 0); await p.screenshot({ path: OUT + "375-final.png" });
    await ctx.close();
  }
  // ---------- 1440 parcours
  {
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
    const p = await ctx.newPage(); const errs = [];
    p.on("pageerror", (e) => errs.push(e.message)); p.on("console", m => { if (m.type() === "error") errs.push(m.text()); });
    await p.goto(URL, { waitUntil: "networkidle" }); await wait(3000);
    // hero CTA
    await p.click("#action-arrivee"); await wait(2500);
    console.log("after CTA top of #dates", await p.evaluate(() => document.getElementById("dates").getBoundingClientRect().top));
    await p.screenshot({ path: OUT + "40-apres-cta-hero.png" });
    // Choisir double
    await go(p, "nuits", 0);
    await p.click('[data-choisir="double"]'); await wait(2500);
    const st = async () => p.evaluate(() => ({ ch: document.querySelector("[data-champ-chambre]").value, pers: document.querySelector("[data-champ-personnes]").value, nuits: document.querySelector("[data-champ-nuits]").value, recap: document.querySelector("[data-recap]").innerText, total: document.querySelector("[data-total]").innerText, arrhes: document.querySelector("[data-arrhes]").innerText, lits: document.querySelector("[data-lits-libres]").innerText, btn: document.querySelector(".reservation button[type=submit]").innerText, mois: document.querySelector("[data-cal-mois]").innerText }));
    console.log("DOUBLE", JSON.stringify(await st()));
    await p.screenshot({ path: OUT + "41-apres-choisir-double.png" });
    // club 12 dortoir 1 night
    await p.selectOption("[data-champ-chambre]", "dortoir"); await p.fill("[data-champ-personnes]", "12"); await p.locator("[data-champ-personnes]").dispatchEvent("change"); await p.locator("[data-champ-personnes]").dispatchEvent("input"); await p.selectOption("[data-champ-nuits]", "1"); await wait(1500);
    console.log("CLUB12", JSON.stringify(await st()));
    await go(p, "dates", 0); await p.screenshot({ path: OUT + "42-club-12.png" });
    // 20 persons
    await p.fill("[data-champ-personnes]", "20"); await p.locator("[data-champ-personnes]").dispatchEvent("change"); await wait(800);
    console.log("PERS20", await p.evaluate(() => document.querySelector("[data-champ-personnes]").value));
    // Lea Tom lauzet July 2027 + picnic
    await p.selectOption("[data-champ-chambre]", "quatre"); await p.fill("[data-champ-personnes]", "2"); await p.locator("[data-champ-personnes]").dispatchEvent("change"); await p.selectOption("[data-champ-nuits]", "1");
    for (let i = 0; i < 7; i++) { await p.click("[data-cal-suiv]"); await wait(250); }
    const cells = await p.evaluate(() => [...document.querySelectorAll("[data-cal-grille] button")].map(b => ({ t: b.innerText.replace(/\n/g, "/"), dis: b.disabled, al: b.getAttribute("aria-label"), ti: b.tabIndex })));
    console.log("MOIS", await p.evaluate(() => document.querySelector("[data-cal-mois]").innerText), JSON.stringify(cells.slice(0, 40)));
    // click first saturday available
    const sat = cells.findIndex(c => /samedi/.test(c.al || "") && !c.dis);
    if (sat >= 0) await p.locator("[data-cal-grille] button").nth(sat).click();
    await p.check('input[name="piquenique"]'); await wait(1200);
    console.log("LEATOM", JSON.stringify(await st()));
    await go(p, "dates", 0); await p.screenshot({ path: OUT + "43-lea-tom-juillet.png" });
    // Error: empty submit
    await p.click(".reservation button[type=submit]"); await wait(600);
    const e1 = await p.evaluate(() => ({ msg: document.querySelector("[data-erreur]").innerText, inv: [...document.querySelectorAll(".identite input")].map(i => i.name + ":" + i.getAttribute("aria-invalid")) }));
    console.log("ERR-vide", JSON.stringify(e1));
    await p.fill('input[name=nom]', "Martin"); await p.fill('input[name=email]', "lea@example.com");
    await p.click(".reservation button[type=submit]"); await wait(600);
    const e2 = await p.evaluate(() => ({ msg: document.querySelector("[data-erreur]").innerText, inv: [...document.querySelectorAll(".identite input")].map(i => i.name + ":" + i.getAttribute("aria-invalid")) }));
    console.log("ERR-prenom", JSON.stringify(e2));
    await p.fill('input[name=prenom]', "Léa"); await p.click(".reservation button[type=submit]"); await wait(1200);
    console.log("CONF", await p.evaluate(() => document.querySelector("[data-confirmation]").innerText));
    await p.screenshot({ path: OUT + "44-confirmation.png" });
    // Hiver
    await go(p, "saisons", 0); await p.click("[data-revele-bouton]"); await wait(2500);
    await p.screenshot({ path: OUT + "45-hiver.png" });
    // FAQ douche
    await go(p, "questions", 0); await p.click("details:nth-of-type(4) summary"); await wait(900);
    await p.screenshot({ path: OUT + "46-faq-douche.png" });
    // journee clock vs card check: sample progress
    const jr = [];
    const top = await p.evaluate(() => document.getElementById("journee").getBoundingClientRect().top + scrollY);
    const len = await p.evaluate(() => { const s = document.getElementById("journee"); const sp = s.parentElement.classList.contains("pin-spacer") ? s.parentElement : s; return sp.offsetHeight; });
    for (let k = 0; k <= 10; k++) { await p.evaluate((y) => scrollTo(0, y), top + (len - 900) * k / 10); await wait(900); jr.push(await p.evaluate(() => ({ h: document.querySelector("[data-horloge]").innerText, actives: [...document.querySelectorAll("[data-moment]")].map(m => [m.querySelector(".heure").innerText, getComputedStyle(m).opacity]).filter(x => +x[1] > 0.5).map(x => x[0]).join("|") }))); }
    console.log("JOURNEE", JSON.stringify(jr));
    // density
    await p.evaluate(() => scrollTo(0, 0)); await wait(1000);
    const densite = await p.evaluate(() => {
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
    });
    console.log("DENSITE", JSON.stringify(densite));
    console.log("ERRS", JSON.stringify(errs));
    await ctx.close();
  }
  await b.close();
})();
