# Bouton permuté

apercu: bouton-permute.html?apercu

Élément · démo : [`bouton-permute.html`](bouton-permute.html) · captures : `captures/bouton-permute-1440.webp`, `-375.png`, `-1440-reduit.png`

- **Technique** : CSS pur (deux pastilles-icônes en position absolue, `transform: scale()` et transition de `padding` avec un ressort `cubic-bezier`). La place de la pastille est réservée par le padding : la largeur du bouton reste constante pendant tout le geste (mesuré : écart de largeur 0 px image par image)
- **Poids** : démo 5 962 octets (2 304 gzip) ; la recette tient en 25 lignes de CSS
- **Inspiré de** : bouton « swap » de la bibliothèque Jiro (https://jiro.build/components/button/swap-button), vu en aperçu public. Idée relevée seulement ; code et textes écrits par nous. Voir `../etude/jiro.md`.
- **Licence** : code maison Lancetonsite, libre pour les sites clients. Police Bricolage Grotesque sous licence SIL OFL 1.1 (Google Fonts). Icônes SVG dessinées dans le code. Technique observée sur jiro.build, code non repris.

## Quand l'utiliser

Appel à l'action d'un studio, d'une agence, d'un artisan au ton chaleureux : « Parlons de votre projet », « Voir les travaux ». Fonctionne sur fond clair comme sombre. Le geste est petit et joyeux : il convient mal à un notaire ou à une clinique.

## Brancher dans une maquette

1. Copier le bloc « à copier » du `<style>`.
2. Garder la structure : pastille gauche, libellé, pastille droite (même icône, `aria-hidden`).
3. Régler les variables sur les tokens ; vérifier avec `../verifier-elements.cjs`.

## Variables

| Variable | Défaut | Rôle |
|---|---|---|
| `--pm-fond` | `#c2410c` | pilule |
| `--pm-texte` | `#fff` | libellé (5,2:1 sur le fond) |
| `--pm-pastille` | `#fff` | rond de l'icône |
| `--pm-icone` | `#c2410c` | trait de l'icône |
| `--pm-taille` | `40px` | diamètre de la pastille |
| `--pm-anneau` | `#7c2d12` | anneau de focus (7,9:1 sur le fond clair de la démo ; `#1c1917` pour la variante sombre) |
| `--pm-marge` | `1.4rem` | espace libre du côté sans pastille |
| `--pm-place` | `taille + 5px + .6rem` | place réservée à la pastille par le padding |
| `--pm-ressort` | `cubic-bezier(.5,1.6,.4,.9)` | rebond du geste |

## Prompt pour le régénérer

> Écris un bouton pilule avec une pastille ronde contenant une flèche à gauche du libellé. Au survol et au focus clavier, la pastille de gauche rétrécit à zéro en tournant, une seconde pastille identique grandit à droite, et le libellé glisse vers la gauche pour prendre la place : on obtient l'impression que l'icône a traversé le bouton. Les deux pastilles sont en position absolue ; leur place est réservée par le padding (grand padding du côté de la pastille visible, petit de l'autre), et seul ce padding transite : la somme des deux reste égale, donc la largeur du bouton ne doit jamais changer, ni au survol ni à la sortie, et les boutons voisins ne bougent pas. Uniquement des transitions de `transform` et de `padding`, avec un léger rebond. Icônes en `aria-hidden`. Mouvement réduit : pas de transition. Couleurs et taille en variables.

## Accessibilité

Le libellé reste le nom accessible ; icônes décoratives masquées. Focus visible : anneau de 3 px réglable (`--pm-anneau`) : orange brûlé foncé 7,9:1 et anthracite 14,8:1 sur le fond bleuté de la démo ; cible de 50 px. Contraste blanc sur orange brûlé 5,2:1 ; variante sombre 16:1.

## Mouvement réduit

Les pastilles changent de côté sans animation.

## Performance

Aucun JS. La transition de `padding` provoque une mise en page sur ce seul bouton, négligeable.
