# Modèle : plan médias (brief photo et vidéo, liste de plans, manifeste)

> Livrable : `projet-site/07-medias/medias.md` · Étape 7 · Version courte : 8 min

## À quoi il sert

C'est l'équivalent du brief de shooting d'une agence : il dit quelles images et vidéos
il faut, pour quelle page et quel format, dans quelle lumière, et il garde la trace de
chaque fichier produit (prompt, modèle, texte alternatif). Sans lui, les images d'un
site ont l'air de venir de cinq banques différentes.

Lecteur : le patron, qui valide la série (« c'est bien mon métier, mes clients ») ;
le générateur ou le photographe, qui l'exécute ; la construction, qui intègre.

## Sommaire type

| # | Section | Contenu exact | Longueur | Forme |
|---|---|---|---|---|
| 1 | Intention | Ce que la série doit faire ressentir, en 3 mots (repris de la direction photo) | 2 lignes | Texte |
| 2 | Livrables attendus | Nombre de fichiers par format et par page (exemple : 1 hero 16:9, 1 hero mobile 4:5, 6 images de section 3:2) | 5 à 10 lignes | Tableau page / bloc / format / nombre |
| 3 | Fixé et libre | Ce que la charte impose (palette, lumière, zone libre pour le texte) et ce que la série peut ajouter | 4 lignes | Tableau « fixé / libre » |
| 4 | Bloc de style | Le paragraphe commun collé dans chaque prompt : lumière, objectif, grain, palette, ambiance | 3 à 5 lignes | Bloc de code |
| 5 | Liste de plans | Un plan par ligne : sujet, cadrage (serré, large, plongée), lumière, espace réservé au texte, ce qu'on évite | 1 ligne par plan | Tableau numéroté |
| 6 | Vidéo | Boucle de 5 à 8 s : geste filmé, mouvement de caméra, poids maximal, image d'affiche | 3 à 5 lignes | Fiche |
| 7 | Contrôle de cohérence | Vérifs avant de valider : même lumière, même palette, pas de texte dans l'image, mains et visages corrects | 5 lignes | Liste à cocher |
| 8 | Manifeste | Chaque fichier : nom, page, rôle, prompt, modèle, dimensions, poids, texte alternatif, statut (`provisoire` ou `définitif`) | 1 ligne par fichier | Tableau |
| 9 | Budget | Coût estimé et dépensé | 2 lignes | Ligne « x $ / y $ » |

### Détails qui comptent

- **Chaque image sert un livrable.** Une image qui ne correspond à aucune ligne du
  tableau 2 est de la décoration : on ne la produit pas.
- **Bloc de style** identique pour toute la série (c'est lui qui donne l'effet « même
  shooting ») :

```text
Photographie documentaire, lumière naturelle de fin de journée venant de la gauche,
objectif 35 mm, faible profondeur de champ, grain fin, palette encre et orange brûlé,
aucun texte, aucun logo, aucune personne qui regarde l'objectif.
```

- **Liste de plans** :

| # | Page / bloc | Sujet | Cadrage | Format | Zone texte | À éviter |
|---|---|---|---|---|---|---|
| 1 | Accueil / hero | Artisan qui range ses outils dans sa camionnette | Large, à hauteur d'épaule | 16:9 et 4:5 | Tiers gauche libre | Sourire face caméra |

## Ce qui le rend « niveau agence »

1. Chaque fichier du manifeste a une page, un rôle, un texte alternatif et un statut.
2. Toute la série partage le même bloc de style, écrit une seule fois.
3. Les formats bureau et mobile du hero sont prévus et cadrés séparément.
4. Le contrôle de cohérence est coché avant présentation (une image qui détonne est
   refaite, pas gardée).
5. Les images de banque ou générées ne sont jamais présentées comme l'équipe, le lieu ou
   le produit réels : elles sont marquées `provisoire`.

## Version courte (par défaut)

Temps : 8 min. Au début de l'étape 7, la liste de plans est écrite d'un bloc, puis
toutes les générations partent **en parallèle** ; on montre chaque image dès qu'elle
arrive.

- **On garde** : intention, livrables du hero et de la page d'accueil, bloc de style,
  liste de 6 à 8 plans, manifeste, budget.
- **On reporte** : vidéo (sauf si le métier a un geste évident à filmer), sons, images
  des pages secondaires, déclinaisons réseaux sociaux.

```markdown
# Plan médias — {Nom}
> Étape 7 — mis à jour le JJ/MM/AAAA — statut : brouillon

## Intention
## Livrables
| Page | Bloc | Format | Nombre |
|---|---|---|---|
## Bloc de style
(texte collé dans chaque prompt)
## Liste de plans
| # | Page / bloc | Sujet | Cadrage | Format | Zone texte | À éviter |
|---|---|---|---|---|---|---|
## Manifeste
| Fichier | Page | Rôle | Modèle | Dimensions | Poids | Texte alternatif | Statut |
|---|---|---|---|---|---|---|---|
Budget IA : x $ / y $
```

## Comment le publier

Markdown en artifact Docs pour le plan et le manifeste. Pour faire valider la série, un
artifact HTML de type planche contact (grille d'images réelles produites, légendes du
manifeste). Les médias sont le livrable de l'étape : ici, les images générées sont
voulues ; le document, lui, reste du texte.

## Sources consultées

- Storyflow, modèle de planche de shooting (zones, « fixé / libre », chaque image sert
  un livrable) : https://storyflow.so/blog/photoshoot-moodboard-template-2026
- Orlando Sydney, brief de photographe commercial :
  https://orlandosydney.com/commercial-photographer-brief/
- Meghani, modèle de brief créatif de shooting :
  https://meghani.world/creative-brief-photo-shoot-template
