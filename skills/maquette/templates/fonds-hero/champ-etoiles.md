# Champ d'étoiles

apercu: champ-etoiles.html?apercu

Fond de hero · démo : [`champ-etoiles.html`](champ-etoiles.html) · captures : `captures/champ-etoiles-1440.webp`, `-375.png`, `-1440-reduit.png`

- **Technique** : Canvas 2D (500 points en 3D qui avancent vers la caméra)
- **Poids** : démo 7,8 Ko (3,4 Ko gzip ; 7829 et 3417 octets)
- **Inspiré de** : F7 de `../motionsites-etude.md` (catégorie « Space » de /backgrounds, « Mars Trips », « StellarMind »). Code et textes écrits par nous.
- **Licence** : code original Lancetonsite, libre d'usage, de modification et de revente sur les sites clients, sans attribution ; aucune bibliothèque tierce. Polices de la démo (Inter Tight, Young Serif) : Google Fonts, licence SIL Open Font License 1.1, libres pour un usage commercial.

## Quand l'utiliser

Astronomie, voyage, nuit, rêve, lancement. Vitesse basse par défaut : un ciel qui vit, pas un jeu vidéo. Nébuleuse en deux dégradés CSS derrière.

## Brancher dans une maquette

1. Copier la `<section class="hero">` (canvas ou calques + bouton pause), le bloc `<style>` et le `<script>` de la démo.
2. Remplacer les textes fictifs par ceux de `05-contenus/`.
3. Régler les variables ci-dessous sur les tokens du design system (`06-design-system/`).
4. Un seul fond animé par page, et seulement dans le hero ou l'appel final.

## Variables

| Variable | Défaut | Rôle |
|---|---|---|
| `--etoiles-fond` | `#03040a` | fond |
| `--etoiles-nebuleuse-a / -b` | `#3b1f5e / #0f3a5a` | les deux nuages de couleur |
| `--etoiles-nombre` | `500` | nombre d'étoiles |
| `--etoiles-vitesse` | `.06` | 0,02 = presque immobile ; 0,4 = hyperespace (à éviter) |

Parallaxe au curseur (`par.x * 40`), teintes (blanc, bleu pâle, ambre pâle), graine du tirage (`s = 7`) pour une image fixe identique d'une visite à l'autre.

## Prompt pour le régénérer

> Écris un fond de hero en canvas 2D (bouton pause sur fond opaque `rgb(10 10 20 / .7)`, lisible devant les étoiles) : 500 étoiles placées en 3D (x, y dans [-1, 1], profondeur z dans [0, 1]) qui avancent lentement vers la caméra et renaissent au fond. Taille et opacité croissent à l'approche ; quelques étoiles bleutées ou ambrées. Légère parallaxe opposée au curseur, lissée. Tirage pseudo-aléatoire à graine fixe. Derrière, deux nuages de couleur en dégradés radiaux CSS ; devant le canvas et derrière le texte, un voile de nuit radial (pseudo-élément) pour que les étoiles ne passent pas entre les lettres. Variables CSS pour couleurs, nombre et vitesse. Pause, arrêt hors écran, image fixe en mouvement réduit.

## Accessibilité

Un voile de nuit radial (pseudo-élément `::after`, 0,88 au centre, élargi sur téléphone) passe entre le canvas et le texte : les étoiles ne se glissent plus entre les lettres. Contraste mesuré au pire cas : titre 16:1 (1440) et 17,6:1 (375), paragraphe 12,9:1, surtitre 9,3:1. La vitesse basse évite l'effet de « tunnel » qui gêne les personnes sensibles au mouvement ; en mouvement réduit rien ne bouge.

## Mouvement réduit

Ciel fixe, toujours le même grâce à la graine. Vérifié avec Playwright (`reducedMotion: "reduce"`) : deux captures à 1,2 s d'écart sont identiques.

## Performance

Le dessin ne tourne que si le hero est à l'écran, l'onglet visible et la lecture voulue (`IntersectionObserver`, `visibilitychange`). Densité de pixels plafonnée. Aucune dépendance externe hors polices de la démo.
