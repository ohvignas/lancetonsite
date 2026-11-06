# La boucle persona — tester comme le client, corriger, retester

Le relecteur lit des captures. La boucle persona fait autre chose : un agent **devient
le client** (le patron qui paie le site, et l'acheteur décrit dans le cadrage), ouvre la
page dans un vrai navigateur, l'utilise, la note, et dit s'il paierait. Puis on corrige
et un nouvel agent reteste. C'est l'étape qui fait passer une page de « propre » à
« ça vaut l'argent » : sur les projets de test du plugin, les notes sont passées de
71 à 88 (Brisant) et de 85 à 93 (Vigie) en trois tours.

Ce fichier est la source unique. `maquette` (étape 7, § 4) et `construire` (étape 11,
§ 4) y renvoient.

**Ce que le client simulé ne voit pas.** Il a mis 87/100 à un hero dont le cou se décolait à
la souris et dont le bouton tremblait. L'œil de l'utilisateur sur sa vraie machine, souris en
main, reste un contrôle obligatoire : la note ne le remplace jamais.

## Quand

| Moment | Page testée | Seuil |
|---|---|---|
| Étape 7, après la critique et la note du relecteur | le prototype animé (`07-maquette/prototype/accueil.html`) | **85** avec médias provisoires, **90** avec les vraies photos |
| Étape 11, recette, après la revue finale | le site construit, servi en local (`npm run preview`) | **90** |
| Objet 3D (skill `objets-3d`), appelé aux étapes 6, 7 ou 11 | l'aperçu de l'objet : boucle automatique jusqu'à 3 tours sur une image (coût faible, une image), voir `skills/objets-3d/references/boucle-3d.md` | **85** |

**Trois façons de tester**, nommées telles quelles dans la consigne donnée à l'agent :

| Mode | Quand | Ce que l'agent fait | Durée |
|---|---|---|---|
| `rapide` | tour 1, par défaut, lancé en parallèle du relecteur, en arrière-plan | premier écran et défilement complet à 1440 et 375, `captures.py --hero`, les 10 points, la note et le verdict | visé : 5 min ; mesuré : 7 min 01 (Atelier Mélisse, 06/11/2026) |
| `controle` | tours 2 et 3, par défaut | chaque `FIX` du plan précédent ; les zones modifiées ; les mesures de toutes les tailles | visé : 5 min ; mesuré : entre 8 min 48 et 11 min 19, dont 11 min 05 s (Kweeto, 05/11/2026, 15 `FIX` et une relance) |
| `complet` | sur demande uniquement | tout le test, partagé entre deux agents en parallèle (voir « Tour complet à deux ») | visé : 10 min, pas encore mesuré |

Tours 2 et 3 : mode `controle`. L'orchestrateur passe à l'agent la liste des zones
modifiées, en sélecteurs CSS tirés des `FIX` appliqués (par exemple
`zones: ["#c03 .hero", "#c15"]`). Un `FIX` sur un lot partagé (variables, styles
communs, mise en page, script global) touche tout : sa zone est « page entière », contrôlée
avec `--pleine-page` à 1440 et 375, et tous les critères sont réévalués. Un objet 3D garde sa boucle automatique sur une image
(`skills/objets-3d/references/boucle-3d.md`).

Les captures se font avec `${CLAUDE_PLUGIN_ROOT}/commun/scripts/captures.py` : état
final des animations, débordement, console et images mesurés dans `mesures.json`. Pas de
captures à la main, sauf pour filmer un geste.

## Le tour

0. **Prérequis, une fois avant le tour 1** : `python3 ${CLAUDE_PLUGIN_ROOT}/commun/scripts/captures.py --verifier`.
   « Prêt » : on continue. « Manque » : il faut télécharger Playwright ou son navigateur.
   C'est un téléchargement : demander l'accord **avant** de lancer la boucle, jamais en
   plein tour. Sans accord, le dire et relire le code à la place des captures.
1. **Préparer** le dossier `projet-site/boucle-persona/iteration-N/` (N = 1, puis 2 et 3 ;
   étape 11 : `projet-site/site/.lancetonsite/boucle-persona/iteration-N/`), et servir
   la page en local (`commun/scripts/servir.py`, jamais `file://`).
   Avant le tour 1, écrire **une fois** `projet-site/boucle-persona/fiche-client.md`
   depuis le gabarit `skills/cadrage/templates/fiche-client.md` (une page, à partir de
   `01-cadrage.md`, `02-marque.md` et `00-etat.md`). On la reprend seulement si le cadrage ou la fiche change.
2. **Lancer l'agent `client-persona`**, un nouvel agent à chaque tour (un regard neuf),
   avec :
   - l'URL locale et les chemins des fichiers de la page ;
   - `fiche-client.md`, **à la place** du cadrage et de la marque (il peut les ouvrir
     s'il doute d'un point de métier, pas les relire
     en entier) ;
   - à partir du tour 2 : le `fix-plan.md`, le `scores.md` et le `mesures.json` du tour
     précédent, pour vérifier chaque correction, reprendre les notes et repérer ce qui
     régresse ; **jamais** les rapports du relecteur (regard indépendant).
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
4. **Appliquer le plan**, dans cet ordre :
   - **les `FIX` à 0 $, par lot.** Le `fix-plan.md` range chaque `FIX` dans un `lot`
     (le fichier ou le composant touché). À partir de 3 lots qui touchent des
     **fichiers différents** : un sous-agent par lot, tous lancés dans le même message.
     Dans un même fichier : une seule passe scriptée, qui contrôle chaque remplacement
     (`assert`), jamais deux agents sur le même fichier ;
   - **les nouvelles générations** : dans le budget accordé, ou dépassement annoncé avec
     son coût (conventions § 8). Elles partent en arrière-plan et ne bloquent pas la
     boucle : le tour suivant part avec le média provisoire. Quand le nouveau média
     arrive, on le contrôle (3 images extraites, texte stable, aucun curseur ni main
     ajoutés), on le remplace, et le tour d'après le vérifie ;
   - **les `FIX` qui demandent le vrai client** (photos, avis, chiffres, règles
     commerciales) : dans `maquette.md`, « Ce qui manque encore ». Un défaut qui vient
     du kit ou d'une règle du plugin se signale aussi (voir plus bas).
5. **Contrôler avant le tour suivant** : `captures.py` à 1440 et 375 sur les zones
   corrigées. Un débordement ou une erreur de console se corrige avant de relancer.
   Puis tour suivant, en mode `controle`.

## Tour complet à deux

Le mode `complet` est partagé entre **deux agents `client-persona`**, lancés dans le même
message, en arrière-plan. Chacun écrit ses trois fichiers dans son sous-dossier
(`iteration-N/ordinateur/`, `iteration-N/telephone/`).

| Variante | Tailles et gestes | Les 10 points |
|---|---|---|
| `complet-ordinateur` | 1440 et 1280 ; parcours de l'acheteur, formulaires, densité, œil du métier | points 1, 2, 3, 4, 6, 7, 8, 9 et 10 (4 et 8 à ses tailles) |
| `complet-telephone` | 768, 375 et 360 ; 40 tabulations, mouvement réduit, console | points 4, 5 et 8 |

Chaque agent note la grille entière, et marque « hors périmètre » ce qu'il n'a pas pu
juger. L'orchestrateur fusionne dans `iteration-N/` :
- `scores.md` : pour chaque critère, la note la plus basse des deux (un « hors
  périmètre » ne compte pas). Il recalcule la note sur 100 et réunit les 10 points : un
  point jugé par les deux garde le « Pas OK » si l'un des deux l'a mis ;
- verdict « Oui » seulement si les deux agents disent « Oui » ;
- `fix-plan.md` : les deux plans réunis, sans doublon, renumérotés de la plus grave à la
  plus légère.

## Quand s'arrêter

- **Seuil atteint, verdict « Oui » et aucun des 10 points en « Pas OK » majeur** : la
  boucle est finie. Un point resté « Pas OK » qui dépend du vrai client (photos, prix
  réels) va dans « Ce qui manque encore ».
- **Sous le seuil** : appliquer les `FIX`, puis un tour `controle`, et ainsi de suite. **3 tours au plus**, pas de 4ᵉ. Ensuite on présente avec la note, le
  verdict et ce qui bloque.
- **Arrêt anticipé** : sous le seuil, si tous les `FIX` restants sont de coût « client »,
  ou légers et à 0 $, on arrête sans nouveau tour. On applique les légers, on présente,
  et les points client vont dans « Ce qui manque encore ». Un tour de plus n'y
  changerait rien.
- Un « Oui » au-dessus du seuil avec des `FIX` encore ouverts : corriger les gratuits,
  sans nouveau tour.

## Ce qu'on note

- `maquette.md` (étape 7) ou le bilan de l'étape 11, rubrique « Boucle persona » : la
  note de chaque tour (ex. « 71 → 83 → 88 »), le verdict final, les `FIX` restés au
  client.
- `00-etat.md`, ligne « Boucle persona » : notes et verdict.
- `projet-site/boucle-persona/chrono.md` : pour chaque tour, le mode, l'heure de lancement, la
  durée du test (`duration_ms` rendu par l'agent), la durée des corrections et la note.
  On mesure, on n'estime pas : c'est ce qui dit si la boucle va vraiment plus vite.
- Le « Oui » du persona met l'étape en `validé (simulé)` au plus, jamais en `validé` :
  c'est un agent qui joue le client (conventions § 5). Le vrai client valide ensuite,
  avec la note et les rapports sous les yeux.

## Ce que la boucle améliore au-delà du projet

Si un défaut vient du plugin lui-même (le kit de gestes, une règle, un gabarit), le
noter dans `maquette.md`, rubrique « Retours sur le plugin ». Exemple réel : la
boucle de Brisant a trouvé que les apparitions au défilement rendaient la FAQ
inatteignable au clavier ; corrigé dans le kit pour tous les projets (1.4.2).

## Coût

Mesures (Kweeto, 05/11/2026) : un tour complet à un seul agent, sans script, 15 min 08 s
et 133 captures ; premier tour `controle`, 11 min 05 s, loin des 5 minutes visées : 15 `FIX`
à revoir, une relance après des captures lancées en parallèle, des gestes en plus. Le mode
`controle` a depuis une consigne plus stricte, à remesurer dans `chrono.md`. 0 $ de génération tant
que le plan est appliqué en gratuit. Les images à refaire passent par le budget IA du
projet, déjà accordé.
