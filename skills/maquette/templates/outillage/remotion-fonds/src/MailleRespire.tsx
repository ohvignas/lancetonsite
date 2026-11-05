/*
 * Dégradé maillé qui respire — Lance ton site, code original.
 * Cinq taches de couleur douces dérivent lentement sur un fond, et l'ensemble
 * « respire » (léger gonflement) une fois par boucle.
 */
import React from "react";
import { AbsoluteFill, useVideoConfig } from "remotion";
import { usePhase } from "./boucle";

export type MailleProps = {
  fond: string;
  couleurs: [string, string, string, string, string];
  amplitude: number; // 0 → 1 : ampleur des dérives
};

export const mailleDefaut: MailleProps = {
  fond: "#150f0c",
  couleurs: ["#c4532e", "#e9b46f", "#5a2a3c", "#f3dcc0", "#8c4a2a"],
  amplitude: 1,
};

// position de base (en fraction de l'image), rayon de base, vitesses entières, décalages
const TACHES = [
  { x: 0.22, y: 0.30, r: 0.42, kx: 1, ky: 1, dx: 0.0, dy: 1.2 },
  { x: 0.80, y: 0.24, r: 0.36, kx: 1, ky: 2, dx: 2.1, dy: 0.4 },
  { x: 0.64, y: 0.80, r: 0.44, kx: 2, ky: 1, dx: 4.0, dy: 2.6 },
  { x: 0.26, y: 0.84, r: 0.30, kx: 1, ky: 1, dx: 3.1, dy: 5.0 },
  { x: 0.52, y: 0.46, r: 0.24, kx: 1, ky: 2, dx: 1.4, dy: 3.7 },
];

export const MailleRespire: React.FC<MailleProps> = ({ fond, couleurs, amplitude }) => {
  const phase = usePhase();
  const { width, height } = useVideoConfig();
  const grand = Math.max(width, height);
  const souffle = 1 + 0.06 * Math.sin(phase); // une respiration par boucle

  const calques = TACHES.map((t, i) => {
    const x = (t.x + 0.10 * amplitude * Math.sin(t.kx * phase + t.dx)) * width;
    const y = (t.y + 0.08 * amplitude * Math.cos(t.ky * phase + t.dy)) * height;
    const r = t.r * grand * souffle * (1 + 0.05 * Math.sin(phase + i));
    return `radial-gradient(circle ${r.toFixed(1)}px at ${x.toFixed(1)}px ${y.toFixed(1)}px, ${couleurs[i]} 0%, ${couleurs[i]}00 100%)`;
  });

  return (
    <AbsoluteFill style={{ backgroundColor: fond }}>
      <AbsoluteFill style={{ backgroundImage: calques.join(","), opacity: 0.92 }} />
      {/* vignette fixe : assombrit les bords, là où se pose souvent le texte */}
      <AbsoluteFill
        style={{ background: "radial-gradient(ellipse at 50% 45%, transparent 40%, rgba(10,7,5,.55) 100%)" }}
      />
    </AbsoluteFill>
  );
};
