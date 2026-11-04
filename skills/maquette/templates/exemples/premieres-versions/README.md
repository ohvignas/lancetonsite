# Premières versions de Brume et Vigie

Les deux pages telles qu'elles ont été validées en 1.4.2, avant la refonte par
compositions de la 1.5.0. Gardées parce qu'elles sont réussies : persona Sofia Benali
94/100 pour Brume, persona Claire Vasseur 93/100 pour Vigie (« oui, ça vaut mes
25 000 € »).

## Ce qu'on y regarde

- **Le dosage des gestes** sur une page longue : séquence de torréfaction, sachet 3D à
  étiquette dessinée, fond qui change de couleur (Brume) ; courbe tracée au défilement,
  capteur 3D, calculateur de retour sur investissement, télémétrie vivante (Vigie).
- **Ce qu'une page complète doit contenir** quand le visiteur veut tout lire avant
  d'agir : offre détaillée, méthode, preuves, FAQ longue.
- **L'avant / après** avec `../b2c-brume` et `../b2b-vigie` : même marque, même kit de
  gestes, deux pages qui ne se ressemblent pas.

## Ce qu'on n'y copie pas

| | Brume v1 | Vigie v1 | Budget (`commun/conventions.md` § 11) |
|---|---|---|---|
| Mots visibles | 1 194 | 1 543 | moins de 400 |
| Sections | 12 | 13 | 7 à 9 |
| Écrans à 1440 × 900 | 18 | 18,8 | environ 10 |

- **La densité.** Les deux pages dépassent le budget de texte d'un facteur 3 à 4. Une
  page d'accueil neuve suit le budget ; le détail de ces versions (FAQ complète,
  méthode, tarifs) va sur des pages dédiées.
- **Le hero.** Les deux partent du gabarit que `commun/compositions.md` (règle 4)
  interdit comme structure par défaut : grand titre à gauche sur photo plein cadre,
  deux boutons, ligne de réassurance. Il tient ici parce que les moments signature
  plus bas le portent ; ce n'est pas un point de départ.

Chaque `gestes.js` est une copie figée de l'état validé : ne pas la mettre à jour. Le
détail des itérations est dans le `NOTES.md` de chaque dossier.

## Ouvrir

```
cd b2c-brume        # ou b2b-vigie
python3 -m http.server 8000
```

Puis http://localhost:8000. Exemples fictifs : marques, personnes, chiffres et avis
sont inventés, aucun formulaire n'envoie rien.
