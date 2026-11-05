# Lignes et grain Remotion

apercu: remotion-lignes.html?apercu

Fond de hero · démo : [`remotion-lignes.html`](remotion-lignes.html) · captures : `captures/remotion-lignes-1440.webp`, `-375.png`, `-1440-reduit.png`

- **Technique** : vidéo rendue avec Remotion (portée de lignes SVG qu'une « lentille » gaussienne soulève en faisant un huit lent), grain **en CSS** par-dessus (bruit SVG en tuile, `mix-blend-mode: multiply`), branchement de `video-boucle.html`.
- **Typo de la démo** : Young Serif (titre, accents bien posés en très grande taille : « imprimés », « été ») et Inter Tight (texte), Google Fonts, SIL Open Font License 1.1. Cormorant Garamond a été écartée : ses accents flottent au-dessus des lettres en taille d'affiche.
- **Poids** : démo 8 118 o (3 509 o gzip). Vidéos 7 s, 24 i/s, sans son : paysage 1920×1080 **583 768 o en WebM** / 795 483 o en MP4 ; portrait 1080×1920 **425 948 o en WebM** / 591 830 o en MP4 ; affiches JPG 132 477 o et 91 595 o.
- **Source** : `../outillage/remotion-fonds/src/LignesGrain.tsx`, compositions `lignes-paysage` et `lignes-portrait` (portrait : lignes plus espacées et plus épaisses pour tenir sous 600 Ko). Recette : `../outillage/remotion.md`.
- **Inspiré de** : les grilles de lignes de base et les papiers vergés de l'imprimerie ; les fonds « lignes ondulées » des sites de studios. Code et textes écrits par nous.
- **Licence** : comme `remotion-maille.md` — nos fichiers sont libres d'usage ; l'outil Remotion est gratuit jusqu'à 3 personnes, licence entreprise au-delà.

## Quand l'utiliser

Hero **clair**, éditorial, pour un métier de papier, de mise en page ou de précision : imprimerie, reliure, cabinet d'architecture, notaire, librairie, maison d'édition. Le texte se pose à gauche, sur la zone que le voile crème calme ; la lentille anime surtout la droite.

## Brancher dans une maquette

1. Copier `medias/remotion-lignes-{paysage,portrait}.{webm,mp4,jpg}`.
2. Copier la `<section class="hero-video">`, le CSS « À copier » (avec le `::before` du grain) et le `<script>`.
3. Pour changer l'encre ou le papier : props `fond` et `encre` au rendu, puis `--fond-hero` = `fond`.
4. Garder le grain en CSS : dans la vidéo, il doublerait son poids.

## Variables

| Variable | Défaut | Rôle |
|---|---|---|
| `data-src / data-affiche` | `medias/remotion-lignes-{format}.{ext}` | comme la maille |
| `--fond-hero` | `#f1ebe1` | papier, = `fond` de la composition |
| `--voile-cote / --voile-bas` | crème `.92` / `.7` (sous 767 px : voile vertical `.96` à partir de 46 % de la hauteur, les lignes restent visibles au-dessus du texte) | calme les lignes sous le texte |
| `--grain` | `.22` | opacité du grain CSS, 0 pour l'enlever |
| props `encre`, `ecart`, `trait`, `hauteurVague`, `grain` | `#2b2621`, 26 px, 1,6 px, 58 px, 0 | au rendu ; `grain` > 0 met le grain dans la vidéo (déconseillé) |

## Prompt pour le régénérer

> Écris une composition Remotion 4 (TypeScript) « lignes et grain » : sur un fond papier, des lignes horizontales fines (une tous les 26 px, trait 1,6 px, encre à 55 %) tracées en SVG point par point, qu'une lentille gaussienne soulève de 58 px en passant ; la lentille décrit un huit (`sin(phase)`, `sin(2·phase)`) et une ondulation interne décalée par ligne suit `sin(x/140 + i·0,35 − 2·phase)`. Sous 4 % d'influence, la ligne ne bouge pas du tout (sinon la compression explose). 7 s à 24 i/s, 1920×1080 et 1080×1920 (portrait : écart 40 px, trait 2,2 px). Rends, recompresse en H.264 CRF 30 (32 en portrait) et VP9 CRF 44 (46), affiche = image 0. Hero HTML clair : vidéo sans `autoplay`, WebM ou MP4, paysage ou portrait, affiche préchargée, téléchargement après `load`, rien en mouvement réduit, bouton pause sombre bien contrasté, arrêt hors écran ; grain posé en CSS par-dessus (bruit `feTurbulence` en data URI, multiplication, opacité 0,22) et voile crème à gauche sous le texte.

## Accessibilité

Vidéo décorative (`aria-hidden`, `tabindex=-1`, muette). Texte `#1f1a16` sur papier `#f1ebe1` voilé : contraste > 14:1. Bouton pause sombre (`rgb(31 26 22 / .85)`, texte `#f7f2ea`) : une première version en noir à 40 % sur le papier donnait un gris trop clair sous le texte blanc, corrigée après lecture des captures. Focus visible rouille.

## Mouvement réduit

Pas de téléchargement vidéo : l'affiche reste, le grain CSS est fixe. Deux captures à 1,2 s d'écart identiques.

## Performance

Les traits fins coûtent cher en vidéo : c'est le motif le plus lourd des deux (584 Ko en WebM paysage), toujours sous la cible. Lecture seulement à l'écran et onglet visible. Vérification : `OK`.
