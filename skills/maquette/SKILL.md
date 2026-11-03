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

Un document manque : règle des conventions (§ 2). Un média manque : bloc neutre de la
bonne proportion, étiqueté « photo à venir : … » — jamais une image de banque inventée.

## Où dessiner

- **Dans Claude (Claude Design)** — le cas normal. Créer un design (type **Design**)
  nommé « {{Projet}} — maquette », qui utilise le design system de l'étape 6. Si le design
  system Claude Design n'existe pas encore, le créer d'abord à partir de `DESIGN.md`,
  `tokens.css`, du logo et des polices (voir `design-system`, § 8).
- **Dans Claude Code** (l'utilisateur a choisi de tout faire ici) : créer un artifact de
  type Design s'il est disponible, sinon des pages HTML statiques autonomes dans
  `projet-site/08-maquette/pages/`, montrées dans le navigateur.

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
- Les animations prévues (DESIGN.md § motion) sont décrites en note sur le canevas ou
  montrées si l'outil le permet.

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
4. Accessibilité visible : contrastes (`python3 ${CLAUDE_PLUGIN_ROOT}/skills/charte/scripts/contraste.py`
   sur toute couleur ajoutée), cibles tactiles ≥ 44 px, focus visible, texte ≥ 16 px sur mobile.
5. Corriger, puis présenter avec la liste des corrections faites.

## 5. Les autres pages

Page par page, dans l'ordre annoncé, en réutilisant les sections déjà validées. Pour un
site de plus de 8 pages : maquetter un exemplaire de chaque **gabarit** (une fiche
produit, un article) et le dire.

Pages légales (mentions, confidentialité) : un seul gabarit texte suffit.

## 6. La validation

Quand toutes les pages sont montrées, demander explicitement (outil de question à choix
si disponible) : « La maquette est-elle validée ? C'est elle que Claude Code va
reproduire. » — options « Oui, elle est validée » / « Il reste des retouches ».

Seul un « oui » clair valide. Puis rédiger `projet-site/08-maquette/maquette.md` avec
[templates/maquette.md](templates/maquette.md) : lien du design, liste des pages et
gabarits, décisions de mise en page, interactions et animations, écarts reportés dans
05 et 06, médias manquants. Dans Claude, si possible, exporter aussi des captures PNG
des pages (desktop et mobile) dans `08-maquette/captures/`.

Mettre à jour `00-etat.md`. Prochaine étape : `/lancetonsite:passation` — envoyer la
maquette et le dossier projet à Claude Code.
