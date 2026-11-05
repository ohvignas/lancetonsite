# Persona bibliothèque, lot 2 (tour 1)

Date : 5 novembre 2026. Testé dans Chrome (Playwright headless) sur `http://127.0.0.1:4330/.../elements/<nom>.html?apercu` et en mode normal, à 1440 × 900 et 375 × 812 (tactile simulé), avec et sans `reducedMotion: 'reduce'`, au clavier (Tab, Entrée, flèches, PageUp), à la souris (survol, traînée, défilement image par image) et en `forced-colors: active` quand c'était utile.
Captures de ce lot : `persona-biblio/captures-lot-2/`. Aucune erreur JS sur les 8 démos. Une seule ressource en échec : `medias/versement-960.mp4` (voir video-curseur). Aucun fichier de la bibliothèque n'a été modifié.

| élément | note | 25 000 € ? | médias utiles ? |
|---|---|---|---|
| revele-encre | 73 | Pas encore | Oui : une vraie paire avant / après au **même cadrage** (halle vide / halle en concert), 16:10, 2400 px |
| lettres-envol | 66 | Pas encore | Non |
| video-curseur | 65 | Pas encore | Oui, indispensable : un geste qui se voit (main qui verse une bouilloire col de cygne, tasse qui tourne), 4 s, caméra fixe, 16:9, sujet centré |
| projecteur-cartes | 80 | Oui | Non |
| bandeau-minuteur | 76 | Pas encore | Non |
| faq-verre | 82 | Oui | Un peu : une photo floutée ou un fond de matière derrière le verre le ferait enfin exister |
| barre-reservation | 83 | Oui, après la correction du compteur | Un peu : la photo d'un gîte (façade de longère, haie bocagère), 16:9, au lieu du potager repris d'un autre exemple |
| titre-collines | 78 | Pas encore | Non (le dessin en code est le parti pris), mais un motif de fleurs dessiné en SVG ferait mieux que la grille de points |

Barème : beauté et finition /40, utilité réelle /20, accessibilité, mouvement réduit et repli /20, fiche et prompt /20.

**Ce qui revient dans les 8 fiches** :
- Aucune ligne « Licence » : ni pour le code, ni pour les polices (Inter Tight, Young Serif, Figtree, Hanken Grotesk : OFL), ni pour les photos et la vidéo reprises des exemples (halle Tôle, potager Sillon, versement Brume). Même reproche qu'au lot 1, toujours pas corrigé.
- Poids annoncés en dessous des fichiers actuels (`wc -c`, `gzip -9`) : revele-encre 6,8 Ko annoncé contre 7,4 Ko réel (3,2 gzip), video-curseur 4,5 contre 5,2 (2,5), projecteur-cartes 5,0 contre 5,4, bandeau-minuteur 6,3 contre 6,8, faq-verre 4,6 contre 4,9, lettres-envol 4,3 contre 4,6. Justes : barre-reservation (8,7) et titre-collines (6,5).
- Apostrophes droites (`'`) partout dans les textes visibles (« L'accompagnement », « d'été », « jusqu'à »), et deux-points sans espace insécable. Un client français le voit dans un titre en 4 rem.

---

## 1. revele-encre : 73/100 (beauté 28, utilité 15, accès 16, fiche 14)

**Ce que j'ai vu.** Les deux photos sont superbes, traitées dans le même rouge, et le bouton « Montrer la halle pendant le concert » bascule proprement sur la scène pleine (`captures-lot-2/re-all.png`), focus visible, `aria-pressed` qui passe à `true`, libellé qui change. Mais l'effet lui-même déçoit : j'ai balayé la photo en une demi-seconde, et la traînée n'est jamais opaque, c'est un voile laiteux dès la première image (`re-fast-0.png`), presque effacé 500 ms plus tard (`re-fast-500.png`). La cause est dans le code : 3,5 % de masque effacé à chaque image, soit 0,965⁶⁰ ≈ 12 % restant au bout d'une seconde, et le séchage commence pendant qu'on peint. En mouvement réduit, l'encre reste, et là on voit enfin l'image cachée (`re-trail-reduce.png`)… et on voit surtout que **ce n'est pas la même halle** : voûte à verrières et murs de pierre d'un côté, charpente métallique à balcons de l'autre. La fiche dit elle-même « deux photos de même cadrage » et l'`alt` dit « la même halle » : un patron de salle le remarque en trois secondes. Téléphone : photo bien recadrée (`revele-encre-375.png`), mais rien n'invite à glisser le doigt.

**Je l'utiliserais sur le site d'un client à 25 000 € ?** Pas encore : l'idée est forte, mais l'encre sèche avant qu'on ait vu quoi que ce soit, et la paire de photos ment.

**Corrections gratuites, par priorité**
1. `revele-encre.html`, fonction `boucle` : passer `rgba(0,0,0,.035)` à `.012` et ne commencer à sécher que 600 ms après le dernier mouvement (garder un horodatage `dernierMouvement` dans `pointermove`, sauter l'effacement tant que `performance.now() - dernierMouvement < 600`). Monter `encre = 90` à `240` pour que la boucle dure jusqu'à la fin du séchage.
2. Fonction `tache` : arrêts du dégradé `0 → 1`, `.75 → 1`, `1 → 0` (au lieu de `.6 → .85`) pour un cœur de trait vraiment opaque et un bord net, façon encre.
3. Démo : soit trouver deux photos du même lieu au même cadrage, soit corriger l'`alt` (« Une autre halle pendant un concert ») et le titre, mais alors la démo contredit la fiche. Mieux vaut des médias (voir tableau).
4. Ajouter un repère visible sur la photo au premier affichage (« Passez la souris / glissez le doigt », pastille en bas à gauche, masquée au premier `pointermove`) : en mode `?apercu`, la phrase d'explication disparaît et plus rien ne dit quoi faire.
5. Fiche : documenter le temps de séchage comme variable (`--encre-sechage`) plutôt qu'un `rgba` en dur ; ajouter la licence ; corriger le poids (7,4 Ko, 3,2 gzip) ; le prompt ne dit pas que le séchage est différé ni quel taux viser.

**Médias.** Oui : une vraie paire générée au même cadrage, même focale, même point de vue (halle vide de jour / même halle en concert), 16:10, 2400 px. C'est ce qui fait l'effet.

---

## 2. lettres-envol : 66/100 (beauté 27, utilité 12, accès 12, fiche 15)

**Ce que j'ai vu.** Le principe fonctionne : scène épinglée, lettres qui s'envolent depuis le centre, second titre rouge qui monte (`captures-lot-2/sh-envol.png`, 6 étapes de défilement). Trois défauts de finition sautent aux yeux. (a) L'approche `-.055em` en graisse 880 colle les lettres : « FINI » se lit « FNI », le I de « CHANTIER » se fond dans le T. (b) Au milieu de la transition, le second titre monte **pendant** que les lettres noires sont encore dessus : « F PLACE AU S » mélangé, c'est brouillon, pas spectaculaire (vignette 4 de `sh-envol.png`). (c) Sur téléphone, le titre « géant » fait 50 px dans un écran de 812 : une ligne au milieu du vide (`sh-envol-m.png`). Mouvement réduit : les deux titres empilés, propre.

Accessibilité : le second titre est un `<p>` avec `aria-label` et des lettres en `aria-hidden`. `aria-label` est interdit sur un paragraphe (rôle générique) : les lecteurs d'écran l'ignorent, donc **« Place au chantier » n'est pas lu du tout**. La fiche affirme le contraire.

**Je l'utiliserais sur le site d'un client à 25 000 € ?** Pas encore : la typo collée et le chevauchement font amateur, et la moitié du message disparaît pour un lecteur d'écran.

**Corrections gratuites, par priorité**
1. `lettres-envol.html` l. 50-55 : ne plus utiliser `aria-label`. Garder le texte dans un `<span class="sr">Place au chantier</span>` (classe visuellement masquée) avant les lettres `aria-hidden`, pour les deux titres.
2. l. 17 : `letter-spacing: -.055em` → `-.03em`, et `font-weight: 880` → `800`.
3. l. 67 : démarrer le second titre à `.7` au lieu de `.45`, et passer l'opacité du premier à `ease: "power2.in"` avec `duration: .7` : le premier titre est parti avant que le second n'arrive.
4. l. 17 : sous 600 px, `font-size: 19vw` et un mot par ligne (`.mot { display: block }`) pour que le titre remplisse l'écran du téléphone ; trajectoires (l. 62) proportionnelles à `innerWidth` au lieu de 260 et 420 px fixes.
5. Fiche : corriger la phrase d'accessibilité, le poids (4,6 Ko), ajouter la licence ; le prompt doit dire « texte complet en texte visuellement masqué, pas en `aria-label` » et « le second titre n'entre qu'une fois le premier dispersé ».

**Médias.** Non.

---

## 3. video-curseur : 65/100 (beauté 24, utilité 12, accès 16, fiche 13)

**Ce que j'ai vu.** Sur ce serveur local, la vidéo ne bouge pas du tout : `currentTime` reste à 0 quelle que soit la position (`seekable` vide). Le serveur Python de test ne gère pas les requêtes `Range`, Chrome ne peut donc pas se déplacer dans le fichier. Sur un vrai hébergeur ce serait réglé, mais le kit vérifie ses maquettes sur ce type de serveur, et la fiche n'en dit rien. J'ai rechargé la vidéo en `blob:` dans la page pour juger l'effet : le déplacement suit bien la souris (0,22 s → 2,44 s → 4,66 s). Et là, deuxième déception : entre le début et la fin, **rien ne change à l'œil** sauf un peu de vapeur (`vcb-x100.png` contre `vcb-x1300.png`). Le café coule en filet continu, le niveau du verre ne monte pas : on ne « fait pas tourner le geste ». Sur téléphone, `object-fit: cover` coupe le sujet : on ne voit que le volet et les toits, pas le café (`sh-vc.png`, vignette 1). Clavier : le curseur est atteint, le focus blanc se voit, flèches et PageUp marchent. Mouvement réduit : affiche seule, curseur masqué, juste.

Côté métier : un dripper en verre plein de café liquide sans filtre papier visible, ce n'est pas comme ça qu'on fait un V60. Un torréfacteur le verra.

**Je l'utiliserais sur le site d'un client à 25 000 € ?** Pas encore : la démo ne montre pas l'effet, et sur mobile elle ne montre même pas le sujet.

**Corrections gratuites, par priorité**
1. `video-curseur.html` l. 77 : charger la vidéo par `fetch` → `blob` → `URL.createObjectURL` (786 Ko, une seule fois) au lieu de `video.load()`. Elle devient seekable quel que soit le serveur. Testé dans la page : ça marche.
2. l. 17 : ajouter `object-position: var(--vc-cadrage, 50% 50%)` et documenter la variable ; pour la démo, `--vc-cadrage: 72% 60%` garde le café dans le cadre à 375 px.
3. Fiche : dire en toutes lettres que le serveur doit accepter les requêtes `Range` (le serveur Python de test ne le fait pas), ou que le chargement en `blob` règle ça ; corriger le poids (5,2 Ko) ; licence de la vidéo Brume.
4. Ajouter un indice visuel du geste (deux chevrons ‹ › qui encadrent le pointeur ou une étiquette « Glissez » sur la pastille) : le curseur `ew-resize` ne se voit pas sur tactile.
5. Le prompt doit exiger « un geste dont l'état de début et de fin sont nettement différents » : c'est la condition de l'effet, et c'est ce qui manque ici.

**Médias.** Oui, indispensable : une vidéo générée de 4 s, caméra fixe, 16:9, sujet au centre, avec un début et une fin visiblement différents (une main verse l'eau d'une bouilloire col de cygne dans un V60 avec filtre papier, ou une tasse qui fait un demi-tour sur une soucoupe).

---

## 4. projecteur-cartes : 80/100 (beauté 31, utilité 16, accès 17, fiche 16)

**Ce que j'ai vu.** Sobre et bien fait. La lumière dorée glisse du bord de la carte 2 à celui de la carte 3, le fond s'éclaire à peine (`captures-lot-2/pc-hover.png`). Au clavier, la carte entière prend un contour doré net (`sh-pc.png`, vignette 2). En couleurs forcées, chaque carte a sa bordure et le lien reste visible (vignette 3). Téléphone : une colonne propre (vignette 4). Les textes sont crédibles pour un artisan du bâtiment (« une réception avec vous pièce par pièce » : c'est le bon vocabulaire). Deux réserves : le halo est très discret à 1440 (on peut passer à côté), et sur téléphone il ne se passe rien du tout, la carte est un simple bloc.

**Je l'utiliserais sur le site d'un client à 25 000 € ?** Oui, pour une grille d'offres sur fond sombre, c'est une recette propre qui ne fait pas de bruit.

**Corrections gratuites, par priorité**
1. `projecteur-cartes.html` l. 27 : monter le liseré à `rgb(var(--proj-couleur) / 1)` et le reste à `.12` ; l. 34 : fond à `.16` au lieu de `.1`. Le geste se remarquera sans crier.
2. Sur tactile, poser `--x/--y` au centre haut de la carte la plus visible (un `IntersectionObserver`, seuil .6), pour que le téléphone ait aussi sa lumière.
3. Textes : apostrophes typographiques (« L’accompagnement », « L’entretien »), espace insécable avant les deux-points.
4. Fiche : poids réel 5,4 Ko, licence ; le prompt pourrait préciser le lien étiré (`a::after { inset: 0 }`) pour que la carte entière soit cliquable, c'est ce qui fait la qualité ici.

**Médias.** Non.

---

## 5. bandeau-minuteur : 76/100 (beauté 30, utilité 15, accès 17, fiche 14)

**Ce que j'ai vu.** Le bandeau est soigné à 1440 (`captures-lot-2/sh-bm.png`) : dégradé lisible, chiffres tabulaires, bouton blanc qui tranche, × de 44 px. Fermé, il disparaît et le focus revient au titre (vérifié : `activeElement` = H1). En mouvement réduit, plus de secondes. L'éthique est juste : échéance fixe, pas de faux minuteur, la fiche le dit fort. Mais en patron, je relis la phrase : « −15 % jusqu'à ce soir minuit. Fin de l'offre le 6 novembre à 00:00. » Il est 1 h 37 le 5 novembre : « le 6 à 00:00 », personne ne parle comme ça, on dit « le 5 novembre à minuit ». Et surtout, « ce soir minuit » est **écrit en dur** : dès qu'on remplit `data-echeance` pour une vraie offre (l'exemple de la fiche : 1er décembre), le bandeau dira encore « jusqu'à ce soir minuit », à côté d'un compteur… de 645 heures, puisqu'il n'y a pas de case « jours » (l. 83). Sur téléphone, le bandeau prend un bon tiers de l'écran (`sh-bm-m.png`).

**Je l'utiliserais sur le site d'un client à 25 000 € ?** Pas encore : avec une vraie date de fin, il affiche une phrase fausse et un compteur absurde.

**Corrections gratuites, par priorité**
1. `bandeau-minuteur.html` l. 61-63 et 83 : ajouter une case `jours` (`data-j`), affichée seulement si le reste dépasse 24 h ; heures modulo 24.
2. l. 59 : ne plus écrire l'échéance dans la phrase ; la générer depuis `fin` (« jusqu'au 1er décembre », « jusqu'à ce soir minuit » seulement si c'est le jour même).
3. l. 75 : afficher « à minuit » quand l'heure est 00:00, et dater la veille (« le 5 novembre à minuit »).
4. l. 72 et 90 : clé de session liée à l'offre (`"bandeau-ferme:" + echeance`), sinon fermer une offre masque la suivante.
5. l. 38 : sous 560 px, mettre le décompte sur la même ligne que le bouton (`.compte` et `.agir` côte à côte, phrase sur une ligne avec `font-size: .85rem`) pour descendre sous 20 % de l'écran.
6. Fiche : rappeler d'ajouter au `body` un `padding-bottom` égal à la hauteur du bandeau (sinon il cache le pied de page) ; poids 6,8 Ko ; licence. Le prompt doit demander les jours et une phrase générée depuis la date.

**Médias.** Non.

---

## 6. faq-verre : 82/100 (beauté 30, utilité 18, accès 18, fiche 16)

**Ce que j'ai vu.** L'accordéon natif marche parfaitement : une seule réponse ouverte à la fois (vérifié : ouvrir la 3e ferme la 1re), ouverture animée en douceur, + qui tourne en ×, clavier Tab + Entrée sans un gramme de JS (`captures-lot-2/sh-fv.png`). Téléphone très lisible. Les réponses sont concrètes (délais, 30 jours, 3 fois sans frais à partir de 150 €) : c'est ce qu'on attend d'une FAQ qui lève des objections. Mais le « verre » ne se voit pas : sur un fond de petits points presque noirs, les cartes ont l'air de simples rectangles gris foncé. Et le contour de focus blanc d'une question ouverte touche la première ligne de la réponse (vignette 3). Le titre « Vos questions, nos réponses » est le plus usé du web.

**Je l'utiliserais sur le site d'un client à 25 000 € ?** Oui : solide, accessible, sans script ; à poser sur un fond qui justifie le verre.

**Corrections gratuites, par priorité**
1. `faq-verre.html` l. 28 : `outline-offset: -3px` (contour intérieur) pour ne plus mordre la réponse.
2. Démo, l. 39-42 : grossir et éclaircir les taches de couleur (`.55` et `.45` au lieu de `.35`/`.28`) et les points (`.22`, 1,6 px) pour que le flou du verre se voie.
3. Texte : remplacer « Vos questions, nos réponses » par une vraie objection (« Avant de commander »), apostrophes typographiques.
4. Fiche : poids 4,9 Ko, licence ; ajouter dans le prompt le contour de focus intérieur.

**Médias.** Un peu : une photo floutée (atelier, matière) derrière la section ferait exister le verre.

---

## 7. barre-reservation : 83/100 (beauté 34, utilité 17, accès 17, fiche 15)

**Ce que j'ai vu.** Le plus « vrai site » du lot. Photo de potager brumeux avec la longère au fond, titre bien centré, barre de verre lisible et chic (`captures-lot-2/barre-reservation-1440.png`). Étiquettes en capitales, focus blanc net sur chaque champ (`br-tab.png`). Sur téléphone, le bouton devient « Voir les disponibilités » pleine largeur (`sh-br-m.png`). Puis j'ai joué le client qui réserve : j'ai choisi **La Laiterie (2 pers.)**, monté le compteur à **12**, et cliqué. Réponse : « 2 gîtes libres du 20 décembre au 21 décembre (1 nuit, 12 pers.) ». Trois erreurs de métier d'un coup : 12 personnes dans un gîte de 2, « 2 gîtes libres » alors que j'en ai choisi un, et une nuit seule (en changeant l'arrivée, le départ a sauté au lendemain au lieu de garder mes 2 nuits ; la plupart des gîtes imposent 2 nuits minimum). Sur téléphone, le champ « Personnes » reste seul sur sa ligne avec un trou à droite.

**Je l'utiliserais sur le site d'un client à 25 000 € ?** Oui, une fois le compteur bridé par gîte : le dessin est au niveau, seule la logique de démo trahit qu'on ne connaît pas le métier.

**Corrections gratuites, par priorité**
1. `barre-reservation.html` l. 78 : `data-capacite="6|4|2"` sur chaque `<option>` (12 pour « Tous les gîtes ») ; l. 121 : borner `out.value` à la capacité du gîte choisi, et rabaisser la valeur au changement du `<select>`.
2. l. 115 : garder la durée choisie quand l'arrivée change (`dep = arr + ancienne durée`), et `minNuits = 2` (variable) au lieu d'un jour.
3. l. 127 : message selon le choix (« La Laiterie est libre du… » ou « 2 gîtes sur 3 libres… ») ; c'est une démo, mais elle doit dire vrai.
4. l. 42-46 : sous 860 px, `Personnes` sur toute la largeur (`grid-column: 1 / -1`), ou arrivée / départ / personnes sur trois lignes, pour supprimer le trou.
5. Fiche : licence de la photo reprise de Sillon, prompt complété avec la capacité par lieu et le minimum de nuits.

**Médias.** Un peu : une photo générée d'un gîte (façade de longère en pierre, haie bocagère, lumière du matin), 16:9, 2400 px, au lieu du potager d'un autre exemple.

---

## 8. titre-collines : 78/100 (beauté 31, utilité 14, accès 17, fiche 16)

**Ce que j'ai vu.** L'idée est belle et la couleur juste : « Sauvage » en Young Serif, pris entre deux collines, la crête qui coupe le bas des lettres (`captures-lot-2/titre-collines-1440.png`). Le `<h1>` reste un vrai titre, le bouton jaune tient le contraste. Mais en pépiniériste, je ne vois pas de fleurs : je vois une **grille de pois régulière**, une nappe à pois posée sur la colline. Le tiers bas de l'écran est un aplat vert foncé vide. Au défilement, le mot doit « s'enfoncer », mais la section suivante est courte, la parallaxe plafonne à 30 % et on ne remarque presque rien (`sh-tc.png`, vignettes 1 à 3 et 6). Sur téléphone, le masque étiré à 100 % 100 % transforme les collines douces du bocage en pics pointus de montagne, et la moitié haute de l'écran est du ciel vide (vignette 4). Mouvement réduit : tout est figé, rien ne manque (vignette 5).

**Je l'utiliserais sur le site d'un client à 25 000 € ?** Pas encore : les pois et les pics sur mobile font dessin de démo, pas paysage.

**Corrections gratuites, par priorité**
1. `titre-collines.html` l. 36-37 : casser la grille. Trois couches de fleurs à tailles et pas premiers entre eux (`38×30`, `53×41`, `71×47`), décalées, opacités différentes, et une couche de petites tiges ou de touffes en `radial-gradient` ellipse vert clair. Ou un petit motif SVG de 3 fleurs en `background-image` répété.
2. l. 39 : sous 600 px, une seconde crête plus plate (`--crete` redéfini en media query) pour garder des collines et non des pics ; idem pour `.colline-loin`.
3. l. 29 : sous 600 px, `bottom: 40%` pour remonter le mot et réduire le ciel vide.
4. l. 89 : calculer `d` sur `innerHeight` plutôt que `s.offsetHeight` × 1 pour que l'enfoncement soit visible même quand la page défile peu, ou augmenter l'amplitude du mot à `220px`.
5. Remplir le bas : déplacer le texte et le bouton à 18 % du bas, ou ajouter une silhouette de haie en SVG sur la colline de devant.
6. Fiche : licence (Young Serif, Figtree : OFL) ; le prompt dit « semis de fleurs » mais ne dit pas « irrégulier » : il faut l'écrire.

**Médias.** Non : le dessin en code est le parti pris et c'est bien. Un motif de fleurs dessiné en SVG suffit.
