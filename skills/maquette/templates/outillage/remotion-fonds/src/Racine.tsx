import React from "react";
import { Composition } from "remotion";
import { MailleRespire, mailleDefaut } from "./MailleRespire";
import { LignesGrain, lignesDefaut } from "./LignesGrain";

// 7 s à 24 i/s = 168 images. L'image 168 serait identique à l'image 0 : la boucle est parfaite.
const IPS = 24;
const DUREE = 7 * IPS;
const PAYSAGE = { width: 1920, height: 1080 };
const PORTRAIT = { width: 1080, height: 1920 };
// portrait : lignes plus espacées et plus épaisses, sinon la vidéo dépasse 600 Ko
const lignesPortrait = { ...lignesDefaut, ecart: 40, trait: 2.2, hauteurVague: 64 };

export const Racine: React.FC = () => (
  <>
    <Composition id="maille-paysage" component={MailleRespire} defaultProps={mailleDefaut} fps={IPS} durationInFrames={DUREE} {...PAYSAGE} />
    <Composition id="maille-portrait" component={MailleRespire} defaultProps={mailleDefaut} fps={IPS} durationInFrames={DUREE} {...PORTRAIT} />
    <Composition id="lignes-paysage" component={LignesGrain} defaultProps={lignesDefaut} fps={IPS} durationInFrames={DUREE} {...PAYSAGE} />
    <Composition id="lignes-portrait" component={LignesGrain} defaultProps={lignesPortrait} fps={IPS} durationInFrames={DUREE} {...PORTRAIT} />
  </>
);
