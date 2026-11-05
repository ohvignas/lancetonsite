// Vérifications ponctuelles tour 3 : bouton du relevé en mouvement réduit, tableau électrique, éléments invisibles à 375 réduit, relevé qui tourne
const { chromium } = require("/Users/antoinevigneau/.dev-browser/node_modules/playwright-core");
const URL = "http://127.0.0.1:4339/atelier/skills/maquette/templates/exemples/artisan-calorie/index.html";
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
(async () => {
  const b = await chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" });
  const out = {};
  // 1. réduit 1440
  let c = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" }); let p = await c.newPage();
  await p.goto(URL, { waitUntil: "networkidle" }); await wait(2000);
  out.reduitBouton = await p.evaluate(() => { const e = document.querySelector("[data-releve-pause]"); return { hidden: e.hidden, display: getComputedStyle(e).display, txt: e.innerText }; });
  await p.screenshot({ path: __dirname + "/reduit1440-releve.png", clip: { x: 680, y: 160, width: 740, height: 600 } });
  await c.close();
  // 2. réduit 375 : éléments à opacité < 0,1
  c = await b.newContext({ viewport: { width: 375, height: 812 }, reducedMotion: "reduce", isMobile: true, hasTouch: true }); p = await c.newPage();
  await p.goto(URL, { waitUntil: "networkidle" }); await wait(2000);
  const H = await p.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < H; y += 700) { await p.evaluate((y) => scrollTo(0, y), y); await wait(150); }
  await wait(800);
  out.rien375 = await p.evaluate(() => [...document.querySelectorAll("main h1,main h2,main h3,main p,main li")].filter((e) => +getComputedStyle(e).opacity < 0.1 && e.checkVisibility()).map((e) => (e.closest("[class]")?.className || "") + " | " + e.innerText.slice(0, 40)));
  await c.close();
  // 3. tableau en électrique + relevé qui tourne
  c = await b.newContext({ viewport: { width: 1440, height: 900 } }); p = await c.newPage();
  await p.goto(URL, { waitUntil: "networkidle" }); await wait(1500);
  const r0 = await p.evaluate(() => [...document.querySelectorAll("[data-live]")].map((e) => e.dataset.live + "=" + e.innerText).join(" ; "));
  await wait(8000);
  const r1 = await p.evaluate(() => [...document.querySelectorAll("[data-live]")].map((e) => e.dataset.live + "=" + e.innerText).join(" ; "));
  out.releve = { r0, r1 };
  await p.evaluate(() => { const f = document.querySelector("[data-sim]"); for (const [k, v] of [["energie", "elec"], ["projet", "pac-ballon"]]) { const el = f.querySelector(`[name="${k}"][value="${v}"]`); el.checked = true; el.dispatchEvent(new Event("change", { bubbles: true })); } });
  await wait(1500);
  await p.evaluate(() => document.querySelector("#dix-ans").scrollIntoView()); await wait(1500);
  await p.click("[data-dix-table] summary, #dix-ans summary").catch(() => {});
  await wait(800);
  out.tableElec = await p.evaluate(() => [...document.querySelectorAll("#dix-ans table tr")].map((tr) => tr.innerText.replace(/\s+/g, " ")));
  await p.screenshot({ path: __dirname + "/sim-dix-elec-tableau.png" });
  // fioul après 2000 ballon : message
  await c.close();
  // 4. 360
  c = await b.newContext({ viewport: { width: 360, height: 740 }, isMobile: true, hasTouch: true }); p = await c.newPage();
  await p.goto(URL, { waitUntil: "networkidle" }); await wait(2500);
  await p.screenshot({ path: __dirname + "/mobile360-01-premier-ecran.png" });
  out.m360 = await p.evaluate(() => ({ w: innerWidth, sw: document.documentElement.scrollWidth }));
  await c.close();
  console.log(JSON.stringify(out, null, 1));
  await b.close();
})();
