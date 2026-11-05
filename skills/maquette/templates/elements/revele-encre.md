# Révélation à l’encre

apercu: revele-encre.html?apercu

Élément · démo : [`revele-encre.html`](revele-encre.html) · captures : `captures/revele-encre-1440.webp`, `-375.png`, `-1440-reduit.png`

- **Technique** : Canvas 2D (masque de traînée en dégradés radiaux, `destination-in`)
- **Poids** : démo 10,7 Ko (4,3 Ko gzip), plus la photo du soir `medias/halle-soir-1200.webp` (77 Ko)
- **Inspiré de** : E8 (« Ink Reveal », accueil) dans `../motionsites-etude.md`. Code et textes écrits par nous.
- **Licence** : code original Lancetonsite, libre de réemploi dans les maquettes du kit. Police Inter Tight : SIL Open Font License 1.1 (Google Fonts). Photo de jour : `exemples/festival-tole/images/halle-vide.webp`, générée pour le kit (exemple Tôle), à remplacer par celles du client ; la version « nuit tombée » en est une retouche (assombrissement, verrières éteintes, lumière chaude au fond ; pas de public, d’où le texte qui ne promet pas de concert) faite avec ffmpeg pour garder exactement le même cadrage.

## Quand l'utiliser

Avant / après : chantier, rénovation, salle vide puis pleine, plat cru puis cuit. Deux photos **de même cadrage** (même pied, même focale) : sinon l’œil voit deux lieux et l’effet ment. Faute de vraie paire, retoucher une seule prise en deux versions, comme dans la démo. Pas sur une image qui porte du texte.

## Brancher dans une maquette

1. Copier le bloc « à copier » du `<style>`, le HTML de l'élément et son `<script>` s'il en a un. Le bloc « Démo » ne sert qu'à la page d'exemple.
2. Remplacer les textes et images fictifs par ceux de `05-contenus/` et `06-medias/`.
3. Régler les variables ci-dessous sur le thème de la maquette (`07-maquette/prototype/theme.css`).
4. Vérifier avec `../verifier-elements.cjs` (0 erreur, captures 1440 et 375, mouvement réduit).

## Variables

| Variable | Défaut | Rôle |
|---|---|---|
| `--encre-pinceau` | `70` | rayon du pinceau en px (×0,7 sous 600 px de large ; la démo met 90 au-delà de 1200 px) |
| `--encre-lisere` | `#ff6a3d` | halo chaud au bord du trait : la traînée teintée, floutée de 7 px, à 55 %, glissée sous l’image découverte (`destination-over`), pour que le trait se lise comme une encre fraîche et non comme une salissure |
| `--encre-attente` | `700` | ms après le dernier mouvement avant que l’encre commence à sécher |
| `--encre-sechage` | `4500` | ms pour sécher entièrement (opacité restante 1 − u², calée sur le temps, pas sur la cadence d’affichage) |

Le cœur de chaque goutte est opaque jusqu’à 75 % du rayon, puis le bord s’adoucit : l’image cachée se voit nettement pendant le geste.

## Prompt pour le régénérer

> Écris une révélation d’image à l’encre en canvas 2D : deux photos du même cadrage superposées, le pointeur peint dans un canvas de masque des gouttes à bord irrégulier (dégradé radial opaque jusqu’à 75 % du rayon, plus quelques satellites) et bordées d’un halo chaud (le masque teinté et flouté, dessiné sous l’image en `destination-over`), reliées entre deux positions pour une traînée continue ; l’image cachée n’apparaît qu’à travers ce masque (`destination-in`). L’encre reste pleine pendant le geste, ne commence à sécher que 700 ms après le dernier mouvement, puis sèche en 4,5 s selon une courbe calée sur le temps (opacité 1 − u²), et le masque est vidé à la fin. Une pastille « Passez la souris / Glissez le doigt » posée sur la photo disparaît au premier geste. Un bouton « Montrer… » à `aria-pressed` révèle tout d’un coup pour le clavier et le toucher. En mouvement réduit, l’encre ne sèche pas. Densité de pixels plafonnée à 2, boucle arrêtée quand l’encre est sèche.

## Accessibilité

Les deux images ont un `alt` qui décrit chaque état ; le canvas est `aria-hidden`. La pastille d’indice est du texte lisible (blanc sur fond sombre voilé). Bouton à bascule (`aria-pressed`) dont le libellé change : l'état révélé est accessible sans pointeur.

## Mouvement réduit

L'encre ne sèche pas et rien ne s'efface seul : ce qui a été découvert le reste.

## Performance

La boucle ne tourne que du dernier mouvement jusqu’à la fin du séchage (environ 5 s), puis s’arrête. Densité de pixels plafonnée à 2. Aucune dépendance externe hors polices de la démo.
