/*
 * Brume — l'étiquette du sachet, dessinée dans un <canvas>.
 * Sert deux fois : (1) habiller le sachet 3D (texture recomposée au chargement, avec la vraie
 * date du dernier mardi) ; (2) la carte « story » 1080 × 1920 du configurateur.
 *
 *   window.brumeEtiquette.dessiner(ctx, l, h, { origine, nom, notes, couleur, date })
 *   window.brumeEtiquette.habillerModele(modelViewer, { date })   → Promise
 *
 * Le modèle models/sachet.glb contient déjà l'étiquette (sans date) : si ce script échoue,
 * le sachet reste habillé. models/sachet-uv.png donne, pour chaque texel de l'étiquette,
 * sa position (R = x, G = y, B = masque) ; models/sachet-texture.webp est la texture nue.
 */
(() => {
  const POLICE_TITRE = '"Bricolage Grotesque", "Avenir Next", system-ui, sans-serif';
  const POLICE_TEXTE = '"Newsreader", Georgia, serif';
  const ENCRE = "#1A120D";

  // Tampon encreur : texte dans un cadre, encre irrégulière (trous aléatoires)
  function tampon(ctx, x, y, l, h, texte, couleur, angle = -0.08) {
    ctx.save();
    ctx.translate(x + l / 2, y + h / 2);
    ctx.rotate(angle);
    ctx.strokeStyle = couleur; ctx.fillStyle = couleur; ctx.lineWidth = Math.max(3, h * 0.07);
    ctx.globalAlpha = 0.9;
    ctx.strokeRect(-l / 2, -h / 2, l, h);
    ctx.font = `800 ${Math.round(h * 0.56)}px ${POLICE_TITRE}`;
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillText(texte, 0, h * 0.04);
    // usure de l'encre
    ctx.globalCompositeOperation = "destination-out";
    let graine = 7;
    const alea = () => ((graine = (graine * 16807) % 2147483647) / 2147483647);
    for (let i = 0; i < 70; i++) {
      ctx.globalAlpha = 0.1 + alea() * 0.3;
      ctx.beginPath();
      ctx.arc((alea() - 0.5) * l * 1.05, (alea() - 0.5) * h * 1.1, alea() * h * 0.03 + 0.5, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  function dessiner(ctx, l, h, o = {}) {
    const u = l / 600; // unité : l'étiquette est dessinée sur une base 600 × 740
    ctx.save();
    ctx.fillStyle = "#F4EFE6"; ctx.fillRect(0, 0, l, h);
    ctx.fillStyle = ENCRE; ctx.strokeStyle = ENCRE;
    // logo : trois volutes de vapeur + mot
    ctx.lineWidth = 7 * u; ctx.lineCap = "round";
    for (let k = 0; k < 3; k++) {
      const x0 = 62 * u + k * 26 * u, y0 = 150 * u;
      ctx.beginPath(); ctx.moveTo(x0, y0);
      ctx.bezierCurveTo(x0 - 18 * u, y0 - 26 * u, x0 + 18 * u, y0 - 44 * u, x0, y0 - 70 * u);
      ctx.bezierCurveTo(x0 - 18 * u, y0 - 92 * u, x0 + 14 * u, y0 - 104 * u, x0, y0 - 116 * u);
      ctx.stroke();
    }
    ctx.font = `800 ${132 * u}px ${POLICE_TITRE}`;
    ctx.textBaseline = "alphabetic"; ctx.textAlign = "left";
    ctx.fillText("brume", 150 * u, 150 * u);
    // filet couleur du café
    ctx.fillStyle = o.couleur || "#E9A93B"; ctx.fillRect(48 * u, 196 * u, 504 * u, 16 * u);
    ctx.fillStyle = ENCRE;
    ctx.font = `600 ${30 * u}px ${POLICE_TITRE}`;
    ctx.fillText((o.origine || "Éthiopie · Yirgacheffe").toUpperCase(), 48 * u, 270 * u);
    ctx.font = `700 ${96 * u}px ${POLICE_TITRE}`;
    ctx.fillText(o.nom || "Konga", 44 * u, 365 * u);
    ctx.font = `italic 400 ${38 * u}px ${POLICE_TEXTE}`;
    const notes = o.notes || "jasmin, bergamote, pêche blanche";
    // retour à la ligne simple
    const mots = notes.split(" "); let ligne = "", y = 425 * u;
    for (const m of mots) {
      const essai = ligne ? ligne + " " + m : m;
      if (ctx.measureText(essai).width > 500 * u) { ctx.fillText(ligne, 48 * u, y); ligne = m; y += 46 * u; }
      else ligne = essai;
    }
    ctx.fillText(ligne, 48 * u, y);
    // pied : poids, ville, « torréfié le » + tampon
    ctx.fillRect(48 * u, 560 * u, 504 * u, 2 * u);
    ctx.font = `600 ${28 * u}px ${POLICE_TITRE}`;
    ctx.fillText("250 g · Marseille", 48 * u, 615 * u);
    ctx.fillText("torréfié le", 48 * u, 680 * u);
    if (o.date) tampon(ctx, 255 * u, 628 * u, 230 * u, 74 * u, o.date, "#B8321E");
    else { ctx.strokeStyle = "rgb(26 18 13 / .35)"; ctx.lineWidth = 3 * u; ctx.setLineDash([10 * u, 8 * u]); ctx.strokeRect(255 * u, 628 * u, 230 * u, 74 * u); }
    ctx.restore();
  }

  const chargerImage = (src) => new Promise((ok, ko) => { const i = new Image(); i.onload = () => ok(i); i.onerror = ko; i.src = src; });

  async function habillerModele(mv, o = {}) {
    const base = mv.dataset.etiquetteBase || "models/";
    const [tex, uv] = await Promise.all([chargerImage(base + "sachet-texture.webp"), chargerImage(base + "sachet-uv.png")]);
    await document.fonts.ready;
    const L = 600, H = 740;
    const cEt = document.createElement("canvas"); cEt.width = L; cEt.height = H;
    dessiner(cEt.getContext("2d"), L, H, { date: o.date });
    const et = cEt.getContext("2d").getImageData(0, 0, L, H).data;
    const T = tex.naturalWidth;
    const c = document.createElement("canvas"); c.width = T; c.height = T;
    const x = c.getContext("2d", { willReadFrequently: true });
    x.drawImage(uv, 0, 0, T, T);
    const m = x.getImageData(0, 0, T, T).data;
    x.drawImage(tex, 0, 0, T, T);
    const img = x.getImageData(0, 0, T, T); const d = img.data;
    const ombre = +(mv.dataset.etiquetteLum || 180);
    for (let i = 0; i < d.length; i += 4) {
      if (m[i + 2] < 128) continue;
      const lx = Math.min(L - 1, Math.round(m[i] / 255 * (L - 1))), ly = Math.min(H - 1, Math.round(m[i + 1] / 255 * (H - 1)));
      const j = (ly * L + lx) * 4;
      const lum = (d[i] * 0.2126 + d[i + 1] * 0.7152 + d[i + 2] * 0.0722) / ombre;
      const k = Math.min(1.08, Math.max(0.55, Math.pow(lum, 0.6)));
      d[i] = Math.min(255, et[j] * k); d[i + 1] = Math.min(255, et[j + 1] * k); d[i + 2] = Math.min(255, et[j + 2] * k);
    }
    x.putImageData(img, 0, 0);
    const texture = await mv.createTexture(c.toDataURL("image/jpeg", 0.9));
    const mat = mv.model.materials[0];
    mat.pbrMetallicRoughness.baseColorTexture.setTexture(texture);
  }

  window.brumeEtiquette = { dessiner, tampon, habillerModele };
})();
