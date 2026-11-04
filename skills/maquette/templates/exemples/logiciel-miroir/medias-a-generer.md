# Miroir — médias à générer

**Rien n'a été généré.** La page tourne aujourd'hui avec 8 photos libres d'Unsplash (crédits dans `NOTES.md` § 5). L'interface (agenda, téléphone, liste d'attente, bilan) est en HTML et ne doit **jamais** devenir une image.

Les photos libres ont trois défauts : logos SumUp floutés mais visibles en forme, deux scènes américaines (distributeur rouge, grande baie urbaine), et aucune photo de l'équipe (la photo « Qui fait Miroir » montre une coiffeuse inconnue). Les générations ci-dessous les remplacent **sans toucher au code** : même nom de fichier, même ratio, mêmes largeurs (encoder chaque image aux deux ou trois largeurs indiquées, en webp qualité 84).

## Style de shooting commun (à coller en tête de chaque prompt)

> Editorial documentary photograph for a French beauty-salon booking software. Small independent salon in Lyon, France: whitewashed walls, warm oak counter, terracotta and sage accents, natural window light from the side, late-afternoon warmth. Shot on a 35mm lens at f/2.8, gentle film grain, true-to-life skin texture, muted warm color grade (cream highlights, soft contrast, slightly desaturated greens). Real people of varied ages and origins, candid, not looking at the camera unless stated. No visible brand logos, no text, no watermarks, no phone screens with readable UI.

## Par priorité

| # | Fichier cible (code inchangé) | Format | Place dans la page | Pourquoi |
|---|---|---|---|---|
| 1 | `images/equipe-900.webp`, `images/equipe-1400.webp` | 3:2, 2100 × 1400 px | « Pensé par une coiffeuse, pas par une plateforme » | La section « qui on est » montre une inconnue : il faut Lucie et Karim |
| 2 | `images/salon-1200.webp`, `-1800`, `-2400` | 3:2, 2400 × 1600 px (recadré 21:9 sur ordinateur : sujet au centre vertical) | Grande photo de preuve, sous le hero | Remplace la caisse SumUp floutée ; donne le lieu |
| 3 | `images/temoin-1-600.webp`, `-900` | 4:5, 1200 × 1500 px | Témoignage de Camille Roux (Nantes) | Photo libre au comptoir SumUp |
| 4 | `images/journal-1-600.webp`, `-900` | 3:2, 1350 × 900 px | Article « Acompte : combien demander… » | Photo libre = caisse SumUp floutée |
| 5 | `images/temoin-2-600.webp`, `-900` | 4:5, 1200 × 1500 px | Témoignage de Sami Benali (barbier, Lille) | Photo libre correcte, à harmoniser au style commun |

Pas de vidéo : le hero est porté par l'agenda vivant en HTML, une vidéo y ferait concurrence.

### 1. Équipe — `equipe-*.webp` (3:2)

> [style commun] Two co-founders in the empty salon after closing time. On the left, Lucie, a French woman in her early forties, former hairdresser, short dark bob, black apron over a cream knit sweater, scissors pouch on her belt, leaning on the oak counter and laughing. On the right, Karim, a man in his mid-thirties, short beard, navy overshirt, holding an open laptop, half-sitting on a styling chair. A large round mirror on the white wall behind them, shelves of unbranded amber bottles, a dried eucalyptus bunch in a vase. Subjects placed in the left two-thirds of the frame, warm window light from the right, horizontal 3:2.

### 2. Salon — `salon-*.webp` (3:2, lu en 21:9 sur ordinateur)

> [style commun] Wide interior of a small Lyon hair salon at 6 pm, seen from the entrance. A curved oak reception counter in the foreground with a small unbranded white tablet stand and a ceramic bowl of hair clips; in the middle ground two styling stations with round mirrors, one hairdresser blow-drying a client's long hair; an arched doorway to the washing area at the back. Terracotta floor tiles, white walls, a sage-green velvet waiting bench. All key subjects within the central horizontal band so the image survives a 21:9 crop. Horizontal 3:2.

### 3. Témoignage Camille — `temoin-1-*.webp` (4:5)

> [style commun] Portrait of Camille, a French salon owner in her late thirties, auburn hair in a loose low bun, small gold hoops, black salon smock, standing behind her oak reception counter and smiling warmly toward someone just off-camera on the right. Shelves of unbranded terracotta and cream product bottles behind her, a paper appointment book closed beside a small unbranded tablet. Vertical 4:5, subject's face in the upper third.

### 4. Article acompte — `journal-1-*.webp` (3:2)

> [style commun] Close-up still life at a salon reception counter: a client's hand tapping a contactless bank card on a small unbranded white card reader, the hairdresser's hand with a silver ring holding a printed appointment card that says nothing readable. Oak counter, a sprig of dried lavender, soft bokeh of styling chairs behind. Horizontal 3:2, no logos.

### 5. Témoignage Sami — `temoin-2-*.webp` (4:5)

> [style commun] Sami, a barber in his early thirties of North African descent, neat fade haircut and trimmed beard, tattooed forearms, black barber apron, finishing a straight-razor shave on a relaxed client under a hot towel in a small Lille barbershop with dark green tiles and a vintage leather chair. Sami looks at his work, focused, slight smile. Vertical 4:5, warm tungsten light mixed with window light.

## Après génération

1. Encoder : `cwebp -q 84 -m 6 -resize <largeur> 0 source.png -o images/<nom>-<largeur>.webp` pour chaque largeur listée.
2. Mettre à jour les textes `alt` dans `index.html` (ils décrivent les photos libres actuelles) et les crédits du pied de page.
3. Retirer la mention « photo provisoire » seulement pour les photos remplacées.
