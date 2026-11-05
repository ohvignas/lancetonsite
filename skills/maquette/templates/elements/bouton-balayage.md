# Bouton balayage

apercu: bouton-balayage.html?apercu

Élément · démo : [`bouton-balayage.html`](bouton-balayage.html) · captures : `captures/bouton-balayage-1440.webp`, `-375.png`, `-1440-reduit.png`

- **Technique** : CSS pur (deux libellés superposés, `clip-path` qui découvre la copie allumée, pseudo-élément pour la barre) + 4 lignes de JS qui mesurent la largeur du bouton
- **Poids** : démo 6 571 octets (2 750 gzip) ; démo en Chakra Petch ; la recette tient en 30 lignes de CSS
- **Inspiré de** : bouton « left-to-right scan » de la bibliothèque Jiro (https://jiro.build/components/button/left-to-right-scan), vu en aperçu public. Rien n'est repris : idée relevée, code et textes écrits par nous. Voir `../etude/jiro.md`.
- **Licence** : code maison Lancetonsite, libre pour les sites clients. Police Chakra Petch sous licence SIL OFL 1.1 (Google Fonts). Aucune image. Technique observée sur jiro.build, code non repris.

## Quand l'utiliser

Appel à l'action principal d'un site sombre et technique : sécurité, studio son, matériel, jeu vidéo, logiciel. Un seul par écran : c'est un signal, pas une décoration. Sur téléphone il n'y a pas de survol : seul l'état repos compte, d'où le liseré d'accent du bouton principal ; le bouton secondaire prend la classe `discret` (neutre au repos). À éviter sur fond clair (la lumière ne se voit pas) et pour les métiers « doux » (santé, enfance).

## Brancher dans une maquette

1. Copier le bloc « à copier » du `<style>` et le petit `<script>`.
2. Écrire le libellé deux fois dans le bouton (`<span aria-hidden>` + `<span class="bal-allume" aria-hidden>`) et le mettre aussi en `aria-label` : le lecteur d'écran ne l'entend qu'une fois.
3. Régler les variables sur les tokens de `06-design-system/`.
4. Vérifier avec `../verifier-elements.cjs`.

## Variables

| Variable | Défaut | Rôle |
|---|---|---|
| `--bal-fond` | `#0e1418` | fond du bouton |
| `--bal-texte` | `#b8c6cf` | libellé au repos (10,6:1 sur le fond) |
| `--bal-lumiere` | `#5ef2e4` | couleur allumée et barre |
| `--bal-duree` | `.7s` | durée du balayage |
| `--bal-repos-bord` | accent à 55 % | liseré et léger halo au repos (principal) ; `rgb(255 255 255 / .12)` avec la classe `discret` |

## Prompt pour le régénérer

> Écris un bouton CSS sombre en pilule dont le libellé est écrit deux fois l'un sur l'autre : la copie du dessus, de la couleur d'accent avec un léger halo, est masquée par `clip-path: inset(0 100% 0 0)`. Au survol et au focus clavier, le masque s'ouvre de gauche à droite pendant qu'une barre verticale lumineuse de 2 px (pseudo-élément) traverse le bouton à la même vitesse, puis s'éteint. Le libellé au repos doit rester lisible (contraste ≥ 4,5:1). Au repos, le bouton principal porte déjà un liseré fin de la couleur d'accent (visible au doigt, sans survol) ; une classe `discret` rend le secondaire neutre. La copie allumée est en `user-select: none` pour que le copier-coller ne double pas le libellé. Libellés en `aria-hidden` et nom accessible en `aria-label`. Mouvement réduit : changement de couleur instantané, pas de barre. Couleurs et durée en variables.

## Accessibilité

Libellé au repos à 10,6:1, allumé à 13,5:1. Focus visible : contour de 3 px de la couleur d’accent du bouton (cyan 14,4:1, ambre 12,7:1 sur le fond de page). Cible de 52 px de haut. Nom accessible unique grâce à `aria-label`. En couleurs forcées, la copie allumée est masquée et le bouton reçoit une bordure système (3 px pour le principal, 2 px pour le secondaire). La copie allumée n'est pas sélectionnable : copier le texte de la page ne double pas le libellé.

## Mouvement réduit

Pas de barre ni de transition : la couleur bascule d'un coup au survol.

## Performance

Animations sur `transform` et `clip-path` seulement, aucune boucle. Le halo (`box-shadow` coloré) est assumé : c'est la lumière du geste ; ne pas le généraliser aux autres boutons.
