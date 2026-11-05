# Aurore maillée

apercu: aurore-maillee.html?apercu

Fond de hero · démo : [`aurore-maillee.html`](aurore-maillee.html) · captures : `captures/aurore-maillee-1440.webp`, `-375.png`, `-1440-reduit.png`

- **Technique** : CSS pur (4 taches en `radial-gradient` doux sans centre marqué, déplacées en `transform`, aucun filtre `blur`), papier de grand livre comptable en signature (lignes réglées, colonnes débit / crédit, double marge), grain SVG ; 10 lignes de JS pour la pause
- **Poids** : démo 8 418 octets (3 412 octets gzip)
- **Inspiré de** : F2 de `../motionsites-etude.md` (ciels et dégradés de /backgrounds). Code et textes écrits par nous.
- **Licence** : code original Lancetonsite. Police de la démo : Inter Tight (SIL Open Font License).

## Quand l'utiliser

Le fond « couleur » le plus léger : SaaS, finance, appli, lancement. Fond sombre, titre blanc centré. Changer les quatre couleurs suffit à l'adapter à une charte.

## Brancher dans une maquette

1. Copier la `<section class="hero">` (calques + bouton pause), le bloc `<style>` et le `<script>` de la démo.
2. Remplacer les textes fictifs par ceux de `05-contenus/`.
3. Régler les variables ci-dessous sur le thème de la maquette (`07-maquette/prototype/theme.css`).
4. Un seul fond animé par page, et seulement dans le hero ou l'appel final.

## Variables

| Variable | Défaut | Rôle |
|---|---|---|
| `--aurore-fond` | `#0b0d1a` | fond |
| `--aurore-1 … -4` | `#2f6bff, #7c4dff, #ff8a5c, #19d3c5` | les quatre taches |
| `--aurore-duree` | `26s` | durée d'une dérive (plus long = plus calme) |
| `--aurore-registre` | `.12` | opacité du papier comptable (`.registre`) ; 0 pour le retirer |

Taille et départ de chaque tache dans `.aurore i:nth-child(n)` ; couleur par `--c`. Douceur des bords : les arrêts du `radial-gradient` de `.aurore i` (30 % et 65 %). Opacité du grain (`.grain`, 0,18). Voile de lisibilité : `.hero::after`, plus large en portrait.

## Prompt pour le régénérer

> Écris un fond de hero en CSS pur : quatre grandes taches de couleur faites de `radial-gradient` déjà doux et sans centre visible (premier arrêt à 62 % de la couleur, dernier à 78 %) (pas de filtre `blur`, qui serait recalculé à chaque image), en mode de fusion `screen`, qui dérivent lentement par des `transform` animés (durées décalées pour ne jamais se synchroniser). Par-dessus, la signature du métier : un papier de grand livre comptable en dégradés CSS (lignes réglées tous les 2rem, deux colonnes débit / crédit, double marge couleur pêche), à 12 % d'opacité, fondu vers les bords. Puis un grain fin fait d'un `feTurbulence` SVG en data-URI, fixe, en `overlay`. Un voile radial sombre au centre, plus large en portrait, réglé pour que le chapô tienne 4,5:1 sur le pire pixel. Couleurs et durée en variables CSS. En mouvement réduit, `animation: none`. Un bouton pause met `animation-play-state: paused` ; l'animation s'arrête aussi hors écran.

## Accessibilité

Voile radial sombre sous le texte (élargi en portrait), chapô `#eef0fa` et surtitre `#e2e5f5` avec une ombre portée douce. Contraste mesuré dans Chrome sur le pire pixel du fond, texte masqué : chapô 7,6 à 10,4:1, surtitre 7 à 9,4:1, à 1440 et à 375, animé comme en mouvement réduit. Le blanc pur sur la tache pêche seule ne fait que 2,4:1 : ne jamais retirer le voile, et remesurer si on éclaircit les couleurs. Bouton pause visible (masqué en mouvement réduit, puisque rien ne bouge).

## Mouvement réduit

Les taches restent à leur position de départ : un dégradé fixe. Vérifié avec Playwright (`reducedMotion: "reduce"`) : deux captures à 1,2 s d'écart sont identiques.

## Performance

CSS seul. Les taches sont des dégradés radiaux peints une fois dans leur calque (`will-change: transform`) : l'animation ne fait que les déplacer, sans filtre de flou à recalculer à chaque image. Pause hors écran par `IntersectionObserver` (classe `hors-champ`) ; le navigateur suspend de lui-même les animations des onglets cachés. Pas de canvas. Aucune dépendance externe hors polices de la démo.
