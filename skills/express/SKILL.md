---
name: express
description: 'Rythme « tout d''un coup » du parcours direct : le même site et le même niveau agence, sans s''arrêter à chaque section. Un seul questionnaire, une fiche d''une page, textes et médias en parallèle, le hero puis l''accueil, les autres pages par une équipe d''agents, tout vérifié et testé une fois, puis mis en ligne avec accord. Deux validations : la fiche et le site entier. Autre rythme que `direct`, même qualité.'
when_to_use: '"tout d''un coup", "sans valider chaque section", "site en une heure", "vite", "express", "je veux mon site aujourd''hui", "site rapide", "pas le temps", ou /lancetonsite:express.'
argument-hint: "[nouveau | reprendre]"
---

# Express : le rythme « tout d'un coup »

**Le même site que le parcours direct, au même niveau agence : seul le rythme change.** Au lieu
de valider chaque section, l'utilisateur valide deux fois, la fiche puis le site entier. C'est le
rythme « tout d'un coup » de `${CLAUDE_PLUGIN_ROOT}/skills/direct/SKILL.md` : 3 à 6 pages, ou
l'accueil d'abord. Visé : environ 80 min de travail de Claude (le temps où l'utilisateur répond ne
compte pas), **jamais chronométré du questionnaire à la mise en ligne : ne pas l'annoncer comme une
promesse**. Relevés réels : 25 min 30 s et environ 4,13 $ estimés pour une page d'accueil seule, sans
client simulé ni essai réel (`direct`, « Le chrono ») ; 7 pages en 4 min par les agents de page, sur
un projet repris (Kweeto).

On garde tout ce qui se voit : hero aux 5 briques, densité, vrais textes, vidéo et belles images,
mobile, vitesse, SEO de base, accessibilité, un test de la page entière. On retire ce qui ne change
pas le site : les documents complets, la validation à chaque section, la maquette séparée.

## Ce qui change par rapport au parcours complet

Lire `${CLAUDE_PLUGIN_ROOT}/commun/agents.md` (comment briefer un agent, repli si un agent manque),
puis seulement ces parties : `commun/conventions.md` § 1, § 8, § 9 à § 12, `commun/niveau-agence.md`
§ 2, § 2 ter, § 3 et § 4. L'express y **déroge sur trois points, assumés** :
- **§ 7, la porte de validation** : deux portes seulement, la fiche (palier 2) et le
  site avant la mise en ligne (palier 5). `parcours.md` ne s'applique pas.
- **§ 2, les documents amont** : une seule source, `00-fiche.md`, au lieu de 01 à 04.
- **Captures** : `--tailles 3` pendant le travail, les 6 tailles seulement sur le hero et avant
  la validation 2.

La densité ne déroge pas : **une seule grille, celle de `conventions.md` § 11** (10 à 13 sections,
500 à 800 mots sur l'accueil).

**Tout le reste tient**, sans exception : la vérité (aucun chiffre, avis, client ni
label inventé ; un manque reste lisible et se signale), aucun mot interne dans une page
en ligne (`[à recevoir]`, `[hypothèse]`, nom d'outil : en annotation pour
l'utilisateur, jamais dans le HTML), les polices à éviter, le budget de génération, les
actions qui exigent un « oui » (DNS, pare-feu, achats, suppression), le bac à sable.

## Le chrono

Démarrer le chrono **après** les réponses au questionnaire. Annoncer le plan en une
ligne, sans durée totale promise, puis le temps réel à chaque palier (« 17 min : la fiche est prête »). Noter le temps
de chaque palier dans `00-etat.md`.

| Minute visée | Palier | Ce que l'utilisateur voit |
|---|---|---|
| — | 1. Questionnaire | un message à remplir, un écran de 4 choix |
| 0 → 10 | 2. Fiche projet | **la fiche d'une page → validation 1** |
| 10 → 22 | 3. Textes, médias, coquille et logo en parallèle | l'image maîtresse, puis les textes |
| 22 → 32 | 3. **Le hero** : les 5 briques, contrôle `captures.py --hero` sans alerte | le hero en aperçu |
| 32 → 42 | 3. Le reste de l'accueil | l'accueil en aperçu |
| 42 → 55 | 4. Les autres pages, chacune lancée dès que ses textes sont prêts | chaque page en aperçu |
| 55 → 72 | 5. Vérifications, page entière testée une fois, corrections | **le site complet → validation 2** |
| 72 → 80 | 6. Mise en ligne gratuite | **l'adresse du site** |

Mise en ligne sur un **VPS** : plus long si le VPS n'est pas déjà préparé
(sécurisation, DNS ; durée non mesurée) ; le dire dès le questionnaire et proposer la voie gratuite
d'abord, le VPS ensuite.

**Palier en retard de plus de 5 minutes sur le temps visé** : le dire en une phrase et proposer une seule
coupe (une page de moins, images de banque au lieu de générées). Jamais de retard en
silence. Entre les deux portes : aucune question ; ce qui manque devient une valeur
raisonnable marquée « hypothèse » dans la fiche.

## Reprendre un projet

`/lancetonsite:express reprendre`, ou un `projet-site/` déjà présent : lire
`00-etat.md` et reprendre au premier palier non fait, sans rien redemander.

`/lancetonsite:express nouveau` : partir du palier 1 sans chercher de reprise ; un `projet-site/` existant n'est jamais écrasé : le dire et demander un autre dossier de travail.

| Déjà présent | Reprendre au |
|---|---|
| `00-etat.md` seul (questionnaire fait) | palier 2 |
| `00-fiche.md` validée | palier 3 |
| `05-contenus/`, médias et coquille, sans hero | palier 3, le hero |
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
- 1 ou 2 sites aimés ;
- ce qu'on livre d'abord : tout le site, ou l'accueil seul (vide : tout le site).

Puis **un écran de 4 choix** (outil de question à choix) :
1. qui parle : « je » / « nous » / la marque ;
2. médias : « série et vidéo de hero générées, environ 5 $ (recommandé, niveau agence) » /
   « images et vidéo libres de banques, 0 $ » ;
3. mise en ligne : « gratuite, Netlify (recommandé) » / « gratuite, Cloudflare Pages » /
   « mon VPS Hostinger (plus long) » / « plus tard, je garde les fichiers » ;
4. formulaire de contact : « oui, par e-mail (Web3Forms, gratuit) » / « non, un lien
   e-mail et téléphone suffisent ».

Créer `projet-site/` avec `00-etat.md` : « Parcours : direct tout d'un coup », heure de départ, qui parle,
domaine, hébergeur, formulaire, et **« Budget IA : 0 $ / 5 $ »** si la série générée
est choisie, sinon « 0 $ / 0 $ » (conventions, « Le budget de génération »). Les médias suivent
`conventions.md`, « Les médias » : un seul discours, un seul dossier. Repérer les
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
   rôle et contenu attendu ; 10 à 13 pour l'accueil, 4 à 7 ailleurs). Plus
   `mentions-legales.html` et `confidentialite.html`, et `404.html`.
8. **Les images** : la liste des emplacements (rôle, page, proportion, ce qu'on voit),
   8 à 15 en tout, nommées par leur rôle (`hero`, `atelier`, `equipe`…).
9. **Le style** : une phrase (« éditorial, grandes photos, beaucoup d'air ») et une
   référence prise dans les sites aimés ou dans les exemples du plugin
   (`${CLAUDE_PLUGIN_ROOT}/skills/maquette/templates/exemples/README.md`) ; la composition
   (`commun/compositions.md`) et ce qui remplit chacune des 5 briques du hero
   (`niveau-agence.md` § 2 ter).
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

**b. Les médias** (un seul agent, pour une série homogène) :
- **banques libres** : un agent `fabricant` (Sonnet) avec la liste des emplacements de
  la fiche, **une requête en anglais par image**, la palette et la lumière voulues
  (« lumière du matin, tons sable et vert ») et l'orientation. Il cherche sur Unsplash
  et Pexels (Firecrawl `firecrawl_search` sources `images`, ou la page de recherche lue
  avec `firecrawl_scrape`), télécharge le fichier original en 1600 px au moins dans
  `projet-site/06-medias/brut/<role>.jpg`, et note chaque image dans
  `projet-site/06-medias/medias.md` (fichier, rôle, lien, auteur, licence, texte
  alternatif). Même chose pour une vidéo de hero libre (Pexels Videos, Coverr). Une image
  introuvable ou un téléchargement qui échoue : il le note, et la page utilisera un fond de
  la palette (dégradé ou aplat) à la place, signalé à l'utilisateur, jamais un rectangle vide ;
- **série générée** (si choisie) : l'agent principal génère d'abord l'image maîtresse, puis
  la série par édition à partir d'elle (`medias`, étape 5), et la boucle de hero, dans
  `06-medias/brut/`. Il annonce le coût, lance le lot en même temps (fal, sinon OpenRouter :
  conventions, « Quel générateur »), puis met à jour le budget dans `00-etat.md` avec le coût
  réel. Dépasser le budget accordé demande un oui ;
- **vraies photos** de l'utilisateur : toujours prioritaires, copiées dans `brut/`.

Puis `python3 ${CLAUDE_PLUGIN_ROOT}/skills/express/scripts/optimiser-images.py projet-site/06-medias/brut projet-site/site/medias`
(Pillow ; `pip install pillow` s'il manque) : `<role>-<largeur>.webp` selon la largeur réelle,
moins de 250 Ko, et la balise `<img>` à copier pour chacune (`--sizes` pour une image qui ne
prend pas toute la largeur).

**c. La coquille du site** : un agent `fabricant` **qui ne fait que la coquille**
(budget 10 min, jamais l'accueil en plus : au test réel, un agent chargé des deux a mis
73 min et bloqué tout le reste). Si les documents existent déjà (projet repris), le
lancer **pendant** la validation 1, sans attendre la réponse. Il écrit dans
`projet-site/site/` :
- `css/styles.css` : **Tailwind v4 compilé**. Installation dans un dossier temporaire,
  avec un cache npm à soi (le cache global appartient parfois à root) :
  `npm i --prefix "$TMPDIR/tw" --cache "$TMPDIR/npm" tailwindcss @tailwindcss/cli`, puis
  `"$TMPDIR/tw/node_modules/.bin/tailwindcss" -i css/source.css -o css/styles.css --minify`.
  Un bloc `@theme` tiré de la fiche ; si Node manque, un `styles.css` écrit à la
  main avec les mêmes variables CSS, plus
  `${CLAUDE_PLUGIN_ROOT}/skills/maquette/templates/prototype/gestes.css`, copié dans `css/`. Reprendre `tokens.css` ou `tailwind.css` du design
  system s'il existe, **sans relire toute la page de démonstration**. Les classes des composants communs y sont
  définies : bouton principal et secondaire, lien, carte, champ, bloc d'action, sections ;
- **polices et bibliothèques** selon `conventions.md`, « Node, polices et bibliothèques » : CDN à
  version exacte pendant le travail, auto-hébergées en WOFF2 dans `fonts/` et `js/` avant la mise en
  ligne, `@font-face` avec `font-display: swap`, préchargement de la police des titres ;
- `js/` : GSAP et Lenis aux versions exactes, puis
  `${CLAUDE_PLUGIN_ROOT}/skills/maquette/templates/prototype/gestes.js`, tous en
  `defer` ; `prefers-reduced-motion` respecté ;
- `_partials/entete.html` (logo, 3 à 5 liens, bouton d'action ; menu téléphone
  accessible) et `_partials/pied.html` (coordonnées, liens, légal), avec `{{racine}}`
  devant chaque lien interne. **Aucun lien vers une page absente** (`conventions.md` § 11) :
  `mentions-legales.html` et `confidentialite.html` se génèrent dès ce palier, sinon le lien se retire ;
- `robots.txt`, `sitemap.xml` (domaine de `00-etat.md`, ou l'adresse de l'hébergeur à
  remplacer au palier 6), favicon tiré du logo, `404.html` ;
- formulaire : si choisi, le composant de formulaire Web3Forms (clé
  `access_key` laissée vide, notée « à recevoir » : l'utilisateur la crée
  avec son e-mail), message de confirmation et d'erreur écrits.

**d. Le logo** (si à créer) : un agent `fabricant` écrit `site/medias/logo.svg` (et une
version claire), d'après la fiche.

**Le hero** (10 min visées ; environ 10 min mesurées, corrections comprises) : l'agent principal le
fait lui-même, c'est la plus grosse pièce et il fixe le style. Mêmes règles et même kit que le temps 2
de `direct` : les 5 briques de `${CLAUDE_PLUGIN_ROOT}/commun/niveau-agence.md` § 2 ter, boucle vidéo
visiblement vivante. Contrôle avant de continuer : `captures.py URL DOSSIER --hero --mouvement-reduit`,
les 6 tailles, sans alerte, captures `-souris` et `-defil-*` regardées.

**L'accueil** : dès que le hero, la coquille, les textes et les images sont là, un **autre**
agent `fabricant` monte le reste de `site/index.html` (brief du palier 4, avec la fiche et le hero
comme référence de style ; budget 12 min). L'agent principal le relit et le corrige : **c'est lui qui
fixe le style des autres pages**. Contrôler le comptage de `conventions.md` § 11, puis le montrer
(captures 1440 et 375).

**Le modèle de page** : chaque page contient les zones
`<!-- partiel:entete --><!-- /partiel:entete -->` et
`<!-- partiel:pied --><!-- /partiel:pied -->`, remplies par
`python3 ${CLAUDE_PLUGIN_ROOT}/skills/express/scripts/assembler.py projet-site/site`
(à relancer après tout changement du menu ou du pied).

## 4. Les autres pages (22 → 40 min)

**Accueil d'abord** (choix du questionnaire) : ne faire ici que les pages légales et la 404, retirer
du menu les liens vers les pages à venir, et le dire à la validation 2.

Un agent `fabricant` (Sonnet) **par page**, lancé **dès que ses textes et l'accueil sont
prêts** (sans attendre les autres pages). Brief :
- son fichier (`site/<nom-de-page>.html`), ses textes (`05-contenus/<nom-de-page>.md`),
  ses images (`site/medias/`, balises données par `optimiser-images.py`), la fiche, et
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
  débordement, texte ≥ 16 px sur mobile ;
- **budget 12 min**, lecture limitée à ses fichiers et à `index.html` (pas
  `DESIGN.md` ni la page de démonstration en entier) ; ne lancer ni serveur, ni
  installation, ni sortie du bac à sable ;
- **finir par un compte rendu** de 5 lignes au plus (fichiers écrits, manques,
  styles demandés au CSS commun) : sans lui, le parent doit rouvrir chaque page.

Chaque agent de page part le **même brief écrit une fois** dans un fichier
(`$TMPDIR/brief-page.txt`), plus deux lignes propres à sa page : le message de
lancement reste court et les 6 agents partent ensemble. Au test réel : 7 pages en
4 min.

**Le serveur local** : l'agent principal en lance **un seul** en arrière-plan, au
palier 3, `python3 ${CLAUDE_PLUGIN_ROOT}/commun/scripts/servir.py projet-site/site` : port libre,
page vérifiée, adresse sur la première ligne. Jamais de port fixe : il peut servir un autre projet.
Il donne cette adresse à chaque agent, et les captures passent `--titre "<titre de la page>"`.
Captures : `commun/scripts/captures.py` (`--tailles 3`) ; s'il ne peut pas tourner, Chrome
en mode sans fenêtre (`--headless=new --screenshot`), sinon le navigateur intégré de
l'agent principal ; rangées dans `projet-site/captures/<page>-<largeur>.png`.
Deux pièges de Chrome sans fenêtre : il n'accepte pas une fenêtre de moins de 500 px
environ (la capture « 375 » est alors tronquée à droite, ce n'est pas un débordement :
vérifier le téléphone au navigateur intégré en mode mobile, ou avec Playwright), et il
capture avant la fin des fondus d'apparition (`--virtual-time-budget=8000` au moins).
Le contrôle de débordement fiable : `document.documentElement.scrollWidth` égal à la
largeur, page par page, dans le navigateur intégré. Ces
commandes peuvent demander de sortir du bac à sable : le signaler (conventions, «
Captures d'écran »).

Quand toutes les pages sont là : relancer `assembler.py`, puis compléter `sitemap.xml`.

## 5. Vérifications (40 → 52 min) → validation 2

**Avant la validation 2** : `python3 ${CLAUDE_PLUGIN_ROOT}/commun/scripts/controle_parcours.py projet-site`, résultat collé dans le message. Un point `NON` se corrige, ou s'annonce en tête du message. Le rythme « tout d'un coup » retire des validations, jamais les agents, les textes, les médias ni le test.

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

**La page entière, une fois** (`direct`, temps 4) : `relecteur` et `client-persona` en mode `rapide`
sur l'accueil, lancés ensemble, 2 tours au plus, `captures.py` aux 6 tailles. Le verdict reste « validé
(simulé) ».

Puis montrer le **site complet** dans le navigateur (le serveur local), avec les
captures ordinateur et téléphone de chaque page, et la liste courte de ce qui reste à
recevoir (photos, clé du formulaire, informations des mentions légales). **Validation 2, sur sa
vraie machine**, avec les 4 essais du temps 2 de `direct` (sans toucher la souris, souris partout,
défilement lent puis rapide, téléphone au doigt) : « Mettre en ligne » / « Je change quelque
chose ». Une retouche : la faire, remontrer, redemander.

## 6. Mise en ligne (52 → 60 min)

Lire `${CLAUDE_PLUGIN_ROOT}/skills/deployer/SKILL.md` : ses actions qui exigent un
« oui » et son **étape 6 « Vérifier » s'appliquent en entier**. Le dossier publié est
une copie sans les fichiers de travail :
`rsync -a --delete --exclude _partials --exclude _sections --exclude DESIGN.md --exclude .lancetonsite --exclude /scripts --exclude 'css/source.css' projet-site/site/ projet-site/public/`
(à relancer avant chaque publication) :
- **Netlify** : `npx netlify-cli deploy --prod --dir=projet-site/public` (connexion dans
  le navigateur au premier lancement : le dire, ce temps ne compte pas) ;
- **Cloudflare Pages** : `npx wrangler pages deploy projet-site/public` ;
- **VPS Hostinger** : recette A de
  `${CLAUDE_PLUGIN_ROOT}/skills/deployer/references/recettes.md`, avec
  `${CLAUDE_PLUGIN_ROOT}/skills/deployer/scripts/deployer-statique.sh` et `projet-site/public` comme dossier ;
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

Un message court : l'adresse du site, le temps réel, total et par palier, ce qui reste à
fournir, et une ligne : « Pour aller plus loin (charte complète, maquette animée, niveau
agence) : `/lancetonsite:statut` propose le passage au dossier agence, sans rien perdre. »
`00-etat.md` à jour (« Phase : en ligne »).

## Ce que l'express ne fait pas

Pas de cadrage approfondi ni de personas, pas de charte en PDF, pas de wireframes ni de
maquette séparée, pas de design system documenté, pas de validation section par section, pas de
boutique, de réservation en ligne ni d'espace client. Le dire honnêtement si la demande
dépasse un site vitrine, et proposer le dossier agence. Ces retraits ne changent ni le hero, ni la
densité, ni la grille de `niveau-agence.md`.
