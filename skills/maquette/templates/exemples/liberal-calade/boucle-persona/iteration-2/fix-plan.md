# Boucle persona, tour 2 : plan de corrections

Page : exemple « Atelier Calade » · 4 novembre 2026 · note **80 / 100**, seuil 85.
Budget IA : **0 €**. Toutes les corrections se font à **0 $** : photos libres (Unsplash,
Pexels) choisies à l'œil du métier, code, texte. Aucune génération proposée. Ce que seul le
vrai client peut fournir est marqué **client**.

**Budget de mots.** La page compte 325 mots (cible magazine : 320 à 390). Ajouts du plan :
FIX-2 (+5), FIX-8 (+7), FIX-10 (−2), légendes remplacées à nombre égal. **Après le plan :
≈ 335 mots.** Recompter avec le script de `conventions.md` § 11.

**Images.** Après remplacement : recadrer aux formats en place (900 × 1350 pour le mas,
900 × 678 pour la maison de Ménerbes, 700 × 1050 et 1400 × 2100 pour l'alcôve), `cwebp -q 70`,
réécrire chaque `alt` d'après la photo retenue, et ne garder que des photos qu'on pourrait
croire prises entre Cavaillon et Apt : calcaire blond, tuile canal, enduit à la chaux,
menuiseries bois peintes, zinc. Rien en PVC, aucun objet religieux ou décoratif qui signe un
autre pays.

| FIX | Gravité | Coût | Résumé |
|---|---|---|---|
| FIX-1 | majeur | 0 $ (photo libre) · client pour le définitif | La « maison de la rue Basse, Ménerbes » est une cour grecque (icônes orthodoxes, croix sur la porte) ; la légende parle de voûtes qu'on ne voit pas |
| FIX-2 | majeur | 0 $ | Plus aucune réponse à « Les Bâtiments de France accepteront-ils des ouvertures ? » |
| FIX-3 | moyen | 0 $ (photo libre) | La matière : l'alcôve est toujours une niche de musée à chaise de poupée, et aucune pierre sous « La chaux, la pierre » |
| FIX-4 | moyen | 0 $ (kit) | Sommaire : l'image flottante tourne de 6° et cache le titre survolé ; mas et rue Basse sans lien |
| FIX-5 | moyen | 0 $ | Sur téléphone, les trois légendes de la matière sont coupées (dont « chaux aérienne, trois passes ») |
| FIX-6 | moyen | 0 $ (photo libre) · client | Le mas de la Roque : porte-fenêtre et descente en PVC blanc, toit invisible alors que le texte parle de toiture |
| FIX-7 | moyen | 0 $ (photo libre) | La même photo de grange vue 4 fois (À la une, survol, entrée ouverte, article) |
| FIX-8 | moyen | 0 $ · client pour valider | « Combien coûte un architecte, en vrai ? » : donner le total, pas seulement le suivi |
| FIX-9 | léger | 0 $ | Portrait : l'encart de texte mord le haut de la photo et dessine une marche (`md:mt-0` écrase la marge prévue) |
| FIX-10 | léger | 0 $ | Trois libellés pour une même action |
| FIX-11 | léger | 0 $ | 375 × 667 : la ligne de prix est coupée ; la légende de couverture se colle sous le prix |
| FIX-12 | léger | 0 $ | Textes alternatifs : la couverture voit une fenêtre absente ; alts à réécrire avec les nouvelles photos |
| FIX-13 | léger | 0 $ | Cibles tactiles sous 24 px : lien du téléphone et « Haut de page » |
| FIX-14 | léger (bloque 90, pas 85) | client | Ce qui bloque 90 : photos réelles, portrait à l'atelier, avis signés, vrai nombre de bâtisses, mentions légales et numéro d'inscription à l'Ordre |
| FIX-15 | léger | 0 $ | Quatre images au-dessus de 230 Ko, le mas à 191 Ko pour 900 px |

---

## FIX-1 · majeur · Ménerbes est en Grèce

**Quoi.** `images/village-900.webp` : cour dallée en opus incertum sous des arcades et un auvent
de charpente ; deux icônes orthodoxes accrochées au pilier, une croix sculptée sur le panneau
de la porte, une icône sur la porte, une jardinière blanche moulée à tête de lion
(`captures/detail-menerbes-icones.webp`, `captures/d-sommaire-survol-3.webp`). Et la légende dit
« voûtes du rez-de-chaussée dégagées » : on voit des arcs et une charpente, aucune voûte.
C'est vu deux fois (survol, entrée ouverte), et c'est la maison de la couverture.

**Où.** `index.html` l. 86 (`data-follow-img`), l. 90 (image et alt), l. 91 (texte).

**Comment.** Photo libre d'un rez-de-chaussée de maison de village du Luberon : voûte en
berceau ou d'arêtes en pierre ou chaulée, sol en calade ou en dalles calcaires, ou une petite
cour entre murs de moellons calcaires. Recadrer en 3:2 (900 × 600 ou 900 × 678). Garder
« Patio rouvert, voûtes du rez-de-chaussée dégagées » seulement si l'on voit la voûte ; sinon
écrire ce que montre la photo, à nombre de mots égal (par exemple « Rez-de-chaussée voûté
dégagé, sol de calade reposé. »). Alt réécrit. Au vrai projet : photo du chantier (client).

## FIX-2 · majeur · les Bâtiments de France

**Quoi.** Claire demande : « Les Bâtiments de France vont-ils accepter des ouvertures ? ». Le
brief dit « souvent en secteur protégé (ABF) » et la promesse est « ouvrir la lumière ». Au
tour 1, la page en parlait avec une procédure fausse ; au tour 2 la phrase a été retirée, et il
ne reste rien. C'est la question où un architecte du pays se distingue d'un maître d'œuvre.

**Où.** `index.html` l. 132 (tarif de la visite).

**Comment.** Remplacer « 1 h 30 sur place, faisabilité et règles d'urbanisme. » par :
« 1 h 30 sur place : faisabilité, urbanisme, et ce que les Bâtiments de France accepteront. »
(+5 mots). La phrase est juste dans tous les cas : en abords de monument historique, l'avis de
l'architecte des Bâtiments de France conditionne le permis, et la visite sert à l'anticiper.
Au vrai projet, si la patronne a un exemple réel, l'ajouter à la fiche de l'article :
`<dt>Permis</dt><dd>accordé au premier dépôt</dd>` (client).

## FIX-3 · moyen · la matière sans pierre, et l'alcôve de musée

**Quoi.** `images/alcove-*.webp` est la même photo qu'au tour 1 : une niche dans un mur de béton
gravé de traits, éclairée par le haut, avec une chaise miniature. Seule la légende a changé
(« Niche d'éclairage, tablette de chêne »). Deux niches sur quatre images, et **aucune pierre**
dans une section intitulée « La chaux, la pierre, et rien de plus »
(`captures/d-serie-06-y2937.webp`, `d-serie-07-y3524.webp`).

**Où.** `index.html` l. 122.

**Comment.** Remplacer l'alcôve par une photo libre de **mur de moellons calcaires rejointoyé à
la chaux** (joints beurrés, pierre blonde, lumière rasante), cadrage vertical 2:3. Légende à
nombre de mots égal : « **Calcaire de pays**, joints beurrés à la chaux ». Alt : « Mur de
moellons calcaires, joints beurrés à la chaux, lumière rasante ». Garder la classe `m-alcove`
(ou la renommer `m-pierre` dans `index.html` et `calade.src.css` l. 122 et l. 132).

## FIX-4 · moyen · le sommaire, moment signature : l'image ne doit pas cacher le titre

**Quoi.** (a) L'image flottante tourne encore de ± 6° : `rotate(6deg)` mesuré
(`captures/d-sommaire-survol-titre.webp`). Le tour 1 demandait 0. (b) En mode « curseur », le kit
pose l'image à 170 px à droite du pointeur. Comme on survole un titre par sa gauche, l'image
tombe sur le titre : curseur sur « La grange Berthier » à x = 352, image à x 266-554, titre à
x 172-1056 ; on lit « La g… hier » (`d-sommaire-survol-1.webp` : « Le mas d… e »). (c) Le mas et
la maison de la rue Basse ne mènent nulle part (reste du FIX-10 c du tour 1).

**Où.** `gestes.js` l. 656 (`rot`), l. 678-681 (`pointermove`) ; `index.html` l. 66
(`data-follow-list`), l. 72-73, l. 90-91.

**Comment.**
1. Dans le kit, `gestes.js`, lire deux options sur la liste :
   ```js
   const inclinaison = parseFloat(liste.dataset.followTilt ?? "6");
   const colonne = parseFloat(liste.dataset.followX ?? "NaN"); // fraction de la largeur de la liste
   ```
   Dans le `pointermove` : si `colonne` est un nombre, `x(r.left + colonne * r.width)` (avec
   `r = liste.getBoundingClientRect()`), sinon le calcul actuel ; et
   `rot(gsap.utils.clamp(-inclinaison, inclinaison, …))`.
2. Calade, l. 66 : `data-follow-list="curseur" data-follow-x="0.66" data-follow-tilt="0"`.
   À 1440 px, l'image (256 px) se pose entre x ≈ 810 et 1066 : dans le blanc entre la fin des
   titres (≤ 720 px) et le lieu (≥ 1130 px). Elle suit le curseur en hauteur, droite, sans
   rien cacher.
3. Puis retirer de l'inline (l. 216-217) le correctif `borderRadius`, et exposer aussi
   `data-follow-radius` dans le kit (l. 651) pour que le prochain projet n'ait pas à le refaire.
4. (c) Envelopper l'image de chaque entrée ouverte (l. 72 et l. 90) dans
   `<a href="#" aria-label="Le chantier du mas de la Roque">…</a>` (et de même pour la rue
   Basse), annotation « page de chantier à construire » : aucun mot visible en plus.

À signaler dans « Retours sur le plugin » : (1) et (3) viennent du kit.

## FIX-5 · moyen · les légendes de la matière disparaissent sur téléphone

**Quoi.** Sous 900 px, la grille `.matiere` étire chaque figure à la hauteur de sa ligne,
l'image prend `height: 100 %`, la légende est poussée sous la figure, et `overflow: hidden` la
coupe. Mesuré à 375 px : figure de la lumière 220-490 px, légende 500-540 ; enduit, figure
510-772, légende 781-802. « Midi en décembre, fenêtre plein sud », « Enduit chaux aérienne,
trois passes, taloché fin » et « Niche d'éclairage » ne se lisent pas
(`captures/m-matiere.webp`). C'est une régression du FIX-15 du tour 1.

**Où.** `calade.src.css` l. 119 (bloc `@media (max-width: 899px)`), l. 124-125.

**Comment.** l. 119 : ajouter `align-items: start;` à `.matiere` sous 900 px (comme sur
ordinateur, l. 127). Si l'on veut garder des images de même hauteur côte à côte, mettre plutôt
`overflow: hidden` sur l'image et non sur la figure :
`.matiere figure { overflow: visible } .matiere img { aspect-ratio: 2 / 3; height: auto }`.
Recompiler `calade.css`, vérifier les trois légendes à 375 × 812.

## FIX-6 · moyen · le mas porte du PVC

**Quoi.** `images/mas-900.webp` : la porte-fenêtre à côté du volet bleu est une menuiserie
blanche à profil épais, du PVC ; une descente d'eau en PVC blanc longe la façade à droite
(`captures/detail-mas-menuiserie-pvc.webp`). Aucun architecte du patrimoine ne montrerait ça
comme une réalisation. Et le texte dit « Toiture reprise en tuiles canal de réemploi » sur une
photo où l'on ne voit pas le toit (`captures/d-sommaire-ouvert-mas.webp`). Vue deux fois.

**Où.** `index.html` l. 68 (`data-follow-img`), l. 72 (image et alt), l. 73.

**Comment.** Photo libre d'un mas en moellons calcaires où l'on voit **le toit de tuiles canal
et sa génoise**, menuiseries et volets bois peints, sans PVC ni climatiseur. Verticale 2:3
(900 × 1350). Garder le texte l. 73 s'il correspond à la photo. Alt réécrit (« Mas en calcaire,
toit de tuiles canal à génoise, volets de bois peints »). Recompresser (voir FIX-15).

## FIX-7 · moyen · la grange vue quatre fois

**Quoi.** `grange-article-*.webp` sert de vignette « À la une » (l. 56), d'image flottante
(l. 77), de grande image de l'entrée ouverte (l. 81) et de photo de l'article (l. 101). Au
tour 1, c'était le reproche fait à la bergerie ; le FIX-2 du tour 1 demandait aussi
« l'intérieur, la pièce où l'on vit ».

**Où.** `index.html` l. 56, l. 77, l. 81.

**Comment.** Une photo libre d'**intérieur sous voûte de pierre** (grande pièce chaulée, voûte en
berceau, sol de terre cuite ou de pierre, une table, une baie vitrée au fond) : c'est « la pièce
où l'on vit » de la citation. L'utiliser pour l. 56 (vignette), l. 77 et l. 81 (sommaire) ; garder
l'extérieur au soleil couchant pour l'article seul. Alt d'après la photo. Le texte de l'entrée
(« Grange agricole devenue maison, voûte gardée. ») colle aux deux.

## FIX-8 · moyen · « combien, en vrai » : le total

**Quoi.** La phrase « Pour 300 000 € de travaux, le suivi revient à 32 400 € TTC. » est juste,
mais Claire veut le coût de l'architecte, pas d'une ligne. Elle doit additionner elle-même le
permis et le suivi pour comparer avec un maître d'œuvre.

**Où.** `index.html` l. 143.

**Comment.** « Architecte obligatoire au-delà de 150 m². Pour 300 000 € de travaux : dès 5 760 €
pour le permis, 32 400 € pour le suivi, soit au moins 38 160 € TTC. » (+7 mots ; 4 800 × 1,2
= 5 760 ; 27 000 × 1,2 = 32 400 ; total 38 160). À faire valider par le client (règle
commerciale).

## FIX-9 · léger · l'encart du portrait

**Quoi.** `.portrait-texte` prévoit `margin-top: 55%` (`calade.src.css` l. 152) pour que le texte
chevauche le bas de la photo ; la classe `md:mt-0` de `index.html` l. 153 l'écrase (couche
utilitaires) : marge mesurée 0 px. Le texte reste en haut, et son fond chaux découpe une marche
dans le coin haut-gauche de la photo (`captures/d-serie-09-y4699.webp`).

**Où.** `index.html` l. 153 ; `calade.src.css` l. 152.

**Comment.** l. 153 : `class="portrait-texte mt-8 md:mt-0 md:self-end"` ; l. 152 : retirer
`margin-top: 55%` et garder le fond et le `padding`. L'encart mord alors le coin **bas**-gauche
de la photo, comme un encart de revue. Recompiler.

## FIX-10 · léger · un seul nom pour l'action

**Quoi.** « Nous écrire » (en-tête), « Faire visiter votre bâtisse » (couverture, barre mobile),
« Demander la visite » (honoraires, formulaire). Claire ne sait pas si c'est la même chose.

**Où.** `index.html` l. 53, l. 202.

**Comment.** l. 53 : « Demander la visite → » (la ligne « Visite sur place : 240 € TTC. » dessous
lève l'ambiguïté de « faire visiter ») ; l. 202 : « Demander la visite · 240 € ». L'en-tête garde
« Nous écrire ». −2 mots.

## FIX-11 · léger · le premier écran à 375 × 667

**Quoi.** À 375 × 667, « Visite sur place : 240 € TTC. » est coupée par le bas de l'écran
(`captures/m-375x667-premier-ecran.webp`). Et sous 900 px, la légende « Couverture : maison de la
rue Basse… » se colle sous le prix, dans le même gris : on la lit comme une deuxième information.

**Où.** `calade.src.css` l. 68 (`.couverture-photo`), l. 71 (bloc mobile).

**Comment.** l. 68 : `height: clamp(14rem, 36svh, 26rem)` (gagne environ 27 px à 667 de haut).
l. 71 : ajouter `.couverture .legende-cote { display: none; }` sous 900 px (l'information est
reprise au sommaire). Vérifier à 375 × 667 et 360 × 740.

## FIX-12 · léger · textes alternatifs

**Quoi.** l. 48 : « Escalier enduit à la chaux blanche qui monte vers une fenêtre » : il n'y a pas
de fenêtre sur la photo, mais une jarre sur le palier.

**Où.** `index.html` l. 48 ; et les alts de FIX-1, FIX-3, FIX-6, FIX-7.

**Comment.** l. 48 : « Escalier massif enduit à la chaux blanche, une jarre de terre sur le
palier ». Réécrire les autres d'après les photos retenues.

## FIX-13 · léger · cibles tactiles

**Quoi.** À 375 px, le lien du téléphone fait 105 × 18 px et « Haut de page » 80 × 15 px : sous les
24 px du minimum WCAG 2.2.

**Où.** `index.html` l. 178, l. 198.

**Comment.** l. 178 : `class="lien inline-block py-2"` ; l. 198 : `class="underline inline-block py-3"`.

## FIX-14 · léger · client · ce qui bloque 90 (pas 85)

**Quoi.** Tant que les médias sont empruntés, « Images » plafonne vers 12-13 et « Preuves » vers 8.

**Où.** Toute la page ; pied de page l. 197.

**Comment.** À demander au vrai client : photos de ses chantiers (la grange, un mas, une maison de
village, quatre détails de matière dont une pierre) ; un portrait fait à l'atelier ou sur un
chantier calcaire ; deux avis signés avec nom, lieu, année et accord écrit ; le vrai nombre de
bâtisses depuis 2009 ; un exemple réel d'accord des Bâtiments de France ; pour les mentions
légales, le numéro d'inscription au tableau de l'Ordre (conseil régional PACA), le SIRET et
l'assureur de responsabilité professionnelle.

## FIX-15 · léger · poids des images

**Quoi.** `grange-article-1800.webp` 444 Ko, `enduit-1800.webp` 321 Ko, `portrait-2000.webp`
262 Ko, `niche-1400.webp` 236 Ko ; `mas-900.webp` 191 Ko pour 900 px.

**Où.** `images/`.

**Comment.** `cwebp -q 68` sur ces cinq fichiers (et les nouvelles photos) ; viser moins de
250 Ko pour les 1800-2000 px, moins de 200 Ko pour les 1400, moins de 120 Ko pour les 900.
Contrôler à l'œil la grange au soleil couchant (dégradés du ciel).
