# Lumière et rendu : du « rendu 3D » à la photo produit

La fonction `eclairage_produit()` de `lib3d.py` pose tout le schéma ci-dessous, mis à
l'échelle de l'objet. Elle a été réglée sur le flacon Ciste en 3 tours de boucle persona
(tours notés 54 → 67 → 68, puis tour 4 corrigé sur ses retours, non encore noté). Ce fichier dit pourquoi chaque pièce est là, pour l'adapter.

## Le schéma (photo de parfum, de cosmétique, de verre, d'objet laqué)

| Pièce | Où | Ce qu'elle fait | Réglage qui compte |
|---|---|---|---|
| 2 bandes arrière | côtés, derrière | bords clairs du verre | light linking : objet seul (sinon V clair sur le fond) |
| 2 bandes avant | côtés, devant, loin | les deux reflets verticaux du corps | reflet seul (en réfraction, barres dans le liquide) |
| strip haut | au-dessus, devant | ligne nette sur le bouchon et l'épaule | reflet seul |
| clé | devant à gauche, haut | ombre courte et douce, reflet rond | plancher du dégradé 0 (sinon reflet rectangulaire) |
| halo | au-dessus, tourné vers le fond | lueur derrière l'objet | fond seul, posé **au-dessus** (posé derrière, il n'éclaire pas le sol devant lui : ligne d'horizon) |
| débouché | derrière l'appareil | relève l'étiquette | invisible en reflet (sinon « fenêtre » au centre du bouchon) |
| drapeaux noirs | derrière et sur les côtés, hors champ | filets sombres qui dessinent les bords | **reflet seul** : en réfraction, le liquide fait loupe et les grossit en flancs noirs |
| bande noire basse | derrière le culot | fond de verre « lourd » | reflet seul |
| carte de contre-jour | derrière l'objet | allume le liquide, cœur lumineux | **limitée à la hauteur du liquide** ; dégradé, plancher 0,45 |
| cyclo | fond arrondi rayon 12, 240 points | aucune ligne d'horizon | AO dans le matériau : ombre de contact |

| cartes de remplissage | devant, basses | relèvent le bas du liquide | invisibles en reflet |
| cartes de flanc | sur les côtés, en retrait | flancs du liquide clairs | vues seulement **à travers** le liquide : par réfraction, les bords d'un cylindre regardent les côtés du studio |
| douche | spot au-dessus, derrière | caustique colorée au sol | faible ; visible surtout en grand format |

Toutes les sources sont des **softboxes en dégradé** (`softbox()`) : plan émissif avec un
point chaud au centre et des bords qui retombent, invisible pour l'appareil (même principe
que les textures de lumière des add-ons Light Wrangler et HDR Light Studio).

## Les erreurs rencontrées et leur cause

| Ce qu'on voit | Cause | Correction |
|---|---|---|
| Arc sombre dans le liquide | l'appareil voit la surface du liquide par-dessous | remplir jusqu'à l'épaule, appareil plus haut que le liquide |
| Bords noirs, dôme clair dans le liquide | film d'air entre verre et liquide | le liquide déborde dans le verre |
| Épaule vide toute blanche | la carte de contre-jour monte au-dessus du liquide | carte limitée à la hauteur du liquide |
| Culot blanc brûlé | carte et douche passent par le fond épais | carte au-dessus du culot, douche au sol, verre plus absorbant |
| Liquide « crème » plat | carte en aplat | dégradé avec point chaud |
| Flancs du liquide noirs | drapeaux vus en réfraction, puis côtés du studio vides vus par réfraction | drapeaux en reflet seul ; cartes de flanc (`force_flancs`) |
| Jus foncé qui vire au gris ou au mauve | Cycles absorbe `(1 − couleur) × densité` : une couleur sombre absorbe presque pareil sur R, V, B | `liquide()` calcule l'absorption par canal (`-ln(couleur) / épaisseur`) |
| Noyau sombre « en porte » au centre du liquide ; étiquette du dos vue petite et sans teinte | normales du liquide tournées vers l'intérieur : Cycles le traite comme une lentille divergente | `normales_dehors(liquide)` après `tourner()` (contrôle : volume signé > 0) |
| Dos de l'étiquette sombre, vu comme un cadre vide, flacon de dos | la lumière directe ne traverse pas le verre : le dos ne reçoit que des caustiques | `etiquette_arc(..., lumiere_dos=1.6)` (défaut) : émission faible de la teinte du dos |
| Centre du liquide « crème » | contre-jour trop fort, AgX délave les hautes lumières | `force_carte` 5 (pas 14) |
| Ligne d'horizon derrière la base | cyclo grossier, ou halo qui n'éclaire pas le sol | 240 points, rayon 12, halo au-dessus |
| Le flacon flotte | aucune ombre de contact | AO dans le sol, monde sombre (0,06), clé plus proche |
| V clair sur le fond | bandes arrière qui éclairent le cyclo | light linking sur l'objet seul |

## Réglages de rendu (`reglages_rendu()`)

Cycles GPU, 32 rebonds (transmission 32, brillance 12, volume 2), caustiques activées, OIDN
avec albédo et normales en préfiltre `ACCURATE`, `filter_width` 1,1, AgX « Medium High
Contrast ». Aperçus : 720 px, 96 échantillons (30 s sur GPU Apple). Final : 1080 × 1350 pour le site par
défaut, 3072 × 3840 seulement si l'utilisateur le demande (impression),
256 échantillons (plusieurs minutes par image : en tâche de fond).

## Conseils des forums et des photographes (recherche du 05/11/2026)

Repris dans la bibliothèque : strips + drapeaux, light linking, couleur par le volume,
liquide qui déborde, `volume_bounces` > 0, MULTI_GGX, dispersion (Blender 4.2+), longue
focale 90 à 120 mm à hauteur de l'objet, f/8, OIDN précis, filtre 1,1, rendu à 1080 px pour le site (4K sur demande).

À tester selon le projet :
- **Imperfections** très faibles (empreintes, poussière) par un Coat rugueux texturé sur un
  verre lisse, jamais par la rugosité du verre (elle l'assombrit).
- **Thin film** (100 à 1000 nm) pour une irisation de verre traité ou de nacre, très léger.
- **Sol réfléchissant** (plexi noir, rugosité 0,02 à 0,1) pour un look « luxe sombre ».
- **Caustiques au sol** : MNEE (`is_caustics_caster`, `is_caustics_receiver`,
  `is_caustics_light`) est rapide mais ignore les volumes, donc les liquides colorés.
- **Compositing léger** : Glare « Fog Glow » seuil 1 à 2, aberration chromatique 0,005,
  grain fin, vignette. Toujours léger.
- **Couleurs de marque exactes** : `Khronos PBR Neutral` au lieu d'AgX (moins de contraste).

Sources : picjam.ai/blog/perfume-product-photography ; nightjar.so (photographier le
verre) ; robandrewphoto.com/how-to-photograph-a-glass-bottle ; broncolor.swiss ; doc
Blender (light linking, Principled BSDF, Cycles sampling) ; BlenderArtists « Perfume
bottle ad packshot practice » (1482030) ; Blender StackExchange 156100 (volume dans le
verre) ; imeshh.com (shader de verre) ; 80.lv (dispersion native) ; cc-blender-skill
(RobLe3, MIT) pour les recettes de départ.
