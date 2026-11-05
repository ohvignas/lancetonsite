---
name: charte
description: 'Crée la charte graphique — direction artistique, logo (création via IA et vectorisation, ou mise au propre de l''existant), palette justifiée et vérifiée en contraste, typographies libres de droits, direction photo, règles d''usage et interdits. Valable pour tous les supports, pas seulement le site. Étape 3 de Lance ton site.'
when_to_use: '"charte graphique", "identité visuelle", "logo", "couleurs de ma marque", "typographie", "direction artistique", "moodboard", ou /lancetonsite:charte.'
argument-hint: "[complete | logo | couleurs | typos | photo]"
---

# Charte graphique

**Équipe d'agents** : lancer ensemble, dès le début, tout ce que prévoit
`${CLAUDE_PLUGIN_ROOT}/commun/agents.md` pour cette étape (un agent Sonnet par source,
page ou pièce indépendante).

Lire `${CLAUDE_PLUGIN_ROOT}/commun/conventions.md` et
`${CLAUDE_PLUGIN_ROOT}/commun/parcours.md` (rythme, document publié, porte de
validation). **Budget : 8 min.** Document présenté : le document de charte au format agence (§ 7),
modèle réutilisable `templates/document/charte.html` ; contenu détaillé dans
`${CLAUDE_PLUGIN_ROOT}/commun/modeles/charte-graphique.md`.
**Aucune image générée à cette étape** sans un oui de l'utilisateur, sauf le logo s'il
est indispensable (§ 5). Le moodboard (§ 2) se fait d'abord avec des banques libres.

La charte définit l'identité **sur tous les supports** (site, réseaux, print, vitrine). Le
design system (étape 8) en sera la traduction technique pour le site.

## Entrées

- `01-cadrage.md` — cible, concurrence, ce que la marque n'est pas.
- `02-marque.md` — positionnement, traits de voix, curseurs.
- `sources/identite/` si une identité existe.

Identité existante : faire l'**audit** (ce qui marche, ce qui manque, contrastes,
lisibilité, cohérence) et **recommander** une option (garder tel quel / moderniser /
refaire), appliquée dans la charte, les deux autres en une ligne ; l'utilisateur en
change à la porte de validation. Ne pas tout jeter par défaut.

## 1. Les références (2 min, en parallèle)

Pas de question : les sites aimés et détestés viennent du questionnaire du démarrage
(`00-etat.md`, `sources/`). Lancer **ensemble, dans un même message** :
- pour chaque site aimé donné : Firecrawl `firecrawl_scrape` formats `branding` +
  `screenshot` de la page d'accueil (pas pleine page) → vraies couleurs, polices,
  proportions, rangées dans `sources/references/` ; **décrire ce qui est vu, pas ce qui
  est supposé**. Aucun lien donné : ne pas en inventer ;
- 2 sites de référence en design, de préférence du secteur (Awwwards, Godly,
  Siteinspire), même traitement.

Les concurrents et les leaders sont **déjà lus** au cadrage (tableau de
`01-cadrage.md`) : ne pas les relire. Livrer le tableau des gestes retenus
(`${CLAUDE_PLUGIN_ROOT}/commun/niveau-agence.md` § 1) dans `03-charte/references.md`
et dans la section « Références » du document de charte. L'analyse complète (4 à 6
références, captures côte à côte) se fait en mode approfondi.

## 2. La direction

Croiser références + traits de marque + cible. Écrire **une direction recommandée**,
développée dans la charte, et **deux autres en une ligne chacune** (nom, phrase,
risque) : l'utilisateur en change à la porte de validation, sans question à part
(`parcours.md` § 1). Pour la direction retenue :
- un nom évocateur et une phrase simple ;
- pourquoi elle sert le positionnement (citer `02-marque.md`) ;
- son risque.

### Le moodboard : un dossier d'images et une planche

Une ambiance ne se voit pas avec une seule image. Pour la direction retenue :
1. **Le dossier** `03-charte/moodboard/` : **12 à 15 images** qui partagent la même
   lumière, la même palette et le même grain : lieux, matières, gestes, objets, détails,
   une ou deux personnes de dos ou en action. Nommées `01-…`, `02-…` dans l'ordre de la
   planche ; la `01` est l'image clé (la plus grande).
2. **Les sources**, lancées en parallèle (`commun/agents.md`) : un agent `chercheur` par
   thème (lieu, matière, geste, objet, lumière) sur les banques libres **Unsplash et
   Pexels** (licence gratuite, usage commercial), 3 images chacun, téléchargées en
   1600 px ; les captures des sites de référence (§ 1) peuvent en faire partie. Chaque
   image est notée dans `moodboard/sources.md` (fichier, lien, auteur, licence).
   **Images générées en plus** (fal ou OpenRouter) seulement avec un oui de
   l'utilisateur et le coût annoncé sur le budget IA : utiles quand les banques n'ont
   rien de juste (le produit, le lieu précis). Elles restent `provisoire`.
3. **La planche** : une seule image qui les compose toutes, en rangées, avec la palette
   et les polices en pied :
   `python3 ${CLAUDE_PLUGIN_ROOT}/skills/charte/scripts/planche-moodboard.py projet-site/03-charte/moodboard --titre "<direction>" --phrase "<sa phrase>" --couleurs "#…,#…" --polices "Titres : … · Texte : …"`
   → `moodboard/planche.jpg` (3000 px) et `planche-1200.jpg`. La regarder : une image
   qui jure (autre lumière, autre époque, autre couleur) est remplacée, puis on
   recompose.

La planche ouvre le document de charte (`"photo" : "images"` du bloc de données reçoit
les 4 meilleures) et se montre à la porte de validation. Ces images servent la
direction : sur le site, les vraies photos ou les médias de l'étape 6 les remplacent.
En mode approfondi : 3 directions, chacune avec son dossier et sa planche.

## 3. Couleurs

Méthode : [references/couleurs.md](references/couleurs.md).
- 1 couleur principale, 1 secondaire, 1 accent au plus, + neutres (fond, texte, bordure).
- Chaque couleur tirée de la matière du métier, du lieu ou du positionnement — jamais
  d'une tendance. Une phrase de justification par couleur.
- **Vérifier les contrastes** avec [scripts/contraste.py](scripts/contraste.py) : texte
  courant ≥ 4,5:1, grands titres ≥ 3:1. Corriger une teinte qui échoue.
- Fournir HEX, RVB, et une approximation CMJN pour le print (signaler qu'un épreuvage
  est nécessaire).

## 4. Typographies

- 2 familles maximum : une de titre avec du caractère, une de texte très lisible.
- Licence libre pour usage commercial (Google Fonts, Fontshare, Velvetyne) — donner le
  lien exact et les graisses utilisées.
- Polices à éviter : la liste unique de `${CLAUDE_PLUGIN_ROOT}/commun/conventions.md`,
  § 10. Une exception doit être justifiée.
- Vérifier les accents français et les chiffres (prix, horaires).
- Catalogue de paires : `${CLAUDE_PLUGIN_ROOT}/skills/design-system/data/typography.csv`
  — écarter les lignes qui contiennent une police de cette liste.

## 5. Logo

Selon le cas :
- **Logo existant** : récupérer le meilleur fichier, le vectoriser si besoin
  (`fal-ai/recraft/vectorize`), produire les déclinaisons.
- **Logo existant mais pas encore reçu** : ne pas bloquer l'étape. Redessiner un logo
  **provisoire** (typographique, dans les polices et couleurs de la charte, d'après une
  photo ou la description de l'utilisateur), le nommer `logo-provisoire.svg`, le noter
  dans `00-etat.md` (« Fichiers à recevoir ») et dans la charte. Il est remplacé dès
  réception, avant la validation de la maquette ; à l'étape 11, un logo encore
  provisoire est signalé avant la mise en ligne.
- **Création, par défaut** : un **logo typographique** dans les polices et couleurs de
  la charte, écrit en SVG, sans génération (le nom bien composé, un détail propre au
  métier). Proposer un symbole généré en une ligne à la porte de validation.
- **Création avec symbole** (demandé, ou indispensable au métier) — seule génération
  d'image avant l'étape 6 : brief (nom, promesse, 3 traits, contraintes) → coût annoncé
  sur le budget IA → 3 pistes de concept
  (typographique, symbole, combiné) → générations sur fond blanc (MCP fal :
  `fal-ai/recraft/v4.1/text-to-vector` pour du vectoriel, ou un modèle image puis
  `recraft/vectorize`) → l'utilisateur choisit → nettoyage. Sans fal : générer via
  OpenRouter en PNG haute définition sur fond blanc uni, puis vectoriser (fal plus tard,
  ou Inkscape « Vectoriser un objet matriciel ») ; le dire à l'utilisateur.
- Toujours livrer : version principale, version monochrome (noir et blanc), version
  réduite (favicon 32 px lisible), SVG + PNG. Ranger dans `03-charte/logo/`.
- Règles : zone de protection, taille minimale, fonds autorisés, interdits (déformer,
  recolorer, ombrer).
- Prévenir : un logo généré par IA doit être retravaillé et vérifié (ressemblance avec
  une marque existante) avant dépôt INPI.

## 6. Direction photo

Fiche de shooting : voir `${CLAUDE_PLUGIN_ROOT}/skills/medias/references/fiche-shooting.md`. La remplir ici, elle
servira à l'étape 6.

## 7. Le document : une vraie charte, au format agence

Rédiger `projet-site/03-charte/charte.md` avec [templates/charte.md](templates/charte.md)
(la source des décisions), puis le **document de charte** à partir du modèle
réutilisable [templates/document/charte.html](templates/document/charte.html) :
- le copier dans `projet-site/03-charte/charte.html` ;
- **ne remplir que le bloc de données** (`<script id="charte">`, en JSON) et la balise
  `<link id="polices">` (les polices de la charte). Le modèle dessine tout le reste
  avec le vrai logo et les vraies polices : couverture, sommaire, intercalaires,
  déclinaisons, zone de protection cotée, tailles minimales, **9 interdits montrés**
  (recoloré, autre police, autre logo associé, déformé, filet et ombre, fond agité,
  proportions, place des éléments, opacité), pastilles CMJN / RVB / HEXA, tableau des
  contrastes, spécimens complets (alphabet, chiffres, accents), échelle typo, fonds unis
  et dégradés, éléments signature (en HTML), iconographie, data visualisation,
  direction photo, ton, à faire / à ne pas faire, et les **supports** (affiche,
  kakémono, carte de visite, papier en-tête, enveloppe et devis, présentation,
  signature e-mail, réseaux sociaux, en-tête du site, objets) ;
- fournir aussi `logo/symbole-blanc.svg` (le symbole pour fond foncé) ;
- exporter le PDF : `bash ${CLAUDE_PLUGIN_ROOT}/skills/charte/scripts/charte-pdf.sh projet-site/03-charte`
  (A4 paysage, une page par sujet, environ 25 pages), et le relire page par page
  (capture de chaque page) : aucun texte qui déborde, aucun logo illisible.

Publier `charte.html` en artifact (`parcours.md` § 3) et donner le PDF. Les coordonnées
des supports viennent de `00-etat.md` ; une valeur inconnue reste « Prénom Nom »,
jamais inventée. Ce que la marque n'a pas (version secondaire du logo, objets) est
retiré des données plutôt que laissé vide (`"supports"` : n'en garder que les utiles).

Jamais une affiche d'une page, jamais une image ni une capture comme livrable
(`parcours.md` § 3). Relecture soi-même en une minute : « est-ce que ça ressemble à un
concurrent ? est-ce que ça fait générique ? » (agent `relecteur` en mode approfondi).
Puis **porte de validation** (`parcours.md` § 4) : jamais l'architecture sans un oui.
`00-etat.md` et tableau de bord à jour. Prochaine étape : `/lancetonsite:architecture`.
