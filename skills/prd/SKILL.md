---
name: prd
description: 'Première étape de la construction — reprend le dossier projet et la maquette validée (canevas Claude Design et version animée, ou export envoyé depuis l''application Claude), aide à choisir la stack technique (Astro, Next.js, WordPress, Webflow, Framer, HTML…) selon le projet et la personne qui maintiendra le site, puis rédige le PRD (document d''exigences produit) et le plan d''implémentation en tâches courtes et vérifiables. Étape 10 de Lance ton site.'
when_to_use: '"PRD", "cahier des charges", "quelle stack", "Astro ou WordPress", "plan d''implémentation", "plan de développement", "spécifications du site", "j''ai la maquette de Claude Design", "reprendre la passation", ou /lancetonsite:prd.'
argument-hint: "[reprendre | stack | prd | plan]"
---

# PRD et plan d'implémentation

Lire `${CLAUDE_PLUGIN_ROOT}/commun/conventions.md`.

Cette étape se fait dans **Claude Code**. Lancée dans Claude : l'expliquer en une phrase
et proposer `/lancetonsite:passation`.

## 0. Reprendre la passation

Rassembler dans le dossier du site :

1. **Le dossier projet.** `projet-site/` présent → OK. Sinon chercher `projet-site.zip`
   dans le dossier de travail ; absent, demander où il est (souvent
   `~/Downloads/`) et, avec l'accord de l'utilisateur, le décompresser ici. Idem pour
   `projet-site-medias.zip` s'il existe.
2. **La maquette.** Tout fait dans Claude Code (cas normal) : elle est déjà là
   (`08-maquette/maquette.md` avec le lien du canevas, la version animée
   `08-maquette/prototype/` et les captures) → OK, passer au point 3. Conception dans
   l'application Claude : récupérer l'export selon l'envoi :
   - « Send to local coding agent » : la demande arrive avec le design ; enregistrer ses
     fichiers (HTML/CSS/JS, captures, README) dans `projet-site/08-maquette/bundle/` ;
   - export zip (ou `design-bundle/`) : le décompresser dans
     `projet-site/08-maquette/bundle/` ;
   - si la commande `/design` de Claude Code est disponible, elle peut aussi importer le
     design : ranger le résultat au même endroit.
   Aucune maquette : le dire, proposer de la faire (`/lancetonsite:maquette`) ou de continuer avec `06-design-system/demo.html`
   comme seule référence visuelle, marqué `[hypothèse]`.
3. **Contrôle de cohérence.** Lire `09-passation.md`, `08-maquette/maquette.md` et le
   README du bundle. Comparer rapidement maquette et documents : textes (05), couleurs
   et typos (06), pages (04). Lister les écarts ; règle : la maquette validée fait foi
   pour l'apparence, `05-contenus/` pour les textes — faire trancher les cas douteux,
   mettre à jour le document concerné.
4. Mettre à jour `00-etat.md` : phase « construction (Claude Code) ».

## Entrées

Tous les documents 01 à 09, et la maquette (`08-maquette/`). Le PRD les **référence** au
lieu de les recopier : il dit quoi construire et comment vérifier, les documents amont
disent pourquoi, et la maquette à quoi ça ressemble.

## 1. Choisir la stack

Lance ton site ne bloque sur aucune stack : c'est l'utilisateur qui choisit, en connaissance
de cause. Questions, une à la fois :
1. **Qui mettra à jour le site** après la mise en ligne, et à quelle fréquence ?
   (moi sans coder / moi avec l'IA / un développeur / personne)
2. **Quelles fonctions** : vitrine, blog, réservation, paiement, espace membre,
   multilingue, catalogue ?
3. **Où l'héberger** : VPS Hostinger déjà là / hébergement géré / pas d'avis.
4. **Budget mensuel** acceptable pour l'outil et l'hébergement.
5. Une stack **déjà imposée** ou préférée ?

Puis présenter 2 à 3 options avec la matrice
[references/stacks.md](references/stacks.md) : pour chacune, ce que ça coûte, qui peut
modifier le contenu, compatibilité VPS, effort de construction, limites. Recommander
une option et dire pourquoi. Si l'utilisateur choisit une option déconseillée pour son
cas, le dire une fois, clairement, puis suivre son choix.

Vérifier les versions actuelles (recherche web ou documentation à jour) avant de les
écrire : ne jamais citer une version de mémoire.

Fonctions tierces : proposer le service le plus simple adapté (formulaire : service
de formulaires ou endpoint maison ; réservation : outil de réservation existant
intégré plutôt que développé ; paiement : Stripe / SumUp / lien de paiement). Ne jamais
recoder ce qu'un service fiable fait déjà.

## 2. Le PRD

Rédiger `projet-site/10-prd.md` avec [templates/10-prd.md](templates/10-prd.md).
Contenu clé :
- problème, objectif, indicateurs de succès (repris du cadrage) ;
- périmètre : **dans** / **hors** (pour cette version) / **plus tard** ;
- exigences par page (renvoi vers `04-architecture.md`, `05-contenus/` et la page de la
  maquette correspondante) ;
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
- critères d'acceptation : liste cochable, chaque critère vérifiable par une commande ou
  une action précise.

## 3. Le plan d'implémentation

Rédiger `projet-site/11-plan.md` avec [templates/11-plan.md](templates/11-plan.md).
Chaque tâche de page cite sa source visuelle (fichier ou capture de
`08-maquette/bundle/` ou `08-maquette/captures/`).
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
  pages (action principale d'abord) → médias → SEO technique → accessibilité →
  performance → pages légales → **redirections 301** (refonte : une ligne par ancienne
  URL de `04-architecture.md`) → recette finale → déploiement.
- Stack hébergée (Webflow, Framer, Shopify) : les tâches décrivent la saisie dans
  l'outil (ou via son connecteur), pas du code.
- Interdits dans un plan : « à définir », « gérer les cas limites », « etc. ». Une étape
  doit être sans ambiguïté, pas exhaustive.
- **Section « Déploiement »** : cible, recette (renvoi vers `/lancetonsite:deployer`),
  domaine, commande de mise à jour.

Auto-relecture : chaque exigence du PRD est-elle couverte par une tâche ? chaque page
de l'architecture a-t-elle sa tâche ? les vérifications sont-elles exécutables ?
Puis agent `relecteur`.

Validation, `00-etat.md` (stack et hébergement remplis). Prochaine étape :
`/lancetonsite:construire`.
