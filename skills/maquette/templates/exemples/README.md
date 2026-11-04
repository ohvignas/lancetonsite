# Exemples de landing pages

Deux pages d'accueil complètes, faites avec les gestes du kit (`../prototype/`). Elles servent de référence de niveau : ce qu'une maquette animée doit atteindre avant d'être présentée. On ne les copie pas telles quelles. On y regarde comment un geste est dosé, comment une section est construite, ce qui a été corrigé d'une itération à l'autre (voir `NOTES.md` dans chaque dossier).

**Deux compositions opposées.** Depuis la 1.5.0, chaque exemple est refait dans une composition de `commun/compositions.md` (à la racine du plugin), pour montrer qu'un même kit de gestes donne des pages qui ne se ressemblent pas :

| Exemple | Composition | Ce qu'il montre |
|---|---|---|
| `b2c-brume` | **Immersif plein écran** | une suite d'écrans pleins façon film, la vidéo du métier pilotée au défilement, peu de mots |
| `b2b-vigie` | **Produit centré** | l'objet seul au centre, qui tourne, s'éclate et se transforme au défilement |

Les deux tiennent dans le budget de texte de `commun/conventions.md` § 11 (7 à 9 sections, moins de 400 mots). Le détail des gestes et des itérations de chaque version est dans son `NOTES.md`.

**Les premières versions** (1.4.2), notées 94 et 93 sur 100 par leurs personas, sont gardées dans `premieres-versions/`. On y regarde le dosage des gestes sur une page longue et l'avant / après. On n'y copie ni la densité (1 194 et 1 543 mots, trois à quatre fois le budget) ni le hero, qui part du gabarit interdit par défaut. Voir `premieres-versions/README.md`.

**Ce sont des exemples fictifs.** Marques, personnes, adresses, chiffres, avis et prix sont inventés. Aucun formulaire n'envoie quoi que ce soit.

## Ouvrir un exemple

Passer par un petit serveur local, pas par `file://` (model-viewer et la séquence d'images en ont besoin) :

```
cd b2c-brume        # ou b2b-vigie
python3 -m http.server 8000
```

Puis ouvrir http://localhost:8000.

## b2c-brume — torréfacteur à Marseille (B2C)

Café de spécialité livré frais, ton chaleureux, lumière du Sud. Composition : **immersif plein écran**.

Ce qu'on y regarde : `NOTES.md` du dossier.

## b2b-vigie — maintenance prédictive pour PMI (B2B)

Métrologie industrielle : graphite, acier, un seul jaune de sécurité. Composition : **produit centré**.

Ce qu'on y regarde : `NOTES.md` du dossier.

## Ce qui est passé dans le kit

Les gestes génériques des deux exemples sont fusionnés dans `../prototype/gestes.js` et documentés dans `../prototype/GESTES.md`.
Ce qui est propre à une marque reste dans son dossier (en 1.4 : étiquette canvas de Brume, calculateur, tableau de bord et « écouter » de Vigie, carrousel de méthode mobile).
Chaque `gestes.js` d'exemple est une copie figée : ne pas la mettre à jour, elle documente l'état validé de la page.
