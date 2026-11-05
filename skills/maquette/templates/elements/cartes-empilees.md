# Cartes qui s’empilent

apercu: cartes-empilees.html?apercu

Élément · démo : [`cartes-empilees.html`](cartes-empilees.html) · captures : `captures/cartes-empilees-1440.png`, `-375.png`, `-1440-reduit.png`

- **Technique** : `position: sticky` + GSAP 3.15.0 ScrollTrigger (`scrub`) : la carte recouverte recule (`scale`) et se voile (`opacity`) pendant que la suivante monte
- **Poids** : démo 8155 octets (3302 gzip) + GSAP 3.15.0 + ScrollTrigger (jsdelivr, versions fixées ; ≈ 46 Ko gzip, déjà chargés si la page utilise `prototype/gestes.js`)
- **Inspiré de** : motif courant des pages d’offres ; idée confortée par les sections de scrolltide.co (bibliothèque de prompts d’animations au défilement) (aucun composant précis repris). Code, textes et réglages écrits par nous ; voir `../etude/scrolltide.md`.
- **Licence** : code Lancetonsite original (libre d’usage dans les maquettes du kit). GSAP 3.15.0 et ScrollTrigger sous licence Standard « no charge » de GreenSock/Webflow (usage commercial permis, voir `gsap-bonnes-pratiques.md` § 1 et https://gsap.com/standard-license). Photos de démo reprises de `../exemples/b2b-vigie/images/` (générées pour le kit) : à remplacer par celles du client.

## Quand l’utiliser

Offres, services, piliers d’une méthode : 3 à 5 cartes riches (texte + photo). Sans épinglage GSAP.

## Brancher dans une maquette

1. Copier le bloc « à copier » du `<style>`, le HTML de l’élément et son `<script>`. Le bloc « Démo » et les `[data-explication]` ne servent qu’à la page d’exemple.
2. Remplacer les textes et images fictifs par ceux de `05-contenus/` et `07-medias/`.
3. Régler les variables ci-dessous sur les tokens du design system (`06-design-system/`).
4. Si la page charge déjà `gestes.js`, ne pas recharger GSAP. Vérifier avec `../verifier-elements.cjs` (0 erreur, captures 1440 et 375, mouvement réduit).

## Variables

| Variable | Défaut | Rôle |
|---|---|---|
| `--pile-fond` | `#f4f6f8` | fond des cartes |
| `--pile-accent` | `#9a6700` | numéros et puces (5,1:1) |
| `--i` | 0, 1, 2… | décalage de la carte dans la pile (1,1 rem) |

Recul de 4 % par carte restante (plafonné à 3), voile à 40 %.

## Prompt pour le régénérer

> Écris une pile de cartes d’offre (texte à gauche, photo à droite ; photo au-dessus sur téléphone), chacune `position: sticky` avec un `top` qui augmente de 1,1 rem par carte. Avec GSAP ScrollTrigger en `scrub`, pendant que la carte suivante monte (de `top bottom` à `top 20%`), la carte du dessous recule (`scale` de 1 à 1 − 4 % par carte restante, sur son intérieur et jamais sur l’élément sticky) et un voile sombre passe à 40 %. Les puces se posent en bas de la colonne de texte (`grid-template-rows: auto auto 1fr`, liste en `align-self: end`) ; un nombre et son unité ne se coupent jamais (espace insécable : « 48 heures »). Avec `gsap.matchMedia()` : en mouvement réduit, les cartes ne sont plus collantes et se suivent comme une liste. Dans les textes affichés, utilise les apostrophes typographiques (’), jamais l’apostrophe droite.

## Accessibilité

Chaque carte est un `article` avec `h3` ; voile `aria-hidden` ; textes #3b434b sur #f4f6f8.

## Mouvement réduit

Liste de cartes, sans sticky, sans recul ni voile. Tout passe par `gsap.matchMedia("(prefers-reduced-motion: no-preference)")` : les ScrollTrigger sont annulés d’eux-mêmes si la préférence change.

## Performance

Seuls `transform` et `opacity` sont animés ; `transform-origin` en haut pour que la carte recule vers la pile. `ScrollTrigger.refresh()` après le chargement des images.
