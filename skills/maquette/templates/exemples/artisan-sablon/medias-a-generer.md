# Sablon — médias à générer

Rien n'a été généré. La session principale lance la génération après accord de l'utilisateur, avec le coût estimé. En attendant, la page tourne avec des photos libres de Pexels, crédits dans `NOTES.md` § 5.

Ce qui manque le plus : **des pièces finies, servies à table en restaurant**. La séance de l'atelier montre surtout des pièces crues.

Chaque fichier ci-dessous **remplace un fichier existant, avec le même nom et le même ratio**. Le code n'a pas à changer, sauf pour la n° 3 (signalé dans sa ligne).

Pour chaque image :
- produire la grande taille ;
- en tirer la petite par réduction (`cwebp -q 78 -m 6`) ;
- viser moins de 250 Ko pour la grande et moins de 100 Ko pour la petite.

## Style commun (à coller en tête de chaque prompt)

> Documentary photograph, same shoot as a potter's workshop series in Dieulefit, Drôme, France. Soft diffuse daylight from a large north-facing window, no flash. Muted warm palette: off-white speckled stoneware, raw clay beige, dark grey slate, oak wood, a single touch of iron-oxide red. Plates are matte white stoneware with fine brown iron speckles and a slightly irregular hand-thrown rim, unglazed foot ring. 50 mm lens, eye level or slightly above, shallow depth of field, fine film grain. No text, no logos, no watermark, no cutlery brand, no glossy food-magazine styling, no people's faces in focus.

## Priorités

| # | Fichier(s) | Format | Place dans la page | Pourquoi |
|---|---|---|---|---|
| **1** | `images/hero-table-2400.webp` + `hero-table-1200.webp` | 2400 × 1600 (3:2) | Hero, grande image, cartel « Service Craie · Maison Ardoise, Lyon · 2025 » | Le hero promet la vaisselle des restaurants, mais montre des assiettes crues à l'atelier. Le texte alternatif actuel (« Assiettes plates en grès blanc du service Craie, sur une table en ardoise ») convient aux deux images. |
| **2** | `images/avis-salle-1000.webp` + `avis-salle-600.webp` | 1000 × 667 (3:2) | `#avis`, photo de la citation d'Inès Vallat (Maison Ardoise) | La photo actuelle vient d'une autre séance (Geovane Souza) : autre lumière, logo de set de table rogné. |
| **3** | `images/piece-plat-1000.webp` + `piece-plat-600.webp` | 1000 × 1250 (4:5) | `#pieces`, fiche « Plat Lavoir » | C'est la seule fiche du catalogue montrée crue. **Retouche des données :** dans `PIECES`, entrée `plat`, passer `etat` à `"Mat moucheté"` et `alt` à `"Plat rectangulaire en grès blanc moucheté, posé sur une table en chêne"`. |
| 4 | `images/piece-creuse-1000.webp` + `piece-creuse-600.webp` | 1000 × 1250 (4:5) | `#pieces`, fiche « Assiette creuse à aile » (état « En service ») | La photo actuelle vient de la même séance que la n° 2. On les régénère ensemble pour que tout le catalogue sorte d'une seule séance. |

Le budget porte sur quatre photos. Sur fal (FLUX 1.1 pro ou équivalent, environ 0,04 à 0,06 $ l'image), compter environ **0,40 $** en prévoyant une reprise par image. L'utilisateur valide avant tout lancement.

## Prompts

### 1 — Le service Craie en salle (`hero-table-2400.webp`, 3:2)

> [style commun] A restaurant table in Lyon during lunch service, tabletop of dark grey slate. Four matte white speckled stoneware dinner plates, 27 cm, set in two pairs, each plated with a simple seasonal bistro dish: roasted squash with brown butter and sage, a piece of white fish with leeks and a light sauce. A linen napkin, two plain water glasses, a small coupelle of salt. Seen from slightly above at a 35-degree angle, the plates filling the lower two thirds of the frame, the dining room softly blurred behind, warm window light from the left. Horizontal 3:2, leave calm space in the top right corner.

### 2 — En salle, Maison Ardoise (`avis-salle-1000.webp`, 3:2)

> [style commun] Inside a small bistronomic dining room at midday, a waiter's hand setting down a matte white speckled stoneware deep plate with a wide rim, filled with a braised dish in a glossy brown sauce, onto an oak table. Background: other tables with the same white stoneware, chairs, a chalkboard (illegible), soft blur. Focus on the plate rim and the speckles. Horizontal 3:2.

### 3 — Plat Lavoir (`piece-plat-1000.webp`, 4:5)

> [style commun] Product photograph of a single rectangular slab-built serving platter, 32 × 20 cm, matte white speckled stoneware, slightly raised soft edges, empty, lying on a light oak table against a plain warm off-white wall. Three-quarter view from above, the platter centred, lots of air around it. Vertical 4:5, same framing as a catalogue series.

### 4 — Assiette creuse à aile (`piece-creuse-1000.webp`, 4:5)

> [style commun] Product photograph of a single deep plate with a wide flat rim, 28 cm, matte white speckled stoneware, holding a small portion of braised beef in a brown sauce with a few herbs, on a light oak table against a plain warm off-white wall. Three-quarter view from above, the plate centred, lots of air around it. Vertical 4:5, same framing as prompt 3.

## Vidéo (en option, non demandée ici)

Une boucle muette de 6 s pourrait remplacer l'image fixe de `#ouvert` : mains qui centrent une motte sur le tour, au ralenti, même lumière. Il faudrait alors ajouter un `<video>` au code. Ce n'est pas prioritaire : la priorité reste les pièces servies.
