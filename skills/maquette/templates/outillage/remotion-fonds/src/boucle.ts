/*
 * Boucle parfaite : tout mouvement est une fonction de la phase (0 → 2π sur la durée).
 * Règle : n'utiliser que sin/cos de (k × phase + décalage) avec k ENTIER.
 * Ainsi l'image N (= durée) est identique à l'image 0 et la vidéo boucle sans saut.
 */
import { useCurrentFrame, useVideoConfig } from "remotion";

export const usePhase = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  return (frame / durationInFrames) * Math.PI * 2;
};
