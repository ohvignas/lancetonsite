# Choisir sa stack

Repères à vérifier au moment du choix (prix et versions changent) : relire la page
tarifs officielle et la documentation avant de les citer.

## La matrice

| Stack | Pour qui | Contenu modifiable par | VPS Hostinger | Effort | Coût récurrent | Limites |
|---|---|---|---|---|---|---|
| **HTML/CSS pur** | 1 à 5 pages, change rarement | personne sans code (ou l'IA) | ✓ statique | très faible | hébergement seul | pas d'édition simple, duplication entre pages |
| **Astro** (statique) | vitrine, blog, portfolio rapide | développeur, ou l'IA ; + CMS (Keystatic, Decap, Sanity) pour éditer sans code | ✓ statique | faible à moyen | hébergement (+ CMS éventuel) | interactions riches = îlots à ajouter |
| **Astro SSR / Next.js / Nuxt** | appli, espace membre, contenu dynamique | développeur | ✓ Node (PM2/Docker) | moyen à fort | hébergement + services | maintenance serveur, mises à jour |
| **WordPress** | contenu édité souvent par des non-techniciens, écosystème d'extensions | n'importe qui | ✓ via CloudPanel, ou hébergement WordPress | moyen | hébergement + extensions | sécurité et mises à jour à suivre, performances à surveiller |
| **Webflow** | designer qui veut un contrôle visuel fin | non-technicien | ✗ hébergé chez eux | moyen | abonnement mensuel | export de code limité (forfaits Workspace payants, sans CMS ni formulaires) |
| **Framer** | site marketing animé, rapide à lancer | non-technicien | ✗ hébergé chez eux | faible | abonnement mensuel | pas d'export HTML |
| **Shopify** | boutique en ligne | non-technicien | ✗ hébergé chez eux | moyen | abonnement + commissions | personnalisation profonde en Liquid |

## Arbre de décision rapide

1. Vente en ligne de nombreux produits ? → **Shopify** (ou WooCommerce si WordPress déjà maîtrisé).
2. Contenu modifié chaque semaine par quelqu'un qui ne code pas, sans aide IA ? →
   **WordPress**, ou **Astro + CMS visuel**, ou **Webflow/Framer** si le budget mensuel
   ne gêne pas.
3. Espace membre, logique métier, application ? → **Next.js** ou **Astro SSR**.
4. Vitrine ou blog, priorité performance et coût minimal, mises à jour avec l'IA ? →
   **Astro statique** (recommandation par défaut de Lance ton site).
5. Une seule page, maintenant ? → **HTML/CSS**.

## Ce que Lance ton site produit selon la stack

| Stack | Étape 11 (construire) | Étape 12 (déployer) |
|---|---|---|
| HTML, Astro, Next, Nuxt, WordPress (thème) | code complet dans `site/` | VPS Hostinger (recettes A à D) |
| Webflow | structure de pages, classes, styles et textes prêts à saisir ; via MCP Webflow si connecté | publication Webflow + DNS |
| Framer | structure, styles et textes prêts à saisir ; via MCP Framer si connecté | publication Framer + DNS |
| Shopify | thème ou personnalisation + fiches produits | Shopify + DNS |

## Services tiers courants

| Besoin | Options simples |
|---|---|
| Formulaire de contact | service de formulaires, endpoint Node minimal, ou e-mail via un service transactionnel |
| Réservation | outil de réservation existant intégré (widget, lien) |
| Paiement | Stripe, SumUp, lien de paiement |
| Mesure d'audience | outil exempté de consentement (configuration CNIL) pour éviter le bandeau |
| Newsletter | outil d'e-mailing avec formulaire intégré |
| Avis clients | intégration de la fiche Google, jamais d'avis recopiés à la main |
