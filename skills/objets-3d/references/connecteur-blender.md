# Le connecteur `blender` (serveur officiel du Blender Lab, v1.0.3)

Le Blender Lab ne publie pas de skill pour agents. Ce qu'il fournit : 26 outils, des consignes intégrées au serveur et des exemples de demandes sur blender.org/lab/mcp-server. Ce fichier les résume avec nos mots. En cas de doute, le serveur transmet ses consignes complètes à la connexion.

## Mise en place

Il faut Blender 5.1 ou plus récent, `uv` et le module MCP. Proposer, et n'installer qu'avec un oui.

1. Installer le module : glisser dans Blender le lien de la page officielle (deux fois : le dépôt du Lab, puis le module), ou `"$BLENDER" --command extension install-file -r user_default -e mcp-1.0.3.zip` avec le fichier de la release.
2. Autoriser l'accès en ligne : « Allow Online Access » (Préférences, Système), ou `"$BLENDER" --online-mode` pour une seule session. Sans lui, le module ne démarre pas et le serveur répond « Cannot connect to Blender at localhost:9876 ». Le réglage permanent reste la décision de l'utilisateur.
3. Vérifier qu'un autre module n'occupe pas le port 9876. `MCP for Blender` (Siddharth Ahuja) le prend aussi : le désactiver, avec un oui, sans le supprimer.

Les outils `_for_cli` ne demandent pas Blender ouvert ni le module. Ils lancent `blender --background` : il faut que `blender` soit dans le PATH, ou définir `BLENDER_PATH` avec le chemin donné par `installer-blender.sh`.

## Quel outil, à quel moment

| Besoin | Scène ouverte | Fichier `.blend`, sans interface |
|---|---|---|
| Comprendre le fichier | `get_blendfile_summary_datablocks`, `get_blendfile_summary_usage_guess` | les mêmes, suffixe `_for_cli` |
| État d'enregistrement, sauvegardes | `get_blendfile_summary_path_info` | idem `_for_cli` |
| Fichiers perdus, bibliothèques liées | `get_blendfile_summary_missing_files`, `get_blendfile_summary_of_linked_libraries` | idem `_for_cli` |
| Lire la scène, puis un objet | `get_objects_summary`, `get_object_detail_summary` | passer par `execute_blender_code_for_cli` |
| Écrire ou corriger du `bpy` | `get_python_api_docs` (nom exact), `search_api_docs` | identiques, sans Blender |
| Comprendre une fonction de Blender | `search_manual_docs` | identique, sans Blender |
| Voir | `get_screenshot_of_area_as_image` (zone), `get_screenshot_of_window_as_image`, `get_screenshot_of_window_as_json` (disposition, en texte) | rendu |
| Montrer quelque chose à l'utilisateur | `jump_to_view3d_object_by_name`, `jump_to_tab_by_name` | sans objet |
| Rendre | `render_thumbnail_to_path` (rapide), `render_viewport_to_path` | `execute_blender_code_for_cli` |
| Le reste | `execute_blender_code`, **en dernier recours** | `execute_blender_code_for_cli` |

- Toujours lire `filepath` dans la réponse d'un rendu : testé en v1.0.3, le fichier arrive dans le dossier temporaire de Blender, pas au chemin demandé.
- Les docs marchent sans Blender : les consulter aussi pour écrire les scripts `lib3d`, plutôt que de deviner un paramètre.
- Une capture coûte cher en contexte : limiter `size_limit_in_bytes`, ou lire la version JSON quand le texte suffit.

## Règles pour le code envoyé

**Avant d'agir**

- Regarder d'abord : ne rien supposer sur une scène. Aller du général au détail, sans vider une grosse scène d'un coup.
- Faire enregistrer le fichier, et demander avant toute modification destructive. `execute_blender_code` n'a aucun garde-fou : le Lab conseille une machine sans données sensibles.
- Respecter les noms et l'organisation déjà en place.
- Vérifier les unités de la scène (mètres par défaut) avant de créer aux cotes.

**Pendant**

- Rendre les résultats dans `result = {...}`, un dict JSON, plutôt que par `print`.
- Les opérateurs dépendent du mode, de l'objet actif et de la sélection, qui sont deux choses distinctes : les fixer soi-même, et de nouveau entre deux opérateurs. Dans le mauvais mode, un opérateur peut échouer ou ne rien faire, sans le dire.
- `bpy.ops` pour les gestes courants ; `bpy.data` pour la précision ou les créations en série, sans effet sur la sélection. Un objet créé par `bpy.data` doit être lié à une collection.
- Blender renomme en `.001` en cas de collision : garder la référence à la création, ne jamais rechercher un nom supposé.
- Mettre à jour le depsgraph avant de lire une matrice ou le résultat d'un modificateur.
- En mode édition, passer par `bmesh` et renvoyer les changements au maillage, sinon ils sont perdus.
- Regarder le mode de rotation : écrire dans la mauvaise propriété ne fait rien. Lire les positions dans la matrice monde.
- Appliquer l'échelle avant un booléen ou une simulation.
- Préférer les modificateurs aux retouches directes du maillage. Vérifier le nombre d'utilisateurs avant de changer une donnée partagée.
- Un objet « disparu » : regarder les trois états, caché dans la vue, exclu du calque de vue, exclu du rendu.

## Le contrôle avant rendu

`scripts/controle_scene.py` relit une scène sans la modifier :

- **défauts** : facettes, objet sans matière, normales opposées, image manquante ;
- **avis** : arêtes ouvertes, échelle non uniforme, chemin absolu ;
- **triangles** par objet, modificateurs compris : c'est là qu'on gagne du poids pour un `.glb`.

Un plan à une seule face est ignoré. Si des facettes sont voulues, comme les stries d'une bague moletée, le modèle pose `ob["facettes_voulues"] = True`.

## Demandes qui servent au plugin

Inspirées des cas testés par le Lab, à adapter :

- « Liste les objets les plus lourds et les plus petits vus de la caméra, modificateurs compris. » Avant d'alléger un `.glb`. Le Lab note qu'une première réponse peut oublier les modificateurs : vérifier.
- « Quels objets utilisent cette matière ? » Avant de la changer.
- « Propose des noms clairs pour les objets et données de ce fichier, et applique si j'accepte. » Pour un modèle tiers.
- « Explique ce que fait ce montage de nœuds et documente-le dans le fichier. » Pour reprendre un fichier reçu.
- « Ce maillage a des défauts d'ombrage : trouve la cause et corrige. »
