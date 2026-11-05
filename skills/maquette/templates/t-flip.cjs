module.exports = async ({ page, go, shot, log, sleep }) => {
  let p = await page();
  await go(p, 'gsap-flip.html?apercu'); await sleep(500); await shot(p, 'flip-1440');
  await shot(p, 'flip-1440-full', true);
  await p.click('[data-filtre=viennoiserie]'); await sleep(250); await shot(p, 'flip-1440-filtre-mi');
  await sleep(700); await shot(p, 'flip-1440-filtre');
  log('compte', await p.textContent('[data-compte]'));
  await p.click('[data-vue=liste]'); await sleep(300); await shot(p, 'flip-1440-liste-mi'); await sleep(600); await shot(p, 'flip-1440-liste');
  // rapid interruption
  await p.click('[data-filtre=tout]'); await sleep(150); await p.click('[data-filtre=pain]'); await sleep(100); await p.click('[data-vue=grille]'); await sleep(1200);
  await shot(p, 'flip-1440-interrompu');
  log('compte2', await p.textContent('[data-compte]'), 'visible cards', await p.$$eval('.produit:not([hidden])', e => e.map(x => { const r = x.getBoundingClientRect(); return [Math.round(r.x), Math.round(r.y), Math.round(r.width), getComputedStyle(x).opacity, x.style.transform]; })));
  // keyboard
  await go(p, 'gsap-flip.html?apercu'); await sleep(300);
  const seq = [];
  for (let i = 0; i < 8; i++) { await p.keyboard.press('Tab'); seq.push(await p.evaluate(() => document.activeElement.textContent.trim().slice(0, 20))); }
  log('tabs', seq);
  await p.keyboard.press('Shift+Tab'); 
  await shot(p, 'flip-1440-focus');
  log('errs', p.errs); await p.ctx.close();
  p = await page({ vp: { width: 375, height: 812 }, touch: true });
  await go(p, 'gsap-flip.html?apercu'); await sleep(500); await shot(p, 'flip-375');
  await p.tap('[data-vue=liste]'); await sleep(900); await shot(p, 'flip-375-liste');
  log('sw', await p.evaluate(() => document.documentElement.scrollWidth));
  await p.ctx.close();
  p = await page({ reduce: true });
  await go(p, 'gsap-flip.html?apercu'); await p.click('[data-filtre=douceur]'); await sleep(50); await shot(p, 'flip-1440-reduit');
  log('reduce compte', await p.textContent('[data-compte]'));
  await p.ctx.close();
  p = await page({ block: true });
  await go(p, 'gsap-flip.html?apercu'); await p.click('[data-filtre=pain]'); await sleep(50);
  log('blocked compte', await p.textContent('[data-compte]'), p.errs); await p.ctx.close();
};
