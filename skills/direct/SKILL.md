---
name: direct
description: 'Parcours direct de Lance ton site, celui par défaut : on crée tout de suite les vraies pièces du site dans un seul lien, on passe dessus ensemble, on avance. Une fiche d''une page, le hero d''abord, puis chaque section sur la même page, contrôlée et validée, un seul tour de client simulé sur la page entière, puis les autres pages et la mise en ligne avec accord. La maquette est le site : rien n''est refait à la construction.'
when_to_use: '"on crée direct", "sans tous les documents", "section par section", "montre-moi le hero", "on avance directement", ou /lancetonsite:direct.'
argument-hint: "[nouveau | reprendre | section <nom>]"
---

# Direct : on crée, on passe dessus, on avance

**La maquette est le site.** Dès le hero, on travaille sur la vraie page, avec les vrais
textes et les vrais médias, dans `projet-site/site/` (`site/` dans la suite). Il n'y a ni dossier à valider avant de
voir quelque chose, ni reconstruction à la fin : ce qui est validé est ce qui part en ligne.

Lire `${CLAUDE_PLUGIN_ROOT}/commun/agents.md` (dont le repli si un agent manque), puis seulement ces
parties : `${CLAUDE_PLUGIN_ROOT}/commun/conventions.md` § 1, § 8, § 9 à § 12, et
`${CLAUDE_PLUGIN_ROOT}/commun/niveau-agence.md` § 2, § 2 ter (le hero), § 3 et § 4. `commun/parcours.md`
ne s'applique pas, sauf ses § 2 et § 3. Les renvois à l'étape 7 valent ici pour le temps 2 ou 3.

**Tout le reste tient**, sans exception : aucun chiffre, avis, client ni logo inventé présenté
comme vrai ; aucun mot interne dans une page en ligne ; budget de génération annoncé ; les
actions qui exigent un « oui » (mise en ligne, DNS, pare-feu, achats, téléchargements,
suppression). Le oui de l'utilisateur ne se simule pas : un agent qui joue le client ne répond
jamais à sa place.

## Les deux rythmes

Réglage noté dans `00-etat.md` (« Parcours : direct section par section »), changeable à tout moment.

| Rythme | Pour qui | Ce qui se passe |
|---|---|---|
| **Section par section** (par défaut) | l'utilisateur veut voir et décider à chaque pièce | ce fichier, du temps 1 au temps 5 |
| **Tout d'un coup** | l'utilisateur veut le même niveau sans s'arrêter à chaque section | `${CLAUDE_PLUGIN_ROOT}/skills/express/SKILL.md` : deux validations, la fiche et le site entier |

**Même qualité, autre rythme** : le hero aux 5 briques, la densité de `conventions.md` § 11, la grille
de `niveau-agence.md` et le test de la page entière valent pour les deux.

Le parcours en 12 étapes reste disponible, en option « dossier agence »
(`${CLAUDE_PLUGIN_ROOT}/commun/parcours.md`) : pour un client qui veut les documents
complets (cadrage, marque, charte, plan). Un projet direct peut y passer sans rien perdre :
`${CLAUDE_PLUGIN_ROOT}/skills/statut/SKILL.md`, « Passer au dossier agence ».

## Reprendre un projet

`/lancetonsite:direct reprendre`, ou un `projet-site/` déjà présent en parcours direct : lire
`00-etat.md`, reprendre au premier temps non fait, sans rien redemander.

`/lancetonsite:direct nouveau` : partir du temps 1 sans chercher de reprise ; un `projet-site/` existant n'est jamais écrasé : le dire et demander un autre dossier de travail.
`/lancetonsite:direct section <nom>` : rouvrir cette seule section (`site/_sections/NN-nom/`, boucle du temps 3), validée ou non, une fois le hero validé ; les autres ne bougent pas.

| Déjà présent | Reprendre au |
|---|---|
| `00-etat.md` seul | temps 1, la fiche |
| `00-fiche.md` validée | temps 2, le hero |
| hero validé (`00-etat.md`) | temps 3, première section non validée |
| toutes les sections validées | temps 4 |
| note et verdict du temps 4 | temps 5 |

## Temps 1. La fiche d'une page

Questionnaire : celui de `demarrer` § 4, ou d'`express` § 1 si la commande est lancée seule. Une
seule fois, tout groupé, en ne redemandant rien de ce qui a déjà été dit. Repérer les connexions
sans les déclencher (`demarrer` § 6).

Écrire `projet-site/00-fiche.md` selon `express` § 2 (une page : cible, promesse et preuves
réelles, ton, couleurs de départ, typos, logo, pages et plan de la page d'accueil, images, style,
hypothèses). En même temps, un agent `chercheur` par concurrent ou site aimé, en arrière-plan :
ce qui arrive en retard complète la fiche sans la retenir.

**Les textes** partent dès que la fiche est écrite : un agent `redacteur-page` pour l'accueil, un pour
les pages légales (structure de `contenus`, « Pages légales »). Brief :
« Tes sources sont **uniquement** `projet-site/00-fiche.md` et `projet-site/sources/` ; les fichiers
01, 02 et 04 n'existent pas en direct, ne les cherche pas. » Plus : les blocs de sa page, vrais textes,
3 phrases au plus par bloc, `title` (60 caractères) et meta description (155), texte alternatif de
chaque image, aucun chiffre ni avis inventé ; un manque s'écrit `[à recevoir : …]` dans le fichier de
textes **seulement**. Sortie : `projet-site/05-contenus/<nom-de-page>.md`.

Publier la fiche, poser une seule question : « On part là-dessus » / « Je change un point ». Le
reste se règle en voyant les pièces, pas dans un document.

## Temps 2. Le hero d'abord

Le hero fixe le style de tout le site : couleurs réelles, typos, matières, boutons, mouvement. Il
se fait seul, dans **un seul lien** qui restera celui de toute la page.

**Le concept, adapté au métier** : les cinq briques de `niveau-agence.md` § 2 ter. Jamais le même
sujet d'un site à l'autre, sinon tous les sites se ressemblent. Le kit :
- personnage dont seuls les yeux suivent : `${CLAUDE_PLUGIN_ROOT}/skills/maquette/templates/prototype/personnage-vivant/` ;
- bouton sans effet parasite : `${CLAUDE_PLUGIN_ROOT}/skills/maquette/templates/elements/bouton-lumiere.md` ;
- bande de logos : `${CLAUDE_PLUGIN_ROOT}/skills/maquette/templates/elements/bande-logos.md` ;
- fonds, gestes, éléments et objets 3D : `${CLAUDE_PLUGIN_ROOT}/skills/maquette/templates/` (`fonds-hero/`, `elements/`,
  `elements-3d/`, `prototype/GESTES.md`) ;
- modèles complets : `${CLAUDE_PLUGIN_ROOT}/skills/maquette/templates/exemples/README.md`.

Médias selon `conventions.md`, « Les médias » : générés en arrière-plan, coût annoncé avant, sources
dans `06-medias/brut/`, fichiers web dans `site/medias/` (jamais intégrés à la page pendant le travail).
Le hero se montre tout de suite avec une image fixe si la vidéo n'est pas prête.

Noter dans `00-fiche.md` (« Le style ») la composition et ce qui remplit chacune des 5 briques.

**Contrôles automatiques avant de montrer** :
`python3 ${CLAUDE_PLUGIN_ROOT}/commun/scripts/captures.py URL DOSSIER --hero --titre "<titre de la page>"`,
aux 6 tailles (URL : `python3 ${CLAUDE_PLUGIN_ROOT}/commun/scripts/servir.py projet-site/site`, port
libre et page vérifiée). Toute vidéo en boucle : images isolées cherchées, 12 images réparties regardées.

**La validation, point par point, par l'utilisateur sur sa vraie machine.** C'est un contrôle
obligatoire, que ni les captures ni le client simulé ne remplacent : sur le projet de test, le
client simulé a mis 87/100 à un hero dont le cou se décolait et dont le bouton tremblait, défauts
vus par l'utilisateur en passant la souris. Lui demander explicitement d'essayer :
1. à l'arrivée, sans toucher la souris : qu'est-ce qui bouge, et est-ce voulu ?
2. en passant la souris partout, boutons compris : rien ne tremble, rien ne saute ;
3. en défilant lentement, puis vite, jusqu'à la fin de la scène ;
4. sur son téléphone, au doigt.

Question : « Le hero est bon sur ta machine ? » / « Je change ». Sans ce oui, pas de section
suivante. Puis tirer du hero `site/css/tokens.css` et un `DESIGN.md` court (couleurs, typos,
rayons, ombres, boutons, durées) : **le design system vient de ce qui a été validé**, pas l'inverse.

## Temps 3. Section par section, sur la même page

Le plan de page vient de la fiche (10 à 13 sections, `conventions.md` § 11). La boucle, pour chaque
section :

1. **En arrière-plan pendant que l'utilisateur regarde la précédente** : un agent `fabricant`
   prépare la suivante dans son propre dossier `site/_sections/NN-nom/` (`section.html`,
   `section.css`, `section.js`, classes préfixées). Brief : `00-fiche.md`, `DESIGN.md`,
   `tokens.css`, ses textes, ses médias, le kit. Il ne touche jamais à `index.html`. Les textes de
   toute la page partent dès le temps 1 (un `redacteur-page`), les médias en lot avec le coût annoncé.
2. **L'agent principal relit et insère** la section dans `site/index.html`, à sa place. Aucun lien
   vers une page absente (`conventions.md` § 11). Il garde
   la direction : une section qui ressemble à la précédente se reprend. Une interaction par
   section, une seule idée, un visuel plus fort que le texte (`niveau-agence.md`).
3. **Contrôles automatiques** : `captures.py --tailles 3` sur la page, `mesures.json` lu (débordement,
   console, images manquantes, liens morts), vidéos en boucle vérifiées, mouvement réduit. Ce qui échoue se corrige avant
   de montrer.
4. **Publier au même lien** (outil Artifact avec `files` pour les médias ; sinon serveur local).
5. **Une question** : « Section NN : on garde ? » / « Je change ». Ne pas attendre sans rien faire :
   la suivante se prépare déjà. Plusieurs retours d'un coup : un lot par fichier, en parallèle.

Ce qui ne se valide pas section par section : le client simulé. Il coûte trop cher ici : 12 sections
× 2 tours × environ 9 min, soit environ 3 h 30 de test. Il passe une fois, au temps 4.

## Temps 4. La page entière, une fois

Une fois toutes les sections validées, lancés **ensemble** : l'agent `relecteur` et l'agent
`client-persona` en mode `rapide` (`${CLAUDE_PLUGIN_ROOT}/commun/boucle-persona.md`). **2 tours au plus**, le second
en mode `controle` sur les corrections. Le verdict du persona met au mieux en « validé (simulé) »
et ne remplace jamais le oui de l'utilisateur, qui repasse sur la page entière sur sa machine.
`captures.py` aux 6 tailles, comptage de `conventions.md` § 11 fourni.

## Temps 5. Les autres pages, puis la mise en ligne

Un agent `redacteur-page` par page restante (brief du temps 1), puis un agent `fabricant` par page, lancés ensemble, en reprenant les sections déjà validées, leurs
classes et leurs scripts : pas de nouveau style. Un agent `verificateur` par contrôle (liens,
accessibilité, SEO, vitesse, textes), comme `express` § 5.

**Construction** : `site/` est déjà le site, en HTML, CSS et JS. Pas de PRD ni de plan à rédiger,
rien à reconstruire. Une autre technique (Astro, CMS…) seulement si l'utilisateur la demande, ou si
le site en a besoin (boutique, espace client, mises à jour sans coder) : les sections sont alors
reprises telles quelles en composants, le rendu ne change pas (`construire`).

Polices et bibliothèques passent alors en auto-hébergé (`conventions.md`, « Node, polices et
bibliothèques »).

**Mise en ligne** : `deployer` (entrée « parcours direct ou express »), seulement avec le oui de
l'utilisateur. Le dossier publié est une copie sans les fichiers de travail, à relancer avant chaque
publication :
`rsync -a --delete --exclude _partials --exclude _sections --exclude DESIGN.md --exclude .lancetonsite --exclude /scripts --exclude 'css/source.css' projet-site/site/ projet-site/public/`

## Le chrono : mesurer, ne pas promettre

Noter dans `00-etat.md` (« Avancement (direct) ») le temps de chaque temps et de chaque section. Ne jamais annoncer une durée
qui n'a pas été mesurée. Ce parcours n'a **pas encore été chronométré de bout en bout**.

**Ce que couvre la seule mesure d'ensemble : 25 min 30 s, environ 4,13 $ estimés** (test Atelier Mélisse,
06/11/2026). Rythme tout d'un coup, réponses au questionnaire fournies d'avance, du début de la lecture
à la page ouverte. Page d'accueil seule : 9 sections et 374 mots, sous la grille. Pas de client simulé,
pas d'essai réel à la souris ni au téléphone, pas d'autres pages, pas de mise en ligne. Elle inclut des
pertes depuis corrigées : 4 min 40 s et 1,34 $ pour refaire des boucles trop immobiles, environ 1 min 30 s
sur le mauvais site. Une seule mesure : un repère, pas une promesse.

| Élément | Visé | Mesuré |
|---|---|---|
| Fiche | 10 min | 33 s, sans lecture de concurrents (Mélisse) |
| Hero | 10 min | environ 10 min, corrections comprises (Mélisse) |
| Section, section par section | | à mesurer |
| Page d'accueil complète, tout d'un coup, sans persona ni essai réel | | 25 min 30 s, environ 4,13 $ estimés (Mélisse) |
| Client simulé `rapide` | 5 min | 7 min 01 |
| Client simulé `controle` | 5 min | 11 min 05, 11 min 19, 8 min 48 |
| Captures par script | | 26 s pour 6 tailles |
| Pages construites par agents (express) | | 7 pages en 4 min |
