/*
 * Vérifie les démos de elements/ et fonds-hero/ : 0 erreur console, captures 1440 et 375,
 * pas de débordement horizontal, et mouvement réduit respecté (deux captures à 1,2 s d'écart
 * identiques en mouvement réduit). Captures faites en mode aperçu (?apercu : explications masquées) ;
 * le mode normal est aussi chargé (erreurs, débordement) et le mode aperçu doit être branché. Usage :
 *   node verifier-elements.cjs http://localhost:4320/atelier/skills/maquette/templates [filtre]
 * Variables : PW (chemin playwright-core), CHROME (exécutable), DOSSIERS (liste, défaut
 * fonds-hero,elements,elements-3d), SANS_WEBGL=1 (lance Chrome sans WebGL pour tester le repli ;
 * les captures portent alors le suffixe -sans-webgl).
 */
const { chromium } = require(process.env.PW || "playwright-core");
const fs = require("fs"), path = require("path");
const base = process.argv[2]; const filtre = process.argv[3] || "";
const ici = __dirname;
for (const d of ["fonds-hero", "elements", "elements-3d"]) if (fs.existsSync(path.join(ici, d))) fs.mkdirSync(path.join(ici, d, "captures"), { recursive: true });
const dossiers = (process.env.DOSSIERS || "fonds-hero,elements,elements-3d").split(",").filter((d) => fs.existsSync(path.join(ici, d)));
const pages = dossiers.flatMap((d) =>
  fs.readdirSync(path.join(ici, d)).filter((f) => f.endsWith(".html") && f.includes(filtre)).map((f) => `${d}/${f}`));
(async () => {
  const b = await chromium.launch({ executablePath: process.env.CHROME, headless: true, args: process.env.SANS_WEBGL ? ["--disable-webgl", "--disable-3d-apis"] : ["--use-gl=angle", "--enable-unsafe-swiftshader"] });
  let echecs = 0;
  for (const pg of pages) {
    const [dossier, fichier] = pg.split("/"); const nom = fichier.replace(".html", "");
    const res = { page: pg, erreurs: [], debordement: {}, reduitFixe: null };
    for (const [w, h] of [[1440, 900], [375, 812]]) {
      const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, hasTouch: w < 768 });
      const p = await ctx.newPage();
      p.on("console", (m) => { if (m.type() === "error") res.erreurs.push(`${w}: ${m.text()}`); });
      p.on("pageerror", (e) => res.erreurs.push(`${w}: ${e.message}`));
      await p.goto(`${base}/${pg}?apercu`, { waitUntil: "networkidle" }).catch(() => {});
      await p.waitForTimeout(1800);
      await p.mouse.move(w * 0.6, h * 0.4); await p.waitForTimeout(400);
      await p.screenshot({ path: path.join(ici, dossier, "captures", `${nom}-${w}${process.env.SANS_WEBGL ? "-sans-webgl" : ""}.png`) });
      res.debordement[w] = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
      await ctx.close();
    }
    // mouvement réduit
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
    const p = await ctx.newPage();
    p.on("pageerror", (e) => res.erreurs.push(`réduit: ${e.message}`));
    await p.goto(`${base}/${pg}?apercu`, { waitUntil: "networkidle" }).catch(() => {});
    await p.waitForTimeout(1500);
    const a = await p.screenshot(); await p.waitForTimeout(1200); const c = await p.screenshot();
    res.reduitFixe = a.equals(c);
    fs.writeFileSync(path.join(ici, dossier, "captures", `${nom}-1440-reduit.png`), c);
    await ctx.close();
    // mode normal (avec explications) : erreurs et débordement ; mode aperçu bien branché
    {
      const ctxN = await b.newContext({ viewport: { width: 1440, height: 900 } });
      const pn = await ctxN.newPage();
      pn.on("console", (m) => { if (m.type() === "error") res.erreurs.push(`normal: ${m.text()}`); });
      pn.on("pageerror", (e) => res.erreurs.push(`normal: ${e.message}`));
      await pn.goto(`${base}/${pg}`, { waitUntil: "networkidle" }).catch(() => {});
      await pn.waitForTimeout(800);
      if (await pn.evaluate(() => document.documentElement.scrollWidth - innerWidth) > 0) res.erreurs.push("normal: débordement horizontal");
      const explications = await pn.evaluate(() => document.querySelectorAll("[data-explication]").length);
      await pn.goto(`${base}/${pg}?apercu`, { waitUntil: "networkidle" }).catch(() => {});
      const branche = await pn.evaluate(() => document.documentElement.classList.contains("apercu") &&
        [...document.querySelectorAll("[data-explication]")].every((el) => !el.offsetParent && getComputedStyle(el).display === "none"));
      if (!branche || !explications) res.erreurs.push(`aperçu: ${branche ? "aucun [data-explication]" : "mode aperçu non branché"}`);
      await ctxN.close();
    }
    const ok = !res.erreurs.length && res.reduitFixe && res.debordement[1440] <= 0 && res.debordement[375] <= 0;
    if (!ok) echecs++;
    console.log(`${ok ? "OK  " : "ÉCHEC"} ${pg}  erreurs=${res.erreurs.length} débord=${res.debordement[1440]}/${res.debordement[375]} réduit-fixe=${res.reduitFixe}`);
    res.erreurs.forEach((e) => console.log("      " + e.slice(0, 200)));
  }
  await b.close();
  console.log(`\n${pages.length - echecs}/${pages.length} pages conformes`);
  process.exit(echecs ? 1 : 0);
})();
