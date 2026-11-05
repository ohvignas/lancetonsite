# Rideau déchiré

apercu: rideau-dechire.html?apercu

Élément · démo : [`rideau-dechire.html`](rideau-dechire.html) · captures : `captures/rideau-dechire-1440.webp`, `-375.png`, `-1440-reduit.png`

- **Technique** : `position: sticky` (photos empilées) + GSAP 3.15.0 ScrollTrigger (`onUpdate`, `getVelocity`) + `gsap.ticker` : `clip-path: polygon()` au bord déchiré dont l’amplitude baisse à l’arrivée et monte avec la vitesse
- **Poids** : démo 8576 octets (3546 gzip) + GSAP 3.15.0 + ScrollTrigger (jsdelivr, versions fixées ; ≈ 46 Ko gzip, déjà chargés si la page utilise `prototype/gestes.js`)
- **Inspiré de** : composant « Marble Scroll » de scrolltide.co (bibliothèque de prompts d’animations au défilement) (coutures qui se déchirent, plus fort quand on défile vite), vidéo d’aperçu publique. Version WebGL non reprise : ici un simple polygone. Prompt payant non consulté. Code, textes et réglages écrits par nous ; voir `../etude/scrolltide.md`.
- **Licence** : code Lancetonsite original (libre d’usage dans les maquettes du kit). GSAP 3.15.0 et ScrollTrigger sous licence Standard « no charge » de GreenSock/Webflow (usage commercial permis, voir `gsap-bonnes-pratiques.md` § 1 et https://gsap.com/standard-license). Photos de démo reprises de `../exemples/abonnement-sillon/images/` (générées pour le kit) : à remplacer par celles du client.

## Quand l’utiliser

Récit en 3 à 5 temps (jours, saisons, étapes d’un produit) porté par des photos fortes. Sans épinglage GSAP.

## Brancher dans une maquette

1. Copier le bloc « à copier » du `<style>`, le HTML de l’élément et son `<script>`. Le bloc « Démo » et les `[data-explication]` ne servent qu’à la page d’exemple.
2. Remplacer les textes et images fictifs par ceux de `05-contenus/` et `07-medias/`.
3. Régler les variables ci-dessous sur les tokens du design system (`06-design-system/`).
4. Si la page charge déjà `gestes.js`, ne pas recharger GSAP. Vérifier avec `../verifier-elements.cjs` (0 erreur, captures 1440 et 375, mouvement réduit).

## Variables

| Variable | Défaut | Rôle |
|---|---|---|
| amplitude | `9 * base + 14 * vitesse` (% de la hauteur) | force de la déchirure |
| `N` | `36` (`48` sous 640 px) | nombre de points du bord |
| graine | `7 + i * 13` | profil propre à chaque photo |
| `LISERE` | `drop-shadow(0 -1px 0 rgb(255 250 240 / .5))` | tranche claire du papier, sur le plan qui entre |

Profil du bord : sinusoïde (amplitude .3, fréquence .7 ; sous 640 px amplitude .18, fréquence 1,3 et bruit porté à .5, pour un bord irrégulier plutôt qu’en dents) + bruit à graine fixe, identique à chaque passage. La vitesse retombe de 10 % par image.

## Prompt pour le régénérer

> Écris un récit en photos plein écran empilées par `position: sticky` (chaque photo monte sur la précédente). Pendant qu’une photo entre (de `top bottom` à `top top`), son bord supérieur est déchiré : un `clip-path: polygon()` de 36 points (48 sur téléphone, ondulation réduite et bruit dominant), posé sur une « feuille » intérieure au plan collé, pendant que le plan lui-même porte un liseré clair d’un pixel (`filter: drop-shadow(0 -1px 0 rgb(255 250 240 / .5))`, seulement pendant la déchirure : un filtre sur l’élément découpé serait découpé avec lui) dont les hauteurs suivent un profil fixe (sinusoïde + bruit à graine) multiplié par une amplitude = 9 % × (1 − progression) + 14 % × vitesse de défilement normalisée (`ScrollTrigger.getVelocity`, qui retombe de 10 % par image). Un seul `gsap.ticker` redessine les photos en cours d’entrée. La photo dézoome de 1,18 à 1 et le mot du jour monte en fondu. Avec `gsap.matchMedia()` : en mouvement réduit, ni déchirure ni zoom, et les photos ne sont plus collantes. Dans les textes affichés, utilise les apostrophes typographiques (’), jamais l’apostrophe droite.

## Accessibilité

Chaque plan est un `article` avec son `h2` ; texte blanc sur voile radial (58 % au centre) + ombre portée. Légendes et alts fidèles à la photo (une cagette n’est pas un panier).

## Mouvement réduit

Photos à la suite (`position: relative`), bords droits, aucun zoom. Tout passe par `gsap.matchMedia("(prefers-reduced-motion: no-preference)")` : les ScrollTrigger et le ticker sont annulés d’eux-mêmes si la préférence change.

## Performance

`clip-path` réécrit seulement pour les plans en cours d’entrée (au plus deux) ; zoom en `transform`. Le ticker est retiré au nettoyage du `matchMedia`. `ScrollTrigger.refresh()` après le chargement des images.
