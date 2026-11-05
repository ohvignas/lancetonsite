const { chromium } = require(process.env.PW);
const URL = "http://127.0.0.1:4339/atelier/skills/maquette/templates/exemples/hebergement-cretes/index.html";
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
(async () => {
  const b = await chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" });
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage(); await p.goto(URL, { waitUntil: "networkidle" }); await wait(3000);
  await p.focus("[data-cal-grille] button[tabindex='0']"); await p.keyboard.press("ArrowRight"); await p.keyboard.press("Enter"); await wait(500);
  console.log("ENTER", await p.evaluate(() => document.querySelector("[data-recap]").innerText));
  for (const w of [375, 360]) {
    await p.setViewportSize({ width: w, height: 812 }); await wait(800);
    console.log(w, await p.evaluate(() => { const b = document.querySelector(".reservation button[type=submit]"); const r = b.getBoundingClientRect(); return r.width + "x" + r.height; }));
  }
  await b.close();
})();
