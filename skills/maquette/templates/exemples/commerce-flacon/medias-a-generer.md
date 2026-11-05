# Ciste — médias à générer

Rien n'a été généré pour cet exemple (aucune dépense) : la session principale lance tout, après accord de l'utilisateur. La page tourne aujourd'hui avec :

- **les flacons, le coffret, les fioles et les gros plans rendus en code** depuis la scène three.js de la page (`outils/rendu.html` + `outils/rendre.cjs`) : rien à générer, on relance `node outils/rendre.cjs` si la scène change ;
- **l'orgue à parfums de l'atelier rendu en code** (`orgue-1344.webp`, `orgue-960.webp`) en attendant la vraie photo ;
- **trois photos reprises d'autres exemples** (crédits dans `NOTES.md` § 6), provisoires.

Chaque fichier ci-dessous **remplace un fichier existant, même nom, même ratio** : aucune retouche du code. Les balises concernées portent déjà `data-prompt` et `data-ratio`. Grande taille puis petite par réduction (`cwebp -q 78 -m 6`, < 250 Ko).

## Style commun (à coller en tête de chaque prompt)

> Documentary photograph for a small artisan perfumery in Grasse, French Riviera hinterland, late autumn. Soft north window light, pale limestone and lime-washed walls, oak, amber glass, linen. Muted mineral palette (pale grey-green stone, dark green, rust), the only bright touches are perfume colours. 35 mm lens, eye level, shallow depth of field, fine grain. Real people working, unposed. No text, no logos, no watermark, no luxury-ad gloss, no gold, no rose petals scattered.

## Priorités

| # | Fichier(s) | Ratio | Place | Prompt (après le style commun) |
|---|---|---|---|---|
| 1 | `images/orgue-1344.webp`, `orgue-960.webp` | 16:9 (1344×768) | bandeau de l'atelier, sous la carte en verre (bas gauche à garder calme) | Perfumer's organ upstairs in Grasse: curved tiers of small amber raw-material bottles, an oak work table with a precision scale, glass pipettes and paper blotters fanned in a glass, a perfumer's hands weighing a drop, tall arched window light. No spray bottles, no packaging. |
| 2 | `images/portrait-1000.webp` | 3:2 (1000×667) | portrait de Mireille Aubanel, section maison | Portrait of a French perfumer in her sixties, grey hair tied back, linen shirt, arms crossed, standing in front of a pale limestone wall in her workshop, calm half-smile, looking at camera. |
| 3 | `images/niche-700.webp` | 2:3 (700×1050) | niche, section maison | Lime-washed arched niche in an old stone perfumery, one green glazed jar and two small amber bottles, warm raking side light. |
| 4 | `images/rose-900.webp` (nouveau ; l'article montre aujourd'hui `fiole-rose.webp`) | 4:3 (900×675) | article « Cueillir la rose de mai » | Rose de mai (Rosa centifolia) harvest at dawn in a field near Grasse, hands picking pale pink blossoms into a linen sack, low mist, Préalpes hills behind. |
| 5 | `images/lumiere-700.webp` | 4:3 (700×525) | article « La lumière, première ennemie d'un flacon » | A single heavy glass perfume bottle with a dark green ceramic cap on a lime-washed shelf, half in a beam of low winter sun, half in shade. |

Coût estimé : 5 images FLUX.2 Pro ≈ 0,30 $. Pour le n° 4, changer aussi `image` dans `donnees.js`.

## Pas à générer

`flacon-*.webp`, `eclate-garrigue*.webp`, `coffret.webp`, `fiole-*.webp`, `gros-*.webp` (et l'orgue tant qu'il n'y a pas de photo) : rendus de la scène three.js, cohérents avec le flacon animé (même verre, même étiquette). Un vrai client fournirait ensuite des photos de son flacon pour le catalogue, au même cadrage (4:5, fond `#e3e5df`).
