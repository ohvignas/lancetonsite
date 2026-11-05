# Catalogue filtré animé (Flip)

apercu: gsap-flip.html?apercu

Élément · démo : [`gsap-flip.html`](gsap-flip.html) · captures : `captures/gsap-flip-1440.webp`, `-375.png`, `-1440-reduit.png`

- **Technique** : GSAP 3.15.0 + Flip (`Flip.getState()` → changement du DOM → `Flip.from()`), boutons natifs `aria-pressed`
- **Poids** : démo 12,2 Ko (4,3 Ko gzip) + gsap 28,4 Ko et Flip 9,7 Ko gzip (≈ 38 Ko ; Flip n'est pas chargé par `gestes.js`)
- **Inspiré de** : skill officiel `gsap-plugins` (section Flip) de [greensock/gsap-skills](https://github.com/greensock/gsap-skills) et [doc Flip](https://gsap.com/docs/v3/Plugins/Flip). Code et textes écrits par nous ; photos : `exemples/commerce-odette/images/`.

## Licence

GSAP et Flip : [licence standard GSAP](https://gsap.com/standard-license) (Webflow). Gratuit, usage commercial compris ; interdit dans un outil visuel d'animation sans code concurrent de Webflow. Voir [`gsap-bonnes-pratiques.md`](gsap-bonnes-pratiques.md).

## Quand l'utiliser

Catalogue, carte de restaurant, réalisations, équipe : 6 à 30 cartes qu'on filtre par famille ou qu'on bascule grille ↔ liste. Au-delà de 40 cartes, filtrer sans animation (Flip mesure chaque carte).

## Brancher dans une maquette

1. Copier le bloc « à copier », la section `[data-catalogue]` et le `<script>`.
2. Une carte = `<li class="produit" data-famille="…">` ; un bouton = `data-filtre="…"` (même valeur). `data-vue="grille|liste"` pour la bascule.
3. Textes, prix et photos depuis `05-contenus/` et `06-medias/` ; variables sur `07-maquette/prototype/theme.css`.
4. Vérifier avec `../verifier-elements.cjs gsap-flip`.

## Variables

| Variable | Défaut | Rôle |
|---|---|---|
| `--cat-encre` | `#1f1b16` | texte, bouton actif |
| `--cat-papier` | `#ffffff` | fond des cartes et boutons (page : gris farine #e6e8e3) |
| `--cat-accent` | `#8a3a10` | prix, anneau de focus (6,6:1) |
| `--cat-filet` | `#cfd2cd` | bordures |
| `--cat-gris` | `#4f544f` | descriptions (8:1 sur blanc) |

Typo de la démo : Bricolage Grotesque (titres) et Public Sans. Espace insécable avant « % » (`64&nbsp;%`). Le nom du produit suit la photo : « Brioche moulée », la photo ne montre pas une tresse.

Flip : 0,6 s `power2.inOut` ; filtre en `absolute: true` (les sortants quittent la grille sans la tordre), vue avec `nested: true` et vignettes incluses ; `scale: false` pour ne pas étirer le texte. Entrées : opacité et échelle 0,92 → 1. Bascule de vue : le texte des cartes est caché pendant le vol (0 → 1 en 0,25 s à partir de 0,45 s), sinon la vignette qui rétrécit passe dessus et on lit des mots coupés. En liste à partir de 900 px, le prix se cale à droite de la ligne.

## Prompt pour le régénérer

> Écris un catalogue HTML de 9 cartes (photo, nom, prix, ligne de description) filtrable par famille et basculable grille ↔ liste, animé avec GSAP 3.15.0 et Flip : `Flip.getState()` des cartes, modification du DOM (attribut `hidden`, classe `en-liste`), puis `Flip.from()` en 0,6 s avec `onEnter` et `onLeave` en fondu et échelle 0,92. Filtre en `absolute: true` ; bascule de vue avec `nested: true` en incluant les vignettes, et le texte des cartes caché pendant le vol puis rendu en fondu. En liste large, prix calé à droite. Boutons natifs dans des `role="group"` avec `aria-pressed`, un `role="status"` qui annonce « 3 produits · viennoiseries ». Le filtre marche sans GSAP et en mouvement réduit, sans animation. Boutons cachés tant que le JS n'a pas tourné.

## Accessibilité

Boutons natifs (Tab, Entrée, Espace), `aria-pressed`, focus visible, 44 px. Le nombre de produits est annoncé par `role="status"`. Les cartes masquées ont l'attribut `hidden` : sorties du clavier et des lecteurs d'écran. Vérifié au clavier : Tab jusqu'à « Pains », Entrée → « 5 produits · pains », focus resté sur le bouton.

## Mouvement réduit

Le filtre et la bascule restent, la transition disparaît (changement sec). Sans GSAP : idem. Sans JS : tout le catalogue, sans boutons inertes.

## Performance

Flip anime par `transform` ; la bascule de vue anime aussi largeur et hauteur des cartes (`scale: false`), acceptable sur 9 à 30 cartes. Interrompre en plein vol fonctionne (`getState` relit l'état courant).
