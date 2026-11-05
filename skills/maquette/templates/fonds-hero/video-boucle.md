# Vidéo en boucle

apercu: video-boucle.html?apercu

Fond de hero · démo : [`video-boucle.html`](video-boucle.html) · captures : `captures/video-boucle-1440.webp`, `-375.png`, `-1440-reduit.png`

- **Technique** : `<video>` + 35 lignes de JS (choix du fichier, chargement différé après `load`, pause hors écran)
- **Poids** : démo 7,5 Ko (3,2 Ko gzip ; 7517 et 3171 octets). La vidéo pèse ce qu'elle pèse : viser < 1,5 Mo en paysage (1920, H.264, 6 à 10 s, sans son) et < 600 Ko en portrait (9:16). L'exemple réutilise `exemples/b2c-brume` : `hero-1920.mp4` 329 Ko, `hero-916.mp4` 233 Ko, affiches 150 Ko et 61 Ko.
- **Inspiré de** : F9 de `../motionsites-etude.md` (presque toutes les cartes de motionsites.ai). Code et textes écrits par nous.
- **Licence** : code original Lancetonsite, libre d'usage, de modification et de revente sur les sites clients, sans attribution ; aucune bibliothèque tierce. Police de la démo (Inter Tight) : Google Fonts, SIL Open Font License 1.1.
- **Vidéo de démo** : générée pour l'exemple Brume (`exemples/b2c-brume/NOTES.md`, § 3, ligne 15) avec Kling 2.5 Turbo Pro via fal, image → vidéo de 5 s à partir de l'affiche (elle-même générée avec nano-banana-2), 4 novembre 2026, coût 0,35 $. Droits : ceux que donnent les conditions de fal et du modèle au compte qui a payé la génération (à relire avant toute livraison). Démo seulement : à régénérer pour chaque client, jamais à livrer telle quelle.
- **Média à remplacer** : dans cette vidéo (et son affiche), le porte-filtre V60 flotte au-dessus du verre, avec un vide où l'on voit le filet de café. Un V60 repose sur la tasse ou la carafe : un torréfacteur le voit tout de suite. Le défaut vient de la vidéo de Brume réutilisée, pas du composant. À régénérer : boucle de 6 à 8 s, 16:9 en 1920 × 1080 et 9:16 en 1080 × 1920, un V60 **posé** sur une carafe en verre sur un rebord de fenêtre marseillais, versement à la bouilloire col de cygne, vapeur ; environ 0,12 $ pour l'affiche + 2 × 0,35 $ pour les deux boucles. **Portrait (9:16)** : sur téléphone, le bloc de texte occupe la moitié basse de l'écran et recouvre le V60 de la vidéo actuelle ; le cadrage portrait doit placer le sujet (V60, carafe, filet de café) dans le tiers haut de l'image, avec la moitié basse calme (rebord, mur) pour porter le texte.

## Quand l'utiliser

Quand le métier se montre mieux qu'il ne se dessine : un geste, un lieu, une matière. Les vidéos viennent de l'étape 7 (médias) — générées (Seedance, Kling) ou filmées. **Aucun texte dans la vidéo** : titre et boutons restent du HTML.

## Brancher dans une maquette

1. Copier la `<section class="hero">` (la balise `<video>` avec ses quatre attributs `data-` et le bouton pause), les deux `<link rel="preload">` des affiches, le bloc `<style>` et le `<script>` de la démo.
2. Remplacer les textes fictifs par ceux de `05-contenus/`.
3. Régler les variables ci-dessous sur les tokens du design system (`06-design-system/`).
4. Un seul fond animé par page, et seulement dans le hero ou l'appel final.

## Variables

| Variable | Défaut | Rôle |
|---|---|---|
| `data-paysage / data-portrait` | `chemins .mp4` | deux fichiers, choisis selon la largeur (768 px) ; si l'écran passe de l'un à l'autre (rotation), l'affiche change et le bon fichier est rechargé |
| `data-affiche-paysage / -portrait` | `chemins .webp` | affiche montrée tout de suite et gardée en mouvement réduit |
| `--voile-haut / --voile-bas` | `rgb(14 10 8 / .15) / .85` | voile de lisibilité (plus un voile latéral côté texte) |

Le texte est en bas à gauche : le voile est plus sombre en bas et à gauche. Pour un texte centré, remplacer par un voile radial.

## Prompt pour le régénérer

> Écris un hero plein écran avec une vidéo de fond en boucle, muette, sans attribut `autoplay` : le script choisit le fichier paysage ou portrait selon la largeur (et change de fichier si la largeur franchit 768 px), pose l'affiche correspondante tout de suite (préchargée avec `fetchpriority=high`), ne touche pas au réseau avant l'événement `load` (un drapeau `pret` bloque aussi le premier rappel de l'`IntersectionObserver`, qui arrive souvent avant `load`), lance la vidéo seulement sans mouvement réduit, la met en pause hors écran et onglet caché. Un bouton « Mettre en pause la vidéo » apparaît quand la lecture démarre. Voile dégradé sombre côté texte (latéral sur ordinateur, vertical sur téléphone), surtitre en graisse 600 avec une ombre douce. Titre, texte et bouton en HTML par-dessus.

## Accessibilité

Vidéo décorative : `aria-hidden`, `tabindex=-1`, muette. Bouton pause (WCAG 2.2.2). Voile latéral à 0,78 → 0,45 sur ordinateur, voile vertical (0,66 à mi-hauteur, 0,9 en bas) sur téléphone. Contraste mesuré au pire cas (fond capturé sous le texte, centile 95) : surtitre 4,8:1 à 1440 et 8,3:1 à 375, titre 5,5:1 et 10,8:1, paragraphe 8,1:1 et 9,5:1. Refaire la mesure avec la vidéo du client, sur son image la plus claire, pas sur l'affiche seule.

## Mouvement réduit

La vidéo n'est jamais téléchargée : l'affiche reste. Le bouton n'apparaît pas tant que rien ne joue. Vérifié avec Playwright (`reducedMotion: "reduce"`) : deux captures à 1,2 s d'écart sont identiques.

## Performance

- Affiche préchargée (`<link rel="preload" … fetchpriority="high">`, une par format via `media`) : c'est elle que mesure le LCP.
- La vidéo n'est demandée qu'après l'événement `load` : mesuré à 1440 px, `load` à 553 ms, `hero-1920.mp4` demandé à 555 ms (avant la correction, la vidéo partait à 197 ms, avant `load`).
- Un seul fichier téléchargé, celui du format de l'écran ; aucun en mouvement réduit (vérifié : seule l'affiche est demandée).
- Lecture en pause hors écran (`IntersectionObserver`) et onglet caché (`visibilitychange`) ; le navigateur ne décode plus d'images.
- Pas de canvas ni de boucle JS : le coût est celui du décodage vidéo matériel. Aucune dépendance externe hors police de la démo.
