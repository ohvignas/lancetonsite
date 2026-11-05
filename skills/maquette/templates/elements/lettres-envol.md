# Lettres qui s’envolent

apercu: lettres-envol.html?apercu

Élément · démo : [`lettres-envol.html`](lettres-envol.html) · captures : `captures/lettres-envol-1440.webp`, `-375.png`, `-1440-reduit.png`

- **Technique** : GSAP 3.15.0 + ScrollTrigger (scène épinglée, lettres découpées)
- **Poids** : démo 5,7 Ko (2,6 Ko gzip) + GSAP et ScrollTrigger depuis jsdelivr (≈ 70 Ko gzip, déjà chargés par `prototype/gestes.js`)
- **Inspiré de** : E9 (leçon « 3D scroll ») dans `../motionsites-etude.md`. Code et textes écrits par nous.
- **Licence** : code original Lancetonsite. GSAP et ScrollTrigger 3.15 : licence « Standard No Charge » de GreenSock/Webflow, usage gratuit y compris commercial (https://gsap.com/standard-license). Police Inter Tight : SIL Open Font License 1.1.

## Quand l'utiliser

Transition de récit entre deux promesses : « avant / après », « devis signé / place au chantier ». Une seule fois par page, entre deux sections denses, et elle compte dans la limite de trois épinglages du kit (`GESTES.md`).

## Brancher dans une maquette

1. Copier le bloc « à copier » du `<style>`, le HTML de l'élément et son `<script>` s'il en a un. Le bloc « Démo » ne sert qu'à la page d'exemple.
2. Remplacer les textes et images fictifs par ceux de `05-contenus/` et `07-medias/`.
3. Régler les variables ci-dessous sur les tokens du design system (`06-design-system/`).
4. Vérifier avec `../verifier-elements.cjs` (0 erreur, captures 1440 et 375, mouvement réduit).

## Variables

| Variable | Défaut | Rôle |
|---|---|---|
| `--envol-accent` | `#c9361a` | couleur du second titre (4,52:1 sur le fond #eceff2 de la démo) |

Épinglage sur `+=150%`, `scrub: .6`, `invalidateOnRefresh`. Typo : graisse 800, interlettrage `-.012em` (plus serré, les I et les T se collent à leurs voisines). Sous 600 px : `19vw` et un mot par ligne. Minutage (sur une durée de 1) : les lettres s’envolent de 0 à 1, leur opacité tombe à 0 avant 0,82, le second titre n’entre qu’à 0,9 : jamais les deux titres mêlés. Trajets en fraction de `innerWidth` / `innerHeight`. Trajectoires tirées une fois avec une graine fixe (`s = 3`) : le geste est identique à chaque passage.

## Prompt pour le régénérer

> Écris une scène GSAP ScrollTrigger épinglée sur un écran et demi : deux vrais titres `<h2>` superposés. Le premier, géant (graisse 800, interlettrage à peine négatif, −0,012 em), est découpé en lettres `aria-hidden` ; son texte complet reste dans un span visuellement masqué (pas d’`aria-label`). Chaque lettre s’envole vers le haut avec une rotation, du centre vers les bords, selon une trajectoire tirée au hasard mais figée par une graine et proportionnelle à la taille de l’écran ; leur opacité tombe à zéro avant la fin du trajet. Le second titre n’entre, lettre à lettre par le bas, qu’une fois le premier entièrement dispersé : jamais les deux mêlés. Sous 600 px : 19vw et un mot par ligne. Sans GSAP ou en mouvement réduit : les deux titres l’un sous l’autre, rien d’épinglé.

## Accessibilité

Les deux titres sont de vrais `<h2>`. Leur texte complet est dans un `<span class="sr">` visuellement masqué (lu par les lecteurs d’écran), les lettres découpées sont `aria-hidden` : « Place au chantier » est bien annoncé. Second titre : rouge #c9361a sur #eceff2, 4,52:1.

## Mouvement réduit

Aucun épinglage, aucune lettre ne bouge : classe `envol-statique`, les deux titres sont simplement empilés.

## Performance

Seuls `transform` et `opacity` sont animés. Si la page utilise déjà `gestes.js`, ne pas recharger GSAP. GSAP et ScrollTrigger 3.15.0 (versions fixées, jsdelivr).
