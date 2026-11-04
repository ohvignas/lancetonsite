# Exemples de landing pages

Deux pages d'accueil complètes, faites avec le kit (`../prototype/`). Elles servent de référence de niveau : ce qu'une maquette animée doit atteindre avant d'être présentée. On ne les copie pas telles quelles. On y regarde comment un geste est dosé, comment une section est construite, ce qui a été corrigé d'une itération à l'autre (voir `NOTES.md` dans chaque dossier).

**Ce sont des exemples fictifs.** Marques, personnes, adresses, chiffres, avis et prix sont inventés. Aucun formulaire n'envoie quoi que ce soit.

## Ouvrir un exemple

Passer par un petit serveur local, pas par `file://` (model-viewer et la séquence d'images en ont besoin) :

```
cd b2c-brume        # ou b2b-vigie
python3 -m http.server 8000
```

Puis ouvrir http://localhost:8000.

## b2c-brume — torréfacteur à Marseille (B2C)

Café de spécialité livré frais, ton chaleureux, lumière du Sud.

- Hero vidéo plein cadre qui se resserre en carte (`data-hero-pin="shrink"`), entrée `data-intro`.
- Méthode en 4 étapes épinglées, avec une séquence de 61 images de torréfaction jouée au défilement.
- Gamme en galerie horizontale, sachet 3D (`model-viewer`) dont l'étiquette est dessinée en canvas (`etiquette.js`).
- Fond qui change de couleur au fil des sections (`data-bg`), prix en odomètre, barre d'action mobile.
- Tailwind compilé (`brume.src.css` → `brume.css`).

## b2b-vigie — maintenance prédictive pour PMI (B2B)

Métrologie industrielle : graphite, acier, un seul jaune de sécurité.

- Courbe de signature racontée au défilement (`data-trace`), télémétrie vivante (`data-live-jitter`), coût d'un arrêt qui court (`data-live-rate`).
- Méthode épinglée (empilée sur téléphone), capteur 3D qui tourne au défilement, tableau de bord en HTML/CSS.
- Liste de machines avec image calée dans la marge (`data-follow-list`), calculateur de retour sur investissement, formulaire de diagnostic validé côté page.
- Tailwind compilé (`css/vigie.css`).

## Ce qui est passé dans le kit

Les gestes génériques des deux exemples sont fusionnés dans `../prototype/gestes.js` et documentés dans `../prototype/GESTES.md`.
Ce qui reste propre à une marque reste ici : étiquette canvas de Brume, calculateur, tableau de bord et « écouter » de Vigie, carrousel de méthode mobile.
Chaque `gestes.js` d'exemple est une copie figée : ne pas la mettre à jour, elle documente l'état validé de la page.
