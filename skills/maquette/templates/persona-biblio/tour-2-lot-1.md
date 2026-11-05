# Persona bibliothèque, lot 1, tour 2

Date : 5 novembre 2026. Testé dans Chrome (Playwright, headless) sur `http://127.0.0.1:4339/.../elements/<nom>.html`, en `?apercu` et en mode normal, à 1440 × 900 et 375 × 812 (toucher activé), avec et sans `reducedMotion: 'reduce'`. J'ai aussi testé :
- le clavier : Tab, flèches, Échap ;
- la souris : survol, glisser, lancer ;
- le toucher : glissements verticaux et horizontaux envoyés par CDP ;
- les couleurs forcées (`forced-colors: active`) ;
- la sphère sans JavaScript.

Captures de ce tour : `persona-biblio/captures-tour2-lot-1/`. Les 30 chargements (6 éléments × 5 contextes) ne donnent aucune erreur console ni ressource manquante. Je n'ai modifié aucun fichier de la bibliothèque.

Les poids des fiches sont maintenant justes : `wc -c` donne exactement les octets annoncés, et le gzip est à 20 octets près (écart dû à la version de gzip). Les 6 fiches ont leur ligne Licence. Les médias payants ne sont pas comptés une deuxième fois.

| élément | tour 1 | tour 2 | 25 000 € ? |
|---|---|---|---|
| verre-liquide | 83 | **90** | Oui |
| titre-degrade | 74 | **85** | Oui, sur un seul mot par page |
| pastille-liseree | 76 | **85** | Oui |
| nav-pilule | 79 | **91** | Oui |
| sphere-cartes | 64 | **77** | Pas encore |
| galerie-infinie | 76 | **88** | Oui |

Barème : beauté et finition /40, utilité réelle /20, accessibilité, mouvement réduit et repli /20, fiche et prompt /20.

---

## 1. verre-liquide : 90/100 (beauté 36, utilité 18, accès 18, fiche 18)

**Ce qui a été corrigé (vérifié)**
- Le focus des liens est un anneau blanc de 3 px, bien visible sur la barre (`verre-liquide-focus-lien.png`).
- En couleurs forcées, chaque surface garde un contour net (`verre-liquide-forced.png`).
- Le titre est maintenant celui d'un torréfacteur : « Torréfié mardi, dans votre boîte jeudi. » (`verre-liquide-1440.png`). Le chapô est cohérent : « Trois cafés de 50 g, livrés en boîte aux lettres ».
- Les placeholders sont neutres, à 55 % d'opacité (« Votre prénom », « vous@exemple.fr »).
- La fiche renvoie à `nav-pilule` pour le menu téléphone.

Tab parcourt les 3 liens, « Commander », le bouton, les 2 champs et l'envoi, dans l'ordre. Sur téléphone, la lecture tient (`verre-liquide-375.png`).

**25 000 € ?** Oui. C'est propre, sobre, et ça vend un vrai produit.

**Reste (gratuit, mineur)**
1. Le reflet au survol reste très discret (`verre-liquide-survol.png`). Pour qu'on le remarque, passer à `rgb(255 255 255 / .3)` dans `.verre::after` (l. 37).
2. Fiche, ligne Poids : le gzip mesuré ici fait 3077 octets (3058 annoncés). C'est négligeable, mais il faut préciser la commande exacte ou arrondir à « environ 3,1 Ko ».

---

## 2. titre-degrade : 85/100 (beauté 34, utilité 15, accès 19, fiche 17)

**Ce qui a été corrigé (vérifié)**
- Le défaut de fond du tour 1 est réglé : au repos, les trois couleurs sont là. Sur fond sombre, on voit le pêche, le rose et le lilas (`titre-degrade-1440-normal.png`). Sur fond clair, on voit l'orange `#c2461b`, le framboise et le violet.
- Le reflet est une couche séparée qui traverse le mot de gauche à droite (`titre-degrade-reflet-600.png`, puis `-900.png`).
- Le titre clair reste `paused` tant qu'il n'est pas à l'écran, puis passe à `running` quand on y arrive (mesuré avec `getComputedStyle`).
- Les explications sont centrées et « SOIR » n'est plus seul sur sa ligne au téléphone (`titre-degrade-375-reduit-normal.png`).
- Contrastes recalculés : `#c2461b` donne 4,74:1, `#c42f7a` 4,92:1 et `#6b4ce0` 5,31:1 sur `#fbf8f4`. La fiche dit vrai.

**25 000 € ?** Oui, sur un seul mot par page, comme le dit la fiche. Le texte en dégradé reste un effet que je doserai moi-même. L'utilité plafonne à 15 : c'est inhérent à l'effet, pas au travail.

**Reste (gratuit)**
1. `titre-degrade.md` l. 34-35 : une ligne vide coupe le tableau Variables. La ligne `--degrade-reflet` s'affiche hors du tableau, en texte brut avec des barres verticales. Supprimer la ligne vide.
2. l. 32 : avec `cubic-bezier(.3, .7, .2, 1)` sur 2,4 s, le reflet traverse le mot en 0,3 s environ (entre 600 et 900 ms). La fin de l'animation se passe hors du mot. C'est un éclair, pas une lumière qui glisse. Proposer `1.6s` et `cubic-bezier(.45, .05, .25, 1)`, et corriger « 2,4 s » dans la fiche, § Accessibilité.

---

## 3. pastille-liseree : 85/100 (beauté 34, utilité 16, accès 18, fiche 17)

**Ce qui a été corrigé (vérifié)**
- La lueur tourne pendant l'animation (`pastille-tourne-sombre-anim.png`). À la fin, le liseré est complet sur les deux fonds (`pastille-tourne-clair-fin.png`, `pastille-tourne-sombre-fin.png`). Le contour à moitié éteint du tour 1 a disparu.
- Le texte fait 12 px (mesuré).
- Il y a trois cartes par fond, avec des prix plausibles : « 85 € le m² » pour un rejointoiement, « 320 € le trimestre ».
- L'aperçu remplit enfin le cadre (`pastille-liseree-1440.png`).
- La règle « le texte d'une pastille ne porte jamais seul l'information » est écrite et appliquée : « Liste d'attente ouverte » est répété dans la carte.

**25 000 € ?** Oui, dans une carte d'offre, exactement comme la fiche le recommande.

**Reste (gratuit)**
1. `pastille-liseree.md` l. 32-33 : même tableau coupé par une ligne vide (ligne `--pastille-eclat`).
2. En couleurs forcées, le point de « Places ouvertes » disparaît et laisse un blanc avant le texte (`pastille-liseree-forced.png`). Dans le bloc `forced-colors` (l. 45), ajouter `.pastille .point { background: CanvasText; }`.

---

## 4. nav-pilule : 91/100 (beauté 36, utilité 19, accès 18, fiche 18)

**Ce qui a été corrigé (vérifié)**
- `aria-expanded` passe de `false` à `true` à l'ouverture, puis revient à `false` après Échap. Le focus revient sur « Menu ». `aria-controls="menu-principal"` pointe sur le dialog.
- Dans le dialog, la tabulation fait le tour : Programme, Billetterie, Venir, Bar, Prendre des places, puis l'interface du navigateur, puis Fermer. C'est le comportement natif.
- Le hero charge `halle-scene.webp` (1600 px) au-delà de 900 px : la photo n'est plus molle (`nav-pilule-1440.png`).
- `--nav-fond` et `--nav-fond-serree` sont exposés.
- La fiche et le prompt disent enfin la vérité sur la sentinelle et sur l'indépendance vis-à-vis de `.verre`.

La barre se resserre et fonce au défilement (`nav-pilule-serree.png`). Le menu plein écran est toujours aussi réussi (`nav-pilule-menu-375.png`).

**25 000 € ?** Oui, c'est le composant le plus immédiatement réutilisable du lot.

**Reste (gratuit, mineur)**
1. Sur un écran Retina de 1440 px, la photo de 1600 px reste un peu juste. La fiche le dit déjà pour le site client (2400 px). Rien à faire dans la démo.

---

## 5. sphere-cartes : 77/100 (beauté 30, utilité 14, accès 15, fiche 18)

**Ce qui a été corrigé (vérifié)**
- On lit enfin une sphère (`sphere-cartes-1440.png`, `sphere-cartes-glisse-haut.png`). Les 24 cartes de dos sont visibles, assombries et désaturées.
- Il y a 48 cartes, et les doublons ne sont plus voisins.
- Le sujet est unique : 24 photos d'un même céramiste. J'ai vérifié les 24 `alt` un par un sur une planche contact : tous sont justes et précis, du « Centrage de la motte d'argile sur le tour » à « Assiette crue trempée dans un bain d'émail ».
- Le titre « Une année de grès, en un tour » colle aux photos.
- Les images ont `decoding="async"` et `loading="lazy"`.
- Clavier : Tab atteint la sphère, l'anneau de focus est net et les flèches la tournent (`sphere-cartes-clavier-reduit.png`).
- En mouvement réduit, rien ne tourne seul et le bouton dit « Relancer la rotation ».
- Au doigt, un glissement vertical fait bien défiler la page (scrollY 0 puis 38).

**Ce qui ne va pas encore**
- **Des éclats.** Avec des cartes de 0,42 × rayon (0,525 × rayon de haut), trop grandes pour l'espacement des 48 positions (environ 0,51 × rayon), les plans plats se coupent entre eux. Chrome dessine alors des triangles et des coins tranchés, et les cartes grises de l'arrière transpercent celles de devant (`sphere-cartes-detail-eclats.png`). Sur le pourtour, les cartes vues de profil font des traits et des copeaux. Un designer y voit du verre brisé, pas un objet poli.
- **Les cartes de dos sont en miroir** : on voit la photo à l'envers, le potier et la vaisselle inversés. L'assombrissement le cache en partie.
- **Sans JavaScript**, les 24 cartes s'empilent en une seule vignette au centre, et le bouton « Arrêter la rotation » ne fait rien (`sphere-cartes-sans-js.png`). Le commentaire l. 30 promet pourtant « sans JS … la sphère est déjà posée, de trois quarts », et la règle qui suit est vide. C'est exactement le défaut du tour 1 : un texte qui annonce un code absent.

**25 000 € ?** Pas encore. L'objet est devenu crédible et les photos sont justes, mais les éclats sautent aux yeux dès qu'on s'approche.

**Corrections gratuites, par priorité**
1. l. 18 : `--sphere-carte: calc(var(--sphere-rayon) * .34)`. Les cartes ne se chevauchent plus et la forme reste lisible avec 48 cartes. Ajouter aussi un léger `translateZ` décalé par carte (`translateZ(${R + (i % 3)}px)`, l. 124) pour supprimer les intersections résiduelles.
2. l. 129 : faire tomber l'opacité des cartes vues de profil. Par exemple, `opacity` en fonction de |z| : 0,2 quand |z| < 0,15, pour effacer les copeaux du pourtour.
3. l. 27 : `.sphere-cartes figure.dos img { transform: scaleX(-1); }` pour que les photos de dos ne soient plus inversées.
4. l. 30 : soit écrire le repli promis (`.sphere-cartes:not(.prete) .monde { position: static; width: auto; height: auto; display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }`, `.prete` étant posé par le script, et bouton masqué sans JS), soit supprimer la phrase.
5. `sphere-cartes.md` l. 33 : « `TOTAL` » n'existe pas dans le code (la constante s'appelle `N`, l. 93). L'opacité des cartes de dos va de 0,55 à environ 0,76, pas exactement 0,55. Corriger les deux.

**Médias** : les photos du céramiste suffisent. Ce qu'il manque est du code, pas des images.

---

## 6. galerie-infinie : 88/100 (beauté 37, utilité 16, accès 17, fiche 18)

**Ce qui a été corrigé (vérifié)**
- **Le défaut bloquant du tour 1 est réglé.** J'ai glissé verticalement au doigt sur le mur : la page défile (scrollY 300 puis 352). Au doigt toujours, un glissement horizontal déplace le mur (tuile de x = 602 à x = 6) sans faire défiler la page.
- Pendant un glisser à la souris, le mur porte `.glisse` et aucune tuile ne zoome.
- Les 18 photos viennent d'un seul fournil (levain, croissants, façonnage, four, vitrine) : le mur se lit enfin comme une vitrine (`galerie-infinie-1440.png`, `galerie-infinie-375.png`). Je ne vois aucun doublon côte à côte.
- Le titre « Du levain à la vitrine, tout le fournil » est juste.
- Les flèches déplacent le mur d'une tuile, et le focus est visible.
- En mouvement réduit, le mur est immobile et le bouton dit « Relancer la dérive » (`galerie-infinie-375-reduit-normal.png`).
- La fiche a son paragraphe « Téléphone », clair.

**25 000 € ?** Oui, en section de réalisations, pour une boulangerie, un photographe ou un catalogue d'objets.

**Reste (gratuit, mineur)**
1. l. 10 : la `meta description` annonce « 30 éléments dans la page ». J'en compte 35 à 1440 × 900 en aperçu (7 × 5). Écrire « une trentaine de tuiles ».
2. l. 54 : `role="img"` sur un bloc focusable qu'on pilote aux flèches est contradictoire pour un lecteur d'écran, qui annonce une image figée. Préférer `role="region"` avec `aria-roledescription="mur de photos"` et le même `aria-label`, ou garder `img` et retirer `tabindex` (flèches en moins).

---

## En résumé

Quatre éléments passent de « Pas encore » à « Oui ». Le correcteur a traité sérieusement chaque point du tour 1, et surtout, les fiches disent maintenant ce que fait le code (sauf une phrase dans la sphère). Le seul élément encore sous 85 est la sphère : elle se lit enfin comme une sphère, mais ses cartes se coupent en éclats, et son repli sans JavaScript est promis sans exister. Deux réglages (taille de carte, opacité de profil) et un repli de dix lignes devraient la faire passer.
