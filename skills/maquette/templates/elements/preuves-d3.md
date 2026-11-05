# Preuves chiffrées (D3)

apercu: preuves-d3.html?apercu

Élément · démo : [`preuves-d3.html`](preuves-d3.html) · captures : `captures/preuves-d3-1440.png`, `-375.png`, `-1440-reduit.png`

- **Technique** : D3 v7. Trois chiffres clés en tuiles, puis deux graphiques : une courbe « 2024 sans / 2025 avec » (12 mois, `curveLinear` avec un point par mois : des comptes mensuels ne se lissent pas) qui se trace par `stroke-dashoffset`, et des barres comparées par ligne de production qui poussent depuis zéro, décalées. Animation à la première entrée dans l'écran (`IntersectionObserver`). Axes sobres (grille claire, sans trait d'axe), étiquettes directes en bout de courbe et valeurs en bout de barre, légende, réticule et info-bulle au survol. Chaque graphique a son tableau de données dans un `<details>` repliable, rempli depuis les mêmes données.
- **Paquet** : `d3@7.9.2` (`dist/d3.min.js`).
- **Poids** : démo 17 501 octets (6 120 octets gzip). Bibliothèque : 281 Ko (93 Ko gzip) pour D3 complet ; avec un build, `d3-scale`, `d3-shape`, `d3-axis`, `d3-selection` et `d3-transition` suffisent.
- **Inspiré de** : méthode de la compétence `dataviz` (palette validée, marques fines, une seule échelle, table équivalente). Code, chiffres et textes inventés par nous.

## Licence

D3 : ISC, © 2010-2026 Mike Bostock — https://github.com/d3/d3/blob/main/LICENSE (vérifiée sur le dépôt le 5 novembre 2026). Licence permissive : impose seulement de conserver la mention de copyright et l'avis de licence dans les copies ; mention en en-tête de la démo.

## Quand l'utiliser

Page B2B ou de service qui doit prouver un résultat chiffré : avant / après, avec / sans nous. Deux graphiques au plus par section ; les chiffres doivent être réels et sourcés (la ligne « Source » est obligatoire).

## Brancher dans une maquette

1. Copier le `<script src>` de D3, le bloc « à copier », les deux `<figure class="graphe">` et le script.
2. Remplacer `MOIS`, `COURBE` et `BARRES` par les vraies données ; adapter les domaines (`[0, 18]`, `[0, 260]`) et les `aria-label` résumés.
3. Garder la source sous les graphiques.
4. Ne jamais écrire un chiffre clé à la main : la tuile « −60 % » est calculée depuis `COURBE` (somme 2025 / somme 2024) au chargement, et le tableau de la courbe porte une ligne Total. Si les données changent, la tuile suit. Faire de même pour toute autre tuile tirée des graphiques.

## Variables

| Variable | Défaut | Rôle |
|---|---|---|
| `--preuve-avec` | `#0b6fa4` | série « avec nous » |
| `--preuve-sans` | `#c0582b` | série « sans nous » |
| `--preuve-grille` | `#e2e6eb` | grille et bordures |
| `--preuve-axe` | `#4a5563` | texte des axes (≥ 4,5:1 sur blanc) |
| `--preuve-encre` | `#18212b` | titres, étiquettes, info-bulle |

La paire bleu / rouille passe le validateur de palette (clair : bande de luminance, chroma, séparation daltonisme ΔE 18, contraste ≥ 3:1). En thème sombre, reprendre des teintes plus claires et revalider.

## Prompt pour le régénérer

> Écris une section HTML autonome de preuves chiffrées avec D3 7.9.2 (UMD). Trois tuiles de chiffres clés en police à chasse fixe (le chiffre de baisse calculé en JS depuis les données de la courbe, jamais écrit à la main), puis deux graphiques en cartes blanches : une courbe sur 12 mois de deux séries « sans nous » et « avec nous » (même échelle, `curveLinear` et un petit point par mois, trait de 2,5 px, point et étiquette directe en bout de courbe, étiquettes d'axe en sans empattement 12 px, sur mobile un mois sur trois plus décembre, grille horizontale claire sans trait d'axe), et des barres horizontales comparées par catégorie, avec sous le titre la baisse totale en heures calculée en JS (« soit −63 % d'heures perdues », à côté du −60 % en nombre d'arrêts) (deux barres par groupe, petit écart, coins arrondis, valeur en bout de barre, en police sans empattement à chiffres tabulaires, espace fine insécable avant « h »). À la première entrée dans l'écran, la courbe se trace par `stroke-dashoffset` et les barres poussent depuis zéro, en décalé ; en mouvement réduit, état final directement. Réticule et info-bulle au survol de la courbe (placée sous la série basse pour ne pas couvrir la légende), info-bulle au survol des barres. Légende au-dessus de chaque graphique, `aria-label` résumé sur chaque SVG, et un tableau des données dans un `<details>` repliable sous chaque graphique, rempli depuis les mêmes tableaux JS, avec une ligne Total ; le `<summary>` garde un triangle visible. Couleurs : bleu `#0b6fa4` et rouille `#c0582b`, texte des axes `#4a5563`. Redessine au redimensionnement sans rejouer l'animation.

## Accessibilité

Chaque SVG est `role="img"` avec un résumé ; les données exactes sont dans les tableaux (vrais `<th scope="col">`), atteignables au clavier par le `<summary>` (44 px, focus visible, triangle ▸ redessiné puisque `display: flex` retire le marqueur natif, il pivote à l'ouverture). L'identité des séries n'est jamais portée par la couleur seule : légende plus étiquettes directes. Info-bulles décoratives (`aria-hidden`) : tout ce qu'elles disent est dans les tableaux.

## Mouvement réduit

Graphiques dessinés directement dans leur état final, aucune transition.

## Performance

Deux SVG légers ; animation une seule fois par graphique (`IntersectionObserver`) ; redessin seulement quand la largeur de fenêtre change. Le poids, c'est D3 (93 Ko gzip complet, environ 30 Ko avec les seuls modules utiles). Sans D3, les tableaux s'ouvrent automatiquement et les légendes se masquent.
