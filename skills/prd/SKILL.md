---
name: prd
description: 'Première étape de la construction — reprend le dossier projet et la maquette validée (canevas Claude Design et version animée, ou export envoyé depuis l''application Claude), aide à choisir la stack technique (Astro, Next.js, WordPress, Webflow, Framer, HTML…) selon le projet et la personne qui maintiendra le site, puis rédige le PRD (document d''exigences produit) et le plan d''implémentation en tâches courtes et vérifiables. Étape 10 de Lance ton site.'
when_to_use: '"PRD", "cahier des charges", "quelle stack", "Astro ou WordPress", "plan d''implémentation", "plan de développement", "spécifications du site", "j''ai la maquette de Claude Design", "reprendre la passation", ou /lancetonsite:prd.'
argument-hint: "[reprendre | stack | prd | plan]"
---

# PRD et plan d'implémentation

**Équipe d'agents** : lancer ensemble, dès le début, tout ce que prévoit
`${CLAUDE_PLUGIN_ROOT}/commun/agents.md` pour cette étape (un agent Sonnet par source,
page ou pièce indépendante).

Lire `${CLAUDE_PLUGIN_ROOT}/commun/conventions.md` et
`${CLAUDE_PLUGIN_ROOT}/commun/parcours.md` (rythme, document publié, porte de
validation). Les étapes 9 et 10 restent séparées, chacune avec sa porte ; la vérification
de la passation n'est pas refaite ici. La stack recommandée est montrée en premier.
Document présenté : le modèle `${CLAUDE_PLUGIN_ROOT}/commun/modeles/prd.md`, en entier.

Cette étape se fait dans **Claude Code**. Lancée dans Claude : l'expliquer en une phrase
et lancer `lancetonsite:passation`, qui prépare l'envoi vers Claude Code.

## 0. Reprendre la passation

Rassembler dans le dossier du site :

1. **Le dossier projet.** `projet-site/` présent → OK. Sinon chercher `projet-site.zip`
   dans le dossier de travail ; absent, demander où il est (souvent
   `~/Downloads/`), puis le décompresser ici. Idem pour
   `projet-site-medias.zip` s'il existe. Un zip reçu n'a pas encore été vérifié : après
   l'avoir décompressé, aller d'abord à `/lancetonsite:passation` (partie A), puis revenir
   ici.
2. **La maquette.** Tout fait dans Claude Code (cas normal) : elle est déjà là
   (`07-maquette/maquette.md` avec le lien du canevas, la version animée
   `07-maquette/prototype/` et les captures) → OK, passer au point 3. Conception dans
   l'application Claude : récupérer l'export selon l'envoi :
   - « Send to local coding agent » : la demande arrive avec le design ; enregistrer ses
     fichiers (HTML/CSS/JS, captures, README) dans `projet-site/07-maquette/bundle/` ;
   - export zip (ou `design-bundle/`) : le décompresser dans
     `projet-site/07-maquette/bundle/` ;
   - si la commande `/design` de Claude Code est disponible, elle peut aussi importer le
     design : ranger le résultat au même endroit.
   Aucune maquette : conventions § 2. Soit l'étape manquante se fait (`lancetonsite:maquette`),
   soit le design system devient la seule référence visuelle, marquée `[hypothèse]`.
3. **Contrôle de cohérence.** `09-passation.md` (partie A) validée : la vérification est
   faite, ne pas la refaire ; lire la note et le README du bundle, c'est tout. Sinon (pas
   de note, ou un bundle arrivé après) : comparer maquette et documents, page par page :
   textes (05), couleurs et typos (03, 08), pages (04). Lister les écarts ; règle : la
   maquette validée fait foi pour l'apparence, `05-contenus/` pour les textes. Mettre à
   jour le document concerné. Un cas douteux reste en `[hypothèse]` et se tranche à la
   porte.
4. Mettre à jour `00-etat.md` : phase « construction (Claude Code) ».

## Entrées

Tous les documents 01 à 09, et la maquette (`07-maquette/`). Le PRD les **référence** au
lieu de les recopier : il dit quoi construire et comment vérifier, les documents amont
disent pourquoi, et la maquette à quoi ça ressemble.

## 1. Choisir la stack

Lance ton site ne bloque sur aucune stack : c'est l'utilisateur qui choisit, en connaissance
de cause. **Pas de question ici** : les réponses viennent du questionnaire du démarrage
(`00-etat.md`) et des documents ; un trou devient une `[hypothèse]` affichée. Le choix se
fait à la porte de validation. Établir et écrire les cinq points :
1. **Qui mettra à jour le site** après la mise en ligne, et à quelle fréquence
   (lui sans coder, lui avec l'IA, un développeur, personne).
2. **Quelles fonctions**, d'après le zoning : vitrine, blog, réservation, paiement, espace
   membre, multilingue, catalogue.
3. **Où l'héberger**, d'après `00-etat.md` : VPS Hostinger déjà là, hébergement géré, ou
   pas d'avis.
4. **Budget mensuel** acceptable pour l'outil et l'hébergement.
5. Une stack **déjà imposée** ou préférée.

**Le prototype peut-il devenir le site ?** Site vitrine, sans boutique, sans espace
client, et personne n'a besoin de mettre à jour le contenu sans coder : recommander
**HTML/CSS**. Le prototype validé (`07-maquette/prototype/`) devient le site, sans
réécriture, quel que soit le nombre de pages. Ne pas proposer une stack codée plus lourde
sans raison.

Puis présenter 2 à 3 options avec la matrice
[references/stacks.md](references/stacks.md) : pour chacune, ce que ça coûte, qui peut
modifier le contenu, compatibilité VPS, effort de construction, limites. Recommander
une option et dire pourquoi ; la publier tout de suite en tête du document, les autres
en une ligne chacune. Si l'utilisateur choisit une option déconseillée pour son cas, le
dire une fois, clairement, puis suivre son choix.

Vérifier les versions actuelles (recherche web ou documentation à jour) avant de les
écrire : ne jamais citer une version de mémoire.

**Le CMS ou la boutique, dans la stack.** Si le zoning (`04-architecture.md`,
« Catalogue et articles ») prévoit une section produits ou articles, la stack retenue
la nourrit : un **CMS** (outil où le client ajoute un article ou un produit sans
coder : collections de contenu, CMS en ligne, WordPress) ou une **boutique** (Shopify,
WooCommerce, service de commande et de retrait). Pour chaque option présentée, dire
comment le client ajoute un produit ou un article, et ce que ça coûte par mois. Jamais
une liste de produits ou d'articles écrite en dur dans le code. Le choix va dans
`10-prd.md` (stack) et `00-etat.md`.

Fonctions tierces : retenir le service le plus simple adapté (formulaire : service
de formulaires ou endpoint maison ; réservation : outil de réservation existant
intégré plutôt que développé ; paiement : Stripe / SumUp / lien de paiement). Ne jamais
recoder ce qu'un service fiable fait déjà.

## 2. Le PRD

Rédiger `projet-site/10-prd.md` avec [templates/10-prd.md](templates/10-prd.md).
Contenu clé :
- problème, objectif, indicateurs de succès (repris du cadrage) ;
- fiche, hypothèses et leur risque, histoires d'utilisateurs (E1, E2…) ;
- périmètre : **dans** / **hors** (pour cette version) / **plus tard**. Rien de ce que
  prévoient le cadrage, le zoning ou la maquette ne va en « hors » ou en « plus tard » ;
- exigences par page (renvoi vers `04-architecture.md`, `05-contenus/` et la page de la
  maquette correspondante) ;
- **catalogue et articles** : quel CMS ou quelle boutique, quels champs (nom, photo,
  prix, action ; date, titre, image), qui les remplit, et comment l'accueil affiche les
  derniers ;
- **fidélité à la maquette** : chaque page construite doit correspondre à la maquette
  validée, aux tailles de capture des conventions (mêmes sections, même ordre, mêmes composants, mêmes
  textes) ;
- exigences transverses, avec seuils mesurables :
  - performance : LCP < 2,5 s, INP < 200 ms, CLS < 0,1 sur mobile ; poids de page cible ;
  - accessibilité : RGAA / WCAG 2.2 AA (contrastes, clavier, lecteurs d'écran, focus) ;
  - SEO : titles/meta de `05-contenus/`, sitemap.xml, robots.txt, données structurées
    JSON-LD (LocalBusiness, Organization, BreadcrumbList…), Open Graph ;
  - légal France : mentions légales, RGPD, bandeau cookies **seulement si** traceurs non
    exemptés (préférer une mesure d'audience exemptée de consentement) ;
  - sécurité : HTTPS, en-têtes de sécurité, formulaires protégés contre le spam ;
- design : renvois à la maquette, au design system, aux médias, états vide, erreur et
  chargement ;
- contenus et intégrations : formulaires, e-mails, tous les outils tiers, et le plan de
  mesure (événements suivis, outil, où lire le résultat) ;
- questions ouvertes : qui répond, à quelle date ;
- critères d'acceptation : liste cochable, chaque critère vérifiable par une commande ou
  une action précise.

## 3. Le plan d'implémentation

Rédiger `projet-site/11-plan.md` avec [templates/11-plan.md](templates/11-plan.md).
Chaque tâche de page cite sa source visuelle (fichier ou capture de
`07-maquette/prototype/`, `bundle/` s'il existe, ou `captures/`).
Méthode adaptée de `writing-plans` (obra/superpowers, MIT ;
[references/methode-plans.en.md](references/methode-plans.en.md)) :
- **En-tête** : objectif, stack et versions, arborescence des fichiers à créer (une
  responsabilité par fichier), contraintes globales recopiées mot pour mot (tokens
  uniquement, mobile d'abord, aucun texte inventé — tout vient de `05-contenus/`).
- **Tâches courtes** : chacune livre quelque chose de visible et vérifiable seule
  (« le pied de page s'affiche avec les liens légaux, testé aux tailles des conventions »).
- Pour chaque tâche : fichiers touchés, sources à lire (quel document amont), étapes,
  **commande de vérification** et résultat attendu, commit.
- Ordre type : initialisation → tokens et polices → mise en page de base → composants →
  CMS ou boutique branché (s'il y en a un) → pages (action principale d'abord) → médias →
  nettoyage (`data-prompt`, fichiers de travail) → SEO technique → accessibilité →
  performance → pages légales → **redirections 301** (refonte : une ligne par ancienne
  URL de `04-architecture.md`) → recette finale → déploiement.
- Stack hébergée (Webflow, Framer, Shopify) : les tâches décrivent la saisie dans
  l'outil (ou via son connecteur), pas du code.
- Interdits dans un plan : « à définir », « gérer les cas limites », « etc. ». Une étape
  doit être sans ambiguïté, pas exhaustive.
- Stack HTML/CSS : copier le prototype dans `site/`, assembler
  (`commun/scripts/assembler.py`), optimiser les médias (`optimiser-images.py`), nettoyer,
  poser le SEO technique et les pages légales, vérifier, puis déploiement. Pas de tâche
  « reconstruire ».
- **Section « Déploiement »** : cible, recette (renvoi vers `/lancetonsite:deployer`),
  domaine, commande de mise à jour.

## Avant la porte

Cocher d'après les fichiers, pas de mémoire. Un manque se fait maintenant.

**`10-prd.md`**
- [ ] Fiche : statut, date visée ou « non fixée », décideur, liens vers la maquette et le dossier.
- [ ] Objectif repris du cadrage, 2 à 3 indicateurs avec cible et outil.
- [ ] Hypothèses : chacune avec son risque si elle est fausse.
- [ ] Une histoire E1, E2… par fonction, avec priorité et critères vérifiables.
- [ ] Une ligne d'exigences par page de `04-architecture.md`, avec sa page de maquette.
- [ ] Exigences transverses chiffrées, chacune avec sa vérification : performance,
      accessibilité, SEO, sécurité, RGPD, navigateurs.
- [ ] Design : renvois valides, états vide, erreur et chargement.
- [ ] Stack : versions vérifiées et datées, raison, coût récurrent, options écartées.
- [ ] Toutes les intégrations et le plan de mesure.
- [ ] Hors périmètre : au moins 3 éléments nommés.
- [ ] Questions ouvertes : qui répond, date.
- [ ] Critères d'acceptation : chacun avec sa commande ou son action.
- [ ] Zoning avec produits ou articles : CMS ou boutique, champs, qui les remplit.

**`11-plan.md`**
- [ ] En-tête : objectif, stack et versions, arborescence, contraintes globales.
- [ ] Chaque page de `04-architecture.md` a sa tâche et sa source visuelle.
- [ ] Chaque exigence de `10-prd.md` est couverte par une tâche.
- [ ] Les tâches médias et nettoyage sont présentes (stack hébergée : aucun fichier de
      travail n'entre dans l'outil).
- [ ] SEO technique et pages légales ont leur tâche.
- [ ] Refonte : une redirection 301 par ancienne URL de `04-architecture.md`.
- [ ] Chaque tâche a ses fichiers, ses sources, ses étapes, sa commande de vérification et
      son résultat attendu. Stack hébergée : la saisie dans l'outil et sa vérification.
- [ ] Aucun « à définir », « gérer les cas limites », « etc. ».
- [ ] Section « Déploiement » : cible, recette, domaine, commande de mise à jour.

**`00-etat.md`**
- [ ] Stack et hébergement remplis, phase « construction (Claude Code) ».

Puis le contrôle d'étape (`${CLAUDE_PLUGIN_ROOT}/commun/boucle-persona.md`, « Le contrôle
d'étape »). Puis la porte.

## 4. La porte

Publier le PRD et le plan (`parcours.md` § 3), puis **porte de validation**
(`parcours.md` § 4) : la stack retenue, le périmètre, le nombre de tâches, la note du
contrôle, et « Valider et passer à l'étape suivante » / « Modifier ». Jamais la
construction sans ce oui. Tableau de bord à jour. Prochaine étape :
`/lancetonsite:construire`.
