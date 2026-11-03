# Fiche de shooting et bloc de style

## Les 5 questions si la charte n'a pas de direction photo

1. Une photo que tu aimes (lien ou capture) — et ce qui te plaît dedans ?
2. Lumière : matin rasant / plein jour franc / fin de journée dorée / intérieur tamisé ?
3. Rendu : argentique avec grain / numérique net / noir et blanc / couleurs passées ?
4. Cadrage : très serré sur les matières / plans larges avec beaucoup d'air / mélange ?
5. Ce qu'on ne doit **jamais** voir (sourire publicitaire, fond blanc studio, personnes posées…) ?

## La fiche (à recopier dans la charte, rubrique « Direction photo »)

| Rubrique | Règle |
|---|---|
| Sujets | ce qu'on montre, ce qu'on ne montre pas |
| Lumière | source, heure, température |
| Optique | focale équivalente, profondeur de champ |
| Rendu | grain, saturation, contraste, étalonnage |
| Palette | 3 à 5 hex dominants |
| Cadrage | règles de composition, place du vide pour le texte |
| Formats | 16:9 hero, 4:5 cartes, 1:1 vignettes, 9:16 réseaux |
| Interdits | liste explicite |

## Le bloc de style (anglais, collé à la fin de chaque prompt)

```
STYLE: shot on 35mm film, Kodak Portra 400, natural grain, soft low-angle morning light
(5000K), shallow depth of field f/2.8, muted natural colors, slight warm cast.
PALETTE: dominant #D9CBB0 (sand), #2F3A3D (wet rock), accents #F4F1EA (foam).
COMPOSITION: generous negative space on the left third for text, horizon low.
AVOID: text, logos, watermarks, posed smiles, studio backdrop, glossy 3D render,
oversaturated colors, lens flare, HDR look.
```

Seules changent, d'une image à l'autre, les lignes « sujet » et « action » placées avant
ce bloc. Pour une série, passer en plus l'image maîtresse en référence.

## Prompt type

```
SUBJECT: close-up of a waxed longboard tail resting on wet sand, small foam trail.
ACTION: low tide, a wave retreating in the background, out of focus.
[STYLE…]
FORMAT: 4:5
```

## Ratios et tailles sources

| Usage | Ratio | Source à générer |
|---|---|---|
| Hero | 16:9 (desktop), 4:5 ou 9:16 (mobile) | 2560 × 1440 |
| Carte, article | 4:5 ou 3:2 | 1600 × 2000 |
| Vignette | 1:1 | 1200 × 1200 |
| Partage social (Open Graph) | 1.91:1 | 1200 × 630 |

Générer chaque ratio nativement quand la composition compte, plutôt que recadrer.
