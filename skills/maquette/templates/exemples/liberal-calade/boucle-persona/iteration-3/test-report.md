# Boucle persona, tour 3 : rapport de test

- **Date** : 4 novembre 2026
- **Page testée** : exemple « Atelier Calade », http://127.0.0.1:4331/liberal-calade/
  (`skills/maquette/templates/exemples/liberal-calade/index.html`, `calade.css`, `gestes.js`)
- **Navigateur** : Google Chrome piloté par Playwright (hors bac à sable pour joindre le
  serveur local), 1440 × 900, 375 × 812, 375 × 667, 360 × 740 ; tactile simulé sur mobile.
- **Regard indépendant : les rapports du relecteur n'ont pas été lus.** Lus : le brief,
  `commun/boucle-persona.md`, `niveau-agence.md` § 6, `conventions.md` § 6 et § 11,
  `compositions.md` § 3, et le seul `iteration-2/fix-plan.md`. Ni `NOTES.md` ni les autres
  fichiers des tours précédents.
- **Rien n'a été modifié** dans la page. Scripts de test rangés hors du dépôt.

Je suis Hélène Garcin, architecte à L'Isle-sur-la-Sorgue. Puis je suis Claire, 54 ans,
Lyonnaise, qui vient de signer le compromis d'une grange à Lagnes, et qui se demande ce que
coûte un architecte et si elle va perdre la main sur sa maison.

---

## 1. Les cinq premières secondes

**Ordinateur, 1440 × 900** (`captures/b-00-0s6-premier-ecran-1440.webp` à 0,6 s,
`captures/b-01-premier-ecran-1440.webp` à 3 s). Folio « Hiver 2026 · L'Isle-sur-la-Sorgue ·
64 bâtisses depuis 2009 · 2 chantiers ouverts au printemps 2027 » : c'est une vraie
information, pas un « N° 01 » décoratif. Le titre « Garder la pierre, *ouvrir* la lumière. »
en Bodoni chevauche la photo verticale de l'escalier chaulé. Dessous : qui nous sommes, où,
quoi (« mas, granges et maisons de village du Vaucluse »), le bouton « Demander la visite → »
et « Visite sur place : 240 € TTC. ». En cinq secondes, Claire sait ce qu'on vend, où, à quel
prix et quoi faire. Rien ne saute entre 0,6 s et 3 s.

**Téléphone, 375 × 812** (`captures/m-premier-ecran-375x812.webp`) : titre (y 400-497),
bouton (609-666), prix (678-698), tout dans l'écran. **375 × 667**
(`captures/m-premier-ecran-375x667.webp`) : prix à y 626-646, visible ; la légende de
couverture est masquée sous 900 px. **360 × 740** : pas de débordement horizontal
(`scrollWidth` = 360).

Ce que le patron remarque : la couverture ne montre pas une pierre (tout est enduit blanc),
sous un titre qui commence par « Garder la pierre ». C'est beau, c'est de la chaux, ça passe.

## 2. Le défilement complet

Série de 12 captures à 1440 × 900 (`captures/b-serie-00-y0.webp` à
`captures/b-serie-11-y7412.webp`), série de 10 à 375 × 812 (`captures/m-serie-00.webp` à
`m-serie-09.webp`), pleines pages `captures/b-pleine-page-1440.webp` et
`captures/m-pleine-page-375.webp`. Défilement rapide à la molette
(`captures/b-rapide-pendant.webp`, `b-rapide-apres.webp`) : rien ne clignote, rien ne reste
vide.

Ordre : couverture → sommaire (3 entrées) → article de la grange (photo pleine hauteur,
colonne étroite) → la matière (4 photos décalées) → honoraires → portrait → citation sur fond
nuit → « Racontez-nous votre bâtisse ». C'est le rythme de la composition magazine, colonnes
jamais deux fois identiques. 8 sections, 8,7 écrans.

**Le moment signature, le sommaire** (`captures/b-sommaire-survol-1.webp`, `-2`, `-3`).
Mesuré au survol de chaque titre, curseur à 8 %, 30 % et 55 % de la ligne : l'image flottante
reste à x 810-1066, **droite** (`matrix(1, 0, 0, 1, …)`, aucune rotation), **angles droits**
(`border-radius: 0px`), dans le blanc entre la fin des titres (x ≤ 654) et le lieu
(x ≥ 1134). Elle suit le curseur en hauteur. On lit chaque titre en entier. C'est réussi :
c'est enfin le geste d'une revue.

Ouverture des entrées (`captures/b-sommaire-ouvert-1.webp`, `-2`, `-3`) : grande image 3:2,
une ligne de texte. L'image flottante se range à l'ouverture. Survol d'une autre entrée
pendant qu'une est ouverte (`captures/b-sommaire-ouvert-plus-survol.webp`) : l'image passe
sous la ligne de texte ouverte (texte y 588-614, image dès y 624), sans la cacher.

Deux reproches :

- **Le mas ouvert perd son toit.** Le recadrage 3:2 centré coupe le haut de la photo : on
  voit le mur et les volets, pas la génoise, alors que la phrase dessous dit « Toiture reprise
  en tuiles canal de réemploi » (`captures/b-sommaire-ouvert-1.webp`, et sur téléphone
  `captures/m-sommaire-ouvert-mas.webp`). Au survol (format 4:5) le toit est là.
- **Deux entrées sur trois ne mènent nulle part.** Seule la grange a « Lire le chantier »
  (`#grange`). Le mas et la maison du Passage s'ouvrent et s'arrêtent. La fiche de la
  composition dit « chaque entrée fait apparaître son image **et mène à sa page** ».

**Le portrait** (`captures/b-serie-07-y4716.webp`) : l'encart de texte est passé en bas à
gauche, mais son fond chaux découpe une encoche vide de 95 px dans le coin bas-gauche de la
photo (x 385-480, y 648-877) : le titre « Hélène Garcin, architecte » s'arrête à x 355, il
n'y a rien dans l'encoche. On croit à une photo mal détourée, pas à un encart de revue.

**La matière** (`captures/b-serie-04-y2695.webp`, `b-serie-05-y3369.webp`) : il y a enfin de
la pierre (« Calcaire de pays, joints beurrés à la chaux »), et c'est la bonne : moellons
blonds, joints beurrés qui mangent la pierre, éclats de tuile dans le mortier. Bien.

Typographie : deux veuves. « Ce que coûte un architecte, avant de / **signer** »
(`captures/b-serie-06-y4042.webp`) et « C'est devenu la pièce où l'on / **vit. »** »
(`captures/b-serie-08-y5390.webp`).

## 3. Le parcours de Claire jusqu'à la visite

1. Clic sur « À la une : La grange Berthier, Lagnes » : arrivée sur l'article, titre à
   160 px du haut (`captures/b-clic-a-la-une.webp`).
2. En remontant, l'en-tête réapparaît ; clic sur « Honoraires » : titre à 160 px
   (`captures/b-nav-honoraires.webp`).
3. **Les chiffres**, refaits à la main :
   - visite 240 € TTC, déduite si l'on continue ;
   - « dès 5 760 € TTC » pour l'esquisse et le permis = 4 800 € HT × 1,2. Juste ;
   - 9 % du montant HT des travaux ;
   - « Pour 300 000 € de travaux : 5 760 € de permis et 32 400 € de suivi, soit 38 160 € TTC. »
     9 % × 300 000 = 27 000 € HT, × 1,2 = 32 400 € TTC ; 5 760 + 32 400 = 38 160. Juste,
     **si les 300 000 € sont HT**. Claire pense son budget toutes taxes comprises : pour
     300 000 € TTC de travaux (250 000 € HT), le suivi revient à 27 000 € TTC. Il faut écrire
     « 300 000 € HT ». Et le « dès » du permis a disparu dans la phrase : 38 160 € est un
     minimum, pas un prix.
   - Les chiffres concordent d'un bloc à l'autre : 240 € dans la couverture, le tarif, le
     bloc final et la barre mobile ; 180 m² dans le sommaire et la fiche de l'article.
   - « Architecte obligatoire au-delà de 150 m² » : juste (surface de plancher, permis de
     construire d'un particulier). C'est l'argument contre le maître d'œuvre, il est là.
   - Les Bâtiments de France : « 1 h 30 sur place : faisabilité, urbanisme, et ce que les
     Bâtiments de France accepteront. » Juste et sans promesse. La question de Claire a sa
     réponse.
4. « Demander la visite → » sous les honoraires : arrivée au formulaire
   (`captures/b-formulaire.webp`).
5. Envoi vide : trois erreurs en clair (« Indiquez votre nom. », « Indiquez la commune de la
   bâtisse. », « Un téléphone à 10 chiffres ou un e-mail. »), focus sur « Prénom et nom »
   (`captures/b-formulaire-erreurs.webp`).
6. Données de test (Claire Test, Lagnes, claire.test@example.org, « Achat en cours », « Grange
   de 200 m², toit à reprendre, on veut y vivre. ») : « C'est noté, Claire. Hélène vous
   recontacte sous 48 heures pour fixer la visite. », bouton désactivé
   (`captures/b-formulaire-confirmation.webp`). Rien n'est envoyé.
7. Téléphone : la barre « Demander la visite · 240 € » apparaît après la couverture
   (`captures/m-barre-action.webp`) et disparaît sur le formulaire et le pied de page.

Une seule étiquette pour l'action : « Demander la visite » partout, « Nous écrire » dans
l'en-tête seulement. Claire ne se demande plus si ce sont deux choses.

**Le défaut trouvé en chemin, sur téléphone.** Claire lit la citation (fond nuit), remonte
d'un geste, l'en-tête revient, elle touche « Atelier Calade » (retour en haut). Résultat
(`captures/m-fond-apres-clic-logo.webp`) : **toute la couverture passe en fond nuit**, le
nom « Atelier Calade » devient blanc sur l'en-tête chaux, donc invisible, et « Visite sur
place : 240 € TTC. » (gris sur nuit) ne se lit plus. Même chose pour tout saut vers le haut
depuis la citation (`captures/m-fond-saut-grange.webp`, `captures/m-portrait.webp` : bande
nuit au-dessus du portrait ; mesures : `body` en `rgb(22, 29, 26)` à y = 0). Cause : le geste
de fond du kit (`gestes.js` l. 614-619) ne change la couleur du `body` qu'en entrant dans une
section `data-bg` ; couverture, sommaire, article, matière et honoraires n'en ont pas, donc
après un saut le fond reste celui de la citation. Sur ordinateur, Lenis fait défiler en
douceur et repasse par le portrait : le fond revient (`captures/b-fond-apres-clic-logo.webp`,
`b-fond-apres-touche-debut.webp`). Sur téléphone, le saut est immédiat. Le geste « toucher la
barre d'état pour remonter » de l'iPhone fait la même chose.

**Et sur ordinateur aussi, l'en-tête.** Même cause, autre effet : dès que la citation a mis
le `body` en nuit (texte `rgb(243, 242, 238)`), il suffit de remonter d'un cran pour que
l'en-tête revienne, sur son fond chaux, avec « Atelier Calade », « Réalisations » et
« Honoraires » en blanc cassé : invisibles (`captures/b-entete-sur-citation.webp` ; mesuré :
fond de l'en-tête `rgb(235, 234, 229)`, texte `rgb(243, 242, 238)`). L'en-tête hérite de la
couleur du `body` (`calade.src.css` l. 54 ne fixe pas `color`). Seul « Nous écrire » reste
lisible.

## 4. Le clavier

40 tabulations depuis le haut, à 1440 × 900 (`captures/b-clavier-tab01.webp` à
`b-clavier-tab16.webp`). Ordre : « Aller au contenu », logo, Réalisations, Honoraires, Nous
écrire, Demander la visite, À la une, les trois entrées du sommaire, Demander la visite,
téléphone, les cinq champs, le bouton d'envoi, Haut de page, puis on reboucle. **Tout est
atteint, tout est visible au focus** : contour vert 2 px sur les liens et boutons, filet et
fond sur les champs. Entrée ouvre une entrée du sommaire, Tab mène à « Lire le chantier »
(`captures/b-clavier-sommaire-ouvert.webp`). Les liens à l'intérieur des entrées fermées ne
sont pas dans l'ordre de tabulation, c'est normal.

## 5. Le mouvement réduit

`prefers-reduced-motion: reduce`, 1440 et 375 (`captures/b-reduit-premier-ecran.webp`,
`b-reduit-pleine-page.webp`, `m-reduit-premier-ecran.webp`, `m-reduit-pleine-page.webp`) :
page complète, aucun élément visible à opacité < 0,5, aucune erreur. L'image flottante du
sommaire ne s'affiche pas (`b-reduit-sommaire-survol.webp`) ; les entrées s'ouvrent quand
même avec leur grande photo. Correct.

## 6. L'œil du métier

Relu photo par photo, comme la patronne :

| Où | Ce qu'on voit | Verdict du métier |
|---|---|---|
| Couverture | Escalier massif enduit à la chaux, jarre sur le palier | Juste, l'alt aussi désormais |
| Le mas de la Roque | Moellons calcaires, génoise à deux rangs, tuile canal, volets bois bleu pâle | Enfin un mas d'ici, plus de PVC. Mais « quatre chambres **sous les combles** » : sous une tuile canal à 30 %, les combles d'un mas ne se vivent pas, et la photo montre des fenêtres d'étage collées à la génoise. « À l'étage » serait vrai |
| La grange Berthier | Porche voûté au soleil couchant, portes bois rouge, terre cuite | Crédible. Mais c'est **la même photo quatre fois** (vignette À la une, survol, entrée ouverte, article) ; le recadrage serré montre en gros deux tuyaux gris qui sortent du mur, une lanterne de jardin et une assiette décorative |
| Maison du Passage, Joucas | Arche de pierre au-dessus d'une calade, cyprès, volet bleu sur enduit ocre | Le pays est juste. Le texte dit « **Bâtie sur** l'arche du village » : on voit le ciel au-dessus de l'arche, la maison est à côté |
| Matière : niche | Niche **en ogive** dans un enduit, coupe de terre | L'ogive, c'est le Maroc ou le néogothique ; chez nous une niche est en plein cintre ou droite. Sans légende, ça passe, mais l'œil d'architecte accroche |
| Matière : lumière | Rectangles de soleil sur un mur, **en noir et blanc**, un fil électrique qui pend | Seule photo en noir et blanc de la page ; une pièce en chantier |
| Matière : enduit | Courbes enduites, patine verte d'argentique | La légende dit « **taloché fin** » ; la surface paraît lissée, lustrée, sans le grain d'un taloché. Un plâtrier le voit |
| Matière : pierre | Moellons calcaires, joints beurrés | Juste, légende juste |
| Portrait | Femme aux cheveux blancs contre un poteau de chêne, mur de **schiste gris** | Le mur est un schiste ou un grès sombre, pas notre calcaire blond. Provisoire, c'est au client de fournir le vrai |

Mots du métier dans le texte : « chaux-chanvre », « chaux aérienne, trois passes », « joints
beurrés », « tuiles canal de réemploi », « réception », « montant HT des travaux » : justes,
précis, aucun « matériaux nobles ». Aucun « projet ».

## 7. La densité (script de `conventions.md` § 11, 1440 × 900, images chargées, 3 s)

**387 mots · 8 sections · 8,7 écrans.** Détail : saut 3, en-tête 6, couverture 53, sommaire
40 (entrées dépliées), article 55, matière 29, honoraires 89, portrait 27, citation 20,
écrire 54, pied de page 11. Sous les 400 mots et dans la cible magazine (320-390), mais à
3 mots du plafond de la fiche : chaque ajout doit être compensé. Les honoraires (89 mots)
sont le seul bloc au-dessus de 60 mots : trois tarifs en liste plus deux phrases ; la prose
tient en deux phrases, la liste se lit comme un tableau. J'accepte, de justesse.

## 8. Console et ressources

Aucune erreur, aucun avertissement, aucune ressource en échec, sur ordinateur comme sur
téléphone. Poids des images servies : `grange-article-1800.webp` 386 Ko,
`enduit-1800.webp` 265 Ko, `portrait-2000.webp` 241 Ko, `niche-1400.webp` 224 Ko,
`pierre-1100.webp` 222 Ko, `mas-900.webp` 193 Ko (900 px de large).

## 9. Le plan du tour 2, FIX par FIX

| FIX | Résumé | État | Preuve |
|---|---|---|---|
| FIX-1 | Ménerbes en Grèce | **Corrigé** : la cour aux icônes est remplacée par une arche de village calcaire, devenue « Maison du Passage, Joucas ». Reste une phrase fausse : « Bâtie sur l'arche » | `b-sommaire-ouvert-3.webp` |
| FIX-2 | Les Bâtiments de France | **Corrigé** | `b-serie-06-y4042.webp` |
| FIX-3 | Pas de pierre, alcôve de musée | **Corrigé** : mur de moellons à joints beurrés, l'alcôve est partie. La niche en ogive reste | `b-serie-05-y3369.webp` |
| FIX-4 | Sommaire : rotation, image sur le titre, liens | **Partiellement** : (a) rotation 0 et (b) image dans la colonne vide, corrigés (par le script de page, le kit est inchangé) ; angles droits ; (c) le mas et la maison du Passage ne mènent toujours nulle part | mesures § 2, `b-sommaire-survol-*.webp` |
| FIX-5 | Légendes de la matière coupées sur téléphone | **Corrigé** : les trois légendes se lisent | `m-matiere.webp`, `m-matiere-2.webp` |
| FIX-6 | Le mas en PVC, toit invisible | **Corrigé pour la photo** (plus de PVC, toit à génoise visible au survol) ; **le toit disparaît dans l'entrée ouverte** (recadrage 3:2) | `b-sommaire-survol-1.webp`, `b-sommaire-ouvert-1.webp` |
| FIX-7 | La grange vue quatre fois | **Non corrigé** : recadrage serré de la même photo pour la vignette, le survol et l'entrée ouverte. Contrainte connue (aucune photo libre d'intérieur voûté) | `b-01-premier-ecran-1440.webp`, `b-sommaire-ouvert-2.webp` |
| FIX-8 | Le total « en vrai » | **Corrigé**, avec deux nuances : « 300 000 € » sans « HT », et le « dès » perdu | `b-serie-06-y4042.webp` |
| FIX-9 | Encart du portrait | **Partiellement** : l'encart est en bas, mais il découpe une encoche vide dans la photo | `b-serie-07-y4716.webp` |
| FIX-10 | Un seul nom pour l'action | **Corrigé** | § 3 |
| FIX-11 | Premier écran 375 × 667 | **Corrigé** | `m-premier-ecran-375x667.webp` |
| FIX-12 | Textes alternatifs | **Corrigé** (couverture juste, alts réécrits d'après les photos) | `index.html` l. 48, 72, 81, 90, 122 |
| FIX-13 | Cibles tactiles | **Corrigé** : aucune cible sous 24 px à 375 px | mesure § 3 |
| FIX-14 | Ce qui bloque 90 (client) | **Ouvert, client** | — |
| FIX-15 | Poids des images | **Partiellement** : grange 1800 de 444 à 386 Ko, enduit de 321 à 265 Ko ; `pierre-1100` arrive à 222 Ko, le mas reste à 193 Ko | § 8 |
