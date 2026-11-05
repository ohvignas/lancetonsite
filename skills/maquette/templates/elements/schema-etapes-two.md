# Schéma d'étapes animé (Two.js)

apercu: schema-etapes-two.html?apercu

Élément · démo : [`schema-etapes-two.html`](schema-etapes-two.html) · captures : `captures/schema-etapes-two-1440.webp`, `-375.png`, `-1440-reduit.png`

- **Technique** : les étapes sont une vraie liste ordonnée HTML (4 colonnes, une colonne sur téléphone). Two.js pose un SVG par-dessus, mesure la position de chaque pastille réservée dans le HTML, puis dessine aux mêmes endroits des pastilles numérotées qui éclosent avec un petit rebond, et des liaisons en trait plein qui se tracent (`ending`) sur une piste pâle en pointillés, une flèche en tête du tracé (elle suit `getPointAt` et s'oriente sur la tangente). En colonnes, les étapes forment un escalier qui monte (progression) et chaque arc porte l'heure d'arrivée à l'étape suivante (« lundi 6 h », « mardi 14 h », « mardi 16 h »). Le dessin se reconstruit au redimensionnement (`ResizeObserver`), à l'horizontale comme à la verticale.
- **Paquet** : `two.js@0.8.24` (`build/two.min.js`).
- **Poids** : démo 13 304 octets (5 077 octets gzip). Bibliothèque : 205 Ko (50 Ko gzip) ; si la page a déjà la carte de provenance, la bibliothèque est partagée.
- **Inspiré de** : sections « comment ça marche » classiques ; tracé progressif de Two.js. Code et textes écrits par nous.

## Licence

Two.js : MIT, © 2012-2025 @jonobr1 — https://github.com/jonobr1/two.js/blob/dev/LICENSE (vérifiée sur le dépôt le 5 novembre 2026). Mention conservée en en-tête de la démo.

## Quand l'utiliser

Section « comment ça marche » de 3 à 5 étapes : abonnement, prise de rendez-vous, commande sur mesure. Pas pour plus de 5 étapes (le tracé devient une frise illisible).

## Brancher dans une maquette

1. Copier le `<script src>`, le bloc « à copier », la liste `.schema`, le bouton Rejouer et le script.
2. Garder un `<span class="schema__point">` en tête de chaque étape : sans Two.js, c'est la pastille CSS qui s'affiche, et les liaisons sont dessinées en CSS (`li::after` avec deux masques SVG en data-URI : l'arc étiré et la pointe de flèche, colorés par `--schema-trait` ; trait vertical et pointe en colonne). Elles disparaissent dès que Two.js dessine (`.est-trace`).
3. Mettre dans `HORAIRES` le début de chaque étape suivante, avec son verbe (« récolte · lundi 6 h » et non « lundi 6 h » seul) (un de moins que d'étapes), et vérifier que le titre dit la même durée (ici lundi 6 h → mardi 16 h = 34 heures).
4. Brancher le bouton d'appel sur la vraie section des formules (`#abonnement` dans la démo, à remplacer).
5. **Variante sans Two.js** quand la carte de provenance n'est pas sur la page : un `<svg>` inline par liaison (chemin courbe + `marker-end` en flèche) et un `stroke-dashoffset` animé en CSS (`@keyframes`, décalés par `animation-delay`) font le même effet pour environ 1 Ko, sans 50 Ko de bibliothèque. Two.js ne se justifie que s'il est déjà chargé pour la carte.

## Variables

| Variable | Défaut | Rôle |
|---|---|---|
| `--schema-trait` | `#3f6b35` | pastilles et liaisons |
| `--schema-encre` | `#22301f` | titres des étapes |
| taille de pastille | `56px` | dans `.schema__point` |
| `duree` | `2600` ms | durée totale de l'éclosion |
| `HORAIRES` | `["récolte · lundi 6 h", "livraison · mardi 14 h", "au relais · mardi 16 h"]` | étiquette de chaque liaison : au-dessus de l'arc en colonnes, dans l'espace entre deux étapes (aligné sur le texte) sur mobile |
| escalier | `7rem` → `2.5rem` | `margin-top` des `li` au-dessus de 760 px |

## Prompt pour le régénérer

> Écris une section HTML autonome « comment ça marche » en 4 étapes avec Two.js 0.8.24 (UMD, rendu SVG). Les étapes sont une liste ordonnée HTML en grille de 4 colonnes (une colonne sous 760 px), chaque étape commence par une pastille numérotée de 56 px en CSS. Au chargement, Two.js crée un SVG `aria-hidden` en position absolue sur la liste, mesure le centre de chaque pastille et redessine aux mêmes endroits des pastilles qui éclosent avec un léger rebond, reliées par des arcs en trait plein de 3,5 px qui montent vers l'étape suivante et se tracent l'une après l'autre (`ending`) sur une piste pâle en pointillés, avec une flèche qui suit la tête du tracé, en 2,6 s, à l'entrée dans l'écran. En colonnes, décale les étapes en escalier montant et écris au-dessus de chaque arc l'étape suivante et son heure de début (« récolte · lundi 6 h »). Le titre annonce une durée cohérente avec ces horaires. Reconstruis le dessin au redimensionnement ; à la verticale (écart de 2,4rem entre étapes), les liaisons descendent et l'étiquette se place entre deux étapes, alignée sur le texte. Bouton « Rejouer le schéma » de 44 px. Sans Two.js, les pastilles CSS restent et les liaisons sont dessinées en CSS (masques SVG en data-URI sur `li::after`) ; en mouvement réduit, état final directement.

## Accessibilité

L'information est dans la liste HTML ordonnée ; le SVG est décoratif (`aria-hidden`) et les numéros des pastilles HTML aussi (l'ordre de la liste les donne). Bouton natif 44 px, focus visible.

## Mouvement réduit

Pastilles et liaisons affichées d'emblée, pas de bouton Rejouer.

## Performance

Une vingtaine de formes ; animation de 2,6 s puis arrêt (aucune boucle) ; si l'onglet est caché pendant l'animation, on saute à l'état final. Redessin seulement au redimensionnement (`ResizeObserver`). Le coût, c'est Two.js (50 Ko gzip) : à ne charger que si la carte de provenance est déjà sur la page, sinon prendre la variante SVG + CSS décrite dans « Brancher ».
