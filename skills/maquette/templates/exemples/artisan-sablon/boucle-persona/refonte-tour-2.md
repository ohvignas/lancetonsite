# Boucle persona — Sablon, refonte, tour 2

- **Date** : 4 novembre 2026
- **Page testée** : http://127.0.0.1:4357/artisan-sablon/index.html (12 sections, état décrit par `NOTES.md` § 10)
- **Regard indépendant** : les rapports du relecteur n'ont pas été lus. Lus : `brief.md`, mon tour 1 (`refonte-tour-1.md`, 74/100, FIX-1 à 18), `NOTES.md` § 10, `niveau-agence.md` § 6, `conventions.md` § 11, `retours-utilisateur-2026-11-04.md`.
- **Outil** : Playwright 1.65 avec Google Chrome (canal `chrome`), sur mon propre serveur Node statique (`no-store`, 127.0.0.1:4357, arrêté à la fin). Aucune connexion coupée, **aucune requête échouée**.
- **Tailles** : 1440 × 900, 1280 × 800, 768 × 1024, 375 × 812, 375 × 667 et 360 × 740, en animé et en `prefers-reduced-motion: reduce`.
- **Captures** : `boucle-persona/refonte-tour-2-captures/` (abrégé `cap/` ci-dessous). Rien n'a été modifié dans la page, rien n'a été envoyé, rien n'a été dépensé.

Je suis Bastien Sablon. Je tourne seul à Dieulefit et je vis de la vaisselle des restaurants. Ensuite, je suis Claire : cheffe d'un bistrot de 45 couverts à Montélimar. Je rouvre au printemps, et ma peur, c'est la casse et le réassort.

---

## 1. Les FIX du tour 1 : où en est-on

| FIX | État | Ce que j'ai vérifié à l'écran |
|---|---|---|
| FIX-1, titre de la méthode cassé | **fait** | « Quatorze semaines, de l'essai au service complet ». J'ai mesuré mot par mot les lignes de tous les `h1`, `h2` et `h3` aux 6 tailles, en animé et en réduit : aucune ligne ne commence par `: ; ? ! »`, aucun titre ne déborde. « Craie : 320 assiettes » reste entier (`cap/b-1440-07.jpg`, `cap/h-360-03-ouvert.jpg`). |
| FIX-2, en-tête sur le hero | **fait** | Fond `rgb(27,25,23)` à 0 et à 764 px de défilement, puis clair en `is-solide`. Plus rien ne passe sous le logo (`cap/b-1440-02.jpg`, `cap/c-375-02.jpg`). |
| FIX-3, action hors du premier écran | **fait** | Bouton à y = 598–654 à 375 × 812 et à 375 × 667, à 588–645 à 360 × 740, et à 737–794 à 768 × 1024 (`cap/a-375x667-premier-ecran.jpg`, `cap/a-360x740-premier-ecran.jpg`). |
| FIX-4, un seul émail, une seule Galet | **fait** | Les six fiches forment enfin une seule famille : blanc crème, mouchetures brunes, bord brun, pied brut (`cap/b-1440-05.jpg`, `cap/b-1440-06.jpg`). Les tasses du mur s'appellent « Tasses d'essai ». Il reste un écart de forme entre la fiche et la table, voir FIX-23. |
| FIX-5, légendes fidèles | **fait** | « Gobelets et pichets, au séchage » ; le projet ouvert porte le cartel « Craie, au séchage avant émail », lisible (contraste mesuré sur les pixels : 6,6:1 en moyenne à 375, 11:1 à 1440). |
| FIX-6, méthode à contre-sens | **à moitié** | 04 (émaillage) et 05 (caisses) sont justes et beaux (`cap/b-1440-12.jpg`). Mais 01, 02 et 03 sont trois plans d'atelier en terre crue à la suite, et 02 « Commande » montre une main dans un seau de barbotine (`cap/b-1440-11.jpg`). |
| FIX-7, avis illustrés par l'atelier | **fait** | Trois tables servies : l'assiette creuse en salle, les tasses au comptoir, le plat au bistrot (`cap/b-1440-14.jpg`). C'est le meilleur bloc de la page après le hero. |
| FIX-8, doublons d'images | **fait, avec réserve** | Il n'y a plus de doublon de fichier. Mais il reste deux quasi-doublons : le vase Silo au tour du mur et celui du journal (même séance, même vase), et la Craie crue qu'on voit trois fois (vignette du hero, projet ouvert, ligne Craie de l'index). Voir FIX-21. |
| FIX-9, série d'essai | **fait** | « dans un de mes cinq émaux, chez vous sous huit jours » et « 160 € les quatre pièces, port compris, déduits ». Ça tient pour un potier. |
| FIX-10, mur à 1440 | **fait** | Il n'y a plus de demi-écran vide. Il reste une colonne droite vide d'environ 400 px sous « Vase Silo » (`cap/b-1440-04.jpg`), ce qui reste acceptable dans une galerie. |
| FIX-11, catalogue sur téléphone | **fait** | Deux fiches par ligne : le catalogue fait **1,32 écran** à 375 × 812 (`cap/c-375-06.jpg`). |
| FIX-12, « creux 16 cm » | **fait** | « Ø 28 cm · 50 cl ». |
| FIX-13, volumes | **fait** | Il ne reste qu'un volume, 604, qui est la somme des projets. |
| FIX-14, pied de page | **fait** | Inscription au journal (refus de « claire », puis « C'est noté. Premier numéro le mois prochain. »), Instagram, mentions et confidentialité en liens provisoires (`cap/d-06-pied-inscription.jpg`). |
| FIX-15, titres faibles et preuve sans visuel | **fait** | « Ce que les chefs demandent d'abord » et « Cet automne à l'atelier ». Le profil coté de l'assiette Craie en SVG est une très bonne idée de métier (`cap/b-1440-02.jpg`). |
| FIX-16, vignette du hero | **fait** | Plus de collision à 375 et à 360. À 768, le titre tient en deux lignes et l'ensemble est composé (`cap/a-768x1024-premier-ecran.jpg`). |
| FIX-17, « vous rappelle » | **fait** | « C'est noté, Claire. Bastien vous écrit cette semaine pour confirmer vos 4 pièces et l'émail. » |
| FIX-18, ce que seul le client fournit | **client** | Inchangé : vraies photos, fiches d'émail, avis, prix, adresse. |

Bilan : 15 FIX faits, 1 à moitié (FIX-6), 1 fait avec réserve (FIX-8), 1 qui revient au client (FIX-18).

---

## 2. Rapport de test

### 2.1 Les 5 premières secondes

**Ordinateur, 1440 × 900** (`cap/a-1440x900-premier-ecran.jpg`) et **1280 × 800** (`cap/a-1280x800-premier-ecran.jpg`). « Vos assiettes, tournées à Dieulefit. Les mêmes dans cinq ans. » Je vois mon grès moucheté servi sur ardoise, le bouton « Demander la série d'essai », et trois assurances. Claire comprend quoi, pour qui et quoi faire. Le prix n'est pas dans le hero, mais il est dans le catalogue, un écran plus bas.

**Téléphone, 375 × 812, 375 × 667 et 360 × 740** (`cap/a-375x812-premier-ecran.jpg`, `cap/a-360x740-premier-ecran.jpg`). Le titre, la photo, puis le bouton, entier dans le premier écran aux trois tailles. Le cartel et la vignette ne se touchent plus. **C'est réglé.**

**Tablette, 768 × 1024** (`cap/a-768x1024-premier-ecran.jpg`). Le titre tient en deux lignes pleine largeur, puis viennent l'image, l'action et le sous-titre. C'est composé, sans trou.

### 2.2 Le défilement

**Lent, à 1440** (18 captures, `cap/b-1440-01.jpg` à `cap/b-1440-18.jpg`) :

- **Preuve** : cinq maisons, trois chiffres et le profil coté. C'est sobre, et c'est du métier.
- **Mur** : le titre « Chaque maison a son émail. Je le garde en fiche. » est fort. Mais une seule photo sur trois est émaillée : les gobelets crus et le vase cru au tour ne montrent aucun émail.
- **Catalogue** : six fiches de la même famille d'émail, avec prix unitaire et prix en série, un bouton « Ajouter », et la barre d'essai collante. C'est ce que j'attendais.
- **Projet ouvert, le moment signature** : la photo s'agrandit bien. Mais elle montre la Craie **crue**, avec moi qui pose derrière la table, alors que le texte d'à côté dit « Deux réassorts en 2026, sans écart de teinte » (`cap/b-1440-08.jpg`). Le moment le plus fort de la page ne montre pas le service fini.
- **Index « Les tables servies depuis 2023 »** : les cinq images qui suivent le survol sont toutes des plans d'atelier en terre crue (assiettes crues, tasse au tour, bol cru, vase au tour, plaque au laminoir) (`cap/d-08-index-survol-galet.jpg`). On n'y voit pas une seule table, alors que le titre en promet cinq.
- **Méthode** : l'épinglage et la piste horizontale fonctionnent. Le titre est entier. 04 et 05 sont justes. 01 à 03 se ressemblent.
- **Atelier** : le portrait, la plaque au laminoir et trois faits. Juste.
- **Avis** : trois tables, trois chefs, trois phrases courtes. Excellent.
- **Journal** : une grande carte illustrée et deux cartes en texte, datées. Le « Réassort Silo » montre presque la même photo que le mur.
- **FAQ**, **demande** (en deux colonnes) et **pied de page** complet : propres.

**Rapide, à 1440** : rien ne saute, rien ne clignote, aucune section ne reste vide. Un seul accroc : au passage du hero au clair, l'en-tête traverse pendant environ 100 ms un gris où le texte se fond dans le fond (`cap/d-entete-transition-descente-790.jpg` ; mesure : texte `rgb(169,167,161)` sur fond `rgb(99,96,92)`, environ 2:1). C'est fugace, mais visible.

**Téléphone, 375 × 812** (20 captures, planches `cap/c-planche-375-1.jpg` et `cap/c-planche-375-2.jpg`). Aucun débordement. La barre d'action mobile apparaît après le hero et se cache sur le catalogue (qui a sa propre barre), sur la demande et sur le pied de page. La méthode se fait en glisser natif jusqu'à « Livraison » (`cap/e-06-mobile-methode-fin.jpg`). La page fait 19,5 écrans.

**768, 1280 et 360, section par section** (`cap/h-planche-768.jpg`, `cap/h-planche-1280.jpg`, `cap/h-planche-360.jpg`) : aucun titre cassé ni coupé. À 768, dans l'atelier, « Seconde cuisson » passe sur deux lignes et « 1 280 °C » descend sous les deux autres chiffres (`cap/h-768-05-atelier.jpg`). C'est un détail.

### 2.3 Le parcours de Claire

1. Dans le hero, « Voir les pièces » mène au catalogue. Mais la section arrive **160 px** sous le haut de l'écran, avec la légende « Tasses d'essai » coupée en haut (`cap/d-01-clic-voir-les-pieces.jpg`). C'est pareil pour tous les liens de la nav, à 1440 comme à 375, l'en-tête étant caché. La cause : le décalage est compté deux fois, `scroll-padding-top: 5rem` dans le CSS et `anchors.offset` de Lenis.
2. J'ajoute l'assiette plate, l'assiette creuse, le bol et le plat. Le compteur passe à « 4 / 4 », la tasse et la coupelle passent en « Complet » et sont désactivées (`cap/d-02-catalogue-4-choisies.jpg`).
3. « Demander l'essai » mène au formulaire, avec les mêmes quatre cases cochées et les deux autres grisées (`cap/d-03-clic-demander-essai.jpg`).
4. J'envoie le formulaire vide : trois erreurs, et le focus va sur « Votre nom » (`cap/d-04-formulaire-vide.jpg`). « claire@exemple » est refusé.
5. Je le remplis (Claire Montel, Le Comptoir, Montélimar, claire@comptoir.fr, 30 à 60) et je l'envoie. Réponse : « Bastien vous écrit cette semaine pour confirmer vos 4 pièces et l'émail. » (`cap/d-05-formulaire-confirmation.jpg`). Rien n'est envoyé.
6. La vignette « Vase Silo » du mur ouvre bien la ligne Silo (`cap/d-07-clic-vignette-silo.jpg`). Le curseur « Voir » apparaît sur les vignettes (`cap/d-10-curseur-voir.jpg`).
7. Sur téléphone : Menu, « 01 Pièces », puis l'ajout de deux pièces (« 2 / 4 ») ; la ligne Craie s'ouvre au toucher (`cap/e-01-menu-mobile.jpg` à `cap/e-04-mobile-projet-craie-ouvert.jpg`).

**Les chiffres concordent** :
- 604 = 320 + 120 + 90 + 14 + 60 ;
- 320 = 240 plates + 80 creuses ;
- réassort sous 3 semaines partout ;
- 40 pièces dans le hero et dans la FAQ ;
- 12 semaines pour Craie, dans les « 10 à 14 » ;
- essai de huit jours, plus deux semaines de service, égale « semaines 1 à 3 » ;
- 160 € port compris.

Je n'ai plus rien à redire sur les chiffres.

### 2.4 Le clavier (45 tabulations depuis le haut, 1440)

Dans l'ordre :

| Tabulations | Élément |
|---|---|
| 1 | lien d'évitement |
| 2 | logo |
| 3 à 7 | les cinq liens de la nav |
| 8 | « Série d'essai » |
| 9 et 10 | les deux actions du hero |
| 11 à 13 | les vignettes du mur, nommées par leur `alt` |
| 14 à 19 | les six « Ajouter », avec un `aria-label` explicite |
| 20 | la barre d'essai |
| 21 à 25 | l'index |
| 26 à 29 | la FAQ |
| 30 à 33 | les champs |
| 34 à 39 | les cases |
| 40 | l'envoi |
| 41 et 42 | l'inscription |
| 43 à 45 | le pied de page |

Tout est dans l'écran au focus, rien n'est couvert. Le contour fait 2 px en oxyde sur fond clair et 2 px en craie sur fond sombre ; les champs ont un filet épaissi et un fond teinté (`cap/f-tab-12.jpg`, `cap/f-tab-33.jpg`). C'est un sans-faute.

### 2.5 Le mouvement réduit

La page est complète et lisible : aucun élément de `main` à opacité 0, aucun épinglage, et la méthode s'affiche en grille (`cap/g-reduit-pleine-page-1440.jpg`, `cap/g-reduit-pleine-page-375.jpg`). Elle fait 16,3 écrans. Console vide.

### 2.6 L'œil du métier (relu comme Bastien)

| Où | Ce que je vois | Gravité |
|---|---|---|
| Projet ouvert (signature) | La Craie crue, au séchage, sous « 320 assiettes » et à côté de « sans écart de teinte ». La légende est honnête, mais le moment signature devrait finir sur le service émaillé, pas sur de la terre. | moyen |
| Index des projets | « Les tables servies depuis 2023 », et cinq images d'atelier en cru, sans une table. Le titre et les images se contredisent. | moyen |
| Fiche et table | **Tasse Galet** : au catalogue, un mug droit, haut, pied brut et mouchetures brunes ; au comptoir de Hugo (« deux tasses Galet »), des tasses à cappuccino rondes, mouchetées de noir, émaillées jusqu'au pied. **Plat Lavoir** : au catalogue, un plat crème peu moucheté, sans bord brun ; chez Sophie, un plat densément moucheté à bord brun. Un chef qui reçoit sa série d'essai fera la différence. | moyen |
| Mur | Une photo émaillée sur trois sous « Chaque maison a son émail ». | léger |
| Méthode 01 à 03 | Trois plans de tour et de terre crue à la suite. 02 « Commande, fiche d'émail à votre nom » montre une main dans la barbotine, pas une fiche. | léger |
| Journal | « Réassort Silo » (`serie-lisser`) et le « Vase Silo » du mur (`mur-silo`) : même vase, même séance, à huit écrans d'écart. | léger |
| Ce qui est juste | L'émaillage au trempé de l'assiette biscuitée, avec l'émail cru gris avant cuisson : c'est exact. Les caisses en bois calées au kraft. Le profil coté avec le pied et le bord épaissi. « Centrer, monter, tournasser. » Les 500 cycles à 85 °C, le réassort dès dix pièces, le stock tampon, l'acompte de 30 %. Aucun adjectif d'artisanat. | — |

### 2.7 La densité (script de `conventions.md` § 11, `compte-pane.js`, 1440 × 900)

| Mesure | Valeur | Cible |
|---|---|---|
| Mots, en animé comme en réduit | **796** (787 à 375) | 500–800 : il reste **4 mots** de marge |
| Sections dans `main` | **12** | 10–13 |
| Blocs de plus de 3 phrases | 0 (aucun bloc au-delà de 85 mots, la FAQ comptant quatre blocs) | 0 |
| Hauteur | 17,7 écrans en animé, 16,3 en réduit (19,5 à 375 × 812) | 12–18 à 1440 |
| Titres hors 4–10 mots | aucun | — |
| Sections sans visuel, hors FAQ et demande | aucune (la preuve a son profil SVG) | 0 |

Détail en mots : évitement 3, en-tête 12, œuvre 64, preuve 37, mur 31, pièces 103, ouvert 35, projets 62, méthode 76, atelier 43, avis 62, journal 59, FAQ 85, demande 77, pied 47. C'est identique à `NOTES.md` § 10.

Toutes les sections attendues sont là, et le pied de page est complet : coordonnées, plan, liens légaux, réseau, inscription. Il y a 28 images pour 796 mots.

### 2.8 Tailles, accessibilité, console

| Contrôle | Résultat |
|---|---|
| Débordement horizontal (6 tailles, animé et réduit) | 0 px |
| Interlettrage des titres | `normal`, lettres jamais collées |
| Console et réseau (12 chargements, plus les parcours) | Vides : aucune erreur, aucune requête échouée, aucun 404 |
| Cibles de moins de 24 px | Les cases à cocher (18 px, mais le libellé est cliquable), et dans le pied de page **le lien e-mail et Instagram (20 px de haut)** |
| Contraste signalé : texte `#f4f1ea` sur fond `#ece7df` | **Introuvable à l'écran en régime établi.** J'ai fait deux balayages. Le premier, sur le DOM, à 4 positions, à 1440 et à 375 : aucun texte craie dont le fond d'ancêtre est terre ou terre-2. Le second, sur le rendu, avec `elementsFromPoint` à chaque arrêt du défilement : aucun texte sous 4,5:1, hors faux positifs dus à la barre mobile posée par-dessus. J'ai aussi mesuré les pixels sous les cartels posés sur les photos : 3,4:1 au pire décile à 360, et 11 à 16:1 en moyenne à 1440. La source probable est le libellé « Voir » du curseur (`[data-cursor] span`, couleur craie) : son disque oxyde est un frère (`<i class="curseur-rond">`), pas un parent, donc un outil statique lit le fond du `body` (#ece7df). À l'écran, c'est craie sur oxyde (6,9:1), et l'élément est `aria-hidden`. Ce qu'on voit vraiment, c'est le **fondu gris de l'en-tête** (environ 2:1 pendant environ 100 ms), traité en FIX-25. |

---

## 3. Notes

### 3.1 Les 10 points à contrôler

| # | Point | OK ou Pas OK | Capture | Pourquoi |
|---|---|---|---|---|
| 1 | Page complète | OK | `cap/g-reduit-pleine-page-1440.jpg` | 12 sections, 796 mots, 0 bloc de plus de 3 phrases, pied de page complet, un visuel par section. |
| 2 | Catalogue, articles | OK | `cap/d-02-catalogue-4-choisies.jpg`, `cap/b-1440-15.jpg` | 6 fiches avec prix et ajout, reliées au formulaire ; 3 articles datés avec `<time>`, données prêtes pour un CMS. |
| 3 | Titres et promesse | OK | `cap/a-1440x900-premier-ecran.jpg` | Une promesse concrète, qui répond à l'objection n° 1. Seul « Les tables servies depuis 2023 » est contredit par ses images. |
| 4 | Typographie d'affichage | OK | `cap/b-1440-07.jpg`, `cap/a-360x740-premier-ecran.jpg` | Interlettrage `normal`, rien de collé à 1440 ni à 360. |
| 5 | Barre de navigation | OK | `cap/b-1440-02.jpg`, `cap/e-01-menu-mobile.jpg` | Logo, 5 liens, un bouton, aucun téléphone, fond plein sur le hero, menu mobile propre. Réserve : le fondu gris (FIX-25). |
| 6 | Blocs d'action, formulaires | OK | `cap/b-1440-17.jpg` | Deux colonnes, garanties à gauche, aucun numéro. |
| 7 | Hero équilibré | OK | `cap/a-1280x800-premier-ecran.jpg`, `cap/a-768x1024-premier-ecran.jpg` | Composé à toutes les tailles. |
| 8 | Responsive | OK | `cap/h-planche-768.jpg`, `cap/h-planche-360.jpg`, `cap/a-375x667-premier-ecran.jpg` | Aucun titre cassé ni coupé aux 6 tailles ; l'action est au premier écran partout. |
| 9 | Images et vidéos | OK, avec réserve | `cap/b-1440-05.jpg`, `cap/b-1440-14.jpg`, `cap/b-1440-08.jpg`, `cap/d-08-index-survol-galet.jpg` | Des photos partout, un seul émail au catalogue, des avis en salle. Réserve : le moment signature et l'index restent en terre crue, et Galet et Lavoir n'ont pas la même forme d'une image à l'autre. |
| 10 | 3D produit | Sans objet | — | Pas d'objet 3D. |

### 3.2 La grille sur 100 (`niveau-agence.md` § 6)

| Critère | Points | Tour 1 | Tour 2 | Pourquoi |
|---|---|---|---|---|
| Direction artistique | 15 | 12 | **13** | Grès et ardoise, un seul accent oxyde, Instrument Serif, cartels de musée, et le profil coté qui signe le métier. Les pièces forment enfin une famille. Il manque un point pour les trois plans crus à la suite (méthode, index) qui ternissent la galerie. |
| Images | 15 | 10 | **11** | Hero, catalogue, émaillage, caisses et avis : c'est fort. Le plafond provisoire est de 12 à 13. Je retire 1 à 2 points pour le moment signature en cru, l'index « tables servies » sans table, Galet et Lavoir qui changent de forme, et deux quasi-doublons. |
| Mise en page | 15 | 11 | **13** | La galerie est tenue de bout en bout. L'en-tête est réparé, le mur rempli, le catalogue mobile ramené à 1,3 écran. Il reste de petits vides : une colonne de 400 px sous Silo, et la méthode épinglée à 768 avec de grandes bandes vides en haut et en bas. |
| Mouvement | 10 | 8 | **9** | Un geste par section, le projet qui grandit, la piste horizontale, et un mouvement réduit complet. Le titre n'est plus cassé. Il perd un point pour le fondu gris de l'en-tête au passage du hero. |
| Clarté en 5 s, action | 10 | 8 | **9** | Quoi, pour qui et quoi faire en trois secondes, à toutes les tailles, avec l'action au premier écran. Le prix d'entrée n'arrive qu'au deuxième écran. |
| Densité | 5 | 4 | **5** | Le comptage est fourni et tout est dans la fourchette : 796 mots, 12 sections, 17,7 écrans. Le pied de page est complet et chaque section a son visuel. |
| Preuves et objections | 10 | 8 | **8** | Les cinq objections sont traitées et les chiffres concordent tous. C'est le plafond provisoire, avec des avis et des références inventés. |
| Textes | 10 | 8 | **8** | La voix est la mienne et les titres sont bons. Ils perdent deux points de cohérence texte-image : « Les tables servies » sur cinq plans crus, et « sans écart de teinte » à côté d'assiettes non émaillées. |
| Mobile, accessibilité, légèreté | 10 | 5 (plafond) | **9** | Plus de plafond : aucun titre cassé, 0 débordement, focus visible partout, 45 tabulations sans faute, console vide, images en webp avec `srcset`. Il perd un point pour les liens e-mail et Instagram à 20 px et pour les ancres qui arrivent 160 px trop bas. |
| **Total** | 100 | 74 | **85** | |

- **Note sur 10** : 8,5.
- **Seuil qui s'applique** : **85**. C'est une maquette aux médias provisoires (images générées, photos Pexels, avis et références inventés). Le seuil est **atteint, juste**.
- **Atteignable sans le vrai client** :
  - à **0 $** (FIX-20, 22, 24 à 27) : les titres accordés aux images, les ancres, le fondu de l'en-tête, les cibles du pied de page. Cela donne **86 à 87** (Textes 9, Mobile 10, Mouvement 10).
  - avec environ **0,20 à 0,35 $** de génération (FIX-19, 21, 23 : la Craie servie pour le projet ouvert, Galet et Lavoir accordés, une image de fiche d'émail) : « Images » monte à 12 ou 13, ce qui donne **88 à 89**.
  - 90 et plus demandent les vraies photos des services chez les clients et de vrais avis (FIX-18), à revérifier à la construction.

> « Cette fois, je reconnais mon atelier et ma vaisselle : un seul émail du catalogue jusqu'aux tables des chefs, et ma promesse tenue à toutes les tailles. Claire trouve le bouton sur son téléphone, choisit ses quatre pièces et sait ce que coûtent les 160 €. Ce qui me gêne encore, c'est que mon moment phare montre des assiettes crues, et mon index des "tables servies" pas une seule table. Ça, je le corrigerai avant de montrer la page à un chef. Mais la maquette, je la signe. »

**Verdict : Oui, ça vaut mes 25 000 €.** C'est au niveau d'une maquette à médias provisoires : 85 sur 85, sans aucun défaut bloquant. Les FIX-19 à 23 sont à faire avant la présentation au vrai client.

---

## 4. Plan de corrections restant

**Budget de mots** : 796 sur 800. Tout mot ajouté doit être retiré ailleurs ; recompter avec `compte-pane.js` après chaque correction.

| FIX | Gravité | Coût | Résumé |
|---|---|---|---|
| FIX-18 | — | **client** | Vraies photos des services, fiches d'émail, avis, prix, adresse (inchangé) |
| FIX-19 | moyen | **génération** environ 0,04 à 0,06 $ | Projet ouvert : finir sur la Craie émaillée, pas crue |
| FIX-20 | moyen | **0 $** (ou génération environ 0,15 $) | Index : le titre « Les tables servies » est contredit par cinq plans d'atelier crus |
| FIX-21 | léger | **génération** environ 0,04 à 0,08 $ (ou 0 $) | Quasi-doublons : Silo du journal ≈ Silo du mur ; la Craie crue trois fois |
| FIX-22 | léger | **0 $** | Méthode 02 « Commande » : une main dans la barbotine, pas une fiche |
| FIX-23 | moyen | **génération** environ 0,08 à 0,12 $ (ou 0 $) | Tasse Galet et plat Lavoir : même forme sur la fiche et à table |
| FIX-24 | léger | **0 $** | Les ancres arrivent 160 px trop bas (décalage compté deux fois) |
| FIX-25 | léger | **0 $** | En-tête : le fondu passe par un gris illisible (environ 2:1 pendant environ 100 ms) |
| FIX-26 | léger | **0 $** | Pied de page : lien e-mail et Instagram à 20 px de haut |
| FIX-27 | léger | **0 $** | À 768, les chiffres de l'atelier sont désalignés (« Seconde cuisson » sur deux lignes) |

### FIX-19 — Le moment signature finit sur de la terre crue (moyen, génération environ 0,04 à 0,06 $)

- **Quoi.** « Craie : 320 assiettes pour la Maison Ardoise » s'ouvre sur des assiettes crues et Bastien qui pose, à côté de « Deux réassorts en 2026, sans écart de teinte » (`cap/b-1440-08.jpg`). On voit la Craie crue trois fois sur la page, mais servie une seule fois, dans le hero.
- **Où.** `index.html:179` (image `ouvert-craie`) et `index.html:180` (cartel).
- **Comment.**
  - Générer une image en paysage 3:2, de la même série que `hero-table` : « stacks of Craie speckled white stoneware plates at the pass of a Lyon restaurant kitchen, chef plating, dense fine brown iron speckles, brown rim ». Puis cartel « **Craie**, au passe de la Maison Ardoise · 2025 » (même nombre de mots).
  - L'image `ouvert-craie` actuelle peut aller au journal, à la place du Silo (voir FIX-21).
  - Sans génération, 0 $ : remplacer « sans écart de teinte » par « même terre, même fiche » (`index.html:183`). C'est moins fort.

### FIX-20 — « Les tables servies depuis 2023 » sans une table (moyen, 0 $)

- **Quoi.** Les cinq images de l'index (Craie crue, tasse au tour, bol cru, vase au tour, plaque au laminoir) contredisent le titre (`cap/d-08-index-survol-galet.jpg`).
- **Où.** `index.html:194` (titre) et `index.html:197-227` (images).
- **Comment, à 0 $.** Changer le titre en « Cinq services, tournés depuis 2023 » (5 mots, même compte). Le geste de l'atelier devient alors juste.
- **Mieux, avec génération** (environ 0,03 $ par image, ou client). Remplacer au moins Galet et Lavoir par la pièce finie sur sa table. Attention aux doublons avec les avis : un autre cadrage, une autre table.

### FIX-21 — Quasi-doublons (léger, génération environ 0,04 à 0,08 $, ou 0 $)

- **Où.** Journal : `index.html:446` (`serie-lisser`), à comparer avec le mur : `index.html:133` (`mur-silo`). Craie crue : `index.html:84`, `index.html:179` et `index.html:199`.
- **Comment.**
  - Donner au « Réassort Silo » une image du vase **émaillé**, livré à Grignan (génération), ou l'image `ouvert-craie` libérée par FIX-19, avec un article retitré sur Craie (0 $).
  - L'article « 500 cycles de lave-vaisselle à 85 °C » gagnerait un visuel : un panier de lave-vaisselle pro chargé d'assiettes mouchetées (environ 0,04 $).

### FIX-22 — Méthode 02 « Commande » (léger, 0 $)

- **Quoi.** La légende parle d'acompte et de fiche d'émail, mais l'image montre une main dans un seau de barbotine. De 01 à 03, ce sont trois plans de tour et de terre à la suite (`cap/b-1440-11.jpg`).
- **Où.** `index.html:244`.
- **Comment.** À 0 $, intervertir 02 et le geste de l'atelier (`serie-etaler`, la plaque au laminoir, `index.html:259`), qui ne montre pas plus une fiche, mais casse au moins la répétition du tour. Mieux, avec environ 0,04 $ : générer « handwritten glaze recipe card pinned above the workbench, a fired speckled test tile clipped to it ». La même image peut servir à l'article « Pourquoi chaque émail a sa fiche » si elle n'est pas utilisée ici.

### FIX-23 — Galet et Lavoir changent de forme entre la fiche et la table (moyen, génération environ 0,08 à 0,12 $, ou 0 $)

- **Quoi.**
  - **Tasse Galet** : au catalogue, un mug droit de 25 cl, pied brut, mouchetures brunes ; au comptoir de Hugo, des tasses rondes, mouchetées de noir et émaillées jusqu'au pied (`cap/b-1440-06.jpg` contre `cap/b-1440-14.jpg`).
  - **Plat Lavoir** : au catalogue, un plat crème peu moucheté ; chez Sophie, un plat densément moucheté à bord brun.
  - La page vend « les mêmes dans cinq ans ».
- **Où.** Les données des fiches, `index.html:441` (tasse) et `index.html:443` (plat) ; les avis, `index.html:288` et `index.html:293`.
- **Comment.** Régénérer les deux fiches du catalogue à partir des pièces des avis : même forme, même densité de mouchetures, même bord brun. Le prompt commun est dans `medias-a-generer.md`, à 2 × 0,04 à 0,06 $. À 0 $ : nommer la fiche « Tasse 25 cl » sans « Galet », et retirer « Lavoir » de l'`alt` de l'avis du bistrot.

### FIX-24 — Ancres 160 px trop bas (léger, 0 $)

- **Quoi.** Chaque lien interne (nav, « Voir les pièces », menu mobile) laisse 160 px de la section précédente en haut de l'écran, alors que l'en-tête est caché (`cap/d-01-clic-voir-les-pieces.jpg`). C'est mesuré à 1440 et à 375.
- **Où.** `sablon.src.css:26` (`scroll-padding-top: 5rem`). Il s'ajoute à `anchors: { offset: -80 }` de Lenis (`gestes.js:280`, à ne pas modifier).
- **Comment.** Ajouter `html.lenis { scroll-padding-top: 0; }`. Lenis garde son décalage de 80 px, et le mouvement réduit (sans Lenis) garde les 5rem. Recompiler `sablon.css`.

### FIX-25 — Le fondu gris de l'en-tête (léger, 0 $)

- **Quoi.** Au passage du hero au clair, le fond et le texte s'interpolent ensemble en 0,3 s et se croisent dans un gris où le texte disparaît (`cap/d-entete-transition-descente-790.jpg`). C'est le seul faible contraste réellement visible à l'écran.
- **Où.** `sablon.src.css:64` (`transition: … background-color .3s, color .3s …`).
- **Comment.** Retirer `color .3s` et ramener `background-color` à `.12s`. Le texte bascule d'un coup, et le fond rattrape presque aussitôt. Autre solution : un fondu par opacité d'un pseudo-élément de fond, avec le texte en `mix-blend-mode` (plus lourd).

### FIX-26 — Cibles du pied de page (léger, 0 $)

- **Où.** `index.html:415`, et `sablon.src.css:356` et `sablon.src.css:367`.
- **Comment.** `.pied address a { display: inline-flex; align-items: center; min-height: 2.75rem; }`. Au besoin, passer `address` en `line-height: 1.4` pour ne pas trop l'allonger.

### FIX-27 — Chiffres de l'atelier à 768 (léger, 0 $)

- **Où.** `sablon.src.css:289-292`.
- **Comment.** Donner `align-items: end` à `.atelier-faits` et `min-height: 2lh` aux `dt`, ou mettre « Cuisson » à la place de « Seconde cuisson » (−1 mot, dans la marge). À contrôler à 768 et à 1024.
