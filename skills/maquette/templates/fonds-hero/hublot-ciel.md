# Hublot sur la mer de nuages

apercu: hublot-ciel.html?apercu

Fond de hero · démo : [`hublot-ciel.html`](hublot-ciel.html) · captures : `captures/hublot-ciel-1440.png`, `-375.png`, `-1440-reduit.png`

- **Technique** : Canvas 2D (ciel en dégradé, soleil, 4 nappes de nuages en bruit fractal fbm précalculées en textures qui bouclent sans couture, aile dessinée en bandes le long de la corde) + CSS (le hublot est un trou arrondi dont la paroi est une `box-shadow` géante ; `scale` piloté par une variable `--p`) + 15 lignes de JS pour le recul au défilement
- **Poids** : démo 18,3 Ko (7,0 Ko gzip ; 18322 et 6954 octets), aucune dépendance, aucune image
- **Inspiré de** : « Airlines Hero Section » sur https://sceneai.art/landing-pages (vidéo IA : la caméra recule d'un hublot d'avion au coucher du soleil). Voir `../etude/sceneai.md`. Code, dessin et textes écrits par nous, aucune vidéo.
- **Licence** : code original Lancetonsite, libre d'usage, de modification et de revente sur les sites clients, sans attribution ; aucune bibliothèque tierce (le bruit de valeur et le fbm sont écrits à la main). Police de la démo (Urbanist) : Google Fonts, SIL Open Font License 1.1.

## Quand l'utiliser

Agence de voyages, compagnie, conciergerie, assurance voyage, école de pilotage, tout métier « départ ». Le défilement raconte quelque chose : on est collé à la vitre, puis on recule dans la cabine. Une seule fois par page, en hero.

## Brancher dans une maquette

1. Copier la `<section class="hublot-scene">` (avec `.hublot-cadre`, le canvas, `.hublot-lumiere`, `.hublot-trou`, le contenu, le bouton pause), le bloc CSS « à copier » et le `<script>`.
2. La section fait `220svh` : le hero reste collé (`position: sticky`) pendant que le hublot se forme. Réduire à `160svh` pour un recul plus rapide. En mouvement réduit, la section reprend la hauteur d'un écran : rien de figé à faire défiler.
3. Le texte est remonté dans le haut du hublot (`margin-bottom: calc(var(--hublot-hauteur) * .3)`, `.12` sur téléphone) ; le script place l'horizon, le soleil et l'aile sous le bas du bloc de texte, quelle que soit sa longueur. Garder un texte court : surtitre, titre de 6 mots, une phrase, un bouton.
4. Couleurs du ciel, des nuages et de la paroi : variables ci-dessous, à caler sur `06-design-system/`.

## Variables

| Variable | Défaut | Rôle |
|---|---|---|
| `--hublot-haut` | `#2b1d4f` | ciel en haut, derrière le titre |
| `--hublot-milieu` | `#c4517a` | rose du couchant |
| `--hublot-bas` | `#f4a35c` | orange de l'horizon, couleur du soleil et de la brume lointaine |
| `--hublot-nuage` | `#ffd3c2` | crêtes des nuages éclairées par le soleil |
| `--hublot-paroi` | `#241a26` | paroi de la cabine et fond de page |
| `--hublot-hauteur` | `min(88svh, 124vw)` ; `min(88svh, 156vw)` sous 768 px | hauteur du hublot une fois le recul fini (format 3:4,3, et 3:4,8 sur téléphone pour loger le texte) |

Dans le JS : `NAPPES` (4 nappes : `base` = nombre de bosses sur la largeur, `brume` = voile vers l'orange de l'horizon, `ecrase` = aplatissement en perspective, `vitesse` en px/s, `haut` = position sous l'horizon), les teintes `mi` et `creux` des nuages, et le facteur de recul `* 2` dans `scale(calc(1 + (1 - var(--p)) * 2))`.

## Prompt pour le régénérer

> Écris un hero « vue depuis un hublot d'avion » au coucher du soleil. Derrière, un canvas 2D. Au chargement, calcule quatre textures de 512 × 160 px, une par nappe de nuages : un bruit de valeur fractal (fbm, 5 octaves) périodique en x pour que la texture boucle sans couture ; la densité vaut fbm moins un seuil plus une rampe verticale, ce qui donne des sommets bosselés et un dessous plein ; l'ombrage compare la densité du pixel à celle de trois points pris vers la lumière (en haut à droite) : crêtes éclairées en pêche clair, creux en violet, nappes lointaines voilées vers l'orange de l'horizon. À chaque image : dégradé de ciel violet → rose → orange calé sur le hublot, soleil en dégradé radial posé sur la mer de nuages, puis les quatre nappes, écrasées en perspective, de plus en plus grandes, sombres et rapides vers le premier plan, halo du soleil en mode `screen`, et une aile droite : emplanture hors champ en bas à gauche, extrados peint en bandes le long de la corde (bord d'attaque clair, bord de fuite sombre), reflet du couchant, lignes de volets, winglet relevé, feu de navigation vert. Par-dessus, le hublot : un élément au format 3:4,3 avec `border-radius: 46% / 33%`, dont la paroi est une `box-shadow` de 200vmax, deux liserés internes, une ombre intérieure et un reflet en biais sur le plexiglas. Le hero est `sticky` dans une section de 220svh ; au défilement, `--p` passe de 0 à 1 et fait passer le hublot de l'échelle 3 à 1. Texte blanc centré dans le haut du hublot, sur un voile vertical violet sombre peint dans le canvas (0,5 du haut du hublot jusqu'à 60 % de la hauteur du ciel, puis fondu à 0 sur l'horizon), sans disque visible ; le script place l'horizon sous le texte. Contraste du paragraphe ≥ 4,5:1 au pire cas. Bouton pause, arrêt hors écran et onglet caché ; en mouvement réduit : ciel figé, hublot directement à l'échelle 1, section d'un seul écran.

## Accessibilité

Canvas et hublot en `aria-hidden`. Le texte est posé dans le haut du ciel (violet), sur un voile vertical sombre peint dans le canvas (`rgb(34 14 44 / .5)` en haut, fondu à 0 sur l'horizon : pas de disque) ; l'horizon clair est toujours sous le bouton. Contraste mesuré au pire cas, sans l'ombre de texte (fond capturé sous chaque bloc, centile 95 de luminance), hublot formé et collé à la vitre : paragraphe 4,9:1 (1440) et 5,4:1 (375), titre 7,5:1 et 8,0:1, surtitre 7,8:1 et 9,5:1 (pendant le recul, valeurs plus hautes). Ombre de texte douce en plus sur surtitre et paragraphe ; `text-wrap: balance` et espaces insécables (« à Nantes », « le reste », « au retour »). Paragraphe en graisse 500. Bouton d'action blanc sur fond sombre. Bouton pause de 44 px avec libellé qui change (« Mettre en pause le ciel » / « Relancer le ciel »), focus visible.

## Mouvement réduit

Le ciel est dessiné une fois et ne bouge plus ; le recul au défilement est coupé (`--p` forcé à 1, `transform` neutralisé en CSS) et la section perd ses 220svh (`height: auto`, cadre en `position: relative`) : plus d'écran figé à faire défiler. Vérifié avec Playwright : deux captures à 1,2 s d'écart identiques, section haute d'un écran.

## Performance

- Textures des nuages calculées une seule fois au chargement : 4 × 512 × 160 pixels, environ 100 ms sur un portable récent (à prévoir 200 à 300 ms sur un téléphone d'entrée de gamme, avant la première image du ciel).
- À chaque image : un dégradé de ciel, le soleil, 8 à 12 `drawImage` des nappes (textures recollées bout à bout), un halo, l'aile (24 bandes, quelques traits). Aucune image chargée.
- Boucle `requestAnimationFrame` arrêtée hors écran (`IntersectionObserver` sur la section), onglet caché et en pause. Densité de pixels plafonnée à 2.
- Le défilement n'écrit qu'une variable CSS (pas de mise en page) ; la mise à l'échelle du hublot est une transformation composée par le GPU.
