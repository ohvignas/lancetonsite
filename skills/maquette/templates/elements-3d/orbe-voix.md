# Orbe vocal

apercu: orbe-voix.html?apercu

Élément 3D · démo : [`orbe-voix.html`](orbe-voix.html) · captures : `captures/orbe-voix-1440.png`, `-375.png`, `-1440-reduit.png`, `-1440-sans-webgl.png`, `-375-sans-webgl.png`

- **Technique** : Three.js 0.170 (importmap ESM jsdelivr) + un `ShaderMaterial` écrit à la main : bruit de valeur 3D et fbm, déplacement des sommets d'un icosaèdre subdivisé, marbre par « domain warping », éclairage simple, liseré de Fresnel, sortie en sRGB (`#include <colorspace_fragment>`) ; la voix est celle du navigateur (`speechSynthesis`, liste ordonnée de voix de qualité : Audrey > Aurélie > Google français > Microsoft Denise > Microsoft Vivienne > Thomas > Amélie (voix de France avant la voix canadienne), voix gadget de macOS exclues) et chaque mot prononcé (`onboundary`) relance l'onde de surface ; sans voix française, l'appel s'affiche en texte ; repli CSS en dégradés radiaux
- **Poids** : démo 13 667 octets (5 752 gzip), aucun fichier audio + Three.js (≈ 170 Ko gzip, cache CDN partagé)
- **Inspiré de** : « Arbo Hero Section » sur https://sceneai.art/landing-pages (« Your AI Voice Agent » : une sphère orange marbrée sur fond bleu). Voir `../etude/sceneai.md`. Shader, textes et interaction écrits par nous.

## Licence

- **Three.js** : MIT — https://github.com/mrdoob/three.js/blob/dev/LICENSE. Chargé depuis le CDN, non modifié.
- **Shader, bruit et code** : originaux, libres d'usage dans le plugin. Police Sora : SIL Open Font License 1.1. La voix est celle du système du visiteur (aucun fichier son distribué).

## Quand l'utiliser

Standard téléphonique IA, assistant vocal, prise de rendez-vous par téléphone, podcast, coach audio : un « visage » abstrait pour une voix. Quand on clique « Écouter un appel type », la voix du navigateur dit les trois répliques, l'orbe vibre sur chaque mot et les répliques s'affichent sous les boutons, puis « Appel terminé ». Sans voix française sur l'appareil, le bouton devient « Lire un appel type » et les répliques défilent en texte (3,5 s chacune). Ne jamais écrire « Écouter » sur un bouton qui ne produit aucun son. La démo s'écoute au mieux avec **Audrey** (voix « améliorée » de macOS, à télécharger dans Réglages > Accessibilité > Contenu énoncé) ; les voix Eloquence (Flo, Sandy, Shelley, Eddy, Rocko, Grandma…) sont écartées : une voix masculine propre vaut mieux qu'une voix de jouet.

## Brancher dans une maquette

1. Copier le `<div class="orbe">`, le bloc CSS, l'importmap et le module.
2. Le bouton `[data-parler]` pilote l'état « parle » ; remplacer le tableau `phrases` par un vrai extrait d'appel (`05-contenus/`). La voix de synthèse du navigateur varie d'un appareil à l'autre ; pour une voix maîtrisée (celle du vrai produit), remplacer `speechSynthesis` par un `<audio>` et brancher `voix` sur son volume (Web Audio `AnalyserNode`) ; **ne jamais ouvrir le micro sans demande explicite**.
3. Couleurs : variables ci-dessous.

## Variables

| Variable | Défaut | Rôle |
|---|---|---|
| `--orbe-a` | `#ff8a4c` | marbre clair |
| `--orbe-b` | `#d4502a` | marbre sombre |
| `--orbe-c` | `#ffe0c2` | veines claires |
| `--orbe-halo` | `#8fc4ff` | liseré froid (reflet du fond) |

Dans le shader : `d * .035` (relief au repos : sphère presque lisse), `voix * (.03 + .035 * onde)` avec une onde basse fréquence (`normal.y * 5.`) (relief quand il parle : une respiration ronde, pas une forme anguleuse), `vP * 1.8` (taille des veines).

## Prompt pour le régénérer

> Écris en Three.js 0.170 (importmap ESM jsdelivr) un orbe d'assistant vocal : un `IcosahedronGeometry(1, 48)` avec un `ShaderMaterial` maison. Dans le shader de sommets, déplace chaque sommet le long de sa normale avec un fbm 3D lent, plus une onde rapide multipliée par un uniforme `voix`. Dans le shader de fragments, fais un marbre orange par domain warping (fbm de fbm), un éclairage diffus doux, un reflet spéculaire et un liseré de Fresnel bleu clair qui s'intensifie quand `voix` monte. Fond bleu en dégradé radial. Convertis la sortie en sRGB. Un bouton « Écouter un appel type » fait dire trois répliques par `speechSynthesis` (voix choisie après `voiceschanged` dans une liste ordonnée de voix de qualité, voix gadget exclues) : `voix` suit un produit de sinus lissé plus une impulsion à chaque `onboundary`, un anneau blanc entoure l'orbe, chaque réplique s'affiche une fois dans un `role="status"`, puis « Appel terminé » et tout s'arrête. Le libellé passe à « Arrêter l’appel » et l'icône à « ■ » pendant l'appel. Relief en parole faible et à basse fréquence (`voix * (.03 + .035 * onde)`). Sans voix française : bouton « Lire un appel type » et répliques en texte. Aucun accès au micro. Repli CSS en dégradés radiaux, bouton pause, rendu stoppé hors écran et onglet caché, orbe figé en mouvement réduit (l'anneau et les répliques restent).

## Accessibilité

L'orbe est décoratif (`aria-hidden`) ; l'état « parle » est porté par le libellé du bouton (« Écouter un appel type » / « Arrêter l’appel ») et par l'anneau blanc (visible même sans animation). Répliques via `role="status"` : quatre annonces au plus en mode texte, jamais en boucle. Quand la voix parle, la transcription s'affiche mais la zone passe en `aria-live="off"` (sinon le lecteur d'écran et la voix de synthèse se superposent) ; seule l'annonce finale « Appel terminé » est faite. Le son ne part que sur clic, jamais tout seul. Texte blanc sur bleu `#1554d6` (5,9:1). Bouton pause de 44 px.

## Mouvement réduit

Orbe rendu une fois, sans relief animé ; le bouton fait quand même parler la voix et affiche l'anneau et les répliques. Vérifié avec Playwright. Sans WebGL : 0 erreur, sphère CSS visible.

## Performance

≈ 46 000 triangles et 4 octaves de bruit par fragment sur une surface de 400 px : léger. Densité de pixels plafonnée à 2, boucle stoppée hors écran, onglet caché et en pause.
