# Carte de provenance (Two.js)

apercu: carte-provenance-two.html?apercu

Élément · démo : [`carte-provenance-two.html`](carte-provenance-two.html) · captures : `captures/carte-provenance-two-1440.webp`, `-375.png`, `-1440-reduit.png`

- **Technique** : Two.js en rendu SVG, dans un repère fixe de 800 × 560 mis à l'échelle par `viewBox`. Carte illustrée en formes simples (parcelles inclinées, rivière et routes en courbes, bosquets de ronds, blocs de village). Le trajet est une courbe dont `ending` passe de 0 à 1 : il se dessine de la ferme au relais ; un point blanc marque la tête du tracé (`getPointAt`) ; chaque étape s'allume quand le tracé l'atteint. Le trajet roule **sur** la route départementale (même courbe, route blanche de 12 px, trajet rouge de 5 px dessus) ; des ponts sont posés automatiquement là où une route croise la rivière (point le plus proche des deux courbes, `getPointAt`) ; la distance de chaque tronçon apparaît quand le tracé le parcourt. Sans Two.js, une copie SVG figée de la carte finale, inline dans la page, reste affichée. À côté, une liste ordonnée HTML des étapes porte l'information.
- **Paquet** : `two.js@0.8.24` (`build/two.min.js`, global `Two`).
- **Poids** : démo 27 420 octets (7 480 octets gzip), dont environ 12,8 Ko pour la carte de repli en SVG inline. Bibliothèque : 205 Ko (50 Ko gzip).
- **Inspiré de** : exemples de tracés progressifs de Two.js (`path.ending`). Carte, lieux et textes inventés par nous.

## Licence

Two.js : MIT, © 2012-2025 @jonobr1 — https://github.com/jonobr1/two.js/blob/dev/LICENSE (vérifiée sur le dépôt le 5 novembre 2026). Impose de garder la mention de copyright et la licence avec le code redistribué : mention en en-tête de la démo.

## Quand l'utiliser

Circuit court, producteur local, artisan qui veut montrer « d'où ça vient » : légumes, café, laine, bois, vin. La carte doit rester illustrée et simple ; pour une vraie carte géographique, prendre une tuile cartographique, pas ce composant.

## Brancher dans une maquette

1. Copier le `<script src>` de Two.js, le bloc « à copier », la section `.provenance` et le script.
2. Remplacer `etapes` (x, y, nom) et `ancres` (points du trajet, en repère 800 × 560) par le vrai parcours ; garder les étapes sur des ancres (indices dans `fractions`). La route est tracée sur les mêmes ancres : le camion suit toujours la route. Mettre les distances par tronçon dans `distances` (mêmes chiffres que la liste).
4. Régénérer la carte de repli : ouvrir la page en mouvement réduit, copier le contenu du `<svg>` produit par Two.js (`document.querySelector('#carte svg').innerHTML`) dans le `<svg class="provenance__repli">`. Deux routes croisant la rivière = deux ponts, rien à placer à la main.
5. Noms de lieux : des communes inventées ou réellement voisines, avec des distances vraisemblables.
6. La carte n'est pas à l'échelle : garder la mention « Plan schématique, distances réelles dans la liste » (`.provenance__echelle`, en bas à droite), ou dessiner à l'échelle.
3. Écrire la liste HTML avec les mêmes étapes : c'est elle que lisent les lecteurs d'écran et les moteurs.

## Variables

| Variable | Défaut | Rôle |
|---|---|---|
| `--carte-terre` | `#efe8d8` | fond de carte |
| `--carte-champ-1/2/3` | verts et ocre | parcelles |
| `--carte-eau`, `--carte-foret`, `--carte-route` | bleu, vert, blanc cassé | décor |
| `--carte-trajet` | `#b2471b` | tracé et pastilles (≥ 3:1 sur le fond) |
| `duree` | `3200` ms | durée du tracé |

## Prompt pour le régénérer

> Écris une section HTML autonome « d'où viennent vos légumes » avec Two.js 0.8.24 (UMD, rendu SVG). À gauche, une carte illustrée dessinée en code dans un repère de 800 × 560 mis à l'échelle par `viewBox` : parcelles en quadrilatères inclinés de trois verts et ocres, rivière et routes en courbes épaisses, bosquets de ronds, petits blocs de village. Par-dessus, un trajet en courbe de la ferme au point relais, dont `ending` passe de 0 à 1 en 3 s à l'entrée dans l'écran (une seule fois), avec un point blanc en tête et quatre étapes numérotées qui s'allument au passage. À droite, la liste ordonnée HTML des étapes avec une phrase par étape et la distance totale. Le SVG est `aria-hidden`. La route principale passe exactement par les points du trajet (le trajet est dessiné par-dessus), un pont là où une route croise la rivière, et la distance de chaque tronçon sur la carte. Bouton « Rejouer le trajet » de 44 px dans un coin vide, réduit à une icône ↻ (avec texte masqué pour les lecteurs d'écran) sous 600 px. Sur petit écran, grossis les étapes et leurs étiquettes. Sans Two.js, garde une copie SVG statique de la carte finale dans la page. Mention discrète « plan schématique » en bas à droite de la carte. En mouvement réduit, affiche directement le tracé complet.

## Accessibilité

La carte est décorative (`aria-hidden`) ; la liste ordonnée visible donne les mêmes informations à tous. Couleur du trajet à plus de 3:1 sur le fond ; texte des étapes en encre foncée. Bouton Rejouer natif, 44 × 44 px minimum, focus visible ; sous 600 px, icône ↻ seule mais nom accessible « Rejouer le trajet » conservé (texte masqué visuellement). Sans Two.js, la carte figée reste visible et la liste porte l'information.

## Mouvement réduit

Tracé complet et toutes les étapes affichés d'emblée ; pas de bouton Rejouer.

## Performance

SVG léger (une soixantaine de formes) ; l'animation dure 3,2 s puis s'arrête (aucune boucle) ; si l'onglet est caché pendant le tracé, on saute à l'état final. Le calcul des ponts (200 × 200 échantillons par croisement) se fait une fois au chargement, en quelques millisecondes. Le gros du poids est Two.js (50 Ko gzip) : si la page n'a qu'une carte figée à montrer, le SVG de repli seul suffit (≈ 3 Ko gzip).
