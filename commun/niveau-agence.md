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

**Qui prime.** Ce fichier fixe le plancher pour tous les projets. `DESIGN.md` (étape 6)
choisit *comment* l'atteindre pour cette marque : quels gestes, quelle intensité. Une
marque sobre garde une interaction par section, mais douce (révélation lente, image qui
s'ouvre, changement de fond), jamais « rien ne bouge ». Si `DESIGN.md` interdit un geste
que ce fichier demande, `DESIGN.md` est à corriger à l'étape 6 ; une demande explicite
du client écrite dans `00-etat.md` l'emporte sur les deux, et la maquette le dit en
annotation.

## 1. Les références (avant de dessiner)

À l'étape 3 (charte) et en ouverture de l'étape 6 (design system) :
- **4 à 5 concurrents** (repris du cadrage) : le hero, la structure des sections, la
  preuve, l'action principale, les animations ; ce qui marche, ce qui est faible.
- **4 à 6 sites de référence en design**, de préférence dans le secteur ou un secteur
  voisin, repérés sur Awwwards, Godly, Siteinspire, Land-book, Httpster ou Mobbin
  (Firecrawl `firecrawl_scrape` avec `screenshot` et `branding`, sinon navigateur).
  Pour chacun : ce qu'on retient (une mise en page, un geste de mouvement, un traitement
  d'image), jamais une copie.
- Livrer dans `03-charte/references.md` (ou `06-design-system/references.md`) un
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
| **Objets 3D** (GLB) | fal, modèles image → 3D (`recommend_model` « image to 3D ») à partir d'une image générée | objet du métier qu'on fait tourner au défilement ou à la souris (`<model-viewer>` ou Three.js) |
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
  faites par construction) ou **GLB fait main** (Blender) avec une texture UV dessinée
  (exemple : `skills/maquette/templates/exemples/b2c-brume/models/`).
- **Objet sans marquage** (outil, pièce, fruit, pierre, machine) : un GLB généré suffit.

**3D à fond perdu.** Un canvas 3D (ou `<model-viewer>`) qui reste dans sa colonne coupe
l'objet dès que la caméra zoome ou que l'objet tourne, en fin de section épinglée
surtout. Le canvas prend **toute la largeur et toute la hauteur** de la section ; le
texte passe par-dessus, lisible grâce à un **masque en dégradé côté texte**
(`mask-image: linear-gradient(90deg, transparent 0 30%, #000 55%)` sur le canvas, ou un
voile de la couleur du fond ; sur téléphone, dégradé vertical), pas grâce à une colonne
fermée.

## 3. La mise en page

- **La composition d'abord** : la page suit l'une des huit compositions de
  `compositions.md` (immersif, produit centré, éditorial, typographique, récit
  horizontal, galerie, interface en démonstration, carnet), choisie à l'étape 6 selon la
  cible. Le gabarit « pastille + grand titre à gauche + 2 boutons + réassurance + 3
  cartes » n'est jamais une structure par défaut.
- **Densité moyenne** : peu de sections, peu de mots, le détail sur des pages dédiées.
  Budget chiffré : `conventions.md` § 11.
- Une **grille éditoriale** à 12 colonnes, utilisée avec des ruptures : texte décalé,
  image qui déborde de la grille, chevauchement maîtrisé texte / image, grandes marges
  assumées. Pas une suite de blocs de même largeur empilés.
- **Contraste d'échelle** : un titre d'affichage très grand (jusqu'à 6 rem, voir
  anti-patterns), des textes courants calmes, des détails petits et précis.
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
- **3 variantes du titre principal** proposées à l'étape 5 pour un test A/B futur.

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
| Densité : budget de texte tenu (`conventions.md` § 11), comptage fourni | 5 |
| Preuves et objections traitées, aucune fausse donnée | 10 |
| Textes : voix de la marque, zéro phrase creuse, cohérence texte / image | 10 |
| Mobile, accessibilité (contrastes, focus, cibles), légèreté | 10 |

**La densité, avec pénalité.** Budget dépassé (400 mots ou plus, plus de 9 sections, ou
une section de plus de 3 phrases) : « Densité » vaut 0, et la note perd en plus
**5 points** par tranche entamée de 50 mots au-delà de 400 et par section au-delà de 9.
Sans comptage fourni, « Densité » vaut 0. Une page qui revient au gabarit interdit
(`compositions.md`) plafonne « Mise en page » à 5.

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
