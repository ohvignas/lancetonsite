# Mise au point mot à mot

apercu: focus-mots.html?apercu

Élément · démo : [`focus-mots.html`](focus-mots.html) · captures : `captures/focus-mots-1440.webp`, `-375.png`, `-1440-reduit.png`

- **Technique** : GSAP 3.15.0 + ScrollTrigger : scène épinglée, quatre coins de viseur déplacés en `x`/`y` de mot en mot (positions mesurées par offset, recalculées au refresh), seuls les mots porteurs (`data-vise`) sont visés et deviennent nets en `filter: blur(0)` à l’arrivée du cadre
- **Poids** : démo 7798 octets (3232 gzip) + GSAP 3.15.0 + ScrollTrigger (jsdelivr, versions fixées ; ≈ 46 Ko gzip, déjà chargés si la page utilise `prototype/gestes.js`)
- **Inspiré de** : composant « Focus Reveal » de scrolltide.co (bibliothèque de prompts d’animations au défilement) (au survol chez eux, au défilement ici), vidéo d’aperçu publique. Prompt payant non consulté. Code, textes et réglages écrits par nous ; voir `../etude/scrolltide.md`.
- **Licence** : code Lancetonsite original (libre d’usage dans les maquettes du kit). GSAP 3.15.0 et ScrollTrigger sous licence Standard « no charge » de GreenSock/Webflow (usage commercial permis, voir `gsap-bonnes-pratiques.md` § 1 et https://gsap.com/standard-license). Aucune image. Polices Spectral et Commissioner (Google Fonts, SIL Open Font License).

## Quand l’utiliser

Une phrase-manifeste de 15 à 30 mots qu’on veut faire lire lentement, avec 4 à 7 mots porteurs à marquer `data-vise`. Compte comme un épinglage ; ne pas l’enchaîner avec `data-split-scrub`.

## Brancher dans une maquette

1. Copier le bloc « à copier » du `<style>`, le HTML de l’élément et son `<script>`. Le bloc « Démo » et les `[data-explication]` ne servent qu’à la page d’exemple.
2. Remplacer les textes et images fictifs par ceux de `05-contenus/` et `06-medias/`.
3. Régler les variables ci-dessous sur le thème de la maquette (`07-maquette/prototype/theme.css`).
4. Si la page charge déjà `gestes.js`, ne pas recharger GSAP. Vérifier avec `../verifier-elements.cjs` (0 erreur, captures 1440 et 375, mouvement réduit).

## Variables

| Variable | Défaut | Rôle |
|---|---|---|
| `--focus-fond` | `#1f2a33` | fond |
| `--focus-encre` | `#ece7dd` | texte |
| `--focus-cadre` | `#e0b25c` | coins du viseur |

25 % d’écran de défilement par cible (`data-vise`, 5 dans la démo : 125 % au total). Les autres mots restent à `blur(.06em)` (flou proportionnel au corps : ≈ 1,6 px en 375, 3,4 px en 1440) et opacité .7, lisibles dès le départ. Le cadre se tient .3 sur chaque cible après son arrivée. Une cible visée reste nette. À la fin, toute la phrase redevient nette et le cadre s’efface.

## Prompt pour le régénérer

> Écris une scène épinglée GSAP ScrollTrigger avec une phrase-manifeste en grand, découpée en mots (spans, espaces conservés). Seuls 4 à 7 mots porteurs, marqués `data-vise` dans le HTML (un groupe comme « deux siècles » compte pour une cible), reçoivent le viseur ; jamais les mots vides (de, à, la, et). Les autres mots restent légèrement flous (`blur(.06em)`, proportionnel au corps, opacité .7) mais lisibles dès le départ, sur téléphone comme sur ordinateur. Un cadre de viseur photo : quatre coins en L déplacés indépendamment en `x`/`y` pour épouser la boîte de la cible (mesurée par offsetLeft/Top, valeurs en fonctions et `invalidateOnRefresh`). Au défilement (25 % d’écran par cible), le cadre glisse en .6 et la cible devient nette sur les .35 dernières, pour que netteté et arrivée du cadre coïncident, puis le cadre se tient .3 sur la cible ; une cible visée reste nette. À la fin, toute la phrase redevient nette et le cadre disparaît. Avec `gsap.matchMedia()` : en mouvement réduit ou sans GSAP, phrase nette, pas de cadre, pas d’épinglage. N’utilise pas SplitText. Dans les textes affichés, utilise les apostrophes typographiques (’), jamais l’apostrophe droite.

## Accessibilité

La phrase reste un texte continu lu normalement ; le cadre est `aria-hidden`. Le flou n’existe que si le mouvement est permis.

## Mouvement réduit

Phrase nette, aucun cadre, aucun épinglage. Tout passe par `gsap.matchMedia("(prefers-reduced-motion: no-preference)")` : la classe d’état et les ScrollTrigger sont annulés d’eux-mêmes si la préférence change.

## Performance

`filter: blur()` sur une vingtaine de mots : acceptable, mais ne pas dépasser une trentaine. Coins en `transform`. `ScrollTrigger.refresh()` après le chargement des images.
