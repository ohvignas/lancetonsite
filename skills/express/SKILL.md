---
name: express
description: 'Mode express de Lance ton site : un site vitrine en ligne en une heure. Un seul questionnaire, une fiche projet d''une page (cible, promesse, ton, couleurs, typos, pages), textes et images en parallèle, le site codé directement page par page par une équipe d''agents, vérifié, puis mis en ligne. Deux validations seulement. Pour aller vite ; le parcours complet en 12 étapes reste là pour le niveau agence.'
when_to_use: '"site en une heure", "vite", "express", "je veux mon site aujourd''hui", "site rapide", "pas le temps", "version simple", ou /lancetonsite:express.'
argument-hint: "[nouveau | reprendre]"
---

# Express : ton site en ligne en une heure

**La promesse : un site vitrine de 3 à 6 pages, en ligne, en 60 minutes de travail de
Claude** (le temps où l'utilisateur répond ne compte pas). On garde ce qui se voit :
vrais textes, belles images, mobile, vitesse, SEO de base, accessibilité. On retire ce
qui prend du temps sans changer le site : les documents complets, la validation à
chaque étape, la maquette séparée, les boucles de notation.

## Ce qui change par rapport au parcours complet

Lire `${CLAUDE_PLUGIN_ROOT}/commun/conventions.md` et
`${CLAUDE_PLUGIN_ROOT}/commun/agents.md` (comment briefer un agent). L'express y
**déroge sur quatre points, assumés** :
- **§ 7, la porte de validation** : deux portes seulement, la fiche (palier 2) et le
  site avant la mise en ligne (palier 5). `parcours.md` ne s'applique pas.
- **§ 2, les documents amont** : une seule source, `00-fiche.md`, au lieu de 01 à 04.
- **§ 11, la densité de l'accueil** : 7 à 9 sections et 350 à 600 mots (au lieu de 10
  à 13 sections).
- **Captures** : 3 tailles (1440 × 900, 768 × 1024, 375 × 812) au lieu de 6.

**Tout le reste tient**, sans exception : la vérité (aucun chiffre, avis, client ni
label inventé ; un manque reste lisible et se signale), aucun mot interne dans une page
en ligne (`[à recevoir]`, `[hypothèse]`, nom d'outil : en annotation pour
l'utilisateur, jamais dans le HTML), les polices à éviter, le budget de génération, les
actions qui exigent un « oui » (DNS, pare-feu, achats, suppression), le bac à sable.

## Le chrono

Démarrer le chrono **après** les réponses au questionnaire. Annoncer le plan en une
ligne, puis l'heure à chaque palier (« 17 min : la fiche est prête »). Noter le temps
de chaque palier dans `00-etat.md`.

| Minute | Palier | Ce que l'utilisateur voit |
|---|---|---|
| — | 1. Questionnaire | un message à remplir, un écran de 4 choix |
| 0 → 10 | 2. Fiche projet | **la fiche d'une page → validation 1** |
| 10 → 25 | 3. Textes, images, coquille et logo en parallèle, puis l'accueil | l'accueil en aperçu |
| 22 → 40 | 4. Les autres pages, chacune lancée dès que ses textes sont prêts | chaque page en aperçu |
| 40 → 52 | 5. Vérifications par page, corrections | **le site complet → validation 2** |
| 52 → 60 | 6. Mise en ligne gratuite | **l'adresse du site** |

Mise en ligne sur un **VPS** : compter 15 à 25 minutes de plus si le VPS n'est pas déjà
préparé (sécurisation, DNS) ; le dire dès le questionnaire et proposer la voie gratuite
d'abord, le VPS ensuite.

**Palier en retard de plus de 5 minutes** : le dire en une phrase et proposer une seule
coupe (une page de moins, images de banque au lieu de générées). Jamais de retard en
silence. Entre les deux portes : aucune question ; ce qui manque devient une valeur
raisonnable marquée « hypothèse » dans la fiche.

## Reprendre un projet

`/lancetonsite:express reprendre`, ou un `projet-site/` déjà présent : lire
`00-etat.md` et reprendre au premier palier non fait, sans rien redemander.

| Déjà présent | Reprendre au |
|---|---|
| `00-etat.md` seul (questionnaire fait) | palier 2 |
| `00-fiche.md` validée | palier 3 |
| `05-contenus/` complet et `site/index.html` | palier 4 |
| `site/` avec toutes les pages | palier 5 |
| site validé (`00-etat.md`) | palier 6 |
| documents du parcours complet (01 à 05) | palier 2 : la fiche se **remplit** à partir d'eux (promesse et ton de `02-marque.md`, couleurs, typos et logo de `03-charte/`, pages et blocs de `04-architecture.md`), puis validation 1 ; des `05-contenus/` validés sont gardés tels quels |

## 1. Questionnaire

Un **seul message à remplir** (laisser vide ce qu'on ne sait pas) :
- nom, ville ou zone servie ;
- ce qui est vendu et à quel prix ;
- pour qui, et l'action attendue du visiteur (appeler, réserver, devis, acheter) ;
- ce qui existe : site actuel, réseaux, logo, couleurs, photos, avis ;
- le nom de domaine (acheté ou souhaité ; sinon on publie à l'adresse de l'hébergeur) ;
- 1 ou 2 sites aimés.

Puis **un écran de 4 choix** (outil de question à choix) :
1. qui parle : « je » / « nous » / la marque ;
2. images : « banques libres, 0 € (recommandé) » / « une série générée, environ 3 € » ;
3. mise en ligne : « gratuite, Netlify (recommandé) » / « gratuite, Cloudflare Pages » /
   « mon VPS Hostinger (15 à 25 min de plus) » / « plus tard, je garde les fichiers » ;
4. formulaire de contact : « oui, par e-mail (Web3Forms, gratuit) » / « non, un lien
   e-mail et téléphone suffisent ».

Créer `projet-site/` avec `00-etat.md` : « Mode : express », heure de départ, qui parle,
domaine, hébergeur, formulaire, et **« Budget IA : 0 $ / 3,5 $ »** si la série générée
est choisie, sinon « 0 $ / 0 $ » (conventions, « Le budget de génération »). Repérer les
connexions disponibles (fal, OpenRouter, Firecrawl, Hostinger) sans les déclencher, et
les noter.

## 2. Fiche projet (0 → 10 min) → validation 1

Lancer **ensemble, dans un même message**, des agents `chercheur` (Sonnet), 3 minutes au
plus chacun, un résultat en retard est ignoré :
- un par site donné (actuel, aimé) : textes utiles, couleurs, polices, logo (Firecrawl
  `firecrawl_scrape` formats `markdown` + `branding`, sinon `WebFetch`), rangés dans
  `sources/` ;
- un sur 2 concurrents trouvés par recherche web : promesse, prix, ce qui leur manque.

Pendant ce temps, écrire `projet-site/00-fiche.md`, **une page**, dans cet ordre :
1. **Pour qui, et ce qu'ils veulent** : 3 lignes, avec les mots des clients si on les a.
2. **La promesse** : une phrase de 10 mots au plus, et la preuve qui la soutient.
3. **Le ton** : qui parle, 3 mots, une ligne « on dit / on ne dit pas ».
4. **Couleurs** : 1 principale, 1 d'accent, 2 neutres, en HEX, tirées du logo existant
   ou du métier ; contrastes vérifiés avec
   `python3 ${CLAUDE_PLUGIN_ROOT}/skills/charte/scripts/contraste.py` (texte ≥ 4,5:1).
5. **Typos** : 2 familles libres (Google Fonts ou Fontshare), hors de la liste à éviter
   des conventions (§ 10) ; graisses utilisées.
6. **Logo** : l'existant, sinon un logo typographique en SVG (pas de génération).
7. **Les pages** : 3 à 6, avec leur **nom de fichier** (`index.html`, `services.html`,
   `a-propos.html`, `contact.html`… en minuscules sans accents), leur **action**, leur
   **requête Google principale** et leurs **blocs dans l'ordre** (une ligne chacun :
   rôle et contenu attendu ; 7 à 9 pour l'accueil, 4 à 7 ailleurs). Plus
   `mentions-legales.html` et `confidentialite.html`, et `404.html`.
8. **Les images** : la liste des emplacements (rôle, page, proportion, ce qu'on voit),
   8 à 15 en tout, nommées par leur rôle (`hero`, `atelier`, `equipe`…).
9. **Le style** : une phrase (« éditorial, grandes photos, beaucoup d'air ») et une
   référence prise dans les sites aimés ou dans les exemples du plugin
   (`${CLAUDE_PLUGIN_ROOT}/skills/maquette/templates/exemples/README.md`).
10. **Hypothèses** : ce qui a été supposé faute de réponse, une ligne chacune.

Montrer la fiche en artifact (en clair dans la conversation si l'outil manque), avec
une pastille par couleur et le nom des polices écrit dans la police. **Validation 1**
(outil de question à choix) : « On part là-dessus » / « Je change un point ». Une
retouche : la faire, remontrer la fiche, redemander.

## 3. Textes, images, coquille, logo (10 → 25 min)

Lancer **ensemble, dans un même message** :

**a. Les textes** : un agent `redacteur-page` (Sonnet) par page, légales comprises.
Brief : « Tes sources sont **uniquement** `projet-site/00-fiche.md` et
`projet-site/sources/` ; les fichiers 01, 02 et 04 n'existent pas en express, ne les
cherche pas. » Plus : les blocs de sa page, vrais textes, 3 phrases au plus par bloc,
`title` (60 caractères) et meta description (155), texte alternatif de chaque image,
aucun chiffre ni avis inventé ; un manque s'écrit `[à recevoir : …]` dans le fichier de
textes **seulement**. Sortie : `projet-site/05-contenus/<nom-de-page>.md`. Pages
légales : la structure de `${CLAUDE_PLUGIN_ROOT}/skills/contenus/SKILL.md` (« Pages
légales »).

**b. Les images** (un seul agent, pour une série homogène) :
- **banques libres** : un agent `fabricant` (Sonnet) avec la liste des emplacements de
  la fiche, **une requête en anglais par image**, la palette et la lumière voulues
  (« lumière du matin, tons sable et vert ») et l'orientation. Il cherche sur Unsplash
  et Pexels (Firecrawl `firecrawl_search` sources `images`, ou la page de recherche lue
  avec `firecrawl_scrape`), télécharge le fichier original en 1600 px au moins dans
  `projet-site/06-medias/brut/<role>.jpg`, et note chaque image dans
  `projet-site/06-medias/medias.md` (fichier, rôle, lien, auteur, licence, texte
  alternatif). Une image introuvable ou un téléchargement qui échoue : il le note, et la
  page utilisera un fond de la palette (dégradé ou aplat) à la place, signalé à
  l'utilisateur, jamais un rectangle vide ;
- **série générée** (si choisie) : l'agent principal écrit tous les prompts d'un bloc,
  avec un même bloc de style, annonce le coût, lance le lot en même temps (fal, sinon
  OpenRouter : conventions, « Quel générateur »), puis met à jour le budget dans
  `00-etat.md` avec le coût réel. Dépasser le budget accordé demande un oui ;
- **vraies photos** de l'utilisateur : toujours prioritaires, copiées dans `brut/`.

Puis `python3 ${CLAUDE_PLUGIN_ROOT}/skills/express/scripts/optimiser-images.py projet-site/06-medias/brut projet-site/site/images`
(Pillow ; `pip install pillow` s'il manque) : `<role>-1600.webp` et `<role>-800.webp`,
moins de 250 Ko, et la balise `<img>` à copier pour chacune.

**c. La coquille du site** : un agent `fabricant`, qui écrit dans `projet-site/site/` :
- `css/styles.css` : **Tailwind v4 compilé** (`npx @tailwindcss/cli -i css/source.css -o css/styles.css --minify`)
  avec un bloc `@theme` tiré de la fiche ; si Node manque, un `styles.css` écrit à la
  main avec les mêmes variables CSS. Les classes des composants communs y sont
  définies : bouton principal et secondaire, lien, carte, champ, bloc d'action, sections ;
- **polices auto-hébergées** en WOFF2 dans `fonts/` (téléchargées depuis Google Fonts
  ou Fontshare), `@font-face` avec `font-display: swap`, préchargement de la police des
  titres : pas d'appel à un serveur de polices tiers ;
- `js/` : GSAP et Lenis aux versions exactes, puis
  `${CLAUDE_PLUGIN_ROOT}/skills/maquette/templates/prototype/gestes.js`, tous en
  `defer` ; `prefers-reduced-motion` respecté ;
- `_partials/entete.html` (logo, 3 à 5 liens, bouton d'action ; menu téléphone
  accessible) et `_partials/pied.html` (coordonnées, liens, légal), avec `{{racine}}`
  devant chaque lien interne ;
- `robots.txt`, `sitemap.xml` (domaine de `00-etat.md`, ou l'adresse de l'hébergeur à
  remplacer au palier 6), favicon tiré du logo, `404.html` ;
- formulaire : si choisi, le composant de formulaire Web3Forms (clé
  `access_key` laissée vide, notée « à recevoir » : l'utilisateur la crée en 1 minute
  avec son e-mail), message de confirmation et d'erreur écrits.

**d. Le logo** (si à créer) : un agent `fabricant` écrit `site/images/logo.svg` (et une
version claire), d'après la fiche.

**L'accueil** : dès que la coquille, ses textes et ses images sont là, un agent
`fabricant` monte `site/index.html` (brief du palier 4, avec la fiche et la référence de
style). L'agent principal le relit et le corrige : **c'est lui qui fixe le style des
autres pages**. Le montrer (captures 1440 et 375) vers la minute 25.

**Le modèle de page** : chaque page contient les zones
`<!-- partiel:entete --><!-- /partiel:entete -->` et
`<!-- partiel:pied --><!-- /partiel:pied -->`, remplies par
`python3 ${CLAUDE_PLUGIN_ROOT}/skills/express/scripts/assembler.py projet-site/site`
(à relancer après tout changement du menu ou du pied).

## 4. Les autres pages (22 → 40 min)

Un agent `fabricant` (Sonnet) **par page**, lancé **dès que ses textes et l'accueil sont
prêts** (sans attendre les autres pages). Brief :
- son fichier (`site/<nom-de-page>.html`), ses textes (`05-contenus/<nom-de-page>.md`),
  ses images (`site/images/`, balises données par `optimiser-images.py`), la fiche, et
  `site/index.html` comme modèle ;
- réutiliser les classes de `css/styles.css`, les zones de partiels et les scripts ;
  **ne jamais modifier** `css/`, `js/`, `_partials/` ni une autre page : un style
  manquant se signale au parent, qui l'ajoute au CSS commun ;
- une mise en page tirée des blocs de la page (FAQ en accordéon, tarifs en tableau),
  pas une copie de l'accueil ;
- un `[à recevoir : …]` des textes ne passe **jamais** dans le HTML : le texte
  s'écrit sans lui (ou le bloc se retire) et le manque va dans le compte rendu ;
- un seul `h1`, titres dans l'ordre, `title` et meta de `05-contenus/`, `lang="fr"`,
  balise canonique et Open Graph, JSON-LD utile (`LocalBusiness`, `FAQPage`…) ;
- contrôle à 1440, 768 et 375 px sur le serveur local (ci-dessous) : aucun
  débordement, texte ≥ 16 px sur mobile.

**Le serveur local** : l'agent principal en lance **un seul** en arrière-plan, au
palier 3, `python3 -m http.server 4410 --bind 127.0.0.1` dans `projet-site/site/`, et
donne son adresse à chaque agent. Captures : Playwright s'il est installé, sinon Chrome
en mode sans fenêtre (`--headless=new --screenshot`), sinon le navigateur intégré de
l'agent principal ; rangées dans `projet-site/captures/<page>-<largeur>.png`. Ces
commandes peuvent demander de sortir du bac à sable : le signaler (conventions, «
Captures d'écran »).

Quand toutes les pages sont là : relancer `assembler.py`, puis compléter `sitemap.xml`.

## 5. Vérifications (40 → 52 min) → validation 2

Lancer les contrôles **page par page dès qu'une page est finie**, puis une passe sur
l'ensemble. Un agent `verificateur` (Sonnet) par contrôle, sur le serveur local ; il
rend sa liste au parent, qui l'écrit dans `projet-site/verif/<controle>.md` :
- **liens** : liens internes et ancres, aucune page orpheline, 404 personnalisée ;
- **mobile** : captures 375 × 812, rien qui déborde ni ne se chevauche, menu utilisable ;
- **accessibilité** : contrastes, focus visible, textes alternatifs, cibles ≥ 44 px ;
- **SEO** : `title` et meta uniques, `h1`, canonique, `sitemap.xml`, `robots.txt` ;
- **vitesse** : images < 250 Ko et dimensionnées, polices locales en `swap`, scripts en
  `defer`, aucune ressource tierce bloquante ;
- **texte** : aucun lorem, aucun `[à recevoir]` ni mot interne dans le HTML, aucun
  chiffre ou avis inventé.

Corriger ce qui bloque (un `fabricant` par page, l'agent principal pour le commun).
Puis montrer le **site complet** dans le navigateur (le serveur local), avec les
captures ordinateur et téléphone de chaque page, et la liste courte de ce qui reste à
recevoir (photos, clé du formulaire, mentions légales). **Validation 2** : « Mettre en
ligne » / « Je change quelque chose ». Une retouche : la faire, remontrer, redemander.

## 6. Mise en ligne (52 → 60 min)

Lire `${CLAUDE_PLUGIN_ROOT}/skills/deployer/SKILL.md` : ses actions qui exigent un
« oui » et son **étape 6 « Vérifier » s'appliquent en entier**. Le dossier publié est
une copie sans les fichiers de travail :
`rsync -a --delete --exclude _partials --exclude 'css/source.css' projet-site/site/ projet-site/public/`
(à relancer avant chaque publication) :
- **Netlify** : `npx netlify-cli deploy --prod --dir=projet-site/public` (connexion dans
  le navigateur au premier lancement : le dire, ce temps ne compte pas) ;
- **Cloudflare Pages** : `npx wrangler pages deploy projet-site/public` ;
- **VPS Hostinger** : recette A de
  `${CLAUDE_PLUGIN_ROOT}/skills/deployer/references/recettes.md`, avec
  `skills/deployer/scripts/deployer-statique.sh` et `projet-site/public` comme dossier ;
  sécurisation et DNS selon `deployer` (étapes 2 à 4) ;
- **plus tard** : livrer le dossier `site/` et la commande pour l'ouvrir en local.

Un nom de domaine se branche ensuite (enregistrements indiqués par l'hébergeur, écrits
seulement sur un oui) ; le site est déjà visible à l'adresse de l'hébergeur. Remplacer
alors l'adresse provisoire dans `sitemap.xml`, `robots.txt` et les balises canoniques,
et republier.

Puis `projet-site/12-deploiement.md`, d'après
`${CLAUDE_PLUGIN_ROOT}/skills/deployer/templates/12-deploiement.md` en version courte :
adresse, hébergeur, commande de mise à jour (assembler, copier dans `public/`, publier), preuves de l'étape 6, ce qui reste à
recevoir ; **aucun secret** (ni jeton, ni mot de passe, ni clé).

## La fin

Un message court : l'adresse du site, le temps total et par palier, ce qui reste à
fournir, et une ligne : « Pour aller plus loin (charte complète, maquette animée, niveau
agence) : `/lancetonsite:demarrer` reprend ce projet en mode complet sans rien perdre. »
`00-etat.md` à jour (« Phase : en ligne »).

## Ce que l'express ne fait pas

Pas de cadrage approfondi ni de personas, pas de charte en PDF, pas de wireframes ni de
maquette séparée, pas de design system documenté, pas de boucle client simulé, pas de
boutique, de réservation en ligne ni d'espace client. Le dire honnêtement si la demande
dépasse un site vitrine, et proposer le parcours complet.
