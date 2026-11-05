# Horizon d'éclipse

apercu: horizon-eclipse.html?apercu

Fond de hero · démo : [`horizon-eclipse.html`](horizon-eclipse.html) · captures : `captures/horizon-eclipse-1440.png`, `-375.png`, `-1440-reduit.png`

- **Technique** : CSS pur (disques, `conic-gradient` masqué) ; 10 lignes de JS pour la pause
- **Poids** : démo 8 050 octets (3 022 octets gzip)
- **Inspiré de** : F3 de `../motionsites-etude.md` (« Sun Timeline », « Synthora », « Zapline »). Code et textes écrits par nous.
- **Licence** : code original Lancetonsite. Police de la démo : Inter Tight (SIL Open Font License).

## Quand l'utiliser

Lancement de produit tech, sécurité, finance, événement de nuit. Le bord de la planète cadre le bas de l'écran et pousse l'œil vers le titre. Une seule couleur de lueur.

## Brancher dans une maquette

1. Copier la `<section class="hero">` (calques + bouton pause), le bloc `<style>` et le `<script>` de la démo.
2. Remplacer les textes fictifs par ceux de `05-contenus/`.
3. Régler les variables ci-dessous sur les tokens du design system (`06-design-system/`).
4. Un seul fond animé par page, et seulement dans le hero ou l'appel final.

## Variables

| Variable | Défaut | Rôle |
|---|---|---|
| `--eclipse-fond` | `#05050a` | fond |
| `--eclipse-lueur` | `#8b5cf6` | couleur du halo (#ff7a1a = lever de soleil) |
| `--eclipse-bord` | `#e9ddff` | liseré le plus clair et reflet |
| `--eclipse-duree` | `9s` | respiration du halo ; le reflet met deux fois plus |
| `--eclipse-y` | `86%` (`72%` en portrait) | enfoncement de la planète : plus grand = arc plus bas |
| `--eclipse-largeur` | `max(150vw, 1400px)` (`max(150vw, 1000px)` en portrait) | diamètre de la planète : plus petit = arc plus courbe |

Le `.contenu` garde 21rem de marge basse : le bouton reste dans le ciel, au-dessus de la lueur (halo respirant entre 0,45 et 0,8 d'opacité). En portrait, le hero fait 88svh, le contenu part du haut (4,5rem) et l'arc remonte ; le haut de la planète s'éclaire de l'intérieur (ombre interne violette, « atmosphère ») pour que le bas ne soit pas un aplat noir. Si le titre passe à trois lignes, augmenter `--eclipse-y` plutôt que de laisser le bouton toucher l'arc. La pastille « Nouveau » est un simple libellé (point de couleur, pas de contour) : si elle doit mener quelque part, en faire un vrai lien.

## Prompt pour le régénérer

> Écris un fond de hero en CSS pur : en bas de l'écran, sous le bouton d'appel (jamais derrière lui), le haut d'un immense disque noir (planète vue de l'espace), dont le bord s'allume d'un liseré clair et d'une lueur colorée (ombres portées vers le haut). Derrière, un anneau de lumière qui respire (opacité animée). Sur le bord, un reflet qui glisse lentement : un `conic-gradient` masqué à un anneau très fin par un `radial-gradient`. Quelques étoiles fixes en dégradés radiaux d'un pixel. Couleurs et durée en variables CSS ; pause, arrêt hors écran, rien ne bouge en mouvement réduit.

## Accessibilité

Titre blanc sur noir (> 15:1). La lueur reste sous le texte. Note : le détecteur de design signale la lueur colorée (« dark-glow ») ; exception assumée pour ce fichier, c'est l'effet lui-même.

## Mouvement réduit

Halo à pleine opacité, reflet posé à mi-course, bouton pause masqué (la règle est déclarée après celle du bouton pour l'emporter). Vérifié avec Playwright (`reducedMotion: "reduce"`) : deux captures à 1,2 s d'écart sont identiques et le bouton n'apparaît pas.

## Performance

CSS seul : deux animations (`opacity` du halo, `transform` du reflet), composées par le GPU sans repeint. Pause hors écran par `IntersectionObserver` (classe `hors-champ`) ; le navigateur suspend de lui-même les animations des onglets cachés. Pas de canvas, donc pas de densité de pixels à plafonner. Aucune dépendance externe hors polices de la démo.
