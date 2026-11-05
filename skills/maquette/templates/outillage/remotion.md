# Remotion — fabriquer des fonds vidéo en code

Outil · projet : [`remotion-fonds/`](remotion-fonds/) · rendus : `../fonds-hero/medias/remotion-*` · démos : `../fonds-hero/remotion-maille.html`, `../fonds-hero/remotion-lignes.html`

- **Ce que c'est** : un framework qui décrit une vidéo comme des composants React. Chaque image est une page web rendue par un Chrome sans interface, puis assemblée en vidéo (FFmpeg embarqué).
- **Dépôt** : https://github.com/remotion-dev/remotion
- **Version utilisée** : `remotion` et `@remotion/cli` **4.0.540** (dernière version sur npm au 5 novembre 2026), React 19.2.0. Navigateur téléchargé au premier rendu : Chrome Headless Shell 158.0.8127.2, dans `node_modules/.remotion/` (473 Mo décompressé ; `node_modules` complet : 949 Mo — à installer en local, jamais à livrer).
- **Node** : testé avec Node 26.13.0 (`/opt/homebrew/bin/node`).

## Licence (lue dans `LICENSE.md` du dépôt, 5 novembre 2026)

Ce n'est **pas** une licence open source au sens OSI : le code est public, mais l'usage dépend de qui vous êtes.

**Licence gratuite** — vous y avez droit si vous êtes :
- un particulier ;
- une entreprise à but lucratif de **3 salariés au plus** ;
- une association ou organisation à but non lucratif ;
- quelqu'un qui **évalue** Remotion sans encore l'utiliser commercialement.

Elle permet d'utiliser Remotion, **y compris commercialement**, pour créer des vidéos et des images, et de le modifier pour son propre besoin ou pour contribuer. Interdit : copier ou modifier le code de Remotion pour **vendre, louer, licencier ou sous-licencier** votre propre dérivé de Remotion. Logiciel fourni « tel quel », sans garantie ; support « au mieux » (GitHub, Discord).

**Licence entreprise (Company License)** — **obligatoire** pour toute entité non éligible à la licence gratuite (en pratique : entreprise à but lucratif de plus de 3 personnes). Mêmes usages autorisés, plus un support prioritaire. Tarifs : https://www.remotion.pro/license · cas limites : https://www.remotion.pro/faq

**Remotion 5.0 (à venir)** : le fichier annonce un changement, préparé dans la PR #3750 (ouverte, non fusionnée au 5 novembre 2026). Dans ce brouillon : le seuil de 3 vaut aussi pour les « équipes ou groupes d'individus », les usages visés deviennent « créer des médias (vidéos, images…) », l'acceptation des conditions générales devient obligatoire, et il devient interdit, **même en licence gratuite**, d'exploiter un service de rendu où les utilisateurs apportent leur propre code Remotion sans accord écrit. À relire au passage en 5.0.

**Ce que ça veut dire pour nous** : le plugin ne redistribue pas Remotion (pas de `node_modules` livré, seulement un `package.json`). C'est **l'utilisateur** qui l'installe, donc c'est sa situation qui compte : indépendant ou TPE de 3 personnes max → gratuit ; agence ou PME plus grande → licence entreprise à acheter, ou utiliser une autre voie (fond en CSS/WebGL du kit, vidéo générée à l'étape 6). Les **vidéos produites** sont à lui, la licence ne s'applique pas aux fichiers MP4/WebM publiés sur le site. Le dire à l'utilisateur **avant** de lancer Remotion.

## Quand s'en servir dans le plugin

- Fond de hero **abstrait** (dégradé, lignes, formes, typographie animée) qu'on veut en vidéo plutôt qu'en WebGL : poids et coût CPU constants, aucun JavaScript lourd sur le site, rendu identique partout, compatible avec les pages statiques.
- Boucle **parfaite** et réglable au pixel (couleurs du design system passées en props).
- Déclinaison paysage + portrait d'un même motif sans rien redessiner.
- Petites vidéos produit/explication sans tournage (texte animé, captures, schémas).

## Quand ne pas s'en servir

- Le fond doit réagir à la souris ou au défilement → WebGL/CSS du kit (`fonds-hero/*.html`).
- Le motif est simple et léger en CSS (dégradé qui glisse, grain) → CSS : 0 octet de vidéo.
- Il faut une vraie scène filmée (geste, lieu, matière) → vidéo générée ou tournée (étape 6, `fonds-hero/video-boucle.html`).
- L'utilisateur est une entreprise de plus de 3 personnes sans licence entreprise.
- Motifs pleins de **détails fins qui bougent partout** (bruit animé, particules denses) : la vidéo devient lourde (voir « Compresser »).

## Installer

```sh
cd outillage/remotion-fonds
npm install                    # versions exactes figées dans package.json
```

Sous Claude Code : le cache npm global peut être en lecture seule dans le bac à sable → `npm_config_cache="$TMPDIR/npmcache" npm install`. Au **premier rendu**, Remotion télécharge Chrome Headless Shell depuis `remotion.media` : si le réseau est filtré, lancer la commande hors bac à sable (c'est ce qui a été nécessaire ici).

Projet minimal :

| Fichier | Rôle |
|---|---|
| `package.json` | versions exactes, scripts `studio` et `rendre` |
| `remotion.config.ts` | rendu maître : JPEG 92, H.264, yuv420p, CRF 20 |
| `src/index.ts` | `registerRoot` |
| `src/Racine.tsx` | les 4 compositions (2 motifs × paysage 1920×1080 / portrait 1080×1920, 24 i/s, 168 images = 7 s) |
| `src/boucle.ts` | `usePhase()` : la phase 0 → 2π sur la durée |
| `src/MailleRespire.tsx` | dégradé maillé qui respire (5 taches en `radial-gradient`) |
| `src/LignesGrain.tsx` | portée de lignes SVG soulevées par une lentille |
| `scripts/rendre.sh` | rend, compresse (H.264 + VP9) et sort les affiches dans `fonds-hero/medias/` |
| `.gitignore` | `node_modules/`, `out/` |

## Prévisualiser

```sh
npm run studio                 # ouvre Remotion Studio sur http://localhost:3000
```

Le Studio montre chaque composition avec une timeline ; les `defaultProps` sont modifiables dans le panneau de droite (couleurs, amplitude…). Pour vérifier la boucle : lire en boucle et regarder le passage 6,95 s → 0 s.

Une image seule (rapide, pour contrôler un réglage) :

```sh
npx remotion still src/index.ts maille-paysage out/controle.jpg --frame=84
```

## La règle de la boucle parfaite

Tout mouvement est fonction de `phase = 2π × image / durée`, et uniquement à travers `sin(k × phase + décalage)` / `cos(…)` avec **k entier**. L'image « 168 » serait alors identique à l'image 0 : la vidéo boucle sans saut. Pas de `Math.random()` (ou alors avec la fonction `random(graine)` de Remotion, déterministe), pas d'accumulation d'une image à l'autre. Vérifié ici : l'écart entre la dernière image et la première (PSNR 45,5 dB pour la maille, 22,4 dB pour les lignes) est le même qu'entre deux images voisines (46,2 et 22,4 dB).

## Rendre

```sh
npm run rendre                 # = sh scripts/rendre.sh (≈ 2 min pour les 4 vidéos sur un Mac M)
```

Une seule composition, à la main :

```sh
npx remotion render src/index.ts lignes-paysage out/lignes-paysage-maitre.mp4
# props à la volée (couleurs du design system) :
npx remotion render src/index.ts maille-paysage out/m.mp4 --props='{"fond":"#0f1420","couleurs":["#3a6df0","#8fb3ff","#1d2a55","#e6eeff","#5a4bd1"],"amplitude":1}'
```

Si `npx` pointe vers un Node cassé : `/opt/homebrew/bin/node node_modules/@remotion/cli/remotion-cli.js render …`.

## Compresser

Le rendu maître (CRF 20) est trop lourd pour le web. `scripts/rendre.sh` le recompresse avec le FFmpeg du système :

```sh
# H.264 : sans son, faststart (la lecture commence avant la fin du téléchargement)
ffmpeg -i maitre.mp4 -an -c:v libx264 -preset slow -crf 30 -pix_fmt yuv420p -profile:v high \
  -g 72 -keyint_min 24 -movflags +faststart sortie.mp4
# VP9 WebM : 20 à 85 % plus léger selon le motif
ffmpeg -i maitre.mp4 -an -c:v libvpx-vp9 -b:v 0 -crf 40 -row-mt 1 -deadline good -cpu-used 2 -g 72 sortie.webm
# affiche = image 0 (la boucle démarre exactement dessus)
ffmpeg -i maitre.mp4 -frames:v 1 -q:v 4 affiche.jpg
```

Résultats (7 s, 24 i/s) :

| Fichier | H.264 | VP9 WebM | Affiche JPG | CRF H.264 / VP9 |
|---|---|---|---|---|
| maille paysage 1920×1080 | 490 247 o | 73 214 o | 22 611 o | 30 / 40 |
| maille portrait 1080×1920 | 466 249 o | 73 520 o | 21 756 o | 30 / 40 |
| lignes paysage 1920×1080 | 795 483 o | 583 768 o | 132 477 o | 30 / 44 |
| lignes portrait 1080×1920 | 591 830 o | 425 948 o | 91 595 o | 32 / 46 |

Cibles tenues : < 1,5 Mo en paysage, < 600 Ko en portrait (H.264 ; le WebM est encore en dessous).

Ce qu'on a appris en réglant les poids :
- **Le grain coûte cher**, même fixe : avec un grain SVG dans la vidéo, les lignes pesaient 1,44 Mo (paysage) et 1,42 Mo (portrait). Grain retiré de la vidéo et posé en CSS par-dessus (`::before` avec un bruit SVG en tuile) : 0 octet de vidéo en plus.
- **Ce qui ne doit pas bouger ne doit pas bouger du tout.** Une gaussienne a des queues infinies : des lignes loin de la lentille bougeaient de 0,1 px, ce qui change l'anticrénelage de toute l'image. Un seuil (`g < 0,04 → 0`) a fait gagner ~10 %.
- **Traits fins = vidéo lourde** : en portrait, lignes espacées de 40 px (au lieu de 26) et épaisses de 2,2 px (au lieu de 1,6).
- Les dégradés flous se compressent très bien, surtout en VP9 (73 Ko !).
- Une image clé toutes les 3 s suffit pour une boucle (le retour à 0 tombe sur une image clé). Pour une vidéo **pilotée au défilement**, il en faut beaucoup plus : voir `rife-ffmpeg.md`.

## Brancher dans un site

1. Copier les fichiers `remotion-<nom>-{paysage,portrait}.{webm,mp4,jpg}` dans `images/` / `videos/` du site.
2. Reprendre le hero de `fonds-hero/remotion-maille.html` (fond sombre) ou `remotion-lignes.html` (fond clair + grain CSS) : vidéo sans `autoplay`, choix paysage/portrait à 767 px, WebM VP9 si `canPlayType` le permet sinon MP4, affiche préchargée, téléchargement après `load`, rien en mouvement réduit, bouton pause, arrêt hors écran et onglet caché.
3. `--fond-hero` = la couleur `fond` de la composition, pour qu'aucun flash n'apparaisse avant l'affiche.
4. Un seul fond animé par page.

## Prompt pour créer une nouvelle composition

> Écris une composition Remotion 4 en TypeScript (`React.FC<Props>`) pour un fond de hero abstrait en boucle parfaite de 7 s à 24 i/s, qui s'adapte à `useVideoConfig()` (1920×1080 et 1080×1920). Tout mouvement passe par `phase = 2π × image / durée` et seulement `sin(k·phase + décalage)` avec k entier ; aucun hasard non déterministe. Couleurs en props avec valeurs par défaut. Pas de texte dans l'image. Pense à la compression : grandes zones calmes, rien ne bouge de moins d'un pixel, pas de bruit animé, traits d'au moins 1,6 px. Enregistre-la dans `src/Racine.tsx` en deux `<Composition>` (paysage et portrait), puis lance `npm run rendre`.
