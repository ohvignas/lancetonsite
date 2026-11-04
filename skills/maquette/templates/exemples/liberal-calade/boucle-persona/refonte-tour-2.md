# Calade, refonte : boucle persona, tour 2

- **Date** : 4 novembre 2026
- **Page testée** : `http://127.0.0.1:4417/liberal-calade/index.html` (`index.html`, `calade.css`, `gestes.js`, `images/`), servie par mon propre `python3 -m http.server 4417` lancé dans `exemples/`, puis arrêté.
- **Regard indépendant** : je n'ai pas lu les rapports du relecteur. J'ai lu `brief.md`, `NOTES.md` (avec sa dernière section), les retours de l'utilisateur du 4 novembre et le plan du tour 1 (`refonte-tour-1.md`, partie 3).
- **Navigateur** : Google Chrome piloté par Playwright 1.58, avec de vrais crans de molette, clics, touchers, tabulations et saisies. Le formulaire n'envoie rien.
- **Captures** : `boucle-persona/refonte-tour-2-captures/` (les chemins ci-dessous sont relatifs à ce dossier).

Je suis Hélène Garcin. J'ai payé 25 000 € pour une page qui se lise comme une revue d'architecture, qui montre la matière et qui dise mes prix. Je la lis aussi comme Claire, 54 ans, cadre à Lyon : elle vient d'acheter une grange dans le Luberon et se demande ce que coûte un architecte, en vrai, à côté d'un maître d'œuvre.

---

# Partie 0 : les corrections du tour 1, une par une

| FIX | Verdict | Ce que j'ai vérifié |
|---|---|---|
| FIX-1 · 802 mots | **Fait, sans marge** | Les crédits du pied tiennent en une ligne (l. 331). Mais le script du § 11 compte **800 mots** en mouvement réduit comme en mouvement permis, et pas 783 comme l'écrit `NOTES.md`. Il n'y a donc plus de pénalité, mais il ne reste aucune marge : un seul mot de plus coûterait 10 points (voir FIX-2 plus bas). |
| FIX-2 · matière | **Fait** | La niche est en plein cintre, avec une jarre vernissée verte et des tomettes. La lumière tombe sur un mur à la chaux, avec des tomettes hexagonales et un tableau de pierre. L'enduit est ocre pâle et lissé. Les trois images sont crédibles pour mon métier (`section-matiere-1440.png`). Une seule réserve : la légende de la lumière (voir FIX-5). |
| FIX-3 · pièce habitée | **Fait, et bien fait** | Le séjour sous la voûte a une porte-fenêtre de chêne, un poêle, des tomettes, un canapé de lin et les vieilles portes ouvertes. Il est à droite de la grande citation à 1440 (`defilement-1440-07-temoignage.png`) et sous elle sur téléphone (`tel-375-temoignage-photo.png`). C'est la meilleure image de la page. |
| FIX-4 · maître d'œuvre | **Fait** | La réponse de la FAQ parle enfin d'argent (« coûte souvent un peu moins »), du diplôme, de l'Ordre, du seuil des 150 m² et de la défense face aux artisans (`faq-ouverte-1440.png`). L'écart chiffré reste au vrai client. |
| FIX-5 · pied de page | **Fait** (dans les limites de l'exemple) | Le pied affiche l'e-mail, les horaires, et « Mentions légales · Instagram » en provisoire, sans lien mort. Aucun téléphone, ce qui respecte la règle (`tel-375-pied.png`). |
| FIX-6 · bouton coupé à 375 × 667 | **À moitié fait** | À 375 × 667, le bouton tient (601 → 658 px). En revanche, la ligne du prix (670 → 690) passe sous l'écran. **À 360 × 740, le bouton est coupé de 9 px** (692 → 749) et le prix n'apparaît pas (`premier-ecran-360x740.png`). C'est un effet du FIX-11 : le h1 ne mord plus sur la photo, ce qui le descend d'environ 38 px. La barre « Demander la visite · 240 € » apparaît dès le premier cran de défilement, ce qui limite le dégât. |
| FIX-7 · sommaire sur téléphone | **Fait** | Sur écran tactile, le mas de la Roque est ouvert avec sa photo (`tel-375-01-sommaire.png`). Sur ordinateur, tout est fermé et l'image suit la liste. |
| FIX-8 · apostrophes, deux-points | **Fait** | Le texte visible ne contient plus aucune apostrophe droite, et le journal pose une insécable avant « : » (« semaine 14 : »). Il reste deux détails : le message de confirmation du formulaire (« C'est noté », l. 431) et la légende verticale de la couverture, où l'apostrophe de « l'année » s'affiche de travers (`legende-verticale-1440.png`). |
| FIX-9 · HT, réserves | **Fait** | Les honoraires affichent « 9 % HT » et « 32 400 € TTC de suivi ». « Jusqu'à la levée des réserves » figure dans l'étape 04 comme dans les honoraires. Il reste « ce que vise la réception » dans la légende de la méthode (l. 147), une tournure bancale. |
| FIX-10 · phrases démenties | **Fait** | « Volets d'origine gardés » correspond à la photo, et le séjour montre une menuiserie de chêne vitrée. Petit écart restant : sur l'image, elle est au fond de la pièce, pas « derrière les portes » (voir FIX-5). |
| FIX-11 · vides, h1 qui mord | **Fait** | Le titre de la matière est remonté, et le collage se lit comme une double page (`page-entiere-reduit-1440.png`). Le h1 mobile ne mord plus sur la photo (marge de 0,75 rem). Effet de bord : le cas 360 × 740 du FIX-6. |
| FIX-12 · lien courant | **À moitié fait** | En descendant, la couverture, le portrait, les témoignages, les questions et le formulaire effacent bien le lien. **En remontant, « Méthode » reste souligné** pendant toute la matière et tout l'article de la grange, jusqu'au sommaire (mesuré tous les 150 px, voir § 9). |
| FIX-13 · enduit « ciment » | **Fait** | Le premier enduit est maintenant blanc cassé chaud, plus gris-vert. Nouvelle remarque de métier sur la même image : voir FIX-5. |
| FIX-14 · client | Inchangé, normal | Vrais chantiers, avis signés, chiffre de 64, Ordre, SIRET, écart de prix, promesse « toute l'année » validée. |

**Bilan** : sur 13 corrections, 11 sont faites et 2 le sont à moitié (FIX-6 et FIX-12). Aucune n'a été bâclée, et les cinq images régénérées sont justes.

---

# Partie 1 : le rapport de test

## 1. Les 5 premières secondes

| Taille | Capture | h1 | Bouton | Prix « 240 € » | Remarque |
|---|---|---|---|---|---|
| 1440 × 900 | `premier-ecran-1440x900.png` | 3 lignes, 104 px, interlettrage 0 | 757 → 814 | visible (826) | Couverture de revue : titre en surimpression, folio, légende verticale. |
| 1280 × 800 | `premier-ecran-1280x800.png` | 3 lignes, 92 px | 657 → 714 | visible (726) | Sain. |
| 768 × 1024 | `premier-ecran-768x1024.png` | 3 lignes, 77 px | 868 → 925 | visible | Photo puis titre, sans vide. |
| 375 × 812 | `premier-ecran-375x812.png` | 3 lignes, 37,5 px | 720 → 777 | visible (789 → 809) | Tout tient, à 3 px du bas. |
| 375 × 667 | `premier-ecran-375x667.png` | 3 lignes | 601 → 658 | **sous l'écran** (670) | Le bouton passe, pas le prix. |
| 360 × 740 | `premier-ecran-360x740.png` | 3 lignes, 36,8 px | **692 → 749, coupé** | **sous l'écran** | Après un cran : `premier-ecran-360x740-apres-un-cran.png`. |

En cinq secondes, Claire sait ce que je fais (une bâtisse de pierre rendue habitable toute l'année), pour qui (les mas, granges et maisons de village), combien (240 € la visite) et quoi faire (demander la visite). Le titre est beaucoup plus fort qu'avant : c'est un bénéfice, et il parle à « votre » bâtisse. Aucun numéro de téléphone n'apparaît dans la barre.

Défaut visible à 1440 et 1280 : dans la légende verticale, « habitée toute l'année » s'affiche « toute l’-  année ». L'apostrophe est tournée et suivie d'un trou (`legende-verticale-1440.png`).

## 2. Le défilement complet (1440, molette, puis rapide)

Captures : `defilement-1440-01-sommaire.png` à `defilement-1440-12-pied.png`, `defilement-1440-matiere-milieu.png`, `defilement-1440-temoignage-milieu.png`, `defilement-rapide-fin-1440.png`, `remontee-1440.png`. Hauteur : 10 323 px, soit 11,5 écrans (13,3 avec les accordéons ouverts).

- **Le sommaire (signature)** : au survol, les titres pâlissent et la photo se pose, droite, dans la colonne vide (`sommaire-survol-3-1440.png`). À l'ouverture d'une entrée, la grande photo prend le relais. Si l'on survole le mas alors que la grange est ouverte, la vignette flottante remonte de 140 px au-dessus du filet, au ras de « 2009. ». Elle ne couvre aucun mot (`sommaire-ouvert-1440.png`).
- **La grange** : grande photo au soleil couchant, titre à droite, fiche « 180 m² · 11 mois ». La revue est là.
- **La matière** : quatre images justes, en collage asymétrique. C'est enfin la section dont je suis fière (`section-matiere-1440.png`).
- **La méthode et les honoraires** : 4 étapes numérotées, puis 3 montants en tableau, un exemple chiffré et un bouton.
- **Le portrait** : Hélène devant un mur de moellons calcaires et un poteau de chêne. Il est crédible.
- **Les témoignages** : le fond nuit arrive net, sans gris boueux. La grande citation et le séjour se répondent, puis viennent deux avis courts.
- **Le journal** : trois cartes datées, un chantier, un conseil et la réglementation. **Les questions et le formulaire** suivent en deux colonnes, puis le grand logotype du pied.
- Rien ne clignote et rien ne saute. Le défilement rapide arrive propre en bas.
- Après un saut instantané (`scrollTo` programmé) de la citation jusqu'au pied, le pied garde le fond nuit. « Haut de page » y devient alors invisible, encre sur nuit (`defilement-1440-12-pied.png`). Avec la touche Fin ou la molette, Lenis fait défiler et le fond revient à la chaux : je ne l'ai **pas** reproduit dans un usage normal. Le pied n'a pas de `data-bg` (l. 311), c'est le défaut du kit déjà noté au § 9 de `NOTES.md`.

## 3. Le parcours de Claire jusqu'à la demande de visite

1. Bouton du hero : l'ancre arrive sur « Racontez-nous votre bâtisse », titre à 293 px sous l'en-tête (`cta-hero-arrivee-1440.png`).
2. Envoi à vide : trois erreurs annoncées (« Indiquez votre nom. », « Indiquez la commune de la bâtisse. », « Un téléphone à 10 chiffres ou un e-mail. »), et le focus va sur « Prénom et nom » (`formulaire-erreurs-1440.png`).
3. J'ai saisi « Claire Dumas », « Lagnes », « claire.dumas@exemple.fr », « Achat en cours » et « Grange de 160 m² en pierre, voûte au rez-de-chaussée, toiture à reprendre. ». Résultat : « C'est noté, Claire. Hélène vous recontacte sous 48 heures pour fixer la visite. », et le bouton se désactive (`formulaire-envoye-1440.png`).
4. **Les chiffres concordent partout** : 240 € TTC dans le hero, les honoraires, la réassurance du formulaire et la barre mobile ; 9 % HT ; 5 760 € TTC = 4 800 € HT ; 300 000 € × 9 % = 27 000 € HT = 32 400 € TTC ; 5 760 + 32 400 = 38 160 € TTC. Trois mois d'études : l'étape 02, les honoraires et la FAQ disent la même chose. Onze mois pour la grange : l'article et la FAQ aussi.
5. FAQ « Architecte ou maître d'œuvre » : la réponse est juste. L'architecte est obligatoire au-delà de 150 m² de surface de plancher pour un particulier.

## 4. Le clavier (40 tabulations, 1440)

L'ordre est logique : évitement, logo, 4 liens, bouton de l'en-tête, bouton du hero, 3 entrées du sommaire, bouton des honoraires, 4 questions, 5 champs, envoi, e-mail, 6 liens du plan, « Haut de page », puis retour au début. **Le focus est visible partout** : contour vert de 2 px, ou fond teinté avec un filet épais sur les champs (`clavier-tab-16.png`, `focus-champ-1440.png`). Aucun élément n'est atteint hors écran. Les cartes du journal ne sont pas atteintes, ce qui est normal : elles n'ont pas de lien dans l'exemple.

## 5. Le mouvement réduit

À 1440, 1280, 768, 375 et 360 : la page est complète, sans aucun élément invisible et sans débordement (`page-entiere-reduit-*.png`). Le sommaire et la FAQ restent utilisables.

## 6. L'œil du métier

- **Niche** : plein cintre, jarre vernissée, tablette de pierre, tomettes. C'est juste. L'enduit jeté autour de la niche est rustique, mais il est vrai.
- **Lumière** : les tomettes hexagonales sont celles de chez nous. Mais la légende dit « Midi en décembre, fenêtre plein sud ». Or la fenêtre est dans le mur de gauche, et la tache de soleil se pose sur le mur d'à côté, haute et verticale. Un soleil de midi par une fenêtre au sud éclaire le sol et le mur d'en face. Ici, c'est un soleil bas et de biais, en fin de journée. Un architecte le voit.
- **Enduit** : ocre pâle, lissé, au ras d'un tableau de pierre. La légende est juste.
- **Séjour** : très bonne image. Deux détails seulement. La menuiserie de chêne vitrée est au fond de la pièce, pas « derrière les portes » comme le dit l'article (l. 122). Et l'arc de pierre de taille de l'intérieur ne ressemble pas à l'arc de moellons de la façade. Claire ne comparera pas, un confrère si.
- **Chantier de Saumane** : la couleur est juste. Mais le bord haut de l'enduit est déchiqueté, comme un vieil enduit qui tombe. Un maçon enduit de haut en bas et arrête son enduit à la règle. L'image montre donc un piquage, pas « les enduits suivent ».
- **Honoraires** : « 9 % HT », puis « Le chantier. Des travaux HT, … » se lit mal. C'est un bout de phrase.
- **Méthode** : « ce que vise la réception » ne se dit pas. La réception est un acte, elle ne vise rien.
- **Portrait, mas, grange, village, Gordes** : rien à redire, les lieux et les matières sont justes.

## 7. La densité (script de `conventions.md` § 11, 1440 × 900, après 3 s)

| Mesure | Mouvement réduit | Mouvement permis |
|---|---|---|
| Mots | **800** | **800** |
| Sections dans `main` | 11 | 11 |
| Écrans (accordéons ouverts) | 13,3 | 13,3 |

Détail par bloc : évitement 3, en-tête 9, couverture 73, sommaire 61, grange 56, matière 33, méthode 90, honoraires 83, atelier 26, témoignages 73, journal 54, questions 128, écrire 57, pied 54.

On est **dans** la fourchette de 500 à 800 mots, mais au plafond exact. Aucun bloc ne dépasse trois phrases : les 128 mots des questions se répartissent sur 4 questions. Trois titres dépassent le maximum de 10 mots du § 11 : la matière (13), la méthode (11) et le portrait (11). « Racontez-nous votre bâtisse » est sous le minimum (3 mots).

## 8. Téléphone, menu, débordement

- **Débordement horizontal** : 0 px à 1440, 1280, 768, 375 et 360. Aucun titre ne déborde ni ne casse.
- **Menu (375)** : il s'ouvre (`aria-expanded="true"`), sans débordement, avec 5 liens de 52 px et un bouton (`menu-ouvert-375.png`). Un toucher sur « Honoraires » ferme le menu, et le titre arrive à 160 px (`menu-ancre-honoraires-375.png`).
- **Logo touché depuis la citation (375)** : retour en haut, fond chaux, h1 encre (`tel-375-logo-depuis-citation.png`). Le défaut du tour 3 ne revient pas.
- **Barre collante** : elle se cache sur le formulaire et sur le pied (`tel-375-formulaire.png`).
- **Cibles** : toutes font au moins 44 px, sauf le lien e-mail du pied (18 px, lien dans le texte, toléré).
- **Méthode à 768** : la photo est limitée à 26 rem. Il reste un vide d'environ 270 × 520 px à sa droite (`section-methode-768.png`).

## 9. La console, le poids et le lien courant

- **Console** : propre sur un chargement isolé avec défilement complet, à 1440 et à 375 (aucune erreur, aucune image cassée). Pendant la série chargée, un seul `ERR_CONNECTION_RESET` est apparu sur `portrait-2000.webp` : c'est le serveur local, pas la page.
- **Poids des images** à 1440, page défilée : 1,09 Mo. Les trois photos du sommaire ne se chargent qu'à l'ouverture.
- **Lien courant, mesuré tous les 150 px** :
  - en descente : couverture « - », sommaire, grange et matière « Réalisations », méthode « Méthode », honoraires « Honoraires », portrait et témoignages « - », journal « Journal », questions et formulaire « - ». C'est juste ;
  - en remontée : à partir de la méthode, **« Méthode » reste souligné sur la matière (3 573 px) et la grange (2 223 px)**, jusqu'au sommaire (1 173 px). Ces deux sections ne sont observées par aucun des deux observateurs (l. 358-373).

---

# Partie 2 : les notes

## Les 10 points

| # | Point | Verdict | Capture | Pourquoi |
|---|---|---|---|---|
| 1 | Densité | OK | § 7 | 800 mots, 11 sections, 13,3 écrans, comptage fourni. C'est dans la fourchette, mais au plafond. |
| 2 | Catalogue, articles | OK | `defilement-1440-08-journal.png` | Journal en cartes datées, prêt pour un CMS. |
| 3 | Titres et promesse | OK | `premier-ecran-1440x900.png` | Promesse concrète, titres chiffrés et dans ma voix. Trois titres sont trop longs (FIX-2). |
| 4 | Typographie d'affichage | OK | `premier-ecran-1440x900.png`, `premier-ecran-375x812.png` | Interlettrage à 0 partout, lettres jamais collées. L'apostrophe de la légende verticale est de travers (FIX-4). |
| 5 | Barre de navigation | OK | `menu-ouvert-375.png` | Logo, 4 liens, un bouton, menu propre, aucun numéro. Le lien courant se trompe en remontant (FIX-3). |
| 6 | Blocs d'action, formulaires | OK | `formulaire-envoye-1440.png` | Deux colonnes, réassurance chiffrée. |
| 7 | Hero équilibré | OK | `premier-ecran-1440x900.png` | Texte, photo et action se répondent. |
| 8 | Responsive | OK avec réserve | `premier-ecran-360x740.png` | 0 débordement et aucun titre cassé. Mais le bouton du hero est coupé de 9 px à 360 × 740 (FIX-1). |
| 9 | Images et vidéos | OK | `section-matiere-1440.png`, `defilement-1440-07-temoignage.png` | La matière est juste, la pièce habitée est là, chaque section a son image sauf les honoraires, la FAQ et le formulaire. |
| 10 | 3D produit | sans objet | — | — |

## La grille sur 100 (`niveau-agence.md` § 6)

| Critère | Points | Note | Pourquoi |
|---|---|---|---|
| Direction artistique | 15 | **14** | On la reconnaît sans le logo : chaux, Bodoni, vert Sorgue, folio, légendes, filets, titre en surimpression, nuit pour les avis. Les cinq nouvelles images ont le même grain que les autres. |
| Images | 15 | **13** | La matière est enfin la mienne, et le séjour habité porte la promesse. Le rythme des tailles est bon. C'est le plafond en médias provisoires : aucune photo ne montre un vrai chantier de l'atelier. |
| Mise en page | 15 | **14** | La composition éditoriale est suivie de bout en bout, et le collage de la matière tient. Il reste le vide à droite de la méthode à 768. |
| Mouvement | 10 | **8** | Le sommaire fait la signature, avec les titres en lignes, la parallaxe et le passage au fond nuit. Le mouvement réduit est complet. Les honoraires, le journal et la FAQ n'ont qu'un fondu. Le lien courant se trompe en remontant. |
| Clarté en 5 s, action | 10 | **9** | Quoi, pour qui, combien, quoi faire : tout se lit en 5 s de 1440 à 375 × 812. À 360 × 740 le bouton est coupé, et à 375 × 667 le prix est sous l'écran. |
| Densité | 5 | **5** | 800 mots, 11 sections, comptage fourni. |
| Preuves, objections | 10 | **8** | Honoraires chiffrés au centime, exemple juste, Bâtiments de France, délais, zone, suivi à distance, et maintenant le prix face au maître d'œuvre. C'est le plafond en provisoire : avis, 64 bâtisses et écart de prix restent à confirmer. |
| Textes | 10 | **9** | Des titres forts et concrets, plus aucune apostrophe droite, des chiffres alignés. Je retire un point pour « ce que vise la réception », « Des travaux HT », deux légendes que l'image dément (midi plein sud, les enduits qui « suivent ») et trois titres de plus de 10 mots. |
| Mobile, accessibilité, légèreté | 10 | **8** | 0 débordement, focus visible partout, cibles de 44 à 52 px, menu propre, sommaire illustré sur téléphone, console propre, 1,1 Mo d'images. Je retire deux points pour le bouton coupé à 360 × 740, que le FIX-11 a fait apparaître. |
| **Total** | 100 | **88 / 100** | Aucune pénalité : 800 mots ne dépasse pas 800. |

**Note sur 10 : 8,8.**

**Seuil** : **85**, celui d'une maquette aux médias provisoires. Je suis 3 points au-dessus.

**Ce qu'on peut atteindre sans le vrai client** : FIX-1 à FIX-8, tous à 0 $, donnent environ **90**. Le gain vient du hero à 360 (Mobile +1, Clarté +1). Les autres corrections sont des finitions. Au-delà, il faut le vrai client : ses chantiers photographiés, ses avis signés, son nombre de bâtisses vérifié, son numéro d'Ordre et son SIRET, et l'écart de prix qu'il assume face à un maître d'œuvre.

> « Cette fois, c'est ma revue. Le titre parle à Claire, mes prix sont justes au centime, la matière est la mienne et l'on voit enfin une pièce où l'on vit. Il reste des finitions : le bouton qui passe sous l'écran d'un petit Android, un lien de menu qui se trompe en remontant, et deux légendes que mes photos démentent. Je signe, et je veux ces retouches avant la mise en ligne. »

**Verdict : Oui, ça vaut mes 25 000 €.** 88/100, au-dessus du seuil de 85. Aucun des 10 points n'est « Pas OK ». Il reste à corriger les FIX gratuits ci-dessous, sans nouveau tour.

---

# Partie 3 : le plan de corrections restant

**Budget de mots** : la page est à 800 et le plafond est à 800. Le plan **retire** des mots.

| | Mots |
|---|---|
| Aujourd'hui | 800 |
| FIX-2 (trois titres raccourcis, légende de la méthode) | −10 |
| FIX-5 (grange −2, Saumane +2, lumière 0) | 0 |
| FIX-6 (« du montant HT des travaux ») | +2 |
| **Après le plan** | **≈ 792** |

Recompter avec le script du § 11, puis corriger le tableau du § 4 de `NOTES.md`, qui annonce 783 alors que la page en compte 800.

| FIX | Gravité | Coût | Résumé |
|---|---|---|---|
| FIX-1 | moyen | **0 $** | Hero : bouton coupé de 9 px à 360 × 740, prix sous l'écran à 375 × 667 et 360 × 740 |
| FIX-2 | moyen | **0 $** | 800 mots pile, aucune marge ; trois titres de plus de 10 mots |
| FIX-3 | léger | **0 $** | Lien courant : « Méthode » reste souligné sur la matière et la grange en remontant |
| FIX-4 | léger | **0 $** | Légende verticale de la couverture : apostrophe de travers dans « l'année » |
| FIX-5 | léger | **0 $** | Trois textes que l'image dément : midi plein sud, « les enduits suivent », « derrière les portes » |
| FIX-6 | léger | **0 $** | « ce que vise la réception », « Des travaux HT », apostrophe droite de la confirmation |
| FIX-7 | léger | **0 $** | Pied sans `data-bg` : après un saut instantané depuis la citation, « Haut de page » devient invisible |
| FIX-8 | léger | **0 $** | Méthode à 768 : vide de 270 × 520 px à droite de la photo |
| FIX-9 | léger pour 85, bloquant pour 90 | **client** | Vrais chantiers, avis signés, nombre de bâtisses, Ordre, SIRET, écart de prix, promesse « toute l'année » validée |

## FIX-1 · moyen · 0 $ · le hero sur les petits écrans

**Quoi.** Depuis que le h1 ne mord plus sur la photo (FIX-11 du tour 1), tout le bloc descend d'environ 38 px.
- À **360 × 740** (Galaxy S8 et S9), le bouton occupe 692 → 749 px : il est coupé de 9 px, et le prix est invisible.
- À **375 × 667**, le bouton tient, mais « 1 h 30 sur place, 240 € TTC » commence à 670 px, sous l'écran.

**Où.** `calade.src.css` l. 83 : `@media (max-width: 899px) and (max-height: 700px) { .couverture-photo { height: 26svh; } }`.

**Comment.** Élargir la requête et baisser la photo :
`@media (max-width: 899px) and (max-height: 760px) { .couverture-photo { height: 22svh; } }`
- À 740 px de haut, la photo passe de 266 à 163 px : bouton 589 → 646, prix 658 → 698.
- À 667 px, elle passe à 147 px : prix 644 → 664.
- À 812 px, rien ne change.

Recompiler `calade.css`, puis refaire 360 × 740, 375 × 667 et 375 × 812. Si la photo paraît trop mince, garder 26svh et masquer le folio sous 760 px de haut (−50 px).

## FIX-2 · moyen · 0 $ · densité au plafond, trois titres trop longs

**Quoi.** La page compte exactement 800 mots. Un seul mot de plus mettrait « Densité » à 0 et ajouterait une pénalité de 5 points, soit −10. Trois titres dépassent aussi les 10 mots du § 11.

**Où.** `index.html` l. 134 (matière, 13 mots), l. 150 (méthode, 11), l. 189 (portrait, 11), l. 147 (légende de la méthode).

**Comment.**
- l. 134 : « Chaux et pierre&nbsp;: frais en août, secs en janvier » (9 mots, −4).
- l. 150 : « De la visite aux clés&nbsp;: quatre étapes, une architecte » (9 mots, −2).
- l. 189 : « Hélène Garcin dessine, puis visite votre chantier chaque semaine » (9 mots, −2).
- l. 147 : « … volets d'origine gardés&nbsp;: le résultat visé » au lieu de « ce que vise la réception » (−2, et règle la tournure du FIX-6).

On arrive à environ 790 mots, avec une marge pour les FIX-5 et FIX-6.

## FIX-3 · léger · 0 $ · le lien courant en remontant

**Quoi.** En remontant depuis la méthode, « Méthode » reste souligné sur la matière et sur l'article de la grange, jusqu'au sommaire. Cela vient de ce que `#grange` et `#matiere` ne sont observés par aucun des deux observateurs.

**Où.** `index.html` l. 358-373.

**Comment.** Un seul observateur sur toutes les sections, avec une table qui associe chaque section à son lien :
```js
const lienDe = { sommaire: "#sommaire", grange: "#sommaire", matiere: "#sommaire", methode: "#methode", honoraires: "#honoraires", journal: "#journal" };
const io = new IntersectionObserver((es) => es.forEach((e) => {
  if (!e.isIntersecting) return;
  const h = lienDe[e.target.id]; // undefined hors nav : tout s'efface
  liens.forEach((a) => a.getAttribute("href") === h ? a.setAttribute("aria-current", "location") : a.removeAttribute("aria-current"));
}), { rootMargin: "-45% 0px -50% 0px" });
document.querySelectorAll("main > section").forEach((s) => io.observe(s));
```
Retirer le second observateur (`hors`). Vérifier dans les deux sens, tous les 150 px.

## FIX-4 · léger · 0 $ · l'apostrophe de la légende verticale

**Quoi.** Sur le premier écran, à 1440 et 1280, « habitée toute l'année » s'affiche « toute l’-  année » (`legende-verticale-1440.png`). En `writing-mode: vertical-rl`, le navigateur utilise la forme verticale de l'apostrophe typographique.

**Où.** `calade.src.css` l. 92 (`.couverture .legende-cote`).

**Comment.** Ajouter `text-orientation: sideways;`, ou `font-feature-settings: "vert" 0;` si la première ne suffit pas. Garder `transform: rotate(180deg)`. Contrôler à l'œil à 1440 et 1280.

## FIX-5 · léger · 0 $ · trois textes que l'image dément

**Où et comment.**
- **l. 136**, légende de la lumière, « Midi en décembre, fenêtre plein sud ». La tache est haute, verticale, sur le mur voisin de la fenêtre : c'est un soleil bas et de biais. Écrire « Soleil d'hiver, en fin de journée » (6 mots, nombre égal).
- **l. 238**, Saumane. Le bord haut de l'enduit est déchiqueté : l'image montre un piquage, pas un enduit en cours. Changer le titre en « Saumane, semaine 14 : la charpente est reprise, on pique les vieux enduits » (+2 mots), et l'alt en « …murs calcaires dont on pique les vieux enduits… ». Autre option, à 0,03 $ et facultative : régénérer avec « fresh lime render applied top-down, straight horizontal stop line, scaffolding ».
- **l. 122**, grange. Sur le séjour, la menuiserie vitrée est au fond, pas dans l'arc. Écrire « …isolé à la chaux-chanvre et ouvert au fond une porte-fenêtre de chêne. » (−2 mots).

## FIX-6 · léger · 0 $ · trois tournures

- **l. 147** : « ce que vise la réception », réglé par le FIX-2.
- **l. 175** : « **Le chantier.** Des travaux HT, une visite… » se lit comme un bout de phrase. Écrire « **Le chantier.** Du montant HT des travaux, une visite par semaine jusqu'à la levée des réserves. » (+2 mots).
- **l. 431** : `C'est noté` → `C’est noté` (apostrophe typographique dans le message de confirmation).

## FIX-7 · léger · 0 $ · le pied de page sans fond propre

**Quoi.** Le pied prend la couleur de fond du `body`. Après un saut instantané depuis la citation (ancre sans Lenis, script), il reste en fond nuit. Le texte suit en clair, mais « Haut de page » (`.pied-bas a`, encre forcée) devient invisible (`defilement-1440-12-pied.png`). Je ne l'ai pas reproduit avec la molette ni avec la touche Fin.

**Où.** `index.html` l. 311.

**Comment.** `<footer class="pied page" data-bg="#ebeae5" data-fg="#191b18">`, comme toutes les sections. C'est aussi la proposition du § 9 de `NOTES.md` pour le kit.

## FIX-8 · léger · 0 $ · le vide de la méthode à 768

**Quoi.** De 600 à 899 px, la photo de la méthode est limitée à 26 rem. Il reste un rectangle vide d'environ 270 × 520 px à sa droite (`section-methode-768.png`).

**Où.** `calade.src.css` l. 185.

**Comment.** `@media (min-width: 600px) and (max-width: 899px) { .methode-photo { max-width: none; } .methode-photo img { aspect-ratio: 3 / 2; object-position: 50% 70%; } }`. Le perron et la glycine restent dans le cadre. Vérifier à 768.

## FIX-9 · léger pour 85, bloquant pour 90 · client

Ce que seule Hélène Garcin peut fournir :
- ses vrais chantiers photographiés, dont la grange Berthier de l'intérieur et de l'extérieur avec les mêmes portes ;
- des avis signés, avec accord écrit ;
- le nombre réel de bâtisses ;
- le numéro d'Ordre, le SIRET et l'assureur ;
- l'écart de prix qu'elle assume face à un maître d'œuvre ;
- la validation de la promesse « habitable toute l'année ».

Tout cela va dans « Ce qui manque encore ».
