# Design system — {{NOM_DU_PROJET}}

> Étape 6 — mis à jour le {{DATE}} — statut : brouillon
> Traduit : 03-charte/charte.md — Construit pour : 04-architecture.md, 05-contenus/
> Fichiers : `tokens.json`, `tokens.css`, `demo.html`

## 1. Principes

{{3 à 5 principes, chacun relié à la marque. Ex. : « Le vide est assumé — la marque est
sobre (curseur 2/5). »}}

## 2. Style d'interface

**{{Style retenu}}** — {{pourquoi}}. Écartés : {{style}} ({{raison}}), {{style}} ({{raison}}).

**Composition : {{nom}}** (`commun/compositions.md`) — {{pourquoi, en une phrase reliée à
la cible et à la marque}}. Proposée en contraste : {{nom}}. Précédent projet : {{nom ou
inconnue}}.

## 3. Couleurs

| Token sémantique | Primitif | Valeur | Usage |
|---|---|---|---|
| `--color-bg` | | | fond de page |
| `--color-text` | | | texte courant |
| `--color-action` | | | **action principale uniquement** |

Contrastes : voir `demo.html`, section 1.

## 4. Typographie

| Token | Mobile | Desktop | Police / graisse | Interlignage |
|---|---|---|---|---|
| `--text-display` | | | | |
| `--text-h1` | | | | |
| `--text-body` | | | | |

## 5. Espacement, rayons, ombres

| Token | Valeur |
|---|---|

## 6. Mouvement

| Token | Valeur | Usage |
|---|---|---|
| `--primitive-duration-fast` | | survols |
| `--primitive-duration-slow` | | révélations |
| `--primitive-ease-out` | | entrées |

Noms tels que les produit `generate-tokens.cjs` : le chemin JSON donne le nom
(`primitive.duration.fast` → `--primitive-duration-fast`, `semantic.color.bg` →
`--color-bg`). Les gestes : voir le tableau ci-dessous.

| Geste | Où | Déclencheur | Durée / courbe | Mouvement réduit |
|---|---|---|---|---|
| {{révélation du titre}} | {{hero}} | {{chargement}} | | {{fondu}} |

Signature : {{description, où elle est utilisée, où elle ne l'est pas}}
`prefers-reduced-motion` : {{règle}}

## 7. Composants

### {{Composant}}
| Propriété | Repos | Survol | Focus | Actif | Désactivé | Chargement | Erreur |
|---|---|---|---|---|---|---|---|

Comportement mobile : {{}}

## 8. Images par composant

| Composant | Ratio | Largeur max affichée | Remarque |
|---|---|---|---|
| Hero | 16:9 (desktop), 4:5 (mobile) | | |
| Carte | 4:5 | | |

## 9. Règles de mise en page

{{grille, largeurs max, rythme vertical, place du vide}}

## 10. Critique

| Point relevé | Sévérité | Correction |
|---|---|---|

## 11. Pour l'IA qui construira le site

- Utiliser **uniquement** les tokens ; aucune valeur en dur.
- {{règles spécifiques}}
