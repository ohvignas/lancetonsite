# Persona bibliothèque, lot 2 (tour 2)

Date : 5 novembre 2026. Chrome headless (Playwright 1.58) sur `http://127.0.0.1:4339/.../elements/<nom>.html` et `?apercu`, à 1440 × 900 et 375 × 812 (tactile simulé, toucher réel par CDP pour revele-encre), souris, clavier (Tab, Entrée, PageUp), défilement, `reducedMotion: 'reduce'`. Pour bandeau-minuteur, j'ai injecté d'autres `data-echeance` par interception réseau (le fichier n'est pas modifié) : 1er décembre 23 h 59, demain 18 h, dans 90 minutes.
Captures : `persona-biblio/captures-tour2-lot-2/` (planches `planche-*.png` pour les séquences). Aucune erreur JS. Seule « ressource en échec » : `versement-960.mp4`, en fait la première requête annulée par Chrome quand il passe aux requêtes `Range` ; la vidéo se charge et se déplace bien.
Licences et poids : présents et justes dans les 8 fiches (vérifiés par `wc -c` et `gzip -9`). Je ne repénalise pas la vidéo ni les photos reprises, qui sont hors périmètre.

| élément | tour 1 | tour 2 | 25 000 € ? |
|---|---|---|---|
| revele-encre | 73 | 82 | Pas encore : le geste marche, mais le titre promet un concert que l'image du soir ne montre pas |
| lettres-envol | 66 | 84 | Pas encore, à un mot près : « Fini les devis » est faux pour un artisan |
| video-curseur | 65 | 72 | Pas encore : régression en mouvement réduit (curseur mort affiché) |
| projecteur-cartes | 80 | 87 | Oui |
| bandeau-minuteur | 76 | 82 | Pas encore : la phrase est dite deux fois, et le mobile casse dès qu'il y a des jours |
| faq-verre | 82 | 89 | Oui |
| barre-reservation | 83 | 89 | Oui |
| titre-collines | 78 | 83 | Pas encore : les fleurs font encore des colonnes, et le mobile garde 40 % de ciel vide |

Barème : beauté et finition /40, utilité /20, accès, mouvement réduit et repli /20, fiche /20.

---

## 1. revele-encre : 82 (beauté 33, utilité 16, accès 18, fiche 15)

**Repris du tour 1.** Corrigés : l'encre est pleine pendant le geste et ne sèche qu'après (`planche-re-sechage.png` : trait opaque à 0,5 s, encore lisible à 2 s, sec vers 5 s) ; la paire est maintenant au même cadrage (`re-1440-repos.png` contre `re-1440-soir.png`, mêmes piliers, même flight-case, même câble) ; la pastille « Passez la souris » / « Glissez le doigt » s'affiche et disparaît au premier geste (`planche-re-mobile.png`) ; le doigt peint vraiment sur téléphone ; en mouvement réduit l'encre reste ; le focus du bouton se voit bien (`re-tab.png`).

**Ce qui reste, en patron de salle.** Le titre dit « le soir du **concert** ». L'image du soir est la halle vide, assombrie, avec un halo orange flou posé sur le flight-case : pas de public, pas de scène, pas de lumière de concert. Un programmateur y voit une retouche, pas une soirée. Et comme la version du soir est presque noire, la traînée à 1440 se lit comme une **tache sombre** qu'on étale sur la belle photo (`re-1440-apres-0.png`), pas comme une fenêtre sur autre chose. Au doigt, sur le halo, c'est bien plus joli.

**Corrections gratuites**
1. `revele-encre.html` l. 48 et l. 55 : ne plus promettre le concert. « La halle, de jour et à la nuit tombée » ; `alt` sans « la lumière de scène allumée ». Garder « concert » pour la vraie paire générée.
2. Bord de la traînée : dans `peindre()`, après le `destination-in`, repasser le masque en `source-over` avec un léger liseré chaud (le même masque, flouté de 6 px, à 25 % de `#ff6a3d`), pour que le trait ait un bord lumineux et ne se lise pas comme une salissure.
3. Démo seulement : `--encre-pinceau: 90` à 1440, pour découvrir plus d'image à chaque passage.

**25 000 € ?** Pas encore : la mécanique est au niveau, la démo raconte une chose que l'image ne montre pas. Avec la vraie paire (halle vide de jour / même cadrage en concert), oui.

---

## 2. lettres-envol : 84 (beauté 33, utilité 14, accès 19, fiche 18)

**Repris du tour 1.** Tout est corrigé. Deux vrais `h2` lus en entier (arbre d'accessibilité : `heading "Fini les devis"`, `heading "Place au chantier"`). Graisse 800 et approche lisible : « FINI » se lit FINI. Plus aucun mélange des deux titres : le premier est parti avant que le second monte (`planche-le-1440.png`, `planche-le-375.png`). Sur téléphone, un mot par ligne, le titre tient l'écran (`le-375-0.png`). Mouvement réduit : les deux titres empilés, propres (`le-reduit-375.png`).

**Ce qui reste, en patron du bâtiment.** « Fini les devis » : un artisan ne peut pas dire ça. Le devis est obligatoire pour la plupart des travaux, et c'est même un argument de sérieux. Le client lit « on ne vous fera pas de devis », c'est l'inverse du message voulu. Et la scène épinglée sur fond gris clair uni, sans rien autour, reste un intermède : utile une fois par site, pas plus.

**Corrections gratuites**
1. l. 41 : « Devis signé » (ou « Fini l'attente ») → « Place au chantier ». Même correction dans l'exemple de la fiche.
2. Fiche : une ligne d'usage, « une seule fois par page, entre deux sections denses ».

**25 000 € ?** Pas encore, à un mot près. Avec le texte corrigé, oui.

---

## 3. video-curseur : 72 (beauté 27, utilité 13, accès 15, fiche 17)

**Repris du tour 1.** Corrigés : la vidéo se déplace avec la souris (`currentTime` 0,25 → 1,76 → 3,27 → 4,78 s, `planche-vc-1440.png`) et au clavier (PageUp : 4,03 s, focus blanc net, `vc-375-clavier.png`) ; le cadrage `--vc-cadrage` garde le dripper et le verre à 375 px (`vc-375.png`) ; la pastille « ‹ Glissez pour verser › » est là ; la fiche explique enfin `Range` et le repli `blob`.

**Régression, en mouvement réduit** (`vc-reduit.png`) : la pastille « Glissez pour verser » **et** le curseur restent affichés, alors que le script s'est arrêté. On a un curseur qui ne fait rien. Cause : `hidden = true` (l. 64) est écrasé par `display: flex` des règles `.vc-indice` (l. 19) et `.repere` (l. 22). Vérifié : `hidden` vaut `true`, `display` vaut `flex` pour les deux.

**Ce qui reste du film** (je ne compte pas deux fois) : entre 5 % et 95 % de la course, rien ne change à l'œil, le niveau du verre est le même et il n'y a toujours pas de filtre papier dans le V60. La démo ne prouve donc pas l'effet.

**Corrections gratuites**
1. Ajouter `.video-curseur [hidden] { display: none; }` après la l. 24 (ou masquer par une classe). C'est bloquant pour l'accessibilité.
2. Démo : tant que la vidéo reste celle-ci, réduire la course à la partie où il se passe quelque chose ou l'annoncer comme provisoire dans `data-explication`.

**25 000 € ?** Pas encore : le code est presque prêt, mais un contrôle mort en mouvement réduit et un film où rien ne bouge, ça ne passe pas devant un client.

---

## 4. projecteur-cartes : 87 (beauté 34, utilité 17, accès 18, fiche 18)

**Repris du tour 1.** La lampe se voit enfin à 1440 : liseré doré franc, fond qui se réchauffe sur la carte 2 et déborde sur la 3 (`planche-pc.png`, gauche). Contour de focus doré de toute la carte au clavier (droite). Au téléphone, une carte s'allume au défilement (`planche-pc-375.png`). Apostrophes typographiques, fiche à jour.

**Ce qui reste.** Au toucher, c'est la **dernière** carte entrée dans l'écran qui s'allume, pas la plus visible : en haut de page, les cartes 1 et 2 sont entières et c'est la 3, coupée en bas, qui est allumée (`pc-375-a.png`, mesuré : `--x` posé seulement sur la 3, puis la 4).

**Corrections gratuites**
1. l. 85-89 : garder les ratios dans une `Map` et allumer la carte de plus grand `intersectionRatio` (à égalité, la plus proche du centre de l'écran), avec plusieurs seuils `[0, .25, .5, .75, 1]`.

**25 000 € ?** Oui : une grille d'offres sombre, sobre, qui vit au survol sans faire de bruit.

---

## 5. bandeau-minuteur : 82 (beauté 30, utilité 17, accès 18, fiche 17)

**Repris du tour 1.** La logique est juste maintenant. Démo : « −15 % jusqu'à ce soir minuit. Fin de l'offre le 5 novembre à minuit. » 1er décembre : « jusqu'au 1er décembre, 23 h 59 » avec la case **26 j** ; demain 18 h : « jusqu'à demain 18 h » ; la case jours n'apparaît qu'au-delà de 24 h. Fermeture mémorisée par offre (rechargé : toujours masqué), focus rendu au H1. Mouvement réduit : pas de secondes. `padding-bottom` documenté.

**Ce qui reste.**
1. La date est **dite deux fois à l'écran** : « −15 % jusqu'au 1er décembre, 23 h 59. Fin de l'offre le 1er décembre à 23 h 59. » (`bm-dec-1440.png`). `.sr-date` porte un nom de texte masqué mais aucune règle CSS ne le masque.
2. Sur téléphone, dès qu'il y a des jours (le cas réel), la phrase est écrasée en **7 lignes** de deux mots à côté de quatre cases, et le bandeau prend **24 %** de l'écran (`planche-bm-375.png`, 2e vignette). Sans jours : 15 %, correct.
3. « jusqu'à aujourd'hui 3 h 50 » : on dit « jusqu'à 3 h 50 aujourd'hui », ou « jusqu'à 3 h 50 » tout court.

**Corrections gratuites**
1. Ajouter la classe de masquage visuel à `.sr-date` (`position:absolute; width:1px; height:1px; overflow:hidden; clip-path:inset(50%)`), ou supprimer la seconde phrase visible.
2. l. 39-47 : sous 560 px, phrase sur toute la largeur (`.texte { flex: 1 1 100% }`), puis décompte, × et bouton sur la ligne suivante (`.agir { flex: 1 }` à côté de `.compte`), secondes masquées quand la case jours est affichée.
3. l. 98 : `` `jusqu’à ${heure} aujourd’hui` ``.

**25 000 € ?** Pas encore : la vraie offre, celle à plusieurs jours, est justement celle qui casse sur téléphone.

---

## 6. faq-verre : 89 (beauté 35, utilité 18, accès 19, fiche 17)

**Repris du tour 1.** Tout est corrigé. Le verre existe : on voit le violet, le vert d'eau et l'orange passer sous les cartes, flous (`fv-1440-clavier.png`, `fv-375.png`). Contour de focus intérieur, il ne touche plus la réponse. « Avant de commander », c'est un vrai titre. Une seule réponse ouverte à la fois (vérifié : `[false, true, false, false]`).

**Ce qui reste (léger).** « Comment vous joindre ? » répond sans donner ni adresse ni numéro : dans un vrai site, c'est l'endroit où les mettre en lien cliquable (`tel:`, `mailto:`). À écrire dans le prompt de la fiche.

**25 000 € ?** Oui.

---

## 7. barre-reservation : 89 (beauté 35, utilité 19, accès 18, fiche 17)

**Repris du tour 1.** Corrigé, et bien. La Laiterie bloque le compteur à 2 (bouton + grisé, `aria-disabled`). La durée est gardée : 4 nuits choisies, j'ai bougé l'arrivée, le départ a suivi (20 → 24 décembre). Messages vrais : « La Laiterie est libre du 20 décembre au 24 décembre (4 nuits, 2 pers.) » ; « Le Fournil est déjà pris… Libres à ces dates : La Grange et La Laiterie » ; à 12 : « les gîtes libres accueillent 8 personnes au plus » ; à 8 : « Aucun gîte seul n'accueille 8 personnes… réservez La Grange et La Laiterie ensemble » (`br-1440-statut.png`). C'est un message de gérant de gîtes. Mobile : Personnes en pleine largeur, plus de trou (`br-375.png`).

**Ce qui reste (léger).**
1. Le Fournil pris pour 4 personnes : la réponse propose aussi La Laiterie, qui en loge 2. Filtrer `libres` par capacité dans la branche « déjà pris » (l. 154).
2. Choisir un départ à 1 nuit le remet en silence à 4 nuits : dire pourquoi (« 2 nuits minimum ») dans le statut.
3. À 375, l'icône calendrier du champ Départ touche le bord arrondi du champ (`br-375.png`) : `padding-right` de 4 px sur `.resa input[type=date]`.

**25 000 € ?** Oui.

---

## 8. titre-collines : 83 (beauté 33, utilité 15, accès 18, fiche 17)

**Repris du tour 1.** Les fleurs sont de vraies fleurs (pétales, cœur, touffes d'herbe, trois teintes), le voile vert assure la lecture du texte, la crête mobile est plate et douce, plus de pics (`tc-1440-0.png`, `planche-tc-375.png`). En mode normal, le mot s'enfonce enfin derrière la colline dès 150 px de défilement (`planche-tc-defilement.png`). Mouvement réduit : figé, complet.

**Ce qui reste, en pépiniériste.**
1. À 1440, le semis forme encore des **colonnes** : les mêmes grappes jaunes reviennent tous les 157 px, on lit des bandes verticales (`tc-1440-0.png`, x ≈ 40, 198, 355, 512…). Une prairie, ça ne pousse pas en rangs.
2. Sur téléphone, les 40 % du haut sont du ciel vide, et le mot est posé **sur** la colline plutôt que pris dedans.
3. « à Saint- / Herblain » : le nom de la ville est coupé au trait d'union (`planche-tc-375.png`).
4. En `?apercu`, la page ne défile pas (la section suivante est masquée) : dans la galerie, l'effet principal ne se voit pas.

**Corrections gratuites**
1. l. 40-41 : une troisième tuile (fleurs-a réutilisée à `241px 173px`, décalée de `97px 59px`, opacité par un `color-mix` plus sombre), et retirer les deux grappes de fleurs-a qui tombent sur la même colonne (x 37-47).
2. l. 50 : sous 600 px, `.colline-mot { bottom: 40% }` et `.colline-devant { height: calc(56% + 80px) }` pour que la crête coupe le bas des lettres ; ou `font-size: 27vw`.
3. l. 85 : `Saint&#8209;Herblain` (trait d'union insécable).
4. Démo : garder une `.suite` de 60svh vide, sans `data-explication`, pour que l'aperçu défile.

**25 000 € ?** Pas encore : c'est devenu un vrai paysage ; il reste à casser les rangs de fleurs et à remplir le haut du téléphone.
