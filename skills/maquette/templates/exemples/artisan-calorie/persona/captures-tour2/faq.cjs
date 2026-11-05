const { chromium } = require("/Users/antoinevigneau/.dev-browser/node_modules/playwright-core");
(async () => {
  const b = await chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" });
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto("http://127.0.0.1:4339/atelier/skills/maquette/templates/exemples/artisan-calorie/index.html", { waitUntil: "networkidle" });
  await p.waitForTimeout(2500);
  const mots = (s) => s.split(/\s+/).filter((m) => /[\p{L}\p{N}]/u.test(m)).length;
  const r1 = await p.evaluate(() => [...document.querySelectorAll("#questions details")].map((d) => ({ open: d.open, rep: d.querySelector(".reponse").innerText.length, disp: getComputedStyle(d.querySelector(".reponse")).display, vis: d.querySelector(".reponse").checkVisibility(), h: d.querySelector(".reponse").getBoundingClientRect().height })));
  await p.evaluate(() => document.querySelector("#questions").scrollIntoView()); await p.waitForTimeout(1200);
  await p.click("#questions details:nth-child(2) summary"); await p.waitForTimeout(1200);
  await p.screenshot({ path: __dirname + "/desktop-faq-ouverte.png" });
  await p.evaluate(() => document.querySelectorAll("details").forEach((d) => { d.removeAttribute("name"); d.open = true; })); await p.waitForTimeout(1500);
  const r2 = await p.evaluate(() => [...document.querySelectorAll("#questions details")].map((d) => ({ open: d.open, rep: d.querySelector(".reponse").innerText.length, vis: d.querySelector(".reponse").checkVisibility(), h: d.querySelector(".reponse").getBoundingClientRect().height })));
  const t = await p.evaluate(() => document.querySelector("#questions").innerText);
  console.log(JSON.stringify({ r1, r2, motsQuestions: mots(t) }));
  await b.close();
})();
