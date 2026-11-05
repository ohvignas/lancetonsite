# Verre liquide

apercu: verre-liquide.html?apercu

Élément · démo : [`verre-liquide.html`](verre-liquide.html) · captures : `captures/verre-liquide-1440.png`, `-375.png`, `-1440-reduit.png`

- **Technique** : CSS (`backdrop-filter`, masque de liseré) + 8 lignes de JS pour le reflet
- **Poids** : démo 7,7 Ko, 7733 octets (`wc -c`) ; environ 3,1 Ko gzip (3076 octets avec `gzip -9 -c | wc -c`, à quelques octets près selon la version de gzip) ; la recette seule tient en 29 lignes de CSS
- **Inspiré de** : E1 (verre des nav et boutons, leçons « animated website ») dans `../motionsites-etude.md`. Code et textes écrits par nous.

## Licence

Code original Lance ton site, sans dépendance. Police de la démo : Inter Tight (Google Fonts), SIL Open Font License 1.1, chargée par la démo seulement ; elle ne fait pas partie de la recette. Photo : `../exemples/b2c-brume/images/atelier-*.webp`, image de l'exemple torréfacteur du plugin, à remplacer par une photo du client.

## Quand l'utiliser

Barre de navigation, bouton secondaire ou carte de formulaire posés sur une photo ou un fond animé. Jamais sur un fond uni : sans rien derrière, le verre ne se voit pas. Deux ou trois surfaces de verre par écran au plus.

## Brancher dans une maquette

1. Copier le bloc « à copier » du `<style>`, le HTML de l'élément et son `<script>` s'il en a un. Le bloc « Démo » ne sert qu'à la page d'exemple.
2. Remplacer les textes et images fictifs par ceux de `05-contenus/` et `07-medias/`.
3. Régler les variables ci-dessous sur les tokens du design system (`06-design-system/`).
4. Vérifier avec `../verifier-elements.cjs` (0 erreur, captures 1440 et 375, mouvement réduit).
5. Sur téléphone (moins de 700 px), les liens de la barre de démo disparaissent sans remplacement : prendre le menu plein écran de [`nav-pilule`](nav-pilule.md).

## Variables

| Variable | Défaut | Rôle |
|---|---|---|
| `--verre-teinte` | `255 255 255` | teinte du verre (canaux RGB) |
| `--verre-opacite` | `.1` | 0,04 très clair, 0,2 plus dépoli |
| `--verre-flou` | `18px` | flou du fond |
| `--verre-rayon` | `22px` | arrondi (999px pour une pilule) |

Le reflet suit `--rx` / `--ry`, posés par le script au survol à la souris uniquement.

## Prompt pour le régénérer

> Écris une classe CSS `.verre` de verre dépoli « liquide » : fond en dégradé blanc très transparent, `backdrop-filter: blur() saturate(1.6)`, ombre interne en haut, liseré lumineux dégradé posé par un pseudo-élément masqué au seul bord (`mask-composite: exclude`), et un reflet radial qui suit le pointeur via deux variables CSS. Prévoir un repli opaque sans `backdrop-filter` et pour `prefers-reduced-transparency`, et un contour `CanvasText` en couleurs forcées (pseudo-éléments masqués). Teinte, opacité, flou et rayon en variables.

## Accessibilité

Le texte sur verre dépend de la photo derrière : la démo fonce la photo (voile 0,25 → 0,45, plus fort sur téléphone) pour garder le texte blanc au‑dessus de 4,5:1. À revérifier sur chaque photo réelle. Repli opaque pour « réduire la transparence » (`prefers-reduced-transparency`). En couleurs forcées, chaque surface de verre garde un contour `CanvasText` d'un pixel et le liseré et le reflet sont masqués. Focus visible : anneau blanc de 3 px sur les liens, boutons et champs. Les placeholders (« Votre prénom ») restent à 55 % d'opacité pour ne pas passer pour des valeurs saisies.

## Mouvement réduit

Rien ne bouge seul. Le reflet ne suit que la souris ; la transition d'opacité est courte (0,3 s).

## Performance

`backdrop-filter` coûte cher sur de grandes surfaces : le réserver à des barres et cartes, pas à des sections entières. Aucune dépendance externe hors polices de la démo.
