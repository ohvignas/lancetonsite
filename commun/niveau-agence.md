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
  moitié de l'écran) : le métier, le lieu, le produit, le geste. Un hero texte seul est
  l'exception : un parti pris typographique fort qu'il faut justifier.
- Au moins **une image pleine largeur par page longue**, et un rythme d'images de tailles
  différentes (une grande, deux moyennes, un détail serré). Pas de vignettes timides.
- Cadrages d'auteur : très près (la matière, les mains), très large (le lieu), en
  plongée. Une même lumière, un même grain sur tout le site (médias, « bloc de style »).
- **La maquette n'a jamais de rectangle vide ou hachuré.** Tant que les vraies photos ne
  sont pas là, on **génère** les images avec OpenRouter dans la direction photo (voir
  `medias`, « Générer, par défaut ») ; une annotation hors de la page dit qu'elles
  attendent les vraies photos.
- Une vidéo de fond (boucle 5 à 8 s, muette, < 3 Mo, image d'affiche) dès que le métier
  a un geste qui se filme : c'est le plus fort signal « site d'agence ».

## 2 bis. Créer sans limite (OpenRouter, fal)

Avec OpenRouter et fal, on fabrique ce que la direction artistique demande : rien n'est
« trop ambitieux » pour un petit budget. Le catalogue :

| Création | Outil | Usage sur le site |
|---|---|---|
| Photos d'ambiance, de matière, de lieu | OpenRouter `generate-image`, fal | hero, grandes images, galeries |
| Objets détourés (PNG transparent) | génération + détourage fal (`remove background`) | couches de profondeur qui bougent avec la souris ou le défilement |
| Textures, motifs, fonds de matière | génération | fonds de sections, découpes, masques |
| Illustrations dans le style de la charte | génération avec image de référence | pictos d'auteur, cartes, schémas illustrés |
| Vidéos en boucle (5-8 s) | OpenRouter `generate-video`, fal | hero, bandes, cinémagraphes |
| Séquences d'images façon Apple | vidéo générée → images (`ffmpeg -i v.mp4 -vf fps=24 f-%04d.webp`) | objet qui tourne, se construit, se cuit, au défilement (`data-sequence`) |
| **Objets 3D** (GLB) | fal, modèles image → 3D (`recommend_model` « image to 3D ») à partir d'une image générée | objet du métier qu'on fait tourner au défilement ou à la souris (`<model-viewer>` ou Three.js) |
| Sons d'ambiance | fal | coupés par défaut, seulement si la marque le porte |

Règle : chaque création sert l'histoire de la marque (le métier, le produit, la
matière), jamais un effet de remplissage. 3D : modèle optimisé (`npx
@gltf-transform/cli optimize in.glb out.glb --compress draco`), moins de 3 Mo, image
d'affiche, pas de rotation automatique en mouvement réduit.

## 3. La mise en page

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
| Chiffres qui comptent | seulement des chiffres réels et sourcés |
| Changement de fond | la couleur de fond bascule d'une section à l'autre en douceur |

### Interactions

| Geste | Usage |
|---|---|
| Bouton magnétique | l'action principale attire le curseur (desktop) |
| Image qui suit le curseur | au survol d'une liste (dates, services, réalisations) |
| Cartes en léger relief | inclinaison 3D douce ou zoom de l'image au survol |
| Curseur personnalisé | contextuel (« voir », « glisser ») ; jamais sur mobile |
| Bande défilante | savoir-faire, lieux, références réelles ; ralentit au survol |
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
- **Mobile** : les narrations épinglées restent courtes (une hauteur d'écran et demie
  au plus) ; pas de curseur, pas de survol ; l'action principale reste à portée.
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
  réduit compris. On part toujours de lui.

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
- Chaque objection du cadrage traitée quelque part (FAQ, garanties, prix clairs).
- **3 variantes du titre principal** proposées à l'étape 5 pour un test A/B futur.

## 6. La grille sur 100

Notée par un regard qui n'a pas fait le travail (agent `relecteur` ; dans Claude :
relecture en changeant de posture), sur les captures 1440 et 375 et la maquette animée :

| Critère | Points |
|---|---|
| Direction artistique : reconnaissable sans le logo, cohérente avec la charte | 15 |
| Images : grandes, vraies ou fidèles à la direction photo, rythme de tailles | 15 |
| Mise en page : grille éditoriale, ruptures, contraste d'échelle, pas de vide raté | 15 |
| Mouvement : narration et interaction à chaque section, signature, fluide, mouvement réduit respecté | 10 |
| Clarté en 5 secondes et force de l'action principale | 15 |
| Preuves et objections traitées, aucune fausse donnée | 10 |
| Textes : voix de la marque, zéro phrase creuse, cohérence texte / image | 10 |
| Mobile, accessibilité (contrastes, focus, cibles), légèreté | 10 |

Seuil : **90 / 100**. En dessous : corriger, refaire les captures, renoter. Trois tours
au plus ; au-delà, montrer la note et ce qui bloque (souvent : pas de vraies photos).
Noter la note de départ, la note finale et la liste des changements dans le document de
l'étape.
