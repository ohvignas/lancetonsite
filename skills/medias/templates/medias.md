# Médias — {{NOM_DU_PROJET}}

> Étape 6 — mis à jour le {{DATE}} — statut : brouillon

## Intention

{{ce que la série doit faire ressentir, en 3 mots}}

## Livrables

| Page | Bloc | Format | Nombre |
|---|---|---|---|
| Accueil | Hero | 16:9, mobile 4:5 (image) ou 9:16 (vidéo) | {{}} |
| {{toutes les pages}} | Image de partage | 1200 × 630 | 1 |

## Fixé et libre

| Fixé par la charte | Libre pour la série |
|---|---|
| {{palette, lumière, zone libre pour le texte}} | {{}} |

## Bloc de style (commun à toutes les générations)

```
{{bloc de style anglais, palette hex incluse}}
```

Image maîtresse : `{{images/hero-maitresse.png}}` — référence de toute la série.

## Liste de plans

| # | Page / bloc | Sujet | Détails de métier | Cadrage | Format | Zone texte | À éviter |
|---|---|---|---|---|---|---|---|
| 1 | {{}} | {{}} | {{3 détails vérifiables}} | {{}} | {{}} | {{}} | {{}} |

## Vidéo

- Geste filmé : {{}} — mouvement de caméra : {{}} — poids maximal : {{}} — affiche : {{}}

## Vraies photos à recevoir

| Emplacement | Prises de vue (sujet, cadrage, lumière, sens) | Droit à l'image |
|---|---|---|
| {{}} | {{3 prises au moins}} | {{accord écrit de…}} |

## Contrôle de cohérence

- [ ] Même lumière, même grain, même palette sur toute la série
- [ ] Aucun texte, faux logo ou filigrane
- [ ] Mains et visages corrects
- [ ] Les 3 détails de métier sont justes sur chaque image
- [ ] Rien qui fasse « image de banque » ou « rendu 3D lisse »

## Budget

| | Prévu | Dépensé |
|---|---|---|
| Images | {{N}} — {{X}} € | {{}} |
| Vidéos | {{M}} — {{Y}} € | {{}} |
| Total | {{}} | {{}} |

Dépassement du budget annoncé : {{non, ou coût}}

## Inventaire (manifeste)

Le fichier est l'original, celui que la maquette utilise ; les versions web sont
produites à l'étape 6 dans `06-medias/web/`.

| Original | Page / emplacement | Rôle | Format | Affiche | Modèle | Dimensions | Poids | Statut | Origine | Texte alternatif |
|---|---|---|---|---|---|---|---|---|---|---|
| `images/hero-maitresse.png` | Accueil / hero | {{installer l'ambiance}} | 16:9 | — | {{}} | {{}} | {{}} | provisoire | IA | {{…}} |
| `videos/hero.mp4` | Accueil / hero | {{boucle du geste}} | 16:9 | `images/hero-affiche.jpg` | — | {{}} | {{}} | définitif | Vidéo fournie | {{…}} |
| `videos/hero-916.mp4` | Accueil / hero mobile | {{même boucle}} | 9:16 | `images/hero-916-affiche.jpg` | — | {{}} | {{}} | définitif | Vidéo fournie | {{…}} |
| `images/equipe.jpg` | À propos | {{confiance}} | 4:5 | — | — | {{}} | {{}} | définitif | Photo réelle | {{…}} |
| `3d/flacon.glb` | Produit | {{objet en direct}} | — | `images/flacon-repos.jpg` | Blender | — | {{}} | définitif | Blender | {{…}} |

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
