---
name: maquette
description: 'Dessine la maquette du site dans Claude Design — toutes les pages de l''architecture, en desktop et mobile, avec le design system, les vrais textes et les vrais médias — la fait critiquer, l''ajuste avec l''utilisateur (commentaires sur le canevas, retouches directes) jusqu''à sa validation. Étape 8 de Lance ton site, dernière étape de conception avant le passage à Claude Code.'
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
- `07-medias/medias.md` et les fichiers — images, vidéos, logo (`03-charte/logo/`).
- `02-marque.md` (curseurs de voix) et `01-cadrage.md` (persona principal) pour la critique.

Un document manque : règle des conventions (§ 2). Un média manque : le **générer
avec OpenRouter** dans la direction photo (voir `medias`, « Générer, par défaut » ; un
seul oui pour le lot, coût en euros), banques libres seulement en repli, avec une
annotation hors de la page — jamais un rectangle vide ou hachuré.

**Le niveau visé** : `${CLAUDE_PLUGIN_ROOT}/commun/niveau-agence.md` (le lire
maintenant). La maquette est en **haute fidélité** : grandes images, grille éditoriale,
mouvement réel. C'est ce que l'utilisateur achète ; une maquette sage en colonnes avec
des boîtes grises ressemble à une ébauche, même avec de bons textes.

## Où dessiner

- **Dans Claude (Claude Design)** — le cas normal. Créer un design (type **Design**)
  nommé « {{Projet}} — maquette », qui utilise le design system de l'étape 6. Si le design
  system Claude Design n'existe pas encore, le créer d'abord à partir de `DESIGN.md`,
  `tokens.css`, du logo et des polices (voir `design-system`, § 8).
- **Dans Claude Code** (l'utilisateur a choisi de tout faire ici) : créer un design
  Claude Design depuis Claude Code (artifact de type Design, comme la commande
  `/design`) s'il est disponible, sinon des pages HTML statiques autonomes dans
  `projet-site/08-maquette/pages/`, montrées dans le navigateur.
  - Garder une **copie de la source** du design dans `08-maquette/source/` après chaque
    série de retouches : c'est elle que l'étape 10 retrouvera. Une seule version fait
    foi : celle du design ; la copie est mise à jour, jamais modifiée à part.
  - Le type Design peut déconseiller de « vérifier » le rendu : les captures et la
    critique (§ 4) se font quand même, sur la copie locale (Playwright, conventions §
    « Captures d'écran »).

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

- Suivre le zoning de `04-architecture.md` dans l'ordre ; chaque section porte ses
  **vrais textes** copiés de `05-contenus/accueil.md` (titre, sous-titre, boutons,
  preuves) et ses **vrais médias** (manifeste 07, avec leur texte alternatif).
- Uniquement les couleurs, typos, espacements, rayons et composants du design system.
  Un besoin qu'il ne couvre pas : le dire, proposer l'ajout, l'ajouter au design system
  (pas une exception locale).
- Montrer **les deux largeurs** : 1440 px et 375 px. Le mobile n'est pas une version
  réduite : navigation, ordre des blocs et action principale pensés pour le pouce.
- Les états visibles comptent : menu ouvert, survol et focus des boutons, formulaire en
  erreur, FAQ dépliée.
- Le hero en image ou vidéo **plein cadre** ; au moins une image pleine largeur plus
  bas ; des sections de formes différentes (niveau-agence § 3), pas une pile de blocs
  de même largeur.
- **Le mouvement se montre** : la maquette de l'accueil est aussi une **page HTML
  animée** (`08-maquette/prototype/accueil.html`), **à partir du kit**
  [templates/prototype/](templates/prototype/) : copier `index.html` et `gestes.js` dans
  `08-maquette/prototype/` (avec `generer-images.py`), remplacer le `@theme` par celui de
  `06-design-system/tailwind.css`, puis les sections d'exemple par le zoning, les textes
  et les médias du projet. Chaque geste se branche par un attribut `data-*` (liste en
  tête de `gestes.js`). Chaque `<img>` porte son `data-prompt` (prompt + bloc de style
  de 07) et son `data-ratio` : les images manquantes se génèrent d'un coup
  (`python3 generer-images.py accueil.html --style style.txt`, ou l'outil MCP
  `generate-image` emplacement par emplacement). Le kit est écrit en **Tailwind CSS v4**
  (`@tailwindcss/browser` depuis un CDN, `@theme` des tokens) avec **GSAP** (ScrollTrigger,
  SplitText) et **Lenis**, versions exactes : les gestes de `DESIGN.md` § motion, une
  interaction par section et le moment signature. Captures des étapes de chaque
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
- **Mobile : l'action principale se voit dans le premier écran** (812 px de haut),
  sans défiler ; une grande photo ne doit pas la repousser plus bas.

## 3. Montrer et ajuster

Présenter la page en une phrase, puis expliquer une fois comment agir :
- **commenter** directement un élément du canevas (« ce titre est trop long ») ;
- **modifier** soi-même un texte ou un espacement sur le canevas ;
- ou répondre ici.

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
   d'agents), se relire en changeant de posture, avec ses 6 questions (conventions § 6).
   Consigne : « Trouve tout ce qui fait généré par IA, et tout ce qu'un concurrent pourrait
   publier tel quel. »
3. **Test des 5 secondes** : en regardant le haut de l'accueil, le persona principal
   comprend-il ce qu'on vend, pour qui, et quoi faire ? Sinon, reprendre le haut de page.
4. **Contrôles de mise en page**, sur les captures 375 et 1440 :
   - aucun mot interne visible dans la page (voir § 2) ;
   - pas de grand vide : une colonne ou une zone blanche plus haute que la moitié de
     l'écran à côté d'un bloc est une erreur de grille, sauf choix assumé et noté ;
   - l'action principale visible dans le premier écran mobile ;
   - chaque objectif du cadrage a son entrée ;
   - la voix (« je », « nous »…) tenue partout.
5. Accessibilité visible : contrastes (`python3 ${CLAUDE_PLUGIN_ROOT}/skills/charte/scripts/contraste.py`
   sur toute couleur ajoutée), cibles tactiles ≥ 44 px, focus visible, texte ≥ 16 px sur mobile.
6. **La note sur 100** (niveau-agence § 6), donnée par le relecteur sur les captures et
   le prototype animé. Seuil 90 : en dessous, corriger, **refaire les captures après la
   dernière correction**, renoter (3 tours au plus). Noter la note de départ, la note
   finale et les changements dans `maquette.md`.
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
passer en `validé` : lien du design, liste des pages et
gabarits, décisions de mise en page, interactions et animations, écarts reportés dans
05 et 06, médias manquants. Dans Claude, si possible, exporter aussi des captures PNG
des pages (desktop et mobile) dans `08-maquette/captures/`.

Mettre à jour `00-etat.md`. Prochaine étape : `/lancetonsite:passation` — envoyer la
maquette et le dossier projet à Claude Code.
