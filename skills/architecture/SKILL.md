---
name: architecture
description: 'Conçoit la structure du site — arborescence et URLs, navigation, parcours de chaque persona jusqu''à l''action principale, recherche de mots-clés et intention de recherche par page, plan de liens internes, zoning de chaque page. Étape 4 de Lance ton site.'
when_to_use: '"arborescence", "plan du site", "sitemap", "quelles pages", "menu du site", "parcours utilisateur", "mots-clés SEO", "zoning", "wireframe", ou /lancetonsite:architecture.'
---

# Architecture du site

**Équipe d'agents** : lancer ensemble, dès le début, tout ce que prévoit
`${CLAUDE_PLUGIN_ROOT}/commun/agents.md` pour cette étape (un agent Sonnet par source,
page ou pièce indépendante).

Lire `${CLAUDE_PLUGIN_ROOT}/commun/conventions.md` et
`${CLAUDE_PLUGIN_ROOT}/commun/parcours.md` (rythme, document publié, porte de
validation). **Budget : 7 min** (les wireframes se font en parallèle, § 6 bis). Document présenté : suivre le modèle
`${CLAUDE_PLUGIN_ROOT}/commun/modeles/architecture.md`, version courte par défaut.
Publier l'arborescence en schéma dès qu'elle existe, puis compléter au même lien.

Les pages, les parcours et les mots-clés se décident **avant** le design : sinon on
dessine des composants pour des pages qui n'existent pas.

## Entrées

- `01-cadrage.md` — personas, déclencheurs, objections, action principale.
- `02-marque.md` — messages clés.
- En refonte : `sources/site-actuel/` (toutes les URLs existantes : chacune aura une
  redirection 301 si elle change).

## 1. Les parcours d'abord

Pour chaque persona : d'où il arrive (recherche Google, Instagram, bouche-à-oreille,
fiche Google Business), ce qu'il cherche à savoir, dans quel ordre, quelle objection il
doit voir levée, où il passe à l'action. Écrire chaque parcours en 4 à 6 étapes.
Une page n'existe que si un parcours en a besoin.

## 2. Les mots-clés

Méthode : [references/mots-cles.md](references/mots-cles.md).
- Partir des mots des clients (banque de citations), pas de ceux du métier.
- Élargir : suggestions Google, « Autres questions posées », recherches associées,
  pages des concurrents bien classés — 2 ou 3 recherches lancées en parallèle, extraits
  seulement (version courte). Chercher **en français, nativement** — jamais
  traduire des mots-clés anglais.
- Si un outil de volumes est connecté (DataForSEO, etc.) : l'utiliser après avoir
  annoncé le coût. Sinon : estimer « fort / moyen / faible » et le dire.
- Classer par intention : information, comparaison, achat, local, marque.
- **Une intention principale par page.** Deux pages sur la même intention se cannibalisent.
- Activité locale : intégrer la ville et les quartiers, et prévoir la fiche Google
  Business Profile (voir [references/seo-local.en.md](references/seo-local.en.md)).

## 3. L'arborescence

Repères : [references/modeles-par-type-de-site.en.md](references/modeles-par-type-de-site.en.md).
- Petit site vitrine : 1 à 2 niveaux. Toute page importante à 3 clics max de l'accueil.
- URLs : minuscules, tirets, sans accents, en français, sans dates ni identifiants,
  reflet de la hiérarchie (`/cours/debutant`).
- Pages légales obligatoires en France : mentions légales, politique de confidentialité,
  gestion des cookies si traceurs, CGV si vente en ligne. Les prévoir dès maintenant.
- Prévoir la page 404 et, si utile, une page « merci » après l'action principale.

## 4. La navigation

Repères : [references/navigation.en.md](references/navigation.en.md).
- Barre de navigation : logo, **3 à 5 liens** dans les mots des clients, **un** bouton
  d'action à droite, aucun numéro de téléphone. Règle complète et modèles :
  `${CLAUDE_PLUGIN_ROOT}/commun/niveau-agence.md` § 3. Les autres pages passent dans
  un sous-menu ou le pied de page.
- Mobile : l'action principale reste visible sans ouvrir le menu.
- Pied de page complet : coordonnées, horaires si commerce, plan du site, liens légaux,
  réseaux, inscription à la lettre si le métier publie.

## 5. Le zoning de chaque page

Pour chaque page : la liste ordonnée des blocs, avec pour chacun son rôle (quelle
question du persona il traite), le message clé, l'élément de preuve, et l'emplacement
d'image. Pas encore de textes définitifs ni de design. Indiquer **où** se trouve
l'action principale et combien de fois elle apparaît.

**L'accueil est complet** : il reprend les sections attendues et tient dans la
fourchette de `conventions.md` § 11 (le lire). Partir de la liste des sections
attendues, cocher celles que le métier demande, et noter dans le zoning la raison de
chaque section écartée (« pas de tarifs publics : devis sur mesure »). Comparer avec ce
que montrent les leaders du secteur (`01-cadrage.md`, « Les leaders du secteur »). Un
sujet qui demande plus de 3 phrases (FAQ complète, caractéristiques, tarifs détaillés,
méthode longue) a sa **page dédiée**, prévue dans l'arborescence ; l'accueil l'annonce
en un bloc court et un lien.

**Catalogue, boutique, articles : décidés au zoning.** Pour chaque projet, trancher et
écrire dans `04-architecture.md` (§ 5) :
- **Le métier vend des produits** (boulangerie, café, ferme, boutique, créateur) :
  une section **produits** sur l'accueil, avec de vraies fiches (photo, nom, prix,
  action). L'action dit comment on achète : ajout au panier (boutique en ligne), ou
  commande avec retrait (« Réserver pour samedi »), ou réservation. Les fiches de
  l'accueil sont un extrait (3 à 8) ; le catalogue entier a sa page.
- **Le métier publie** (actualités, recettes, conseils, programme, journal d'atelier) :
  une section **articles** ou **journal**, en cartes datées (date, titre, image, lien),
  3 sur l'accueil, la liste entière sur sa page.
- **Les deux** sont possibles ; **aucune des deux** se justifie en une phrase.
- **D'où viennent les données.** Ces sections sont pensées pour être reliées à un
  **CMS** (outil où le client ajoute ses articles et ses produits sans coder) ou à une
  **boutique** (Shopify, WooCommerce, ou un service de commande et de retrait). Le
  noter dans le zoning (« fiches tirées de la boutique ») : le PRD le met dans la stack
  (`prd` § 1) et la construction le branche (`construire` § 3).

**Chaque page de l'arborescence a son zoning**, et chaque gabarit répété aussi (un
article type, la liste des articles, une fiche produit type, le catalogue) : la maquette
et la construction font toutes les pages, pas seulement l'accueil. Un article ou une
section « ressources » prévue « pour plus tard » (§ 7) se décide ici : si les mots-clés
n'amènent pas assez de visites aux pages principales, prévoir le gabarit article dès
maintenant, avec 2 ou 3 sujets réels.

Éviter les gabarits par défaut : « titre centré + sous-titre + bouton + 3 cartes à
icônes » et « pastille + grand titre à gauche + 2 boutons + réassurance + 3 cartes »
(`${CLAUDE_PLUGIN_ROOT}/commun/compositions.md`). L'ordre des blocs suit le parcours du
persona, pas un modèle ; leur mise en scène viendra de la composition choisie au
début de la maquette (étape 7).

## 6. Liens internes

Pas de page orpheline ; chaque page renvoie vers l'étape suivante du parcours ; ancres
descriptives (jamais « cliquez ici »).

## 6 bis. Les wireframes

Le zoning dit **quels** blocs et dans quel ordre ; le wireframe montre **où** et **quelle
taille** : la place de chaque bloc sur l'écran, en gris, sans couleur ni police de la
charte ni image. Le client valide la structure avant de voir le design, et la maquette
(étape 7) n'a plus qu'à l'habiller.

- **Un wireframe par page et par gabarit** du zoning, dans
  `projet-site/04-wireframes/<page>.html`, à partir du modèle
  [templates/wireframe.html](templates/wireframe.html) (blocs gris légendés, grille de
  12 colonnes, aperçu ordinateur et téléphone côte à côte).
- **Lancés en parallèle** (`commun/agents.md`) : un agent `fabricant` par page, tous dans
  un même message, chacun avec le zoning de sa page.
- Dans chaque bloc : son **rôle** (accrocher, prouver, rassurer, faire agir), sa
  **question** et la **longueur** du texte attendu (« titre, 6 à 10 mots ») ; le bouton de
  l'action principale est le seul élément foncé. Les emplacements d'image portent leur
  proportion (16:9, 4:5) et ce qu'ils montreront, en une ligne.
- Sur téléphone : le même ordre, empilé ; ce qui passe en accordéon ou en carrousel est
  écrit.
- Une page `04-wireframes/index.html` les relie toutes (lien vers chaque page).
- Capture de chaque wireframe à 1440 et 375 px dans `04-wireframes/captures/`, et
  relecture : aucun bloc sans rôle, l'action principale visible dès le premier écran.

## 7. Le document

Rédiger `projet-site/04-architecture.md` avec
[templates/04-architecture.md](templates/04-architecture.md), avec un schéma Mermaid de
l'arborescence ([references/schemas-mermaid.en.md](references/schemas-mermaid.en.md)).
Le document présenté (`parcours.md` § 3) montre l'arborescence en schéma, les parcours,
les mots-clés par page, le zoning de chaque page et ses **wireframes** (`04-wireframes/`,
publiés avec le document : l'index et un lien par page ; jamais une capture comme
livrable).

Relecture soi-même en une minute : chaque persona atteint-il l'action principale ?
chaque wireframe suit-il son zoning ?
chaque objection est-elle traitée quelque part ? deux pages visent-elles la même
intention ? Puis **porte de validation** (`parcours.md` § 4) : jamais les contenus sans
un oui. `00-etat.md` et tableau de bord à jour. Prochaine étape : `/lancetonsite:contenus`.
