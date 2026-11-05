/*
 * Lignes et grain typographique — Lance ton site, code original.
 * Une portée de lignes fines, comme une grille de lignes de base, qu'une
 * « lentille » douce soulève en passant. Grain fixe par-dessus (même bruit
 * à chaque image : il ne coûte presque rien à la compression et ne casse pas la boucle).
 */
import React from "react";
import { AbsoluteFill, useVideoConfig } from "remotion";
import { usePhase } from "./boucle";

export type LignesProps = {
  fond: string;
  encre: string;
  ecart: number; // px entre deux lignes
  trait: number; // épaisseur des lignes en px (≥ 1,6 : un trait trop fin coûte cher à compresser)
  hauteurVague: number; // px de soulèvement max
  grain: number; // 0 → 1
};

export const lignesDefaut: LignesProps = {
  fond: "#f1ebe1",
  encre: "#2b2621",
  ecart: 26,
  trait: 1.6,
  hauteurVague: 58,
  grain: 0, // 0 pour le web : le grain se pose en CSS par-dessus la vidéo (quasi gratuit). 0.35 pour un rendu « film ».
};

export const LignesGrain: React.FC<LignesProps> = ({ fond, encre, ecart, trait, hauteurVague, grain }) => {
  const phase = usePhase();
  const { width, height } = useVideoConfig();
  const nb = Math.floor(height / ecart) + 2;
  const pas = 16; // px entre deux points d'une ligne
  const sigma = Math.min(width, height) * 0.28;

  // la lentille fait un huit lent (k = 1 et 2 : boucle parfaite)
  const cx = width * (0.5 + 0.28 * Math.sin(phase));
  const cy = height * (0.5 + 0.18 * Math.sin(2 * phase));

  const chemins: string[] = [];
  for (let i = 0; i < nb; i++) {
    const y0 = i * ecart - ecart / 2;
    let d = "";
    for (let x = -pas; x <= width + pas; x += pas) {
      const dx = x - cx, dy = y0 - cy;
      // seuil : loin de la lentille, la ligne ne bouge PAS du tout (sinon des déplacements
      // de 0,1 px partout changent l'anticrénelage de toute l'image et la vidéo triple de poids)
      const g = Math.exp(-(dx * dx + dy * dy) / (2 * sigma * sigma));
      const f = g < 0.04 ? 0 : (g - 0.04) / 0.96;
      // ondulation interne : décalée par ligne, k entier sur la phase
      const onde = Math.sin(x / 140 + i * 0.35 - 2 * phase);
      const y = y0 - f * hauteurVague * (0.75 + 0.25 * onde);
      d += `${x === -pas ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(2)}`;
    }
    chemins.push(d);
  }

  return (
    <AbsoluteFill style={{ backgroundColor: fond }}>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <g fill="none" stroke={encre} strokeWidth={trait} strokeOpacity={0.55} strokeLinecap="round">
          {chemins.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>
      </svg>
      {grain > 0 && (
        <svg width={width} height={height} style={{ position: "absolute", inset: 0, opacity: grain, mixBlendMode: "multiply" }}>
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} seed={7} stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>
      )}
    </AbsoluteFill>
  );
};
