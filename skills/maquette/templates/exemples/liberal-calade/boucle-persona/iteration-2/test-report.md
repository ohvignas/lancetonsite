# Boucle persona, tour 2 : rapport de test

- **Date** : 4 novembre 2026
- **Page testée** : exemple « Atelier Calade », http://127.0.0.1:4331/liberal-calade/
  (`skills/maquette/templates/exemples/liberal-calade/index.html`, `calade.src.css`, `gestes.js`)
- **Regard indépendant : les rapports du relecteur n'ont pas été lus.** Ni `NOTES.md`, ni les
  rapports du tour 1. Seul le `fix-plan.md` du tour 1 a été lu, pour le vérifier.
- **Navigateur** : Google Chrome (Playwright 1.40, canal `chrome`, sans interface), 1440 × 900,
  1280 × 720, 375 × 812, 375 × 667, 360 × 740 ; `prefers-reduced-motion: reduce` à 1440 et 375.
  Scripts rangés hors du dépôt (bloc-notes de session). Rien n'a été modifié dans la page.
- **Qui parle** : Hélène Garcin, fondatrice de l'Atelier Calade. Et, à côté de moi, Claire,
  54 ans, Lyonnaise, qui vient de signer le compromis d'une grange vers Goult.

---

## 0. Ce qui a changé depuis le tour 1, en une minute

La bergerie-musée a disparu : l'article est maintenant **la grange Berthier de Lagnes**, une
vraie grange de calcaire à tuile canal, avec sa voûte. Le portrait montre enfin une femme de
mon âge contre un poteau de chêne. Les prix sont en TTC, il y a une ligne de prix sous le
bouton de couverture, une phrase sur les 150 m² et un exemple chiffré. Le formulaire a son
champ libre. C'est un vrai pas en avant. Le détail, FIX par FIX, est au § 10.

---

## 1. Les 5 premières secondes

### Ordinateur, 1440 × 900

Capture : `captures/d-02-premier-ecran.webp` (et `d-01-premier-ecran-1s.webp` à 1 s).

- **Ce qu'on vend** : « Atelier d'architecture à L'Isle-sur-la-Sorgue. Nous réhabilitons mas,
  granges et maisons de village du Vaucluse. » Clair.
- **Pour qui** : le propriétaire d'une bâtisse ancienne. Claire s'y reconnaît.
- **À quel prix** : « Visite sur place : 240 € TTC. » sous le bouton (y = 745 px). Réglé.
- **Quoi faire** : « Faire visiter votre bâtisse → », bouton vert, y = 676 px. Visible.
- Le folio dit quelque chose de vrai : « Hiver 2026 · L'Isle-sur-la-Sorgue · 64 bâtisses
  depuis 2009 · 2 chantiers ouverts au printemps 2027 ». C'est un numéro de revue, et en plus
  ça dit qu'il faut se dépêcher.
- Le titre « Garder la pierre, *ouvrir* la lumière. » chevauche la photo, en multiplication :
  c'est une couverture. Je suis fière de ce premier écran.
- À 1 s, l'intro est déjà presque finie (`captures/intro-300.webp` : à 0,3 s le titre est là,
  la photo se dévoile). Pas d'attente.
- À 1280 × 720 (`captures/d-1280x720-premier-ecran.webp`) : tout tient, « À la une » compris.

*Note de capture* : sur deux images prises pendant l'intro (0,3 s et 1 s), Chrome sans
interface a dessiné une deuxième copie de l'en-tête en bas de l'écran. Il n'y a qu'un seul
`<header>` dans le DOM, sans clone, et l'artefact ne revient pas à 0,6 s ni ensuite. Je le
classe comme un artefact de capture, sans FIX.

### Téléphone, 375 × 812, 375 × 667, 360 × 740

Captures : `captures/m-375x812-premier-ecran.webp`, `m-375x667-premier-ecran.webp`,
`m-360x740-premier-ecran.webp`.

- 375 × 812 : photo, titre, chapeau, bouton (y = 642-699), prix (y = 711-731). Tout est là.
- 375 × 667 : le bouton est entier, mais la ligne « Visite sur place : 240 € TTC. » est
  **coupée par le bas de l'écran**. Le prix n'est lisible qu'en faisant défiler un peu.
- Sous le prix vient « Couverture : maison de la rue Basse, Ménerbes, 2024 », dans le même
  gris et le même corps : sur téléphone, on dirait une deuxième ligne d'information, détachée
  de la photo qu'elle légende.

---

## 2. Le défilement complet

### Lent, 1440 × 900 : 12 captures

`captures/d-serie-01-y0.webp` à `d-serie-12-y6461.webp` (hauteur de page 7 361 px, 8,2 écrans).

| Capture | Ce que je vois |
|---|---|
| `d-serie-02-y587` | Fin de couverture, puis le sommaire : « Les dernières bâtisses rendues à leurs habitants », trois lignes, années en vert, surfaces à droite. Belle échelle. |
| `d-serie-03-y1175` | Le sommaire entier, puis l'article commence : la grange Berthier, grande verticale. |
| `d-serie-04-y1762` | Article : photo à gauche (7 colonnes), « La voûte gardée, la grange habitée » en colonne étroite. « Sous la voûte, on rangeait la charrette. » C'est ma voix. |
| `d-serie-05/06` | La matière : niche, lumière, enduit, alcôve, en quinconce. « Enduit chaux aérienne, trois passes, taloché fin ». Mais **aucune pierre** sous le titre « La chaux, la pierre, et rien de plus », et l'alcôve est toujours la niche de béton gravé avec sa chaise de poupée. |
| `d-serie-07/08` | Honoraires : 240 € TTC, dès 5 760 € TTC, 9 %, puis « Architecte obligatoire au-delà de 150 m². Pour 300 000 € de travaux, le suivi revient à 32 400 € TTC. » et un bouton « Demander la visite ». |
| `d-serie-09` | Portrait : Hélène Garcin, une femme de soixante ans, bras croisés, contre un poteau de chêne. Crédible. Mais l'encart de texte mord le coin haut-gauche de la photo et dessine une marche : la règle `margin-top: 55 %` de `.portrait-texte` est écrasée par la classe `md:mt-0` (marge mesurée : 0 px). |
| `d-serie-10/11` | Citation géante sur fond nuit : « On voulait raser la grange. C'est devenu la pièce où l'on vit. » Signature soulignée en pointillé (provisoire). Fort. |
| `d-serie-12` | « Racontez-nous votre bâtisse », prix et délai, adresse, téléphone, formulaire à cinq champs. Pied de page. |

Le rythme suit la fiche « éditorial magazine » : couverture, sommaire, article, matière,
honoraires, portrait, citation, action. Les colonnes ne se répètent jamais deux fois.
Rien ne saute ni ne clignote ; l'en-tête se cache en descendant et revient en remontant.

### Rapide

Molette à 600 px toutes les 40-60 ms, du haut en bas (`captures/d-pleine-page-1440.webp`
pour la page entière). Pas de saut, pas de blanc : les apparitions rattrapent le défilement.

### Téléphone, 375 × 812 : 10 captures

`captures/m-serie-01-y0.webp` à `m-serie-10-y5967.webp`, `m-pleine-page-375.webp`.

- La barre « Faire visiter votre bâtisse » apparaît après la couverture et disparaît sur le
  formulaire (classe `is-visible` retirée sur `#ecrire`) : bien.
- La matière sur téléphone n'est plus un mur d'images : niche et lumière côte à côte,
  l'enduit en pleine largeur, l'alcôve décalée (`captures/m-matiere.webp`). Bien.
- **Mais les trois légendes de la matière ont disparu sur téléphone** : « Midi en décembre,
  fenêtre plein sud », « Enduit chaux aérienne, trois passes, taloché fin » et « Niche
  d'éclairage ». Mesure dans Chrome à 375 px : figure de la lumière 220-490 px, légende
  500-540 px ; enduit, figure 510-772, légende 781-802. La légende sort de la figure, qui a
  `overflow: hidden` : elle est coupée. Ma phrase signature, « chaux aérienne, trois passes »,
  ne se lit pas sur le téléphone de Claire.

---

## 3. Le moment signature : le sommaire

Captures : `d-sommaire-survol-1.webp`, `d-sommaire-survol-3.webp`,
`d-sommaire-survol-titre.webp`, `d-sommaire-ouvert-grange.webp`,
`d-sommaire-ouvert-survol.webp`, `d-sommaire-ouvert-mas.webp`, `d-lire-chantier.webp`.

- Au survol, la ligne survolée reste noire, les autres passent en gris, le titre glisse de
  20 px, l'image de la bâtisse suit le curseur. L'effet marche.
- Les coins de l'image flottante sont droits (`borderRadius: 0px` mesuré). Corrigé.
- **Une entrée ouverte ne montre plus l'image flottante par-dessus sa grande photo**
  (opacité 0, `visibility: hidden` mesurés). Corrigé.
- **Mais l'image tourne toujours** : `rotate(6deg)` mesuré dans le `transform`
  (`d-sommaire-survol-titre.webp`). Une photo de travers sur une page à angles droits.
- **Et elle cache le titre qu'on survole.** Curseur sur « La grange Berthier » à x = 352 :
  l'image occupe x 266-554, y 354-699 ; le titre occupe x 172-1056, y 497-555. On lit
  « La g… hier ». Même chose sur le mas (`d-sommaire-survol-1.webp`) : « Le mas d… e ».
  En mode « curseur », le kit pose l'image à 170 px à droite du pointeur : comme on survole
  le titre par la gauche, elle tombe dessus.
- Liens : seule la grange mène quelque part (« Lire le chantier » vers `#grange`,
  `d-lire-chantier.webp`, l'ancre arrive bien sur l'article). Le mas et la maison de la rue
  Basse n'ont aucun lien. La fiche demande que chaque entrée mène à sa page.
- Clavier : Entrée sur le premier `summary` ouvre l'entrée (`d-clavier-sommaire-entree.webp`).

---

## 4. Le parcours de Claire jusqu'à l'action

1. Premier écran : elle lit 240 € TTC, elle clique « Faire visiter votre bâtisse ». L'ancre
   descend sur `#ecrire` (`d-nav-ecrire.webp`, titre à 292 px du haut). Bien.
2. Elle remonte, ouvre la grange dans le sommaire, clique « Lire le chantier » : elle arrive
   sur l'article.
3. Honoraires (`d-honoraires.webp`) : les trois prix, la phrase « Architecte obligatoire au-delà
   de 150 m² ». Sa grange fait 200 m² : elle comprend qu'elle n'a pas le choix. Bien.
   « Pour 300 000 € de travaux, le suivi revient à 32 400 € TTC. » Calcul vérifié :
   9 % × 300 000 = 27 000 € HT, × 1,2 = 32 400 € TTC. Juste. Et 4 800 € HT × 1,2 = 5 760 €
   TTC : juste aussi. Mais Claire demandait « combien coûte un architecte, **en vrai** » :
   la page lui donne le suivi et le permis séparément, sans le total (environ 38 160 € TTC
   pour son exemple). Elle fera l'addition elle-même, ou pas.
4. « Demander la visite → » sous les honoraires : arrive sur le formulaire
   (`d-cta-honoraires-vers-ecrire.webp`). À 1440 × 900, le bouton d'envoi est juste sous le
   bord de l'écran ; il faut défiler un peu.
5. Formulaire (aucune donnée envoyée, le script se contente d'afficher la confirmation) :
   - Envoi vide (`d-form-erreurs.webp`) : trois messages en rouge, « Indiquez votre nom. »,
     « Indiquez la commune de la bâtisse. », « Un téléphone à 10 chiffres ou un e-mail. »,
     focus sur le premier champ. Bien.
   - « 06 12 34 » : refusé, même message. Bien.
   - Claire Berthelot, Goult, claire.b@exemple.fr, « Achat en cours », « Grange de 200 m²,
     toit à reprendre, on vit à Lyon. » → « C'est noté, Claire. Hélène vous recontacte sous
     48 heures pour fixer la visite. » ; le bouton passe à 55 % d'opacité et se désactive
     (`d-form-confirmation.webp`). Bien.
   - Focus du champ libre (`d-form-focus-textarea.webp`) : fond gris clair et trait vert de
     3 px. Visible. Le texte saisi touche le bord gauche du fond (aucune marge intérieure) :
     détail.
6. Ce qui manque à Claire en chemin : **rien ne parle des Bâtiments de France**. Sa troisième
   question (« vont-ils accepter des ouvertures ? ») n'a plus de réponse sur la page. Au tour 1
   la bergerie en parlait, faussement ; au tour 2 la phrase a été retirée sans être remplacée.
   Pour un atelier qui promet d'« ouvrir la lumière » dans des maisons « souvent en secteur
   protégé », c'est le trou le plus visible.
7. « On n'habite pas sur place » : la ligne « suivi chaque semaine, compte rendu photo jusqu'à
   la réception » y répond. Bien.

Cohérence des chiffres d'un bloc à l'autre : 240 € TTC identique en couverture, honoraires,
`#ecrire` et meta description ; 180 m² identique au sommaire et dans la fiche de l'article ;
2024 et Lagnes identiques partout. Rien ne se contredit.

Trois libellés pour une même action : « Nous écrire » (en-tête), « Faire visiter votre
bâtisse » (couverture, barre mobile), « Demander la visite » (honoraires, formulaire).

---

## 5. Le clavier : 40 tabulations depuis le haut

Captures : `d-clavier-tab01.webp` (lien d'évitement), `tab02`, `tab05`, `tab06` (bouton de
couverture), `tab08` (première entrée du sommaire, cadre vert de 2 px autour de la ligne),
`tab10`, `tab12` (téléphone), `tab14` (champ commune : fond et trait vert), `tab16`, `tab18`
(bouton d'envoi).

Ordre relevé : Aller au contenu → Atelier Calade → Réalisations → Honoraires → Nous écrire →
Faire visiter votre bâtisse → À la une → mas → grange → rue Basse → Demander la visite →
téléphone → nom → commune → contact → étape → bâtisse → bouton → Haut de page → (document) →
on recommence. **19 éléments, tous atteints, tous visibles à l'écran au moment du focus,
tous avec un indicateur** (contour vert 2 px, ou fond et trait de 3 px pour les champs).
L'en-tête qui se cache revient bien au focus. Rien à redire.

---

## 6. Mouvement réduit

Captures : `r-premier-ecran.webp`, `r-d-1-sommaire.webp` à `r-d-5-temoignage.webp`,
`r-d-sommaire-survol.webp`, `r-m-1-sommaire.webp` à `r-m-5-temoignage.webp`.

Classe `motion-reduit` posée, Lenis absent, parallaxe à `transform: none`, aucun titre, texte
ou image caché (0 élément à opacité < 0,5 ou `visibility: hidden` dans `main`). L'image
flottante du sommaire ne s'affiche pas au survol. Page complète et lisible, à 1440 et à 375.

(Les deux captures pleine page sans défilement, `r-pleine-page`, montraient des trous à la
matière et au portrait : c'est le chargement différé des images, pas le mouvement réduit. Les
captures prises section par section les montrent bien chargées.)

---

## 7. L'œil du métier

Je relis chaque image et chaque mot comme si c'était mon site.

| Endroit | Ce que je vois | Verdict |
|---|---|---|
| Couverture (`couverture-*.webp`) | Escalier massif enduit à la chaux, une jarre sur le palier. Pas de pierre, mais de la chaux : ça passe. L'alt dit « qui monte vers une fenêtre » : il n'y a pas de fenêtre. | bon, alt à reprendre |
| Grange Berthier (`grange-article-*.webp`) | Façade de calcaire en moellons, tuile canal, grand arc de pierre, portes de bois rouge, laurier-rose. C'est le Vaucluse. Un peu d'enduit écaillé sous la voûte pour un chantier « livré en 2024 », mais on peut dire que c'est voulu. | bon |
| Même photo | Vue **quatre fois** : vignette « À la une », image flottante du sommaire, grande photo de l'entrée ouverte, article. Au tour 1, on reprochait exactement ça à la bergerie. | à corriger |
| Mas de la Roque (`mas-900.webp`, `captures/detail-mas-menuiserie-pvc.webp`) | Pignon de pierre, volet bleu, rosier. Mais la porte-fenêtre est une **menuiserie blanche à profil épais, du PVC**, et une **descente d'eau blanche en PVC** longe la façade à droite. Chez moi : bois peint et zinc, toujours. Et le texte parle de « toiture reprise en tuiles canal » sur une photo où l'on ne voit pas le toit. | faux pour le métier |
| Maison de la rue Basse, Ménerbes (`village-900.webp`, `captures/detail-menerbes-icones.webp`) | Cour dallée en opus incertum sous des arcades, auvent de charpente. Deux **icônes orthodoxes** accrochées au pilier, une **croix sculptée** sur la porte, une jardinière blanche moulée à tête de lion. C'est une cour grecque, pas Ménerbes. Et la légende dit « voûtes du rez-de-chaussée dégagées » : on voit des arcs et une charpente, pas de voûte. | faux, se voit en trois secondes |
| Niche en ogive | Enduit à la chaux, pot de terre. Crédible. | bon |
| Lumière | Rectangle de soleil sur un mur, en noir et blanc, dans une pièce en chantier (un câble pend à gauche). Légende « Midi en décembre, fenêtre plein sud » : enfin plausible. Le noir et blanc détonne un peu dans une palette chaude. | acceptable |
| Enduit | Courbes d'enduit, lumière rasante. « Enduit chaux aérienne, trois passes, taloché fin ». | très bon |
| Alcôve (`alcove-*.webp`) | **Toujours** la niche de béton gravé de traits, éclairée par le haut, avec une chaise miniature. Seule la légende a changé. Deux niches sur quatre images, et aucune pierre dans une section titrée « La chaux, la pierre ». | à remplacer |
| Portrait | Femme d'une soixantaine d'années, cheveux blancs, pull de laine, montre, contre un poteau de chêne. Une fondatrice de 2009, oui. Le mur derrière est en schiste gris-bleu à lichen jaune : pas de chez nous, mais il faut le savoir. Portrait réel à faire. | bon, provisoire |
| Textes | « Sous la voûte, on rangeait la charrette. » « isolé à la chaux-chanvre ». « Elle dessine chaque maison » (le mot « projet » a disparu). « 1 h 30 sur place ». Aucune phrase creuse. | très bon |
| Droit | « Architecte obligatoire au-delà de 150 m² » : juste (surface de plancher, recours obligatoire pour un particulier). Le pied de page dit « inscrits à l'Ordre » sans numéro d'inscription ni mentions légales : à fournir par le vrai client. | juste |

---

## 8. Densité (script `conventions.md` § 11, 1440 × 900, images chargées, 3 s d'attente)

**325 mots · 8 sections · 8,7 écrans.**

| Bloc | Mots |
|---|---|
| lien d'évitement | 3 |
| en-tête | 6 |
| couverture | 51 |
| sommaire (entrées ouvertes) | 31 |
| grange | 49 |
| matière | 18 |
| honoraires | 73 |
| atelier (portrait) | 24 |
| témoignage | 8 |
| écrire | 51 |
| pied de page | 11 |

Dans la cible magazine (320 à 390 mots), moins de 400, 8 sections, environ 9 écrans.
Le bloc le plus chargé est celui des honoraires (73 mots) : trois prix en liste, plus deux
phrases. Il reste 65 mots de marge sous 390 pour les corrections ci-dessous.

---

## 9. Console et ressources

Aucune erreur, aucun avertissement dans la console, aucune requête en échec ni réponse ≥ 400,
sur les cinq tailles. Chargement complet en 5,3 s en local, polices et GSAP par CDN compris.
Poids : `grange-article-1800.webp` 444 Ko, `enduit-1800.webp` 321 Ko, `portrait-2000.webp`
262 Ko, `niche-1400.webp` 236 Ko, `mas-900.webp` 191 Ko pour 900 px. Pas de débordement
horizontal à 375 px (`scrollWidth` = 375).
Cibles tactiles sous 24 px de haut à 375 px : le lien du téléphone (105 × 18) et « Haut de
page » (80 × 15).

---

## 10. Les FIX du tour 1, un par un

| FIX tour 1 | État | Ce que j'ai vérifié |
|---|---|---|
| FIX-1 · bergerie-musée | **corrigé** (par suppression) | Plus de bergerie ; l'article est la grange de Lagnes, crédible. Effet de bord : la grange est vue 4 fois (nouveau FIX-7). |
| FIX-2 · grange normande | **partiellement** | La grange est maintenant en calcaire et tuile canal. Mais le plan demandait deux images différentes (extérieur au sommaire, intérieur près de la citation) et « ne plus réutiliser la même photo deux fois » : c'est la même photo partout, et la citation n'a plus d'image. |
| FIX-3 · architecte ou maître d'œuvre | **corrigé** | Phrase des 150 m² et exemple chiffré, calcul juste. Reste à donner le total (nouveau FIX-8). |
| FIX-4 · portrait | **corrigé** | Femme d'une soixantaine d'années, cadrage 3:2, devant pierre et chêne. |
| FIX-5 · mas à lauzes | **partiellement** | Plus de lauzes ; texte précis (« tuiles canal de réemploi »). Mais la nouvelle photo montre une menuiserie et une descente en PVC, et pas le toit (nouveau FIX-6). |
| FIX-6 · prix et action | **corrigé** | Ligne 240 € TTC sous le bouton, bouton après les honoraires, phrase de `#ecrire` remplacée, marge sous le pied de couverture, « Ouvrez une ligne… » retiré. |
| FIX-7 · TTC | **corrigé** | 240 € TTC, dès 5 760 € TTC, « Du montant HT des travaux », meta description en TTC. |
| FIX-8 · procédure ABF | **corrigé** (par suppression) | Plus d'erreur de procédure. Mais plus aucune réponse sur les Bâtiments de France (nouveau FIX-2). |
| FIX-9 · formulaire | **corrigé** | Champ libre, `autocomplete="on"`, confirmation « vous recontacte », ligne « suivi chaque semaine ». |
| FIX-10 · sommaire | **partiellement** | (a) image rangée à l'ouverture : corrigé. (b) coins droits : corrigé ; rotation ± 6° : **non**. (c) liens sur chaque entrée : **non** (mas et rue Basse sans lien). |
| FIX-11 · témoignage provisoire | **corrigé** | Classe `provisoire` et commentaire « avis réel à recueillir ». |
| FIX-12 · légendes de la matière | **partiellement** | « fenêtre plein sud » : corrigé. Alcôve : même photo (chaise de poupée), seule la légende a changé. |
| FIX-13 · « projet » | **corrigé** | « Elle dessine chaque maison ». |
| FIX-14 · focus, bouton, poids | **corrigé** | Fond et trait de 3 px au focus, bouton désactivé à 55 %, `niche-1400` passée de 609 à 236 Ko (cible 200 presque tenue). |
| FIX-15 · matière sur téléphone | **corrigé, avec une régression** | Grille à deux colonnes, rythme retrouvé ; mais les légendes sont coupées sous 900 px (nouveau FIX-5). |

Bilan : 10 corrigés, 1 corrigé avec une régression, 4 partiellement, 0 ignoré.
