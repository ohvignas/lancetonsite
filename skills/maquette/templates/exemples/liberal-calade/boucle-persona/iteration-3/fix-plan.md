# Boucle persona, tour 3 : ce qui reste

Page : exemple « Atelier Calade » · 4 novembre 2026 · note **80 / 100**, seuil 85.
Dernier tour : ce plan ne déclenche pas de 4ᵉ tour. Les FIX à **0 $** se corrigent avant de
présenter ; les FIX **client** vont dans « Ce qui manque encore ».
Budget IA : **0 €**. Aucune génération proposée.

**Budget de mots.** 387 mots aujourd'hui (cible magazine 320-390). Ce plan : FIX-4 (−1),
FIX-5 (−1), FIX-6 (+1), le reste à nombre égal. **Après le plan : ≈ 386 mots.** Recompter
avec le script de `conventions.md` § 11.

| FIX | Gravité | Coût | Résumé |
|---|---|---|---|
| FIX-1 | majeur | 0 $ | Après la citation, l'en-tête revient avec le nom et les liens en blanc sur chaux ; sur téléphone, un retour en haut laisse toute la couverture en fond nuit |
| FIX-2 | moyen | 0 $ | Le mas ouvert perd son toit au recadrage 3:2, sous « Toiture reprise en tuiles canal » |
| FIX-3 | moyen | 0 $ | Le mas et la maison du Passage ne mènent nulle part (signature incomplète) |
| FIX-4 | moyen | 0 $ | Trois phrases que la photo dément : « Bâtie sur l'arche », « sous les combles », « taloché fin » |
| FIX-5 | moyen | 0 $ · client pour valider | « 300 000 € de travaux » sans HT, et un minimum présenté comme un prix |
| FIX-6 | moyen | 0 $ (photo libre) · client pour le définitif | La même grange quatre fois |
| FIX-7 | léger | 0 $ | Portrait : l'encart découpe une encoche vide dans la photo |
| FIX-8 | léger | 0 $ | Deux veuves : « signer », « vit. » |
| FIX-9 | léger | 0 $ (photo libre) | Matière : niche en ogive (marocaine) et lumière en noir et blanc, hors direction photo |
| FIX-10 | léger | 0 $ | Poids : cinq images entre 190 et 390 Ko |
| FIX-11 | léger (bloque 90, pas 85) | client | Photos des vrais chantiers, la grange de l'intérieur, portrait sur calcaire, avis signés, nombre de bâtisses, Ordre, mentions légales |

---

## FIX-1 · majeur · le fond nuit qui déborde

**Quoi.** Le geste de fond du kit ne change la couleur du `body` qu'en **entrant** dans une
section `data-bg`. Ici seules le portrait (chaux), la citation (nuit) et le formulaire
(chaux) en ont. Deux effets :
1. Sur ordinateur comme sur téléphone, quand la citation est active et qu'on remonte d'un
   cran, l'en-tête revient sur son fond chaux avec « Atelier Calade », « Réalisations »,
   « Honoraires » en `rgb(243, 242, 238)` : invisibles (`captures/b-entete-sur-citation.webp`).
2. Sur téléphone (pas de défilement doux), toucher le nom de l'atelier ou la barre d'état
   depuis la citation saute en haut sans repasser par le portrait : la couverture reste en
   fond nuit, le nom disparaît, « Visite sur place : 240 € TTC. » ne se lit plus
   (`captures/m-fond-apres-clic-logo.webp`, `m-fond-saut-grange.webp`).

**Où.** `calade.src.css` l. 54 (`.entete`) ; `index.html` l. 41, 62, 98, 116, 127 (sections
sans `data-bg`) ; cause dans le kit, `gestes.js` l. 614-619.

**Comment.**
1. `calade.src.css` l. 54 : ajouter `color: var(--color-encre);` à `.entete` (l'en-tête est
   toujours sur chaux, il ne doit jamais hériter du `body`).
2. `index.html` : ajouter `data-bg="#ebeae5" data-fg="#191b18"` à `#couverture` (l. 41),
   `#sommaire` (l. 62), `#grange` (l. 98), `#matiere` (l. 116), `#honoraires` (l. 127). Toute
   position de la page est alors couverte par une section qui pose son fond, après un saut
   comme au défilement.
3. Recompiler `calade.css`. Vérifier à 375 × 812 : défiler jusqu'à la citation, remonter
   d'un cran, toucher « Atelier Calade » : fond chaux, nom lisible. Et à 1440 : l'en-tête
   lisible au-dessus de la citation.

À signaler dans « Retours sur le plugin » : dans `gestes.js` l. 614-619, une page qui n'a des
`data-bg` que sur quelques sections garde le dernier fond après un saut. Le kit devrait soit
remettre le fond par défaut au `onLeaveBack` de la première section `data-bg` et au
`onLeave` de la dernière, soit exiger `data-bg` sur toutes les sections dès qu'une en a un ;
et `GESTES.md` devrait dire que l'en-tête fixe doit poser sa propre couleur.

## FIX-2 · moyen · le toit du mas

**Quoi.** `.entree-corps img` est en `aspect-ratio: 3 / 2; object-fit: cover`, centré : sur la
photo verticale du mas, le haut (génoise, tuiles) est coupé. La phrase dessous parle de la
toiture (`captures/b-sommaire-ouvert-1.webp`, `m-sommaire-ouvert-mas.webp`).

**Où.** `index.html` l. 72 ; `calade.src.css` l. 102.

**Comment.** l. 72 : ajouter `style="object-position: 50% 12%"` à l'image du mas (ou une
classe `.cadre-haut { object-position: 50% 12% }` dans `calade.src.css` après l. 102). Le
cadre garde alors la génoise et les fenêtres de l'étage. Contrôler à 1440 et 375.

## FIX-3 · moyen · deux entrées sans suite

**Quoi.** La fiche de la composition : « chaque entrée fait apparaître son image **et mène à
sa page** ». Seule la grange a « Lire le chantier ». Déjà demandé au tour 2 (FIX-4 c).

**Où.** `index.html` l. 72-73 et l. 90-91.

**Comment.** Envelopper l'image de l'entrée ouverte dans un lien, sans mot visible en plus :
`<a href="#" aria-label="Le chantier du mas de la Roque">…image…</a>` (l. 72) et
`<a href="#" aria-label="Le chantier de la maison du Passage">…image…</a>` (l. 90), avec un
commentaire « page de chantier à construire ». Mieux, si le budget de mots le permet après
FIX-4 et FIX-5 : « Lire le chantier » à la fin des deux phrases, comme pour la grange
(+3 mots chacune : ne le faire que si le recomptage reste ≤ 390).

## FIX-4 · moyen · trois phrases que la photo dément

**Quoi.**
- l. 91 « Bâtie sur l'arche du village » : sur la photo, on voit le ciel au-dessus de
  l'arche ; la maison est à côté (`captures/b-sommaire-ouvert-3.webp`).
- l. 73 « quatre chambres sous les combles » : sous une tuile canal à 30 %, les combles
  d'un mas ne se vivent pas, et la photo montre des fenêtres d'étage sous la génoise. C'est
  le genre de phrase qu'un confrère relève.
- l. 121 « Enduit chaux aérienne, trois passes, taloché fin » : la surface photographiée
  paraît lissée, lustrée, sans le grain d'un taloché (`captures/b-serie-05-y3369.webp`).

**Où.** `index.html` l. 73, 91, 121.

**Comment.**
- l. 91 : « Adossée à l'arche du village ; son escalier fait la couverture. » (0 mot).
- l. 73 : « Toiture reprise en tuiles canal de réemploi, quatre chambres à l'étage. » (−1).
- l. 121 : « **Enduit chaux aérienne**, trois passes, lissé » (−1). Ou garder « taloché fin »
  et changer la photo pour un enduit taloché à grain visible (photo libre, 0 $).

## FIX-5 · moyen · « en vrai », jusqu'au bout

**Quoi.** l. 143 : « Pour 300 000 € de travaux : 5 760 € de permis et 32 400 € de suivi, soit
38 160 € TTC. » Le calcul suppose 300 000 € **HT** (9 % × 300 000 = 27 000 € HT = 32 400 €
TTC) ; Claire pense en TTC, et pour 300 000 € TTC le suivi tombe à 27 000 € TTC. Et le permis
est « dès 5 760 € » : le total est un minimum.

**Où.** `index.html` l. 143.

**Comment.** « Architecte obligatoire au-delà de 150 m². Pour 300 000 € HT de travaux :
5 760 € de permis, 32 400 € de suivi, au moins 38 160 € TTC. » (+1 mot). À faire valider par
le client (règle commerciale).

## FIX-6 · moyen · la grange quatre fois

**Quoi.** Vignette « À la une » (l. 56), image de survol (l. 77), entrée ouverte (l. 81) :
recadrage serré de la photo de l'article (l. 101). Le recadrage grossit en plus deux tuyaux
gris qui sortent du mur, une lanterne de jardin et une assiette décorative
(`captures/b-sommaire-ouvert-2.webp`).

**Où.** `index.html` l. 56, 77, 81.

**Comment.** Sans photo d'intérieur voûté crédible en banque libre, réduire les répétitions
à 0 $ : (a) l. 56, vignette « À la une » : retirer la vignette (le lien texte suffit) ou y mettre un
détail de matière déjà présent, comme `images/pierre-700.webp` ; (b) l. 77 et l. 81 :
garder le recadrage, mais le prendre plus bas et à droite, sur les portes de bois et la terre
cuite, sans les tuyaux ni l'assiette (`object-position` ou nouveau recadrage de
`grange-article-1800.webp`). On passe de quatre à deux vues de la même façade. Au vrai
projet : la grange de l'intérieur, « la pièce où l'on vit » de la citation (client).

## FIX-7 · léger · l'encoche du portrait

**Quoi.** `.portrait-texte` occupe les colonnes 1 à 4, la photo commence à la colonne 4 :
le fond chaux de l'encart découpe 95 px de photo (x 385-480, y 648-877 à 1440) alors que le
titre s'arrête à x 355. On voit un rectangle manquant, pas un texte posé sur la photo
(`captures/b-serie-07-y4716.webp`).

**Où.** `calade.src.css` l. 151-152.

**Comment.** Au choix : (a) photo en colonnes 5 à 13 (`grid-column: 5 / 13`, l. 151) et
encart en 1 à 5 sans chevauchement ; ou (b) garder le chevauchement mais le remplir :
`padding: 2rem 2.5rem 0 0` et `grid-column: 1 / 6` pour que la fin de « Hélène Garcin, »
entre dans la photo. (a) est le plus sûr. Recompiler, vérifier à 1440 et 1280.

## FIX-8 · léger · les veuves

**Quoi.** « Ce que coûte un architecte, avant de / signer » (`b-serie-06-y4042.webp`) ;
« C'est devenu la pièce où l'on / vit. » » (`b-serie-08-y5390.webp`).

**Où.** `calade.src.css` l. 26 (titres) et l. 156 (citation) ; `index.html` l. 128
(`max-w-[16ch]`).

**Comment.** l. 26 : ajouter `text-wrap: balance;` aux titres ; l. 156 : idem pour
`.citation blockquote p`. Si « signer » reste seul, passer `max-w-[16ch]` à `max-w-[18ch]`
(l. 128).

## FIX-9 · léger · la niche en ogive et la lumière en noir et blanc

**Quoi.** La niche en arc brisé (`niche-*.webp`) est une forme marocaine ou néogothique, pas
provençale. La lumière (`lumiere-*.webp`) est la seule photo en noir et blanc de la page, dans
une pièce en chantier (fil électrique qui pend).

**Où.** `index.html` l. 119-120.

**Comment.** Photos libres, même cadrage 2:3 et 3:4 : une niche en plein cintre ou une niche
droite à tablette dans un mur chaulé ; une tache de soleil d'hiver sur un mur chaulé, en
couleur. Alts réécrits. À défaut, retirer la niche (trois images suffisent à la section) et
garder la lumière.

## FIX-10 · léger · poids des images

**Quoi.** `grange-article-1800.webp` 386 Ko, `enduit-1800.webp` 265 Ko, `portrait-2000.webp`
241 Ko, `niche-1400.webp` 224 Ko, `pierre-1100.webp` 222 Ko, `mas-900.webp` 193 Ko.

**Où.** `images/`.

**Comment.** `cwebp -q 66` (ou `-size` ciblé) : moins de 250 Ko au-delà de 1 800 px, moins de
180 Ko pour 1 100-1 400 px, moins de 120 Ko pour 900 px. Contrôler à l'œil le ciel de la
grange et le grain de la pierre.

## FIX-11 · léger · client · ce qui bloque 90 (pas 85)

**Quoi.** Avec des médias empruntés, « Images » plafonne vers 12-13 et « Preuves » vers 8.

**Où.** Toute la page ; pied de page l. 197 ; formulaire l. 181-190.

**Comment.** À demander à la patronne : photos de ses chantiers (la grange, de l'intérieur
sous la voûte ; un mas ; la maison de village), quatre détails de matière pris chez elle ; un
portrait à l'atelier ou devant un mur calcaire (pas de schiste) ; deux avis signés avec nom,
lieu, année et accord écrit ; le vrai nombre de bâtisses depuis 2009 ; un exemple réel de
permis accordé avec l'avis des Bâtiments de France (`<dt>Permis</dt><dd>…</dd>` dans la fiche
de l'article) ; pour les mentions légales, le numéro d'inscription au tableau de l'Ordre
(conseil régional PACA), le SIRET, l'assureur de responsabilité professionnelle, et la phrase
sur l'usage des données du formulaire.
