# Ruban de soie

apercu: ruban-soie.html?apercu

Fond de hero · démo : [`ruban-soie.html`](ruban-soie.html) · captures : `captures/ruban-soie-1440.webp`, `-375.png`, `-1440-reduit.png`

- **Technique** : WebGL (un shader de fragment, aucune bibliothèque)
- **Poids** : démo 8 920 octets (3 958 octets gzip) ; le fond seul ≈ 2,5 Ko gzip
- **Inspiré de** : F1 de `../motionsites-etude.md` (vidéo « ribbon » de /backgrounds). Code et textes écrits par nous.
- **Licence** : code original Lancetonsite. Police de la démo : Inter Tight (SIL Open Font License).

## Quand l'utiliser

Hero clair et calme pour un service, un cabinet, une offre SaaS « propre ». Le ruban passe sous le texte, en bas du premier écran. Éviter sur un métier artisanal ou chaleureux : le rendu est technologique.

## Brancher dans une maquette

1. Copier la `<section class="hero">` (canvas ou calques + bouton pause), le bloc `<style>` et le `<script>` de la démo.
2. Remplacer les textes fictifs par ceux de `05-contenus/`.
3. Régler les variables ci-dessous sur les tokens du design system (`06-design-system/`).
4. Un seul fond animé par page, et seulement dans le hero ou l'appel final.

## Variables

| Variable | Défaut | Rôle |
|---|---|---|
| `--ruban-a` | `#6f86f0` | couleur principale du ruban |
| `--ruban-b` | `#c9a2f2` | seconde couleur, mélangée le long du ruban |
| `--ruban-fond` | `#f5f3fb` | fond clair (aussi utilisé par le repli CSS) |

Dans le shader : nombre de fils (`28`), hauteur du ruban (`base` : `-.2`, `-.3` en portrait), amplitude des ondes (`.13`, `.06`), vitesse (`t * .32`). Densité de pixels plafonnée à 1,5. En portrait (`port`), les ondes sont étirées (`p.x * 2.6`) et le ruban élargi pour garder son volume sur un écran étroit.

## Prompt pour le régénérer

> Écris un fond de hero en WebGL pur, sans bibliothèque : un ruban de soie fait d'une trentaine de fils très fins, presque parallèles, qui ondulent ensemble sur un fond clair. Chaque fil suit la somme de deux sinusoïdes de fréquences différentes ; l'écart entre les fils varie le long du ruban pour donner du volume. Couleur : mélange de deux couleurs passées en variables CSS, avec un léger reflet irisé. Le ruban passe dans le tiers bas de l'écran, sous le texte ; en portrait, étire les ondes horizontalement pour qu'il garde son volume. Densité de pixels plafonnée à 1,5. Un bouton visible met en pause ; l'animation s'arrête hors écran et onglet caché ; en mouvement réduit, une seule image fixe. Si WebGL manque, un dégradé CSS remplace le canvas.

## Accessibilité

Canvas `aria-hidden`. Texte sombre sur fond clair (contraste > 12:1 hors du ruban ; le ruban, translucide, ne descend pas sous 7:1 sous le chapô). Bouton pause de 44 px, libellé qui change (« Mettre en pause le fond » / « Relancer le fond »), focus visible.

## Mouvement réduit

Une image fixe (t = 6 s), rien ne tourne. Le bouton reste et permet de lancer l'animation si le visiteur le veut. Vérifié avec Playwright (`reducedMotion: "reduce"`) : deux captures à 1,2 s d'écart sont identiques.

## Performance

Le dessin ne tourne que si le hero est à l'écran, l'onglet visible et la lecture voulue (`IntersectionObserver`, `visibilitychange`). 28 fils, donc 28 sinusoïdes par pixel : léger. Densité de pixels plafonnée à 1,5. Aucune dépendance externe hors polices de la démo.
