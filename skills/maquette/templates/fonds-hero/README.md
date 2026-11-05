# Fonds de hero

Neuf fonds animés autonomes (un fichier HTML chacun, sans bibliothèque) et leur fiche. Inventaire et sources : [`../motionsites-etude.md`](../motionsites-etude.md). Planche : `captures/planche.jpg`.

| Fond | Technique | Gzip | Pour quels métiers | Fiche |
|---|---|---|---|---|
| [Ruban de soie](ruban-soie.html) | WebGL | 3,7 Ko | service, cabinet, SaaS sobre (fond clair) | [fiche](ruban-soie.md) |
| [Brume sur les crêtes](brume-shader.html) | WebGL (fbm) | 3,8 Ko | montagne, hébergement, vin, bien-être | [fiche](brume-shader.md) |
| [Aurore maillée](aurore-maillee.html) | CSS pur | 2,8 Ko | SaaS, finance, appli, lancement | [fiche](aurore-maillee.md) |
| [Horizon d'éclipse](horizon-eclipse.html) | CSS pur | 2,6 Ko | lancement tech, sécurité, événement de nuit | [fiche](horizon-eclipse.md) |
| [Trame de points](trame-points.html) | Canvas 2D | 3,1 Ko | imprimerie, studio graphique, média, festival | [fiche](trame-points.md) |
| [Sphère de particules](sphere-particules.html) | Canvas 2D (3D faite main) | 3,3 Ko | IA, données, recherche, santé | [fiche](sphere-particules.md) |
| [Champ d'étoiles](champ-etoiles.html) | Canvas 2D | 3,2 Ko | voyage, nuit, astronomie, lancement | [fiche](champ-etoiles.md) |
| [Anneau de traits](anneau-traits.html) | Canvas 2D | 2,8 Ko | concert, podcast, studio son | [fiche](anneau-traits.md) |
| [Vidéo en boucle](video-boucle.html) | `<video>` + JS | 2,7 Ko + vidéo | quand le métier se montre (geste, lieu, matière) | [fiche](video-boucle.md) |

## Règles communes

- **Un seul fond animé par page**, dans le hero ou l'appel final. Il s'ajoute aux gestes du kit (`../prototype/GESTES.md`), il ne les remplace pas.
- **Bouton pause visible** sur chaque fond animé (WCAG 2.2.2) ; la boucle s'arrête hors écran et onglet caché.
- **Mouvement réduit** : image fixe, vérifiée (deux captures à 1,2 s d'écart identiques).
- **Voile** sous le texte réglé pour garder ≥ 4,5:1 ; renforcé sur téléphone.
- Couleurs en variables CSS : on les branche sur les tokens de `06-design-system/`.

## Vérifier

```bash
PW=…/playwright-core CHROME="…/Google Chrome" node ../verifier-elements.cjs http://localhost:4320/atelier/skills/maquette/templates [filtre]
```

0 erreur console, captures 1440 et 375 dans `captures/`, pas de débordement horizontal, mouvement réduit fixe.

## Ajouts

### Repérés sur jiro.build (code réécrit, licence propriétaire : rien repris)

Étude : [`../etude/jiro.md`](../etude/jiro.md).

| Élément | Ce que c'est | Gzip démo | Liens |
|---|---|---|---|
| [Rayons de lumière](rayons-lumiere.html) | Fond de hero WebGL  | 4,1 Ko | [fiche](rayons-lumiere.md) · [aperçu](rayons-lumiere.html?apercu) |

### Repérés sur sceneai.art

Étude : [`../etude/sceneai.md`](../etude/sceneai.md).

| Élément | Ce que c'est | Gzip démo | Liens |
|---|---|---|---|
| [Hublot sur la mer de nuages](hublot-ciel.html) | Fond de hero  | 4,4 Ko | [fiche](hublot-ciel.md) · [aperçu](hublot-ciel.html?apercu) |
| [Pavés de verre](pave-verre.html) | Fond de hero  | 3,9 Ko | [fiche](pave-verre.md) · [aperçu](pave-verre.html?apercu) |

### Fonds vidéo rendus avec Remotion

Étude : [`../outillage/remotion.md`](../outillage/remotion.md).

| Élément | Ce que c'est | Gzip démo | Liens |
|---|---|---|---|
| [Dégradé maillé Remotion](remotion-maille.html) | Fond de hero vidéo rendu avec Remotion  | 3,0 Ko | [fiche](remotion-maille.md) · [aperçu](remotion-maille.html?apercu) |
| [Lignes et grain Remotion](remotion-lignes.html) | Fond de hero vidéo rendu avec Remotion  | 3,4 Ko | [fiche](remotion-lignes.md) · [aperçu](remotion-lignes.html?apercu) |

## Mode aperçu

Chaque démo s'ouvre aussi en `<nom>.html?apercu` : l'élément seul, plein cadre, sans texte d'explication (tout ce qui explique porte `data-explication`). Les captures de `captures/` sont faites dans ce mode. Chaque fiche porte une ligne `apercu:` et une section « Prompt pour le régénérer » prête à coller.
