# Titre entre les collines

apercu: titre-collines.html?apercu

Élément · démo : [`titre-collines.html`](titre-collines.html) · captures : `captures/titre-collines-1440.webp`, `-375.png`, `-1440-reduit.png`

- **Technique** : CSS (trois plans empilés : collines du fond en SVG, mot géant en HTML, colline de devant = aplat + semis irrégulier de fleurs et touffes en deux tuiles SVG, découpé par un `mask` SVG étiré) + 15 lignes de JS (parallaxe au défilement et au pointeur)
- **Poids** : démo 14,3 Ko (4,5 Ko gzip, dont 6 Ko pour les trois tuiles de fleurs en data URI), aucune dépendance
- **Inspiré de** : « Sagim », « Zayden », « Velora » et « Pivot » sur https://sceneai.art/landing-pages : le mot-marque géant est posé **derrière** le sujet (colline, statue, voiture). Voir `../etude/sceneai.md`. Code et textes écrits par nous, paysage dessiné en SVG.
- **Licence** : code et dessins originaux Lancetonsite. Polices Young Serif et Figtree : SIL Open Font License 1.1. Aucune image.

## Quand l'utiliser

Pépinière, vignoble, domaine, ferme, gîte, randonnée, marque de plein air : un nom court (5 à 8 lettres) qui devient le paysage. Le texte courant va sur la colline sombre, en bas.

## Brancher dans une maquette

1. Copier la `<section class="colline">` (les trois plans `.colline-loin`, `.colline-mot`, `.colline-devant`, plus nav et bas de hero), le bloc CSS et le `<script>`.
2. Le mot est le `<h1>` : il reste lu par les lecteurs d'écran.
3. Pour une autre crête, changer le chemin `d` dans `--crete` (viewBox 1440 × 520) et le même dans `.colline-loin` si besoin. Le masque est étiré (`100% 100%`) : la crête reste à la même hauteur relative à toutes les largeurs, et le motif de fleurs, lui, ne se déforme pas.

## Variables

| Variable | Défaut | Rôle |
|---|---|---|
| `--colline-ciel-haut` / `--colline-ciel-bas` | `#dcebf0` / `#eef3e2` | ciel du matin |
| `--colline-loin` | `#b9c99a` | collines du fond |
| `--colline-mot` | `#3f6b1f` | couleur du mot |
| `--colline-devant` | `#2f4d17` | colline de devant (fond du texte) |
| `--colline-fleur` | `#f4d24a` | jaune des fleurs, repris par le bouton |
| `--fleurs-a` / `--fleurs-b` / `--fleurs-c` | tuiles SVG 157×113, 211×149 et 241×173 | semis de fleurs (5 pétales, jaune, crème, mauve) et de touffes d’herbe ; tailles premières entre elles, décalages de 61×37 et 97×59 px ; la plus petite tuile ne porte que des touffes et de petites fleurs crème, pour que ses répétitions tous les 157 px ne dessinent pas de colonnes |
| `--crete` | chemin SVG | profil de la colline de devant ; redéfini sous 600 px avec une crête plus plate |

Réglages : `bottom: 47%` (45 % sous 600 px) et `translate: 0 .22em` sur `.colline-mot` (quelle part des lettres passe sous la crête), les amplitudes de parallaxe (`40px`, `220px`, `-60px`). La progression du défilement est rapportée à `innerHeight` (et non à la hauteur de la section) : l’enfoncement se voit dès qu’on a défilé un tiers d’écran. Sous 600 px : crête plus plate, collines du fond à 70 % de haut, colline de devant à 56 %, mot à 23vw et `bottom: 54%` : des collines de bocage, pas des pics, et la crête coupe le bas des lettres. Amplitude du mot `min(220px, 20svh)`. En aperçu (`?apercu`), la progression part de 0,22 : la vignette montre le mot déjà à demi enfoncé ; la démo garde aussi 60svh vides sous le hero (`.respiration`) pour pouvoir défiler. « Saint‑Herblain » porte un trait d’union insécable (U+2011). Le bas de la colline est assombri (voile vert jusqu’à 94 %) pour que le texte blanc reste lisible sur les fleurs.

## Prompt pour le régénérer

> Écris un hero de paysage où le nom de la marque, énorme (22vw, serif grasse non italique), est pris entre deux plans. Plan du fond : deux collines claires en SVG étiré. Plan du milieu : le `<h1>` centré, dont le bas des lettres descend sous la crête. Plan de devant : une colline sombre semée d’un **semis irrégulier** de petites fleurs à cinq pétales (jaune, crème, mauve) et de touffes d’herbe, dessinées dans deux tuiles SVG de tailles premières entre elles (157×113, 211×149, 241×173) et décalées, la plus petite sans grosses fleurs, pour qu’aucune grille ne se voie ; un voile vert assombrit le bas pour le texte. Cette colline est découpée par un `mask` SVG (`mask-size: 100% 100%`), avec une crête plus plate sous 600 px pour garder des collines douces et non des pics. Au défilement (progression rapportée à la hauteur de la fenêtre), le mot descend nettement plus vite que la colline et s’enfonce derrière ; au pointeur, les trois plans glissent un peu en parallaxe. Variables CSS pour toutes les couleurs. En mouvement réduit, plus aucune parallaxe.

## Accessibilité

Le mot géant est un vrai `<h1>`. Paysage en `aria-hidden`. Texte blanc sur la colline `#2f4d17` (contraste 10:1), bouton jaune `#f4d24a` à texte vert foncé (9:1). Liens de nav et bouton de 44 px minimum, focus visible. Rien ne bouge seul : pas de bouton pause nécessaire.

## Mouvement réduit

Les transformations sont neutralisées en CSS et le script n'écrit plus les variables. Vérifié avec Playwright : deux captures identiques.

## Performance

Une seule écriture de variables CSS par image, regroupée par `requestAnimationFrame`, et uniquement au défilement ou au pointeur (souris). Transformations composées par le GPU, pas de canvas.
