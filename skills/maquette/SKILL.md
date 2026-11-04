---
name: maquette
description: 'Dessine la maquette du site sur un canevas Claude Design (créé depuis Claude Code, ou dans l''application Claude) et en version animée — toutes les pages de l''architecture, en desktop et mobile, avec le design system, les vrais textes et les vrais médias — la fait critiquer, l''ajuste avec l''utilisateur (commentaires sur le canevas, ou retours dans la conversation quand il n''y a pas de canevas) jusqu''à sa validation. Étape 8 de Lance ton site, dernière étape de conception avant la construction.'
when_to_use: '"maquette", "mockup", "dessine le site", "à quoi va ressembler le site", "page d''accueil en design", "Claude Design", "prototype", ou /lancetonsite:maquette.'
argument-hint: "[accueil | toutes | page <nom> | critique | valider]"
---

# Maquette

Lire `${CLAUDE_PLUGIN_ROOT}/commun/conventions.md` (introuvable : voir « Trouver les
fichiers du plugin » au début de ce fichier de conventions, ou chercher
`conventions.md` dans le dossier du plugin).

La maquette ne crée rien de nouveau : elle **assemble** ce qui est validé — pages et
zonings (04), textes (05), design system (06), médias (07) — et montre le site avant
d'écrire une ligne de code. Une fois validée, c'est la **référence visuelle** que Claude
Code reproduira.

## Entrées

- `04-architecture.md` — liste des pages, zonings, action principale de chaque page.
- `05-contenus/` — textes finaux. Aucun texte inventé, aucun « lorem ipsum ».
- `06-design-system/` — `DESIGN.md`, `tokens.css`, `demo.html` ; et le design system
  Claude Design créé à l'étape 6 s'il existe.
- La **composition** choisie à l'étape 6 (`00-etat.md`, ligne « Composition ») et sa
  fiche dans `${CLAUDE_PLUGIN_ROOT}/commun/compositions.md` : hero type, rythme, moment
  signature, gestes, médias, budget de mots. Pas de composition notée : la choisir
  d'abord (`design-system`, § 1), jamais par défaut.
- `07-medias/medias.md` et les fichiers — images, vidéos, logo (`03-charte/logo/`).
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
    du kit (`08-maquette/prototype/`) et ses pages (`08-maquette/pages/`), ouverts dans
    le navigateur, **plus** les captures (`08-maquette/captures/`, tailles des
    conventions) **plus** la liste des retours dans `maquette.md` (rubrique « Retours » :
    date, retour de l'utilisateur, ce qui a été changé). Ne pas promettre de commentaires
    sur un canevas.
  - Garder une **copie de la source** du design dans `08-maquette/source/` après chaque
    série de retouches : c'est elle que l'étape 10 retrouvera. Une seule version fait
    foi : celle du design ; la copie est mise à jour, jamais modifiée à part.
  - Le type Design peut déconseiller de « vérifier » le rendu : les captures et la
    critique (§ 4) se font quand même, sur la copie locale (Playwright, conventions §
    « Captures d'écran »).
- **Dans l'application Claude (Claude Design)** — si la conception s'y fait. Créer un design (type **Design**)
  nommé « {{Projet}} — maquette », qui utilise le design system de l'étape 6. Si le design
  system Claude Design n'existe pas encore, le créer d'abord à partir de `DESIGN.md`,
  `tokens.css`, du logo et des polices (voir `design-system`, § 8).

## 0. Vérifier la cohérence avant de dessiner

Relire 04, 05, 06 et 07 ensemble et lister les contradictions de chiffres et de formats
(nombre de dates affichées, prix, durées, proportions des images, ordre des sections).
Les corriger dans les documents — en faisant trancher l'utilisateur si c'est un choix —
**avant** de dessiner. Vérifier aussi que **chaque objectif du cadrage** (réserver,
demander un devis, acheter, contacter…) a son point d'entrée sur l'accueil ; un objectif
sans entrée : l'ajouter au zoning et le dire.

Ouvrir `08-maquette/maquette.md` dès maintenant, en `brouillon` (modèle
[templates/maquette.md](templates/maquette.md)) : on y note les écarts au fil des
retouches ; il passe en `validé` à la fin (§ 6).

## 1. L'ordre des pages

Annoncer le plan en une ligne : d'abord la **page d'accueil**, puis la page qui porte
l'**action principale** (réservation, devis, achat…), puis les autres. Une page
validée sert de modèle aux suivantes : on ne refait pas tout à chaque page.

## 2. La page d'accueil, desktop et mobile

- **La page suit sa composition** (fiche de `compositions.md`) : les blocs du zoning
  de `04-architecture.md`, dans l'ordre, mis en scène selon la fiche ; chaque section
  porte ses **vrais textes** copiés de `05-contenus/accueil.md` (titre, sous-titre,
  boutons, preuves) et ses **vrais médias** (manifeste 07, avec leur texte alternatif).
- **Densité moyenne** : 7 à 9 sections, 3 phrases au plus par section, moins de 400
  mots visibles (budget : conventions § 11). Le détail va sur sa page dédiée.
- Uniquement les couleurs, typos, espacements, rayons et composants du design system.
  Un besoin qu'il ne couvre pas : le dire, proposer l'ajout, l'ajouter au design system
  (pas une exception locale).
- Montrer **les deux largeurs** : ordinateur et téléphone (tailles des conventions,
  « Captures d'écran »). Le mobile n'est pas une version
  réduite : navigation, ordre des blocs et action principale pensés pour le pouce.
- Les états visibles comptent : menu ouvert, survol et focus des boutons, formulaire en
  erreur, FAQ dépliée.
- Le hero est **celui de la composition** (vidéo plein cadre, objet seul, couverture,
  phrase-affiche, œuvre, interface vivante, matière annotée) ; jamais le gabarit
  interdit « pastille + grand titre à gauche + 2 boutons + réassurance + 3 cartes ».
  Des sections de formes différentes (niveau-agence § 3), pas une pile de blocs de même
  largeur.
- **Le mouvement se montre** : la maquette de l'accueil est aussi une **page HTML
  animée** (`08-maquette/prototype/accueil.html`), avec les **gestes du kit**
  [templates/prototype/](templates/prototype/). **Le kit fournit les gestes, pas la
  structure** : son `index.html` est une démonstration de gestes, **pas un gabarit à
  remplir**. On copie `gestes.js` (avec `generer-images.py`) dans
  `08-maquette/prototype/`, et le `@theme` vient de `06-design-system/tailwind.css` ;
  d'`index.html`, on ne reprend que le `<head>` technique (scripts aux versions exactes,
  anti-flash `js-attente`, règles CSS des états des gestes). **La structure se compose
  d'après la fiche de `compositions.md`** : son hero, son rythme, son moment signature,
  ses gestes. Chaque geste se branche par un attribut `data-*` : API complète et « quel
  geste pour quelle section » dans [GESTES.md](templates/prototype/GESTES.md). Avant de
  composer, ouvrir les deux landing pages d'exemple validées par un client exigeant
  ([templates/exemples/](templates/exemples/README.md) : Brume en « immersif plein
  écran », Vigie en « produit centré », deux compositions opposées) pour viser ce niveau
  de finition, pas pour copier leur structure. Chaque `<img>` porte son `data-prompt` (prompt + bloc de style
  de 07) et son `data-ratio` : les images manquantes se génèrent d'un coup
  (`python3 generer-images.py accueil.html --style style.txt`, ou l'outil MCP
  `generate-image` emplacement par emplacement). Le kit est écrit en **Tailwind CSS v4**
  (`@tailwindcss/browser` depuis un CDN, `@theme` des tokens) avec **GSAP** (ScrollTrigger,
  SplitText) et **Lenis**, versions exactes : les gestes de `DESIGN.md` § motion, une
  interaction par section et le moment signature (en cas de contradiction entre
  `DESIGN.md` et `niveau-agence.md`, voir « Qui prime » en tête de ce dernier). Captures des étapes de chaque
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
- **Mobile : l'action principale se voit dans le premier écran** (taille « premier
  écran mobile » des conventions), sans défiler ; une grande photo ne doit pas la
  repousser plus bas.

## 3. Montrer et ajuster

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
(`magick 08-maquette/captures/*.png 08-maquette/maquette.pdf`, sinon Pillow en Python).
Pour le mouvement, joindre le prototype zippé (`accueil.html` s'ouvre dans un
navigateur). Noter dans `maquette.md` ce qui a été envoyé, et quand.

**Les questions mises de côté.** Au premier passage, poser en **une** question à choix
multiples tout ce qui attend dans « À confirmer en voyant la maquette » (`maquette.md`),
chaque point avec l'hypothèse affichée sur la page. En mode rapide, y ajouter le **test
de voix** de la marque (`marque`, § 4) : « Ces trois phrases de la page, est-ce que tu
les dirais à un client ? »

Une seule question à la fois (« Qu'est-ce qui te gêne le plus sur cette page ? », avec
2 à 4 pistes concrètes). Après chaque série de retouches, remontrer la page.

**Règle de vérité.** Une retouche de la maquette qui change un **texte** se reporte dans
`05-contenus/` ; une retouche qui change une **couleur, une taille ou un composant** se
reporte dans `06-design-system/` (DESIGN.md + tokens). Les documents et la maquette ne
doivent jamais diverger : Claude Code construira à partir des deux. Chaque report est
noté dans `08-maquette/maquette.md`, rubrique « Écarts reportés ».

## 4. La critique (obligatoire, avant de présenter comme terminé)

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
     Au-delà du budget : couper, ou déplacer le détail vers sa page, puis recompter ;
   - **la composition est suivie** : hero type, rythme et moment signature de sa fiche
     (`compositions.md`) ; rien du gabarit interdit ;
   - aucun mot interne visible dans la page (voir § 2) ;
   - pas de grand vide : une colonne ou une zone blanche plus haute que la moitié de
     l'écran à côté d'un bloc est une erreur de grille, sauf choix assumé et noté ;
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
   - **documents amont à jour** : si la maquette change une règle de `DESIGN.md` ou un
     texte de `05-contenus/`, mettre le document à jour (avec l'accord du client), pas
     seulement le noter dans `maquette.md`.
5. Accessibilité visible : contrastes (`python3 ${CLAUDE_PLUGIN_ROOT}/skills/charte/scripts/contraste.py`
   sur toute couleur ajoutée), cibles tactiles ≥ 44 px, focus visible, texte ≥ 16 px sur mobile.
6. **La note sur 100** (niveau-agence § 6), donnée par le relecteur sur les captures et
   le prototype animé. Seuil **85** tant que les médias sont provisoires, **90** avec
   les vraies photos et les vraies preuves. En dessous : corriger, **refaire les
   captures après la dernière correction**, renoter (3 tours au plus). Noter la note de
   départ, la note finale et les changements dans `maquette.md`.
   - **À 88** : avec des médias provisoires, le seuil est atteint. Présenter, avec la
     note et la liste de ce qui bloque 90 (souvent : vraies photos, vrais avis), notée
     dans `maquette.md` (« Ce qui manque encore ») ; le 90 se revérifie à la construction. Avec les vraies photos,
     88 reste sous le seuil : corriger encore.
   - **Après 3 tours sous le seuil** : présenter quand même, avec la note et ce qui
     bloque. Pas de quatrième tour.
7. Corriger, puis présenter avec la liste des corrections faites et la note.

## 5. Les autres pages

Page par page, dans l'ordre annoncé, en réutilisant les sections déjà validées. Pour un
site de plus de 8 pages : maquetter un exemplaire de chaque **gabarit** (une fiche
produit, un article) et le dire.

Pages légales (mentions, confidentialité) : un seul gabarit texte suffit.

## 6. La validation

Quand toutes les pages sont montrées, demander explicitement (outil de question à choix
si disponible) : « La maquette est-elle validée ? C'est elle que Claude Code va
reproduire. » — options « Oui, elle est validée » / « Il reste des retouches ».

En mode rapide, la question précise que valider la maquette valide aussi les textes,
les couleurs et les photos prévues qu'elle montre (conventions § 7) : passer alors ces
documents en `validé`.

Seul un « oui » clair valide. Puis compléter `projet-site/08-maquette/maquette.md` et le
passer en `validé` : lien du design (ou chemin du prototype), liste des pages et
gabarits, décisions de mise en page, interactions et animations, écarts reportés dans
05 et 06, médias manquants. Dans Claude, si possible, exporter aussi des captures PNG
des pages (desktop et mobile) dans `08-maquette/captures/`.

Mettre à jour `00-etat.md`. Prochaine étape : `/lancetonsite:passation` — envoyer la
maquette et le dossier projet à Claude Code.
