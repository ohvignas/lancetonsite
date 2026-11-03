---
name: prd
description: 'Aide à choisir la stack technique (Astro, Next.js, WordPress, Webflow, Framer, HTML…) selon le projet et la personne qui maintiendra le site, puis rédige le PRD (document d''exigences produit) et le plan d''implémentation complet en tâches courtes et vérifiables, prêt à être exécuté. Étape 8 de l''Atelier.'
when_to_use: '"PRD", "cahier des charges", "quelle stack", "Astro ou WordPress", "plan d''implémentation", "plan de développement", "spécifications du site", ou /atelier:prd.'
argument-hint: "[stack | prd | plan]"
---

# PRD et plan d'implémentation

Lire `${CLAUDE_PLUGIN_ROOT}/commun/conventions.md`.

## Entrées

Tous les documents 01 à 07. Le PRD les **référence** au lieu de les recopier : il dit
quoi construire et comment vérifier, les documents amont disent pourquoi et à quoi ça
ressemble.

## 1. Choisir la stack

L'Atelier ne bloque sur aucune stack : c'est l'utilisateur qui choisit, en connaissance
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

Rédiger `projet-site/08-prd.md` avec [templates/08-prd.md](templates/08-prd.md).
Contenu clé :
- problème, objectif, indicateurs de succès (repris du cadrage) ;
- périmètre : **dans** / **hors** (pour cette version) / **plus tard** ;
- exigences par page (renvoi vers `04-architecture.md` et `05-contenus/`) ;
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

Rédiger `projet-site/09-plan.md` avec [templates/09-plan.md](templates/09-plan.md).
Méthode adaptée de `writing-plans` (obra/superpowers, MIT ;
[references/methode-plans.en.md](references/methode-plans.en.md)) :
- **En-tête** : objectif, stack et versions, arborescence des fichiers à créer (une
  responsabilité par fichier), contraintes globales recopiées mot pour mot (tokens
  uniquement, mobile d'abord, aucun texte inventé — tout vient de `05-contenus/`).
- **Tâches courtes** : chacune livre quelque chose de visible et vérifiable seule
  (« le pied de page s'affiche avec les liens légaux, testé à 375 px et 1440 px »).
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
- **Section « Déploiement »** : cible, recette (renvoi vers `/atelier:deployer`),
  domaine, commande de mise à jour.

Auto-relecture : chaque exigence du PRD est-elle couverte par une tâche ? chaque page
de l'architecture a-t-elle sa tâche ? les vérifications sont-elles exécutables ?
Puis agent `relecteur`.

Validation, `00-etat.md` (stack et hébergement remplis). Prochaine étape :
`/atelier:construire`.
