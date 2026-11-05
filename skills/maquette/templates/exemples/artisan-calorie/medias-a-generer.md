# Calorie — médias à générer

**Mise à jour du 5 nov. 2026 : les prompts 1, 3 et 4 (thomas, maison-giraud, chantier-joucas) sont générés (FLUX.2 Pro, 0,09 $), voir `NOTES.md` § 11.** Au départ, rien n'avait été généré (budget 0 €). La page tourne avec des photos réutilisées des exemples **Calade** (Luberon, pierre calcaire) et **Vigie** (portrait de technicien), cohérentes de lumière et de région, créditées dans le pied de page et `NOTES.md`. Chaque `<img>` porte déjà son `data-prompt` et son `data-ratio` : `python3 ../../prototype/generer-images.py index.html --style style.txt` les régénère d'un coup, après accord de l'utilisateur sur le coût.

Les deux visuels forts de la page **ne se génèrent pas** : la maison en coupe (Three.js) et le comparatif (D3) sont faits en code, comme l'interface du hero.

## Style commun (à coller en tête de chaque prompt)

> Documentary photograph, Pays d'Apt and Luberon, Provence, in winter. Low golden sun, long soft shadows, cold blue shade, a single warm interior glow. Limestone rubble walls, Roman tiles, wooden shutters in grey-blue. 35 mm lens, natural colours slightly desaturated, fine grain. No text, no logos, no brand names on the heat pump, no people looking at the camera, no stock-photo smiles.

## Priorités

| # | Fichier(s) à remplacer | Ratio | Place | Pourquoi |
|---|---|---|---|---|
| **1** | `images/thomas-480.webp`, `thomas-320.webp` | 4:5 | `#equipe` | La photo vient d'un atelier d'usinage (exemple Vigie). Il faut le chauffagiste devant une unité extérieure, au pied d'un mur de pierre. |
| **2** | `images/chantier-apt-*.webp` | 4:5 | `#etapes` | Une façade sans pompe à chaleur. Il faut la visite technique : un technicien qui mesure un radiateur en fonte. |
| **3** | `images/maison-giraud-*.webp` | 3:4 | hero (vignette) et `#avis` | Le mas n'a pas d'unité extérieure visible : en ajouter une, blanche, discrète, au pied du mur latéral. |
| 4 | `images/chantier-joucas-*`, `chantier-roussillon-*` | 4:3 | `#chantiers` | Montrer le chantier lui-même (unité posée, liaison en cave, ballon dans le garage), pas seulement la rue. |
| 5 | `images/sejour-tomettes-*` | 3:4 | `#avis` | Provisoire (soleil sur tomettes, sans appareil). Ajouter un radiateur en fonte ou un plancher sous tomettes, pour relier la photo à la citation. |

Coût estimé : 5 à 8 images × 0,04 à 0,06 $ (FLUX via fal ou OpenRouter), environ **0,50 $** avec une reprise par image. L'utilisateur valide avant tout lancement.

## Prompts (après le style commun)

1. `thomas` — « A 45-year-old heating engineer in a grey work jacket, three-quarter view, crouching to check the refrigerant connections of a white outdoor heat pump unit at the foot of a limestone wall, tablet in hand, winter afternoon light. »
2. `chantier-apt` — « Inside a village house in Apt, a technician in a grey jacket measures an old cast-iron radiator under a window, notebook on the sill, side light. »
3. `maison-giraud` — « A limestone mas in Gargas with grey-blue wooden shutters, a small white outdoor heat pump unit on a concrete plinth at the foot of the side wall, lavender border, low winter sun. »
4. `chantier-joucas` — « A small courtyard of a Luberon village house, a white heat pump unit on wall brackets next to a stone arch, copper lines going into the cellar. » — `chantier-roussillon` — « A heat pump water heater, 200 litre white cylinder, newly installed in a garage with ochre plaster walls, morning light. »
5. `sejour-tomettes` — « Vaulted living room of a converted barn in Bonnieux, terracotta floor tiles, a cast-iron radiator under the oak glazed door, winter evening glow. »
