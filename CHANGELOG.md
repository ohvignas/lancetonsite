# Journal des versions

## 1.7.4 — 5 novembre 2026

**Le plus d'agents possible, à chaque étape.** Nouveau `commun/agents.md` : la règle
(une tâche indépendante = un agent, tous lancés ensemble, jusqu'à 10 à la fois) et le
tableau de ce qui part en parallèle à chacune des 13 étapes. Quatre nouveaux agents, tous
en Sonnet : `chercheur` (une source, des faits sourcés), `redacteur-page` (les textes
d'une page), `fabricant` (une page, un composant, un script, un lot de médias),
`verificateur` (un contrôle : liens, accessibilité, performance, SEO…). Chaque skill
d'étape commence par lancer son équipe ; contenus et construction : un agent par page.

## 1.7.3 — 5 novembre 2026

**Charte graphique au format agence.** Nouveau modèle réutilisable
`skills/charte/templates/document/charte.html` : on ne remplit qu'un bloc de données
(logo, couleurs, polices, règles), le document se dessine seul avec le vrai logo et les
vraies polices. Environ 25 pages A4 paysage, sur la structure d'une charte
professionnelle : couverture, sommaire, 01 Logotype (déclinaisons, zone de protection
cotée, tailles minimales, 9 interdits montrés, couleurs CMJN / RVB / HEXA, contrastes,
spécimens complets, échelle typo), 02 Éléments graphiques (fonds unis et dégradés,
éléments signature, iconographie, data visualisation, direction photo, ton, à faire / à
ne pas faire), 03 Supports (affiche, kakémono, carte de visite, papier en-tête,
enveloppe et devis, présentation, signature e-mail, réseaux sociaux, en-tête du site,
objets). Export PDF : `skills/charte/scripts/charte-pdf.sh`.

**La maquette fait toutes les pages.** Avant, seul l'accueil était maquetté par défaut.
Maintenant : l'accueil d'abord, puis toutes les pages de l'architecture en parallèle,
un exemplaire de chaque gabarit répété (article et liste, fiche produit et catalogue)
et les pages légales. L'architecture donne un zoning à chaque page et à chaque gabarit,
et prévoit le gabarit article dès l'étape 4 quand les mots-clés le justifient.

**Sous-agents en Sonnet.** `relecteur` et `client-persona` passent en Sonnet ; nouvel
agent `maquettiste-page` (Sonnet), un par page secondaire. Les choix de direction
restent à l'agent principal.

## 1.7.2 — 5 novembre 2026

**Tailles de rendu 3D** : aperçu en 720 px, photos du site en 1080 px par défaut (environ
5 min par image au lieu de 27 en 4K). Plus grand (2048, 3072 px) seulement si l'utilisateur
le demande, à la porte de validation. Catalogue Ciste : photos studio 1080 et 400 px
(`outils/blender/declinaisons.sh`).

**Nouveau skill `objets-3d` : la 3D faite dans Blender.** Tout le procédé du flacon Ciste,
rendu réutilisable par les agents : `lib3d.py` (formes lisses en spline, verre, liquide qui
déborde dans le verre, métal, laque, papier imprimé, cyclo, schéma de lumière de studio en
boîtes à lumière dégradées avec light linking, appareil, réglages Cycles, tour complet,
vue éclatée, séquence, export `.glb`), `exemple.py` testé sous Blender 5.2, `sequence.sh`
(PNG → séquence WebP pour `canvas[data-sequence]`, MP4, WebM, affiche),
`installer-blender.sh`. Références : modelage, lumière (avec les erreurs rencontrées et leur
cause), animations, bibliothèques libres (Poly Haven, ambientCG, Smithsonian, Kenney…),
outils et licences. **Boucle de correction automatique** (agent client neuf, grille 3D sur
100, seuil 85, 3 tours) puis **porte de validation** avant tout rendu final. Branché dans
`medias`, `maquette`, `construire`, `niveau-agence.md` § 2 bis (Blender d'abord, plus
image → 3D) et l'agent `client-persona` (mode « élément 3D »).

**Ciste : photo produit dans Blender.** Bouchon et verre lissés (plus aucune facette),
liquide rempli jusqu'à l'épaule, contre-jour limité au liquide (épaule transparente), logo
CISTE en graisse 800 sur l'étiquette et dans l'en-tête. Boucle : 54 → 67 → 68, puis tour 4
corrigé sur ses retours. `studio.py` passe par `exemple.py` du skill : une seule source.

**Corrigé : les jus foncés viraient au gris-mauve.** Cycles absorbe `(1 − couleur) × densité` ;
`liquide()` calcule maintenant l'absorption par canal, la couleur de `donnees.js` est celle vue
au centre du flacon (Garrigue ambre, plus mauve). Flancs du liquide noirs : cartes de flanc vues
seulement à travers le liquide.

**README, vitrine et parcours.** README refait aux couleurs de la vitrine : bannière animée
en SVG (`docs/images/banniere-animee.svg` : la frise des 12 étapes s'allume, le flacon change
de parfum ; version sombre et mouvement réduit dans le SVG), badges, lien vers la vitrine en
ligne, les quatre nouveaux exemples avec 3D (Ciste, Pétille, Vire, Calorie), une animation
de Ciste au défilement (`docs/images/ciste-flacon-3d.gif`), les sections « Objets 3D dans
Blender » et « La bibliothèque de la maquette » (éléments, éléments 3D, fonds de hero,
outillage), Blender dans les prérequis. Vitrine `exemples/index.html` : section
« Construites autour d'un objet en 3D » (4 cartes, captures neuves `captures/vitrine-1440.webp`)
et image cassée de Vigie corrigée. Parcours : objets 3D faits dans Blender ajoutés à
`parcours.md` (nouveau § 5 ; exception écrite au § 4 : la porte propre à l'objet 3D avant
les rendus finaux), `boucle-persona.md` (boucle automatique de l'objet 3D, seuil 85),
`demarrer` (frise, recherche de Blender) et `statut` (`07-medias/3d/`).

**Exemples : six nouvelles pages complètes, une par composition.** Avec Brume et Vigie,
les huit compositions de `compositions.md` ont chacune leur exemple, sur un métier
connu de tous. Chaque page suit la page complète de `conventions.md` § 11 (10 à 13
sections, 500 à 800 mots mesurés par le script), avec un catalogue ou des articles
datés tirés d'un objet JavaScript, une nav sans téléphone, un formulaire en deux
colonnes, et une vérification à 1440, 1280, 768, 375 et 360. Chaque page est passée
par la boucle persona (3 tours au plus, seuil 85, médias provisoires) :

| Exemple | Composition | Client simulé | Mots |
|---|---|---|---|
| Calade (architecte, Vaucluse) | Éditorial magazine | 73 → **88** « Oui » | 792 |
| Tôle (festival, Saint-Étienne) | Typographique brutaliste | 66 → 77 → **88** « Oui » | 793 |
| Sillon (panier bio, Nantes) | Récit horizontal | 67 → **87** « Oui » | 792 |
| Sablon (potier, Dieulefit) | Galerie ou portfolio | 74 → **85** « Oui » | 795 |
| Miroir (réservation, salons de coiffure) | Interface en démonstration | 81 → **89** « Oui » | 788 |
| Odette (boulangerie, Tours) | Artisanal ou carnet | 76 → 84 → 87 « Pas encore »¹ | 777 |

¹ Odette passe le seuil (87) mais le client simulé garde « Pas encore » pour un seul
défaut : au téléphone, la confirmation de commande restait hors écran. Corrigé après le
dernier tour et vérifié (375, 360, 1440, animé et réduit) ; pas de tour 4 pour le noter.

- **Miroir remplace Escale** (rendez-vous à quai pour entrepôts), jugé trop niche.
  Escale est archivé hors du plugin.
- **Médias** : photos libres (Unsplash, Pexels) et images générées FLUX.2 Pro (plans et
  cartes illustrés, portraits, produits d'une même série), toutes provisoires et
  créditées. Les erreurs de métier vues par les clients simulés (cagette d'import,
  pain au chocolat en croissant, quatre émaux sous un même nom, boulangère de 60 ans
  pour 41) ont été régénérées.
- `exemples/README.md` réécrit pour les huit exemples ; `exemples/index.html` montre
  tous les modèles sur une page (`python3 -m http.server` dans `exemples/`). Le README
  du plugin montre les nouvelles pages avec une capture et une légende chacune ; Odette
  a maintenant une page `journal/` et des `mentions-legales.html` à compléter.
- Retour pour le kit : SplitText remplaçait l'espace insécable (« 14 / km » coupé) ;
  `reduceWhiteSpace: false` corrige, à reporter dans `prototype/gestes.js`.
- Ce qui dépend du vrai client (photos, avis signés, prix réels, mentions légales)
  est listé dans le `NOTES.md` de chaque exemple.

## 1.7.1 — 4 novembre 2026

### Exemples

- **Brume refaite** selon les règles de la 1.7.0 : 11 sections, 655 mots, lettres des
  titres espacées, vraie boutique (4 cafés et un coffret, panier qui garde son contenu,
  port offert dès 39 €), abonnement depuis chaque fiche, équipe, journal relié à une
  page de démonstration, nav sans téléphone. Client simulé 81 → 88 « Oui ».
  Générations : environ 0,34 $ (portrait d'équipe et 3 images du journal).

## 1.7.0 — 4 novembre 2026

Les retours du vrai client sur les 9 pages de test (4 novembre) deviennent
des règles pour tous les projets. Chaque règle vit à un seul endroit ; les autres
fichiers y renvoient.

- **Une page d'accueil complète** (`conventions.md` § 11, réécrit) : 10 à 13 sections,
  500 à 800 mots, toujours 3 phrases au plus par bloc, plus de visuels que de texte,
  et la liste des sections attendues selon le métier (hero, preuve, offre, comment ça
  marche, qui on est, témoignages, catalogue ou articles, tarifs, FAQ, appel final,
  pied de page complet). Le script de comptage ne change pas. Cibles de mots revues
  dans chaque composition (`compositions.md`). Pénalité dans les deux sens
  (`niveau-agence.md` § 6) : page trop maigre et page trop bavarde.
- **Catalogue, boutique, articles** : décidés au zoning (`architecture` § 5), fiches
  avec prix et action ou cartes datées ; le CMS ou la boutique entre dans la stack
  (`prd`) et se branche à la construction (`construire`) ; la maquette les montre avec
  de vrais contenus. Chaque composition dit comment elle les met en scène.
- **Titres et promesse** (`contenus`, « Les titres et la promesse ») : 5 pistes ou plus
  par titre majeur, avec `copywriting`, `ogilvy` et UI Skills quand ils sont là ; la
  plus concrète et la plus désirable retenue, avec la raison. Le relecteur (point 11)
  et le client simulé notent la force des titres.
- **Typographie d'affichage** (`design-system` § 2) : grands titres jamais aux lettres
  collées, interlettrage d'au moins 0 sur les polices condensées ou serrées, contrôle à
  l'œil à 1440 et 375 (aussi dans les contrôles de `maquette`).
- **Barre de navigation, blocs d'action, hero** (`niveau-agence.md` § 3) : nav tirée
  d'un modèle des skills (logo, 3 à 5 liens, un bouton, menu propre sur téléphone),
  jamais de numéro de téléphone en vrac ; formulaires en deux colonnes sur ordinateur ;
  hero sans grand vide, vérifié à 1440 et 1280.
- **Responsive réel** (`conventions.md` § 8) : taille tablette 768 ajoutée ; chaque
  page capturée à 1440, 1280, 768, 375 et 360, aucun titre cassé, coupé, trop long ou
  trop grand.
- **Images et vidéos** (`medias`, « Combien d'images ») : densité de photos selon le
  métier, vidéos générées encouragées pour les animations au défilement, plans et
  cartes en illustration générée soignée plutôt qu'en SVG approximatif.
- **3D produit** (`niveau-agence.md` § 2 bis) : l'animation finit sur la face avant,
  logo visible.
- **Sujet et références** : le cadrage repère les leaders du secteur et ce qu'ils font
  de mieux (nouveau tableau dans `01-cadrage.md`) ; un exemple du plugin porte toujours
  sur une activité connue de tous (`compositions.md`).
- **Client simulé** (`agents/client-persona.md`, `boucle-persona.md`) : il contrôle un
  par un les 10 points ci-dessus, « OK » ou « Pas OK » avec capture, et signale une
  page trop maigre aussi sévèrement qu'une page trop bavarde.
- Grille anti-« IA » (`anti-patterns.md`) : page maigre, hero déséquilibré, téléphone
  dans la nav et lettres collées deviennent bloquants ; jetons d'interlettrage alignés
  sur la nouvelle règle (`primitive-tokens.md`).

### Parcours

Retour du test réel « Relanco » (relance d'impayés pour artisans) : 50 minutes sans
rien voir qu'une affiche de charte, des étapes enchaînées sans validation, une étude des
concurrents trop longue. Nouvelle source unique : `commun/parcours.md`, référencée par
`conventions.md` et par chaque skill en une ligne.

- **Une heure pour concevoir** (`parcours.md` § 1) : budget par étape écrit dans chaque
  skill (cadrage 6 min, marque 5, charte 6, architecture 5, contenus 8, design system 6,
  médias 8, maquette 12, vérification et PRD 4 ; construction ~10 min par page, mise en
  ligne ~15). Budget dépassé : on montre ce qu'on a et on demande.
- **Un seul questionnaire, au démarrage** (`demarrer` § 4) : un message à remplir et un
  écran de choix (qui parle, budget IA, qui mettra à jour le site, rythme). Ensuite,
  aucune question au fil de l'eau : un trou devient une hypothèse affichée, les choix
  (direction, composition, style, image maîtresse) prennent l'option recommandée, les
  autres en une ligne.
- **La porte de validation à chaque étape** (`parcours.md` § 4, `conventions.md` § 7
  réécrit) : document publié, résumé en 3 à 5 points, une question « Valider et passer
  à l'étape suivante » / « Modifier », et jamais l'étape suivante sans un oui explicite,
  en aucun mode. Fin de l'enchaînement automatique du mode rapide (`demarrer`,
  `passation` vers `prd`) et de la validation groupée à la maquette.
- **Deux rythmes** : rapide par défaut (versions courtes, une heure), approfondi sur
  demande (entretien, documents complets, relectures). « Guidé » disparaît.
- **Un vrai document par étape, publié en artifact** (`parcours.md` § 3) : chaque étape
  suit son modèle d'agence (`commun/modeles/`, version courte par défaut) et publie au
  même lien — outil `Artifact` (`quickstart`, `intent: "document"` ou `"design"`),
  artifacts natifs de claude.ai et Cowork, ou page HTML locale ouverte dans l'aperçu
  (`projet-site/documents/`). Jamais une image ni une capture comme livrable.
- **Voir vite** : tableau de bord du projet publié avant 5 minutes et mis à jour à
  chaque étape (`demarrer`, `statut`, `00-etat.md` avec colonnes « Document » et
  « Temps ») ; annonce et point d'avancement pour tout travail de plus de 2 minutes ;
  résultats intermédiaires montrés dès qu'ils existent.
- **Concurrents en 3 minutes** (`cadrage`, Phase 3) : 3 à 5 concurrents, une recherche
  par concurrent en parallèle, pas de crawl, tableau d'une page (offre, prix, promesse,
  ce qu'ils font bien, l'ouverture pour nous) ; « aller plus loin » sur demande.
  Recherche sur la cible en parallèle, 10 à 15 citations en version courte. La charte
  ne relit plus les concurrents (`niveau-agence.md` § 1 allégé).
- **Charte = une vraie charte** (`charte` § 7, modèle `charte.md`) : logo et usages,
  couleurs avec rôles et contrastes, typos avec échelle, ton, iconographie, direction
  photo, à faire / à ne pas faire. `planche.html` devient `charte.html`. Aucune image
  générée avant l'étape 7, sauf un logo à symbole ; logo typographique par défaut.
- **Relecture allégée** : relecteur et boucle persona en un tour rapide, en parallèle,
  à la maquette seulement ; les tours suivants sur demande (`conventions.md` § 6,
  `boucle-persona.md`, `maquette` § 4). Maquette : l'accueil complet par défaut, les
  autres pages sur demande ; premier jet montré vers 6 minutes.
- **Titres jamais coupés sur un trait d'union** (`conventions.md` § 12, nouveau) :
  « e-mail », « peut-être », « Saint-Malo » protégés par `whitespace-nowrap` ou U+2011,
  script de contrôle à chaque taille, repris dans `maquette` et `construire`.
- **Recette écrite** : `projet-site/11-recette.md` (modèle `recette.md`) ; remise au
  client dans `09-passation.md`, partie B, à l'étape 12. Numérotation des modèles
  alignée sur les skills (9 vérification, 10 PRD).

### Exemples

- **Vigie refaite** selon les nouvelles règles : 13 sections, 744 mots, nav sans
  téléphone, diagnostic en deux colonnes, capteur 3D qui finit sur le logo ;
  client simulé 86 « Oui », puis les 12 corrections gratuites appliquées.
- Brume et les nouveaux exemples arrivent dans une prochaine version, une fois validés.

## 1.6.4 — 2026-11-04

- `deployer` (étape 12) : sans VPS, si l'utilisateur choisit Hostinger, Lance ton site
  donne le lien partenaire https://www.hostg.xyz/SHK4I et le code **AV10** (10 % de
  réduction sur le VPS), annoncés comme lien partenaire, et propose de l'ouvrir dans
  le navigateur. L'achat reste à l'utilisateur.
- README : le lien et le code dans le tableau des connexions et dans « Et si je n'ai
  pas de VPS ? ».

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
