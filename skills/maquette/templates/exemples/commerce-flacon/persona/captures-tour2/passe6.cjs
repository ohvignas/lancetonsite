const { chromium } = require("/Users/antoinevigneau/.dev-browser/node_modules/playwright-core");
const path = require("path");
const URL = "http://127.0.0.1:4339/atelier/skills/maquette/templates/exemples/commerce-flacon/index.html";
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const cap = (n) => path.join(__dirname, n);
const aller = async (p, s, dy = 0) => { await p.evaluate(([s, dy]) => { const y = document.querySelector(s).getBoundingClientRect().top + scrollY + dy; (window.lenis || window.gestes?.lenis).scrollTo(y, { immediate: true, force: true }); }, [s, dy]); await p.waitForTimeout(1500); };
(async () => {
  const b = await chromium.launch({ executablePath: CHROME, args: ["--use-angle=metal", "--enable-gpu", "--ignore-gpu-blocklist"] });
  const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  await p.goto(URL, { waitUntil: "networkidle" }); await p.waitForTimeout(3000);
  await aller(p, ".atelier-grille", -40);
  await p.click("label.seance:has-text('21 novembre, 10')"); await p.fill("#f-prenom", "Léa"); await p.fill("#f-mail", "lea@exemple.fr"); await p.selectOption("#f-places", "3");
  await p.click("[data-reservation] button[type=submit]"); await p.waitForTimeout(800);
  const st = await p.evaluate(() => { const c = document.querySelector("[data-form-champs]"); return { hiddenAttr: c.hidden, display: getComputedStyle(c).display, boutonVisible: document.querySelector("[data-reservation] button[type=submit]").checkVisibility() }; });
  console.log("après réservation :", JSON.stringify(st), "| merci :", (await p.textContent("[data-form-merci]")).replace(/\s+/g, " "));
  await p.screenshot({ path: cap("1440-resa-merci.png") });
  // second envoi
  await p.click("[data-reservation] button[type=submit]").catch(() => {}); await p.waitForTimeout(500);
  console.log("second clic sur Réserver possible :", st.boutonVisible);
  await aller(p, ".pied"); await p.fill("#f-lettre", "lea@exemple.fr"); await p.click(".lettre button"); await p.waitForTimeout(500);
  console.log("lettre :", JSON.stringify(await p.evaluate(() => ({ ligneDisplay: getComputedStyle(document.querySelector(".lettre-ligne")).display, merci: document.querySelector(".lettre-merci").checkVisibility() }))));
  await p.screenshot({ path: cap("1440-lettre-merci.png") });
  // ligne-2 alignement e-mail / places
  await aller(p, ".atelier-grille", -40);
  await b.close();
})();
