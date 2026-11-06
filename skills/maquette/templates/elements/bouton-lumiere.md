# Bouton lumière

apercu: bouton-lumiere.html?apercu

Élément · démo : [`bouton-lumiere.html`](bouton-lumiere.html) · captures : `captures/bouton-lumiere-1440.webp`, `-375.webp`, `-1440-reduit.png`

- **Technique** : CSS + 4 lignes de JS
- **Inspiré de** : bouton du hero Kweeto, refait après un retour client. Code écrit par nous.

## Licence

Code original Lance ton site, sans dépendance.

## Pourquoi pas un aimant

Le bouton aimanté du test Kweeto a été jugé « dégueulasse » par le client : il allait jusqu'à 30 px, relisait sa propre position (il tremblait) et touchait le bouton voisin. Pour un appel à l'action, le bouton reste à sa place. Ici, seule la lumière suit la souris. Pas de verre non plus : sur un dégradé, il salit la couleur et baisse le contraste.

## Quand l'utiliser

Le bouton principal de la page, sur fond sombre ou coloré. Un seul par écran.

## Brancher dans une maquette

1. Copier le bloc « à copier » du `<style>`, le HTML et le `<script>`.
2. Régler les couleurs sur le thème. Vérifier le contraste du texte (4,5:1 au moins) sur le bas du dégradé.
3. Vérifier avec `../verifier-elements.cjs`.

## Variables

| Variable | Défaut | Rôle |
|---|---|---|
| `--bl-haut`, `--bl-bas` | `#FF7B45`, `#F4602A` | dégradé du fond |
| `--bl-texte` | `#241C18` | texte et contour de focus |
| `--bl-ombre` | `120 40 10` | ombre teintée, en RGB |
| `--bl-force` | `.26` | intensité de la lumière : .5 faisait une tache blanche |

## Prompt pour le régénérer

> Écris un bouton plein en dégradé léger : au survol, une lumière radiale de 90 px, blanche à 26 %, suit la souris à l'intérieur du bouton (variables `--x` et `--y` posées au `pointermove`, `overflow:hidden`, pseudo-élément sous le texte), le bouton se soulève de 2 px et la flèche avance de 4 px. Sans aimant, sans verre, sans relire sa position en boucle. Rien au doigt. En mouvement réduit : la lumière reste, plus aucun déplacement.

## Téléphone

Aucun effet de survol. Hauteur 52 px, largeur du texte.

## Accessibilité

Vrai lien ou vrai bouton, contour de focus visible, lumière aussi au focus clavier.

## Mouvement réduit

Plus aucun déplacement. La lumière reste : elle ne bouge que sous la main.

## Performance

`transform` et `opacity` seulement, aucune boucle : le JS ne tourne qu'au passage de la souris.
