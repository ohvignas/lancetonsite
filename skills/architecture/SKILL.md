---
name: architecture
description: 'Conçoit la structure du site — arborescence et URLs, navigation, parcours de chaque persona jusqu''à l''action principale, recherche de mots-clés et intention de recherche par page, plan de liens internes, zoning de chaque page. Étape 4 de l''Atelier.'
when_to_use: '"arborescence", "plan du site", "sitemap", "quelles pages", "menu du site", "parcours utilisateur", "mots-clés SEO", "zoning", "wireframe", ou /atelier:architecture.'
---

# Architecture du site

Lire `${CLAUDE_PLUGIN_ROOT}/commun/conventions.md`.

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
  pages des concurrents bien classés. Chercher **en français, nativement** — jamais
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
- Menu principal : 4 à 7 entrées, libellés dans les mots des clients, l'action principale
  à droite en bouton.
- Mobile : l'action principale reste visible sans ouvrir le menu.
- Pied de page : coordonnées, horaires si commerce, liens légaux, réseaux.

## 5. Le zoning de chaque page

Pour chaque page : la liste ordonnée des blocs, avec pour chacun son rôle (quelle
question du persona il traite), le message clé, l'élément de preuve, et l'emplacement
d'image. Pas encore de textes définitifs ni de design. Indiquer **où** se trouve
l'action principale et combien de fois elle apparaît.

Éviter le gabarit par défaut « titre centré + sous-titre + bouton + 3 cartes à icônes » :
l'ordre des blocs suit le parcours du persona, pas un modèle.

## 6. Liens internes

Pas de page orpheline ; chaque page renvoie vers l'étape suivante du parcours ; ancres
descriptives (jamais « cliquez ici »).

## 7. Le document

Rédiger `projet-site/04-architecture.md` avec
[templates/04-architecture.md](templates/04-architecture.md), avec un schéma Mermaid de
l'arborescence ([references/schemas-mermaid.en.md](references/schemas-mermaid.en.md)).
Proposer aussi une planche HTML de zonings (blocs gris légendés) si l'utilisateur veut
« voir » la structure.

Relecture `relecteur` : chaque persona atteint-il l'action principale ? chaque objection
est-elle traitée quelque part ? deux pages visent-elles la même intention ?
Validation, `00-etat.md`. Prochaine étape : `/atelier:contenus`.
