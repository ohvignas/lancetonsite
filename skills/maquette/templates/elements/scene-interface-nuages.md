# Scène d'interface dans les nuages

apercu: scene-interface-nuages.html?apercu

Élément · démo : [`scene-interface-nuages.html`](scene-interface-nuages.html) · captures : `captures/scene-interface-nuages-1440.webp`, `-375.webp`

- **Technique** : `position: sticky` sur une piste de 520vh, défilement lu en JS (sans bibliothèque), nuages en bruit fractal sur canvas 2D, sans image.
- **Inspiré de** : hero Kweeto (test du plugin, novembre 2026). Code et noms écrits par nous.

## Licence

Code original Lance ton site, sans dépendance. Logiciel de la démo inventé.

## Règle de vérité

L'interface montrée est une **démonstration** tant qu'elle n'est pas une vraie capture du produit : garder la mention visible « Interface de démonstration ». Aucun chiffre inventé dans les écrans.

## Quand l'utiliser

Hero d'un logiciel ou d'un service qui s'explique en trois moments. Un seul par page, et seulement en haut : la scène retient le visiteur sur cinq écrans de défilement. Pour un site vitrine sans interface à montrer, préférer un hero plus court.

## Brancher dans une maquette

1. Copier le bloc « à copier » du `<style>`, le HTML de `.sin-piste` et le `<script>`.
2. Remplacer les trois `.vue` par de vraies captures ou vidéos, en gardant trois enfants directs dans `#sinEcran`.
3. Écrire les trois moments, puis la phrase de `.sin-fin`.
4. Commencer la section suivante sur le blanc : la fin de la scène y arrive sans coupure.

## Variables

| Variable ou constante | Rôle | Par défaut |
|---|---|---|
| `--sin-ciel-haut`, `--sin-ciel-bas` | dégradé du ciel | bleu nuit, bleu clair |
| `--sin-accent` | numéro des moments | orange |
| `height` de `.sin-piste` | durée de la scène au défilement | `520vh` |
| `MOM` | début et fin de chaque moment, de 0 à 1 | trois plages |

## Prompt pour le régénérer

```
/lancetonsite:maquette

Écris une scène de hero pilotée par le défilement, dans une piste de 520vh avec une scène collée en `position: sticky`. Au départ, titre et phrase au centre, et une fenêtre d'interface dessous, posée sur des nuages. En défilant : le titre s'efface, la fenêtre grandit et se décale à droite, trois moments s'enchaînent à gauche (l'écran de la fenêtre change avec eux), puis la fenêtre recule et trois nappes de nuages opaques montent devant elle jusqu'au blanc, où apparaît une dernière phrase. Les nuages sont générés sur canvas, en bruit fractal qui boucle, sans aucune image : trois couches à vitesses différentes, en pixels entiers. La fenêtre suit légèrement la souris. Bouton pause visible. La boucle s'arrête quand la scène sort de l'écran. En mouvement réduit : plus d'épinglage, tous les contenus se lisent à la suite. Mention « Interface de démonstration » visible.

Adapte couleurs, textes et médias à mon design system (08-design-system/).
```

## Téléphone

La fenêtre reste centrée, à 88 % de la largeur, et les moments passent au-dessus d'elle. Pas de suivi de la souris.

## Accessibilité

Vrai titre `h1` et vrais titres de moments. L'écran porte un `role="img"` et sa description. Le bouton pause fait 44 px de haut et se règle au clavier.

## Mouvement réduit

Pas d'épinglage ni de canvas : titre, interface, trois moments et phrase finale, à la suite.

## Performance

Les nappes de nuages sont calculées une seule fois au chargement, puis seulement redessinées. La boucle est coupée hors écran. Non mesuré sur une vraie carte graphique ni sur un vrai téléphone : à regarder de ses yeux avant de présenter.
