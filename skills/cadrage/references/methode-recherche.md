# Méthode de recherche sur la cible

Adaptée de `customer-research` (coreyhaines31/marketingskills, MIT) pour des projets
francophones et des petites entreprises. Détails d'origine en anglais :
[sources-de-recherche.en.md](sources-de-recherche.en.md).

## Où chercher, selon la cible

| Cible | Sources prioritaires |
|---|---|
| Commerce ou service local (B2C) | Avis Google Maps des concurrents de la ville, TripAdvisor, Pages Jaunes, groupes Facebook locaux publics, forums de la ville |
| Loisir, passion, sport | Reddit (r/ du sujet, souvent en anglais : traduire), forums spécialisés FR, commentaires YouTube des vidéos tutoriels, Discord publics |
| Produit en ligne (B2C) | Avis Amazon / Trustpilot des produits concurrents, commentaires Instagram/TikTok, Reddit |
| Logiciel, service aux entreprises (B2B) | G2, Capterra, Trustpilot, LinkedIn (commentaires), Reddit, offres d'emploi des clients cibles (elles décrivent leurs problèmes) |
| Formation | Avis Google et Trustpilot des organismes concurrents, Moncompteformation (avis), forums de reconversion, Reddit |
| Santé, bien-être | Doctolib (avis si visibles), forums patients, groupes publics — prudence sur les données sensibles |
| Tous | Google « Autres questions posées », suggestions de recherche, AnswerThePublic, les FAQ des concurrents |

## Quand une source refuse la lecture

Firecrawl refuse certains sites (Reddit notamment), d'autres demandent une connexion
(groupes Facebook, Discord). Ne pas insister, et ne jamais contourner une connexion.
Dans l'ordre :
1. **Extraits de recherche** : `firecrawl_search` ou la recherche web avec
   `site:reddit.com <sujet>` ; les extraits renvoyés contiennent souvent la phrase utile.
   Citer l'extrait et le lien du fil, en notant « extrait de recherche ».
2. **old.reddit.com** : la même adresse avec `old.` devant, via `WebFetch`.
3. **Forums francophones du sujet** : les trouver par `<sujet> forum` (forums de
   passionnés, de métier, de parents, de reconversion…), et les commentaires YouTube des
   vidéos tutoriels du sujet.
4. Rien de tout ça : le dire dans `sources/recherche.md` et baisser le niveau de
   confiance des thèmes concernés.

## Quoi lire en premier

1. Les avis **1 à 3 étoiles** des concurrents : frustrations, attentes déçues.
2. Les avis **5 étoiles détaillés** : ce qui fait vraiment la différence.
3. Les questions posées avant achat : objections.
4. Les fils « je cherche… / vous me conseillez quoi pour… » : déclencheurs.

## Fiche de verbatim (une ligne par trouvaille dans `sources/recherche.md`)

| Citation exacte | Source (lien) | Date | Contexte | Sentiment | Thème | Job | Déclencheur |
|---|---|---|---|---|---|---|---|

## Extraire

- **Job fonctionnel** : ce qu'ils veulent accomplir.
- **Job émotionnel** : ce qu'ils veulent ressentir (ou ne plus ressentir).
- **Job social** : comment ils veulent être vus.
- **Douleur** : ce qui les gêne aujourd'hui, avec son coût (temps, argent, honte, peur).
- **Déclencheur** : l'événement qui fait passer de « un jour » à « maintenant ».
- **Résultat espéré**, dans leurs mots.
- **Objections** : ce qui les retient d'acheter.
- **Alternatives** envisagées.
- **Vocabulaire** : les mots qu'ils emploient — et ceux du métier qu'ils n'emploient pas.

## Synthétiser

1. Regrouper les verbatims en 5 à 8 thèmes.
2. Noter chaque thème : fréquence (combien de sources) × intensité (force du ressenti).
3. Garder 5 à 10 citations fortes par thème.
4. Segmenter : les thèmes diffèrent-ils selon le profil ? → c'est là que naissent les
   personas.
5. Repérer les contradictions.

## Niveaux de confiance

| Niveau | Règle |
|---|---|
| Fort | 3 sources indépendantes ou plus, évoqué spontanément |
| Moyen | 2 sources, ou 1 source très détaillée |
| Faible | 1 source, ou déduit |

## Les pièges

- Moyenner des segments différents en un persona « médian » qui n'existe pas.
- Prendre les mots du métier pour ceux des clients.
- Inventer un détail pour rendre un persona plus vivant.
- Oublier que les avis en ligne viennent des extrêmes (très contents, très fâchés).
- Recopier des données personnelles : ne garder que la citation, jamais le nom complet ou
  la photo de l'auteur de l'avis.
