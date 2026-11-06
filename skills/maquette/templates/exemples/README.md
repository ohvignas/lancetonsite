# Exemples de landing pages

Quatorze pages d'accueil, chacune pour un métier différent : huit pour les huit compositions de `commun/compositions.md` (à la racine du plugin), quatre autour d'un objet 3D, deux faites avec l'ancien parcours. Elles sont faites avec les gestes du kit (`../prototype/`) et servent de référence de niveau : ce qu'une maquette animée doit atteindre avant d'être présentée. On ne les copie pas telles quelles. On y regarde comment un geste est dosé, comment une section est construite, et ce qui a été corrigé d'un tour à l'autre (`NOTES.md` et `boucle-persona/` dans chaque dossier).

Tous les modèles sur une page : lancer `python3 -m http.server` dans `exemples/` puis ouvrir http://localhost:8000/

**Ce sont des exemples fictifs, sauf Kweeto.** Marques, personnes, adresses, chiffres, avis et prix sont inventés. **Kweeto n'est pas fictive** : c'est un projet réel de démonstration d'ILLITH, présenté en maquette (voir plus bas). Aucun formulaire n'envoie quoi que ce soit. Les photos sont provisoires : banques libres (Unsplash, Pexels) et images générées (FLUX.2 Pro), créditées dans le commentaire d'en-tête et le pied de chaque page.

## Ancien parcours direct, novembre 2026

Deux pages faites avec le parcours direct, retiré depuis (version 2.0.0). Leurs limites sont écrites ici et dans leur `NOTES.md`.

| Exemple | Métier | Composition | Client simulé |
|---|---|---|---|
| `agents-kweeto` (Kweeto) | agents IA pour PME. **Pas une marque fictive : projet réel de démonstration d'ILLITH, en maquette.** Offres et engagements à confirmer, logos fictifs | 7. Interface en démonstration, avec personnage vidéo Seedance dont seul l'iris suit la souris (`../prototype/personnage-vivant/`) | 70 puis 74 / 100, dernières corrections non renotées |
| `fleuriste-melisse` (Atelier Mélisse) | fleuriste à la Croix-Rousse, fictif. Créée par un agent suivant seul l'ancien `/lancetonsite:express`, en 25 min 30 s, pour environ 4,13 $ (estimé) | 1. Immersif plein écran | **aucun** : ni client simulé, ni essai à la main. 9 sections et environ 370 mots, sous les seuils agence |

## Les huit exemples

| Exemple | Métier | Composition | Client simulé |
|---|---|---|---|
| `b2c-brume` | torréfacteur à Marseille (B2C) | 1. Immersif plein écran | voir `NOTES.md` |
| `b2b-vigie` | maintenance prédictive pour PMI (B2B) | 2. Produit centré | voir `NOTES.md` |
| `liberal-calade` | atelier d'architecte dans le Vaucluse | 3. Éditorial magazine | 73 → 88 / 100 au tour 2, « Oui » |
| `festival-tole` | festival de concerts à Saint-Étienne | 4. Typographique brutaliste | 66 → 77 → 88 / 100 au tour 3, « Oui » |
| `abonnement-sillon` | panier bio d'une ferme près de Nantes | 5. Récit horizontal | 67 → 87 / 100 au tour 2, « Oui » |
| `artisan-sablon` | potier, vaisselle pour restaurants | 6. Galerie ou portfolio | 74 → 85 / 100 au tour 2, « Oui » |
| `logiciel-miroir` | réservation en ligne pour salons de coiffure | 7. Interface en démonstration | 81 → 89 / 100 au tour 2, « Oui » |
| `commerce-odette` | boulangerie au levain à Tours | 8. Artisanal ou carnet | 76 → 84 → 87 / 100 au tour 3, « Pas encore » ; son défaut bloquant (confirmation hors écran sur téléphone) est corrigé après le tour |

Toutes suivent la page complète de `commun/conventions.md` § 11 : 10 à 13 sections, 500 à 800 mots, 3 phrases au plus par bloc, plus de visuels que de texte, un catalogue ou des articles datés tirés d'un objet JavaScript (prêts à brancher sur un CMS), une navigation sans téléphone, un formulaire en deux colonnes sur ordinateur. Chacune est vérifiée à 1440, 1280, 768, 375 et 360 px.

## Les quatre exemples avec 3D (novembre 2026)

Quatre pages construites autour d'un objet 3D : Vire, Calorie et Pétille en Three.js (repli image si WebGL manque, scène fixe en mouvement réduit), Ciste en séquences d'images rendues dans Blender (aucun WebGL, image fixe face avant en mouvement réduit). Notes et corrections dans `NOTES.md` et `persona/` de chaque dossier.

| Exemple | Métier | Composition | Client simulé |
|---|---|---|---|
| `hebergement-cretes` (Vire) | refuge gardé à 2 140 m, Belledonne | 1. Immersif plein écran | 80 → 85 / 100 au tour 2, « Oui » |
| `artisan-calorie` (Calorie) | chauffagiste, pompes à chaleur en Provence | 7. Interface en démonstration (simulateur, maison en coupe) | 77 → 75 → 89 / 100 au tour 3, « Oui » |
| `b2c-petille` (Pétille) | produits ménagers rechargeables, flacon en Three.js qui suit la page | 1. Immersif, fil rouge 3D | 5 tours, sans note finale relevée |
| `commerce-flacon` (Ciste) | parfumerie artisanale à Grasse ; flacon, animations au défilement, gros plans, coffret et fioles rendus dans Blender (Cycles) | 2. Produit centré | 79 → 88 / 100 au tour 2, « Oui au stade maquette » (avant le passage à Blender) |

Médias provisoires : rendus depuis nos propres scènes (Blender pour Ciste), ou repris des autres exemples (crédités dans `NOTES.md`) ; aucune nouvelle génération payante. Les prompts des photos à produire sont dans `medias-a-generer.md` quand il y en a.

## Ouvrir un exemple

Passer par un petit serveur local, pas par `file://` (model-viewer, vidéos et séquences d'images en ont besoin) :

```
cd abonnement-sillon        # ou un autre dossier d'exemple
python3 -m http.server 8000
```

Puis ouvrir http://localhost:8000. À la racine du dépôt, `.claude/launch.json` déclare un aperçu par exemple (ports 4322 à 4333).

## Ce qu'on regarde dans chacun

- **Kweeto** : un personnage vidéo qui regarde la souris, puis les écrans du logiciel qui changent au défilement, et une page qui dit ce qui reste à confirmer.
- **Mélisse** : ce que donnait l'ancien chemin express seul en moins d'une demi-heure, scène épinglée comprise, et ce qu'il lui manque.
- **Brume** : une suite d'écrans pleins façon film, la vidéo du métier pilotée au défilement.
- **Vigie** : l'objet seul au centre, qui tourne, s'éclate et se transforme au défilement.
- **Calade** : une revue d'architecture. Couverture, sommaire qui s'ouvre, article avec fiche technique, honoraires publiés, journal de chantier daté. Aucun épinglage : la page se lit.
- **Tôle** : une phrase de cinq mots sur toute la largeur, la grille visible, la programmation en tableau typographique, trois couleurs d'encre.
- **Sillon** : quatre semaines de novembre racontées en récit épinglé, une bascule petit / grand panier reliée au prix et au formulaire, une carte illustrée des onze relais.
- **Sablon** : les pièces d'abord. Un mur d'images, un projet ouvert, un index des séries, un catalogue où l'on compose sa série d'essai.
- **Miroir** : l'agenda du salon tourne dès le premier écran (en HTML, jamais en capture), démo épinglée en trois moments, calculateur relié au tarif.
- **Odette** : un carnet de fournil. Matière annotée, ticket de fournée, étiquettes, photos posées de travers, commande avec retrait.

## Les premières versions

Les versions 1.4.2 de Brume et Vigie, notées 94 et 93 sur 100 par leurs personas, sont gardées dans `premieres-versions/`. On y regarde le dosage des gestes sur une page longue et l'avant / après. Voir `premieres-versions/README.md`. Escale (rendez-vous à quai pour entrepôts), remplacé par Miroir car jugé trop niche, est archivé hors du plugin.

## Ce qui est passé dans le kit

Les gestes génériques des exemples sont fusionnés dans `../prototype/gestes.js` et documentés dans `../prototype/GESTES.md`. Ce qui est propre à une marque reste dans son dossier. Chaque `gestes.js` d'exemple est une copie figée : ne pas la mettre à jour, elle documente l'état validé de la page.
