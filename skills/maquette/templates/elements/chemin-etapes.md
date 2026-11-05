# Chemin d’étapes qui se trace

apercu: chemin-etapes.html?apercu

Élément · démo : [`chemin-etapes.html`](chemin-etapes.html) · captures : `captures/chemin-etapes-1440.webp`, `-375.png`, `-1440-reduit.png`

- **Technique** : GSAP 3.15.0 + ScrollTrigger (`scrub`, sans épinglage) + SVG natif : arcs quadratiques calculés entre les points, pointillé révélé par un masque dont on anime `stroke-dashoffset` (`pathLength=1`)
- **Poids** : démo 8870 octets (3610 gzip) + GSAP 3.15.0 + ScrollTrigger (jsdelivr, versions fixées ; ≈ 46 Ko gzip, déjà chargés si la page utilise `prototype/gestes.js`)
- **Inspiré de** : composant « Step Path » de scrolltide.co (bibliothèque de prompts d’animations au défilement), vidéo d’aperçu publique. Prompt payant non consulté. Code, textes et réglages écrits par nous ; voir `../etude/scrolltide.md`.
- **Licence** : code Lancetonsite original (libre d’usage dans les maquettes du kit). GSAP 3.15.0 et ScrollTrigger sous licence Standard « no charge » de GreenSock/Webflow (usage commercial permis, voir `gsap-bonnes-pratiques.md` § 1 et https://gsap.com/standard-license). Aucune image. Polices Young Serif et Work Sans (Google Fonts, SIL Open Font License).

## Quand l’utiliser

Méthode, fabrication, déroulé d’un service en 3 à 5 étapes, quand `data-steps` (épinglé) serait trop lourd. Ne compte pas comme un épinglage.

## Brancher dans une maquette

1. Copier le bloc « à copier » du `<style>`, le HTML de l’élément et son `<script>`. Le bloc « Démo » et les `[data-explication]` ne servent qu’à la page d’exemple.
2. Remplacer les textes et images fictifs par ceux de `05-contenus/` et `07-medias/`.
3. Régler les variables ci-dessous sur les tokens du design system (`06-design-system/`).
4. Si la page charge déjà `gestes.js`, ne pas recharger GSAP. Vérifier avec `../verifier-elements.cjs` (0 erreur, captures 1440 et 375, mouvement réduit).

## Variables

| Variable | Défaut | Rôle |
|---|---|---|
| `--chemin-trait` | `#d4b994` | couleur du pointillé (2,2 px, tirets `2 6`) |
| `--chemin-encre` | `#f3e6d3` | points (14 px, anneau `#e8a95c` à 25 %) |
| `--chemin-accent` | `#e8a95c` | numéros d’étape |

Escalier de 5 étapes sur ordinateur (marges de 4,5 rem), colonne en zigzag sous 980 px : les arcs bombent alors vers la gauche, hors du texte. Plage : `top 75%` → `bottom 70%`.

## Prompt pour le régénérer

> Écris une section de 3 à 5 étapes, en escalier sur ordinateur et en colonne sur téléphone, reliées par une ligne pointillée en arcs. Elle doit se lire de loin : titres de 21 à 27 px, texte de 16 à 18 px, pointillé clair de 2,2 px, points de 14 px cerclés d’un anneau d’accent. Les étapes doivent être complètes pour le métier (pour un pain : farine, pétrissage, pointage, façonnage, cuisson) et leurs durées tenir dans la durée annoncée par le titre. Calcule en JS les centres des points (offsetLeft/Top, insensibles aux transforms) et trace entre chaque paire un arc quadratique SVG, recalculé par ResizeObserver. Le pointillé est dévoilé par un masque SVG : un trait plein `pathLength=1` dont on anime `stroke-dashoffset` de 1 à 0. Une timeline GSAP ScrollTrigger en `scrub`, sans épinglage, enchaîne : étape 1 qui monte en fondu, arc 1 qui se trace, étape 2, etc. Avec `gsap.matchMedia()` : en mouvement réduit ou sans GSAP, la ligne est déjà tracée et toutes les étapes visibles. N’utilise pas DrawSVG. Dans les textes affichés, utilise les apostrophes typographiques (’), jamais l’apostrophe droite.

## Accessibilité

Liste ordonnée `ol` ; le SVG est `aria-hidden`. Texte #dccbb3 sur #2a1d14 (≈ 10:1), titres d’étape 21 à 27 px, texte 16 à 18 px. Pointillé #d4b994 sur #2a1d14 (≈ 8:1), 2,2 px d’épaisseur : visible sur un écran mal réglé.

## Mouvement réduit

Ligne entièrement tracée, étapes visibles, rien ne bouge. Tout passe par `gsap.matchMedia("(prefers-reduced-motion: no-preference)")` : les ScrollTrigger sont annulés d’eux-mêmes si la préférence change.

## Performance

Animés : `stroke-dashoffset` d’un trait de masque (peinture seule), `opacity` et `transform` des étapes. Aucun plugin payant ni DrawSVG, aucune image. Les arcs sont recalculés par `ResizeObserver` ; `ScrollTrigger.refresh()` au `load`, une fois les polices posées.
