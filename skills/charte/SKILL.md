---
name: charte
description: 'Crée la charte graphique — direction artistique, logo (création via IA et vectorisation, ou mise au propre de l''existant), palette justifiée et vérifiée en contraste, typographies libres de droits, direction photo, règles d''usage et interdits. Valable pour tous les supports, pas seulement le site. Étape 3 de Lance ton site.'
when_to_use: '"charte graphique", "identité visuelle", "logo", "couleurs de ma marque", "typographie", "direction artistique", "moodboard", ou /lancetonsite:charte.'
---

# Charte graphique

**Équipe d'agents** : lancer ensemble, dès le début, tout ce que prévoit
`${CLAUDE_PLUGIN_ROOT}/commun/agents.md` pour cette étape (un agent Sonnet par source,
page ou pièce indépendante).

Lire `${CLAUDE_PLUGIN_ROOT}/commun/conventions.md` et
`${CLAUDE_PLUGIN_ROOT}/commun/parcours.md` (rythme, document publié, porte de
validation). Document présenté : le document de charte (§ 7), modèle réutilisable
`templates/document/charte.html` ; contenu détaillé dans
`${CLAUDE_PLUGIN_ROOT}/commun/modeles/charte-graphique.md`, en entier.

**Tout est obligatoire à cette étape** : l'analyse complète des références (§ 1), trois
directions présentées, chacune avec son moodboard de 12 à 15 images et sa planche (§ 2), le
tableau des couleurs avec contrastes et valeurs CMJN (§ 3), les typographies et l'échelle
(§ 4), le logo et toutes ses déclinaisons (§ 5), la direction photo (§ 6), le document
`charte.html` complet avec tous ses supports, et le PDF exporté (§ 7).

**Aucune question pendant l'étape.** Un manque devient une `[hypothèse]` visible dans
`charte.md` et se tranche à la porte. Les choix se prennent sans demander : Claude applique
l'option recommandée et montre les autres.

**Images générées : le logo seulement.** Le moodboard se fait uniquement avec des banques
libres. Les autres images générées attendent l'étape 6.

La charte définit l'identité **sur tous les supports** (site, réseaux, print, vitrine). Le
design system (étape 8) en sera la traduction technique pour le site.

Dès qu'elles existent, montrer la palette et les typos en situation, au lien du document
(`parcours.md` § 2).

## Entrées

- `01-cadrage.md` — cible, concurrence, ce que la marque n'est pas.
- `02-marque.md` — positionnement, traits de voix, curseurs.
- `sources/identite/` si une identité existe.

Identité existante : faire l'**audit** (ce qui marche, ce qui manque, contrastes,
lisibilité, cohérence), l'écrire dans `charte.md`, et **recommander** une option. Les trois
directions du § 2 sont alors : garder tel quel, moderniser, refaire. La recommandée est
appliquée dans la charte ; l'utilisateur en change à la porte de validation. Ne pas tout
jeter par défaut.

## 1. Les références (en parallèle)

Pas de question : les sites aimés et détestés viennent du questionnaire du démarrage
(`00-etat.md`, `sources/`). Lancer **ensemble, dans un même message**, un agent `chercheur`
par site, pour **4 à 6 références** au total :
- chaque site aimé donné. Aucun lien donné : ne pas en inventer ;
- des sites de référence en design pour compléter, de préférence du secteur ou d'un secteur
  voisin (Awwwards, Godly, Siteinspire, Land-book, Httpster, Mobbin).

Pour chacun : Firecrawl `firecrawl_scrape` formats `branding` + `screenshot` de la page
d'accueil (pas pleine page) → vraies couleurs, polices, proportions, rangées dans
`sources/references/` ; **décrire ce qui est vu, pas ce qui est supposé**. Sans Firecrawl :
le navigateur disponible, ou `WebFetch` en le disant dans `references.md`. Noter aussi ce
qu'on rejette des sites détestés.

Les concurrents et les leaders sont **déjà lus** au cadrage (tableau de
`01-cadrage.md`) : ne pas les relire, s'en servir. Ranger les captures côte à côte sur une
planche :
`python3 ${CLAUDE_PLUGIN_ROOT}/skills/charte/scripts/planche-moodboard.py projet-site/sources/references --titre "Références"`
→ `sources/references/planche.jpg`.

Livrer dans `03-charte/references.md` l'analyse de chaque référence (ce qu'on retient, ce
qu'on écarte) et le tableau des gestes retenus
(`${CLAUDE_PLUGIN_ROOT}/commun/niveau-agence.md` § 1). En reporter l'essentiel dans
`charte.md`, section « Références ».

## 2. Les trois directions

Croiser références + traits de marque + cible. Écrire **trois directions** dans
`03-charte/directions.md`, **la recommandée d'abord**. Pour chacune :
- un nom évocateur et une phrase simple ;
- pourquoi elle sert le positionnement (citer `02-marque.md`) ;
- son risque ;
- sa palette et sa paire de polices pressenties.

La recommandée est développée dans toute la charte. L'utilisateur en change à la porte de
validation, sans question à part (`parcours.md` § 1) : son moodboard est déjà prêt.

### Le moodboard : un dossier d'images et une planche, par direction

Une ambiance ne se voit pas avec une seule image. Pour **chacune des trois directions** :
1. **Le dossier** : `03-charte/moodboard/` pour la recommandée, `03-charte/moodboard-2/` et
   `03-charte/moodboard-3/` pour les deux autres. Chacun contient **12 à 15 images** qui
   partagent la même lumière, la même palette et le même grain : lieux, matières, gestes,
   objets, détails, une ou deux personnes de dos ou en action. Nommées `01-…`, `02-…` dans
   l'ordre de la planche ; la `01` est l'image clé (la plus grande).
2. **Les sources**, lancées en parallèle (`${CLAUDE_PLUGIN_ROOT}/commun/agents.md`) : un
   agent `chercheur` par thème (lieu, matière, geste, objet, lumière), par vagues de 10, sur
   les banques libres **Unsplash et Pexels** (licence gratuite, usage commercial), 3 images
   chacun, téléchargées en 1600 px. Un thème pauvre se relance avec d'autres mots, jusqu'à
   12 images justes au moins. Chaque image est notée dans le `sources.md` de son dossier
   (fichier, lien, auteur, licence). Rien de juste pour le produit ou le lieu précis : prendre
   l'image la plus proche et le noter en `[hypothèse]` ; l'étape 6 produira la vraie.
3. **La planche** : une seule image qui les compose toutes, en rangées, avec la palette
   et les polices en pied :
   `python3 ${CLAUDE_PLUGIN_ROOT}/skills/charte/scripts/planche-moodboard.py projet-site/03-charte/moodboard --titre "<direction>" --phrase "<sa phrase>" --couleurs "#…,#…" --polices "Titres : … · Texte : …"`
   → `planche.jpg` (3000 px) et `planche-1200.jpg` dans le dossier. La regarder : une image
   qui jure (autre lumière, autre époque, autre couleur) est remplacée, puis on recompose.

Une fois les §§ 3 et 4 finis, recomposer la planche de la recommandée avec la palette et les
polices définitives. Elle ouvre le document de charte (`"photo" : "images"` du bloc de données
reçoit les 4 meilleures). Les trois planches se montrent à la porte de validation. Ces images
servent la direction : sur le site, les vraies photos ou les médias de l'étape 6 les
remplacent.

## 3. Couleurs

Méthode : [references/couleurs.md](references/couleurs.md).
- 1 couleur principale, 1 secondaire, 1 accent au plus, + neutres (fond, texte, bordure).
- Chaque couleur tirée de la matière du métier, du lieu ou du positionnement — jamais
  d'une tendance. Une phrase de justification par couleur.
- **Vérifier les contrastes** avec [scripts/contraste.py](scripts/contraste.py) : texte
  courant ≥ 4,5:1, grands titres ≥ 3:1. Corriger une teinte qui échoue.
- Fournir HEX, RVB et CMJN pour chaque couleur. Le CMJN est une approximation pour le print :
  le dire, avec la mention qu'un épreuvage est nécessaire. Pour la couleur principale, donner
  aussi une référence Pantone proche, à vérifier sur nuancier.

## 4. Typographies

- 2 familles maximum : une de titre avec du caractère, une de texte très lisible.
- Licence libre pour usage commercial (Google Fonts, Fontshare, Velvetyne) — donner le
  lien exact et les graisses utilisées.
- Polices à éviter : la liste unique de `${CLAUDE_PLUGIN_ROOT}/commun/conventions.md`,
  § 10. Une exception doit être justifiée.
- Vérifier les accents français et les chiffres (prix, horaires).
- Échelle à 6 niveaux, avec tailles exactes pour ordinateur et téléphone.
- Catalogue de paires : `${CLAUDE_PLUGIN_ROOT}/skills/design-system/data/typography.csv`
  — écarter les lignes qui contiennent une police de cette liste.

## 5. Logo

Selon le cas :
- **Logo existant** : récupérer le meilleur fichier, le vectoriser si besoin
  (`fal-ai/recraft/vectorize`), produire les déclinaisons.
- **Logo existant mais pas encore reçu** : ne pas bloquer l'étape. Redessiner un logo
  **provisoire** (typographique, dans les polices et couleurs de la charte, d'après une
  photo ou la description de l'utilisateur), avec les mêmes noms de fichiers, et le noter
  comme provisoire dans `charte.md` et dans `00-etat.md` (« Fichiers à recevoir »). Il est
  remplacé dès réception, avant la validation de la maquette ; à l'étape 11, un logo encore
  provisoire est signalé avant la mise en ligne.
- **Création** : brief (nom, promesse, 3 traits, contraintes), puis **trois pistes** :
  - **typographique** : le nom bien composé dans les polices et couleurs de la charte, un
    détail propre au métier, écrit en SVG, sans génération ;
  - **symbole** et **combiné** : seule génération d'image avant l'étape 6. Coût annoncé en une
    phrase sur le budget IA, sans question. Générations sur fond blanc (MCP fal :
    `fal-ai/recraft/v4.1/text-to-vector` pour du vectoriel, ou un modèle image puis
    `recraft/vectorize`). Sans fal : générer via OpenRouter en PNG haute définition sur fond
    blanc uni, puis vectoriser avec Inkscape s'il est installé, sinon redessiner en SVG à la
    main d'après le PNG. Aucun générateur connecté, ou budget IA à 0 : dessiner ces deux pistes
    en SVG à la main. Dans tous les cas, le dire à la porte.

  Claude applique la piste recommandée, nettoyée, dans toute la charte, et range les deux
  autres dans `03-charte/logo/pistes/`. L'utilisateur en change à la porte de validation.
- Toujours livrer, dans `03-charte/logo/` : `logo.svg` et `logo.png` (version principale),
  `logo-noir.svg` et `logo-blanc.svg` (monochromes), `symbole.svg` et `symbole-blanc.svg` (le
  symbole, ou le monogramme d'un logo typographique), `favicon-32.png` (lisible à 32 px).
- Règles : zone de protection, taille minimale, fonds autorisés, interdits (déformer,
  recolorer, ombrer).
- Logo généré par IA : un agent `chercheur` cherche les ressemblances avec les marques du
  secteur, résultat noté dans `charte.md`. Prévenir : cette recherche ne remplace pas la
  vérification d'antériorité avant un dépôt INPI, et le logo doit être retravaillé avant ce
  dépôt.

## 6. Direction photo

Fiche de shooting : voir `${CLAUDE_PLUGIN_ROOT}/skills/medias/references/fiche-shooting.md`. La remplir ici, elle
servira à l'étape 6.

## 7. Le document : une vraie charte, complète

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
  direction photo, ton, à faire / à ne pas faire, et les **supports** ;
- garder **les dix supports prévus** :
  `"supports": ["affiche", "kakemono", "carte", "entete", "enveloppe", "presentation", "signature", "reseaux", "site", "goodies"]` ;
- renseigner `logo/symbole-blanc.svg` (le symbole pour fond foncé) et, dans `note_cmjn`, la
  mention d'épreuvage et la référence Pantone ;
- relire `charte.html` à l'écran : aucun texte qui déborde, aucun logo illisible ;
- exporter le PDF :
  `bash ${CLAUDE_PLUGIN_ROOT}/skills/charte/scripts/charte-pdf.sh projet-site/03-charte`
  (A4 paysage, une page par sujet), et le relire page par page (capture de chaque page). Si
  le script ne trouve pas Chrome, lui donner un autre navigateur Chromium :
  `CHROME=<chemin> bash …`.

Publier `charte.html` en artifact (`parcours.md` § 3), avec le logo, les images et
`charte.pdf`. À la porte, le résumé présente les trois directions, la recommandée d'abord,
chacune avec le lien de sa planche. Les coordonnées des supports viennent de `00-etat.md` ;
une valeur inconnue reste « Prénom Nom », jamais inventée, et se note en `[hypothèse]` dans
`charte.md`. Une version secondaire du logo que la marque n'a pas est retirée des données
plutôt que laissée vide.

Jamais une affiche d'une page, jamais une image ni une capture comme livrable
(`parcours.md` § 3).

## Avant la porte

Cocher d'après les fichiers de `projet-site/`, en les ouvrant. Un manque se fait maintenant.

- [ ] `sources/references/` : les captures et le branding de 4 à 6 références, et `planche.jpg`.
- [ ] `03-charte/references.md` : l'analyse de chaque référence et le tableau des gestes retenus (geste, site d'origine, réinterprétation).
- [ ] `03-charte/directions.md` : trois directions, la recommandée d'abord ; nom, phrase, raison, risque, palette et polices pressenties.
- [ ] `03-charte/moodboard/`, `moodboard-2/`, `moodboard-3/` : dans chacun, 12 à 15 images numérotées, `sources.md` (lien, auteur, licence de chaque image), `planche.jpg` et `planche-1200.jpg`, regardées. Aucune image générée.
- [ ] La planche de `moodboard/` porte la palette et les polices définitives.
- [ ] `03-charte/logo/` : `logo.svg`, `logo.png`, `logo-noir.svg`, `logo-blanc.svg`, `symbole.svg`, `symbole-blanc.svg`, `favicon-32.png`, lisible à 32 px.
- [ ] `03-charte/charte.md` : toutes les sections du modèle remplies, sans `{{` restant. Chaque couleur a son HEX, son RVB, son CMJN, sa proportion et sa justification. La couleur principale a sa référence Pantone. Chaque paire utilisée a son contraste passé à `contraste.py`. L'échelle typo a 6 niveaux. La zone de protection, les tailles minimales et les fonds autorisés sont écrits. La direction photo est remplie. Les manques sont en `[hypothèse]`.
- [ ] `03-charte/charte.html` : bloc de données rempli (aucun texte d'exemple ni `{{` restant), vraies polices, valeurs `cmjn` présentes, dix supports, `photo.images` à 4 images. Ouvert à l'écran : aucun débordement, aucun logo illisible.
- [ ] `03-charte/charte.pdf` : exporté après la dernière modification de `charte.html`, relu page par page.
- [ ] `00-etat.md` et tableau de bord à jour, y compris le budget IA si le logo a été généré.

Puis le contrôle d'étape : `${CLAUDE_PLUGIN_ROOT}/commun/boucle-persona.md`, « Le contrôle
d'étape ».

Puis **porte de validation** (`parcours.md` § 4) : jamais l'architecture sans un oui.
Prochaine étape : `/lancetonsite:architecture`.
