# Sillon — médias à générer

Rien n'a été généré : la session principale lance tout, après accord de l'utilisateur. La page tourne aujourd'hui avec des photos libres (Unsplash, crédits dans `NOTES.md` § 5). Chaque fichier ci-dessous **remplace un fichier existant, même nom, même ratio** : aucune retouche du code, sauf la n° 6 (signalée).

Pour chaque image, produire la grande taille, puis la petite par réduction (`cwebp -q 72 -m 6`, < 250 Ko pour la grande, < 100 Ko pour la petite).

## Style commun (à coller en tête de chaque prompt)

> Documentary photograph for an organic market-garden farm near Nantes, France, early November. Overcast soft daylight, low sun breaking through at times, damp air. Natural colours slightly muted: rust, leek green, beetroot purple, kraft-paper beige, dark loam. Shot on a 35 mm lens at eye level, shallow depth of field, fine film grain, no flash. Real working people in worn work clothes, unposed, hands dirty. No text, no logos, no watermark, no plastic packaging, no blue tarps, nothing staged or glossy.

## Priorités

| # | Fichier(s) | Format | Place dans la page | Pourquoi |
|---|---|---|---|---|
| 1 | `images/claire-1200.webp` + `claire-640.webp` | 1200 × 1500 (4:5) | `#ferme`, portrait de gauche, légende « Claire Guérin · les semis, la fiche recette » | Aujourd'hui des mains sans visage : la demande « les personnes » n'est pas tenue sans elle |
| 2 | `images/mathieu-1200.webp` + `mathieu-640.webp` | 1200 × 1500 (4:5) | `#ferme`, portrait de droite, décalé vers le bas, « Mathieu Guérin · la récolte du lundi, les relais » | Idem ; doit sortir du même shooting que Claire |
| 3 | `images/champ-1600.webp` + `champ-800.webp` | 1600 × 1067 (3:2) | `#preuve`, grande photo à gauche de « Quatre hectares en bio, à 14 km de Nantes » | Le lieu : la photo actuelle est une vue de drone générique |
| 4 | `images/relais-1200.webp` + `relais-640.webp` | 1200 × 900 (4:3) | `#comment`, étape 2 « Retirez-le le mardi soir » | Le moment du retrait chez un commerçant, aujourd'hui un étal de marché |
| 5 | `images/ferme-1200.webp` + `ferme-640.webp` | 1200 × 1800 (2:3) | `#avis`, photo à gauche des témoignages | Lie les témoignages à la ferme ; l'actuelle est d'un autre auteur, autre lumière |
| 6 (option) | `images/carte-relais-1600.webp` | 1600 × 900 (16:9) | `#relais`, à la place de la carte SVG | Retour n° 9 : « les cartes sont des illustrations générées soignées ». **Demande une petite retouche** : passer le SVG en calque de points transparent au-dessus de l'image, et recaler les 11 points sur l'illustration |

Budget : 5 images photo + 1 illustration. Sur fal (FLUX 1.1 pro ou équivalent, ≈ 0,04 à 0,06 $ l'image), compter ≈ 0,40 $ avec une reprise par image ; l'utilisateur valide avant tout lancement.

## Prompts

### 1 — Claire (`claire-1200.webp`, 4:5)

> [style commun] Portrait of Claire, a French market gardener in her late thirties, standing between rows of winter leeks, holding a wooden crate of freshly pulled carrots against her hip. Brown hair tied back, rust-orange wool jumper with sleeves pushed up, olive work trousers, rubber boots. She looks slightly off camera, calm half-smile. Waist-up framing, subject on the left third, rows of leeks receding behind her, soft background blur. Vertical 4:5.

### 2 — Mathieu (`mathieu-1200.webp`, 4:5)

> [style commun] Portrait of Mathieu, a French market gardener in his early forties, in a field of beetroot at harvest, holding a bunch of beetroots with their purple-veined leaves in one hand. Short beard, dark green canvas jacket, grey cap, soil on his hands. Three-quarter view, looking at the vegetables, not at the camera. Waist-up framing, subject on the right third, a wooden harvest crate and a wheelbarrow softly blurred behind. Same farm, same morning light as Claire's portrait. Vertical 4:5.

### 3 — La ferme (`champ-1600.webp`, 3:2)

> [style commun] Wide view of a small 4-hectare organic market garden in the Loire valley near Nantes, seen from slightly above at field edge (a low hill or the top of a ladder). Long straight rows of leeks, cabbages, chard and squash plants, a few rows bare and freshly turned, a small unheated polytunnel and an old stone barn with a slate roof in the background, hedgerows and poplars on the horizon. Two tiny figures harvesting in the middle distance. Morning mist lifting. Horizontal 3:2.

### 4 — Le relais du mardi (`relais-1200.webp`, 4:3)

> [style commun] Tuesday early evening inside a small neighbourhood grocery in Nantes, warm shop light mixing with blue dusk from the window. On the counter, a row of identical kraft-paper vegetable bags and wooden crates, each with a handwritten paper tag (names unreadable). A customer in a raincoat picks up her bag from the grocer, seen from the side, faces partly turned away. Leeks and squash visible in the bags. Horizontal 4:3.

### 5 — Le panier de la semaine (`ferme-1200.webp`, 2:3)

> [style commun] Close, waist-down shot of a market gardener (same rust-orange jumper as Claire) carrying a wooden crate full of the week's vegetables towards the camera: a potimarron squash, carrots with their tops, two leeks, potatoes still dusty with soil, a few beetroots. Muddy farm path, hedgerow blurred behind. Vertical 2:3.

### 6 — Carte des relais (option, `carte-relais-1600.webp`, 16:9)

> Hand-painted illustrated map in a gouache and coloured-pencil style on warm kraft paper (#EFE7D8). Nantes seen from above, simplified: the Loire river crossing from left to right in muted blue-green, the Erdre river joining it from the north, the Île de Nantes in the middle. To the east, outside the city, a small farm with a stone barn and vegetable rows labelled nothing. Eleven small empty round markers in rust orange (#A3431A) spread over the city neighbourhoods, plus a thin dotted line from the farm to the city. Muted palette: rust, sapin green (#1F3326), kraft, ink brown (#1E1A14). No text, no street names, no legend, no compass. Flat top-down view, generous empty margins. Horizontal 16:9.
