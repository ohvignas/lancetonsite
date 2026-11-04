# Modèle : design system

> Livrables : `projet-site/06-design-system/DESIGN.md`, `tokens.css` / `tokens.json`,
> `demo.html` · Étape 6 · Version courte : 6 min

## À quoi il sert

Il traduit la charte en règles d'interface prêtes à coder : des **tokens** (les valeurs
nommées), des **composants** avec tous leurs états et des règles de mouvement. Les design
systems publics (Material, Carbon, DSFR) s'organisent tous de la même façon :
fondamentaux, composants, modèles de pages. Le patron n'en lit qu'une page : la
démonstration, où il voit ses boutons, ses cartes et ses formulaires en vrai.

Lecteur : le patron (la démo) ; Claude aux étapes maquette et construction (le reste).

## Sommaire type de `DESIGN.md`

| # | Section | Contenu exact | Longueur | Forme |
|---|---|---|---|---|
| 1 | Parti pris | Style d'interface retenu, composition de page, 3 règles qui le distinguent | 5 lignes | Texte |
| 2 | Tokens primitifs | Toutes les valeurs brutes : couleurs (avec nuances), tailles, espacements, rayons, ombres, durées | 20 à 40 lignes | Bloc CSS |
| 3 | Tokens sémantiques | Ce que chaque valeur veut dire : `--texte-principal`, `--fond-accent`, `--bord-erreur` ; ils pointent vers les primitifs | 15 à 25 lignes | Tableau token / valeur / usage |
| 4 | Tokens de composants | Valeurs propres à un composant (`--bouton-rayon`) ; seulement si nécessaire | 5 à 10 lignes | Tableau |
| 5 | Typographie | Échelle reprise de la charte, en `rem`, avec `clamp()` pour le fluide | 8 lignes | Tableau + CSS |
| 6 | Espacement et grille | Échelle (4 ou 8 px), largeur maximale, colonnes, points de rupture | 6 lignes | Tableau |
| 7 | Mouvement | Durées, courbes, ce qui bouge et quand, règle « mouvement réduit » | 6 à 8 lignes | Tableau |
| 8 | Composants | Pour chacun : rôle, variantes, états (repos, survol, focus, actif, désactivé, chargement, erreur), règles d'accessibilité | 6 à 12 lignes par composant | Une fiche par composant |
| 9 | Accessibilité | Contrastes vérifiés, focus visible, cibles de 44 px, navigation clavier | 5 lignes | Liste à cocher |
| 10 | Interdits | Ce que ce design system refuse (dégradés gratuits, cartes identiques, ombres lourdes) | 5 lignes | Liste |

### Fiche composant (structure des pages composants des design systems publics)

```markdown
### Bouton
- Rôle : déclencher l'action principale ou secondaire.
- Variantes : principal · secondaire · lien.
- États : repos · survol · focus · actif · désactivé · chargement.
- Tokens : --bouton-fond, --bouton-texte, --bouton-rayon.
- À faire : un seul bouton principal par écran.
- À ne pas faire : deux boutons principaux côte à côte.
- Accessibilité : contraste ≥ 4,5:1, focus visible, cible ≥ 44 px.
```

### Les trois couches de tokens

```css
/* Primitifs : valeurs brutes, jamais utilisées directement dans les composants */
--encre-900: #1B2A41;
--signal-500: #E8590C; /* 3,6:1 sur blanc : grands textes et icônes seulement */
--signal-700: #C2410C; /* 5,2:1 sur blanc : texte blanc lisible dessus */
/* Sémantiques : le sens */
--texte-principal: var(--encre-900);
--action-fond: var(--signal-700);
/* Composants : seulement quand un composant s'écarte de la règle */
--bouton-fond: var(--action-fond);
```

## Ce qui le rend « niveau agence »

1. Trois couches de tokens ; aucun composant n'utilise une valeur HEX en dur.
2. Chaque composant de la démo montre tous ses états, focus clavier compris.
3. Les contrastes de chaque paire texte/fond sémantique sont calculés et notés.
4. La règle « mouvement réduit » (`prefers-reduced-motion`) est écrite et appliquée.
5. Les interdits sont écrits ; la démo ne contient aucun des tics « design généré »
   (dégradé violet, cartes identiques en grille de trois, icônes décoratives partout).

## Version courte (par défaut)

Temps : 6 min. Les primitifs viennent directement du nuancier et de l'échelle typo de la
charte : on les dérive, on ne les réinvente pas.

- **On garde** : parti pris, primitifs et sémantiques, typo, espacement, mouvement en
  4 lignes, 6 composants (bouton, lien, champ de formulaire, carte, en-tête, pied de
  page), `demo.html` d'une page.
- **On reporte** : tokens de composants, thème sombre, composants rares (onglets,
  carrousel, modale), documentation détaillée de chaque variante.

## Comment le publier

`DESIGN.md` en Markdown (artifact Docs ou fichier). `demo.html` en artifact HTML : c'est
le seul vrai visuel de l'étape, fait en code avec les tokens, jamais une image générée.

## Sources consultées

- Contentful, tokens primitifs, sémantiques et de composants :
  https://www.contentful.com/blog/design-token-system/
- Material Design 3, tokens : https://m3.material.io/foundations/design-tokens
- VA.gov Design System, types de tokens : https://design.va.gov/foundation/design-tokens/
- Système de Design de l'État (DSFR) : https://www.systeme-de-design.gouv.fr/
