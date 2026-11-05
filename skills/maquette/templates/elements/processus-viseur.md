# Processus au viseur

apercu: processus-viseur.html?apercu

Élément · démo : [`processus-viseur.html`](processus-viseur.html) · captures : `captures/processus-viseur-1440.webp`, `-375.png`, `-1440-reduit.png`

- **Technique** : CSS `position: sticky` pour le cadre, coins de viseur en dégradés `linear-gradient` positionnés, + 35 lignes de JS au défilement (étape la plus proche du milieu de l'écran, timecode proportionnel à l'avancée)
- **Poids** : démo 12 306 octets (4 464 gzip) ; images de démo : `../exemples/b2b-vigie/images/` (julien-480 pour l'étape 1, puis pose, écoute, alerte, intervention en 1200 px avec `srcset` 640/1200)
- **Inspiré de** : section « process » du modèle Kinetix (portfolio de monteur vidéo) de la bibliothèque Jiro (https://jiro.build/components/how-it-works/process-kinetix), vue en aperçu public. Idée relevée seulement ; code et textes écrits par nous. Voir `../etude/jiro.md`.
- **Licence** : code maison Lancetonsite, libre pour les sites clients. Polices Barlow, Barlow Condensed et JetBrains Mono sous licence SIL OFL 1.1 (Google Fonts). Photos de démo : images générées pour l'exemple fictif Vigie (`../exemples/b2b-vigie/`, voir sa `NOTES.md`), réservées aux démos du kit ; en production, les vraies photos de chantier du client. Technique observée sur jiro.build, code non repris.

## Quand l'utiliser

Section « comment ça se passe » d'un artisan, d'un installateur, d'un prestataire industriel (la démo : capteurs de maintenance prédictive) qui travaille en étapes avec des photos de terrain (3 à 6 étapes). Le viseur et le « REC » donnent un ton reportage : il sert les métiers qui veulent montrer le vrai chantier. Pour un vidéaste ou un photographe, il est presque littéral.

## Brancher dans une maquette

1. Copier le bloc « à copier » du `<style>`, la `<section class="processus" data-processus>` et le `<script>`.
2. Autant d'`<img>` dans `.pv-viseur` que de `<li class="pv-etape">`, dans le même ordre, et autant de `<i>` dans `.pv-barres`. Photos nettes, idéalement en 4/5 et d'au moins 800 × 1000 (ou en paysage d'au moins 1200 px de large, recadrées par `object-fit: cover`), une par étape, même lieu et même lumière. Une photo de 640 px en paysage, recadrée en 4/5 dans un cadre de 500 px, sera floue. Recadrer un visage avec `object-position` (ici `50% 30%` pour l'étape 1).
3. Régler `--pv-haut` sur la hauteur de la barre de navigation fixe ; vérifier avec `../verifier-elements.cjs`.

## Variables

| Variable | Défaut | Rôle |
|---|---|---|
| `--pv-encre` | `#10172a` | texte |
| `--pv-accent` | `#1d3fd1` | étape active, numéros |
| `--pv-rec` | `#e11d2e` | point d'enregistrement |
| `--pv-haut` | `6rem` | marge haute du cadre épinglé |

## Prompt pour le régénérer

> Écris une section « notre méthode » en deux colonnes : à gauche un cadre photo 4/5 épinglé en `position: sticky`, habillé comme un viseur de caméra (quatre coins blancs en équerre, « ÉTAPE 01 / 05 » en haut à gauche, un point rouge et un timecode « REC 00:00:00:00 » en haut à droite, une barre de progression segmentée en bas, voile sombre en haut et en bas pour la lisibilité) ; à droite une liste ordonnée de cartes d'étape (numéro, durée en pastille, titre condensé en capitales, texte, « Vous recevez : … »). Au défilement, l'étape dont le centre est le plus proche du milieu de l'écran devient active : sa carte s'accentue, sa photo apparaît en fondu dans le viseur, le compteur et les segments se mettent à jour. Le timecode suit la progression du défilement, rien ne bouge si l'on ne défile pas. Le numéro de chaque carte porte le total (« 01 / 05 »). Sur mobile, le cadre devient un bandeau épinglé collé tout en haut (`top: 0`, aucun texte ne doit passer au-dessus). Photos nettes, au moins 800 px de large une fois recadrées en 4/5 ; les suivantes en `loading="lazy"`. Photos du viseur décoratives (`aria-hidden`) ; l'étape active porte `aria-current`.

## Accessibilité

Le contenu lisible est la liste ordonnée, complète sans le viseur (décoratif, `aria-hidden`). Étape active signalée par `aria-current`. Inscriptions du viseur sur voile sombre. Aucun piège clavier : il n'y a rien à piloter.

## Mouvement réduit

Pas de fondu ni de zoom des photos, pas de transition des cartes ; la mise à jour suit toujours le défilement (geste de l'utilisateur).

## Performance

Un seul écouteur de défilement passif, regroupé par `requestAnimationFrame`. Image de l'étape 1 chargée d'emblée (julien-480, 28 Ko) ; étapes 2 à 5 en `loading="lazy"` avec `srcset` 640/1200 (≈ 35-40 Ko en 640, ≈ 90-115 Ko en 1200 sur grand écran).
