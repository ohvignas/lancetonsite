# Rayons de lumière

apercu: rayons-lumiere.html?apercu

Fond · démo : [`rayons-lumiere.html`](rayons-lumiere.html) · captures : `captures/rayons-lumiere-1440.png`, `-375.png`, `-1440-reduit.png`, `-1440-sans-webgl.png`

- **Technique** : WebGL 1, un seul shader plein écran (angle autour d'une source placée au-dessus du cadre, trois familles de rayons en `pow(sin)` additionnées, halo et fondu vers le bas, grain contre les bandes). Repli CSS : halo radial et `repeating-conic-gradient` masqué.
- **Poids** : démo 10 027 octets (4 286 gzip) ; aucune bibliothèque, aucun média
- **Inspiré de** : fonds « light rays » et « planet » de la bibliothèque Jiro (https://jiro.build/components/background/light-rays-bg), qui sont des **vidéos MP4** ; nous les remplaçons par un shader de 4 Ko. Idée relevée seulement ; code et textes écrits par nous. Voir `../etude/jiro.md`.

## Licence

Code original écrit pour le plugin, libre d'usage dans les maquettes et les sites livrés. Aucune bibliothèque, aucun média tiers ; police Manrope (Google Fonts, SIL Open Font License 1.1).

## Quand l'utiliser

Hero de nuit : salle de spectacle, concert, festival, lancement de produit, lieu de culte ou de recueillement. À éviter pour l'astronomie : des faisceaux qui tombent du ciel évoquent la pollution lumineuse. Un seul fond animé par page. Sur un site clair, préférer `ruban-soie`.

## Brancher dans une maquette

1. Copier la `<section class="hero" data-fond="rayons">`, son `<style>` et son `<script>`.
2. Régler les quatre variables de `:root` sur les tokens.
3. Garder le voile `.hero::after` sous le texte ; vérifier avec `../verifier-elements.cjs` puis avec `SANS_WEBGL=1`.

## Variables

| Variable | Défaut | Rôle |
|---|---|---|
| `--rayons-fond` | `#07060f` | nuit |
| `--rayons-a` | `#8b7bff` | couleur des rayons loin de la source |
| `--rayons-b` | `#e5a3ff` | couleur près de la source |
| `--rayons-force` | `1` | intensité (0,6 discret, 1,4 éclatant) |

Couleurs en hexadécimal à six chiffres (lues par le script).

## Prompt pour le régénérer

> Écris un fond de hero WebGL 1 sans bibliothèque : un triangle plein écran et un fragment shader qui calcule, pour chaque pixel, l'angle par rapport à une source de lumière placée juste au-dessus du cadre ; additionne trois familles de rayons (`pow(0.5+0.5*sin(angle*k + t*v), n)` avec des fréquences et vitesses différentes), limite l'éventail à ±50°, ajoute un halo près de la source, fais mourir les rayons vers le bas et ajoute un grain d'1/255 contre les bandes. La source glisse doucement vers le curseur. Rendu aux trois quarts de la définition, densité plafonnée à 2. Bouton pause visible, arrêt hors écran et onglet caché, une image fixe en mouvement réduit, repli CSS (halo radial et dégradé conique répétitif) si WebGL manque. Couleurs en variables CSS.

## Accessibilité

Canvas `aria-hidden`. Voile radial sous le texte (renforcé sur mobile) : titre et chapô ≥ 7:1. Section reliée à son titre (`aria-labelledby="titre"`). Bouton pause de 44 px, libellé qui change (« Mettre en pause le fond » / « Relancer le fond »).

## Mouvement réduit

Une seule image, dessinée au chargement et au redimensionnement ; le bouton propose de relancer.

## Performance

Un seul passage de shader, sans texture. Rendu à 75 % de la définition (plafonnée à 2) : invisible sur un fond flou, presque moitié moins de pixels. Boucle arrêtée hors écran et onglet caché.
