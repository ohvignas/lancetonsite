<p align="center">
  <img src="docs/images/banniere.png" alt="Atelier — de l'idée au site en ligne, en 10 étapes : cadrage, marque, charte, architecture, contenus, design system, médias IA, PRD et plan, construction, mise en ligne." width="100%">
</p>

<p align="center">
  <b>Un plugin pour Claude qui t'accompagne de l'idée jusqu'au site web en ligne.</b><br>
  Il te pose les bonnes questions, fait les recherches, écrit les documents, dessine, code et déploie.<br>
  Tu valides chaque étape.
</p>

<p align="center">
  <a href="#-installer-en-2-minutes">Installer</a> ·
  <a href="#%EF%B8%8F-le-parcours">Le parcours</a> ·
  <a href="#-les-commandes">Les commandes</a> ·
  <a href="#-questions-fréquentes">FAQ</a>
</p>

---

## 🤔 C'est quoi ?

Créer un bon site, ce n'est pas commencer par les couleurs. Une agence suit toujours le
même ordre : **comprendre** le client et sa cible, définir la **marque**, dessiner
l'**identité**, organiser les **pages**, écrire les **textes**, et seulement ensuite
**designer**, **coder** et **mettre en ligne**.

L'Atelier fait suivre cet ordre à Claude. Chaque étape :

1. 📖 **relit** ce qui a été décidé avant (tu ne répètes jamais deux fois la même chose) ;
2. 💬 te pose **une question à la fois**, avec des choix concrets ;
3. 🔎 **cherche** ce qui manque (avis clients, concurrents, mots-clés…) ;
4. 📄 **écrit un document** clair dans le dossier `projet-site/` ;
5. 🧐 le fait **relire** par un relecteur indépendant qui traque le flou et le « fait par IA » ;
6. ✅ attend **ton feu vert** avant de passer à la suite.

> **Pour qui ?** Entrepreneurs, indépendants, associations, designers, formateurs —
> débutants bienvenus. Aucune connaissance technique n'est nécessaire pour les étapes 1
> à 7 (quelques outils gratuits à installer, voir les prérequis).

---

## 🗺️ Le parcours

```mermaid
flowchart LR
  subgraph S["🧭 Stratégie"]
    A1["1 · Cadrage<br/><i>qui, quoi, pour qui</i>"] --> A2["2 · Marque<br/><i>promesse, ton</i>"]
  end
  subgraph I["🎨 Identité"]
    A3["3 · Charte<br/><i>logo, couleurs, typos</i>"]
  end
  subgraph W["🧱 Site"]
    A4["4 · Architecture<br/><i>pages, parcours, SEO</i>"] --> A5["5 · Contenus<br/><i>tous les textes</i>"]
    A5 --> A6["6 · Design system<br/><i>composants</i>"]
    A6 --> A7["7 · Médias IA<br/><i>photos, vidéos</i>"]
  end
  subgraph L["🚀 En ligne"]
    A8["8 · PRD + plan<br/><i>stack, tâches</i>"] --> A9["9 · Construction<br/><i>le code</i>"] --> A10["10 · Déploiement<br/><i>VPS, domaine, HTTPS</i>"]
  end
  A2 --> A3 --> A4
  A7 --> A8
```

| # | Étape | Ce que tu obtiens | Commande |
|:-:|---|---|---|
| 1 | **Cadrage** | Ton offre, ta concurrence, **tes vrais clients** : personas construits à partir de ce qu'ils disent vraiment (avis, forums), et une banque de leurs phrases exactes | `/atelier:cadrage` |
| 2 | **Marque** | Ton positionnement, ta promesse en 10 mots, tes valeurs prouvées, ta façon de parler (« on dit / on ne dit pas ») | `/atelier:marque` |
| 3 | **Charte graphique** | Logo (créé ou nettoyé), couleurs vérifiées, typographies gratuites, direction photo — pour tous tes supports | `/atelier:charte` |
| 4 | **Architecture** | La liste des pages, le menu, le chemin de chaque client jusqu'à l'achat, les mots-clés Google page par page | `/atelier:architecture` |
| 5 | **Contenus** | **Tous les textes** du site, avec les mots de tes clients, prêts pour Google et les assistants IA | `/atelier:contenus` |
| 6 | **Design system** | Le style d'interface (choisi parmi 50), les couleurs et tailles en code, tous les boutons et blocs, une page de démo | `/atelier:design-system` |
| 7 | **Médias** | Photos et vidéos générées par IA, cohérentes comme un vrai shooting, optimisées pour le web | `/atelier:medias` |
| 8 | **PRD + plan** | **Tu choisis ta techno** (Astro, WordPress, Next.js, Webflow…), puis le cahier des charges et le plan de construction | `/atelier:prd` |
| 9 | **Construction** | Le site codé, testé (vitesse, accessibilité, SEO) tâche par tâche | `/atelier:construire` |
| 10 | **Déploiement** | Le site en ligne sur ton VPS Hostinger : serveur sécurisé, nom de domaine relié, HTTPS | `/atelier:deployer` |

Tu peux t'arrêter à n'importe quelle étape. `/atelier:statut` te dit toujours où tu en es.

---

## ⚡ Installer en 2 minutes

### Dans Claude Code

```text
/plugin marketplace add ohvignas/atelier
/plugin install atelier@atelier-marketplace
```

### Dans l'application Claude (web ou bureau)

1. **Personnaliser** → **Plugins** → **Ajouter** → **Ajouter une marketplace**
2. Coller `ohvignas/atelier`
3. Installer **Atelier**

### Puis, pour commencer

```text
/atelier:demarrer
```

C'est tout. L'Atelier te présente le parcours, crée ton dossier projet et lance la
première question.

---

## 🧩 Prérequis

| Pour | Il faut | Installer |
|---|---|---|
| Étapes 1 à 5 | rien de plus que Claude | — |
| Vérifier les contrastes (étape 3) | Python 3 | déjà présent sur macOS et Linux |
| Design system (étape 6) | Node.js | [nodejs.org](https://nodejs.org) (version LTS) |
| Optimiser images et vidéos (étape 7) | ffmpeg | macOS : `brew install ffmpeg` · Ubuntu : `sudo apt install ffmpeg` |
| Tests de vitesse et d'accessibilité (étape 9) | Chrome ou Chromium | — |
| Déployer sur un VPS (étape 10) | `ssh`, `rsync` | présents sur macOS et Linux ; sous Windows, utiliser WSL |

`/atelier:demarrer` vérifie ce qui manque et l'Atelier te guide au moment où l'outil
devient nécessaire. Sans lui, l'étape continue en mode dégradé et te dit ce qui n'a pas
pu être fait.

## 🔌 Les connexions (facultatives)

Le plugin embarque trois connexions. **Aucune clé à copier** : au premier usage, une
fenêtre de connexion s'ouvre dans ton navigateur. Sans elles, l'Atelier fonctionne quand
même — il te donne alors des prompts prêts à coller.

| Service | Sert à | Quand | Coût |
|---|---|---|---|
| 🎨 **[fal](https://fal.ai)** | générer photos, vidéos, sons, logos vectoriels | étapes 3 et 7 | à l'usage (quelques centimes par image) — budget annoncé avant chaque lot |
| 🧠 **[OpenRouter](https://openrouter.ai)** | images Gemini, second avis d'un autre modèle IA | étapes 5 et 7 | à l'usage |
| 🖥️ **[Hostinger](https://www.hostinger.fr)** | piloter ton VPS et ton nom de domaine | étape 10 | ton abonnement VPS |

Pour aller plus loin, installe aussi ces skills : l'Atelier s'en servira automatiquement.

- [**ui-ux-pro-max**](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) — base de styles, palettes et règles UX (une partie est déjà intégrée).
- [**impeccable**](https://github.com/pbakaus/impeccable) — critique de design très exigeante contre le « fait par IA ».
- Un connecteur de lecture web comme **Firecrawl** — pour analyser les sites de référence et des concurrents.

---

## 📁 Ce que l'Atelier crée chez toi

```
ton-dossier/
├── projet-site/                 ← tous les documents, lisibles et modifiables
│   ├── 00-etat.md               ← le tableau de bord du projet
│   ├── 01-cadrage.md
│   ├── 02-marque.md
│   ├── 03-charte/               ← charte.md, planche.html, logo/
│   ├── 04-architecture.md
│   ├── 05-contenus/             ← un fichier par page
│   ├── 06-design-system/        ← DESIGN.md, tokens.css, demo.html
│   ├── 07-medias/               ← images, vidéos, manifeste
│   ├── 08-prd.md
│   ├── 09-plan.md
│   ├── 10-deploiement.md
│   └── sources/                 ← recherches, captures, extraits
└── site/                        ← le code du site
```

Ce sont de simples fichiers Markdown : tu peux les lire, les corriger à la main, les
envoyer à un associé ou à un développeur. Si tu modifies un document, `/atelier:statut`
te signale ce qui doit être revu derrière.

---

## 🧰 Les commandes

| Commande | Rôle |
|---|---|
| `/atelier:demarrer` | Point de départ : création ou refonte, dossier projet, connexions |
| `/atelier:statut` | Où j'en suis, ce qui est à revoir, la prochaine étape |
| `/atelier:cadrage` | Étape 1 |
| `/atelier:marque` | Étape 2 |
| `/atelier:charte` | Étape 3 |
| `/atelier:architecture` | Étape 4 |
| `/atelier:contenus` | Étape 5 |
| `/atelier:design-system` | Étape 6 |
| `/atelier:medias` | Étape 7 |
| `/atelier:prd` | Étape 8 |
| `/atelier:construire` | Étape 9 |
| `/atelier:deployer` | Étape 10 — aussi `mise-a-jour` et `diagnostic` |

Pas besoin de retenir les commandes : écris simplement « je veux créer mon site »,
« trouve-moi des photos pour la page d'accueil » ou « mets le site en ligne », la bonne
étape se lance.

---

## 🛡️ Les règles que l'Atelier respecte

- **Zéro invention.** Pas de faux avis, faux chiffres, faux clients. Chaque affirmation
  porte son origine : `[source]`, `[dit par toi]` ou `[hypothèse]`.
- **Tu décides.** Les choix de goût et de techno sont présentés avec 2 ou 3 options et une
  recommandation argumentée, jamais imposés.
- **Rien de risqué sans ton « oui »** : dépense de crédits, modification du nom de domaine,
  réinstallation du serveur, publication.
- **Anti-« fait par IA ».** Un relecteur indépendant traque les textes creux (« Libérez
  votre potentiel ») et les designs génériques (dégradés violets, titre centré + 3
  cartes, emojis en icônes).
- **Accessible et rapide par défaut.** Contrastes vérifiés, navigation au clavier,
  objectifs de vitesse mesurés.
- **Pas de secret dans les documents.** Aucun mot de passe ni clé n'est écrit dans
  `projet-site/`.

---

## ❓ Questions fréquentes

<details>
<summary><b>Je ne connais rien à la technique, c'est pour moi ?</b></summary>

Oui. Les étapes 1 à 7 ne demandent que de répondre à des questions sur ton projet. À
l'étape 8, l'Atelier t'explique les options techniques en termes concrets (coût, qui
pourra modifier le site, effort) et recommande la plus simple pour ton cas.
</details>

<details>
<summary><b>J'ai déjà un site. Je dois tout refaire ?</b></summary>

Non. Choisis « refonte » au démarrage : l'Atelier analyse ton site actuel, garde ce qui
marche, et prévoit les redirections pour ne pas perdre ton référencement.
</details>

<details>
<summary><b>J'ai déjà un logo et des couleurs.</b></summary>

L'étape 3 fait alors un audit (contrastes, lisibilité, déclinaisons manquantes) et propose
de garder, moderniser ou refaire — jamais de tout jeter par défaut.
</details>

<details>
<summary><b>Je veux utiliser Webflow / Framer / WordPress, pas du code.</b></summary>

Aucun problème : c'est toi qui choisis la techno à l'étape 8. L'Atelier adapte la
construction (structure et textes prêts à saisir, ou création via le connecteur de l'outil
s'il est branché) et le déploiement (publication + nom de domaine).
</details>

<details>
<summary><b>Combien ça coûte ?</b></summary>

Le plugin est gratuit et libre (MIT). Tu paies seulement ce que tu utilises : ton
abonnement Claude, les générations d'images ou vidéos (budget annoncé avant chaque lot),
et ton hébergement.
</details>

<details>
<summary><b>Et si je n'ai pas de VPS ?</b></summary>

L'étape 10 t'explique ce que c'est, ce que coûte le plus petit plan suffisant, et
propose des alternatives gratuites pour un site simple (Netlify, Cloudflare Pages,
GitHub Pages).
</details>

<details>
<summary><b>Les images générées par IA, c'est bien pour mon site ?</b></summary>

Pour l'ambiance, les textures et les fonds, oui. Pour tout ce qui doit inspirer
confiance (ton équipe, ton lieu, tes vrais produits), **tes vraies photos sont
meilleures** — l'Atelier commence toujours par te demander ce que tu as.
</details>

---

## 🧪 Exemple : MARÉE, surf shop à Biarritz

*Exemple illustratif : le projet et les chiffres sont fictifs.*

> **Toi** : je veux créer le site de mon surf shop à Biarritz
>
> **Atelier** : On démarre. C'est une création ou tu as déjà un site ? …
>
> *(cadrage)* J'ai lu 140 avis Google des écoles de surf de Biarritz. Ce qui revient le
> plus dans les avis à 3 étoiles : « on était 12 par moniteur » (19 mentions). Voici les
> 3 personas qui en sortent, et les 22 phrases de clients qu'on réutilisera dans tes
> textes…
>
> *(contenus)* Titre proposé : « Ton premier take-off à la Côte des Basques, à 6 élèves
> max par moniteur ». Le chiffre 6 vient de toi ; le « 12 par moniteur » chez les autres
> vient des avis.

---

## 🔒 Confidentialité

L'Atelier ne collecte aucune donnée : c'est un ensemble d'instructions et de scripts qui
s'exécutent dans ta session Claude. Tes documents restent dans ton dossier `projet-site/`.
Quand tu utilises une connexion (fal, OpenRouter, Hostinger, outil de lecture web), les
données nécessaires à la tâche sont envoyées à ce service, selon sa propre politique de
confidentialité : [fal](https://fal.ai/legal/privacy-policy), [OpenRouter](https://openrouter.ai/privacy),
[Hostinger](https://www.hostinger.com/fr/legal/politique-de-confidentialite).

## 🤝 Contribuer

Les idées, corrections et nouvelles recettes de déploiement sont les bienvenues :
ouvre une *issue* ou une *pull request*. Avant de proposer un changement de skill,
vérifie la structure avec :

```bash
claude plugin validate .
```

## 📜 Licence et remerciements

[MIT](LICENSE) — © 2026 ILLITH · Florence Clément-Vigneau.

L'Atelier s'appuie sur le travail de
[Corey Haines](https://github.com/coreyhaines31/marketingskills),
[Jesse Vincent](https://github.com/obra/superpowers),
[Next Level Builder](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill),
[Paul Bakaus](https://github.com/pbakaus/impeccable) et
[Hostinger](https://github.com/hostinger/api-mcp-server). Détail dans [NOTICE.md](NOTICE.md).
