# Construire une palette

## D'où viennent les couleurs

Dans l'ordre de préférence :
1. **La matière du métier** : bois, néoprène, farine, cuir, béton, papier kraft.
2. **Le lieu** : roche, sable, ardoise, brique, végétation locale.
3. **Le positionnement** : ce qui distingue des concurrents (relever leurs couleurs à
   l'étape 1 et s'en écarter).
4. **L'existant** à conserver (notoriété).

Jamais : « la couleur tendance de l'année », un dégradé violet-bleu par défaut, un
bleu « confiance » choisi parce que c'est le choix sûr du secteur.

## Structure

| Rôle | Nombre | Usage |
|---|---|---|
| Principale | 1 | identité, grandes surfaces, liens |
| Secondaire | 0-1 | sections, illustrations |
| Accent | 0-1 | **une seule** chose : l'action principale |
| Neutres | 3-5 | fond, surfaces, texte, texte atténué, bordures |
| Fonctionnelles | 3 | succès, alerte, erreur (dans la gamme de la palette) |

Règle de répartition indicative : 60 % neutres, 30 % principale/secondaire, 10 % accent.

## Contrastes (WCAG 2.2)

| Usage | Minimum |
|---|---|
| Texte courant | 4,5:1 |
| Grand texte (≥ 24 px, ou ≥ 18,66 px gras) | 3:1 |
| Éléments d'interface, icônes porteuses de sens, contours de champs | 3:1 |

Vérifier toutes les paires réellement utilisées avec `scripts/contraste.py`. Ne jamais
transmettre une information par la couleur seule (ajouter icône ou texte).

## Mode sombre

Ne le faire que si la cible l'utilise vraiment ou si l'identité le porte. Ce n'est pas
un choix par défaut « parce que ça fait moderne ».

## Pour le print

Donner une approximation CMJN et signaler qu'un épreuvage chez l'imprimeur est
nécessaire ; pour une couleur clé, proposer une référence Pantone à vérifier sur
nuancier.
