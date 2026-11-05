# Étude de motionsites.ai — catalogue des effets

Étude faite le 4 novembre 2026, dans un navigateur réel (Chrome piloté par Playwright, 1440 × 900), sur toutes les pages publiques du site. Le but : relever **les techniques, les structures et les réglages** qui donnent à ces pages leur niveau de style, pour écrire ensuite **nos propres** éléments (`elements/`) et fonds de hero (`fonds-hero/`).

**Ce que ce document ne contient pas, volontairement.** Aucun prompt du site n'est recopié (les prompts sont le produit vendu : 129 $ à 399 $), aucun code, aucune vidéo, aucune image. Les cinq leçons de l'Academy montrent des extraits de prompts en clair : on n'en a retenu que les **idées techniques** (« fond vidéo collant », « verre dépoli avec flou et saturation »), décrites ici avec nos mots. Les vidéos de fond du site sont des fichiers générés par IA hébergés chez eux : on ne les télécharge pas, on ne les référence pas.

## Pages visitées

| Page | URL | Accès | Ce qu'on y apprend |
|---|---|---|---|
| Accueil (bibliothèque de prompts) | https://motionsites.ai/ | libre | ~120 cartes de sites : héros, sections, pieds de page. Vidéo d'aperçu sur chaque carte. |
| Fonds animés | https://motionsites.ai/backgrounds | libre (aperçus) ; « Copy URL » réservé aux abonnés | ~150 vidéos de fond, filtrées par Dark, Light, Abstract, Nature, Space, Illustrated, Surreal, People, Characters, Objects, City, Tech. |
| Academy | https://motionsites.ai/academy | libre | 6 leçons écrites + vidéos YouTube. La méthode de fabrication. |
| Leçon « scroll-animated » | /lesson/build-scroll-animated-website-with-ai | libre | Vidéo de fond pilotée par le défilement, ou séquence d'images. |
| Leçon « cursor-tracking » | /lesson/cursor-tracking-website-with-motionsites | libre | Vidéo dont la lecture suit la souris (personnage qui tourne la tête). |
| Leçon « 3D scroll » | /lesson/build-3d-scroll-animated-website-with-ai | libre | Image → 4 vues → modèle GLB → Three.js piloté au défilement. Lettres qui s'envolent. |
| Leçon « animated website » (×2) | /lesson/build-animated-website-with-ai, /lesson/build-animated-website-with-motionsites | libre | Vidéo plein écran, titres en cascade, bouton « verre liquide », menu mobile animé. |
| Leçon « Astra 6 » | /lesson/astra-6-build-3d-websites-for-beginners | libre | D'abord l'interface sur fond vidéo, ensuite remplacer la vidéo par une vraie scène WebGL. |
| 3D | https://motionsites.ai/3d-websites | libre (aperçus) | ~100 sites 3D : personnages, objets, mondes. |
| MCP | https://motionsites.ai/mcp | libre ; prompts derrière connexion | Serveur MCP qui sert les prompts aux agents (3 gratuits, le reste payant). |
| Studio | https://motionsites.ai/studio | libre | Offre « on construit pour vous », 89 $ par mois. |
| Tarifs | https://motionsites.ai/unlimited | libre | 129 $ / 3 mois, 279 $ / an, 399 $ à vie, packs de 2 à 10 prompts. Bandeau compte à rebours en bas. |
| Affiliation, contact | /affiliates, /public-contact | libre | Mise en page de chiffres-clés (40 %, 30 jours, 4 moyens, 0 $). |
| Fiches de prompt | /?prompt=solace-faq, /?prompt=seedwell-hero, /?prompt=lumen-roof-hero, /?prompt=orbit-sphere | aperçu libre ; « Copy prompt » = connexion ou paiement | Grand aperçu animé + suggestions. **Non contourné.** |
| Connexion | https://motionsites.ai/auth | connexion | **Non contourné.** |
| Submit | https://motionsites.ai/submit | page introuvable (404) | — |

## Ce qui fait « le niveau » (constats transverses)

1. **Le fond fait 80 % de l'effet.** La plupart des héros sont une phrase courte posée sur une vidéo IA en boucle (5 à 10 s), plein cadre, `object-fit: cover`. L'interface (titre, boutons) reste en HTML par-dessus, jamais incrustée dans la vidéo. → Nos fonds procéduraux font le même travail sans vidéo de 5 Mo ; notre `video-boucle` cadre le cas vidéo.
2. **Une seule idée par écran.** Un objet central (arbre, méduse, sphère, prisme, planète) ou un paysage, une phrase, un ou deux boutons. Beaucoup d'air.
3. **Typographie très grande, grasse et serrée** (grotesque type Helvetica Now / Inter Tight), souvent avec **un mot en italique** ou **en dégradé** (pêche → rose → lilas) avec un halo lumineux.
4. **Verre dépoli partout** : barre de navigation en pilule, boutons, cartes de formulaire. Recette : fond presque transparent, `backdrop-filter: blur() saturate()`, ombre interne blanche, liseré clair dégradé.
5. **Le mouvement est piloté** : par le défilement (vidéo ou séquence d'images « scrubée », scène épinglée), ou par la souris (vidéo dont l'image suit l'abscisse du curseur, objets qui s'orientent).
6. **Points et particules** : nuages de points en forme de main, de cerveau ou de sphère ; trames de points (halftone) dont la taille varie ; anneaux de traits fins.
7. **Fondus de bord** : carrousels et bandes dont les bords s'effacent par un masque dégradé, pas par une coupure.
8. **Palette de fond** : soit noir profond (#0a0a0a à #111) avec une seule lueur colorée, soit ciel pastel lumineux (bleu, rose, lilas). Rarement les deux.

## Catalogue des effets

Format : **nom** — ce que l'effet fait · comment il est construit (constaté ou déduit à l'œil, aucun code lu) · page source · ce qu'on en a fait.

### Fonds de hero

| # | Effet (nom chez eux) | Ce qu'il fait | Construction | Source | Chez nous |
|---|---|---|---|---|---|
| F1 | Ruban de soie (1re vidéo du carrousel Backgrounds, « Video Ribbon ») | Un ruban translucide bleu-lilas ondule sur fond clair | Vidéo IA. Équivalent procédural : bande d'ondes sinusoïdales superposées, couleur irisée, en shader | /backgrounds, accueil | `fonds-hero/ruban-soie` |
| F2 | Ciels pastel, dégradés doux (« Light », « Abstract ») | Couleurs qui dérivent lentement, grain fin | Vidéos IA ; équivalent : dégradé maillé (taches floues qui bougent) + grain | /backgrounds | `fonds-hero/aurore-maillee` |
| F3 | Horizon de planète, éclipse (« Sun Timeline », « Moxly », « Synthora », « Zapline ») | Arc lumineux d'un astre au bas de l'écran, halo violet ou orange sur noir | Vidéo ou image ; équivalent : disque noir + anneau flouté + lueur radiale qui respire | accueil | `fonds-hero/horizon-eclipse` |
| F4 | Trame de points (« Halftone FAQ ») | Grille de points ambre dont la taille ondule, sous un bloc de contenu | Grille dessinée en canvas, rayon = bruit + distance au curseur | /?prompt=solace-faq | `fonds-hero/trame-points` |
| F5 | Nuage de points (« Particle Brain », « Lumora », « Particle Self ») | Sphère ou forme faite de milliers de points, qui tourne, réagit à la souris | Points en 3D projetés en 2D, profondeur = taille + opacité | accueil | `fonds-hero/sphere-particules` |
| F6 | Brume, fumée (« Solar Fog », « Hollowmere », « Velaris ») | Voile de brouillard qui dérive et se déchire devant une image ou un titre | Bruit fractal (fbm) en shader, alpha modulé | /?prompt=lumen-roof-hero | `fonds-hero/brume-shader` |
| F7 | Espace, étoiles (« Space », « Mars Trips », « StellarMind ») | Étoiles en profondeur, légère dérive, parallaxe souris | Couches de points à vitesses différentes | /backgrounds, accueil | `fonds-hero/champ-etoiles` |
| F8 | Anneau de traits (« Verra Events Hero ») | Arc fait de centaines de traits fins, dégradé rouge-orange, qui tourne et pulse | Traits radiaux en canvas, longueur modulée par une onde | accueil | `fonds-hero/anneau-traits` |
| F9 | Vidéo IA en boucle (presque toutes les cartes) | Plein cadre, muette, en boucle, voile sombre pour la lisibilité | `<video autoplay muted loop playsinline>` + `poster` + voile dégradé | partout | `fonds-hero/video-boucle` (avec pause et mouvement réduit) |
| F10 | Prisme, verre (« Halo Prism », « Facet Glass ») | Faisceau de lumière décomposé en arc-en-ciel | Vidéo IA ou 3D. **Non retenu** : demande un rendu 3D réfractif lourd ; à générer en vidéo (étape médias) puis passer dans `video-boucle`. | accueil | — |

### Éléments d'interface

| # | Effet | Ce qu'il fait | Construction | Source | Chez nous |
|---|---|---|---|---|---|
| E1 | Verre liquide | Boutons, nav, cartes en verre dépoli au liseré lumineux | Fond quasi transparent, flou + saturation du fond, ombre interne, liseré dégradé par masque | leçons « animated website », toutes les nav | `elements/verre-liquide` |
| E2 | Titre en dégradé lumineux | Un mot en dégradé pêche → rose → lilas, avec halo | `background-clip: text`, dégradé, ombre portée colorée floue | accueil, /backgrounds, /mcp, /unlimited | `elements/titre-degrade` |
| E3 | Pastille à liseré dégradé | Petite étiquette capitale (« NEW VIDEOS ADDED DAILY ») au contour orange-rose | Bord dégradé par double fond (`padding-box` / `border-box`) | toutes les pages | `elements/pastille-liseree` |
| E4 | Nav en pilule de verre | Barre flottante arrondie, se resserre au défilement, menu mobile plein écran | Verre (E1) + classe au défilement + `<dialog>` | leçons, cartes d'aperçu | `elements/nav-pilule` |
| E5 | Carrousel à bords fondus | Bande de visuels qui défile seule, bords qui s'effacent | Piste en `transform`, masque `linear-gradient` sur les bords | /backgrounds (en tête) | `elements/carrousel-fondu` |
| E6 | Sphère de cartes (« Orbit Sphere ») | Images posées sur une sphère, qu'on fait tourner à la souris ou au doigt | Positions sphériques (Fibonacci), `transform: translate3d` + perspective, inertie | /?prompt=orbit-sphere | `elements/sphere-cartes` |
| E7 | Galerie infinie (« Infinite Gallery ») | Mur d'images qu'on traîne dans tous les sens, sans fin | Grille répétée en modulo, glisser + inertie | accueil | `elements/galerie-infinie` |
| E8 | Révélation à l'encre (« Ink Reveal ») | Le curseur « peint » et découvre une seconde image sous la première | Canvas de masque : traînée de cercles qui s'estompe, `mask-image` | accueil | `elements/revele-encre` |
| E9 | Lettres qui s'envolent | Titre géant dont les lettres se dispersent vers le haut au défilement, deuxième titre qui arrive | Scène épinglée, lettres découpées, trajectoires aléatoires figées | leçon « 3D scroll » | `elements/lettres-envol` (GSAP) |
| E10 | Vidéo pilotée par la souris (« cursor-tracking ») | L'image de la vidéo suit l'abscisse du curseur (personnage qui tourne la tête) | `video.currentTime = x × durée`, lissé | leçon « cursor-tracking » | `elements/video-curseur` |
| E11 | Projecteur au curseur | Les bordures et le fond des cartes s'allument autour du curseur | Variables CSS `--x --y` mises à jour au survol, dégradé radial | cartes sombres (« Halden », « Scanner Comparison ») | `elements/projecteur-cartes` |
| E12 | Bandeau d'offre à compte à rebours | Barre dégradée collée en bas : offre + temps restant | Bandeau fixe, minuteur, bouton fermer | /unlimited | `elements/bandeau-minuteur` |
| E13 | Accordéon sur trame (« Halftone FAQ ») | FAQ en cartes de verre sombre posées sur une trame de points | `details name` natif + verre + fond F4 | /?prompt=solace-faq | `elements/faq-verre` |
| E14 | Chiffres-clés (affiliation) | Quatre grands chiffres avec une ligne d'explication | Grille 4 → 2 → 1 colonne, compteur | /affiliates | **Déjà dans le kit** (`data-counter`), non refait |
| E15 | Texte en cascade, titres qui montent | Mots qui entrent l'un après l'autre | — | partout | **Déjà dans le kit** (`data-split`, `data-intro`) |
| E16 | Défilement de logos | — | — | partout | **Déjà dans le kit** (`data-marquee`) |

### Méthode de fabrication (Academy), reformulée

- **D'abord l'interface sur fond vidéo, ensuite la 3D.** On valide la mise en page avec un fond simple ; la scène WebGL vient après. → Rejoint notre ordre : maquette, puis gestes.
- **Pas de texte dans la vidéo.** Le titre et les boutons restent du HTML (lisible, traduisible, indexable).
- **Vidéo ou séquence d'images** pour le défilement : la vidéo est plus simple, la séquence plus précise. → Le kit a déjà `data-video-scrub` et `canvas[data-sequence]`.
- **Modèles 3D sombres** : penser au mappage de tons (tone mapping) et à l'exposition. → Note pour `model-viewer` (attribut `exposure`, `tone-mapping`).
- **Textures 1K à 2K** pour les GLB : au-delà, la page pèse trop.

## Ce qu'on fait mieux qu'eux (nos garde-fous)

- **Mouvement réduit** : chez eux, rien n'indique qu'une vidéo ou un effet s'arrête si le visiteur l'a demandé. Chez nous, chaque élément a un état fixe complet.
- **Bouton pause** sur tout ce qui bouge plus de 5 secondes (WCAG 2.2.2).
- **Poids** : un fond procédural pèse 2 à 6 Ko contre 2 à 8 Mo pour une vidéo. Les animations s'arrêtent hors écran et quand l'onglet est caché.
- **Lisibilité** : un voile ou un contraste mesuré sous chaque texte posé sur un fond animé.

## Autres sources étudiées

Chaque étude liste les pages visitées (accès libre, connexion ou payant), ce qui a été relevé, le tableau « repéré → technique → notre fichier » et ce qui n'a pas été retenu.

| Source | Étude | Ce qui en est sorti |
|---|---|---|
| motionsites.ai/3d-websites | [`etude/motionsites-3d.md`](etude/motionsites-3d.md) | 7 éléments 3D (`elements-3d/`) |
| sceneai.art | [`etude/sceneai.md`](etude/sceneai.md) | 2 fonds, 2 éléments, 3 éléments 3D |
| scrolltide.co | [`etude/scrolltide.md`](etude/scrolltide.md) | 7 éléments de défilement |
| jiro.build | [`etude/jiro.md`](etude/jiro.md) | licence propriétaire : rien repris, 7 éléments et 1 fond réécrits d'après les techniques |
| gsap-skills (MIT) et plugins GSAP | [`etude/gsap-skills.md`](etude/gsap-skills.md) | 6 démos de plugins + [`elements/gsap-bonnes-pratiques.md`](elements/gsap-bonnes-pratiques.md) |
| Outils libres (Spark, THREE-CustomShaderMaterial, Anime.js, mo.js, Two.js, D3) | [`etude/outils-libres-demos.md`](etude/outils-libres-demos.md) | 7 démos, licence citée dans chaque fiche |
| Outillage (Remotion, Theatre.js, Babylon, cables.gl, RIFE + FFmpeg, Drei sans React) | [`etude/outillage.md`](etude/outillage.md), [`outillage/README.md`](outillage/README.md) | fiches d'outils + 2 fonds vidéo Remotion |

