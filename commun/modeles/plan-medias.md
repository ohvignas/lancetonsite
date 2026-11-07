# Modèle : plan médias (brief photo et vidéo, liste de plans, manifeste)

> Livrable : `projet-site/06-medias/medias.md` · Étape 6

## À quoi il sert

C'est l'équivalent du brief de shooting d'une agence : il dit quelles images et vidéos
il faut, pour quelle page et quel format, dans quelle lumière, et il garde la trace de
chaque fichier produit (prompt, modèle, texte alternatif). Sans lui, les images d'un
site ont l'air de venir de cinq banques différentes.

Lecteur : le patron, qui valide la série (« c'est bien mon métier, mes clients ») ;
le générateur ou le photographe, qui l'exécute ; la construction, qui intègre.

## Ce qui est livré

La liste de plans est écrite d'un bloc, puis toutes les générations partent **en
parallèle** ; on montre chaque image dès qu'elle arrive.

- Tous les médias de **toutes** les pages, secondaires comprises, avec le hero et ses
  deux formats.
- Les déclinaisons pour les réseaux sociaux : une image de partage par page, l'image
  maîtresse en 1:1.
- La vidéo dès que le métier a un geste, un lieu ou un objet qui bouge. Les sons dès qu'ils
  servent la marque.
- Sans génération (budget à 0, rien de connecté) : les banques libres en repli, et les
  prompts prêts à coller.

## Sommaire type

| # | Section | Contenu exact | Longueur | Forme |
|---|---|---|---|---|
| 1 | Intention | Ce que la série doit faire ressentir, en 3 mots (repris de la direction photo) | 2 lignes | Texte |
| 2 | Livrables attendus | Nombre de fichiers par format et par page (exemple : 1 hero 16:9, 1 hero mobile 4:5 en image ou 9:16 en vidéo, 6 images de section 3:2, 1 image de partage 1200 × 630) | 1 ligne par bloc | Tableau page / bloc / format / nombre |
| 3 | Fixé et libre | Ce que la charte impose (palette, lumière, zone libre pour le texte) et ce que la série peut ajouter | 4 lignes | Tableau « fixé / libre » |
| 4 | Bloc de style | Le paragraphe commun collé dans chaque prompt, en anglais : lumière, objectif, grain, palette, ambiance | 3 à 5 lignes | Bloc de code |
| 5 | Liste de plans | Un plan par ligne : sujet, cadrage (serré, large, plongée), lumière, espace réservé au texte, ce qu'on évite | 1 ligne par plan | Tableau numéroté |
| 6 | Vidéo, s'il y en a une | Boucle de 5 à 8 s : geste filmé, mouvement de caméra, poids maximal, image d'affiche | 3 à 5 lignes | Fiche |
| 7 | Contrôle de cohérence | Vérifs avant de valider : même lumière, même palette, pas de texte dans l'image, mains et visages corrects | 5 lignes | Liste à cocher |
| 8 | Manifeste | Chaque fichier : original, page, rôle, format (dont 9:16), affiche (vidéo, 3D), modèle, dimensions, poids, statut (`provisoire` ou `définitif`), origine, texte alternatif ; prompt, référence et coût au détail des générations | 1 ligne par fichier | Tableau |
| 9 | Budget | Coût estimé et dépensé, dépassement affiché | 2 lignes | Ligne « x $ / y $ » |

### Détails qui comptent

- **Chaque image sert un livrable.** Une image qui ne correspond à aucune ligne du
  tableau 2 est de la décoration : on ne la produit pas.
- **Bloc de style** identique pour toute la série (c'est lui qui donne l'effet « même
  shooting ») :

```text
Documentary photography, natural late-afternoon light from the left, 35mm lens,
shallow depth of field, fine grain, palette of ink and burnt orange,
no text, no logo, nobody looking at the camera.
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

## Gabarit

```markdown
# Plan médias — {Nom}
> Étape 6 — mis à jour le JJ/MM/AAAA — statut : brouillon

## Intention
## Livrables
| Page | Bloc | Format | Nombre |
|---|---|---|---|
## Fixé et libre
## Bloc de style
(texte collé dans chaque prompt)
## Liste de plans
| # | Page / bloc | Sujet | Cadrage | Format | Zone texte | À éviter |
|---|---|---|---|---|---|---|
## Vidéo
## Contrôle de cohérence
- [ ] Même lumière, même palette
## Manifeste
| Original | Page | Rôle | Format | Affiche | Modèle | Dimensions | Poids | Statut | Origine | Texte alternatif |
|---|---|---|---|---|---|---|---|---|---|---|
Budget IA : x $ / y $
```

## Comment le publier

Un seul document, au même lien : le plan, le manifeste et la galerie des images réellement
produites, placées avec leurs légendes du manifeste. Les médias sont le livrable de
l'étape : ici, les images générées sont voulues ; le document les place, il ne se résume
jamais à une image.

## Sources consultées

- Storyflow, modèle de planche de shooting (zones, « fixé / libre », chaque image sert
  un livrable) : https://storyflow.so/blog/photoshoot-moodboard-template-2026
- Orlando Sydney, brief de photographe commercial :
  https://orlandosydney.com/commercial-photographer-brief/
- Meghani, modèle de brief créatif de shooting :
  https://meghani.world/creative-brief-photo-shoot-template
