# Étude de motionsites.ai/3d-websites — sites 3D

Étude faite le 5 novembre 2026 dans Chrome piloté par Playwright (1440 × 900), en complément de `../motionsites-etude.md`. But : relever les **familles de scènes 3D**, leurs **techniques** et leur **style**, puis écrire nos propres éléments dans `../elements-3d/`.

**Ce que ce document ne contient pas.** Aucun prompt du site (le bouton « Go Unlimited » / « Copy prompt » demande un compte payant : non contourné), aucun code, aucune vidéo, aucune image, aucun modèle. Les aperçus sont des **vidéos MP4** des sites (hébergées chez eux) : on les a regardées, on ne les a ni téléchargées ni référencées. Les techniques ci-dessous sont **déduites de ce qu'on voit à l'écran** (consignes « Drag to rotate », « Drag a jelly to wobble it », comportement au défilement), pas lues dans un code source.

## Pages visitées

| Page | URL | Accès | Remarque |
|---|---|---|---|
| Galerie 3D | https://motionsites.ai/3d-websites | libre | Annoncée « 100+ » sites ; **15 cartes** affichées sans compte au moment de la visite (le reste se découvre dans les suggestions de chaque fiche). Titre « Build real 3D websites with AI », mot en dégradé pêche → rose. |
| 15 fiches d'aperçu | `/3d-websites?prompt=lost-little-explorer`, `moss-valley`, `octo-studio`, `golden-identity`, `synapticforge`, `specimen`, `fin-coin`, `ancient-oath`, `agehana`, `inknomad`, `jelly-garden`, `sky-cookie`, `michelle-3d-portfolio`, `go-on-white`, `shadow-3d` | aperçu libre ; prompt payant | Grand aperçu vidéo + « Go Unlimited » (non cliqué) + liens sponsorisés (AI Studio, Manus) + ~20 suggestions par fiche. |
| Suggestions vues dans les fiches | Phoenix Ignis, Feathers Atlas, Abyss Atlas, Neo Museum, Jellyfish Scroll, Kairo Studio, Cloud Kicks, Data Storytelling, Lumora Skyranger, Living Portrait, Prosthetics Hero, Signal ID, Taskly… | aperçu libre | Confirment les familles ci-dessous. |

## Familles de scènes relevées

| Famille | Exemples | Ce qu'on voit | Technique probable |
|---|---|---|---|
| **Objet produit unique** | Sky Cookie, Fin Coin, Go On White (scarabée), Octo Studio (pieuvre), Golden Identity (pomme) | Un objet au centre, souvent entre ou devant un mot géant ; étiquettes qui pointent ses qualités ; on le tourne au glisser. | Modèle GLB (généré par IA : image → vues → modèle, cf. leçon « 3D scroll ») dans Three.js, `OrbitControls` ou rotation au défilement ; éclairage studio (HDRI), mappage de tons. |
| **Personnage / mascotte** | Lost Little Explorer (renard d'une page 404), Agehana (portrait), Inknomad (personnage de menu de jeu), Lumora Skyranger, Living Portrait | Personnage stylisé qui suit le curseur du regard ou se tourne ; menu de jeu autour. | GLB animé (squelette) ou **vidéo** dont l'image suit l'abscisse du curseur (leçon « cursor-tracking »). |
| **Monde / paysage** | Moss Valley, Mythic Naturecore, SpeakUp | Caméra qui avance dans un vallon, herbe, lumière dorée, typo serif par-dessus. | Souvent vidéo IA plein cadre ; parfois scène WebGL avec brouillard. |
| **Visionneuse « atlas »** | Specimen (tricératops), Abyss Atlas (nautile), Feathers Atlas, Phoenix Ignis | Mise en page de musée : liste à gauche, fiche à droite, modèle au centre avec « 360° » et « drag to turn ». | GLB + contrôles d'orbite, interface HTML autour. |
| **Matière molle / jeu** | Jelly Garden | Fruits translucides qui tremblent quand on les tire ; boutons Hard / Soft / Knife / Shake. | Physique de corps mou ou déformation de sommets + matière à transmission. |
| **Typo géante + objet** | Michelle 3D portfolio, Go On White, Kairo Studio, FinSmith | Titre noir énorme, objet 3D qui passe devant ou entre les lettres. | Texte HTML + canvas transparent superposé, parfois texte 3D. |
| **Interface sur scène** | Shadow 3D (curseurs « pluie »), SynapticForge (mains) | Réglages en HTML qui modifient la scène en direct. | Uniformes de nuanceur pilotés par des `input range`. |

## Style relevé

- **Un sujet, un fond.** Fond studio uni (blanc cassé, bleu Klein, orange vif, noir) ou ciel pastel ; l'objet est seul et énorme.
- **Matières « produit »** : vernis, translucide, peluche, métal poli ; ombre de contact douce sous l'objet.
- **Typographie massive** (grotesque très grasse, condensée, ou serif éditoriale) ; la 3D dialogue avec le mot.
- **Interaction dite à l'écran** : « drag to rotate », « drag a jelly », « scroll » ; peu de boutons, une consigne courte.
- **Ce qu'on n'a vu nulle part** : bouton pause, repli sans WebGL, respect du mouvement réduit. Ce sont nos garde-fous.

## Repéré → technique → notre fichier

| Repéré | Notre technique | Notre fichier |
|---|---|---|
| Objet produit qui tourne pendant qu'on lit (Sky Cookie, Fin Coin, leçon « 3D scroll ») | Géométrie en code (`LatheGeometry`), textures peintes sur canvas, scène collante, poses clés interpolées au défilement | `elements-3d/objet-defilement` |
| Mondes miniatures (Moss Valley, Sky Cookie) | Île low-poly en primitives bosselées + `flatShading`, ombres, glisser avec inertie | `elements-3d/ile-flottante` |
| Personnage qui suit le curseur (Lost Little Explorer, Agehana) | Chouette en primitives, matière peluche (`sheen`), regard vers le curseur **et le focus clavier**, clignement | `elements-3d/mascotte-regard` |
| Mot géant + 3D (Go On White, Michelle) | `TextGeometry` avec police libre, une maille par lettre, vague et inclinaison | `elements-3d/titre-extrude` |
| Caméra qui avance dans un lieu (Moss Valley) | Trajet `CatmullRomCurve3`, voûte balayée le long du trajet, `InstancedMesh`, caméra pilotée au défilement | `elements-3d/tunnel-defilement` |
| Nature réactive, champs d'objets | 9 000 brins en `InstancedMesh`, vent et écartement au curseur dans le nuanceur | `elements-3d/champ-instances` |
| Matière molle qu'on fait trembler (Jelly Garden) | Ressort amorti par objet + cisaillement/écrasement dans le nuanceur, matière à transmission, bouton clavier | `elements-3d/gelee-tremble` |

## Prompts libres cités en référence

Aucun : sur la page 3D, tous les prompts sont derrière « Go Unlimited ». Seules les consignes affichées dans les aperçus ont servi d'indice d'interaction (« Drag a jelly to wobble it », Jelly Garden ; « Drag to rotate », Go On White).

## Ce qui n'a pas été retenu, et pourquoi

- **Modèles GLB générés par IA** (personnages réalistes, dinosaures, insectes) : génération payante et assets propriétaires. Nos éléments construisent la géométrie en code ; pour un vrai modèle, passer par `model-viewer` avec un GLB dont la licence est vérifiée (ex. CC0) et citée.
- **Vidéos « cursor-tracking »** : déjà couvertes par `elements/video-curseur`.
- **Verre / transmission sur objet hero, carte métal, nuages de points** : traités par d'autres agents (`flacon-verre`, `carte-metal`, `spark-*`) ; on ne les a pas doublés.
- **Visionneuse « atlas » avec contrôles d'orbite** : c'est surtout une mise en page autour d'un GLB ; à construire avec `model-viewer` le jour où le client fournit un modèle.
- **Physique de corps mou réelle** (Jelly Garden) : remplacée par un ressort + déformation de sommets, 50 fois plus léger et suffisant pour l'œil.
