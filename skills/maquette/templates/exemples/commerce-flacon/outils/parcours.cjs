// Parcours d'achat et de réservation : ajout au panier (compteur, annonce), panier, réservation (erreurs puis merci).
// Usage : node outils/parcours.cjs <url>
const { chromium } = require("/Users/antoinevigneau/.dev-browser/node_modules/playwright-core");
const path = require("path");
const cap = (n) => path.join(__dirname, "..", "captures", n);
(async () => {
  const b = await chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" });
  for (const [l, h] of [[1440, 900], [375, 812]]) {
    const p = await (await b.newContext({ viewport: { width: l, height: h } })).newPage(); const err = [];
    p.on("pageerror", (e) => err.push(e.message)); p.on("console", (m) => m.type() === "error" && err.push(m.text()));
    await p.goto(process.argv[2], { waitUntil: "networkidle" }); await p.waitForTimeout(1500);
    const y = await p.evaluate(() => document.querySelector("#parfums").getBoundingClientRect().top + scrollY);
    await p.evaluate((y) => window.gestes?.lenis ? gestes.lenis.scrollTo(y, { immediate: true }) : scrollTo(0, y), y); await p.waitForTimeout(900);
    await p.locator('.fiche input[value="100"]').nth(2).check({ force: true });
    const prix100 = await p.locator(".fiche-prix").nth(2).textContent();
    await p.locator(".fiche [data-ajouter]").nth(2).click(); await p.waitForTimeout(250);
    await p.screenshot({ path: cap(`${l}-parcours-vol.png`) });
    await p.waitForTimeout(1300);
    const compte = await p.textContent("[data-panier-compte]"), annonce = await p.textContent("[data-annonce]");
    await p.mouse.move(l / 2, h / 2); await p.mouse.wheel(0, -120); await p.waitForTimeout(700); // on remonte d'un cran : l'en-tête revient
    await p.click("[data-panier-ouvrir]"); await p.waitForTimeout(600);
    await p.screenshot({ path: cap(`${l}-parcours-panier.png`) });
    const total = await p.textContent("[data-panier-total]"), livr = await p.textContent("[data-panier-livraison]");
    await p.keyboard.press("Escape"); await p.waitForTimeout(300);
    const ya = await p.evaluate(() => document.querySelector("[data-reservation]").getBoundingClientRect().top + scrollY - 100);
    await p.evaluate((y) => window.gestes?.lenis ? gestes.lenis.scrollTo(y, { immediate: true }) : scrollTo(0, y), ya); await p.waitForTimeout(700);
    await p.click("[data-reservation] button[type=submit]"); await p.waitForTimeout(300);
    const erreurs = await p.locator("[data-reservation] .erreur:not([hidden])").count();
    await p.screenshot({ path: cap(`${l}-parcours-erreurs.png`) });
    await p.evaluate(() => { const r = [...document.querySelectorAll("[data-seances] input:not([disabled])")].pop(); r.click(); });
    const plafondGroupe = await p.locator("#f-places option").count(), aideGroupe = await p.textContent("#aide-places");
    await p.locator('[data-seances] input:not([disabled])').first().check({ force: true });
    const plafond = await p.locator("#f-places option").count(), aide = await p.textContent("#aide-places");
    await p.selectOption("#f-places", String(plafond));
    await p.fill("#f-prenom", "Léa"); await p.fill("#f-mail", "lea@exemple.fr");
    await p.click("[data-reservation] button[type=submit]"); await p.waitForTimeout(500);
    const merci = await p.textContent("[data-merci-titre]");
    // une fois envoyé, le formulaire disparaît : plus de second envoi possible
    const champsVisibles = await p.locator("[data-form-champs]").isVisible(), boutonVisible = await p.locator("[data-reservation] button[type=submit]").isVisible();
    await p.evaluate(() => document.querySelector("[data-reservation]").requestSubmit());
    const merciApres = await p.textContent("[data-merci-titre]");
    const yl = await p.evaluate(() => document.querySelector("[data-lettre]").getBoundingClientRect().top + scrollY - 200);
    await p.evaluate((y) => window.gestes?.lenis ? gestes.lenis.scrollTo(y, { immediate: true }) : scrollTo(0, y), yl); await p.waitForTimeout(500);
    await p.fill("#f-lettre", "lea@exemple.fr"); await p.click("[data-lettre] button[type=submit]"); await p.waitForTimeout(300);
    const lettreLigne = await p.locator(".lettre-ligne").isVisible(), lettreMerci = await p.locator(".lettre-merci").isVisible();
    await p.screenshot({ path: cap(`${l}-parcours-lettre.png`) });
    await p.screenshot({ path: cap(`${l}-parcours-merci.png`) });
    console.log(`${l}px : places proposées sur la séance à 2 places : ${plafond} (« ${aide.trim()} ») · prix 100 ml « ${prix100.trim()} » · compteur ${compte} · annonce « ${annonce.trim()} » · total ${total} · livraison « ${livr} » · erreurs affichées ${erreurs} · merci « ${merci} » « ${await p.textContent('[data-merci-texte]')} » · séance à 6 places : ${plafondGroupe} options (« ${aideGroupe.trim()} ») · après envoi : champs visibles ${champsVisibles}, bouton visible ${boutonVisible}, merci après 2e envoi « ${merciApres} » · lettre : ligne visible ${lettreLigne}, merci visible ${lettreMerci} · console ${err.length ? err.join(" / ") : 0}`);
  }
  await b.close();
})();
