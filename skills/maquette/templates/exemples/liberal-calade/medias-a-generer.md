# Calade — médias à générer

Rien n'a été généré par cette session. La page tourne avec des photos libres provisoires (crédits dans `NOTES.md` § 5).
Chaque fichier ci-dessous **remplace** un fichier existant : même nom, même taille, même ratio. Le code n'a rien à changer.
Exporter en webp (`cwebp -size` à la taille indiquée), puis passer l'étalonnage commun de la page :
`eq=saturation=0.8:contrast=1.03:gamma=1.04,colorbalance=rs=0.02:bs=-0.03:rh=0.02:bh=-0.02`.

**Style de shooting commun** (à coller en fin de chaque prompt) :
> Editorial architecture photography for a print magazine, Vaucluse, Provence. Local limestone rubble walls, lime render, Roman canal roof tiles, oak joinery. Soft low winter sun or bright overcast, raking light, no harsh shadows. Muted, slightly desaturated palette: limestone beige, lime white, pale sage, warm grey. 35 mm lens, eye level, natural perspective, matte print look, fine grain. No text, no logos, no watermark, no HDR, no oversaturated sky.

| Priorité | Fichier cible | Format | Emplacement | Pourquoi |
|---|---|---|---|---|
| 1 | `images/portrait-2000.webp` + `images/portrait-1000.webp` | 2000 × 1334 et 1000 × 667 (3:2), ≤ 200 Ko / ≤ 80 Ko | `#atelier`, portrait d'Hélène Garcin | La photo libre est devant un mur de schiste, pas de calcaire. C'est la faiblesse relevée à chaque tour persona. |
| 2 | `images/journal-chantier-900.webp` | 900 × 675 (4:3), ≤ 105 Ko | `#journal`, carte « Chantier en cours » (Saumane, semaine 14) | La photo libre est un chantier générique ; la carte doit montrer un vrai chantier de pierre du Vaucluse. |
| 3 | `images/methode-1000.webp` + `images/methode-600.webp` | 1000 × 1250 et 600 × 750 (4:5), ≤ 160 Ko / ≤ 65 Ko | `#methode`, à gauche des quatre étapes | La façade libre n'est pas située ; la légende promet « enduit à la chaux, volets d'origine repeints ». |

## Prompts

### 1 · portrait (priorité 1)
> Environmental portrait of a French woman architect in her mid fifties, short grey hair, linen shirt and dark wool cardigan, arms loosely crossed, calm confident half smile, standing in a half-restored Provençal farmhouse. Behind her: a wall of local pale limestone rubble with lime mortar joints, and an old oak post. She stands in the right half of the frame, the left half shows the stone wall and a window with soft light. Horizontal 3:2. + style commun.

### 2 · journal-chantier (priorité 2)
> Interior of a stone farmhouse room under restoration in the Vaucluse: exposed oak roof beams with Roman canal tiles seen from below, limestone rubble walls half covered with a fresh first coat of lime render, a small deep window with winter light, a mason's trestle, a bucket of lime and a trowel on the floor. Nobody in the frame. Horizontal 4:3. + style commun.

### 3 · méthode (priorité 3)
> Front of a restored village house in the Luberon after renovation: smooth pale ochre lime render, original wooden shutters repainted in soft grey-blue, a glazed front door, a wisteria trunk climbing the facade, a small wrought-iron railing, stone steps. Vertical 4:5, house fills the frame, slight upward angle. + style commun.

## Coût

3 images (4 fichiers après déclinaison des tailles). Modèle au choix de la session principale ; garder le même modèle pour les trois pour un même « tirage ».
