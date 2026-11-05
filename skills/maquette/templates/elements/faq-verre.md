# FAQ en cartes de verre

apercu: faq-verre.html?apercu

Élément · démo : [`faq-verre.html`](faq-verre.html) · captures : `captures/faq-verre-1440.png`, `-375.png`, `-1440-reduit.png`

- **Technique** : HTML natif (`<details name>`) + CSS (`::details-content`, `interpolate-size`)
- **Poids** : démo 5,5 Ko (2,4 Ko gzip), aucun JS
- **Inspiré de** : E13 (« Halftone FAQ », /?prompt=solace-faq) dans `../motionsites-etude.md`. Code et textes écrits par nous.
- **Licence** : code original Lancetonsite. Police Inter Tight : SIL Open Font License 1.1. Aucune image (fond en dégradés CSS).

## Quand l'utiliser

Section FAQ ou objections avant l'appel final. Poser sur un fond travaillé (trame de points, `../fonds-hero/trame-points.html` en version immobile, ou dégradé) : le verre a besoin de quelque chose derrière.

## Brancher dans une maquette

1. Copier le bloc « à copier » du `<style>`, le HTML de l'élément et son `<script>` s'il en a un. Le bloc « Démo » ne sert qu'à la page d'exemple.
2. Remplacer les textes et images fictifs par ceux de `05-contenus/` et `07-medias/`.
3. Régler les variables ci-dessous sur les tokens du design system (`06-design-system/`).
4. Vérifier avec `../verifier-elements.cjs` (0 erreur, captures 1440 et 375, mouvement réduit).

## Variables

Pas de variable propre : le verre est réglé dans `.faq-verre details`. **Le verre n’existe que sur un fond qui bouge sous lui** : taches de couleur franches, photo floutée ou matière ; sur un fond presque uni, les cartes ne sont que des rectangles gris. `name="faq"` sur chaque `<details>` = une seule réponse ouverte à la fois, sans JS (Chrome 120+, Safari 17.2+, Firefox 130+ ; ailleurs plusieurs peuvent rester ouvertes, sans gêne). Les réponses peuvent aussi alimenter un balisage `FAQPage` (`schema.org`).

## Prompt pour le régénérer

> Écris une FAQ en accordéon natif `<details name="faq">` / `<summary>`, sans JavaScript : chaque question est une carte de verre dépoli sombre (fond blanc translucide, flou, liseré interne), un signe + qui tourne en × à l’ouverture, un contour de focus blanc **intérieur** (`outline-offset: -3px`) pour ne pas mordre sur la réponse ouverte, ouverture animée jusqu'à `height: auto` grâce à `interpolate-size: allow-keywords` et `::details-content` (ouverture sèche ailleurs). Posée sur un fond assez riche pour que le flou se voie : trois taches de couleur franches (opacité .35 à .55) et une trame de points de 1,6 px. Titre de section formulé comme une vraie étape (« Avant de commander »), pas « Vos questions, nos réponses » ; apostrophes typographiques et espace insécable avant « ? ». La réponse « Comment vous joindre ? » donne l’adresse et le numéro en liens cliquables (`mailto:`, `tel:`), soulignés et insécables. Repli opaque sans `backdrop-filter`, transitions coupées en mouvement réduit.

## Accessibilité

Éléments natifs : clavier (Tab, Entrée, Espace) et lecteurs d'écran sans travail. Résumés de 60 px de haut, focus visible. Texte #ddd6e6 sur verre foncé ≈ 12:1 (vérifié sur capture ; le signalement « low-contrast » du hook est un faux positif, exception déclarée).

## Mouvement réduit

Ouverture et rotation du signe sans transition.

## Performance

Aucun script. Le `backdrop-filter` ne couvre que les cartes. Aucune dépendance externe hors polices de la démo.
