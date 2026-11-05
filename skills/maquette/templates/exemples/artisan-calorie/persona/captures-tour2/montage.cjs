// node montage.cjs sortie.png largeurVignette colonnes img1 img2 ...
const { chromium } = require("/Users/antoinevigneau/.dev-browser/node_modules/playwright-core");
const fs = require("fs"), path = require("path");
const [out, w, cols, ...imgs] = process.argv.slice(2);
(async () => {
  const b = await chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" });
  const p = await b.newPage({ viewport: { width: +w * +cols + 10 * (+cols + 1), height: 600 } });
  const html = `<body style="margin:0;background:#888;display:grid;grid-template-columns:repeat(${cols},${w}px);gap:10px;padding:10px">${imgs.map((i) => `<figure style="margin:0"><img style="width:${w}px;display:block" src="data:image/png;base64,${fs.readFileSync(i).toString("base64")}"><figcaption style="font:12px sans-serif;color:#fff">${path.basename(i)}</figcaption></figure>`).join("")}</body>`;
  await p.setContent(html); await p.waitForTimeout(300);
  await p.screenshot({ path: out, fullPage: true }); await b.close();
})();
