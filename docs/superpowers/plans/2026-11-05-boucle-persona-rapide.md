# Boucle persona rapide — plan d'implémentation

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** faire passer un tour de boucle persona d'environ 30-40 min (mesuré sur Kweeto, 05/11/2026) à environ 10 min, sans perdre le regard indépendant ni la sévérité.

**Architecture:** un script de captures unique et fiable (état final des animations, débordement mesuré) remplace les captures faites à la main ; le persona lit une fiche client d'une page au lieu de tout le projet ; les tours 2 et 3 deviennent des tours de contrôle ciblés ; le tour complet se partage entre deux personas en parallèle ; les corrections et les médias IA ne bloquent plus la boucle.

**Tech Stack:** Markdown (procédures du plugin), Python 3 + Playwright pour Python (déjà présent sur la machine de test ; Node y est cassé par nvm, donc pas de script `.mjs`), Bash pour les tests.

**Spec:** pas de document de spec séparé. La source est le constat fait sur Kweeto (tours 1 et 2 : 66 puis 69/100 ; tour 2 = 15 min d'agent, 133 captures, 199 000 jetons) et les huit leviers validés dans la conversation du 05/11/2026 :
1. médias en fichiers séparés pendant la boucle ;
2. tours 2+ ciblés sur le `fix-plan` et les zones modifiées ;
3. fiche persona d'une page ;
4. deux personas en parallèle (ordinateur / téléphone + clavier) ;
5. script de capture fiable, état final ;
6. médias IA en arrière-plan ;
7. arrêt quand ne restent que des points client ;
8. corrections parallèles par lot.

Dépôt : `atelier/` (remote `ohvignas/lancetonsite`), version actuelle 1.9.1.

## Global Constraints

- Tout le texte du plugin en français, accents compris ; vocabulaire simple (« tour », « captures », « fiche client »).
- Le regard indépendant reste : un **nouvel** agent à chaque tour, il ne lit **jamais** les rapports du relecteur ; à partir du tour 2 il reçoit seulement le `fix-plan.md` précédent.
- **3 tours au plus**, pas de 4ᵉ. Le « Oui » du persona met l'étape au mieux en `validé (simulé)`.
- Seuils inchangés : 85 maquette aux médias provisoires, 90 avec vraies photos, 90 recette, 85 objet 3D.
- Le persona ne modifie rien, ne dépense rien, n'écrit que dans le dossier du tour.
- Jamais « IA souveraine », jamais « 100 % sécurisé » ; aucun chiffre ni avis inventé (règles déjà présentes, à ne pas casser).
- Servir en local avec `python3 -m http.server`, jamais `file://` (conventions § 6).
- Tailles de capture : la liste unique de `conventions.md` § 8 (360×740, 375×667, 375×812, 768×1024, 1280×720, 1440×900). Le script n'en invente pas d'autres.
- Version du plugin : **1.10.0**, à reporter dans `.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json` et `CHANGELOG.md`.

## Review Focus

1. **Animation qui écrase une position** (cas Kweeto : `transform:none` en fin de keyframes casse un `translateX(-50%)`) : le script capture après la fin des animations, donc il voit le défaut ; le persona doit le voir aussi en mouvement réduit **et** normal. Test : fixture `anime-decale.html`, Task 1.
2. **Page lourde (médias en base64, 3 Mo et plus)** : le script attend `load` + images décodées, pas un délai fixe ; sinon on obtient des captures blanches (vu deux fois sur Kweeto). Test : fixture avec image lente, Task 1.
3. **Débordement horizontal** invisible à l'œil sur une capture recadrée (cas Kweeto : grille `1fr` élargie par son contenu, 412 px pour 390) : le script le mesure et l'écrit dans `mesures.json`. Test Task 1.
4. **Deux personas qui se contredisent** (l'un « Oui », l'autre « Pas encore ») : règle de fusion explicite, verdict « Oui » seulement si les deux disent « Oui ». Contrôle Task 4.
5. **Tour ciblé qui rate une régression hors zone** : le tour de contrôle refait quand même le premier écran à 1440 et 375 et les mesures de débordement de toutes les tailles via le script. Contrôle Task 3.

---

## Structure des fichiers

| Fichier | Rôle | Action |
|---|---|---|
| `commun/scripts/captures.py` | captures en état final + mesures (débordement, erreurs console, animations restantes) | créer |
| `commun/scripts/tests/fixtures/anime-decale.html` | page de test : fenêtre centrée cassée par une animation, image lente, débordement à 390 | créer |
| `commun/scripts/tests/test-captures.sh` | lance le script sur la fixture et vérifie les sorties | créer |
| `skills/cadrage/templates/fiche-client.md` | gabarit de la fiche client d'une page | créer |
| `commun/boucle-persona.md` | procédure : fiche client, tour de contrôle, deux personas, arrêt, corrections par lot, médias | modifier |
| `agents/client-persona.md` | modes `complet-ordinateur`, `complet-telephone`, `controle` ; lit la fiche client ; utilise le script | modifier |
| `commun/conventions.md` § 8 | renvoi au script ; règle « médias en fichiers pendant la boucle » | modifier |
| `skills/maquette/SKILL.md` point 7 | renvoie à la nouvelle procédure (médias en arrière-plan, script) | modifier |
| `CHANGELOG.md`, `.claude-plugin/*.json` | version 1.10.0 | modifier |

---

### Task 1 : script de captures fiable

**Files:**
- Create: `commun/scripts/captures.py`
- Create: `commun/scripts/tests/fixtures/anime-decale.html`
- Create: `commun/scripts/tests/test-captures.sh`

**Interfaces:**
- Produces: `python3 commun/scripts/captures.py URL DOSSIER [--tailles 1440x900,375x812,...] [--pleine-page] [--mouvement-reduit] [--selecteur CSS]`
  - défaut `--tailles` : les six tailles de `conventions.md` § 8 ;
  - écrit `DOSSIER/<largeur>x<hauteur>[-reduit].png` et `DOSSIER/mesures.json` ;
  - `mesures.json` : `{"<l>x<h>": {"debordement_px": int, "animations_restantes": int, "erreurs_console": [str], "images_non_chargees": int, "duree_ms": int}}` ;
  - code de sortie 0 même en cas de défaut mesuré (ce sont des constats, pas des pannes) ; 2 si l'URL ne répond pas.
- Méthode : `page.goto(url, wait_until="load")` ; forcer `loading="eager"` puis attendre `img.decode()` de toutes les images (code de `conventions.md` § 8) ; attendre `Promise.all(document.getAnimations().filter(a => a.effect?.getTiming().iterations !== Infinity).map(a => a.finished))` avec un plafond de 8 s ; `debordement_px = scrollWidth - clientWidth` de `document.documentElement` ; avec `--selecteur`, faire défiler jusqu'à l'élément avant de capturer ; avec `--mouvement-reduit`, `browser.new_context(reduced_motion="reduce")`.

- [ ] **Step 1 : écrire la fixture.** `anime-decale.html` contient :
  - une `.fenetre` en `position:absolute;left:50%;transform:translateX(-50%)` animée par `@keyframes pose{to{transform:none}}` (1 s, `both`) ;
  - une image servie avec un `<img src="lente.svg">` ;
  - à 390 px, un bloc `width:420px` qui déborde.
- [ ] **Step 2 : écrire le test qui échoue.** `test-captures.sh` : sert `fixtures/` avec `python3 -m http.server 4399` en arrière-plan, lance le script sur `http://127.0.0.1:4399/anime-decale.html` vers `$TMPDIR/cap-test`, puis vérifie avec `python3 -c` :
  - `mesures["375x812"]["debordement_px"] >= 30` ;
  - `mesures["1440x900"]["animations_restantes"] == 0` ;
  - la position finale est capturée : le pixel central de la zone de la fenêtre, attendue décentrée, n'a pas la couleur de la fenêtre ;
  - `1440x900.png` et `375x812-reduit.png` existent quand `--mouvement-reduit` est passé ;
  - le script finit en moins de 40 s pour les six tailles.
- [ ] **Step 3 : lancer le test, constater l'échec.** `bash commun/scripts/tests/test-captures.sh` → attendu : `No such file … captures.py`.
- [ ] **Step 4 : écrire `captures.py`** selon l'interface ci-dessus. Pas de dépendance au-delà de `playwright` (Python) ; si absent, message « Playwright pour Python manque : pip install playwright && playwright install chromium » et sortie 3.
- [ ] **Step 5 : lancer le test, il passe.** Même commande → attendu : `OK captures (6 tailles, débordement 375 détecté, animations finies)`.
- [ ] **Step 6 : contrôle réel sur Kweeto.** `python3 commun/scripts/captures.py http://127.0.0.1:4331/design.html $TMPDIR/kweeto --tailles 1440x900,375x812` → attendu : `debordement_px` à 0 aux deux tailles, captures non blanches, plus de 50 Ko chacune.
- [ ] **Step 7 : commit.** `git add commun/scripts && git commit -m "boucle persona : script de captures en état final, avec mesures"`

### Task 2 : fiche client d'une page

**Files:**
- Create: `skills/cadrage/templates/fiche-client.md`
- Modify: `commun/boucle-persona.md` (section « Le tour », point 1 « Préparer »)

**Interfaces:**
- Produces: `projet-site/boucle-persona/fiche-client.md`, écrit **une fois** avant le tour 1 par l'orchestrateur, relu au début de chaque tour suivant seulement si le cadrage a changé.
- Gabarit, 40 lignes au plus, rubriques exactes :
  - `## Le patron` (entreprise, métier, 3 mots qu'il emploie, ce qu'il déteste) ;
  - `## L'acheteur` (persona principal, situation, objection la plus forte, phrase citée du cadrage) ;
  - `## L'offre` (quoi, pour qui, prix tel que validé, action principale) ;
  - `## Interdits` (mots bannis, promesses interdites, chiffres non sourcés) ;
  - `## Seuil` (85 / 90 et pourquoi) ;
  - `## Budget IA` (accordé, dépensé).

- [ ] **Step 1 : test qui échoue.** `grep -c "^## " skills/cadrage/templates/fiche-client.md` → attendu `6` ; aujourd'hui : fichier absent.
- [ ] **Step 2 : écrire le gabarit** avec les six rubriques, chacune avec une ligne d'exemple tirée de Kweeto (« Interdits : IA souveraine, 100 % sécurisé »).
- [ ] **Step 3 : modifier « Préparer »** dans `boucle-persona.md`. L'orchestrateur remplit la fiche depuis `01-cadrage.md`, `02-marque.md` et `00-etat.md`. Le persona reçoit **la fiche**, pas ces trois documents (il peut les ouvrir s'il doute d'un point de métier).
- [ ] **Step 4 : vérifier.** Commande `grep -n "fiche-client.md" commun/boucle-persona.md` → au moins 2 lignes ; commande `wc -l skills/cadrage/templates/fiche-client.md` → 40 ou moins.
- [ ] **Step 5 : commit.** `git commit -am "boucle persona : fiche client d'une page"` (avec `git add` du gabarit).

### Task 3 : tour rapide, tour complet, tour de contrôle

**Files:**
- Modify: `commun/boucle-persona.md` (sections « Quand », « Le tour », « Coût »)
- Modify: `agents/client-persona.md` (section « Ce que tu fais »)

**Interfaces:**
- Consumes: `captures.py` (Task 1), `fiche-client.md` (Task 2).
- Produces: trois modes, nommés tels quels dans la consigne passée à l'agent :
  - **`rapide`** (tour 1 par défaut, environ 5 min) : premier écran à 1440 et 375, défilement complet à 1440 et 375, les 10 points, la note et le verdict.
  - **`complet`** (sur demande, ou dernier tour avant de présenter) : le contenu actuel de « Ce que tu fais », partagé en deux personas (Task 4).
  - **`controle`** (tours 2 et 3 par défaut, environ 5 min) :
    - chaque `FIX` du plan précédent (corrigé / partiel / non) ;
    - les zones listées par l'orchestrateur (sélecteurs CSS des composants modifiés), capturées à 1440 et 375 ;
    - `captures.py` sur les six tailles **sans pleine page**, pour les mesures de débordement et de console (filet anti-régression, Review Focus 5) ;
    - la grille sur 100 réévaluée seulement sur les critères touchés, les autres repris du tour précédent et marqués « repris ».
- L'orchestrateur passe au mode `controle` la liste `zones: ["#c03 .hero", "#c15"]`, tirée des `FIX` appliqués.

- [ ] **Step 1 : test qui échoue.** `grep -c "mode \`controle\`\|mode \`rapide\`\|mode \`complet\`" agents/client-persona.md` → attendu au moins 3 ; aujourd'hui 0.
- [ ] **Step 2 : réécrire « Quand » et « Le tour »** dans `boucle-persona.md` : tour 1 `rapide`, tours 2-3 `controle`, `complet` sur demande. Une ligne : « Les captures se font avec `commun/scripts/captures.py` ; pas de captures à la main sauf un geste à filmer. »
- [ ] **Step 3 : réécrire « Ce que tu fais »** dans `client-persona.md` en trois sous-sections, une par mode. Le contenu actuel (étapes 1 à 9) devient le mode `complet`, sans perte. Ajouter : « En mode `controle`, une note “reprise” n'est jamais remontée sans capture nouvelle. »
- [ ] **Step 4 : mettre à jour « Coût »** : `rapide` environ 5 min ; `controle` environ 5 min ; `complet` environ 10 min avec deux personas en parallèle.
- [ ] **Step 5 : vérifier.** Commande de Step 1 → 3 ou plus. Puis `grep -n "captures.py" commun/boucle-persona.md agents/client-persona.md` → au moins une ligne dans chaque fichier.
- [ ] **Step 6 : commit.** `git commit -am "boucle persona : modes rapide, contrôle et complet"`

### Task 4 : tour complet à deux personas

**Files:**
- Modify: `commun/boucle-persona.md` (nouvelle sous-section « Tour complet à deux »)
- Modify: `agents/client-persona.md` (mode `complet`)

**Interfaces:**
- Produces: deux agents `client-persona` lancés **dans le même message**, en arrière-plan :
  - `complet-ordinateur` : 1440 et 1280, parcours de l'acheteur, densité, œil du métier, points 1, 2, 3, 6, 7, 9 et 10 ;
  - `complet-telephone` : 768, 375 et 360, 40 tabulations, mouvement réduit, console, points 4, 5 et 8.
  - Chacun écrit dans `iteration-N/ordinateur/` ou `iteration-N/telephone/` ses trois fichiers habituels.
- Fusion par l'orchestrateur dans `iteration-N/` :
  - `scores.md` : par critère, la note **la plus basse** des deux, et la note sur 100 recalculée ;
  - verdict « Oui » seulement si les deux disent « Oui » ;
  - `fix-plan.md` : union dédoublonnée, renumérotée par gravité.

- [ ] **Step 1 : test qui échoue.** `grep -n "complet-ordinateur" commun/boucle-persona.md agents/client-persona.md` → aucune ligne aujourd'hui ; attendu, au moins une par fichier.
- [ ] **Step 2 : écrire la sous-section** dans `boucle-persona.md` : partage des tailles et des points, règle de fusion (Review Focus 4), dossiers.
- [ ] **Step 3 : écrire le mode `complet`** dans `client-persona.md` : l'agent lit la variante passée (`complet-ordinateur` ou `complet-telephone`) et ne fait que sa part ; il note quand même la grille entière, mais marque « hors périmètre » les critères qu'il n'a pas pu juger.
- [ ] **Step 4 : vérifier.** Commande de Step 1 → au moins 2 lignes ; contrôle de lecture : les 10 points sont tous attribués à une des deux variantes, et aucun ne l'est aux deux (`grep` des numéros dans la sous-section).
- [ ] **Step 5 : commit.** `git commit -am "boucle persona : tour complet partagé entre deux personas"`

### Task 5 : arrêt, corrections par lot, médias hors du chemin critique

**Files:**
- Modify: `commun/boucle-persona.md` (« Appliquer le plan », « Quand s'arrêter »)
- Modify: `commun/conventions.md` § 8 (fin de « Captures d'écran »)
- Modify: `skills/maquette/SKILL.md` (point 7, lignes 331-339)
- Modify: `agents/client-persona.md` (« Ce que tu rends », `fix-plan.md`)

**Interfaces:**
- Produces:
  - `fix-plan.md` : une colonne en plus, **`lot`**, qui nomme le fichier ou le composant (`design.src.html#c15`, `styles.css`, `medias`). Le tableau devient `FIX-n | gravité | coût | lot | résumé`.
  - Corrections parallèles : à partir de 3 lots qui touchent des **fichiers différents**, un sous-agent par lot, lancés dans le même message. Dans le même fichier, une seule passe scriptée (un script Python avec contrôle `assert` de chaque remplacement).
  - Médias :
    - un `FIX` de coût « génération » est lancé en arrière-plan ;
    - le tour suivant part avec le média provisoire, sans attendre le rendu ;
    - quand le nouveau média arrive, il est contrôlé (3 images extraites) puis remplacé, et le tour suivant le vérifie.
  - Médias en fichiers pendant la boucle : la page testée référence ses images et vidéos par chemin relatif. L'intégration en base64 (pour publier un artifact d'une seule pièce) se fait **après** la boucle, jamais avant un tour.
  - Arrêt anticipé : sous le seuil, si tous les `FIX` restants sont de coût « client », ou « léger » à 0 $, on arrête. On applique les légers, on présente, et les points client vont dans « Ce qui manque encore ».

- [ ] **Step 1 : test qui échoue.** `grep -c "| lot |" agents/client-persona.md` → attendu 1, aujourd'hui 0 ; `grep -n "base64" commun/conventions.md` → attendu au moins 1, aujourd'hui 0.
- [ ] **Step 2 : modifier `fix-plan.md`** dans `client-persona.md` : ajouter la colonne `lot`.
- [ ] **Step 3 : réécrire « Appliquer le plan »** dans `boucle-persona.md` : lots en parallèle, médias en arrière-plan.
- [ ] **Step 4 : ajouter dans « Quand s'arrêter »** la règle d'arrêt anticipé, en gardant les règles existantes (3 tours, « validé (simulé) »).
- [ ] **Step 5 : ajouter à `conventions.md` § 8** :
  - le paragraphe « Médias en fichiers pendant la boucle » ;
  - le renvoi : « Script : `commun/scripts/captures.py` (état final des animations, débordement mesuré). »
  - Retirer la mention « Chrome sans interface » devenue inutile, ou la garder comme solution de repli.
- [ ] **Step 6 : mettre à jour `skills/maquette/SKILL.md` point 7** en une phrase par changement : modes, fiche client, script. Aucune règle dupliquée : renvoi à `boucle-persona.md`.
- [ ] **Step 7 : vérifier.**
  - Les commandes de Step 1 rendent ce qu'on attend.
  - `grep -n "3 tours au plus\|validé (simulé)" commun/boucle-persona.md` → les deux sont toujours là.
  - `grep -rn "IA souveraine\|100 % sécurisé" commun agents skills/maquette/SKILL.md` → seulement dans des listes d'interdits.
- [ ] **Step 8 : commit.** `git commit -am "boucle persona : corrections par lot, médias en arrière-plan, arrêt anticipé"`

### Task 6 : version 1.10.0 et essai réel

**Files:**
- Modify: `CHANGELOG.md`, `.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json`

- [ ] **Step 1 : version.** `1.9.1` → `1.10.0` dans les deux JSON ; entrée de CHANGELOG datée du 05/11/2026 : les huit leviers en une ligne chacun, plus la cause d'origine (« Kweeto : tour 2 = 15 min, 133 captures, page de 3 Mo en base64 »).
- [ ] **Step 2 : vérifier.** `grep -rn '"version"' .claude-plugin/` → `1.10.0` partout ; `python3 -m json.tool .claude-plugin/plugin.json >/dev/null && echo ok`.
- [ ] **Step 3 : essai réel sur Kweeto (tour 3).**
  - Lancer un tour `controle` avec la nouvelle procédure.
  - Mesurer la durée de l'agent. Le résultat de la tâche donne `duration_ms`. Cible : 10 minutes ou moins.
  - Reporter la mesure dans le CHANGELOG. Si la cible est ratée, l'écrire tel quel, sans arrondir.
- [ ] **Step 4 : commit et push** (autorisés pour ce lot) : `git commit -am "1.10.0 : boucle persona rapide" && git push`.

---

## Auto-relecture

- **Couverture des leviers :**

  | Levier | Tâche |
  |---|---|
  | 1 | Task 5 |
  | 2 | Task 3 |
  | 3 | Task 2 |
  | 4 | Task 4 |
  | 5 | Task 1 |
  | 6 | Task 5 |
  | 7 | Task 5 |
  | 8 | Task 5 |

  La mesure du gain est faite en Task 6, Step 3.
- **Noms cohérents :**
  - `captures.py` et `mesures.json` ;
  - `fiche-client.md` ;
  - modes `rapide`, `controle`, `complet`, et les variantes `complet-ordinateur` et `complet-telephone` ;
  - colonne `lot`.

  Ces noms sont les mêmes dans toutes les tâches.
- **Proportion :** un seul vrai code (le script, Task 1) ; le reste est de la procédure, décrite par ce qu'elle doit dire et vérifiée par `grep`.
