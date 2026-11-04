# La boucle persona — tester comme le client, corriger, retester

Le relecteur lit des captures. La boucle persona fait autre chose : un agent **devient
le client** (le patron qui paie le site, et l'acheteur décrit dans le cadrage), ouvre la
page dans un vrai navigateur, l'utilise, la note, et dit s'il paierait. Puis on corrige
et un nouvel agent reteste. C'est l'étape qui fait passer une page de « propre » à
« ça vaut l'argent » : sur les projets de test du plugin, les notes sont passées de
71 à 88 (Brisant) et de 85 à 93 (Vigie) en trois tours.

Ce fichier est la source unique. `maquette` (étape 8, § 4) et `construire` (étape 11,
§ 4) y renvoient.

## Quand

| Moment | Page testée | Seuil |
|---|---|---|
| Étape 8, après la critique et la note du relecteur | le prototype animé (`08-maquette/prototype/accueil.html`) | **85** avec médias provisoires, **90** avec les vraies photos |
| Étape 11, recette, après la revue finale | le site construit, servi en local (`npm run preview`) | **90** |

En mode rapide aussi : c'est la boucle qui remplace la patience du client.

## Le tour

1. **Préparer** le dossier `projet-site/boucle-persona/iteration-N/` (N = 1, 2, 3 ;
   étape 11 : `projet-site/site/.lancetonsite/boucle-persona/iteration-N/`), et servir
   la page en local (conventions § 6 : `python3 -m http.server`, jamais `file://`).
2. **Lancer l'agent `client-persona`**, un nouvel agent à chaque tour (un regard neuf),
   avec :
   - l'URL locale et les chemins des fichiers de la page ;
   - `01-cadrage.md` (persona principal, citations, objections) et `02-marque.md` ;
   - le budget accordé dans `00-etat.md` (ligne « Budget IA ») et ce qu'il en reste ;
   - à partir du tour 2 : le `fix-plan.md` du tour précédent, pour vérifier chaque
     correction ; **jamais** les rapports du relecteur (regard indépendant).
3. **L'agent rend trois fichiers** dans le dossier du tour :
   - `test-report.md` : ce qu'il a fait et vu, parcours par parcours, avec captures ;
   - `scores.md` : la grille sur 100 de `niveau-agence.md` § 6, critère par critère, la
     note sur 10, et le verdict « Oui / Pas encore : ça vaut mes 25 000 € » ;
   - `fix-plan.md` : les corrections `FIX-n`, de la plus grave à la plus légère, avec
     gravité, coût, où (fichier et ligne) et comment.
4. **Appliquer le plan**, dans cet ordre : les `FIX` à 0 $ ; puis les nouvelles
   générations, **seulement dans le budget accordé** (au-delà : demander, conventions
   § 9) ; les `FIX` qui demandent le vrai client (photos, avis, chiffres, règles
   commerciales) vont dans `maquette.md`, « Ce qui manque encore ». Un défaut qui vient
   du kit ou d'une règle du plugin se signale aussi (voir plus bas).
5. **Refaire les captures** après la dernière correction, puis tour suivant.

## Quand s'arrêter

- **Seuil atteint et verdict « Oui »** : la boucle est finie.
- **3 tours au plus.** Après le 3ᵉ sous le seuil : présenter quand même, avec la note,
  le verdict et ce qui bloque. Pas de 4ᵉ tour.
- Un « Oui » au-dessus du seuil avec des `FIX` encore ouverts : corriger les gratuits,
  sans nouveau tour.

## Ce qu'on note

- `maquette.md` (étape 8) ou le bilan de l'étape 11, rubrique « Boucle persona » : la
  note de chaque tour (ex. « 71 → 83 → 88 »), le verdict final, les `FIX` restés au
  client.
- `00-etat.md`, ligne « Boucle persona » : notes et verdict.
- Le « Oui » du persona met l'étape en `validé (simulé)` au plus, jamais en `validé` :
  c'est un agent qui joue le client (conventions § 5). Le vrai client valide ensuite,
  avec la note et les rapports sous les yeux.

## Ce que la boucle améliore au-delà du projet

Si un défaut vient du plugin lui-même (le kit de gestes, une règle, un gabarit), le
noter dans `maquette.md`, rubrique « Retours sur le plugin ». Exemple réel : la
boucle de Brisant a trouvé que les apparitions au défilement rendaient la FAQ
inatteignable au clavier ; corrigé dans le kit pour tous les projets (1.4.2).

## Coût

Un tour coûte le temps d'un agent (environ 10 à 20 minutes) et 0 $ de génération tant
que le plan est appliqué en gratuit. Les images à refaire passent par le budget IA du
projet, déjà accordé.
