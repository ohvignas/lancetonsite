# Journal des versions

## 1.6.3 — 2026-11-04

**Première boucle persona complète sur les deux exemples.** Un client simulé neuf à
chaque tour, dans un vrai navigateur, jusqu'au « Oui, ça vaut mes 25 000 € » (seuil 85,
médias provisoires) :

| Exemple | Tours | Mots |
|---|---|---|
| Brume (immersif plein écran) | 79 → **86** « Oui » | 244 |
| Vigie (produit centré) | 77 → 75 → **86** « Oui » | 363 |

- **Brume** : sachet en photo détourée à la place de la 3D, minuteur de torréfaction
  sur image assombrie puis vidage à 12:00, deux avis, coffret et envoi unique (port
  4,90 €), fenêtre « Composer » qui part du café choisi, dernier écran en dégradé
  (contraste ≥ 5,2:1), croix du tiroir toujours visible, cibles de 44 px. Prix et port
  inventés, marqués « à fixer par la cliente ».
- **Vigie** : photo d'offre et capteur 3D enfin du même objet, palier en fonte construit
  en code, courbe avec axe S-8 → S+3, vrai SMS daté, gros plans rendus depuis la scène,
  lien prix qui tombe sur le prix et le bouton, liens des moments effacés qui ne
  captent plus le clic, mentions légales sur une page à part (structure complète,
  valeurs client entre crochets), 7 sections.
- Ce qui dépend du vrai client (preuve nommée, vraies photos, CGV, SIRET) est listé
  dans « Ce qui manque encore » de chaque `NOTES.md`.

**Le comptage de mots (`conventions.md` § 11) sous-comptait.** Trouvé par la boucle :

- Une FAQ en `<details name="…">` (accordéon exclusif) n'était comptée qu'à une
  réponse sur trois. Le script retire `name` avant d'ouvrir.
- Les titres découpés en lettres et les compteurs défilants (texte en `aria-label`,
  morceaux en `aria-hidden`) étaient retirés du total. Le script compte l'étiquette
  une fois.
- Les enveloppes qui contiennent des sections (`div.carnet`, `pin-spacer`) sont
  dépliées : le détail par section reste lisible.
- Effet mesuré : Vigie 394 → 431 mots (puis ramenée à 363), Brume 206 → 244.

**Kit** (`prototype/GESTES.md`) : ordre `-webkit-backdrop-filter` puis
`backdrop-filter` dans une CSS compilée par Tailwind 4 (sinon Chrome n'a pas de flou) ;
liens d'un moment effacé en `pointer-events: none` dans une scène épinglée.

## 1.6.2 — 2026-11-04

- README : deux modèles de prompt à copier pour démarrer, un pour un premier projet et
  un pour un projet existant (site à refaire ou marque déjà là). Lance ton site saute
  les questions déjà répondues.
- `demarrer` (§ 4) : le premier message est lu d'abord ; ce qui y est donné est noté
  dans `00-etat.md` et `sources/`, résumé en 3 lignes, et seules les questions restées
  sans réponse sont posées. `conventions.md` § 3 : jamais une question déjà répondue.

## 1.6.1 — 2026-11-04

- README : nouvelle section « Des exemples, pas un gabarit », avec les captures de
  Brume (immersif plein écran) et Vigie (produit centré), les liens vers les premières
  versions et vers `exemples/README.md`.

## 1.6.0 — 2026-11-04

**La boucle persona devient une étape du plugin.** L'IA teste et améliore son propre
travail, comme sur les projets de test (Brisant 71 → 83 → 88, Vigie 85 → 93).

- **Nouvel agent `client-persona`** : il devient le client (le patron qui a payé
  25 000 €, puis l'acheteur du cadrage), ouvre la page dans un vrai navigateur
  (ordinateur, téléphone, 40 tabulations au clavier, mouvement réduit, formulaires,
  calculateurs), la note sur 100 et rend `test-report.md`, `scores.md` (avec le verdict
  « Oui, ça vaut mes 25 000 € » ou « Pas encore ») et `fix-plan.md`.
- **`commun/boucle-persona.md`**, source unique : quand (étape 8 sur le prototype, seuil
  85 ou 90 ; étape 11 sur le site construit, seuil 90), le tour (agent neuf à chaque
  tour, plan du tour précédent à vérifier, jamais les rapports du relecteur), l'ordre
  des corrections (gratuites, puis générations dans le budget accordé, puis ce qui
  revient au client), 3 tours au plus, le statut `validé (simulé)`.
- Branchée dans `maquette` (§ 4, point 7, obligatoire), `passation` (vérifiée avant de
  coder), `construire` (recette, point 7), `conventions.md` § 6, le modèle de
  `maquette.md` (rubriques « Boucle persona » et « Retours sur le plugin ») et
  `00-etat.md` (ligne « Boucle persona »).
- README : la boucle expliquée, seuils 85 / 90 corrigés (il restait « sous 90 »).

**Les premières versions de Brume et Vigie sont gardées**
(`skills/maquette/templates/exemples/premieres-versions/`) : les pages validées en
1.4.2 (94 et 93 sur 100), comme référence de dosage des gestes sur une page longue et
d'avant / après. Leur README dit ce qu'on n'y copie pas : 1 194 et 1 543 mots (budget :
moins de 400), et un hero parti du gabarit interdit par défaut.

## 1.5.0 — 2026-11-04

Des pages qui ne se ressemblent plus, et moins de texte. Retour client : toutes les
maquettes avaient le même squelette (hero photo, pastille, grand titre à gauche, 2
boutons, réassurance, puis 12 à 15 sections chargées de texte).

**Huit compositions de page** (`commun/compositions.md`)
- Immersif plein écran, produit centré façon Apple, éditorial magazine, typographique
  brutaliste, récit horizontal, galerie ou portfolio, interface en démonstration,
  artisanal ou carnet. Pour chacune : principe, cibles, hero type, rythme, moment
  signature, gestes du kit, médias, budget de mots, schéma, et son cliché.
- Table « cible → 2 compositions » (par défaut et contraste) pour 9 cibles.
- Règle du choix : à partir de la cible et de la marque, jamais par défaut ; deux
  projets successifs jamais sur la même (ligne « Composition » de `00-etat.md`) ; le
  gabarit « pastille + grand titre à gauche + 2 boutons + réassurance + 3 cartes »
  interdit comme structure par défaut.
- Design system (étape 6) : la composition se choisit avec le style, deux schémas
  proposés, l'utilisateur tranche. Maquette (étape 8) : la page suit sa composition ;
  le kit fournit les gestes, pas la structure (on copie `gestes.js` et le `@theme`,
  `index.html` n'est qu'une démonstration, ce que dit désormais son en-tête).

**Densité moyenne : un budget de texte** (`commun/conventions.md` § 11, source unique)
- Accueil : 7 à 9 sections, 3 phrases au plus par section, titres de 4 à 10 mots, moins
  de 400 mots visibles menus et pied de page compris, environ 10 écrans. Le détail (FAQ
  complète, caractéristiques, tarifs) va sur des pages dédiées.
- Comptage obligatoire à la critique de la maquette et du site construit (script
  Playwright fourni : mots par bloc, sections, écrans).
- Repris dans l'architecture (zoning de 7 à 9 blocs), les contenus (écrire court dès
  l'étape 5, `mots_visibles` en tête de page) et la grille sur 100 : nouveau critère
  « Densité » (5 points, pris sur « Clarté »), pénalité au-delà du budget.

**Relecture**
- Relecteur : nouveau contrôle « composition et densité » ; gabarit interdit ou budget
  dépassé = **majeur**.
- Grille anti-« IA » : le gabarit de hero vu partout et la page-catalogue de 15
  sections sont bloquants.

**Exemples refaits**
- Brume (B2C) en **immersif plein écran**, Vigie (B2B) en **produit centré** : deux
  compositions opposées, avec les mêmes gestes du kit.

## 1.4.2 — 2026-11-04

- **Clavier** : les apparitions au défilement (`data-intro`, `data-reveal`,
  `data-reveal-item`, étapes empilées sur mobile) jouent sur l'opacité, plus sur
  `visibility`. Liens, boutons et questions de la FAQ restent atteignables par Tab avant
  d'être apparus ; un élément atteint au clavier s'affiche tout de suite. Corrigé dans le
  kit et dans les deux exemples, vérifié par tabulation à 1440 et 375 px (tout est
  atteint, hors boutons radio d'un même groupe, parcourus aux flèches).

## 1.4.1 — 2026-11-04

Les 11 derniers points du test « Brisant » (n° 37 à 47).

- **Seuils de la note sur 100** (`niveau-agence.md` § 6) : 85 pour une maquette aux
  médias provisoires, présentée avec la liste de ce qui bloque 90 ; 90 revérifié à la
  construction avec les vraies photos et les vraies preuves. Au bout de 3 tours, on
  présente quand même, avec la note et ce qui bloque.
- **Captures** : images différées forcées en chargement immédiat avant toute capture
  (conventions, « Captures d'écran ») ; le relecteur ne note pas une case vide due au
  chargement.
- **Kit de maquette** : dans `data-steps`, une fiche HTML entre en fondu, sans zoom ;
  option `data-steps-reduit="dernier"` pour des étapes cumulatives (un seul état final
  en mouvement réduit). Testé à 1440 × 900 et 375 × 667, en mouvement réduit.
- **Médias** : dépôt signé fal pour une référence locale (`upload_file` → `curl` →
  `verify_upload`) ; `optimiser-medias.sh` passe par ffmpeg → PNG → `cwebp` / `avifenc`,
  le dit quand un encodeur manque, accepte `.png` et `.jpg` et signale un format qui ne
  correspond pas à l'extension.
- Statut `validé (simulé)` quand un agent joue le client ; sans canevas, la maquette
  part au client en dossier ou en PDF ; 3D à fond perdu avec masque côté texte ;
  chiffres d'exemple des contenus croisés avec le cadrage.

## 1.4.0 — 2026-11-04

Tout dans Claude Code, deux landing pages de référence validées par des clients
exigeants, un kit de maquette refait, et les corrections d'un test complet sur un projet
fictif (planches de surf haut de gamme).

**Tout dans Claude Code**
- README, démarrage, PRD et passation réécrits : le parcours se fait de A à Z dans
  Claude Code, la maquette sur un canevas Claude Design ouvert depuis Claude Code. La
  conception dans l'application Claude reste une variante.

**Deux landing pages d'exemple** (`skills/maquette/templates/exemples/`)
- `b2b-vigie` (maintenance prédictive pour PMI) et `b2c-brume` (torréfacteur à
  Marseille) : pages complètes, images, vidéos et objets 3D générés, testées dans un vrai
  navigateur à 5 tailles et en mouvement réduit.
- Chacune a été jugée par une persona cliente « qui a payé 25 000 € », en boucle, jusqu'à
  9/10 et un « oui » franc (Vigie 93/100, Brume 94/100). `NOTES.md` garde chaque
  itération : ce qui a été critiqué, ce qui a été corrigé.

**Kit de maquette v3**
- `gestes.js` fusionne tout ce que les deux exemples ont appris : épinglages dans l'ordre
  du DOM, premier écran animé au chargement (`data-intro`), hero qui se resserre, étapes
  avec barre de progression, galerie horizontale, courbe tracée au défilement, odomètre,
  bande défilante avec bouton pause, en-tête qui se cache, barre d'action mobile,
  accordéon, liste suivie, 3D épinglée avec notes ; page entière sans GSAP ; gestes
  utiles conservés en mouvement réduit.
- `GESTES.md` : l'API de chaque geste et « quel geste pour quelle section ».
- Page de démonstration refaite avec de vraies images de démonstration (plus de photos
  au hasard).

**Règles**
- `niveau-agence.md` : « Qui prime » (DESIGN.md choisit, ce fichier est le plancher),
  repli quand le client refuse de dépenser, le produit porte la marque, recadrage mobile,
  3 épinglages au plus, titre du hero jamais sous l'en-tête, premier écran mobile contrôlé
  à 375 × 667, une donnée une seule source, chaque correction relance tous les contrôles,
  graphiques avec unités, rien du premier écran n'attend le défilement.
- Relecteur : nouveau contrôle « l'œil du client expert » (erreur de métier, courbe sans
  unité, produit sans marque = majeur) et la question « si j'avais payé 25 000 € ».
- Médias : relire chaque image avec l'œil du métier ; un écran s'affiche en HTML, jamais
  en texte généré.

**Corrections du test « Brisant »** (36 points relevés, tous traités)

- **Sources uniques** dans `commun/conventions.md` : une liste de tailles de capture
  (360 × 740, 375 × 667, 375 × 812, 1280 × 720, 1440 × 900), une liste de polices à
  éviter, un ordre de générateurs (fal d'abord, OpenRouter ensuite). Les autres fichiers
  y renvoient.
- **Un seul budget de génération**, demandé au démarrage et suivi dans `00-etat.md`
  (« Budget IA : x $ / y $ ») : plus d'accord à part pour les moodboards, les médias, la
  maquette ou le second avis.
- **Mode rapide** : environ 20 questions annoncées dès le départ, 5 au cadrage, relecteur
  sur le cadrage, la marque et la maquette, démo du design system réduite, rubrique
  « À confirmer en voyant la maquette ».
- **Sans canevas Claude Design** : prototype HTML + captures + retours notés dans
  `maquette.md`.
- Le relecteur reçoit une série de captures au fil du défilement pour juger le mouvement.
- Médias : marquage posé sur l'image avant la vidéo, boucle `start`/`end_image_url`,
  fondu de secours, hero recadré en 9:16, 3 détails de métier vérifiés par image ;
  3D : modèle à UV propres pour un objet qui porte une marque.
- Kit de maquette : palette et polices de démonstration hors « look IA » (presque noir,
  gris chaud, ambre, vert profond ; Literata + Hanken Grotesk), bloc `@theme` marqué à
  remplacer ; `generer-images.py --fal`.
- Scripts : `optimiser-medias.sh` garde la largeur d'origine et compresse les GLB ;
  `generate-tokens.cjs --format tailwind` sort un bloc `@theme` v4 ; « Nature Distilled »
  passe en fin de recherche (look IA).
- Replis : concurrent introuvable, Reddit refusé, connexion perso déjà présente, logo
  pas encore reçu, aucun avis client.

## 1.3.0 — 2026-11-04

Créer sans limite, et générer par défaut.

- Les images manquantes de la maquette sont **générées avec OpenRouter** (fal s'il est
  connecté) par défaut, en une série cohérente, un seul accord pour le lot, coût en
  euros. Les banques libres ne servent plus qu'en repli.
- Nouveau `generer-images.py` dans le kit de maquette : chaque `<img>` porte son
  `data-prompt`, le script génère toute la page (image maîtresse d'abord, les autres
  avec elle en référence) et remplace les `src`.
- Catalogue de création sans limite (`niveau-agence.md` § 2 bis) : objets détourés en
  couches de profondeur, textures, illustrations, vidéos en boucle, séquences d'images
  façon Apple, **objets 3D** générés avec fal (image → 3D), sons.
- Kit : objet 3D qui tourne au défilement (`<model-viewer data-model-scroll>`), couches
  qui suivent la souris (`data-depth`). Testé à 1440 et 375 px, sans erreur ni
  débordement.

## 1.2.0 — 2026-11-04

Le niveau visuel passe de « propre » à « site d'agence à 25 000 € », et le parcours est
corrigé après un test complet avec une persona débutante (atelier de céramique, tout
fait dans Claude Code).

**Design, mouvement, images**
- Nouveau `commun/niveau-agence.md` : références (concurrents + sites Awwwards/Godly),
  images plein cadre, grille éditoriale, catalogue de mouvement façon pages produit Apple
  (hero épinglé, séquences d'images, étapes épinglées, galerie horizontale, textes
  révélés, bouton magnétique, curseur…), règles de fluidité et de mouvement réduit,
  **grille notée sur 100, seuil 90**.
- Nouveau **kit de maquette animée** (`skills/maquette/templates/prototype/`) :
  Tailwind CSS v4 + GSAP (ScrollTrigger, SplitText) + Lenis, et `gestes.js` qui branche
  chaque geste par un attribut `data-*`. Testé à 1440 et 375 px.
- Tailwind CSS v4 partout : `tailwind.css` (`@theme`) produit par le design system,
  référence réécrite pour la v4 ; stack par défaut Astro + Tailwind + GSAP + Lenis.
- Les étapes chargent les skills d'animation du MCP UI Skills
  (`mengto-build-awwwards-quality-sites`, `mengto-cinematic-gsap-lenis-motion-system`,
  GSAP officiels, accessibilité du mouvement).
- Plus jamais de rectangle « photo à venir » : **images provisoires** gratuites
  (Unsplash, Pexels) fidèles à la direction photo, listées et signalées avant la mise en
  ligne ; liste de prises de vue quand les vraies photos sont attendues ; droit à
  l'image ; prix toujours en euros ; recherche des modèles vidéo récents.
- Le relecteur note les rendus sur 100 et bloque une maquette qui ressemble à une ébauche.

**Parcours (retours du test)**
- Démarrage : carte du parcours en mots simples, choix du lieu (Claude Design ou tout
  dans Claude Code), ville, réseaux sociaux, **qui parle sur le site** (je / nous / la
  marque), budget de 15 questions en mode rapide.
- Plus aucune note interne (`[À PROUVER]`, « étape N ») dans une maquette ou une page :
  annotations hors de la page.
- Maquette : contrôle de cohérence avant de dessiner, action principale visible dans le
  premier écran mobile, chaque objectif du cadrage a son entrée, pas de grand vide,
  source du design gardée dans `08-maquette/`, `maquette.md` ouvert dès le début.
- Passation simplifiée quand tout a été fait dans Claude Code.
- Noms des tokens de mouvement alignés entre le modèle `DESIGN.md` et le générateur.

## 1.1.0 — 2026-11-03

Le parcours se fait désormais en deux temps.

- **Conception dans Claude Design** (application Claude) : étapes 1 à 8, jusqu'à la
  maquette validée. Les skills et les cinq connexions du plugin marchent dans Claude ;
  la relecture se fait sans agent (les agents n'existent que dans Claude Code).
- Nouvelle étape **8 · Maquette** (`/lancetonsite:maquette`) : toutes les pages dans
  Claude Design, desktop et mobile, avec les vrais textes et médias, critique
  anti-« IA générique », ajustements par commentaires sur le canevas, validation
  explicite. Toute retouche est reportée dans les contenus ou le design system.
- Nouvelle étape **9 · Passation** (`/lancetonsite:passation`) : note de passation,
  `projet-site.zip`, envoi de la maquette avec « Handoff to Claude Code » (ou export
  zip si l'envoi échoue).
- **Construction dans Claude Code** : le PRD (étape 10) récupère le dossier et la
  maquette, contrôle leur cohérence ; la construction (11) reproduit la maquette
  page par page ; la mise en ligne devient l'étape 12.
- Le design system (étape 6) crée aussi un design system Claude Design.
- Renumérotation : `10-prd.md`, `11-plan.md`, `12-deploiement.md`.
- Bannière et README mis à jour.

## 1.0.4 — 2026-11-03

- OpenRouter devient le générateur par défaut quand fal n'est pas connecté, pour les
  images **et les vidéos** (`generate-video` / `get-video`), sans redemander.
- Modèles OpenRouter vérifiés le 3 novembre 2026 (images et vidéos, boucles
  première/dernière image) ; limites indiquées (pas de sons, de SVG ni de détourage).

## 1.0.3 — 2026-11-03

- Connexion UI Skills embarquée (ui-skills.com, sans compte) : ui-ux-pro-max,
  impeccable et plus de 600 skills UI sans rien installer. Une version installée en
  local reste prioritaire.

## 1.0.2 — 2026-11-03

- Connexion Firecrawl embarquée (OAuth, sans clé) : lecture des avis, des sites
  concurrents, des sites de référence et du site actuel en refonte.

## 1.0.1 — 2026-11-03

- Le plugin s’appelle désormais « Lance ton site » (`lancetonsite`) ; commandes
  `/lancetonsite:…`.
- `demarrer` ne s’arrête plus sur le tableau des connexions : il finit toujours par la
  question « On y va ? » (avec boutons), lance le cadrage sur un oui, et enchaîne sans
  demander en mode rapide. Même règle à la fin de chaque étape (`commun/conventions.md`).

## 1.0.0 — 2026-11-03

Première version publique.

- 12 skills : demarrer, statut, cadrage, marque, charte, architecture, contenus,
  design-system, medias, prd, construire, deployer.
- Agent `relecteur` pour la relecture indépendante de chaque étape.
- Connexions embarquées (OAuth) : fal, OpenRouter, Hostinger.
- Scripts : contraste WCAG, recherche dans le catalogue de styles, génération et
  validation de tokens, optimisation des médias, génération d'image OpenRouter,
  déploiement statique.
