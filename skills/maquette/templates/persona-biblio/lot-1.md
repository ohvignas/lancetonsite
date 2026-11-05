# Persona bibliothèque, lot 1 (tour 1)

Date : 5 novembre 2026. Testé dans Chrome (Playwright headless) sur `http://127.0.0.1:4330/.../elements/<nom>.html?apercu` et en mode normal, à 1440 × 900 et 375 × 812, avec et sans `reducedMotion: 'reduce'`, au clavier (Tab, flèches, Entrée, Échap), à la souris (survol, glisser), au toucher simulé (CDP) et en `forced-colors: active`.
Captures de ce lot : `persona-biblio/captures-lot-1/`. Aucune erreur console ni ressource manquante sur les 7 démos (4 contextes chacune). Aucun fichier de la bibliothèque n'a été modifié.

| élément | note | 25 000 € ? | médias utiles ? |
|---|---|---|---|
| verre-liquide | 83 | Oui | Non : la photo d'atelier tient déjà la démo |
| titre-degrade | 74 | Pas encore | Non |
| pastille-liseree | 76 | Pas encore | Non |
| nav-pilule | 79 | Pas encore | Un peu : un hero de halle en 2400 px (16:10) au lieu du 900 px étiré |
| carrousel-fondu | 85 | Oui | Oui : une série cohérente pour un seul métier, 4:3 et 3:4 |
| sphere-cartes | 64 | Pas encore | Oui, beaucoup : 24 vignettes 4:5 d'un seul métier |
| galerie-infinie | 76 | Pas encore | Oui : 18 à 24 photos 4:5 d'un seul métier, même lumière |

Barème : beauté et finition /40, utilité réelle /20, accessibilité, mouvement réduit et repli /20, fiche et prompt /20.

**Ce qui revient dans les 7 fiches** :
- Aucune ligne « Licence » : ni pour le code, ni pour la police Inter Tight / Young Serif (OFL), ni pour les photos reprises des exemples. Le brief l'exige et le README annonce « licence citée dans chaque fiche ».
- Les poids annoncés sont tous en dessous des fichiers actuels (mesuré avec `wc -c` et `gzip -9`) : pastille 3,8 Ko annoncé contre 5,5 Ko réel, sphère 9,4 contre 10,3, galerie 7,9 contre 8,7, verre 6,9 contre 7,2.
- Plusieurs fiches décrivent un code qui n'existe pas (détail par élément ci-dessous). Pour moi c'est le plus grave : si je colle la fiche à un développeur, il croit que l'accessibilité est faite.

---

## 1. verre-liquide : 83/100 (beauté 35, utilité 18, accès 15, fiche 15)

**Ce que j'ai vu.** Le plus « agence » du lot. Sur la photo de torréfaction, la barre, le bouton et la carte de formulaire se lisent nettement, le liseré dégradé est fin et juste, le flou est dosé (`captures-lot-1/verre-liquide-1440.png`). Sur téléphone, la carte passe sous le texte et le voile plus sombre garde la lecture (`verre-liquide-375.png`). Le reflet au survol existe mais reste très discret (`verre-liquide-survol.png`). Tab parcourt les 3 liens, les 2 boutons, les 2 champs et le bouton d'envoi, sans piège.

**Je l'utiliserais sur le site d'un client à 25 000 € ?** Oui, c'est une recette propre et réutilisable. Il faut juste réparer la fiche et le focus des liens.

**Corrections gratuites, par priorité**
1. `verre-liquide.html` l. 53 et 60 : les liens `.liens a` n'ont pas de `:focus-visible`. On voit l'anneau par défaut de 1 px, à peine visible sur la photo (`verre-liquide-1440-focus.png`). Ajouter `.liens a:focus-visible { outline: 3px solid #fff; outline-offset: 3px; border-radius: 6px; }`.
2. `verre-liquide.md`, § Accessibilité : la fiche annonce un « repli opaque … en couleurs forcées » qui n'existe pas. En `forced-colors`, les boutons perdent tout contour (`verre-liquide-forced.png`). Ajouter `@media (forced-colors: active) { .verre { border: 1px solid CanvasText; } }` dans le bloc à copier, ou retirer la phrase.
3. l. 79 : le titre de démo « Le verre qui laisse passer la lumière. » sur un torréfacteur parle de l'effet, pas du café. Aucun torréfacteur n'écrirait ça. Mettre une vraie promesse, par exemple « Torréfié mardi, dans votre boîte jeudi. ».
4. l. 54 : sous 700 px, les liens disparaissent sans menu de remplacement. Ajouter dans la fiche, § Brancher, « sur téléphone, prendre le menu de `nav-pilule` ».
5. l. 66 : les placeholders à 75 % d'opacité ressemblent à des valeurs déjà saisies (« Camille »). Passer à `.55` ou remplacer par un exemple neutre (« Votre prénom »).
6. Fiche : ajouter une ligne Licence et mettre le poids à jour (7,2 Ko, 3,0 Ko gzip).

**Médias** : rien à générer. L'atelier de torréfaction (1920 px) est net et cohérent.

---

## 2. titre-degrade : 74/100 (beauté 28, utilité 13, accès 17, fiche 16)

**Ce que j'ai vu.** Sur fond noir, « CE SOIR » en pêche et rose avec halo fait de l'effet (`titre-degrade-1440.png`). Mais **le lilas, troisième couleur annoncée, n'apparaît jamais à l'état final**. Le dégradé fait 250 % de large et s'arrête à `background-position: 0%`, si bien que seuls les 40 premiers pour cent (pêche puis rose) restent visibles. Le lilas ne passe que pendant l'animation (`titre-degrade-clair-mi-reflet.png`, comparé à `titre-degrade-normal-1440.png`). Le titre clair joue aussi son reflet au chargement, alors qu'il est hors écran : on ne le voit jamais. En mode normal, les paragraphes d'explication sont décalés à gauche du titre centré (`titre-degrade-normal-1440.png`). Sur 375 px, « SOIR » se retrouve seul sur sa ligne.

**25 000 € ?** Pas encore : l'effet promis (trois couleurs) n'est pas celui qu'on voit, et le texte en dégradé est le premier tic qu'un client exigeant repère comme « fait par une IA ».

**Corrections gratuites**
1. l. 21-22 et 31 : séparer le reflet du dégradé. Deux couches :
   `background: linear-gradient(100deg, transparent 42%, rgb(255 255 255 / .85) 50%, transparent 58%) no-repeat, linear-gradient(100deg, var(--degrade-a), var(--degrade-b) 50%, var(--degrade-c));`
   `background-size: 250% 100%, 100% 100%; background-position: 150% 0, 0 0;`
   Le keyframe n'anime alors que la première couche (`to { background-position: -50% 0, 0 0; }`). Le lilas reste visible au repos.
2. l. 27 : ne lancer le reflet qu'à l'apparition, avec la classe `.vu` posée par un `IntersectionObserver` (`animation-play-state: paused` par défaut). On peut aussi utiliser `animation-timeline: view()` derrière `@supports`.
3. l. 46 : `p { margin: 1.4rem auto 0; }` pour centrer les explications sous le titre.
4. Fiche, § Accessibilité : la phrase « le contraste se mesure sur la couleur la plus claire » est suivie d'un chiffre pris sur le lilas. Or sur fond clair, la couleur la plus claire est l'orange `#e0572b` : 3,56:1 sur `#fbf8f4`. C'est acceptable pour un grand titre (seuil 3:1), mais il faut l'écrire ainsi, sans annoncer 4,5:1.
5. l. 43 : ajouter `text-wrap: balance` aux titres pour éviter « SOIR » seul sur 375 px.
6. Fiche : Licence, poids (4,3 Ko, 2,0 Ko gzip).

**Médias** : non, c'est de la typographie.

---

## 3. pastille-liseree : 76/100 (beauté 29, utilité 15, accès 16, fiche 16)

**Ce que j'ai vu.** C'est propre et sobre. La fiche a raison de la sortir du surtitre de hero pour la mettre dans une carte d'offre avec un prix (`pastille-liseree-1440.png`). Deux défauts visibles :
- La variante `.tourne` s'arrête après 3 tours sur l'angle 0, où 60 % du liseré est un lilas à 35 % d'opacité. « PLACES OUVERTES » garde une moitié gauche éteinte, et sur la carte blanche « RENTRÉE 2027 » paraît presque sans contour (`pastille-liseree-1440.png`, carte de droite de chaque fond). On croit à un bug d'affichage, pas à un état final voulu.
- Le texte fait 0,72 rem (11,5 px) en capitales espacées : c'est lisible sur un écran d'ordinateur, mais limite sur téléphone (`pastille-liseree-375.png`).

L'aperçu laisse les cartes perdues dans un grand vide noir et crème : c'est peu flatteur dans la galerie.

**25 000 € ?** Pas encore : la variante animée doit finir sur un contour complet.

**Corrections gratuites**
1. l. 29-34 : à la fin de l'animation, revenir au liseré plein. Ajouter `animation-fill-mode: none` (déjà le défaut) et, surtout, ne poser le dégradé conique que pendant l'animation. Pour cela, mettre le `conic-gradient` dans un `@keyframes` qui part du dégradé linéaire et y revient. Plus simple : animer `--angle-pastille` de 0 à 1080deg, puis passer par JS `animationend` à la classe `.fini` qui remet le fond linéaire de la l. 24-25.
2. l. 21 : `font-size: max(.72rem, 12px)` et `letter-spacing: .1em`.
3. l. 54-56, aperçu : resserrer (`.apercu section { align-content: center; padding-block: 2rem; } .apercu .sombre { min-height: 0 }`) ou mettre trois cartes par fond pour remplir le cadre.
4. Fiche : Licence, poids réel (5,5 Ko, 2,3 Ko gzip, pas 3,8 Ko). Préciser que le texte d'une pastille ne doit jamais être la seule info (un prix ou un statut doit être répété dans la carte).

**Médias** : non.

---

## 4. nav-pilule : 79/100 (beauté 34, utilité 19, accès 15, fiche 11)

**Ce que j'ai vu.** Le code fonctionne bien :
- La barre se resserre à 736 px et fonce dès qu'on quitte le haut (`nav-pilule-serree.png`).
- Sur téléphone, « Menu » ouvre un `<dialog>` plein écran, très réussi, avec le grand CTA blanc en bas (`nav-pilule-menu-375.png`).
- Le focus va sur « Fermer », reste dans le dialog après 7 tabulations, Échap ferme et le focus revient sur « Menu ».
- L'anneau de focus de 3 px blanc est bien visible sur tous les liens.

En revanche :
- La photo du hero est `halle-scene-900.webp` étirée sur 1440 px : elle est molle et grumeleuse sur ordinateur (`nav-pilule-1440.png`). Une version de 1600 px existe déjà dans le dossier (`halle-scene.webp`).
- La fiche décrit autre chose que le code. Elle annonce « `aria-expanded` et `aria-controls` » sur le bouton : absents (vérifié, attributs vides). Elle dit « sentinelle placée en bas du hero » alors que le script la pose en haut du `body`, sur 80 px (l. 100). Elle dit « Hérite des variables de `.verre` » : faux, la nav a son propre verre codé en dur. Le prompt reprend l'erreur de la sentinelle.

**25 000 € ?** Pas encore. Le composant vaut un « Oui », mais une fiche qui promet une accessibilité absente ne part pas chez un client.

**Corrections gratuites**
1. l. 74 : `<button … aria-controls="menu-principal" aria-expanded="false">`, `id="menu-principal"` sur le dialog. Dans le script, l. 103-106 : passer `aria-expanded` à `true` à l'ouverture et à `false` à l'événement `close`. Sinon, retirer la promesse de la fiche.
2. l. 57 : `url("../exemples/festival-tole/images/halle-scene.webp")` au-delà de 900 px, ou `image-set()` entre la 900 et la 1600.
3. Fiche, § Variables : supprimer « Hérite des variables de `.verre` ». Réécrire la phrase sur la sentinelle : « sentinelle de 80 px en haut de page ; pour resserrer après le hero, la déplacer en bas du hero ». Corriger le prompt dans le même sens.
4. l. 23 et 27 : exposer `--nav-fond` et `--nav-fond-serree` en variables : aujourd'hui, on ne peut pas teinter la barre sans toucher la recette.
5. Fiche : Licence, poids (7,9 Ko, 3,0 Ko gzip).

**Médias** : la photo de 1600 px suffit. Pour un site client, il faudra une photo de lieu d'au moins 2400 px de large, en 16:10.

---

## 5. carrousel-fondu : 85/100 (beauté 34, utilité 18, accès 17, fiche 16)

**Ce que j'ai vu.** Le meilleur rapport sérieux/effet du lot. Le défilement est calme et la boucle n'a aucun raccord visible : j'ai placé l'animation à 49,9 s sur 50 s et l'image est identique au départ (`carrousel-fondu-raccord.png`). Les bords fondus sont élégants (`carrousel-fondu-1440.png`). Le survol arrête la bande, et le bouton « Mettre en pause le défilement » l'arrête aussi, change de libellé et d'icône. Hors écran, la bande se met en pause. En mouvement réduit, la bande devient une rangée à faire défiler soi-même ; Chrome rend le conteneur focusable et les flèches font défiler (scrollLeft 0 puis 56).

Défauts :
- Aperçu téléphone en mouvement réduit : la première tuile fait 541 px de large dans un écran de 375 px, coupée à droite et sans indice qu'on peut glisser (`carrousel-fondu-375-reduit.png`).
- Safari ne rend pas focusables les zones qui défilent : au clavier, la rangée y serait inaccessible.
- Légende « Architecture » sur un enduit à la chaux : un patron du bâtiment lit « enduit » ou « façade », pas « architecture ».

**25 000 € ?** Oui, sous un hero pour montrer des réalisations, c'est exactement ce que j'attends.

**Corrections gratuites**
1. l. 36-41 : dans le `@media (prefers-reduced-motion)`, ajouter `.carrousel figure { max-width: 82vw; }` pour qu'on voie le bord de la tuile suivante.
2. l. 65 et script : `tabindex="0"` sur la section en mouvement réduit (posé par JS si `matchMedia(...).matches`), avec un `:focus-visible` déjà prévu l. 43 étendu à `.carrousel:focus-visible`.
3. l. 69 : `figcaption` « Enduit à la chaux » ou « Façade », pas « Architecture ».
4. Fiche : Licence (code et photos), poids (7,0 Ko, 3,0 Ko gzip). Ajouter que le carrousel en mode aperçu force la hauteur à 50vh.

**Médias** : oui. Une série cohérente d'un seul métier (par exemple 10 photos d'un artisan céramiste : pièces, mains, four, atelier) en alternance 4:3 et 3:4, même lumière. Ça ferait passer la démo de « catalogue du plugin » à « vrai site ».

---

## 6. sphere-cartes : 64/100 (beauté 24, utilité 12, accès 15, fiche 13)

**Ce que j'ai vu.** Au premier coup d'œil, on ne lit pas une sphère : on voit treize vignettes éparpillées avec de grands trous (`sphere-cartes-1440.png`, `sphere-cartes-glisse.png`). Les cartes de l'arrière sont invisibles (`backface-visibility: hidden`), donc la forme ne se referme jamais. Les copies de complément (32 cartes pour 18 photos) mettent deux fois la même photo côte à côte (table dressée, coffret). Le glisser avec inertie, les flèches et le bouton d'arrêt fonctionnent. En mouvement réduit, rien ne tourne seul.

Pour un patron, les erreurs de métier se voient en trois secondes :
- Le titre « Un an de chantiers » est posé sur des croissants, du café et un concert.
- l. 72 : `alt="Pâte feuilletée"` sur des **pâtons en boule posés sur une couche de lin** (`commerce-odette/images/couche-640.webp`). Ce n'est pas de la pâte feuilletée.
- l. 65 : `alt="Salon de coiffure"` sur une femme qui regarde son téléphone dans son canapé (`logiciel-miroir/images/journal-1-600.webp`).
- l. 60 : `alt="Champ de légumes au printemps"` sur des poireaux, des choux et des courges sous des arbres nus : c'est la fin de l'automne.
- l. 74 : `alt="Coiffeuses au travail"` pour une coiffeuse et un homme sur son ordinateur.

La fiche affirme aussi « Images en `decoding=async` » (aucun attribut, vérifié) et « Cartes de l'arrière assombries » (elles sont masquées, pas assombries).

**25 000 € ?** Pas encore : en l'état, l'objet ne ressemble pas à une sphère et les textes alternatifs sont faux.

**Corrections gratuites**
1. l. 25 : `backface-visibility: visible`. Le calcul d'opacité des l. 111-114 sert alors vraiment (les cartes de dos à 0,25). Ajouter `filter: grayscale(.6)` aux cartes dont z < 0 pour la profondeur.
2. l. 17-18 et 45 : densifier. Mettre `--sphere-carte` à environ 0,42 × `--sphere-rayon` (aujourd'hui 0,39 dans l'aperçu ; viser 0,5), ou passer à 48 cartes (l. 86, `< 48`).
3. l. 86-89 : intercaler les copies (`originales[(i * 7) % n]`) pour qu'aucune photo n'ait son double pour voisin.
4. l. 59-76 : corriger les quatre `alt` ci-dessus (« Pâtons sur couche de lin », « Cliente qui prend rendez-vous sur son téléphone », « Potager en fin d'automne », « Coiffeuse et gérant au comptoir du salon »). Choisir un titre qui colle aux photos (« Un an d'ateliers, en un tour ») ou des photos d'un seul métier.
5. Fiche : retirer `decoding=async` ou l'ajouter (`<img decoding="async" loading="lazy">`), remplacer « assombries » par ce que fait le code, ajouter la Licence et le poids réel (10,3 Ko, 4,1 Ko gzip).
6. Préciser dans la fiche qu'au doigt seule la rotation horizontale marche (`touch-action: pan-y`, l. 19). C'est voulu pour laisser défiler la page, mais il faut le dire.

**Médias** : oui, c'est là que le gain est le plus net. 24 vignettes 4:5 d'un même métier (un charpentier : assemblages, chantiers, outils, équipe), même température de couleur. Avec des photos tirées de sept sites différents, la sphère ressemble à un vide-poche.

---

## 7. galerie-infinie : 76/100 (beauté 36, utilité 15, accès 10, fiche 15)

**Ce que j'ai vu.** Visuellement, la plus belle démo du lot : un mur en quinconce, dense, avec un titre dans un dégradé sombre (`galerie-infinie-1440.png`). On le lance à la souris et l'inertie est agréable (`galerie-infinie-lancer.png`). Seulement 35 tuiles, et aucune ne reste vide après un lancer. Les flèches déplacent le mur d'une tuile. « Arrêter la dérive » marche. En mouvement réduit, le mur est immobile et le bouton dit « Relancer la dérive ».

**Le défaut bloquant est sur téléphone** : `touch-action: none` (l. 19) sur un bloc de 78svh (100svh en aperçu). J'ai glissé verticalement sur la galerie (toucher simulé, CDP) : la page n'a pas bougé (scrollY 300 avant, 300 après). Un visiteur qui pose le pouce sur le mur ne peut plus descendre vers le formulaire. Sur un site client, c'est une perte de contact garantie.

Le titre « Toutes nos pièces » surmonte du pain, un concert et un téléphone : c'est la même incohérence que pour la sphère.

**25 000 € ?** Pas encore. C'est magnifique sur ordinateur, mais ça bloque le défilement sur téléphone.

**Corrections gratuites**
1. l. 19 : `touch-action: pan-y` (ou `pan-y pinch-zoom`). Dans le script, l. 107-112, ignorer le glisser vertical au toucher : `if (e.pointerType === "touch") { ox += dx; }` seulement. On peut aussi désactiver le glisser au toucher sous 760 px et laisser la seule dérive.
2. Alternative à indiquer dans la fiche : sur téléphone, `height: 60svh` au plus, pour laisser une marge où le pouce fait défiler la page.
3. l. 26 : le zoom au survol se déclenche aussi pendant un glisser. Ajouter `.galerie-infinie:active .tuile:hover img { transform: none; }`.
4. Fiche : ajouter un § « Téléphone » avec le choix `touch-action`, la Licence et le poids réel (8,7 Ko, 3,7 Ko gzip). Le prompt doit mentionner « ne jamais bloquer le défilement vertical de la page au toucher ».

**Médias** : oui. 18 à 24 photos 4:5 d'un seul métier (une boulangerie : pains, pâtons, four, vitrine, mains), même lumière chaude. Le mur passerait de « belle mécanique » à « vitrine qu'on veut traverser ».
