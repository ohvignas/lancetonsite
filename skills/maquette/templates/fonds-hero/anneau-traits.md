# Anneau de traits

apercu: anneau-traits.html?apercu

Fond de hero · démo : [`anneau-traits.html`](anneau-traits.html) · captures : `captures/anneau-traits-1440.png`, `-375.png`, `-1440-reduit.png`

- **Technique** : Canvas 2D (300 traits radiaux)
- **Poids** : démo 6,6 Ko (2,9 Ko gzip ; 6613 et 2944 octets)
- **Inspiré de** : F8 de `../motionsites-etude.md` (« Verra Events Hero »). Code et textes écrits par nous.
- **Licence** : code original Lancetonsite, libre d'usage, de modification et de revente sur les sites clients, sans attribution ; aucune bibliothèque tierce. Polices de la démo (Inter Tight) : Google Fonts, licence SIL Open Font License 1.1, libres pour un usage commercial.

## Quand l'utiliser

Salle de concert, festival, podcast, studio son, conférence. Un mot très court au centre (« Concerts ») ; l'anneau l'encadre comme une onde. Une seule couleur chaude en dégradé.

## Brancher dans une maquette

1. Copier la `<section class="hero">` (canvas ou calques + bouton pause), le bloc `<style>` et le `<script>` de la démo.
2. Remplacer les textes fictifs par ceux de `05-contenus/`.
3. Régler les variables ci-dessous sur les tokens du design system (`06-design-system/`).
4. Un seul fond animé par page, et seulement dans le hero ou l'appel final.

## Variables

| Variable | Défaut | Rôle |
|---|---|---|
| `--anneau-fond` | `#0a0606` | fond |
| `--anneau-a` | `#ff3d2e` | couleur du bas |
| `--anneau-b` | `#ffb347` | couleur du haut |
| `--anneau-traits` | `300` | nombre de traits |

Rayon (`Math.min(L * .42, H * .36)`), longueur des traits (`.06 + .22 * onde`), les deux ondes (`a * 6 + t * 1.1`, `a * 13 - t * 1.7`), extinction vers le bas (`Math.pow(…, 1.5)`).

## Prompt pour le régénérer

> Écris un fond de hero en canvas 2D (texte : espaces insécables dans « 600 places » et « 19 h », `text-wrap: balance` sur le chapô) : un anneau centré fait de 300 traits fins partant du cercle vers l'extérieur. La longueur et l'épaisseur de chaque trait suivent deux ondes qui tournent en sens contraire autour de l'anneau, comme un spectre sonore. L'anneau est lumineux en haut et s'éteint vers le bas. Couleur : dégradé vertical entre deux variables CSS. Un mot très court au centre, en HTML. Sous 768 px, rayon `min(50 % de la largeur, 30 % de la hauteur)` et bloc de texte resserré pour qu'il tienne dans le cercle. Pause, arrêt hors écran, image fixe en mouvement réduit.

## Accessibilité

Mot central blanc sur fond noir (> 15:1). Les traits restent hors du texte : sur ordinateur le rayon vaut `min(42 % de la largeur, 36 % de la hauteur)` ; sous 768 px il passe à `min(50 % de la largeur, 30 % de la hauteur)` (les traits débordent un peu sur les côtés, c'est voulu) et le bloc de texte se resserre (`padding: 3rem 1.5rem`, paragraphe à 18rem) pour tenir dans le cercle. Contraste mesuré au pire cas à 375 px : surtitre 14:1, paragraphe 14,6:1.

## Mouvement réduit

Anneau figé à t = 1 s. Vérifié avec Playwright (`reducedMotion: "reduce"`) : deux captures à 1,2 s d'écart sont identiques.

## Performance

Le dessin ne tourne que si le hero est à l'écran, l'onglet visible et la lecture voulue (`IntersectionObserver`, `visibilitychange`). Densité de pixels plafonnée. Aucune dépendance externe hors polices de la démo.
