# La boucle persona — tester comme le client, corriger, retester

Le relecteur lit des captures. La boucle persona fait autre chose : un agent **devient
le client** (le patron qui paie le site, et l'acheteur décrit dans le cadrage), ouvre la
page dans un vrai navigateur, l'utilise, la note, et dit s'il paierait. Puis on corrige
et un nouvel agent reteste. C'est l'étape qui fait passer une page de « propre » à
« ça vaut l'argent » : sur les projets de test du plugin, les notes sont passées de
71 à 88 (Brisant) et de 85 à 93 (Vigie) en trois tours.

Ce fichier est la source unique. `maquette` (étape 7, § 4) et `construire` (étape 11,
§ 4) y renvoient.

## Quand

| Moment | Page testée | Seuil |
|---|---|---|
| Étape 7, après la critique et la note du relecteur | le prototype animé (`07-maquette/prototype/accueil.html`) | **85** avec médias provisoires, **90** avec les vraies photos |
| Étape 11, recette, après la revue finale | le site construit, servi en local (`npm run preview`) | **90** |
| Objet 3D (skill `objets-3d`), appelé aux étapes 6, 7 ou 11 | l'aperçu de l'objet : boucle automatique jusqu'à 3 tours sur une image (coût faible, une image), voir `skills/objets-3d/references/boucle-3d.md` | **85** |

**Un tour rapide par défaut** (`parcours.md` § 1, levier 6) — sauf pour un objet 3D, exception
assumée : sa boucle est automatique (ligne ci-dessus), car elle ne porte que sur une image — lancé en parallèle du
relecteur, en arrière-plan, pendant qu'on montre le premier jet. Consigne donnée à
l'agent : « Tour rapide, 5 minutes : le premier écran, un défilement complet à 1440 et à
375, les 10 points, la note et le verdict. » Les tours 2 et 3 (tests complets)
seulement si l'utilisateur les demande, à la porte de validation ou après.

## Le tour

1. **Préparer** le dossier `projet-site/boucle-persona/iteration-N/` (N = 1, puis 2 et 3
   sur demande ;
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
   - `scores.md` : le **contrôle des 10 points** (la liste est dans
     `agents/client-persona.md`, « Les 10 points à contrôler » : densité, catalogue,
     titres, typographie, navigation, blocs d'action, hero, responsive, images, 3D),
     chacun « OK » ou « Pas OK » avec sa capture ; puis la grille sur 100 de
     `niveau-agence.md` § 6, critère par critère, la note sur 10, et le verdict
     « Oui / Pas encore : ça vaut mes 25 000 € ». Une page **trop maigre** (structure
     incomplète, pas de catalogue ni d'articles alors que le métier vend ou publie) est
     signalée aussi sévèrement qu'une page trop bavarde : même gravité, même pénalité ;
   - `fix-plan.md` : les corrections `FIX-n`, de la plus grave à la plus légère, avec
     gravité, coût, où (fichier et ligne) et comment.
4. **Appliquer le plan**, dans cet ordre : les `FIX` à 0 $ ; puis les nouvelles
   générations, **seulement dans le budget accordé** (au-delà : demander, conventions
   § 9) ; les `FIX` qui demandent le vrai client (photos, avis, chiffres, règles
   commerciales) vont dans `maquette.md`, « Ce qui manque encore ». Un défaut qui vient
   du kit ou d'une règle du plugin se signale aussi (voir plus bas).
5. **Refaire les captures** après la dernière correction, puis tour suivant.

## Quand s'arrêter

- **Seuil atteint, verdict « Oui » et aucun des 10 points en « Pas OK » majeur** : la
  boucle est finie. Un point resté « Pas OK » qui dépend du vrai client (photos, prix
  réels) va dans « Ce qui manque encore ».
- **Un tour par défaut.** Sous le seuil après le tour rapide : appliquer les `FIX`
  gratuits, présenter avec la note, le verdict et ce qui bloque, et proposer un 2ᵉ tour
  à la porte de validation. **3 tours au plus**, et seulement sur demande. Pas de 4ᵉ.
- Un « Oui » au-dessus du seuil avec des `FIX` encore ouverts : corriger les gratuits,
  sans nouveau tour.

## Ce qu'on note

- `maquette.md` (étape 7) ou le bilan de l'étape 11, rubrique « Boucle persona » : la
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

Le tour rapide coûte environ 5 minutes d'agent, en parallèle du reste ; un tour complet
(sur demande) 10 à 20 minutes. 0 $ de génération tant
que le plan est appliqué en gratuit. Les images à refaire passent par le budget IA du
projet, déjà accordé.
