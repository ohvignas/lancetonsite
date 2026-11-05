---
name: maquette
description: 'Dessine la maquette du site sur un canevas Claude Design (créé depuis Claude Code, ou dans l''application Claude) et en version animée — toutes les pages de l''architecture, en desktop et mobile, d''après les wireframes, dans la charte et le style d''interface choisi ici, avec les vrais textes et les vrais médias — la fait critiquer, l''ajuste avec l''utilisateur (commentaires sur le canevas, ou retours dans la conversation quand il n''y a pas de canevas) jusqu''à sa validation. Étape 7 de Lance ton site ; le design system (étape 8) en est tiré une fois la maquette validée.'
when_to_use: '"maquette", "mockup", "dessine le site", "à quoi va ressembler le site", "page d''accueil en design", "Claude Design", "prototype", "style du site", "glassmorphism ou brutalism", "bento", ou /lancetonsite:maquette.'
argument-hint: "[accueil | toutes | page <nom> | critique | valider]"
---

# Maquette

**Équipe d'agents** : lancer ensemble, dès le début, tout ce que prévoit
`${CLAUDE_PLUGIN_ROOT}/commun/agents.md` pour cette étape (un agent Sonnet par source,
page ou pièce indépendante).

Lire `${CLAUDE_PLUGIN_ROOT}/commun/conventions.md` (introuvable : voir « Trouver les
fichiers du plugin » au début de ce fichier de conventions, ou chercher
`conventions.md` dans le dossier du plugin), et `${CLAUDE_PLUGIN_ROOT}/commun/parcours.md`
(rythme, document publié, porte de validation). **Budget : 12 min** — premier jet de
l'accueil montré vers 6 min, puis le tour rapide de critique en parallèle. Document
présenté : suivre le modèle `${CLAUDE_PLUGIN_ROOT}/commun/modeles/maquette.md`, version
courte par défaut.

La maquette **habille les wireframes validés** : pages, zonings et wireframes (04),
textes (05), médias (06), dans la charte (03) et le style d'interface choisi ici (§ 0 bis).
Elle montre le site avant d'écrire une ligne de code. Une fois validée, c'est la
**référence visuelle** : le design system (étape 8) en est tiré, puis Claude Code la
reproduira.

## Entrées

- `04-architecture.md` — liste des pages, zonings, action principale de chaque page ;
  et les **wireframes validés** (`04-wireframes/`) : la place et la taille de chaque bloc
  sont fixées, la maquette ne les redistribue pas (un écart se justifie dans `maquette.md`).
- `05-contenus/` — textes finaux. Aucun texte inventé, aucun « lorem ipsum ».
- `03-charte/` — couleurs, typos, logo, direction photo, `references.md` (gestes retenus).
  **Pas encore de design system** : il sera tiré de cette maquette (étape 8).
- La **composition** et le **style d'interface**, choisis au § 0 bis, et la fiche de la
  composition dans `${CLAUDE_PLUGIN_ROOT}/commun/compositions.md` : hero type, rythme,
  moment signature, gestes, médias, budget de mots.
- `06-medias/medias.md` et les fichiers — images, vidéos, logo (`03-charte/logo/`).
- `02-marque.md` (curseurs de voix) et `01-cadrage.md` (persona principal) pour la critique.

Un document manque : règle des conventions (§ 2). Un média manque : le **générer**
dans la direction photo (générateur : « Quel générateur » des conventions, fal d'abord ;
méthode : `medias`, « Générer, par défaut » ; coût pris sur le budget IA unique),
banques libres seulement en repli, avec une annotation hors de la page — jamais un
rectangle vide ou hachuré.

**Le niveau visé** : `${CLAUDE_PLUGIN_ROOT}/commun/niveau-agence.md` (le lire
maintenant). La maquette est en **haute fidélité** : grandes images, grille éditoriale,
mouvement réel. C'est ce que l'utilisateur achète ; une maquette sage en colonnes avec
des boîtes grises ressemble à une ébauche, même avec de bons textes.

## Où dessiner

- **Dans Claude Code** — le cas normal : créer un design
  Claude Design depuis Claude Code (artifact de type Design, comme la commande
  `/design`) s'il est disponible.
  - **Sans outil Artifact** (repli, conventions § 0) : la maquette est le prototype HTML
    du kit (`07-maquette/prototype/`) et ses pages (`07-maquette/pages/`), ouverts dans
    le navigateur, **plus** les captures (`07-maquette/captures/`, tailles des
    conventions) **plus** la liste des retours dans `maquette.md` (rubrique « Retours » :
    date, retour de l'utilisateur, ce qui a été changé). Ne pas promettre de commentaires
    sur un canevas.
  - Garder une **copie de la source** du design dans `07-maquette/source/` après chaque
    série de retouches : c'est elle que l'étape 10 retrouvera. Une seule version fait
    foi : celle du design ; la copie est mise à jour, jamais modifiée à part.
  - Le type Design peut déconseiller de « vérifier » le rendu : les captures et la
    critique (§ 4) se font quand même, sur la copie locale (Playwright, conventions §
    « Captures d'écran »).
- **Dans l'application Claude (Claude Design)** — si la conception s'y fait. Créer un design (type **Design**)
  nommé « {{Projet}} — maquette », avec les couleurs, les polices et le logo de la charte
  (`theme.css` du § 0 bis). Le design system Claude Design se crée à l'étape 8, à partir
  de la maquette validée.

## 0. Vérifier la cohérence avant de dessiner

Relire 03, 04 (zonings et wireframes), 05 et 06 ensemble et lister les contradictions de chiffres et de formats
(nombre de dates affichées, prix, durées, proportions des images, ordre des sections).
Les corriger dans les documents — en faisant trancher l'utilisateur si c'est un choix —
**avant** de dessiner. Vérifier aussi que **chaque objectif du cadrage** (réserver,
demander un devis, acheter, contacter…) a son point d'entrée sur l'accueil ; un objectif
sans entrée : l'ajouter au zoning et le dire.

Ouvrir `07-maquette/maquette.md` dès maintenant, en `brouillon` (modèle
[templates/maquette.md](templates/maquette.md)) : on y note les écarts au fil des
retouches ; il passe en `validé` à la fin (§ 6).

## 0 bis. Le style d'interface et la composition

La charte fixe l'identité, les wireframes la place des blocs ; restent deux choix faits
**ensemble**, ici, avant de dessiner : la **composition** de page (la mise en scène) et
le **langage d'interface** (densité, formes, profondeur, mouvement).

- **Les références** : reprendre le tableau des gestes retenus de la charte
  (`03-charte/references.md`), sans nouvelle recherche.
- **La composition** : lire `${CLAUDE_PLUGIN_ROOT}/commun/compositions.md`, prendre la
  ligne de la cible, la confronter à la marque et à la composition du projet précédent
  (« La règle du choix »). Retenir la recommandée, avec son schéma, son hero type et son
  moment signature ; celle de contraste en une ligne dans `maquette.md`. Jamais le
  gabarit interdit. Noter le choix dans `00-etat.md` (« Composition », avec la précédente).
- **Le style** : chercher dans
  `${CLAUDE_PLUGIN_ROOT}/skills/design-system/data/styles.csv` (mots clés en anglais :
  `python3 ${CLAUDE_PLUGIN_ROOT}/skills/design-system/scripts/chercher.py styles "raw editorial natural"`,
  ou le skill `ui-ux-pro-max`). Recommander **un** style compatible avec la charte, les
  deux autres en une ligne chacun (nom, pourquoi, risque). Signaler franchement un style
  qui ferait « généré par IA » pour ce projet (glassmorphism décoratif, aurora, néon,
  dark mode « tech » par défaut, bento partout).
- **Le thème provisoire** : `07-maquette/prototype/theme.css`, un bloc `@theme`
  Tailwind v4 écrit d'après la charte (couleurs, polices, échelle typo en `clamp()`,
  espacements, rayons, courbes et durées du style retenu). La maquette ne s'écrit qu'avec
  lui ; l'étape 8 le reprend et le formalise en tokens. Interlettrage des grands titres :
  règle de `design-system` § 2 (« Typographie »).

L'utilisateur change de composition ou de style à la porte de validation, sans question
à part (`parcours.md` § 1).

## 1. L'ordre des pages

**Par défaut, toutes les pages de l'architecture** (`04-architecture.md` § 2), ordinateur
et téléphone. L'ordre :
1. la **page d'accueil**, complète et animée : elle fixe le système (montrée tôt, § 2) ;
2. dès qu'elle tient debout, **les autres pages en parallèle** : un agent
   `maquettiste-page` par page (Sonnet ; lancés ensemble dans un même message), chacun avec le zoning de sa
   page, son wireframe, ses textes (`05-contenus/`), `theme.css` et l'accueil comme modèle. La page
   de l'action principale d'abord si on doit choisir ;
3. un exemplaire de chaque **gabarit** répété : un article et la liste des articles,
   une fiche produit et le catalogue, si l'architecture les prévoit ;
4. les pages légales et la 404 : un seul gabarit texte, rempli.

Un site d'une seule page n'existe que si l'architecture n'en compte qu'une. Sans
sous-agents (dans Claude) : les pages l'une après l'autre, en réutilisant les sections
de l'accueil.

Annoncer le plan en une ligne (« l'accueil d'abord, environ 6 minutes pour un premier
jet, puis les N autres pages en parallèle »). Une page validée sert de modèle aux suivantes : on ne
refait pas tout à chaque page.

## 2. La page d'accueil, desktop et mobile

- **La page suit son wireframe et sa composition** : les blocs du wireframe validé
  (`04-wireframes/accueil.html`), à leur place, mis en scène selon la fiche de
  `compositions.md` ; chaque section
  porte ses **vrais textes** copiés de `05-contenus/accueil.md` (titre, sous-titre,
  boutons, preuves) et ses **vrais médias** (manifeste 06, avec leur texte alternatif).
- **Une page complète** : toutes les sections attendues du zoning, dans la fourchette
  de mots et de sections, 3 phrases au plus par bloc, plus de visuels que de texte
  (conventions § 11). Le détail va sur sa page dédiée.
- **Le catalogue et les articles avec de vrais contenus.** Si le zoning a une section
  produits ou articles (`architecture` § 5), elle est maquettée en vrai : les vrais
  noms de produits, leur photo (générée dans la direction photo en attendant), leur
  prix et l'action réelle (« Ajouter au panier », « Réserver pour samedi ») ; des
  cartes d'articles avec une date, un titre et un sujet tirés du métier. Un prix ou une
  date à confirmer reste lisible, souligné en pointillé et expliqué en annotation ;
  jamais « Produit 1 » ni « Titre de l'article ».
- **La barre de navigation, le hero et les blocs d'action** suivent leurs règles
  (`niveau-agence.md` § 3) : modèle de nav des skills, 3 à 5 liens et un bouton, pas de
  numéro de téléphone ; hero sans grand vide ; formulaire en deux colonnes sur
  ordinateur.
- Uniquement les couleurs, typos, espacements et rayons de `theme.css`, et les mêmes
  composants d'une section et d'une page à l'autre (un bouton principal, une carte, un
  champ) : c'est ce qui permettra d'en tirer le design system. Un besoin nouveau : l'ajouter
  à `theme.css`, jamais une valeur isolée dans une page.
- Montrer **les deux largeurs** : ordinateur et téléphone, et contrôler **toutes** les
  tailles de la liste (conventions § 8, « Captures d'écran », tablette comprise). Le
  mobile n'est pas une version réduite : navigation, ordre des blocs et action
  principale pensés pour le pouce.
- Les états visibles comptent : menu ouvert, survol et focus des boutons, formulaire en
  erreur, FAQ dépliée.
- Le hero est **celui de la composition** (vidéo plein cadre, objet seul, couverture,
  phrase-affiche, œuvre, interface vivante, matière annotée) ; jamais le gabarit
  interdit « pastille + grand titre à gauche + 2 boutons + réassurance + 3 cartes ».
  Des sections de formes différentes (niveau-agence § 3), pas une pile de blocs de même
  largeur.
- **Le mouvement se montre** : la maquette de l'accueil est aussi une **page HTML
  animée** (`07-maquette/prototype/accueil.html`), avec les **gestes du kit**
  [templates/prototype/](templates/prototype/). **Le kit fournit les gestes, pas la
  structure** : son `index.html` est une démonstration de gestes, **pas un gabarit à
  remplir**. On copie `gestes.js` (avec `generer-images.py`) dans
  `07-maquette/prototype/`, et le `@theme` vient de `07-maquette/prototype/theme.css` (§ 0 bis) ;
  d'`index.html`, on ne reprend que le `<head>` technique (scripts aux versions exactes,
  anti-flash `js-attente`, règles CSS des états des gestes). **La structure se compose
  d'après la fiche de `compositions.md`** : son hero, son rythme, son moment signature,
  ses gestes. Chaque geste se branche par un attribut `data-*` : API complète et « quel
  geste pour quelle section » dans [GESTES.md](templates/prototype/GESTES.md). Avant de
  composer, ouvrir les deux landing pages d'exemple validées par un client exigeant
  ([templates/exemples/](templates/exemples/README.md) : Brume en « immersif plein
  écran », Vigie en « produit centré », deux compositions opposées) pour viser ce niveau
  de finition, pas pour copier leur structure. Pour le moment signature ou un fond de hero, piocher dans la bibliothèque [templates/elements/](templates/elements/README.md) (40 éléments : verre, sphère de cartes, galerie infinie, scènes de défilement, plugins GSAP, micro-interactions…), [templates/fonds-hero/](templates/fonds-hero/README.md) (14 fonds : shaders WebGL, canvas, CSS pur, vidéo) et [templates/elements-3d/](templates/elements-3d/README.md) (12 éléments Three.js avec repli sans WebGL ; objet produit, photo et animation faits dans Blender : skill `objets-3d`), chacun avec sa fiche (variables, prompt, accessibilité, mouvement réduit, poids) ; un seul fond animé par page. Outils de production (Remotion, Theatre.js, RIFE…) : [templates/outillage/](templates/outillage/README.md). Chaque `<img>` porte son `data-prompt` (prompt + bloc de style
  de 07) et son `data-ratio` : les images manquantes se génèrent d'un coup
  (`python3 generer-images.py accueil.html --style style.txt`, ou l'outil MCP
  `generate-image` emplacement par emplacement). Le kit est écrit en **Tailwind CSS v4**
  (`@tailwindcss/browser` depuis un CDN, `@theme` de `theme.css`) avec **GSAP** (ScrollTrigger,
  SplitText) et **Lenis**, versions exactes : **un geste par type de section** pris dans
  le catalogue de `niveau-agence.md` § 4, une interaction par section et le moment
  signature de la composition ; chaque geste noté dans `maquette.md` (où, durée, courbe,
  déclencheur, version « mouvement réduit ») pour que l'étape 8 le reprenne. Captures des étapes de chaque
  narration épinglée, et si possible une courte vidéo du défilement (Playwright
  `recordVideo`). Dans Claude
  Design, l'animer si l'outil le permet, sinon livrer ce prototype à côté. Les autres
  pages : le mouvement décrit en annotation suffit.
- **La page reste propre.** Aucun mot interne dans la page : pas de `[À PROUVER]`,
  `[hypothèse]`, numéro d'étape, nom d'outil ni « exemple si… ». Ce qui manque
  (photo, nom, chiffre) s'affiche en **annotation hors de la page** (pastille ou bulle
  sur le côté du canevas), en mots simples : « Il me manque le nom des trois
  restaurants ». Un nom ou un chiffre à confirmer reste lisible dans la page, avec un
  repère discret (soulignement pointillé) expliqué une fois en annotation.
- Textes à la personne choisie (`00-etat.md`, « Qui parle sur le site ») : une
  personne seule dit « je », jamais son prénom à la troisième personne.
- **Titres jamais coupés sur un trait d'union** (« e-mail », « peut-être »,
  « Saint-Malo ») : chaque mot à trait d'union d'un titre est dans un
  `<span class="whitespace-nowrap">`, ou porte le trait d'union insécable U+2011 si la
  police a ce glyphe (règle et contrôle : conventions § 12).
- **Mobile : l'action principale se voit dans le premier écran** (taille « premier
  écran mobile » des conventions), sans défiler ; une grande photo ne doit pas la
  repousser plus bas.

## 3. Montrer et ajuster

**Montrer tôt.** Dès que le premier jet de l'accueil tient debout (vers 6 min),
le publier (`parcours.md` § 3 : canevas Claude Design, ou prototype animé publié en
page) en disant « premier jet, la critique tourne en parallèle », puis lancer la
critique du § 4. Ne pas attendre la fin des contrôles pour montrer quelque chose.

Présenter la page en une phrase, puis expliquer une fois comment agir :
- **commenter** directement un élément du canevas (« ce titre est trop long ») ;
- **modifier** soi-même un texte ou un espacement sur le canevas ;
- ou répondre ici.

Sans canevas (repli « Où dessiner ») : donner le chemin du prototype à ouvrir et montrer
les captures ; seule la troisième voie existe. Chaque retour est noté dans `maquette.md`
(« Retours ») avec ce qui a été fait.

**Envoyer la maquette au client, sans canevas.** Aucun lien à partager : envoyer les
captures (ordinateur et téléphone, nommées `01-…`, `02-…` dans l'ordre de la page) en
**dossier zippé** ou en **un PDF**, une capture par page
(`magick 07-maquette/captures/*.png 07-maquette/maquette.pdf`, sinon Pillow en Python).
Pour le mouvement, joindre le prototype zippé (`accueil.html` s'ouvre dans un
navigateur). Noter dans `maquette.md` ce qui a été envoyé, et quand.

**Les questions mises de côté.** Au premier passage, poser en **une** question à choix
multiples tout ce qui attend dans « À confirmer en voyant la maquette » (`maquette.md`),
chaque point avec l'hypothèse affichée sur la page. Par défaut, y ajouter le **test
de voix** de la marque (`marque`, § 4) : « Ces trois phrases de la page, est-ce que tu
les dirais à un client ? »

Une seule question à la fois (« Qu'est-ce qui te gêne le plus sur cette page ? », avec
2 à 4 pistes concrètes). Après chaque série de retouches, remontrer la page.

**Règle de vérité.** Une retouche de la maquette qui change un **texte** se reporte dans
`05-contenus/` ; une retouche qui change une **couleur, une taille ou un composant** se
reporte dans `07-maquette/prototype/theme.css` (et dans `03-charte/` si elle touche à
l'identité). Les documents et la maquette ne
doivent jamais diverger : Claude Code construira à partir des deux. Chaque report est
noté dans `07-maquette/maquette.md`, rubrique « Écarts reportés ».

## 4. La critique (obligatoire, avant de présenter comme terminé)

**Un tour rapide, par défaut** (`parcours.md` § 1, levier 6) : le relecteur (point 2)
et la boucle persona (point 7) sont lancés **ensemble, en arrière-plan**, sur le
premier jet, avec la consigne « tour rapide, 5 minutes ». Pendant ce temps : le
comptage des mots et les contrôles du point 4. Appliquer les corrections gratuites,
republier au même lien. Les tours suivants seulement si l'utilisateur les demande.

1. `impeccable` (installé, ou MCP `ui-skills` → `get_skill` `pbakaus-critique`) ou la
   grille `${CLAUDE_PLUGIN_ROOT}/skills/design-system/references/anti-patterns.md`.
2. Relecture indépendante : agent `relecteur` dans Claude Code ; dans Claude (pas
   d'agents), se relire en changeant de posture, avec ses points (conventions § 6).
   Lui passer les captures aux tailles des conventions **et la série de 8 à 12
   captures prises au fil du défilement** (images extraites de la vidéo du défilement
   si elle existe) : sans elle, il ne voit pas le mouvement (conventions § 6, « Pour un
   rendu visuel »). Lui donner aussi le nom de la composition et le comptage des mots (point 4, à faire
   avant de le lancer).
   Consigne : « Trouve tout ce qui fait généré par IA, et tout ce qu'un concurrent
   pourrait publier tel quel. La page suit-elle sa composition ? »
3. **Test des 5 secondes** : en regardant le haut de l'accueil, le persona principal
   comprend-il ce qu'on vend, pour qui, et quoi faire ? Sinon, reprendre le haut de page.
4. **Contrôles de mise en page**, sur les captures (tailles des conventions) :
   - **comptage des mots (obligatoire)** : script des conventions § 11 sur
     `accueil.html` ; mots, sections et écrans notés dans `maquette.md` (« Densité »).
     Trop bavarde : couper, ou déplacer le détail vers sa page. Trop maigre : ajouter
     les sections attendues qui manquent (conventions § 11). Puis recompter ;
   - **la composition est suivie** : hero type, rythme et moment signature de sa fiche
     (`compositions.md`) ; rien du gabarit interdit ;
   - aucun mot interne visible dans la page (voir § 2) ;
   - pas de grand vide : une colonne ou une zone blanche plus haute que la moitié de
     l'écran à côté d'un bloc est une erreur de grille, sauf choix assumé et noté ;
   - **hero équilibré** à 1440 × 900 et à 1280 × 720 : pas de grand vide au milieu,
     texte, visuel et action se répondent (`niveau-agence.md` § 3) ;
   - **typographie d'affichage** : contrôle à l'œil des grands titres à 1440 et 375,
     aucune lettre qui en touche une autre (`design-system` § 2, « Typographie ») ;
   - **responsive réel** : chaque page maquettée capturée à chacune des tailles de la
     liste (conventions § 8), aucun titre cassé, coupé, trop long ou trop grand ;
   - **aucun titre coupé sur un trait d'union** (« e- / mail ») : script de contrôle
     des conventions § 12, à chaque taille ; la liste doit être vide ;
   - **navigation et blocs d'action** : la barre et le formulaire suivent
     `niveau-agence.md` § 3, aucun numéro de téléphone en vrac ni en gros ;
   - **catalogue et articles** présents si le zoning les prévoit, avec de vrais
     contenus (§ 2) ;
   - **assez d'images** pour le métier (`medias`, « Combien d'images ») ; plans et
     cartes en illustration générée, pas en SVG approximatif ;
   - **objet 3D** : la dernière image de l'animation montre la face avant, logo
     visible (`niveau-agence.md` § 2 bis) ;
   - l'action principale visible dans le premier écran mobile ;
   - chaque objectif du cadrage a son entrée ;
   - la voix (« je », « nous »…) tenue partout ;
   - **écrans bas** : une capture du premier écran aux deux tailles « écran bas » et
     « premier écran mobile » des conventions ; le texte du hero ne déborde pas de son
     fond, rien ne passe sous la ligne de flottaison qui devrait être au-dessus ;
   - **éléments posés par-dessus** (étiquette, pastille, carte sur une image) : sur
     téléphone, ils ne recouvrent aucun titre ni texte ; sinon, les remettre dans le flux ;
   - **variété des images** : pas plus d'un tiers des images sur le même sujet ou le
     même cadrage (ex. des mains au travail) ; chaque image illustre son texte ;
   - **documents amont à jour** : si la maquette change une règle de la charte, un
     wireframe ou un texte de `05-contenus/`, mettre le document à jour (avec l'accord du client), pas
     seulement le noter dans `maquette.md`.
5. Accessibilité visible : contrastes (`python3 ${CLAUDE_PLUGIN_ROOT}/skills/charte/scripts/contraste.py`
   sur toute couleur ajoutée), cibles tactiles ≥ 44 px, focus visible, texte ≥ 16 px sur mobile.
6. **La note sur 100** (niveau-agence § 6), donnée par le relecteur sur les captures et
   le prototype animé. Seuil **85** tant que les médias sont provisoires, **90** avec
   les vraies photos et les vraies preuves. En dessous : appliquer les corrections
   gratuites, **refaire les captures après la dernière correction**, et présenter avec
   la note ; un nouveau tour (3 au plus) seulement si l'utilisateur le demande. Noter la
   note de départ, la note finale et les changements dans `maquette.md`.
   - **À 88** : avec des médias provisoires, le seuil est atteint. Présenter, avec la
     note et la liste de ce qui bloque 90 (souvent : vraies photos, vrais avis), notée
     dans `maquette.md` (« Ce qui manque encore ») ; le 90 se revérifie à la construction. Avec les vraies photos,
     88 reste sous le seuil : corriger encore.
   - **Sous le seuil** : tours `controle` jusqu'au seuil, 3 tours au plus, ou arrêt
     anticipé si ne restent que des points client (procédure, « Quand s'arrêter »).
     Puis présenter avec la note et ce qui bloque. Pas de quatrième tour.
7. **La boucle persona (obligatoire)** : `${CLAUDE_PLUGIN_ROOT}/commun/boucle-persona.md`.
   L'agent `client-persona` devient le client (le patron qui a payé 25 000 €, puis
   l'acheteur du cadrage), utilise le prototype dans un vrai navigateur, le note sur
   100 et rend un plan de corrections ; on corrige. Tour 1 en mode `rapide`, tours 2 et 3
   en mode `controle` (environ 5 min chacun), `complet` sur demande, 3 tours au plus ;
   prérequis `captures.py --verifier`, fiche client d'une page, corrections par lot,
   médias IA en arrière-plan : tout est dans la procédure. Dans Claude (pas d'agents) : jouer soi-même le client en changeant de posture,
   avec la même grille et les mêmes trois fichiers. Notes de chaque tour et verdict
   dans `maquette.md` (« Boucle persona ») et `00-etat.md`.
8. Présenter avec la liste des corrections faites, la note du relecteur, les notes de
   la boucle persona (ex. « 71 → 83 → 88 ») et le verdict du client simulé.

## 5. Les autres pages

Faites par défaut (§ 1). Chaque page reprend les sections déjà validées de l'accueil
(même menu, même pied de page, mêmes composants) et suit son propre zoning : jamais une
copie de l'accueil avec d'autres titres. Pour un site de plus de 8 pages : un
exemplaire de chaque **gabarit** (une fiche produit, un article), et le dire. Chaque
page passe le même contrôle (§ 4, captures aux tailles d'écran, aucun débordement) et
la liste des pages maquettées figure dans `maquette.md`.

## 6. La validation

Porte de validation (`parcours.md` § 4), quand la maquette est publiée à jour avec sa
note : 3 à 5 points (note, verdict du client simulé, ce qui bloque encore, pages
maquettées), puis la question (outil de question à choix si disponible) : « La maquette
est-elle validée ? C'est elle que Claude Code va reproduire. » — options « Valider et
passer à l'étape suivante » / « Modifier ». Une ligne propose d'approfondir (2ᵉ tour de
critique).

Seul un « oui » clair valide. Jamais le design system sans lui. Puis compléter `projet-site/07-maquette/maquette.md` et le
passer en `validé` : lien du design (ou chemin du prototype), liste des pages et
gabarits, décisions de mise en page, interactions et animations, écarts reportés dans
05 et dans `theme.css`, médias manquants. Dans Claude, si possible, exporter aussi des captures PNG
des pages (desktop et mobile) dans `07-maquette/captures/`.

Mettre à jour `00-etat.md`. Prochaine étape : `/lancetonsite:design-system` — tirer de
la maquette validée les tokens et les composants que la construction utilisera.
