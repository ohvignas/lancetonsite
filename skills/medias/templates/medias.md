# Médias — {{NOM_DU_PROJET}}

> Étape 6 — mis à jour le {{DATE}} — statut : brouillon

## Bloc de style (commun à toutes les générations)

```
{{bloc de style anglais, palette hex incluse}}
```

Image maîtresse : `{{images/hero-maitresse.png}}` — référence de toute la série.

## Budget

| | Prévu | Dépensé |
|---|---|---|
| Images | {{N}} — {{X}} € | {{}} |
| Vidéos | {{M}} — {{Y}} € | {{}} |
| Total | {{}} | {{}} |

## Inventaire

Le fichier est l'original, celui que la maquette utilise ; les versions web sont
produites à l'étape 6 dans `06-medias/web/`.

| Original | Page / emplacement | Rôle | Format | Affiche | Statut | Origine | Texte alternatif |
|---|---|---|---|---|---|---|---|
| `images/hero-maitresse.png` | Accueil / hero | {{installer l'ambiance}} | 16:9 | — | provisoire | IA | {{…}} |
| `videos/hero.mp4` | Accueil / hero | {{boucle du geste}} | 16:9 | `images/hero-affiche.jpg` | définitif | Vidéo fournie | {{…}} |
| `videos/hero-916.mp4` | Accueil / hero mobile | {{même boucle}} | 9:16 | `images/hero-916-affiche.jpg` | définitif | Vidéo fournie | {{…}} |
| `images/equipe.jpg` | À propos | {{confiance}} | 4:5 | — | définitif | Photo réelle | {{…}} |
| `3d/flacon.glb` | Produit | {{objet en direct}} | — | `images/flacon-repos.jpg` | définitif | Blender | {{…}} |

Statut : `provisoire` (image qui tient la place d'une vraie photo) ou `définitif`.
Format : ratio ; 9:16 pour la version mobile d'une vidéo. Une vidéo, un modèle 3D :
une affiche (image de repos) par format.

## Détail des générations

### {{nom-du-fichier}}
- Modèle : `{{endpoint}}` — coût : {{}}
- Référence : {{image maîtresse / aucune}}
- Prompt :
  ```
  {{prompt complet}}
  ```
- Graine (seed) : {{}}
- Essais : {{1/2/3}} — remarque : {{}}

## Points de vigilance

- {{ex. : personnes générées par IA sur la page X — mention conseillée}}
