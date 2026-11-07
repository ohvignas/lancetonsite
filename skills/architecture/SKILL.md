---
name: architecture
description: 'Conçoit la structure du site — arborescence et URLs, navigation, parcours de chaque persona jusqu''à l''action principale, recherche de mots-clés et intention de recherche par page, plan de liens internes, zoning de chaque page. Étape 4 de Lance ton site.'
when_to_use: '"arborescence", "plan du site", "sitemap", "quelles pages", "menu du site", "parcours utilisateur", "mots-clés SEO", "zoning", "wireframe", ou /lancetonsite:architecture.'
---

# Architecture du site

**Équipe d'agents** : avec l'outil `Agent`, lancer ensemble, dès le début, un `chercheur`
par groupe de pages (mots-clés et questions posées), puis un `fabricant` par page pour son
wireframe (`${CLAUDE_PLUGIN_ROOT}/commun/agents.md`). Sans l'outil `Agent`, les mêmes
tâches l'une après l'autre.

Lire `${CLAUDE_PLUGIN_ROOT}/commun/conventions.md` et
`${CLAUDE_PLUGIN_ROOT}/commun/parcours.md` (rythme, document publié, porte de
validation). Document présenté : suivre le modèle
`${CLAUDE_PLUGIN_ROOT}/commun/modeles/architecture.md`, en entier.
Publier l'arborescence en schéma dès qu'elle existe, puis compléter au même lien.

**Tout est obligatoire à cette étape** : un parcours par persona, la recherche complète de
mots-clés, l'arborescence, la navigation, le zoning et le wireframe de chaque page et de chaque
gabarit, leurs captures, le plan complet de liens internes et l'inventaire de contenus.

**Aucune question pendant l'étape.** Un manque devient une `[hypothèse]` visible dans
`04-architecture.md` et se tranche à la porte.

Les pages, les parcours et les mots-clés se décident **avant** le design : sinon on
dessine des composants pour des pages qui n'existent pas.

## Entrées

- `01-cadrage.md` — personas, déclencheurs, objections, action principale.
- `02-marque.md` — messages clés.
- En refonte : `sources/site-actuel/` (toutes les URLs existantes : chacune a une redirection
  301 si elle change, notée dans `04-architecture.md`, § Redirections).
- `00-etat.md`, ligne Périmètre. Si elle dit « accueil seul » : l'arborescence ne prévoit
  que l'accueil et les pages légales ; le contenu des pages dédiées (tarifs, FAQ,
  catalogue, articles…) reste sur l'accueil, en sections complètes sans lien vers une page
  qui n'existe pas, et ces pages vont dans « Hors périmètre » (`04-architecture.md`, § 7). Le zoning, le wireframe et les captures de l'accueil sont alors faits en entier.

## 1. Les parcours d'abord

Pour chaque persona : d'où il arrive (recherche Google, Instagram, bouche-à-oreille,
fiche Google Business), ce qu'il cherche à savoir, dans quel ordre, quelle objection il
doit voir levée, où il passe à l'action. Écrire chaque parcours en 4 à 6 étapes.
Une page n'existe que si un parcours en a besoin.

## 2. Les mots-clés

Si un outil de volumes est connecté (le MCP `dataforseo`), y prendre les volumes et les
résultats Google réels de la langue et du pays visés, après avoir annoncé le coût du lot.
Sans lui, ne donner aucun volume chiffré : estimer « fort / moyen / faible » et le dire.
Dans les deux cas, toute la recherche ci-dessous se fait.

Méthode : [references/mots-cles.md](references/mots-cles.md), appliquée en entier.
- Partir des mots des clients (banque de citations), pas de ceux du métier : 5 à 10 graines.
- Élargir à 30 à 50 variantes : suggestions Google, « Autres questions posées », recherches
  associées, pages des concurrents bien classés — un `chercheur` par groupe de pages, lancés
  en parallèle, chacun écrit son résultat dans `sources/mots-cles/<groupe>.md`. Chercher **en
  français, nativement** — jamais traduire des mots-clés anglais.
- Classer par intention : information, comparaison, achat, local, marque.
- Regrouper en comparant les premiers résultats Google de deux requêtes (méthode § 4).
- Pour chaque page, noter 2 à 3 questions précises auxquelles elle doit répondre.
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
en un bloc court et un lien (sauf périmètre « accueil seul » : le sujet reste sur
l'accueil, voir Entrées).

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

**Chaque page de l'arborescence a son zoning et son wireframe (§ 7)**, et chaque gabarit
répété aussi (un article type, la liste des articles, une fiche produit type, le
catalogue) : ils sont obligatoires, sans exception. La maquette et la construction font
toutes les pages, pas seulement l'accueil. Un article ou une
section « ressources » se décide ici : si les mots-clés n'amènent pas assez de visites aux
pages principales, prévoir le gabarit article, avec 2 ou 3 sujets réels ; sinon, le noter
dans « Hors périmètre » (`04-architecture.md`, § 7), avec la raison.

Éviter les gabarits par défaut : « titre centré + sous-titre + bouton + 3 cartes à
icônes » et « pastille + grand titre à gauche + 2 boutons + réassurance + 3 cartes »
(`${CLAUDE_PLUGIN_ROOT}/commun/compositions.md`). L'ordre des blocs suit le parcours du
persona, pas un modèle ; leur mise en scène viendra de la composition choisie au
début de la maquette (étape 7).

## 6. Liens internes

Le plan complet, dans le tableau de `04-architecture.md`, § 6 : pas de page orpheline ; chaque
page renvoie vers l'étape suivante du parcours ; ancres descriptives (jamais « cliquez ici »).

## 7. Les wireframes

Le zoning dit **quels** blocs et dans quel ordre ; le wireframe montre **où** et **quelle
taille** : la place de chaque bloc sur l'écran, en gris, sans couleur ni police de la
charte ni image. Le client valide la structure avant de voir le design, et la maquette
(étape 7) n'a plus qu'à l'habiller.

- **Un wireframe par page et par gabarit** du zoning, dans
  `projet-site/04-wireframes/<page>.html`, à partir du modèle
  [templates/wireframe.html](templates/wireframe.html) (blocs gris légendés, grille de
  12 colonnes, aperçu ordinateur et téléphone côte à côte).
- **Lancés en parallèle** (`${CLAUDE_PLUGIN_ROOT}/commun/agents.md`) : un agent `fabricant` par page, tous dans
  un même message, chacun avec le zoning de sa page.
- Dans chaque bloc : son **rôle** (accrocher, prouver, rassurer, faire agir), sa
  **question** et la **longueur** du texte attendu (« titre, 6 à 10 mots ») ; le bouton de
  l'action principale est le seul élément foncé. Les emplacements d'image portent leur
  proportion (16:9, 4:5) et ce qu'ils montreront, en une ligne.
- Sur téléphone : le même ordre, empilé ; ce qui passe en accordéon ou en carrousel est
  écrit.
- Une page `04-wireframes/index.html` les relie toutes (lien vers chaque page).
- **Les captures de chaque wireframe**, à 1440 et 375 px. Servir le dossier en arrière-plan
  (`python3 ${CLAUDE_PLUGIN_ROOT}/commun/scripts/servir.py projet-site/04-wireframes`, qui
  écrit l'adresse), puis, pour chaque page :
  `python3 ${CLAUDE_PLUGIN_ROOT}/commun/scripts/captures.py <adresse>/<page>.html projet-site/04-wireframes/captures/<page> --tailles 1440x900,375x812 --pleine-page`
  → `1440x900.png` et `375x812.png`. Les captures servent au contrôle, jamais de livrable.
- Regarder chaque capture : aucun bloc sans rôle, aucun débordement, l'action principale
  visible dès le premier écran.

## 8. Le document

**Gabarits** : la liste des types de pages réutilisables, chacun avec son zoning et son
wireframe. **Inventaire de contenus** : pour chaque page, ce qui existe déjà et ce qu'il faut
produire (textes, photos, avis, chiffres), qui le fournit et pour quand.

Rédiger `projet-site/04-architecture.md` avec
[templates/04-architecture.md](templates/04-architecture.md), avec un schéma Mermaid de
l'arborescence ([references/schemas-mermaid.en.md](references/schemas-mermaid.en.md)).
Le document présenté (`parcours.md` § 3) montre l'arborescence en schéma, les parcours,
les mots-clés par page, le zoning de chaque page et ses **wireframes** (`04-wireframes/`,
publiés avec le document : l'index et un lien par page ; jamais une capture comme
livrable).

## Avant la porte

Cocher d'après les fichiers de `projet-site/`, en les ouvrant. Un manque se fait maintenant.

- [ ] `sources/mots-cles/` : un fichier par groupe de pages, avec graines, variantes, intention et sources.
- [ ] `04-architecture.md` § 1 : un parcours par persona de `01-cadrage.md`, en 4 à 6 étapes, qui finit sur l'action principale. Chaque objection est levée quelque part.
- [ ] § 2 : le schéma Mermaid et le tableau des pages. Chaque URL est en minuscules, avec tirets, sans accents. Chaque page importante est à 3 clics au plus de l'accueil. Pages légales et 404 prévues.
- [ ] § 2, Redirections : en refonte seulement, une ligne par URL qui change.
- [ ] § 3 : 3 à 5 liens dans les mots des clients, un seul bouton d'action, version mobile, pied de page complet.
- [ ] § 4 : chaque page a une requête principale distincte, ses secondaires, son intention, son volume (chiffre d'un outil, ou « estimé »), ses questions et son title visé. Aucune intention en double.
- [ ] § 5 : le choix catalogue et articles est tranché. Chaque page et chaque gabarit a son tableau de zoning, avec rôle, question, message, preuve, image et action. Chaque section attendue écartée de l'accueil a sa raison.
- [ ] § 6 : aucune page orpheline, aucune ancre « cliquez ici ».
- [ ] §§ 7 à 10 : remplis, sans `{{` restant. Les manques sont en `[hypothèse]`.
- [ ] `04-wireframes/index.html` relie tous les wireframes, liens essayés.
- [ ] `04-wireframes/<page>.html` : un par page et par gabarit, `accueil.html` compris, conforme à son zoning. Le bouton de l'action principale est le seul élément foncé.
- [ ] `04-wireframes/captures/<page>/` : `1440x900.png` et `375x812.png` pour chaque wireframe, regardées.
- [ ] `00-etat.md` et tableau de bord à jour.

Puis le contrôle d'étape : `${CLAUDE_PLUGIN_ROOT}/commun/boucle-persona.md`, « Le contrôle
d'étape ».

Puis **porte de validation** (`parcours.md` § 4) : jamais les contenus sans un oui.
Prochaine étape : `/lancetonsite:contenus`.
