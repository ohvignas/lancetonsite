# Vire — médias à générer

Rien n'a été généré (budget 0 €). La page tourne aujourd'hui avec :

- des **images dessinées en code** : le paysage WebGL (`paysage.js`), ses images fixes de repli (`images/plan-*`, `saison-*`, `refuge-dore-1400`) et les vues par la fenêtre des chambres (`images/vue-*`), toutes rendues par `outils/plans.html` + `outils/plans.cjs` ;
- trois **photos du repas reprises** d'autres exemples du plugin (crédits dans `NOTES.md` § 5 et dans le pied de page).

Chaque image à remplacer porte déjà `data-prompt` et `data-ratio` dans le HTML (ou dans `cretes.js` pour les chambres) : `python3 ../../prototype/generer-images.py index.html --style style.txt` les régénère d'un coup, **après accord de l'utilisateur sur le coût**.

Le paysage du hero et de la journée **ne se génère pas** : c'est le moment signature, en code. Les images `plan-*` restent les replis sans WebGL.

## Style commun (à coller en tête de chaque prompt)

> Documentary photograph, high-altitude mountain hut in the Belledonne range, French Alps, 2,140 m. Stone walls, stone-slab (lauze) roof, larch wood inside. Natural light only: low sun, valley mist below the ridges, a single warm lamp at night. Medium-format film look, fine grain, colours slightly muted: slate blue, snow white, larch honey, a touch of signal yellow. No text, no logos, no drone shot, no HDR, no people looking at the camera, no stock-photo smiles.

## Priorités

| # | Fichier(s) | Ratio | Place | Pourquoi |
|---|---|---|---|---|
| **1** | `images/gardiens-1400.webp` (+ `-800`) | 7:5 | `#gardiens`, remplace `refuge-dore-1400.webp` et le dessin SVG posé dessus | La section dit « Margaux et Bastien » et ne montre personne. Prompt dans `index.html` (`data-prompt` de `.gardiens-image img`). **Petite retouche** : retirer le `<svg class="refuge-dessin">` de la figure. |
| **2** | `images/chambre-dortoir-900.webp` | 9:11 | `#nuits`, carte « Les Bouquetins » | Les cartes montrent la vue par la fenêtre, jamais le lit : l'objection « on dort avec 14 inconnus ? » reste sans réponse. Remplace `vue-dortoir-900.webp` (champ `vue` dans `cretes.js`). |
| 3 | `images/chambre-six-900.webp` | 9:11 | carte « La Combe » | idem (`vue-six-900.webp`) |
| 4 | `images/chambre-quatre-900.webp` | 9:11 | carte « Le Lauzet » | idem (`vue-quatre-900.webp`) |
| 5 | `images/chambre-double-900.webp` | 9:11 | carte « La Vire » | idem (`vue-double-900.webp`) |
| 6 | `images/table-1200.webp` (+ `-640`), `miche-640.webp`, `plat-1000.webp` (+ `-600`) | 4:3, 4:5, 3:2 | `#table` | Les trois photos viennent d'autres exemples (une ferme nantaise, une boulangerie, un restaurant) : même lumière, pas le même lieu. |

Les prompts des chambres sont dans `cretes.js` (champ `prompt` de chaque chambre), ceux de la table dans `index.html`.

## Option, si le budget le permet

| Fichier | Ratio | Place | Note |
|---|---|---|---|
| `images/hiver-terrasse-1400.webp` | 16:9 | `#saisons`, côté hiver | Le dessin en code suffit ; une photo de raquettes posées contre le mur du refuge, neige fraîche, rendrait l'hiver plus concret. Prompt : « Snowshoes and poles leaning against the stone wall of a mountain hut, fresh snow, blue hour, a lit window, medium-format film. » |

Budget : 6 à 8 images. Sur fal ou OpenRouter (FLUX 1.1 pro ou équivalent, environ 0,04 à 0,06 $ l'image), compter **environ 0,50 $** avec une reprise par image. L'utilisateur valide avant tout lancement. Produire la grande taille, puis la petite par réduction (`cwebp -q 72 -m 6`, moins de 250 Ko pour la grande et moins de 100 Ko pour la petite).
