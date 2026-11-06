# Mot révélé à la souris

apercu: mot-revele.html?apercu

Élément · démo : [`mot-revele.html`](mot-revele.html) · captures : `captures/mot-revele-1440.webp`, `-375.webp`

- **Technique** : canvas 2D au-dessus du mot, masque gratté en `destination-out`, halo en CSS. Sans dépendance.
- **Inspiré de** : mot « privée » du hero Kweeto (test du plugin, novembre 2026). Code et noms écrits par nous.

## Licence

Code original Lance ton site, sans dépendance. Marque de la démo inventée.

## Règle de vérité

Les couleurs d'un pays ne s'affichent que si le lien avec ce pays est **vrai et vérifiable** : une entreprise réellement française, un produit réellement fabriqué là. Sinon, utiliser les couleurs de la marque. Un seul mot révélé par page.

## Quand l'utiliser

Sur le mot qui porte la promesse du titre, en hero. Pas sur un mot long, pas sur un titre qui passe à la ligne au milieu du mot : le canvas suit une seule boîte.

## Brancher dans une maquette

1. Copier le bloc « à copier » du `<style>` et celui du `<script>`.
2. Entourer le mot : `<em data-mot-revele data-couleurs="#2F6FED,#ffffff,#EF4135">française</em>`.
3. Garder `isolation: isolate` sur le parent : le halo passe sous le texte sans passer sous le fond.

## Variables

| Attribut ou variable | Rôle | Par défaut |
|---|---|---|
| `data-couleurs` | couleurs du mot gratté et du contour de la sphère, de gauche à droite | bleu, blanc, rouge |
| `data-portee` | distance en pixels à laquelle la sphère commence à apparaître | `95` (environ 2 cm) |
| `--halo` | dégradé du halo au repos | mêmes couleurs |

## Prompt pour le régénérer

```
/lancetonsite:maquette

Écris un mot de titre révélé à la souris. Au repos, le mot reste immobile et rayonne : un halo flou et coloré respire derrière lui. Quand le curseur approche à moins de 95 px, une sphère de verre apparaît sous la souris et gratte le mot : dans un canvas superposé, le mot redessiné en couleurs est révélé par un masque, qui s'efface doucement après son passage. Le texte réel ne bouge jamais et reste sélectionnable. Au doigt, toucher le mot fait traverser la sphère de gauche à droite. Le canvas se masque et l'animation s'arrête après 3,2 s sans activité. En mouvement réduit, seul le halo fixe reste.

Adapte couleurs et texte à mon design system (08-design-system/). N'utilise les couleurs d'un pays que si le lien avec ce pays est vrai.
```

## Téléphone

Pas de survol : un toucher sur le mot lance une traversée de 1,5 s.

## Accessibilité

Le mot reste du vrai texte. Le canvas est en `aria-hidden` et ne reçoit aucun clic. L'effet n'apporte aucune information : sans lui, le titre se lit pareil.

## Mouvement réduit

Halo fixe, pas de canvas, pas de sphère.

## Performance

Aucune boucle au repos : `requestAnimationFrame` ne tourne que près du mot, puis s'arrête après 3,2 s. Le halo CSS, lui, respire en continu (une propriété `opacity`). Non mesuré sur un vrai téléphone.
