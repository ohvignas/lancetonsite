# Tôle — médias à générer

Aucune génération lancée. La page tourne avec des photos Unsplash et une vidéo provisoire (montage de quatre de ces photos, voir NOTES.md § 5). Chaque fichier ci-dessous remplace un fichier existant **sous le même nom et au même ratio** : rien à retoucher dans le code.

**Après génération**, passer chaque image dans le traitement de la page : niveaux de gris, contraste 1,3, courbe en S, trichromie encre `#0E0E0C` (ombres) → minium `#EC4C26` (tons moyens) → papier `#E8E6E1` (lumières), grain fixe léger. La commande ffmpeg est dans NOTES.md § 5. Générer en couleur naturelle : la trichromie se fait après, pour toute la série.

**Style de prise de vue commun** (à coller en tête de chaque prompt) :

> Documentary concert photography inside a 19th-century French arms factory converted into a music venue: long brick and limestone halls, riveted steel roof trusses, raw concrete floor, industrial skylights. Shot on a 35 mm lens at night, available stage light only, haze in the air, strong backlight, deep blacks, visible film grain, no logos, no readable text, no recognizable faces in close-up, no celebrities. Realistic, unposed, slightly underexposed, as if shot by a festival photographer standing in the crowd.

## Priorité 1 — vidéo du hero

| | |
|---|---|
| Fichier | `video/hero.mp4` (et sa première image en `images/hero-affiche.webp`, 1920 × 1080, puis `images/hero-affiche-900.webp`, 900 × 1200, recadrée au centre) |
| Format | 16:9, 1920 × 1080 (1280 × 720 accepté), 8 à 12 s, **boucle sans raccord** (dernière image = première), muette, H.264, `+faststart`, moins de 3 Mo |
| Place | fond du premier écran, sous un voile encre à 52 % ; titre et repères par-dessus. Plan large : le bas du cadre (foule) et le centre (scène) restent lisibles une fois recadrés en portrait sur téléphone |
| Mouvement | très lent : travelling avant de 5 % au plus, la foule bouge, les projecteurs balaient. Pas de coupe, pas de zoom rapide |

Prompt :

> [style commun] Slow forward dolly shot from the middle of a dense crowd toward a stage at the far end of a vast factory hall. Hundreds of people from behind, arms raised, silhouetted against warm white stage lights and drifting haze. Above them, the full length of the hall: rows of riveted steel roof trusses and old skylights catching the light beams. Light beams sweep slowly left to right. The camera barely moves, perfectly steady. Seamless loop: the last frame matches the first. 16:9, 10 seconds, no audio.

## Priorité 2 — la halle vide (le lieu, le manifeste)

| | |
|---|---|
| Fichier | `images/halle-vide.webp` |
| Format | 4:3, 1200 × 900 (affichée en 16:9 sur ordinateur : garder le sujet dans la bande centrale) |
| Place | sous le manifeste « Pendant deux siècles, ces halles ont fabriqué des fusils », légende « Halle B, un matin de mars » |

> [style commun, mais de jour] Wide shot of an empty 19th-century factory hall in the morning, before setup: 100-meter-long nave, limestone and brick walls, cast-iron columns, riveted steel roof trusses, a row of skylights letting in pale light, polished concrete floor with old rail tracks. A single road case and a coiled cable in the distance give the scale. No people. Calm, monumental, slightly cold light.

## Priorité 3 — la foule dans la halle A (le public)

| | |
|---|---|
| Fichier | `images/public-1.webp` |
| Format | 3:2, 1200 × 800 |
| Place | grande image de la section « 11 800 festivaliers en 2026, la pluie dehors » |

> [style commun] Medium-wide shot from the middle of a packed crowd in a factory hall during a rap concert: many raised hands and phones, sweat and haze, the stage glowing white in the distance, the steel roof trusses visible above. Rain streaks visible through a high side window. Energetic, joyful, nobody facing the camera.

## Priorité 4 — la halle A avec sa scène (le lieu)

| | |
|---|---|
| Fichier | `images/halle-scene.webp` (1600 × 1000) et `images/halle-scene-900.webp` (900 × 563) |
| Format | 16:10 |
| Place | grande image « Halle A, 2 000 places » dans l'aplat minium |

> [style commun] Wide shot from the back of a factory hall turned into a concert venue: a large stage under a steel lighting truss, a band in silhouette, 2,000 people filling the concrete floor, the riveted roof trusses and brick side walls clearly readable. Symmetrical framing, the stage centered, the architecture as important as the show.

## Priorité 5 — la charpente sous la pluie (le lieu, la réponse à la pluie)

| | |
|---|---|
| Fichier | `images/halle-toit.webp` |
| Format | 4:5, 800 × 1000 |
| Place | « Halle C, 1 000 places, électro jusqu'à 5 h » |

> [style commun] Low-angle vertical shot looking up at the roof of a factory hall during an electronic music night: riveted steel trusses, corrugated metal roof, rain drops visible on a skylight, red and white light beams cutting through haze below. A few raised hands at the very bottom of the frame.

## Ce qui ne se génère pas

- Les photos d'artistes (`images/prog-1` à `prog-6`) : un vrai festival utilise les photos de presse des artistes, passées dans la même trichromie.
- Le tram (`images/tram.webp`) : une photo du réseau de transport, fournie par la régie.
- Budget : 5 médias (1 vidéo, 4 images). À chiffrer et à valider par la session principale avant tout lancement.

## Générées pour le FIX-16 du tour 2 (4 novembre 2026)

- `images/public-2.webp` (800 × 1000) : « [style commun] Low-angle view from inside the dry crowd, looking up at an old industrial glass roof held by riveted steel trusses. The glass panes are closed and intact; rain beads and streaks run across the OUTER surface of the glass… Nothing drips or falls inside… Lower third: dancing crowd in silhouette, dry. » Un premier essai faisait tomber la pluie dans la halle : écarté.
- `images/public-3.webp` (800 × 1000) : « [style commun] Two festival volunteers in plain dark vests, seen from the side and from behind, scanning wristbands of people in a queue with handheld scanners; the queue stretches back under the iron framework… »
