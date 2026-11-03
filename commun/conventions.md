# Conventions communes de Lance ton site

Toutes les étapes suivent ces règles. Les lire avant de commencer une étape.

## 1. Le dossier projet

Tout vit dans `projet-site/`, à la racine du dossier de travail. Le code du site vit à côté,
dans `site/`.

```
projet-site/
├── 00-etat.md               ← tableau de bord : étape, mode, stack, décisions
├── 01-cadrage.md            ← projet, offre, concurrence, cible, personas, citations
├── 02-marque.md             ← plateforme de marque : mission, positionnement, ton
├── 03-charte/
│   ├── charte.md            ← logo, couleurs, typos, direction photo, règles
│   └── logo/                ← fichiers du logo (SVG, PNG)
├── 04-architecture.md       ← arborescence, parcours, SEO par page, zonings
├── 05-contenus/             ← un fichier par page : textes finaux + balises SEO
├── 06-design-system/
│   ├── DESIGN.md            ← règles, tokens, composants, motion
│   ├── tokens.json / tokens.css
│   └── demo.html            ← tous les composants, tous leurs états
├── 07-medias/
│   ├── medias.md            ← manifeste : fichier, rôle, prompt, modèle, alt
│   └── images/ videos/ sons/
├── 08-prd.md                ← exigences produit, stack retenue
├── 09-plan.md               ← plan d'implémentation en tâches
├── 10-deploiement.md        ← comment le site est en ligne et se met à jour
└── sources/                 ← captures, extractions de sites, verbatims bruts
```

Si `projet-site/` n'existe pas, proposer `/lancetonsite:demarrer` en une phrase, ou le créer
avec `00-etat.md` minimal si l'utilisateur préfère foncer.

## 2. Avant chaque étape

1. Lire `projet-site/00-etat.md`.
2. Lire **tous** les documents des étapes précédentes dont l'étape dépend (liste dans
   chaque skill, rubrique « Entrées »). Ne jamais reposer une question à laquelle un
   document répond déjà.
3. S'il manque un document requis : le dire en une phrase et proposer deux choix —
   faire l'étape manquante maintenant, ou continuer en marquant chaque déduction
   `[hypothèse]`.

## 3. L'entretien

- **Une question à la fois.** Attendre la réponse.
- Proposer **2 à 4 options concrètes** quand c'est possible (outil de question à choix
  si disponible). L'utilisateur peut toujours répondre autre chose.
- Réponse vague (« moderne », « épuré », « tout le monde », « qualité ») : ne pas
  l'accepter ; demander un exemple ou montrer deux versions opposées.
- Contradiction : la nommer, faire trancher.
- Toutes les 5 questions environ : résumer en 3 lignes, demander si c'est juste.
- Le registre : tutoiement ou vouvoiement selon l'utilisateur, français simple, aucun
  jargon non expliqué.
- Un débutant n'a pas à connaître le vocabulaire du métier : traduire les choix
  techniques en conséquences concrètes (« ça coûte X », « ça prend Y »).

## 4. Preuves et hypothèses

Chaque affirmation d'un document porte son origine :
- `[source : …]` — vient d'une recherche (lien, avis, capture).
- `[dit par l'utilisateur]` — vient de l'entretien.
- `[hypothèse]` — déduction non vérifiée.

Ne jamais boucher un trou par de l'invention plausible. Un faux chiffre, un faux avis,
un faux client ou une fausse citation sont interdits partout.

## 5. Le document

- Partir du modèle `templates/` du skill. Garder les titres du modèle : les étapes
  suivantes s'appuient dessus.
- En tête : `> Étape N — mis à jour le JJ/MM/AAAA — statut : brouillon | validé`.
- Concret et vérifiable plutôt que joli. Un paragraphe qui pourrait servir à n'importe
  quelle entreprise du secteur est raté : le réécrire.
- Le document passe en `validé` seulement après le « ok » de l'utilisateur.

## 6. La relecture indépendante

Avant de présenter un document comme terminé, lancer l'agent `relecteur` du plugin (s'il
est disponible ; sinon faire la relecture soi-même en changeant de posture). Il ne voit
que le document et les documents amont, et répond : ce qui est vague, ce qui contredit
l'amont, ce qui n'est pas sourcé, ce qui sonne « généré par IA ». Corriger, puis
présenter.

## 7. Après chaque étape

1. Mettre à jour `00-etat.md` : étape terminée, date, décisions clés, prochaine étape.
2. Terminer par **une** ligne : ce qui a été produit, et la commande de l'étape suivante.

## 8. Les outils externes

| Besoin | Outil | Si absent |
|---|---|---|
| Lire un site, extraire couleurs et polices | Firecrawl (`firecrawl_scrape`, formats `branding` + `screenshot`) ou la recherche/lecture web | `WebFetch` + description de l'utilisateur |
| Images, vidéos, sons | MCP `fal` (embarqué, connexion OAuth) | MCP `openrouter`, sinon prompts prêts à coller |
| Second avis d'un autre modèle | MCP `openrouter` | relecture par l'agent `relecteur` |
| Style et catalogue UI | skill `ui-ux-pro-max` s'il est installé | données intégrées à `design-system/data/` |
| Critique anti-« IA générique » | skill `impeccable` s'il est installé | grille intégrée `design-system/references/anti-patterns.md` |
| Serveur, DNS | MCP `hostinger` (embarqué, OAuth) | SSH seul |

Un outil absent n'arrête jamais une étape : le dire en une phrase et continuer.

## 9. Actions sensibles

Demander un « oui » explicite avant : tout achat, toute dépense de crédits au-delà du
budget annoncé, toute écriture DNS, toute modification de serveur qui peut effacer des
données ou couper un accès, toute publication publique. Ne jamais écrire de mot de
passe, jeton ou clé dans un document du projet.
