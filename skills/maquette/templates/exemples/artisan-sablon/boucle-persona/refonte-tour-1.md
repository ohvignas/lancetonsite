# Boucle persona — Sablon, refonte, tour 1

- **Date** : 4 novembre 2026
- **Page testée** : http://127.0.0.1:4331/artisan-sablon/index.html (refonte du 4 novembre, 12 sections)
- **Regard indépendant** : les rapports du relecteur n'ont pas été lus, ni le tour `iteration-1` (ancienne page). Lus : `brief.md`, `NOTES.md`, `medias-a-generer.md`, `retours-utilisateur-2026-11-04.md`, `commun/boucle-persona.md`, `agents/client-persona.md`, `niveau-agence.md` § 6, `conventions.md` § 11.
- **Outil** : Playwright 1.58 avec Google Chrome. Tailles testées : 1440 × 900, 1280 × 800, 768 × 1024, 375 × 812, 375 × 667 et 360 × 740. Modes testés : animé et `prefers-reduced-motion: reduce`.
- **Captures** : `boucle-persona/refonte-tour-1-captures/` (chemins abrégés en `cap/` ci-dessous).
- **Note sur le serveur** : au premier passage, le serveur local a coupé des connexions (`ERR_CONNECTION_RESET` sur `gestes.js` et trois images, à 1440 comme à 360). Pour toutes les mesures, j'ai donc servi les fichiers du dossier depuis le disque, à la même URL, par interception Playwright. Ce n'est pas un défaut de la page, mais il ne faut pas faire la démo au client sur ce serveur.

Je suis Bastien Sablon. Je tourne seul à Dieulefit depuis 2014 et je vis surtout de la vaisselle des restaurants. Ensuite, je suis Claire : cheffe et copropriétaire d'un bistrot de 45 couverts à Montélimar. Je rouvre au printemps et ma peur, c'est la casse et le réassort.

---

## 1. Rapport de test

### 1.1 Les 5 premières secondes

**Ordinateur, 1440 × 900** (`cap/a-1440x900-premier-ecran.jpg`). Le premier écran me plaît vraiment :
- Le titre est fort et c'est le mien : « Vos assiettes, tournées à Dieulefit. Les mêmes dans cinq ans. »
- La grande photo montre enfin mon grès moucheté servi en salle : courge, poisson, ardoise.
- Le bouton « Demander la série d'essai » se voit, et les trois assurances aussi (dès 40 pièces, 10 à 14 semaines, lave-vaisselle pro).

Claire comprend en trois secondes : quoi (de la vaisselle en grès), pour qui (son restaurant), quoi faire (l'essai). Le prix n'est pas dans le hero, mais on le trouve deux écrans plus bas.

Le hero est équilibré : pas de vide au milieu, et la vignette fait le pont entre la colonne de texte et l'image. À 1280 × 800, c'est la même chose (`cap/a-1280x800-premier-ecran.jpg`).

Bémol : la vignette « Après cuisson : émail mat moucheté » montre une moitié d'assiette debout, presque sans mouchetures. Elle se lit comme un rectangle blanc, et ce n'est visiblement pas le même émail que le service Craie juste à côté.

**Téléphone, 375 × 812** (`cap/a-375x812-premier-ecran.jpg`). Le titre, puis la photo, puis le sous-titre.
- Le bouton commence à y = 761 px et mesure 57 px : il est **coupé par le bas de l'écran**.
- À 375 × 667 et à 360 × 740, il est **absent du premier écran** : il commence à y = 752 px (`cap/a-360x740-premier-ecran.jpg`). La barre d'action mobile n'apparaît qu'après le hero, donc Claire, sur son téléphone entre deux services, n'a aucune action sous les yeux.
- Dans la photo, le cartel « Service Craie · Maison Ardoise, Lyon · 2025 » et la légende de la vignette se marchent dessus (`cap/a-375-hero-zoom-x2.jpg`).

### 1.2 Le défilement

**Lent, à 1440** (18 captures, `cap/b-1440-01…17-*.jpg`).

- **En-tête sur le hero.** Dès qu'on défile dans le hero, l'en-tête reste transparent et passe sur le contenu. « Bastien Sablon · céramiste à Dieulefit » se superpose au titre « tournées à Dieulefit. », et les liens 01 et 02 passent sur la vignette (`cap/d-06-entete-sur-hero-scroll-300.jpg`, `cap/b-1440-01-preuve.jpg`). Même chose sur téléphone : le logo est illisible, superposé au sous-titre (`cap/c-375-01-zoom-entete.jpg`). C'est le premier geste que fait tout visiteur.
- **Preuve.** Cinq maisons et trois chiffres, avec un compteur. C'est propre. Le total « 604 pièces » est bien la somme des cinq projets (320 + 120 + 90 + 14 + 60).
- **Mur.** Le titre est beau : « Chaque maison a son émail. Je le garde en fiche. » Mais à 1440, le mur laisse de grands vides : toute la moitié droite est vide sur un écran entier (`cap/b-1440-03-mur.jpg`, `cap/i-rapide-1.jpg`). Et le titre parle d'émail, alors que trois des quatre photos montrent de la terre crue.
- **Catalogue.** Six fiches, chacune avec photo, nom, dimensions, deux prix HT et un bouton « Ajouter ». Une barre collante suit la série d'essai. C'est exactement ce qu'il fallait (`cap/b-1440-04-pieces.jpg`, `cap/b-1440-05-pieces.jpg`).
- **Projet ouvert, le moment signature.** « Craie : 320 assiettes pour la Maison Ardoise ». La photo s'agrandit jusqu'au plein écran et ça marche (`cap/b-1440-06-ouvert.jpg`, `cap/b-1440-07-ouvert.jpg`). Mais la photo montre des assiettes **crues**, sans légende, sous un titre qui parle d'un émail. Le retour client disait « trop simple jusqu'à Craie » : c'est corrigé, le haut de page est maintenant composé et riche.
- **Index des projets.** L'image suit le survol et l'accordéon fonctionne. La vignette « Vase Silo » du mur ouvre bien la ligne Silo (`cap/d-07-clic-vignette-silo.jpg`).
- **Méthode.** C'est le seul épinglage de la page, et la galerie horizontale défile bien (`cap/b-1440-09…11`). Mais le titre est **cassé** : en mode animé, les deux-points partent seuls en début de ligne, « au service complet / : 14 semaines ». J'ai mesuré la position des deux-points :
  - en mode animé, ils sont à gauche de la ligne suivante, à 1440, 1280, 375 et 360 (`cap/h-titre-methode-1440.jpg`, `cap/h-titre-methode-375.jpg`) ;
  - en mouvement réduit, ils restent bien collés à « complet ».

  C'est donc le découpage en lignes de SplitText qui casse l'espace insécable.
- **Atelier.** Un portrait, le geste au tour, et trois faits. C'est sobre et juste (`cap/b-1440-12-atelier.jpg`).
- **Avis.** Trois chefs nommés, des citations courtes et crédibles. Seule la photo d'Inès montre une assiette en salle. Celles d'Hugo et de Sophie me montrent moi, à l'atelier (`cap/b-1440-13-avis.jpg`).
- **Journal.** Trois cartes datées, avec `<time>` et des données prêtes pour un CMS. Mais deux des trois photos sont celles du mur, vues six écrans plus haut (`cap/b-1440-14-journal.jpg`).
- **FAQ.** Quatre questions, dans l'ordre des objections de Claire (`cap/b-1440-15-faq.jpg`, `cap/d-08-faq-ouverte.jpg`).
- **Demande.** Deux colonnes, avec le texte et les garanties à gauche et le formulaire à droite (`cap/b-1440-16-ecrire.jpg`). Le pied de page est propre (`cap/b-1440-17-ecrire.jpg`), mais il n'a ni réseaux, ni inscription au journal, et ses liens légaux ne mènent nulle part.

**Rapide, à 1440** (`cap/i-rapide-1…6.jpg`) : rien ne saute, rien ne clignote. Les révélations rattrapent le défilement, et aucune section ne reste vide.

**Téléphone, 375 × 812** (24 captures, planches `cap/c-375-planche-1…4.jpg`).
- Pas de débordement horizontal.
- Le menu plein écran est propre (`cap/e-01-menu-mobile.jpg`).
- Le catalogue occupe **6 écrans** à lui seul (une fiche par écran), et la barre « Série d'essai » collante couvre le bas des fiches.
- La page fait 20,2 écrans à 375 × 812.
- La méthode se fait en glisser natif et la piste va jusqu'à la livraison (`cap/e-05-mobile-methode.jpg`, `cap/e-06-mobile-methode-fin.jpg`).
- Le titre de la méthode est cassé ici aussi (« : 14 semaines »).

### 1.3 Le parcours de Claire, jusqu'à la demande d'essai

1. Dans le hero, « Voir les pièces » mène au catalogue (`cap/d-01-clic-voir-les-pieces.jpg`).
2. J'ajoute l'assiette plate, l'assiette creuse, le bol et le plat. Le compteur passe à « 4 / 4 », la tasse et la coupelle passent en « Complet » et sont désactivées (`cap/d-02-catalogue-4-choisies.jpg`). C'est bien fait.
3. « Demander l'essai » mène au formulaire. Les cases sont déjà cochées comme dans le catalogue, et les deux autres sont grisées (`cap/d-03-clic-demander-essai.jpg`).
4. J'envoie le formulaire vide. Trois erreurs claires s'affichent et le focus va sur « Votre nom » (`cap/d-04-formulaire-vide-erreurs.jpg`). L'adresse « claire@exemple » est refusée, à juste titre.
5. J'envoie le formulaire rempli (Claire Montel, Le Comptoir, Montélimar, claire@comptoir.fr, 30 à 60 couverts). Réponse : « C'est noté, Claire. Bastien vous rappelle cette semaine pour confirmer vos 4 pièces et l'émail. » (`cap/d-05-formulaire-confirmation.jpg`). Rien n'est envoyé. « Vous rappelle » sonne faux quand on a donné un e-mail.
6. Sur téléphone, Menu puis « 01 Pièces », puis l'ajout d'une assiette : tout fonctionne (`cap/e-02-menu-vers-pieces.jpg`, `cap/e-03-mobile-ajout-assiette.jpg`). Une ligne de projet s'ouvre au toucher (`cap/e-04-mobile-projet-craie-ouvert.jpg`).

**Les chiffres concordent-ils ?**

Ce qui tient :
- 604 = la somme des projets ;
- 320 = 240 plates + 80 creuses ;
- « 3 semaines » de réassort, partout ;
- 40 pièces, dans le hero comme dans la FAQ ;
- 14 semaines dans la méthode, cohérent avec les « 10 à 14 semaines » du hero et les « 12 semaines » de Craie.

Ce qui accroche :
- **Série d'essai à 160 €.** Le prix est fixe, alors que quatre coupelles valent 64 € et quatre plats 192 €. Rien ne dit ce que les 160 € couvrent.
- **Essai « semaines 1 à 3 », dont deux de service.** Il reste une semaine pour fabriquer quatre pièces « dans l'émail choisi ». Je ne sais pas faire ça : le séchage seul prend une semaine, et il faut ensuite deux cuissons. Il faut dire que l'essai se fait dans un de mes cinq émaux déjà en fiche, ou allonger le délai.
- **Volumes.** « 1 200 pièces par an » à l'atelier, mais « 604 pièces livrées depuis 2023 » : les restaurants feraient moins de 20 % de mon volume, alors que c'est mon premier métier.

### 1.4 Le clavier (40 tabulations depuis le haut, 1440)

Tout est atteint, dans l'ordre, et tout est visible au focus, sans aucun élément couvert. Le détail :
- tab 1 : lien d'évitement ;
- tab 2 : logo ;
- tabs 3 à 7 : les cinq liens de la nav ;
- tab 8 : « Série d'essai » ;
- tabs 9 et 10 : les deux actions du hero ;
- tabs 11 à 13 : les vignettes du mur ;
- tabs 14 à 19 : les six « Ajouter » ;
- tab 20 : la barre d'essai ;
- tabs 21 à 25 : les cinq projets ;
- tabs 26 à 29 : les quatre questions ;
- tabs 30 à 39 : les champs et les cases ;
- tab 40 : l'envoi.

Le contour fait 2 px en oxyde sur fond clair et 2 px en craie sur fond sombre. Les champs n'ont pas de contour, mais un filet épaissi et un fond teinté, qui se voient (`cap/f-tab-33.jpg`, `cap/f-tab-12.jpg`). Échap ferme le menu mobile et rend le focus au bouton. C'est un sans-faute.

### 1.5 Le mouvement réduit

La page est complète et lisible (`cap/g-reduit-planche.jpg`, pleine page `cap/g-reduit-pleine-page-1440.jpg`). Aucun élément ne reste invisible, aucun épinglage, et la méthode s'affiche en grille (`cap/g-reduit-methode-1440.jpg`). La page fait 16,1 écrans. Le titre de la méthode y est correct.

### 1.6 L'œil du métier (relu comme Bastien)

| Où | Ce que je vois | Gravité |
|---|---|---|
| Hero, catalogue, avis | La promesse, c'est « les mêmes dans cinq ans ». Or je vois **quatre blancs mouchetés différents** sous le même nom « Mat moucheté » : Craie, très moucheté brun (hero) ; assiette plate, presque unie (catalogue et vignette) ; assiette creuse, bord brun (catalogue) ; plat Lavoir, crème à grosses taches. Un chef le voit, et c'est précisément ce que je promets d'éviter. | majeur |
| Mur et catalogue | « Tasses Galet » désigne deux tasses différentes : blanches mouchetées de noir, entièrement émaillées, dans le mur ; trempées à mi-hauteur, pied brut beige, dans le catalogue. | majeur |
| Mur, grande image | La légende dit « Bols Source, avant cuisson », mais la photo montre des gobelets et de petits pichets à bec, pas un seul bol. | moyen |
| Projet ouvert Craie | Des assiettes crues, sans légende, sous « 320 assiettes » et « sans écart de teinte ». | moyen |
| Méthode | Étape 02 « Commande » : un bol au tour. Étape 04 « Émail et cuissons » : un vase cru en train d'être tourné. Étape 05 « Livraison » : des assiettes crues. Aucune photo d'émaillage, de four ni de caisse. | moyen |
| Avis | Hugo (Café Remous) et Sophie (Bistrot du Lavoir) sont illustrés par moi au tour et au laminoir, pas par leurs tables. | moyen |
| Catalogue | « Assiette creuse à aile · Ø 28 cm · creux 16 cm » : « creux 16 cm » ne veut rien dire. Un creux de 16 cm, c'est un saladier. Il faut le diamètre du fond, la hauteur ou la contenance. La photo montre d'ailleurs une assiette peu creuse. | léger |
| Images | **Sept images servent deux fois** : assiette (hero et catalogue), bol (catalogue et méthode), index-source (projets et méthode), index-craie (projets et méthode), index-galet (projets et avis), barbotine et tasses (mur et journal). | moyen |
| Ce qui est juste | Le grès à 1 280 °C en seconde cuisson ; les 500 cycles à 85 °C ; « centrer, monter, tournasser » ; l'acompte de 30 % ; la livraison « par vingt, en caisses » ; le réassort dès dix pièces ou le stock tampon ; les bords épaissis pour l'empilage. Les mots sont les miens et il n'y a pas un adjectif d'artisanat. Les avis inventés sont crédibles, je ne les pénalise pas. | — |

### 1.7 La densité (script de `conventions.md` § 11, 1440 × 900)

| Mesure | Valeur | Cible |
|---|---|---|
| Mots, en animé comme en réduit | **793** | 500–800 (il reste 7 mots de marge) |
| Sections dans `main` | **12** | 10–13 |
| Blocs de plus de 3 phrases | **0** | 0 |
| Hauteur | 17,4 écrans en animé, 16,1 en réduit ; 20,2 à 375 × 812 | 12–18 |
| Titres hors 4–10 mots | « Avant de commander » (3 mots) | 4–10 |
| Sections sans visuel (hors FAQ et appel final) | `#preuve` (texte seul) | 0 |

Détail en mots :

| Bloc | Mots |
|---|---|
| Évitement | 3 |
| En-tête | 12 |
| Œuvre | 66 |
| Preuve | 37 |
| Mur | 33 |
| Pièces | 104 |
| Ouvert | 30 |
| Projets | 62 |
| Méthode | 72 |
| Atelier | 43 |
| Avis | 62 |
| Journal | 60 |
| FAQ | 82 |
| Demande | 74 |
| Pied | 53 |

`NOTES.md` annonce 782 mots, mais le pied de page compte 11 mots de plus qu'annoncé (les crédits ont changé).

Sections attendues :

| Section | Présente |
|---|---|
| Hero | ✓ |
| Preuve | ✓ |
| Offre et catalogue | ✓ |
| Comment ça marche | ✓ |
| Qui on est | ✓ |
| Témoignages | ✓ |
| Articles | ✓ |
| Tarifs (prix au catalogue) | ✓ |
| FAQ | ✓ |
| Appel final | ✓ |
| Pied de page complet | **à moitié** : pas de réseaux ; pas d'inscription, alors que le métier publie un journal ; mentions sans lien |

Il y a plus de visuels que de texte : 31 images pour 793 mots.

### 1.8 Les tailles et la console

| Contrôle | Résultat |
|---|---|
| Débordement horizontal (1440, 1280, 768, 375, 360) | 0 px |
| Interlettrage des titres | `normal`. Les lettres ne sont jamais collées, à 1440 comme à 375. |
| À 768 × 1024 | Le titre du hero n'occupe que 327 px sur 688, le reste à droite est vide. La vignette couvre une assiette de la photo (`cap/a-768x1024-premier-ecran.jpg`). |
| Console, avec les fichiers servis correctement | Vide, en animé comme en réduit, à toutes les tailles |
| Cibles tactiles de moins de 40 px | Les cases à cocher (18 px, mais leur libellé est cliquable), les liens du pied (36 px de haut) et le lien e-mail (20 px) |

---

## 2. Notes

### 2.1 Les 10 points à contrôler

| # | Point | OK ou Pas OK | Capture | Pourquoi |
|---|---|---|---|---|
| 1 | Page complète | OK (réserve) | `cap/g-reduit-planche.jpg` | 12 sections, 793 mots, aucun bloc de plus de 3 phrases, plus de visuels que de texte. Réserve : pied de page incomplet, et la preuve n'a pas de visuel. |
| 2 | Catalogue, articles | OK | `cap/d-02-catalogue-4-choisies.jpg`, `cap/b-1440-14-journal.jpg` | 6 fiches avec photo, prix et ajout, reliées au formulaire ; 3 articles datés, données prêtes pour un CMS. |
| 3 | Titres et promesse | OK | `cap/a-1440x900-premier-ecran.jpg` | La promesse est concrète et répond à l'objection n° 1. Deux titres restent faibles : « Avant de commander », « Le journal de l'atelier ». |
| 4 | Typographie d'affichage | OK | `cap/b-1440-06-ouvert.jpg`, `cap/a-375x812-premier-ecran.jpg` | Interlettrage à `normal`, lettres jamais collées. |
| 5 | Barre de navigation | **Pas OK** | `cap/d-06-entete-sur-hero-scroll-300.jpg`, `cap/c-375-01-zoom-entete.jpg` | La structure est juste : logo, 5 liens, bouton, aucun téléphone, menu mobile propre. Mais l'en-tête transparent passe sur le titre et l'image du hero dès qu'on défile, et le logo devient illisible. |
| 6 | Blocs d'action, formulaires | OK | `cap/b-1440-16-ecrire.jpg` | Deux colonnes, garanties à gauche, aucun numéro de téléphone. |
| 7 | Hero équilibré | OK | `cap/a-1440x900-premier-ecran.jpg`, `cap/a-1280x800-premier-ecran.jpg` | Composé, pas de vide au milieu à 1440 ni à 1280. |
| 8 | Responsive | **Pas OK** | `cap/h-titre-methode-1440.jpg`, `cap/h-titre-methode-375.jpg`, `cap/a-360x740-premier-ecran.jpg` | Le titre de la méthode est cassé (« : 14 semaines » en début de ligne) à 1440, 1280, 375 et 360. L'action est hors du premier écran à 375 × 667 et 360 × 740, et coupée à 375 × 812. |
| 9 | Images et vidéos | **Pas OK** | `cap/b-1440-05-pieces.jpg`, `cap/b-1440-02-mur.jpg`, `cap/b-1440-10-?.jpg`, `cap/b-1440-13-avis.jpg` | Il y a des photos partout, mais elles se contredisent : quatre émaux différents sous un même nom, deux « Tasses Galet », des « bols » qui sont des pichets, une méthode illustrée à contre-sens, des avis illustrés par l'atelier, 7 doublons. |
| 10 | 3D produit | Sans objet | — | Pas d'objet 3D. |

### 2.2 La grille sur 100 (`niveau-agence.md` § 6)

| Critère | Points | Note | Pourquoi |
|---|---|---|---|
| Direction artistique | 15 | **12** | On la reconnaît sans le logo : grès cru et ardoise, un seul accent oxyde, Instrument Serif, cartels de musée, alternance clair et sombre. Elle est tenue de bout en bout. Elle perd des points parce que les pièces ne forment pas une seule famille d'émail. |
| Images | 15 | **10** | Le hero généré est excellent et le catalogue est enfin émaillé. Mais l'œil du métier relève quatre émaux pour un seul nom, deux Galet, des « bols » qui sont des pichets, la méthode et deux avis à contre-sens, et 7 doublons. Le plafond provisoire est de 12 à 13. |
| Mise en page | 15 | **11** | La composition galerie est suivie : mur, catalogue en cartels, projet ouvert, index, série horizontale, demande en deux colonnes. Elle perd des points pour le mur à 1440 (une demi-largeur vide sur un écran), l'en-tête qui chevauche le hero et le catalogue qui fait 6 écrans sur téléphone. |
| Mouvement | 10 | **8** | Il y a un geste par section : révélations, lignes du titre, compteur, parallaxe, inclinaison, curseur « Voir », image qui suit l'index, galerie épinglée, et un projet qui s'agrandit, le moment signature, qui fonctionne. Le mouvement réduit est complet et le défilement rapide est propre. Il perd des points parce que SplitText casse le titre de la méthode. |
| Clarté en 5 s, action | 10 | **8** | Sur ordinateur, c'est parfait. Sur téléphone, l'action est coupée ou absente du premier écran, et la barre mobile n'apparaît qu'après le hero. |
| Densité | 5 | **4** | Le comptage est fourni et tout est dans la fourchette, sans pénalité. Il manque une partie du pied de page (réseaux, inscription), la preuve n'a pas de visuel, et il ne reste que 7 mots de marge. |
| Preuves et objections | 10 | **8** | Les cinq objections ont leur réponse et 604 = la somme des projets. Ça accroche sur l'essai en une semaine « dans l'émail choisi », sur les 160 € sans explication et sur « 1 200 pièces par an » face à 604 en trois ans. Le plafond provisoire est d'environ 8. |
| Textes | 10 | **8** | Le titre du hero est le meilleur de toute la série. La voix est à la première personne, sans adjectif creux. Il perd des points pour « creux 16 cm », pour le mur qui parle d'émail sur de la terre crue, pour deux titres faibles et pour « vous rappelle » après un e-mail. |
| Mobile, accessibilité, légèreté | 10 | **5** (plafond) | Le travail est réel : 0 débordement, focus visible partout, 40 tabulations sans faute, Échap qui rend le focus, console vide, images de 14 à 236 Ko. J'aurais mis 7. Mais **un titre cassé à une des tailles de capture plafonne à 5** (règle du § 6), et l'action manque au premier écran des petits téléphones. |
| **Total** | 100 | **74** | |

- **Note sur 10** : 7,4.
- **Seuil qui s'applique** : **85**. C'est une maquette aux médias provisoires : 4 images générées, des photos Pexels et des avis inventés.
- **Atteignable sans le vrai client.** Les corrections à 0 $ (FIX-1 à 3, 5, 9 à 17) remontent la note vers **85 à 87** :
  - « Mobile » remonte à 8 une fois le titre réparé et l'action remontée ;
  - « Mise en page » passe à 12 ou 13 ;
  - « Clarté » passe à 9 ;
  - « Preuves » et « Textes » prennent chacun +0,5 à +1.

  Avec environ 0,35 à 0,50 $ de génération (FIX-4, 6 et 7 : un seul émail pour tout le catalogue, la méthode et les avis illustrés juste), « Images » monte à 12 ou 13, ce qui donne **88 à 90**. Au-delà, il faut les vraies photos des services chez les clients et de vrais avis (FIX-18).

> « Le haut de page, je le signe tout de suite : c'est mon assiette, servie, avec ma promesse. Mais toute ma page dit "les mêmes dans cinq ans", et mes propres photos montrent quatre blancs différents et deux tasses Galet qui ne se ressemblent pas. Un chef le verra avant moi. Ajoutez l'en-tête qui passe sur mon titre et les deux-points qui tombent tout seuls à la ligne : c'est presque ça, mais pas encore 25 000 €. »

**Verdict : Pas encore.** La promesse « les mêmes dans cinq ans » est contredite par les photos : quatre émaux sous un même nom, deux tasses Galet. À cela s'ajoutent un titre cassé, l'en-tête qui chevauche le hero, et l'action absente du premier écran sur les petits téléphones.

---

## 3. Plan de corrections

Classé par impact. **Budget de mots** : 793 sur 800. Tout mot ajouté par un FIX doit être retiré ailleurs. Recompter avec le script du § 11 après correction.

| FIX | Gravité | Coût | Résumé |
|---|---|---|---|
| FIX-1 | majeur | **0 $** | Titre de la méthode cassé par SplitText : les deux-points partent seuls à la ligne |
| FIX-2 | majeur | **0 $** | L'en-tête transparent passe sur le titre et l'image du hero au défilement |
| FIX-3 | majeur | **0 $** | L'action principale n'est pas dans le premier écran des téléphones |
| FIX-4 | majeur | **génération** environ 0,15 à 0,25 $ (ou **client**) | Un seul émail visible pour tout le service, et une seule tasse Galet |
| FIX-5 | moyen | **0 $** | Des légendes fidèles aux photos : « Bols Source », Craie crue |
| FIX-6 | moyen | **génération** environ 0,06 à 0,12 $ (ou 0 $ en réaffectant) | Méthode : chaque étape illustrée par son geste |
| FIX-7 | moyen | **génération** environ 0,06 $ (ou 0 $) | Avis : montrer les tables des chefs, pas l'atelier |
| FIX-8 | moyen | **0 $** | Supprimer les 7 doublons d'images |
| FIX-9 | moyen | **0 $** | Série d'essai : dire l'émail, le délai réel et ce que couvrent les 160 € |
| FIX-10 | moyen | **0 $** | Mur à 1440 : combler la demi-largeur vide |
| FIX-11 | moyen | **0 $** | Catalogue sur téléphone : de 6 écrans à 3 |
| FIX-12 | léger | **0 $** | « creux 16 cm » : donner une cote de métier |
| FIX-13 | léger | **0 $** | Accorder « 604 depuis 2023 » et « 1 200 pièces par an » |
| FIX-14 | léger | **0 $** | Pied de page complet : réseaux, inscription au journal, liens légaux |
| FIX-15 | léger | **0 $** | Renforcer « Avant de commander » et « Le journal de l'atelier » ; donner un visuel à la preuve |
| FIX-16 | léger | **0 $** | Hero : la vignette et sa légende (375, 768) |
| FIX-17 | léger | **0 $** | Confirmation : « vous répond », pas « vous rappelle », si l'on a donné un e-mail |
| FIX-18 | — | **client** | Vraies photos des services chez les clients, vrais avis, vrais prix et vraie adresse |

### FIX-1 — Titre de la méthode cassé (majeur, 0 $)

- **Quoi.** En mode animé, SplitText découpe le titre en lignes et laisse « : 14 semaines » en début de ligne. C'est le cas à 1440, 1280, 375 et 360 ; en réduit, c'est correct. C'est un titre cassé : la note « Mobile » est plafonnée à 5.
- **Où.** `index.html:234`, `<h2 id="titre-methode" … data-split="lines">De la série d'essai au service complet&nbsp;: 14 semaines</h2>`.
- **Comment.** Supprimer les deux-points, ce qui est le plus sûr avec SplitText : « Quatorze semaines, de l'essai au service complet » (7 mots, −2 mots). Sinon, envelopper `complet&nbsp;:` dans un `<span style="white-space:nowrap">`. Vérifier aussi `#titre-ouvert` (« Craie&nbsp;: 320… », `index.html:173`) à 768 et 360, puis recapturer les cinq tailles en animé.

### FIX-2 — L'en-tête chevauche le hero (majeur, 0 $)

- **Quoi.** Entre 0 et environ 765 px de défilement, l'en-tête reste transparent. Le logo se superpose au titre du hero et les liens passent sur la vignette et la photo (`cap/d-06…`, `cap/c-375-01-zoom-entete.jpg`).
- **Où.** `sablon.src.css:63` (`.entete`), et le seuil `is-solide` de `gestes.js:127` (ce fichier est une copie figée du kit : ne pas le modifier).
- **Comment.** Donner à l'en-tête non solide le fond du hero : `.entete { background: var(--color-four); }`, avec le filet `box-shadow: 0 1px 0 rgb(244 241 234 / .08)`. Le hero étant sombre, le rendu ne change pas en haut de page, et rien ne passe plus dessous. Garder `.is-solide` pour le passage au clair. Recompiler `sablon.css`.

### FIX-3 — Action hors du premier écran sur téléphone (majeur, 0 $)

- **Quoi.** À 375 × 812, le bouton est coupé (y = 761 à 818). À 375 × 667 et 360 × 740, il est absent. La barre mobile n'apparaît qu'après `#oeuvre`.
- **Où.** `sablon.src.css:110-115` (ordre mobile du hero) et `index.html:416` (`data-sticky-cta="#oeuvre"`).
- **Comment.** Sous 1024 px, mettre `.hero-actions` en `order: 4` et `.hero-sous` en `order: 5`. Ramener `.hero-oeuvre` à `margin-bottom: 1rem` et `.hero-sous` à `margin-top: 1.5rem`. Le bouton arrive alors vers y = 610 à 375 × 812, et dans l'écran à 360 × 740. Autre solution : faire apparaître la barre mobile dès le chargement, ancrée sur `#preuve`. Vérifier à 375 × 667.

### FIX-4 — Un seul émail, une seule tasse Galet (majeur, génération environ 0,15 à 0,25 $, ou client)

- **Quoi.** « Mat moucheté » désigne quatre émaux visiblement différents (hero Craie, assiette plate, assiette creuse, plat Lavoir). « Tasses Galet » désigne deux tasses différentes, celle du mur et celle du catalogue. La page vend la constance : c'est l'objection n° 1 de Claire.
- **Où.** `images/piece-assiette-*`, `piece-bol-*`, `piece-tasse-*`, `piece-coupelle-*` (données dans `index.html:426-430`), `images/mur-galet-*` (`index.html:130-132`). La vignette du hero réutilise `piece-assiette` (`index.html:83`).
- **Comment.** Régénérer les 4 fiches Pexels dans la même série que `piece-plat` et `piece-creuse`, avec le prompt commun de `medias-a-generer.md`, et préciser « same glaze as hero : dense fine brown iron speckles » : 4 × 0,03 à 0,06 $. Pour Galet, garder une seule tasse : soit la fiche catalogue est la tasse émaillée du mur, soit la légende du mur devient « Tasses d'essai, émaillées ». Sans génération : retirer « Mat moucheté » des fiches qui ne sont pas Craie et nommer chaque émail (« Craie », « Galet », « Lavoir »), pour que les différences deviennent des choix.

### FIX-5 — Légendes fidèles (moyen, 0 $)

- **Quoi.** La grande image du mur (« Bols Source, avant cuisson ») montre des gobelets et des pichets à bec. Le projet ouvert Craie montre des assiettes crues, sans légende, sous « sans écart de teinte ».
- **Où.** `index.html:118-120` et `index.html:175-177`.
- **Comment.** Changer la légende du mur en « **Gobelets et pichets**, au séchage · 2024 », sans nommer Source, et faire pointer le lien vers `#projets`. Ajouter au projet ouvert une `<figcaption class="cartel">Craie, au séchage : 40 assiettes avant émail</figcaption>` (+7 mots, à compenser par FIX-1).

### FIX-6 — Méthode illustrée à contre-sens (moyen, génération environ 0,06 à 0,12 $, ou 0 $)

- **Quoi.**
  - 02 « Commande » montre un bol au tour.
  - 04 « Émail et cuissons » montre un vase cru en train d'être tourné.
  - 05 « Livraison » montre des assiettes crues.
- **Où.** `index.html:240`, `index.html:242`, `index.html:243`.
- **Comment, à 0 $ :**
  - 02 : `mur-detail` (« la fiche, c'est la recette ») ou le portrait ;
  - 04 : `mur-galet` (des pièces émaillées) ;
  - 05 : un recadrage de `hero-table` (le service livré et servi).

  **Avec génération** : deux images de la même séance, « dipping a bisque plate into white glaze » et « wooden crates of glazed speckled plates stacked by twenty », environ 0,03 à 0,06 $ chacune.

### FIX-7 — Avis illustrés par l'atelier (moyen, génération environ 0,06 $, ou 0 $)

- **Quoi.** Les avis d'Hugo Ferrand et de Sophie Arnaud montrent Bastien au tour et au laminoir.
- **Où.** `index.html:284` et `index.html:289`.
- **Comment.** À 0 $ : pour Hugo, `mur-galet` (tasses émaillées), et pour Sophie, `piece-plat` (le plat Lavoir). Attention aux doublons de FIX-8. Mieux : générer « Galet cups on a café counter » et « Lavoir platter served on a bistro table », environ 0,03 $ chacune.

### FIX-8 — Sept doublons d'images (moyen, 0 $)

- **Quoi.** Sept images servent deux fois :
  - `piece-assiette` : hero et catalogue ;
  - `piece-bol` : catalogue et méthode ;
  - `index-source`, `index-craie` : projets et méthode ;
  - `index-galet` : projets et avis ;
  - `mur-detail`, `mur-galet` : mur et journal.
- **Où.** `index.html:83`, `index.html:239-243`, `index.html:284`, et les données `JOURNAL` (`index.html:435-436`).
- **Comment.** La séance Yan Krukov sur Pexels compte bien plus de plans que les 17 retenus. Prendre d'autres plans (gratuits) pour le journal et la méthode, avec le même étalonnage (`NOTES.md` § 5). Après FIX-4 et FIX-6, viser 0 doublon.

### FIX-9 — Série d'essai : émail, délai, prix (moyen, 0 $)

- **Quoi.** L'essai occupe les « semaines 1 à 3 », dont deux de service, et se fait « dans l'émail choisi » : c'est infaisable pour une recette neuve. Les 160 € fixes ne disent pas ce qu'ils couvrent, alors que quatre pièces valent de 64 à 192 €.
- **Où.** `index.html:239` (étape 01), `index.html:152` (barre d'essai) et `index.html:343` (demande).
- **Comment.**
  - Étape 01 : « Quatre pièces dans un de mes cinq émaux, chez vous sous huit jours. »
  - Demande : « 160 € les quatre pièces, port compris, déduits de votre commande. »
  - Compenser les mots ajoutés (FIX-1 libère 2 mots ; raccourcir le sous-titre du hero).

### FIX-10 — Mur à 1440 (moyen, 0 $)

- **Quoi.** La moitié droite est vide sur un écran entier (`cap/b-1440-03-mur.jpg`, `cap/i-rapide-1.jpg`).
- **Où.** `sablon.src.css:150-154`.
- **Comment.** Passer `.mur-detail` en `grid-column: 9 / 13; grid-row: 2; margin-top: 4rem`, et `.mur-galet` en `grid-column: 2 / 8`. Réduire le `margin-top` de `.mur-silo` de 9rem à 5rem. Le mur doit tenir en 1,5 écran sans trou de plus de 300 px.

### FIX-11 — Catalogue sur téléphone (moyen, 0 $)

- **Quoi.** 6 fiches pleine largeur font 6 écrans, et la barre collante couvre le bas des fiches.
- **Où.** `sablon.src.css:158-159` et `sablon.src.css:177`.
- **Comment.** Sous 640 px, passer à `grid-template-columns: repeat(2, minmax(0,1fr)); gap: 1.5rem .75rem`, avec un nom en 1,125rem, les prix sur une ligne et un bouton « + » plein largeur. Ou faire une piste horizontale en glisser natif, comme la méthode. Donner à la barre collante un `padding` réduit et `bottom: .5rem`.

### FIX-12 — « creux 16 cm » (léger, 0 $)

- **Où.** `index.html:427`.
- **Comment.** Écrire `dims: "Ø 28 cm · 50 cl"` ou `"Ø 28 cm · fond Ø 16 cm"`.

### FIX-13 — Volumes (léger, 0 $)

- **Où.** `index.html:102` et `index.html:267`.
- **Comment.** Écrire « pièces livrées **aux restaurants** depuis 2023 » et garder 1 200, ou ramener l'atelier à « 600 pièces par an ». Dans les deux cas, les deux chiffres doivent se lire ensemble sans calcul.

### FIX-14 — Pied de page complet (léger, 0 $)

- **Quoi.** Pas de réseaux. Pas d'inscription, alors que le métier publie un journal. « Mentions légales · Confidentialité » sans lien.
- **Où.** `index.html:391-414`.
- **Comment.**
  - Ajouter « Instagram » (lien provisoire) dans la colonne Atelier.
  - Ajouter un champ e-mail d'une ligne, « Le journal, une fois par mois », dans la colonne Crédits.
  - Raccourcir les crédits à « Photos : Pexels et images générées », pour rester sous 800 mots.
  - Transformer les deux mentions en `<a href="#">`.

### FIX-15 — Titres faibles et preuve sans visuel (léger, 0 $)

- **Où.** `index.html:316`, `index.html:299` et `index.html:91-107`.
- **Comment.**
  - « Avant de commander » devient « Ce que les chefs me demandent d'abord » (6 mots).
  - « Le journal de l'atelier » devient « Ce qui sort du four ce mois-ci ».
  - Dans `#preuve`, poser une petite vignette par maison (un détail de chaque service), ou au moins une pièce en regard des chiffres.

### FIX-16 — Vignette du hero (léger, 0 $)

- **Quoi.**
  - À 375, la légende de la vignette heurte le cartel de la photo (`cap/a-375-hero-zoom-x2.jpg`).
  - À 768, la vignette couvre une assiette servie et le titre laisse la moitié droite vide.
  - Partout, le recadrage montre une demi-assiette presque unie.
- **Où.** `sablon.src.css:101-118` et `index.html:82-85`.
- **Comment.**
  - Sous 640 px, masquer la `figcaption` de la vignette, ou remonter le cartel en haut à droite.
  - À 768, `.hero-titre { max-width: 20ch }`.
  - Après FIX-4, recadrer sur le bord et les mouchetures.

### FIX-17 — Texte de confirmation (léger, 0 $)

- **Où.** `index.html:593-594`.
- **Comment.** Remplacer « vous rappelle » par « vous répond », ou bien tester `/@/` sur le champ de contact et choisir « vous écrit » ou « vous rappelle ».

### FIX-18 — Ce que seul le vrai client peut fournir (client)

Les éléments à fournir :
- les photos des services réellement servis chez ses clients ;
- les fiches d'émail réelles ;
- de vrais avis nommés, avec autorisation ;
- les prix HT réels et la règle de la série d'essai ;
- l'adresse, les liens légaux et Instagram.

À noter dans `maquette.md`, rubrique « Ce qui manque encore ». C'est ce qui sépare 88 de 90 et plus à la construction.
