# Pavés de verre

apercu: pave-verre.html?apercu

Fond de hero · démo : [`pave-verre.html`](pave-verre.html) · captures : `captures/pave-verre-1440.png`, `-375.png`, `-1440-reduit.png`

- **Technique** : Canvas 2D, deux toiles. La première tient la scène derrière le mur : une photo réduite au dixième de l'écran (le flou est gratuit), à peine voilée (10 %) et qui glisse lentement ; une troisième, au tiers de l'écran, garde la même scène plus nette pour la loupe. La seconde peint le mur : mortier gris grené, puis chaque brique (coins arrondis) en trois couches : bordure moulée (la scène resserrée), cœur bombé (8 bandes verticales qui agrandissent et renversent la scène, décalées par l'ondulé du verre pressé), puis le verre éclairci (ombres relevées en `screen`, voile clair à 20 %, teinte vert d'eau en `multiply` à demi-force : le verre est plus clair que le joint et laisse passer la lumière), dégradés légers du coussin, reflet en biais et arêtes claires en haut à gauche, sombres en bas à droite
- **Poids** : démo 15,7 Ko (6,1 Ko gzip ; 15730 et 6062 octets), plus la photo de scène (`salon-1200.webp`, 52,6 Ko). Aucune dépendance
- **Inspiré de** : « Amesi » sur https://sceneai.art/landing-pages (carte bancaire posée sur un champ de fleurs vu à travers un mur de verre en mosaïque). Voir `../etude/sceneai.md`. Code et textes écrits par nous.
- **Licence** : code original Lancetonsite, libre d'usage, de modification et de revente sur les sites clients, sans attribution ; aucune bibliothèque tierce. Police de la démo (Archivo) : Google Fonts, SIL Open Font License 1.1. Photo de scène : `exemples/logiciel-miroir/images/salon-1200.webp`, générée avec FLUX.2 Pro via OpenRouter le 4 novembre 2026 pour l'exemple Miroir (voir `exemples/logiciel-miroir/NOTES.md`, § 5) ; droits selon les conditions du modèle pour le compte qui l'a générée. Pour un client : sa propre photo (pièce, jardin, atelier), floue ou non, n'importe laquelle convient.

## Quand l'utiliser

Architecture intérieure, verrier, salle de bain, clinique, cabinet qui vend de la discrétion (« on voit la lumière, pas les détails »). Aussi pour une marque de cosmétique ou un spa qui veut un fond « matière ». Le texte est posé dans une carte blanche : la scène peut être aussi sombre ou chargée qu'on veut.

## Brancher dans une maquette

1. Copier la `<section class="pave">` (canvas, contenu, bouton pause), le bloc CSS « à copier » et le `<script>`.
2. Mettre le chemin de la photo dans `data-scene` sur la section. Une photo de 1200 px suffit : elle est réduite au dixième. Sans photo (ou pendant son chargement), trois taches de lumière tiennent lieu de scène.
3. Garder titre, paragraphe et bouton dans la carte blanche (contraste garanti quelle que soit la photo).

## Variables

| Variable | Défaut | Rôle |
|---|---|---|
| `--pave-joint` | `#b3ada4` | mortier gris entre les briques (grain clair et sombre ajouté en code) |
| `--pave-verre` | `#cfe3df` | teinte du verre, appliquée en `multiply` (blanc = verre extra-clair) |
| `--pave-taille` | `96` | côté d'une brique en px (× 0,78 sous 600 px) |
| `--pave-joint-largeur` | `10` | épaisseur du joint en px (× 0,78 sous 600 px) |
| `data-scene` | `../exemples/logiciel-miroir/images/salon-1200.webp` | photo vue à travers le mur |

Dans le JS : `bord` (15 % : largeur de la bordure moulée), `N` (8 bandes d'ondulation), `m` (1,7 : grossissement renversé du cœur au repos), `zoom` (2,6 : loupe sous le curseur, scène nette et à l'endroit), le rayon d'influence du curseur (`S * 1.5`), le halo du curseur (`.48`).

## Prompt pour le régénérer

> Écris un fond de hero en canvas 2D qui imite un vrai mur de briques de verre de 19 × 19 cm. Une seconde toile, dix fois plus petite que l'écran, dessine la scène derrière le mur : une photo (chemin dans `data-scene`) en « cover », agrandie de 18 %, qui glisse très lentement, floutée d'un pixel et éclaircie d'un voile blanc à 10 % ; une troisième toile, au tiers de l'écran, dessine la même scène plus nette. Sur la toile principale : fond en mortier gris (motif de grain calculé une fois, graine fixe), puis des briques carrées de 96 px séparées par des joints de 10 px, coins arrondis. Pour chaque brique : la bordure moulée (15 % du côté) montre la scène un peu resserrée ; le cœur bombé est découpé en 8 bandes verticales qui recopient chacune un morceau de la scène agrandi 1,7 fois et renversé (`scale(-1, -1)`), décalé par une sinusoïde (ondulé du verre pressé) ; garde toujours la zone source dans la toile. Puis éclaircis le verre (remplissage `screen` gris moyen, voile blanc à 20 %, teinte vert d'eau en `multiply` à 50 %) pour qu'il soit plus clair que le joint, dégradés verticaux et horizontaux du coussin (clair en haut à gauche), un reflet en biais, des arêtes claires en haut à gauche et sombres en bas à droite sur le bord extérieur et sur le cadre intérieur, et une fine ombre dans le joint. Sous le curseur, les briques voisines (bosse gaussienne lissée) deviennent des loupes : au-delà de 0,3 de bosse, leurs bandes recopient la toile nette à l'endroit, grossie 2,6 fois autour du curseur (l'ondulé s'efface), leur reflet s'avive et un halo chaud passe à travers le mur. Texte dans une carte blanche, titre d'une seule phrase coupée à la virgule. Variables CSS pour le mortier, la teinte, la taille et le joint. Pause, arrêt hors écran et onglet caché ; en mouvement réduit, image fixe et curseur ignoré.

## Accessibilité

Canvas en `aria-hidden`. Surtitre, titre, paragraphe et bouton sont dans une carte blanche à 94 % d'opacité : contraste mesuré au pire cas à 1440 px, titre bordeaux `#8c1626` 8,7:1, surtitre 9,8:1, paragraphe 15,7:1 ; bouton blanc sur bordeaux. Bouton pause de 44 px, libellé explicite, focus visible.

## Mouvement réduit

La scène est dessinée une fois, figée ; le curseur est ignoré (aucune bosse, aucun halo). Vérifié avec Playwright : deux captures à 1,2 s d'écart identiques, y compris après le chargement de la photo (qui redessine une fois l'image fixe).

## Performance

À 1440 × 900 : 150 briques, soit environ 1 350 `drawImage` (1 bordure + 8 bandes par brique), plus la toile nette de la loupe (un tiers de l'écran, redessinée à chaque glissement de la scène) et 900 petits dégradés par image ; 60 images/s mesurées dans Chrome sans écran (Playwright, portable récent). Sous 600 px : environ 60 briques. La scène source est minuscule (144 × 90 px à 1440) : c'est l'agrandissement qui fait le flou. Boucle stoppée hors écran, onglet caché et en pause ; densité de pixels plafonnée à 2. Pour un téléphone d'entrée de gamme, passer `--pave-taille` à 120 (deux fois moins de briques) ou `N` à 5.
