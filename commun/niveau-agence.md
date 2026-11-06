# Le niveau « site d'agence »

Lance ton site vise un site qui semble sorti d'une agence à 25 000 € : une direction
artistique forte, de grandes images, une narration au défilement façon pages produit
Apple, une interaction dans chaque section — on ne s'ennuie jamais — et une page
construite pour convertir. Pas une ébauche, pas un gabarit. Ce fichier est lu par `charte`,
`design-system`, `medias`, `maquette` et `construire`, et par l'agent `relecteur`.

Deux erreurs à éviter autant l'une que l'autre :
- **l'ébauche** : boîtes vides, rectangles hachurés « photo à venir », mise en page sage
  en colonnes, aucune image, aucun mouvement ;
- **le « fait par IA »** : dégradés, cartes identiques, blobs, effets gratuits partout.
  Le mouvement et les images servent la marque, ou ils n'ont rien à faire là.

**Qui prime.** Ce fichier fixe le plancher pour tous les projets. Le style et la composition
choisis à la maquette (`07-maquette/maquette.md`, `theme.css`), que `DESIGN.md` formalise
à l'étape 8, disent *comment* l'atteindre pour cette marque : quels gestes, quelle intensité. Une
marque sobre garde une interaction par section, mais douce (révélation lente, image qui
s'ouvre, changement de fond), jamais « rien ne bouge ». Si la maquette ou `DESIGN.md` écarte un geste
que ce fichier demande, c'est à corriger dans la maquette (puis dans `DESIGN.md`) ; une demande explicite
du client écrite dans `00-etat.md` l'emporte sur les deux, et la maquette le dit en
annotation.

## 1. Les références (avant de dessiner)

À l'étape 3 (charte), une seule fois, **en 2 minutes et en parallèle** (`parcours.md`
§ 1) : version courte = les sites aimés de l'utilisateur et 2 sites de référence ; les
listes ci-dessous en entier en mode approfondi.
- **3 à 5 concurrents**, déjà lus au cadrage (ne pas les relire) : le hero, la
  structure des sections, la preuve, l'action principale ; ce qui marche, ce qui est
  faible.
- **Les leaders du secteur** repérés au cadrage (Phase 3) : ce qu'ils font de mieux
  (structure, catalogue, preuve, navigation, commande) est le point de départ. On fait
  mieux qu'eux sur ce point, sans réinventer ce qui marche déjà chez tous.
- **4 à 6 sites de référence en design**, de préférence dans le secteur ou un secteur
  voisin, repérés sur Awwwards, Godly, Siteinspire, Land-book, Httpster ou Mobbin
  (Firecrawl `firecrawl_scrape` avec `screenshot` et `branding`, sinon navigateur).
  Pour chacun : ce qu'on retient (une mise en page, un geste de mouvement, un traitement
  d'image), jamais une copie.
- Livrer dans `03-charte/references.md` un
  **tableau des gestes retenus** : geste, site d'origine, comment on le réinterprète
  avec notre identité. Montrer les captures côte à côte.

## 2. Les images : grandes, vraies, cadrées

- Le **hero porte une image ou une vidéo plein cadre** (pleine largeur, ou plus de la
  moitié de l'écran) : le métier, le lieu, le produit, le geste ; ou ce que sa
  composition met au centre (l'objet seul, l'œuvre, l'interface vivante :
  `compositions.md`). Un hero texte seul est l'exception : la composition
  « typographique brutaliste », un parti pris qu'il faut justifier.
- Au moins **une image pleine largeur par page longue**, et un rythme d'images de tailles
  différentes (une grande, deux moyennes, un détail serré). Pas de vignettes timides.
- **Combien de photos** : selon le métier, règle dans `medias` (« Combien d'images »).
  Une page qui doit donner envie (événement, ferme, commerce, artisan) montre des
  photos dans la plupart des sections, jamais une seule pour tout le site. Plans et
  cartes : illustration générée soignée, jamais un SVG approximatif (même règle).
- Cadrages d'auteur : très près (la matière, les mains), très large (le lieu), en
  plongée. Une même lumière, un même grain sur tout le site (médias, « bloc de style »).
- **La maquette n'a jamais de rectangle vide ou hachuré.** Tant que les vraies photos ne
  sont pas là, on **génère** les images dans la direction photo (générateur : fal
  d'abord, OpenRouter ensuite, voir « Quel générateur » dans `conventions.md` ; méthode
  dans `medias`, « Générer, par défaut ») ; une annotation hors de la page dit qu'elles
  attendent les vraies photos.
- Une vidéo de fond (boucle 5 à 8 s, muette, < 3 Mo, image d'affiche) dès que le métier
  a un geste qui se filme : c'est le plus fort signal « site d'agence ». Sans budget de
  génération : vidéo libre (Pexels Videos, Coverr) choisie dans la direction photo, ou à
  défaut la grande image animée en lent zoom ou dévoilement au défilement.
- **Le client refuse de dépenser.** Images libres de banques (Unsplash, Pexels), choisies
  une à une avec les mots de la direction photo, cohérentes entre elles (même lumière,
  même palette), marquées `provisoire` : c'est permis et préférable à un rectangle vide.
  Ce qui reste interdit : l'image de banque *générique* (poignée de main, open space,
  sourire face caméra) et toute image de banque présentée comme le lieu, l'équipe ou le
  produit réels sur le site en ligne.
- **Hero sur mobile** : l'image plein cadre reste en haut ; titre et action principale
  (et la ligne de réassurance si la composition en a une) passent par-dessus ou juste
  dessous, dans le premier écran.
  L'ordre de zoning de `04-architecture.md` s'adapte au mobile, sans perdre de contenu.

- **Le produit porte la marque.** Une image générée n'a jamais de texte : un sachet,
  une boîte, un flacon « vierges » font produit sans marque. Selon le support :
  - **image fixe** : poser l'étiquette ou le logo en HTML/SVG calé en perspective sur la
    photo, sans dépasser du contour. Cela ne tient **que** sur une image fixe ;
  - **vidéo** : un logo en HTML glisse dès que la caméra bouge (les modèles vidéo zooment
    souvent malgré « static camera »). Poser le marquage **sur l'image source, avant la
    vidéo** (retouche d'image avec le logo en référence, ou composition), puis animer
    avec image de fin = image de début. Méthode : `medias`, étape 5 ;
  - **objet 3D** : voir § 2 bis, « 3D et marquage ».
- **Recadrage mobile.** Le hero a sa version verticale 9:16 (vidéo recadrée avec ffmpeg
  et affiche dédiée) centrée sur le sujet : sur téléphone, on voit le produit, pas le
  ciel. Méthode : `medias`, étape 5.

## 2 bis. Créer sans limite (fal, OpenRouter)

Avec fal et OpenRouter, on fabrique ce que la direction artistique demande : rien n'est
« trop ambitieux » pour un petit budget. Le catalogue :

| Création | Outil | Usage sur le site |
|---|---|---|
| Photos d'ambiance, de matière, de lieu | fal, OpenRouter `generate-image` | hero, grandes images, galeries |
| Objets détourés (PNG transparent) | génération + détourage fal (`remove background`) | couches de profondeur qui bougent avec la souris ou le défilement |
| Textures, motifs, fonds de matière | génération | fonds de sections, découpes, masques |
| Illustrations dans le style de la charte | génération avec image de référence | pictos d'auteur, cartes, schémas illustrés |
| Vidéos en boucle (5-8 s) | fal, OpenRouter `generate-video` | hero, bandes, cinémagraphes |
| Séquences d'images façon Apple | vidéo générée → images (`ffmpeg -i v.mp4 -vf fps=24 f-%04d.webp`) | objet qui tourne, se construit, se cuit, au défilement (`data-sequence`) |
| **Objets 3D** (photos produit, séquences, GLB) | **Blender par script** (skill `objets-3d`) ; objet générique : bibliothèque CC0 ; en appoint, fal image → 3D | objet du métier qu'on fait tourner au défilement ou à la souris (`<model-viewer>` ou Three.js) |
| Sons d'ambiance | fal | coupés par défaut, seulement si la marque le porte |

Règle : chaque création sert l'histoire de la marque (le métier, le produit, la
matière), jamais un effet de remplissage. 3D : modèle optimisé (`optimiser-medias.sh` de
`medias` le fait avec `gltf-transform`, compression Draco), moins de 3 Mo, image
d'affiche, pas de rotation automatique en mouvement réduit.

**3D et marquage.** Un logo ne se pose en texture (`model-viewer` : `createTexture` sur
le matériau) que sur un modèle aux **UV propres** : chaque face a sa zone dans l'image
de texture. Un GLB généré (Trellis et autres modèles image → 3D) a une texture « atlas »
cuite, en morceaux : on ne peut rien y poser proprement.
- **Objet qui porte une marque** (sachet, boîte, flacon, étiquette) : modèle
  **paramétrique** construit en code (Three.js : boîte, cylindre, sachet extrudé, UV
  faites par construction) ou **GLB fait main** (Blender, skill `objets-3d`) avec une texture UV dessinée
  (exemple : `skills/maquette/templates/exemples/b2c-brume/models/`).
- **Objet sans marquage** (outil, pièce, fruit, pierre, machine) : d'abord une bibliothèque libre
  (Poly Haven, CC0), reprise dans Blender ; à défaut, un GLB généré (image → 3D, payant, avec un oui).

**3D : la fin de l'animation.** Un objet qui tourne, s'éclate ou se construit au
défilement **finit sur sa face avant**, logo ou marquage visible et lisible, de face,
bien éclairé (planche, sachet, boîte, flacon, appareil). Jamais de dos, de profil ou de
dessous à la dernière image ni en mouvement réduit : c'est l'image que le visiteur
garde. Contrôler la capture de fin de section, et l'affiche (`poster`).

**3D à fond perdu.** Un canvas 3D (ou `<model-viewer>`) qui reste dans sa colonne coupe
l'objet dès que la caméra zoome ou que l'objet tourne, en fin de section épinglée
surtout. Le canvas prend **toute la largeur et toute la hauteur** de la section ; le
texte passe par-dessus, lisible grâce à un **masque en dégradé côté texte**
(`mask-image: linear-gradient(90deg, transparent 0 30%, #000 55%)` sur le canvas, ou un
voile de la couleur du fond ; sur téléphone, dégradé vertical), pas grâce à une colonne
fermée.

## 2 ter. Le hero obligatoire

Tout hero de site, quelle que soit la composition, fait ces **quatre** choses. Cette règle
prime sur les fiches de `compositions.md` : elles disent la forme, pas l'absence de
mouvement. Un hero immobile n'est pas livrable.

| # | Obligation | Ce qu'on voit | Où piocher |
|---|---|---|---|
| 1 | **Fond animé** | le fond bouge seul dès l'arrivée, sans action du visiteur | `skills/maquette/templates/fonds-hero/` (d'abord les validés de `bibliotheque-notes.md`), ou vidéo en boucle générée (`video-boucle`) |
| 2 | **Effet à la souris** | au moins deux plans réagissent au curseur, à des vitesses différentes (fond, objet, carte, lumière) | `data-depth-scene` + `data-depth`, `data-tilt`, `data-magnetic`, `elements/verre-liquide`, `elements/projecteur-cartes`, `elements-3d/mascotte-regard` |
| 3 | **Scène au défilement** | façon page produit Apple : la scène s'épingle, le visuel grossit ou se transforme, le défilement pilote tout, phrase après phrase | `data-hero-pin`, `data-steps`, `elements/pilule-zoom`, `elements/focus-mots`, `fonds-hero/hublot-ciel`, `elements-3d/tunnel-defilement` |
| 4 | **Le bon sujet dans la scène** | voir le tableau ci-dessous | |

| Le site montre | La scène | Modèles à ouvrir |
|---|---|---|
| un **objet ou un élément** : produit, machine, flacon, mascotte, carte | l'objet **en 3D**, lisse, qui tourne, s'ouvre ou se transforme au défilement, et finit de face (§ 2 bis, skill `objets-3d`) | `exemples/commerce-flacon`, `exemples/artisan-calorie`, `elements-3d/objet-defilement` |
| un **logiciel, SaaS, service numérique** | la scène **explique le produit** : le titre laisse la place à l'interface, qui grossit, puis 3 à 4 moments, chacun une phrase et un écran | `exemples/b2b-vigie` (la scène à moments), `exemples/logiciel-miroir` (interface vivante) |
| un **lieu, un geste, une matière** | la vidéo ou la photo du métier pilotée au défilement (`data-video-scrub`, zoom, dévoilement) | `exemples/b2c-brume`, `exemples/hebergement-cretes` |

**Écrans d'un logiciel dans le hero** : ne jamais demander à une vidéo IA de produire l'interface, elle déforme les textes et les chiffres. Rendre l'interface en HTML, image par image (Playwright), avec les vrais textes. Générer à part les personnages ou objets qui vivent dedans, un film court par sujet, début et fin sur la même image, puis poser leurs images dans l'interface au rendu. Le résultat reste une vidéo, nette et exacte, et le sujet bouge sans toucher au reste. Contrôler **12 images** réparties sur la boucle : trois ne suffisent pas. Si le produit repose sur une équipe d'agents, le montrer : un agent général qui coordonne, et une conversation directe avec chacun.

**Un personnage vivant, quand le produit se raconte par un guide** (un agent, un conseiller ; jamais un faux membre de l'équipe, jamais sur tous les sites) : **une seule vidéo pour tout le personnage, et seuls les yeux suivent la souris.** Deux essais écartés : la 3D (yeux peints, cheveux en bloc, regard inquiétant de près) et les poses recalculées (LivePortrait, 21 têtes : le cou se décolle et le visage change d'une pose à l'autre, défaut vu seulement en essayant la page à la souris sur une vraie machine, pas sur les captures). La recette : une image de personnage sur fond vert ; une vidéo de 8 s avec cette image au début et à la fin (Seedance 2.0 retenu : tête stable à 3 px, contre 20 px pour Kling O1, sur un seul essai de chaque), prompt limité à la respiration, au tissu, à quelques mèches, un clignement, tête immobile, caméra fixe ; fondu des 16 dernières images vers la première ; détourage dans un script, puis une vidéo empilée, couleur en haut et alpha en bas, lue en WebGL, qui passe sur tous les navigateurs ; repérage image par image de la tête sur le nez et la bouche, jamais sur l'oeil, que le clignement ferait dériver. Dans le shader, les pixels glissent à l'intérieur de l'oeil (10 px en largeur, 3 en hauteur), le coin et les paupières restent fixes, et le glissement s'annule pendant le clignement. Le regard part en saccades rapides, avec de petits mouvements au repos. Pas de sourire piloté, pas de hochement, pas de parallaxe : au survol une bulle, c'est tout. Environ 2 $ et 1,3 Mo. Sans WebGL ou en mouvement réduit : l'image fixe. Le personnage passe derrière le contenu ; le bloc central peut se décaler légèrement à l'opposé (3,5 % de la largeur, ordinateur seulement). **Toute vidéo en boucle** : chercher les images isolées avant de livrer (la première image d'un film généré peut être cassée, elle clignote à chaque tour).

**Un mot qui se révèle** (facultatif, un seul par page, le mot qui porte la promesse) : le texte ne s'anime jamais. Au repos, un halo léger aux couleurs du sens du mot donne envie d'approcher. Une sphère de verre autour de la souris apparaît à environ 95 px du mot, gratte le mot et révèle ses couleurs, qui s'effacent ensuite lentement. Au doigt, la sphère traverse le mot quand on le touche. Le symbole doit être vrai pour le client : pas de drapeau sans lien réel avec le pays.

**Comment choisir** : ouvrir les modèles cités, regarder comment leur scène est construite,
s'en inspirer sans recopier leur identité. Noter dans `maquette.md` ce qui est repris de la
bibliothèque pour chacune des quatre obligations.

**Les garde-fous, tous obligatoires :**
- le titre et l'action principale se lisent dans le premier écran, sans défiler (§ 4) ;
- **mouvement réduit** : pas d'épinglage ni de fond qui bouge, tous les moments affichés à la suite ;
- **tactile** : pas de souris, donc l'effet 2 s'efface ; l'épinglage reste s'il est court et fluide, sinon les moments s'empilent ;
- un bouton pause sur le fond, la boucle s'arrête hors écran ;
- repli image si WebGL manque ; texte à 4,5:1 sur le fond ;
- le hero compte dans les 3 épinglages au plus de la page (`GESTES.md`) ;
- une seule scène 3D et un seul fond animé par page.

**Contrôle** : `captures.py URL DOSSIER --hero` mesure le fond, la souris et la scène, et rend
les captures à regarder (une alerte « hero incomplet » se corrige avant de présenter).

## 3. La mise en page

- **La composition d'abord** : la page suit l'une des huit compositions de
  `compositions.md` (immersif, produit centré, éditorial, typographique, récit
  horizontal, galerie, interface en démonstration, carnet), choisie au début de la maquette (étape 7) selon la
  cible. Le gabarit « pastille + grand titre à gauche + 2 boutons + réassurance + 3
  cartes » n'est jamais une structure par défaut.
- **Une page complète, des blocs courts** : toutes les sections que le métier attend,
  3 phrases au plus par bloc, plus de visuels que de texte, le détail sur des pages
  dédiées. Sections et fourchette chiffrée : `conventions.md` § 11.
- Une **grille éditoriale** à 12 colonnes, utilisée avec des ruptures : texte décalé,
  image qui déborde de la grille, chevauchement maîtrisé texte / image, grandes marges
  assumées. Pas une suite de blocs de même largeur empilés.
- **Contraste d'échelle** : un titre d'affichage très grand (jusqu'à 6 rem, voir
  anti-patterns), des textes courants calmes, des détails petits et précis. Les
  lettres d'un grand titre ne se touchent jamais : règle d'interlettrage dans
  `design-system` § 2 (« Typographie »).
- **Le hero équilibré.** Le premier écran est composé : texte, visuel et action se
  répondent et occupent la largeur. Pas de grand vide au milieu (une bande vide plus
  large qu'un tiers de l'écran entre le texte et l'image, ou un titre isolé dans un
  coin sur un fond vide). Vérifié à 1440 × 900 et 1280 × 720.
- **La barre de navigation.** Partir d'un modèle de barre de navigation des skills
  (`ui-ux-pro-max` installé, sinon MCP `ui-skills` : `get_skill`
  `nextlevelbuilder-ui-ux-pro-max`, ou `list_skills` « navbar » / « header ») et
  l'adapter à la charte. Toujours : le logo à gauche, **3 à 5 liens** dans les mots des
  clients, **un** bouton d'action à droite. Sur téléphone : le logo, le bouton d'action
  et un bouton menu ; le menu s'ouvre en plein écran ou en tiroir, gros liens, croix
  toujours visible, fermeture au clavier (Échap). **Jamais de numéro de téléphone en
  vrac dans la barre** : le numéro vit dans le pied de page et la page contact ; si
  l'appel est l'action principale, le bouton dit « Appeler » (lien `tel:`), sans le
  numéro écrit dessus.
- **Les blocs d'action et les formulaires.** Sur ordinateur, en **deux colonnes** : à
  gauche le titre, ce qui se passe ensuite et la réassurance (délai de réponse,
  gratuité, avis) ; à droite le formulaire, ses champs groupés (prénom et nom sur une
  ligne). Pas une longue pile verticale centrée. Sur téléphone, une colonne, le
  formulaire juste après le titre. **Jamais de numéro de téléphone affiché en gros** :
  un lien discret sous le formulaire suffit.
- Des **sections de rythmes différents** : plein cadre, deux colonnes asymétriques,
  bande défilante, liste éditoriale, galerie. Jamais trois fois la même forme de suite.
- Une **matière** propre à la marque : texture, trait, motif, découpe tirés du logo ou du
  métier, utilisés avec mesure.
- Fond clair ou sombre **assumé** et justifié par la charte, pas le crème par défaut.

## 4. Le mouvement et les interactions (motion design)

Le mouvement fait partie de l'identité. On le **dessine** (maquette animée) avant de le
coder. Règle : **chaque section a son geste** — une révélation, une narration au
défilement ou une interaction — et la page a **un moment signature** plus fort que le
reste. Jamais un écran mort, jamais tout qui bouge en même temps.

### Narration au défilement (façon pages produit Apple)

| Geste | Usage |
|---|---|
| Hero épinglé en *scrub* | l'image ou la vidéo zoome, se dévoile ou se décompose pendant que le titre se construit ; le défilement pilote l'animation |
| Séquence d'images sur canvas | un objet qui tourne, se construit, se cuit… : 60 à 150 images WebP pilotées par le défilement (vidéo découpée) |
| Vidéo pilotée par le défilement | `currentTime` lié au défilement, pour un geste du métier |
| Section épinglée en étapes | « en 4 temps » : les étapes changent pendant qu'on défile, texte à gauche, image qui se transforme à droite |
| De la carte au plein écran | une image qui grandit jusqu'à remplir l'écran (`clip-path` ou échelle en scrub) |
| Texte qui se révèle | mot par mot ou ligne par ligne, opacité qui s'allume au défilement (SplitText) |
| Galerie horizontale | réalisations, produits, lieux, qui défilent latéralement pendant qu'on descend |
| Chiffres qui comptent | chiffres réels et sourcés ; en maquette, un chiffre d'exemple est permis s'il est souligné en pointillé et expliqué en annotation (« à remplacer par ton vrai chiffre ») ; jamais en ligne |
| Changement de fond | la couleur de fond bascule d'une section à l'autre en douceur |

### Interactions

| Geste | Usage |
|---|---|
| Bouton magnétique | l'action principale attire le curseur (desktop) |
| Image qui suit le curseur | au survol d'une liste (dates, services, réalisations) |
| Cartes en léger relief | inclinaison 3D douce ou zoom de l'image au survol |
| Curseur personnalisé | seulement sur une zone où il dit quoi faire (« voir » sur une galerie, « glisser » sur un carrousel) ; jamais sur toute la page, jamais sur mobile |
| Bande défilante | savoir-faire, lieux, références réelles ; ralentit au survol ; **bouton pause** visible (WCAG 2.2.2) |
| Transitions de page | View Transitions (Astro `ClientRouter`) : l'image d'une carte devient le hero de la page suivante |
| Retour tactile mobile | états appuyés nets, glisser horizontal sur les galeries |
| Objet 3D | un objet du métier généré en 3D (fal) qui tourne au défilement (`data-model-scroll`) ou se manipule à la souris |

### Règles

- Durées 400 à 900 ms pour les révélations, 150 à 250 ms pour les survols ; courbes
  douces (`cubic-bezier(0.22, 1, 0.36, 1)` ou tokens motion) ; décalage de 60 à 120 ms
  entre éléments d'un groupe. Les narrations en *scrub* suivent le doigt, sans durée.
- **60 images par seconde** : n'animer que `transform`, `opacity`, `clip-path` ; pas de
  `width`, `top`, `box-shadow` animés ; séquences d'images en WebP légers, préchargées
  par paquets.
- **Épinglages** : 3 sections épinglées au plus par page, la plus longue à 2 hauteurs
  d'écran sur ordinateur. **Mobile** : chaque narration épinglée reste courte (une
  hauteur d'écran et demie au plus) ; pas de curseur, pas de survol ; l'action principale
  reste à portée.
- **Premier écran mobile** : titre et action principale visibles sans défiler, sur le
  plus petit téléphone courant (tailles : « Captures d'écran » dans `conventions.md`).
- **Le titre du hero ne passe jamais sous l'en-tête** : haut du titre sous le bas de
  l'en-tête, vérifié sur les écrans bas de la même liste.
- **Une donnée, une seule source** : prix, notes de goût, caractéristiques d'un produit
  sont écrits une fois (un objet JS ou un fichier de données) et réutilisés partout
  (cartes, configurateur, récapitulatif, partage). Deux versions d'un même texte finissent
  toujours par se contredire.
- **Chaque correction relance tous les contrôles** (débordement aux petites largeurs
  de la liste, contrastes mesurés sur les pixels réels, console) : une correction en
  casse souvent une autre.
- **Graphiques et visualisations** (courbe, jauge, tableau de bord) : axes, unités et
  seuils cohérents d'une section à l'autre ; un expert du métier doit pouvoir les lire.
- **Rien du premier écran n'attend le défilement** : titre, action principale (et ligne
  de réassurance s'il y en a une) apparaissent au chargement (animation d'entrée),
  jamais liés à un ScrollTrigger. Les cartes et blocs épinglés tiennent dans la hauteur
  d'écran (écrans bas compris).
- `prefers-reduced-motion` : tout reste lisible et utilisable, sections épinglées
  remplacées par leur état final, vidéos en pause sur leur affiche, révélations
  remplacées par un simple fondu ou rien.
- Rien ne retarde l'accès à l'action principale ; pas d'écran de chargement d'intro.

### Les outils

- **Tailwind CSS v4** pour toute la mise en forme, tokens du design system dans `@theme`
  (maquette : `@tailwindcss/browser` depuis un CDN ; site : Tailwind compilé).
- **GSAP** (gratuit, plugins compris) : ScrollTrigger (épinglage, *scrub*), SplitText
  (textes), Flip (transitions d'état), Observer ; skills `gsap-*` s'ils sont installés.
- **Lenis** : défilement doux, synchronisé avec ScrollTrigger.
- **Motion** (motion.dev) pour les îlots React s'il y en a ; bibliothèques de
  composants animés (Aceternity UI, Magic UI) comme **source d'idées**, jamais posées
  telles quelles : elles sont partout et font « déjà vu ».
- **`<model-viewer>`** (Google, gratuit) pour afficher un objet 3D généré, piloté par
  `gestes.js` ; **Three.js** pour une scène plus riche (shaders, particules de matière).
- CSS natif (`animation-timeline: view()`, View Transitions) pour le simple.
- **Le kit du plugin** : `skills/maquette/templates/prototype/` — une page Tailwind v4
  et `gestes.js`, qui branche chaque geste du catalogue par un attribut `data-*`
  (hero épinglé, textes révélés, étapes épinglées, galerie horizontale, image qui
  grandit, séquence d'images, vidéo pilotée, compteur, bande défilante, fond qui change,
  bouton magnétique, relief, image qui suit le curseur, curseur personnalisé), mouvement
  réduit compris. On part toujours de ses **gestes** ; sa page `index.html` est une
  démonstration des gestes, **pas un gabarit** : la structure vient de
  `compositions.md`.

### Les savoir-faire à charger (MCP UI Skills, sans connexion)

Avant d'écrire le mouvement d'une maquette, d'une démo ou du site, charger avec
`get_skill` (MCP `ui-skills` du plugin) ceux qui servent, et les suivre :

| Besoin | Skill |
|---|---|
| Direction d'ensemble d'un site « niveau Awwwards » | `mengto-build-awwwards-quality-sites` |
| Système de mouvement GSAP + Lenis (révélations, épinglage, magnétique, curseur) | `mengto-cinematic-gsap-lenis-motion-system` |
| Narration au défilement, sections épinglées, cartes empilées | `mengto-cinematic-scroll-storytelling`, `mengto-gsap-scrolltrigger-storytelling` |
| API officielle GSAP | `greensock-gsap-scrolltrigger`, `greensock-gsap-plugins` (SplitText, Flip), `greensock-gsap-timeline`, `greensock-gsap-performance` |
| Révélations masquées | `mengto-masked-reveal` |
| Mouvement réduit, accessibilité | `iart-ai-accessible-animation` |
| Fluidité, saccades, fuites | `mengto-optimize-web-animations`, `ibelick-fixing-motion-performance` |

Des skills équivalents installés en local (`gsap-*`, `impeccable`, `frontend-design`)
passent avant. `list_skills` avec un mot clé (« scroll », « hover », « three ») pour le
reste.

## 5. La conversion

- Promesse lisible en **5 secondes** : quoi, pour qui, quoi faire.
- Action principale visible dans le premier écran (ordinateur et téléphone), répétée
  après chaque bloc qui lève une objection, et en fin de page.
- Preuve **réelle** tôt dans la page (avis réels, chiffres réels, presse, lieux). Une
  preuve manquante : emplacement marqué en annotation, jamais inventée.
- Chaque objection du cadrage traitée quelque part (FAQ, garanties, prix clairs) : sur
  l'accueil en une phrase, le détail sur sa page (`conventions.md` § 11).
- **Des titres forts** : pour chaque titre majeur et la promesse du hero, 5 pistes ou
  plus, la plus concrète et la plus désirable retenue, avec la raison du choix ; 3
  variantes du titre principal gardées pour un test A/B. Méthode : `contenus`
  (« Les titres et la promesse »).

## 6. La grille sur 100

Notée par un regard qui n'a pas fait le travail (agent `relecteur` ; dans Claude :
relecture en changeant de posture), sur les captures (tailles et série au défilement :
`conventions.md`, § 6 et « Captures d'écran ») et la maquette animée :

| Critère | Points |
|---|---|
| Direction artistique : reconnaissable sans le logo, cohérente avec la charte | 15 |
| Images : grandes, vraies ou fidèles à la direction photo, rythme de tailles | 15 |
| Mise en page : composition choisie suivie (`compositions.md`), grille éditoriale, ruptures, contraste d'échelle, pas de vide raté | 15 |
| Mouvement : narration et interaction à chaque section, signature, fluide, mouvement réduit respecté | 10 |
| Clarté en 5 secondes et force de l'action principale | 10 |
| Densité : page complète dans la fourchette (`conventions.md` § 11), comptage fourni | 5 |
| Preuves et objections traitées, aucune fausse donnée | 10 |
| Textes : force des titres et de la promesse, voix de la marque, zéro phrase creuse, cohérence texte / image | 10 |
| Mobile (responsive contrôlé à toutes les tailles), accessibilité (contrastes, focus, cibles), légèreté | 10 |

**La densité, avec pénalité, dans les deux sens.** Une page trop maigre est aussi
grave qu'une page trop bavarde.

| Hors fourchette | Pénalité, en plus de « Densité » à 0 |
|---|---|
| **Trop maigre** : moins de 500 mots | 5 points par tranche entamée de 50 mots sous 500 |
| **Trop maigre** : moins de 10 sections | 5 points par section manquante |
| **Trop maigre** : section attendue absente sans raison notée au zoning (§ 11 de `conventions.md`), dont le catalogue ou les articles quand le métier vend ou publie | 5 points par section |
| **Trop bavarde** : plus de 800 mots | 5 points par tranche entamée de 50 mots au-delà de 800 |
| **Trop bavarde** : plus de 13 sections | 5 points par section en trop |
| **Trop bavarde** : un bloc de plus de 3 phrases | 5 points par bloc |

Sans comptage fourni, « Densité » vaut 0. Une page qui revient au gabarit interdit
(`compositions.md`) plafonne « Mise en page » à 5. Un grand titre aux lettres collées,
un titre cassé ou coupé à une des tailles de capture, ou un numéro de téléphone en vrac
dans la barre de navigation plafonnent « Mobile » ou « Mise en page » à 5.

**Les seuils.**

| Ce qu'on note | Seuil |
|---|---|
| Site construit (étape 11), avec les vraies photos et les vraies preuves | **90 / 100** |
| Maquette avec médias provisoires (images générées ou de banque, preuves à venir) | **85 / 100** |

Sans vraies photos ni vraies preuves, « Images » plafonne vers 12-13 / 15 et « Preuves »
vers 8 / 10 : 90 n'est atteignable qu'à la marge. La maquette se présente donc à 85,
avec la note **et la liste de ce qui bloque 90** (« photos réelles de l'atelier, deux
avis clients ») ; cette liste va dans `maquette.md` (« Ce qui manque encore ») et le
seuil de 90 est revérifié à la construction, avec les vraies photos et les vraies
preuves.

En dessous du seuil : corriger, refaire les captures, renoter. **Trois tours au plus.**
Au bout du troisième, on présente quand même, avec la note et ce qui bloque : pas de
quatrième tour. Noter la note de départ, la note finale et la liste des changements
dans le document de l'étape.
