// Réglages de rendu communs (Lance ton site).
import { Config } from "@remotion/cli/config";

Config.setVideoImageFormat("jpeg");
Config.setJpegQuality(92);
Config.setCodec("h264");
Config.setPixelFormat("yuv420p");
Config.setCrf(20); // rendu « maître » assez propre ; la compression web se fait ensuite avec ffmpeg
Config.setOverwriteOutput(true);
Config.setConcurrency(4);
