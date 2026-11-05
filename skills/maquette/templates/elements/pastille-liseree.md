# Pastille à liseré dégradé

apercu: pastille-liseree.html?apercu

Élément · démo : [`pastille-liseree.html`](pastille-liseree.html) · captures : `captures/pastille-liseree-1440.webp`, `-375.png`, `-1440-reduit.png`

- **Technique** : CSS pur (double fond `padding-box` / `border-box`, `@property` pour la variante qui tourne)
- **Poids** : démo 6,7 Ko, 6704 octets (`wc -c`) ; environ 2,7 Ko gzip (2675 octets avec `gzip -9 -c | wc -c`, à quelques octets près selon la version de gzip)
- **Inspiré de** : E3 (petite étiquette capitale au-dessus des titres, toutes les pages) dans `../motionsites-etude.md`. Code et textes écrits par nous.

## Licence

Code original Lance ton site, sans dépendance. Police de la démo : Inter Tight (Google Fonts), SIL Open Font License 1.1, chargée par la démo seulement ; elle ne fait pas partie de la recette.

## Quand l'utiliser

**Pas en surtitre de hero** : « pastille + grand titre » est le gabarit de hero interdit par `SKILL.md` (et signalé par le contrôle de design). La placer plutôt dans une carte d'offre, à côté d'un prix, sur une vignette de galerie, ou dans une liste de nouveautés. Elle annonce une nouveauté, un statut, une date : quatre mots au plus. Une seule pastille animée (`.tourne`) par écran.

## Brancher dans une maquette

1. Copier le bloc « à copier » du `<style>`, le HTML de l'élément et son `<script>` s'il en a un. Le bloc « Démo » ne sert qu'à la page d'exemple.
2. Remplacer les textes et images fictifs par ceux de `05-contenus/` et `06-medias/`.
3. Régler les variables ci-dessous sur le thème de la maquette (`07-maquette/prototype/theme.css`).
4. Vérifier avec `../verifier-elements.cjs` (0 erreur, captures 1440 et 375, mouvement réduit).

## Variables

| Variable | Défaut | Rôle |
|---|---|---|
| `--pastille-a / -b / -c` | `#ff9a62 / #ff5c8a / #b58cff` | couleurs du liseré (version sombre) |
| `--pastille-fond` | `#0b0b0d` | doit être la couleur exacte du fond de la section |
| `--pastille-eclat` | `#fff` (clair : `#6b4ce0`) | couleur de la lueur de la variante `.tourne` |

Version claire : `#e0572b / #c42f7a / #6b4ce0` sur `#fbf8f4`. La variante `.tourne` pose une lueur (dégradé conique, `@property --angle-pastille`) par-dessus le liseré plein. Elle fait trois tours en 9 s ; sa force (`@property --lueur-pastille`) monte de 0 à 100 % au début et redescend à 0 % à la fin. Avant, après et en mouvement réduit, il ne reste que le liseré complet.

Le texte d'une pastille ne doit jamais porter seul une information : un prix, une date ou un statut se répète dans la carte (« Liste d'attente ouverte » sous « Complet en juin »).

## Prompt pour le régénérer

> Écris une pastille CSS en capitales espacées avec un liseré d'un pixel en dégradé à trois couleurs, obtenu par deux fonds superposés (`padding-box` couleur du fond, `border-box` dégradé) et une bordure transparente. Variante où une lueur fait trois fois le tour du bord : un troisième fond conique en `border-box`, posé au-dessus du liseré plein, dont l'angle (`@property --angle`) tourne et dont la force (`@property --lueur`, en pourcentage) vaut 0 au repos, monte en début d'animation et redescend à la fin, pour qu'elle finisse toujours sur un liseré complet. Texte d'au moins 12 px. Couleurs et fond en variables, version sombre et version claire, animation coupée en mouvement réduit.

## Accessibilité

Texte de la pastille ≥ 4,5:1 sur son fond (crème sur noir, encre sur crème), au moins 12 px (`max(.72rem, 12px)`). En couleurs forcées, la pastille prend un contour `CanvasText` et son point reste visible (`CanvasText`). Le liseré est décoratif. Vérifié à l'œil sur les captures : le signalement « low-contrast » du hook est un faux positif (fond et liseré non résolus par l'analyse statique), exception déclarée dans `.impeccable/config.json`.

## Mouvement réduit

La variante `.tourne` reste immobile, liseré complet.

## Performance

Aucun coût notable. Aucune dépendance externe hors polices de la démo.
