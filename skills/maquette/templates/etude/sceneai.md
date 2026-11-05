# Étude de sceneai.art : bibliothèque de héros animés et de dégradés

Étude faite le 5 novembre 2026 dans un navigateur réel (Chrome piloté par Playwright, 1440 × 900), sur toutes les pages publiques. SceneAI (édité par Orixadesign LLC) vend des **prompts** de landing pages (souvent pour des générateurs d'interface), des **vidéos de fond** et des **images de dégradés 3D**. Le but : relever les techniques et le style des scènes, puis écrire **nos propres** éléments.

**Ce que ce document ne contient pas.** Aucun prompt du site : tous sont derrière le bouton « Copy Prompt », qui renvoie vers `/login` (vérifié). Aucun prompt n'est affiché en libre accès, il n'y a donc rien à citer. Aucune vidéo ni image téléchargée ou référencée : les aperçus ont été regardés en lecture dans la page, et nos démos sont dessinées en code (seule photo : `champ-1600.webp`, déjà dans `exemples/`). Les descriptions de construction ci-dessous sont **déduites à l'œil** : les héros sont des vidéos, pas du code inspectable.

## Pages visitées

| Page | URL | Accès | Ce qu'on y apprend |
|---|---|---|---|
| Accueil | https://sceneai.art/ | libre | 36 cartes « Trending » (aperçu vidéo de chaque hero), 10 fonds animés, inscription aux nouveautés |
| Sections & Landing Pages | https://sceneai.art/landing-pages | libre (aperçus) | ~170 héros et pages, filtres par type (Hero, Features, CTA, Pricing, Testimonials, FAQ, Blog, Footer, Login, Onboarding mobile). 40 aperçus capturés à deux instants pour voir le mouvement |
| Gradients | https://sceneai.art/gradients | libre (aperçus, filigrane) | 105 images « 3D Glassy Gradient » et 4 animées |
| Gradients animés / fonds dégradés | /gradients/animated-gradients, /gradients/gradient-backgrounds | libre (aperçus) ; téléchargement réservé | mêmes rubans de verre, en boucle vidéo |
| Backgrounds | https://sceneai.art/backgrounds | libre (aperçus) ; « Copy URL » et téléchargement réservés | ~80 vidéos de fond ; en tête, un carrousel en perspective à bords fondus |
| Pricing | https://sceneai.art/pricing | libre | 49 $ / mois ou 199 $ à vie ; carte « Most Popular » à halo rouge |
| Affiliate | https://sceneai.art/affiliates | libre | 4 étapes numérotées en cartes, FAQ en cartes, appel final |
| Contact, License | /contact, /license | libre | Licence : les prompts servent à produire du contenu dérivé, accès payant |
| Fiche prompt | bouton « Copy Prompt » sur chaque carte | **connexion** (redirection `/login`) | **non contourné** |
| Login | https://sceneai.art/login | connexion | **non contourné** |

## Ce qui fait « le niveau » (constats transverses)

1. **Une image IA spectaculaire fait le hero.** Presque chaque scène est une vidéo générée de 5 à 18 s : astronaute, palais dans les nuages, porte baroque, cargo vu du ciel, île-ville, planète. L'interface (nav, titre, boutons) est posée en HTML par-dessus, souvent centrée.
2. **Le mot-marque géant joue avec la profondeur** : « Sagim » passe derrière une colline puis un rocher, « Zayden » derrière une statue, « REGAL DRIVE » derrière une voiture, « CREATIVE » derrière un visage. Trois plans : fond, mot, sujet détouré.
3. **Le cadre dans le cadre** : hublot d'avion dont la caméra recule (« Airlines »), arcades qui ouvrent sur des paysages (« Falcon House »), fenêtre de vaisseau (« Beyond the Window »), mur de pavés de verre devant un champ de fleurs (« Amesi »).
4. **Un objet produit qui flotte** : carte bancaire (« Amesi »), orbe marbré d'agent vocal (« Arbo »), rocher solaire (« Loqoipsum »), casque VR. Il tourne lentement, rarement plus.
5. **Barres d'action en verre au pied du hero** : recherche de voyage « lieu / date / voyageurs » (« Travora »), champ de prompt d'IA (« Brightly », « Neurolink »).
6. **Typographie** : soit grotesque très grasse et serrée en capitales (LUMENIX, TRADE WHAT'S NEXT), soit serif display (Sagim, Royal), avec parfois un mot en italique de couleur. Les chiffres-clés en chasse fixe (230+, 15X ROI).
7. **Dégradés « verre 3D »** : la collection Gradients = rubans de verre coloré, brillants, irisés, sur fond sombre ou pastel. C'est le produit visuel le plus cohérent du site.
8. **Le site lui-même est sobre** : fond `#1a1a1a`, cartes `#262626` arrondies, titres en dégradé pêche → rose (`background-clip: text`), boutons en pilule, bouton principal rouge-rose dégradé. Le spectacle est dans les aperçus.

## Catalogue des scènes relevées

| # | Scène (nom chez eux) | Ce qu'elle fait | Construction (déduite) | Chez nous |
|---|---|---|---|---|
| S1 | Airlines Hero Section | Vue par un hublot au couchant, la caméra recule et le cadre apparaît | Vidéo IA ; équivalent code : ciel dessiné + trou arrondi dont la paroi est une ombre géante, mis à l'échelle au défilement | `fonds-hero/hublot-ciel` |
| S2 | Amesi | « This Card is Digital » : carte bancaire qui flotte devant un champ rouge vu à travers une mosaïque de verre | Vidéo IA ; équivalents : carte 3D en métal, et mosaïque de pavés qui réfractent une scène floue | `elements-3d/carte-metal`, `fonds-hero/pave-verre` |
| S3 | Sagim (3 versions), Zayden, Velora, Pivot | Mot géant passé derrière le sujet | Calques : fond / texte / sujet détouré ; parallaxe | `elements/titre-collines` |
| S4 | Arbo Hero Section | Orbe orange marbré sur bleu, « Your AI Voice Agent » | Vidéo IA ; équivalent : shader de bruit sur une sphère | `elements-3d/orbe-voix` |
| S5 | Travora, Brightly | Barre de recherche en verre en bas du hero | HTML + `backdrop-filter` | `elements/barre-reservation` |
| S6 | Gradients (105 images, 4 vidéos) | Rubans de verre coloré, brillants | Rendus 3D ; équivalent temps réel : plans tordus + matériau à transmission | `elements-3d/voiles-verre` |
| S7 | Backgrounds (en-tête) | Carrousel en perspective, bords fondus | CSS 3D + masque | non retenu : `elements/carrousel-fondu` et `sphere-cartes` couvrent déjà |
| S8 | Neurolink, Brightly | Champ de prompt d'IA avec puces | Formulaire en verre | non retenu cette fois (proche de S5), piste pour plus tard |
| S9 | Vilo Glass | Lettres remplies d'une texture de glace / verre | Texte en `background-clip` d'une image | non retenu : `titre-degrade` en est proche, et sans image libre de droits |
| S10 | Brightly, Dashmark | Rangée de chiffres-clés en chasse fixe, bandeau de logos | HTML | non retenu : banal, déjà dans les modèles de pages |
| S11 | Jaxon | Témoignage avec rangée d'avatars | HTML | non retenu : déjà couvert par les sections avis |
| S12 | Pricing (le site) | Carte « Most Popular » à liseré et halo rouges | CSS | non retenu : effet de halo coloré à éviter (grille anti-IA du design system) |

## Repéré → technique → notre fichier

| Repéré | Technique retenue | Fichier | Gzip |
|---|---|---|---|
| Hublot d'avion, la caméra recule | Canvas 2D (ciel, 5 nappes de nuages, aile) + trou à `box-shadow` géante mis à l'échelle par `--p` au défilement, hero `sticky` | `fonds-hero/hublot-ciel.html` | 4,5 Ko |
| Mosaïque de verre devant un champ de fleurs | Canvas 2D : scène floue basse définition recopiée pavé par pavé avec loupe et décalage, biseau en dégradé, bosse sous le curseur | `fonds-hero/pave-verre.html` | 4,1 Ko |
| Mot géant derrière le sujet | Trois plans : SVG, `<h1>` géant, colline en aplat + motif CSS découpée par `mask` SVG étiré ; parallaxe au défilement et au pointeur | `elements/titre-collines.html` | 2,9 Ko |
| Barre de recherche en verre | `<form>` natif en grille, `backdrop-filter`, dates bornées, compteur, `role="status"` | `elements/barre-reservation.html` | 3,5 Ko |
| Carte bancaire qui flotte | Three.js : `ExtrudeGeometry` arrondie biseautée, `MeshPhysicalMaterial` métal + vernis + irisation, gravure en `CanvasTexture`, `RoomEnvironment` | `elements-3d/carte-metal.html` | 5,1 Ko |
| Orbe d'agent vocal | Three.js + `ShaderMaterial` maison : fbm, domain warping, Fresnel, uniforme `voix` simulé | `elements-3d/orbe-voix.html` | 4,5 Ko |
| Dégradés « verre 3D » | Three.js : plans tordus dans le shader (`onBeforeCompile`, normales par différences finies), transmission devant une toile réfractée | `elements-3d/voiles-verre.html` | 5,2 Ko |

## Prompts libres cités

Aucun : sur sceneai.art, le texte des prompts n'est visible qu'après connexion et paiement. Seuls les **titres** des cartes sont publics (« Airlines Hero Section », « Amesi », « Arbo Hero Section »…), cités ici comme source. Nos prompts « Pour le régénérer », dans chaque fiche, sont écrits par nous à partir de notre code.

## Ce qui n'a pas été retenu, et pourquoi

- **Les vidéos IA elles-mêmes** (astronaute, palais, cargo, planète) : c'est le produit vendu, et la consigne interdit toute génération payante. Le cas « vidéo plein cadre » est déjà cadré par `fonds-hero/video-boucle`.
- **Les sujets détourés** (statue, voiture, personnage) du truc « mot derrière le sujet » : il faudrait une photo détourée libre de droits. Notre version obtient la même profondeur avec un paysage dessiné ; la fiche explique comment passer à une photo détourée (remplacer `.colline-devant` par un PNG/WebP transparent).
- **Carrousel en perspective de la page Backgrounds** : redondant avec `carrousel-fondu` et `sphere-cartes`.
- **Halo rouge de la carte tarifaire** et **dégradé pêche → rose des titres** : trop « généré par IA » au sens de la grille du design system ; `titre-degrade` existe déjà pour les cas où c'est voulu.
- **Champ de prompt d'IA** (S8) : bonne piste pour un prochain lot, proche de la barre de réservation.
